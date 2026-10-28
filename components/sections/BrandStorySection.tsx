import Image from "next/image";
import ScrollAnimate from "@/components/animations/ScrollAnimate";

/** ストーリーの各段落が下からふわっと出る */
const TEXT_REVEAL = {
  as: "p",
  from: { opacity: 0, y: 60, duration: 1.5 },
  start: "top 75%",
  end: "top 40%",
} as const;

export default function BrandStorySection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
      id="brand-story"
    >
      {/* 背景画像 - パララックス用に上下に余分な高さを確保 */}
      <ScrollAnimate
        to={{ y: 80, scale: 1.05 }}
        trigger="section"
        start="top bottom"
        end="bottom top"
        scrub={1.5}
        className="absolute inset-0"
        style={{ top: "-10%", height: "120%" }}
      >
        <Image
          src="/images/gallery/fuji-02.jpg"
          alt="富士山麓の森"
          fill
          className="object-cover"
        />
        {/* 白いオーバーレイ */}
        <div className="absolute inset-0 bg-white/85" />
      </ScrollAnimate>

      {/* コンテンツ */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-24 py-20">
        <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
          {/* タイトル */}
          <div className="text-center space-y-4">
            <p className="font-en-accent text-[10px] md:text-xs tracking-[0.4em] text-hinoki-brown uppercase">
              Brand Story
            </p>
            <h2 className="font-ja-display text-3xl md:text-4xl lg:text-5xl tracking-wide text-black">
              富士山からとどけるヒノキの香り
            </h2>
          </div>

          {/* ストーリーテキスト */}
          <div className="space-y-10 md:space-y-12">
            <ScrollAnimate
              {...TEXT_REVEAL}
              className="text-xl md:text-2xl text-black leading-relaxed text-center font-ja-display"
            >
              富士山のふもとで育まれた
              <span className="text-hinoki-gold font-bold">
                &ldquo;清らかな香り&rdquo;
              </span>
              を、
              <br className="hidden md:block" />
              で日常に安らぎを届けたい。
            </ScrollAnimate>

            <div className="h-px bg-linear-to-r from-transparent via-hinoki-gold to-transparent" />

            <ScrollAnimate
              {...TEXT_REVEAL}
              className="text-base md:text-lg text-zinc-700 leading-relaxed max-w-3xl mx-auto"
            >
              ヒノキは、日本書紀にもスサノオノミコトが宮殿に用いるよう教えたと記されるほど、
              古くから日本で親しまれてきた木です。
              神社や寺院の建築材としてはもちろん、ヒノキ風呂などにも使用され
              暮らしの中で心を整える素材として大切にされてきました。
            </ScrollAnimate>

            <ScrollAnimate
              {...TEXT_REVEAL}
              className="text-base md:text-lg text-zinc-700 leading-relaxed max-w-3xl mx-auto"
            >
              忙しさの中で、心がざわつきやすくなっているときこそ、
              ふとした瞬間に、森を歩くようなヒノキの香りが
              そっと気持ちを入れ替えてくれたら——。
            </ScrollAnimate>

            <div className="h-px bg-linear-to-r from-transparent via-hinoki-gold to-transparent" />

            <ScrollAnimate
              {...TEXT_REVEAL}
              className="text-xl md:text-2xl text-black leading-relaxed text-center font-ja-display"
            >
              森の静けさを、いつでも持ち歩けたら。
              <br />
              そんな願いから、
              <br className="md:hidden" />
              <span className="text-hinoki-gold text-2xl md:text-3xl">
                このフレグランスペーパーは生まれました。
              </span>
            </ScrollAnimate>

            <div className="pt-8 text-center space-y-6">
              <ScrollAnimate
                {...TEXT_REVEAL}
                className="text-2xl md:text-3xl font-ja-display tracking-wide text-black"
              >
                もう、今日は森へ行きたい！
              </ScrollAnimate>

              <ScrollAnimate
                {...TEXT_REVEAL}
                className="text-base md:text-lg text-zinc-700 leading-relaxed max-w-2xl mx-auto"
              >
                そう思ってすぐには森にはいけないけれど、
                <br />
                富士ヒノキの香りをそっと携えて深呼吸してみてください
                <br />
                <span className="text-hinoki-gold font-bold text-lg md:text-xl">
                  その香りでリラックス。あなたをやさしく整えてくれるはず。
                </span>
              </ScrollAnimate>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
