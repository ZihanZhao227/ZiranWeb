"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import styles from "./PoetryWave.module.css";

const POETRY_LINES = [
  "夜耿耿而不寐，露繁霜而至晓。",
  "What compiles runs. What runs matters.",
  "代码如流水，思绪是源头。",
  "Every function — a small promise kept.",
  "翩若惊鸿，婉若游龙。",
  "The best code is the code that disappears.",
  "彼美人兮，见之不忘。",
  "What is built with care outlasts its maker.",
  "夜耿耿而不寐，露繁霜而至晓。",
];

const WAVE_LAYERS = [
  { alpha: 0.18, amplitude: 16, frequency: 0.012, speed: 0.0006, baseline: 0.5 },
  { alpha: 0.3, amplitude: 20, frequency: 0.016, speed: 0.0009, baseline: 0.65 },
  { alpha: 0.45, amplitude: 26, frequency: 0.02, speed: 0.0013, baseline: 0.82 },
];

const PARTICLE_COUNT = 60;

interface Particle {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  driftSpeed: number;
  swaySpeed: number;
  swayOffset: number;
}

function createParticles(width: number, height: number): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 1 + Math.random() * 2,
    alpha: 0.08 + Math.random() * 0.06,
    driftSpeed: 0.1 + Math.random() * 0.15,
    swaySpeed: 0.0008 + Math.random() * 0.0012,
    swayOffset: Math.random() * Math.PI * 2,
  }));
}

export default function PoetryWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // reduced motion 时不跑 canvas 动画,只留容器本身的静态渐变背景。
    if (shouldReduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let animationFrame: number;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = createParticles(width, height);
    };

    resize();
    window.addEventListener("resize", resize);

    const drawWave = (time: number, layer: (typeof WAVE_LAYERS)[number]) => {
      const baselineY = height * layer.baseline;
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 4) {
        const y = baselineY + Math.sin(x * layer.frequency + time * layer.speed) * layer.amplitude;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = `rgba(188, 224, 223, ${layer.alpha})`;
      ctx.fill();
    };

    const drawParticles = (time: number) => {
      for (const p of particles) {
        const y = (((p.y - time * p.driftSpeed * 0.02) % height) + height) % height;
        const x = p.x + Math.sin(time * p.swaySpeed + p.swayOffset) * 8;
        ctx.beginPath();
        ctx.arc(x, y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(44, 79, 77, ${p.alpha})`;
        ctx.fill();
      }
    };

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      for (const layer of WAVE_LAYERS) {
        drawWave(time, layer);
      }
      drawParticles(time);
      animationFrame = requestAnimationFrame(render);
    };

    animationFrame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
    };
  }, [shouldReduceMotion]);

  return (
    <div className="flex flex-col">
      {/* 浮动诗句字幕 */}
      <div className="relative overflow-hidden" style={{ height: 380, backgroundColor: "#F5F3EE" }}>
        <div
          className={shouldReduceMotion ? undefined : styles.track}
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "18px",
            color: "#2C4F4D",
            letterSpacing: "0.06em",
            lineHeight: 2.8,
            textAlign: "center",
          }}
        >
          {POETRY_LINES.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 top-0"
          style={{
            height: 60,
            zIndex: 1,
            background: "linear-gradient(to bottom, #F5F3EE, transparent)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0"
          style={{
            height: 60,
            zIndex: 1,
            background: "linear-gradient(to top, #F5F3EE, transparent)",
          }}
        />
      </div>

      {/* 薄荷蓝粒子海浪 */}
      <div
        className="relative overflow-hidden"
        style={{ height: 300, background: "linear-gradient(to bottom, #F5F3EE, #F7F6F2)" }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        <div
          className="pointer-events-none absolute inset-x-0 top-0"
          style={{
            height: 80,
            zIndex: 1,
            background: "linear-gradient(to bottom, #F5F3EE, transparent)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0"
          style={{
            height: 80,
            zIndex: 1,
            background: "linear-gradient(to top, #F7F6F2, transparent)",
          }}
        />
      </div>
    </div>
  );
}
