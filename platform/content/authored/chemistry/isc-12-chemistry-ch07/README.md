# ISC Class 12 Chemistry, Chapter 7 — Transition (d-Block) Elements

`isc-12-chemistry-ch07` · release v1 · academic year 2026-27 (ISC 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 15 slides), notes (5 sections), 31 flashcards, 66 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12chem_ch07_short` (20 marks, 50 min) and `t_isc12chem_ch07_long` (40 marks, 100 min), laid out exactly as the ISC default blueprints `isc-12-default-chapter-test-short` / `-long` (Sections A–D, internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the CBSE 12 Chemistry builder adapted for ISC ids, the ISC blueprints and no default word limits), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-12-chemistry-ch07/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC syllabus, not NCERT)
- All five syllabus topics are covered: t01 position of the d-block, occurrence (ores of 3d metals) and electronic configurations of the 3d series and of selected 4d and 5d elements (Mo, Pd, Ag, W, Pt, Au), with ions; t02 metallic character, atomic and ionic radii, ionisation enthalpy and its anomalies; t03 variable oxidation states and their relative stability; t04 coloured ions (d–d transitions) and spin-only magnetic moments; t05 catalytic property, complex formation, interstitial compounds and alloys.
- Lanthanoids and actinoids are left to ch08, and KMnO₄ and K₂Cr₂O₇ to ch09, as in the syllabus; the lanthanoid contraction is mentioned only as the cause of the similar sizes of Zr and Hf.
- Facts a reviewer may wish to double-check: Metallic radii and first ionisation enthalpies of the 3d series are rounded data-book values used for the two plots; melting points in the ie-long item are rounded; ion colours are those of the dilute hydrated ions.

## Shape
- **Part 1, 15 slides:** what transition elements are (periodic-table SVG); position and definition; occurrence and ores; 3d configurations; 4d and 5d configurations; worked example (configurations of Co²⁺, Cr³⁺, Ni²⁺, Ti⁴⁺); metallic character and physical properties; atomic and ionic radii (radius plot); ionisation enthalpy (ionisation enthalpy plot); worked example (ionisation enthalpy anomalies of Cu, Zn and Mn); summary; exam tips; three checks.
- **Part 2, 15 slides:** overview flow; variable oxidation states; worked example (stability of Fe³⁺, Mn²⁺ and Sc³⁺); magnetic properties; worked example (moments of V³⁺ and Co²⁺); coloured ions; worked example (coloured or colourless, and hydrated vs anhydrous CuSO₄); catalytic properties; complex formation; interstitial compounds and alloys; summary; exam tips; three checks.
- Layouts: title 2 · concept 11 · diagram 2 · example 5 · check 6 · summary 2 · exam-tips 2. Visuals: flow 2 · plot 2 · svg 1 · table 19. One SVG (periodic-table block outline) plus a metallic-radius plot and a first-ionisation-enthalpy plot. Narration 13–80 words (mean 54), no symbols, formulae or unit abbreviations.

## Question bank (66)
| Type | Count | Marks |
|---|---|---|
| mcq | 23 | 1 (keys a 6, b 6, c 6, d 5; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys a b a d c) |
| true-false | 4 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 6 | 1 or 2 (1351.5 kJ for 0.50 mol Cu → Cu²⁺; vanadium +5 in VO₄³⁻; Mn³⁺ 4.90 BM; Cu²⁺ 1.73 BM; 3 unpaired electrons from 3.87 BM; 162.5 g copper in a brass tap) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 9 | 3 (calculations with full working, reasons, comparisons, derivations) |
| long | 5 | 5, set in parts with marks shown, e.g. [2] + [3] |

- No case-based items: the ISC pattern has none (long answers carry the stimulus or calculation instead).
- **Difficulty:** d1 12 · d2 31 · d3 20 · d4 3.
- **Competency:** recall 10 · understanding 20 · application 26 · analysis 10. Application or higher is **55% of items (61% of marks)**, inside the 45–65% band and in line with the ISC aim of about half the marks on higher-order skills.
- **Topic tags:** t01 13 · t02 14 · t03 13 · t04 18 · t05 11.
- **Deck checks:** q001, q013, q002 (Part 1); q025, q037, q052 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC default blueprints)
- **Short (20 marks, 50 min):** A q003, q014, q026, q053, q006 · B q021, (q034 or q049) · C q012, (q051 or q061) · D q065.
- **Long (40 marks, 100 min):** A q004, q005, q015, q016, q017, q027, q028, q029, q038, q054, q018, q030 · B q009, q022, (q048 or q059) · C q023, q035, q050, (q036 or q060) · D q062, (q064 or q066).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 6/6 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-chemistry.md`.

## Verifier pass (2026-10-30)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Specific stems.** Every stem names its ion, compound, ore or data set (Mohr’s salt, TiO₂ pigment, Ni(CO)₄ in the Mond process, manganese(III) acetate, AgF₂, TiC tool coatings, …) so that it stays unique in the shared bank. CBSE 12 ch04 covers similar ground; no stem or data set is reused from it.
2. **Narration fixes.** The first build flagged three check-slide narrations that contained superscript configurations (d⁵, d⁰); they now say "half-filled", "empty" and "completely filled" in words. Rebuilt: validator, stage-4 lint and deterministic verify all clean.
3. **Every numerical re-computed** by the build script (spin-only moments from √(n(n+2)), the quadratic for n, the ionisation energy sum and the brass percentage).

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

