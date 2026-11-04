# CBSE Class 9 Science, Chapter 3 — Motion

`cbse-9-science-ch03` · release v1 · academic year 2026-27 · family `science` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 18 slides), notes (6 sections), 32 flashcards, 66 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse9sci_ch03_short` (20 marks, 40 min) and `t_cbse9sci_ch03_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-9-default-chapter-test-short` / `-long` (the subject has no chapter-test blueprints of its own). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the shared CBSE 9 Science builder, kept once in `cbse-9-science-ch01/src/lib.mjs` and re-exported by the other chapters; CBSE 11/12 Chemistry lineage with CBSE 9 ids and blueprints; the pipeline’s verify checks and an answer-leak scan run inside the build), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/science/cbse-9-science-ch03/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 syllabus, new NCERT Class 9 book under NCF-SE 2023)
- All 4 syllabus topics are covered: t01 Displacement, velocity and acceleration; t02 Graphical representation of motion; t03 Kinematic equations for uniformly accelerated motion; t04 Uniform circular motion.

- Facts a reviewer may wish to double-check: g = 9.8 m s⁻² (stated where used); Moon’s orbit about 3.84 × 10⁸ m and 27.3 days (about 1.0 × 10³ m s⁻¹); π as 3.14 or 22/7 where stated; satellite values labelled illustrative. Uniform circular motion is described as accelerated (towards the centre) without a centripetal-force formula, at Class 9 level.

## Shape
- **Part 1, 18 slides:** distance and displacement; speed and velocity; worked example (distance, displacement, speed, velocity); average and instantaneous values; acceleration; worked example (acceleration); position–time graphs; slope of a position–time graph is velocity; worked example (average velocity from a graph); velocity–time graphs; area under a velocity–time graph is displacement; worked example (using the scooter graph); summary; exam tips; 3 checks.
- **Part 2, 18 slides:** uniform acceleration on a v–t graph; first equation: v = u + at; second equation: s = ut + ½at²; third equation: v² = u² + 2as; which equation should I use?; worked example (braking distance); worked example (a ball thrown upward); worked example (a train gaining speed); uniform circular motion; deriving v = 2πr / T; worked example (the Moon in orbit); circular motion is accelerated motion; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 12 · diagram 4 · example 8 · check 6 · summary 2 · exam-tips 2. Visuals: flow 3 · plot 2 · svg 5 · table 18. Five SVGs and two plots (displacement map, position–time shapes, velocity–time graphs with area, a scooter trapezium, circular motion), rendered and checked; 12 self-checks. Narration 18–72 words (mean 56), no symbols, formulae or unit abbreviations.

## Question bank (66)
| Type | Count | Marks |
|---|---|---|
| mcq | 19 | 1 (keys a 5, b 5, c 5, d 4; seeded balanced shuffle) |
| assertion-reason | 7 | 1 (keys a d a b c a c) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 9 | 1–3 (13.9 m s⁻¹; 2 m s⁻¹; 0.5 m s⁻²; 6 m s⁻¹; 100 m; 125 m; 44.1 m; 0.33 m s⁻²; 4.2 m s⁻¹) |
| short (2 marks) | 7 | 2 (30–50 words) |
| short (3 marks) | 7 | 3 (50–80 words) |
| long | 5 | 5 (80–120 words) |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 14 · d2 31 · d3 18 · d4 3.
- **Competency:** recall 6 · understanding 19 · application 31 · analysis 10. Application or higher is **62% of items (70% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 19 · t02 16 · t03 23 · t04 12.
- **Deck checks:** q001, q020, q021 (Part 1); q034, q035, q057 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 9 class-default blueprints)
- **Short (20 marks, 40 min):** A q002, q003, q022, q009 · B q014, q031, q017 · C (q050 or q065) · D q019.
- **Long (40 marks, 90 min):** A q004, q005, q006, q023, q036, q037, q038, q058, q010, q041 · B q015, q016, (q030 or q053), q033, (q049 or q064) · C q032, (q051 or q018) · D q052, q066.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (12 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 27/27 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-04-subject-producer-cbse9-science.md`.

## Verifier pass (2026-11-04)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet); the producer reviewed the kinematics and the graphs.
2. **Fixes by the writer.** Rounded values joined by “=” were changed to ≈, model answers lengthened, a clipped velocity–time graph rescaled and label overlaps fixed; CBSE 11 Motion set-ups were avoided.
3. **Every numerical (average speed and velocity, acceleration, the three equations of motion, circular speed) is computed and asserted.**

## Known gaps
- Narration audio is not generated (TTS stage).

