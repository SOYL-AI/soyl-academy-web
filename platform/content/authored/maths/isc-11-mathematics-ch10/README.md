# ISC Class 11 Mathematics - Chapter 10: Sequences and Series (authored, v1)

Hand-authored production chapter (D-025, D-026, D-050) for ISC 2028 Class XI Mathematics, Unit 2: Algebra.

- **Author:** `claude-sonnet-5-5 (subject-producer chapter writer)`, provenance `origin: "human"`.
- **Status:** all items are `status: "draft"`.
- **Shared library:** `src/lib.mjs` is the ISC 11 Mathematics builder lib, copied unchanged. Its `build()` runs the KaTeX, narration, plot and scheme checks, the pipeline's stage-4 lint and stage-5 deterministic checks, and the exact-stem originality pre-check against every other authored chapter. `src/seq.mjs` holds the exact helpers (rational numbers on BigInt, AP and GP term lists, sums, means, recurring decimals, special sums, differences) and `src/vis.mjs` the visuals with their assertions.

## Scope (syllabus `isc-11-mathematics-ch10`, no removed topics)

- **t01** Arithmetic progression: $n$th term, sum of $n$ terms, $a_n = S_n - S_{n-1}$; arithmetic mean and inserting $n$ means; choosing three or four terms in AP.
- **t02** Geometric progression: $n$th term, sum of $n$ terms, infinite GP with $|r| < 1$, recurring decimals as fractions; geometric mean and inserting $n$ geometric means (including the sign of $r$ for an even power).
- **t03** Relation between AM and GM of two positive numbers: proof of $A \ge G$, numbers from their AM and GM, a least value (for example $9x + \frac{4}{x}$).
- **t04** Sums of $n$, $n^2$ and $n^3$ with the telescoping derivation of $\sum k^2$; summing related series (including $1 \cdot 2 + 2 \cdot 3 + \cdots$ and blocks of terms); $n$th term by the method of differences (constant second difference).
- **Scope decision:** harmonic progression, the relation $G^2 = AH$ and arithmetico-geometric series are not in the ISC topic list for this chapter (`syllabus.yaml` t01-t04), so they are not taught or tested.

## Contents

| Item | Count |
|---|---|
| Decks | Part 1 "Arithmetic and geometric progressions" (t01-t02), 23 slides; Part 2 "AM and GM, special sums and differences" (t03-t04), 19 slides |
| Visuals | 36 of 42 slides have one (31 tables, 3 flows, 2 plots: an AP on its line, the partial sums of an infinite GP levelling off); never more than 1 slide in a row without a visual |
| Worked examples | 8 + 6, each recomputed and asserted in `vis.mjs` |
| Check slides | 3 + 3 on objective items used in neither test: tf1, fb1, tf2 (Part 1); tf3, fb2, tf4 (Part 2) |
| Notes | 7 sections with key terms, formulas and visuals; exam tips with mark split and common mistakes |
| Flashcards | 32 |
| Questions | 71 items worth 132 marks: 20 mcq, 6 assertion-reason, 5 true-false, 5 fill-blank, 6 numerical, 11 short-2, 11 short-3, 7 long-5 (in parts, 5 scheme steps each) |
| Difficulty | d1 5, d2 24, d3 34, d4 8 |
| Competency | recall 1, understanding 26, application 35, analysis 9: application or higher is 62% of items and 72% of marks |
| MCQ keys | a 5, b 5, c 5, d 5; assertion-reason keys a c d b a c |
| Tests | `t_isc11math_ch10_short` and `t_isc11math_ch10_long` (details below) |

**Short test** (`t_isc11math_ch10_short`), 20 marks in 50 minutes:
- Section A: m02, m10, m15, m18 and ar1.
- Section B: s201, then s202 or s208.
- Section C: s301, then s306 or s310.
- Section D: l01.

**Long test** (`t_isc11math_ch10_long`), 40 marks in 100 minutes:
- Section A: m03, m05, m07, m08, m09, m11, m13, m14, m16, m19, ar2 and ar3.
- Section B: s204, s205, then s207 or s210.
- Section C: s302, s304, s308, then s307 or s309.
- Section D: l03, then l05 or l06.

The tests are disjoint, contain no deck-check item, and follow the `isc-11-default` blueprints item for item. Spare practice items: m01, m04, m06, m12, m17, m20, ar4 to ar6, tf5, fb3 to fb5, n1 to n6, s203, s206, s209, s211, s303, s305, s311, l02, l04 and l07.

## Verifier record (what the build computes and asserts)

- **Two routes to every value.** Each term, sum and mean is computed by a closed formula on exact rationals (`Fr` on BigInt) and, independently, by listing the terms and adding them (`apList`, `gpList`, `partials`, `LS`, `L1` to `L3`); the two are asserted equal. Infinite sums are also checked against 40 to 60 partial sums.
- **Unknowns found by search.** The first term and difference, the ratio and the first term, the number of terms, the numbers with a given sum and product (AP triples, GP triples over several rationals, integer solutions of the AM-GM pair) are each found by search over a range and compared with the algebraic answer. The three-digit multiples of $7$ (sum $70336$) and the multiples of $9$ between $50$ and $500$ (sum $13725$) are summed by listing every multiple.
- **Means.** Inserted means come from the common difference or ratio and are rechecked by extending the progression to the last given term; the two sets of geometric means for an odd count of steps ($r = \pm 2$) are both found by search.
- **Recurring decimals.** `recurring()` sums the GP exactly; the resulting fraction is expanded digit by digit (`decimals()`) and must reproduce the stated repeating block ($\frac{16}{27}$, $\frac{5}{37}$, $\frac{18}{55}$, $\frac{59}{110}$, $\frac{27}{11}$).
- **Special sums and differences.** $\sum k$, $\sum k^2$, $\sum k^3$ are checked against listings for every $n$ used; $\sum_{k=1}^{n} k(k+1) = \frac{n(n+1)(n+2)}{3}$ is checked for $n = 1, \ldots, 30$; $(k+1)^3 - k^3$ telescopes to $215$ for $n = 5$; each method-of-differences sequence is fitted exactly (`fitQuad`), its first and second differences are listed, and the fitted rule is checked on all given terms.
- **AM-GM.** $(a + b)^2 \ge 4ab$ is checked on a $30 \times 30$ grid, $x + \frac{1}{x} \ge 2$ on 400 values, and the least values of $9x + \frac{4}{x}$ and $16x + \frac{9}{x}$ by scanning $x$.
- **Distractors** are each computed from their own wrong method (for example $a + nd$, the sum to one term too many, $\frac{b - a}{n}$ instead of $\frac{b - a}{n + 1}$, the second difference used as $A$) and asserted distinct from the key.
- **Re-solve checks:** 144 of 144 pass. KaTeX parses 2035 maths strings in strict mode.
- **Stage-4 lint:** 0 errors, 0 warnings. `verify-local`: 71 questions, 0 flags. Doubled-backslash scan: total 0. Originality gate: 0 errors. Rebuild is byte-identical (md5 of `release.json` and `tests.json`).

## Originality notes

- The CBSE 11 Mathematics chapter 8 (Sequences and Series) is in the bank. None of its sequences, contexts or wordings is reused. CBSE 11 uses, among others, $7$th and $12$th terms $31$ and $56$, $128, -64, 32$, $5, 20, 80$, $24 + 8 + \frac{8}{3}$, $0.\overline{054}$, $0.4\overline{18}$, means of $9, 64$ and $4, 25$ and $13, 12$, $\sum_{k \le 12} k^2$ and a Bamboo Lane ladder. This chapter uses different progressions throughout ($23, 19, 15$; $7, 11, 15$; $3, -6, 12$; $2, 6, 18$; $7, 14, 28$; $8, -4, 2$; $54, -18, 6$; $5, -10, 20$), different recurring decimals ($0.\overline{135}$, $0.\overline{592}$, $0.3\overline{27}$, $0.5\overline{36}$, $2.\overline{45}$), different AM-GM pairs and different contexts (a contractor digging a well, news spreading in an imagined school, a bouncing ball).
- Seven stems that first matched earlier bank stems after the maths was stripped (the exact-stem rule of the originality gate) were reworded; the build's pre-check now passes with none.
- All people, places and the contractor are imagined and labelled as such.

## Known gaps

- Harmonic progression and arithmetico-geometric series are outside the ISC topic list, so they are not covered; if CISCE adds them the chapter needs one extra deck section.
- No case-based items (the ISC blueprints have no case slot).
- Visuals are tables, flow charts and two plots; there are no geometry figures (none are needed by the topics).
