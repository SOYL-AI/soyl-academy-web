# CBSE Class 12 Accountancy, Chapter 5 — Dissolution of a Partnership Firm

`cbse-12-accountancy-ch05` · release v1 · academic year 2026-27 · family `economics-commerce` (Part A, Unit 1: Accounting for Partnership Firms) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) on the pattern of the CBSE 12 Economics and Accountancy ch01–ch04 chapters. Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-12-accountancy-ch05/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, narration rules, editorial counts and the answer-leak scan, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` if anything fails). Edit `src/`, not the JSON. Rebuilding is byte-identical.

| File | What |
|---|---|
| `release.json` | 2 decks (21 + 20 slides), notes (7 sections), 30 flashcards, 64 questions (142 marks) |
| `tests.json` | `t_cbse12accountancy_ch05_short` (20 marks, 40 min) on `cbse-12-accountancy-chapter-test-short` and `t_cbse12accountancy_ch05_long` (40 marks, 90 min) on `cbse-12-accountancy-chapter-test-long`, item for item |
| `src/` | `lib.mjs` (shared CBSE 12 economics-commerce builders, copied unchanged apart from its header), `acc.mjs` (accounting helpers: numbers and Indian-system words, fractions and shares, journal, ledger, balance sheet, columnar capital accounts closed through Bank, `realisation()` and a full `dissolve()` simulator), `questions.mjs` (bank), `build.mjs` (decks, notes, cards, tests) |

## Scope
Both syllabus topics (2026-27): **t01** dissolution of partnership vs dissolution of the firm; modes of dissolution by agreement (s. 40), compulsory (s. 41), on contingencies (s. 42), by notice in a partnership at will (s. 43) and by the court (s. 44, with its grounds) — 18 items. **t02** settlement of accounts under Section 48 (losses rule and order of payment), the Realisation Account (transfer of assets at gross book value with provisions credited, outside liabilities, sale of assets, assets taken over and liabilities assumed by partners, unrecorded assets and liabilities, creditors accepting assets in full or part settlement, discounts, realisation expenses borne by the firm or by a partner, paid by either, with or without remuneration to a partner), reserves and accumulated losses, partners' fixed and fluctuating capitals and current accounts, partners' loans, debit balances made good in cash, and a Bank/Cash Account closing at nil — 46 items.

**Excluded (removed for 2026-27):** piecemeal distribution, sale of the firm to a company and insolvency of partners. They appear once only, as a "Not in the 2026–27 syllabus" line in the notes' exam tips. Compulsory dissolution and contingencies are taught through their other cases (unlawful business; expiry of term, completion of venture, death), so insolvency is not presented as content anywhere else.

### Decks
- **Part 1** (21 slides): partnership vs firm (two paths), the five modes with sections, compulsory vs contingencies, notice and court grounds, Section 48 with an SVG payout bar, the Realisation Account format, what stays out of it, and the running imagined firm **Narmada Textiles, Jabalpur** (Asha, Bhavesh, Charu 3:2:1; balance sheet ₹3,74,000). **Worked examples (4):** partnership only or firm (four situations); naming the mode (four situations); Section 48 at an imagined Shimla bakery (claims ₹2,20,000, cash ₹2,10,000, loss ₹10,000, capitals paid ₹45,000 and ₹35,000); the two transfer entries for Narmada Textiles. Four checks (mcq, match, mcq, fill-blank).
- **Part 2** (20 slides): sale and payment entries, takeovers by partners, unrecorded items, creditors accepting assets, the five expense cases, closing the capital accounts. **Worked examples (6):** Narmada Textiles events, Realisation Account (profit ₹18,000: ₹9,000 / ₹6,000 / ₹3,000), capital accounts (Asha paid ₹1,16,000, Bhavesh ₹94,000, Charu brings in ₹19,000), Bank Account (₹3,22,000, closes at nil); unrecorded patent and bill with a creditor taking a computer; remuneration to a partner who pays the expenses himself. One SVG draws the two sides of the Realisation Account to scale, the profit as the balancing figure. Four checks (mcq × 3, numerical).
- 31 of 41 slides carry a visual (24 tables, 5 flows, 2 SVG; SVG geometry computed from the amounts and asserted); never more than 3 slides in a row without one. Narration ≤ 72 words (mean 51), TTS-safe: amounts in words generated from the computed values ("rupees one lakh sixteen thousand"), sections in words ("section forty-eight"), no digits, symbols or capitalised abbreviations.

### Question bank (64 items, 142 marks)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 20 | 1 | meaning, partnership-only events, compulsory, contingency, notice, court ground; Section 48, partner's loan, items kept out of Realisation, provision, reserve, P&L debit balance, takeover and assumed-liability entries, unrecorded asset, creditor accepting an asset, expenses paid by a partner, remuneration vs expenses (d4), debit balance, a computed realisation result |
| assertion-reason | 6 | 1 | keys a2 b1 c1 d2 |
| true-false · fill-blank · match | 4 · 3 · 2 | 1 · 1 · 2 | T/F 2 true, 2 false |
| numerical | 6 | 1–2 | realisation loss, creditors paid after an asset and a discount, debtors realised, cash brought in, final payment, share of loss |
| short | 10 | 3 | distinction, court grounds, modes in three cases, Section 48 rules, takeover entries, creditor settlements, remuneration with firm-paid expenses, unrecorded items, reserves/losses/loan entries, Bank Account with cash brought in |
| long | 7 + 6 | 4 / 6 | 4: modes, four situations (partnership or firm, which mode), Section 48 payout (loss ₹60,000), Realisation Account (loss ₹14,100), four mixed entries incl. a no-entry case, capital + Bank accounts from a finished Realisation Account, expenses in four cases (d4). 6: Surat (loss ₹27,000, partner loan, bank loan with interest, unrecorded bill); Puri fixed capitals with current accounts, P&L debit balance, Cash Account (loss ₹23,500); Bhubaneswar creditors taking stock plus cash, remuneration with firm-paid expenses, debit balance made good (loss ₹33,000); Satara full journal (loss ₹10,000); Indore profit ₹17,000 with creditors taken over by a partner, overdraft, unrecorded claim, expenses borne by a partner; Rajahmundry d5 with part takeover, discounts, a creditor taking furniture, remuneration and a ₹420 debit balance |

- Difficulty d1/d2/d3/d4/d5 = 6/25/27/5/1. Competency: recall 9, understanding 23, application 22, analysis 10 — **50% at application or above** (lint band 45–65%).
- MCQ keys a5 b5 c5 d5.
- **Tests** are disjoint and use no deck-check item. Short = A 3 MCQ + 1 A-R; B distinction + takeover entries; C Realisation Account | modes; D Surat | Puri. Long = A 6 MCQ + 2 A-R; B Section 48 rules, creditor settlements, remuneration + (court grounds | Bank Account); C Section 48 payout + (mixed entries | capital and Bank accounts); D Bhubaneswar + (Satara journal | Indore).

## Verifier record (what the build computes and asserts)
- **Every figure is computed** by `acc.mjs` from the givens and rendered into stems, tables, keys and model answers with Indian digit grouping; amounts must be whole rupees or the build throws. Percentages (discounts, part takeovers) go through `pctOf`, which also refuses fractions of a rupee.
- **`dissolve()`** simulates each full dissolution from its balance sheet and events and asserts: the opening balance sheet totals; every recorded asset is disposed of (sold, taken over, given to a creditor or worthless) and every outside liability is settled; the Realisation Account, every loan account and the Bank/Cash Account balance; every partner's capital account closes at nil (cash paid out or brought in); the Bank/Cash Account closes at nil. It also generates the full dissolution journal (each entry balanced) used in the Satara item and the transfer entries in Part 1.
- **Pinned results** (independently hand-checked): Narmada Textiles profit ₹18,000, bank ₹3,22,000; Surat loss ₹27,000, bank ₹2,65,000; Puri loss ₹23,500; Bhubaneswar loss ₹33,000, Lalit brings ₹1,200; Satara loss ₹10,000; Indore profit ₹17,000; Rajahmundry loss ₹22,480, bank ₹2,16,940; Section 48 example loss ₹60,000.
- Pipeline on this unit: `verify --authored` 64/64 pass, 0 flags; `originality --authored` 0 errors, 0 warnings (bank duplicates checked; no reference texts supplied, OA-16); lint 0 errors, 0 warnings.

## Originality
No NCERT illustration, exercise or wording and no CBSE sample/past-paper item is reused; they define the pattern only. Every firm (Narmada Textiles in Jabalpur, a Shimla bakery, and firms in Surat, Puri, Bhubaneswar, Satara, Indore, Rajahmundry, Varanasi, Nagpur, Erode, Howrah and others), every partner and every figure is SOYL's own and labelled imagined.

## For a reviewer to double-check
- **Bank loan with interest** (Surat) is debited to Realisation in full (principal plus interest), the usual treatment.
- **Creditors taken over by a partner at an agreed amount** (Indore): Realisation Dr, To Pankaj's Capital A/c with the agreed ₹48,000 against book creditors of ₹50,000.
- **Section 41** is described as dissolution by operation of law "for example when the business becomes unlawful", and Section 42 lists contingencies "such as" term, venture and death, to keep insolvency out of the content (see Scope); the Act's full lists are wider.
- **Debtors realised** row labels keep the asset's capitalised name ("By Bank A/c (Debtors realised)").
- **SVGs** place labels by pixel coordinates; check at 360 px on staging. Columnar capital tables (3 partners) are 8 columns wide and will scroll on a phone.

## Gaps
- No case-based items (optional per brief).
- Workmen Compensation and Investment Fluctuation Reserves on dissolution are not covered (treatment varies between texts; not named in the syllabus topic).
- Firm-to-partner loans (a loan given by the firm to a partner) and goodwill appearing in the books on dissolution are not illustrated.
