import Link from "next/link";

/** 언어 경로 안의 없는 페이지(예: /ko/projects/없는-slug) — 레이아웃 안에서 두 언어로 안내한다. */
export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="glow" aria-hidden="true" />
      <div className="wrap relative z-[1] py-[clamp(96px,16vw,200px)] text-center">
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
    </section>
  );
}
