# ICSE Class 9 Mathematics — Chapter 8: Triangles: Congruency and Inequalities (authored, v1)

Hand-authored chapter (DECISIONS D-025, D-026, D-050) in the ICSE Class IX Mathematics presentation, built with the ICSE 10
Mathematics chapter approach (builders + independent re-solve). Writer: `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`,
provenance `origin: "human"`, `model: null`. All items are `status: "draft"` until the subject-producer reviews them.

## Scope (ICSE Class IX syllabus, Unit 4 Geometry)
- **t01** Congruent triangles and corresponding parts; the tests SSS, SAS (included angle), ASA, AAS and RHS; why AAA and SSA are not tests; using congruent triangles (CPCT) to prove sides and angles equal (kite, crossing poles, points on an angle bisector, equal altitudes, RHS in an isosceles triangle).
- **t02** Angles opposite equal sides are equal (proved with the bisector and SAS) and the converse (proved with the perpendicular and AAS); isosceles angle problems with numbers, algebra and two linked isosceles triangles.
- **t03** The greater side is opposite the greater angle and the converse (used, ordering sides and angles); the sum of any two sides is greater than the third (testing lengths, range of the third side).
- **t04** The perpendicular is the shortest line from a point to a line; the nearer of two points on one side of the foot gives the shorter segment.
- **Removed:** the proofs of the triangle inequality results. Slides 11 and 15 of part 2 and notes section 5 say so in one line each; the results are used in problems only.
- Not in this chapter: Pythagoras (ch10), the mid-point theorem (ch09), similarity (Class 10).

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Congruent triangles and their tests" (t01) 21 slides; Part 2 "Isosceles triangles and inequalities" (t02–t04) 23 slides |
| Worked examples | 5 + 8 (name the test for a frame; angles of a kite; crossing poles with SAS; points on an angle bisector with AAS; RHS in an isosceles triangle; base angles from the apex; apex from base angles; algebra with base angles; two isosceles triangles; ordering sides from angles; testing four sets of lengths; nearer foot, shorter segment; cables from a mast) |
| Visuals | 34 of 44 slides (geometry 28, table 5, flow 1); max 1 consecutive slide without a visual. Notes: 7 sections, each with a figure and further figures. Eight questions carry a figure |
| Check slides | 4 + 4, all objective mcq (q001 q002 q003 q004; q005 q007 q008 q009), none used in a test |
| Notes | 7 sections with key terms and formulas; exam tips with mark split and 6 common mistakes |
| Flashcards | 30 (definition 12, concept 6, example 5, formula 3, fact 2, exam-tip 1, diagram 1) |
| Questions | 65 items, 151 marks: mcq 21, assertion-reason 5 (keys c a b d c), true-false 6, fill-blank 5, numerical 7 (4 × 1 mark, 3 × 2 marks), short-2 8, short-3 6, long-10 7 (structured (a)(b)(c), 3 + 3 + 4, 7 step marks each) |
| Difficulty | d1 13, d2 21, d3 21, d4 10 |
| Competency | recall 6, understanding 20, application 25, analysis 13, evaluation 1 — application or higher 60% of items, 81% of marks (lint band 45–65% of items) |
| Topics | t01 22, t02 17, t03 23, t04 11 (items may carry two topics) |
| MCQ keys | a 6, b 5, c 5, d 5 (options rotated after the re-solve) |
| Tests | `t_icse9math_ch08_short` (20 marks / 30 min: A = q011 q014 q017 q019 mcq, q025 AR, q050 short-2, q054 short-3; B = one of q059, q064) and `_long` (40 marks / 60 min: A = q006 q010 q012 q013 q015 q018 q020 mcq, q024 AR, q046 q048 q052 short-2, q053 q058 short-3; B = any two of q060 q061 q063). Disjoint; no deck-check question; no item gives away another in the same test |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests), `src/figs.mjs` (deck and notes figures), `src/questions.mjs` and
`src/questions2.mjs` (bank + one re-solve check per item), `src/tri.mjs` (triangle geometry), `src/qh.mjs` (shorthands),
`src/fr.mjs` and `src/work.mjs` (exact fractions and working-line checker, copied from icse-10-mathematics-ch16), `src/lib.mjs`
(shared ICSE 9 builders, copied unchanged from ch01). Run from `platform/`:
`npx tsx content/authored/maths/icse-9-mathematics-ch08/src/build.mjs`. Rebuilding is deterministic (identical `release.json` /
`tests.json` hashes on repeated runs).

- **Figures (`tri.mjs`):** every figure is built from coordinates. The builder asserts that every numeric side label equals the true
  length, every degree label equals the measured angle, every right-angle mark measures 90, every group of segments with the same
  tick count is equal in length and every group of angles with the same arc count is equal in size. Congruence claims are checked by
  `congruent` (all three sides and all three angles correspond); the test that a list of equal parts gives is found by `criterion`
  from the structure of the parts alone (SSS, SAS with the angle between the sides, ASA, AAS, RHS, or none for SSA and AAA).
- **Question checks:** answers are measured or computed on coordinates (angle sums, base angles, crossing poles by the cosine rule,
  SSA shown to fit two triangles); inequality and ordering items use `canForm`, `sideOrder`, `angleOrder`; MCQ options are typed
  independently and `which(...)` demands exactly one match; proof items assert the numeric facts they rely on and the congruence on
  the figure.
- **Working lines:** every numeric line in a worked example, note, flashcard and model answer is checked by the exact parser (`work.mjs`).
- **Re-solve:** 198/198 checks pass; lint 0 errors, 0 warnings (the build runs the pipeline's stage-4 lint, stage-5 deterministic
  checks and the answer-leak scan).

## Points for a reviewer
- Deck check items are q001–q004 and q005, q007, q008, q009; they are MCQs not used in either test.
- The ICSE Class IX syllabus covers AAS and ASA as one line; the chapter teaches ASA and AAS separately and notes that AAS reduces to ASA.
- n6 uses the cosine rule once to give the rope length (answer 9.29 m, tolerance 0.01); this is the only trigonometry in the chapter and is
  marked difficulty 4. Consider replacing it with an angle-only item if cosines are not wanted before the trigonometry chapters.
- Slides 11 and 15 of part 2 and notes section 5 state that the inequality proofs are not required; q020 and the three
  inequality items (s303, s304, l05) use the results only.
- Worked example 3 (part 1) quotes the rope length 9.29 cm from the coordinates; the narration reads it as "nine point two nine".
- Fill-blank q036 (two blanks) carries one mark for both blanks together.

## Known gaps
- Figures are drawn to scale from coordinates but their label positions use an automatic outward compass choice; the producer should
  view a few on staging (the kite, the sticks-and-circles slide and the pole and cable figure) for overlapping labels.
- No question uses a case-based passage (not required by the brief).
