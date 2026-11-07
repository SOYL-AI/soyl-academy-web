# ICSE Class 10 Mathematics — Chapter 16: Circles: Angle and Cyclic Properties (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) in the ICSE 2027 Mathematics presentation, built with the
CBSE maths chapter approach (builders + independent re-solve). Author: `claude-opus-5-5 (subject-producer)`, provenance
`origin: "human"`, `model: null`. All items are `status: "draft"` until review.

## Scope (ICSE 2027 syllabus, Unit 3 Geometry)
- **t01** The angle at the centre is double the angle at the circumference (stated and proved, centre inside the angle); the reflex case for a point on the minor arc; equal chords and equal arcs subtend equal angles at the centre (placed here as an extension of the central-angle result); isosceles triangles on radii.
- **t02** Angles in the same segment are equal (used); the angle in a semicircle is a right angle (proved); two-step angle chasing with crossing chords and diameters.
- **t03** Cyclic quadrilaterals: opposite angles supplementary (proved); exterior angle equals interior opposite angle (used); the converse and concyclic points; cyclic parallelogram is a rectangle; sides produced to meet; algebra with angles.
- **Removed for ICSE 2027:** the proofs that angles in the same segment are equal and of the exterior angle property of a cyclic quadrilateral. One note in the chapter notes (section 4) says so; both results are used.
- Not in this chapter (ch17): tangents, the alternate segment theorem and intersecting chords.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Angle at the centre, same segment and semicircle" (t01–t02) 20 slides; Part 2 "Cyclic quadrilaterals" (t03) 20 slides |
| Worked examples | 5 + 7 (centre to rim; rim to centre and an isosceles triangle; equal chords; chords that cross; two semicircle angles; opposite angles; exterior angle; algebra; same segment then opposite angles; is it cyclic; a diameter and a cyclic quadrilateral; sides produced to meet) |
| Visuals | 32 of 40 slides (geometry 25, table 5, flow 2); max 1 consecutive slide without a visual. Notes: 7 sections, each with a figure and further figures. Eleven questions carry a figure |
| Check slides | 3 + 3, all objective mcq (q001 q003 q006; q009 q010 q014) |
| Notes | 7 sections with key terms and formulas; exam tips with mark split and 6 common mistakes |
| Flashcards | 30 (definition 10, formula 1, concept 6, example 11, exam-tip 2) |
| Questions | 72 items, 175 marks: mcq 18, assertion-reason 6 (keys c a b d c a), true-false 8, fill-blank 8, numerical 8 (3 × 1 mark, 5 × 2 marks), short-2 5, short-3 6, short-4 6, long-10 7 (structured (a)(b)(c), 3 + 3 + 4, 6–7 step marks each) |
| Difficulty | d1 18, d2 18, d3 29, d4 7 |
| Competency | recall 10, understanding 21, application 30, analysis 11 — application or higher 57% of items, 81% of marks |
| Topics | t01 25, t02 25, t03 38 (items may carry two or three topics) |
| Tests | `t_icse10math_ch16_short` (20 marks / 45 min: A = q002 q005 q011 mcq, q019 AR, q054 q055 short-3; B = one of q066, q071) and `_long` (40 marks / 90 min: A = q004 q007 q008 q012 q013 q015 mcq, q021 q023 AR, q060 q061 q062 short-4; B = any two of q067 q069 q072). Disjoint; no deck-check question in a test |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests), `src/questions.mjs`, `src/questions2.mjs`, `src/questions3.mjs`
(bank + one re-solve check per item), `src/cyc.mjs` (circle configurations and figures), `src/qh.mjs` (shorthands),
`src/fr.mjs` and `src/work.mjs` (exact fractions and working-line checker, copied from ch14; `work.mjs` additionally
ignores `^\circ`, `\angle` and `\triangle` so that degree working lines are checked), `src/lib.mjs` (shared ICSE builders,
copied unchanged). Run from `platform/`:
`npx tsx content/authored/maths/icse-10-mathematics-ch16/src/build.mjs`; lint only this chapter with
`npx tsx content/authored/maths/icse-10-mathematics-ch16/src/lint.mts content/authored/maths/icse-10-mathematics-ch16`.
Rebuilding is deterministic (identical `release.json` / `tests.json` hashes on repeated runs).

- **Figures (`cyc.mjs`):** every point on a circle is placed at a chosen position (degrees) on a circle of radius R and
  every angle is **measured from the coordinates**. The builder asserts, to 1e-6 degrees, that every degree label equals
  the measured angle, every right-angle mark measures 90, and every angle that a worked example or model answer states or
  derives (`expect`) equals the measured angle; produced sides are asserted to meet beyond the stated vertices (`producedMeet`).
  Figures with numeric givens show the givens only; unknowns carry `?` or algebraic labels.
- **Question checks:** each answer is obtained by measuring the asked angle on a configuration that satisfies the givens
  (the givens are asserted on the same configuration), so a key cannot disagree with a real figure. MCQ distractors are
  the slips they represent (halving for doubling, the supplement, the reflex angle, a sum of 360, adjacent for opposite
  angles), each recomputed. Typical re-solve: `which([68, 17, 34, 146], g.ang('O','A','B'))`.
- **Worked values:** every numeric line in a worked example, table, note, flashcard and model answer is checked by the
  exact parser (`work.mjs`); equations in one unknown (for example `5x - 10 = 180`, `x = 38`) must hold at the verified solution.
- **Re-solve:** 253/253 checks pass (`src/resolve.log`).
- **KaTeX:** 1,633 math strings parse in strict "error" mode; no Unicode maths symbols inside `$…$`; no bare command words.
- **Narration:** 40 slides, max 88 words, mean 58; numbers in words, vertex names as spaced letters, no symbols or capital-letter abbreviations.
- **MCQ key balance:** options rotated after the re-solve (a 5, b 5, c 4, d 4).
- **Solution notes (D-032):** written-type working is in `answer.model_answer_md`; `solution_md` is a short method note.
- **Gates:** stage-4 `lintExemplar` on this chapter: 0 errors, 0 warnings. Stage-5 deterministic checks (`verify-local`):
  72 questions, 0 flags. **Originality** (`content originality --authored`): this unit 0 errors, 0 warnings.

## Originality
CBSE 10 Mathematics ch10 (Circles: tangents) is in the bank and covers different results; this chapter's set-ups
(inscribed angles, cyclic quadrilaterals, produced sides) and numbers are new, and every stem names its own content
(medallion, running track, camera rail, disc, window, plate, slab) so no two stems are near duplicates. No item is
taken from a textbook (Selina, ML Aggarwal, NCERT), specimen paper or past paper; CISCE documents were used for pattern only.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Only eleven questions carry a figure; short and numerical items describe the figure in words.
- The proof of the centre theorem is given for the case where the centre lies inside the angle; the other cases are used
  without separate proof (the reflex case is shown by the supplementary relationship).
- Equal chords and arcs are placed under t01 (the catalog lists no separate topic for them).
- Two of the answers to the "sides produced" items depend on the produced sides meeting beyond B and C; the figures and
  checks assert that on the coordinates.
- **2026-11-05:** assertion-reason options reordered to the ICSE 2027 Mathematics specimen paper (511) order and wording; every key re-mapped so each item's meaning is unchanged.
