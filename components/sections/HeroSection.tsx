"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const heroTexts = [
  {
    id: 1,
    line1: "ほんの少しの深呼吸で、",
    line2: "今日が変わる。",
    sub: "A Little Forest Changes Your Day",
    image: "/images/hero/forest-3.jpg",
  },
  {
    id: 2,
    line1: "ポケットサイズの",
    line2: "森林浴",
    sub: "Pocket-Sized Forest Bathing",
    image: "/images/hero/forest-2.jpg",
  },
  {
    id: 3,
    line1: "ヒノキの森でちょっと",
    line2: "一息しませんか？",
    sub: "Take a Breath in the Forest",
    image: "/images/hero/fuji-mountain.jpg",
  },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroTexts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      imageRefs.current.forEach((imageRef) => {
        if (imageRef) {
          gsap.to(imageRef, {
            y: 150,
            scale: 1.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        }
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
      {/* 背景画像 - スマホでは全画面、デスクトップでは右半分 */}
      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
        {/* デスクトップ用の左側白背景 */}
        <div className="hidden lg:block bg-white" />

        {/* 背景画像エリア */}
        <div className="relative overflow-hidden">
          {heroTexts.map((text, index) => (
            <div
              key={text.id}
              ref={(el) => {
                imageRefs.current[index] = el;
              }}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentIndex === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={text.image}
                alt={`${text.line1}${text.line2}`}
                fill
                className="object-cover"
                priority={index === 0}
                quality={95}
              />
            </div>
          ))}
          {/* スマホ用: 暗いオーバーレイ（テキスト可読性向上） */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 lg:hidden z-10" />
          {/* デスクトップ用: 左から白へのグラデーション */}
          <div
            ref={overlayRef}
            className="hidden lg:block absolute inset-0 bg-gradient-to-l from-transparent via-white/20 to-white/60 z-10"
          />
        </div>
      </div>

      {/* コンテンツ */}
      <div className="relative z-10 h-full container mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="h-full flex flex-col justify-center lg:grid lg:grid-cols-2 lg:items-center gap-8 lg:gap-12">
          {/* テキストコンテンツ - スマホでは中央配置 */}
          <div className="space-y-6 sm:space-y-8 max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            {/* 切り替わるメインコピー */}
            <div className="relative h-[180px] sm:h-[200px] md:h-60">
              {heroTexts.map((text, index) => (
                <div
                  key={text.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    currentIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="space-y-3 sm:space-y-4">
                    {/* 英語サブタイトル */}
                    <p className="font-en-accent text-[9px] sm:text-[10px] md:text-xs tracking-[0.3em] text-white lg:text-hinoki-brown uppercase drop-shadow-lg lg:drop-shadow-none">
                      {text.sub}
                    </p>

                    {/* メインコピー */}
                    <h1 className="font-ja-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.2] sm:leading-[1.3] tracking-wide text-white lg:text-black drop-shadow-lg lg:drop-shadow-none">
                      {text.line1}
                      <br />
                      <span className="text-hinoki-gold">{text.line2}</span>
                    </h1>
                  </div>
                </div>
              ))}
            </div>

            {/* 固定サブコピー - スマホでは非表示または簡略化 */}
            <div className="hidden sm:block space-y-3 sm:space-y-4 pt-4 sm:pt-6 border-t border-white/30 lg:border-zinc-200">
              <p className="font-ja-display text-base sm:text-lg md:text-xl text-white lg:text-black tracking-wider drop-shadow-md lg:drop-shadow-none">
                ＿持ち歩ける森の香り＿
              </p>
              <p className="text-xs sm:text-sm md:text-base text-white/90 lg:text-zinc-600 leading-relaxed drop-shadow-md lg:drop-shadow-none">
                富士山麓のフレッシュな富士ヒノキの香りを
                <br />
                あなたにも届けたい
                <br />
                バッグに入れて持ち歩く
                <br />
                フォレストフレグランス
              </p>
            </div>

            {/* CTAボタン - スマホで大きく、タッチフレンドリーに */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-4 sm:pt-6">
              <a
                href="https://yawnnap.shop"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 sm:px-6 sm:py-3 bg-white lg:bg-black text-black lg:text-white font-en-accent text-sm sm:text-xs tracking-[0.2em] uppercase rounded-full transition-all duration-300 hover:bg-hinoki-gold hover:text-black hover:gap-3 shadow-lg lg:shadow-none w-full sm:w-auto"
              >
                Shop Now
                <svg
                  className="w-4 h-4 sm:w-3 sm:h-3 transition-transform duration-300 group-hover:translate-x-1"
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
                className="font-en-accent text-sm sm:text-xs tracking-[0.2em] text-white lg:text-zinc-600 uppercase border-b border-white/50 lg:border-transparent hover:border-hinoki-gold transition-all duration-300 py-2 sm:py-0 drop-shadow-md lg:drop-shadow-none"
              >
                Discover More
              </button>
            </div>

            {/* インジケーター - スマホで見やすく */}
            <div className="flex justify-center lg:justify-start gap-2.5 sm:gap-2 pt-4 sm:pt-4">
              {heroTexts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? "w-10 sm:w-8 h-2 sm:h-1 bg-hinoki-gold"
                      : "w-5 sm:w-4 h-2 sm:h-1 bg-white/50 lg:bg-zinc-300 hover:bg-white/70 lg:hover:bg-zinc-400"
                  }`}
                  aria-label={`スライド${index + 1}に移動`}
                />
              ))}
            </div>
          </div>

          {/* デスクトップ用のスペーサー */}
          <div className="hidden lg:block" />
        </div>
      </div>

      {/* ブランドロゴ - スマホでは中央下、デスクトップでは右下 */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-12 xl:right-24 z-20">
        <p className="font-en-display text-xl sm:text-2xl md:text-3xl text-white lg:text-hinoki-gold tracking-tight drop-shadow-lg lg:drop-shadow-none text-center lg:text-left">
          YawnNap
        </p>
      </div>
    </section>
  );
}
