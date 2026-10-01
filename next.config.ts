import type { NextConfig } from "next";

// `/` 는 화면 없이 언어별 홈으로 보낸다(서버 코드 없이 Vercel 라우팅 단계에서 처리).
// 순서: 직접 고른 언어(쿠키) → 브라우저 언어(Accept-Language 첫 항목) → 한국어.
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/", has: [{ type: "cookie", key: "locale", value: "en" }], destination: "/en", permanent: false },
      { source: "/", has: [{ type: "cookie", key: "locale", value: "ko" }], destination: "/ko", permanent: false },
      { source: "/", has: [{ type: "header", key: "accept-language", value: "en(?:[-_][A-Za-z0-9]+)?(?:[,;].*)?" }], destination: "/en", permanent: false },
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
