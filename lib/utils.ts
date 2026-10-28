/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { BlogPost } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 記事URLのパス部分（slug 未入力の記事は id） */
export function getBlogPostPath(post: Pick<BlogPost, "id" | "slug">): string {
  return post.slug || post.id;
}

/**
 * URL の /page/[num] の数字。2 以上でなければ null（1ページ目は /page/1 ではなく一覧のパスで出す）。
 * 2abc・02 なども null にする（同じページが別のURLで出たり、ISR のキャッシュがURLの数だけ増えたりしないように）
 */
export function parsePageNumber(value: string): number | null {
  if (!/^[1-9]\d*$/.test(value)) return null;
  const page = Number(value);
  return page < 2 ? null : page;
}

/** 記事一覧の page ページ目のパス（1ページ目は basePath そのもの。/page/1 は作らない） */
export function getListPagePath(basePath: string, page: number): string {
  return page <= 1 ? basePath : `${basePath}/page/${page}`;
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
