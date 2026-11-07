# ICSE Class 10 Chemistry, Chapter 14 — Hydrocarbons: Alkanes, Alkenes and Alkynes

`icse-10-chemistry-ch14` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 16 slides), notes (6 sections), 30 flashcards, 64 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10chem_ch14_short` (20 marks, 30 min) and `t_icse10chem_ch14_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-chemistry-chapter-test-short` / `-long` (Section A compulsory objective items, 1-mark answers, bracket completion and match; Section B 10-mark structured questions, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder adapted for ICSE ids, the ICSE 10 Chemistry blueprints, 10-mark structured questions, five-pair matches and per-blank fill marks), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/icse-10-chemistry-ch14/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 6 syllabus topics are covered: t01 Alkanes: general formula; methane as a greenhouse gas; preparation of methane and ethane from sodium ethanoate, sodium propanoate, iodomethane and bromoethane; t02 Reactions of methane and ethane: complete and incomplete combustion; substitution with chlorine; t03 Alkenes: ethene; preparation by dehydrohalogenation and by dehydration of ethanol; t04 Alkynes: ethyne; preparation from calcium carbide and from 1,2-dibromoethane; t05 Addition reactions of ethene and ethyne with hydrogen and halogens (Cl2, Br2, I2); test for unsaturation; t06 Uses of methane, ethane, ethene and ethyne.
- Removed topics are respected: Properties of alkenes and alkynes beyond the main addition reactions with hydrogen and halogens.
- Facts a reviewer may wish to double-check: Methane from iodomethane and ethane from bromoethane use nascent hydrogen (Zn–Cu couple in ethanol), written 2[H]; the Wurtz reaction is left out; methane’s greenhouse effect is given as roughly 25–30 times that of CO₂ over a century; ethanol dehydrated with conc. H₂SO₄ at about 170 °C with a NaOH wash.

## Shape
- **Part 1, 16 slides:** alkanes: the saturated family; methane: a greenhouse gas of concern; methane from sodium ethanoate; laboratory preparation of methane; ethane from sodium propanoate; alkanes from alkyl halides; worked example (mass of ethane from its salt); combustion: complete and incomplete; worked example (volumes of gases in combustion); substitution with chlorine; uses of methane and ethane; summary; exam tips; 3 checks.
- **Part 2, 16 slides:** ethene from bromoethane: dehydrohalogenation; ethene from ethanol: dehydration; ethyne from calcium carbide; ethyne from 1,2-dibromoethane; worked example (reagents and conditions); addition of hydrogen; addition of halogens; worked example (how much bromine?); test for unsaturation; uses of ethene and ethyne; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 14 · diagram 2 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: chem 6 · flow 1 · svg 7 · table 12. Seven SVGs (methane and ethane; methane preparation with collection over water; stepwise chlorination; ethene and ethyne; ethyne from calcium carbide; bromine addition; the bromine-water test). Narration 36–66 words (mean 54), no symbols, formulae or unit abbreviations.

## Question bank (64)
| Type | Count | Marks |
|---|---|---|
| mcq | 20 | 1 (keys a 5, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys c c b a d) |
| true-false | 4 | 1 |
| fill-blank | 3 | 1 per blank (the 3-blank bracket completion carries 3) |
| match | 2 | 1 per pair (4 or 5 pairs) |
| short (1 mark) | 13 | 1 (a balanced equation, an observation or a name) |
| numerical | 4 | 1 or 2 (3.2 g; 105 cm³; 22 g; 37.6 g) |
| short (2 marks) | 5 | 2 |
| short (3 marks) | 3 | 3 (reasons, comparisons, calculations with working) |
| long | 5 | 10, set in parts with marks shown (2 + 2 + 3 + 3 or 3 + 3 + 4), as in Section B of the ICSE paper |

- No case-based items: the ICSE Chemistry pattern has none (the 10-mark structured questions carry the data or situation instead).
- **Difficulty:** d1 22 · d2 26 · d3 14 · d4 2.
- **Competency:** recall 13 · understanding 11 · application 29 · analysis 11. Application or higher is **63% of items (76% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 16 · t02 15 · t03 9 · t04 7 · t05 21 · t06 7.
- **Deck checks:** q001, q003, q015 (Part 1); q025, q032, q039 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Chemistry blueprints)
- **Short (20 marks, 30 min):** A q002, q014, q026, q054, q018, q009, q035, q047, q049 · B (q060 or q063).
- **Long (40 marks, 60 min):** A q004, q005, q017, q033, q040, q041, q028, q010, q020, q031, q036, q046, q045, q057 · B (q061 or q062 or q064).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 4/4 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-chemistry.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Authoring.** Drafted by a helper author working to the same brief and template, who re-solved every item; the chapter producer rebuilt it from source (validator, lint and verify clean).
2. **Fixes.** A missing import was added; two learnt 1-mark equations were retagged as recall to bring application-or-higher from 66% into the band; triple bonds are kept out of mhchem strings (KaTeX), so equations use molecular formulae.
3. **Every equation re-balanced** and every numerical re-computed by the build script.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.
- **2026-11-05:** assertion-reason options reordered to the ICSE 2027 Chemistry specimen paper (522) order and wording; every key re-mapped so each item's meaning is unchanged.
