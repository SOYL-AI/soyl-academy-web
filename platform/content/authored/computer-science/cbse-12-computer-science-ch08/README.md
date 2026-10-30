# CBSE Class 12 Computer Science, Chapter 8 — Structured Query Language (SQL)

`cbse-12-computer-science-ch08` · release v1 · academic year 2026-27 · family `computer-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) to the pattern of `cbse-12-computer-science-ch01`. Built from `src/`: run `npx tsx content/authored/computer-science/cbse-12-computer-science-ch08/src/build.mjs` from `platform/`. The build validates the schema and runs the pipeline lint, the deterministic verify checks, the narration rules, the answer-leak scan, the exact-stem duplicate check (lib) and a near-duplicate self-check (5-gram Jaccard, as originality stage 6), then writes `release.json`, `tests.json` and `src/py-cache.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (22 + 18 slides; 33 visuals: 28 result/design tables, 4 flows, 1 SVG join diagram), notes (6 sections), 30 flashcards, 76 questions (136 marks; 3 case-based with 9 parts and alternatives) |
| `tests.json` | `t_cbse12computerscience_ch08_short` (20 marks, 40 min) and `_long` (40 marks, 90 min) on `cbse-12-default-chapter-test-short` / `-long`, item for item incl. internal-choice groups; disjoint; no deck-check item; Section D case-based; code-output items are in the bank only |
| `src/` | `lib.mjs` (shared CS library, unchanged copy of ch01's), `questions.mjs` (tables, helpers, bank), `build.mjs`, `py-cache.json` |

## How every result was produced
- Three imagined databases are defined once in `questions.mjs`: **STUDENT** + **CLUB** (school), **PRODUCT** + **SUPPLIER** (shop) and **EVENT** (fest).
- **Every** result shown anywhere — code-output keys, MCQ options and solutions, model answers, case answers, slide and note tables, flashcards — comes from `runSql()`: the query is executed in SQLite through Python 3's `sqlite3` (141 programs per build, `py -3`, Python 3.12). Results are rendered from the returned rows in code (text tables, Markdown tables, or one row per line for code-output keys). `expect()` guards stop the build if a fact stated in words (e.g. the Cartesian product 32 × 11, worked-example narration) drifts from the data.
- Error-finding items: the faulty query is confirmed to fail with `sqlErr()` (aggregate in WHERE) or to return no rows (`= NULL`), and the corrected query is executed.
- **DDL**: the CREATE TABLE answers (`s3_create`, `l_ddl`) and `ALTER TABLE … ADD` were executed in SQLite to check syntax. MySQL-only commands — `CREATE/DROP DATABASE`, `USE`, `SHOW`, `DESCRIBE`, `ALTER TABLE … DROP PRIMARY KEY / ADD PRIMARY KEY` — are shown but **not executed**; no item states an output for them.
- Code-output format, stated in every such stem: one row per line, values separated by a comma and a space, no headings (grading keeps inner spaces, so the format is fixed).

## SQLite vs MySQL caveats (handled)
- Only SQL whose result is identical in both is executed: no integer `/`, no `||`, no date functions, ORDER BY wherever row order matters (with a second key where ties could occur), text literals in the same case as the data.
- **AVG**: MySQL shows four decimal places (85.0000, 82.6667, 79.1250); the chapter shows the value rounded to four places with trailing zeros dropped (85, 82.6667, 79.125) and says so where averages appear.
- NULL ordering (first in ascending, last in descending) and COUNT/SUM skipping NULL behave the same in both.
- NATURAL JOIN with `SELECT *` orders columns differently in MySQL (common column first) and SQLite; items only state the **number** of columns (8 vs 9 for the equi-join), never the column order of `SELECT *`.

## Scope
All five topics: t01 DDL/DML, data types, constraints, database and table commands (16 tags) · t02 SELECT, DISTINCT, aliases, WHERE, IN, BETWEEN, LIKE, NULL, ORDER BY (24+) · t03 aggregates, GROUP BY, HAVING (16+) · t04 Cartesian product, equi-join, natural join (11+) · t05 UPDATE, DELETE (6).

### Question bank (76)
mcq 27 (keys a7 b7 c7 d6) · code-output 14 (SQL) · assertion-reason 6 (keys a, c, a, a, b, d) · true-false 4 · fill-blank 3 · match 1 · ordering 1 · short 2-mark 7 (2 error-finding) · short 3-mark 5 · long 5-mark 5 · case-based 3 (Sahyadri Vidyalaya clubs, a Bhopal stationery shop, a Kochi school fest; each with an internal choice in part c).
Difficulty d1 9, d2 29, d3 32, d4 6. Competency recall 6, understanding 26, application 23, analysis 21 — 58% application or above (10 routine one-step reading items retagged to understanding under D-035).

## For a reviewer
- Data are imagined (names, cities, prices, clubs); no NCERT or board-paper table or query is reused (D-036).
- `ar_unique_null`: MySQL (InnoDB) allows several NULLs in a UNIQUE column — stated as such.
- `m_char_space`: CHAR(n) described as fixed n characters padded with spaces (storage bytes depend on the character set; not tested).
- `m_null_order`: NULL first in ascending ORDER BY — true for MySQL and SQLite.
- Nobody has seen the result tables, the `text`-fenced tables in stems or the SVG join diagram rendered at 360 px; wide tables scroll sideways in the `<pre>` blocks — please check on staging.
