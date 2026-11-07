# ISC Class 11 Mathematics - Chapter 2: Relations and Functions (authored, v1)

Hand-authored production chapter (D-025, D-026, D-050) for ISC 2028 Mathematics (860), Paper I, Class XI portion, Unit 1.

- **Author:** `claude-sonnet-5-5 (subject-producer chapter writer)`, provenance `origin: "human"`.
- **Status:** all items are `status: "draft"`.
- **Shared library:** `src/lib.mjs` and `src/lint.mts` are unchanged copies of the shared ISC 11 Mathematics files (md5 of lib.mjs `363c4cfd...`). `src/rf.mjs` holds this chapter's brute-force helpers (products, relations, functions, domain/range grids, arrow diagrams).

## Scope (syllabus.yaml, ISC 2028)

- **t01** Ordered pairs; Cartesian product, $n(A \times B)$, $\mathbb{R} \times \mathbb{R}$ and $\mathbb{R} \times \mathbb{R} \times \mathbb{R}$; number of relations from $A$ to $B$.
- **t02** Relations as subsets of a product; arrow diagrams; domain, co-domain, range.
- **t03** Functions as special relations; $y = f(x)$; domain and range of real functions (exclusions, solving $y = f(x)$ for $x$).
- **t04** Standard real functions and graphs: constant, identity, polynomial, rational, modulus, signum, exponential, logarithmic, greatest integer.
- **t05** Algebra of real functions: $f + g$, $f - g$, $fg$, $\dfrac{f}{g}$ with domains.
- **Removed topics:** none listed for this chapter. Composition of functions and one-one/onto functions are not in the ISC Class XI topic list and are not taught (CBSE 11 treats composition; ISC does not).

## Contents

| Item | Count |
|---|---|
| Decks | Part 1 "Cartesian products, relations and functions" (t01-t03) 18 slides; Part 2 "Real functions, standard graphs and algebra of functions" (t03-t05) 19 slides |
| Visuals | 27 of 37 slides carry one (every non-check slide; the 10 check slides carry none); never more than 2 slides in a row without a visual (flow 4, table 12, plot 7, geometry arrow diagrams 4) |
| Worked examples | 3 + 3 |
| Check slides | 5 + 5, objective items used in neither test: tf1, fb1, fb2, tf2, tf3 (Part 1); fb3, tf4, tf5, fb4, tf6 (Part 2) |
| Notes | 7 sections with key terms, formulas and visuals; exam tips with a mark split and common mistakes |
| Flashcards | 30 (definition 9, formula 6, fact 5, concept 3, example 3, diagram 2, exam-tip 2) |
| Questions | 79 items, 141 marks: mcq 23, assertion-reason 6 (keys a d b c a d), true-false 7, fill-blank 7, numerical 7, short-2 10, short-3 12, long-5 7 (all in parts, 5-step schemes) |
| MCQ keys | a 6, b 6, c 6, d 5 after rotation by the build |
| Difficulty | d1 10, d2 34, d3 27, d4 8 |
| Competency | recall 3, understanding 26, application 37, analysis 13: application or higher is 63% of items, 74% of marks |
| Topics | t01 20 items, t02 17, t03 25, t04 16, t05 11 |
| Tests | `t_isc11math_ch02_short` (20 marks, 50 min) and `t_isc11math_ch02_long` (40 marks, 100 min) |

**Short test:** A m02 m09 m14 m19 ar2; B s202, [s206, s209]; C s301, [s305, s308]; D l01.

**Long test:** A m01 m03 m07 m08 m12 m15 m17 m18 m20 m22 ar3 ar6; B s201, s204, [s205, s208]; C s303, s304, s306, [s307, s311]; D l02, [l03, l04].

The tests are disjoint and use no deck-check item. Spares: m04 m05 m06 m10 m11 m13 m16 m21 m23, ar1 ar4 ar5, s203 s207 s210, s302 s309 s310 s312, l05 l06 l07 and the numerical, true-false and fill-blank items not used on slides (practice only).

## Verifier record

Run from `platform/`: `npx tsx content/authored/maths/isc-11-mathematics-ch02/src/build.mjs` (prints `NO ERRORS`; rebuilding twice gives byte-identical `release.json` and `tests.json`).

- **Re-solve:** 137 of 137 checks pass (`src/resolve.log`, gitignored). Sets, products and relations are enumerated and tested by brute force (all $2^{pq}$ relations and all functions are listed for small sets); real-function domains are checked on an exact binary grid of $[-20, 20]$; ranges by solving $f(x) = y$ and substituting back; MCQ distractors are computed from the wrong method.
- **Build self-checks:** every table cell, arrow-diagram pair, worked-example claim, plotted point and zero is computed in `build.mjs` and asserted.
- **KaTeX:** 1,690 maths strings parse in strict mode.
- **Plots:** 48 marked points lie on their curves (the signum point $(0, 0)$ is marked free), 12 marked zeros verified.
- **Pipeline checks:** stage-4 lint 0 errors, 0 warnings; verify-local 79 questions, 0 flags; doubled-backslash scan 0; exact-stem pre-check and the `content originality --authored` run report no flag for this unit.
- **Narration:** 37 slides, at most 72 words each (mean 45), no symbols or abbreviations.

## Originality

All sets, rules and contexts are this chapter's own. The CBSE 11 Mathematics ch02 stems were read and not reused (its sets, its functions $[x] + \operatorname{sgn}(x)$ and its composition items). Four stems that the originality gate matched against CBSE 11 or ISC 12 stems were reworded. Contexts (a school stall, a library fine) are imagined and labelled so.

## Known gaps

- Plots and arrow diagrams have not been seen rendered; the greatest-integer and signum plots cannot show hollow dots, so captions and alt text describe the open ends.
- Competency share (63% application or higher) sits in the upper half of the lint band because the chapter's questions are largely computational.
