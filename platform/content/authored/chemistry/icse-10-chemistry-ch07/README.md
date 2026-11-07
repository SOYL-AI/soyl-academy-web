# ICSE Class 10 Chemistry, Chapter 7 — Electrolysis

`icse-10-chemistry-ch07` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 15 slides), notes (7 sections), 31 flashcards, 65 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10chem_ch07_short` (20 marks, 30 min) and `t_icse10chem_ch07_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-chemistry-chapter-test-short` / `-long` (Section A compulsory objective items, 1-mark answers, bracket completion and match; Section B 10-mark structured questions, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder adapted for ICSE ids, the ICSE 10 Chemistry blueprints, 10-mark structured questions, five-pair matches and per-blank fill marks), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/icse-10-chemistry-ch07/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 7 syllabus topics are covered: t01 Electrolytes and non-electrolytes; strong and weak electrolytes; substances with molecules only, ions only or both; t02 Terms: electrolysis, electrode, anode, cathode, anion, cation; oxidation and reduction as loss and gain of electrons; t03 Migration of ions and selective discharge; activity series (Na, Mg, Fe, Cu); t04 Electrolysis of molten lead bromide; t05 Electrolysis of acidified water with platinum electrodes; t06 Electrolysis of aqueous copper(II) sulphate with copper electrodes and with platinum electrodes; t07 Applications: electroplating with nickel and silver; electrorefining of copper.
- Facts a reviewer may wish to double-check: Electrode equations are written with electrons as products at the anode (for example 4OH⁻ → 2H₂O + O₂ + 4e⁻), balanced in atoms and charge by hand (the automatic balance check skips equations containing electrons). OH⁻ is discharged in preference to SO₄²⁻ and NO₃⁻; in concentrated brine Cl⁻ is discharged by concentration. Sodium argentocyanide is written in plain text. No Faraday calculations (not in the ICSE scope).

## Shape
- **Part 1, 15 slides:** electrolytes and non-electrolytes; molecules only, ions only, or both; two ways of conducting; the language of electrolysis; oxidation at the anode, reduction at the cathode; selective discharge; worked example (which ion is discharged?); electrolysis of molten lead bromide; worked example (equations for molten lead bromide); summary; exam tips; 3 checks.
- **Part 2, 15 slides:** electrolysis of acidified water; worked example (equations for acidified water); copper(II) sulphate with copper electrodes; copper(II) sulphate with platinum electrodes; worked example (comparing the two cells); electroplating; worked example (nickel-plating a brass tap); silver plating: why sodium argentocyanide?; electrorefining of copper; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 8 · diagram 5 · example 5 · check 6 · summary 2 · exam-tips 2. Visuals: chem 1 · flow 1 · svg 6 · table 16. Six SVGs (ion migration in a cell; molten lead bromide in a silica crucible; the voltameter for acidified water with H₂ : O₂ = 2 : 1; copper sulphate with copper and with platinum electrodes; nickel plating a brass tap; electrorefining of copper with anode mud). Narration 10–74 words (mean 52), no symbols, formulae or unit abbreviations.

## Question bank (65)
| Type | Count | Marks |
|---|---|---|
| mcq | 21 | 1 (keys a 6, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys c a c d b) |
| true-false | 4 | 1 |
| fill-blank | 4 | 1 per blank (the 3-blank bracket completion carries 3) |
| match | 2 | 1 per pair (4 or 5 pairs) |
| short (1 mark) | 12 | 1 (a balanced equation, an observation or a name) |
| numerical | 4 | 1 or 2 (10.35 g; 36 cm³; 2.24 dm³; 0.2 mol) |
| short (2 marks) | 5 | 2 |
| short (3 marks) | 3 | 3 (reasons, comparisons, calculations with working) |
| long | 5 | 10, set in parts with marks shown (2 + 2 + 3 + 3 or 3 + 3 + 4), as in Section B of the ICSE paper |

- No case-based items: the ICSE Chemistry pattern has none (the 10-mark structured questions carry the data or situation instead).
- **Difficulty:** d1 27 · d2 24 · d3 13 · d4 1.
- **Competency:** recall 14 · understanding 20 · application 23 · analysis 8. Application or higher is **48% of items (68% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 12 · t02 8 · t03 9 · t04 11 · t05 13 · t06 10 · t07 12.
- **Deck checks:** q001, q011, q017 (Part 1); q030, q041, q048 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Chemistry blueprints)
- **Short (20 marks, 30 min):** A q002, q012, q021, q032, q005, q025, q037, q015, q010 · B (q061 or q062).
- **Long (40 marks, 60 min):** A q003, q013, q018, q022, q042, q049, q052, q026, q038, q046, q016, q054, q058, q059 · B (q063 or q064 or q065).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 7/7 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-chemistry.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Authoring.** Drafted by a helper author working to the same brief and template, who re-solved every item; the chapter producer rebuilt it from source (validator, lint and verify clean) and re-checked every electrode half-equation for atom and charge balance.
2. **Specific stems.** The ISC 12 ch04 (Faraday, electroplating) and CBSE 10 Science ch03 (refining of copper) set-ups are not reused.
3. **Competency.** The chapter is largely descriptive; items were tagged honestly, giving 48% application or higher (inside the band).

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.
- **2026-11-05:** assertion-reason options reordered to the ICSE 2027 Chemistry specimen paper (522) order and wording; every key re-mapped so each item's meaning is unchanged.
