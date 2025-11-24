"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function BrandStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // パララックスの範囲を調整（少なめに）
      gsap.to(imageRef.current, {
        y: 80, // 150 → 80 に変更
        scale: 1.05, // 1.08 → 1.05 に変更
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      textRefs.current.forEach((text) => {
        if (!text) return;

        gsap.from(text, {
          opacity: 0,
          y: 60,
          duration: 1.5,
          scrollTrigger: {
            trigger: text,
            start: "top 75%",
            end: "top 40%",
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
      id="brand-story"
    >
      {/* 背景画像 - パララックス用の余白を追加 */}
      <div
        ref={imageRef}
        className="absolute inset-0"
        style={{
          top: "-10%",
          height: "120%", // 上下に余分な高さを確保
        }}
      >
        <Image
          src="/images/gallery/fuji-02.jpg"
          alt="富士山麓の森"
          fill
          className="object-cover"
          quality={90}
        />
        {/* 白いオーバーレイ */}
        <div className="absolute inset-0 bg-white/85" />
      </div>

      {/* コンテンツ */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-24 py-20">
        <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
          {/* タイトル */}
          <div className="text-center space-y-4">
            <p className="font-en-accent text-[10px] md:text-xs tracking-[0.4em] text-hinoki-brown uppercase">
              Brand Story
            </p>
            <h2 className="font-ja-display text-3xl md:text-4xl lg:text-5xl tracking-wide text-black">
              ブランドストーリー
            </h2>
          </div>

          {/* ストーリーテキスト */}
          <div className="space-y-10 md:space-y-12">
            <p
              ref={(el) => {
                textRefs.current[0] = el;
              }}
              className="text-xl md:text-2xl text-black leading-relaxed text-center font-ja-display"
            >
              富士山麓の木が持つ
              <span className="text-hinoki-gold font-bold">
                &ldquo;清らかな香り&rdquo;
              </span>
              を、
              <br className="hidden md:block" />
              誰かの心にも届けたい。
            </p>

            <div className="h-px bg-linear-to-r from-transparent via-hinoki-gold to-transparent" />

            <p
              ref={(el) => {
                textRefs.current[1] = el;
              }}
              className="text-base md:text-lg text-zinc-700 leading-relaxed max-w-3xl mx-auto"
            >
              ヒノキは昔から、神社や寺院、ヒノキ風呂などに使われてきた日本では古くから親しまれた木。
              暮らしの中で心を整え、心を整える素材として大切にされてきました。
            </p>

            <p
              ref={(el) => {
                textRefs.current[2] = el;
              }}
              className="text-base md:text-lg text-zinc-700 leading-relaxed max-w-3xl mx-auto"
            >
              忙しさの中で、心がざわつきやすくなっているときこそ、
              ふとした瞬間に、森を歩くようなヒノキの香りが
              そっと気持ちを入れ替えてくれたら——。
            </p>

            <div className="h-px bg-linear-to-r from-transparent via-hinoki-gold to-transparent" />

            <p
              ref={(el) => {
                textRefs.current[3] = el;
              }}
              className="text-xl md:text-2xl text-black leading-relaxed text-center font-ja-display"
            >
              森の静けさを、いつでも持ち歩けたら。
              <br />
              そんな願いから、
              <br className="md:hidden" />
              <span className="text-hinoki-gold text-2xl md:text-3xl">
                このフレグランスペーパーは生まれました。
              </span>
            </p>

            <div className="pt-8 text-center space-y-6">
              <p
                ref={(el) => {
                  textRefs.current[4] = el;
                }}
                className="text-2xl md:text-3xl font-ja-display tracking-wide text-black"
              >
                もう、今日は森へ行きたい！
              </p>

              <p
                ref={(el) => {
                  textRefs.current[5] = el;
                }}
                className="text-base md:text-lg text-zinc-700 leading-relaxed max-w-2xl mx-auto"
              >
                そう思ってもなかなかすぐには森にはいけないけれど
                <br />
                持ち歩く富士ヒノキの香りでそっと深呼吸してみてください。
                <br />
                <span className="text-hinoki-gold font-bold text-lg md:text-xl">
                  きっと、リラックスできるはず。
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
