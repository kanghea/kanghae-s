import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DeckViewer, type ViewerSlide } from "@/components/deck-viewer";
import { ArrowLeftIcon, ArrowRightIcon, MailIcon } from "@/components/icons";
import { Metrics, deckLockedCount, deckMatTone } from "@/components/ui";
import { decks, getDeck } from "@/content/gallery";
import { profile } from "@/content/profile";
import { getProject } from "@/content/projects";
import { tx, txList } from "@/content/types";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import { fmt, mailto } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => decks.map((d) => ({ locale, slug: d.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/gallery/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const deck = getDeck(slug);
  if (!hasLocale(locale) || !deck) return {};
  const dict = getDictionary(locale);
  const og = deck.manifest.og;
  return pageMetadata(locale, `/gallery/${slug}`, {
    title: `${dict.gallery.lot} ${String(deck.lot).padStart(2, "0")} · ${tx(deck.title, locale)}`,
    description: tx(deck.subtitle, locale),
    image: { url: og.src, width: og.width, height: og.height, alt: tx(deck.title, locale) },
  });
}

export default async function LotPage({ params }: PageProps<"/[locale]/gallery/[slug]">) {
  const { locale, slug } = await params;
  const deck = getDeck(slug);
  if (!hasLocale(locale) || !deck) notFound();
  const dict = getDictionary(locale);
  const g = dict.gallery;
  const lotNo = String(deck.lot).padStart(2, "0");
  const locked = deckLockedCount(deck);
  const project = deck.project ? getProject(deck.project) : undefined;
  const nextDeck = decks[(decks.indexOf(deck) + 1) % decks.length];
  const inquire = mailto(profile.email, fmt(g.inquirySubject, { title: tx(deck.title, locale), lot: lotNo }), fmt(dict.contact.deckBody, { title: tx(deck.title, locale), lot: lotNo }));

  const slides: ViewerSlide[] = Array.from({ length: deck.manifest.slideCount }, (_, i) => {
    const n = i + 1;
    const p = deck.manifest.previews.find((x) => x.slide === n);
    if (p) return { slide: n, kind: "preview", src: p.src, width: p.width, height: p.height };
    const v = deck.manifest.veils.find((x) => x.slide === n);
    return { slide: n, kind: "locked", dataUrl: v?.dataUrl ?? "" };
  });

  const facts: [string, string][] = [
    [g.year, String(deck.year)],
    [g.usedFor, tx(deck.usedFor, locale)],
    ...(deck.result ? ([[g.result, tx(deck.result, locale)]] as [string, string][]) : []),
    [g.role, tx(deck.role, locale)],
    ...(deck.team ? ([[g.team, tx(deck.team, locale)]] as [string, string][]) : []),
    ...(deck.credit ? ([[g.credit, tx(deck.credit, locale)]] as [string, string][]) : []),
    [g.medium, tx(deck.medium, locale)],
    [g.slideCount, fmt(g.slideSummary, { total: deck.manifest.slideCount, open: deck.manifest.previews.length, locked })],
    [g.estimate, g.estimateValue],
  ];

  return (
    <div className="museum wall -mb-px">
      <div className="wrap pt-[clamp(28px,5vw,56px)]">
        <Link href={`/${locale}/gallery`} className="caption -my-2 inline-flex min-h-10 items-center gap-1.5 hover:text-ink">
          <ArrowLeftIcon size={16} />
          {g.back}
        </Link>
        <header className="mt-[clamp(28px,5vw,48px)] max-w-[52em]">
          <p className="eyebrow rv">
            {g.lot} {lotNo} · {deck.year}
            {deck.result && <span className="badge badge-gold ml-1">{tx(deck.result, locale)}</span>}
          </p>
          <h1 className="h1 h1-sm">{tx(deck.title, locale)}</h1>
          <p className="copy mt-5">
            <b>{tx(deck.subtitle, locale)}</b>
          </p>
        </header>
      </div>

      <section className="wrap mt-[clamp(32px,5vw,56px)]" aria-label={tx(deck.title, locale)}>
        <DeckViewer
          title={tx(deck.title, locale)}
          slides={slides}
          mat={deckMatTone(deck)}
          inquireHref={inquire}
          labels={{
            open: g.viewer.open,
            close: g.viewer.close,
            prev: g.viewer.prev,
            next: g.viewer.next,
            lockedTitle: g.lockedTitle,
            lockedBody: g.lockedBody,
            inquire: g.inquire,
            lockedSlide: g.lockedSlide,
            slideOf: g.slideOf,
            allSlides: g.allSlides,
            preview: g.preview,
            locked: g.locked,
          }}
        />
      </section>

      <section className="wrap grid gap-[clamp(28px,4vw,56px)] py-[clamp(56px,8vw,104px)] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <div>
          <div className="rv">
            <h2 className="eyebrow">{g.curatorNote}</h2>
            <p className="body !text-[clamp(17px,1.5vw,19px)] !leading-[1.8]">{tx(deck.note, locale)}</p>
          </div>
          {deck.highlights && (
            <div className="rv mt-12">
              <h2 className="eyebrow">{g.highlights}</h2>
              <Metrics metrics={deck.highlights} locale={locale} className="grid-cols-1 border-t border-line pt-6 sm:grid-cols-3" />
            </div>
          )}
          <div className="rv mt-12">
            <h2 className="eyebrow">{g.chapters}</h2>
            <ol className="m-0 grid list-none gap-0 border-t border-line p-0">
              {txList(deck.chapters, locale).map((c, i) => (
                <li key={c} className="grid grid-cols-[44px_minmax(0,1fr)] items-baseline border-b border-line py-3.5">
                  <span className="num text-[13px] font-extrabold text-gold-text">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[16px] font-semibold text-ink-2">{c}</span>
                </li>
              ))}
            </ol>
            {deck.lockedNote && <p className="caption mt-4">{tx(deck.lockedNote, locale)}</p>}
          </div>
        </div>

        <aside className="lg:sticky lg:top-[calc(var(--nav-h)+24px)] lg:self-start">
          <div className="placard rv !p-[clamp(20px,2.4vw,28px)]">
            <p className="placard-lot m-0 text-[12.5px] font-extrabold tracking-[0.16em]">
              {g.lot} {lotNo}
            </p>
            <h2 className="m-0 mt-2 text-[24px] font-extrabold tracking-[-0.04em]">
              <span className="sr-only">{g.facts} — </span>
              {tx(deck.title, locale)}
            </h2>
            <dl className="m-0 mt-4 grid border-t border-black/10 text-[14px]">
              {facts.map(([k, v], idx) => (
                <div key={`${k}-${idx}`} className="grid grid-cols-[minmax(76px,max-content)_minmax(0,1fr)] gap-3 border-b border-black/10 py-2.5">
                  <dt className="muted font-bold">{k}</dt>
                  <dd className="m-0 font-semibold leading-relaxed">{v}</dd>
                </div>
              ))}
            </dl>
            <a href={inquire} className="btn mt-5 w-full">
              <MailIcon size={18} />
              {g.inquire}
            </a>
          </div>
          {project && (
            <Link href={`/${locale}/projects/${project.slug}`} className="tile tile-link rv mt-4 block !py-5">
              <span className="caption">{g.relatedProject}</span>
              <span className="h4 mt-1 flex items-center justify-between gap-3">
                {tx(project.name, locale)} <ArrowRightIcon size={18} />
              </span>
            </Link>
          )}
        </aside>
      </section>

      {nextDeck && nextDeck.slug !== deck.slug && (
        <nav className="border-t border-line" aria-label={g.nextLot}>
          <Link href={`/${locale}/gallery/${nextDeck.slug}`} className="wrap group flex items-center justify-between gap-6 py-[clamp(32px,5vw,56px)]">
            <span>
              <span className="caption">
                {g.nextLot} · {g.lot} {String(nextDeck.lot).padStart(2, "0")}
              </span>
              <span className="h3 mt-1 block">{tx(nextDeck.title, locale)}</span>
            </span>
            <span className="icon-btn !h-12 !w-12 transition-transform group-hover:translate-x-1">
              <ArrowRightIcon />
            </span>
          </Link>
        </nav>
      )}
    </div>
  );
}
