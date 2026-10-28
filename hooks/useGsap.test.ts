import { expect, it, vi } from "vitest";

const gsapModule = vi.hoisted(() => ({ shouldFail: true }));

// デプロイ直後などに GSAP のチャンクが読めなかった状況を作る
vi.mock("gsap", () => {
  if (gsapModule.shouldFail) throw new Error("ChunkLoadError");
  return { gsap: { registerPlugin: () => {} } };
});
vi.mock("gsap/ScrollTrigger", () => ({ ScrollTrigger: {} }));

const { loadGsap } = await import("./useGsap");

it("GSAP の読み込みに一度失敗しても、次に使うときに読み込み直す", async () => {
  await expect(loadGsap()).rejects.toThrow();

  gsapModule.shouldFail = false;
  await expect(loadGsap()).resolves.toHaveProperty("registerPlugin");
});
