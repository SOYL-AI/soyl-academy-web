# CBSE Class 11 Accountancy, Chapter 2: Theory Base of Accounting

`cbse-11-accountancy-ch02` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Run `npx tsx content/authored/economics-commerce/cbse-11-accountancy-ch02/src/build.mjs` from `platform/`. The build checks schema, pipeline lint, verify checks, word limits, narration rules, the answer-leak scan, the exact-stem originality pre-check and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (19 + 21 slides; 15 + 16 visuals; 4 + 5 checks; 4 + 4 worked examples), notes (6 sections), 31 flashcards, 78 questions (153 marks) |
| `tests.json` | `_short` (20 marks, 40 min) and `_long` (40 marks, 90 min) on `cbse-11-default-chapter-test-short` / `-long`, disjoint, no deck-check item |
| `src/` | `figures.mjs` (computed, asserted figures), `qq.mjs`, `q_t01.mjs`, `q_t02.mjs`, `q_cases.mjs`, `questions.mjs`, `build.mjs`; uses the shared `../../cbse-11-accountancy-ch01/src/lib.mjs` and `acc.mjs` unchanged |

## Scope

| Topic | Coverage |
|---|---|
| t01 | GAAP; business entity, money measurement, going concern, accounting period, cost, dual aspect, revenue recognition, matching, full disclosure, consistency, conservatism, materiality, objectivity. Computations: accounting equation (Tara Stationers), cost versus market value (Kaveri Printers), matching for a month (Anjali Tailors), stock at the lower of cost and net realisable value (Sagar Electricals) |
| t02 | Cash and accrual bases (profit of Meghna Coaching Classes under both); accounting standards (meaning, need, benefits, ICAI and its Accounting Standards Board, Ind AS); GST (destination-based, CGST/SGST/UTGST/IGST, input tax credit, GSTIN, 1 July 2017) with an imagined rate stated in every problem (Dev Hardware) |

Four original SVGs: concepts web, cash versus accrual comparison, GST structure chart, input tax credit flow. No maps.

### Question bank (78)

26 mcq, 5 assertion-reason (verdicts a, b, d, c, a), 3 true-false, 2 fill-blank, 3 match, 2 ordering, 8 numerical (all values computed), 10 short 2-mark, 8 short 3-mark, 7 long 5-mark, 4 case-based (4 marks: 1 + 1 + 2, part (c) with an either/or). Competency: recall 12, understanding 20, application 39, analysis 7 (59% application or above). Difficulty: d1 17, d2 38, d3 21, d4 2. Topics: t01 44, t02 34.

### Tests

- Short (20 marks): A = m_gaap, m_cost, m_itc, ar_dual; B = s2_dual, s2_itc, s3_matching_rent; C = one of l5_concepts / l5_gst; D = cb_kiran.
- Long (40 marks): A = m_money, m_revrec, m_matching, m_consist, m_conserv, m_material, m_gstin, m_as_need, ar_itc, ar_material; B = s2_gaap, s2_entity, one of s2_cash_accr / s2_standards_two, s3_consist_material, one of s3_cost_judge / s3_standards; C = l5_conventions, one of l5_cash_accrual / l5_standards; D = cb_stock, cb_gst.
- Deck checks (not in any test): m_entity, tf_going, n_matching_np, fb_conserv, m_cash_basis, n_accrual_profit, m_icai, m_igst, n_itc_net.

## How verified

Every figure computed with `acc.mjs` (via `figures.mjs` and in the item files) and asserted: the accounting equation balances after every step, profit is found under both bases, stock is valued lot by lot, GST splits into equal CGST and SGST halves and the input credit set-off adds up. Build prints `NO ERRORS` with `lint: 0 error(s), 0 warning(s)`; three builds give byte-identical `release.json` and `tests.json` and no `*.wip.json` remains; the near-duplicate scan against 42,357 other stems reports 0 flags; the SVG label overflow/overlap estimate reports 0 issues on 4 figures. The SVGs have not been viewed rendered.

## Facts for a reviewer

1. **GAAP:** the rules, concepts and conventions accepted by accountants for recording transactions and preparing statements; purpose is uniformity and comparability. Concepts are basic assumptions; conventions are accepted customs and guidelines.
2. **Thirteen ideas taught:** business entity, money measurement, going concern, accounting period, cost (historical cost), dual aspect, revenue recognition (realisation), matching, full disclosure, consistency, conservatism (prudence), materiality, objectivity. The grouping in the web (what is recorded / how it is recorded / how it is reported) is a teaching device, not a textbook classification. The syllabus outcome names twelve of these; objectivity is added because the brief lists it. Whether objectivity is a concept or a convention varies by textbook; here it is taught among the concepts.
3. **Business entity:** the owner's personal payments from business cash are drawings (reduce cash and capital), not expenses.
4. **Cost concept:** assets stay at purchase price; later market rises are not recorded; land is used so that depreciation does not interfere.
5. **Dual aspect:** Assets = Liabilities + Capital after every transaction; the owner's personal use of cash lowers cash and capital; profit on a cash sale raises capital.
6. **Revenue recognition:** revenue when the sale is made (delivery); an advance received is a liability until delivery.
7. **Matching:** expenses of a period are set against its revenue; prepaid carried forward as an asset, outstanding added as a liability.
8. **Conservatism:** stock at the lower of cost and net realisable value, applied **item by item** (lot by lot) in every problem. Unsure: the accounting standard on inventories (AS 2 / Ind AS 2) also permits grouping similar items; the chapter does not discuss that and does not cite a standard number in student text.
9. **Materiality:** trivial items may be treated simply (expensed at once); significant items are shown separately.
10. **Cash and accrual bases:** cash basis records on cash movement; accrual basis records when earned or incurred. The accrual profit is found by adjusting revenue (less advance and arrears, plus amounts due) and expenses (less prepaid, plus outstanding).
11. **Accounting standards:** written statements of uniform accounting rules and policies; needs: comparability, reliability, fewer alternatives; benefits: uniform practice, trusted figures, easier audit, fair comparison.
12. **Dated note (as of 2024):** the Institute of Chartered Accountants of India issues accounting standards through its Accounting Standards Board, **set up in 1977** (year as commonly reported; please confirm). Notes and slides state this with "as of 2024".
13. **Dated note (as of 2024): Ind AS** are converged with International Financial Reporting Standards; **notified by the government in 2015** and **applicable from the 2016 financial year** to specified companies by conditions such as size (thresholds not given). The statutory route (Ministry of Corporate Affairs rules) is not named; please confirm the years.
14. **Dated note (as of 2024): GST** is an indirect, destination-based tax on supply of goods and services, **introduced on 1 July 2017**. Dual structure: CGST and SGST (UTGST in Union Territories) on intra-state supplies, IGST (collected by the Centre, shared with the destination state) on inter-state supplies. Unsure: UTGST applies to Union Territories without a legislature, while some with one (for example Delhi) levy SGST; the text says only "UTGST in Union Territories" and does not go into this.
15. **Input tax credit:** tax paid on purchases is set off against tax on sales; payable = output tax − input tax. In the worked examples CGST credit is set against CGST and SGST against SGST; the cross-utilisation rules (IGST credit first against IGST, then CGST, then SGST) are **not** taught and every problem avoids them.
16. **GSTIN:** 15 characters (two-digit state code, the taxpayer's PAN, an entity number, a default character and a check character), stated "as of 2024".
17. **No real GST rates are stated.** Every problem gives an imagined rate (5%, 12% or 18%, chosen only because they give whole rupees); intra-state tax divides equally into CGST and SGST.
18. All firms and people are imagined (Tara Stationers, Kaveri Printers, Anjali Tailors, Meghna Coaching Classes, Sagar Electricals, Dev Hardware, Kiran Cycle Mart, Lakshya Bags, Pragati Art Classes, Rahul Traders and others). Real city and state names appear only as locations in GST problems (Jaipur, Surat, Indore, Bhopal, Kochi, Chennai, Kota, Gwalior, Haryana, Rajasthan), with no real firm.

## Gaps

- The four SVGs were placed by coordinates and checked by the label estimate only; they need a look rendered at 360 px.
- Only 2 items are d4 and none d5; most items are d2 to d3.
- The syllabus lists no learning outcome for objectivity; it is included as a concept as the brief asks.
