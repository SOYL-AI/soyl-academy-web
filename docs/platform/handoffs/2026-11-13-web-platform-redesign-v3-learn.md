# web-platform — redesign v3, task B2: the Learn hierarchy — 2026-11-13

Status: done (gates below)
Branch: `platform/web-platform/redesign-v3-learn` (from `platform/lead/redesign-v3` @ 2cfc9f3b). Not pushed, not merged.
Contract: [DESIGN-LANGUAGE.md](../design/redesign-v3/DESIGN-LANGUAGE.md) §1, §3, §5, §6, §8, §10 ("Learn landing", "Class hub", "Subject hub", "Chapter hub", "Notes / Practice / Flashcards chrome"). Decisions: [ADR-032](../adr/032-design-language-v3-shell-and-age-stages.md); no new ADR (no shared, marketing or dependency change).

## What changed

**`/learn`** (`app/(platform)/learn/page.tsx`, `components/platform/learn/LearnHome.tsx`, new `BoardPicker.tsx`)
- Still a static page. The client landing (`LearnLanding`) shows the guest view until the session is known (that is also the prerendered HTML, so search engines and guests get it with no flash), then the member view.
- Guests: `GreetingHeader` plain "What are you studying?" (eyebrow "Free for every student"), the free-for-everyone line, "Continue on this device" (`ContinueCard`, only with device progress), the board/class picker as two `Card`s with tinted class tiles (CBSE blue, CISCE violet; every link named in full, "CISCE Class 10 (ICSE)"), "Ready to learn" `SubjectCard`s for the last class opened (else CBSE 10), and the sign-up nudge card (`guest-nudge-login`).
- Members: stage-toned greeting (`GreetingHeader`, eyebrow "CBSE · Class 10"), ONE `ContinueCard` (`continue-card`: the real resume chapter; a new member gets "Start here" on their first subject; no class → a quiet card), "Your subjects" `PageSection` + `CardGrid` with progress (`my-subjects`, "All subjects" → the class hub; no class → `EmptyState` "Set my class"); rail: daily challenge, a compact "Browse another class" `RailCard` with class pills, and a quiet "Your progress on Home" card link (`dashboard-link` → `/me/dashboard`, kept for dashboard.spec). **No full-size picker for members any more** (rough edge 3).

**Class hub** (`app/(platform)/learn/[board]/[class]/page.tsx`, new `learn/class-hub.ts`)
- `PageHeader` breadcrumbs, stage-toned lead; every subject grouped by tier (Core subjects, Languages, Electives) as a `PageSection` with its count (`tier-core|language|elective`). Within a tier the subjects with lessons come first as tinted `SubjectCard`s with progress ("3 of 14 chapters started", a mastery bar only once there is mastery); subjects without lessons are plain cards that say "Lessons coming soon" and still open their chapter list. Tiers with more than 8 subjects use `variant="plain"` cards laid out as compact rows (`.dense`), so CBSE 12's 70 electives read as a calm list.
- Rail (container ≥ 960 px, i.e. 1280 px with the full sidebar): "Tests for Class N" `RailCard` (soft "See tests" → `/tests`) + the daily challenge. When no subject of the class has lessons yet, there is no rail and the lead says lessons are on the way.
- Testids: `subject-card` (with lessons) / `subject-card-soon` (without), `subject-progress`. Removed: the class page's collapsed `more-subjects` (the `/tests` hub keeps its own `more-subjects`).

**Subject hub** (`app/(platform)/learn/[board]/[class]/[subject]/page.tsx`, `CourseIslands.tsx`)
- Subject `IconTile` (xl, subject tint; `subject-glyph`) beside the `PageHeader`; "theory only" note as a tinted `Card`; course progress `Card` (`subject-mastery`): `ProgressRing`, `MasteryBar`, and the ONE primary action `ButtonLink` (`up-next`) with stage copy ("Start Chapter 1", "Let's go: Chapter 3", "Continue: Electrostatics").
- Chapters: `PageSection` (`#chapters-title`) → per unit an `h3` + kit `List` of `ListRow`s: leading mastery pip + chapter number tile, title (with hidden "Chapter N: "), meta (English title, topics, "Not in board exam", device progress), trailing mastery `StatusPill` (only once started) and a chevron. Hindi titles keep `lang="hi"`.
- Course sidebar (`course-sidebar`) restyled as a v3 card; still from 1024 px, sticky, scrolls on its own.

**Chapter hub** (`app/(platform)/learn/[board]/[class]/[subject]/[chapter]/page.tsx`, `HubProgress.tsx`)
- `PageHeader` → `ContinueCard` to the resume point (`continue-lesson` while a lesson part is in progress, else `continue-next`: start the lesson, the next part, practice, then notes) → "Study your way" `ModeTile` grid (Lesson, Notes, Flashcards, Practice, Chapter test; `mode-*`) with real state in `meta` ("Part 1 of 2", "3 of 77 answered", "2 free tests", "Coming soon" + disabled) → the path as a `List` (`hub-lesson` with its part rows and progress, `hub-notes`, `hub-flashcards`, `hub-practice` with `practice-progress`, `hub-test`; each step's state written as a pill) → Topics in a `Card` → "Report a mistake".
- Rail: "Your mastery" (`chapter-mastery`) and "Chapter tests" (`chapter-tests`, Free badge, login prompt for guests). With the course sidebar on the left the page column is < 960 px, so the kit rail stacks after the main column at 1280 px (it goes beside it on very wide screens); see open issue 1.

**Notes** (`components/platform/notes/*`): reading column `--measure: 43rem` (about 68 characters of the 17 px notes text), sections as v3 cards, formulas / key terms as tinted wells (blue / green), exam tips as a yellow tinted card; contents as a card above the notes below 1280 px (with the sticky reader bar; from 1024 px the reader bar is a card in the column) and a sticky right rail from 1280 px. Devanagari: unchanged fonts and leading; `lang="hi"` on the article and contents.

**Practice** (`components/platform/practice/*`): summary as a stat row (solved card with ring + Easy / Medium / Hard tinted stat tiles), filters as pill chips (native radios/checkboxes kept), list pane and the question card as v3 cards, "Next question" is `soft` so "Check answer" stays the one primary action. All testids kept.

**Lesson, flashcards** (immersive): tokens only — slide, completion and flashcard cards use `--p-card-border`, `--p-shadow-card`, `--p-stage-card-radius`; the flashcard answer side takes the Flashcards mode tint (violet, with its AA ink); flashcard links are pills. No layout values changed (learn-mode.spec fit tests green).

**Slide renderers** (`components/platform/ui/slides/slides.module.css`, rough edge 8): `.split` gets `grid-template-columns: minmax(0, 1fr)` + `min-width: 0`, `.problem` gets `min-width: 0`, so a wide display equation scrolls in its own box instead of widening the slide. The two-column rule from 640 px is unchanged; slides look the same (lesson screenshots, learn-mode.spec, design-system e2e).

**Shared Learn helpers**
- `learn/copy.ts`: stage copy (§6): `stageGreeting`, `learnSubtitle`, `chapterCta`, `continuePill`, `noClassText`, `classLead`.
- `learn/subject-style.ts` → **`subjectTintFor(id, name, language)`**: the subject-art kind's tint (§2: History orange, English pink …), the stable hue only for subjects without a drawing. Used on every Learn page; the Lead will point B1's `subjectLook()` at it.
- `learn/v3.module.css` (new); `course.module.css` slimmed to the layout, sidebar and the two shared blocks (`.tile` for the dev art gallery, `.moreSubjects` for `TestsHome`); `learn.module.css`, `home.module.css`, `hub.module.css` deleted (no other importers).
- `LearnClient.ChapterTestsCard`: fixed the title regex (`/s+—/` → `/\s+—/`), soft buttons.

**Age stages**: server pages use `stageForClass(classLevel)` (class hub lead); client islands `useStage()` (greeting, CTAs, continue pills, empty states). Density comes from the `--p-stage-*` tokens. Nothing is hidden by stage.

## pages.spec › browse board → class → subject → chapter: decision

- Reproduced on the base commit 2cfc9f3b before any change: fails at `heading level 2 /Core subjects/` (log kept locally).
- The **page was wrong**: ICSE 10's core subjects have content, yet the tier headings sat inside a collapsed "More subjects: coming soon", and a subject with content must never be hidden there. The class hub now always lists every subject under visible tier headings (with lessons first), which is what the spec asked for.
- The spec's last step was **stale**: it expected ICSE 10 Chemistry ch01 to show "Coming soon" for every view ("No content yet (M2)"), but that chapter has had a lesson, notes, flashcards and practice since M5. Updated: each path step must either open its view (a link) or say "Coming soon". Coverage of the "Coming soon" state moved to unit tests (`learn-v3.test.tsx › study modes`).

## How to verify (results on this branch)

All on the final code (`.env.local` moved out of the worktree before the flag-off, design-system and marketing gates; `PW_*` ports as process env).

| Gate | Command | Result |
|---|---|---|
| Lint | `npm run lint` (root) | exit 0 |
| Build | `npm run build` (root) | exit 0 |
| Web unit | `npm run test:platform-web` | 24 files, 492 passed (12 new in `learn-v3.test.tsx`) |
| UI kit unit | `npm run test:platform-ui` | 797 passed, 1 failed: `visual-v2.test.tsx › table` (known, pre-existing, content data) |
| Platform typecheck | `cd platform && npm run typecheck` | exit 0 |
| Web e2e, flag ON (Learn specs) | `PW_WEB_PORT=3520 PW_FLAG_OFF_PORT=3521 PW_API_PORT=8510 PW_OIDC_PORT=8511 PW_CONTROL_PORT=8512 npm run test:platform-web -w @soyl/e2e -- --on-only pages.spec.ts guest.spec.ts learning.spec.ts learn-mode.spec.ts review.spec.ts revamp.spec.ts` | 76 passed (29.4 min), incl. the browse test and the route JS budget (every page ≤ 200 KB gz) |
| Web e2e, flag OFF | `… -- --off-only` | 57 passed, 1 skipped (flag-ON-only marketing-nav test, by design) |
| Design-system e2e | `DS_PORT=3530 npm run test:design-system -w @soyl/e2e` | 14 passed |
| Marketing | `npm run marketing:diff -w @soyl/e2e -- --base platform/lead/redesign-v3 --work-dir <scratch> --base-port 3540 --head-port 3541` | PASSED: zero visual diffs, 50 checks incl. route status |

Note for other agents: `marketing:diff` defaults to a shared temp work dir (`%TEMP%/soyl-marketing-diff`) and ports 3201/3202; parallel agents should pass `--work-dir` and their own ports.

Screenshots (production build, `next build` + `next start`, viewport shots 360×800 and 1280×900, light and dark): `docs/platform/design/redesign-v3/after/learn/{360|1280}-{light|dark}-{page}.png`, pages: `guest-learn`, `member-learn`, `guest-class-cbse-7` (junior), `guest-class-cbse-12` (senior), `guest-subject-science`, `guest-subject-hindi`, `guest-chapter`, `guest-chapter-hindi`, `member-chapter`, `guest-notes`, `guest-notes-hindi`, `guest-practice`, `guest-lesson`. Each was checked for horizontal overflow, one `h1` and axe (serious/critical) by the capture script: all clean.

## Tests added / changed

- New `components/platform/__tests__/learn-v3.test.tsx` (12 tests): stage copy, class-hub ordering and meta, chapter-hub resume point (`hubResume`, `resumePart`), study-mode tiles incl. "Coming soon", board picker names and variants, `/learn` guest view, member view (no full picker, resume card, subjects, one h1), member without a class.
- `pages.spec.ts`: browse test's last step (above). No other spec changed; `review.spec.ts`, `revamp.spec.ts`, `guest.spec.ts`, `learning.spec.ts`, `learn-mode.spec.ts` pass unchanged.

## Known gaps / follow-ups

1. **Chapter hub rail at 1280 px**: with the course sidebar (required by review.spec) the page column is about 650 px, so the kit's `PageColumns` rail (mastery, tests) stacks after the main column; it sits beside it only on very wide screens. The ModeTiles carry the state, so the "what now" answer stays on top. If the Lead prefers the rail beside the content at 1280, the course sidebar would have to collapse on the chapter hub.
2. **Kit (frozen, worked around in `v3.module.css`)**: (a) `PageColumns` makes the rail `position: sticky`, so a rail taller than the screen (daily challenge with many subjects) hides its end until the page ends; Learn pages with that rail use `.flowRail` (static rail). (b) `Button`/`ButtonLink` are `white-space: nowrap`, so a long senior CTA ("Continue: Electric Charges and Fields") overflows at 360 px; worked around for the subject hub's Up next. (c) The §8 snippet `subjectTint(subjectStyle(...).hue)` contradicts §2; use `subjectTintFor`.
3. **Coins (`DailyChallengeCard`, not mine)**: its list sizes by the window (`@media`), so in a 320 px rail it showed three columns; `v3.module.css` forces one column inside Learn rails. It also renders a primary "Solve" per subject (several primaries next to the page's one); consider `soft` there.
4. Many CBSE/CISCE classes have no lessons yet in dev data (e.g. CBSE 7); those class hubs show plain cards and no rail. Fine, but the junior screenshots are therefore quiet.
5. Member greeting uses `displayName`; accounts without a name get "Good evening" (no name), as before.

## Decisions made

- Member `/learn` keeps `dashboard-link` as a quiet card link to Home (dashboard.spec).
- Class hub: subjects without lessons are plain cards marked "Lessons coming soon" in their meta (no badge before the title, so link names still start with the subject).
- Practice "Next question" is `soft` (one primary per view).

## Changed outside owned paths

None. (`components/platform/ui/slides/slides.module.css` is the allowed rough-edge-8 fix; `platform/e2e/tests/platform/web/pages.spec.ts` is an owned spec.)

## Needs from owner

None.
