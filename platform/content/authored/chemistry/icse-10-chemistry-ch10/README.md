# ICSE Class 10 Chemistry, Chapter 10 — Study of Compounds: Ammonia

`icse-10-chemistry-ch10` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 16 slides), notes (7 sections), 30 flashcards, 64 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10chem_ch10_short` (20 marks, 30 min) and `t_icse10chem_ch10_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-chemistry-chapter-test-short` / `-long` (Section A compulsory objective items, 1-mark answers, bracket completion and match; Section B 10-mark structured questions, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder adapted for ICSE ids, the ICSE 10 Chemistry blueprints, 10-mark structured questions, five-pair matches and per-blank fill marks), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/icse-10-chemistry-ch10/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 7 syllabus topics are covered: t01 Laboratory preparation of ammonia from ammonium chloride: apparatus, drying and collection; t02 Ammonia from metal nitrides (Mg3N2, AlN) with warm water and from ammonium salts with alkalis; t03 Manufacture by Haber's process; t04 Density and solubility of ammonia (fountain experiment); burning in oxygen; catalytic oxidation; t05 Reducing and other reactions: with hydrogen chloride, hot copper(II) oxide, lead(IV) oxide and chlorine (excess of each); t06 Aqueous ammonia: reactions with acids and with solutions of FeCl3, FeSO4, lead nitrate, zinc nitrate and copper sulphate; t07 Uses of ammonia (fertilisers, explosives, nitric acid, refrigerant, cleansing agents); ozone-safe refrigerants; tests for ammonia.
- Facts a reviewer may wish to double-check: Haber’s process at 450–500 °C, 200–900 atm, finely divided iron with a molybdenum promoter; ammonia reduces both PbO and PbO₂ (the syllabus names lead(IV) oxide; 3PbO₂ + 4NH₃ → 3Pb + 6H₂O + 2N₂ balances, and the more common PbO equation is also given); ammonia burns in oxygen with a greenish-yellow flame; anhydrous CaCl₂ cannot dry ammonia because it forms CaCl₂·8NH₃.

## Shape
- **Part 1, 15 slides:** laboratory preparation; the apparatus; drying and collecting; other sources: nitrides and ammonium salts; worked example (ammonia from ammonium chloride); manufacture: Haber’s process; inside the Haber plant; worked example (volumes in Haber’s process); density, solubility and the fountain; summary; exam tips; 3 checks.
- **Part 2, 16 slides:** burning in oxygen; catalytic oxidation over platinum; ammonia as a reducing agent; worked example (copper from copper oxide); with chlorine and with hydrogen chloride; aqueous ammonia: a weak alkali; aqueous ammonia with salt solutions; worked example (identifying a cation); uses of ammonia and ozone-safe refrigerants; tests for ammonia; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 12 · diagram 3 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: chem 4 · flow 2 · svg 2 · table 17. Two SVGs (laboratory preparation with a quicklime drying tower and downward displacement of air; the ammonia fountain experiment); Haber’s process is a flow. Narration 11–68 words (mean 49), no symbols, formulae or unit abbreviations.

## Question bank (64)
| Type | Count | Marks |
|---|---|---|
| mcq | 19 | 1 (keys a 5, b 5, c 5, d 4; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys c c d b a) |
| true-false | 4 | 1 |
| fill-blank | 4 | 1 per blank (the 3-blank bracket completion carries 3) |
| match | 2 | 1 per pair (4 or 5 pairs) |
| short (1 mark) | 12 | 1 (a balanced equation, an observation or a name) |
| numerical | 3 | 1 or 2 (4.48 L; 40 L; 6.35 g) |
| short (2 marks) | 7 | 2 |
| short (3 marks) | 3 | 3 (reasons, comparisons, calculations with working) |
| long | 5 | 10, set in parts with marks shown (2 + 2 + 3 + 3 or 3 + 3 + 4), as in Section B of the ICSE paper |

- No case-based items: the ICSE Chemistry pattern has none (the 10-mark structured questions carry the data or situation instead).
- **Difficulty:** d1 14 · d2 36 · d3 13 · d4 1.
- **Competency:** recall 13 · understanding 13 · application 29 · analysis 9. Application or higher is **59% of items (70% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 9 · t02 8 · t03 8 · t04 13 · t05 13 · t06 9 · t07 7.
- **Deck checks:** q001, q015, q022 (Part 1); q024, q034, q043 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Chemistry blueprints)
- **Short (20 marks, 30 min):** A q016, q032, q023, q052, q018, q029, q046, q019, q040 · B (q060 or q064).
- **Long (40 marks, 60 min):** A q002, q009, q008, q054, q051, q053, q003, q004, q005, q013, q047, q056, q058, q050 · B (q061 or q062 or q063).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 3/3 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-chemistry.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Authoring.** Drafted by a helper author working to the same brief and template, who re-solved every item; the chapter producer rebuilt it from source (validator, lint and verify clean).
2. **Fixes.** The SVG delivery tube was re-routed so it no longer passes through the base of the inverted jar; one 1-mark nitride stem was rephrased because it was a near-duplicate of another.
3. **Every equation re-balanced** (including the excess-ammonia and excess-chlorine reactions) and every numerical re-computed by the build script.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.
- **2026-11-05:** assertion-reason options reordered to the ICSE 2027 Chemistry specimen paper (522) order and wording; every key re-mapped so each item's meaning is unchanged.
