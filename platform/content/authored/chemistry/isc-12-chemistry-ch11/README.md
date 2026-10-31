# ISC Class 12 Chemistry, Chapter 11 — Bonding in Coordination Compounds

`isc-12-chemistry-ch11` · release v1 · academic year 2026-27 (ISC 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (13 + 15 slides), notes (4 sections), 31 flashcards, 64 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12chem_ch11_short` (20 marks, 50 min) and `t_isc12chem_ch11_long` (40 marks, 100 min), laid out exactly as the ISC default blueprints `isc-12-default-chapter-test-short` / `-long` (Sections A–D, internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the CBSE 12 Chemistry builder adapted for ISC ids, the ISC blueprints and no default word limits), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-12-chemistry-ch11/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC syllabus, not NCERT)
- All four syllabus topics are covered: t01 valence bond theory — inner and outer orbital complexes, sp, sp³, dsp², d²sp³ and sp³d² hybridisation, shapes, high and low spin, magnetic moments and limitations; t02 crystal field theory — octahedral and tetrahedral splitting (with 0.4/0.6 Δo positions), spectrochemical series, high/low spin, colour (including Δo from an absorption wavelength) and limitations; t03 stability of complexes in terms of stepwise and overall stability constants; t04 importance of complexes in qualitative analysis, extraction of metals (cyanide process, Mond process) and biological systems.
- Nomenclature and isomerism stay in ch10. Metal carbonyl bonding (synergic) is not in the ISC syllabus and appears only through Ni(CO)₄ in VBT and the Mond process.
- Facts a reviewer may wish to double-check: log β values are rounded literature values ([Ag(NH₃)₂]⁺ 7.2, [Ni(NH₃)₆]²⁺ 8.6, [Cu(NH₃)₄]²⁺ 13.1, [Ni(en)₃]²⁺ 18.3, [Ag(CN)₂]⁻ 21.1, [Fe(CN)₆]³⁻ 43.6, [Ni(CN)₄]²⁻ about 31); absorption maxima (Ti³⁺ 498 nm, [Cr(NH₃)₆]³⁺ 460 nm, [Cu(H₂O)₆]²⁺ about 800 nm) are typical values; Mond temperatures 330–350 K and 450–470 K.

## Shape
- **Part 1, 13 slides:** overview flow; main ideas of VBT; inner and outer orbital complexes; worked example ([Fe(CN)₆]⁴⁻ vs [Fe(H₂O)₆]²⁺); worked example ([Ni(CO)₄] vs [Ni(CN)₄]²⁻); worked example ([MnBr₄]²⁻ from its magnetic moment); magnetic behaviour summarised; limitations of VBT; summary; exam tips; three checks.
- **Part 2, 15 slides:** overview flow; octahedral and tetrahedral splitting (SVG); spectrochemical series and high/low spin; worked example (Mn²⁺ with H₂O and CN⁻); tetrahedral complexes; colour; worked example (Δo of [Ti(H₂O)₆]³⁺ ≈ 240 kJ mol⁻¹); stability constants; worked example (β₂ of silver ammine and cyanide displacement); importance of complexes; summary; exam tips; three checks.
- Layouts: title 2 · concept 9 · diagram 1 · example 6 · check 6 · summary 2 · exam-tips 2. Visuals: flow 2 · svg 1 · table 19. One SVG (octahedral and tetrahedral d-orbital splitting), reused from the CBSE 12 ch05 set. Narration 10–75 words (mean 53), no symbols, formulae or unit abbreviations.

## Question bank (64)
| Type | Count | Marks |
|---|---|---|
| mcq | 22 | 1 (keys a 6, b 6, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys a c b a d) |
| true-false | 4 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 7 | 1 or 2 ([FeF₆]³⁻ 5.92 BM; 1 unpaired electron in K₃[Fe(CN)₆]; Δo ≈ 260 kJ mol⁻¹ for [Cr(NH₃)₆]³⁺; 1 unpaired electron in low-spin [Co(NO₂)₆]⁴⁻; K₂ = 3000; K₄ = 200; 0.196 g NaCN; β₃ ≈ 2.0 × 10¹⁸; Δo ≈ 150 kJ mol⁻¹ for [Cu(H₂O)₆]²⁺) |
| short (2 marks) | 8 | 2 |
| short (3 marks) | 8 | 3 (calculations with full working, reasons, comparisons, derivations) |
| long | 5 | 5, set in parts with marks shown, e.g. [2] + [3] |

- No case-based items: the ISC pattern has none (long answers carry the stimulus or calculation instead).
- **Difficulty:** d1 12 · d2 32 · d3 17 · d4 3.
- **Competency:** recall 11 · understanding 18 · application 29 · analysis 6. Application or higher is **55% of items (64% of marks)**, inside the 45–65% band and in line with the ISC aim of about half the marks on higher-order skills.
- **Topic tags:** t01 19 · t02 20 · t03 12 · t04 16.
- **Deck checks:** q001, q002, q003 (Part 1); q019, q020, q036 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC default blueprints)
- **Short (20 marks, 50 min):** A q005, q021, q037, q047, q007 · B q014, (q031 or q044) · C q034, (q017 or q059) · D q061.
- **Long (40 marks, 100 min):** A q004, q006, q022, q023, q024, q025, q038, q039, q049, q051, q026, q040 · B q032, q016, (q015 or q057) · C q018, q033, q045, (q035 or q046) · D q060, (q062 or q063).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 7/7 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-chemistry.md`.

## Verifier pass (2026-10-30)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Specific stems.** Every stem names its complex or data set ([V(H₂O)₆]³⁺, [Co(C₂O₄)₃]³⁻, Ni–dmg, [Co(NO₂)₆]⁴⁻, silver–en constants, hypo and AgBr, cyanide leaching of gold, …). CBSE 12 ch05 covers VBT and CFT; its compounds and stems are not reused in the bank.
2. **Fixes after the first build.** Stage-4 lint flagged a link-reference false positive ("K₃[Fe(CN)₆]: …") in one model answer — reworded; deterministic verify flagged two numericals whose keys were given as a mantissa or a logarithm without an "=" step — rewritten to ask for K₂ and K₄, which the solutions compute directly. Rebuilt: validator, lint and verify all clean.
3. **Every numerical re-computed** by the build script.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

