# 강해 포트폴리오 · Kang Hea Portfolio

프로필 · 수상 · 프로젝트 · 발표자료 갤러리를 한국어/영어로 보여 주는 개인 포트폴리오 사이트.
Next.js 16(App Router) 정적 사이트 — 서버 코드·데이터베이스 없이 Vercel 에 배포한다.

디자인은 [중개사코치](https://junggaesacoach.vercel.app/promotion)에서 가져왔다. 기본 화면은 랜딩의
블랙·골드, 밝은 화면은 앱 라이트 테마, 갤러리는 테마와 상관없이 늘 어두운 전시장이다.

## 실행

```bash
npm install
npm run dev      # http://localhost:3000 → 브라우저 언어에 맞춰 /ko 또는 /en
npm run build    # 정적 페이지 생성 + 타입 검사
npm run lint
```

## 구조

| 경로 | 내용 |
|---|---|
| `src/content/profile.ts` | 이름 · 소개 · 소속 · 관심 분야 · 연락처 · **수상 목록** |
| `src/content/projects.ts` | **프로젝트** — 배열 순서가 곧 노출 순서. `featured: true` 는 홈에도 나온다 |
| `src/content/gallery.ts` | **발표자료(갤러리 작품)** 정보 — 용도 · 결과 · 맡은 일 · 도록 해설 · 목차 |
| `src/content/gallery/*.deck.json` | 덱별 장수 · 공개 슬라이드 경로 · 잠금 슬라이드 베일(자동 생성) |
| `src/i18n/dictionaries.ts` | 화면 문구(한국어 · 영어) |
| `src/app/[locale]/…` | 페이지 — `/ko`, `/en` 아래 홈 · 프로필 · 프로젝트 · 갤러리 |
| `public/gallery/<slug>/` | 공개 슬라이드 이미지(기본 1~3장) |
| `scripts/import_deck.py` | PPTX → 공개 슬라이드 + 베일 데이터 |

모든 문구는 `{ ko: "...", en: "..." }` 로 두 언어를 나란히 적는다. 한쪽을 빠뜨리면 타입 검사에서 막힌다.

## 발표자료 추가하기

```bash
pip install python-pptx pillow        # 최초 1회
# LibreOffice(Impress 포함)와 poppler-utils(pdftoppm)도 필요 — 슬라이드가 전부 이미지인 덱은 없어도 된다
python3 scripts/import_deck.py ~/Downloads/덱.pptx --slug my-deck            # 1~3장 공개
python3 scripts/import_deck.py ~/Downloads/덱.pptx --slug my-deck --preview 1,2,5
```

1. 스크립트가 `public/gallery/my-deck/slide-NN.webp`(공개 장)와 `src/content/gallery/my-deck.deck.json` 을 만든다.
2. `src/content/gallery.ts` 에서 JSON 을 import 하고 `decks` 배열에 작품 정보를 더한다(`lot` 번호 · 제목 · 사용처 · 결과 · 맡은 일 · 해설 · 목차).
3. `npm run build` 로 확인한다.

**비공개 장은 저장소와 배포본에 들어가지 않는다.** 공개 장만 원본 해상도로 저장하고, 나머지는 8px 폭 색 견본(data URI)만
남겨 흐린 베일로 그린다 — 글자나 얼굴을 알아볼 수 없는 크기다. PPTX 원본은 커밋하지 않는다(`.gitignore`).
LibreOffice 로 렌더하는 덱은 덱이 쓴 글꼴이 설치돼 있어야 원본과 같게 나온다(없으면 실행 시 경고).

## 언어 · 주소

- `/` 는 화면 없이 리디렉션한다(`next.config.ts`): 직접 고른 언어(쿠키 `locale`) → 브라우저 언어 → 한국어.
- 언어 전환 버튼은 같은 페이지의 다른 언어 주소로 이동하고 선택을 쿠키에 기억한다.
- 각 페이지는 `hreflang` 대체 주소 · canonical · OG 이미지를 갖는다. `sitemap.xml` · `robots.txt` 자동 생성.

## Vercel 배포

1. Vercel 에서 이 저장소를 Import — 프레임워크는 Next.js 로 자동 인식, 설정 변경 없음.
2. (선택) 커스텀 도메인을 쓰면 환경 변수 `NEXT_PUBLIC_SITE_URL=https://도메인` 을 넣는다.
   없으면 Vercel 프로덕션 도메인(`VERCEL_PROJECT_PRODUCTION_URL`)으로 canonical · sitemap 주소를 만든다.
