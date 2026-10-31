# ISC Class 12 Chemistry, Chapter 19 — Amines

`isc-12-chemistry-ch19` · release v1 · academic year 2026-27 (ISC 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 16 slides), notes (6 sections), 31 flashcards, 69 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12chem_ch19_short` (20 marks, 50 min) and `t_isc12chem_ch19_long` (40 marks, 100 min), laid out exactly as the ISC default blueprints `isc-12-default-chapter-test-short` / `-long` (Sections A–D, internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the CBSE 12 Chemistry builder adapted for ISC ids, the ISC blueprints and no default word limits), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-12-chemistry-ch19/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC syllabus, not NCERT)
- All six syllabus topics are covered: t01 general formula, classification, structure of the amino group and nomenclature; t02 preparation from alcohols, alkyl halides, cyanides, amides (Hofmann degradation), nitro compounds and by the Gabriel phthalimide synthesis; t03 physical properties, including boiling points of isomeric amines and comparison with alcohols; t04 basic character of alkyl amines, ammonia and aniline in the gas phase and in water, and substituent effects on aniline; t05 alkylation and acylation with mechanisms, reaction with nitrous acid, the carbylamine reaction and Hinsberg’s test; t06 aniline — preparation from nitrobenzene, reactions of –NH₂, electrophilic substitution (with protection by acetylation), tests and uses.
- Reactions of the diazonium salt beyond its formation are left to ch20, as in the syllabus.
- Facts a reviewer may wish to double-check: pKb values (diethylamine 3.00, triethylamine 3.25, dimethylamine 3.27, ethanamine 3.29, methanamine 3.38, trimethylamine 4.22, ammonia 4.75, benzylamine 4.70, aniline 9.38, 4-methylaniline 8.92, 4-nitroaniline about 13) and boiling points are rounded literature values.

## Shape
- **Part 1, 17 slides:** familiar amines; classification and general formula; structure of the amino group (SVG); nomenclature; worked example (naming and classifying four amines); preparation from alcohols, alkyl halides, cyanides and nitro compounds; Hofmann degradation and Gabriel synthesis; worked example (choosing a preparation); physical properties; basic character; why aniline is a weak base (resonance SVG); worked example (ranking five bases); summary; exam tips; three checks.
- **Part 2, 16 slides:** overview flow; alkylation with mechanism; acylation with mechanism; worked example (four products); nitrous acid and the carbylamine reaction; Hinsberg’s test; worked example (identifying three C₄H₁₁N isomers); aniline preparation and –NH₂ reactions; electrophilic substitution of aniline; worked example (4-bromoaniline via acetanilide); tests and uses; summary; exam tips; three checks.
- Layouts: title 2 · concept 13 · diagram 2 · example 6 · check 6 · summary 2 · exam-tips 2. Visuals: flow 6 · svg 2 · table 19. Two SVGs (pyramidal amine; aniline resonance), reused from the CBSE 12 ch09 set. Narration 13–71 words (mean 51), no symbols, formulae or unit abbreviations.

## Question bank (69)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 | 1 (keys a 7, b 7, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 7 | 1 (keys a a c a c a d) |
| true-false | 5 | 1 |
| fill-blank | 3 | 1 |
| match | 1 | 2 |
| numerical | 5 | 1 or 2 (4.5 g ethanamine (Hofmann); Kb ratio ≈ 42 700 (ammonia/aniline); 224 mL N₂; 13.95 g aniline (75%); 13.5 g acetanilide) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 8 | 3 (calculations with full working, reasons, comparisons, derivations) |
| long | 5 | 5, set in parts with marks shown, e.g. [2] + [3] |

- No case-based items: the ISC pattern has none (long answers carry the stimulus or calculation instead).
- **Difficulty:** d1 9 · d2 36 · d3 21 · d4 3.
- **Competency:** recall 7 · understanding 18 · application 35 · analysis 9. Application or higher is **64% of items (74% of marks)**, inside the 45–65% band and in line with the ISC aim of about half the marks on higher-order skills.
- **Topic tags:** t01 9 · t02 12 · t03 5 · t04 13 · t05 16 · t06 18.
- **Deck checks:** q001, q010, q025 (Part 1); q036, q038, q050 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC default blueprints)
- **Short (20 marks, 50 min):** A q002, q011, q021, q037, q015 · B q018, (q024 or q047) · C q020, (q035 or q064) · D q067.
- **Long (40 marks, 100 min):** A q003, q004, q012, q013, q014, q022, q026, q027, q028, q039, q030, q042 · B q008, q033, (q019 or q046) · C q009, q034, q048, (q049 or q063) · D q068, (q065 or q066).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 5/5 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-chemistry.md`.

## Verifier pass (2026-10-30)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Specific stems.** Every stem names its own compound or data set (butan-2-amine, triethylamine, butanamide, Mendius reduction, ethylamine pKb series, N-methylbenzylamine, 2-methylpropan-2-amine carbylamine, …). CBSE 12 ch09 covers amines; none of its stems or data sets (for example its methylamine order, Hinsberg MCQ, bromine-water mass and nitrobenzene mass items) is reused in the same form.
2. **Fixes after the first build.** Deterministic verify flagged a numerical whose key was a mantissa (4.27 × 10⁴); it now asks for the factor to three significant figures, which the solution computes directly. A model answer on the basicity of aniline, N-methylaniline and 4-methylaniline was corrected to the literature order. Rebuilt: validator, lint and verify all clean.
3. **Every equation re-balanced** and every numerical re-computed by the build script.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

