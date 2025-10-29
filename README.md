# User Registration (frontend + backend)

Short instructions to install and run this project locally (Windows PowerShell examples).

Prerequisites

- Node.js 18+ (this workspace used Node 22 in development).
- npm (bundled with Node) or a compatible package manager.

Backend (API)

1. Open a PowerShell terminal and go to the backend folder:

```powershell
Set-Location '22120216\backend'
```

2. Install dependencies and start in dev mode:

```powershell
npm install
npm run start:dev
```

The backend will listen on the port configured in the project (default: 3000) — check `.env` or `src` config if needed.

Frontend (React + Vite)

1. Open a new PowerShell terminal and go to the frontend folder:

```powershell
Set-Location '22120216\frontend'
```

2. Install dependencies and start the dev server:

```powershell
npm install
npm run dev
```

3. Open the URL printed by Vite (by default: `http://localhost:5173` or next available port).

Notes

- The frontend expects an API base URL in `VITE_API_BASE_URL` (set via environment or `.env`). By default the frontend will hit `http://localhost:3000` if not set.
- If you see PostCSS/Tailwind errors, ensure `postcss.config.cjs` and `tailwind.config.cjs` exist and required packages are installed (`tailwindcss`, `@tailwindcss/postcss`, `autoprefixer`, `postcss`).
- To build for production:

Backend:

```powershell
Set-Location '22120216\backend'
npm run build
npm run start:prod
```

Frontend:

```powershell
Set-Location '22120216\frontend'
npm run build
```

Troubleshooting

- If the dev server HMR shows module export errors ("does not provide an export named 'default'"), try restarting Vite and clearing the browser cache. Import paths that include the `.tsx` extension can help with ambiguous resolution when using TypeScript + Vite.
- If you encounter runtime errors about type-only imports (e.g. `SubmitHandler`), TypeScript should strip type-only imports; if it doesn't, ensure your TS config and tooling target a bundler-friendly module syntax or use a type alias instead of `import type`.

If you want, I can add scripts or small README sections per service (detailed env vars, DB setup). Tell me which part you'd like expanded.

## Environment variables (.env) — cấu trúc và ví dụ

Ứng dụng sử dụng các biến môi trường khác nhau cho frontend và backend. Dưới đây là cấu trúc phổ biến và ví dụ để bạn copy vào file `.env` tương ứng (không commit file `.env` có secret lên Git).

1) Backend (`backend/.env`)

Ví dụ (`backend/.env`):

```
# MongoDB connection string (Atlas or self-hosted)
MONGODB_URI=mongodb+srv://<USER>:<PASSWORD>@cluster0.xyz.mongodb.net/<DB_NAME>?retryWrites=true&w=majority

# Optional: server port
PORT=3000

# Origins allowed for CORS (comma-separated)
CORS_ORIGINS=http://localhost:5173,https://your-frontend-domain.com

# Secrets (JWT, etc.)
JWT_SECRET=some_long_random_secret
```

Ghi chú:
- `MONGODB_URI` là bắt buộc theo cấu hình hiện tại. Nếu không set, backend sẽ ném lỗi khi khởi động.
- `CORS_ORIGINS` giúp bạn giới hạn các origin được phép gọi API từ trình duyệt. Để thử nghiệm nhanh, có thể đặt `0.0.0.0/0` tạm thời trên MongoDB Atlas nhưng không khuyến nghị cho production.

2) Frontend (`frontend/.env`)

Ví dụ (`frontend/.env`):

```
# Vite chỉ expose các biến có prefix VITE_
VITE_API_BASE_URL=https://ia03-22120216.onrender.com
```

Ghi chú:
- Vite nhúng giá trị `import.meta.env.VITE_*` vào bundle tại thời điểm `build`. Nếu thay đổi biến môi trường trên hosting (Netlify, Render), bạn cần trigger một redeploy để build mới sử dụng giá trị đó.
- Nếu bạn muốn thay đổi URL API mà không rebuild, cân nhắc sử dụng một file runtime config (ví dụ `public/env.json`) hoặc một meta tag trong `index.html` và đọc nó khi app khởi động.

---

