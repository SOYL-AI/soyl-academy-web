# CBSE Class 10 Social Science, Chapter 18 — Development

`cbse-10-social-science-ch18` · release v1 · academic year 2026-27 · family `social-science` (Economics) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is the **standard for Economics chapters** in the social-science family: indicators defined precisely, simple calculations shown step by step, and **data-based** answers (the board's economics long answer is table-based).

| File | What |
|---|---|
| `release.json` | 2 decks (18 + 19 slides), notes (6 sections, 6 visuals, 2 formulas), 30 flashcards, 83 questions (161 marks; 24 passage parts and alternatives) |
| `tests.json` | `t_cbse10sst_ch18_short` (20 marks, 40 min) and `t_cbse10sst_ch18_long` (40 marks, 90 min) on the SST chapter-test blueprints; the long test's compulsory 5-mark question is the data-based one |

## Scope
All four topics of chapter 18: t01 different people, different goals (11 items) · t02 income and other goals; national development and average income (27) · t03 comparing countries and states, public facilities (23) · t04 HDI and sustainability (31).

## Why it is the standard for Economics

### 1. Decks
- **Part 1** (goals, income, averages) and **Part 2** (public facilities, HDI, sustainability). 24 of 37 slides carry a visual, including three **plots**: a bar chart of two imagined villages with the **same average but different distributions** (with a dashed average line), a **scatter of income against infant mortality** for six imagined states showing no simple pattern, and a **line chart of a falling water table**.
- **Formulas** are typeset once and used in examples: per capita income = total income ÷ population; years a reserve will last = reserves ÷ annual production.
- **Five worked examples**: computing per capita income (with units and an interpretation line); the same-average/different-distribution test; reading a three-state table (income vs IMR, literacy, attendance); interpreting HDI data with the gaps quoted (9 more years of life, 3.5 more years of schooling); and a full **data-based 5-mark answer** with a mark plan.
- Narration keeps the student in the picture ("What would make your life better?") and repeats the exam traps: IMR — lower is better; every average needs its limitation.

### 2. Question bank (83 items)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 29 | 1 | situation items (Meena's two jobs, a factory owner's income lifting the average, income up but IMR flat) |
| assertion-reason | 6 | 1 | keys a, c, b, d, a, b |
| **numerical** | 3 (+ 3 inside cases) | 1–2 | per capita income, a village average, years of oil left; `value` + `unit`, solutions state the answer |
| true-false · fill-blank · match · ordering | 4 · 3 · 2 · 2 | 1 · 1 · 2 · 1 | ordering: per capita method; the groundwater depletion chain |
| map | 1 | 2 | practice: Kerala and Bihar on `india-political` |
| short | 11 + 10 | 2 / 3 | `word_limit` 25–40 / 40–60; includes designing indicators for a school (create) |
| long | 6 | 5 | includes a **table-based** comparison of three states (d4) and a d5 evaluation of judging districts by income alone |
| source-based | 3 | 4 | an imagined dam hearing, a health worker's letter, a farmer's tube-well diary |
| case-based | 3 | 4 | HDI table of three imagined countries; two villages' incomes; an oil-exporting country's two plans |

- Difficulty d1/d2/d3/d4/d5 = 17/35/23/7/1. Competency: recall 16, understanding 28, application 14, analysis 20, evaluation 5 — **47% of items, 53% of marks at application or above**.

### 3. Data and originality
- **All data are invented** and labelled "imagined"; every number was recomputed by a separate script. Real-world statements are limited to what is stable and verifiable: the definitions of IMR, literacy rate (7+), net attendance ratio, life expectancy and the HDI's components; the UNDP publishes the Human Development Report; the World Bank classifies by income per person and places India in the **lower-middle-income** group; **Kerala** has one of the lowest infant mortality rates; **Bihar** has had the lowest per capita income among states in recent years. No HDI rank, World Bank threshold or state statistic is quoted, because these change every year.
- The textbook's own tables and the well-known example of two countries with five citizens each were deliberately **not** reused; the village example uses new figures (four families, ₹80,000 total).
- **Textbook-echo scan:** rewrote "what is development for one may be destructive for the other", "money in your pocket cannot buy…", "do not respect national or state boundaries", "the average expected length of life of a person at the time of birth", "adequate provision of basic health and educational facilities", "proportion of literate population in the 7 and above age group" and the total-income sentence.

## Pitfalls this chapter avoids
1. **"$" as a currency sign** breaks KaTeX (it opens maths). Money is written ₹ or USD; the lint caught "US$" in the HDI table during authoring.
2. **"data:" in captions** trips the link filter (it looks like a `data:` URL); captions say "Imagined figures".
3. Reading IMR as "higher is better"; using income only in data answers; calling groundwater non-renewable.
4. Quoting volatile real statistics (HDI ranks, thresholds) that will be wrong next year.

## Verifier pass (2026-10-26)
- **Keys:** the first draft had 15 of 26 MCQ keys at (b). Nine items were re-keyed by moving the correct option to another position and swapping the option letters inside each solution (done in code so the solution and key cannot drift apart); a further item (m_dev_def) had a placeholder solution and a wrong key and was rewritten. A script then confirmed that every MCQ solution names its key.
- **Competency:** the draft was at 42% application+; seven higher-order items were added (income up but IMR flat; an average lifted by one owner; sustainable groundwater action; halving production doubles a reserve's life; why IMR reflects health facilities; landowner vs labourer on a minimum wage; evaluating a paddy plan in a dry district).
- **Numbers:** every figure in decks, cases and solutions recomputed (see `build.checks.numeric_resolve`).
- **Lint fixes:** "US$" → "USD" (7 KaTeX errors), "Imagined data:" → "Imagined figures:" (2 link-filter errors).
- **Originality:** the echo scan above.

## Gaps
- **Plot categories:** bar series have no category labels, so families and states are numbered on the x-axis and named in the axis label and caption.
- **Net attendance ratio** is defined generally ("an age group, e.g. 14–15 years") because the age band used in published tables varies by source.
- No **BMI** activity item: it is not in the 2026-27 learning outcomes for this chapter.
