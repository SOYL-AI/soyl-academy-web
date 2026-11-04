# CBSE Class 11 Economics, Chapter 10: Production and Costs

`cbse-11-economics-ch10` · release v1 · academic year 2026-27 · family `economics-commerce` (Part B: Introductory Microeconomics) · provenance `human`, every item `status: "draft"`

Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-11-economics-ch10/src/build.mjs` from `platform/`). The build validates the schema, runs the pipeline lint and deterministic verify checks, word limits, narration rules, editorial counts and the answer-leak scan, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON. The shared `lib.mjs` and `stats.mjs` are imported from `cbse-11-economics-ch01/src/` and are not copied here.

## Scope
Syllabus topics t01 and t02 only. t01: production function q = f(L, K); short run and long run (definitions only); total, average and marginal product computed from imagined labour schedules; law of variable proportions with its three phases (increasing, diminishing, negative returns), reasons for the phases, the shapes of the curves, the AP–MP relationship, TP maximum where MP is zero. t02: fixed and variable costs with examples, TC = TFC + TVC, MC, AFC, AVC, AC, the U shapes, MC cutting AVC and AC at their minima, AC − AVC = AFC and its narrowing. Not taught: returns to scale, isoquants, long-run costs, revenue, any real firm or data.

## Contents
| File | What |
|---|---|
| `release.json` | 2 decks (21 + 22 slides), notes (7 sections), 31 flashcards, 79 questions (141 marks; 4 case-based items with 12 parts) |
| `tests.json` | short test (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and long test (40 marks, 90 min, `cbse-11-default-chapter-test-long`) |
| `src/questions.mjs` | product and cost schedules (with the asserted laws) and the question bank |
| `src/build.mjs` | SVG figures, decks, notes, flashcards, tests |

- Deck 1 (21 slides, 16 visuals, 4 checks, 2 worked examples): production function, short and long run, Hariyali Farm schedule, AP and MP, the three phases, curves, reasons, AP–MP relation, Meena's bakery.
- Deck 2 (22 slides, 17 visuals, 4 checks, 3 worked examples): fixed and variable costs, total cost, Karwan workshop schedule, TFC/TVC/TC curves, MC, AFC (rectangular hyperbola), AVC, AC, four-curve graph, MC and AVC, MC and AC, the gap AC − AVC, U shape, filling in missing values (Gulmohar Bakery).
- Own SVGs (4, all computed from the schedules, no maps): TP above with AP and MP below; the three phases shaded on the AP and MP graph; TFC, TVC and TC; AFC, AVC, AC and MC with both minima marked.
- Questions: mcq 25, assertion-reason 5, true-false 2, fill-blank 2, match 2, ordering 2, numerical 15 (one with a markdown table with a hidden value), short 2-mark 10, short 3-mark 6, long 5-mark 6, case-based 4. Difficulty d1/d2/d3/d4 = 9/22/34/14. Competency: recall 9, understanding 28, application 33, analysis 9 (53% application or above).
- Tests (disjoint, no deck-check item, no numerical item). Short: A m_sr, m_incr_reason, m_afc_shape, ar_mc_avc; B s2_ap_mp, s2_fixed_var, s3_mcavc; C one of l_lvp / l_uni; D cb_hariyali. Long: A m_lr, m_mp_def, m_phase3, m_ap_max, m_tp_max, m_dim_reason, m_mc_def, m_gap, ar_negative, ar_u_afc; B s2_sr_lr, s2_dim_reason, one of s2_mc_def / s2_tc_rel, s3_phase1, one of s3_gb_missing / s3_fv_dist; C l_apmp and one of l_fvt / l_pr; D cb_karwan and cb_gulmohar.
- Deck check items (kept out of both tests): m_phase1, ord_phases, tf_mp_neg, n_hf_ap6 (deck 1); m_tfc_curve, fb_tc, mt_cost, n_ch_avc7 (deck 2).

## How verified
- Every figure is computed with `stats.mjs` (`marginal`, `average`, `cumulative`, `rnd`, `check`) from six imagined schedules and asserted: Hariyali Farm (TP 0, 6, 16, 30, 40, 48, 54, 56, 56, 54, 50 for 0 to 10 workers; MP 6, 10, 14, 10, 8, 6, 2, 0, -2, -4; AP maximum 10 at 4 workers where MP = AP; TP maximum 56 where MP = 0; phases I = workers 1–3, II = 4–8, III = 9–10), Meena's bakery, Inkwell Press (given by MP, TP by cumulative sum), Karwan chair workshop (TFC 840; TVC 0, 700, 1200, 1560, 2000, 2500, 3060, 3710, 4520; MC 700, 500, 360, 440, 500, 560, 650, 810; AVC minimum 500 where MC = AVC at 5 chairs; AC minimum 650 where MC = AC at 7 chairs), Gulmohar Bakery and Kesari Jam Works (given by TC).
- The `prod()` and `costs()` helpers throw at build time unless, on the discrete schedule: MP is above AP while AP rises, equal to it where AP is at its maximum and below it while AP falls; MP is never negative before and never positive after the TP maximum; phase I has rising MP, phase II falling non-negative MP, phase III negative MP with falling TP; TC = TFC + TVC; MC from TC equals MC from TVC; AC = AFC + AVC; AFC falls at every step; for AVC and for AC the sign of the change in the average always equals the sign of (MC − previous average), i.e. MC cuts each average at its minimum; the AC minimum is at an output no smaller than the AVC minimum. Hidden values in fill-in items (total cost at 3 cakes, AVC at 2 cakes, AC at 4 cakes, MC at 3 cakes; AVC at 6 chairs) are computed and shown from the same objects.
- Build prints `NO ERRORS`, lint 0 errors and 0 warnings; three consecutive builds give byte-identical `release.json` and `tests.json`; no `*.wip.json` remains.
- Near-duplicate scan: 79 stems against 39,169 others, 0 flags; SVG label scan: 4 figures, 0 issues.
- Not run, as instructed: git, `npm test`, tree-wide gates, e2e. The SVGs were not viewed in a browser; they were checked by the label overflow/overlap scan and by construction from the data.

## Facts for a reviewer
1. Production function: the technical relationship between physical inputs and the maximum output obtainable from them, q = f(L, K).
2. Short run: at least one factor is fixed; long run: all factors are variable (definitions only; no returns to scale, isoquants or long-run costs).
3. TP = total output; AP = TP ÷ L; MP = ΔTP ÷ ΔL (the discrete change when one more unit of the variable factor is added). MP of the L-th unit is plotted at L.
4. Law of variable proportions: phase I (increasing returns) MP rises; phase II (diminishing returns) MP falls but is not negative; phase III (negative returns) MP is negative and TP falls. Convention used: phase I ends at the worker with the highest MP; phase II runs through the worker whose MP is zero (included, as TP is then at its maximum); phase III begins at the first negative MP. Some books draw the boundaries as vertical lines at the peak of MP and at the point where MP = 0; the shaded chart does so between whole workers.
5. Reasons: in phase I the fixed factor is under-used and division of work is possible; in phase II the fixed factor is fully used and each unit of the variable factor has less of it; in phase III the fixed factor is crowded.
6. AP–MP: while MP > AP, AP rises; when MP = AP, AP is at its maximum; while MP < AP, AP falls. On the discrete schedules the maximum of AP is flat across two workers (e.g. AP = 10 at 3 and 4 workers) and MP of the later one equals AP; this is a deliberate design so that "MP = AP at the maximum of AP" holds exactly.
7. TP is at its maximum where MP = 0 (Hariyali: TP = 56 at 7 and 8 workers, MP of the 8th worker is 0). In Meena's bakery MP jumps from positive to negative, so the TP maximum is at the last worker with positive MP.
8. TFC: does not change with output (rent, salaries of permanent staff); TVC: changes with output, zero at zero output (raw materials, wages of casual labour); TC = TFC + TVC; TFC curve horizontal; TVC from the origin; TC starts at TFC and is parallel to TVC.
9. MC = ΔTC ÷ Δq = ΔTVC ÷ Δq; MC of the first unit equals TVC of the first unit.
10. AFC = TFC ÷ q (falls throughout, never zero, rectangular hyperbola because AFC × q = TFC); AVC = TVC ÷ q; AC = TC ÷ q = AFC + AVC. AVC, AC and MC are U-shaped; the U shape comes from the law of variable proportions.
11. MC cuts AVC and AC at their minimum points. In a discrete schedule the average falls while MC is below the previous average, is unchanged when MC equals it and rises while MC is above it; the Karwan schedule is built so that MC equals AVC at 5 chairs (AVC 500 at 4 and 5 chairs) and MC equals AC at 7 chairs (AC 650 at 6 and 7 chairs), so both minima are met exactly. The minimum of AC comes at a larger output than the minimum of AVC.
12. AC − AVC = AFC; the gap narrows as output rises and never becomes zero.
13. All farms, workshops, bakeries, presses and jam works are imagined; no real statistics are used. Units (quintals, dozens, thousand sheets, hundred jars) are imagined.

## Unsure or to double-check
- The curves in the cost graphs are drawn as straight segments joining the computed points, not smoothed curves. MC (drawn through its point values) therefore passes exactly through the marked minima of AVC and AC.
- Where the phase boundaries fall for a schedule with a tie (e.g. TP equal at 7 and 8 workers) follows convention 4 above.
- The cost graph with all four per-unit curves uses a vertical scale to 1,600 rupees so that AC for the first chair (1,540) is visible, which flattens the U shapes somewhat.
- Item `n_miss_tbl` uses a small markdown table in its stem; the lint and build accepted it, but it was not previewed in the player.
- The SVG layouts were not eyeballed in a browser.
