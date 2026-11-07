# ICSE Class 10 Mathematics — Chapter 13: Equation of a Straight Line (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) in the ICSE 2027 Mathematics presentation, built with the
CBSE maths chapter approach (builders + independent re-solve). Author: `claude-opus-5-5 (subject-producer)`, provenance
`origin: "human"`, `model: null`. All items are `status: "draft"` until review.

## Scope (ICSE 2027 syllabus, Unit 2 Algebra)
- **t01** Inclination and slope $m = \tan \theta$ (inclinations 0°, 30°, 45°, 60°, 90°, 135° only); slope from two points; sign of the slope; vertical lines have no slope; collinearity by equal slopes.
- **t02** Slope-intercept form $y = mx + c$; reading $m$ and $c$ from $ax + by + c = 0$ (slope $-\frac{a}{b}$, $y$-intercept $-\frac{c}{b}$); intercepts on the axes; testing whether a point lies on a line.
- **t03** Point-slope form $y - y_1 = m(x - x_1)$ and the two-point form; lines parallel to the axes.
- **t04** Parallel ($m_1 = m_2$) and perpendicular ($m_1 m_2 = -1$) lines; lines through a point parallel or perpendicular to a given line; unknown coefficients; the meeting point of two lines and the foot of a perpendicular.
- **t05** Applications with the section and mid-point formulae (ch12): perpendicular bisector, median, altitude, centroid on a median, a section point and a perpendicular, a parallelogram and rectangle by slopes.
- The syllabus lists no removed topics for this chapter.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Slope, inclination and the forms of a line" (t01–t03) 22 slides; Part 2 "Parallel and perpendicular lines, and applications" (t04–t05) 20 slides |
| Worked examples | 6 + 8 (slope and inclination of $PQ$; inclination from two points and slope from 60°; unknown $k$ for collinear points; writing and reading $y = mx + c$; point-slope form; two-point form; testing three pairs of lines; a parallel line; a perpendicular line and its foot; unknown $k$ for parallel/perpendicular; a line through a meeting point; a perpendicular bisector; a median and an altitude; a section point and a perpendicular) |
| Visuals | 30 of 42 slides (plot 24, table 5, flow 1); max 1 consecutive slide without a visual. Lines are drawn as functions on stated domains; vertical lines as dashed reference lines; rise and run as helper segments. Notes: 7 sections, each with a visual, plus 18 more |
| Check slides | 4 + 4, all objective (q003 q018 q008 mcq, q026 true-false; q009 q012 q014 mcq, q030 true-false) |
| Notes | 7 sections with key terms and formulas; exam tips with mark split and 6 common mistakes |
| Flashcards | 30 (definition 2, formula 8, concept 8, example 9, exam-tip 2, diagram 1) |
| Questions | 66 items, 166 marks: mcq 18, assertion-reason 6 (keys c a b d c a), true-false 6, fill-blank 6, numerical 7 (3 × 1 mark, 4 × 2 marks), short-2 5, short-3 5, short-4 6, long-10 7 (structured (a)(b)(c), 3 + 3 + 4, 6–7 step marks each) |
| Difficulty | d1 8, d2 34, d3 22, d4 2 |
| Competency | recall 5, understanding 23, application 31, analysis 7 — application or higher 58% of items, 81% of marks (lint band 45–65% of items) |
| Topics | t01 15, t02 22, t03 14, t04 22, t05 14 (items may carry two or three topics) |
| Tests | `t_icse10math_ch13_short` (20 marks / 45 min: A = q001 q005 q013 mcq, q019 AR, q049 q052 short-3; B = one of q060, q062) and `_long` (40 marks / 90 min: A = q002 q006 q010 q011 q015 q017 mcq, q021 q023 AR, q054 q057 q059 short-4; B = any two of q061 q064 q065), matching `icse-10-mathematics-chapter-test-short/long`; disjoint, and no deck-check item is used |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests), `src/questions.mjs` (bank + one re-solve check per item),
`src/line.mjs` (exact lines, slopes, intercepts, meeting points, section points), `src/fr.mjs` (exact fractions, from
ch11), `src/work.mjs` (working-line checker from ch11, unchanged except the import), `src/lib.mjs` (shared ICSE builders,
copied unchanged). Run from `platform/`: `npx tsx content/authored/maths/icse-10-mathematics-ch13/src/build.mjs`; lint only
this chapter with `npx tsx content/authored/maths/icse-10-mathematics-ch13/src/lint.mts content/authored/maths/icse-10-mathematics-ch13`.
Rebuilding is deterministic (identical `release.json` / `tests.json` hashes on three runs).

- **Lines (`line.mjs`):** all arithmetic is with exact fractions. Every line is normalised to $ax + by + c = 0$ with integer, coprime coefficients ($a > 0$, or $a = 0$ and $b > 0$), so two lines are equal exactly when their triples are. A line from a point and a slope must contain the point and a second point one step along the slope; a line through two points is built from the slope **and** from the two-point determinant form, and the triples must agree and contain both points. Parallel and perpendicular are decided by coefficients ($a_1 b_2 - a_2 b_1$, $a_1 a_2 + b_1 b_2$) **and** by slopes (with the vertical/horizontal cases), and the two must agree. Meeting points by Cramer's rule, substituted into both lines. Section points by collinearity and squared-length ratio; the centroid on two medians and at 2 : 1; perpendicular bisectors by equal distances from two of their points.
- **Typed equations:** every option, key and final equation is typed as TeX, parsed back by the exact parser, checked to be linear in $x$ and $y$ (five sample points) and compared with the computed line. Every step of a typed chain such as $y - 4 = -\dfrac{3}{2}(x + 1) \Rightarrow 2y - 8 = -3x - 3 \Rightarrow 3x + 2y - 5 = 0$ must have exactly the computed line as its graph.
- **Working lines (`work.mjs`):** numeric lines (slopes, mid-points, section points, areas, substitutions such as $2 \times 4 + 3 \times (-1) - 5 = 0$) must be exactly equal; equations in one unknown ($\dfrac{7 - 3}{k - 3} = 2 \Rightarrow k = 5$) must hold at the verified solution.
- **Re-solve:** 297/297 checks pass (`src/resolve.log`). MCQ distractors are the usual slips, each recomputed: run over rise, mixed subtraction order, sign of the slope or intercept, the slope upside down, the $x$-intercept for the $y$-intercept, the perpendicular value of $k$ for the parallel one, the side or altitude for the median, $\tan 60^\circ$/$\tan 30^\circ$ for $\tan 45^\circ$. Inclination items are checked with `Math.tan`/`Math.atan` to $10^{-12}$.
- **Plots:** 45 plots (24 deck, 21 notes), 108 marked points; every point lies exactly on a drawn line inside its domain (or on a dashed vertical line), labels are generated from coordinates, and every marked $x$-intercept is the only zero of its line (14 zeros located numerically by the lib, none at a domain's left end); 28 marked points lie on two lines (meeting points).
- **KaTeX:** 1,555 math strings parse with KaTeX in strict "error" mode; no Unicode maths symbols inside `$…$`; a scratch scan found no bare command words inside maths (only vertex names such as $ABC$).
- **Narration:** 42 slides, max 65 words, mean 46; numbers in words, no symbols or capital-letter abbreviations.
- **MCQ key balance:** options rotated after the re-solve (a 5, b 5, c 4, d 4).
- **Solution notes (D-032):** written-type working is in `answer.model_answer_md`; `solution_md` is a short method note.
- **Gates:** stage-4 `lintExemplar` on this chapter: 0 errors, 0 warnings. Stage-5 deterministic checks (`verify-local`): 66 questions, 0 flags. **Originality** (`content originality --authored`): this unit 0 errors, 0 warnings; a scratch 5-gram Jaccard scan of this chapter's stems against all 3,826 authored maths stems found a maximum of 0.29.

## Originality
CBSE 10 Mathematics has no equation-of-a-line chapter; ICSE ch12 (section and mid-point formulae) was being written in
parallel, so this chapter's stems always ask for a slope, an equation, a median, an altitude or a bisector rather than a
bare point. All points, lines and triangles were chosen for this chapter; no item is taken from a textbook (Selina,
ML Aggarwal, NCERT), specimen paper or past paper; CISCE documents were used for pattern only. Stems name their own
content and similar items are worded differently.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Model answers describe the working in words and equations; no question carries a figure.
- Plots do not force equal axis scales, so perpendicular lines may not look exactly perpendicular in the renderer; captions state the slopes.
- ch12's release did not exist when the originality gate ran; re-run originality after ch12 lands.
- **2026-11-05:** assertion-reason options reordered to the ICSE 2027 Mathematics specimen paper (511) order and wording; every key re-mapped so each item's meaning is unchanged.
