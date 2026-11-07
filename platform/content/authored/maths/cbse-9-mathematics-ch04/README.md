# CBSE Class 9 Mathematics, Chapter 4 — Exploring Algebraic Identities

`cbse-9-mathematics-ch04` · release v1 · academic year 2026-27 · family `maths` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 20 slides), notes (6 sections), 30 flashcards, 60 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse9math_ch04_short` (20 marks, 40 min) and `t_cbse9math_ch04_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-9-default-chapter-test-short` / `-long` (the subject has no chapter-test blueprints of its own). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the shared CBSE 9 Mathematics builder, kept once in `cbse-9-mathematics-ch01/src/lib.mjs` and re-exported by the other chapters; the CBSE 11/12 Mathematics builder with CBSE 9 ids and blueprints; KaTeX strict parsing, plot and geometry checks, an independent re-solve of every answer, and the pipeline’s lint, verify checks and answer-leak scan run inside the build), `build.mjs`, `questions.mjs` and chapter helpers. Rebuild from `platform/`: `npx tsx content/authored/maths/cbse-9-mathematics-ch04/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/resolve.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 syllabus, new NCERT Class 9 book under NCF-SE 2023)
- All 3 syllabus topics are covered: t01 Visualising algebraic identities; t02 Factorisation using identities; t03 Simplifying rational expressions.

- Facts a reviewer may wish to double-check: The identities (a ± b)², a² − b², (x + a)(x + b), (a + b)³ and a³ + b³ + c³ − 3abc = (a + b + c)(a² + b² + c² − ab − bc − ca), including the a + b + c = 0 case; rational expressions simplified with domain restrictions at Class 9 level.

## Shape
- **Part 1, 18 slides:** what you will be able to do; square of a sum; square of a difference; difference of two squares; worked example 1: easy arithmetic with identities; the product of x plus a and x plus b; worked example 2: expanding products; the cube of a plus b; counting the blocks; worked example 3: cubes; an identity with three letters; when the three numbers add up to zero; summary; exam tips; 3 checks.
- **Part 2, 20 slides:** what you will be able to do; common factors first; difference of squares; perfect squares; worked example 1: choosing the identity; splitting the middle term; worked example 2: when the first coefficient is not one; factorising cubes; worked example 3: cubes and zero sums; rational expressions and where they fail; cancelling common factors; worked example 4: simplify and restrict; adding with the LCM; worked example 5: subtract with the LCM; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 13 · diagram 5 · example 8 · check 6 · summary 2 · exam-tips 2. Visuals: flow 4 · geometry 6 · plot 1 · table 19. Area diagrams for the square and difference-of-squares identities and a cube split into eight blocks, with computed sizes. Narration max 75 words, mean 55; no symbols, LaTeX or letter abbreviations.

## Question bank (60)
| Type | Count | Marks |
|---|---|---|
| mcq | 20 | 1 (keys a 5, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a d c b a c) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 5 | 1–3 (100; 50; 34; 924; 11.5) |
| short (2 marks) | 7 | 2 |
| short (3 marks) | 5 | 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 14 · d2 27 · d3 18 · d4 1.
- **Competency:** recall 3 · understanding 20 · application 28 · analysis 9. Application or higher is **62% of items (75% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 33 · t02 16 · t03 13.
- **Deck checks:** q003, q007, q010 (Part 1); q012, q016, q019 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 9 class-default blueprints)
- **Short (20 marks, 40 min):** A q001, q013, q018, q021 · B q040, q043, q048 · C (q052 or q054) · D q057.
- **Long (40 marks, 90 min):** A q002, q004, q005, q006, q008, q011, q014, q017, q022, q023 · B q041, q045, (q042 or q044), q047, (q049 or q050) · C q053, (q055 or q056) · D q058, q059.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; 1442 math strings parsed with KaTeX 0.19.0 (throwOnError, strict: error), 0 failures; 0 LaTeX commands missing their backslash; 0 LaTeX outside $…$; 1 deck plots + 1 notes/question plots: 8 marked points all on their curves and matching their labels; 4 zeros located numerically and all marked; 0 intersection points lie on both lines; narration 38 slides, max 75 words, mean 55; no symbols, LaTeX or letter abbreviations; re-solve 117/117 checks pass (independent arithmetic from the givens; keys, numerical values, and the numbers inside solutions and model answers).
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-04-subject-producer-cbse9-mathematics.md`.

## Verifier pass (2026-11-04)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet); the producer reviewed the identities and every competency tag.
2. **Competency check.** The writer had re-tagged eleven items as understanding. The producer checked each one (expanding with a named identity, evaluating 105², 36² − 34², 503² − 497², 7.5² − 2.5², factorising 16x² − 81y², a single-identity true-false) and confirmed all as routine one-step items.
3. **Originality gate.** Generic stems that matched other banks or this chapter word for word (once the maths is set aside) were rewritten by the producer with their own context.
4. **Every expansion and factorisation is verified numerically at several values, and every value is computed and asserted.**

## Known gaps
- Narration audio is not generated (TTS stage).

