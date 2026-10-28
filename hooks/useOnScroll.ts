import { useEffect, useEffectEvent } from "react";

/**
 * ウィンドウのスクロール・リサイズのたびに handler を呼ぶ（マウント時にも1回）。
 * スクロールイベントは1フレームに何度も来るので、requestAnimationFrame で1フレーム1回にまとめる。
 */
export function useOnScroll(handler: () => void) {
  const onScroll = useEffectEvent(handler);

  useEffect(() => {
    let frame = 0;
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        onScroll();
      });
    };

    onScroll();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
}
