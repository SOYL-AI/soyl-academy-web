# CBSE Class 9 Mathematics, Chapter 9 — Triangles – Congruence Theorems

`cbse-9-mathematics-ch09` · release v1 · academic year 2026-27 · family `maths` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (19 + 17 slides), notes (6 sections), 30 flashcards, 56 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse9math_ch09_short` (20 marks, 40 min) and `t_cbse9math_ch09_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-9-default-chapter-test-short` / `-long` (the subject has no chapter-test blueprints of its own). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the shared CBSE 9 Mathematics builder, kept once in `cbse-9-mathematics-ch01/src/lib.mjs` and re-exported by the other chapters; the CBSE 11/12 Mathematics builder with CBSE 9 ids and blueprints; KaTeX strict parsing, plot and geometry checks, an independent re-solve of every answer, and the pipeline’s lint, verify checks and answer-leak scan run inside the build), `build.mjs`, `questions.mjs` and chapter helpers. Rebuild from `platform/`: `npx tsx content/authored/maths/cbse-9-mathematics-ch09/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/resolve.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 syllabus, new NCERT Class 9 book under NCF-SE 2023)
- All 4 syllabus topics are covered: t01 Rigidity of triangles; t02 Congruence criteria: SAS, ASA, SSS, RHS, AAS; t03 Properties of isosceles triangles; t04 Propositions and converses; why SSA fails.
- AAA and inequalities in triangles are not taught (not in this syllabus). AAS and the right angle in RHS are part of the given data. A rigid frame of n sides needs n − 3 braces (stated at Class 9 level).
- Facts a reviewer may wish to double-check: Isosceles theorem proved by the apex bisector and SAS, converse by AAS; SSA counter-example A = 45°, AB = 4√2, BC = 5 giving AC = 1 or 7 (and AB = 6√2, BC = 6.5 giving 3.5 or 8.5), computed and drawn.

## Shape
- **Part 1, 19 slides:** what you will be able to do; a frame of four bars wobbles, a frame of three does not; triangles in structures; bracing a four-sided frame; congruent triangles; corresponding parts: CPCT; test 1: side angle side (SAS); test 2: side side side (SSS); worked example 1: a kite-shaped plot; test 3: angle side angle (ASA); test 4: angle angle side (AAS); test 5: right angle, hypotenuse, side (RHS); worked example 2: pegs of a tent; summary; exam tips; 3 checks.
- **Part 2, 17 slides:** what you will be able to do; parts of an isosceles triangle; theorem: equal sides, equal angles; converse: equal angles, equal sides; propositions and converses; worked example 1: find x; equilateral triangles; a warning: two sides and an angle not between them; sSA is not a congruence test; how many triangles does SSA give?; worked example 2: equal altitudes; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 7 · diagram 13 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: flow 4 · geometry 20 · table 12. About twenty computed figures (a leaning rectangle beside a rigid 3-4-5 triangle, a braced frame, congruent pairs for SAS, SSS, ASA, AAS and RHS, a kite, isosceles and equilateral triangles, the SSA pair overlaid and side by side). Narration max 80 words, mean 57; no symbols, LaTeX or letter abbreviations.

## Question bank (56)
| Type | Count | Marks |
|---|---|---|
| mcq | 20 | 1 (keys a 5, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a b d c a d) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| short (2 marks) | 8 | 2 |
| short (3 marks) | 5 | 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 12 · d2 29 · d3 13 · d4 2.
- **Competency:** recall 2 · understanding 19 · application 19 · analysis 16. Application or higher is **63% of items (77% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 7 · t02 20 · t03 18 · t04 16.
- **Deck checks:** q001, q002, q003 (Part 1); q004, q005, q006 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 9 class-default blueprints)
- **Short (20 marks, 40 min):** A q007, q010, q014, q021 · B q035, q038, q043 · C (q048 or q050) · D q053.
- **Long (40 marks, 90 min):** A q008, q009, q011, q012, q013, q015, q016, q018, q022, q023 · B q036, q039, (q037 or q040), q044, (q045 or q046) · C q049, (q051 or q052) · D q054, q055.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; 1087 math strings parsed with KaTeX 0.19.0 (throwOnError, strict: error), 0 failures; 0 LaTeX commands missing their backslash; 0 LaTeX outside $…$; 0 deck plots + 0 notes/question plots: 0 marked points all on their curves and matching their labels; 0 zeros located numerically and all marked; 0 intersection points lie on both lines; narration 36 slides, max 80 words, mean 57; no symbols, LaTeX or letter abbreviations; re-solve 118/118 checks pass (independent arithmetic from the givens; keys, numerical values, and the numbers inside solutions and model answers).
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-04-subject-producer-cbse9-mathematics.md`.

## Verifier pass (2026-11-04)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet) to the producer brief; the producer reviewed scope against the new syllabus, the computed answers and the competency tags (application or higher 63 %, reached by changing the item mix, not by re-tagging), and rebuilt from source.
2. **Fixes by the writer.** Long narrations trimmed, a rupee sign moved out of maths, a model-answer check and an options check corrected.
3. **Every length and angle is computed from coordinates and asserted (118 re-solve checks).**

## Known gaps
- Narration audio is not generated (TTS stage).

