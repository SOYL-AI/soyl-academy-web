# CBSE Class 9 Mathematics, Chapter 2 — Introduction to Polynomials

`cbse-9-mathematics-ch02` · release v1 · academic year 2026-27 · family `maths` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 17 slides), notes (7 sections), 30 flashcards, 59 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse9math_ch02_short` (20 marks, 40 min) and `t_cbse9math_ch02_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-9-default-chapter-test-short` / `-long` (the subject has no chapter-test blueprints of its own). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the shared CBSE 9 Mathematics builder, kept once in `cbse-9-mathematics-ch01/src/lib.mjs` and re-exported by the other chapters; the CBSE 11/12 Mathematics builder with CBSE 9 ids and blueprints; KaTeX strict parsing, plot and geometry checks, an independent re-solve of every answer, and the pipeline’s lint, verify checks and answer-leak scan run inside the build), `build.mjs`, `questions.mjs` and chapter helpers. Rebuild from `platform/`: `npx tsx content/authored/maths/cbse-9-mathematics-ch02/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/resolve.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 syllabus, new NCERT Class 9 book under NCF-SE 2023)
- All 2 syllabus topics are covered: t01 Polynomials in one variable; degree and zeroes; t02 Remainder and factor theorems.
- The graphical meaning of zeroes is not in this syllabus; it appears in one brief plot of a quadratic as x-intercepts.
- Facts a reviewer may wish to double-check: “At most n zeroes” is stated for real zeroes; the remainder and factor theorems are stated with brief reasons; rational-zero trials use factors of the constant term (and fractions when the leading coefficient is 2).

## Shape
- **Part 1, 16 slides:** polynomials in one variable; degree and types of polynomials; types by number of terms; worked example 1: degree, terms and name; the value of a polynomial; worked example 2: finding values; zeroes of a polynomial; zeroes on a graph; worked example 3: zeroes and an unknown; how many zeroes?; summary; exam tips; 3 checks.
- **Part 2, 17 slides:** dividing a polynomial; the remainder theorem; worked example 1: remainders; dividing by ax + b; worked example 2: finding an unknown; the factor theorem; worked example 3: is it a factor?; factorising a cubic; worked example 4: a monic cubic; worked example 5: leading coefficient 2; worked example 6: two unknowns; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 12 · example 9 · check 6 · summary 2 · exam-tips 2. Visuals: flow 3 · plot 1 · table 21. Two plots with both zeroes and the y-intercept marked (checked numerically) and tables for terms, degrees, values, synthetic division and remainders. Narration max 71 words, mean 51; no symbols, LaTeX or letter abbreviations.

## Question bank (59)
| Type | Count | Marks |
|---|---|---|
| mcq | 20 | 1 (keys a 5, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a a d c b d) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 3 | 1–3 (-5; 10; -2) |
| short (2 marks) | 8 | 2 |
| short (3 marks) | 5 | 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 16 · d2 20 · d3 18 · d4 5.
- **Competency:** recall 7 · understanding 15 · application 30 · analysis 7. Application or higher is **63% of items (74% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 31 · t02 29.
- **Deck checks:** q015, q016, q017 (Part 1); q018, q019, q020 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 9 class-default blueprints)
- **Short (20 marks, 40 min):** A q003, q006, q011, q024 · B q042, q044, q048 · C (q051 or q053) · D q056.
- **Long (40 marks, 90 min):** A q001, q002, q004, q005, q007, q008, q010, q012, q021, q025 · B q039, q041, (q043 or q045), q046, (q047 or q050) · C q052, (q054 or q055) · D q057, q059.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; 1537 math strings parsed with KaTeX 0.19.0 (throwOnError, strict: error), 0 failures; 0 LaTeX commands missing their backslash; 0 LaTeX outside $…$; 1 deck plots + 2 notes/question plots: 9 marked points all on their curves and matching their labels; 6 zeros located numerically and all marked; 0 intersection points lie on both lines; narration 33 slides, max 71 words, mean 51; no symbols, LaTeX or letter abbreviations; re-solve 121/121 checks pass (independent arithmetic from the givens; keys, numerical values, and the numbers inside solutions and model answers).
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-04-subject-producer-cbse9-mathematics.md`.

## Verifier pass (2026-11-04)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet); the producer reviewed scope, factorisations and competency tags.
2. **Fixes by the writer.** Only string-quoting slips at the first build.
3. **Originality gate.** Generic stems that matched other banks or this chapter word for word (once the maths is set aside) were rewritten by the producer with their own context.
4. **Every value, zero, remainder and factorisation is computed and asserted (121 re-solve checks); factorisations are checked by multiplying back.**

## Known gaps
- Narration audio is not generated (TTS stage).

