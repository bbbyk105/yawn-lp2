import Image from "next/image";
import ScrollAnimate from "@/components/animations/ScrollAnimate";

const benefits = [
  {
    number: "01",
    title: "心の落ち着き",
    description: "ヒノキチオールが自律神経を整え、深いリラックス状態へ",
  },
  {
    number: "02",
    title: "抗菌・防虫効果",
    description: "天然の抗菌作用で、清潔な空間を保ちます",
  },
  {
    number: "03",
    title: "高い消臭性",
    description: "不快な臭いを自然に包み込み、爽やかに",
  },
  {
    number: "04",
    title: "清潔感のある森林浴感",
    description: "まるで森の中にいるような清々しさ",
  },
];

export default function HinokiStorySection() {
  return (
    <section
      className="relative min-h-screen bg-linear-to-b from-white via-zinc-50 to-white py-20 md:py-28 overflow-hidden"
      id="hinoki-story"
    >
      {/* 背景テクスチャ */}
      <div className="absolute inset-0 hinoki-texture opacity-5" />

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-24">
        {/* セクションヘッダー */}
        <ScrollAnimate
          from={{ opacity: 0, y: 80, duration: 1.5 }}
          start="top 80%"
          end="top 40%"
          className="mb-20 text-center space-y-4"
        >
          <p className="font-en-accent text-[10px] md:text-xs tracking-[0.4em] text-hinoki-brown uppercase">
            100% Mt. Fuji Hinoki
          </p>
          <h2 className="font-ja-display text-3xl md:text-4xl lg:text-5xl tracking-wide leading-tight text-black">
            100% 国産のヒノキから生まれた
            <br />
            <span className="text-hinoki-gold">爽やかな森の香り。</span>
          </h2>
        </ScrollAnimate>

        {/* メインコンテンツ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center mb-20">
          {/* 左: 画像（パララックス） */}
          <ScrollAnimate
            to={{ y: -80 }}
            start="top bottom"
            end="bottom top"
            scrub={1.5}
            className="relative"
          >
            <div className="relative aspect-4/5 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/gallery/hinoki-02.jpg"
                alt="富士山麓のヒノキの森"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

              {/* 画像上のテキスト */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-ja-display text-xl md:text-2xl leading-relaxed">
                  富士山麓は
                  <br />
                  火山灰土壌・冷涼な気候・
                  <br />
                  大きな寒暖差。
                </p>
              </div>
            </div>
          </ScrollAnimate>

          {/* 右: テキスト */}
          <ScrollAnimate
            targets="p"
            from={{ opacity: 0, y: 50, stagger: 0.2, duration: 1 }}
            start="top 75%"
            end="top 40%"
            className="space-y-6"
          >
            <p className="text-base md:text-lg text-zinc-700 leading-relaxed">
              この
              <span className="text-hinoki-gold font-bold">
                &ldquo;厳しい自然&rdquo;
              </span>
              で、 ゆっくりと育ったヒノキは、木目が細かく密度が高い
              <span className="text-black font-bold">「富士ヒノキ」</span>
              として高い品質を保持しながら育林されています。
            </p>

            <div className="h-px bg-linear-to-r from-hinoki-gold via-hinoki-gold/50 to-transparent" />

            <p className="text-base md:text-lg text-zinc-700 leading-relaxed">
              富士ヒノキには森林浴と同じ成分
              <br />
              <span className="text-hinoki-gold font-bold text-xl md:text-2xl">
                ヒノキチオール
              </span>
              が多く含まれています。
            </p>
          </ScrollAnimate>
        </div>

        {/* ヒノキチオールの効果 - タイトル */}
        <div className="mb-12 text-center">
          <h3 className="font-ja-display text-2xl md:text-3xl tracking-wide text-black mb-3">
            ヒノキチオールの効果
          </h3>
          <p className="text-sm text-zinc-600">
            富士ヒノキに含まれる天然成分が、心と体に穏やかに働きかけます
          </p>
        </div>

        {/* ベネフィットカード - エレガント版 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-20">
          {benefits.map((benefit) => (
            <ScrollAnimate
              key={benefit.number}
              from={{ opacity: 0, y: 60, duration: 1 }}
              start="top 85%"
              end="top 50%"
              className="group relative"
            >
              {/* カード本体 */}
              <div className="relative p-6 bg-white rounded-xl border border-zinc-200 transition-all duration-500 hover:border-hinoki-gold hover:shadow-lg hover:-translate-y-1 h-full">
                {/* 番号 */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-en-display text-4xl font-bold text-zinc-100 leading-none">
                    {benefit.number}
                  </span>
                  <div className="w-8 h-px bg-hinoki-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* タイトル */}
                <h3 className="font-ja-display text-base md:text-lg mb-3 tracking-wide text-black">
                  {benefit.title}
                </h3>

                {/* 説明 */}
                <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
                  {benefit.description}
                </p>

                {/* ホバー時の装飾ライン */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-hinoki-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-xl" />
              </div>
            </ScrollAnimate>
          ))}
        </div>

        {/* 追加情報 - 横並び2カラム */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* 香りづけ */}
          <div className="relative bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 overflow-hidden group hover:border-hinoki-gold transition-all duration-500">
            {/* 装飾的な番号 */}
            <div className="absolute top-4 right-4 font-en-display text-6xl font-bold text-zinc-50 leading-none">
              01
            </div>

            <div className="relative space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-hinoki-gold rounded-full" />
                <h3 className="font-ja-display text-lg md:text-xl tracking-wide text-black">
                  香りづけは「富士ヒノキ抽出水 + ヒノキ精油 +
                  フレッシュなヒノキチップ」だけ
                </h3>
              </div>
              <p className="text-sm md:text-base text-zinc-700 leading-relaxed">
                化学的な香料を使用せず、 天然の蒸留水と精油（0.5～1%
                以下に希釈）だけの香りです。
                敏感な方でも心地よく使えるようにブレンドしていますが、
                アロマ水はフレグランスペーパーに吹きかけてお使いください。
                （肌に吹きかけ赤みが出る場合はご使用をお控え下さい。）
              </p>
            </div>
          </div>

          {/* 素材 */}
          <div className="relative bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 overflow-hidden group hover:border-hinoki-gold transition-all duration-500">
            {/* 装飾的な番号 */}
            <div className="absolute top-4 right-4 font-en-display text-6xl font-bold text-zinc-50 leading-none">
              02
            </div>

            <div className="relative space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-hinoki-gold rounded-full" />
                <h3 className="font-ja-display text-lg md:text-xl tracking-wide text-black">
                  素材は環境にやさしいバイオマス不織布
                </h3>
              </div>
              <p className="text-sm md:text-base text-zinc-700 leading-relaxed">
                フレグランスペーパーの素材は、
                土に還りやすいバイオマス不織布を使用しています。
                旅先や飛行機の中などでもリラックスのお供に、お使い下さい。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
