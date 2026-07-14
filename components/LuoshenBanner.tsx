"use client";

import { motion, useReducedMotion } from "motion/react";

export default function LuoshenBanner() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 800 }}>
      <motion.div
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.015, 1] }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
        style={
          shouldReduceMotion
            ? {
                position: "absolute",
                inset: 0,
                backgroundImage: "url('/images/luoshen-scroll.png')",
                backgroundSize: "cover",
                backgroundPosition: "center 40%",
              }
            : {
                position: "absolute",
                inset: "-20% 0",
                height: "140%",
                backgroundImage: "url('/images/luoshen-scroll.png')",
                backgroundSize: "cover",
                backgroundPosition: "center 40%",
                backgroundAttachment: "fixed",
              }
        }
      />

      <div
        className="pointer-events-none absolute inset-x-0 top-0"
        style={{
          height: 150,
          zIndex: 2,
          background: "linear-gradient(to bottom, #F7F6F2, transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{
          height: 200,
          zIndex: 2,
          background: "linear-gradient(to top, #F7F6F2, transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-0"
        style={{
          width: 100,
          zIndex: 2,
          background: "linear-gradient(to right, #F7F6F2, transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0"
        style={{
          width: 100,
          zIndex: 2,
          background: "linear-gradient(to left, #F7F6F2, transparent)",
        }}
      />

      <div
        className="absolute"
        style={{
          bottom: 32,
          right: 40,
          zIndex: 3,
          fontFamily: "monospace",
          fontSize: "11px",
          color: "#8C7A5E",
          opacity: 0.65,
        }}
      >
        洛神赋图　顾恺之（传）
      </div>
    </div>
  );
}
