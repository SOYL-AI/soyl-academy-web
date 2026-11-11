# marketing — Ink and wash, phase 5a (/schools, /teachers, /students, /method) — 2026-11-11

Status: done (branch `marketing/ink-and-wash-phase5a`, from `marketing/ink-and-wash` at ac96833e). Not pushed,
not merged, not deployed, visual baseline not re-captured.

Plan: `docs/redesign-ink-and-wash.md` §3.3 (the page table), §6 phase 5 (one page per commit), §7 (rules).

## What changed

One commit per page, in this order:

1. **`/schools`** (`feat(marketing): /schools in Ink and wash`). Job: book a pilot. H1 "Homework was built for a
   world before AI.", the classroom-from-behind photograph (`face: false`), then the shift (the before/after
   assignment toggle on two `Chip`s, the SOYL card on the painted wash, the five verbs of the method beside it as
   a plain list with a link to `/method`), the six workflow steps beside the coordinate question played as a pupil
   (still the HowTo structured data at `#workflow`), the ten-week pilot drawn to scale on one ten-week track
   (`components/schools/PilotPlan.tsx`, chalk-maths photograph on wide screens only), the schools FAQ and
   `ClosingCta` (Book a demo). `ProofStrip` sits under the intro and still renders nothing (content/proof.ts is
   empty).
2. **`/teachers`** (`feat(marketing): /teachers in Ink and wash`). Same job. H1 kept ("Your notes in. Better
   homework out."), teacher-blackboard photograph (an adult), the four how-it-works steps beside the simulator
   ("What your pupils see"), "Built around your judgement." (the four in-charge points on pigment dabs), the three
   teacher questions (filtered from `homeFaqs`, unchanged) and `ClosingCta`.
3. **`/students`** (`feat(marketing): /students merged into free learning, in Ink and wash`). A short page that
   hands to the door; the URL still answers 200. "Every lesson is free." and the Classes 7 to 12 line, desk-pages
   photograph. Platform on: the homepage door's own picker (`DoorStateProvider` + `DoorPicker`, imported, not
   edited), so the action is `/learn/<board>/<class>` and the pick is shared with the homepage (`soyl_guest_v1`).
   Platform off: the door's line "Free lessons for Classes 7 to 12 open soon." and no platform link. Then the
   Future Builders card (sunflower, as on the homepage) and three student questions.
4. **`/method`** (`feat(marketing): /method as a walk with a checkpoint at each verb, in Ink and wash`). Job: earn
   belief. H1 "Learning should be demonstrated.", hands-red-pencil photograph, then the walk
   (`components/method/MethodWalk.tsx`): five stops on one route. At Understand, Apply, Create and Defend the
   reader picks which of the pillar's two real assignments (`content/method.ts`, traditional and SOYL) does what
   the question asks; a wrong pick stays marked in madder with a nudge, the right one passes and the stop's mark
   washes in from an outline. At Reflect the reader names the checkpoint that made them think hardest. The finish
   counts the tries ("5 checkpoints · 8 tries · hardest for you: Defend") and lies on the wash once all five are
   passed. Native buttons and chips only; a used option keeps focus (`aria-disabled`, never `disabled`); feedback
   is a polite live region; no library; nothing saved (a reload starts again). Then the method FAQ and
   `ClosingCta` with the existing `finalCta` copy.

Shared pieces I own, restyled:

- `components/home/HowItWorks.tsx` takes `id`, `title`, `intro`, `steps`, `tryTitle` (used by `/schools` and
  `/teachers`); no product-screenshot slots (none are real yet).
- `components/home/MiniSimulator.tsx`: on the painted wash, ink buttons, madder wrong tries, refuses a repeated
  try, no pulsing "Live" dot, focus goes back to the grid on "Try another".
- `components/home/Shift.tsx`, `AssignmentToggle.tsx`, `ProofStrip.tsx`: new type and tokens, no pill toggle,
  no highlighter accent, no numbered eyebrows.

Content (only the objects I own): `shift` (adds `due` and `note`, drops `label`), `howItWorks` (drops the unused
`label` and `media`), `method` (typed; each verb gains `why` and its `checkpoint`) in `content/home.ts`;
`schoolsFaqs` (names the same six steps the page shows; no dashes), `studentsFaqs` (rewritten for free learning:
the access rules of CONTEXT.md §5, no price, no link), `methodFaqs` (adds "Does the SOYL Method replace
teachers?", the fact the old slate block carried) in `content/faqs.ts`. `lib/seo/pages.ts`: only `/students`
(its subject changed): "For Students: Free Lessons for Classes 7 to 12" and a free-learning description.

No AI-generated image (`public/images/*`) is used on the four pages any more; nothing under `public/images/` was
deleted.

## How to verify

```
npm ci
npm run lint
npm run test:home
npm run build && npx next start --port 3323 --hostname 127.0.0.1                                    # flag off
NEXT_PUBLIC_PLATFORM_ENABLED=true npm run build && NEXT_PUBLIC_PLATFORM_ENABLED=true npx next start --port 3323 --hostname 127.0.0.1
```

Run on 2026-11-11 (Windows 11, Node 24.14, npm 11.11, Chrome via Python Playwright):

- `npm ci`: exit 0, brand fonts fetched. `npm run lint`: clean. `npm run test:home`: 13/13.
- `npm run build` flag off: exit 0 (52 pages). Flag on: exit 0 (116 pages).
- Flag off, the four pages at 360, 390, 768, 1024 and 1440 px: status 200; no sideways scroll; document height the
  same at load and after scrolling to the bottom; no console errors; no `/images/` or `/video/` source; no
  href to `/learn`, `/tests`, `/ask`, `/plans`, `/me`, `/leaderboard`, `/dashboard`, `/store` or `/coins` (also
  checked in the server HTML: 0 on each page).
- Flag on, same widths: 200, no sideways scroll, height stable. `/students` has the picker; by keyboard, ICSE / ISC
  then 12 makes the action `/learn/cisce/12`, writes `board: cisce, classLevel: 12` to `soyl_guest_v1`, and the
  homepage door then opens on Class 12.
- Keyboard, `/method` at 1440 and 390: from "Walk the five verbs", Tab and Enter or Space alone pass all five
  checkpoints; a wrong pick keeps focus and says "Not yet"; the finish reads "You walked the method." and
  "5 checkpoints · 8 tries · hardest for you: Defend".
- Keyboard, the simulator on `/teachers` and `/schools`: Tab reaches the grid; arrows and Enter check (3, 0) (one
  try, the x-is-right nudge), a repeated try is refused, (3, −2) solves with "2 tries · 0 hints"; Tab to "Try
  another", Enter, focus is back on the grid with (−4, 1); Check is focusable but marked unavailable with no
  point; Hint shows hint 1; after the last hint the button keeps focus.
- Keyboard, the toggle on `/schools`: Enter on "Traditional" shows the worksheet and hides the SOYL card; the page
  height does not change when switching.
- Visible copy on the four pages (FAQ answers opened): no em or en dash; one `h1` each.
- Looked at by eye: every page at 1440 and 390 px in both flag states, the walked `/method`, the toggle on
  Traditional, the simulator with hints.

## Not run

The platform e2e suites, the marketing regression (it will show diffs on these pages until the owner approves a
re-baseline), `marketing:baseline` (not run, as instructed), Lighthouse and axe.

## Tests added

None committed. The checks above were scripted with Python Playwright outside the repo.

## Known gaps / follow-ups

- **Nav description for `/students`** in `lib/site.ts` (shared, not mine) still says "Solve, build, argue and
  explain: learn beyond the answer." It should follow the page, for example "Free lessons for Classes 7 to 12.
  Only AI uses credits." The footer line "Interactive assignments for Grades 1–10" has an en dash (also shared).
- **Flag on without a local platform API**, Next's prefetch of `/learn/cbse/10` answers 500 in the console on
  `/students`, as it does on `/` (the door's link). Environment only (no `PLATFORM_API_ORIGIN`); not a page error.
- **Two framings of the workflow** were already on the site and both are kept: six steps on `/schools` (the HowTo
  data), four on `/teachers`. The owner may want one story.
- **New explanatory copy** on `/method`: each verb's `why` line paraphrases its pillar text, and the checkpoint
  feedback explains the pick. No outcome, number, school or quote was added. Worth an owner read.
- `content/method.ts` (not mine) keeps US spellings ("favorite", "optimize") and an em dash in a pillar paragraph
  that the page no longer shows (llms-full.txt still prints it).
- `public/images/*` photographs the four pages used to show (classroom, teacher, students building, presenting,
  debating, thinking, making, the traditional classroom, the Future Builders IoT shot) are no longer used here;
  the Lead's clean-up decides whether anything else still needs them.
- The product-screenshot slots in `content/media.ts` stay empty; `HowItWorks` can show real screenshots once they
  exist.

Decisions made: no ADR needed (no shared file touched). The wash under a product moment gets inner padding so its
ragged edge shows around the card; `/students` reuses the door's picker rather than a second picker.

Needs from owner: a read of the `/method` checkpoint copy and the new student questions; whether `/students` should
offer anything beyond the "open soon" line while the platform is off.
