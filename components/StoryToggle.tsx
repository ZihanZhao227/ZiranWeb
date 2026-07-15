"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const EN_PARAGRAPHS = [
  "Before Purdue, I took a gap year in Shanghai.",
  "The first internship was at Fred & Farid, an ad agency.",
  "The second was at China Literature, editing web novels.",
];

const ZH_PARAGRAPHS = [
  "来普渡之前,我在上海晃悠了一年。",
  "第一份在FF广告公司做AE。",
  "第二份在阅文集团编网文。",
];

export default function StoryToggle() {
  const [showChinese, setShowChinese] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <button
        type="button"
        onClick={() => setShowChinese((prev) => !prev)}
        className="w-fit border-b border-moss text-xs text-moss transition-colors hover:text-moss-dark"
        style={{ fontFamily: "monospace" }}
      >
        {showChinese ? "← read in English" : "← 看中文版"}
      </button>

      <AnimatePresence mode="wait">
        {showChinese ? (
          <motion.div
            key="zh"
            id="zh-story"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-3 font-body text-base leading-relaxed text-ink/70"
          >
            {ZH_PARAGRAPHS.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="en"
            id="en-story"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-3 font-body text-base leading-relaxed text-ink/70"
          >
            {EN_PARAGRAPHS.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
