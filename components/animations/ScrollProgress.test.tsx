// @vitest-environment jsdom
import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { installManualAnimationFrames, scrollWindowTo } from "@/test/dom";
import ScrollProgress from "./ScrollProgress";

beforeEach(() => {
  installManualAnimationFrames();
  scrollWindowTo(0);
  Object.defineProperty(window, "innerHeight", { value: 1000, configurable: true });
  Object.defineProperty(document.documentElement, "scrollHeight", {
    value: 5000,
    configurable: true,
  });
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it("読んだ割合だけバーを伸ばす", () => {
  const { container } = render(<ScrollProgress />);
  const bar = container.querySelector<HTMLElement>(".origin-left")!;
  expect(bar.style.transform).toBe("scaleX(0)");

  scrollWindowTo(1000); // スクロールできる 4000px のうち 1000px
  expect(bar.style.transform).toBe("scaleX(0.25)");

  scrollWindowTo(4000);
  expect(bar.style.transform).toBe("scaleX(1)");
});
