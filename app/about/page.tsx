import type { Metadata } from "next";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import StatsCounter from "@/components/StatsCounter";
import PoetryWave from "@/components/PoetryWave";
import StoryToggle from "@/components/StoryToggle";
import photoStripStyles from "./photo-strip.module.css";
import ExperienceIcon from "@/components/ExperienceIcon";

export const metadata: Metadata = {
  title: "About / Ziran",
};

const LINKS = [
  { label: "Email", value: "zhaozihanislucky@gmail.com", href: "mailto:zhaozihanislucky@gmail.com" },
  { label: "GitHub", value: "https://github.com/ZihanZhao227", href: "https://github.com/ZihanZhao227" },
  { label: "LinkedIn", value: "https://www.linkedin.com/in/hannah-zhao-711769232", href: "https://www.linkedin.com/in/hannah-zhao-711769232/" },
];

const EXPERIENCE = [
  {
    iconSrc: "/photos/logo-datamine.png",
    iconFallback: "PU",
    iconBg: "#EEF2FF",
    iconColor: "#3730A3",
    org: "The Data Mine, Purdue University",
    role: "Undergraduate Researcher · NLP pipelines, 119k+ records",
    time: "Jan – May 2026",
  },
  {
    iconSrc: "/photos/logo-yuewen.png",
    iconFallback: "阅",
    iconBg: "#FFF7ED",
    iconColor: "#C2410C",
    org: "China Literature · Tencent (阅文集团)",
    role: "Editorial Intern · Web novel editorial",
    time: "Nov 2022 – Mar 2023",
  },
  {
    iconSrc: "/photos/logo-ff.png",
    iconFallback: "FF",
    iconBg: "#F5F0EB",
    iconColor: "#5C4A32",
    org: "Fred & Farid Shanghai",
    role: "Account Executive Intern · Client services",
    time: "Jul – Nov 2022",
  },
];

const MOMENTS = [
  { src: "/photos/ff1.jpg", caption: "ff1 caption", rotate: -1.8, marginTop: 0 },
  { src: "/photos/ff2.jpg", caption: "ff2 caption", rotate: 1.2, marginTop: -16 },
  { src: "/photos/purdue1.jpg", caption: "purdue1 caption", rotate: 1.8, marginTop: -8 },
  { src: "/photos/purdue2.jpg", caption: "purdue2 caption", rotate: -1.2, marginTop: 6 },
  { src: "/photos/yw1.jpg", caption: "yw1 caption", rotate: -0.8, marginTop: 10 }
];

const BEYOND_PHOTOS = [
  { src: "/photos/travel1.jpg", caption: "travel1 caption", rotate: -1 },
  { src: "/photos/travel2.jpg", caption: "travel2 caption", rotate: 0.8 },
  { src: "/photos/travel3.jpg", caption: "travel3 caption", rotate: -0.5 },
  { src: "/photos/bake1.jpg", caption: "bake1 caption", rotate: 1 },
  { src: "/photos/bake2.jpg", caption: "bake2 caption", rotate: -0.8 },
  { src: "/photos/halloween1.jpg", caption: "halloween1 caption", rotate: 0.5 },
  { src: "/photos/halloween2.jpg", caption: "halloween2 caption", rotate: -1 },
  { src: "/photos/halloween3.jpg", caption: "halloween3 caption", rotate: 0.8 },
  { src: "/photos/halloween4.jpg", caption: "halloween4 caption", rotate: -0.3 },
];

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-5 text-xs tracking-widest text-moss" style={{ fontFamily: "monospace" }}>
      {children}
    </p>
  );
}

function PhotoCaption({ caption }: { caption: string }) {
  return (
    <span className="pointer-events-none absolute left-1/2 top-2.5 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-white px-2.5 py-[3px] text-[10px] text-ink opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
      {caption}
    </span>
  );
}



const SectionDivider = () => <hr className="my-12 border-0 border-t-[0.5px] border-ink/[0.08]" />;

export default function AboutPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-16 px-6 py-16 md:px-0 md:py-24">
        <div className="flex flex-col">

          {/* 1. 简介区 */}
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-[1fr_260px]">
            <div className="flex flex-col gap-4">
              <h1 className="font-heading text-4xl font-medium">
                Hi, I&apos;m Zihan. You can call me Hannah.
              </h1>
              <p className="font-body text-lg leading-relaxed text-ink/70">
                CS + AI student at Purdue, graduating 2026. I&apos;m building this site to
                document what I&apos;m making and what I&apos;m thinking. If any of it
                resonates, you&apos;re welcome here.
              </p>
            </div>
            <div className="inline-block h-fit w-fit rotate-[1.5deg] border-4 border-white shadow-md">
              <Image
                src="/photos/profile.jpg"
                alt="Zihan Zhao"
                width={240}
                height={320}
                className="object-cover"
              />
            </div>
          </div>

          <SectionDivider />

          {/* 2. EXPERIENCE */}
          <div className="flex flex-col">
            <SectionLabel>EXPERIENCE</SectionLabel>
            <div className="flex flex-col">
              {EXPERIENCE.map((item) => (
                <div
                  key={item.org}
                  className="grid grid-cols-[52px_1fr_auto] items-center gap-3.5 border-b-[0.5px] border-ink/[0.07] py-3.5 first:border-t-[0.5px]"
                >
                  <ExperienceIcon
                    src={item.iconSrc}
                    fallback={item.iconFallback}
                    bg={item.iconBg}
                    color={item.iconColor}
                  />
                  <div className="flex flex-col gap-1">
                    <p className="font-heading text-sm font-medium">{item.org}</p>
                    <p className="text-xs" style={{ color: "#999999" }}>{item.role}</p>
                  </div>
                  <p style={{ fontFamily: "monospace", fontSize: "11px", color: "#BBBAB5" }}>
                    {item.time}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <SectionDivider />

          {/* 3. About Those Experience */}
          <div className="flex flex-col">
            <SectionLabel>About Those Experience</SectionLabel>
            <StoryToggle />
          </div>

          <SectionDivider />

          {/* 4. EXPERIENCE MOMENTS */}
          <div className="flex flex-col">
            <SectionLabel>EXPERIENCE MOMENTS</SectionLabel>
            <div className={`flex items-center gap-3 overflow-x-auto py-5 ${photoStripStyles.scrollHide}`}>
              {MOMENTS.map((photo) => (›
                <div
                  key={photo.src}
                  className="group relative flex-shrink-0"
                  style={{ transform: `rotate(${photo.rotate}deg)`, marginTop: photo.marginTop }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    width={250}
                    height={260}
                    className="border-4 border-white object-cover shadow-md"
                  />
                  <PhotoCaption caption={photo.caption} />
                </div>
              ))}
            </div>
            <p className="mt-2 text-center text-moss" style={{ fontFamily: "monospace", fontSize: "9px" }}>
              ← scroll →
            </p>
          </div>

          <SectionDivider />

          {/* 5. BEYOND WORK */}
          <div className="flex flex-col">
            <SectionLabel>BEYOND WORK</SectionLabel>
            <p className="mb-6 font-body text-base leading-relaxed text-ink/70">
              I bake when I need to think. I travel when I can. Every Halloween I take the
              costume a little too seriously.
            </p>
            <div className="flex flex-wrap gap-2">
              {BEYOND_PHOTOS.map((photo) => (
                <div
                  key={photo.src}
                  className="group relative"
                  style={{ transform: `rotate(${photo.rotate}deg)` }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    width={200}
                    height={200}
                    className="border-[3px] border-white object-cover shadow-md"
                  />
                  <PhotoCaption caption={photo.caption} />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 联系方式 */}
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
              <span className="font-body text-lg transition-colors group-hover:text-moss">
                {link.value}
              </span>
            </a>
          ))}
        </div>

        <StatsCounter />
      </main>

      <PoetryWave />
    </div>
  );
}