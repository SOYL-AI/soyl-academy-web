# ICSE Class 9 Physics, Chapter 7 — Heat and Energy

`icse-9-physics-ch07` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 16 slides), notes (5 sections), 30 flashcards, 73 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9phy_ch07_short` (20 marks, 30 min) and `t_icse9phy_ch07_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, no deck-check item is used in a test, and no item gives away the answer of another item in the same test. |
| `src/` | `calc.mjs` (every computed value, asserted), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. The shared authoring library is `../icse-9-physics-ch01/src/lib.mjs` (imported, not edited). Rebuild from `platform/`: `npx tsx content/authored/physics/icse-9-physics-ch07/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ICSE 2028 Class IX syllabus topics of the chapter: heat and temperature, the joule and 1 cal = 4.186 J; anomalous expansion of water with volume-temperature and density-temperature graphs from 0 to 10 °C; Hope's experiment and the consequences (frozen ponds, burst pipes); the greenhouse effect and global warming (meaning, causes, impact, remedies); energy degradation.
- No removed topics for this chapter. Specific heat and calorimetry (ICSE 10 Physics, heat) are not used: heating water is done only from the definition of the calorie (m × Δt cal).
- **Overlap handled:** the chemistry of greenhouse gases and their sources belongs to ICSE 9 Chemistry (environment chapter); here the greenhouse effect is treated as radiation (sunlight in, infrared out, absorption and return) and the gases are only named. No stem or number from ICSE 10 Physics heat or the chemistry chapter is reused.
- **Time-sensitive points marked "as of 2026":** carbon dioxide above 420 parts per million; the Earth about 1.1 to 1.3 °C warmer than in the late 1800s (deck 2 slides 6 and 7, notes section 4).
- **Calculation chapter:** 12 numerical items, plus numerical MCQs, calculation short answers and structured parts. Constants: 1 cal = 4.186 J; 1 kcal = 1000 cal; water 1000 kg m⁻³, ice 900 kg m⁻³ (each stem says so).
- Class 9 has no board examination; the items follow the ICSE 2027 Physics specimen style (521): "state", "define", "give a reason", numericals with formula, substitution and unit, graph reading, experiment-based items, assertion-reason items in the specimen option order, 10-mark structured questions in parts.
- **Originality:** situations are the writer's own (food label, biscuit packet, lake diver, sealed bottle and tank, tall insulated jar, parked car, cyclist braking). Exact-stem and originality checks report no duplicates.

## Shape
- **Decks:** Part 1 (17 slides): Hot, warm or cold: what is heat?; Heat and temperature; Quick check: which way does heat flow?; Units of heat; Worked example 1; Quick check: calories to joules; Most liquids expand on heating; Density against temperature; Volume against temperature; Quick check: maximum density; Hope's experiment: the apparatus; the readings; a frozen pond; Worked example 2: water freezing in a pipe; Why pipes burst and bottles crack; Summary; Exam tips. Part 2 (16 slides): Why is the Earth warm enough for life?; The greenhouse effect; Greenhouse gases; Quick check: which gases trap heat?; The natural greenhouse effect is useful; Global warming: causes; impact on life; Quick check: a result of global warming; What can we do?; Energy changes form and loses usefulness; a band diagram; Worked example 1: a car engine; Quick check: where does the rest go?; Worked example 2: an electric bulb; Summary; Exam tips.
- **Visuals (33 of 33 slides):** flow 3, table 23, svg 7.
- **Diagrams (11 distinct SVGs):** density-temperature graph (annotated and plain), volume-temperature graph (both drawn from the density table in `calc.mjs`, with a stretched-scale note); Hope's apparatus (plain and lettered A to E) and a readings graph; a frozen pond with layer temperatures; the greenhouse effect (plain and lettered A to E); band (Sankey-style) energy diagrams with computed band widths (one with the heat band hidden for a question). Rendered to PNG and checked by eye; labels and overlaps fixed.
- **Narration:** 9–45 words per slide (mean 33); no symbols, formulae, digits or unit abbreviations.

## Question bank (73 items, 154 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 29 (6 are deck-check items) | 29 |
| assertion-reason | 4 | 4 |
| short-1 (terms) | 3 | 3 |
| true-false | 3 | 3 |
| fill-blank | 2 (blanks: 5, 1) | 6 |
| numerical | 12 | 12 |
| match-5 | 1 | 5 |
| short-2 | 7 | 14 |
| short-3 | 6 | 18 |
| long-10 (structured) | 6 | 60 |

- **Structured questions:** 6, each 10 marks in 4 to 6 parts with part marks in the stem; two have lettered A to E figures (Hope's apparatus, the greenhouse effect); one reads a graph, one a band diagram and one a table of thermometer readings.
- **Difficulty:** d1 30 · d2 24 · d3 18 · d4 1 (an-mcq5, the insulated jar cooled from the top).
- **Competency:** recall 19 · understanding 20 · application 28 · analysis 6. Application or higher is **47% of items**, inside the 45–65% lint band. No tag was changed; the band was reached by adding application items (num-spoon, num-tank), making hp-mcq2 a data-reasoning item and adding the analysis item an-mcq5.
- **Assertion-reason keys:** c a d b.

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).

## Verifier pass
- Every question was re-solved from its stem; every conversion, volume, density value and degraded energy is computed and asserted in `calc.mjs`; numericals carry scripted re-solve checks.
- Test items were chosen so that Section A does not state what a Section B question asks (for example the Hope's experiment question is tested without any item on the 4 °C reading, and the graph question without the volume-temperature items).

## For a reviewer
- **Constants:** 1 cal = 4.186 J (the 15 °C calorie); 1 kcal = 1000 cal (the food Calorie). The calorie is defined here as the heat to raise 1 g of water by 1 °C, as in the ICSE textbooks.
- **Density table of water (0 to 10 °C):** 999.84, 999.90, 999.94, 999.96, 999.97, 999.96, 999.94, 999.90, 999.85, 999.78, 999.70 kg m⁻³, standard table values rounded to 0.01. Maximum density is quoted at 4 °C (true value 3.98 °C). The table is almost but not exactly symmetric about 4 °C; the question that asks for the temperature with the same density as 2 °C (answer 6 °C) relies on the rounded table. The graphs use a greatly stretched vertical scale and say so.
- **Volume figures:** the volume of 1 kg of water is 1 million ÷ density in cm³: 1000.16 (0 °C), 1000.03 (4 °C), 1000.30 (10 °C), used in the graph question.
- **Hope's experiment readings** are illustrative (a teaching table, not measured data); the final readings 4 °C (lower) and 0 °C (upper) are the textbook outcome.
- **Ice and water densities** in the numericals: 900 and 1000 kg m⁻³ (books use 917 to 920 for ice); the freezing percentage rise (11.1%) therefore differs slightly from the real value of about 9%. Every stem states the densities.
- **Greenhouse figures as of 2026:** surface temperature about −18 °C without and 15 °C with the natural greenhouse effect; carbon dioxide above 420 ppm; warming about 1.1 to 1.3 °C since the late 1800s. These change with time; check before each academic year.
- **Heating water by the definition of the calorie** (m × Δt cal) is used in four items; if a reviewer thinks this strays into ICSE 10 calorimetry, replace num-warm, num-spoon, ht-short3 and long-heat.
- **Degradation numericals** treat 'useful energy' simply as output of the stated form; efficiency is not named.
