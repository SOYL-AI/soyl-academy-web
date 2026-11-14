# ISC Class 11 Chemistry, Chapter 22 — Alkenes

`isc-11-chemistry-ch22` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (writer Sonnet 5.5 (claude-sonnet-5-5); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 18 slides), notes (7 sections), 32 flashcards, 67 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11chem_ch22_short` (20 marks, 50 min) and `t_isc11chem_ch22_long` (40 marks, 100 min), laid out exactly as the class-default blueprints `isc-11-default-chapter-test-short` / `-long` (four sections A–D as in the ISC 2027 specimens: objective items, 2-mark and 3-mark short answers, 5-mark long answers set in parts, with internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder with ISC 11 ids and blueprints and the assertion-reason options of the ISC 2027 Chemistry specimen; the pipeline’s verify checks, an answer-leak scan and an atom-balance check of equations with = or # bonds run inside the build), `decks.mjs`, `molkit.mjs`, `questions.mjs`, `study.mjs`, `svgs.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-11-chemistry-ch22/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC 2028 syllabus, Class XI portion)
- All 5 syllabus topics are covered: t01 Nomenclature, structure of the double bond (ethene) and isomerism; t02 Preparation: dehydration of alcohols, dehydrohalogenation of alkyl halides, from vicinal dihalides, Kolbe's method, from alkynes; Saytzeff's rule; t03 Physical properties of alkenes; t04 Addition of hydrogen, halogens, hydrogen halides, sulphuric acid and water; mechanism of electrophilic addition; Markownikoff's rule and peroxide (anti-Markownikoff) effect; t05 Oxidation (combustion, cold and hot alkaline KMnO4, ozonolysis); polymerisation; uses.
- Structure of the C=C bond (sp², σ and π), IUPAC names, structural and geometrical isomerism with the physical differences of cis and trans isomers, preparation (dehydration of alcohols, dehydrohalogenation with Saytzeff’s rule, dehalogenation with zinc, Kolbe electrolysis of succinate, partial reduction of alkynes with Lindlar’s catalyst or sodium in liquid ammonia), and reactions: hydrogenation, halogens, HX with Markownikoff’s rule and its mechanism, the peroxide effect, sulphuric acid and water, oxidation (Baeyer’s reagent, hot permanganate), ozonolysis, polymerisation and uses.
- Facts a reviewer may wish to double-check: Ethene: C=C 134 pm, H–C–H 117°, H–C=C 121.5°; π bond about 270 kJ mol⁻¹ against σ about 350 kJ mol⁻¹. H–X bond enthalpies HCl 431, HBr 366, HI 299 kJ mol⁻¹. but-2-ene: cis bp 3.7 °C, mp −138.9 °C, about 0.3 D; trans bp 0.9 °C, mp −105.5 °C. 1,2-Dichloroethene: cis 60.3 °C, 1.9 D; trans 47.5 °C, 0 D. Boiling points ethene −103.7, propene −47.4, but-1-ene −6.3, pent-1-ene 30.0, hex-1-ene 63.5 °C. Low-density polythene at 1000–2000 atm and 350–570 K with a trace of oxygen; high-density with a Ziegler–Natta catalyst. Isomer counts: 3 open-chain C₄H₈ alkenes, 5 C₅H₁₀ (structural).

## Shape
- **Part 1, 16 slides:** naming alkenes; structure of the double bond in ethene; isomerism in alkenes; preparation of alkenes: the main routes; dehydrohalogenation and Saytzeff's rule; worked example (applying Saytzeff's rule); dehydration of alcohols; other preparations: dihalides, Kolbe and alkynes; worked example (cis or trans?); physical properties of alkenes; summary; exam tips; 3 checks.
- **Part 2, 18 slides:** addition of hydrogen and halogens; addition of HX and Markownikoff's rule; mechanism: electrophilic addition of HBr to propene; stability of carbocations; peroxide effect: anti-Markownikoff addition of HBr; worked example (with and without peroxide); addition of sulphuric acid and water; oxidation: combustion and potassium permanganate; ozonolysis: predicting the products; worked example (finding an alkene from its bromine uptake); polymerisation; uses of alkenes; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 11 · diagram 7 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: chem 4 · svg 6 · table 18. SVGs: σ and π bonding in ethene, isomerism in alkenes, Saytzeff elimination, the electrophilic addition mechanism, the peroxide effect and ozonolysis; rendered and checked by eye. Narration 15–78 words (mean 58), no symbols, formulae or unit abbreviations.

## Question bank (67)
| Type | Count | Marks |
|---|---|---|
| mcq | 24 | 1 (keys a 6, b 6, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a c b d c b; options in the order of the ISC 2027 Chemistry specimen, with (d) both false) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 4 | 1–3 (2.24 L; 4; 4.4 g; 1500) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 10 | 3 |
| long | 6 | 5, set in parts |

- **Difficulty:** d1 10 · d2 36 · d3 20 · d4 1.
- **Competency:** recall 7 · understanding 24 · application 29 · analysis 7. Application or higher is **54% of items (65% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 11 · t02 14 · t03 7 · t04 18 · t05 18.
- **Deck checks:** q001, q007, q012 (Part 1); q014, q015, q022 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC 11 class-default blueprints)
- **Short (20 marks, 50 min):** A q004, q006, q017, q020, q025 · B q043, (q044 or q049) · C q052, (q053 or q055) · D q062.
- **Long (40 marks, 100 min):** A q002, q003, q005, q008, q009, q010, q011, q013, q016, q021, q027, q026 · B q045, q047, (q046 or q048) · C q054, q060, q056, (q057 or q059) · D q063, (q064 or q065).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (19 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 8/8 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean. Bonded-equation (= / #) balance check: 0 errors.
- Gates: see the handoff `docs/platform/handoffs/2026-11-09-subject-producer-isc11-chemistry.md`.

## Verifier pass (2026-11-14)
Every question and internal-choice alternative was re-solved from its stem by the writer; the producer (Claude Opus 5.5) then reviewed every item: the key and solution, the marking scheme, the competency tag (by what the item asks, not to move the share), the topic ids, the assertion-reason logic and the flagged facts. Findings and fixes:
1. Producer review (2026-11-14): all 67 items re-read; every name, Markownikoff and anti-Markownikoff product, Saytzeff product, ozonolysis deduction (2,3-dimethylbut-2-ene, 2-methylpent-2-ene, 3-methylhex-3-ene) and numerical (2.24 L, C₄H₈ from bromine uptake, 4.40 g, 1500 units, 16.8 L and 22.0 g, 3.6 g) confirmed.
2. Competency tags: four items that ask only for a standard equation or the standard reagents (ethene from ethanol, but-2-ene from 2,3-dibromobutane, Lindlar and Na/NH₃ for cis and trans hept-3-ene, and the Kolbe electrolysis of succinate) moved from application to understanding. Application or higher went from 60% to 54% of items.

## Known gaps
- Narration audio is not generated (TTS stage).

