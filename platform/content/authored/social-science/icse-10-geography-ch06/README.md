# ICSE Class 10 Geography, Chapter 6 — Climate of India

`icse-10-geography-ch06` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `social-science` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (13 + 13 slides), notes (6 sections), 30 flashcards, 62 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10geo_ch06_short` (20 marks, 30 min) and `t_icse10geo_ch06_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-geography-chapter-test-short` / `-long` (Part I compulsory MCQs, assertion-reason and 2- and 3-mark short answers; Part II 10-mark structured questions in four parts 2 + 2 + 3 + 3, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ICSE 10 Physics builder adapted for ICSE Geography ids and blueprints, with the pipeline’s verify checks and an answer-leak scan run inside the build; every figure used in a calculation is clearly labelled illustrative data, computed in code and asserted; SVG geometry is computed in svgs.mjs and self-checked), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/social-science/icse-10-geography-ch06/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 6 syllabus topics are covered: t01 Factors affecting India's climate: latitude, altitude, distance from the sea, winds, the Himalayas, jet streams and El Nino; t02 Distribution of temperature, rainfall and winds in summer and winter; t03 The monsoon and its mechanism; t04 Seasons: hot weather, south-west monsoon, retreating monsoon and cold weather; t05 Local winds and seasonal weather phenomena (loo, mango showers, Kalbaisakhi, western disturbances); t06 Interpreting climate data of Indian stations.
- Facts a reviewer may wish to double-check (time-sensitive facts are marked “as of the early 2020s” in the content): All station data (Stations P, Q and R) are illustrative, rounded values for three types of Indian station, not official records; monsoon onset in Kerala about 1 June and coverage of India by mid-July; 75–90% of annual rain in June–September; lapse rate about 6.5 °C per km; Mawsynram and Cherrapunji named as among the wettest places.

## Shape
- **Part 1, 13 slides:** factors affecting India’s climate (1); factors affecting India’s climate (2); summer and winter patterns; the monsoon: a seasonal reversal of winds; worked example (explaining monsoon behaviour); arabian Sea and Bay of Bengal branches; worked example (why the west coast is wetter); summary; exam tips; 3 checks.
- **Part 2, 13 slides:** hot weather and south-west monsoon seasons; retreating monsoon and cold weather seasons; local winds and seasonal weather; worked example (why does Chennai get winter rain?); reading a climate graph: a west-coast station; an interior station; worked example (identifying a station); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 7 · diagram 3 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: flow 3 · svg 4 · table 13. Four SVGs: three climate graphs (rainfall bars and temperature line drawn from the illustrative data, self-checked) and a two-panel schematic of land and sea pressure with the monsoon wind reversal (arrows checked to run from high to low pressure). Narration 13–76 words (mean 55), no symbols, formulae or unit abbreviations.

## Question bank (62)
| Type | Count | Marks |
|---|---|---|
| mcq | 24 | 1 (keys a 6, b 6, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys c a c c c) |
| true-false | 6 | 1 |
| fill-blank | 4 | 1 (one blank each) |
| match | 2 | 2 (four pairs, half a mark each) |
| short (1 mark) | 1 | 1 (a name or a one-line answer) |
| numerical | 5 | 1 or 2 (1244 mm; 5.6 °C; 630 mm; 770 mm; 8 °C) |
| short (2 marks) | 6 | 2 |
| short (3 marks) | 4 | 3 (geographical reasons, comparisons, data interpretation) |
| long | 5 | 10, set in four parts with marks shown (2 + 2 + 3 + 3), as in Part II of the ICSE paper |

- No case-based items: the ICSE Geography pattern has none (the 10-mark structured questions carry the data, diagram or situation instead). No reproduced or traced official maps: diagrams are schematic and labelled where not to scale.
- **Difficulty:** d1 19 · d2 29 · d3 13 · d4 1.
- **Competency:** recall 14 · understanding 17 · application 22 · analysis 9. Application or higher is **50% of items (53% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 12 · t02 4 · t03 14 · t04 13 · t05 13 · t06 15.
- **Deck checks:** q001, q014, q015 (Part 1); q025, q033, q041 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Geography blueprints)
- **Short (20 marks, 30 min):** I q002, q003, q010, q016, q007, q008, q023 · II (q058 or q061).
- **Long (40 marks, 60 min):** I q004, q011, q017, q018, q026, q027, q034, q042, q019, q030, q024, q039, q031, q048 · II (q059 or q060 or q062).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their computed-geometry self-checks (4 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 10/10 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-geography.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Specific stems.** Every stem names its own places or data (Mumbai and Delhi, Shimla and Chandigarh, Ludhiana frost, Pune in the rain-shadow, Mangaluru and Bengaluru, Kochi and Nagpur, the three illustrative stations). CBSE 10 Social Science has no climate chapter; its other geography stems are not reused.
2. **Fixes after the first build.** A slide heading and a bullet containing “data:” tripped the URL-scheme rule and were reworded; eight application items were added (54 → 62 items; application or higher 44% → 50%). Rebuilt clean.
3. **Every range, total and share computed from the illustrative data in code and asserted**; four diagram self-checks pass.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.
- **2026-11-05:** assertion-reason options reordered to the ICSE 2027 Geography specimen paper (502) order and wording; every key re-mapped so each item's meaning is unchanged.
