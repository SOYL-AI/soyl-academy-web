# CBSE Class 12 History, Chapter 7 — An Imperial Capital: Vijayanagara (c. 14th–16th centuries)

`cbse-12-history-ch07` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` (draft written by a writer agent, D-050, for producer review) · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032, D-036). It is built from `src/`: run `npx tsx content/authored/social-science/cbse-12-history-ch07/src/build.mjs` from `platform/`. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan, the exact-stem originality pre-check and the editorial counts;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 19 + 21 slides with 32 visuals (6 SVG schematics: the empire on a timeline, recovering the site 1800 to 1986, four zones of the settlement, two water systems, seven nested lines of wall, the Mahanavami dibba; the rest tables and flows); 7 notes sections; 33 flashcards; 75 questions worth 137 marks, including 15 source parts and 5 alternatives |
| `tests.json` | `t_cbse12history_ch07_short` (20 marks, 40 min) on `cbse-12-history-chapter-test-short`, and `t_cbse12history_ch07_long` (40 marks, 90 min) on `cbse-12-history-chapter-test-long` |
| `src/` | `questions.mjs`, `build.mjs`; the shared library is imported from `../../cbse-12-history-ch01/src/lib.mjs` |

## Scope

All five syllabus topics are covered:
- **t01** Discovery of Hampi and the rise of the empire: Mackenzie, the priests' memories, photographers, epigraphists, surveys, World Heritage; founding in 1336, dynasties, trade and horses, Krishnadeva Raya, 1565 (14 tags, plus 6 shared).
- **t02** Rayas, nayakas and the Deccan Sultanates: the amara-nayaka system (amaram, dues, troops, tribute, transfers, later independence), wars, shifting alliances, borrowed titles and architecture, trade (15 tags, plus 2 shared).
- **t03** The capital and its environs: the Tungabhadra basin, embankments, the Kamalapuram tank, the Hiriya canal, seven lines of fortification, mortar-free walls, arched gateways, the urban core (13 tags, plus 3 shared).
- **t04** The royal and sacred centres: royal centre, king's palace, Mahanavami dibba and festival, Lotus Mahal, Hazara Rama temple; sacred centre, Virupaksha and Vitthala temples, gopurams, temples and legitimacy (12 tags, plus 9 shared).
- **t05** Sources: buildings and plans. Carried by the five source-based items (each tagged with its content topic and t05), the shared t05 items (plans, labels, fitness of sources, a conflict between a guide's note and an excavation, dating from clues) and four items of its own; the decks teach it in three worked examples and the sources slide.

### Decks

- **Part 1:** Hampi, the empire and the nayakas (t01, t02). 19 slides, 4 checks (`fb_pampa`, `ord_found`, `tf_nay`, `mt_people`), 2 worked examples (dating an undated order from clues; planning a 3-mark answer on the horse trade).
- **Part 2:** the city, its centres and its sources (t03, t04, t05). 21 slides, 4 checks (`fb_mortar`, `m_dibba_size`, `tf_lotus`, `ord_read`), 3 worked examples (reading an imagined four-block plan; seen versus inferred at the Hazara Rama temple; testing a label on an imagined board that says Queens' bath).
- Narration is at most 66 words per slide (mean 47) and uses no symbols or quote marks.
- The worked examples use cases different from the bank (a Saluva order with Portuguese traders in the deck against a Krishnadeva Raya copper plate in `m_kdr_date`; the horse trade in a 3-mark plan, not in a bank item; a Queens' bath board in the deck against the Lotus Mahal and the king's palace in the bank).

### Question bank (75 items)

| Type | Count |
|---|---|
| mcq | 31 |
| assertion-reason | 7 |
| true-false | 4 |
| fill-blank | 3 |
| match | 2 |
| ordering | 2 (one chronology, one method) |
| short 2-mark | 9 |
| short 3-mark | 6 |
| long 5-mark | 6 |
| source-based | 5, each with an internal choice in part (c) |

- **Source-based items:** an imagined photographer's caption book of the 1860s (`sb_photo`); an imagined clerk's note on one territory held by a commander (`sb_nayaka`); an imagined surveyor's field notebook on a channel, a basin and a wall (`sb_surveyor`); an imagined guide's notes on the platform and the pavilion (`sb_guide`); a labelled SOYL summary of what inscriptions of the empire commonly record (`sb_inscr`). Four are imagined documents and one is a SOYL summary (`soyl-original`); no traveller or inscription is quoted. Part (b) of each is a one-mark inference, and parts (c)(i) and (c)(ii) are both application or analysis.
- **Map items:** none. **Map work: none (OA-23, owner decision pending); places are named in words only.** The six SVGs are abstract schematics (zones as boxes, nested rectangles for the lines of wall, a side view of the platform) and make no claim about positions.
- **Difficulty:** d1 13, d2 30, d3 26, d4 6.
- **Competency:** recall 12, understanding 27, application 18, analysis 17, evaluation 1. That puts 48% of items (36 of 75) at application or above (lint band 45–65%).
- **Competency review (producer):** `m_nay_indep`, `m_fort_id`, `m_zone_two`, `m_scale`, `l_nayaka` and `l_centres` were retagged to understanding (conditions and classifications the notes state, a one-step computation, and long answers made of the notes' content; difficulty lowered a step where it looked high); `s3_kdr` was rewritten as a dating-from-clues item (application) and `s3_temple` as a why-a-temple item (analysis).
- **Higher-order devices used:** counterfactuals (`m_hp_priests`, `m_fort_weaken`, `m_dibba_weaken`), source fitness (`m_fit`, `s_fit`), conflicting evidence (`m_palace_conflict`, `m_razzaq`, `sb_guide`), dating from clues (`m_kdr_date`, `s3_kdr`, `m_date_note`, `sb_inscr` part (c)(i)), criteria on unfamiliar cases (`m_nay_criteria`, `m_fort_id`, `m_zone_two`), what a single record cannot show (`tf_grant`, `m_temple_econ`, `s_trench`, `s_inscr`), judging a true reason that does not explain (`ar_nay_gift`, `ar_houses`) why a ruler chose a temple (`s3_temple`) and applying a historian's method to a new case (`s3_festival`, `s3_survey`).
- **Answer keys:** MCQ keys are a7 b8 c8 d8; assertion-reason keys are a4 b1 c1 d1.

### Tests

| Test | Contents |
|---|---|
| Short | **A:** 3 MCQ (a porch seen in a photograph and a drawing; criteria for an amara-nayaka; which finding would weaken the platform and festival link) + 1 assertion-reason (ordinary houses). **B:** two 2-mark (water works; a battle and a customs register) + one 3-mark (evidence for an imagined festival at the Vitthala temple). **C:** one of two longs (rise of the empire / compare the royal and sacred centres). **D:** the surveyor's field notebook. |
| Long | **A:** 8 MCQ + 2 assertion-reason (the Raichur doab; the signature Shri Virupaksha). **B:** 2 + 2 + (2 or 2) + 3 + (3 or 3). **C:** the water and fortifications long + (the Sultanates / buildings and plans as sources). **D:** the clerk's note and the guide's notes. |

- The tests are disjoint and use no deck-check item (deck checks: `fb_pampa`, `ord_found`, `tf_nay`, `mt_people`, `fb_mortar`, `m_dibba_size`, `tf_lotus`, `ord_read`).
- Spares used in neither test nor deck: `m_hp_mack`, `m_kdr_acts`, `m_hp_priests`, `m_horse_port`, `m_nay_def`, `m_sult_title`, `m_rival`, `m_water_site`, `m_fort_id`, `m_fort_weaken`, `m_urban_quarter`, `m_razzaq`, `m_zone_two`, `m_temple_econ`, `m_virup_sign`, `m_vitthala`, `m_scale`, `m_fit`, `m_palace_conflict`, `ar_nay_gift`, `ar_title`, `ar_fields`, `ar_dibba`, `tf_unesco`, `tf_grant`, `fb_tangadi`, `mt_zones`, `s_fit`, `s_inscr`, `s_plan`, `s3_survey`, `l_nayaka`, `sb_photo`, `sb_inscr`.

## Facts a reviewer should double-check

- **Discovery:** Mackenzie 1800; first Surveyor General of India 1815; early information from priests of the Virupaksha temple and the Pampadevi shrine; Hampi from Pampadevi; photographers from 1856 (Alexander Greenlaw named as an example); surveys and excavations from the 1970s with John M. Fritz, George Michell and M. S. Nagaraja Rao (described in general terms); World Heritage 1986. All as supplied in the task brief.
- **Empire:** 1336, Harihara and Bukka; "city of victory"; Sangama, Saluva (from 1485), Tuluva, later Aravidu; Krishnadeva Raya 1509–29 with the Raichur doab 1512, Orissa 1514, Bijapur 1520 and the Amuktamalyada; Portuguese on the west coast 1498; Rama Raya at Rakshasi-Tangadi (Talikota) 1565 against Bijapur, Ahmadnagar and Golconda; city sacked and soon abandoned; centre shifts east under the Aravidu dynasty. **Dating clue in the deck:** the worked example says the Tuluva rulers took over "in the early 1500s" and that the order falls "between 1498 and the early 1500s". I was not sure of the exact year of the Saluva to Tuluva change, so please confirm the wording.
- **Amara-nayaka system:** as in the brief; the point that historians see elements of the iqta system is kept as one line without detail. The reasons for transfers in `s3_amara_transfer` and the inference about transfers in `sb_nayaka` part (b) are inferences, not facts from the notes; please read the models for sense.
- **Sultanates:** presented as wars between states that also traded and allied; the borrowed title Hindu Suratrana and arches and domes are the brief's. The list of events in `m_sult_events` and the chronicle and customs register in `s_sult` are imagined evidence, not records.
- **Water and walls:** the Kamalapuram tank (early fifteenth century) with its canal to the royal centre; the Hiriya canal from a dam across the Tungabhadra; seven lines of fortification noted by Abdur Razzaq in the 1440s; no mortar, interlocking wedge-shaped blocks; arched and domed gateways. `m_razzaq` invents a modern survey that finds four lines (imagined). The north-east position of the Tungabhadra basin is as in the brief; nothing else about direction is claimed.
- **Royal and sacred centres:** over 60 temples and about 30 building complexes; the Mahanavami dibba about 11,000 square feet at the base and about 40 feet high (given as "about" everywhere; `m_scale` uses 40 feet). The deck's dibba figure shows three tiers for illustration only and says so; please confirm that this does not mislead. Festival months September–October; Lotus Mahal named by British travellers in the nineteenth century; Hazara Rama temple probably only for the king and family; Virupaksha as a form of Shiva, Vitthala as a form of Vishnu worshipped in Maharashtra, shrine designed as a chariot; the signature "Shri Virupaksha" in Kannada is as in the brief.
- **Reasoned judgements, not facts:** the answers of `m_hp_priests`, `m_hp_photo`, `m_nay_indep`, `m_fort_weaken`, `m_channel`, `m_urban_quarter`, `m_lotus_name`, `m_temple_econ`, `m_palace_conflict`, `tf_grant`, `s_inscr` and the sources depend on imagined evidence; the reasoning in each solution should be read for sense. In `m_zone_two` the clues (a Ramayana temple in the royal zone, a canal) are meant to compete; please confirm that the royal-versus-sacred answer is not too hard.
- **Rendering:** the six SVG figures were laid out by computed coordinates but nobody has seen them rendered. Check the labels at 360 px on staging (the four-zone schematic and the seven-lines figure have the most text).
- **Competency tags I was least sure about:** `m_nay_indep` (analysis at d4, but the notes state its facts, so it may be understanding), `m_urban_quarter` and `m_scale` (application), `m_zone_two` (application, since the clues compete), `m_fit` and `s_fit` (analysis, source fitness), `ar_houses` (analysis: whether independent evidence explains the caution), `ar_nay_gift` (analysis), `m_horse_port` (tagged understanding because the notes state that horses were vital), `tf_grant` and `m_temple_econ` (application: limits of a single record), `l_water_fort` and `l_centres` (analysis: weighing and comparing material the notes give), `l_nayaka` and `l_sultan` (analysis), `l_sources` (evaluation), and the source parent tags (`sb_photo`, `sb_nayaka`, `sb_inscr` application; `sb_surveyor`, `sb_guide` analysis).
- **Originality:** no NCERT text, source box, caption, map, figure or exercise and no board or sample-paper item is reused (D-036). Travellers and inscriptions are named and described in SOYL's own words; nothing is quoted or translated.
