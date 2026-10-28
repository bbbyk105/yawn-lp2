"use client";

import { useRef } from "react";
import { useOnScroll } from "@/hooks/useOnScroll";
import { getScrollProgress } from "@/lib/scroll";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  // スクロールのたびに再レンダリングしないよう、バーの transform を直接書き換える
  useOnScroll(() => {
    if (!barRef.current) return;
    const progress = getScrollProgress(
      window.scrollY,
      document.documentElement.scrollHeight,
      window.innerHeight,
    );
    barRef.current.style.transform = `scaleX(${progress})`;
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-zinc-900 z-50">
      <div
        ref={barRef}
        className="h-full origin-left bg-linear-to-r from-hinoki-gold via-amber-500 to-neon-green transition-transform duration-150"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
