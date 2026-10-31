# ISC Class 12 Mathematics — Chapter 17: Probability (authored, v1)

This is a hand-authored production chapter (DECISIONS D-025, D-026). It follows the pattern of `isc-12-mathematics-ch01` and `isc-12-mathematics-ch16`.

- **Author and provenance:** `claude-opus-5-5 (subject-producer)`, provenance `origin: "human"`, `model: null`. Every item is `status: "draft"` until review.
- **Builders:** from the shared ISC 12 lib `isc-12-mathematics-ch01/src/lib.mjs`, imported and not edited.
- **Probability arithmetic:** `src/prob.mjs` is a copy of `cbse-12-mathematics-ch13/src/prob.mjs`, with its import switched to the ISC lib. It provides exact fractions, enumerated sample spaces, ordered draws without replacement, and tree, Venn and partition figures.
- **Build:** from `platform/`, run `npx tsx content/authored/maths/isc-12-mathematics-ch17/src/build.mjs`. Edit `src/`, never the JSON.

## Scope (ISC 2027, Unit 7 Probability)
- **t01:** laws of probability, the addition theorem and conditional probability, using a two-way survey table, reduced sample spaces, cards, dice and raffle tokens.
- **t02:** the multiplication theorem for successive draws with and without replacement, and independent and dependent events (the product-rule test, complements, at least one).
- **t03:** the theorem of total probability: a bolt factory with three machines, a commuter's three routes, two crates of mangoes (with a transfer between crates), a rain forecaster, a quiz guesser and a cattle test.
- **t04:** Bayes' theorem, with priors and posteriors, Bayes tables, a rare-condition test, and how evidence raises or lowers a probability.
- **t05:** random variables, probability distributions (validity checks, finding $k$) and the mean.
- **Not taught:** the syllabus lists no removed topics for this chapter. The binomial distribution and variance are not in the ISC 2027 list and appear nowhere.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Conditional probability, the multiplication theorem and independence" (t01–t02), 19 slides; Part 2 "Total probability, Bayes' theorem and random variables" (t03–t05), 20 slides |
| Worked examples | 4 + 6, each recomputed and asserted in `build.mjs` |
| Visuals | 31 of 39 slides carry one: 20 tables, 5 flows, 4 tree, Venn or partition figures, and 2 distribution bar charts. No two slides in a row lack a visual. |
| Check slides | Part 1: m05, tf1, m04, fb2. Part 2: m18, fb3, n03, tf4. None is used in a test. |
| Notes | 6 sections, each with key terms, formulas and visuals; exam tips with the mark split and common mistakes |
| Flashcards | 30 |
| Questions | 68 items worth 121 marks (see the table below) |
| Difficulty | d1 12, d2 30, d3 22, d4 4 |
| Competency | recall 3, understanding 27, application 27, analysis 8, evaluation 3: 56% of items and 74% of marks at application or above (lint band 45–65%). Fifteen routine one-step items (direct substitution into a formula, or a count read off given data) are tagged understanding under the D-035 rule. |
| Tests | `t_isc12math_ch17_short` (20 marks, 50 min) and `_long` (40 marks, 100 min) on `isc-12-default-chapter-test-short` / `-long`, item for item including the internal-choice groups. The two tests are disjoint. |

| Type | Count |
|---|---|
| mcq | 24 (keys a6 b6 c6 d6) |
| assertion-reason | 6 |
| true-false | 4 |
| fill-blank | 4 |
| numerical | 5 |
| short 2-mark | 9 |
| short 3-mark | 10 |
| long 5-mark | 6, each set in parts |

## How the answers are checked
- **Exact arithmetic:** every key is computed with exact fractions and then confirmed a second way.
- **Finite experiments:** dice, coins, cards, tokens, tea packets, bulbs and committees are checked by enumerating every equally likely outcome. Ordered draws without replacement are generated in full.
- **Total probability and Bayes:** each problem is rebuilt as a whole-number population (1000 bolts, 120 days, 100 days, 1000 animals, 25 questions, 24 mangoes). The total probability and every posterior are recounted directly in it, and the posteriors are checked to add to 1.
- **Distributions:** every distribution is checked to add to 1. Every mean is recomputed as the average of $X$ over the sample space.
- **MCQ options:** each is evaluated so that exactly one equals the re-solved value.
- **Results:** 125/125 re-solve checks pass. KaTeX strict mode parses all 939 maths strings. Lint shows 0 errors and 0 warnings.
- **Originality:** a near-duplicate scan using the originality gate's rule (5-gram Jaccard 0.7 or more, maths stripped), over 14,075 stems in the repo, finds 0 pairs and 0 exact matches with this chapter.

## For a reviewer
- **`ar5`:** keyed (b). The values $x/6$ add to 1, so A is true. R (each probability lies in [0, 1]) is true but does not by itself make a distribution.
- **`ar4`:** keyed (a). It uses the fact that a posterior exceeds its prior exactly when $P(A \mid E_i) > P(A)$; the notes state this.
- **Quiz items:** the quiz-guessing items (`n02`, `s307`) use a familiar structure with our own numbers: knows with probability 3/5, five options.
- **Cattle test:** the items (`n05`, `s306`, `l02`) ask for a judgement on a modest posterior. `s306` and `l02` are tagged evaluation.
- **Scenarios:** all are imagined and labelled as such: a Dehradun survey, a Siliguri tea box, a Lucknow badminton camp, a Ludhiana bolt factory, a Pune commuter, a Kochi forecaster, a Wayanad herd, Ratnagiri crates and a Jaipur carton. No NCERT or ISC textbook example and no past-paper item is reused (D-036).
- **Rendering:** nobody has seen the tree diagrams and bar charts rendered, so they need a look at 360 px on staging.
