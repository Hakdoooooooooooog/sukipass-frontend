# SukiPass Frontend

React 19 + Vite + Tailwind UI for SukiPass — a digital loyalty platform for Philippine MSMEs.

## Stack

- **React 19 + Vite 8 + Tailwind 4**
- **TanStack Query** for server state
- **react-router** v7 for routing
- **Orval** — generates typed TanStack Query hooks from the backend's OpenAPI spec
- **ESLint + Prettier**, **Husky + lint-staged + commitlint**

## Prerequisites

- Node 22+
- The **backend running** (`sukipass-backend`) with its Postgres up — required to generate the API client and to fetch live data.

## Getting started

```bash
npm install
cp .env.example .env          # sets VITE_API_BASE_URL=http://localhost:3000

# With the backend running (see sukipass-backend README):
npm run api:generate          # generate the typed client from the live OpenAPI spec
npm run dev                   # http://localhost:5173
```

The Home page calls the backend's `GET /api/v1/health` (via the generated `useGetHealth` hook) and shows its status — if it reads **ok / connected**, the full Zod → OpenAPI → Orval → TanStack Query pipeline is working.

## The typed API client (Orval)

`orval.config.ts` reads the backend spec from `http://localhost:3000/openapi.json` and generates:

- `src/api/generated/sukipass.ts` — TanStack Query hooks (e.g. `useGetHealth`)
- `src/api/generated/model/` — TypeScript models

All requests go through the fetch mutator in `src/lib/apiClient.ts`, which prepends `VITE_API_BASE_URL` (so the generated `/api/v1/...` paths resolve to the backend).

**Regenerate the client whenever the backend's request/response schemas change:**

```bash
# backend must be running
npm run api:generate
```

The generated client is committed so the app builds without the backend running.

## Project structure

```
src/
  app/         App.tsx — providers (QueryClientProvider) + RouterProvider
  routes/      route components + router table
  lib/         apiClient (mutator), queryClient
  config/      env.ts (Zod-validated import.meta.env)
  api/generated/  Orval output (committed)
  features/    feature modules (added as the product grows)
```

## Scripts

| Script                            | Purpose                                               |
| --------------------------------- | ----------------------------------------------------- |
| `npm run dev`                     | Vite dev server                                       |
| `npm run build`                   | Typecheck + production build                          |
| `npm run api:generate`            | Regenerate the Orval client (backend must be running) |
| `npm run lint` / `lint:fix`       | ESLint                                                |
| `npm run format` / `format:check` | Prettier                                              |

## Commits

Conventional Commits enforced by commitlint. Pre-commit runs lint-staged (ESLint + Prettier on staged files).
