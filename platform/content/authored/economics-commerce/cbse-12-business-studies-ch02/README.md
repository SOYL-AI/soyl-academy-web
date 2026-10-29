# CBSE Class 12 Business Studies, Chapter 2 — Principles of Management

`cbse-12-business-studies-ch02` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) to the standard of the CBSE 12 Economics chapters. Built from `src/`: run `npx tsx content/authored/economics-commerce/cbse-12-business-studies-ch02/src/build.mjs` from `platform/`. Edit `src/`, not the JSON.

The build validates the schema and runs the pipeline lint and the deterministic verify checks. It also checks word limits, narration rules, the answer-leak scan and the editorial counts, then writes `release.json` and `tests.json`. A build with errors parks its output as `*.wip.json`.

| File | What |
|---|---|
| `release.json` | 2 decks (20 + 19 slides), notes (7 sections), 32 flashcards, 77 questions worth 135 marks (12 case parts) |
| `tests.json` | `chapter-test-short` (20 marks, 40 min) on `cbse-12-default-chapter-test-short`; `chapter-test-long` (40 marks, 90 min) on `cbse-12-default-chapter-test-long` |
| `src/` | `lib.mjs` (shared with the CBSE 12 Economics chapters, unchanged), `questions.mjs`, `build.mjs` |

## Scope

All three syllabus topics:
- **t01, nature and significance of principles:** the seven features and six points of significance.
- **t02, Fayol's 14 principles:** includes the scalar chain with the gang plank, and unity of command vs unity of direction.
- **t03, Taylor's scientific management:**
  - the four principles, with the mental revolution;
  - functional foremanship with its 8 specialists;
  - standardisation and simplification;
  - method, motion, time and fatigue study;
  - the differential piece wage system;
  - Fayol vs Taylor.

### Decks
- **Part 1** (20 slides): meaning, nature, significance, the Fayol tables, unity of command, command vs direction, the scalar chain and gang plank (SVG), fairness principles, commitment principles, and how to answer a case question.
  - **Worked examples:** one firm following unity of direction but breaking unity of command (imagined Patna snack maker); spotting four principles in case lines (imagined Indore printing press).
  - 4 checks.
- **Part 2** (19 slides): scientific management, the four principles, the mental revolution, the functional foremanship chart (SVG), the foremen's jobs, standardisation vs simplification, the four studies, the differential piece wage system and Fayol vs Taylor.
  - **Worked examples:** differential piece wage earnings (imagined Moradabad brassware unit, with an SVG bar chart); matching four problems to techniques (imagined Kanpur leather unit).
  - 4 checks.
- 31 of 39 slides carry a visual: 2 SVG diagrams plus an SVG bar chart, with the rest tables and flows. Narration runs up to 70 words per slide and uses no symbols.

### Question bank (77 items)

| Type | Count | Notes |
|---|---|---|
| mcq | 35 | mostly short imagined situations ("which principle?"); MCQ keys a9 b9 c8 d9 |
| assertion-reason | 7 | keys a4 b1 c1 d1 |
| true-false · fill-blank · match · ordering | 4 · 3 · 2 · 1 | |
| numerical | 2 (+2 inside a case) | differential piece wage |
| short | 7 × 2 marks, 6 × 3 marks | word limits 30–50 and 50–80 |
| long | 6 × 5 marks | word limit 80–120; includes a d4 case-analysis long and Fayol vs Taylor on five bases |
| case-based | 4 × 4 marks | courier hub, tea estate, garment unit (wages + foremen), school canteen; part (c) of each has an internal choice |

- **Difficulty:** d1 9, d2 43, d3 23, d4 2.
- **Competency:** recall 6, understanding 26, application 33, analysis 12. That puts 58% of items at application or above (lint band 45–65%).
- **Tests:** the two tests share no questions and use no deck-check item. Section D is case-based in both.
  - Short test: cb_courier.
  - Long test: cb_tea and cb_tailor_wages.

## Facts and data

- **Content:** only the standard content of the topic (Fayol's 14 principles, Taylor's 4 principles and techniques, the 8 foremen in two groups of four). No dates or statistics are tested.
- **Figures:** all computed by the build with asserts.
  - Ludhiana hosiery unit: 24 × 12 = 288 and 16 × 9 = 144, difference 144.
  - Tiruppur garment case: 55 × 6 = 330, 48 × 5 = 240, 50 × 6 = 300.
  - Moradabad deck example: 33 × 15 = 495, 27 × 12 = 324, 30 × 15 = 450.
- **Originality:** every firm, person and case is imagined and labelled (D-036). No NCERT example or exercise and no board or sample-paper item is reused. Stems were checked against every other authored chapter: no exact duplicates.

## For a reviewer

- **"Mainly behavioural":** this feature is taught as "aim to influence the behaviour of people". "Contingent" is taught as a separate feature from "flexible"; some books merge the two.
- **`m_development`:** the key wording is "development of each and every person to his or her greatest efficiency and prosperity".
- **SVG labels:** the scalar chain, foremanship chart and wage bars were checked by script for overflow and overlap (none found) but have not been seen rendered. Check them at 360 px on staging.
