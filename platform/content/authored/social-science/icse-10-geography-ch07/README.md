# ICSE Class 10 Geography, Chapter 7 — Soil Resources

`icse-10-geography-ch07` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `social-science` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 14 slides), notes (6 sections), 30 flashcards, 62 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10geo_ch07_short` (20 marks, 30 min) and `t_icse10geo_ch07_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-geography-chapter-test-short` / `-long` (Part I compulsory MCQs, assertion-reason and 2- and 3-mark short answers; Part II 10-mark structured questions in four parts 2 + 2 + 3 + 3, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ICSE 10 Physics builder adapted for ICSE Geography ids and blueprints, with the pipeline’s verify checks and an answer-leak scan run inside the build; every figure used in a calculation is clearly labelled illustrative data, computed in code and asserted; SVG geometry is computed in svgs.mjs and self-checked), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/social-science/icse-10-geography-ch07/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 5 syllabus topics are covered: t01 Alluvial soil: formation, distribution, composition, characteristics and crops; t02 Black soil: formation, distribution, characteristics and crops; t03 Red soil and laterite soil: formation, distribution, characteristics and crops; t04 Soil erosion: meaning, agents and causes; t05 Soil conservation: importance and methods.
- Facts a reviewer may wish to double-check (time-sensitive facts are marked “as of the early 2020s” in the content): Alluvial soil covers roughly two-fifths of India (sources quote 40–43%); alluvial soil described as rich in potash and lime, poor in nitrogen and humus (phosphorus left out because sources disagree); black-soil areas include Malwa, Saurashtra and Vidarbha; terrace farming in Sikkim, Uttarakhand and Darjeeling; shelter belts near Bikaner. Soil-loss trial figures are illustrative.

## Shape
- **Part 1, 14 slides:** what soil is and how it forms; alluvial soil: formation and distribution; khadar and bhangar; black soil (regur); worked example (why cotton thrives on the Malwa plateau); red soil; laterite soil and leaching; worked example (comparing red and laterite soils); summary; exam tips; 3 checks.
- **Part 2, 14 slides:** soil erosion and its types; human causes of soil erosion; worked example (how the Chambal ravines formed); why soil conservation matters; terrace farming and contour ploughing; shelter belts, afforestation and other methods; reading an illustrative field trial; worked example (percentage reduction in soil loss); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 9 · diagram 3 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: flow 4 · svg 5 · table 13. Five SVGs (soil profile with illustrative depths; khadar and bhangar cross-section; sheet, gully and wind erosion; terrace farming and contour ploughing; bar chart of an illustrative soil-loss trial). Narration 11–75 words (mean 54), no symbols, formulae or unit abbreviations.

## Question bank (62)
| Type | Count | Marks |
|---|---|---|
| mcq | 22 | 1 (keys a 6, b 6, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys b c a d b) |
| true-false | 5 | 1 |
| fill-blank | 5 | 1 (one blank each) |
| match | 2 | 2 (four pairs, half a mark each) |
| short (1 mark) | 2 | 1 (a name or a one-line answer) |
| numerical | 4 | 1 or 2 (45 %; 80 %; 192 t; 40 %) |
| short (2 marks) | 7 | 2 |
| short (3 marks) | 5 | 3 (geographical reasons, comparisons, data interpretation) |
| long | 5 | 10, set in four parts with marks shown (2 + 2 + 3 + 3), as in Part II of the ICSE paper |

- No case-based items: the ICSE Geography pattern has none (the 10-mark structured questions carry the data, diagram or situation instead). No reproduced or traced official maps: diagrams are schematic and labelled where not to scale.
- **Difficulty:** d1 18 · d2 31 · d3 11 · d4 2.
- **Competency:** recall 15 · understanding 16 · application 24 · analysis 7. Application or higher is **50% of items (56% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 12 · t02 10 · t03 15 · t04 11 · t05 18.
- **Deck checks:** q001, q011, q019 (Part 1); q032, q041, q042 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Geography blueprints)
- **Short (20 marks, 30 min):** I q002, q012, q033, q043, q036, q009, q031 · II (q058 or q060).
- **Long (40 marks, 60 min):** I q003, q004, q013, q020, q021, q034, q035, q044, q015, q045, q018, q038, q010, q040 · II (q059 or q061 or q062).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their computed-geometry self-checks (5 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 7/7 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-geography.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Authoring.** Drafted by a helper author working to the same brief and template, who re-solved every item; the chapter producer rebuilt it from source (validator, lint, verify and leak scan clean).
2. **Specific stems.** CBSE 10 Social Science ch06 set-ups (khadar and bangar distinction, the black soil and cotton assertion-reason, rows-of-trees fill-in) are not reused.
3. **Every calculated value computed from labelled illustrative data and asserted.**

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.
- **2026-11-05:** assertion-reason options reordered to the ICSE 2027 Geography specimen paper (502) order and wording; every key re-mapped so each item's meaning is unchanged.
