# CBSE Class 11 Economics, Chapter 9: Theory of Consumer Behaviour

`cbse-11-economics-ch09` · release v1 · academic year 2026-27 · family `economics-commerce` (Part B: Introductory Microeconomics) · provenance `human`, every item `status: "draft"`

Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-11-economics-ch09/src/build.mjs` from `platform/`). The build validates the schema, runs the pipeline lint and deterministic verify checks, word limits, narration rules, editorial counts and the answer-leak scan, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON. The shared `lib.mjs` and `stats.mjs` are imported from `cbse-11-economics-ch01/src/` and are not copied here.

## Scope
Syllabus topics t01 to t04. t01: utility, total and marginal utility, the law of diminishing marginal utility, consumer's equilibrium with one commodity (MUx/Px = marginal utility of a rupee) and with two commodities (law of equi-marginal utility). t02: budget set and budget line (intercepts, slope, shifts and rotations), monotonic preferences, indifference curves and maps, the marginal rate of substitution, properties, and equilibrium at the tangency (MRS = P1/P2). t03: demand, the demand function and its determinants, the law of demand and its reasons, normal and inferior goods, substitutes and complements, movement along versus shift of the curve, market demand as the horizontal sum of three imagined buyers. t04: price elasticity of demand by the percentage method (sign convention), the five cases, the total expenditure method, determinants of elasticity. Not taught: the geometric (point) method, consumer's surplus, income elasticity, Giffen goods, supply.

## Contents
| File | What |
|---|---|
| `release.json` | 2 decks (22 + 22 slides), notes (7 sections), 33 flashcards, 78 questions (139 marks; 4 case-based items with 12 parts) |
| `tests.json` | short test (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and long test (40 marks, 90 min, `cbse-11-default-chapter-test-long`) |
| `src/questions.mjs` | question bank and every computed imagined schedule |
| `src/build.mjs` | SVG figures, decks, notes, flashcards, tests |

- Deck 1 (22 slides, 17 visuals, 4 checks, 5 worked examples): utility and marginal utility, TU and MU curves, equilibrium with one and two goods, budget line and its shifts, indifference map, MRS, properties, tangency equilibrium.
- Deck 2 (22 slides, 18 visuals, 3 checks, 4 worked examples): demand schedule and curve, determinants, law of demand, normal and inferior goods, substitutes and complements, movement versus shift, market demand, percentage method, five cases, expenditure method, determinants of elasticity.
- Own SVGs (10, all computed from the same data, no maps): TU and MU curves; budget line with the budget set; budget-line shifts and rotations (two panels); indifference map; MRS along one curve; consumer's equilibrium at the tangency; Anil's demand curve; movement along versus shift; market demand summation; the five elasticity cases.
- Questions: mcq 26, assertion-reason 5, true-false 3, fill-blank 2, match 2, ordering 2, numerical 13, short 2-mark 9, short 3-mark 6, long 5-mark 6, case-based 4. By topic t01/t02/t03/t04 = 23/21/17/17. Difficulty d1/d2/d3/d4 = 5/21/38/14. Competency: recall 6, understanding 28, application 33, analysis 11 (56% application or above).
- Tests (disjoint, no deck-check item, no numerical item). Short: A m_mu_zero, m_inc_shift, m_law_reason, ar_ed; B s2_dmu, s2_move_shift, s3_exp_method; C one of l_eq_two / l_ic_eq; D cb_budget_ic. Long: A m_dmu, m_eq_two, m_price_rot, m_tangency, m_shift_vs_move, m_inferior, m_ed_cases, m_exp_method, ar_dmu, ar_move_shift; B s2_tu_mu, s2_budget, one of s2_demand_func / s2_ed_def, s3_budget_shift, one of s3_law_demand / s3_market; C l_dmu and one of l_demand_shift / l_ed; D cb_samosa and cb_tea.
- Deck check items (kept out of both tests): m_neg_mu, m_eq_one, n_intercept, m_mrs_dim (deck 1); m_demand_def, n_market_q, m_ed_class (deck 2).

## How verified
- Every figure is computed with `stats.mjs` (`marginal`, `elasticity`, `expenditureVerdict`, `sum`, `rnd`, `check`) or plain code from imagined data and asserted with `check()` before it is written in prose:
  - Samosa schedule of Meera: TU 0, 40, 70, 90, 100, 100, 90; MU 40, 30, 20, 10, 0, -10; MU per rupee 10, 7.5, 5, 2.5 at Rs 4; equilibrium 3 samosas at Rs 4 and 4 samosas at Rs 2 (marginal utility of a rupee 5).
  - Two goods (samosa Rs 4, juice Rs 6, income Rs 24): MU per rupee 6, 5, 4, 3, 2, 1 and 5, 4, 3, 2, 1, 0; the equilibrium bundle (3, 2) is found by brute force over all affordable bundles and by equal ratios (4 = 4), total utility 114; the unequal bundles (4, 1) and (1, 3) give 102 and 96.
  - Budget line (income Rs 120, prices Rs 20 and Rs 10): intercepts 6 and 12, slope 2; income Rs 160 gives 8 and 16; income Rs 80 gives 4 and 8; mango price Rs 30 gives 4 and 12, slope 3; guava price Rs 20 gives 6 and 6, slope 1; 49 whole-kilogram bundles in the budget set; Neha (12, 15, slope 1.25) and Rohan (8, 20, slope 2.5).
  - Indifference curves x times y = 8, 18, 32; tangency (3, 6) with satisfaction 18 found analytically and by a fine scan of the budget line; MRS 2 equals the price ratio 2 and the curve's slope there equals the budget slope; no point of the budget line reaches 32; Rohan's tangency (4, 10); indifference schedule x times y = 12 with MRS 6, 2, 1, 0.5 and 1.5 between B and D.
  - Market demand of three buyers 3, 7, 11, 15, 19 at prices Rs 10, 8, 6, 4, 2; shift of 4 cups at every price (7, 11, 15, 19, 23); dearer substitute (+3) and dearer complement (-3).
  - Elasticity: apples 1.5 (expenditure 5000 to 4200), salt 0.25 (4000 to 4560), tea 2 (500 to 560), fish 0.5 (5000 to 4400), notebooks 1 (percentage method), bus pass unchanged expenditure 2000. For the elasticities different from one the percentage method and `expenditureVerdict` are asserted to agree. Quantity from elasticity 2 and a 5 per cent price fall: 400 to 440.
  - Every SVG is drawn from the same arrays and curve functions.
- Build prints `NO ERRORS`, lint 0 errors and 0 warnings; three consecutive builds give byte-identical `release.json` and `tests.json`; no `*.wip.json` remains.
- Near-duplicate scan: 78 stems against 39,170 others, 0 flags; SVG label scan: 10 figures, 0 issues.
- Not run, as instructed: git, `npm test`, tree-wide gates, e2e. The SVGs were not viewed in a browser; they were checked by the label overflow and overlap scan and by construction from the data.

## Facts for a reviewer
1. Utility: the satisfaction a consumer derives from a good or service. Total utility: satisfaction from all units consumed. Marginal utility: change in total utility from one more unit, MU = change in TU (cardinal approach, measured in imagined "utils").
2. Law of diminishing marginal utility: other things unchanged, MU falls as more of a good is consumed. When MU is zero TU is at its maximum; when MU is negative TU falls.
3. One-commodity equilibrium: MUx/Px = marginal utility of a rupee (taken as constant). Two-commodity equilibrium (law of equi-marginal utility): MUx/Px = MUy/Py = marginal utility of a rupee, with the whole income spent. Discrete schedules are chosen so that the ratios are exactly equal.
4. Budget set: all affordable bundles; budget line: bundles costing exactly the income, P1x1 + P2x2 = M; intercepts M/P1 (good 1 on the horizontal axis) and M/P2; slope -P1/P2 (the chapter quotes its size, P1/P2). An income change shifts it in parallel; a change in one price rotates it about the other good's intercept.
5. Monotonic preferences: a bundle with more of at least one good and no less of the other is preferred. Indifference curve: bundles of equal satisfaction; indifference map: a set of curves.
6. MRS: the amount of good 2 given up for one more unit of good 1 (change in y over change in x, in size, good 1 on the horizontal axis). It diminishes along the curve, so the curve is convex to the origin.
7. Properties: indifference curves slope downward, a higher curve shows higher satisfaction, curves never intersect, and they are convex to the origin.
8. Equilibrium: the budget line touches (is tangent to) the highest attainable indifference curve; MRS = P1/P2. Satisfaction functions x times y are used only to draw the imagined curves and compute the tangency (MRS = y/x there); they are not a claim about real consumers.
9. Demand: the quantity a consumer is willing and able to buy at each price over a period. Determinants: own price, prices of related goods, income, tastes and preferences, expectations.
10. Law of demand: other things unchanged, price and quantity demanded move in opposite directions. Reasons given: substitution effect, income effect, diminishing marginal utility.
11. Normal good: demand rises with income. Inferior good: demand falls when income rises. Substitutes: a rise in the price of one raises demand for the other. Complements: a rise in the price of one lowers demand for the other.
12. Movement along the curve: own price only (expansion or contraction of demand). Shift: any other determinant (increase or decrease in demand).
13. Market demand: the horizontal sum of individual demands (quantities added at each price).
14. Price elasticity of demand by the percentage method: (percentage change in quantity demanded) / (percentage change in price), each change measured from the old value. The ratio is negative for a normal demand curve; the chapter quotes it without the sign (the `elasticity` helper returns the absolute value).
15. Five cases: perfectly elastic (infinite, horizontal curve), greater than one (flat), unitary (one, rectangular hyperbola), less than one (steep), perfectly inelastic (zero, vertical curve). The figure draws the curves by shape only; the geometric (point) method is not taught.
16. Total expenditure method: expenditure moves opposite to price, elasticity greater than one; unchanged, equal to one; moves with price, less than one.
17. Determinants of elasticity: nature of the good (necessity or luxury), availability of substitutes, share of income, time period.
18. All students, stalls, shops, villages, buyers and goods are imagined; no real statistics are used.

## Unsure or to double-check
- The percentage method (changes taken from the old values) and the total expenditure method can differ slightly at the borderline of one for large changes (for example price 20 to 25 with quantity 100 to 80 leaves expenditure unchanged, but the percentage method gives 0.8). Every item that uses both methods on the same data uses data where they agree; the bus-pass case is used only with the expenditure method and the notebook case (elasticity exactly 1) only with the percentage method. Deck 2's exam-tips slide mentions the possible borderline difference in one line; the reviewer may prefer to drop that line.
- MRS is defined as good 2 given up per extra unit of good 1 and quoted as a positive size; every item names the goods on each axis.
- The tangency items assume a satisfaction product x times y so that the tangency can be computed; the stem states this and gives MRS = y/x as part of the data (in the case item and the long answer, the product is stated for Meera).
- The straight lines in the five-case figure do not have constant elasticity along them; the figure is meant only to show the flat, steep, horizontal, vertical and hyperbola shapes of the cases.
- The SVG layouts were not eyeballed in a browser.
