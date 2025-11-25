/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import BlogCard from "../ui/BlogCard";
import type { BlogPost, Category } from "@/lib/types";

interface BlogListProps {
  initialPosts: BlogPost[];
  totalCount: number;
  categories: Category[];
}

export default function BlogList({
  initialPosts,
  totalCount,
  categories,
}: BlogListProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category?.id === selectedCategory)
    : posts;

  return (
    <div className="min-h-screen pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* ヘッダー */}
        <div className="mb-16 text-center space-y-4">
          <p className="font-en-accent text-[10px] md:text-xs tracking-[0.4em] text-hinoki-brown uppercase">
            Forest Journal
          </p>
          <h1 className="font-ja-display text-4xl md:text-5xl lg:text-6xl tracking-wide text-black">
            BLOGS
          </h1>
          <p className="text-sm md:text-base text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            富士山麓の自然、ヒノキの魅力、森林浴の効果について綴ります
          </p>
        </div>

        {/* カテゴリーフィルター */}
        {categories.length > 0 && (
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-2 rounded-full text-sm font-en-accent tracking-wider uppercase transition-all duration-300 ${
                selectedCategory === null
                  ? "bg-hinoki-brown text-white"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full text-sm font-en-accent tracking-wider uppercase transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-hinoki-brown text-white"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}

        {/* 記事一覧 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* 件数表示 */}
        <div className="mt-12 text-center text-sm text-zinc-500">
          {filteredPosts.length} / {totalCount} 件の記事
        </div>
      </div>
    </div>
  );
}
