# CBSE Class 11 Business Studies, Chapter 7: Sources of Business Finance

`cbse-11-business-studies-ch07` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human` · every item `status: "draft"`

Hand-authored to the CBSE 11 Business Studies standard (D-025, D-026, D-036). Build from `platform/`:
`npx tsx content/authored/economics-commerce/cbse-11-business-studies-ch07/src/build.mjs`. The build checks the schema, pipeline lint, deterministic verify, word limits, narration rules, the answer-leak scan, the exact-stem originality pre-check and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON. The shared library is `../cbse-11-business-studies-ch01/src/lib.mjs` (imported, never edited).

| File | What |
|---|---|
| `release.json` | 2 decks (22 + 22 slides), notes (7 sections), 32 flashcards, 74 questions |
| `tests.json` | `t_cbse11businessstudies_ch07_short` (20 marks, 40 min) and `_long` (40 marks, 90 min) on `cbse-11-default-chapter-test-short` / `-long`, disjoint, no deck-check item |
| `src/` | `questions.mjs`, `build.mjs` |

## Scope

| Topic | Coverage |
|---|---|
| t01 | Meaning of business finance; fixed capital, working capital, growth; classification by period, ownership and source of generation |
| t02 | Owners' funds (equity shares, preference shares and their types, retained earnings); borrowed funds (debentures and their types, bank loans, financial institutions, trade credit, public deposits, commercial paper, lease financing, inter-corporate deposits); comparison on status, risk, return, control, cost and tax |
| t03 | International financing (commercial banks abroad, international agencies and development banks, international capital markets); Global, American and Indian Depository Receipts; Foreign Currency Convertible Bonds; nine factors in the choice of a source |

Decks: Part 1 (need for finance, classification, equity, preference, retained earnings; 4 checks, 3 worked examples: start-up needs, equity issue, cumulative arrear) and Part 2 (debentures, loans and credit, comparison, international finance, choice of source; 4 checks, 3 worked examples: debenture interest, trade credit and lease totals, loan against equity). SVGs: classification tree, owners' funds against borrowed funds chart, types of preference shares and debentures chart, international sources and instruments chart, choice-of-source factors web. No maps.

Questions: 30 mcq, 6 assertion-reason, 3 true-false, 3 fill-blank, 2 match, 2 ordering, 10 short 2-mark, 7 short 3-mark, 6 long 5-mark, 5 case-based (all on imagined firms). Application or above: 58%. Difficulty: d2 15, d3 42, d4 17.

Tests: short = mc_fixed_id, mc_pref_cum_id, mc_gdr_vote + ar_pref_prior / two 2-mark + one 3-mark / one of two long / `cb_sutra`. Long = 8 mcq + 2 ar / two 2-mark, one of two 2-mark, one 3-mark, one of two 3-mark / one long + one of two long / `cb_chitra` + `cb_tarang`.

Every firm, start-up, exporter and investor is imagined. No real company is named.

## How verified

Build prints `NO ERRORS` with `lint: 0 error(s), 0 warning(s)`; `release.json` and `tests.json` are byte-identical across three builds; `checks.mjs` reports 0 near-duplicate flags (74 stems against 40,657 others) and 0 SVG issues. No tree-wide gates, git or e2e were run.

## Facts for a reviewer

Time-sensitive points are "as of 2024" in the content and should be re-checked. No rate, limit or section number of any regulation is quoted.

1. Business finance: the funds that a business needs to start, run and grow.
2. Fixed capital: funds for long-term assets (land, machinery, buildings). Working capital: funds for day-to-day operations (materials, wages, power, rent). Funds are also needed for growth and expansion.
3. Classification: by period (long-term, medium-term, short-term); by ownership (owners' funds, borrowed funds); by source of generation (internal, external). The period boundaries are used in the usual textbook sense (short-term up to about a year, medium-term from one to about five years, long-term beyond); the content gives no exact limits except the eight-month loan example.
4. Equity shares: ownership capital; residual claim; voting rights. Merits: permanent capital, no fixed burden, voting, credit base. Limitations: cost of issue, dilution of control, fluctuating return; dividend is not tax-deductible.
5. Preference shares: fixed rate of dividend; priority over equity in dividend and in return of capital; generally no voting on ordinary matters (stated generally). Types: cumulative / non-cumulative, participating / non-participating, convertible / non-convertible, redeemable / irredeemable (irredeemable stated as repaid at winding up).
6. Retained earnings (ploughing back of profits): internal, owners' fund, long-term. Merits: no issue cost, no repayment date, no dilution of control. Limitations: shareholder dissatisfaction, idle funds, growth limited to profit earned.
7. Debentures: acknowledgement of debt, fixed interest, holder is a creditor with no vote. Types: secured / unsecured (charge on assets), registered / bearer (name recorded / passes by delivery), convertible / non-convertible, redeemable / irredeemable. Merits: fixed income, no dilution, tax-deductible interest, trading on equity. Limitations: fixed burden, repayment, lower borrowing capacity, higher financial risk.
8. Bank loans: money lent for a stated period at interest, usually against security. Loans from financial institutions: long-term finance from specialised institutions for industry and infrastructure (no institution named). Reviewer: confirm the general wording.
9. Trade credit: credit from suppliers, short-term. Lease financing: lessor owns, lessee uses and pays lease rentals.
10. Dated, as of 2024, general terms only: public deposits (deposits companies accept from the public under rules), commercial paper (unsecured promissory note for short-term needs, issued by large firms, sold at a discount to face value), inter-corporate deposits (deposits placed by one company with another for a short period). No rates, limits, tenors or eligibility figures are given; the "ninety days" in one commercial paper stem is an imagined example.
11. Comparison of owners' funds and borrowed funds: status, risk, return, control, cost, tax (interest is tax-deductible; dividend is paid out of profit after tax). Stated as a general principle.
12. International sources: commercial banks abroad (foreign-currency loans), international agencies and development banks (loans and help for projects; no agency named), international capital markets.
13. Global Depository Receipt: issued by a depository bank against shares, traded in markets outside the United States, holders have no voting rights. American Depository Receipt: traded in the United States against shares of a foreign company. Indian Depository Receipt: issued in India by a foreign company. Foreign Currency Convertible Bond: bond issued in a foreign currency, convertible into shares on stated terms. All in general terms; no regulatory conditions are given. Reviewer: confirm that "holders have no voting rights" for Global Depository Receipts matches the textbook and that this is acceptable stated generally.
14. Nine factors in the choice of a source: cost; financial strength and stability of operations; form of organisation and legal status; purpose and time period; risk profile; control; effect on creditworthiness; flexibility and ease; tax benefits.
15. Computed figures (code, all imagined): Sutra Looms fixed capital Rs 15,00,000, working capital Rs 6,00,000, total Rs 21,00,000. Nirmaan Labs: 2,00,000 shares at Rs 30 = Rs 60,00,000; 4 per cent expenses Rs 2,40,000; net Rs 57,60,000; promoters 6,00,000 of 8,00,000 (75 per cent) fall to 6,00,000 of 10,00,000 (60 per cent). Aadhar Polymers: 20,000 shares of Rs 100 at 9 per cent = Rs 1,80,000 a year; two-year arrear Rs 3,60,000; due in year three Rs 5,40,000; from profit Rs 8,00,000, Rs 2,60,000 left, Rs 2.60 per equity share on 1,00,000 shares. Kosi Cables: 10,000 shares of Rs 100 at 8 per cent for 3 years, arrear Rs 2,40,000. Veer Plastics: 5,000 shares of Rs 200 at 10 per cent for 2 years, arrear Rs 2,00,000. Chitra Tiles: 5,000 debentures of Rs 1,000 = Rs 50,00,000; 11 per cent interest Rs 5,50,000; tax saved at an imagined 25 per cent Rs 1,37,500; net Rs 4,12,500; trade credit Rs 8,000 a day for 45 days = Rs 3,60,000. Madhur Bakers lease: Rs 18,000 for 60 months = Rs 10,80,000 against a price of Rs 8,00,000, extra Rs 2,80,000. Commercial paper: face Rs 1,00,00,000, issued at Rs 98,00,000, discount Rs 2,00,000. Tarang Garments: 4,00,000 shares at 2 per receipt = 2,00,000 receipts; at 12 United States dollars = 24,00,000 United States dollars; at an imagined Rs 80 per dollar = Rs 19,20,00,000. Vihaan Pumps: Rs 40,00,000 loan at 12 per cent = Rs 4,80,000 a year; good year (profit before interest Rs 9,00,000) leaves Rs 4,20,000; poor year (Rs 3,00,000) falls short by Rs 1,80,000. Bhumi Seeds: profit Rs 40,00,000, 60 per cent dividend Rs 24,00,000, retained Rs 16,00,000. Simplified: no time value, no issue-cost tax effects, tax rate and exchange rate imagined.
16. Unsure or simplified: whether to state generally that preference shares carry no voting rights on ordinary matters; the choice of medium-term for a bank loan of a few years; the description of irredeemable debentures and preference shares as repaid at winding up; the statement that dividend is not tax-deductible is a general principle with no section of any tax law quoted.
