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
};

type Props = { locale: Locale; brand: string; brandAlt: string; labels: NavLabels };

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
const readTheme = () => (document.documentElement.dataset.theme === "light" ? "light" : "dark");
const serverTheme = () => "dark" as const;

function setTheme(next: "light" | "dark") {
  if (next === "light") document.documentElement.dataset.theme = "light";
  else delete document.documentElement.dataset.theme;
  try {
    localStorage.setItem("theme", next);
  } catch {
    /* 저장 불가(사파리 개인 정보 보호 모드 등) — 이번 방문에만 적용 */
  }
  themeListeners.forEach((l) => l());
}

export function SiteNav({ locale, brand, brandAlt, labels }: Props) {
  const pathname = usePathname() ?? `/${locale}`;
  const active = sectionIndex(pathname, locale);
  const [scrolled, setScrolled] = useState(false);
  const theme = useSyncExternalStore(subscribeTheme, readTheme, serverTheme);

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
              {brand} <small>{brandAlt}</small>
            </span>
          </Link>

          <nav className="nav-links" aria-label="Primary">
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
                  <Link
                    key={l}
                    href={swapLocale(pathname, l)}
                    hrefLang={l}
                    lang={l}
                    title={localeLabels[l].name}
                    onClick={() => rememberLocale(l)}
                  >
                    {localeLabels[l].short}
                  </Link>
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

      <nav className="tabbar" aria-label="Primary mobile">
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
