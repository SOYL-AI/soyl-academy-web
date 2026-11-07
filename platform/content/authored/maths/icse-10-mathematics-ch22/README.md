# ICSE Class 10 Mathematics — Chapter 22: Measures of Central Tendency (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) in the ICSE 2027 Mathematics presentation, built with the
CBSE maths chapter approach (builders + independent re-solve). Author: `claude-opus-5-5 (subject-producer)`, provenance
`origin: "human"`, `model: null`. All items are `status: "draft"` until review.

## Scope (ICSE 2027 syllabus, Unit 6 Statistics)
- **t01** Mean, median and mode of raw and arrayed data, and of a frequency distribution of single values (cumulative frequency for the median).
- **t02** Mean of grouped data by the direct method: class marks of continuous (20–30) and discontinuous (20–29) classes.
- **t03** Short-cut (assumed-mean) and step-deviation methods; a missing frequency from a given mean (one or two unknowns); changed data and combined means by totals.
- **t04** Median class (first cumulative frequency reaching n/2) and modal class (highest frequency) of grouped data.
- **Removed for ICSE 2027** (calculating the median or mode of grouped data by formula): one student-facing note only (notes §8). Quartiles are in ch23 (ogive) and are not taught here.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Ungrouped data and the direct method" (t01–t02) 19 slides; Part 2 "Short-cut methods, missing frequencies and classes" (t03–t04) 20 slides |
| Worked examples | 5 + 5 (raw data with an odd n; raw data with an even n; a frequency table of single values; direct method on continuous and on discontinuous classes; assumed mean; step deviation; a missing frequency; a replaced value; median class and modal class) |
| Visuals | 29 of 39 slides (table 21, flow 6, plot 2); max 1 consecutive slide without a visual. Notes: 8 sections, each with a visual, 26 visuals in all |
| Check slides | 4 + 4, all objective (q001 mcq, q003 mcq, q005 mcq, q032 fill-blank; q010 mcq, q011 mcq, q017 mcq, q007 mcq) |
| Notes | 8 sections with key terms and formulas; exam tips with mark split and 6 common mistakes |
| Flashcards | 30 (formula 7, example 7, concept 6, definition 4, exam-tip 3, fact 3) |
| Questions | 65 items, 173 marks: mcq 18, assertion-reason 6 (keys c d a b c a), true-false 5, fill-blank 5, numerical 9, short-2 4, short-3 5, short-4 6, long-10 7 (structured (a)(b)(c), 3 + 3 + 4, 6–7 step marks each) |
| Difficulty | d1 18, d2 25, d3 19, d4 3 |
| Competency | recall 10, understanding 20, application 31, analysis 4 — application or higher 54% of items, 77% of marks |
| Topics | t01 33, t02 14, t03 16, t04 7 (items may carry two topics) |
| Tests | `t_icse10math_ch22_short` (20 marks / 45 min: A = q002 q004 q006 mcq, q019 AR, q048 q049 short-3; B = one of q059, q060) and `_long` (40 marks / 90 min: A = q008 q009 q012 q013 q015 q018 mcq, q020 q021 AR, q053 q054 q055 short-4; B = any two of q061 q062 q063), matching `icse-10-mathematics-chapter-test-short/long`; disjoint, and no deck-check item is used |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests), `src/questions.mjs` (bank + one re-solve check per item),
`src/stat.mjs` (exact statistics; imports `Fr` from `src/prop.mjs`, copied unchanged from ch06), `src/lib.mjs` (shared ICSE
builders, copied unchanged). Run from `platform/`: `npx tsx content/authored/maths/icse-10-mathematics-ch22/src/build.mjs`;
lint only this chapter with `npx tsx content/authored/maths/icse-10-mathematics-ch22/src/lint.mts content/authored/maths/icse-10-mathematics-ch22`.
Rebuilding is deterministic (identical `release.json` / `tests.json` hashes on two runs).

- **Exact arithmetic (`stat.mjs`):** every statistic is a BigInt rational; a non-terminating decimal throws, so no key is ever rounded. The direct, assumed-mean and step-deviation means are computed independently and `mean()` throws unless all three agree exactly (checked at two different assumed means where a question teaches the agreement). The median class is found by cumulative frequency and again by counting observations one by one; the modal class must be unique. Missing frequencies are solved from the mean equation exactly and substituted back; the two-unknown question (l04) is also solved by Cramer's rule.
- **Tables:** every frequency table in a stem, model answer, slide or note is generated from the same data object that the check uses (class marks, f·x, d, f·d, u, f·u, cumulative frequency), so a table cannot disagree with its key.
- **Re-solve:** 134/134 checks pass (`src/resolve.log`). MCQ option values are typed independently so exactly one equals the re-solved target (distractors: dividing by the number of rows or classes, averaging the values without frequencies, the sum instead of the mean, the mean for the median, the median class swapped with the modal class, adding instead of subtracting the correction, forgetting the assumed mean or the class width, unweighted combined means).
- **KaTeX:** 1,751 math strings parse in strict "error" mode; no Unicode maths symbols inside `$…$`. verify-local: 65 questions, 0 flags.
- **Narration:** 39 slides, max 75 words, mean 44; numbers in words, no symbols or capital-letter abbreviations.
- **MCQ key balance:** options rotated after the re-solve (a 5, b 5, c 4, d 4).
- **Lint:** stage-4 `lintExemplar` on this chapter: 0 errors, 0 warnings. **Originality** (`content originality --authored`): 0 errors for this unit.

## Originality
All set-ups and data are new and imagined (canteen teas, ticket counter waits, bakery loaves, hockey and football goals, cycle-shop repairs, flats' electricity, bamboo shoots, club ages, seedlings, market-stall takings). CBSE 10 ch13 (Statistics) set-ups and wording (its generic formula-statement MCQs and its wages/marks tables) were avoided; wording of similar items differs because the bank duplicate check ignores numbers and maths. CISCE documents were used for pattern only.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Quartiles and graphs (histogram, ogive, graphical median and mode) belong to ch23 and are not here; the median and mode of grouped data are only named by class, as in the 2027 syllabus.
- Difficulty is concentrated at d1–d3 (three d4 items); no case-based items.
- **2026-11-05:** assertion-reason options reordered to the ICSE 2027 Mathematics specimen paper (511) order and wording; every key re-mapped so each item's meaning is unchanged.
