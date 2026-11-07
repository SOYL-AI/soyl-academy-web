# CBSE Class 9 Mathematics, Chapter 7 — Introduction to Euclid's Geometry: Axioms and Postulates

`cbse-9-mathematics-ch07` · release v1 · academic year 2026-27 · family `maths` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 19 slides), notes (6 sections), 32 flashcards, 58 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse9math_ch07_short` (20 marks, 40 min) and `t_cbse9math_ch07_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-9-default-chapter-test-short` / `-long` (the subject has no chapter-test blueprints of its own). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the shared CBSE 9 Mathematics builder, kept once in `cbse-9-mathematics-ch01/src/lib.mjs` and re-exported by the other chapters; the CBSE 11/12 Mathematics builder with CBSE 9 ids and blueprints; KaTeX strict parsing, plot and geometry checks, an independent re-solve of every answer, and the pipeline’s lint, verify checks and answer-leak scan run inside the build), `build.mjs`, `questions.mjs` and chapter helpers. Rebuild from `platform/`: `npx tsx content/authored/maths/cbse-9-mathematics-ch07/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/resolve.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 syllabus, new NCERT Class 9 book under NCF-SE 2023)
- All 3 syllabus topics are covered: t01 Origins of geometry; contributions of India, Egypt and Greece; t02 Definitions, axioms and postulates; t03 Simple constructions justified by postulates.
- History is kept cautious and textbook-level: Egyptian rope-stretchers (“said to have used” a 12-knot rope), Harappan bricks often in the ratio 4 : 2 : 1, the Sulba Sutras (sulba means cord; Baudhayana named as a well-known author; the rectangle-diagonal rule in our own words; the √2 approximation 1 + 1/3 + 1/(3·4) − 1/(3·4·34) = 577/408; the rule for a circle of nearly equal area to a square), and Euclid’s Elements in 13 books, about 300 BCE. Euclid’s definitions, common notions and postulates are paraphrased.
- Facts a reviewer may wish to double-check: 577/408 ≈ 1.414216; the square-to-circle rule r = a/2 + (half-diagonal − a/2)/3; Playfair’s axiom; the fifth postulate is first used in Euclid’s Proposition 29; brick sizes in questions are invented.

## Shape
- **Part 1, 17 slides:** what you will be able to do; egypt: the rope-stretchers; india: bricks of the Harappan cities; india: the Sulba Sutras; a square on the diagonal; worked example 1: ratios and ropes; approximations in the Sulba Sutras; greece: Euclid's Elements; euclid's definitions; axioms: the common notions; worked example 2: using a common notion; summary; exam tips; 3 checks.
- **Part 2, 19 slides:** what you will be able to do; postulates 1, 2 and 3: what we may draw; the fifth postulate in a picture; why is the fifth postulate special?; playfair's axiom; definition, axiom, postulate, theorem; worked example 1: sort the statements; euclid's first construction; why it works: a reason for every step; worked example 2: two triangles make a rhombus; a square on a segment; reasons for the square; worked example 3: lengths from the constructions; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 9 · diagram 10 · example 5 · check 6 · summary 2 · exam-tips 2. Visuals: flow 5 · geometry 13 · table 16. Computed figures for the 3-4-5 rope triangle, brick faces, a square on a diagonal, postulates 1–3, the fifth postulate, Playfair’s axiom, Euclid’s equilateral triangle, a rhombus and the square construction. Narration max 80 words, mean 52; no symbols, LaTeX or letter abbreviations.

## Question bank (58)
| Type | Count | Marks |
|---|---|---|
| mcq | 20 | 1 (keys a 5, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a c d b a d) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 3 | 1–3 (3375; 15; 1.4142) |
| short (2 marks) | 7 | 2 |
| short (3 marks) | 5 | 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 23 · d2 18 · d3 16 · d4 1.
- **Competency:** recall 12 · understanding 14 · application 24 · analysis 8. Application or higher is **55% of items (70% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 19 · t02 27 · t03 12.
- **Deck checks:** q001, q002, q003 (Part 1); q004, q005, q006 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 9 class-default blueprints)
- **Short (20 marks, 40 min):** A q007, q013, q018, q021 · B q038, q041, q046 · C (q050 or q052) · D q055.
- **Long (40 marks, 90 min):** A q008, q009, q010, q011, q014, q016, q019, q020, q022, q023 · B q039, q043, (q040 or q042), q045, (q047 or q048) · C q051, (q053 or q054) · D q056, q057.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; 1159 math strings parsed with KaTeX 0.19.0 (throwOnError, strict: error), 0 failures; 0 LaTeX commands missing their backslash; 0 LaTeX outside $…$; 0 deck plots + 0 notes/question plots: 0 marked points all on their curves and matching their labels; 0 zeros located numerically and all marked; 0 intersection points lie on both lines; narration 36 slides, max 80 words, mean 52; no symbols, LaTeX or letter abbreviations; re-solve 116/116 checks pass (independent arithmetic from the givens; keys, numerical values, and the numbers inside solutions and model answers).
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-04-subject-producer-cbse9-mathematics.md`.

## Verifier pass (2026-11-04)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet); competency tags honest (55 %). The producer reviewed the historical statements and the constructions.
2. **Fixes by the writer.** An assertion with an angle at the wrong vertex and a model answer missing its value were corrected.
3. **Every ratio, length and construction point is computed and asserted (116 re-solve checks).**

## Known gaps
- Narration audio is not generated (TTS stage).

