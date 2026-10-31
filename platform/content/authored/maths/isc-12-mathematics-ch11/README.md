# ISC Class 12 Mathematics — Chapter 11: Application of Integrals (authored, v1)

This is a hand-authored production chapter (DECISIONS D-025, D-026). It follows the pattern of `isc-12-mathematics-ch01` and `isc-12-mathematics-ch10`.

- **Author and provenance:** `claude-opus-5-5 (subject-producer)`, provenance `origin: "human"`, `model: null`. Every item is `status: "draft"` until review.
- **Builders:** from the shared ISC 12 lib `isc-12-mathematics-ch01/src/lib.mjs`, imported and not edited.
- **Numeric checks:** `src/calc.mjs` (a copy of ch10's) does tanh-sinh quadrature of $|f - g|$, split at corners and crossings. Because it never evaluates the endpoints, the vertical tangents of circles, ellipses and parabola branches at the limits cause no trouble.
- **Build:** from `platform/`, run `npx tsx content/authored/maths/isc-12-mathematics-ch11/src/build.mjs`. Edit `src/`, never the JSON.

## Scope (ISC 2027, Unit 3 Calculus)
- **t01 — area bounded by a curve and the axes or lines.**
  - Curves: lines, parabolas, cubics, circles and ellipses (by integration, with $\pi ab$), modulus graphs ($|2x - 3|$, $|x + 1|$, $|x - 1| + |x - 3|$), exponential curves ($e^x$, $e^{2x}$, $2^x$, $x e^{x^2}$) and logarithmic curves ($\log x$, $\log(x + 1)$, $3/x$).
  - Methods: curves below or crossing the axis; horizontal strips for $x = g(y)$.
- **t02 — area enclosed between two curves.**
  - Pairs: parabola and line, two parabolas, cubic and line, root curve and parabola, $\sin$ and $\cos$, $e^x$ and $e^{-x}$, $2^x$ and a line, hyperbola and line, $|x|$ with a parabola.
  - Segments of a circle and an ellipse cut off by a chord, and the region common to a circle and a parabola.
  - Regions given by inequalities.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Area bounded by a curve" (t01), 18 slides; Part 2 "Area between two curves" (t02), 17 slides |
| Worked examples | 4 + 4, each recomputed in `build.mjs` |
| Visuals | 27 of 35 slides carry one: 9 plots, 13 tables, 5 flows. No two slides in a row lack a visual. |
| Check slides | Part 1: m02, m10, fb1, tf3. Part 2: m16, m18, tf4, m23. None is used in a test. |
| Notes | 6 sections with key terms, formulas and visuals; exam tips with the mark split and common mistakes |
| Flashcards | 30 |
| Questions | 70 items worth 123 marks (see the table below) |
| Difficulty | d1 9, d2 34, d3 20, d4 7 |
| Competency | recall 3, understanding 30, application 21, analysis 16: 53% of items and 65% of marks at application or above (lint band 45–65%) |
| Tests | `t_isc12math_ch11_short` (20 marks, 50 min) and `_long` (40 marks, 100 min) on `isc-12-default-chapter-test-short` / `-long`, item for item including the internal-choice groups. The two tests are disjoint. |

| Type | Count |
|---|---|
| mcq | 26 (keys a7 b7 c6 d6) |
| assertion-reason | 6 (keys a b d a c b) |
| true-false | 4 |
| fill-blank | 3 |
| numerical | 6 |
| short 2-mark | 9 |
| short 3-mark | 10 |
| long 5-mark | 6, each set in parts (2 + 3) |

## Verifier record
- **Numeric re-solve:** 152/152 checks pass (`src/resolve.log`, gitignored).
  - Every key, every MCQ option value (exactly one may equal the area), every numerical answer and every value in a model answer is recomputed by quadrature and compared with its exact form.
  - Every pair of curves is checked to meet at the stated points.
  - The worked examples, plot captions, tables and flashcard values in `build.mjs` are checked the same way, and the build stops on any mismatch.
- **Lint, verify and plots:**
  - Stage 4 lint: 0 errors, 0 warnings. The stage-5 deterministic checks raise no blocking flags.
  - KaTeX parses 974 maths strings in strict mode.
  - All 38 marked plot points lie on their curves. Where a zero is marked, every zero in view is marked.
- **Determinism:** rebuilding gives byte-identical `release.json` and `tests.json`.
- **Originality:**
  - The lib's exact-stem pre-check passed against every authored chapter. A near-duplicate scan with the gate's own rule (5-gram Jaccard ≥ 0.7, maths stripped, 13,665 stems) found 0 pairs involving this chapter.
  - Curves and contexts are SOYL's own. The CBSE 12 ch08 area bank was read first, so that its curves and wording were not reused.

## For a reviewer
- **`ar2` is keyed (b).** Symmetry justifies the factor 4 but does not by itself give $\pi ab$.
- **`ar6` is keyed (b).** The meeting points give the limits but do not explain the value.
- **`tf4` (false):** argued with $e^x \ge 1 + x$ and $\log x \le x - 1$.
- **`l02`, circle $x^2 + y^2 = 8$ with parabola $y^2 = 2x$:** the root $x = -4$ of the meeting equation gives no real $y$, and the model answer says so.
- **`s209` and `ar4`:** they use $\int \log x\,dx = x\log x - x$ as a known standard result (integration by parts is ch09).
- **Notation:** `log` means the natural logarithm throughout.
- **Rendering:** nobody has seen the plot labels rendered, so they need a look at 360 px on staging. The circle-and-parabola plot is the densest.
