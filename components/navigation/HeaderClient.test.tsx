// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { installManualAnimationFrames, scrollWindowTo } from "@/test/dom";
import { HeaderShell, MobileMenuButton, MobileMenuPanel } from "./HeaderClient";

function renderHeader() {
  render(
    <HeaderShell>
      <MobileMenuButton />
      <MobileMenuPanel>
        <a href="https://www.yawnnap.shop/">Products</a>
        <p>説明</p>
      </MobileMenuPanel>
    </HeaderShell>,
  );
}

beforeEach(() => {
  installManualAnimationFrames();
  scrollWindowTo(0);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("モバイルメニュー", () => {
  it("ボタンで開閉する", () => {
    renderHeader();
    const button = screen.getByRole("button", { name: "メニューを開く" });
    expect(screen.queryByText("Products")).toBeNull();

    fireEvent.click(button);
    expect(button.getAttribute("aria-expanded")).toBe("true");
    expect(button.getAttribute("aria-label")).toBe("メニューを閉じる");
    expect(screen.getByText("Products")).toBeTruthy();

    fireEvent.click(button);
    expect(screen.queryByText("Products")).toBeNull();
  });

  it("中のリンクを押したら閉じる", () => {
    renderHeader();
    fireEvent.click(screen.getByRole("button", { name: "メニューを開く" }));

    fireEvent.click(screen.getByText("Products"));
    expect(screen.queryByText("Products")).toBeNull();
  });

  it("リンク以外を押しても閉じない", () => {
    renderHeader();
    fireEvent.click(screen.getByRole("button", { name: "メニューを開く" }));

    fireEvent.click(screen.getByText("説明"));
    expect(screen.getByText("Products")).toBeTruthy();
  });
});

describe("ヘッダーの背景", () => {
  it("50px より下までスクロールしたら濃くし、戻ったら元に戻す", () => {
    renderHeader();
    const header = document.querySelector("header")!;
    expect(header.className).toContain("bg-white/80");

    scrollWindowTo(51);
    expect(header.className).toContain("bg-white/95");

    scrollWindowTo(10);
    expect(header.className).toContain("bg-white/80");
  });

  it("途中までスクロールした状態で開いても、最初から濃い背景で出す", () => {
    scrollWindowTo(800);
    renderHeader();
    expect(document.querySelector("header")!.className).toContain(
      "bg-white/95",
    );
  });
});
