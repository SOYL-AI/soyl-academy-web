# CBSE Class 11 Accountancy, Chapter 9: Financial Statements – II

`cbse-11-accountancy-ch09` · release v1 · academic year 2026-27 · family `economics-commerce` (Unit 3: Financial Statements of Sole Proprietorship) · provenance `human`, author `claude (subject-producer)` · every item `status: "draft"`

Run `npx tsx content/authored/economics-commerce/cbse-11-accountancy-ch09/src/build.mjs` from `platform/`. The build checks schema, pipeline lint, verify checks, word limits, narration rules, the answer-leak scan, the exact-stem originality pre-check, near-duplicate stems inside the bank, test disjointness and the editorial counts, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` on any error). Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (19 + 22 slides; 15 + 19 visuals; 4 + 3 checks; 4 + 10 worked examples), notes (6 sections), 31 flashcards, 78 questions (140 marks) with 12 passage children |
| `tests.json` | `_short` (20 marks, 40 min) on `cbse-11-default-chapter-test-short` and `_long` (40 marks, 90 min) on `cbse-11-default-chapter-test-long`; disjoint, no deck-check item, no numerical item |
| `src/adj.mjs` | `adjFinals()` (the adjustments engine), `impact()` (effect of each adjustment alone), `debtsCalc()`, `commissionOn()`, `pctOf()` |
| `src/figures.mjs` | the imagined firms and their trial balances, built with `adjFinals()` |
| `src/qq.mjs`, `q_obj.mjs`, `q_calc.mjs`, `q_cases.mjs`, `questions.mjs`, `build.mjs` | registration and mark-scheme check; objective, numerical/short/long and case items; the bank; the build. Uses the shared `../../cbse-11-accountancy-ch01/src/lib.mjs` and `acc.mjs` unchanged |

## Scope

Single topic, so every item is `t: 1`.

| Topic | Coverage |
|---|---|
| t01 Adjustments in preparation of financial statements | Why adjustments are made (matching concept, accrual basis); closing stock outside and inside the trial balance; outstanding and prepaid expenses; accrued income and income received in advance; depreciation; bad debts, further bad debts, provision for doubtful debts (new provision on debtors after further bad debts; charge = bad debts + further bad debts + new provision − old provision; debtors shown less further bad debts and the provision); provision for discount on debtors (on debtors after the provision for doubtful debts); interest on capital; interest on drawings; manager's commission before and after charging it (a current liability); goods withdrawn for personal use; abnormal loss of goods with an insurance claim; the effect of each adjustment on gross profit, net profit and the Balance Sheet; full horizontal statements from a trial balance with eight adjustments |

No adjustment beyond this list is taught. Four original visuals are SVGs (flow from trial balance to final accounts, the two-effects chart, the provision flow, the commission comparison). No maps.

### Decks
- **Part 1, 19 slides:** the flow, why adjustments are needed, the two-effects chart, closing stock, outstanding and prepaid expenses, accrued and advance income (Jaya Joinery), depreciation (Hemlata Hardware), goods withdrawn, abnormal loss (Ishwar Interiors), adjusting entries of Nisha Crafts, summary, tips. Checks: `m_stock_chk`, `n_out_chk`, `n_dep_chk`, `n_loss_chk`.
- **Part 2, 22 slides:** bad debts, the provision flow, a new provision (Pawan Pumps), an old provision and its account (Hrithik Hardware), provision for discount, interest, the commission on two bases (Rudra Rubber), the effect of each adjustment, then the trial balance, the eight adjustments, the Trading Account, the Profit and Loss Account and the Balance Sheet of Nisha Crafts, summary, tips. Checks: `n_prov_chk`, `n_disc_chk`, `n_comm_chk`.
- Narration: at most 78 words (mean 57), amounts in words, no digits or symbols (the build enforces it).

### Question bank (78 items, 140 marks)

26 mcq, 6 assertion-reason (verdicts a, b, c, d, a, a), 2 true-false, 2 fill-blank, 2 match, 1 ordering, 14 numerical (every value a computed variable), 9 short 2-mark, 6 short 3-mark, 6 long 5-mark, 4 case-based (4 marks: 1 + 1 + 2, part (c) with an either/or). Long items: full statements of Nisha Crafts (eight adjustments), Qadir Cycles (commission on both bases, with the Profit and Loss Account), Gopal Gaskets (provision account, both provisions, debtors in the Balance Sheet), Rani Kitchenware (effect of six adjustments each alone; abnormal loss, both interests, both provisions), a theory answer on why adjustments are made, and Preeti Pens (effect of five omissions). Case items: Jyoti Dairy (outstanding, prepaid and accrued items), Karan Kirana (bad debts and provision), Lata Lighting (commission), Mohit Mills (fire and goods withdrawn).

Competency: recall 1, understanding 31, application 39, analysis 6, evaluation 1 (59% application or above). Difficulty: d1 2, d2 25, d3 33, d4 16, d5 2. Topics: t01 78. One tag was changed (`ar_dep`, analysis to understanding, because it asks only whether a stated reason is true); no tag was changed to reach the band.

### Tests

- **Short (20 marks, 10 items):** A = `m_out_exp`, `m_dep_effect`, `m_loss`, `ar_closing`; B = `s2_closing`, `s2_out_pre`, `s3_exp`; C = one of `l5_nc`, `l5_theory`; D = `cb_accrual`.
- **Long (40 marks, 22 items):** A = `m_why_adj`, `m_prepaid`, `m_accrued`, `m_advance`, `m_bd_further`, `m_prov_base`, `m_intdraw`, `m_goods`, `ar_wages`, `ar_dep`; B = `s2_dep`, `s2_provision`, one of (`s2_acc_adv`, `s2_loss`), `s3_debts`, one of (`s3_comm`, `s3_entries`); C = `l5_qc`, one of (`l5_prov`, `l5_effect`); D = `cb_debts`, `cb_comm`.

## How verified

- **Every figure is computed with `acc.mjs` and asserted.** `adj.mjs` builds each imagined firm from one trial balance (the capital is the balancing figure, so the trial balance agrees by `trialBalance()`) and asserts that every trial balance item is used exactly once, that each adjustment is recorded in its two places (closing stock twice when given outside the trial balance, once when inside; an abnormal loss in its three places), that the Trading Account, the Profit and Loss Account and the Balance Sheet agree, that the capital in the Balance Sheet equals opening capital plus interest on capital plus net profit less drawings, goods withdrawn and interest on drawings, and that the provision accounts built with `ledger()` close at the new provision. The commission on each basis is checked against its definition. Every profit stated in prose is pinned with `same(computed, stated, …)`. Slide tables and model answers print these objects.
- Firms: Nisha Crafts (19 items, eight adjustments), Qadir Cycles (14 items, commission on both bases), Rani Kitchenware (14 items, fire, both interests, both provisions), Suhana Stores (trial balance drawn up after the Trading Account, closing stock inside it). All imagined.
- `build.mjs` printed `NO ERRORS` with `lint: 0 error(s), 0 warning(s)`; two further builds gave byte-identical `release.json` and `tests.json`; no `*.wip.json` remains. The near-duplicate and SVG scan (`checks.mjs`) was run on the chapter.
- Not run, by instruction: git, tree-wide gates, `npm test`, the app.

## Facts for a reviewer

1. **Matching concept** and **accrual basis** are given as the reason for adjustments, in the usual textbook wording.
2. **Closing stock** given outside the trial balance is credited in the Trading Account and shown as a current asset (two places); closing stock already in the trial balance, drawn up after the Trading Account, is shown only in the Balance Sheet, and the gross profit is then in the trial balance.
3. **Outstanding expense:** added to the expense and a current liability; **prepaid expense:** deducted and a current asset; **accrued income:** added and a current asset; **income received in advance:** deducted and a current liability. Wages and carriage are direct expenses (adjusted in the Trading Account); salaries, rent and insurance are indirect (Profit and Loss Account).
4. **Depreciation** is a given rate per cent on the book figure in the trial balance for the full year (no part-year or method is taught); debited to the Profit and Loss Account and deducted from the asset.
5. **Bad debts** (in the trial balance) and **further bad debts** (adjustment) are both debited to the Profit and Loss Account; the new provision for doubtful debts is a per cent of debtors after further bad debts; the charge is bad debts + further bad debts + new provision − old provision; debtors are shown less further bad debts and less the new provision. The old provision is shown as a credit balance in the trial balance and is replaced by the new one.
6. **Provision for discount on debtors** is calculated on debtors after further bad debts and after the provision for doubtful debts; the Profit and Loss charge is the new provision less the old one; it is deducted from debtors in the Balance Sheet. (Some books call it a reserve; "provision" is used.)
7. **Interest on capital** is calculated on the opening capital, debited to the Profit and Loss Account and added to capital; **interest on drawings** is credited and deducted from capital, on a rate per cent of the year's drawings (no months-based calculation) or on an amount given.
8. **Manager's commission:** before charging, net profit before commission × rate ÷ 100; after charging, net profit before commission × rate ÷ (100 + rate); the profit is taken after all other adjustments; debited to the Profit and Loss Account and shown as a current liability (outstanding commission).
9. **Goods withdrawn:** deducted from purchases in the Trading Account and added to drawings (Drawings A/c Dr. To Purchases A/c), valued at cost.
10. **Abnormal loss of goods by fire:** the full cost credited to the Trading Account; the claim admitted is a current asset (insurance claim receivable); the uninsured part is debited to the Profit and Loss Account. Closing stock is given after the fire. Not taught: loss of stock by theft or accident with no claim as a separate case, loss of fixed assets, claims under average clauses.
11. **Journal entries for adjustments** are written in a customary form (for example Closing Stock A/c Dr. To Trading A/c); other forms are also seen in textbooks. Narration is in the form "Being …".
12. **Statement formats** are the horizontal Trading, Profit and Loss and Balance Sheet of a sole proprietor, as in chapter 8; the capital line is one computed figure with its working in the label; the Balance Sheet heading reads "as on". Where an adjustment applies to a trading expense, the working is written into the label of the line (for example "To Wages (40,000 + 4,000 outstanding)").
13. **Effect of each adjustment alone** (the `impact()` tables) is measured against the same trial balance with no adjustments; the effects add up for adjustments that do not interact, and the commission is on the final profit.
14. **Imagined data:** every firm, person and town is imagined; every amount is chosen to give whole rupees. No rate of goods and services tax appears. Years used: year ended 31 March 2026.
15. **Unsure of:** whether a board expects the provision for discount on debtors to be calculated on debtors after the provision for doubtful debts (taught here, the usual textbook rule) in every case, and whether interest on drawings for a full year or on months drawn is expected at Class 11 level (an amount or a per cent of the year's drawings is used).
