# ISC Class 12 Biology, Chapter 10 — Mechanism of Evolution and Human Evolution

`isc-12-biology-ch10` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 14 slides), notes (5 sections), 30 flashcards, 63 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12bio_ch10_short` (20 marks, 50 min) and `t_isc12bio_ch10_long` (40 marks, 100 min), laid out as `isc-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (Hardy–Weinberg from q² or from p, allele frequency from counts, percentages, selection curves; copied from CBSE 12 ch06), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-12-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/isc-12-biology-ch10/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ISC syllabus topics: **Darwinism and Malthus**; natural selection in the **giraffe, industrial melanism, DDT and antibiotic resistance**; **Lederberg’s replica plating**; **criticism of Darwinism**; **de Vries’ mutation theory**; the **modern synthetic theory** (mutation, recombination, gene flow, **genetic drift with founder and bottleneck effects**, selection, isolation); **variation** and its causes; **stabilising, directional and disruptive selection**; the **Hardy–Weinberg principle**, its **numerical problems** and the **factors disturbing equilibrium**; **human evolution** from Dryopithecus to modern man with time, brain size, posture and culture.
- Origin of life and evidences of evolution are in ch09.

## Shape
- **Part 1 (t01–t03), 18 slides:** overview; Darwinism; natural selection in action; worked example (peppered-moth percentages, computed); replica plating; criticisms; check; de Vries; modern synthesis; bottleneck; founder vs bottleneck; worked example (allele frequencies through a bottleneck, computed); variation; three types of selection; two checks; summary; exam tips.
- **Part 2 (t04–t05), 14 slides:** overview; Hardy–Weinberg principle; Hardy–Weinberg square; worked example (from 36 percent recessive, computed); worked example (from genotype counts with an equilibrium test, computed); disturbing factors; check; early ancestors; the genus Homo; brain size chart; two checks; summary; exam tips.
- **Visuals (24 of 32 slides; no gap longer than two slides):** table 17, svg 5, flow 2.
- **Diagrams (5 SVGs, 12 uses):** selection curves and the Hardy–Weinberg square (copied from CBSE 12 ch06; curves and areas computed); new: **Lederberg’s replica plating** (colony positions shared by all three plates), a **bottleneck** with bead counts and percentages computed, and a **brain-capacity chart of six hominids**. Every SVG was rasterised and checked by eye.
- **Narration:** 9–45 words (mean 29).

## Question bank (63)
| Type | Count | Marks |
|---|---|---|
| mcq | 23 | 1 (keys a 6, b 6, c 6, d 5) |
| assertion-reason | 6 | 1 (ISC options; keys c a b a d c) |
| short, 1 mark | 2 | give-a-reason |
| fill-blank | 4 | 1 |
| numerical | 5 | 1 (0.25 after a fire; 0.0768 carriers; p = 0.8 from counts; 1260 heterozygotes; 3.3-fold brain increase) |
| short | 8 + 8 | 2 / 3 |
| long | 5 | 5, in marked parts |
| case-based (stimulus) | 2 | 4 (1 + 1 + 2), part (c) either/or: mark–recapture of peppered moths in two woods; MN blood groups and equilibrium |

- **Difficulty:** d1 10 · d2 29 · d3 23 · d4 1 (testing a snail sample for equilibrium and explaining the heterozygote deficit).
- **Competency:** recall 12 · understanding 21 · application 24 · analysis 6. Application or higher is **48% of items (56% of marks)**, inside the 45–65 % band.
- **Re-solves:** 10 scripted checks recompute the Hardy–Weinberg, drift and percentage answers.

## Chapter tests (ISC defaults)
- **Short:** A pale-bark moths, island founders, birth weight, Neanderthal (MCQ), Australopithecus (A-R) · B Darwin’s postulates; (founder vs bottleneck or Homo habilis and erectus) · C replica plating; (three types of selection or factors disturbing equilibrium) · D Hardy–Weinberg in parts.
- **Long:** A Malthus, DDT, giraffe, saltation, elephant seals, disruptive, directional, migrants, Homo erectus, Ramapithecus (MCQ), drift, gene flow (A-R) · B criticisms; heritable variation; (Darwin vs de Vries or Homo sapiens) · C industrial melanism; mutation, recombination and gene flow; equilibrium test; (three ancestors or Darwinism vs modern synthesis) · D human evolution in parts; (Darwinism with antibiotics or modern synthesis on an island).

## Validation
- `npm test -w @soyl/content-templates`, `npm run content -- lint --exemplars`, `verify --board cisce --class 12 --subject biology --authored`, `originality --authored`, DB-6 split and the API content test: results in the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-biology.md`.
- Author validator (in the build): 30 maths strings parse; 12 SVG uses / 5 distinct diagrams pass the allow-list; narration clean; 10/10 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-10-31)
Every question, case part and alternative was re-solved from its stem. Notes:
1. **Hardy–Weinberg numbers.** Every frequency, expected count and percentage in stems, solutions, worked examples and figures comes from `calc.mjs`. The first draft reused figures from the CBSE 12 ch06 bank by the same author (9 and 4 percent recessive, 1 in 400, 49 : 42 : 9 counts, p = 0.6); they were changed to 36 and 1 percent recessive, 1 in 625, 640/320/40 counts and p = 0.7 in a population of 3000.
2. **Assertion-reason keys.** Items were built so no key needs “Assertion false, Reason true”, which is not an ISC option.
3. **Originality.** Every stem names its own organism, sample or ancestor; `originality --authored` reports 0 errors across 242 units.

## Facts a reviewer should double-check
- Dates and brain capacities of hominids are approximate textbook values (Australopithecus 450–600 cc, Homo habilis 650–800, Homo erectus about 900, Neanderthal about 1400, Cro-Magnon about 1650, modern man 1350–1450); the textbook may round differently.
- The peppered-moth and mark–recapture numbers are invented for the exercises, not historical data.
