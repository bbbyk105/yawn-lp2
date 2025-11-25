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

// 全ブログ記事のslug取得（静的生成用）
export const getAllBlogSlugs = async () => {
  try {
    const data = await client.get<MicroCMSResponse<BlogPost>>({
      endpoint: "blogs",
      queries: {
        fields: "id,slug",
        limit: 100,
      },
    });

    // slugが存在する記事のみ、存在しなければidを使用
    return data.contents.map((post) => post.slug || post.id);
  } catch (error) {
    console.error("Error fetching blog slugs:", error);
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

// 関連記事取得
export const getRelatedPosts = async (
  currentPostId: string,
  categoryId?: string,
  limit: number = 3
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
