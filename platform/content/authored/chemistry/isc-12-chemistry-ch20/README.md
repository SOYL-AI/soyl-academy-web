# ISC Class 12 Chemistry, Chapter 20 — Cyanides, Isocyanides and Diazonium Salts

`isc-12-chemistry-ch20` · release v1 · academic year 2026-27 (ISC 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 14 slides), notes (4 sections), 31 flashcards, 60 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12chem_ch20_short` (20 marks, 50 min) and `t_isc12chem_ch20_long` (40 marks, 100 min), laid out exactly as the ISC default blueprints `isc-12-default-chapter-test-short` / `-long` (Sections A–D, internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the CBSE 12 Chemistry builder adapted for ISC ids, the ISC blueprints and no default word limits), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-12-chemistry-ch20/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC syllabus, not NCERT)
- All four syllabus topics are covered: t01 cyanides from alkyl halides (KCN) and amides (P₂O₅), isocyanides from alkyl halides (AgCN) and primary amines (carbylamine reaction), with a comparison of the two isomers (smell, polarity, hydrolysis and reduction products, isomerisation); t02 preparation of diazonium salts from aniline at 273–278 K and their stability; t03 replacement reactions — Sandmeyer (Cl, Br, CN), Gattermann, Balz–Schiemann, iodide, and replacement by –H, –OH and –NO₂; t04 coupling with phenol (and 2-naphthol) and aniline (and N,N-dimethylaniline), and the importance of diazonium salts in synthesis.
- The chemistry of amines themselves is in ch19.
- Facts a reviewer may wish to double-check: Coupling pH ranges (phenols mildly alkaline, amines mildly acidic) and dye colours are the usual textbook descriptions; diazotisation at 273–278 K.

## Shape
- **Part 1, 14 slides:** uses of nitriles, isocyanides and diazonium salts; structure and names; preparation of cyanides; preparation of isocyanides; worked example (KCN or AgCN with 1-bromobutane); comparing cyanides and isocyanides; worked example (hydrolysis and reduction products); preparation of benzenediazonium chloride; stability of diazonium salts; summary; exam tips; three checks.
- **Part 2, 14 slides:** overview flow; Sandmeyer and Gattermann reactions; iodide, fluoride, hydrogen, hydroxyl and nitro replacements; worked example (five products from 4-methylbenzenediazonium chloride); coupling with phenol; coupling with aniline; worked example (three coupling products); importance in synthesis; worked example (1,3,5-tribromobenzene from aniline); summary; exam tips; three checks.
- Layouts: title 2 · concept 11 · example 5 · check 6 · summary 2 · exam-tips 2. Visuals: flow 4 · table 18. No SVGs: the visuals are tables and flows. Narration 12–67 words (mean 48), no symbols, formulae or unit abbreviations.

## Question bank (60)
| Type | Count | Marks |
|---|---|---|
| mcq | 21 | 1 (keys a 6, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys a c a a d) |
| true-false | 4 | 1 |
| fill-blank | 4 | 1 |
| match | 1 | 2 |
| numerical | 5 | 1 or 2 (6.64 g pentanenitrile (80%); 3.45 g NaNO₂; 1.12 L N₂; 14.28 g iodobenzene (70%); 6.2 g 1-phenylazo-2-naphthol) |
| short (2 marks) | 7 | 2 |
| short (3 marks) | 8 | 3 (calculations with full working, reasons, comparisons, derivations) |
| long | 5 | 5, set in parts with marks shown, e.g. [2] + [3] |

- No case-based items: the ISC pattern has none (long answers carry the stimulus or calculation instead).
- **Difficulty:** d1 8 · d2 35 · d3 14 · d4 3.
- **Competency:** recall 10 · understanding 11 · application 32 · analysis 7. Application or higher is **65% of items (75% of marks)**, inside the 45–65% band and in line with the ISC aim of about half the marks on higher-order skills.
- **Topic tags:** t01 19 · t02 10 · t03 18 · t04 16.
- **Deck checks:** q001, q002, q018 (Part 1); q027, q042, q045 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC default blueprints)
- **Short (20 marks, 50 min):** A q003, q006, q019, q030, q008 · B q014, (q025 or q051) · C q016, (q040 or q053) · D q056.
- **Long (40 marks, 100 min):** A q004, q005, q007, q020, q028, q029, q031, q032, q043, q044, q009, q023 · B q015, q038, (q039 or q052) · C q017, q026, q041, (q054 or q060) · D q057, (q055 or q059).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 5/5 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-chemistry.md`.

## Verifier pass (2026-10-30)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Specific stems.** Every stem names its own compound or data set (2-bromopropane with AgCN, isocyanoethane hydrolysis, 4-chloroaniline warmed, 4-nitrobenzenediazonium with CuCN, 4-fluorotoluene, N,N-dimethylaniline coupling, …). CBSE 12 ch09 treats diazonium salts; its stems (for example benzonitrile reagent, phenol coupling in ice, fluorobenzene from aniline) are not reused in the same form.
2. **Fix after the first build.** The tests builder refused a layout that used one short-answer item in both tests, so a new conversion item (from 4-methylaniline) was added. Rebuilt: validator, lint and verify all clean.
3. **Every equation re-balanced** and every numerical re-computed by the build script.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

