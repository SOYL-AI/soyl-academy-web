# CBSE Class 12 Computer Science, Chapter 9 — Interface of Python with an SQL Database

`cbse-12-computer-science-ch09` · release v1 · academic year 2026-27 · family `computer-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) following the pattern of `cbse-12-computer-science-ch01`. It is built from `src/`: run `npx tsx content/authored/computer-science/cbse-12-computer-science-ch09/src/build.mjs` from `platform/`. The build:
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks narration, the answer-leak scan, the editorial counts and the code-stripped stem-duplicate check;
- **executes every program whose output appears anywhere**;
- writes `release.json`, `tests.json` and `src/py-cache.json`.

Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 18 + 17 slides with 23 visuals (2 SVG, the rest tables and flows); 6 notes sections; 30 flashcards; 76 questions worth 141 marks |
| `tests.json` | `t_cbse12computerscience_ch09_short` (20 marks, 40 min) on `cbse-12-default-chapter-test-short` and `t_cbse12computerscience_ch09_long` (40 marks, 90 min) on `cbse-12-default-chapter-test-long`. Both follow their blueprint item for item, including the internal-choice groups. They are disjoint, use no deck-check item, and Section D is case-based; code-output items stay in the bank only. |
| `src/` | `lib.mjs` (shared CBSE 12 library, identical to ch01's), `questions.mjs` (including `toSqlite()` and the imagined databases), `build.mjs`, `py-cache.json` (61 executed results) |

## How outputs are produced: mysql.connector shown, sqlite3 executed

The syllabus uses `mysql.connector`, so every program students see uses it. MySQL is not available at build time. Each program is therefore run with Python's built-in `sqlite3`, through `toSqlite()` in `questions.mjs`, which rewrites only five things:
1. the import line;
2. the `connect(...)` call;
3. `mysql.connector.Error`;
4. `x.is_connected()`, which becomes `(x is not None)`;
5. every `%s` placeholder, which becomes sqlite3's `?`.

Hidden setup code first creates the same tables with the same rows. The output printed by that run is the output stated in the item, slide or note.

To make the printed values identical under both drivers:
- **Columns:** only `INT` and short text columns are used, so fetched values are plain `int` and `str`. mysql.connector returns DECIMAL and DATE columns as `Decimal` and `datetime`, and SUM and AVG return `Decimal`, so these are avoided.
- **Row order:** every query that prints more than one row in order has `ORDER BY`, or relies on primary-key order with rows inserted in key order.
- **Text comparisons** use the stored case; MySQL's default collation ignores case and SQLite's does not.
- **rowcount after a SELECT** is never asked; the two drivers differ there. For INSERT, UPDATE and DELETE, rowcount is the same in both.
- **A missing `commit()`** has the same effect in both: no autocommit, so the change is rolled back when the connection is closed.
- **Error-finding items** state an error only where both drivers fail (`myErr()` confirms the failure). These are a bare value instead of a tuple for `%s`, an unquoted text value in a `format()` query, and methods used without brackets. Exact error messages differ between drivers, so the items name the cause, not a message.

Python 3.12.3 was used (`py -3`). Without Python on the machine, the build reads `src/py-cache.json` instead, and stops if any program has changed.

## Scope

The only syllabus topic is t01, Connecting Python with MySQL, and all 76 items are tagged with it. It covers:
- `connect()` and `is_connected()`;
- `cursor()` and `execute()`;
- `fetchone()`, `fetchall()` and `fetchmany()`;
- `commit()` and `rowcount`;
- `%s` placeholders and `format()`;
- catching `mysql.connector.Error`.

### Decks

- **Part 1:** connecting and reading data.
  - SVGs: the client–driver–server architecture, and the row pointer across `fetchmany`, `fetchone` and `fetchall`.
  - Worked examples: `fetchall()` with tuple unpacking, and counting by section with GROUP BY.
  - 4 check slides.
- **Part 2:** changing data and parameterised queries.
  - Covers commit, what is lost without commit, rowcount, `%s`, `format()`, safety (SQL injection), the board's "complete the missing statements" pattern, and try/except.
  - Worked examples: inserting with commit, and a complete program that reads input.
  - 4 check slides.
- Narration is at most 65 words per slide and contains no code or symbols.

### Question bank (76 items)

| Type | Count |
|---|---|
| mcq | 26 |
| code-output | 13 |
| assertion-reason | 6 |
| true-false | 3 |
| fill-blank | 3 |
| match | 2 |
| ordering | 1 |
| short 2-mark | 8 (2 error-finding) |
| short 3-mark | 5 (1 error-finding, 1 complete-the-statements, 2 executed functions) |
| long 5-mark | 6 (5 executed programs, 2 of them with typed input given as stdin) |
| case-based | 3 (Shanti Clinic, Pencil Point stationery shop, Hillview School fees), each with an internal choice in part (c) |

- **Difficulty:** d1 10, d2 29, d3 33, d4 4.
- **Competency:** recall 7, understanding 25, application 28, analysis 15, evaluation 1. That puts 58% of items at application or above (lint band 45–65%). Five routine one-step output items were tagged as understanding, under the D-035 rule.
- **Answer keys:** MCQ keys are a7 b7 c6 d6; assertion-reason keys are a, a, c, c, a, d.

## Data

All three databases are imagined: `school.student`, `shop.item` and `clinic.patient`, with five rows each. Their rows are listed in notes section 3 and in each case passage.

Programs use the placeholder password `your_password`; no real credentials appear anywhere.

## For a reviewer

- **The sqlite3 substitution above.** A reviewer who has MySQL could re-run a sample of the programs against MySQL 8 with mysql.connector to confirm the printed tuples.
- **Input programs:** in `l_insert_input` and `l_search`, the typed values are not echoed in the printed output. The prompts therefore run together, and the model answers say so.
- **`m_placeholder`** treats `execute(q, 4)` as wrong. mysql.connector needs a tuple, list or dict of parameters.
- **`s3_err_multi`:** the program fails first at `cur.execute` (`AttributeError`, because `cur` is the method object). The model answer lists all three missing pairs of brackets.
- **Rendering:** nobody has seen the code blocks in the two-column slide or the two SVGs on a phone, so they need a look at 360 px on staging.
- **Originality:** every program, table and scenario is SOYL's own. No textbook, NCERT or board-paper program is reused (D-036).
