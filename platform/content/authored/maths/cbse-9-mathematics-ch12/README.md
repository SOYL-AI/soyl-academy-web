# CBSE Class 9 Mathematics, Chapter 12 — Area and Perimeter

`cbse-9-mathematics-ch12` · release v1 · academic year 2026-27 · family `maths` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (20 + 20 slides), notes (6 sections), 31 flashcards, 66 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse9math_ch12_short` (20 marks, 40 min) and `t_cbse9math_ch12_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-9-default-chapter-test-short` / `-long` (the subject has no chapter-test blueprints of its own). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the shared CBSE 9 Mathematics builder, kept once in `cbse-9-mathematics-ch01/src/lib.mjs` and re-exported by the other chapters; the CBSE 11/12 Mathematics builder with CBSE 9 ids and blueprints; KaTeX strict parsing, plot and geometry checks, an independent re-solve of every answer, and the pipeline’s lint, verify checks and answer-leak scan run inside the build), `build.mjs`, `questions.mjs` and chapter helpers. Rebuild from `platform/`: `npx tsx content/authored/maths/cbse-9-mathematics-ch12/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/resolve.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 syllabus, new NCERT Class 9 book under NCF-SE 2023)
- All 4 syllabus topics are covered: t01 Perimeter and circumference; π; t02 Area of triangles: Heron's formula; t03 Area of circles and sectors; t04 Brahmagupta's formula for cyclic quadrilaterals.
- History of π is kept cautious: the Rhind Papyrus (about 1650 BCE) rule giving (16/9)² ≈ 3.1605; Archimedes (about 250 BCE) 223/71 < π < 22/7 from 96-sided polygons; Aryabhata (499 CE) 62832/20000 = 3.1416 with his rule (100 + 4) × 8 + 62000; 355/113 often credited to Zu Chongzhi (5th century CE); the Kerala series mentioned only as an infinite series found in Kerala; Heron of Alexandria (first century CE); Brahmagupta (628 CE).
- Facts a reviewer may wish to double-check: π cannot be written exactly as a fraction; every circle numerical states its π (22/7 or 3.14); Brahmagupta’s formula checked against computed cyclic quadrilaterals (7-24-20-15 gives 234 by the formula, by the shoelace area and as two right triangles; 25-39-60-52 gives 1764), with Heron as the case d = 0 (17-25-26 gives 204).

## Shape
- **Part 1, 20 slides:** what you will be able to do; perimeter and circumference; ancient Egypt: a square for a circle; approximations of pi through history; archimedes: trapping pi; arc length; worked example 1: circumference and arc; perimeter of a composite figure; worked example 2: the window frame; heron's formula; using Heron's formula; worked example 3: a plot with a right angle; a median bisects the area; why a median bisects the area; summary; exam tips; 3 checks.
- **Part 2, 20 slides:** what you will be able to do; area of a circle; sector of a circle; worked example 1: a sector; formulas for circles and sectors; worked example 2: a segment; worked example 3: corners of a square tile; a ring; worked example 4: a path round a pond; brahmagupta's formula; checking the formula; a rectangle is a cyclic quadrilateral; heron's formula as a special case; worked example 5: a cyclic plot; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 9 · diagram 11 · example 8 · check 6 · summary 2 · exam-tips 2. Visuals: flow 4 · geometry 19 · table 15. Computed geom figures at 1 unit = 1 length unit (circle, the Egyptian square against a circle, sector, window, Heron triangle, median halves, a 12-gon in a circle, segment, ring, cyclic quadrilaterals on a diameter). Narration max 71 words, mean 51; no symbols, LaTeX or letter abbreviations.

## Question bank (66)
| Type | Count | Marks |
|---|---|---|
| mcq | 22 | 1 (keys a 6, b 6, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a c b d c a) |
| true-false | 6 | 1 |
| fill-blank | 5 | 1 |
| match | 2 | 2 |
| numerical | 3 | 1–3 (400; 90; 22) |
| short (2 marks) | 8 | 2 |
| short (3 marks) | 5 | 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 22 · d2 28 · d3 15 · d4 1.
- **Competency:** recall 10 · understanding 14 · application 30 · analysis 12. Application or higher is **64% of items (76% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 25 · t02 16 · t03 19 · t04 11.
- **Deck checks:** q001, q002, q003 (Part 1); q004, q005, q006 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 9 class-default blueprints)
- **Short (20 marks, 40 min):** A q007, q012, q017, q019 · B q039, q041, q045 · C (q051 or q052) · D q056.
- **Long (40 marks, 90 min):** A q008, q009, q010, q011, q013, q015, q016, q018, q020, q021 · B q038, q040, (q042 or q043), q046, (q048 or q049) · C q050, (q053 or q054) · D q057, q058.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; 1534 math strings parsed with KaTeX 0.19.0 (throwOnError, strict: error), 0 failures; 0 LaTeX commands missing their backslash; 0 LaTeX outside $…$; 0 deck plots + 0 notes/question plots: 0 marked points all on their curves and matching their labels; 0 zeros located numerically and all marked; 0 intersection points lie on both lines; narration 40 slides, max 71 words, mean 51; no symbols, LaTeX or letter abbreviations; re-solve 141/141 checks pass (independent arithmetic from the givens; keys, numerical values, and the numbers inside solutions and model answers).
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-04-subject-producer-cbse9-mathematics.md`.

## Verifier pass (2026-11-04)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet) to the producer brief; the producer reviewed scope against the new syllabus, the computed answers and the competency tags (64 %, by changing the item mix rather than re-tagging), and rebuilt from source.
2. **Fixes by the writer.** Rupee signs inside maths (rejected by KaTeX strict mode) were rewritten as Rs, a fill-blank solution was completed and deck 2 trimmed. **Originality gate.** Generic stems that matched other banks or this chapter word for word (once the maths is set aside) were rewritten by the producer with their own context.
3. **Every perimeter, area and historical approximation is computed and asserted (141 re-solve checks).**

## Known gaps
- Narration audio is not generated (TTS stage).

