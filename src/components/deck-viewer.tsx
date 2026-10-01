"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon, ExpandIcon, LockIcon, MailIcon } from "./icons";

export type ViewerSlide =
  | { slide: number; kind: "preview"; src: string; width: number; height: number }
  | { slide: number; kind: "locked"; dataUrl: string };

type Labels = {
  open: string;
  close: string;
  prev: string;
  next: string;
  lockedTitle: string;
  lockedBody: string;
  inquire: string;
  lockedSlide: string;
  slideOf: string;
  allSlides: string;
  preview: string;
  locked: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * 작품 감상기 — 공개 슬라이드는 크게 보이고, 비공개 슬라이드는 흐린 베일과 문의 안내만 보인다.
 * 비공개 장의 이미지는 애초에 배포본에 없다(8px 색 견본만 전달).
 */
export function DeckViewer({ title, slides, mat, inquireHref, labels }: { title: string; slides: ViewerSlide[]; mat: "light" | "dark"; inquireHref: string; labels: Labels }) {
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const total = slides.length;
  const current = slides[index];
  const previews = slides.filter((s) => s.kind === "preview").length;

  const go = useCallback((delta: number) => setIndex((i) => (i + delta + total) % total), [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  // 크게 보기 중 비공개 장으로 넘어가면 창을 닫고, 포커스를 무대(잠금 안내)로 옮긴다 — 열었던 버튼은 이미 사라졌다.
  useEffect(() => {
    if (current.kind === "locked" && dialogRef.current?.open) {
      dialogRef.current.close();
      stageRef.current?.focus();
    }
  }, [current]);

  const openLightbox = () => {
    if (current.kind !== "preview" || !dialogRef.current) return;
    dialogRef.current.showModal();
    document.documentElement.style.overflow = "hidden"; // 뒤 페이지가 휠로 스크롤되지 않게
    closeRef.current?.focus();
  };
  const onDialogClose = () => {
    document.documentElement.style.overflow = "";
  };
  // 창이 열린 채 페이지를 떠나면(뒤로 가기 등) close 이벤트 없이 dialog 가 사라진다 — 스크롤 잠금을 여기서도 푼다.
  useEffect(
    () => () => {
      document.documentElement.style.overflow = "";
    },
    [],
  );

  const slideLabel = (n: number) => labels.slideOf.replace("{n}", String(n));
  const summary = labels.allSlides
    .replace("{total}", String(total))
    .replace("{open}", String(previews))
    .replace("{locked}", String(total - previews));

  return (
    <div>
      {/* 무대 */}
      <div className="relative">
        <div className="spot" aria-hidden="true" />
        <div className="frame">
          <div className={`frame-mat ${mat === "dark" ? "dark-mat" : ""}`}>
            <div ref={stageRef} tabIndex={-1} className="relative aspect-video overflow-hidden bg-black outline-none" aria-live="polite">
              {current.kind === "preview" ? (
                <button
                  type="button"
                  onClick={openLightbox}
                  className="group block h-full w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[var(--gold)]"
                  aria-label={`${slideLabel(current.slide)} — ${labels.open}`}
                >
                  <Image
                    key={current.src}
                    src={current.src}
                    width={current.width}
                    height={current.height}
                    alt={`${title} — ${slideLabel(current.slide)}`}
                    sizes="(min-width: 1140px) 1040px, 100vw"
                    quality={90}
                    preload={index === 0}
                    className="h-full w-full object-contain"
                  />
                  <span className="absolute right-3 bottom-3 hidden items-center gap-1.5 rounded-full bg-black/65 px-3 py-1.5 text-[12.5px] font-bold text-white backdrop-blur sm:inline-flex">
                    <ExpandIcon size={14} /> {labels.open}
                  </span>
                </button>
              ) : (
                <div className="absolute inset-0">
                  <div className="veil" style={{ backgroundImage: `url(${current.dataUrl})` }} aria-hidden="true" />
                  <div className="absolute inset-0 grid place-items-center bg-black/65 p-3 text-center backdrop-blur-sm sm:p-6">
                    <div className="max-w-[440px]">
                      <span className="mx-auto grid h-9 w-9 place-items-center rounded-full border border-white/30 bg-black/50 text-[var(--gold)] sm:h-12 sm:w-12">
                        <LockIcon size={18} />
                      </span>
                      <p className="mt-2.5 mb-0 text-[15px] font-extrabold tracking-[-0.03em] text-white sm:mt-4 sm:text-[clamp(17px,2.2vw,22px)]">{labels.lockedTitle}</p>
                      <p className="mt-2 mb-0 hidden text-[14.5px] font-semibold leading-relaxed text-white/90 sm:block">{labels.lockedBody}</p>
                      <a href={inquireHref} className="btn btn-sm mt-5 !hidden sm:!inline-flex">
                        <MailIcon size={16} /> {labels.inquire}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 모바일: 무대가 좁아 문의 버튼을 아래로 뺀다 */}
      {current.kind === "locked" && (
        <div className="mt-4 rounded-2xl border border-line bg-card px-4 py-3.5 sm:hidden">
          <p className="m-0 text-[14px] font-semibold leading-relaxed text-ink-2">{labels.lockedBody}</p>
          <a href={inquireHref} className="btn btn-sm mt-3 w-full">
            <MailIcon size={16} /> {labels.inquire}
          </a>
        </div>
      )}

      {/* 넘기기 */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <button type="button" className="icon-btn !h-11 !w-11" onClick={() => go(-1)} aria-label={labels.prev}>
          <ChevronLeftIcon />
        </button>
        <p className="num m-0 text-[15px] font-bold text-ink-2" aria-live="polite">
          <span className="text-ink">{pad(current.slide)}</span>
          <span className="mx-1.5 text-muted-2">/</span>
          {pad(total)}
          {current.kind === "locked" && (
            <span className="ml-3 inline-flex items-center gap-1 align-middle text-[12.5px] font-bold text-muted-2">
              <LockIcon size={13} /> {labels.locked}
            </span>
          )}
        </p>
        <button type="button" className="icon-btn !h-11 !w-11" onClick={() => go(1)} aria-label={labels.next}>
          <ChevronRightIcon />
        </button>
      </div>

      {/* 전체 장 */}
      <p className="caption mt-10 mb-4">{summary}</p>
      <ul className="m-0 grid list-none grid-cols-3 gap-2.5 p-0 sm:grid-cols-5 lg:grid-cols-7">
        {slides.map((s, i) => (
          <li key={s.slide}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-current={i === index ? "true" : undefined}
              aria-label={s.kind === "preview" ? slideLabel(s.slide) : `${slideLabel(s.slide)} — ${labels.lockedSlide}`}
              className={`thumb relative block w-full overflow-hidden rounded-[6px] transition ${i === index ? "ring-[3px] ring-[var(--gold)]" : "opacity-80 hover:opacity-100"}`}
            >
              {s.kind === "preview" ? (
                <span className="relative block aspect-video bg-black">
                  <Image src={s.src} width={s.width} height={s.height} alt="" sizes="160px" className="h-full w-full object-cover" />
                  <span className="num absolute left-1.5 top-1 rounded bg-black/65 px-1 text-[10.5px] font-bold text-white">{pad(s.slide)}</span>
                </span>
              ) : (
                <span className="relative block aspect-video overflow-hidden bg-card-2">
                  <span className="veil" style={{ backgroundImage: `url(${s.dataUrl})` }} aria-hidden="true" />
                  <span className="lock-glass">
                    <LockIcon size={15} />
                  </span>
                  <span className="num absolute left-1.5 top-1 rounded bg-black/65 px-1 text-[10.5px] font-bold text-white">{pad(s.slide)}</span>
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      {/* 크게 보기 */}
      <dialog
        ref={dialogRef}
        onClose={onDialogClose}
        className="m-auto max-h-none max-w-none overscroll-contain bg-transparent p-0 backdrop:bg-black/90 backdrop:backdrop-blur-sm"
        aria-label={title}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        <div className="relative w-[min(96vw,calc((92dvh-64px)*16/9))]">
          {current.kind === "preview" && (
            <Image src={current.src} width={current.width} height={current.height} alt={`${title} — ${slideLabel(current.slide)}`} sizes="96vw" quality={90} className="w-full rounded-md" />
          )}
          <div className="mt-3 flex items-center justify-center gap-3">
            <button type="button" className="icon-btn !border-white/25 !text-white" onClick={() => go(-1)} aria-label={labels.prev}>
              <ChevronLeftIcon />
            </button>
            <span className="num min-w-[64px] text-center text-[14px] font-bold text-white/85">
              {pad(current.slide)} / {pad(total)}
            </span>
            <button ref={closeRef} type="button" className="icon-btn !border-white/25 !text-white" onClick={() => dialogRef.current?.close()} aria-label={labels.close}>
              <CloseIcon />
            </button>
            <button type="button" className="icon-btn !border-white/25 !text-white" onClick={() => go(1)} aria-label={labels.next}>
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
