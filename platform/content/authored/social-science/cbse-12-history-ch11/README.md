# CBSE Class 12 History, Chapter 11 — Mahatma Gandhi and the Nationalist Movement: Civil Disobedience and Beyond

`cbse-12-history-ch11` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` (draft written by a writer agent, D-050, for producer review) · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032, D-036). It is built from `src/`: run `npx tsx content/authored/social-science/cbse-12-history-ch11/src/build.mjs` from `platform/`. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan, the exact-stem originality pre-check and the editorial counts;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 21 + 21 slides with 34 visuals (2 SVG: a timeline of the chapter, a diagram of five kinds of source; the rest tables and flows); 7 notes sections; 32 flashcards; 75 questions worth 139 marks, including 15 source parts and 5 alternatives |
| `tests.json` | `t_cbse12history_ch11_short` (20 marks, 40 min) on `cbse-12-history-chapter-test-short`, and `t_cbse12history_ch11_long` (40 marks, 90 min) on `cbse-12-history-chapter-test-long` |
| `src/` | `questions.mjs`, `build.mjs`; the shared library is imported from `../../cbse-12-history-ch01/src/lib.mjs` |

## Scope

All five syllabus topics are covered (t05 is the source-practice topic, so source items tag `[n, 5]`):
- **t01** Gandhi's emergence: return in 1915 after about two decades in South Africa, satyagraha, the year of travel, the Banaras Hindu University speech of 1916 (described only), Champaran 1917, Kheda 1918, Ahmedabad 1918 (8 tags, plus 1 shared with t05).
- **t02** Non-Cooperation, Civil Disobedience and the dialogues: the Rowlatt Act, Jallianwala Bagh, the Khilafat alliance, the forms of Non-Cooperation, groups' own readings, Gandhi's appeal (Shahid Amin, G. D. Birla), Chauri Chaura, the arrest of 1922, the Simon Commission, Lahore 1929, the salt law and the Dandi March, the spread of civil disobedience, the Round Table Conferences, the Gandhi–Irwin Pact, separate electorates and the Poona Pact, the Act of 1935 and the elections of 1937 (35 tags, plus 6 shared).
- **t03** Quit India and the last days: the resignations of 1939, the League's resolution of 1940, the Cripps Mission, Quit India and its local course, the talks of 1944, the Cabinet Mission, Direct Action Day, Gandhi's peace work, 15 August 1947 and 30 January 1948 (14 tags, plus 2 shared).
- **t04** Knowing Gandhi: public speeches and articles, private letters, the autobiography, police and Home Department reports, newspapers, dependent and independent sources (7 tags, plus 2 shared).
- **t05** Sources, letters, speeches and newspapers: carried by the five source-based items (each tagged with its content topic and t05), four more items tagged with t05 (`s_new_evidence`, `s3_cloth_table`, `s_date_diary`, `l_sources_eval`), the last notes section and the Part 2 worked examples.

### Decks

- **Part 1:** from Champaran to the dialogues (t01, t02). 21 slides, 4 checks (`m_return`, `tf_sa`, `m_chauri`, `mt_people`), 2 worked examples (dating an undated leaflet from its clues; weighing two arguments fairly in the dispute over separate electorates).
- **Part 2:** Quit India, the last days and sources (t03 to t05). 21 slides, 4 checks (`ord_qi`, `m_assassin`, `fb_autob`, `tf_police`), 3 worked examples (reading an imagined police note on a market meeting; two accounts of one village meeting in 1921; planning a four-mark source question).
- Narration is at most 65 words per slide (mean 47) and uses no symbols or quote marks.
- The worked examples use cases different from the bank (a leaflet naming a Khilafat committee against the handbill of `m_boycott_clue`; a market-meeting note against `sb_police`; a village meeting of 1921 against `s_conflict_src`).

### Question bank (75 items)

| Type | Count |
|---|---|
| mcq | 31 |
| assertion-reason | 7 |
| true-false | 4 |
| fill-blank | 2 |
| match | 2 |
| ordering | 2 |
| short 2-mark | 10 |
| short 3-mark | 6 |
| long 5-mark | 6 |
| source-based | 5, each with an internal choice in part (c) |

- **Source-based items:** an imagined sub-divisional officer's letter on the Champaran inquiry (`sb_champaran`, t01 and t05); an imagined police officer's fortnightly report of April 1930, with numbers (`sb_police`, t02 and t05); an imagined nationalist newspaper's report from Poona in September 1932 (`sb_news`, t02 and t05); an imagined letter between two student volunteers in August 1942 (`sb_qi`, t03 and t05); a SOYL summary of what a political leader's autobiography of the 1920s contains (`sb_autob`, t04 and t05). Four are imagined documents and one is a SOYL summary (`soyl-original`); nothing is quoted. Part (b) of each is a one-mark inference; parts (c)(i) and (c)(ii) are application or higher.
- **Map items:** none. **Map work: none (OA-23, owner decision pending); places are named in words only.** The Dandi March is described by its dates, its start and its end in words, with no route diagram.
- **Difficulty:** d1 13, d2 30, d3 24, d4 8.
- **Competency:** recall 8, understanding 31, application 17, analysis 17, evaluation 2. That puts 48% of items (36 of 75) at application or above (lint band 45–65%).
- **Competency review (producer):** seven items were retagged to understanding with the text unchanged (ids 015, 023, 044, 053, 058, 067, 071: `m_gorakhpur_src`, `m_poona_partly`, `s3_src_plan`, `m_two_sides`, `ar_1939`, `m_autobio_use`, `m_speech_vs_journal`; the notes name the study, the reserved-seats compromise, the three sources, each side's argument and the autobiography caution, and the A-R is an easy non-explanation). Three understanding items were rewritten as higher-order items: `s_early_diff` (two conflicting records of 1917, application), `s3_ncm_features` (a small data set with checked arithmetic, 36 and about 44 per cent, application) and `m_noakhali_role` (a partly right claim inferring a view from absence, analysis).
- **Higher-order devices used:** counterfactuals (which finding would weaken or strengthen a claim: Champaran and Gandhi's fame beyond Bihar; the Khilafat alliance and joint action; groups' own readings of swaraj; the Second Round Table Conference and representation; Gandhi's presence and the calm of Calcutta; Quit India and local initiative), dating from clues (an undated letter from Gandhi's first year home, a handbill against an all-British commission, a volunteer's letter on the march, a letter at the time of the pact, a letter of 1944, a diary of August 1942), data interpretation with checked arithmetic (arrests per incident in a police table; shares of cloth shops that agreed; attendance at nine meetings), source-fitness judgements (rumours in a district; the date of an undated episode in a book; how a leader spoke to villagers), dependent versus independent sources, a partly right claim to correct (the Poona Pact; a student's account of the Congress and the League), alternative explanations of a pattern (Quit India spreading after the arrests).
- **Answer keys:** MCQ keys are a7 b8 c8 d8; assertion-reason keys are b,a,d,a,b,b,c (a2, b3, c1, d1).

### Tests

| Test | Contents |
|---|---|
| Short | **A:** 3 MCQ (a counterfactual on Champaran's reach; the arrests-per-incident table; dependent and independent records of one speech) + 1 assertion-reason (the ministries of 1939 and the elections of 1937). **B:** two 2-mark (two differences between Champaran and Ahmedabad; two explanations of Quit India's spread after the arrests) + one 3-mark (three kinds of source for the response to the march). **C:** one of two longs (assess how far the early campaigns made Gandhi a national leader / weigh the decision to call off Non-Cooperation). **D:** the imagined letter between volunteers in 1942. |
| Long | **A:** 8 MCQ (dating a letter from Gandhi's first year home; rumours of miraculous powers; a handbill against the commission; the Second Round Table Conference and representation; a letter written on the march; a letter of 1944; the calm of Calcutta in 1947; a letter written for printing) + 2 assertion-reason (the Cabinet Mission and Direct Action Day; the fast and the Poona Pact). **B:** 2 + 2 + (2 or 2) + 3 + (3 or 3). **C:** a long on the dialogues of 1930 to 1932 + (Quit India, leaders and local activists / three kinds of source on the march). **D:** the imagined police report and the summary of the autobiography. |

- The tests are disjoint and use no deck-check item (deck checks: `m_return`, `tf_sa`, `m_chauri`, `mt_people`, `ord_qi`, `m_assassin`, `fb_autob`, `tf_police`).
- Spares used in neither test nor deck: `m_champaran`, `m_three_diff`, `sb_champaran`, `m_rowlatt`, `m_jallian_toll`, `m_khilafat_weaken`, `m_ncm_notpart`, `m_ncm_own_ways`, `m_salt_law`, `m_pact_date`, `m_poona_partly`, `ar_calloff_arrest`, `ar_srtc`, `ar_ncm_false`, `tf_1937`, `fb_lahore`, `mt_events`, `ord_cd`, `s_ncm_forms`, `s_chauri`, `s_salt_choice`, `s_conflict_src`, `s3_cd_spread`, `s3_poona_fair`, `l_ncm_describe`, `sb_news`, `m_league1940`, `m_two_sides`, `m_noakhali_role`, `m_qi_local_weaken`, `ar_qi_central`, `tf_1947`, `m_autobio_use`, `m_police_weaken`, `m_speech_vs_journal`.

## Facts a reviewer should double-check

- **Brief facts used as supplied:** the return of January 1915 after about two decades in South Africa, the first use of satyagraha there, the year's travel on Gokhale's advice, the BHU speech of February 1916 (described, not quoted), the three local campaigns and their outcomes as stated, the Rowlatt Act, Jallianwala Bagh (13 April 1919, hundreds killed, estimates vary), Non-Cooperation 1920–22 with the Khilafat cause, Chauri Chaura, the arrest of March 1922 (six years for sedition, release in 1924), Gandhi's appeal and the Gorakhpur study, G. D. Birla, the Simon Commission, Lahore 1929, Independence Day 1930, the Dandi March (12 March to 6 April 1930, about 240 miles), the arrest of May 1930, the dialogues, the Communal Award and the Poona Pact, the Act of 1935 and the 1937 result (8 of 11), the events of 1939 to 1948 as listed, and the cautions about each kind of source.
- **Wording I added or inferred (please confirm):**
  - Kheda is placed in Gujarat (the brief gives Bihar for Champaran; Gujarat for Kheda is general knowledge).
  - `ar_calloff_arrest` treats the sentence as the government's act on a charge of sedition and the calling-off as Gandhi's own decision, so that the second does not explain the first; this is a reading of the brief, not a stated fact.
  - `ar_cabinet` says that the plan "had already failed to hold when Direct Action Day was called" and that the violence followed the breakdown; the brief gives the two events but not their order. Please confirm the sequence (the Cabinet Mission plan of 1946, then Direct Action Day).
  - `s3_rtc`, `ar_srtc` and `m_srtc_weaken` treat the League, the princes and Ambedkar as each challenging the Congress's claim to represent all (from the brief).
  - The Gandhi–Irwin Pact is described as allowing "salt manufacture along the coast" (the brief's wording); `m_pact_date` also uses the voyage to London for the Second Round Table Conference, which is general knowledge.
  - `s_sep_elect`, `s3_poona_fair` and the Part 1 two-column slide state Ambedkar's argument as the depressed classes needing their own representatives, chosen by their own voters, and Gandhi's as a fear of a lasting division of Hindu society; these are the commonly given arguments, worded neutrally. `sb_news` has an imagined paper give a sympathetic summary of the talks. The brief does not say whether the Poona Pact gave more reserved seats than the award offered, so no number of seats is stated.
  - `l_calloff` and the notes say that some leaders and followers were disappointed by the decision (not in the brief; a widely noted reaction, stated in general terms).
  - The statement that some official reports played down the response to the Dandi March (notes, Part 2 deck) follows the brief's example; `s_conflict_src`, `m_police_weaken` and `sb_police` use imagined reports to illustrate it.
  - `sb_autob` says that the book is arranged by episodes and lessons, often gives dates loosely, and describes few of the author's later public campaigns; this is a general description, offered as a summary, with no passage quoted.
  - The Quit India resolution is dated 8 August 1942 and the leaders' arrest "at once" (the brief); `sb_qi` and `s_date_diary` treat the morning after the resolution as the time of the arrests.
  - `m_qi_date` treats Gandhi's release "on grounds of health" and the talks with Jinnah as both falling in 1944 (the brief gives 1944 for both; the health ground is general knowledge).
  - `l_qi_assess` and `s_qi_leaders` offer interpretations (local initiative; the arrests as a spark) framed as explanations to be weighed, not as established fact.
  - `m_calcutta_weaken` and `m_qi_local_weaken` are counterfactual items about imagined records; they assert nothing about the real records.
- **Dates:** no date is used that is not in the brief, except "from late 1946" for Gandhi's walking in Noakhali (the brief says only that he walked through Noakhali after Direct Action Day) and the placing of the Second Round Table Conference in "late 1931".
- **Imagined numbers:** all figures in data items are imagined and checked: 12, 40, 25 and 10 incidents with 30, 95, 120 and 140 arrests give 2.5, about 2.4, 4.8 and 14 arrests per incident; 3 of 12, 12 of 30 and 10 of 20 shops are 25, 40 and 50 per cent; nine meetings of 200 to 300 give 1,800 to 2,700.
- **Sensitivity:** Gandhi, other leaders, the League, the Congress and the British government are presented factually; disagreements (separate electorates; the League and the Congress) are stated as each side's argument; the communal violence of 1946–47 is described in one sentence on the slides and in the notes, without detail and without blaming any community; Gandhi's assassination is stated in neutral wording and the assassin is not named.
- **Rendering:** the two SVG figures were laid out by computed coordinates but nobody has seen them rendered. Check the timeline (thirteen rows; labels left of the dots from 1942 on) and the five-row source diagram at 360 px on staging.
- **Competency tags I was least sure about:** `m_poona_partly` and `m_two_sides` (analysis: partly right claims, but the notes state both sides); `m_police_weaken` (application: an easy source-reliability judgement from a new datum); `m_autobio_use` (application: a new case, but the notes state the caution); `m_dep_indep` and `m_letter_pub_weaken` (analysis: a new datum, though the notes state the general caution); `ar_calloff_arrest` and `ar_1939` (analysis: judging that a true reason does not explain a true assertion); `m_ncm_own_ways` and `m_khilafat_weaken` (analysis: counterfactuals, but the ideas are in the notes); `l_qi_assess`, `l_cd_assess` and `l_emerge` (analysis: weighing, but the notes give the facts on each side); `l_calloff` and `l_sources_eval` (evaluation; the notes give the cautions). The producer may downgrade several.
- **Originality:** no NCERT text, source box, caption, map, figure or exercise and no board or sample-paper item is reused (D-036). Nothing is quoted or translated from any speech, letter, article or autobiography of Gandhi or of any other leader, or from any police report or newspaper; all are described in SOYL's own words.
