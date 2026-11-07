# CBSE Class 9 Mathematics, Chapter 14 — Statistics

`cbse-9-mathematics-ch14` · release v1 · academic year 2026-27 · family `maths` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 20 slides), notes (5 sections), 31 flashcards, 68 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse9math_ch14_short` (20 marks, 40 min) and `t_cbse9math_ch14_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-9-default-chapter-test-short` / `-long` (the subject has no chapter-test blueprints of its own). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the shared CBSE 9 Mathematics builder, kept once in `cbse-9-mathematics-ch01/src/lib.mjs` and re-exported by the other chapters; the CBSE 11/12 Mathematics builder with CBSE 9 ids and blueprints; KaTeX strict parsing, plot and geometry checks, an independent re-solve of every answer, and the pipeline’s lint, verify checks and answer-leak scan run inside the build), `build.mjs`, `questions.mjs` and chapter helpers. Rebuild from `platform/`: `npx tsx content/authored/maths/cbse-9-mathematics-ch14/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/resolve.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 syllabus, new NCERT Class 9 book under NCF-SE 2023)
- All 3 syllabus topics are covered: t01 Collecting and organising data; t02 Weighted average; t03 Stacked bar graphs and other representations.
- Mean, median and mode of grouped data are Class 10 and are not taught; the simple mean appears only to contrast with the weighted average. One unequal-width histogram (frequency density, area = frequency) is included at Class 9 level.
- Facts a reviewer may wish to double-check: Class intervals include the lower limit and exclude the upper; tally groups of five; weighted averages for exam scores, a rice or tea mix and a cost-of-living basket. All data sets are invented and labelled.

## Shape
- **Part 1, 17 slides:** what you will be able to do; primary and secondary data; tally marks; worked example 1: shoe sizes; grouping data into classes; worked example 2: homework times; bar graphs; worked example 3: reading a bar graph; stacked bar graphs; worked example 4: reading stacked bars; choosing the right graph; summary; exam tips; 3 checks.
- **Part 2, 20 slides:** what you will be able to do; the weighted mean; simple mean or weighted mean?; worked example 1: a final grade; worked example 2: a mixture of rice; worked example 3: a cost-of-living basket; histograms; histogram or bar graph?; worked example 4: drawing a histogram; unequal class widths; worked example 5: frequency density; frequency polygons; worked example 6: points of the polygon; a polygon over a histogram; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 9 · diagram 6 · example 10 · check 6 · summary 2 · exam-tips 2. Visuals: flow 4 · geometry 11 · plot 2 · table 18. Bar graphs, stacked bar graphs, histograms (equal and unequal widths) and frequency polygons drawn from computed heights, each height asserted. Narration max 67 words, mean 49; no symbols, LaTeX or letter abbreviations.

## Question bank (68)
| Type | Count | Marks |
|---|---|---|
| mcq | 25 | 1 (keys a 7, b 6, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a c d b a c) |
| true-false | 6 | 1 |
| fill-blank | 4 | 1 |
| match | 2 | 2 |
| numerical | 2 | 1–3 (82; 49.6) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 5 | 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 27 · d2 27 · d3 13 · d4 1.
- **Competency:** recall 8 · understanding 18 · application 28 · analysis 13 · evaluation 1. Application or higher is **62% of items (74% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 19 · t02 16 · t03 34.
- **Deck checks:** q001, q002, q003 (Part 1); q004, q005, q006 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 9 class-default blueprints)
- **Short (20 marks, 40 min):** A q009, q013, q016, q022 · B q041, q042, q048 · C (q053 or q055) · D q058.
- **Long (40 marks, 90 min):** A q008, q010, q012, q015, q017, q018, q019, q020, q023, q024 · B q040, q043, (q044 or q045), q050, (q051 or q052) · C q054, (q056 or q057) · D q059, q060.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; 1169 math strings parsed with KaTeX 0.19.0 (throwOnError, strict: error), 0 failures; 0 LaTeX commands missing their backslash; 0 LaTeX outside $…$; 2 deck plots + 2 notes/question plots: 0 marked points all on their curves and matching their labels; 0 zeros located numerically and all marked; 0 intersection points lie on both lines; narration 37 slides, max 67 words, mean 49; no symbols, LaTeX or letter abbreviations; re-solve 133/133 checks pass (independent arithmetic from the givens; keys, numerical values, and the numbers inside solutions and model answers).
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-04-subject-producer-cbse9-mathematics.md`.

## Verifier pass (2026-11-04)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet) to the producer brief; the producer reviewed scope against the new syllabus, the computed answers and the competency tags (62 %, by changing the item mix, not by re-tagging), and rebuilt from source.
2. **Fixes by the writer.** Captions that read as a URL scheme were reworded and two model answers completed.
3. **Every frequency, total and weighted average is computed and asserted (133 re-solve checks).**

## Known gaps
- Narration audio is not generated (TTS stage).

