# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

TCG shop storefront: Next.js 16 (App Router) + Payload CMS, single package (not a monorepo). Payload is embedded directly in this Next.js app, not a separate service.

`@plan.md` is the active architecture/roadmap doc for the catalog + CMS + Stripe checkout work — follow it when building catalog routes, collections, or checkout flows.

## Commands

- `npm run dev` — dev server (forced to webpack via `--webpack`, not Turbopack, despite a `turbopack.root` block existing in `next.config.ts`)
- `npm run build` — production build (also `--webpack`)
- `npm run lint` — `next lint` (no custom eslint config; no Prettier/Biome in this repo)
- `npm run generate:types` — regenerate `src/payload-types.ts` from Payload collections; run this after changing anything in `src/collections/` or `src/payload.config.ts`. **Currently broken** on Node 22 (`ERR_REQUIRE_ASYNC_MODULE` from the Payload CLI's tsx loader) — a pre-existing repo issue, not something to silently work around.
- `npm run payload` — Payload CLI passthrough
- No test framework is set up. Don't add one unless asked.

## Architecture

- `src/payload.config.ts` — Payload config: Postgres adapter, Lexical editor, registers `Users`, `Media`, `Categories`, `Products` collections
- `src/collections/` — Payload collection definitions
- `src/app/(frontend)/` — public storefront routes
- `src/app/(payload)/` — Payload's admin UI mount (standard Payload+Next route-group pattern)
- `src/data/products.ts` — legacy static product data being phased out; the CMS is the source of truth going forward, don't add new data here
- Path aliases: `@/*` → `src/*`, `@payload-config` → `src/payload.config.ts`

## Gotchas

- `cacheComponents: true` is set in `next.config.ts` — an experimental Next.js flag that changes caching semantics; check `node_modules/next/dist/docs/01-app` before assuming familiar caching behavior.
- `docker-compose.yml` only provisions Postgres (`db` service) — the app itself runs via `npm run dev`, not in Docker.
- Env vars (`PAYLOAD_SECRET`, `DATABASE_URL`, `DB_PASSWORD`) live in an uncommitted `.env.local`; `payload.config.ts` has insecure dev-only fallbacks if they're unset — never rely on those outside local dev.

## Git workflow

Branch as `feature/<name>` off `dev`, PR into `dev`. `prod` is the release branch.
