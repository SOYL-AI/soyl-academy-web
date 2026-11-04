# CBSE Class 9 Science, Chapter 6 — Work, Energy and Simple Machines

`cbse-9-science-ch06` · release v1 · academic year 2026-27 · family `science` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 20 slides), notes (6 sections), 32 flashcards, 65 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse9sci_ch06_short` (20 marks, 40 min) and `t_cbse9sci_ch06_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-9-default-chapter-test-short` / `-long` (the subject has no chapter-test blueprints of its own). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the shared CBSE 9 Science builder, kept once in `cbse-9-science-ch01/src/lib.mjs` and re-exported by the other chapters; CBSE 11/12 Chemistry lineage with CBSE 9 ids and blueprints; the pipeline’s verify checks and an answer-leak scan run inside the build), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/science/cbse-9-science-ch06/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 syllabus, new NCERT Class 9 book under NCF-SE 2023)
- All 4 syllabus topics are covered: t01 Work done by a force; t02 Kinetic and potential energy; work–energy theorem; t03 Conservation of energy and power; t04 Simple machines and mechanical advantage.

- Facts a reviewer may wish to double-check: g = 9.8 m s⁻²; 1 kWh = 3.6 × 10⁶ J; cos θ limited to 0°, 90° and 180° plus one stated cos 60° = 0.50; ideal pulleys (VR = number of supporting strands); typical appliance powers and a ₹7 per kWh tariff labelled illustrative.

## Shape
- **Part 1, 18 slides:** work done by a force; positive, negative and zero work; worked example (work by push and by friction); work from a force–displacement graph; worked example (stretching a rubber cord); energy and the joule; kinetic energy: ½mv² from the equations of motion; kinetic energy and speed; worked example (kinetic energy of a cyclist); potential energy: mgh; the work–energy theorem; worked example (stopping a handcart); summary; exam tips; 3 checks.
- **Part 2, 20 slides:** forms and transformations of energy; mechanical energy of a falling body; the simple pendulum; a roller-coaster track; worked example (a slide and a thrown ball); power and units of energy; worked example (power of a hand pump); worked example (an electricity bill); simple machines and mechanical advantage; levers and their three classes; worked example (a crowbar); pulleys; efficiency of a machine; worked example (a block and tackle); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 10 · diagram 7 · example 9 · check 6 · summary 2 · exam-tips 2. Visuals: flow 1 · plot 1 · svg 6 · table 22. Six SVGs and a plot (signs of work, work as area, kinetic and potential energy bars for a falling mango computed from the data, a roller coaster, three classes of lever, pulley systems), rendered and checked. Narration 12–80 words (mean 58), no symbols, formulae or unit abbreviations.

## Question bank (65)
| Type | Count | Marks |
|---|---|---|
| mcq | 21 | 1 (keys a 6, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a b c c d a) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 9 | 1–3 (5000 J; 1000 J; 72 J; 18 m; 3.96 m s⁻¹; 44.1 W; 1.14 kWh; 200 N; 78.9 %) |
| short (2 marks) | 7 | 2 (30–50 words) |
| short (3 marks) | 5 | 3 (50–80 words) |
| long | 5 | 5 (80–120 words) |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 9 · d2 37 · d3 16 · d4 3.
- **Competency:** recall 4 · understanding 22 · application 34 · analysis 5. Application or higher is **60% of items (69% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 13 · t02 17 · t03 19 · t04 17.
- **Deck checks:** q001, q014, q015 (Part 1); q031, q032, q049 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 9 class-default blueprints)
- **Short (20 marks, 40 min):** A q005, q016, q034, q007 · B q010, q026, q045 · C (q012 or q046) · D q013.
- **Long (40 marks, 90 min):** A q003, q004, q017, q018, q033, q035, q050, q052, q055, q056 · B q011, q043, (q044 or q060), q027, (q062 or q063) · C q029, (q047 or q064) · D q030, q065.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (12 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 28/28 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-04-subject-producer-cbse9-science.md`.

## Verifier pass (2026-11-04)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet); the producer reviewed the work–energy treatment and the machines.
2. **Fixes by the writer.** A rupee sign was moved out of maths mode, model answers lengthened and a floating-point equality in a lever check rounded; ICSE 10 machine set-ups were avoided.
3. **Originality gate.** A true-false stem on work as a scalar matched an ICSE 10 Physics stem; the producer rewrote it around two named students pushing trolleys in different directions.
4. **Every numerical (work, kinetic and potential energy, power, energy cost, mechanical advantage, efficiency) is computed and asserted.**

## Known gaps
- Narration audio is not generated (TTS stage).

