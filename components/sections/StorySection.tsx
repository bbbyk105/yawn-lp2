"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftTextRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const rightTextRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 背景パララックス
      gsap.to(sectionRef.current, {
        backgroundPosition: "50% 100%",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // 左側テキストアニメーション
      leftTextRefs.current.forEach((el) => {
        if (el) {
          gsap.from(el, {
            opacity: 0,
            x: -60,
            duration: 1,
            scrollTrigger: {
              trigger: el,
              start: "top 70%",
              end: "top 40%",
              scrub: 1,
            },
          });
        }
      });

      // 右側テキストアニメーション
      rightTextRefs.current.forEach((el) => {
        if (el) {
          gsap.from(el, {
            opacity: 0,
            x: 60,
            duration: 1,
            scrollTrigger: {
              trigger: el,
              start: "top 70%",
              end: "top 40%",
              scrub: 1,
            },
          });
        }
      });

      // 画像アニメーション
      gsap.from(imageRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1.5,
        scrollTrigger: {
          trigger: imageRef.current,
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
      className="relative min-h-screen py-24 md:py-32 lg:py-40 bg-linear-to-b from-black via-forest-deep to-black overflow-hidden"
      id="story"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B7355' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundPosition: "50% 0%",
      }}
    >
      {/* コンテンツ */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-24">
        {/* セクションヘッダー */}
        <div className="mb-20 md:mb-32 text-center">
          <p className="font-en-accent text-sm md:text-base tracking-[0.3em] text-hinoki-gold uppercase mb-4">
            Brand Story
          </p>
          <h2 className="font-ja-display text-3xl md:text-5xl lg:text-[clamp(2rem,5vw,4rem)] tracking-wider">
            森でちょっと一息しませんか？
          </h2>
        </div>

        {/* ストーリーコンテンツ */}
        <div className="max-w-5xl mx-auto space-y-16 md:space-y-24">
          {/* パラグラフ1 - 左寄せ */}
          <div className="flex justify-start">
            <p
              ref={(el) => {
                leftTextRefs.current[0] = el;
              }}
              className="max-w-2xl text-lg md:text-xl lg:text-2xl leading-relaxed text-zinc-300 gsap-slide-right"
            >
              忙しい毎日の中で、ふと立ち止まって深呼吸したくなる瞬間はありませんか？
              <br />
              <br />
              富士山麓の檜の森。そこには、何百年もの時を経て育まれた、静けさと力強さがあります。
            </p>
          </div>

          {/* 中央画像 */}
          <div
            ref={imageRef}
            className="relative aspect-video rounded-3xl overflow-hidden gsap-scale"
          >
            <div className="absolute inset-0 bg-linear-to-br from-hinoki-gold/20 to-forest-deep/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-en-display text-4xl md:text-6xl lg:text-7xl text-white/90 tracking-tight">
                YawnNap
              </p>
            </div>
          </div>

          {/* パラグラフ2 - 右寄せ */}
          <div className="flex justify-end">
            <p
              ref={(el) => {
                rightTextRefs.current[0] = el;
              }}
              className="max-w-2xl text-lg md:text-xl lg:text-2xl leading-relaxed text-zinc-300 gsap-slide-left text-right"
            >
              YawnNapは、その森の香りを紙に閉じ込めた、新しいリラクゼーションツールです。
              <br />
              <br />
              ポケットやバッグに忍ばせて、いつでもどこでも「ひと呼吸分の森」を。
            </p>
          </div>

          {/* パラグラフ3 - 左寄せ */}
          <div className="flex justify-start">
            <p
              ref={(el) => {
                leftTextRefs.current[1] = el;
              }}
              className="max-w-2xl text-lg md:text-xl lg:text-2xl leading-relaxed text-zinc-300 gsap-slide-right"
            >
              電車の中で、オフィスで、寝る前のベッドで。
              <br />
              <br />
              ほんの少しの森が、あなたの今日を少しだけ、でも確かに変えてくれます。
            </p>
          </div>
        </div>

        {/* 締めのコピー */}
        <div className="mt-32 text-center">
          <p
            ref={(el) => {
              rightTextRefs.current[1] = el;
            }}
            className="font-ja-display text-2xl md:text-4xl lg:text-5xl tracking-widest gradient-gold gsap-slide-left"
          >
            ポケットサイズの森林浴
          </p>
        </div>
      </div>
    </section>
  );
}
