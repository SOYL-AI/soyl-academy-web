# ICSE Class 10 Physics, Chapter 3 — Machines

`icse-10-physics-ch03` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (12 + 12 slides), notes (4 sections), 30 flashcards, 63 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10phy_ch03_short` (20 marks, 30 min) and `t_icse10phy_ch03_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-physics-chapter-test-short` / `-long` (Section A compulsory MCQs, assertion-reason, 1-mark fill-ins, a 2-mark match and 2- and 3-mark short answers; Section B 10-mark structured questions in parts 3 + 3 + 4, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ICSE 10 Chemistry builder adapted for ICSE Physics ids and blueprints, with the physics number helpers, the pipeline’s verify checks and an answer-leak scan run inside the build; every numerical is computed in code and asserted; SVG geometry is computed in svgs.mjs and self-checked), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/physics/icse-10-physics-ch03/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 4 syllabus topics are covered: t01 Machines as force multipliers; load, effort, mechanical advantage, velocity ratio, input, output and efficiency; t02 Levers: principle; first, second and third class levers; MA and VR of each class; t03 Levers in the human body; t04 Pulley systems: single fixed, single movable, block and tackle; MA, VR and efficiency.
- Facts a reviewer may wish to double-check: Efficiency = MA/VR derived from output/input; class II levers always MA > 1 and class III always MA < 1; block and tackle with no friction: nE = L + w, η = L/(L + w); body levers: neck class I, raising the heels class II, forearm class III.

## Shape
- **Part 1, 12 slides:** load, effort, MA and VR; efficiency and η = MA / VR; worked example (a machine’s efficiency); levers: the three classes; worked example (classifying and calculating); levers in the human body; summary; exam tips; 3 checks.
- **Part 2, 12 slides:** single fixed and single movable pulleys; worked example (a movable pulley with a heavy block); block and tackle; worked example (a block and tackle); why MA is less than VR in pulley systems; worked example (efficiency rises with load); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 4 · diagram 3 · example 5 · check 6 · summary 2 · exam-tips 2. Visuals: flow 1 · svg 3 · table 14. Three SVGs with checked geometry: the three classes of lever (positions of fulcrum, load and effort checked against MA > 1 or < 1), a block and tackle with four supporting strands (VR 4), and single fixed and movable pulleys. Narration 10–83 words (mean 51), no symbols, formulae or unit abbreviations.

## Question bank (63)
| Type | Count | Marks |
|---|---|---|
| mcq | 17 | 1 (keys a 5, b 4, c 4, d 4; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys c b c c a c) |
| true-false | 5 | 1 |
| fill-blank | 6 | 1 (one blank each) |
| match | 2 | 2 (four pairs, half a mark each) |
| short (1 mark) | 3 | 1 (a definition, a name or a one-step answer) |
| numerical | 9 | 1 or 2 (3.2; 80 %; 133.33333333333334 N; 50 N; 0.25; 180 N; 89 %; 1 m; 50 N) |
| short (2 marks) | 7 | 2 |
| short (3 marks) | 3 | 3 (calculations with formula, substitution and unit; reasons; comparisons) |
| long | 5 | 10, set in parts with marks shown (3 + 3 + 4), as in Section B of the ICSE paper |

- No case-based items: the ICSE Physics pattern has none (the 10-mark structured questions carry the data, diagram or situation instead).
- **Difficulty:** d1 21 · d2 25 · d3 15 · d4 2.
- **Competency:** recall 14 · understanding 9 · application 32 · analysis 8. Application or higher is **63% of items (77% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 21 · t02 20 · t03 8 · t04 22.
- **Deck checks:** q001, q016, q029 (Part 1); q034, q035, q036 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Physics blueprints)
- **Short (20 marks, 30 min):** A q002, q003, q017, q008, q011, q024, q013, q027 · B (q059 or q061).
- **Long (40 marks, 60 min):** A q004, q018, q019, q030, q037, q022, q012, q025, q043, q057, q014, q032, q045, q046 · B (q060 or q062 or q063).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their computed-geometry self-checks (3 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 25/25 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-physics.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Specific stems.** Every stem names its own machine and data (a car jack, a crowbar on a stone, a wheelbarrow with handles 1.5 m from the axle, fire tongs, a 30 N weight 35 cm from the elbow, a VR-5 tackle lifting 2000 N).
2. **Fixes after the first build.** The bank was below the class-10 minimum (53 items) and the Part 2 deck had 11 slides; ten items and a worked example on efficiency rising with load were added. Rebuilt clean.
3. **Every numerical computed in code and asserted** by the build’s re-solve checks.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.
- **2026-11-05:** assertion-reason options reordered to the ICSE 2027 Physics specimen paper (521) order and wording; every key re-mapped so each item's meaning is unchanged.
