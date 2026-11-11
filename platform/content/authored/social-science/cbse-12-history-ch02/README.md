# CBSE Class 12 History, Chapter 2 — Kings, Farmers and Towns: Early States and Economies (c. 600 BCE–600 CE)

`cbse-12-history-ch02` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` (writer draft for producer review) · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032, D-036, D-050) to the standard of the CBSE 12 Political Science chapters. It is built from `src/`: run `npx tsx content/authored/social-science/cbse-12-history-ch02/src/build.mjs` from `platform/`. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan, exact-stem originality against every other authored chapter and the editorial counts;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON. The shared library is the unchanged copy in `cbse-12-history-ch01/src/lib.mjs`.

| File | What |
|---|---|
| `release.json` | 2 decks of 21 + 21 slides, every slide with a visual (4 SVG: a 600 BCE–600 CE timeline, the Magadha factors diagram, the Mauryan structure diagram and the coin-sequence diagram; the rest tables and flows); 7 notes sections; 34 flashcards; 75 questions worth 141 marks, including 20 source parts and alternatives |
| `tests.json` | `t_cbse12history_ch02_short` (20 marks, 40 min) on `cbse-12-history-chapter-test-short`, and `t_cbse12history_ch02_long` (40 marks, 90 min) on `cbse-12-history-chapter-test-long` |
| `src/` | `questions.mjs`, `build.mjs` (imports `../../cbse-12-history-ch01/src/lib.mjs`) |

## Scope

All five syllabus topics are covered:
- **t01** Prinsep and Piyadassi; scripts and epigraphy; the sixteen mahajanapadas, monarchies and ganas; the rise of Magadha and its capitals (21 tags).
- **t02** the Mauryan empire (Chandragupta, Ashoka and Kalinga, five centres, sources, the Megasthenes committee) and Ashoka's dhamma, with the interpretation and limits of the evidence (21 tags).
- **t03** new notions of kingship (Kushanas, Tamilakam, Guptas and samantas, prashastis); rural society (taxes in the stories, ways to raise production, rural groups and terms); land grants and the debate about them (16 tags).
- **t04** towns, crafts and guilds; trade routes and goods; coins and kings from punch-marked coins to Gupta gold; the debate on fewer gold coins (18 tags).
- **t05** inscriptions as sources: what they give and their limits, and five source-based items (15 tags, always paired with a content topic).

### Decks

- **Part 1:** reading inscriptions, mahajanapadas and the Mauryas. 21 slides, 4 checks, 3 worked examples (building a chronology; planning a 5-mark answer; weighing the evidence on control).
- **Part 2:** kingship, farmers, towns and coins. 21 slides, 4 checks, 3 worked examples (weighing views on land grants; reading a hoard; reading an inscription source).
- Narration is at most 70 words per slide (mean 48) and uses no symbols or quote marks.

### Question bank (75 items)

| Type | Count |
|---|---|
| mcq | 30 |
| assertion-reason | 7 |
| true-false | 4 |
| fill-blank | 2 |
| match | 2 |
| ordering | 2 (chronology) |
| short 2-mark | 10 |
| short 3-mark | 7 |
| long 5-mark | 6 |
| source-based | 5, each with an internal choice in part (c) |

- **Source-based items:** an imagined copyist's notebook of 1836 (t01); a SOYL summary of a kind of Ashokan edict (t02); an imagined museum guide's notes on a copper-plate grant (t03); a SOYL summary of a kind of royal praise-poem, describing the Prayaga prashasti only in outline (t03); an imagined excavation assistant's diary (t04). All are `soyl-original`, labelled as imagined documents or SOYL summaries; none quotes or translates any inscription or any real person.
- **Map items:** none. Map work: none (OA-23, owner decision pending); places are named in words only. No figure shows a map or map-like layout (the Mauryan figure is a structure diagram, labelled as such).
- **Difficulty:** d1 11, d2 27, d3 28, d4 9.
- **Competency:** recall 16, understanding 23, application 13, analysis 19, evaluation 4. That puts 48% of items (36 of 75) at application or above, after the producer review below.
- **Answer keys:** MCQ keys are a7 b7 c8 d8; assertion-reason keys are a2 b3 c1 d1.

### Tests

| Test | Contents |
|---|---|
| Short | **A:** 3 MCQ (evidence-inference on a Piyadassi inscription, Prabhavati Gupta, a Roman hoard) + 1 assertion-reason (Megasthenes and control). **B:** two 2-mark (dhamma, Kushana status) + one 3-mark (coins). **C:** one of two longs (dhamma assessment / land grants). **D:** the copyist's notebook. |
| Long | **A:** 8 MCQ + 2 assertion-reason. **B:** 2 + 2 + (2 or 2) + 3 + (3 or 3). **C:** the Magadha long + (sources comparison or coins). **D:** the museum guide's plates and the excavation diary. |

- The tests are disjoint, use no deck-check item, and spread over t01–t05.
- Deck check items (not in any test): `tf_prinsep`, `mt_sources`, `fb_mahamatta`, `tf_dhamma`, `m_kushana_title`, `fb_sangam`, `tf_roman`, `ord_coins`.
- Spares not used in either test or deck: 35 items, including `sb_edict`, `sb_prashasti`, `l_prinsep`, `s3_dhamma`, `s3_mahajanapadas`, `m_find_spot`, `ar_gold`, `ar_scripts`, `ar_gana`, `ar_mahamatta`, `m_epig_bias`, `m_donors`, `s_few_gold`.

## Facts a reviewer should double-check

- **Dates and numbers:** Prinsep in the 1830s with Ashokan Brahmi read by 1838; sixteen mahajanapadas in the sixth century BCE; Magadha's capital shifted to Pataliputra in the fourth century BCE; Chandragupta c. 321 BCE; Ashoka placed in the third century BCE (no exact reign dates given); Cholas, Cheras and Pandyas from c. 2nd century BCE; Kushanas c. 1st century BCE to 1st century CE and Kushana gold c. 1st century CE; Guptas from c. 4th century CE; land grants from about the beginning of the Common Era; trade from the sixth century BCE; punch-marked coins c. 6th century BCE; fewer gold coins from c. 6th century CE (stated as a debate).
- **Prinsep's mint:** he is called an officer of the East India Company's mint; one solution (`tf_prinsep`) and the imagined notebook of 1836 place the work in Calcutta. Please confirm.
- **Megasthenes:** described as a Greek ambassador at Chandragupta's court whose account survives only in fragments; no later author is named. The committee has six subcommittees (navy; transport and supplies; foot soldiers; horses; chariots; elephants).
- **Monarchy examples:** Magadha, Koshala and Avanti are labelled monarchies in the Part 1 table; the brief names only Vajji as a gana.
- **Rural terms:** the Pali word gahapati is glossed as a household head who controlled land and workers; vellalar (large landowners), uzhavar (ploughmen) and adimai (slaves) are the Sangam terms.
- **Puhar:** called a coastal trading town (Kaveripattinam) of the Tamil country.
- **`sb_prashasti`:** the summary only describes the Prayaga prashasti (poet Harishena, king Samudragupta, a pillar at Prayaga) and the general kind of praise-poem; no text is quoted or paraphrased.
- **Competency tags still least certain:** `m_dhamma_content`, `m_control_limits`, `m_jatakas`, `m_production`, `m_prashasti_use` (rewritten, analysis or application), `ar_capital` and `ar_gold` (judging a causal link), `s3_rural` (analysis), `sb_prashasti` and `sb_edict` (parent tags, analysis).
- **New fact to check:** `s3_coins` states that the Indo-Greek issues began around the second century BCE (supplied by the producer review, not in the original brief); `m_control_limits` states that Ashoka's inscriptions are found from Afghanistan to the Deccan.
- **Rendering:** nobody has seen the SVG labels rendered. Coordinates were computed, with label lanes on the timeline, but they should be checked at 360 px on staging.
- **Originality:** no NCERT text, source box, caption, translation or exercise and no board or sample-paper item is reused (D-036); no quotation of any inscription or real person.

## Competency review (producer pass)

- **Retagged to understanding (text unchanged):** `m_imagined_kingdom`, `m_prinsep_evidence`, `s_gana`, `s3_dhamma`, `s_land_reason`, `m_hoard`.
- **Source parents:** `sb_edict` lost its last passage sentence, part (b) is now an inference (application) and part (c)(i) asks whom Ashoka wanted to reach and how to test it (analysis); `sb_prashasti` part (b) now asks what such a poem would leave out (application). Both parents stay analysis.
- **Rewritten in place** (type, marks, topics and test slots unchanged): `m_dhamma_content` (application), `m_control_limits`, `s_sources_maurya`, `m_jatakas`, `m_production`, `m_prashasti_use`, `s3_rural`, `m_few_gold`, `ar_roman` (now about coins travelling, so it no longer covers Roman coins or pepper; those stay in the decks, notes and `tf_roman`) and `m_epig_bias` (all analysis, except `m_dhamma_content` and `m_epig_bias`, application), and `s_numismatics` and `s3_coins` (application).
- Answer keys are unchanged: MCQ a7 b7 c8 d8; assertion-reason a2 b3 c1 d1.
