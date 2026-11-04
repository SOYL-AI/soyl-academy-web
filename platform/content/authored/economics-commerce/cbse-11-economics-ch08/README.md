# CBSE Class 11 Economics, Chapter 8: Introduction to Microeconomics

`cbse-11-economics-ch08` · release v1 · academic year 2026-27 · family `economics-commerce` (Part B: Introductory Microeconomics) · provenance `human`, every item `status: "draft"`

Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-11-economics-ch08/src/build.mjs` from `platform/`). The build validates the schema, runs the pipeline lint and deterministic verify checks, word limits, narration rules, editorial counts and the answer-leak scan, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON. The shared `lib.mjs` and `stats.mjs` are imported from `cbse-11-economics-ch01/src/` and are not copied here.

## Scope
Syllabus topics t01 and t02 only. t01: scarcity and choice, economics defined, micro versus macro, positive versus normative (with imagined statements to classify), centrally planned, market and mixed economies in general terms. t02: the three central problems (what, how including labour-intensive and capital-intensive techniques, for whom), opportunity cost, the production possibility frontier (definition, assumptions, points on, inside and outside), the marginal rate of transformation computed from imagined schedules, why the frontier is concave, shifts (right, left, rotation), and what the frontier shows. Not taught: demand, supply, utility, costs (later chapters), any real country or any real data.

## Contents
| File | What |
|---|---|
| `release.json` | 2 decks (19 + 22 slides), notes (7 sections), 32 flashcards, 79 questions (141 marks; 4 case-based items with 12 parts) |
| `tests.json` | short test (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and long test (40 marks, 90 min, `cbse-11-default-chapter-test-long`) |
| `src/questions.mjs` | question bank and every computed imagined schedule |
| `src/build.mjs` | SVG figures, decks, notes, flashcards, tests |

- Deck 1 (19 slides, 15 visuals, 3 checks, 3 worked examples): scarcity and choice, opportunity cost, micro, macro, positive, normative, using both, the three types of economy.
- Deck 2 (22 slides, 17 visuals, 4 checks, 3 worked examples): central problems, technique choice (costed), for whom, opportunity cost, the frontier and its assumptions, schedule, drawing, on/inside/outside, marginal rate of transformation, concavity, shifts, rotation, gain from growth.
- Own SVGs (6, all computed from the schedules and curve functions, no maps): Tarvania frontier drawn from the schedule with points A to E on it, U inside and W outside; shifts (outward and inward on one chart); rotation; marginal rate bars; micro-versus-macro chart; central-problems flow.
- Questions: mcq 26, assertion-reason 5, true-false 3, fill-blank 2, match 2, ordering 2, numerical 13, short 2-mark 10, short 3-mark 6, long 5-mark 6, case-based 4. Difficulty d1/d2/d3/d4 = 2/28/39/10. Competency: recall 6, understanding 28, application 36, analysis 9 (57% application or above).
- Tests (disjoint, no deck-check item, no numerical item). Short: A m_scarcity, m_ppf_def, m_oc_farmer, ar_concave; B s2_mm, s2_oc, s3_types; C one of l_ppf / l_shifts; D cb_kelvaria. Long: A m_econ_def, m_macro_ex, m_norm_class, m_planned, m_forwhom, m_concave, m_mrt_rise, m_rotation, ar_shift, ar_positive; B s2_scarcity, s2_pos_norm, one of s2_ppf_def / s2_assump, s3_mrt_calc, one of s3_concave / s3_shift; C l_econ_types and one of l_central / l_ppf_points; D cb_lumeria and cb_bhavpur.
- Deck check items (kept out of both tests): m_micro_ex, m_pos_class, mt_economy (deck 1); m_how, n_p1_mrt_bc, m_inside, m_shift_in (deck 2).

## How verified
- Every figure is computed with `stats.mjs` (`marginal`, `sum`, `rnd`, `check`) or plain code from five imagined schedules and asserted with `check()`: Tarvania wheat and cloth (cloth 160, 150, 120, 70, 0 from y = 160 (1 - (x/4)^2); MRT 10, 30, 50, 70; average MRT 40; cloth given up from B to D 80; idle cloth 30 at the inside point U; 30 beyond the frontier at W), the shifted Tarvania curves (growth: 200 and 5, gain 48 at 2 lakh tonnes; rotation: 200 and 4, gain 30; earthquake: 120 and 3; maximum cloth up 25 per cent), Belmora rice and steel (MRT 2, 4, 6, 8; reciprocal 0.5), Kelvaria apples and tablets (MRT 1, 2, 3, 4; average 2.5 from B to D), Dorvik straight-line frontier (constant MRT 2), Lumeria bicycles and sewing machines (MRT 1, 3, 5, 7), the farmer's opportunity cost (52,000) and the cost of the two harvest techniques (80,000 against 60,000, difference 20,000). The build throws if any schedule's marginal rate fails to rise (or, for Dorvik, to be constant). Every SVG is drawn from the same arrays and curve functions.
- Build prints `NO ERRORS`, lint 0 errors and 0 warnings; three consecutive builds give byte-identical `release.json` and `tests.json`; no `*.wip.json` remains.
- Near-duplicate scan: 79 stems against 38,933 others, 0 flags; SVG label scan: 6 figures, 0 issues.
- Not run, as instructed: git, `npm test`, tree-wide gates, e2e. The SVGs were not viewed in a browser; they were checked by the label overflow/overlap scan and by construction from the data.

## Facts for a reviewer
1. Economics: the study of how society allocates scarce resources among alternative uses to satisfy wants. Scarcity: resources are limited relative to wants. Choice arises from scarcity together with alternative uses.
2. Opportunity cost: the value of the next best alternative forgone when a choice is made (the best alternative only, not the sum of all alternatives).
3. Microeconomics: individual units (a consumer, a producer, a market). Macroeconomics: the economy as a whole (national income, total employment, general price level, total output, total savings).
4. Positive economics: what is; statements testable against facts; a positive statement may be false. Normative economics: what ought to be; value judgements; words such as should, ought, unfair.
5. Centrally planned economy: central authority or government decides through a plan. Market economy: decisions by buyers and sellers through markets and prices. Mixed economy: both private firms and the government take part. Described in general terms; Orlin, Quillon and Dunmere are imagined and no real country is judged.
6. Central problems: what to produce and in what quantities; how to produce (choice of technique, labour-intensive or capital-intensive); for whom to produce (distribution of output).
7. Production possibility frontier (curve): combinations of two goods an economy can produce with given resources and technology, fully and efficiently used. Assumptions: fixed resources, given technology, full and efficient use, resources not equally efficient in producing both goods.
8. On the frontier: efficient; inside: underuse or unemployment of resources (attainable); outside: unattainable with given resources and technology.
9. Marginal rate of transformation = marginal opportunity cost = ΔY / ΔX, the units of the vertical-axis good given up per extra unit of the horizontal-axis good. Every schedule here puts X on the horizontal axis and divides the fall in Y by the rise in X.
10. The frontier is concave to the origin because the marginal opportunity cost rises (resources are not equally efficient in all uses); a straight-line frontier means constant marginal opportunity cost.
11. Shifts: rightward from more resources or better technology (growth); leftward from destruction of resources (imagined earthquake or flood); rotation when technology improves for one good only (that good's intercept moves, the other does not). The frontier can also show unemployment (point inside), growth (shift) and the central problems (what to produce as a choice of point).
12. The curve y = ymax (1 - (x / xmax)^2) is used only to draw and compute the imagined Tarvania frontiers; it is a convenient concave shape, not a claim about any real economy. Integer-step schedules from it give MRT 10, 30, 50, 70.
13. All economies, towns, farmers, firms, goods and statements are imagined; no real statistics are used.

## Unsure or to double-check
- Deck 2 says the frontier does not show how to produce and for whom to produce directly; some textbooks relate technique choice to being on or inside the curve. The notes and items do not rely on either reading.
- The MRT is defined as the fall in the vertical-axis good per unit rise in the horizontal-axis good (the brief's ΔY / ΔX); every item names which good is on which axis.
- Units such as "lakh tonnes" and "thousand metres" are imagined and chosen for clean integer slopes.
- The SVG layouts (point labels near the curve, the three curve labels in the shifts chart) were not eyeballed in a browser.
