import type { ShelfContentBlock } from "@/types/shelf";

type ListGroup = { type: "bulleted-group" | "numbered-group"; items: string[] };

function groupBlocks(blocks: ShelfContentBlock[]): (ShelfContentBlock | ListGroup)[] {
  const groups: (ShelfContentBlock | ListGroup)[] = [];

  for (const block of blocks) {
    const last = groups[groups.length - 1];
    if (block.type === "bulleted" || block.type === "numbered") {
      const groupType = block.type === "bulleted" ? "bulleted-group" : "numbered-group";
      if (last && "type" in last && last.type === groupType) {
        (last as ListGroup).items.push(block.text);
      } else {
        groups.push({ type: groupType, items: [block.text] });
      }
      continue;
    }
    groups.push(block);
  }

  return groups;
}

function Heading({ id, level, text }: { id: string; level: 1 | 2 | 3; text: string }) {
  if (level === 1) {
    return (
      <h2 id={id} className="font-heading text-3xl tracking-tight">
        {text}
      </h2>
    );
  }
  if (level === 2) {
    return (
      <h3 id={id} className="font-heading text-2xl tracking-tight">
        {text}
      </h3>
    );
  }
  return (
    <h4 id={id} className="font-heading text-xl tracking-tight">
      {text}
    </h4>
  );
}

// 和 app/shelf/[category]/[id]/page.tsx 里的同名函数保持逐字节一致——
// 两边各自遍历同一批 heading 文本、各自维护一份 seen 计数器,
// 只有算法完全相同,目录里生成的 id 才能对上这里渲染出来的 DOM id。
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

const DROP_CAP_CLASS =
  "motion-safe:first-letter:float-left motion-safe:first-letter:mr-1 motion-safe:first-letter:mt-0.5 motion-safe:first-letter:font-heading motion-safe:first-letter:text-[3.5em] motion-safe:first-letter:leading-[0.8] motion-safe:first-letter:text-moss-dark";

export default function ShelfContent({
  blocks,
  dropCap = false,
}: {
  blocks: ShelfContentBlock[];
  dropCap?: boolean;
}) {
  if (blocks.length === 0) {
    return <p className="font-body text-lg text-ink/50">This entry has no content yet.</p>;
  }

  const grouped = groupBlocks(blocks);
  const dropCapIndex = dropCap
    ? grouped.findIndex((block) => block.type === "paragraph" && block.text)
    : -1;
  const headingSeen = new Map<string, number>();

  return (
    <div className="flex flex-col gap-6 font-body text-lg leading-relaxed text-ink/80">
      {grouped.map((block, index) => {
        switch (block.type) {
          case "bulleted-group":
            return (
              <ul key={index} className="list-disc space-y-2 pl-6">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            );
          case "numbered-group":
            return (
              <ol key={index} className="list-decimal space-y-2 pl-6">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ol>
            );
          case "heading": {
            const headingId = slugify(block.text, headingSeen);
            return <Heading key={index} id={headingId} level={block.level} text={block.text} />;
          }
          case "paragraph": {
            if (!block.text) return null;
            const applyDropCap = index === dropCapIndex;
            return (
              <p key={index} className={applyDropCap ? DROP_CAP_CLASS : undefined}>
                {block.text}
              </p>
            );
          }
          case "quote":
            return (
              <blockquote key={index} className="border-l-2 border-moss pl-4 italic text-ink/70">
                {block.text}
              </blockquote>
            );
          case "code":
            return (
              <pre
                key={index}
                className="overflow-x-auto border border-ink/10 bg-ink/5 p-4 font-mono text-sm"
              >
                <code>{block.text}</code>
              </pre>
            );
          case "divider":
            return <hr key={index} className="border-ink/10" />;
          case "image":
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={index}
                src={block.src}
                alt={block.caption || ""}
                className="w-full border border-ink/10 object-cover"
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
