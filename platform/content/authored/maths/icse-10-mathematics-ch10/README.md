# ICSE Class 10 Mathematics — Chapter 10: Geometric Progression (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) in the ICSE 2027 Mathematics presentation, built with the
CBSE maths chapter approach (builders + independent re-solve). Author: `claude-opus-5-5 (subject-producer)`, provenance
`origin: "human"`, `model: null`. All items are `status: "draft"` until review.

## Scope (ICSE 2027 syllabus, Unit 2 Algebra)
- **t01** Geometric progression, common ratio and general term: testing a list (equal ratios; fractional and negative ratios; $r = 1$; no zero terms), $T_n = ar^{n-1}$, which term has a given value, $a$ and $r$ from two given terms (both roots of an even power), missing middle term $b^2 = ac$, three terms $\frac{a}{r}, a, ar$, terms counted from the end.
- **t02** Sum of the first $n$ terms: derivation by multiplying by $r$ and subtracting; the forms for $r > 1$ and $r < 1$ (including negative $r$); $r = 1$ ($S_n = na$); number of terms for a given total; least number of terms to pass a value; $T_n = S_n - S_{n-1}$.
- **t03** Simple applications: population growth, depreciation, doubling and halving cultures, a bouncing ball, a phone relay, a doubling savings plan compared with an arithmetic one.
- `removed_topics` is empty for this chapter. The sum to infinity is not among the ICSE 2027 topics and is not used anywhere.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Common ratio and the nth term" (t01) 20 slides; Part 2 "Sum of n terms and applications" (t02–t03) 19 slides |
| Worked examples | 6 + 7 (testing $2, -6, 18, -54$; 8th term of $81, -27, 9, \ldots$; which term of $6, 18, 54, \ldots$ is $4374$; $a$, $r$, $T_8$ from $T_3 = 36$, $T_6 = 972$; two GPs from $T_2 = 6$, $T_4 = 54$; $x$ from $x - 2, x + 1, x + 7$; $S_6$ of $4, 12, 36, \ldots$; $S_6$ of $96, 48, \ldots$; $S_7$ of $2, -4, 8, \ldots$; terms of $7 + 21 + \cdots$ making $2548$; village population at 4%; machine depreciation at 10%; phone relay) |
| Visuals | 27 of 39 slides (plot 10, table 15, flow 2); max 1 consecutive slide without a visual. Notes: 7 sections, each with a visual, plus 14 more |
| Check slides | 4 + 4, all objective (q002 mcq, q031 fill-blank, q038 numerical, q027 true-false; q010 mcq, q034 fill-blank, q015 mcq, q028 true-false) |
| Notes | 7 sections with key terms and formulas; exam tips with mark split and 6 common mistakes |
| Flashcards | 28 (definition 1, formula 8, concept 7, example 5, exam-tip 4, fact 2, diagram 1) |
| Questions | 66 items, 167 marks: mcq 18, assertion-reason 6 (keys c d b a c b), true-false 6, fill-blank 6, numerical 7 (2 × 1 mark, 5 × 2 marks), short-2 5, short-3 5, short-4 6, long-10 7 (structured (a)(b)(c), 3 + 3 + 4 or 4 + 3 + 3, 6–7 step marks each) |
| Difficulty | d1 8, d2 35, d3 21, d4 2 |
| Competency | recall 1, understanding 27, application 28, analysis 10 — application or higher 58% of items, 80% of marks (lint band 45–65% of items) |
| Topics | t01 37, t02 25, t03 12 (items may carry two topics) |
| Tests | `t_icse10math_ch10_short` (20 marks / 45 min: A = q004 q007 q013 mcq, q020 AR, q049 q050 short-3; B = one of q060, q065) and `_long` (40 marks / 90 min: A = q005 q008 q009 q012 q016 q017 mcq, q021 q023 AR, q054 q055 q056 short-4; B = any two of q061 q063 q066), matching `icse-10-mathematics-chapter-test-short/long`; disjoint, and no deck-check item is used |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests), `src/questions.mjs` (bank + one re-solve check per item),
`src/gp.mjs` (exact rationals, progressions and the working-line checker), `src/lib.mjs` (shared ICSE builders,
copied unchanged). Run from `platform/`: `npx tsx content/authored/maths/icse-10-mathematics-ch10/src/build.mjs`;
lint only this chapter with `npx tsx content/authored/maths/icse-10-mathematics-ch10/src/lint.mts content/authored/maths/icse-10-mathematics-ch10`.
Rebuilding is deterministic (identical `release.json` / `tests.json` hashes on two runs).

- **Progressions (`gp.mjs`):** all arithmetic is exact over BigInt rationals, so powers such as $3^{10}$, $\left(-\frac{1}{3}\right)^{7}$ or $1.04^{3}$ stay exact; decimals are parsed from strings. Every term is computed by $ar^{n-1}$ **and** by listing the sequence (repeated multiplication), which must agree; every sum by both closed forms **and** by adding the listed terms; "which term" and "how many terms" answers by walking the list or the partial sums (the hit must be unique); $a$ and $r$ from two terms by exact rational $k$-th roots (every real root found, each GP checked back against both given terms). Applications (growth, depreciation, cultures, the savings comparison with an arithmetic progression) are recomputed term by term.
- **Working lines:** every equation typed in a worked example, note, flashcard, solution or model answer is parsed from its TeX (fractions, powers, brackets, percentages, named terms $T_{k}$ and sums $S_{k}$ evaluated on the progression that produced them) and evaluated exactly. Adjacent sides must be equal, or satisfy $<$, $>$, $\ne$ as written, for a verified solution ($n$, $r$, $x$, $k$ or $a$); identities in $n$ (general terms, sum formulas, $rS_n - S_n = ar^n - a$) are compared for $n = 1, \ldots, 7$ on several progressions; "or" alternatives must cover every verified root (e.g. $r = 4$ or $r = -5$). A scratch negative test confirmed the checker rejects a wrong value, a wrong power ($3 \times 2^{n}$ for $3 \times 2^{n-1}$), a missing root and a wrong rounding. An unparsable line stops the build.
- **Re-solve:** 327/327 checks pass (`src/resolve.log`). Keys and option values are typed as literals and compared with recomputed values; MCQ distractors are recomputed slips (power $n$ instead of $n - 1$, lost sign of an odd power, ratio divided the wrong way, the arithmetic mean instead of the geometric one, a single term instead of a sum, one sum too many or too few, simple instead of compound depreciation). Formula options are compared with $T_n$ / $S_n$ for $n = 1, \ldots, 7$.
- **Plots:** 56 marked points lie on their curves and match their labels; bar and scatter series are built from computed terms and partial sums and asserted in `build.mjs`.
- **KaTeX:** about 1,500 math strings parse with KaTeX in strict "error" mode; no Unicode maths symbols inside `$…$`.
- **Narration:** 39 slides, max 68 words, mean 48; numbers in words, no symbols, no capital-letter abbreviations.
- **MCQ key balance:** options rotated after the re-solve (a 5, b 5, c 4, d 4).
- **Solution notes (D-032):** written-type working is in `answer.model_answer_md`; `solution_md` is a short method note; a scan found no solution sentence of 60+ characters repeated in the stem or model answer.
- **Gates:** stage-4 `lintExemplar` on this chapter: 0 errors, 0 warnings. Stage-5 deterministic checks (`verify-local`): 66 questions, 0 flags. **Originality** (`content originality --authored`): 0 errors, 0 warnings (the first run found one near-duplicate pair inside this chapter — numbers are ignored — and the MCQ stem was reworded).

## Originality
CBSE 10 Mathematics has no geometric-progression chapter; its arithmetic-progression chapter (ch05) and ICSE ch09
(arithmetic progression) are in the bank, so GP stems were worded around ratios and multiplying rather than reusing
AP phrasings, and the originality gate confirms no near-duplicates. Very common textbook set-ups were avoided on
purpose (e.g. three numbers with product $216$ and sum $26$, or $2, 6, 18$ as the answer to "three numbers in GP";
$343$ / $57$ giving $1, 7, 49$ is used instead). All contexts (Navgaon, Sonapur, a printing press, a taxi company,
a delivery firm, a laboratory, a school phone relay, Kabir and Meher) are imagined and labelled as such. No item is
taken from a textbook (Selina, ML Aggarwal, NCERT), specimen paper or past paper; CISCE documents were used for
pattern only.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Model answers describe graphs in words (answers carry no visuals); no question carries a figure in its stem.
- Log tables (allowed in the board paper) are not needed: every "which term" or "how many terms" item resolves to an exact power.
- **2026-11-05:** assertion-reason options reordered to the ICSE 2027 Mathematics specimen paper (511) order and wording; every key re-mapped so each item's meaning is unchanged.
