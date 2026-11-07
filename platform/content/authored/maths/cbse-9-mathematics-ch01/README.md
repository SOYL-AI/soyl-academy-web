# CBSE Class 9 Mathematics, Chapter 1 — Number System

`cbse-9-mathematics-ch01` · release v1 · academic year 2026-27 · family `maths` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (19 + 18 slides), notes (7 sections), 31 flashcards, 59 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse9math_ch01_short` (20 marks, 40 min) and `t_cbse9math_ch01_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-9-default-chapter-test-short` / `-long` (the subject has no chapter-test blueprints of its own). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the shared CBSE 9 Mathematics builder, kept once in `cbse-9-mathematics-ch01/src/lib.mjs` and re-exported by the other chapters; the CBSE 11/12 Mathematics builder with CBSE 9 ids and blueprints; KaTeX strict parsing, plot and geometry checks, an independent re-solve of every answer, and the pipeline’s lint, verify checks and answer-leak scan run inside the build), `build.mjs`, `questions.mjs` and chapter helpers. Rebuild from `platform/`: `npx tsx content/authored/maths/cbse-9-mathematics-ch01/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/resolve.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 syllabus, new NCERT Class 9 book under NCF-SE 2023)
- All 4 syllabus topics are covered: t01 Rational and irrational numbers on the number line; t02 Real numbers and their decimal expansions; t03 Operations on real numbers; rationalisation; t04 Laws of exponents for real numbers.

- Facts a reviewer may wish to double-check: 22/7 is stated to be only an approximation of π; no historical claims. Real numbers are introduced as the rationals and irrationals together. √2 is proved irrational by the standard even–odd contradiction.

## Shape
- **Part 1, 19 slides:** rational and irrational numbers; root 2 is irrational; worked example 1: rational or irrational?; rational numbers on the number line; root 3 on the number line; worked example 2: root 5 and root 10; the square-root spiral; decimal expansions of rational numbers; long division and the period of 1/7; worked example 3: will it terminate?; worked example 4: recurring decimal to a fraction; non-terminating, non-recurring decimals; locating a number by successive magnification; summary; exam tips; 3 checks.
- **Part 2, 18 slides:** laws of surds; worked example 1: simplify surds; comparing and ordering surds; identities with surds; worked example 2: expand and simplify; rationalising the denominator; worked example 3: rationalise; worked example 4: find a and b; laws of exponents: integral powers; rational powers; worked example 5: integral powers; worked example 6: rational powers; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 15 · example 10 · check 6 · summary 2 · exam-tips 2. Visuals: flow 2 · geometry 6 · table 21. Six computed geometry figures (constructions of √2, √3 and √5 on the number line, the square-root spiral with eight triangles, the unit-square diagonal, a fractions number line), each asserted from its coordinates, plus tables for long division, the denominator test, recurring decimals and successive magnification. Narration max 68 words, mean 51; no symbols, LaTeX or letter abbreviations.

## Question bank (59)
| Type | Count | Marks |
|---|---|---|
| mcq | 20 | 1 (keys a 5, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys c a d a b d) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 3 | 1–3 (16; 8; 2) |
| short (2 marks) | 8 | 2 |
| short (3 marks) | 5 | 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 4 · d2 29 · d3 20 · d4 6.
- **Competency:** recall 3 · understanding 20 · application 26 · analysis 10. Application or higher is **61% of items (72% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 12 · t02 21 · t03 16 · t04 12.
- **Deck checks:** q015, q016, q017 (Part 1); q018, q019, q020 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 9 class-default blueprints)
- **Short (20 marks, 40 min):** A q002, q005, q011, q021 · B q041, q043, q048 · C (q051 or q053) · D q056.
- **Long (40 marks, 90 min):** A q001, q003, q004, q006, q008, q009, q012, q013, q022, q025 · B q039, q042, (q044 or q045), q046, (q049 or q050) · C q052, (q054 or q055) · D q057, q059.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; 1524 math strings parsed with KaTeX 0.19.0 (throwOnError, strict: error), 0 failures; 0 LaTeX commands missing their backslash; 0 LaTeX outside $…$; 0 deck plots + 0 notes/question plots: 0 marked points all on their curves and matching their labels; 0 zeros located numerically and all marked; 0 intersection points lie on both lines; narration 37 slides, max 68 words, mean 51; no symbols, LaTeX or letter abbreviations; re-solve 128/128 checks pass (independent arithmetic from the givens; keys, numerical values, and the numbers inside solutions and model answers).
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-04-subject-producer-cbse9-mathematics.md`.

## Verifier pass (2026-11-04)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet) to the producer brief; the producer reviewed scope against the new syllabus, the computed answers and the competency tags, and rebuilt from source.
2. **Fixes by the writer.** Wrong remainders and an inverted fraction in two long-item checks, a scheme short of steps, and sign normalisation in figure asserts were corrected; five routine one-step items were re-tagged as understanding, which the producer checked item by item and accepted.
3. **Every value (decimal expansions and periods, p/q forms, simplified surds, rationalised forms, exponent values) is computed and asserted (128 re-solve checks).**

## Known gaps
- Narration audio is not generated (TTS stage).

