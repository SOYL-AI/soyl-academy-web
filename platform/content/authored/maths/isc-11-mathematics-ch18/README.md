# ISC Class 11 Mathematics - Chapter 18: Statistics: Measures of Dispersion (authored, v1)

Hand-authored production chapter (D-025, D-026, D-050) for ISC 2028 Class XI Mathematics, Unit 5: Statistics and Probability.

- **Author:** `claude-sonnet-5-5 (subject-producer chapter writer)`, provenance `origin: "human"`.
- **Status:** all items are `status: "draft"`.
- **Shared library:** `src/lib.mjs` is the ISC 11 Mathematics builder lib, copied unchanged. Its `build()` runs the KaTeX, narration, plot and scheme checks, the pipeline's stage-4 lint and stage-5 deterministic checks, and the exact-stem originality pre-check against every other authored chapter. Chapter modules: `src/stat.mjs` and `src/stat2.mjs` (exact BigInt-rational statistics, exact surd standard deviations, the three working tables, combined statistics, corrections), `src/data.mjs` (every data set, verified on load), `src/qh.mjs` (question and working-text helpers), `src/vis.mjs` and `src/vis2.mjs` (visuals with self-checks), `src/questions*.mjs`, `src/build.mjs`.

## Scope (syllabus `isc-11-mathematics-ch18`, no removed topics)

- **t01** Range and coefficient of range (ungrouped and grouped data); mean deviation about the mean for raw data, discrete frequency distributions and grouped data (class marks); deciding which of two data sets is more spread out.
- **t02** Variance and standard deviation by the direct, short-cut (assumed mean) and step-deviation methods for raw, discrete and grouped data; effect of adding a constant and of multiplying by a constant; coefficient of variation and comparing consistency; correcting a wrongly copied observation.
- **t03** Combined mean and standard deviation of two groups, including finding an unknown size, mean or standard deviation.
- **Scope decision:** the mean deviation about the median (and other statistics outside the ISC topic list for this chapter) is not taught or tested; the CBSE 11 chapter covers it, ISC 11 does not.

## Contents

| Item | Count |
|---|---|
| Decks | Part 1 "Range, mean deviation and the direct method" (t01 and the direct method of t02), 23 slides; Part 2 "Short-cut and step-deviation methods, consistency and combined groups" (t02, t03), 24 slides |
| Visuals | 41 of 47 slides have one (working tables generated from the data, 4 plots, 3 flows); never more than 1 slide in a row without a visual |
| Worked examples | 7 + 9, each recomputed and asserted |
| Check slides | 3 + 3 on objective items used in neither test: fb1, n1, tf1 (Part 1); n2, fb2, fb5 (Part 2) |
| Notes | 7 sections with key terms, formulas and visuals; exam tips with mark split and common mistakes |
| Flashcards | 31 |
| Questions | 80 items worth 140 marks: 25 mcq, 6 assertion-reason, 8 true-false, 7 fill-blank, 6 numerical, 10 short-2, 11 short-3, 7 long-5 (in labelled parts, 5 scheme steps each) |
| Difficulty | d1 15, d2 20, d3 29, d4 16 |
| Competency | recall 9, understanding 24, application 35, analysis 12: application or higher is 59% of items and 74% of marks |
| MCQ keys | a 7, b 6, c 6, d 6; assertion-reason keys a b c d a b |
| Tests | `t_isc11math_ch18_short` and `t_isc11math_ch18_long` (details below) |

**Short test** (`t_isc11math_ch18_short`), 20 marks in 50 minutes:
- Section A: m02, m05, m12, m19 and ar2.
- Section B: s201, then s205 or s207.
- Section C: s301, then s304 or s308.
- Section D: l01.

**Long test** (`t_isc11math_ch18_long`), 40 marks in 100 minutes:
- Section A: m01, m04, m07, m08, m10, m14, m16, m17, m18, m20, ar3 and ar5.
- Section B: s202, s203, then s206 or s210.
- Section C: s302, s303, s305, then s307 or s310.
- Section D: l02, then l03 or l05.

The tests are disjoint, contain no deck-check item, and follow the `isc-11-default` blueprints item for item. Spare practice items: m03, m06, m09, m11, m13, m15, m21 to m25, ar1, ar4, ar6, tf2 to tf8, fb3, fb4, fb6, fb7, n3 to n6, s204, s208, s209, s306, s309, s311, l04, l06 and l07.

## Verifier record (what the build computes and asserts)

- **Exact arithmetic.** Every mean, deviation, sum of squares, variance, coefficient of variation and combined value is a BigInt rational. A data set is built once in `data.mjs` and every statistic is recomputed by code from it; each table in a slide, solution or model answer is generated from the data (`dirTable`, `shortTable`, `stepTable`, `mdTable`).
- **Three methods agree.** On load every data set must give the same variance by the definition, by $\frac{\sum fx^2}{n} - \bar{x}^2$, by the assumed-mean route and by the step-deviation route; the signed deviations must add to $0$. The short-cut variance of the tea-sales data is also checked for five different assumed means.
- **Standard deviations.** An exact rational root is used when the variance is a rational square; otherwise an exact surd $p\sqrt{q}/d$ (square-free $q$ re-checked) and a decimal rounded by integer square root, whose rounding is re-checked by squaring the half-unit bounds. Percentages (coefficient of variation) are rounded and checked the same way.
- **Combined statistics.** `combine()` (the $d_i$ formula) is checked against a real merged data set: each group is rebuilt as an actual list with the stated size, mean and standard deviation, the lists are merged, and the merged mean and variance must equal the formula.
- **Corrections.** `correct()` (sums $n\bar{x}$ and $n(\sigma^2 + \bar{x}^2)$, swap the wrong value for the right one) is checked on the true list: the recorded statistics come from the list with the wrong value, and the corrected statistics must equal those of the true list.
- **Effect of a constant.** Adding $b$ and multiplying by $a$ are checked on real lists (variance unchanged by the shift, multiplied by $a^2$ by the scale; the Celsius to Fahrenheit example on a ten-value list).
- **Unknown frequencies and sizes** (long item l07, short item s309) are found by search as well as algebra.
- **Distractors** are each computed from their own wrong method (no division by $n$, division by $n - 1$, variance instead of standard deviation, frequencies ignored, plain average instead of weighted mean, missing $d^2$ terms, etc.) and asserted distinct; each distractor explanation names the option by its value.
- **Re-solve checks:** 185 of 185 pass. KaTeX parses 2074 maths strings in strict mode.
- **Stage-4 lint:** 0 errors, 0 warnings. `verify-local`: 80 questions, 0 flags. Doubled-backslash scan: total 0. Originality gate: 0 errors. Rebuild is byte-identical (md5 of `release.json` and `tests.json`).

## Originality notes

- The bank already holds the CBSE 11 Mathematics ch13 Statistics items (and CBSE 9/10, ICSE 10 statistics). None of their set-ups is reused: no hostel kitchen, seedling, shop customers, stamp club, pianist, ticket counter, delivery vans, tailor, call centre, museum visitors, flats' electricity use, machine P/R, entrance test, cyclists, food truck, text messages, hockey goals or puzzle times; all data sets here are new and chosen for exact answers. Mean deviation about the median is not used at all.
- Contexts are imagined (cricketers, rainfall at a hill station, a tea canteen, a typing class, parcels, ribbons, seeds, a music school, and so on). No people, shops or places are real.
- No CISCE specimen or past-paper question is reproduced; the specimen papers are used for the paper pattern only.

## Known gaps

- Mean deviation about the median and the coefficient of mean deviation are not in the ISC topic list for this chapter and are not taught.
- Standard deviations of discrete or grouped data with an irrational variance are given as exact surds with a rounded decimal; the plot spec has no box-plot element, so spread comparisons use dot strips and histograms.
- No case-based item (the ISC 11 blueprints have no case-based slot).
