# ISC Class 12 Chemistry, Chapter 5 — Rate of Reaction and Rate Laws

`isc-12-chemistry-ch05` · release v1 · academic year 2026-27 (ISC 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 17 slides), notes (6 sections), 31 flashcards, 61 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12chem_ch05_short` (20 marks, 50 min) and `t_isc12chem_ch05_long` (40 marks, 100 min), laid out exactly as the ISC default blueprints `isc-12-default-chapter-test-short` / `-long` (Sections A–D, internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the CBSE 12 Chemistry builder adapted for ISC ids, the ISC blueprints and no default word limits), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-12-chemistry-ch05/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC syllabus, not NCERT)
- All six syllabus topics are covered: t01 scope of kinetics, **slow and fast reactions explained by bonds**, average and instantaneous rate (graphical); t02 factors affecting rate including **radiation**, and the **law of mass action and active mass**; t03 rate law, rate constant, order as an experimental quantity, units of k; t04 zero-order reactions; t05 first-order reactions with the **derivation** of the integrated equation and half-life, and independence of k from initial concentration; t06 molecularity, elementary and complex reactions, mechanism and the rate-determining step.
- Removed topic respected: no integrated rate equations for orders other than zero and first (second-order items use rate laws and initial rates only).
- Activation energy, collision theory and the Arrhenius equation are left to ch06, as in the syllabus.
- Facts a reviewer may wish to double-check: N₂O₅ in CCl₄ at 318 K taken as first order with k = 6.2 × 10⁻⁴ s⁻¹; H₂ + Br₂ rate law k[H₂][Br₂]^½; NO₂ + CO at low temperature second order in NO₂; ³²P half-life 14.3 days; the plots are illustrative.

## Shape
- **Part 1, 17 slides:** slow and fast reactions; rate of reaction; average and instantaneous rate (tangent plot); rate in terms of each species; worked example (N₂O₅ rates); factors including radiation; law of mass action and active mass; rate law, k and order; units of k; worked example (method of initial rates, k = 0.60 L² mol⁻² min⁻¹); worked example (new rate ×4.5); summary; exam tips; three checks.
- **Part 2, 17 slides:** zero order and its graph (plot); worked example (zero order: 0.10 M, 6.0 min, 12 min); first-order derivation (log plot); first-order decay (plot); half-life; worked example (k = 0.0577 min⁻¹: 12.0 and 39.9 min); worked example (antibiotic, 5 h half-life); molecularity vs order; mechanism and rate-determining step; worked example (rate law for 2NO + Br₂ from a pre-equilibrium); summary; exam tips; three checks.
- Layouts: title 2 · concept 11 · two-column 1 · diagram 3 · example 7 · check 6 · summary 2 · exam-tips 2. Visuals: flow 4 · plot 4 · table 20. No SVGs: the visuals are four illustrative plots, tables and flows. Narration 15–78 words (mean 52), no symbols, formulae or unit abbreviations.

## Question bank (61)
| Type | Count | Marks |
|---|---|---|
| mcq | 22 | 1 (keys a 6, b 6, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys d a b a c) |
| true-false | 4 | 1 |
| fill-blank | 2 | 1 |
| match | 2 | 2 |
| numerical | 5 | 1 or 2 (0.012 mol L⁻¹ min⁻¹; k = 0.030 L mol⁻¹ s⁻¹; 12 min; 600 s; 15.1 mg L⁻¹) |
| short (2 marks) | 8 | 2 |
| short (3 marks) | 8 | 3 (calculations with full working, reasons, comparisons, derivations) |
| long | 5 | 5, set in parts with marks shown, e.g. [2] + [3] |

- No case-based items: the ISC pattern has none (long answers carry the stimulus or calculation instead).
- **Difficulty:** d1 12 · d2 31 · d3 16 · d4 2.
- **Competency:** recall 3 · understanding 24 · application 26 · analysis 8. Application or higher is **56% of items (62% of marks)**, inside the 45–65% band and in line with the ISC aim of about half the marks on higher-order skills.
- **Topic tags:** t01 8 · t02 8 · t03 15 · t04 9 · t05 16 · t06 10.
- **Deck checks:** q001, q016, q017 (Part 1); q030, q037, q052 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC default blueprints)
- **Short (20 marks, 50 min):** A q002, q009, q019, q038, q021 · B q006, (q035 or q046) · C q027, (q047 or q060) · D q050.
- **Long (40 marks, 100 min):** A q003, q008, q010, q011, q018, q020, q031, q039, q040, q053, q012, q042 · B q026, q045, (q059 or q013) · C q014, q028, q048, (q036 or q049) · D q029, (q061 or q051).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 5/5 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-chemistry.md`.

## Verifier pass (2026-10-30)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Specific stems.** Every stem names its reaction or situation (N₂O₅, SO₂Cl₂, ³²P, NO + O₃, sucrose inversion, ammonia on platinum, …) so that it stays unique in the shared bank.
2. **First build clean.** Validator, stage-4 lint and deterministic verify reported no findings on the first build; every numerical and every derivation step was re-checked by hand.
3. **Originality.** CBSE 12 ch03 covers similar ground; all data sets here are new and the originality gate reports 0 duplicates.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

