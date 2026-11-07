# ISC Class 11 Mathematics - Chapter 9: Binomial Theorem (authored, v1)

Hand-authored production chapter (D-025, D-026, D-050) for ISC 2028 Class XI Mathematics, Unit 2: Algebra.

- **Author:** `claude-sonnet-5-5 (subject-producer chapter writer)`, provenance `origin: "human"`.
- **Status:** all items are `status: "draft"`.
- **Shared library:** `src/lib.mjs` is the ISC 11 Mathematics builder lib, copied unchanged. Its `build()` runs the KaTeX, narration, plot and scheme checks, the pipeline's stage-4 lint and stage-5 deterministic checks, and the exact-stem originality pre-check against every other authored chapter. `src/bin.mjs` is the exact algebra engine and `src/vis.mjs` holds the visuals with their assertions.

## Scope (syllabus `isc-11-mathematics-ch09`, no removed topics)

- **t01** History and significance of Pascal's triangle (Meru Prastara in India, Persian and Chinese work, Pascal); building rows by addition; the binomial theorem for a positive integral index, statement and proof (by induction, with Pascal's rule); features of the expansion, $(a - b)^{n}$, $(1 + x)^{n}$, sum and difference of $(a + b)^{n}$ and $(a - b)^{n}$ with surds and a complex number.
- **t02** General term, a given term, a term with a given power of $x$, terms from the end, middle term(s), the term independent of $x$ and showing that there is none.
- **t03** Binomial coefficients: $\sum\binom{n}{r} = 2^{n}$, the alternating sum, even and odd sums, the sum of coefficients of a polynomial, ratios of consecutive coefficients; approximating and comparing numbers such as $1.02^{7}$, $0.98^{6}$, $1.03^{8}$ and a divisibility example.
- **Scope decision:** the greatest term of an expansion is not in the ISC topic list for this chapter, so it is not taught or tested. Expansions with a negative or fractional index (series) belong to later study and are not covered.

## Contents

| Item | Count |
|---|---|
| Decks | Part 1 "Pascal's triangle, the theorem and the general term" (t01-t02), 21 slides; Part 2 "Middle terms, coefficients and approximations" (t02-t03), 21 slides |
| Visuals | 42 of 42 slides have one (34 tables, 6 flows, 2 geometry slides showing one figure, Pascal's triangle drawn from computed rows; check slides reuse the visual of the topic they test); no slide without a visual |
| Worked examples | 5 + 9, each recomputed and asserted in `vis.mjs` |
| Check slides | 3 + 3 on objective items used in neither test: tf1, m01, fb1 (Part 1); tf2, m20, fb2 (Part 2) |
| Notes | 7 sections with key terms, formulas and visuals; exam tips with mark split and common mistakes |
| Flashcards | 31 |
| Questions | 69 items worth 129 marks: 20 mcq, 6 assertion-reason, 5 true-false, 5 fill-blank, 5 numerical, 10 short-2, 11 short-3, 7 long-5 (in parts, 5 scheme steps each) |
| Difficulty | d1 8, d2 23, d3 29, d4 9 |
| Competency | recall 4, understanding 26, application 28, analysis 11: application or higher is 57% of items and 72% of marks |
| MCQ keys | a 5, b 5, c 5, d 5; assertion-reason keys a a b d a c |
| Tests | `t_isc11math_ch09_short` and `t_isc11math_ch09_long` (details below) |

**Short test** (`t_isc11math_ch09_short`), 20 marks in 50 minutes:
- Section A: m02, m04, m07, m11 and ar1.
- Section B: s201, then s202 or s204.
- Section C: s301, then s302 or s303.
- Section D: l01.

**Long test** (`t_isc11math_ch09_long`), 40 marks in 100 minutes:
- Section A: m03, m05, m06, m08, m09, m10, m12, m13, m14, m15, ar3 and ar4.
- Section B: s203, s205, then s206 or s210.
- Section C: s304, s305, s306, then s307 or s308.
- Section D: l02, then l03 or l04.

The tests are disjoint, contain no deck-check item, and follow the `isc-11-default` blueprints item for item. Spare practice items: m16 to m19, ar2, ar5, ar6, tf3 to tf5, fb3 to fb5, n1 to n5, s207 to s209, s309 to s311 and l05 to l07.

## Verifier record (what the build computes and asserts)

- **Several routes to every expansion.** Each printed expansion, term and coefficient comes from the exact engine `bin.mjs`: the formula route (BigInt factorials, exact rational coefficients) and the multiplication route (the brackets multiplied out one at a time as exact Laurent polynomials in two variables, negative powers allowed). `expand()` throws if the two disagree. Pascal rows are built by repeated addition and compared with the factorial formula; $(1 + x)^{n}$ coefficients are also counted as subsets of the brackets where small.
- **Terms and coefficients.** A term is accepted only when its coefficient and its exponents match the engine; the $r$ for a given power of $x$ is found by scanning every $r$ from $0$ to $n$ and asserted unique, so "no term independent of $x$" claims are checked over every $r$.
- **Candidate formulas.** The multiple-choice items on the general term and the Pascal rule evaluate each option as a function over a range of $n$ and $r$ and require that only the key matches.
- **Equations and parameters.** Values of $n$ and $k$ (m07, m13, n4, s210, s307, l06) are found by independent search and compared with the algebraic answer; l06 finds the roots $2$ and $7$ formally and keeps only the one for which the fourth term exists.
- **Approximations.** Decimal work uses exact rationals (`decFr`, `dec`): each approximation (1.02^7, 0.98^6, 1.03^8, 0.99^12, 1.05^6, 1.02^9, 1.02^20, 0.98^7, 1.01^7 with 0.99^7) is computed from its terms and compared with the exact power, and the rounding is asserted at the stated place.
- **Identities.** Pascal's rule is checked for all $k \le 14$ (l03), the theorem for $n = 1$ to $14$ by repeated multiplication, even sum = odd sum = $2^{n-1}$ for $n = 1$ to $20$, divisibility of $6^{n} - 5n - 1$ by $25$ with its quotient for $n \le 40$, and the middle-coefficient formula for $n \le 12$ (l07). Surd and complex examples are verified by arithmetic in $\mathbb{Q}(\sqrt{3})$ and by repeated multiplication of $1 + 2i$.
- **Re-solve checks:** 139 of 139 pass. KaTeX parses 2318 maths strings in strict mode.
- **Stage-4 lint:** 0 errors, 0 warnings. `verify-local`: 69 questions, 0 flags. Doubled-backslash scan: total 0. Rebuild is byte-identical (md5 of `release.json` and `tests.json`).

## Originality notes

- The CBSE 11 chapter on the same topic (`cbse-11-mathematics-ch07`) was read first. Its set-ups were avoided: $52^{4}$, $1004^{3}$, $\left(x^{3} + \frac{2}{x^{2}}\right)^{10}$, $\left(2x^{2} - \frac{1}{x}\right)^{9}$, $7^{42}$ mod $50$, $17^{12} - 1$, $\left(\frac{a}{2} - 2b\right)^{5}$, $(3x + y)^{5}$, $(2x + 3y)^{8,9}$, $(1 + x)^{10}$ middle term, $(1.01)^{10}$ and $(1.01)^{8}$, $(1.04)^{4,5}$, the surd identities with $\sqrt{2}$, $\sqrt{5}$, $\sqrt{7}$, the odd and even places for $n = 8$, and its bulb-row, savings and tank contexts.
- This chapter uses its own powers and numbers: $(2m - n)^{4}$, $\left(2y - \frac{1}{y}\right)^{4}$, $\left(x^{2} - 3y\right)^{8}$, $\left(4x^{3} + \frac{1}{2x}\right)^{8}$, $\left(x - \frac{3}{x^{2}}\right)^{12}$, $\left(x^{3} - \frac{1}{2x}\right)^{12}$, $(3x - y)^{9}$, $\left(2x - \frac{1}{3x}\right)^{10}$, $1.02^{7}$, $0.98^{6}$, $1.03^{8}$, $6^{35}$ mod $7$, $6^{n} - 5n - 1$, the ratio problems $6:20:45$, $36:84:126$ and $20:35:42$, an induction proof, a complex-number example $(1 + 2i)^{5}$, and the Meru Prastara history (outside the CBSE 11 chapter in the bank).
- Nine first-draft stems whose prose (after maths removal) matched a CBSE 11 stem ("Find the coefficient of ... in the expansion of ...", "Find the middle terms of ...", "Find the term independent of ...") were reworded and the exact-stem gate now passes; `npm run content -- originality --authored` reports 0 errors, 0 warnings for this unit.
- No question, example or exercise from NCERT, ML Aggarwal, S. Chand, Selina or a CISCE specimen or past paper is reproduced.

## Known gaps

- The greatest term and the negative or fractional index are outside the ISC topic list and are not covered; add them only if the syllabus file changes.
- The history of Pascal's triangle is given in two short statements (India, Persia and China, Pascal); no dates are claimed beyond "the seventeenth century" for Pascal.
- Narration is written for the text-to-speech pipeline but not yet synthesised; audio is `null` until the content pipeline runs `tts`.
- No case-based items are included (the ISC blueprints have no case slot).
