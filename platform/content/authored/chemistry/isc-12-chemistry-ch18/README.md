# ISC Class 12 Chemistry, Chapter 18 — Carboxylic Acids

`isc-12-chemistry-ch18` · release v1 · academic year 2026-27 (ISC 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 15 slides), notes (6 sections), 31 flashcards, 70 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12chem_ch18_short` (20 marks, 50 min) and `t_isc12chem_ch18_long` (40 marks, 100 min), laid out exactly as the ISC default blueprints `isc-12-default-chapter-test-short` / `-long` (Sections A–D, internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the CBSE 12 Chemistry builder adapted for ISC ids, the ISC blueprints and no default word limits), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-12-chemistry-ch18/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC syllabus, not NCERT)
- All six syllabus topics are covered: t01 classification of mono- and dicarboxylic acids, general formula, structure of the carboxyl group, nomenclature and physical properties (hydrogen-bonded dimers); t02 preparation of aliphatic and aromatic acids from alcohols, aldehydes, nitriles and Grignard reagents (and alkylbenzene oxidation); t03 acidic character of aliphatic and aromatic acids with substituent effects in detail (number, electronegativity and distance of −I groups; +I groups; para-substituted benzoic acids; the ortho effect); t04 reactions with active metals, alkalis, carbonates and hydrogencarbonates, and formation of acid chlorides, anhydrides, esters and amides; t05 decarboxylation (soda lime and Kolbe electrolysis), the HVZ reaction and meta substitution of benzoic acid; t06 tests for and uses of formic, acetic and benzoic acids.
- Esters and amides appear only as derivatives; amines are in ch19.
- Facts a reviewer may wish to double-check: pKa values are rounded literature values (CCl₃COOH 0.65, CHCl₂COOH 1.26, FCH₂COOH 2.66, ClCH₂COOH 2.86, HCOOH 3.75, C₆H₅COOH 4.19, CH₃COOH 4.76, CH₃CH₂COOH 4.88, chlorobutanoic acids 2.86/4.05/4.52, butanoic 4.82, substituted benzoic acids as tabulated); carboxylate C–O bond length 127 pm.

## Shape
- **Part 1, 15 slides:** familiar acids; classification and nomenclature (mono and di); structure and physical properties (dimers); preparation of aliphatic acids; preparation of aromatic acids; worked example (butanoic acid by two routes, 4-methylbenzoic acid via Grignard); why carboxylic acids are acidic (carboxylate resonance SVG); substituent effects in aliphatic acids; substituent effects in aromatic acids; worked example (effect of distance in chlorobutanoic acids); summary; exam tips; three checks.
- **Part 2, 15 slides:** overview flow; reactions as acids; acid derivatives; worked example (derivatives of benzoic acid); decarboxylation and Kolbe electrolysis; HVZ reaction; ring substitution in benzoic acid; worked example (four products); tests for formic, acetic and benzoic acids; uses; summary; exam tips; three checks.
- Layouts: title 2 · concept 13 · diagram 1 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: flow 2 · svg 1 · table 21. One SVG (carboxylate resonance), reused from the CBSE 12 ch08 set. Narration 12–71 words (mean 48), no symbols, formulae or unit abbreviations.

## Question bank (70)
| Type | Count | Marks |
|---|---|---|
| mcq | 27 | 1 (keys a 7, b 7, c 7, d 6; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a a b c a d) |
| true-false | 5 | 1 |
| fill-blank | 3 | 1 |
| match | 1 | 2 |
| numerical | 6 | 1 or 2 (30.5 g benzoic acid (Grignard); Ka ratio ≈ 79 (chloroethanoic/ethanoic); 2.24 L CO₂ (benzoic acid + NaHCO₃); 2.24 L ethane (soda lime); 3.0 g ethane (Kolbe); 2.16 g silver (formic acid + Tollens’)) |
| short (2 marks) | 8 | 2 |
| short (3 marks) | 9 | 3 (calculations with full working, reasons, comparisons, derivations) |
| long | 5 | 5, set in parts with marks shown, e.g. [2] + [3] |

- No case-based items: the ISC pattern has none (long answers carry the stimulus or calculation instead).
- **Difficulty:** d1 15 · d2 37 · d3 16 · d4 2.
- **Competency:** recall 10 · understanding 16 · application 38 · analysis 6. Application or higher is **63% of items (67% of marks)**, inside the 45–65% band and in line with the ISC aim of about half the marks on higher-order skills.
- **Topic tags:** t01 9 · t02 11 · t03 14 · t04 13 · t05 16 · t06 12.
- **Deck checks:** q001, q009, q019 (Part 1); q032, q043, q056 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC default blueprints)
- **Short (20 marks, 50 min):** A q002, q012, q033, q045, q013 · B q008, (q028 or q040) · C q017, (q041 or q055) · D q067.
- **Long (40 marks, 100 min):** A q003, q004, q010, q011, q020, q021, q022, q034, q044, q047, q024, q025 · B q016, q029, (q053 or q054) · C q018, q030, q031, (q042 or q065) · D q068, (q066 or q069).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 6/6 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-chemistry.md`.

## Verifier pass (2026-10-30)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Specific stems.** Every stem names its own compound or data set (adipic and isobutyric acids, propylbenzene, isopropylmagnesium bromide, chlorobutanoic isomers, 4-methoxybenzoic acid, potassium propanoate electrolysis, HgCl₂ test, …). CBSE 12 ch08 covers carboxylic acids; its stems and data sets (for example its ethanoic-acid CO₂ volume, soda-lime methane and pKa conversion items) are not reused.
2. **One narration fix.** The first build flagged a subscript (KMnO₄) in a check-slide narration; it now says “permanganate”. Rebuilt: validator, lint and verify all clean.
3. **Every equation re-balanced** and every numerical re-computed by the build script.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

