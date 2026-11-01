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
| assertion-reason | 7 | ICSE option order, set by verdict; keys c, a, c, a, c, d, b |
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
- **Competency:** recall 31, understanding 12, application 13, analysis 30, evaluation 1. That puts 51% of items at application or above (lint band 45–65%).
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
