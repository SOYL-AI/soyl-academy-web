# CBSE Class 10 Social Science, Chapter 10 — Minerals and Energy Resources

`cbse-10-social-science-ch10` · release v1 · academic year 2026-27 · family `social-science` (Geography) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored to the Geography standard set by `cbse-10-social-science-ch06` and `-ch07` (D-025, D-026, D-032), following `platform/content-templates/prompts/social-science/*.v1.md`.

| File | What |
|---|---|
| `release.json` | 2 decks (19 + 19 slides), notes (5 sections, 5 visuals), 34 flashcards, 132 questions (233 marks; 24 passage parts and alternatives) |
| `tests.json` | `t_cbse10sst_ch10_short` (20 marks, 40 min) and `t_cbse10sst_ch10_long` (40 marks, 90 min), `blueprint_id` set to the SST chapter-test blueprints |

## Scope
Syllabus chapter 10, all five topics (none removed or formative-only):

| Topic | Deck | Items tagged |
|---|---|---|
| t01 Minerals and their modes of occurrence | Part 1 | 18 |
| t02 Ferrous, non-ferrous and non-metallic minerals (incl. iron-ore mines on the map) | Part 1 | 30 |
| t03 Conservation of minerals | Part 1 | 18 |
| t04 Conventional sources of energy (incl. coal mines, oil fields and power plants on the map) | Part 2 | 43 |
| t05 Non-conventional sources of energy and conservation of energy | Part 2 | 37 |

**Map work.** Two lists apply, and they are treated differently:
- **Power plants (board map list, locate and label):** thermal — Namrup, Singrauli, Ramagundam; nuclear — Narora, Kakrapar, Tarapur, Kalpakkam. Seven 1-mark `map` items (`kind: "power-plant"`). Both chapter tests replace one 2-mark short answer with two of them (short: Tarapur, Ramagundam; long: Narora, Namrup).
- **Mines and oil fields (named in the catalog syllabus learning outcomes):** iron ore — Mayurbhanj, Durg, Bailadila, Ballari, Kudremukh; coal — Raniganj, Bokaro, Talcher, Neyveli; oil — Digboi, Naharkatiya, Mumbai High, Bassein, Kalol, Ankleshwar. Seven multi-place items (15 places, 1 mark per place). Recent CBSE map lists for this chapter have carried only the power plants, so these items are **kept out of the chapter tests** and the stems are not labelled as board items; the Lead should confirm against the 2026-27 CBSE map list (see the batch handoff).

## Decks
- **Part 1 — Minerals (19 slides):** minerals, rocks and ores; five modes of occurrence (table); where India's minerals are; classifying minerals (tree); iron ore belts (table); manganese, copper and bauxite; mica and limestone; why conserve (flow); conservation and the hazards of mining.
- **Part 2 — Energy (19 slides):** conventional and non-conventional sources; coal grades (flow); where India's coal is; how oil and gas are trapped (layer flow labelled "schematic order, not to scale"); petroleum and gas in India; hydel, thermal and nuclear electricity; the electricity mix of an imagined state (bar plot, categories named in the caption); why look beyond fossil fuels; six non-conventional sources (table); conserving energy.
- Worked examples (5): classifying minerals from clues, locating iron-ore mines, reading a mining data table (line plot of imagined ore grades: 2.0 → 1.0 per cent copper, ore needed doubles), locating the seven power plants, planning a 5-mark comparison. Four checks per deck. 28 of 38 slides carry a visual (17 tables, 9 flows, 2 plots).

## Question bank (132 items)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 52 | 1 | 13 on imagined scenes or data (a prospector panning gold, a sixty-year-old mine, a cement plant site, two copper deposits, a drilling crew striking gas, a coalfield's reserve life, an island energy plan, a remote solar village) |
| assertion-reason | 13 | 1 | keys a4 b2 c4 d3 |
| true-false · fill-blank · match | 3 · 2 · 2 | 1 · 1 · 2 | match columns shuffled |
| ordering | 2 | 1 | grades of coal by carbon, steps of tidal generation; shown shuffled |
| map | 14 | 22 | 7 power plants (board list) + 7 mine and oil-field items (15 places) |
| short | 17 + 14 | 2 / 3 | `word_limit` 25–40 and 40–60 |
| long | 7 | 5 | describe (modes, iron ore, non-conventional sources), analyse (minerals as finite; coal and petroleum compared), apply (a coastal state's energy plan), evaluate (phasing out coal, d5) |
| case-based | 3 | 4 = 1 + 1 + 2 | an imagined iron-ore mine (grade, depth, cost: +140 per cent), a village fuel survey (70 per cent firewood or dung cake), a state's electricity mix (coal 60 per cent; solar, wind and nuclear 28 per cent) |
| source-based | 3 | 4 | a doctor's letter from a Jharkhand mining town (1998), a Karnataka woman farmer on her gobar gas plant (2012), a newspaper report on wind farms near Nagercoil (2011) |

- Difficulty d1/d2/d3/d4/d5 = 9/62/52/8/1. Competency: recall 28, understanding 38, application 32, analysis 27, evaluation 7 — **application or higher is 50% of items and 56% of marks**.
- MCQ keys a13 b13 c13 d13.
- **Tests:** short = A 3 MCQ + 1 A-R; B 2 + map + map + 3; C one of two 5-mark; D the doctor's letter. Long = A 8 MCQ + 2 A-R; B 2 + map + map + (2|2) + 3 + (3|3); C 5 + (5|5); D the gobar gas and wind-farm sources. Tests are disjoint and use no deck-check item.

## Cases and sources (all SOYL-original)
Every passage has `passage_origin: "soyl-original"` and a stem label saying it is illustrative or imagined. Figures are invented and consistent: cost ₹500 → ₹1,200 (+700, 140 per cent) as depth rose 40 → 150 m and grade fell 64 → 55 per cent; fuel survey 90 + 50 = 140 of 200 households (70 per cent); generation 60,000 + 12,000 + 15,000 + 9,000 + 4,000 = 100,000 GWh (coal 60 per cent; solar + wind + nuclear 28 per cent, with hydel correctly counted as conventional); reserve lives 600 ÷ 20 = 30 and 600 ÷ 40 = 15 years, 900 ÷ 30 = 30 years; deck plot shares 55 + 14 + 17 + 10 + 4 = 100. No volatile statistic (production shares of Mumbai High, Gujarat and Assam; installed capacities; national rankings; "largest solar plant") is stated as current; Kudremukh is described in the past tense ("was developed as a 100 per cent export unit").

## Verifier pass (2026-10-27)
1. **Keys:** every MCQ and A-R re-solved; a script listed each key beside its option text and the letter its solution concludes with (six flags were false positives where a solution also says "so (x) is wrong"; each re-read). One A-R was drafted with key (b) while its solution argued (c) ("gas lies above oil" / "gas is renewable") and was corrected to (c). Thirteen keys moved in code for balance.
2. **Facts re-checked:** modes of occurrence and examples; rat-hole mining and the National Green Tribunal; mineral classification; magnetite (up to about 70 per cent) and hematite (50–60 per cent); the four iron-ore belts (Badampahar, Gua, Noamundi; Bailadila and Visakhapatnam; Ballari and Kudremukh with its slurry pipeline; Goa, Ratnagiri and Marmagao); manganese about 10 kg per tonne of steel; copper at Balaghat, Khetri, Singhbhum; bauxite (Amarkantak, Maikal, Bilaspur–Katni; Odisha's Panchpatmali); mica (Koderma–Gaya–Hazaribagh, Ajmer, Nellore); limestone; coal grades, Gondwana (200+ million years) and tertiary (about 55 million years) coal, Neyveli lignite; oil traps; Assam as the oldest oil state, Ankleshwar; gas in the Krishna–Godavari basin and the HVJ pipeline; Kopili; uranium and thorium sources; Nagercoil–Madurai and Jaisalmer; tidal sites; Parvati (Manikaran) and Puga geothermal projects. Map places: Namrup (Dibrugarh), Singrauli (Sonbhadra, UP–MP border), Ramagundam (Godavari, Telangana), Narora (Bulandshahr), Kakrapar (near Surat), Tarapur (Palghar; India's first nuclear station), Kalpakkam (south of Chennai); Mayurbhanj, Durg (Dalli-Rajhara for Bhilai), Bailadila (Dantewada), Ballari, Kudremukh; Raniganj, Bokaro, Talcher (Angul), Neyveli (Cuddalore); Digboi (Tinsukia), Naharkatiya, Mumbai High and Bassein (offshore), Kalol, Ankleshwar (Bharuch). A draft distance for Mumbai High was removed rather than risk a wrong number.
3. **Originality (textbook-echo scan):** about 40 phrases rewritten, including "homogenous, naturally occurring substance with a definable internal structure", "cracks, crevices, faults or joints … forced upward", "residual mass of weathered material", "not corroded by water", "the finest iron ore … excellent magnetic qualities", "backbone of industrial development", "super high grade", "critically deficient", "clay-like substance", "combines the strength of metals … with extreme lightness", "one of the most indispensable minerals", the mica property list, "dust and noxious fumes", "a bulky material, which loses weight on use" and the nodal-industry list. Key terms students must use (ore, placer, nodal industry, twin benefits, twin planks, 100 per cent export unit) are kept and defined in SOYL's words.
4. **Competency and difficulty:** the first draft was 42% application or above with three items at d4–5. Five recall MCQs, a recall fill-blank and a recall T/F were dropped and thirteen higher-order items added (identifying mica from properties, limiting ore exports, choosing between two deposits, gas struck before oil, an island energy plan, reserve life, two A-R items, export and nuclear for-and-against, coastal nuclear sites, thermal versus hydel siting, a bauxite reserve calculation), reaching 50% of items, 56% of marks and 9 items at d4–5.
5. **Mechanics:** one 3-mark model answer was below the lint band (hyphenated belt names count as single words) and was extended.
6. **Answer-leak check:** no solution or model answer of 60+ characters appears verbatim in decks, notes, flashcards or public question fields.

## Gaps
- The mine and oil-field map items need confirmation against the current CBSE map list (they follow the catalog syllabus learning outcomes); until then they are practice in effect, since no test uses them.
- Map items cannot show answers on a map until `MapPlace` has coordinates.

## Competency audit by assessment-designer (2026-10-27)

Re-read against the rule used for CBSE 10 Maths (D-035 context): a routine, textbook-standard step on given data — a one-step formula numerical, a balanced equation, an electron-dot structure, a named part or a value read off a table — is **understanding**; applying ideas to new situations, interpreting data, explaining observations, analysis and evaluation keep their tags. 1 item tag(s) and 0 case/source-part tag(s) changed to understanding (case items whose parts are now mostly recall/understanding carry `understanding` at the top level). No question text, key, solution or marking scheme changed. Now: recall 28, understanding 39, application 32, analysis 26, evaluation 7 — application or higher 49% of items, 54% of marks (supersedes the competency figures above).
