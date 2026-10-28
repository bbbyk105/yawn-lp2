import { HTMLElement, parse } from "node-html-parser";

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

const MICROCMS_IMAGE_HOST = "microcms-assets.io";

/** microCMS の画像APIで幅1200・WebPにする（w 指定済みの画像はそのまま） */
function optimizeImageSrc(src: string): string {
  if (!src.includes(MICROCMS_IMAGE_HOST)) return src;
  let url: URL;
  try {
    url = new URL(src);
  } catch {
    return src;
  }
  if (url.searchParams.has("w")) return src;
  url.searchParams.set("w", "1200");
  url.searchParams.set("fm", "webp");
  url.searchParams.set("q", "80");
  return url.toString();
}

/** このサイト（とそのサブドメイン。www 付きなど）へのリンクか */
function isSiteLink(href: string, siteHostname: string): boolean {
  let hostname: string;
  try {
    hostname = new URL(href).hostname;
  } catch {
    return false;
  }
  return hostname === siteHostname || hostname.endsWith(`.${siteHostname}`);
}

/**
 * microCMS の本文HTMLを表示用に整え、目次を作る。
 * 以前はブラウザで表示後に DOM を書き換えていた（画像を2回読み込み、目次が後から出てレイアウトがずれる）ので、サーバーで済ませる。
 * @param html 本文。未入力の記事は microCMS がフィールドごと返さないので undefined もありうる
 * @param siteHostname このサイトのホスト名。ほかのサイトへのリンクは別タブで開く
 */
export function processBlogContent(
  html: string | undefined,
  siteHostname: string,
): { html: string; toc: TocItem[] } {
  if (!html) return { html: "", toc: [] };

  // 閉じ忘れのタグやコメントを捨てずに残す（ブラウザに渡したときと同じ内容になるように）
  const root = parse(html, { comment: true, parseNoneClosedTags: true });

  for (const img of root.querySelectorAll("img")) {
    const src = img.getAttribute("src");
    if (src) img.setAttribute("src", optimizeImageSrc(src));
    img.setAttribute("loading", "lazy");
    if (!img.getAttribute("alt")) img.setAttribute("aria-hidden", "true");
  }

  for (const link of root.querySelectorAll("a[href^='http']")) {
    if (!isSiteLink(link.getAttribute("href") ?? "", siteHostname)) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    }
  }

  // 横に長い表をスクロールできるようにラップ（.table-wrapper のスタイルは microcms-content.css）
  for (const table of root.querySelectorAll("table")) {
    if (table.parentNode?.classList.contains("table-wrapper")) continue;
    const wrapper = new HTMLElement("div", {}, 'class="table-wrapper"');
    table.replaceWith(wrapper);
    wrapper.appendChild(table);
  }

  // 目次から飛ぶので見出しの id は重複させない（本文の既存の id とぶつかったら -2, -3… を付ける）
  const usedIds = new Set(root.querySelectorAll("[id]").map((el) => el.id));
  const headingIds = new Set<string>();
  const toc = root.querySelectorAll("h2, h3").map((heading, index): TocItem => {
    const isTaken = (id: string) =>
      headingIds.has(id) || (id !== heading.id && usedIds.has(id));
    const base = heading.id || `heading-${index}`;
    let id = base;
    for (let n = 2; isTaken(id); n++) id = `${base}-${n}`;
    headingIds.add(id);
    heading.setAttribute("id", id);
    return {
      id,
      text: heading.textContent,
      level: heading.tagName === "H3" ? 3 : 2,
    };
  });

  return { html: root.toString(), toc };
}
