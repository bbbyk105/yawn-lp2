import { describe, expect, it } from "vitest";
import { findActiveHeadingId, getScrollProgress } from "./scroll";

describe("getScrollProgress", () => {
  it("スクロールできる距離に対する割合を返す", () => {
    expect(getScrollProgress(0, 3000, 1000)).toBe(0);
    expect(getScrollProgress(500, 3000, 1000)).toBe(0.25);
    expect(getScrollProgress(2000, 3000, 1000)).toBe(1);
  });

  it("画面に収まるページは 0（0 で割らない）", () => {
    expect(getScrollProgress(0, 800, 800)).toBe(0);
    expect(getScrollProgress(0, 600, 800)).toBe(0);
  });

  it("iOS のバウンスで範囲を超えても 0〜1 に収める", () => {
    expect(getScrollProgress(-40, 3000, 1000)).toBe(0);
    expect(getScrollProgress(2100, 3000, 1000)).toBe(1);
  });
});

describe("findActiveHeadingId", () => {
  const headings = [
    { id: "a", top: 300 },
    { id: "b", top: 900 },
    { id: "c", top: 1500 },
  ];

  it("position まで来た見出しのうち最後のものを返す", () => {
    expect(findActiveHeadingId(headings, 300)).toBe("a");
    expect(findActiveHeadingId(headings, 1000)).toBe("b");
    expect(findActiveHeadingId(headings, 5000)).toBe("c");
  });

  it("最初の見出しより上にいるときは空", () => {
    expect(findActiveHeadingId(headings, 299)).toBe("");
    expect(findActiveHeadingId([], 1000)).toBe("");
  });
});
