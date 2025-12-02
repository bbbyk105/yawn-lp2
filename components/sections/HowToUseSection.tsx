"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "さっと取り出して深呼吸",
    description:
      "バッグから取り出して香りを吸い込むだけ。ストレスで浅くなった呼吸がすっと整います。",
  },
  {
    number: "02",
    title: "香りのオブジェとして",
    description:
      "デスクや枕元など、小さなスペースに置くだけで、森林浴のような清々しさ。",
  },
  {
    number: "03",
    title: "キャンドルと合わせて",
    description:
      "お皿に水を張り、キャンドルの側に置くと、格子柄の影がゆらぎ、癒しの演出に。ヒノキの香りが穏やかに広がり、気持ちが静まり返る夜の時間にもピッタリです。",
  },
];

export default function HowToUseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.5,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      });

      stepsRef.current.forEach((step) => {
        if (!step) return;

        gsap.from(step, {
          opacity: 0,
          y: 60,
          duration: 1.2,
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
            end: "top 50%",
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
      className="relative min-h-screen bg-white py-20 md:py-28 overflow-hidden"
      id="how-to-use"
    >
      {/* 背景装飾 */}
      <div className="absolute inset-0 bg-linear-to-b from-zinc-50 via-white to-zinc-50" />

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-24">
        {/* セクションヘッダー */}
        <div ref={titleRef} className="mb-16 md:mb-20 text-center space-y-4">
          <p className="font-en-accent text-[10px] md:text-xs tracking-[0.4em] text-hinoki-brown uppercase">
            How to Use
          </p>
          <h2 className="font-ja-display text-3xl md:text-4xl lg:text-5xl tracking-wide text-black">
            使い方
          </h2>
          <p className="text-sm md:text-base text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            シンプルで、いつでもどこでも。
            <br />
            あなたのペースで森を感じてください。
          </p>
        </div>

        {/* ステップカード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mb-16">
          {steps.map((step, index) => (
            <div
              key={step.number}
              ref={(el) => {
                stepsRef.current[index] = el;
              }}
              className="group relative"
            >
              {/* カード */}
              <div className="relative h-full bg-white rounded-2xl border border-zinc-200 p-8 transition-all duration-500 hover:border-hinoki-gold hover:shadow-xl hover:-translate-y-2">
                {/* 装飾的な大きな番号（背景） */}
                <div className="absolute top-6 right-6 font-en-display text-[5rem] font-bold text-zinc-50 leading-none pointer-events-none">
                  {step.number}
                </div>

                {/* コンテンツ */}
                <div className="relative space-y-6">
                  {/* 番号バッジ */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-hinoki-gold">
                      <span className="font-en-accent text-sm font-bold text-hinoki-gold">
                        {step.number}
                      </span>
                    </div>
                    <div className="flex-1 ml-4 h-px bg-linear-to-r from-hinoki-gold to-transparent" />
                  </div>

                  {/* タイトル */}
                  <h3 className="font-ja-display text-xl md:text-2xl tracking-wide leading-tight text-black">
                    {step.title}
                  </h3>

                  {/* 説明 */}
                  <p className="text-sm md:text-base text-zinc-700 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* ホバー時の装飾ライン */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-hinoki-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl" />
              </div>
            </div>
          ))}
        </div>

        {/* 下部メッセージ */}
        <div className="text-center space-y-6">
          <div className="inline-block px-8 py-4 bg-zinc-50 rounded-full border border-zinc-200">
            <p className="text-sm md:text-base text-zinc-700">
              あなたの日常に、ひと呼吸分の森を。
            </p>
          </div>

          {/* 追加情報 */}
          <div className="max-w-3xl mx-auto pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {/* 左カラム */}
              <div className="space-y-4 p-6 bg-white rounded-xl border border-zinc-200">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-hinoki-gold rounded-full" />
                  <h4 className="font-ja-display text-base md:text-lg text-black">
                    香りの持続時間
                  </h4>
                </div>
                <p className="text-sm text-zinc-700 leading-relaxed">
                  開封後、約1〜2週間香りをお楽しみいただけます。保管状態により異なります。
                </p>
              </div>

              {/* 右カラム */}
              <div className="space-y-4 p-6 bg-white rounded-xl border border-zinc-200">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-hinoki-gold rounded-full" />
                  <h4 className="font-ja-display text-base md:text-lg text-black">
                    保管方法
                  </h4>
                </div>
                <p className="text-sm text-zinc-700 leading-relaxed">
                  直射日光を避け、涼しい場所で保管してください。密閉容器に入れるとより長持ちします。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
