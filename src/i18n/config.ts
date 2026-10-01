export const locales = ["ko", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ko";

/** 언어 전환 시 기억하는 쿠키 — next.config.ts 의 `/` 리디렉션이 읽는다. */
export const LOCALE_COOKIE = "locale";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const localeLabels: Record<Locale, { short: string; name: string }> = {
  ko: { short: "KO", name: "한국어" },
  en: { short: "EN", name: "English" },
};

export const otherLocale = (locale: Locale): Locale => (locale === "ko" ? "en" : "ko");
