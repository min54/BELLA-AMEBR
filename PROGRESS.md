# Bella Korea Clinic 2026 Ambassador — 작업 진행 상황

> 대화 재개용 단일 진실 문서. 다음 세션에서 이 파일을 읽고 바로 이어가면 됩니다.

---

## 프로젝트 개요

- **목적**: 한국 거주 일본인 대상 Bella Korea Clinic 2026 공식 앰배서더 모집 (KR/JP 이중 언어 랜딩 페이지 + 지원서 접수 백엔드)
- **클리닉 포지셔닝**: 홍대 위치, 해외 인플루언서 인기, 원장 직접 일본어 진료
- **Git 저장소**: <https://github.com/min54/BELLA-AMEBR> (private)
- **Local path**: `C:\Users\gram\Desktop\bella-korea-clinic-ambassador-recruitment`

## 기술 스택

### Frontend (`/frontend`)
- Next.js 15 (App Router) + React 19 + TypeScript strict
- Tailwind CSS v4 + shadcn/ui 프리미티브 (Button/Input/Textarea/Label)
- `react-hook-form` + `zod` 유효성 검사, `sonner` 토스트
- `motion` (Framer Motion 후속) 애니메이션, `lucide-react` 아이콘
- 컴포넌트 분리: Hero / TrustCallout / BenefitsRequirements / Gallery / FAQ / ApplyForm / LineCta / SiteFooter
- 언어 토글: React Context (`LanguageProvider`), 기본 언어 JP

### Backend (`/backend`)
- FastAPI + SQLModel + SQLite (ephemeral — 재배포 시 데이터 초기화)
- pydantic-settings 기반 환경변수 로딩
- POST `/api/applications` — zod 스키마와 1:1로 매핑되는 Pydantic `ApplicationCreate`
- GET `/health` — 헬스체크
- CORS 허용 오리진: `CORS_ORIGINS` env (쉼표 구분)
- **이중 모드 메일러**: `RESEND_API_KEY`가 있으면 Resend HTTP API, 없으면 Gmail SMTP로 폴백
  - `app/mailer.py`의 `send_application_notification()`이 dispatch
  - 둘 다 BackgroundTask에서 best-effort로 실행 (에러는 로그만 남고 요청은 201 성공)

## 배포 현황

| 서비스 | 플랫폼 | 상태 | URL |
|---|---|---|---|
| Frontend | Netlify | ✅ 배포됨 | <https://funny-lebkuchen-57b10a.netlify.app> |
| Backend  | Render (free) | ✅ 배포됨 | <https://bella-amebr-backend.onrender.com> |
| Git repo | GitHub | ✅ push됨 | <https://github.com/min54/BELLA-AMEBR> |

### Netlify 설정
- Base directory: `frontend`
- Build: `npm run build` (auto)
- `netlify.toml`이 `@netlify/plugin-nextjs` 명시, `publish` 미지정 (플러그인이 관리)
- **env var**: `NEXT_PUBLIC_API_URL = http://localhost:8000` ⚠️ **아직 교체 필요**
  - 교체 목표값: `https://bella-amebr-backend.onrender.com`

### Render 설정
- Blueprint 기반 (`render.yaml` 루트에서 감지)
- Service name: `bella-amebr-backend`, region: Singapore, plan: Free
- Root directory: `backend`
- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Python 런타임: `runtime.txt`에 `python-3.12.7` 명시했지만 Render는 실제로 3.14.3 사용 중 (버전 힌트 무시됨 — 코드는 3.12/3.13/3.14 모두 호환)
- Health check: `/health`
- **⚠️ 중요 이슈**: Render 무료 티어는 outbound SMTP (포트 25/465/587) 차단. Gmail SMTP 경로는 production에서 `_get_socket()` 실패로 작동 불가 — Resend HTTP API로 전환 필요

### Resend 설정
- 기존 계정: `kataroteno` workspace (작성자 `kataroteno@gmail.com`)
- **검증된 도메인**: `renovoh.net` (Tokyo region, 16일 전 등록) ✅
- 기존 API 키: `bella` (Full access, 23일 전 생성, re_MQxosQnk... 로 시작) — **값은 재확인 불가** (Resend가 생성 직후만 전체값 노출)

## 지금까지 커밋 히스토리 (main 브랜치)

1. `3d2b838` Initial commit
2. `17de5d3` Add netlify.toml for frontend deployment
3. `7202a26` Fix Netlify deploy: let @netlify/plugin-nextjs manage publish dir
4. `967f7cc` Add Railway deployment config for backend (Railway trial 만료로 결국 미사용)
5. `7f04a4f` Switch backend deploy target to Render (free tier)
6. `a13171a` Set metadataBase to Netlify site URL for proper OG rendering
7. `7bd479b` Add Resend HTTP email path (dual-mode mailer)
8. `c2ee9c5` Use no-reply@renovoh.net as Resend sender

## 완료된 작업

### 프로토타입 버그 수정
- [x] JP FAQ에 한국어 조사 혼입 수정 (`韓国語가 서툰데` → `韓国語が苦手ですが大丈夫ですか？` 등)
- [x] 자격요건 "비자 종류 불문" JP 정상화
- [x] FAQ의 "한국어 서툰데 괜찮나요?" 답변을 "일본어 전담 코디네이터"에서 **"원장 직접 일본어 상담"**으로 교체 (강점 부각)
- [x] 지원 자격에 "기본 한국어 커뮤니케이션 가능" 조항 추가

### UI / 컨텐츠 변경
- [x] Hero의 Sparkles 로고 카드 삭제 ("제미나이 로고 티" 제거)
- [x] Trust Callout 디자인 교체: 박스/아이콘/앰버 악센트 삭제 → 얇은 수평선 + uppercase kicker + 타이포그래피 중심 에디토리얼 스타일
- [x] Trust slot 왼쪽 내용 교체: "보건복지부 등록" → "홍대 위치 / 해외 인플루언서 인기" (`HONGDAE, SEOUL` kicker)
- [x] 혜택 카드 하단 "자세한 혜택 내역은 개별 문의" 문구 추가
- [x] 푸터 Instagram / 웹사이트(renovoh.net) / 위치(테헤란로 123 더미) 링크 연결

### 백엔드 / 인프라
- [x] Next.js metadataBase 설정 (`NEXT_PUBLIC_SITE_URL` 환경변수, fallback은 Netlify URL)
- [x] 이중 모드 메일러 (`app/mailer.py`) — Resend 우선, SMTP fallback
- [x] Gmail SMTP 앱 비밀번호 **로컬 개발 환경**에서 실제 발송 테스트 완료
- [x] Render 배포 시 Gmail SMTP **실패 확인** (Render 차단) → Resend로 전환 결정
- [x] `render.yaml`에서 SMTP_* envVars 제거, `RESEND_FROM=Bella Korea Ambassador <no-reply@renovoh.net>` 설정
- [x] `RESEND_API_KEY`는 `sync: false`로 선언 (dashboard에서 수동 입력)

### 미뤄둔 항목 (프로토타입 dummy 유지)
- [ ] LINE 공식 계정 URL (계정 아직 생성 전) — 현재 CTA 버튼은 `#`로 빈 링크
- [ ] Hero 대표 이미지 (Unsplash placeholder 유지)
- [ ] Gallery 3장 (Unsplash placeholder 유지)
- [ ] 클리닉 주소 (테헤란로 123 더미 유지)
- [ ] 관리자 수신 이메일 2번째 주소 추가 예정 (`MAIL_TO`는 쉼표 구분 다중 수신 지원)

---

## 🔴 RESUME HERE — 다음에 이어서 할 작업

다음 세션에서 가장 먼저 처리할 것:

### Step 1: Resend API 키 확보

**방법 A (권장 — 새 키 생성, 30초)**:
1. <https://resend.com/api-keys> 접속
2. `+ Create API Key` 클릭
3. Name: `bella-amebr` / Permission: `Sending access` / Domain: `All domains` or `renovoh.net`
4. **생성 직후 표시되는 `re_...` 전체 문자열을 즉시 복사** (창 닫으면 영구 손실)
5. 메모장/1Password 등에 백업 저장

**방법 B (기존 `bella` 키 재사용)**: 벨아미리노보 프로젝트 `.env`나 Vercel/Render 환경변수에서 `RESEND_API_KEY` 값을 찾아 복사.

### Step 2: Render에 `RESEND_API_KEY` 주입

1. <https://dashboard.render.com> → `bella-amebr-backend` → **Environment** 탭
2. 페이지 하단 환경변수 리스트에서 **`+ Add Environment Variable`** 클릭 (빈 `NAME_OF_VARIABLE` 행에 입력해도 동일)
3. Key: `RESEND_API_KEY`
4. Value: Step 1에서 복사한 `re_...` 문자열 (공백/따옴표 없이)
5. **`Save, rebuild, and deploy`** 클릭
6. 재배포 대기 (2~3분)
7. 로그에서 `Sent application notification via Resend for id=...` 확인

### Step 3: 옛 SMTP 환경변수 정리 (선택)

코드가 Resend 우선이라 SMTP_* 변수가 남아있어도 작동에는 영향 없지만, 정리 차원에서:
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_PASSWORD`, `SMTP_USE_TLS`, `SMTP_USER`, `MAIL_FROM` 각각 옆의 🗑 휴지통 아이콘 클릭 → Save

### Step 4: Netlify 환경변수 업데이트

1. <https://app.netlify.com> → `funny-lebkuchen-57b10a` 사이트 → **Site configuration** → **Environment variables**
2. `NEXT_PUBLIC_API_URL` 편집 → 값을 `https://bella-amebr-backend.onrender.com`으로 교체
3. **Deploys** 탭 → **Trigger deploy** → **Deploy site**
4. 재배포 대기 (2~3분)

### Step 5: End-to-end 검증

1. <https://funny-lebkuchen-57b10a.netlify.app> 접속
2. JP/KR 토글 동작 확인
3. 지원 폼 작성:
   - 성함, SNS 핸들, 지원동기 (10자 이상)
4. **"응募フォームを送信する"** 클릭
5. 성공 토스트 `ご応募を受け付けました` / `지원이 접수되었습니다` 확인
6. `kataroteno@gmail.com` 받은편지함 확인 — `[Bella Korea] New Ambassador Application #N (JP)` 도착 (1분 이내)
7. 발신자가 `Bella Korea Ambassador <no-reply@renovoh.net>`로 표시되는지 확인

### Step 6: 디버깅 진입점 (문제 발생 시)

| 증상 | 확인 위치 |
|---|---|
| 폼 제출 시 브라우저에 에러 | 브라우저 DevTools → Network 탭 → POST `/api/applications` 응답 |
| 201 성공인데 메일 안 옴 | Render 서비스 → Logs 탭 → 검색 `mailer` 또는 `Sent application` |
| CORS 에러 | Render `CORS_ORIGINS` 환경변수에 Netlify 도메인 포함 확인 |
| 500 에러 | Render Logs에서 스택 트레이스 확인 |
| Resend 인증 실패 | Resend dashboard → Logs 탭에서 401/403 확인, 키 재발급 |

---

## 남은 백로그 (end-to-end 작동 확인 이후 고려)

1. **LINE 공식 계정 URL** — 계정 생성되면 `frontend/.env.local`의 `NEXT_PUBLIC_LINE_URL`에 주입
2. **실제 Hero / Gallery 이미지** — `frontend/public/` 아래 파일 배치 후 컴포넌트 `src` 교체
3. **실제 클리닉 주소** — `frontend/components/site-footer.tsx`의 `ADDRESS_LABEL` 상수 교체
4. **SQLite → 영속 저장소**: 재배포 시 지원자 데이터 손실 문제 해결
   - Option A: Render에 Volume 추가하고 `DATABASE_URL=sqlite:////data/bella.db`
   - Option B: Postgres로 마이그레이션 (Render Postgres Free Tier 또는 Supabase Free Tier)
5. **관리자 수신 이메일 2번째 추가** — `MAIL_TO`에 쉼표 구분으로 append (예: `kataroteno@gmail.com,second@foo.com`)
6. **OG 이미지 / favicon** — `frontend/public/og-image.png`, `favicon.ico` 추가 후 `layout.tsx` metadata에 연결
7. **Real Netlify 도메인** — Netlify 기본 `funny-lebkuchen-57b10a.netlify.app` 대신 커스텀 이름/도메인으로 변경 시 `metadataBase`와 `CORS_ORIGINS` 업데이트
8. **관리자 페이지 (나중에)** — 지원자 목록 조회/상태 변경 UI

## 작업 룰 (중요)

- 한국어로 대답
- "한 단계씩 알려줘" 요청 패턴 — 사용자가 대시보드 UI 따라가는 중에는 단계마다 실행 결과 확인 후 다음 단계
- 일부 요소(LINE, Hero, Gallery)는 "나중에" / "더미 유지"로 의식적으로 미룸 — 재촉하지 말 것
- 비밀정보(.env, API 키, SMTP 암호)는 절대 git에 커밋 금지. `render.yaml`/`netlify.toml` 등 config 파일엔 `sync: false`로만 선언하고 값은 dashboard에서만 입력
- 파일 편집은 TS는 strict 통과, Python은 타입 힌트 엄격, 인라인 style 금지, Tailwind 사용
