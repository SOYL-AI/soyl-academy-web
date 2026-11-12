# ICSE Class 9 Mathematics — Chapter 1: Rational and Irrational Numbers (authored, v1)

Hand-authored chapter (DECISIONS D-025, D-026, D-050) in the ICSE 2027 Mathematics presentation, built with the ICSE 10
Mathematics chapter approach (builders + independent re-solve). Writer: `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`,
provenance `origin: "human"`, `model: null`. All items are `status: "draft"` until the subject-producer reviews them.

## Scope (ICSE Class IX syllabus, Unit 1 Pure Arithmetic)
- **t01** Rational and irrational numbers as real numbers; classifying numbers as natural, whole, integer, rational or irrational; terminating and recurring decimals and the prime-factor test for a terminating fraction; converting recurring decimals (pure and mixed) to $\frac{p}{q}$ with exact subtraction; closure facts (rational + irrational is irrational; two irrationals may give a rational).
- **t02** Proofs by contradiction that $\sqrt{2}$, $\sqrt{3}$, $\sqrt{5}$ are irrational (parity for $\sqrt{2}$; divisibility by the prime $3$ or $5$), why the method fails for a perfect square, and proofs that $a + b\sqrt{c}$ and $\frac{3}{\sqrt{5}}$ are irrational.
- **t03** Representing rationals (equal division) and $\sqrt{2}$, $\sqrt{5}$, $\sqrt{13}$ on the number line by right-triangle constructions; $-\sqrt{5}$; bounding $\sqrt{2}$ and $\sqrt{5}$ between tenths and hundredths by squaring.
- **t04** Surds: meaning and order, simplification, like and unlike surds, sums, differences and products, comparing and ordering surds.
- **t05** Rationalising the denominator: single-term denominators, rationalising factors and conjugates of binomial surds, finding $a$ and $b$ in $a + b\sqrt{c}$ and $a - b\sqrt{c}$ identities, sums of conjugate fractions, a given-decimal evaluation.
- The chapter lists no removed topics. Not used: laws of exponents (not in this chapter's topics), cube-root surds beyond naming the order.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Decimals, proofs and the number line" (t01–t03) 20 slides; Part 2 "Surds and rationalising the denominator" (t04–t05) 21 slides |
| Worked examples | 5 + 6 (recurring decimals $0.\overline{72}$ and $2.5\overline{6}$; the parity step of the $\sqrt{2}$ proof; the $\sqrt{3}$ proof; marking $\sqrt{5}$ (and $\sqrt{13}$); a tile of area $1008$ cm²; $4\sqrt{20} + 3\sqrt{45} - \sqrt{80}$; $(3 + 2\sqrt{5})(4 - \sqrt{5})$; $\frac{8}{5 - \sqrt{17}}$; $\frac{2\sqrt{3} + 1}{3\sqrt{3} - 2}$; $\frac{\sqrt{7} + 2}{\sqrt{7} - 2} = a + b\sqrt{7}$) |
| Visuals | 29 of 41 slides (table 24, geometry 3, flow 2 on slides); max 1 consecutive slide without a visual. Notes: 7 sections, each with a visual, plus 10 more (table, flow, geometry). Questions: geometry assets on q057 ($\sqrt{2}$ construction) and q061 ($\sqrt{5}$ construction) |
| Check slides | 4 + 4, all objective (q028 true-false, q039 numerical, q009 mcq, q013 mcq; q017 mcq, q014 mcq, q019 mcq, q036 fill-blank), none used in a test |
| Notes | 7 sections with key terms and formulas; exam tips with mark split and 6 common mistakes |
| Flashcards | 30 (definition 6, formula 4, concept 6, fact 4, example 5, exam-tip 3, diagram 2) |
| Questions | 64 items, 149 marks: mcq 22, assertion-reason 5 (keys a b c d c), true-false 5, fill-blank 5, numerical 7 (4 × 1 mark, 3 × 2 marks), short-2 7, short-3 6, long-10 7 (structured (a)(b)(c), 3 + 3 + 4, 6 step marks each) |
| Difficulty | d1 9, d2 18, d3 28, d4 9 |
| Competency | recall 5, understanding 21, application 25, analysis 13 — application or higher 59% of items, 80% of marks (lint band 45–65% of items) |
| Topics | t01 18, t02 8, t03 9, t04 18, t05 15 (items may carry two topics) |
| MCQ keys | a 6, b 6, c 5, d 5 (options rotated after the re-solve) |
| Tests | `t_icse9math_ch01_short` (20 marks / 30 min: A = q006 q011 q016 q020 mcq, q024 AR, q050 short-2, q055 short-3; B = one of q060, q063) and `_long` (40 marks / 60 min: A = q002 q004 q007 q012 q015 q018 q022 mcq, q026 AR, q045 q048 q051 short-2, q052 q056 short-3; B = any two of q058 q061 q064), matching `icse-9-default-chapter-test-short/long`; disjoint, and no deck-check item is used |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests), `src/questions.mjs` (bank + one re-solve check per item),
`src/surd.mjs` (exact arithmetic and TeX parser), `src/figs.mjs` (number-line figures), `src/lib.mjs` (shared ICSE 9 builders,
copied unchanged). Run from `platform/`: `npx tsx content/authored/maths/icse-9-mathematics-ch01/src/build.mjs`.
Rebuilding is deterministic (identical `release.json` / `tests.json` hashes on two runs).

- **Exact arithmetic (`surd.mjs`):** a number is a rational combination of $1$ and square roots of square-free integers (exact fractions of safe integers). It supports sum, product, powers, reciprocal (single surd, or a two-term denominator by its conjugate, refusing a denominator that does not become rational), canonical TeX output and the decomposition $a + b\sqrt{c}$. `V(tex)` parses a typed TeX expression (numbers and decimals, `\sqrt{..}`, `\dfrac`, `+ - \times \cdot \div`, brackets, powers, implicit multiplication) and `chain(lines)` requires every `=` segment of every working line to have the same exact value; each worked example, table row, note and model answer is typed and checked that way, so a wrong simplification stops the build.
- **Decimals:** long division with remainder tracking gives the pre-period and repeating block; recurring decimals convert by exact subtraction and are cross-checked by long division; terminating fractions are decided by the prime factors of the reduced denominator and cross-checked against the expansion. The "never repeats" decimals of q004 and q060 are generated and tested for any period up to 120 and 100.
- **Re-solve:** 109/109 checks pass (`src/resolve.log`). Keys, option values, blanks and numerical answers are typed as literals and compared with recomputed values; each MCQ's options are typed independently so that exactly one equals the target (distractors are the usual slips: adding radicands, taking $144$ instead of $12$, forgetting the denominator $4$, using $7 + 3$ for $7 - 3$, squaring only the root). Proof items are qualitative and carry a note; the facts they use are asserted (parity and divisibility by $3$ and $5$ for $1$..$60$/$80$/$90$, the counter-example $p = 2$, $q = 1$ for $\sqrt{4}$, closure of the rationals).
- **Figures:** the $\sqrt{2}$, $\sqrt{5}$, $\sqrt{13}$ constructions are drawn from coordinates; $OB$ and the circle radius are checked against $\sqrt{a^2 + b^2}$ with Pythagoras, the right angle at $A$ is marked and measured, and the leg label agrees with the stated scale (stage-4 geometry check). The rational number line is a schematic (`not_to_scale`).
- **KaTeX:** 1,554 math strings parse in strict "error" mode; no Unicode maths symbols inside `$…$`; no LaTeX outside `$…$`.
- **Narration:** 41 slides, max 76 words, mean 51; numbers in words, no symbols, no capital-letter abbreviations.
- **Lint:** stage-4 `lintExemplar` on this chapter: 0 errors, 0 warnings. Stage-5 deterministic checks and the answer-leak scan run inside the build and are clean.

## Originality
CBSE 9 Mathematics ch01 (Number System) was read first for its stems and examples; none of its numbers or set-ups are reused
(no $0.\overline{36}$, $0.\overline{24}$, $0.\overline{63}$, $\frac{1}{17}$, $\frac{5}{13}$, $2\sqrt{75} - \sqrt{12} + \sqrt{27}$,
$\frac{1}{3 + \sqrt{2}} + \frac{1}{3 - \sqrt{2}}$, $\sqrt{288}$ as a stem, $\sqrt{10}$/$\sqrt{13}$ spiral set-ups, or the "rod between $\sqrt{2}$ and $\sqrt{3}$" item). Contexts are imagined and unnamed
or named only by first name (a tile shop, a tailor, a florist, a craftsman's braid, a banner, a rangoli frame, a courtyard, a pump gauge, a designer's scale factor). A stem-similarity scan (numbers and maths blanked) against
all 6,777 stems in the other authored banks found no duplicate after six generic stems (for example "The value of … is", "Given that … is irrational, prove that …") were given a context. No item is taken from a
textbook (Selina, ML Aggarwal, RD Sharma, NCERT), specimen paper or past paper; the ICSE 2027 specimen was used for the assertion-reason option order only.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Model answers describe constructions in words (only q057 and q061 carry a figure in the stem); the rational number line on slide 15 of part 1 is schematic.
- Proofs (q008–q010, q027, q051, q056, q058, q059) are checked qualitatively: the algebraic steps are asserted, but the logical flow is for the reviewer to read.
- t02 has the fewest tagged items (8) because proofs are long; the chapter has five proof-style items plus the three-part long answers q058 and q059.
- Fill-blank answers are numeric or a single word (the platform's fill-blank grader compares text), so surd-valued answers are asked as a coefficient (q036) or a rational value (q034).
- Surd order is named (order 2 for square roots; cube roots only mentioned): the syllabus topic says "order" without examples of higher order.
