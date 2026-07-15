"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const EN_PARAGRAPHS = [
  "Before Purdue, I spent a gap year in Shanghai doing two internships that had absolutely nothing to do with CS.",
  "The first was at Fred & Farid, an ad agency. The pay was ¥1,800 ($265) a month — which, in 2022, is genuinely impressive if you're trying to time-travel back to 2012, no, 1992! 💀",
  "Great experience, but not great for surviving.",
  "Concluded that higher technical barriers = more money = Survive.",
  "Hence: CS.",
  "The second was at China Literature (Yue Wen), editing web novels — male-oriented fiction, which means yes, includes a lot of harem stories.",
  "Core takeaway: everything finds its audience eventually. Most things just need more exposure! Maybe I do too.",
  "Hence: this website.",
];

const ZH_PARAGRAPHS = [
  "来普渡之前,我在上海gap了一年,做了两份跟CS完全没关系的实习。",
  "第一份在FF广告公司做AE。初入茅庐的我非常幸运进入一个氛围很nice的公司，受到了前辈们的悉心指导和关爱。",
  "这是一份很宝贵的体验，除了钱少没毛病，但很显然打工的重要目的是为了钱💀",
  "感悟总结：啊，上海广告行业实习生工资，居然还停留在2012年！不，可能是1992年！",
  "虽然工作体验不错，但一个月1800块钱，饭都要不够吃！文科生的未来在哪里？宋朝吗？",
  "好想要满满的大工资，适量劳动换取金钱，狠狠装入本人口袋！",
  "遂转码！",
  "第二份工作非常幸运地进入到了阅文集团，做男频小说编辑练习生，主要工作是阅读各类网文，在此期间收获了海量快乐的阅读体验（也因为工作性质误食了大量后宫文）。",
  "核心收获：",
  "啊！其实，任何事物都可以在这大千世界找到属于自己的受众呀！可能缺的只是一个被看到的机会，只需要增加一下曝光效应。",
  "或许我也是，遂建立此网站！",
];

const RIPPLE_LAYERS = [
  { delay: 0,    scale: 8,  duration: 1.2, opacity: 0.50, color: "rgba(188,224,223,0.50)" },
  { delay: 0.10, scale: 11, duration: 1.5, opacity: 0.38, color: "rgba(255,255,255,0.38)" },
  { delay: 0.20, scale: 14, duration: 1.8, opacity: 0.28, color: "rgba(188,224,223,0.30)" },
  { delay: 0.30, scale: 17, duration: 2.1, opacity: 0.18, color: "rgba(216,239,238,0.22)" },
  { delay: 0.40, scale: 20, duration: 2.4, opacity: 0.12, color: "rgba(255,255,255,0.18)" },
  { delay: 0.50, scale: 23, duration: 2.7, opacity: 0.07, color: "rgba(188,224,223,0.12)" },
];

const PARTICLE_COUNT = 12;
const PARTICLE_COLORS = [
  "rgba(255,255,255,0.95)",
  "rgba(188,224,223,0.9)",
  "rgba(216,239,238,0.85)",
  "rgba(255,255,255,0.8)",
];

interface RippleEvent {
  id: number;
  x: number;
  y: number;
}

interface Particle {
  id: string;
  x: number;
  y: number;
  angle: number;
  distance: number;
  size: number;
  color: string;
}

function makeParticles(id: number, x: number, y: number): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: `${id}-p${i}`,
    x,
    y,
    angle: (360 / PARTICLE_COUNT) * i + Math.random() * 20 - 10,
    distance: 30 + Math.random() * 60,
    size: 2 + Math.random() * 3,
    color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
  }));
}

export default function StoryToggle() {
  const [showChinese, setShowChinese] = useState(false);
  const [ripples, setRipples] = useState<RippleEvent[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const rippleIdRef = useRef(0);
  const activeLayersRef = useRef(0);
  const shouldReduceMotion = useReducedMotion();

  function handleAreaClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!shouldReduceMotion && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = rippleIdRef.current++;
      activeLayersRef.current += RIPPLE_LAYERS.length;
      setRipples((prev) => [...prev, { id, x, y }]);
      setParticles((prev) => [...prev, ...makeParticles(id, x, y)]);
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !p.id.startsWith(`${id}-p`)));
      }, 900);
    }
    setShowChinese((prev) => !prev);
  }

  function onLayerComplete() {
    activeLayersRef.current -= 1;
    if (activeLayersRef.current <= 0) {
      activeLayersRef.current = 0;
      setRipples([]);
    }
  }

  const fadeDuration = shouldReduceMotion ? 0.15 : 0.35;
  const enterDelay = shouldReduceMotion ? 0 : 0.25;

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={containerRef}
        onClick={handleAreaClick}
        className="relative grid cursor-pointer overflow-hidden rounded-sm select-none"
        role="button"
        tabIndex={0}
        aria-label={showChinese ? "Switch to English" : "切换为中文"}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setShowChinese((prev) => !prev);
          }
        }}
      >
        {/* 涟漪层 */}
        {ripples.map((ripple) =>
          RIPPLE_LAYERS.map((layer, li) => (
            <motion.span
              key={`${ripple.id}-${li}`}
              aria-hidden
              className="pointer-events-none absolute z-10 rounded-full"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: 24,
                height: 24,
                marginLeft: -12,
                marginTop: -12,
                background: layer.color,
                boxShadow:
                  li % 2 === 0
                    ? "0 0 0 1.5px rgba(255,255,255,0.5), inset 0 0 8px rgba(255,255,255,0.25)"
                    : "0 0 0 1px rgba(188,224,223,0.4)",
              }}
              initial={{ scale: 0, opacity: layer.opacity }}
              animate={{ scale: layer.scale, opacity: 5 }}
              transition={{
                duration: layer.duration,
                delay: layer.delay,
                ease: [0.2, 0.8, 0.60, 1.2],
              }}
              onAnimationComplete={onLayerComplete}
            />
          ))
        )}

        {/* 粒子层 */}
        {particles.map((p) => {
          const rad = (p.angle * Math.PI) / 180;
          const tx = Math.cos(rad) * p.distance;
          const ty = Math.sin(rad) * p.distance;
          return (
            <motion.span
              key={p.id}
              aria-hidden
              className="pointer-events-none absolute z-20 rounded-full"
              style={{
                left: p.x,
                top: p.y,
                width: p.size,
                height: p.size,
                marginLeft: -p.size / 2,
                marginTop: -p.size / 2,
                background: p.color,
                boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              }}
              initial={{ x: 10, y: 10, opacity: 20, scale: 3 }}
              animate={{ x: tx, y: ty, opacity: 20, scale: 3 }}
              transition={{ duration: 5 + Math.random() * 0.5, ease: "easeOut" }}
            />
          );
        })}

        {/* 英文段落 */}
        <motion.div
          aria-hidden={showChinese}
          className="col-start-1 row-start-1 flex flex-col gap-3 font-body text-base leading-relaxed text-ink/70 py-1"
          style={{ pointerEvents: "none" }}
          animate={{ opacity: showChinese ? 0 : 1 }}
          transition={{ duration: fadeDuration, delay: showChinese ? 0 : enterDelay }}
        >
          {EN_PARAGRAPHS.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </motion.div>

        {/* 中文段落 */}
        <motion.div
          aria-hidden={!showChinese}
          className="col-start-1 row-start-1 flex flex-col gap-3 font-body text-base leading-relaxed text-ink/70 py-1"
          style={{ pointerEvents: "none" }}
          animate={{ opacity: showChinese ? 1 : 0 }}
          transition={{ duration: fadeDuration, delay: showChinese ? enterDelay : 0 }}
        >
          {ZH_PARAGRAPHS.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </motion.div>
      </div>

      {/* 提示文字 */}
      <p className="text-xs text-moss/50 select-none" style={{ fontFamily: "monospace" }}>
        {showChinese ? "↑ click anywhere above · switch to English" : "↑ 点击上方文字 · 切换中文"}
      </p>
    </div>
  );
}