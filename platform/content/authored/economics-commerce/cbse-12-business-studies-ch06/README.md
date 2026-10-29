# CBSE Class 12 Business Studies, Chapter 6 — Staffing

`cbse-12-business-studies-ch06` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) to the standard of the CBSE 12 Economics chapters. Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-12-business-studies-ch06/src/build.mjs` from `platform/`).

The build checks:
- the schema
- pipeline lint and the deterministic verify checks
- word limits and narration rules
- the answer-leak scan
- the editorial counts

It then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (21 + 19 slides), notes (6 sections), 32 flashcards, 82 questions (153 marks; 15 case parts) |
| `tests.json` | `t_cbse12businessstudies_ch06_short` (20 marks, 40 min) on `cbse-12-default-chapter-test-short` and `t_cbse12businessstudies_ch06_long` (40 marks, 90 min) on `cbse-12-default-chapter-test-long` |
| `src/` | `lib.mjs` (shared CBSE 12 economics-commerce authoring library, unchanged), `questions.mjs` (bank and the manpower calculations, asserted), `build.mjs` (decks, SVG figures, notes, cards, tests) |

## Scope

All five syllabus topics:

| Topic | Content | Items tagged |
|---|---|---|
| t01 | Concept and importance of staffing; staffing as part of HRM (evolution, specialised activities) | 11 |
| t02 | The eight-step staffing process, including workload and workforce analysis | 17 |
| t03 | Recruitment from internal and external sources (nine external sources), with merits and limitations | 21 |
| t04 | The eight-step selection process and the five selection tests | 17 |
| t05 | Training vs development vs education; benefits; four on-the-job and six off-the-job methods | 19 |

### Decks

**Part 1** (21 slides; 16 visuals, 4 checks):
- **Covers:** the meaning of staffing; its importance; how HRM evolved and its specialised activities; the staffing process (SVG of the eight steps); workload vs workforce; steps 4–8; recruitment; transfer vs promotion; merits and limitations of internal and external sources; the nine external sources.
- **Worked examples:**
  - Manpower for an imagined bakery: 7,200 ÷ 360 = 20 needed, 16 − 1 = 15 available, so 5 to recruit. This one has an SVG bar chart.
  - Matching four imagined hospital vacancies to sources.

**Part 2** (19 slides; 14 visuals, 4 checks):
- **Covers:** selection vs recruitment; the eight selection steps; the five tests; interview to contract; training, development and education; benefits of training; on-the-job and off-the-job methods.
- **Worked examples:**
  - Choosing a selection test.
  - Identifying selection steps from the lines of an imagined case.
  - Choosing a training method.

**Narration:** at most 67 words per slide (mean 49), with no symbols.

### Question bank (82 items)

| Type | Count | Notes |
|---|---|---|
| mcq | 33 | mostly imagined workplace situations (identify the source, step, test or method); keys a8 b9 c8 d8 |
| assertion-reason | 8 | keys a4 b1 c2 d1 |
| true-false · fill-blank · match · ordering | 4 · 3 · 2 · 2 | ordering: the staffing process; the selection process |
| numerical | 2 (+1 in a case) | manpower to recruit from workload and workforce figures, computed and asserted in `questions.mjs` |
| short | 9 two-mark + 7 three-mark | word limits 30–50 / 50–80 |
| long | 7 | 80–120 words; three are applied (tests for three jobs, sources for a new firm, methods for an airline) |
| case-based | 5 | each has an internal choice in part (c) |

The five cases are:
- **Annapurna Bakers:** the staffing process and sources.
- **Brahmaputra Tea:** selection steps and tests.
- **Tungabhadra Motors:** training methods.
- **Nilgiri Care Hospital:** the limits of internal sources and the external sources used.
- **Kaveri Mart:** workforce analysis, orientation, appraisal and promotion.

**Balance:**
- **Difficulty:** d1/d2/d3/d4 = 7/45/25/5.
- **Competency:** recall 7, understanding 32, application 30, analysis 12, evaluation 1. That puts **52% of items at application or above**, inside the lint band of 45–65%.

**Tests:** the two tests share no questions and use no deck-check item.
- **Short test:**
  - A: 3 MCQ + 1 assertion-reason.
  - B: 2 + 2 + 3 marks.
  - C: one of two 5-mark questions.
  - D: the Annapurna case.
- **Long test:**
  - A: 8 MCQ + 2 assertion-reason.
  - B: 2 + 2 + (2 | 2) + 3 + (3 | 3).
  - C: the selection-tests question, plus one of (internal sources | selection process).
  - D: the Brahmaputra and Nilgiri cases.

## Facts and conventions a reviewer should check

- **Staffing process:** follows the commonly taught eight steps, with placement and orientation as one step and compensation as the last.
- **Selection process:** eight steps, with the medical examination after the selection decision and before the job offer.
- **Placement agencies vs employment exchanges:** placement agencies and management consultants are described as serving technical, professional and top posts; employment exchanges as serving unskilled and skilled operative jobs.
- **How HRM evolved:** labour welfare officer → personnel management → human resource management, stated broadly.
- **Vestibule training** is classed as off the job.
- **No real company names or case texts.** Every firm and person is imagined and labelled; there are no statistics.

## Gaps

- Nobody has seen the SVG labels rendered. They pass a script check for overflow and overlap, but should be checked at 360 px on staging.
- The bank has spare items the tests do not use, including 2 long questions, 2 three-mark shorts and 2 cases, for future series.
