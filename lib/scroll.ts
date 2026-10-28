/** ページ全体に対するスクロール位置（0〜1）。スクロールできない高さのページは 0 */
export function getScrollProgress(
  scrollTop: number,
  scrollHeight: number,
  viewportHeight: number,
): number {
  const scrollable = scrollHeight - viewportHeight;
  if (scrollable <= 0) return 0;
  return Math.min(Math.max(scrollTop / scrollable, 0), 1);
}

/**
 * 今読んでいる見出し = 上端が position まで来た見出しのうち最後のもの。まだどれも来ていなければ ""
 * @param headings ページ上の位置（top）の順に並んだ見出し
 */
export function findActiveHeadingId(
  headings: { id: string; top: number }[],
  position: number,
): string {
  for (let i = headings.length - 1; i >= 0; i--) {
    if (headings[i].top <= position) return headings[i].id;
  }
  return "";
}

/**
 * id の要素までスムーズにスクロールする（ブラウザでだけ呼ぶ）
 * @param offset 固定ヘッダーなどで隠れる分（px）
 * @returns 要素が見つかったか
 */
export function scrollToId(id: string, offset = 0): boolean {
  const element = document.getElementById(id);
  if (!element) return false;

  if (offset === 0) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.scrollTo({
      top: element.getBoundingClientRect().top + window.scrollY - offset,
      behavior: "smooth",
    });
  }
  return true;
}
