import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { RevealObserver } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { profile } from "@/content/profile";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { siteUrl } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(siteUrl),
    applicationName: dict.meta.siteName,
    authors: [{ name: profile.name[locale] }],
    ...pageMetadata(locale, "", { title: dict.meta.title, description: dict.meta.description, absoluteTitle: true }),
    title: { default: dict.meta.title, template: `%s — ${profile.name[locale]}` },
  };
}

// 첫 그리기 전에 실행 — 저장된 밝은 화면 선택을 복원하고, JS 가 있음을 표시한다(.rv 등장 효과용).
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(localStorage.getItem('theme')==='light')d.dataset.theme='light'}catch(e){}})();`;

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        {/* Pretendard 가변 글꼴 동적 서브셋 — 화면에 쓰인 글자 조각만 받는다(중개사코치와 같은 파일).
            CSS 번들에 넣으면 woff2 92개 조각의 상대 경로가 깨져 정적 파일을 그대로 링크한다. */}
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/fonts/pretendard/1.3.9/pretendardvariable-dynamic-subset.css" />
      </head>
      <body>
        <a href="#main" className="skip-link">
          {dict.nav.skip}
        </a>
        <SiteNav
          locale={locale}
          brand={profile.name[locale]}
          brandAlt={profile.altName[locale]}
          labels={{
            home: dict.nav.home,
            profile: dict.nav.profile,
            projects: dict.nav.projects,
            gallery: dict.nav.gallery,
            contact: dict.nav.contact,
            language: dict.nav.language,
            themeToLight: dict.nav.themeToLight,
            themeToDark: dict.nav.themeToDark,
          }}
        />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter locale={locale} dict={dict} />
        <RevealObserver />
      </body>
    </html>
  );
}
