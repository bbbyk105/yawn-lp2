"use client";

import {
  createContext,
  use,
  useEffect,
  useState,
  type HTMLAttributes,
} from "react";
import Image from "next/image";
import { useGsap } from "@/hooks/useGsap";

export interface HeroSlide {
  id: number;
  line1: string;
  line2: string;
  sub: string;
  image: string;
  imageAlt: string;
}

const SLIDE_INTERVAL_MS = 5000;

const HeroIndexContext = createContext<{
  index: number;
  setIndex: (index: number) => void;
} | null>(null);

function useHeroIndex() {
  const value = use(HeroIndexContext);
  if (!value) throw new Error("HeroCarousel の中で使ってください");
  return value;
}

/**
 * ヒーローの <section>。表示中のスライド番号を持ち、5秒ごとに切り替える。
 * 背景画像（data-hero-image）とオーバーレイ（data-hero-overlay）にスクロールのパララックスを付ける。
 */
export function HeroCarousel({
  slideCount,
  children,
  ...props
}: HTMLAttributes<HTMLElement> & { slideCount: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slideCount);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [slideCount]);

  const sectionRef = useGsap<HTMLElement>((section, gsap) => {
    const scrollTrigger = { trigger: section, start: "top top", end: "bottom top" };
    gsap.to(section.querySelectorAll("[data-hero-image]"), {
      y: 150,
      scale: 1.1,
      scrollTrigger: { ...scrollTrigger, scrub: 1.5 },
    });
    gsap.to(section.querySelectorAll("[data-hero-overlay]"), {
      opacity: 0.3,
      scrollTrigger: { ...scrollTrigger, scrub: true },
    });
  });

  return (
    <HeroIndexContext value={{ index, setIndex }}>
      <section ref={sectionRef} {...props}>
        {children}
      </section>
    </HeroIndexContext>
  );
}

const fade = (visible: boolean) =>
  `absolute inset-0 transition-opacity duration-1000 ${
    visible ? "opacity-100" : "opacity-0"
  }`;

export function HeroImages({ slides }: { slides: HeroSlide[] }) {
  const { index } = useHeroIndex();

  return slides.map((slide, i) => (
    <div key={slide.id} data-hero-image className={fade(index === i)}>
      <Image
        src={slide.image}
        alt={slide.imageAlt}
        fill
        className="object-cover"
        // スマホは全画面、デスクトップは右半分に表示
        sizes="(max-width: 1024px) 100vw, 50vw"
        // 1枚目が LCP。2・3枚目は最初は見えないので後回し
        preload={i === 0}
        fetchPriority={i === 0 ? undefined : "low"}
      />
    </div>
  ));
}

export function HeroCopy({ slides }: { slides: HeroSlide[] }) {
  const { index } = useHeroIndex();

  return slides.map((slide, i) => (
    <div key={slide.id} className={fade(index === i)} aria-hidden={index !== i}>
      <div className="space-y-3 sm:space-y-4">
        {/* 英語サブタイトル */}
        <p className="font-en-accent text-[9px] sm:text-[10px] md:text-xs tracking-[0.3em] text-white lg:text-hinoki-brown uppercase drop-shadow-lg lg:drop-shadow-none">
          {slide.sub}
        </p>

        {/* メインコピー（切り替わるので h1 にはしない。h1 は下の固定コピー） */}
        <p className="font-ja-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.2] sm:leading-[1.3] tracking-wide text-white lg:text-black drop-shadow-lg lg:drop-shadow-none">
          {slide.line1}
          <br />
          <span className="text-hinoki-gold">{slide.line2}</span>
        </p>
      </div>
    </div>
  ));
}

export function HeroIndicators({ slideCount }: { slideCount: number }) {
  const { index, setIndex } = useHeroIndex();

  return Array.from({ length: slideCount }, (_, i) => (
    <button
      key={i}
      type="button"
      onClick={() => setIndex(i)}
      className={`rounded-full transition-all duration-300 ${
        index === i
          ? "w-10 sm:w-8 h-2 sm:h-1 bg-hinoki-gold"
          : "w-5 sm:w-4 h-2 sm:h-1 bg-white/50 lg:bg-zinc-300 hover:bg-white/70 lg:hover:bg-zinc-400"
      }`}
      aria-label={`スライド${i + 1}に移動`}
    />
  ));
}
