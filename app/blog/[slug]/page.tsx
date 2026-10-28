import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import {
  getBlogSlugsForStaticParams,
  getRelatedPosts,
  resolveBlogPost,
} from "@/lib/microcms";
import { generateBlogMetadata, generateBlogJsonLd } from "@/lib/seo";
import BlogArticle from "@/components/blog/BlogArticle";
import JsonLd from "@/components/seo/JsonLd";

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
  const resolved = await resolveBlogPost(slug);

  if (!resolved) {
    return {
      title: "記事が見つかりません | YawnNap",
    };
  }

  return generateBlogMetadata(resolved.post, resolved.path);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const resolved = await resolveBlogPost(slug);

  if (!resolved) {
    notFound();
  }

  // /blog/{id} でのアクセスは slug のURLへ 308 で統合（同じ記事が2つのURLで出ないように）
  if (resolved.shouldRedirect) {
    permanentRedirect(`/blog/${encodeURIComponent(resolved.path)}`);
  }

  const { post, path } = resolved;

  // 関連記事取得（同カテゴリ最大6件）
  const relatedPosts = await getRelatedPosts(post.id, post.category?.id, 6);

  return (
    <>
      <JsonLd data={generateBlogJsonLd(post, path)} />
      <BlogArticle post={post} path={path} relatedPosts={relatedPosts} />
    </>
  );
}
