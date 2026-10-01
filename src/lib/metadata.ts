import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { profile } from "@/content/profile";
import type { SitePath } from "./site";

const ogLocale: Record<Locale, string> = { ko: "ko_KR", en: "en_US" };

/** 기본 공유 이미지 — 언어별로 문구가 다르다(영어판 미리보기에 한글 문구가 뜨지 않게). */
export const DEFAULT_OG: Record<Locale, { url: string; width: number; height: number }> = {
  ko: { url: "/og.jpg", width: 1200, height: 630 },
  en: { url: "/og-en.jpg", width: 1200, height: 630 },
};

type Options = {
  title: string;
  description: string;
  /** 레이아웃의 "%s — 이름" 템플릿을 쓰지 않는다(홈) */
  absoluteTitle?: boolean;
  image?: { url: string; width: number; height: number; alt?: string };
};

/** 페이지 메타 — canonical, 언어별 대체 주소(hreflang), OG·트위터 카드를 한 번에 만든다. */
export function pageMetadata(locale: Locale, path: SitePath, opts: Options): Metadata {
  const dict = getDictionary(locale);
  const languages = Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])) as Record<string, string>;
  // 언어를 모르는 방문자: 홈은 '/'(브라우저 언어로 나눈다), 나머지는 영어판.
  languages["x-default"] = path === "" ? "/" : `/en${path}`;
  const image = opts.image ?? { ...DEFAULT_OG[locale], alt: dict.meta.title };
  // 공유 미리보기(카카오톡 · 링크드인)에도 이름이 보이게 — <title> 템플릿은 OG 에 적용되지 않는다.
  const shareTitle = opts.absoluteTitle ? opts.title : `${opts.title} — ${profile.name[locale]}`;
  return {
    title: opts.absoluteTitle ? { absolute: opts.title } : opts.title,
    description: opts.description,
    alternates: { canonical: `/${locale}${path}`, languages },
    openGraph: {
      type: "website",
      siteName: dict.meta.siteName,
      title: shareTitle,
      description: opts.description,
      url: `/${locale}${path}`,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: opts.description,
      images: [image.url],
    },
  };
}
