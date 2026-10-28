import Image from "next/image";
import ScrollAnimate from "@/components/animations/ScrollAnimate";

const IMAGE_SCROLL = { start: "top 80%", end: "top 30%" } as const;

export default function ProductIntroSection() {
  return (
    <section
      className="relative min-h-screen bg-white py-20 md:py-28 overflow-hidden"
      id="product-intro"
    >
      {/* 背景装飾 */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-hinoki-light/30 to-transparent pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-24">
        {/* メインビジュアル: 3枚の写真 */}
        <div className="relative h-[500px] md:h-[600px] mb-20">
          {/* 画像1: 左後方 */}
          <ScrollAnimate
            from={{ x: -200, opacity: 0, scale: 0.9 }}
            to={{ x: 0, opacity: 1, scale: 1, duration: 1.5 }}
            {...IMAGE_SCROLL}
            className="absolute top-0 left-0 md:left-10 w-[55%] md:w-[42%] h-[65%] rounded-2xl overflow-hidden shadow-xl"
          >
            <Image
              src="/images/gallery/product-01.jpg"
              alt="YawnNap フレグランスペーパー"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 55vw, 42vw"
            />
          </ScrollAnimate>

          {/* 画像2: 右前方 */}
          <ScrollAnimate
            from={{ x: 200, opacity: 0, scale: 0.9 }}
            to={{ x: 0, opacity: 1, scale: 1, duration: 1.5 }}
            {...IMAGE_SCROLL}
            className="absolute top-16 md:top-24 right-0 md:right-10 w-[65%] md:w-[48%] h-[70%] rounded-2xl overflow-hidden shadow-xl z-10"
          >
            <Image
              src="/images/gallery/product-02.jpg"
              alt="富士ヒノキの香り"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 65vw, 48vw"
            />
          </ScrollAnimate>

          {/* 画像3: 中央下 */}
          <ScrollAnimate
            from={{ y: 100, opacity: 0 }}
            to={{ y: 0, opacity: 1, duration: 1.5 }}
            {...IMAGE_SCROLL}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[45%] md:w-[32%] h-[45%] rounded-xl overflow-hidden shadow-xl z-20"
          >
            <Image
              src="/images/gallery/product-03.jpg"
              alt="ポケットサイズの森林浴"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 45vw, 32vw"
            />
          </ScrollAnimate>
        </div>

        {/* テキストコンテンツ */}
        <ScrollAnimate
          targets="p, h2"
          from={{ opacity: 0, y: 40, stagger: 0.2, duration: 1 }}
          start="top 70%"
          end="top 40%"
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <p className="font-en-accent text-[10px] md:text-xs tracking-[0.3em] text-hinoki-brown uppercase">
            Fragrance Paper from Mt. Fuji
          </p>

          <h2 className="font-ja-display text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide text-black">
            ストレスを感じたとき
            <br />
            シュッとひと吹き。
            <br />
            ひと呼吸でふっと軽くなる、
            <br />
            <span className="text-hinoki-gold">森の香り。</span>
          </h2>

          <p className="text-base md:text-lg text-zinc-700 leading-relaxed max-w-2xl mx-auto">
            ヒノキの香りに含まれる
            <span className="text-hinoki-gold font-bold">ヒノキチオール</span>
            が心を静め、深いリラックスへと導きます。
          </p>
        </ScrollAnimate>
      </div>
    </section>
  );
}
