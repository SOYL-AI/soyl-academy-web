# CBSE Class 10 Mathematics — Chapter 5: Arithmetic Progressions (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) written to the maths exemplar standard
(`content-templates/exemplars/maths/cbse-10-mathematics-ch06`) and the pacing of the authored ch01–ch04.
Author: `claude-opus-5-5 (subject-producer)`, provenance `origin: "human"`, `model: null`. All items are
`status: "draft"` until review.

## Scope (2026-27 syllabus, Standard 041 and Basic 241)
- **t01** Identifying APs: constant difference (positive, negative, zero), surds and fractions simplified before testing, the three-term condition $2q = p + r$, scaling an AP, clock times converted to minutes.
- **t02** $n$th term: any term, which term / not a term (non-natural $n$), counting terms in a range, first negative term (inequality), term from the end, AP from two terms, equal $n$th terms of two APs, middle term.
- **t03** Sum of $n$ terms: the pairing argument (table and a two-staircase geometry figure), both forms of $S_n$, finding $n$ from a sum (quadratic; a double valid answer explained), $a_n = S_n - S_{n-1}$, a list whose $S_n$ has a constant term (not an AP from the first term).
- **t04** Applications: fares, salaries, savings, instalments, seats in a hall, kite sales, a dairy, practice time, a stepped wall with limited blocks, train timetables, a water tank, simple interest (compound interest is noted as not an AP).
- The chapter has no removed topics for 2026-27.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "What an AP is and its nth term" (t01–t02) 17 slides; Part 2 "Sum of n terms and applications" (t03–t04) 18 slides |
| Worked examples | 6 + 6 (is it an AP; a far-away term; which term; counting multiples of 11; AP from two terms; Nagpur salary scale; a direct sum; how many terms — two valid answers; sum of multiples of 6; Mysuru savings; Patna loan instalments; Chennai hall seats) |
| Visuals | 25 of 35 slides, max 1 slide without a visual. Deck: plot 7 (incl. 2 bar charts), table 14, flow 2, geometry 2. Notes/questions: plot 6, table 4, flow 2, geometry 1 |
| Check slides | 3 + 3, all objective (q001, q005, q008; q011, q014, q016) |
| Notes | 7 sections, each with key terms and a visual; exam tips with mark split and 7 common mistakes |
| Flashcards | 30 (definition 1, formula 7, fact 2, example 7, diagram 2, concept 5, exam-tip 6) |
| Questions | 70 items, 139 marks: mcq 18, assertion-reason 6 (keys a b c d a d), true-false 5, fill-blank 5, numerical 9, short-2 9, short-3 8, long-5 7, case-based 5 (1 + 1 + 2, part (c) either/or via `alternatives`, `passage_origin: soyl-original`; one carries a plot asset) |
| Difficulty | d1 13, d2 30, d3 21, d4 7, d5 1 |
| Competency | recall 4, understanding 32, application 28, analysis 4, evaluation 4 — application or higher 50% of items, 57% of marks (after the 2026-10-27 competency audit) |
| Topics | t01 15, t02 37, t03 37, t04 16 (items may carry two topics) |
| Tests | `t_cbse10math_ch05_short` (20 marks / 40 min) and `_long` (40 marks / 90 min), matching `cbse-10-default-chapter-test-short/long`; disjoint |

## Verifier record
Sources in `src/` (`build.mjs`, `questions.mjs`, `lib.mjs` — a copy of ch01's library extended for this batch, see the handoff).
Run from `platform/`: `npx tsx content/authored/maths/cbse-10-mathematics-ch05/src/build.mjs`.

- **Numeric re-solve:** 158/158 checks pass. Terms and sums are recomputed by **adding terms one at a time** (never by the formulas the solutions use); "which term" and "how many" answers come from searches over $n$; counting items (two-digit numbers $\equiv 1 \pmod 4$, three-digit numbers $\equiv 3 \pmod 8$, three-digit numbers ending in 7) are brute-forced over the whole range; every story is re-run (wall rows with 400 blocks, train times in minutes, tank readings, fares of both taxi services); identities ($a_7 = 0 \Rightarrow S_{13} = 0$; $S_n = pn^2 + qn + r$ is an AP only when $r = 0$) are checked on several numeric cases. Numbers inside solutions and model answers (including every case parent's summary answer) are checked (`model`, `sol`), not only keys.
- **Plots:** 52 marked points lie on their lines and match their labels; the $S_n$ parabola meets $S_n = 120$ exactly at the marked $n = 6$ and $10$.
- **Geometry:** the two-staircase figure is drawn at one unit per term unit (labels 2 and 5 on scale); the hall plan is marked not to scale. Both pass the pipeline's geometry checks.
- **KaTeX:** 1454 math strings parse in strict "error" mode; no lost backslashes or control characters.
- **Narration:** 35 slides, max 66 words, mean 53; no symbols, no "AP" abbreviation, ordinals spelled out.
- **Fixes during the pass:** (1) a key-term definition written in a plain JS string lost the backslash of `\ge` ("n ge 2") — caught by the author validator, rewritten as a raw string; (2) after MCQ key rotation, q001's per-option paragraphs read (c), (d), (a), (b) — the builder now re-sorts such paragraphs into a–d order.
- **Originality:** avoided NCERT's three-digit multiples of 7, the 600/700 TV sets, the ₹700 seven prizes, the 200 logs, the "7 + 10½ + 14 + … + 84" sum, "17 and 350 with d = 9", "11th term 38, 16th term 73", "63, 65, 67 and 3, 10, 17", "132 more than its 54th term", "sum of 4th and 8th terms is 24", "24, 21, 18 sum 78", $a_n = 3 + 2n$, $4n - n^2$, ladder rungs and the penalty-for-delay contract; also the RD Sharma classics $S_{12} = 3(S_8 - S_4)$, $S_m = n, S_n = m$ and "three numbers with sum 24 and product 440". Contexts: Pune auto fares, Nagpur salary and trains, Hyderabad courier, Bhubaneswar sitar practice, Anand dairy, Jaipur savings, Mysuru nursery, Kolkata stadium, Surat simple interest, Lucknow carpenter, Jaisalmer stepped wall, Chandigarh taxis, Ahmedabad kites (Uttarayan), Kochi runner, Shillong quiz, Jodhpur water tank.
- **Pipeline stages 5–6 (`verify --authored`, `originality --authored`):** verify 70/70 pass, 0 flags (one minor flag cleared by stating the case answer "7:28 am" in plain text in q068(b)); originality 0 errors (q030’s stem was reworded because, with maths stripped, it read the same as q002’s).
- **MCQ key balance:** keys rotated after the re-solve to a 6/6/6/5 split (a/b/c/d); option letters in solutions, schemes and case model answers remapped and the key text verified unchanged.

## Gaps / follow-ups
- Total marks 139 (two 1-mark numericals), as in ch01.
- Narration audio not generated (TTS stage). `word_limit` not set on maths short/long items (marked by steps).
- Bar charts use plot `series` of kind `bar`; renderer support for bar series is assumed as in the contract.

## Competency audit by assessment-designer (2026-10-27)

Board papers need recall/understanding written items (CBSE design: Standard 54/24/22, Basic 75/15/10 per cent of marks), and the bank had tagged almost every routine written answer as application or higher. Every short, long, numerical and case item was re-read against what it actually asks. A routine, textbook-standard procedure on given data (find the HCF by prime factorisation, solve a given pair, find a term, compute a mean, a sector area, a single right triangle) is now **understanding**; word problems that need modelling, multi-step or non-routine reasoning, error analysis and justification keep application / analysis / evaluation. 7 item tag(s) and 7 case-part tag(s) changed (case items whose parts are now mostly recall/understanding carry `understanding` at the top level). No question text, key, solution or marking scheme changed.

Added (appended, so earlier ids are unchanged; each has its re-solve check): `q_cbse10math_ch05_071` short-3, `q_cbse10math_ch05_072` long.
