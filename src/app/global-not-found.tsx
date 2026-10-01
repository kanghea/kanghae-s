import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 — 페이지를 찾을 수 없어요 · Page not found",
  robots: { index: false },
};

/** 어떤 경로에도 맞지 않는 주소 — 언어를 알 수 없어 두 언어로 안내한다. */
export default function GlobalNotFound() {
  return (
    <html lang="ko">
      <head>
        {/* eslint-disable-next-line @next/next/no-css-tags -- 레이아웃과 같은 정적 글꼴 CSS */}
        <link rel="stylesheet" href="/fonts/pretendard/1.3.9/pretendardvariable-dynamic-subset.css" />
      </head>
      <body>
        <main className="relative grid min-h-screen place-items-center overflow-hidden px-6 text-center">
          <div className="glow" style={{ top: "40%" }} aria-hidden="true" />
          <div className="relative z-[1]">
            <p className="h1 g-gold">404</p>
            <h1 className="h3 mt-4">페이지를 찾을 수 없어요</h1>
            <p className="copy mx-auto mt-2" lang="en">
              Page not found
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link href="/ko" className="btn">
                홈으로
              </Link>
              <Link href="/en" className="btn-ghost" lang="en">
                Go home
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
