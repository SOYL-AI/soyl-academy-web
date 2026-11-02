# CBSE Class 11 Biology, Chapter 10 — Cell Cycle and Cell Division

`cbse-11-biology-ch10` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026; the producer reviews and gates)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 17 slides), notes (3 sections), 30 flashcards, 82 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11bio_ch10_short` (20 marks, 40 min) and `t_cbse11bio_ch10_long` (40 marks, 90 min), laid out as the default blueprints `cbse-11-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in either. |
| `src/` | `calc.mjs` (textbook cycle times, interphase share, cell numbers after n cycles, mitotic index, phase times from cell counts, chromosome and chromatid tables for every stage of mitosis and meiosis, DNA per nucleus in picograms, gamete numbers, every worked number — each asserted with `eq`), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../cbse-11-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/cbse-11-biology-ch10/src/build.mjs` (deterministic; the tree stays clean; `CH_OUT=<dir>` writes a trial build elsewhere). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All three syllabus topics (t01 cell cycle, t02 mitosis, t03 meiosis) are covered; the chapter has no removed topics in the 2026-27 syllabus. Class 11 has no board exam, so items follow the CBSE school-examination pattern. Depth: interphase (G1, S, G2), the M phase, G0, 24 h and 90 min cycles; DNA 2C to 4C with the chromosome number unchanged; centriole duplication in S; mitosis (prophase with the disappearance of nucleolus, nuclear envelope, Golgi complex and ER; kinetochores and the metaphase plate; anaphase centromere splitting; telophase; cytokinesis by furrow and by cell plate; syncytium in coconut liquid endosperm; significance); meiosis (one replication, two divisions; leptotene, zygotene with synapsis and synaptonemal complex, pachytene with crossing over at recombination nodules and recombinase, diplotene with chiasmata, diakinesis with terminalisation; metaphase I, anaphase I, telophase I and dyad; interkinesis; meiosis II and the tetrad; significance). ICSE 10 and other banks already cover the cell cycle and mitosis, so every set-up here is fresh (root-tip counts, cell lines, yeast and pea data, picogram DNA tables).

## Shape
- **Part 1 (t01–t02), 16 slides:** cell cycle ring; G1, S, G2 table; worked example (23 of 24 hours is 95.8 percent; 9 hours is 6 yeast cycles, 64 cells, computed); DNA content graph; G0; mitosis stages; metaphase and anaphase; telophase and cytokinesis; worked example (400 root-tip cells, mitotic index 12 percent, metaphase 24 minutes, computed); significance; summary; exam tips; 3 checks.
- **Part 2 (t03), 17 slides:** meiosis overview; prophase I substages (diagram and table); meiosis I and II diagram; metaphase I to telophase I with interkinesis; meiosis II; worked example (pea 2n = 14: 7 bivalents, 28 chromatids, 7 chromosomes per pole, computed); worked example (DNA 9.6, 19.2, 9.6, 4.8 pg; 250 meiocytes give 1000 pollen grains, computed); mitosis versus meiosis; significance; summary; exam tips; 4 checks.
- **Visuals (24 of 33 slides; no gap longer than one slide):** flow 2, svg 8, table 14 (plus notes visuals).
- **Diagrams (8 distinct SVGs, 18 uses across decks, notes and questions):** the cell-cycle ring with G0; DNA content graph through one cycle; five stages of mitosis; cytokinesis in animal and plant cells; the five substages of prophase I; meiosis I and II after prophase I; and lettered A–E scrambled versions of the mitosis stages and of the prophase I substages (used in three questions). Every SVG was rasterised (headless Chromium, theme tokens substituted) and checked by eye.
- **Narration:** 9–63 words (mean 40); no symbols, formulae or unit abbreviations.

## Question bank (82)
| Type | Count | Marks |
|---|---|---|
| mcq | 31 | 31 (keys a 8, b 8, c 8, d 7) |
| true-false | 3 | 3 |
| fill-blank | 4 | 4 |
| assertion-reason | 6 | 6 (keys b c a d a d) |
| numerical | 10 | 10 |
| short 2 | 9 | 18 |
| short 3 | 7 | 21 |
| long | 6 | 30 |
| match | 2 | 4 |
| case-based | 4 | 16 |

- **Contract v2:** every passage has `passage_origin: "soyl-original"`; `word_limit` on all 26 short/long items.
- **Difficulty:** d1 20 · d2 42 · d3 19 · d4 1.
- **Competency:** understanding 26 · application 34 · analysis 8 · recall 13 · evaluation 1. Application or higher is **52% of items (50% of marks)**, inside the 45–65 % band.
- **Topic tags:** t01 20 · t02 32 · t03 32.
- **Cases (4, 4 marks each as 1 + 1 + 2, part (c) either/or via `alternatives`):** root-tip squash counts (anaphase shortest, mitotic index 10 percent, 18 minutes in metaphase, or why prophase cells outnumber anaphase cells); a yeast culture (doubling every 90 minutes, 128 cells after 630 minutes, interphase or why numbers double); pollen mother cells of pea (7 bivalents, 14 chromosomes at anaphase II, 4 pollen grains of 7 chromosomes or restoring 14 in the zygote); a picogram DNA table (haploid nucleus, 7.2 pg added in S phase, why a dyad cell has the same DNA as G1, or what meiosis II does).
- **Deck checks (7):** interphase (time-lapse), chromosomes at anaphase, plant cytokinesis A-R (Part 1); synapsis, anaphase I A-R, contents of a dyad cell, chiasmata (Part 2) — all objective.
- **Re-solves:** 21 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (default blueprints)
- **Short (20 marks, 40 min):** A G0 of a heart cell, the best stage for counting chromosomes, diakinesis (MCQ), nuclear envelope at metaphase (A-R) · B events of G1, S and G2 (2), significance of mitosis (2), zygotene, pachytene and diplotene (3) · C animal versus plant cytokinesis claim or mitosis versus meiosis · D root-tip counts case.
- **Long (40 marks, 90 min):** A S-phase label, DNA in G2, cell plate, chromatids at metaphase, recombination nodules, maize metaphase II, human anaphase I, interkinesis (MCQ), mitosis A-R, crossing-over A-R · B G0 (2), why metaphase and what happens at anaphase (2), (syncytium or why meiosis I is the reduction division) (2), nucleo-cytoplasmic ratio (3), (events of prophase or mitotic index) (3) · C stages of mitosis and (meiosis I or prophase I substages) · D yeast case, pea case.
- Layout: short — A: 3 mcq, 1 assertion-reason · B: 2 short 2, 1 short 3 · C: 2 long (choose 1 of 2) · D: 1 case (4); long — A: 8 mcq, 2 assertion-reason · B: 4 short 2, 3 short 3 (choose 1 of 2) · C: 3 long (choose 1 of 2) · D: 2 case (4).

## Validation
- Author validator (in the build): 53 maths strings parse; 18 SVG uses / 8 distinct diagrams pass the allow-list; narration clean; 21/21 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.
- Stem checks: no exact duplicate stems against any authored bank in the worktree or the main checkout.
- `verify --authored` and `originality --authored` are run by the producer for the whole subject.

## Verifier pass (2026-11-01)
1. **Previous writer's SVGs.** The previous writer's figures were kept after review. Fixes after rasterising: the zygotene second label line ('complex)') had been indexed to pachytene; the DNA graph label 'cell divides: each daughter 2C' was clipped at the right edge, so the canvas was widened to 520 wide; the mitosis stage captions overlapped, so they were shortened and the cells shifted to clear the edges; the 'Wall' label no longer sits on the cell wall; prophase I captions were shortened to three short lines; the meiosis figure gained height so its caption no longer touches the bottom row labels.
2. **Lettered diagrams.** MITOSIS and PROPHASE_I became builders so scrambled A–E versions (A telophase, B metaphase, C cytokinesis, D prophase, E anaphase; A diplotene, B leptotene, C diakinesis, D pachytene, E zygotene) share the exact drawings; their alt text is neutral, so it does not give the answer.
3. **Test leakage.** Test items were chosen so that no stem or option states the answer to another item in the same test (for example the diakinesis MCQ and the prophase I short answer are in different positions, and the DNA-in-G2 MCQ is not paired with the 4C versus 2n short answer in one paper).
4. **Counting convention.** Chromosomes are counted by centromeres; chromatids are counted separately, and the DNA of a dyad cell is stated as 2C (equal to G1) because each of its n chromosomes still has two chromatids.

## For a reviewer
- The cycle times (24 hours for human cells in culture with an M phase of about 1 hour; 90 minutes for yeast) are the textbook's typical values; real cycle lengths vary widely. The phase lengths drawn in the cycle ring and DNA graph (11, 8, 4 and 1 hours) are illustrative.
- Heart muscle cells are used as an example of cells in G0 and intestinal-lining cells as continuously cycling; the textbook states the principle without naming these cells.
- In the DNA tables an imagined organism has 9.6 pg (or 7.2 pg) in the G1 nucleus; the 2C label follows the textbook's usage where C is the haploid DNA amount, so the dyad nucleus is 2C and the gamete 1C.
- All root-tip counts (400 and 600 cells, mitotic indices 12 and 10 percent), the yeast and bean counts, and the 250 pollen mother cells are illustrative; chromosome numbers for the fruit fly (8), pea (14), maize (20) and human (46) are the standard values.
- After the centromeres split at anaphase the whole cell is counted as holding twice the diploid number of chromosomes (16 for a fruit-fly cell with 2n = 8), and each daughter nucleus receives 2n; some books call the anaphase cell 4n. Check that the wording of the anaphase items reads as intended for Class 11.
- Independent assortment is not named; the significance of meiosis cites crossing over and the separation of homologues, as the textbook's variation argument does.
