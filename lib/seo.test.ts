import { afterAll, describe, expect, it, vi } from "vitest";

// SITE_URL は読み込んだ時点の環境変数で決まるので、先に差し替えてから読み込む
vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://hinokifragrance.com");
const { generateBreadcrumbJsonLd, getCategoryDescription } = await import(
  "./seo"
);
afterAll(() => {
  vi.unstubAllEnvs();
});

describe("generateBreadcrumbJsonLd", () => {
  it("先頭から順に position を振り、パスをサイトの絶対URLにする", () => {
    expect(
      generateBreadcrumbJsonLd([
        { name: "ホーム", path: "" },
        { name: "ブログ", path: "/blog" },
        { name: "ヒノキ", path: "/blog/category/hinoki" },
      ]),
    ).toEqual({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "ホーム",
          item: "https://hinokifragrance.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "ブログ",
          item: "https://hinokifragrance.com/blog",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "ヒノキ",
          item: "https://hinokifragrance.com/blog/category/hinoki",
        },
      ],
    });
  });
});

describe("getCategoryDescription", () => {
  it("カテゴリ名を入れた説明文を返す", () => {
    const description = getCategoryDescription({ id: "c1", name: "森林浴" });
    expect(description).toMatch(/^森林浴に関する記事一覧です。/);
    expect(description).toContain("「森林浴」の情報をまとめています。");
  });
});
