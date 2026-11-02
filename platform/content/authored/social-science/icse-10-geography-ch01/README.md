# ICSE Class 10 Geography, Chapter 1 — Topographical Maps: Grid References, Contours and Heights

`icse-10-geography-ch01` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `social-science` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 15 slides), notes (6 sections), 30 flashcards, 62 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10geo_ch01_short` (20 marks, 30 min) and `t_icse10geo_ch01_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-geography-chapter-test-short` / `-long` (Part I compulsory MCQs, assertion-reason and 2- and 3-mark short answers; Part II 10-mark structured questions in four parts 2 + 2 + 3 + 3, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ICSE 10 Physics builder adapted for ICSE Geography ids and blueprints, with the pipeline’s verify checks and an answer-leak scan run inside the build; every figure used in a calculation is clearly labelled illustrative data, computed in code and asserted; SVG geometry is computed in svgs.mjs and self-checked), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/social-science/icse-10-geography-ch01/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 4 syllabus topics are covered: t01 Eastings and northings; locating features with four-figure and six-figure grid references; t02 Contours and contour interval; t03 Identifying landforms from contours: steep slope, gentle slope, hill, ridge and escarpment; t04 Triangulated height, spot height and relative height/depth.
- Facts a reviewer may wish to double-check (time-sensitive facts are marked “as of the early 2020s” in the content): Not time-sensitive: all numbers belong to the imagined sheet. Textbook conventions used: eastings vertical and numbered west to east, northings horizontal and numbered south to north; four- and six-figure references; contour interval; contour V-bends point upstream; triangulated height a black triangle, spot height a black dot; relative height.

## Shape
- **Part 1, 15 slides:** the grid: eastings and northings; four-figure grid references; six-figure grid references; worked example (a reference for the dispensary); finding the feature at a reference; contours and the contour interval; worked example (finding the contour interval); spacing of contours shows the slope; a cross-section makes the slope visible; summary; exam tips; 3 checks.
- **Part 2, 15 slides:** landforms and their contour patterns; the conical hill; the ridge; the escarpment; worked example (naming landforms from descriptions); reading the hill from a cross-section; triangulated heights and spot heights; worked example (relative height of the escarpment); relative height and relative depth; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 9 · diagram 5 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: flow 2 · svg 9 · table 13. Thirteen SVGs: the full imagined sheet with key, eight extracts and three cross-sections computed from the height function. All figures come from one imagined practice sheet built by code (topo.mjs, identical in ch01–ch03): titled “SOYL practice sheet — IMAGINED AREA (not a real place, not a Survey of India sheet)”, eastings 40–50 and northings 70–80, 1 cm to 0.5 km (RF 1 : 50 000), contour interval 20 m, with our own legend. Terrain is a height function; contours, streams (steepest descent), land use, heights and settlements are generated from it, nothing traced or copied.. Narration 12–68 words (mean 51), no symbols, formulae or unit abbreviations.

## Question bank (62)
| Type | Count | Marks |
|---|---|---|
| mcq | 22 | 1 (keys a 6, b 6, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys a c d b a) |
| true-false | 6 | 1 |
| fill-blank | 5 | 1 (one blank each) |
| match | 2 | 2 (four pairs, half a mark each) |
| short (1 mark) | 2 | 1 (a name or a one-line answer) |
| numerical | 4 | 1 or 2 (20 m; 83 m per km; 182 m; 326 m) |
| short (2 marks) | 6 | 2 |
| short (3 marks) | 5 | 3 (geographical reasons, comparisons, data interpretation) |
| long | 5 | 10, set in four parts with marks shown (2 + 2 + 3 + 3), as in Part II of the ICSE paper |

- No case-based items: the ICSE Geography pattern has none (the 10-mark structured questions carry the data, diagram or situation instead). No reproduced or traced official maps: diagrams are schematic and labelled where not to scale.
- **Difficulty:** d1 20 · d2 30 · d3 11 · d4 1.
- **Competency:** recall 14 · understanding 14 · application 28 · analysis 6. Application or higher is **55% of items (75% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 15 · t02 21 · t03 22 · t04 17.
- **Deck checks:** q001, q015, q024 (Part 1); q031, q035, q046 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Geography blueprints)
- **Short (20 marks, 30 min):** I q002, q003, q017, q034, q010, q011, q012 · II (q058 or q060).
- **Long (40 marks, 60 min):** I q004, q005, q016, q018, q032, q033, q047, q048, q028, q053, q026, q057, q029, q030 · II (q059 or q061 or q062).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their computed-geometry self-checks (45 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 29/29 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-geography.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet) to the producer brief and map rules; the chapter producer rendered the sheet and extracts, checked them and rebuilt from source (validator, lint, verify and leak scan clean).
2. **Fixes.** Writer corrected one gradient (14.8 m per km, from the rounded 2.7 km) after the first build. Producer redrew the canal as a double blue line in the shared sheet so that it cannot be mistaken for a stream.
3. **Every grid reference, height, distance, area, gradient and direction answer is computed from the sheet data and asserted in build self-checks (45–49 per chapter).**

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

