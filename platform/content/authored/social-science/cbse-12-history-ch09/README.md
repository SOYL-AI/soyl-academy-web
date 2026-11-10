# CBSE Class 12 History, Chapter 9 — Colonialism and the Countryside: Exploring Official Archives

`cbse-12-history-ch09` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` (draft written by a writer agent, D-050, for producer review) · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032, D-036). It is built from `src/`: run `npx tsx content/authored/social-science/cbse-12-history-ch09/src/build.mjs` from `platform/`. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan, the exact-stem originality pre-check and the editorial counts;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 21 + 21 slides with 34 visuals (3 SVG: a timeline of the chapter, the chain of payment under the settlement, the growth of a debt under new bonds; the rest tables and flows); 7 notes sections; 32 flashcards; 72 questions worth 134 marks, including 15 source parts and 5 alternatives |
| `tests.json` | `t_cbse12history_ch09_short` (20 marks, 40 min) on `cbse-12-history-chapter-test-short`, and `t_cbse12history_ch09_long` (40 marks, 90 min) on `cbse-12-history-chapter-test-long` |
| `src/` | `questions.mjs`, `build.mjs`; the shared library is imported from `../../cbse-12-history-ch01/src/lib.mjs` |

## Scope

All four syllabus topics are covered (this chapter has four topics; t04 is the sources topic, so source items tag `[n, 4]`):
- **t01** Bengal and the Permanent Settlement: Cornwallis and 1793, the fixed demand, zamindars recognised, the curbs on their powers, the aims, the causes of default, the sunset law, the Burdwan auction of 1797, benami sales, women's names, buying back through agents, lathyals, jotedars and sharecroppers (21 tags, plus 2 shared with t04).
- **t02** The Paharias and the Santhals: the Rajmahal hills, livelihood, raids read two ways, extermination and Cleveland's pacification, Buchanan's journals, the Santhals as settled cultivators, the Damin-i-Koh, grievances, the hul, the Santhal Pargana (17 tags, plus 1 shared).
- **t03** The Deccan riots and cotton: ryotwari, the 30-year assessment, the 1830s depression, the cotton boom of the American Civil War, the chain of credit, the bust of 1865, the Limitation Law of 1859 and new bonds, the riots at Supa in 1875, the Deccan Riots Commission (17 tags, plus 2 shared).
- **t04** Sources: official reports. Carried by five source-based items (each tagged with its content topic and t04), 12 items tagged t04 alone (the Fifth Report, dependent sources, conflicting accounts, silences, a commission's statistics, dating from clues) and the notes section and deck slides on official archives.

### Decks

- **Part 1:** Bengal, the Paharias and the Santhals (t01, t02). 21 slides, 4 checks (`ar_sunset`, `m_ps_who`, `mt_hills`, `ord_hills`), 3 worked examples (reading an imagined 500-rupee ledger; reading an imagined officer's note on a hill people; comparing the Paharias and Santhals on three criteria).
- **Part 2:** the Deccan and official archives (t03, t04). 21 slides, 4 checks (`m_cotton_demand`, `ord_cotton`, `tf_supa`, `m_fifth_what`), 3 worked examples (how a 100-rupee debt grows under new bonds; reading an imagined district report for its silences; planning a four-mark source question).
- Narration is at most 68 words per slide (mean 47) and uses no symbols or quote marks.
- The worked examples use cases different from the bank (a 500-rupee ledger against the 600-rupee zamindar of `m_ps_data`; a hill people's idle plots against `s_two_views` and `sb_journal`; a 100-rupee bond at 10 per cent against `m_bond_rate`, `s3_bond_calc` and `sb_bonds`; a district report that lists tours and quiet villages against `m_official_silent`).

### Question bank (72 items)

| Type | Count |
|---|---|
| mcq | 29 |
| assertion-reason | 7 |
| true-false | 4 |
| fill-blank | 2 |
| match | 2 |
| ordering | 2 |
| short 2-mark | 9 |
| short 3-mark | 6 |
| long 5-mark | 6 |
| source-based | 5, each with an internal choice in part (c) |

- **Source-based items:** an imagined Collector's letter on auctions (`sb_collector`, t01 and t04); a SOYL summary of what the Fifth Report contains (`sb_fifth`, t01 and t04); an imagined surveyor's journal on a hill people (`sb_journal`, t02 and t04); an imagined ryot's statement on bonds, with numbers (`sb_bonds`, t03 and t04); a SOYL summary of what the Deccan Riots Commission's report contains (`sb_commission`, t03 and t04). Three are imagined documents and two are SOYL summaries (`soyl-original`); nothing is quoted. Part (b) of each is a one-mark inference; parts (c)(i) and (c)(ii) are application or analysis.
- **Map items:** none. **Map work: none (OA-23, owner decision pending); places are named in words only.**
- **Difficulty:** d1 14, d2 29, d3 21, d4 8.
- **Competency:** recall 9, understanding 27, application 13, analysis 21, evaluation 2. That puts 50% of items (36 of 72) at application or above (lint band 45–65%). 
- **Competency review (producer):** five items were retagged to understanding with the text unchanged (ids 017, 019, 029, 050, 070: `s_ryot_default`, `s3_ps_compare`, `m_group_table`, `ar_cotton`, `s_report_questions`; the options are the notes' own devices, the notes give the jotedar's advantages, classification from listed features, an easy non-explanation, the generic checks the notes state), difficulty lowered a step where it looked high.
- **Higher-order devices used:** counterfactuals (which finding would weaken or strengthen a link: low prices and default, jotedar power, raids as a claim to a share, Cleveland's allowances and peace, the cotton boom and the Civil War), dating from clues (a Collector's undated letter, an undated officer's letter from the Santhal region, a sahukar's page from the boom years, a letter that refers to the commission's report), data interpretation with checked arithmetic (a fixed demand against four years' collections; the rate that turns a 50-rupee bond into an 80-rupee bond; assessment as a share of crop value after a price fall; shares of villages with bonds burnt; bond growth with interest added), conflicting records (a surveyor's journal against a community's songs; the Fifth Report against district registers; a collector against a petition), dependent sources (the assertion-reason `ar_copy`), source fitness (what the Fifth Report cannot say about sharecroppers), a classification of two groups from imagined income figures, and an evaluation of how to combine the Fifth Report, Buchanan and the commission.
- **Answer keys:** MCQ keys are a7 b7 c7 d8; assertion-reason keys are a,a,b,b,a,b,a (a4, b3).

### Tests

| Test | Contents |
|---|---|
| Short | **A:** 3 MCQ (low prices and default; Paharia raids as a claim to a share; an inference from a police report on the 1875 riots) + 1 assertion-reason (two reports giving one figure). **B:** two 2-mark (a zamindar's options in a failed harvest; an officer's view of shifting cultivation) + one 3-mark (a bond with new-bond interest). **C:** one of two longs (assess the claim that the Permanent Settlement failed / assess moneylenders versus the revenue system as the cause of the riots). **D:** the imagined surveyor's journal. |
| Long | **A:** 8 MCQ (dating a Collector's letter; jotedar power; a table of two groups; dating a letter from the Santhal region; the cotton boom and the Civil War; the rate on a bond; a taluka table; conflicting accounts of a hill village) + 2 assertion-reason (the curbs on zamindars and the fixed demand; falling demand and the chain of credit). **B:** 2 + 2 + (2 or 2) + 3 + (3 or 3). **C:** a long on the Permanent Settlement + (the Paharias and Santhals compared / the causes of the Deccan riots). **D:** the imagined Collector's letter and the summary of the commission's report. |

- The tests are disjoint and use no deck-check item (deck checks: `ar_sunset`, `m_ps_who`, `mt_hills`, `ord_hills`, `m_cotton_demand`, `ord_cotton`, `tf_supa`, `m_fifth_what`).
- Spares used in neither test nor deck: `m_ps_aim_not`, `m_benami_evidence`, `m_ps_data`, `mt_ps_terms`, `fb_adhiyar`, `ar_women_est`, `tf_perpetuity`, `s_default_alt`, `s_jot_base`, `s3_ps_problems`, `s3_ps_compare`, `sb_fifth`, `m_rajmahal`, `m_cleveland_weaken`, `m_buchanan_response`, `m_santhal_pargana`, `ar_pargana`, `ar_paharia_push`, `tf_santhal_life`, `fb_damin`, `m_ryotwari`, `m_limit_why`, `m_cotton_date`, `m_revenue_data`, `s_ryotwari_why`, `sb_bonds`, `m_fifth_voices`, `m_cotton_exagg`, `m_official_silent`, `m_dating_report`, `tf_report`, `l_archives`.

## Facts a reviewer should double-check

- **Brief facts used as supplied:** the Settlement (Cornwallis, 1793, in perpetuity, zamindars as rajas and taluqdars, the three aims, the curbs on troops, customs and courts, the high demand, low prices in the 1790s, the invariable sum, the sunset law, the 1797 auction of Burdwan estates, benami sales, women's names, buying back through agents, lathyals); jotedars (north Bengal, Dinajpur, thousands of acres, trade and moneylending, adhiyars or bargadars, resisting zamindars, buying estates at auction); the Fifth Report (1813, the fifth of a series, about 1,002 pages, over 800 of appendices, the critical aim); the Paharias, Cleveland, Buchanan (1810–11); the Santhals (from the 1780s, Damin-i-Koh in 1832, the three grievances, the hul of 1855–56, Sidhu and Kanhu Murmu, the Santhal Pargana in 1856); ryotwari (1820s, 30-year revision, the 1830s depression); the cotton interests (1857 and 1859), the Civil War (1861–65), the Limitation Law of 1859, the riots at Supa in May 1875, the commission (Government of Bombay; report to Parliament in 1878).
- **Wording I added or inferred (please confirm):**
  - `mt_ps_terms` describes a taluqdar as "a landholder who, like a raja, was recognised as a zamindar".
  - `mt_hills` and the Santhal slides gloss "dikus" as moneylenders and other outsiders "as the Santhals called them" (the brief says "moneylenders (dikus)").
  - `s_two_views` offers a Paharia-centred reason for shifting cultivation (patches left while the forest grows back); this is a general account of shifting cultivation, not a statement from the brief.
  - `l_ps_assess` says the fixed demand gave the Company "a predictable sum", so the first aim was "partly met", and that "nothing above shows investment"; these are reasoned judgements, framed as such.
  - `ar_curtail` says the curbs concerned control over the zamindars' military, customs and judicial powers; the brief lists the curbs but not the reason.
  - `l_cotton_assess` says ryots with high assessments were "likely pushed to borrow" (an inference, flagged as likely); `sb_bonds` has the ryot borrow "to buy seed and pay the assessment".
  - `sb_commission` says only that the inquiry was ordered by the provincial government; it does not say who sat on the commission.
  - `m_bond_rate`, `s3_bond_calc`, `sb_bonds` and the Part 2 worked example treat interest as simple interest on the bond's principal, restarted at each new bond; the real rates are unknown and all figures are imagined.
- **Dates:** no date is used that is not in the brief, except the phrase "late eighteenth century" in `m_rajmahal` and the placing of Buchanan's 1810–11 tour as one dot (at 1810.5) on the timeline. The "1780s" bar for Cleveland on the timeline runs from 1780 to 1789.
- **Imagined numbers:** all revenue, collection, bond and table figures in the bank and decks are imagined and checked in the solutions: 2,460 against 2,400, and 480 against 600; 36 of 60 over three years is 20 per cent a year; 12 of 40 is 30 per cent and 12 of 24 is 50 per cent; 18 of 90, 12 of 24 and 9 of 30 are 20, 50 and 30 per cent; 200, 260 and 338 against 320; 9 of 24 is 37.5 per cent and 5 of 9 is about 56 per cent.
- **Sensitivity:** the Paharias and Santhals are described from the evidence of their ways of life; officials' views are named as officials' views (slides, notes, `m_buchanan_response`, `m_conflict_views`, `sb_journal`); the Company's campaigns, the hul and the riots are described in a sentence each, without detail.
- **Rendering:** the three SVG figures were laid out by computed coordinates but nobody has seen them rendered. Check the timeline (ten rows; labels left of the 1861 to 1865 bar and of the 1875 and 1878 dots), the chain diagram (four boxes with three labelled arrows) and the bond bars at 360 px on staging.
- **Competency tags I was least sure about:** `m_ps_data` and `m_bond_rate` (application: arithmetic plus a reading; the second is a reverse calculation), `m_group_table` (application: criteria applied to new figures), the dating items `m_date_clue`, `m_santhal_date`, `m_cotton_date` and `m_dating_report` (application), `m_benami_evidence` (application: the notes define benami, the item asks for the test), `m_buchanan_response` (understanding: the notes state the caution), `m_fifth_voices`, `m_cotton_exagg` and `m_official_silent` (analysis: the notes state the Report's critical aim and the reader's cautions, so the producer may lower them), `ar_curtail`, `ar_pargana`, `ar_cotton` and `ar_copy` (analysis: a link judged between true statements), `s_ryot_default`, `s_two_views`, `s_bond_trick`, `s_report_questions`, `s3_ps_compare` and `s3_archive_plan` (application: close to notes-stated points applied to new cases), `l_ps_assess` and `l_cotton_assess` (evaluation; the notes give much of the material), `l_compare` and `l_archives` (analysis, likewise), and the source parent tags. `s3_bond_calc` repeats the mechanism of the Part 2 worked example with different numbers, so it may be downgraded.
- **Originality:** no NCERT text, source box, caption, map, figure or exercise and no board or sample-paper item is reused (D-036). Nothing is quoted or translated from the Fifth Report, Buchanan's journals, the Deccan Riots Commission report or any other document; they are described in SOYL's own words.
