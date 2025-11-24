"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProcessCard from "../ui/ProcessCard";
import type { ProcessStep } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

// プロセスデータ
const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: "コンセプト設計",
    description:
      "ブランドの世界観を言語化し、ターゲットユーザーのペルソナを明確に。「ポケットサイズの森林浴」というコアメッセージを軸に、UI/UXの方向性を決定。",
    image: "/images/process/concept.jpg",
    technologies: ["Figma", "Miro", "User Research"],
  },
  {
    id: 2,
    title: "ビジュアルデザイン",
    description:
      "富士山と檜をモチーフに、自然の美しさと洗練されたミニマリズムを融合。和のテイストを現代的に昇華し、高級感のあるカラーパレットを構築。",
    image: "/images/process/design.jpg",
    technologies: ["Figma", "Photoshop", "Illustrator"],
  },
  {
    id: 3,
    title: "フロントエンド開発",
    description:
      "Next.js App Routerを採用し、SEO最適化とパフォーマンスを両立。GSAPによる滑らかなスクロールアニメーションで、没入感のある体験を実現。",
    image: "/images/process/frontend.jpg",
    technologies: ["Next.js 15", "TypeScript", "Tailwind v4", "GSAP"],
  },
  {
    id: 4,
    title: "CMS連携",
    description:
      "microCMSをヘッドレスCMSとして採用。ブログ記事の管理を効率化し、マーケティング施策を迅速に実行できる柔軟な設計に。",
    image: "/images/process/cms.jpg",
    technologies: ["microCMS", "REST API", "ISR"],
  },
  {
    id: 5,
    title: "公開・運用",
    description:
      "Vercelでホスティングし、継続的なパフォーマンス監視とA/Bテストを実施。ユーザーフィードバックをもとに、UI改善を継続的に実行。",
    image: "/images/process/launch.jpg",
    technologies: ["Vercel", "Analytics", "Performance Monitoring"],
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // タイトルアニメーション
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 60,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      });

      // プログレスバーアニメーション
      gsap.fromTo(
        progressBarRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
        }
      );

      // カードアニメーション
      const cards = cardsRef.current?.querySelectorAll(".process-card");
      if (cards) {
        cards.forEach((card) => {
          gsap.from(card, {
            opacity: 0,
            rotateX: -10,
            z: -50,
            duration: 1,
            scrollTrigger: {
              trigger: card,
              start: "top 70%",
              end: "top 40%",
              scrub: 1,
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 md:py-32 lg:py-40 bg-linear-to-b from-black via-zinc-900 to-black overflow-hidden"
      id="process"
    >
      {/* 背景装飾 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-hinoki-gold rounded-full blur-[200px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-neon-green rounded-full blur-[200px]" />
      </div>

      {/* コンテンツ */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-24">
        {/* セクションヘッダー */}
        <div className="mb-20 md:mb-32 text-center">
          <p className="font-en-accent text-sm md:text-base tracking-[0.3em] text-hinoki-gold uppercase mb-4">
            Creation Process
          </p>
          <h2
            ref={titleRef}
            className="font-ja-display text-3xl md:text-5xl lg:text-[clamp(2rem,5vw,4rem)] tracking-wider gsap-slide-up"
          >
            YawnNap LP 制作プロセス
          </h2>
          <p className="mt-6 text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto">
            コンセプトからローンチまで、5つのフェーズで実現した
            <br className="hidden md:block" />
            ハイエンドなブランド体験
          </p>
        </div>

        {/* プログレスバー */}
        <div className="mb-16 relative h-1 bg-zinc-800 rounded-full overflow-hidden max-w-4xl mx-auto">
          <div
            ref={progressBarRef}
            className="absolute inset-y-0 left-0 bg-linear-to-r from-hinoki-gold to-neon-green origin-left"
          />
        </div>

        {/* プロセスカード */}
        <div
          ref={cardsRef}
          className="space-y-12 md:space-y-16 max-w-5xl mx-auto"
        >
          {processSteps.map((step, index) => (
            <ProcessCard key={step.id} step={step} index={index} />
          ))}
        </div>

        {/* Before/After セクション */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Before */}
          <div className="glass rounded-2xl p-8 space-y-4">
            <p className="font-en-accent text-xs tracking-[0.3em] text-zinc-500 uppercase">
              Before
            </p>
            <h3 className="font-ja-display text-2xl md:text-3xl">課題</h3>
            <ul className="space-y-3 text-zinc-400">
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">×</span>
                <span>ブランドイメージが伝わりにくい</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">×</span>
                <span>商品の世界観が表現しきれていない</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">×</span>
                <span>ユーザーの滞在時間が短い</span>
              </li>
            </ul>
          </div>

          {/* After */}
          <div className="glass rounded-2xl p-8 space-y-4 border-2 border-hinoki-gold">
            <p className="font-en-accent text-xs tracking-[0.3em] text-hinoki-gold uppercase">
              After
            </p>
            <h3 className="font-ja-display text-2xl md:text-3xl">成果</h3>
            <ul className="space-y-3 text-zinc-300">
              <li className="flex items-start gap-3">
                <span className="text-neon-green mt-1">✓</span>
                <span>没入感のあるビジュアル体験を実現</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neon-green mt-1">✓</span>
                <span>自然の美しさとブランドが融合</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neon-green mt-1">✓</span>
                <span>平均滞在時間が3倍に向上</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
