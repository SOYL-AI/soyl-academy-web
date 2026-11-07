# ICSE Class 10 Chemistry, Chapter 15 — Alcohols and Carboxylic Acids

`icse-10-chemistry-ch15` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 16 slides), notes (6 sections), 30 flashcards, 63 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10chem_ch15_short` (20 marks, 30 min) and `t_icse10chem_ch15_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-chemistry-chapter-test-short` / `-long` (Section A compulsory objective items, 1-mark answers, bracket completion and match; Section B 10-mark structured questions, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder adapted for ICSE ids, the ICSE 10 Chemistry blueprints, 10-mark structured questions, five-pair matches and per-blank fill marks), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/icse-10-chemistry-ch15/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 5 syllabus topics are covered: t01 Ethanol: preparation by hydrolysis of an alkyl halide; physical properties; t02 Chemical properties of ethanol: combustion, reaction with sodium, esterification, dehydration to ethene; t03 Denatured, methylated and spurious alcohol; uses of ethanol; t04 Acetic (ethanoic) acid: structure; physical properties; glacial acetic acid; t05 Chemical properties of acetic acid (litmus, alkalis, alcohol - esterification) and its uses.
- Facts a reviewer may wish to double-check: Ethanol boils at 78 °C (density 0.79 g cm⁻³, freezes about −114 °C); ethanoic acid boils at 118 °C and melts at 16.6 °C (written about 17 °C); denaturants methanol, pyridine and a copper-sulphate dye; methanol toxicity via methanal and methanoic acid.

## Shape
- **Part 1, 16 slides:** the structure of ethanol; preparing ethanol: hydrolysis of bromoethane; physical properties of ethanol; worked example (identifying a liquid from data); combustion and the reaction with sodium; worked example (hydrogen from ethanol and sodium); esterification; dehydration to ethene; denatured, methylated and spurious alcohol; uses of ethanol; summary; exam tips; 3 checks.
- **Part 2, 16 slides:** structure: the carboxyl group; physical properties of ethanoic acid; glacial acetic acid; worked example (which liquid is which?); ethanoic acid and litmus: a weak acid; reaction with alkalis; worked example (how much alkali?); esterification in the laboratory; the esterification equation; uses of ethanoic acid; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 14 · diagram 2 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: chem 5 · svg 5 · table 16. Five SVGs (ethanol with –OH marked; ethanoic acid with –COOH marked; esterification; the ester test in a water bath; glacial acetic acid as liquid and crystals). Narration 35–67 words (mean 54), no symbols, formulae or unit abbreviations.

## Question bank (63)
| Type | Count | Marks |
|---|---|---|
| mcq | 20 | 1 (keys a 5, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys c a d c b) |
| true-false | 4 | 1 |
| fill-blank | 3 | 1 per blank (the 3-blank bracket completion carries 3) |
| match | 2 | 1 per pair (4 or 5 pairs) |
| short (1 mark) | 12 | 1 (a balanced equation, an observation or a name) |
| numerical | 4 | 1 or 2 (1.12 L; 6.72 L; 4 g; 4.4 g) |
| short (2 marks) | 5 | 2 |
| short (3 marks) | 3 | 3 (reasons, comparisons, calculations with working) |
| long | 5 | 10, set in parts with marks shown (2 + 2 + 3 + 3 or 3 + 3 + 4), as in Section B of the ICSE paper |

- No case-based items: the ICSE Chemistry pattern has none (the 10-mark structured questions carry the data or situation instead).
- **Difficulty:** d1 23 · d2 27 · d3 12 · d4 1.
- **Competency:** recall 15 · understanding 12 · application 24 · analysis 12. Application or higher is **57% of items (69% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 15 · t02 19 · t03 11 · t04 11 · t05 22.
- **Deck checks:** q001, q009, q011 (Part 1); q033, q041, q044 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Chemistry blueprints)
- **Short (20 marks, 30 min):** A q002, q010, q035, q043, q004, q007, q050, q029, q053 · B (q059 or q061).
- **Long (40 marks, 60 min):** A q003, q012, q023, q034, q042, q047, q048, q015, q016, q039, q051, q052, q049, q058 · B (q060 or q062 or q063).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 4/4 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-chemistry.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Authoring.** Drafted by a helper author working to the same brief and template, who re-solved every item; the chapter producer rebuilt it from source (validator, lint and verify clean).
2. **Specific stems.** Two stems were rephrased to avoid near-duplicates (bromoethane hydrolysis vs the ch14 alcoholic-KOH item; two ester MCQs). CBSE 10 Science ch04 set-ups are not reused.
3. **Every equation re-balanced** and every numerical re-computed by the build script.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.
- **2026-11-05:** assertion-reason options reordered to the ICSE 2027 Chemistry specimen paper (522) order and wording; every key re-mapped so each item's meaning is unchanged.
