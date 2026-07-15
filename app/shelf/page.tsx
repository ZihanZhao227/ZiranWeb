import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import CategoryCover from "@/components/shelf/CategoryCover";
import FadeIn from "@/components/FadeIn";
import LuoshenBanner from "@/components/LuoshenBanner";
import { SHELF_CATEGORIES } from "@/types/shelf";

export const metadata: Metadata = {
  title: "Everything Bagel",
};

export default function ShelfPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-16 px-6 py-16 md:px-0 md:py-24">
        <div className="flex flex-col gap-3">
          <h1 className="font-heading text-5xl leading-[1.05] tracking-tight md:text-7xl">
            Everything <span className="text-moss">Bagel</span>
          </h1>
          <p className="font-body text-lg italic text-ink/50">Shelf</p>
        </div>

        <div
          className="relative overflow-hidden rounded-lg bg-[#BCE0DF] px-8 pb-0 pt-6 before:absolute before:inset-x-0 before:top-0 before:h-3 before:bg-[#D8EFEE] before:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-3.5 after:bg-[#8BBFB8] after:content-['']"
        >
          <div className="flex flex-wrap items-end justify-center gap-3 pb-0">
            {SHELF_CATEGORIES.map((category, index) => (
              <FadeIn key={category} delay={index * 0.1}>
                  <CategoryCover category={category} />
              </FadeIn>
            ))}
          </div>
        </div>
      </main>

      <LuoshenBanner />
    </div>
  );
}
