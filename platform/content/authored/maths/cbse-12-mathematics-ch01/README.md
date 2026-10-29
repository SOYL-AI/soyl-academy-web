# CBSE Class 12 Mathematics — Chapter 1: Relations and Functions (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) written to the maths exemplar standard
(`content-templates/exemplars/maths/`) and the structure of the CBSE 10 maths chapters. Author: `claude-opus-5-5 (subject-producer)`,
provenance `origin: "human"`, `model: null`. All items are `status: "draft"` until review.

`src/lib.mjs` (builders, re-solve harness, validator, CBSE 12 chapter-test layout) is adapted from
`cbse-10-mathematics-ch01/src/lib.mjs` and is shared by every CBSE 12 Mathematics chapter; `src/lint.mts` runs the stage-4 lint on chapter dirs.
`src/rel.mjs` holds this chapter's brute-force helpers (relation properties, closures, classes, enumeration of functions) and the arrow-diagram builder.

## Scope (2026-27 syllabus, 041)
- **t01** Types of relations: relation as a subset of $A \times A$; empty, universal and identity relations; reflexive, symmetric, transitive (independence of the three, with counterexamples); equivalence relations, equivalence classes, partitions; counting relations on small sets.
- **t02** Types of functions: one-one (injective), onto (surjective), bijective; proofs on $\mathbb{R}$, $\mathbb{Z}$, $\mathbb{N}$ and finite sets (linear, cubic, quadratic with restricted domain/codomain, rational functions); horizontal line test as a guide; counting functions, one-one and onto functions between finite sets.
- **Removed topics absent:** composition of functions, invertible functions/inverses and binary operations are not taught or required anywhere; they are named once as "not in the 2026–27 syllabus" (deck 1 exam-tips slide, notes exam tips, flashcard f30). Pre-images ($f(x) = y$ solved for $x$) are used only to prove onto-ness.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Types of relations" (t01) 19 slides; Part 2 "One-one and onto functions" (t02) 20 slides |
| Worked examples | 3 + 4 (property test on a 7-pair relation; equivalence proof for $6 \mid (a + 5b)$; months of 2027 by number of days; bijection $6 - 4x$; $2n + 1$ on $\mathbb{N}$; $\frac{x + 2}{x - 1}$ on $\mathbb{R} - \{1\}$; onto functions from 5 elements to 2) |
| Visuals | 27 of 39 slides (table 12, geometry arrow diagrams 6, flow 5, plot 4); max 1 slide in a row without a visual. Notes and questions: table 5, geometry 4, plot 2, flow 1 |
| Check slides | 4 + 4, all objective (m04, tf1, m08, fb1; tf3, m11, m14, m13), none used in the chapter tests |
| Notes | 7 sections, each with key terms and a visual (two sections carry extra visuals); exam tips with mark split and 8 common mistakes |
| Flashcards | 30 (definition 8, formula 5, fact 3, example 7, concept 2, exam-tip 3, diagram 2) |
| Questions | 73 items, 147 marks: mcq 19, assertion-reason 6 (keys a b d c a d), true-false 5, fill-blank 5, numerical 7, short-2 9, short-3 9, long-5 8, case-based 5 (each 1 + 1 + 2 with an either/or part (c) via `alternatives`) |
| Difficulty | d1 12, d2 27, d3 24, d4 9, d5 1 |
| Competency | recall 2, understanding 33, application 29, analysis 9 — application or higher 52% of items, 67% of marks (lint band 45–65% of items) |
| Topics | t01 38 items, t02 35 items |
| Tests | `t_cbse12math_ch01_short` (20 marks / 40 min) and `_long` (40 marks / 90 min), matching `cbse-12-default-chapter-test-short/long` (A objective, B short 2/3 with choices, C long with choice, D case); disjoint |

## Verifier record
Build from `platform/`: `npx tsx content/authored/maths/cbse-12-mathematics-ch01/src/build.mjs` (prints stats and `NO ERRORS`; rebuilding is byte-identical).
Lint this chapter: `npx tsx content/authored/maths/cbse-12-mathematics-ch01/src/lint.mts content/authored/maths/cbse-12-mathematics-ch01` (0 errors, 0 warnings).

- **Re-solve:** 148/148 checks pass (`src/resolve.log`). Relations are built as sets of pairs and their properties tested by brute force (`props`, `equivalence`, `eqClosure`, `classes`); counts of relations come from listing all 16 / 512 relations on 2- and 3-element sets; counts of functions, one-one and onto functions from listing every function; real functions are sampled for collisions (one-one) and their pre-image formulas substituted back (onto). Proof items (s301, l02, l03, …) are spot-checked on integer/rational ranges and their key expressions checked in the model answer.
- **Build self-checks:** every tick in the property table, every class in the class tables, every number in the counting tables and every worked-example claim is computed in `build.mjs`; the build throws if any disagrees.
- **Plots:** 15 marked points on their curves and matching their labels; 4 zeros located and marked; 6 intersection points on both curves (horizontal-line tests).
- **KaTeX:** 1433 maths strings parse with KaTeX in strict mode; no lost backslashes, no LaTeX outside `$…$`.
- **Narration:** 39 slides, max 72 words, mean 50; no symbols, abbreviations or letter-digit mixes.
- **Stage-5 deterministic checks** (`deterministicChecks`, run on this chapter only): 0 flags. **Bank duplicates** (`nearDuplicates`, within the chapter): 0. **Key-text leak scan** (no ≥ 60-character solution/model answer inside decks, notes, flashcards or stems): 0.
- **Fixes during the pass:** stage-4 arithmetic lint rejected deliberately false equations written as "$1 = -6$, impossible" (l01) and "$1 = 3$ or $1 = 9$, false" (l06); rephrased as "$1 \ne -6$" and "would need 1 to equal 3 or 9". The fill-blank on counting relations was reworded after the bank check flagged it as an exact duplicate (numbers ignored) of m03.
- **Originality:** no NCERT example or exercise set-ups are reused (avoided: $|a - b|$ even on $\{1, \dots, 5\}$, "multiple of 4" on $\{0, \dots, 12\}$, distance from the origin, $(a, b)\,R\,(c, d) \iff a + d = b + c$, lines parallel to $y = 2x + 4$, $f(n) = \frac{n+1}{2}$ / $\frac n2$ on $\mathbb{N}$, $a \le b^3$, $\frac{x - 2}{x - 3}$). Fresh set-ups: $3a + b$ and $2a + 3b$ divisibility, $a + 5b$ divisible by 6, $ab$ a perfect square, same digit sum among three-digit numbers, $a^2 - 4ab + 3b^2 = 0$, $n^2 + n + 1$ on $\mathbb{N}$ vs $\mathbb{Z}$, months by number of days; cases set in a Kota hostel, a Chennai class register, Bengaluru metro taps, a Jaipur family wedding and a Nashik cold store.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Arrow diagrams are `geometry` figures: two boxes (polygons), labelled points and segments with one chevron (`arrows: 1`) to show direction. The chevron is the renderer's parallel mark; it reads as an arrowhead here, and no two of these segments are claimed parallel.
- A relation on one set is drawn with two copies of the set (left and right) rather than loops.
