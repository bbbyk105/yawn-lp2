import { describe, expect, it } from "vitest";
import { shopRedirectUrl } from "./redirect-to-shop";

describe("shopRedirectUrl（hinokifragrance.com → yawnnap.shop）", () => {
  it("トップは yawnnap.shop のトップへ（LP の欄はトップの富士ヒノキの章に入れた）", () => {
    expect(shopRedirectUrl("/")).toBe("https://www.yawnnap.shop/");
  });

  it("ブログは同じパスのまま移す（記事・ページ送り・カテゴリ）", () => {
    expect(shopRedirectUrl("/blog")).toBe("https://www.yawnnap.shop/blog");
    expect(shopRedirectUrl("/blog/fuji-hinoki-souvenir")).toBe(
      "https://www.yawnnap.shop/blog/fuji-hinoki-souvenir",
    );
    expect(shopRedirectUrl("/blog/page/2")).toBe(
      "https://www.yawnnap.shop/blog/page/2",
    );
    expect(shopRedirectUrl("/blog/category/aroma/page/3")).toBe(
      "https://www.yawnnap.shop/blog/category/aroma/page/3",
    );
  });

  it("プライバシーポリシーと特商法は yawnnap.shop の法的情報のページへ", () => {
    expect(shopRedirectUrl("/privacy")).toBe(
      "https://www.yawnnap.shop/legal/privacy-policy",
    );
    expect(shopRedirectUrl("/terms")).toBe(
      "https://www.yawnnap.shop/legal/tokushoho",
    );
  });

  it("お問い合わせ・画像・それ以外のパスは同じパスへ", () => {
    expect(shopRedirectUrl("/contact")).toBe(
      "https://www.yawnnap.shop/contact",
    );
    expect(shopRedirectUrl("/images/og-image.jpg")).toBe(
      "https://www.yawnnap.shop/images/og-image.jpg",
    );
  });

  it("クエリ文字列は引き継ぐ", () => {
    expect(shopRedirectUrl("/blog", "?utm_source=instagram")).toBe(
      "https://www.yawnnap.shop/blog?utm_source=instagram",
    );
  });

  it("Search Console の所有権確認ファイルは転送しない", () => {
    expect(shopRedirectUrl("/google948150ecd9906715.html")).toBeNull();
  });
});
