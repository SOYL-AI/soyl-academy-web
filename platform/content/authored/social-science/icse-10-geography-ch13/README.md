# ICSE Class 10 Geography, Chapter 13 — Food Crops: Rice, Wheat, Millets and Pulses

`icse-10-geography-ch13` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `social-science` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 14 slides), notes (6 sections), 31 flashcards, 67 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10geo_ch13_short` (20 marks, 30 min) and `t_icse10geo_ch13_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-geography-chapter-test-short` / `-long` (Part I compulsory MCQs, assertion-reason and 2- and 3-mark short answers; Part II 10-mark structured questions in four parts 2 + 2 + 3 + 3, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ICSE 10 Physics builder adapted for ICSE Geography ids and blueprints, with the pipeline’s verify checks and an answer-leak scan run inside the build; every figure used in a calculation is clearly labelled illustrative data, computed in code and asserted; SVG geometry is computed in svgs.mjs and self-checked), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/social-science/icse-10-geography-ch13/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 4 syllabus topics are covered: t01 Rice: climatic and soil requirements, methods of cultivation and producing states; t02 Wheat: climatic and soil requirements, methods of cultivation and producing states; t03 Millets (jowar, bajra, ragi): requirements, cultivation and producing states; t04 Pulses: requirements, cultivation and producing states.
- Facts a reviewer may wish to double-check (time-sensitive facts are marked “as of the early 2020s” in the content): Leading states (as of the early 2020s): rice West Bengal; wheat Uttar Pradesh; jowar Maharashtra; bajra Rajasthan; ragi Karnataka; pulses Madhya Pradesh; India still imports pulses. Approximate temperature and rainfall requirements of each crop; transplanting after 4–6 weeks. District yield data are illustrative.

## Shape
- **Part 1, 14 slides:** rice: what it needs; growing rice: methods of cultivation; where rice grows; worked example (why the deltas grow rice); wheat: what it needs; comparing water needs; growing wheat and where it grows; worked example (rice and wheat side by side); summary; exam tips; 3 checks.
- **Part 2, 14 slides:** why millets suit dry lands; jowar, bajra and ragi; worked example (choosing a millet); pulses: types and requirements; how pulses enrich the soil; where pulses grow; comparing yields across districts; worked example (average yield); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 8 · diagram 4 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: flow 2 · svg 3 · table 17. Three SVGs (paddy transplanting from nursery to flooded rows; approximate rainfall ranges by crop; illustrative four-district rice yields). Narration 11–70 words (mean 52), no symbols, formulae or unit abbreviations.

## Question bank (67)
| Type | Count | Marks |
|---|---|---|
| mcq | 24 | 1 (keys a 6, b 6, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 8 | 1 (keys a b a d a c a b) |
| true-false | 5 | 1 |
| fill-blank | 5 | 1 (one blank each) |
| match | 2 | 2 (four pairs, half a mark each) |
| short (1 mark) | 2 | 1 (a name or a one-line answer) |
| numerical | 4 | 1 or 2 (3.5 t/ha; 3 t/ha; 40 %; 500 thousand tonnes) |
| short (2 marks) | 7 | 2 |
| short (3 marks) | 5 | 3 (geographical reasons, comparisons, data interpretation) |
| long | 5 | 10, set in four parts with marks shown (2 + 2 + 3 + 3), as in Part II of the ICSE paper |

- No case-based items: the ICSE Geography pattern has none (the 10-mark structured questions carry the data, diagram or situation instead). No reproduced or traced official maps: diagrams are schematic and labelled where not to scale.
- **Difficulty:** d1 24 · d2 33 · d3 9 · d4 1.
- **Competency:** recall 17 · understanding 18 · application 21 · analysis 10 · evaluation 1. Application or higher is **48% of items (50% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 27 · t02 16 · t03 15 · t04 17.
- **Deck checks:** q001, q002, q015 (Part 1); q027, q039, q055 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Geography blueprints)
- **Short (20 marks, 30 min):** I q006, q018, q028, q041, q007, q024, q014 · II (q063 or q065).
- **Long (40 marks, 60 min):** I q003, q005, q019, q017, q029, q031, q043, q044, q020, q045, q036, q052, q025, q037 · II (q064 or q066 or q067).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their computed-geometry self-checks (3 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 7/7 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-geography.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Authoring.** Drafted by a helper author working to the same brief and template, who re-solved every item and rendered the SVGs; the chapter producer rebuilt it from source (validator, lint, verify and leak scan clean).
2. **Fixes.** Stems containing “data:” were reworded; three items were added; overflowing diagram labels were fixed.
3. **Every calculated value computed from labelled illustrative data and asserted.**

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

