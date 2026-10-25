# ADR-001: Repository integration (route group + separate platform workspace)

- **Status:** Accepted (M0; approved by the Lead under the master prompt, see DECISIONS.md)
- **Date:** 2026-10-25
- **Author:** repo-cartographer
- **Related:** ARCHITECTURE §2, §3, §13, §17; DECISIONS D-004 to D-009, D-013, D-014, D-016; security requirements WEB-1, WEB-2; REPO_MAP.md

## Context

Discovery (REPO_MAP.md) found:

- The marketing site is **Next.js 16.3.4** on `main` (live; `platform/main` carries the 16.4.3 security hotfix, D-013), **App Router, Turbopack**, React 19.2, Tailwind CSS v4, TypeScript strict, npm, deployed on **Vercel** (Git integration; no `vercel.json`, no GitHub workflows). All routes live directly under `app/` with **one root layout** (`app/layout.tsx`) that renders the marketing `Header`, `Footer`, `CookieConsent`, `ConsentedAnalytics` (Vercel Web Analytics + Speed Insights after opt-in) and imports `app/globals.css`.
- There is **no `proxy.ts`** (the Next 16 name for middleware) and **no `middleware.ts`**. `next.config.ts` only sets image formats.
- None of the platform route prefixes (`/learn`, `/tests`, `/ask`, `/plans`, `/me`, `/leaderboard`, `/admin`, `/api/platform`) exists in the marketing site.
- Step 0 already made the platform toolchain separate: `platform/` is its own npm workspace root (D-005); root `tsconfig.json` excludes `platform`; root `eslint.config.mjs` ignores `platform/**`.
- The parental-consent system is **not in this repo** (OA-08).

The constraint that dominates everything: the marketing site must not change (ARCHITECTURE §0.1, §17).

## Options considered

1. **Route group `app/(platform)` inside the existing Next app, shared root layout** (ARCHITECTURE default).
   Platform pages are compiled and deployed with the marketing site, same domain, same cookies, no CORS. They inherit the root layout (marketing header/footer, cookie bar, analytics component, global CSS).
2. **Multiple root layouts**: move every marketing page into `app/(marketing)/` with its own root layout and give `app/(platform)/` a separate root layout.
   Clean separation of chrome, CSS and analytics, but it moves **every** marketing file, changes the root layout and forces full page reloads between marketing and platform pages. That is a restructure of the marketing app, which ARCHITECTURE §2 forbids.
3. **Separate Next.js app** (`platform/web`) mounted on the same domain via rewrites or a second Vercel project.
   Full isolation, but two deployments, two Next versions to keep in step, cross-app navigation by full reload, duplicated design tokens, and a rewrite of `/learn/*` etc. into another origin (which is itself a `next.config.ts` change). ARCHITECTURE §2 reserves this for the case where the marketing site is not App Router; it is App Router.

## Decision

**Option 1.**

1. **Pages:** every platform page lives in the route group **`app/(platform)/`** with its own nested `layout.tsx` (providers, scoped styles, platform nav). Product UI lives in **`components/platform/`**. Everything else (API, worker, DB, pipeline, catalog, infra, e2e, shared schemas/config) lives in **`platform/`**, a separate npm workspace root with its own lockfile (D-005). The root `package.json`/lockfile are not touched by platform tooling.
2. **Shared code into pages:** `app/(platform)` imports `platform/shared` through the existing `@/*` alias (`@/platform/shared/...`). `platform/shared` depends only on zod, imported as `zod/v4` (D-006), which the marketing app's zod 3.25 provides. Files imported this way are type-checked by `next build` even though `platform` is excluded from the root `tsconfig.json` include roots.
3. **Feature flag:** the `(platform)` layout reads the flag on the server (`readFlags()` from `platform/shared/config/flags.ts`, i.e. `PLATFORM_ENABLED` or `NEXT_PUBLIC_PLATFORM_ENABLED`) and calls **`notFound()` when it is off**. Production therefore exposes nothing: every platform URL renders the existing marketing 404 page with status 404. The flag is evaluated at build time for statically rendered platform pages (Vercel injects env at build), so switching it requires a redeploy; that is acceptable and documented.
4. **Marketing entry points** (nav link, CTA) are added only behind `NEXT_PUBLIC_PLATFORM_ENABLED` (it must be inlined into the client `Header`). With the flag off the rendered HTML must be byte-for-byte unchanged; the marketing regression proves it.
5. **Same-domain API path `/api/platform/*` → Azure API.** The browser only ever calls `/api/platform/...` on `www.soylai.com` (cookies stay first-party, no CORS). The path collides with nothing (`/api/enroll` and `/api/razorpay` are the only API routes; `robots.txt` already disallows `/api/`). Whatever forwards it must (a) do nothing unless `PLATFORM_API_ORIGIN` is set, (b) never run on marketing routes, and (c) satisfy D-016 / security requirement WEB-2: add the server-only edge secret header `x-soyl-edge-auth` and overwrite any client-supplied copy, and stream SSE.
   A plain `next.config.ts` rewrite **cannot add request headers**, so it does not meet (c). ADR-005 picks the mechanism in M1. **This ADR recommends a route-handler BFF at `app/(platform)/api/platform/[...path]/route.ts`.** Route groups apply to route handlers too, so it serves `/api/platform/*` from inside the allowed path. It needs **no** `next.config.ts` change and **no** `proxy.ts`. It can add the secret, stream responses, and return 404 when `PLATFORM_API_ORIGIN` is unset or the flag is off. The alternative, Next 16 `proxy.ts` with `matcher: ['/api/platform/:path*']`, adds a root shared file. If ADR-005 still chooses a rewrite (for example for read-only GETs), the only permitted `next.config.ts` change is:
   ```ts
   async rewrites() {
     const origin = process.env.PLATFORM_API_ORIGIN?.replace(/\/+$/, '');
     return origin ? [{ source: '/api/platform/:path*', destination: `${origin}/:path*` }] : [];
   }
   ```
   With `PLATFORM_API_ORIGIN` unset this is equivalent to today's config. The array form places it in `afterFiles`, so it can never shadow a marketing page or `public/` file. Rewrites are compiled into the routes manifest at build time, so the variable must be set in Vercel before the build.
6. **No `proxy.ts` by default.** Auth and flag checks happen in the `(platform)` layout/server components and in the Azure API. Adding `proxy.ts` (for example if ADR-005 chooses it for WEB-2) needs that ADR, a `matcher` limited to platform prefixes (ARCHITECTURE §17.5) and a green marketing regression.
7. **Global CSS and root layout are not modified.** Platform pages inherit `globals.css` (Tailwind v4 theme tokens, base typography, `.page`/`.section` utilities) and use them as the base; platform-specific styling uses CSS Modules or Tailwind utilities under a `platform-` namespace inside `components/platform/` and `app/(platform)/`. Platform pages render inside the marketing header/footer. Immersive views (slide player, test player) use a fixed full-viewport container from the platform layout rather than removing the root chrome. Fonts: the platform reuses the root `Inter`/`Instrument Serif` CSS variables; **Noto Sans Devanagari** is loaded with `next/font` in the `(platform)` layout only (no root change).
8. **Root-layout analytics.** `ConsentedAnalytics` (rendered by the root layout) loads Vercel Web Analytics and Speed Insights once a visitor opts in. They are cookieless and served from same-origin `/_vercel/*` paths, but the data is processed by Vercel outside Azure Central India, which conflicts with CONTEXT §12 ("no third-party tracking on platform pages; first-party analytics only; data in Azure Central India"). Resolution (consistent with D-014 and security requirement WEB-1), authorised by this ADR as a scoped change for web-platform in M1:
   - `components/legal/ConsentedAnalytics.tsx` renders nothing when `usePathname()` starts with a platform prefix, **and** passes a `beforeSend` to both `<Analytics>` and `<SpeedInsights>` that returns `null` for platform URLs (covers client-side navigation after the scripts loaded on a marketing page).
   - The prefix list lives in one place, `platform/shared/config` (added by web-platform in M1; zod-free constant). Until then the list is `PLATFORM_PREFIXES` in `platform/e2e/marketing/routes.ts`; e2e switches to importing the shared constant once it exists.
   - Marketing behaviour is unchanged (regression must stay green); platform pages send nothing to Vercel. Platform analytics are first-party (API events to Azure).
   - The cookie bar keeps appearing on platform pages; it is the site-wide essential-cookie notice.
9. **Dependencies for platform pages** (e.g. KaTeX, a SMILES renderer) must be resolvable by the Next build, i.e. added to the **root** `package.json`. Each such addition needs its own ADR, must be additive (no version change to an existing marketing dependency) and must pass the marketing regression. Prefer lazy-loaded client chunks so marketing bundles are unaffected (the regression reports per-route first-load JS).
10. **Sitemaps:** the marketing `app/sitemap.ts` is not changed. A platform sitemap is served from inside `app/(platform)` and is added to `app/robots.ts`'s `sitemap` list only when the flag is on (separate ADR at that time, ARCHITECTURE §3.2).

### Shared-file changes already made (Step 0, recorded here)

| File | Change | Effect on marketing |
|---|---|---|
| `tsconfig.json` | `"exclude": ["node_modules", "platform"]` | none: `next build` no longer type-checks API/worker code with the web config |
| `eslint.config.mjs` | `globalIgnores([... "platform/**"])` | none: `npm run lint` ignores the separately linted platform workspace |

Both were verified in M0: `npm run build` and `npm run lint` pass and the marketing regression is green (handoff `2026-10-25-repo-cartographer-m0.md`).

### Allowed shared-file changes under this ADR

Only these, each with a green marketing regression in the same PR: the `rewrites()` addition in `next.config.ts` (item 5, only if ADR-005 chooses a rewrite); nav entry points in `lib/site.ts` / `components/layout/Header.tsx` / `Footer.tsx` behind `NEXT_PUBLIC_PLATFORM_ENABLED` (item 4); the analytics exclusion in `components/legal/ConsentedAnalytics.tsx` (item 8). Anything else (root layout, `globals.css`, `not-found.tsx`, dependency versions, `proxy.ts`, `robots.ts`, `sitemap.ts`) needs a new ADR (`proxy.ts` may come from ADR-005, item 6).

## Consequences

- One Vercel project, one build: platform code ships to production compiled but dark (`PLATFORM_ENABLED=false`); a broken platform page can break the marketing **build**. Mitigation: platform PRs run `npm run build` + the marketing regression in CI (infra-azure, M1), and nothing reaches `main` without the owner (D-004, OA-10).
- Platform pages carry the marketing header/footer and global CSS. If the product later needs a fully separate shell, revisit with Option 2 under a new ADR and owner approval.
- `platform/` packages cannot be imported by Next pages except `platform/shared` (zod-only). The typed API client (`platform/shared/api-client`) must stay dependency-free for the same reason.
- Vercel preview deployments of `platform/*` branches show the marketing site's TODO frames (`NEXT_PUBLIC_VERCEL_ENV=preview`); this is existing behaviour, not a regression.
- Marketing regression baselines are Windows-specific; CI uses the differential mode (REPO_MAP §9).
