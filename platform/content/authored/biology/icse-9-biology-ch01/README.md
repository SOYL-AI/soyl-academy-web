# ICSE Class 9 Biology, Chapter 1 — The Cell: A Unit of Life

`icse-9-biology-ch01` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 16 slides), notes (6 sections), 30 flashcards, 66 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9bio_ch01_short` (20 marks, 30 min) and `t_icse9bio_ch01_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed and asserted values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `lib.mjs` (shared, not edited). Rebuild from `platform/`: `npx tsx content/authored/biology/icse-9-biology-ch01/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All six ICSE 2028 Class IX syllabus topics: the cell as the unit of life, **cell theory**, **protoplasm and cytoplasm**; **cell wall and cell membrane**; **nucleus, nucleolus, mitochondria, endoplasmic reticulum, ribosomes and Golgi bodies**; **plastids, lysosomes, centrosome and vacuoles**; **prokaryotic and eukaryotic cells**; **plant versus animal cell** with labelled diagrams. The chapter has no removed topics.
- Class 9 has no board examination; the items follow the ICSE 2027 Biology specimen style (523): short stems, biological terms, odd one out with its category, give-reason items, differences, labelled diagrams, a 5-blank fill-in, a lettered-diagram match, assertion-reason items in the specimen option order, and 10-mark structured questions in parts.
- **Originality:** all situations (beetroot slices, stomach pepsin cell, cheek-cell practical, leaf-peel count, Nostoc, tadpole tail) are written by SOYL and differ from ICSE 10 ch01, CBSE 11 ch08 and ISC 11 ch10. Exact-stem and originality checks report no duplicates.

## Shape
- **Decks:** Part 1 (14 slides): The Cell; The cell theory; Protoplasm and cytoplasm; Quick check; A generalised animal cell; Cell wall and cell membrane; Worked example 1 (which boundary?); Quick check; Nucleus and nucleolus; Mitochondria, ER and Golgi bodies; Worked example 2 (tracing a cell product); Quick check; Summary; Exam tips. Part 2 (16 slides): Plastids and cell types; Plastids; Three kinds of plastid; Quick check; Lysosomes, centrosome and vacuoles; Worked example 1 (shrinking tadpole tail); Quick check; A prokaryotic cell; Prokaryotic and eukaryotic cells; Worked example 2 (sorting an unknown cell); Quick check; A generalised plant cell; Plant and animal cells compared; Quick check; Summary; Exam tips.
- **Visuals (21 of 30 slides):** flow 4, svg 5, table 12.
- **Diagrams (6 distinct SVGs):** animal cell; plant cell (named, and lettered A–E for a match and two figure questions); bacterium; three plastids; mitochondrion, rough ER and Golgi body. All drawn with the S helpers and palette colours, rendered and checked by eye (label overlaps in the organelle, plastid and bacterium drawings were fixed).
- **Narration:** 4–42 words per slide (mean 28); no symbols or abbreviations.

## Question bank (66 items, 145 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 25 | 25 (7 are deck-check items) |
| assertion-reason | 5 | 5 (keys c b c d a) |
| short-1 (terms, odd one out, give reason) | 8 | 8 |
| true-false | 3 | 3 |
| fill-blank-1 | 2 | 2 |
| fill-blank-5 | 1 | 5 |
| numerical | 3 | 3 |
| match-5 | 1 | 5 |
| short-2 | 7 | 14 |
| short-3 | 5 | 15 |
| long-10 (structured) | 6 | 60 |

- **Structured questions:** 6, each 10 marks in 4 parts, opening with a situation, a practical or a diagram; each has a labelled-diagram part.
- **Difficulty:** d1 15 · d2 38 · d3 12 · d4 1.
- **Competency:** recall 12 · understanding 20 · application 22 · analysis 12. Application or higher is **52% of items**, inside the 45–65% lint band.

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).

## Verifier pass
- Every question was re-solved from its stem; the numerical items (magnification, size ratio, cells in a row, mitochondria ratio, peel percentage) are computed and asserted in `calc.mjs`.
- Structured-question schemes sum to 10 and part marks are shown in each stem.
- A 3-mark answer that fell below its word band was expanded.

## For a reviewer
- Protoplasm is taken as cytoplasm plus nucleus, as in ICSE texts; some books treat the two terms loosely (stated in the notes).
- Cell theory is credited to Schleiden and Schwann with Virchow's extension; no dates are asked.
- Sizes (bacteria about 1 to 10 micrometres, eukaryotic cells 10 to 100 micrometres) are approximate and flagged so in the notes.
- Blue-green algae are listed as prokaryotes (cyanobacteria), with chlorophyll not in chloroplasts.
- The nucleolus is stated to make ribosomes and to be without its own membrane.
- Magnification is taken as size of drawing divided by real size, with the unit conversion shown.
