# ISC Class 12 Economics, Chapter 16 — Fiscal Policy

`isc-12-economics-ch16` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) in the ISC 2027 Economics pattern (`catalog/sources/cisce.md`, entry `isc-2027-specimen-856-economics`). It is built from `src/`: run `npx tsx content/authored/economics-commerce/isc-12-economics-ch16/src/build.mjs` from `platform/`. The build uses the shared ISC 12 Economics lib in `isc-12-economics-ch01/src/lib.mjs`, which it does not copy or edit. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits and narration rules;
- runs the answer-leak scan and the exact-stem originality pre-check;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 18 + 17 slides with 25 visuals; 6 notes sections; 30 flashcards; 79 questions worth 160 marks, including 9 case parts |
| `tests.json` | `t_isc12economics_ch16_short` (20 marks, 50 min) and `t_isc12economics_ch16_long` (40 marks, 100 min), on `isc-12-default-chapter-test-short` and `-long` |
| `src/` | `questions.mjs` (the bank and every computed figure, with asserts) and `build.mjs` (decks, SVG figures, notes, flashcards, tests) |

Both tests follow their blueprint item for item, including the internal-choice groups. They share no items and use no deck-check item.

## Scope

All four syllabus topics are covered:
- **t01** fiscal policy: meaning, instruments, objectives, use against excess and deficient demand; contrast with monetary policy
- **t02** public revenue: tax and fee; direct and indirect taxes (impact and incidence, merits and demerits); progressive, proportional and regressive taxes, with slab calculations
- **t03** public expenditure: meaning, kinds (developmental and non-developmental, transfers), importance
- **t04** public debt: internal and external; methods of redemption (sinking fund, conversion, surplus budget, terminal annuity, capital levy, refunding); deficit financing (meaning)

Budget components and the revenue, fiscal and primary deficits belong to ch17 and are not taught here.

### Decks

- **Part 1:** fiscal policy and taxes. 18 slides, 4 checks (`m_fp_inflation`, `tf_fp_cb`, `fb_fp_tools`, `m_progressive_meaning`), 2 worked examples (a slump plan; the tax on ₹8,00,000).
- **Part 2:** public expenditure and public debt. 17 slides, 4 checks (`m_pe_share`, `m_refunding`, `n_conversion_saving`, `tf_surplus_repay`), 2 worked examples (Sahyagiri's spending; a sinking fund).
- **SVG figures:** 3, all computed from the data: average tax rates under the three kinds of tax; Sahyagiri's spending; the growth of a sinking fund.
- **Narration:** at most 63 words per slide, with no symbols or abbreviations.

### Question bank (79 items)

| Type | Count |
|---|---|
| mcq | 28 |
| assertion-reason | 6, ISC options with (d) "Both Assertion and Reason are false"; keys a a d b a c |
| true-false | 4 |
| fill-blank | 3 |
| numerical | 4 |
| match | 1 |
| ordering | 1 |
| short 2-mark | 10 |
| short 3-mark | 9 |
| long 5-mark | 5, in parts |
| ISC paper-style 4-mark (2 + 2), bank only | 3 |
| ISC paper-style 8-mark (4 + 4), bank only | 2 |
| case-based | 3, each with an internal choice in part (c) |

- **Difficulty:** d1 13, d2 39, d3 23, d4 4.
- **Competency:** recall 9, understanding 29, application 22, analysis 15, evaluation 4. That puts 52% of items at application or above.
- **Answer keys:** MCQ keys are a7 b7 c7 d7.

## Data and facts

- **Imagined figures, computed and asserted in `questions.mjs`:**
  - **Taranagar slabs** (nil up to ₹2,50,000; 10 per cent to ₹6,00,000; 20 per cent above): ₹0, ₹25,000 and ₹1,15,000 on ₹2, 5 and 10 lakh (0, 5 and 11.5 per cent); ₹75,000 on ₹8 lakh (9.375 per cent); ₹20,000 on ₹4.5 lakh.
  - **Flat ₹6,000 levy:** 3, 1.2 and 0.6 per cent of the same incomes.
  - **Debt management:** a sinking fund of ₹600 crore over 12 years is ₹50 crore a year; converting ₹400 crore from 9 to 6.5 per cent saves ₹10 crore a year; a terminal annuity of ₹300 crore over 15 years is ₹20 crore a year.
  - **Sahyagiri:** education and health are ₹300 crore of ₹600 crore.
- **Rates:** all tax rates and slabs are imagined, and no current Indian rates are stated.
- **Dated fact:** the only one is that GST, an indirect tax, came into force on 1 July 2017.
- **Deficit financing:** defined in the Indian sense, as borrowing from the central bank, which creates new money.
- **Originality:** every state and person is imagined (Taranagar, Meghapur, Sahyagiri, Kalinga, Malabar Pradesh, Kaveripur and others). No textbook, specimen or past-paper item is reused; the specimen's "What is sinking fund?" and its public-expenditure pie chart are not used. The set-ups differ from SOYL's CBSE 12 Economics ch04.
- **Checks:** a 5-gram near-duplicate scan (the originality gate's rule) compared the 79 stems with 21,708 others and found 0 flags. The SVG label check found 0 issues.

## For a reviewer

- **Sinking-fund and annuity figures** ignore interest, the simple classroom method, and each stem says so.
- **`ar_direct_shift`** is keyed (d), both false. **`ar_pe_multiplier`** is keyed (b): R is true but does not explain A.
- **`l_direct_indirect_eval`** asks students to evaluate a tax mix; the model answer gives a balanced judgement, not a policy verdict on India.
- **Rendering:** nobody has seen the SVG labels rendered, so they need a look at 360 px on staging. The grouped bar chart is the densest.
