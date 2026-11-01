# ICSE Class 10 Biology, Chapter 14 — Population

`icse-10-biology-ch14` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (13 + 13 slides), notes (4 sections), 30 flashcards, 63 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10bio_ch14_short` (20 marks, 30 min) and `t_icse10bio_ch14_long` (40 marks, 60 min), laid out as `icse-10-biology-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../icse-10-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/icse-10-biology-ch14/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All four ICSE syllabus topics: **population explosion** in India and the world and its main reasons (falling death rate, high birth rate); **demography**, **population density**, **birth rate**, **death rate** and **growth rate**, with calculations; the **problems** of population explosion (unemployment, over-exploitation of resources, low per capita income, price rise, pollution, unequal distribution of wealth); the **need for population control** and the surgical methods **vasectomy and tubectomy**. Every rate, density, growth rate, per capita income, census rise and percentage is computed by `src/calc.mjs`, mostly from imagined towns, districts and villages; the only real figures are dated Census of India counts (1951–2011) and approximate UN world milestones (1804–2022).
- Style follows the ICSE 2027 Biology specimen paper (523; `sources/cisce.md` `icse-2027-specimen-523-biology`): biological terms, odd one out with its category, give-reason items, a 5-blank fill-in passage, a labelled-diagram match, assertion-reason items in the specimen's option order, and 10-mark questions that open with a situation, an experiment or a diagram.
- **Originality:** every situation, person and figure is imagined and written by SOYL; no ICSE textbook text, exercise or specimen item is reused (D-036). An exact-stem check against every authored bank (including CBSE 10 Science and CBSE/ISC 12 Biology) and `originality --authored` report no duplicates.

## Shape
- **Decks:** Part 1 (13 slides): Population; The world population curve; India at each Census; Why did the population explode?; The gap between births and deaths; Quick check: the widest gap; Measuring a population: demography; Worked example 1: rates for a town; Quick check: the study of populations; Worked example 2: which district is more crowded?; Quick check: density; Summary; Exam tips. Part 2 (13 slides): Problems and Control; Problems of population explosion; Quick check: jobs; Worked example 1: per capita income; Why control population?; Slowing growth without surgery; Surgical methods: vasectomy and tubectomy; Vasectomy and tubectomy compared; Quick check: the method for women; Worked example 2: what still works after surgery?; Quick check: after tubectomy; Summary; Exam tips.
- **Visuals (18 of 26 slides):** flow 2, svg 4, table 12.
- **Diagrams (5 distinct SVGs):** all new — a J-shaped curve of world population milestones; a bar chart of the Census of India populations 1951–2011; a schematic graph of birth rate and death rate through four stages with the growth gap shaded; the sites of the cut in vasectomy and tubectomy (named, and lettered A–E for the match, a figure MCQ and a case question). Every SVG was rendered and checked by eye.
- **Narration:** 4–47 words per slide (mean 31); no symbols or abbreviations.

## Question bank (63 items, 142 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 18 | 18 (keys a 5, b 5, c 4, d 4) |
| assertion-reason | 6 | 6 (ICSE option order; keys c d a c b a) |
| true-false | 5 | 5 |
| short-1 | 10 | 10 |
| short-2 | 7 | 14 |
| short-3 | 3 | 9 |
| fill-blank-1 | 2 | 2 |
| numerical | 3 | 3 |
| fill-blank-5 | 2 | 10 |
| match-5 | 1 | 5 |
| case-based | 6 | 60 |

- **Case questions:** 6, each 10 marks in parts of 1–3 marks, some with an either/or part.
- **Difficulty:** d1 14 · d2 33 · d3 15 · d4 1.
- **Competency:** understanding 20 · analysis 16 · application 16 · recall 11. Application or higher is **51% of items (66% of marks)**, inside the 45–65 % lint band.

## Chapter tests (ICSE 10 Biology blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 3 short-1, 1 short-2 · B: 2 case (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 6 mcq, 1 assertion-reason, 3 short-1, 1 fill-blank (5), 1 match (5) · B: 3 case (10) (attempt 2 of 3).

## Verifier pass
- Every question, case part and alternative was re-solved from its stem; MCQ keys are balanced by the seeded placer (5/5/4/4) and assertion-reason keys use all four options.
- **Bank size:** the first draft had 59 items; four were added (a difficulty-4 Census reading item, a death-rate calculation, a true-false item on a falling population and a non-surgical measures MCQ) to reach 63.
- **Escapes:** one solution lost its LaTeX backslashes when it was appended through a shell heredoc; it was rewritten with the Edit tool and now passes KaTeX and the backslash lint.
- **Deck shape:** Part 2 was extended from 12 to 13 slides with a slide on lowering the birth rate without surgery.
- **Figures:** world-milestone year labels were moved off the curve, the vas deferens label split over two lines and a duplicated oviduct path removed, after rendering every SVG to PNG.
- Exact-stem check against every authored bank, `verify --authored` (0 blocking, 0 minor) and `originality --authored` (0 errors) pass.

## For a reviewer
- World population milestones are approximate UN figures: 1 billion about 1804, 2 billion 1927, 3 billion 1960, 4 billion 1974, 5 billion 1987, 6 billion 1999, 7 billion 2011, 8 billion 2022 (UN, November 2022). They are historical, not projections.
- Census of India populations are rounded to 0.1 crore (1951: 36.1 … 2011: 121.1). The 2001–2011 rise (18.2 crore, 17.7 per cent) is computed from these rounded values; no later Census figure is used (as of 2026).
- A difficulty-4 MCQ depends on the 1991–2001 rise (18.3 crore) being just larger than the 2001–2011 rise (18.2 crore) in the rounded figures; the official unrounded rises keep the same order, but a reviewer should confirm.
- Notes say India has about 2.4 per cent of the world's land area and, in an assertion-reason item, that India is seventh in the world by area; no current share of world population is quoted, because it changes year by year.
- The four-stage birth-rate and death-rate graph is schematic (illustrative rates, not data for any country) and the term "demographic transition" is not used.
- Growth rate is taught as (birth rate − death rate) ÷ 10 per cent with migration ignored; one case adds migration separately.
- Vasectomy and tubectomy are described as permanent because the tubes are difficult to rejoin; reversal surgery exists but is not taught.
- Per capita income examples use imagined villages and rupee amounts; no national income figure is quoted.
