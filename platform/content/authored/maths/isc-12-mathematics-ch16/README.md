# ISC Class 12 Mathematics — Chapter 16: Linear Programming (authored, v1)

This is a hand-authored production chapter (DECISIONS D-025, D-026). It follows the pattern of `isc-12-mathematics-ch01` and `isc-12-mathematics-ch11`.

- **Author and provenance:** `claude-opus-5-5 (subject-producer)`, provenance `origin: "human"`, `model: null`. Every item is `status: "draft"` until review.
- **Builders:** from the shared ISC 12 lib `isc-12-mathematics-ch01/src/lib.mjs`, imported and not edited.
- **LP arithmetic:** `src/lp.mjs` is a copy of `cbse-12-mathematics-ch12/src/lp.mjs`. It finds corners by intersecting every pair of boundary lines and keeping the feasible points, evaluates $Z$ at the corners, cross-checks every optimum by a brute-force grid search of the region, and applies the half-plane test on unbounded regions.
- **Build:** from `platform/`, run `npx tsx content/authored/maths/isc-12-mathematics-ch16/src/build.mjs`. Edit `src/`, never the JSON.

## Scope (ISC 2027, Unit 6 Linear Programming)
- **t01 Terminology, uses and types:** decision variables, objective function, constraints, non-negativity, optimisation; advantages, limitations and application areas; the manufacturing, diet and transportation types.
- **t02 Formulation:** two-variable models of manufacturing problems (an imagined Anand dairy, a Kanchipuram handloom unit, a Jaipur jeweller), diet problems (an Imphal school canteen, poultry feed), and a transportation-type problem (two Satna cement depots supplying three sites, reduced to two variables).
- **t03 Graphical method:** half-planes and the origin test; bounded, unbounded and empty regions; up to three non-trivial constraints.
- **t04 Corner point method:** the corner point theorem; the half-plane test on unbounded regions; cases with no optimum; infinitely many optimal solutions.
- **Removed topic:** no problem uses more than two variables or more than three non-trivial constraints. The build asserts this for every region.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Terms, models and feasible regions" (t01–t03), 19 slides; Part 2 "Optimal solutions by the corner point method" (t03–t04), 17 slides |
| Worked examples | 2 + 4, each recomputed in `build.mjs` |
| Visuals | 28 of 36 slides carry one: 9 region plots, 13 tables, 6 flows. No two slides in a row lack a visual. |
| Check slides | Part 1: m07, fb1, n4, tf2. Part 2: m17, tf3, fb3, m16. None is used in a test. |
| Notes | 6 sections with key terms, formulas and visuals; exam tips with the mark split and common mistakes |
| Flashcards | 30 |
| Questions | 68 items worth 121 marks (see the table below) |
| Difficulty | d1 18, d2 25, d3 22, d4 3 |
| Competency | recall 6, understanding 25, application 23, analysis 13, evaluation 1: 54% of items and 69% of marks at application or above (lint band 45–65%) |
| Tests | `t_isc12math_ch16_short` (20 marks, 50 min) and `_long` (40 marks, 100 min) on `isc-12-default-chapter-test-short` / `-long`, item for item including the internal-choice groups. The two tests are disjoint. |

| Type | Count |
|---|---|
| mcq | 24 (keys a6 b6 c6 d6) |
| assertion-reason | 6 (keys a c d b a c) |
| true-false | 4 |
| fill-blank | 4 |
| numerical | 5 |
| short 2-mark | 9 |
| short 3-mark | 10 |
| long 5-mark | 6, each set in parts |

## Verifier record
- **Re-solve:** 116/116 checks pass (`src/resolve.log`, gitignored).
  - Every corner set, corner value and optimum is recomputed by `lp.mjs`.
  - Every formulation is compared with the word problem at 3,721 lattice points.
  - Every "no optimum" claim is backed by a feasible point that beats the best corner.
  - Every MCQ option is evaluated so that exactly one matches.
- **Plots:** 76 marked points all lie on their lines (or are marked off-curve, like the origin); 18 marked zeros are verified; 20 intersection points lie on both lines.
- **KaTeX:** 1,182 maths strings parse in strict mode.
- **Originality:**
  - The lib's exact-stem pre-check passes against every authored chapter.
  - A near-duplicate scan with the originality gate's own rule (5-gram Jaccard ≥ 0.7, maths stripped) over 13,940 stems finds 0 pairs involving this chapter.
  - All regions, objectives and contexts differ from the CBSE 12 ch12 bank.
- **Lint and verify:** stage-4 lint shows 0 errors and 0 warnings; the stage-5 deterministic checks raise 0 blocking flags. A rebuild is byte-identical.

## Facts for a reviewer
- **Transportation-type problem:**
  - Depots P (100 t) and Q (140 t) supply sites A (50 t), B (70 t) and C (120 t).
  - Site C's demand makes the shipment Q to C $= 20 + x + y$ automatically non-negative, so the problem stays within three non-trivial constraints.
  - The cost works out to $1320 - 2x + 2y$ (₹ hundred), with its minimum $1220$ at $(50, 0)$, that is ₹1,22,000.
- **`tf1`:** says the variables may take fractional values (divisibility), using the corner $(0, 6.5)$ of the dairy region as evidence.
- **AR keys:** `ar4` is keyed (b), because the point lying on a boundary line does not explain why it is optimal. `ar6` is keyed (c).
- **`m24`:** the bounded-region item uses $x - y \le 2$ as an unbounded distractor.
- **Rendering:** nobody has seen the region plots and the vertical boundary lines (`vlines`) rendered, so they need a look at 360 px on staging. The shading of regions is described in the alt text and captions, because plots do not shade.
