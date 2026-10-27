# CBSE Class 10 Mathematics — Chapter 1: Real Numbers (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) written to the maths exemplar standard
(`content-templates/exemplars/maths/cbse-10-mathematics-ch06`). Author: `claude-opus-5-5 (subject-producer)`,
provenance `origin: "human"`, `model: null`. All items are `status: "draft"` until review.

## Scope (2026-27 syllabus, Standard 041 and Basic 241)
- **t01** Fundamental Theorem of Arithmetic: factor trees, uniqueness, ending-in-0 arguments, perfect squares/cubes from exponents.
- **t02** HCF and LCM by prime factorisation: two and three numbers, HCF × LCM = product (two numbers only, with the three-number failure taught explicitly), remainder variants, word problems (buses, signals, lights, ribbons, tiles, packing, poles).
- **t03** Irrationality: the prime-divides-a² fact (from FTA), contradiction proofs for √2, √3, √5, irrationality of r + s√p, sums/products of irrationals.
- **Removed topics absent:** Euclid's division lemma/algorithm and decimal expansions of rationals do not appear anywhere (not even in distractors); π is treated only as "irrational, 22/7 is an approximation".

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Prime factorisation, HCF and LCM" (t01–t02) 22 slides; Part 2 "Irrational numbers and proofs" (t03) 16 slides |
| Worked examples | 5 + 4 (perfect square 7056; HCF/LCM 336, 180; three numbers; Bengaluru buses; Surat ribbons; √3 proof in two slides; 4 − 3√2; "simplify before you classify") |
| Visuals | 27 of 38 slides (deck: geometry 8, table 13, flow 5, plot 1; notes: geometry 4, table 2, flow 2, plot 1); max 2 slides without a visual. Geometry (factor trees, two-circle prime diagrams, √2 on the number line, unit-square diagonal), tables, flows (HCF-or-LCM decision, proof chain), one scatter plot (bus departures) |
| Check slides | 3 + 3, all objective (q001, q037, q009; q013, q011, q021) |
| Notes | 8 sections, each with key terms, formula(s) and a visual; exam tips with mark split and 8 common mistakes |
| Flashcards | 32 (definition 5, fact 6, example 4, concept 5, formula 5, exam-tip 6, diagram 1) |
| Questions | 70 items, 139 marks: mcq 18, assertion-reason 6 (keys a b c d a c), true-false 5, fill-blank 5, numerical 9, short-2 9, short-3 9, long-5 9, case-based 5 (each 1 + 1 + 2 with an either/or part (c) via `alternatives`) |
| Difficulty | d1 9, d2 38, d3 22, d4 4, d5 2 |
| Competency | recall 9, understanding 38, application 13, analysis 11, evaluation 4 — application or higher 37% of items, 47% of marks (after the 2026-10-27 competency audit) |
| Tests | `t_cbse10math_ch01_short` (20 marks / 40 min) and `_long` (40 marks / 90 min), matching `cbse-10-default-chapter-test-short/long` (sections A objective, B short 2/3, C long with choice, D case); disjoint |

## Verifier record
Build and checks: `src/build.mjs` (decks, notes, flashcards, tests), `src/questions.mjs` (bank + one independent
re-solve check per item), `src/lib.mjs` (builders + validator). Run from `platform/`:
`npx tsx content/authored/maths/cbse-10-mathematics-ch01/src/build.mjs`; lint only this chapter with
`npx tsx content/authored/maths/cbse-10-mathematics-ch01/src/lint.mts content/authored/maths/cbse-10-mathematics-ch01`.

- **Numeric re-solve:** 141/141 checks pass (`src/resolve.log`). Every key, numerical value and the numbers inside solutions/model answers are recomputed from the givens with independent gcd/lcm/factorisation code (e.g. HCF/LCM of every pair or triple, remainders in q-remainder items, perfect-square multipliers by search, the four HCF-16/LCM-960 pairs by brute force, bus/runner/pole counts). Five proof items (√5, √3 + hence, 7 + 2√3, 2√3/7) have no number to recompute and were checked by hand for every logical step.
- **Visual checks:** the two-circle prime diagrams were checked against the factorisations; factor-tree leaves multiply back to the root (built by code); √2 point at 3 + 2√2 drawing units on a 2-units-per-1 scale; unit-square labels on one scale.
- **KaTeX:** all 1562 math strings parse with KaTeX 0.19 in strict "error" mode; no LaTeX command without its backslash; no LaTeX outside `$…$`; no Unicode maths symbols inside `$…$`.
- **Narration:** 38 slides, max 71 words, mean 57; no symbols, digits-with-letters or letter abbreviations (HCF/LCM are spoken as "highest common factor" / "lowest common multiple").
- **Fixes during the pass:** competency labels tuned for honesty after the first build (43% → 47% application or higher by relabelling three items whose demand was genuinely above routine: q002 ends-in-0 across four bases, q045 composite by factoring out 9, q027 HCF = a ⇒ LCM = b); no numeric discrepancies were found by the re-solve.
- **Originality:** no NCERT example or exercise numbers are reused (e.g. NCERT's 3825, 96/404, 510/92, 306/657, 7 × 11 × 13 + 13 and 3 + 2√5 were deliberately avoided); familiar set-ups were re-imagined (three runners with lap counts, poles along three sides, a bangle shop, a "proof" that √4 is irrational to evaluate, all HCF-16/LCM-960 pairs).

- **MCQ key balance:** after the re-solve, the builder rotates each MCQ's options so the keys cycle a → b → c → d (authored drafts had most keys at (a) and almost none at (d)); option letters quoted in solutions, schemes and case model answers are remapped, and the key text is verified unchanged. Final keys per chapter: a 6, b 6, c 6, d 5.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- `table` cells use `$…$` maths per the current contract; renderers must support inline KaTeX in cells.
- The bus-departure plot uses `series` of kind `scatter` on three horizontal rows; a renderer without series support will show only the marked point.

## Changed by assessment-designer (2026-10-27)

Rewritten in `src/questions.mjs` (then rebuilt) because `originality --authored` flagged them as near-duplicates of other items in this chapter; each is now a different question (new numbers, context or skill) with its re-solve check: m10 (q_cbse10math_ch01_010: HCF with remainders, now a sharing context), s206 (_049: now sum and product of two irrationals), s302 (_054: now an LCM context with three lamps).

## Competency audit by assessment-designer (2026-10-27)

Board papers need recall/understanding written items (CBSE design: Standard 54/24/22, Basic 75/15/10 per cent of marks), and the bank had tagged almost every routine written answer as application or higher. Every short, long, numerical and case item was re-read against what it actually asks. A routine, textbook-standard procedure on given data (find the HCF by prime factorisation, solve a given pair, find a term, compute a mean, a sector area, a single right triangle) is now **understanding**; word problems that need modelling, multi-step or non-routine reasoning, error analysis and justification keep application / analysis / evaluation. 6 item tag(s) and 6 case-part tag(s) changed (case items whose parts are now mostly recall/understanding carry `understanding` at the top level). No question text, key, solution or marking scheme changed.

Added (appended, so earlier ids are unchanged; each has its re-solve check): `q_cbse10math_ch01_071` short-3, `q_cbse10math_ch01_072` short-3, `q_cbse10math_ch01_073` long, `q_cbse10math_ch01_074` long, `q_cbse10math_ch01_075` long.
