# CBSE Class 10 Science, Chapter 13 — Our Environment

`cbse-10-science-ch13` · release v1 · academic year 2026-27 · family `science` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (19 + 18 slides), notes (4 sections), 30 flashcards, 70 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse10sci_ch13_short` (20 marks, 40 min) and `t_cbse10sci_ch13_long` (40 marks, 90 min). The two tests share no questions. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All four syllabus topics (t01–t04) are covered; the chapter has no removed topics. Unit V carries 5 board marks, so the chapter is deliberately compact (two decks, 70 items), but it still meets every target.
- The 10 percent law and the "about 1% of sunlight" figure are taught as approximate values, as the syllabus intends.
- The DDT/eggshell story and Indian waste-bin colours (green wet, blue dry) are context only; no item depends on outside knowledge beyond the passage or the syllabus.

## Shape
- **Part 1 (t01–t02, 19 slides):** ecosystem; natural and artificial; a pond ecosystem diagram; biotic and abiotic; producers, consumer types and decomposers; nutrient recycling; food chains and trophic levels; food webs; energy flow, 1% capture and the 10 percent law (energy pyramid); consequences (short chains, one-way flow, diet); biological magnification. Worked examples: building a chain from a Thanjavur paddy field, the 10% law over four transfers (50 000 J → 5 J), a magnification factor (×1000).
- **Part 2 (t03–t04, 18 slides):** what ozone is and where it helps or harms; the UV shield; formation in two balanced steps (`chem` visuals); depletion by CFCs; the 1987 UNEP agreement; biodegradable vs non-biodegradable (enzyme specificity); segregation at source; reduce–reuse–recycle–compost; harms of non-biodegradable waste. Worked examples: explaining a "CFC-free" label, sorting a party’s waste.
- Layouts: title 2, concept 15, diagram 5, example 5, check 6, summary 2, exam-tips 2.
- **Visuals in decks (27 of 37 slides):** table 15, flow 5 (food chain, food web, decomposition cycle, UNEP timeline, three R’s), svg 5, chem 2. Notes reuse the SVGs, flows and ozone equations.
- **Diagrams (5 SVGs):** a labelled pond ecosystem (producers, consumers, decomposers in the mud, abiotic parts); an energy pyramid with 10 000 → 10 J and the 90% loss per step; biological magnification from 0.02 to 20 ppm with dot density rising; the ozone layer absorbing UV, with CFCs rising from a fridge; green and blue segregation bins with examples.
- **Narration:** 11–67 words (mean 48), no symbols ("nineteen eighty-seven", "ten per cent"); contexts include a village pond, Dehradun forest, Thanjavur paddy, Kanha, the Rann of Kutch, Kuttanad, Delhi smog, a Lucknow appliance shop, a Bengaluru housing society and a Kerala town’s dump.

## Question bank (70)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 | 1 (keys a 7, b 7, c 6, d 6) |
| assertion-reason | 7 | 1 (keys a 3, b 2, c 1, d 1) |
| true-false | 4 | 1 (2 true, 2 false) |
| fill-blank | 4 | 1 |
| match | 2 | 2 |
| numerical | 5 | 2 (10% law forwards ×2 and backwards, magnification factor, compostable waste) |
| short | 6 + 5 | 2 / 3 |
| long | 5 | 5 |
| case-based | 6 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every case passage has `passage_origin: "soyl-original"`; `word_limit` is set on the 9 prose short answers; the 5-mark answers have four sub-parts and carry none.
- **Difficulty:** d1 24 · d2 24 · d3 16 · d4 6.
- **Competency:** recall 16 · understanding 19 · application 25 · analysis 6 · evaluation 4. Application or higher is **50% of items (60% of marks)**.
- **Topic tags:** t01 13 · t02 26 · t03 15 · t04 17.
- **Cases:** grassland energy table with a missing level (data), burying six items for four weeks (lab), pesticide magnified up to pelicans with an evaluation part (data, d4), a science-club visit to an appliance shop (everyday; ozone equations), a town’s waste composition and its smoking dump (data; evaluation part, d4), snakes killed in Punjab wheat fields (everyday; food-web reasoning and evaluating a rat poison).
- **Deck checks:** q003, q013, q024 (Part 1); q042, q045, q052 (Part 2) — all objective.

## Chapter tests
- **Short (20 marks, 40 min):** A q014, q038, q053, q057 · B q030, q062, q033 · C q012 or q049 · D q066.
- **Long (40 marks, 90 min):** A q001, q015, q018, q024, q037, q041, q051, q054, q025, q046 · B q031, q060, (q010 or q047), q048, (q011 or q061) · C q034 + (q035 or q063) · D q065, q067.

## Validation
- `npm test -w @soyl/content-templates`: all 7 checks for this chapter pass.
- `npm run content -- lint --exemplars`: **0 errors, 0 warnings**.
- Scratch validator: 65 maths strings parsed (KaTeX 0.19.1 + mhchem, strict), including both ozone equations; 10 numeric links recomputed; 10 SVG visuals / 5 distinct diagrams pass the allow-list; narration max 67 words; every check slide points to an objective item.
- Independent re-solve: 8/8 numerical items and parts, plus 18 other checks (every worked-example energy value, the case tables, the pyramid, the magnification factors, and oxygen-atom balance of both ozone equations).

## Verifier pass (2026-10-27)
Every question, case part and alternative was re-solved from its stem. Findings and fixes:
1. **Energy pyramid diagram:** the first draft drew a sunlight arrow coming out of the apex, wrong for energy entering at the producers. The arrow was removed, and the 1% capture is stated under the base.
2. **Competency honesty:** the first draft had 41% application or above. Six items were rewritten into new contexts (q002 Thar desert survey, q015 deer vs tigers, q017 sunlight to grass to cow, q033 Kuttanad herons, q038 Delhi ground-level ozone warning, q041 trekkers and thin ozone); the share is now 50%.
3. **Key balance:** true/false was 1 true to 3 false, so q043 now states the ozone layer’s role (true). Assertion–reason q046 was rewritten so that keys a–d are all used.
4. **Deck check id:** a check slide pointed at q012, which became a long answer when the bank was renumbered. It now points to q013 (the grass → goat → human item), and the validator confirms that every check item is objective.
5. **Food chains made realistic:** the summary table’s chain was changed from deer → leopard → tiger (tigers rarely eat leopards) to grass → grasshopper → frog → snake.
6. **Validator false positive:** percentages such as $10\% \times 10000 = 1000$ were read as 10 × 10000. The scratch validator now skips sides with %, as the pipeline lint does; the content was correct.
7. **Facts double-checked:** ecosystem definition; biotic/abiotic; producers including certain bacteria; four consumer types; decomposers replenish the soil; arrows food → feeder; ~1% capture; 10% law; short chains; one-way energy flow; biomagnification of non-biodegradable chemicals, highest at the top; O₃ formation in two balanced steps under UV; ozone poisonous at ground level; CFCs as refrigerants and in fire extinguishers; sharp fall in the 1980s; UNEP 1987, freeze at 1986 levels; UV and skin cancer; biodegradable via specific microbial enzymes.

## Known gaps
- Concentration and energy values in the cases and diagrams are illustrative (realistic orders of magnitude, not cited measurements).
- Food-web diagrams in answers are described in words or as chains; graders should accept any correct web.
- `blueprint_id` is null on both tests, as for the exemplar.

## Competency audit by assessment-designer (2026-10-27)

Re-read against the rule used for CBSE 10 Maths (D-035 context): a routine, textbook-standard step on given data — a one-step formula numerical, a balanced equation, an electron-dot structure, a named part or a value read off a table — is **understanding**; applying ideas to new situations, interpreting data, explaining observations, analysis and evaluation keep their tags. 6 item tag(s) and 5 case/source-part tag(s) changed to understanding (case items whose parts are now mostly recall/understanding carry `understanding` at the top level). No question text, key, solution or marking scheme changed. Now: recall 16, understanding 25, application 19, analysis 6, evaluation 4 — application or higher 41% of items, 47% of marks (supersedes the competency figures above).
