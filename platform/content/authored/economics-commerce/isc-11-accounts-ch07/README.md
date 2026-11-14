# ISC Class 11 Accounts, Chapter 7 — Trial Balance

`isc-11-accounts-ch07` · release v1 · academic year 2026-27 · family `economics-commerce` (ISC Accountancy (858), Class XI, Unit 3: Journal, Ledger and Trial Balance) · provenance `human`, author `claude-sonnet-5-5 (subject-producer chapter writer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032, D-050) on the pattern of the CBSE 11 Accountancy trial-balance chapter and the ISC 12 Accounts chapters. Built from `src/` (`npx tsx content/authored/economics-commerce/isc-11-accounts-ch07/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, the answer-leak scan, narration rules and editorial counts, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` if anything fails). Rebuilding is byte-identical. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (19 + 21 slides), notes (8 sections), 30 flashcards, 71 questions (139 marks) |
| `tests.json` | `t_isc11accounts_ch07_short` (20 marks, 50 min) on `isc-11-default-chapter-test-short` and `t_isc11accounts_ch07_long` (40 marks, 100 min) on `isc-11-default-chapter-test-long`, item for item |
| `src/` | `lib.mjs` (shared ISC 11 authoring lib, copied unchanged), `acc.mjs` (accounting engine, copied unchanged), `tb.mjs` (this chapter's engine), `fig.mjs` (worked-case figures), `qq.mjs`, `questions.mjs`, `q_t01.mjs`, `q_t02.mjs`, `build.mjs` |

## Scope
Both syllabus topics; the syllabus lists no removed topics for this chapter. GST is not touched (theory only in ISC Class XI), and rectification of errors is Chapter 14: here the errors are named, classified and shown to leave the totals equal, but no rectifying entry is written.
- **t01** (34 items) meaning, objectives, advantages and limitations; what agreement shows and does not show; the errors that keep the totals equal (omission, principle, commission, compensating), and the errors that disturb them (one-sided posting, unequal amounts, two debits, a credit posted twice).
- **t02** (37 items) the balance method: the side of each balance decided from its nature (assets, expenses, drawings, debtors, purchases, sales return, opening stock on the debit side; capital, liabilities, creditors, incomes, sales, purchases return, provisions, bank overdraft on the credit side), opening stock against closing stock (closing stock given as additional information is left out), reading the side from a ledger account, a missing capital as the balancing figure, a trial balance from ledger totals, and ledgers then the trial balance from a short set of transactions.

### Decks
- **Part 1 (t01), 19 slides, 15 with visuals, 3 worked examples, 3 checks:** place of the trial balance, meaning, objectives, sides of balances, Kasaragod Spice Traders (13 balances, total ₹11,05,500), advantages, what agreement does and does not show, the four hidden errors, Padmini Dry Fruits with four errors that leave the totals equal (omission, principle, commission, compensating; correct total ₹5,50,000), errors that disturb the totals, the one-sided receipt (₹60,000 gap), limitations.
- **Part 2 (t02), 21 slides, 17 with visuals, 8 slides in the worked-example layout (3 problems), 3 checks:** balance method, sides, items that cause confusion, Wardha Hosiery (side of each of 20 balances, closing stock left out, total ₹12,18,000), reading the side of a balance c/d, missing capital, Rohtak Sports Mart (capital ₹4,45,000), Palampur Woollens (ten transactions, Cash account, all ledger balances, trial balance ₹3,80,000), clues when the totals disagree.
- No more than one slide in a row without a visual. Narration up to 66 words (mean 48), entirely in words (the build enforces this).

### Question bank (71 items, 139 marks)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 21 | 1 | keys a5 b5 c6 d5; 3 are deck checks |
| assertion-reason | 6 | 1 | keys in bank order a c b a d c (ISC specimen options; (d) = both false) |
| true-false · fill-blank · numerical | 5 · 5 · 6 | 1 | one of each is a deck check (the numerical check is the missing-capital check) |
| short | 10 | 2 | meaning, purposes, advantages, two hidden errors, agreement limit, revealed against hidden, compensating example, sides of four balances, why closing stock is left out, balance method |
| short | 11 | 3 | three hidden errors, comment on "agreed so correct", five errors sorted, items on the wrong side, causes of a difference, advantages and limitation, trial balance from 12 balances, missing capital, six balances classified, ledger totals to trial balance, stock treatment |
| long | 7 | 5 | theory, five errors classified with the difference, trial balance with sides decided and closing stock left out, ledgers and trial balance from nine transactions, missing capital (17 balances), trial balance from 12 ledger totals, the full mixed case |

- Difficulty d1/d2/d3/d4/d5 = 10/24/28/8/1. Competency: recall 12, understanding 23, application 23, analysis 13 — **51% at application or above** (lint band 45–65%). Producer review changed one tag: the five-error long item `l5_errors` from evaluation to analysis (it classifies; it does not judge). The review also removed trial balance totals from that model answer that the stem does not give, reworded the provision for doubtful debts as an amount set aside (not a reserve) and corrected one flashcard (an omitted balance makes the other side higher).
- Written answers keep the full working in `answer.model_answer_md` (trial balances, ledger accounts and error tables as Markdown tables); `solution_md` is a short method note. Every marking step is a whole number of marks and the steps add up to the item's marks (the build checks both).

### Tests (ISC class defaults, item for item; disjoint; no deck-check item; no case-based or numerical items)
- **Short (20 marks, 50 min):** A 4 MCQ (purpose, omission, side of provision, missing capital) + 1 A-R; B meaning + (sides of four balances | revealed against hidden error); C trial balance from 12 balances + (three hidden errors | missing capital); D trial balance with sides decided and closing stock left out.
- **Long (40 marks, 100 min):** A 10 MCQ + 2 A-R (one-sided posting, drawings); B objectives, closing stock + (advantages | compensating example); C six balances classified, ledger totals to trial balance, comment on agreement + (five errors sorted | items on the wrong side); D ledgers and trial balance from transactions + (missing capital | five errors classified).
- Each test mixes t01 and t02 items. The 2/3/5-mark defaults fit this short chapter well.

## Verifier record (what the build computes and asserts)
`src/tb.mjs` and `src/acc.mjs` compute every amount, and every table in a slide, solution or model answer is generated from these results.
- **Trial balances:** every one is built by `trialBalance`/`trialFromLedgers` (through `fromBalances`, `withCapital` or the ledger postings) and the two totals are asserted equal; closing stock has no side and is returned as "outside".
- **Missing capital:** `withCapital` computes debits less other credits and asserts the capital is positive and that both totals then agree.
- **Error cases:** `errorCase` posts the correct entries and the erroneous ones (one-sided or unequal entries allowed) to ledgers, asserts that the totals are equal or unequal as the case claims, that at least one balance is wrong, and returns the exact difference and the higher side.
- **Journals and ledgers:** every journal entry has equal debits and credits; every ledger closes with a balance carried down and brought down on the right side.
- Key figures pinned in code: Kasaragod ₹11,05,500; Padmini correct total ₹5,50,000 (omission ₹5,28,000, compensating ₹5,59,000); gaps ₹60,000, ₹9,000, ₹24,000 and −₹50,000; Wardha ₹12,18,000; Rohtak capital ₹4,45,000; Palampur Cash ₹1,43,000 and total ₹3,80,000.
- Extra gates in `build.mjs`: TTS-safe narration; near-duplicate stems inside the bank; test disjointness, no deck-check item in a test, and marks (20 and 40); whole-number marking steps.

## Flagged treatments (double-check)
- **Closing stock:** left out of the trial balance when given as additional information; entered only if already recorded in the books (stated in `s3_stock`).
- **Bank overdraft** is placed on the credit side (liability); **drawings** and **bad debts** on the debit side; **discount allowed** (expense) debit and **discount received** (income) credit.
- **Wrong-side slips** change the gap by twice the amount (m_wrong_side, n_gap, s3_wrong_side, the clues slide).
- The "difference divisible by 9" clue for transposed digits is a rule of thumb and is stated as a clue only.
- Error classification follows the usual ISC text: a capital item treated as revenue is an error of principle; the right amount in a wrong personal account is commission.

## Originality
No ISC or CBSE textbook illustration, exercise or wording (including T.S. Grewal and D.K. Goel) and no CISCE specimen or board item is reused; official documents defined pattern and scope only. Every firm (Kasaragod Spice Traders, Padmini Dry Fruits, Wardha Hosiery, Rohtak Sports Mart, Palampur Woollens and the firms in the bank), person and figure is imagined and labelled as such. The CBSE 11 Accountancy chapter 6 firms, balance lists and figures (Kabir Traders, Naina Stores, Tara Footwear, Ritu Garments) were avoided, as were the firms of ISC 11 chapters 1 to 6 and ISC 12 Accounts; every firm name in the bank was grepped against all other authored releases and four clashes were renamed. Every stem names its own firm and figures.

## Gaps
- No case-based items; objective items carry the theory and written items the computation.
- No narration audio (TTS needs OA-03).
- The 20-row classification table of Wardha Hosiery and the six-column balances table of Palampur Woollens are wide or long; check them at 360 px on staging.
- Rectification of the errors named here is deferred to Chapter 14.
