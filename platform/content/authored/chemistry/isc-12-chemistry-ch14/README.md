# ISC Class 12 Chemistry, Chapter 14 — Alcohols

`isc-12-chemistry-ch14` · release v1 · academic year 2026-27 (ISC 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 16 slides), notes (6 sections), 31 flashcards, 71 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12chem_ch14_short` (20 marks, 50 min) and `t_isc12chem_ch14_long` (40 marks, 100 min), laid out exactly as the ISC default blueprints `isc-12-default-chapter-test-short` / `-long` (Sections A–D, internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the CBSE 12 Chemistry builder adapted for ISC ids, the ISC blueprints and no default word limits), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-12-chemistry-ch14/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC syllabus, not NCERT)
- All six syllabus topics are covered: t01 classification (mono-, di-, trihydric; 1°, 2°, 3°), general formula, structure and nomenclature, with physical properties; t02 preparation by direct and indirect hydration, hydroboration–oxidation, Grignard reagents, hydrolysis of alkyl halides, reduction of carbonyl compounds and from primary amines; t03 outline of the manufacture of methanol (Bosch) and ethanol (fermentation), equations only; t04 acidic nature, reactions with Na, HX, PCl₃, PCl₅, SOCl₂, acid chlorides and anhydrides, and esterification with mechanism; t05 oxidation and dehydration with mechanism; t06 ascent and descent of the series, the Lucas test and uses of methanol and ethanol.
- Removed topics respected: industrial manufacture is given in outline only, and secondary and tertiary alcohols appear only for identification (oxidation behaviour, Lucas test, dehydration ease), not for their own chemistry.
- Facts a reviewer may wish to double-check: Boiling points (butan-1-ol 391 K, 2-methylpropan-2-ol 356 K, pentane 309 K, ethoxyethane 308 K) and pKa values of alcohols are rounded literature values; Bosch conditions 573–673 K and 200–300 atm; dehydration temperatures 443 K (ethene) and 413 K (ether).

## Shape
- **Part 1, 16 slides:** familiar alcohols; classification and general formula; nomenclature; structure of the –OH group (SVG); worked example (naming and classifying four alcohols); preparation from alkenes; other preparations (alkyl halides, carbonyl reduction, amines, Grignard); worked example (Grignard planning); manufacture of methanol and ethanol (outline); hydrogen bonding (SVG); worked example (boiling points of four compounds of similar mass); summary; exam tips; three checks.
- **Part 2, 16 slides:** overview flow; acidic nature; replacement of –OH by halogen; esterification and acylation; mechanism of esterification; worked example (esters and an ¹⁸O label); oxidation; dehydration conditions and mechanism; converting one alcohol into another; worked example (ascent and descent); Lucas test and uses; summary; exam tips; three checks.
- Layouts: title 2 · concept 13 · diagram 2 · example 5 · check 6 · summary 2 · exam-tips 2. Visuals: flow 5 · svg 2 · table 19. Two SVGs (bond angles at oxygen; hydrogen bonding), reused from the CBSE 12 ch07 set. Narration 12–73 words (mean 52), no symbols, formulae or unit abbreviations.

## Question bank (71)
| Type | Count | Marks |
|---|---|---|
| mcq | 29 | 1 (keys a 8, b 7, c 7, d 7; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys d a b c a) |
| true-false | 5 | 1 |
| fill-blank | 3 | 1 |
| match | 1 | 2 |
| numerical | 6 | 1 or 2 (6.0 g propan-2-ol (Grignard); 18.4 g ethanol from sucrose; 22.4 L H₂ (Bosch); 1.12 L H₂ with sodium; 29.48 g ethyl ethanoate at 67%; 66.7 mL of 0.10 M dichromate) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 8 | 3 (calculations with full working, reasons, comparisons, derivations) |
| long | 5 | 5, set in parts with marks shown, e.g. [2] + [3] |

- No case-based items: the ISC pattern has none (long answers carry the stimulus or calculation instead).
- **Difficulty:** d1 18 · d2 35 · d3 16 · d4 2.
- **Competency:** recall 14 · understanding 16 · application 35 · analysis 6. Application or higher is **58% of items (62% of marks)**, inside the 45–65% band and in line with the ISC aim of about half the marks on higher-order skills.
- **Topic tags:** t01 12 · t02 14 · t03 7 · t04 16 · t05 13 · t06 11.
- **Deck checks:** q001, q013, q005 (Part 1); q031, q046, q058 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC default blueprints)
- **Short (20 marks, 50 min):** A q002, q015, q034, q047, q037 · B q022, (q030 or q055) · C q024, (q045 or q065) · D q068.
- **Long (40 marks, 100 min):** A q003, q014, q016, q017, q026, q032, q035, q048, q049, q060, q019, q038 · B q010, q023, (q011 or q056) · C q012, q025, q044, (q057 or q066) · D q069, (q067 or q070).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 6/6 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-chemistry.md`.

## Verifier pass (2026-10-30)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Specific stems.** Every stem names its own compound or data set (isoamyl alcohol, propane-1,2-diol, 2-methylpropene with diborane, ethanamine with nitrous acid, ¹⁸O-labelled methanol, pentanol isomers with Lucas reagent, …). CBSE 12 ch07 covers alcohols with phenols and ethers; none of its stems or data sets is reused.
2. **Fixes after the first build.** Stage-4 lint flagged an unbalanced NaBH₄ reduction written without a hydrogen source (now H₂/Ni) and a multi-step descent scheme (now labelled as a skeletal scheme); an equation using [O] was replaced by the balanced ionic dichromate equation. Rebuilt: validator, lint and verify all clean.
3. **Every numerical re-computed** by the build script.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

