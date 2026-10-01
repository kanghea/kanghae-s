import type { Locale } from "@/i18n/config";
import { glue } from "@/lib/text";

/** 한 항목의 한국어·영어 문구. 두 언어를 나란히 적어 한쪽만 고치는 실수를 막는다. */
export type L10n = Record<Locale, string>;
export type L10nList = Record<Locale, string[]>;

export const tx = (value: L10n, locale: Locale): string => glue(value[locale]);
/** 숫자처럼 언어와 무관한 값은 문자열 그대로, 단위가 붙는 값은 L10n 으로 적는다. */
export const txv = (value: string | L10n, locale: Locale): string => glue(typeof value === "string" ? value : value[locale]);

export type Metric = { value: string | L10n; label: L10n };
export const txList = (value: L10nList, locale: Locale): string[] => value[locale].map(glue);

export type Award = {
  year: number;
  /** 대회·행사명 */
  event: L10n;
  /** 수상 등급·결과 (예: 우수상) */
  result: L10n;
  /** 상의 격 (예: 대구광역시장상) — 없으면 생략 */
  honor?: L10n;
  /** 무엇으로 받았는지 한 줄 */
  summary?: L10n;
  /** 관련 프로젝트 slug */
  project?: string;
};

export type ProjectStatus = "live" | "beta" | "building" | "shipped" | "competition" | "concept";

export type ProjectLink = { label: L10n; href: string };

export type StorySection = {
  key: "problem" | "insight" | "solution" | "role" | "product" | "result";
  body: L10n;
  bullets?: L10nList;
};

export type Project = {
  slug: string;
  name: L10n;
  /** 한 줄 소개 */
  tagline: L10n;
  /** 카드에 쓰는 2~3문장 요약 */
  summary: L10n;
  /** 기간 — 모르면 비워 둔다 */
  period?: L10n;
  /** 정렬·타임라인용 대표 연도 — 모르면 비워 두고 타임라인에서 빠진다 */
  year?: number;
  status: ProjectStatus;
  categories: L10nList;
  role: L10n;
  team?: L10n;
  stack?: string[];
  /** 숫자로 보여 줄 핵심 지표 */
  metrics?: Metric[];
  story: StorySection[];
  links?: ProjectLink[];
  /** 대표 이미지(public 기준 경로). 없으면 art 로 그린 표지를 쓴다. */
  cover?: { src: string; width: number; height: number; alt: L10n };
  /** 이미지가 없을 때 그리는 표지 일러스트 종류 */
  art?: "omok" | "market" | "quest" | "route";
  /** 상세 페이지의 앱 화면 캡처(세로 폰 화면) */
  screens?: { src: string; width: number; height: number; alt: L10n }[];
  /** 연결된 발표자료(갤러리 slug) */
  deck?: string;
  featured?: boolean;
};

export type DeckManifest = {
  slug: string;
  slideCount: number;
  aspectRatio: [number, number];
  source: string;
  previews: { slide: number; src: string; width: number; height: number }[];
  veils: { slide: number; dataUrl: string }[];
};

export type Deck = {
  slug: string;
  /** 갤러리 작품 번호 */
  lot: number;
  title: L10n;
  subtitle: L10n;
  year: number;
  /** 어디에 썼는지 */
  usedFor: L10n;
  /** 수상·결과 — 확인된 것만 */
  result?: L10n;
  /** 덱 제작에서 맡은 일 */
  role: L10n;
  team?: L10n;
  /** 덱 제작 주체 — 공동 제작이면 적는다(맡은 일과 구분) */
  credit?: L10n;
  /** 도록 해설 */
  note: L10n;
  /** 목차(챕터) */
  chapters: L10nList;
  /** 덱이 강조하는 숫자 */
  highlights?: Metric[];
  /** 매체 표기에 쓰는 제작 도구 */
  medium: L10n;
  /** 공개 미리보기 너머 비공개 장을 설명하는 문구 */
  lockedNote?: L10n;
  project?: string;
  manifest: DeckManifest;
};
