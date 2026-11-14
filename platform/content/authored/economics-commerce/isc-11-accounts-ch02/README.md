# ISC Class 11 Accounts, Chapter 2 — Accounting Concepts, Basis of Accounting and Standards

`isc-11-accounts-ch02` · release v1 · academic year 2026-27 · family `economics-commerce` (ISC Accounts, Class XI, Unit 2: Accounting Concepts) · provenance `human`, author `claude-sonnet-5-5 (subject-producer chapter writer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032, D-050) on the pattern of the CBSE 11 Accountancy ch02 chapter (structure and helper style only) and the ISC presentation of `isc-12-accounts-ch01`. Built from `src/` (`npx tsx content/authored/economics-commerce/isc-11-accounts-ch02/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, the answer-leak scan, narration rules and editorial counts, then writes `release.json` and `tests.json` (or parks them as `*.wip.json`). Rebuilding is byte-identical. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (20 + 19 slides), notes (7 sections), 34 flashcards, 75 questions (142 marks) |
| `tests.json` | `t_isc11accounts_ch02_short` (20 marks, 50 min) on `isc-11-default-chapter-test-short` and `t_isc11accounts_ch02_long` (40 marks, 100 min) on `isc-11-default-chapter-test-long`, item for item |
| `src/` | `lib.mjs` and `acc.mjs` (shared copies, unchanged), `fig.mjs` (computed figures, `basis()` engine for cash and accrual profit, stock at lower of cost and NRV, accounting equation), `qq.mjs` (registration, whole-mark steps), `q_t01`–`q_t04.mjs` (bank), `questions.mjs`, `build.mjs` |

## Scope
All four syllabus topics; no removed topics; no GST transactions (none is needed in this chapter).
- **t01** GAAP I: going concern, entity, money measurement, accounting period, historical cost, dual aspect, accrual; the equation effect of transactions — 20 items.
- **t02** GAAP II: revenue recognition, matching, full disclosure, verifiable objectivity, materiality, consistency, prudence, timeliness, industry practice, substance over legal form; identifying a principle followed or violated; stock at the lower of cost and net realisable value — 21 items.
- **t03** cash and accrual bases: adjustments for advance, arrears, accrued income, prepaid, last-year and outstanding items; profit on both bases and their reconciliation — 19 items.
- **t04** accounting standards (meaning, need, advantages, limitations) and IFRS (meaning, objectives, benefits of convergence) — 15 items. General facts only: no standard numbers, dates or rates.

### Decks
- **Part 1 (t01, t02), 20 slides, 17 with visuals, 4 worked examples, 3 checks:** a concept map (SVG), GAAP, entity/money/going concern, period and cost, Kalahandi Millet Mart (godown at cost, rise of ₹4,00,000), dual aspect and Lunglei Bamboo Works (seven transactions, assets ₹2,58,000, capital ₹1,98,000), accrual, revenue recognition and matching, Theni Banana Chips (profit ₹60,000), disclosure/objectivity/materiality, consistency/timeliness/industry practice, prudence/substance, Ghatsila Appliances stock (₹1,27,000 at cost, ₹1,14,000 valued), which principle applies.
- **Part 2 (t03, t04), 19 slides, 16 with visuals, 3 worked examples, 3 checks:** two bases, the same event on both, the four adjustments, Pakyong Tuition Hub (cash profit ₹1,80,000, accrual ₹1,58,000), the adjustment table, Dibang Agencies (₹14,000 and ₹11,000), the reconciliation of the two profits, standards (meaning, need, advantages and limits), who issues, IFRS and convergence.
- Narration up to 77 words (mean 60), words only (the build enforces this).

### Question bank (75 items, 142 marks)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 22 | 1 | keys a6 b5 c6 d5; 2 are deck checks |
| assertion-reason | 6 | 1 | keys a2 b2 c1 d1 (ISC specimen options; (d) = both false) |
| true-false | 5 | 1 | 1 true, 4 false |
| fill-blank | 5 | 1 per blank | entity, stock valuation, basis, standards, IFRS |
| numerical | 8 | 1 | capital, gain on a sale, matching profit, lower of cost and NRV, cash profit, accrual profit, wages, commission |
| short | 11 | 2 | |
| short | 11 | 3 | |
| long | 7 | 5 | equation table; identify five principles; matching with stock; cash and accrual statement; reconciliation; standards; IFRS |

- Deck checks (used in neither test): `m_entity`, `tf_going`, `n_matching_profit` (part 1); `m_cash_basis`, `n_accrual_profit`, `fb_standards` (part 2).
- Difficulty d1/d2/d3/d4/d5 = 13/34/22/5/1 (after the first build `l5_identify` and `n_matching_profit` were raised from d3 to d4, since each needs several independent steps; no competency was changed). Competency: recall 8, understanding 23, application 31, analysis 12, evaluation 1 — **59% at application or above** (brief 45–60%).
- Written answers keep the full working in `answer.model_answer_md` (tables generated from the data); `solution_md` is a short method note. Every marking step is a whole number of marks and the steps add up to the item's marks (the build checks both).

### Tests (ISC Class 11 defaults, item for item; disjoint; no deck-check item; no numerical or case-based item)
- **Short (20 marks, 50 min):** A `m_gaap`, `m_prudence`, `m_prepaid`, `m_as_need` + `ar_revrec`; B `s2_entity_fee` + (`s2_adv_arrears` | `s2_ifrs`); C `s3_revrec` + (`s3_accrual_expenses` | `s3_convergence`); D `l5_cash_accrual`.
- **Long (40 marks, 100 min):** A 10 MCQ (`m_going`, `m_hcost`, `m_accrual`, `m_revrec`, `m_substance`, `m_disclosure`, `m_accrual_year`, `m_same_both`, `m_ifrs_meaning`, `m_convergence`) + `ar_dual`, `ar_outstanding`; B `s2_going`, `s2_materiality` + (`s2_rent_year` | `s2_as_meaning`); C `s3_dual`, `s3_prudence`, `s3_diff_bases` + (`s3_as_limits` | `s3_accrual_income`); D `l5_identify` + (`l5_reconcile` | `l5_ifrs`).

## Verifier record (what the build computes and asserts)
- **Accounting equation:** assets equal liabilities plus capital after every transaction; no asset goes negative.
- **Stock:** lower of cost and NRV line by line, never above either; write-down asserted equal to the profit difference.
- **Cash and accrual bases (`basis()`):** every accrual figure is built from the cash figure plus additions less deductions; the difference between the profits is asserted equal to the net adjustments to revenue less those to expenses; the reconciliation reaches the accrual profit.
- Key figures are pinned to hand-worked values (Lunglei ₹2,58,000 and ₹1,98,000; Theni ₹60,000; Ghatsila ₹1,14,000; Pakyong ₹1,80,000, ₹5,05,000, ₹3,47,000, ₹1,58,000; Rudrapur ₹1,80,000 and ₹1,85,000; Sirmaur ₹1,40,600 and ₹1,44,200; Bhimtal ₹1,30,000 and ₹1,45,000 at cost).
- Extra gates in `build.mjs`: TTS-safe narration; near-duplicate stems inside the bank; test disjointness, no deck-check item in a test, marks (20 and 40).

## Flagged treatments (for the reviewer)
- **Industry practice** is shown through a dealer in an exchange-traded metal valuing stock at the day's price (`m_industry`, a deck table). It is a standard textbook-style example of a trade practice, but it departs from the lower-of-cost-and-NRV rule; the item states that the trade does it.
- **Timeliness** and **industry practice** are treated as principles in their own right (the syllabus names them) with a one-line meaning each; textbook treatments vary.
- **Substance over legal form** is illustrated by hire purchase (asset and liability of the user from the first day).
- **IFRS issuer** (International Accounting Standards Board) and **Indian standards body** (Institute of Chartered Accountants of India) are the only named bodies; no standard numbers, dates, adoption years or tax rates appear, as the brief required.
- **Prudence vs matching:** `ar_prudence`, `l5_matching_stock` show both together; stock at the lower of cost and NRV is applied line by line.

## Originality
No textbook illustration, exercise or wording (T.S. Grewal, D.K. Goel) and no CISCE specimen or past-paper item is reused; official material defined pattern and scope only. Every firm (Lunglei Bamboo Works, Kalahandi Millet Mart, Theni Banana Chips, Ghatsila Appliances, Pakyong Tuition Hub, Dibang Agencies, Rudrapur Coaching Point, Sirmaur Photo Lab, Bhimtal Candles and the firms in the bank), person and figure is imagined. The CBSE 11 Theory Base of Accounting set-ups (Tara Stationers, Kaveri Printers, Anjali Tailors, Meghna Coaching Classes, Sagar Electricals, Jiya Yoga Studio, Nilam Tutorials, Rishi Photo Studio, the GST cases) were avoided, as were its figures. The build's exact-stem pre-check against the whole bank is clean.

## Known gaps
- No case-based items (not in the ISC pattern for this blueprint). The 6-mark practice-only items of ISC 12 are not needed here.
- Item-level review by an independent content-verifier is still to be done (5% sample).
