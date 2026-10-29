# CBSE Class 12 Economics, Chapter 4 — Government Budget and the Economy

`cbse-12-economics-ch04` · release v1 · academic year 2026-27 · family `economics-commerce` (Part A: Introductory Macroeconomics) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) on the pattern of the CBSE 10 Social Science economics chapters (`cbse-10-social-science-ch19`) and CBSE 12 Economics ch02/ch03. Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-12-economics-ch04/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, word limits, narration rules, editorial counts and the answer-leak scan, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` if anything fails). Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (20 + 18 slides), notes (6 sections, 18 visuals), 30 flashcards, 68 questions (117 marks; 3 case-based items with 9 parts and 3 alternatives) |
| `tests.json` | `t_cbse12economics_ch04_short` (20 marks, 40 min) on `cbse-12-default-chapter-test-short` and `t_cbse12economics_ch04_long` (40 marks, 90 min) on `cbse-12-default-chapter-test-long`, item for item |
| `src/` | `lib.mjs` (builders, validation, SVG builder; same copy as ch01), `questions.mjs` (bank and the `deficits()` helper), `build.mjs` |

## Scope
All three syllabus topics: t01 meaning, objectives (reallocation incl. public goods, redistribution, stability, managing public enterprises) and components (15 items) · t02 classification of receipts (revenue: tax and non-tax; capital: borrowings and non-debt) and expenditure (revenue and capital), direct and indirect taxes (25) · t03 balanced, surplus and deficit budgets; revenue, fiscal and primary deficits and their implications (27, plus one item tagged t03 + t02). Plan/non-plan expenditure is **not** taught (no longer used); the notes' exam tips say so.

### Decks
- **Part 1** (20 slides): what a budget is, its two sides, the four objectives (public vs private goods table, redistribution flow, stability table), receipts tree, direct vs indirect taxes (two-column), non-tax revenue, capital receipts, expenditure tree. **Worked examples:** classifying seven receipts of the imagined state of Malwa and totalling revenue receipts (₹1,415 crore) and non-debt capital receipts (₹125 crore); classifying six items of central spending (incl. the grant-to-states trap). Four checks.
- **Part 2** (18 slides): balanced/surplus/deficit budgets and when each suits; revenue, fiscal and primary deficit, each with a theme-coloured SVG bar diagram of the imagined Government of Suryadesh; implications (dissaving, debt trap); "is a deficit always bad?"; ways to reduce deficits (FRBM Act 2003). **Worked examples:** the three deficits of Suryadesh with the check fiscal deficit = borrowings (RD 350, FD 700, PD 320); reading the deficits (FD 3.5% of GDP, RD 50% of FD, interest about 54% of FD). Four checks.
- 27 of 38 slides carry a visual (15 tables, 9 flows, 3 SVG); narration 7–77 words (mean 53), no symbols.

### Question bank (68 items)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 24 | 1 | objective-from-measure items, receipt and expenditure classification incl. loan repayment and grants to states, deficit meanings, a fiscal-deficit trap (total receipts include borrowing) |
| assertion-reason | 8 | 1 | keys a4 b2 c1 d1 |
| numerical | 6 (+ 3 inside cases) | 1–2 | revenue receipts, non-debt capital receipts, revenue / fiscal / primary deficit, interest from FD and PD; `value` + `unit` |
| true-false · fill-blank · match · ordering | 4 · 3 · 2 · 1 | 1 · 1 · 2 · 1 | ordering: steps from budget data to primary deficit |
| short | 7 + 5 | 2 / 3 | `word_limit` 30–50 / 50–80 (blueprint guidance) |
| long | 5 | 5 | `word_limit` 80–120; the Kaveripur computation (d4) and "is a fiscal deficit always harmful?" (d4) |
| case-based | 3 | 4 | receipts of the imagined state of Sahyagiri; two years of the imagined Narmadapur budget; the imagined Godavaripur canal-versus-salaries borrowing debate |

- Difficulty d1/d2/d3/d4 = 9/36/20/3. Competency: recall 6, understanding 22, application 23, analysis 15, evaluation 2 — **59% of items and 67% of marks at application or above** (lint band 45–65%). Four routine one-step items (a direct-tax pick, a capital-expenditure pick, interest paid as revenue expenditure, the non-debt receipts sum) are tagged understanding under the D-035 rule.
- MCQ keys a7 b6 c6 d5; T/F 2 true, 2 false.
- **Tests** are disjoint and use no deck-check item. Short = A 3 MCQ + 1 A-R; B 2 + 2 + 3 (the three-deficit computation); C one of two 5-mark; D the Sahyagiri case. Long = A 8 MCQ + 2 A-R; B 2 + 2 + (2|2) + 3 + (3|3); C the Kaveripur computation + (5|5); D Narmadapur and Godavaripur.

## Data and facts
- **Every figure is imagined and computed by the build** (`deficits()` in `questions.mjs`; assertions in both files stop the build if a figure drifts, including fiscal deficit = borrowings wherever borrowings are given): Suryadesh RR 1,900, TE 2,700, RD 350, FD 700, PD 320; Kaveripur RD 1,000, FD 2,500 (= borrowings), PD 900; Narmadapur Year 1 RD 300 / FD 800 / PD 400, Year 2 RD 100 / FD 700 / PD 200; Sahyagiri revenue receipts 1,670.
- **Facts stated (stable):** Indian financial year 1 April – 31 March; the Constitution calls the Union budget the "annual financial statement"; GST introduced in 2017; Fiscal Responsibility and Budget Management Act, 2003. No actual Union Budget figure, deficit target or ratio is stated.
- **Politically neutral:** each policy route is given with its benefit and a caution; the Godavaripur debate gives both sides.
- **Originality:** no NCERT example, table or exercise is reused; every scenario, table and passage is SOYL's own.

## Please double-check (reviewer)
1. **Grants to states** are classified as revenue expenditure of the Centre (the textbook convention) in an MCQ, an A-R item, the notes and a worked example.
2. **Interest received** is treated as non-tax revenue and **loan recovery** as a non-debt capital receipt; **loan repayment** by the government as capital expenditure.
3. The SVG bar labels are placed by coordinates and were not seen rendered; check the three diagrams at 360 px on staging.

## Gaps
- No KaTeX: formulas are in plain text, as in the SST chapters' lib, which refuses `$`.
- How a fiscal deficit is financed (market borrowing vs new money from the central bank) appears only under implications, in line with the topic list.
