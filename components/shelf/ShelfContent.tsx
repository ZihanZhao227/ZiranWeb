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

function Heading({ level, text }: { level: 1 | 2 | 3; text: string }) {
  if (level === 1) {
    return <h2 className="font-heading text-3xl tracking-tight">{text}</h2>;
  }
  if (level === 2) {
    return <h3 className="font-heading text-2xl tracking-tight">{text}</h3>;
  }
  return <h4 className="font-heading text-xl tracking-tight">{text}</h4>;
}

export default function ShelfContent({ blocks }: { blocks: ShelfContentBlock[] }) {
  if (blocks.length === 0) {
    return <p className="font-body text-lg text-ink/50">This entry has no content yet.</p>;
  }

  return (
    <div className="flex flex-col gap-6 font-body text-lg leading-relaxed text-ink/80">
      {groupBlocks(blocks).map((block, index) => {
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
          case "heading":
            return <Heading key={index} level={block.level} text={block.text} />;
          case "paragraph":
            return block.text ? <p key={index}>{block.text}</p> : null;
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
