# ICSE Class 10 Biology, Chapter 13 — Reproductive System

`icse-10-biology-ch13` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 16 slides), notes (6 sections), 30 flashcards, 68 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10bio_ch13_short` (20 marks, 30 min) and `t_icse10bio_ch13_long` (40 marks, 60 min), laid out as `icse-10-biology-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../icse-10-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/icse-10-biology-ch13/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All six ICSE syllabus topics, kept at Class 10 textbook level: the **male and female reproductive organs**, the **male accessory glands** and **secondary sexual characters**; the **structure and functions of the sperm and the egg**; **fertilisation, implantation, gestation and parturition**; the **placenta** (nutrition, respiration, excretion, endocrine), the **foetal membranes and amniotic fluid**; an **outline of the menstrual cycle** with the roles of **testosterone, oestrogen and progesterone**; **identical and fraternal twins**. Chromosome numbers, ovulation days for different cycle lengths, cycle phase lengths and gestation weeks are computed by `src/calc.mjs`.
- Style follows the ICSE 2027 Biology specimen paper (523; `sources/cisce.md` `icse-2027-specimen-523-biology`): biological terms, odd one out with its category, give-reason items, a 5-blank fill-in passage, a labelled-diagram match, assertion-reason items in the specimen's option order, and 10-mark questions that open with a situation, an experiment or a diagram.
- **Originality:** every situation, person and figure is imagined and written by SOYL; no ICSE textbook text, exercise or specimen item is reused (D-036). An exact-stem check against every authored bank (including CBSE 10 Science and CBSE/ISC 12 Biology) and `originality --authored` report no duplicates.

## Shape
- **Decks:** Part 1 (14 slides): The Human Reproductive System; The male reproductive system; Male organs and their work; Quick check: accessory glands; Worked example 1: the path of a sperm; The female reproductive system; Female organs and their work; Quick check: where the embryo grows; Secondary sexual characters; Sperm and egg; Worked example 2: counting chromosomes; Quick check: the sperm cap; Summary; Exam tips. Part 2 (16 slides): From Fertilisation to Birth; Fertilisation and implantation; Quick check: where fertilisation happens; The foetus, placenta and amnion; What the placenta does; Foetal membranes and amniotic fluid; Quick check: the fluid sac; Worked example 1: how long is gestation?; The menstrual cycle; The sex hormones; Worked example 2: when is ovulation?; Quick check: mid-cycle; Identical and fraternal twins; Quick check: same sex?; Summary; Exam tips.
- **Visuals (21 of 30 slides):** flow 3, svg 6, table 12.
- **Diagrams (8 distinct SVGs):** all new, simplified front-view line drawings — the male reproductive system (named, and lettered A–E for a case question); the female reproductive system (named, and lettered A–E for the diagram match and a figure MCQ); a sperm and an egg (not to scale); a foetus in the uterus with the placenta, umbilical cord, amnion and amniotic fluid; a strip chart of a 28-day menstrual cycle with the thickness of the uterine lining; how identical and fraternal twins form. Every SVG was rendered and checked by eye.
- **Narration:** 3–50 words per slide (mean 31); no symbols or abbreviations.

## Question bank (68 items, 148 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 24 | 24 (keys a 6, b 6, c 6, d 6) |
| assertion-reason | 7 | 7 (ICSE option order; keys c b c b d a c) |
| short-1 | 11 | 11 |
| short-2 | 6 | 12 |
| short-3 | 4 | 12 |
| true-false | 2 | 2 |
| fill-blank-1 | 3 | 3 |
| numerical | 2 | 2 |
| fill-blank-5 | 2 | 10 |
| match-5 | 1 | 5 |
| case-based | 6 | 60 |

- **Case questions:** 6, each 10 marks in parts of 1–3 marks, some with an either/or part.
- **Difficulty:** d1 14 · d2 33 · d3 20 · d4 1.
- **Competency:** understanding 21 · recall 15 · application 15 · analysis 17. Application or higher is **47% of items (59% of marks)**, inside the 45–65 % lint band.

## Chapter tests (ICSE 10 Biology blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 3 short-1, 1 short-2 · B: 2 case (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 6 mcq, 1 assertion-reason, 3 short-1, 1 fill-blank (5), 1 match (5) · B: 3 case (10) (attempt 2 of 3).

## Verifier pass
- Every question, case part and alternative was re-solved from its stem; MCQ keys are balanced by the seeded placer (6/6/6/6) and assertion-reason keys use all four options.
- **Bank size and balance:** the first build had 76 items and only 37% application or higher. Eight recall or true-false items (umbilical cord, gestation and placenta terms, cycle length, three true-false items, a secondary-character list) were removed, and four items were rewritten as situations (low amniotic fluid, a small placenta, a failing corpus luteum, damaged seminiferous tubules): 68 items, 47% application or higher.
- **Word limits:** one 2-mark case answer (puberty case part a) was expanded into the 20–45 word band.
- **Figures:** label leaders in the female system (uterus, lining) and male system (penis) were moved off the ovary and testis, the ovulation label lifted off the lining curve, and two overlapping twin labels split, after rendering every SVG to PNG.
- **Age-appropriateness:** the chapter describes organs, gametes, fertilisation and pregnancy in neutral textbook terms; it does not describe how sperms are transferred, and the drawings are schematic outlines.
- Exact-stem check against every authored bank, `verify --authored` (0 blocking, 0 minor) and `originality --authored` (0 errors) pass.

## For a reviewer
- The scrotum is said to keep the testes about 2–3 °C below body temperature (usual textbook value).
- Gestation is given as about 280 days (40 weeks) counted from the first day of the last menstruation, roughly nine months; counted from fertilisation it is about 38 weeks.
- Implantation is said to happen about a week after fertilisation.
- The cycle outline uses the textbook idealisation (menstruation days 1–5, repair 6–13, ovulation about day 14, progesterone phase 15–28) and the rule that ovulation is about 14 days before the next menstruation; a case says cycles of 26 to 32 days are normal, a simplification of a wider normal range.
- Placental hormones are named as progesterone (and oestrogen); hCG is not taught.
- A puberty case part names FSH and LH as the pituitary hormones that stimulate the gonads (from ch12).
- The scan case says nicotine and some medicines can cross the placenta and harm the foetus (for example low birth weight), stated in general terms.
