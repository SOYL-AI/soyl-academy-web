# ISC Class 11 Chemistry, Chapter 21 — Alkanes

`isc-11-chemistry-ch21` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (writer Sonnet 5.5 (claude-sonnet-5-5); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 18 slides), notes (7 sections), 32 flashcards, 67 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11chem_ch21_short` (20 marks, 50 min) and `t_isc11chem_ch21_long` (40 marks, 100 min), laid out exactly as the class-default blueprints `isc-11-default-chapter-test-short` / `-long` (four sections A–D as in the ISC 2027 specimens: objective items, 2-mark and 3-mark short answers, 5-mark long answers set in parts, with internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder with ISC 11 ids and blueprints and the assertion-reason options of the ISC 2027 Chemistry specimen; the pipeline’s verify checks, an answer-leak scan and an atom-balance check of equations with = or # bonds run inside the build), `decks.mjs`, `molkit.mjs`, `questions.mjs`, `study.mjs`, `svgs.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-11-chemistry-ch21/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC 2028 syllabus, Class XI portion)
- All 5 syllabus topics are covered: t01 Classification of hydrocarbons; alkanes: nomenclature, isomerism and occurrence; t02 Conformations of methane and ethane: Sawhorse and Newman projections; t03 Preparation: decarboxylation and Kolbe's electrolysis of carboxylate salts; Wurtz reaction; Corey-House synthesis; from aldehydes and Grignard reagents; t04 Physical properties of alkanes and their trends; t05 Chemical properties: combustion, free-radical halogenation (mechanism), catalytic oxidation, cyclisation, aromatisation, isomerisation, pyrolysis; uses.
- Classification of hydrocarbons, the alkane homologous series, IUPAC names and chain isomers, occurrence, conformations of ethane (sawhorse and Newman projections, torsional strain and the 12.5 kJ mol⁻¹ barrier), preparation (decarboxylation, Kolbe electrolysis, Wurtz reaction, Corey–House synthesis, Grignard reagents with water, reduction of aldehydes), physical properties and their trends, and reactions: combustion, free-radical halogenation with relative rates, catalytic oxidation, cyclisation and aromatisation, isomerisation and pyrolysis.
- Facts a reviewer may wish to double-check: Torsional barrier of ethane 12.5 kJ mol⁻¹. Boiling points (°C): methane −161.5, ethane −88.6, propane −42.1, butane −0.5, pentane 36.1, hexane 68.7, heptane 98.4, octane 125.7, decane 174.1; 2-methylbutane 27.8, 2,2-dimethylpropane 9.5; 2-methylpentane 60.3, 2,3-dimethylbutane 58.0, 2,2-dimethylbutane 49.7. Densities (g mL⁻¹) pentane 0.63, hexane 0.66, octane 0.70, decane 0.73. Relative rates of chlorination per H, 1° : 2° : 3° = 1.0 : 3.8 : 5.0 (given in stems). Conditions: methanol from methane over Cu at 523 K and 100 atm; methanal with Mo₂O₃; aromatisation over Cr₂O₃/Al₂O₃ at 773 K and 10–20 atm; isomerisation with AlCl₃ and HCl at about 573 K.

## Shape
- **Part 1, 18 slides:** homologous series and the general formula; naming alkanes by IUPAC rules; chain isomerism: the isomers of pentane; worked example (naming a branched alkane); occurrence of alkanes; conformations: Sawhorse and Newman projections; why the staggered conformation is more stable; preparation of alkanes: the main routes; kolbe's electrolysis; wurtz reaction and Corey–House synthesis; worked example (choosing the Wurtz halide); from aldehydes and Grignard reagents; decarboxylation; summary; exam tips; 3 checks.
- **Part 2, 18 slides:** boiling point and chain length; branching lowers the boiling point; solubility and density; combustion; worked example (combustion of butane); halogenation: substitution by a free-radical chain; mechanism of the chlorination of methane; worked example (monochlorination of propane); catalytic oxidation; cyclisation and aromatisation; isomerisation and pyrolysis; uses of alkanes; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 11 · diagram 9 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: chem 5 · flow 2 · svg 8 · table 15. SVGs: the three pentanes, sawhorse and Newman projections of ethane, the torsional energy curve, Kolbe electrolysis, boiling point against chain length, branching against boiling point, the chlorination chain and cyclisation/aromatisation; rendered and checked by eye. Narration 12–75 words (mean 56), no symbols, formulae or unit abbreviations.

## Question bank (67)
| Type | Count | Marks |
|---|---|---|
| mcq | 24 | 1 (keys a 6, b 6, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a b c d b c; options in the order of the ISC 2027 Chemistry specimen, with (d) both false) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 4 | 1–3 (3 kJ; 5; 2.24 L; 71.7 %) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 10 | 3 |
| long | 6 | 5, set in parts |

- **Difficulty:** d1 15 · d2 33 · d3 18 · d4 1.
- **Competency:** recall 10 · understanding 23 · application 27 · analysis 7. Application or higher is **51% of items (64% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 7 · t02 11 · t03 18 · t04 9 · t05 22.
- **Deck checks:** q003, q006, q009 (Part 1); q015, q018, q020 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC 11 class-default blueprints)
- **Short (20 marks, 50 min):** A q004, q008, q012, q016, q025 · B q043, (q044 or q050) · C q052, (q056 or q057) · D q062.
- **Long (40 marks, 100 min):** A q001, q005, q007, q010, q011, q013, q014, q017, q019, q021, q026, q027 · B q047, q046, (q048 or q049) · C q053, q054, q055, (q058 or q059) · D q063, (q064 or q065).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (24 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 11/11 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean. Bonded-equation (= / #) balance check: 0 errors.
- Gates: see the handoff `docs/platform/handoffs/2026-11-09-subject-producer-isc11-chemistry.md`.

## Verifier pass (2026-11-14)
Every question and internal-choice alternative was re-solved from its stem by the writer; the producer (Claude Opus 5.5) then reviewed every item: the key and solution, the marking scheme, the competency tag (by what the item asks, not to move the share), the topic ids, the assertion-reason logic and the flagged facts. Findings and fixes:
1. Producer review (2026-11-14): all 67 items re-read; every IUPAC name, product prediction (soda lime, Kolbe, Wurtz, Corey–House, Clemmensen) and numerical re-solved (combustion volumes and masses, the hydrocarbon from its CO₂, monochlorination percentages 71.7% and 45.5%, RT = 2.48 kJ mol⁻¹, average boiling-point rise 29.9 °C).
2. Fix: a Grignard stem said the reagent was "treated with water in dry conditions followed by aqueous work-up" (self-contradictory); it is now poured into water.
3. Competency tags checked item by item; no changes. Application or higher is 51% of items.

## Known gaps
- Narration audio is not generated (TTS stage).

