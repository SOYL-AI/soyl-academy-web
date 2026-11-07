# ICSE Class 10 Chemistry, Chapter 9 — Study of Compounds: Hydrogen Chloride

`icse-10-chemistry-ch09` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 16 slides), notes (6 sections), 30 flashcards, 64 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10chem_ch09_short` (20 marks, 30 min) and `t_icse10chem_ch09_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-chemistry-chapter-test-short` / `-long` (Section A compulsory objective items, 1-mark answers, bracket completion and match; Section B 10-mark structured questions, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder adapted for ICSE ids, the ICSE 10 Chemistry blueprints, 10-mark structured questions, five-pair matches and per-blank fill marks), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/icse-10-chemistry-ch09/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 5 syllabus topics are covered: t01 Laboratory preparation of hydrogen chloride from sodium chloride: apparatus, conditions, drying, collection and precautions; t02 Density and solubility of hydrogen chloride; the fountain experiment; t03 Preparing hydrochloric acid by dissolving the gas in water; avoiding back suction; t04 Reactions: with ammonia; acidic properties with metals, oxides, hydroxides, carbonates, hydrogen carbonates, sulphides and sulphites; t05 Aqua regia; precipitation with silver nitrate and lead nitrate; tests for HCl gas and hydrochloric acid.
- Facts a reviewer may wish to double-check: Laboratory preparation kept below 200 °C (above it Na₂SO₄ forms a hard crust and the glass may crack); vapour density of air about 14.4 and of HCl 18.25; aqua regia written as HNO₃ + 3HCl → NOCl + 2H₂O + 2[Cl] (nascent chlorine); PbCl₂ dissolves in hot water and AgCl in excess NH₄OH.

## Shape
- **Part 1, 14 slides:** the reaction; the apparatus; drying and collecting; worked example (why stay below two hundred degrees?); heavier than air; the fountain experiment; worked example (how much gas from rock salt?); making hydrochloric acid: the inverted funnel; summary; exam tips; 3 checks.
- **Part 2, 16 slides:** with ammonia: dense white fumes; with active metals; with oxides and hydroxides; with carbonates and hydrogencarbonates; worked example (gas from marble); with sulphides and sulphites; worked example (which salt gave the gas?); precipitates with silver nitrate and lead nitrate; aqua regia; tests for hydrogen chloride and hydrochloric acid; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 11 · diagram 3 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: chem 3 · flow 1 · svg 3 · table 17. Three SVGs (HCl preparation with sulphuric-acid drying and upward displacement of air; the fountain experiment; the inverted-funnel arrangement against back suction). Narration 10–67 words (mean 49), no symbols, formulae or unit abbreviations.

## Question bank (64)
| Type | Count | Marks |
|---|---|---|
| mcq | 19 | 1 (keys a 5, b 5, c 5, d 4; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys d c c b a) |
| true-false | 4 | 1 |
| fill-blank | 4 | 1 per blank (the 3-blank bracket completion carries 3) |
| match | 2 | 1 per pair (4 or 5 pairs) |
| short (1 mark) | 12 | 1 (a balanced equation, an observation or a name) |
| numerical | 3 | 1 or 2 (11.7 g; 18.25; 2.24 L) |
| short (2 marks) | 6 | 2 |
| short (3 marks) | 4 | 3 (reasons, comparisons, calculations with working) |
| long | 5 | 10, set in parts with marks shown (2 + 2 + 3 + 3 or 3 + 3 + 4), as in Section B of the ICSE paper |

- No case-based items: the ICSE Chemistry pattern has none (the 10-mark structured questions carry the data or situation instead).
- **Difficulty:** d1 21 · d2 33 · d3 9 · d4 1.
- **Competency:** recall 14 · understanding 15 · application 27 · analysis 8. Application or higher is **55% of items (60% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 13 · t02 12 · t03 5 · t04 23 · t05 19.
- **Deck checks:** q001, q013, q022 (Part 1); q026, q043, q042 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Chemistry blueprints)
- **Short (20 marks, 30 min):** A q014, q030, q031, q028, q015, q034, q037, q018, q019 · B (q060 or q063).
- **Long (40 marks, 60 min):** A q003, q004, q023, q045, q002, q027, q046, q007, q008, q035, q051, q038, q057, q059 · B (q061 or q062 or q064).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 3/3 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-chemistry.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Authoring.** Drafted by a helper author working to the same brief and template, who re-solved every item; the chapter producer rebuilt it from source (validator, lint and verify clean).
2. **Test composition.** The five-pair match in the long test is a test-to-observation match; a reagent-to-gas match was cut to four pairs so it does not give away a structured question.
3. **Specific stems.** The magnesium and baking-soda stems were reworded away from CBSE 10 Science ch02.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.
- **2026-11-05:** assertion-reason options reordered to the ICSE 2027 Chemistry specimen paper (522) order and wording; every key re-mapped so each item's meaning is unchanged.
