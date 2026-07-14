import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import ShelfContent from "@/components/shelf/ShelfContent";
import ScrollLit from "@/components/ScrollLit";
import SupportLink from "@/components/SupportLink";
import { getEntries, getEntry } from "@/lib/notion";
import { SHELF_CATEGORIES, type ShelfCategory } from "@/types/shelf";

function isShelfCategory(value: string): value is ShelfCategory {
  return (SHELF_CATEGORIES as string[]).includes(value);
}

const SUPPORT_COPY: Record<ShelfCategory, string> = {
  Everyday: "如果这篇 Everyday 帮到了你,请我喝一杯吧。",
  Inedible: "这篇 Inedible 没把你毒到的话,请我喝一杯吧。",
  Medley: "喜欢这篇 Medley 的话,请我喝一杯吧。",
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
  if (!isShelfCategory(category)) {
    notFound();
  }

  const entry = await getEntry(category, id);
  if (!entry) {
    notFound();
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
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

        <ScrollLit text="慢读。" />

        <ShelfContent blocks={entry.content} />

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
