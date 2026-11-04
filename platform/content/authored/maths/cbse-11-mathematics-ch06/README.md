# CBSE Class 11 Mathematics — Chapter 6: Permutations and Combinations (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026, D-050) written to the maths exemplar standard and the structure of the CBSE 12 Mathematics
chapters. Author: `claude-sonnet-5-5 (subject-producer chapter writer)`, provenance `origin: "human"`, `model: null`. All items are `status: "draft"` until review.

`src/lib.mjs` (builders, re-solve harness, validator, CBSE 11 chapter-test layout) and `src/lint.mts` are the shared CBSE 11 Mathematics copies, unchanged.
The shared lib stamps its own author string into provenance; `build.mjs` rewrites it to this chapter's author in `release.json` after the build.
`src/pc.mjs` holds this chapter's counting engine: BigInt factorials, `nPr`, `nCr`, multinomials and Pascal rows (the formula route), and generators for every k-permutation, k-combination, sequence with repetition, Cartesian product and distinct arrangement of a multiset of letters (the brute-force route), plus point-set helpers (collinearity, distinct lines, triangles) and the tree-diagram and polygon-chord figure builders.

## Scope (2026-27 syllabus, 041)
- **t01** Fundamental principle of counting; factorial: multiplication principle (stages), addition principle (alternatives), tree diagram, restricted-place counting (digits, even numbers), factorial notation, `n! = n (n-1)!`, `0! = 1`, cancelling factorial quotients.
- **t02** Permutations: `nPr = n!/(n-r)!`, `nPn = n!`, arrangements with repetition (`n^r`), arrangements with some objects alike (`n!/(p! q!)`), blocks for "together", gaps and complements for "apart", digit-number counting with restrictions.
- **t03** Combinations: `nCr = n!/(r!(n-r)!)`, `nPr = nCr x r!`, special values, symmetry `nCr = nC(n-r)`, Pascal's rule and Pascal's triangle, selections with conditions (exactly, at least, a fixed person in or out), simple applications (lines, triangles, diagonals, matches in a league), and the choice between permutation and combination.
- All three topics are board-assessed (no `board_assessed: false` flags). The chapter has no `removed_topics`; Mathematical Induction and the binomial theorem (next chapter) are not taught, and circular permutations and derangements are outside the syllabus list and are not covered.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Counting principles and permutations" (t01, t02) 19 slides; Part 2 "Alike objects, combinations and applications" (t02, t03) 20 slides |
| Worked examples | 4 + 3 (odd three-digit numbers; $9!/(6!\,2!)$; medals with a special finalist; four-digit numbers with and without repetition; RAINBOW vowels together and apart; reading circle "at least one" and "exactly two"; eight points with three collinear) |
| Visuals | 26 of 39 slides (table 20, flow 3, plot 1, geometry 2; the 13 slides without a visual are goals, exam tips and the 9 check slides; max 1 slide in a row without one). Notes and questions: table 20, flow 1, plot 1, geometry 2 |
| Check slides | 4 + 5, all objective (tf1, fb1, fb4, m07; tf4, m10, m13, m18, fb5), none used in the chapter tests |
| Notes | 7 sections, each with key terms, formulas and a visual; exam tips with a mark split and 8 common mistakes |
| Flashcards | 30 (formula 11, fact 8, exam-tip 6, definition 4, concept 1) |
| Questions | 69 items, 137 marks: mcq 18, assertion-reason 6 (keys a c d b a c), true-false 5, fill-blank 5, numerical 6, short-2 9, short-3 8, long-5 7, case-based 5 (each 1 + 1 + 2 with an either/or part (c) via `alternatives`) |
| MCQ keys | a 6, b 6, c 6, d 5 (rotated by the build) |
| Difficulty | d1 8, d2 29, d3 25, d4 7 |
| Competency | recall 2, understanding 29, application 34, analysis 4 — application or higher 55 % of items, 69 % of marks (lint band 45–65 % of items) |
| Topics | t01 17 items, t02 27, t03 28 |
| Tests | `t_cbse11math_ch06_short` (20 marks / 40 min: A m06 m08 m12 ar1; B s201 s207 s301; C l01 or l02; D c01) and `_long` (40 marks / 90 min: A m02 m04 m09 m11 m14 m15 m16 m17 + ar3 ar4; B s202 s204 [s205 s209] s302 [s304 s305]; C l05 [l06 l07]; D c02 c04), on `cbse-11-default-chapter-test-short/-long`; disjoint, and no deck-check item is used |

## Verifier record
Build from `platform/`: `npx tsx content/authored/maths/cbse-11-mathematics-ch06/src/build.mjs` (prints stats and `NO ERRORS`; rebuilding is byte-identical, md5 checked twice for `release.json` and `tests.json`).
Lint this chapter: `npx tsx content/authored/maths/cbse-11-mathematics-ch06/src/lint.mts content/authored/maths/cbse-11-mathematics-ch06` (0 errors, 0 warnings).
`verify-local.mts` (numerical items need an "=" step ending at the key): 69 questions, 0 flags.

- **Re-solve:** 157/157 checks pass (`src/resolve.log`). Every count in a key, a distractor, a solution or a model answer comes from two routes that must agree. Formula route: exact BigInt factorials, `nPr`, `nCr`, multinomials, Pascal rows, inclusion-exclusion. Enumeration route: every arrangement or selection is generated and counted under the stated constraint (vowels together in 5040 arrangements of CRAYONS and RAINBOW; no two alike adjacent in KAYAK; two P's apart in LAPTOP; BOOKLET and PEPPER with blocks and gaps; all 9000 four-digit numbers filtered for distinct digits, even and divisible by 5; every 3-subset of a panel with "at least one man", "exactly two teachers", "at least 3 students"; seatings of 4 girls and 3 boys by position; lock codes and library codes by Cartesian product). Geometry counts (31 lines for nine points with four collinear, 57 lines and 210 triangles for twelve points with five collinear, 26 lines and 55 triangles for eight points with three collinear) are counted from real coordinates with a cross-product collinearity test, and the coordinates are chosen by a deterministic greedy search so that no other three points are collinear. Equation items (`nP2 = 90`, `nC8 = nC12`, `nC2 = 45`, `nC3 = 84`, `nC4 = nC6`, `nC_r = nC_(r+2)`, `6P_r = 120`) are solved by exhaustive search and must have exactly one solution. Identities are checked over a range: Pascal's rule for every `n <= 25` and `1 <= r <= n`, symmetry for `n <= 25`, `nPr = r! nCr` for `n <= 15`, `nC0 = nCn = 1` for `n <= 30`, `n!/(n-3)! = n(n-1)(n-2)` for `n = 3..20`, and the counter-example to `(a+b)! = a! + b!` is found by search. MCQ options are typed independently of the text and compared with the re-solved answer (exactly one must match and it must be the key); distractors are the results of plausible wrong methods (adding for multiplying, nPr for nCr, `n^r` with base and exponent swapped, forgetting the inner swap of a block, dividing by only one repeat factorial, counting a collinear triple as a triangle, double counting in "at least one").
- **Build self-checks:** every table in the decks and notes (factorials 0 to 8, cancelled quotients, nPr values, repetition versus no repetition, words with alike letters, the six arrangements of TOOT, the ten selections of three from five, nCr values, row 9 of Pascal's triangle and rows 0 to 7, the reading-circle and RAINBOW working, the eight-point count) is computed in `build.mjs` and the build throws if an assertion disagrees; the tree diagram's leaves and the hexagon figure's sides and diagonals are counted from the drawn segments.
- **Plots:** 20 marked points (the values of 9Cr), all marked free (`on_curve: false`: they are counts, not points of a function) and joined by a labelled series line; the plot has no function, so no zero is half-marked.
- **KaTeX:** 1,302 maths strings parse with KaTeX 0.19.0 in strict mode; no lost backslashes, no LaTeX outside `$…$`; a scan of `release.json` finds no bare command words and no Unicode maths symbols inside maths.
- **Narration:** 39 slides, max 84 words, mean 51; no symbols, abbreviations or letter-digit mixes (words such as PIN were kept out of the narration).
- **Stage-5 gates:** `npm run content -- originality --authored` reports this unit `ok` (0 errors, 0 warnings).
- **Originality:** no other bank chapter teaches permutations and combinations directly. NCERT examples were avoided: none of the classic words (DAUGHTER, MISSISSIPPI, INDEPENDENCE, ALLAHABAD, CORPORATION, EQUATION and so on), no "5 boys and 4 girls" committee, no "2 persons out of 5" set-ups and no NCERT digit sets. Words used are fresh: COCOON, POTATO, SUNSET, TOOT and RAINBOW in the deck; CRAYONS, PEPPER, KAYAK, CLOUD, ORCHID, LAPTOP and BOOKLET in the questions. Contexts are imagined: a canteen lunch box and set meals (Lakeview Cafe, Saffron Leaf), bus, tram and ferry routes of the town of Sunpur, a chess club final, an ice-cream shop, medals and a finalist called Orion, a reading circle, a school choir, a robotics club, a staff and student panel with Mr Rao, a library shelf code, a dance club photograph, a school band, a quiz team with Zoya and Imran, a rangoli of nine dots. The two stem collisions the gate found (the "value of a factorial" and "find n for nC3" items) were reworded.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- The tree diagram and the hexagon-with-chords figure are `geometry` visuals marked not to scale; the plot of 9Cr is a points-and-line plot with no function.
- Circular permutations, derangements, the binomial theorem and the use of nCr in probability are outside this chapter's syllabus list and are not covered.
- Only seven d4 items (m17, n02, l01, l02, l03, l04, l07); the board treatment of this chapter is mostly procedural, so the competency share is honest and not padded.
