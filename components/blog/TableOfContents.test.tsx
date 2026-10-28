// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { TocItem } from "@/lib/blog-content";
import { installManualAnimationFrames, scrollWindowTo } from "@/test/dom";
import { DesktopToc, MobileToc, TocProvider } from "./TableOfContents";

const items: TocItem[] = [
  { id: "intro", text: "はじめに", level: 2 },
  { id: "scent", text: "香りの成分", level: 3 },
  { id: "usage", text: "使い方", level: 2 },
];
/** ページ上の各見出しの位置（px） */
const HEADING_TOPS: Record<string, number> = {
  intro: 400,
  scent: 1200,
  usage: 2000,
};

function renderArticle() {
  render(
    <TocProvider items={items}>
      <MobileToc items={items} />
      {items.map((item) => (
        <h2 key={item.id} id={item.id}>
          {item.text}
        </h2>
      ))}
      <DesktopToc items={items} />
    </TocProvider>,
  );
}

/** 強調されている目次の項目（スマホ用は閉じていると出ないので、出ている分だけ） */
function activeItems() {
  return [...document.querySelectorAll("nav button.font-medium")].map(
    (button) => button.textContent,
  );
}

beforeEach(() => {
  installManualAnimationFrames();
  scrollWindowTo(0);
  // jsdom はレイアウトしないので、見出しの位置を決めておく（画面上の位置 = ページ上の位置 - scrollY）
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
    function (this: HTMLElement) {
      return { top: (HEADING_TOPS[this.id] ?? 0) - window.scrollY } as DOMRect;
    },
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("今読んでいる見出しの強調", () => {
  it("上端から 200px まで来た見出しのうち最後のものを強調する", () => {
    renderArticle();
    expect(activeItems()).toEqual([]);

    scrollWindowTo(1000); // 1000 + 200 = 1200 で「香りの成分」まで来た
    expect(activeItems()).toEqual(["香りの成分"]);

    scrollWindowTo(1900);
    expect(activeItems()).toEqual(["使い方"]);
  });

  it("スマホ用とPC用の目次で同じ見出しを強調する", () => {
    renderArticle();
    fireEvent.click(screen.getByRole("button", { name: "目次" }));

    scrollWindowTo(300);
    expect(activeItems()).toEqual(["はじめに", "はじめに"]);
  });
});

describe("目次から見出しへ移動", () => {
  it("固定ヘッダーで隠れないよう 100px 上を空けてスクロールする", () => {
    const scrollTo = vi.fn();
    vi.stubGlobal("scrollTo", scrollTo);
    renderArticle();

    const desktopItem = document.querySelectorAll("aside button")[2];
    fireEvent.click(desktopItem);
    expect(scrollTo).toHaveBeenCalledWith({ top: 1900, behavior: "smooth" });
  });

  it("スマホ用の目次は、見出しを選んだら閉じる", () => {
    vi.stubGlobal("scrollTo", vi.fn());
    renderArticle();
    const toggle = screen.getByRole("button", { name: "目次" });

    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");

    const mobileItem = toggle.parentElement!.querySelectorAll("nav button")[0];
    fireEvent.click(mobileItem);
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
  });
});
