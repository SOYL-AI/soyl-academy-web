# CBSE Class 12 Political Science, Chapter 7 — Globalisation

`cbse-12-political-science-ch07` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) to the standard of the CBSE 12 Political Science chapters ch01–ch05.

To build, run this from `platform/`:

`npx tsx content/authored/social-science/cbse-12-political-science-ch07/src/build.mjs`

The build checks the following, then writes `release.json` and `tests.json`:
- schema
- pipeline lint
- deterministic verify checks
- word limits
- narration rules
- answer-leak scan
- editorial counts

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (19 + 20 slides, 29 visuals including 3 SVG), notes (6 sections), 31 flashcards, 71 questions (130 marks; 15 source parts and alternatives) |
| `tests.json` | `t_cbse12politicalscience_ch07_short` (20 marks, 40 min) on `cbse-12-political-science-chapter-test-short` and `t_cbse12politicalscience_ch07_long` (40 marks, 90 min) on `cbse-12-political-science-chapter-test-long`. Both follow their blueprint item for item, including the internal-choice groups. The two tests share no questions and use no deck-check item, and Section D is source-based in both. |
| `src/` | `lib.mjs` (the shared CBSE 12 authoring library, unchanged), `questions.mjs`, `build.mjs` |

## Scope

| Topic | Content | Tags |
|---|---|---|
| t01 | Concept (four flows, uneven flows, multi-dimensional, interconnectedness) and causes (technology, awareness, government policy; exchange is old, speed and scale are new) | 17 |
| t02 | Political consequences (welfare state to minimalist state, multinational companies, enhanced capacity through technology, state remains primary), economic consequences (IMF and WTO, supporters and critics, social safety nets) and cultural consequences (homogenisation, heterogenisation, hybrid cultures) | 31 |
| t03 | India (colonial flows, protectionism after 1947, 1991 reforms, gains and concerns) and resistance (left and right critiques, Seattle 1999, the World Social Forum, resistance in India) | 23 |

### Decks

- **Part 1:** meaning, causes and the state. It has 4 checks and 2 worked examples: naming the flow in an imagined news story, and a four-step method for a source on state policy.
- **Part 2:** economy, culture, India and resistance. It has 4 checks and 2 worked examples: five-point plans for the long answers on economic consequences and on resistance.
- **SVG figures (3):**
  - the four flows around globalisation
  - weakening and strengthening of the state
  - a timeline from 1991 to 2004
- **Narration:** at most 66 words per slide (mean 49), with no symbols.

### Question bank (71 items)

| Type | Count |
|---|---|
| mcq | 29 |
| assertion-reason | 7 |
| true-false | 4 |
| fill-blank | 2 |
| match | 2 |
| ordering | 1 |
| short 2-mark | 10 |
| short 3-mark | 6 |
| long 5-mark | 5 |
| source-based | 5 |

- **Source-based items:** all five are imagined documents, labelled as such, and each has an internal choice in part (c):
  - a Gurugram call-centre blog
  - a newspaper report from the imagined country Marenia
  - a Guwahati school-magazine festival report
  - a delegate's diary at the 2004 World Social Forum
  - a Varanasi weavers' cooperative letter
- **No map items.**
- **Difficulty:** d1 11, d2 30, d3 27, d4 3.
- **Competency:** recall 11, understanding 19, application 13, analysis 22, evaluation 6. That puts 58% of items at application or above.
- **Answer keys:** MCQ keys are a8 b7 c7 d7; assertion-reason keys are a, d, c, a, b, a, c.
- **Spares:** all 5 long questions are used across the two tests. Spare items are 4 two-mark shorts, 2 three-mark shorts and 2 sources.

## Facts

These are the only real-world facts in the chapter (please verify):
- India's major economic reforms began in 1991.
- The WTO was set up in 1995.
- Protests took place at the WTO ministerial meeting in Seattle in 1999.
- The World Social Forum first met in Porto Alegre, Brazil, in 2001; its fourth meeting was in Mumbai in 2004.

The colonial pattern is stated in general terms: India exported raw materials and imported finished goods. India's protectionism after 1947 is stated generally too. Nothing after 2024 is stated.

## Neutrality and originality

- **Economic debate:** each side's arguments are given, and the long answers end with a balanced judgement.
- **Critiques and resistance:** the left and right critiques and resistance in India (trade unions, Left parties, farmers' and small producers' groups, some cultural groups) are described by their stated concerns only, with no judgement and no party or leader named.
- **Originality:** every scenario, country, person and document is imagined and written by SOYL. No real person is quoted. No NCERT text, cartoon, box or exercise and no board or sample-paper item is reused (D-036). Cultural examples are SOYL's own: a Shillong band mixing Khasi tunes with rock, a fusion dosa in Chennai, and a Bihu–rock band.

## Verifier pass (2026-10-30)

- **Keys:** every key was re-solved from its stem, and each MCQ solution explains why the distractors are wrong.
- **Duplicate stems:** an exact-stem scan against every other `release.json` under `content/authored` and `content-templates/exemplars` finds no duplicates.
- **SVG labels:** a script finds no label overflow or overlap in the 3 SVGs.
- **Rebuild:** a second build gives byte-identical `release.json` and `tests.json`.

## Gaps

- Nobody has seen the SVG labels rendered, so they need a look at 360 px on staging.
- The term "McDonaldisation" is not used. Homogenisation is explained in SOYL's own words instead.
