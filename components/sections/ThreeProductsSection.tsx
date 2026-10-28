import Image from "next/image";
import ScrollAnimate from "@/components/animations/ScrollAnimate";

const products = [
  {
    id: 1,
    name: "富士山 ひのきアロマウォーター",
    description:
      "スプレータイプのひのき蒸留水。持ち歩きに最適なサイズ。バッグやポケットに入れておいて、電車の中や移動中、会議の前にもひと吹き。深呼吸してリラックス。",
    features: [
      "持ち運びやすいサイズ感",
      "気軽に人にも渡せる3本セット",
      "お土産物としても重宝する富士山パッケージ",
    ],
    images: [
      "/images/gallery/product-01.jpg",
      "/images/gallery/product-02.jpg",
      "/images/gallery/product-03.jpg",
    ],
  },
  {
    id: 2,
    name: "富士山 ひのきフレグランスペーパー (四角形)",
    description:
      "日本の伝統的な格子模様をデザインしたバイオマス素材のフレグランスペーパーでヒノキの香りを楽しむ。デスクや、枕元、キャンドルの側でスプレーを吹きかけながら使えば、香りと共に、キャンドルの光と影を楽しめます。",
    features: [
      "光と影の空間を演出",
      "リラックスへ誘う",
      "お土産物としても最適",
    ],
    images: [
      "/images/gallery/product-04.jpg",
      "/images/gallery/product-05.jpg",
      "/images/gallery/product-06.jpg",
    ],
  },
  {
    id: 3,
    name: "富士山 ひのきフレグランスペーパー（木型)",
    description:
      "組み立てると自立する。可愛らしい木の形のバイオマス素材フレグランスペーパー。優しいヒノキの香りで、デスクに置いたり、紐で垂らすと香りモビールに。小さな森林浴をいつもそばに。",
    features: [
      "植物が好きな人へのプレゼントとして",
      "香りオブジェとして",
      "何度も楽しめるヒノキスプレー付き",
    ],
    images: [
      "/images/gallery/product-07.jpg",
      "/images/gallery/product-08.jpg",
      "/images/gallery/product-09.jpg",
    ],
  },
];

/** 商品画像のアニメーション（imageIndex 番目ほど少し遅れて出る） */
function productImageAnimation(imageIndex: number) {
  return {
    from: {
      opacity: 0,
      y: 60,
      scale: 0.95,
      duration: 1,
      delay: imageIndex * 0.1,
    },
    start: "top 80%",
    end: "top 45%",
  };
}

export default function ThreeProductsSection() {
  return (
    <section
      className="relative bg-white py-20 md:py-28 overflow-hidden"
      id="products"
    >
      {/* 背景装飾 */}
      <div className="absolute inset-0 bg-linear-to-b from-zinc-50 via-white to-zinc-50" />

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-24">
        {/* セクションヘッダー */}
        <div className="mb-20 text-center space-y-4">
          <p className="font-en-accent text-[10px] md:text-xs tracking-[0.4em] text-hinoki-brown uppercase">
            Our Products
          </p>
          <h2 className="font-ja-display text-3xl md:text-4xl lg:text-5xl tracking-wide text-black">
            ひのきを楽しむ
            <br />
            ３つのラインナップ
          </h2>
          <p className="text-sm md:text-base text-zinc-600 max-w-xl mx-auto leading-relaxed">
            使いたいシーンに合わせて選べる3タイプ
          </p>
        </div>

        {/* 商品リスト */}
        <div className="space-y-24 md:space-y-32">
          {products.map((product, index) => (
            <div
              key={product.id}
              data-product
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* テキストコンテンツ（商品ごとに左右交互から入る） */}
              <ScrollAnimate
                from={{
                  opacity: 0,
                  x: index % 2 === 0 ? -100 : 100,
                  duration: 1.2,
                }}
                trigger="[data-product]"
                start="top 75%"
                end="top 40%"
                className={`space-y-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}
              >
                {/* 商品番号 */}
                <div className="flex items-center gap-4">
                  <span className="font-en-display text-5xl md:text-6xl text-hinoki-gold/20 font-bold leading-none">
                    0{product.id}
                  </span>
                  <div className="flex-1 h-px bg-linear-to-r from-hinoki-gold to-transparent" />
                </div>

                {/* 商品名 */}
                <h3 className="font-ja-display text-2xl md:text-3xl tracking-wide text-black">
                  {product.name}
                </h3>

                {/* 説明 */}
                <p className="text-sm md:text-base text-zinc-700 leading-relaxed">
                  {product.description}
                </p>

                {/* 特徴リスト */}
                <ul className="space-y-2">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-hinoki-gold" />
                      <span className="text-xs md:text-sm text-zinc-600">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </ScrollAnimate>

              {/* 画像グリッド（3枚） */}
              <div
                className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}
              >
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {/* 画像1: 大きく（2列分） */}
                  <ScrollAnimate
                    {...productImageAnimation(0)}
                    className="col-span-2 relative w-full"
                    style={{ aspectRatio: "16/10" }}
                  >
                    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src={product.images[0]}
                        alt={`${product.name} - メイン`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </ScrollAnimate>

                  {/* 画像2: 左下 */}
                  <ScrollAnimate
                    {...productImageAnimation(1)}
                    className="relative w-full"
                    style={{ aspectRatio: "1/1" }}
                  >
                    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-md">
                      <Image
                        src={product.images[1]}
                        alt={`${product.name} - サブ1`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  </ScrollAnimate>

                  {/* 画像3: 右下 */}
                  <ScrollAnimate
                    {...productImageAnimation(2)}
                    className="relative w-full"
                    style={{ aspectRatio: "1/1" }}
                  >
                    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-md">
                      <Image
                        src={product.images[2]}
                        alt={`${product.name} - サブ2`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  </ScrollAnimate>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
