# ISC Class 12 Chemistry, Chapter 6 — Activation Energy, Collision Theory and Arrhenius Equation

`isc-12-chemistry-ch06` · release v1 · academic year 2026-27 (ISC 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 14 slides), notes (4 sections), 31 flashcards, 64 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12chem_ch06_short` (20 marks, 50 min) and `t_isc12chem_ch06_long` (40 marks, 100 min), laid out exactly as the ISC default blueprints `isc-12-default-chapter-test-short` / `-long` (Sections A–D, internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the CBSE 12 Chemistry builder adapted for ISC ids, the ISC blueprints and no default word limits), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-12-chemistry-ch06/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC syllabus, not NCERT)
- All three syllabus topics are covered: t01 energy barrier, threshold energy, activation energy and the activated complex, **energy profiles of exothermic and endothermic reactions** and the effect of a catalyst; t02 collision theory (effective collisions, energy and orientation, elementary idea); t03 the Arrhenius equation, its log form, the **log k against 1/T plot**, evaluation of Ea and A, and numericals including two temperatures and the temperature coefficient.
- Removed topic respected: no mathematical treatment of collision theory (the rate expression P Z e^(−Ea/RT) is quoted, not derived).
- Rate laws, order and integrated equations stay in ch05.
- Facts a reviewer may wish to double-check: R = 8.314 J K⁻¹ mol⁻¹ throughout; the Maxwell–Boltzmann and Arrhenius plots are illustrative; activation energies quoted for named reactions are rounded teaching values.

## Shape
- **Part 1, 15 slides:** why reactions need a push; threshold and activation energy; exothermic profile (SVG); endothermic profile (SVG); worked example (reading an energy profile); effect of a catalyst; collision theory; orientation (SVG); worked example (effective collisions); effect of temperature on collisions (distribution plot); summary; exam tips; three checks.
- **Part 2, 14 slides:** the Arrhenius equation; log form and the Arrhenius plot; worked example (Ea and A from a plot); rate constants at two temperatures; worked example (Ea from two rate constants); worked example (a new rate constant); temperature coefficient; worked example (effect of a catalyst on k); summary; exam tips; three checks.
- Layouts: title 2 · concept 8 · diagram 3 · example 6 · check 6 · summary 2 · exam-tips 2. Visuals: flow 2 · plot 2 · svg 3 · table 16. Three SVGs (exothermic profile with catalysed path, endothermic profile, collision orientation) plus an energy-distribution plot and an Arrhenius plot. Narration 11–72 words (mean 54), no symbols, formulae or unit abbreviations.

## Question bank (64)
| Type | Count | Marks |
|---|---|---|
| mcq | 22 | 1 (keys a 6, b 6, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys a d a c b) |
| true-false | 4 | 1 |
| fill-blank | 2 | 1 |
| match | 2 | 2 |
| numerical | 8 | 1 or 2 (Ea 53.6 kJ mol⁻¹; k = 3.5 × 10⁻⁴ s⁻¹; A ≈ 334 s⁻¹; Ea 114.9 kJ mol⁻¹ from a slope of −6000 K; factor about 2342; T ≈ 307.6 K) |
| short (2 marks) | 8 | 2 |
| short (3 marks) | 8 | 3 (calculations with full working, reasons, comparisons, derivations) |
| long | 5 | 5, set in parts with marks shown, e.g. [2] + [3] |

- No case-based items: the ISC pattern has none (long answers carry the stimulus or calculation instead).
- **Difficulty:** d1 14 · d2 23 · d3 24 · d4 3.
- **Competency:** recall 4 · understanding 22 · application 28 · analysis 10. Application or higher is **59% of items (68% of marks)**, inside the 45–65% band and in line with the ISC aim of about half the marks on higher-order skills.
- **Topic tags:** t01 24 · t02 13 · t03 32.
- **Deck checks:** q001, q002, q023 (Part 1); q035, q036, q037 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC default blueprints)
- **Short (20 marks, 50 min):** A q003, q007, q024, q038, q010 · B q031, (q018 or q056) · C q057, (q020 or q061) · D q063.
- **Long (40 marks, 100 min):** A q004, q005, q006, q008, q009, q025, q026, q027, q039, q040, q011, q029 · B q017, q032, (q019 or q054) · C q058, q033, q059, (q060 or q062) · D q021, (q034 or q064).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 8/8 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-chemistry.md`.

## Verifier pass (2026-10-30)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Specific stems.** Every stem names its reaction or data set (nitrous oxide on gold, sucrose hydrolysis, named enzyme and catalyst cases, …) so that it stays unique in the shared bank.
2. **One verify flag fixed.** Deterministic verify first reported a minor numeric.final flag (the 114.9 kJ mol⁻¹ key was not computed by an "=" step); the solution now computes it directly. Rebuilt: validator, stage-4 lint and verify all clean.
3. **Originality.** CBSE 12 ch03 covers the Arrhenius equation; all data sets here are new and the originality gate reports 0 duplicates across 222 units.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

