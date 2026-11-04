# CBSE Class 11 Mathematics — Chapter 1: Sets (authored, v1)

Hand-authored chapter (DECISIONS D-025, D-026, D-050). Author: `claude-sonnet-5-5 (subject-producer chapter writer)`, provenance `origin: "human"`, `model: null`. All items are `status: "draft"` until review.

## Scope (2026-27 syllabus, Mathematics 041, Unit I Sets and Functions)
- **t01** Sets and their representations (roster, set-builder); empty, singleton, finite, infinite and equal sets.
- **t02** Subsets, proper subsets, power set ($2^n$), universal set, intervals as subsets of $\mathbb{R}$ (open, closed, half-open, unbounded; number lines).
- **t03** Venn diagrams; union, intersection, difference, complement; commutative, associative, distributive, identity, complement and De Morgan laws; operations on intervals.
- **t04** Practical problems with $n(A \cup B)$ and three-set counting. Marked `board_assessed: false`: taught and practised (one worked example per formula, five items, one deck slide flagged "formative only") but kept light.
- **Removed topics:** Mathematical Induction (formative only) and Mathematical Reasoning (deleted) appear only as one exam-tip line, one notes line and one flashcard.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Sets, subsets and intervals" (t01–t02) 21 slides; Part 2 "Operations, laws and counting" (t03–t04) 21 slides |
| Worked examples | 3 + 4 (rule to roster; subsets with forced elements; integers in intervals; six operations; verify De Morgan; interval operations; two-set word problem) |
| Visuals | 31 of 42 slides (tables 16, geometry/Venn 10, flow 3, svg number lines 2); max 1 slide without a visual. Notes: 7 sections, each with a visual, plus 12 more |
| Check slides | 4 + 4, all objective (q001 q027 q033 q009; q014 q015 q019 q013), none used in a test |
| Notes | 7 sections with key terms and formulas; exam tips with mark split and 8 common mistakes |
| Flashcards | 30 (definition 14, fact 5, formula 6, concept 1, example 1, exam-tip 3) |
| Questions | 72 items, 140 marks: mcq 20, assertion-reason 6 (keys a c d b a c), true-false 6, fill-blank 5, numerical 6, short-2 9, short-3 8, long-5 7, case-based 5 (each 1 + 1 + 2 with an either/or part (c)) |
| Difficulty | d1 11, d2 31, d3 23, d4 7 |
| Competency | recall 5, understanding 25, application 34, analysis 8 — application or higher 58% of items (lint band 45–65%) |
| Tests | `t_cbse11math_ch01_short` (20 marks / 40 min; A 3 mcq + 1 AR, B 2 short-2 + 1 short-3, C [long, long], D 1 case) and `_long` (40 marks / 90 min; A 8 mcq + 2 AR, B 2 short-2 + [short-2, short-2] + 1 short-3 + [short-3, short-3], C long + [long, long], D 2 cases), on `cbse-11-default-chapter-test-short/-long`; disjoint, no deck-check item |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests), `src/questions.mjs` and `src/questions2.mjs` (bank, one re-solve check per item), `src/sets.mjs` (set algebra on JS Sets, interval sampling, Venn builder), `src/nl.mjs` (number lines as allow-listed svg), shared builders `src/lib.mjs`. From `platform/`:
`npx tsx content/authored/maths/cbse-11-mathematics-ch01/src/build.mjs`; lint with `npx tsx content/authored/maths/cbse-11-mathematics-ch01/src/lint.mts content/authored/maths/cbse-11-mathematics-ch01`. Rebuilding is deterministic (identical `release.json` / `tests.json` md5 on repeated runs).

- **Re-solve:** 150/150 checks pass (`src/resolve.log`). Every roster, count and key is recomputed from the givens with JS Sets: set-builder rules filtered over integer or natural universes, subsets and power sets enumerated, word problems rebuilt as explicit sets with the stated counts (`fromRegions`) and then counted; MCQ options are tested independently so exactly one equals the re-solved target.
- **Intervals:** checked by sampling a 1/16 grid over $[-24, 24]$ (every end point used in the chapter is a multiple of $1/2$), comparing the set-builder predicate with the claimed interval list, and testing each end point for membership. Number lines are drawn from the same interval objects; alt text is generated from them.
- **Laws:** the nine laws in the slide table (commutative, associative, both distributive, both De Morgan, identity, complement) are verified on all $16^3 = 4096$ triples of subsets of $\{1, 2, 3, 4\}$; the identity $A - (B \cup C) = (A - B) \cap (A - C)$ (l02) is also checked on all 4096 triples; m15 and m16 test each option against all pairs/triples.
- **Venn diagrams:** `geometry` circles; each region label is placed at the point of its region farthest from any circle boundary and the build asserts that the label point lies in exactly its own region, that region contents add up to $n(U)$, and that every counted region equals the stated number (for example 45 + 25 + 30 + 20 = 120 and the eight regions of the three-set diagram 3, 5, 4, 6, 10, 9, 8, 5 = 50).
- **KaTeX:** all math strings parse in strict "error" mode; no Unicode maths symbols inside `$…$`.
- **Narration:** 42 slides, max 70 words, mean 50; no symbols, digits mixed with letters or capital-letter abbreviations.
- **MCQ key balance:** options rotated after the re-solve; keys a 7, b 6, c 6, d 6 including case parts.
- **Gates run:** chapter lint 0 errors, 0 warnings; `verify-local` 72 questions, 0 flags; `originality --authored` unit 0 errors, 0 warnings.

## Originality
All contexts, sets and numbers are new (an imagined pizza stall in Dharnipur, a reading room in Anand Nagar, a vaccine van, a phone-plan app, a town-hall seating plan, a residents' society, cadet squads, quiz-fest rounds). No NCERT text, example or exercise, and no sample-paper or past-paper question was used; Class 12 Relations and Functions stems were read and none of their set-ups or wording is reused.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Venn diagram points are drawn as dots by the renderer; region labels sit beside their dot.
- Set names (A, B, C) in Venn diagrams are separate labelled points outside the circles, because the geometry circle has no label placement control.
