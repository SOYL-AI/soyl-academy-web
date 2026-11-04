# CBSE Class 11 Economics, Chapter 7: Introduction to Index Numbers

`cbse-11-economics-ch07` · release v1 · academic year 2026-27 · family `economics-commerce` (Part A: Statistics for Economics) · provenance `human`, every item `status: "draft"`

Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-11-economics-ch07/src/build.mjs` from `platform/`). The build validates the schema, runs the pipeline lint and deterministic verify checks, word limits, narration rules, editorial counts and the answer-leak scan, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON. The shared `lib.mjs` and `stats.mjs` are imported from `cbse-11-economics-ch01/src/` and are not copied here.

## Scope
Syllabus topics t01 and t02 only. t01: meaning of an index number and base period; wholesale price index, consumer price index (and its kinds), index of industrial production, Sensex; uses; issues in construction. t02: simple aggregative method and its unit limitation, simple average of price relatives, Laspeyres and Paasche, weighted average of price relatives (consumer price index from family-budget weights), inflation from an index, real wage and purchasing power. No actual index value, inflation rate or base year is quoted.

## Contents
| File | What |
|---|---|
| `release.json` | 2 decks (20 + 22 slides), notes (7 sections), 31 flashcards, 79 questions (141 marks; 4 case-based items with 12 parts) |
| `tests.json` | short test (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and long test (40 marks, 90 min, `cbse-11-default-chapter-test-long`) |
| `src/questions.mjs` | question bank and all computed data sets |
| `src/build.mjs` | SVG figures, tables, decks, notes, flashcards, tests |

- Deck 1 (20 slides, 15 visuals, 4 checks, 2 worked examples): meaning, base period, index line over six imagined years, WPI, CPI and its kinds, CPI at work, IIP with a worked output index, Sensex and comparison, uses, deflating a money value, issues in construction, choosing the index.
- Deck 2 (22 slides, 17 visuals, 4 checks, 6 worked examples): methods tree, simple aggregative (bakery), unit limitation, price relatives (bar chart), average of relatives, Laspeyres and Paasche (stationers), why they differ, weighted relatives and the CPI construction table (SVG), mill-colony index, inflation, real wage and purchasing power.
- Own SVGs (3, drawn with `Svg.chart()` and from the computed data, no maps): index line over imagined years, bar chart of price relatives, CPI construction table. The methods flow and all other tables are table/flow visuals.
- Questions: mcq 25, assertion-reason 5, true-false 3, fill-blank 2, match 2, ordering 2, numerical 14, short 2-mark 10, short 3-mark 6, long 5-mark 6, case-based 4. Difficulty d1/d2/d3/d4/d5 = 10/25/30/13/1. Competency: recall 13, understanding 21, application 31, analysis 14 (57% application or above). Topics: t01 33 items, t02 46 items.
- Tests (disjoint, no deck-check item, no numerical item). Short: A m_index_def, m_cpi_use, m_laspeyres, ar_base; B s2_def, s2_unit, s3_lp; C one of l_types / l_methods; D cb_hh. Long: A m_base_choice, m_wpi, m_cpi_what, m_iip_vs, m_weights, m_unit_flaw, m_relative, m_infl_formula, ar_iip, ar_cpi_wpi; B s2_wpi, s2_infl, one of s2_cpi_use / s2_real, s3_issues, one of s3_cpi_steps / s3_real; C l_issues and one of l_juice / l_cpi; D cb_factory and cb_wage. Unused in tests: cb_mill, l_uses and the deck-check items.

## How verified
- Every figure is computed with `stats.mjs` (`indexAggregative`, `indexRelatives`, `indexLaspeyres`, `indexPaasche`, `indexWeightedRelatives`, `inflation`, `sum`, `rnd`, `check`) or plain code from imagined data and asserted with `check()`: household basket (aggregative 125, relatives mean 125.25, Laspeyres 126, Paasche 123.75), Sunrise Bakery (aggregative 120, relatives mean 118.75, aggregative 115.6 when butter is quoted per 100 g and eggs per piece, relatives unchanged), Pinecrest Stationers (Laspeyres 123.2, Paasche 121.2), Shanti Canteen (124.8, 123.75), Tulsi Juice Bar (122, 121.25), family-budget CPI 119.5, Madhupur Mill Colony CPI 124.5, Rivergate output index 121, inflation 25, 4, 10, 4.9 and 10 per cent, real wages 12000, 13000, 12000, adjusted pay 28800, deflated sales 200, 220, 240 (nominal growth 37.28 per cent, real 20 per cent), purchasing power 80. The Laspeyres and Paasche helpers are also asserted equal to the ratio of the printed sums. Every SVG is drawn from the same arrays. (The first build run caught a hand-computed relatives mean of 126.25 for the household; the computed value 125.25 is used everywhere.)
- Build prints `NO ERRORS`, lint 0 errors and 0 warnings; three consecutive builds give byte-identical `release.json` and `tests.json` (md5 6a2561b9... and 25f6c41b...); no `*.wip.json` remains.
- Near-duplicate scan: 79 stems against 39,012 others, 0 flags; SVG label scan: 3 figures, 0 issues.
- Not run, as instructed: git, `npm test`, tree-wide gates, e2e. The SVGs were not viewed in a browser; they were checked by the label overflow/overlap scan and by construction from the data.

## Facts for a reviewer
1. An index number is a statistical device that measures the relative change in a variable or group of related variables over time, compared with a base period taken as 100.
2. The base period should be a normal year, free of abnormal events. An index above 100 means higher than the base; below 100 lower.
3. Wholesale price index: change in the general price level of goods traded in bulk (wholesale prices). Compiled by the Office of the Economic Adviser, Ministry of Commerce and Industry (as commonly taught).
4. Consumer price index (cost-of-living index): change in the retail prices of a fixed basket of goods and services consumed by a defined group. Kinds as commonly taught: for industrial workers, for agricultural labourers, and rural, urban and combined. Used to adjust dearness allowance and wages.
5. Compilers of the consumer price indices (slide narration, table and notes): the Labour Bureau for the industrial-workers and agricultural-labourers indices, and the national statistical office (Ministry of Statistics and Programme Implementation) for the rural, urban and combined index. This is general knowledge and should be checked by a reviewer; no base year or current value is given.
6. Index of industrial production: change in the volume of industrial output (mining, manufacturing, electricity); a quantity index. Compiler given as the national statistical office, Ministry of Statistics and Programme Implementation (as commonly taught; same reviewer check as fact 5).
7. Sensex: the stock market index of the Bombay Stock Exchange, based on thirty companies.
8. Uses: measuring inflation; adjusting wages and allowances; deflating values to real terms; policy-making; comparing performance over time.
9. Issues in construction: purpose; choice of base year; choice of items; price quotations (wholesale or retail); choice of weights; choice of formula.
10. Simple aggregative: Σp1 ÷ Σp0 × 100, affected by the units of the items. Price relative: p1 ÷ p0 × 100. Simple average of relatives: Σ(p1 ÷ p0 × 100) ÷ n.
11. Laspeyres: Σp1q0 ÷ Σp0q0 × 100 (base-year quantities). Paasche: Σp1q1 ÷ Σp0q1 × 100 (current-year quantities).
12. Weighted average of price relatives: ΣRW ÷ ΣW, with R = p1 ÷ p0 × 100 and W from the family budget; the consumer price index is computed this way (as commonly taught).
13. Rate of inflation from an index: (I1 − I0) ÷ I0 × 100; inflation is a sustained rise in the general price level. A lower rate still means rising prices.
14. Real wage = money wage ÷ consumer price index × 100. Deflated value = money value ÷ index × 100. Purchasing power of Rs 100 = 100 ÷ index × 100 base-year rupees.
15. Laspeyres is higher than Paasche in the imagined data sets because buyers shifted away from items that became dearer. The slides and items state this only for those data and as a tendency, not as a theorem.
16. Dearness allowance is described as a payment that protects wages against a rise in the cost of living.
17. No real statistics are used; all names (Bhavnagar Colony, Sunrise Bakery, Pinecrest Stationers, Shanti Canteen, Tulsi Juice Bar, Rivergate Industrial Estate, Madhupur Mill Colony, Kaushal Printers, Ashoka Mess, Sundaram Textile Works, the cooperative society and others) are imagined. Only the real bodies named in facts 3 to 7 appear.

## Unsure or to double-check
- Facts 5 and 6 (who compiles the consumer price indices and the index of industrial production) are the most change-prone statements; a reviewer may prefer to keep only the wholesale price index compiler.
- The Laspeyres-versus-Paasche slide and item m_lp_gap generalise only from the imagined data sets.
- The index line chart's vertical axis starts at 80 (its caption says so); no axis-break symbol is drawn. The bar chart starts at 0.
- Fisher's and other ideal indices, base shifting and splicing are not taught (not in the topic list).
