"use client";

import { motion, useReducedMotion } from "motion/react";

export default function WordReveal({ text }: { text: string }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{text}</>;
  }

  const words = text.split(" ");

  return (
    <>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.08 }}
          style={{ display: "inline-block" }}
        >
          {word}
          {index < words.length - 1 && " "}
        </motion.span>
      ))}
    </>
  );
}
