"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProcessStep } from "@/lib/types";

interface ProcessCardProps {
  step: ProcessStep;
  index: number;
}

export default function ProcessCard({ step }: ProcessCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="process-card group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="relative grid grid-cols-1 md:grid-cols-2 gap-8 glass rounded-3xl p-8 md:p-12 transition-all duration-500"
        style={{
          transform: isHovered ? "translateZ(20px)" : "translateZ(0)",
          boxShadow: isHovered
            ? "0 25px 50px -12px rgba(196, 169, 98, 0.3)"
            : "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* 左側: コンテンツ */}
        <div className="space-y-6 flex flex-col justify-center">
          {/* ステップ番号 */}
          <div className="flex items-center gap-4">
            <span className="font-en-display text-6xl md:text-7xl text-hinoki-gold/20 font-bold">
              {String(step.id).padStart(2, "0")}
            </span>
            <div className="flex-1 h-px bg-linear-to-r from-hinoki-gold to-transparent" />
          </div>

          {/* タイトル */}
          <h3 className="font-ja-display text-2xl md:text-3xl lg:text-4xl tracking-wider">
            {step.title}
          </h3>

          {/* 説明 */}
          <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
            {step.description}
          </p>

          {/* テクノロジー */}
          <div className="flex flex-wrap gap-2 pt-4">
            {step.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-en-accent tracking-wider bg-zinc-800 text-hinoki-gold rounded-full border border-zinc-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* 右側: 画像 */}
        <div className="relative aspect-4/3 md:aspect-square rounded-2xl overflow-hidden">
          <Image
            src={step.image}
            alt={step.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        </div>
      </div>
    </div>
  );
}
