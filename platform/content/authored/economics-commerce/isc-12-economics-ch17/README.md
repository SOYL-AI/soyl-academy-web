# ISC Class 12 Economics, Chapter 17 — Government Budget and Deficits

`isc-12-economics-ch17` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) in the ISC 2027 Economics pattern (`catalog/sources/cisce.md`, entry `isc-2027-specimen-856-economics`). It is built from `src/`: run `npx tsx content/authored/economics-commerce/isc-12-economics-ch17/src/build.mjs` from `platform/`. The build uses the shared ISC 12 Economics lib in `isc-12-economics-ch01/src/lib.mjs`, which it does not copy or edit. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits and narration rules;
- runs the answer-leak scan and the exact-stem originality pre-check;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 18 + 16 slides with 24 visuals; 6 notes sections; 30 flashcards; 76 questions worth 160 marks, including 9 case parts |
| `tests.json` | `t_isc12economics_ch17_short` (20 marks, 50 min) and `t_isc12economics_ch17_long` (40 marks, 100 min), on `isc-12-default-chapter-test-short` and `-long` |
| `src/` | `questions.mjs` (the bank, the `deficits()` helper and every computed figure, with asserts) and `build.mjs` (decks, SVG figures, notes, flashcards, tests) |

Both tests follow their blueprint item for item, including the internal-choice groups. They share no items and use no deck-check item.

## Scope

All three syllabus topics are covered:
- **t01** the government budget: meaning, features, the financial year; Union and State budgets; balanced, surplus and deficit budgets
- **t02** components: revenue and capital receipts (tax and non-tax; borrowing, recovery of loans, disinvestment) and revenue and capital expenditure, with the liability and asset tests
- **t03** revenue, fiscal and primary deficits: meaning, calculation and implications (dissaving, debt and interest, the debt trap, inflation if money is printed, the quality of borrowing)

Fiscal-policy instruments, taxes, public expenditure and public debt redemption are in ch16 and are only referred to here.

### Decks

- **Part 1:** the budget and its components. 18 slides, 4 checks (`fb_afs`, `m_nontax`, `tf_recovery`, `m_interest_received`), 2 worked examples (classifying six receipts of Hemkunt; classifying six items of Hemavati spending).
- **Part 2:** measures of deficit. 16 slides, 4 checks (`n_rd_shail`, `ord_deficits`, `fb_fd_borrow`, `m_pd_zero`), 2 worked examples (Hemavati's three deficits; Neelachal's revenue surplus with a fiscal deficit).
- **SVG figures:** 3, all computed from the data: Hemavati's receipts and expenditure as two equal stacked bars, with borrowing filling the gap; Hemavati's three deficits; what Neelachal and Saraswatipur use their borrowing for.
- **Narration:** at most 67 words per slide (mean 42), with no symbols or abbreviations.

### Question bank (76 items)

| Type | Count |
|---|---|
| mcq | 24 (keys a6 b6 c6 d6) |
| assertion-reason | 7, ISC options with (d) "both false" (keys a a d a c b c) |
| true-false | 3 |
| fill-blank | 3 |
| numerical | 5 |
| match | 1 |
| ordering | 1 |
| short 2-mark | 9 |
| short 3-mark | 10 |
| long 5-mark | 6, in parts |
| 4-mark ISC paper style (2 + 2), bank only | 2 |
| 8-mark ISC paper style (4 + 4), bank only | 2 |
| case-based, each with an internal choice in part (c) | 3 (Aranyadesh budget summary, Neelachal budget note, Saraswatipur news report) |

- **Difficulty:** d1 16, d2 34, d3 19, d4 7.
- **Competency:** recall 7, understanding 25, application 19, analysis 20, evaluation 5. That puts 58% of items at application or above (lint band 45–65%).
- **Topics:** t01 12, t02 27, t03 33, and 4 items cover two topics.

## Data and facts

- **Imagined figures, computed and asserted in `questions.mjs` (₹ crore):**
  - **Hemavati:** tax 2,400, non-tax 600, recovery of loans 150, disinvestment 250, revenue expenditure 3,700 (interest 900), capital expenditure 1,100. Revenue deficit 700, fiscal deficit 1,400 (= borrowing), primary deficit 500; receipts and expenditure both 4,800.
  - **Neelachal:** revenue surplus 150, fiscal deficit 400, primary deficit 100.
  - **Aranyadesh:** fiscal deficit 700, equal to the borrowings in its table; revenue deficit 350; primary deficit 180.
  - **Saraswatipur:** revenue deficit 450 of a fiscal deficit of 900 (50 per cent); primary deficit 540.
  - **Others:** Kanakdesh primary deficit 0; Revapur interest 750; Shailpur revenue deficit 270; Hiranyapur fiscal deficit 5 per cent of its GDP; budget-type gaps +300, 0 and −350; Hemavati's next-year fiscal deficit 1,550 with interest 1,050 (primary deficit unchanged at 500).
- **Real facts:** only stable ones: the financial year runs from 1 April to 31 March; the Constitution calls the budget the annual financial statement (Article 112 for the Union, Article 202 for the States).
- **Not used:** no actual Union or State budget figure or deficit target. The ISC 2027 specimen's 2026-27 fiscal-deficit extract is not reused.
- **Originality:** every government, state and figure is imagined, and the set-ups differ from SOYL CBSE 12 Economics ch04 and ISC 12 Economics ch16. No textbook, specimen or past-paper item is reused (D-036). A 5-gram near-duplicate scan using the originality gate's rule (76 stems against 21,861 others) found 0 flags.

## For a reviewer

- **Grants:** a grant given by the Union to a State is revenue expenditure for the Union and a revenue receipt for the State, even if the State builds an asset with it (`m_grant_states`, `s_grant_classify`, `s3_grant_case`).
- **Budget types:** balanced, surplus and deficit budgets compare receipts other than borrowing with expenditure.
- **AR keys:** `ar_rd_fd` is keyed (b): R (interest is revenue expenditure) is true but does not explain why the fiscal deficit exceeds the revenue deficit. `ar_interest_paid` is keyed (d), both false.
- **Rendering:** nobody has seen the SVG labels rendered, so they need a look at 360 px on staging, especially the stacked-bar legend.
