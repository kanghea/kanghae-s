import Link from "next/link";
import { profile } from "@/content/profile";
import { otherLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { mailto } from "@/lib/site";
import { CopyEmail } from "./copy-email";
import { GithubIcon, MailIcon } from "./icons";

/** 모든 페이지 맨 아래의 연락 블록(#contact) + 꼬리말. */
export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <footer>
      {/* 단정한 연락 카드 — 메인의 이력서형 톤에 맞춘다(화려한 연출은 갤러리 몫). */}
      <section id="contact" className="scroll-mt-[calc(var(--nav-h)+16px)] border-t border-line bg-bg-1" aria-labelledby="contact-title">
        <div className="wrap flex flex-col gap-6 py-[clamp(36px,6vw,64px)] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="m-0 text-[13.5px] font-bold text-gold-text">Contact</p>
            <h2 id="contact-title" className="m-0 mt-1 text-[clamp(22px,2.6vw,28px)] font-extrabold tracking-[-0.03em]">
              {dict.contact.title}
            </h2>
            <p className="m-0 mt-2 max-w-[34em] text-[15px] leading-relaxed text-muted-2">{dict.contact.lead}</p>
            <a href={mailto(profile.email, dict.contact.mailSubject)} className="mt-3 inline-block break-all text-[17px] font-bold text-ink underline decoration-line underline-offset-4 hover:decoration-[var(--ink)]">
              {profile.email}
            </a>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={mailto(profile.email, dict.contact.mailSubject)} className="btn-solid !px-5">
              <MailIcon size={17} />
              {dict.contact.write}
            </a>
            <CopyEmail email={profile.email} label={dict.contact.copy} done={dict.contact.copied} className="btn-line !px-5" />
          </div>
        </div>
      </section>
      <div className="border-t border-line">
        <div className="wrap flex flex-col gap-4 py-8 text-sm text-muted-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0 font-semibold">
            © {new Date().getFullYear()} {profile.name[locale]} · <span lang={otherLocale(locale)}>{profile.altName[locale]}</span>
          </p>
          <div className="flex flex-wrap items-center gap-x-5 font-semibold">
            <Link href={`/${locale}/profile`} className="inline-flex min-h-10 items-center hover:text-ink">
              {dict.nav.profile}
            </Link>
            <Link href={`/${locale}/projects`} className="inline-flex min-h-10 items-center hover:text-ink">
              {dict.nav.projects}
            </Link>
            <Link href={`/${locale}/gallery`} className="inline-flex min-h-10 items-center hover:text-ink">
              {dict.nav.gallery}
            </Link>
            <a href={profile.github} className="inline-flex min-h-10 items-center gap-1.5 hover:text-ink" rel="noopener noreferrer" target="_blank">
              <GithubIcon size={16} /> GitHub
            </a>
          </div>
          <p className="m-0">{dict.footer.built}</p>
        </div>
      </div>
    </footer>
  );
}
