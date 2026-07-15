"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const EN_PARAGRAPHS = [
  "Before Purdue, I took a gap year in Shanghai.",
  "The first internship was at Fred & Farid, an ad agency.",
  "The first was at Fred & Farid, an ad agency. ",
  "It taught me that intern salaries in Shanghai advertising stopped updating around 2012,",
  "and that I very much want to eat actual meals. Higher technical barriers seemed like the solution.",
  "The second was at China Literature (Yue Wen), editing web novels — yes, including a lot of harem fiction. ",
  "What I learned: there's an audience for everything.",
  "People just need exposure. Maybe that applies to me too."
  
];

const ZH_PARAGRAPHS = [
  "来普渡之前,我在上海gap了一年。",
  "第一份在FF广告公司做AE。上海广告行业实习生的工资停留在十年前,让我意识到吃饱饭需要更高的技术壁垒。",

  "第二份在阅文集团做男频小说编辑Intern。",
  "本人在此期间阅读了各类流行种类的小说（包含海量大量后宫文）。",
  "这让我意识到：这世界上什么都有人喜欢,缺少的或许只是一个曝光的机会。",
  "或许我也是"
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
