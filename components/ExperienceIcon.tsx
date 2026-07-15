"use client";

import Image from "next/image";

export default function ExperienceIcon({
  src,
  fallback,
  bg,
  color,
}: {
  src: string;
  fallback: string;
  bg: string;
  color: string;
}) {
  return (
    <div
      className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-[10px]"
      style={{ backgroundColor: bg, color }}
    >
      <Image
        src={src}
        alt=""
        width={44}
        height={44}
        className="object-cover"
        onError={(e) => {
          e.currentTarget.style.display = "none";
          const span = e.currentTarget.parentElement?.querySelector("span");
          if (span) span.style.display = "flex";
        }}
      />
      <span
        className="absolute inset-0 hidden items-center justify-center text-[11px] font-semibold"
        style={{ fontFamily: "monospace" }}
      >
        {fallback}
      </span>
    </div>
  );
}