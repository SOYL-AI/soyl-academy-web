# ICSE Class 10 Biology, Chapter 7 — Circulatory System: Blood and Lymph

`icse-10-biology-ch07` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 16 slides), notes (5 sections), 30 flashcards, 71 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10bio_ch07_short` (20 marks, 30 min) and `t_icse10bio_ch07_long` (40 marks, 60 min), laid out as `icse-10-biology-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../icse-10-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/icse-10-biology-ch07/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ICSE syllabus topics: **composition of blood** (plasma; structure, numbers, origin, life and functions of red cells, the five kinds of white cells and platelets; identification from a smear); the **efficiency of the mammalian red cell** (no nucleus, no mitochondria, biconcave shape); **blood coagulation** in brief (thromboplastin, prothrombin, thrombin, fibrinogen, fibrin; calcium, vitamin K, serum, heparin); **tissue fluid and lymph**, the lymphatic system, **spleen and tonsils**; the **ABO blood groups and the Rh factor** (universal donor and recipient, transfusion matching, Rh incompatibility). Plasma volume, differential-count percentages, the blood-report shortfall, the daily red-cell turnover and every donor/recipient decision are computed by `src/calc.mjs`.
- Style follows the ICSE 2027 Biology specimen paper (523; `sources/cisce.md` `icse-2027-specimen-523-biology`): biological terms, odd one out with its category, give-reason items, a 5-blank fill-in passage, a labelled-diagram match, assertion-reason items in the specimen's option order, and 10-mark questions that open with a situation, an experiment or a diagram.
- **Originality:** every situation, person and figure is imagined and written by SOYL; no ICSE textbook text, exercise or specimen item is reused (D-036). An exact-stem check against every authored bank (including CBSE 10 Science and CBSE/ISC 12 Biology) and `originality --authored` report no duplicates.

## Shape
- **Decks:** Part 1 (16 slides): Circulatory System: Blood and Lymph; Composition of blood; Worked example 1: how much plasma?; Blood cells under the microscope; Red cells, white cells and platelets; Quick check: the oxygen carrier; Kinds of white blood cells; Worked example 2: a differential count; Quick check: white cells; Why the red cell is so efficient; Quick check: no nucleus; How blood clots; Inside a clot; Quick check: the clotting chain; Summary; Exam tips. Part 2 (16 slides): Lymph and Blood Groups; Tissue fluid and lymph; Plasma, tissue fluid and lymph; Quick check: tissue fluid; The lymphatic system; Spleen and tonsils; Quick check: the spleen; The ABO blood groups; Worked example 1: who can give to whom?; Quick check: the universal donor; Finding a blood group; Worked example 2: reading the slide; The Rh factor; Quick check: Rh transfusions; Summary; Exam tips.
- **Visuals (22 of 32 slides):** flow 4, table 13, svg 5.
- **Diagrams (6 distinct SVGs):** all new — a stained blood smear with a red cell (face and side view), neutrophil, eosinophil, basophil, lymphocyte, monocyte and platelets (named, and a lettered A–E version for the diagram match); an enlarged red cell with its four efficiency features and an inset of a cell bending through a capillary; a clot with fibrin threads trapping red cells and platelets; tissue fluid forming at a capillary and draining into a lymph capillary, vessel with a valve and a node; a blood-grouping slide for four people with anti-A and anti-B sera and a key. Every SVG was rendered and checked by eye.
- **Narration:** 6–44 words per slide (mean 30); no symbols or abbreviations.

## Question bank (71 items, 151 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 28 | 28 (keys a 7, b 7, c 7, d 7) |
| true-false | 3 | 3 |
| fill-blank-1 | 2 | 2 |
| numerical | 2 | 2 |
| short-1 | 11 | 11 |
| short-2 | 6 | 12 |
| short-3 | 4 | 12 |
| assertion-reason | 6 | 6 (ICSE option order; keys c a d c b c) |
| fill-blank-5 | 2 | 10 |
| match-5 | 1 | 5 |
| case-based | 6 | 60 |

- **Case questions:** 6, each 10 marks in parts of 1–3 marks, some with an either/or part.
- **Difficulty:** d1 9 · d2 40 · d3 21 · d4 1.
- **Competency:** recall 14 · application 23 · understanding 24 · analysis 10. Application or higher is **46% of items (63% of marks)**, inside the 45–65 % lint band.

## Chapter tests (ICSE 10 Biology blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 3 short-1, 1 short-2 · B: 2 case (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 6 mcq, 1 assertion-reason, 3 short-1, 1 fill-blank (5), 1 match (5) · B: 3 case (10) (attempt 2 of 3).

## Verifier pass
- Every question, case part and alternative was re-solved from its stem; MCQ keys are balanced by the seeded placer (a 7, b 7, c 7, d 7); compatibility answers are re-checked against `canGive`/`canGiveRh` in the build.
- **Test overlap:** the clotting fill-in passage was replaced in the long test by a blood-composition passage, the clot case now asks for fibrin rather than platelets (the match names a platelet function), and the blood-report case's alternative no longer repeats the clotting chain.
- **Word limits:** one 3-mark case alternative (eosinophils and basophils) was expanded into the 35–70 word band.
- **Competency balance:** four application items were added (lymph flow in exercise, pus, an AB donor offered to a group O friend, daily red-cell turnover) and the lymph-node case was re-tagged as application (42% → 46% application or higher).
- **Figures:** an overlapping 'Agranulocytes' heading and a loose lymph-vessel leader were fixed after rendering.

## For a reviewer
- Typical values used: red cells about 5 million, white cells 5000–10 000 and platelets 2.5–4 lakh per cubic mm; red cell life about 120 days, white cells a few days, platelets about a week; plasma about 55% of blood.
- Monocytes are described as becoming large scavenger cells (macrophages) in the tissues; basophils as releasing histamine and heparin.
- The spleen is credited with storing blood and destroying worn-out red cells (with the liver).
- Lymph is said to drain into 'large veins near the heart' without naming them, because vessel names beyond the heart, liver and kidney are a removed topic in ch08.
- Rh prevention is described as an anti-Rh injection 'soon after' / 'within three days of' the first delivery.
- The blood report (Anil) and the differential count are imagined data with typical normal ranges; Leh is given as about 3500 m above sea level.
