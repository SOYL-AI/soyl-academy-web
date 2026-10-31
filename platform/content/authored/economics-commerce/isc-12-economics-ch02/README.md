# ISC Class 12 Economics, Chapter 2 — Consumer Behaviour: Cardinal Utility Analysis

`isc-12-economics-ch02` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032). It is built from `src/`: run `npx tsx content/authored/economics-commerce/isc-12-economics-ch02/src/build.mjs` from `platform/`. Edit `src/`, not the JSON.

The build:
- uses the shared ISC 12 Economics lib, `../isc-12-economics-ch01/src/lib.mjs`;
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan, the editorial counts and the exact-stem originality pre-check;
- then writes `release.json` and `tests.json`.

| File | What |
|---|---|
| `release.json` | 2 decks (17 + 18 slides); notes (6 sections); 30 flashcards; 73 questions (151 marks) |
| `tests.json` | `t_isc12economics_ch02_short` (20 marks, 50 min) on `isc-12-default-chapter-test-short` and `t_isc12economics_ch02_long` (40 marks, 100 min) on `isc-12-default-chapter-test-long`. Both follow their blueprint item for item, including the internal-choice groups. The two tests are disjoint and use no deck-check item. |
| `src/` | `questions.mjs` (bank, data sets and helpers `muFrom`, `tuFrom`, `eqOne`, `equi`, all asserted) and `build.mjs` (decks, SVG figures, notes, flashcards, tests) |

## Scope (ISC 2027)

All four syllabus topics are covered:
- **t01** utility, TU and MU, and their relationship
- **t02** the Law of Diminishing Marginal Utility: statement, assumptions, schedule and diagram
- **t03** one-commodity equilibrium MUx = Px, and its link to the demand curve
- **t04** the Law of Equimarginal Utility and two-commodity equilibrium MUx ÷ Px = MUy ÷ Py = MUm

**Removed topic:** criticisms of the Law of Diminishing Marginal Utility are not taught or tested. Only the assumptions are, and the notes and exam tips say so.

### Decks
- **Part 1** (17 slides, 3 worked examples, 4 checks): utility; TU and MU; the TU curve and MU curve (SVG from the schedule, MU cutting the axis at satiety); the three phases; the law and its assumptions.
  - Worked examples: MU from TU (filter coffee); does the law apply? (three cases); TU from MU (coconuts).
- **Part 2** (18 slides, 3 worked examples, 4 checks): utility in money; MU = P; the equilibrium diagram (SVG); demand from MU; the equimarginal law and its assumptions; MU per rupee panels (SVG); adjustment; price changes.
  - Worked examples: lassi; Kabir's ₹18; a price rise for Tanvi's comics.
- **Visuals:** 25 of 35 slides carry one (4 SVG, 15 tables, 6 flows), with never more than 3 slides in a row without one.
- **Narration:** at most 72 words a slide, with no symbols.

### Question bank (73 items, 151 marks)

| Type | Count |
|---|---|
| mcq | 23 (keys a6 b5 c6 d6) |
| assertion-reason | 6 (keys a b c a a d; ISC options with (d) "Both Assertion and Reason are false") |
| true-false | 4 |
| fill-blank | 2 |
| numerical | 6 |
| match | 1 |
| ordering | 1 |
| short 2-mark | 8 |
| short 3-mark | 10 |
| long 5-mark | 5 (set in parts) |
| case-based | 3 (internal choice in part c) |
| **ISC paper style** | 2 four-mark items (2 + 2) and 2 eight-mark items (4 + 4), in the bank only |

- **Difficulty:** d1 12, d2 25, d3 30, d4 6.
- **Competency:** recall 10, understanding 20, application 19, analysis 21, evaluation 3. That puts 59% of items and 72% of marks at application or above.

## Data
All data sets are imagined and labelled, and every figure is computed and asserted in `questions.mjs`:

| Data set | Scenario | Figures |
|---|---|---|
| Jalebi | Jaipur fair | TU 20…56, MU 20, 16, 12, 8, 4, 0, −4; satiety at the 6th plate; equilibrium 4 plates at ₹8 |
| Filter coffee | Chennai canteen | — |
| Lassi | Amritsar dhaba | MU in ₹ 70, 50, 30, 10, −10; 3 glasses at ₹30 |
| Coconuts | Goa | 1 util = ₹2; 3 coconuts at ₹20 |
| Toffee and balloons | Kabir, Lucknow village fair | ₹18; 3 + 3 at MUm 6 |
| Comics and puzzle books | Tanvi, Pune book fair | ₹45; 3 + 3 at MUm 8 |
| Canteen coupons | Riddhi | — |
| Tea tasting | Darjeeling | — |

The SVG curves are plotted from the same arrays. No textbook pizza, ice-cream or orange table and no ISC specimen or past-paper item is reused.

## Verifier pass
- **Build:** NO ERRORS, with lint at 0 errors and 0 warnings. Two rebuilds give byte-identical `release.json` and `tests.json`.
- **SVG labels:** a script finds no overflow or overlap in the 4 figures.
- **Near-duplicate scan:** 73 stems against 18,189 other stems in `content/authored` and the exemplars, using the originality gate's words and 5-gram Jaccard ≥ 0.7, found 0 near or exact matches.

## For a reviewer
- `ar_ldmu_homog` is keyed (b): R only defines MU and does not explain the homogeneity assumption. `ar_emu_equalmu` is keyed (d) (both false), per the ISC option set.
- The constant marginal utility of money is presented as an assumption. `m_ldmu_money` treats it as reasonable when the good takes a small share of income.
- Kabir's prices (toffee ₹2, balloons ₹4) are small on purpose, so the MU per rupee stays whole. The canteen case uses coupons.
- The 4- and 8-mark items follow the ISC 2027 Economics specimen shape (catalog `isc-2027-specimen-856-economics`). They are kept in the bank for a future subject blueprint, because the isc-12-default blueprints use 2/3/5-mark items.
- Nobody has seen the SVG figures rendered, so they need a look at 360 px on staging.
