# ISC Class 11 Biology, Chapter 17 — Body Fluids and Circulation

`isc-11-biology-ch17` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 18 slides), notes (6 sections), 30 flashcards, 83 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11bio_ch17_short` (20 marks, 50 min) and `t_isc11bio_ch17_long` (40 marks, 100 min), laid out as `isc-11-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck check-slide question is in a test. |
| `src/` | `calc.mjs` (blood volumes and counts, a donor-recipient compatibility engine for the eight ABO-Rh types, ABO and Rh inheritance, cycle times, joint diastole, stroke volume, cardiac output, heart rate from an ECG strip, pulse pressure, all asserted with `eq`), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-11-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/isc-11-biology-ch17/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All six ISC syllabus topics (t01–t06) of `platform/catalog/cisce/isc-11/biology/syllabus.yaml`: blood (plasma and plasma proteins, the corpuscles, a brief clotting cascade); ABO groups and the Rh factor with transfusion and erythroblastosis foetalis; lymph, the lymphatic system and open and closed circulation; the human heart, the cardiac cycle (auricular and ventricular systole and diastole, joint diastole), stroke volume and cardiac output; regulation of the heartbeat, the ECG, blood pressure, double circulation and the structure of artery, vein and capillary; hypertension, coronary artery disease, angina pectoris and heart failure.
- The syllabus lists no removed topics for this chapter. Scientist folded in: **Landsteiner** (ABO groups, 1900; the Rh factor with Wiener). Abbreviations: ECG, SA node, AV node, RBC, WBC, CAD (and the heart-sound names lub and dub appear in the notes only).
- Respiration and gas transport belong to ch16; excretion to ch18.

## Shape
- **Part 1 (t01–t03), 18 slides:** title; plasma and plasma proteins; worked example 1 (a 450 mL bag: 247.5 mL plasma and 202.5 mL cells, computed); red cells and platelets; white cells; check; clotting cascade (flow); check; ABO groups (Landsteiner); worked example 2 (donor and recipient counts among eight types, computed); check; Rh factor and erythroblastosis foetalis (flow); worked example 3 (children of AB × AO: A one half, AB and B one quarter each; Rh positive one half, computed); check; lymph; open and closed circulation; summary; exam tips.
- **Part 2 (t04–t06), 18 slides:** title; internal structure of the heart (labelled diagram); chambers, vessels and valves; the cardiac cycle (timeline diagram); worked example 1 (80 beats a minute: cycle 0.75 s, joint diastole 0.35 s, computed); worked example 2 (cardiac output 5440 mL a minute, 7833.6 L a day, computed); check; regulation of the heartbeat (flow); the ECG (diagram); worked example 3 (R–R 15 mm at 25 mm a second: 100 beats a minute, computed); check; artery, vein and capillary (diagram); double circulation (flow); blood pressure; disorders of circulation; check; summary; exam tips.
- **Visuals (29 of 36 slides; no gap longer than one slide):** table 19, flow 6, svg 4.
- **Diagrams (6 SVGs):** the heart in section and a lettered A–E version; the cardiac cycle as a timeline drawn from the computed phase times; a normal ECG (the waves are drawn, not measured) and a lettered A–D version; transverse sections of an artery, a vein and a capillary. Every SVG was rasterised and checked by eye; overlaps found were fixed.
- **Narration:** 7–55 words (mean 38); no digits, symbols or unit abbreviations.

## Question bank (83)
| Type | Count | Marks |
|---|---|---|
| mcq | 28 | 1 (keys a 7, b 7, c 7, d 7); 6 are deck checks; 5 use a lettered figure |
| assertion-reason | 3 | 1 (ISC options; keys a c d) |
| true-false | 5 | 1 |
| short, 1 mark | 5 | give-a-reason |
| fill-blank | 4 | 1 |
| match | 1 | 2 (blood groups against their antibodies) |
| numerical | 10 | 1 (25 trillion red cells; 8875 neutrophils; 165 mL plasma; 0.5 Rh positive; 27 compatible pairs; 5250 and 60 mL; 0.2 s; 56 mm Hg; 62.5 beats a minute) |
| short | 10 + 9 | 2 / 3, including donor lists, an Rh couple, cardiac outputs of a healthy man and a heart-failure patient |
| long | 6 | 5, in marked parts (clotting, the Rh factor, the heart, the cardiac cycle, the ECG, disorders) |
| case-based (stimulus) | 2 | 4 (1 + 1 + 2), part (c) either/or: three patients typed with three sera; a swimmer and an untrained student |

- **Difficulty:** d1 24 · d2 35 · d3 22 · d4 2.
- **Competency:** recall 19 · understanding 23 · application 35 · analysis 6. Application or higher is **49% of items (48% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 13 · t02 17 · t03 7 · t04 20 · t05 16 · t06 10.
- **Re-solves:** 19 scripted checks recompute keys and values from `calc.mjs`.

## Chapter tests (ISC defaults)
- **Short:** A neutrophils in infection, parents of a group O child, swollen arm after lymph nodes are removed, a vessel with a thin wall and flaps (MCQ), serum and clotting (A-R) · B valves of the heart; (functions of lymph nodes or the ECG) · C donors for an AB-negative patient; (events of the cardiac cycle or angina against heart failure) · D the heart: diagram and the path of blood.
- **Long:** A albumin and swelling, slide test with three sera, an open circulation, the aorta (lettered figure), valves during ejection, a slow heart with the same output, the vagus nerve, the return of blood to the heart, hypertension, the pacemaker (MCQ), universal recipient and angina (A-R) · B agglutination; stroke volume and cardiac output; (capillary or coronary artery disease) · C clotting; the three corpuscles; cardiac outputs; (lymph against blood or artery against vein) · D an ECG in parts; (the cardiac cycle or the Rh factor).

## Verifier pass (2026-11-04)
Every question, case part and alternative was re-solved from its stem. Fixes and checks:
1. **Maths lint.** The red-cell count solution wrote "2.5 × 10¹³ = 25", which the arithmetic lint rejects; it now converts to trillions in a separate step.
2. **Give-aways in the tests.** The tests were laid out so that no stem or option answers another item in the same test (for example the albumin item is kept out of the test with the plasma-protein question, the universal-recipient assertion out of the test with the donor-list question, the vagus-nerve item out of the test with the sympathetic and parasympathetic question, and the heart-failure and coronary-artery items out of the tests with the disorders questions).
3. **Different numbers.** The check slides and bank questions use values other than the worked examples (cardiac output 70 beats and 75 mL against 64 and 85; 300 mL of blood against a 450 mL bag; joint diastole at 100 beats a minute against 80).
4. **Typo.** One option read "The students' output"; it now reads "The student's output".
5. **Diagrams after rasterising.** The superior vena cava and the pulmonary artery overlapped in the heart diagram; the vena cava was moved to the left and the pulmonary artery given a short branch that ends beside it, and its label was moved above the heart.

## For a reviewer
- **Counts and ranges:** red cells 5 to 5.5 million, white cells 6000 to 8000 and platelets 1.5 to 3.5 lakh per mm³; neutrophils 60 to 65, lymphocytes 20 to 25, monocytes 6 to 8, eosinophils 2 to 3, basophils 0.5 to 1 percent; plasma 90 to 92 percent water and 6 to 8 percent protein. The arithmetic uses 92 and 7 percent for the plasma shares, and a 450 mL bag is a typical donation.
- **Rh figures:** books give 80 to 85 percent of people as Rh positive; no question depends on the exact value. The prevention of erythroblastosis is given as anti-Rh antibodies "soon after the first delivery" (the usual textbook wording; no time limit is stated).
- **Landsteiner:** the ABO groups are dated 1900 (published 1901 in some sources). The Rh antigen is credited to Landsteiner and Wiener and to the rhesus monkey; the common 1940 date is not stated in the chapter.
- **Compatibility:** the eight-type engine treats red-cell transfusion only (no antigen the recipient lacks), the usual textbook rule. Plasma compatibility is not taught. The 27 compatible pairs follow from the rule.
- **Cardiac cycle:** 0.8 s, with 0.1, 0.3 and 0.4 s, is the usual textbook value at 75 beats a minute. The joint-diastole worked examples keep the two systoles fixed, which is a simplification: in life the systoles also shorten at faster rates.
- **Heart sounds** (lub and dub) are in the notes only, because the syllabus does not list them.
- **ECG:** the 25 mm per second paper speed is a stated convention in every ECG question, not syllabus content. The drawn waves are schematic, and QRS and T are described as depolarisation and repolarisation of the ventricles, as in NCERT-based ISC books.
- **Regulation:** the SA node is in the wall of the right auricle; the bundle of His and the Purkinje fibres carry the impulse to the ventricles; sympathetic nerves and adrenaline speed the heart, and the vagus slows it.
- **Disorders:** angina is the pain of too little oxygen to the heart muscle, and heart failure is poor pumping, often called congestive because the lungs become congested; neither is cardiac arrest. The hypertension limit is 140 over 90 mm Hg on repeated readings.
- **Original content:** the scenarios differ from the CBSE 11 Biology chapters 15 (body fluids) and the ICSE 10 chapters 7 and 8 (a 450 mL bag, a patient typed with three sera, a swimmer and an untrained student, a swollen arm after node removal, an artificial pacemaker, a vessel measurement).
