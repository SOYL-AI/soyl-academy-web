# ICSE Class 10 Geography, Chapter 12 — Agriculture in India

`icse-10-geography-ch12` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `social-science` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 14 slides), notes (6 sections), 31 flashcards, 71 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10geo_ch12_short` (20 marks, 30 min) and `t_icse10geo_ch12_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-geography-chapter-test-short` / `-long` (Part I compulsory MCQs, assertion-reason and 2- and 3-mark short answers; Part II 10-mark structured questions in four parts 2 + 2 + 3 + 3, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ICSE 10 Physics builder adapted for ICSE Geography ids and blueprints, with the pipeline’s verify checks and an answer-leak scan run inside the build; every figure used in a calculation is clearly labelled illustrative data, computed in code and asserted; SVG geometry is computed in svgs.mjs and self-checked), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/social-science/icse-10-geography-ch12/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 4 syllabus topics are covered: t01 Indian agriculture: importance, problems and benefits; t02 Green Revolution: meaning and impact of the first Green Revolution; t03 Types of farming: subsistence and commercial; intensive, extensive, plantation and mixed; t04 Agricultural seasons: rabi, kharif and zayad.
- Facts a reviewer may wish to double-check (time-sensitive facts are marked “as of the early 2020s” in the content): As of the early 2020s: nearly half of workers depend on farming; population over 1.4 billion; most holdings under 2 ha. M. S. Swaminathan as father of the Green Revolution in India; dwarf wheat from Mexico; crop-calendar months typical for north India. Plot sizes, cropping intensity and District P yields are illustrative.

## Shape
- **Part 1, 14 slides:** why agriculture matters; problems and remedies; fragmented holdings and consolidation; worked example (diagnosing a farm’s problems); the Green Revolution: meaning and inputs; yields before and after; worked example (reading the yield chart); impact of the first Green Revolution; summary; exam tips; 3 checks.
- **Part 2, 14 slides:** subsistence and commercial farming; intensive and extensive farming; plantation farming; mixed farming; worked example (classifying farms); the three agricultural seasons; why the seasons differ; worked example (how hard is a field worked?); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 9 · diagram 3 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: flow 3 · svg 3 · table 16. Three SVGs (a computed kharif, rabi and zaid crop calendar; scattered plots versus one consolidated block with area conserved; illustrative District P wheat yields). Narration 12–70 words (mean 53), no symbols, formulae or unit abbreviations.

## Question bank (71)
| Type | Count | Marks |
|---|---|---|
| mcq | 25 | 1 (keys a 7, b 6, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 8 | 1 (keys c a c a c a b d) |
| true-false | 6 | 1 |
| fill-blank | 5 | 1 (one blank each) |
| match | 2 | 2 (four pairs, half a mark each) |
| short (1 mark) | 2 | 1 (a name or a one-line answer) |
| numerical | 4 | 1 or 2 (0.8 ha; 200 %; 180 %; 4.2 t/ha) |
| short (2 marks) | 8 | 2 |
| short (3 marks) | 6 | 3 (geographical reasons, comparisons, data interpretation) |
| long | 5 | 10, set in four parts with marks shown (2 + 2 + 3 + 3), as in Part II of the ICSE paper |

- No case-based items: the ICSE Geography pattern has none (the 10-mark structured questions carry the data, diagram or situation instead). No reproduced or traced official maps: diagrams are schematic and labelled where not to scale.
- **Difficulty:** d1 23 · d2 40 · d3 7 · d4 1.
- **Competency:** recall 16 · understanding 22 · application 25 · analysis 6 · evaluation 2. Application or higher is **46% of items (45% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 18 · t02 22 · t03 20 · t04 15.
- **Deck checks:** q001, q016, q021 (Part 1); q033, q036, q049 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Geography blueprints)
- **Short (20 marks, 30 min):** I q002, q017, q034, q051, q023, q045, q013 · II (q067 or q069).
- **Long (40 marks, 60 min):** I q003, q004, q006, q019, q020, q037, q050, q052, q040, q054, q029, q060, q031, q059 · II (q068 or q070 or q071).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their computed-geometry self-checks (3 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 7/7 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-geography.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Authoring.** Drafted by a helper author working to the same brief and template, who re-solved every item; the chapter producer rebuilt it from source (validator, lint, verify and leak scan clean).
2. **Specific stems.** CBSE 10 Social Science ch09 set-ups are not reused.
3. **Every calculated value computed from labelled illustrative data and asserted.**

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.
- **2026-11-05:** assertion-reason options reordered to the ICSE 2027 Geography specimen paper (502) order and wording; every key re-mapped so each item's meaning is unchanged.
