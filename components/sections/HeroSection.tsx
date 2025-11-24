"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const heroTexts = [
  {
    id: 1,
    line1: "ほんの少しの森で、",
    line2: "今日が変わる。",
    sub: "A Little Forest Changes Your Day",
  },
  {
    id: 2,
    line1: "ポケットサイズの",
    line2: "森林浴",
    sub: "Pocket-Sized Forest Bathing",
  },
  {
    id: 3,
    line1: "森でちょっと",
    line2: "一息しませんか？",
    sub: "Take a Breath in the Forest",
  },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroTexts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        y: 150,
        scale: 1.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(overlayRef.current, {
        opacity: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-white"
      id="hero"
    >
      {/* 背景画像（右半分） */}
      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-white" />

        <div ref={imageRef} className="relative overflow-hidden">
          <Image
            src="/images/hero/fuji-mountain.jpg"
            alt="富士山麓のヒノキの森"
            fill
            className="object-cover"
            priority
            quality={95}
          />
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-linear-to-l from-transparent via-white/20 to-white/60"
          />
        </div>
      </div>

      {/* コンテンツ */}
      <div className="relative z-10 h-full container mx-auto px-6 md:px-12 lg:px-24">
        <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 左側: テキストコンテンツ */}
          <div className="space-y-8 max-w-xl">
            {/* 切り替わるメインコピー */}
            <div className="relative h-[200px] md:h-60">
              {heroTexts.map((text, index) => (
                <div
                  key={text.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    currentIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="space-y-4">
                    {/* 英語サブタイトル */}
                    <p className="font-en-accent text-[10px] md:text-xs tracking-[0.3em] text-hinoki-brown uppercase">
                      {text.sub}
                    </p>

                    {/* メインコピー */}
                    <h1 className="font-ja-display text-4xl md:text-5xl lg:text-6xl leading-[1.3] tracking-wide text-black">
                      {text.line1}
                      <br />
                      <span className="text-hinoki-gold">{text.line2}</span>
                    </h1>
                  </div>
                </div>
              ))}
            </div>

            {/* 固定サブコピー */}
            <div className="space-y-4 pt-6 border-t border-zinc-200">
              <p className="font-ja-display text-lg md:text-xl text-black tracking-wider">
                ＿持ち歩ける深呼吸＿
              </p>
              <p className="text-sm md:text-base text-zinc-600 leading-relaxed">
                富士山麓の富士ヒノキの香りを
                <br />
                ポケットに入れて持ち歩く
                <br />
                フレグランスペーパー
              </p>
            </div>

            {/* CTAボタン */}
            <div className="flex items-center gap-6 pt-6">
              <a
                href="https://yawnnap.shop"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-en-accent text-xs tracking-[0.2em] uppercase rounded-full transition-all duration-300 hover:bg-hinoki-gold hover:text-black hover:gap-3"
              >
                Shop Now
                <svg
                  className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>

              <button
                onClick={() => {
                  document
                    .getElementById("product-intro")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="font-en-accent text-xs tracking-[0.2em] text-zinc-600 uppercase border-b border-transparent hover:border-hinoki-gold transition-all duration-300"
              >
                Discover More
              </button>
            </div>
          </div>

          <div className="hidden lg:block" />
        </div>
      </div>

      {/* ブランドロゴ（右下） */}
      <div className="absolute bottom-8 right-6 md:right-12 lg:right-24 z-20">
        <p className="font-en-display text-2xl md:text-3xl text-hinoki-gold tracking-tight">
          YawnNap
        </p>
      </div>
    </section>
  );
}
