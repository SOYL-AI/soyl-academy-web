# Lead — learning-platform redesign v3 (integration) — 2026-11-13
Status: done (integrated on `platform/lead/redesign-v3`; merged to `main` and deployed in the same step; see STATUS "Production deployment")
Owner ask (2026-11-12): redesign the whole learning platform for Classes 7–12 from five reference screenshots, "complete freedom on the design language" with SOYL's colours, production ready, properly routed, committed.

## What changed
Four branches, merged in order (design system first, then pages):

| Task | Agent | Branch | Handoff |
|---|---|---|---|
| A. Design language v3, sidebar app shell, age stages (`data-stage`), today-page kit, gallery, ADR-032 | design-system | `platform/design-system/redesign-v3` | [2026-11-12-design-system-redesign-v3](2026-11-12-design-system-redesign-v3.md) |
| B1. Home (`/me/dashboard` as the "today" page) + new `/me/progress` | web-platform | `platform/web-platform/redesign-v3-home` | [2026-11-13-web-platform-redesign-v3-home](2026-11-13-web-platform-redesign-v3-home.md) |
| B2. Learn landing, class / subject / chapter hubs, notes, practice, lesson + flashcards chrome | web-platform | `platform/web-platform/redesign-v3-learn` | [2026-11-13-web-platform-redesign-v3-learn](2026-11-13-web-platform-redesign-v3-learn.md) |
| B3. Tests hub / series / result / builder, attempt + live chrome, Leaderboard, Ask AI, Profile, Coins, Store, Plans | web-platform | `platform/web-platform/redesign-v3-tests` | [2026-11-13-web-platform-redesign-v3-tests](2026-11-13-web-platform-redesign-v3-tests.md) |

Lead integration fixes (43169b85):
- One subject-tint rule: `subjectTintFor()` in `components/platform/learn/subject-style.ts` (art kind first, then hue), used by Home and the Tests pages too. The DESIGN-LANGUAGE §8 snippet `subjectTint(subjectStyle().hue)` contradicted §2.
- Home continue card: "On part 2 of 3" and "1 of 3 parts done". It used to show "Part 2 of 3" next to "0 of 3 parts".
- Daily-challenge "Solve" buttons are `soft`, so each view keeps one primary action.
- Learn subject tiles have a 184 px minimum from 480 px. At 1280 px, five-up tiles broke "Mathematics" mid-word.
- `/me/progress` link prefetch workaround removed now that the page exists; `flag-off.spec.ts` lists `/me/progress`.

Not changed: API, DB, OpenAPI, shared config, billing / credits logic, marketing pages, root layout, global CSS, `proxy.ts`, security headers, dependencies. All 298 changed files are under `components/platform/`, `app/(platform)/`, `docs/platform/` or `platform/e2e/`.

New route: `/me/progress`. It is members only, `noindex`, and inside the `/me` nonce-CSP matcher. With the flag off it is a 404 (asserted in `flag-off.spec.ts`).

## How to verify
Run on `platform/lead/redesign-v3` @ 43169b85 + docs.

| Gate | Command | Result |
|---|---|---|
| Lint | `npm run lint` | exit 0 |
| Web unit | `npm run test:platform-web` | 29 files, 544 passed |
| UI unit | `npm run test:platform-ui` | 797 passed, 1 failed: `visual-v2.test.tsx › table` (pre-existing on main @59982c2e, content data) |
| Platform typecheck | `cd platform && npm run typecheck` | exit 0 |
| Build | `npm run build` | exit 0 |
| Web e2e (flag on + off) | `npm run test:platform-web -w @soyl/e2e` | on: 130 passed, 1 skipped (55 min); off: 58 passed |
| Design-system e2e | `npm run test:design-system -w @soyl/e2e` | 14 passed |
| Marketing | `npm run marketing:diff -w @soyl/e2e -- --base main` | PASSED: zero diffs, 50 checks incl. route status |

Screenshots (production builds, 360 / 1100 / 1280, light + dark), all under `docs/platform/design/redesign-v3/after/`:
- `home/`
- `learn/`
- `tests-and-more/`
- the shell and gallery shots at the top level

## Tests added
- Unit: `kit-v3.test.tsx`, `revamp-shell.test.tsx` updates, `home-model.test.ts`, `progress.test.tsx`, `learn-v3.test.tsx`, `redesign-v3-tests-me.test.tsx`, plus rewrites of the dashboard / learn / tests suites.
- E2E: `progress.spec.ts` (new). Updated: `dashboard`, `pages` (browse test fixed: the class page hid content subjects under "coming soon"), `guest`, `learning`, `learn-mode`, `review` (v3 shell test), `revamp`, `avatars-assets`, `ai`, `tests`, `plans`, `coins`, `account`, `flag-off`.
- `playwright.config.ts`: API start-up timeout raised from 300 to 600 s, because publishing 729 chapters takes about 310 s.

## Known gaps / follow-ups
- **Kit touch targets under 44 px:** RailCard action links and `Button size="sm"` / `Chip` are 36 px; breadcrumbs are 32 px. Fix them in the kit (design-system).
- **Kit API gaps** (each page worked around them locally):
  - `PageColumns` has no `minmax(0,1fr)` single-column track and cannot place only part of the rail first on phones; its rail is sticky even when it is taller than the screen.
  - `StatGrid` uses viewport breakpoints rather than container queries.
  - `EmptyState compact` is still card-sized.
  - `SubjectCard` / `CardGrid` take no `data-*` attributes.
  - Button `nowrap` overflows long CTAs at 360 px.
  - `CardGrid` min-width is inline, so the override needs `!important`.
- **Chapter hub at 1280 px:** the course sidebar takes the width, so the kit rail (mastery, tests) stacks below the content. It sits beside the content only on wider screens.
- **`/tests`** no longer renders a one-item breadcrumb, so its BreadcrumbList JSON-LD is gone. That list had a single item, so it carried no SEO value.
- **The flag-on e2e rewrites the tracked screenshots in `docs/platform/design/avatars-assets/`** on every run. Revert them; don't commit them.
- **Gate hygiene for parallel worktrees:**
  - Keep `.env.local` (with `NEXT_PUBLIC_PLATFORM_ENABLED=true`) out of the worktree for flag-off and `marketing:diff`: `next build` reads it.
  - `marketing:diff` defaults to a shared `%TEMP%` work dir and ports 3201/3202. Pass `--work-dir` and `--base-port` / `--head-port` when runs overlap.
- **Dev data:** many classes (e.g. CBSE 7) have no lessons yet, so junior-stage pages look sparse until content waves land.

## Decisions made
ADR-032 (design language v3, sidebar shell, age stages; amends ADR-023 §a).

## Needs from owner
- Plans: Pro and Board Exam Pass list "Weekly progress report for parents", which is not an AI feature. Should paid plans keep listing it? Config is unchanged until you decide.
