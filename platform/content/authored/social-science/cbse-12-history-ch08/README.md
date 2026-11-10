# CBSE Class 12 History, Chapter 8 — Peasants, Zamindars and the State: Agrarian Society and the Mughal Empire (c. 16th–17th centuries)

`cbse-12-history-ch08` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` (draft written by a writer agent, D-050, for producer review) · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032, D-036). It is built from `src/`: run `npx tsx content/authored/social-science/cbse-12-history-ch08/src/build.mjs` from `platform/`. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan, the exact-stem originality pre-check and the editorial counts;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 21 + 20 slides with 34 visuals (3 SVG: a timeline of the chapter, the village community and its officials, the four classes of land; the rest tables and flows); 7 notes sections; 33 flashcards; 75 questions worth 139 marks, including 15 source parts and 5 alternatives |
| `tests.json` | `t_cbse12history_ch08_short` (20 marks, 40 min) on `cbse-12-history-chapter-test-short`, and `t_cbse12history_ch08_long` (40 marks, 90 min) on `cbse-12-history-chapter-test-long` |
| `src/` | `questions.mjs`, `build.mjs`; the shared library is imported from `../../cbse-12-history-ch01/src/lib.mjs` |

## Scope

All five syllabus topics are covered:
- **t01** Peasants and agricultural production: terms for peasants, khud-kashta and pahi-kashta, holdings, mobility, water, seasons, cash crops, new crops from the Americas (10 tags, plus 6 shared with t05).
- **t02** The village community and women: cultivators, panchayat and headman, caste inequality, artisans' payment, the little-republic debate, women's work, bride-price, petitions, inheritance (14 tags, plus 1 shared).
- **t03** Forests, tribes and zamindars: jangli, peshkash, shikar, forest trade, milkiyat, revenue role, forces in the Ain, patronage and exploitation (15 tags, plus 1 shared).
- **t04** Land revenue and the flow of silver: jama and hasil, zabt, polaj, parauti, chachar and banjar, mansab, zat, sawar and jagir, the flow of silver and its limits as an explanation (21 tags, plus 2 shared).
- **t05** Sources: chronicles (Ain-i Akbari). Carried by the five source-based items (each tagged with its content topic and t05), five t05 items (dating a register, dependent sources, a conflict between provincial and village records, choosing sources, the Ain's limits) and the Ain slides and notes section.

### Decks

- **Part 1:** peasants, the Ain and the village (t01, t02, t05). 21 slides, 3 checks (`m_raiyat`, `fb_ain`, `mt_village`), 3 worked examples (reading crop figures in an imagined 150-bigha village; planning a 5-mark answer on peasants; reading an imagined petition by a potter family).
- **Part 2:** forests, zamindars, revenue and silver (t03, t04). 20 slides, 4 checks (`fb_milkiyat`, `mt_land`, `tf_silver`, `ord_chrono`), 3 worked examples (sorting patronage and exploitation for an imagined zamindar of the lake villages; computing a jama for an imagined village; weighing a rate table against a village register).
- Narration is at most 64 words per slide (mean 47) and uses no symbols or quote marks.
- The worked examples use cases different from the bank (a 150-bigha village against the three villages of `s3_crop_share`; a potter family's petition against `sb_petition` and `s_women_petition`; the lake-village zamindar against `sb_zamindar` and `s3_zam_both`; a 50 + 30 bigha village against `s_land_data` and `sb_register`).

### Question bank (75 items)

| Type | Count |
|---|---|
| mcq | 30 |
| assertion-reason | 7 |
| true-false | 4 |
| fill-blank | 3 (one with two blanks) |
| match | 2 |
| ordering | 2 (a chronology and a cause-and-effect chain) |
| short 2-mark | 10 |
| short 3-mark | 6 |
| long 5-mark | 6 |
| source-based | 5, each with an internal choice in part (c) |

- **Source-based items:** a SOYL summary of what a court history of Akbar's reign contains (the Ain, not named in the passage); an imagined petition to a caste panchayat; an imagined revenue official's note on a zamindar; an imagined village accountant's register with numbers; a SOYL summary of what an Italian traveller reported about silver. Three are imagined documents and two are SOYL summaries (`soyl-original`); nothing is quoted. Part (b) of each is a one-mark inference; parts (c)(i) and (c)(ii) are application or analysis.
- **Map items:** none. **Map work: none (OA-23, owner decision pending); places are named in words only.**
- **Difficulty:** d1 15, d2 28, d3 22, d4 10.
- **Competency:** recall 13, understanding 26, application 9, analysis 24, evaluation 3. That puts 48% of items (36 of 75) at application or above (lint band 45–65%).
- **Competency review (producer):** seven items were retagged to understanding (ids 002, 012, 022, 027, 033, 038, 074: classification from definitions, or points the notes state; difficulty lowered where it looked high). Three items were rewritten in place as higher-order items: 044 (application: what a sale of milkiyat land beside a continuing revenue role suggests about zamindars' rights), 065 (application: reclassifying banjar land that has been sown and its effect on the jama) and 067 (evaluation: how far the revenue system depended on accurate measurement). Source fixes: 069 part (b) is now an inference on the value and the possible bias of a local measurement; 070's passage no longer carries the gloss on foreign merchants paying in silver. Type, marks, topics, ids and test slots are unchanged.
- **Higher-order devices used:** counterfactuals (which finding would weaken or strengthen a link: mobility and land, bride-price and women's work, the little-republic view, zamindar patronage, silver and cash revenue), source fitness (a mint ledger, petitions, a court chronicle of hunts), data interpretation with computed answers (land-class shares, jama against hasil over three years, cash-crop shares, the infantry-to-cavalry ratio, a jama and a collection percentage), dating from clues (an undated household list with chillies and tomatoes; a register that refers to the Ain as finished), dependent sources (a clerk who copied the Ain), a conflict between a provincial count and a village register, alternative explanations of a rise in cash revenue, and an evaluation of how to combine the Ain, local records and a petition.
- **Answer keys:** MCQ keys are a7 b7 c8 d8; assertion-reason keys are a3 b2 c1 d1.

### Tests

| Test | Contents |
|---|---|
| Short | **A:** 3 MCQ (dating a household list with chillies and tomatoes; evidence that would strengthen doubt about little republics; a court chronicle of hunts as evidence) + 1 assertion-reason (silver at a port and cash revenue in the interior). **B:** two 2-mark (a woman's petition to a panchayat; computing a jama and the polaj share) + one 3-mark (cash-crop shares of three villages). **C:** one of two longs (assess the little-republic view with imagined records / assess how far silver explains cash revenue). **D:** the imagined village accountant's register. |
| Long | **A:** 8 MCQ (khud-kashta and pahi-kashta; the three constituents of a village; bride-price and women's work; jangli; the zamindar forces ratio; land-class shares; separating explanations for a rise in cash revenue; a copied account) + 2 assertion-reason (the Ain as an official view; zamindars and conquest). **B:** 2 + 2 + (2 or 2) + 3 + (3 or 3). **C:** a long on peasants + (zamindars / the Ain, local records and a petition). **D:** the summary of the Ain and the imagined revenue official's note on a zamindar. |

- The tests are disjoint and use no deck-check item (deck checks: `m_raiyat`, `fb_ain`, `mt_village`, `fb_milkiyat`, `mt_land`, `tf_silver`, `ord_chrono`).
- Spares used in neither test nor deck: `m_mobility_weaken`, `m_crops_america`, `m_jins`, `m_cashcrop_infer`, `tf_ain_even`, `s_ain_use`, `l_revenue`, `sb_petition`, `sb_careri`, `m_bride_price`, `m_women_inherit`, `m_petition_fit`, `tf_republic`, `ar_panchayat`, `ar_women_work`, `s3_artisan`, `m_jangli_class`, `m_peshkash`, `m_forest_trade`, `m_zam_weaken`, `tf_zam_cult`, `ar_forest`, `s_zamindar`, `m_jama_hasil`, `m_shortfall`, `m_mansab`, `m_silver_weaken`, `m_silver_fit`, `ord_cause`, `fb_amil`, `ar_jama`, `s_revenue`, `s3_silver_alt`, `m_date_register`, `m_ain_conflict`, `s_source_plan`.

## Facts a reviewer should double-check

- **Brief facts used as supplied:** the Ain (Abu'l Fazl, 1598, five revisions, five books and their names, aim, limits); kharif and rabi; Agra 39 and Delhi 43 crops and Bengal 50 varieties of rice; jins-i kamil; American crops via Africa and Spain; khud-kashta and pahi-kashta; the north Indian and Gujarat holdings; the Shah Nahr under Shah Jahan; the three constituents of the village, panchayat powers, the headman and the patwari, halalkhoran, mallahzadas, artisans' payment and miras or watan; women's work, bride-price, remarriage, inheritance and the Rajshahi zamindari; jangli, peshkash, shikar and forest produce; milkiyat, qilachas and the Ain's forces for zamindars (384,558 cavalry, 4,277,057 infantry, 1,863 elephants, 4,260 cannon, 4,500 boats); jama, hasil, amil-guzar, Todar Mal, zabt, the four land classes, zat, sawar and jagir; Careri about 1690.
- **Dates used from general knowledge (not in the brief):** the Americas open to world trade "from 1492"; Akbar reigned 1556 to 1605; Shah Jahan 1628 to 1658. They are used in the timeline figure, the chronology item and one deck narration.
- **`sb_ain` passage:** it says the Ain's tables for each province cover "its revenue, its zamindars and their forces". The brief says the Ain gives zamindars' forces and, for some provinces, their caste and revenue data; please confirm the wording is safe.
- **`m_silver_alt`, `s3_silver_alt` and `l_silver`:** the rival explanations of a rise in cash revenue (more land, higher prices, more silver) and the "other factors" in `l_silver` (the machinery of measurement and assessment, markets for cash crops) are reasoned suggestions, not facts from the brief; they are framed as hypotheses to be tested.
- **Imagined numbers:** the carpenter's plot in `s3_artisan`, the 200-bigha register of `sb_register` and all revenue, hasil and rate figures are imagined. The sums are checked in the solutions (345 rupees; 190 of 345 is about 55 per cent; 120 of 300 is 40 per cent; 4,277,057 over 384,558 is a little over 11).
- **`m_mansab`** treats zat as personal rank and salary and sawar as the number of horsemen, as in the brief; the sizes are imagined.
- **Wording on caste and women:** the halalkhoran and mallahzadas appear in one deck slide, one notes section and one flashcard, in the brief's plain terms ("housed outside the village", "recorded as comparable to slaves"). Please confirm the tone.
- **Rendering:** the three SVG figures were laid out by computed coordinates but nobody has seen them rendered. Check the timeline (five rows; labels left of the 1598 and 1690 dots), the village diagram (three boxes and a patwari box with an arrow) and the land-class boxes at 360 px on staging.
- **Competency tags I was least sure about:** `m_khud` (application: a residence test applied to two imagined people), `m_jangli_class` (application: a criteria test on two communities), `m_land_data` and `m_shortfall` (application and analysis: the arithmetic is simple but the readings are new), `m_petition_fit` (application: matching a source to a question that the notes mention), `m_peshkash` (analysis: an inference with a limit), `m_bride_weaken`, `m_zam_weaken` and `m_republic_strengthen` (analysis: counterfactuals whose underlying links are in the notes), `s_panchayat`, `s_women_petition`, `s_source_plan` and `s3_ain_limits` (application: close to notes-stated points applied to new cases), `ar_silver_port` (analysis, the only assertion-reason above understanding), `l_republic`, `l_ain_gujarat` and `l_silver` (the notes give much of the material, but each stem adds new data or a new situation), and the source parent tags.
- **Originality:** no NCERT text, source box, caption, map, figure or exercise and no board or sample-paper item is reused (D-036). Nothing is quoted or translated from the Ain-i Akbari, Babur's memoirs, Giovanni Careri or any other document; they are described in SOYL's own words.
