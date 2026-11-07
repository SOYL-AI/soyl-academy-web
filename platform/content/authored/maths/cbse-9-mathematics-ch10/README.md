# CBSE Class 9 Mathematics, Chapter 10 — 4-gons (Quadrilaterals)

`cbse-9-mathematics-ch10` · release v1 · academic year 2026-27 · family `maths` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (20 + 19 slides), notes (6 sections), 30 flashcards, 56 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse9math_ch10_short` (20 marks, 40 min) and `t_cbse9math_ch10_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-9-default-chapter-test-short` / `-long` (the subject has no chapter-test blueprints of its own). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the shared CBSE 9 Mathematics builder, kept once in `cbse-9-mathematics-ch01/src/lib.mjs` and re-exported by the other chapters; the CBSE 11/12 Mathematics builder with CBSE 9 ids and blueprints; KaTeX strict parsing, plot and geometry checks, an independent re-solve of every answer, and the pipeline’s lint, verify checks and answer-leak scan run inside the build), `build.mjs`, `questions.mjs` and chapter helpers. Rebuild from `platform/`: `npx tsx content/authored/maths/cbse-9-mathematics-ch10/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/resolve.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 syllabus, new NCERT Class 9 book under NCF-SE 2023)
- All 4 syllabus topics are covered: t01 Definition and types of 4-gons; t02 Midpoint theorem and its converse; t03 Medians and the Varignon parallelogram; t04 Symmetry and tiling.
- Definitions are inclusive: a trapezium has at least one pair of parallel sides, and a rectangle is a parallelogram. If the new NCERT book uses the exclusive definition (exactly one pair), a few tables need a small edit; a reviewer should check against the printed book. The angle sum of 360° is shown for convex 4-gons.
- Facts a reviewer may wish to double-check: Midpoint theorem and converse; medians concurrent (proved with the midpoint theorem and the parallelogram test, ratio 2 : 1); the Varignon parallelogram has half the area of the 4-gon (convex case, computed); symmetry counts found by testing reflections and rotations; any 4-gon tiles the plane because the angles at a point sum to 360°.

## Shape
- **Part 1, 20 slides:** what you will be able to do; what is a 4-gon?; the angles of a 4-gon add up to 360 degrees; types of 4-gon; how the types are related; the parallelogram and its diagonal; opposite sides and angles are equal; the diagonals bisect each other; the proof in steps; the converses: tests for a parallelogram; rhombus, rectangle and square; which property for which type?; worked example 1: angles of a parallelogram; worked example 2: a 4-gon whose diagonals bisect each other; summary; exam tips; 3 checks.
- **Part 2, 19 slides:** what you will be able to do; the midpoint theorem; proof of the midpoint theorem; the converse of the midpoint theorem; worked example 1: joining the midpoints; medians are concurrent; why the medians meet in one point; the midpoints of any 4-gon; proof: the Varignon parallelogram; worked example 2: perpendicular diagonals; lines of symmetry; rotational symmetry; why every 4-gon tiles the plane; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 10 · diagram 13 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: flow 5 · geometry 22 · table 12. Computed figures for the six 4-gon types, the angle sum, parallelogram properties, a rhombus and rectangle, the midpoint theorem and its proof, the medial triangle, medians meeting at G, the Varignon figure, lines of symmetry, rotational symmetry and a tiling of four copies meeting at a point. Narration max 86 words, mean 60; no symbols, LaTeX or letter abbreviations.

## Question bank (56)
| Type | Count | Marks |
|---|---|---|
| mcq | 20 | 1 (keys a 5, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a c b d a b) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| short (2 marks) | 8 | 2 |
| short (3 marks) | 5 | 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 15 · d2 28 · d3 12 · d4 1.
- **Competency:** recall 1 · understanding 20 · application 22 · analysis 13. Application or higher is **63% of items (77% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 25 · t02 12 · t03 9 · t04 10.
- **Deck checks:** q001, q002, q003 (Part 1); q004, q005, q006 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 9 class-default blueprints)
- **Short (20 marks, 40 min):** A q008, q010, q014, q021 · B q035, q038, q043 · C (q048 or q052) · D q053.
- **Long (40 marks, 90 min):** A q007, q009, q011, q012, q013, q015, q016, q018, q022, q023 · B q036, q039, (q037 or q040), q044, (q045 or q046) · C q049, (q050 or q051) · D q054, q055.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; 1238 math strings parsed with KaTeX 0.19.0 (throwOnError, strict: error), 0 failures; 0 LaTeX commands missing their backslash; 0 LaTeX outside $…$; 0 deck plots + 0 notes/question plots: 0 marked points all on their curves and matching their labels; 0 zeros located numerically and all marked; 0 intersection points lie on both lines; narration 39 slides, max 86 words, mean 60; no symbols, LaTeX or letter abbreviations; re-solve 115/115 checks pass (independent arithmetic from the givens; keys, numerical values, and the numbers inside solutions and model answers).
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-04-subject-producer-cbse9-mathematics.md`.

## Verifier pass (2026-11-04)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet) to the producer brief; the producer reviewed scope against the new syllabus, the computed answers and the competency tags (63 %, by item mix), and rebuilt from source.
2. **Fixes by the writer.** A name clash in the figures, a rectangle check, two coordinates in a long item and an unterminated string were corrected; deck 2 was trimmed to 19 slides. **Originality gate.** Generic stems that matched other banks or this chapter word for word (once the maths is set aside) were rewritten by the producer with their own context.
3. **Every length, angle and area is computed and asserted (115 re-solve checks).**

## Known gaps
- Narration audio is not generated (TTS stage).

