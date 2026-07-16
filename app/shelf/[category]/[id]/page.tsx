import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import ShelfContent from "@/components/shelf/ShelfContent";
import TableOfContents, { type TocHeading } from "@/components/shelf/TableOfContents";
import ScrollLit from "@/components/ScrollLit";
import SupportLink from "@/components/SupportLink";
import { getEntries, getEntry } from "@/lib/notion";
import {
  SHELF_CATEGORIES,
  type RichTextSegment,
  type ShelfCategory,
  type ShelfContentBlock,
} from "@/types/shelf";
import { redirect } from 'next/navigation';

function isShelfCategory(value: string): value is ShelfCategory {
  return (SHELF_CATEGORIES as string[]).includes(value);
}

// text 字段现在是 RichTextSegment[](保留了颜色标注),目录只需要纯文本,
// 所以这里把各段拼回一个字符串——等价于 richTextToPlain() 的效果,
// 但作用对象是我们自己的 RichTextSegment[],不是 Notion 原始的 rich_text。
function segmentsToPlainText(segments: RichTextSegment[]): string {
  return segments.map((segment) => segment.text).join("");
}

// 和 components/shelf/ShelfContent.tsx 里的同名函数保持逐字节一致——
// 两边各自遍历同一批 heading 文本、各自维护一份 seen 计数器,
// 只有算法完全相同,这里生成的目录 id 才能对上正文里渲染出来的 DOM id。
function slugify(text: string, seen: Map<string, number>): string {
  const base =
    text
      .toLowerCase()
      .trim()
      .replace(/[^\p{L}\p{N}]+/gu, "-")
      .replace(/^-+|-+$/g, "") || "section";
  const count = seen.get(base) ?? 0;
  seen.set(base, count + 1);
  return count === 0 ? base : `${base}-${count + 1}`;
}

const SUPPORT_COPY: Record<ShelfCategory, string> = {
  Everyday: "If this Everyday post helped, buy me a coffee.",
  Inedible: "If this Inedible post didn't poison you, buy me a coffee.",
  Medley: "If you liked this Medley post, buy me a coffee.",
};

export async function generateStaticParams() {
  const params = await Promise.all(
    SHELF_CATEGORIES.map(async (category) => {
      const entries = await getEntries(category);
      return entries.map((entry) => ({ category, id: entry.id }));
    }),
  );
  return params.flat();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}): Promise<Metadata> {
  const { category, id } = await params;
  if (!isShelfCategory(category)) return { title: "Everything Bagel" };
  const entry = await getEntry(category, id);
  return { title: entry ? `${entry.title} / Everything Bagel` : "Everything Bagel" };
}

export default async function ShelfEntryPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { category, id } = await params;
  const matched = SHELF_CATEGORIES.find(c => c.toLowerCase() === category.toLowerCase());
  if (!matched) notFound();
  if (matched !== category) redirect(`/shelf/${matched}/${id}`);
  const safeCategory = matched;

  const entry = await getEntry(category, id);
  if (!entry) {
    notFound();
  }

  const headingSeen = new Map<string, number>();
  const headings: TocHeading[] = entry.content
    .filter(
      (block): block is Extract<ShelfContentBlock, { type: "heading" }> =>
        block.type === "heading",
    )
    .map((block) => {
      const text = segmentsToPlainText(block.text);
      return {
        id: slugify(text, headingSeen),
        text,
        level: block.level,
      };
    });

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <TableOfContents headings={headings} />
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-10 px-6 py-16 md:px-0 md:py-24">
        <Link
          href={`/shelf/${category}`}
          className="font-body text-sm text-ink/50 transition-colors hover:text-moss"
        >
          ← Back to {category}
        </Link>

        <div className="flex flex-col gap-3">
          <h1 className="font-heading text-4xl leading-[1.1] tracking-tight md:text-6xl">
            {entry.title}
          </h1>
          {entry.date && (
            <p className="font-body text-base italic text-ink/50">{entry.date}</p>
          )}
        </div>

        <ScrollLit text="Read slowly." />

        <ShelfContent blocks={entry.content} dropCap />

        <div className="flex flex-col items-start gap-4 border-t border-ink/10 pt-10">
          <p className="font-body text-base text-ink/70">{SUPPORT_COPY[category]}</p>
          <SupportLink
            className="rounded-md bg-moss px-4 py-1.5 text-sm text-moss-dark transition-opacity hover:opacity-80"
            extraParams={{
              support_source: "article",
              shelf_category: category,
              article_id: entry.id,
            }}
          />
        </div>
      </main>
    </div>
  );
}
