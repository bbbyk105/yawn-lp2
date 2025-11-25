import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getBlogPostBySlug,
  getAllBlogSlugs,
  getRelatedPosts,
} from "@/lib/microcms";
import { generateBlogMetadata, generateBlogJsonLd } from "@/lib/seo";
import BlogArticle from "@/components/blog/BlogArticle";

export const revalidate = 60; // ISR: 60秒ごとに再検証

type Props = {
  params: Promise<{ slug: string }>;
};

// 静的パス生成
export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

// メタデータ生成
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "記事が見つかりません | Fuji Hinoki",
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

  // 関連記事取得
  const relatedPosts = await getRelatedPosts(post.id, post.category?.id, 3);

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
