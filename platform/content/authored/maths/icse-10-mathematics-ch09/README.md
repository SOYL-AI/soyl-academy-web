# ICSE Class 10 Mathematics — Chapter 9: Arithmetic Progression (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) in the ICSE 2027 Mathematics presentation, built with the
CBSE maths chapter approach (builders + independent re-solve). Author: `claude-opus-5-5 (subject-producer)`, provenance
`origin: "human"`, `model: null`. All items are `status: "draft"` until review.

## Scope (ICSE 2027 syllabus, Unit 2 Algebra)
- **t01** AP, common difference and the general term: testing a sequence (every difference), $d$ positive/negative/zero/decimal, $T_n = a + (n - 1)d$ and $T_n = pn + q$, which term / is it a term, number of terms of a finite AP, the $m$th term from the end, an AP from two conditions, three terms as $a - d$, $a$, $a + d$ and the condition $2b = a + c$.
- **t02** Sum of the first $n$ terms in both forms ($\frac{n}{2}[2a + (n - 1)d]$ and $\frac{n}{2}(a + l)$, derived by pairing), $n$ from a given sum (quadratic; rejecting negative, fractional or meaningless roots, including a case where both roots are positive), $T_n = S_n - S_{n-1}$, sums of a block of terms.
- **t03** Simple applications: savings and instalments that change by a fixed amount (increasing and decreasing), stacked chairs, a growing sapling, a burning candle, temperatures on a trek, distances of a rolling trolley, ticket sales, fines.
- The syllabus lists no removed topics for this chapter. Geometric progressions are left to chapter 10. Notation is ICSE-style $T_n$ (one note mentions $t_n$/$a_n$).

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Common difference and the general term" (t01) 20 slides; Part 2 "Sum of the first n terms and applications" (t02–t03) 19 slides |
| Worked examples | 7 + 6 (is it an AP; general term of $13, 8, 3, \ldots$; which term / is $60$ a term; counting terms and the 10th from the end; AP from $T_5$ and $T_{14}$; three numbers with sum $36$ and product $1428$; stacked chairs; a direct sum with negative terms; a sum from first and last terms; $n$ from a sum with a fractional root rejected; a block of terms two ways; a loan repaid by rising instalments; a rolling trolley) |
| Visuals | 27 of 39 slides (plot 14, table 10, flow 3); max 1 consecutive slide without a visual. Notes: 7 sections, each with a visual, plus 14 more |
| Check slides | 4 + 4, all objective (q002 mcq, q039 numerical, q005 mcq, q026 true-false; q015 mcq, q042 numerical, q029 true-false, q016 mcq) |
| Notes | 7 sections with key terms and formulas; exam tips with mark split and 6 common mistakes |
| Flashcards | 29 (definition 2, example 8, formula 7, concept 6, exam-tip 5, diagram 1) |
| Questions | 68 items, 169 marks: mcq 19, assertion-reason 6 (keys c a d b d c), true-false 6, fill-blank 7, numerical 7 (2 × 1 mark, 5 × 2 marks), short-2 5, short-3 5, short-4 6, long-10 7 (structured (a)(b)(c), 3 + 3 + 4, 5–8 step marks each) |
| Difficulty | d1 7, d2 35, d3 24, d4 2 |
| Competency | recall 3, understanding 25, application 27, analysis 13 — application or higher 59% of items, 82% of marks (lint band 45–65% of items) |
| Topics | t01 44, t02 30, t03 13 (items may carry two or three topics) |
| Tests | `t_icse10math_ch09_short` (20 marks / 45 min: A = q001 q006 q010 mcq, q020 AR, q051 q053 short-3; B = one of q062, q065) and `_long` (40 marks / 90 min: A = q003 q007 q008 q012 q013 q017 mcq, q022 q023 AR, q056 q057 q059 short-4; B = any two of q064 q066 q068), matching `icse-10-mathematics-chapter-test-short/long`; disjoint, and no deck-check item is used |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests), `src/questions.mjs` (bank + one re-solve check per item),
`src/ap.mjs` (exact fractions and APs), `src/work.mjs` (working-line checker), `src/lib.mjs` (shared ICSE builders,
copied unchanged). Run from `platform/`: `npx tsx content/authored/maths/icse-10-mathematics-ch09/src/build.mjs`;
lint only this chapter with `npx tsx content/authored/maths/icse-10-mathematics-ch09/src/lint.mts content/authored/maths/icse-10-mathematics-ch09`.
Rebuilding is deterministic (identical `release.json` / `tests.json` hashes on two runs).

- **Progressions (`ap.mjs`):** all arithmetic is exact (reduced integer fractions, safe-integer asserted; decimals such as $2.5$ converted exactly). Every term is computed by $a + (n - 1)d$ **and** by listing the sequence; every sum by $\frac{n}{2}[2a + (n - 1)d]$, by $\frac{n}{2}(a + l)$ **and** by adding the listed terms; "which term" by exact solving, confirmed by listing (and absence confirmed by listing); $n$ from a sum by the exact quadratic (both rational roots) **and** by searching the partial sums $S_1, S_2, \ldots$, which must agree; $a$ and $d$ from two terms by exact elimination, substituted back. Counting problems (numbers from 150 to 450 that are 2 more than a multiple of 7; odd multiples of 3 between 100 and 200; multiples of 5 and 9) are also checked by brute force.
- **Working lines (`work.mjs`):** every equation typed in a worked example, note, flashcard or model answer is parsed from its TeX by an exact parser (fractions, round and square brackets, decimals, Indian digit groups, subscripted $T_{k}$, $S_{k}$, $T_n$, $S_{n-1}$ evaluated from the AP's $a$ and $d$). Numeric sides must be equal exactly; identities in $n$ (e.g. $T_n = 18 - 5n$, $S_n = \frac{n(53 - 3n)}{2}$) must agree at nine sample points; an equation in an unknown ($n$, $a$ and $d$, $q$, $m$) must hold at the verified solution(s); "or" alternatives must cover every root; inequalities ($18 < 30$) and $\ne$ claims are checked. Rules for $S_n$ given in stems ($4n^2 - n$, $\frac{n(5n + 3)}{2}$, $\frac{3n^2 + 13n}{2}$, $7n - n^2$) are checked as identities against the AP they define. An unparsable line stops the build.
- **Re-solve:** 324/324 checks pass (`src/resolve.log`). Keys and option values are typed as literals and compared with recomputed values; MCQ distractors are the usual slips, each recomputed ($a + nd$ instead of $a + (n - 1)d$; $n - 1$ steps reported as terms; forgetting to halve; the sign of $d$; term number instead of hours for the candle; the fine for one day instead of the total). Formula options are evaluated on test APs with odd and even $n$.
- **Plots:** 75 marked points lie on their lines or curves and match their labels; 4 intersection points lie on both graphs; no point is marked at a zero, and the lint plot-zero rule passes.
- **KaTeX:** 1,545 math strings parse with KaTeX in strict "error" mode; no Unicode maths symbols inside `$…$`; a scratch scan found no lost backslashes (`ldots`, `times`, …) and no control characters.
- **Narration:** 39 slides, max 69 words, mean 49; numbers in words, no symbols, no capital-letter abbreviations ("arithmetic progression", never the letters).
- **MCQ key balance:** options rotated after the re-solve.
- **Solution notes (D-032):** written-type working is in `answer.model_answer_md`; `solution_md` is a short method note; a scan found no solution sentence of 60+ characters repeated in the stem, options or model answer.
- **Gates:** stage-4 `lintExemplar` on this chapter: 0 errors, 0 warnings. Stage-5 deterministic checks (`verify-local`): 68 questions, 0 flags. **Originality** (`content originality --authored`): this unit 0 errors, 0 warnings (the first run found five stems whose words, with maths stripped, matched CBSE 10 ch05 stems exactly or at 86%: "which term of the AP … is …", "the …th term of the AP … is …", "the common difference of the AP … is", "three consecutive terms of an AP", an nth-term assertion-reason pair; all five were reworded).

## Originality
CBSE 10 Mathematics ch05 (Arithmetic Progressions) is in the bank; all its stems, passages and worked examples were
read first, and its set-ups and numbers were avoided: no piggy-bank or weekly savings of ₹100 + ₹30, kite shop,
marathon, trains, water tank, stadium or hall seats, salary increments, ₹1000 + ₹100 loan, soap boxes, nursery rows,
courier or taxi fares, sitar practice, dairy, stepped wall; none of its APs ($7, 11, 15$; $11, 8, 5$; $6, 13, 20$;
$3, 7, 11$; $4, 9, 14$; $2, 9, 16$; $30, 26, 22$; $84, 79, 74$ …) or its sum rules ($n^2 + 3n$, $3n^2 - n$, $2n^2 + n$,
$5n^2 - 3n$). Well-known textbook items were avoided on purpose (e.g. the ladder with rungs from 45 cm to 25 cm, the
AP $3, 15, 27, 39$ "132 more than its 54th term", prizes decreasing by ₹20, logs stacked 20, 19, 18, the potato race,
"first term 2 and the sum of the first five terms is one-fourth of the next five"). All people, shops, groups and
places in contexts are imagined and labelled as such. No item is taken from a textbook (Selina, ML Aggarwal, NCERT),
specimen paper or past paper; CISCE documents were used for pattern only.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Model answers describe graphs in words (answers carry no visuals); no question carries a figure in its stem.
- Arithmetic mean as a named topic is not taught (only the condition $2b = a + c$), as the ICSE 2027 syllabus does not list it.
- Infinite APs and sums to infinity do not arise (not in the syllabus).
- **2026-11-05:** assertion-reason options reordered to the ICSE 2027 Mathematics specimen paper (511) order and wording; every key re-mapped so each item's meaning is unchanged.
