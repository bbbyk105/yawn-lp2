import { NextResponse, type NextRequest } from "next/server";
import { shopRedirectUrl } from "@/lib/redirect-to-shop";

// hinokifragrance.com の全ページを yawnnap.shop へ 301 で転送する（評価を引き継ぐため恒久的な転送）
export function proxy(request: NextRequest) {
  const destination = shopRedirectUrl(
    request.nextUrl.pathname,
    request.nextUrl.search,
  );
  if (!destination) return NextResponse.next();
  return NextResponse.redirect(destination, 301);
}
