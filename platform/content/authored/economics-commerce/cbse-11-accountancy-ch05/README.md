# CBSE Class 11 Accountancy, Chapter 5: Bank Reconciliation Statement

`cbse-11-accountancy-ch05` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Run `npx tsx content/authored/economics-commerce/cbse-11-accountancy-ch05/src/build.mjs` from `platform/`. The build checks schema, pipeline lint, verify checks, word limits, narration rules, the answer-leak scan, the exact-stem originality pre-check and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (19 + 22 slides; 15 + 18 visuals; 4 + 4 checks; 3 + 6 worked examples), notes (6 sections), 31 flashcards, 79 questions (153 marks) |
| `tests.json` | `_short` (20 marks, 40 min) and `_long` (40 marks, 90 min) on `cbse-11-default-chapter-test-short` / `-long`, disjoint, no deck-check item |
| `src/recon.mjs` | this chapter's own helpers: the cause list `CAUSES` (where each difference is first recorded and its effect), `I()` / `errCB()` / `errBank()` items, `statement()` (asserts through `acc.mjs` `brs()` and prints the textbook layout, including the reversed Add and Less groups for an overdraft start), `amended()` (the amended cash book as a balanced `ledger()`), `twoBooks()` (both books built from the same transactions, each balance found independently), and the computed add/less rule tables; self-checks run on import |
| `src/` | also `figures.mjs` (computed, asserted figures), `qq.mjs`, `q_t01.mjs`, `q_t02.mjs`, `q_cases.mjs`, `questions.mjs`, `build.mjs`; uses the shared `../../cbse-11-accountancy-ch01/src/lib.mjs` and `acc.mjs` unchanged |

## Scope

| Topic | Coverage |
|---|---|
| t01 | Pass book and cash book as mirror images of one account; favourable balance and overdraft in each book; meaning and need of a bank reconciliation statement (not an account); causes of difference in two groups, timing differences (recorded by the firm first: cheques issued not presented, cheques deposited not collected; recorded by the bank first: bank charges, interest on overdraft, interest allowed, direct deposits, payments on standing instruction, dividends or interest collected, dishonoured cheques) and errors (in the cash book, by the bank); which causes need a cash book entry and on which side of the bank column |
| t02 | Preparing the statement: five steps; the one question that decides add or deduct; starting from the cash book or the pass book, with a favourable balance or an overdraft (all four rules shown in a computed table); a negative result reported as an overdraft; the amended cash book and the statement from its balance (only cheque timing differences and bank errors remain); where cash book errors and bank errors are put right |

Worked firm and bank (imagined): Neel Traders and Sagar Bank (March 2027 favourable balances: cash book 62,500, pass book 64,560; June 2027 overdrafts: cash book 24,200, pass book 14,950). Four original SVGs: two books one account, causes chart, add/deduct decision flow, amended cash book to statement flow. No maps.

### Question bank (79)

26 mcq, 5 assertion-reason (verdicts a, a, b, d, c), 2 true-false, 2 fill-blank, 2 match, 2 ordering, 11 numerical (every value computed), 10 short 2-mark, 7 short 3-mark, 8 long 5-mark, 4 case-based (4 marks: 1 + 1 + 2, part (c) with an either/or). Competency: recall 7, understanding 27, application 31, analysis 12, evaluation 2 (57% application or above). Difficulty: d1 9, d2 26, d3 30, d4 14. Topics: t01 44, t02 34, both 1. Long computations: statement from a favourable cash book balance, from a pass book overdraft, from a cash book overdraft with a short addition, from a favourable pass book balance with a bank error and a dishonoured cheque, amended cash book then statement, and a month built from both books' own transactions.

### Tests

- Short (20 marks): A = m_brs_def, m_deposit_side, m_issued_effect, ar_not_account; B = s2_need, s2_issued_why, s3_classify; C = one of l5_brs_cb / l5_causes; D = cb_may.
- Long (40 marks): A = m_pb_def, m_od_books, m_need, m_deposited_effect, m_dishonour_effect, m_standing, m_amended, m_od_issued, ar_timing_noentry, ar_bank_first; B = s2_not_account, s2_od_books, one of s2_timing_error / s2_amend_why, s3_amend_entries, one of s3_errors / s3_od_small; C = l5_amend, one of l5_brs_pbod / l5_need; D = cb_aug, cb_oct.
- Deck checks (not in any test): m_dr_cr, m_timing_which, n_gap, mt_terms, m_cb_issued, n_brs_cb, ord_steps, ar_interest_allowed.
- In neither test: l5_derive, l5_cbod, l5_pb_fav, cb_dec and the other spare items.

## How verified

Every figure is computed with `acc.mjs` (`brs()`, `ledger()`) and `recon.mjs` and asserted. `statement()` runs `brs()` with `expected` set to the other book's balance in every use, so every statement is asserted to reach the right figure, and it re-adds its own printed Add and Less groups and asserts that the displayed arithmetic reaches the displayed end balance (this matters for an overdraft start, where `brs()` itself prints its Add and Less lines in the favourable layout). The two worked firms' books are built by `twoBooks()` from the same transactions with each balance computed independently, and the sum of the gaps is asserted to equal the difference of the balances. `amended()` posts the cash book items as a balanced ledger and asserts the new balance; the statement from the amended balance is asserted to reach the same pass book balance as the statement from the unamended balance. Hand-computed balances that appear in prose are pinned with `same(computed, stated, ...)`. The add/less rule tables (cash book or pass book, favourable or overdraft) are generated from the cause list, not typed. Build prints `NO ERRORS` with `lint: 0 error(s), 0 warning(s)`; three builds give byte-identical `release.json` and `tests.json` and no `*.wip.json` remains; the near-duplicate scan (79 stems against 42,589 others, 0 flags) and the SVG label overflow/overlap estimate (4 figures, 0 issues) were run with `checks.mjs`. The SVGs have not been viewed rendered.

## Facts for a reviewer

1. **Pass book (bank statement):** the bank's copy of a customer's account, listing deposits, withdrawals and the balance.
2. **Mirror treatment:** the firm treats the bank as a receiver of its money. A deposit is a debit in the bank column of the cash book and a credit in the pass book; a payment or withdrawal is a credit in the cash book and a debit in the pass book.
3. **Favourable balance** (money at the bank): a debit balance in the cash book and a credit balance in the pass book. **Overdraft:** a credit balance in the cash book and a debit balance in the pass book.
4. **Bank reconciliation statement:** a statement prepared on a date to reconcile the two balances; it is not an account, has no debit and credit sides and nothing is posted from it.
5. **Need:** finding the reasons for the difference, detecting errors and frauds, updating the cash book, checking the bank's work.
6. **Classification used (a teaching choice):** a timing difference is a transaction one book records in one period and the other in a later one, and it corrects itself; the chapter groups the causes as recorded by the firm first (two kinds of cheque) and recorded by the bank first (charges, interest on overdraft, interest allowed, direct deposits, payments on standing instruction, dividends or interest collected, dishonoured cheques); errors (cash book, bank) are kept separate. Some textbooks reserve "timing difference" for the cheque items only and list the bank-first items as "items not yet entered in the cash book"; the content of the list is the same.
7. **Cash book entries for bank-first items:** interest allowed, direct deposits and dividends or interest collected are debits in the bank column; bank charges, interest on overdraft, payments on standing instruction and dishonoured cheques are credits in the bank column.
8. **Cheques issued but not presented** (favourable cash book start): added; **cheques deposited but not collected:** deducted. Starting from the pass book every treatment reverses.
9. **Overdraft start:** the Add and Less treatment reverses again. With an overdraft as the starting balance, an item that makes the other book show a larger overdraft is added and one that makes it smaller is deducted. The statement prints "Overdraft as per ..." for the starting and ending lines in that case.
10. **Rule used for every item:** does it make the other book show a higher favourable balance? Favourable start: add if yes, deduct if no; overdraft start: reversed. The rule tables are computed from this.
11. **Negative result:** if the arithmetic from a favourable start gives a negative figure, it is reported as an overdraft of that amount as per the other book.
12. **Dishonoured cheque:** the bank debits the account on return; the firm credits the bank column and debits the customer, reviving the debt. Taught here although ch04 does not teach dishonour; no noting or bank charges for dishonour are taught.
13. **Amended (adjusted) cash book:** the bank column brought up to date for items the bank has recorded and the firm has not, shown as a two-sided account with "To" on the debit side and "By" on the credit side and "Balance c/d"; the statement then starts from the amended balance and shows only cheque timing differences and any bank error.
14. **Errors:** a cash book error is corrected in the cash book (so it does not appear in the statement once corrected, though the long item l5_cbod shows a short addition as a reconciling item when the statement starts from the uncorrected balance, which some textbooks do); a bank error stays in the statement until the bank corrects it and the firm makes no cash book entry. Unsure: which treatment of a cash book error the board prefers; both are shown.
15. **Statement layout:** heading with firm and date; "Balance as per cash book" or "Overdraft as per cash book" first; Add and Less groups; "Balance as per pass book" last. The two-column layout (item amounts in the first money column, subtotals and balances in the second) is a convention.
16. **Scope left out:** a pass book that carries opening items outstanding from the previous month, bank charges on dishonour, bills discounted, and the three-column cash book; all outside topics t01 and t02.
17. All firms, banks and people are imagined (Neel Traders, Sagar Bank and the named customers and suppliers); dates are 2026-27 and later and have no real-world meaning.

## Gaps

- The SVGs were placed by coordinates and checked by the label estimate only; they need a look rendered at 360 px.
- Competency tags changed during writing: m_direct_dep, m_standing, m_cb_issued and m_pb_dep were first tagged application and are now understanding, because each asks which entry or treatment follows from a stated rule without new multi-step working.
- No d5 items.
