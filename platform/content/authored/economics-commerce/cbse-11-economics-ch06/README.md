# CBSE Class 11 Economics, Chapter 6: Correlation

`cbse-11-economics-ch06` · release v1 · academic year 2026-27 · family `economics-commerce` (Part A: Statistics for Economics) · provenance `human`, every item `status: "draft"`

Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-11-economics-ch06/src/build.mjs` from `platform/`). The build validates the schema, runs the pipeline lint and deterministic verify checks, word limits, narration rules, editorial counts and the answer-leak scan, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON. The shared `lib.mjs` and `stats.mjs` are imported from `cbse-11-economics-ch01/src/` and are not copied here.

## Scope
Syllabus topics t01 and t02 only. t01: meaning and types of correlation (positive, negative, linear, non-linear), scatter diagram (perfect positive, perfect negative, high, low, none), correlation and causation (third variable, spurious correlation), properties of the coefficient (limits, no unit, change of origin and scale, zero means no linear relation). t02: Karl Pearson's coefficient (deviation form and actual-value form), Spearman's rank correlation with given ranks, ranks assigned from values, repeated ranks and the correction factor, interpretation and choice of measure. Measures of dispersion are not taught (removed from the syllabus).

## Contents
| File | What |
|---|---|
| `release.json` | 2 decks (19 + 21 slides), notes (7 sections), 31 flashcards, 79 questions (141 marks; 4 case-based items with 12 parts) |
| `tests.json` | short test (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and long test (40 marks, 90 min, `cbse-11-default-chapter-test-long`) |
| `src/questions.mjs` | question bank and all computed data sets |
| `src/build.mjs` | SVG figures, tables, decks, notes, flashcards, tests |

- Deck 1 (19 slides, 14 visuals, 4 checks, 3 worked examples): meaning and types, scatter diagrams (positive, negative, none; perfect, low), degrees of correlation, reading a diagram, causation and spurious correlation, properties, change of origin and scale, the U-shaped case.
- Deck 2 (21 slides, 16 visuals, 4 checks, 4 worked examples): Karl Pearson formula and steps, working table, actual-value form, a negative coefficient, interpretation, rank correlation, ranks and ties, correction factor, choice of measure, extreme value.
- Own SVGs (7, drawn with `Svg.chart()` and dots from the computed data, no maps, none wider than 690 px): three-panel scatter (high positive, high negative, none), three-panel scatter (perfect positive, perfect negative, low), study hours and marks with mean lines, rainfall and yield, apple price and quantity, the U-shaped temperature and electricity scatter with its curve, the extreme-value scatter. Table visuals include the Pearson working tables (study, fruit stall, hill town), the actual-value working, rank working tables (debate judges, two tests), the rank-with-ties table and the correction-factor table. Flow visuals: the two route maps, the steps of Pearson's working, the rank-correlation route and the third-variable diagram.
- Questions: mcq 24, assertion-reason 5, true-false 3, fill-blank 3, match 2, ordering 2, numerical 14, short 2-mark 10, short 3-mark 6, long 5-mark 6, case-based 4. Difficulty d1/d2/d3/d4/d5 = 4/26/32/13/4. Competency: recall 7, understanding 23, application 29, analysis 16, evaluation 4 (62% application or above). Topics: t01 35 items, t02 44 items.
- Tests (disjoint, no deck-check item, no numerical item). Short: A m_range, m_pos_ex, m_sp_when, ar_cause; B s2_types, s2_rank_tie, s3_props; C one of l_props / l_spearman_ties; D cb_rain. Long: A eight mcq (m_scat_pos, m_perfect_neg, m_unit, m_nonlin, m_sign_sxy, m_sp_form, m_cf_value, m_neg07) and ar_u, ar_ties; B s2_def, s2_cf, one of s2_range / s2_origin, s3_ushape, one of s3_rank_basic / s3_compare; C l_pearson and one of l_compare / l_causation; D cb_cause and cb_fruit.

## How verified
- Every figure is computed with `stats.mjs` (`pearson`, `ranks`, `spearman`, `mean`, `sum`, `check`, `rnd`) or plain code from imagined data sets and asserted with `check()`: study hours and marks (Σxy 40, Σx² 10, Σy² 250, r 0.8; actual-value numerator 200, parts 50 and 1250, same r), the same data after changes of origin and scale (r unchanged, asserted equal to 12 places; the sign reverses only for a negative multiplier), fruit stall (Σxy −300, r −0.6), rainfall and yield (r 0.86), tuition centre (r −0.74), U-shaped hill-town data (Σxy 0, r 0, and every point asserted to lie on the drawn curve), seven-dot scatter sets (r 1, 0.86, 0.25, 0, −0.86, −1), debate ranks (ΣD 0, ΣD² 4, rs 0.8), essay ranks (ΣD² 14, rs 0.6), paintings (ΣD² 8, rs 0.6), kiosks with ranks assigned from values (ΣD² 56, rs −0.6), two tests with one tied pair (ΣD² 6.5, correction 0.5, rs 0.8), fair stalls with a tie in each series (ΣD² 13, correction 1, rs 0.75), trainees with a triple tie (ΣD² 40, correction 2, rs 0.5), extreme-value shops (Pearson 0.75, rank 1), correction factors 0.5, 2 and 2.5, and others. Every SVG is drawn from the same arrays.
- Build prints `NO ERRORS`, lint 0 errors and 0 warnings; three consecutive builds give byte-identical `release.json` and `tests.json` (md5 f17571c9... and 4cbc1381...); no `*.wip.json` remains.
- Near-duplicate scan: 79 stems against 38,854 others, 0 flags; SVG label scan: 7 figures, 0 issues.
- Not run, as instructed: git, `npm test`, tree-wide gates, e2e. The SVGs were not viewed in a browser; they were checked by the label overflow/overlap scan and by construction from the data.

## Facts for a reviewer
1. Correlation is defined as the degree and direction of the linear relationship between two variables.
2. Positive: variables move in the same direction. Negative: in opposite directions. Linear: dots around a straight line. Non-linear: dots follow a curve (the classification as commonly taught).
3. Scatter diagram: one dot per pair; rising dots mean positive, falling dots negative; all dots on a line mean perfect (+1 or −1); a shapeless cloud means none (about 0).
4. Correlation does not imply causation. Three reasons for caution: a third variable, chance, reverse direction. A link due to chance or a third variable is called a spurious correlation (defined in the chapter's own words).
5. Properties of r: lies between −1 and +1; has no unit; unaffected by change of origin (adding or subtracting the same constant) and of scale (multiplying or dividing by the same positive constant). Multiplying one variable by a negative constant reverses the sign of r (stated in the notes and shown in the origin-and-scale table).
6. r = 0 means no linear relation; a non-linear relation may exist (U-shaped example).
7. Karl Pearson's coefficient r = Σxy ÷ √(Σx² × Σy²), with x and y the deviations from the arithmetic means. The sign of r is the sign of Σxy because the denominator is positive.
8. Actual-value form r = (nΣxy − ΣxΣy) ÷ √[(nΣx² − (Σx)²)(nΣy² − (Σy)²)], algebraically equal to the deviation form (asserted in code on the study and rainfall data). The step-deviation idea is used only through the change-of-origin and scale property.
9. Spearman's rank correlation rs = 1 − 6ΣD² ÷ (n³ − n), D the difference between the two ranks of an item. Rank 1 is the highest value, in both series; the sum of the rank differences is always zero (used as a check).
10. Tied values each get the average of the ranks they cover. For each group of m tied items (m³ − m) ÷ 12 is added to ΣD² (a pair adds 0.5, a triple 2, a group of four 5). The same correction is used for ties in either or both series.
11. Rank correlation is used for qualitative data that can only be ranked and when extreme values distort Karl Pearson's coefficient.
12. The interpretation bands (about 0.9 very strong, 0.3 weak, −0.7 fairly strong negative) are a rough guide, labelled as such in the slides; textbooks differ on exact cut-offs.
13. No real statistics, institutions or people are used; all names (Lotus Valley School, Mango Mart, Kaveripur, Himgiri, Seaview, Sundarpur fair, judges and contestants) are imagined.

## Unsure or to double-check
- Fact 5 goes slightly beyond the usual textbook statement by noting that a negative multiplier flips the sign of r. It is correct, but a reviewer may prefer to drop it.
- The interpretation bands in fact 12 are a rough guide only.
- The scatter figures for study, rainfall, fruit, hill town and shops do not start their axes at zero; each caption says where the axes start, but no axis-break symbol is drawn.
- The chapter does not state that rank correlation equals Karl Pearson's coefficient applied to the ranks.
