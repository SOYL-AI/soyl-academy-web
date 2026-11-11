# CBSE Class 12 History, Chapter 4 — Thinkers, Beliefs and Buildings: Cultural Developments (c. 600 BCE–600 CE)

`cbse-12-history-ch04` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` (draft written by a writer agent, D-050, for producer review) · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032, D-036). It is built from `src/`: run `npx tsx content/authored/social-science/cbse-12-history-ch04/src/build.mjs` from `platform/`. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan, the exact-stem originality pre-check and the editorial counts;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 21 + 21 slides with 35 visuals (4 SVG: a 700 BCE–800 CE timeline of five landmarks, a side view of a stupa, a stupa plan from above, early and later temples; the rest tables and flows); 7 notes sections; 33 flashcards; 75 questions worth 140 marks, including 15 source parts and alternatives |
| `tests.json` | `t_cbse12history_ch04_short` (20 marks, 40 min) on `cbse-12-history-chapter-test-short`, and `t_cbse12history_ch04_long` (40 marks, 90 min) on `cbse-12-history-chapter-test-long` |
| `src/` | `questions.mjs`, `build.mjs`; both import the shared CBSE 12 History library `../../cbse-12-history-ch01/src/lib.mjs` (not copied here) |

## Scope

All five syllabus topics are covered:
- **t01** Sanchi (discovery, the gateway episode, the Begums of Bhopal, Amaravati as a contrast, World Heritage listing) and the background of sacrifices and debates (ferment of about 600 BCE, the Rigveda and sacrifices, the Upanishads, debates, Makkhali Gosala and Ajita Kesakambalin) (16 tags, plus 2 shared).
- **t02** the Buddha (life, places, teachings), the sangha (bhikkhus and bhikkhunis, Mahapajapati Gotami, the Therigatha), the Tipitaka and chronicles, Jaina ideas, the spread of Buddhism (15 tags, plus 2 shared).
- **t03** stupas (relics, the Ashokavadana, parts, pradakshina, donors) and their sculpture (symbols, Jatakas, the shalabhanjika, debated readings) (19 tags, plus 3 shared with t05).
- **t04** Mahayana Buddhism, Vaishnavism and Shaivism, the Puranas, early temples (garbhagriha, shikhara, Deogarh, Barabar caves, Ellora) (14 tags, plus 1 shared).
- **t05** sources: sculpture and architecture. Carried by the five source-based items (each tagged with its content topic and t05), four items on reading sculpture and nineteenth-century judgements (Mahabalipuram, Gandhara and Greek standards, matching a relief with a text), and the decks' worked examples (reading a plan; judging a judgement).

### Decks

- **Part 1:** Sanchi, the age of ferment, Jaina ideas, the Buddha and the sangha (t01, t02). 21 slides, 4 checks, 3 worked examples (planning a 5-mark answer on Jainism; reading a chronicle with care; weighing a claim about equality in the sangha).
- **Part 2:** stupas, sculpture, new traditions, temples and sources (t03, t04, t05). 21 slides, 3 checks, 3 worked examples (reading a plan; planning a 5-mark answer on new devotional traditions; judging a nineteenth-century judgement).
- Narration is at most 70 words per slide (mean 50) and uses no symbols or quote marks.
- No worked example teaches a case used in a bank item (the deck cases are Jainism, a Sri Lankan chronicle, equality in the sangha, a stupa plan, devotional traditions and Greek standards; the bank uses a clerk's diary, a Vinaya summary, a gateway panel, donor records, a pilgrim's letter and others).

### Question bank (75 items)

| Type | Count |
|---|---|
| mcq | 29 |
| assertion-reason | 7 |
| true-false | 4 |
| fill-blank | 3 |
| match | 2 |
| ordering | 2 (one chronology, one from undated clues) |
| short 2-mark | 10 |
| short 3-mark | 7 |
| long 5-mark | 6 |
| source-based | 5, each with an internal choice in part (c) |

- **Source-based items:** an imagined diary of a clerk with a survey party at Sanchi (the gateway episode); a labelled SOYL summary of what the Vinaya Pitaka records; imagined museum-guide notes on a gateway panel (empty seat, tree, wheel, a donor's record); a labelled SOYL summary of what donor inscriptions on stupas usually record; an imagined letter from a pilgrim to a Vishnu shrine near a mound where monks live. Three are imagined documents and two are labelled SOYL summaries (`soyl-original`); none quotes a real person or any textbook or scripture. In each, part (a) is recall, part (b) is a one-mark inference whose answer is not in the passage, and both alternatives of part (c) are application or analysis.
- **Map items:** none. **Map work: none (OA-23, owner decision pending); places are named in words only.**
- **Difficulty:** d1 13, d2 28, d3 28, d4 6.
- **Competency:** recall 14, understanding 25, application 16, analysis 17, evaluation 3. That puts 48% of items (36 of 75) at application or above (lint band 45–65%). Higher-order items use new data or questions that the notes do not answer: counterfactuals ("which discovery would weaken"), source-fitness judgements, dating from clues, partly right claims, a survey of donations to read, two debated readings, and the reliability of a diary.
- **Answer keys:** MCQ keys are a7 b7 c7 d8; assertion-reason keys are a4 b1 c1 d1.

### Tests

| Test | Contents |
|---|---|
| Short | **A:** 3 MCQ (the rulers-of-Bhopal claim; a statement a follower of the Buddha would reject; panels of a boar, a lion-headed figure and a prince) + 1 assertion-reason (donors at a stupa). **B:** two 2-mark (features of the sangha; the Mahabalipuram relief) + one 3-mark (the Puranas). **C:** one of two longs (the break with the Vedic tradition / structure and donors of a stupa). **D:** the museum guide's notes on a gateway panel. |
| Long | **A:** 8 MCQ + 2 assertion-reason (the Therigatha; Gandhara and Greek models). **B:** 2 + 2 + (2 or 2) + 3 + (3 or 3). **C:** the Sanchi survival long + (sculpture or temples). **D:** the clerk's diary and the pilgrim's letter. |

- The tests are disjoint and use no deck-check item (deck checks: `fb_unesco`, `m_sacrifice`, `mt_thinkers`, `m_first_nun`, `m_relic`, `mt_symbols`, `m_theravada`).
- Spares used in neither test nor deck: `m_ferment`, `m_cole`, `m_middle_path`, `m_text_fit`, `m_clockwise`, `m_ashoka_claim`, `m_donations`, `m_fit_donor`, `m_empty_seat`, `m_identify_scene`, `m_mahayana`, `m_puranas`, `m_rock`, `m_mahabalipuram`, `ar_gate`, `ar_cole`, `ar_temple`, `ar_barabar`, `tf_gateway`, `tf_vinaya`, `tf_donor_women`, `tf_barabar`, `fb_kusinagara`, `fb_harmika`, `ord_chron`, `ord_clues`, `s2_sites`, `s2_vedika`, `s2_panels`, `s2_deogarh`, `s3_begums`, `s3_stupas`, `s3_relief`, `l_appeal`, `sb_vinaya`, `sb_donors`.

## Competency review

After producer review: seven items retagged to understanding with the text unchanged (the relic-mound item, the donor-source item, the avatar-panel item, the Greek-models assertion-reason, the Mahabalipuram features short answer, the two-teachers short answer and the teachings-and-sangha long answer; difficulty lowered a step where it looked high). Four items rewritten in place into higher-order items: the Mahayana MCQ (application: which find shows Mahayana ideas at a monastery), the gateways short answer (application: how the decision helps historians), the vedika and torana short answer (application: what survives of a ruined stupa can show) and the stupa-building 3-mark short answer (analysis: why the Ashokavadana needs other evidence).

## Facts a reviewer should double-check

- **Dates:**
  - Rigveda compiled about 1500–1000 BCE; Upanishads from about the sixth century BCE; the Buddha and Mahavira in roughly the sixth to fifth centuries BCE (no exact years are given).
  - Ashoka's time as the origin of the Great Stupa (the timeline uses "c. 250 BCE" only to place the label); Buddha images from about the first century CE at Mathura and Taxila; Dashavatara temple at Deogarh about the fifth century CE; Kailashnatha temple at Ellora eighth century CE (placed on the timeline at c. 750 CE, beyond the chapter's 600 CE end, because the syllabus facts name it).
  - Sanchi declared a UNESCO World Heritage site in 1989.
- **Sanchi episode:** the French sought Shahjehan Begum's permission for the eastern gateway and the English also wanted one; both accepted plaster casts and the originals stayed. The Begums of Bhopal paid for preservation; Sultan Jehan Begum funded a museum and guesthouse (where John Marshall lived and wrote) and the publication of his volumes. In `m_cole`, `ar_cole` and `l_survival` Cole's argument is tied to Amaravati and general removal, not to a specific act at Sanchi; `l_survival` calls it "a growing view" (please confirm the wording is safe).
- **Amaravati:** dismantled in the nineteenth century, sculptures to Calcutta, Madras and London; no year or discoverer is given.
- **Other thinkers:** Makkhali Gosala (fate fixed in advance) and Ajita Kesakambalin (the body returns to its elements; nothing survives) are described in SOYL's words, and the claim that their own works have not survived and that they are known mainly through critics' accounts is stated in the deck, the notes and `l_vedic` (please confirm).
- **Buddhist details:** Mahapajapati Gotami first ordained after Ananda spoke for her; Therigatha as verses by bhikkhunis; Tipitaka compiled after his death; Dipavamsa and Mahavamsa from Sri Lanka; the sangha summary (`sb_vinaya`) says the collection records rules for nuns, regular meetings to admit faults, alms and few possessions, admission, settling quarrels and the rains (a general description of the Vinaya, not a quotation; please confirm that each element is accurate).
- **Jaina details:** Mahavira regarded as the 24th tirthankara; the five vows; texts in Prakrit, Sanskrit and Tamil.
- **Stupas:** the Satavahanas as royal donors and the ivory workers' gateway at Sanchi (from the syllabus facts); the Vessantara Jataka on the northern gateway; the four toranas of Sanchi.
- **Sculpture:** the empty seat as meditation (not enlightenment) and the tree as enlightenment follows the syllabus facts. The woman with lotuses and elephants "sprinkling water" read as Maya or Gajalakshmi; Fergusson (tree and serpent worship, without consulting Buddhist texts); Partha Mitter on nineteenth-century attitudes.
- **Mahabalipuram relief:** `m_mahabalipuram` and `s2_relief` treat it as a debate between the descent of the Ganga and the penance of Arjuna; the features named in `s2_relief` (a cleft that may stand for a river with serpent figures; a lone ascetic) are general descriptions that should be checked.
- **Temples:** early temples as small square rooms with a single doorway; later a shikhara; Barabar caves in Bihar cut for the Ajivikas in Ashoka's time; the Kailashnatha temple carved from a single rock; the way it was cut (from the top down) is not stated, and `m_rock` argues only from the fact that cut stone cannot be put back.
- **Rendering:** the four SVG figures were laid out by computed coordinates but nobody has seen them rendered. Check the labels at 360 px on staging (the stupa side view and the temples figure have the most text). The stupa and temple figures are building schematics, not maps.
- **Sensitivity:** every tradition is described as a historian would; no verse of the Rigveda, Upanishads, Tipitaka, Therigatha, Jaina texts or Puranas is quoted or paraphrased closely; the Hinayana label is explained as a term used by Mahayana followers.
- **Competency tags:** source parents take the tag of most parts (part (a) recall, part (b) application, part (c) application or analysis). Items whose tag I was least sure of:
  - `m_text_fit` and `m_fit_donor` (application): source-fitness judgements, but a reviewer may see them as near-definitional matches of text to question.
  - `ar_gate`, `ar_donors`, `ar_barabar`, `ar_gandhara` (analysis): the causal link is judged on short premises; `ar_barabar` may be understanding if the link is read as stated.
  - `m_vaishnava` (application): identification from avatars plus the caution about dating; may be understanding.
  - `s3_readings` (analysis) and `l_appeal` (analysis): the notes state both sides, so a reviewer may downgrade to understanding.
  - `l_survival`, `l_vedic`, `l_sculpture` (evaluation): "to what extent" and "assess" longs that weigh evidence, but the debates are in the notes.
- **Originality:** no NCERT text, source box, caption, map, figure or exercise and no board or sample-paper item is reused (D-036). Real people are named but never quoted.
