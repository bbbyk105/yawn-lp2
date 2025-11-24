"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlogCard from "../ui/BlogCard";
import type { BlogPost } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

interface BlogSectionProps {
  posts: BlogPost[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      });

      const cards = cardsRef.current?.querySelectorAll(".blog-card");
      if (cards) {
        cards.forEach((card, index) => {
          const direction = index % 2 === 0 ? -100 : 100;
          gsap.from(card, {
            opacity: 0,
            x: direction,
            y: 50,
            rotation: index % 2 === 0 ? -5 : 5,
            duration: 1.2,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 50%",
              scrub: 1,
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [posts]);

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 md:py-28 bg-linear-to-b from-white via-zinc-50 to-white overflow-hidden"
      id="blog"
      aria-labelledby="blog-heading"
    >
      {/* 背景テクスチャ */}
      <div className="absolute inset-0 hinoki-texture opacity-10" />

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-24">
        {/* セクションヘッダー */}
        <div ref={titleRef} className="mb-16 md:mb-20 text-center space-y-4">
          <p className="font-en-accent text-[10px] md:text-xs tracking-[0.4em] text-hinoki-brown uppercase">
            Forest Journal
          </p>
          <h2 className="font-ja-display text-3xl md:text-4xl lg:text-5xl tracking-wide text-black">
            森の読み物
          </h2>
          <p className="text-sm md:text-base text-zinc-600 max-w-xl mx-auto leading-relaxed">
            富士山麓の自然、ヒノキの魅力、森林浴の効果について綴ります
          </p>
        </div>

        {/* ブログカードグリッド */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* もっと見るリンク */}
        <div className="mt-16 text-center">
          <a
            href="/blog"
            className="group inline-flex items-center gap-3 font-en-accent text-xs tracking-[0.3em] text-hinoki-brown uppercase transition-all duration-300 hover:gap-4 hover:text-hinoki-gold"
          >
            View All Articles
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
