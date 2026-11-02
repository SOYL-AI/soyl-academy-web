# ICSE Class 10 Mathematics — Chapter 15: Loci (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) in the ICSE 2027 Mathematics presentation, built with the
CBSE maths chapter approach (builders + independent re-solve). Author: `claude-opus-5-5 (subject-producer)`, provenance
`origin: "human"`, `model: null`. All items are `status: "draft"` until review.

## Scope (ICSE 2027 syllabus, Unit 3 Geometry)
- **t01** Meaning of locus (the set of all points, and only those points, that obey a rule); the circle as the locus of points at a fixed distance from a fixed point (inside, on, outside; testing coordinates against $r^2$; a circle drawn at a scale); the locus of points at a fixed distance from a line (a pair of parallels, one on each side).
- **t02** Locus of points equidistant from two points: the perpendicular bisector; its construction (arcs of radius more than half the segment); lengths along it (Pythagoras); testing points in coordinates; the centre of a circle on the perpendicular bisector of a chord.
- **t03** Locus of points equidistant from two intersecting lines: both angle bisectors (at right angles), the bisector construction, the distance from a point of a bisector to the arms ($s \sin(\theta/2)$); equidistant from two parallel lines: the midline.
- **t04** Intersection of loci and construction problems: a point obeying two conditions is at the intersection of two loci; line and circle meet in 2, 1 or 0 points, two circles by $d$ against $r_1 \pm r_2$; the plan "construct, draw the loci, mark, measure"; regions ("nearer to $B$ than to $C$", "within $r$ of $A$"); the point equidistant from three corners (two perpendicular bisectors).
- **Removed for ICSE 2027:** proofs of the locus theorems. The notes say so in one line and use the results; no proof is asked.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Circles, parallels and the perpendicular bisector" (t01–t02) 16 slides; Part 2 "Angle bisectors, midlines and combined loci" (t03–t04) 19 slides |
| Worked examples | 4 + 6 (inside, on or outside a circle; the path of a coin's centre; a point on a perpendicular bisector; testing points on a coordinate plan; distance from the arms of a bisected angle; a line of lamps midway between parallels; equidistant and a fixed distance; triangle with the bisector of $B$ and the perpendicular bisector of $BC$; bisector with a parallel to $BC$; a region) |
| Visuals | 25 of 35 slides (geometry 19, table 5, flow 1); max 1 consecutive slide without a visual. Notes: 7 sections, each with a visual and further figures. Seven questions carry a figure (q071–q077) |
| Check slides | 3 + 3, all objective mcq (q002 q006 q003; q004 q009 q017) |
| Notes | 7 sections with key terms and formulas; exam tips with mark split and 6 common mistakes |
| Flashcards | 30 (definition 7, concept 11, example 7, formula 2, exam-tip 3) |
| Questions | 77 items, 178 marks: mcq 20, assertion-reason 6 (keys a c d b a c), true-false 10, fill-blank 8, numerical 9 (6 × 1 mark, 3 × 2 marks), short-2 5, short-3 6, short-4 6, long-10 7 (structured (a)(b)(c), 3 + 3 + 4, 7 step marks each) |
| Difficulty | d1 20, d2 23, d3 23, d4 10, d5 1 |
| Competency | recall 12, understanding 20, application 28, analysis 17 — application or higher 58% of items, 80% of marks (lint band 45–65%) |
| Topics | t01 15, t02 26, t03 27, t04 29 (items may carry two or three topics) |
| Tests | `t_icse10math_ch15_short` (20 marks / 45 min: A = q001 q007 q012 mcq, q021 AR, q059 q060 short-3; B = one of q071, q073) and `_long` (40 marks / 90 min: A = q005 q008 q010 q014 q015 q018 mcq, q022 q025 AR, q065 q066 q069 short-4; B = any two of q072 q074 q076). Disjoint; no deck-check question in a test |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests), `src/questions.mjs` and `src/questions2.mjs` (bank + one
re-solve check per item), `src/loci.mjs` (the constructions), `src/figs.mjs` and `src/figs2.mjs` (figures and the
computed set-ups used in decks, notes and questions), `src/qh.mjs` (the multiple-choice builder and rounding helpers),
`src/sim.mjs` (assertion helpers), `src/fr.mjs` and `src/work.mjs` (exact fractions and working-line checker, copied from
ch14), `src/lib.mjs` (shared ICSE builders, copied unchanged). Run from `platform/`:
`npx tsx content/authored/maths/icse-10-mathematics-ch15/src/build.mjs`; lint only this chapter with
`npx tsx content/authored/maths/icse-10-mathematics-ch15/src/lint.mts content/authored/maths/icse-10-mathematics-ch15`.
Rebuilding is deterministic (identical `release.json` / `tests.json` hashes on repeated runs).

- **Constructions (`loci.mjs`):** every locus is a line `{point, unit direction}` or a circle, and every constructed point is the exact (floating point, $10^{-9}$) intersection of two loci: line with line (perpendicular bisector with a bisector, midline with a bisector), line with circle, circle with circle. The builders also compute what a student would measure: lengths such as $BP = \dfrac{BC/2}{\cos(B/2)} = 3.75$ and $AP = 2.2$, distances from a point to a line, and angles. Question checks assert those values rounded to $0.1$ cm (two decimals where the model answer shows two).
- **Figures (`figs.mjs`, `figs2.mjs`):** drawn from the computed coordinates with circles, tick marks for equal lengths, right-angle marks and degree arcs. The builder asserts equal distances (points on a perpendicular bisector, on a bisector, on a midline), right angles, bisected angles ($35^\circ$ each), points on circles, the number of common points of line and circle (2, 1, 0 in the intersection figure), that numeric segment labels equal the true lengths on one scale and that degree labels equal the measured angle. Measured results (for example $BP \approx 3.8$) are never written as a segment label, only in the caption or the text.
- **Worked values:** every number in a worked example, table, note and flashcard is recomputed with exact arithmetic or from the construction; lines with square roots, trigonometry or rounding use $\approx$.
- **Re-solve:** 212/212 checks pass (`src/resolve.log`). MCQ options are built around the key letter and the check requires exactly one option to carry the recomputed value; distractors are the slips they represent (subtracting instead of Pythagoras, $\cos$ for $\sin$, the whole angle instead of half, a line instead of a pair, the diameter for the radius, the scale applied the wrong way). Counts of solutions (4 points, 2, 1, 0) come from the intersection routines, not from typed numbers.
- **KaTeX:** 1,706 math strings parse in strict "error" mode; no Unicode maths symbols inside `$…$`; no bare command words.
- **Narration:** 35 slides, max 78 words, mean 55; numbers in words, points and lines as spaced letters, no symbols or capital-letter abbreviations.
- **MCQ key balance:** options rotated after the re-solve (a 5, b 5, c 5, d 5).
- **Solution notes (D-032):** written-type working is in `answer.model_answer_md`; `solution_md` is a short method note.
- **Gates:** stage-4 `lintExemplar` on this chapter: 0 errors, 0 warnings. Stage-5 deterministic checks (`verify-local`): 77 questions, 0 flags. **Originality** (`content originality --authored`): this unit 0 errors, 0 warnings.

## Originality
Set-ups, numbers and wording were chosen for this chapter (clock hand, coin on a ruler, bus shelter, fountain, relay tower and lighthouse, two roads with a ferry landing, flower bed with a water pipe, parallel roads with a bus stop, rectangular lawn with a sprinkler) and every stem names its own content; items on the same locus use different contexts and different numbers. No item is taken from a textbook (Selina, ML Aggarwal, NCERT), specimen paper or past paper; CISCE documents were used for pattern only.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Constructions are described step by step and drawn as computed figures; the "measure" results are the values a careful $0.1$ cm drawing gives, not tolerances: a marking scheme may accept $\pm 0.1$ cm.
- Locus regions (shading) are described and tested with points, not shaded in a figure, because the figure schema has no filled circle sector.
- The "stadium" locus (a fixed distance from a line segment) is not covered: ICSE 2027 lists fixed distance from a line and points, and the segment case needs semicircular ends that the figure schema cannot draw.
