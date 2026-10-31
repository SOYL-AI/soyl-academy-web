# ISC Class 12 Economics, Chapter 9 — Revenue and Producer's Equilibrium

`isc-12-economics-ch09` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) in the ISC 12 Economics pattern set by ch01–ch08. To build, run `npx tsx content/authored/economics-commerce/isc-12-economics-ch09/src/build.mjs` from `platform/`. It uses the shared lib `isc-12-economics-ch01/src/lib.mjs`, which is imported, not copied. Edit `src/`, not the JSON.

The build checks:
- the schema;
- the pipeline lint and the deterministic verify checks;
- word limits and narration rules;
- the answer-leak scan;
- the exact-stem originality pre-check against every authored chapter.

| File | What |
|---|---|
| `release.json` | 2 decks of 17 + 16 slides with 23 visuals (6 SVG revenue and equilibrium diagrams; the rest tables and flows); 6 notes sections; 30 flashcards; 74 questions worth 158 marks |
| `tests.json` | `t_isc12economics_ch09_short` (20 marks, 50 min) and `t_isc12economics_ch09_long` (40 marks, 100 min) on `isc-12-default-chapter-test-short` / `-long`. Both follow their blueprint item for item, including the internal-choice groups. They are disjoint and use no deck-check item. |
| `src/` | `questions.mjs` (bank, imagined data, revenue and profit engine with asserts) and `build.mjs` (decks, SVGs, notes, cards, tests) |

## Scope (ISC 2027 syllabus)

All five topics are covered:
- **t01** total, average and marginal revenue: meaning and calculation; AR = price; AR as the demand curve
- **t02** revenue curves under perfect competition (AR = MR horizontal, TR a straight line from the origin)
- **t03** revenue curves under imperfect competition (MR below AR, twice the slope for a straight-line AR; TR an inverted U peaking where MR = 0)
- **t04** producer's equilibrium by the TR–TC approach (largest positive gap; break-even points)
- **t05** producer's equilibrium by the MR–MC approach (MR = MC and MC rising)

The syllabus lists no removed topics for this chapter.

### Decks

- **Part 1** (revenue concepts and curves): 17 slides with 4 checks. Its 2 worked examples are a kurta workshop's TR and MR schedule and a coir-rope maker's price-taker schedule.
- **Part 2** (producer's equilibrium): 16 slides with 4 checks. Its 3 worked examples are a TR–TC schedule (T-shirts), MR–MC without an exact equality (kurtas) and two MR = MC points (leather bags).
- **Narration:** at most 62 words per slide (mean 45), with no symbols or abbreviations.

### Question bank (74 items)

| Type | Count |
|---|---|
| mcq | 23 (keys a6 b5 c6 d6) |
| assertion-reason | 6 (ISC options with (d) "Both Assertion and Reason are false"; keys a a b a a d) |
| true-false | 3 |
| fill-blank | 2 |
| numerical | 6 |
| match | 1 |
| ordering | 1 |
| short 2-mark | 9 |
| short 3-mark | 9 |
| long 5-mark | 6 |
| ISC paper-style 4-mark (2 + 2), bank only | 3 |
| ISC paper-style 8-mark (4 + 4), bank only | 2 |
| case-based | 3 (coir cooperative, kurta workshop plan, leather-bag unit), each with an internal choice |

- **Difficulty:** d1 8, d2 36, d3 23, d4 7.
- **Competency:** recall 3, understanding 29, application 16, analysis 24, evaluation 2. That puts 57% of items at application or above.

## Data and facts

All figures are imagined. They are computed in `questions.mjs` and checked by asserts.

- **Alappuzha coir-rope maker:** price ₹40; TR 40, 80, 120, 160, 200 for 1–5 coils; AR = MR = 40.
- **Lucknow chikan workshop** (₹ hundred):
  - AR 100, 90, 80, 70, 60, 50, 40 for 1–7 kurtas give TR 100, 180, 240, 280, 300, 300, 280 and MR 100, 80, 60, 40, 20, 0, −20 (MR = 0 at 6).
  - With TC 50, 110, 160, 200, 250, 320, 410 for 0–6 kurtas: MC 60, 50, 40, 50, 70, 90; profit −50, −10, 20, 40, 30, −20, −110.
  - Equilibrium is 3 kurtas (profit 40) by both approaches. No output has MR exactly equal to MC, so the rule "up to the last unit with MR ≥ MC" applies.
- **Tiruppur T-shirt unit** (price ₹30 hundred a batch): TC 40, 60, 75, 85, 100, 130, 170; MC 20, 15, 10, 15, 30, 40; profit −40, −30, −15, 5, 20, 20, 10. Profit ties at 4 and 5 batches; equilibrium is 5, where MR = MC = 30 with MC rising.
- **Jodhpur leather-bag unit** (price ₹25, TFC ₹10, MC 25, 18, 15, 20, 25, 32): MR = MC at the 1st bag (MC falling, profit −10) and the 5th bag (MC rising, profit 12). Equilibrium is 5 bags.
- **Water-tanker monopolist (diagrams):** AR = 12 − Q, MR = 12 − 2Q, TR = 12Q − Q², maximum 36 at Q = 6.
- **Rajkot pump maker (diagrams):** P = 30, MC = (Q − 5)² + 14, TC = 40 + 14Q + ((Q − 5)³ + 125) ÷ 3. MC = MR at Q = 1 (MC falling, profit minimum) and Q = 9 (MC rising, profit 41). Break-even outputs, found by bisection, are about 5.1 and 11.9.
- **Jaipur vase price cut:** 4 vases at ₹500 or 5 at ₹480 gives MR = 480 − 80 = 400.

No real statistics are used, and no textbook, specimen or past-paper item is reused (D-036).

## Checks run

- **Build:** NO ERRORS, with pipeline lint at 0 errors and 0 warnings and 0 deterministic-verify flags. Two rebuilds give byte-identical `release.json` and `tests.json`.
- **Duplicates:** the exact-stem pre-check passes. The private 5-gram near-duplicate scan (the originality gate's rule) compared 74 stems with 21,257 others and found 0 flags.
- **SVG labels:** the label overflow and overlap check passes on all 6 figures.
- **Fixes from the first build:**
  - One fill-blank solution did not name the accepted answer.
  - Two model answers were under their word limits.
  - Application-or-above came out at 69%, so 9 routine one-step items were retagged as understanding (D-035).

## For a reviewer

- **Tied profits:** where a schedule has MR = MC exactly (T-shirts at the 5th batch), profit is the same at that output and the one before it. The items take the MR = MC output as the equilibrium, the usual classroom convention, and say why.
- **`ar_mr_neg_tr`** is keyed (b): R (AR stays positive) is true but does not explain why MR turns negative.
- **`ar_mr_zero_eq`** is keyed (d): both statements are false.
- **Rendering:** nobody has seen the SVG labels rendered, so they need a look at 360 px on staging, especially the TR–TC and MR–MC diagrams.
