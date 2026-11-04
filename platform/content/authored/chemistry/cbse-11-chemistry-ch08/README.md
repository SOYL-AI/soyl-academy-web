# CBSE Class 11 Chemistry, Chapter 8 — Organic Chemistry: Some Basic Principles and Techniques

`cbse-11-chemistry-ch08` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (writer Claude Sonnet 5.5 (Agent tool, model sonnet); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (22 + 24 slides), notes (7 sections), 31 flashcards, 68 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11chem_ch08_short` (20 marks, 40 min) and `t_cbse11chem_ch08_long` (40 marks, 90 min), laid out exactly as the class-default blueprints `cbse-11-default-chapter-test-short` / `-long` (the subject has only annual and half-yearly blueprints). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the CBSE 12 Chemistry builder with CBSE 11 ids and blueprints; the pipeline’s verify checks and an answer-leak scan run inside the build), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/cbse-11-chemistry-ch08/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (CBSE 2026–27 rationalised syllabus)
- All 5 syllabus topics are covered: t01 Tetravalence of carbon; structural representations; t02 Classification and IUPAC nomenclature; t03 Isomerism; t04 Electronic displacements: inductive, electromeric, resonance, hyperconjugation; t05 Types of organic reactions; purification and analysis.

- Facts a reviewer may wish to double-check: Bond lengths C–C 154, C=C 134, C≡C 120, benzene 139 pm; boiling points of the pentane isomers (309, 301, 283 K) and of chloroform, aniline, acetone and methanol; approximate pKa of ethanoic, chloroethanoic and trichloroethanoic acids; Lassaigne colours (Prussian blue, black PbS or violet nitroprusside, blood-red thiocyanate, silver halide colours); quantitative factors (12/44, 2/18, Dumas 28/22 400, Kjeldahl 1.4 N V/m, Carius 80/188 and 32/233, 62/222 for phosphorus); Kjeldahl not applicable to nitro, azo and ring nitrogen. TLC and analysis data are labelled illustrative.

## Shape
- **Part 1, 22 slides:** tetravalence and hybridisation; shapes at carbon; four ways to write a structure; bond-line structures; worked example (formula from a bond-line drawing); classification of organic compounds; functional groups; iUPAC naming: the basic rules; worked example (naming branched compounds); functional group priority; worked example (compounds with two groups); rings and aromatic compounds; isomerism: same formula, different compounds; chain isomers of C₅H₁₂; worked example (isomers of C₄H₁₀O); stereoisomerism (introduction); summary; exam tips; 3 checks.
- **Part 2, 24 slides:** fission of a covalent bond; curved arrows show electron movement; reaction intermediates; stability of carbocations; electrophiles and nucleophiles; inductive effect; resonance; resonance: rules and effects; four electronic effects compared; types of organic reactions; purifying organic compounds; simple distillation; chromatography and the Rf value; worked example (Rf values); lassaigne's test: nitrogen, sulfur and halogens; quantitative analysis: formulas; kjeldahl and Dumas methods; worked example (percentage composition); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 17 · diagram 11 · example 6 · check 6 · summary 2 · exam-tips 2. Visuals: flow 1 · svg 11 · table 28. Eleven SVGs drawn from atom-and-bond graphs with the molecular formula of each picture self-checked (wedge-dash methane, ethene and ethyne; bond-line structures; C₅H₁₂ isomers; cis-trans and enantiomers; bond fission; carbocation stability; inductive effect; resonance; distillation; TLC plate with Rf; Kjeldahl and Dumas flows). Narration 10–75 words (mean 57), no symbols, formulae or unit abbreviations.

## Question bank (68)
| Type | Count | Marks |
|---|---|---|
| mcq | 23 | 1 (keys a 6, b 6, c 6, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a b c d a c) |
| true-false | 4 | 1 |
| fill-blank | 3 | 1 |
| match | 3 | 2 |
| numerical | 8 | 1–3 (40 %; 14.3 %; 16.7 %; 32 %; 53.3 %; 32 %; 4.2 cm; 8) |
| short (2 marks) | 7 | 2 (30–50 words) |
| short (3 marks) | 5 | 3 (50–80 words) |
| long | 5 | 5 (80–120 words) |
| case-based | 4 | 4 (parts 1 + 1 + 2, part (c) with an internal choice) |

- **Difficulty:** d1 14 · d2 29 · d3 24 · d4 1.
- **Competency:** recall 8 · understanding 24 · application 28 · analysis 8. Application or higher is **53% of items (55% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 7 · t02 8 · t03 8 · t04 18 · t05 28.
- **Deck checks:** q001, q008, q015 (Part 1); q023, q024, q048 (Part 2) — all objective, none used in the tests.

## Chapter tests (CBSE 11 class-default blueprints)
- **Short (20 marks, 40 min):** A q002, q009, q022, q003 · B q034, q054, q012 · C (q013 or q021) · D q066.
- **Long (40 marks, 90 min):** A q010, q016, q017, q018, q025, q026, q044, q043, q029, q030 · B q006, q035, (q036 or q053), q020, (q037 or q038) · C q039, (q056 or q057) · D q067, q068.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (19 diagram self-checks (geometry and formulas computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 11/11 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean.
- Gates: see the handoff `docs/platform/handoffs/2026-11-02-subject-producer-cbse11-chemistry.md`.

## Verifier pass (2026-11-02)
Every question, case part and internal-choice alternative was re-solved from its stem by the writer; the producer reviewed facts, scope, diagrams and numericals. Findings and fixes:
1. **Authoring.** Written by a Sonnet 5.5 writer (sub-agent spawned with model sonnet), who rendered every SVG and fixed label overlaps; the producer reviewed names, analysis factors and the Lassaigne observations.
2. **Fixes by the writer.** An unclosed math delimiter in a numerical solution, two model answers outside their word limits and a duplicated short question were corrected.
3. **Originality gate.** The generic stem of the reaction-type match item duplicated the ch07 one; the producer named the reactions in both stems.
4. **Every percentage-composition and Rf numerical is computed and asserted.** Topic tags lean towards electronic effects and analysis (t04, t05), in line with the syllabus weight of those outcomes.

## Known gaps
- Narration audio is not generated (TTS stage).

