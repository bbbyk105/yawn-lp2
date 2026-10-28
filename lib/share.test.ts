import { describe, expect, it } from "vitest";
import { getShareLinks } from "./share";

describe("getShareLinks", () => {
  const links = getShareLinks(
    "ヒノキ & 森林浴",
    "https://hinokifragrance.com/blog/hinoki",
  );
  const href = (service: string) =>
    links.find((link) => link.service === service)?.href;

  it("X には本文とURLを分けて渡し、記号もエンコードする", () => {
    expect(href("x")).toBe(
      "https://twitter.com/intent/tweet?text=%E3%83%92%E3%83%8E%E3%82%AD%20%26%20%E6%A3%AE%E6%9E%97%E6%B5%B4&url=https%3A%2F%2Fhinokifragrance.com%2Fblog%2Fhinoki",
    );
  });

  it("Facebook には URL だけを渡す", () => {
    expect(href("facebook")).toBe(
      "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fhinokifragrance.com%2Fblog%2Fhinoki",
    );
  });

  it("LINE にはタイトルと URL をつなげて渡す", () => {
    expect(decodeURIComponent(href("line")!.split("?")[1])).toBe(
      "ヒノキ & 森林浴 https://hinokifragrance.com/blog/hinoki",
    );
  });
});
