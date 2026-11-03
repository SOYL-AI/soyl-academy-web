# ICSE Class 10 Mathematics — Chapter 23: Graphical Representation: Histograms and Ogives (authored, v1)

Hand-authored production chapter (DECISIONS D-025, D-026) in the ICSE 2027 Mathematics presentation, built with the
CBSE maths chapter approach (builders + independent re-solve). Author: `claude-opus-5-5 (subject-producer)`, provenance
`origin: "human"`, `model: null`. All items are `status: "draft"` until review.

## Scope (ICSE 2027 syllabus, Unit 6 Statistics)
- **t01** Histogram of a grouped frequency distribution (equal class widths; discontinuous classes made continuous by 0.5) and the graphical estimate of the mode (corner-joining construction on the modal bar).
- **t02** Cumulative frequency table and the less-than ogive (points at upper boundaries, starting at the lower boundary of the first class).
- **t03** Median, lower and upper quartile and inter-quartile range read from the ogive; number of observations below, above and between marks; cut-offs for the best k observations.
- **Removed for ICSE 2027** (the more-than ogive): one student-facing note only (notes §5). Histograms with unequal class widths are not taught (not listed).
- Graph readings are exact linear interpolation on the ogive segments ("proportional parts"); every graph-reading question states a tolerance (about a tenth of the class width on values, ±1 on counts) and the model answers give the computed value. The closed formula for the grouped median/mode (removed in ch22) is not used.

## Contents
| Item | Count |
|---|---|
| Decks | Part 1 "Histograms and the mode" (t01) 18 slides; Part 2 "Cumulative frequency, ogive, median and quartiles" (t02–t03) 19 slides |
| Worked examples | 3 + 5 (histogram from continuous classes; discontinuous classes made continuous; graphical mode of mango crates; cumulative table; drawing the ogive; median; quartiles and inter-quartile range; counts above, below and between marks) |
| Visuals | 27 of 37 slides (table 13, plot 9, flow 5); max 1 consecutive slide without a visual. Notes: 8 sections, each with a visual, 20 visuals in all |
| Check slides | 4 + 4, all objective (q017 mcq, q002 mcq, q011 mcq, q025 true-false; q018 mcq, q012 mcq, q007 mcq, q033 fill-blank) |
| Notes | 8 sections with key terms and formulas; exam tips with mark split and 6 common mistakes |
| Flashcards | 30 (concept 8, fact 6, formula 5, example 5, definition 4, exam-tip 2) |
| Questions | 66 items, 176 marks: mcq 18, assertion-reason 6 (keys a b c d a c), true-false 5, fill-blank 5, numerical 9, short-2 4, short-3 6, short-4 6, long-10 7 (structured (a)(b)(c), 3 + 3 + 4, 6–7 step marks each). Two items carry a figure (l01 histogram, l03 ogive) |
| Difficulty | d1 17, d2 22, d3 23, d4 4 |
| Competency | recall 9, understanding 21, application 29, analysis 7 — application or higher 55% of items, 81% of marks |
| Topics | t01 17, t02 19, t03 37 (items may carry two topics) |
| Tests | `t_icse10math_ch23_short` (20 marks / 45 min: A = q003 q005 q009 mcq, q019 AR, q050 q052 short-3; B = one of q061, q063) and `_long` (40 marks / 90 min: A = q004 q006 q008 q010 q013 q015 mcq, q020 q023 AR, q055 q056 q057 short-4; B = any two of q060 q064 q065), matching `icse-10-mathematics-chapter-test-short/long`; disjoint, and no deck-check item is used |

## Verifier record
Build: `src/build.mjs` (decks, notes, flashcards, tests), `src/questions.mjs` and `src/questions2.mjs` (bank + one re-solve check per item),
`src/gr.mjs` (exact graph arithmetic and plot builders), `src/sets.mjs` (data sets), `src/stat.mjs` (class tables; imports `Fr` from
`src/prop.mjs`, both copied unchanged from ch22), `src/lib.mjs` (shared ICSE builders, copied unchanged). Run from `platform/`:
`npx tsx content/authored/maths/icse-10-mathematics-ch23/src/build.mjs`; lint only this chapter with
`npx tsx content/authored/maths/icse-10-mathematics-ch23/src/lint.mts content/authored/maths/icse-10-mathematics-ch23`.
Rebuilding is deterministic (identical `release.json` / `tests.json` hashes on repeated runs).

- **Exact arithmetic (`gr.mjs`):** every boundary, cumulative frequency and reading is a BigInt rational; a non-terminating decimal throws, so no key is rounded. Every ogive reading is computed by the interpolation formula (`ogiveX`) and mapped back by evaluating the drawn polyline (`ogiveY`); the two must agree, and the model-answer reading text (`readX`, `readY`) throws if it disagrees with either. The graphical mode is found by intersecting the two construction lines exactly, checked on both lines and against the closed form, and required to lie inside the modal class. Data sets were chosen so that the median, both quartiles and the modes used are terminating decimals.
- **Keys:** every numerical key, MCQ target and fill-blank is typed by hand from the data and compared with the computed reading; the number-in-solution and number-in-model-answer checks run on all 66 items; verify-local: 66 questions, 0 flags (every numerical solution ends an "=" step on the key).
- **Figures:** histograms are closed outline line series through the class boundaries (the plot builder's bars do not touch); ogives are line series through (upper boundary, cumulative frequency); every marked reading is asserted to lie on the drawn ogive and carries dashed guide lines; labels match their coordinates.
- **Re-solve:** 123/123 checks pass (`src/resolve.log`). MCQ distractors come from the plausible wrong method (the class mark instead of the construction value, the corners joined the wrong way, the number below instead of above, the sum instead of the difference, a frequency instead of a cumulative frequency).
- **KaTeX:** 1,661 math strings parse in strict "error" mode; no Unicode maths symbols inside `$…$`.
- **Narration:** 37 slides, max 62 words, mean 40; numbers in words, no symbols or capital-letter abbreviations.
- **MCQ key balance:** options rotated after the re-solve (a 5, b 5, c 4, d 4).
- **Lint:** stage-4 `lintExemplar` on this chapter: 0 errors, 0 warnings. **Originality** (`content originality --authored`): 0 errors for this unit.

## Originality
All set-ups and data are new and imagined (typing trainees, ferry passengers, mango crates, delivery riders, practical marks, street-food carts, toll plaza, volleyball aspirants, sprinters, helpline calls, cyclists, piano practice, seed trays, kites). The CBSE 10 ch13 (Statistics) tables (pocket money, rainfall, wages, AQI, milk bills) and its formula-statement stems were avoided; wording of similar items differs because the bank duplicate check ignores numbers. CISCE documents were used for pattern only.

## Gaps / follow-ups
- Narration audio not generated (TTS stage).
- Histograms are drawn as outlines (line series) because the shared plot builder's bars are capped in width and do not touch; if a native touching-bar histogram kind is added, `histPlot` in `src/gr.mjs` is the one place to change.
- Unequal class widths (adjusted frequencies) and the more-than ogive are not taught; no case-based items; four d4 items.
- A few data sets (toll plaza, practice minutes) are reused across a short question and a long question with different wording and tasks.
