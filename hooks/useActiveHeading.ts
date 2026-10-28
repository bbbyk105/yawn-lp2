import { useState } from "react";
import { findActiveHeadingId } from "@/lib/scroll";
import { useOnScroll } from "./useOnScroll";

/**
 * 目次で強調する、今読んでいる見出しの id
 * @param offset 画面上端からこの距離（px）まで来た見出しを「読んでいる」とみなす（固定ヘッダーの分）
 */
export function useActiveHeading(ids: string[], offset = 200): string {
  const [activeId, setActiveId] = useState("");

  useOnScroll(() => {
    const headings = ids.flatMap((id) => {
      const element = document.getElementById(id);
      return element
        ? [{ id, top: element.getBoundingClientRect().top + window.scrollY }]
        : [];
    });
    setActiveId(findActiveHeadingId(headings, window.scrollY + offset));
  });

  return activeId;
}
