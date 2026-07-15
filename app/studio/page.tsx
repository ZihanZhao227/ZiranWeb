import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Studio / Ziran",
};

export default function StudioPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 px-6 py-16 md:px-0 md:py-24">
        <h1 className="font-heading text-5xl md:text-7xl">Studio</h1>
        <p className="font-body text-lg italic text-ink/50">
          Scripts, games, experiments, and things that don&apos;t fit anywhere else.
        </p>
        <p className="text-xs tracking-widest text-moss" style={{ fontFamily: "monospace" }}>
          COMING SOON
        </p>
      </main>
    </div>
  );
}
