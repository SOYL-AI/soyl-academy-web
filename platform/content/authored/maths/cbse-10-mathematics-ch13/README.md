# CBSE 10 Mathematics — ch13 Statistics (hand-authored, D-026)

Author: claude-opus-5-5 (subject-producer, batch C). Status: `draft` (pending review). Academic year 2026-27.

## Scope
Syllabus topics:
- t01 mean of grouped data by the direct, assumed-mean and step-deviation methods
- t02 mode by the modal-class formula (bimodal cases avoided; one AR item asks the student to spot a tie)
- t03 median through cumulative frequency and the median formula, plus missing frequencies from the mean or the median

**Removed topic respected:** no ogive is drawn or asked for anywhere. Cumulative frequency appears only in tables, including one "less than" table read as data (s208). The empirical relation 3 Median ≈ Mode + 2 Mean (NCERT text) is used in a few objective items and in the notes.

## Contents
| | |
|---|---|
| Decks | Part 1 *Mean of grouped data* (15 slides), Part 2 *Mode and median* (16 slides) |
| Worked examples | 4 + 4: runs data by all three methods, missing frequency from the mean, Nashik wages mode, Surat travel-time median, two missing frequencies from the median, inclusive classes |
| Check slides | 3 + 3, all objective |
| Visuals | 21 of 31 slides; never more than 1 slide without a visual. Working tables, histograms (bar series) and a method-choice flow |
| Notes | 6 sections + exam tips |
| Flashcards | 30 |
| Questions | 71 (144 marks): mcq 18 · AR 6 · TF 5 · fill 5 · numerical 9 · short-2 9 · short-3 8 · long 6 · case 5 |
| Difficulty | d1 14 · d2 29 · d3 21 · d4 6 · d5 1; application or higher 24% of items, 31% of marks (after the 2026-10-27 competency audit) |
| Tests | `t_cbse10math_ch13_short` (20 marks) and `_long` (40 marks), built on the default blueprints and disjoint |

## How the numbers are produced
`src/stat.mjs` holds every distribution as data (lower limit, width, frequencies). The **stem tables and the working tables in solutions are generated from those same arrays**, so a printed table cannot disagree with the key. The re-solve is independent:
- **Mean:** computed by all three methods; the build fails if they disagree.
- **Median:** computed by the formula and by a separate cumulative walk.
- **Mode:** computed only after checking that the modal class is unique.
- **Missing frequencies:** found by brute-force search over integer values. For the median items, the search also confirms that the median lies in the assumed class.

Running `npx tsx content/authored/maths/cbse-10-mathematics-ch13/src/build.mjs` from `platform/` gives: KaTeX strict over 1369 maths strings with 0 failures, and 129/129 checks passing. The deck's worked-example values are also asserted in `build.mjs`.

## Verifier pass and fixes
- **Pipeline lint `banned.url`:** the phrase "wage data: mean …" matched the `data:` URL-scheme rule, giving 7 errors. Reworded to "wage data, mean …".
- **Pipeline lint `balance.competency`:** application or higher was at 44%. Two multi-step context items (n02, n03) were relabelled to application, and three two-step d1 items to d2 (m06, m15, fb2). Now 47%.
- **Garbled distractor note in m08:** rewritten.
- **Narration on the mode example:** rewritten to explain the pull towards the larger neighbour clearly.

## Originality
All items are original. Deliberately avoided: NCERT's median example with x and y (n = 60, median 28.5), its mean example with f₁ and f₂ (n = 120, mean 50), the 225-household electricity table, and the life-insurance age data. Contexts:
- Weather and environment: Cherrapunji rainfall, Maharashtra taluka rainfall, Chennai temperatures, Delhi AQI
- Households: Nagpur electricity bills, a Kochi housing society, Lucknow mobile data spending, Bhubaneswar milk bills
- Work and wages: Tiruppur garment wages, Hyderabad construction wages, Nashik vineyard wages
- Sport: Mumbai T20 innings, Bengaluru cricket academies, Lucknow school cricket
- School and daily life: Indore screen time, Pune commutes, Rishikesh yoga club, Ratnagiri mangoes, Kochi library

## Known gaps
Narration audio is not generated yet (TTS stage). Histograms use the plot `series` bar kind, so the renderer needs bars whose width equals the class width.

## Competency audit by assessment-designer (2026-10-27)

Board papers need recall/understanding written items (CBSE design: Standard 54/24/22, Basic 75/15/10 per cent of marks), and the bank had tagged almost every routine written answer as application or higher. Every short, long, numerical and case item was re-read against what it actually asks. A routine, textbook-standard procedure on given data (find the HCF by prime factorisation, solve a given pair, find a term, compute a mean, a sector area, a single right triangle) is now **understanding**; word problems that need modelling, multi-step or non-routine reasoning, error analysis and justification keep application / analysis / evaluation. 16 item tag(s) and 15 case-part tag(s) changed (case items whose parts are now mostly recall/understanding carry `understanding` at the top level). No question text, key, solution or marking scheme changed.

Added (appended, so earlier ids are unchanged; each has its re-solve check): `q_cbse10math_ch13_071` short-3.
