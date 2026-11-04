# CBSE Class 11 Economics, Chapter 1: Introduction (Statistics for Economics)

`cbse-11-economics-ch01` · release v1 · academic year 2026-27 · family `economics-commerce` (Part A: Statistics for Economics) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored on the pattern of the CBSE 12 Economics chapters. Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-11-economics-ch01/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, word limits, narration rules, editorial counts, the answer-leak scan and the exact-stem originality pre-check, then writes `release.json` and `tests.json` (or parks them as `*.wip.json`). Edit `src/`, not the JSON. `src/lib.mjs` and `src/stats.mjs` are the shared copies imported by every CBSE 11 Economics chapter and are not edited here.

## Scope
Single topic t01 (every item is tagged `t: 1`): scarcity and choice, economic activities and agents, the two senses of statistics, quantitative and qualitative data, scope, functions, importance and limitations of statistics in economics.

| File | What |
|---|---|
| `release.json` | 2 decks (16 + 20 slides), notes (6 sections), 30 flashcards, 77 questions (143 marks; 4 case-based items with 12 parts) |
| `tests.json` | `t_cbse11economics_ch01_short` (20 marks, 40 min) on `cbse-11-default-chapter-test-short`; `t_cbse11economics_ch01_long` (40 marks, 90 min) on `cbse-11-default-chapter-test-long` |
| `src/` | `questions.mjs` (imagined data, checks, bank), `build.mjs` (visuals, decks, notes, cards, tests), shared `lib.mjs`, `stats.mjs` |

### Decks
- **Part 1** (16 slides): wants and scarcity (table), choice, the three activities (SVG), definitions, agents (table), how agents link (flow), from choices to numbers. Worked examples: name the activity (Chandpur pottery unit); spot the agents (weaving unit). Four checks.
- **Part 2** (20 slides): plural and singular senses (SVG), five stages (flow), quantitative and qualitative data, bar chart of an imagined household survey (SVG computed from the data), shares, functions web (SVG), average of six days of sales, price and quantity of buns, forecast of rice stocks, users, income and saving, limitations. Worked examples: sorting data kinds; percentage shares; price and quantity. Four checks.
- 25 of 36 slides carry a visual; narration max 62 words, no symbols.

### Question bank (77 items)
mcq 30, assertion-reason 7, true-false 3, fill-blank 3, match 2, ordering 2, numerical 3, short 2-mark 10, short 3-mark 7, long 5-mark 6, case-based 4 (parts of 1 + 1 + 2 marks, with an either/or part c). Difficulty d1/d2/d3/d4 = 10/32/30/5. Competency: recall 9, understanding 23, application 25, analysis 17, evaluation 3 (58% application or above). MCQ keys a7 b7 c8 d8; AR keys a,b,d,c,a,c,a.

### Tests (disjoint; no deck-check item)
- Short: A m_econ_def, m_function_present, m_agent_service, ar_misuse; B s_agents, s_condense, s3_scope; C one of l_economics / l_functions; D cb_village.
- Long: A m_production, m_stat_singular, m_qual, m_function_forecast, m_user_producer, m_limit_aggregate, m_policy, m_rain_mean, ar_choice, ar_plural; B s_scarce, s_plural_sing, one of s_limit_two / s_distribution, s3_importance, one of s3_qual_quant / s3_limits; C l_importance, one of l_meaning / l_limits; D cb_bakery, cb_saving.

## How verified
- Every figure stated as a result is computed from the imagined data with `stats.mjs` (`mean`, `median`, `sum`, `rnd`) and pinned with `check()` in `questions.mjs` and `build.mjs`; the build fails if a stated figure drifts. Computed: rainfall mean 880 mm and median 875 mm from six readings; household shares 40, 25, 15, 12.5, 7.5 per cent from an 80-household survey; sales average ₹4,500 from six days; rice trend (+20 tonnes a year, forecast 480); bun sales fall of 6 per ₹2 rise; saving shares 10 to 30 per cent; canteen shares 40, 30, 20, 10 per cent; the Dhillon budget (saving ₹4,000, food 40 per cent).
- Self-checks run: build `NO ERRORS`, lint 0 errors 0 warnings; builds repeated, `release.json` and `tests.json` byte-identical; near-duplicate scan 0 flags; SVG label check 0 issues.
- Not run (outside the brief): tree-wide gates, e2e, git.

## Facts for a reviewer
1. **Economics:** the study of how individuals and society choose to use scarce resources to satisfy wants (choice under scarcity).
2. **Scarcity:** resources are limited relative to unlimited wants and have alternative uses, so choice is unavoidable; rich economies face it too.
3. **Economic activities:** consumption (using goods and services to satisfy wants), production (creating them from inputs), distribution (sharing the income of production as wages, rent, interest and profit). The chapter treats distribution as the sharing of income among factors; some texts also include the passing of goods to consumers. Please confirm this reading.
4. **Economic agents:** consumers, producers, service holders and the government, with the one-line definitions in the notes. One person can play several roles (a weaver is a service holder and a consumer).
5. **Statistics, plural:** numerical facts or data. **Statistics, singular:** the science of collecting, organising, presenting, analysing and interpreting data (five stages, in that order).
6. **Quantitative data:** measured as numbers. **Qualitative data:** attributes, counted by category; a count or share of a category is a number summarising a qualitative attribute.
7. **Share formula:** share = count in the category ÷ total × 100.
8. **Functions of statistics in economics:** present facts precisely; condense data into summary measures; find relationships (price and quantity demanded, income and saving); forecasting and policy-making; users are consumers, producers, government and researchers.
9. **Importance:** theories are tested with data; policies are framed and judged with data.
10. **Limitations:** deals with aggregates, not individuals; results true on the average; can be misused. The chapter adds that these call for careful use, not rejection.
11. **Price and quantity:** the bun example shows the inverse relationship (quantity demanded falls as price rises); "demand" is not formally defined in this chapter.
12. **Forecast:** a straight-line projection of a four-year series, stated as an estimate that assumes the trend continues.
13. Unsure about: whether the board's wording lists "researcher" as a user of statistics (the chapter lists consumers, producers, government and researchers); "tests theories" appears both as a function in the web diagram and under importance.
14. All places, shops, surveys, rainfall readings, incomes and prices are imagined. No real statistics, no maps, no quotations.
