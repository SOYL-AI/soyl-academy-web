# CBSE Class 11 Economics, Chapter 4: Presentation of Data

`cbse-11-economics-ch04` · release v1 · academic year 2026-27 · family `economics-commerce` (Part A: Statistics for Economics) · provenance `human`, every item `status: "draft"`

Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-11-economics-ch04/src/build.mjs` from `platform/`). The build validates the schema, runs the pipeline lint and deterministic verify checks, word limits, narration rules, editorial counts and the answer-leak scan, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON. The shared `lib.mjs` and `stats.mjs` are imported from `cbse-11-economics-ch01/src/` and are not copied here.

## Scope
Syllabus topics t01 to t03 only: t01 tabular presentation (forms of presentation, parts of a table, classification); t02 diagrams, bar (simple, multiple, component, percentage component) and pie; t03 histogram (including unequal classes), frequency polygon, frequency curve, less than and more than ogives, arithmetic line graph. Measures of central tendency are not taught here beyond reading the median from the ogives.

## Contents
| File | What |
|---|---|
| `release.json` | 2 decks (20 + 19 slides), notes (7 sections), 30 flashcards, 77 questions (140 marks; 4 case-based items with 12 parts) |
| `tests.json` | short test (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and long test (40 marks, 90 min, `cbse-11-default-chapter-test-long`) |
| `src/questions.mjs` | question bank and all computed data sets |
| `src/build.mjs` | SVG figures, decks, notes, flashcards, tests |

- Deck 1 (20 slides, 15 visuals, 4 checks, 3 worked examples): forms of presentation, parts of a table, classification, totals of a table, the four bar diagrams, pie diagram and its angles, choosing a diagram.
- Deck 2 (19 slides, 14 visuals, 4 checks, 3 worked examples): histogram, unequal classes, polygon, curve, ogives and the median, arithmetic line graph, choosing a diagram.
- Own SVGs (11, all drawn from the computed data, no maps, none wider than 700 px): labelled table, simple bar, multiple bar, component bar, percentage component bar, pie (drawn with `svg.path` arcs from the computed angles), histogram with polygon, frequency curve, unequal-class histogram, two ogives with the median marked, time-series line graph.
- Questions: mcq 25, assertion-reason 6, true-false 3, fill-blank 3, match 2, ordering 2, numerical 10, short 2-mark 10, short 3-mark 6, long 5-mark 6, case-based 4. Difficulty d1/d2/d3/d4 = 10/27/31/9. Competency: recall 11, understanding 17, application 34, analysis 12, evaluation 3 (64% application or above).
- Tests (disjoint, no deck-check item, no numerical item). Short: A m_title, m_bar_equal, m_ogive_cross, ar_pct_comp; B s2_caption_stub, s2_bar_rules, s3_table_parts; C one of l_bars / l_hist_poly; D cb_budget. Long: A eight mcq (m_classif_temporal, m_classif_spatial, m_source, m_multi_when, m_component, m_hist_gaps, m_polygon_join, m_ogive_less) and ar_ogive_median, ar_ts_line; B s2_forms, s2_classif, one of s2_multi_comp / s2_polygon_close, s3_bar_pie, one of s3_adjusted / s3_ts; C l_table and one of l_ogive / l_forms; D cb_sales and cb_clinic.

## How verified
- Every figure is computed with `stats.mjs` (`sum`, `rnd`, `cumulative`, `medianGrouped`, `modeGrouped`, `mids`, `check`) or plain code from imagined data sets and asserted with `check()`: Devgarh crop table (row totals 98, 111, 35, 56; column totals 100, 120, 80; grand total 300 both ways; rice share of the Central block 37.5 per cent; each block's shares add to 100), Rao family budget (angles 144, 90, 54, 36, 18, 18, sum 360), Anand Bolt Works (80 days; cumulative 4, 12, 28, 52, 66, 76, 80; median 85 by `medianGrouped`; both ogives interpolated at 85 give 40 = N/2; mode 84.44; polygon end class marks 45 and 125), Kishan Brick Kiln adjusted frequencies 12, 20, 18, 8, Kaveri Looms growth 71.43 per cent, Rajpur clinic median 12.5, Sunbeam Courier median 4.5, pie angles for the cafe, library, Lakshya and Naidu budgets, and others. Every SVG is drawn from the same arrays.
- Build prints `NO ERRORS`, lint 0 errors and 0 warnings; three consecutive builds give byte-identical `release.json` and `tests.json` (md5 4db3fa8f... and 8f441a3a...); no `*.wip.json` remains.
- Near-duplicate scan: 77 stems against 38,700 others, 0 flags; SVG label scan: 11 figures, 0 issues.
- Not run, as instructed: git, `npm test`, tree-wide gates, e2e. The SVGs were not viewed in a browser; they were checked by the label overflow/overlap scan and by construction from the data.

## Facts for a reviewer
1. Three forms of presentation: textual (descriptive), tabular and diagrammatic.
2. Parts of a table: table number, title, captions (column headings), stubs (row headings), body, unit of measurement, source note, footnote. Standard meaning of each as given in the notes.
3. Classification of tabulated data: qualitative (attribute), quantitative (measurable variable, usually class intervals), temporal (time) and spatial (place). One table can show more than one.
4. Bars of a bar diagram have equal width and equal gaps, start from a common zero line, and only height carries meaning.
5. Simple, multiple (grouped), component (sub-divided) and percentage component bar diagrams as defined in the notes; in the percentage form every bar is 100 per cent and shares are taken of the bar's own total.
6. Pie diagram: sector angle = (value ÷ total) × 360°; angles add to 360°; pie suits a few components of one total and becomes hard to read with many small sectors.
7. Histogram: adjacent rectangles for a continuous series, no gaps, area proportional to frequency; equal classes make height proportional to frequency.
8. Adjusted frequency for unequal classes = (frequency ÷ class width) × lowest (standard) width. The lowest width is used as the standard throughout.
9. Frequency polygon: class marks against frequencies joined by straight lines, equivalent to joining mid-points of the tops of the histogram rectangles; closed at both ends at the class marks of imaginary classes of zero frequency (same width as the end classes). In the clinic case the left imaginary class lies below zero minutes (class marks -2.5 and 27.5); this is the usual construction and is stated as an imaginary class.
10. Frequency curve: a smooth freehand curve through the polygon points (drawn here by a Catmull-Rom spline for the figure).
11. Less than ogive: cumulative frequency against upper limits. More than ogive: more than cumulative frequency (N minus the less than frequency below the limit) against lower limits.
12. The two ogives intersect at the median: at that value the less than and more than frequencies both equal N/2. Checked in code by interpolating each ogive at the median found by `medianGrouped`.
13. Arithmetic line graph (time series graph): time on the horizontal axis, variable on the vertical axis, points joined in time order. Percentage growth = (later - earlier) / earlier x 100.
14. Class mark of a class = (lower limit + upper limit) / 2.
15. No real statistics, institutions or years are used; the years 2017 to 2024 and 2019 to 2023 in line-graph items belong to imagined firms.

## Unsure or to double-check
- The brief allows the lowest or a standard width for adjusted frequency; the chapter always uses the lowest width.
- The equality of the area under a polygon and the histogram area (equal classes) is not stated in the chapter.
- The histogram and ogive figures start the horizontal axis at 40 without drawing an axis break; the captions do not mention it.
