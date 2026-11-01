# ICSE Class 10 Biology, Chapter 1 — Cell Cycle, Cell Division and Structure of Chromosomes

`icse-10-biology-ch01` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 14 slides), notes (5 sections), 30 flashcards, 70 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10bio_ch01_short` (20 marks, 30 min) and `t_icse10bio_ch01_long` (40 marks, 60 min), laid out as `icse-10-biology-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/icse-10-biology-ch01/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ICSE syllabus topics: the **cell cycle** (G1, S, G2 and M phase; DNA content); **mitosis** (prophase, metaphase, anaphase, telophase) and **cytokinesis** in plant and animal cells; **meiosis** as a reduction division, **homologous chromosomes** and **crossing over** (the stages of meiosis are a removed topic and are not taught or asked); the **significance and differences** of mitosis and meiosis; the **structure of a chromosome** (chromatin, chromatids, centromere, DNA, genes). Cell numbers, chromosome numbers, chromatid counts and the root-tip percentage are computed by `src/calc.mjs`.
- Style follows the ICSE 2027 Biology specimen paper (523; `sources/cisce.md` `icse-2027-specimen-523-biology`): biological terms, odd one out with its category, give-reason items, a 5-blank fill-in passage, a labelled-diagram match, assertion-reason items in the specimen's option order, and 10-mark questions that open with a situation, an experiment or a diagram.
- **Originality:** every situation, person and figure is imagined and written by SOYL; no ICSE textbook text, exercise or specimen item is reused (D-036). An exact-stem check against every authored bank (including CBSE 10 Science and CBSE/ISC 12 Biology) and `originality --authored` report no duplicates.

## Shape
- **Decks:** Part 1 (14 slides): Cell Cycle, Cell Division and Chromosomes; The cell cycle; What happens in interphase; Quick check: copying DNA; Worked example 1: DNA through the cycle; Stages of mitosis; What happens in each stage; Worked example 2: naming the stage; Quick check: separating chromatids; Cytokinesis: furrow or cell plate; Quick check: the cell plate; Where mitosis happens; Summary; Exam tips. Part 2 (14 slides): Meiosis and the Chromosome; Why meiosis halves the number; Homologous chromosomes and crossing over; Quick check: crossing over; Worked example 1: counting chromosomes; Quick check: the gamete number; Mitosis and meiosis compared; Significance of each division; Structure of a chromosome; From DNA to chromosome; Worked example 2: chromosomes or chromatids?; Quick check: the centromere; Summary; Exam tips.
- **Visuals (20 of 28 slides):** flow 3, svg 5, table 12.
- **Diagrams (6 distinct SVGs):** all new — the cell cycle as a circle; four stages of mitosis in an animal cell (2n = 4); a chromosome with chromatin and DNA (named, and lettered A–E for the diagram match and a case question); cytokinesis by furrowing and by cell plate; crossing over between a homologous pair. Every SVG was rendered and checked by eye.
- **Narration:** 6–46 words per slide (mean 30); no symbols or abbreviations.

## Question bank (70 items, 151 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 | 26 (keys a 7, b 7, c 6, d 6) |
| assertion-reason | 6 | 6 (ICSE option order; keys c c b a a c) |
| short-1 | 10 | 10 |
| numerical | 1 | 1 |
| true-false | 4 | 4 |
| short-2 | 7 | 14 |
| short-3 | 4 | 12 |
| fill-blank-1 | 3 | 3 |
| fill-blank-5 | 2 | 10 |
| match-5 | 1 | 5 |
| case-based | 6 | 60 |

- **Case questions:** 6, each 10 marks in parts of 1–3 marks, some with an either/or part.
- **Difficulty:** d1 17 · d2 38 · d3 14 · d4 1.
- **Competency:** recall 15 · application 21 · understanding 21 · analysis 13. Application or higher is **49% of items (67% of marks)**, inside the 45–65 % lint band.

## Chapter tests (ICSE 10 Biology blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 3 short-1, 1 short-2 · B: 2 case (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 6 mcq, 1 assertion-reason, 3 short-1, 1 fill-blank (5), 1 match (5) · B: 3 case (10) (attempt 2 of 3).

## Verifier pass
- Every question, case part and alternative was re-solved from its stem; MCQ keys are balanced by the seeded placer.
- **Exact-stem duplicate** with CBSE 10 Science ch08 ("A gene is best described as") was rewritten.
- **Word limits:** three 2- and 3-mark case answers were expanded into the 20–45 and 35–70 word bands.
- **Solution check:** a numerical case part now states its answer (4 cells) in the solution.
- **Competency balance:** three assertion-reason items with a false reason were re-tagged as analysis (44% → 49% application or higher).
- **Figures:** label overlaps in the cytokinesis, crossing-over and chromosome drawings were fixed after rendering.

## For a reviewer
- Stages of meiosis are deliberately left out (removed topic).
- Chromosome numbers used: human 46, dog 78, lily 24 (standard textbook values).
