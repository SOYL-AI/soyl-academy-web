# ICSE Class 10 Geography, Chapter 17 — Transport

`icse-10-geography-ch17` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `social-science` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 15 slides), notes (6 sections), 31 flashcards, 76 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10geo_ch17_short` (20 marks, 30 min) and `t_icse10geo_ch17_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-geography-chapter-test-short` / `-long` (Part I compulsory MCQs, assertion-reason and 2- and 3-mark short answers; Part II 10-mark structured questions in four parts 2 + 2 + 3 + 3, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ICSE 10 Physics builder adapted for ICSE Geography ids and blueprints, with the pipeline’s verify checks and an answer-leak scan run inside the build; every figure used in a calculation is clearly labelled illustrative data, computed in code and asserted; SVG geometry is computed in svgs.mjs and self-checked), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/social-science/icse-10-geography-ch17/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 6 syllabus topics are covered: t01 Importance and modes of transport; t02 Roadways: factors affecting development, advantages and disadvantages; t03 Expressways, National Highways, the North-South-East-West Corridor and the Golden Quadrilateral; t04 Railways: factors affecting development, advantages and disadvantages; t05 Airways: advantages and disadvantages; t06 Waterways: inland and coastal; advantages and disadvantages.
- Facts a reviewer may wish to double-check (time-sensitive facts are marked “as of the early 2020s” in the content): Mumbai–Pune Expressway the first access-controlled expressway (2002); Golden Quadrilateral about 5,800 km; North–South (Srinagar–Kanyakumari) and East–West (Silchar–Porbandar) corridors crossing at Jhansi; railway gauges (broad 1.676 m, metre 1 m, narrow 0.762 or 0.610 m); Konkan Railway (1998); National Waterways 1–3 and many more declared in 2016. Freight cost, speed and rail-density figures are illustrative.

## Shape
- **Part 1, 14 slides:** why transport matters; modes working together; what affects road building?; worked example (a road to Tawang); roads: advantages and disadvantages; classes of roads and expressways; the Golden Quadrilateral and the NSEW Corridor; worked example (planning a truck journey); summary; exam tips; 3 checks.
- **Part 2, 15 slides:** where railways are dense, and why; railway gauges; worked example (comparing rail density); railways: advantages and disadvantages; airways; inland and coastal waterways; a seaport; comparing freight costs; worked example (choosing a mode); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 9 · diagram 4 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: flow 2 · svg 4 · table 17. Four SVGs (illustrative freight cost per tonne-km by mode; a schematic network of the Golden Quadrilateral and the two corridors, not a map and with no outline of India; the three railway gauges to one scale; a schematic seaport with breakwater, channel, cranes and hinterland links). Narration 9–66 words (mean 52), no symbols, formulae or unit abbreviations.

## Question bank (76)
| Type | Count | Marks |
|---|---|---|
| mcq | 29 | 1 (keys a 8, b 7, c 7, d 7; seeded balanced shuffle) |
| assertion-reason | 8 | 1 (keys c a d a b a a c) |
| true-false | 6 | 1 |
| fill-blank | 5 | 1 (one blank each) |
| match | 2 | 2 (four pairs, half a mark each) |
| short (1 mark) | 2 | 1 (a name or a one-line answer) |
| numerical | 4 | 1 or 2 (450000 rupees; 40 %; 30 h; 30 km per 1000 sq km) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 6 | 3 (geographical reasons, comparisons, data interpretation) |
| long | 5 | 10, set in four parts with marks shown (2 + 2 + 3 + 3), as in Part II of the ICSE paper |

- No case-based items: the ICSE Geography pattern has none (the 10-mark structured questions carry the data, diagram or situation instead). No reproduced or traced official maps: diagrams are schematic and labelled where not to scale.
- **Difficulty:** d1 22 · d2 44 · d3 9 · d4 1.
- **Competency:** recall 16 · understanding 23 · application 27 · analysis 9 · evaluation 1. Application or higher is **49% of items (51% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 9 · t02 16 · t03 15 · t04 23 · t05 10 · t06 19.
- **Deck checks:** q001, q009, q020 (Part 1); q033, q047, q054 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Geography blueprints)
- **Short (20 marks, 30 min):** I q002, q023, q036, q055, q026, q044, q018 · II (q072 or q073).
- **Long (40 marks, 60 min):** I q003, q010, q013, q021, q037, q038, q048, q056, q039, q050, q030, q063, q031, q064 · II (q074 or q075 or q076).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their computed-geometry self-checks (4 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 6/6 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-geography.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Authoring.** Drafted by a helper author on Claude Opus 5.5 working to the same brief and template, who re-solved every item; the chapter producer rebuilt it from source (validator, lint, verify and leak scan clean) and reviewed facts and time-sensitive data.
2. **Fixes.** One self-check failed at first (the Jhansi node was not on the East–West line) and was corrected; clipped labels were fixed after rendering. CBSE 10 Social Science ch12 set-ups are not reused.
3. **Every calculated value computed from labelled illustrative data and asserted.**

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

