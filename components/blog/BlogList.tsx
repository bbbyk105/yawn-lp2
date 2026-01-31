"use client";

import Link from "next/link";
import BlogCard from "../ui/BlogCard";
import type { BlogPost, Category } from "@/lib/types";
import { BLOG_PER_PAGE } from "@/lib/constants";

interface BlogListProps {
  initialPosts: BlogPost[];
  totalCount: number;
  categories: Category[];
  /** 現在のページ（1始まり）。省略時は1 */
  currentPage?: number;
  /** カテゴリフィルター用slug（指定時はそのカテゴリの一覧として表示）。ブログトップの場合はundefined */
  categorySlug?: string;
}

export default function BlogList({
  initialPosts,
  totalCount,
  categories,
  currentPage = 1,
  categorySlug,
}: BlogListProps) {
  const totalPages = Math.ceil(totalCount / BLOG_PER_PAGE);
  const basePath = categorySlug ? `/blog/category/${categorySlug}` : "/blog";

  return (
    <div className="min-h-screen pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="mb-16 text-center space-y-4">
          <p className="font-en-accent text-[10px] md:text-xs tracking-[0.4em] text-hinoki-brown uppercase">
            Forest Journal
          </p>
          <h1 className="font-ja-display text-4xl md:text-5xl lg:text-6xl tracking-wide text-black">
            BLOGS
          </h1>
          <p className="text-sm md:text-base text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            富士山麓の自然、富士ヒノキの魅力、
            <br />
            日々のリラックス方法について綴ります。
          </p>
        </div>

        {/* カテゴリ導線（URLを持つ） */}
        {categories.length > 0 && (
          <nav
            className="mb-12 flex flex-wrap justify-center gap-3"
            aria-label="カテゴリ"
          >
            <Link
              href="/blog"
              className={`px-6 py-2 rounded-full text-sm font-en-accent tracking-wider uppercase transition-all duration-300 ${
                !categorySlug
                  ? "bg-hinoki-brown text-white"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              All
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/blog/category/${category.slug}`}
                className={`px-6 py-2 rounded-full text-sm font-en-accent tracking-wider uppercase transition-all duration-300 ${
                  categorySlug === category.slug
                    ? "bg-hinoki-brown text-white"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
              >
                {category.name}
              </Link>
            ))}
          </nav>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initialPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-6">
          <p className="text-sm text-zinc-500">
            {totalCount} 件中 {(currentPage - 1) * BLOG_PER_PAGE + 1}–
            {Math.min(currentPage * BLOG_PER_PAGE, totalCount)} 件を表示
          </p>

          {/* ページネーション */}
          {totalPages > 1 && (
            <nav
              className="flex items-center gap-2"
              aria-label="ページネーション"
            >
              {currentPage > 1 && (
                <Link
                  href={
                    currentPage === 2
                      ? basePath
                      : `${basePath}/page/${currentPage - 1}`
                  }
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-colors"
                >
                  前へ
                </Link>
              )}
              <span className="px-3 text-sm text-zinc-600">
                {currentPage} / {totalPages}
              </span>
              {currentPage < totalPages && (
                <Link
                  href={`${basePath}/page/${currentPage + 1}`}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-colors"
                >
                  次へ
                </Link>
              )}
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}
