# CBSE Class 9 Mathematics, Chapter 13 — Surface Area and Volume

`cbse-9-mathematics-ch13` · release v1 · academic year 2026-27 · family `maths` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (20 + 20 slides), notes (6 sections), 32 flashcards, 71 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse9math_ch13_short` (20 marks, 40 min) and `t_cbse9math_ch13_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-9-default-chapter-test-short` / `-long` (the subject has no chapter-test blueprints of its own). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the shared CBSE 9 Mathematics builder, kept once in `cbse-9-mathematics-ch01/src/lib.mjs` and re-exported by the other chapters; the CBSE 11/12 Mathematics builder with CBSE 9 ids and blueprints; KaTeX strict parsing, plot and geometry checks, an independent re-solve of every answer, and the pipeline’s lint, verify checks and answer-leak scan run inside the build), `build.mjs`, `questions.mjs` and chapter helpers. Rebuild from `platform/`: `npx tsx content/authored/maths/cbse-9-mathematics-ch13/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/resolve.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 syllabus, new NCERT Class 9 book under NCF-SE 2023)
- All 4 syllabus topics are covered: t01 Cuboids and cubes; t02 Right circular cylinders and cones; t03 Pyramids; t04 Spheres and hemispheres.
- Combinations of solids (Class 10) are left out. Pyramids are kept to square and triangular pyramids: slant height l = √(h² + (a/2)²), lateral area 2al, volume one third of base area × height (shown with three pyramids in a cube).
- Facts a reviewer may wish to double-check: π stated in every item (22/7 where radii divide cleanly, otherwise 3.14); the triangular pyramid has its apex above the in-centre of a right-angled base so all slant heights are equal (asserted from 3D coordinates).

## Shape
- **Part 1, 20 slides:** what you will be able to do; the cuboid; formulas for the cuboid and the cube; worked example 1: a water tank; the cube; units of area, volume and capacity; the right circular cylinder; opening out the curved surface; formulas for the cylinder; worked example 2: an oil drum; the right circular cone; opening out a cone; formulas for the cone; worked example 3: a conical tent; summary; exam tips; 3 checks.
- **Part 2, 20 slides:** what you will be able to do; the parts of a pyramid; finding the slant height; surface area and volume of a square pyramid; worked example 1: a temple shikhara; a triangular pyramid; worked example 2: a triangular pyramid; why one third?; the sphere; formulas for the sphere; worked example 3: a ladoo; the hemisphere; formulas for the hemisphere; worked example 4: a planetarium dome; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 10 · diagram 11 · example 7 · check 6 · summary 2 · exam-tips 2. Visuals: flow 4 · geometry 23 · table 11. Oblique-view solids from computed 3D points, marked not to scale (cuboid, cube, cylinder, cone, pyramids, sphere, hemisphere, a tank, drum, tent, shikhara model, ladoo, dome, katori), nets of a cylinder and a cone, and three pyramids filling a cube. Narration max 79 words, mean 53; no symbols, LaTeX or letter abbreviations.

## Question bank (71)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 | 1 (keys a 7, b 7, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a c d b a c) |
| true-false | 7 | 1 |
| fill-blank | 4 | 1 |
| match | 2 | 2 |
| numerical | 3 | 1–3 (112; 3; 14) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 5 | 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 27 · d2 27 · d3 15 · d4 2.
- **Competency:** recall 11 · understanding 15 · application 33 · analysis 12. Application or higher is **63% of items (76% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 18 · t02 27 · t03 13 · t04 20.
- **Deck checks:** q001, q002, q003 (Part 1); q004, q005, q006 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 9 class-default blueprints)
- **Short (20 marks, 40 min):** A q009, q014, q018, q020 · B q040, q042, q046 · C (q050 or q052) · D q055.
- **Long (40 marks, 90 min):** A q008, q010, q011, q013, q015, q016, q017, q019, q021, q022 · B q039, q041, (q043 or q044), q047, (q048 or q049) · C q051, (q053 or q054) · D q056, q058.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; 1577 math strings parsed with KaTeX 0.19.0 (throwOnError, strict: error), 0 failures; 0 LaTeX commands missing their backslash; 0 LaTeX outside $…$; 0 deck plots + 0 notes/question plots: 0 marked points all on their curves and matching their labels; 0 zeros located numerically and all marked; 0 intersection points lie on both lines; narration 40 slides, max 79 words, mean 53; no symbols, LaTeX or letter abbreviations; re-solve 144/144 checks pass (independent arithmetic from the givens; keys, numerical values, and the numbers inside solutions and model answers).
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-04-subject-producer-cbse9-mathematics.md`.

## Verifier pass (2026-11-04)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet) to the producer brief; the producer reviewed scope against the new syllabus, the computed answers and the competency tags (63 %, by dropping five unused application items and adding recall and understanding items, not by re-tagging), and rebuilt from source.
2. **Fixes by the writer.** Two model answers and a case solution missing their values were corrected and deck 2 trimmed. **Originality gate.** Generic stems that matched other banks or this chapter word for word (once the maths is set aside) were rewritten by the producer with their own context.
3. **Every surface area and volume is computed and asserted (144 re-solve checks).**

## Known gaps
- Narration audio is not generated (TTS stage).

