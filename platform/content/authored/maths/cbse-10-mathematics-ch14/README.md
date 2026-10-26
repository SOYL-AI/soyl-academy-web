# CBSE 10 Mathematics — ch14 Probability (hand-authored, D-026)

Author: claude-opus-5-5 (subject-producer, batch C). Status: `draft` (pending review). Academic year 2026-27.

## Scope
This chapter has no removed topics. It covers the two syllabus topics:
- **t01, the classical definition of probability:** equally likely outcomes, 0 ≤ P(E) ≤ 1, impossible and sure events, P(E) + P(not E) = 1.
- **t02, simple problems:** coins (one, two and three), dice (one and two), a 52-card deck, numbered discs and tickets, and bags of balls.

Experimental probability is not used anywhere.

## Contents
| | |
|---|---|
| Decks | Part 1 *The classical definition* (16 slides), Part 2 *Coins, dice, cards and discs* (17 slides) |
| Worked examples | 3 + 6: a die, complements (Ludo, discs), a bag of balls; coins, sums and products of two dice, single cards, cards removed, numbered discs |
| Check slides | 3 + 3, all objective |
| Visuals | 23 of 33 slides; never more than 1 slide without a visual. Probability-scale and spinner SVGs, a bag SVG, a three-coin tree (flow), the 6 × 6 table of sums, a deck table and sample-space tables |
| Notes | 6 sections + exam tips |
| Flashcards | 30 |
| Questions | 70 (140 marks): mcq 18 · AR 6 · TF 5 · fill 5 · numerical 9 · short-2 9 · short-3 7 · long 6 · case 5 |
| Difficulty | d1 13 · d2 31 · d3 21 · d4 4 · d5 1; application or higher 49% of items, 69% of marks |
| Tests | `t_cbse10math_ch14_short` (20 marks) and `_long` (40 marks), on the default blueprints, with no question shared between them |

## Verifier pass
`src/space.mjs` enumerates every sample space outcome by outcome:
- coins by recursion (2ⁿ outcomes)
- the 36 ordered pairs of two dice
- the 52 cards with rank, suit, colour and a face-card flag
- numbered discs and tickets as ranges
- bags as lists of balls

Every key is **re-solved by counting favourable outcomes** in these spaces. Every fraction quoted in a solution or model answer is checked in reduced form. Unknowns (blue balls, x in two bags, red balls to add) are found by brute-force search. The 25 probabilities quoted in the decks' worked examples are asserted in `build.mjs` before anything is written.

From `platform/`, `npx tsx content/authored/maths/cbse-10-mathematics-ch14/src/build.mjs` gives:
- KaTeX strict over 1160 maths strings: 0 failures
- re-solve: 115/115 checks

Fixes made during the pass:
- **Fraction format (checker only):** the check strings did not match the text's shorthand for single-digit fractions (`\dfrac18`), so 24 checks failed. The formatter now follows the text's convention, and all 24 pass. The content was right.
- **l06 part (d):** a half-finished alternative was rewritten into one clean rule.
- **Difficulty balance:** d1 was 30% of items. Eight items that need a count or a complement step were relabelled to d2.
- **Figure QA:** the labels on the probability scale overlapped, so the scale was widened and its labels alternate above and below the line.

## Originality
All items are original. Deliberately avoided NCERT set-ups:
- the 100 shirts with defects
- the box with x black balls among 12 and 6 more added
- the 90 discs
- the cards numbered 2 to 101
- the "PROBABILITY" and "MISSISSIPPI" letter questions
- the defective pens

Contexts: Ludo in Guwahati, a magic show in Jabalpur, a Diwali lucky dip in Ahmedabad, a quiz in Shillong, a board game designed in Ranchi, a fete in Kolkata, a spinner at a fair in Mysuru, a Varanasi mela coupon draw, and Bengaluru rain.

## Known gaps
- Narration audio is not generated yet (TTS stage).
- The SVG figures use the named palette colours (`var(--diagram-blue)` and others), which the renderer must map. The bag figure also states the counts in text, so it does not rely on colour.
