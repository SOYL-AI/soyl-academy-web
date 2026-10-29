# CBSE Class 12 Business Studies, Chapter 7 — Directing

`cbse-12-business-studies-ch07` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) to the standard of the CBSE 12 Economics and Business Studies chapters. Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-12-business-studies-ch07/src/build.mjs` from `platform/`). The build validates the schema, runs the pipeline lint and deterministic verify checks, word limits, narration rules, the answer-leak scan and the editorial counts, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` on any error). Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (19 + 20 slides), notes (7 sections), 32 flashcards, 70 questions (131 marks; 15 case parts and alternatives) |
| `tests.json` | `t_cbse12businessstudies_ch07_short` (20 marks, 40 min) on `cbse-12-default-chapter-test-short` and `t_cbse12businessstudies_ch07_long` (40 marks, 90 min) on `cbse-12-default-chapter-test-long`, item for item including the internal-choice groups |
| `src/` | `lib.mjs` (shared copy, unchanged), `questions.mjs`, `build.mjs` |

## Scope

All five syllabus topics:

| Topic | Items tagged |
|---|---|
| t01 directing: meaning, characteristics, importance and the eight principles | 15 |
| t02 supervision | 6 |
| t03 motivation, Maslow's hierarchy, financial and non-financial incentives | 24 |
| t04 leadership: importance, qualities, three styles | 9 |
| t05 communication: elements, formal and informal, networks, barriers, improvement | 15 |

One case (`cb_gangafoot`) is tagged t02 + t03.

### Decks

**Part 1** (19 slides): the four elements of directing, characteristics, importance, the eight principles, supervision, motive/motivation/motivator, the motivation process, Maslow's hierarchy and its assumptions.
- Worked examples: spotting principles at an imagined courier hub in Vizag; identifying needs at an imagined dairy plant in Erode.
- 4 checks.

**Part 2** (20 slides): financial and non-financial incentives, leadership importance and qualities, the three styles, the communication process, formal and informal communication, barriers and how to improve communication.
- Worked examples: an incentive package for an imagined handloom cooperative; choosing a style for three situations; diagnosing barriers at an imagined sugar mill.
- 4 checks.

**Visuals:** 29 of 39 slides carry one. Three are SVG: the elements of directing, Maslow's steps and the leadership styles. The rest are tables and flows. Narration runs 47 words on average (70 at most) and uses no symbols.

### Question bank (70 items)

| Type | Count | Marks |
|---|---|---|
| mcq | 30 (keys a7 b7 c8 d8) | 1 |
| assertion-reason | 7 (keys a3 b1 c2 d1) | 1 |
| true-false · fill-blank · match · ordering | 3 · 2 · 2 · 1 | 1 · 1 · 2 · 1 |
| short | 8 + 6 | 2 / 3 |
| long | 6 | 5 |
| case-based | 5, each with an internal choice in part (c) | 4 |

The five cases are Annapurna Bakers (principles), Rangrez Textiles (Maslow and incentives), Code Nirmaan (leadership styles), the Tez Logistics depot (barriers) and Ganga Footwear (supervisor and incentives).

- **Difficulty:** d1/d2/d3/d4 = 18/29/21/2.
- **Competency:** recall 5, understanding 26, application 28, analysis 11, so 56% of items are at application or above (lint band 45–65%).
- **No numerical items:** the chapter has no quantitative content.
- **Tests:** they share no questions and use no deck-check item.
  - **Short:** A has 3 MCQ + 1 A-R; B has 2 + 2 + 3; C is one of `l_dir_principles` / `l_barriers`; D is Annapurna Bakers.
  - **Long:** A has 8 MCQ + 2 A-R; B has 2 + 2 + (2|2) + 3 + (3|3); C is the compulsory `l_maslow` + (`l_dir_importance` | `l_lead_importance`); D is Rangrez Textiles and the Tez depot.
- **Spares:** `l_nonfin`, `s_pr_two`, `s_sup_two`, `s3_dir_char`, `s3_comm_improve`, `cb_codenirmaan` and `cb_gangafoot`.

## Facts and conventions a reviewer should check

- **Principles:** eight principles of directing, in the commonly taught list: maximum individual contribution, harmony of objectives, unity of command, appropriateness of direction technique, managerial communication, use of informal organisation, leadership, follow through.
- **Maslow:** five levels, in the order physiological, safety, affiliation or belonging, esteem, self-actualisation. A satisfied need no longer motivates.
- **Incentives:**
  - Financial: pay and allowances, productivity-linked wages, bonus, profit sharing, co-partnership or stock option, retirement benefits, perquisites.
  - Non-financial: status, organisational climate, career advancement, job enrichment, recognition, job security, participation, empowerment.
- **Formal networks:** single chain, wheel, circular, free flow, inverted V. The wheel is all subordinates communicating through one central superior (`m_comm_wheel`).
- **Barriers:** four categories (semantic, psychological or emotional, organisational, personal). Fear of a challenge to authority is classed as **personal**, which is the item in `mt_barriers` and `cb_tezdepot`.
- **Leadership styles:** the three textbook styles. `s3_lead_styles` pairs an emergency with autocratic, expert designers with laissez-faire and a staff event with democratic.
- **Scenarios and originality:** every firm, person and place is imagined and labelled as such. No statistics, no real company and no NCERT text, case or exercise, and no board or sample-paper item, is used (D-036).

## Verifier pass (2026-10-30)

- Every key was re-read against its stem. Each MCQ solution names its key letter (set in code) and explains the distractors.
- Answer-leak scan: no solution or model-answer sentence of 60 or more characters appears in served content.
- Stem scan: no exact duplicate of any stem in another authored chapter or exemplar.
- SVG check: no label outside its viewBox and no overlapping labels. Nobody has seen the SVGs rendered, so they need a look at 360 px on staging.
