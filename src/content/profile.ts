import type { Award, L10n, L10nList } from "./types";

export const profile = {
  name: { ko: "강해", en: "Kang Hea" } satisfies L10n,
  /** 다른 언어 표기 — 이름 옆에 작게 */
  altName: { ko: "Kang Hea", en: "강해" } satisfies L10n,
  headline: {
    ko: "문제를 찾고, 검증하고, 실제 서비스로 만듭니다.",
    en: "I find real problems, validate them, and ship them as products.",
  } satisfies L10n,
  role: { ko: "Business × Technology · Product Builder", en: "Business × Technology · Product Builder" } satisfies L10n,
  intro: {
    ko: "경북대학교 경영학부에서 공부하며, 소프트웨어 개발 경험과 비즈니스 기획을 함께 다룹니다. 아이디어 제안에서 멈추지 않고 문제 발견 → 사용자 검증 → 서비스 기획 → 개발 → 배포·운영까지 직접 수행하는 것을 지향합니다.",
    en: "I study Business Administration at Kyungpook National University and work across software development and business planning. Rather than stopping at an idea, I aim to carry it all the way: finding the problem, validating it with users, planning the service, building it, and shipping and operating it myself.",
  } satisfies L10n,
  now: {
    ko: "현재 대한민국 공군 정보통신학교에서 복무하며, 군 현장에서 발견한 문제를 다루는 국방 기술 프로젝트부터 부동산·교육·투자 분야의 서비스까지 만들고 있습니다.",
    en: "I'm currently serving at the Republic of Korea Air Force Information & Communications School, building everything from a defense-tech project born from problems I saw on base to services in real estate, education, and investing.",
  } satisfies L10n,
  affiliations: [
    { name: { ko: "경북대학교 경영학부", en: "Kyungpook National University — School of Business Administration" }, detail: { ko: "재학", en: "Undergraduate" } },
    { name: { ko: "대한민국 공군 정보통신학교", en: "ROK Air Force Information & Communications School" }, detail: { ko: "복무 중 · 조교", en: "On active duty · Teaching assistant" } },
    { name: { ko: "KNU 싱크탱크", en: "KNU Think Tank" }, detail: { ko: "고치소 팀장 · 사업 총괄", en: "Gochiso team lead · Business lead" } },
  ] satisfies { name: L10n; detail: L10n }[],
  interests: {
    ko: ["프로덕트 · 서비스 기획", "스타트업 · 사업 개발", "웹 · 앱 개발", "AI 에이전트", "프롭테크", "에듀테크", "컴퓨터 비전 · 3D 재구성", "투자 · 금융"],
    en: ["Product & service planning", "Startups & business development", "Web & app development", "AI agents", "PropTech", "EdTech", "Computer vision & 3D reconstruction", "Investing & finance"],
  } satisfies L10nList,
  email: "kanghea@knu.ac.kr",
  github: "https://github.com/kanghea",
};

/** 수상·주요 활동 — 최신순. 출처: 고치소 발표자료 팀 소개(16장), BattleView 3D 발표자료. */
export const awards: Award[] = [
  {
    year: 2026,
    event: { ko: "공군 창업경진대회", en: "ROK Air Force Startup Competition" },
    result: { ko: "본선 진출", en: "Finalist" },
    summary: {
      ko: "BattleView 3D · 팀 오일머니 — 드론 영상을 3D 공간으로 재구성하는 전술 공간 플랫폼",
      en: "BattleView 3D · Team Oil Money — a tactical platform that reconstructs drone footage into 3D space",
    },
    project: "battleview-3d",
  },
  {
    year: 2024,
    event: { ko: "경북대학교 경영학부 창업경진대회", en: "KNU School of Business Startup Competition" },
    result: { ko: "우수상 (2위)", en: "Excellence Award (2nd place)" },
    summary: {
      ko: "부동산·자취방 문제를 해결하는 플랫폼 기획",
      en: "A platform concept tackling student housing and rental problems",
    },
  },
  {
    year: 2022,
    event: { ko: "청소년 ICT 창업가캠프", en: "Youth ICT Entrepreneurship Camp" },
    result: { ko: "금상", en: "Gold Prize" },
    honor: { ko: "교육감상", en: "Superintendent of Education Award" },
    summary: {
      ko: "학생 창업 프로젝트 기획 · 서비스 개발 · 발표",
      en: "Planned, built, and pitched a student startup project",
    },
  },
  {
    year: 2021,
    event: { ko: "SW융합 해커톤", en: "SW Convergence Hackathon" },
    result: { ko: "우수상", en: "Excellence Award" },
    honor: { ko: "대구광역시장상", en: "Mayor of Daegu Award" },
    summary: {
      ko: "블루투스 비콘을 활용한 통합 학업관리 시스템",
      en: "An integrated academic management system using Bluetooth beacons",
    },
  },
  {
    year: 2021,
    event: { ko: "청소년 ICT 창업가캠프", en: "Youth ICT Entrepreneurship Camp" },
    result: { ko: "창의상", en: "Creativity Award" },
    honor: { ko: "교육감상", en: "Superintendent of Education Award" },
    summary: {
      ko: "ICT 기반 서비스 기획 · 창업 프로젝트",
      en: "An ICT-based service and startup project",
    },
  },
];
