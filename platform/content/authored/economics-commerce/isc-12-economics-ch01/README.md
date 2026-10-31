# ISC Class 12 Economics, Chapter 1 — Theory of Demand

`isc-12-economics-ch01` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) to the standard of the CBSE 12 Economics chapters, in the ISC 2027 question style. Build it from `platform/` with `npx tsx content/authored/economics-commerce/isc-12-economics-ch01/src/build.mjs`. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan and the editorial counts;
- runs an exact-stem originality pre-check against every authored chapter;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

**`src/lib.mjs` is the shared ISC 12 Economics library.** Every ISC 12 Economics chapter imports it from this folder. It is the CBSE 12 Computer Science lib, with assertion-reason options in the ISC 2027 wording: option (d) is "Both Assertion and Reason are false".

| File | What |
|---|---|
| `release.json` | 2 decks (17 + 17 slides, 24 visuals including 5 SVG curve figures), notes (6 sections), 30 flashcards, 75 questions (156 marks) |
| `tests.json` | `t_isc12economics_ch01_short` (20 marks, 50 min) on `isc-12-default-chapter-test-short` and `t_isc12economics_ch01_long` (40 marks, 100 min) on `isc-12-default-chapter-test-long`. Both follow their blueprint item for item, including the internal-choice groups. They share no questions and use no deck-check item. |
| `src/` | `lib.mjs` (shared), `questions.mjs` (the bank and the imagined data, computed and asserted), `build.mjs` (decks, SVG figures, notes, flashcards, tests) |

## Scope

All six syllabus topics are covered, and there are no removed topics for this chapter:
- **t01** meaning and kinds of demand (individual, market, joint, composite, derived)
- **t02** determinants and the demand function Dx = f(Px, Py, Y, T, E); substitutes and complements; normal and inferior goods
- **t03** Law of Demand: assumptions, schedule and curve, reasons for the downward slope
- **t04** market demand by horizontal summation
- **t05** movement along versus shift (extension, contraction, increase, decrease)
- **t06** exceptions (Giffen goods, Veblen goods, expectations, emergencies)

## Question style

This chapter follows the ISC 2027 Economics specimen (`sources/cisce.md`, entry `isc-2027-specimen-856-economics`), for pattern only:
- **Section A style:** 1-mark MCQs, some reading a table or a described diagram, and assertion-reason items.
- **Short answers:** 2-, 3- and 5-mark questions for the `isc-12-default` chapter tests.
- **Paper-style practice:** the bank also holds 4-mark (2 + 2) and 8-mark (4 + 4) items in the board's own format. These are practice items and appear in no chapter test.

## Data

All data is imagined and computed in `questions.mjs`:
- **Riya's mango schedule:** Q = 7 − P/20.
- **Kochi banana chips:** household A Q = 8 − 0.1P, household B Q = 6 − 0.05P. The market curve has a kink at ₹80, where A stops buying.
- **Nagpur canteen:** three samosa schedules.
- **Indore school bags:** Q = 500 − 20P + 0.5Y.

Every SVG curve is plotted from these same equations, and the build asserts each figure. No real statistics are used.

## Build stats

- **Decks:** Part 1 (t01–t03) and Part 2 (t04–t06), 17 slides each. Each deck has 12 visuals, 4 check slides and 2 worked examples.
  - Part 1 worked examples: the demand function, and the schedule to curve.
  - Part 2 worked examples: the market schedule, and classifying changes.
  - Check slides: m_milk_uses, m_func_symbol, m_subst_effect and num_mango_change in Part 1; tf_vertical_add, fb_shift_word, mt_four_changes and tf_giffen_inferior in Part 2. None is used in a test.
  - Narration is at most 67 words per slide (mean 48) and uses no symbols.
- **SVG figures:** the mango demand curve, the kinked market curve, movement along a curve, shifts (D₀, D₁, D₂) and an upward-sloping exception. A label overflow and overlap script finds 0 issues.
- **Questions:**

| Type | Count |
|---|---|
| mcq | 25 (keys a7 b6 c6 d6) |
| assertion-reason | 6 (keys a a b c d c) |
| true-false | 3 |
| fill-blank | 3 |
| numerical | 4 |
| match | 2 |
| ordering | 1 |
| short 2-mark | 9 |
| short 3-mark | 10 |
| long 5-mark | 6 |
| short 4-mark (2 + 2, paper style) | 2 |
| long 8-mark (4 + 4, paper style) | 2 |
| case-based | 2, each with an internal choice in part (c) |

- **Difficulty:** d1 12, d2 33, d3 24, d4 6.
- **Competency:** recall 5, understanding 28, application 22, analysis 19, evaluation 1. That puts 56% of items at application or above, inside the lint band.
- **Originality:** the exact-stem pre-check passes. A 5-gram near-duplicate scan using the originality gate's rule (Jaccard ≥ 0.7, maths and code stripped) compared the 75 stems with 18,187 others in the repo, including CBSE 12 Economics and CBSE 10 SST, and found 0 flags.

## For a reviewer

- **Inferior good example:** coarse broken rice is called inferior *for the families in the item* (some households), not as a universal claim. The bus-ticket item does the same.
- **Expectations exception:** `s3_expectation` and `m_shares_rise` present expectation-driven buying as an exception arising because an assumption of the law (constant expectations) is broken.
- **`ar_new_buyers`:** keyed (b). R defines market demand and does not explain why new buyers enter.
- **Assertion-reason format:** items use the ISC option set, so (d) means "both false". `ar_both_false` is the one (d) key.
- **Paper-style items:** the 4-mark and 8-mark items are practice only. If a subject blueprint for ISC 12 Economics is added later (1, 4 and 8 marks, as in the specimen), these items fit it directly.
- **Rendering:** nobody has seen the SVG labels rendered, so they need a look at 360 px on staging.
