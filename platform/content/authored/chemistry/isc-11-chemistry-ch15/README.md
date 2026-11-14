# ISC Class 11 Chemistry, Chapter 15 — Common Ion Effect, Salt Hydrolysis, Buffers and Solubility Product

`isc-11-chemistry-ch15` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (writer Sonnet 5.5 (claude-sonnet-5-5): drafted by one writer (stopped by a usage limit before reporting), then checked and corrected by a second Sonnet writer; reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 19 slides), notes (6 sections), 31 flashcards, 68 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11chem_ch15_short` (20 marks, 50 min) and `t_isc11chem_ch15_long` (40 marks, 100 min), laid out exactly as the class-default blueprints `isc-11-default-chapter-test-short` / `-long` (four sections A–D as in the ISC 2027 specimens: objective items, 2-mark and 3-mark short answers, 5-mark long answers set in parts, with internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder with ISC 11 ids and blueprints and the assertion-reason options of the ISC 2027 Chemistry specimen; the pipeline’s verify checks, an answer-leak scan and an atom-balance check of equations with = or # bonds run inside the build), `data.mjs`, `decks.mjs`, `q-objective.mjs`, `q-written.mjs`, `questions.mjs`, `study.mjs`, `svgs.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-11-chemistry-ch15/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC 2028 syllabus, Class XI portion)
- All 4 syllabus topics are covered: t01 Common ion effect: acetic acid with sodium acetate, ammonium hydroxide with ammonium chloride; use in salt analysis; t02 Hydrolysis of salts of strong acid-weak base, weak acid-strong base and weak acid-weak base; pH of their solutions; t03 Buffer solutions: types, action and explanation by Le Chatelier's principle; Henderson equation; t04 Solubility and solubility product; application in qualitative analysis of group II, III and IV cations.
- Common ion effect (ethanoic acid with sodium ethanoate, ammonium hydroxide with ammonium chloride) and its use in group II, III and IV analysis; hydrolysis of the three salt types with pH formulae; acidic and basic buffers, buffer action and the Henderson equation; solubility and Ksp for AB, AB₂ and A₂B salts, precipitation (ionic product against Ksp) and the common-ion lowering of solubility.
- Facts a reviewer may wish to double-check: Kw = 1.0 × 10⁻¹⁴; Ka(ethanoic acid) = Kb(ammonia) = 1.8 × 10⁻⁵ (pK 4.74); Ka(methanoic acid) = 1.8 × 10⁻⁴ (pKa 3.74); Ka(HCN) = 4.9 × 10⁻¹⁰ (pKa 9.31). Ksp at 298 K: AgCl 1.8 × 10⁻¹⁰, BaSO₄ 1.1 × 10⁻¹⁰, PbI₂ 7.1 × 10⁻⁹, Ag₂CrO₄ 1.1 × 10⁻¹², CaF₂ 3.4 × 10⁻¹¹, AgI 8.5 × 10⁻¹⁷; given values Mg(OH)₂ 1.8 × 10⁻¹¹, Fe(OH)₃ 4.0 × 10⁻³⁸, CuS 6.0 × 10⁻³⁶, MnS 2.5 × 10⁻¹⁰, CdS 8 × 10⁻²⁷; H₂S Ka1·Ka2 = 1.2 × 10⁻²⁰ with saturated H₂S 0.10 M (given). Mg(OH)₂ is used only as a later-group hydroxide that stays in solution in group III.

## Shape
- **Part 1, 17 slides:** the common ion effect; quantitative picture: acid with its salt; worked example (ethanoic acid with sodium ethanoate); ammonium hydroxide with ammonium chloride; use in salt analysis; hydrolysis of salts; where salt solutions fall on the pH scale; strong acid and weak base: NH₄Cl; weak acid and strong base: sodium ethanoate; worked example (pH of two salt solutions); weak acid and weak base; summary; exam tips; 3 checks.
- **Part 2, 19 slides:** what is a buffer?; how a buffer works: Le Chatelier's principle; the Henderson equation; worked example (buffer pH); solubility and solubility product; comparing solubilities; worked example (s from Ksp and Ksp from s); will a precipitate form?; worked example (mixing two solutions); common ion lowers solubility; selective precipitation; group II: sulphides in acidic medium; groups III and IV with NH₄Cl and NH₄OH; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 14 · diagram 5 · example 5 · check 6 · summary 2 · exam-tips 2. Visuals: flow 2 · svg 6 · table 22. SVGs: pH with and without the common ion, the pH scale of salt solutions, a buffer curve, Ksp bars, AgCl solubility against chloride concentration and the ionic product against Ksp line; all rendered and checked by eye. Narration 37–60 words (mean 51), no symbols, formulae or unit abbreviations.

## Question bank (68)
| Type | Count | Marks |
|---|---|---|
| mcq | 24 | 1 (keys a 6, b 6, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a b c d a b; options in the order of the ISC 2027 Chemistry specimen, with (d) both false) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 5 | 1–3 (4.89; 10.52; 7.5 g; 1.06; 4.14) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 10 | 3 |
| long | 6 | 5, set in parts |

- **Difficulty:** d1 6 · d2 23 · d3 36 · d4 3.
- **Competency:** recall 6 · understanding 25 · application 19 · analysis 18. Application or higher is **54% of items (68% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 14 · t02 16 · t03 19 · t04 23.
- **Deck checks:** q001, q031, q039 (Part 1); q012, q040, q023 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC 11 class-default blueprints)
- **Short (20 marks, 50 min):** A q002, q006, q011, q018, q025 · B q044, (q045 or q046) · C q053, (q054 or q055) · D q063.
- **Long (40 marks, 100 min):** A q003, q004, q007, q008, q010, q013, q014, q016, q019, q020, q026, q027 · B q047, q048, (q050 or q051) · C q056, q058, q059, (q060 or q061) · D q064, (q065 or q066).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (16 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 26/26 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean. Bonded-equation (= / #) balance check: 0 errors.
- Gates: see the handoff `docs/platform/handoffs/2026-11-09-subject-producer-isc11-chemistry.md`.

## Verifier pass (2026-11-14)
Every question and internal-choice alternative was re-solved from its stem by the writer; the producer (Claude Opus 5.5) then reviewed every item: the key and solution, the marking scheme, the competency tag (by what the item asks, not to move the share), the topic ids, the assertion-reason logic and the flagged facts. Findings and fixes:
1. Second writer: a narration slip (NH₄Cl pH falls, not rises, with concentration), a self-contradictory buffer stem, options that printed the ionic product, a Ksp comparison that tested nothing (now AB against AB₂ with the smaller Ksp more soluble), two (b)-key reasons made clearly unrelated, an all-false true-false set, significant figures in five stems, a Ksp key put in units of 10⁻¹⁰, scheme values aligned with the computed ones and 14 items moved from d4 to d3.
2. Producer: the answers had been computed with pK = 4.745 and 3.745 while the stems printed 4.74 and 3.74, so five keys (for example a buffer pH of 5.05 against 5.04 from the printed data) did not follow from the stated data; every computation now uses the printed 2-decimal values.
3. The producer re-solved every numerical and objective key: hydrolysis constants and pH, buffer pH and composition, solubility from Ksp, precipitation tests and the common-ion solubility.
4. Second producer review (2026-11-14): six plain-text solution lines printed raw LaTeX ("2.0 \times 10^{-4}") outside maths; the numbers are now set as inline maths.
5. Competency tags: five one-step items were tagged application and are now understanding (Kh = Kw/Ka for methanoate, s = √Ksp for BaSO₄, the pH of a buffer from one Henderson substitution in two items, and the textbook derivation of Kh = Kw/Ka). Application or higher went from 62% to 54% of items; no item was moved the other way.

## Known gaps
- Narration audio is not generated (TTS stage).

