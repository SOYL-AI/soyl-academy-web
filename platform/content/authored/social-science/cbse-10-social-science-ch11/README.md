# CBSE Class 10 Social Science, Chapter 11 — Manufacturing Industries

`cbse-10-social-science-ch11` · release v1 · academic year 2026-27 · family `social-science` (Geography) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored to the Geography standard set by `cbse-10-social-science-ch06` and `-ch07` (D-025, D-026, D-032), following `platform/content-templates/prompts/social-science/*.v1.md`.

| File | What |
|---|---|
| `release.json` | 2 decks (20 + 18 slides), notes (5 sections, 6 visuals), 35 flashcards, 136 questions (243 marks; 24 passage parts and alternatives) |
| `tests.json` | `t_cbse10sst_ch11_short` (20 marks, 40 min) and `t_cbse10sst_ch11_long` (40 marks, 90 min), `blueprint_id` set to the SST chapter-test blueprints |

## Scope
Syllabus chapter 11, all four topics (none removed or formative-only):

| Topic | Deck | Items tagged |
|---|---|---|
| t01 Importance of manufacturing and industrial location | Part 1 | 24 |
| t02 Classification of industries | Part 1 | 20 |
| t03 Agro-based and mineral-based industries (incl. the map list) | Parts 1 and 2 | 86 |
| t04 Industrial pollution and environmental degradation | Part 2 | 23 |

**Map work (board list, locate and label).** Cotton textile centres (Mumbai, Indore, Surat, Kanpur, Coimbatore) and iron and steel plants (Durgapur, Bokaro, Jamshedpur, Bhilai, Vijayanagar, Salem) each have a 1-mark `map` item; the eight software technology parks (Noida, Gandhinagar, Mumbai, Pune, Hyderabad, Bengaluru, Chennai, Thiruvananthapuram) are in four two-place items. Both chapter tests replace one 2-mark short answer with two 1-mark items (short: Surat, Bhilai; long: Jamshedpur, Coimbatore).

## Decks
- **Part 1 — Location, classification and agro-based industries (20 slides):** why manufacturing matters (flow), farms and factories, where a factory should go (least cost and agglomeration flow), the colonial pattern, five bases of classification (table), the textile chain, cotton textiles (history, location, strengths and problems), jute (location flow, Partition, Jute Policy 2005), sugar.
- **Part 2 — Mineral-based industries and pollution (18 slides):** how steel is made, iron and steel in India (integrated vs mini), aluminium, chemicals and fertilisers, cement and automobiles, IT and software parks, kinds of industrial pollution, control measures, NTPC.
- Worked examples (5): classifying a cooperative sugar mill five ways, locating cotton centres, locating steel plants, planning a 5-mark "describe an industry" answer, reading a pollution data table (bar plot of imagined figures: 60 → 24, a 60 per cent fall). Four checks per deck. 28 of 38 slides carry a visual (17 tables, 10 flows, 1 plot).

## Question bank (136 items)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 53 | 1 | 11 on imagined scenes or data (three factory sites, a growers' sugar mill, a plastic-bag ban, a power station's hot water, a stone-cutting unit, a dyeing cluster, a slag dump, a mill's seasonal output, a family fan company) |
| assertion-reason | 13 | 1 | keys a5 b3 c2 d3 |
| true-false · fill-blank · match | 3 · 1 · 2 | 1 · 1 · 2 | match columns shuffled |
| ordering | 2 | 1 | industrial milestones (1854 → 1855 → 1904 → 2005) and effluent treatment stages; shown shuffled |
| map | 15 | 19 | board list (see above) |
| short | 17 + 15 | 2 / 3 | `word_limit` 25–40 and 40–60 |
| long | 9 | 5 | describe (importance, cotton textiles, iron and steel, pollution), compare (agro- vs mineral-based), apply (pollution controls at a power station; an industrial estate in a backward district), analyse (industries pulled to their key input), evaluate (growth versus environment, d5) |
| case-based | 3 | 4 = 1 + 1 + 2 | aluminium smelter site costs (₹3,200 at the cheapest site), two sugar mills (103,500 t), a river's pollution index before and after a treatment plant (62.5 per cent fall) |
| source-based | 3 | 4 | a Tamil Nadu handloom weaver (1996), a Hugli jute mill manager after Partition (1948), a resident's letter about a chemical factory (2010) |

- Difficulty d1/d2/d3/d4/d5 = 8/73/44/10/1. Competency: recall 15, understanding 52, application 32, analysis 30, evaluation 7 — **application or higher is 51% of items and 53% of marks**.
- MCQ keys a13 b14 c13 d13.
- **Tests:** short = A 3 MCQ + 1 A-R; B 2 + map + map + 3; C one of two 5-mark; D the weaver source. Long = A 8 MCQ + 2 A-R; B 2 + map + map + (2|2) + 3 + (3|3); C 5 + (5|5); D the jute mill and resident sources. Tests are disjoint and use no deck-check item.

## Cases and sources (all SOYL-original)
Every passage has `passage_origin: "soyl-original"` and a stem label saying it is illustrative or imagined. Figures are invented and consistent: site totals 600 + 2,500 + 300 = 3,400; 200 + 3,000 + 500 = 3,700; 900 + 1,900 + 400 = 3,200; sugar 5,000 × 180 × 0.115 = 103,500 t (Mill N 66,500 t, not asked); pollution 80 → 30 (−62.5 per cent) against 10 upstream; MCQ 4,000 × 150 × 0.10 = 60,000 t; deck 60 → 24 (−60 per cent). No volatile statistic (GDP shares, world ranks in steel, sugar or chemicals, number of fertiliser units, the small-scale investment ceiling) is stated as current. The pollution source is set in an imagined town; the Bhopal disaster is not used as a practice passage.

## Verifier pass (2026-10-27)
1. **Keys:** every MCQ and A-R re-solved; a script listed each key beside its option text and the letter its solution concludes with (three flags were phrasing false positives, re-read). Seventeen keys moved in code for balance.
2. **Facts re-checked:** importance of manufacturing; location factors and agglomeration; colonial port-city pattern; classification and ownership examples (BHEL, SAIL; TISCO, Bajaj Auto, Dabur; Oil India Ltd.; Maharashtra sugar, Kerala coir); textiles' complete value chain; first cotton mill Mumbai 1854; first jute mill Rishra 1855; Partition and jute areas; National Jute Policy 2005; sugar's shift to Maharashtra; steel raw materials 4 : 2 : 1; integrated and mini plants; SAIL; Chotanagpur concentration and problems; aluminium properties and location; inorganic and organic chemicals; fertilisers and imported potash; cement (Chennai 1904, decontrol 1989, Gujarat to the Gulf); automobile centres; Bengaluru as electronic capital; pollution types and controls; three-stage effluent treatment; NTPC measures. Map places: Bokaro and Bhilai (Soviet-assisted), Durgapur east of Asansol, Jamshedpur (Tata), Vijayanagar at Toranagallu near Ballari, Salem (stainless steel), and all eight software parks.
3. **Originality (textbook-echo scan):** about 30 phrases rewritten, including the manufacturing definition, "self-reliant and complete in the value chain", "industrialisation and urbanisation go hand in hand", the cotton-belt factor list, "in haulage its sucrose content reduces", the sugar-shift sentence, "index of a country's development", the Chotanagpur advantages, the steel problems list, the aluminium property list and "two prime factors", "stiff competition", "high proportion of undesirable gases", the thermal-pollution definition and "reusing and recycling it in two or more successive stages".
4. **Competency and difficulty:** the first draft was 40% application or above with three items at d4–5. Six recall MCQs, a recall T/F and a recall fill-blank were dropped and eighteen higher-order items added (why steel plants are inland, a seasonal sugar calculation, classifying a fan company, why IT clusters in cities, slag and groundwater, jute's future, a plant in a backward district, three A-R items, IT for and against, why industries went to backward areas, siting a sugar mill, three-source pollution measures, steel versus aluminium location, evaluating cooperatives, an "industries pulled to their key input" analysis and an industrial-estate plan), reaching 51% of items, 53% of marks and 11 items at d4–5.
5. **Mechanics:** a notes table cell using a chemical formula ("SO2-type gases") was replaced with words; a slide heading "Four kinds of pollution" over a five-row table was corrected.
6. **Answer-leak check:** no solution or model answer of 60+ characters appears verbatim in decks, notes, flashcards or public question fields.

## Gaps
- Map items cannot show answers on a map until `MapPlace` has coordinates.
- Current production rankings and shares are deliberately left out (volatile).
