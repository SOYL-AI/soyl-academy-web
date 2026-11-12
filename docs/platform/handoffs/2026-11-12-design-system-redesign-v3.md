# design-system — redesign v3: design language, app shell, kit foundations — 2026-11-12

Status: done (gates below; one pre-existing unit-test failure on main is unchanged and called out)
Branch: `platform/design-system/redesign-v3` (from `main` @ 59982c2e). Not merged, not pushed.
Owner ask (2026-11-12): make the learning platform "feel as good as possible" for Classes 7–12, free design language, SOYL colours.
Decisions: [ADR-032](../adr/032-design-language-v3-shell-and-age-stages.md) (amends ADR-023 §a). Contract for page agents: [DESIGN-LANGUAGE.md](../design/redesign-v3/DESIGN-LANGUAGE.md).

## What changed

**Tokens** (`components/platform/ui/styles/tokens.css`, light + dark + `prefers-color-scheme` fallback, all scoped under `.soyl-platform`)
- Warm paper canvas `--p-bg #f6f4ef` (dark `#121316`), `--p-paper`, white cards with `--p-card-border` + `--p-shadow-card`; `--p-shadow-2` softer.
- Tint family `--p-tint-{blue,violet,pink,red,orange,yellow,green,teal,neutral}` + `-ink` (AA-tested in both themes).
- Radii 6/10/16/20/24 + pill; type `--p-text-4xl`, `--p-text-greet`, display weight/leading/tracking; `--p-space-12/16`; shell layout tokens; `--p-decor-*` hero shapes.
- Age-stage tokens `--p-stage-*` with `[data-stage="junior"|"senior"]` overrides (middle is the default).
- Generated from one source so the two dark blocks stay identical (the kit test checks).

**Kit** (`components/platform/ui/kit/`; server-safe; existing APIs unchanged, additive only)
- New: `tints.ts`, `ButtonLink.tsx`, `Page.tsx`, `Greeting.tsx`, `Stat.tsx`, `Goal.tsx`, `Tiles.tsx`, `Rail.tsx`, `Lists.tsx` (+ CSS modules); `SkeletonCard`, `cardLinkClass`, `Card tint`, `EmptyState tint|compact`; Button `soft` variant; pill Button/Badge; soft CreditChip; icons `chart calendar arrowRight star sparkles`.
- Component list with props: see "Kit API for page agents" below.

**Shell** (`components/platform/shell/`)
- `AppShell.tsx` rewritten: sidebar ≥ 1024 px (icon rail 1024–1279, 248 px from 1280) with nav, AI credits (opens the guide), guest log-in card, "‹ soylai.com", student card; slim top bar (mark below 1024; class chip + date from 1024; streak, coins, theme, avatar / Log in; credits chip only where credits are spent or bought: `/ask`, `/plans`, lesson, test result); tab bar < 1024 restyled; immersive routes without sidebar/tab bar.
- New `stage.ts` (pure: `stageForClass`, `classFromPath`, `resolveStage`, `byStage`) and `StageProvider.tsx` (`useStage()`); `data-stage` + `data-testid="app-shell"` on the shell root.
- `navFor(member, 'side' | 'top' | 'tabs')`, `PROGRESS_NAV` (`/me/progress`), `ME_TAB`, `CREDIT_CHIP_ROUTES`, `showsCreditChip` exported; `navFor(…, 'top')` and `'tabs'` behave as before.
- `shell.module.css`: page container uses `--p-content-max` (1200) and the shell's responsive gutter (16/24/32); bigger `h1` (30/36 px).
- `platform-global.css`: page canvas colours follow the new `--p-bg`. `THEME_BOOT_SCRIPT` unchanged (no CSP hash change).

**Gallery** (`app/(platform)/dev/ui`): new `V3Gallery.tsx` rendered twice (`#v3` light, `#v3-dark` forced dark): tints, buttons, greeting, continue card, stats, subject cards, mode tiles, rail cards (goal + week, league, upcoming, reward), list, pills, table, empty/skeleton/tinted card, a page-template composition, the three stages side by side. Gallery sections no longer widen the page at 360 px (they did on main: exemplar chem-equation slides; gallery CSS fix only, renderers unchanged).

**Docs**: ADR-032 (+ README row, next free number 033), `docs/platform/design/redesign-v3/DESIGN-LANGUAGE.md` (principles, tokens, grid, shell, page template, kit snippets, stages and copy tone, light/dark, do/don't, per-page briefs, shell testids), `components/platform/ui/README.md` updated, screenshots in `docs/platform/design/redesign-v3/after/`.

**Tests**
- `components/platform/ui/__tests__/kit.test.tsx`: contrast pairs for every tint (5 text colours each) and for `--p-paper`, `--p-surface-2`, `--p-surface-3`; tint definitions; stage-block scoping.
- New `components/platform/ui/__tests__/kit-v3.test.tsx` (19 tests): every new component's structure and accessible names, `weekDays`, `greetingFor`, `subjectTint`.
- `components/platform/__tests__/revamp-shell.test.tsx`: member sidebar credits + guide, credits chip only on Ask AI/Plans, sidebar nav (members/guests), profile card current on /me /coins /store, immersive routes, stage on the shell root, `stage.ts`, `useStage`.
- E2E: `revamp.spec.ts` (new canvas colours), `review.spec.ts` (widest member bar is `/ask`; new "v3 shell" test: sidebar widths, rail, stage from the URL, immersive), `avatars-assets.spec.ts` (credit guide opened from the chip on `/ask`).

## How to verify (exact commands, results on this branch)

| Gate | Command | Result |
|---|---|---|
| Lint | `npm run lint` (root) | exit 0 |
| Build | `npm run build` (root) | exit 0 |
| UI kit unit | `npm run test:platform-ui` | 797 passed, 1 failed — the failure is `visual-v2.test.tsx › real content … › table` ("script-like aria-label on <div>"), **pre-existing on main @59982c2e** (reproduced before any change), content data, not touched here |
| Web unit | `npm run test:platform-web` | 23 files, 479 passed |
| Platform typecheck | `cd platform && npm run typecheck` | exit 0 |
| Design-system e2e | `npm run test:design-system -w @soyl/e2e` | 14 passed |
| Web e2e | `npm run test:platform-web -w @soyl/e2e` | RESULT_WEB_E2E |
| Marketing | `npm run marketing:diff -w @soyl/e2e -- --base main` | RESULT_MDIFF |

## Kit API for page agents

Import from `@/components/platform/ui/kit/<file>`. Details and snippets: DESIGN-LANGUAGE.md §8.

| Component | File | Props |
|---|---|---|
| `Button` / `IconButton` | Button | `variant: primary\|secondary\|soft\|ghost\|danger`, `size: sm\|md\|lg`, `block`, `loading`, `icon` |
| `ButtonLink` | ButtonLink | `href`, `variant`, `size`, `block`, `icon`, `iconEnd`, `prefetch`, anchor attrs |
| `Card` | Display | `as`, `elevated`, `flush`, `tint?: Tint` |
| `cardLinkClass(extra?)` | Display | class names for a whole-card `<Link>` |
| `EmptyState` | Display | `title`, `icon`, `art`, `action`, `headingLevel`, `tint?`, `compact?` |
| `SkeletonCard` | Display | `lines`, `thumb` |
| `PageColumns` | Page | `rail?`, `railLabel`, `railFirstOnPhones?` (2 columns when the container ≥ 960 px: from about 1100 px viewport) |
| `PageSection` | Page | `id` (heading id), `title`, `as`, `count?`, `description?`, `action?: {href,label} \| node`, `data-testid` |
| `SectionHeader` | Page | same as PageSection without the section |
| `CardGrid` | Page | `label?`, `min?` px (default `--p-stage-tile-min`), `as: ul\|div` |
| `GreetingHeader` | Greeting | `title`, `eyebrow?`, `subtitle?`, `actions?`, `aside?`, `art?`, `variant: plain\|hero`, `tint?`, `as: h1\|h2`, `data-testid` |
| `DateChip` | Greeting | `date?` (IST) |
| `greetingFor(date?)`, `istHour(date)` | Greeting | India-time greeting |
| `StatCard` | Stat | `label`, `value`, `unit?`, `hint?`, `trend?: {direction: up\|down\|flat, text}`, `icon?`, `tint?`, `href?` |
| `StatGrid` | Stat | `label?` (group name) |
| `GoalRing` | Goal | `value`, `target`, `unit`, `label` (a11y), `title?`, `caption?`, `size?` |
| `WeekStrip` | Goal | `days: WeekDay[]`, `label?` |
| `weekDays(activeYmd, todayYmd?)`, `istToday()` | Goal | Monday-first week with states done/today/today-done/missed/upcoming |
| `IconTile` | Tiles | `icon?` or children, `tint`, `size: sm\|md\|lg\|xl`, `inverse?` |
| `SubjectCard` | Tiles | `href`, `title`, `meta?`, `tint`, `art?`, `progress?: {value, label}`, `badge?`, `variant: tinted\|plain`, `lang?`, `listItem?` |
| `ModeTile` | Tiles | `mode: lesson\|notes\|flashcards\|practice\|tests`, `href?`, `title?`, `meta?`, `disabled?`, `tint?`, `icon?`, `listItem?` |
| `ContinueCard` | Tiles | `href`, `title`, `eyebrow?`, `meta?`, `progress?`, `art?`, `tint?`, `cta?`, `lang?` |
| `RailCard` | Rail | `id`, `title`, `action?`, `aside?`, `tint?`, `headingLevel?` |
| `LeaderboardMini` | Rail | `rows: {rank, name, avatar, score, you?}[]`, `unit?`, `label` |
| `List` / `ListRow` | Lists | List: `label?`, `inset?`; Row: `href?`, `leading?`, `title`, `meta?`, `trailing?`, `current?`, `lang?` |
| `StatusPill` | Lists | `tone: neutral\|info\|success\|warning\|danger\|live\|highlight`, `dot?` |
| `DataTable` + `dataTableNum` | Lists | `caption`, `hideCaption?`, `dense?`; children `<thead>/<tbody>` |
| `Timeline` | Lists | `items: {id, time, timeSub?, title, meta?, href?, status?, tint?}[]`, `label` |
| `subjectTint(hueOrKind)`, `STUDY_MODES`, `TINT_NAMES`, `isTint` | tints | |
| `useStage()` | shell/StageProvider | `{ stage, classLevel, source, pick({junior, middle, senior}) }` (client) |
| `stageForClass`, `classFromPath`, `resolveStage`, `byStage` | shell/stage | pure, server or client |

## Known rough edges in existing pages (page agents must fix)

1. **`/me/dashboard`** is still the 12-section analytics page; its header repeats streak/level/coins chips that the top bar already shows; KPI cards and "3 of 7,537" denominators remain. Split into Home + `/me/progress` per DESIGN-LANGUAGE §10. Keep `credits-tile` with its guide button (the avatars-assets e2e still checks it), `dashboard`, `dashboard-profile-line`, `prompt-class*`.
2. **`/me/progress` does not exist yet**: the sidebar's Progress link is a 404 until the page agent adds `app/(platform)/me/progress/page.tsx`.
3. **`/learn` (member)** still shows the full board/class picker after the subject list; guests are fine.
4. Pages style their own boxes with `--p-border` hairlines and `--p-surface-2` wells (course sidebar, chapter list, practice summary, /ask composer, /me sections): they look consistent but flatter than the v3 cards; move them to `Card`/`List`/`StatGrid`.
5. Content width: the page container is now 1200 px max inside the column (1032 px of column at 1280 with the sidebar, 1020 at 1100 with the rail). Course pages with a left course sidebar still fit (checked at 1100/1280); anything that assumed a 1280 px container should be re-checked at 1280.
6. Page `h1`s using `shell.title` are bigger (36 px desktop); pages with their own title classes (dashboard greeting, practice) are unchanged until restyled.
7. `/ask` at desktop: composer capped at ~800 px leaves an empty right side: good place for a rail (credits guide, recent chats).
8. Renderer follow-up (not changed here): slide layouts `.split`/`.problem` use auto grid tracks, so a wide display equation can widen a narrow container (seen only in the gallery at 360 px; the lesson player at 360 px has no overflow on CBSE 10 Science ch. 1 part 1).

## Known gaps / follow-ups

- `visual-v2.test.tsx › table` fails on main and here (content data); owner: content/pipeline.
- The coin chip's check-in dot is unchanged (owner feature, ADR-021).
- Screenshots of logged-in pages are from `next dev` against the local API (the dev-tools "N" badge shows bottom-left); the e2e suites write production-build screenshots to `platform/e2e/test-results/platform-web/{revamp,review}/`.

## Needs from owner

None.
