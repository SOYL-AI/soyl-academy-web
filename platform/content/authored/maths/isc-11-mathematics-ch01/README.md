# ISC Class 11 Mathematics — Chapter 1: Sets (authored, v1)

Hand-authored production chapter (D-025, D-026, D-050) for ISC 2028 Mathematics (860), Paper I, Class XI portion, Unit 1 (Sets and Functions).

- **Author:** `claude-sonnet-5-5 (subject-producer chapter writer)`, provenance `origin: "human"`.
- **Status:** all items are `status: "draft"`.
- **Style:** ISC presentation: 1-mark objective items including assertion-reason, then 2-mark and 3-mark short answers and 5-mark long answers set in parts. The syllabus notes that no Class XI specimen paper is published, so the pattern follows the ISC 12 chapters and the `isc-11-default` chapter-test blueprints.
- **Shared library:** `src/lib.mjs` is an unchanged copy of the ISC 11 Mathematics builder lib (md5 `363c4cfd202eeb4063a91c9b91575d32`). Its `build()` also runs the stage-4 lint, the stage-5 deterministic checks and the exact-stem originality pre-check against every other authored chapter.

## Scope (syllabus `isc-11-mathematics-ch01`, no removed topics)

- **t01 Sets and their representation:** roster and set-builder forms; empty, singleton, finite, infinite and equal sets; the same equation giving different sets in different universes.
- **t02 Subsets, intervals, power set, universal set:** proper subsets, `2^n` counts with forced and forbidden elements, intervals of real numbers on the number line, integers in an interval, nested Venn picture.
- **t03 Venn diagrams, operations, complement:** union, intersection, difference, complement; laws including both De Morgan laws and the distributive laws (verified and proved); interval operations; word problems on two and three sets.

## Contents

| Item | Count |
|---|---|
| Decks | Part 1 "Sets, subsets and intervals" (t01–t02), 22 slides; Part 2 "Operations, laws and counting" (t03), 21 slides |
| Visuals | 41 of 43 slides have one (22 tables, 5 flows, 12 Venn geometry figures, 2 number lines); never two slides in a row without a visual |
| Worked examples | 4 + 5, each recomputed and asserted in `build.mjs` |
| Check slides | 4 + 3 on objective items used in neither test: m01, tf1, fb1, m10 (Part 1); m13, tf3, m15 (Part 2) |
| Notes | 7 sections with key terms, formulas and visuals; exam tips with a mark split (Paper I: Sets and Functions carry 18 of 80 marks) and common mistakes |
| Flashcards | 30 |
| Questions | 70 items worth 130 marks: mcq 20, assertion-reason 6, true-false 5, fill-blank 5, numerical 6, short-2 10, short-3 11, long-5 7 |
| Difficulty | d1 7, d2 25, d3 31, d4 7 |
| Competency | recall 7, understanding 22, application 28, analysis 13: application or higher is 59% of items and 70% of marks |
| Topics | t01 15, t02 29, t03 37 (items tagged to more than one topic count in each) |
| Tests | `t_isc11math_ch01_short` and `t_isc11math_ch01_long` (below) |

**Short test** (`t_isc11math_ch01_short`), 20 marks in 50 minutes:
- Section A: m02, m06, m12, m16 and ar3.
- Section B: s208, then s205 or s207.
- Section C: s301, then s306 or s307.
- Section D: l01.

**Long test** (`t_isc11math_ch01_long`), 40 marks in 100 minutes:
- Section A: m03, m04, m05, m07, m11, m14, m17, m18, m19, m20, ar2 and ar5.
- Section B: s201, s204, then s209 or s210.
- Section C: s302, s303, s304, then s308 or s311.
- Section D: l02, then l03 or l04.

The two tests are disjoint, share no deck-check item, and follow the `isc-11-default` blueprints item for item. Items not in a test (s202, s203, s206, s305, s309, s310, l05, l06, l07, mcq m01 m08 m09 m10 m13 m15, ar1 ar4 ar6, and the true-false, fill-blank and numerical items) serve practice and the deck checks.

## Verifier record (what `build.mjs` computes and asserts)

- Every set in every table, Venn diagram and model answer is a JS `Set` and every region of a Venn diagram is computed; the regions are asserted to add up to `n(U)` and each label point is asserted to lie in its own region.
- Every interval result is checked by sampling a 1/16 grid from -24 to 24, including every end point, so a wrong bracket fails the build.
- The nine rules of set algebra (commutative, associative, both distributive laws, both De Morgan laws, identity, complement, difference) are tested on all 4096 triples of subsets of `{1, 2, 3, 4}`; the absorption law, `A - (A - B) = A ∩ B` and `A ∩ (B - C) = (A ∩ B) - (A ∩ C)` are tested on every pair or triple of subsets of a 3- or 4-element set before they are asked as proofs.
- Counts for word problems are built by `fromRegions` (explicit sets with the stated region sizes) and re-derived by inclusion-exclusion and by brute force; subset counts are enumerated.
- 133 re-solve checks run, all passing: keys, numerical values, and the numbers inside solutions and model answers. MCQ keys are rotated a, b, c, d by the lib after the re-solve.
- Gates: build `NO ERRORS` and byte-identical on rebuild (md5 of `release.json` and `tests.json`); chapter lint 0 errors, 0 warnings; `verify-local` 70 questions, 0 flags; doubled-backslash scan total 0; `content originality --authored` ok, 0 errors.

## Originality (D-036)

The CBSE 11 Mathematics chapter 1 covers the same topics and is in the bank. Its set-ups were not reused:

- CBSE sets and contexts avoided: odd `x^2 < 20` and `-3 <= 2x + 1 < 9` rosters, MISSISSIPPI letters, `{2, 5, 8, 11, 14}` set-builder, `{a, b, c}` listings, the primes-and-odds Venn, the `1..9` and `1..12` De Morgan checks, the hobby-club, residents' app, quiz-fest, newspaper, cricket-football-hockey and volunteer problems, the theatre-ticket and cadet items.
- This chapter uses its own sets (digit-sum, `n/(n^2 + 1)`, `|3x - 2| <= 7`, `x^2 + x - 12`, factors of 24 against primes, tea and coffee, bicycle and scooter, mystery/science fiction/history readers, badminton/table tennis/swimming) and its own phrasing; three exact-stem collisions that the build pre-check found against CBSE 11 were reworded.
- No NCERT, ML Aggarwal, S. Chand or Selina text, examples or exercises, and no CISCE specimen or past-paper question is reproduced; all people and places are imagined and labelled as such.

## Known gaps

- The Venn figures are generated geometry; label positions are asserted to lie in their own regions but have not been viewed in a browser (producer's staging spot-check).
- No case-based items: the ISC blueprints have no case slot.
