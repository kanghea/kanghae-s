"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { LOCALE_COOKIE, localeLabels, locales, type Locale } from "@/i18n/config";
import { swapLocale } from "@/lib/site";
import { FrameIcon, GridIcon, HomeIcon, MoonIcon, SunIcon, UserIcon } from "./icons";

type NavLabels = {
  home: string;
  profile: string;
  projects: string;
  gallery: string;
  contact: string;
  language: string;
  themeToLight: string;
  themeToDark: string;
  primary: string;
  primaryMobile: string;
};

type Props = { locale: Locale; brand: string; brandAlt: string; labels: NavLabels };

export const THEME_COLORS = { light: "#ffffff", dark: "#000000" } as const;

const sections = ["", "/profile", "/projects", "/gallery"] as const;

/** 현재 경로가 속한 섹션 번호(0=홈). */
function sectionIndex(pathname: string, locale: Locale) {
  const rest = pathname.replace(new RegExp(`^/${locale}`), "") || "";
  for (let i = sections.length - 1; i > 0; i--) {
    if (rest === sections[i] || rest.startsWith(`${sections[i]}/`)) return i;
  }
  return rest === "" || rest === "/" ? 0 : -1;
}

function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

/* 테마는 <html data-theme> 한 곳에 둔다 — 머리의 인라인 스크립트가 첫 그리기 전에 복원한다. */
const themeListeners = new Set<() => void>();
const subscribeTheme = (cb: () => void) => {
  themeListeners.add(cb);
  return () => themeListeners.delete(cb);
};
const readTheme = () => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");
const serverTheme = () => "light" as const;

function applyTheme(next: "light" | "dark") {
  const root = document.documentElement;
  if (next === "dark") root.dataset.theme = "dark";
  else delete root.dataset.theme;
  root.classList.add("js");
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[next]);
  themeListeners.forEach((l) => l());
}

function storedTheme(): "light" | "dark" {
  try {
    return localStorage.getItem("theme") === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

function setTheme(next: "light" | "dark") {
  try {
    localStorage.setItem("theme", next);
  } catch {
    /* 저장 불가(사파리 개인 정보 보호 모드 등) — 이번 방문에만 적용 */
  }
  applyTheme(next);
}

export function SiteNav({ locale, brand, brandAlt, labels }: Props) {
  const pathname = usePathname() ?? `/${locale}`;
  const active = sectionIndex(pathname, locale);
  const [scrolled, setScrolled] = useState(false);
  const theme = useSyncExternalStore(subscribeTheme, readTheme, serverTheme);

  // 루트 레이아웃(<html>)이 언어 경로가 바뀌며 다시 그려지면 React 가 머리 스크립트가 붙인 속성을 지운다 —
  // 마운트 · 언어 변경 때마다 저장된 테마를 다시 적용한다.
  useEffect(() => {
    applyTheme(storedTheme());
  }, [locale]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    { href: `/${locale}`, label: labels.home, Icon: HomeIcon },
    { href: `/${locale}/profile`, label: labels.profile, Icon: UserIcon },
    { href: `/${locale}/projects`, label: labels.projects, Icon: GridIcon },
    { href: `/${locale}/gallery`, label: labels.gallery, Icon: FrameIcon },
  ];

  return (
    <>
      <header className="nav" data-scrolled={scrolled}>
        <div className="wrap nav-in">
          <Link href={`/${locale}`} className="nav-brand" aria-label={brand}>
            <span className="monogram" aria-hidden="true">
              K
            </span>
            <span>
              {brand} <small lang={locale === "ko" ? "en" : "ko"}>{brandAlt}</small>
            </span>
          </Link>

          <nav className="nav-links" aria-label={labels.primary}>
            {items.slice(1).map((it, i) => (
              <Link key={it.href} href={it.href} aria-current={active === i + 1 ? "page" : undefined}>
                {it.label}
              </Link>
            ))}
          </nav>

          <div className="nav-tools">
            <div className="lang-switch" role="group" aria-label={labels.language}>
              {locales.map((l) =>
                l === locale ? (
                  <span key={l} aria-current="true" lang={l} title={localeLabels[l].name}>
                    {localeLabels[l].short}
                  </span>
                ) : (
                  // 언어 전환은 전체 이동 — <html lang> 과 머리 스크립트(테마)가 새로 적용된다.
                  <a key={l} href={swapLocale(pathname, l)} hrefLang={l} lang={l} title={localeLabels[l].name} onClick={() => rememberLocale(l)}>
                    {localeLabels[l].short}
                  </a>
                ),
              )}
            </div>
            <button
              type="button"
              className="icon-btn"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              aria-label={theme === "light" ? labels.themeToDark : labels.themeToLight}
              title={theme === "light" ? labels.themeToDark : labels.themeToLight}
            >
              {theme === "light" ? <MoonIcon size={18} /> : <SunIcon size={18} />}
            </button>
            <a href="#contact" className="nav-cta">
              {labels.contact}
            </a>
          </div>
        </div>
      </header>

      <nav className="tabbar" aria-label={labels.primaryMobile}>
        {active >= 0 && <span className="tabbar-pill" style={{ "--i": active } as React.CSSProperties} aria-hidden="true" />}
        {items.map(({ href, label, Icon }, i) => (
          <Link key={href} href={href} aria-current={active === i ? "page" : undefined}>
            <Icon />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
