# ICSE Class 10 Geography, Chapter 8 — Natural Vegetation

`icse-10-geography-ch08` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `social-science` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 14 slides), notes (6 sections), 32 flashcards, 68 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10geo_ch08_short` (20 marks, 30 min) and `t_icse10geo_ch08_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-geography-chapter-test-short` / `-long` (Part I compulsory MCQs, assertion-reason and 2- and 3-mark short answers; Part II 10-mark structured questions in four parts 2 + 2 + 3 + 3, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ICSE 10 Physics builder adapted for ICSE Geography ids and blueprints, with the pipeline’s verify checks and an answer-leak scan run inside the build; every figure used in a calculation is clearly labelled illustrative data, computed in code and asserted; SVG geometry is computed in svgs.mjs and self-checked), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/social-science/icse-10-geography-ch08/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 4 syllabus topics are covered: t01 Importance of forests; t02 Tropical evergreen and tropical deciduous forests: distribution, characteristics and trees; t03 Tropical desert, littoral (tidal) and mountain vegetation; t04 Forest conservation: afforestation, reforestation, social forestry, agroforestry and Van Mahotsav.
- Facts a reviewer may wish to double-check (time-sensitive facts are marked “as of the early 2020s” in the content): Approximate rainfall limits for forest types (evergreen over 200 cm, moist deciduous 100–200, dry deciduous 70–100, thorn under 70); approximate Himalayan zone altitudes; Van Mahotsav begun in 1950 and held in the first week of July; sandalwood mainly in Karnataka; Gujjar and Bakarwal herders on alpine meadows. Forest-area table is illustrative.

## Shape
- **Part 1, 14 slides:** ecological importance of forests; economic importance of forests; rainfall decides the forest type; tropical evergreen forests; worked example (rich forest, little timber); tropical deciduous (monsoon) forests; important trees and their uses; worked example (matching stations to forests); summary; exam tips; 3 checks.
- **Part 2, 14 slides:** tropical desert (thorn) vegetation; littoral or tidal forests: mangroves; mountain vegetation: zones with altitude; worked example (temperature and altitude); reading forest data (illustrative); why forests must be conserved; methods: afforestation, reforestation, social forestry, agroforestry; worked example (naming the method); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 8 · diagram 4 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: flow 4 · svg 5 · table 13. Five SVGs (rainfall-band scale with illustrative stations; storeys of an evergreen forest; Himalayan altitude zones with illustrative temperatures at 6.5 °C per 1000 m; mangrove roots between tide lines; share bar of an illustrative forest-area table). Narration 11–73 words (mean 53), no symbols, formulae or unit abbreviations.

## Question bank (68)
| Type | Count | Marks |
|---|---|---|
| mcq | 27 | 1 (keys a 7, b 7, c 7, d 6; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a a c c d b) |
| true-false | 5 | 1 |
| fill-blank | 5 | 1 (one blank each) |
| match | 2 | 2 (four pairs, half a mark each) |
| short (1 mark) | 2 | 1 (a name or a one-line answer) |
| numerical | 4 | 1 or 2 (17 °C; 6.6 °C; 50 %; 15 %) |
| short (2 marks) | 8 | 2 |
| short (3 marks) | 4 | 3 (geographical reasons, comparisons, data interpretation) |
| long | 5 | 10, set in four parts with marks shown (2 + 2 + 3 + 3), as in Part II of the ICSE paper |

- No case-based items: the ICSE Geography pattern has none (the 10-mark structured questions carry the data, diagram or situation instead). No reproduced or traced official maps: diagrams are schematic and labelled where not to scale.
- **Difficulty:** d1 17 · d2 40 · d3 9 · d4 2.
- **Competency:** recall 17 · understanding 19 · application 26 · analysis 6. Application or higher is **47% of items (54% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 10 · t02 24 · t03 24 · t04 13.
- **Deck checks:** q001, q009, q013 (Part 1); q030, q034, q048 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Geography blueprints)
- **Short (20 marks, 30 min):** I q010, q017, q028, q052, q020, q045, q027 · II (q064 or q067).
- **Long (40 marks, 60 min):** I q003, q011, q014, q018, q029, q033, q036, q051, q019, q037, q046, q058, q047, q059 · II (q065 or q066 or q068).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their computed-geometry self-checks (5 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 9/9 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-geography.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Authoring.** Drafted by a helper author working to the same brief and template, who re-solved every item; the chapter producer rebuilt it from source (validator, lint, verify and leak scan clean).
2. **Specific stems.** CBSE 10 Social Science ch07 set-ups are not reused.
3. **Every calculated value computed from labelled illustrative data and asserted.**

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

