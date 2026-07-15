"use client";

import { useEffect, useState } from "react";

export interface TocHeading {
  id: string;
  text: string;
  level: 1 | 2 | 3;
}

export default function TableOfContents({ headings }: { headings: TocHeading[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          const topMost = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
          );
          setActiveId(topMost.target.id);
        }
      },
      { rootMargin: "-10% 0px -70% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  function handleClick(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav
      className="fixed z-20 hidden xl:block"
      style={{ left: "2rem", top: "50%", transform: "translateY(-50%)", width: 180 }}
    >
      <p className="mb-4 text-xs tracking-widest text-moss" style={{ fontFamily: "monospace" }}>
        CONTENTS
      </p>
      <ul className="flex flex-col gap-3">
        {headings.map((heading) => {
          const isActive = heading.id === activeId;
          return (
            <li key={heading.id} style={{ paddingLeft: (heading.level - 1) * 10 }}>
              <button
                type="button"
                onClick={() => handleClick(heading.id)}
                className={`flex w-full items-center justify-between gap-2 text-left text-sm transition-colors ${
                  isActive ? "text-moss-dark" : "text-ink/30"
                }`}
              >
                <span className="truncate">{heading.text}</span>
                {isActive && (
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: "#BCE0DF" }}
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
