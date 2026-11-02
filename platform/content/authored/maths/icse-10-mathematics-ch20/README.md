# ICSE Class 10 Mathematics — Chapter 20: Trigonometric Identities (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) in the ICSE 2027 Mathematics presentation, built with the CBSE maths chapter approach (builders + independent re-solve). Author: `claude-opus-5-5 (subject-producer)`, provenance `origin: "human"`, `model: null`. All items are `status: "draft"` until review.

## Scope (ICSE 2027 syllabus, Unit 5 Trigonometry)
- **t01** The three Pythagorean identities, derived from a right-angled triangle (Pythagoras divided by $h^2$, then by $\cos^2$ and $\sin^2$); their rearranged forms; finding all six ratios from one given ratio; range check (a value such as $\sin\theta = 1.2$ is impossible); validity at $0^\circ$ (cot and cosec undefined there).
- **t02** Proving identities: work on one side, convert to sine and cosine, common denominators, conjugates, standard proof shapes.
- **t03** Simplifying algebraic trigonometric expressions with the identities, evaluating an expression when one ratio is given, evaluating with exact standard-angle values, eliminating $\theta$ from two relations.
- **Complementary angles** ($\sin(90^\circ - \theta) = \cos\theta$ and the five matching rules) are taught as a tool for t02 and t03 and tagged t03 (the syllabus file lists no separate topic for them in this chapter). The syllabus lists no removed topics for this chapter.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "The three Pythagorean identities" (t01) 18 slides; Part 2 "Complementary angles, proofs and expressions" (t02–t03) 20 slides |
| Worked examples | 3 + 6 (the three identities tested in the 6, 8, 10 triangle; all six ratios from $\sin\theta = \frac{28}{53}$; possible and impossible ratio values; a complementary-angle evaluation; $\sec\theta - \cos\theta = \sin\theta\tan\theta$; a conjugate sum $\frac{1}{1+\sin\theta} + \frac{1}{1-\sin\theta}$; $\frac{\sin\theta}{1+\cos\theta} = \frac{1-\cos\theta}{\sin\theta}$; $\sec\theta + \tan\theta$ from $\sin\theta = \frac{12}{37}$; a three-factor product) |
| Visuals | 27 of 38 slides (table 19, flow 6, geometry 2); max 1 consecutive slide without a visual. Notes: 7 sections, each with a visual, 23 further visuals |
| Check slides | 4 + 4, all objective (q001 mcq, q003 mcq, q012 mcq, q033 fill-blank; q008 mcq, q006 mcq, q016 mcq, q032 fill-blank) |
| Notes | 7 sections with key terms and formulas; exam tips with mark split and 6 common mistakes |
| Flashcards | 30 (formula 11, concept 5, example 5, fact 4, exam-tip 4, definition 1) |
| Questions | 65 items, 167 marks: mcq 20, assertion-reason 6 (keys a b c d b a), true-false 5, fill-blank 6, numerical 6 (2–3 marks), short-2 4, short-3 5, short-4 6, long-10 7 (structured (a)(b)(c), 3 + 3 + 4, 7–8 step marks each) |
| Difficulty | d1 12, d2 28, d3 23, d4 2 |
| Competency | recall 7, understanding 20, application 32, analysis 6 — application or higher 58% of items, 83% of marks (lint band 45–65% of items) |
| Topics | t01 25, t02 16, t03 32 (items may carry two topics) |
| Tests | `t_icse10math_ch20_short` (20 marks / 45 min: A = q002 q011 q014 mcq, q023 AR, q048 q051 short-3; B = one of q059 q060) and `_long` (40 marks / 90 min: A = q005 q007 q010 q013 q015 q020 mcq, q022 q025 AR, q053 q055 q058 short-4; B = any two of q061 q062 q063), matching `icse-10-mathematics-chapter-test-short/long`; disjoint, and no deck-check item is used |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests), `src/questions.mjs` (bank + one re-solve check per item), `src/trig.mjs` (exact and floating-point trigonometry), `src/prop.mjs` (exact BigInt rational class `Fr`, copied from ch06; only `fr` and `Fr` are used), `src/lib.mjs` (shared ICSE builders, copied unchanged). Run from `platform/`: `npx tsx content/authored/maths/icse-10-mathematics-ch20/src/build.mjs`; lint only this chapter with `npx tsx content/authored/maths/icse-10-mathematics-ch20/src/lint.mts content/authored/maths/icse-10-mathematics-ch20`. Rebuilding is deterministic (identical `release.json` / `tests.json` hashes on two runs).

- **Exact values (`trig.mjs`):** elements of $\mathbb{Q}(\sqrt{2}, \sqrt{3})$ (rational parts in BigInt) hold every value of sin, cos, tan, cot, sec, cosec at $0^\circ$, $30^\circ$, $45^\circ$, $60^\circ$, $90^\circ$; division uses the exact norm, and undefined values (such as $\tan 90^\circ$ or $\cot 0^\circ$) throw. Expressions are parsed from text (`sin(A)`, `cos(90-A)`, `tan(30)^2`) and evaluated exactly at standard angles; answers print as canonical surds (`\dfrac{\sqrt{3}}{6}`).
- **Given-ratio mode:** from one exact ratio (e.g. $\sin\theta = \frac{28}{53}$) the other five are computed with exact fractions, requiring perfect squares, and the three Pythagorean identities are re-checked on the result; `G('sec(T)+tan(T)', ratios)` then evaluates any expression exactly.
- **Identities by substitution:** every identity, every "prove that" result and every individual step of every proof is evaluated at three exact standard angles and eleven floating-point angles ($7^\circ$ to $81^\circ$, relative error below $10^{-9}$); a step that fails stops the build. False claims are shown to fail: $\sin\theta + \cos\theta = 1$ (false at all eleven angles), a wrong right-hand side in s301, swapped denominators in l05 (a), and each wrong MCQ option expression (exactly one option equals the target).
- **Complementary-angle items:** values such as $\sin 63^\circ \div \cos 27^\circ$ are checked in floating point to $10^{-9}$ and the rule $\sin(90^\circ - A) = \cos A$ (and the five others) is checked as an identity; equations such as $\sin 3A = \cos(A - 26^\circ)$ are solved and substituted back, and the other MCQ options are shown not to satisfy them.
- **Re-solve:** 146/146 checks pass (`src/resolve.log`). Keys, numerical values and the numbers in model answers and solutions are typed as literals and recomputed; MCQ option values are typed independently so exactly one equals the re-solved target (distractors are the usual slips: the wrong reciprocal, adding instead of using Pythagoras, forgetting the factor $2$, inverting a fraction).
- **Slides, tables, figures, notes:** every worked example and table entry is recomputed in `build.mjs` (the build stops on a mismatch), including each cell of the standard-angle table. Both triangle figures are drawn from lengths in cm at a stated scale; the hypotenuse length and the angle at C are asserted from the drawn coordinates.
- **KaTeX:** 1,253 math strings parse in strict "error" mode; no Unicode maths symbols inside `$…$`; every `\operatorname{cosec}` has its backslash.
- **Narration:** 38 slides, max 64 words, mean 43; numbers in words, no symbols or capital-letter abbreviations.
- **MCQ key balance:** options rotated after the re-solve (a 5, b 5, c 5, d 5).
- **verify (deterministic checks):** 65 questions, 0 flags. **Lint:** stage-4 `lintExemplar` on this chapter: 0 errors, 0 warnings. **Originality** (`content originality --authored`, 321 units): 0 errors for this unit.

## Originality
Every stem names its own content and every "prove that" item opens with its own sentence about what the result shows (the duplicate check ignores maths). The identities chosen differ from CBSE 10 Mathematics ch08 (which uses $\sin^4 + \cos^4$, $\sec - \tan$ products, $\cot - \tan$, $x = 3\sec\theta$, $\tan + \cot = 2$, $\sin + \cos = 1.4$ and $\frac{7}{5}$, $\operatorname{cosec} - \cot = \frac{1}{3}$ and similar). Here the proofs involve the conjugate sums, $\sec\theta - \cos\theta$, $\cot^2 A - \cos^2 A$, $\cos^4 A - \sin^4 A$, and elimination of $\theta$ from ellipse, hyperbola and circle parametrisations. CISCE documents were used for pattern only; no textbook or paper question is reproduced. Imagined contexts only; no people or places are named.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Standard-angle tables and values of the ratios themselves belong to the neighbouring chapter (Trigonometric Ratios); here they are used, not taught.
- Difficulty is concentrated at d2–d3 (two d4 items); proofs are 3–4 marks and the ten-mark questions combine three of them with an evaluation.
- No plots: the chapter's visuals are tables, flow charts and two triangle figures (a graph of $\sin^2 + \cos^2$ would add nothing the exact tables do not).
- `src/prop.mjs` is a copy of the ch06 rational-arithmetic helper kept only for its `Fr` class.
