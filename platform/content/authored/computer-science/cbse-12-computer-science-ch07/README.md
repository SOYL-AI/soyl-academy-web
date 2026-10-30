# CBSE Class 12 Computer Science, Chapter 7 — Database Concepts

`cbse-12-computer-science-ch07` · release v1 · academic year 2026-27 · family `computer-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) to the pattern of `cbse-12-computer-science-ch01`. It is built from `src/`: run `npx tsx content/authored/computer-science/cbse-12-computer-science-ch07/src/build.mjs` from `platform/`. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration and the answer-leak scan;
- runs the stem-duplicate check against every other chapter;
- writes `release.json`, `tests.json` and `src/py-cache.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 18 + 16 slides with 25 visuals (2 SVG, the rest tables and flows); 6 notes sections; 30 flashcards; 72 questions worth 128 marks, including 12 case parts and alternatives |
| `tests.json` | `t_cbse12computerscience_ch07_short` (20 marks, 40 min) on `cbse-12-default-chapter-test-short` and `t_cbse12computerscience_ch07_long` (40 marks, 90 min) on `cbse-12-default-chapter-test-long`. Both follow their blueprint item for item, including the internal-choice groups. They are disjoint, use no deck-check item, and Section D is case-based. |
| `src/` | `lib.mjs` (shared CBSE 12 library, identical to ch01's), `questions.mjs` (imagined tables and question bank), `build.mjs`, `py-cache.json` (results of the 19 executed SQL programs) |

## Scope

Topic t01 only, which is the whole chapter (all 72 items):
- need for databases and the five problems of file systems; the DBMS;
- the relational data model: relation, tuple, attribute, domain, degree, cardinality; properties of a relation; the Cartesian product;
- keys: candidate, primary, alternate, foreign and composite keys; referential integrity.

### Decks

- **Part 1:** why databases, and the relational model.
- **Part 2:** keys.
- Each deck has 4 check slides and 2 worked examples:
  - degree and cardinality after changes
  - the size of a product, with its meaningful rows
  - the keys of SUPPLIER
  - the keys across the hospital tables
- Narration is at most 64 words per slide and uses no symbols or codes.

### Question bank (72 items)

| Type | Count |
|---|---|
| mcq | 27 |
| assertion-reason | 6 |
| true-false | 5 |
| fill-blank | 3 |
| match | 2 |
| ordering | 1 |
| numerical | 5 |
| short 2-mark | 8 |
| short 3-mark | 5 |
| long 5-mark | 6 |
| case-based | 4, each with an internal choice in part (c) |

- **Difficulty:** d1 12, d2 25, d3 29, d4 6.
- **Competency:** recall 10, understanding 22, application 17, analysis 20, evaluation 3. That puts 56% of items at application or above (lint band 45–65%). Routine one-step counts and look-ups are tagged understanding (D-035).

## Data and execution

- **Imagined tables:** STUDENT and FEES (Nilgiri Vidyalaya), SUPPLIER and ITEM (Annapurna Stores), DOCTOR and PATIENT (Seva Hospital), and BOOK (Sunbeam School). Each is defined once in `questions.mjs` and used both as Markdown tables and as SQLite tables.
- **Executed facts:** every degree, cardinality and Cartesian-product size is measured by running `SELECT` queries in SQLite through Python (`runSql`, 19 programs run with `py -3`):
  - STUDENT 4 × 5
  - FEES 4 × 4
  - STUDENT × FEES degree 8, 20 rows
  - ITEM × SUPPLIER degree 9, 18 rows
  - DOCTOR × PATIENT degree 8, 15 rows
  - ITEM after one column and two rows: degree 6, 8 rows
  - the matched ITEM–SUPPLIER rows: 6
  - "Name and Class repeat"
- **Key violations:** confirmed by letting SQLite refuse the row: a duplicate primary key, a duplicate alternate key, an orphan foreign key, deleting a referenced parent, and a NULL alternate key. Three MCQ solutions and one slide table quote SQLite's message, labelled as SQLite's wording; MySQL words these messages differently.
- **Originality:** no NCERT text, example or exercise and no board or sample-paper item is reused (D-036).

## For a reviewer

- `ar_alt_unique` is keyed (c): an alternate key is unique, but "every relation must have at least one foreign key" is false.
- The composite-key items (`m_composite`, `s_composite`, the EXAM_RESULT slide) go slightly beyond the syllabus list, as an application of candidate keys. They can be dropped if the Lead prefers.
- `m_fk_null` says a foreign key may be NULL when no link exists yet, if the column allows it.
- Nobody has seen the SVGs (the annotated relation and the foreign-key diagram) rendered. They should be checked at 360 px on staging.
