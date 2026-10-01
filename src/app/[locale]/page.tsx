import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRightIcon, FrameIcon } from "@/components/icons";
import { AwardRow, FramedSlide, Metrics, MoreLink, ProjectCard, SectionHead, deckLockedCount, deckMatTone } from "@/components/ui";
import { decks } from "@/content/gallery";
import { awards, profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { tx, txList } from "@/content/types";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const featured = projects.filter((p) => p.featured);
  const firstAward = Math.min(...awards.map((a) => a.year));

  return (
    <>
      {/* ── 히어로 ── */}
      <section className="relative overflow-hidden" aria-labelledby="hero-title">
        <div className="glow" aria-hidden="true" />
        <div className="wrap relative z-[1] pt-[clamp(72px,12vw,150px)] pb-[clamp(56px,8vw,96px)] text-center">
          <p className="eyebrow eyebrow-muted rv">
            <span className="dot" aria-hidden="true" />
            {dict.home.eyebrow}
          </p>
          <h1 id="hero-title" className="h1 rv d1">
            {dict.home.heroTitle[0]}
            <br />
            <span className="g-gold">{dict.home.heroTitle[1]}</span>
          </h1>
          <p className="copy rv d2 mx-auto mt-7 !max-w-[30em] !text-[clamp(18px,1.9vw,23px)]">
            {dict.home.heroSub.before}
            <b>{dict.home.heroSub.bold}</b>
            {dict.home.heroSub.after}
          </p>
          <div className="rv d3 mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
            <Link href={`/${locale}/projects`} className="btn">
              {dict.home.ctaProjects}
            </Link>
            <MoreLink href={`/${locale}/gallery`}>{dict.home.ctaGallery}</MoreLink>
          </div>
        </div>

        <div className="wrap relative z-[1] pb-[clamp(40px,6vw,72px)]">
          <ul className="stat-row rv">
            <li>
              <strong className="g-gold">
                {awards.length}
                <small>{locale === "ko" ? "회" : ""}</small>
              </strong>
              <span>{dict.home.stats.awards}</span>
            </li>
            <li>
              <strong>
                {projects.length}
                <small>{locale === "ko" ? "개" : ""}</small>
              </strong>
              <span>{dict.home.stats.projects}</span>
            </li>
            <li>
              <strong>
                {decks.length}
                <small>{locale === "ko" ? "점" : ""}</small>
              </strong>
              <span>{dict.home.stats.decks}</span>
            </li>
            <li>
              <strong>{firstAward}</strong>
              <span>{dict.home.stats.since}</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ── 프로필 벤토 ── */}
      <section className="sec-tight" aria-labelledby="about-title">
        <div className="wrap grid grid-cols-1 gap-[clamp(12px,1.6vw,20px)] md:grid-cols-6">
          <article className="tile rv md:col-span-4">
            <p className="kicker">About</p>
            <h2 id="about-title" className="h3">
              {tx(profile.name, locale)} <span className="text-muted-2">{tx(profile.altName, locale)}</span>
            </h2>
            <p className="mt-2 mb-0 text-[15px] font-bold text-gold-text">{tx(profile.role, locale)}</p>
            <p className="body mt-5">{tx(profile.intro, locale)}</p>
            <div className="mt-7">
              <MoreLink href={`/${locale}/profile`}>{dict.home.profileTitle}</MoreLink>
            </div>
          </article>
          <article className="tile rv d1 flex flex-col md:col-span-2" style={{ background: "linear-gradient(160deg, var(--gold-wash), transparent 60%), var(--card)" }}>
            <p className="kicker">{dict.profile.now}</p>
            <p className="m-0 text-[clamp(19px,1.8vw,22px)] font-bold leading-snug tracking-[-0.03em]">{tx(profile.now, locale)}</p>
          </article>
          <article className="tile rv md:col-span-3">
            <p className="kicker">{dict.profile.affiliations}</p>
            <ul className="m-0 grid list-none gap-4 p-0">
              {profile.affiliations.map((a) => (
                <li key={a.name.ko}>
                  <p className="m-0 text-[17px] font-bold tracking-[-0.02em]">{tx(a.name, locale)}</p>
                  <p className="caption m-0 mt-0.5">{tx(a.detail, locale)}</p>
                </li>
              ))}
            </ul>
          </article>
          <article className="tile rv d1 md:col-span-3">
            <p className="kicker">{dict.profile.interests}</p>
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              {txList(profile.interests, locale).map((i) => (
                <li key={i} className="chip">
                  {i}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {/* ── 수상 ── */}
      <section className="sec-tight" aria-labelledby="awards-title">
        <div className="wrap">
          <SectionHead
            id="awards-title"
            eyebrow="Awards"
            title={dict.home.awardsTitle}
            action={<MoreLink href={`/${locale}/profile#awards`}>{dict.home.awardsMore}</MoreLink>}
          />
          <ol className="rv m-0 list-none border-b border-line p-0">
            {awards.map((a) => (
              <AwardRow key={`${a.year}-${a.event.ko}-${a.result.ko}`} award={a} locale={locale} dict={dict} />
            ))}
          </ol>
        </div>
      </section>

      {/* ── 프로젝트 ── */}
      <section className="sec-tight" aria-labelledby="projects-title">
        <div className="wrap">
          <SectionHead
            id="projects-title"
            eyebrow="Projects"
            title={dict.home.projectsTitle}
            lead={dict.home.projectsLead}
            action={<MoreLink href={`/${locale}/projects`}>{dict.home.projectsMore}</MoreLink>}
          />
          <div className="grid grid-cols-1 gap-[clamp(12px,1.6vw,20px)] md:grid-cols-2">
            {featured.map((p, i) => (
              <div key={p.slug} className={`rv ${i === 0 ? "md:col-span-2" : i % 2 ? "d1" : "d2"}`}>
                {i === 0 ? <FeaturedProject slug={p.slug} locale={locale} /> : <ProjectCard project={p} locale={locale} dict={dict} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 갤러리 예고 ── */}
      <section className="museum wall sec mt-[clamp(32px,5vw,64px)]" aria-labelledby="gallery-title">
        <div className="wrap">
          <SectionHead
            id="gallery-title"
            center
            eyebrow={
              <>
                <FrameIcon size={18} /> Presentation Gallery
              </>
            }
            title={dict.home.galleryTitle}
            lead={dict.home.galleryLead}
          />
          <div className="grid grid-cols-1 gap-[clamp(28px,4vw,48px)] md:grid-cols-2">
            {decks.map((d, i) => {
              const cover = d.manifest.previews[0];
              return (
                <Link key={d.slug} href={`/${locale}/gallery/${d.slug}`} className={`rv group block ${i ? "d1" : ""}`}>
                  <div className="relative">
                    <div className="spot" aria-hidden="true" />
                    <div className="transition-transform duration-500 ease-out group-hover:-translate-y-1">
                      <FramedSlide
                        src={cover.src}
                        width={cover.width}
                        height={cover.height}
                        alt={tx(d.title, locale)}
                        sizes="(min-width: 900px) 540px, 100vw"
                        mat={deckMatTone(d)}
                      />
                    </div>
                  </div>
                  <div className="placard mx-auto mt-6 max-w-[360px]">
                    <p className="m-0 text-[12px] font-extrabold tracking-[0.14em] text-[#8a6a2a]">
                      {dict.gallery.lot} {String(d.lot).padStart(2, "0")} · {d.year}
                    </p>
                    <p className="m-0 mt-1 text-[19px] font-extrabold tracking-[-0.03em]">{tx(d.title, locale)}</p>
                    <p className="muted m-0 mt-1 text-[13.5px] font-semibold">
                      {d.result ? `${tx(d.result, locale)} · ` : ""}
                      {d.manifest.slideCount}
                      {locale === "ko" ? "장" : " slides"} · {dict.gallery.locked} {deckLockedCount(d)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="rv mt-14 text-center">
            <Link href={`/${locale}/gallery`} className="btn">
              {dict.home.galleryMore}
              <ArrowRightIcon size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/** 첫 프로젝트는 가로로 넓게 — 표지 + 지표. */
function FeaturedProject({ slug, locale }: { slug: string; locale: "ko" | "en" }) {
  const project = projects.find((p) => p.slug === slug)!;
  const dict = getDictionary(locale);
  return (
    <Link href={`/${locale}/projects/${project.slug}`} className="tile tile-link group grid !p-0 md:grid-cols-[1.15fr_1fr]">
      <div className="relative aspect-[1200/630] overflow-hidden border-b border-line-2 bg-black md:aspect-auto md:min-h-[380px] md:border-r md:border-b-0">
        {project.cover && (
          <Image
            src={project.cover.src}
            alt={tx(project.cover.alt, locale)}
            fill
            sizes="(min-width: 900px) 600px, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] md:object-contain"
          />
        )}
      </div>
      <div className="flex flex-col p-7 md:p-10">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className={`badge badge-${project.status}`}>{dict.projects.status[project.status]}</span>
          {project.period && <span className="caption num">{tx(project.period, locale)}</span>}
        </div>
        <h3 className="h3">{tx(project.name, locale)}</h3>
        <p className="mt-3 mb-0 text-[16.5px] font-semibold leading-relaxed text-muted-2">{tx(project.summary, locale)}</p>
        {project.metrics && <Metrics metrics={project.metrics.slice(0, 4)} locale={locale} className="mt-auto grid-cols-2 pt-8" />}
      </div>
    </Link>
  );
}
