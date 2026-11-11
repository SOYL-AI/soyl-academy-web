# ISC Class 11 Accounts, Chapter 5 — Cash Book

`isc-11-accounts-ch05` · release v1 · academic year 2026-27 · family `economics-commerce` (ISC Accountancy (858), Class XI, Unit 3: Journal, Ledger and Trial Balance) · provenance `human`, author `claude-sonnet-5-5 (subject-producer chapter writer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032, D-050) on the pattern of the CBSE 11 Accountancy cash book chapter (structure and helper style only) and the ISC presentation of `isc-12-accounts-ch01`. Built from `src/` (`npx tsx content/authored/economics-commerce/isc-11-accounts-ch05/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, the answer-leak scan, narration rules and editorial counts, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` if anything fails). Rebuilding is byte-identical. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (20 + 22 slides), notes (7 sections), 33 flashcards, 71 questions (138 marks) |
| `tests.json` | the short chapter test (20 marks, 50 min) on `isc-11-default-chapter-test-short` and the long one (40 marks, 100 min) on `isc-11-default-chapter-test-long`, item for item |
| `src/` | `lib.mjs` and `acc.mjs` (shared ISC 11 Accounts lib and engine, copied unchanged), `cb.mjs` (this chapter's cash book engine), `fig.mjs` (shared figures), `qq.mjs`, `questions.mjs`, `q_t01.mjs`, `q_t02.mjs`, `q_t03.mjs`, `q_t03w.mjs`, `q_t04.mjs` (the bank), `build.mjs` (decks, notes, cards, tests, extra gates) |

## Scope
All four syllabus topics of the ISC 2028 Class XI Accounts chapter:
- **t01** sub-division of the journal: purpose and advantages of subsidiary books; the books named (cash book, purchases, sales, purchases returns, sales returns, petty cash, bills books, journal proper). Chapter 6 teaches the others, so only classification of a transaction to its first book is examined — 9 items.
- **t02** simple (single column) cash book: format, recording, balancing, why the cash balance can never be a credit, posting to the ledger (debtor, creditor, expense) — 16 items.
- **t03** triple column cash book: discount, cash and bank columns; contra entries (deposit, withdrawal for office use); cheques deposited the same day, **not deposited the same day** (cash column first, contra entry on deposit) and dishonoured; discount columns totalled (not balanced) and posted to Discount Allowed and Discount Received; personal accounts with discount; bank overdraft as a credit balance (opening on the credit side, closing on the debit side), bank charges and interest — 33 items.
- **t04** a definite cash balance at the end of each day or period: the excess deposited, the shortfall withdrawn, contra entries, and an overdraft when the bank balance is too small — 13 items.
- Removed topic (transactions with GST in the cash book): none anywhere; the notes and the last tip line say GST is not examined.

### Decks
- **Part 1 (t01–t02), 20 slides, 16 with visuals:** why the journal is divided, advantages, the subsidiary books at a glance, classifying six transactions, the two roles of the cash book, simple format, rules, a month of Kundan Hardware (an imagined hardware shop), balancing, why cash is never a credit, posting, a debtor's and a creditor's account, slips, summary, tips. **Worked examples:** classification (Udaya Pens), the full June 2027 cash book (cash ₹10,200), Anil Rao's account (debit ₹8,600), Mehta Suppliers' account (credit ₹4,800). Three checks.
- **Part 2 (t03–t04), 22 slides, 18 with visuals:** three columns, discount allowed and received, contra entries, first entries, three cheque cases, a cheque not deposited the same day, dishonour, balancing, a month for Bhavna Electricals (cash ₹38,850, bank ₹29,080, discount allowed ₹550, received ₹1,200), discount posting, Rohit Jain's account with discount, overdraft, Wazir Cycle Mart (overdraft ₹26,850), a fixed cash balance, Pranav Bicycles over two days (deposit ₹18,000, withdrawal ₹9,000, overdraft ₹8,000), slips, summary, tips. **Worked examples:** five. Three checks.
- Visuals are tables and flows only. Narration up to 79 words (mean 61), entirely in words: no digits, rupee sign, symbols or abbreviations (the build enforces this). At most one slide in a row without a visual (the build asserts at most two).

### Question bank (71 items, 138 marks)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 20 | 1 | keys a5 b5 c5 d5; 3 are deck checks |
| assertion-reason | 6 | 1 | ISC options: keys a a a d c b (both false = d) |
| true-false · fill-blank | 5 · 5 | 1 | one blank per mark (two or three blanks in some) |
| numerical | 6 | 1 | closing cash, opening cash worked back, closing bank, overdraft, discount allowed total, deposit to keep a fixed balance; each solution has an "=" step |
| short | 11 | 2 | purpose of subsidiary books, advantages, roles of the cash book, a credit balance of cash, contra entry, discount columns, cheque kept then deposited, dishonour, overdraft sides, a fixed balance, overdraft by withdrawal |
| short | 11 | 3 | classify six transactions, simple cash book, two ledger accounts, triple column book, cheque entries, discount posting, a book starting with an overdraft, error finding, contra classification, one day with a fixed balance, two days with a fixed balance |
| long | 7 | 5 | simple cash book with a debtor posted; triple column book (basic); with an opening overdraft and a kept cheque; with a dishonoured cheque and the discount postings; with two personal accounts and discount postings; two days with a fixed balance; three days with a fixed balance, an overdraft and discount postings |

- By topic: t01 9, t02 16, t03 33, t04 13. Difficulty d1/d2/d3/d4/d5 = 9/28/24/9/1.
- Competency (as tagged in the first build; none retagged): recall 6, understanding 26, application 33, analysis 6 — **55% at application or above** (brief 45–60%, lint band 45–65%). Analysis items: cash credit balance (MCQ and short), three assertion-reason (discount columns, overdraft, fixed balance) and error finding.
- Written answers keep the full working in `answer.model_answer_md` (cash books and ledger accounts as Markdown tables generated by `cb.mjs` and `acc.mjs`); `solution_md` is a short method note. Every marking step is a whole number of marks and the steps add up to the item's marks (the build checks both). Distractors come from named wrong methods and are asserted different from the key.

### Tests (ISC class defaults, item for item; disjoint; no deck-check item; no numerical or case items)
- **Short (20 marks, 50 min):** A 4 MCQ (which book, closing cash, dishonoured cheque, deposit of excess) + 1 A-R (overdraft); B roles of the cash book + (discount columns | fixed cash balance meaning); C simple cash book + (triple column book | one day with a fixed balance); D triple column book of ten transactions.
- **Long (40 marks, 100 min):** A 10 MCQ + 2 A-R (discount columns, fixed balance); B purpose of subsidiary books, contra entry + (dishonour | overdraft by withdrawal); C classify six transactions, two ledger accounts, cheque entries + (a book with an opening overdraft | two days with a fixed balance); D triple column book with an overdraft and a kept cheque + (simple cash book with a debtor | two days with a fixed balance).
- **Blueprint fit:** the 2/3/5-mark defaults fit the chapter. Each test touches all four topics.

## Verifier record (what the build computes and asserts)
`src/cb.mjs` builds every cash book from a list of transactions and throws on any mismatch; decks, notes and answers are generated from its results, so no figure is typed twice.
- **Cash never negative:** the running cash balance is checked after every transaction (not only at the end), so a book that dips below nil in the middle is rejected.
- **Columns:** the cash and bank columns total the same on both sides after balancing; the discount columns are totalled and are not equal; the closing balances equal an independent sum from the transaction list.
- **Contra entries:** the deposit and withdrawal amounts agree on both sides.
- **Overdraft:** an opening overdraft appears on the credit side and a closing one is carried down on the debit side.
- **Posting:** the postings implied by a cash book (personal and nominal accounts plus the discount accounts) satisfy double entry; personal accounts are generated by `ledgerFromBook()` and close with c/d and b/d.
- **Definite balance:** `settle()` and `keepBalance()` compute the deposit or withdrawal for each day and assert the cash column equals the target afterwards; the bank balance after each day is asserted (including the overdraft).
- Key figures are pinned to hand-worked values (Kundan Hardware cash ₹10,200; Bhavna Electricals cash ₹38,850, bank ₹29,080; Wazir Cycle Mart cash ₹14,100, overdraft ₹26,850; Pranav Bicycles overdraft ₹8,000). Extra gates in `build.mjs`: TTS-safe narration; near-duplicate stems in the bank; test disjointness, no deck-check item in a test, and marks (20 and 40); at most two slides in a row without a visual.

## Flagged treatments (a reviewer should double-check)
- **Dishonoured cheque with discount:** no dishonoured cheque in the bank carries a discount, so the reversal of discount allowed is not tested; the amount is credited in the bank column against the customer and the customer is debited again.
- **Cheque not deposited the same day:** entered in the cash column on receipt, then a contra entry (bank debited, cash credited) on deposit, as the syllabus states. A cheque that is endorsed to a creditor is not covered.
- **Contra lines** are listed in date order on each side and are not aligned on the same row; both lines carry the same date. The triple column tables omit the L.F. column to keep 10 columns (the simple cash book with folios and the format table show it), and the text says contra entries are marked C.
- **Overdraft** is shown as a credit balance of the bank column, as the syllabus states; interest on the overdraft and bank charges are bank column payments.
- **Discount postings** use "To Sundries as per Cash Book" and "By Sundries as per Cash Book", and the personal accounts use "By Discount Allowed A/c" and "To Discount Received A/c".
- **Assertion-reason options** follow the CISCE Class XI Accountancy specimen wording and order: (d) is "Both Assertion and Reason are false".

## Originality
No ISC or CBSE textbook illustration, exercise or wording (including T.S. Grewal and D.K. Goel) and no CISCE specimen or board item is reused; official documents defined pattern and scope only. Every firm (Kundan Hardware, Bhavna Electricals, Wazir Cycle Mart, Pranav Bicycles, Udaya Pens and the firms in the bank), person and figure is imagined and labelled as such. The CBSE 11 Accountancy ch04 cash book chapter was read for structure only: its firms (Mohit Gadgets, Tanvi Boutique, Vikram Plastics, Nisha Footwear, Isha Handicrafts, Ritesh Auto Parts, Pallavi Books, Yamini Garments and the others), figures, dates and wording are not reused, and the petty cash book, trade books and GST of that chapter are left out. The sets of the earlier ISC 11 chapters (journal, ledger) and ISC 12 Accounts are not reused. Every stem names its own firm, account or concept.

## Gaps
- No case-based items; objective items carry the theory and written items the computation.
- No narration audio (TTS needs OA-03).
- Triple column cash books have 10 columns (12 in the format table); check them at 360 px on staging.
- Petty cash and the other subsidiary books are Chapter 6; bills books are named only.
