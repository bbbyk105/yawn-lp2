"use client";

import { useEffect } from "react";

/**
 * URL ハッシュに基づいて自動的にスクロールするコンポーネント
 */
export default function HashScrollHandler() {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      // DOM の準備ができるまで少し待つ
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
  }, []);

  return null;
}
