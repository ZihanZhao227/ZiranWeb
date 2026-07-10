"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Side = "ziran" | "lab";

const PANELS: {
  side: Side;
  label: string;
  sub: string;
  href: string;
  base: "ink" | "paper";
}[] = [
  {
    side: "ziran",
    label: "Ziran",
    sub: "关于我 · About",
    href: "/about",
    base: "ink",
  },
  {
    side: "lab",
    label: "Lab",
    sub: "作品 · Work",
    href: "/work",
    base: "paper",
  },
];

export default function SplitLanding() {
  const router = useRouter();
  const [hovered, setHovered] = useState<Side | null>(null);
  const [exiting, setExiting] = useState<Side | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      setCursor({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  function handleEnter(side: Side, href: string) {
    if (exiting) return;
    setExiting(side);
    window.setTimeout(() => {
      router.push(href);
    }, 650);
  }

  return (
    <div
      ref={containerRef}
      className="relative h-dvh w-full overflow-hidden cursor-none select-none"
    >
      {/* custom cursor */}
      <div
        className="pointer-events-none fixed z-50 flex items-center justify-center rounded-full transition-[width,height,background-color] duration-300 ease-out mix-blend-difference"
        style={{
          left: cursor.x,
          top: cursor.y,
          transform: "translate(-50%, -50%)",
          width: hovered ? 96 : 12,
          height: hovered ? 96 : 12,
          backgroundColor: "#f7f6f2",
        }}
      >
        {hovered && (
          <span className="font-heading text-xs tracking-widest text-ink uppercase">
            Enter
          </span>
        )}
      </div>

      <div className="flex h-full w-full flex-col md:flex-row">
        {PANELS.map(({ side, label, sub, href, base }) => {
          const isHovered = hovered === side;
          const isExiting = exiting === side;
          const isOtherExiting = exiting !== null && exiting !== side;

          return (
            <button
              key={side}
              type="button"
              onMouseEnter={() => setHovered(side)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleEnter(side, href)}
              className={[
                "relative flex flex-1 items-center justify-center overflow-hidden transition-[flex-grow,background-color] duration-500 ease-in-out",
                base === "ink" ? "bg-ink text-paper" : "bg-paper text-ink",
                isHovered ? "bg-moss! text-paper!" : "",
                isExiting ? "flex-grow-[3] bg-moss! text-paper!" : "",
                isOtherExiting ? "flex-grow-0 opacity-0" : "",
              ].join(" ")}
              style={{ flexBasis: 0 }}
            >
              <span className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
                <span className="font-heading text-[13vw] leading-none tracking-tight md:text-[6vw]">
                  {label}
                </span>
                <span className="font-body text-sm italic tracking-wide opacity-70 md:text-base">
                  {sub}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* marquee strip */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 overflow-hidden border-t border-moss/40 bg-moss py-2">
        <div className="animate-marquee flex w-max whitespace-nowrap font-heading text-sm tracking-[0.3em] text-paper uppercase">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="mx-6">
              Ziran · Lab ·
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
