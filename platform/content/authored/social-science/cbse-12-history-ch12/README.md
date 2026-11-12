# CBSE Class 12 History, Chapter 12 — Framing the Constitution: The Beginning of a New Era

`cbse-12-history-ch12` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` (draft written by a writer agent, D-050, for producer review) · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032, D-036). It is built from `src/`: run `npx tsx content/authored/social-science/cbse-12-history-ch12/src/build.mjs` from `platform/`. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan, the exact-stem originality pre-check and the editorial counts;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 20 + 20 slides with 32 visuals (3 SVG: a timeline of 1942 to 1950, the steps by which the Constitution was made, the three lists with taxes and Article 356; the rest tables and flows); 7 notes sections; 33 flashcards; 73 questions worth 135 marks, including 15 source parts and 5 alternatives |
| `tests.json` | `t_cbse12history_ch12_short` (20 marks, 40 min) on `cbse-12-history-chapter-test-short`, and `t_cbse12history_ch12_long` (40 marks, 90 min) on `cbse-12-history-chapter-test-long` |
| `src/` | `questions.mjs`, `build.mjs`; the shared library is imported from `../../cbse-12-history-ch01/src/lib.mjs` |

## Scope

All five syllabus topics are covered (t05 is the sources topic, so source items tag `[n, 5]`):
- **t01** A tumultuous time and the making of the Constituent Assembly: the upheavals of 1942 to 1947 (Quit India, the INA, the naval mutiny of 1946, workers' and peasants' movements, communal violence from August 1946, Partition and refugees, the princely states), election by the provincial legislatures under the Cabinet Mission plan, the Congress majority and the League boycott, the first session of 9 December 1946, eleven sessions over 165 days, published debates, public opinion.
- **t02** The dominant voices and the vision: the Objectives Resolution (Nehru, 13 December 1946; described in SOYL's words), and the roles of Patel, Prasad, Ambedkar, Munshi, Alladi Krishnaswamy Aiyar, B. N. Rau and S. N. Mukherjee.
- **t03** Defining rights and the powers of the state: separate electorates (Pocker Bahadur against Patel and Pant), Ranga on the poor, Jaipal Singh on Adivasis, depressed-class members (J. Nagappa), Article 17, reserved seats and posts; the centre and the states (a strong centre against Santhanam), the three lists, shared taxes, Article 356 in one line.
- **t04** The language of the nation: Hindustani, Dhulekar, Durgabai, Ramalingam Chettiar, the Language Committee's compromise (Hindi official, English for fifteen years, other languages in a schedule), official not national.
- **t05** Sources: the Constituent Assembly Debates, committee reports, newspapers and petitions; speeches made in public and for a record, decisions also shaped in committees and party meetings. Carried by four source items tagged with a content topic and t05, one source item tagged t05 alone, further items tagged t05, and the notes section and deck slides on sources.

### Decks

- **Part 1:** the Assembly, its voices and rights (t01, t02, t03 on rights). 20 slides, 4 checks (`m_elected_how`, `mt_roles`, `m_pocker`, `fb_first_session`), 2 worked examples (planning a five-mark answer on how the Assembly was formed; weighing two imagined claims about reserved seats).
- **Part 2:** the state, the language and the sources (t03 on centre and states, t04, t05). 20 slides, 4 checks (`m_santhanam`, `mt_lang`, `ord_language`, `tf_english`), 3 worked examples (reading an imagined count of speeches; reading an imagined reporter's impression; planning a four-mark source question).
- Narration is at most 66 words per slide (mean 44) and uses no symbols or quote marks.
- The worked examples use cases different from the bank (a five-mark plan against the bank's longs; reserved seats as an imagined claim against `ar_reserved` and `s3_rights_groups`; a count of 30 speeches against `sb_language` (c)(ii); a one-line reporter's impression against `sb_notebook` and `m_conflict`).

### Question bank (73 items)

| Type | Count |
|---|---|
| mcq | 30 |
| assertion-reason | 7 |
| true-false | 4 |
| fill-blank | 2 |
| match | 2 |
| ordering | 2 |
| short 2-mark | 9 |
| short 3-mark | 6 |
| long 5-mark | 6 |
| source-based | 5, each with an internal choice in part (c) |

- **Source-based items:** an imagined reporter's notebook from the press gallery in the first week (`sb_notebook`, t01 and t05); an imagined member's letter to his brother on separate electorates (`sb_letter`, t03 and t05); an imagined student's lecture notes on the lists, taxes and two imagined speakers (`sb_notes`, t03 and t05); a SOYL summary of the kinds of speeches made on language (`sb_language`, t04 and t05); a SOYL summary of what the printed Debates contain (`sb_press`, t05). Three are imagined documents and two are SOYL summaries (`soyl-original`); nothing is quoted, and no real member is given an invented quotation (the imagined speakers are imagined). Part (b) of each is a one-mark inference; parts (c)(i) and (c)(ii) are application.
- **Map items:** none. **Map work: none (OA-23, owner decision pending); places are named in words only.**
- **Difficulty:** d1 11, d2 24, d3 29, d4 9.
- **Competency:** recall 10, understanding 28, application 11, analysis 22, evaluation 2. That puts 48% of items (35 of 73) at application or above (lint band 45–65%).
- **Competency review (producer):** thirteen items were retagged to understanding with the text unchanged, because they are scenario wrappers or restate the notes (`m_rights_claim`, `m_roles_claim`, `m_ranga_apply`, `m_petition`, `m_lists_pattern`, `m_transition_fear`, `m_claim_fix`, `m_source_fit`, `s_ranga`, `s_debates_reading`, `s3_rights_groups`, `s3_centre_args`, `s3_source_plan`), with difficulty lowered a step on five of them. Eight items were rewritten in place into higher-order items, each built on a new imagined datum: `s_context` (two conflicting records of a naval mutiny, analysis), `s_resolution` (a report that never cites the Resolution: an explanation consistent with the claim and a refuting finding, analysis), `s_tribal` (12 per cent of 40 seats against 3, application), `s_indirect` (1,000,000 adults, 15 per cent with a vote, 200 legislators choosing 20 members, application), `s3_language_args` (two reports against a count of 8, 7 and 5 speakers out of 20, analysis), `l_context` (assess "bound to dominate" with an imagined 150-member legislature split 90, 50 and 10, 10 seats and a boycott, analysis), `m_patel_arg` (a letter against a count of 15, 6 and 3 speakers out of 24, application) and `m_compromise` (two opposite private complaints about the fifteen years, analysis).
- **Higher-order devices used:** counterfactuals (`m_public_weaken`, `m_resolution_weaken`, `m_electorate_support`), dating from clues (`m_date_diary`, `m_date_partition`), checked arithmetic on imagined data (`m_boycott_share`, `m_patel_arg`, `s_tribal`, `s_indirect`, `s3_language_args`, `l_context`), conflicting records (`m_conflict`, `m_compromise`, `s_context`), dependent sources (`m_dependent`), source fitness (`m_committee`, `tf_silence`), assertion-reason with a true but non-explaining R (`ar_reserved`, `ar_centre`, `ar_debates`) or a reason that links two views (`ar_conflict`), the evaluation longs (`l_rights_assess`, `l_language`, `l_sources`, `l_centre`) and the source items.
- **Tags still worth a second look:** `m_open_question`, `m_resolution_weaken`, `m_public_weaken` and `m_electorate_support` (analysis; counterfactuals or inferences on claims the notes state), `m_fiscal` and `s_356` (application), `s_compromise_view` (application), `ar_reserved`, `ar_centre` and `ar_debates` (analysis; the answer rests on seeing that R states a limit or a reply). `ord_context` and `ord_language` are understanding.
- **Answer keys:** MCQ keys are a7 b7 c8 d8; assertion-reason keys are a,b,a,b,d,a,b (a3, b3, d1; no c).

### Tests

| Test | Contents |
|---|---|
| Short | **A:** 3 MCQ (dating a newspaper report of the Partition years; what the Resolution leaves open; which question the Debates can answer) + 1 assertion-reason (reserved seats and exclusion). **B:** two 2-mark (aims of the Resolution; two members' views of the language compromise) + one 3-mark (two imagined arguments matched to Santhanam and the tax sharing). **C:** one of two longs (assess the view on separate electorates / to what extent language was a compromise). **D:** the imagined reporter's notebook. |
| Long | **A:** 8 MCQ (dating a diary; the claim that Ambedkar alone wrote the Constitution; a finding that supports an argument against separate electorates; Ranga's argument applied; an 80 per cent budget figure; the claim about the language debate; a short debate after long committee work; a finding that weakens the influence of public opinion) + 2 assertion-reason (the printed Debates; Dhulekar's speeches and the compromise). **B:** 2 + 2 + (2 or 2) + 3 + (3 or 3). **C:** a long on the context + (the centre and the states compared / the Debates evaluated). **D:** the imagined member's letter and the summary on language. |

- The tests are disjoint and use no deck-check item (deck checks: `m_elected_how`, `mt_roles`, `m_pocker`, `fb_first_session`, `m_santhanam`, `mt_lang`, `ord_language`, `tf_english`).
- Spares used in neither test nor deck: `m_adopted_date`, `m_rin`, `m_boycott_share`, `m_resolution_content`, `m_patel_committee`, `m_resolution_weaken`, `m_patel_arg`, `m_petition`, `m_lists_recall`, `m_lists_pattern`, `m_rights_claim`, `m_hindustani`, `m_transition_fear`, `m_compromise`, `m_dependent`, `m_conflict`, `ar_indirect`, `ar_tribal`, `ar_centre`, `ar_hindi_nat`, `tf_franchise`, `tf_separate_rejected`, `tf_silence`, `fb_art17`, `ord_context`, `s_indirect`, `s_ranga`, `s_language_why`, `s3_assembly`, `s3_rights_groups`, `l_vision`, `sb_notes`, `sb_press`.

## Facts a reviewer should double-check

- **Brief facts used as supplied:** the period of framing (December 1946 to November 1949; adopted 26 November 1949; in effect 26 January 1950); the upheavals (Quit India 1942, the INA, the Royal Indian Navy mutiny of 1946 in Bombay, workers' and peasants' movements, communal violence from August 1946, Partition and refugees in 1947, the princely states); election in 1946 by the provincial legislatures under the Cabinet Mission plan; the Congress majority and the League boycott; the first session on 9 December 1946; eleven sessions over 165 days; the Resolution moved by Nehru on 13 December 1946; the roles of Patel, Prasad, Ambedkar, Munshi, Alladi Krishnaswamy Aiyar, B. N. Rau and S. N. Mukherjee; Pocker Bahadur, Patel, Pant, Ranga, Jaipal Singh and J. Nagappa on rights; Article 17 and reservation of seats and posts for the Scheduled Castes and Scheduled Tribes; the three lists, shared taxes, Article 356; Santhanam; Hindustani, Dhulekar, Durgabai, Ramalingam Chettiar and the language compromise.
- **Wording I added or inferred (please confirm):**
  - Article 356 is stated as the centre taking over a state's administration "on a Governor's report of breakdown" (the brief says on the Governor's recommendation; the Article itself also allows the President to act otherwise).
  - The naval mutiny is placed in "early 1946" (the month is not stated); the Quit India movement as "August 1942" on the timeline; "communal violence begins" as August 1946 on the timeline.
  - "Elected in 1946": the elections were held in mid-1946, with the first session in December; I do not give a month for the elections.
  - Separate electorates are not dated; the debate on them took place in 1947 (I believe), and `sb_letter` says "after the troubles of this year" without a year.
  - The Resolution is described as setting out "a direction, not the detailed means" (SOYL's reading; `m_open_question` relies on it).
  - `m_rin` asks where the naval mutiny "began" (Bombay, as the brief says); it later spread to other ports.
  - `s3_centre_args` and `sb_notes` use imagined speakers (a southern and a northern province); the second argument in `s3_centre_args` (one authority holding most taxing power so that poorer regions are not left behind) is imagined, not attributed to any real member.
  - The "security of tenure" measure in `s_ranga` is a general example, not a measure Ranga is reported to have proposed.
  - `m_petition` says Article 17 answers a refusal of water at a village well because of caste; this treats such a refusal as a practice of untouchability.
  - The language provisions are summarised as in the brief (Hindi in Devanagari official; gradual change; English for fifteen years; other languages recognised in a schedule); I do not name the schedule.
  - Santhanam's argument is given as in the brief ("ill-equipped", dependence from the allocation of finances), without any detail of his speech.
  - One neutral line that the Constitution has since been amended is in the notes (section 5); nothing else after 1950 is claimed.
- **Imagined numbers:** all figures in data items are imagined: 20 seats shared 15, 4 and 1, with the 4 absent leaving 16 attending and 15 of 16 about 94 per cent against 75 per cent; two constitutions of 100 subjects (40, 40, 20 and 65, 20, 15); an 80 per cent budget figure; a count of 30 speeches, 18 from one region. No real count of members, parties or votes is used.
- **Dates:** no date is used that is not in the brief, except "early 1946" for the mutiny, "August 1942" for Quit India and the 1948 and 1949 settings of imagined documents (`m_petition`, `m_transition_fear`).

## Originality

Every source is an imagined document or a SOYL summary, labelled as such, with `origin: 'soyl-original'`. Nothing from the Constituent Assembly Debates, the text of the Objectives Resolution or the text of the Constitution is quoted, translated or closely paraphrased; real members are named and their arguments described in SOYL's words without quotation marks and without invented quotations; articles are cited by number with a paraphrase. No NCERT text, source box, table, caption, map or exercise and no board or sample-paper item is reused (D-036). The build's exact-stem pre-check passes against every other authored chapter. No judgement of present-day parties or governments is made, and Partition and its violence are mentioned factually and briefly.
