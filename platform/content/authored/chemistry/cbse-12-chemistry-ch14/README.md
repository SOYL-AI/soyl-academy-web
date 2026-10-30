# CBSE Class 12 Chemistry, Chapter 14 — Chemistry in Everyday Life (formative assessment only)

`cbse-12-chemistry-ch14` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

The syllabus marks this chapter `board_assessed: false` (formative assessment only). It is authored to the same standard as the board chapters so that schools can use it for periodic tests; the title slide says it is not in the board exam.

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 12 slides), notes (5 sections), 31 flashcards, 71 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12chem_ch14_short` (20 marks, 40 min) and `t_cbse12chem_ch14_long` (40 marks, 90 min), laid out exactly as the default blueprints `cbse-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | Authoring sources (same builder as ch01): `lib.mjs`, `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/cbse-12-chemistry-ch14/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- Both syllabus topics are covered: t01 chemicals in medicines (analgesics, tranquilisers, antiseptics, antibiotics, antacids, antihistamines, plus drug–target interaction, disinfectants and antifertility drugs as context) and t02 chemicals in food (preservatives, artificial sweeteners, antioxidants).
- **Not covered:** cleansing agents (soaps and detergents). They are part of the textbook chapter but are not named in the syllabus learning outcomes (`catalog/cbse/12/chemistry/syllabus.yaml`), so they were left out to keep every item on a syllabus topic.
- Medicines are treated at textbook level (classes, examples, mode of action). No item gives dosing advice; the title slide says medicines are taken only as a doctor advises.
- Facts a reviewer may wish to double-check: relative sweetness (aspartame 100, saccharin 550, sucralose 600, alitame 2000); phenol 0.2% antiseptic vs 1% disinfectant; chlorine 0.2–0.4 ppm in drinking water; tincture of iodine 2–3%; classification of named antibiotics as bactericidal/bacteriostatic and broad/narrow spectrum.

## Shape
- **Part 1 (t01), 15 slides:** everyday situations; drugs and medicines; enzymes as targets (diagram); receptors as targets (diagram); worked example (enzyme or receptor?); antacids and antihistamines; worked example (0.58 g Mg(OH)₂ for 0.020 mol HCl); tranquilisers and analgesics; antibiotics; antiseptics, disinfectants and antifertility drugs; summary; exam tips.
- **Part 2 (t02), 12 slides:** food additives; why chemicals are added; artificial sweeteners; worked example (60 mg saccharin for 33 g sugar; heat stability); preservatives; worked example (0.1% sodium benzoate in 750 g squash); antioxidants; summary; exam tips.
- Layouts: title 2, concept 9, diagram 2, example 4, check 6, summary 2, exam-tips 2.
- **Visuals in decks:** table 18, flow 1, svg 2 (no gap longer than one slide). **Diagrams (2 hand-written SVGs):** enzyme active site with substrate vs competitive inhibitor; membrane receptors with messenger (agonist) vs antagonist.
- **Narration:** 13–74 words (mean 50); no formulae or symbols.

## Question bank (71)
| Type | Count | Marks |
|---|---|---|
| mcq | 24 | 1 (keys a 6, b 6, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 8 | 1 (keys a c b c d a c b) |
| true-false | 5 | 1 |
| fill-blank | 2 | 1 |
| match | 3 | 2 |
| numerical | 7 | 1 or 2 (0.015 mol HCl per Al(OH)₃ tablet; 0.224 L CO₂; 20 g phenol; 1.0 g iodine; 0.40 g aspartame; saccharin/alitame mass ratio 3.64; 20 g sodium benzoate) |
| short | 9 + 4 | 2 / 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Difficulty:** d1 19 · d2 35 · d3 14 · d4 3.
- **Competency:** recall 12 · understanding 25 · application 29 · analysis 5. Application or higher is **48% of items (49% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 46 · t02 25.
- **Cases:** acidity after a feast (Mg(OH)₂ action, 0.87 g for 0.030 mol HCl, why not baking soda or how ranitidine differs); a rural clinic’s stock (disinfectant choice, 8000 L of water per chlorine tablet, antiseptic and analgesic choice or antibiotic types); a juice carton label in Nagpur (ascorbic acid, 0.52 g sodium benzoate, sweetness without added sugar or fate of benzoate); a diabetic family’s sweeteners (aspartame not for baking, 0.10 g sucralose, alitame’s potency or aspartame vs sucralose mass).
- **Deck checks:** q001, q011, q024 (Part 1); q044, q045, q046 (Part 2) — all objective.

## Chapter tests (default blueprints)
- **Short (20 marks, 40 min):** A q002, q009, q048 (MCQ), q006 (A-R) · B q021, q060 (2 marks), q023 (3 marks) · C q042 or q065 · D q070.
- **Long (40 marks, 90 min):** A q003, q008, q010, q012, q025, q026, q028, q049 (MCQ), q018, q054 (A-R) · B q038, q040, (q061 or q062), q041, (q063 or q064) · C q066 + (q043 or q067) · D q068, q069.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; every numerical re-solved by the build.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-chemistry.md`.

## Verifier pass (2026-10-30)
Every question, case part and alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Difficulty spread.** The first build had no difficulty 4–5 items (lint warning); three analysis items (prontosil → sulphanilamide, the phenol A-R, the antihistamine/acid T-F) were raised to d4.
2. **Scope.** Soaps and detergents were deliberately left out (not in the syllabus outcomes); noted above for the reviewer.
3. **Safety.** Items name drug classes and textbook examples only; no doses for patients are given (numericals use antacid neutralisation, antiseptic concentrations and food-additive limits).
4. **Originality.** All data (feast acidity case, rural clinic, Nagpur juice label, sweetener comparisons, 25 kg ketchup batch) are fresh; no textbook or sample-paper wording.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised (no rasteriser is installed in this worktree).
- Structural formulae of drugs and sweeteners are not drawn.
