# CBSE Class 12 History, Chapter 6 — Bhakti–Sufi Traditions: Changes in Religious Beliefs and Devotional Texts (c. 8th–18th centuries)

`cbse-12-history-ch06` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` (draft written by a writer agent, D-050, for producer review) · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032, D-036). It is built from `src/`: run `npx tsx content/authored/social-science/cbse-12-history-ch06/src/build.mjs` from `platform/`. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan, the exact-stem originality pre-check and the editorial counts;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 20 + 21 slides with 34 visuals (3 SVG: a timeline of the devotional traditions, great and little traditions, a Chishti silsila; the rest tables and flows); 7 notes sections; 33 flashcards; 74 questions worth 138 marks, including 15 source parts and 5 alternatives |
| `tests.json` | `t_cbse12history_ch06_short` (20 marks, 40 min) on `cbse-12-history-chapter-test-short`, and `t_cbse12history_ch06_long` (40 marks, 90 min) on `cbse-12-history-chapter-test-long` |
| `src/` | `questions.mjs`, `build.mjs`; the shared library is imported from `../../cbse-12-history-ch01/src/lib.mjs` |

## Scope

All five syllabus topics are covered:
- **t01** A mosaic of religious beliefs and the integration of cults: Puranic traditions and local cults, Jagannatha at Puri, local goddesses and consorts, great and little traditions (Redfield), Tantric practices, debates (11 tags, plus 2 shared with t05).
- **t02** Alvars, Nayanars and Virashaivas: the Tamil saints, hymn collections, women saints, the debate on caste, hostility to Buddhists and Jainas (brief, neutral), Chola patronage and bronzes, Basavanna and the Virashaivas (16 tags, plus 1 shared).
- **t03** Islamic traditions and Sufism: Arab merchants, Sind, the Sultanate, zimmis and jizya, the five pillars, Khojahs and Mappilas, mosque features, how people were named, the rise of Sufism, silsilas, khanqahs, dargahs, the Chishtis and the state (16 tags, plus 3 shared).
- **t04** Kabir, Baba Guru Nanak and Mirabai: collections, nirguna and saguna devotion, the Adi Granth and Guru Granth Sahib, the debate about Kabir's birth, the uncertainty about Mirabai's life (16 tags, plus 2 shared).
- **t05** Sources: devotional literature. Carried by the five source-based items (each tagged with its content topic and t05) and nine t05 items (malfuzat, hagiography use, attribution, independence of sources, source fitness for letters, a long on hagiographies); the decks teach it in the sources slide and the worked examples.

### Decks

- **Part 1:** a mosaic of beliefs and the southern poets (t01, t02). 20 slides, 4 checks (`fb_redfield`, `fb_tamil`, `mt_tamil`, `tf_travel`), 3 worked examples (sorting evidence at an imagined shrine of the Lake Mother; planning a 5-mark answer on the Tamil saints and rank; reading an imagined grant record).
- **Part 2:** Sufis, northern poets and sources (t03, t04, t05). 21 slides, 3 checks (`ord_silsila`, `tf_ajmer`, `fb_adigranth`), 3 worked examples (reading an imagined note on a musical gathering at a khanqah; sorting a song summary as nirguna or saguna; a chronology from clues).
- Narration is at most 70 words per slide (mean 49) and uses no symbols or quote marks.
- The worked examples use cases different from the bank (a Lake Mother shrine against the hill goddess in `sb_two_names` and `m_goddess_case`; a grant record against the bronze items; a merchant's note on a gathering against the pilgrim's diary and the khanqah ledger).

### Question bank (74 items)

| Type | Count |
|---|---|
| mcq | 29 |
| assertion-reason | 7 |
| true-false | 4 |
| fill-blank | 3 (one with two blanks) |
| match | 2 |
| ordering | 2 (one chronology, one succession of teachers) |
| short 2-mark | 10 |
| short 3-mark | 6 |
| long 5-mark | 6 |
| source-based | 5, each with an internal choice in part (c) |

- **Source-based items:** two imagined documents about one hill shrine (a temple register summary and a schoolteacher's field notes); a SOYL summary of what a vachana collection contains; an imagined pilgrim's diary at a dargah; an imagined teacher's notes on malfuzat; a SOYL summary of what accounts of Kabir's birth say. Three are imagined documents and two are SOYL summaries (`soyl-original`); no verse and no textbook source is quoted. Part (b) of each is a one-mark inference; parts (c)(i) and (c)(ii) are application or analysis.
- **Map items:** none. **Map work: none (OA-23, owner decision pending); places are named in words only.**
- **Difficulty:** d1 11, d2 31, d3 25, d4 7.
- **Competency:** recall 12, understanding 27, application 10, analysis 23, evaluation 2. That puts 47% of items (35 of 74) at application or above (lint band 45–65%).
- **Competency review (producer):** nine items were retagged to understanding (ids 032, 033, 037, 050, 056, 060, 063, 067, 074: classification from definitions, or a link or caution the notes state; difficulty lowered where it looked high). Five items were rewritten in place as higher-order items: 005 (application: which evidence shows who Tantric followers were), 017 (analysis: what a land grant can answer that a hymn cannot), 027 (analysis: three explanations for a pattern in surviving bronzes), 044 (analysis: inferences from a chronicle story of a returned grant, and a reason to check it) and 062 (analysis: what inclusion in the Guru Granth Sahib does and does not show). Type, marks, topics, ids and test slots are unchanged.
- **Higher-order devices used:** counterfactuals (which finding would weaken or strengthen), source fitness (which question a bronze, a letter collection or a chart answers best), dating from clues (a lower bound on an undated note), conflict between two documents on one shrine, classification by criteria on unfamiliar cases (Virashaiva features, nirguna and saguna, mosque features), dependence between two tazkiras, attribution of an undated poem, and a comparison of two collections of Mirabai's songs.
- **Answer keys:** MCQ keys are a7 b7 c7 d8; assertion-reason keys are a3 b3 c1 d0.

### Tests

| Test | Contents |
|---|---|
| Short | **A:** 3 MCQ (a goddess recorded in two ways; the best use of a Chola bronze; dating a note on a tomb and an urs) + 1 assertion-reason (Guru Nanak's intention and later consolidation). **B:** two 2-mark (an unnamed wandering singer against the Tamil saints; sorting a song as nirguna or saguna) + one 3-mark (evidence that a deity was first local). **C:** one of two longs (assess the Tamil saints and caste / the Chishtis and the state). **D:** the pilgrim's diary at a dargah. |
| Long | **A:** 8 MCQ + 2 assertion-reason (mosque features; usefulness of a tazkira). **B:** 2 + 2 + (2 or 2) + 3 + (3 or 3). **C:** a long on cults + (compare the northern poets / hagiographies as sources). **D:** the summary on Kabir's birth and the summary on vachanas. |

- The tests are disjoint and use no deck-check item (deck checks: `fb_redfield`, `fb_tamil`, `mt_tamil`, `tf_travel`, `ord_silsila`, `tf_ajmer`, `fb_adigranth`).
- Spares used in neither test nor deck: `m_jag`, `m_cult_weaken`, `m_tantra`, `m_women_saints`, `m_chola_land`, `m_hostile`, `m_vira_criteria`, `m_pillars`, `m_khojah`, `m_label_infer`, `m_futuh_infer`, `m_kabir_birth`, `m_nanak_features`, `m_mira_collections`, `m_malfuzat`, `m_hagio_use`, `m_independent`, `m_maktubat_fit`, `ar_tantra`, `ar_caste_caution`, `ar_sufi_false`, `ar_kabir`, `tf_cults`, `tf_attrib_theme`, `mt_north`, `ord_chrono`, `s_vira`, `s_khanqah_check`, `s_nanak`, `s_mira_unc`, `s3_chola`, `s3_kabir_nanak`, `l_sufi_khanqah`, `sb_two_names`, `sb_malfuz`.

## Facts a reviewer should double-check

- **Brief facts used as supplied:** Alvars (tradition counts twelve) and Nayanars (sixty-three); Nalayira Divyaprabandham and Tevaram; Andal and Karaikkal Ammaiyar; Chola patronage (ninth to thirteenth centuries; Chidambaram, Thanjavur, Gangaikondacholapuram; bronzes of Shiva); Basavanna c. 1106–68, Kalachuri court, linga, jangama, vachanas in Kannada; Sind 711; Delhi Sultanate in the thirteenth century; zimmis and jizya (one line on Akbar and Aurangzeb); Khojahs and ginan; Mappilas; Turushka, Tajika, Yavana; Muinuddin Chishti d. 1235; the Chishti shaikhs and places; Muhammad bin Tughlaq as first sultan recorded at Ajmer and Akbar "many times"; Kabir's collections; Guru Nanak 1469–1539, Kartarpur, Mardana, Adi Granth 1604, Khalsa Panth 1699; Mirabai's background; Amir Hasan Sijzi as compiler of Nizamuddin's conversations in the fourteenth century.
- **The order of the Chishti silsila** (Muinuddin, Qutbuddin Bakhtiyar Kaki, Fariduddin Ganj-i Shakar, Nizamuddin Auliya, Nasiruddin Chiragh-i Delhi) is the standard teacher–disciple line; the brief lists the shaikhs but not the order, so please confirm it (used in `ord_silsila`, `m_silsila_inf` and the silsila figure).
- **Timeline approximations:** the Delhi Sultanate is drawn as a single dot at about 1250 labelled "13th century"; the bars for Kabir (1300–1500), Mirabai (1400–1600) and the Tamil saints (from about 550, label "from about the 6th century") are century-level approximations, stated in the figure's note line.
- **Kabir's birth accounts** in `sb_kabir`: "a miraculous birth" is a generic reference to a legend found in some accounts; the Muslim weaver family and the Ramananda discipleship come from the brief. Please confirm the wording is acceptable.
- **Respectful wording on Guru Nanak:** the notes and items say that he "did not set out to found a new religion" (the historians' view in the brief) and that he set aside the sacrifices, baths, image worship and austerities. The phrase "scriptures of both communities" from the brief is deliberately not used in student text. Please confirm the tone.
- **Mosque item `m_mosque_apply`:** the roof and brick examples follow Kerala and Bengal from the brief; the "heavy rain" and "river delta" explanations are plausible but SOYL's own.
- **Shankaradeva** (Assam, late fifteenth century) appears in one sentence of the notes only.
- **Reasoned judgements, not facts:** the answers of `m_goddess_case`, `m_cult_weaken`, `m_caste_limit`, `m_futuh_infer`, `m_kabir_birth`, `m_mira_collections`, `m_independent`, `m_attrib` and all source items depend on imagined evidence; read the reasoning in each solution for sense.
- **Rendering:** the three SVG figures were laid out by computed coordinates but nobody has seen them rendered. Check the timeline (eleven rows, labels placed left or right of bars) and the silsila figure at 360 px on staging.
- **Competency tags I was least sure about:** `m_silsila_inf` (analysis: an inference from a chart), `m_goddess_case` (application: the notes give the concept, the case is new), `m_mosque_apply` (application: sorting features the notes list), `m_nirguna_class` (application: classification by criteria), `m_hagio_use` (application: a method the notes state, applied to new material), `ar_caste_caution`, `ar_mosque`, `ar_nanak` (analysis: the link between two true statements is judged, but both facts are in the notes), `ar_hagio` (analysis, but close to understanding because the notes say it), `l_tamil_assess` (analysis) and `l_chishti_state` (evaluation), whose two sides the notes list, `l_hagio` (evaluation), and the source parent tags.
- **Originality:** no NCERT text, source box, caption, map, figure or exercise and no board or sample-paper item is reused (D-036). No verse or translation of any saint, poet or Sufi text appears; compositions are described by theme in SOYL's own words.
