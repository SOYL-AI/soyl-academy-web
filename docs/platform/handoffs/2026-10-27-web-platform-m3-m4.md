# web-platform — M3 tests + M4 AI and plans (web) — 2026-10-27

Status: **done**, green (stand-in) per D-010. Every flow ran against the real local API (embedded PostgreSQL, all
authored chapters published, the dev test series and live mocks) through `next start` built with the flag on. The
AI model, Razorpay and Blob storage are the API's own stand-ins (mock provider, `RazorpayStub` + signed-webhook
simulator, memory Blob store), wired in by the e2e launcher. Nothing was deployed (D-025).

Branch: `platform/web-platform/m3-m4` (worktree `C:/Users/Prabhu/soyl-wt/web-platform-m34`), from
`origin/platform/main` (web M2, API M1–M3, AI gateway M4, billing M4), with `origin/platform/main` merged twice (d79917d for D-034: papers-like-my-school's is Pro/Board Exam Pass only; then
the latest content at 2ac9139). The API client needed no regeneration: regenerating
gives no diff and the drift test passes.

## What changed

| Area | Files |
|---|---|
| Test player | `app/(platform)/tests/attempt/[attemptId]/page.tsx` (nonce CSP); `components/platform/tests/AttemptPlayer.tsx`; `autosave.ts` (queue: seq, batches ≤ 200, backoff, `attempt_closed`, rejected); `idb-storage.ts` (IndexedDB per attempt, memory fallback, cleared on submit/logout); `timer.ts` (server offset); `player-model.ts` (palette, choice groups, problem text) |
| Result | `app/(platform)/tests/result/[attemptId]/page.tsx`; `components/platform/tests/ResultView.tsx`: score (auto / self-marked), sections, topic mastery, accuracy by difficulty, time per question, percentile or "needs 50 students (N so far)", live rank (beta), every question in review mode with the key, self-evaluation per marking-scheme step / written part / total, AI evaluation (quote → job → poll → labelled marks, separate from the score), late-answer notice |
| Catalogue, series, builder, live | `app/(platform)/tests/page.tsx` + `TestsHome.tsx`; `tests/series/[board]/[class]/[subject]/page.tsx` (ISR shell) + `SeriesClient.tsx` (instructions dialog from `GET /v1/tests/:id`, Start / Resume / Take again / last result); `tests/builder/page.tsx` + `BuilderClient.tsx` (chapters, types, difficulty, count, time, `bank_too_small`, `skippedChapters`; "Papers like my school's" card gated by the quote's `allowedForPlan`); `tests/live/[eventId]/page.tsx` + `LiveEventClient.tsx` (phases, register, countdown, start, writing, results, consent-gated leaderboard) |
| AI | `app/(platform)/ask/page.tsx`; `components/platform/ai/`: `AskClient.tsx` (modes with prices, quote → stream, hint → "Show full solution" / "Check my working", Stop, photo doubts, history), `sse.ts` (fetch + stream parser, Idempotency-Key, AbortController), `useAiStream.ts`, `Message.tsx` (Markdown, images off), `CreditsProvider.tsx` (`GET /v1/credits` once, then SSE/202 balances), `AiDialogs.tsx` (quote, paywall with reset countdown, consent-needed / paused / unavailable), `upload.ts` (canvas re-encode ≤ 2048 px / ≤ 4 MB JPEG, create → PUT → complete → poll), `problems.ts`, `ExplainSlide.tsx` + `ExplainSlideDialog.tsx` (lesson player button, lazy dialog) |
| Plans | `app/(platform)/plans/page.tsx` (static); `components/platform/plans/PlansClient.tsx` (cards from `GET /v1/plans`, features from the API, GST labels, monthly/yearly, billing-off, consent, buy → Checkout → refresh + poll ≤ 60 s, cancel), `razorpay.ts` (loads checkout.js on Buy only, no prefill, handler ignores the response) |
| Leaderboard | `app/(platform)/leaderboard/page.tsx` + `components/platform/leaderboard/LeaderboardClient.tsx` (consent-needed state; live-mock ranks; weekly leagues "coming soon" — no API) |
| /me | `components/platform/me/MeExtras.tsx`: your tests (paged), plan + cancel renewal, AI credits + history (ledger) |
| Shell | `PlatformHeader.tsx` (Learn / Tests / Ask nav, icon-only below 560 px; live credit chip → `/me#credits`); `app/(platform)/layout.tsx` (`CreditsProvider`; placeholder credits removed) |
| Shared UI | `ui/question/model.ts`: `fromResponse` (inverse of `toResponse`, drops unknown ids), `toTestResponse`; `QuestionCard.tsx`: `mode: check | test | review`, controlled `draft`/`onDraftChange`; `ui/kit/Icon.tsx` (+8 icons); `ui/kit/Display.tsx` (`EmptyState` h1); `ui/render/MathBlock.tsx` + `render.module.css`: inline maths wraps at operators, and a long inline formula (e.g. `\ce{…}`) scrolls in place (focusable) instead of widening a 360 px page |
| Lesson / hub | `lesson/SlidePlayer.tsx` (Explain button); hub tests card links to the series page |
| Security / proxy | `server/api-proxy.ts`: path-scoped `idempotency-key` (AI) and `x-razorpay-signature` / `x-razorpay-event-id` (webhook only), SSE `no-transform`; `server/security-headers.ts`: nonce on the new logged-in pages, Razorpay origins on `/plans` only (+ COOP allow-popups), `PLATFORM_UPLOAD_ORIGIN` on upload pages; root `proxy.ts`: passes the pathname (one line); `SessionProvider.tsx`: logout deletes the test queues (WEB-10) |
| API client | `platform/shared/api-client/index.ts`: M3/M4 type exports, `ResponseOf` covers 202, `keepalive` option |
| Tests | Unit: `components/platform/__tests__/{m3-tests-logic.test.ts, m4-ai-logic.test.ts, m3m4-server.test.ts, m34-components.test.tsx}`.<br>e2e: `platform/e2e/tests/platform/web/{api-e2e.ts, m34-helpers.ts, tests.spec.ts, ai.spec.ts, plans.spec.ts}`; `playwright.config.ts`, `env.mjs`, `flag-off.spec.ts`, `bundle.mjs` updated |
| ADR | [ADR-018](../adr/018-platform-web-tests-ai-plans.md) |

Root `package.json`: unchanged (no new dependency).

## Requirement coverage

| # | Deliverable | Where / evidence |
|---|---|---|
| 1 | Tests UI | All of the above. e2e `tests.spec.ts`: series → instructions → start; answers autosaved (PUT seq ≈ ms epoch); reload resumes at the first unanswered question with saved answers; **2 minutes offline** (Playwright offline) with three answers + a mark kept on the device and the offline banner; reconnect → immediate flush → the server has every answer (checked through the API) → another reload shows the written answer → submit with confirmation → **score = the known answer set** (computed from the authored keys) → self-evaluation per step raises the total, not the auto score; **auto-submit** after the server deadline is moved to +25 s; custom builder (+ `bank_too_small`); live mock (register, countdown, start, rank, consent-gated leaderboard). Unit: queue rules, timer, palette, `fromResponse` round trips, player (save, offline banner, palette, submit, auto-submit, closed attempt), result (self-evaluation request, AI labels, consent state). |
| 2 | AI UI | e2e `ai.spec.ts`: consent-needed state → consent → chip 25 → quick doubt quoted (1 credit) → streamed → hint → "Show full solution" (full) → chip 23 → a provider failure before output is **refunded** (chip and `GET /v1/credits` stay 23) → photo doubt: the browser re-encodes to JPEG and PUTs straight to the upload origin without cookies, the answer reads the photo, chip 13 → history → Explain this slide (1 credit) → AI evaluation of a written answer (6 credits, job, "AI-graded" label, "Not part of your score", score unchanged) → last 6 credits → **paywall** with the countdown and `/plans` link; the API's 402 has `resetInSeconds`/`plansUrl`; practice still 200. Unit: SSE parser (split chunks, CRLF, comments, multi-line data), problem mapping, refund/charge notes, uploads. |
| 3 | Plans | e2e `plans.spec.ts`: public `/plans` with GST labels from the API, Plus without "Papers like my school's" (D-034), Pro with it; Razorpay CSP only on `/plans`; consent-needed blocks buying; buy Plus → Checkout stand-in (no `prefill`) → `pay-latest` → the **signed webhooks POSTed through our proxy** → plan active in < 60 s, chip 40, refresh bodies are `{}`; a one-byte-changed body is refused (400); `/me` cancel → "will not renew". Unit: billing-off "Coming soon", consent problem, Checkout options. |
| 4 | Leaderboard | `/leaderboard`: consent-needed state (e2e, unit); live ranks with consent (e2e). Weekly leagues: no API (gap below). |
| 5 | Resilience e2e, AI, plans, axe, third parties, flag off | Above. Every page checked: axe (no serious/critical) and no horizontal scroll at 360 px; the fixture fails on any request to another origin (only `/plans` may reach Razorpay, only the upload test the upload origin), on CSP violations and page errors. Flag-off suite now includes `/tests`, series, attempt, result, builder, live, `/ask`, `/plans`, `/leaderboard` and the plans/test-series/credits/webhook/AI API paths → 404. |
| 6 | Bundle, marketing regression | See Bundle and Results. |

## Results

Final runs, Windows 11, Node 24.15, after merging `origin/platform/main` (2ac9139) and the Tailwind fix (268608f);
API client regenerated: no diff.

```
npm run lint                         → eslint, exit 0, no output
npm run build                        → ✓ Compiled successfully in 26.1s; ✓ Generating static pages (42/42); ƒ Proxy (Middleware)
npm run test:platform-web            → Test Files 10 passed (10) · Tests 171 passed (171)
npm run test:platform-ui             → Test Files 6 passed (6) · Tests 548 passed (548)
platform/: npx vitest run --root shared api-client → 1 file, 20 passed (client drift test)

npm run test:platform-web -w @soyl/e2e   (builds flag ON, e2e API + next start; then flag OFF)
  [platform-web] Playwright: flows with the flag ON
  PASSED: every page ≤ 200 KB gz first-load JS
    1 failed · 54 passed (21.2m)   ← ai.spec: a timing assertion for the streaming screenshot (fixed, below)
  [platform-web] Playwright: flag OFF
    32 passed (39.1s)
npm run test:platform-web -w @soyl/e2e -- --on-only ai.spec.ts   (after the fix; also asserts the reply text
                                                                 grows in steps over > 1 s through the proxy)
    ok 1 › AI tutor: quote → stream → credits; hint → full; refund on failure; photo doubt; explain slide;
           AI evaluation; paywall (1.8m) · 1 passed
  (The run before the merge, same code minus the fix: 55 passed (15.5m) flag ON, 32 passed flag OFF.)

npm run marketing:regression -w @soyl/e2e -- --skip-lighthouse
  48 passed (1.2m); marketing regression PASSED: no visual diffs, all routes as expected
npm run marketing:diff -w @soyl/e2e -- --lighthouse   (D-028: base cd33ca7 = merge-base with main, vs HEAD)
  44 + 48 passed; "differential marketing regression PASSED: HEAD renders the marketing site identically to its merge-base"
node e2e/tests/platform/web/flag-off-html.mjs   (base = origin/platform/main)
  21 pages: html=true css=true on every page (marketing CSS byte-identical); dom=false on /refund-policy, /teachers,
  /terms only because the cookie bar had mounted in the base capture and not yet in HEAD's (hydration timing; the
  marketing code is unchanged) plus the known /method-style head-order move (M1 deviation 9); 6 text endpoints same.
```

The CSS check caught a real leak first: the expression `!block` in `ExplainSlideDialog.tsx` made Tailwind emit
`.\!block{display:block!important}` into the marketing stylesheet. Fixed (268608f); the rerun shows css=true on all
21 pages.

The M3/M4 e2e flows (all at 360 px, axe, no horizontal scroll, no third-party requests):
- `tests.spec.ts`: test player (autosave, reload, 2 min offline, reconnect, submit, known answer set, self-evaluation)
  · auto-submit at the server deadline · custom builder + `bank_too_small` · live mock (register, countdown, start,
  rank, consent-gated leaderboard, /leaderboard) · /me tests, plan, credits; leaderboard consent state
- `ai.spec.ts`: the AI tutor flow described above (one test, ~1.8 min)
- `plans.spec.ts`: public plans + CSP · buy Plus via Checkout stand-in + signed webhook through the proxy + cancel

D-028 Lighthouse, mobile performance (base → HEAD; desktop 100 on both; accessibility, best practices and SEO 100 on both):

| Page | Base | HEAD |
|---|---|---|
| `/` | 81 | 84 |
| `/schools` | 86 | 86 |
| `/students` | 84 | 86 |
| `/parents` | 86 | 84 |
| `/future-builders` | 88 | 86 |
| `/journal` | 91 | 88 |
| `/about` | 88 | 86 |
| `/contact` | 87 | 86 |

Every page is within 5 points.

## Bundle

First-load JS, gzip -9, measured by `platform/e2e/tests/platform/web/bundle.mjs` against `next start` with the flag on
(final full run). Pages are loaded as a guest, so the logged-in views show their login prompt; the question renderer
(KaTeX, react-markdown, visuals) of the player and result pages is the lazy `slots` chunk, as on practice.

| Page | Path | First load (KB gz) | Fetched after load, no interaction (KB gz) |
|---|---|---|---|
| hub | `/learn/cbse/10/science/ch01` | 169.3 | 12.6 |
| lesson | `/learn/cbse/10/science/ch01/lesson` | 186.3 | 12.6 |
| lesson part 2 | `/learn/cbse/10/science/ch01/lesson?part=2` | 186.3 | 23.7 |
| notes | `/learn/cbse/10/science/ch01/notes` | 170.3 | 23.7 |
| flashcards | `/learn/cbse/10/science/ch01/flashcards` | 171.0 | 12.6 |
| practice | `/learn/cbse/10/science/ch01/practice` | 180.5 | 186.8 |
| notes (Hindi) | `/learn/cbse/10/hindi-a/ch02/notes` | 170.3 | 12.6 |
| admin | `/admin` | 169.8 | 20.7 |
| learn | `/learn` | 167.9 | 10.9 |
| **tests** | `/tests` | 169.3 | 9.5 |
| **test series** | `/tests/series/cbse/10/science` | 171.3 | 20.7 |
| **test player** | `/tests/attempt/<id>` | 187.7 | 20.7 |
| **test result** | `/tests/result/<id>` | 187.9 | 20.7 |
| **test builder** | `/tests/builder` | 178.1 | 17.9 |
| **live mock** | `/tests/live/<event>` | 174.3 | 20.7 |
| **ask** | `/ask` | 176.7 | 17.9 |
| **plans** | `/plans` | 169.3 | 13.0 |
| **leaderboard** | `/leaderboard` | 175.0 | 20.7 |
| **me** | `/me` | 175.2 | 20.7 |

- Every page is within the 200 KB budget; the e2e fails if one is not.
- The lesson grew 184.8 → 186.3 KB (M2 → now): the Explain button; its dialog and the SSE client load on first use.
- The marketing regression's own first-load numbers for platform routes (e.g. `/ask` 215.3 KB) count every chunk in
  the build manifest, including ones the browser never requests; `bundle.mjs` measures what the page loads.
- Marketing pages: +1.4 KB gz against the stored baseline on every page, as reported by M2 (it predates this branch);
  marketing HTML and CSS are identical to `platform/main` (flag-off proof above).

## Screenshots (360 px)

Regenerated by the e2e into `platform/e2e/test-results/platform-web/screenshots/` (gitignored):
`test-player-offline-360.png` (offline banner in the dock), `test-player-palette-360.png`, `test-result-360.png`,
`test-result-ai-360.png`, `ask-streaming-360.png`, `ask-answered-360.png`, `ask-consent-needed-360.png`,
`paywall-360.png`, `plans-360.png`, `explain-slide-360.png`, `tests-home-360.png`, `tests-builder-360.png`,
`live-registered-360.png`, `live-leaderboard-360.png`, `leaderboard-360.png`, `leaderboard-consent-360.png`, plus the
M1/M2 set.

`ask-streaming-360.png` is taken as soon as the first chunk of the full solution appears, but on this busy machine
the screenshot finishes after the last chunk, so it shows the finished reply. Streaming itself is asserted: the e2e
records the reply's text length on every DOM change and requires it to grow in steps over more than 1 s (mock: 64
characters every 700 ms) through the web proxy.

## Deviations and decisions

1. **Answer queue in IndexedDB, not localStorage** (WEB-5: free-text answers; ADR-018 §1). Without IndexedDB it falls
   back to memory.
2. **Timer and navigation in a sticky bottom dock**, not a sticky top bar: the marketing header owns the top edge.
3. **e2e API launcher** (`api-e2e.ts`) replaces `npm run dev -w @soyl/api` in the platform e2e: same database and
   content, plus the Razorpay stub with plans synced and `BILLING_ENABLED=true`, the AI mock (slow stream, a failure
   marker), Blob over http, and a control server (payments, deadline, live-mock times). It only uses the API's
   injection points; nothing in `platform/api` changed.
4. **Inline maths**: `\ce{…}` equations in solutions widened the result page at 360 px. Inline maths now wraps at
   operators (shared renderer); formulas longer than 24 TeX characters are focusable and scroll in place inside
   answer keys and AI replies only (not inside answer options, whose labels lock after checking). axe
   scrollable-region-focusable stays clean.
5. **`/plans` stays static** with three Razorpay host allowances (no nonce); checkout.js loads only on Buy.
6. **Photo uploads need `PLATFORM_UPLOAD_ORIGIN`** (server-only) in the web environment for CSP `connect-src` on
   `/ask` and `/tests/builder`.
7. **Explain this slide** asks guests to log in; members without consent see the consent-needed state in the dialog.
8. **Papers like my school's** lives in the builder; the quote's `allowedForPlan` shows "Upgrade to Pro" for Free/Plus
   (D-034). On success the generated test opens on its instructions screen (`start:false`).
9. **Header nav** gains Tests and Ask AI (icons only under 560 px; names stay for screen readers).
10. **Tailwind leak guard**: Tailwind scans the whole repo, so a source token such as `!block` adds a utility to the
   marketing CSS. Found by the flag-off CSS proof and fixed; keep running `flag-off-html.mjs` after UI changes.
11. **e2e sign-ups use one client IP each** (`x-real-ip`, as Vercel sets it), so the suite's ~20 new accounts do not
   trip the per-IP account-creation limit (D-015).

## Known gaps / follow-ups

- **Weekly leagues API** does not exist (`league_memberships` / `leaderboard_snapshots` tables exist). Request to
  backend-api: `GET /v1/leagues/current?scope=class` (consent-gated, first name + last initial).
- **`GET /v1/live-events/:id`** would save listing all events on the live page.
- **Real services** (D-010): Azure OpenAI streaming through Vercel, Blob SAS + CORS from `www.soylai.com`,
  Razorpay test-mode Checkout (verify the CSP origin list, UPI/3-DS popups with COOP allow-popups). Set
  `PLATFORM_UPLOAD_ORIGIN` on Vercel when Blob exists.
- **Rank card image** (ARCHITECTURE §9) is not built (server-side image).
- **Report this AI answer** (AC-15) uses nothing yet: the API has no AI report type.
- **PDF sample papers** are sent as-is (no client compression); HEIC works only where the browser decodes it.
- **Keepalive flush** on page hide sends ≤ 25 items (64 KB keepalive cap); the rest stays queued for the next open.
- **Streaming through Vercel**: verified locally through `next start` with `no-transform`; confirm on a preview.

## Needs from owner

None new. Deployment-time values: `PLATFORM_UPLOAD_ORIGIN` (web), Blob CORS (OA-02/03), Razorpay test keys (OA-04).
