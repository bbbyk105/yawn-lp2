/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "microcms-js-sdk";
import type { BlogPost, Category } from "./types";

if (!process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN) {
  throw new Error("NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.NEXT_PUBLIC_MICROCMS_API_KEY) {
  throw new Error("NEXT_PUBLIC_MICROCMS_API_KEY is required");
}

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY,
});

interface MicroCMSResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

// ブログ記事一覧取得
export const getBlogPosts = async (params?: {
  limit?: number;
  offset?: number;
  categoryId?: string;
}) => {
  try {
    const { limit = 6, offset = 0, categoryId } = params || {};

    const safeLimit = Math.min(limit, 100);

    const queries: Record<string, any> = {
      limit: safeLimit,
      offset,
      orders: "-publishedAt",
    };

    if (categoryId) {
      queries.filters = `category[equals]${categoryId}`;
    }

    const data = await client.get<MicroCMSResponse<BlogPost>>({
      endpoint: "blogs",
      queries,
    });

    return {
      posts: data.contents,
      totalCount: data.totalCount,
    };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return {
      posts: [],
      totalCount: 0,
    };
  }
};

// slug指定で単一ブログ記事取得 (idもフォールバック対応)
export const getBlogPostBySlug = async (slugOrId: string) => {
  try {
    // まずslugで検索
    const data = await client.get<MicroCMSResponse<BlogPost>>({
      endpoint: "blogs",
      queries: {
        filters: `slug[equals]${slugOrId}`,
        limit: 1,
      },
    });

    if (data.contents[0]) {
      return data.contents[0];
    }

    // 見つからなければidで検索 (後方互換性)
    try {
      const post = await client.get<BlogPost>({
        endpoint: "blogs",
        contentId: slugOrId,
      });
      return post;
    } catch {
      return null;
    }
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
};

const BLOG_FETCH_LIMIT = 100;

// 全ブログ記事のslug取得（静的生成・sitemap用・件数制限なし）
export const getAllBlogSlugs = async (): Promise<string[]> => {
  try {
    const allSlugs: string[] = [];
    let offset = 0;

    while (true) {
      const data = await client.get<MicroCMSResponse<BlogPost>>({
        endpoint: "blogs",
        queries: {
          fields: "id,slug",
          limit: BLOG_FETCH_LIMIT,
          offset,
        },
      });

      const slugs = data.contents.map((post) => post.slug || post.id);
      allSlugs.push(...slugs);

      if (
        data.contents.length < BLOG_FETCH_LIMIT ||
        allSlugs.length >= data.totalCount
      ) {
        break;
      }
      offset += BLOG_FETCH_LIMIT;
    }

    return allSlugs;
  } catch (error) {
    console.error("Error fetching blog slugs:", error);
    return [];
  }
};

/** 静的生成用：最新N件のslugのみ取得（ビルド時間短縮） */
export const getBlogSlugsForStaticParams = async (
  limit: number = 50,
): Promise<string[]> => {
  try {
    const data = await client.get<MicroCMSResponse<BlogPost>>({
      endpoint: "blogs",
      queries: {
        fields: "id,slug",
        limit: Math.min(limit, BLOG_FETCH_LIMIT),
        offset: 0,
        orders: "-publishedAt",
      },
    });
    return data.contents.map((post) => post.slug || post.id);
  } catch (error) {
    console.error("Error fetching blog slugs for static params:", error);
    return [];
  }
};

// カテゴリー一覧取得
export const getCategories = async () => {
  try {
    const data = await client.get<MicroCMSResponse<Category>>({
      endpoint: "categories",
      queries: {
        limit: 100,
      },
    });
    return data.contents;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// slugでカテゴリー1件取得（カテゴリページ用）
export const getCategoryBySlug = async (
  slug: string,
): Promise<Category | null> => {
  try {
    const data = await client.get<MicroCMSResponse<Category>>({
      endpoint: "categories",
      queries: {
        filters: `slug[equals]${slug}`,
        limit: 1,
      },
    });
    return data.contents[0] ?? null;
  } catch (error) {
    console.error("Error fetching category by slug:", error);
    return null;
  }
};

// 関連記事取得
export const getRelatedPosts = async (
  currentPostId: string,
  categoryId?: string,
  limit: number = 3,
) => {
  try {
    const safeLimit = Math.min(limit + 1, 100);

    const queries: Record<string, any> = {
      limit: safeLimit,
      orders: "-publishedAt",
    };

    if (categoryId) {
      queries.filters = `category[equals]${categoryId}`;
    }

    const data = await client.get<MicroCMSResponse<BlogPost>>({
      endpoint: "blogs",
      queries,
    });

    return data.contents
      .filter((post) => post.id !== currentPostId)
      .slice(0, limit);
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
};
