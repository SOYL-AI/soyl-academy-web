# CBSE Class 10 Social Science, Chapter 4 — The Age of Industrialisation

`cbse-10-social-science-ch04` · release v1 · academic year 2026-27 · family `social-science` (History) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored to the History standard set by `cbse-10-social-science-ch01` and `-ch05` (D-025, D-026, D-032), following `platform/content-templates/prompts/social-science/*.v1.md`. Built from `src/` (`npx tsx content/authored/social-science/cbse-10-social-science-ch04/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, word limits, narration rules and the answer-leak scan, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON. `src/lib.mjs` is identical to ch19–ch21's.

| File | What |
|---|---|
| `release.json` | 2 decks (16 + 20 slides), notes (6 sections, 12 visuals), 30 flashcards, 75 questions (138 marks; 20 passage parts and alternatives) |
| `tests.json` | `t_cbse10sst_ch04_short` (20 marks, 40 min) and `t_cbse10sst_ch04_long` (40 marks, 90 min) on the SST chapter-test blueprints, titled "periodic-assessment style" |

## Scope — periodic assessment only
The syllabus marks the whole chapter `board_assessed: false`: CBSE assesses "The Age of Industrialisation" only through **school periodic assessment**, not in the board paper. So:
- the bank is **lighter** than a board chapter's (75 items, against 96–136 for the board History chapters) and pitched at periodic-test style (more recall and understanding, fewer d4 items);
- both decks' title slides, the notes and the flashcards say the chapter is not in the board paper, and the tests are titled "periodic-assessment style"; individual stems are **not** labelled (unlike project-only topics in ch03/ch12/ch21), because every item is valid periodic-test material;
- the tests keep the SST chapter-test blueprints item for item, so `blueprint_id` is set.

| Topic | Deck | Items tagged |
|---|---|---|
| t01 Before the industrial revolution: proto-industrialisation | Part 1 | 13 |
| t02 Hand labour and steam power; industrialisation in the colonies (weavers) | Part 1 (Britain) and Part 2 (India) | 34 |
| t03 Factories in India and the market for goods | Part 2 | 30 |

The coming of the factory and the pace of change in Britain are tagged t02 (with hand labour and steam power), since t01 is limited to the period before factories.

## Decks
- **Part 1 — Britain (16 slides):** proto-industrialisation, why merchants went to villages (guilds) and why peasants agreed (enclosures), the town-controlled network, the first factories (Arkwright's mill), a slow revolution (traditional industries, Watt's engine), hand labour vs machines (Britain vs America), workers' lives. **Worked examples:** planning a three-mark answer on proto-industrialisation; the spinning jenny as a cause-and-effect chain. Three checks.
- **Part 2 — India (20 slides):** the age of Indian textiles (routes and ports), the export network, its breakdown after the 1750s, the Company, gomasthas and advances, weavers' responses, Manchester comes to India (duties, cheap imports, the American Civil War), factories from 1854, capital and managing agencies, jobbers, the peculiar pattern of growth (yarn to cloth, swadeshi, the First World War), small-scale industry and the fly shuttle, advertisements. **Worked examples:** a timeline of the weavers' decline; reading an advertisement as a source. Four checks.
- 27 of 36 slides carry a visual (17 tables, 10 flows); narration 9–68 words (mean 54), no symbols.

## Question bank (75 items)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 28 | 1 | scenarios (a village family spinning for a merchant in 1720, a seasonal London bookbinder, a jobber at a Bombay mill, a Manchester label with a goddess) |
| assertion-reason | 7 | 1 | keys a3 b1 c2 d1 |
| true-false · fill-blank · match · ordering | 4 · 5 · 2 · 3 | 1 · 1 · 2 · 1 | ordering: a proto-industrial chain, the weavers' decline, Indian factories 1854–1914 |
| map | 2 | 3 each | **practice** on `india-political`: Surat, Masulipatnam, Hooghly; Bombay, Ahmedabad, Kanpur |
| short | 8 + 5 | 2 / 3 | `word_limit` 25–40 / 40–60 |
| long | 6 | 5 | includes evaluating "hand labour made better business sense" (d4) and comparing hand-producers in Britain and India (d4) |
| source-based | 4 | 4 | a weavers' petition near Santipur (1790s), a bookbinder's wife's letter in London (1846), a Ratnagiri mill worker's notebook in Bombay (1912), a jute-mill manager's wartime report (1916) |
| case-based | 1 | 4 | two imagined advertisements (a Manchester label with a goddess, about 1895; an Ahmedabad swadeshi poster, about 1925) |

- Difficulty d1/d2/d3/d4 = 12/33/28/2. Competency: recall 13, understanding 27, application 7, analysis 26, evaluation 2 — **47% of items and 59% of marks at application or above**.
- MCQ keys a7 b7 c7 d7; T/F 3 true, 1 false.
- **Tests** are disjoint and use no deck-check item. Short = A 3 MCQ + 1 A-R; B 2 + 2 + 3; C one of two 5-mark; D the mill worker's notebook. Long = A 8 MCQ + 2 A-R; B 2 + 2 + (2|2) + 3 + (3|3); C the weavers and the Company + (5|5); D the weavers' petition and the jute-mill report.

## Sources (all SOYL-original)
Each stem says the source is illustrative and imagined; details are period-true: Santipur as a weaving centre and gomasthas with peons; seasonal bookbinding before Christmas and railway building in 1840s London; Ratnagiri men in Bombay mills recruited by a jobber and returning for the harvest; jute sandbags, gunny and tent canvas for the army in 1916, with Manchester cloth scarce in the bazaar.

## Verifier pass (2026-10-27)
- **Facts re-checked:** factories from the 1730s; Arkwright's mill; Watt's engine patented 1781 (as the syllabus textbook dates it) and manufactured by Boulton; Hargreaves' jenny 1764; Surat, Masulipatnam and Hooghly; Company power from the 1760s; gomasthas and advances; British duties and Manchester imports; the American Civil War and raw-cotton prices; Bombay mill 1854, Bengal jute mill 1855, Kanpur and Ahmedabad in the 1860s, Madras 1874, Jamshedpur steel 1912, Hukumchand's jute mill 1917; swadeshi from 1905; yarn exports to China falling from 1906; the First World War; the fly shuttle.
- One draft model answer named the wrong Parsi merchant (Jamsetjee Jeejeebhoy for Jamsetji Tata) and was corrected.
- Answer-leak scan and pipeline lint/verify: 0 errors, 0 warnings, 0 flags.

## Gaps
- Map items are practice only (the chapter has no board map work) and cannot show answers on a map until `MapPlace` has coordinates.
- Only two items are at d4 and none at d5, in keeping with periodic-test style; add harder items if the chapter is ever restored to the board paper.
- Product question for the Lead: board-mock and custom-test assembly should exclude this chapter (and the project-only topics of ch03, ch12 and ch21) from board-pattern papers; nothing in the item stems prevents that today except the syllabus flag.
