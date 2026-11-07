# subject-producer — CBSE Class 9 Mathematics, hand-authored chapters — 2026-11-04 to 2026-11-07

Status: done (15 of 15 chapters committed)

Branch: `platform/subject-producer/cbse-9-mathematics` (worktree `C:/Users/Prabhu/soyl-wt/content-cbse9-mathematics`, from `platform/main` at 9f19bd6, with `platform/main` merged at 72f2a9e for the a1ae318 API hook-timeout fix). Not pushed, not merged.

## What changed
New chapters under `platform/content/authored/maths/cbse-9-mathematics-chNN/`, in the same `maths` family folder that CBSE 10 Mathematics uses. Each has `release.json`, `tests.json`, `README.md` and a deterministic builder in `src/`:
- `build.mjs`: decks, notes and flashcards inline;
- `questions*.mjs`;
- chapter helpers such as figures, number utilities and the seeded simulation.

The shared builder `lib.mjs` is kept once, in `cbse-9-mathematics-ch01/src/lib.mjs`; every other chapter's `lib.mjs` is a two-line re-export. It is the CBSE 11 Mathematics builder with these changes:
- CBSE 9 ids and the class-9 default blueprints;
- `mk.match`;
- a per-chapter author recorded in provenance;
- the pipeline's stage-4 lint, stage-5 deterministic verify checks and the DB-6 answer-leak scan run inside `build()`.

| Chapter | Commit | Decks (slides) | Notes sections | Flashcards | Questions | App+ items |
|---|---|---|---|---|---|---|
| ch01 Number System | a87d8866 | 2 (19 + 18) | 7 | 31 | 59 | 61% |
| ch02 Introduction to Polynomials | f0730379 | 2 (16 + 17) | 7 | 30 | 59 | 63% |
| ch03 Sequences and Progressions | ce4e7e63 | 2 (19 + 20) | 7 | 31 | 60 | 65% |
| ch04 Exploring Algebraic Identities | 93f2d4a8 | 2 (18 + 20) | 6 | 30 | 60 | 62% |
| ch05 Linear Equations in Two Variables | 4cdab1f2 | 2 (17 + 17) | 6 | 30 | 60 | 48% |
| ch06 Coordinate Geometry | df8579d3 | 2 (15 + 17) | 6 | 30 | 60 | 55% |
| ch07 Introduction to Euclid's Geometry: Axioms and Postulates | a27a400c | 2 (17 + 19) | 6 | 32 | 58 | 55% |
| ch08 Lines and Angles | 67429d83 | 2 (19 + 20) | 6 | 32 | 58 | 62% |
| ch09 Triangles – Congruence Theorems | ff31e771 | 2 (19 + 17) | 6 | 30 | 56 | 63% |
| ch10 4-gons (Quadrilaterals) | 3bcf6b81 | 2 (20 + 19) | 6 | 30 | 56 | 63% |
| ch11 Circles | a57af1b9 | 2 (21 + 20) | 6 | 32 | 66 | 64% |
| ch12 Area and Perimeter | 5bd225f5 | 2 (20 + 20) | 6 | 31 | 66 | 64% |
| ch13 Surface Area and Volume | 78153b79 | 2 (20 + 20) | 6 | 32 | 71 | 63% |
| ch14 Statistics | ae84351f | 2 (17 + 20) | 5 | 31 | 68 | 62% |
| ch15 Introduction to Probability | 1a236312 | 2 (17 + 17) | 7 | 30 | 64 | 64% |

### Who wrote each chapter (D-050)
| Chapter | Writer |
|---|---|
| ch01–ch02 | Sonnet 5.5 writer (Agent tool, `model: "sonnet"`), one writer for both. A session limit cut it off and it was resumed. |
| ch03–ch04 | Sonnet 5.5 writer, one writer for both. Also cut off by a session limit and resumed. |
| ch05–ch06 | Sonnet 5.5 writer, one writer for both |
| ch07–ch08 | Sonnet 5.5 writer, one writer for both |
| ch09–ch10 | Sonnet 5.5 writer, one writer for both. Cut off by a session limit and resumed. |
| ch11–ch12 | Sonnet 5.5 writer, one writer for both. Cut off by a session limit and resumed. |
| ch13–ch14 | Sonnet 5.5 writer, one writer for both |
| ch15 | Sonnet 5.5 writer |

At most two writers ran at a time. The producer (Claude Opus 5.5) reviewed every chapter: scope against the new syllabus, computed answers, competency tags, and assumptions where the syllabus is thin. The producer then fixed what needed fixing, gated and committed. No chapter needed the Opus quality fallback. Every item's provenance names the Sonnet writer and the Opus reviewer.

### Scope and rules
- **Syllabus.** The chapters follow `catalog/cbse/9/mathematics/syllabus.yaml`: the new 2026–27 NCERT Class 9 book, 15 chapters. Where the syllabus is thin, each README records what was assumed:
  - no AP or GP sums in ch03;
  - no pairs of equations in ch05;
  - only axis-parallel distance in ch06;
  - cautious history in ch07 and ch12;
  - the triangle angle sum flagged as proved from parallel lines in ch08;
  - inclusive 4-gon definitions in ch10;
  - no tangents in ch11;
  - no combinations of solids in ch13;
  - no grouped mean, median or mode in ch14;
  - simple sample spaces only in ch15.
- **Tests.** Each chapter has `t_cbse9math_chNN_short` (20 marks, 40 min) and `t_cbse9math_chNN_long` (40 marks, 90 min), on `cbse-9-default-chapter-test-short` and `-long`.
- **Answers.** Every answer is computed in code and asserted by an independent re-solve check. π is stated in every circle item. Constructed data are labelled.
- **Status.** All items are `status: "draft"`, provenance `human` (D-026, D-050).

### Competency (honest tagging)
- ch03 and ch04: the writer had re-tagged 9 items in ch03 and 11 in ch04 as "understanding" to reach the 45–65% band. The producer checked each one:
  - ch04: all 11 were confirmed as routine one-step items.
  - ch03: six were confirmed. Three were restored to application because they model a context: the Koch snowflake side count, a taxi fare as an AP, and a bouncing ball as a GP. ch03 now sits at 65%, the top of the band.
- ch01: the writer's five re-tags were checked by listing all of ch01's understanding items. They are routine.
- ch05–ch15: the writers were told not to re-tag. Where a chapter was over the band, they changed the item mix instead, by dropping unused application items and adding recall or understanding items.

## How to verify
From `platform/` in the worktree:
```
npm run content -- catalog
npm test -w @soyl/content-templates
npm run content -- lint --exemplars
npm run content -- verify --board cbse --class 9 --subject mathematics --authored
npm run content -- originality --authored
npx vitest run --root db test/db6-split.test.ts
npx vitest run --root api test/content.test.ts
```
Results of the last full run (under the shared `heavy.sh` lock):
- catalog: valid, 0 errors, 0 warnings
- content-templates: 4446 tests passed
- lint --exemplars: exit 0
- verify --board cbse --class 9 --subject mathematics --authored: 15 units, 921 questions, 0 blocking flags
- originality --authored: 635 units, 0 errors
- db6-split: 8 passed
- api content (with a1ae318's 900 s hook budget): 13 passed

## Tests added
None (content only).

## Review fixes by the producer (beyond the writers' own)
- **Originality.** The originality gate compares the words of each stem with the maths set aside. Short generic maths stems therefore matched CBSE 10 and ICSE 10 banks, or other stems in the same chapter, even with different numbers ("The remainder when … is divided by … is", "The midpoint of the segment joining … is"). The producer gave 33 stems in ch02–ch06, ch08 and ch10–ch13 their own context, and after merging platform/main gave 2 more ch06 stems their own context because they matched the new CBSE 11 Mathematics ch11 (three-dimensional geometry). One ch04 assertion-reason pair was reworded. The answers did not change.
- **ch05.** The notes' general `y = mx + c` was replaced by the chapter's own taxi line, so no slope-intercept notation appears.
- **Shared lib.** `mk.match` was added to the shared lib, as a writer suggested.

## Known gaps / follow-ups
- Narration audio is not generated (TTS stage).
- The writers did not render `geom()` figures to images. Every figure's coordinates, lengths and angles are asserted in the build, and the lint checks labelled angles against the drawn coordinates. A visual pass in the app is still worthwhile.
- ch10 uses inclusive definitions: a trapezium has at least one pair of parallel sides. Check this against the printed new NCERT book.
- Facts a reviewer may wish to double-check, especially the historical statements in ch07 and ch12, are listed in each README.

## Decisions made
No ADRs. No shared files, schemas, catalog, templates, tests or marketing files were touched.

## Needs from owner
None.
