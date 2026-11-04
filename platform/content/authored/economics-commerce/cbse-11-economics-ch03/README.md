# CBSE Class 11 Economics, Chapter 3: Organisation of Data

`cbse-11-economics-ch03` · release v1 · academic year 2026-27 · family `economics-commerce` (Part A: Statistics for Economics) · provenance `human`, every item `status: "draft"`

Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-11-economics-ch03/src/build.mjs` from `platform/`). The build validates the schema, runs the pipeline lint and deterministic verify checks, word limits, narration rules, editorial counts and the answer-leak scan, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON. The shared `lib.mjs` and `stats.mjs` are imported from `cbse-11-economics-ch01/src/` and are not copied here.

## Scope
Syllabus topic t01 only (Variables and frequency distributions); all 79 items are tagged `t: 1`. Raw data and classification (four types), continuous and discrete variables, frequency distribution and its terms, exclusive and inclusive classes and their adjustment, discrete and grouped distributions, tally marks, number of classes and class width, unequal and open-ended classes, loss of information, bivariate frequency distribution, less than and more than cumulative frequencies. Histogram, frequency polygon and ogive belong to chapter 4 and are not taught here; one bar chart of a computed distribution is shown.

## Contents
| File | What |
|---|---|
| `release.json` | 2 decks (18 + 20 slides), notes (7 sections), 33 flashcards, 79 questions (142 marks; 4 case-based items with 12 parts) |
| `tests.json` | short test (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and long test (40 marks, 90 min, `cbse-11-default-chapter-test-long`) |
| `src/questions.mjs` | imagined data sets, computed frequency tables and the question bank |
| `src/build.mjs` | visuals, decks, notes, flashcards, tests |

- Deck 1 (18 slides, 11 visuals, 4 checks, 2 worked examples): raw data, classification, variables, class terms, exclusive and inclusive classes, adjustment.
- Deck 2 (20 slides, 15 visuals, 4 checks, 4 worked examples): discrete and grouped distributions, class width, unequal and open-ended classes, loss of information, bivariate table, cumulative frequency.
- Own SVGs (no maps): classification-types chart, continuous-versus-discrete comparison, raw-data-to-frequency-table flow, bar chart of the computed marks distribution.
- Imagined data sets: marks of 40 students (Saraswati Vidyalaya), daily wages of 30 workers (Sunrise Brick Works), household sizes of 36 households (Palash Nagar), pocket money of 25 students (Kaveri Public School), vehicles of 30 families (Gulmohar Apartments), study hours of 30 students (Tarini Academy), advertisement and sales of 30 firms (Meghna Industrial Estate), children in 15 families (Orchid Heights).
- Questions: mcq 26, assertion-reason 6, true-false 3, fill-blank 3, match 2, ordering 2, numerical 11, short 2-mark 10, short 3-mark 6, long 5-mark 6, case-based 4. Difficulty d1/d2/d3/d4 = 8/32/31/8. Competency: recall 10, understanding 23, application 34, analysis 11, evaluation 1 (58% application or above).
- Tests (disjoint, no deck-check item, no numerical item). Short: A m_cont, m_class_mark, m_cumulative, ar_exclusive_adjust; B s2_variable, s2_cum, s3_adjust; C one of l_types / l_loss; D cb_marks. Long: A eight mcq and two assertion-reason; B two short 2-mark, one of two 2-mark, one 3-mark, one of two 3-mark; C l_construct and one of l_cum / l_biv; D cb_wages and cb_firms.

## How verified
- Every figure is computed with `stats.mjs` (`sum`, `cumulative`, `rnd`, `check`) and plain code from the raw lists: counts by `data.filter(x => x >= l && x < u).length`, class marks and widths from the class limits, "less than" with `cumulative()`, "more than" by counting values at or above each lower limit and cross-checked against total minus the earlier cumulative count, bivariate cells and row and column totals from the pairs. Every figure is computed with stats.mjs and asserted: frequencies add up to n, adjusted inclusive limits equal the exclusive limits shifted by 0.5, and inclusive and exclusive counts agree. Figures quoted in prose and narration are pinned with `check()` (40 students, frequencies 3, 7, 8, 10, 7, 3, 2, students below 70 = 28, 60 or more = 22, wage range 220, trial width 44, households with at most 4 members 24, bivariate cell 9, class-mark total 105 against actual 107).
- Build prints `NO ERRORS`, lint 0 errors and 0 warnings; repeated builds give byte-identical `release.json` and `tests.json`; no `*.wip.json` remains.
- Near-duplicate scan: 0 flags; SVG label scan: 4 figures, 0 issues.

## Facts for a reviewer
1. Raw data are data as collected, unorganised and in no set order.
2. Classification is arranging data into groups or classes on the basis of common characteristics.
3. Four types of classification: chronological (by time), spatial (by place), qualitative (by attribute), quantitative (by magnitude).
4. A variable is a characteristic that takes different values for different units.
5. A continuous variable can take any value within a range (height, weight, income); a discrete variable takes only separate values, usually whole numbers (number of children, number of cars). Income is treated as continuous, as in the brief, although it is recorded to the paisa.
6. Frequency distribution: a table showing how the values of a variable are distributed among classes, with the frequency (number of observations) of each class. Frequencies add up to the number of observations.
7. Class: a group of values. Class limits: lower and upper ends. Class interval (width) = upper limit minus lower limit. Class mark (mid-value) = (upper limit + lower limit) / 2. Frequency: number of observations in the class.
8. Exclusive classes: the upper limit is excluded (30 to 40, 40 to 50); a value equal to a limit is counted in the class where it is the lower limit.
9. Inclusive classes: both limits belong to the class (30-39, 40-49); there is a gap between classes.
10. Adjusting inclusive to exclusive: half of the gap between a class's upper limit and the next class's lower limit is subtracted from every lower limit and added to every upper limit (gap 1, so 0.5; 30-39 becomes 29.5 to 39.5). Class marks are unchanged by the adjustment.
11. Equal class widths allow direct comparison; unequal widths are allowed and used when values crowd in one part of the range. Open-ended classes have no limit at one end, so their class mark cannot be found without assuming a limit.
12. Number of classes and width: no fixed rule; too few classes hide the pattern, too many give a table as long as the raw list; width about range / number of classes, rounded to a convenient value, starting from a round figure at or below the lowest value. No Sturges-type formula is used.
13. Tally marks: one stroke per observation, four strokes crossed by the fifth. Text convention in this chapter: a completed group of five is written IIII/ and leftover strokes as I (so 12 is IIII/ IIII/ II). The brief's example string "IIII IIII II" was read as the same idea; the slash is added so that a group of five and four loose strokes cannot be confused.
14. Loss of information: once data are grouped, individual values are lost and the class mark represents the class (imagined class 30 to 40: actual total 107, class-mark total 105).
15. Discrete (ungrouped) frequency distribution: one row for each value of a discrete variable; grouped frequency distribution: classes, for continuous data or discrete data with many values.
16. Bivariate frequency distribution: a two-way table classifying the same units on two variables at once, with a count in each cell and row and column totals; the totals are the distributions of the single variables. A tabulated pattern shows association, not cause.
17. Less than cumulative frequency of a class: number of observations below its upper limit (computed with `cumulative()`); more than cumulative frequency: number at or above its lower limit.
18. No real statistics, official figures, maps or quotations are used; every data set, school, colony, firm and survey is imagined.

## Unsure or to double-check
- The tally text convention (item 13) differs slightly from the brief's example string; please confirm it is acceptable.
- The number-of-classes guidance is kept informal (range divided by classes); no formula such as Sturges is taught.
- Wage classes: about 5 classes from range / width, but 6 when classes start at the round figure 200 (item `num_classes` asks for 6, and the stem says so).
- Deck check slides: deck 1 uses `m_spatial`, `m_disc`, `m_exclusive`, `m_adjust`; deck 2 uses `m_discrete_freq`, `m_openended`, `num_cum_less`, `ord_construct`, none used in a test.
