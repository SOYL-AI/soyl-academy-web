# CBSE Class 12 History, Chapter 5 — Through the Eyes of Travellers: Perceptions of Society (c. 10th–17th centuries)

`cbse-12-history-ch05` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` (draft written by a writer agent, D-050, for producer review) · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032, D-036). It is built from `src/`: run `npx tsx content/authored/social-science/cbse-12-history-ch05/src/build.mjs` from `platform/`. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan, the exact-stem originality pre-check and the editorial counts;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 20 + 20 slides with 32 visuals (3 SVG: three travellers on a timeline, a chapter of the Kitab-ul-Hind, Bernier's chain of argument and the doubts about it; the rest tables and flows); 7 notes sections; 33 flashcards; 75 questions worth 139 marks, including 15 source parts and 5 alternatives |
| `tests.json` | `t_cbse12history_ch05_short` (20 marks, 40 min) on `cbse-12-history-chapter-test-short`, and `t_cbse12history_ch05_long` (40 marks, 90 min) on `cbse-12-history-chapter-test-long` |
| `src/` | `questions.mjs`, `build.mjs`; the shared library is imported from `../../cbse-12-history-ch01/src/lib.mjs` |

## Scope

All five syllabus topics are covered:
- **t01** Al-Biruni: life, the Kitab-ul-Hind (plan, subjects, language), the barriers he named, his account of caste and its limits (15 tags, plus 5 shared).
- **t02** Ibn Battuta: life, the Rihla, cities and markets, trade in cloth, the uluq and dawa, slaves (16 tags, plus 4 shared).
- **t03** François Bernier: life, his claim about land and its chain of consequences, camp towns, the doubts about his picture, his influence on Montesquieu and Marx (16 tags, plus 6 shared).
- **t04** Women, slaves and sati in travellers' accounts: why sati was noticed, women's labour, slaves in varied roles, comparing the two groups, other travellers named briefly (12 tags, plus 2 shared).
- **t05** Sources: travellers' accounts. Carried by the five source-based items (each tagged with its content topic and t05) and seven t05 items (cross-checking, independence of sources, weighing, ordering the method); the decks teach it in three worked examples and the cross-checking slide.

### Decks

- **Part 1:** Al-Biruni and Ibn Battuta (t01, t02). 20 slides, 4 checks (`fb_ab80`, `mt_origin`, `tf_ab_euclid`, `fb_uluq`), 3 worked examples (planning a 5-mark answer on Al-Biruni's work; counting relay stations on a 20-mile road; reading a traveller's note with four questions).
- **Part 2:** Bernier, women and sources (t03, t04, t05). 20 slides, 4 checks (`fb_bn_dara`, `tf_bn_ain`, `tf_w_sati`, `ord_method`), 3 worked examples (weighing the claim that a foreigner's account is worthless; reading an imagined note by a jeweller; a chronology from clues).
- Narration is at most 72 words per slide (mean 48) and uses no symbols or quote marks.
- The worked examples use cases different from the bank (20 miles in the deck against 12 in `m_ib_post_calc`; a jeweller's note, a scholar's note and a "foreigner" claim that no item uses).

### Question bank (75 items)

| Type | Count |
|---|---|
| mcq | 30 |
| assertion-reason | 7 |
| true-false | 4 |
| fill-blank | 3 (one with two blanks) |
| match | 2 |
| ordering | 2 (one chronology, one method) |
| short 2-mark | 10 |
| short 3-mark | 6 |
| long 5-mark | 6 |
| source-based | 5, each with an internal choice in part (c) |

- **Source-based items:** an imagined student's notes from a lecture on the Kitab-ul-Hind; an imagined letter from a cloth merchant who met a travelling judge; an imagined student's notes after a lecture on Bernier; two imagined documents about one town (a clerk's report and a visitor's letter); a labelled SOYL summary of what travellers' accounts record about women. Four are imagined documents and one is a SOYL summary (`soyl-original`); none quotes a traveller or any textbook source. Part (b) of each is a one-mark inference, not a quotation of a line.
- **Map items:** none. **Map work: none (OA-23, owner decision pending); places are named in words only.**
- **Difficulty:** d1 13, d2 30, d3 25, d4 7.
- **Competency:** recall 11, understanding 28, application 11, analysis 21, evaluation 4. That puts 48% of items (36 of 75) at application or above (lint band 45–65%).
- **Competency review (producer):** `m_ib_position`, `s3_ib_markets` and `ar_bn_camp` were retagged to understanding (general source caution, a wrapper on the notes, and a link the notes state); part (c)(i) of `sb_women` was rewritten so that both alternatives are analysis (why the accounts differ and what that means for a historian).
- **Higher-order devices used:** counterfactuals (which finding would weaken or strengthen), source fitness (which question a source answers best), partly right claims to correct, a conflict between two pieces of evidence (the revenue clerk and the traveller; the clerk's report and the visitor's letter), independence of sources (one interpreter behind two accounts), dating from clues, and applying the Kitab-ul-Hind's plan or Bernier's idea of camp towns to a new case.
- **Answer keys:** MCQ keys are a7 b7 c8 d8; assertion-reason keys are a3 b2 c1 d1.

### Tests

| Test | Contents |
|---|---|
| Short | **A:** 3 MCQ (source fitness for the Kitab-ul-Hind; relay-station calculation; a conflict between a clerk's note and a traveller's) + 1 assertion-reason (camp towns). **B:** two 2-mark (Al-Biruni's barriers; what Ibn Battuta shows and cannot show about slavery) + one 3-mark (testing Bernier's claim about land). **C:** one of two longs (assess the Kitab-ul-Hind / compare women and slaves in the accounts). **D:** the merchant's letter on the post and cloth trade. |
| Long | **A:** 8 MCQ + 2 assertion-reason (Delhi's population; women's labour). **B:** 2 + 2 + (2 or 2) + 3 + (3 or 3). **C:** Ibn Battuta's account long + (evaluate Bernier / how far travellers can be trusted). **D:** the summary on women and the notes on Bernier. |

- The tests are disjoint and use no deck-check item (deck checks: `fb_ab80`, `mt_origin`, `tf_ab_euclid`, `fb_uluq`, `fb_bn_dara`, `tf_bn_ain`, `tf_w_sati`, `ord_method`).
- Spares used in neither test nor deck: `m_ab_ghazni`, `m_ab_struct`, `m_ab_barriers`, `m_ab_weaken`, `m_ib_qazi`, `m_ib_novelty`, `m_ib_cloth`, `m_ib_check`, `m_ib_date`, `m_bn_who`, `m_bn_claim`, `m_bn_camp`, `m_bn_strengthen`, `m_bn_towns`, `m_w_why`, `m_w_law`, `m_w_slave`, `m_m_app`, `m_m_indep`, `ar_ab_texts`, `ar_ab_pollution`, `ar_ib_slaves`, `ar_bn_ain`, `tf_ib_slave_unif`, `mt_known`, `ord_trav`, `s_ab_caste`, `s_ib_cloth`, `s_bn_partly`, `s_m_new`, `s3_ib_markets`, `s3_bn_influence`, `l_cmp`, `sb_ab`, `sb_conflict`.

## Facts a reviewer should double-check

- **Al-Biruni:** born 973 in Khwarizm (present-day Uzbekistan); languages Syriac, Arabic, Persian, Hebrew, Sanskrit; taken to Ghazni after Mahmud's invasion of 1017; Kitab-ul-Hind in Arabic, 80 chapters; each chapter's question–description–comparison pattern; Patanjali's grammar translated into Arabic and parts of Euclid into Sanskrit; the three barriers; his view of the notion of pollution. All as supplied in the task brief.
- **Ibn Battuta:** born in Tangier in 1304; Sind 1333; qazi of Delhi under Muhammad bin Tughlaq; envoy to China 1342; back in Morocco 1354; Rihla in Arabic, recorded by Ibn Juzayy; uluq (horse post, royal horses every four miles) and dawa (foot post, three stations in every mile). The "Khurasan" fruit example is the post's standard illustration. The relay arithmetic in `m_ib_post_calc` (12 miles gives 3 and 36 stations) and the deck's 20-mile example (5 and 60) follow directly from those spacings and are illustrative.
- **Bernier:** in the Mughal Empire 1656–1668; physician to Dara Shukoh, later attached to Danishmand Khan; dedicated to Louis XIV; the chain of argument; camp towns; the claim that the Ain-i Akbari and other official documents do not say the state was sole owner of land.
- **The share of town dwellers (about 15 per cent in the seventeenth century, on average more than in western Europe then)** is a historians' estimate and is labelled so in the deck, notes and flashcards; please confirm the figure and the wording.
- **Sati:** one neutral line (a widow burnt on her husband's funeral pyre, recorded by some observers, not universal); abolished by law in 1829 under Lord William Bentinck. `m_w_law` and `sb_women` part (a) ask for the year and the name.
- **Other travellers:** Abdur Razzaq Samarqandi (south India, 1440s), Duarte Barbosa (Portuguese, sixteenth century), Tavernier (French jeweller, seventeenth century) and Manucci (Italian, seventeenth century) come from the brief. Mahmud Wali Balkhi is not used.
- **Reasoned judgements, not facts:** the answers of `m_ab_attrib`, `m_bn_strengthen`, `m_bn_sale`, `m_bn_towns` and the sources `sb_conflict` and `sb_women` depend on imagined evidence; the reasoning in each solution should be read for sense. In `m_bn_sale` a recognised sale of village land is presented as evidence against Bernier's claim; please confirm that this matches the historiography (the notes say only that official documents do not state sole ownership).
- **Rendering:** the three SVG figures were laid out by computed coordinates but nobody has seen them rendered. Check the labels at 360 px on staging (Bernier's chain of argument has the most text and sits beside the dashed box of doubts).
- **Competency tags I was least sure about:** `m_ab_attrib` (application: criteria matching on an unfamiliar fragment), `m_bn_towns` (application at d4: new cases against a named idea), `s_ab_caste` and `s_bn_partly` (analysis: partly right claims whose two halves the notes state), `ar_ab_pollution` and `ar_ib_delhi` (analysis: judging that a true R does not explain A), `l_cmp` (analysis: a comparison whose two sides the notes give), `l_ab_assess`, `l_bn_evaluate` and `l_method` (evaluation: weighing value and limits that the notes list), and the source parent tags.
- **Originality:** no NCERT text, source box, caption, map, figure or exercise and no board or sample-paper item is reused (D-036). Travellers are named and their views described in SOYL's own words; nothing is quoted or translated.
