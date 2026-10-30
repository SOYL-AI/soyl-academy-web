# ISC Class 12 Mathematics — Chapter 2: Inverse Trigonometric Functions (authored, v1)

This is a hand-authored production chapter (D-025, D-026) for ISC 2027 Mathematics (860), Paper I.
- **Author:** `claude-opus-5-5 (subject-producer)`, with provenance `origin: "human"`.
- **Status:** every item is `status: "draft"`.
- **Style:** the CISCE 2027 specimen pattern (sources/cisce.md, anchor `isc-2027-specimen-860-mathematics`). Section A has 1-mark objective items, including assertion-reason. Sections B, C and D have 2-, 3- and 5-mark questions; the 5-mark ones are set in parts, and there is internal choice.
- **Library:** the shared ISC library `../isc-12-mathematics-ch01/src/lib.mjs`, used unchanged.

## Scope (ISC 2027 syllabus, Unit 1)

- **t01 Principal-value branches:**
  - domains and ranges of all six inverse functions;
  - principal values, including $\cot^{-1}$, $\sec^{-1}$ and $\operatorname{cosec}^{-1}$ of negative numbers;
  - $\sin^{-1}(\sin\theta)$-type expressions;
  - domains of $\cos^{-1}(g(x))$ and $\sin^{-1}(g(x))$.
- **t02 Graphs:**
  - $\sin^{-1}$, $\cos^{-1}$ and $\tan^{-1}$/$\cot^{-1}$;
  - the two-piece $\sec^{-1}$;
  - reflection of a branch in $y = x$;
  - scaled ranges, such as $3\cos^{-1} x - \pi$;
  - solving inequalities from the graph.
- **t03 Elementary properties:**
  - negative arguments;
  - reciprocal relations, including $\tan^{-1}\frac1x = \cot^{-1} x - \pi$ for $x < 0$;
  - the three complementary sums;
  - interconversion through right triangles.
- **t04 Sum and difference formulae**, with their conditions:
  - $\tan^{-1}$ in all three cases ($xy < 1$, $xy > 1$ with both positive, $xy > 1$ with both negative) and the difference form;
  - sums and differences of $\sin^{-1}$ and $\cos^{-1}$, by naming the angles and checking the range.
- **t05 Double and triple forms and equations:**
  - double forms: $2\tan^{-1} x$ in its three forms, and $2\sin^{-1} x$;
  - triple forms: $3\tan^{-1} x$, $3\sin^{-1} x$ and $3\cos^{-1} x$;
  - equations whose algebra produces an extraneous root, which must be tested and rejected.
- ISC keeps the sum/difference and 2x/3x formulae that CBSE dropped. The ISC syllabus lists no removed topics for this chapter.

## Contents

| Item | Count |
|---|---|
| Decks | Part 1 "Principal values and graphs" (t01–t02), 18 slides; Part 2 "Properties, formulae and equations" (t03–t05), 19 slides |
| Visuals | 29 of 37 slides; never more than one slide in a row without a visual. Deck visuals: 7 plots (restricted sine; $\sin^{-1}$; $\cos^{-1}$; $\tan^{-1}$ with $\cot^{-1}$; two-piece $\sec^{-1}$; mirror in $y = x$; $2\tan^{-1} x$ against its double form), 17 tables, 5 flows. |
| Worked examples | 3 + 3: five principal values; a domain; $\cos^{-1}(\cos\frac{5\pi}{3})$; a sum equal to $\frac{\pi}{4}$; a difference; an equation with an extraneous root. Each value is recomputed in `build.mjs`, which stops on any mismatch. |
| Check slides | 4 + 4, all on objective items used in neither test: m04, m09, m12, tf4; tf2, m23, n03, m22 |
| Notes | 6 sections, each with key terms, formulas and visuals; exam tips covering how marks are split and 5 common mistakes |
| Flashcards | 30 (concept, fact, example, diagram, formula, exam-tip) |
| Questions | 72 items worth 125 marks: mcq 28 (keys a7 b7 c7 d7 after rotation), assertion-reason 6 (keys a c a d a b), true-false 4, fill-blank 3, numerical 6, short-2 9, short-3 10, long-5 6 (all set in parts) |
| Difficulty | d1 10, d2 37, d3 18, d4 7 |
| Competency | recall 4, understanding 27, application 24, analysis 17. Application or higher is 57% of items and 71% of marks; the lint band is 45–65%. |
| Tests | `t_isc12math_ch02_short` (20 marks, 50 min) and `t_isc12math_ch02_long` (40 marks, 100 min) on the `isc-12-default` blueprints, item for item including the internal-choice groups. The two tests are disjoint and use no deck-check item. |

## Verifier record

- **Numeric re-solve:** 120 of 120 checks pass (`src/resolve.log`, gitignored).
  - Every principal value is recomputed with `Math.asin`, `Math.acos` and `Math.atan`, using the branch conventions in `questions.mjs`: $\cot^{-1}$ in $(0, \pi)$, $\sec^{-1} = \cos^{-1}\frac1x$, $\operatorname{cosec}^{-1} = \sin^{-1}\frac1x$.
  - Exactly one MCQ option matches each recomputed value.
  - Each identity is tested at many sample points inside its stated condition, and some are also shown to fail outside it, for example $2\sin^{-1} x$ at $x = 0.9$.
  - In every equation item, the quadratic's roots are checked, the accepted root satisfies the original equation, and the rejected root does not.
- **KaTeX:** 1,219 maths strings parse in strict mode, with no lost backslashes.
- **Pipeline checks:** stage-4 lint shows 0 errors and 0 warnings. Stage-5 deterministic verify raises 0 flags. The lib's exact-stem originality pre-check found no collisions against all authored chapters and exemplars, including CBSE 12 Mathematics ch02.
- **Determinism:** two rebuilds give byte-identical `release.json` and `tests.json`.
- **Originality:**
  - Every identity and equation is new; standard textbook results that recur in NCERT miscellaneous exercises are deliberately avoided.
  - Examples of new items: $\tan^{-1}\frac14 + \tan^{-1}\frac35 = \frac{\pi}{4}$; $\sin^{-1}\frac{7}{25} + \cos^{-1}\frac45 = \sin^{-1}\frac45$; $\cos^{-1}\frac35 + \cos^{-1}\frac{5}{13} = \cos^{-1}(-\frac{33}{65})$; $2\sin^{-1}\frac{5}{13} - \tan^{-1}\frac{1}{239} = \frac{\pi}{4}$; $3\tan^{-1}\frac12 = \tan^{-1}\frac{11}{2}$; and the equations in x/2 and x/3, in 2x and x, and in (x + 1) and (x − 1).
  - The contexts are SOYL's own (a crank designer, a surveyor's table, a ramp, a set square).

## For a reviewer

- **Branch conventions:** the chapter uses the common ISC/NCERT conventions: $\cot^{-1}$ in $(0, \pi)$, $\sec^{-1}$ in $[0, \pi] - \{\frac{\pi}{2}\}$, $\operatorname{cosec}^{-1}$ in $[-\frac{\pi}{2}, \frac{\pi}{2}] - \{0\}$. Some books use other branches for $\cot^{-1}$; the notes state the one used here.
- **Sum formulae:** the $\sin^{-1}$/$\cos^{-1}$ sum formulae are given with simplified sufficient conditions ($x, y \ge 0$ and $x^2 + y^2 \le 1$ for the sine sum; $x + y \ge 0$ for the cosine sum). The items themselves use the method of naming the angles and checking the range.
- **Fill-blank answers:** these accept the forms written with π, with pi, and in degrees (for example `5π/6`, `5pi/6`, `150°`).
- **Rendering:** nobody has seen the plot labels rendered, so they need a look at 360 px on staging. The `sec^-1` plot draws its two pieces as separate function domains.
