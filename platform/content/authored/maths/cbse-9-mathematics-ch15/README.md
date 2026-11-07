# CBSE Class 9 Mathematics, Chapter 15 — Introduction to Probability

`cbse-9-mathematics-ch15` · release v1 · academic year 2026-27 · family `maths` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 17 slides), notes (7 sections), 30 flashcards, 64 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse9math_ch15_short` (20 marks, 40 min) and `t_cbse9math_ch15_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-9-default-chapter-test-short` / `-long` (the subject has no chapter-test blueprints of its own). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the shared CBSE 9 Mathematics builder, kept once in `cbse-9-mathematics-ch01/src/lib.mjs` and re-exported by the other chapters; the CBSE 11/12 Mathematics builder with CBSE 9 ids and blueprints; KaTeX strict parsing, plot and geometry checks, an independent re-solve of every answer, and the pipeline’s lint, verify checks and answer-leak scan run inside the build), `build.mjs`, `questions.mjs` and chapter helpers. Rebuild from `platform/`: `npx tsx content/authored/maths/cbse-9-mathematics-ch15/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/resolve.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 syllabus, new NCERT Class 9 book under NCF-SE 2023)
- All 2 syllabus topics are covered: t01 Likelihood and empirical probability; t02 Theoretical probability.
- Both syllabus topics are covered at Class 9 level: likelihood words and the 0–1 scale, empirical probability that settles as trials grow (shown with a seeded computer simulation, labelled as a simulation), and theoretical probability of equally likely outcomes with P(not E) = 1 − P(E). No 52-card deck, two-dice or two-coin sample spaces, conditional probability or overlapping “or” events. “Expected number” appears in three items as probability times the number of trials, described as approximate.
- Facts a reviewer may wish to double-check: Simulations use a seeded generator (coin seed 2026, 1000 tosses; die seed 2126, 600 throws), and every quoted count is asserted against the generator.

## Shape
- **Part 1, 17 slides:** what you will be able to do; words for chance; the probability scale; worked example 1: placing events on the scale; experiments, trials, outcomes and events; empirical probability; worked example 2: a spinner at a science fair; more trials, a steadier estimate; reading the coin experiment; worked example 3: bulbs tested in a lab; worked example 4: rainy days; summary; exam tips; 3 checks.
- **Part 2, 17 slides:** what you will be able to do; equally likely outcomes; theoretical probability; worked example 1: numbered cards; a jar of beads; worked example 2: beads in a jar; the chance that E does not happen; worked example 3: a wheel with equal sectors; theory and experiment: a die; more throws, closer to the theory; worked example 4: comparing theory and experiment; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 10 · diagram 4 · example 8 · check 6 · summary 2 · exam-tips 2. Visuals: flow 4 · geometry 8 · plot 2 · table 18. Probability scales, running relative frequency of heads and of a six with reference lines, and bar graphs for spinner, rainfall, bead and die data. Narration max 62 words, mean 47; no symbols, LaTeX or letter abbreviations.

## Question bank (64)
| Type | Count | Marks |
|---|---|---|
| mcq | 24 | 1 (keys a 6, b 6, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a d c b a c) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 4 | 1–3 (30; 6; 49; 4) |
| short (2 marks) | 8 | 2 |
| short (3 marks) | 5 | 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 26 · d2 27 · d3 10 · d4 1.
- **Competency:** recall 11 · understanding 12 · application 26 · analysis 11 · evaluation 4. Application or higher is **64% of items (76% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 31 · t02 42.
- **Deck checks:** q001, q002, q003 (Part 1); q004, q005, q006 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 9 class-default blueprints)
- **Short (20 marks, 40 min):** A q007, q010, q013, q021 · B q039, q041, q045 · C (q050 or q052) · D q055.
- **Long (40 marks, 90 min):** A q008, q009, q011, q012, q014, q015, q017, q018, q022, q023 · B q038, q042, (q043 or q044), q047, (q048 or q049) · C q051, (q053 or q054) · D q056, q057.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; 1225 math strings parsed with KaTeX 0.19.0 (throwOnError, strict: error), 0 failures; 0 LaTeX commands missing their backslash; 0 LaTeX outside $…$; 2 deck plots + 2 notes/question plots: 0 marked points all on their curves and matching their labels; 0 zeros located numerically and all marked; 0 intersection points lie on both lines; narration 34 slides, max 62 words, mean 47; no symbols, LaTeX or letter abbreviations; re-solve 122/122 checks pass (independent arithmetic from the givens; keys, numerical values, and the numbers inside solutions and model answers).
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-04-subject-producer-cbse9-mathematics.md`.

## Verifier pass (2026-11-04)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet) to the producer brief; the producer reviewed scope against the new syllabus, the computed answers and the competency tags (64 %, by replacing application items with recall and understanding items, not by re-tagging), and rebuilt from source.
2. **Fixes by the writer.** A lost backslash, a scheme that over-counted a 1-mark item and a fill-blank whose solution lacked its answer were corrected.
3. **Every probability is computed as a reduced fraction and asserted (122 re-solve checks).**

## Known gaps
- Narration audio is not generated (TTS stage).

