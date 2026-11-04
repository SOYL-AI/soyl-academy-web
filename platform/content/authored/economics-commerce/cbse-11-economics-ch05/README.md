# CBSE Class 11 Economics, Chapter 5: Measures of Central Tendency

`cbse-11-economics-ch05` · release v1 · academic year 2026-27 · family `economics-commerce` (Part A: Statistics for Economics) · provenance `human`, every item `status: "draft"`

Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-11-economics-ch05/src/build.mjs` from `platform/`). The build validates the schema, runs the pipeline lint and deterministic verify checks, word limits, narration rules, editorial counts and the answer-leak scan, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON. The shared `lib.mjs` and `stats.mjs` are imported from `cbse-11-economics-ch01/src/` and are not copied here.

## Scope
Syllabus topics t01 and t02 only. t01 arithmetic mean: individual series (direct and assumed-mean), discrete series, continuous series (direct, assumed-mean and step-deviation on the same data), weighted mean, properties (zero sum of deviations, effect of extreme values), merits and demerits. t02 median and mode: median of individual, discrete (cumulative frequency) and continuous series, graphic median from the ogives (one figure; ch04 teaches ogives), mode of individual, discrete and continuous series, graphic mode from a histogram, choosing among the three averages. Not taught: quartiles, percentiles, the empirical relation between mean, median and mode, measures of dispersion.

## Contents
| File | What |
|---|---|
| `release.json` | 2 decks (20 + 21 slides), notes (7 sections), 32 flashcards, 77 questions (140 marks; 4 case-based items with 12 parts) |
| `tests.json` | short test (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and long test (40 marks, 90 min, `cbse-11-default-chapter-test-long`) |
| `src/questions.mjs` | question bank and every computed data set |
| `src/build.mjs` | SVG figures, decks, notes, flashcards, tests |

- Deck 1 (20 slides, 15 visuals, 4 checks, 4 worked examples): average and central tendency, mean of individual, discrete and continuous series, three methods on one data set, weighted mean, balance-point figure, extreme values, merits and demerits.
- Deck 2 (21 slides, 17 visuals, 3 checks, 5 worked examples): median (individual, discrete, continuous), ogives, positional average, mode (individual, continuous), histogram location, comparison, choosing the average.
- Own SVGs (4, all drawn from the computed data, no maps): mean as a balance point with deviations, two ogives meeting at the median, histogram with the mode located by the corner-joining lines, choose-the-average flow chart.
- Questions: mcq 24, assertion-reason 5, true-false 3, fill-blank 2, match 2, ordering 2, numerical 13, short 2-mark 10, short 3-mark 6, long 5-mark 6, case-based 4. Difficulty d1/d2/d3/d4 = 7/17/38/15. Competency: recall 9, understanding 18, application 39, analysis 8, evaluation 3 (65% application or above).
- Tests (disjoint, no deck-check item, no numerical item). Short: A m_avg_meaning, m_step_formula, m_median_robust, ar_mean_extreme; B s2_mean_def, s2_median_def, s3_assumed; C one of l_mean3 / l_mode_cont; D cb_footwear. Long: A m_mean_def, m_classmark, m_extreme_mean, m_weighted_when, m_median_pos, m_cf_use, m_mode_def, m_choose_income, ar_median_pos, ar_mode_cum; B s2_avg, s2_zero, one of s2_extreme / s2_weighted_why, s3_discrete_mean, one of s3_median_disc / s3_modal; C l_median_cont and one of l_props / l_choose; D cb_hamlet and cb_rain.
- Deck check items (kept out of both tests): n_kal_mean, n_quiz_mean, n_wtd_arjun, m_dev_zero (deck 1); n_quiz_median, m_modal_class, mt_situation (deck 2).

## How verified
- Every figure is computed with `stats.mjs` (`mean`, `meanDiscrete`, `meanGrouped`, `meanAssumed`, `meanStep`, `median`, `medianGrouped`, `mode`, `modeGrouped`, `cumulative`, `mids`, `sum`, `rnd`, `check`) or plain code (discrete median and mode, weighted means, graphic mode) from imagined data and asserted with `check()`: Dhunmarg rainfall (mean 11, deviations -17 and +17, median 10.5, mean 16 and median 10.5 with one extreme day), Tarapur Cable Works wages of 50 workers (mean 798 by direct, assumed-mean and step-deviation methods, sums fm 39900, fd -2600, fd' -26, median 792.86, mode 775, graphic mode intersection equal to the formula), Step-Up Footwear (mean 7.3, median 7, mode 7), the quiz (mean 6.55, median 6.5, mode 6), Vidyamandir marks (mean 48.5, median 48.33, mode 47.5), Anandpur Dairy (27, 27.14, 26.67), Riverside Bank (12.3, 11.79, 9.29), Chandanpur incomes (34, 24, 23 without the extreme family), weighted means (70, 68.5, 116, 72), the corrected mean 476.4 and the missing observation 52, among others. Every SVG is drawn from the same arrays.
- Build prints `NO ERRORS`, lint 0 errors and 0 warnings; three consecutive builds give byte-identical `release.json` and `tests.json`; no `*.wip.json` remains.
- Near-duplicate scan: 77 stems against 38,856 others, 0 flags; SVG label scan: 4 figures, 0 issues.
- Not run, as instructed: git, `npm test`, tree-wide gates, e2e. The SVGs were not viewed in a browser; they were checked by the label overflow/overlap scan and by construction from the data.

## Facts for a reviewer
1. An average is a single value that represents a whole set of data; averages are measures of central tendency (values tend to cluster around a centre).
2. Arithmetic mean = sum of observations divided by their number. Individual series: ΣX/N (direct), A + Σd/N with d = X − A (assumed mean).
3. Discrete series: ΣfX/Σf. Continuous series: class mark m = (lower + upper)/2; direct Σfm/Σf; assumed mean A + Σfd/Σf with d = m − A; step deviation A + (Σfd'/Σf) × h with d' = (m − A)/h, h the common class width. The three methods give the same mean.
4. Weighted arithmetic mean = ΣWX/ΣW (divide by the total weight, not the number of items). The imagined basket example uses price relatives as the values.
5. Properties: the algebraic sum of deviations from the mean is zero; the mean is affected by extreme values. Merits (simple, uses every value, basis of further calculation) and demerits (affected by extremes, not exact with open classes, may not be an actual value) as listed in the notes.
6. Median = middle value of the arranged series, dividing it into two equal parts; a positional average, not affected by extreme values. Individual and discrete series: value of the ((N + 1)/2)th item; for even N the average of the two middle items (a median such as 10.5 need not be an observed value).
7. Discrete median is found with cumulative frequencies (the first value whose cumulative frequency reaches the position). When N is even, the items at the floor and ceiling of (N + 1)/2 are both located this way and averaged.
8. Continuous median = L + ((N/2 − c.f.)/f) × h, where the median class is the first class whose cumulative frequency is N/2 or more (N/2, not (N + 1)/2, is used for grouped data) and c.f. is the cumulative frequency of the class before it.
9. The less than and more than ogives intersect at the median; the cumulative frequency at the intersection is N/2 (checked in code, one figure; ch04 teaches ogives).
10. Mode = most frequently occurring value; individual and discrete series read from the frequencies. A series may have more than one mode or none (stated in text; every numerical item uses a unique mode, enforced by the helpers).
11. Continuous mode = L + (D1/(D1 + D2)) × h with D1 = f1 − f0, D2 = f1 − f2, f1 the modal class frequency (highest), valid for equal classes.
12. Graphic mode on a histogram of equal classes: join the top right corner of the preceding bar to the top right corner of the modal bar, and the top left corner of the modal bar to the top left corner of the following bar; the horizontal-axis value below the intersection is the mode (equal to the formula; asserted in code). This is the usual textbook construction.
13. Choosing an average: median with extreme values, mode for the most popular item, mean when every value counts, weighted mean when items differ in importance.
14. All data, places, firms, schools, hill stations and people are imagined; no real statistics are used.

## Unsure or to double-check
- Quartiles, percentiles and the empirical relation (mode = 3 median − 2 mean) are deliberately not taught, per the brief.
- Fact 12 describes the corner-joining construction in words; the figure shows the two lines and their intersection, not construction arcs.
- The histogram, ogive and mode figures start the horizontal axis at 500 with a drawn axis break mark; captions do not mention it.
- A few non-numerical narration lines state small whole numbers in words (for example "nine of the ten days had at most seven millimetres", "three fourths of the class width") that were checked by hand against the computed data rather than by `check()`.
