# ICSE Class 9 History & Civics, Chapter 12 — Medieval India: The Delhi Sultanate

`icse-9-history-civics-ch12` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` (the shared lib's default; drafted by Sonnet 5.5 under D-050) · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) for the ICSE Class 9 History & Civics syllabus. Built from `src/` with the shared lib `../icse-9-history-civics-ch01/src/lib.mjs` (imported, not edited). From `platform/`: `npx tsx content/authored/social-science/icse-9-history-civics-ch12/src/build.mjs`. The build checks the schema, the pipeline lint, the deterministic verify checks, the originality pre-check, word limits, narration rules, the answer-leak scan and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (22 + 22 slides, 17 + 17 with visuals: 4 SVG figures, the rest tables and flows; 4 checks and 2 worked examples each); notes (7 sections); 32 flashcards; 78 questions |
| `tests.json` | `t_icse9historycivics_ch12_short` (20 marks, 30 min) on `icse-9-default-chapter-test-short`: Section A 4 MCQ + 1 AR + one 2-mark + one 3-mark, Section B one of two 10-mark questions. `t_icse9historycivics_ch12_long` (40 marks, 60 min) on `icse-9-default-chapter-test-long`: Section A 7 MCQ + 1 AR + three 2-mark + two 3-mark, Section B two of three 10-mark questions. The tests share no question and use no deck-check item. |
| `src/` | `questions.mjs` (bank, four SVG figures: dynasties timeline, market-regulation flow, schematic Qutab Minar elevation, schematic Deccan map), `build.mjs` (figures, decks, notes, flashcards, tests) |

## Scope
All six syllabus topics are covered (no removed topics for this chapter):
- t01: inscriptions and the Qutab Minar as sources
- t02: the five dynasties in chronological order
- t03: Alauddin Khalji's market regulations and the Deccan expedition
- t04: his measures against the nobility, military reforms and revenue reforms
- t05: Muhammad bin Tughlaq's transfer of the capital and token currency
- t06: his taxation in the Doab and plans of conquest

Deliberately left out: any quotation of an inscription or chronicle (Barani is only named); the building material of the nearby mosque; individual sultans of the Mamluk, Sayyid and Lodi lines beyond founders and the last Lodi ruler; Firuz Shah Tughlaq's reign beyond the Minar repair; any account of punishments; any present-day political comment. Policies are described by their aims and results.

## Question bank (78 items)

| Type | Count | Notes |
|---|---|---|
| mcq | 29 | Keys a 7, b 7, c 7, d 8 |
| assertion-reason | 6 | ICSE option order; keys b, c, c, c, c, c |
| true-false · fill-blank · match · ordering | 4 · 4 · 5 · 3 | Orderings: the dynasties; the Deccan campaigns; four events across the chapter |
| short 2-mark | 10 | |
| short 3-mark | 7 | |
| long 10-mark | 7 | Each in 3 + 3 + 4 parts, with per-part step marks summing to 10 |
| source-based | 3 | Imagined school heritage-walk notes, an imagined grain merchant's diary, an imagined museum label for token coins. Each has an either/or part (c). |

- **Difficulty:** d1 2, d2 21, d3 42, d4 13.
- **Competency:** recall 21, understanding 20, application 16, analysis 16, evaluation 5. That puts 47% of items at application or above.
- **Topic spread** (items tagged with more than one topic count in each): t01 14, t02 10, t03 18, t04 14, t05 15, t06 12.

## Tests (item keys)
- Short: A = `m_minar_firuz`, `m_longest`, `m_market_end`, `m_token_fail`, `ar_reforms`, `s_conquest`, `s3_military`; B = attempt 1 of `l_market`, `l_capital`.
- Long: A = `m_minar_height`, `m_start1206`, `m_shahna`, `m_diary_goods`, `m_dagh`, `m_capital_reason`, `m_khurasan`, `ar_token`, `s_inscr`, `s_nobility`, `s_cap_fail`, `s3_deccan`, `s3_debate`; B = attempt 2 of `l_sources`, `l_nobility`, `l_doab`.
- Deck-check items (not in either test): `mt_sources`, `ord_dynasties`, `ar_market`, `mt_deccan`, `tf_nobles`, `mt_terms`, `m_token_reason`, `fb_doab`.

## How verified
- Build prints `NO ERRORS`, lint 0 errors and 0 warnings; run three times, `release.json` and `tests.json` byte-identical (md5); no `*.wip.json` left.
- Near-duplicate scan (0 flags against 29,625 other stems) and SVG label overflow and overlap scan (4 figures, 0 issues).
- Every stem is specific to an imagined diary, label, club, school, coin room, village or market (Nihal, Govind, Ms. Kavya, Rukn, Rahim, Naya Kheda, Ghazipur Khurd, Sarai Rohan), to stay clear of CBSE 7 History wording. Nothing is quoted from any inscription or chronicle.

## Facts for a reviewer to double-check
1. **Sources.** Arabic and Persian inscriptions on monuments and coins record builders, dates and titles. Chronicles such as the history by Ziauddin Barani are named, never quoted.
2. **Qutab Minar (Qutb Minar), Delhi.** Begun by Qutbuddin Aibak about 1199; upper storeys completed by Iltutmish; repaired and raised later, including by Firuz Shah Tughlaq after lightning damage; about 72.5 m high; red and buff sandstone and marble; bands of carved inscriptions; part of the UNESCO World Heritage Site "Qutb Minar and its Monuments", listed 1993. The nearby mosque is not discussed.
3. **Five storeys.** The sketch shows five storeys with balconies. The brackets (lowest storey: Aibak; upper storeys: Iltutmish) are schematic and the storey divisions are approximate; later repairs are noted without assigning a storey.
4. **Dynasties and years (as commonly taught):** Mamluk (Slave or Ilbari) 1206 to 1290; Khalji 1290 to 1320; Tughlaq 1320 to 1414; Sayyid 1414 to 1451; Lodi 1451 to 1526, ending at the First Battle of Panipat. The code asserts that each dynasty ends where the next begins. Derived lengths used in a question: about 84, 30, 94, 37 and 75 years.
5. **Founders named:** Qutbuddin Aibak (Mamluk, first sultan), Jalaluddin Khalji, Ghiyasuddin Tughlaq, Khizr Khan (Sayyid), Bahlul Lodi. Ibrahim Lodi is the last Lodi ruler, defeated by Babur at the First Battle of Panipat, 1526.
6. **Alauddin Khalji** ruled about 1296 to 1316.
7. **Market regulations.** Aim: to maintain a large standing army on modest salaries, especially against Mongol raids. Fixed prices for grain, cloth, horses and other goods; separate markets; a market superintendent (shahna-i-mandi); state granaries; registration of merchants; spies reporting on traders; strict penalties for cheating on weights (no detail). Results: stable prices in Delhi during his reign; the system ended after him.
8. **Deccan expedition**, led by Malik Kafur: Devagiri (Yadavas) about 1307 to 08; Warangal (Kakatiyas) about 1309 to 10; Dwarasamudra (Hoysalas) about 1311; Madurai (Pandyas) about 1311. Aim: wealth and tribute rather than direct annexation (mostly). Results: great wealth for Delhi; the southern kingdoms accepted overlordship. The map marks the order of campaigns, not the exact routes.
9. **Nobility.** Feasts and gatherings of nobles, and marriages between noble families, only with permission; a ban on liquor; a spy system; grants and gifts of land taken back.
10. **Military reforms.** A permanent standing army paid in cash; dagh (branding of horses); huliya or chehra (descriptive roll of soldiers); forts strengthened against the Mongols.
11. **Revenue reforms.** Measurement of land; land tax raised to about half of the produce in the Doab; collection in cash or kind; curbs on the privileges of khuts, muqaddams and chaudharis. Quiz arithmetic: half of 80 quintals is 40.
12. **Muhammad bin Tughlaq** ruled about 1325 to 1351.
13. **Transfer of the capital**, about 1327, from Delhi to Devagiri, renamed Daulatabad. Reasons as commonly taught: a central location to control the south; safety from Mongol raids. Failure: hardship of the long journey, distance from the north-west frontier, and the return to Delhi.
14. **Token currency**, about 1329 to 30: bronze or copper coins valued like silver tankas, as commonly taught at a time of silver shortage. Failure: easy forgery, loss of trust; coins withdrawn and exchanged by the treasury.
15. **Taxation in the Doab.** The increase came at a time of famine and led to unrest and the flight of peasants; later relief measures (loans, wells) came late.
16. **Plans of conquest.** Khurasan: an army raised and then disbanded. Qarachil (Kumaon hills region): an expedition that suffered heavy losses.
17. **Debate.** Some historians see a far-sighted ruler whose plans were poorly carried out; others see impractical plans. Both are presented as views of historians.
18. **Quiz arithmetic:** a 1 to 100 model of a 72.5 m tower is 0.725 m, which is 72.5 cm (`m_minar_height`).
19. **Event order used in `ord_events`:** Minar begun about 1199, march on Devagiri about 1307 to 08, capital moved about 1327, First Battle of Panipat 1526.

## Unsure / gaps
- Which storeys Aibak, Iltutmish and Firuz Shah Tughlaq built or rebuilt is not stated beyond "lowest storey" and "upper storeys"; books differ.
- The dates of the Deccan campaigns, the capital transfer and the token currency are the commonly taught approximate ones and vary by a year or two in books.
- The reasons given for the token currency (silver shortage) and the capital transfer are the commonly taught ones; scholars discuss others.
- The Doab tax rate is given as about half; books vary slightly on the exact share and on whether it applied to the Doab only.
- That Alauddin's rules on nobles aimed to prevent plots is a commonly taught motive, stated once in a solution; the rest of the chapter keeps to the measures themselves.
- Name spellings vary (Qutab or Qutb; Khalji or Khilji). The syllabus spellings are used where it gives one (the syllabus writes "Khilji" in topic titles; the chapter uses "Khalji", as in the brief).
- No past-paper or specimen item was consulted.
