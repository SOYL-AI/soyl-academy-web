# ISC Class 11 Mathematics - Chapter 16: Limits (authored, v1)

Hand-authored production chapter (D-025, D-026, D-050) for ISC 2028 Class XI Mathematics, Unit 4: Calculus.

- **Author:** `claude-sonnet-5-5 (subject-producer chapter writer)`, provenance `origin: "human"`.
- **Status:** all items are `status: "draft"`.
- **Shared library:** `src/lib.mjs` is the ISC 11 Mathematics builder lib, copied unchanged (assertion-reason options as in the ISC 2027 Mathematics specimen). Its `build()` runs the KaTeX, narration, plot and scheme checks, the pipeline's stage-4 lint and stage-5 deterministic checks, and the exact-stem originality pre-check against every other authored chapter. `src/lim.mjs` holds the exact arithmetic (BigInt fractions, polynomials, exact limits of rational functions at a point and at infinity) and the numeric two-sided approach checks.

## Scope (syllabus `isc-11-mathematics-ch16`)

- **t01** The intuitive idea of a limit from tables of values and graphs (holes); left-hand and right-hand limits; existence; piecewise, modulus and greatest integer functions at a point; finding a constant so that a limit exists.
- **t02** The fundamental theorems on limits (sum, difference, constant multiple, product, quotient, polynomial of a function), used as statements; indeterminate forms (0/0, infinity/infinity, infinity minus infinity, 0 times infinity, 1 to the infinity) and the determinate forms 0/5 and 5/0.
- **t03** Limits of polynomial and rational functions: substitution, factorisation, rationalisation, the standard result for $(x^n - a^n)/(x - a)$ including fractional $n$, and limits as $x \to \pm\infty$ by dividing by the highest power.
- **t04** $\sin x / x$ with the geometric squeeze argument shown in Deck 2 (not asked as a proof in questions), $\tan x / x$, $(1 - \cos x)/x^2$, $(e^x - 1)/x$, $(a^x - 1)/x$, $\ln(1 + x)/x$ and $(1 + x)^{1/x} = e$ as a stated result.
- **Removed topic:** the proofs of the fundamental theorems on limits. One slide (Deck 1, "The algebra of limits") says the theorems are used as statements; nothing else mentions it, and no item asks for a proof.
- **Scope decision:** continuity, derivatives and L'Hopital's rule belong to other chapters or are not in the ISC list, so they are not taught or tested.

## Contents

| Item | Count |
|---|---|
| Decks | Part 1 "Meaning, one-sided limits and the algebra of limits" (t01-t02), 24 slides; Part 2 "Evaluating limits" (t03-t04), 25 slides |
| Visuals | 43 of 49 slides have one (28 tables, 2 flows, 13 plots, including the unit-circle squeeze figure); the six check slides have none; never more than 1 slide in a row without a visual |
| Worked examples | 7 + 8, each recomputed and asserted in `vis.mjs` |
| Check slides | 3 + 3 on objective items used in neither test: tf1, fb1, tf3 (Part 1); m12, fb4, m19 (Part 2) |
| Notes | 8 sections with key terms, formulas and visuals; exam tips with mark split and common mistakes |
| Flashcards | 31 |
| Questions | 76 items worth 136 marks: 20 mcq, 6 assertion-reason, 7 true-false, 8 fill-blank, 7 numerical, 10 short-2, 11 short-3, 7 long-5 (in parts, 5 scheme steps each) |
| Difficulty | d1 18, d2 22, d3 27, d4 9 |
| Competency | recall 3, understanding 28, application 38, analysis 7: application or higher is 59% of items and 74% of marks |
| Topics | t01 19 items, t02 9, t03 29, t04 22 (items listing two topics count twice) |
| MCQ keys | a 5, b 5, c 5, d 5; assertion-reason keys a b c d b c |
| Tests | `t_isc11math_ch16_short` and `t_isc11math_ch16_long` (details below) |

**Short test** (`t_isc11math_ch16_short`), 20 marks in 50 minutes:
- Section A: m01, m07, m09, m15 and ar1.
- Section B: s201, then s205 or s208.
- Section C: s302, then s306 or s309.
- Section D: l03.

**Long test** (`t_isc11math_ch16_long`), 40 marks in 100 minutes:
- Section A: m02, m03, m04, m05, m06, m10, m11, m13, m16, m17, ar2 and ar4.
- Section B: s210, s203, then s207 or s209.
- Section C: s301, s305, s308, then s307 or s310.
- Section D: l01, then l04 or l06.

The tests are disjoint, contain no deck-check item, and follow the `isc-11-default` blueprints item for item. Spare practice items: m08, m14, m18, m20, ar3, ar5, ar6, tf2, tf4 to tf7, fb2, fb3, fb5 to fb8, n1 to n7, s202, s204, s206, s303, s304, s311, l02, l05 and l07.

## Verifier record (what the build computes and asserts)

- **Two routes to every limit.** Each limit in a table, figure, key and solution is checked exactly and numerically. Exactly: for rational functions the common factor $x - a$ is cancelled in BigInt rational arithmetic (`ratLim`), and limits at infinity compare degrees (`ratInf`); fractional-power results are also confirmed by the substitution $y = x^{1/m}$ into a rational function of $y$. Numerically: the function is evaluated at $a - h$ and $a + h$ for $h = 10^{-4}, 10^{-5}, 10^{-6}$ and compared with the key within a relative tolerance; for one-sided limits only the relevant side is checked; for limits that do not exist the two sides are asserted to approach different values (or to be unbounded); at infinity the function is evaluated at $x = \pm 10^4, 10^6, 10^8$.
- **Tables of values** (near 3, near 1, $\tan x / x$, $(1 - \cos x)/x^2$, $(1 + x)^{1/x}$, the power result at $x = a + 10^{-8}$) are computed from the functions, not typed, and asserted against the exact values.
- **Unknown constants** ($k$ for existence, $n$ and $a$ in the power result) are found by search over a range and compared with the algebra; the wrong values are asserted to give no limit or a different value.
- **Distractors** are each computed from their own wrong method (value for limit, wrong side of a modulus, $[3] = 3$ on the left, $n a^n$ for $n a^{n-1}$, inverted ratio, $e$ for $e^k$) and asserted distinct from the key; every distractor explanation names the option by its value.
- **Plots:** holes are marked points with `on_curve: false` on the simplified curve; piecewise functions are separate series with their own domains and open or filled end points; the squeeze figure puts $P$ on the unit circle with $\sin\theta < \theta < \tan\theta$ asserted. No zero is marked at a domain end.
- **Re-solve checks:** 152 of 152 pass. KaTeX parses 1830 maths strings in strict mode.
- **Stage-4 lint:** 0 errors, 0 warnings. `verify-local`: 76 questions, 0 flags. Doubled-backslash scan: total 0. Originality gate: 0 errors for this unit. Rebuild is byte-identical (md5 of `release.json` and `tests.json`).

## Originality notes

- The bank holds the CBSE 11 Mathematics ch12 limits items. Their set-ups are not reused: that chapter's polynomial at $-2$, $\sin 8x / 5x$, $(x^2 - 16)/(x^2 - x - 12)$, $(x^5 - 32)/(x - 2)$, $(1 - \cos 10x)/x^2$, $\tan 9x / \sin 4x$, the piecewise $3x - 2$ and $x^2 + 1$ at 2, $1/(x - 1) - 2/(x^2 - 1)$, $\ln(1 + 4x)/x$, $(x^4 - 81)/(x + 3)$, $x^6 - 64$, $|x|/x$, $(x^2 - 7x + 10)/(x - 5)$, $\sin 3x / \sin 5x$, $(e^{6x} - 1)/3x$, $(x^3 - 8)/(x^2 - 4)$, $x^5 - a^5 = 80$, $(\sqrt{x} - 2)/(x - 4)$, the constant $k$ in $x^2 + kx$ and $4 - 3x$, and the long items on $(x^3 - 2x^2 - x + 2)/(x^2 - 3x + 2)$, $\cos 2x - \cos 8x$ and $1 - \cos 4x$ over $x \tan 2x$. This chapter uses different functions, points and structures (for example $x \to 5^{-}$ with $\lvert x - 5 \rvert$, $[x] + x^2$, $(\sqrt{2x + 25} - 5)/x$, $x^{1/3}$ at 8, $x^{1/5}$ at 32, $\tan 3x - \sin 3x$ over $x^3$, $(1 + 5x)^{2/x}$).
- The plain-language stems name their own function or point throughout; no stem reuses another chapter's wording. No CISCE specimen or past-paper question is reproduced; the specimen papers are used for the paper pattern only.

## Known gaps

- Continuity, differentiation from first principles and L'Hopital's rule are out of scope for this chapter.
- No case-based item (the ISC 11 blueprints have no case-based slot).
- $\sin x / x$ is proved geometrically in Deck 2 only; items use it as a standard result, as the brief requires. The limit $(1 + x)^{1/x} = e$ is a stated result with a numeric table, not a proof.
- Check slides carry no visual, so the 6 check slides are the only slides without one.
