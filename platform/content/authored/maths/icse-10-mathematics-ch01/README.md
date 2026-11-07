# ICSE Class 10 Mathematics — Chapter 1: Goods and Services Tax (GST) (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) in the ICSE 2027 presentation (compulsory Section A,
structured Section B questions in parts (a)(b)(c) worth 3 + 3 + 4, "show all working"). Built with the ICSE 10
Mathematics copy of the maths builder lib (`src/lib.mjs`, unchanged). Author: `claude-opus-5-5 (subject-producer)`,
provenance `origin: "human"`, `model: null`. All items are `status: "draft"` until review.

## Scope (catalog/cisce/icse-10/mathematics/syllabus.yaml)
- **t01** GST on goods and services: rates (always given in the problem), intra-state sales with equal CGST and SGST, inter-state sales with IGST, tax invoices with several items at different rates, services (catering, hall rent, software).
- **t02** Price paid by the consumer: list (marked) price, discount, GST on the reduced price; comparing offers; why "x% off then x% tax" is not the list price.
- **t03** GST with profit and loss: input tax, output tax, input tax credit, net GST = output − input, CGST/SGST payable at each stage, supply chains (manufacturer → wholesaler → retailer → consumer), total tax = tax on the final sale, an inter-state link (IGST payable after setting off input CGST + SGST), a sale at a loss (credit, nothing payable), profit percent on prices before tax.
- **t04** Inverse problems: price before GST, rate of GST, list price, rate of discount, and prices recovered from each dealer's payment.
- The chapter has no removed topics.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "CGST, SGST, IGST and the bill" (t01–t02) 20 slides; Part 2 "Input tax credit, the supply chain and reverse problems" (t03–t04) 20 slides |
| Worked examples | 5 + 6 (Nagpur study table; Coimbatore pump to Palakkad vs Tiruppur; Bhubaneswar invoice at 12/18/5%; Lucknow refrigerator with 15% off; jacket to Srinagar from Srinagar vs Ludhiana; Gujarat mixer-grinder chain; Kolkata harmonium with mark-up and discount; Ludhiana to Jaipur inter-state link; price inside ₹11,092; rate from list, discount and amount; list price from ₹4,956) |
| Visuals | 28 of 40 slides (16 tables, 8 flows, 4 plots: two bar charts and two line graphs); never more than 1 slide in a row without a visual; every notes section has a visual (14 in notes and question assets) |
| Check slides | 4 + 4, all objective (m02, tf1, fb1, n01; m10, tf3, fb5, n05); none is used in a chapter test |
| Notes | 7 sections with key terms, formulas and a visual each; exam tips with a mark split and 8 common mistakes |
| Flashcards | 32 (formula 7, definition 5, example 5, concept 5, fact 4, exam-tip 4, diagram 2) |
| Questions | 66 items, 162 marks: mcq 18 (keys a5 b5 c4 d4 after rotation), assertion-reason 7 (keys c b a c d a b), true-false 5, fill-blank 5, numerical 8, short-2 5, short-3 5, short-4 6, long-10 7 (each (a)(b)(c) = 3 + 3 + 4, 5–8 step marks) |
| Difficulty | d1 11, d2 27, d3 25, d4 3 |
| Competency | recall 5, understanding 23, application 29, analysis 9 — application or higher 58% of items, 81% of marks (lint band 45–65%) |
| Topics | t01 20, t02 15, t03 24, t04 17 (an item can carry two topics) |
| Tests | `t_icse10math_ch01_short` (20 marks / 45 min: A = m03, m07, m14, ar2, s301, s303; B = one of l01, l02) and `_long` (40 marks / 90 min: A = m04, m06, m11, m12, m15, m17, ar3, ar6, s401, s402, s405; B = any two of l03, l04, l05); blueprint shapes asserted by `chapterTests`; disjoint |

## Verifier record
Run from `platform/`: `npx tsx content/authored/maths/icse-10-mathematics-ch01/src/build.mjs`; chapter lint:
`npx tsx content/authored/maths/icse-10-mathematics-ch01/src/lint.mts content/authored/maths/icse-10-mathematics-ch01`.

- **Exact money arithmetic (`src/fin.mjs`):** every amount is an integer number of paise; a percentage that does not give whole paise throws, and each percentage is cross-checked against a floating formula. `sale` asserts CGST = SGST = half the GST (and CGST = (r/2)% of the price); `chain` asserts, for every intra-state stage, CGST payable = SGST payable, computes IGST payable on inter-state links after setting off all input tax, and asserts that the payments along the chain add up to the GST on the final sale; `baseFrom`, `rateFrom`, `listFrom`, `discFrom`, `priceFromTax` each re-apply the forward calculation and throw if it does not reproduce the given amount. A self-test runs on import.
- **Text from numbers:** every amount in stems, options, solutions, model answers, slides, tables, charts and notes is printed from those paise values (`R`, `nm`), so no figure is typed by hand twice.
- **Re-solve:** 103/103 checks pass (`src/resolve.log`). Each key is recomputed from the literal givens (MCQ options through `which` with the distractors built from the named wrong methods: taxing the list price, one rate for all items, adding output taxes, taking r% off the amount, adding instead of dividing); numerical values with an independent floating formula; every short/long model answer is checked to contain the independently computed figures; AR/TF items assert the facts they rely on (e.g. the negative net GST at a loss, 82% of the amount ≠ the base).
- **Build:** NO ERRORS; rebuilding gives byte-identical `release.json`, `tests.json` and `resolve.log`.
- **Lint:** stage-4 lint on this chapter: 0 errors, 0 warnings (including `math.arithmetic` on every `=` chain).
- **Verify (deterministic, cisce 10 mathematics):** 66/66 pass, 0 flags. **Originality --authored:** this unit 0 errors, 0 warnings against the whole bank.
- **KaTeX / backslashes:** all maths parses in strict mode; a scan of every `$…$` span found no bare `text`, `times`, `frac` and similar command words, no tab characters and no ₹ inside maths; narrations contain no digits, symbols or ALL-CAPS abbreviations (they say "central tax", "integrated tax", "input tax credit").

## Originality
All set-ups are original and imagined (shops, dealers and firms are unnamed or generic; places are real Indian cities used only as locations). Contexts include a Shillong cane chair, Guwahati tea to Siliguri, a Mysuru kitchenware bill, Odisha solar lanterns, a Jammu sewing machine, a Chennai caterer's bill, a Howrah–Kolkata–Ranchi lathe chain, Jodhpur brass lamps, a Patna cycle dealer and a Bhubaneswar furniture showroom. Textbook (Selina, ML Aggarwal) examples, exercises and wording, and CISCE specimen questions, were not used; CISCE material set the pattern only. There is no CBSE 10 overlap (CBSE has no GST chapter).

## Facts a reviewer should double-check
- GST in force from 1 July 2017; rates fixed and revised by the GST Council. The chapter never assigns a real rate to a real item: every problem states its rate, and the notes say rates are revised from time to time. It practises with 5%, 12%, 18% and 28% (the classic ICSE problem rates) even though the real slab structure has since been rationalised; confirm this framing suits the ICSE 2027 paper.
- IGST collected by the Centre and shared with the destination state; GSTIN is 15 characters; HSN codes classify goods; UTGST replaces SGST in a union territory without a legislature (one sentence in notes section 2).
- Input tax credit: input CGST and SGST may be set off against output IGST (s403, l03(b), deck 2 WE3); in l03(c) an IGST credit is set off against CGST + SGST and only the **total** net amount is asked, so the statutory order of utilisation is not needed.

## Known gaps
- Narration audio not generated (TTS stage).
- Bar charts are `plot` series with one bar per series (the legend names the bars; the x axis is only a step index).
- Table cells use plain text with ₹ and inline KaTeX in a few rule tables.
- **2026-11-05:** assertion-reason options reordered to the ICSE 2027 Mathematics specimen paper (511) order and wording; every key re-mapped so each item's meaning is unchanged.
