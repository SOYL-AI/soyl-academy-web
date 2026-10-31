# ISC Class 12 Chemistry, Chapter 12 — Haloalkanes

`isc-12-chemistry-ch12` · release v1 · academic year 2026-27 (ISC 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 19 slides), notes (7 sections), 31 flashcards, 72 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12chem_ch12_short` (20 marks, 50 min) and `t_isc12chem_ch12_long` (40 marks, 100 min), laid out exactly as the ISC default blueprints `isc-12-default-chapter-test-short` / `-long` (Sections A–D, internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the CBSE 12 Chemistry builder adapted for ISC ids, the ISC blueprints and no default word limits), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-12-chemistry-ch12/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC syllabus, not NCERT)
- All seven syllabus topics are covered: t01 classification, common and IUPAC names of mono-, di- (gem/vic) and tri-halo derivatives, the C–X bond; t02 preparation from alkanes, alkenes (Markovnikov and peroxide effect), alcohols (HX/ZnCl₂, PX₃, PCl₅, SOCl₂), halide exchange (Finkelstein, Swarts) and silver salts of fatty acids (Hunsdiecker); t03 physical properties; t04 SN1 and SN2 mechanisms with optical rotation (inversion, racemisation); t05 substitution with NaOH, water/moist Ag₂O, NaI, NH₃, amines, KCN, AgCN, KNO₂, AgNO₂, silver salts of fatty acids and LiAlH₄; t06 β-elimination and Saytzeff’s rule, Wurtz reaction and Grignard reagents; t07 chloroform and iodoform (preparation and properties), dichloromethane, tetrachloromethane and freons with their environmental effects.
- Haloarenes are left to ch13, as in the syllabus.
- Facts a reviewer may wish to double-check: C–X bond lengths and enthalpies are rounded data-book values; boiling points of the chloropentanes and halomethanes are rounded; chloroform storage (dark, full bottles, a little ethanol) and the phosgene, chloropicrin and ethyne reactions follow standard ISC treatment.

## Shape
- **Part 1, 17 slides:** familiar haloalkanes; classification; common and IUPAC names; worked example (naming and classifying four compounds); the C–X bond (SVG); bond length and enthalpy; preparation from alcohols; from alkanes and alkenes; halide exchange and the Hunsdiecker reaction; worked example (choosing a preparation); physical properties; worked example (boiling points of C₅H₁₁Cl isomers); summary; exam tips; three checks.
- **Part 2, 19 slides:** overview flow; substitution by nucleophiles (full ISC list); SN2; SN2 backside attack (SVG); SN1; SN1 versus SN2 and optical rotation (two-column); worked example (predicting rates); worked example (one haloalkane, six products); β-elimination and Saytzeff’s rule; Wurtz and Grignard; chloroform; iodoform; dichloromethane, tetrachloromethane and freons; summary; exam tips; four checks.
- Layouts: title 2 · concept 15 · two-column 1 · diagram 2 · example 5 · check 7 · summary 2 · exam-tips 2. Visuals: flow 3 · svg 2 · table 24. Two SVGs (polar C–X bond; SN2 inversion), reused from the CBSE 12 ch06 set. Narration 8–75 words (mean 50), no symbols, formulae or unit abbreviations.

## Question bank (72)
| Type | Count | Marks |
|---|---|---|
| mcq | 27 | 1 (keys a 7, b 7, c 7, d 6; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys a d c a b) |
| true-false | 5 | 1 |
| fill-blank | 5 | 1 |
| match | 2 | 2 |
| numerical | 6 | 1 or 2 (2.18 g bromoethane (Hunsdiecker); 4.48 L gases from SOCl₂; k = 0.020 L mol⁻¹ s⁻¹; 4.4 g propanenitrile; 12.9 g hexane (Wurtz); 7.88 g iodoform) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 8 | 3 (calculations with full working, reasons, comparisons, derivations) |
| long | 5 | 5, set in parts with marks shown, e.g. [2] + [3] |

- No case-based items: the ISC pattern has none (long answers carry the stimulus or calculation instead).
- **Difficulty:** d1 14 · d2 38 · d3 18 · d4 2.
- **Competency:** recall 10 · understanding 18 · application 37 · analysis 7. Application or higher is **61% of items (72% of marks)**, inside the 45–65% band and in line with the ISC aim of about half the marks on higher-order skills.
- **Topic tags:** t01 9 · t02 14 · t03 4 · t04 14 · t05 10 · t06 11 · t07 11.
- **Deck checks:** q001, q009, q022 (Part 1); q026, q039, q048, q058 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC default blueprints)
- **Short (20 marks, 50 min):** A q002, q011, q023, q049, q014 · B q018, (q019 or q025) · C q020, (q037 or q067) · D q070.
- **Long (40 marks, 100 min):** A q003, q010, q012, q013, q024, q027, q029, q030, q040, q041, q031, q042 · B q007, q036, (q056 or q065) · C q008, q021, q038, (q047 or q057) · D q069, (q068 or q072).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 6/6 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-chemistry.md`.

## Verifier pass (2026-10-30)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Specific stems.** Every stem names its own compound or data set (neopentyl bromide, isopentyl bromide, silver propanoate, 2-methylpropene, (S)-2-bromobutane, 3-bromo-2-methylpentane, …). CBSE 12 ch06 covers haloalkanes; none of its stems or data sets is reused, and no generic “match each term” stems are used.
2. **Tag fix.** The first build was clean except for a competency-band warning (65%, at the top of the 45–65% band); four items were re-tagged (one recall, two understanding, one difficulty raised to d4). Rebuilt: validator, stage-4 lint and deterministic verify all clean.
3. **Every equation re-balanced** for atoms and charge; every numerical re-computed by the build script.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

