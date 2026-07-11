"use client";

import { useEffect, useRef, useState } from "react";
import type { ShelfCategory } from "@/types/shelf";

function storageKey(category: ShelfCategory) {
  return `shelf-cover:${category}`;
}

export default function CoverUploader({
  category,
  onCoverChange,
}: {
  category: ShelfCategory;
  onCoverChange: (dataUrl: string | null) => void;
}) {
  const [hasCustomCover, setHasCustomCover] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 同步一次性读取本地存储的封面覆盖值,组件挂载后才有 window 可用。
    const saved = window.localStorage.getItem(storageKey(category));
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHasCustomCover(true);
      onCoverChange(saved);
    }
    // onCoverChange 由父组件用 useState setter 传入,引用稳定,不需要放进依赖数组
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      window.localStorage.setItem(storageKey(category), dataUrl);
      setHasCustomCover(true);
      onCoverChange(dataUrl);
    };
    reader.readAsDataURL(file);
  }

  function handleReset() {
    window.localStorage.removeItem(storageKey(category));
    setHasCustomCover(false);
    onCoverChange(null);
  }

  return (
    <div className="flex items-center gap-3 font-body text-xs text-ink/40">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="transition-colors hover:text-moss"
      >
        更换封面
      </button>
      {hasCustomCover && (
        <button type="button" onClick={handleReset} className="transition-colors hover:text-moss">
          恢复默认
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  );
}
