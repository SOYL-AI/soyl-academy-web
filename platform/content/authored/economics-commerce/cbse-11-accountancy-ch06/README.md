# CBSE Class 11 Accountancy, Chapter 6: Trial Balance and Rectification of Errors

`cbse-11-accountancy-ch06` · release v1 · academic year 2026-27 · family `economics-commerce` (Unit 2: Accounting Process) · provenance `human`, author `claude (subject-producer)` · every item `status: "draft"`

Run `npx tsx content/authored/economics-commerce/cbse-11-accountancy-ch06/src/build.mjs` from `platform/`. The build checks schema, pipeline lint, verify checks, word limits, narration rules, the answer-leak scan, the exact-stem originality pre-check, near-duplicate stems inside the bank, test disjointness and the editorial counts, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` on any error). Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (19 + 22 slides; 15 + 19 visuals; 4 + 3 checks; 4 + 6 worked examples), notes (7 sections), 33 flashcards, 76 questions (142 marks) with 12 passage children |
| `tests.json` | `_short` (20 marks, 40 min) on `cbse-11-default-chapter-test-short` and `_long` (40 marks, 90 min) on `cbse-11-default-chapter-test-long`; disjoint, no deck-check item, no numerical item |
| `src/` | `extra.mjs` (chapter helpers: account registry, error model, rectification before and after the trial balance, suspense account, corrected trial balance, profit effect, totals and balances), `figures.mjs` (computed, asserted figures: Kabir Traders, Naina Stores, Tara Footwear, Ritu Garments), `qq.mjs` (registration and mark-scheme check), `q_obj.mjs`, `q_calc.mjs`, `q_cases.mjs`, `questions.mjs`, `build.mjs`; uses the shared `../../cbse-11-accountancy-ch01/src/lib.mjs` and `acc.mjs` unchanged |

## Scope

| Topic | Coverage |
|---|---|
| t01 Preparation of trial balance | Meaning; four objectives; the side each kind of account takes (assets, expenses, drawings, debtors and opening stock on the debit side; liabilities, capital, revenues, creditors and provisions on the credit side); the balances method with the steps, and a short treatment of the totals method and the totals and balances method (Naina Stores); Kabir Traders' sixteen-account trial balance; clues when the columns differ; limitations of an agreed trial balance; where the balances go in the final accounts (one slide) |
| t02 Types of errors and their rectification | Errors of commission (wrong amount, side, account, totalling, balancing, carrying forward), omission (complete, partial), principle, compensating; one-sided and two-sided errors and the effect on the trial balance; rectification before the trial balance (explanatory entry for a one-sided error, journal entry for a two-sided error; Tara Footwear); the suspense account and rectification after the trial balance (Ritu Garments: six errors, suspense account opened with a debit of ₹9,100 and closed); the effect of each error on net profit and the corrected profit |

Four original SVGs (types-of-errors tree, "does it affect the trial balance?" flow, rectification timing flow, suspense account T-diagram) and one flow diagram. No maps.

### Decks
- **Part 1 (t01), 19 slides:** meaning, objectives, sides, three methods, Naina Stores totals and balances, steps, Kabir Traders trial balance, choosing the column, clues when columns differ, Tara Footwear's disagreeing columns, limitations, trial balance to final accounts, summary, tips. Checks: `m_side_chk`, `n_tb_missing`, `tf_agree_chk`, `ord_tb_steps`.
- **Part 2 (t02), 22 slides:** one-sided and two-sided errors, the four types, the "does it affect" flow, classification of Ritu Garments' six errors, timing flow, rectification before the trial balance (Tara Footwear journal entries and explanatory corrections, corrected trial balance), suspense account T-diagram, rectification after the trial balance (Ritu Garments: opening the suspense account, six entries), effect on profit and corrected profit, summary, tips. Checks: `m_class_chk`, `n_susp_chk`, `fb_susp`.
- Narration: at most 79 words (mean 59), amounts in words, no digits or symbols (the build enforces it).

### Question bank (76 items, 142 marks)

24 mcq, 5 assertion-reason (verdicts d, a, a, c, b), 3 true-false, 2 fill-blank, 2 match, 2 ordering, 11 numerical (every value a computed variable), 10 short 2-mark, 7 short 3-mark, 6 long 5-mark, 4 case-based (4 marks: 1 + 1 + 2, part (c) with an either/or). Long items: preparing a sixteen-balance trial balance (Mohini Boutique), four errors before the trial balance (Gagan Hardware), five errors after it with the suspense account (Nandini Traders), a corrected-profit statement (Omkar Electricals), the four types of errors, and an evaluation of the claim that an agreed trial balance is conclusive proof. MCQ keys a 6, b 6, c 6, d 6.

Competency: recall 6, understanding 28, application 35, analysis 6, evaluation 1 (55% application or above). Difficulty: d1 11, d2 23, d3 31, d4 11. Topics: t01 21, t02 48, both 7.

### Tests

- **Short (20 marks, 10 items):** A = `m_tb_object`, `m_rect_entry`, `m_profit_under`, `ar_tb_agree`; B = `s2_objectives`, `s2_susp_meaning`, `s3_classify`; C = one of `l5_tb_prepare` / `l5_after`; D = `cb_tb`.
- **Long (40 marks, 22 items):** A = `m_tb_meaning`, `m_side_class`, `m_tb_diff`, `m_err_commission`, `m_err_comp`, `m_two_sided`, `m_susp_close`, `m_rect_two`, `ar_susp`, `ar_principle`; B = `s2_methods`, `s2_comm_omis`, one of `s2_principle` / `s2_before_after`, `s3_susp_entries`, one of `s3_profit_effect` / `s3_diff_clues`; C = `l5_before`, one of `l5_profit` / `l5_limits`; D = `cb_before`, `cb_profit`.
- Deck checks (in no test): `m_side_chk`, `n_tb_missing`, `tf_agree_chk`, `ord_tb_steps`, `m_class_chk`, `n_susp_chk`, `fb_susp`.

## How verified

Every figure is computed with the shared `acc.mjs` and the chapter helpers in `extra.mjs`, and asserted with `same()`: the correct balances of each firm agree (`trialBalance()`), the books with the errors differ from the correct balances by exactly the sum of the one-sided errors and agree once the Suspense A/c is added, the Suspense A/c closes after all rectifications (`ledger()` balance is nil), every journal entry balances (`journal()`), the corrected balances equal the correct balances and the corrected trial balance totals equal the correct totals, the stated effect of each error on net profit equals the effect computed from the nominal accounts it touches, a complete omission posts nothing, an error of principle is two-sided and a compensating error cancels, and the corrected profit equals the reported profit adjusted by the effects. Slide tables and model answers are generated from the computed objects. The build prints `NO ERRORS` with `lint: 0 error(s), 0 warning(s)`; three builds give byte-identical `release.json` and `tests.json` and no `*.wip.json` remains; the near-duplicate scan (0 flags against the whole tree) and the SVG label overflow/overlap estimate (0 issues) are run with the producer's `checks.mjs`. The SVGs have not been viewed rendered.

## Facts for a reviewer

1. **Trial balance:** a statement of the debit balances and the credit balances of all ledger accounts on a given date, prepared to check arithmetical accuracy; drawn up after posting and balancing, usually at the end of the accounting period.
2. **Objectives (four):** check arithmetical accuracy; help locate errors; summarise the ledger accounts; help prepare the financial statements.
3. **Sides:** debit column for assets, expenses and losses, drawings, debtors and opening stock; credit column for liabilities, capital, revenues and gains, creditors and provisions. A provision (for example for doubtful debts) is shown as a credit balance.
4. **Methods:** the balances method is the main method taught and examined; the totals method and the totals and balances method are described in one table and one worked example (Naina Stores) and examined only in a fill-blank and a short question. Please confirm that the prescribed textbook treats them this way.
5. **Clues when columns differ:** a difference equal to one balance, divisible by nine (transposition), twice an amount (a balance in the wrong column), or a round figure. These are presented as possible indications only, not as rules.
6. **Limitations:** an agreed trial balance proves only arithmetical accuracy; a complete omission, an error of principle, a posting to a wrong account of the same kind and compensating errors do not affect the columns.
7. **Errors of commission:** wrong amount, wrong side or wrong account in posting, and wrong totalling, balancing or carrying forward. A wrong account of the same kind is two-sided (the columns agree); wrong amount, wrong side, wrong totalling, balancing and carrying forward are one-sided. Textbooks differ on where wrong totalling and wrong balancing are classified; here they are commission.
8. **Errors of omission:** complete omission (two-sided; the trial balance agrees) and partial omission (one side posted; one-sided).
9. **Error of principle:** a capital item treated as a revenue item, or the reverse (for example furniture or a computer debited to Purchases A/c; repairs debited to Machinery A/c); two-sided.
10. **Compensating errors:** two or more errors whose effects on the two sides cancel; the trial balance agrees; corrected by one journal entry.
11. **One-sided and two-sided errors:** one-sided errors put unequal amounts on the two sides and make the trial balance disagree; two-sided errors do not.
12. **Rectification before the trial balance:** a one-sided error is corrected by an explanatory entry on the proper side of the affected account (written in the account, with no journal entry); a two-sided error by a journal entry with a narration in brackets. No suspense account is used. Some books pass a journal entry for every correction; this chapter follows the account-correction convention.
13. **Rectification after the trial balance:** the difference is placed in a Suspense A/c (debit if the credit column is higher, credit if the debit column is higher); each one-sided error is corrected by a journal entry with the Suspense A/c as the other account; each two-sided error by a journal entry without it; the Suspense A/c must close with a nil balance. The opening line of the account is written "To/By Difference in trial balance".
14. **Rectifying entry for a one-sided error** is built from the accounts affected: the account carrying too much on one side is put right on the opposite side and the Suspense A/c takes the balancing amount (for example, purchases book overcast: Suspense A/c Dr, To Purchases A/c).
15. **Effect on net profit:** only expense and income accounts matter. Expense overstated or income understated: profit understated. Expense understated or income overstated: profit overstated. Equal amounts moved between two expenses or two incomes, or errors in assets, liabilities, capital or drawings only: no effect. Corrected net profit = reported profit less overstatements plus understatements. No error in the chapter touches stock.
16. **Capital and revenue expenditure:** capital expenditure gives a benefit beyond one accounting period (furniture, machinery, a computer, a van, installation cost of a machine, carriage to bring a machine to the factory); revenue expenditure is used up within the period (wages, rent, repairs, carriage on goods bought).
17. **One slide on where balances go in the final accounts (Part 1):** opening stock, purchases, carriage inwards, wages and sales to the trading account; rent and discount received to the profit and loss account; capital, drawings, the loan, creditors and the assets to the balance sheet. Wages are shown in the trading account on the usual assumption that they are direct wages; a later chapter treats this properly. Please confirm that the slide may stay in this chapter.
18. **Account names:** journal names such as "Commission Received A/c" and "Suspense A/c" are customary, not prescribed. The trial balance tables use names without "A/c".
19. **Imagined data:** every firm, person and town is imagined; every amount is chosen to give whole rupees. No rate of goods and services tax appears in this chapter.
20. **Unsure of:** the exact heading wording a board expects for the trial balance ("as on 31 March 2028" is used); and whether a board expects the one-sided correction before the trial balance as a journal entry rather than an entry in the account.
