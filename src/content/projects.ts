import type { Project } from "./types";

/**
 * 프로젝트 목록 — 배열 순서가 곧 노출 순서다.
 * 원칙: 저장소 · 발표자료 · 본인이 정리한 기록으로 확인된 사실만 적는다. 모르는 칸은 비운다.
 * 비공개 저장소(중개사코치 · 오목조목 · 서문12)는 코드 링크를 걸지 않는다.
 */
export const projects: Project[] = [
  {
    slug: "junggaesacoach",
    name: { ko: "중개사코치", en: "Junggaesa Coach" },
    tagline: {
      ko: "공인중개사 8개년 기출 1,569문항에서 오늘 풀 문제를 골라 주는 학습 코치 앱",
      en: "A study-coach app that picks today's questions from 1,569 past exam questions (8 years, 2018–2025) for Korea's licensed real-estate agent exam",
    },
    summary: {
      ko: "시험일과 목표에 맞춰 매일의 학습량을 짜 주고, 틀린 문제를 다시 불러오고, 과목별 예상 점수로 합격선까지 관리해 줍니다. 기획부터 데이터 검증 · 개발 · 배포 · 운영까지 혼자 했습니다.",
      en: "It plans each day's workload around the exam date and your goal, brings back the questions you missed, and tracks predicted scores per subject against the pass line. I did everything — planning, data validation, development, release, and operations.",
    },
    period: { ko: "2026.07 – 현재", en: "Jul 2026 – present" },
    year: 2026,
    status: "live",
    categories: { ko: ["에듀테크", "모바일 앱", "웹"], en: ["EdTech", "Mobile app", "Web"] },
    role: { ko: "1인 기획 · 디자인 · 개발 · 데이터 검증 · 운영", en: "Solo — planning, design, development, data validation, operations" },
    stack: ["Expo SDK 57", "React Native 0.86", "React 19", "TypeScript", "Expo Router", "SQLite", "Supabase", "Vercel", "Python"],
    metrics: [
      { value: "1,569", label: { ko: "검증한 기출 문항 (2018–2025)", en: "Verified past-exam questions (2018–2025)" } },
      { value: "356", label: { ko: "개념 카드", en: "Concept cards" } },
      { value: { ko: "193편", en: "193" }, label: { ko: "학습 만화", en: "Study comics" } },
      { value: { ko: "83개", en: "83" }, label: { ko: "PR 머지 (12주)", en: "PRs merged in 12 weeks" } },
    ],
    story: [
      {
        key: "problem",
        body: {
          ko: "공인중개사 수험생은 8개년 기출과 5과목을 스스로 계획해야 합니다. 오늘 무엇을 풀지, 틀린 문제를 언제 다시 볼지, 시험일까지 남은 날에 맞춰 속도를 어떻게 조절할지가 모두 수험생 몫입니다.",
          en: "Candidates for the licensed real-estate agent exam have to plan eight years of past exams across five subjects on their own: what to solve today, when to revisit mistakes, and how to pace themselves to the exam date.",
        },
      },
      {
        key: "insight",
        body: {
          ko: "병목은 문제의 양이 아니라 계획이었습니다. 그리고 계획을 맡기려면 데이터부터 믿을 수 있어야 했습니다 — 법령이 바뀌어 정답이 달라진 옛 기출이 그대로 돌아다니고 있었습니다.",
          en: "The bottleneck wasn't the number of questions but the plan. And to hand over the plan, the data had to be trustworthy first — older questions whose answers changed with new laws were still circulating as-is.",
        },
      },
      {
        key: "solution",
        body: {
          ko: "코치가 매일 풀 문제를 골라 주는 앱을 만들었습니다.",
          en: "I built an app where a coach picks the day's questions for you.",
        },
        bullets: {
          ko: [
            "시험일과 목표(1차 · 2차 · 동차)에 맞춘 '오늘 학습' — 실제 기출 → 즉시 채점 → 선지별 O/X 해설, 원하면 개념 카드부터",
            "틀린 문제는 1일 · 3일 뒤 다시 출제, 두 번 연속 맞히면 졸업하는 복습 일정",
            "과목별 예상 점수와 과락선을 비교하는 리포트, 위험 과목은 출제 비중을 자동으로 올림",
            "실전 모의고사(8개년) · 월간 진단 모의고사 · 친구에게 보내는 레벨 테스트",
          ],
          en: [
            "A daily plan tuned to the exam date and goal (stage 1, stage 2, or both): real past questions → instant grading → true/false explanations for every answer choice, with optional concept cards first",
            "Spaced review that brings missed questions back after 1 and 3 days and 'graduates' them after two correct answers in a row",
            "Reports comparing predicted scores per subject with each subject's minimum passing score (40/100), automatically weighting at-risk subjects",
            "Full mock exams for eight years, monthly diagnostic exams, and a shareable level-test challenge",
          ],
        },
      },
      {
        key: "role",
        body: {
          ko: "기획 · 디자인 · 개발 · 데이터 · 배포 · 운영을 혼자 맡았습니다.",
          en: "I owned planning, design, development, data, release, and operations alone.",
        },
        bullets: {
          ko: [
            "1,569문항 데이터셋과 검증 게이트(정답 · 개념 참조 · 부정형 극성 불변식) 설계",
            "iOS · Android · 웹을 한 코드로 — 태블릿 엄지 컨트롤, 필기 패드, 웹 키보드 조작까지",
            "검색 유입용 정적 문항 · 개념 페이지, 익명 사용 통계(Supabase)와 관리자 대시보드",
            "Google Play 비공개 베타 테스터 모집 · 배포 · 피드백 수집 · 오류 수정",
          ],
          en: [
            "Designed the 1,569-question dataset and its validation gate (answers, concept references, negative-question polarity invariants)",
            "One codebase for iOS, Android, and web — including a tablet thumb control, a handwriting pad, and full keyboard navigation on the web",
            "Static question and concept pages for search traffic, plus anonymous analytics (Supabase) with an admin dashboard",
            "Recruited Google Play closed-beta testers, shipped builds, collected feedback, and fixed bugs",
          ],
        },
      },
      {
        key: "result",
        body: {
          ko: "웹에서 설치 · 가입 없이 바로 쓸 수 있게 운영 중이고, Android는 Google Play 비공개 베타로 배포했습니다. 2018–2021 기출은 현행 법령으로 다시 검토해 맞지 않게 된 31문항(정답 변경 · 조문 폐지 등)을 뺐고, 웹 배포 용량을 37% 줄여 검색으로 들어온 첫 방문을 46% 가볍게 했습니다.",
          en: "It runs on the web with no install or sign-up, and the Android app shipped as a Google Play closed beta. I re-reviewed the 2018–2021 questions against current law and removed 31 that no longer hold (changed answers, repealed provisions), and cut the web deployment by 37%, making first visits from search 46% lighter.",
        },
      },
    ],
    links: [
      { label: { ko: "웹에서 써 보기", en: "Try it on the web" }, href: "https://junggaesacoach.vercel.app" },
      { label: { ko: "소개 페이지", en: "Landing page" }, href: "https://junggaesacoach.vercel.app/promotion" },
      { label: { ko: "레벨 테스트", en: "Level test" }, href: "https://junggaesacoach.vercel.app/level" },
    ],
    cover: {
      src: "/projects/junggaesacoach/og.jpg",
      width: 1200,
      height: 630,
      alt: { ko: "중개사코치 — 합격까지, 계획대로.", en: "Junggaesa Coach — pass the exam, on plan" },
    },
    screens: [
      { src: "/projects/junggaesacoach/screen-home.webp", width: 900, height: 1951, alt: { ko: "홈 — 오늘 학습", en: "Home — today's study" } },
      { src: "/projects/junggaesacoach/screen-concept.webp", width: 900, height: 1951, alt: { ko: "개념 카드와 3컷 만화", en: "Concept card with a 3-panel comic" } },
      { src: "/projects/junggaesacoach/screen-correct.webp", width: 900, height: 1951, alt: { ko: "즉시 채점", en: "Instant grading" } },
      { src: "/projects/junggaesacoach/screen-wrongnote.webp", width: 900, height: 1951, alt: { ko: "오답노트와 복습 일정", en: "Mistake notebook with review dates" } },
      { src: "/projects/junggaesacoach/screen-report.webp", width: 900, height: 1951, alt: { ko: "과목별 예상 점수 리포트", en: "Predicted-score report by subject" } },
      { src: "/projects/junggaesacoach/screen-level-result.webp", width: 900, height: 1951, alt: { ko: "레벨 테스트 결과", en: "Level-test result" } },
    ],
  },
  {
    slug: "battleview-3d",
    name: { ko: "BattleView 3D", en: "BattleView 3D" },
    tagline: {
      ko: "드론 영상만으로 작전 공간을 빠르게 3D로 재구성하는 전술 공간 플랫폼",
      en: "A tactical platform that rapidly reconstructs operating areas in 3D from drone footage alone",
    },
    summary: {
      ko: "ISR 드론 운용의 한계에서 출발한 팀 오일머니의 프로젝트입니다. 드론 영상을 NeRF · 3D Gaussian Splatting으로 재구성해 훈련 전에 공간을 자유 시점으로 둘러보게 하는 시스템을 기획해 2026 공군 창업경진대회 본선에 올랐고, 저는 공군 정보통신학교 조교로 지켜본 군 교육의 한계를 바탕으로 문제 정의 · 사업 기획 · 시장 검증 · 파일럿 설계 · 발표를 맡았습니다.",
      en: "A Team Oil Money project that started from the limits of ISR drone operations. We designed a system that reconstructs drone footage with NeRF and 3D Gaussian Splatting so units can explore a space from any viewpoint before training, and reached the finals of the 2026 ROK Air Force Startup Competition. Drawing on what I saw of military training as an assistant instructor, I owned problem definition, business planning, market validation, pilot design, and the pitch.",
    },
    period: { ko: "2026", en: "2026" },
    year: 2026,
    status: "competition",
    categories: { ko: ["국방 기술", "컴퓨터 비전", "3D 재구성"], en: ["Defense tech", "Computer vision", "3D reconstruction"] },
    role: {
      ko: "군 도메인 · 현장 검증 — 문제 정의, 사업 기획, 시장 검증, 파일럿 설계, 발표",
      en: "Military domain & field validation — problem definition, business planning, market validation, pilot design, pitching",
    },
    team: { ko: "팀 오일머니", en: "Team Oil Money" },
    stack: ["NeRF", "3D Gaussian Splatting", "On-premise", "ATAK / WinTAK"],
    metrics: [
      { value: { ko: "2분", en: "2 min" }, label: { ko: "목표 처리 시간 (영상 → 3D)", en: "Target processing time (video → 3D)" } },
      { value: { ko: "5가지", en: "5" }, label: { ko: "비교한 3D 재구성 방식", en: "3D reconstruction methods compared" } },
      { value: { ko: "본선 진출", en: "Finalist" }, label: { ko: "2026 공군 창업경진대회", en: "2026 ROK Air Force Startup Competition" } },
    ],
    story: [
      {
        key: "problem",
        body: {
          ko: "ISR 드론 영상은 촬영된 시점으로만 볼 수 있고, 영상의 흐름을 따라가야 하며, 필요한 장면을 찾으려면 긴 영상을 되감아야 합니다. 무엇보다 2D 화면으로는 건물과 지형의 실제 구조를 가늠하기 어렵습니다. 기존 3D 공간 구축은 LiDAR · 사진측량처럼 비싸거나 수 시간에서 수 일이 걸렸습니다.",
          en: "ISR drone footage can only be seen from the angle it was shot, forces you to follow the video's flow, and makes you scrub through long recordings to find a scene. Above all, a 2D screen makes it hard to judge the real structure of buildings and terrain. Existing 3D methods like LiDAR or photogrammetry were either expensive or took hours to days.",
        },
      },
      {
        key: "insight",
        body: {
          ko: "지금이 작게 시작할 때라고 봤습니다. 국방부의 '50만 드론전사' 양성 계획으로 교육용 드론 11,265대 배치가 예정돼 있고, 2026년 공모형 획득제도가 열리면서 작은 팀도 진입할 길이 생겼습니다.",
          en: "We saw this as the moment to start small. The Ministry of National Defense plans to deploy 11,265 training drones under its '500,000 drone warriors' program, and the 2026 open-competition acquisition scheme gives small teams a way in.",
        },
      },
      {
        key: "solution",
        body: {
          ko: "클라우드 없이, 현장에서, 2분 안에 — Capture · Process · Deploy 세 단계의 파이프라인을 설계했습니다.",
          en: "No cloud, in the field, within two minutes — we designed a three-stage capture · process · deploy pipeline.",
        },
        bullets: {
          ko: [
            "드론 영상 입력 → 중복 · 블러 프레임 제거 → GPS · RTK · IMU 좌표 정합",
            "NeRF / 3D Gaussian Splatting으로 3D 재구성",
            "군 폐쇄망(온프레미스)에서 태블릿 · 독립 장비로 자유 시점 탐색 — 진입로 · 사각지대 · 엄폐물 확인",
            "ATAK / WinTAK을 대체하지 않고 3D 공간 레이어로 연동",
          ],
          en: [
            "Drone video in → drop duplicate and blurry frames → fuse GPS, RTK, and IMU for registration",
            "3D reconstruction with NeRF / 3D Gaussian Splatting",
            "Free-viewpoint exploration on tablets or standalone devices inside closed military networks (on-premise) — checking approaches, blind spots, and cover",
            "Integrates with ATAK / WinTAK as a 3D layer instead of replacing them",
          ],
        },
      },
      {
        key: "role",
        body: {
          ko: "공군 정보통신학교 조교로 지내며 본 군 교육의 한계를 문제로 정의하고, 군 작전 환경 분석 · 현장 적용성 검토 · 파일럿 프로젝트 설계와 사업 기획 · 시장 검증 · 발표를 맡았습니다.",
          en: "Drawing on what I saw as an assistant instructor at the Air Force Information & Communications School, I defined the problem and owned the operational-environment analysis, field-applicability review, pilot design, business planning, market validation, and the pitch.",
        },
      },
      {
        key: "product",
        body: {
          ko: "제한된 실내 환경을 기준으로 영상 입력부터 3D 탐색까지의 end-to-end 워크플로를 팀이 직접 구현하고 테스트했습니다.",
          en: "The team built and tested the end-to-end workflow — from video input to 3D exploration — in a controlled indoor environment.",
        },
      },
      {
        key: "result",
        body: {
          ko: "2026 공군 창업경진대회 본선에 진출했습니다. 이후 전략은 건설 · 재난 디지털트윈 같은 민간 시장에서 먼저 레퍼런스를 만들고 군으로 확산하는 듀얼 유스 경로입니다.",
          en: "We reached the finals of the 2026 ROK Air Force Startup Competition. The plan from here is dual-use: build references first in civilian markets like construction and disaster digital twins, then expand into the military.",
        },
      },
    ],
    cover: {
      src: "/gallery/battleview-3d/slide-01.webp",
      width: 1920,
      height: 1080,
      alt: { ko: "BattleView 3D 발표자료 표지", en: "BattleView 3D deck cover" },
    },
    deck: "battleview-3d",
  },
  {
    slug: "gochiso",
    name: { ko: "고치소", en: "Gochiso" },
    tagline: {
      ko: "세입자 민원을 접수부터 수리 · 정산까지 건물주 대신 처리하는 AI 건물관리 에이전트",
      en: "An AI building-management agent that handles tenant requests for landlords — from intake to repair and settlement",
    },
    summary: {
      ko: "관리사무소가 없는 원룸 · 다가구에서 건물주가 직접 떠안는 민원 업무를 하나의 에이전트로 묶었습니다. 건물주 · 수리업자 · 세입자 37명을 인터뷰해 문제를 검증했고, 팀장으로 사업 전체를 이끌었습니다.",
      en: "In studio and multi-family buildings without a management office, landlords handle every tenant request themselves; we bundled that work into a single agent. I led the team and validated the problem through 37 interviews with landlords, contractors, and tenants.",
    },
    period: { ko: "2026", en: "2026" },
    year: 2026,
    status: "competition",
    categories: { ko: ["프롭테크", "AI 에이전트"], en: ["PropTech", "AI agent"] },
    role: {
      ko: "팀장 · 사업 총괄 — 사용자 인터뷰, 시장 검증, 서비스 구조, 비즈니스 모델, 발표자료",
      en: "Team lead · business lead — user interviews, market validation, service design, business model, pitch deck",
    },
    team: { ko: "KNU 싱크탱크 · 기획 3인 + 개발 3인", en: "KNU Think Tank · 3 planners + 3 engineers" },
    stack: ["Multimodal VLM", "RAG", "LLM API"],
    metrics: [
      { value: { ko: "37명", en: "37" }, label: { ko: "인터뷰 (건물주 · 수리업자 · 세입자)", en: "Interviews (landlords, contractors, tenants)" } },
      { value: { ko: "약 4배", en: "~4×" }, label: { ko: "임대차분쟁조정 접수 증가 (2023→2025)", en: "Rise in rental-dispute mediation filings (2023→2025)" } },
      { value: { ko: "120호실", en: "120" }, label: { ko: "PoC 테스트베드 확보", en: "Rental units secured as a PoC test bed" } },
    ],
    story: [
      {
        key: "problem",
        body: {
          ko: "누가 고치고 누가 비용을 낼지를 두고 임대인과 세입자 사이의 분쟁이 늘고 있습니다. 임대차분쟁조정 접수는 2023년 63건에서 2025년 238건으로 2년 새 약 4배가 됐습니다. 관리사무소가 없는 건물에서는 연락 → 상황 확인 → 수리 판단 → 업체 탐색 → 견적 → 일정 조율 → 수리 → 검수 · 정산을 건물주가 전부 직접 합니다.",
          en: "Disputes between landlords and tenants over who fixes what — and who pays — are rising: rental-dispute mediation filings grew from 63 in 2023 to 238 in 2025, nearly 4× in two years. In buildings without a management office, the landlord personally handles every step: contact → assessment → repair decision → finding a contractor → quote → scheduling → repair → inspection and settlement.",
        },
      },
      {
        key: "insight",
        body: {
          ko: "건물주 12명 · 수리업자 5명 · 세입자 20명을 인터뷰해 보니 핵심은 '책임 범위를 모른다'는 것이었습니다. 건물주는 민원 1건에 12시간 넘게 쓰고, 해결까지는 평균 14일 넘게 걸렸습니다(인터뷰 응답 평균). 기존 서비스는 접수 · 판단 · 업체 배정 · 정산 중 일부만 다뤄 과정이 쪼개져 있었습니다.",
          en: "Interviews with 12 landlords, 5 contractors, and 20 tenants pointed to one core issue: nobody knows where responsibility lies. Landlords spent 12+ hours per request, and a request took 14+ days on average to resolve (interview average). Existing services covered only parts of intake, judgment, dispatch, and settlement, leaving the process fragmented.",
        },
      },
      {
        key: "solution",
        body: {
          ko: "고치소 = Multimodal VLM + RAG. 하나의 에이전트가 전 과정을 잇습니다.",
          en: "Gochiso = multimodal VLM + RAG — one agent that connects the entire process.",
        },
        bullets: {
          ko: [
            "파악 — 세입자가 올린 사진과 설명으로 문제의 유형 · 위치 · 증상을 구조화",
            "판단 — 민법 제623조와 판례를 근거로 수선 의무가 누구에게 있는지 1차 안내",
            "해결 — 검증된 수리업체를 배정하고 세입자 · 업체 일정을 조율",
            "정산 — 작업 결과 확인 후 에스크로로 비용 정산",
          ],
          en: [
            "Understand — structure the issue type, location, and symptoms from the tenant's photos and description",
            "Judge — give a first-pass answer on who owes the repair, grounded in Article 623 of the Civil Act and case law",
            "Resolve — dispatch a vetted contractor and coordinate the tenant's and contractor's schedules",
            "Settle — confirm the work, then settle the cost through escrow",
          ],
        },
      },
      {
        key: "role",
        body: {
          ko: "팀장이자 사업 총괄로 사용자 인터뷰 설계 · 진행, 시장 검증, 서비스 구조, 비즈니스 모델(건물 관리 구독 + 수리 거래 수수료), 발표자료 설계를 맡았습니다.",
          en: "As team lead and business lead, I designed and ran the user interviews and owned market validation, service structure, the business model (building-management subscription + repair transaction fee), and the deck design.",
        },
      },
      {
        key: "result",
        body: {
          ko: "MVP 시연까지 마쳤고, 대구 북구의 수리업체와 협업하며 원룸 120호실을 PoC 테스트베드로 확보했습니다.",
          en: "We completed an MVP demo, secured a partnership with a repair company in Buk-gu, Daegu, and lined up 120 studio units as a PoC test bed.",
        },
      },
    ],
    cover: {
      src: "/gallery/gochiso/slide-01.webp",
      width: 1920,
      height: 1080,
      alt: { ko: "고치소 발표자료 표지", en: "Gochiso deck cover" },
    },
    deck: "gochiso",
  },
  {
    slug: "seomun12",
    name: { ko: "서문12", en: "Seomun12" },
    tagline: {
      ko: "QR 하나로 대구 서문시장 가게의 4개 국어 메뉴판 · 결제 안내 · 시장 안 길찾기를 여는 웹 서비스",
      en: "One QR scan opens a Seomun Market store's menu in four languages, a payment guide, and in-market walking directions",
    },
    summary: {
      ko: "서문시장 상인회와 협업한 학생 프로젝트입니다. 가게마다 붙인 QR로 한 · 영 · 중 · 일 메뉴판과 결제 방법, 가게 이야기, 시장 골목 길찾기를 보여 주는 모바일 웹을 처음부터 끝까지 개발했습니다.",
      en: "A student project in collaboration with the Seomun Market merchants' association. I built, end to end, a mobile web service where each stall's QR code opens its menu in Korean, English, Chinese, and Japanese, how to pay, the store's story, and directions through the market's alleys.",
    },
    period: { ko: "2025.03 – 2025.06", en: "Mar – Jun 2025" },
    year: 2025,
    status: "shipped",
    categories: { ko: ["로컬 · 전통시장", "지도 · 길찾기", "웹"], en: ["Local market", "Maps & routing", "Web"] },
    role: { ko: "기획 · 풀스택 개발 · 배포", en: "Planning, full-stack development, deployment" },
    team: { ko: "학생팀 × 서문시장 상인회", en: "Student team × Seomun Market merchants' association" },
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS 4", "MongoDB", "NextAuth", "Kakao Login", "NAVER Maps", "Docker", "Nginx"],
    metrics: [
      { value: { ko: "4개 국어", en: "4" }, label: { ko: "한 · 영 · 중 · 일", en: "Languages (KO · EN · ZH · JA)" } },
      { value: { ko: "85개", en: "85" }, label: { ko: "API 라우트", en: "API routes" } },
      { value: "416", label: { ko: "커밋 (2025.03–06)", en: "Commits (Mar–Jun 2025)" } },
    ],
    story: [
      {
        key: "problem",
        body: {
          ko: "서문시장에는 오래된 맛집과 이야기가 많지만, 방문객, 특히 외국인은 메뉴를 읽기 어렵고, 현금 · 계좌이체만 받는 가게에서 결제가 막히며, 미로 같은 시장 안에서 가게를 찾기 힘듭니다. 일반 지도 앱의 길찾기는 시장 내부 골목을 다루지 못했습니다.",
          en: "Seomun Market is full of long-standing food stalls and their stories, but visitors — especially from abroad — struggle to read menus, get stuck paying at cash- or transfer-only stalls, and have trouble finding stores inside the maze-like market. General map apps don't route through the market's inner alleys.",
        },
      },
      {
        key: "solution",
        body: {
          ko: "가게마다 QR을 두고, 스캔하면 그 가게의 모든 정보가 내 언어로 열리게 했습니다.",
          en: "Each store gets a QR code; scanning it opens everything about that store in the visitor's language.",
        },
        bullets: {
          ko: [
            "한 · 영 · 중 · 일 4개 국어 메뉴판, 영업시간, 가게 인터뷰 이야기",
            "결제 안내 — 계좌번호 복사, 토스 앱 바로 열기, '현금만 가능' 표시",
            "시장 안 도보 길찾기 — 직접 그린 골목 그래프에서 다익스트라 최단 경로, 시장 밖은 NAVER Directions로 전환",
            "경로를 30m 이상 벗어나면 자동 재탐색, Catmull-Rom 곡선 · Douglas-Peucker 단순화로 부드러운 경로 표시",
            "QR 스캔 → 방문 전환을 추적하는 관리자 대시보드",
          ],
          en: [
            "Menus in four languages, business hours, and interview stories about each store",
            "Payment help — copy the account number, open Toss in one tap, and see a clear 'cash only' notice where it applies",
            "In-market walking directions — Dijkstra shortest paths on a hand-mapped alley graph, switching to NAVER Directions outside the market",
            "Automatic re-routing when you drift 30 m+ off the route, with Catmull-Rom curves and Douglas-Peucker simplification for smooth paths",
            "An admin dashboard tracking QR scans through to visits",
          ],
        },
      },
      {
        key: "role",
        body: {
          ko: "서비스 기획과 개발 전체를 맡았습니다 — 카카오 로그인(카카오 디벨로퍼스 JS SDK · 서버 토큰 교환 · 연결 해제 웹훅)과 Google 로그인, 골목 그래프를 찍는 매핑 도구, 경로 탐색(A*에서 다익스트라로 전환하며 횡단보도 · 계단 · 엘리베이터 비용 반영), 상인용 가게 편집, 네이버 SEO, Docker · Nginx · HTTPS 자체 배포까지.",
          en: "I owned the planning and all of the development — Kakao Login (Kakao Developers JS SDK, server-side token exchange, unlink webhook) and Google login, a mapping tool for drawing the alley graph, routing (moving from A* to Dijkstra with costs for crosswalks, stairs, and elevators), store editing for merchants, Naver SEO, and self-hosted deployment with Docker, Nginx, and HTTPS.",
        },
      },
      {
        key: "result",
        body: {
          ko: "석 달 동안 416개 커밋, 85개 API 라우트 규모의 서비스로 만들어 seomun12.com 도메인으로 배포했습니다.",
          en: "Over three months and 416 commits, it grew into a service with 85 API routes, deployed on the seomun12.com domain.",
        },
      },
    ],
    art: "market",
  },
  {
    slug: "omokjomok",
    name: { ko: "오목조목", en: "OmokJomok" },
    tagline: {
      ko: "초대 링크 하나로 친구와 바로 두는 실시간 온라인 오목",
      en: "Real-time online Omok (Gomoku) — play a friend instantly with one invite link",
    },
    summary: {
      ko: "Socket.IO 실시간 대전, Elo 레이팅 빠른 매칭, 로그인 없이 들어오는 친구 초대, 10단계 알파베타 AI까지 — 모바일과 데스크톱에서 두는 오목 서비스를 혼자 만들었습니다.",
      en: "Real-time Socket.IO matches, Elo-rated quick match, friend invites that work without an account, and a 10-tier alpha-beta AI — a solo-built Omok service for mobile and desktop.",
    },
    period: { ko: "2025.01 – 2025.03", en: "Jan – Mar 2025" },
    year: 2025,
    status: "shipped",
    categories: { ko: ["게임", "실시간 웹"], en: ["Game", "Real-time web"] },
    role: { ko: "1인 개발 — 서버 · AI 엔진 · 웹 클라이언트", en: "Solo developer — server, AI engine, web client" },
    stack: ["React 18", "Node.js", "Express", "Socket.IO", "MongoDB", "JWT", "Google OAuth", "Tailwind CSS"],
    metrics: [
      { value: "193", label: { ko: "커밋 (6주)", en: "Commits in 6 weeks" } },
      { value: { ko: "10단계", en: "10" }, label: { ko: "AI 난이도", en: "AI difficulty tiers" } },
      { value: "15×15", label: { ko: "판 · 삼삼 금수 판정", en: "Board with the double-three rule" } },
    ],
    story: [
      {
        key: "problem",
        body: {
          ko: "휴대폰이든 PC든 오목을 바로 두고 싶을 때 — 친구와, 비슷한 실력의 낯선 상대와, 혹은 혼자 연습으로 — 가입과 설치가 장벽이 되지 않아야 했습니다.",
          en: "Whether on a phone or a PC, playing Omok right away — with a friend, a stranger of similar skill, or solo practice — shouldn't be blocked by sign-ups and installs.",
        },
      },
      {
        key: "solution",
        body: {
          ko: "서버가 판을 쥐는(server-authoritative) 실시간 오목을 만들었습니다.",
          en: "I built a server-authoritative real-time Omok game.",
        },
        bullets: {
          ko: [
            "Socket.IO 방 · 비밀번호 방, 서버 시계(1 · 3 · 5 · 10분), 흑 삼삼 금수 · 5목 판정을 서버에서 검증",
            "Elo 레이팅(초기 400, 신규 K=48) + 같은 시간 규칙 · 레이팅 차 100 이내 빠른 매칭",
            "초대 링크로 들어온 친구는 로그인 없이 게스트로 바로 대국",
            "알파베타 탐색 · 반복 심화 · 조브리스트 트랜스포지션 테이블 기반 10단계 AI, 캐릭터 봇 · 힌트 · 무르기",
            "기보 저장과 복기, 랭킹, 시즌 패스 · 바둑판/돌 꾸미기",
          ],
          en: [
            "Socket.IO rooms (optionally password-protected), a server clock (1 · 3 · 5 · 10 min), and server-side checks for black's double-three rule and five-in-a-row",
            "Elo rating (start 400, K=48 for new players) plus quick match within the same time control and a rating gap of 100",
            "Friends who open an invite link play immediately as guests, no login needed",
            "A 10-tier AI built on alpha-beta search, iterative deepening, and a Zobrist transposition table — with character bots, hints, and undo",
            "Game records with replay, rankings, and a season pass with board and stone cosmetics",
          ],
        },
      },
      {
        key: "role",
        body: {
          ko: "서버 · AI 엔진 · 웹 클라이언트를 혼자 개발했습니다. 2,012줄짜리 단일 서버 파일을 config · controllers · models · services로 나누는 리팩터링을 했고, AI 엔진을 클라이언트에서 서버로 옮기며 비트보드 · C++/WASM 구현도 실험했습니다.",
          en: "I built the server, AI engine, and web client alone. I refactored a 2,012-line single server file into config, controllers, models, and services, and moved the AI engine from the client to the server, experimenting with bitboard and C++/WASM versions along the way.",
        },
      },
      {
        key: "product",
        body: {
          ko: "데스크톱과 모바일 화면을 따로 설계했습니다 — 모바일은 스와이프 탭, 핀치 · 레버 확대, 이모지 채팅, 효과음과 승리 연출까지. 운영을 위해 일일 지표(신규 · DAU · 동시 접속 · 대국 수)를 매일 자정에 메일로 받는 리포트도 붙였습니다.",
          en: "Desktop and mobile got separate designs — the mobile UI has swipe tabs, pinch and lever zoom, emoji chat, sound effects, and a win animation. For operations, a daily report emails new users, DAU, peak concurrency, and game counts every night at midnight (KST).",
        },
      },
      {
        key: "result",
        body: {
          ko: "2025년 1월부터 6주 동안 193개 커밋으로 AI 엔진 고도화, Elo 랭킹, 친구 초대 대전, 모바일 화면, 서버 모듈화를 더해 서비스를 완성했고, 검색 노출을 위해 Next.js 15로 옮기는 작업을 시작했습니다.",
          en: "Over six weeks from January 2025, 193 commits added a stronger AI engine, Elo rankings, friend-invite matches, a mobile UI, and a modular server, rounding it into a full service — then I began migrating it to Next.js 15 for search visibility.",
        },
      },
    ],
    art: "omok",
  },
  {
    slug: "finquest",
    name: { ko: "FinQuest", en: "FinQuest" },
    tagline: {
      ko: "투자를 처음 배우는 사람을 위한 게임형 투자 교육 플랫폼",
      en: "A game-style investing education platform for first-time investors",
    },
    summary: {
      ko: "투자 지식을 읽기만 하는 교육이 아니라, 성향과 이해도를 진단하고 실제 과제(Quest)를 수행하며 배우도록 설계했습니다. 기획부터 서비스 구조 · 데이터베이스 · 웹 개발까지 직접 진행하고 있습니다.",
      en: "Rather than having people just read about investing, it diagnoses their style and understanding and has them learn by completing real tasks (quests). I'm handling everything from planning and service structure to the database and web development.",
    },
    status: "building",
    categories: { ko: ["에듀테크", "핀테크", "AI"], en: ["EdTech", "FinTech", "AI"] },
    role: { ko: "기획 · 서비스 구조 · DB · 웹 개발", en: "Planning, service architecture, database, web development" },
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Drizzle", "Supabase", "AI API"],
    story: [
      {
        key: "problem",
        body: {
          ko: "투자를 처음 배우는 사람에게 필요한 건 더 많은 읽을거리가 아니라, 자기 성향을 알고 직접 해 보며 이해하는 경험입니다.",
          en: "First-time investors don't need more to read — they need to understand their own tendencies and learn by actually doing.",
        },
      },
      {
        key: "solution",
        body: {
          ko: "진단에서 시작해 퀘스트로 끝나는 학습 흐름을 설계했습니다.",
          en: "I designed a learning flow that starts with a diagnosis and ends with quests.",
        },
        bullets: {
          ko: ["투자 성향 · 이해도 진단", "0~6강 투자 교육과 퀴즈", "투자 퀘스트 수행 → 루브릭 기반 평가", "AI 최종 진단 → 16가지 투자 유형 분석"],
          en: ["Diagnosis of investing style and understanding", "Lessons 0–6 with quizzes", "Investing quests → rubric-based evaluation", "Final AI diagnosis → one of 16 investor types"],
        },
      },
      {
        key: "role",
        body: {
          ko: "기획부터 서비스 구조, 데이터베이스 설계, 웹 개발까지 직접 진행하고 있습니다.",
          en: "I'm doing it all myself — from planning to service architecture, database design, and web development.",
        },
      },
    ],
    art: "quest",
  },
  {
    slug: "momotrip",
    name: { ko: "모모트립", en: "MomoTrip" },
    tagline: {
      ko: "1인 여행자를 위한 자동 여행 코스 설계 서비스",
      en: "Automatic itinerary planning for solo travelers",
    },
    summary: {
      ko: "원하는 지역과 조건을 넣으면 일정과 이동 동선을 자동으로 짜 주는 여행 서비스를, 수익 모델까지 포함한 사업계획으로 설계했습니다.",
      en: "A travel service that builds the schedule and route automatically from your destination and preferences — designed as a full business plan, revenue model included.",
    },
    status: "concept",
    categories: { ko: ["여행", "사업계획"], en: ["Travel", "Business plan"] },
    role: { ko: "서비스 기획 · 사업계획", en: "Service planning · business plan" },
    story: [
      {
        key: "problem",
        body: {
          ko: "혼자 떠나는 여행자는 일정과 동선, 이동 시간과 비용을 모두 직접 짜야 합니다.",
          en: "Solo travelers have to work out the schedule, route, travel times, and costs entirely on their own.",
        },
      },
      {
        key: "solution",
        body: {
          ko: "조건만 넣으면 코스가 완성되는 구조를 제안했습니다.",
          en: "The plan proposes a service where entering your conditions produces a finished itinerary.",
        },
        bullets: {
          ko: ["직관적인 여행 코스 생성 UI", "A* 기반 이동 경로 탐색", "이동 시간 · 여행 비용 자동 계산", "국내 → 일본 → 동남아로 넓히는 확장 구조"],
          en: ["An intuitive itinerary-builder UI", "A*-based route search", "Automatic travel-time and cost estimates", "An expansion path: Korea → Japan → Southeast Asia"],
        },
      },
      {
        key: "result",
        body: {
          ko: "예약 수수료 · 광고 · 구독 · 데이터 API로 이어지는 비즈니스 모델과 시장 분석, 사업화 전략을 담은 사업계획 발표를 만들었습니다.",
          en: "The result was a business-plan pitch covering the revenue model (booking fees, ads, subscriptions, a data API), market analysis, and go-to-market strategy.",
        },
      },
    ],
    art: "route",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
