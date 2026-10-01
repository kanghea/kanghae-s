import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRightIcon, FrameIcon, MailIcon } from "@/components/icons";
import { FramedSlide, VeiledSlide, deckLockedCount, deckMatTone } from "@/components/ui";
import { decks } from "@/content/gallery";
import { profile } from "@/content/profile";
import { tx } from "@/content/types";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { DEFAULT_OG, pageMetadata } from "@/lib/metadata";
import { fmt, mailto } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/gallery">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = getDictionary(locale);
  const cover = decks[0]?.manifest.previews[0];
  return pageMetadata(locale, "/gallery", {
    title: dict.gallery.titleLocal,
    description: dict.gallery.lead,
    image: cover ? { url: cover.src, width: cover.width, height: cover.height, alt: dict.gallery.title } : { ...DEFAULT_OG },
  });
}

export default async function GalleryPage({ params }: PageProps<"/[locale]/gallery">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const g = dict.gallery;
  const totalSlides = decks.reduce((n, d) => n + d.manifest.slideCount, 0);
  const openSlides = decks.reduce((n, d) => n + d.manifest.previews.length, 0);
  const commissionHref = mailto(profile.email, `${dict.contact.commissionSubject}${locale === "ko" ? "제작 문의" : "Inquiry"}`, dict.contact.commissionBody);

  return (
    <div className="museum wall -mb-px">
      <section className="relative overflow-hidden" aria-labelledby="gallery-title">
        <div className="glow" style={{ top: "0%" }} aria-hidden="true" />
        <div className="wrap relative z-[1] pt-[clamp(64px,10vw,128px)] pb-[clamp(40px,6vw,72px)] text-center">
          <p className="eyebrow rv">
            <FrameIcon size={18} /> {g.title}
          </p>
          <h1 id="gallery-title" className="h1 h1-sm rv d1">
            <span className="g-gold">{g.titleLocal}</span>
          </h1>
          <p className="copy rv d2 mx-auto mt-6">{g.lead}</p>
          <p className="rv d3 mt-8 inline-flex flex-wrap items-center justify-center gap-2">
            <span className="chip">{fmt(g.summary, { lots: decks.length, slides: totalSlides, open: openSlides })}</span>
          </p>
        </div>
      </section>

      <section aria-label={g.title}>
        {decks.map((d, i) => {
          const cover = d.manifest.previews[0];
          const locked = deckLockedCount(d);
          const strip = [
            ...d.manifest.previews.map((p) => ({ slide: p.slide, preview: p })),
            ...d.manifest.veils.slice(0, 2).map((v) => ({ slide: v.slide, veil: v })),
          ];
          const inquire = mailto(profile.email, `${dict.contact.commissionSubject}${tx(d.title, locale)}`, fmt(dict.contact.deckBody, { title: tx(d.title, locale), lot: String(d.lot).padStart(2, "0") }));
          return (
            <article key={d.slug} className="border-t border-line py-[clamp(56px,8vw,104px)]" aria-labelledby={`lot-${d.slug}`}>
              <div className={`wrap grid items-center gap-[clamp(32px,5vw,64px)] lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div className="rv">
                  <Link href={`/${locale}/gallery/${d.slug}`} className="group relative block" aria-label={`${g.enter} — ${tx(d.title, locale)}`}>
                    <div className="spot" aria-hidden="true" />
                    <div className="transition-transform duration-500 ease-out group-hover:-translate-y-1">
                      <FramedSlide src={cover.src} width={cover.width} height={cover.height} alt={tx(d.title, locale)} sizes="(min-width: 1140px) 650px, 100vw" preload={i === 0} mat={deckMatTone(d)} />
                    </div>
                  </Link>
                  <ul className="m-0 mt-6 grid list-none grid-cols-4 gap-2 p-0 sm:grid-cols-6" aria-label={fmt(g.allSlides, { total: d.manifest.slideCount, open: d.manifest.previews.length, locked })}>
                    {strip.map((s) => (
                      <li key={s.slide} className={"veil" in s ? "hidden sm:block" : undefined}>
                        {"preview" in s && s.preview ? (
                          <div className="relative aspect-video overflow-hidden rounded-[6px] bg-black">
                            <Image src={s.preview.src} width={s.preview.width} height={s.preview.height} alt="" sizes="140px" className="h-full w-full object-cover" />
                          </div>
                        ) : "veil" in s && s.veil ? (
                          <VeiledSlide dataUrl={s.veil.dataUrl} slide={s.slide} label={g.lockedSlide} />
                        ) : null}
                      </li>
                    ))}
                    <li>
                      <div className="grid aspect-video place-items-center rounded-[6px] border border-dashed border-line text-[13px] font-extrabold text-muted-2">
                        <span className="sm:hidden">+{locked}</span>
                        <span className="hidden sm:inline">+{Math.max(0, locked - 2)}</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="rv d1">
                  <div className="placard !p-[clamp(20px,2.4vw,30px)]">
                    <p className="m-0 text-[12.5px] font-extrabold tracking-[0.16em] text-[#8a6a2a]">
                      {g.lot} {String(d.lot).padStart(2, "0")}
                    </p>
                    <h2 id={`lot-${d.slug}`} className="m-0 mt-2 text-[clamp(26px,2.8vw,34px)] font-extrabold leading-tight tracking-[-0.04em]">
                      {tx(d.title, locale)}
                    </h2>
                    <p className="muted m-0 mt-2 text-[15px] font-semibold leading-relaxed">{tx(d.subtitle, locale)}</p>
                    <dl className="m-0 mt-5 grid gap-0 border-t border-black/10 text-[14px]">
                      {[
                        [g.year, String(d.year)],
                        [g.usedFor, tx(d.usedFor, locale)],
                        ...(d.result ? [[g.result, tx(d.result, locale)]] : []),
                        [g.medium, tx(d.medium, locale)],
                        [g.slideCount, `${d.manifest.slideCount}${locale === "ko" ? "장" : ` ${g.slides}`} · ${g.preview} ${d.manifest.previews.length} · ${g.locked} ${locked}`],
                        [g.estimate, g.estimateValue],
                      ].map(([k, v]) => (
                        <div key={k} className="grid grid-cols-[76px_minmax(0,1fr)] gap-3 border-b border-black/10 py-2.5">
                          <dt className="muted font-bold">{k}</dt>
                          <dd className="m-0 font-semibold">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link href={`/${locale}/gallery/${d.slug}`} className="btn">
                      {g.enter}
                      <ArrowRightIcon size={18} />
                    </Link>
                    <a href={inquire} className="btn-ghost">
                      <MailIcon size={18} />
                      {g.inquire}
                    </a>
                  </div>
                </div>
              </div>
            </article>
          );
        })}

        <div className="border-t border-line py-[clamp(40px,6vw,64px)]">
          <div className="wrap">
            <div className="rv grid place-items-center rounded-[28px] border border-dashed border-line px-6 py-12 text-center">
              <p className="m-0 text-[12.5px] font-extrabold tracking-[0.16em] text-muted-2">
                {g.lot} {String(decks.length + 1).padStart(2, "0")}
              </p>
              <p className="h4 mt-2">{g.moreSoon}</p>
              <p className="caption mt-2 mb-0">{g.moreSoonBody}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec border-t border-line" aria-labelledby="commission-title">
        <div className="wrap">
          <div className="rv text-center">
            <p className="eyebrow">{g.commission.eyebrow}</p>
            <h2 id="commission-title" className="h2">
              {g.commission.title}
            </h2>
            <p className="copy mx-auto mt-5">{g.commission.body}</p>
          </div>
          <div className="mt-12 grid gap-[clamp(12px,1.6vw,20px)] md:grid-cols-2">
            <div className="tile rv">
              <p className="kicker">{g.commission.kindsTitle}</p>
              <ul className="m-0 grid list-none gap-3 p-0">
                {g.commission.kinds.map((k) => (
                  <li key={k} className="flex items-start gap-3 text-[16.5px] font-semibold text-ink-2">
                    <span className="mt-2 h-2 w-2 flex-none rounded-[2px] bg-[var(--gold)]" aria-hidden="true" />
                    {k}
                  </li>
                ))}
              </ul>
            </div>
            <div className="tile rv d1">
              <p className="kicker">{g.commission.stepsTitle}</p>
              <ol className="m-0 grid list-none gap-3 p-0">
                {g.commission.steps.map((s, i) => (
                  <li key={s} className="flex items-center gap-3 text-[16.5px] font-semibold text-ink-2">
                    <span className="num grid h-7 w-7 flex-none place-items-center rounded-full border border-[var(--gold-line)] text-[12.5px] font-extrabold text-gold-text">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="rv mt-12 text-center">
            <a href={commissionHref} className="btn">
              <MailIcon size={19} />
              {g.commission.cta}
            </a>
            <p className="caption mt-4">{profile.email}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
