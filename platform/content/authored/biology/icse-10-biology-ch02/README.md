# ICSE Class 10 Biology, Chapter 2 — Genetics

`icse-10-biology-ch02` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 14 slides), notes (6 sections), 30 flashcards, 62 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10bio_ch02_short` (20 marks, 30 min) and `t_icse10bio_ch02_long` (40 marks, 60 min), laid out as `icse-10-biology-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../icse-10-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/icse-10-biology-ch02/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All six ICSE syllabus topics: **genetic terms** (gene, allele, dominant, recessive, homozygous, heterozygous, phenotype, genotype, mutation, variation); **Mendel** and the garden pea with the laws of dominance, segregation and independent assortment; the **monohybrid cross** with 3 : 1 and 1 : 2 : 1 ratios and the test cross; the **dihybrid cross** (phenotypic ratio 9 : 3 : 3 : 1 only — the genotypic ratio is a removed topic); **sex determination** in humans; and **X-linked inheritance** of haemophilia and colour blindness (other sex-linked disorders are removed). Every ratio, expected number and probability comes from the Punnett engine in `src/calc.mjs` (copied from `isc-12-biology-ch05`, same author) and is asserted. Traits differ from the ISC/CBSE 12 banks: flower colour V/v and height with flower colour TtVv.
- Style follows the ICSE 2027 Biology specimen paper (523; `sources/cisce.md` `icse-2027-specimen-523-biology`): biological terms, odd one out with its category, give-reason items, a 5-blank fill-in passage, a labelled-diagram match, assertion-reason items in the specimen's option order, and 10-mark questions that open with a situation, an experiment or a diagram.
- **Originality:** every situation, person and figure is imagined and written by SOYL; no ICSE textbook text, exercise or specimen item is reused (D-036). An exact-stem check against every authored bank (including CBSE 10 Science and CBSE/ISC 12 Biology) and `originality --authored` report no duplicates.

## Shape
- **Decks:** Part 1 (14 slides): Genetics; Key terms; Mutation and variation; Quick check: two recessive alleles; Why Mendel chose the garden pea; A monohybrid cross; The Punnett square; Worked example 1: expected numbers; Mendel’s laws; Quick check: violet F2 plants; Worked example 2: the test cross; Quick check: the visible character; Summary; Exam tips. Part 2 (14 slides): Two Characters, Sex and X-linked Traits; The dihybrid cross; Independent assortment; Worked example 1: dihybrid numbers; Quick check: the double recessive; Sex determination in humans; Worked example 2: boy or girl?; Quick check: two kinds of sperm; X-linked inheritance: haemophilia; Why males are affected more often; Colour blindness; Quick check: where the genes lie; Summary; Exam tips.
- **Visuals (20 of 28 slides):** flow 3, table 12, svg 5.
- **Diagrams (6 distinct SVGs):** a monohybrid Punnett square (Vv × Vv); a dihybrid Punnett square (TtVv × TtVv) filled by the engine; a pea-flower drawing of the monohybrid cross from P to F2; human sex determination; a haemophilia cross (named, and lettered A–E for the diagram match and a case question). Every SVG was rendered and checked by eye.
- **Narration:** 9–47 words per slide (mean 32); no symbols or abbreviations.

## Question bank (62 items, 140 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 21 | 21 (keys a 6, b 5, c 5, d 5) |
| short-1 | 10 | 10 |
| fill-blank-1 | 2 | 2 |
| assertion-reason | 4 | 4 (ICSE option order; keys c a b c) |
| short-2 | 6 | 12 |
| numerical | 3 | 3 |
| true-false | 4 | 4 |
| short-3 | 3 | 9 |
| fill-blank-5 | 2 | 10 |
| match-5 | 1 | 5 |
| case-based | 6 | 60 |

- **Case questions:** 6, each 10 marks in parts of 1–3 marks, some with an either/or part.
- **Difficulty:** d1 14 · d2 25 · d3 21 · d4 2.
- **Competency:** recall 11 · understanding 14 · application 17 · analysis 20. Application or higher is **60% of items (74% of marks)**, inside the 45–65 % lint band.

## Chapter tests (ICSE 10 Biology blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 3 short-1, 1 short-2 · B: 2 case (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 6 mcq, 1 assertion-reason, 3 short-1, 1 fill-blank (5), 1 match (5) · B: 3 case (10) (attempt 2 of 3).

## Verifier pass
- Every question, case part and alternative was re-solved from its stem; three scripted checks recompute numerical keys from `calc.mjs`.
- **Narration:** the gene-symbol filter caught "XY" in a check-slide narration; it now reads "his pair of sex chromosomes".
- **Bank size:** the first build had 58 practice items (lint minimum 60 for Class 10); four items were added (62).
- **Word limits:** two 2-mark case answers were expanded into the 20–45 word band.
- **Figures:** a label in the lettered cross was resized after rendering.

## For a reviewer
- Haemophilia is described in general terms as failure of blood to clot; haemophilia types A and B are not distinguished.
- Allele symbols for X-linked crosses are written as superscripts (X^H, X^h, X^C, X^c), as in ICSE textbooks.
