import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import type { SitePath } from "./site";

const ogLocale: Record<Locale, string> = { ko: "ko_KR", en: "en_US" };

export const DEFAULT_OG = { url: "/og.jpg", width: 1200, height: 630 };

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
  languages["x-default"] = `/ko${path}`;
  const image = opts.image ?? { ...DEFAULT_OG, alt: dict.meta.title };
  return {
    title: opts.absoluteTitle ? { absolute: opts.title } : opts.title,
    description: opts.description,
    alternates: { canonical: `/${locale}${path}`, languages },
    openGraph: {
      type: "website",
      siteName: dict.meta.siteName,
      title: opts.title,
      description: opts.description,
      url: `/${locale}${path}`,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [image.url],
    },
  };
}
