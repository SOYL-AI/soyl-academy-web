# CBSE Class 9 Mathematics, Chapter 8 — Lines and Angles

`cbse-9-mathematics-ch08` · release v1 · academic year 2026-27 · family `maths` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (19 + 20 slides), notes (6 sections), 32 flashcards, 58 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse9math_ch08_short` (20 marks, 40 min) and `t_cbse9math_ch08_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-9-default-chapter-test-short` / `-long` (the subject has no chapter-test blueprints of its own). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the shared CBSE 9 Mathematics builder, kept once in `cbse-9-mathematics-ch01/src/lib.mjs` and re-exported by the other chapters; the CBSE 11/12 Mathematics builder with CBSE 9 ids and blueprints; KaTeX strict parsing, plot and geometry checks, an independent re-solve of every answer, and the pipeline’s lint, verify checks and answer-leak scan run inside the build), `build.mjs`, `questions.mjs` and chapter helpers. Rebuild from `platform/`: `npx tsx content/authored/maths/cbse-9-mathematics-ch08/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/resolve.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 syllabus, new NCERT Class 9 book under NCF-SE 2023)
- All 4 syllabus topics are covered: t01 Angles and rays; types of angles; t02 Linear pair and vertically opposite angles; t03 Parallel lines and transversals; t04 Proof by contradiction.
- The angle sum of a triangle is used, marked as a result proved from parallel lines (triangles come in ch09), in three flagged items. The corresponding-angles property is taken as an axiom; alternate and co-interior angle results are proved from it.
- Facts a reviewer may wish to double-check: Proof-by-contradiction examples: no largest even number; n² even implies n even; two distinct lines meet in at most one point. Clock-hand rates 6° and 0.5° per minute.

## Shape
- **Part 1, 19 slides:** what you will be able to do; line, segment and ray; what is an angle?; types of angle; complementary and supplementary angles; worked example 1: complement and supplement; linear pair; proof of the linear pair theorem; vertically opposite angles; vertically opposite angles are equal; worked example 2: find x; angles around a point; worked example 3: around a point; summary; exam tips; 3 checks.
- **Part 2, 20 slides:** what you will be able to do; the eight angles; corresponding, alternate and co-interior; the corresponding angles axiom; alternate and co-interior angles; worked example 1: find all eight angles; the converse: tests for parallel lines; worked example 2: find x; lines parallel to the same line; a result proved from parallel lines: the angle sum of a triangle; worked example 3: a bent path; proof by contradiction; worked example 4: two proofs by contradiction; two lines meet in at most one point; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 8 · diagram 12 · example 7 · check 6 · summary 2 · exam-tips 2. Visuals: flow 5 · geometry 22 · table 10. Twenty-one computed figures (rays and angles, linear pairs, vertically opposite angles, a transversal with all eight angles computed from ray directions, three parallel lines, a bent path between parallels, a triangle with a parallel through a vertex); every angle label is checked against the drawn coordinates. Narration max 74 words, mean 55; no symbols, LaTeX or letter abbreviations.

## Question bank (58)
| Type | Count | Marks |
|---|---|---|
| mcq | 20 | 1 (keys a 5, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a c d b a d) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 3 | 1–3 (142; 100; 90) |
| short (2 marks) | 7 | 2 |
| short (3 marks) | 5 | 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 17 · d2 26 · d3 14 · d4 1.
- **Competency:** recall 4 · understanding 18 · application 24 · analysis 12. Application or higher is **62% of items (75% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 10 · t02 20 · t03 20 · t04 9.
- **Deck checks:** q001, q002, q003 (Part 1); q004, q005, q006 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 9 class-default blueprints)
- **Short (20 marks, 40 min):** A q007, q011, q016, q021 · B q038, q041, q046 · C (q050 or q052) · D q055.
- **Long (40 marks, 90 min):** A q008, q009, q010, q013, q014, q018, q019, q020, q022, q023 · B q039, q043, (q040 or q042), q045, (q047 or q048) · C q051, (q053 or q054) · D q056, q057.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; 1346 math strings parsed with KaTeX 0.19.0 (throwOnError, strict: error), 0 failures; 0 LaTeX commands missing their backslash; 0 LaTeX outside $…$; 0 deck plots + 0 notes/question plots: 0 marked points all on their curves and matching their labels; 0 zeros located numerically and all marked; 0 intersection points lie on both lines; narration 39 slides, max 74 words, mean 55; no symbols, LaTeX or letter abbreviations; re-solve 118/118 checks pass (independent arithmetic from the givens; keys, numerical values, and the numbers inside solutions and model answers).
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-04-subject-producer-cbse9-mathematics.md`.

## Verifier pass (2026-11-04)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet); competency tags honest (62 %). The producer reviewed proofs and figures.
2. **Fixes by the writer.** A model answer missing its value and a solution without an “= value” step were corrected.
3. **Originality gate.** Generic stems that matched other banks or this chapter word for word (once the maths is set aside) were rewritten by the producer with their own context.
4. **Every angle is computed from the given angles and asserted (118 re-solve checks).**

## Known gaps
- Narration audio is not generated (TTS stage).

