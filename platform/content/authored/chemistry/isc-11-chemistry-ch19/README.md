# ISC Class 11 Chemistry, Chapter 19 — Purification and Analysis of Organic Compounds

`isc-11-chemistry-ch19` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (writer Sonnet 5.5 (claude-sonnet-5-5); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (19 + 18 slides), notes (7 sections), 32 flashcards, 70 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11chem_ch19_short` (20 marks, 50 min) and `t_isc11chem_ch19_long` (40 marks, 100 min), laid out exactly as the class-default blueprints `isc-11-default-chapter-test-short` / `-long` (four sections A–D as in the ISC 2027 specimens: objective items, 2-mark and 3-mark short answers, 5-mark long answers set in parts, with internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder with ISC 11 ids and blueprints and the assertion-reason options of the ISC 2027 Chemistry specimen; the pipeline’s verify checks, an answer-leak scan and an atom-balance check of equations with = or # bonds run inside the build), `data.mjs`, `decks.mjs`, `q1.mjs`, `q2.mjs`, `q3.mjs`, `questions.mjs`, `study.mjs`, `svgs.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-11-chemistry-ch19/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC 2028 syllabus, Class XI portion)
- All 4 syllabus topics are covered: t01 Methods of purification of organic compounds (overview); t02 Qualitative analysis: detection of carbon, hydrogen, nitrogen, halogens and sulphur; Lassaigne's test and its reactions; t03 Estimation of carbon and hydrogen (Liebig's method) and nitrogen (Kjeldahl's method), with experimental details; t04 Estimation of halogens, sulphur and phosphorus (Carius method).
- Purification (crystallisation, sublimation, differential extraction, simple, fractional, reduced-pressure and steam distillation, adsorption and partition chromatography with Rf), detection of C and H with copper(II) oxide, Lassaigne’s test for N, S, halogens and N with S, and estimation of C and H (Liebig), N (Kjeldahl, including back titration and its limits) and halogens, S and P (Carius).
- Facts a reviewer may wish to double-check: Molar masses CO₂ 44, H₂O 18, AgCl 143.5, AgBr 188, AgI 235, BaSO₄ 233, Mg₂P₂O₇ 222 (62 g P); %N = 1.4 × N × V ÷ m with N the normality (2 × molarity for H₂SO₄). Boiling points: ether 308 K, toluene 384 K, hexane 342 K, heptane 372 K, ethanol 351 K, propan-1-ol 370 K, glycerol 563 K. The deck takes about 40 K as the boiling-point gap for a clean simple distillation (a rule of thumb; textbooks give 25–40 K). Silver halides: AgCl white, dissolves in dilute ammonia; AgBr pale yellow, sparingly soluble; AgI yellow, insoluble.

## Shape
- **Part 1, 19 slides:** sublimation, crystallisation, extraction and column chromatography; choosing between the solid-based and solvent-based methods; fractional and steam distillation; the distillation family; worked example (choosing the method); chromatography and the R f value; adsorption and partition chromatography; detecting carbon and hydrogen; lassaigne’s test: the plan; reactions of the fusion; nitrogen: the Prussian blue test; sulphur, halogens, and nitrogen with sulphur; worked example (reading the observations); summary; exam tips; 3 checks.
- **Part 2, 18 slides:** liebig’s train; the chemistry in the combustion tube; worked example (carbon, hydrogen and oxygen); kjeldahl’s method; equations and the formula for nitrogen; where Kjeldahl’s method does not work; worked example (Kjeldahl with a back titration); the Carius method; formulas for halogens, sulphur and phosphorus; worked example (sulphur by the Carius method); phosphorus: from H₃PO₄ to Mg₂P₂O₇; which estimation for which element?; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 13 · diagram 7 · example 5 · check 6 · summary 2 · exam-tips 2. Visuals: chem 6 · flow 1 · svg 7 · table 17. SVGs: the four solid and solvent methods, fractional and steam distillation, chromatography with Rf, the Lassaigne plan, Liebig’s train, Kjeldahl’s apparatus and the Carius tube; rendered and checked by eye. Narration 11–67 words (mean 48), no symbols, formulae or unit abbreviations.

## Question bank (70)
| Type | Count | Marks |
|---|---|---|
| mcq | 25 | 1 (keys a 7, b 6, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys b d c a c b; options in the order of the ISC 2027 Chemistry specimen, with (d) both false) |
| true-false | 3 | 1 |
| fill-blank | 2 | 1 |
| match | 1 | 2 |
| numerical | 9 | 1–3 (45 %; 6 %; 0.733 g; 15 %; 0.52; 50 %; 32 %; 20 %; 0.861 g) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 10 | 3 |
| long | 5 | 5, set in parts |

- **Difficulty:** d1 14 · d2 33 · d3 21 · d4 2.
- **Competency:** recall 5 · understanding 31 · application 27 · analysis 7. Application or higher is **49% of items (61% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 23 · t02 19 · t03 16 · t04 12.
- **Deck checks:** q004, q056, q024 (Part 1); q045, q048, q061 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC 11 class-default blueprints)
- **Short (20 marks, 50 min):** A q001, q022, q040, q058, q013 · B q017, (q035 or q049) · C q020, (q038 or q052) · D q070.
- **Long (40 marks, 100 min):** A q005, q002, q007, q010, q023, q026, q028, q027, q043, q057, q030, q012 · B q018, q019, (q036 or q050) · C q021, q037, q051, (q067 or q066) · D q068, (q069 or q055).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (5 diagram self-checks (geometry and molar masses computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 19/19 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean. Bonded-equation (= / #) balance check: 0 errors.
- Gates: see the handoff `docs/platform/handoffs/2026-11-09-subject-producer-isc11-chemistry.md`.

## Verifier pass (2026-11-14)
Every question and internal-choice alternative was re-solved from its stem by the writer; the producer (Claude Opus 5.5) then reviewed every item: the key and solution, the marking scheme, the competency tag (by what the item asks, not to move the share), the topic ids, the assertion-reason logic and the flagged facts. Findings and fixes:
1. Second producer review (2026-11-14): all 70 items re-read and every numerical re-solved (Liebig percentages and empirical formulae, Kjeldahl direct and back titrations, Carius percentages for Cl, Br, S and P, Rf).
2. Error fixed: the Liebig long item stated 0.2100 g of compound giving 0.6600 g CO₂ and 0.2700 g H₂O, but its model answer worked a different sample (0.1250 g, 84.0% C, 14.0% H). The model answer is now computed from the stated data: 85.7% C and 14.3% H, total 100.0%, empirical formula CH₂.
3. Data made realistic: a Carius phosphorus item gave 50% P for an organic compound; the sample mass is now 0.4960 g (25.0% P). A Kjeldahl back-titration item called a compound with 49% N an amide (urea, the richest common amide, has 46.7%); it is now a nitrogen-rich fertiliser additive.
4. Competency tags checked item by item; no changes. Application or higher is 49% of items.

## Known gaps
- Narration audio is not generated (TTS stage).

