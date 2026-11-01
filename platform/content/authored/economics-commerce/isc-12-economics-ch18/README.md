# ISC Class 12 Economics, Chapter 18 — Circular Flow of Income

`isc-12-economics-ch18` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) in the ISC 2027 Economics pattern (`catalog/sources/cisce.md`, entry `isc-2027-specimen-856-economics`). It is built from `src/`: run `npx tsx content/authored/economics-commerce/isc-12-economics-ch18/src/build.mjs` from `platform/`. The build uses the shared ISC 12 Economics lib in `isc-12-economics-ch01/src/lib.mjs`, which it does not copy or edit. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits and narration rules;
- runs the answer-leak scan and the exact-stem originality pre-check;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 17 + 17 slides with 24 visuals (5 SVG figures); 6 notes sections; 30 flashcards; 74 questions worth 159 marks, including 9 case parts |
| `tests.json` | `t_isc12economics_ch18_short` (20 marks, 50 min) and `t_isc12economics_ch18_long` (40 marks, 100 min), on `isc-12-default-chapter-test-short` and `-long` |
| `src/` | `questions.mjs` (the bank and every computed figure, with asserts) and `build.mjs` (decks, SVG figures, notes, flashcards, tests) |

Both tests follow their blueprint item for item, including the internal-choice groups. They share no items and use no deck-check item.

## Scope

All three syllabus topics are covered:
- **t01** the circular flow (meaning, importance), the simple two-sector model (assumptions, factor and product markets, real and money flows), and saving and investment through the financial market
- **t02** the three-sector model with the government (taxes, purchases, salaries, transfers, subsidies) and the four-sector model with the rest of the world (exports and imports)
- **t03** leakages and injections, the condition for a steady flow in each model, and what happens to income when leakages exceed injections or the reverse

### Decks

- **Part 1** (17 slides, t01): 4 check slides (`tf_saving_two`, `n_kan_income`, `ord_round`, `fb_fin_market`) and 2 worked examples (Kanakdwip factor incomes; saving and investment in Neelachal).
- **Part 2** (17 slides, t02–t03): 4 check slides (`tf_transfer`, `fb_four_sector`, `mt_leak_inj`, `tf_exports_leak`) and 3 worked examples (Malaygiri balance; Vindhyadesh balance by two methods; the Sarayu Pradesh shortfall).
- **SVG figures**, all built from code: the two-sector model with four flows (real flows solid, money flows dashed); the two-sector model with the financial market; the three-sector model; the four-sector model; and bars of Sarayu Pradesh's leakages and injections.
- Narration is at most 62 words per slide (mean 44), with no symbols or abbreviations.

### Question bank (74 items)

| Type | Count |
|---|---|
| mcq | 23 (keys a6 b5 c6 d6) |
| assertion-reason | 5, ISC options with (d) "both false" (keys a, b, c, d, a) |
| true-false | 3 |
| fill-blank | 2 |
| numerical | 6 |
| match | 2 |
| ordering | 1 |
| short 2-mark | 9 |
| short 3-mark | 9 |
| long 5-mark | 6, set in parts |
| 4-mark, ISC paper style (2 + 2), bank only | 3 |
| 8-mark, ISC paper style (4 + 4), bank only | 2 |
| case-based, each with an internal choice in part (c) | 3 |

- **Difficulty:** d1 12, d2 33, d3 25, d4 4.
- **Competency:** recall 6, understanding 26, application 25, analysis 15, evaluation 2. That puts 57% of items at application or above (lint band 45–65%). Five routine one-step items were tagged understanding under D-035.

## Data and facts

- **Imagined economies (₹ crore), computed and asserted in `questions.mjs`:**
  - Kanakdwip: wages 500 + rent 80 + interest 70 + profit 150 = 800, all spent.
  - Neelachal: income 900, saving 140, consumption 760, investment 140.
  - Malaygiri: income 1,000, saving 150, taxes 200, consumption 650; leakages 350 = injections 350.
  - Vindhyadesh: income 1,200, consumption 800; leakages 550 = injections 550; spending on domestic output 1,200.
  - Sarayu Pradesh: leakages 520 against injections 470 (gap 50). Tungadesh: injections 310 against leakages 280 (gap 30).
  - Missing values for balance: Konkanpur exports 80, Pennarpur imports 130, Gomtipur saving 140.
- **Real facts:** none beyond standard textbook concepts; no statistics.
- **Originality:** every economy, firm and case is imagined and labelled as such. The set-ups differ from SOYL CBSE 12 Economics ch01, which covers the two-sector flow. No textbook, specimen or past-paper item is reused (D-036).

## For a reviewer

- **Money-only diagrams:** the three- and four-sector figures show money flows only. Imports by households, firms and the government are drawn as one flow from the firms' box, and the caption says so.
- **Government spending:** salaries, purchases, transfers and subsidies are all grouped as government spending (the injection). Taxes are the matching leakage.
- **AR keys:** `ar_real_money` is keyed (b): the equality of values does not explain the opposite directions. `ar_tax_leak` is keyed (c): the reason "taxes are never spent again" is false. `ar_imports_inj` is keyed (d): both statements are false.
- **`s3_classify_six`:** is marked on a sliding scale (two, four or six items correct).
- **Rendering:** nobody has seen the SVG labels rendered, so they need a look at 360 px on staging. The four-sector figure is the densest.
