# CBSE 10 Mathematics — ch11 Areas Related to Circles (hand-authored, D-026)

Author: claude-opus-5-5 (subject-producer, batch C). Status: `draft` (pending review). Academic year 2026-27.

## Scope
Syllabus topics: t01 area of a sector and length of an arc; t02 area of a segment — **only for central angles of 60°, 90° and 120°**, as the learning outcome specifies; t03 areas and perimeters of shaded regions combining sectors, segments, triangles and squares. Removed topic respected: the separate "areas of combinations of plane figures" section is deleted, so combinations appear only as simple shaded regions inside problems (tiles, leaves, parks, crescents). Every stem states the value of π (22/7 or 3.14), and of √3 (1.73) or √2 (1.414) when needed; the keys use exactly those values.

## Contents
| | |
|---|---|
| Decks | Part 1 *Sectors and arcs* (16 slides), Part 2 *Segments and shaded regions* (17 slides) |
| Worked examples | 4 + 6 (Chennai cricket boundary, pendulum, Patna birthday cake, 60°/90°/120° segments, rangoli tile, leaf, sectors in a triangle) |
| Check slides | 3 + 3, all objective |
| Visuals | 23 of 33 slides; never more than 1 slide without a visual. 14 SVG figures in decks, 16 more in notes and questions, plus tables, a strategy flow and one geometry figure |
| Notes | 6 sections + exam tips |
| Flashcards | 30 |
| Questions | 70 (141 marks): mcq 18 · AR 6 · TF 5 · fill 5 · numerical 9 · short-2 9 · short-3 7 · long 6 · case 5 |
| Difficulty | d1 12 · d2 30 · d3 23 · d4 4 · d5 1; application or higher 56% of items, 73% of marks |
| Tests | `t_cbse10math_ch11_short` (20 marks) and `_long` (40 marks) on the default blueprints, disjoint |

## Figures
Shaded regions are SVG figures (`src/figs.mjs`) built with the shared `Svg` class in `../cbse-10-mathematics-ch10/src/lib.mjs`: every arc, sector and segment is computed from its centre, radius and angles, so drawn points lie exactly on their circles. Composite regions (a tile with holes, a triangle minus three sectors) use one even-odd path, so the shading is exactly the region described. They use the theme colours (`currentColor`, `var(--diagram-*)`) and pass the SVG allow-list. One geometry figure (sector of 60°, radius 21 cm) has its angle and length labels checked to scale.

## Verifier pass
From `platform/`, `npx tsx content/authored/maths/cbse-10-mathematics-ch11/src/build.mjs` gives: KaTeX strict over 1158 maths strings, 0 failures; 127/127 re-solve checks. Each key is recomputed from the stem's own π and √3, and the intermediate numbers in solutions and model answers are checked too (sector, triangle, segment, rings, costs). Segment triangles come from the angle (½r² for 90°, (√3/4)r² for 60° and 120°), and the 120° case is checked once more through OM = r/2 and AB = √3·r. The crescent (l06) is checked with both π = 22/7 and the true π, which confirms that the answer does not depend on π. Shaded regions are checked two ways where possible (leaf = 2 segments = 2 quadrants − square; inscribed triangle = 3 segments = circle − triangle). Fix during the pass: the m18 check listed the options in the wrong order (the content was right). Figure QA: the 120° figure was clipped at the bottom and its labels overlapped, so the canvas was enlarged.

## Originality
All items are original. NCERT configurations deliberately avoided: the lighthouse, the car wipers, the umbrella and brooch, the 14 cm minute hand in 5 minutes, the racing track, and the NCERT shaded-design exercise figures. Contexts: Kolkata, Raipur and Chennai cricket grounds, a Bengaluru sprinkler, a Kochi station clock, a Udaipur pond path, a Rajasthani hand fan, a Lucknow park, an Ashoka Chakra in Sarnath, a Jaipur haveli doorway, a Bhubaneswar walking track and a Hyderabad pizza.

## Known gaps
Narration audio is not generated yet (TTS stage). SVG labels are plain text (θ, °) because SVG cannot carry KaTeX.

## Changed by assessment-designer (2026-10-27)

Rewritten in `src/questions.mjs` (then rebuilt) because `originality --authored` flagged them as near-duplicates of other items in this chapter; each is now a different question (new numbers, context or skill) with its re-solve check: fb2 (q_cbse10math_ch11_031: area swept by a minute hand).
