# CBSE Class 11 Mathematics — Chapter 3: Trigonometric Functions (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026, D-050) written to the maths exemplar standard and the structure of the CBSE 12 Mathematics
chapters and of CBSE 11 chapters 1 and 2. Author: `claude-sonnet-5-5 (subject-producer chapter writer)`, provenance `origin: "human"`, `model: null`. All items are `status: "draft"` until review.

`src/lib.mjs` (builders, re-solve harness, validator, CBSE 11 chapter-test layout) and `src/lint.mts` are the shared CBSE 11 Mathematics copies, unchanged.
The shared lib stamps its own author string into provenance; `build.mjs` rewrites it to this chapter's author in `release.json` after the build.
`src/trig.mjs` holds this chapter's exact and floating-point helpers (surd arithmetic in Q(√2, √3) for every multiple of 15°, radian fractions, identity and period testers, tex printers); `src/figs.mjs` the figure builders (plots with free-point flags, unit-circle diagrams, sectors, quadrant diagram).

## Scope (2026-27 syllabus, 041)
- **t01** Angles in radians and degrees: full turn, the radian, conversions both ways, arc length $l = r\theta$, wheels and clock hands.
- **t02** Trigonometric functions via the unit circle: $P(\theta) = (\cos\theta, \sin\theta)$, any angle (positive, negative, above one turn), signs by quadrant, all six ratios from one ratio and the quadrant, standard values, domain, range, period and parity of sine, cosine and tangent, their graphs, and **allied angles** ($\pi/2 \pm x$, $\pi \pm x$, $2\pi - x$, $-x$).
- **t03** Sum and difference identities and multiple angles: $\cos(x - y)$ from two equal chords of the unit circle, all six sum and difference formulae (tangent with its conditions), exact values at multiples of $15^\circ$, double angle (three forms of $\cos 2x$, tangent form) and triple angle formulae, and proofs of identities.
- **t04** General solutions — `board_assessed: false`, so formative only: one deck slide on the three general-solution forms, one slide on why a sine equation has two solutions per turn, one worked example, one check slide, one notes paragraph and light item coverage (6 of 77 items touch t04, all but one are also t02 or t03 items).
- **Not taught (not a topic of this syllabus unit):** sum-to-product and product-to-sum formulae, half-angle formulae and the inverse trigonometric functions (Class 12). No removed topics occur in this chapter (the subject-level removed topics are not trigonometry).

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Angles, the unit circle and graphs" (t01, t02) 25 slides; Part 2 "Sum, difference and multiple angle formulae" (t03, t04) 22 slides |
| Worked examples | 4 + 5 (conversions; curved flower bed; six ratios from $\sin\theta = -\tfrac{11}{61}$; reducing angles; exact values at $15^\circ$; $\sin(x+y)$ from two given ratios; double angles from $\sin x = \tfrac{20}{29}$; $\tan 3x$ and $\cos 3x$; a sine equation, formative) |
| Visuals | 33 of 47 slides (table 17, geometry 7, plot 6, flow 3); max 1 slide in a row without a visual (goals, checks and exam-tips slides carry none). Notes and questions: table 19, plot 8, geometry 6 |
| Check slides | 5 + 5, all objective (m02, m05, m06, m08, fb4; m16, m17, m19, tf2, m22), none used in the chapter tests |
| Notes | 8 sections, each with key terms, formulas and a visual; exam tips with a mark split and 8 common mistakes |
| Flashcards | 30 (formula 13, fact 7, definition 3, example 3, concept 2, diagram 1, exam-tip 1) |
| Questions | 77 items, 145 marks: mcq 23, assertion-reason 6 (keys a c d b a d), true-false 6, fill-blank 6, numerical 7, short-2 9, short-3 8, long-5 7, case-based 5 (each 1 + 1 + 2 with an either/or part (c) via `alternatives`) |
| MCQ keys | a 7, b 7, c 7, d 7 (rotated by the build) |
| Difficulty | d1 11, d2 35, d3 24, d4 6, d5 1 |
| Competency | recall 4, understanding 25, application 40, analysis 8 — application or higher 62% of items, 78% of marks (lint band 45–65% of items) |
| Topics | t01 19 items, t02 30, t03 26, t04 6 |
| Tests | `t_cbse11math_ch03_short` (20 marks / 40 min: A m01 m10 m20 ar5; B s201 s205 s304; C l01 or l03; D c01) and `_long` (40 marks / 90 min: A 8 mcq (m03 m04 m07 m09 m12 m13 m14 m18) + ar2 ar6; B s202 s204 [s206 s207] s302 [s305 s306]; C l06 [l02 l05]; D c03 c05), on `cbse-11-default-chapter-test-short/-long`; disjoint, and no deck-check item is used |

## Verifier record
Build from `platform/`: `npx tsx content/authored/maths/cbse-11-mathematics-ch03/src/build.mjs` (prints stats and `NO ERRORS`; rebuilding is byte-identical, md5 checked twice for `release.json` and `tests.json`).
Lint this chapter: `npx tsx content/authored/maths/cbse-11-mathematics-ch03/src/lint.mts content/authored/maths/cbse-11-mathematics-ch03` (0 errors, 0 warnings).
`verify-local.mts` (numerical items need an "=" step ending at the key): 77 questions, 0 flags.

- **Re-solve:** 186/186 checks pass (`src/resolve.log`). Exact values (sin, cos, tan at any multiple of $15^\circ$, products, sums and quotients of them) are computed in $\mathbb{Q}(\sqrt{2}, \sqrt{3})$ with rational parts, so a key such as $\sin 75^\circ$ or $\cos 225^\circ\sin 300^\circ = \tfrac{\sqrt{6}}{4}$ is compared exactly; MCQ options with surds are generated from the computed elements (distractors are the results of the plausible wrong method: a lost sign, $\sin 15^\circ$ for $\sin 75^\circ$, a sum in place of a product). Fractions from given ratios ($\tan x = \tfrac{2}{5}$, $\sin x = \tfrac{20}{29}$ …) use exact rational arithmetic and are confirmed against the angle itself (`atan`, `asin`, `acos`). Every identity used in a key, an assertion-reason item or a model answer (addition, double and triple angle, allied angles, $|\sin x|$ period, $\sin x + \cos x = \sqrt{2}\sin(x + \tfrac{\pi}{4})$, $\sin 3x = 4\sin x\sin(60^\circ - x)\sin(60^\circ + x)$ …) is tested at 100 or more angles from a grid of 1,441 angles in all four quadrants, skipping undefined values. Equations (number of solutions, general solutions, times in the tide model, angles in the range model) are tested against numerically bracketed and bisected roots; periods are found as the smallest $k\pi/d$ that shifts the graph onto itself. Model answers of short, long and case items are asserted to contain the computed numbers.
- **Build self-checks:** every table value (conversions, signs by quadrant, standard values, allied rules, the sum-formula numerical check at $50^\circ$ and $20^\circ$, double and triple angle forms, all given-ratio examples) is computed in `build.mjs` or `trig.mjs` and the build throws on any disagreement. The sum, difference, double, triple angle and Pythagorean identities are checked **exactly** at all 24 × 24 pairs of multiples of $15^\circ$ (and 400+ tangent-sum pairs). The chord argument for $\cos(x - y)$ is checked numerically (equal chords, expanded squared length). The general-solution formulae are checked against numeric roots in $[-12, 12]$ for $a = 0.7$ and for $\sin x = -\tfrac{\sqrt{3}}{2}$.
- **Plots:** 87 marked points on their curves and matching their labels; 71 zeros located numerically and all marked (the sine, cosine, tangent, $\sin 2x$ and $\sin 3x$ graphs mark every zero in view; no zero sits on a left end point); 30 points on two curves checked on both. The tangent graph is drawn as three separate branches with dashed asymptotes (`vlines`); the two curves of the triple-angle graph coincide (asserted).
- **KaTeX:** 1,949 maths strings parse with KaTeX in strict mode; no lost backslashes, no LaTeX outside `$…$`; a scan of `release.json` found no bare `sin`, `cos`, `tan`, `frac`, `times`, `sqrt` or unit words inside `$…$` and no "degrees" after a degree sign.
- **Narration:** 47 slides, max 78 words, mean 55; numbers and symbols in words, no letter-digit mixes or capital abbreviations.
- **Stage-5 gates:** `npm run content -- originality --authored` reports this unit `ok` (0 errors, 0 warnings).
- **Fixes during the pass:** a distractor explanation in $m18$ that described a non-existent formula was rewritten; the first $\tan(x+y)$ solution lost a `$` in an interpolation and was caught by the build; fill-blank answers with LaTeX were replaced by a numeric blank; marking-scheme steps in two long answers were rounded to multiples of $0.5$ (schema); two exam-tips slides were cut to six bullets (schema).
- **Originality:** no NCERT example or exercise set-ups are reused, and no CBSE sample or past-paper questions. ICSE 10 chapter 20 (identities for acute angles, complementary angles, ratios such as $9/41$, $20/21$, $7/25$, $8/15$, $37/12$, $33/56$), CBSE 10 chapter 8 and CBSE 12 chapter 2 (inverse trigonometric functions, ramps, boats, ladders, a seat on a wheel) were read and avoided: this chapter works with angles of any size, radians, the unit circle, graphs, compound and multiple angles; it uses different triples ($11/61$, $8/17$, $20/29$, $2/7$, $12/13$ in quadrant IV, $13/5$ as a secant) (the triples 8/17 and 20/29 also occur in CBSE 12 chapter 2 inside inverse-function evaluations; the stems and tasks here are different and the originality gate is clean) and different contexts. Fresh contexts (all imagined): a garden sprinkler, a toy robot on a circular track, a harbour tide model, a signal-addition lab, a practice throw, a pendulum, a flywheel, a wall-clock minute hand, observatories on a meridian, a railway curve, a toy trolley wheel, a flower bed.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Plots cannot show open or closed end points or $\pi$ on the axis ticks; $\pi$ values are given in point labels, and the tangent graph shows its asymptotes as dashed vertical lines.
- The unit-circle figures are drawn for angles up to $180^\circ$ so that the drawn angle can be checked against its label; larger angles are handled in tables and in the text.
- General solutions (t04) are deliberately light (formative only).
- Sum-to-product and product-to-sum formulae are not in the unit's topics and are not taught; if the owner wants them as optional enrichment they belong in a separate note, not in the assessed items.
