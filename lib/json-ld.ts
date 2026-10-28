/**
 * <script type="application/ld+json"> に埋め込む文字列にする。
 * microCMS のタイトル等に "</script>" が入ってもタグが閉じないよう、< を < にする（Next.js の JSON-LD ガイドと同じ）
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
