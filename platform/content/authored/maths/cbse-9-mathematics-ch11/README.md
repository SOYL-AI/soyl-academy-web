# CBSE Class 9 Mathematics, Chapter 11 — Circles

`cbse-9-mathematics-ch11` · release v1 · academic year 2026-27 · family `maths` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (21 + 20 slides), notes (6 sections), 32 flashcards, 66 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse9math_ch11_short` (20 marks, 40 min) and `t_cbse9math_ch11_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-9-default-chapter-test-short` / `-long` (the subject has no chapter-test blueprints of its own). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the shared CBSE 9 Mathematics builder, kept once in `cbse-9-mathematics-ch01/src/lib.mjs` and re-exported by the other chapters; the CBSE 11/12 Mathematics builder with CBSE 9 ids and blueprints; KaTeX strict parsing, plot and geometry checks, an independent re-solve of every answer, and the pipeline’s lint, verify checks and answer-leak scan run inside the build), `build.mjs`, `questions.mjs` and chapter helpers. Rebuild from `platform/`: `npx tsx content/authored/maths/cbse-9-mathematics-ch11/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/resolve.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 syllabus, new NCERT Class 9 book under NCF-SE 2023)
- All 3 syllabus topics are covered: t01 Circle terms; unique circle through three points; t02 Chords and the angles they subtend; t03 Angles subtended by arcs; cyclic quadrilaterals.
- Tangents are Class 10 and are left out. The circumcentre example uses coordinates. The case of the angle-at-the-centre theorem with the centre outside the angle is shown as a figure and table row rather than a full proof.
- Facts a reviewer may wish to double-check: Chord results and converses; the angle at the centre is twice the angle at the circumference; angles in the same segment; the angle in a semicircle; cyclic quadrilateral opposite angles and the converse; Pythagorean triples 7-24-25, 15-20-25 and 12-35-37 used in chord problems.

## Shape
- **Part 1, 21 slides:** what you will be able to do; parts of a circle; circle terms; circles through two points; three points fix one circle; constructing the circle; worked example 1: find the centre on a grid; equal chords subtend equal angles at the centre; proof and converse; the perpendicular from the centre; why the perpendicular bisects the chord; worked example 2: a chord and Pythagoras; equal chords are equally far from the centre; worked example 3: parallel chords; a second look at the three points; summary; exam tips; 3 checks.
- **Part 2, 20 slides:** what you will be able to do; the angle at the centre; setting up the proof; proof when the centre is inside the angle; the other two positions of the centre; worked example 1: using the theorem; angles in the same segment; angle in a semicircle; worked example 2: a diameter and a point; cyclic quadrilaterals; why opposite angles add up to 180; the converse and the exterior angle; which quadrilaterals are cyclic?; worked example 3: an exterior angle; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 8 · diagram 15 · example 6 · check 6 · summary 2 · exam-tips 2. Visuals: flow 4 · geometry 25 · table 10. Computed geom figures (circle terms, circles through two points, a circumcircle with centre (5, 5) and radius 5, equal chords, perpendicular from the centre, parallel chords, centre and rim angles in three cases, same segment, semicircle, cyclic quadrilateral and converse). Narration max 84 words, mean 56; no symbols, LaTeX or letter abbreviations.

## Question bank (66)
| Type | Count | Marks |
|---|---|---|
| mcq | 23 | 1 (keys a 6, b 6, c 6, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a b c d a c) |
| true-false | 5 | 1 |
| fill-blank | 5 | 1 |
| match | 2 | 2 |
| numerical | 3 | 1–3 (37; 32; 65) |
| short (2 marks) | 8 | 2 |
| short (3 marks) | 5 | 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 21 · d2 24 · d3 19 · d4 2.
- **Competency:** recall 10 · understanding 14 · application 21 · analysis 21. Application or higher is **64% of items (75% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 12 · t02 22 · t03 32.
- **Deck checks:** q001, q002, q003 (Part 1); q004, q005, q006 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 9 class-default blueprints)
- **Short (20 marks, 40 min):** A q007, q012, q015, q021 · B q041, q043, q046 · C (q050 or q052) · D q055.
- **Long (40 marks, 90 min):** A q008, q009, q010, q011, q013, q014, q016, q017, q022, q023 · B q039, q040, (q042 or q044), q045, (q048 or q049) · C q051, (q053 or q054) · D q056, q057.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; 1336 math strings parsed with KaTeX 0.19.0 (throwOnError, strict: error), 0 failures; 0 LaTeX commands missing their backslash; 0 LaTeX outside $…$; 0 deck plots + 0 notes/question plots: 0 marked points all on their curves and matching their labels; 0 zeros located numerically and all marked; 0 intersection points lie on both lines; narration 41 slides, max 84 words, mean 56; no symbols, LaTeX or letter abbreviations; re-solve 144/144 checks pass (independent arithmetic from the givens; keys, numerical values, and the numbers inside solutions and model answers).
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-04-subject-producer-cbse9-mathematics.md`.

## Verifier pass (2026-11-04)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet) to the producer brief; the producer reviewed scope against the new syllabus, the computed answers and the competency tags (64 %, by adding recall and understanding items rather than re-tagging), and rebuilt from source.
2. **Fixes by the writer.** Lost backslashes in table cells, two re-solve mismatches and a fill-blank with two accepted lists were corrected. **Originality gate.** Generic stems that matched other banks or this chapter word for word (once the maths is set aside) were rewritten by the producer with their own context.
3. **Every angle and length is computed from coordinates and asserted.**

## Known gaps
- Narration audio is not generated (TTS stage).

