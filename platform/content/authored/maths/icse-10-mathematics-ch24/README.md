# ICSE Class 10 Mathematics — Chapter 24: Probability (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) in the ICSE 2027 Mathematics presentation, built with the
CBSE maths chapter approach (builders + independent re-solve). Author: `claude-opus-5-5 (subject-producer)`, provenance
`origin: "human"`, `model: null`. All items are `status: "draft"` until review.

## Scope (ICSE 2027 syllabus, Unit 7 Probability)
- **t01** Random experiments, outcomes, sample space and events (elementary, sure, impossible); listing the sample space of a coin tossed once, twice or three times (order noted), a die and a pack of cards.
- **t02** Classical definition of probability (favourable over total, equally likely outcomes); impossible and sure events; `0 ≤ P(E) ≤ 1`; complementary events `P(not E) = 1 − P(E)`.
- **t03** Simple problems on single events: coins, a die, a pack of 52 cards (including cards removed from the pack), bags of coloured balls (including an unknown number of balls and balls added), numbered tickets and letters of a word.
- **Removed for ICSE 2027** (compound events and probability of combined events): one student-facing note only (notes §8). Consequently no problem uses two dice, an "and"/"or" of two events, or successive draws; a coin tossed twice appears only as a sample-space listing and for the single event "exactly one head / at least one tail".

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Sample space, events and the classical definition" (t01–t02) 19 slides; Part 2 "Coins, dice, cards and bags of balls" (t03) 19 slides |
| Worked examples | 4 + 6 (coin sample space and an event; die divisors; complement on a bag; letters on slips; die and the complement; one card from the pack; cards removed; all colours of a bag summing to 1; unknown number of balls; primes on numbered cards) |
| Visuals | 31 of 38 slides (table 25, flow 4, plot 2); max 1 consecutive slide without a visual. Notes: 8 sections, each with a visual |
| Check slides | 3 + 4, all objective mcq (q001 q003 q005; q007 q010 q017 q011) |
| Notes | 8 sections with key terms and formulas; exam tips with mark split and 6 common mistakes |
| Flashcards | 30 (fact 10, definition 7, example 6, exam-tip 3, formula 2, concept 2) |
| Questions | 65 items, 169 marks: mcq 18, assertion-reason 6 (keys c d a b c a), true-false 5, fill-blank 5, numerical 9, short-2 4, short-3 5, short-4 6, long-10 7 (structured (a)(b)(c), 3 + 3 + 4, 6–9 step marks each) |
| Difficulty | d1 27, d2 23, d3 13, d4 2 |
| Competency | recall 6, understanding 26, application 28, analysis 5 — application or higher 51% of items, 76% of marks |
| Topics | t01 13, t02 26, t03 40 (items may carry two or three topics) |
| Tests | `t_icse10math_ch24_short` (20 marks / 45 min: A = q002 q004 q006 mcq, q019 AR, q048 q049 short-3; B = one of q059, q060) and `_long` (40 marks / 90 min: A = q008 q009 q012 q013 q015 q018 mcq, q020 q021 AR, q053 q054 q055 short-4; B = any two of q061 q062 q063), matching `icse-10-mathematics-chapter-test-short/long`; disjoint, and no deck-check item is used. Spare items: q014, q016, q022–q024, q064, q065 |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests), `src/questions.mjs` and `src/questions2.mjs` (bank + one re-solve
check per item), `src/space.mjs` (exact fractions and enumerated sample spaces), `src/lib.mjs` (shared ICSE builders, copied
unchanged). Run from `platform/`: `npx tsx content/authored/maths/icse-10-mathematics-ch24/src/build.mjs`; lint only this chapter with
`npx tsx content/authored/maths/icse-10-mathematics-ch24/src/lint.mts content/authored/maths/icse-10-mathematics-ch24`.
Rebuilding is deterministic (identical `release.json` / `tests.json` hashes on two runs).

- **Exact arithmetic (`space.mjs`):** every probability is a reduced integer fraction computed from counts over an enumerated sample space (a die, `coins(n)` strings, the 52 cards with rank/suit, bags as lists of colours, numbered tickets, letters of a word); decimal keys are only used where the fraction terminates (`dec()` throws otherwise). Complements are checked both as `1 − P(E)` and by counting the other outcomes; unknown ball counts are found by search over integers and substituted back; the removal/addition questions rebuild the changed sample space and recount.
- **Tables and figures:** the slide tables and the die and ball bar charts are generated from the same enumerations the checks use; each worked example asserts its numbers in the build.
- **Re-solve:** 137/137 checks pass (`src/resolve.log`). MCQ option values are typed independently so exactly one equals the re-solved target (distractors: the complementary probability, favourable over the other colour instead of the total, the number of colours or suits used as the total, forgetting that the total changes, forgetting 1 is a perfect square, reciprocal or numerator-difference slips).
- **KaTeX:** all maths strings parse in strict "error" mode; no Unicode maths symbols inside `$…$`. verify-local: 65 questions, 0 flags.
- **Narration:** numbers in words, no symbols or capital-letter abbreviations.
- **MCQ key balance:** options rotated after the re-solve.
- **Lint:** stage-4 `lintExemplar` on this chapter: 0 errors, 0 warnings. **Originality** (`content originality --authored`): 0 errors for this unit.

## Originality
All set-ups and data are new and imagined (tokens, beads, a purse of coins, seed packets, a spinner at a school carnival, a raffle drum and lucky coupons, a housing society, a club of 120 members, a mall car park, a school transport table, the letters of PROGRAMMING and EXAMINATION). CBSE 10 ch14 (Probability) and CBSE 12 ch13 set-ups, numbers and wording were avoided (no INDEPENDENCE, no 1-to-25 or 1-to-40 disc questions, no two-dice tables, no 4 red/6 white or 6 red/4 blue/10 yellow bags); CISCE documents were used for pattern only.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Two dice are deliberately not used (treated as combined events, removed for ICSE 2027); the lead may allow them if the owner reads the syllabus differently.
- Difficulty is concentrated at d1–d3 (two d4 items); no case-based items.
- Frequency-style data (the transport and car-park tables) are treated as a random choice from the listed pupils or cars, i.e. classical probability, not experimental probability.
- **2026-11-05:** assertion-reason options reordered to the ICSE 2027 Mathematics specimen paper (511) order and wording; every key re-mapped so each item's meaning is unchanged.
