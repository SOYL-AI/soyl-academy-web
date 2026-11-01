# ICSE Class 10 Chemistry, Chapter 3 — Acids, Bases and Salts

`icse-10-chemistry-ch03` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 14 slides), notes (6 sections), 30 flashcards, 63 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10chem_ch03_short` (20 marks, 30 min) and `t_icse10chem_ch03_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-chemistry-chapter-test-short` / `-long` (Section A compulsory objective items, 1-mark answers, bracket completion and match; Section B 10-mark structured questions, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder adapted for ICSE ids, the ICSE 10 Chemistry blueprints, 10-mark structured questions, five-pair matches and per-blank fill marks), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/icse-10-chemistry-ch03/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 6 syllabus topics are covered: t01 Acids, bases and alkalis: definitions in terms of ions; ionisation and dissociation equations; t02 Indicators (litmus, methyl orange, phenolphthalein), pH scale, pH paper and universal indicator; t03 Salts: definition; normal, acid, basic and complex salts; t04 Action of dilute acids on carbonates, hydrogen carbonates, sulphites, hydrogen sulphites and sulphides; t05 Preparation of normal salts: direct combination, displacement and precipitation (double decomposition); t06 Preparation of normal salts: neutralisation of an insoluble base, titration of an alkali, and acids on carbonates and bicarbonates.
- Removed topics are respected: Details of apparatus or procedures for preparing normal salts (method and equations only).
- Facts a reviewer may wish to double-check: Indicator colours: litmus red / purple / blue; methyl orange pink / orange / yellow; phenolphthalein colourless / pink. NaHCO₃ solution about pH 8. Solubility rules are the usual ICSE summary (PbCl₂ insoluble in cold water, CaSO₄ slightly soluble). Apparatus for salt preparation is not described (removed topic): methods and equations only.

## Shape
- **Part 1, 14 slides:** acids: hydronium ions in water; bases and alkalis: hydroxide ions; worked example (ionise or dissociate?); indicators; the pH scale and universal indicator; worked example (reading pH values); salts and their kinds; worked example (normal or acid salt?); summary; exam tips; 3 checks.
- **Part 2, 14 slides:** carbonates and hydrogen carbonates; sulphites, hydrogen sulphites and sulphides; worked example (which salt was it?); choosing a method: solubility decides; direct combination, displacement and precipitation; worked example (choose the method); neutralisation, titration and acids on carbonates; worked example (why titration for sodium sulphate?); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 9 · diagram 1 · example 6 · check 6 · summary 2 · exam-tips 2. Visuals: flow 3 · svg 1 · table 18. One SVG (the pH scale with acidic, neutral and alkaline regions and example values); flows for acid and normal salts, gas identification and choosing a preparation method. Narration 9–75 words (mean 49), no symbols, formulae or unit abbreviations.

## Question bank (63)
| Type | Count | Marks |
|---|---|---|
| mcq | 20 | 1 (keys a 5, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a c c a c a) |
| true-false | 6 | 1 |
| fill-blank | 2 | 1 per blank (the 3-blank bracket completion carries 3) |
| match | 1 | 1 per pair (4 or 5 pairs) |
| short (1 mark) | 13 | 1 (a balanced equation, an observation or a name) |
| numerical | 2 | 1 or 2 (2.24 L; 4 g) |
| short (2 marks) | 5 | 2 |
| short (3 marks) | 3 | 3 (reasons, comparisons, calculations with working) |
| long | 5 | 10, set in parts with marks shown (2 + 2 + 3 + 3 or 3 + 3 + 4), as in Section B of the ICSE paper |

- No case-based items: the ICSE Chemistry pattern has none (the 10-mark structured questions carry the data or situation instead).
- **Difficulty:** d1 20 · d2 28 · d3 13 · d4 2.
- **Competency:** recall 13 · understanding 10 · application 29 · analysis 11. Application or higher is **63% of items (72% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 11 · t02 10 · t03 12 · t04 13 · t05 10 · t06 11.
- **Deck checks:** q001, q011, q020 (Part 1); q029, q041, q049 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Chemistry blueprints)
- **Short (20 marks, 30 min):** A q002, q012, q021, q030, q005, q007, q026, q036, q048 · B (q059 or q062).
- **Long (40 marks, 60 min):** A q003, q004, q013, q031, q042, q050, q023, q008, q017, q035, q046, q054, q016, q028 · B (q060 or q061 or q063).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 2/2 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-chemistry.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Specific stems.** Every stem names its own acid, salt or data (NaHSO₄ versus HNO₃, potassium ferrocyanide, sodium hydrogen sulphite, marble in nitric acid, FeS, lead chloride, barium sulphate, potassium sulphate by titration, 10 g CaCO₃, 4.9 g H₂SO₄). The CBSE 10 Science ch02 set-ups (turmeric, onion strips, methyl-orange fill, pure-water pH, baking soda, plaster of Paris, bleaching powder, dry-litmus HCl) are not reused.
2. **Fixes after the first build.** One assertion-reason key was corrected from (b) to (c) (A true, R false); seven 1-mark learnt equations were retagged as recall, bringing application-or-higher from 75% to 63%; two items were raised to difficulty 4. Rebuilt: validator, lint and verify all clean.
3. **Every equation re-balanced** and every numerical re-computed by the build script.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

