# CBSE Class 12 Business Studies, Chapter 9 — Financial Management

`cbse-12-business-studies-ch09` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored under D-025/D-026, in the same pattern as the other CBSE 12 Business Studies and Economics chapters.

- **Build:** from `platform/`, run `npx tsx content/authored/economics-commerce/cbse-12-business-studies-ch09/src/build.mjs`. Edit `src/`, not the JSON.
- **What the build checks:** schema, pipeline lint, deterministic verify checks, word limits, narration rules, the answer-leak scan and editorial counts. It then writes `release.json` and `tests.json`.

| File | What |
|---|---|
| `release.json` | 2 decks (18 + 20 slides), notes (6 sections), 32 flashcards, 82 questions (146 marks; 15 case parts and alternatives) |
| `tests.json` | `chapter-test-short` (20 marks, 40 min) on `cbse-12-default-chapter-test-short`; `chapter-test-long` (40 marks, 90 min) on `cbse-12-default-chapter-test-long` |
| `src/` | `lib.mjs` (shared economics-commerce lib, unchanged), `questions.mjs` (bank, with every figure computed and asserted), `build.mjs` |

## Scope

All five syllabus topics, by number of items tagged:

| Topic | Items |
|---|---|
| t01 concept, role and objective (wealth maximisation) | 8 |
| t02 investment, financing and dividend decisions | 18 |
| t03 financial planning | 8 |
| t04 capital structure and trading on equity | 27 |
| t05 fixed and working capital | 19 |
| two topics together | 2 |

### Decks

- **Part 1** (18 slides) covers:
  - business finance and financial management
  - the role of financial management, shown through the balance sheet
  - wealth maximisation, as an SVG of the three decisions around one objective
  - the investment decision and capital budgeting factors; the financing and dividend decisions with their factors
  - financial planning and why it matters

  Worked examples: spotting the decisions in a Mysuru silk case; a month-by-month cash plan for an Alleppey coir unit. Four checks.
- **Part 2** (20 slides) covers:
  - debt against equity, and financial risk
  - trading on equity, with two worked EPS tables and an SVG bar chart of a good year against a poor year
  - capital structure factors, including the coverage ratios, illustrated by imagined Kanha Paper (8 times) against Bastar Metals (1.5 times)
  - fixed and working capital, with a factor table for each and an SVG of the operating cycle

  Worked examples: the good year and the poor year at Sahyadri Ceramics; a Ludhiana hosiery unit's credit terms. Three checks.
- **Visuals:** 28 of 38 slides carry one (3 SVG, the rest tables and flows). Narration is at most 78 words per slide and uses no symbols.

### Question bank (82 items)

| Type | Count | Notes |
|---|---|---|
| mcq | 29 | keys a7 b7 c7 d8 |
| assertion-reason | 9 | |
| true-false | 6 | |
| fill-blank | 4 | |
| match | 2 | |
| ordering | 1 | the operating cycle |
| numerical | 6 | EPS (Kaveri Pumps, Tapti Motors), interest coverage, debt-equity, ROI, net working capital; plus 3 inside cases |
| short | 7 + 7 | 2 marks / 3 marks |
| long | 6 | 5 marks |
| case-based | 5 | see below |

The five case-based items are Vindhya Agro Foods (capital structure, with an EPS alternative), Saurashtra Salt Works (the three decisions), Brahmaputra Bamboo Crafts (fixed and working capital), Konkan Cashew Processors (financial planning and the objective) and Dhauladhar Apples (ROI against the cost of debt). Each asks students to quote, identify and explain, and each has an internal choice in part (c).

- **Difficulty:** d1 11, d2 37, d3 29, d4 5.
- **Competency:** recall 7, understanding 34, application 26, analysis 15. That puts 50% of items at application or above, inside the lint band of 45–65%.
- **Tests:** the two tests share no questions and use no deck-check item; Section D is case-based in both. The bank keeps spares the tests do not use: `l_inv_fin`, `cb_konkan`, `cb_dhauladhar`, `s_capbud_imp`, `s3_toe_plans`, `s_fc_imp` and `s_fp_two_obj`.

## Data and facts

- **Data:** every firm, place and figure is imagined and labelled as such. The chapter states no real company data and no statistics.
- **Computed figures:** every EPS and ratio is computed in `questions.mjs` and asserted:
  - Sahyadri Ceramics, good year: ROI 15%, EPS ₹1.05 under Plan A against ₹1.40 under Plan B.
  - Sahyadri Ceramics, poor year: ROI 8%, EPS ₹0.56 against ₹0.42.
  - Kaveri Pumps: EPS ₹1.89.
  - Tapti Motors: EPS ₹0.80 against ₹0.96.
  - Vindhya Agro Foods: EPS ₹1.35 against ₹2.03. The exact figure is 2.025; the case numerical accepts 2.02–2.04 (tolerance 0.01).
  - Interest coverage 4 times; debt-equity 0.75; ROI 12%; net working capital ₹5,30,000.
- **Conventions a reviewer should confirm:**
  - The objective is wealth maximisation, meaning the market value of equity shares.
  - Debt is "cheaper but riskier for the company".
  - The financing-decision factors used are cost, risk, floatation cost, cash flow position, fixed operating cost, control and the state of the capital market.
  - Capital budgeting factors are cash flows, rate of return and investment criteria.
  - The DSCR is described as cash available against interest plus principal due.
  - The seasonal factor is a working capital factor.
- **Originality:** no NCERT example, table or exercise is reused, and no board or sample-paper item. A normalised exact-stem scan against every other authored chapter and exemplar found 0 duplicates.

## Gaps

- Nobody has seen the SVG labels rendered. A script check finds no overflow and no overlap, but they should still be checked at 360 px on staging.
