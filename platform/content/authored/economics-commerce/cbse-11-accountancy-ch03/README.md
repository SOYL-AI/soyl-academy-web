# CBSE Class 11 Accountancy, Chapter 3: Recording of Transactions – I

`cbse-11-accountancy-ch03` · release v1 · academic year 2026-27 · family `economics-commerce` (Unit 2: Accounting Process) · provenance `human`, author `claude (subject-producer)` · every item `status: "draft"`

Run `npx tsx content/authored/economics-commerce/cbse-11-accountancy-ch03/src/build.mjs` from `platform/`. The build checks schema, pipeline lint, verify checks, word limits, narration rules, the answer-leak scan, the exact-stem originality pre-check, near-duplicate stems inside the bank, test disjointness and the editorial counts, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` on any error). Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (18 + 22 slides; 14 + 18 visuals; 4 + 4 checks; 3 + 5 worked examples), notes (6 sections), 34 flashcards, 78 questions (146 marks) with 12 passage children |
| `tests.json` | `_short` (20 marks, 40 min) on `cbse-11-default-chapter-test-short` and `_long` (40 marks, 90 min) on `cbse-11-default-chapter-test-long`; disjoint, no deck-check item, no numerical item |
| `src/` | `figures.mjs` (computed, asserted figures: Kavya Stores journal, ledgers and balances, Rohan Electricals equation, voucher), `qq.mjs` (registration and mark-scheme check), `q_obj.mjs`, `q_calc.mjs`, `q_cases.mjs`, `questions.mjs`, `build.mjs`; uses the shared `../../cbse-11-accountancy-ch01/src/lib.mjs` and `acc.mjs` unchanged |

## Scope

| Topic | Coverage |
|---|---|
| t01 | Business transaction (cash and credit); source documents (cash memo, invoice, receipt, pay-in-slip, cheque, debit note, credit note); vouchers (debit, credit, journal or transfer) and their contents; a debit voucher of Kavya Stores prepared from a rent receipt |
| t02 | Accounting equation, Assets = Liabilities + Capital; effect of seven kinds of transaction; Rohan Electricals over seven transactions (`equation()` table); capital roll-forward (Naveen Footwear) |
| t03 | Rules of debit and credit by the accounting equation approach (one slide on the traditional approach); journal format (date, particulars, L.F., debit, credit), narration, simple, compound and opening entries; ten transactions of Kavya Stores with input and output CGST and SGST at an imagined 12% |
| t04 | Ledger format with To and By; posting with folios; balancing with Balance c/d and b/d; meaning of debit and credit balances; the cash account of Kavya Stores; journal compared with ledger; the balances of all fifteen ledger accounts agreeing |

Four original SVGs (source document to ledger flow, rules chart, balance diagram of the equation, ledger T-format) and two flow diagrams. No maps.

### Decks
- **Part 1 (t01, t02), 18 slides:** transactions, documents (two tables), vouchers and a worked voucher, which voucher, accounting equation, effects, Rohan Electricals over seven transactions, how capital changes, Naveen Footwear capital, summary, tips. Checks: `m_doc_id`, `tf_voucher`, `n_equation_cap`, `m_eq_effect`.
- **Part 2 (t03, t04), 22 slides:** rules, rules in use, traditional approach, journal format, journalising steps, simple/compound/opening entries; Kavya Stores worked examples (opening entry and purchase with tax; rent, cash sale, credit sale; transactions 6 to 10); ledger format, posting, the cash account, balancing, journal against ledger, balances after posting; summary, tips. Checks: `m_rule_drawings`, `ord_journal_steps`, `n_cash_bal`, `fb_ledger`.
- Narration: at most 88 words (mean 57), amounts in words, no digits or symbols (the build enforces it).

### Question bank (78 items, 146 marks)

26 mcq, 5 assertion-reason (verdicts a, b, c, d, a), 3 true-false, 2 fill-blank, 2 match, 2 ordering, 10 numerical (every value a computed variable), 10 short 2-mark, 8 short 3-mark, 6 long 5-mark, 4 case-based (4 marks: 1 + 1 + 2, part (c) with an either/or). Long items: a ten-transaction journal (Tulsi Garments), posting and balancing three accounts (Tilak Bookstore), an eight-transaction equation table (Jaya Medical Store), a rules explanation, a journal with GST and net tax (Gopal Electricals), a document explanation. MCQ keys a 7, b 7, c 6, d 6.

Competency: recall 9, understanding 30, application 34, analysis 5 (50% application or above). Difficulty: d1 11, d2 37, d3 24, d4 6. Topics: t01 17, t02 13, t03 30, t04 18.

### Tests

- **Short (20 marks, 10 items):** A = `m_voucher_cash`, `m_eq_cap`, `m_balance_cd`, `ar_eq`; B = `s2_voucher`, `s2_rules`, `s3_journal4`; C = one of `l5_docs` / `l5_ledger`; D = `cb_gst_journal`.
- **Long (40 marks, 22 items):** A = `m_txn`, `m_invoice`, `m_debitnote`, `m_eq_loan`, `m_rule_income`, `m_compound`, `m_traditional`, `m_credit_bal`, `ar_voucher`, `ar_compound`; B = `s2_memo_invoice`, `s2_entry_error`, one of `s2_notes` / `s2_eq_effect`, `s3_eq3`, one of `s3_compound` / `s3_ledger4`; C = `l5_journal10`, one of `l5_equation8` / `l5_rules`; D = `cb_documents`, `cb_ledger`.
- Deck checks (in no test): `m_doc_id`, `tf_voucher`, `n_equation_cap`, `m_eq_effect`, `m_rule_drawings`, `ord_journal_steps`, `n_cash_bal`, `fb_ledger`.

## How verified

Every figure is computed with `acc.mjs` (through `figures.mjs` and beside each item) and asserted with `same()`: the accounting equation balances after every step (`equation()`), every journal entry balances (`journal()`, `jrnl()`), ledger totals agree and every ledger balance from the dated posting agrees with `post()` (`ledger()`, `postD()`), the fifteen Kavya Stores balances total the same on each side (`trialFromLedgers()`), the equation's cash equals the ledger's cash, and tax comes from `gst()` at a rate stated in the problem. Slide tables and model answers are generated from the computed objects. The build prints `NO ERRORS` with `lint: 0 error(s), 0 warning(s)`; three builds give byte-identical `release.json` and `tests.json` and no `*.wip.json` remains; the near-duplicate scan and the SVG label overflow/overlap estimate are run with the producer's `checks.mjs`. The SVGs have not been viewed rendered.

## Facts for a reviewer

1. **Business transaction:** an exchange of money or money's worth between the business and an outsider, measurable in money; cash transactions are settled at once, credit transactions later (they create a debtor or a creditor). A plan, an enquiry or a promise is not a transaction.
2. **Source documents:** cash memo (seller, cash sale), invoice or bill (seller, credit sale, with tax and amount due), receipt (person receiving money), pay-in-slip (bank deposit form with counterfoil), cheque (written order to a bank to pay a named person), debit note (sent by a buyer who returns goods; supplier's account debited), credit note (sent by the seller who accepts the return; buyer's account credited).
3. **Vouchers:** a voucher is a written document prepared from source documents to support an entry; contents: date, number, accounts debited and credited, amount, narration, signatures of preparer, checker and authoriser. Kinds: debit voucher (cash paid), credit voucher (cash received), journal or transfer voucher (no cash moves, such as a credit purchase, a return or an adjustment). Textbooks differ in the names used and in the voucher layout; please confirm against the prescribed textbook.
4. **Accounting equation:** Assets = Liabilities + Capital after every transaction; closing capital = opening capital + capital introduced + profit − drawings. On a sale the stock goes out at cost, so only the profit enters capital.
5. **Rules of debit and credit (equation approach):** debit increases in assets, expenses and losses, and drawings; credit increases in liabilities, capital, and revenues and gains; decreases are the opposite. Drawings are taught as a debit that reduces capital.
6. **Traditional approach (one slide, notes, one item):** personal (debit the receiver, credit the giver), real (debit what comes in, credit what goes out), nominal (debit expenses and losses, credit incomes and gains). Capital and drawings are listed as personal accounts on that slide.
7. **Journal format:** date, particulars (debit account with Dr., credit account on the next line with To), L.F., debit and credit amounts, narration in brackets (usually beginning with Being). The L.F. is filled in after posting.
8. **Entries:** simple (one debit, one credit), compound (more than one debit or credit), opening entry (assets debited; liabilities and capital credited; capital is the difference). The five journalising steps are a teaching sequence, not a board-prescribed list.
9. **Dated note (as of 2024), GST entries:** every problem states an imagined rate (5%, 12% or 18%, chosen only to give whole rupees) and an intra-state supply, so tax splits equally into CGST and SGST. On a purchase, Input CGST and Input SGST are debited beside Purchases and the supplier is credited with the invoice total; on a sale, Output CGST and Output SGST are credited beside Sales and cash or the debtor is debited with the invoice total. Input tax is described as a credit (an asset) and net tax payable as output less input, set off CGST against CGST and SGST against SGST only. IGST, cross-utilisation and reverse charge are not taught. Account names (Input CGST A/c and so on) are customary, not prescribed.
10. **Ledger:** debit side particulars begin with To, credit side with By; columns date, particulars, J.F., amount. Posting: each debit to the debit side of the account debited (naming the other account with To), each credit to the credit side (with By); when an entry has several accounts on the other side the particular reads Sundries. Journal folio (J.F.) in the ledger, ledger folio (L.F.) in the journal.
11. **Balancing:** total both sides, write the difference on the smaller side as Balance c/d, bring it down on the opposite side as Balance b/d. A debit balance means the debit side is larger (assets, expenses, losses, drawings, debtors); a credit balance means the credit side is larger (liabilities, capital, revenues, creditors).
12. **Journal and ledger:** the journal is the book of original entry (date order), the ledger the book of final entry (account by account); the ledger is prepared from the journal by posting.
13. **List of balances after posting:** the slide lists the fifteen Kavya Stores balances and shows the two sides total the same; it is not named a trial balance (that is a later chapter).
14. The Kavya Stores equation table (`KV_Q`) treats input tax as an asset ("Input GST") and output tax as a liability ("GST payable"); it is used only to check cash and totals, not shown to students.
15. All firms, towns and people are imagined (Kavya Stores, Mehta Paper Mart, Rohan Electricals, Naveen Footwear, Pradhan Tea House, Chandni Garments, Tanuja Fabrics, Tulsi Garments, Tilak Bookstore, Jaya Medical Store, Gopal Electricals, Anand Paper Works, Lalit Gift Gallery, Lakshmi Handlooms, Bhavna Boutique and others). The only real place names are Indore and Madhya Pradesh in one problem's location.

## Gaps

- The four SVGs were placed by coordinates and checked by the label estimate only; they need a look rendered at 360 px.
- Only 6 items are d4 and none d5; 5 items are tagged analysis.
- No narration audio (TTS needs OA-03).
