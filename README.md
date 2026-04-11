# Bella Korea Clinic — 2026 Ambassador Recruitment

한국 거주 일본인을 위한 Bella Korea Clinic 2026 공식 앰배서더 모집 랜딩 페이지와 지원서 수집 백엔드.

## 구조

```
/frontend   Next.js 15 (App Router) + Tailwind v4 + shadcn/ui + react-hook-form + zod
/backend    FastAPI + SQLModel + SQLite (+ optional SMTP notification)
```

## Frontend

```bash
cd frontend
cp .env.example .env.local        # NEXT_PUBLIC_API_URL 설정
npm install
npm run dev                        # http://localhost:3000
```

주요 환경변수 (`frontend/.env.local`):

| 변수 | 설명 |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | FastAPI 백엔드 base URL (예: `http://localhost:8000`) |
| `NEXT_PUBLIC_LINE_URL` | (선택) LINE 공식 계정 링크 |

## Backend

```bash
cd backend
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate

pip install -r requirements.txt
cp .env.example .env               # CORS, SMTP 등 필요 시 설정
uvicorn app.main:app --reload      # http://localhost:8000
```

OpenAPI 문서: <http://localhost:8000/docs>

주요 환경변수 (`backend/.env`):

| 변수 | 설명 |
| --- | --- |
| `DATABASE_URL` | 기본값 `sqlite:///./bella.db` |
| `CORS_ORIGINS` | 쉼표로 구분된 허용 오리진 |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASSWORD` | 알림 메일용 SMTP (전부 설정되어야 메일 발송) |
| `SMTP_USE_TLS` | 기본 `true` |
| `MAIL_FROM` / `MAIL_TO` | 발신/수신 이메일 주소 |

SMTP 설정이 비어있으면 메일은 자동으로 비활성화되고, 지원서는 DB에만 저장됩니다.

## API

### `POST /api/applications`

요청 예시:

```json
{
  "name": "山田 花子",
  "sns_handle": "@hanako",
  "reason": "美容と自己管理に関心が高く、...",
  "language": "JP"
}
```

응답 (201):

```json
{
  "id": 1,
  "name": "山田 花子",
  "sns_handle": "@hanako",
  "language": "JP",
  "created_at": "2026-04-11T12:34:56+00:00"
}
```

- `reason` 필드는 응답에서 제외됩니다 (개인정보 최소 노출).
- 제출 즉시 `MAIL_TO` 주소로 백그라운드 알림 메일이 발송됩니다 (SMTP 설정 시).
