import { describe, expect, it } from "vitest";
import { getBlogPostPath, getListPagePath, parsePageNumber } from "./utils";

describe("parsePageNumber", () => {
  it("2 以上の整数を数字にする", () => {
    expect(parsePageNumber("2")).toBe(2);
    expect(parsePageNumber("15")).toBe(15);
  });

  it("1 以下は null（1ページ目は /page/1 では出さない）", () => {
    expect(parsePageNumber("1")).toBeNull();
    expect(parsePageNumber("0")).toBeNull();
    expect(parsePageNumber("-3")).toBeNull();
  });

  it("数字以外が混ざったものは null（/page/2abc を2ページ目として出さない）", () => {
    expect(parsePageNumber("2abc")).toBeNull();
    expect(parsePageNumber("2.5")).toBeNull();
    expect(parsePageNumber("2e9")).toBeNull();
    expect(parsePageNumber("02")).toBeNull();
    expect(parsePageNumber("abc")).toBeNull();
  });
});

describe("getListPagePath", () => {
  it("1ページ目は一覧のパスそのもの", () => {
    expect(getListPagePath("/blog", 1)).toBe("/blog");
    expect(getListPagePath("/blog/category/hinoki", 1)).toBe(
      "/blog/category/hinoki",
    );
  });

  it("2ページ目以降は /page/n を付ける", () => {
    expect(getListPagePath("/blog", 2)).toBe("/blog/page/2");
    expect(getListPagePath("/blog/category/hinoki", 3)).toBe(
      "/blog/category/hinoki/page/3",
    );
  });
});

describe("getBlogPostPath", () => {
  it("slug があれば slug、無ければ id", () => {
    expect(getBlogPostPath({ id: "abc123", slug: "hinoki" })).toBe("hinoki");
    expect(getBlogPostPath({ id: "abc123" })).toBe("abc123");
  });
});
