# Project guide

Terminal-style portfolio. Fully static (`output: 'export'`) — no backend, no
secrets. Safe to keep public.

## Architecture

- **Content as data** — `src/content/*.ts` is the single source of truth
  (profile, projects, experience, skills). Edit content here, not in components.
- **Two views** — `src/components/Shell.tsx` owns the window chrome + the
  Terminal/Portfolio toggle (persisted to `localStorage`) and renders either
  `Terminal.tsx` or `UiPortfolio.tsx`. Both read the same content; the email
  decode is shared via `useEmail.ts`.
- **Virtual filesystem** — `src/lib/filesystem.ts` builds a tree from the content
  that both the typed commands and the clickable UI navigate.
- **Terminal engine** — `src/components/Terminal.tsx` is the client component that
  parses commands, renders output blocks, and handles history/tab-completion.
- **Views** — `src/components/views.tsx` renders the rich project/role/about/etc.
  output. `src/lib/tech.ts` maps tech keys to `simple-icons` (or text-marks).

## Conventions

- Keep it static: no API routes, server actions, cookies, or runtime secrets —
  they break `output: 'export'` and the security model.
- Never put the plaintext contact email in source destined for the bundle; it's
  base64-encoded in `profile.ts` and decoded in the browser only.
- This is Next.js 16 — Turbopack is the default and `next lint` moved to the
  ESLint CLI. When unsure about an API, check `node_modules/next/dist/docs/`.

## Commands

```bash
npm run dev | typecheck | lint | build
```
