"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import type { GalleryImage } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

// ギャラリー画像データ
const galleryImages: GalleryImage[] = [
  // PHASE 1: 商品中心 (1-5)
  {
    id: 1,
    src: "/images/gallery/product-01.jpg",
    alt: "商品パッケージ（手持ち）",
    category: "product",
    caption: "持ち歩ける森の香り",
  },
  {
    id: 2,
    src: "/images/gallery/product-02.jpg",
    alt: "商品クローズアップ",
    category: "product",
    caption: "富士ヒノキの優しい香り",
  },
  {
    id: 3,
    src: "/images/gallery/product-03.jpg",
    alt: "商品展開写真",
    category: "product",
    caption: "シンプルで美しいデザイン",
  },
  {
    id: 4,
    src: "/images/gallery/product-04.jpg",
    alt: "使用シーン",
    category: "product",
    caption: "ポケットやバッグに",
  },
  {
    id: 5,
    src: "/images/gallery/product-05.jpg",
    alt: "商品と檜の葉",
    category: "product",
    caption: "自然との調和",
  },

  // PHASE 2: 自然への移行 (6-8)
  {
    id: 6,
    src: "/images/gallery/fuji-01.jpg",
    alt: "富士山遠景（雲海）",
    category: "fuji",
    caption: "富士山麓の雄大な自然",
  },
  {
    id: 7,
    src: "/images/gallery/fuji-02.jpg",
    alt: "富士山中景",
    category: "fuji",
    caption: "森のシルエットと富士山",
  },
  {
    id: 8,
    src: "/images/gallery/waterfall.jpg",
    alt: "滝の流れ",
    category: "waterfall",
    caption: "清らかな水の音",
  },

  // PHASE 3: 檜の森 (9-13)
  {
    id: 9,
    src: "/images/gallery/hinoki-01.jpg",
    alt: "檜の森（木漏れ日）",
    category: "hinoki",
    caption: "木漏れ日が差し込む森",
  },
  {
    id: 10,
    src: "/images/gallery/hinoki-02.jpg",
    alt: "檜の幹クローズアップ",
    category: "hinoki",
    caption: "何百年もの時を刻む",
  },
  {
    id: 11,
    src: "/images/gallery/hinoki-03.jpg",
    alt: "檜の葉（マクロ）",
    category: "hinoki",
    caption: "繊細な葉の美しさ",
  },
  {
    id: 12,
    src: "/images/gallery/hinoki-04.jpg",
    alt: "森の小道",
    category: "hinoki",
    caption: "森の奥へ続く道",
  },
  {
    id: 13,
    src: "/images/gallery/hinoki-05.jpg",
    alt: "朝霧の森",
    category: "hinoki",
    caption: "静寂に包まれた朝",
  },

  // PHASE 4: 商品回帰 (14-15)
  {
    id: 14,
    src: "/images/gallery/product-06.jpg",
    alt: "商品と自然光",
    category: "product",
    caption: "自然の恵みを詰め込んで",
  },
  {
    id: 15,
    src: "/images/gallery/product-07.jpg",
    alt: "ブランドイメージ",
    category: "product",
    caption: "YawnNap - あなたのポケットに森を",
  },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      slidesRef.current.forEach((slide) => {
        if (!slide) return;

        const image = slide.querySelector(".gallery-image");
        const caption = slide.querySelector(".gallery-caption");

        // 各スライドのフェード＆スケールアニメーション
        gsap.fromTo(
          slide,
          { opacity: 0 },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: slide,
              start: "top center",
              end: "bottom center",
              scrub: 1,
              toggleActions: "play reverse play reverse",
            },
          }
        );

        // 画像の微妙なズームパララックス
        gsap.fromTo(
          image,
          { scale: 1.1 },
          {
            scale: 1,
            scrollTrigger: {
              trigger: slide,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        );

        // キャプションのフェードイン
        gsap.from(caption, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          scrollTrigger: {
            trigger: slide,
            start: "top 60%",
            end: "top 40%",
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black" id="gallery">
      {/* ギャラリースライド */}
      {galleryImages.map((image, index) => (
        <div
          key={image.id}
          ref={(el) => {
            slidesRef.current[index] = el;
          }}
          className="relative h-screen w-full flex items-center justify-center overflow-hidden"
        >
          {/* 画像 */}
          <div className="gallery-image absolute inset-0">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover object-center"
              quality={90}
              priority={index < 3}
              sizes="100vw"
            />
            {/* グラデーションオーバーレイ */}
            <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/60" />
          </div>

          {/* キャプション */}
          <div className="gallery-caption relative z-10 text-center px-6">
            <p className="font-en-accent text-xs md:text-sm tracking-[0.3em] text-hinoki-gold uppercase mb-4">
              {image.category === "product" && "Product"}
              {image.category === "fuji" && "Mt.Fuji"}
              {image.category === "waterfall" && "Nature"}
              {image.category === "hinoki" && "Hinoki Forest"}
            </p>
            <p className="font-ja-display text-2xl md:text-4xl lg:text-5xl tracking-wider text-white">
              {image.caption}
            </p>
            <p className="mt-4 text-sm md:text-base text-zinc-400">
              {index + 1} / {galleryImages.length}
            </p>
          </div>

          {/* スライド番号（右下） */}
          <div className="absolute bottom-8 right-8 font-en-accent text-6xl md:text-8xl lg:text-9xl text-white/5 font-bold">
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>
      ))}
    </section>
  );
}
