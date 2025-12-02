"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PARTICLE_POSITIONS = [
  { left: 15, top: 65 },
  { left: 85, top: 72 },
  { left: 25, top: 88 },
  { left: 70, top: 58 },
  { left: 45, top: 95 },
  { left: 60, top: 80 },
  { left: 10, top: 75 },
  { left: 92, top: 62 },
];

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 80,
        duration: 1.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
          scrub: 1,
        },
      });

      gsap.to(buttonRef.current, {
        scale: 1.05,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      const particles = particlesRef.current?.querySelectorAll(".particle");
      if (particles) {
        particles.forEach((particle, index) => {
          gsap.to(particle, {
            y: -80,
            x: index % 2 === 0 ? 40 : -40,
            opacity: 0,
            duration: 3 + index * 0.5,
            repeat: -1,
            ease: "power1.inOut",
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-b from-white via-zinc-50 to-white"
      id="cta"
    >
      {/* 浮遊するパーティクル */}
      <div
        ref={particlesRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        {PARTICLE_POSITIONS.map((pos, i) => (
          <div
            key={i}
            className="particle absolute w-1.5 h-1.5 bg-hinoki-gold rounded-full opacity-20 blur-sm"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
            }}
          />
        ))}
      </div>

      {/* グロー効果 */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-hinoki-gold rounded-full blur-[200px] opacity-10" />
      </div>

      {/* コンテンツ */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-6 space-y-10 max-w-3xl mx-auto"
      >
        {/* キャッチコピー */}
        <div className="space-y-6">
          <p className="font-en-accent text-[10px] md:text-xs tracking-[0.5em] text-hinoki-brown uppercase">
            Take The Forest With You
          </p>

          <h2 className="font-ja-display text-3xl md:text-4xl lg:text-5xl tracking-wide leading-tight text-black">
            ＿持ち歩ける深呼吸＿
            <br />
            <span className="text-hinoki-gold">
              ヒノキの森でちょっと一息しませんか？
            </span>
          </h2>

          <p className="text-lg md:text-xl text-zinc-700 leading-relaxed">
            日本の息吹が宿る、やさしい香り
          </p>
        </div>

        {/* CTAボタン */}
        <div className="pt-6 space-y-4">
          <a
            ref={buttonRef}
            href="https://yawnnap.shop"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-10 md:px-12 py-4 bg-black text-white font-en-accent text-sm tracking-[0.3em] uppercase rounded-full transition-all duration-300 hover:bg-hinoki-gold hover:text-black hover:gap-4 hover:shadow-lg"
          >
            <span className="font-bold">商品を見る</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>

          <p className="text-xs md:text-sm text-zinc-500">
            YawnNap公式ストアへ
          </p>
        </div>

        {/* 装飾テキスト - 見やすく変更 */}
        <div className="pt-12">
          <p className="font-en-display text-[6rem] md:text-[8rem] lg:text-[10rem] text-zinc-200 font-bold tracking-tighter leading-none">
            YawnNap
          </p>
        </div>

        {/* サブメッセージ */}
        <div className="pt-6 space-y-3">
          <p className="font-ja-display text-base md:text-lg text-zinc-500">
            ＿持ち歩ける深呼吸＿
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-px bg-linear-to-r from-transparent to-hinoki-gold" />
            <p className="text-xs md:text-sm text-zinc-500">
              森でちょっと一息しませんか？
            </p>
            <div className="w-10 h-px bg-linear-to-l from-transparent to-hinoki-gold" />
          </div>
        </div>
      </div>
    </section>
  );
}
