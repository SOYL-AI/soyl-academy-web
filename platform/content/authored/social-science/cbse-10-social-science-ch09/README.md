# CBSE Class 10 Social Science, Chapter 9 — Agriculture

`cbse-10-social-science-ch09` · release v1 · academic year 2026-27 · family `social-science` (Geography) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored to the Geography standard set by `cbse-10-social-science-ch06` and `-ch07` (D-025, D-026, D-032), following `platform/content-templates/prompts/social-science/*.v1.md`.

| File | What |
|---|---|
| `release.json` | 2 decks (20 + 19 slides), notes (5 sections, 5 visuals), 34 flashcards, 120 questions (208 marks; 24 passage parts and alternatives) |
| `tests.json` | `t_cbse10sst_ch09_short` (20 marks, 40 min) and `t_cbse10sst_ch09_long` (40 marks, 90 min), `blueprint_id` set to the SST chapter-test blueprints |

## Scope
Syllabus chapter 9, all four topics. The rationalised topic "Impact of globalisation on agriculture" is removed in the syllabus and is not covered.

| Topic | Deck | Items tagged |
|---|---|---|
| t01 Types of farming | Part 1 | 26 |
| t02 Cropping pattern and cropping seasons | Part 1 | 17 |
| t03 Major crops: food crops, cash crops and their growing conditions (incl. the crop map list) | Part 2 | 62 |
| t04 Technological and institutional reforms | Part 1 | 31 |

**Map work (board list).** The CBSE Geography map list for this chapter is *identification* of the major areas of rice and wheat and the largest or major producing states of sugarcane, tea, coffee, rubber, cotton and jute. Because `MapPlace` has no coordinates yet, the ten 1-mark `map` items ask the student to **shade and label** the state described by clues (`kind: "crop-area"`): rice (West Bengal, Punjab), wheat (Punjab–Haryana, Madhya Pradesh), sugarcane (Uttar Pradesh), tea (Assam), coffee (Karnataka), rubber (Kerala), cotton (Maharashtra, worded as "largest area under cotton", with Gujarat noted, because the leading producer alternates) and jute (West Bengal). Both chapter tests replace one 2-mark short answer in Section B with two of these items (short: tea, rubber; long: wheat, coffee).

## Decks
- **Part 1 — Types of farming, seasons and reforms (20 slides):** four ways of farming (table), slash and burn and its local names, why plots keep shrinking (flow), commercial and plantation farming, the three seasons (table), where each season matters most, reforms since independence (timeline), the Green Revolution in an imagined district (line plot of imagined yields), protecting farmers from risk.
- **Part 2 — Major crops and the map (19 slides):** rice and wheat compared, rainfall needs of four crops (bar plot of lower limits, categories named in the caption), millets and maize, pulses and sugarcane (nitrogen-fixing flow), oilseed seasons, tea and coffee, rubber and horticulture, cotton and jute, the crop map list with landmarks.
- Worked examples (5): a holdings calculation, a source-based question part by part (jhum), a 5-mark "evaluate" plan on reforms, matching a crop to clues, and shading a crop state on the map. Five checks per deck. 27 of 39 slides carry a visual (18 tables, 7 flows, 2 plots).

## Question bank (120 items)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 48 | 1 | 15 on imagined scenes or data (an inheritance division, a hill tea estate, a monsoon sowing, a dry district, a moneylender, a hailstorm, two states' irrigation and inputs, MSP incentives, a short frost-free season) |
| assertion-reason | 11 | 1 | keys a3 b3 c3 d2 |
| true-false · fill-blank · match | 4 · 2 · 2 | 1 · 1 · 2 | match columns shuffled |
| ordering | 2 | 1 | a farm year from October (rabi → zaid → kharif) and reforms (First Plan → Green Revolution → land development → KCC); shown shuffled |
| map | 10 | 1 | board list (see above) |
| short | 16 + 12 | 2 / 3 | `word_limit` 25–40 and 40–60 |
| long | 7 | 5 | describe (farming types, reforms, two cash crops), compare (rice and wheat), analyse (millets and pulses instead of rice), apply (a village plan), evaluate (the Green Revolution, d5) |
| case-based | 3 | 4 = 1 + 1 + 2 | an imagined family's land over three generations (0.5 ha each), a farm crop calendar (seasons), wheat yields and groundwater depth in an imagined Haryana district (3.5 times) |
| source-based | 3 | 4 | a Mizoram jhum farmer (1985), a Ludhiana farmer's diary (1969), a tea estate manager's letter from Assam (2015) |

- Difficulty d1/d2/d3/d4/d5 = 10/60/38/11/1. Competency: recall 22, understanding 38, application 29, analysis 24, evaluation 7 — **application or higher is 50% of items and 54% of marks**.
- MCQ keys a12 b12 c12 d12; T/F 2/2.
- **Tests:** short = A 3 MCQ + 1 A-R; B 2 + map + map + 3; C one of two 5-mark; D the jhum source. Long = A 8 MCQ + 2 A-R; B 2 + map + map + (2|2) + 3 + (3|3); C 5 + (5|5); D the Ludhiana diary and the tea letter. Tests are disjoint and use no deck-check item.

## Cases and sources (all SOYL-original)
Every passage has `passage_origin: "soyl-original"` and a stem label saying it is illustrative or imagined. Figures are invented and consistent: 6 ha ÷ 12 owners = 0.5 ha; yields 1.2 → 4.2 t/ha = 3.5 times while groundwater fell from 6 m to 24 m; deck examples 9 ÷ 3 ÷ 3 = 1 ha and an imagined yield line (1.1 → 4.0 t/ha). No volatile ranking (world rank in rice, sugarcane, cotton or fruit; state shares of production) is stated as current; the only rankings used are long-stable ones (India the largest producer and consumer of pulses; Uttar Pradesh, Assam, Karnataka, Kerala and West Bengal as the leading sugarcane, tea, coffee, rubber and jute states).

## Verifier pass (2026-10-27)
1. **Keys:** every MCQ and A-R re-solved from the stem; a script listed each key beside its option text and the letter its solution concludes with (four flags were false positives where a solution also says "so (x) is wrong"; each re-read). Fourteen keys moved in code for balance with the builder's `to:` option.
2. **Ambiguity fixed:** a match item had two "rabi" options on the right (gram could match either); barley was replaced by sugarcane ("occupies the land for almost a year").
3. **Facts re-checked:** jhumming (Assam, Meghalaya, Mizoram, Nagaland), pamlou (Manipur), dipa (Bastar, Andamans), milpa, ladang; rice commercial in Punjab and Haryana but subsistence in Odisha; rabi October–December to April–June; kharif with the monsoon to September–October; zaid crops; western temperate cyclones; aus, aman, boro; rice above 25 °C and over 100 cm; wheat 50–75 cm and its two zones; jowar, bajra, ragi soils and states; maize 21–27 °C and rabi maize in Bihar; pulses, arhar as the non-fixing exception; sugarcane 21–27 °C and 75–100 cm and its products; oilseed seasons (sesamum kharif north, rabi south; castor both); tea conditions and areas; Arabica from Yemen and the Baba Budan Hills; rubber over 200 cm and above 25 °C and its areas incl. the Garo hills; cotton 210 frost-free days and 6–8 months; jute and nylon; horticulture pairs; land reform in the First Plan; Green and White Revolutions; crop insurance, Grameen banks, KCC (1998), PAIS, MSP; Bhoodan–Gramdan and Vinoba Bhave. Cotton's "largest producer" was avoided because it alternates between Gujarat and Maharashtra.
4. **Originality (textbook-echo scan):** about 45 phrases rewritten, including the definitions of primitive and intensive subsistence farming ("high doses of biochemical inputs", "maximum output from the limited land"), "clear a fresh patch", "cereals and other food crops", "higher doses of modern inputs", "the degree of commercialisation … varies", "interface of agriculture and industry", "dense network of canal irrigation and tubewells", "moist areas which hardly needs irrigation", "rich in iron, calcium, other micro nutrients and roughage", "largest producer as well as the consumer of pulses", "leguminous crops … restoring soil fertility", "manual labour from sowing to harvesting", the tea conditions sentence, "even today its cultivation is confined to the Nilgiri", "equatorial crop, but under special conditions", "original home of the cotton plant", "soils are renewed every year", "synthetic fibres and packing materials", "were given priority", "concentration of development in few selected areas" and "exploitation of farmers by speculators and middlemen".
5. **Competency and difficulty:** the first draft was 44% application or above (49% of marks) with six items at d4–5. Three recall MCQs and a recall fill-blank were dropped and ten higher-order items added (two-state data diagnosis, a jhum policy choice, the effect of MSP on crop choice, a frost-limited district, a "coarse grains" A-R, a jhum ban for and against, plantation versus subsistence markets, why the Green Revolution was regional, jute's future, reforms for an Odisha farmer), reaching 50% of items, 54% of marks and 12 items at d4–5.
6. **Mechanics:** one 3-mark model answer was below the lint band (28 words) and was extended; a rewrite briefly broke a source file with an unescaped apostrophe (caught by the build).
7. **Answer-leak check:** no solution or model answer of 60+ characters appears verbatim in decks, notes, flashcards or public question fields.

## Gaps
- Crop map items are "shade and label" approximations of the board's "identify" format until map geometry exists.
- Current production rankings and shares are deliberately left out (volatile); reviewers may add a dated data note.

## Added by assessment-designer (2026-10-27)

1 Geography map question (3 marks, three crop states: q_cbse10sst_ch09_121) for the full mocks' Q19. Original wording; places from the CBSE 2026-27 map list; `map_id: india-political`.

## Competency audit by assessment-designer (2026-10-27)

Re-read against the rule used for CBSE 10 Maths (D-035 context): a routine, textbook-standard step on given data — a one-step formula numerical, a balanced equation, an electron-dot structure, a named part or a value read off a table — is **understanding**; applying ideas to new situations, interpreting data, explaining observations, analysis and evaluation keep their tags. 0 item tag(s) and 2 case/source-part tag(s) changed to understanding (case items whose parts are now mostly recall/understanding carry `understanding` at the top level). No question text, key, solution or marking scheme changed. Now: recall 22, understanding 38, application 30, analysis 24, evaluation 7 — application or higher 50% of items, 55% of marks (supersedes the competency figures above).
