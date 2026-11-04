# CBSE Class 11 Mathematics — Chapter 2: Relations and Functions (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026, D-050) written to the maths exemplar standard and the structure of the CBSE 12 Mathematics
chapters. Author: `claude-sonnet-5-5 (subject-producer chapter writer)`, provenance `origin: "human"`, `model: null`. All items are `status: "draft"` until review.

`src/lib.mjs` (builders, re-solve harness, validator, CBSE 11 chapter-test layout) and `src/lint.mts` are the shared CBSE 11 Mathematics copies, unchanged.
The shared lib stamps its own author string into provenance; `build.mjs` rewrites it to this chapter's author in `release.json` after the build.
`src/rel.mjs` holds this chapter's brute-force helpers (products, relations from A to B, domain/range, function test, enumeration of relations and functions, arrow diagrams).

## Scope (2026-27 syllabus, 041)
- **t01** Ordered pairs and Cartesian product: equality of ordered pairs, $A \times B$ and $B \times A$, counting $n(A \times B) = pq$, products as lattice points.
- **t02** Relations: a relation from $A$ to $B$ as a subset of $A \times B$; roster, rule, arrow and table forms; domain, codomain, range; counting relations ($2^{pq}$).
- **t03** Functions and their graphs: a function as a special relation, vertical line test, domain and range of real functions (by exclusions and by solving $y = f(x)$), constant, identity, polynomial, rational, modulus, signum, greatest integer graphs; exponential and logarithmic graphs (light: one deck slide, one notes bullet, no dedicated question beyond domain/range facts).
- **t04** Algebra of real functions: $f \pm g$, $fg$, $f/g$, common domain, removal of zeros of the divisor.
- **t05** Composition of functions — `board_assessed: false`, so formative only: one deck slide marked "not assessed in the annual paper", half of one notes section and four question items (m20, ar6, fb5, s306).
- **Removed topics absent:** the subject has none in this chapter. One-one/onto and equivalence relations belong to Class 12 and are not taught here.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Cartesian products and relations" (t01, t02) 20 slides; Part 2 "Functions and their graphs" (t03–t05) 24 slides |
| Worked examples | 3 + 3 (products and equal pairs; relation from a rule $y = x^2 - 3x$; reading an arrow diagram; domain and range of $\sqrt{9 - x^2}$; modulus graph $\|x - 2\| + 1$; algebra of $\sqrt{x - 1}$ and $x - 5$) |
| Visuals | 32 of 44 slides (table 12, plot 12, geometry arrow diagrams 4, flow 4); max 1 slide in a row without a visual. Notes and questions: table 10, plot 14, geometry 5, flow 1 |
| Check slides | 4 + 4, all objective (m02, m09, tf1, n01; m13, m16, m11, m19), none used in the chapter tests |
| Notes | 8 sections, each with key terms, formulas and a visual; exam tips with a mark split and 8 common mistakes |
| Flashcards | 30 (definition 9, formula 5, concept 5, example 4, fact 3, diagram 2, exam-tip 2) |
| Questions | 76 items, 141 marks: mcq 22, assertion-reason 6 (keys c a d b a c), true-false 7, fill-blank 7, numerical 6, short-2 9, short-3 8, long-5 7, case-based 4 (each 1 + 1 + 2 with an either/or part (c) via `alternatives`) |
| MCQ keys | a 7, b 7, c 6, d 6 (rotated by the build) |
| Difficulty | d1 15, d2 31, d3 25, d4 5 |
| Competency | recall 7, understanding 27, application 32, analysis 10 — application or higher 55% of items, 69% of marks (lint band 45–65% of items) |
| Topics | t01 17 items, t02 15, t03 35, t04 10, t05 4 |
| Tests | `t_cbse11math_ch02_short` (20 marks / 40 min: A m01 m04 m14 ar2; B s202 s205 s301; C l01 or l02; D c04) and `_long` (40 marks / 90 min: A 8 mcq + ar1 ar5; B s201 s207 [s203 s206] s304 [s302 s306]; C l06 [l03 l05]; D c01 c03), on `cbse-11-default-chapter-test-short/-long`; disjoint, and no deck-check item is used |

## Verifier record
Build from `platform/`: `npx tsx content/authored/maths/cbse-11-mathematics-ch02/src/build.mjs` (prints stats and `NO ERRORS`; rebuilding is byte-identical, md5 checked twice for `release.json` and `tests.json`).
Lint this chapter: `npx tsx content/authored/maths/cbse-11-mathematics-ch02/src/lint.mts content/authored/maths/cbse-11-mathematics-ch02` (0 errors, 0 warnings).
`verify-local.mts` (numerical items need an "=" step ending at the key): 76 questions, 0 flags.

- **Re-solve:** 172/172 checks pass (`src/resolve.log`). Sets, products and relations are enumerated and tested by brute force (`prod`, `relFrom`, `domOf`, `rngOf`, `isFunctionFrom`); counts of relations and functions come from listing every relation or function (16, 64 relations; 8, 9, 81 functions; 36 onto functions to a 3-element set); real functions are evaluated on an exact binary grid on $[-20, 20]$ (steps of $1/16$) so interval end points are hit exactly: domains are the finite points, ranges are tested by solving $y = f(x)$ and substituting back, and algebraic identities (piecewise modulus forms, $(g \circ f)$, $(f + g)$, $f/g$) are checked at every grid point. MCQ options that are intervals, sets or domains are typed independently of the text and compared with the re-solved answer (exactly one must match, and it must be the key); distractors are the results of the plausible wrong method (forgetting to divide, truncating instead of flooring, adding sizes instead of multiplying). Model answers of short and long items are built from the computed lists (pairs, domains, ranges, counts), and their numbers are asserted.
- **Build self-checks:** every cell of the product, relation, domain/range and counting tables, every worked-example claim and every function-table value is computed in `build.mjs`; the build throws if any disagrees.
- **Plots:** 97 marked points on their curves and matching their labels; 12 zeros located numerically and all marked; 7 intersection points on both curves. Points that are deliberately off any curve (lattice points of a product, the signum value at $0$) carry `on_curve: false`; piecewise graphs (signum, greatest integer, reciprocal) are drawn as separate function pieces with domains.
- **KaTeX:** 1,888 maths strings parse with KaTeX in strict mode; no lost backslashes, no LaTeX outside `$…$`.
- **Narration:** 44 slides, max 73 words, mean 54; no symbols, abbreviations or letter-digit mixes.
- **Stage-5 gates:** `npm run content -- originality --authored` reports this unit `ok` (0 errors, 0 warnings). The first run flagged three bank duplicates (two "range of the real function" stems inside this chapter and "Find the domain and the range of the real function …" stems that matched an ISC 12 item once numbers and maths are ignored); the stems were reworded.
- **Fixes during the pass:** an empty set rendered as `$$` in a comparison table (now `\varnothing (none)`); a deliberately false equation "$-1 = 3$" in a long answer was rewritten in words for the arithmetic lint.
- **Originality:** no NCERT example or exercise set-ups are reused. CBSE 12 chapter 1 (types of relations, one-one/onto) was read and avoided: this chapter has no equivalence relations, hostel/room, divisibility-of-$a + 5b$ or $f(x) = x^3$ set-ups. Fresh contexts: a canteen menu, a coding club in Pune (imagined), a taxi fare in Hyderabad (imagined), a bakery in Jaipur (imagined), a school sports-day grid, a car park fee with the greatest integer function; fresh numbers throughout (e.g. $y = x^2 - 3x$ on $\{0, \dots, 4\}$, $|x - 1| + |x + 1|$, $\sqrt{9 - x^2}$, $\sqrt{x - 1}/(x - 5)$).

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Arrow diagrams are `geometry` figures: two boxes (polygons), labelled points and segments with one chevron (`arrows: 1`) to show direction. A relation on a set that is drawn between two copies of the set is not used in this chapter; all diagrams run from $A$ to $B$.
- The signum and greatest-integer graphs cannot show open and closed end points; the greatest integer steps stop at $k + 0.99$ and the left end is marked, and the signum value at $0$ is a separate marked point.
- Exponential and logarithmic functions appear only as graphs with domain and range (as the syllabus learning outcome states); no item asks to solve exponential equations.
- Composition is deliberately light (formative only).
