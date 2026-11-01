# ICSE Class 10 Geography, Chapter 10 — Mineral Resources

`icse-10-geography-ch10` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `social-science` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 14 slides), notes (6 sections), 31 flashcards, 67 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10geo_ch10_short` (20 marks, 30 min) and `t_icse10geo_ch10_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-geography-chapter-test-short` / `-long` (Part I compulsory MCQs, assertion-reason and 2- and 3-mark short answers; Part II 10-mark structured questions in four parts 2 + 2 + 3 + 3, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ICSE 10 Physics builder adapted for ICSE Geography ids and blueprints, with the pipeline’s verify checks and an answer-leak scan run inside the build; every figure used in a calculation is clearly labelled illustrative data, computed in code and asserted; SVG geometry is computed in svgs.mjs and self-checked), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/social-science/icse-10-geography-ch10/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 4 syllabus topics are covered: t01 Iron ore: types, uses and distribution (two leading states and mining areas); t02 Manganese: uses and distribution; t03 Copper: uses and distribution; t04 Bauxite: uses and distribution.
- Facts a reviewer may wish to double-check (time-sensitive facts are marked “as of the early 2020s” in the content): Leading states (as of the early 2020s): iron ore Odisha and Chhattisgarh; manganese Madhya Pradesh, Maharashtra, Odisha; copper Madhya Pradesh and Rajasthan; bauxite Odisha (largest) and Gujarat. Iron content of ores (magnetite up to about 70%, haematite 60–70%, limonite 35–50%) varies by source. Named mines and plants (Bailadila, Malanjkhand, Khetri, Panchpatmali, Damanjodi, Angul, Renukoot). The bauxite : alumina : aluminium ratio 5 : 2 : 1 is rounded and illustrative.

## Shape
- **Part 1, 14 slides:** minerals, ores and their grade; types of iron ore; uses of iron; distribution of iron ore; how iron ore is mined: open-cast mining; worked example (why steel plants stand near iron-ore mines); manganese: uses and distribution; worked example (grade and tonnage); summary; exam tips; 3 checks.
- **Part 2, 14 slides:** copper: uses; copper: distribution; worked example (why so much rock for so little copper); bauxite: uses; from bauxite to aluminium; bauxite: distribution; worked example (supplying a smelter); reading mine data (illustrative); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 8 · diagram 4 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: flow 4 · svg 4 · table 14. Four SVGs (illustrative iron content of four ores; an open-cast mine with benches; bauxite to alumina to aluminium in the illustrative ratio; illustrative output of four bauxite mines) plus flows for steel-making and alloys. Narration 9–69 words (mean 51), no symbols, formulae or unit abbreviations.

## Question bank (67)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 | 1 (keys a 7, b 7, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a c b a d a) |
| true-false | 5 | 1 |
| fill-blank | 5 | 1 (one blank each) |
| match | 2 | 2 (four pairs, half a mark each) |
| short (1 mark) | 2 | 1 (a name or a one-line answer) |
| numerical | 6 | 1 or 2 (1560 t; 2000 t; 300 t; 75000 t; 150000 t; 48 %) |
| short (2 marks) | 6 | 2 |
| short (3 marks) | 4 | 3 (geographical reasons, comparisons, data interpretation) |
| long | 5 | 10, set in four parts with marks shown (2 + 2 + 3 + 3), as in Part II of the ICSE paper |

- No case-based items: the ICSE Geography pattern has none (the 10-mark structured questions carry the data, diagram or situation instead). No reproduced or traced official maps: diagrams are schematic and labelled where not to scale.
- **Difficulty:** d1 23 · d2 27 · d3 15 · d4 2.
- **Competency:** recall 23 · understanding 12 · application 23 · analysis 9. Application or higher is **48% of items (61% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 27 · t02 13 · t03 18 · t04 20.
- **Deck checks:** q001, q006, q022 (Part 1); q031, q045, q050 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Geography blueprints)
- **Short (20 marks, 30 min):** I q002, q003, q023, q034, q037, q017, q058 · II (q063 or q065).
- **Long (40 marks, 60 min):** I q004, q007, q008, q025, q032, q035, q046, q051, q026, q053, q018, q057, q019, q030 · II (q064 or q066 or q067).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their computed-geometry self-checks (4 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 11/11 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-geography.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Authoring.** Drafted by a helper author working to the same brief and template, who re-solved every item; the chapter producer rebuilt it from source (validator, lint, verify and leak scan clean).
2. **Specific stems.** CBSE 10 Social Science ch10 set-ups (highest-iron-content ore MCQ, Panchpatmali deposit item) are not reused.
3. **Every calculated value computed from labelled illustrative data and asserted.**

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

