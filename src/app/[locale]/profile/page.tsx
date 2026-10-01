import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyEmail } from "@/components/copy-email";
import { GithubIcon, MailIcon, TrophyIcon } from "@/components/icons";
import { AwardRow, SectionHead } from "@/components/ui";
import { awards, profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { tx, txList } from "@/content/types";
import { hasLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import { mailto } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/profile">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata(locale, "/profile", { title: dict.profile.title, description: dict.profile.description });
}

type TimelineItem = { year: number; kind: "award" | "project"; title: string; sub?: string; href?: string; badge?: string };

function timeline(locale: Locale): [number, TimelineItem[]][] {
  const dict = getDictionary(locale);
  const items: TimelineItem[] = [
    ...awards.map((a) => ({
      year: a.year,
      kind: "award" as const,
      title: tx(a.event, locale),
      sub: a.summary ? tx(a.summary, locale) : undefined,
      badge: tx(a.result, locale),
      href: a.project ? `/${locale}/projects/${a.project}` : undefined,
    })),
    ...projects
      .filter((p) => p.year)
      .map((p) => ({
        year: p.year!,
        kind: "project" as const,
        title: tx(p.name, locale),
        sub: tx(p.tagline, locale),
        badge: dict.projects.status[p.status],
        href: `/${locale}/projects/${p.slug}`,
      })),
  ];
  const byYear = new Map<number, TimelineItem[]>();
  for (const it of items) byYear.set(it.year, [...(byYear.get(it.year) ?? []), it]);
  return [...byYear.entries()].sort((a, b) => b[0] - a[0]);
}

export default async function ProfilePage({ params }: PageProps<"/[locale]/profile">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <section className="relative overflow-hidden" aria-labelledby="profile-title">
        <div className="glow" style={{ top: "10%" }} aria-hidden="true" />
        <div className="wrap relative z-[1] pt-[clamp(56px,9vw,120px)] pb-[clamp(40px,6vw,72px)]">
          <p className="eyebrow rv">{dict.profile.eyebrow}</p>
          <h1 id="profile-title" className="h1 h1-sm">
            {tx(profile.name, locale)}{" "}
            <span className="text-muted-2" lang={locale === "ko" ? "en" : "ko"}>
              {tx(profile.altName, locale)}
            </span>
          </h1>
          <p className="copy mt-6 !text-[clamp(19px,2vw,24px)]">
            <b>{tx(profile.headline, locale)}</b> {dict.profile.lead}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={mailto(profile.email, dict.contact.mailSubject)} className="btn">
              <MailIcon size={19} />
              {profile.email}
            </a>
            <CopyEmail email={profile.email} label={dict.contact.copy} done={dict.contact.copied} />
            <a href={profile.github} className="btn-ghost" target="_blank" rel="noopener noreferrer">
              <GithubIcon size={18} /> GitHub
            </a>
          </div>
        </div>
      </section>

      <section className="sec-tight !pt-4" aria-label={dict.profile.title}>
        <div className="wrap grid grid-cols-1 gap-[clamp(12px,1.6vw,20px)] md:grid-cols-6">
          <article className="tile rv md:col-span-4">
            <p className="kicker">{dict.home.sections.about}</p>
            <p className="body !text-[clamp(17px,1.5vw,19px)]">{tx(profile.intro, locale)}</p>
            <p className="body mt-5 !text-[clamp(17px,1.5vw,19px)]">{tx(profile.now, locale)}</p>
          </article>
          <article className="tile rv d1 md:col-span-2">
            <p className="kicker">{dict.profile.affiliations}</p>
            <ul className="m-0 grid list-none gap-5 p-0">
              {profile.affiliations.map((a) => (
                <li key={a.name.ko}>
                  <p className="m-0 text-[16.5px] font-bold leading-snug tracking-[-0.02em]">{tx(a.name, locale)}</p>
                  <p className="caption m-0 mt-1">{tx(a.detail, locale)}</p>
                </li>
              ))}
            </ul>
          </article>
          <article className="tile rv md:col-span-6">
            <p className="kicker">{dict.profile.interests}</p>
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              {txList(profile.interests, locale).map((i) => (
                <li key={i} className="chip !min-h-9 !px-4 !text-[14px]">
                  {i}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section id="awards" className="sec-tight" aria-labelledby="awards-title">
        <div className="wrap">
          <SectionHead
            id="awards-title"
            eyebrow={
              <>
                <TrophyIcon size={18} /> Awards
              </>
            }
            title={dict.profile.awards}
          />
          <ol className="rv m-0 list-none border-b border-line p-0">
            {awards.map((a) => (
              <AwardRow key={`${a.year}-${a.event.ko}-${a.result.ko}`} award={a} locale={locale} dict={dict} detailed />
            ))}
          </ol>
        </div>
      </section>

      <section id="timeline" className="sec-tight" aria-labelledby="timeline-title">
        <div className="wrap-narrow">
          <SectionHead id="timeline-title" eyebrow={dict.profile.timelineEyebrow} title={dict.profile.timeline} lead={dict.profile.timelineLead} />
          <ol className="timeline rv">
            {timeline(locale).map(([year, items]) => (
              <li key={year}>
                <p className="num m-0 text-[clamp(24px,2.6vw,32px)] font-extrabold leading-none tracking-[-0.04em]">{year}</p>
                <ul className="m-0 mt-4 grid list-none gap-3 p-0">
                  {items.map((it) => {
                    const body = (
                      <>
                        <span className="flex flex-wrap items-center gap-2">
                          <span className={`badge ${it.kind === "award" ? "badge-gold" : "badge-shipped"}`}>{it.badge}</span>
                          <span className="text-[16.5px] font-bold tracking-[-0.02em]">{it.title}</span>
                        </span>
                        {it.sub && <span className="mt-1.5 block text-[14.5px] font-semibold leading-relaxed text-muted-2">{it.sub}</span>}
                      </>
                    );
                    return (
                      <li key={`${it.kind}-${it.title}-${it.badge}`}>
                        {it.href ? (
                          <Link href={it.href} className="block rounded-2xl border border-line-2 bg-card px-5 py-4 transition-colors hover:border-[var(--gold-line)]">
                            {body}
                          </Link>
                        ) : (
                          <div className="rounded-2xl border border-line-2 bg-card px-5 py-4">{body}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
