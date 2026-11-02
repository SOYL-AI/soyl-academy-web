# ICSE Class 10 Geography, Chapter 2 — Topographical Maps: Colours, Symbols, Scale, Distance and Direction

`icse-10-geography-ch02` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `social-science` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 13 slides), notes (6 sections), 30 flashcards, 64 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10geo_ch02_short` (20 marks, 30 min) and `t_icse10geo_ch02_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-geography-chapter-test-short` / `-long` (Part I compulsory MCQs, assertion-reason and 2- and 3-mark short answers; Part II 10-mark structured questions in four parts 2 + 2 + 3 + 3, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ICSE 10 Physics builder adapted for ICSE Geography ids and blueprints, with the pipeline’s verify checks and an answer-leak scan run inside the build; every figure used in a calculation is clearly labelled illustrative data, computed in code and asserted; SVG geometry is computed in svgs.mjs and self-checked), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/social-science/icse-10-geography-ch02/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 5 syllabus topics are covered: t01 Colour tints and conventional symbols on a Survey of India sheet; t02 Types of scale: statement scale, representative fraction and linear scale; t03 Measuring straight-line distance using the map scale; t04 Calculating area from full grid squares; t05 Directions between locations using the eight cardinal and intercardinal points.
- Removed topics are respected: Only direct (straight-line) distance is measured; area is calculated only for full grid squares.
- Facts a reviewer may wish to double-check (time-sensitive facts are marked “as of the early 2020s” in the content): Not time-sensitive. Colour conventions (yellow cultivated, green forest, white uncultivated, blue water, brown contours, black man-made, red metalled roads) given as the usual convention, with a note that real Survey of India sheets differ in details such as grid-line and settlement colours; PO, PS and Dis; RF from a statement scale (1 km = 100 000 cm); straight-line distance and area from complete squares only (per removed topics); eight-point directions.

## Shape
- **Part 1, 15 slides:** colour tints and what they show; reading the key of the sheet; point symbols: settlements, services and water; line symbols: roads, tracks, streams and canals; worked example (naming features from symbols); three kinds of scale; worked example (statement scale to representative fraction); the linear scale; worked example (representative fraction to statement scale); summary; exam tips; 3 checks.
- **Part 2, 13 slides:** straight-line distance; worked example (Sonakhedi to the temple); area from full grid squares; worked example (area of forest); the eight points of the compass; giving the direction of one place from another; worked example (direction and distance together); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 8 · diagram 2 · example 6 · check 6 · summary 2 · exam-tips 2. Visuals: flow 1 · svg 10 · table 11. Sixteen SVGs: sheet, symbol and line keys, distance, area and direction extracts, a compass rose and a scale bar. All figures come from one imagined practice sheet built by code (topo.mjs, identical in ch01–ch03): titled “SOYL practice sheet — IMAGINED AREA (not a real place, not a Survey of India sheet)”, eastings 40–50 and northings 70–80, 1 cm to 0.5 km (RF 1 : 50 000), contour interval 20 m, with our own legend. Terrain is a height function; contours, streams (steepest descent), land use, heights and settlements are generated from it, nothing traced or copied.. Narration 10–79 words (mean 51), no symbols, formulae or unit abbreviations.

## Question bank (64)
| Type | Count | Marks |
|---|---|---|
| mcq | 22 | 1 (keys a 6, b 6, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys a c d b a) |
| true-false | 5 | 1 |
| fill-blank | 6 | 1 (one blank each) |
| match | 2 | 2 (four pairs, half a mark each) |
| short (1 mark) | 2 | 1 (a name or a one-line answer) |
| numerical | 5 | 1 or 2 (4 km; 0.9 km; 5 km; 7.9 cm; 8 sq km) |
| short (2 marks) | 7 | 2 |
| short (3 marks) | 5 | 3 (geographical reasons, comparisons, data interpretation) |
| long | 5 | 10, set in four parts with marks shown (2 + 2 + 3 + 3), as in Part II of the ICSE paper |

- No case-based items: the ICSE Geography pattern has none (the 10-mark structured questions carry the data, diagram or situation instead). No reproduced or traced official maps: diagrams are schematic and labelled where not to scale.
- **Difficulty:** d1 22 · d2 34 · d3 7 · d4 1.
- **Competency:** recall 11 · understanding 13 · application 38 · analysis 2. Application or higher is **63% of items (78% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 20 · t02 16 · t03 15 · t04 10 · t05 12.
- **Deck checks:** q001, q017, q018 (Part 1); q032, q042, q051 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Geography blueprints)
- **Short (20 marks, 30 min):** I q004, q019, q033, q052, q025, q027, q041 · II (q060 or q062).
- **Long (40 marks, 60 min):** I q005, q006, q002, q021, q034, q043, q053, q054, q039, q048, q058, q049, q050, q059 · II (q061 or q063 or q064).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their computed-geometry self-checks (45 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 30/30 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-geography.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet) to the producer brief and map rules; the chapter producer rendered the sheet and extracts, checked them and rebuilt from source (validator, lint, verify and leak scan clean).
2. **Fixes.** Writer re-tagged two simple recall items as understanding to keep application or higher in band. Producer removed the claim that grid lines are black (not true on our sheet and not uniform on real sheets), reworded one assertion-reason item to match, and added the follow-the-sheet-key note. Producer redrew the canal as a double blue line in the shared sheet so that it cannot be mistaken for a stream.
3. **Every grid reference, height, distance, area, gradient and direction answer is computed from the sheet data and asserted in build self-checks (45–49 per chapter).**

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

