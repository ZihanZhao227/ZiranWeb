import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import FadeIn from "@/components/FadeIn";
import WordReveal from "@/components/WordReveal";
import StatsCounter from "@/components/StatsCounter";

export const metadata: Metadata = {
  title: "About / Ziran",
};

const LINKS = [
  { label: "Email", value: "zhaozihanislucky@gmail.com", href: "mailto:zhaozihanislucky@gmail.com" },
  { label: "GitHub", value: "https://github.com/ZihanZhao227", href: "https://github.com/ZihanZhao227" },
  { label: "LinkedIn", value: "https://www.linkedin.com/in/hannah-zhao-711769232", href: "https://www.linkedin.com/in/hannah-zhao-711769232/" },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-16 px-6 py-16 md:px-0 md:py-24">
        <h1 className="font-heading text-5xl leading-[1.05] tracking-tight md:text-7xl">
          <WordReveal text="Hi, I'm" />
          <br />
          <span className="text-moss">
            <WordReveal text="Zihan" />
          </span>
          .
        </h1>

        <FadeIn>
          <div className="flex flex-col gap-6 font-body text-lg leading-relaxed text-ink/80 md:text-xl">
            <p>
              I write code, build things, and occasionally write about it here. This site
              is a small digital corner I built for myself — the left side is Ziran, the
              natural me; the right side is Lab, the work.
            </p>
            <p>
              Behind that divide, what I care about is turning ideas into things that
              actually work: starting from a single line of code, all the way to
              something that ships and that other people can open and use.
            </p>
          </div>
        </FadeIn>

        <div className="flex flex-col gap-4 border-t border-ink/10 pt-10">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-baseline justify-between border-b border-ink/10 py-3 transition-colors hover:border-moss"
            >
              <span className="font-heading text-sm uppercase tracking-[0.2em] text-ink/50">
                {link.label}
              </span>
              <span className="font-body text-lg group-hover:text-moss transition-colors">
                {link.value}
              </span>
            </a>
          ))}
        </div>

        <StatsCounter />
      </main>
    </div>
  );
}
