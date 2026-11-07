# CBSE Class 11 Accountancy, Chapter 4: Recording of Transactions II: Special Purpose Books

`cbse-11-accountancy-ch04` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude (subject-producer)` · every item `status: "draft"`

Run `npx tsx content/authored/economics-commerce/cbse-11-accountancy-ch04/src/build.mjs` from `platform/`. The build checks schema, pipeline lint, verify checks, word limits, narration rules, the answer-leak scan, the exact-stem originality pre-check and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (19 + 21 slides; 15 + 16 visuals; 4 + 5 checks; 4 + 7 worked examples), notes (6 sections), 31 flashcards, 76 questions (145 marks) |
| `tests.json` | `_short` (20 marks, 40 min) and `_long` (40 marks, 90 min) on `cbse-11-default-chapter-test-short` / `-long`, disjoint, no deck-check item |
| `src/books.mjs` | this chapter's own helpers: `cashBook` (two-column), `pettyCash` (analytical, imprest), `tradeBook` (purchases, sales, purchases return, sales return with trade discount and CGST/SGST/IGST via `gst()`); each asserts its totals, and self-checks run on import |
| `src/` | also `figures.mjs` (computed, asserted figures), `qq.mjs`, `q_t01.mjs`, `q_t02.mjs`, `q_cases.mjs`, `questions.mjs`, `build.mjs`; uses the shared `../../cbse-11-accountancy-ch01/src/lib.mjs` and `acc.mjs` unchanged |

## Scope

| Topic | Coverage |
|---|---|
| t01 | Why special purpose books are kept; the cash book as both a book of original entry and a ledger; simple cash book; two-column cash book (cash and bank): contra entries marked C, cheques received and deposited, bank charges, overdraft as a credit balance in the bank column; petty cash book on the imprest system, analytical columns (postage, stationery, conveyance, cartage, sundries), reimbursement restoring the imprest |
| t02 | Purchases book and sales book (credit transactions in goods only, net of trade discount, tax columns); purchases return and sales return books with debit and credit notes; goods and services tax columns at an imagined rate stated in each problem; journal proper: opening entry, credit purchase or sale of assets, adjustment, rectification, transfer, goods taken for personal use, goods given as charity or free samples, goods lost by fire |

Worked firms (all imagined): Anvi Traders (June two-column cash book, July trade books), Kavya Stores (journal proper), plus the firms named in the items. Five original SVGs are included. No maps.

### Question bank (76)

26 mcq, 5 assertion-reason (verdicts b, a, d, c, a), 2 true-false, 2 fill-blank, 2 match, 2 ordering, 10 numerical (every value computed), 9 short 2-mark, 7 short 3-mark, 7 long 5-mark, 4 case-based (4 marks: 1 + 1 + 2, part (c) with an either/or). Competency: recall 9, understanding 24, application 39, analysis 4 (57% application or above). Difficulty: d1 13, d2 33, d3 25, d4 5. Topics: t01 42, t02 33, both 1.

### Tests

- Short (20 marks): A = m_contra_def, m_petty_reimb, m_pb_cash, ar_cash_nocredit; B = s2_contra, s2_pb_only, s3_petty_analysis; C = one of l5_cb2 / l5_petty; D = cb_radha.
- Long (40 marks): A = m_why_books, m_cb_side, m_od, m_bank_charges, m_td_nature, m_cn, m_jp_which, m_fire, ar_pb_discount, ar_cb_both; B = s2_why_books, s2_od, one of s2_dn_cn / s2_td, s3_simple_cb, one of s3_sb_gst / s3_rect; C = l5_cb_od, one of l5_returns / l5_journal; D = cb_wazir, cb_jayant.
- Deck checks (not in any test): m_contra_which, n_cb_cash, fb_cb, ord_imprest, m_dn, ar_sale_asset, mt_docs, n_pb_net, n_pr_total.

## How verified

Every figure computed with `acc.mjs` and `books.mjs` and asserted. `books.mjs` asserts that both cash book columns total equally after balancing, that the cash column never ends in a credit balance, that the bank balance is found twice (by column totals and by independent arithmetic) and carried down on the correct side, that contra entries appear on both sides, that petty cash analysis columns add up to the total payments, that receipts equal payments plus balance and that reimbursement restores the imprest, and that each trade book total equals the sum of its entries, the tax columns add up and every posting summary balances. Build prints `NO ERRORS` with `lint: 0 error(s), 0 warning(s)`; three builds give byte-identical `release.json` and `tests.json` and no `*.wip.json` remains; the near-duplicate scan and the SVG label overflow/overlap estimate are run with `checks.mjs` (results in the hand-off report). The SVGs have not been viewed rendered.

## Facts for a reviewer

1. **Special purpose books:** books kept for similar, frequent transactions (cash book, purchases book, sales book, returns books) so that work is divided, recording is faster and reference is easy; the ledger and trial balance are still needed.
2. **Cash book:** a book of original entry and also the cash account (and bank account) of the ledger; receipts debit side, payments credit side; no separate cash account is kept.
3. **Cash balance** is a debit balance or nil, never a credit balance.
4. **Contra entry:** a transaction affecting both the cash and the bank columns, entered on both sides and marked C (cash deposited into the bank; cash withdrawn from the bank for office use).
5. **Cheques:** a cheque received and deposited the same day is entered in the bank column; bank charges are entered on the payment side of the bank column. A cheque dishonour is not taught.
6. **Overdraft:** a credit balance in the bank column; carried down on the debit side and brought down on the credit side. Interest on the overdraft is not taught.
7. **Petty cash, imprest system:** a fixed float; reimbursement equals the amount spent so the float is restored; analytical columns (postage, stationery, conveyance, cartage, sundries) are a teaching choice of five heads.
8. **Purchases and sales books:** credit transactions in goods dealt in only; cash transactions go to the cash book and credit transactions in assets go to the journal proper; only the net amount after trade discount is entered; trade discount is not recorded as a separate account; cash discount is named only to contrast it with trade discount and is not accounted for.
9. **Debit note and credit note:** a debit note is sent by the buyer to the supplier on returning goods (source of the purchases return book); a credit note is sent by the seller to the customer on taking goods back (source of the sales return book). In some textbooks the note is prepared by the party named here; the chapter follows the common school convention.
10. **Dated note (as of 2024): goods and services tax.** Tax columns: CGST and SGST in equal halves for a supply within a state, IGST for a supply between states, computed on the net amount at an imagined rate stated in every problem (12% or 18%; chosen for whole rupees, not real rates). Tax on purchases is debited to Input CGST, SGST or IGST accounts; tax on sales is credited to Output accounts; the net tax payable is output less input. No cross-utilisation of credits is taught. Returns reverse the tax of the original supply at the same rate.
11. **Posting:** purchases book: Purchases and Input tax accounts debited, suppliers credited; sales book: customers debited, Sales and Output tax accounts credited; returns books reverse these.
12. **Journal proper:** the book for entries that fit no special book: opening entry (assets debited, liabilities credited, capital the difference), credit purchase or sale of assets, adjustment, rectification, transfer, goods taken by the proprietor for personal use (Drawings A/c debited, Purchases A/c credited), goods given as charity or free samples (Charity or Advertisement A/c debited, Purchases A/c credited), goods lost by fire (Loss by Fire A/c debited, Purchases A/c credited; no insurance claim assumed). Goods are credited at cost, to Purchases A/c, which is the common school treatment; some books credit Stock or Trading Account instead. Unsure: the board may prefer one of these; the chapter uses Purchases A/c throughout.
13. **Rectification** is taught for errors that do not affect the trial balance (a wrong account debited), with the corrected entry.
14. All firms and people are imagined. City or state names, if any, appear only as locations.

## Gaps

- The SVGs were placed by coordinates and checked by the label estimate only; they need a look rendered at 360 px.
- Only 5 items are d4 and none d5.
- Cheque dishonour, overdraft interest, cash discount accounting and the three-column cash book are outside this chapter's topics.
