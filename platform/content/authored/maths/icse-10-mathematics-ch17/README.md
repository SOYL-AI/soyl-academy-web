# ICSE Class 10 Mathematics — Chapter 17: Circles: Tangents, Secants and Intersecting Chords (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) in the ICSE 2027 pattern. Author: `claude-opus-5-5 (subject-producer)`,
provenance `origin: "human"`, `model: null`. All items are `status: "draft"` until review.

## Scope (ICSE 2027 syllabus, Unit 3 Geometry; no removed topics for this chapter)
- **t01** The tangent is perpendicular to the radius at the point of contact (proof; tangent lengths with Pythagoras).
- **t02** Two tangents from an external point are equal (proof by RHS); the angle relations in the kite $OAPB$; touching circles (external $d = r_1 + r_2$, internal $d = r_1 - r_2$, line of centres); lengths of direct and transverse common tangents.
- **t03** Intersecting chords, inside and produced to meet outside: $PA \times PB = PC \times PD$ (proof by similar triangles).
- **t04** Tangent and secant: $PT^2 = PA \times PB$ (proof by similar triangles; second proof in a question by Pythagoras and the perpendicular from the centre).
- **t05** Alternate segment theorem (proof with the diameter through the point of contact) and angle problems.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Tangent and radius, two tangents, touching circles" (t01–t02) 20 slides; Part 2 "Product of segments and the alternate segment theorem" (t03–t05) 21 slides |
| Worked examples | 6 + 6 (tangent length; angle in $\triangle OTP$; angles from the angle between tangents; equal tangents with algebra; radii of touching circles; belt round two wheels; missing part of a chord; chords with algebra; two secants; tangent and secant; tangent and secant with algebra; triangle in a circle with the alternate segment theorem) |
| Visuals | 32 of 41 slides (geometry 26, table 4, flow 2 on the deck slides); max 1 slide in a row without a visual. Notes: 7 sections each with a figure plus further figures |
| Check slides | 3 + 4, all MCQ (q002, q003, q005; q008, q010, q012, q013) |
| Notes | 7 sections with key terms and formulas; exam tips with a mark split and 6 common mistakes |
| Flashcards | 30 (definition 6, concept 8, example 10, formula 4, exam-tip 2) |
| Questions | 66 items, 157 marks: mcq 18, assertion-reason 6 (keys a c d b a c), true-false 6, fill-blank 7, numerical 8 (1 and 2 marks), short-2 4, short-3 5, short-4 6, long-10 6 (parts (a)(b)(c) worth 3 + 3 + 4) |
| Difficulty | d1 13, d2 18, d3 28, d4 7 |
| Competency | recall 7, understanding 22, application 28, analysis 9 — application or higher 56% of items, 78% of marks |
| Topics | t01 10, t02 24, t03 12, t04 12, t05 13 (items may carry two topics) |
| Tests | `t_icse10math_ch17_short` (20 marks / 45 min): A = m01, m04, m06, ar1, s301, s302; B = l01, l05 (attempt one). `t_icse10math_ch17_long` (40 marks / 90 min): A = m07, m11, m14, m15, m16, m17, ar3, ar5, s401, s403, s404; B = l02, l03, l04 (attempt two). Disjoint, and none of the seven deck-check items is used |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests), `src/questions.mjs`, `src/questions2.mjs`, `src/questions3.mjs`
(bank, one re-solve check per item), `src/tan.mjs` (coordinate geometry for tangents, chords, secants, touching circles and
the figure builder), `src/cyc.mjs` (circle configurations), `src/work.mjs` (working-line checker), `src/fr.mjs`, shared
builders in `src/lib.mjs`. Run from `platform/`: `npx tsx content/authored/maths/icse-10-mathematics-ch17/src/build.mjs`;
lint with `npx tsx content/authored/maths/icse-10-mathematics-ch17/src/lint.mts content/authored/maths/icse-10-mathematics-ch17`.
Rebuilding is deterministic (identical `release.json` / `tests.json` hashes on two runs).

- **Re-solve:** 274/274 checks pass (`src/resolve.log`). Every figure and every item is built from real coordinates: tangent points are computed exactly (foot of the polar), secants and chords are placed so that the stated segment lengths hold, touching circles sit on the line of centres, and every length and angle that a figure label, a worked example or a model answer states is asserted against the coordinates (to 1e-6). Each MCQ's options are tested independently so exactly one equals the re-solved target.
- **Long items:** l01 (kite $OAPB$ and a third tangent: perimeter of $\triangle PCD$ $= PA + PB = 48$, $PC = PD = 15$, $CD = 18$ on the coordinates), l02 (circles of radii 18 and 8: $AB = 26$, $PQ = 24$, and $MP = MT = MQ = 12$, $\angle PTQ = 90^\circ$ measured), l03 (chords with $x = 5$, $OM = 6$, $OP^2 = 72$, $10^2 - 72 = 28 = PA \times PB$), l04 (tangent 24, secants 12·48 and 16·36, radius 32, area 384), l05 (alternate segment with $\angle PAB = \angle QAD = 62^\circ$; $BD$ parallel to $PQ$ checked on the coordinates), l06 (three touching circles of radii 4, 8, 12: sides 12, 16, 20, right angle, in-radius 4, and the contact points $D$, $E$, $F$ lie on the incircle).
- **Working lines:** every number in a worked example, table, note, flashcard and model answer is checked line by line by an exact parser (equalities exact; an equation in one unknown must hold at the verified solution; negative roots of lengths are rejected in the text).
- **Local verifier:** `verify-local.mts` on `release.json`: 66 questions, 0 flags (every numerical item's solution states the key).
- **KaTeX:** 1789 math strings parse in strict "error" mode; no Unicode maths symbols inside `$…$`; no lost backslash commands.
- **Narration:** 41 slides, max 86 words, mean 58; numbers spoken as words, no symbols.
- **MCQ key balance:** options rotated after the re-solve; keys a 5, b 5, c 4, d 4.
- **Lint:** `lintExemplar` (family `maths`) on this chapter: 0 errors, 0 warnings. **Originality:** `npm run content -- originality --authored`: this unit 0 errors, 0 warnings.

## Originality
All figures, numbers and set-ups were chosen to differ from CBSE 10 Mathematics ch10 in the bank (that chapter's tangent-length, kite, incircle and concentric-circle items): this chapter instead uses touching circles and common tangents, the product theorems, tangent-secant and the alternate segment theorem, with imagined contexts (a drum and cable, a belt round two wheels, a pond with a plank and a rope, three plates on a table). Reversed questions (find $\angle APB$ from $\angle OAB$ or $\angle AOB$) replace the usual direction. No textbook, sample-paper or past-paper text was used; the specimen papers define the pattern only.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- The alternate segment theorem is proved for the acute case drawn (diameter construction); the obtuse case is stated in words only, as the syllabus asks for the proof and use of the standard figure.
- Constructions of tangents belong to ch18 and are not covered here.
