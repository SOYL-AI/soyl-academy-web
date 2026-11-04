# CBSE Class 11 Chemistry, Chapter 6 — Equilibrium

`cbse-11-chemistry-ch06` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (20 + 21 slides), notes (6 sections), 30 flashcards, 70 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11chem_ch06_short` (20 marks, 40 min) and `t_cbse11chem_ch06_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-11-default-chapter-test-short` / `-long` (the subject has only annual and half-yearly blueprints). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the CBSE 12 Chemistry builder with CBSE 11 ids and blueprints; the pipeline’s verify checks and an answer-leak scan run inside the build), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/cbse-11-chemistry-ch06/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 rationalised syllabus)
- All 5 syllabus topics are covered: t01 Equilibrium in physical and chemical processes; t02 Law of mass action; Kc and Kp; t03 Le Chatelier's principle; t04 Ionic equilibrium: acids, bases, pH, buffers; t05 Solubility product.

- Facts a reviewer may wish to double-check: Kw 1.0 × 10⁻¹⁴ at 298 K; Ka (ethanoic acid 1.8 × 10⁻⁵, HCN 4.9 × 10⁻¹⁰, HF 3.5 × 10⁻⁴, methanoic acid 1.8 × 10⁻⁴); Kb of ammonia 1.8 × 10⁻⁵; Ksp (AgCl 1.8 × 10⁻¹⁰, BaSO₄ 1.1 × 10⁻¹⁰, Ag₂CrO₄ 1.1 × 10⁻¹²); typical pH values on the scale are approximate. Equilibrium constants for PCl₅, ammonia synthesis, HI, N₂O₄ and the water-gas reaction are labelled given (the water-gas Kc of 9.0 is illustrative, stated at an unspecified temperature).

## Shape
- **Part 1, 20 slides:** physical equilibria; dynamic nature of chemical equilibrium; approach to equilibrium; law of mass action and Kc; kp and the relation Kp = Kc(RT)^Δn; worked example (Kc and Kp); changing the equation changes K; reaction quotient Q and direction; worked example (predicting direction); iCE tables: finding equilibrium concentrations; worked example (ICE table); le Chatelier’s principle: concentration, pressure, temperature; catalyst and inert gas; worked example (the Haber process); summary; exam tips; 3 checks.
- **Part 2, 21 slides:** acids and bases: three definitions; conjugate acid–base pairs and amphoteric species; weak acids: Ka and degree of ionisation; worked example (pH of a weak acid); weak bases, Kw and pH; the pH scale; worked example (pH of a strong base); common ion effect; salt hydrolysis; worked example (pH of a salt solution); buffer solutions and the Henderson equation; worked example (a buffer at work); solubility product; worked example (solubility and precipitation); predicting precipitation; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 17 · diagram 3 · example 9 · check 6 · summary 2 · exam-tips 2. Visuals: flow 2 · svg 3 · table 30. Three SVGs (concentration and rate against time approaching equilibrium, computed from first-order kinetics with K = kf/kr; a pH scale; Q against K on a log axis), 9 self-checks. Narration 11–76 words (mean 56), no symbols, formulae or unit abbreviations.

## Question bank (70)
| Type | Count | Marks |
|---|---|---|
| mcq | 24 | 1 (keys a 6, b 6, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a b c c a d) |
| true-false | 3 | 1 |
| fill-blank | 4 | 1 |
| match | 3 | 2 |
| numerical | 9 | 1–3 (2.67 L² mol⁻²; 0.0000347 bar⁻²; 17.999999999999996; 0.75 mol L⁻¹; 5.15; 11.28; 4.44; 0.000065 mol L⁻¹; 9e-7 mol L⁻¹) |
| short (2 marks) | 7 | 2 (30–50 words) |
| short (3 marks) | 5 | 3 (50–80 words) |
| long | 5 | 5 (80–120 words) |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 14 · d2 28 · d3 24 · d4 4.
- **Competency:** recall 4 · understanding 22 · application 37 · analysis 7. Application or higher is **63% of items (69% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 7 · t02 14 · t03 9 · t04 31 · t05 11.
- **Deck checks:** q001, q006, q019 (Part 1); q026, q027, q056 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 11 class-default blueprints)
- **Short (20 marks, 40 min):** A q002, q033, q057, q038 · B q013, q045, q018 · C (q025 or q024) · D q066.
- **Long (40 marks, 90 min):** A q007, q009, q021, q028, q031, q032, q034, q035, q010, q036 · B q012, q023, (q044 or q060), q050, (q051 or q063) · C q052, (q053 or q064) · D q054, q055.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (9 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 23/23 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-02-subject-producer-cbse11-chemistry.md`.

## Verifier pass (2026-11-02)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet); the producer re-checked the pH, buffer and solubility results (for example 0.10 M ethanoic acid pH 2.87, 0.10 M sodium ethanoate pH 8.87, AgCl solubility 1.34 × 10⁻⁵ M).
2. **Fixes.** The writer added decimal forms to small answers, used ≈ between rounded values, lengthened model answers and brought application or higher from 67 % to 63 %. The producer removed “at 1000 K” from the illustrative water-gas Kc, since the real value there is near 1.
3. **Every numerical (Kc, Kp, ICE tables, pH, degree of ionisation, buffers, Ksp) is computed and asserted.**

## Known gaps
- Narration audio is not generated (TTS stage).

