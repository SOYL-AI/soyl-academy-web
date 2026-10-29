# CBSE Class 12 Political Science, Chapter 9 — Era of One-Party Dominance

`cbse-12-political-science-ch09` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032, D-036) to the standard of the CBSE 12 Economics and Business Studies chapters. It is built from `src/`: run `npx tsx content/authored/social-science/cbse-12-political-science-ch09/src/build.mjs` from `platform/`. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan and the editorial counts;
- writes `release.json` and `tests.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 18 + 16 slides with 23 visuals (3 SVG, 14 tables, 6 flows); 6 notes sections; 30 flashcards; 73 questions worth 136 marks, including 15 source parts and alternatives |
| `tests.json` | `t_cbse12politicalscience_ch09_short` (20 marks, 40 min) on `cbse-12-political-science-chapter-test-short` and `t_cbse12politicalscience_ch09_long` (40 marks, 90 min) on `cbse-12-political-science-chapter-test-long`. Both follow their blueprint item for item, including the internal-choice groups. They are disjoint, use no deck-check item, and Section D is source-based. |
| `src/` | `lib.mjs` (shared CBSE 12 authoring library, unchanged copy), `questions.mjs`, `build.mjs` |

## Scope

All three syllabus topics are covered:
- **t01** the first three general elections (25 tags, plus 6 shared): the Election Commission and Sukumar Sen, the challenge of 1951–52, symbols and ballot boxes, 1957 and 1962, the Kerala government of 1957, and first-past-the-post
- **t02** the nature of Congress dominance (19 tags): dominant party vs one-party state, legacy, organisation, social and ideological coalition, tolerance of factions
- **t03** emergence of opposition parties (23 tags): the Socialist Party, the CPI, the Bharatiya Jana Sangh, the Swatantra Party, and the role of the opposition

### Decks

- **Part 1:** the first three elections. 18 slides, 4 checks, 2 worked examples (the imagined Sonpradesh first-past-the-post calculation; planning a 5-mark answer).
- **Part 2:** the Congress system and the opposition. 16 slides, 4 checks, 2 worked examples (reading a source on factions; comparing two parties).
- **Figures:** the 3 SVGs are a 1950–64 timeline, the Sonpradesh votes and seats bars, and the "Congress as a coalition" diagram.
- **Narration:** at most 64 words per slide (mean 45), with no symbols.

### Question bank (73 items)

| Type | Count |
|---|---|
| mcq | 27 (keys a7 b7 c7 d6) |
| assertion-reason | 7 (keys a, b, a, d, a, c, b) |
| true-false | 4 |
| fill-blank | 3 |
| match | 2 |
| ordering | 1 |
| numerical | 3, plus 2 inside sources |
| short 2-mark | 9 |
| short 3-mark | 6 |
| long 5-mark | 6 |
| source-based | 5, each with an internal choice in part (c) |

- **Sources:** a polling officer's notebook, an imagined newspaper report, a Congress district secretary's letter, a Thrissur schoolteacher's diary and a college debate. All are imagined and labelled as such.
- **Difficulty:** d1 8, d2 32, d3 29, d4 4.
- **Competency:** recall 10, understanding 26, application 8, analysis 26, evaluation 3. That puts 51% of items at application or above (lint band 45–65%).

## Data and facts

- **Imagined figures, computed and asserted in `questions.mjs`:**
  - Sonpradesh: votes P 186, Q 174, R 140 out of 500 (thousands). Seats 4, 1 and 0. P has 37.2% of the votes and 80% of the seats, a gap of 42.8 percentage points.
  - Amarpur: 60% voted against the winner.
  - Kanakpur: 2,40,000 voters ÷ 1,000 per booth = 240 booths × 4 boxes = 960 boxes.
- **Real results:** stated only as approximate shares. The Congress won about three-quarters of Lok Sabha seats with under half of the votes in 1952, 1957 and 1962; about 17 crore voters took part in 1951–52.
- **Dates used:**
  - Election Commission January 1950; Sukumar Sen first CEC; polling from October 1951 to early 1952.
  - Kerala CPI government 1957 under E. M. S. Namboodiripad, dismissed under Article 356 in 1959.
  - Congress Socialist Party 1934, Socialist Party separate from 1948.
  - Jana Sangh 1951 (Syama Prasad Mukherjee); Swatantra 1959 (C. Rajagopalachari), after the Nagpur resolution.
  - CPI split 1964.
  - Voting age lowered to 18 in 1989; EVMs used nationwide by 2004.
- **Originality:** no NCERT text, cartoon, box or exercise and no board or sample-paper item is reused (D-036). No real person is quoted.

## For a reviewer

- The deck table on voting methods dates the single marked ballot paper "from 1962" (separate boxes per candidate in 1951–52 and 1957). Please confirm.
- `m_cpi_rank` keys the CPI as the largest opposition group in the first Lok Sabha.
- `m_respect` and the notes say the first cabinet included non-Congress figures (B. R. Ambedkar, Syama Prasad Mukherjee).
- Party positions are described in neutral terms. The Jana Sangh's emphasis on cultural unity and Hindi is stated as its own programme, without evaluation. The Kerala dismissal is given arguments on both sides (`sb_kerala` (c)(ii)).
- Nobody has seen the SVG labels rendered, so they should be checked at 360 px on staging. A script check finds no overflow or overlap.
