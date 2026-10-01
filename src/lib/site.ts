import type { Locale } from "@/i18n/config";

/**
 * 사이트 절대 주소 — canonical · sitemap · OG 이미지에 쓴다.
 * NEXT_PUBLIC_SITE_URL(직접 지정) → Vercel 프로덕션 도메인 → 로컬 순.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/$/, "");

export type SitePath = "" | "/profile" | "/projects" | "/gallery" | `/projects/${string}` | `/gallery/${string}`;

export const localePath = (locale: Locale, path: SitePath = "") => `/${locale}${path}`;

/** 다른 언어의 같은 페이지 경로 — /ko/projects/x ↔ /en/projects/x */
export const swapLocale = (pathname: string, to: Locale) => {
  const parts = pathname.split("/");
  parts[1] = to;
  return parts.join("/") || `/${to}`;
};

export const mailto = (email: string, subject?: string, body?: string) => {
  const q = new URLSearchParams();
  if (subject) q.set("subject", subject);
  if (body) q.set("body", body);
  const qs = q.toString().replace(/\+/g, "%20");
  return `mailto:${email}${qs ? `?${qs}` : ""}`;
};

/** "{name}" 자리표시자를 채운다. */
export const fmt = (template: string, vars: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? `{${k}}`));
