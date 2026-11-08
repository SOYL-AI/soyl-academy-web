# ICSE Class 10 History & Civics, Chapter 11 — Mahatma Gandhi and the Mass Movements

`icse-10-history-civics-ch11` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) in the ICSE 2027 History & Civics specimen pattern (`icse-2027-specimen-501-history-civics`, used for pattern only). It is built from `src/` with the shared lib `../icse-10-history-civics-ch01/src/lib.mjs`, which is imported, not copied. Run from `platform/`: `npx tsx content/authored/social-science/icse-10-history-civics-ch11/src/build.mjs`.

The build checks:
- the schema, the pipeline lint and the deterministic verify checks;
- the originality pre-check (exact stem prose against every other chapter);
- word limits, narration rules, the answer-leak scan and the editorial counts.

It then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 18 + 19 slides, 28 of them with a visual (2 SVG figures, plus tables and flows); notes in 6 sections; 30 flashcards; 80 questions worth 193 marks |
| `tests.json` | Two tests; they share no items and use no deck-check item. |
| `src/` | `questions.mjs` (the bank, the two SVG builders, the asserted event years and the Dandi day count) and `build.mjs` (figures, decks, notes, flashcards and tests) |

The two tests in `tests.json`:
- `t_icse10historycivics_ch11_short` on `icse-10-history-civics-chapter-test-short` (20 marks, 30 min). Part I has 5 MCQ, 1 AR and 2 × 2-mark. Part II is one of `l_ncm_causes` and `l_cdm_causes`.
- `t_icse10historycivics_ch11_long` on `icse-10-history-civics-chapter-test-long` (40 marks, 60 min). Part I has 9 MCQ, 1 AR and 5 × 2-mark. Part II is two of `l_chauri_impact`, `l_pact_rtc` and `l_quit_india`.
- Spares in neither test: `l_ncm_programme`, `l_dandi_programme` (reads the Dandi sketch), `l_compare_three`, `l_timeline` (reads the timeline), and several objective and short items.

## Scope

All five syllabus topics are covered:
- **t01** causes of Non-Cooperation (Khilafat, Rowlatt Act, Jallianwala Bagh) and its programme (boycott and constructive items).
- **t02** suspension after Chauri Chaura and the impact of the movement.
- **t03** causes of Civil Disobedience (Simon Commission boycott, Purna Swaraj at Lahore), the Dandi March and the programme.
- **t04** impact of Civil Disobedience, the Gandhi-Irwin Pact, the Second Round Table Conference, renewal (1932) and withdrawal (1934).
- **t05** Quit India: causes, the resolution of 8 August 1942, its course and significance.

**Removed topics:** the clauses of the Simon Commission and of the Cripps proposals appear nowhere; only why the Commission was opposed and why the Cripps Mission's failure mattered are taught.

### Decks

- **Part 1** (18 slides): Non-Cooperation. 4 check slides (`fb_dyer`, `m_positive_item`, `m_check_bardoli`, `tf_ncm_violent`) and 2 worked examples: a 3-mark answer on causes, and sorting imagined actions into boycott and constructive items.
- **Part 2** (19 slides): Civil Disobedience and Quit India. 4 check slides (`fb_purna`, `m_check_dandi_days`, `m_rtc_rep`, `m_aruna`) and 2 worked examples: counting the days of the Dandi March from its dates, and comparing the three movements in a table.
- **Narration:** at most 59 words a slide (mean 42); years are spoken in words; no symbols and no quotations.

### Question bank (80 items)

| Type | Count |
|---|---|
| mcq | 35 (keys a9 b9 c8 d9; 11 are application or analysis items, several set in imagined scenarios) |
| assertion-reason | 6 (ICSE option order, set by `verdict`; keys c, a, c, b, d, c) |
| true-false | 4 |
| fill-blank | 3 |
| match | 1 |
| ordering | 1 |
| short 2-mark | 14 |
| short 3-mark | 4 |
| long 10-mark | 9, each in 3 + 3 + 4 parts with step marks; two read an SVG |
| source-based | 3 (imagined teacher's letter from Amritsar, 1919; imagined marcher's diary, 1930; imagined student's diary, Bombay, 1942); each has an either/or part (c) |

- **Difficulty:** d1 20, d2 30, d3 27, d4 3.
- **Competency:** recall 27, understanding 13, application 10, analysis 25, evaluation 5. That puts 50% of items at application or above (lint band 45–65%), reached with scenario items, not by retagging. (superseded: see Competency audit 2026-11-05)

## Facts a reviewer should double-check

- **Khilafat Movement:** 1919–24; led by the Ali brothers (Muhammad Ali and Shaukat Ali); the issue was the treatment of Turkey and its Sultan, regarded as the Caliph, after the First World War; Gandhiji supported it.
- **Rowlatt Act:** passed March 1919; arrest without warrant and detention without trial; Gandhiji's satyagraha call and the nationwide hartal of **6 April 1919**.
- **Jallianwala Bagh:** **13 April 1919** (Baisakhi), Amritsar; troops under **General Reginald Dyer**; the **Hunter Committee** inquired; **Tagore** renounced his knighthood. No casualty figure is given: "hundreds killed, estimates differ widely".
- **Non-Cooperation programme:** approved at a special session at **Calcutta, September 1920**, confirmed at **Nagpur, December 1920**. Boycott and constructive items as commonly taught; Gandhiji's hope of swaraj within a year is paraphrased.
- **Chauri Chaura:** **5 February 1922**, Gorakhpur district (United Provinces); police station burnt; the death toll of policemen appears as "commonly given as 22" in one model answer only. Suspension by the **Bardoli** resolution of the Congress Working Committee. **Swaraj Party**, 1923, **C. R. Das** and **Motilal Nehru**.
- **Simon Commission:** appointed 1927, all-British, boycotted on arrival in 1928; **Lala Lajpat Rai** injured in a lathi charge at Lahore (1928) and died soon after.
- **Lahore session:** December 1929, presided over by **Jawaharlal Nehru**; **Purna Swaraj**; **26 January 1930** observed as Independence Day. Motilal Nehru presiding at Calcutta in 1928 appears in a solution only.
- **Dandi March:** from **Sabarmati Ashram** on **12 March 1930**, reached Dandi **5 April**, salt law broken **6 April 1930**; **24 days** (computed in code from the dates); distance given as "about 385 km". The sketch is captioned schematic, not a map.
- **Khudai Khidmatgars:** non-violent organisation of the North-West Frontier Province led by **Khan Abdul Ghaffar Khan**.
- **Gandhi-Irwin Pact:** **5 March 1931**; release of prisoners not charged with violence, withdrawal of ordinances, salt-making for personal use near the coast; the Congress to suspend the movement and attend the Second Round Table Conference.
- **Round Table Conferences:** the Congress boycotted the first (1930–31); Gandhiji was the sole Congress representative at the second (London, 1931), which failed mainly over the representation of minorities.
- **Renewal and end:** movement renewed **January 1932**; arrests and bans under **Lord Willingdon**; withdrawn **1934**.
- **Quit India:** Cripps Mission **March 1942** (clauses not taught); Japanese forces in Burma; wartime prices and shortages. Resolution passed by the AICC at **Gowalia Tank, Bombay, 8 August 1942**; the slogan **Do or Die** is named only (no speech quoted); leaders arrested before dawn on **9 August**; **Aruna Asaf Ali** raised the flag at Gowalia Tank; underground leaders and a secret radio; parallel governments at **Ballia, Tamluk and Satara**.
- **Solution-only facts:** Wardha (where the Working Committee drafted the 1942 resolution) and Annie Besant's death in 1933 appear only in MCQ solutions.

## Originality

- **No reuse:** no textbook text or exercise, and no specimen or past-paper item, is reused (D-036). No speech or writing of any historical person is quoted; ideas are paraphrased and attributed. Every letter, diary and quiz scenario is imagined and labelled.
- **Duplicate scan:** the 5-gram near-duplicate scan using the originality gate's own rule found 0 flags (80 stems against about 24,000 others, including CBSE 10 Social Science and CBSE 12 Political Science). The lib's exact-stem pre-check passes.

## Gaps

- **Rendering:** nobody has seen the SVG labels rendered (the 1918–1944 timeline with ten labels in lanes, and the schematic Dandi sketch). They need a look at 360 px on staging. The script check finds no label overflow or overlap.

## Competency audit 2026-11-05

Audit reference: `docs/platform/content-qa/2026-11-05-competency-retag-audit.md`.

- **Retagged honestly:** `m_check_dandi_days` (item 035, a one-step day count) application to understanding.
- **Rewritten as genuine application items (tag kept, demand raised, difficulty 2 to 3):** the scenario wrappers 004, 009, 010, 011, 027, 043 and 045 were replaced, not relabelled.
  - `m_rowlatt_scenario` (004): choose which feature of the Rowlatt Act supports a claim that it was unjust to the innocent, among three true statements about the Act.
  - `m_negative_item` (009): pick the step that answers a shortage of cloth after foreign cloth is boycotted.
  - `m_positive_item` (010): pick the step that fills the gap left by leaving government schools.
  - `m_student_1921` (011): read a story with no law-breaking as Non-Cooperation rather than Civil Disobedience.
  - `m_renew_scenario` (027): choose which development of 1931 best explains the renewal of 1932, among real earlier events.
  - `tf_first_rtc` (043): judge a claim that links the Pact of 1931 to Gandhiji's attendance at the Second Round Table Conference.
  - `tf_pact_salt` (045): apply the home-use salt concession to a villager who sells salt (false).
- **Also retagged by the reviewer (analysis → understanding):** `m_salt_choice` (why salt was an effective symbol) and `m_cdm_vs_ncm` (the main difference between the two movements) restate textbook reasons. The assertion-reason items keep analysis (causal judgement between two statements).
- **Competency now:** recall 27, understanding 16, application 9, analysis 23, evaluation 5. That is **37 of 80 (46.3%)** at application or above, inside the lint band of 45 to 65%.
