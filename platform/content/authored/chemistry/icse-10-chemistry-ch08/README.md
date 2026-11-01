# ICSE Class 10 Chemistry, Chapter 8 — Metallurgy

`icse-10-chemistry-ch08` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 16 slides), notes (7 sections), 31 flashcards, 64 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10chem_ch08_short` (20 marks, 30 min) and `t_icse10chem_ch08_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-chemistry-chapter-test-short` / `-long` (Section A compulsory objective items, 1-mark answers, bracket completion and match; Section B 10-mark structured questions, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder adapted for ICSE ids, the ICSE 10 Chemistry blueprints, 10-mark structured questions, five-pair matches and per-blank fill marks), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/icse-10-chemistry-ch08/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 7 syllabus topics are covered: t01 Occurrence of metals: minerals and ores; common ores of iron, aluminium and zinc; t02 Concentration (dressing) of ores: hydraulic washing, magnetic separation and froth flotation; t03 Roasting and calcination: conversion of concentrated ore to oxide; t04 Reduction of metal oxides by hydrogen, carbon and carbon monoxide; electrolytic reduction of active metals; t05 Extraction of aluminium: purification of bauxite by Baeyer's process; t06 Extraction of aluminium: Hall-Heroult electrolytic process; t07 Alloys and amalgams: composition and uses of stainless steel, magnalium, duralumin, brass, bronze and solder.
- Removed topics are respected: Electrorefining in metallurgy (reference only; refining of copper is studied under electrolysis); Purification of bauxite by methods other than Baeyer's process; Electrolytic extraction of aluminium by processes other than Hall-Heroult.
- Facts a reviewer may wish to double-check: Hall–Héroult cell at about 950 °C (alumina melts at about 2050 °C); Baeyer digestion at about 150–200 °C under pressure and ignition at about 1000 °C; duralumin about 95% Al, 4% Cu, 0.5% Mg, 0.5% Mn; clay as the example of a mineral that is not an ore; solder melts below both lead and tin.

## Shape
- **Part 1, 15 slides:** minerals and ores; ores of iron, aluminium and zinc; concentration (dressing) of the ore; froth flotation; roasting and calcination; worked example (roasting or calcination?); the activity series decides the method of reduction; reducing the oxide; worked example (choosing the method); summary; exam tips; 3 checks.
- **Part 2, 16 slides:** why aluminium needs electrolysis; baeyer’s process: step 1, digestion; baeyer’s process: steps 2 and 3; worked example (alumina from aluminium hydroxide); the Hall–Héroult cell; cryolite, fluorspar and coke; electrode reactions; worked example (aluminium from alumina); alloys and amalgams; why alloys?; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 13 · diagram 2 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: chem 3 · flow 3 · svg 2 · table 17. Two SVGs (Hall–Héroult cell with carbon anodes, carbon-lined steel cathode, cryolite melt, coke crust and aluminium pool; froth-flotation tank). Narration 10–68 words (mean 49), no symbols, formulae or unit abbreviations.

## Question bank (64)
| Type | Count | Marks |
|---|---|---|
| mcq | 19 | 1 (keys a 5, b 5, c 5, d 4; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys a c b a d) |
| true-false | 4 | 1 |
| fill-blank | 4 | 1 per blank (the 3-blank bracket completion carries 3) |
| match | 2 | 1 per pair (4 or 5 pairs) |
| short (1 mark) | 12 | 1 (a balanced equation, an observation or a name) |
| numerical | 3 | 1 or 2 (70 %; 108 kg; 33.6 L) |
| short (2 marks) | 6 | 2 |
| short (3 marks) | 4 | 3 (reasons, comparisons, calculations with working) |
| long | 5 | 10, set in parts with marks shown (2 + 2 + 3 + 3 or 3 + 3 + 4), as in Section B of the ICSE paper |

- No case-based items: the ICSE Chemistry pattern has none (the 10-mark structured questions carry the data or situation instead).
- **Difficulty:** d1 19 · d2 34 · d3 9 · d4 2.
- **Competency:** recall 16 · understanding 18 · application 23 · analysis 6 · evaluation 1. Application or higher is **47% of items (60% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 8 · t02 8 · t03 9 · t04 13 · t05 8 · t06 13 · t07 10.
- **Deck checks:** q001, q008, q020 (Part 1); q032, q039, q050 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Chemistry blueprints)
- **Short (20 marks, 30 min):** A q002, q010, q021, q040, q011, q005, q017, q035, q046 · B (q060 or q063).
- **Long (40 marks, 60 min):** A q009, q015, q023, q033, q038, q051, q024, q004, q026, q034, q044, q056, q058, q059 · B (q061 or q062 or q064).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 3/3 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-chemistry.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Authoring.** Drafted by a helper author working to the same brief and template, who re-solved every item; the chapter producer rebuilt it from source (validator, lint and verify clean).
2. **Specific stems.** CBSE 10 Science ch03 set-ups (roasting definition, carbon and Al₂O₃ assertion-reason, the two zinc-blende steps, solder joining wires, brass) are not reused.
3. **Fixes.** Two items were retagged to keep application-or-higher above 45%; two model answers were tightened (lead much lower in the series; calamine reduction explained by affinity for oxygen). Rebuilt clean.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

