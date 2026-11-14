# ISC Class 11 Chemistry, Chapter 23 — Alkynes

`isc-11-chemistry-ch23` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (writer Sonnet 5.5 (claude-sonnet-5-5); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 17 slides), notes (7 sections), 32 flashcards, 65 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11chem_ch23_short` (20 marks, 50 min) and `t_isc11chem_ch23_long` (40 marks, 100 min), laid out exactly as the class-default blueprints `isc-11-default-chapter-test-short` / `-long` (four sections A–D as in the ISC 2027 specimens: objective items, 2-mark and 3-mark short answers, 5-mark long answers set in parts, with internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder with ISC 11 ids and blueprints and the assertion-reason options of the ISC 2027 Chemistry specimen; the pipeline’s verify checks, an answer-leak scan and an atom-balance check of equations with = or # bonds run inside the build), `decks.mjs`, `molkit.mjs`, `questions.mjs`, `study.mjs`, `svgs.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-11-chemistry-ch23/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC 2028 syllabus, Class XI portion)
- All 5 syllabus topics are covered: t01 Nomenclature and structure of the triple bond (ethyne); t02 Preparation: ethyne from calcium carbide and natural gas; dehydrohalogenation; Kolbe's method; physical properties; t03 Acidic character of terminal alkynes and formation of acetylides; t04 Addition of hydrogen, halogens, hydrogen halides and water; oxidation and ozonolysis; polymerisation; uses; t05 Distinguishing tests between alkanes, alkenes and alkynes.
- Structure of the C≡C bond (sp, one σ and two π, linear), IUPAC names and isomerism (position and chain, no cis–trans), physical properties, preparation (calcium carbide, methane in an electric arc, double dehydrohalogenation of vicinal and geminal dihalides, Kolbe electrolysis of maleate and fumarate), the acidity of terminal alkynes and acetylides (Na, NaNH₂, ammoniacal AgNO₃ and Cu₂Cl₂), and reactions: hydrogenation (Ni, Lindlar, Na/NH₃), halogens and HX twice (Markownikoff), hydration to carbonyl compounds via the enol, oxidation and ozonolysis, cyclic polymerisation, uses and the tests that tell ethane, ethene and ethyne apart.
- Facts a reviewer may wish to double-check: Ethyne: C≡C 120 pm, C–H 106 pm, 180°. Average bond enthalpies C–C 347, C=C 611, C≡C 837 kJ mol⁻¹ (so the second π bond, 226, is weaker than the first, 264). s character 25, 33.3 and 50%; approximate pKa ethane 50, ethene 44, ethyne 25, water 15.7. Boiling points (°C): ethyne −84 (sublimes), propyne −23.2, but-1-yne 8.1, but-2-yne 27.0, pent-1-yne 40.2, hex-1-yne 71.3. Carbon content 80.0, 85.7 and 92.3% for ethane, ethene and ethyne; enthalpies of combustion about 1560, 1411 and 1300 kJ mol⁻¹. Carbide furnace about 2273 K; methane arc about 1773 K; trimerisation over red-hot iron at about 873 K; oxy-acetylene flame about 3000 °C.

## Shape
- **Part 1, 18 slides:** naming alkynes; structure of the triple bond in ethyne; isomerism in alkynes; physical properties of alkynes; preparation of alkynes: the main routes; ethyne from calcium carbide; worked example (ethyne from carbide); natural gas, dihalides and Kolbe electrolysis; kolbe's electrolysis of potassium fumarate; why terminal alkynes are acidic; formation of acetylides; worked example (which alkynes form acetylides?); summary; exam tips; 3 checks.
- **Part 2, 17 slides:** addition of hydrogen; addition of halogens; addition of hydrogen halides: Markownikoff's rule twice; addition of water: hydration; worked example (predicting the hydration product); oxidation: combustion and potassium permanganate; ozonolysis of alkynes; polymerisation of ethyne; uses of alkynes and the flame test; distinguishing ethane, ethene and ethyne; worked example (analysing a gas mixture); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 11 · diagram 8 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: chem 2 · flow 1 · svg 6 · table 20. SVGs: σ and π bonding in ethyne, ethyne from calcium carbide, the s character and acidity ladder, hydrogenation (Ni, Lindlar, Na/NH₃), hydration through the enol and cyclic polymerisation; rendered and checked by eye. Narration 15–90 words (mean 63), no symbols, formulae or unit abbreviations.

## Question bank (65)
| Type | Count | Marks |
|---|---|---|
| mcq | 23 | 1 (keys a 6, b 6, c 6, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a b c d c b; options in the order of the ISC 2027 Chemistry specimen, with (d) both false) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 3 | 1–3 (4.48 L; 51.9 g; 20 mL) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 10 | 3 |
| long | 6 | 5, set in parts |

- **Difficulty:** d1 7 · d2 34 · d3 23 · d4 1.
- **Competency:** recall 4 · understanding 24 · application 26 · analysis 11. Application or higher is **57% of items (68% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 12 · t02 13 · t03 14 · t04 25 · t05 7.
- **Deck checks:** q001, q006, q011 (Part 1); q015, q016, q022 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC 11 class-default blueprints)
- **Short (20 marks, 50 min):** A q002, q008, q013, q018, q026 · B q041, (q046 or q044) · C q051, (q052 or q053) · D q060.
- **Long (40 marks, 100 min):** A q003, q004, q005, q007, q009, q010, q012, q014, q017, q020, q024, q027 · B q043, q045, (q047 or q049) · C q050, q055, q056, (q058 or q054) · D q061, (q063 or q065).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (26 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 7/7 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean. Bonded-equation (= / #) balance check: 0 errors.
- Gates: see the handoff `docs/platform/handoffs/2026-11-09-subject-producer-isc11-chemistry.md`.

## Verifier pass (2026-11-14)
Every question and internal-choice alternative was re-solved from its stem by the writer; the producer (Claude Opus 5.5) then reviewed every item: the key and solution, the marking scheme, the competency tag (by what the item asks, not to move the share), the topic ids, the assertion-reason logic and the flagged facts. Findings and fixes:
1. Producer review (2026-11-14): all 65 items re-read; names, σ/π counts, product predictions (geminal dihalides, hydration products, permanganate cleavage, 1,3,5-trimethylbenzene) and numericals (4.48 L, 51.9 g, 20.0 mL, 7.00 L and 11.0 g, 2.24 L) confirmed.
2. Fix: the solution of the hex-3-yne hydration MCQ wrote the enol with seven carbons; it is now CH₃CH₂CH=C(OH)CH₂CH₃.
3. Competency tags: three items that ask for a standard equation or a recalled fact (propyne from 1,2-dibromopropane, the Kolbe electrolysis of maleate, the garlic smell of carbide ethyne) moved from application to understanding. Application or higher went from 62% to 57% of items.

## Known gaps
- Narration audio is not generated (TTS stage).

