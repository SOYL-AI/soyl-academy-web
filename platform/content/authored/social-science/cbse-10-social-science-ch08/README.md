# CBSE Class 10 Social Science, Chapter 8 — Water Resources

`cbse-10-social-science-ch08` · release v1 · academic year 2026-27 · family `social-science` (Geography) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored to the Geography standard set by `cbse-10-social-science-ch06` and `-ch07` (D-025, D-026, D-032), following `platform/content-templates/prompts/social-science/*.v1.md`.

| File | What |
|---|---|
| `release.json` | 2 decks (21 + 18 slides), notes (5 sections, 6 visuals), 32 flashcards, 114 questions (202 marks; 24 passage parts and alternatives) |
| `tests.json` | `t_cbse10sst_ch08_short` (20 marks, 40 min) and `t_cbse10sst_ch08_long` (40 marks, 90 min), `blueprint_id` set to the SST chapter-test blueprints |

## Scope
Syllabus chapter 8, all three topics (none removed or formative-only):

| Topic | Deck | Items tagged |
|---|---|---|
| t01 Water scarcity and the need for water conservation | Part 1 | 31 |
| t02 Multi-purpose river projects and integrated water resources management (incl. the dam map list) | Parts 1 and 2 | 56 |
| t03 Rainwater harvesting | Part 2 | 40 |

**Map work (board list).** The CBSE Geography map list for this chapter is the eight dams: Salal, Bhakra Nangal, Tehri, Rana Pratap Sagar, Sardar Sarovar, Hirakud, Nagarjuna Sagar and Tungabhadra (locate and label). Each has a 1-mark `map` item on `india-political` with a river-and-state clue (`kind: "dam"`, accepted spellings listed). As in ch06, both chapter tests replace one 2-mark short answer in Section B with two 1-mark map items (short: Hirakud, Sardar Sarovar; long: Salal, Nagarjuna Sagar).

## Decks
- **Part 1 — Scarcity and multi-purpose projects (21 slides):** how little water is fresh (storage table), the water cycle (flow), four kinds of scarcity, causes (flow), why conserve, water works through history (timeline), what a dam is, one reservoir and many purposes (flow), "temples of modern India", costs to rivers (flow), costs to people and conflicts (Koyna, Sabarmati, 2006 floods), Sardar Sarovar and the Narmada Bachao Andolan (both sides).
- **Part 2 — Dams on the map and rainwater harvesting (18 slides):** the eight dams with river, state and landmark, why look beyond big dams, traditional methods by region, how a tanka works (flow), tanka details, a tradition under change (Indira Gandhi Canal), bamboo drip irrigation, modern rooftop harvesting (Tamil Nadu, Shillong).
- Worked examples (5): reading a water-use table (percentage and shortfall), planning a 5-mark "assess" answer, locating a dam from a clue, a rooftop-harvesting calculation (bar plot of imagined figures, categories named in the caption), and a source-based question part by part. Four checks per deck. 29 of 39 slides carry a visual (16 tables, 12 flows, 1 plot).

## Question bank (114 items)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 45 | 1 | 16 on imagined scenes or data (a fast-growing city, deepening tube wells, a gated colony and a tanker queue, white crusts after canal irrigation, two districts with different kinds of scarcity, a school roof); statement-combination and "not" forms |
| assertion-reason | 10 | 1 | keys a4 b2 c2 d2 |
| true-false · fill-blank · match | 4 · 2 · 2 | 1 · 1 · 2 | match columns shuffled |
| ordering | 2 | 1 | water history (Mauryan works → Sringaverapura → Bhopal lake → Bhakra Nangal) and the tanka sequence; shown shuffled |
| map | 8 | 1 | board list (see above) |
| short | 16 + 12 | 2 / 3 | `word_limit` 25–40 and 40–60 |
| long | 7 | 5 | describe, analyse (resistance to dams), compare (dams vs harvesting), apply (a district water plan, a household plan), evaluate ("temples of modern India", d5) |
| case-based | 3 | 4 = 1 + 1 + 2 | an imagined district water budget (two numerical parts), reservoir storage lost to silt (percentage), a household rooftop plan (litres and days) |
| source-based | 3 | 4 | two voices at an imagined 1993 dam hearing (downstream farmer and upstream villager), a Phalodi grandmother's tanka memories, a teacher's letter on canal irrigation, salinity and the social gap |

- Difficulty d1/d2/d3/d4/d5 = 9/54/40/10/1. Competency: recall 27, understanding 30, application 26, analysis 25, evaluation 6 — **application or higher is 50% of items and 57% of marks**.
- MCQ keys a11 b11 c12 d11; T/F 2/2.
- **Tests:** short = A 3 MCQ + 1 A-R; B 2 + map + map + 3; C one of two 5-mark; D the dam-hearing source. Long = A 8 MCQ + 2 A-R; B 2 + map + map + (2|2) + 3 + (3|3); C 5 + (5|5); D the tanka and canal-letter sources. Tests are disjoint and use no deck-check item.

## Cases and sources (all SOYL-original)
Every passage has `passage_origin: "soyl-original"` and a stem label saying it is illustrative or imagined. Figures are invented, labelled and internally consistent: water budget 720 + 120 + 90 + 70 = 1,000 against 500 + 380 = 880 supply (irrigation 72 per cent, shortfall 120); reservoir 2,000 → 1,600 (20 per cent lost); roof 100 × 0.8 × 0.8 = 64 cubic metres = 64,000 litres = 160 days at 400 litres; deck examples 300 ÷ 400 = 75 per cent, 400 − 340 = 60, and 60 × 1 × 0.75 = 45 cubic metres. No volatile statistic (current per-person availability, rankings, projections) is stated as current fact; the dam hearing presents both a downstream beneficiary and a displaced villager.

## Verifier pass (2026-10-27)
1. **Keys:** every MCQ and A-R re-solved from the stem; a script listed each key beside its option text and the letter its solution concludes with (all agree). Thirteen keys were moved in code for balance with the builder's `to:` option, which swaps the option and every letter in the solution together; each moved solution was re-read.
2. **Facts re-checked:** 96.5 per cent oceans, about 2.5 per cent fresh, about 70 per cent of that in ice and most of the rest groundwater; India about 4 per cent of world precipitation; irrigation as the largest user; Sringaverapura (about the first century BCE), Mauryan works, Kalinga, Nagarjunakonda, Bennur, Kolhapur, the eleventh-century Bhopal lake; Bhakra Nangal (Sutlej–Beas, power and irrigation, completed in the 1960s), Hirakud (Mahanadi, flood control), Sardar Sarovar (Narmada; Gujarat, Maharashtra, Madhya Pradesh, Rajasthan); Koyna in the Krishna basin and the Karnataka–Andhra Pradesh objection; the Sabarmati basin conflict; the 2006 Maharashtra and Gujarat floods; the Narmada Bachao Andolan's two phases; guls/kuls, inundation channels, khadins (Jaisalmer) and johads, tankas (Bikaner, Phalodi, Barmer), palar pani, the Indira Gandhi Canal, bamboo drip irrigation (Meghalaya, about 200 years), Tamil Nadu's compulsory rooftop harvesting, Shillong; Tamil Nadu's north-east monsoon rain (A-R). Map: Salal (Chenab, Reasi), Bhakra (Sutlej, Bilaspur, Govind Sagar; Nangal in Punjab), Tehri (Bhagirathi, north-east of Rishikesh — a draft said north-west and was corrected), Rana Pratap Sagar (Chambal, Rawatbhata), Sardar Sarovar (Kevadia), Hirakud (Sambalpur), Nagarjuna Sagar (Krishna, Telangana–Andhra Pradesh border), Tungabhadra (Hosapete). The medieval Hauz Khas tank was left out because the textbook's builder attribution is disputed.
3. **Originality (textbook-echo scan):** about 30 phrases rewritten, including the dam definition ("obstructs, directs or retards"), the four reasons for conservation, "rockier stream beds and poorer habitats", the Narmada Bachao Andolan's membership list, Nehru's "integrate development of agriculture and the village economy", "integrates conservation of water with flood control", "agricultural fields converted into rain-fed storage", "diversion channels like the guls", "underground rooms … to beat the summer heat", "the purest form of natural water", the Koyna objection wording and "punish the defaulters". The textbook's Gendathur figures (which do not add up) and Phalodi tank dimensions were not used.
4. **Competency and difficulty:** the first draft was 44% application or above. Three recall MCQs, a recall fill-blank and a recall T/F were dropped, and eight higher-order items added (two-district diagnosis, basin-dispute analogy, evaluating "harvesting can replace dams", crop choice, a quality A-R, compulsory harvesting for and against, a "flood-control dam floods a town" case, a two-village comparison), reaching 50% of items, 57% of marks and 11 items at d4–5.
5. **Mechanics:** a "data:" word–colon pair in a narration and an alt text tripped the link filter in the scratch validator and was reworded; one 2-mark model answer was trimmed to 40 words after rewriting.
6. **Answer-leak check:** no solution or model answer of 60+ characters appears verbatim in decks, notes, flashcards or public question fields.

## Gaps
- Map items cannot show the answer on a map until `MapPlace` has coordinates; dams are described by river-and-state clues, so the board's "identify the feature marked A" format is not yet possible.
- No drawn map of India is used anywhere; the dam table and landmarks stand in for a map in the decks.

## Added by assessment-designer (2026-10-27)

1 Geography map question (3 marks, three dams: q_cbse10sst_ch08_115) for the full mocks' Q19. Original wording; places from the CBSE 2026-27 map list; `map_id: india-political`.
