# CBSE Class 11 Mathematics — Chapter 13: Statistics (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026, D-050) written to the maths exemplar standard and the structure of the CBSE 12 Mathematics
chapters. Author: `claude-sonnet-5-5 (subject-producer chapter writer)`, provenance `origin: "human"`, `model: null`. All items are `status: "draft"` until review.

`src/lib.mjs` (builders, re-solve harness, validator, CBSE 11 chapter-test layout) and `src/lint.mts` are the shared CBSE 11 Mathematics copies, unchanged.
The shared lib stamps its own author string into provenance; `build.mjs` rewrites it to this chapter's author in `release.json` after the build.
`src/stat.mjs` is the exact-statistics engine: a BigInt rational class (`Fr`) and `Dist`, one distribution type for raw data, discrete frequency tables and grouped (continuous-class) tables, with mean, median (sorted list, or the class formula for grouped data), range, mean deviation about any point, and the variance by four independent routes. `src/data.mjs` holds the 12 data sets used in the decks and notes and asserts their headline numbers on load. `src/visuals.mjs` and `src/notes.mjs` build every figure, table, note and flashcard from those sets.

## Scope (2026-27 syllabus, 041)
- **t01** Measures of dispersion: range (raw, frequency and grouped data), deviation, mean deviation about the mean and about the median for ungrouped data, frequency distributions and grouped data (class marks; the median of grouped data by the class formula), why the median minimises the sum of absolute deviations (shown on a graph).
- **t02** Variance and standard deviation: the definition, the shortcut formula (mean of squares minus the square of the mean), frequency and grouped data with the assumed-mean / step-deviation method (listed under "calculate variance and standard deviation" in practice), the effect of a shift and a scale factor, and the coefficient of variation for comparing consistency.
- No topic in this chapter is `board_assessed: false`; both topics are board assessed. The subject-level removed topics do not appear. Not covered (outside the syllabus list): combined variance of two groups, skewness and moments.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Range and mean deviation" (t01) 19 slides; Part 2 "Variance and standard deviation" (t02) 20 slides |
| Worked examples | 6 + 6 (range of raw and grouped data; MD about the mean; MD about the median, even n; MD of a frequency table; MD of grouped data about the mean and about the median; variance by definition; shortcut formula; step deviation for a frequency table and for grouped data; a change of scale; comparing consistency by C.V.) |
| Visuals | 31 of 39 slides (table 21, plot 8, flow 2; the 8 slides without one are check slides; max 1 slide in a row without one). Notes and questions: table 8, plot 4, flow 1 |
| Check slides | 4 + 4, all objective (m16, n1, tf1, fb1; m17, n2, tf2, fb2), none used in the chapter tests |
| Notes | 7 sections (why measure spread; range; mean deviation of ungrouped data; frequency and grouped mean deviation; variance and SD; step deviation; shift, scale and C.V.), each with key terms, formulas and a visual; exam tips with a mark split and 6 common mistakes |
| Flashcards | 30 (formula 9, definition 7, fact 5, concept 5, exam-tip 4) |
| Questions | 71 items, 139 marks: mcq 18, assertion-reason 6 (keys a b c d a c), true-false 6, fill-blank 6, numerical 6, short-2 9, short-3 8, long-5 7, case-based 5 (each 1 + 1 + 2 with an either/or part (c) via `alternatives`) |
| MCQ keys | a 6, b 6, c 6, d 5 (rotated by the build) |
| Difficulty | d1 10, d2 27, d3 25, d4 9 |
| Competency | recall 3, understanding 23, application 34, analysis 11 — application or higher 63 % of items, 79 % of marks (lint band 45–65 % of items) |
| Topics | t01 32 items, t02 40 |
| Tests | `t_cbse11math_ch13_short` (20 marks / 40 min: A m02 m04 m11 ar1; B s201 s203 s301; C l01 or l04; D c01) and `_long` (40 marks / 90 min: A m03 m05 m06 m10 m12 m14 m15 m18 + ar2 ar4; B s202 s204 [s205 s207] s302 [s303 s306]; C l02 [l03 l05]; D c02 c03), on `cbse-11-default-chapter-test-short/-long`; disjoint, and no deck-check item is used |

## Verifier record
Build from `platform/`: `npx tsx content/authored/maths/cbse-11-mathematics-ch13/src/build.mjs` (prints stats and `NO ERRORS`; rebuilding is byte-identical, md5 checked twice for `release.json` and `tests.json`).
Lint this chapter: `npx tsx content/authored/maths/cbse-11-mathematics-ch13/src/lint.mts content/authored/maths/cbse-11-mathematics-ch13` (0 errors, 0 warnings).
`verify-local.mts` (numerical items need an "=" step ending at the key): 71 questions, 0 flags. `dblslash.cjs` over `content/authored/maths`: total 0.

- **Re-solve:** 158/158 checks pass (`src/resolve.log`). Every mean, median, range, mean deviation, variance, standard deviation, coefficient of variation and sum (`sum fx`, `sum f|x - a|`, `sum fu`, `sum fu^2`) in a key, a distractor, a solution or a model answer comes from `stat.mjs` with BigInt rationals, never floating point. A square root is exact when the variance is a rational square (variances 25, 36, 64, 81, 144, 196, 289/25 and others give SD 5, 6, 8, 9, 12, 14, 17/5) and otherwise is rounded half-up by integer square root to a stated number of decimals (for example 24.4 gives 4.94, 88.8 gives 9.42, 161 gives 12.69, 24 gives 4.90). Coefficients of variation are exact rationals rounded the same way (for example 300/11 gives 27.27 per cent).
- **Method agreement:** every data set is verified on load: the variance by the definition equals the shortcut formula, the assumed-mean route and the step-deviation route exactly; the deviations about the mean add to zero; the mean deviation about the median never exceeds the one about the mean for ungrouped data (not asserted for grouped data, where the interpolated median can break it, as in the screen-time example). Shift and scale rules are tested on data (SD times |k|, variance times k squared). The identity behind the shortcut formula is tested on three data sets (long item l07).
- **Text claims:** every number written into a caption, alt text, narration or slide bullet (sums, totals, means, the grouped medians, SDs) is asserted against the data in a block at the end of `build.mjs`; the build throws if one disagrees.
- **Plots:** 6 marked points, all on their plotted curves (the median and mean on the mean-deviation curve, the mean on the squared-distance parabola, with labels matching the coordinates); no zeros are marked. Dot strips, histograms and bar charts are scatter or bar series with dashed `vlines` for the mean, so there are no marked points to check.
- **KaTeX:** 1,198 maths strings parse with KaTeX in strict mode; no lost backslashes, no LaTeX outside `$…$`; no Unicode maths symbols inside maths.
- **Narration:** 39 slides, max 74 words, mean 50; numbers written in words, no symbols, letter-digit mixes or capitalised abbreviations.
- **Stage-5 gates:** `npm run content -- originality --authored` reports this unit `ok` (0 errors, 0 warnings).
- **Originality:** the CBSE 10 ch13 and ICSE 10 ch22/ch23 stems (central tendency: class marks, mean by assumed mean and step deviation, median, mode, ogives) were read first. This chapter is about dispersion; none of their data sets, contexts (ages, goals, marks, ogive questions) or wording is reused. Contexts here are all imagined (hill-village temperatures, a ferry service, a food truck, a clinic, a stall, a bakery, kiosks, machines, a study app) and numbers are chosen so the answers are exact.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- The coefficient of variation, the effect of a shift and scale, and the step-deviation shortcut are standard Class 11 material but are not listed as separate syllabus topics; they sit under t02 and carry about a quarter of its items.
- The median of grouped data uses the class formula from Class 10; mean deviation about the median for grouped data is therefore an estimate from class marks and can slightly exceed the one about the mean.
- Variance is defined with divisor n (population form), as in the Class 11 course; the n-1 form is not covered.
- The competency share (63 % application or higher) is at the upper end of the lint band because most items are procedural calculations; about 35 % of the items (definitions, one-step ranges and square roots, shift and scale reasoning) are tagged recall or understanding.
