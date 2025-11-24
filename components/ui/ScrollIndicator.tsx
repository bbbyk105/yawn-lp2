"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ScrollIndicator() {
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // バウンスアニメーション
      gsap.to(indicatorRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, indicatorRef);

    return () => ctx.revert();
  }, []);

  const handleClick = () => {
    const blogSection = document.getElementById("blog");
    if (blogSection) {
      blogSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={indicatorRef}
      className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex flex-col items-center gap-3">
        <p className="font-en-accent text-xs tracking-[0.3em] text-zinc-400 uppercase">
          Scroll
        </p>
        <div className="w-6 h-10 border-2 border-zinc-400 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-zinc-400 rounded-full animate-bounce-slow" />
        </div>
      </div>
    </div>
  );
}
