# CBSE Class 10 Mathematics — Chapter 4: Quadratic Equations (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) written to the maths exemplar standard
(`content-templates/exemplars/maths/cbse-10-mathematics-ch06`). Author: `claude-opus-5-5 (subject-producer)`,
provenance `origin: "human"`, `model: null`. All items are `status: "draft"` until review.

## Scope (2026-27 syllabus, Standard 041 and Basic 241)
- **t01** Standard form: deciding whether an equation is quadratic only after simplifying (cancelling squares and cubes), roots, testing a root, finding a coefficient from a root.
- **t02** Factorisation: splitting the middle term, the zero-product rule, equations that need clearing of fractions, the "never divide by $x$" and "product must be zero" traps.
- **t03** Quadratic formula: stated and applied (with irrational roots), checked against $-b/a$ and $c/a$.
- **t04** Discriminant: nature of roots, equal roots ($\pm k$ answers, rejecting $k$ that makes $a = 0$), real-root conditions as inequalities, $a$ and $c$ of opposite signs, a general proof that $D \ge 0$.
- **t05** Situational problems: area, consecutive numbers, round-trip and one-way speed, right triangles, ages, work rates, cost and profit, fencing with a wall/canal, "is it possible?" via $D < 0$, projectile paths.
- **Removed topic absent:** solution by completing the square. The formula is **stated, never derived** (the derivation uses completing the square); the decks and notes say so.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Standard form, factorisation and the formula" (t01–t03) 17 slides; Part 2 "Nature of roots and word problems" (t04–t05) 16 slides |
| Worked examples | 5 + 5 (standard form check; 6x² − x − 2; clearing a fraction; irrational roots of 2x² − 4x − 3; formula vs factorisation; nature of three equations; equal roots with ±k; Bengaluru garden; consecutive even numbers; Pune–Nashik round trip) |
| Visuals | 23 of 33 slides, max 1 slide without a visual. Deck: plot 7, table 13, flow 2, geometry 1. Notes/questions: plot 6, table 3, flow 1, geometry 1 |
| Check slides | 3 + 3, all objective (q001, q006, q007; q011, q034, q016) |
| Notes | 6 sections (one per topic, t01 twice), each with key terms and a visual; exam tips with mark split and 8 common mistakes |
| Flashcards | 30 (definition 2, fact 5, concept 7, formula 3, example 5, exam-tip 6, diagram 2) |
| Questions | 70 items, 140 marks: mcq 18, assertion-reason 6 (keys a b c d a d), true-false 5, fill-blank 5, numerical 9, short-2 9, short-3 7, long-5 6, case-based 5 (1 + 1 + 2, part (c) either/or via `alternatives`, `passage_origin: soyl-original`; two carry plot assets) |
| Difficulty | d1 12, d2 27, d3 19, d4 11, d5 1 |
| Competency | recall 7, understanding 24, application 27, analysis 8, evaluation 4 — application or higher 56% of items, 73% of marks |
| Topics | t01 13, t02 15, t03 7, t04 27, t05 21 (items may carry two topics) |
| Tests | `t_cbse10math_ch04_short` (20 marks / 40 min) and `_long` (40 marks / 90 min), matching `cbse-10-default-chapter-test-short/long`; disjoint |

## Verifier record
Sources in `src/` (`build.mjs`, `questions.mjs`; shared builders/validator in `../cbse-10-mathematics-ch01/src/lib.mjs`).
Run from `platform/`: `npx tsx content/authored/maths/cbse-10-mathematics-ch04/src/build.mjs`.

- **Numeric re-solve:** 144/144 checks pass. Roots are recomputed by the formula in floating point (and compared option-by-option, including irrational ones such as $2 \pm \sqrt3$ and $\frac{3 \pm \sqrt3}{2}$); discriminants and "nature" keys come from an independent classifier; every $k$ is found by search; every word problem's admissible root is substituted back into the **story** (e.g. $240/(x - 20) - 240/x = 1$, $36/(x + 3) + 36/x = 7$, $(s + 3)(s + 29) = 360$); the identity $D = (a - b)^2 + 4k^2$ in l04 is checked on four random triples; "is it quadratic?" simplifications are verified by evaluating both sides at several points.
- **Plots:** 24 marked points lie on their curves and match their labels; 24 roots located numerically (including irrational roots $\frac{2 \pm \sqrt{10}}{2}$ and touching roots $\pm1.5$) are all marked; the two case assets (ball path, diver) were re-read numerically (landing at $40$ m, entry at $2$ s, maxima $20$ m and $11.25$ m).
- **KaTeX:** 1291 math strings parse in strict "error" mode; no lost backslashes or control characters.
- **Narration:** 33 slides, max 66 words, mean 51; no symbols or abbreviations.
- **Fixes during the pass:** (1) the pipeline arithmetic lint rejected two deliberately false statements written as equations ("$4 = 0$" in q001's solution and "$2 = 0$" in q054's model answer) — reworded as "only the false claim '4 equals 0' is left" and "only the constant $2$ is left"; (2) q001's solution listed its four cases on single lines, which Markdown would merge — split into paragraphs (and the builder now does this for every "(a) … (b) …" stem and answer in all four chapters).
- **Originality:** avoided NCERT's plot of $528$ m² ("one more than twice the breadth"), the $13$ cm hypotenuse with "7 cm less", the cottage-industry toys ($55 - x$, ₹$750$), the 360 km train, the late aeroplane, the 80 m / 400 m² park and the "sum 15, reciprocals 3/10" numbers. Contexts: Indore–Bhopal van, Shimla cyclist, Kolkata bookseller, Lucknow printers, Kochi hall, Ranchi herb garden against a 25 m wall, Ludhiana calf enclosure on a canal, Khurja potter, Ahmedabad cricket ball, Thiruvananthapuram diver, Diwali rangoli.

- **MCQ key balance:** after the re-solve, the builder rotates each MCQ's options so the keys cycle a → b → c → d (authored drafts had most keys at (a) and almost none at (d)); option letters quoted in solutions, schemes and case model answers are remapped, and the key text is verified unchanged. Final keys per chapter: a 6, b 6, c 6, d 5.

## Gaps / follow-ups
- t03 has 7 tagged items (fewer than other topics) because many formula items are tagged under t04/t05 where the formula is used; every deck formula example is mirrored by bank items.
- Narration audio not generated (TTS stage). `word_limit` not set on maths short/long items (marked by steps).
