# ICSE Class 9 History & Civics, Chapter 9 — The Sangam Age

`icse-9-history-civics-ch09` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` (the shared lib's default; drafted by Sonnet 5.5 under D-050) · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) for the ICSE Class 9 History & Civics syllabus. Built from `src/` with the shared lib `../icse-9-history-civics-ch01/src/lib.mjs` (imported, not edited). From `platform/`: `npx tsx content/authored/social-science/icse-9-history-civics-ch09/src/build.mjs`. The build checks the schema, the pipeline lint, the deterministic verify checks, the originality pre-check, word limits, narration rules, the answer-leak scan and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (21 + 22 slides, 15 + 16 with visuals: 4 SVG figures, the rest tables and flows; 5 checks and 2 worked examples each); notes (6 sections); 31 flashcards; 79 questions |
| `tests.json` | `t_icse9historycivics_ch09_short` (20 marks, 30 min) on `icse-9-default-chapter-test-short`: Section A 4 MCQ + 1 AR + one 2-mark + one 3-mark, Section B one of two 10-mark questions. `t_icse9historycivics_ch09_long` (40 marks, 60 min) on `icse-9-default-chapter-test-long`: Section A 7 MCQ + 1 AR + three 2-mark + two 3-mark, Section B two of three 10-mark questions. The tests share no question and use no deck-check item. |
| `src/` | `questions.mjs` (bank, four SVG figures), `build.mjs` (figures, decks, notes, flashcards, tests) |

## Scope
All four syllabus topics are covered (no removed topics for this chapter):
- t01: the Tirukkural, Sangam literature (briefly) and megaliths as sources
- t02: women in Sangam society, including women poets
- t03: agriculture: the five tinai, crops, irrigation, the Kallanai
- t04: trade, ports and links with the Roman world

Deliberately left out: any quotation or translation of a poem, a kural or the Periplus (all are only named or described by theme); disputed claims about regional identity; detail on widowhood beyond one neutral sentence.

## Question bank (79 items)

| Type | Count | Notes |
|---|---|---|
| mcq | 28 | Keys a 7, b 7, c 7, d 7 |
| assertion-reason | 5 | ICSE option order; keys a, d, b, c, c |
| true-false · fill-blank · match · ordering | 4 · 3 · 3 · 2 | Orderings: parts of the Tirukkural; the journey of a sack of pepper |
| short 2-mark | 14 | |
| short 3-mark | 10 | |
| long 10-mark | 7 | Each in 3 + 3 + 4 parts, with per-part step marks summing to 10 |
| source-based | 3 | An imagined trader's ledger, imagined excavation notes, imagined school notes on a village. Each has an either/or part (c). |

- Difficulty: d1 9, d2 22, d3 36, d4 12 (as printed by the build). Competency: recall 17, understanding 24, application 18, analysis 16, evaluation 4, so 48% of items are at application or above.

## Tests (item keys)
- Short: A = `m_kural_parts`, `m_women_work`, `m_tinai_scenario`, `m_imports`, `ar_women_work`, `s_irrigation`, `s3_internal_overseas`; B = attempt 1 of `l_women`, `l_agriculture`.
- Long: A = `m_kural_date`, `m_megalith_goods`, `m_avvaiyar_name`, `m_kallanai`, `m_arikamedu`, `m_coin_hoard`, `m_internal_trade`, `ar_monsoon`, `s_three_sangams`, `s_women_roles`, `s_arikamedu`, `s3_literature_tells`, `s3_agriculture`; B = attempt 2 of `l_sources`, `l_trade`, `l_megaliths`.
- Deck-check items (not in either test): `m_three_kingdoms`, `mt_literature`, `ord_kural_parts`, `m_megalith_type`, `tf_women_poets`, `m_tinai_marutam`, `mt_tinai`, `m_port_muziris`, `ar_roman_coins`, `ord_pepper_route`.

## How verified
- Build prints `NO ERRORS`, lint 0 errors and 0 warnings; run three times, `release.json` and `tests.json` byte-identical (md5); no `*.wip.json` left.
- Near-duplicate scan against all other chapters and exemplars and SVG label overflow and overlap checks run with the producer's `checks.mjs`.
- Every stem is specific to an imagined ledger, museum card, excavation, village or trader, to stay clear of CBSE 6 History wording. No poem, kural or text is quoted.

## Facts for a reviewer to double-check
1. **The Sangam Age: about the 3rd century BCE to the 3rd century CE.** Approximate; books vary; the timeline figure says so.
2. **Three ruling families: Cheras, Cholas, Pandyas.** Regions and ports used: Cheras, west coast, Muziris; Cholas, Kaveri region, Puhar; Pandyas, Madurai area, Korkai.
3. **Three Sangams** (assemblies of poets at Madurai under Pandya patronage) are presented only as tradition, not established fact.
4. **Tirukkural:** attributed to Thiruvalluvar; date debated, often placed between about the 1st century BCE and the 5th century CE; 1,330 couplets (kurals) in 133 chapters of ten; three parts, aram (virtue), porul (wealth and polity), inbam (love); valued as a guide to ethics and conduct. No kural is quoted or translated; themes are paraphrased only.
5. **Sangam literature:** Tolkappiyam (grammar); Ettuthogai (Eight Anthologies); Pattuppattu (Ten Idylls); Silappatikaram and Manimekalai named only, "usually placed just after the Sangam period".
6. The literature tells us about kings, war, trade, landscapes and daily life; the chapter adds that poets often praised patrons.
7. **Megaliths:** stone circles, dolmens, cists and urn burials; Adichanallur in Tamil Nadu is a well-known urn-burial site; grave goods: iron tools and weapons, black-and-red pottery, ornaments. They "suggest" use of iron, belief in life after death and differences in status (hedged throughout). Dolmen is described as a chamber of large stones with a capstone and cist as a box-like grave lined with slabs, which are simplified.
8. **Women:** women poets contributed (Avvaiyar best known; the name was used by more than one poet across periods; Nachchellaiyar; Kakkaipadiniyar); women took part in farming, spinning, weaving and selling goods; education for some women is suggested by the poets; the hardships of widows are described in the poems (stated neutrally and briefly).
9. **Tinai:** kurinji (hills), mullai (forest and pasture), marutam (farmland, the most fertile), neytal (coast), palai (dry land). The small notes in the tinai figure (honey, fishing and salt, herding) are simplifications.
10. **Crops:** rice (main), sugarcane, cotton, millets, pepper, ginger, turmeric, cardamom. The slide notes cotton as a cash crop and millets as grown in drier areas, which are simplifications.
11. **Irrigation** from tanks and rivers. **Kallanai (Grand Anicut)** on the Kaveri is **traditionally attributed** to the Chola king Karikala, about the 2nd century CE (hedged every time).
12. **Trade:** internal trade by barter and markets; overseas trade with the Roman world, South-East Asia and West Asia.
13. **Ports:** Puhar/Kaveripattinam (Chola); Muziris (Chera, Kerala coast); Korkai (Pandya, pearls); Arikamedu near Puducherry (Indo-Roman trading site, excavated in the 1940s). On the schematic map Arikamedu is drawn north of Puhar on the east coast (not to scale, positions approximate).
14. **Exports:** pepper, other spices, pearls, ivory, fine cotton cloth, precious stones. **Imports:** Roman gold and silver coins (hoards found in South India), wine in amphorae, glass, metals.
15. **Yavanas:** Greeks, Romans and other West Asian traders. Monsoon winds helped sailing. The **Periplus of the Erythraean Sea** is mentioned only, as a 1st-century CE Greek guide for sailors that names some of these ports.

## Unsure / gaps
- The Madurai dot on the schematic map is a rough inland position, drawn only to show the Pandya centre of the Sangam tradition.
- Pepper being prized overseas and cotton cloth as an export are standard statements; no figures or amounts are given.
- Roman coin hoards are stated as found in South India without naming sites or dates.
- No past-paper or specimen item was consulted.
