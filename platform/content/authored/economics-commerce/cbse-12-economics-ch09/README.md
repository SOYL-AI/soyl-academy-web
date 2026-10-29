# CBSE Class 12 Economics, Chapter 9 — Human Capital Formation in India

`cbse-12-economics-ch09` · release v1 · academic year 2026-27 · family `economics-commerce` (Part B: Indian Economic Development) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) on the pattern of the CBSE 10 Social Science economics chapters (`cbse-10-social-science-ch19`) and CBSE 12 Economics ch02/ch06. Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-12-economics-ch09/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, word limits, narration rules, editorial counts and the answer-leak scan, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` if anything fails). Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (20 + 18 slides), notes (6 sections), 30 flashcards, 67 questions (122 marks; 3 case-based items with 9 parts and 3 alternatives) |
| `tests.json` | `t_cbse12economics_ch09_short` (20 marks, 40 min) on `cbse-12-default-chapter-test-short` and `t_cbse12economics_ch09_long` (40 marks, 90 min) on `cbse-12-default-chapter-test-long`, item for item |
| `src/` | `lib.mjs` (builders, validation, SVG builder; same copy as ch01), `questions.mjs` (bank and computed figures), `build.mjs` |

## Scope
Both syllabus topics: **t01** human capital and its role in development (meaning, stock and process, the five sources: education, health, on-the-job training, migration, information; human vs physical capital; the two-way link with growth; human capital vs human development; India as a knowledge economy, balanced) and **t02** growth of the education sector (why the State intervenes, the two spending indicators, the 6 per cent of GDP goal, Article 21A and the RTE Act 2009, achievements, problems, the way forward).

### Decks
- **Part 1** (20 slides): what human capital is, formation as a process, five sources, education as investment, health, on-the-job training, migration and information (two-column), human vs physical capital (two-column + table), the two-way link (SVG), human development (table), knowledge economy. **Worked examples:** payback of an imagined tailoring course (SVG bars; 24,000 ÷ 3,000 = 8 months; five-year net gain 1,56,000); an imagined migration decision (first-year gain 90,000). Four checks.
- **Part 2** (18 slides): why the State steps in, the two indicators, the 6 per cent goal (SVG bar against a dashed goal line), the right to education, achievements, problems, girls' education (flow), quantity vs quality, the way forward. **Worked examples:** two indicators for the imagined Tapti Pradesh (16 per cent of spending, 3.2 per cent of State Domestic Product, gap 7,000 crore); reading an imagined block report (dropout 18 per cent, gender gap 13 points). Four checks.
- 25 of 38 slides carry a visual (3 SVG, 16 tables, 6 flows); narration ≤ 73 words, no symbols.

### Question bank (67 items)
| Type | Count | Marks |
|---|---|---|
| mcq | 24 (keys a6 b6 c6 d6) | 1 |
| assertion-reason | 7 (keys a4 b1 c1 d1) | 1 |
| numerical | 6 (+ 5 inside cases) | 1–2 |
| true-false · fill-blank · match · ordering | 3 · 2 · 2 · 1 | 1 · 1 · 2 · 1 |
| short | 8 + 5 | 2 / 3 (`word_limit` 30–50 / 50–80) |
| long | 6 | 5 (`word_limit` 80–120) |
| case-based | 3 | 4: an imagined Ranchi youth newsletter (ITI course, on-the-job training, a nurse's migration); the imagined state Vindhyapradesh's education finances (two indicators, the 6 per cent gap); the imagined Kesharpur block school report (dropouts, gender gap) |

- Difficulty d1/d2/d3/d4 = 6/30/27/4. Competency: application or above 57% of items (lint band 45–65%); five routine one-step items (two numericals, two assertion-reason, the pupil–teacher ratio MCQ) are tagged understanding under the D-035 rule.
- **Tests** are disjoint and use no deck-check item. Short = A 3 MCQ + 1 A-R; B 2 + 2 + 3; C one of two 5-mark; D the newsletter case. Long = A 8 MCQ + 2 A-R; B 2 + 2 + (2|2) + 3 + (3|3); C government role + (5|5); D the two data cases.

## Data and facts
- **All tables and scenarios are imagined** and labelled so; every figure is computed in `src/` and asserted (ITI 60,000 ÷ 6,000 = 10 months, 72,000 a year; migration 25,000 − 5,000 − 10,000 = 10,000 a month, 1,20,000 − 30,000 = 90,000; illness 24 × 450 = 10,800; Vindhyapradesh 12,000/80,000 = 15 per cent, 12,000/4,00,000 = 3 per cent, 6 per cent = 24,000, gap 12,000; Kesharpur 60/400 = 15 per cent, 82 − 64 = 18 points; pupil–teacher ratio 1,200/30 = 40).
- **Stable facts used (please verify before publishing):** Article 21A (free and compulsory education, ages 6–14) and the RTE Act 2009, including 25 per cent of entry-level seats in private unaided schools for weaker and disadvantaged groups; the goal of about 6 per cent of GDP from the Education Commission (1964–66, D. S. Kothari) repeated in the National Education Policy 2020, with actual public spending stated only as "below" it; literacy "under one in five" in 1951 and "about three in four" in Census 2011 (rounded); education on the concurrent list; midday meals and free textbooks. No current budget figure or recent survey statistic is stated.
- **Originality:** no NCERT text, example or exercise is reused; every case and scenario is SOYL's own.

## Verifier pass (2026-10-29)
- Every key re-solved from the stem; each MCQ solution names the key letter (set in code) and explains the distractors.
- Numbers: every figure in decks, cases and solutions recomputed by the build (pipeline lint 0 errors, 0 warnings; deterministic verify 0 flags).
- Answer-leak scan: no solution or model-answer sentence of 60+ characters appears in decks, notes, flashcards or public question fields.

## Gaps
- SVG labels (the two-way link diagram, the course bars, the 6 per cent chart) are placed by coordinates and have not been seen rendered; check at 360 px on staging.
- The Census 2011 literacy level is the only real statistic; it is rounded. Newer survey figures are deliberately not used.
