/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { BlogCardPost, BlogPost } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 記事URLのパス部分（slug 未入力の記事は id） */
export function getBlogPostPath(post: Pick<BlogPost, "id" | "slug">): string {
  return post.slug || post.id;
}

/** クライアントコンポーネントへ渡す前に本文などを落とす（RSCペイロード削減） */
export function toBlogCardPost(post: BlogPost): BlogCardPost {
  const { id, slug, title, excerpt, thumbnail, category, publishedAt } = post;
  return { id, slug, title, excerpt, thumbnail, category, publishedAt };
}

// 日付フォーマット
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// デバウンス
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// スロットル
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
