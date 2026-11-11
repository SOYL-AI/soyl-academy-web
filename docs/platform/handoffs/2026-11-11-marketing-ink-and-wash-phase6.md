# marketing — Ink and wash, phase 6 (finish) and integration — 2026-11-11

Status: done on branch `marketing/ink-and-wash` (draft PR #23). The app theme (phase 4) is its own draft PR, #24,
stacked on #23. Not merged, not deployed, the visual baseline not re-captured (`marketing:baseline` needs the
owner's word).

Plan: `docs/redesign-ink-and-wash.md` §6 phase 6, and the integration of phases 3, 5a and 5b, which were built in
parallel on their own branches and merged here (each has its own handoff dated 2026-11-11).

## Phase 6

**The door's question, per class** (`components/home/RingQuestion.tsx`). The ring asks one objective question for
the board and class picked on the door, verbatim from an authored chapter of the same subject as the taste:
`content/door-questions.generated.ts`, written by `scripts/build-taste.mjs` (four plain-text options, exactly one
right, stem under 130 characters, no maths markup, a real question before a sentence to complete, easiest first;
the authored explanation without its option letter). Each wrong answer draws a third of the ring (two at most) and
stays as a struck madder option; the right one closes the ring, the wash blooms and the explanation shows. Wrong
options keep focus (`aria-disabled`, not `disabled`). Changing the class changes the question and resets the ring.
Classes 7 and 8 have no chapter yet: the question is from Class 9 and says so. With the platform on, a solved
question offers "Practise this chapter". The coordinate grid stays on `/teachers` and `/schools` (`MiniSimulator`).
The question file is separate from the taste snapshot so the hero does not ship the whole snapshot.

**Your syllabus, counted** (`components/home/SyllabusCount.tsx`, plan §4 device 3), at the end of the taste
section: per subject, the chapters of the 2026-27 syllabus as squares, washed in where a chapter is released,
outlined where it is still to come; the count of chapters written for the chosen class. Counted at build time from
`platform/catalog/<board>/.../syllabus.yaml` and the released chapters on disk; nothing typed by hand. Subjects:
every one with a released chapter, then the class's core subjects. A class with nothing yet says its chapters are
being written and links to the nearest open class. The generator also reads the catalog's CRLF files correctly now
(subject names had fallen back to slugs). `/learn` already says per class how many courses are ready, so no second
count was added there.

**Share cards** (`app/og/route.tsx`): paper, the title in Zodiak with the indigo stroke, the description in
Switzer, the painted ring closed over its wash at the right edge. satori reads neither WebP nor WOFF2, so
`tools/art/og.py` writes two small PNG plates beside the route (44 KB) and `scripts/fetch-fonts.mjs` also fetches
`zodiak-400.woff` and `switzer-500.woff`, best effort (no network: default font, nothing fails). The card text
still comes only from the page registry.

**The stamp** for streak days lives in the app kit (phase 4, `components/platform/ui/kit/Stamp.tsx`) and is mounted
on the learning home and in the daily check-in in PR #24. No marketing page shows one.

**Credits** for the photographs are on `/about` (phase 2, restyled in 5b).

## Integration

- Merged `marketing/ink-and-wash-phase3` (/plans, /parents), `-phase5a` (/schools, /teachers, /students, /method)
  and `-phase5b` (/about, /journal, /contact, /book-a-demo, /what-we-teach, legal, 404, cookie bar, forms). No
  conflicts.
- Follow-ups the page agents could not make (shared files): the /students and /parents menu lines in `lib/site.ts`;
  grade ranges written "1 to 10"; legal page titles name the site once; the homepage ledger reads the shared free
  list (`FREE_ALWAYS`); `revamp.spec.ts` expects the paper ground on marketing pages.
- Retired: the eight generated photographs no page uses (1.9 MB), `components/home/FinalCta`, `ui/ProductShot`,
  `ui/ComingSoon`, `media/VideoLoop`, the unread `photo` field of the journal entries, and four unused home content
  blocks. The Future Builders pages keep `student_thinking_portrait.jpg`, `future-builders/*`, `PageHero`,
  `ui/Button`, `ui/Field`, `media/Photo`, `seo/Faq`. `content/media-prompts.md` records what went.
- Performance: the hero ring's layers and the page-intro photo use `fetchPriority="high"` and eager loading (Next 16
  deprecates `priority`; React preloads the first copy of an image it meets, which was the faint ghost ring); Inter
  is no longer preloaded on every page (no Ink and wash page uses it). The footer's SOYL wordmark is drawn by CSS.

## Blind review

A reviewer who saw only screenshots of all 22 pages at 390 and 1440 (no code, no brief beyond the design rules)
found nothing from the not-allowed list outside Future Builders. Fixed from its list (`74a79685`): one opener size for
every inner page (4.2rem at most) with deliberate breaks on /about and /teachers and the stroke under /parents; one
current menu group (/method sits in two); level footer columns; washes visible on phones; the /method route on one
row at 390; copy for Indian schools (the method's examples, CBSE and ICSE named where Common Core was, "five verbs",
"programmes"); journal reading times that match the essays. Two of its findings were the test set-up, not the site:
/plans cannot load prices without the platform API, and full-page captures taller than Chrome's limit repeat.

## Checks (final build)

| Check | Result |
|---|---|
| `npm run lint`, `tsc --noEmit` | clean |
| Build, flag off / flag on | pass / pass |
| `test:home` / `test:pricing` / `test:platform-web` | 18 / 43 / 464 passed |
| `test:platform-ui` | 645 passed, 1 failed: `visual-v2` "table", which fails the same way on the base (two authored tables contain "expression ("; a separate task) |
| Statuses, five widths, stable heights, fonts (22 pages, 10 endpoints) | 0 problems, flag off and on |
| Platform links with the flag off | none on 21 pages |
| Homepage: keyboard play, reduced motion, no JS, LCP element, paint | pass; LCP is the ring; paint 165 to 176 KB |
| axe (WCAG 2.1 A and AA), 23 pages at 390 and 1440, plus the answered ring and the open cookie bar | no violations |
| Lighthouse mobile, `/` | performance 86 to 93 over four runs (simulated LCP 3.3 to 4.3 s), accessibility 100, best practices 96, SEO 100, CLS 0, TBT about 30 ms |
| Lighthouse mobile, `/plans` | 100, 100, 96, 100 |
| Lighthouse mobile, `/parents` | 87 to 88, 100, 100, 100 |

Best practices is 96 only because, locally, the link prefetch of `/learn/...` returns 500 (no platform API runs on
the laptop). Not run: the platform e2e suites, and `marketing:regression`, which is expected to fail until the
owner approves a new baseline (every marketing page changed under ADR-028).

## Open, for the owner

From the blind review, decisions rather than fixes:

- **Future Builders reference price.** ₹11,999 is struck through as the list price ("Save ₹8,700"), but the same
  cards say the fee is ₹9,999 once the offer ends, so nobody pays ₹11,999. Showing a price nobody is charged as the
  "was" price risks parents' trust (and consumer rules on reference prices). Suggest striking ₹9,999 and "Save ₹6,700",
  or charging ₹11,999 after the offer. Not changed: it is a pricing decision.
- **Future Builders photographs** look generated (nonsense formulas on the whiteboard); those pages kept their old
  look by decision. The "Photography is illustrative." footer line stays while any are used.
- **Naming:** "Classes 7 to 12" for learning beside "Grades 1 to 10" for school assignments; camp, cohort and
  programme for Future Builders; soylai.com beside outreach@soyl.cloud; the phone number written two ways.
- **/parents says** "An account needs only an email address. No name, phone number or school is required." The
  privacy policy lists names and phone numbers among what is collected (for Future Builders registrations). Worth
  one sentence in either place so they do not read as a contradiction.
- The `/what-we-teach` workshop cards read generic ("is a superpower", "Prompt engineering"); they are the old copy.
- The Diwali chip sits over the lower part of the ring on a phone's first screen until dismissed (it ends 15 Nov).

1. **The weekly report a parent is promised does not exist** (phase 3 finding): no route, job or email builds it.
   Pro and the Board Exam Pass are sold with it, and the homepage clock and `/plans` say so. The `/parents` and
   `/plans` sample is labelled "Sample" with made-up figures. Build it before billing goes on, or stop promising it.
2. `/refund-policy` covers only the Future Builders camp; AI plans need a section before billing goes on.
3. The CBSE 2027 date sheet is published on cbse.gov.in; with the owner's permission to download it,
   `content/exam-dates.ts` gets the first paper dates and the clock shows days instead of "Board exams begin in
   February." CISCE has not published.
4. Gradients kept in the app for a decision: the coin store's night sky, the rank-card metals, the league tint
   (PR #24).
5. Approve a new marketing baseline (`npm run marketing:baseline -w @soyl/e2e`) once the pages are accepted.
6. Instrument Serif can leave `app/layout.tsx` once PR #24 merges (the kit stops reading it there).
