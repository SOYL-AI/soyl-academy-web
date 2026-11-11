# ICSE Class 9 Mathematics — Chapter 7: Logarithms (authored, v1)

Hand-authored chapter (DECISIONS D-025, D-026, D-050) in the ICSE 2027 Mathematics presentation, built with the ICSE 10
Mathematics chapter approach (builders + independent re-solve). Writer: `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`,
provenance `origin: "human"`, `model: null`. All items are `status: "draft"` until the subject-producer reviews them.

## Scope (ICSE Class IX syllabus, Unit 3 Algebra)
- **t01** Logarithmic and exponential forms and converting between them ($a^x = N \iff \log_a N = x$, $a > 0$, $a \ne 1$, $N > 0$); why those conditions are needed; evaluating simple logarithms (integer, negative and fractional values) by matching bases; $\log_a 1 = 0$, $\log_a a = 1$; common logarithms (base 10), the graph of $\log x$, finding an unknown base or number, moving the decimal point with a given value (log tables and antilog tables are mentioned once, as not required).
- **t02** The product, quotient and power laws (with the index-law proof of the product law), $\log_a a^x = x$, combining logarithms into one, the common errors $\log(m+n)$ and $\frac{\log m}{\log n}$.
- **t03** Expanding and simplifying expressions with the laws (including roots and reciprocals), writing logarithms in terms of $\log 2$, $\log 3$, $\log 5$ using $\log 10 = 1$, problems with given values ($\log 2 = 0.3010$, $\log 3 = 0.4771$, $\log 5 = 0.6990$, $\log 7 = 0.8451$) including the number of digits of a power, simple logarithm equations (by conversion or the laws) with a domain check, and proofs of simple identities.
- The chapter lists no removed topics. Not used: the change-of-base formula (not in the Class IX list), logarithm tables, antilogarithms, natural logarithms.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Two forms, valid values and common logarithms" (t01) 20 slides; Part 2 "The laws, expanding and simplifying, and equations" (t02–t03) 21 slides |
| Worked examples | 5 + 7 (power to logarithm form; $\log_8 32$; the unknown base in $\log_x \frac{1}{81} = -4$; the unknown number in $\log_4 x = \frac{5}{2}$; an acidity score $-\log c$ with $c = 5 \times 10^{-4}$; $\log 8 + \log 125$; $2\log 5 + 3\log 2$; expanding $\log \frac{a^3\sqrt{b}}{c^2 d}$; $\log 54$ from given values; $\log_2 x + \log_2(x-2) = 3$; $\log_4(3x-5) = 2$; $\log 48 - \log 3 = 4\log 2$) |
| Visuals | 29 of 41 slides (table 25, flow 3, plot 1 on slides); max 1 consecutive slide without a visual. Notes: 7 sections, each with a visual, plus 14 more (tables, flows, a two-curve plot of $\log_2 x$ and $\log x$) |
| Check slides | 4 + 4, all objective (q001 mcq, q005 mcq, q007 mcq, q028 true-false; q009 mcq, q014 mcq, q016 mcq, q043 numerical), none used in a test |
| Notes | 7 sections with key terms and formulas; exam tips with mark split and 6 common mistakes |
| Flashcards | 30 (definition 5, formula 6, concept 6, fact 4, example 4, exam-tip 3, diagram 2) |
| Questions | 65 items, 151 marks: mcq 22, assertion-reason 5 (keys c a b d c), true-false 5, fill-blank 5, numerical 7 (4 × 1 mark, 3 × 2 marks), short-2 8, short-3 6, long-10 7 (structured (a)(b)(c), 3 + 3 + 4, 6–9 step marks each) |
| Difficulty | d1 8, d2 26, d3 23, d4 8 |
| Competency | recall 6, understanding 18, application 29, analysis 10, evaluation 2 — application or higher 63% of items, 82% of marks (lint band 45–65% of items) |
| Topics | t01 21, t02 15, t03 30 (items may carry two topics) |
| MCQ keys | a 6, b 6, c 5, d 5 (options rotated after the re-solve) |
| Tests | `t_icse9math_ch07_short` (20 marks / 30 min: A = q004 q010 q018 q020 mcq, q026 AR, q049 short-2, q056 short-3; B = one of q061, q063) and `_long` (40 marks / 60 min: A = q002 q003 q008 q012 q015 q019 q022 mcq, q027 AR, q045 q047 q050 short-2, q055 q058 short-3; B = any two of q059 q062 q065), matching `icse-9-default-chapter-test-short/long`; disjoint, and no deck-check item is used |


## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests), `src/questions.mjs` (bank + one re-solve check per item),
`src/logs.mjs` (exact logarithm helper), `src/lib.mjs` (shared ICSE 9 builders, copied unchanged from `icse-9-mathematics-ch01`).
Run from `platform/`: `npx tsx content/authored/maths/icse-9-mathematics-ch07/src/build.mjs`.
Rebuilding is deterministic: two runs give identical `release.json` (md5 `0d60f424310af09984a6b77ca11083d8`) and `tests.json` (md5 `f87260afcd28053a5febbc422d1b7891`).

- **Exact logarithms (`logs.mjs`):** a positive rational is held as a prime-exponent vector with rational exponents. `logExact(b, a)` is the ratio of proportional vectors (so $\log_{1/4} 32 = -\frac{5}{2}$, $\log_{25} 5 = \frac12$ are exact; it returns null when $a$ is not a rational power of $b$). `powEq(b, x, N)` confirms $b^x = N$ for rational $x$ by comparing $b^p$ and $N^q$ in BigInt. Every printed fact of the form $b^x = N$ or $\log_b N = x$ in a table or worked example is built through these two functions.
- **Laws:** `law(terms, target, base)` checks a combination $\sum c_i \log N_i = \log T$ twice: exactly, as equality of prime-exponent vectors (for example $\log 12 = 2\log 2 + \log 3$), and numerically to $10^{-12}$ in the stated base. `numExp` checks every symbolic expansion ($\log\frac{x^3y^2}{z}$, with roots and reciprocals) at three sample points to $10^{-12}$.
- **Given-value problems:** $\log 2 = 0.3010$, $\log 3 = 0.4771$, $\log 5 = 0.6990$, $\log 7 = 0.8451$ are scaled integers; each combination (for example $\log 54 = \log 2 + 3\log 3 = 1.7323$, $\log 0.0375 = -1.4259$) is evaluated in exact rational arithmetic and printed as an exact decimal, never through floating point. Digit counts ($2^{40}$: 13, $2^{50}$: 16, $3^{30}$: 15) are confirmed against BigInt powers; "least whole number of hours/days" answers are confirmed by direct iteration.
- **Domains and rejected roots:** every equation's accepted and rejected roots are tested against the domain of every logarithm in it; the domain statements in q017 and q051 are confirmed by scanning test values.
- **Re-solve:** 155/155 checks pass (`src/resolve.log`, git-ignored). Each MCQ's options are typed independently and `which`/`pick` confirms exactly one passes the independent test (distractors are the usual slips: swapped $N$ and $x$, adding where the law multiplies, a lost factor, a sign slip on a bracket, a negative base). Proof items (q060, q057, q064) assert the algebra numerically at several values.
- **KaTeX:** 1,498 math strings parse in strict "error" mode; no Unicode maths symbols inside `$…$`; no LaTeX outside `$…$`. Plots: 3 plots (1 on slides, 2 in the notes), 12 marked points all on their curves, 4 zeros located and marked.
- **Narration:** 41 slides, max 83 words, mean 53; numbers in words, no symbols, no capital-letter abbreviations.
- **Lint:** stage-4 `lintExemplar` on this chapter: 0 errors, 0 warnings. Stage-5 deterministic checks and the answer-leak scan run inside the build and are clean.

## Points for a reviewer
- Facts to confirm against the ICSE Class IX list: the chapter uses simple fractional-value logarithms ($\log_8 32 = \frac53$, $\log_{1/4} 32 = -\frac52$) and square-root powers ($\sqrt{b} = b^{1/2}$) in expansions; both follow from the index laws taught in Class IX but go slightly beyond "simple" if the board expects integer values only.
- The acidity-score ($-\log c$), the sound score ($10\log \frac{I}{I_0}$) and the rumour/algae growth items are original contexts described in the chapter's own words.
- Assertion-reason option wording follows the lib (ICSE 2027 specimen order).
- Model answers for the three-part long items give working for every part with step marks 3 + 3 + 4 split over 6–9 steps.

## Originality
The other maths banks were searched for logarithm items first. Only calculus items (natural logarithm in differentiation, integration and differential equations in CBSE 12) mention a logarithm; none uses a base-$a$ logarithm, the laws, or a given-value problem, and none of their stems or numbers is reused. Contexts are imagined and unnamed or named only by first name (a notebook, a moss patch, a signal meter, a dilute solution, a gauge, a sound meter, an algae film, rumours in a town). No item is taken from a textbook (Selina, ML Aggarwal, RD Sharma, NCERT), specimen paper or past paper; the ICSE 2027 specimen was used for the assertion-reason option order only. Textbook-flavoured identities were avoided on purpose (for example the proof that $a^2 + b^2 = 7ab$ gives $\log\frac{a+b}{3} = \frac12(\log a + \log b)$ is replaced by "if $\log(x+y) = \log x + \log y$ then $y = \frac{x}{x-1}$").

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- The product-law proof is a flow chart on slide 4 of part 2 and a full proof in q060(a); the quotient law is stated with its index-law origin but its proof is not a separate item.
- Fill-blank answers are numeric (the platform grader compares text), so logarithms that are fractions are accepted as `1/32` and `0.03125`.
- Only one plot of $y = \log x$ with a two-curve version in the notes; no graph-sketching items (not in the topics).
