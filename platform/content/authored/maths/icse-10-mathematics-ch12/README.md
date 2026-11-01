# ICSE Class 10 Mathematics — Chapter 12: Section and Mid-Point Formulae (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) in the ICSE 2027 Mathematics presentation, built with the
CBSE maths chapter approach (builders + independent re-solve). Author: `claude-opus-5-5 (subject-producer)`, provenance
`origin: "human"`, `model: null`. All items are `status: "draft"` until review.

## Scope (ICSE 2027 syllabus, Unit 2 Algebra)
- **t01** Section formula for internal division: the meaning of $AP : PB = m_1 : m_2$, the formula (derived from similar right triangles), points of trisection and "a fraction of the way along"; the ratio in which a given point divides a segment ($k : 1$ from one coordinate, checked with the other); the ratio in which the $x$-axis, the $y$-axis or a line $ax + by = c$ divides a segment, and the point of division; an unknown coordinate of a point on a segment.
- **t02** Mid-point formula (the $1 : 1$ section point); an end point from the other end and the mid-point; unknowns from a mid-point; the fourth vertex of a parallelogram (diagonals bisect each other).
- **t03** Centroid of a triangle: medians, the $2 : 1$ property, the formula derived from the section formula on a median; a missing vertex from the centroid; vertices from the mid-points of the sides; a triangle and its triangle of mid-points share the centroid.
- Removed for ICSE 2027: the section formula for **external division** — named once in notes section 1 as not in the syllabus and used nowhere else (no external point, no negative ratio; `lineCut`/`axisCut` assert that the two ends lie on opposite sides).

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "The section formula" (t01) 21 slides; Part 2 "Mid-points and the centroid" (t02–t03) 21 slides |
| Worked examples | 6 + 6 (2 : 3 point of $A(-5, 9)$, $B(5, -6)$; points of trisection of $A(-7, 2)$, $B(8, -4)$; ratio from $P(1, -1)$; both axes cutting $A(-2, -5)B(6, 7)$, one at a fractional point; the line $x + y = 3$; an unknown coordinate $P(-3, b)$ / a mid-point; an end point and unknowns from a mid-point; a fourth parallelogram vertex; a centroid by formula and by the median; a missing vertex; vertices from the mid-points of the sides) |
| Visuals | 30 of 42 slides (plot 22, table 5, flow 3); max 1 consecutive slide without a visual. Coordinate plots draw segments, triangles, medians and the line $x + y = 3$ as line series. Notes: 7 sections, each with a visual, plus 18 more |
| Check slides | 4 + 4, all objective (q001 mcq, q011 mcq, q037 numerical, q026 true-false; q002 mcq, q008 mcq, q016 mcq, q029 true-false) |
| Notes | 7 sections with key terms and formulas; exam tips with mark split and 6 common mistakes |
| Flashcards | 30 (definition 3, formula 6, example 8, concept 8, exam-tip 4, diagram 1) |
| Questions | 66 items, 166 marks: mcq 18, assertion-reason 6 (keys a c d b a c), true-false 6, fill-blank 6, numerical 7 (3 × 1 mark, 4 × 2 marks), short-2 5, short-3 5, short-4 6, long-10 7 (structured (a)(b)(c), 3 + 3 + 4, 6–8 step marks each) |
| Difficulty | d1 12, d2 33, d3 18, d4 3 (q055 both axes through the origin, q059 vertices from mid-points, q062 centroids trisecting a parallelogram diagonal) |
| Competency | recall 3, understanding 23, application 33, analysis 7 — application or higher 61% of items, 83% of marks (lint band 45–65% of items) |
| Topics | t01 33, t02 31, t03 22 (items may carry two or three topics) |
| Tests | `t_icse10math_ch12_short` (20 marks / 45 min: A = q004 q009 q012 mcq, q020 AR, q049 q051 short-3; B = one of q060, q061) and `_long` (40 marks / 90 min: A = q006 q007 q010 q013 q014 q018 mcq, q021 q024 AR, q054 q056 q058 short-4; B = any two of q062 q063 q065), matching `icse-10-mathematics-chapter-test-short/long`; disjoint, and no deck-check item is used |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests), `src/questions.mjs` (bank + one re-solve check per item),
`src/sect.mjs` (exact section-formula geometry), `src/work.mjs` (working-line checker, copied from ch11 with only
the header and import changed), `src/lib.mjs` (shared ICSE builders, copied unchanged). Run from `platform/`:
`npx tsx content/authored/maths/icse-10-mathematics-ch12/src/build.mjs`; lint only this chapter with
`npx tsx content/authored/maths/icse-10-mathematics-ch12/src/lint.mts content/authored/maths/icse-10-mathematics-ch12`.
Rebuilding is deterministic (identical `release.json` / `tests.json` hashes on repeated runs).

- **Exact arithmetic (`sect.mjs`):** every coordinate is an exact fraction, so fractional answers such as $\left(\dfrac{4}{3}, 0\right)$ or $\left(-\dfrac{3}{2}, -1\right)$ are exact. A division point is computed by the section formula **and** as $A + t(B - A)$ with $t = \dfrac{m}{m + n}$; it must be collinear with $A$ and $B$, lie between them, and satisfy $n^2 AP^2 = m^2 PB^2$. A ratio from a known point is found from one coordinate, checked by the other and by recomputing the point. An axis or line cut needs the ends on opposite sides; the point is recomputed from the ratio and checked on the axis or line. Mid-points are the $1 : 1$ section point (and $AM = MB$); an end point is checked by taking the mid-point again. A centroid is the average of the vertices **and** the $2 : 1$ point of all three medians; missing vertices, fourth parallelogram vertices (diagonals share the mid-point **and** $\vec{AB} = \vec{DC}$) and vertices from mid-points are each checked forwards.
- **Working lines (`work.mjs`):** every equation typed in a worked example, note, flashcard or model answer (e.g. $\dfrac{2 \times 5 + 3 \times (-5)}{2 + 3} = \dfrac{-5}{5} = -1$, $\dfrac{6k + (-3)}{k + 1} = 0 \Rightarrow 6k = 3 \Rightarrow k = \dfrac{1}{2}$, $(8k - 1) + 2(7k - 2) = 4(k + 1)$, $\sqrt{9^2 + 12^2} = \sqrt{225} = 15$) is parsed from its TeX by an exact parser; numeric sides must be equal exactly and an equation in an unknown ($k$, $p$, $q$, $a$, $b$, $h$, $x$, $y$) must hold at the verified solution. The section, mid-point, centroid and end-point lines are generated from the points by `sect.mjs`, so the text cannot drift from the computed values. An unparsable line stops the build.
- **Re-solve:** 342/342 checks pass (`src/resolve.log`). Keys and option values are typed as literals and compared with recomputed values; MCQ distractors are the usual slips, each recomputed (ratio parts paired with the wrong ends, forgetting to divide by $m_1 + m_2$, dividing by 2 instead of 3, the mid-point of $PM$ instead of the far end, $P + Q - R$ for the fourth vertex, the $x$-axis condition used for the $y$-axis, $PB : AP$ or $AP : AB$ for $AP : PB$). Model answers are checked to contain every computed point, ratio and value.
- **Plots:** 166 marked points; every one lies on a drawn segment (an end or an interior point, checked exactly with fractions) and every label is generated from the point's coordinates. The plots carry no function curves, so the curve and zero rules do not apply.
- **KaTeX:** 2,043 math strings parse with KaTeX in strict "error" mode; no Unicode maths symbols inside `$…$`. A scratch scan found no lost backslashes inside inline maths (its three hits were text between a `$$…$$` display block and the next inline span, not maths).
- **Narration:** 42 slides, max 70 words, mean 50; numbers in words, no symbols, no capital-letter abbreviations (segments are read "A B").
- **MCQ key balance:** options rotated after the re-solve (a 5, b 5, c 4, d 4).
- **Solution notes (D-032):** written-type working is in `answer.model_answer_md`; `solution_md` is a short method note; a scan found no solution sentence of 60+ characters repeated in the stem, options or model answer.
- **Gates:** stage-4 `lintExemplar` on this chapter: 0 errors, 0 warnings. Stage-5 deterministic checks (`verify-local`): 66 questions, 0 flags. **Originality** (`content originality --authored`): this unit 0 errors; the pipeline's near-duplicate measure (5-gram Jaccard) finds no pair at or above 0.7 against the 3,892 authored stems, and the closest pairs with CBSE 10 ch07 are at 0.42 or below.

## Originality
CBSE 10 Mathematics ch07 (distance and section formula) is in the bank; its stems, worked examples and points were read
first and avoided: no pair of end points, ratio set-up or context is reused (its map, village, metro and treasure-hunt
contexts are not used; the one context here is an imagined park in "Navrang Nagar"). Two early drafts that came close
in wording (an $x$-axis ratio stem at 0.86 and an assertion at 0.55) were rewritten before release. No item is taken
from a textbook (Selina, ML Aggarwal, NCERT), specimen paper or past paper; CISCE documents were used for pattern only.
Stems name their own content and similar items are worded differently.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Model answers describe the working in words and equations (answers carry no visuals); no question carries a figure in its stem.
- Plot labels sit to the upper right of each point; on the densest slides (part 2 worked example 6, six labelled points) labels may sit close together at 360 px and should be checked in the staging UI.
