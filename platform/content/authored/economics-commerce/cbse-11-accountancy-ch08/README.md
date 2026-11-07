# CBSE Class 11 Accountancy, Chapter 8: Financial Statements – I

`cbse-11-accountancy-ch08` · release v1 · academic year 2026-27 · family `economics-commerce` (Unit 3: Financial Statements of Sole Proprietorship) · provenance `human`, author `claude (subject-producer)` · every item `status: "draft"`

Run `npx tsx content/authored/economics-commerce/cbse-11-accountancy-ch08/src/build.mjs` from `platform/`. The build checks schema, pipeline lint, verify checks, word limits, narration rules, the answer-leak scan, the exact-stem originality pre-check, near-duplicate stems inside the bank, test disjointness and the editorial counts, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` on any error). Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (20 + 21 slides; 16 + 17 visuals; 4 + 4 checks; 5 + 7 worked examples), notes (7 sections), 33 flashcards, 76 questions (141 marks) with 12 passage children |
| `tests.json` | `_short` (20 marks, 40 min) on `cbse-11-default-chapter-test-short` and `_long` (40 marks, 90 min) on `cbse-11-default-chapter-test-long`; disjoint, no deck-check item, no numerical item |
| `src/` | `figures.mjs` (the `finals()` helper and the imagined firms), `qq.mjs` (registration and mark-scheme check), `q_obj.mjs`, `q_calc.mjs`, `q_cases.mjs`, `questions.mjs`, `build.mjs`; uses the shared `../../cbse-11-accountancy-ch01/src/lib.mjs` and `acc.mjs` unchanged |

## Scope

| Topic | Coverage |
|---|---|
| t01 Capital and revenue items | Capital expenditure, revenue expenditure, deferred revenue expenditure (one line, heavy advertising), capital and revenue receipts, classification of imagined payments, effect of a wrong class on profit and on asset values (Farhan Textiles, Sheetal Dyers) |
| t02 Trading and Profit and Loss Account; Balance Sheet | Stakeholders and their needs; horizontal Trading Account (net purchases, net sales, direct expenses, closing stock given outside the trial balance); Profit and Loss Account (indirect expenses by kind, other incomes, net profit or loss, operating profit as one line); horizontal Balance Sheet (capital with profit and drawings, long-term and current liabilities, fixed assets, investments, current assets); grouping and marshalling, shown in both orders for Farhan Textiles; a net loss (Gauri Bakery) and a gross loss (Ila Garments) |
| t03 Opening and closing entries | Eight closing entries in order (including closing stock, gross profit or loss, net profit or loss, drawings) and the opening entry, all generated with `journal()` from the same trial balance |

No adjustments are taught: no outstanding or prepaid items, depreciation, provisions or goods withdrawn. Closing stock given outside the trial balance is the only item outside it. Four original SVGs (trial balance to balance sheet flow, direct versus indirect expenses chart, capital versus revenue chart, liquidity versus permanence order). No maps.

### Decks
- **Part 1 (t01, t02), 20 slides:** the flow, capital expenditure, revenue expenditure, side by side, receipts and deferred revenue expenditure, classification of seven payments (Farhan Textiles), why the distinction matters, effect of two wrong treatments (Sheetal Dyers), stakeholders, the Trading Account, direct and indirect expenses, the 20-item trial balance of Farhan Textiles, where each item goes (every item once), its Trading Account, summary, tips. Checks: `m_classify_chk`, `n_capcost_chk`, `m_direct_chk`, `n_gp_chk`.
- **Part 2 (t02, t03), 21 slides:** Profit and Loss Account, Farhan Textiles' account with the operating profit line, Balance Sheet, grouping and marshalling, the order diagram, the Balance Sheet in the order of permanence and in the order of liquidity, a net loss (Gauri Bakery), closing entries (steps, then two journal slides), gross and net loss entries, the opening entry and its journal, summary, tips. Checks: `n_np_chk`, `m_stock_entry`, `ord_close_chk`, `fb_open_chk`.
- Narration: at most 69 words (mean 57), amounts in words, no digits or symbols (the build enforces it).

### Question bank (76 items, 141 marks)

25 mcq, 5 assertion-reason (verdicts a, a, d, c, b), 2 true-false, 3 fill-blank, 2 match, 2 ordering, 12 numerical (every value a computed variable), 9 short 2-mark, 6 short 3-mark, 6 long 5-mark, 4 case-based (4 marks: 1 + 1 + 2, part (c) with an either/or). Long items: Trading, Profit and Loss Account and Balance Sheet from a 20-item trial balance with closing stock (Jatin Electricals), closing entries of a net-loss year (Gauri Bakery), the Balance Sheet in both orders (Farhan Textiles), distinction between capital and revenue expenditure, classification of ten payments, and an evaluation of three wrongly treated items (Parveen Chemicals). Case items: Esha Foods (cost of a machine), Mira Mobiles (Trading Account), Nikhil Traders (Balance Sheet), Omkar Paints (closing and opening entries). MCQ keys a 7, b 6, c 6, d 6.

Competency: recall 8, understanding 24, application 41, analysis 2, evaluation 1 (58% application or above). Difficulty: d1 10, d2 33, d3 24, d4 8, d5 1. Topics: t01 23, t02 38, t03 15. No competency tag was changed to reach the band.

### Tests

- **Short (20 marks, 10 items):** A = `m_cap_def`, `m_gp_calc`, `m_close_np`, `ar_cap_rev`; B = `s2_cap_features`, `s2_trading`, `s3_classify`; C = one of `l5_distinction`, `l5_classify`; D = `cb_class`.
- **Long (40 marks, 22 items):** A = `m_repair_rev`, `m_cap_receipt`, `m_stake`, `m_indirect`, `m_gross_loss`, `m_liq`, `m_close_trade`, `m_open_entry`, `ar_closing_stock`, `ar_drawings`; B = `s2_deferred`, `s2_direct_ind`, one of (`s2_grouping`, `s2_opening`), `s3_wrong`, one of (`s3_gross_loss`, `s3_close3`); C = `l5_stmts`, one of (`l5_close`, `l5_bs2`); D = `cb_trading`, `cb_bs`.

## How verified

- **Every figure is computed with `acc.mjs` and asserted.** `figures.mjs` builds each imagined firm from one trial balance (the capital is the balancing figure, so the trial balance agrees by `trialBalance()`); every item is used exactly once (use counts asserted); the gross and net profit are checked against their formulae; `balanceSheet()` asserts that both orders balance; the closing entries come from `journal()` and are replayed to assert that every nominal account is at nil, the Trading and Profit and Loss Accounts are closed and the Capital A/c equals the Balance Sheet figure; the opening entry total equals the Balance Sheet total. Slide tables and model answers print these objects.
- Firms: Farhan Textiles (20 items, profit), Gauri Bakery (20, gross profit but net loss), Ila Garments (17, gross loss and net loss), Jatin Electricals (20, profit), Omkar Paints (16, profit). All imagined.
- `build.mjs` printed `NO ERRORS` with `lint: 0 error(s), 0 warning(s)`; two further builds gave byte-identical `release.json` and `tests.json`; no `*.wip.json` remains. The near-duplicate and SVG scan (`checks.mjs`) was run on the chapter.
- Not run, by instruction: git, tree-wide gates, `npm test`, the app.

## Facts for a reviewer

1. **Capital expenditure:** benefit for more than one accounting year; acquires or improves a fixed asset (more capacity or longer life); non-recurring; shown as an asset. Carriage and fitting charges on a new machine, legal fees on buying a building and wages of own workers building an asset are treated as part of the cost.
2. **Revenue expenditure:** benefit used up within the year; runs the business or maintains assets; recurring; charged to the Trading or Profit and Loss Account. Carriage on goods bought for resale is revenue (a direct expense).
3. **Deferred revenue expenditure:** a revenue expense whose benefit lasts several years, the part not yet charged being carried forward; the only example is heavy advertising; no write-off rule is taught.
4. **Capital receipt / revenue receipt:** capital receipts are capital introduced, loans received and sale proceeds of fixed assets; revenue receipts are sales and incomes such as commission, interest and rent received.
5. **Effect of wrong treatment:** a capital item charged as an expense understates profit and the asset; a revenue item added to an asset overstates both. The effect on assets is equal to the effect on profit for a single item (no depreciation is considered).
6. **Stakeholders:** proprietor, lenders and banks, suppliers on credit, employees and tax authorities, with one line each.
7. **Trading Account format (horizontal, sole proprietor):** debit side opening stock, purchases less returns, direct expenses; credit side sales less returns, closing stock; balancing figure gross profit (debit) or gross loss (credit). Net purchases and net sales are shown as one line each with the returns written in the label.
8. **Direct expenses:** wages, carriage inwards, freight inwards, power and fuel, customs or import duty, dock and clearing charges. Wages are treated as direct throughout, as in the usual textbook assumption.
9. **Profit and Loss Account format:** debit side indirect expenses (office and administrative, selling and distribution, financial) and losses, with a gross loss brought down; credit side gross profit brought down and other incomes; balancing figure net profit (debit) or net loss (credit). Discount received is shown as an income and discount allowed as a financial expense (named in the chart only).
10. **Operating profit** (optional, one line): gross profit less operating expenses (office, administrative, selling and distribution), leaving out financial expenses and non-operating incomes. For Farhan Textiles it equals net profit less commission received.
11. **Balance Sheet format (horizontal):** liabilities side capital (opening capital plus net profit less drawings, or less net loss), long-term liabilities, current liabilities; assets side fixed assets, investments, current assets. It is a statement, not an account. The capital line is shown as a single computed figure with the working in its label.
12. **Grouping and marshalling:** grouping puts like items under one head; marshalling arranges the heads in the order of permanence (fixed assets first, cash last; capital first) or the order of liquidity (cash first, fixed assets last; current liabilities first, capital last). The liquidity order here is the exact reverse of the permanence order, with the liabilities side arranged as current liabilities, long-term liabilities, capital.
13. **Investments** are placed between fixed assets and current assets in the order of permanence; no current investments are taught.
14. **Closing entries (eight steps):** (1) Trading A/c Dr. To opening stock, purchases, sales returns, direct expenses; (2) Sales A/c and Purchases Returns A/c Dr. To Trading A/c; (3) Closing Stock A/c Dr. To Trading A/c; (4) gross profit or gross loss to the Profit and Loss A/c; (5) Profit and Loss A/c Dr. To indirect expenses and losses; (6) incomes Dr. To Profit and Loss A/c; (7) net profit or net loss to the Capital A/c; (8) Capital A/c Dr. To Drawings A/c. Sales returns are closed with the debit items and purchases returns with the sales, so the Trading A/c in the journal shows gross figures while the statement shows net figures; the gross profit is the same. Other orders and groupings of these entries are also seen in textbooks.
15. **Opening entry:** on the first day of the new year; all assets Dr. (closing stock as Stock A/c), Capital A/c and all liabilities Cr.; the capital is the closing capital of the Balance Sheet; narration "Being balances brought forward from the Balance Sheet on 31 March 20XX".
16. **Closing stock** is given outside the trial balance, valued at cost, and appears in the Trading Account (credit) and the Balance Sheet (current assets) only. No adjustments (outstanding, prepaid, depreciation, provisions, bad debts) are taught; they are left for chapter 9. Interest on loan appears only as a paid item of the trial balance.
17. **Journal and statement wording:** "To …" on the debit side and "By …" on the credit side of the Trading and Profit and Loss Accounts, "c/d" and "b/d" for the gross profit, as in the shared `acc.mjs`; the net profit line reads "To Net Profit (transferred to Capital A/c)". Account names such as "Closing Stock A/c" are customary, not prescribed.
18. **Imagined data:** every firm, person and town is imagined; every amount is chosen to give whole rupees. No rate of goods and services tax appears. Years used: year ended 31 March 2025, 2026 and 2027.
19. **Unsure of:** whether a board expects the closing entry for sales returns and purchases returns in the form used here (returns closed with their group) or as a deduction from the main account first; and whether the Balance Sheet heading should read "as on" (used) rather than "as at".
