# ISC Class 12 Economics, Chapter 4 — Elasticity of Demand

`isc-12-economics-ch04` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) in the ISC 2027 Economics question style (sources/cisce.md `isc-2027-specimen-856-economics`). Build it from `platform/` with `npx tsx content/authored/economics-commerce/isc-12-economics-ch04/src/build.mjs`. It uses the shared ISC 12 Economics lib in `isc-12-economics-ch01/src/lib.mjs`, imported and not copied. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan and the editorial counts;
- runs the exact-stem originality pre-check;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (19 + 18 slides, 26 visuals including 5 SVG figures), notes (6 sections), 30 flashcards, 75 questions (167 marks) |
| `tests.json` | `t_isc12economics_ch04_short` (20 marks, 50 min) on `isc-12-default-chapter-test-short` and `t_isc12economics_ch04_long` (40 marks, 100 min) on `isc-12-default-chapter-test-long`. Both follow their blueprint item for item, including the internal-choice groups. They share no questions and use no deck-check item. |
| `src/` | `questions.mjs` (the bank and the imagined figures, computed and asserted) and `build.mjs` (decks, SVG figures, notes, flashcards, tests) |

## Scope

All six syllabus topics are covered:
- **t01** meaning and the five degrees, with curves
- **t02** the percentage (proportionate) method, including finding an unknown quantity or price
- **t03** the total expenditure (outlay) method
- **t04** the point (geometric) method on straight and curved demand curves
- **t05** factors affecting price elasticity
- **t06** income and cross elasticity

**Removed topic honoured:** numericals are set on the **percentage method only**. The outlay and point methods are taught conceptually: directions of spending and segment comparisons, with no calculated values. The point-method figures carry no lengths.

**Convention:**
- Ed = (ΔQ ÷ Q) ÷ (ΔP ÷ P), with the **original** price and quantity.
- The minus sign is dropped and Ed is reported as positive. Every numerical solution says so.

## Contents

- **Decks:**
  - Part 1 (t01–t03): 19 slides, 13 visuals, 4 checks (m_vertical, m_rosogolla_degree, m_te_unchanged, fb_perfectly_inelastic), 2 worked examples (idli Ed; new kite quantity).
  - Part 2 (t04–t06): 18 slides, 13 visuals, 4 checks (m_point_mid, m_many_uses, m_income_positive, m_cross_sub), 3 worked examples.
  - Narration is at most 66 words per slide (mean 45) and uses no symbols.
- **SVG figures (5), drawn from equations with points asserted on the curves:**
  - the three special degrees;
  - relatively elastic against relatively inelastic;
  - the idli price cut;
  - the point method on a straight line;
  - the tangent method on a curve.

**Question bank: 75 items**

| Type | Count |
|---|---|
| mcq | 25 (keys a7 b6 c6 d6) |
| assertion-reason | 5, ISC options with (d) "both false" (keys c a a a d) |
| true-false | 3 |
| fill-blank | 2 |
| match | 1 |
| ordering | 1 |
| numerical | 5, percentage method |
| short 2-mark | 9 |
| short 3-mark | 10 |
| long 5-mark | 6, in parts |
| ISC paper style, bank only | 3 four-mark (2 + 2) and 2 eight-mark (4 + 4) |
| case-based | 3, each with an internal choice in part (c) |

- **Difficulty:** d1 7, d2 28, d3 32, d4 8.
- **Competency:** recall 6, understanding 25, application 19, analysis 18, evaluation 7. That puts 59% of items at application or above.

## Data and facts

- **Imagined figures, all computed and asserted in `questions.mjs`:**

  | Item | Figures | Result |
  |---|---|---|
  | Chennai idli plates | ₹40 → ₹32, 200 → 260 plates | Ed 1.5 |
  | Ahmedabad kites | Ed 0.8, ₹50 → ₹55 | 500 → 460 kites |
  | Goa coconuts | Ed 2, 400 → 480 a day | ₹30 → ₹27 |
  | Ludhiana paneer | Ed 0.6, 250 → 235 kg | ₹80 → ₹88 |
  | Kolkata rosogolla | ₹200 → ₹160, 150 → 180 boxes | Ed 1 |
  | Kanpur salt | — | Ed 0.2 |
  | Jaipur autos | — | Ed 1.5 |
  | Patna notebooks | 600 → 525 | — |
  | Indore cinema | — | +10 per cent |
  | Shillong data packs | — | +15 per cent |
  | Lucknow kurtas and lemons | — | Ed 2 and 0.3 |

- **Real facts:** none beyond the theory. No prices, statistics or real companies are given.
- **Originality:**
  - Every stem's wording is specific to its own content.
  - The lib's exact-stem check passes.
  - A 5-gram near-duplicate scan with the originality gate's rule finds 0 flags against 18,262 other stems.
  - No textbook, specimen or past-paper item is reused (D-036).

## For a reviewer

- **Takings items:** `s3_auto_judge`, `l_numericals(b)`, `cb_tiffin(c)(i)` and `cb_two_shops(c)(i)` say whether takings rise or fall by elasticity reasoning only. No outlay-method amounts are calculated, so the removed topic is respected.
- **`ar_slope_vs_ed`:** keyed (c). Elasticity depends on the slope **and** on P ÷ Q.
- **`ord_income_values`:** ranks salt as "positive but close to zero". This is a broad classroom generalisation.
- **Rendering:** nobody has seen the SVG labels rendered, so they need a look at 360 px on staging. The three-panel degrees figure is the widest.
