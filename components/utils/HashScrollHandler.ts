"use client";

import { useEffect } from "react";
import { scrollToId } from "@/lib/scroll";

/**
 * URL ハッシュに基づいて自動的にスクロールするコンポーネント
 */
export default function HashScrollHandler() {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    // DOM の準備ができるまで少し待つ
    const timer = setTimeout(() => scrollToId(hash), 100);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
