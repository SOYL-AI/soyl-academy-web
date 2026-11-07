# ICSE Class 10 Chemistry, Chapter 13 — Organic Chemistry: Introduction, Structure, Isomerism and Nomenclature

`icse-10-chemistry-ch13` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 15 slides), notes (6 sections), 31 flashcards, 64 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10chem_ch13_short` (20 marks, 30 min) and `t_icse10chem_ch13_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-chemistry-chapter-test-short` / `-long` (Section A compulsory objective items, 1-mark answers, bracket completion and match; Section B 10-mark structured questions, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder adapted for ICSE ids, the ICSE 10 Chemistry blueprints, 10-mark structured questions, five-pair matches and per-blank fill marks), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/icse-10-chemistry-ch13/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 6 syllabus topics are covered: t01 Unique nature of carbon: tetravalency and catenation; single, double and triple bonds; t02 Straight-chain, branched-chain and cyclic compounds (benzene structure only); t03 Structural formulae of alkanes, alkenes and alkynes up to five carbon atoms; t04 Structural isomerism: chain and position isomers; t05 Homologous series: characteristics; alkanes, alkenes and alkynes; gradation of properties with molecular mass; t06 Nomenclature: trivial and IUPAC names of compounds with one functional group (halide, alkene, alkyne, alcohol, aldehyde, ketone, carboxylic acid, ether, ester).
- Removed topics are respected: Cyclic compounds other than the benzene structure; Naming compounds with more than one functional group.
- Facts a reviewer may wish to double-check: Boiling points used: butane about −1 °C, 2-methylpropane about −12 °C, pentane 36 °C, 2-methylbutane 28 °C, 2,2-dimethylpropane 10 °C; CH₃OCH₂CH₃ named methoxyethane; current IUPAC style (but-1-ene, propan-2-ol) with the older style mentioned in the exam tips.

## Shape
- **Part 1, 15 slides:** tetravalency; catenation; single, double and triple bonds; worked example (counting bonds in propyne); saturated and unsaturated hydrocarbons; straight, branched and closed chains; the structure of benzene; structural formulae up to five carbons; worked example (five carbons, three families); summary; exam tips; 3 checks.
- **Part 2, 15 slides:** structural isomerism: chain isomers; position isomers; worked example (isomers or the same compound?); homologous series; functional groups; iUPAC naming: the four steps; worked example (naming from a structure); worked example (from name to structure); trivial and IUPAC names; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 13 · example 5 · check 6 · summary 2 · exam-tips 2. Visuals: flow 1 · svg 7 · table 16. Seven SVGs drawn with a displayed-formula helper (methane and catenation; ethane, ethene, ethyne; chain types; benzene; the two C₄H₁₀ isomers; the three C₅H₁₂ isomers; but-1-ene and but-2-ene). Narration 36–72 words (mean 59), no symbols, formulae or unit abbreviations.

## Question bank (64)
| Type | Count | Marks |
|---|---|---|
| mcq | 20 | 1 (keys a 5, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys b c a d c) |
| true-false | 4 | 1 |
| fill-blank | 4 | 1 per blank (the 3-blank bracket completion carries 3) |
| match | 2 | 1 per pair (4 or 5 pairs) |
| short (1 mark) | 13 | 1 (a balanced equation, an observation or a name) |
| numerical | 3 | 1 or 2 (90 %; 5; 72) |
| short (2 marks) | 5 | 2 |
| short (3 marks) | 3 | 3 (reasons, comparisons, calculations with working) |
| long | 5 | 10, set in parts with marks shown (2 + 2 + 3 + 3 or 3 + 3 + 4), as in Section B of the ICSE paper |

- No case-based items: the ICSE Chemistry pattern has none (the 10-mark structured questions carry the data or situation instead).
- **Difficulty:** d1 25 · d2 25 · d3 11 · d4 3.
- **Competency:** recall 14 · understanding 12 · application 28 · analysis 9 · evaluation 1. Application or higher is **59% of items (74% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 10 · t02 6 · t03 10 · t04 15 · t05 13 · t06 20.
- **Deck checks:** q001, q010, q015 (Part 1); q022, q034, q045 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Chemistry blueprints)
- **Short (20 marks, 30 min):** A q002, q016, q023, q048, q026, q007, q029, q054, q057 · B (q060 or q063).
- **Long (40 marks, 60 min):** A q003, q011, q024, q035, q046, q049, q050, q013, q020, q042, q055, q014, q021, q052 · B (q061 or q062 or q064).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 3/3 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-chemistry.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Authoring.** Drafted by a helper author working to the same brief and template, who re-solved every item; the chapter producer rebuilt it from source (validator, lint and verify clean).
2. **Specific stems.** CBSE 10 Science ch04 set-ups are not reused.
3. **Fixes.** Short check-slide narrations were lengthened and one isomer sentence in the notes tightened.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.
- **2026-11-05:** assertion-reason options reordered to the ICSE 2027 Chemistry specimen paper (522) order and wording; every key re-mapped so each item's meaning is unchanged.
