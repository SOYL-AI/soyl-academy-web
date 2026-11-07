# ICSE Class 10 Mathematics — Chapter 21: Heights and Distances (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) in the ICSE 2027 Mathematics presentation, built with the CBSE maths chapter approach (builders + independent re-solve). Author: `claude-opus-5-5 (subject-producer)`, provenance `origin: "human"`, `model: null`. All items are `status: "draft"` until review.

## Scope (ICSE 2027 syllabus, Unit 5 Trigonometry)
- **t01** Angles of elevation and depression (measured from the horizontal through the eye; depression at the top equals elevation at the bottom, by alternate angles); labelled figures; exact values at $30^\circ$, $45^\circ$, $60^\circ$ and four-place table values for other angles; choosing sine, cosine or tangent from the sides named.
- **t02** Problems with one right-angled triangle: height from a ground distance, distance from a height, a taut rope/string/line of sight as the hypotenuse, eye height, rounding to a stated precision (nearest $0.1$ m), finding an angle from tables.
- **t03** Problems with two right-angled triangles in one vertical plane: two points on the same side (distances subtract), two points on opposite sides (distances add), an object on top of another (subtract heights), a walker or vehicle approaching (the walked distance is a gap), depression and elevation from a roof.
- **Removed for ICSE 2027** (named once, in the notes section 7): problems involving more than two right-angled triangles, and three-dimensional problems. Nothing in the chapter uses either.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Angles of elevation and depression, one right triangle" (t01, t02) 20 slides; Part 2 "Problems with two right-angled triangles" (t03) 20 slides |
| Worked examples | 4 + 5 (kite string; tower with tables; depression to a jetty with tables; eye height; same side; opposite sides; a finial with tables; a walker with tables; a building and a tower) |
| Visuals | 30 of 40 slides (geometry 13, table 15, flow 2); max 1 consecutive slide without a visual. Notes: 7 sections, each with a visual, plus further figures and tables (33 notes and question visuals in all, 5 of them attached to questions) |
| Check slides | 4 + 4, all objective (q002 mcq, q006 mcq, q036 fill-blank, q032 true-false; q015 mcq, q029 true-false, q017 mcq, q026 assertion-reason) |
| Notes | 7 sections with key terms and formulas; exam tips with mark split and 6 common mistakes |
| Flashcards | 28 (formula 8, concept 6, fact 6, definition 2, example 3, exam-tip 3) |
| Questions | 68 items, 172 marks: mcq 20, assertion-reason 6 (keys c d a b d c), true-false 7, fill-blank 7, numerical 6 (2–3 marks), short-2 4, short-3 5, short-4 6, long-10 7 (structured (a)(b)(c), 3 + 3 + 4, 6–8 step marks each); figures attached to 5 questions (q052, q057, q062, q065, q068) |
| Difficulty | d1 12, d2 30, d3 23, d4 3 |
| Competency | recall 6, understanding 23, application 32, analysis 7 — application or higher 57% of items, 81% of marks (lint band 45–65% of items) |
| Topics | t01 18, t02 34, t03 25 (items may carry two topics) |
| Tests | `t_icse10math_ch21_short` (20 marks / 45 min: A = q005 q008 q013 mcq, q024 AR, q051 q052 short-3; B = one of q062 q063) and `_long` (40 marks / 90 min: A = q003 q007 q009 q010 q014 q016 mcq, q021 q023 AR, q056 q058 q060 short-4; B = any two of q064 q065 q066), matching `icse-10-mathematics-chapter-test-short/long`; disjoint, and no deck-check item is used |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests), `src/questions.mjs`, `src/questions2.mjs`, `src/questions3.mjs` (bank + one re-solve check per item), `src/ht.mjs` (table values, rounding-stability tests, coordinate checks and the `scene()` figure builder), `src/figs.mjs` (figures attached to questions), `src/trig.mjs` and `src/prop.mjs` (exact $\mathbb{Q}(\sqrt{2}, \sqrt{3})$ arithmetic, copied from ch20), `src/lib.mjs` (shared ICSE builders, copied unchanged). Run from `platform/`: `npx tsx content/authored/maths/icse-10-mathematics-ch21/src/build.mjs`; lint only this chapter with `npx tsx content/authored/maths/icse-10-mathematics-ch21/src/lint.mts content/authored/maths/icse-10-mathematics-ch21`. Rebuilding is deterministic (identical `release.json` / `tests.json` hashes on two runs).

- **Figures from coordinates:** every figure (deck, notes and questions: 29 geometry visuals) is drawn by `scene()` from real coordinates in metres at a stated scale (foot at the origin, observer on the ground or on a roof). The build asserts that each numeric length label equals the distance between its endpoints, each degree label equals the angle measured from the coordinates (to $10^{-6}$), and each right-angle mark measures $90^\circ$; stage-4 lint re-checks the labels against the drawn canvas (angle tolerance $0.6^\circ$, scale $1\%$). Helper points (horizontal lines for depression) are hidden and dashed.
- **Re-solve by reconstruction:** each item's check builds the situation as coordinates and asserts that they reproduce the GIVEN angles and lengths (`holds()`), that the answer is read from those coordinates, and that every number in the solution or model answer matches (`C.model`, `C.sol`, `C.val`). The depression angle is checked as both the angle below the horizontal at the top and the alternate angle at the bottom.
- **Tables and rounding:** table values are four-place roundings (`tab()`), and each table value quoted in a stem is asserted equal to it. For every answer given to $0.1$ m, the exact value and the table-based value must round alike and neither may be within $0.08$ of a rounding boundary ($0.02$ where a decimal is taken from a surd with $\sqrt{3} = 1.732$, since exact and $1.732$ differ by under $0.001$); long answers also check that rounding the intermediate values gives the same final digits (e.g. $76.6 - 45.0 = 31.6$).
- **Exact answers:** surd answers ($18(\sqrt{3}+1)$, $60 - 20\sqrt{3}$, $16\sqrt{3} + 48$, $\dfrac{40}{\sqrt{3}}$) are compared in the exact field of `trig.mjs` (e.g. $\dfrac{36}{\cot 30^\circ - \cot 45^\circ} = 18(\cot 30^\circ + 1)$); wrong MCQ options are shown to be the result of a named slip (the wrong ratio, a reciprocal, adding instead of subtracting, forgetting the eye height).
- **Re-solve:** 148/148 checks pass (`src/resolve.log`). **KaTeX:** 1,209 math strings parse in strict "error" mode. **Narration:** 40 slides, max 62 words, mean 43; numbers in words, no symbols or capital-letter abbreviations. **MCQ key balance:** a 5, b 5, c 5, d 5.
- **verify (deterministic checks):** 68 questions, 0 flags (every numerical's solution has an "=" step with its key). **Lint:** stage-4 `lintExemplar` on this chapter: 0 errors, 0 warnings. **Originality** (`content originality --authored`): 0 errors for this unit.

## Originality
CBSE 10 Mathematics ch09 (Some Applications of Trigonometry) is in the bank; its set-ups (lighthouse and boat, shadows of poles, ladders, ramps, the Pushkar balloon, tightrope, clock tower, signboard on a pole, antenna on a building, two buildings, sailor and cliff, helicopter and milestones, boat speed) and numbers are avoided. Here the contexts are a kite string, a temple gateway and finial, a viewing tower and kiosks, a helicopter and a road (one number set), a survey drone, a cable-car station and lake jetty, a forest officer and fire tower, a statue on a pedestal, a glider, a cyclist, a street lamp, scooters seen from a platform, poles on opposite sides of a road, and a kite on a $70$ m / $100$ m string. Every stem names its own content. CISCE documents were used for pattern only; no textbook or paper question is reproduced. Imagined contexts only; no people or places are named.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- The figures use real coordinates; the eye-height figure draws the $1.6$ m eye height at the same scale as the $30$ m distance, so it is small by design.
- Difficulty is concentrated at d2–d3 (three d4 items: the ratio proof s406, the three-observer long question l04 and the two-pole long question l07); the 10-mark questions use at most two right-angled triangles, in line with the syllabus.
- Table-based items quote the needed table values in the stem (as the ICSE paper provides tables); inverse-table reading is used twice (n04, l06).
- `src/prop.mjs` is a copy of the ch06 rational-arithmetic helper kept only for its `Fr` class (used by `trig.mjs`).
- **2026-11-05:** assertion-reason options reordered to the ICSE 2027 Mathematics specimen paper (511) order and wording; every key re-mapped so each item's meaning is unchanged.
