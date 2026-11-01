# ICSE Class 10 Geography, Chapter 14 — Cash Crops: Sugarcane, Oilseeds, Cotton, Jute and Tea

`icse-10-geography-ch14` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `social-science` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 14 slides), notes (6 sections), 31 flashcards, 73 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10geo_ch14_short` (20 marks, 30 min) and `t_icse10geo_ch14_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-geography-chapter-test-short` / `-long` (Part I compulsory MCQs, assertion-reason and 2- and 3-mark short answers; Part II 10-mark structured questions in four parts 2 + 2 + 3 + 3, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ICSE 10 Physics builder adapted for ICSE Geography ids and blueprints, with the pipeline’s verify checks and an answer-leak scan run inside the build; every figure used in a calculation is clearly labelled illustrative data, computed in code and asserted; SVG geometry is computed in svgs.mjs and self-checked), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/social-science/icse-10-geography-ch14/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 5 syllabus topics are covered: t01 Sugarcane: requirements, methods of cultivation and producing states; t02 Oilseeds: groundnut, mustard and soya bean; t03 Cotton: requirements, cultivation and producing states; t04 Jute: requirements, cultivation (retting) and producing states; t05 Tea: requirements, cultivation and processing; producing states.
- Facts a reviewer may wish to double-check (time-sensitive facts are marked “as of the early 2020s” in the content): Leading states (as of the early 2020s): sugarcane Uttar Pradesh; groundnut Gujarat; mustard Rajasthan; soya bean Madhya Pradesh; cotton Gujarat and Maharashtra; jute West Bengal; tea Assam. Approximate growing conditions; retting 2–3 weeks; Partition cut Hooghly mills off from jute areas. Cane yields, 10% sugar recovery and the 4 : 1 leaf-to-made-tea ratio are illustrative round figures.

## Shape
- **Part 1, 14 slides:** sugarcane: what it needs; planting and ratooning; north and south: why yields differ; worked example (comparing cane yields); oilseeds: groundnut, mustard and soya bean; worked example (which oilseed where?); cotton: what it needs; from field to mill; summary; exam tips; 3 checks.
- **Part 2, 14 slides:** jute: what it needs; retting: freeing the fibre; where jute grows, and its uses; worked example (why the delta?); tea: what it needs; a tea garden on the slopes; plucking and processing; worked example (from leaf to cup); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 8 · diagram 4 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: flow 3 · svg 4 · table 15. Four SVGs (sugarcane setts and ratoon shoots; illustrative north versus peninsular cane yields; jute retting and drying; tea bushes on a slope with shade trees and drains, not to scale). Narration 13–69 words (mean 52), no symbols, formulae or unit abbreviations.

## Question bank (73)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 | 1 (keys a 7, b 7, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 8 | 1 (keys a a a b a c a d) |
| true-false | 5 | 1 |
| fill-blank | 5 | 1 (one blank each) |
| match | 2 | 2 (four pairs, half a mark each) |
| short (1 mark) | 2 | 1 (a name or a one-line answer) |
| numerical | 4 | 1 or 2 (80 t/ha; 25 %; 500 tonnes; 450 kg) |
| short (2 marks) | 10 | 2 |
| short (3 marks) | 6 | 3 (geographical reasons, comparisons, data interpretation) |
| long | 5 | 10, set in four parts with marks shown (2 + 2 + 3 + 3), as in Part II of the ICSE paper |

- No case-based items: the ICSE Geography pattern has none (the 10-mark structured questions carry the data, diagram or situation instead). No reproduced or traced official maps: diagrams are schematic and labelled where not to scale.
- **Difficulty:** d1 23 · d2 42 · d3 7 · d4 1.
- **Competency:** recall 21 · understanding 18 · application 25 · analysis 7 · evaluation 2. Application or higher is **47% of items (46% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 19 · t02 12 · t03 14 · t04 17 · t05 18.
- **Deck checks:** q001, q013, q023 (Part 1); q035, q036, q049 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Geography blueprints)
- **Short (20 marks, 30 min):** I q005, q015, q027, q052, q028, q010, q060 · II (q069 or q072).
- **Long (40 marks, 60 min):** I q002, q003, q014, q026, q037, q039, q050, q054, q016, q042, q032, q047, q011, q048 · II (q070 or q071 or q073).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their computed-geometry self-checks (4 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 5/5 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-geography.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Authoring.** Drafted by a helper author working to the same brief and template, who re-solved every item and rendered the SVGs; the chapter producer rebuilt it from source (validator, lint, verify and leak scan clean).
2. **Fixes.** Application or higher was 42% at first; five redundant lower-order items were removed and two re-framed as applied, place-based items (47%); label overlaps in three diagrams were fixed.
3. **Every calculated value computed from labelled illustrative data and asserted.**

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

