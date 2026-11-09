# ISC Class 11 Mathematics - Chapter 8: Permutations and Combinations (authored, v1)

Hand-authored production chapter (D-025, D-026, D-050) for ISC 2028 Class XI Mathematics, Unit 2: Algebra.

- **Author:** `claude-sonnet-5-5 (subject-producer chapter writer)`, provenance `origin: "human"`.
- **Status:** all items are `status: "draft"`.
- **Shared library:** `src/lib.mjs` is the ISC 11 Mathematics builder lib, copied unchanged. Its `build()` runs the KaTeX, narration, plot and scheme checks, the pipeline's stage-4 lint and stage-5 deterministic checks, and the exact-stem originality pre-check against every other authored chapter. `src/cnt.mjs` holds the counting helpers (BigInt formulas and brute-force enumeration) and `src/vis.mjs` the visuals with their assertions.

## Scope (syllabus `isc-11-mathematics-ch08`, no removed topics)

- **t01** Fundamental principle of counting (multiplication and addition) and factorial notation, $n! = n(n - 1)!$, $0! = 1$.
- **t02** Permutations $^{n}P_{r}$ with derivation; items always together or never together; forming numbers from digits (restricted place first, zero as a leading digit, no repetition).
- **t03** Arrangements of letters with and without repeats, permutations of alike things $\frac{n!}{p!\,q!}$, circular permutations with and without distinguishing clockwise and anticlockwise order.
- **t04** Combinations $^{n}C_{r}$ with derivation and the properties $^{n}C_{r} = {}^{n}C_{n-r}$, $^{n}C_{r-1} + {}^{n}C_{r} = {}^{n+1}C_{r}$, equations such as $^{n}C_{7} = {}^{n}C_{4}$; selections of different things and of alike things.
- **t05** Mixed problems: committees with conditions (included, excluded, at least, at most), diagonals, triangles and lines from points, words built by selecting then arranging, selection followed by a circular seating.
- **Scope decision:** division of objects into groups is not in the ISC topic list for this chapter, so it is not taught or tested. Binomial coefficients and Pascal's triangle beyond the identity $^{n}C_{r-1} + {}^{n}C_{r} = {}^{n+1}C_{r}$ belong to chapter 9.

## Contents

| Item | Count |
|---|---|
| Decks | Part 1 "Counting, permutations and circular arrangements" (t01-t03), 23 slides; Part 2 "Combinations, selections and mixed problems" (t04-t05), 21 slides |
| Visuals | 38 of 44 slides have one (28 tables, 7 flows, 3 geometry figures: a tree, a circular seating, a heptagon with all chords); never more than 1 slide in a row without a visual |
| Worked examples | 6 + 7, each recomputed and asserted in `vis.mjs` |
| Check slides | 3 + 3 on objective items used in neither test: tf1, fb1, tf2 (Part 1); tf3, tf5, fb3 (Part 2) |
| Notes | 7 sections with key terms, formulas and visuals; exam tips with mark split and common mistakes |
| Flashcards | 31 |
| Questions | 67 items worth 124 marks: 20 mcq, 6 assertion-reason, 5 true-false, 5 fill-blank, 5 numerical, 9 short-2, 10 short-3, 7 long-5 (in parts, 5 scheme steps each) |
| Difficulty | d1 10, d2 23, d3 27, d4 7 |
| Competency | recall 1, understanding 28, application 32, analysis 6: application or higher is 57% of items and 73% of marks |
| MCQ keys | a 5, b 5, c 5, d 5; assertion-reason keys a c d b a d |
| Tests | `t_isc11math_ch08_short` and `t_isc11math_ch08_long` (details below) |

**Short test** (`t_isc11math_ch08_short`), 20 marks in 50 minutes:
- Section A: m02, m06, m09, m12 and ar1.
- Section B: s201, then s202 or s203.
- Section C: s301, then s302 or s303.
- Section D: l01.

**Long test** (`t_isc11math_ch08_long`), 40 marks in 100 minutes:
- Section A: m03, m04, m05, m07, m08, m10, m11, m13, m14, m15, ar2 and ar3.
- Section B: s204, s205, then s206 or s207.
- Section C: s304, s305, s306, then s307 or s308.
- Section D: l02, then l03 or l04.

The tests are disjoint, contain no deck-check item, and follow the `isc-11-default` blueprints item for item. Spare practice items: m01, m16 to m20, ar4 to ar6, tf4, fb2, fb4, fb5, n1 to n5, s208, s209, s309, s310 and l05 to l07.

## Verifier record (what the build computes and asserts)

- **Two routes to every count.** Each answer is computed by an exact BigInt formula (`F`, `P`, `Cm`, `multi`, Pascal rows built by repeated addition) and, independently, by enumerating the objects and testing the condition: all $k$-permutations (`kPerms`), all $k$-subsets (`kCombs`), all sequences with repeats (`kSeqs`), distinct arrangements of a multiset (`distinctArr`, cross-checked by a Set of all index permutations for short words).
- **Circular counts.** Round-the-table counts are checked by taking every linear seating of the labelled people, rotating each so the smallest label comes first, and counting the distinct results; necklace counts also identify a seating with its mirror image. This reproduces $(n-1)!$ and $\frac{(n-1)!}{2}$ without assuming them, including the conditions (two together, two never adjacent, boys and girls alternating, three in a block).
- **Restricted arrangements.** Together and never-together counts are enumerated from all $n!$ arrangements (up to $8!$ for DAUGHTER); numbers from digits are enumerated from every $k$-permutation of the digit set with the stated condition.
- **Selections.** Committee, team and basket counts (included, excluded, at least, at most, alike things with labelled items collapsed to distinct selections) are enumerated; geometry counts use real coordinates with cross-product collinearity (10 points with 4 collinear: 116 triangles; 8 points with 3 collinear: 55 triangles and 26 lines).
- **Equations and parameters.** Every value of $n$ or $r$ (m06, m15, s202, s206, s310, n5, s307) is found independently by search over a range and compared with the algebraic answer; each distractor is computed from its own wrong method and shown different.
- **Identities.** Symmetry, Pascal's rule, $^{n}P_{r} = r!\,{}^{n}C_{r}$ and the ratio $^{n}C_{r} \cdot r = (n - r + 1)\,{}^{n}C_{r-1}$ are checked for all $n$ up to 14.
- **Re-solve checks:** 134 of 134 pass. KaTeX parses 1592 maths strings in strict mode.
- **Stage-4 lint:** 0 errors, 0 warnings. `verify-local`: 67 questions, 0 flags. Doubled-backslash scan: total 0. Rebuild is byte-identical (md5 of `release.json` and `tests.json`).

## Originality notes

- The CBSE 11 chapter on the same topic (`cbse-11-mathematics-ch06`) was read first. Its words (COCOON, POTATO, SUNSET, RAINBOW, CRAYONS, PEPPER, KAYAK, ORCHID, LAPTOP, BOOKLET, TOOT), digit sets ($1$ to $6$, $0$ to $5$, $0$ to $9$), seatings (five named friends in a row, dance club of four girls and three boys), committee numbers (panel of $5$ from $14$, $5$ teachers and $8$ students), points ($9$ with $4$ collinear, $12$ with $5$ collinear), cafe, kiosk, hostel keypad and bicycle-lock contexts were avoided.
- This chapter uses LEVEL, ARRANGE, ENGINE, MACHINE, MISSION, DAUGHTER, PARALLEL, BANANA, SUCCESS and SEES; digit sets $\{2,\dots,8\}$, $\{0,\dots,7\}$ and $\{0,\dots,6\}$; circular tables, necklaces, bracelets, garlands and key rings (circular permutations are outside the CBSE 11 chapter in the bank); alike-things selections; and contexts such as a study app, a quiz team, a craft box and a school council, all imagined.
- Three first-draft stems that matched a CBSE 11 stem after maths removal ("Find the positive integer ... for which ...") were reworded and the exact-stem gate now passes; `npm run content -- originality --authored` reports 0 errors, 0 warnings for this unit.
- No question, example or exercise from NCERT, ML Aggarwal, S. Chand, Selina or a CISCE specimen or past paper is reproduced.

## Known gaps

- Division into groups (equal and unequal) is outside the ISC topic list and is not covered; add it only if the syllabus file changes.
- Narration is written for the text-to-speech pipeline but not yet synthesised; audio is `null` until the content pipeline runs `tts`.
- No case-based items are included (the ISC blueprints have no case slot).

## Assertion-reason options (2026-11-09)

Options aligned with the ISC 2027 Mathematics specimen paper (860): (a) both true, R explains A; (b) both true, R does not explain A; (c) A true, R false; (d) A false, R true. For this chapter the order is unchanged ((d) "Assertion is false and Reason is true"); only the wording now follows the specimen, so no key changed. Keys in bank order: a c d b a d. Tests are unchanged (same items in the same slots).
