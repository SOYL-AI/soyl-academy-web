# ISC Class 11 Mathematics - Chapter 19: Probability (authored, v1)

Hand-authored production chapter (D-025, D-026, D-050) for ISC 2028 Class XI Mathematics, Unit 5: Statistics and Probability.

- **Author:** `claude-sonnet-5-5 (subject-producer chapter writer)`, provenance `origin: "human"`.
- **Status:** all items are `status: "draft"`.
- **Shared library:** `src/lib.mjs` is the ISC 11 Mathematics builder lib (copied unchanged from the ch12 version, with the ISC 2027 specimen assertion-reason options). Its `build()` runs the KaTeX, narration, plot and scheme checks, the pipeline's stage-4 lint and stage-5 deterministic checks, and the exact-stem originality pre-check against every other authored chapter. `src/prob.mjs` holds the exact arithmetic (rationals on BigInt, finite sample spaces, the addition-theorem and complement cross-checks) and `src/vis.mjs` the visuals with their assertions.

## Scope (syllabus `isc-11-mathematics-ch19`, no removed topics)

- **t01** Random experiments; outcomes and sample spaces in set notation (coins, four-sided dice, tiles, bags, two-stage experiments with tree diagrams and grids); counting outcomes with the product rule and combinations, and the effect of order and of returning items.
- **t02** Events: sure, impossible, simple and compound; not, and, or as complement, intersection and union; "but not", "neither", "not both" and "exactly one" in set symbols; mutually exclusive and exhaustive events, tested separately.
- **t03** Axiomatic (set-theoretic) probability: the three axioms, valid and invalid assignments to the outcomes, unknown constants from the total of 1, non-uniform models (loaded dice, two-stage outcomes with given probabilities), and the link with classical probability for equally likely outcomes, with combinations for selections made together.
- **t04** P(not A) = 1 - P(A) including "at least one"; the addition theorem with tables of the four regions, "exactly one", "neither", "A but not B" and "not both"; the three-event extension as an optional d4/d5 item (slides labelled optional, one long item).
- **Scope decision:** conditional probability, independence, the multiplication theorem, Bayes' theorem and random variables belong to ISC 12 and are not taught or tested. In the two-stage models the probabilities of the outcomes are given in the stem; they are not derived from a conditional rule.

## Contents

| Item | Count |
|---|---|
| Decks | Part 1 "Sample spaces and events" (t01-t02), 22 slides; Part 2 "Axioms and the addition theorem" (t03-t04), 23 slides |
| Visuals | 39 of 45 slides have one (33 tables, 3 tree/route flows, 3 bar-chart plots); the 6 slides without one are the check slides, never more than 1 slide in a row without a visual. Venn diagrams are not in the plot spec, so regions are shown as tables and bar charts |
| Worked examples | 6 + 8, each recomputed and asserted |
| Check slides | 3 + 3 on objective items used in neither test: fb1, tf1, n1 (Part 1); fb3, tf3, n5 (Part 2) |
| Notes | 8 sections with key terms, formulas and visuals; exam tips with mark split and common mistakes |
| Flashcards | 32 |
| Questions | 70 items worth 130 marks: 20 mcq, 6 assertion-reason, 5 true-false, 5 fill-blank, 6 numerical, 10 short-2, 11 short-3, 7 long-5 (in parts, 5 scheme steps each) |
| Topics | t01 12 items, t02 19, t03 21, t04 30 (items tagged with more than one topic count in each) |
| Difficulty | d1 8, d2 19, d3 33, d4 9, d5 1 |
| Competency | recall 3, understanding 26, application 29, analysis 11, evaluation 1: application or higher is 59% of items and 73% of marks |
| MCQ keys | a 5, b 5, c 5, d 5; assertion-reason keys a b c d a c |
| Tests | `t_isc11math_ch19_short` and `t_isc11math_ch19_long` (details below) |

**Short test** (`t_isc11math_ch19_short`), 20 marks in 50 minutes:
- Section A: m01, m05, m10, m14 and ar1.
- Section B: s201, then s204 or s208.
- Section C: s311, then s305 or s306.
- Section D: l01.

**Long test** (`t_isc11math_ch19_long`), 40 marks in 100 minutes:
- Section A: m03, m06, m07, m08, m11, m12, m15, m16, m18, m19, ar2 and ar3.
- Section B: s202, s205, then s209 or s207.
- Section C: s301, s303, s308, then s304 or s309.
- Section D: l02, then l04 or l07.

The tests are disjoint, contain no deck-check item, and follow the `isc-11-default` blueprints item for item; each spans topics t01 to t04. Spare practice items: m02, m04, m09, m13, m17, m20, ar4 to ar6, tf2, tf4, tf5, fb2, fb4, fb5, n2, n3, n4, n6, s203, s206, s210, s302, s307, s310, l03, l05 and l06.

## Verifier record (what the build computes and asserts)

- **Enumeration with exact rationals.** Every probability, count and event set is computed by enumerating a finite sample space (`Space` in `prob.mjs`, weights as BigInt fractions, equally likely or given): coin sequences, ordered pairs of four-sided dice, two-digit numbers from the digits 1 to 4, a 12-card game set, tiles in bags, selections made with `subsets` and `arrangements`. The sets quoted in model answers (for example the 12 ordered pairs of tiles, or $A \cap B$ for the two-digit numbers) are generated from the enumeration and not typed.
- **Addition theorem against counting.** `addOK` computes P(A or B) by counting the union and compares it with P(A) + P(B) - P(A and B); in the same call it checks P(not A) = 1 - P(A), P(A but not B) = P(A) - P(A and B) and P(neither) = 1 - P(A or B). `addOK3` does the same for the three-event formula. These are asserted in the worked examples, the short and the long items, and on a model with unequal weights as well as equally likely ones.
- **Combinations.** The values of $\dbinom{n}{r}$ used in the text (for example 20, 56, 126) are compared with the lists produced by `subsets`, and ordered counts with `arrangements`.
- **Validity of assignments.** `assignVerdict` tests the non-negativity and the total of every proposed assignment, and the check names the rule that fails; the case of a negative value with total 1 is asserted separately.
- **Unknown constants by search.** The values of $x$ and $k$ in the assignment items are found by search over a grid and compared with the algebraic answer; the least possible overlap of events with P(A) = 0.7 and P(B) = 0.6 is found by search over all joint models in steps of 0.01 (0.30 to 0.60), and the overlap 0.45 in the "neither" item by the same kind of search.
- **Properties of events.** For all 16 x 16 pairs of events of a four-outcome model, P(A or B) is at most P(A) + P(B), and the sum of two mutually exclusive probabilities is at most 1 (asserted by enumeration).
- **Distractors** are each computed from their own wrong method (for example omitting the overlap, adding the overlap, subtracting it twice, reading P(A') as the answer, ordered instead of unordered counts, the probability of a particular order, the complement taken for the event itself) and asserted to be wrong. Option letters are rotated by the lib; each distractor explanation names its option by its value.
- **Plots:** the three bar charts are built from the computed counts and probabilities; the sums of two four-sided dice (1, 2, 3, 4, 3, 2, 1 pairs) are asserted by enumeration.
- **Re-solve checks:** 140 of 140 pass. KaTeX parses 2018 maths strings in strict mode.
- **Stage-4 lint:** 0 errors, 0 warnings. `verify-local`: 70 questions, 0 flags. Doubled-backslash scan: total 0. Originality gate: 0 errors. Rebuild is byte-identical (md5 of `release.json` and `tests.json`).

## Originality notes

- The bank already holds CBSE 11 Mathematics ch14 Probability and the CBSE 9, CBSE 10, CBSE 12 and ISC 12 probability chapters. Their set-ups are not reused: no standard pack of 52 cards, no "a die is thrown" stem, no numbered spinners, no coin tossed four times in order for an "at least one head" item, no STATISTICS letter card, no household survey of 200, and no committee from a club of seven. The chapter uses a four-sided die, a 12-card imagined game set, tiles in bags with colours, two-digit numbers from the digits 1 to 4, the letters of ARITHMETIC, lamps, a hostel, a market survey, a school of 120 pupils and a loaded die with probability proportional to j squared or to 5 - j.
- One stem matched a CBSE 11 stem word for word once the numbers were removed (the "neither A nor B" item with mutually exclusive events); it was reworded and the gate reports 0 errors.
- Reasoning items (the axioms, the addition theorem from the axioms, mutually exclusive versus exhaustive, valid assignments that sum to 1 but contain a negative value) are original wordings of standard facts. No CISCE specimen or past-paper question is reproduced; the specimen papers are used for the paper pattern and the assertion-reason options only. All people and places are imagined or absent.

## Known gaps

- Venn diagrams are not available in the plot spec; regions are shown as two-way tables, counts tables and bar charts instead.
- No case-based item (the ISC 11 blueprints have no case-based slot).
- Conditional probability, independence, Bayes' theorem and random variables are intentionally left to ISC 12.
- The two-stage models with unequal outcome probabilities (l07) give the probabilities in the stem; a tree diagram with multiplied branch probabilities is not used, since that is the multiplication theorem of ISC 12.
