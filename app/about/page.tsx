import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "关于我 / Ziran",
};

const LINKS = [
  { label: "邮箱", value: "zhaozihanislucky@gmail.com", href: "mailto:zhaozihanislucky@gmail.com" },
  { label: "GitHub", value: "https://github.com/ZihanZhao227", href: "https://github.com/ZihanZhao227" },
  { label: "LinkedIn", value: "https://www.linkedin.com/in/hannah-zhao-711769232", href: "https://www.linkedin.com/in/hannah-zhao-711769232/" },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-16 px-6 py-16 md:px-0 md:py-24">
        <h1 className="font-heading text-5xl leading-[1.05] tracking-tight md:text-7xl">
          你好,我是
          <br />
          <span className="text-moss">Zihan</span>。
        </h1>

        <div className="flex flex-col gap-6 font-body text-lg leading-relaxed text-ink/80 md:text-xl">
          <p>
            我在这里写代码、做东西、偶尔写点什么。这个网站是我给自己搭的一个数字角落——
            左边是「自然」的我,右边是「实验室」里的作品。
          </p>
          <p>
            在这条边界背后,我关心的是把想法做成能用的东西:从一行代码开始,
            到一个能上线、能被别人打开看看的产品。
          </p>
        </div>

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
      </main>
    </div>
  );
}
