# marketing — Ink and wash, phase 2 (home) — 2026-11-11

Status: done (branch `marketing/ink-and-wash`, draft PR #23). Not merged, not deployed, visual baseline not
re-captured.

Plan: `docs/redesign-ink-and-wash.md` §3.2 (home), §3.4 (the Diwali tab), §4 (sales devices 1, 2, 4, 6, 7) and
the header items of §3.3 that phase 1 deferred.

## What changed

**The homepage** (`app/page.tsx`) leads with free learning, six screens instead of about thirteen:

1. **Door** (`components/home/Door.tsx`): "The whole syllabus, free." / "Classes 7 to 12. CBSE, ICSE and ISC. You
   only ever pay for AI." / "What are you studying?" with board and class chips (`DoorPicker.tsx`) and one action,
   "Open Class N", to `/learn/<board>/<class>`. Beside it the ring question (`RingQuestion.tsx`): plot a point on a
   small grid inside the painted ring; each wrong try draws a third of the ring (two thirds at most) and stays as
   a madder mark; the right answer closes it and the wash blooms. Keyboard: Tab to the grid, arrows, Enter.
   The pick is stored where the platform keeps a guest's board and class (`soyl_guest_v1`,
   `rememberGuestBoardClass`), so `/learn` opens on it and it merges into an account (`DoorState.tsx`). This is
   instead of the plan's separate `soyl.door` key.
2. **Ledger** (`Ledger.tsx`): free, always (lessons; notes and flashcards; practice; tests, mock papers and
   All-India mocks, with "tests need a free account") against metered (AI help), with the daily allowance from
   `plans.ts` and a link to `/plans`.
3. **Taste** (`Taste.tsx`): three real slides (tap to advance), a flashcard (tap to flip) and a doubt with its
   credit cost, for the chosen class, each linking into the subject on `/learn` or to `/ask`. Material is
   verbatim from the authored chapters, snapshotted by `scripts/build-taste.mjs` into
   `content/taste.generated.ts` (plain text only, so the homepage never loads the maths renderer). Classes 7 and
   8 have no authored chapter yet: they show Class 9 and say so. The doubt card shows the question and the cost,
   **not an AI answer** (no recorded exchange exists; none was invented). Then, once the visitor has done
   anything as a guest: "N slides, M questions. Saved on this phone only." and "Keep it" to `/me`.
4. **Clock** (`ExamClock.tsx`): Classes 10 and 12 get the days to the first paper **only from an official date
   sheet** (`content/exam-dates.ts`, empty today, so it shows "Board exams begin in February."), and the Board
   Exam Pass in a parent's units, "₹499 once. About ₹3.50 a day until 31 March 2027.", computed from `plans.ts`.
   Other classes get streaks (the freeze from `STREAK`) and the weekly league (tier names from `LEAGUE_TIERS`).
5. **Three doors** (`ThreeDoors.tsx`): parents, schools, and the Future Builders sunflower card with its existing
   copy and live camp status. Real photographs (Pexels) printed as duotones in the painted panel.
6. **FAQ** (`HomeFaq.tsx`, `freeLearningFaqs()` in `content/faqs.ts`): four questions, every number from config;
   the FAQ structured data mirrors the visible text.

**Flag off** (GEN-4): the door says "Free lessons for Classes 7 to 12 open soon." with "Book a demo", screens 2
to 4 are left out, and the FAQ is the previous one. No marketing page carries a platform link.

**Numbers from config** (`lib/home/numbers.ts`, unit-tested): the free allowance, the doubt cost, the pass per
day (IST days, today included, rounded to 10 paise), days to a first paper.

**Diwali tab** (`components/marketing/DiwaliOfferTab.*`): same logic, dates and dismiss; now a painted turmeric
tab with ink text (7.7:1) and the price in Zodiak (Switzer has no ₹).

**Header and footer**: with the platform on, Learn is the first menu group and the bar's action is "Start free"
(`START_FREE` in `lib/site.ts`); the Learn card no longer says "Now live: CBSE Class 10" (the live site has many
classes; CBSE 7 has none ready, so it now says "opening subject by subject"). The footer line and action follow
the flag. `marketing-nav.spec.ts` updated to match (group order, the action's name and href).

**Moved and retired**: the before/after assignment toggle (`Shift`) moved to `/schools`. Retired from the
repo: `Hero`, `Belief`, `Subjects`, `Audiences`, `JournalTeaser`, `MethodModule`, `FutureBuildersFeature`, and
the AI-generated `public/video/soyl-loop.mp4` with its poster (no remaining use). `ProofStrip` and `HowItWorks`
are kept for `/schools` (phase 5). The classic `MiniSimulator` on `/teachers` and `/students` now shares its
question logic with the ring (`components/home/coordinates.ts`).

**Photographs**: `tools/assets/fetch-pexels.mjs` (reads `PEXELS_API_KEY` from `.env.local`, never prints it) wrote
three photographs to `public/photos/` and `content/credits.ts`; the credits render on `/about`.

**SEO**: home title "SOYL Academy | The whole syllabus, free. CBSE and ICSE/ISC, Classes 7 to 12", new home and
site descriptions and keywords, the home share card, `llms.txt` and `llms-full.txt` (a free-learning FAQ).
`/schools` takes the "Interactive Assignments for Grades 1–10" title.

## How to verify

```
npm run lint
npm run test:home                                   # 13 tests: numbers from config, the taste snapshot
NEXT_PUBLIC_PLATFORM_ENABLED=true npm run build && NEXT_PUBLIC_PLATFORM_ENABLED=true npx next start -p 3311
npm run build && npx next start -p 3311             # flag off
```

Run on 2026-11-10/11 (Windows 11, Node 24, Chrome):

- `npm run lint` clean; `npm run test:home` 13/13; `npm run build` exit 0 with the flag on and with it off.
- Flag on, homepage: keyboard play of the ring question (Tab reaches the grid; a wrong try draws 112deg and
  leaves a mark; the right answer reaches 360deg and says "You worked it out"); picking ICSE / ISC and 12 makes
  the action `/learn/cisce/12`, changes the taste to ISC 12 Physics and writes `board` and `classLevel` into
  `soyl_guest_v1`; reduced motion at 390 px: nothing pending or invisible; without JS: every section's text in
  the HTML and nothing hidden; LCP is the ring plate (390 and 1440 px); homepage paint 176 KB at 390 px,
  165 KB at 1440 px (budget 350 KB); headlines two lines or fewer at 390, 768 and 1440.
- Phase 1 checks, flag on and flag off: every page and endpoint in `platform/e2e/marketing/routes.ts` with its
  expected status; no horizontal scroll on 21 pages at 360, 390, 768, 1024 and 1440 px; height identical at load
  and at the bottom; brand fonts; no third-party font request.
- Flag off: no `href` to `/learn`, `/tests`, `/ask`, `/plans`, `/me`, `/leaderboard`, `/dashboard`, `/store` or
  `/coins` on any of the 22 marketing pages.
- Looked at by eye: the homepage at 1440 and 390 px in both flag states, the solved ring, the door cards.

## Not run

- The platform e2e suites (including the updated `marketing-nav.spec.ts`), the design-system e2e, the marketing
  regression (expected to show diffs until the owner approves a re-baseline), Lighthouse and axe.

## Known gaps / follow-ups

- **Exam dates.** cbse.gov.in lists "Date Sheet for Class X and Class XII Board Examinations, 2027"
  (`documents/Datesheet_ClassX _XII_2027_Main_06112026.pdf`, 4.48 MB). News reports say papers start
  16 February 2027. It was not downloaded or read, so `content/exam-dates.ts` is empty and the clock shows the
  month. Once the sheet is read, add one entry per class with its URL; the tests check the source domain.
  CISCE had not published on 10 Nov.
- **The doubt card** has no answer. If the owner wants one, record a real exchange from `/ask` and add it.
- **The door question** is the coordinate grid for every class; plan phase 6 swaps in one objective question per
  class from authored content.
- `door-wash`, `ledger-wash`, `report-wash` and `fb-sun` plates are not painted yet; the home uses the existing
  plates.
- The cookie bar still has the old pill buttons (phase 5).

Decisions made: ADR-028 covers the shared files touched (`app/globals.css`: type utilities). The guest-storage
key instead of `soyl.door` is recorded above.

Needs from owner: OK to download and read the CBSE date sheet PDF; a look at the branch preview.
