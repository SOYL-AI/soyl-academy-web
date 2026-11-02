# CBSE Class 11 Biology, Chapter 15 — Body Fluids and Circulation

`cbse-11-biology-ch15` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 17 slides), notes (4 sections, 1 display formula), 31 flashcards, 70 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11bio_ch15_short` (20 marks, 40 min) and `t_cbse11bio_ch15_long` (40 marks, 90 min), laid out as the default blueprints `cbse-11-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in either. |
| `src/` | `calc.mjs` (textbook values for blood, WBC shares, cycle length, cardiac output, stroke volume, heart rate from QRS counts, ABO donor lists computed from antigens and antibodies, the hypertension rule, every worked number — each asserted with `check`), `svgs.mjs` (heart section, ECG trace computed from smooth waves, double-circulation schematic), `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../cbse-11-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/cbse-11-biology-ch15/src/build.mjs` (deterministic; the tree stays clean; `CH_OUT=<dir>` writes a trial build elsewhere). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All four syllabus topics (t01–t04) are covered; the chapter has no removed topics in the 2026-27 syllabus. Class 11 has no board exam, so items follow the CBSE school-examination pattern.
- Depth: sponges and coelenterates versus body fluids; plasma (55 percent; 90–92 percent water; 6–8 percent proteins — fibrinogen, globulins, albumins; minerals, nutrients, inactive clotting factors; serum); formed elements (45 percent): RBCs (5–5.5 million per cubic mm, red bone marrow, no nucleus, biconcave, haemoglobin 12–16 g per 100 mL, 120 days, spleen), WBCs (6000–8000; neutrophils 60–65, eosinophils 2–3, basophils 0.5–1, lymphocytes 20–25, monocytes 6–8 percent, with roles), platelets (1.5–3.5 lakh, megakaryocytes); ABO grouping with the donor table; Rh grouping (nearly 80 percent Rh positive), sensitisation, erythroblastosis foetalis and anti-Rh prevention; coagulation (platelet and tissue factors, cascade, thrombokinase, prothrombin to thrombin, fibrinogen to fibrin, calcium ions); tissue fluid and lymph (lymphocytes, lacteals); open and closed circulation; 2-, 3- and 4-chambered vertebrate hearts and single, incomplete double and double circulation; the human heart (pericardium, septa, tricuspid, bicuspid and semilunar valves, SAN, AVN, AV bundle, bundle of His, Purkinje fibres, autoexcitable nodal tissue, pacemaker 70–75 per minute); the cardiac cycle (joint diastole, atrial systole adding about 30 percent, ventricular systole and diastole, lub and dub, 72 per minute, 0.8 s, stroke volume 70 mL, cardiac output 5 L); the ECG (leads on both wrists and left ankle; P, QRS, T; rate from QRS counts); double circulation, hepatic portal and coronary systems; regulation (myogenic heart, medulla oblongata, sympathetic, parasympathetic, adrenal medullary hormones); hypertension (120/80 normal; 140/90 or higher), CAD and atherosclerosis, angina pectoris, heart failure versus cardiac arrest and heart attack.

## Shape
- **Part 1 (t01), 16 slides:** plasma; formed elements; worked example (5000 mL blood: 2750 mL plasma, 2250 mL formed elements, 750 g haemoglobin, computed); leucocytes; worked example (7000 WBCs: 4340 neutrophils, 1540 lymphocytes, computed); ABO table (computed); Rh and pregnancy; coagulation; tissue fluid and lymph; summary; exam tips; 4 checks.
- **Part 2 (t02–t04), 17 slides:** circulatory pathways and vertebrate hearts; heart section; nodal tissue; cardiac cycle; worked example (60/72 ≈ 0.833 s; 70 × 72 = 5040 mL per minute, computed); ECG; worked example (18 QRS in 15 s → 72 per minute, computed); double circulation; regulation; disorders; summary; exam tips; 4 checks.
- **Visuals (23 of 33 slides; no gap longer than one slide):** table 14, flow 5, svg 4 (plus notes visuals).
- **Diagrams (3 SVGs, 7 uses across decks and notes):** section of the heart with valves, great vessels and nodal tissue; standard ECG with P, QRS, T and one R–R cycle; double-circulation schematic. Every SVG was rasterised (headless Chromium, theme tokens substituted) and checked by eye.
- **Narration:** 7–66 words (mean 39).

## Question bank (70)
| Type | Count | Marks |
|---|---|---|
| mcq | 28 | 1 (keys a 7, b 7, c 7, d 7) |
| assertion-reason | 6 | 1 (keys b c a d a d) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 1 | 2 |
| numerical | 6 | 1 (3300 mL plasma; 2000 lymphocytes; 32 Rh positive; 5250 mL per minute; 0.67 s; about 139 mL) |
| short | 7 + 6 | 2 / 3 |
| long | 6 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every passage has `passage_origin: "soyl-original"`; `word_limit` on all 19 short/long items.
- **Difficulty:** d1 22 · d2 29 · d3 18 · d4 1 (evaluating a magazine claim about heart failure and exercise chest pain).
- **Competency:** recall 12 · understanding 23 · application 31 · analysis 3 · evaluation 1. Application or higher is **50% of items (56% of marks)**, inside the 45–65 % band.
- **Topic tags:** t01 26 · t02 26 · t03 9 · t04 11.
- **Cases:** blood-bank volunteers (anti-B, 2 safe donors computed from antigens, universal donor and recipient or Rh sensitisation); a cut finger and citrated blood (thrombin, 2.4 lakh = 240000 platelets, calcium ions or low platelets); an athlete’s ECG (T wave, 21 QRS in 15 s → 84 per minute, normal AV conduction or cardiac output 5880 mL); an office worker’s blood pressure (hypertension, 65 × 80 = 5200 mL per minute, harms of hypertension or parasympathetic control).
- **Deck checks:** RBC features, safe donors for group B, Rh A-R, lymph (Part 1); pacemaker, P wave, myogenic heart A-R, 146/94 reading (Part 2) — all objective.
- **Re-solves:** 16 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (default blueprints)
- **Short:** A plasma, mitral valve, medulla oblongata (MCQ), semilunar valves (A-R) · B plasma constituents (2), open and closed systems (2), clotting sequence (3) · C composition of blood or structure of the heart · D blood-bank case.
- **Long:** A fibrinogen, neutrophil tally, Rh-negative mother, citrate, three-chambered heart, lub, sprinter, heart failure versus arrest (MCQ), RBC count, 130/85 reading (A-R) · B tissue fluid and lymph, a 2:1 ECG, (nodal path or hypertension), ABO antigens and antibodies, (cardiac cycle events or double circulation) · C emergency transfusion and Rh pregnancy + (cardiac cycle with calculations or evaluating the magazine claim) · D athlete ECG case, office-worker blood-pressure case.

## Validation
- Author validator (in the build): 32 maths strings parse; 7 SVG uses / 3 distinct diagrams pass the allow-list; narration clean; 16/16 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.
- Stem checks: no exact duplicate stems against this worktree or the main checkout (which holds ICSE 10 Biology); no near-duplicate stems (word 5-gram Jaccard ≥ 0.5) against either.
- `verify --authored` and `originality --authored` are run by the producer for the whole subject.

## Verifier pass (2026-11-01)
Every question, case part and alternative was re-solved from its stem. Fixes made:
1. **Answer-length cues.** In eight MCQs (fish circulation, Rh-negative mother, lymph, P wave, parasympathetic drug, angina, CAD deposits, the case T-wave part) the key was much longer than the distractors; distractors were rewritten to similar length.
2. **Diagrams after rasterising.** The heart canvas was widened so the right-hand labels (bicuspid valve, pulmonary veins) no longer overlap the ventricle outline; the left pulmonary-artery branch was shortened to stop short of the superior vena cava; in the double-circulation schematic the pulmonary-artery label was moved off the pulmonary-vein label and the venae cavae line moved clear of its caption.
3. **Example slide maths.** “cardiac output $=$ …” written as words so the arithmetic checker sees only numeric equalities.

## For a reviewer
- Blood counts and shares (RBC 5–5.5 million, WBC 6000–8000, platelets 1.5–3.5 lakh, haemoglobin 12–16 g per 100 mL, WBC percentages, 80 percent Rh positive) are the textbook’s typical values; laboratory normal ranges differ slightly, as the notes say.
- The cycle length is 60/72 ≈ 0.83 s; the textbook rounds it to 0.8 s, and the bank accepts both.
- Cardiac output from 70 mL × 72 is 5040 mL, quoted as “about 5000 mL (5 L)”; the 25 L per minute at 180 beats (stroke volume about 139 mL) for a trained cyclist is illustrative.
- The 5000 mL and 6000 mL blood volumes, the 7000 and 8000 WBC counts, the hospital, ECG and blood-pressure figures are illustrative.
- The heart drawing is a schematic front view: the person’s right on the viewer’s left; the right pulmonary-artery branch is drawn passing behind the aorta. The ECG amplitudes are not to scale.
- The 2:1 ECG item (`ecg-short`) and the “why only group O Rh-negative before typing” part of `groups-long` apply textbook ideas beyond the textbook’s own examples; check that the reasoning reads as intended for Class 11.
- Heart failure is distinguished from cardiac arrest and heart attack exactly as in the textbook.
