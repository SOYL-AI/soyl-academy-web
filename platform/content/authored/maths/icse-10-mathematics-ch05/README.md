# ICSE Class 10 Mathematics — Chapter 5: Quadratic Equations in One Variable (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) in the ICSE 2027 Mathematics presentation, built with the
CBSE maths chapter approach (builders + independent re-solve). Author: `claude-opus-5-5 (subject-producer)`, provenance
`origin: "human"`, `model: null`. All items are `status: "draft"` until review.

## Scope (ICSE 2027 syllabus, Unit 2 Algebra)
- **t01** Standard form $ax^2 + bx + c = 0$ ($a \ne 0$), recognising a quadratic only after simplifying; the discriminant $b^2 - 4ac$ and the nature of the roots (real and distinct — rational or irrational —, real and equal, not real); finding a parameter for equal roots (both signs of $\pm k$, a quadratic in $k$, checking $a \ne 0$) and conditions for real / no real roots.
- **t02** Solving by factorisation: splitting the middle term (product $ac$, sum $b$), the zero-product rule, rearranging first, equations with $x$ in denominators, a surd coefficient; the "never divide by $x$ / by a bracket" trap.
- **t03** Solving by the quadratic formula: roots in surd form, correct to a stated number of decimal places and to significant figures (ICSE style: four decimal places for the square root, round once at the end; the effect of rounding too early is shown).
- **t04** Word problems: numbers, area (paths inside a lawn and round a pond, perimeter–area, right triangles, polygon diagonals), speed and time (cyclist, truck, boat and stream), ages, work (pipes, painters), sharing a cost; rejecting roots that do not fit, with reasons.
- The chapter lists no removed topics. Not used: completing the square, equations reducible to quadratics (e.g. quartics in $x^2$), sum and product of roots.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Solving by factorisation and by formula" (t01–t03) 18 slides; Part 2 "The discriminant and problems that lead to quadratics" (t01, t04) 17 slides |
| Worked examples | 5 + 5 ($3x^2 - 10x - 8$ by splitting; $x(2x + 5) = 12$ rearranged first; $2x^2 - 6x + 1$ in surd form; $x^2 - 5x - 2$ to 2 d.p.; $3x^2 + 4x - 5$ to 3 s.f.; nature of three equations; equal roots for $\pm k$ and for $k$ in the leading coefficient; two positive numbers; a path inside a lawn; a boat and stream) |
| Visuals | 23 of 35 slides (plot 7, table 12, flow 3, geometry 1); max 1 consecutive slide without a visual. Notes: 7 sections, each with a visual, plus 10 more. Questions: plot asset on q019, geometry asset (pond and path) on q065 |
| Check slides | 4 + 4, all objective (q002 mcq, q026 true-false, q006 mcq, q038 numerical; q011 mcq, q033 fill-blank, q016 mcq, q041 numerical) |
| Notes | 7 sections with key terms and formulas; exam tips with mark split and 6 common mistakes |
| Flashcards | 30 (definition 3, fact 4, concept 5, formula 2, example 8, exam-tip 5, diagram 3) |
| Questions | 69 items, 173 marks: mcq 19, assertion-reason 6 (keys a d b a d c), true-false 6, fill-blank 6, numerical 7 (4 × 1 mark, 3 × 2 marks), short-2 5, short-3 6, short-4 7, long-10 7 (structured (a)(b)(c), 3 + 3 + 4, 6–10 step marks each) |
| Difficulty | d1 9, d2 28, d3 25, d4 7 |
| Competency | recall 4, understanding 26, application 31, analysis 8 — application or higher 57% of items, 79% of marks (lint band 45–65% of items) |
| Topics | t01 23, t02 16, t03 19, t04 18 (items may carry two or three topics) |
| Tests | `t_icse10math_ch05_short` (20 marks / 45 min: A = q003 q010 q015 mcq, q020 AR, q050 q053 short-3; B = one of q063, q064) and `_long` (40 marks / 90 min: A = q005 q007 q008 q012 q013 q017 mcq, q023 q024 AR, q057 q058 q059 short-4; B = any two of q065 q066 q067), matching `icse-10-mathematics-chapter-test-short/long`; disjoint, and no deck-check item is used |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests), `src/questions.mjs` (bank + one re-solve check per item),
`src/quad.mjs` (exact solver and rounding), `src/work.mjs` (working-line checker), `src/lib.mjs` (shared ICSE builders,
copied unchanged). Run from `platform/`: `npx tsx content/authored/maths/icse-10-mathematics-ch05/src/build.mjs`; lint
only this chapter with `npx tsx content/authored/maths/icse-10-mathematics-ch05/src/lint.mts content/authored/maths/icse-10-mathematics-ch05`.
Rebuilding is deterministic (identical `release.json` / `tests.json` hashes on two runs).

- **Roots (`quad.mjs`):** every quadratic is held with integer coefficients. Rational roots are reduced fractions $n/d$ and are substituted back exactly ($an^2 + bnd + cd^2 = 0$ in integers); irrational roots are $(p \pm q\sqrt{s})/r$ with $s$ square-free, and both the rational and the $\sqrt{s}$ parts of $a x^2 + bx + c$ are checked to vanish in integers. Every root is also substituted in floating point. Surd forms on the page ($3 \pm \sqrt{5}$, $\frac{3 \pm \sqrt{7}}{2}$, $-2 \pm \sqrt{5}$, …) are compared with the solver's. Roundings to decimal places / significant figures refuse any value within $10^{-7}$ of a rounding boundary. Parameters for equal roots are found by solving $D(k) = 0$ exactly (its coefficients read from samples) and every value is substituted back.
- **Working lines (`work.mjs`):** every equation typed in a worked example, a note or a model answer is parsed from its TeX into the pipeline expression grammar and checked against the verified quadratic: a quadratic line (e.g. `3x(x - 4) + 2(x - 4) = 0`, `(30 - 2w)(20 - 2w) = 336`) must be a non-zero multiple of it at six sample points; expansion/factorisation chains must be identities of it; a linear line or each "or" alternative or ± branch must give a verified root, and the alternatives must cover every root; a line with the unknown in a denominator (`\dfrac{24}{x} + \dfrac{9}{x - 4} = \dfrac{9}{4}`) must vanish at every verified root; a line without the unknown (`D = (-7)^2 - 4 \times 2 \times 4 = 49 - 32 = 17`) must be true arithmetic, and every `\approx` must be a correct rounding to the places written; `x \approx 2.78` must be a verified root correctly rounded. An unparsable line stops the build.
- **Re-solve:** 381/381 checks pass (`src/resolve.log`). Keys, option values, blanks and numerical answers are typed as literals and compared with recomputed values; each MCQ's option values are typed independently so that exactly one equals the target (distractors are the usual slips: sign of $b$, dividing only $\sqrt{D}$ by $2a$, rounding $\sqrt{29}$ early, $c$ taken as $+3$, $\sqrt{D}$ instead of $D$, a strict instead of a non-strict bound, the other root, the rejected root). Interval answers (q013, q014) are checked against the discriminant's sign on a grid of parameter values. Every word-problem answer is substituted into the story (times, areas, ages, shares, diagonals, Pythagoras).
- **Plots:** 26 marked points lie on their curves and match their labels; 26 zeros located numerically (including irrational zeros and the touching zeros of the equal-root curves) are all marked. Geometry figures (lawn path, pond path) are drawn to scale from the computed widths and pass the stage-4 length-label check.
- **Tables:** standard-form rows (coefficients re-read from the parsed equation), substitution table, factor-pair table, rounding table, method table (perfect-square discriminants), discriminant table, nature table, numbers check, boat check — all computed and asserted in `build.mjs`.
- **KaTeX:** 1,377 math strings parse with KaTeX in strict "error" mode; no Unicode maths symbols inside `$…$`; ₹ is always outside maths.
- **Narration:** 35 slides, max 64 words, mean 45; numbers in words, no symbols, no capital-letter abbreviations.
- **MCQ key balance:** options rotated after the re-solve (a 5, b 5, c 5, d 4).
- **Solution notes (D-032):** written-type working is in `answer.model_answer_md`; `solution_md` is a short method note; a scan found no student-facing sentence of 60+ characters repeated in a solution.
- **Lint:** stage-4 `lintExemplar` on this chapter: 0 errors, 0 warnings. **Originality** (`content originality --authored`): 0 errors, 0 warnings (one exact-stem collision with CBSE 10 ch04 q013, "… has real roots exactly when", was found on the first run and reworded).

## Originality
CBSE 10 Mathematics ch04 (Quadratic Equations) is in the bank; its README and all 71 stems were read first, and no
equation, set-up, number or wording is reused (for example: no consecutive-integer, "number plus reciprocal",
240 km / 180 km journeys, 13 cm or 17 cm hypotenuse, printers, bookseller, rangoli, canal-fence, ball or diver
contexts; the discriminant plots use a different family, $x^2 + 2x + c$). Contexts are imagined and labelled as
such (a cyclist, a goods truck, a motorboat, pipes, two painters, a mother and daughter, a framer, a hall, a lawn, a
park pond, a school club trip). No item is taken from a textbook (Selina, ML Aggarwal, NCERT), specimen paper or past
paper; CISCE documents were used for pattern only. Similar shapes inside the chapter (two "solve to two decimal
places" items, two rate problems) use different wording, since the bank duplicate check ignores numbers.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Model answers describe graphs in words (answers carry no visuals); q019 and q065 carry figures in the stem.
- t02 has the fewest tagged items (16) because many factorisation steps sit inside t04 word problems tagged t04 only.
