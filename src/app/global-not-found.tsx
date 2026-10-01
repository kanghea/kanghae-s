import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 — 페이지를 찾을 수 없습니다 · Page not found",
  robots: { index: false },
};

// 어떤 경로에도 맞지 않는 주소는 언어를 알 수 없어 두 언어로 안내한다. /en 아래였다면 영어를 먼저 보이고
// <html lang> 을 바꾼다. 저장된 어두운 화면도 레이아웃과 같은 방식으로 복원한다.
const bootScript = `(function(){var d=document.documentElement;try{if(localStorage.getItem('theme')==='dark')d.dataset.theme='dark'}catch(e){}if(location.pathname.indexOf('/en')===0){d.lang='en';d.classList.add('nf-en')}})();`;

export default function GlobalNotFound() {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        {/* eslint-disable-next-line @next/next/no-css-tags -- 레이아웃과 같은 정적 글꼴 CSS */}
        <link rel="stylesheet" href="/fonts/pretendard/1.3.9/pretendardvariable-dynamic-subset.css" />
      </head>
      <body className="!pb-0">
        <main className="grid min-h-screen place-items-center px-6 text-center">
          <div>
            <p className="m-0 text-[clamp(64px,12vw,120px)] font-extrabold leading-none tracking-[-0.05em] g-gold">404</p>
            <div className="nf-stack mt-6 flex flex-col gap-8">
              <div lang="ko">
                <h1 className="m-0 text-[24px] font-extrabold tracking-[-0.03em]">페이지를 찾을 수 없습니다</h1>
                <p className="m-0 mt-2 text-[15px] text-muted-2">주소가 바뀌었거나 없는 페이지입니다.</p>
                <Link href="/ko" className="btn-solid mt-5 !px-6">
                  홈으로
                </Link>
              </div>
              <div lang="en">
                <p className="m-0 text-[24px] font-extrabold tracking-[-0.03em]">Page not found</p>
                <p className="m-0 mt-2 text-[15px] text-muted-2">The address may have changed, or the page doesn&apos;t exist.</p>
                <Link href="/en" className="btn-line mt-5 !px-6">
                  Go home
                </Link>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
