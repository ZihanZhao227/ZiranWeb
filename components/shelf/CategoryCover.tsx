"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ShelfCategory } from "@/types/shelf";
import styles from "./CategoryCover.module.css";

const COVER_CLASS: Record<ShelfCategory, string> = {
  Everyday: styles.everyday,
  Inedible: styles.inedible,
  Medley: styles.medley,
};

export default function CategoryCover({ category }: { category: ShelfCategory }) {
  const router = useRouter();
  const [opening, setOpening] = useState(false);

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
      className="group block w-full text-left transition-[transform,opacity] duration-500 ease-in-out"
      style={{
        transform: opening ? "scale(1.08)" : undefined,
        opacity: opening ? 0 : 1,
      }}
    >
      <span
        className={`relative block aspect-[3/4] w-full overflow-hidden border border-ink/10 shadow-sm transition-shadow duration-300 group-hover:shadow-md ${COVER_CLASS[category]}`}
      >
        <span className="absolute inset-x-0 bottom-0 p-4 font-heading text-2xl tracking-tight">
          {category}
        </span>
      </span>
    </button>
  );
}
