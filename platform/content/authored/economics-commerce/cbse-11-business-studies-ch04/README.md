# CBSE Class 11 Business Studies, Chapter 4: Business Services

`cbse-11-business-studies-ch04` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human` · every item `status: "draft"`

Hand-authored to the CBSE 11 Business Studies standard (D-025, D-026, D-036). Build from `platform/`:
`npx tsx content/authored/economics-commerce/cbse-11-business-studies-ch04/src/build.mjs`. The build checks the schema, pipeline lint, deterministic verify, word limits, narration rules, the answer-leak scan, the exact-stem originality pre-check and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON. The shared library is `../cbse-11-business-studies-ch01/src/lib.mjs` (imported, never edited).

| File | What |
|---|---|
| `release.json` | 2 decks (22 + 22 slides), notes (6 sections), 33 flashcards, 76 questions |
| `tests.json` | `t_cbse11businessstudies_ch04_short` (20 marks, 40 min) and `_long` (40 marks, 90 min) on `cbse-11-default-chapter-test-short` / `-long`, disjoint, no deck-check item |
| `src/` | `questions.mjs`, `build.mjs` |

## Scope

| Topic | Coverage |
|---|---|
| t01 | Nature of services; types of banks (commercial: public, private, foreign; cooperative; specialised; central bank); functions of commercial banks (deposits, lending, cheques, remittance, allied services); e-banking channels, transfer systems, benefits, risks and security practice |
| t02 | Insurance as a contract; pooling of risk; seven principles with cases; life (kinds, guarantee), fire and marine (hull, cargo, freight) insurance; other types; regulator |
| t03 | Postal services (financial, mail), courier services; warehousing (meaning, five types, six functions, warehouse receipt, bonded warehouse) |

Decks: Part 1 (banking and e-banking; 4 checks, 2 worked examples: choosing a deposit, overdraft and discounting) and Part 2 (insurance, post and courier, warehousing; 4 checks, 3 worked examples: risk pooling, indemnity/contribution/subrogation, consolidation and financing). SVGs: tree of banks, functions-of-a-bank web, electronic payment flow, seven principles chart, warehouse functions web. No maps. No run of more than three slides without a visual.

Questions: 28 mcq, 6 assertion-reason, 4 true-false, 3 fill-blank, 4 match, 2 ordering, 10 short 2-mark, 7 short 3-mark, 7 long 5-mark, 5 case-based (all on imagined people and firms). Application or above: 54%. Difficulty: d1 2, d2 29, d3 35, d4 10. Topics: t01 38, t02 23, t03 15.

Tests: short = 3 mcq + 1 ar / 2x2-mark + 3-mark / one of two long / `cb_farida`. Long = 8 mcq + 2 ar / two 2-mark, one of two 2-mark, 3-mark, one of two 3-mark / long + one of two long / `cb_fire` + `cb_exporter`.

No real company, brand or person is used. Real institutions are named only for what they do: the Reserve Bank of India, the Insurance Regulatory and Development Authority of India (and, as distractors, the securities regulator, the Registrar of Companies and the small industries corporation). Payment systems are named for what they are; no rate, charge, limit or timing is stated.

## How verified

Build prints `NO ERRORS` with `lint: 0 error(s), 0 warning(s)`; `release.json` and `tests.json` are byte-identical across three builds (no `*.wip.json` left); `checks.mjs` reports 0 near-duplicate flags (76 stems against 40,424 others) and 0 SVG issues (5 figures). Narration is at most 66 words (mean 47). No tree-wide gates, git or e2e were run.

## Facts for a reviewer

All time-sensitive points are "as of 2024" in the content and should be re-checked against current practice.

1. Characteristics of a service: intangible, no inventory (cannot be stored), inseparable from production, customer involvement.
2. Types of banks: commercial (public sector, private sector, foreign), cooperative, specialised (foreign trade, agriculture, small industry; named only in general terms such as an imagined export-import bank), central bank. Reviewer: confirm the grouping suits the NCERT chapter.
3. Reserve Bank of India: banker to the government and to banks, and regulator of the banking system (no governor, policy or rate mentioned).
4. Deposits: current (traders, many transactions, usually no interest), savings (households, interest, restricted withdrawals), fixed (lump sum for a period), recurring (monthly instalment). "Usually" is used where banks may differ; no interest rate is quoted.
5. Lending: overdraft (beyond balance up to a limit, interest on the amount overdrawn), cash credit (draw against stock up to a limit), loan or advance (one sum, instalments), discounting of a bill of exchange (value less a deduction before due date). Imagined figures: overdraft limit Rs 50,000, balance Rs 10,000, cheques Rs 45,000, overdrawn Rs 35,000; bill Rs 1,20,000 less Rs 3,000 = Rs 1,17,000; recurring deposit Rs 2,000 x 12 = Rs 24,000 before interest.
6. Cheque (order to pay from an account), bank draft (bank-issued payment order), remittance, allied services (lockers, bill payment, collection of cheques).
7. Dated, as of 2024: e-banking channels (internet banking, mobile banking, automated teller machine, debit card, credit card). Debit card spends the holder's own balance; credit card spends the bank's money, repaid later.
8. Dated, as of 2024: National Electronic Funds Transfer (batch-wise), real time gross settlement (each payment settled individually at once, for large amounts), immediate payment service (instant transfer), unified payments interface (instant app payment from a linked account; launched 2016). Reviewer: confirm the wording; no minimum or maximum amounts, charges, timings or operating hours are stated, by design.
9. Benefits of e-banking (access at any hour, lower cost, convenience, record of transactions, less cash handling) and risks (fraud, phishing, stolen passwords, shared one time passwords); never share a one time password or secret code.
10. Insurance: a contract in which the insurer agrees, for a premium, to compensate a loss from a stated risk or pay a sum on a life event; pooling of risk. Imagined pool: 2,000 members x Rs 1,500 = Rs 30,00,000; 20 losses x Rs 1,00,000 = Rs 20,00,000; Rs 10,00,000 left for costs and reserves (simplified).
11. Seven principles: utmost good faith, insurable interest, indemnity (actual loss up to the sum insured, no profit; not for life insurance), proximate cause (nearest effective cause must be an insured risk), subrogation, contribution (shared in proportion to the sums covered), mitigation of loss. Computed figures: loss Rs 3,50,000 on a Rs 5,00,000 policy pays Rs 3,50,000; loss Rs 7,20,000 pays at most Rs 5,00,000; covers Rs 3,00,000 and Rs 2,00,000, loss Rs 2,50,000 shared Rs 1,50,000 and Rs 1,00,000; Rs 4,00,000 recovered by subrogation.
12. Life insurance: a contract of guarantee (sum fixed in advance); insurable interest needed at the time of the contract; kinds: whole life, endowment (on death or at the end of the term, whichever is earlier), joint life, annuity, children's. Reviewer: the "guarantee, not indemnity" classification follows the usual textbook treatment.
13. Fire insurance: indemnity; insurable interest at the time of the contract and of the loss; fire must be the proximate cause. Marine insurance: hull, cargo, freight; insurable interest at the time of the loss; indemnity.
14. Other types in one line each: health, motor, others (crops, accidents, liability).
15. Dated, as of 2024: the Insurance Regulatory and Development Authority of India as the regulator and developer of insurance. Reviewer: confirm.
16. Dated, as of 2024: postal services in general terms: financial (savings schemes, money transfer) and mail (parcel, registered, speed, insured post); courier services are private, door-to-door, fast, with tracking. Reviewer: confirm the current list of services.
17. Warehousing: storing goods from production until needed. Five types: private, public (licensed, open to all for a fee), bonded (imported goods until customs duty is paid), government, cooperative. Six functions: consolidation, break-bulk, stockpiling, value-added services (packing, grading, labelling), price stabilisation, financing through warehouse receipts. Imagined figures: lots of 400, 350 and 250 cartons = 1,000 (one full truck); stock Rs 6,00,000 with a loan of Rs 4,20,000 leaves Rs 1,80,000 not covered.
18. Dated, as of 2024: goods re-exported from a bonded warehouse generally leave without home-market duty; duty is postponed, not waived, for goods sold at home. Reviewer: confirm; no customs rates or procedures are stated.
19. Unsure or simplified: the ordering items (electronic transfer steps, borrowing against stored grain) follow common descriptions, not a statutory process; the pooling example ignores claims reserves and expenses; "usually no interest" on current accounts and "restricted withdrawals" on savings accounts are textbook generalisations.
