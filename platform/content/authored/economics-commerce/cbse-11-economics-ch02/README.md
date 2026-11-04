# CBSE Class 11 Economics, Chapter 2: Collection of Data

`cbse-11-economics-ch02` · release v1 · academic year 2026-27 · family `economics-commerce` (Part A: Statistics for Economics) · provenance `human`, every item `status: "draft"`

Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-11-economics-ch02/src/build.mjs` from `platform/`). The build validates the schema, runs the pipeline lint and deterministic verify checks, word limits, narration rules, editorial counts and the answer-leak scan, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON. The shared `lib.mjs` and `stats.mjs` are imported from `cbse-11-economics-ch01/src/` and are not copied here.

## Scope
Syllabus topics t01 and t02 only: t01 primary and secondary data, methods of collection, questionnaire, pilot survey, census and sample, random and non-random sampling, sampling and non-sampling errors (59 items); t02 Census of India, NSSO and other secondary sources (15 items).

## Contents
| File | What |
|---|---|
| `release.json` | 2 decks (20 + 22 slides), notes (7 sections), 32 flashcards, 74 questions (136.5 marks; 4 case-based items with 12 parts) |
| `tests.json` | short test (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and long test (40 marks, 90 min, `cbse-11-default-chapter-test-long`) |
| `src/questions.mjs` | question bank and the computed survey figures |
| `src/build.mjs` | visuals, decks, notes, flashcards, tests |

- Deck 1 (20 slides, 10 visuals, 4 checks, 2 worked examples): data, primary versus secondary, methods, questionnaire design, pilot survey.
- Deck 2 (22 slides, 12 visuals, 4 checks, 2 worked examples): population and sample, census versus sample, sampling methods, sampling error (computed), non-sampling errors, Census of India, NSSO, other sources.
- Own SVGs (no maps): primary-versus-secondary chart, census-versus-sample dot grid, sampling-methods tree, questionnaire checklist flow, sampling-error bar chart.
- Questions: mcq 26, assertion-reason 6, true-false 4, fill-blank 3, match 2, ordering 2, numerical 4, short 2-mark 11, short 3-mark 6, long 5-mark 6, case-based 4. Difficulty d1/d2/d3/d4 = 7/30/32/5. Competency: recall 17, understanding 18, application 24, analysis 13, evaluation 2 (53% application or above).
- Tests (disjoint, no deck-check item, no numerical item). Short: A m_primary_def, m_census_body, m_samperr_def, ar_census_sample; B s2_pilot, s2_lottery, s3_prim_sec; C one of l_methods / l_sources; D cb_milk. Long: A eight mcq and two assertion-reason; B two short 2-mark, one of two 2-mark, one 3-mark, one of two 3-mark; C l_questionnaire and one of l_census_sample / l_sampling_errors; D cb_canteen and cb_sources.

## How verified
- Every figure is computed with `stats.mjs` (`mean`, `sum`, `rnd`) from an imagined register of 50 milk shops in the imagined town of Kelvapur and asserted with `check()`: population mean 120.42, sample of 10 mean 122.00, sampling error 1.58, sample of 20 mean 120.45, error 0.03, sampling fraction 20 per cent, response rate 80 per cent (36 of 45), quotas 20 girls and 30 boys.
- Build prints `NO ERRORS`, lint 0 errors and 0 warnings; three consecutive builds give byte-identical `release.json` and `tests.json`; no `*.wip.json` remains.
- Near-duplicate scan: 0 flags; SVG label scan: 5 figures, 0 issues.

## Facts for a reviewer
1. Data are the raw material of statistics.
2. Primary data: collected first-hand by the investigator for a specific purpose. Secondary data: collected by someone else and used by the investigator.
3. Primary versus secondary compared on originality, cost, time, suitability and reliability; secondary data are to be checked for collector, purpose, method and date.
4. Personal interview: high response, clarification possible; costly, interviewer may influence answers.
5. Mailed questionnaire: low cost, wide coverage; low response, no clarification.
6. Telephone interview: quick; limited to people with telephones and limited in length.
7. Questionnaire rules: short; general to specific; precise and clear; avoid leading questions, double negatives, ambiguous words and embarrassing questions; use closed-ended (two-way, multiple choice) and open-ended questions where suitable.
8. A pilot survey is a small trial run that tests the questionnaire and estimates cost and time.
9. Census: every unit of the population is studied. Sample: a representative part is studied. Compared on cost, time, accuracy and suitability.
10. Population (universe): the complete group of units about which information is wanted.
11. Random sampling: every unit has an equal chance; methods are the lottery method and random number tables.
12. Non-random sampling: judgement, convenience and quota sampling.
13. Sampling error: sample estimate minus the true population value (sign kept in the computed items); it tends to fall as a random sample grows, but not in every single draw; nil in a census.
14. Non-sampling errors: errors in data acquisition (recording or measurement), non-response, sampling bias, arithmetic errors; they can occur in a census.
15. Response rate: forms returned divided by forms sent, times 100.
16. Census of India: every ten years, by the Office of the Registrar General and Census Commissioner, India; collects population, demographic, social and economic data (literacy, occupation, housing); first synchronous census 1881. No counts or timing of the current census are stated.
17. NSSO: set up 1950; nationwide sample surveys in rounds on consumption expenditure, employment and unemployment and other subjects. Dated note: as of 2024 part of the National Statistics Office under the Ministry of Statistics and Programme Implementation after the 2019 merger. No survey results are stated.
18. Other secondary sources named in general terms: Reserve Bank of India publications, the Economic Survey (described as a yearly review of the economy by the Ministry of Finance in one match item), Labour Bureau reports.

## Unsure or to double-check
- Quota sampling is treated as non-random, as the brief and textbook do; the sample-size effect on error is stated as a tendency.
- The Economic Survey match description (Ministry of Finance, yearly) is a stable fact but worth confirming.
- The 20-shop sample gives a very small error (0.03) by the choice of imagined units; the text says it tends, not always, to fall.
