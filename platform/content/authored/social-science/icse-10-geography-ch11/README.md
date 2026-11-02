# ICSE Class 10 Geography, Chapter 11 — Energy Resources

`icse-10-geography-ch11` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `social-science` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 14 slides), notes (6 sections), 31 flashcards, 74 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10geo_ch11_short` (20 marks, 30 min) and `t_icse10geo_ch11_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-geography-chapter-test-short` / `-long` (Part I compulsory MCQs, assertion-reason and 2- and 3-mark short answers; Part II 10-mark structured questions in four parts 2 + 2 + 3 + 3, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ICSE 10 Physics builder adapted for ICSE Geography ids and blueprints, with the pipeline’s verify checks and an answer-leak scan run inside the build; every figure used in a calculation is clearly labelled illustrative data, computed in code and asserted; SVG geometry is computed in svgs.mjs and self-checked), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/social-science/icse-10-geography-ch11/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 5 syllabus topics are covered: t01 Coal: types, distribution, advantages and disadvantages; t02 Petroleum and natural gas: distribution, advantages and disadvantages; t03 Hydel power: Bhakra Nangal and Hirakud projects and their benefits; t04 Non-conventional sources: solar, wind and tidal energy; t05 Geothermal, nuclear and biogas energy.
- Facts a reviewer may wish to double-check (time-sensitive facts are marked “as of the early 2020s” in the content): As of the early 2020s: India imports most of its crude oil; large tidal plants studied but not built. Also time-sensitive: Tamil Nadu a leading wind state; Bhadla, Charanka and Pavagada as large solar parks; Jamnagar among the largest refineries. Approximate carbon contents of coals; Digboi among the oldest oil fields in Asia; Tarapur India’s first nuclear station. The State Z capacity table is illustrative.

## Shape
- **Part 1, 15 slides:** types of coal; where India’s coal is found; coal at work: a thermal power station; worked example (why does coal still lead?); petroleum: onshore and offshore fields; natural gas: the cleaner fuel; worked example (gas for a fertiliser plant); hydel power: water falling from a height; bhakra Nangal and Hirakud projects; summary; exam tips; 3 checks.
- **Part 2, 14 slides:** solar energy; wind energy; tidal energy; worked example (matching a source to a place); geothermal and nuclear energy; biogas: fuel and manure from dung; reading an energy mix; worked example (shares from the table); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 9 · diagram 4 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: flow 4 · svg 4 · table 15. Four SVGs (thermal power station flow; hydel dam, penstock and head; biogas digester; illustrative State Z capacity bars). Narration 10–75 words (mean 55), no symbols, formulae or unit abbreviations.

## Question bank (74)
| Type | Count | Marks |
|---|---|---|
| mcq | 27 | 1 (keys a 7, b 7, c 7, d 6; seeded balanced shuffle) |
| assertion-reason | 7 | 1 (keys a c a a b a d) |
| true-false | 6 | 1 |
| fill-blank | 5 | 1 (one blank each) |
| match | 2 | 2 (four pairs, half a mark each) |
| short (1 mark) | 2 | 1 (a name or a one-line answer) |
| numerical | 4 | 1 or 2 (12000 MW; 50 %; 4800 MW; 40 %) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 7 | 3 (geographical reasons, comparisons, data interpretation) |
| long | 5 | 10, set in four parts with marks shown (2 + 2 + 3 + 3), as in Part II of the ICSE paper |

- No case-based items: the ICSE Geography pattern has none (the 10-mark structured questions carry the data, diagram or situation instead). No reproduced or traced official maps: diagrams are schematic and labelled where not to scale.
- **Difficulty:** d1 24 · d2 40 · d3 9 · d4 1.
- **Competency:** recall 23 · understanding 17 · application 24 · analysis 7 · evaluation 3. Application or higher is **46% of items (43% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 18 · t02 14 · t03 16 · t04 18 · t05 16.
- **Deck checks:** q001, q013, q025 (Part 1); q038, q040, q050 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Geography blueprints)
- **Short (20 marks, 30 min):** I q002, q014, q026, q039, q030, q022, q012 · II (q070 or q072).
- **Long (40 marks, 60 min):** I q004, q006, q015, q016, q029, q041, q053, q052, q018, q055, q023, q059, q036, q060 · II (q071 or q073 or q074).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their computed-geometry self-checks (4 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 6/6 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-geography.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Authoring.** Drafted by a helper author working to the same brief and template, who re-solved every item and rendered the SVGs; the chapter producer rebuilt it from source (validator, lint, verify and leak scan clean).
2. **Fixes.** Label clashes and clipped elements in three diagrams were fixed after rendering; two applied MCQs were added to keep application or higher inside the band.
3. **Every calculated value computed from labelled illustrative data and asserted.**

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

