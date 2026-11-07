# CBSE Class 9 Mathematics, Chapter 6 — Coordinate Geometry

`cbse-9-mathematics-ch06` · release v1 · academic year 2026-27 · family `maths` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 17 slides), notes (6 sections), 30 flashcards, 60 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse9math_ch06_short` (20 marks, 40 min) and `t_cbse9math_ch06_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-9-default-chapter-test-short` / `-long` (the subject has no chapter-test blueprints of its own). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the shared CBSE 9 Mathematics builder, kept once in `cbse-9-mathematics-ch01/src/lib.mjs` and re-exported by the other chapters; the CBSE 11/12 Mathematics builder with CBSE 9 ids and blueprints; KaTeX strict parsing, plot and geometry checks, an independent re-solve of every answer, and the pipeline’s lint, verify checks and answer-leak scan run inside the build), `build.mjs`, `questions.mjs` and chapter helpers. Rebuild from `platform/`: `npx tsx content/authored/maths/cbse-9-mathematics-ch06/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/resolve.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 syllabus, new NCERT Class 9 book under NCF-SE 2023)
- All 2 syllabus topics are covered: t01 Cartesian plane and plotting points; t02 Distance and midpoint in the plane.
- Distance is taught as the syllabus line says, along lines parallel to the axes (and as distances from the axes); the general distance formula is left to Class 10. The midpoint formula and finding an end point from the midpoint are taught.
- Facts a reviewer may wish to double-check: Quadrants numbered anticlockwise from the top right; abscissa and ordinate; chessboard as (column, row) from 1 to 8; place names are context labels only.

## Shape
- **Part 1, 15 slides:** what you will be able to do; the axes, the origin and the quadrants; signs tell the quadrant; ordered pairs: the order matters; worked example 1: where does each point lie?; points on the axes; worked example 2: the fourth corner of a rectangle; a chessboard is a grid; worked example 3: reading a city plan; summary; exam tips; 3 checks.
- **Part 2, 17 slides:** what you will be able to do; points on a horizontal line; points on a vertical line; distance of a point from the axes; worked example 1: three distances; distance along the streets; midpoint on a horizontal line; the midpoint formula; worked example 2: midpoints; finding the other end; worked example 3: a lamp post on a road; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 3 · diagram 11 · example 6 · check 6 · summary 2 · exam-tips 2. Visuals: flow 4 · plot 15 · table 5. Coordinate-plane plots for a city plan, quadrants, points on the axes, a rectangle’s fourth corner, a chessboard, axis-parallel segments, a street route and midpoints. Narration max 73 words, mean 52; no symbols, LaTeX or letter abbreviations.

## Question bank (60)
| Type | Count | Marks |
|---|---|---|
| mcq | 20 | 1 (keys a 5, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a d b c a d) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 5 | 1–3 (12; 5; 7; 45; 8) |
| short (2 marks) | 7 | 2 |
| short (3 marks) | 5 | 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 20 · d2 29 · d3 10 · d4 1.
- **Competency:** recall 6 · understanding 21 · application 24 · analysis 9. Application or higher is **55% of items (68% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 29 · t02 39.
- **Deck checks:** q002, q006, q010 (Part 1); q011, q013, q019 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 9 class-default blueprints)
- **Short (20 marks, 40 min):** A q001, q007, q012, q021 · B q043, q044, q050 · C (q052 or q054) · D q057.
- **Long (40 marks, 90 min):** A q003, q004, q005, q008, q009, q014, q015, q017, q022, q023 · B q040, q045, (q041 or q046), q048, (q049 or q051) · C q053, (q055 or q056) · D q058, q059.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; 1292 math strings parsed with KaTeX 0.19.0 (throwOnError, strict: error), 0 failures; 0 LaTeX commands missing their backslash; 0 LaTeX outside $…$; 15 deck plots + 16 notes/question plots: 105 marked points all on their curves and matching their labels; 0 zeros located numerically and all marked; 0 intersection points lie on both lines; narration 32 slides, max 73 words, mean 52; no symbols, LaTeX or letter abbreviations; re-solve 114/114 checks pass (independent arithmetic from the givens; keys, numerical values, and the numbers inside solutions and model answers).
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-04-subject-producer-cbse9-mathematics.md`.

## Verifier pass (2026-11-04)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet); competency tags honest with no re-tagging (55 %). The producer reviewed scope.
2. **Fixes by the writer.** String-quoting slips only.
3. **Originality gate.** Generic stems that matched other banks or this chapter word for word (once the maths is set aside) were rewritten by the producer with their own context.
4. **Every coordinate, distance and midpoint is computed and asserted (114 re-solve checks).**

## Known gaps
- Narration audio is not generated (TTS stage).

