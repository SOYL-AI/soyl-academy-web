# CBSE Class 10 Mathematics — Chapter 9: Some Applications of Trigonometry (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) written to the maths exemplar standard
(`content-templates/exemplars/maths/cbse-10-mathematics-ch06`) and the pacing of the authored ch01–ch08.
Author: `claude-opus-5-5 (subject-producer)`, provenance `origin: "human"`, `model: null`. All items are
`status: "draft"` until review.

## Scope (2026-27 syllabus, Standard 041 and Basic 241)
- **t01** Angles of elevation and depression: line of sight, the horizontal through the eye as the only reference line, elevation vs depression, why depression at the top equals elevation at the bottom (alternate angles), drawing and labelling the figure from a description, the angle increasing as the observer approaches, the range $0^\circ$–$90^\circ$.
- **t02** Heights and distances with **at most two right triangles** and angles of $30^\circ$, $45^\circ$, $60^\circ$ only: heights, distances, slant lengths (ladders, ramps, tethers, zip-lines), shadows, eye height, two points on the same side, observers on opposite sides, an object on top of another (tank, signboard, antenna), two objects seen from a height, two buildings, a deck observer, moving objects (boat, car, drone, balloon) with speeds.
- The chapter has no removed topics, but ch08's removed topic (ratios of complementary angles) is respected: the classic "angles of elevation from two points are complementary, so $h = \sqrt{ab}$" configuration is deliberately absent.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Elevation, depression and one triangle" 17 slides; Part 2 "Problems with two right triangles" 16 slides |
| Worked examples | 6 + 6 (Mumbai balcony; Madurai gopuram; drone tether; Varkala cliff; Pune ladder; eye height and a flagpole; same-side pair; opposite sides in Hyderabad; water tank on a tower; two cars from a tower on the Mumbai–Pune expressway; two Kolkata buildings; a drone at 8 m/s) |
| Visuals | 23 of 33 slides, max 1 slide without a visual. Deck: geometry 17 (every heights figure drawn to scale), table 4, flow 2. Notes/questions: geometry 11, table 2, flow 1 |
| Check slides | 3 + 3, all objective (q001, q007, q011; q039, q017, q028) |
| Notes | 6 sections, each with key terms and a visual; exam tips with mark split and 7 common mistakes |
| Flashcards | 30 (definition 3, formula 4, concept 5, fact 6, example 5, exam-tip 5, diagram 2) |
| Questions | 70 items, 139 marks: mcq 18, assertion-reason 6 (keys a b c d a d), true-false 5, fill-blank 5, numerical 9 (tolerances for $\sqrt3 \approx 1.732$), short-2 9, short-3 8, long-5 7, case-based 5 (1 + 1 + 2, part (c) either/or via `alternatives`, `passage_origin: soyl-original`; one carries a to-scale lighthouse figure) |
| Difficulty | d1 15, d2 27, d3 24, d4 5, d5 1 |
| Competency | recall 4, understanding 32, application 30, analysis 2, evaluation 4 — application or higher 50% of items, 63% of marks (after the 2026-10-27 competency audit) |
| Topics | t01 17, t02 60 (items may carry two topics) |
| Tests | `t_cbse10math_ch09_short` (20 marks / 40 min) and `_long` (40 marks / 90 min), matching `cbse-10-default-chapter-test-short/long`; disjoint |

## Verifier record
Sources in `src/` (`build.mjs`, `questions.mjs`, `figs.mjs`; library `../cbse-10-mathematics-ch05/src/lib.mjs`).
Run from `platform/`: `npx tsx content/authored/maths/cbse-10-mathematics-ch09/src/build.mjs`.

- **Numeric re-solve:** 164/164 checks pass. Every answer is verified by **rebuilding the scene**: the claimed heights and distances are placed as coordinates and each given angle is **measured back with `atan2`** (no tangent tables), given gaps and lengths are measured by subtraction or `Math.hypot`, and eye heights are applied at the eye. Decimal answers are checked against the exact values within the stated tolerance (all agree with $\sqrt3 \approx 1.732$ to two decimals). Parent model answers of every case are checked as well as each part.
- **Figures:** `src/figs.mjs` draws every heights-and-distances figure (28 in decks, notes and questions) to scale from the **true answer**, y up: angles of elevation at the observer between the ground (or eye-level horizontal) and the line of sight; angles of depression at the upper observer between a dashed horizontal and the line of sight, with the equal alternate angle at the object where it teaches something. The pipeline geometry check, run by the validator on every visual, confirms that each degree label measures its angle (within $0.6^\circ$), each right-angle mark is $90^\circ$, and numeric length labels agree with the declared scale (`scale: { unit: 'm', per_unit: k }`). Unknowns are labelled "?", "$h$", "$x$" or "$d$", never with their answers. No figure is marked "not to scale".
- **KaTeX:** 899 math strings parse in strict "error" mode; no lost backslashes or control characters.
- **Narration:** 33 slides, max 64 words, mean 47; no symbols or abbreviations.
- **Fixes during the pass:** (1) a draft sentence ("how long after … $\ldots$? Instead: …") left in q062's stem was replaced by a clean part (d); (2) the validator's extended lost-backslash rule (added for trigonometry) flagged the word "angle" inside `\text{…}` in the notes — the validator now strips `\text{}`/`\operatorname{}` arguments first, as the pipeline lint does; (3) three items relabelled from d1 to d2 after review (q001, q043, q045).
- **Originality:** avoided NCERT's circus rope (20 m, 30°), broken tree (8 m, 30°), kite at 60 m with string at 60°, 1.5 m boy and 30 m building ($30^\circ \to 60^\circ$), 20 m building with a transmission tower ($45^\circ$, $60^\circ$), 1.6 m statue on a pedestal, 7 m building and cable tower, TV tower across a canal (20 m, $60^\circ$/$30^\circ$), 80 m road between two poles, 75 m lighthouse with two ships, the 88.2 m balloon, the car approaching a tower (6 s), and the exemplar classics (complementary angles from 4 m and 9 m, cloud reflection, 10 m deck with $60^\circ$/$30^\circ$). Where a configuration type is unavoidable (same-side pair, object on top), the set-up, the numbers and what is asked were changed (e.g. find the tank height on a known tower; find a drone's height from its speed). Contexts: Madurai gopuram, Varkala cliff, Mumbai balcony, Pune ladder, Holi-ground drone, Dehradun clock tower and fire-watch tower, Hyderabad, Mumbai–Pune expressway, Kolkata buildings, Bhopal station ramp, Pushkar balloon, Kollam lighthouse, Rishikesh zip-line, Jantar Mantar shadows, a Delhi minaret.
- **Pipeline stages 5–6 (`verify --authored`, `originality --authored`):** verify 70/70 pass, 0 flags (two minor flags cleared by writing the final "=" step that computes the key, in q041 and q070(b)); originality 0 errors.
- **MCQ key balance:** keys rotated after the re-solve to 6/6/6/5 (a/b/c/d).

## Gaps / follow-ups
- Analysis-level items are few (2); the chapter's harder items are mostly application with two triangles. d4–d5 items: 6.
- Geometry figures rely on renderer support for `arcs` (equal-angle marks) and `scale`; the hidden helper points use `label: false`.
- Narration audio not generated (TTS stage). `word_limit` not set on maths short/long items (marked by steps).

## Competency audit by assessment-designer (2026-10-27)

Board papers need recall/understanding written items (CBSE design: Standard 54/24/22, Basic 75/15/10 per cent of marks), and the bank had tagged almost every routine written answer as application or higher. Every short, long, numerical and case item was re-read against what it actually asks. A routine, textbook-standard procedure on given data (find the HCF by prime factorisation, solve a given pair, find a term, compute a mean, a sector area, a single right triangle) is now **understanding**; word problems that need modelling, multi-step or non-routine reasoning, error analysis and justification keep application / analysis / evaluation. 3 item tag(s) and 2 case-part tag(s) changed (case items whose parts are now mostly recall/understanding carry `understanding` at the top level). No question text, key, solution or marking scheme changed.

Added (appended, so earlier ids are unchanged; each has its re-solve check): `q_cbse10math_ch09_071` short-3, `q_cbse10math_ch09_072` long.
