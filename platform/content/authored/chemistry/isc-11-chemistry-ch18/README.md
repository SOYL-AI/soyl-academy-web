# ISC Class 11 Chemistry, Chapter 18 — Isomerism

`isc-11-chemistry-ch18` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (writer Sonnet 5.5 (claude-sonnet-5-5); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 17 slides), notes (7 sections), 31 flashcards, 67 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11chem_ch18_short` (20 marks, 50 min) and `t_isc11chem_ch18_long` (40 marks, 100 min), laid out exactly as the class-default blueprints `isc-11-default-chapter-test-short` / `-long` (four sections A–D as in the ISC 2027 specimens: objective items, 2-mark and 3-mark short answers, 5-mark long answers set in parts, with internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder with ISC 11 ids and blueprints and the assertion-reason options of the ISC 2027 Chemistry specimen; the pipeline’s verify checks, an answer-leak scan and an atom-balance check of equations with = or # bonds run inside the build), `decks.mjs`, `isokit.mjs`, `molkit.mjs`, `questions.mjs`, `study.mjs`, `svgs.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-11-chemistry-ch18/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC 2028 syllabus, Class XI portion)
- All 4 syllabus topics are covered: t01 Structural isomerism: chain, position, functional, metamerism and tautomerism; t02 Geometrical isomerism: conditions; cis-trans and syn-anti forms; t03 Optical isomerism: plane-polarised light, Nicol prism, polarimeter, specific rotation; conditions for optical activity; t04 d and l forms; racemic mixture and meso form; external and internal compensation; lactic acid and tartaric acid.
- Structural isomerism (chain, position, functional, metamerism, keto–enol tautomerism), geometrical isomerism in alkenes and the syn/anti isomers of aldoximes, plane-polarised light, the Nicol prism and the polarimeter, specific rotation, chirality, enantiomers, the d, l, racemic and meso forms with external and internal compensation, and counting stereoisomers (2ⁿ, fewer for symmetrical molecules).
- Facts a reviewer may wish to double-check: Isomer counts recomputed by an enumerator: C₄H₁₀O 7 structural (4 alcohols, 3 ethers), C₅H₁₂O 8 alcohols. cis- and trans-1,2-dichloroethene: dipole about 1.9 D and 0, boiling points about 333 K and 321 K. But-2-ene: melting points about 134 K (cis) and 168 K (trans), boiling points about 277 K and 274 K. Specific rotations (given): sucrose +66.5°, glucose +52.7°, fructose −92.4°. Ethanol 351 K and methoxymethane 249 K. Stereoisomer counts: lactic acid 2, tartaric acid 3, 2,3-dibromopentane and pentane-2,3-diol 4, 2,3-dichlorobutane 3.

## Shape
- **Part 1, 17 slides:** types of isomerism; chain, position, functional and metamerism; how to recognise each type; all the isomers of C₄H₁₀O; worked example (classifying pairs of isomers); tautomerism; which compounds show keto–enol tautomerism?; geometrical isomerism: the conditions; cis and trans isomers differ in properties; worked example (which alkenes show cis–trans isomerism?); syn and anti isomerism in oximes; summary; exam tips; 3 checks.
- **Part 2, 17 slides:** the Nicol prism; the polarimeter; dextro- and laevorotatory; specific rotation; worked example (observed rotation); worked example (concentration from rotation); chirality and the asymmetric carbon; lactic acid: a pair of enantiomers; d and l forms and the racemic mixture; tartaric acid: three stereoisomers; meso form and internal compensation; how many stereoisomers?; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 12 · diagram 6 · example 4 · check 6 · summary 2 · exam-tips 2. Visuals: flow 1 · svg 11 · table 16. SVGs: the four structural types, all seven C₄H₁₀O isomers, keto–enol tautomerism, cis–trans conditions, syn and anti oximes, the Nicol prism, the polarimeter, the chiral carbon, lactic acid enantiomers, the three tartaric acids and the meso mirror plane; rendered and checked by eye. Narration 11–79 words (mean 53), no symbols, formulae or unit abbreviations.

## Question bank (67)
| Type | Count | Marks |
|---|---|---|
| mcq | 24 | 1 (keys a 6, b 6, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys b b a c d c; options in the order of the ISC 2027 Chemistry specimen, with (d) both false) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 4 | 1–3 (-56 °; 18.6 °; 0.035 g mL⁻¹; 8) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 10 | 3 |
| long | 6 | 5, set in parts |

- **Difficulty:** d1 15 · d2 37 · d3 13 · d4 2.
- **Competency:** recall 5 · understanding 29 · application 24 · analysis 9. Application or higher is **49% of items (61% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 20 · t02 15 · t03 18 · t04 16.
- **Deck checks:** q001, q002, q020 (Part 1); q035, q036, q052 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC 11 class-default blueprints)
- **Short (20 marks, 50 min):** A q005, q021, q039, q053, q025 · B q014, (q015 or q016) · C q030, (q050 or q064) · D q033.
- **Long (40 marks, 100 min):** A q003, q004, q008, q022, q024, q038, q040, q054, q055, q023, q009, q057 · B q027, q046, (q047 or q063) · C q017, q031, q048, (q049 or q065) · D q034, (q051 or q067).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (56 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 11/11 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean. Bonded-equation (= / #) balance check: 0 errors.
- Gates: see the handoff `docs/platform/handoffs/2026-11-09-subject-producer-isc11-chemistry.md`.

## Verifier pass (2026-11-14)
Every question and internal-choice alternative was re-solved from its stem by the writer; the producer (Claude Opus 5.5) then reviewed every item: the key and solution, the marking scheme, the competency tag (by what the item asks, not to move the share), the topic ids, the assertion-reason logic and the flagged facts. Findings and fixes:
1. First producer (before the session ended): rewrote the syn/anti oxime MCQ and the polarimeter MCQ (sign and units) and re-laid several SVG labels.
2. Second producer review (2026-11-14): all 67 items re-read; polarimeter numericals re-solved (+33°, −42.0°, +7.20°, −56.0°, +18.6°, 0.0350 g mL⁻¹, −64.0°, 0.100 g mL⁻¹ and 25.0 g), chiral-carbon counts and stereoisomer numbers confirmed, and every distractor explanation in the polarimeter MCQs checked against its arithmetic.
3. Competency tags: writing the syn and anti structures of an oxime from the definition moved from application to understanding; application or higher is 49% of items.

## Known gaps
- Narration audio is not generated (TTS stage).

