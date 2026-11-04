# CBSE Class 11 Mathematics — Chapter 14: Probability (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026, D-050) written to the maths exemplar standard and the structure of the CBSE 12 Mathematics chapters. Author: `claude-sonnet-5-5 (subject-producer chapter writer)`, provenance `origin: "human"`, `model: null`. All items are `status: "draft"` until review.

`src/lib.mjs` and `src/lint.mts` are the shared CBSE 11 Mathematics copies, unchanged. `src/space.mjs` holds the exact helpers (integer-ratio fractions with safe-integer assertions, sample-space enumeration for dice, coins, ordered and unordered selections, event algebra on arrays of outcomes, weighted outcomes, and the `laws()` check that asserts the addition theorem, complement rule, A minus B, neither (De Morgan), exactly one and the exclusive/exhaustive tests on each instance). `src/visuals.mjs` holds every figure with its self-checks.

## Scope (2026-27 syllabus, 041)
- **t01** Events: simple, compound, sure and impossible events; the algebra of events (or, and, not, but not, neither); mutually exclusive and exhaustive events; partitions of the sample space.
- **t02** Axiomatic approach: the three axioms, assigning probabilities to elementary events (including an unknown `x`), equally likely outcomes as a special case, `P(not A) = 1 - P(A)`, `0 <= P(E) <= 1`, the addition theorem `P(A or B) = P(A) + P(B) - P(A and B)` and its consequences (neither, A but not B, exactly one, the exclusive case, a lower bound on `P(A and B)`).
- **t03** Random experiments, outcomes and sample spaces is `board_assessed: false` (formative only) and is kept light: one concept slide (how to count outcomes), one worked example, one notes section, three flashcards and a few short items (14 items carry the topic, most of them together with t01 or t02).
- Not covered (Class 12): conditional probability, independence, multiplication rule, Bayes theorem, random variables. Mathematical Reasoning and Induction do not appear.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Sample spaces and events" (t03, t01) 19 slides; Part 2 "The axiomatic approach" (t02) 18 slides |
| Worked examples | 4 + 4 |
| Visuals | 27 of 37 slides (22 tables, 3 Venn/partition figures, 2 flow charts); max 1 slide in a row without one (the check slides and exam-tips). Notes: 8 sections, each with 1 to 6 visuals |
| Check slides | 4 + 4, all objective (m01 tf1 m02 fb1; tf2 m04 fb2 n1), none used in the tests |
| Notes | 8 sections with key terms, formulas and visuals; exam tips with mark split and 7 common mistakes |
| Flashcards | 30 (formula 11, definition 10, exam-tip 5, concept 3, fact 1) |
| Questions | 68 items, 138 marks: mcq 18, assertion-reason 6 (keys a b c d a c), true-false 5, fill-blank 5, numerical 6, short-2 9, short-3 8, long-5 7, case-based 4 (each 1 + 1 + 2 with an either/or part (c)) |
| MCQ keys | a 6, b 6, c 5, d 5 (rotated by the build) |
| Difficulty | d1 6, d2 27, d3 26, d4 9 |
| Competency | recall 3, understanding 26, application 33, analysis 6: application or higher 57 % of items, 72 % of marks |
| Topics | t01 23 items, t02 52, t03 14 (items may carry two topics) |
| Tests | `t_cbse11math_ch14_short` (20 marks / 40 min: A m03 m09 m13 ar2; B s204 s205 s301; C l01 or l07; D c03) and `_long` (40 marks / 90 min: A m05 m06 m07 m08 m10 m12 m14 m16 + ar3 ar4; B s202 s207 [s206 s209] s303 [s305 s307]; C l02 [l04 l06]; D c01 c02), on `cbse-11-default-chapter-test-short/-long`; disjoint, no deck-check item used |

## Verifier record
Build from `platform/`: `npx tsx content/authored/maths/cbse-11-mathematics-ch14/src/build.mjs` (prints stats and `NO ERRORS`; rebuilding is byte-identical, md5 checked for `release.json` and `tests.json`).
Chapter lint: 0 errors, 0 warnings. `verify-local.mts`: 68 questions, 0 flags. `dblslash.cjs` over `content/authored/maths`: total 0. `npm run content -- originality --authored`: this unit `ok` (0 errors, 0 warnings).

- **Re-solve:** 156/156 checks pass (`src/resolve.log`). Every probability is computed by enumerating a sample space of equally likely outcomes (two dice, four coin tosses, ordered and unordered selections, tickets, letters of a word, a twelve- and a twenty-token box) or by adding exact fractions for weighted outcomes (lopsided spinners, a loaded die with `P(k) = k/21`). On every instance with two events the addition theorem, the complement rule, `A - B`, neither (De Morgan), exactly one and the exclusive/exhaustive tests are asserted by `laws()`. MCQ options are typed independently and must single out the key; the formula options of the addition theorem are tested against the true union, the "neither" options against the enumerated set. True-false claims about all events are checked exhaustively (e.g. `P(A or B) >= P(A)` for all 256 pairs of events of a four-outcome space); the bound `P(A and B) >= P(A) + P(B) - 1` is checked over all 25,200 pairs of a seven-outcome and a six-outcome event of a ten-outcome space (overlap ranges from 3 to 6, i.e. 0.3 to 0.6).
- **Build self-checks:** every set, count and probability in a figure is computed in `visuals.mjs` and the build throws on disagreement; the probability Venn regions add to 1.
- **KaTeX:** 1,515 maths strings parse in strict mode; no lost backslashes.
- **Narration:** 37 slides, max 87 words, mean 60; numbers in words, no symbols or abbreviations.

## Originality
CBSE 10 ch14, ICSE 10 ch24 and CBSE 12 ch13 stems were read first. Avoided: single die/card/bag/ball classical-probability items, "two dice sum is 7/9", three-coin items, red-king, face-card and Ludo set-ups, lucky-dip coupons, conditional probability and Bayes set-ups. This chapter works with events as sets, partitions, weighted (non-equally-likely) outcomes, ordered and unordered selections, and the addition theorem on several different spaces; every stem names its own content. NCERT examples and exercises were not used. Contexts are imagined (tea stall, quiz team, chess club, hostel, survey households, school clubs, fair wheel). The originality gate first flagged two near-duplicate numerical stems (m08 and n6); n6 was rewritten.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Venn region labels list outcomes as short text inside the regions; the figures are not-to-scale and are described in alt text.
- The probabilities of the tests' random-experiment items assume equally likely outcomes only where the stem says so; weighted spaces are always stated in the stem.
