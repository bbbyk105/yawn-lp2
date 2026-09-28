import { MetadataRoute } from "next";
import { getAllBlogSitemapEntries, getCategories } from "@/lib/microcms";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

/** サイトマップの最大URL数（Google推奨は50,000。分割する場合はこの値以下に） */
const SITEMAP_URL_LIMIT = 50000;

// ビルド時に固定されると新しい記事が載らないため、1時間ごとに再生成する
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ブログ記事（全件）
  const blogEntries = await getAllBlogSitemapEntries();

  // トップ・ブログ一覧は最新記事が並ぶので、最終更新 = 記事の最終更新
  const latestPostUpdatedAt = blogEntries
    .map((entry) => entry.updatedAt)
    .sort()
    .at(-1);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: latestPostUpdatedAt,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: latestPostUpdatedAt,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/privacy`,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/contact`,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  // カテゴリ一覧（1ページ目のみ）。slug 未設定のカテゴリはページが存在しないので載せない
  const categories = await getCategories();
  const categoryPages: MetadataRoute.Sitemap = categories
    .filter((c) => c.slug)
    .map((c) => ({
      url: `${SITE_URL}/blog/category/${c.slug}`,
      changeFrequency: "daily" as const,
      priority: 0.85,
    }));

  const blogPages: MetadataRoute.Sitemap = blogEntries
    .slice(0, SITEMAP_URL_LIMIT - staticPages.length - categoryPages.length)
    .map((entry) => ({
      url: `${SITE_URL}/blog/${entry.path}`,
      lastModified: entry.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  return [...staticPages, ...categoryPages, ...blogPages];
}
