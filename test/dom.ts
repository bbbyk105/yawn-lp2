import { act } from "@testing-library/react";
import { vi } from "vitest";

let frameCallbacks: FrameRequestCallback[] = [];

/** requestAnimationFrame を手で進められるようにする（scrollWindowTo の中で1フレーム進める） */
export function installManualAnimationFrames() {
  frameCallbacks = [];
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
    frameCallbacks.push(callback);
    return frameCallbacks.length;
  });
  vi.stubGlobal("cancelAnimationFrame", () => {});
}

/** ページを y までスクロールしたことにして、次のフレームまで進める（jsdom はレイアウトしないので scrollY を直接書き換える） */
export function scrollWindowTo(y: number) {
  act(() => {
    Object.defineProperty(window, "scrollY", { value: y, configurable: true });
    window.dispatchEvent(new Event("scroll"));
    const callbacks = frameCallbacks;
    frameCallbacks = [];
    for (const callback of callbacks) callback(performance.now());
  });
}
