"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

function ScrollLitChar({
  char,
  progress,
  start,
  end,
}: {
  char: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  return <motion.span style={{ opacity }}>{char === " " ? " " : char}</motion.span>;
}

export default function ScrollLit({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"],
  });

  if (shouldReduceMotion) {
    return <p>{text}</p>;
  }

  const chars = text.split("");

  return (
    <p ref={ref}>
      {chars.map((char, index) => (
        <ScrollLitChar
          key={index}
          char={char}
          progress={scrollYProgress}
          start={index / chars.length}
          end={(index + 1) / chars.length}
        />
      ))}
    </p>
  );
}
