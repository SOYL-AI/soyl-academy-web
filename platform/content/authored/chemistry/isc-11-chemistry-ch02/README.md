# ISC Class 11 Chemistry, Chapter 2 — Mole Concept, Concentration and Stoichiometry

`isc-11-chemistry-ch02` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (writer Sonnet 5.5 (claude-sonnet-5-5); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 17 slides), notes (6 sections), 32 flashcards, 69 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11chem_ch02_short` (20 marks, 50 min) and `t_isc11chem_ch02_long` (40 marks, 100 min), laid out exactly as the class-default blueprints `isc-11-default-chapter-test-short` / `-long` (four sections A–D as in the ISC 2027 specimens: objective items, 2-mark and 3-mark short answers, 5-mark long answers set in parts, with internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder with ISC 11 ids and blueprints and the assertion-reason options of the ISC 2027 Chemistry specimen; the pipeline’s verify checks, an answer-leak scan and an atom-balance check of equations with = or # bonds run inside the build), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-11-chemistry-ch02/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC 2028 syllabus, Class XI portion)
- All 5 syllabus topics are covered: t01 Atomic (isotopic) and molecular masses; atomic mass unit as 1/12 of the mass of carbon-12; mole, Avogadro's number and gram molecular volume; t02 Percentage composition; empirical and molecular formulae; t03 Chemical equivalents: equivalent weight, variable equivalent weight, gram equivalent; relation with molar mass and valency; equivalent weights of acids, bases, salts, oxidising and reducing agents; t04 Concentration terms: percentage (w/w, w/v), normality, molarity, molality, mole fraction; normality and molarity equations; t05 Stoichiometric calculations: mass-mass, mass-volume and volume-volume relationships; limiting reagent.
- ISC-specific content: chemical equivalents (equivalent weight of acids, bases, salts, oxidising and reducing agents, variable equivalent weight, E = M / n-factor), normality and N₁V₁ = N₂V₂ alongside molarity, molality, mole fraction and percentage concentrations. The removed topic (experimental determination of equivalent weights) is not taught.
- Facts a reviewer may wish to double-check: N_A = 6.022 × 10²³ mol⁻¹; 22.4 L at STP; 1 u ≈ 1.66 × 10⁻²⁷ kg. Isotopes: Li-6 6.015 u (7.5 %), Li-7 7.016 u (92.5 %), average 6.94 u. Equivalent weights: H₃PO₄ 98 / 49 / 32.7; KMnO₄ 31.6 (acid, to Mn²⁺), 52.7 (neutral, to MnO₂), 158 (alkaline, to MnO₄²⁻); K₂Cr₂O₇ 49; Al₂(SO₄)₃ 57; Ca(OH)₂ 37. Constructed analyses (80.0 % C / 20.0 % H with vapour density 15; 54.5 % C / 9.1 % H / 36.4 % O with M 88; Na 43.4 % / C 11.3 % / O 45.3 %) are labelled as given data.

## Shape
- **Part 1, 17 slides:** atomic and molecular masses; the mole, Avogadro constant and molar volume; worked example (mole conversions); percentage composition and empirical formula; worked example (empirical formula); worked example (molecular formula); chemical equivalents; molar mass versus equivalent weight; variable equivalent weight and gram equivalents; worked example (equivalent weights); worked example (gram equivalents and valency); summary; exam tips; 3 checks.
- **Part 2, 17 slides:** concentration terms; what goes in the denominator; worked example (molality, mole fraction and molarity); normality and the volumetric equations; worked example (neutralisation); worked example (concentrated acid label and dilution); stoichiometry: mass, volume and moles; worked example (mass to volume); worked example (mass to mass and volume); limiting reagent; worked example (limiting reagent); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 6 · diagram 5 · example 11 · check 6 · summary 2 · exam-tips 2. Visuals: flow 2 · svg 5 · table 21. SVGs: the mole hub, molar mass against equivalent weight bars, the concentration-denominator beaker, the N₁V₁ = N₂V₂ titration and limiting-reagent bars; all rendered and checked by eye. Narration 42–69 words (mean 57), no symbols, formulae or unit abbreviations.

## Question bank (69)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 | 1 (keys a 7, b 7, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a c d a b c; options in the order of the ISC 2027 Chemistry specimen, with (d) both false) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 4 | 1–3 (43.9 g mol⁻¹; 38.7 %; 0.2 N; 8 g) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 10 | 3 |
| long | 6 | 5, set in parts |

- **Difficulty:** d1 8 · d2 34 · d3 24 · d4 3.
- **Competency:** recall 6 · understanding 23 · application 35 · analysis 5. Application or higher is **58% of items (72% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 14 · t02 10 · t03 15 · t04 16 · t05 14.
- **Deck checks:** q001, q015, q025 (Part 1); q040, q056, q057 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC 11 class-default blueprints)
- **Short (20 marks, 50 min):** A q002, q017, q026, q044, q061 · B q011, (q036 or q049) · C q023, (q052 or q067) · D q069.
- **Long (40 marks, 100 min):** A q003, q005, q016, q018, q027, q028, q041, q042, q058, q060, q031, q045 · B q012, q021, (q035 or q050) · C q013, q022, q037, (q051 or q068) · D q039, (q054 or q055).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (9 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 51/51 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean. Bonded-equation (= / #) balance check: 0 errors.
- Gates: see the handoff `docs/platform/handoffs/2026-11-09-subject-producer-isc11-chemistry.md`.

## Verifier pass (2026-11-09)
Every question and internal-choice alternative was re-solved from its stem by the writer; the producer (Claude Opus 5.5) reviewed the assertion-reason items, the objective keys, the flagged facts, the competency tags and the numericals. Findings and fixes:
1. Competency tags: the writer moved 13 single-formula items from application to understanding after the first build. The producer re-judged all 13: twelve are one-formula substitutions with the data given (molarity, normality, dilution, percentage composition, density to molar mass), honestly understanding; the equivalent weight of aluminium sulfate needs the n-factor of a salt worked out first and was restored to application.
2. Two solutions named the distractor 'mole fraction of water' and 'using ammonia as limiting' with a placeholder for a non-existent fifth option; corrected to the letters actually placed.
3. Writer fixes: an unbalanced $ in a solution, a floating-point key (8.000000000000001) rounded, and an exact stem collision with an ICSE 10 item reworded.

## Known gaps
- Narration audio is not generated (TTS stage).

