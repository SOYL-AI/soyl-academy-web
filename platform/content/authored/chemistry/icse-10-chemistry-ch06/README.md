# ICSE Class 10 Chemistry, Chapter 6 — Stoichiometry: Formulae and Calculations from Equations

`icse-10-chemistry-ch06` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 15 slides), notes (6 sections), 30 flashcards, 71 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10chem_ch06_short` (20 marks, 30 min) and `t_icse10chem_ch06_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-chemistry-chapter-test-short` / `-long` (Section A compulsory objective items, 1-mark answers, bracket completion and match; Section B 10-mark structured questions, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder adapted for ICSE ids, the ICSE 10 Chemistry blueprints, 10-mark structured questions, five-pair matches and per-blank fill marks), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/icse-10-chemistry-ch06/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 4 syllabus topics are covered: t01 Percentage composition of a compound; t02 Empirical and molecular formula from percentage composition; t03 Empirical formula from the masses of combining elements; t04 Calculations based on chemical equations: mass-mass, mass-volume and volume-volume.
- Facts a reviewer may wish to double-check: Cu is taken as 64 in this chapter, so CuSO₄·5H₂O has M = 250 (25.6% Cu, 36% water); lead nitrate decomposition 2Pb(NO₃)₂ → 2PbO + 4NO₂ + O₂ with Pb = 207; percentage numericals key rounded values (Ca(NO₃)₂ 17.1% N, gypsum 20.9% water); 1 g H₂ with 1 g O₂ gives 1.125 g of water with 0.875 g H₂ left over.

## Shape
- **Part 1, 15 slides:** percentage composition; worked example (nitrogen in ammonium nitrate); water of crystallisation; worked example (water in Epsom salt); empirical and molecular formulae; finding an empirical formula: the table method; worked example (from percentages to a molecular formula); empirical formula from combining masses; worked example (an oxide of iron); summary; exam tips; 3 checks.
- **Part 2, 15 slides:** what a balanced equation tells us; the three-step method; worked example (mass to mass); mass to volume, and volume to mass; worked example (mass to volume); volume to volume; worked example (volume to volume, then mass); counting particles from an equation; worked example (heating potassium chlorate); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 10 · example 8 · check 6 · summary 2 · exam-tips 2. Visuals: chem 2 · flow 2 · svg 3 · table 17. Two SVGs (percentage-by-mass bars for urea and ammonium nitrate; the stoichiometry bridge from given quantity through moles and mole ratio to wanted quantity). Narration 14–72 words (mean 53), no symbols, formulae or unit abbreviations.

## Question bank (71)
| Type | Count | Marks |
|---|---|---|
| mcq | 20 | 1 (keys a 5, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys d c b a c) |
| true-false | 4 | 1 |
| fill-blank | 4 | 1 per blank (the 3-blank bracket completion carries 3) |
| match | 2 | 1 per pair (4 or 5 pairs) |
| short (1 mark) | 12 | 1 (a balanced equation, an observation or a name) |
| numerical | 11 | 1 or 2 (17.1 %; 20.9 %; 6; 2; 3; 6.4 g; 1.68 dm³; 10.2 g; 250 cm³; 12.25 g; 1.8 g) |
| short (2 marks) | 5 | 2 |
| short (3 marks) | 3 | 3 (reasons, comparisons, calculations with working) |
| long | 5 | 10, set in parts with marks shown (2 + 2 + 3 + 3 or 3 + 3 + 4), as in Section B of the ICSE paper |

- No case-based items: the ICSE Chemistry pattern has none (the 10-mark structured questions carry the data or situation instead).
- **Difficulty:** d1 22 · d2 32 · d3 15 · d4 2.
- **Competency:** recall 10 · understanding 16 · application 36 · analysis 9. Application or higher is **63% of items (74% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 17 · t02 20 · t03 10 · t04 29.
- **Deck checks:** q001, q015, q031 (Part 1); q039, q040, q041 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Chemistry blueprints)
- **Short (20 marks, 30 min):** A q002, q016, q032, q042, q019, q025, q036, q058, q014 · B (q067 or q068).
- **Long (40 marks, 60 min):** A q003, q004, q018, q033, q044, q045, q048, q010, q026, q027, q059, q028, q064, q065 · B (q069 or q070 or q071).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 23/23 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-chemistry.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Authoring.** Drafted by a helper author working to the same brief and template, who re-solved every item and re-computed all eleven numericals; the chapter producer rebuilt it from source (validator, lint and verify clean).
2. **Specific stems.** Every stem names its own compound and data; the ISC 12 ch01 and CBSE 10 Science stems are not reused.
3. **Every equation re-balanced** and every numerical re-computed by the build script.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.
- **2026-11-05:** assertion-reason options reordered to the ICSE 2027 Chemistry specimen paper (522) order and wording; every key re-mapped so each item's meaning is unchanged.
