# ICSE Class 10 History & Civics, Chapter 7 — The First War of Independence, 1857

`icse-10-history-civics-ch07` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) in the ICSE 2027 History & Civics style (specimen 501: Part I has 1-mark objective items and 2-mark short answers; Part II has 10-mark questions in 3 + 3 + 4 parts). It is built from `src/`: run `npx tsx content/authored/social-science/icse-10-history-civics-ch07/src/build.mjs` from `platform/`.

The build imports the shared lib from `../../icse-10-history-civics-ch01/src/lib.mjs` and:
- validates the schema;
- runs the pipeline lint, the deterministic verify checks and the exact-stem originality pre-check;
- checks word limits, narration rules, the answer-leak scan and the editorial counts;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 18 + 16 slides with 23 visuals: 3 SVG (four groups of causes, a schematic timeline from 1828 to 1860, an administration chart before and after 1858) plus tables and flows; 6 notes sections; 30 flashcards; 79 questions worth 176 marks |
| `tests.json` | `t_icse10historycivics_ch07_short` (20 marks, 30 min) and `_long` (40 marks, 60 min) on the subject blueprints `icse-10-history-civics-chapter-test-short` and `-long` (sections I and II). The tests are disjoint and use no deck-check item. |
| `src/` | `questions.mjs` (bank, dates checked by asserts, SVG builders) and `build.mjs` (decks, notes, cards, tests) |

## Scope

- **t01, political causes:** the Doctrine of Lapse, the annexation of Awadh, and Nana Saheb and the Mughal emperor.
- **t02, socio-religious and economic causes.**
- **t03, military causes and the immediate cause.**
- **t05, consequences:** the 1858 Act, the Secretary of State and Viceroy, the Proclamation, the princes and the army.
- **t04, outline of events:** taught **for continuity only** in one slide, one notes section and one flashcard. **No question tests the events**, per the ICSE removed-topics note, and only the listed consequences are tested.

### Question bank (79 items)

| Type | Count |
|---|---|
| mcq | 33 (keys a8 b9 c8 d8); 2 read an SVG diagram |
| assertion-reason | 8, ICSE option order set by `verdict` (keys a c c a c b c d) |
| true-false | 5 |
| fill-blank | 4 |
| match | 1 |
| ordering | 1 |
| short 2-mark | 11 |
| short 3-mark | 6 |
| long 10-mark, in 3 + 3 + 4 parts | 7 |
| source-based | 3 |

- **Source-based items:** an imagined sepoy's letter from 1857, an imagined district officer's diary from 1855, and a schematic timeline. Each has an either/or part (c).
- **Difficulty:** d1 11, d2 36, d3 28, d4 4.
- **Competency:** recall 15, understanding 24, application 12, analysis 26, evaluation 2. That puts 51% of items at application or above (lint band 45–65%).

### Tests

- **Short test:**
  - Part I: `m_lapse_meaning`, `m_artisans`, `m_cartridge_why`, `m_act1858`, `m_procl_annex`, `ar_cartridge`, `s_lapse_two`, `s_procl_two`.
  - Part II: one of `l_political` or `l_military`.
- **Long test:**
  - Part I: nine MCQs, `ar_procl`, and five 2-mark shorts.
  - Part II: two of `l_socio_econ`, `l_admin` and `l_princes_army`.
- **Spares, in neither test:** `l_causes_compare` and `l_results`.

## Facts for a reviewer to check

- **Doctrine of Lapse:** linked with Lord Dalhousie (Governor-General 1848–1856). States named: Satara (1848), Jhansi (1853), Nagpur (1854).
- **Awadh:** annexed in 1856 on the plea of misgovernment; the Nawab, a long-standing ally, was deposed. Many Bengal Army sepoys came from Awadh.
- **Nana Saheb:** adopted son of the last Peshwa; the Company refused to continue his adoptive father's pension.
- **Mughal emperor:** the Company indicated that Bahadur Shah II's successors would lose the imperial title and the Red Fort (stated broadly).
- **Socio-religious measures:** abolition of sati (1829), the Religious Disabilities Act (1850, which let converts keep ancestral property) and the Widow Remarriage Act (1856). They are presented as **perceptions of the time**, noting that Indian reformers also supported such reforms. Missionary activity and railways or the telegraph are described as seen by some to threaten caste and faith.
- **Economic causes:** artisans ruined by British manufactures and the loss of patrons; heavy land revenue; zamindars and taluqdars losing estates; the drain of wealth.
- **Military causes:**
  - Lower pay than European soldiers, and no promotion to high ranks.
  - The General Service Enlistment Act (1856) made new recruits liable to serve overseas.
  - The allowance for distant service was lost once those regions were annexed.
  - Indian sepoys far outnumbered British troops. No figures are given.
- **Immediate cause:** Enfield rifle cartridges that had to be bitten, rumoured to be greased with cow and pig fat. Mangal Pandey of the 34th Bengal Native Infantry attacked officers at Barrackpore on 29 March 1857.
- **Continuity only:**
  - The rising began at Meerut on 10 May 1857 and Bahadur Shah II was proclaimed in Delhi.
  - Other centres: Kanpur (Nana Saheb), Lucknow (Begum Hazrat Mahal), Jhansi (Rani Lakshmibai), Bihar (Kunwar Singh).
  - The Company regained control by 1858.
- **Government of India Act, 1858:**
  - Company rule ended and the Crown took over.
  - The Court of Directors and the Board of Control were abolished.
  - A Secretary of State for India (a British Cabinet member) was advised by a Council of India.
  - The Governor-General was also styled Viceroy.
- **Queen Victoria's Proclamation (1 November 1858):** paraphrased only, never quoted. Its promises: no further annexation; respect for the princes' rights, dignity and treaties; religious non-interference; government service open on qualification regardless of race or creed; pardon for participants except those who had killed British subjects.
- **Princes:** annexation was given up, adoption accepted, and the Crown's paramountcy acknowledged.
- **Army:**
  - A higher proportion of European troops.
  - Artillery kept with Europeans.
  - Recruitment from groups regarded as loyal.
  - Regiments organised on community lines (divide and rule).
  - No ratios are given.
- **Naming:** "mutiny" against "first war of independence" is presented as two views with a reason for each. No historian is quoted.
- **Originality:** every letter, diary and scenario is imagined and labelled. No textbook text, proclamation text or speech is reproduced (D-036). The specimen's wording on the immediate cause and the socio-religious causes is not reused.

## Verifier pass

- **Lint and verify:** the build reports NO ERRORS, lint 0 errors and 0 warnings, and the stage-5 deterministic checks raise no flags.
- **Originality:** the exact-stem pre-check passes. A 5-gram near-duplicate scan using the gate's rule compared 79 stems with about 24,000 others in the repo and found 0 flags.
- **SVG labels:** a script check finds 0 overflow or overlap issues in the 3 figures.
- **Rebuild:** two rebuilds give byte-identical `release.json` and `tests.json`.

## Gaps

- **Rendering:** nobody has seen the SVG labels rendered (timeline, causes diagram, administration chart). They need a look at 360 px on staging.
- **Content:** items are `draft`; human review comes later.
