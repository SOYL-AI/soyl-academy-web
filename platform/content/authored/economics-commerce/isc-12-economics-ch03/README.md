# ISC Class 12 Economics, Chapter 3 — Consumer Behaviour: Indifference Curve Analysis

`isc-12-economics-ch03` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032). It is built from `src/`: run `npx tsx content/authored/economics-commerce/isc-12-economics-ch03/src/build.mjs` from `platform/`.
- It uses the shared ISC 12 Economics lib, `isc-12-economics-ch01/src/lib.mjs`.
- The build validates the schema and runs the pipeline lint and the deterministic verify checks.
- It also runs the word-limit, narration and answer-leak checks, plus the exact-stem originality pre-check.
- Then it writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 18 + 18 slides with 26 visuals (7 SVG figures plotted from equations, the rest tables and flows); 6 notes sections; 30 flashcards; 77 questions worth 160 marks |
| `tests.json` | `t_isc12economics_ch03_short` (20 marks, 50 min) and `t_isc12economics_ch03_long` (40 marks, 100 min), on `isc-12-default-chapter-test-short` and `-long`. Both follow their blueprint item for item, including the internal-choice groups. They are disjoint and use no deck-check item. |
| `src/` | `questions.mjs` (bank and asserted data), `build.mjs` (decks, SVG figures, notes, flashcards, tests) |

## Scope (ISC 2027, all five topics)

- **t01** ordinal utility; indifference schedule, curve and map; assumptions
- **t02** MRS (ΔY ÷ ΔX) and why it diminishes; link to convexity
- **t03** properties: downward slope, convexity, higher curve means higher satisfaction, no intersection (proof by contradiction), not necessarily parallel, not touching the axes
- **t04** budget line Px·X + Py·Y = M, intercepts, slope Px ÷ Py, budget set; parallel shifts and rotations
- **t05** equilibrium where MRS = Px ÷ Py with a convex curve; why cutting points are not equilibrium; adjustment when MRS ≠ Px ÷ Py

### Decks

- **Part 1:** indifference curves and MRS. 4 checks and 2 worked examples: MRS from a schedule, and ranking bundles by non-satiety.
- **Part 2:** budget line and equilibrium. 4 checks and 3 worked examples: drawing a budget line, an equilibrium by calculation, and a fall in the metro fare.
- Narration is at most 68 words per slide and uses no symbols.

### Question bank (77 items)

| Type | Count |
|---|---|
| mcq | 24 (keys a6 b6 c6 d6) |
| assertion-reason | 6, with ISC options (keys a a b c d a) |
| true-false | 3 |
| fill-blank | 2 |
| numerical | 7 |
| match | 1 |
| ordering | 1 |
| short 2-mark | 10 |
| short 3-mark | 11 |
| long 5-mark | 6, in parts |
| ISC paper style, bank only | 2 four-mark (2 + 2) and 2 eight-mark (4 + 4) |
| case-based | 2, each with an internal choice in part (c) |

- **Difficulty:** d1 14, d2 31, d3 27, d4 5.
- **Competency:** recall 9, understanding 23, application 24, analysis 19, evaluation 2. That puts 58% of items at application or above.

## Data and facts

- **All figures are imagined and computed and asserted in `questions.mjs`:**
  - Ira's schedule (MRS 5, 4, 3, 2) and Suresh's schedule (MRS 6, 4, 2, 1).
  - Meenal's budget 20X + 10Y = 240 (intercepts 12 and 24, slope 2) with her equilibrium (6, 12) on X·Y = 72. The budget line cuts X·Y = 32 at R and S, and X·Y = 128 is unattainable.
  - Kunal's budget lines (300 rupees; fare 30 rupees, snacks 15 rupees): an income rise to 450 rupees gives a parallel shift; a fare fall to 20 rupees rotates the line, moving the equilibrium from (5, 10) to (7.5, 10).
  - Tanya (6, 9), Farhan (20, 5) and Rohit (6, 9).
- **Equilibrium items:** the smooth curves are X × Y = constant, so the MRS is Y ÷ X. Every stem that asks for an equilibrium states this.
- **No real-world statistics.** All consumers and places are imagined and labelled as such. No textbook schedule, ISC specimen item (its two-bundle burger-and-juice question) or past-paper item is reused.

## For a reviewer

- **Constant-MRS case:** `l_mrs_full` and `s4_mrs_isc` mention that a constant MRS gives a straight-line curve (perfect substitutes) only to contrast it with convexity. Perfect substitutes and complements are not otherwise taught, because they are not in the syllabus wording.
- **Corner bundles:** `m_eq_bundle` lists (12, 0) as a distractor that lies on the budget line but not on curves of the form X·Y > 0.
- **Rendering:** nobody has seen the SVG labels rendered (the indifference map, crossing-curves proof, budget set, shifts and equilibrium). A script check found no label overflow or overlap, but they should be looked at at 360 px on staging.
