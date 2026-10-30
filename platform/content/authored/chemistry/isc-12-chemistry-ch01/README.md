# ISC Class 12 Chemistry, Chapter 1 — Solutions and Their Concentration

`isc-12-chemistry-ch01` · release v1 · academic year 2026-27 (ISC 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 16 slides), notes (5 sections), 31 flashcards, 64 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12chem_ch01_short` (20 marks, 50 min) and `t_isc12chem_ch01_long` (40 marks, 100 min), laid out exactly as the ISC default blueprints `isc-12-default-chapter-test-short` / `-long` (Sections A–D, internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the CBSE 12 Chemistry builder adapted for ISC ids, the ISC blueprints and no default word limits), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-12-chemistry-ch01/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC syllabus, not NCERT)
- All five syllabus topics are covered: t01 types of solutions incl. solid solutions; t02 concentration terms — **normality** (with equivalent mass and N₁V₁ = N₂V₂) and **ppm** as well as molarity, molality and mole fraction; t03 Henry’s law, its applications and limitations; t04 Raoult’s law, ideal and non-ideal solutions, positive and negative deviation; t05 azeotropes with **boiling point–composition graphs and fractional distillation**.
- ISC keeps normality and the azeotrope/distillation treatment that the CBSE course no longer stresses; both have their own slides, notes and questions.
- Facts a reviewer may wish to double-check: Henry’s constants (He 144.97, N₂ 76.48, O₂ 34.86 kbar at 293 K; CO₂ 1.67 kbar at 298 K; Ar 40.3, CH₄ 41.9, C₂H₆ 30.6 kbar at 293 K in one MCQ); azeotropes ethanol–water (about 95% ethanol, about 351 K), HNO₃–water (about 68%, about 393.5 K), HCl–water (about 20%, about 383 K).

## Shape
- **Part 1 (t01–t03), 16 slides:** overview; types of solutions; percentages and ppm; mole fraction, molarity, molality; normality and equivalents; worked example (molality, mole fraction, ppm); worked example (24.5% H₂SO₄ → 3.0 M, 6.0 N, titration volume); gas solubility (diagram); Henry’s law; worked example (O₂ in aquarium water); daily-life applications; summary; exam tips; three checks.
- **Part 2 (t04–t05), 16 slides:** overview; Raoult’s law; ideal graph (plot); worked example (benzene–toluene vapour); non-volatile solutes and the link to Henry’s law; ideal vs non-ideal (two-column); deviation graph (plot); worked example (deciding the deviation from data); azeotropes; boiling point–composition diagram (plot); worked example (what distillation gives); summary; exam tips; three checks.
- Layouts: title 2, concept 9, two-column 1, diagram 4, example 6, check 6, summary 2, exam-tips 2. Visuals: table 17, flow 5, plot 3, svg 1 (Henry’s-law cylinders, reused from CBSE 12 ch01). Narration 14–76 words (mean 56), no symbols.

## Question bank (64)
| Type | Count | Marks |
|---|---|---|
| mcq | 23 | 1 (keys a 6, b 6, c 6, d 5; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys a b c b d) |
| true-false | 3 | 1 |
| fill-blank | 2 | 1 |
| match | 2 | 2 |
| numerical | 6 | 1 or 2 (0.8 N Na₂CO₃; 0.30 ppm lead; 2.02 mol kg⁻¹ KOH; 10 mL of 10 N acid; 0.567 mmol N₂; yA = 0.517) |
| short | 9 + 9 | 2 / 3 (calculations with full working, reasons, comparisons) |
| long | 5 | 5, set in parts with marks shown, e.g. [2] + [3] |

- No case-based items: the ISC pattern has none (long answers carry the stimulus or calculation instead).
- **Difficulty:** d1 15 · d2 32 · d3 16 · d4 1.
- **Competency:** recall 7 · understanding 21 · application 30 · analysis 6. Application or higher is **56% of items (61% of marks)**, matching the ISC aim of about half the marks on higher-order skills.
- **Topic tags:** t01 4 · t02 23 · t03 11 · t04 16 · t05 12.
- **Deck checks:** q005, q006, q028 (Part 1); q039, q040, q055 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC default blueprints)
- **Short (20 marks, 50 min):** A q008, q031, q043, q056 (MCQ), q015 (A-R) · B q021, (q035 or q046) · C q024, (q047 or q062) · D q027.
- **Long (40 marks, 100 min):** A q001, q007, q009, q010, q029, q030, q041, q042, q044, q057 (MCQ), q016, q050 (A-R) · B q022, q023, (q045 or q061) · C q025, q037, q048, (q049 or q063) · D q053, (q038 or q064).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVG passes the allow-list; narration has no symbols; check slides all objective; 6/6 scripted re-solves pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-chemistry.md`.

## Verifier pass (2026-10-30)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Arithmetic lint.** A long answer wrote a rounded quotient of two powers of ten with “=”; the factor is now computed from the partial pressures (1.0 ÷ 0.21 = 4.76).
2. **Ambiguous items.** A match item had a vague right-hand entry and an MCQ used a propanone–methanol mixture (not ideal) as an “ideal” example; both were rewritten (benzene–toluene; distinct, unambiguous match descriptions).
3. **Specific stems.** Short, generic stems (two match items and three MCQs) were rewritten to name this chapter’s liquids, gases or solutions, so they cannot collide with other chapters in the growing bank.
4. **Originality.** CBSE 12 ch01 (same subject matter) is in the bank, so every stem and data set here is new (different masses, constants and compositions); the originality gate reports 0 duplicates. No textbook, specimen-paper or past-paper wording; the ISC specimen paper defined the pattern only.

## Known gaps
- Narration audio is not generated (TTS stage).
- The SVG was reviewed by coordinates, not rasterised.
