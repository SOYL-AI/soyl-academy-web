# ISC Class 12 Chemistry, Chapter 16 — Aldehydes and Ketones

`isc-12-chemistry-ch16` · release v1 · academic year 2026-27 (ISC 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 16 slides), notes (6 sections), 31 flashcards, 67 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12chem_ch16_short` (20 marks, 50 min) and `t_isc12chem_ch16_long` (40 marks, 100 min), laid out exactly as the ISC default blueprints `isc-12-default-chapter-test-short` / `-long` (Sections A–D, internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the CBSE 12 Chemistry builder adapted for ISC ids, the ISC blueprints and no default word limits), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-12-chemistry-ch16/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC syllabus, not NCERT)
- All six syllabus topics are covered: t01 nomenclature, structure of the carbonyl group and physical properties; t02 preparation from alcohols, alkenes (ozonolysis), alkynes (hydration), acid chlorides (Rosenmund, dialkylcadmium), calcium salts of acids, nitriles (Stephen, Grignard) and esters (DIBAL-H); t03 nucleophilic addition with the HCN mechanism, NaHSO₃, Grignard reagents and ammonia derivatives; t04 oxidation, the iodoform reaction and reduction to alcohols and alkanes (Clemmensen, Wolff–Kishner, red P and HI); t05 aldol (with mechanism), cross aldol and Cannizzaro reactions and the reactivity of α-hydrogen; t06 tests distinguishing aldehydes from ketones and methanal from ethanal, and uses.
- Benzaldehyde is treated separately in ch17 and carboxylic acids in ch18, as in the syllabus.
- Facts a reviewer may wish to double-check: Boiling points of the C₃ compounds (butane 273 K, methoxyethane 281 K, propanal 322 K, propanone 329 K, propan-1-ol 370 K) are rounded; Wolff–Kishner temperature about 453–473 K.

## Shape
- **Part 1, 15 slides:** familiar carbonyl compounds; nomenclature; structure of the carbonyl group (SVG); physical properties; worked example (naming four compounds); from alcohols, alkenes and alkynes; from acid chlorides and calcium salts; from nitriles and esters; worked example (choosing a preparation); preparation summary flow; summary; exam tips; three checks.
- **Part 2, 16 slides:** overview flow; nucleophilic addition and reactivity (SVG); mechanism of HCN addition; NaHSO₃, Grignard and ammonia derivatives; worked example (five addition products of butanone); oxidation and the iodoform reaction; reduction; acidity of α-hydrogens and the aldol mechanism; cross aldol and Cannizzaro; worked example (aldol or Cannizzaro); tests and uses; summary; exam tips; three checks.
- Layouts: title 2 · concept 13 · diagram 2 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: flow 5 · svg 2 · table 18. Two SVGs (carbonyl group; nucleophilic addition), reused from the CBSE 12 ch08 set. Narration 14–70 words (mean 49), no symbols, formulae or unit abbreviations.

## Question bank (67)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 | 1 (keys a 7, b 7, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys a a c c a) |
| true-false | 5 | 1 |
| fill-blank | 3 | 1 |
| match | 1 | 2 |
| numerical | 4 | 1 or 2 (5.8 g propanone from calcium ethanoate; 7.88 g iodoform from butanone; 3.2 g methanol (Cannizzaro); 1.43 g Cu₂O (Fehling’s)) |
| short (2 marks) | 10 | 2 |
| short (3 marks) | 8 | 3 (calculations with full working, reasons, comparisons, derivations) |
| long | 5 | 5, set in parts with marks shown, e.g. [2] + [3] |

- No case-based items: the ISC pattern has none (long answers carry the stimulus or calculation instead).
- **Difficulty:** d1 11 · d2 39 · d3 14 · d4 3.
- **Competency:** recall 8 · understanding 19 · application 34 · analysis 6. Application or higher is **60% of items (63% of marks)**, inside the 45–65% band and in line with the ISC aim of about half the marks on higher-order skills.
- **Topic tags:** t01 10 · t02 14 · t03 14 · t04 11 · t05 14 · t06 9.
- **Deck checks:** q001, q010, q011 (Part 1); q023, q035, q044 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC default blueprints)
- **Short (20 marks, 50 min):** A q002, q012, q026, q038, q016 · B q009, (q020 or q042) · C q021, (q034 or q043) · D q065.
- **Long (40 marks, 100 min):** A q003, q004, q013, q014, q024, q027, q036, q037, q046, q057, q028, q048 · B q008, q031, (q052 or q061) · C q022, q033, q054, (q055 or q062) · D q064, (q063 or q066).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 4/4 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-chemistry.md`.

## Verifier pass (2026-10-30)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Specific stems.** Every stem names its own compound or data set (isovaleraldehyde, diethyl ketone, 2-methylbut-2-ene ozonolysis, dimethylcadmium, benzonitrile with MeMgI, 2,2-dimethylpropanal, butanal aldol, …). CBSE 12 ch08 covers carbonyl compounds; none of its stems or data sets is reused.
2. **Fixes after the first build.** Two narrations contained “C=O” and “C=N” (symbols in read-aloud text) and were rewritten in words; an enolate written as ^-CH₂CHO was rewritten as CH₂CHO⁻; a generic R′₂Cd equation in the notes was replaced by a concrete one. Rebuilt: validator, lint and verify all clean.
3. **Every equation re-balanced** and every numerical re-computed by the build script.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

