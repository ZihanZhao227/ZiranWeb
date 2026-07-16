import { Client, extractPageId, isFullBlock, isFullPage } from "@notionhq/client";
import type {
  BlockObjectResponse,
  PageObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client";
import type {
  RichTextSegment,
  ShelfCategory,
  ShelfContentBlock,
  ShelfEntry,
  ShelfEntryMeta,
} from "@/types/shelf";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

// 每个分类的环境变量存的是"该分类内联数据库所在页面"的分享链接,
// 不是数据库 ID 本身——内联数据库要先从页面的子 block 里找出来。
const CONTAINER_PAGE_URLS: Record<ShelfCategory, string | undefined> = {
  Everyday: process.env.NOTION_DB_EVERYDAY,
  Inedible: process.env.NOTION_DB_INEDIBLE,
  Medley: process.env.NOTION_DB_MEDLEY,
};

function requireContainerPageId(category: ShelfCategory): string {
  const raw = CONTAINER_PAGE_URLS[category];
  if (!raw) {
    throw new Error(
      `缺少环境变量:分类 "${category}" 对应的 Notion 页面链接没有配置`,
    );
  }

  const pageId = extractPageId(raw);
  if (!pageId) {
    throw new Error(
      `分类 "${category}" 配置的 NOTION_DB_* 值解析不出合法的 Notion 页面 ID:${raw}`,
    );
  }
  return pageId;
}

async function listAllBlocks(blockId: string): Promise<BlockObjectResponse[]> {
  const blocks: BlockObjectResponse[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
    });
    blocks.push(...response.results.filter(isFullBlock));
    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return blocks;
}

// database id / data source id 在应用生命周期内不会变,解析一次后缓存住。
const databaseIdCache = new Map<ShelfCategory, string>();
const dataSourceIdCache = new Map<ShelfCategory, string>();

async function resolveDatabaseId(category: ShelfCategory): Promise<string> {
  const cached = databaseIdCache.get(category);
  if (cached) return cached;

  const containerPageId = requireContainerPageId(category);
  const children = await listAllBlocks(containerPageId);
  const databaseBlock = children.find((block) => block.type === "child_database");

  if (!databaseBlock) {
    throw new Error(
      `分类 "${category}" 对应的 Notion 页面里没有找到内联数据库(child_database)`,
    );
  }

  databaseIdCache.set(category, databaseBlock.id);
  return databaseBlock.id;
}

async function resolveDataSourceId(category: ShelfCategory): Promise<string> {
  const cached = dataSourceIdCache.get(category);
  if (cached) return cached;

  const databaseId = await resolveDatabaseId(category);
  const database = await notion.databases.retrieve({ database_id: databaseId });
  const dataSourceId =
    "data_sources" in database ? database.data_sources[0]?.id : undefined;

  if (!dataSourceId) {
    throw new Error(`Notion 数据库 ${databaseId} 下没有找到任何 data source`);
  }

  dataSourceIdCache.set(category, dataSourceId);
  return dataSourceId;
}

function getTitle(page: PageObjectResponse, propertyName = "Name"): string {
  const prop = page.properties[propertyName];
  if (prop?.type === "title") {
    return prop.title.map((t) => t.plain_text).join("");
  }
  return "";
}

function getDate(page: PageObjectResponse, propertyName = "Date"): string | null {
  const prop = page.properties[propertyName];
  if (prop?.type === "date") {
    return prop.date?.start ?? null;
  }
  return null;
}

function getPublic(page: PageObjectResponse, propertyName = "Public"): boolean {
  const prop = page.properties[propertyName];
  return prop?.type === "checkbox" ? prop.checkbox : false;
}

function pageToEntryMeta(
  page: PageObjectResponse,
  category: ShelfCategory,
): ShelfEntryMeta {
  return {
    id: page.id,
    category,
    title: getTitle(page) || "Untitled",
    date: getDate(page),
  };
}

async function queryPublicPages(dataSourceId: string): Promise<PageObjectResponse[]> {
  const pages: PageObjectResponse[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        property: "Public",
        checkbox: { equals: true },
      },
      sorts: [{ property: "Date", direction: "ascending" }],
      start_cursor: cursor,
    });
    pages.push(...response.results.filter(isFullPage));
    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return pages;
}

export async function getEntries(
  category: ShelfCategory,
): Promise<ShelfEntryMeta[]> {
  const dataSourceId = await resolveDataSourceId(category);
  const pages = await queryPublicPages(dataSourceId);
  return pages.map((page) => pageToEntryMeta(page, category));
}

// 只用于纯文本场景(比如 heading 生成 slug/id),不保留颜色标注。
function richTextToPlain(richText: RichTextItemResponse[]): string {
  return richText.map((t) => t.plain_text).join("");
}

// 保留每一段 rich_text 的颜色标注,渲染正文用这个而不是 richTextToPlain。
function richTextToSegments(richText: RichTextItemResponse[]): RichTextSegment[] {
  return richText.map((t) => {
    const color = t.annotations.color;
    if (!color || color === "default") {
      return { text: t.plain_text };
    }
    return { text: t.plain_text, color };
  });
}

function blockToContentBlock(block: BlockObjectResponse): ShelfContentBlock | null {
  switch (block.type) {
    case "paragraph":
      return { type: "paragraph", text: richTextToSegments(block.paragraph.rich_text) };
    case "heading_1":
      return { type: "heading", level: 1, text: richTextToSegments(block.heading_1.rich_text) };
    case "heading_2":
      return { type: "heading", level: 2, text: richTextToSegments(block.heading_2.rich_text) };
    case "heading_3":
      return { type: "heading", level: 3, text: richTextToSegments(block.heading_3.rich_text) };
    case "bulleted_list_item":
      return { type: "bulleted", text: richTextToSegments(block.bulleted_list_item.rich_text) };
    case "numbered_list_item":
      return { type: "numbered", text: richTextToSegments(block.numbered_list_item.rich_text) };
    case "quote":
      return { type: "quote", text: richTextToSegments(block.quote.rich_text) };
    case "code":
      return {
        type: "code",
        text: richTextToPlain(block.code.rich_text),
        language: block.code.language,
      };
    case "divider":
      return { type: "divider" };
    case "image": {
      const src =
        block.image.type === "external" ? block.image.external.url : block.image.file.url;
      return { type: "image", src, caption: richTextToPlain(block.image.caption) };
    }
    default:
      return null;
  }
}

export async function getEntry(
  category: ShelfCategory,
  id: string,
): Promise<ShelfEntry | undefined> {
  let page: Awaited<ReturnType<typeof notion.pages.retrieve>>;
  try {
    page = await notion.pages.retrieve({ page_id: id });
  } catch {
    return undefined;
  }

  if (!isFullPage(page)) return undefined;

  // 校验这一页确实属于该分类对应的数据库,并且勾了 Public——
  // 私有内容即使猜到 id 也不会拼出可访问的阅读页。
  const databaseId = await resolveDatabaseId(category);
  if (page.parent.type !== "data_source_id" || page.parent.database_id !== databaseId) {
    return undefined;
  }
  if (!getPublic(page)) return undefined;

  const blocks = await listAllBlocks(id);

  const content = blocks
    .map(blockToContentBlock)
    .filter((block): block is ShelfContentBlock => block !== null);

  return {
    ...pageToEntryMeta(page, category),
    content,
  };
}
