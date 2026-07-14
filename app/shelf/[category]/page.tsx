import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import { getEntries } from "@/lib/notion";
import { SHELF_CATEGORIES, type ShelfCategory } from "@/types/shelf";
import { redirect } from 'next/navigation';

function isShelfCategory(value: string): value is ShelfCategory {
  return (SHELF_CATEGORIES as string[]).includes(value);
}

export async function generateStaticParams() {
  return SHELF_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  return {
    title: isShelfCategory(category)
      ? `${category} / Everything Bagel`
      : "Everything Bagel",
  };
}

export default async function ShelfCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const matched = SHELF_CATEGORIES.find(c => c.toLowerCase() === category.toLowerCase());
  if (!matched) notFound();
  if (matched !== category) redirect(`/shelf/${matched}`);

  const entries = await getEntries(category);

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-12 px-6 py-16 md:px-0 md:py-24">
        <Link
          href="/shelf"
          className="font-body text-sm text-ink/50 transition-colors hover:text-moss"
        >
          ← Back to Shelf
        </Link>

        <h1 className="font-heading text-5xl leading-[1.05] tracking-tight md:text-6xl">
          {category}
        </h1>

        {entries.length === 0 ? (
          <p className="font-body text-base text-ink/50">
            This shelf is empty for now. More is coming soon.
          </p>
        ) : (
          <ol className="flex flex-col divide-y divide-ink/10 border-t border-ink/10">
            {entries.map((entry, index) => (
              <li key={entry.id}>
                <Link
                  href={`/shelf/${category}/${entry.id}`}
                  className="flex items-baseline gap-4 py-5 font-body text-lg transition-colors hover:text-moss"
                >
                  <span className="font-heading text-sm tabular-nums text-ink/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{entry.title}</span>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </main>
    </div>
  );
}
