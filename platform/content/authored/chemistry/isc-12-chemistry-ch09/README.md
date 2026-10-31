# ISC Class 12 Chemistry, Chapter 9 — Potassium Permanganate and Potassium Dichromate

`isc-12-chemistry-ch09` · release v1 · academic year 2026-27 (ISC 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 14 slides), notes (4 sections), 31 flashcards, 66 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12chem_ch09_short` (20 marks, 50 min) and `t_isc12chem_ch09_long` (40 marks, 100 min), laid out exactly as the ISC default blueprints `isc-12-default-chapter-test-short` / `-long` (Sections A–D, internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the CBSE 12 Chemistry builder adapted for ISC ids, the ISC blueprints and no default word limits), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-12-chemistry-ch09/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC syllabus, not NCERT)
- All four syllabus topics are covered: t01 KMnO₄ — properties, structure and shape of MnO₄⁻ (and MnO₄²⁻), preparation from pyrolusite (fusion, then electrolytic oxidation or disproportionation); t02 oxidising action of KMnO₄ in acidic (FeSO₄, oxalic acid, KI), basic (KI → IO₃⁻) and neutral (H₂S) media, self-indicator action and redox titrations; t03 K₂Cr₂O₇ — structure of CrO₄²⁻ and Cr₂O₇²⁻, preparation from chromite; t04 oxidising action of K₂Cr₂O₇, its use in titrations (primary standard, diphenylamine) and the chromate ⇌ dichromate interconversion with pH.
- General d-block properties stay in ch07.
- Facts a reviewer may wish to double-check: E°(MnO₄⁻/Mn²⁺) = +1.52 V and E°(Cr₂O₇²⁻/Cr³⁺) = +1.33 V; KMnO₄ decomposes near 513 K; Cr–O–Cr ≈ 126°, terminal Cr–O ≈ 163 pm and bridging Cr–O ≈ 179 pm; oxalic acid titrations at about 333 K.

## Shape
- **Part 1, 15 slides:** overview flow; properties of KMnO₄; structure of manganate and permanganate (SVG); preparation from pyrolusite; worked example (oxidation states in the disproportionation); oxidising action in acid; in basic and neutral media; worked example (balancing MnO₄⁻ with H₂O₂); KMnO₄ in titrations; worked example (oxalic acid titration, 20.0 mL); summary; exam tips; three checks.
- **Part 2, 14 slides:** overview flow; preparation from chromite; worked example (chromium through the process); structures of chromate and dichromate (SVG); chromate ⇌ dichromate with pH; oxidising action in acid; worked example (ethanol oxidation); K₂Cr₂O₇ in titrations (comparison with KMnO₄); worked example (0.336 g iron); summary; exam tips; three checks.
- Layouts: title 2 · concept 9 · diagram 2 · example 6 · check 6 · summary 2 · exam-tips 2. Visuals: flow 3 · svg 2 · table 18. Two SVGs (manganate and permanganate ions; chromate and dichromate ions), reused from the CBSE 12 ch04 set. Narration 10–67 words (mean 49), no symbols, formulae or unit abbreviations.

## Question bank (66)
| Type | Count | Marks |
|---|---|---|
| mcq | 21 | 1 (keys a 6, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys a b c a d) |
| true-false | 4 | 1 |
| fill-blank | 4 | 1 |
| match | 1 | 2 |
| numerical | 9 | 1 or 2 (47.4 g KMnO₄; 15.0 mL KMnO₄; 0.588 g Mohr’s salt; equivalent masses 31.6 and 49; 0.127 g I₂; 3.5 mol O₂; 0.0333 M K₂Cr₂O₇; 25.0 mL K₂Cr₂O₇; 83.4% purity; 60.5% iron; 0.020 M KMnO₄; 16.7 mL) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 8 | 3 (calculations with full working, reasons, comparisons, derivations) |
| long | 5 | 5, set in parts with marks shown, e.g. [2] + [3] |

- No case-based items: the ISC pattern has none (long answers carry the stimulus or calculation instead).
- **Difficulty:** d1 7 · d2 41 · d3 15 · d4 3.
- **Competency:** recall 7 · understanding 19 · application 34 · analysis 6. Application or higher is **61% of items (68% of marks)**, inside the 45–65% band and in line with the ISC aim of about half the marks on higher-order skills.
- **Topic tags:** t01 13 · t02 23 · t03 12 · t04 20.
- **Deck checks:** q001, q013, q014 (Part 1); q044, q045, q046 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC default blueprints)
- **Short (20 marks, 50 min):** A q002, q015, q034, q047, q006 · B q027, (q028 or q057) · C q031, (q012 or q059) · D q065.
- **Long (40 marks, 100 min):** A q003, q004, q005, q016, q017, q018, q033, q035, q048, q049, q019, q050 · B q010, q029, (q041 or q058) · C q030, q032, q043, (q060 or q061) · D q062, (q063 or q064).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 9/9 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-chemistry.md`.

## Verifier pass (2026-10-30)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Specific stems.** Every stem names its reagent, medium or data set (green vitriol, Mohr’s salt, nitrite, tin(II), SO₂ test paper, alloy assay, …). CBSE 12 ch04 covers both oxidants; its stems, equations sets and titration data are not reused.
2. **First build clean.** Validator, stage-4 lint and deterministic verify reported no findings; every mhchem equation was re-balanced by hand for atoms and charge.
3. **Every numerical re-computed** by the build script.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

