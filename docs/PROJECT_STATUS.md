# Flight Crew Prep - 프로젝트 현황

> 외항사 승무원 준비 플랫폼 (지인 정보제공용)

## 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 목적 | 외국 항공사 승무원 준비생을 위한 정보 제공 |
| 대상 | 지인 (비영리) |
| 기술 스택 | Next.js 16, Supabase, OpenAI API, Tailwind CSS |
| 예상 비용 | ~$5/월 (OpenAI API) |

---

## 완료된 작업 ✅

### 1. 기획 & 분석

| 작업 | 상태 | 결과물 |
|------|------|--------|
| 시장 분석 | ✅ 완료 | `ventures/market/flight-crew-prep/flight-crew-prep-analysis.md` |
| 기술 실현가능성 검토 | ✅ 완료 | `ventures/market/flight-crew-prep/architecture/feasibility-overall.md` |
| 투자자 검증 | ✅ 완료 | `ventures/market/flight-crew-prep/flight-crew-prep-validation.md` |

### 2. 설계

| 작업 | 상태 | 결과물 |
|------|------|--------|
| 시스템 설계 | ✅ 완료 | `ventures/market/flight-crew-prep/architecture/system-design.md` |
| 데이터 모델 설계 | ✅ 완료 | `ventures/market/flight-crew-prep/architecture/data-model.md` |

### 3. 개발

| 작업 | 상태 | 설명 |
|------|------|------|
| 프로젝트 초기화 | ✅ 완료 | Next.js 16 + TypeScript + Tailwind |
| Supabase 클라이언트 | ✅ 완료 | `src/lib/supabase/` |
| OpenAI 클라이언트 | ✅ 완료 | `src/lib/openai.ts` |
| 랜딩 페이지 | ✅ 완료 | `src/app/page.tsx` |
| 기출문제 목록 | ✅ 완료 | `src/app/(main)/questions/page.tsx` |
| 기출문제 상세 | ✅ 완료 | `src/app/(main)/questions/[id]/page.tsx` |
| AI 면접 메인 | ✅ 완료 | `src/app/(main)/interview/page.tsx` |
| AI 면접 빠른 연습 | ✅ 완료 | `src/app/(main)/interview/quick/page.tsx` |
| 항공사 정보 | ✅ 완료 | `src/app/(main)/airlines/page.tsx` |
| 음성 인식 API | ✅ 완료 | `src/app/api/interview/transcribe/route.ts` |
| AI 피드백 API | ✅ 완료 | `src/app/api/interview/feedback/route.ts` |
| DB 타입 정의 | ✅ 완료 | `src/types/database.ts` |
| 빌드 테스트 | ✅ 완료 | `npm run build` 성공 |

---

## 남은 작업 📋

### 필수 (배포 전)

| 작업 | 우선순위 | 예상 시간 |
|------|----------|----------|
| Supabase 프로젝트 생성 | 🔴 High | 10분 |
| DB 마이그레이션 실행 | 🔴 High | 5분 |
| 환경변수 설정 (.env.local) | 🔴 High | 5분 |
| 시드 데이터 입력 (항공사 5개, 기출 10개) | 🔴 High | 30분 |
| Vercel 배포 | 🟡 Medium | 10분 |

### 선택 (기능 개선)

| 작업 | 우선순위 | 설명 |
|------|----------|------|
| 기출문제 카테고리 필터링 | 🟡 Medium | 클라이언트 사이드 필터 |
| 항공사별 면접 연습 | 🟡 Medium | `/interview/airline` 페이지 |
| 면접 기록 저장 | 🔵 Low | Supabase에 세션 저장 |
| 사용자 인증 | 🔵 Low | Supabase Auth |
| 기출문제 추가 폼 | 🔵 Low | Admin 기능 |

---

## 프로젝트 구조

```
flight-crew-prep/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # 랜딩 페이지
│   │   ├── (main)/
│   │   │   ├── layout.tsx              # 공통 레이아웃
│   │   │   ├── questions/              # 기출문제
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── interview/              # AI 면접
│   │   │   │   ├── page.tsx
│   │   │   │   └── quick/page.tsx
│   │   │   └── airlines/page.tsx       # 항공사 정보
│   │   └── api/interview/
│   │       ├── transcribe/route.ts     # Whisper STT
│   │       └── feedback/route.ts       # GPT 피드백
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   └── server.ts
│   │   └── openai.ts
│   └── types/
│       └── database.ts
├── docs/
│   └── PROJECT_STATUS.md               # 이 문서
└── .env.example
```

---

## 환경 설정 가이드

### 1. Supabase 설정

1. [supabase.com](https://supabase.com) 접속
2. New Project 생성
3. Settings > API에서 URL과 anon key 복사
4. SQL Editor에서 `data-model.md`의 마이그레이션 SQL 실행

### 2. 환경변수 설정

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxx...
OPENAI_API_KEY=sk-...
```

### 3. 개발 서버 실행

```bash
npm install
npm run dev
```

### 4. Vercel 배포

```bash
npx vercel
# 환경변수는 Vercel 대시보드에서 설정
```

---

## 관련 문서

| 문서 | 위치 |
|------|------|
| 시장 분석 | `ventures/market/flight-crew-prep/flight-crew-prep-analysis.md` |
| 투자자 검증 | `ventures/market/flight-crew-prep/flight-crew-prep-validation.md` |
| 시스템 설계 | `ventures/market/flight-crew-prep/architecture/system-design.md` |
| 데이터 모델 | `ventures/market/flight-crew-prep/architecture/data-model.md` |
| 기술 실현가능성 | `ventures/market/flight-crew-prep/architecture/feasibility-overall.md` |

---

*Last Updated: 2026-01-02*
