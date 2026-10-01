import type { Deck, DeckManifest } from "./types";
import battleviewManifest from "./gallery/battleview-3d.deck.json";
import gochisoManifest from "./gallery/gochiso.deck.json";

/**
 * 발표자료 갤러리.
 * 새 덱 추가: `python3 scripts/import_deck.py <파일.pptx> --slug <slug>` 실행 후
 * 생성된 `./gallery/<slug>.deck.json` 을 import 해서 아래 배열에 항목을 더한다.
 * 결과(result)는 확인된 수상 · 결과만 적는다 — 모르면 비워 둔다.
 */
export const decks: Deck[] = [
  {
    slug: "battleview-3d",
    lot: 1,
    title: { ko: "BattleView 3D", en: "BattleView 3D" },
    subtitle: {
      ko: "훈련 전 지형을 3D로 이해하게 해 주는 전술 공간 소프트웨어",
      en: "Tactical software that lets units understand terrain in 3D before training",
    },
    year: 2026,
    usedFor: { ko: "2026 공군 창업경진대회 본선 발표", en: "Final-round pitch, 2026 ROK Air Force Startup Competition" },
    result: { ko: "본선 진출", en: "Finalist" },
    role: {
      ko: "군 현장 문제 정의 · 사업 기획 · 시장 검증 · 파일럿 설계 · 발표",
      en: "Field problem definition · business planning · market validation · pilot design · pitching",
    },
    team: { ko: "팀 오일머니", en: "Team Oil Money" },
    credit: { ko: "팀 오일머니 공동 제작", en: "Team Oil Money (joint work)" },
    note: {
      ko: "ISR 드론 운용 현장의 네 가지 문제에서 출발해, 실제 구동 데모 → 부대 활용 시나리오 → 기술 파이프라인 → 5가지 3D 재구성 방식 비교 → 경쟁사 포지셔닝 → 시장 규모 → 민간 선진입 후 군 확산 전략까지 한 흐름으로 설득하는 본선 발표 덱입니다. 네이비 바탕에 블루를 주 포인트로 써서 '작전 화면' 같은 톤을 냅니다.",
      en: "A finals pitch deck that starts from four problems in ISR drone operations and argues in one continuous line: a live demo → field scenarios → the technical pipeline → a comparison of five 3D reconstruction methods → competitive positioning → market sizing → a dual-use, civilian-first growth strategy. A navy base with blue as the main accent gives it the look of an operations console.",
    },
    chapters: {
      ko: ["문제 정의 — ISR 드론 운용의 4가지 문제", "Live Demo — 직접 구현한 end-to-end", "현장 부대 활용 시나리오", "Why Now", "기술 파이프라인 — Capture · Process · Deploy", "5가지 3D 재구성 방식 비교", "경쟁사 포지셔닝", "ATAK / WinTAK 연동", "시장 규모 — TAM · SAM · SOM", "성장 전략 · 비즈니스 모델", "파일럿 도입 비용", "팀 구성 · 클로징"],
      en: ["Problem — four issues in ISR drone operations", "Live demo — an end-to-end build", "Field use-case scenarios", "Why now", "Technical pipeline — capture · process · deploy", "Five 3D reconstruction methods compared", "Competitive positioning", "ATAK / WinTAK integration", "Market size — TAM · SAM · SOM", "Growth strategy · business model", "Pilot deployment cost", "Team · closing"],
    },
    highlights: [
      { value: { ko: "2분", en: "2 min" }, label: { ko: "드론 영상 → 3D 공간(목표 처리 시간)", en: "Drone footage → 3D space (target time)" } },
      { value: { ko: "5가지", en: "5" }, label: { ko: "비교한 3D 재구성 방식", en: "3D reconstruction methods compared" } },
      { value: { ko: "17장", en: "17" }, label: { ko: "전체 분량", en: "Slides in total" } },
    ],
    medium: { ko: "PowerPoint · 16:9", en: "PowerPoint · 16:9" },
    lockedNote: {
      ko: "4장부터의 원본 슬라이드(기술 비교 · 시장 · 수익화 · 팀)는 비공개입니다. 일부 내용은 프로젝트 이야기에 글로 정리했습니다.",
      en: "The original slides from 4 onward (technology comparison, market, monetization, team) are private; parts of the content are summarized in the project story.",
    },
    project: "battleview-3d",
    manifest: battleviewManifest as DeckManifest,
  },
  {
    slug: "gochiso",
    lot: 2,
    title: { ko: "고치소", en: "Gochiso" },
    subtitle: {
      ko: "세입자 민원을 접수부터 정산까지 대신 처리하는 AI 건물관리 에이전트",
      en: "An AI building-management agent that handles tenant requests from intake to settlement",
    },
    year: 2026,
    usedFor: { ko: "KNU 지식재산 아이디어 경진대회 발표", en: "Pitch at the KNU Intellectual Property Idea Competition" },
    role: {
      ko: "팀장 · 사업 총괄 — 사용자 인터뷰, 시장 검증, 서비스 구조, 비즈니스 모델, 발표자료 설계",
      en: "Team lead · business lead — user interviews, market validation, service design, business model, deck design",
    },
    team: { ko: "KNU 싱크탱크 · 기획 3인 + 개발 3인", en: "KNU Think Tank · 3 planners + 3 engineers" },
    note: {
      ko: "건물주 · 수리업자 · 세입자 37명 인터뷰로 '책임 소재가 불명확하다'는 문제를 검증하고, 기존 서비스가 끊어 놓은 접수 → 판단 → 업체 배정 → 일정 → 정산 흐름을 하나의 에이전트로 잇는 구조를 제안합니다. 밝은 회색 바탕에 검정 · 레드를 주조색으로 써서 숫자와 결론이 먼저 읽히도록 설계했고, 예상 질문 15개를 부록으로 준비했습니다.",
      en: "37 interviews with landlords, repair contractors, and tenants validate the core problem — nobody is sure who is responsible — and the deck proposes one agent that reconnects the intake → judgment → contractor dispatch → scheduling → settlement flow that existing services leave fragmented. A light-gray canvas with black and red as the working colors lets the numbers and conclusions read first, backed by a 15-question Q&A appendix.",
    },
    chapters: {
      ko: ["문제 상황 — 임대인 · 세입자 간 책임 소재", "인터뷰 & 현장 검증 (37명)", "왜 아직 해결되지 않았나 — 기존 서비스 비교", "솔루션 — Multimodal VLM + RAG", "MVP 시연", "에이전틱 AI — 기존 방식과 비교 · 효과", "접수부터 정산까지 전체 워크플로", "Why Now · 개발 범위", "비즈니스 모델 · 시장 규모", "PoC 실행 계획 · 성장 전략", "경쟁사 포지셔닝 · 자문 · 팀", "부록 — 예상 질문 15선 · PoC 목록"],
      en: ["Problem — who is responsible, landlord or tenant?", "Interviews & field validation (37 people)", "Why it's still unsolved — existing services compared", "Solution — multimodal VLM + RAG", "MVP demo", "Agentic AI — versus the status quo, and its impact", "End-to-end workflow, intake to settlement", "Why now · build scope", "Business model · market size", "PoC plan · growth strategy", "Competitive positioning · advisors · team", "Appendix — 15 anticipated questions · PoC sites"],
    },
    highlights: [
      { value: { ko: "37명", en: "37" }, label: { ko: "인터뷰 (건물주 12 · 수리업자 5 · 세입자 20)", en: "Interviews (12 landlords · 5 contractors · 20 tenants)" } },
      { value: { ko: "120호실", en: "120" }, label: { ko: "PoC 테스트베드 확보", en: "Rental units secured as a PoC test bed" } },
      { value: { ko: "45장", en: "45" }, label: { ko: "전체 분량 (본편 28 + 부록 17)", en: "Slides (28 main + 17 appendix)" } },
    ],
    medium: { ko: "PowerPoint · 16:9", en: "PowerPoint · 16:9" },
    lockedNote: {
      ko: "4장부터의 원본 슬라이드(인터뷰 · 워크플로 · 비즈니스 모델 · 팀 · 예상 질문 부록)는 비공개입니다. 일부 내용은 프로젝트 이야기에 글로 정리했습니다.",
      en: "The original slides from 4 onward (interviews, workflow, business model, team, Q&A appendix) are private; parts of the content are summarized in the project story.",
    },
    project: "gochiso",
    manifest: gochisoManifest as DeckManifest,
  },
];

export const getDeck = (slug: string) => decks.find((d) => d.slug === slug);
