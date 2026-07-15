"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import ExperienceIcon from "@/components/ExperienceIcon";

interface ExperienceItem {
  iconSrc: string;
  iconFallback: string;
  iconBg: string;
  iconColor: string;
  org: string;
  link?: string;
  role: string;
  time: string;
  detail: string[];
}

export default function ExperienceList({ experiences }: { experiences: ExperienceItem[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="flex flex-col">
      {experiences.map((item) => {
        const isOpen = expanded === item.org;
        return (
          <div key={item.org} className="border-b-[0.5px] border-ink/[0.07] first:border-t-[0.5px]">
            <button
              type="button"
              onClick={() => setExpanded(isOpen ? null : item.org)}
              className="grid w-full grid-cols-[52px_1fr_auto] items-center gap-3.5 py-3.5 text-left"
            >
              <ExperienceIcon
                src={item.iconSrc}
                fallback={item.iconFallback}
                bg={item.iconBg}
                color={item.iconColor}
              />
              <div className="flex flex-col gap-1">
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading text-sm font-medium transition-colors hover:text-moss"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item.org}
                  </a>
                ) : (
                  <p className="font-heading text-sm font-medium">{item.org}</p>
                )}
                <p className="text-xs" style={{ color: "#999999" }}>
                  {item.role}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p style={{ fontFamily: "monospace", fontSize: "11px", color: "#BBBAB5" }}>
                  {item.time}
                </p>
                <span className="text-moss" style={{ fontSize: "10px" }}>
                  {isOpen ? "▲" : "▼"}
                </span>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-2 pb-4 pl-[66px] pr-4">
                    {item.detail.map((line, i) => (
                      <p key={i} className="font-body text-sm leading-relaxed text-ink/60">
                        · {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}