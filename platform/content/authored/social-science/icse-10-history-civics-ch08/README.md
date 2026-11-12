# ICSE Class 10 History & Civics, Chapter 8 — Growth of Nationalism and the Indian National Congress

`icse-10-history-civics-ch08` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) in the ICSE 2027 History & Civics specimen pattern (`icse-2027-specimen-501-history-civics`, used for pattern only). Built from `src/` with the shared lib `../icse-10-history-civics-ch01/src/lib.mjs`, which is imported, not copied. Run from `platform/`: `npx tsx content/authored/social-science/icse-10-history-civics-ch08/src/build.mjs`.

The build checks:
- the schema, the pipeline lint and the deterministic verify checks;
- the originality pre-check (exact stem prose against every other chapter);
- word limits, narration rules, the answer-leak scan and the editorial counts.

It then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 18 + 17 slides, 25 of them with a visual (2 SVG figures, plus tables and flows); notes in 6 sections; 30 flashcards; 87 questions worth 190 marks |
| `tests.json` | Two tests; they share no items and use no deck-check item. |
| `src/` | `questions.mjs` (the bank, the two SVG builders and the asserted event years) and `build.mjs` (figures, decks, notes, flashcards and tests) |

The two tests in `tests.json`:
- `t_icse10historycivics_ch08_short` on `icse-10-history-civics-chapter-test-short` (20 marks, 30 min). Part I has 5 MCQ, 1 AR and 2 × 2-mark. Part II is one of `l_economic` and `l_inc`.
- `t_icse10historycivics_ch08_long` on `icse-10-history-civics-chapter-test-long` (40 marks, 60 min). Part I has 9 MCQ, 1 AR and 5 × 2-mark. Part II is two of `l_repression`, `l_reformers_b` and `l_inc_why`.

## Scope

All four syllabus topics are covered:
- **t01** Economic exploitation (drain of wealth, ruin of handicrafts, land revenue and famine) and repressive policies (Lytton's Durbar, the Vernacular Press Act, the Arms Act, the Ilbert Bill controversy)
- **t02** Raja Rammohan Roy, Jyotiba Phule, Swami Dayananda Saraswati and Swami Vivekananda, and how reform built national consciousness
- **t03** The role of the Press
- **t04** Foundation of the Indian National Congress: year, founder, immediate objectives, the first two sessions and their Presidents, and the safety-valve view presented neutrally

### Decks
- **Part 1** (18 slides; t01, t03): worked examples on sorting imagined grievances into economic and repressive causes, and on planning a 3 + 3 + 4 answer. Check slides use `m_lytton_years`, `tf_ilbert_ripon`, `m_press_language` and `tf_press_english`.
- **Part 2** (17 slides; t02, t04): worked examples on matching quiz clues to reformers, and on the first two Congress sessions. Check slides use `fb_satyashodhak`, `m_reform_pick`, `tf_inc_poona` and `m_inc_platform`.
- Narration is at most 68 words per slide (mean 47), with no symbols, abbreviations or quotations.

## Question bank (87 items, 190 marks)

| Type | Count | Notes |
|---|---|---|
| mcq | 40 | keys a10 b10 c10 d10 |
| assertion-reason | 7 | ICSE option order, set by verdict; keys c, d, c, c, b, d, b (superseded: see Competency audit 2026-11-05; was c, a, c, a, c, d, b) |
| true-false | 6 | |
| fill-blank | 4 | |
| match | 1 | Reformers and organisations |
| ordering | 1 | Order of founding years |
| short 2-mark | 13 | |
| short 3-mark | 4 | |
| long 10-mark | 8 | Each in 3 + 3 + 4 parts with per-part step marks; `l_factors` reads an SVG hub diagram |
| source-based | 3 | Each has an either/or part (c) |

The three source-based items use imagined documents written by SOYL and labelled as such:
- a weaver's letter to a newspaper (1879);
- a delegate's diary at the first Congress session;
- a schematic timeline.

- **Difficulty:** d1 24, d2 42, d3 17, d4 4.
- **Competency:** recall 31, understanding 12, application 13, analysis 30, evaluation 1. That puts 51% of items at application or above (lint band 45–65%). (Superseded: see Competency audit 2026-11-05.)
- The bank is larger than the 66–76 asked for; the extra items are spares not used in either test.

## Facts a reviewer should double-check

1. **Drain of wealth:** the drain argument is attributed to Dadabhai Naoroji (book *Poverty and Un-British Rule in India*, named only). The channels given are salaries and pensions of officials, home charges, interest on loans and profits of British firms. It is paraphrased, not quoted.
2. **Economic hardship:**
   - Handicrafts declined because of cheap machine-made British goods and high duties on Indian goods in Britain.
   - Peasants faced heavy land revenue and debt.
   - The famine is given only as "1876–78", with no casualty figures.
3. **Lord Lytton:**
   - Viceroy 1876–80.
   - The Delhi Durbar was held on 1 January 1877 to proclaim Queen Victoria Empress of India, during the famine.
   - The Vernacular Press Act (1878) covered Indian-language papers only and was repealed by Lord Ripon in 1882.
   - The Arms Act (1878) required Indians but not Europeans to hold licences.
4. **Ilbert Bill (1883, Lord Ripon):** it would have let Indian judges try Europeans in criminal cases. European protest led to a compromise; the details of the 1884 jury provision are not taught.
5. **Reformers:**
   - **Raja Rammohan Roy:** Brahmo Samaj (as the Brahmo Sabha), 1828; sati banned in 1829 under Lord William Bentinck; modern education.
   - **Jyotiba Phule:** Satyashodhak Samaj, 1873; with Savitribai Phule, a girls' school in Pune (1848, notes only).
   - **Swami Dayananda Saraswati:** Arya Samaj, 1875 (Bombay); return to the Vedas; against caste by birth and child marriage; DAV schools "later".
   - **Swami Vivekananda:** disciple of Ramakrishna Paramahansa; Chicago World's Parliament of Religions, 1893; Ramakrishna Mission, 1897.
6. **The Press:**
   - Amrita Bazar Patrika (Calcutta) switched from Bengali to English in 1878. This is widely reported as a way around the Press Act, and `m_amrita` says "widely reported".
   - The Hindu: Madras, 1878.
   - Kesari: Marathi, linked with Bal Gangadhar Tilak.
   - The Bengalee: linked with Surendranath Banerjee.
7. **Indian Association (1876, Calcutta):** founded by Surendranath Banerjee and Ananda Mohan Bose. It is used as a precursor of the Congress.
8. **Indian National Congress:**
   - Founded on 28 December 1885 at the Gokuldas Tejpal Sanskrit College, Bombay. The session had been planned for Poona and was moved because of an outbreak of disease there.
   - Founder: A. O. Hume, a retired Indian Civil Service officer.
   - First session: President W. C. Bonnerjee, 72 delegates.
   - Second session: Calcutta, 1886, President Dadabhai Naoroji.
   - Immediate objectives (paraphrased): a common platform, unity across region, religion and caste, framing demands, and training public opinion.
9. **Safety-valve theory:** presented as one interpretation, beside the view that Indian leaders used Hume's help to win a national platform. Items reward a reasoned judgement either way.
10. **Excluded:** no speech or writing of any historical person is quoted, and no textbook text, specimen item or board-paper item is reused. All letters, diaries and quiz scenarios are imagined and labelled as such.

## Verifier pass

- **Build:** NO ERRORS; pipeline lint 0 errors and 0 warnings; the deterministic verify checks raise 0 flags.
- **Rebuild:** two builds give byte-identical `release.json` and `tests.json`.
- **Duplicate stems:** the 5-gram near-duplicate scan (the originality gate's rule) compared 87 stems with about 24,000 others and found 0 flags. One ordering stem first matched a CBSE 10 Social Science item at 75% and was reworded. The lib's exact-stem check also passes.
- **SVG labels:** the overflow and overlap check finds 0 issues in the 2 figures (the 1825–1900 timeline and the factors hub).

## Gaps

- **Rendering:** nobody has seen the SVG labels rendered, so they need a look at 360 px on staging. The timeline has nine labels in six lanes.
- **Audio:** no narration audio yet (TTS stage).

## Competency audit 2026-11-05

Reference: `docs/platform/content-qa/2026-11-05-competency-retag-audit.md`. This chapter was a named lead: ten "why" and "how" stems and several scenario-wrapped name, Act and provision items had been tagged application or analysis although their answers restate a textbook reason, feature or fact. Tags now follow the competency definitions; the band was restored by rewriting items, not by relabelling.

**Honest retags (no rewrite):**
- 049 `tf_press_english` application to understanding (restates the Act's scope).
- 084 `m_reform_pick` application to understanding (matches listed features to an organisation).
- 085 `m_press_language` analysis to understanding (textbook reason).
- 086 `m_inc_platform` analysis to understanding (textbook reason).
- 076 `l_inc` understanding to recall (all three parts ask for dates, names and facts).
- 036 `mt_reformers` understanding to recall (names matched to organisations).
- The four check-slide items (085, 086, 049, 084) are retagged and not rewritten, so the deck check slides still match them.

**Rewritten to genuine application or analysis (same key, type, marks, topics and test slots):**
- 003 `m_drain_item` application: classify two payments by where the money goes.
- 004 `m_crafts` analysis: pick the cause that fits all report details; duties in Britain are a true but partial distractor.
- 005 `m_revenue` analysis: which feature explains why one bad harvest led to land sales.
- 006 `m_famine` application: chronology, could the 1877 Durbar have caused the famine of 1876–78.
- 009 `m_arms` analysis: reply to a claim that the Act was ordinary regulation (discrimination, not regulation).
- 013 `ar_vpa_discrimination` application: a paper switches to English, because the Act covered Indian-language papers only.
- 014 `ar_durbar_famine` analysis, now both true, R not the explanation (key d): coincidence of date is not a reason.
- 017 `s_drain_two` application: profits sent to Britain against profits reinvested in India.
- 018 `s_crafts_ruin` analysis: why "lost income" is an incomplete reading; the cause was read as policy.
- 020 `s_ilbert_effect` analysis: choose between two readings of the diluted Bill.
- 021 `s3_economic_three` analysis: which grievance spreads beyond its region, and why a local one does not.
- 024 `m_roy_education` application: chronology, sati ban of 1829 against the Congress of 1885.
- 026 `m_phule_girls` analysis: correct a claim that Phule and Dayananda "did the same thing".
- 030 `m_chicago` application: chronology, Chicago 1893 could not have inspired the 1885 founders.
- 031 `m_reform_link` analysis: qualify a claim that reform had nothing to do with nationalism.
- 032 `ar_vivek_service` application, both true and R explains: respect abroad strengthened self-confidence.
- 033 `ar_dayananda_caste` analysis, now both true and R explains (key c): the Vedas used as an argument for reform.
- 040 `s_dayananda_two` evaluation: assess "return to the Vedas means undoing reform" with two features.
- 041 `s_vivek_two` evaluation: qualify "only through the Chicago speech" with two facts.
- 042 `s3_reform_nation` analysis: compare the bases of Phule and Dayananda and judge which appeals to excluded groups.
- 043 `m_press_role` analysis: infer the government's thinking from the Act covering Indian-language papers only.
- 046 `m_amrita` analysis: what a paper's switch to English shows about the Act.
- 048 `ar_press_unity` analysis, now A false and R true (key b): language limits a paper's reach.
- 050 `s_press_two` application: what a mixed-province issue gives nationalism and the risk under the Act.
- 052 `s3_press_three` analysis: infer government concern from an imagined official note.
- 061 `m_precursor` analysis: which fact weakens "no Indian political body before 1885".
- 063 `ar_inc_independence` analysis, A false and R true (key b): 72 delegates against where they came from.
- 069 `s_hume_why` evaluation: a fact for and a fact against "an official's founding means it was not Indian".
- 070 `s3_inc_why` analysis: infer from an imagined note on separate local associations, plus the 1883 lesson.
- 071 `l_economic`, 072 `l_repression`, 073 `l_reformers_a`, 074 `l_reformers_b`, 075 `l_press`: every part rewritten as application, analysis or assessment (new-case classification, comparison, chronology, evaluation of a claim); marks per part unchanged.
- 077 `l_inc_why`: parts (i) and (ii) rewritten (a claim that one development was enough; one fact read both ways); part (iii) was already an evaluation.
- 078 `l_factors`: part (ii) rewritten as a no-newspapers counterfactual; parts (ii) and (iii) now make 7 of 10 marks.
- 079 `sb_weaver_letter`: part (b) is now an inference about why a switch of language helps; part (c) (ii) assesses the letter as evidence.
- 080 `sb_delegate_diary`: part (b) dates the diary from its details; part (c) (ii) weighs two readings of a detail.
- 081 `sb_timeline`: part (b) and part (c) (ii) are chronology reasoning from the timeline.

**Judged honest and left alone:** 011 `m_ilbert_lesson` (infer a lesson from a described outcome), 060 `m_safety_valve` (weigh a balanced reading against overclaims), 062 `ar_inc_unity` (needs a causal judgement that R does not explain A).

**Judged recall or understanding and left as such (not in the band):** every name, date, venue and Act item; 001, 008, 010, 015, 023, 028, 059 stay understanding.

**New counts:** recall 33, understanding 12, application 10, analysis 28, evaluation 4. That is 42 of 87 at application or above, 48.3% (lint band 45–65%). The assertion-reason keys are now c, d, c, c, b, d, b. Two builds give byte-identical `release.json` and `tests.json`.
