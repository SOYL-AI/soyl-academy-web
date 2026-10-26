# web-platform — M1 route group, proxy, login, guest mode, catalog pages, /me — 2026-10-27

Status: **done**, green (stand-in) per D-010. All flows ran against the real local API (`npm run dev -w @soyl/api`:
embedded PostgreSQL, in-memory KV, mock SMS/email/consent, mock Google OIDC). Nothing ran against real Google,
SMS, email or consent providers; none exist yet.

Branch: `platform/web-platform/m1` (worktree `C:/Users/Prabhu/soyl-wt/web-platform-m1`), with
`origin/platform/main` and `origin/platform/backend-api/m1` merged in.

## What changed

| Area | Files |
|---|---|
| Route group + layout | `app/(platform)/layout.tsx`: 404 unless the flag is on (GEN-4), `<PlatformRoot className={notoDevanagari.variable}>`, toast + session providers, platform bar (`components/platform/shell/`) |
| Security headers | root `proxy.ts` (matcher = platform prefixes only) + `components/platform/server/security-headers.ts`: CSP (nonce + `strict-dynamic` + consent-script hash on `/me`; `'self' 'unsafe-inline'` on static `/learn/**`, F-010), HSTS (https), nosniff, Referrer-Policy, Permissions-Policy, COOP, X-Frame-Options. ADR-011 |
| API proxy (ADR-005) | `app/(platform)/api/platform/[...path]/route.ts` + `components/platform/server/api-proxy.ts`; CSP report endpoint `app/(platform)/api/platform/csp-report/route.ts` |
| Typed API client | `platform/shared/api-client/{schema.gen.ts,index.ts,api-client.test.ts}`; `npm run generate:api-client -w @soyl/shared`; openapi-typescript 7.13.0 (dev, platform workspace). ADR-012 |
| Auth UI | `components/platform/auth/`: `SessionProvider` (GET /v1/session, login sheet, guest merge, logout, Google result handling), `LoginSheet` (bottom sheet at < 640 px, dialog above; Google, phone OTP, email OTP, benefits), `OtpForm` (+91 input, OTPInput, resend cooldown from the API, lockout/paused messages), `ConsentNotice` (D-014 states, `POST /v1/me/consent/start`) |
| Guest mode | `components/platform/lib/guest-storage.ts`: `soyl_guest_v1` = the API `GuestProgress` contract v1, hand-validated (no zod in the client), try/catch on every access; merge after sign-in, idempotent |
| Pages | `/learn` (static), `/learn/[board]/[class]` (subjects by tier), `/learn/[board]/[class]/[subject]` (chapters by unit, device progress), `/learn/.../[chapter]` (hub shell), `/learn/.../[chapter]/[view]` (coming-soon placeholder for lesson/notes/flashcards/practice), `/learn/sitemap.xml`, `/me` (dynamic), `learn/error.tsx` |
| Server helpers | `components/platform/server/{catalog,gate,metadata}.ts` (ISR catalog reads straight to the API origin with the edge secret, 1 h) |
| Marketing touch points | `lib/site.ts` (flag-gated "Learn" in `MAIN_NAV`), `components/legal/ConsentedAnalytics.tsx` (nothing on platform paths + `beforeSend` filter), `eslint.config.mjs` (WEB-6 `react/no-danger` scoped to platform files), root `package.json` script `test:platform-web` |
| Shared config | `platform/shared/config/platform-routes.ts` (`PLATFORM_PREFIXES`, `isPlatformPath`) |
| Tests | `components/platform/__tests__/` (4 suites, 94 tests) + `components/platform/vitest.config.mts`; `platform/e2e/tests/platform/web/` (Playwright: 31 flag-on + 13 flag-off tests, `run.mjs`, `flag-off-html.mjs`); `@soyl/e2e` script `test:platform-web` |
| ADRs | [ADR-011](../adr/011-platform-web-security-headers-and-proxy.md), [ADR-012](../adr/012-platform-web-api-client-and-tests.md) |

Not touched: `app/globals.css`, `app/layout.tsx`, `next.config.ts`, `components/layout/Header.tsx`, other marketing
pages/components, `platform/api`, `platform/db`, `components/platform/ui/**`, `app/(platform)/dev/ui`.

## Requirement coverage (security requirements M1, web side)

| Id | Where | Evidence |
|---|---|---|
| WEB-1 | layout has no third-party requests (self-hosted fonts); ConsentedAnalytics skips platform paths | e2e fixture fails on any foreign or `/_vercel/` request with "Accept all" cookies set |
| WEB-2 | proxy route sets `x-soyl-edge-auth` from `PLATFORM_EDGE_SECRET`, overwrites client copies | unit (header allowlist), e2e (spoofed header still accepted by the API) |
| WEB-3 | `proxy.ts` CSP; report endpoint | unit (policy), e2e (header + nonce on `/me` scripts, zero CSP violations across the suite) |
| WEB-4 | `proxy.ts` | e2e header assertions; HSTS only on https (unit) |
| WEB-5 | session only in the HttpOnly cookie; guest storage strips unknown keys | e2e (localStorage keys allowlist, `document.cookie` has no session; merge body has no extra keys), unit |
| WEB-6 | ESLint rule scoped to platform paths | `npm run lint`; a probe file with `dangerouslySetInnerHTML` fails |
| WEB-7 | UI kit renderers (design-system) | unchanged; `npm run test:platform-ui` 422 tests |
| WEB-8 / AUTH-13 | `safeReturnTo` everywhere (`lib/return-to.ts`) | unit (hostile inputs → `/learn`), e2e (login returns to the original page; hostile `returnTo` never leaves) |
| WEB-9 | logout: API sign-out, in-memory state cleared, `soyl*` Cache Storage cleared, guest data kept | e2e (session unauthenticated after logout) |
| WEB-10 | no service worker added | — |
| WEB-11 | only `NEXT_PUBLIC_PLATFORM_ENABLED` is public; secret read server-side only | unit (`NEXT_PUBLIC_PLATFORM_EDGE_SECRET` is ignored) |
| WEB-12 | OTP input `one-time-code` + numeric; phone/email only in POST bodies | e2e (URL checked after each auth step) |
| AUTH-12 | browser `Origin` forwarded unchanged | e2e (foreign Origin → 403, same origin → 200) |

## How to verify

```
# repo root
npm ci
npm run lint
npm run build
npm run test:platform-web          # 94 unit tests
npm run test:platform-ui           # 422 (design-system, unchanged)
# platform/
npm install
npm test                           # all platform workspaces
npm run test:platform-web -w @soyl/e2e     # builds flag ON, starts API + next start, 31 flows; builds flag OFF, 13 checks
node e2e/tests/platform/web/flag-off-html.mjs   # base vs HEAD flag-off marketing HTML/CSS/DOM proof
npm run marketing:regression -w @soyl/e2e
npm run test:design-system -w @soyl/e2e
```

By hand: start the API (`npm run dev -w @soyl/api` in `platform/`), then at the repo root
`NEXT_PUBLIC_PLATFORM_ENABLED=true PLATFORM_API_ORIGIN=http://127.0.0.1:8787 PLATFORM_EDGE_SECRET=local-dev-edge-secret-not-for-deployment-000000 npm run dev`
and open `http://localhost:3000/learn`. OTP codes: `GET /api/platform/v1/dev/otp-outbox?to=<identifier>` (local only).

## Results

See **Results (final runs)** at the end.

## Deviations and decisions

1. **`proxy.ts` added** (a root shared file) for platform security headers; its matcher lists only platform
   prefixes and it does nothing with the flag off (ADR-011 §1). `next.config.ts` is unchanged.
2. **Static `/learn/**` pages use `script-src 'self' 'unsafe-inline'`** (F-010 exception, ADR-011 §2). Only
   `/me` (and future logged-in routes) get the nonce policy.
3. **ADR-005 additions:** 504 on upstream timeout, 413 at the proxy above 257 KB, no `preferredRegion`
   (deprecated in Next 16; set the region in Vercel at deployment).
4. **`/learn` boards and classes are fixed in code** (CONTEXT §4 scope), not fetched, so the page is prerendered
   without the API. Class, subject and chapter pages come from the API (ISR, rendered on first request).
5. **Chapter hub data** comes from `GET /v1/catalog/subjects/:id/chapters` until `GET /v1/chapters/:id` exists.
6. **Progress on the subject page** is device progress (`soyl_guest_v1`) only; server progress needs
   `GET /v1/me/progress` (M2).
7. **Credit chip** shows the free daily allowance from `platform/shared/config/plans.ts` for members with consent
   granted, as a placeholder until `GET /v1/credits` (M4).
8. **`PLATFORM_PREFIXES`** has its single source in `platform/shared/config/platform-routes.ts`; the e2e copy in
   `platform/e2e/marketing/routes.ts` remains (its Node scripts import it natively) and a unit test keeps them equal.
9. **Head-tag order on `/method`:** adding any route (even empty dummy routes in the base) moves one
   `<meta name="next-size-adjust">` tag inside `/method`'s `<head>` (Next prerender scheduling). Tag set and body
   are identical; the proof compares `<head>` as a set and reports the move.
10. The design-system gallery (`/dev/ui`) now renders inside the platform layout (it still wraps itself in
    `PlatformRoot`; nesting is harmless).

## Known gaps / follow-ups

- Real providers (Google, MSG91, ACS email, consent) untested (OA list). AUTH-8 `__Host-` cookie names are only
  visible over https (staging).
- API-3 spike on the first deployment: confirm Vercel's `x-real-ip` cannot be spoofed.
- Adding `/learn/sitemap.xml` to `robots.txt` / a sitemap index is a flag-on change for later (ADR-001 §10).
- Account linking UI beyond "Connect Google" (link phone/email, unlink) and the session list are not built
  (endpoints exist). "Log out other devices" is built.
- Lighthouse budgets for platform routes are not measured yet (the e2e measures a11y and layout).

## What M2 web (chapter hub, slide player, notes, flashcards, practice) needs from the API

1. `GET /v1/chapters/:id`: hub summary (title, topics, which views exist and their status/beta label, counts of
   slides, notes sections, flashcards, practice questions, tests).
2. `GET /v1/chapters/:id/deck` (server-rendered slides; narration audio URLs on the CDN), `/notes`, `/flashcards`
   with ETags and public caching like the catalog.
3. `GET /v1/chapters/:id/practice?cursor=` without answers (API-9), `POST /v1/practice/answers` returning
   correctness + solution, and an anonymous variant for guests (or a check endpoint) so guest practice works.
4. `lesson_progress` and `practice_answers` tables (backend handoff schema requests) plus
   `PUT /v1/me/lesson-progress` and `GET /v1/me/progress?subject=` (per-chapter progress for the subject page).
   Guest-merge should then store lesson positions (`ignored.positionsNotStored` → 0).
5. Contract v2 question types need renderers in the practice/test UI: `writing` (format, word_limit, rubric),
   `map`, `code-output` (fenced code + expected output, objective), `ordering` (objective), optional `word_limit`
   on short/long answers, `passage_origin` on case/source, the `++underline++` marker, and the grading helpers in
   `platform/shared/content/grading.ts`.
6. A bulk catalog endpoint (all chapters of a board × class) so the platform sitemap can list chapter pages.
7. `POST /v1/content-reports` for the "Report a mistake" button (CONTEXT §4).

## Needs from owner

None new.

## Results (final runs, 2026-10-27, Windows 11, Node 24.15, HEAD c491b60; flag-off proof base = platform/main 975c19c)

```
npm run lint                         → eslint, no output (clean)
npm run build                        → ✓ Compiled successfully; ✓ Generating static pages (36/36); ƒ Proxy (Middleware)
npm run test:platform-web            → Test Files 4 passed (4) · Tests 94 passed (94)
npm run test:platform-ui             → Test Files 4 passed (4) · Tests 422 passed (422)
platform/: npm test                  → ai-core 26, api 207 (+1 skipped), content-pipeline 233, content-templates 85,
                                       db 86 (+1 skipped), shared 66, worker 44: all passed
npm run test:platform-web -w @soyl/e2e
                                     → flag ON: 31 passed (6.3m) · flag OFF: 13 passed (29.9s) · [platform-web] PASSED
npm run marketing:regression -w @soyl/e2e -- --skip-lighthouse
                                     → 48 passed; marketing regression PASSED: no visual diffs, all routes as expected
npm run test:design-system -w @soyl/e2e
                                     → 10 passed (6.9m)  (the gallery is still green inside the new platform layout)
node e2e/tests/platform/web/flag-off-html.mjs
                                     → 21 pages html=true css=true dom=true; 6 text endpoints identical;
                                       /method head order moved (one next-size-adjust meta, deviation 9);
                                       PASSED: flag-off marketing HTML, CSS and hydrated DOM identical to base
```

**Lighthouse.** The full regression (with Lighthouse) passed visual and status (48 passed) but flagged mobile
`/students` performance 96 → 85 (median of 10). A/B on the same machine, alternating rounds, 5 runs each, mobile
performance:

| | /students | / |
|---|---|---|
| base (bdab615, before any web-platform change) | 86, 82, 86 | 82, 82, 86 |
| HEAD | 79, 84, 85 | 81, 79, 81 |

The unchanged base cannot reach its recorded 96 on this machine today either (an orphaned local API process from an
earlier session was still running), so the gap to the baseline is environmental. The only marketing-bundle change is
**+459 B raw / +303 B gzip** first-load JS on every page (`isPlatformPath` in ConsentedAnalytics and the flag check in
`lib/site.ts`); HTML bytes and CSS bytes per page are identical. Re-run the Lighthouse gate on a quiet machine, or
in CI differential mode (`marketing:diff --lighthouse`), before anything reaches `main`.

**Screenshots (360 px)**, gitignored, regenerated by the e2e in `platform/e2e/test-results/platform-web/screenshots/`:
`learn-360.png`, `learn-cbse-10-360.png`, `learn-cisce-12-360.png`, `learn-cbse-10-science-360.png`,
`learn-cbse-10-hindi-a-360.png`, `chapter-hub-360.png`, `chapter-lesson-coming-soon-360.png`, `login-sheet-360.png`,
`login-sheet-email-360.png`.
