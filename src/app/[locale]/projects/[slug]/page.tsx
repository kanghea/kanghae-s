import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon, ExternalIcon, FrameIcon } from "@/components/icons";
import { FramedSlide, Metrics, ProjectCover, StatusBadge, deckLockedCount, deckMatTone } from "@/components/ui";
import { getDeck } from "@/content/gallery";
import { getProject, projects } from "@/content/projects";
import { tx, txList } from "@/content/types";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!hasLocale(locale) || !project) return {};
  return pageMetadata(locale, `/projects/${slug}`, {
    title: tx(project.name, locale),
    description: tx(project.tagline, locale),
    image: project.cover ? { url: project.cover.src, width: project.cover.width, height: project.cover.height, alt: tx(project.cover.alt, locale) } : undefined,
  });
}

export default async function ProjectPage({ params }: PageProps<"/[locale]/projects/[slug]">) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!hasLocale(locale) || !project) notFound();
  const dict = getDictionary(locale);
  const index = projects.indexOf(project);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const deck = project.deck ? getDeck(project.deck) : undefined;

  const meta = [
    project.period && { label: dict.projects.period, value: tx(project.period, locale) },
    { label: dict.projects.role, value: tx(project.role, locale) },
    project.team && { label: dict.projects.team, value: tx(project.team, locale) },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <article>
      <header className="relative overflow-hidden">
        <div className="glow" style={{ top: "0%" }} aria-hidden="true" />
        <div className="wrap relative z-[1] pt-[clamp(28px,5vw,56px)]">
          <Link href={`/${locale}/projects`} className="caption inline-flex items-center gap-1.5 hover:text-ink">
            <ArrowLeftIcon size={16} />
            {dict.projects.back}
          </Link>
          <div className="mt-[clamp(28px,5vw,56px)] grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <div className="rv mb-5 flex flex-wrap items-center gap-2">
                <StatusBadge status={project.status} dict={dict} />
                {txList(project.categories, locale).map((c) => (
                  <span key={c} className="chip !min-h-0 !py-1">
                    {c}
                  </span>
                ))}
              </div>
              <h1 className="h1 h1-sm rv d1">{tx(project.name, locale)}</h1>
              <p className="copy rv d2 mt-5 !text-[clamp(19px,2vw,24px)]">
                <b>{tx(project.tagline, locale)}</b>
              </p>
              {project.links && (
                <div className="rv d3 mt-8 flex flex-wrap gap-3">
                  {project.links.map((l, i) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={i === 0 ? "btn" : "btn-ghost"}>
                      {tx(l.label, locale)}
                      <ExternalIcon size={16} />
                    </a>
                  ))}
                </div>
              )}
            </div>
            <dl className="rv d2 m-0 grid gap-0 rounded-[22px] border border-line bg-card p-1">
              {meta.map((m) => (
                <div key={m.label} className="grid grid-cols-[84px_minmax(0,1fr)] gap-3 border-b border-line-2 px-5 py-4 last:border-b-0">
                  <dt className="caption">{m.label}</dt>
                  <dd className="m-0 text-[15px] font-semibold leading-relaxed text-ink">{m.value}</dd>
                </div>
              ))}
              {project.stack && (
                <div className="grid grid-cols-[84px_minmax(0,1fr)] gap-3 px-5 py-4">
                  <dt className="caption">{dict.projects.stack}</dt>
                  <dd className="m-0 flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <span key={s} className="chip !min-h-0 !px-2.5 !py-0.5 !text-[12.5px]">
                        {s}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </header>

      <div className="wrap mt-[clamp(32px,5vw,56px)]">
        <div className="tile rv relative aspect-[16/9] overflow-hidden !p-0">
          <ProjectCover project={project} locale={locale} sizes="(min-width: 1140px) 1120px, 100vw" preload />
        </div>
        {project.metrics && (
          <Metrics
            metrics={project.metrics}
            locale={locale}
            className={`rv mt-10 grid-cols-2 ${project.metrics.length >= 4 ? "md:grid-cols-4" : "md:grid-cols-3"} border-t border-line pt-8`}
          />
        )}
      </div>

      <section className="wrap mt-[clamp(48px,7vw,88px)]" aria-label={tx(project.name, locale)}>
        <p className="body rv mb-[clamp(32px,5vw,56px)] max-w-[44em] !text-[clamp(18px,1.7vw,21px)] !leading-[1.7] font-semibold text-ink">{tx(project.summary, locale)}</p>
        {project.story.map((step, i) => (
          <section key={step.key} className="story-step rv" aria-labelledby={`step-${step.key}`}>
            <header>
              <p className="num m-0 text-[13px] font-extrabold tracking-[0.12em] text-gold-text">
                {String(i + 1).padStart(2, "0")} · {dict.projects.story[step.key].toUpperCase()}
              </p>
              <h2 id={`step-${step.key}`} className="h4 mt-2">
                {dict.projects.storyLabel[step.key]}
              </h2>
            </header>
            <div>
              <p className="body !text-[clamp(17px,1.4vw,18.5px)]">{tx(step.body, locale)}</p>
              {step.bullets && (
                <ul>
                  {txList(step.bullets, locale).map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}
      </section>

      {project.screens && (
        <section className="mt-[clamp(48px,7vw,88px)]" aria-label={dict.projects.storyLabel.product}>
          <div className="wrap">
            <p className="eyebrow">Screens</p>
          </div>
          <div className="wrap">
            <ul className="hscroll m-0 list-none p-0 pb-2">
              {project.screens.map((s) => (
                <li key={s.src} className="w-[min(46vw,220px)]">
                  <figure className="m-0">
                    <div className="overflow-hidden rounded-[22px] border border-line bg-card-2">
                      <Image src={s.src} width={s.width} height={s.height} alt={tx(s.alt, locale)} sizes="220px" className="w-full" />
                    </div>
                    <figcaption className="caption mt-3 text-center">{tx(s.alt, locale)}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {deck && (
        <section className="museum wall sec mt-[clamp(56px,8vw,104px)]" aria-labelledby="deck-title">
          <div className="wrap grid items-center gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <Link href={`/${locale}/gallery/${deck.slug}`} className="rv group relative block">
              <div className="spot" aria-hidden="true" />
              <div className="transition-transform duration-500 group-hover:-translate-y-1">
                <FramedSlide
                  src={deck.manifest.previews[0].src}
                  width={deck.manifest.previews[0].width}
                  height={deck.manifest.previews[0].height}
                  alt={tx(deck.title, locale)}
                  sizes="(min-width: 900px) 600px, 100vw"
                  mat={deckMatTone(deck)}
                />
              </div>
            </Link>
            <div className="rv d1">
              <p className="eyebrow">
                <FrameIcon size={18} /> {dict.projects.deck} · {dict.gallery.lot} {String(deck.lot).padStart(2, "0")}
              </p>
              <h2 id="deck-title" className="h3">
                {tx(deck.title, locale)}
              </h2>
              <p className="copy mt-4 !text-[17px]">{tx(deck.usedFor, locale)}</p>
              <p className="caption mt-3">
                {deck.manifest.slideCount}
                {locale === "ko" ? "장" : " slides"} · {dict.gallery.preview} {deck.manifest.previews.length} · {dict.gallery.locked} {deckLockedCount(deck)}
              </p>
              <Link href={`/${locale}/gallery/${deck.slug}`} className="btn mt-8">
                {dict.projects.viewDeck}
                <ArrowRightIcon size={18} />
              </Link>
            </div>
          </div>
        </section>
      )}

      <nav className="wrap grid gap-3 py-[clamp(48px,7vw,88px)] sm:grid-cols-2" aria-label={dict.projects.title}>
        <Link href={`/${locale}/projects/${prev.slug}`} className="tile tile-link !py-6">
          <span className="caption inline-flex items-center gap-1.5">
            <ArrowLeftIcon size={15} /> {dict.projects.prev}
          </span>
          <span className="h4 mt-2 block">{tx(prev.name, locale)}</span>
        </Link>
        <Link href={`/${locale}/projects/${next.slug}`} className="tile tile-link !py-6 sm:text-right">
          <span className="caption inline-flex items-center gap-1.5">
            {dict.projects.next} <ArrowRightIcon size={15} />
          </span>
          <span className="h4 mt-2 block">{tx(next.name, locale)}</span>
        </Link>
      </nav>
    </article>
  );
}
