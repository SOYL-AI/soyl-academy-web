# ICSE Class 10 Physics, Chapter 1 — Force: Turning Effect and Circular Motion

`icse-10-physics-ch01` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (13 + 14 slides), notes (5 sections), 30 flashcards, 64 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10phy_ch01_short` (20 marks, 30 min) and `t_icse10phy_ch01_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-physics-chapter-test-short` / `-long` (Section A compulsory MCQs, assertion-reason, 1-mark fill-ins, a 2-mark match and 2- and 3-mark short answers; Section B 10-mark structured questions in parts 3 + 3 + 4, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ICSE 10 Chemistry builder adapted for ICSE Physics ids and blueprints, with the physics number helpers, the pipeline’s verify checks and an answer-leak scan run inside the build; every numerical is computed in code and asserted; SVG geometry is computed in svgs.mjs and self-checked), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/physics/icse-10-physics-ch01/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 5 syllabus topics are covered: t01 Translational and rotational motion; moment of a force (torque) and its SI and cgs units; t02 Clockwise and anticlockwise moments; resultant moment; t03 Equilibrium: conditions for translational and rotational equilibrium; principle of moments; t04 Centre of gravity of regular bodies and irregular laminae (qualitative); t05 Uniform circular motion; centripetal and centrifugal force.
- Facts a reviewer may wish to double-check: 1 N m = 10⁷ dyne cm; the metre-rule examples include the rule’s own weight at its 50 cm mark when it is not pivoted there; centrifugal force is described as an apparent force in the rotating frame (not drawn on free-body diagrams).

## Shape
- **Part 1, 13 slides:** translational and rotational motion; moment of a force; worked example (tightening a nut); why handles are far from the axis; clockwise and anticlockwise moments; worked example (a resultant moment); couple: two equal and opposite forces; summary; exam tips; 3 checks.
- **Part 2, 14 slides:** conditions of equilibrium; the principle of moments; worked example (finding an unknown weight); centre of gravity; worked example (a rule not pivoted at its centre); uniform circular motion; centripetal and centrifugal force; worked example (what supplies the centripetal force?); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 6 · diagram 4 · example 5 · check 6 · summary 2 · exam-tips 2. Visuals: flow 1 · svg 4 · table 16. Four SVGs with computed geometry: a metre rule balanced by the principle of moments (800 gf cm each side), a spanner with the perpendicular distance dimensioned, uniform circular motion with tangent velocity and inward force arrows checked perpendicular, and centres of gravity of a rod, ring and triangle with the plumb-line method. Narration 9–77 words (mean 50), no symbols, formulae or unit abbreviations.

## Question bank (64)
| Type | Count | Marks |
|---|---|---|
| mcq | 19 | 1 (keys a 5, b 5, c 5, d 4; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys c c b c b) |
| true-false | 5 | 1 |
| fill-blank | 6 | 1 (one blank each) |
| match | 2 | 2 (four pairs, half a mark each) |
| short (1 mark) | 5 | 1 (a definition, a name or a one-step answer) |
| numerical | 7 | 1 or 2 (30 N; 0.3 m; 0.5 N m; 150 gf; 90 cm; 6000000 dyne cm; 15 N) |
| short (2 marks) | 8 | 2 |
| short (3 marks) | 2 | 3 (calculations with formula, substitution and unit; reasons; comparisons) |
| long | 5 | 10, set in parts with marks shown (3 + 3 + 4), as in Section B of the ICSE paper |

- No case-based items: the ICSE Physics pattern has none (the 10-mark structured questions carry the data, diagram or situation instead).
- **Difficulty:** d1 22 · d2 30 · d3 10 · d4 2.
- **Competency:** recall 15 · understanding 18 · application 26 · analysis 5. Application or higher is **48% of items (55% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 16 · t02 13 · t03 18 · t04 13 · t05 15.
- **Deck checks:** q001, q012, q013 (Part 1); q021, q034, q042 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Physics blueprints)
- **Short (20 marks, 30 min):** A q002, q003, q022, q015, q006, q017, q011, q020 · B (q055 or q058).
- **Long (40 marks, 60 min):** A q004, q014, q023, q035, q043, q046, q007, q027, q049, q053, q031, q032, q051, q033 · B (q056 or q057 or q059).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their computed-geometry self-checks (4 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 21/21 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-physics.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Specific stems.** Every stem names its own objects and numbers (40 N on a wrench, a see-saw with 300 N at 1.5 m and 250 N at 2.0 m, a steering wheel of 40 cm diameter, a metre rule pivoted at 40 cm, a satellite, a cyclist on a bend). No CBSE 10 or CBSE/ISC 12 chapter covers moments in this form.
2. **Fixes after the first build.** Five application items were added (59 → 64 items; application or higher 44% → 48%); three solutions whose escapes were lost when appended were rewritten as raw strings; one numerical solution was given a plain “= 6000000” step. Rebuilt clean.
3. **Every numerical computed in code and asserted** by the build’s re-solve checks; four diagram self-checks pass.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.
- **2026-11-05:** assertion-reason options reordered to the ICSE 2027 Physics specimen paper (521) order and wording; every key re-mapped so each item's meaning is unchanged.
