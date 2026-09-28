import Image from "next/image";
import Link from "next/link";
import { formatDate, getBlogPostPath } from "@/lib/utils";
import type { BlogCardPost } from "@/lib/types";

interface BlogCardProps {
  post: BlogCardPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const href = `/blog/${getBlogPostPath(post)}`;

  return (
    <article className="blog-card group relative h-full">
      <Link
        href={href}
        className="block h-full"
        aria-label={`${post.title}の記事を読む`}
      >
        <div
          className="relative h-full flex flex-col rounded-2xl overflow-hidden bg-white border border-zinc-200 transition-all duration-500 hover:border-hinoki-gold hover:shadow-lg group-hover:-translate-y-2"
        >
          {/* サムネイル画像 */}
          <div className="relative aspect-4/3 overflow-hidden">
            <Image
              src={post.thumbnail.url}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />

            {/* カテゴリーバッジ */}
            {post.category && (
              <div className="absolute top-3 left-3 z-10">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-hinoki-brown font-en-accent text-[10px] tracking-wider uppercase rounded-full font-semibold">
                  {post.category.name}
                </span>
              </div>
            )}
          </div>

          {/* コンテンツ */}
          <div className="flex-1 p-5 flex flex-col space-y-3">
            {/* 公開日 */}
            <time
              className="text-xs text-zinc-500 font-en-accent tracking-wide"
              dateTime={post.publishedAt}
            >
              {formatDate(post.publishedAt)}
            </time>

            {/* タイトル */}
            <h3
              className="font-ja-display text-lg md:text-xl leading-snug line-clamp-2 text-black transition-colors duration-300 group-hover:text-hinoki-gold"
            >
              {post.title}
            </h3>

            {/* 抜粋 */}
            <p
              className="flex-1 text-sm text-zinc-600 leading-relaxed line-clamp-2"
            >
              {post.excerpt}
            </p>

            {/* Read More */}
            <div className="pt-3 border-t border-zinc-100">
              <span className="inline-flex items-center gap-2 font-en-accent text-xs tracking-wider text-zinc-500 uppercase transition-all duration-300 group-hover:text-hinoki-gold group-hover:gap-3">
                続きを読む
                <svg
                  className="w-3 h-3"
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
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
