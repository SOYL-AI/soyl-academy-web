# ISC Class 12 Chemistry, Chapter 10 — Coordination Compounds: Terms, Nomenclature and Isomerism

`isc-12-chemistry-ch10` · release v1 · academic year 2026-27 (ISC 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 16 slides), notes (4 sections), 31 flashcards, 68 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12chem_ch10_short` (20 marks, 50 min) and `t_isc12chem_ch10_long` (40 marks, 100 min), laid out exactly as the ISC default blueprints `isc-12-default-chapter-test-short` / `-long` (Sections A–D, internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the CBSE 12 Chemistry builder adapted for ISC ids, the ISC blueprints and no default word limits), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-12-chemistry-ch10/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC syllabus, not NCERT)
- All four syllabus topics are covered: t01 double salts versus coordination compounds (behaviour in water) and Werner’s theory (primary and secondary valency, precipitation and conductivity evidence); t02 ligands from unidentate to hexadentate, chelating and ambidentate ligands, coordination number and oxidation state of the central atom; t03 IUPAC nomenclature of mononuclear complexes (2005 rules), name ⇄ formula; t04 structural isomerism (ionisation, linkage, coordination, hydrate) and stereoisomerism (cis/trans, fac/mer, optical).
- Bonding (VBT, CFT), stability constants and applications are left to ch11, as in the syllabus.
- Facts a reviewer may wish to double-check: Ligand names follow the IUPAC 2005 recommendations (chlorido, cyanido, hydroxido, thiocyanato-S/-N); NO in the brown-ring complex and in nitroprusside is treated as NO⁺; hydrate-isomer colours of CrCl₃·6H₂O are the textbook descriptions.

## Shape
- **Part 1, 14 slides:** familiar complexes; double salts and coordination compounds; Werner’s theory with the cobalt ammine series; worked example (grey-green CrCl₃·6H₂O from AgCl data); the language of complexes; ligands by denticity (uni- to hexadentate); chelating ligands and the chelate effect (SVG); coordination number and oxidation state; worked example ([Pt(en)₂Cl₂]Cl₂, Na₃[Co(NO₂)₆], [Cu(EDTA)]²⁻); summary; exam tips; three checks.
- **Part 2, 16 slides:** overview flow; IUPAC rules; ligand names; worked example (five formulas to names); worked example (three names to formulas); types of isomerism; structural isomerism; worked example (naming the isomerism of four pairs); geometrical isomerism (SVG); optical isomerism; worked example (counting stereoisomers); summary; exam tips; three checks.
- Layouts: title 2 · concept 10 · diagram 2 · example 6 · check 6 · summary 2 · exam-tips 2. Visuals: flow 4 · svg 2 · table 18. Two SVGs (chelate ring; cis/trans isomers), reused from the CBSE 12 ch05 set. Narration 13–72 words (mean 50), no symbols, formulae or unit abbreviations.

## Question bank (68)
| Type | Count | Marks |
|---|---|---|
| mcq | 24 | 1 (keys a 6, b 6, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a a c d a b) |
| true-false | 4 | 1 |
| fill-blank | 4 | 1 |
| match | 2 | 2 |
| numerical | 5 | 1 or 2 (2.87 g AgCl; 5 ions from K₄[Fe(CN)₆]; Fe +1 in the brown-ring complex; Pt +4 in K₂[PtCl₆]; 3 stereoisomers of [Cr(C₂O₄)₂(H₂O)₂]⁻) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 9 | 3 (calculations with full working, reasons, comparisons, derivations) |
| long | 5 | 5, set in parts with marks shown, e.g. [2] + [3] |

- No case-based items: the ISC pattern has none (long answers carry the stimulus or calculation instead).
- **Difficulty:** d1 19 · d2 31 · d3 16 · d4 2.
- **Competency:** recall 10 · understanding 19 · application 28 · analysis 11. Application or higher is **57% of items (65% of marks)**, inside the 45–65% band and in line with the ISC aim of about half the marks on higher-order skills.
- **Topic tags:** t01 15 · t02 20 · t03 15 · t04 20.
- **Deck checks:** q001, q015, q016 (Part 1); q034, q047, q048 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC default blueprints)
- **Short (20 marks, 50 min):** A q002, q017, q036, q051, q006 · B q012, (q029 or q059) · C q033, (q045 or q063) · D q064.
- **Long (40 marks, 100 min):** A q003, q004, q018, q019, q021, q035, q037, q049, q050, q052, q022, q054 · B q011, q031, (q043 or q060) · C q014, q046, q061, (q062 or q013) · D q066, (q067 or q068).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 5/5 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-chemistry.md`.

## Verifier pass (2026-10-30)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Specific stems.** Every stem names its own complex (PdCl₂·4NH₃, potash alum, trien, K₂[Ni(C₂O₄)₂], [Mn(CO)₅(SCN)], [RuCl₃(NH₃)₃], brown-ring complex, …). CBSE 12 ch05 covers the same ground; its compounds, stems and data are not reused in the bank.
2. **Lint fixes.** The first build flagged a markdown-link false positive: a formula of the form [complex](NO₃)₂ in a model answer reads as a link; it is now written with mhchem, and two "[ion]: x" phrasings were reworded. Rebuilt: validator, stage-4 lint and deterministic verify all clean.
3. **Every name and formula re-derived** from the IUPAC rules; every oxidation state and coordination number re-computed.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

