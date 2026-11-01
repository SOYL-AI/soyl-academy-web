# ISC Class 12 Economics, Chapter 10 — Market Forms and Equilibrium of a Firm under Perfect Competition

`isc-12-economics-ch10` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) in the ISC 12 Economics pattern set by ch01–ch08. To build it, run `npx tsx content/authored/economics-commerce/isc-12-economics-ch10/src/build.mjs` from `platform/`. The build uses the shared lib `isc-12-economics-ch01/src/lib.mjs`, which it imports rather than copies. Edit `src/`, not the JSON.

The build checks:
- the schema;
- the pipeline lint and the deterministic verify checks;
- word limits and narration rules;
- the answer-leak scan;
- the exact-stem originality pre-check against every authored chapter.

| File | What |
|---|---|
| `release.json` | 2 decks of 16 + 16 slides with 24 visuals (6 SVG figures; the rest tables and flows); 6 notes sections; 30 flashcards; 73 questions worth 150 marks |
| `tests.json` | `t_isc12economics_ch10_short` (20 marks, 50 min) on `isc-12-default-chapter-test-short` and `t_isc12economics_ch10_long` (40 marks, 100 min) on `isc-12-default-chapter-test-long`. Both follow their blueprint item for item, including the internal-choice groups. They are disjoint and use no deck-check item. |
| `src/` | `questions.mjs` (bank, imagined data and asserts) and `build.mjs` (decks, SVGs, notes, cards, tests) |

## Scope (ISC 2027 syllabus)

All five topics are covered:
- **t01** features of perfect competition; the firm as a price taker (AR = MR = price)
- **t02** monopoly and monopolistic competition: features and comparison; product differentiation and selling costs
- **t03** oligopoly (interdependence, indeterminate demand) and monopsony (meaning only)
- **t04** short-run equilibrium of a competitive firm: MC = MR with MC rising; supernormal profit, normal profit and loss; the break-even point (P = minimum AC) and the shut-down point (P = minimum AVC)
- **t05** long-run equilibrium, explained in words only

**Removed topics:** there is no long-run equilibrium diagram; t05 is explained through entry and exit only. Monopsony is given its meaning and an example, nothing more.

### Decks

- **Part 1** (market forms): 16 slides with 4 checks.
  - Worked example 1: identifying a market form from evidence.
  - Worked example 2: differentiating a product.
  - SVG figures: the industry–firm two-panel diagram, and the demand curves of three forms.
- **Part 2** (equilibrium): 16 slides with 4 checks.
  - Worked example 1: output decisions from a cost schedule at three prices.
  - Worked example 2: placing prices against minimum AVC and minimum AC.
  - SVG figures: supernormal profit, normal profit, a loss while still producing, and the shut-down point.
- **Narration:** at most 70 words per slide (mean 46), with no symbols or abbreviations.

### Question bank (73 items)

| Type | Count |
|---|---|
| mcq | 23 |
| assertion-reason (ISC options, (d) both false) | 7 |
| true-false | 4 |
| fill-blank | 3 |
| numerical | 4 |
| match | 1 |
| ordering | 1 |
| short 2-mark | 10 |
| short 3-mark | 9 |
| long 5-mark | 5 |
| 4-mark ISC paper style (2 + 2), bank only | 2 |
| 8-mark ISC paper style (4 + 4), bank only | 2 |
| case-based, each with an internal choice | 2 |

- **Difficulty:** d1 8, d2 30, d3 29, d4 6.
- **Competency:** recall 4, understanding 28, application 17, analysis 21, evaluation 3. That puts 56% of items at application or above.

## Data

Every figure is imagined, computed in `questions.mjs` and asserted.

**Rajkot brass-fittings unit.** TFC is 72, TVC = Q³ − 10Q² + 40Q, Q is in hundreds and costs are in ₹ hundred.
- Minimum AVC is 15 at Q = 5, the shut-down point.
- Minimum AC is 28 at Q = 6, the break-even point.
- At P = 47, Q = 7, TR = 329, TC = 205 and profit = 124; AC is about 29.29.
- At P = 20, Q ≈ 5.44, with AVC (about 15.19) below P and AC (about 28.43) above it, so there is a loss but the unit produces.

**Erode turmeric-powder unit.** TFC is 36 and MC is 24, 18, 15, 18, 24, 33.
- At 33: output 6 and profit 30.
- At 24: output 5 and a loss of 15, which is less than TFC, so it produces.
- At 18: the best output loses 39, which is more than TFC of 36, so it shuts down. Minimum AVC is 18.75.

**Brute-force check:** a profit search over every output confirms the chosen outputs.

## For a reviewer

- **Equilibrium convention:** MC = MR with MC rising. At ₹33 the turmeric unit's profit is 30 at both output 5 and output 6, since the 6th hundred packets adds nothing; the items use output 6, where MC = MR.
- **`m_mc_falling`:** explains why the 1st hundred packets is not the equilibrium, even though MC = P there.
- **`ar_olig_selling`:** keyed (b), because "only a few sellers" is true but does not explain the heavy advertising. `ar_monopsony_seller` is keyed (d), both false.
- **`m_monop_demand`:** treats the monopolistically competitive firm's demand as more elastic than a monopolist's, which is the usual classroom statement.
- **Originality:** no real company is named. The ISC 2027 specimen's app-cab oligopoly and soap monopolistic-competition items are not reused, and every scenario is imagined and labelled.
- **Rendering:** nobody has seen the SVG labels rendered, so they need a look at 360 px on staging, especially the four cost and revenue diagrams with three curves and a price line.
