"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import projects from "@/data/projects.json";

const STATS: { value: number; label: string }[] = [
  { value: projects.length, label: "projects" },
  { value: 3, label: "blog categories" },
  { value: 2026, label: "" },
];

function CountUpNumber({ value, active }: { value: number; active: boolean }) {
  const [display, setDisplay] = useState(active ? 0 : value);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) {
      // 直接同步到最终值:reduced motion 时跳过数字滚动动画。
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplay(value);
      return;
    }

    const duration = 800;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(progress * value));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    }

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [value, active]);

  return <span className="font-heading text-3xl">{display}</span>;
}

export default function StatsCounter() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="border-t-[0.5px] border-moss pt-8">
      <div className="grid grid-cols-3 divide-x-[0.5px] divide-moss">
        {STATS.map((stat, index) => (
          <div key={index} className="flex flex-col items-center gap-1 px-4 text-center">
            <CountUpNumber value={stat.value} active={!shouldReduceMotion} />
            {stat.label && (
              <span className="font-body text-sm text-ink/50">{stat.label}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
