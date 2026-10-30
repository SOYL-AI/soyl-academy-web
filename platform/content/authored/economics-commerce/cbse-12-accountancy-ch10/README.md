# CBSE Class 12 Accountancy, Chapter 10 — Accounting Ratios

`cbse-12-accountancy-ch10` · release v1 · academic year 2026-27 · family `economics-commerce` (Unit 3: Analysis of Financial Statements) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) on the pattern of the CBSE 12 Economics and Accountancy chapters. Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-12-accountancy-ch10/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, narration rules, editorial counts and the answer-leak scan, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` if anything fails). Edit `src/`, not the JSON. Rebuilding is byte-identical.

| File | What |
|---|---|
| `release.json` | 2 decks (19 + 17 slides), notes (7 sections), 30 flashcards, 69 questions (149 marks) |
| `tests.json` | `t_cbse12accountancy_ch10_short` (20 marks, 40 min) on `cbse-12-accountancy-chapter-test-short` and `t_cbse12accountancy_ch10_long` (40 marks, 90 min) on `cbse-12-accountancy-chapter-test-long`, item for item |
| `src/` | `lib.mjs` (shared CBSE 12 economics-commerce builders, copied unchanged apart from its header), `acc.mjs` (the ratio engine: one set of definitions, two-decimal rounding, balance-sheet positions, trading and operating results, transaction effects, Indian-system number words for narration), `questions.mjs` (bank), `build.mjs` (decks, notes, cards, tests) |

## Scope
All four syllabus topics (2026-27): **t01** liquidity — current ratio, quick (liquid) ratio (13 items) · **t02** solvency — debt-equity, total assets to debt, proprietary, interest coverage (14) · **t03** activity — inventory, trade receivables, trade payables, fixed asset, net asset (capital employed) and working capital turnover (17) · **t04** profitability — gross profit, operating, operating profit, net profit (before and after tax) ratios and return on investment (15) · 10 items span several topics (meaning, objectives, classification, interpretation, limitations, comprehensive and missing-figure problems). Effects of transactions, finding missing figures from given ratios, interpretation and limitations are covered in every relevant family. No topic of this chapter is removed for 2026-27.

**Definitions used everywhere** (notes section 2, `acc.mjs`): quick assets = current assets − inventories − prepaid expenses; debt = long-term borrowings + long-term provisions; equity = shareholders' funds; total assets = non-current + current assets; capital employed = shareholders' funds + non-current liabilities = non-current assets + working capital; cost of revenue from operations = opening inventory + purchases + direct expenses − closing inventory (= revenue − gross profit); averages = (opening + closing) ÷ 2; operating expenses exclude finance costs and non-operating items; profit before interest and tax = operating profit + non-operating income − non-operating expenses. **Rounding:** two decimal places, rounded half up, trailing zeros dropped; a rounded result is written with "≈" in workings. Liquidity and solvency ratios as "x : 1", turnover ratios and interest coverage in times, profitability ratios as percentages.

### Decks
- **Part 1** (19 slides): meaning and forms of ratios, objectives and advantages, the four families, the case company, current and quick ratios, effects of transactions, solvency ratios, interest coverage, missing figures. **Worked examples (3):** liquidity ratios of an imagined **Narmada Agro Foods Ltd, Jabalpur** (current 2 : 1, quick 1.1 : 1); its solvency ratios (debt-equity 0.4 : 1, total assets to debt 4.17 : 1 after rounding, proprietary 0.6 : 1); missing figures for **Dudhganga Dairy Ltd, Kolhapur** (current liabilities ₹1,50,000 from ratios 2.6 and 1.4 and inventory ₹1,80,000). A computed table of five transactions' effects on Narmada's current ratio. Four checks.
- **Part 2** (17 slides): the six turnover ratios, cost of revenue and averages, capital employed both ways, the operating statement, an SVG bar of each ₹100 of revenue (cost 75, operating expenses 15, operating profit 10, widths computed), profitability ratios, interpretation, limitations. **Worked examples (3):** Narmada's inventory 10 times, receivables 11.85 times, payables 9.6 times; fixed asset 2.5, net asset 1.9, working capital 10 times; gross profit 25%, operating 90%, operating profit 10%, net profit 6.13% after tax and 8.75% before, return on investment 19.05%. Four checks.
- 26 of 36 slides carry a visual (23 tables, 2 flows, 1 SVG); never more than 3 slides in a row without one. Narration ≤ 84 words (mean 54), TTS-safe: amounts and ratios spoken in words generated from the computed values ("two to one", "eleven point eight five times", "rupees twenty-five lakh"), no digits, symbols or capitalised abbreviations.

### Question bank (69 items)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 20 | 1 | forms of expression, objectives, benchmarks, quick assets, effects on current, quick and debt-equity ratios (computed options), definition of debt, interest coverage, proprietary ratio, cost of revenue, inventory and working capital turnover (computed distractors), receivables formula and interpretation, gross profit, operating link, return on investment, non-operating items, net profit after tax |
| assertion-reason | 6 | 1 | keys a2 b1 c2 d1 |
| true-false · fill-blank · match | 5 · 4 · 2 | 1 · 1 · 2 | T/F 4 true, 1 false; matches: ratio families, turnover formulas |
| numerical | 10 | 2 | current, quick (rounded), current liabilities from working capital, debt-equity, total assets to debt, inventory, receivables and payables turnover, gross profit, return on investment |
| short | 10 | 3 | liquidity pair, missing inventory, three solvency ratios, interest coverage from profit after tax, three turnover ratios with capital employed both ways, missing opening/closing inventory, gross/operating/operating profit, net profit before and after tax, capital employed both ways and return on investment, limitations |
| long | 6 + 6 | 4 / 6 | 4: effects of four transactions on the current ratio and on the debt-equity ratio, receivables and payables turnover with meaning, four profitability ratios, two-year interpretation (evaluation), classification with users. 6: four solvency ratios with a comment, six turnover ratios, five profitability ratios with capital employed both ways, a six-ratio comprehensive problem, a six-step missing-figure chain, theory (meaning and objectives) |

- Difficulty d1/d2/d3/d4/d5 = 6/22/30/9/2. Competency: recall 8, understanding 22, application 30, analysis 8, evaluation 1 — **57% at application or above** (lint band 45–65%).
- MCQ keys a5 b5 c5 d5.
- **Tests** are disjoint and use no deck-check item. Short = A 3 MCQ + 1 A-R; B liquidity pair + capital employed and return on investment; C debt-equity effects | classification; D six turnover ratios | missing-figure chain. Long = A 6 MCQ + 2 A-R; B solvency trio, missing inventory, gross/operating ratios + (interest coverage | limitations); C current-ratio effects + (receivables and payables turnover | two-year interpretation); D comprehensive six ratios + (solvency with comment | profitability with capital employed).

## Verifier record (what the build computes and asserts)
- **One ratio engine** (`acc.mjs`): `position()` builds every balance sheet from sub-head figures and throws unless equity and liabilities equal assets **and** capital employed from the liabilities side (shareholders' funds + non-current liabilities) equals capital employed from the assets side (non-current assets + working capital). Asserted for Narmada (₹25,00,000; capital employed ₹21,00,000), Jhelum, Beas, Vamsadhara, Alaknanda (₹35,00,000), Ghataprabha, Tamraparni (₹20,00,000 both ways), Kangsabati, Sarada (₹40,00,000 both ways), Bhagirathi (₹50,00,000 both ways) and Kanhan (₹50,00,000).
- `trading()` and `results()` compute cost of revenue from operations, gross profit, operating cost, operating profit, profit before interest and tax, profit before and after tax, and assert that gross profit − operating expenses = operating profit and that the profit chain re-adds.
- Every ratio is computed from the givens by `ratio()` / `times()` / `pct()` (exact integer arithmetic, half-up rounding to two decimals) and **pinned to an independently hand-checked value** with `pin()`; a wrong datum throws (a desk review caught one slip before the first build: the Tamraparni purchases first gave a cost of revenue that did not match the intended inventory turnover; its pin would have thrown on it).
- **Effects of transactions** (`effects()`): each new ratio is recomputed from the changed figures, compared with the original as exact fractions, and asserted against the expected increase / decrease / no change; stem labels are asserted to carry the amount used. MCQ options for effects and for computed ratios are generated from the same values (including the computed common mistakes used as distractors).
- **Missing figures** (Manjira, Koyna, Sankh, Sharda, Dudhganga): the unknowns are solved in integer arithmetic and every given ratio is then recomputed from the answers and asserted.
- Operating ratio + operating profit ratio = 100 is asserted wherever both appear; the per-₹100 bar segments are asserted to be whole rupees adding to 100.
- `originality --authored` (whole bank, including the new ch09): ch10 0 errors, 0 warnings (no reference texts supplied, OA-16). The deterministic verify checks run inside every build (0 flags); the `verify` CLI was not run separately for this unit.

## Originality
No NCERT illustration, exercise or wording and no CBSE sample/past-paper item is reused; they define the pattern only. Every company (Narmada Agro Foods, Dudhganga Dairy, Gomti Garments, Koyna Castings, Kabini Coffee Curing, Alaknanda Herbals, Mandovi Fisheries, Tamraparni Textiles, Bhagirathi Woollen Mills, Kanhan Steel Fabricators, Sharda Valley Ceramics, Yamuna Kitchenware and others) and every figure is SOYL's own and labelled imagined. Stems are situational and company-specific so that the formulaic ratio items do not collide in the bank duplicate check.

## For a reviewer to double-check
- **Debt** is taken as long-term borrowings + long-term provisions (non-current liabilities) and **total assets** as all assets; some books exclude long-term provisions from debt or deduct fictitious assets. One definition is used throughout and stated in notes section 2.
- **Fixed asset turnover** uses net fixed assets (property, plant and equipment + intangible assets) at the year end; **inventory, receivables and payables turnover** use simple averages of opening and closing figures. When credit figures are not given the total is used (stated in notes).
- **Operating expenses** = employee benefits, depreciation and amortisation, other operating expenses; finance costs and non-operating gains and losses are excluded. **Net profit ratio** is given both before and after tax where the item asks.
- Average collection and payment periods (in days) are not computed; only turnover in times, per the syllabus list.
- Note tables and the SVG bar should be checked at 360 px on staging.

## Gaps
- No case-based items (optional per brief).
- Comparative and common-size statements are chapter 9; the cash flow statement is chapter 11.
