import { useEffect, useEffectEvent, useRef } from "react";

type Gsap = typeof import("gsap").gsap;

let gsapPromise: Promise<Gsap> | null = null;

/**
 * GSAP（約44KB gzip）は最初の表示に要らないので、最初の JS には入れず、使うときに読み込む。
 * 何回呼んでも読み込みは1回。失敗したとき（デプロイ直後で古いチャンクが無いなど）は次に呼ばれたときに読み込み直す。
 */
export function loadGsap(): Promise<Gsap> {
  gsapPromise ??= Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]).then(
    ([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);
      return gsap;
    },
    (error: unknown) => {
      gsapPromise = null;
      throw error;
    },
  );
  return gsapPromise;
}

// ハイドレーションの完了を待たず、この JS が読まれた時点で裏で読み込みを始める（アニメーションが付くまでの間を短くする）
if (typeof window !== "undefined") {
  loadGsap().catch(() => {});
}

/**
 * 要素に GSAP のアニメーションを付ける。GSAP を読み込んだあと、setup を1回だけ呼ぶ。
 * setup の中で作った tween・ScrollTrigger は、アンマウント時に gsap.context でまとめて元に戻す。
 * GSAP が読み込めなかったときはアニメーションを付けない（中身はそのまま見える）。
 * @returns アニメーションを付ける要素に渡す ref（setup の引数にもこの要素が来る）
 */
export function useGsap<T extends HTMLElement>(
  setup: (scope: T, gsap: Gsap) => void,
) {
  const scopeRef = useRef<T>(null);
  const runSetup = useEffectEvent(setup);

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    let ctx: gsap.Context | undefined;
    let unmounted = false;
    // 読み込みの失敗だけを無視する（setup 内のエラーは握りつぶさない）
    loadGsap().then(
      (gsap) => {
        if (unmounted) return;
        ctx = gsap.context(() => runSetup(scope, gsap), scope);
      },
      () => {},
    );

    return () => {
      unmounted = true;
      ctx?.revert();
    };
  }, []);

  return scopeRef;
}
