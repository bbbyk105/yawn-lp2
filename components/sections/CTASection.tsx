import type { CSSProperties } from "react";
import ScrollAnimate from "@/components/animations/ScrollAnimate";
import ArrowRightIcon from "@/components/ui/ArrowRightIcon";
import { SHOP_URL } from "@/lib/site";

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
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-b from-white via-zinc-50 to-white"
      id="cta"
    >
      {/* 浮遊するパーティクル（CSS アニメーション。粒ごとに速さと左右を変える） */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLE_POSITIONS.map((pos, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-hinoki-gold rounded-full opacity-20 blur-sm animate-particle-float"
            style={
              {
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                animationDuration: `${3 + i * 0.5}s`,
                "--particle-x": i % 2 === 0 ? "40px" : "-40px",
              } as CSSProperties
            }
          />
        ))}
      </div>

      {/* グロー効果 */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-hinoki-gold rounded-full blur-[200px] opacity-10" />
      </div>

      {/* コンテンツ */}
      <ScrollAnimate
        from={{ opacity: 0, y: 80, duration: 1.5 }}
        trigger="section"
        start="top 70%"
        end="top 30%"
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

        {/* CTAボタン（ゆっくり脈打つ。CSS アニメーション） */}
        <div className="pt-6 space-y-4">
          <a
            href={SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-10 md:px-12 py-4 bg-black text-white font-en-accent text-sm tracking-[0.3em] uppercase rounded-full transition-all duration-300 hover:bg-hinoki-gold hover:text-black hover:gap-4 hover:shadow-lg animate-pulse-scale"
          >
            <span className="font-bold">商品を見る</span>
            <ArrowRightIcon
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2.5}
            />
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
      </ScrollAnimate>
    </section>
  );
}
