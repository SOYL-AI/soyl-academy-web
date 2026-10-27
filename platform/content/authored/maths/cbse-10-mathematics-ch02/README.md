# CBSE Class 10 Mathematics — Chapter 2: Polynomials (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) written to the maths exemplar standard
(`content-templates/exemplars/maths/cbse-10-mathematics-ch06`). Author: `claude-opus-5-5 (subject-producer)`,
provenance `origin: "human"`, `model: null`. All items are `status: "draft"` until review.

## Scope (2026-27 syllabus, Standard 041 and Basic 241)
- **t01** Geometrical meaning of zeroes: degree, values, zeroes; graphs of linear, quadratic (up/down; two/one/no zeroes) and cubic polynomials; degree bound on the number of zeroes; zeroes in context (rejecting a negative time).
- **t02** Zeroes and coefficients of a **quadratic**: splitting the middle term, sum $-b/a$ and product $c/a$ (with the coefficient-comparison reason), forming $k(x^2 - Sx + P)$, unknown coefficients from conditions, symmetric expressions ($\alpha^2 + \beta^2$, $1/\alpha + 1/\beta$, $(\alpha - \beta)^2$, $\alpha^3 + \beta^3$).
- **Removed topics absent:** the zeroes–coefficients relation for cubics and the division algorithm appear nowhere. Cubic and quartic **graphs** are used only to read zeroes (t01, geometric meaning), which the syllabus keeps.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Zeroes and their graphs" (t01) 17 slides; Part 2 "Zeroes and coefficients of a quadratic" (t02) 17 slides |
| Worked examples | 2 + 4 (zeroes of a quartic from its graph; Pune rooftop ball; 10x² − 3x − 1 with verification; from sum and product; irrational zeroes 3 ± √2; garden perimeter/area/diagonal without the sides) |
| Visuals | 24 of 34 slides, max 1 slide without a visual. Deck: plot 12, table 10, geometry 1, flow 1. Notes/questions: plot 14, table 3, geometry 1 |
| Check slides | 3 + 3, all objective (q002, q003, q026; q009, q034, q021) |
| Notes | 8 sections, each with key terms, formulas and a visual; exam tips with mark split and 8 common mistakes |
| Flashcards | 30 (definition 2, fact 4, formula 7, concept 7, example 4, exam-tip 5, diagram 1) |
| Questions | 70 items, 140 marks: mcq 18 (8 items across the bank carry graph assets), assertion-reason 6 (keys a c d b a c), true-false 5, fill-blank 5, numerical 9, short-2 9, short-3 7, long-5 6, case-based 5 (each 1 + 1 + 2, part (c) either/or via `alternatives`, `passage_origin: soyl-original`) |
| Difficulty | d1 12, d2 29, d3 23, d4 4, d5 2 |
| Competency | recall 7, understanding 27, application 25, analysis 8, evaluation 3 — application or higher 51% of items, 70% of marks |
| Tests | `t_cbse10math_ch02_short` (20 marks / 40 min) and `_long` (40 marks / 90 min), matching `cbse-10-default-chapter-test-short/long`; disjoint |

## Verifier record
Sources in `src/` (`build.mjs`, `questions.mjs`; shared builders/validator in `../cbse-10-mathematics-ch01/src/lib.mjs`).
Run from `platform/`: `npx tsx content/authored/maths/cbse-10-mathematics-ch02/src/build.mjs`.

- **Numeric re-solve:** 137/137 checks pass. Zeroes are recomputed with the quadratic formula or a numeric root finder on the plotted expression (not from the text); every option set for "which polynomial" items is compared coefficient-by-coefficient with `a·∏(x − r)` rebuilt from the re-solved zeroes; symmetric expressions are evaluated from the numeric zeroes; numbers inside model answers are checked.
- **Plots:** 53 marked points all lie on their curves and match their labels; 59 zeroes were located numerically (sign changes and touching zeroes) and every one is marked whenever a plot marks any zero; graph-reading question assets (unmarked) were re-read numerically (e.g. $x^3 - x^2 - 2x$ → $-1, 0, 2$; $-(x - 1)^2$ → $1$; $x^3 - 3x^2 - x + 3$ → $-1, 1, 3$). Every `expr` parses with the pipeline's pinned grammar.
- **KaTeX:** 1469 math strings parse in strict "error" mode; no lost backslashes, no LaTeX outside `$…$`.
- **Narration:** 34 slides, max 68 words, mean 53; no symbols or letter abbreviations ("alpha", "beta", "minus b over a").
- **Fixes during the pass:** (1) an early numerical item asked for $k$ with sum = product for $kx^2 + 2x + 3k$, whose zeroes are not real for that $k$ — replaced by $x^2 - (k + 2)x + 2k$ (real double zero $2$); (2) the validator caught `\Rightarrow` written without its backslash in that replacement (the exemplar's pitfall 7) — fixed; the pipeline lint does not catch brace-less commands such as `Rightarrow`, so the author validator is still needed; (3) case model answers reworded from "(a) (b) …" to "(a) Option (b): …"; (4) three routine items relabelled d1 → d2 (q003, q006, q046).
- **Originality:** none of NCERT's exercise polynomials (x² − 2x − 8, 4s² − 4s + 1, 6x² − 3 − 7x, 4u² + 8u, t² − 15, 3x² − x − 4) or sum/product pairs are reused; contexts are new (Brindavan fountain jets, Khurja diya break-even, Thiruvananthapuram garden, a homework table to audit, a polynomial-forming error to evaluate).

- **MCQ key balance:** after the re-solve, the builder rotates each MCQ's options so the keys cycle a → b → c → d (authored drafts had most keys at (a) and almost none at (d)); option letters quoted in solutions, schemes and case model answers are remapped, and the key text is verified unchanged. Final keys per chapter: a 6, b 6, c 6, d 5.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Plot labels for irrational zeroes use KaTeX (`$3 + \sqrt2$`); the renderer must support maths in plot labels.
- `word_limit` (contract v2, optional) is not set on maths short/long items: maths answers are marked by steps, not words.

## Changed by assessment-designer (2026-10-27)

Rewritten in `src/questions.mjs` (then rebuilt) because `originality --authored` flagged them as near-duplicates of other items in this chapter; each is now a different question (new numbers, context or skill) with its re-solve check: m16 (_016), m17 (_017: polynomial from sum and product), n03 (_037: find k from the difference of zeroes), n06 (_040: find k from a given zero), s204 (_047: graph crossing points), s301 (_053: area/breadth context), s303 (_055: new numbers).
