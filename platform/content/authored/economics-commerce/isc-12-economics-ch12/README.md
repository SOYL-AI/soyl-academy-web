# ISC Class 12 Economics, Chapter 12 — Equilibrium Output, Multiplier and Problems of Demand

`isc-12-economics-ch12` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) in the ISC 12 Economics pattern set by ch01–ch10. To build it, run `npx tsx content/authored/economics-commerce/isc-12-economics-ch12/src/build.mjs` from `platform/`. It uses the shared lib `isc-12-economics-ch01/src/lib.mjs`, imported rather than copied. Edit `src/`, not the JSON.

The build checks:
- the schema;
- the pipeline lint and the deterministic verify checks;
- word limits and narration rules;
- the answer-leak scan;
- the exact-stem originality pre-check against every authored chapter.

| File | What |
|---|---|
| `release.json` | 2 decks of 18 + 16 slides with 26 visuals (6 SVG diagrams drawn from the equations; the rest tables and flows); 6 notes sections; 30 flashcards; 78 questions worth 158 marks |
| `tests.json` | `t_isc12economics_ch12_short` (20 marks, 50 min) and `t_isc12economics_ch12_long` (40 marks, 100 min) on `isc-12-default-chapter-test-short` / `-long`. Both follow their blueprint item for item, including the internal-choice groups. The tests are disjoint and use no deck-check item. |
| `src/` | `questions.mjs` (the bank, the imagined economies and the income-determination engine, with asserts) and `build.mjs` (decks, SVGs, notes, cards and tests) |

## Scope (ISC 2027 syllabus)

All five topics are covered:
- **t01** equilibrium income by the AD = AS and S = I approaches, with schedule, diagrams, and adjustment through unplanned stock changes
- **t02** the investment multiplier: k = 1 ÷ (1 − MPC) = 1 ÷ MPS, ΔY = k × ΔI, rounds of spending, its range, and how it works in reverse
- **t03** full employment and involuntary unemployment; the underemployment equilibrium
- **t04** excess demand (inflationary gap) and deficient demand (deflationary gap): measurement at full employment, causes and effects
- **t05** fiscal and monetary measures (quantitative and qualitative), given as directions only

The syllabus lists no removed topics for this chapter.

### Decks

- **Part 1** (equilibrium and the multiplier, t01–t02): 18 slides, 4 checks (`m_unplanned_stock_fall`, `m_ad_above_45`, `m_k_mps_link`, `n_round3`).
  - SVGs: the AD = AS and S = I diagrams, multiplier rounds as bars, and the AD shift.
  - Worked examples: the Tarangpur schedule, the metro rounds and the Tarangpur jetty.
- **Part 2** (full employment and problems of demand, t03–t05): 16 slides, 4 checks (`m_excess_effect`, `m_defl_gap_effect`, `m_crr_excess`, `tf_tax_cut_excess`).
  - SVGs: the deflationary-gap and inflationary-gap diagrams.
  - Worked examples: measuring Hiranagar's gap, and the spending needed to close it.
- **Narration:** at most 65 words per slide (mean 43), with no symbols or abbreviations.

### Question bank (78 items)

| Type | Count |
|---|---|
| mcq | 25 (keys a7 b6 c6 d6) |
| assertion-reason | 6, ISC options with (d) "both false" (keys a c a d a c) |
| true-false | 4 |
| fill-blank | 3 |
| numerical | 6 |
| match | 1 |
| ordering | 2 |
| short 2-mark | 9 |
| short 3-mark | 9 |
| long 5-mark | 5, set in parts |
| ISC paper-style 4-mark (2 + 2), bank only | 3 |
| ISC paper-style 8-mark (4 + 4), bank only | 2 |
| case-based | 3 (Tarangpur bulletin, Hiranagar jobs report, Ujjain festival notes), each with an internal choice in part (c) |

- **Difficulty:** d1 10, d2 36, d3 25, d4 7.
- **Competency:** recall 7, understanding 26, application 20, analysis 21, evaluation 4. That puts 58% of items at application or above (lint band 45–65%).
- **Retagging:** four routine one-step formula items (`m_tarangpur_eq`, `m_dy_from_di`, `n_saving_at_eq`, `n_round3`) are tagged understanding under the D-035 rule.

## Data and facts

Every figure is imagined, computed in `questions.mjs` and asserted:
- **Tarangpur:** C = 60 + 0.8Y and I = 40 give equilibrium 500, k = 5 and break-even income 300. A ₹20 crore jetty moves equilibrium to 600.
- **Hiranagar:** AD = 120 + 0.6Y gives equilibrium 300 and k = 2.5. With full-employment output 400 there is a deflationary gap of 40, and extra spending of 40 closes it. With full-employment output 250 there is an inflationary gap of 20.
- **Kanakpur:** C = 40 + 0.75Y and I = 60 give 400; investment of 90 gives 520.
- **Metro rounds:** 100, 80, 64, 51.2… with MPC 0.8, totalling 500.
- **Not reused:** the set-ups differ from SOYL's CBSE 12 Economics ch03 (C = 100 + 0.75Y; AD = 240 + 0.5Y).

Policy is stated without current rates or statistics: the repo rate, bank rate, CRR, SLR, open market operations, margin requirements, credit rationing, moral suasion and direct action appear only as directions and mechanisms. No textbook example, specimen-paper item (including the specimen's MPS-from-multiplier item and its dated repo-rate extract) or past-paper item is reused.

## Checks run on this chapter

- **Build:** NO ERRORS, with lint at 0 errors and 0 warnings.
- **Rebuild:** byte-identical `release.json` and `tests.json`.
- **Duplicates:** the 5-gram near-duplicate scan, using the originality gate's rule (78 stems against 21,404 others), finds 0 flags.
- **SVG labels:** 0 overflow or overlap issues in the 6 figures.

## For a reviewer

- **Gap measurement:** gaps are measured at full-employment output. `s3_hira_close` teaches that the extra spending needed is the gap (40), not the shortfall in income (100).
- **`ar_k_lt1`:** keyed (d), both false. The multiplier is never below 1, and it is the reciprocal of the MPS, not the MPS itself.
- **`ar_s_gt_i`:** keyed (c). When S > I, stocks pile up; they do not run down.
- **Labels:** the 45° label on the AD–AS figures uses the degree symbol in the SVG only, never in narration.
- **Rendering:** nobody has seen the SVG labels rendered, so they need a look at 360 px on staging. The AD-shift figure has two equilibrium labels close together.
