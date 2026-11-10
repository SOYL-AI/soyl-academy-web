# CBSE Class 12 History, Chapter 10 — Rebels and the Raj: The Revolt of 1857 and its Representations

`cbse-12-history-ch10` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` (draft written by a writer agent, D-050, for producer review) · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032, D-036). It is built from `src/`: run `npx tsx content/authored/social-science/cbse-12-history-ch10/src/build.mjs` from `platform/`. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan, the exact-stem originality pre-check and the editorial counts;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 21 + 21 slides with 35 visuals (3 SVG: the revolt in time from 1856 to 1859, how annexation led to Awadh's grievances, how an image is made; the rest tables and flows); 7 notes sections; 33 flashcards; 75 questions worth 139 marks, including 15 source parts and 5 alternatives |
| `tests.json` | `t_cbse12history_ch10_short` (20 marks, 40 min) on `cbse-12-history-chapter-test-short`, and `t_cbse12history_ch10_long` (40 marks, 90 min) on `cbse-12-history-chapter-test-long` |
| `src/` | `questions.mjs`, `build.mjs`; the shared library is imported from `../../cbse-12-history-ch01/src/lib.mjs` |

## Scope

All five syllabus topics are covered:
- **t01** Pattern of the rebellion and its spread: Meerut and Delhi, rumours, the common pattern, evidence for planning, leaders (16 tags, plus 2 shared with t05).
- **t02** Awadh in revolt: Subsidiary Alliance, annexation of 1856, the court and army, taluqdars and the summary settlement, peasants, sepoys, Lucknow, the doctrine of lapse as context (14 tags, plus 1 shared).
- **t03** What the rebels wanted; repression: proclamations, unity, an earlier world, parallel administrations, targets, the laws of 1857, the recapture of Delhi and Lucknow, the Crown (17 tags, plus 2 shared).
- **t04** Images of the revolt: British pictures and cartoons, Barker, Paton, Punch and Clemency Canning, nationalist images, Savarkar, the naming debate (17 tags, plus 6 shared).
- **t05** Sources: visual representations. Carried by the five source-based items (each tagged with its content topic and t05), six t05-tagged objective and short items (dating an undated letter, source fitness for a proclamation, a print by an artist who was not there, choosing a source for British feelings, a painting beside a diary, an assertion-reason on a print) and the visual-reading slides and notes section.

### Decks

- **Part 1:** the rebellion and Awadh (t01, t02). 21 slides, 3 checks (`m_meerut`, `mt_leaders`, `fb_taluqdar`), 3 worked examples (reading an imagined magistrate's note on the two-stage pattern; weighing two explanations for an imagined village that rose with its taluqdar; building a chronology from three imagined undated notes).
- **Part 2:** aims, repression and images (t03, t04, t05). 21 slides, 4 checks (`m_proclaim`, `ord_events`, `mt_images`, `fb_savarkar`), 3 worked examples (reading an imagined rebel notice; reading an imagined engraving of 1858 with a soldier and a child; sorting three imagined images by clues).
- Narration is at most 61 words per slide (mean 43) and uses no symbols or quote marks.
- The worked examples use cases different from the bank (an imagined magistrate's note against `sb_report`; a village weighing against `m_awadh_peasant` and `sb_diary`; three notes against `m_date_letter`; a merchants-and-artisans notice against `sb_proclaim`; a soldier with a child against `sb_print` and `s3_image_read`; a Punch cartoon in the sorting example against `m_canning_cartoon`).

### Question bank (75 items)

| Type | Count |
|---|---|
| mcq | 30 |
| assertion-reason | 7 |
| true-false | 4 |
| fill-blank | 3 (one with two blanks) |
| match | 2 |
| ordering | 2 (chronology, `marks: 1`) |
| short 2-mark | 10 |
| short 3-mark | 6 |
| long 5-mark | 6 |
| source-based | 5, each with an internal choice in part (c) |

- **Source-based items:** an imagined district officer's report on a cantonment town (`sb_report`); an imagined diary of a taluqdar's clerk in Awadh (`sb_diary`); a SOYL summary of what a rebel proclamation contains (`sb_proclaim`); an imagined print sold in London in 1858 (`sb_print`) and an imagined poster of the 1930s (`sb_poster`), both described by SOYL in words. All are `soyl-original`; no real picture, caption or proclamation is quoted or reproduced. Part (b) of each is a one-mark inference; parts (c)(i) and (c)(ii) are application. Parts (a) are recall and are not answered by the passage.
- **Map items:** none. **Map work: none (OA-23, owner decision pending); places are named in words only.**
- **Difficulty:** d1 14 (19%), d2 28 (37%), d3 25 (33%), d4 8 (11%).
- **Competency (top-level items):** recall 13, understanding 26, application 8, analysis 26, evaluation 2. That puts 48% of items (36 of 75) at application or above (lint band 45–65%).
- **Competency review (producer):** ten items were retagged to understanding (ids 002, 015, 022, 024, 028, 041, 045, 058, 066, 068; difficulty lowered a step on 015, 022, 024, 041, 058, 068). Five were rewritten in place as analysis items: 012 (two imagined station records with the stages in different orders), 027 (a partly right claim about Awadh's peasants), 044 (a finding that would strengthen and one that would weaken a unity claim), 049 (how far laws and reinforcements explain the outcome), 064 (two imagined cartoons and what they can and cannot show). Type, marks, topics, ids and test slots are unchanged. Repeat builds are byte-identical (release.json md5 f9e1d4498b66e707fd988e05d1b649e5, tests.json md5 4b7a709a6478f28e3a9fdcaffa60fbe3). Source-based parents are tagged analysis (most of their parts are inferences or applications of a method to new evidence).
- **Higher-order devices used:** counterfactuals (which finding would weaken the planning view, the peasant-revenue explanation, the claim that British attempts to divide failed, the mutiny label; which would support the link between sepoys and peasants, the case that moneylenders were seen as allies of the British, the claim that nationalist pictures reflect their own time), dating from clues (an undated letter about the emperor in the Red Fort), classification of new cases against criteria (three imagined towns against the two-stage pattern; two imagined states against the doctrine of lapse; a finding that shows a parallel administration), source fitness (what a proclamation can answer; what an artist who never visited India can offer; which source tells British feelings at the time), data interpretation with checked arithmetic (shares of Awadh-born sepoys; a fall of three rupees in a hundred), complementary records (two notices, one for unity and one against a moneylender), and evaluations of two pictures and of the naming debate.
- **Answer keys:** MCQ keys are a7 b7 c8 d8; assertion-reason keys are a2 b2 c2 d1.

### Tests

| Test | Contents |
|---|---|
| Short | **A:** 3 MCQ (three imagined towns against the pattern; a finding that weakens the unity claim; an artist who never visited India) + 1 assertion-reason (sepoys from Awadh and annexation, both true, not explained). **B:** two 2-mark (chapatis: an inference and its limit; a civilian trying a suspect under the laws of 1857) + one 3-mark (reading an imagined print). **C:** one of two longs (assess the common vision / assess a print and a poster as evidence). **D:** the imagined diary of a taluqdar's clerk. |
| Long | **A:** 8 MCQ (which rumour spreads fastest; weakening the planning view; evidence for the sepoy-peasant link; the doctrine of lapse and Awadh; evidence on the moneylender explanation; a finding for a parallel administration; an imagined Canning cartoon; a finding that mutiny does not fit) + 2 assertion-reason (a proclamation as a single programme; a print and Indian support). **B:** 2 + 2 + (2 or 2) + 3 + (3 or 3). **C:** a long on planning and circumstances + (the repression / the naming debate). **D:** the imagined district officer's report and the imagined print. |

- The tests are disjoint and use no deck-check item (deck checks: `m_meerut`, `mt_leaders`, `fb_taluqdar`, `m_proclaim`, `ord_events`, `mt_images`, `fb_savarkar`).
- Spares used in neither test nor deck: `m_cartridge`, `m_nonelite`, `m_date_letter`, `m_gov_targets`, `tf_kunwar`, `fb_zafar`, `s_rumours`, `s3_leaders`, `ar_rumour`, `m_dalhousie`, `m_birjis`, `m_awadh_peasant`, `m_awadh_losers`, `ar_subsidiary`, `tf_awadh_long`, `s_peasant_taluq`, `l_awadh`, `m_rangoon`, `m_proclaim_fit`, `ar_repress`, `ar_unity`, `tf_crown`, `s3_repress`, `m_noelpaton`, `m_vengeance`, `m_barker`, `m_nationalist_why`, `m_naming`, `m_sources_fit`, `tf_images_photo`, `ord_images`, `s_nationalist`, `s_print_diary`, `sb_proclaim`, `sb_poster`.

## Facts a reviewer should double-check

- **Brief facts used as supplied:** Meerut on 10 May 1857 and the punishment of soldiers who refused the new cartridges; Delhi and the Red Fort on 11 May; Bahadur Shah Zafar asked to lead; the towns of spread; the pattern (arms, treasury, jail, telegraph office, records room, then civilians and moneylenders); messages between regiments and night panchayats of sepoys; the leaders (Nana Sahib, Rani Lakshmi Bai, Kunwar Singh, Begum Hazrat Mahal and Birjis Qadr, Shah Mal of the Baraut region, Maulvi Ahmadullah Shah of Faizabad, Gonoo of Singhbhum); the rumours (cartridge fat, bone dust, chapatis) and the fears behind them (sati, widow remarriage, English education, missionaries, annexations); the Awadh facts (annexation in 1856 by Dalhousie on grounds of misgovernment, Wajid Ali Shah exiled to Calcutta, Subsidiary Alliance by Wellesley in 1798, summary settlement, taluqdars, unemployment from the dissolved court and army, revenue demand not much lower, sepoys from Awadh villages, long resistance); the doctrine of lapse with Jhansi, Satara and Nagpur; proclamations (in Bahadur Shah's name and from Azamgarh in August 1857, described only); aims, parallel administrations, targets; the laws of May and June 1857, Delhi in late September 1857, Bahadur Shah to Rangoon and death in 1862, Lucknow in March 1858, the Rani in June 1858, the Crown in 1858; the images (Barker 1859, Paton 1858, Punch and Clemency Canning, nationalist pictures, Savarkar 1909).
- **Added from general knowledge (not in the brief):** that the cow-and-pig fat rumour offended both Hindu and Muslim sepoys because of religious feelings about those animals (`m_cartridge`, notes section 1); Canning's being Governor-General during the revolt; the doctrine of lapse as "wider setting" for Awadh (notes say that Awadh itself was taken on the other ground).
- **Timeline figure:** positions within a year are approximate (Awadh early 1856, Meerut May 1857, Delhi late September 1857, Lucknow March 1858, Jhansi June 1858; the Crown, Paton and Barker are placed by year only and labelled with the year). Please check that the dots do not suggest more precision than the labels claim.
- **Wording to confirm:** "Maulvi Ahmadullah Shah ... a maulvi" (the table gives no further background); "a state hit by the doctrine of lapse" for the Rani's Jhansi; the table row that peasants "followed their taluqdars" before 1856 (an inference from the brief's statement that many peasants joined their taluqdars); "killed in battle" in a model answer (the brief says "died fighting"); "Kunwar Singh ... took up arms" (flashcards say only that he was a zamindar of Arrah and a leader).
- **Imagined numbers:** 100 and 97 rupees (`s_peasant_taluq`), Regiments A and B of 600 of 800 and 270 of 900 (`s3_awadh_sepoys`: 75 per cent and 30 per cent) and all passage content are imagined.
- **Sensitivity:** violence by rebels and by the British is mentioned only as the pattern of attacks, martial law and trials, and no incident at Kanpur or elsewhere is described. The British attempt to present the revolt as a communal conflict is described neutrally as having largely failed. Please confirm the tone of `ar_unity`, `m_unity_weaken` and slide 3 of Part 2.
- **Rendering:** the three SVG figures were laid out by computed coordinates but nobody has seen them rendered. Check the timeline (eight rows; labels left and right of the dots), the Awadh diagram (a top box, three boxes, three arrows into a bottom box) and the image chain (four boxes, three arrows, a lower box with an arrow up) at 360 px on staging.
- **Competency tags I was least sure about:** `m_rumour_test` and `m_lapse` (application: a principle applied to new rumours or states, though the principle is in the notes), `m_pattern_town` (application: criteria checked against three new towns), `m_gov_targets` (analysis: an inference about what the three targets share, not stated in the notes), `m_awadh_sepoy`, `m_awadh_peasant`, `m_planning_weaken`, `m_unity_weaken`, `m_moneylender`, `m_canning_cartoon`, `m_label_fit` and `m_nationalist_why` (analysis: counterfactuals or source-fitness judgements whose underlying links are partly in the notes), `ar_awadh_sepoys`, `ar_proclaim`, `ar_print`, `ar_rumour` (analysis: the causal link must be judged; `ar_print` and `ar_rumour` may be downgraded because their reasoning is close to the notes), `s_repress_law`, `s_chapati`, `s_peasant_taluq`, `s_print_diary`, `s_nationalist` and `s3_image_read` (application: ideas in the notes applied to a new case), `s3_awadh_sepoys` (application: simple arithmetic with a new reading), `s3_leaders` and `s3_naming` (analysis: the notes give the facts, the inference is new), the longs `l_spread`, `l_awadh`, `l_aims` (analysis: the notes give much of the material but each stem asks for a weighing) and `l_images`, `l_naming` (evaluation), and the source parent tags.
- **Originality:** no NCERT text, source box, caption, picture or exercise and no board or sample-paper item is reused (D-036). No proclamation, report, letter, newspaper, cartoon or painting caption of the period is quoted, translated or closely paraphrased; paintings and cartoons are named and described in SOYL's own words, and the pictures in source items are imagined.
