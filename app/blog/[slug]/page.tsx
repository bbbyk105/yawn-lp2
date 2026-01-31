import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getBlogPostBySlug,
  getBlogSlugsForStaticParams,
  getRelatedPosts,
} from "@/lib/microcms";
import { generateBlogMetadata, generateBlogJsonLd } from "@/lib/seo";
import BlogArticle from "@/components/blog/BlogArticle";

export const revalidate = 60; // ISR: 60秒ごとに再検証

type Props = {
  params: Promise<{ slug: string }>;
};

// 静的パス生成（最新50件のみ事前生成、それ以外は初回アクセス時にISRで生成）
export async function generateStaticParams() {
  const slugs = await getBlogSlugsForStaticParams(50);
  return slugs.map((slug) => ({ slug }));
}

// メタデータ生成
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "記事が見つかりません | YawnNap",
    };
  }

  return generateBlogMetadata(post);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // 関連記事取得（同カテゴリ最大6件）
  const relatedPosts = await getRelatedPosts(post.id, post.category?.id, 6);

  // JSON-LD構造化データ
  const jsonLd = generateBlogJsonLd(post);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <BlogArticle post={post} relatedPosts={relatedPosts} />
    </>
  );
}
