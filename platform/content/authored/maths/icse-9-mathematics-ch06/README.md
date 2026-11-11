# ICSE Class 9 Mathematics — Chapter 6: Indices (Exponents) (authored, v1)

Hand-authored chapter (DECISIONS D-025, D-026, D-050) in the ICSE 2027 Mathematics presentation, built with the ICSE 10
Mathematics chapter approach (builders + independent re-solve). Writer: `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`,
provenance `origin: "human"`, `model: null`. All items are `status: "draft"` until the subject-producer reviews them.

## Scope (ICSE Class IX syllabus, Unit 3 Algebra)
- **t01** Index form (base and index); the five laws for the same positive base: $a^m \times a^n = a^{m+n}$, $a^m \div a^n = a^{m-n}$, $(a^m)^n = a^{mn}$, $(ab)^n = a^n b^n$, $\left(\frac{a}{b}\right)^n = \frac{a^n}{b^n}$; simplifying products and quotients of powers; prime-power reduction of numerical expressions.
- **t02** Zero index ($a^0 = 1$ from the quotient law and the "divide by $a$" pattern), negative index ($a^{-n} = 1/a^n$, reciprocal of a fraction), fractional index ($a^{1/q}$ the $q$th root, $a^{p/q} = (\sqrt[q]{a})^p$), evaluating numbers such as $\left(\frac{27}{64}\right)^{-2/3}$ in the order flip, root, power; the graph of $y = 2^x$.
- **t03** Simplifying numerical and algebraic expressions with several bases or letters, expressions with an unknown in the index (factor the smallest power), exponential equations by equating indices (single powers, sums of powers, different bases that share a prime base), no-solution cases ($2^x = -4$, $5^x = 0$) and the base $1$, and the result "$a^x = b^y = c^z$ and $b^2 = ac$ give $y = \frac{2xz}{x+z}$" (long item q061, kept at Class 9 level with numerical instances first).
- The chapter lists no removed topics. Not used: logarithms (next chapter), irrational results of fractional indices (every fractional index in the chapter has an exact rational value), negative bases with fractional indices.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "The laws, zero, negative and fractional indices" (t01–t02) 21 slides; Part 2 "Simplifying and solving exponential equations" (t03) 21 slides |
| Worked examples | 4 + 7 ($\frac{5^8 \times 5^6}{5^{11}}$; $\frac{(12^3)^2 \times 12^4}{12^8}$; $\left(\frac{2}{3}\right)^{-4} + 4^{-2} \times 2^5$; $\left(\frac{27}{64}\right)^{-2/3}$; $\frac{32^{2/5} \times 27^{1/3}}{81^{3/4}}$; a long expression in $x$ and $y$; $\frac{2^{n+3} + 2^{n+1}}{5 \times 2^n}$; $4^{x+1} = 512$; $7^x + 7^{x+1} = 392$; $25^{x+1} = 125^{x-1}$; $2^{20} = 4^y = 32^z$) |
| Visuals | 30 of 42 slides (table 27, plot 2, flow 1 on slides); max 1 consecutive slide without a visual. Notes: 7 sections, each with a visual, plus 24 more (22 tables, 2 plots). The plots are $y = 2^x$ with six marked points and $y = 2^x$ with the line $y = 16$ meeting at $(4, 16)$ |
| Check slides | 4 + 4, all objective (q028 true-false, q006 mcq, q008 mcq, q012 mcq; q020 mcq, q013 mcq, q038 numerical, q018 mcq), none used in a test |
| Notes | 7 sections with key terms and formulas; exam tips with mark split and 7 common mistakes |
| Flashcards | 30 (definition 5, formula 6, concept 6, fact 4, example 4, exam-tip 3, diagram 2) |
| Questions | 64 items, 149 marks: mcq 22, assertion-reason 5 (keys a b c d b), true-false 5, fill-blank 5, numerical 7 (4 × 1 mark, 3 × 2 marks), short-2 7, short-3 6, long-10 7 (structured (a)(b)(c), 3 + 3 + 4, 8–10 step marks each) |
| Difficulty | d1 4, d2 19, d3 34, d4 7 |
| Competency | recall 1, understanding 25, application 27, analysis 11 — application or higher 59% of items, 79% of marks (lint band 45–65% of items) |
| Topics | t01 21, t02 23, t03 32 (items may carry two or three topics) |
| MCQ keys | a 6, b 6, c 5, d 5 (options rotated after the re-solve) |
| Tests | `t_icse9math_ch06_short` (20 marks / 30 min: A = q003 q007 q011 q016 mcq, q025 AR, q048 short-2, q054 short-3; B = one of q058, q060) and `_long` (40 marks / 60 min: A = q005 q009 q010 q014 q017 q019 q021 mcq, q026 AR, q045 q049 q051 short-2, q052 q056 short-3; B = any two of q059 q062 q063), matching `icse-9-default-chapter-test-short/long`; disjoint, and no deck-check item is used. Unused long items: q061, q064 |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests), `src/questions.mjs` (bank + one re-solve check per item),
`src/idx.mjs` (exact arithmetic and TeX parser for indices), `src/lib.mjs` (shared ICSE 9 builders, copied unchanged from
`icse-9-mathematics-ch01`). Run from `platform/`: `npx tsx content/authored/maths/icse-9-mathematics-ch06/src/build.mjs`.
Rebuilding is deterministic (identical `release.json` / `tests.json` hashes on two runs).

- **Exact arithmetic (`idx.mjs`):** values are exact rationals (BigInt). A fractional index $p/q$ is accepted only if the $q$th root of the base is an exact rational (so every "evaluate" is an exact statement, and an inexact root stops the build); a fractional index on a non-positive base, division by zero and $0^{-n}$ are refused. Algebraic expressions are exact sums of monomials with rational exponents for each letter, so the exponent arithmetic of every variable is compared exactly (`E`, `same`, `expOf`); division is by a single monomial only. `chain(line, env)` parses a typed TeX line (numbers, decimals, letters, `\dfrac`, `\sqrt[n]{}`, `\left( \right)`, `^{...}`, `\times`, `\div`, `+ -`, implicit multiplication) and requires every `=` segment to have the same exact value; a multi-digit exponent without braces and an unknown in an exponent are rejected. `identity(l, r, samples)` checks laws with symbolic exponents at several exact assignments.
- **Exponential equations:** every typed root is checked by exact substitution (`solveExp`); for single-term and sum equations uniqueness is checked by exact strict monotonicity of lhs − rhs over the integers −10..10 with a sign change; for equations that reduce to a common base the root is the exact solution of the linear equation in the indices (`linRoot`), and the common-base rewriting is asserted exactly at integer points. Cases where substitution cannot be exact in rationals (e.g. $8^{x+2} = 32^{x-1}$ at $x = 11/2$) use the common-base route only.
- **Re-solve:** 133/133 checks pass (`src/resolve.log`). Keys, option values, blanks and numerical answers are typed as literals and compared with recomputed values; each MCQ's options are typed independently so that exactly one equals the target (distractors are the usual slips: multiplying the bases or the indices, dividing instead of subtracting, swapping root and power, forgetting the $+2$ in $5^{x-2}$, flipping the reciprocal, $a^{-n}$ read as negative, factor $\frac{3}{2}$ for $\frac{2}{3}$). The "no solution" item (q018) and the "$x^0$ for every $x$" item (q027) are qualitative at their core and carry sample-point assertions plus a note. The long item on $a^x = b^y = c^z$ asserts the general result at three exact instances in addition to the two numerical parts.
- **Graphs:** points of $y = 2^x$ lie on the curve and match their labels; $(4, 16)$ lies on both the curve and the line (stage-4 plot checks).
- **KaTeX:** 1,687 math strings parse in strict "error" mode; no Unicode maths symbols inside `$…$`; no LaTeX outside `$…$`.
- **Narration:** 42 slides, max 78 words, mean 56; numbers in words, no symbols, no capital-letter abbreviations.
- **Lint:** stage-4 `lintExemplar` on this chapter: 0 errors, 0 warnings. Stage-5 deterministic checks and the answer-leak scan run inside the build and are clean.

## Points for a reviewer
- **Scope of the $a^x = b^y = c^z$ result (q061).** It is set as a structured long item with two numerical instances first; if the producer thinks it is above Class 9, replace part (c) by the numerical-only variant or drop q061 (it is not in a test).
- **Zero index convention.** $a^0 = 1$ is stated for $a \ne 0$ only; q027 (assertion-reason) uses that to make "for every real number" false. Check this matches the house position on $0^0$.
- **tf3 (q030)** says "positive number $a$" without "$a \ne 1$" and is keyed false (counter-example $a = 1$); it is deliberately an analysis item.
- **q022** is labelled `analysis` (deduce $m$, $n$ from two conditions, then evaluate); q012 is `analysis` (find the error in a fractional-index evaluation).
- **Competency labels:** application-or-higher is 59% of items; the items that could be argued down to `understanding` are q003, q009, q011 (context but one step).
- Contexts are imagined (a memory card, a petri dish, a pond weed, a chain message, a cubical tank); no named real people or products.

## Originality
No item is taken from a textbook (Selina, ML Aggarwal, RD Sharma, NCERT), specimen paper or past paper; the ICSE 2027 specimen was used
for the assertion-reason option order only. Existing banks were grepped for exponent items before writing (CBSE 9 Number System
has $16^{-3/4}$, $5^{x+1} \times 25 = 5^7$, $2^{-2} + 2^{-3}$, $3^x = \frac{1}{81}$, $8^{2/3}$, $25^{-1/2}$, $27^{4/3}$, $1000^{1/3}$, $2^{x-1} 4^{x+1} = 128$, $125^{-2/3} \div 16^{-3/4}$); none of those numbers or set-ups is reused (here: $343^{2/3}$, $\left(\frac{16}{81}\right)^{-3/4}$, $\sqrt[5]{243^2}$, $5^{-1} + 5^{-2}$, $3^{2x-1} = \frac{1}{243}$, $3^{x+1} \times 9^{x-2}$, etc.). A stem-similarity scan (word 3-grams, maths kept) of all 64 stems against the 7,563 stems in the other authored banks gave a highest Jaccard of 0.08 (shared phrasing "Three students make mistakes", "solves … like this"), and no stem with the same words and the same numbers.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Fill-blank answers are numeric (the platform's fill-blank grader compares text), so fractional answers are asked as integers.
- The graph of $y = 2^x$ is used for intuition (positivity, doubling); the chapter does not graph $a^x$ for other bases or discuss growth and decay models beyond the doubling and tripling contexts.
- Logarithms are not used (next chapter); the equation $2^x = 12$ with no exact index is deliberately absent, since every equation has an exact rational root.
- Proof items (q027, q061, parts of q058) are checked by sample assertions plus an exact-instance check; the logical flow is for the reviewer to read.
