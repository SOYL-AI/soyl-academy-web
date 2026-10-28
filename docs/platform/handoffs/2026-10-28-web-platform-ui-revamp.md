# web-platform + design-system — UI revamp (app shell, theme, Khan / LeetCode / FUT patterns) — 2026-10-28

Status: done (see "Gates" for the exact results)
Branch: `platform/web-platform/ui-revamp` (from `origin/platform/main` 72b284e). Backend merged: `origin/platform/backend-api/learning-insights` contract commit `3314bb8` and implementation commit `e2e4bae`.
Decision record: [ADR-023](../adr/023-platform-app-shell-and-theme.md).

## What changed

**App shell (ADR-023).** Platform pages no longer render inside the marketing header/footer. `components/layout/Header.tsx` returns `null` and `Footer.tsx` wraps its unchanged markup in `<MarketingOnly>` when `NEXT_PUBLIC_PLATFORM_ENABLED === 'true' && isPlatformPath(pathname)` (+3 lines each; `app/layout.tsx` untouched). The platform layout renders `AppShell`: compact top bar (SOYL mark → /learn; Learn, Tests, Ask AI, Leaderboard; streak, coins, AI credits when consented, theme picker, profile / Log in), a mobile tab bar under 768 px (Learn, Tests, Ask AI, Ranks, Me; hidden on lesson, flashcards, test player, live mock), a quiet footer (soylai.com, Plans, Privacy, Terms, Cookie preferences), a platform `not-found.tsx`, and a "Skip to page content" link. The cookie bar still comes from the root layout and works on every platform page (dark-themed there by `platform-global.css`).

**Theme.** Light / Dark / System in the top bar and on /me → Appearance. `soyl_theme` cookie (not localStorage, WEB-5); a constant inline boot script (first child of the platform root) sets `data-theme` before first paint on static and dynamic pages; on nonce routes it is allowed by its SHA-256 hash (`THEME_BOOT_SCRIPT_HASH`), like the consent script. `ThemeProvider` follows OS changes for System and themes client-side navigations before paint; it removes the `<html>` attribute when the platform unmounts, so marketing pages stay exactly as they were. Tokens: cool neutral light (`#f5f6f8` / white), LeetCode-style neutral near-black dark (`#16171a` / `#1f2024`), SOYL cobalt/red/yellow brand accents, plus difficulty, mastery, streak, heatmap and tier tokens — all AA-tested in both themes (`kit.test.tsx`).

**Pages**
| Page | Before | After |
|---|---|---|
| `/learn` | Board/class cards on beige, inside marketing chrome | Hero "What are you studying?" with the picker. Members: dashboard above it (Continue where you left off, streak + level ring, activity heatmap, subjects of their class with mastery, private player card, weekly league or how to unlock it, daily challenge). Guests: Continue on this device, "Ready to learn" subjects that have lessons, sign-in nudge. |
| `/learn/[board]/[class]` | 85 subjects listed, daily challenge on top | Courses with content first as cards (glyph tile, chapter count, mastery ring); daily challenge compact below; the other subjects under a collapsed "More subjects: coming soon" (if we cannot tell which subjects have content, all subjects show as before). |
| `/learn/[board]/[class]/[subject]` | Flat chapter list | Khan-style course sidebar (desktop), course mastery ring + segmented bar + Up next / Continue, unit cards with a mastery level per chapter (device progress note kept). |
| Chapter hub | Grid of cards | Sidebar, chapter mastery (ring, level, next-step hints), learning path Lesson → Notes → Flashcards → Practice → Chapter test with per-step state; only `kind: 'chapter'` tests listed. |
| Practice | One question at a time | LeetCode-style: "Solved x/y" ring with Easy/Medium/Hard counts; problem list (status icon, plain-text stem preview, type, marks, difficulty tag); filters: status (All/New/Attempted/Solved, client-side), difficulty (server `difficulty=easy,…`), type; split view on desktop, list behind a toggle on phones; J / K, Ctrl+Enter; the whole chapter list loads in the background (25 a page, cap 200). |
| `/me` | Settings cards | Learning profile first: private player card (overall 40–99, bronze/silver/gold/elite, attribute bars with explanations), activity heatmap (IST days, ≥ 16 weeks), solved by subject, badges; then "Settings" (existing cards + Appearance). |
| `/leaderboard` | "Weekly leagues: coming soon" | Weekly league from `GET /v1/leagues/current`: tier crest, countdown, rules, podium (3+ students), standings with promotion/safe/relegation zone labels, "you" highlighted; mock ranks unchanged. Consent-gated as before. |
| `/store` | Coming-soon teasers | Same content and switches (redemption off, D-038); items and teasers wear deterministic rarity frames (common / rare / epic / legendary from price, stock, limited window, eligibility). |
| Lesson, notes, flashcards, tests, ask, plans, coins | — | Restyled by the new tokens and shell only (no logic change). |

**Auth (small behaviour change).** After signing in on the same page, `SessionProvider` no longer calls `router.refresh()`: platform server components never read the session (private data is fetched in the browser, ADR-010), and the refresh only re-rendered the page while dropping the streamed `<title>` for up to ~250 ms (axe `document-title` failures right after sign-in). A different return target still navigates.

**New code (main files)**
- Shell/theme: `components/platform/shell/{AppShell,AppFooter,ThemeProvider,ThemeToggle,ThemeBootScript,MarketingOnly}.tsx`, `theme.ts`, `chrome.ts`, `appshell.module.css`, `platform-global.css`; `app/(platform)/layout.tsx`, `app/(platform)/not-found.tsx`; `components/platform/server/security-headers.ts` (hash).
- Data: `learn/ProgressProvider.tsx` (GET /v1/me/progress or device), `learn/MasteryProvider.tsx` + `learn/useInsights.ts` (GET /v1/me/mastery, /activity, /card), `lib/learner.ts`, `lib/mastery.ts` (shared formula `platform/shared/learning/mastery.ts` for guests), `learn/content-subjects.ts` and `server/catalog.ts#getContentSubjectIds` (subjects with content = the public daily-challenge list).
- UI: `ui/kit/Mastery.tsx` (MasteryPip, MasteryBar, ProgressRing, DifficultyTag), `learn/{CourseIslands,CourseSidebar,LearnHome}.tsx`, `learn/HubProgress.tsx` (PathStep, HubMastery), `practice/{PracticeApp.tsx,practice-list.ts}`, `me/{MeInsights,Heatmap,PlayerCard}.tsx`, `me/heatmap-model.ts`, `leaderboard/WeeklyLeague.tsx`, `coins/rarity.ts`.

## How to verify
From the repo root: `npm run lint`; `npm run test:platform-web -- --maxWorkers=2`; `npm run test:platform-ui -- --maxWorkers=2`; `npm run build` (through `heavy.sh`).
From `platform/`: `npm run typecheck`; `PW_WEB_PORT=3330 PW_FLAG_OFF_PORT=3331 npm run test:platform-web -w @soyl/e2e` (through `heavy.sh`); `npm run marketing:regression -w @soyl/e2e`; `npm run marketing:diff -w @soyl/e2e -- --base origin/platform/main`.
Manual: open `/learn` → theme picker → Dark → reload (no flash) → `/about` (unchanged, light).

## Gates (run in this worktree, 2026-10-28, Windows 11, 8 GB; heavy jobs through `heavy.sh`)
| Gate | Result |
|---|---|
| `npm run lint` (root) | exit 0 |
| `npm run build` (root) | exit 0 |
| `npm run test:platform-web` | 16 files, 283 tests passed |
| `npm run test:platform-ui` | 6 files, 606 tests passed (contrast pairs in both themes included) |
| `npm run typecheck` (platform/) | exit 0 |
| `npm run test:platform-web -w @soyl/e2e` (`PW_WEB_PORT=3330 PW_FLAG_OFF_PORT=3331`) | flag ON 75 passed, flag OFF 37 passed, `[platform-web] PASSED`; JS budget: every page ≤ 200 KB gz (highest: test result 198.6, test player 198.3, lesson 197.2, practice 194.1, me 191.6, learn 186.6) |
| `npm run marketing:regression -w @soyl/e2e` | 48 passed, "no visual diffs, all routes as expected, Lighthouse within 5 points" (mobile perf 93–97, desktop 100) |
| `npm run marketing:diff -w @soyl/e2e -- --base origin/platform/main` | "HEAD renders the marketing site identically to its merge-base"; the global marketing stylesheet is byte-identical to the base build (no Tailwind leak) |
| gitleaks on `origin/platform/main..HEAD` | no leaks found |

Note on the JS budget: the shell lives in the platform layout, so it adds to every platform page; the heaviest pages (test player/result) are within 2 KB of the 200 KB budget. Anything new on those pages should be lazy-loaded.

## Tests added / changed
- Unit (web): `__tests__/revamp-shell.test.tsx` (theme parse/cookie/resolve, the boot script run against a DOM for every preference × OS, provider + toggle persistence and Escape, html attribute removed on unmount, chrome gating, focus routes, shell nav guest/member/consent), `revamp-insights.test.tsx` (practice-list model, mastery from browser data, learner model, heatmap model + component, player card, league zones, rarity, learning path, subject tiles, chapter links, IST greeting, kit displays), `revamp-practice.test.tsx` (PracticeApp: counts, status/difficulty filters, selection, list toggle, J/K, background paging), `security-headers.test.ts` (theme hash in the nonce policy).
- Unit (UI kit): `kit.test.tsx` contrast pairs for difficulty text, accent on bg, info on its soft fill, mastery/flame/tier/heatmap graphics — both themes.
- e2e: `revamp.spec.ts` (shell without marketing chrome, cookie preferences, back to soylai.com restores marketing chrome and no platform theme; tab bar hidden on the lesson; theme persisted across reloads, applied with all app JS blocked on an ISR page and on nonce-CSP /me, System follows the OS, marketing page untouched; dark-theme axe + 360 px + layout-viewport width on 11 pages; practice list filters, solved status, keyboard; owner screenshots desktop/mobile × light/dark). `pages.spec.ts`: every script without a nonce must be inline and hash-allowed (stronger than the old "at most one"); the marketing-header check runs on `/` (platform pages have their own shell).

## Screenshots
`docs/platform/design/ui-revamp/before/` (live site, 2026-10-28) and `docs/platform/design/ui-revamp/after/` (`{desktop,mobile}-{light,dark}-{page}.png`; desktop full page at 1280, mobile first screen at 360; member pages from a fresh account with consent and a little practice).

## Known gaps / follow-ups
- D-043 (owner, decided while this work was in flight): a dedicated student dashboard on `GET /v1/me/dashboard` (accuracy trend, difficulty split, focus areas, test history, weekly goal). The /learn member dashboard here is the frame for it: add those tiles in `components/platform/learn/LearnHome.tsx` when the endpoint lands. School on the profile (consent-gated) is not in this branch.
- Which subjects "have content" is read from the public daily-challenge list (one entry per subject with practice). A `hasContent` / chapter-count field on `CatalogSubject` would be cleaner (backend follow-up).
- Notes and flashcards have no stored progress, so their learning-path steps show "Not started" until visited state exists (backend follow-up if wanted).
- The dashboard subject list shows a mastery ring only for subjects the API has aggregated (subjects with activity); others say "Not started".
- Desktop pages are centred at 1120/1280 px while the top bar spans the window (LeetCode-like); intentional.
- `checkPage`'s horizontal-overflow check cannot see a widened mobile layout viewport; the revamp spec asserts `innerWidth === 360`, the older specs do not (qa-e2e could add it to `checkPage`).

## Decisions made
- [ADR-023](../adr/023-platform-app-shell-and-theme.md): app shell (marketing Header/Footer step aside on platform paths), theme cookie + hash-allowed boot script, no new dependency.

## Needs from owner
None. Review the before/after screenshots.
