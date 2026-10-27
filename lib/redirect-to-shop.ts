/**
 * hinokifragrance.com は yawnnap.shop に統合した。ここに来たリクエストの転送先を決める。
 * LP の欄はデザインごと yawnnap.shop のトップ（富士ヒノキの章）に入れ、ブログ・お問い合わせ・画像は同じパスで移してある。
 */
const SHOP_ORIGIN = "https://www.yawnnap.shop";

/** パスが変わったページ（ここに無いパスは同じパスへ転送） */
const PATH_MAP: Record<string, string> = {
  "/privacy": "/legal/privacy-policy",
  "/terms": "/legal/tokushoho",
};

/** 転送しないファイル（Search Console の所有権確認。住所変更ツールに旧ドメインの確認が要る） */
const KEEP_PATHS = new Set(["/google948150ecd9906715.html"]);

/** @returns 転送先の URL。転送しないパスは null */
export function shopRedirectUrl(pathname: string, search = ""): string | null {
  if (KEEP_PATHS.has(pathname)) return null;
  const path = PATH_MAP[pathname] ?? pathname;
  return `${SHOP_ORIGIN}${path}${search}`;
}
