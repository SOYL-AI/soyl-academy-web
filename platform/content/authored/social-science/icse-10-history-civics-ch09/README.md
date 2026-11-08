# ICSE Class 10 History & Civics, Chapter 9 — Early Nationalists and Assertive Nationalists (1885–1916)

`icse-10-history-civics-ch09` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) in the ICSE 2027 History & Civics specimen pattern (`icse-2027-specimen-501-history-civics`, used for pattern only). Built from `src/` with the shared lib `../icse-10-history-civics-ch01/src/lib.mjs`, which is imported, not copied. Run from `platform/`: `npx tsx content/authored/social-science/icse-10-history-civics-ch09/src/build.mjs`.

The build checks:
- the schema, the pipeline lint and the deterministic verify checks;
- the originality pre-check (exact stem prose against every other chapter);
- word limits, narration rules, the answer-leak scan and the editorial counts.

It then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 16 + 17 slides, 23 of them with a visual (2 SVG figures, a timeline and a comparison chart, plus tables and flows); notes in 6 sections; 30 flashcards; 93 questions worth 201 marks |
| `tests.json` | Two tests; they share no items and use no deck-check item. |
| `src/` | `questions.mjs` (the bank, the two SVG builders and the asserted years) and `build.mjs` (figures, decks, notes, flashcards and tests) |

The two tests in `tests.json`:
- `t_icse10historycivics_ch09_short` on `icse-10-history-civics-chapter-test-short` (20 marks, 30 min). Part I has 5 MCQ, 1 AR and 2 × 2-mark. Part II is one of `l_partition_full` and `l_assertive_leaders`.
- `t_icse10historycivics_ch09_long` on `icse-10-history-civics-chapter-test-long` (40 marks, 60 min). Part I has 9 MCQ, 1 AR and 5 × 2-mark. Part II is two of `l_early_full`, `l_surat_full` and `l_assertive_full`.

## Scope

All six syllabus topics are covered:
- **t01** Early Nationalists: objectives (political, administrative, economic) and methods (petitions, meetings, delegations; faith in British justice); achievements and limitations
- **t02** Dadabhai Naoroji, Surendranath Banerjee and Gopal Krishna Gokhale
- **t03** Partition of Bengal: stated reason, nationalist view, protest and annulment
- **t04** The Surat Split of 1907
- **t05** Assertive Nationalists: causes of their rise, objectives, swadeshi, boycott, national education, passive resistance; comparison with the Moderates
- **t06** Bal Gangadhar Tilak, Bipin Chandra Pal and Lala Lajpat Rai

### Decks
- **Part 1** (16 slides; t01–t02): worked examples on sorting imagined Congress resolutions into political, administrative and economic demands, and on planning a 3 + 3 + 4 answer. Check slides use `m_indian_assoc_year`, `fb_three_p`, `tf_gokhale_banaras` and `mt_leaders_early`.
- **Part 2** (17 slides; t03–t06): worked examples on classifying imagined actions of 1906 as swadeshi, boycott or national education, and on a point-by-point comparison of the two groups. Check slides use `m_dacca_capital`, `m_calcutta_1906`, `tf_tilak_mandalay` and `tf_capital_delhi`.
- Narration is at most 64 words per slide (mean 48), with no symbols, abbreviations or quotations.

## Question bank (93 items, 201 marks)

| Type | Count | Notes |
|---|---|---|
| mcq | 42 | keys a11 b11 c10 d10; several are imagined scenarios (a resolution, a newspaper report, an exhibition card) |
| assertion-reason | 6 | ICSE option order, set by `verdict` (keys c, b, c, d, c, a) |
| true-false | 8 | |
| fill-blank | 3 | |
| match | 1 | four leaders and contributions |
| ordering | 1 | partition, Surat, annulment, Home Rule League |
| short 2-mark | 16 | incl. two contributions each of the six leaders |
| short 3-mark | 5 | |
| long 10-mark | 8 | each set as 3 + 3 + 4 with step marks; two read an SVG (timeline, comparison chart) |
| source-based | 3 | an imagined student's diary (16 October 1905), an imagined reporter's notes (Surat 1907) and the comparison chart; each with an either/or part (c) |

- Difficulty d1 25, d2 47, d3 19, d4 2.
- Competency: recall 29, understanding 20; application and above 47% of items (lint band 45–65%). Five recall items were rewritten as imagined scenarios (`m_councils_1892`, `m_naoroji_title`, `m_partition_new`, `m_tilak_homerule`, `m_pal_paper`) so that the share is earned, not retagged. (superseded: see Competency audit 2026-11-05)
- The bank is larger than the 66–76 asked for; the extras are spares outside both tests.

## Facts used, for the reviewer

Dates and names are the stable, widely taught ones; none is quoted from a textbook.
1. **Early Nationalists:** led the Congress from 1885 to about 1905–07; mainly the educated middle class. Demands: larger councils with elected Indians; civil service examination in India as well as England and a higher age limit; separation of judiciary from executive; lower land revenue, less military spending, protection of industry; free speech and Press. Methods summed up as prayers, petitions and protests. The **Indian Councils Act, 1892** is given as a gain.
2. **Dadabhai Naoroji:** the "Grand Old Man of India"; drain of wealth argument (book named, not quoted); elected to the **House of Commons in 1892**; Congress President **1886, 1893 and 1906**; swaraj declared the goal at the **Calcutta session of 1906**.
3. **Surendranath Banerjee:** **Indian Association, 1876**, with Ananda Mohan Bose; all-India campaign on the civil service age limit (late 1870s); editor of **The Bengalee**; led the protest against the partition.
4. **Gopal Krishna Gokhale:** **Servants of India Society, 1905**; President of the **Banaras session, 1905**; budget criticism in the **Imperial Legislative Council**; regarded by Gandhi as his political guide (paraphrased).
5. **Partition of Bengal:** under **Lord Curzon**; announced **July 1905**, effective **16 October 1905**; new province **Eastern Bengal and Assam**, capital **Dacca**; stated reason size; nationalist view divide and rule; protest by mourning, rakhis, swadeshi and boycott; **annulled in 1911**, announced at the **Delhi Durbar**, with the capital moved to **Delhi**. Bihar and Orissa are mentioned only as a separate province after 1911, in a distractor solution.
6. **Surat Split, December 1907:** Calcutta 1906 resolutions on swaraj, swadeshi, boycott and national education; venue moved from **Nagpur** to **Surat**; Moderates backed **Rash Behari Ghosh**, the Assertive group wanted **Lala Lajpat Rai** (some books say Tilak; an MCQ solution mentions both); session broke up; reunion at **Lucknow, 1916**.
7. **Rise of the Assertive Nationalists:** failure of petitions; Curzon's policies and the partition; **Japan's victory over Russia, 1905**.
8. **Tilak:** Kesari (Marathi) and Mahratta (English); Ganapati and Shivaji festivals; the swaraj-as-birthright idea described, never quoted; imprisoned at **Mandalay 1908–14**; **Home Rule League, 1916**.
9. **Bipin Chandra Pal:** English weekly **New India** (no founding year is tested); leading speaker of swadeshi and boycott in Bengal.
10. **Lala Lajpat Rai:** Punjab Kesari; linked with the Arya Samaj; **deported to Mandalay, 1907**; the 1928 Simon Commission injury and death appear only as later context in one model answer and the notes.
11. No historical person is quoted, and every diary, report and scenario is imagined and labelled. The specimen's wording is not reused.

## Checks (2026-11-01)
- Build: NO ERRORS; pipeline lint 0 errors, 0 warnings; deterministic verify clean; two rebuilds byte-identical.
- Exact-stem pre-check passes; a 5-gram near-duplicate scan using the originality gate's rule (93 stems against 24,186 others) finds 0 flags.
- SVG label overflow and overlap check: 0 issues in the 2 figures.

## Gaps
- Nobody has seen the SVG labels rendered; they need a look at 360 px on staging (the timeline is the denser one).
- Only 2 items are d4; the bank leans to d1–d2.

## Competency audit 2026-11-05
Audit: `docs/platform/content-qa/2026-11-05-competency-retag-audit.md`. Eleven items that were tagged application although they only named a fact or restated a textbook point were rewritten in place (same key, type, marks, topic and test slot) so that each now asks the student to use the idea. No tag was simply relabelled.
- `m_early_economic` (analysis): infer the thinking behind a resolution that criticises policy but only asks for reform.
- `m_councils_1892` (application): choose the course of action that fits a Moderate editor who welcomes the 1892 councils but notes their limits.
- `m_naoroji_title` (application): explain why a Commons seat and the drain argument fit the Moderate method of persuading British opinion.
- `m_banerjee_age` (application): pick the pair of Moderate demands that removes both obstacles faced by an imagined candidate.
- `m_partition_new` (analysis): choose the detail that supports a political, not administrative, reading of the partition, against true but neutral details.
- `m_annulled` (rewritten: choose the pair of 1911 announcements that make both halves of a shopkeeper's remark true). The reviewer judged it mostly recall of the two Durbar announcements with one small inference, so it is tagged **understanding**, not application.
- `m_surat_reunite` (rewritten: which listed event cannot be a reason for the 1916 reunion because of its date). On the 2026-11-09 re-check every date is printed in the options, so the only step is comparing each year with 1916; it is tagged **understanding**, not application.
- `m_boycott_scenario` (application): explain why boycott and swadeshi were run together.
- `m_tilak_homerule` (analysis): correct a student's post hoc inference that the 1916 League protested the partition.
- `m_pal_paper` (application): classify an imagined editorial as Assertive or Moderate with the right reason.
- `m_lajpat_deport` (analysis): infer what deportation after farmers' meetings shows about the government's thinking.
Competency now: recall 29, understanding 22, application 6, analysis 34, evaluation 2; application and above **42 of 93 (45.2%)**, inside the 45–65% band. Of the audit's pool of 12 application items, the one not listed in the audit keeps its tag.
