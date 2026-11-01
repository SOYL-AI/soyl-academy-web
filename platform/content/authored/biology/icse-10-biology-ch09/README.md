# ICSE Class 10 Biology, Chapter 9 — Excretory System

`icse-10-biology-ch09` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 14 slides), notes (5 sections), 30 flashcards, 70 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10bio_ch09_short` (20 marks, 30 min) and `t_icse10bio_ch09_long` (40 marks, 60 min), laid out as `icse-10-biology-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../icse-10-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/icse-10-biology-ch09/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ICSE syllabus topics: **excretion and the excretory organs** (kidneys, lungs, skin, liver; urea made in the liver by deamination; excretion versus egestion); the **urinary system** with the renal artery and renal vein; the **external and internal structure of the kidney** (capsule, hilum, cortex, medulla and pyramids, pelvis); the **nephron and the Malpighian capsule** with their blood supply (afferent wider than efferent; capillaries round the tubule); **urine formation** by ultrafiltration, selective reabsorption and tubular secretion, with plasma, filtrate and urine compared. Daily filtrate, the share reabsorbed, the urea concentration factor and the water-loss totals are computed by `src/calc.mjs`.
- Style follows the ICSE 2027 Biology specimen paper (523; `sources/cisce.md` `icse-2027-specimen-523-biology`): biological terms, odd one out with its category, give-reason items, a 5-blank fill-in passage, a labelled-diagram match, assertion-reason items in the specimen's option order, and 10-mark questions that open with a situation, an experiment or a diagram.
- **Originality:** every situation, person and figure is imagined and written by SOYL; no ICSE textbook text, exercise or specimen item is reused (D-036). An exact-stem check against every authored bank (including CBSE 10 Science and CBSE/ISC 12 Biology) and `originality --authored` report no duplicates.

## Shape
- **Decks:** Part 1 (14 slides): Excretory System; Excretory organs; Quick check: the lungs; Worked example 1: where does the water go?; The urinary system; Parts of the urinary system; Quick check: ureter or urethra?; Inside the kidney; Cortex, medulla and pelvis; Quick check: the inner region; Worked example 2: a drop of urine on its way out; Quick check: the path of urine; Summary; Exam tips. Part 2 (14 slides): The Nephron and Urine Formation; A nephron and its blood supply; Parts of a nephron; Quick check: the Malpighian capsule; Ultrafiltration in the Malpighian capsule; Quick check: the cup; Three stages of urine formation; Worked example 1: plasma, filtrate and urine; Quick check: what stays behind?; Worked example 2: how much is taken back?; Secretion and the concentration of urine; Quick check: adding wastes; Summary; Exam tips.
- **Visuals (18 of 28 slides):** flow 3, table 11, svg 4.
- **Diagrams (6 distinct SVGs):** all new — the urinary system from the front with the aorta, inferior vena cava, renal arteries and veins, ureters, bladder and urethra; a longitudinal section of the kidney (named, and lettered A–E for a case question); a nephron with its blood supply across the cortex and medulla (named, and lettered A–E for the diagram match and a case question); an enlarged Malpighian capsule showing ultrafiltration. Every SVG was rendered and checked by eye.
- **Narration:** 4–45 words per slide (mean 30); no symbols or abbreviations.

## Question bank (70 items, 149 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 28 | 28 (keys a 7, b 7, c 7, d 7) |
| assertion-reason | 6 | 6 (ICSE option order; keys c d d a b c) |
| true-false | 3 | 3 |
| short-1 | 11 | 11 |
| short-2 | 5 | 10 |
| short-3 | 4 | 12 |
| fill-blank-1 | 2 | 2 |
| numerical | 2 | 2 |
| fill-blank-5 | 2 | 10 |
| match-5 | 1 | 5 |
| case-based | 6 | 60 |

- **Case questions:** 6, each 10 marks in parts of 1–3 marks, some with an either/or part.
- **Difficulty:** d1 13 · d2 34 · d3 22 · d4 1.
- **Competency:** understanding 21 · application 20 · recall 16 · analysis 13. Application or higher is **47% of items (65% of marks)**, inside the 45–65 % lint band.

## Chapter tests (ICSE 10 Biology blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 3 short-1, 1 short-2 · B: 2 case (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 6 mcq, 1 assertion-reason, 3 short-1, 1 fill-blank (5), 1 match (5) · B: 3 case (10) (attempt 2 of 3).

## Verifier pass
- Every question, case part and alternative was re-solved from its stem; MCQ keys are balanced by the seeded placer (a 7, b 7, c 7, d 7).
- **Test overlap:** the long test pairs the nephron fill-in and match with cases on excretory organs, the urinary system and the kidney section; three MCQs (bladder storage, capillaries round the tubule, which substances are filtered) were written so that no long-test stem answers another; the kidney case asks for the pyramid and medulla rather than the nephron parts the match describes.
- **Verify (minor flag avoided):** the reabsorption case's subtraction is written in text so that the only maths span is the rounded percentage (no '=' result other than the key).
- **Exact-stem duplicate** with ch01 ('Name the part labelled B.') was reworded.
- **Competency balance:** four recall MCQs were rewritten as application or analysis items (salty sweat, blocked ureters, a slice of cortex, blocked proximal reabsorption) (41% → 47% application or higher).
- **Figures:** the kidney section was redrawn (a self-crossing pelvis outline and labels clipped on the left), the Malpighian capsule was shifted to show its left labels, the vena cava and aorta now stop above the bladder, and the distal-tubule label was moved off the cortex–medulla line.

## For a reviewer
- Typical values: about 125 mL of filtrate a minute (180 litres a day), about 1.5 litres of urine a day, about a million nephrons per kidney, kidney about 10 cm long.
- Concentrations used in the plasma–filtrate–urine table (g per 100 mL): proteins 7/0/0, glucose 0.1/0.1/0, urea 0.03/0.03/2, salts 0.9/0.9/1.5; urea about 67 times more concentrated in urine.
- The liver is counted as an excretory organ for bile pigments, and deamination is named as the process forming urea.
- Tubular secretion is placed in the distal convoluted tubule (potassium and hydrogen ions, some drugs); reabsorption mainly in the proximal tubule, also the loop of Henle and distal tubule.
- The ureter-stone case predicts back-pressure damage to the blocked kidney (simplified).
- The water-loss figures for Arjun (1500, 450, 350 and 150 mL) are imagined.
