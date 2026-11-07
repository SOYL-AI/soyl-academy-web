# ICSE Class 10 Physics, Chapter 11 — Calorimetry

`icse-10-physics-ch11` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (13 + 12 slides), notes (5 sections), 30 flashcards, 63 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10phy_ch11_short` (20 marks, 30 min) and `t_icse10phy_ch11_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-physics-chapter-test-short` / `-long` (Section A compulsory MCQs, assertion-reason, 1-mark fill-ins, a 2-mark match and 2- and 3-mark short answers; Section B 10-mark structured questions in parts 3 + 3 + 4, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ICSE 10 Chemistry builder adapted for ICSE Physics ids and blueprints, with the physics number helpers, the pipeline’s verify checks and an answer-leak scan run inside the build; every numerical is computed in code and asserted; SVG geometry is computed in svgs.mjs and self-checked), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/physics/icse-10-physics-ch11/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 5 syllabus topics are covered: t01 Heat and temperature and their units; heat capacity and specific heat capacity and their relation; t02 Principle of method of mixtures; numerical problems on heat lost and gained; t03 High specific heat capacity of water: natural phenomena and uses; t04 Change of state; heating curve of water; specific latent heat of fusion; t05 Everyday phenomena involving latent heat of fusion.
- Removed topics are respected: Latent heat of vaporisation numericals (only fusion is examined).
- Facts a reviewer may wish to double-check: c(water) 4200, c(ice) 2100, c(copper) 400, c(aluminium) 900 J kg⁻¹ K⁻¹; L(ice) 336 000 J kg⁻¹; heating curve for 1 kg of ice from −10 °C at 1000 W (21 s, 336 s, 420 s); latent heat of vaporisation is described but not used numerically (removed topic respected).

## Shape
- **Part 1, 13 slides:** heat and temperature; heat capacity and specific heat capacity; worked example (using Q = mcΔT); principle of method of mixtures; worked example (mixing hot and cold water); worked example (specific heat capacity of a metal); water’s high specific heat capacity; summary; exam tips; 3 checks.
- **Part 2, 12 slides:** change of state and latent heat; heating curve of ice to steam; worked example (melting ice); worked example (ice in a drink); worked example (heat given out on freezing); ice at 0 °C cools better than water at 0 °C; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 4 · diagram 3 · example 6 · check 6 · summary 2 · exam-tips 2. Visuals: flow 1 · plot 1 · svg 2 · table 15. Two SVGs (land and sea breezes, with the surface wind direction checked; a metal block in a calorimeter for the method of mixtures) and a heating-curve plot whose segment lengths are computed from Q = mcΔT and Q = mL. Narration 12–72 words (mean 49), no symbols, formulae or unit abbreviations.

## Question bank (63)
| Type | Count | Marks |
|---|---|---|
| mcq | 17 | 1 (keys a 5, b 4, c 4, d 4; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys c c a c c) |
| true-false | 6 | 1 |
| fill-blank | 6 | 1 (one blank each) |
| match | 2 | 2 (four pairs, half a mark each) |
| short (1 mark) | 4 | 1 (a definition, a name or a one-step answer) |
| numerical | 10 | 1 or 2 (800 J K⁻¹; 472500 J; 900 J kg⁻¹ K⁻¹; 40 °C; 681 J kg⁻¹ K⁻¹; 0.5 kg; 69300 J; 28.3 °C; 630000 J; 0.075 kg) |
| short (2 marks) | 6 | 2 |
| short (3 marks) | 2 | 3 (calculations with formula, substitution and unit; reasons; comparisons) |
| long | 5 | 10, set in parts with marks shown (3 + 3 + 4), as in Section B of the ICSE paper |

- No case-based items: the ICSE Physics pattern has none (the 10-mark structured questions carry the data, diagram or situation instead).
- **Difficulty:** d1 21 · d2 29 · d3 10 · d4 3.
- **Competency:** recall 13 · understanding 17 · application 27 · analysis 6. Application or higher is **52% of items (64% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 19 · t02 13 · t03 9 · t04 18 · t05 9.
- **Deck checks:** q001, q015, q026 (Part 1); q033, q032, q043 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Physics blueprints)
- **Short (20 marks, 30 min):** A q002, q003, q004, q008, q010, q022, q013, q031 · B (q059 or q062).
- **Long (40 marks, 60 min):** A q016, q017, q027, q034, q044, q038, q011, q040, q046, q058, q024, q042, q047, q014 · B (q060 or q061 or q063).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their computed-geometry self-checks (3 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 25/25 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-physics.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Specific stems.** Every stem names its own bodies and data (500 g in a kettle, a copper ball into lemonade, a 0.8 kg aluminium pan, a hair-dryer on ice, Himachal farmers flooding fields, 60 g of ice in 300 g of lemonade).
2. **Fixes after the first build.** One metal’s specific heat came out unrealistically high (1529 J kg⁻¹ K⁻¹) and the data were changed to give 563; one worked example whose escapes were lost was rewritten; nine items were added to reach the class-10 minimum; one solution was given an explicit “= … ≈” step. Rebuilt clean.
3. **Every numerical computed in code and asserted** by the build’s re-solve checks.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.
- **2026-11-05:** assertion-reason options reordered to the ICSE 2027 Physics specimen paper (521) order and wording; every key re-mapped so each item's meaning is unchanged.
