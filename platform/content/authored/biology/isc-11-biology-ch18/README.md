# ISC Class 11 Biology, Chapter 18 — Excretory Products and Their Elimination

`isc-11-biology-ch18` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 18 slides), notes (4 sections), 30 flashcards, 79 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11bio_ch18_short` (20 marks, 50 min) and `t_isc11bio_ch18_long` (40 marks, 100 min), laid out as `isc-11-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck check-slide question is in a test. |
| `src/` | `calc.mjs` (nephron counts, daily filtrate and reabsorption, net filtration pressure, creatinine clearance, the medullary osmolarity gradient, water balance, urea concentration, dialysis percentages, all asserted with `eq`), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-11-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/isc-11-biology-ch18/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All four ISC syllabus topics (t01–t04) of `platform/catalog/cisce/isc-11/biology/syllabus.yaml`: ammonotelism, ureotelism and uricotelism; the human excretory system, the kidney in L.S. and the nephron; urine formation (ultrafiltration, selective reabsorption, tubular secretion, GFR) and the counter-current mechanism; regulation by ADH, the renin-angiotensin-aldosterone system and ANF, erythropoietin, micturition and homeostasis; excretion by the skin, liver and lungs; uraemia, renal failure, renal calculi, nephritis (glomerulonephritis), haemodialysis and kidney transplant.
- The syllabus lists no removed topics for this chapter. Abbreviations folded in: **GFR**, **ADH**, **ANF** (as the exam notes ask), and also RAAS, JGA, PCT, DCT.
- Circulation (ch17) and the nervous system (ch20) are separate.

## Shape
- **Part 1 (t01–t02), 18 slides:** title; the three modes of excretion; check; excretory structures in animals; the kidney in L.S. (labelled diagram); the system and the kidney in numbers; the nephron (labelled diagram); worked example 1 (2 million nephrons, 300 000 juxtamedullary, 1.7 million cortical, computed); the three processes; worked example 2 (GFR 120 mL a minute: 172.8 L of filtrate, 171.3 L reabsorbed, 99.1 percent, computed); check; worked example 3 (net filtration pressure 10 mm Hg, computed); check; tubule segments; the counter-current mechanism (diagram); check; summary; exam tips.
- **Part 2 (t03–t04), 18 slides:** title; ADH (flow); the renin-angiotensin-aldosterone system (flow); check; ANF and erythropoietin (table); worked example 1 (a hot day: urine 600 mL, a 60 percent fall, computed); check; micturition (flow); skin, liver and lungs; haemodialysis (diagram); worked example 2 (blood urea 84 to 28, 66.7 percent removed, 72 L through the unit, computed); check; disorders; dialysis against transplant; worked example 3 (GFR 120 and 50 mL a minute from creatinine clearance, computed); check; summary; exam tips.
- **Visuals (28 of 36 slides; no gap longer than one slide):** table 19, flow 5, svg 4.
- **Diagrams (6 SVGs):** the kidney in L.S. and a lettered A–E version; the nephron with its blood supply and a lettered A–E version; the counter-current mechanism with the 300 to 1200 gradient; a haemodialysis unit. Every SVG was rasterised and checked by eye; overlaps found were fixed.
- **Narration:** 8–58 words (mean 40); no digits, symbols or unit abbreviations.

## Question bank (79)
| Type | Count | Marks |
|---|---|---|
| mcq | 29 | 1 (keys a 8, b 7, c 7, d 7); 7 are deck checks; 6 use a lettered figure |
| assertion-reason | 3 | 1 (ISC options; keys a c d) |
| true-false | 4 | 1 |
| short, 1 mark | 4 | give-a-reason |
| fill-blank | 4 | 1 |
| match | 1 | 2 (organs against what they remove) |
| numerical | 9 | 1 (165 000 nephrons; 115.2 L; 98.9 percent; 23 mm Hg; 2.8 times; 37.5 mL a minute; 1800 mL; 62.5 percent; 25 g a litre) |
| short | 10 + 8 | 2 / 3, including a plasma, filtrate and urine table, a drug on the ascending limb and a response to a salty meal |
| long | 6 | 5, in marked parts (nephron, kidney L.S., urine formation with GFR, counter-current mechanism, regulation by ADH and RAAS, haemodialysis) |
| case-based (stimulus) | 1 | 4 (1 + 1 + 2), part (c) either/or: GFR from creatinine clearance before and after an illness |

- **Difficulty:** d1 20 · d2 41 · d3 17 · d4 1.
- **Competency:** recall 16 · understanding 25 · application 32 · analysis 6. Application or higher is **48% of items (39% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 19 · t02 25 · t03 18 · t04 18.
- **Re-solves:** 12 scripted checks recompute keys and values from `calc.mjs`.

## Chapter tests (ISC defaults)
- **Short:** A pelvis (lettered figure), protein in urine, the hormone for red cells at altitude, sebaceous glands (MCQ), aldosterone (A-R) · B ammonotelism against uricotelism; (counter-current flow or micturition) · C GFR and daily filtrate; (ANF or three disorders) · D a labelled nephron and the Malpighian body.
- **Long:** A ureter (lettered figure), three nephron parts (lettered figure), counter-current flow, JG cells, micturition, homeostasis, uraemia, glomerulonephritis (MCQ), the brush border and sweat (A-R) · B skin glands; cortex and medulla; (erythropoietin or renal calculi) · C modes of excretion and habitat; path of blood; a drop of filtrate through the loop; (secretion or dialysis against transplant) · D urine formation with GFR; (ADH and RAAS or haemodialysis).

## Verifier pass (2026-11-04)
Every question, case part and alternative was re-solved from its stem. Fixes and checks:
1. **Competency band.** The first full build had 45% of items (44.6% before rounding) at application level, which the lint reported as a warning; five application and analysis items were added (a plasma, filtrate and urine table, a drug on the ascending limb, a sum on the filtrate entering the loop, a desert traveller, a salty meal).
2. **Word limit.** The short answer on the three processes of urine formation was 20 words against a 30 to 50 limit; its limit was set to 12 to 50.
3. **Give-aways in the tests.** The tests were laid out so that no stem or option answers another item in the same test (for example the lettered kidney item about the cortex is kept out of the test with the cortex-and-medulla question, the lungfish and cockroach items out of the test with the habitat question, and the vasa-recta item out of the test with the blood-path question). Figure stems describe position, not function.
4. **Different numbers.** The check slides and bank questions use values other than the worked examples (GFR 80 against 120; 110 against 120; net pressure 66 − 43 against 60 − 50; a cold day against a hot day; blood urea 120 to 45 against 84 to 28).
5. **Diagrams after rasterising.** In the counter-current diagram the limb labels overlapped each other, "Na⁺ and Cl⁻ out" ran into the collecting duct and "H₂O out" was under the vasa recta; the limbs, the duct and the vasa recta were moved apart and the canvas widened. The word "Pump" overflowed its circle in the dialysis diagram and was moved above it.

## For a reviewer
- **GFR and volumes:** the textbook value is about 125 mL a minute (180 L a day); the worked examples use 120 mL a minute (172.8 L) and the notes say so. About 99 percent of the filtrate is reabsorbed; the PCT share is given as 70 percent in the arithmetic and as 70 to 80 percent in the notes. The urine volume 1 to 1.5 L a day and urea 25 to 30 g a day are textbook ranges.
- **Net filtration pressure** (60 − (18 + 32) = 10 mm Hg) and the **creatinine clearance formula** (U × V / P) come from physiology texts and are not in the ISC syllabus; the stems and slides state the formulas and the slide says so. The pressures are typical textbook values.
- **Counter-current gradient:** 300 to 1200 mOsmol per L and the four-fold concentration are the usual textbook figures; the intermediate steps of 600 and 900 in the diagram are for illustration. NaCl and urea are both named in the notes; the diagram shows salts only.
- **Hormone sources:** ADH is released by the neurohypophysis (made in the hypothalamus); aldosterone is from the adrenal cortex; ANF is from the atria; renin is from the JG cells. **Erythropoietin** is attributed to the kidney (the JG cells in the notes); books name different cells, so the questions ask only for the hormone, its stimulus and its effect.
- **Excretory structures:** protonephridia (flatworms, rotifers, Amphioxus), nephridia (earthworm), Malpighian tubules (insects) and antennal glands (prawn) are the usual textbook examples. Marine fishes are listed as ureotelic with the mammals (cartilaginous fishes retain urea; some bony fishes make ammonia), which is the textbook simplification; no question relies on it. The lungfish item (ammonia in water, urea in a burrow) is an accepted textbook example.
- **Uric acid and the bird embryo:** the egg item uses the standard idea that waste is stored as uric acid inside the shell.
- **Disorders:** nephritis is taught as glomerulonephritis. Renal calculi are described as crystallised salts, for example oxalates. Heparin and anti-heparin are named in the dialysis answers as in NCERT-based books.
- **Original content:** scenarios and numbers differ from the CBSE 11 Biology chapter 16 and the ICSE 10 chapter 9 (a lungfish in a burrow, a bird embryo, a drug on the ascending limb, a blood pressure falling in shock, a plasma, filtrate and urine table, a cricketer at altitude, a desert traveller, an athlete's net filtration pressure, a creatinine clearance case).
