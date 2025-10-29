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
