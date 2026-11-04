# ISC Class 11 Biology, Chapter 12 — Cell Cycle and Cell Division

`isc-11-biology-ch12` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 15 slides), notes (4 sections), 30 flashcards, 74 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11bio_ch12_short` (20 marks, 50 min) and `t_isc11bio_ch12_long` (40 marks, 100 min), laid out as `isc-11-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (phase durations of a 20-hour culture, a flow-cytometry histogram, DNA, chromosome and chromatid counts for a 40-chromosome cell, mitotic indices of onion and garlic root tips, culture growth, lily gamete combinations, sperm counts; every value asserted with `eq`), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-11-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/isc-11-biology-ch12/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All four ISC Class XI syllabus topics (t01–t04): the **cell cycle** (G0, G1, S, G2, M) and the **C-value**; **mitosis** with diagrams and its significance; **meiosis** with the five substages of prophase I, synapsis, crossing over and the sources of variation; and the **differences between mitosis and meiosis**.
- No removed topics for this chapter.
- Settings differ from the CBSE 11 chapter 10: a 20-hour culture with a 2000-cell histogram, a cell with 2n = 40 and 6.4 pg of DNA, a lily with 2n = 24, a four-hour doubling from five cells, onion and garlic root tips, an 800-sperm count, a cell with 2n = 6 drawn for mitosis and one with 2n = 4 for meiosis; no 9.6 pg or 7.2 pg cell, yeast count, 350-cell squash, 16-hour cycle, 256-cell embryo, coconut endosperm, pea, maize or fruit-fly chromatid items.

## Shape
- **Part 1 (t01–t02), 15 slides:** title; phases of the cell cycle (wheel); events of each phase; C-value and chromosome number (graph); worked example (phase times from a histogram: 9, 7 and 4 hours); check (S phase); stages of mitosis (diagram); events of mitosis; worked example (chromosomes, chromatids and DNA of a 40-chromosome cell); check (metaphase); significance of mitosis; worked example (onion root tip: mitotic index 12 percent, prophase 81 minutes); check (mitotic index); summary; exam tips.
- **Part 2 (t03–t04), 15 slides:** title; overview of meiosis (diagram); prophase I (diagram); events of the substages; check (synapsis); the rest of meiosis; worked example (DNA and chromosomes through meiosis); significance: variation; worked example (4096 gamete types for 24 chromosomes); check (anaphase I); mitosis and meiosis compared; worked example (150 spermatocytes for 600 sperm; 100 recombinant gametes); check (comparison); summary; exam tips.
- **Visuals (22 of 30 slides; no gap longer than one slide):** table 14, flow 2, svg 6.
- **Diagrams (9 SVGs, 22 uses across decks, notes and questions):** the cell-cycle wheel and a DNA graph (both computed from the durations); a flow-cytometry histogram and a **lettered version (A–C)**; five stages of mitosis in a cell with six chromosomes and a **lettered version (A–E)**; the five substages of prophase I and a **lettered version (A–E)**; meiosis in a cell with four chromosomes. Every SVG was rasterised (headless Chromium) and checked by eye.
- **Narration:** 9–52 words (mean 34), no symbols, unit abbreviations or formulae.

## Question bank (74)
| Type | Count | Marks |
|---|---|---|
| mcq | 31 | 1 (keys a 8, b 8, c 8, d 7); 10 on lettered figures; 6 are deck checks |
| assertion-reason | 4 | 1 (ISC options; keys c a b d) |
| short, 1 mark | 6 | give-a-reason (3) and analogy (3) |
| fill-blank | 1 | 1 |
| numerical | 6 | 1 (6 hours; 320 cells; 80 chromosomes; 16 percent; 4096; 200 spermatocytes) |
| short | 9 + 10 | 2 / 3 |
| long | 5 | 5, in marked parts |
| case-based (stimulus) | 2 | 4 (1 + 1 + 2), part (c) either/or: a garlic root-tip count and the DNA content in sperm formation |

- **Difficulty:** d1 21 · d2 34 · d3 18 · d4 1.
- **Competency:** recall 16 · understanding 19 · application 33 · analysis 6. Application or higher is **53% of items (59% of marks)**, inside the 45–65 % band.
- **Topic tags:** t01 17 · t02 22 · t03 29 · t04 6.
- **Re-solves:** 12 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (ISC defaults)
- **Short:** A the S-phase cells on the histogram, a resting lymphocyte, chromosomes in a daughter onion nucleus, chromosomes after meiosis I, S phase (A-R) · B importance of mitosis; (synapsis or interphase events) · C metaphase and anaphase; (variation in meiosis or three differences between root tip and anther) · D mitosis in parts.
- **Long:** A anaphase, telophase, chromatid count and prophase on the lettered mitosis cells, kinetochores, a cell plate, lily gamete combinations, chromatids in a lily cell, telophase events, lily gametes, daughters identical (A-R), anaphase I and interkinesis (A-R) · B C-value, crossing over, (meiosis II or G0) · C S phase, healing by mitosis, chromatid counts, (sperm counts or fertilisation) · D mitosis against meiosis in parts; (prophase I or the cell cycle in parts).
- Items in the tests are not used on any deck check slide. Stems, options and assertion-reason statements were read so that none states the answer to another item of the same test.

## Validation
- `npm run content -- lint --exemplars`, `verify --board cisce --class 11 --subject biology --authored`, `originality --authored` and the exact-stem check: results in the producer's handoff.
- Author validator (in the build): 14 maths strings parse; 22 SVG uses / 9 distinct diagrams pass the allow-list; narration clean; 12/12 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-11-04)
Every question, case part and alternative was re-solved from its stem by the writer. Fixes made:
1. **Word limit and difficulty.** A three-mark answer on the substages of prophase I was too short and was expanded; the bank had no difficulty-4 item, so the substage-order item on the lettered figure was raised to d4.
2. **Test leaks.** Tests were composed so that an objective stem or option never states what another item asks: the prophase figure items, the crossing-over and interkinesis items and the substage questions were kept apart; no C-value or histogram item sits with the cell-cycle essay in the long test; the lettered mitosis items sit with no mitosis essay.
3. **Diagrams after rasterising.** The label on the DNA graph overlapped the rising line, and arrows and labels in the meiosis overview overlapped the parent-cell caption and the first cell; both were moved.
4. **Originality.** No set-up from CBSE 11 Biology ch10 is reused; the exact-stem check found no duplicates.

## For a reviewer
- **Cycle times.** The 20-hour cycle (9, 7, 3.5 and 0.5 hours) and the one-hour M phase of a 24-hour human cycle are illustrative; the DNA amounts (6.4 and 12.8 pg) and the counts in the histogram and the two root tips are model values.
- **Centriole duplication** is placed in S phase for animal cells; some books place it in G2.
- **Chromosome counting at anaphase.** The count of 80 for a 40-chromosome cell treats each separated chromatid as a chromosome, as most Class XI books do.
- **Substage events.** Synaptonemal complex in zygotene and pachytene and terminalisation in diakinesis follow the usual Class XI account; oocyte arrest in diplotene is not taught here.
- **Recombinant gametes.** A single crossover between two genes gives half recombinant gametes from that meiosis; the 40 percent and 500-gamete figures are illustrative.
