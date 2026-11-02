# ICSE Class 10 Geography, Chapter 3 — Topographical Maps: Settlements, Land Use, Transport and Drainage

`icse-10-geography-ch03` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `social-science` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 15 slides), notes (6 sections), 30 flashcards, 67 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10geo_ch03_short` (20 marks, 30 min) and `t_icse10geo_ch03_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-geography-chapter-test-short` / `-long` (Part I compulsory MCQs, assertion-reason and 2- and 3-mark short answers; Part II 10-mark structured questions in four parts 2 + 2 + 3 + 3, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ICSE 10 Physics builder adapted for ICSE Geography ids and blueprints, with the pipeline’s verify checks and an answer-leak scan run inside the build; every figure used in a calculation is clearly labelled illustrative data, computed in code and asserted; SVG geometry is computed in svgs.mjs and self-checked), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/social-science/icse-10-geography-ch03/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 6 syllabus topics are covered: t01 Sites of prominent villages, towns and settlements and the services available; t02 Land use and land cover; t03 Means of transport and communication: metalled and unmetalled roads, cart tracks, pack tracks, footpaths; t04 Drainage: direction of flow and patterns (dendritic, trellised, radial); t05 Settlement patterns: clustered and dispersed; t06 Identifying natural and man-made features.
- Facts a reviewer may wish to double-check (time-sensitive facts are marked “as of the early 2020s” in the content): Not time-sensitive. Settlement sites and services, land use, road and track classes, drainage direction and dendritic pattern from the sheet; trellis (banded or folded rock) and radial (around a dome or cone) patterns shown only as separate schematics; clustered and dispersed settlement; fallow land defined in words but not drawn.

## Shape
- **Part 1, 15 slides:** where do settlements grow? The site; three villages on the sheet; services in a settlement; worked example (why is Sonakhedi sited there?); land use and land cover; cultivated land: the people farm; worked example (land use and occupations); means of transport: roads and tracks; communication: how places are linked; summary; exam tips; 3 checks.
- **Part 2, 15 slides:** direction of flow of a river; worked example (which way does the stream flow?); drainage pattern 1: dendritic; drainage pattern 2: trellis; drainage pattern 3: radial; clustered settlements; dispersed settlements; worked example (clustered or dispersed?); natural and man-made features; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 9 · diagram 5 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: svg 15 · table 9. Seventeen SVGs: sheet extracts for settlements, land use, transport and drainage, flow-direction extracts, and three schematic drainage patterns labelled “Schematic, not from the sheet”. All figures come from one imagined practice sheet built by code (topo.mjs, identical in ch01–ch03): titled “SOYL practice sheet — IMAGINED AREA (not a real place, not a Survey of India sheet)”, eastings 40–50 and northings 70–80, 1 cm to 0.5 km (RF 1 : 50 000), contour interval 20 m, with our own legend. Terrain is a height function; contours, streams (steepest descent), land use, heights and settlements are generated from it, nothing traced or copied.. Narration 9–77 words (mean 52), no symbols, formulae or unit abbreviations.

## Question bank (67)
| Type | Count | Marks |
|---|---|---|
| mcq | 23 | 1 (keys a 6, b 6, c 6, d 5; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys a c d b a) |
| true-false | 5 | 1 |
| fill-blank | 6 | 1 (one blank each) |
| match | 2 | 2 (four pairs, half a mark each) |
| short (1 mark) | 2 | 1 (a name or a one-line answer) |
| numerical | 5 | 1 or 2 (45 sq km; 21.8 cm; 1.6 cm; 68 m; 26 m per km) |
| short (2 marks) | 8 | 2 |
| short (3 marks) | 6 | 3 (geographical reasons, comparisons, data interpretation) |
| long | 5 | 10, set in four parts with marks shown (2 + 2 + 3 + 3), as in Part II of the ICSE paper |

- No case-based items: the ICSE Geography pattern has none (the 10-mark structured questions carry the data, diagram or situation instead). No reproduced or traced official maps: diagrams are schematic and labelled where not to scale.
- **Difficulty:** d1 23 · d2 33 · d3 10 · d4 1.
- **Competency:** recall 13 · understanding 18 · application 32 · analysis 4. Application or higher is **54% of items (72% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 10 · t02 13 · t03 13 · t04 22 · t05 11 · t06 5.
- **Deck checks:** q001, q009, q020 (Part 1); q030, q042, q050 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Geography blueprints)
- **Short (20 marks, 30 min):** I q002, q010, q031, q034, q005, q045, q008 · II (q063 or q065).
- **Long (40 marks, 60 min):** I q003, q011, q013, q021, q032, q033, q051, q053, q040, q058, q017, q060, q018, q061 · II (q064 or q066 or q067).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their computed-geometry self-checks (49 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 26/26 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-geography.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet) to the producer brief and map rules; the chapter producer rendered the sheet and extracts, checked them and rebuilt from source (validator, lint, verify and leak scan clean).
2. **Fixes.** None needed by the writer. Producer redrew the canal as a double blue line in the shared sheet so that it cannot be mistaken for a stream.
3. **Every grid reference, height, distance, area, gradient and direction answer is computed from the sheet data and asserted in build self-checks (45–49 per chapter).**

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

