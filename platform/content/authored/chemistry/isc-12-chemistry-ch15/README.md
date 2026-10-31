# ISC Class 12 Chemistry, Chapter 15 — Phenols and Ethers

`isc-12-chemistry-ch15` · release v1 · academic year 2026-27 (ISC 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 16 slides), notes (5 sections), 31 flashcards, 66 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12chem_ch15_short` (20 marks, 50 min) and `t_isc12chem_ch15_long` (40 marks, 100 min), laid out exactly as the ISC default blueprints `isc-12-default-chapter-test-short` / `-long` (Sections A–D, internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the CBSE 12 Chemistry builder adapted for ISC ids, the ISC blueprints and no default word limits), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-12-chemistry-ch15/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC syllabus, not NCERT)
- All five syllabus topics are covered: t01 classification and nomenclature of phenols and preparation from diazonium salts, chlorobenzene (Dow), benzenesulphonic acid and cumene; t02 physical properties and acidity of phenol (with substituent effects) and its reactions with NaOH, Na, Zn, acetyl chloride, acetic anhydride and PCl₅; t03 bromination, nitration and sulphonation, Kolbe and Reimer–Tiemann reactions, the ferric chloride and azo dye tests, and uses; t04 aliphatic ethers — structure, nomenclature, Williamson’s synthesis, physical properties and reactions with chlorine, oxygen (peroxides), HI and PCl₅; t05 anisole — Williamson preparation, halogenation, nitration and Friedel–Crafts reactions, and uses of ethers.
- Alcohols are in ch14; benzenediazonium salts are developed further in ch20.
- Facts a reviewer may wish to double-check: pKa values (phenol 10.0, ethanol 15.9, cyclohexanol about 16, 4-methoxyphenol 10.2, 3-nitrophenol 8.3, 4-nitrophenol 7.1, picric acid about 0.4) and boiling points are rounded literature values; Kolbe conditions 400 K and 4–7 atm; sulphonation of phenol gives mainly the 2-acid near 290 K and the 4-acid near 373 K.

## Shape
- **Part 1, 18 slides:** familiar phenols; classification and nomenclature; four preparations; the cumene process; worked example (benzene to phenol via the sulphonate); physical properties and intramolecular hydrogen bonding; acidity of phenol (phenoxide resonance SVG); worked example (ranking five acids); reactions of the –OH group; electrophilic substitution; Kolbe and Reimer–Tiemann; worked example (five products); tests and uses; summary; exam tips; three checks.
- **Part 2, 16 slides:** overview flow; structure and nomenclature of ethers (SVG); Williamson’s synthesis; worked example (planning three syntheses); physical properties; reactions with chlorine, oxygen and PCl₅; cleavage by HI; worked example (four cleavages); anisole preparation and substitution; worked example (products from anisole); uses of ethers; summary; exam tips; three checks.
- Layouts: title 2 · concept 14 · diagram 2 · example 6 · check 6 · summary 2 · exam-tips 2. Visuals: flow 2 · svg 2 · table 24. Two SVGs (phenoxide resonance; bond angles at oxygen), reused from the CBSE 12 ch07 set. Narration 15–73 words (mean 51), no symbols, formulae or unit abbreviations.

## Question bank (66)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 | 1 (keys a 7, b 7, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a b a a c d) |
| true-false | 5 | 1 |
| fill-blank | 3 | 1 |
| match | 1 | 2 |
| numerical | 4 | 1 or 2 (4.64 g propanone (cumene, 80%); 5.8 g sodium phenoxide; 4.83 g salicylic acid (Kolbe, 70%); 6.6 g 1-ethoxypropane (Williamson, 75%)) |
| short (2 marks) | 8 | 2 |
| short (3 marks) | 8 | 3 (calculations with full working, reasons, comparisons, derivations) |
| long | 5 | 5, set in parts with marks shown, e.g. [2] + [3] |

- No case-based items: the ISC pattern has none (long answers carry the stimulus or calculation instead).
- **Difficulty:** d1 14 · d2 34 · d3 16 · d4 2.
- **Competency:** recall 13 · understanding 13 · application 31 · analysis 9. Application or higher is **61% of items (73% of marks)**, inside the 45–65% band and in line with the ISC aim of about half the marks on higher-order skills.
- **Topic tags:** t01 10 · t02 16 · t03 18 · t04 16 · t05 10.
- **Deck checks:** q001, q010, q024 (Part 1); q040, q045, q055 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC default blueprints)
- **Short (20 marks, 50 min):** A q002, q013, q029, q041, q016 · B q020, (q036 or q052) · C q038, (q022 or q061) · D q064.
- **Long (40 marks, 100 min):** A q003, q004, q011, q012, q014, q025, q026, q028, q042, q056, q031, q046 · B q008, q037, (q051 or q060) · C q023, q039, q054, (q009 or q053) · D q063, (q062 or q065).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 4/4 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-chemistry.md`.

## Verifier pass (2026-10-30)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Specific stems.** Every stem names its own compound or data set (sodium benzenesulphonate fusion, m-cresol, cyclohexanol, dichlorocarbene, 2-methoxy-2-methylbutane, ethyl isopropyl ether, 1-methoxypropane, …). CBSE 12 ch07 covers phenols and ethers; its stems, compound choices and data sets (for example its Williamson, cumene, bromine-water and HI items) are not reused.
2. **First build clean.** Validator, stage-4 lint and deterministic verify reported no findings; every equation was re-balanced by hand.
3. **Every numerical re-computed** by the build script.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

