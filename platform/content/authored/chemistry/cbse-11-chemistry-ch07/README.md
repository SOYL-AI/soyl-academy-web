# CBSE Class 11 Chemistry, Chapter 7 — Redox Reactions

`cbse-11-chemistry-ch07` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 17 slides), notes (6 sections), 30 flashcards, 63 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11chem_ch07_short` (20 marks, 40 min) and `t_cbse11chem_ch07_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-11-default-chapter-test-short` / `-long` (the subject has only annual and half-yearly blueprints). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the CBSE 12 Chemistry builder with CBSE 11 ids and blueprints; the pipeline’s verify checks and an answer-leak scan run inside the build), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/cbse-11-chemistry-ch07/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 rationalised syllabus)
- All 2 syllabus topics are covered: t01 Oxidation and reduction; oxidation number; t02 Types of redox reactions and balancing.

- Facts a reviewer may wish to double-check: Oxidation numbers including fractional values (Fe₃O₄, S₄O₆²⁻, Pb₃O₄) and peroxo structures (Na₂S₂O₈, CrO₅ with Cr +6, KO₂); disproportionation of Cl₂ (cold dilute alkali gives ClO⁻, hot concentrated gives ClO₃⁻), Br₂ and P₄ in alkali; zinc with dilute nitric acid giving N₂O; MnO₄⁻ : Fe²⁺ 1 : 5, MnO₄⁻ : C₂O₄²⁻ 2 : 5, MnO₄⁻ : H₂O₂ 2 : 5; activity order Mg > Zn > Fe > Cu > Ag. Titration data are labelled given; the Daniell cell is qualitative (no EMF, which is Class 12).

## Shape
- **Part 1, 17 slides:** the classical view; the electron-transfer view; rules for oxidation numbers; oxidation numbers of manganese; worked example (oxidation numbers); fractional values, peroxides and superoxides; spotting a redox reaction; worked example (oxidant and reductant); oxidation of carbon, step by step; oxidation number, valence and Stock notation; common oxidising and reducing agents; summary; exam tips; 3 checks.
- **Part 2, 17 slides:** combination and decomposition; displacement reactions; a Daniell cell: redox in two vessels; disproportionation; balancing by the oxidation-number method; worked example (oxidation-number method); balancing by the half-reaction method; worked example (acidic medium); worked example (basic medium); redox titration with permanganate; worked example (titration calculation); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 11 · diagram 5 · example 6 · check 6 · summary 2 · exam-tips 2. Visuals: flow 2 · svg 5 · table 21. Five SVGs (manganese and carbon oxidation-number ladders, chlorine disproportionation, Daniell cell, KMnO₄ titration set-up). Narration 10–68 words (mean 50), no symbols, formulae or unit abbreviations.

## Question bank (63)
| Type | Count | Marks |
|---|---|---|
| mcq | 22 | 1 (keys a 6, b 6, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a b c d a c) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 6 | 1–3 (6; 2.67; 1.81 × 10²³; 0.0736 mol L⁻¹; 40 mL; 0.11 mol L⁻¹) |
| short (2 marks) | 7 | 2 (30–50 words) |
| short (3 marks) | 5 | 3 (50–80 words) |
| long | 5 | 5 (80–120 words) |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 4 · d2 28 · d3 28 · d4 3.
- **Competency:** recall 3 · understanding 25 · application 25 · analysis 10. Application or higher is **56% of items (65% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 30 · t02 39.
- **Deck checks:** q001, q002, q003 (Part 1); q019, q020, q021 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 11 class-default blueprints)
- **Short (20 marks, 40 min):** A q004, q005, q006, q023 · B q043, q044, q050 · C (q058 or q059) · D q060.
- **Long (40 marks, 90 min):** A q007, q008, q009, q010, q011, q012, q013, q014, q024, q025 · B q045, q046, (q047 or q048), q051, (q052 or q053) · C q055, (q056 or q057) · D q061, q062.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (10 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 23/23 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-02-subject-producer-cbse11-chemistry.md`.

## Verifier pass (2026-11-02)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet); the producer checked every balanced equation and the oxidation-number claims.
2. **Fixes.** The writer re-tagged definition and classification items (76 % → 56 % application or higher), lengthened model answers and corrected one re-solve check. The producer changed “very dilute” to “dilute” nitric acid for the N₂O product (very dilute acid gives NH₄NO₃).
3. **Originality gate.** The generic stem of the reaction-type match item duplicated the ch08 one; the producer named the reactions in both stems.
4. **Oxidation numbers are computed in JS for every item that asks for one; every equation balances in atoms and charge.**

## Known gaps
- Narration audio is not generated (TTS stage).

