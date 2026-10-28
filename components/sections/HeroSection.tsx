import ArrowRightIcon from "@/components/ui/ArrowRightIcon";
import ScrollToButton from "@/components/navigation/ScrollToButton";
import {
  HeroCarousel,
  HeroCopy,
  HeroImages,
  HeroIndicators,
  type HeroSlide,
} from "./HeroCarousel";
import { SHOP_URL } from "@/lib/site";

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    line1: "ほんの少しの深呼吸で、",
    line2: "今日が変わる。",
    sub: "A Little Forest Changes Your Day",
    image: "/images/hero/forest-3.jpg",
    imageAlt: "木漏れ日を受ける苔むした木の幹",
  },
  {
    id: 2,
    line1: "ポケットサイズの",
    line2: "森林浴",
    sub: "Pocket-Sized Forest Bathing",
    image: "/images/hero/forest-2.jpg",
    imageAlt: "丸太が積まれた貯木場と周囲の森",
  },
  {
    id: 3,
    line1: "ヒノキの森でちょっと",
    line2: "一息しませんか？",
    sub: "Take a Breath in the Forest",
    image: "/images/hero/fuji-mountain.jpg",
    imageAlt: "森の向こうにそびえる富士山",
  },
];

export default function HeroSection() {
  return (
    <HeroCarousel
      slideCount={HERO_SLIDES.length}
      className="relative h-screen w-full overflow-hidden bg-white"
      id="hero"
    >
      {/* 背景画像 - スマホでは全画面、デスクトップでは右半分 */}
      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
        {/* デスクトップ用の左側白背景 */}
        <div className="hidden lg:block bg-white" />

        {/* 背景画像エリア */}
        <div className="relative overflow-hidden">
          <HeroImages slides={HERO_SLIDES} />
          {/* スマホ用: 暗いオーバーレイ（テキスト可読性向上） */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 lg:hidden z-10" />
          {/* デスクトップ用: 左から白へのグラデーション */}
          <div
            data-hero-overlay
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
              <HeroCopy slides={HERO_SLIDES} />
            </div>

            {/* 固定サブコピー - h1（title と揃える）はスマホでも表示、説明文はスマホでは省略 */}
            <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-6 border-t border-white/30 lg:border-zinc-200">
              <h1 className="font-ja-display text-base sm:text-lg md:text-xl text-white lg:text-black tracking-wider drop-shadow-md lg:drop-shadow-none">
                富士ヒノキのフレグランスペーパー
              </h1>
              <p className="hidden sm:block text-xs sm:text-sm md:text-base text-white/90 lg:text-zinc-600 leading-relaxed drop-shadow-md lg:drop-shadow-none">
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
                href={SHOP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 sm:px-6 sm:py-3 bg-white lg:bg-black text-black lg:text-white font-en-accent text-sm sm:text-xs tracking-[0.2em] uppercase rounded-full transition-all duration-300 hover:bg-hinoki-gold hover:text-black hover:gap-3 shadow-lg lg:shadow-none w-full sm:w-auto"
              >
                Shop Now
                <ArrowRightIcon className="w-4 h-4 sm:w-3 sm:h-3 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <ScrollToButton
                targetId="product-intro"
                className="font-en-accent text-sm sm:text-xs tracking-[0.2em] text-white lg:text-zinc-600 uppercase border-b border-white/50 lg:border-transparent hover:border-hinoki-gold transition-all duration-300 py-2 sm:py-0 drop-shadow-md lg:drop-shadow-none"
              >
                Discover More
              </ScrollToButton>
            </div>

            {/* インジケーター - スマホで見やすく */}
            <div className="flex justify-center lg:justify-start gap-2.5 sm:gap-2 pt-4 sm:pt-4">
              <HeroIndicators slideCount={HERO_SLIDES.length} />
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
    </HeroCarousel>
  );
}
