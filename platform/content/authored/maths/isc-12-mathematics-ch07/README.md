# ISC Class 12 Mathematics — Chapter 7: Applications of Derivatives (authored, v1)

This is a hand-authored production chapter (D-025, D-026).
- **Unit:** `isc-12-mathematics-ch07`, academic year 2026-27.
- **Provenance:** `origin: "human"`, author `claude-opus-5-5 (subject-producer)`.
- **Status:** every item is `status: "draft"`.

The chapter uses the shared ISC 12 maths lib, `isc-12-mathematics-ch01/src/lib.mjs`, imported and not copied or edited. To build, run `npx tsx content/authored/maths/isc-12-mathematics-ch07/src/build.mjs` from `platform/`. The build runs these checks:
- KaTeX in strict mode;
- the plot checks;
- narration rules;
- the numeric re-solve of every item;
- stage-5 deterministic verify;
- stage-4 lint;
- an exact-stem check against every authored chapter.

If any check fails, the output is parked as `*.wip.json`. Edit `src/`, not the JSON.

## Scope (ISC 2027, Unit 3 Calculus)
- **t01 Rate of change:** a ripple, a cube, a balloon, marginal cost, a sliding ladder, a conical filter, a lamp-post shadow and an oil patch.
- **t02 Increasing and decreasing:** sign charts for cubics, $e^x + e^{-x}$, $\ln x - x$, $2x + \cos x$, $\tan^{-1}x - x$ and $\sin x + \cos x$ on $[0, 2\pi]$. The chapter notes that $x^3$ is strictly increasing even though $f'(0) = 0$.
- **t03 Tangents, normals and the angle between two curves:** ISC keeps this topic; CBSE deleted it.
  - Tangent and normal equations, and tangents parallel to a given line.
  - A parametric tangent.
  - Where a normal meets the axis, and the area of the triangle that a tangent and a normal make with the $x$-axis.
  - The angle between curves: $x^2$ and $x^3$; $4 - x^2$ and $x^2$; $x^2 - 1$ and $1 - x^2$; $y = x^2$ and $x = y^2$.
  - Curves that touch ($xy = 4$ and $x^2 + y^2 = 8$), and orthogonal curves.
- **t04 Local extrema:** the first and second derivative tests, including a corner minimum ($|x - 2| + 1$).
  - Cases where the second derivative test fails: $x^4$, and $3x^4 - 4x^3 + 2$ at $0$.
  - A local maximum smaller than a local minimum ($x + \frac1x$).
- **t05 Absolute extrema on a closed interval:** values attained at more than one point, end-point maxima, and $5\sin x + 12\cos x$.
- **t06 Optimisation:**
  - Fixed perimeter; a kitchen garden against a wall.
  - An open box from a 24 cm sheet; a closed tin of fixed volume ($h = 2r$).
  - The nearest point of $y^2 = 4x$ to $(6, 0)$; two numbers with $xy^2$ greatest.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1, "Rates, monotonicity, tangents and normals" (t01–t03): 19 slides. Part 2, "Maxima, minima and optimisation" (t04–t06): 18 slides. |
| Worked examples | 5 + 5 |
| Visuals | 29 of 37 slides; never more than one slide in a row without a visual. Deck visuals: 9 plots, plus flows and tables. |
| Check slides | 4 + 4, all objective items not used in any test: m04, m06, m12, n03; m18, m19, m21, fb3 |
| Notes | 6 sections, each with key terms, a formula and visuals; exam tips with mark splits and five common mistakes |
| Flashcards | 30 |
| Questions | 68 items worth 121 marks: mcq 26 (keys a7 b7 c6 d6), assertion-reason 5 (keys a a b a c), true-false 3, fill-blank 3, numerical 6, short-2 9, short-3 10, long-5 6 (each set in 3 + 2 parts) |
| Difficulty | d1 6, d2 30, d3 27, d4 5 |
| Competency | recall 1, understanding 32, application 20, analysis 15. Application or above: 51% of items, 64% of marks. Routine one-step rates, derivatives and evaluations are tagged understanding (D-035). |
| Tests | `t_isc12math_ch07_short` (20 marks, 50 min) and `t_isc12math_ch07_long` (40 marks, 100 min) on `isc-12-default-chapter-test-short/long`. Sections: A objective; B 2-mark with a choice; C 3-mark with a choice; D 5-mark in parts (with a choice in the long test). The two tests share no items. |

## Verifier record
- **Re-solve:** 116/116 checks pass (see `src/resolve.log`, which is gitignored). The checks work as follows:
  - Derivatives use central differences.
  - Rates are re-derived by differentiating the quantity along its path in time.
  - Monotonic intervals are checked by sampling the sign of $f'$.
  - Local extrema are checked by the sign change of $f'$ and by $f''$.
  - Absolute extrema use dense sampling with golden-section refinement.
  - Angles use $\tan\theta = \left|\frac{m_1 - m_2}{1 + m_1m_2}\right|$ with numeric slopes.
  - MCQ distractors are evaluated independently, so exactly one option matches.
- **Self-checks in the build:** every worked-example table, sign chart and plotted turning point is recomputed and asserted in `build.mjs`.
- **Plots:** all 30 marked points lie on their curves. No zero is marked, so no zero rule is triggered.
- **Lint and originality:**
  - Lint: 0 errors, 0 warnings.
  - The exact-stem check (maths stripped) finds 0 collisions.
  - The pipeline's near-duplicate rule (5-gram Jaccard 0.7 or more) finds 0 pairs against all 13,457 authored and exemplar stems. One earlier collision with CBSE 12 ch06's "second derivative test" stem was reworded.
- **Rebuild:** byte-identical `release.json` and `tests.json`.

## Facts and choices for a reviewer
- The angle-between-curves and tangent and normal topics are taught as ISC 2027 requires. A tangent and normal are also given for a parametric curve, which uses the ch06 method.
- `ar3` is keyed (b). Both statements are true, but "the product of slopes is 1" does not by itself give the angle.
- `m19` treats $x = 2$ as a critical point of $|x - 2| + 1$ because $f'(2)$ does not exist.
- `l05` uses the parabola $y^2 = 4x$ and the point $(6, 0)$ (nearest points $(4, \pm4)$, distance $2\sqrt5$). Familiar textbook set-ups, such as $x^2 = 2y$ with $(0, 5)$, were avoided on purpose.
- All contexts and numbers are SOYL's own and the places named are imagined settings. No NCERT or ISC-textbook exercise and no past-paper item is reused (D-036).

## Gaps
- Narration audio is not generated yet (TTS stage).
- Nobody has seen the plot labels rendered, so they need a look at 360 px on staging.
