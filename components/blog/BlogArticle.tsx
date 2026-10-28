import Link from "next/link";
import { ArrowLeft, Calendar, RefreshCw } from "lucide-react";
import { processBlogContent } from "@/lib/blog-content";
import { SITE_URL } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import type { BlogCardPost, BlogPost } from "@/lib/types";
import BlogCard from "../ui/BlogCard";
import Breadcrumbs from "./Breadcrumbs";
import ShareButtons from "./ShareButtons";
import { DesktopToc, MobileToc, TocProvider } from "./TableOfContents";

const SITE_HOSTNAME = new URL(SITE_URL).hostname;

interface BlogArticleProps {
  post: BlogPost;
  /** 正規URLのパス部分（resolveBlogPost が決めたもの） */
  path: string;
  relatedPosts: BlogCardPost[];
}

export default function BlogArticle({
  post,
  path,
  relatedPosts,
}: BlogArticleProps) {
  const postUrl = `${SITE_URL}/blog/${path}`;
  // 画像の最適化・外部リンク・表のラップ・目次はサーバーで済ませる（表示後に DOM を書き換えない）
  const { html, toc } = processBlogContent(post.content, SITE_HOSTNAME);

  return (
    <article className="min-h-screen bg-white text-zinc-900 animate-[fadeIn_0.6s_ease-out]">
      {/* ヘッダー */}
      <header className="pt-24 pb-8 bg-linear-to-b from-zinc-50 to-white border-b border-zinc-100">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
          <Breadcrumbs
            className="mb-6"
            items={[
              { name: "ホーム", path: "" },
              { name: "ブログ", path: "/blog" },
              { name: post.title, path: `/blog/${path}` },
            ]}
            currentClassName="text-zinc-900 line-clamp-1"
          />

          {/* カテゴリー（slug 未設定だとカテゴリページが無いのでリンクにしない） */}
          {post.category &&
            (post.category.slug ? (
              <Link
                href={`/blog/category/${post.category.slug}`}
                className="inline-block mb-4 px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded hover:bg-blue-100 transition-colors"
              >
                {post.category.name}
              </Link>
            ) : (
              <span className="inline-block mb-4 px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded">
                {post.category.name}
              </span>
            ))}

          {/* タイトル */}
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-zinc-900 mb-4 leading-tight">
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

      <TocProvider items={toc}>
        {/* モバイル用目次トグル */}
        {toc.length > 0 && <MobileToc items={toc} />}

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
                className="microcms-content"
                dangerouslySetInnerHTML={{ __html: html }}
              />

              {/* SNSシェア */}
              <div className="mt-16 pt-8 border-t border-zinc-200">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <span className="text-sm text-zinc-900 font-medium">
                    この記事をシェア
                  </span>
                  <ShareButtons title={post.title} url={postUrl} />
                </div>
              </div>
            </div>

            {/* PC用サイドバー目次 */}
            {toc.length > 0 && <DesktopToc items={toc} />}
          </div>
        </div>
      </TocProvider>

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
