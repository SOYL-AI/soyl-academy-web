# CBSE Class 9 Mathematics, Chapter 3 — Sequences and Progressions

`cbse-9-mathematics-ch03` · release v1 · academic year 2026-27 · family `maths` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (19 + 20 slides), notes (7 sections), 31 flashcards, 60 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse9math_ch03_short` (20 marks, 40 min) and `t_cbse9math_ch03_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-9-default-chapter-test-short` / `-long` (the subject has no chapter-test blueprints of its own). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the shared CBSE 9 Mathematics builder, kept once in `cbse-9-mathematics-ch01/src/lib.mjs` and re-exported by the other chapters; the CBSE 11/12 Mathematics builder with CBSE 9 ids and blueprints; KaTeX strict parsing, plot and geometry checks, an independent re-solve of every answer, and the pipeline’s lint, verify checks and answer-leak scan run inside the build), `build.mjs`, `questions.mjs` and chapter helpers. Rebuild from `platform/`: `npx tsx content/authored/maths/cbse-9-mathematics-ch03/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/resolve.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 syllabus, new NCERT Class 9 book under NCF-SE 2023)
- All 3 syllabus topics are covered: t01 Sequences: patterns, recursive and explicit rules; t02 Arithmetic progressions; t03 Geometric progressions.
- Sums of arithmetic and geometric progressions are not taught: the syllabus lines are “identify an AP, find its nth term and visualise it graphically” and “identify a GP, find its nth term and visualise it; relate GPs to fractals and the Tower of Hanoi”. The Tower of Hanoi minimum 2ⁿ − 1 is reached through the recursion, not a sum formula.
- Facts a reviewer may wish to double-check: Tower of Hanoi minimum moves 2ⁿ − 1; Sierpinski triangle counts 3ⁿ; Koch snowflake side counts 3 × 4ⁿ.

## Shape
- **Part 1, 19 slides:** what you will be able to do; a sequence and its terms; dot patterns: triangular numbers; dot patterns: square numbers; recursive rule and explicit formula; worked example 1: recursive to explicit; worked example 2: matchstick triangles; fibonacci-like sequences; arithmetic progressions; the nth term of an AP; the graph of an AP; worked example 3: the nth term of an AP; rising, level or falling; summary; exam tips; 3 checks.
- **Part 2, 20 slides:** what you will be able to do; geometric progressions; the nth term of a GP; worked example 1: a GP term; growth: ratio more than one; decay: ratio between zero and one; aP against GP; worked example 2: AP, GP or neither?; fractal: the Sierpinski triangle; counting the Sierpinski triangle; fractal: the Koch snowflake; the Tower of Hanoi; why two to the n, minus one; worked example 3: three discs and long towers; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 14 · diagram 7 · example 6 · check 6 · summary 2 · exam-tips 2. Visuals: flow 4 · geometry 6 · plot 6 · table 15. Plots of AP terms on a straight line and GP growth and decay points, pattern tables and fractal counts. Narration max 77 words, mean 54; no symbols, LaTeX or letter abbreviations.

## Question bank (60)
| Type | Count | Marks |
|---|---|---|
| mcq | 20 | 1 (keys a 5, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a d c b a c) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 5 | 1–3 (210; 208; 5; 1023; 50) |
| short (2 marks) | 7 | 2 |
| short (3 marks) | 5 | 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 10 · d2 31 · d3 18 · d4 1.
- **Competency:** recall 6 · understanding 15 · application 30 · analysis 8 · evaluation 1. Application or higher is **65% of items (77% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 16 · t02 23 · t03 26.
- **Deck checks:** q001, q004, q007 (Part 1); q014, q016, q018 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 9 class-default blueprints)
- **Short (20 marks, 40 min):** A q003, q008, q017, q021 · B q041, q043, q048 · C (q052 or q055) · D q057.
- **Long (40 marks, 90 min):** A q002, q005, q006, q009, q011, q013, q015, q019, q022, q023 · B q040, q042, (q044 or q045), q047, (q049 or q050) · C q053, (q054 or q056) · D q058, q059.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; 1729 math strings parsed with KaTeX 0.19.0 (throwOnError, strict: error), 0 failures; 0 LaTeX commands missing their backslash; 0 LaTeX outside $…$; 6 deck plots + 5 notes/question plots: 81 marked points all on their curves and matching their labels; 0 zeros located numerically and all marked; 2 intersection points lie on both lines; narration 39 slides, max 77 words, mean 54; no symbols, LaTeX or letter abbreviations; re-solve 135/135 checks pass (independent arithmetic from the givens; keys, numerical values, and the numbers inside solutions and model answers).
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-04-subject-producer-cbse9-mathematics.md`.

## Verifier pass (2026-11-04)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet); the producer reviewed scope and every competency tag.
2. **Competency check.** The writer had re-tagged nine items as understanding to reach the band. The producer confirmed six as routine one-step items (direct nth-term and common-ratio items) and restored three as application, because they model a context: the Koch snowflake side count, a taxi fare as an AP and a bouncing ball as a GP. Application or higher is 65 % of items, at the top of the band.
3. **Originality gate.** Generic stems that matched other banks or this chapter word for word (once the maths is set aside) were rewritten by the producer with their own context.
4. **Every term, ratio and count is computed and asserted.**

## Known gaps
- Narration audio is not generated (TTS stage).

