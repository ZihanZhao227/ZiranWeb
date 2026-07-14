"use client";

import { useState } from "react";
import SupportComingSoonModal from "./SupportComingSoonModal";
import { trackSupportClick } from "@/lib/analytics";

const SUPPORT_ENABLED = process.env.NEXT_PUBLIC_SUPPORT_ENABLED === "true";
const KOFI_URL = process.env.NEXT_PUBLIC_KOFI_URL;

export default function SupportLink({
  className,
  extraParams,
}: {
  className?: string;
  extraParams?: Record<string, unknown>;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  function handleClick() {
    // URL 缺失时安全降级为 Coming Soon,即使 SUPPORT_ENABLED 是 true。
    const enabled = SUPPORT_ENABLED && Boolean(KOFI_URL);

    trackSupportClick({
      support_state: enabled ? "enabled" : "coming_soon",
      ...extraParams,
    });

    if (enabled && KOFI_URL) {
      window.open(KOFI_URL, "_blank", "noopener,noreferrer");
    } else {
      setModalOpen(true);
    }
  }

  return (
    <>
      <button type="button" onClick={handleClick} className={className}>
        支持一下 ☕
      </button>
      <SupportComingSoonModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
