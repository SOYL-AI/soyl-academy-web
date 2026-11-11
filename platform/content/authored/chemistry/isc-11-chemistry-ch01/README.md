# ISC Class 11 Chemistry, Chapter 1 — Some Basic Concepts: Measurement, Laws of Chemical Combination and Atomic Theory

`isc-11-chemistry-ch01` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (writer Sonnet 5.5 (claude-sonnet-5-5); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (19 + 18 slides), notes (6 sections), 31 flashcards, 68 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11chem_ch01_short` (20 marks, 50 min) and `t_isc11chem_ch01_long` (40 marks, 100 min), laid out exactly as the class-default blueprints `isc-11-default-chapter-test-short` / `-long` (four sections A–D as in the ISC 2027 specimens: objective items, 2-mark and 3-mark short answers, 5-mark long answers set in parts, with internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder with ISC 11 ids and blueprints and the assertion-reason options of the ISC 2027 Chemistry specimen; the pipeline’s verify checks, an answer-leak scan and an atom-balance check of equations with = or # bonds run inside the build), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-11-chemistry-ch01/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC 2028 syllabus, Class XI portion)
- All 5 syllabus topics are covered: t01 Importance and scope of chemistry; matter and its study; t02 Precision and accuracy; significant figures; SI units; t03 Dimensional analysis: conversion of units and its applications; t04 Laws of chemical combination: conservation of mass, definite, multiple and reciprocal proportions; Gay-Lussac's law of gaseous volumes; t05 Dalton's atomic theory: postulates and limitations; atoms and molecules.
- ISC-specific content: the law of reciprocal proportions (Richter) with data-verification items, Gay-Lussac's law of combining volumes with gas-volume stoichiometry, precision against accuracy with repeated readings, and dimensional analysis (L to m³, atm to Pa, km h⁻¹ to m s⁻¹).
- Facts a reviewer may wish to double-check: 1 atm = 101325 Pa; 1 L = 10⁻³ m³; N_A = 6.022 × 10²³ mol⁻¹; molar volume 22.4 L at STP; atomic masses H 1, C 12, N 14, O 16, Na 23, Mg 24, Al 27, P 31, S 32, Cl 35.5, Ca 40, Fe 56, Cu 63.5, Zn 65, Ba 137, Pb 207. Law data follow from standard formulae (H₂S/H₂O/SO₂; NH₃/H₂O/N₂O₃; PCl₃/PCl₅ 3.44 and 5.73 g Cl per g P; ZnO 0.802 Zn). The years in the laws table (Lavoisier 1789, Proust 1799, Dalton 1803, Gay-Lussac 1808; Richter 1790s) are the usual textbook dates. Invented measurements (precision readings, ethanol density 0.812 against 0.789 g cm⁻³, the 21.35 g / 25.0 mL sample) are given as student data.

## Shape
- **Part 1, 19 slides:** scope of chemistry; classification of matter; sI units and scientific notation; precision and accuracy; worked example (percentage error); significant figures: counting; significant figures in calculations; worked example (significant figures); dimensional analysis: the factor-label method; worked example (unit conversion); the volume ladder; applications of dimensional analysis; worked example (pressure times volume); summary; exam tips; 3 checks.
- **Part 2, 18 slides:** law of conservation of mass; worked example (conservation of mass); law of definite proportions; law of multiple proportions; worked example (multiple proportions); law of reciprocal proportions; worked example (reciprocal proportions); gay-Lussac’s law of combining volumes; worked example (combining volumes); dalton’s atomic theory; limitations of Dalton’s theory; avogadro’s molecule; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 13 · diagram 4 · example 8 · check 6 · summary 2 · exam-tips 2. Visuals: chem 1 · flow 3 · svg 5 · table 22. SVGs: precision/accuracy dot strips, volume-unit ladder, combining-volume boxes for N₂ + 3H₂ → 2NH₃, the reciprocal-proportions triangle (H, S, O) and conservation-of-mass bars; all rendered and checked by eye, with geometry self-checks. Narration 39–73 words (mean 59), no symbols, formulae or unit abbreviations.

## Question bank (68)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 | 1 (keys a 7, b 7, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a b a c c d; options in the order of the ISC 2027 Chemistry specimen, with (d) both false) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 3 | 1–3 (2.9 %; 355 kPa; 60 mL) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 10 | 3 |
| long | 6 | 5, set in parts |

- **Difficulty:** d1 14 · d2 35 · d3 16 · d4 3.
- **Competency:** recall 5 · understanding 25 · application 27 · analysis 11. Application or higher is **56% of items (66% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 6 · t02 14 · t03 12 · t04 26 · t05 10.
- **Deck checks:** q007, q008, q022 (Part 1); q034, q045, q059 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC 11 class-default blueprints)
- **Short (20 marks, 50 min):** A q001, q023, q039, q060, q013 · B q016, (q038 or q037) · C q018, (q055 or q066) · D q068.
- **Long (40 marks, 100 min):** A q002, q009, q010, q011, q024, q025, q035, q046, q050, q061, q056, q063 · B q017, q054, (q030 or q065) · C q031, q006, q019, (q040 or q047) · D q033, (q049 or q058).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (12 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 36/36 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean. Bonded-equation (= / #) balance check: 0 errors.
- Gates: see the handoff `docs/platform/handoffs/2026-11-09-subject-producer-isc11-chemistry.md`.

## Verifier pass (2026-11-09)
Every question and internal-choice alternative was re-solved from its stem by the writer; the producer (Claude Opus 5.5) reviewed the assertion-reason items, the objective keys, the flagged facts, the competency tags and the numericals. Findings and fixes:
1. Competency tags: the writer moved 8 one-step items (unit conversions, a percentage error, a volume ratio) from application to understanding after the first build. The producer re-judged all 8 against the stems: each is a single conversion or ratio with the numbers given, so understanding is the honest tag; no further change.
2. The density item showed the volume as 25 mL (two significant figures) while the key assumed 25.0 mL; the stem now prints 25.0 mL so the key 0.854 g mL⁻¹ is right.
3. A pressure stem printed raw LaTeX outside maths delimiters; fixed. Three solutions named distractors with a placeholder for a fifth option or the wrong letter; corrected to the letters actually placed.
4. An assertion-reason item called river water and tank water the same compound; it now compares pure water from two sources, and a match entry was reworded the same way.
5. The laws table no longer gives a single year for Richter (now 1790s).
6. One MCQ had two identical wrong options; a match stem that collided with a CBSE 11 stem was reworded (writer fixes).

## Known gaps
- Narration audio is not generated (TTS stage).

