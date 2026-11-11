# ISC Class 11 Accounts, Chapter 6 — Petty Cash Book and Other Special Purpose Books

`isc-11-accounts-ch06` · release v1 · academic year 2026-27 · family `economics-commerce` (ISC Accountancy (858), Class XI, Unit 3: Journal, Ledger and Trial Balance) · provenance `human`, author `claude-sonnet-5-5 (subject-producer chapter writer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032, D-050) on the pattern of the CBSE 11 Accountancy special purpose books chapter (structure and helper style only) and ISC 12 Accounts ch01 / ISC 11 Accounts ch03–ch04 (presentation). Built from `src/` (`npx tsx content/authored/economics-commerce/isc-11-accounts-ch06/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, the answer-leak scan, narration rules and editorial counts, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` if anything fails). Rebuilding is byte-identical. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (21 + 21 slides), notes (7 sections), 32 flashcards, 79 questions (145 marks) |
| `tests.json` | `t_isc11accounts_ch06_short` (20 marks, 50 min) on `isc-11-default-chapter-test-short` and `t_isc11accounts_ch06_long` (40 marks, 100 min) on `isc-11-default-chapter-test-long`, item for item |
| `src/` | `lib.mjs` and `acc.mjs` (copied unchanged from the ISC 11 scratch lib and the CBSE 11 engine), `books.mjs` (chapter engine: petty cash, day books, dated ledger accounts, routing, all asserted), `fig.mjs` (the worked cases of the decks and notes), `qq.mjs` (registration with whole-mark scheme check), `q_t01`–`q_t04.mjs` (bank), `questions.mjs`, `build.mjs` (decks, notes, cards, tests, extra gates) |

## Scope
All four syllabus topics. The removed topic (transactions with GST in the returns books) is not taught; GST is mentioned in one line of the notes (section 1), as "not examined", and in the build's `checks` metadata. No slide, item or figure uses GST. The cash book (two-column and bank column) is Chapter 5 and is only named; the cash book appears here as "where cash transactions are recorded".
- **t01** analytical petty cash book on the imprest system: imprest, cash received, vouchers analysed by head (including split vouchers), balancing, reimbursement equal to the payments, restoring the float, posting of the column totals — 17 items.
- **t02** purchases and sales day books, simple and columnar: credit transactions in goods only, trade discount deducted (net entered), cash discount not entered, cash transactions and assets excluded, totals, posting to personal and goods accounts — 23 items.
- **t03** purchases return and sales return books, debit note (issued by the buyer) and credit note (issued by the seller), returns at net value, effect on the party accounts, net purchases and net sales — 19 items.
- **t04** journal proper (opening and closing entries, credit purchase and sale of assets, bad debts, goods withdrawn, lost or given as samples, insurance claim, rectification), sorting a month of mixed transactions into books, posting from the special books and the journal proper — 20 items.

### Decks
- **Part 1 (t01–t02), 21 slides, 17 with visuals:** why special books; the imprest system cycle; the analytical petty cash book; balancing and reimbursement; posting the column totals; what the purchases book records; format and trade discount; the columnar form; the sales book; posting the day books. **Worked examples (5):** Tanjore Brass Emporium weekly petty cash (imprest ₹2,000, payments ₹1,465, reimbursement ₹1,465); Bargarh Handloom House monthly petty cash with a split voucher (payments ₹4,085); Karaikudi Cycle Mart purchases book (net ₹1,14,700 after ₹12,800 trade discount); Haldia Fabric House columnar purchases book (₹2,28,500); Shillong Hardware Works sales book (₹1,13,000). Three checks.
- **Part 2 (t03–t04), 21 slides, 17 with visuals:** debit note against credit note; what a debit note shows; the returns books; effect on a supplier's account; the journal proper; sorting transactions; goods withdrawn, lost or given away; opening, closing and rectifying entries; posting from every book. **Worked examples (6 slides):** purchases return book (₹8,450); sales return book (₹8,100); net purchases ₹1,06,250 and net sales ₹1,04,900; assets on credit and a bad debt (Tezpur Paper Mart); a mixed month of twelve transactions in six books and the Ravi Timbers account (₹68,500 credit). Three checks.
- Narration up to 73 words (mean 54), entirely in words: no digits, rupee sign, symbols or abbreviations (the build enforces this). Every table in a deck is generated from the computed books and ledgers.

### Notes (7 sections)
Special books overall; petty cash and imprest; analytical petty cash book (format, balancing, posting); purchases and sales books simple and columnar; returns books and debit and credit notes; journal proper; posting from the special books. Each has key terms and a visual; exam tips give the usual split of ISC marks, step marks and common mistakes.

### Question bank (79 items)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 26 | 1 | keys a7 b7 c6 d6; 3 are deck checks |
| assertion-reason | 6 | 1 | keys a a c b d c (ISC specimen options; (d) = both false); no "A false, R true" item |
| numerical | 9 | 1 | petty cash balance and cash received, net of trade discount, purchases, sales and returns book totals, a customer's balance, capital in the opening entry, Purchases A/c after journal proper credits; 1 is a deck check |
| true-false · fill-blank | 5 · 5 | 1 | 3 false, 2 true; one of each is a deck check |
| short | 10 | 2 | imprest features, analytical form, excluded transactions, trade against cash discount, columnar uses, debit against credit note, reasons for returns, effect of a return, journal proper meaning, two entries |
| short | 11 | 3 | posting petty cash, petty cash for a month, simple purchases book, columnar sales book, customer account, purchases return book, sales return book, supplier account with returns, three journal proper entries, opening and closing entries, rectification |
| long | 7 | 5 | petty cash book for a month, two weeks of petty cash with reimbursement, columnar purchases book with posting, sales book with a customer account, both returns books with net purchases and sales, a mixed month sorted into books with journal proper entries and a supplier account, posting two books to a supplier account and the goods accounts |

- Difficulty d1/d2/d3/d4 = 6/33/29/11. Competency: recall 8, understanding 27, application 33, analysis 10, evaluation 1 — **56% at application or above** (lint band 45–65%). Tags were set from what each item demands; none was changed after the first build (six items, all MCQ, were later removed to bring the MCQ count down to 26; this left the share within the band).
- Written answers keep the full working in `answer.model_answer_md` (books, ledger accounts with c/d and b/d, journal tables); `solution_md` is a short method note. Every marking step is a whole number of marks and the steps add up to the item's marks (the build checks both). MCQ distractors come from a named wrong method, and each solution names a distractor by its value or text, never by position.

### Tests (ISC class defaults, item for item; disjoint; no deck-check item; no numerical or case-based items)
- **Short (20 marks, 50 min):** A 4 MCQ (reimbursement, net purchase, debit note, drawings entry) + 1 A-R (machine not in the purchases book); B imprest features + (debit against credit note | journal proper meaning); C purchases book + (purchases return book | three journal proper entries); D petty cash book for a month (`l5_pc_book`).
- **Long (40 marks, 100 min):** A 10 MCQ + 2 A-R spread over the four topics; B analytical form, excluded transactions + (effect of a return | drawings and samples entries); C petty cash posting, columnar sales book, sales return book + (supplier account | opening and closing entries); D sales book with a customer account + (both returns books | a mixed month into books).
- Each test spans all four topics. The 2/3/5-mark default fits this chapter well.

## Verifier record (what the build computes and asserts)
`src/books.mjs` and `src/acc.mjs` compute every amount and throw on any mismatch; deck, note and answer tables are generated from the results, so no figure is typed twice.
- **Petty cash:** analysis columns add up to the total payments; receipts (balance in hand plus cash received) equal payments plus balance; reimbursement equals the payments and restores the imprest; overspending is rejected; the posting summary balances.
- **Day books:** trade discount is a whole rupee on every line; list price less discount equals net; column totals add up to the book total; party totals equal the book total; the posting summary balances; a transaction list routed with `route()` is asserted to place every transaction in exactly one book.
- **Posting:** `Ledger.fromBook()` posts each invoice or note to its personal account and each column total to its goods account and asserts that both equal the book total; `fromJournal()` asserts that debits equal credits; every ledger closes with c/d and b/d (nominal accounts are shown as posted, not balanced).
- **Journal proper:** every entry balances (`journal()`); capital in the opening entry is assets less liabilities.
- Key figures pinned to hand-worked values: Tanjore Brass Emporium payments ₹1,465, balance ₹535, heads ₹350, ₹460, ₹205, ₹245, ₹205; Bargarh Handloom House ₹4,085 and ₹915; Karaikudi Cycle Mart purchases ₹1,14,700, returns ₹8,450, Vinayak Cycle Co. ₹82,950 credit; Haldia Fabric House ₹92,000, ₹58,000, ₹78,500; Shillong Hardware Works sales ₹1,13,000, returns ₹8,100, Jorhat Builders ₹71,600 debit; Kurnool Spice Mills ₹67,000, ₹73,800, ₹36,900; Silchar Furnishings purchases ₹81,000, Ravi Timbers ₹68,500 credit; Tezpur Paper Mart capital ₹2,65,000.
- Extra gates in `build.mjs`: TTS-safe narration; near-duplicate stems inside the bank; test disjointness, no deck-check item in a test, marks (20 and 40).

## Flagged treatments
- **Returns at net value:** a debit or credit note carries the same trade discount as the original invoice, so the returns books show the net value. The debit note is issued by the buyer and the credit note by the seller; each firm enters the return in its own book.
- **Petty cash posting:** each head account is debited with its column total and Cash is credited with the reimbursement, shown on the payment side of the cash book; no separate Petty Cash A/c line is posted for the reimbursement. The first handing over of the imprest is described, not worked.
- **Folios:** posting uses PB, SB, PRB, SRB and J with the page number in the ledger folio; the L.F. column of the day books is left blank in the tables.
- **Goods lost or given away:** credited to Purchases A/c at cost (the stock account is not used in these entries); an insurance claim admitted is debited as Insurance Claim A/c with only the unrecovered part as a loss.
- **Trial balance and final accounts** are Chapters 7 and 12–13; the closing entries to Trading A/c appear only as journal proper entries.

## Originality
No ISC or CBSE textbook illustration, exercise or wording (including T.S. Grewal and D.K. Goel) and no CISCE specimen or board item is reused; official documents defined pattern and scope only. Every firm (Tanjore Brass Emporium, Bargarh Handloom House, Karaikudi Cycle Mart, Haldia Fabric House, Shillong Hardware Works, Kurnool Spice Mills, Silchar Furnishings, Tezpur Paper Mart and the firms in the bank), person and figure is imagined and labelled as such. The CBSE 11 Accountancy special purpose books chapter (ch04) was read for structure only: none of its firms, figures, dates, tax columns or wording is reused, and its GST content is not carried over. ISC 11 chapters 3 and 4 were checked so that no firm name repeats; a checked search of every firm name against the other authored chapters is clean. The build's exact-stem pre-check against the whole bank is clean.

## Gaps
- No case-based items; objective items carry the theory and written items the computation.
- No narration audio (TTS needs OA-03).
- The nine-column petty cash table (receipts, date, particulars, voucher number, total and five heads) is wide; check it at 360 px on staging.
- The Kurnool Spice Mills columnar sales book is computed and asserted but is not used in a slide, note or item (the columnar sales form is taught through Chitradurga Crockery in the bank and the Shillong sales book); remove it from `fig.mjs` if the producer prefers.
- The sibling Chapter 5 (Cash Book) was being written in parallel; its stems are covered by the build's cross-chapter check only once it has a `release.json` or `release.wip.json`.
