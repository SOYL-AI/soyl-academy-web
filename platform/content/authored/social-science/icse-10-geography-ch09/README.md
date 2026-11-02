# ICSE Class 10 Geography, Chapter 9 — Water Resources

`icse-10-geography-ch09` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `social-science` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 15 slides), notes (6 sections), 31 flashcards, 63 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10geo_ch09_short` (20 marks, 30 min) and `t_icse10geo_ch09_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-geography-chapter-test-short` / `-long` (Part I compulsory MCQs, assertion-reason and 2- and 3-mark short answers; Part II 10-mark structured questions in four parts 2 + 2 + 3 + 3, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ICSE 10 Physics builder adapted for ICSE Geography ids and blueprints, with the pipeline’s verify checks and an answer-leak scan run inside the build; every figure used in a calculation is clearly labelled illustrative data, computed in code and asserted; SVG geometry is computed in svgs.mjs and self-checked), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/social-science/icse-10-geography-ch09/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 4 syllabus topics are covered: t01 Sources of water: surface water and groundwater; need for conservation; t02 Rainwater harvesting: methods and importance; t03 Irrigation: importance; wells, tube wells and tanks; t04 Canal irrigation and modern methods: drip and sprinkler irrigation.
- Facts a reviewer may wish to double-check (time-sensitive facts are marked “as of the early 2020s” in the content): Wells and tube wells described as the leading source of irrigation (as of the early 2020s); falling water tables in Punjab, Haryana, western Uttar Pradesh, Rajasthan and Tamil Nadu; canal examples (Indira Gandhi, Upper Ganga, Western Yamuna, Sirhind); rooftop-harvest, district-share and irrigation-efficiency figures are illustrative.

## Shape
- **Part 1, 14 slides:** surface water and groundwater; where India’s water is found; why water must be conserved; worked example (a falling water table); rainwater harvesting: meaning and methods; rooftop rainwater harvesting; worked example (how much rain can a roof catch?); why rainwater harvesting matters; summary; exam tips; 3 checks.
- **Part 2, 15 slides:** why irrigation is needed in India; wells and tube wells; worked example (why tube wells suit the northern plains); tank irrigation; worked example (reading irrigation data); canal irrigation: inundation and perennial canals; disadvantages of canal irrigation; modern methods: drip and sprinkler irrigation; worked example (how much water does drip save?); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 8 · diagram 4 · example 5 · check 6 · summary 2 · exam-tips 2. Visuals: flow 6 · svg 5 · table 12. Five SVGs (surface water and groundwater with dug and tube wells; rooftop harvesting with the harvest computed as area × rainfall × runoff coefficient; inundation versus perennial canal intakes; drip and sprinkler schematic; illustrative water use by flooding, sprinkler and drip). Narration 10–76 words (mean 55), no symbols, formulae or unit abbreviations.

## Question bank (63)
| Type | Count | Marks |
|---|---|---|
| mcq | 21 | 1 (keys a 6, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a a b c d a) |
| true-false | 5 | 1 |
| fill-blank | 5 | 1 (one blank each) |
| match | 2 | 2 (four pairs, half a mark each) |
| short (1 mark) | 2 | 1 (a name or a one-line answer) |
| numerical | 6 | 1 or 2 (56000 litres; 140 days; 100 m²; 5000 m³; 3000 m³; 44.4 %) |
| short (2 marks) | 7 | 2 |
| short (3 marks) | 4 | 3 (geographical reasons, comparisons, data interpretation) |
| long | 5 | 10, set in four parts with marks shown (2 + 2 + 3 + 3), as in Part II of the ICSE paper |

- No case-based items: the ICSE Geography pattern has none (the 10-mark structured questions carry the data, diagram or situation instead). No reproduced or traced official maps: diagrams are schematic and labelled where not to scale.
- **Difficulty:** d1 18 · d2 29 · d3 14 · d4 2.
- **Competency:** recall 14 · understanding 18 · application 22 · analysis 9. Application or higher is **49% of items (62% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 13 · t02 17 · t03 20 · t04 20.
- **Deck checks:** q001, q002, q011 (Part 1); q025, q026, q044 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Geography blueprints)
- **Short (20 marks, 30 min):** I q004, q012, q028, q046, q017, q009, q041 · II (q059 or q062).
- **Long (40 marks, 60 min):** I q003, q013, q014, q015, q027, q029, q030, q045, q005, q049, q020, q038, q021, q055 · II (q060 or q061 or q063).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their computed-geometry self-checks (6 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 9/9 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-geography.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Authoring.** Drafted by a helper author working to the same brief and template, who re-solved every item; the chapter producer rebuilt it from source (validator, lint, verify and leak scan clean).
2. **Specific stems.** CBSE 10 Social Science ch08 set-ups (rooftop harvesting at a school, the Tamil Nadu compulsory-harvesting item, three reasons to conserve water) are not reused.
3. **Every calculated value computed from labelled illustrative data and asserted.**

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

