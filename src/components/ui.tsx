import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Award, Deck, Metric, Project, ProjectStatus } from "@/content/types";
import { tx, txv } from "@/content/types";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { ArrowRightIcon, LockIcon } from "./icons";
import { ProjectArt } from "./project-art";

export function StatusBadge({ status, dict }: { status: ProjectStatus; dict: Dictionary }) {
  return <span className={`badge badge-${status}`}>{dict.projects.status[status]}</span>;
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  action,
  id,
  center,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
  id?: string;
  center?: boolean;
}) {
  return (
    <div className={`rv mb-10 flex flex-col gap-6 md:mb-14 ${center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"}`}>
      <div className={center ? "flex flex-col items-center" : undefined}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 id={id} className="h2">
          {title}
        </h2>
        {lead && <p className={`copy mt-5 ${center ? "mx-auto" : ""}`}>{lead}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function MoreLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="link">
      {children}
      <ArrowRightIcon size={17} />
    </Link>
  );
}

/** 프로젝트 표지 — 이미지가 있으면 이미지, 없으면 그린 표지. 16:9 상자를 채운다. */
export function ProjectCover({ project, locale, sizes, preload }: { project: Project; locale: Locale; sizes: string; preload?: boolean }) {
  if (project.cover) {
    return (
      <Image
        src={project.cover.src}
        width={project.cover.width}
        height={project.cover.height}
        alt={tx(project.cover.alt, locale)}
        sizes={sizes}
        preload={preload}
        className="h-full w-full object-cover"
      />
    );
  }
  if (project.art) return <ProjectArt art={project.art} label={tx(project.name, locale)} />;
  return <div className="h-full w-full bg-card-2" aria-hidden="true" />;
}

export function ProjectCard({ project, locale, dict, large, headingLevel = 3 }: { project: Project; locale: Locale; dict: Dictionary; large?: boolean; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <Link href={`/${locale}/projects/${project.slug}`} className="tile tile-link group flex h-full flex-col !p-0">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-line-2 bg-card-2">
        <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
          <ProjectCover project={project} locale={locale} sizes={large ? "(min-width: 900px) 640px, 100vw" : "(min-width: 900px) 360px, (min-width: 640px) 50vw, 100vw"} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <StatusBadge status={project.status} dict={dict} />
          {project.period && <span className="caption num">{tx(project.period, locale)}</span>}
        </div>
        <Heading className={large ? "h3" : "h4 !text-[clamp(21px,2vw,26px)]"}>{tx(project.name, locale)}</Heading>
        <p className="mt-2 text-[15.5px] font-semibold leading-relaxed text-muted-2">{tx(project.tagline, locale)}</p>
        <p className="mt-auto pt-5 text-[13.5px] font-semibold text-ink-2">
          <span className="text-muted-2">{dict.projects.role} · </span>
          {tx(project.role, locale)}
        </p>
      </div>
    </Link>
  );
}

export function AwardRow({ award, locale, dict, detailed }: { award: Award; locale: Locale; dict: Dictionary; detailed?: boolean }) {
  return (
    <li className="grid grid-cols-[64px_minmax(0,1fr)] gap-x-4 gap-y-3 border-t border-line py-6 sm:grid-cols-[96px_minmax(0,1fr)] lg:grid-cols-[96px_minmax(0,1fr)_minmax(0,15rem)] lg:items-baseline">
      <span className="num text-[clamp(22px,2.4vw,30px)] font-extrabold tracking-[-0.04em] g-gold">{award.year}</span>
      <div>
        <p className="m-0 text-[clamp(18px,1.7vw,21px)] font-bold tracking-[-0.03em]">{tx(award.event, locale)}</p>
        {award.summary && <p className="mt-1.5 mb-0 text-[15px] font-semibold leading-relaxed text-muted-2">{tx(award.summary, locale)}</p>}
        {detailed && award.project && (
          <Link href={`/${locale}/projects/${award.project}`} className="link mt-3 !text-[14.5px]">
            {dict.profile.relatedProject}
            <ArrowRightIcon size={15} />
          </Link>
        )}
      </div>
      <div className="col-start-2 flex flex-wrap gap-2 lg:col-start-3 lg:justify-end">
        <span className="badge badge-gold">{tx(award.result, locale)}</span>
        {award.honor && <span className="chip !min-h-0 !whitespace-normal !py-0.5">{tx(award.honor, locale)}</span>}
      </div>
    </li>
  );
}

/** 액자에 건 슬라이드 — 갤러리 대표 이미지. */
export function FramedSlide({
  src,
  width,
  height,
  alt,
  sizes,
  preload,
  mat = "light",
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  sizes: string;
  preload?: boolean;
  mat?: "light" | "dark";
}) {
  return (
    <div className="frame">
      <div className={`frame-mat ${mat === "dark" ? "dark-mat" : ""}`}>
        <Image src={src} width={width} height={height} alt={alt} sizes={sizes} preload={preload} quality={90} className="w-full" />
      </div>
    </div>
  );
}

/** 잠긴 슬라이드 — 8px 색 견본을 흐리게 펼쳐 분위기만 보인다. */
export function VeiledSlide({ dataUrl, slide, label }: { dataUrl: string; slide: number; label: string }) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-[6px] bg-card-2" role="img" aria-label={`${slide} — ${label}`}>
      <div className="veil" style={{ backgroundImage: `url(${dataUrl})` }} aria-hidden="true" />
      <div className="lock-glass" aria-hidden="true">
        <LockIcon size={18} />
      </div>
      <span className="num absolute left-2 top-1.5 text-[11px] font-bold text-white/80" aria-hidden="true">
        {String(slide).padStart(2, "0")}
      </span>
    </div>
  );
}

/** 숫자 지표 — 큰 골드 숫자 + 설명. dt(설명)를 먼저 두고 화면에서는 숫자를 위로 올린다. */
export function Metrics({ metrics, locale, className = "" }: { metrics: Metric[]; locale: Locale; className?: string }) {
  return (
    <dl className={`m-0 grid items-start gap-x-6 gap-y-5 ${className}`}>
      {metrics.map((m) => (
        <div key={m.label.ko} className="flex flex-col-reverse">
          <dt className="caption mt-1 !text-[13.5px] leading-snug">{tx(m.label, locale)}</dt>
          <dd className="num m-0 text-[clamp(28px,2.8vw,38px)] font-extrabold leading-none tracking-[-0.04em] g-gold">{txv(m.value, locale)}</dd>
        </div>
      ))}
    </dl>
  );
}

export const deckLockedCount = (deck: Deck) => deck.manifest.slideCount - deck.manifest.previews.length;

export const deckMatTone = (deck: Deck): "light" | "dark" => (deck.slug === "battleview-3d" ? "dark" : "light");
