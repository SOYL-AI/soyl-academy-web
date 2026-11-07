# CBSE Class 9 Mathematics, Chapter 5 — Linear Equations in Two Variables

`cbse-9-mathematics-ch05` · release v1 · academic year 2026-27 · family `maths` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 17 slides), notes (6 sections), 30 flashcards, 60 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse9math_ch05_short` (20 marks, 40 min) and `t_cbse9math_ch05_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-9-default-chapter-test-short` / `-long` (the subject has no chapter-test blueprints of its own). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the shared CBSE 9 Mathematics builder, kept once in `cbse-9-mathematics-ch01/src/lib.mjs` and re-exported by the other chapters; the CBSE 11/12 Mathematics builder with CBSE 9 ids and blueprints; KaTeX strict parsing, plot and geometry checks, an independent re-solve of every answer, and the pipeline’s lint, verify checks and answer-leak scan run inside the build), `build.mjs`, `questions.mjs` and chapter helpers. Rebuild from `platform/`: `npx tsx content/authored/maths/cbse-9-mathematics-ch05/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/resolve.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 syllabus, new NCERT Class 9 book under NCF-SE 2023)
- All 2 syllabus topics are covered: t01 Linear equations in two variables and their solutions; t02 Graph of a linear equation.
- Pairs of linear equations are Class 10 and are not taught; one sentence says where two lines meet is a Class 10 topic. Slope is described in words as a rate, with no slope formula.
- Facts a reviewer may wish to double-check: F = 9C/5 + 32 (equal at −40); all prices, fares and fees are invented illustrations.

## Shape
- **Part 1, 17 slides:** what you will be able to do; linear equations in two variables; writing equations from situations; a solution is an ordered pair; worked example 1: testing pairs; one equation, many solutions; worked example 2: finding an unknown coefficient; infinitely many solutions; celsius and Fahrenheit; worked example 3: ages and sensible answers; when one letter seems to be missing; summary; exam tips; 3 checks.
- **Part 2, 17 slides:** what you will be able to do; plotting a line from a table; worked example 1: intercepts make plotting quick; lines through the origin; lines parallel to the axes; summary of special positions; reading a real-life graph: intercept and rate; worked example 2: temperature graph; a line that falls; worked example 3: a gym membership; same rate, different fixed charge; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 11 · diagram 5 · example 6 · check 6 · summary 2 · exam-tips 2. Visuals: flow 4 · plot 9 · table 13. Nine deck plots and ten more in notes and questions (solution points of 2x + 3y = 12, a taxi fare line, intercept lines, lines through the origin, x = 4 and y = −3, the Celsius–Fahrenheit line, a falling balance line, gym and broadband cost lines). Narration max 67 words, mean 51; no symbols, LaTeX or letter abbreviations.

## Question bank (60)
| Type | Count | Marks |
|---|---|---|
| mcq | 20 | 1 (keys a 5, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys b a a b c d) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 5 | 1–3 (13; 5; 28; 18; -40) |
| short (2 marks) | 7 | 2 |
| short (3 marks) | 5 | 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 21 · d2 28 · d3 10 · d4 1.
- **Competency:** recall 4 · understanding 27 · application 23 · analysis 6. Application or higher is **48% of items (60% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 33 · t02 30.
- **Deck checks:** q002, q006, q010 (Part 1); q013, q016, q019 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 9 class-default blueprints)
- **Short (20 marks, 40 min):** A q001, q004, q014, q021 · B q041, q044, q048 · C (q052 or q054) · D q057.
- **Long (40 marks, 90 min):** A q003, q005, q007, q008, q009, q011, q015, q018, q022, q023 · B q040, q043, (q045 or q046), q047, (q050 or q051) · C q053, (q055 or q056) · D q058, q059.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; 1625 math strings parsed with KaTeX 0.19.0 (throwOnError, strict: error), 0 failures; 0 LaTeX commands missing their backslash; 0 LaTeX outside $…$; 9 deck plots + 10 notes/question plots: 72 marked points all on their curves and matching their labels; 11 zeros located numerically and all marked; 2 intersection points lie on both lines; narration 34 slides, max 67 words, mean 51; no symbols, LaTeX or letter abbreviations; re-solve 122/122 checks pass (independent arithmetic from the givens; keys, numerical values, and the numbers inside solutions and model answers).
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-04-subject-producer-cbse9-mathematics.md`.

## Verifier pass (2026-11-04)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet); competency tags were set honestly with no re-tagging (48 %). The producer reviewed scope and replaced the notes’ general y = mx + c with the chapter’s taxi line.
2. **Fixes by the writer.** A wrong distractor that was also a solution, a plot zero at the edge of the range and an “0 = 10” phrase flagged by the arithmetic check were corrected.
3. **Originality gate.** Generic stems that matched other banks or this chapter word for word (once the maths is set aside) were rewritten by the producer with their own context.
4. **Every solution pair, intercept and graph reading is computed and asserted (122 re-solve checks).**

## Known gaps
- Narration audio is not generated (TTS stage).

