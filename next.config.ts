import type { NextConfig } from "next";

// `/` 는 화면 없이 언어별 홈으로 보낸다(서버 코드 없이 Vercel 라우팅 단계에서 처리).
// 순서: 직접 고른 언어(쿠키) → 브라우저 첫 언어가 한국어면 /ko → 그 밖의 언어를 보낸 브라우저는 /en
//      → Accept-Language 가 없는 요청(검색 로봇 등)은 /ko.
// has.value 는 정규식 전체 일치다 — 대소문자를 둘 다 적는다.
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/", has: [{ type: "cookie", key: "locale", value: "en" }], destination: "/en", permanent: false },
      { source: "/", has: [{ type: "cookie", key: "locale", value: "ko" }], destination: "/ko", permanent: false },
      { source: "/", has: [{ type: "header", key: "accept-language", value: "\\s*[kK][oO](?:[-_,;].*)?" }], destination: "/ko", permanent: false },
      { source: "/", has: [{ type: "header", key: "accept-language" }], destination: "/en", permanent: false },
      { source: "/", destination: "/ko", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // 버전 경로라 내용이 바뀌지 않는다 — 재방문 때 글꼴 조각을 다시 확인하지 않게.
        source: "/fonts/pretendard/1.3.9/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/gallery/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
  images: {
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;
