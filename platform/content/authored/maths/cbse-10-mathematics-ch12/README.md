# CBSE 10 Mathematics — ch12 Surface Areas and Volumes (hand-authored, D-026)

Author: claude-opus-5-5 (subject-producer, batch C). Status: `draft` (pending review). Academic year 2026-27.

## Scope
Syllabus topics: t01 surface area of a combination of any two of cube, cuboid, sphere, hemisphere, cylinder and cone; t02 volume of such combinations (tents, capsules, toys, silos, tanks). Both removed topics are absent everywhere, distractors included: **conversion of solids** (no melting and recasting, no digging and embankments, no water flowing through pipes) and the **frustum of a cone**. Every stem states the value of π it uses.

## Contents
| | |
|---|---|
| Decks | Part 1 *Surface area of combined solids* (16 slides), Part 2 *Volume of combined solids* (15 slides) |
| Worked examples | 5 + 6 (Manali camp tent, kulfi, cube with a scooped hemisphere, oil tanker, toy; Karnal silo, palette block, test tube, Chennai water tank, cone carved from a cylinder) |
| Check slides | 3 + 3, all objective |
| Visuals | 21 of 31 slides; never more than 1 slide without a visual. 14 SVG solid drawings in the decks and 15 more in notes and questions, plus formula, visibility and unit tables and two method flows |
| Notes | 6 sections + exam tips |
| Flashcards | 30 |
| Questions | 72 (149 marks): mcq 18 · AR 6 · TF 5 · fill 5 · numerical 9 · short-2 9 · short-3 8 · long 8 · case 5 |
| Difficulty | d1 13 · d2 29 · d3 25 · d4 4 · d5 2; application or higher 41% of items, 51% of marks (after the 2026-10-27 competency audit) (after the 2026-10-27 competency audit) |
| Tests | `t_cbse10math_ch12_short` (20 marks) and `_long` (40 marks) on the default blueprints, disjoint |

## Figures
`src/figs.mjs` draws combined solids as SVG in a tilted orthographic view: horizontal circles are ellipses with axis ratio 0.3, and vertical lengths are to scale within each figure. The sides of each cone run to the **exact tangent points** of its base ellipse from the apex (y = b²/h, x = ±a·√(1 − b²/h²)), so outlines are true silhouettes. Hidden rims are dashed. Labels give the real dimensions. Colours are theme variables, and every SVG passes the allow-list lint.

## Verifier pass
Running `npx tsx content/authored/maths/cbse-10-mathematics-ch12/src/build.mjs` from `platform/` gives: KaTeX strict over 962 maths strings with 0 failures, and 131/131 re-solve checks passing. A small formula library (cylinder, cone, hemisphere, sphere and cuboid, each taking π as a parameter) recomputes every key. Surfaces of combined solids are built from the visible faces in code, and the hidden-face claims are checked separately: joining along a circle removes 2πr²; scooping changes the surface by +πr²; the tent error item counts three extra circles. l06 is checked in units of π before the 3.14 substitution. Fixes made during the pass:
- s305 reused the numbers of a deck example, so it now uses r = 14, l = 50.
- The m07 option values were not rounded in the check (the content was right).
- Figure QA moved the height dimensions to the left of cylinder-based solids (they collided with the radius labels), enlarged the canvas of the cuboid-with-cube figure (its top was clipped) and widened the shamiana and test tube figures.

## Originality
All items are original. NCERT set-ups deliberately avoided:
- the tent with a 4 m diameter and 2.8 m slant height
- the 7 cm cube "surmounted by a hemisphere"
- the medicine capsule and the gulab jamuns
- the pen stand with conical depressions
- the scooped cylinder with h = 10 cm and r = 3.5 cm
- the toy of total height 15.5 cm
- the two 64 cm³ cubes

Contexts: Udaipur shamiana, Shimla water heater, Hampi mandapam pillars, Old Delhi kulfi, Rann Utsav tents, Ludhiana and Karnal silos, a Bhopal science-fair rocket, Channapatna spinning tops, an Amritsar gurdwara dome, and a Visakhapatnam cement silo.

## Known gaps
Narration audio is not generated yet (that is the TTS stage). The solid drawings are schematic 3D views, so the lint does not check their angles. A dedicated `solid` visual kind in the contract would let the renderer draw these natively.

## Competency audit by assessment-designer (2026-10-27)

Board papers need recall/understanding written items (CBSE design: Standard 54/24/22, Basic 75/15/10 per cent of marks), and the bank had tagged almost every routine written answer as application or higher. Every short, long, numerical and case item was re-read against what it actually asks. A routine, textbook-standard procedure on given data (find the HCF by prime factorisation, solve a given pair, find a term, compute a mean, a sector area, a single right triangle) is now **understanding**; word problems that need modelling, multi-step or non-routine reasoning, error analysis and justification keep application / analysis / evaluation. 11 item tag(s) and 8 case-part tag(s) changed (case items whose parts are now mostly recall/understanding carry `understanding` at the top level). No question text, key, solution or marking scheme changed.

Added (appended, so earlier ids are unchanged; each has its re-solve check): `q_cbse10math_ch12_071` short-3, `q_cbse10math_ch12_072` long, `q_cbse10math_ch12_073` long.
