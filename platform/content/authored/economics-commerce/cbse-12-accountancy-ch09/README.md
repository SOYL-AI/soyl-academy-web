# CBSE Class 12 Accountancy, Chapter 9 — Analysis of Financial Statements

`cbse-12-accountancy-ch09` · release v1 · academic year 2026-27 · family `economics-commerce` (Unit 3: Analysis of Financial Statements) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) on the pattern of the CBSE 12 Economics and Accountancy chapters. Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-12-accountancy-ch09/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, narration rules, editorial counts and the answer-leak scan, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` if anything fails). Edit `src/`, not the JSON. Rebuilding is byte-identical.

| File | What |
|---|---|
| `release.json` | 2 decks (21 + 18 slides), notes (8 sections), 30 flashcards, 70 questions (154 marks) |
| `tests.json` | `t_cbse12accountancy_ch09_short` (20 marks, 40 min) on `cbse-12-accountancy-chapter-test-short` and `t_cbse12accountancy_ch09_long` (40 marks, 90 min) on `cbse-12-accountancy-chapter-test-long`, item for item |
| `src/` | `lib.mjs` (shared CBSE 12 economics-commerce builders, copied unchanged apart from its header), `acc.mjs` (two-column Statement of Profit and Loss and Schedule III balance sheet models; comparative and common-size builders; integer two-decimal rounding; Indian-system number words for narration), `questions.mjs` (bank), `build.mjs` (decks, SVG charts, notes, cards, tests) |

## Scope
All three syllabus topics (2026-27): **t01** meaning, kinds (horizontal/vertical, intra-/inter-firm, internal/external), significance to users, objectives, limitations; the four tools (comparative and common-size statements in full; ratio analysis and the cash flow statement named only, chapters 10 and 11) (21 items) · **t02** comparative Statement of Profit and Loss and comparative Balance Sheet on Schedule III heads, absolute and percentage change, reading sources against uses (21 items) · **t03** common-size Statement of Profit and Loss (% of revenue from operations) and common-size Balance Sheet (% of the balance sheet total), the rounding rule, inter-firm comparison and interpretation (25 items; 3 more span t02/t03 or all three).

**Removed for 2026-27:** exceptional and extraordinary items and discontinued operations appear only as one "not in the 2026–27 syllabus" line in notes section 5; every Statement of Profit and Loss goes straight from total expenses to profit before tax. Changes in inventories are supported by the model but not used, to avoid a percentage change on a negative base.

### Decks
- **Part 1** (21 slides): meaning and process, users, objectives, tools, limitations, the comparative format and steps, the comparative balance sheet. **Worked examples (5 slides):** a single figure in isolation — **Sone Valley Biscuits Ltd, Dehri** (profit +25.00% but margin 10.00% → 8.00%); comparative Statement of Profit and Loss of **Shipra Fabrics Ltd, Ujjain** (revenue +30.00%, expenses +31.89%, profit after tax +18.00%) with an SVG grouped bar chart; comparative balance sheet of **Zuari Agro Tools Ltd, Margao** (+21.25%) with a sources-and-uses table computed from head totals. Five checks.
- **Part 2** (18 slides): meaning and base, the common-size formats, rounding, comparative vs common-size, signals for interpretation. **Worked examples (5 slides):** common-size Statement of Profit and Loss of **Kabini Coffee Curing Ltd, Mysuru** (margin 18.75% → 16.50%) with an SVG chart of shares; common-size balance sheet of **Barak Bamboo Crafts Ltd, Silchar** with an SVG 100% stacked bar of financing (shareholders' funds 65.00% → 75.00%); inter-firm comparison of **Rapti Dairy** and **Gomti Dairy** (12.00% vs 15.75%). The rounding slide shows **Vellar Traders** (assets 66.67 + 16.67 + 16.67 = 100.01 → property, plant and equipment shown at 66.66 †). Four checks.
- 28 of 39 slides carry a visual (19 tables, 6 flows, 3 SVG charts); never more than 3 slides in a row without one. Narration ≤ 65 words (mean 46), TTS-safe: amounts and percentages spoken in words generated from the computed values ("twenty-one point two five per cent"), "Schedule Three", no digits, symbols or capitalised abbreviations.

### Question bank (70 items, 154 marks)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 19 | 1 | meaning, lender, inter-firm, vertical/horizontal, two limitation cases, non-tool; base of percentage change, a change, a decrease, revenue +20% vs expenses +28%, totals change equally; common-size bases, a share, a rising materials share, total income above 100, firms of different size |
| assertion-reason | 7 | 1 | keys a2 b1 c2 d2 |
| true-false · fill-blank · match | 5 · 4 · 3 | 1 · 1 · 2 | T/F 3 true, 2 false; matches: tools, purposes (user questions), bases |
| numerical | 8 | 2 | percentage change (exact and rounded 16.67), change in profit after tax, earlier-year figure from a change, common-size shares, profit after tax share from shares, balance sheet total from a share |
| short | 11 | 3 | objectives, limitations (case), users (case), horizontal vs vertical, comparative vs common-size; comparative statements (Kalindi, expenses as % of revenue; Tons balance sheet); common-size (Rihand; Manjira); interpretation of a given comparative (Girna) and common-size (Alaknanda) statement |
| long | 7 + 6 | 4 / 6 | 4: tools; comparative Statement of Profit and Loss (Hemavati, profit falls 8.00%); completing a statement from percentage changes (Purna); comparative balance sheet (Betwa); common-size Statement of Profit and Loss (Ghaghara); common-size balance sheet with a rounding adjustment (Penna); evaluation of a director's claim (Bhadra). 6: theory; comparative balance sheet with financing observations (Teesta); comparative Statement of Profit and Loss with interpretation (Subarnarekha, +41.20%); common-size balance sheet with comments (Gandak); common-size Statement of Profit and Loss with interpretation (Kharun); inter-firm common-size comparison (Manair vs Vamsadhara Tiles) |

- Difficulty d1/d2/d3/d4 = 10/28/17/15. Competency: recall 7, understanding 23, application 24, analysis 15, evaluation 1 — **57% at application or above** (lint band 45–65%).
- MCQ keys a5 b5 c4 d5.
- **Tests** are disjoint and use no deck-check item. Short = A 3 MCQ + 1 A-R; B Kalindi comparative + comparative vs common-size; C Betwa comparative balance sheet | Ghaghara common-size; D Subarnarekha comparative with interpretation | Gandak common-size balance sheet with comments. Long = A 6 MCQ + 2 A-R; B objectives, Tons, Rihand + (Girna | Alaknanda interpretation); C Hemavati + (Penna | Bhadra evaluation); D Teesta + (Kharun | Manair–Vamsadhara).

## Verifier record (what the build computes and asserts)
- **Statements:** every statement is a `plStatement` or `bsStatement` built from its givens. Total income, total expenses, profit before tax, tax (whole rupees at the stated rate) and profit after tax are computed and re-added in each column; balance sheet head and part totals are computed and equity and liabilities must equal assets on both dates. Stem tables are rendered from the same objects.
- **Comparative:** absolute change = later − earlier for every line; percentage change = change ÷ earlier × 100, only on a positive earlier figure; the changes of every total re-add from their components; both balance sheet totals change by the same amount; each percentage is cross-checked against a floating-point recomputation.
- **Rounding rule (stated in notes, deck and answers):** percentages are computed in integer hundredths of a per cent and rounded to two decimals, halves away from zero. In a common-size balance sheet, each part of each column must total 100.00: if the rounded lines come to 99.99 or 100.01, the line with the largest rounding error (ties: the larger amount) is moved by 0.01 and marked †, and the build asserts that no line ends more than 0.01 from its exact value. This happens once in the bank (Penna, reserves and surplus 16.66 †) and once in the deck (Vellar). In a common-size Statement of Profit and Loss every subtotal is rounded directly and the build throws unless total income, total expenses, profit before tax and profit after tax still re-add in the rounded figures (they do for every statement used).
- **Pinned to hand-worked values:** every statement's key results (for example Shipra profit after tax ₹12,39,000 and +18.00%, total expenses +31.89%; Kalindi +11.30%; Hemavati −8.00%; Purna +11.43%; Girna profit before tax −15.25%; Teesta +17.24%, shareholders' funds +29.17%; Kabini 18.75% → 16.50%; Kharun 12.60% → 14.00%; Manair 15.00% vs Vamsadhara 12.00%; Gandak shareholders' funds 60.00% → 55.00%), and every figure a sentence states in words ("by a quarter", "four times bigger", "less than half the rate", "each grew by").
- Bank near-duplicate pre-check (5-gram Jaccard over stems, as in stage 6) against all 9,876 authored and exemplar questions: no pair involving this unit at 0.4 or above.

## Originality
No NCERT illustration, exercise or wording and no CBSE sample/past-paper item is reused; they define the pattern only. Every company (Sone Valley Biscuits, Shipra Fabrics, Zuari Agro Tools, Kabini Coffee Curing, Barak Bamboo Crafts, Vellar Traders, Rapti and Gomti Dairy, Kalindi Pickles, Tons Fruit Products, Girna Plastics, Hemavati Silk Mills, Purna Pulses, Betwa Cement, Teesta Packaging, Subarnarekha Steel Wires, Rihand Power Cables, Manjira Seeds, Alaknanda Herbal Products, Ghaghara Rice Mills, Penna Granite, Bhadra Steel Castings, Gandak Sugar, Kharun Paper Mills, Manair and Vamsadhara Tiles and others) and every figure is SOYL's own and labelled imagined.

## For a reviewer to double-check
- **Rounding adjustment (†).** CBSE answers usually just round each line; the explicit 0.01 adjustment so that each part totals 100.00 is SOYL's stated rule, and the marking scheme of `l4_csbs_penna` gives it 1 mark. If reviewers prefer plain rounding with a "difference due to rounding" note, change `commonSize()` in `acc.mjs` and rebuild.
- **Common-size Statement of Profit and Loss** uses revenue from operations as the base for every line, including other income (so total income exceeds 100), as in the board's practice.
- Comparative statements show a fall in brackets in both change columns; a percentage change is shown only on a positive earlier figure.
- Balance sheets are given at sub-head level (notes to accounts are not repeated; they belong to chapter 8). Five-column tables should be checked at 360 px on staging.

## Gaps
- No case-based items (optional per brief).
- Ratio analysis and the cash flow statement are named as tools only (chapters 10 and 11).
