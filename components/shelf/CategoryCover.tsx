"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ShelfCategory } from "@/types/shelf";

const BOOK_STYLES: Record<
  ShelfCategory,
  { width: number; height: number; background: string; color: string }
> = {
  Everyday: {
    width: 50,
    height: 175,
    background: "#F0EAD8",
    color: "#5C4A32",
  },
  Inedible: {
    width: 44,
    height: 142,
    background: "linear-gradient(160deg, #3D5A30, #2A2048 50%, #5A2A18)",
    color: "#E8D5C0",
  },
  Medley: {
    width: 46,
    height: 150,
    background: "linear-gradient(135deg, #C5BBA8, #ADBFBC, #BCAFCA)",
    color: "#4A4060",
  },
};

export default function CategoryCover({ category }: { category: ShelfCategory }) {
  const router = useRouter();
  const [opening, setOpening] = useState(false);
  const book = BOOK_STYLES[category];

  function handleOpen() {
    if (opening) return;
    setOpening(true);
    window.setTimeout(() => {
      router.push(`/shelf/${category}`);
    }, 480);
  }

  return (
    <button
      type="button"
      onClick={handleOpen}
      className="group relative text-left transition-[transform,opacity] duration-500 ease-in-out"
      style={{
        transform: opening ? "scale(1.08)" : undefined,
        opacity: opening ? 0 : 1,
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-7 whitespace-nowrap px-2 py-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          backgroundColor: "#2C4F4D",
          color: "#F7F6F2",
          fontFamily: "monospace",
          fontSize: "10px",
        }}
      >
        {category}
      </span>

      <span
        className="relative block overflow-hidden shadow-sm transition-[translate,box-shadow] duration-[350ms] ease-[cubic-bezier(0.34,1.4,0.64,1)] group-hover:-translate-y-[22px] group-hover:shadow-md"
        style={{
          width: book.width,
          height: book.height,
          background: book.background,
        }}
      >
        <span
          aria-hidden
          className="absolute inset-y-0 left-0"
          style={{ width: 5, backgroundColor: "rgba(0,0,0,0.18)" }}
        />
        <span
          className="absolute inset-0 flex items-center justify-center"
          style={{
            writingMode: "vertical-lr",
            transform: "rotate(180deg)",
            fontFamily: "monospace",
            fontSize: "10px",
            color: book.color,
          }}
        >
          {category}
        </span>
      </span>
    </button>
  );
}
