"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/lib/types";
import BlogCard from "../ui/BlogCard";
import {
  Calendar,
  RefreshCw,
  ArrowLeft,
  List,
  ChevronDown,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface BlogArticleProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function BlogArticle({ post, relatedPosts }: BlogArticleProps) {
  const articleRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string>("");
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [toc, setToc] = useState<TocItem[]>([]);

  // microCMSのコンテンツを処理
  useEffect(() => {
    if (!contentRef.current) return;

    // 画像の最適化処理
    const images = contentRef.current.querySelectorAll<HTMLImageElement>("img");
    images.forEach((img) => {
      // microCMSの画像URLに最適化パラメータを追加
      if (img.src.includes("microcms-assets.io")) {
        const url = new URL(img.src);
        if (!url.searchParams.has("w")) {
          url.searchParams.set("w", "1200");
          url.searchParams.set("fm", "webp");
          url.searchParams.set("q", "80");
          img.src = url.toString();
        }
      }

      // 遅延読み込み
      img.loading = "lazy";

      // altが空の場合はaria-hidden
      if (!img.alt) {
        img.setAttribute("aria-hidden", "true");
      }
    });

    // 外部リンクに rel と target を追加
    const links =
      contentRef.current.querySelectorAll<HTMLAnchorElement>("a[href^='http']");
    links.forEach((link) => {
      if (!link.hostname.includes(window.location.hostname)) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
    });

    // テーブルをスクロール可能にラップ
    const tables = contentRef.current.querySelectorAll("table");
    tables.forEach((table) => {
      if (!table.parentElement?.classList.contains("table-wrapper")) {
        const wrapper = document.createElement("div");
        wrapper.className = "table-wrapper";
        table.parentNode?.insertBefore(wrapper, table);
        wrapper.appendChild(table);
      }
    });

    // 目次の生成
    const headings = Array.from(
      contentRef.current.querySelectorAll<HTMLHeadingElement>("h2, h3")
    );

    const tocItems: TocItem[] = headings.map((heading, index) => {
      const id = heading.id || `heading-${index}`;
      heading.id = id;

      const level = parseInt(heading.tagName.substring(1));

      return {
        id,
        text: heading.textContent || "",
        level,
      };
    });

    setToc(tocItems);
  }, [post.content]);

  // スクロール監視
  useEffect(() => {
    if (toc.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -80% 0px",
      }
    );

    toc.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  // 控えめなアニメーション
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(articleRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
      });
    }, articleRef);

    return () => ctx.revert();
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsTocOpen(false);
    }
  };

  return (
    <article ref={articleRef} className="min-h-screen bg-white text-zinc-900">
      {/* ヘッダー */}
      <header className="pt-24 pb-8 bg-linear-to-b from-zinc-50 to-white border-b border-zinc-100">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
          {/* パンくず */}
          <nav className="mb-6" aria-label="パンくずリスト">
            <ol
              className="flex flex-wrap items-center gap-2 text-sm text-zinc-500"
              itemScope
              itemType="https://schema.org/BreadcrumbList"
            >
              <li
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <Link
                  href="/"
                  itemProp="item"
                  className="hover:text-zinc-900 transition-colors"
                >
                  <span itemProp="name">ホーム</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>
              <li className="text-zinc-300">/</li>
              <li
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <Link
                  href="/blog"
                  itemProp="item"
                  className="hover:text-zinc-900 transition-colors"
                >
                  <span itemProp="name">ブログ</span>
                </Link>
                <meta itemProp="position" content="2" />
              </li>
              <li className="text-zinc-300">/</li>
              <li
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <span itemProp="name" className="text-zinc-900 line-clamp-1">
                  {post.title}
                </span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </nav>

          {/* カテゴリー */}
          {post.category && (
            <Link
              href={`/blog/category/${post.category.slug}`}
              className="inline-block mb-4 px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded hover:bg-blue-100 transition-colors"
            >
              {post.category.name}
            </Link>
          )}

          {/* タイトル */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 mb-4 leading-tight">
            {post.title}
          </h1>

          {/* メタ情報 */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
            <time
              dateTime={post.publishedAt}
              className="flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4" />
              {formatDate(post.publishedAt)}
            </time>

            {post.updatedAt !== post.publishedAt && (
              <span className="flex items-center gap-1.5">
                <RefreshCw className="w-4 h-4" />
                更新: {formatDate(post.updatedAt)}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* モバイル用目次トグル */}
      {toc.length > 0 && (
        <div className="lg:hidden sticky top-16 z-30 bg-white border-b border-zinc-200 shadow-sm">
          <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
            <button
              onClick={() => setIsTocOpen(!isTocOpen)}
              className="w-full py-3 flex items-center justify-between text-sm font-medium text-zinc-900"
            >
              <span className="flex items-center gap-2">
                <List className="w-4 h-4" />
                目次
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isTocOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isTocOpen && (
              <nav className="py-4 border-t border-zinc-100">
                <ul className="space-y-2">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToHeading(item.id)}
                        className={`block w-full text-left py-1.5 px-3 rounded text-sm transition-colors ${
                          item.level === 3 ? "pl-6" : ""
                        } ${
                          activeId === item.id
                            ? "text-blue-600 font-medium bg-blue-50"
                            : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                        }`}
                      >
                        {item.text}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </div>
      )}

      {/* メインコンテンツ */}
      <div className="container mx-auto px-4 sm:px-6 max-w-[1200px] py-12">
        <div className="flex gap-12">
          {/* 本文 */}
          <div className="flex-1 min-w-0">
            {/* リード文 */}
            {post.excerpt && (
              <div className="mb-12 p-6 bg-zinc-50 rounded-lg border border-zinc-200">
                <p className="text-base text-zinc-700 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            )}

            {/* 本文コンテンツ - microCMS最適化版 */}
            <div
              ref={contentRef}
              className="microcms-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* SNSシェア */}
            <div className="mt-16 pt-8 border-t border-zinc-200">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <span className="text-sm text-zinc-900 font-medium">
                  この記事をシェア
                </span>
                <div className="flex gap-2">
                  {/* Twitter(X) */}
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      post.title
                    )}&url=${encodeURIComponent(
                      `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${
                        post.slug || post.id
                      }`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-100 text-zinc-600 hover:bg-[#1DA1F2] hover:text-white transition-all"
                    aria-label="Twitterでシェア"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${
                        post.slug || post.id
                      }`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-100 text-zinc-600 hover:bg-[#1877F2] hover:text-white transition-all"
                    aria-label="Facebookでシェア"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>

                  {/* LINE */}
                  <a
                    href={`https://line.me/R/msg/text/?${encodeURIComponent(
                      `${post.title} ${process.env.NEXT_PUBLIC_SITE_URL}/blog/${
                        post.slug || post.id
                      }`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-100 text-zinc-600 hover:bg-[#06C755] hover:text-white transition-all"
                    aria-label="LINEでシェア"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.630.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.630.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.630.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.630 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.590.120.301.079.766.038 1.080l-.164 1.020c-.045.301-.240 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* PC用サイドバー目次 */}
          {toc.length > 0 && (
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24">
                <h2 className="text-sm font-bold text-zinc-900 mb-4 px-3">
                  目次
                </h2>
                <nav>
                  <ul className="space-y-0.5 text-sm">
                    {toc.map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => scrollToHeading(item.id)}
                          className={`block w-full text-left py-2 px-3 rounded transition-all ${
                            item.level === 3 ? "pl-6 text-xs" : ""
                          } ${
                            activeId === item.id
                              ? "text-blue-600 font-medium bg-blue-50"
                              : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                          }`}
                        >
                          {item.text}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>
          )}
        </div>
      </div>

      {/* 関連記事 */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-zinc-50 border-t border-zinc-200">
          <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
            <h2 className="text-2xl font-bold text-zinc-900 mb-8">関連記事</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 戻るリンク */}
      <div className="container mx-auto px-4 sm:px-6 max-w-[1200px] py-8 border-t border-zinc-200">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          ブログ一覧に戻る
        </Link>
      </div>
    </article>
  );
}
