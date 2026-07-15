"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";


const EN_PARAGRAPHS = [
  "Before Purdue, I took a gap year in Shanghai and did two internships that had nothing to do with CS.",
  "The first was at Fred & Farid, an ad agency. I learned that Shanghai advertising interns get paid like it's still 2012, and that I would very much like to eat real food. Hence: CS.",
  "The second was at China Literature (Tencent), editing web novels — yes, including a lot of harem fiction. Turns out there's an audience for everything. People just need a chance to find it.",
  "Maybe that applies to me too."
];

const ZH_PARAGRAPHS = [
  "来普渡之前,我在上海gap了一年,做了两份跟CS完全没关系的实习。",
  "第一份在FF广告公司做AE。感悟总结：啊，上海广告行业实习生工资，居然还停留在2012年！虽然工作体验不错，但一个月1800块钱饭都要不够吃，好想要满满的大工资，适量劳动换取金钱，狠狠装入本人口袋！遂转码",
  "第二份在阅文集团做男频小说编辑练习生,主要工作是阅读各类网文（含大量后宫文）。读完之后我的核心收获是:任何事物都可以在这大千世界找到属于自己的受众呀,可能缺的只是一个被看到的机会，增加一下曝光效应。",
  "或许我也是，遂建立此网站！"
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
