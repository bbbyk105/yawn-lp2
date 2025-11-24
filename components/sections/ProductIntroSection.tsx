"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function ProductIntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const image3Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        image1Ref.current,
        { x: -200, opacity: 0, scale: 0.9 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: image1Ref.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        image2Ref.current,
        { x: 200, opacity: 0, scale: 0.9 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: image2Ref.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        image3Ref.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: image3Ref.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );

      gsap.from(textRef.current?.querySelectorAll("p, h2") || [], {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 70%",
          end: "top 40%",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-white py-20 md:py-28 overflow-hidden"
      id="product-intro"
    >
      {/* 背景装飾 */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-hinoki-light/30 to-transparent pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-24">
        {/* メインビジュアル: 3枚の写真 */}
        <div className="relative h-[500px] md:h-[600px] mb-20">
          {/* 画像1: 左後方 */}
          <div
            ref={image1Ref}
            className="absolute top-0 left-0 md:left-10 w-[55%] md:w-[42%] h-[65%] rounded-2xl overflow-hidden shadow-xl"
          >
            <Image
              src="/images/gallery/product-01.jpg"
              alt="YawnNap フレグランスペーパー"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 55vw, 42vw"
            />
          </div>

          {/* 画像2: 右前方 */}
          <div
            ref={image2Ref}
            className="absolute top-16 md:top-24 right-0 md:right-10 w-[65%] md:w-[48%] h-[70%] rounded-2xl overflow-hidden shadow-xl z-10"
          >
            <Image
              src="/images/gallery/product-02.jpg"
              alt="富士ヒノキの香り"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 65vw, 48vw"
            />
          </div>

          {/* 画像3: 中央下 */}
          <div
            ref={image3Ref}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[45%] md:w-[32%] h-[45%] rounded-xl overflow-hidden shadow-xl z-20"
          >
            <Image
              src="/images/gallery/product-03.jpg"
              alt="ポケットサイズの森林浴"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 45vw, 32vw"
            />
          </div>
        </div>

        {/* テキストコンテンツ */}
        <div ref={textRef} className="max-w-3xl mx-auto text-center space-y-6">
          <p className="font-en-accent text-[10px] md:text-xs tracking-[0.3em] text-hinoki-brown uppercase">
            Fragrance Paper from Mt. Fuji
          </p>

          <h2 className="font-ja-display text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide text-black">
            ストレスを感じやすい毎日に、
            <br />
            ひと呼吸で心がふっと軽くなる、
            <br />
            <span className="text-hinoki-gold">森の香り。</span>
          </h2>

          <p className="text-base md:text-lg text-zinc-700 leading-relaxed max-w-2xl mx-auto">
            ヒノキの香りに含まれる
            <span className="text-hinoki-gold font-bold">ヒノキチオール</span>
            が心を静め、深いリラックスへと導きます。
          </p>
        </div>
      </div>
    </section>
  );
}
