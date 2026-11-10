# CBSE Class 12 History, Chapter 3 — Kinship, Caste and Class: Early Societies (c. 600 BCE–600 CE)

`cbse-12-history-ch03` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` (draft written by a writer agent, D-050, for producer review) · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032, D-036). It is built from `src/`: run `npx tsx content/authored/social-science/cbse-12-history-ch03/src/build.mjs` from `platform/`. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan, the exact-stem originality pre-check and the editorial counts;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON. The shared library is imported from `../../cbse-12-history-ch01/src/lib.mjs` (not copied).

| File | What |
|---|---|
| `release.json` | 2 decks of 19 + 21 slides with 34 visuals (4 SVG: critical-edition timeline, gotra rule and Satavahana departures, ideal varna order beside evidence of practice, 600 BCE–700 CE timeline of texts, rulers and observers; the rest tables and flows); 7 notes sections; 32 flashcards; 72 questions worth 134 marks, including 15 source parts and alternatives |
| `tests.json` | `t_cbse12history_ch03_short` (20 marks, 40 min) on `cbse-12-history-chapter-test-short`, and `t_cbse12history_ch03_long` (40 marks, 90 min) on `cbse-12-history-chapter-test-long` |
| `src/` | `questions.mjs`, `build.mjs` |

## Scope

All five syllabus topics are covered:
- **t01** the critical edition (1917 Pune, Sukthankar from 1919, over 13,000 pages, completed 1966; common core and variations); the epic's story, composition, composers and growth (12 tags, plus 2 shared with t04 and 1 with t05).
- **t02** kinship terms, patriliny and its exceptions; exogamy, endogamy, polygyny, polyandry; the eight forms; kanyadana; gotra and the Satavahana departures (18 tags, plus 1 shared with t05).
- **t03** the four varnas and the Brahmanical strategies; rulers of different backgrounds; jati and guilds; those outside the order, with the chandalas and one line on Article 17 (18 tags, plus 3 shared with t05).
- **t04** property and gender (Manusmriti, stridhana, Prabhavati Gupta); varna and wealth; the Buddhist alternative; the epic as a dynamic text (language, content, author, date; Hastinapur) (15 tags, plus 2 shared with t05).
- **t05** sources: texts. Carried by the five source-based items (each tagged with its content topic and t05), two MCQs on reading normative texts, and the deck worked example on reading a text as a source.

### Decks

- **Part 1:** the epic, the critical edition, kinship, marriage and gotra (t01, t02). 19 slides, 3 checks, 3 worked examples (what an edition can and cannot show, with an imagined ballad; classifying marriage customs; planning a 5-mark answer on patriliny).
- **Part 2:** varna, jati, property, Buddhist views and the epic as a text (t03, t04, t05). 21 slides, 3 checks, 3 worked examples (reading a norm beside other evidence; planning a 3-mark answer on how new jatis arose; reading a text as a source).
- Narration is at most 64 words per slide (mean 50) and uses no symbols or quote marks.

### Question bank (72 items)

| Type | Count |
|---|---|
| mcq | 29 |
| assertion-reason | 7 |
| true-false | 4 |
| fill-blank | 2 |
| match | 2 |
| ordering | 2 (both chronologies) |
| short 2-mark | 9 |
| short 3-mark | 6 |
| long 5-mark | 6 |
| source-based | 5, each with an internal choice in part (c) |

- **Source-based items:** an imagined manuscript collector's diary (critical edition); an imagined donation record on a cave wall (gotra, metronymics, succession); an imagined history teacher's notes setting a Dharmashastra beside a guild inscription (varna and practice); a SOYL summary of what a Dharmashastra-type text says about inheritance; a student's notes on an imagined lecture about analysing an epic-type poem. Four are imagined documents and one is a labelled SOYL summary (`soyl-original`); none quotes a real person, a verse, a passage of any text or an inscription.
- **Map items:** none. **Map work: none (OA-23, owner decision pending); places are named in words only.**
- **Difficulty:** d1 12 (17%), d2 28 (39%), d3 24 (33%), d4 8 (11%).
- **Competency:** recall 9, understanding 29, application 13, analysis 20, evaluation 1. That puts 47% of items (34 of 72) at application or above. Application and analysis items rely on new data (counterfactual "which finding would weaken", source-fitness, dating a passage from clues, applying the gotra, inheritance and marriage-category rules to imagined cases, weighing two imagined records) and not on facts that the notes or the deck already state.
- **Competency review (producer):** seven items were retagged to understanding because the notes state the answer or the check is near-definitional (`m_exo`, `m_metro`, `m_succession`, `s_sat_inf`, `m_nonksh_new`, `m_jati_case`, `m_land_inscr`; `m_metro`, `m_nonksh_new` and `m_land_inscr` were also lowered to d2). `s_gotra` and `m_property_case` stay application (two rules applied to a new case). Four items were rewritten in place: `s_ed_steps` (weakness of an edition built on three manuscripts from one region, analysis), `m_enforce` (why authors advised kings to enforce the order, analysis), `m_guild` (which conclusion goes beyond the Mandasor record, analysis) and `s_stridhana` (a brother-in-law's claim to a woman's ornaments, application). Type, marks, topic tags, ids and test slots are unchanged.
- **Answer keys:** MCQ keys are a7 b7 c7 d8; assertion-reason keys are a4 b2 c1 d0 (by verdict: explains ×4, not-explains ×2, A-true-R-false ×1).

### Tests

| Test | Contents |
|---|---|
| Short | **A:** 3 MCQ (critical-edition counterfactual; classifying a jati; applying the inheritance rule) + 1 assertion-reason (gotra). **B:** two 2-mark (partly right claim on the edition; guild inscription) + one 3-mark (an imagined queen's record read against the norms). **C:** one of two longs (the epic as a dynamic text / ideal varna order against rulers' backgrounds). **D:** the inheritance summary. |
| Long | **A:** 8 MCQ + 2 assertion-reason (Mauryas; a late verse and the date of the epic). **B:** 2 + 2 + (2 or 2) + 3 + (3 or 3). **C:** the patriliny long + (Buddhist view or marriage rules). **D:** the manuscript collector's diary and the history teacher's notes. |

- The tests are disjoint and use no deck-check item (deck checks: `fb_ed_year`, `m_patri`, `m_gotra_rule`, `m_varna_duty`, `ar_jati`, `m_buddhist_view`).
- Spares used in neither test nor deck: `m_ed_inst`, `m_ed_method`, `m_ed_findings`, `m_ed_case`, `tf_ed`, `ar_ed`, `ord_edition`, `m_forms`, `m_sat_endog`, `m_succession`, `tf_poly`, `fb_kanya`, `mt_kin`, `ar_patri`, `s_gotra`, `s_poly`, `l_property`, `sb_inscr`, `m_enforce`, `m_weaken_varna`, `tf_untouch`, `mt_varna`, `s3_strategies`, `s3_outside`, `m_stridhana`, `m_manu_share`, `m_hastinapur`, `tf_hastinapur`, `ar_property`, `s_stridhana`, `sb_text`, `m_text_infer`, `ord_period`.

## Facts a reviewer should double-check

- **Critical edition:** project begun 1917 at the Bhandarkar Oriental Research Institute, Pune; V. S. Sukthankar leading from 1919; over 13,000 pages; completed 1966 ("about 47 years" is arithmetic from 1917 to 1966). `ar_ed` states that every manuscript the editors used was a later copy of the epic; this is the usual position but please confirm the wording.
- **Epic:** composed over about a thousand years from c. 500 BCE; sutas first, Brahmanas later; Vishnu worship growing and Krishna identified with Vishnu c. 200 BCE–200 CE; B. B. Lal at Hastinapur 1951–52 (the village is near Meerut); identification with the epic's Hastinapura debated.
- **Kinship and marriage:** patriliny the ideal in ruling families from c. 6th century BCE; Prabhavati Gupta as a woman who exercised power; eight forms of marriage with the first four good (the names of the forms are not given); Manusmriti compiled c. 200 BCE–200 CE; gotra from about 1000 BCE.
- **Satavahanas:** queens Gotami and Vasithi with names from fathers' gotras; Gotami-puta Siri-Satakani as a metronymic example; some queens in their husbands' gotras (also found in parts of south India); succession usually patrilineal. The imagined records in `sb_inscr`, `s3_kin`, `s_sat_inf` and `m_metro` use invented names (Kausiki, Veerasena, Rudra and similar) and are labelled imagined.
- **Varna and rulers:** Mauryas Kshatriya in Buddhist texts and low in some Brahmanical texts; Shungas and Kanvas Brahmanas; Shakas called mlechchhas; Rudradaman c. 2nd century CE (shown at c. 150 CE on the timeline, which is an illustrative placement); the Satavahana ruler claiming to be a unique Brahmana and marrying into the Shaka family.
- **Jati, guilds, outsiders:** Nishadas as a jati example; Mandasor inscription of the 5th century CE (silk weavers from Lata, temple to the sun god; the timeline label "c. 400s CE" is illustrative); the Ekalavya story told in one sentence; chandalas at the bottom with the Manusmriti's restrictions; Fa Xian (c. 5th century CE) and Xuan Zang (c. 7th century CE, shown at c. 630 CE on the timeline, illustrative). The one line on Article 17 of the Constitution appears in the notes, the Part 2 deck and `s3_outside`.
- **Property and Buddhist views:** the Manusmriti's rules on the estate, stridhana and hoarding as given in the brief; the mahasammata story of the Sutta Pitaka; Tamil Sangam chiefs as patrons of poets.
- **Rendering:** the four SVG figures were laid out by computed coordinates but nobody has seen them rendered. Check them at 360 px on staging (the varna comparison and the gotra figure have the most text).
- **Competency tags to look at:** `m_sat_endog`, `m_weaken_varna`, `m_source_fit`, `m_source_conflict` (counterfactual or source-fitness MCQs tagged analysis); `ar_ed`, `ar_gotra`, `ar_varna_weak`, `ar_dyn` (A-R tagged analysis because the link must be judged on a new point); `s_ed_claim`, `s3_claim`, `s_ed_steps` (partly right claim and interested sources); `l_varna` (evaluation) and `l_kin`, `l_buddhist`, `l_property` (analysis, because the model answers weigh evidence on both sides); `m_text_date` and `m_exo` (application by checking criteria against new cases). Source parents are tagged by their parts (b) and (c); these are the likeliest further downgrades.
- **Originality:** no verse or passage of the Mahabharata, Manusmriti, Dharmasutras, Rigveda or any inscription is quoted or paraphrased closely; the Rigveda hymn on the origin of the varnas is only named as a divine-origin claim. No NCERT text, source box, caption, map, figure or exercise and no board or sample-paper item is reused (D-036). Real people are named but never quoted.
