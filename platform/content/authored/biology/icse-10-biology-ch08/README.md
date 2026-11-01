# ICSE Class 10 Biology, Chapter 8 — Circulatory System: Heart, Blood Vessels and Circulation

`icse-10-biology-ch08` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 16 slides), notes (6 sections), 30 flashcards, 72 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10bio_ch08_short` (20 marks, 30 min) and `t_icse10bio_ch08_long` (40 marks, 60 min), laid out as `icse-10-biology-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../icse-10-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/icse-10-biology-ch08/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All six ICSE syllabus topics: **structure of the heart** (chambers, septum, tricuspid, bicuspid and semilunar valves, chordae tendineae, pericardium, main vessels entering and leaving); **working of the heart** (cardiac cycle, systole and diastole, valve states, lubb and dub, path of blood); **double circulation** and its advantage; **arteries, veins and capillaries** related to function (including valves and varicose veins); **pulse and blood pressure** (where the pulse is felt, reading 120/80 mm Hg); the **vessels of the liver and kidney** and the significance of the hepatic portal system. No vessel is named beyond the main vessels of the heart, liver and kidney (removed topic): the pulse is described at the wrist and neck without naming those arteries, and the intestine's artery is left unnamed. Cardiac-cycle timings, cardiac output and stroke volume, pulse rates, the blood-pressure difference and the liver/kidney sample differences are computed by `src/calc.mjs`.
- Style follows the ICSE 2027 Biology specimen paper (523; `sources/cisce.md` `icse-2027-specimen-523-biology`): biological terms, odd one out with its category, give-reason items, a 5-blank fill-in passage, a labelled-diagram match, assertion-reason items in the specimen's option order, and 10-mark questions that open with a situation, an experiment or a diagram.
- **Originality:** every situation, person and figure is imagined and written by SOYL; no ICSE textbook text, exercise or specimen item is reused (D-036). An exact-stem check against every authored bank (including CBSE 10 Science and CBSE/ISC 12 Biology) and `originality --authored` report no duplicates.

## Shape
- **Decks:** Part 1 (16 slides): Circulatory System: Heart, Blood Vessels and Circulation; Inside the heart; Chambers and valves; Quick check: the right-side valve; Main vessels of the heart; Worked example 1: following a red blood cell; The cardiac cycle; Valves in systole and diastole; Quick check: the second sound; Worked example 2: timing and output; Double circulation; Quick check: twice through the heart; Why double circulation helps; Quick check: the left-side valve; Summary; Exam tips. Part 2 (16 slides): Blood Vessels, Pulse and Blood Pressure; Artery, vein and capillary; Structure related to function; Quick check: valves in veins; Capillaries: where the work is done; The pulse; Worked example 1: counting a pulse; Quick check: the pulse; Blood pressure; Quick check: the instrument; Vessels of the liver and kidney; The hepatic portal system; Worked example 2: reading blood samples; Quick check: the portal vein; Summary; Exam tips.
- **Visuals (22 of 32 slides):** flow 5, svg 5, table 12.
- **Diagrams (6 distinct SVGs):** all new — a longitudinal section of the heart with chambers, valves, chordae tendineae, papillary muscles, septum and the venae cavae, pulmonary artery, pulmonary veins and aorta (named, and a lettered A–E version for the diagram match and a case question); double circulation as pulmonary and systemic loops; transverse sections of an artery, vein and capillary with a longitudinal view of vein valves; a cardiac-cycle timeline drawn from the computed phase lengths with valve states and the two heart sounds; the vessels of the liver and kidney. Every SVG was rendered and checked by eye.
- **Narration:** 3–48 words per slide (mean 31); no symbols or abbreviations.

## Question bank (72 items, 151 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 28 | 28 (keys a 7, b 7, c 7, d 7) |
| assertion-reason | 6 | 6 (ICSE option order; keys c b d a a c) |
| true-false | 3 | 3 |
| fill-blank-1 | 2 | 2 |
| short-1 | 11 | 11 |
| short-3 | 4 | 12 |
| numerical | 4 | 4 |
| short-2 | 5 | 10 |
| fill-blank-5 | 2 | 10 |
| match-5 | 1 | 5 |
| case-based | 6 | 60 |

- **Case questions:** 6, each 10 marks in parts of 1–3 marks, some with an either/or part.
- **Difficulty:** d1 15 · d2 36 · d3 19 · d4 2.
- **Competency:** understanding 25 · recall 13 · application 22 · analysis 12. Application or higher is **47% of items (66% of marks)**, inside the 45–65 % lint band.

## Chapter tests (ICSE 10 Biology blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 3 short-1, 1 short-2 · B: 2 case (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 6 mcq, 1 assertion-reason, 3 short-1, 1 fill-blank (5), 1 match (5) · B: 3 case (10) (attempt 2 of 3).

## Verifier pass
- Every question, case part and alternative was re-solved from its stem; MCQ keys are balanced by the seeded placer (a 7, b 7, c 7, d 7).
- **Test overlap:** the heart fill-in passage was rewritten (pericardium, auricles, bicuspid, chordae tendineae, left ventricle) so that it no longer names the pulmonary vessels asked for in the hole-in-the-heart case; MCQs that named the semilunar, portal or diastolic terms were kept out of tests that ask for those terms.
- **Competency balance:** one recall MCQ (hepatic artery) was removed, four stems were rewritten as application items (identifying a pulmonary vein, a vein section, the first organ a dye reaches, the sample with least urea), a computed athlete stroke-volume item was added and the blood-pressure interpretation items were re-tagged as application (37% → 47% application or higher; 73 → 72 items).
- **Floating point:** the litres-to-millilitres conversion in the athlete item is rounded so the solution prints 5040, not a binary fraction.
- **Figures:** clipped valve-row labels and the cramped auricle label on the cardiac-cycle timeline, overflowing text in the double-circulation boxes, crowded artery labels and the lettered E leader on the heart were fixed after rendering.

## For a reviewer
- Cardiac cycle at 75 beats per minute: auricular systole 0.1 s, ventricular systole 0.3 s, joint diastole 0.4 s (textbook values).
- Resting stroke volume 70 mL at 72 beats a minute (about 5 litres a minute); a race at 160 beats and 120 mL a beat; an athlete at 56 beats a minute (computed 90 mL a beat).
- Lubb is the closing of the tricuspid and bicuspid valves; dub the closing of the semilunar valves.
- Hypertension is given as persistently above about 140/90 mm Hg (notes only).
- The renal-sample MCQ says the hepatic vein carries urea newly made by the liver, so the renal vein has the least urea of the four samples.
- Blood-sample values in the meal case (glucose 160 and 100, urea 30 and 18 mg per 100 mL) are imagined.
