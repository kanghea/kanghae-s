import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { CopyEmail } from "@/components/copy-email";
import { ChevronRightIcon, GithubIcon, MailIcon } from "@/components/icons";
import { StatusBadge } from "@/components/ui";
import { decks } from "@/content/gallery";
import { awards, education, experience, profile, skills, type ResumeItem } from "@/content/profile";
import { projects } from "@/content/projects";
import { tx, txList } from "@/content/types";
import { hasLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { mailto } from "@/lib/site";

/**
 * 메인 — 링커리어 · 이력서형 포트폴리오처럼 단정하게. 장식(큰 그라데이션 글자 · 광원 · 등장 효과) 없이
 * 프로필 카드(왼쪽, 데스크톱에서 고정) + 항목별 목록(오른쪽)으로 읽힌다. 화려한 전시는 갤러리가 맡는다.
 */
export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const h = dict.home;

  const sections = [
    { id: "about", label: h.sections.about },
    { id: "education", label: h.sections.education },
    { id: "experience", label: h.sections.experience },
    { id: "awards", label: h.sections.awards },
    { id: "projects", label: h.sections.projects },
    { id: "decks", label: h.sections.decks },
    { id: "skills", label: h.sections.skills },
  ];

  return (
    <div className="wrap grid items-start gap-5 py-[clamp(20px,4vw,48px)] lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-8">
      {/* ── 프로필 카드 ── */}
      <aside className="lg:sticky lg:top-[calc(var(--nav-h)+24px)]">
        <section className="r-card" aria-labelledby="name">
          <div className="flex items-center gap-4 lg:flex-col lg:items-start">
            <span className="grid h-[72px] w-[72px] flex-none place-items-center rounded-full bg-card-3 text-[26px] font-extrabold tracking-[-0.04em] text-ink" aria-hidden="true">
              {locale === "ko" ? "강" : "K"}
            </span>
            <div className="min-w-0">
              <h1 id="name" className="m-0 text-[26px] font-extrabold leading-tight tracking-[-0.035em]">
                {tx(profile.name, locale)}{" "}
                <span className="text-[17px] font-bold text-muted-2" lang={locale === "ko" ? "en" : "ko"}>
                  {tx(profile.altName, locale)}
                </span>
              </h1>
              <p className="m-0 mt-1 text-[14.5px] font-semibold text-muted">{tx(profile.role, locale)}</p>
            </div>
          </div>
          <p className="m-0 mt-5 text-[15px] font-semibold leading-relaxed text-ink-2">{tx(profile.headline, locale)}</p>
          <dl className="m-0 mt-5 grid gap-2.5 border-t border-line-2 pt-5 text-[14px]">
            {profile.affiliations.slice(0, 2).map((a) => (
              <div key={a.name.ko} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
                <dt className="font-semibold text-ink-2">{tx(a.name, locale)}</dt>
                <dd className="m-0 text-muted-2">{tx(a.detail, locale).split(/\s·\s/)[0]}</dd>
              </div>
            ))}
            <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
              <dt className="sr-only">{dict.contact.email}</dt>
              <dd className="m-0 break-all font-semibold text-ink-2">{profile.email}</dd>
            </div>
          </dl>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <a href={mailto(profile.email, dict.contact.mailSubject)} className="btn-solid">
              <MailIcon size={17} />
              {h.mail}
            </a>
            <CopyEmail email={profile.email} label={dict.contact.copy} done={dict.contact.copied} className="btn-line" />
          </div>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-muted-2 hover:text-ink">
            <GithubIcon size={16} /> github.com/kanghea
          </a>

          <ul className="m-0 mt-5 grid list-none grid-cols-3 border-t border-line-2 p-0 pt-4 text-center">
            {[
              { n: awards.length, label: h.sections.awards, href: "#awards" },
              { n: projects.length, label: h.sections.projects, href: "#projects" },
              { n: decks.length, label: h.sections.decks, href: "#decks" },
            ].map((c) => (
              <li key={c.href}>
                <a href={c.href} className="block rounded-xl py-1.5 hover:bg-card-2">
                  <span className="num block text-[20px] font-extrabold tracking-[-0.03em]">{c.n}</span>
                  <span className="block text-[12.5px] font-semibold text-muted-2">{c.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <nav className="r-card mt-4 hidden !py-3 lg:block" aria-label={h.quickNav}>
          <ul className="m-0 list-none p-0">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="flex items-center justify-between rounded-lg px-2 py-2 text-[14px] font-semibold text-ink-2 hover:bg-card-2 hover:text-ink">
                  {s.label}
                  <ChevronRightIcon size={15} className="text-muted-2" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* ── 항목 ── */}
      <div className="grid gap-4">
        <ResumeSection id="about" title={h.sections.about}>
          <p className="m-0 text-[15.5px] leading-[1.75] text-ink-2">{tx(profile.intro, locale)}</p>
          <p className="m-0 mt-3 text-[15.5px] leading-[1.75] text-ink-2">{tx(profile.now, locale)}</p>
        </ResumeSection>

        <ResumeSection id="education" title={h.sections.education}>
          <Rows items={education} locale={locale} />
        </ResumeSection>

        <ResumeSection id="experience" title={h.sections.experience} count={experience.length}>
          <Rows items={experience} locale={locale} />
        </ResumeSection>

        <ResumeSection id="awards" title={h.sections.awards} count={awards.length}>
          <ul className="m-0 list-none p-0">
            {awards.map((a) => (
              <li key={`${a.year}-${a.event.ko}-${a.result.ko}`} className="r-row">
                <div className="min-w-0">
                  <p className="m-0 flex flex-wrap items-center gap-x-2 gap-y-1 text-[15.5px] font-bold tracking-[-0.02em]">
                    {tx(a.event, locale)}
                    <span className="badge badge-gold">{tx(a.result, locale)}</span>
                    {a.honor && <span className="text-[13px] font-semibold text-muted-2">{tx(a.honor, locale)}</span>}
                  </p>
                  {a.summary && <p className="m-0 mt-1 text-[14px] leading-relaxed text-muted-2">{tx(a.summary, locale)}</p>}
                </div>
                <span className="r-period">{a.year}</span>
              </li>
            ))}
          </ul>
        </ResumeSection>

        <ResumeSection id="projects" title={h.sections.projects} count={projects.length} action={{ href: `/${locale}/projects`, label: h.viewAll }}>
          <ul className="m-0 list-none p-0">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link href={`/${locale}/projects/${p.slug}`} className="r-row group">
                  <div className="min-w-0">
                    <p className="m-0 flex flex-wrap items-center gap-x-2 gap-y-1 text-[15.5px] font-bold tracking-[-0.02em]">
                      <span className="group-hover:underline group-hover:underline-offset-4">{tx(p.name, locale)}</span>
                      <StatusBadge status={p.status} dict={dict} />
                    </p>
                    <p className="m-0 mt-1 text-[14px] leading-relaxed text-muted-2">{tx(p.tagline, locale)}</p>
                    <p className="m-0 mt-1 text-[13px] font-semibold text-muted">{tx(p.role, locale)}</p>
                  </div>
                  <span className="r-period">
                    {p.period ? tx(p.period, locale) : ""}
                    <ChevronRightIcon size={15} className="ml-1 hidden text-muted-2 sm:inline" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </ResumeSection>

        <ResumeSection id="decks" title={h.sections.decks} count={decks.length} action={{ href: `/${locale}/gallery`, label: h.toGallery }}>
          <p className="m-0 mb-1 text-[14px] leading-relaxed text-muted-2">{h.decksLead}</p>
          <ul className="m-0 list-none p-0">
            {decks.map((d) => {
              const cover = d.manifest.previews[0];
              return (
                <li key={d.slug}>
                  <Link href={`/${locale}/gallery/${d.slug}`} className="r-row group !grid-cols-[96px_minmax(0,1fr)_auto] items-center sm:!grid-cols-[128px_minmax(0,1fr)_auto]">
                    <span className="block overflow-hidden rounded-lg border border-line-2 bg-card-2">
                      <Image src={cover.src} width={cover.width} height={cover.height} alt="" sizes="128px" className="aspect-video w-full object-cover" />
                    </span>
                    <div className="min-w-0">
                      <p className="m-0 flex flex-wrap items-center gap-x-2 gap-y-1 text-[15.5px] font-bold tracking-[-0.02em]">
                        <span className="group-hover:underline group-hover:underline-offset-4">{tx(d.title, locale)}</span>
                        {d.result && <span className="badge badge-gold">{tx(d.result, locale)}</span>}
                      </p>
                      <p className="m-0 mt-1 text-[14px] leading-relaxed text-muted-2">{tx(d.usedFor, locale)}</p>
                      <p className="m-0 mt-1 text-[13px] font-semibold text-muted">
                        {d.manifest.slideCount}
                        {locale === "ko" ? "장" : " slides"} · {dict.gallery.preview} {d.manifest.previews.length}
                      </p>
                    </div>
                    <span className="r-period">{d.year}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </ResumeSection>

        <ResumeSection id="skills" title={h.sections.skills}>
          <SkillGroup label={h.skillsDev} items={skills.dev} />
          <SkillGroup label={h.skillsBiz} items={txList(skills.biz, locale)} />
          <SkillGroup label={h.interests} items={txList(profile.interests, locale)} />
        </ResumeSection>
      </div>
    </div>
  );
}

function ResumeSection({ id, title, count, action, children }: { id: string; title: string; count?: number; action?: { href: string; label: string }; children: ReactNode }) {
  return (
    <section id={id} className="r-card scroll-mt-[calc(var(--nav-h)+16px)]" aria-labelledby={`${id}-title`}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 id={`${id}-title`} className="m-0 text-[18px] font-extrabold tracking-[-0.03em]">
          {title}
          {count !== undefined && <span className="num ml-1.5 text-[15px] font-bold text-muted-2">{count}</span>}
        </h2>
        {action && (
          <Link href={action.href} className="inline-flex items-center gap-0.5 text-[13.5px] font-semibold text-muted-2 hover:text-ink">
            {action.label}
            <ChevronRightIcon size={15} />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

function Rows({ items, locale }: { items: ResumeItem[]; locale: Locale }) {
  return (
    <ul className="m-0 list-none p-0">
      {items.map((it) => {
        const body = (
          <>
            <div className="min-w-0">
              <p className="m-0 text-[15.5px] font-bold tracking-[-0.02em]">{tx(it.title, locale)}</p>
              {it.sub && <p className="m-0 mt-1 text-[14px] leading-relaxed text-muted-2">{tx(it.sub, locale)}</p>}
            </div>
            <span className="r-period">{tx(it.period, locale)}</span>
          </>
        );
        return (
          <li key={it.title.ko}>
            {it.href ? (
              <Link href={`/${locale}${it.href}`} className="r-row">
                {body}
              </Link>
            ) : (
              <div className="r-row">{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function SkillGroup({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="grid gap-2 border-t border-line-2 py-3.5 first:border-t-0 first:pt-1 sm:grid-cols-[96px_minmax(0,1fr)] sm:gap-4">
      <p className="m-0 pt-1 text-[13.5px] font-bold text-muted">{label}</p>
      <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
        {items.map((s) => (
          <li key={s} className="chip !min-h-[28px] !bg-card-2 !px-2.5 !text-[13px]">
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
