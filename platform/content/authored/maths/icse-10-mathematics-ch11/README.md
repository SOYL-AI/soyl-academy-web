# ICSE Class 10 Mathematics — Chapter 11: Reflection (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) in the ICSE 2027 Mathematics presentation, built with the
CBSE maths chapter approach (builders + independent re-solve). Author: `claude-opus-5-5 (subject-producer)`, provenance
`origin: "human"`, `model: null`. All items are `status: "draft"` until review.

## Scope (ICSE 2027 syllabus, Unit 2 Algebra)
- **t01** Reflection of a point in the $x$-axis ($y = 0$) and the $y$-axis ($x = 0$): the rules $(x, -y)$ and $(-x, y)$, the mirror as the perpendicular bisector of $PP'$, a point from its image, distance between a point and its image.
- **t02** Reflection in the lines $x = a$ and $y = b$ ($(2a - x, y)$, $(x, 2b - y)$) and in the origin ($(-x, -y)$); the mirror line from a point and its image; unknown coordinates from a given image.
- **t03** Invariant points (on the mirror; only $O$ for the origin; the crossing point of two mirrors); combined reflections ($x$-axis then $y$-axis = origin, either order; the same mirror twice; perpendicular mirrors commute); reflecting a figure (congruent, vertex order reversed); graph-paper problems: plot a point or figure and its images, name the figure formed (rectangle, square, isosceles trapezium, kite, right-angled or isosceles triangle) with a reason, and find its area or perimeter.
- The syllabus lists no removed topics for this chapter. Reflection in $y = x$ is not in the syllabus and is not used. The notation $M_x$, $M_y$, $M_O$ is introduced as a common shorthand.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Images in the axes, the origin and lines parallel to the axes" (t01–t02) 20 slides; Part 2 "Invariant points, combined reflections and figures" (t03) 19 slides |
| Worked examples | 5 + 6 (images of $A(-5, 2)$ and $B(0, -3)$ in both axes; a point from its image in the $y$-axis, then its image in the origin; $R(7, -2)$ in $x = 3$ and $y = 1$; two mirror lines from point–image pairs; unknowns $a$, $b$ from an image; invariant points of four mirrors; $P(3, -5)$ in $y = 1$ and the $y$-axis in both orders; a rectangle from $A(5, 2)$ and its three images; an isosceles trapezium from a segment and its image in $x = 5$; a kite with two invariant vertices; a right-angled triangle from two successive reflections) |
| Visuals | 27 of 39 slides (plot 20, table 5, flow 2); max 1 consecutive slide without a visual. Coordinate plots draw segments and figures as line series and mirror lines as dashed reference lines. Notes: 7 sections, each with a visual, plus 14 more |
| Check slides | 4 + 4, all objective (q002 mcq, q011 mcq, q010 mcq, q030 true-false; q007 mcq, q027 true-false, q014 mcq, q028 true-false) |
| Notes | 7 sections with key terms and formulas; exam tips with mark split and 6 common mistakes |
| Flashcards | 30 (definition 2, formula 7, example 9, concept 8, exam-tip 3, diagram 1) |
| Questions | 66 items, 166 marks: mcq 18, assertion-reason 6 (keys c a b d c a), true-false 6, fill-blank 6, numerical 7 (3 × 1 mark, 4 × 2 marks), short-2 5, short-3 5, short-4 6, long-10 7 (structured (a)(b)(c), 3 + 3 + 4, 6–7 step marks each) |
| Difficulty | d1 11, d2 40, d3 13, d4 2 |
| Competency | recall 6, understanding 23, application 32, analysis 5 — application or higher 56% of items, 81% of marks (lint band 45–65% of items) |
| Topics | t01 22, t02 36, t03 37 (items may carry two or three topics) |
| Tests | `t_icse10math_ch11_short` (20 marks / 45 min: A = q001 q004 q012 mcq, q019 AR, q049 q051 short-3; B = one of q060, q063) and `_long` (40 marks / 90 min: A = q003 q006 q008 q009 q015 q018 mcq, q021 q022 AR, q054 q056 q058 short-4; B = any two of q061 q064 q066), matching `icse-10-mathematics-chapter-test-short/long`; disjoint, and no deck-check item is used |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests), `src/questions.mjs` (bank + one re-solve check per item),
`src/refl.mjs` (exact reflections, lengths, areas, figure names), `src/work.mjs` (working-line checker, from ch09 with
exact square roots added), `src/lib.mjs` (shared ICSE builders, copied unchanged). Run from `platform/`:
`npx tsx content/authored/maths/icse-10-mathematics-ch11/src/build.mjs`; lint only this chapter with
`npx tsx content/authored/maths/icse-10-mathematics-ch11/src/lint.mts content/authored/maths/icse-10-mathematics-ch11`.
Rebuilding is deterministic (identical `release.json` / `tests.json` hashes on three runs).

- **Reflections (`refl.mjs`):** coordinates are whole numbers or halves (asserted), so all arithmetic is exact. Every image is computed by the coordinate rule **and** checked against the geometric definition: for a line mirror the midpoint of $PP'$ lies on the mirror, $PP'$ is perpendicular to it and the two distances are equal; for the origin, $O$ is the midpoint. Reflecting the image again must give the point back, and a point is invariant exactly when it lies on the mirror (both asserted on every call). Mirrors from a point and its image are found from the midpoint and confirmed by reflecting; a "single equivalent reflection" is found by testing every candidate mirror on six points.
- **Figures:** areas by the shoelace formula **and** by Pick's theorem (interior lattice points counted one by one on a doubled grid); lengths as exact square roots (Math.hypot agrees); figure names from parallel sides (cross products), equal sides and right angles (dot products) on an asserted convex vertex order. Congruence of a reflected triangle is checked by its squared side lengths and area, and the reversed vertex order by the sign of its orientation.
- **Working lines (`work.mjs`):** every equation typed in a worked example, note, flashcard or model answer (e.g. $2 \times (-2) - 3 = -7$, $\dfrac{7 + (-1)}{2} = 3$, $\sqrt{6^2 + 8^2} = \sqrt{100} = 10$, $3p - 2 = 7 \Rightarrow p = 3$) is parsed from its TeX by an exact parser. Numeric sides must be equal exactly; identities ($a - (x - a) = 2a - x$, $b - (y - b) = 2b - y$) must agree at nine sample points; an equation in an unknown must hold at the verified solution. An unparsable line stops the build.
- **Re-solve:** 260/260 checks pass (`src/resolve.log`). Keys and option values are typed as literals and compared with recomputed values; MCQ distractors are the usual slips, each recomputed (the image in the other axis or in the origin; $a + x$ or $2b + y$ instead of $2a - x$ or $2b - y$; the wrong mirror line $x = a$ for $y = a$; the midpoint taken without the minus sign; the area without the half; the distance to the origin image). Model answers are checked to contain every computed coordinate pair and value.
- **Plots:** 143 marked points; every one is a vertex of a drawn segment or lies on a drawn mirror line, and every label is generated from the point's coordinates. The plots carry no function curves, so the curve and zero rules do not apply.
- **KaTeX:** 1,612 math strings parse with KaTeX in strict "error" mode; no Unicode maths symbols inside `$…$`; a scratch scan found no lost backslashes (`to`, `times`, `dfrac`, `sqrt` …), no stray `$$` inside inline text and no control characters.
- **Narration:** 39 slides, max 69 words, mean 48; numbers in words, no symbols, no capital-letter abbreviations ("P prime", "the x axis").
- **MCQ key balance:** options rotated after the re-solve (a 5, b 5, c 4, d 4).
- **Solution notes (D-032):** written-type working is in `answer.model_answer_md`; `solution_md` is a short method note; a scan found no solution sentence of 60+ characters repeated in the stem, options or model answer.
- **Gates:** stage-4 `lintExemplar` on this chapter: 0 errors, 0 warnings. Stage-5 deterministic checks (`verify-local`): 66 questions, 0 flags. **Originality** (`content originality --authored`): this unit 0 errors, 0 warnings; a scratch scan with the pipeline's 5-gram Jaccard found no pair at or above 0.4 between this chapter's stems and any authored maths stem (3,760 compared).

## Originality
The CBSE 10 Mathematics bank has no reflection chapter; its coordinate-geometry chapter (ch07) was read first and its
set-ups and points were avoided (no distance or section-formula stems, no map or village contexts). All points, mirror
lines and figures here were chosen for this chapter; well-known textbook set-ups were avoided on purpose. No item is taken
from a textbook (Selina, ML Aggarwal, NCERT), specimen paper or past paper; CISCE documents were used for pattern only.
Stems name their own content (the mirror, the point, the figure) and similar items are worded differently.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Model answers describe graph-paper work in words (answers carry no visuals); no question carries a figure in its stem.
- Plot labels sit to the upper right of each point; on the densest slides (three points and three images) labels may sit close together at 360 px and should be checked in the staging UI.
- **2026-11-05:** assertion-reason options reordered to the ICSE 2027 Mathematics specimen paper (511) order and wording; every key re-mapped so each item's meaning is unchanged.
