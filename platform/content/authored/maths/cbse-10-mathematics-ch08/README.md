# CBSE Class 10 Mathematics — Chapter 8: Introduction to Trigonometry (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) written to the maths exemplar standard
(`content-templates/exemplars/maths/cbse-10-mathematics-ch06`) and the pacing of the authored ch01–ch07.
Author: `claude-opus-5-5 (subject-producer)`, provenance `origin: "human"`, `model: null`. All items are
`status: "draft"` until review.

## Scope (2026-27 syllabus, Standard 041 and Basic 241)
- **t01** Ratios of an acute angle: naming sides from an angle, the six ratios, why they are well defined (similar right triangles, AA), all ratios from one ($k$-sides and Pythagoras), sides from a ratio (shape, not size), $0 < \sin A, \cos A < 1$, ratios in given triangles, ramps and roads.
- **t02** Standard angles: derivation of the $45^\circ$ values (isosceles right triangle) and $30^\circ$/$60^\circ$ values (half an equilateral triangle), $0^\circ$ and $90^\circ$ (undefined ratios), the full table, monotonic behaviour of $\sin$ and $\cos$, evaluating expressions, finding angles from ratio equations, sides of a triangle from an angle.
- **t03** Identities: proof of $\sin^2 A + \cos^2 A = 1$ and derivation of the other two with their angle ranges, ratios from one ratio by identities alone, simplification, proofs (identity substitution, sine–cosine form, difference of squares, conjugates), conditions such as $5\sin\theta = 12\cos\theta$, the bound $\sin\theta + \cos\theta \le \sqrt2$, numerical testing versus proof.
- **Removed topic absent:** trigonometric ratios of complementary angles. No item relates the ratios of $A$ and $90^\circ - A$, not even as a distractor; standard values are listed separately (never as "$\sin 30^\circ = \cos 60^\circ$"); one case alternative that would have verified $\cos 60^\circ = 1 - 2\sin^2 30^\circ$ was replaced by $\tan 60^\circ = \dfrac{\sin 60^\circ}{\cos 60^\circ}$ to stay clear of it. The decks and notes say the topic is not in the 2026–27 syllabus.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Ratios and standard angles" (t01–t02) 19 slides; Part 2 "Trigonometric identities" (t03) 17 slides |
| Worked examples | 5 + 6 (all ratios from $\tan A = \frac{5}{12}$; ratios in triangle $PQR$; evaluating an expression; angles from two ratio equations; sides from a $60^\circ$ angle; ratios from $\sec\theta = \frac{25}{7}$ by identities; a simplification to $2$; $\sin^4 A - \cos^4 A$; $\tan A + \cot A$; a conjugate proof; a condition $5\sin\theta = 12\cos\theta$) |
| Visuals | 26 of 36 slides, max 1 slide without a visual. Deck: geometry 11 (right triangles, similar triangles, the $45^\circ$ and $30^\circ$–$60^\circ$ triangles, hypotenuse-$1$ triangle), table 13, flow 2. Notes/questions: geometry 8, table 5, flow 1 |
| Check slides | 3 + 3, all objective (q001, q006, q008; q012, q029, q014) |
| Notes | 6 sections, each with key terms and a visual; exam tips with mark split and 7 common mistakes |
| Flashcards | 30 (definition 3, formula 5, concept 5, fact 6, example 3, exam-tip 5, diagram 3) |
| Questions | 70 items, 139 marks: mcq 18, assertion-reason 6 (keys a b c d a d), true-false 5, fill-blank 5, numerical 9, short-2 9, short-3 7, long-5 6 (incl. the examined proof of the three identities), case-based 5 (1 + 1 + 2, part (c) either/or via `alternatives`, `passage_origin: soyl-original`; one carries a to-scale roof-truss figure) |
| Difficulty | d1 14, d2 35, d3 15, d4 5, d5 1 |
| Competency | recall 8, understanding 29, application 23, analysis 8, evaluation 2 — application or higher 47% of items, 65% of marks |
| Topics | t01 23, t02 28, t03 25 (items may carry two topics) |
| Tests | `t_cbse10math_ch08_short` (20 marks / 40 min) and `_long` (40 marks / 90 min), matching `cbse-10-default-chapter-test-short/long`; disjoint |

## Verifier record
Sources in `src/` (`build.mjs`, `questions.mjs`; library `../cbse-10-mathematics-ch05/src/lib.mjs`).
Run from `platform/`: `npx tsx content/authored/maths/cbse-10-mathematics-ch08/src/build.mjs`.

- **Numeric re-solve:** 148/148 checks pass. Ratios are recomputed from side lengths (Pythagoras) or from `Math.sin/cos/tan` in degrees — never from the value table the solutions use; angles in "find $\theta$" items are found by a search over whole degrees; every identity (in proofs, MCQs, true/false and cases) is evaluated on both sides at eight acute angles ($7^\circ$ to $86^\circ$); exact surd answers are compared numerically with their decimal checks ($6\sqrt3 \approx 10.39$, $40\sqrt3 \approx 69.28$, $\frac{4}{\sqrt3} \approx 2.31$, $\frac{8}{\sqrt3} \approx 4.62$); the "which value is possible" and "which is an identity" MCQs are decided by testing every option.
- **Geometry:** 19 figures with computed coordinates (y up). Every degree label ($30^\circ$, $45^\circ$, $60^\circ$) measures within $0.6^\circ$, every right-angle mark measures $90^\circ$, and numeric length labels agree with one scale (the roof truss declares 1 drawing unit per metre; the $PQR$ triangle is drawn at 0.3 units per cm). Unknown sides are labelled "?" or with $k$-multiples, never with their answers.
- **KaTeX:** 1514 math strings parse in strict "error" mode; no lost backslashes (the validator now also catches `sin`, `cos`, `tan`, `sec`, `cot`, `theta` without a backslash) or control characters.
- **Narration:** 36 slides, max 65 words, mean 44; ratios spoken as "sine", "cosine", "tangent", "secant", "cosecant", "cotangent" (the validator rejects the abbreviations).
- **Fixes during the pass:** (1) accepted answers for two fill-blanks included LaTeX forms (`\sqrt3`, `\dfrac{\sqrt3}{2}`), which render outside maths — removed (plain forms such as √3, sqrt3, 1.732 remain); (2) the c02 alternative was changed as described under Scope; (3) the lint's competency band flagged 44% application+; two items whose demand is genuinely above routine were relabelled (q048, proving a new identity; q067, deriving ratios from a constructed figure), giving 47%.
- **Originality:** avoided NCERT's $AB = 24$, $BC = 7$ triangle, "15 cot A = 8", "cot θ = 7/8" expression, "$PR + QR = 25$, $PQ = 5$", "$2\tan^2 45^\circ + \cos^2 30^\circ - \sin^2 60^\circ$", "$\frac{\sin 30^\circ + \tan 45^\circ - \operatorname{cosec} 60^\circ}{\ldots}$", "$\frac{5\cos^2 60^\circ + 4\sec^2 30^\circ - \tan^2 45^\circ}{\ldots}$", the $\frac{1 - \tan^2 45^\circ}{1 + \tan^2 45^\circ}$ and "$\sin 2A = 2\sin A$" MCQs, $AB = 5$ with $\angle ACB = 30^\circ$, "$9\sec^2 A - 9\tan^2 A$", and the Ex 8.4 identities ($(\operatorname{cosec}\theta - \cot\theta)^2$, $\frac{1 + \sec A}{\sec A}$, $\sqrt{\frac{1 + \sin A}{1 - \sin A}}$, $\frac{\sin A - \cos A + 1}{\ldots}$, $(\sin A + \operatorname{cosec} A)^2 + \ldots$); also the textbook classics "$\sec\theta + \tan\theta = p$", "$\tan\theta + \sin\theta = m$". Contexts: Pune hospital ramp and school ramp, Shimla road, Kozhikode roof truss, Chennai rangoli, Lucknow relay.
- **Pipeline stages 5–6 (`verify --authored`, `originality --authored`):** verify 70/70 pass, 0 flags (five minor flags cleared by stating fill-blank answers in plain form, e.g. "Answer: 15/8.", in q031–q034 and q067(b)); originality 0 errors after rewording three stems (q014, q054, q056).
- **MCQ key balance:** keys rotated after the re-solve to 6/6/6/5 (a/b/c/d).

## Gaps / follow-ups
- d4–d5 items are 6 (the identity chapter's hard items are mostly the long proofs); application+ is 47% of items but 65% of marks.
- Narration audio not generated (TTS stage). `word_limit` not set on maths short/long items (marked by steps).
