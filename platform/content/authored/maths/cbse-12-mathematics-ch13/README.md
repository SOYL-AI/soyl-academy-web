# CBSE Class 12 Mathematics — Chapter 13: Probability (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) written to the maths exemplar standard and the
CBSE 12 conventions of `cbse-12-mathematics-ch01` (shared lib `../cbse-12-mathematics-ch01/src/lib.mjs`).
Author: `claude-opus-5-5 (subject-producer)`, provenance `origin: "human"`, `model: null`. All items are
`status: "draft"` until review.

## Scope (2026-27 syllabus, Mathematics 041)
- **t01** Conditional probability: reduced sample space, the definition, properties (whole space, union, complement), P(A | B) versus P(B | A), two-way tables.
- **t02** Multiplication theorem and independent events: two and three events in sequence, draws with and without replacement, tree diagrams, the product test for independence, complements of independent events, "at least one", independence versus mutual exclusion.
- **t03** Theorem of total probability and Bayes' theorem: partitions, priors, likelihoods and posteriors, trees and natural-frequency tables, base-rate effects.
- **Removed topics absent:** random variables, probability distributions, mean and variance of a random variable, Bernoulli trials and the binomial distribution are not taught or asked anywhere. They are named only as "not in the 2026–27 syllabus" in notes section 7 and flashcard f30.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Conditional probability and independence" (t01–t02) 21 slides; Part 2 "Total probability and Bayes' theorem" (t03) 19 slides |
| Worked examples | 5 + 5 (two dice with at least one six; Jaipur two-way table; Ludhiana bulbs without replacement; three draws in a row; Pune servers "at least one"; two bags by a coin; Chennai courier routes; which bag; Pune screening test; Hyderabad call-centre shifts) |
| Visuals | 29 of 40 slides (tables, tree diagrams and a Venn/partition as geometry, flows, one plot of posterior against prior); never more than 1 slide in a row without a visual; every notes section has a visual |
| Check slides | 4 + 3, all objective (m03, m06, tf1, m12; m18, m16, tf5); none is used in a chapter test |
| Notes | 7 sections with key terms, formulas and a visual each; exam tips with mark split and 8 common mistakes |
| Flashcards | 30 (formula 7, exam-tip 5, concept 4, fact 4, example 4, definition 4, diagram 2) |
| Questions | 68 items, 129 marks: mcq 18, assertion-reason 6 (keys a c d b a d), true-false 5, fill-blank 5, numerical 7, short-2 9, short-3 8, long-5 6, case-based 4 (each 1 + 1 + 2 with an either/or part (c) via `alternatives`) |
| Difficulty | d1 10, d2 33, d3 20, d4 4, d5 1 |
| Competency | recall 3, understanding 26, application 27, analysis 12 — application or higher 57% of items, 73% of marks (lint band 45–65%) |
| Topics | t01 26, t02 30, t03 21 (an item can carry two topics) |
| Tests | `t_cbse12math_ch13_short` (20 marks / 40 min, 10 items) and `_long` (40 marks / 90 min, 22 items), matching `cbse-12-default-chapter-test-short/long` section by section; disjoint |

## Verifier record
Build and checks: `src/build.mjs` (decks, notes, flashcards, tests; every worked example, table and tree is recomputed and the build throws on a mismatch), `src/questions.mjs` (bank + one independent re-solve check per item), `src/prob.mjs` (exact fractions, sample-space enumeration, tree/Venn/partition figures). Run from `platform/`:
`npx tsx content/authored/maths/cbse-12-mathematics-ch13/src/build.mjs`; lint only this chapter with
`npx tsx content/authored/maths/cbse-12-mathematics-ch01/src/lint.mts content/authored/maths/cbse-12-mathematics-ch13`.

- **Re-solve:** 124/124 checks pass (`src/resolve.log`). Every key is recomputed with exact rational arithmetic; wherever the sample space is finite it is also enumerated: two dice (36), three coins (8), the 52-card pack including all 2652 ordered two-card draws, bags with and without replacement, and the 72 equally likely transfer-then-draw outcomes of l05. Bayes items compute the total probability and each posterior separately and check that posteriors add to 1. Proof-style items (s305, ar2, tf2, tf3) have numeric spot checks on concrete events.
- **Build:** NO ERRORS; rebuilding gives byte-identical `release.json`, `tests.json` and `resolve.log`.
- **Lint:** stage-4 lint on this chapter: 0 errors, 0 warnings (no competency-band warning).
- **Verify / originality (chapter-local):** the stage-5 deterministic checks report 68 questions, 0 flags; the bank duplicate rule finds 0 flags within the chapter and 0 flags between this chapter and the other 8,000+ authored questions.
- **KaTeX / backslashes:** all maths parses in strict mode; a scan of every `$…$` span found no `cap`, `cup`, `mid`, `frac`, `text` and similar commands without their backslash.
- **Originality:** all contexts and numbers are new (Jaipur sports survey, Ludhiana bulbs, Pune servers and health camp, Chennai courier routes, Hyderabad call centre and courier vans, Jorhat tea gardens, Lucknow clinic, a Kolkata T20 team, Mumbai commuters, Varanasi language survey, Kota hostel, Bhopal school, Dehradun NCC camp, Delhi LED suppliers, Rajkot pumps). The textbook's signature set-ups (three machines making bolts, the doctor's mode of transport, the insured scooter/car/truck drivers, the "speaks the truth" die report, A/B/C solving with 1/2, 1/3, 1/4, the 7/13 and 9/13 givens) were deliberately avoided.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Tree diagrams are `geometry` figures with maths in point and segment labels (`not_to_scale`); a renderer must typeset `$…$` labels.
- Table cells use inline KaTeX.
