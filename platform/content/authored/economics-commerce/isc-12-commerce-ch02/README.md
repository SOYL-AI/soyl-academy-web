# ISC Class 12 Commerce, Chapter 2 — Business Finance, Financial Planning and Capital

`isc-12-commerce-ch02` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (14 + 16 slides), notes (5 sections), 30 flashcards, 69 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12commerce_ch02_short` (20 marks, 50 min) and `t_isc12commerce_ch02_long` (40 marks, 100 min), laid out as `isc-12-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `lib.mjs` (the CBSE 12 Business Studies authoring library with assertion-reason options in the ISC wording), `questions.mjs`, `build.mjs` (decks, notes, flashcards, tests and the build checks). Rebuild from `platform/`: `npx tsx content/authored/economics-commerce/isc-12-commerce-ch02/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ISC syllabus topics: importance of finance and the **sources open to a sole trader, a partnership and a joint stock company**; **financial planning** (meaning, objectives, features, importance); **capital structure** and its factors, with **trading on equity** worked through EPS calculations; **fixed capital** and its factors; **working capital** (gross, net, permanent, temporary), its factors, and fixed versus working capital.
- Style follows the ISC Commerce specimen (`sources/cisce.md` `isc-2026-specimen-857-commerce`; CISCE published no 2027 Commerce specimen): case-based MCQs, assertion-reason items with option (d) “Both Assertion and Reason are false”, analogies, true/false, identify-the-concept items and short cases; tests use the `isc-12-default` blueprints.
- **Originality:** every firm, person, figure and case is imagined and labelled (Bhimtal Bakery, Teesta Travels, Lonar Lenses Ltd, Doon Diagnostics, Thar Solar Parks Ltd, Konkan Cashew Processors, Shivalik Software, Vembanad Houseboats, Pench Paper Mills, Nilgiri Knitwear, Pamba Pharma Ltd, Kaziranga Eco Lodges, Tunga Tractors Ltd, Godavari Glassworks Ltd, Sabarmati Steel Tubes Ltd, Gomti Garments, Ujjain Utensils, Majuli Mask Makers); none of them, and none of the figures, comes from the CBSE 12 Business Studies chapter on financial management. An exact-stem check against every authored bank and `originality --authored` report no duplicates.

## Shape
- **Decks:** Part 1 (14 slides): Business Finance, Financial Planning and Capital; Why business needs finance; Quick check: only at the start?; Sources by form of business; The wider the base, the larger the funds; Worked example 1: matching need and source; Quick check: a sole trader's options; What is financial planning?; Features of a sound financial plan; Quick check: a standby limit; Why financial planning matters; Worked example 2: a seasonal cash plan; Summary of Part 1; Exam tips. Part 2 (16 slides): Capital Structure, Fixed and Working Capital; Capital structure: debt or equity?; Factors affecting capital structure; Worked example 1: trading on equity; Worked example 2: when debt hurts; Quick check: trading on equity; Fixed capital and its factors; Worked example 3: reading choices; Quick check: leasing; Working capital: permanent and temporary; Worked example 4: net working capital; Factors affecting working capital; Quick check: the festival stock; Fixed capital versus working capital; Summary of Part 2; Exam tips.
- **Visuals (24 of 30 slides):** flow 6, table 15, svg 3. Three drawn figures: the widening funds base by form of business, a debt-versus-equity balance, and a permanent-versus-temporary working-capital chart (peak in October–November); the rest are tables and flows.
- **Narration:** 6–57 words per slide (mean 41).

## Question bank (69 items, 123 marks)
| Type | Count |
|---|---|
| mcq | 27 |
| assertion-reason | 5 |
| true-false | 5 |
| fill-blank | 4 |
| match | 2 |
| short (2 marks) | 7 |
| short (3 marks) | 9 |
| long (5 marks) | 5 |
| numerical | 3 |
| case-based | 2 |

- **MCQ keys:** a 7, b 7, c 7, d 6; **assertion-reason keys:** a a c d b.
- **Difficulty:** d1 9 · d2 33 · d3 26 · d4 1.
- **Competency:** understanding 26 · application 27 · analysis 15 · evaluation 1. Application or higher is **62% of items (72% of marks)**, inside the 45–65 % band.

## Chapter tests (ISC defaults)
- **Short (20 marks):** **A** 5 item(s) · **B** 3 item(s), 1 internal choice · **C** 3 item(s), 1 internal choice · **D** 1 item(s).
- **Long (40 marks):** **A** 12 item(s) · **B** 4 item(s), 1 internal choice · **C** 5 item(s), 1 internal choice · **D** 3 item(s), 1 internal choice.

## Validation
- In the build: schema, pipeline lint (stage 4), deterministic verify checks, word limits, narration and answer-leak scan: 0 errors, 0 warnings.
- Gates: `npm test -w @soyl/content-templates`, `npm run content -- catalog`, `lint --exemplars`, `verify --board cisce --class 12 --subject commerce --authored`, `originality --authored`, DB-6 split and the API content test; results in the handoff `docs/platform/handoffs/2026-10-31-subject-producer-isc12-commerce.md`.

## Verifier pass (2026-10-31)
Every question, case part and alternative was re-read against its key. Notes:
1. **EPS figures** are computed in the build and asserted: Plan A ₹1.5 and Plan B ₹2.25 at EBIT ₹8 lakh; ₹0.5625 and ₹0.375 at EBIT ₹3 lakh; the plans tie at EBIT ₹4 lakh (EPS ₹0.75 each). Net working capital ₹3,80,000 is also asserted.
2. **Competency balance.** The first build had 74% application-or-higher items; eight recall-style items were re-tagged as understanding (now 62%).
3. **Chart.** The working-capital peak was moved to October–November to match the festival months in the stems.

## For the reviewer: facts to check
- No time-sensitive figures are used. The 25 per cent tax rate and 10 per cent interest rate are imagined round numbers for the calculation, not current rates.
