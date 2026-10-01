import Link from "next/link";
import { profile } from "@/content/profile";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { mailto } from "@/lib/site";
import { CopyEmail } from "./copy-email";
import { GithubIcon, MailIcon } from "./icons";

/** 모든 페이지 맨 아래의 연락 블록(#contact) + 꼬리말. */
export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <footer>
      <section id="contact" className="sec relative overflow-hidden border-t border-line" aria-labelledby="contact-title">
        <div className="glow" style={{ top: "70%" }} aria-hidden="true" />
        <div className="wrap relative z-[1] text-center">
          <p className="eyebrow">
            <span className="dot" aria-hidden="true" /> Contact
          </p>
          <h2 id="contact-title" className="h2">
            {dict.contact.title}
          </h2>
          <p className="copy mx-auto mt-5">{dict.contact.lead}</p>
          <a
            href={mailto(profile.email, dict.contact.mailSubject)}
            className="mt-10 inline-block break-all text-[clamp(26px,5vw,56px)] font-extrabold tracking-[-0.04em] g-gold"
          >
            {profile.email}
          </a>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href={mailto(profile.email, dict.contact.mailSubject)} className="btn">
              <MailIcon size={19} />
              {dict.contact.write}
            </a>
            <CopyEmail email={profile.email} label={dict.contact.copy} done={dict.contact.copied} />
          </div>
        </div>
      </section>
      <div className="border-t border-line">
        <div className="wrap flex flex-col gap-4 py-8 text-sm text-muted-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0 font-semibold">
            © {new Date().getFullYear()} {dict.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-semibold">
            <Link href={`/${locale}/profile`} className="hover:text-ink">
              {dict.nav.profile}
            </Link>
            <Link href={`/${locale}/projects`} className="hover:text-ink">
              {dict.nav.projects}
            </Link>
            <Link href={`/${locale}/gallery`} className="hover:text-ink">
              {dict.nav.gallery}
            </Link>
            <a href={profile.github} className="inline-flex items-center gap-1.5 hover:text-ink" rel="noopener noreferrer" target="_blank">
              <GithubIcon size={16} /> GitHub
            </a>
          </div>
          <p className="m-0">{dict.footer.built}</p>
        </div>
      </div>
    </footer>
  );
}
