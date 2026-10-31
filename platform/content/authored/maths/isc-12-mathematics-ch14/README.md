# ISC Class 12 Mathematics — Chapter 14: Three-Dimensional Geometry: Lines (authored, v1)

Hand-authored production chapter (D-025, D-026). Author: `claude-opus-5-5 (subject-producer)`; provenance `origin: "human"`, `model: null`. Every item is `status: "draft"` until review.

The chapter is built with the shared ISC 12 maths lib, `isc-12-mathematics-ch01/src/lib.mjs`, which was not edited here. `src/vec.mjs` is a copy of the CBSE 12 ch11 3-D vector helpers, with its import switched to the ISC lib.

## Scope (ISC 2027, Unit 5, lines only)

- **t01** Direction cosines and ratios of a line through two points, $l^2 + m^2 + n^2 = 1$, and the equations of the coordinate axes and coordinate planes.
- **t02** The angle between two lines, the perpendicular and parallel conditions, and a direction perpendicular to two lines ($\vec{b}_1 \times \vec{b}_2$).
- **t03** Vector and Cartesian equations of a line through a point with a given direction and through two points. Standard form is required before reading a Cartesian line.
- **t04** Coplanar and skew lines (scalar triple product test), the point of intersection, the foot of the perpendicular, the distance of a point from a line, and the image of a point in a line.
- **t05** Shortest distance between skew lines and between parallel lines.
- **Planes** belong to ch15 and appear nowhere. The only "plane" items are the coordinate planes $x = 0$, $y = 0$ and $z = 0$, which the syllabus names in t01.

## Contents

| Item | Count |
|---|---|
| Decks | Part 1 (t01–t03) has 21 slides; Part 2 (t04–t05) has 16 slides |
| Visuals | All 37 slides carry one: 9 oblique 3-D sketches (`geom`, captioned "not to scale"), 20 tables and 8 flows |
| Worked examples | Part 1 has 5 and Part 2 has 4. Each is recomputed and asserted in `build.mjs`, for example the line meeting point $(3, 1, 1)$, the foot $(1, 0, 1)$ at distance $9$, the skew distance $\tfrac53$ and the parallel distance $\tfrac{\sqrt{89}}{3}$ |
| Check slides | Part 1: q004, q008, q012, q036. Part 2: q019, q024, q034, q040. None is used in a test |
| Notes | 6 sections, each with key terms, a formula and visuals, plus exam tips with the mark split and common mistakes |
| Flashcards | 30 |
| Questions | 67 items worth 120 marks (see the next table) |

| Question type | Count |
|---|---|
| mcq | 26 (keys a7 b7 c6 d6) |
| assertion-reason | 5 (keys a d c b a) |
| true-false | 3 |
| fill-blank | 3 |
| numerical | 5 |
| short 2-mark | 9 |
| short 3-mark | 10 |
| long 5-mark | 6, each set in parts |

- **Difficulty:** d1 17, d2 28, d3 18, d4 4.
- **Competency:** recall 9, understanding 21, application 28, analysis 9. That puts 55% of items and 71% of marks at application or above (lint band 45–65%). Five routine one-step items (m09, m10, m14, n02, n05) are tagged understanding under the D-035 rule.
- **Topics:** t01 has 17 items, t02 16, t03 15, t04 18 and t05 12.

### Tests

Both tests are on the `isc-12-default` chapter-test blueprints and share no items.

- **Short** (`t_isc12math_ch14_short`, 20 marks, 50 min):
  - A: m01 m07 m14 m20 ar1
  - B: s201, (s203 | s204)
  - C: s301, (s304 | s305)
  - D: l01
- **Long** (`t_isc12math_ch14_long`, 40 marks, 100 min):
  - A: m02 m05 m06 m09 m11 m13 m16 m18 m21 m22 ar2 ar4
  - B: s202 s205, (s206 | s207)
  - C: s302 s303 s306, (s307 | s308)
  - D: l02, (l03 | l04)

## Verifier record

Build from `platform/` with `npx tsx content/authored/maths/isc-12-mathematics-ch14/src/build.mjs`. It prints NO ERRORS, and the lib's stage-4 lint shows 0 errors and 0 warnings.

- **Re-solve:** 109 of 109 checks pass (`src/resolve.log`, gitignored). Each answer is checked a second way:
  - points of intersection are substituted into both lines;
  - feet of perpendiculars are tested for lying on the line with a perpendicular joining vector, and distances are recomputed with the cross-product formula;
  - every shortest distance by formula is compared with a numeric minimisation of the distance between moving points (`sdNumeric`);
  - angles use `acos`;
  - Cartesian lines are rebuilt from points at two parameter values to confirm the read-off direction;
  - MCQ options are evaluated independently so that exactly one matches.
- **KaTeX:** 1,120 maths strings parse in strict mode.
- **Originality:**
  - The lib's exact-stem pre-check passes (prose with maths removed, against every authored chapter).
  - A near-duplicate scan with the gate's own rule (5-gram Jaccard 0.7 or more, minimum 10 words, 13,872 stems) found one pair at 78%: fb3 against CBSE 12 ch11 q015 ("…neither parallel nor intersecting are called"). fb3 was reworded and the scan now finds 0 pairs.
  - All set-ups are SOYL's own: drones, ropeways, tunnels, ziplines, cable cars and stage lights. Familiar textbook pairs of lines were avoided.
- **Rebuild:** two builds give byte-identical `release.json` and `tests.json`.

## For a reviewer

- **`ar4`** is keyed (b). Non-parallel directions alone do not make lines skew; they must also fail to meet.
- **`s310`** gives the $y$-axis as $x = 0$, $z = 0$, and mentions $\dfrac x0 = \dfrac y1 = \dfrac z0$ only as the symbolic equivalent.
- **`l03(b)`** finds the image of a point in a line as $2F - P$. This is a direct use of the foot, not a separate syllabus topic.
- **`l04`** is in units of tens of metres, so its distance of 2 units is 20 m, and the model answer states both.
- **Rendering:** the 3-D sketches are oblique projections captioned "not to scale". Nobody has seen their labels rendered at 360 px, so they need a look on staging.
