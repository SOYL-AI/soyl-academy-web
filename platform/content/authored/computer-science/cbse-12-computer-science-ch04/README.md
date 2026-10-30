# CBSE Class 12 Computer Science, Chapter 4 — File Handling

`cbse-12-computer-science-ch04` · release v1 · academic year 2026-27 · family `computer-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) to the pattern of `cbse-12-computer-science-ch01`.

**Building it.** Run `npx tsx content/authored/computer-science/cbse-12-computer-science-ch04/src/build.mjs` from `platform/`. Edit `src/`, not the JSON. The build:
- runs every program whose output appears anywhere in the chapter;
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan and the editorial counts;
- writes `release.json` and `tests.json`.

| File | What |
|---|---|
| `release.json` | 2 decks of 19 + 18 slides (27 visuals: 1 SVG of the file pointer; the rest tables and flows); 6 notes sections; 30 flashcards; 72 questions worth 136 marks |
| `tests.json` | `t_cbse12computerscience_ch04_short` (20 marks, 40 min) on `cbse-12-default-chapter-test-short` and `t_cbse12computerscience_ch04_long` (40 marks, 90 min) on `cbse-12-default-chapter-test-long`. Both follow their blueprint item for item, including the internal-choice groups. They are disjoint, use no deck-check item, and Section D is case-based. Code-output items are in the bank only. |
| `src/` | `lib.mjs` (an unchanged copy of the ch01 library), `questions.mjs`, `build.mjs`, `py-cache.json` (the Python results) |

## How outputs are produced

Every output a student sees is produced by **running the code with Python 3** (`py -3`, 3.12). This covers code-output keys, MCQ options and solutions, model answers, slide and note tables, and flashcards. The build executes **59 programs**.

- **Files a program needs:**
  - **Text and CSV files** shown in a stem (`hills.txt`, `stock.txt`, `routes.txt`, `marks.csv`, `diary.txt`, `sales.csv`) are written into a fresh temporary folder before the program runs (`runPy(..., { files })`).
  - **Binary files** (`books.dat`, `library.dat`) are created by hidden `setup` code that dumps exactly the records the stem lists.
- **Files a program writes:** `outAndFile()` in `questions.mjs` runs the program and then prints the file back in the same run. This produces `short.txt` in `l_copy_filter` and `caps.txt` in the worked example.
- **Errors:** the error lines quoted (FileNotFoundError, `io.UnsupportedOperation: not writable`, TypeError, EOFError) come from `pyErr()`.
- **Cache:** results are cached in `src/py-cache.json`. A rebuild gives byte-identical `release.json`, `tests.json` and `py-cache.json`.

## Scope

All four syllabus topics are covered:

| Topic | Items tagged | What is covered |
|---|---|---|
| t01 | 9 (+1 shared with t04) | text, binary and CSV files; absolute and relative paths (Windows and Linux examples, described but not executed) |
| t02 | 30 | open() modes; with; write and writelines; read, readline and readlines; seek and tell; counting, filtering and copying lines; common errors |
| t03 | 16 | pickle dump and load; binary modes; reading until EOFError; searching; updating by rewriting the file |
| t04 | 16 | `newline=""`; csv.writer, writerow and writerows; csv.reader; skipping the header; converting fields with int(); delimiters |

### Decks

- **Part 1:** files, paths and text files.
  - Worked examples: counting lines, words and characters with a trace table, and copying the lines that start with a capital letter.
  - Checks: `tf_w_creates`, `co_readlines_len`, `fb_tell` and `m_seek`.
- **Part 2:** binary and CSV files.
  - Worked examples: searching `books.dat` with a trace table, and averaging the marks in `marks.csv` with a trace table.
  - Checks: `tf_pickle_mode_rb`, `co_pickle_round`, `m_newline` and `tf_csv_text`.
- **Narration:** at most 71 words per slide (mean 49), with no code or symbols.

### Question bank (72 items)

| Type | Count |
|---|---|
| mcq | 21 |
| code-output | 15 |
| assertion-reason | 5 |
| true-false | 4 |
| fill-blank | 3 |
| match | 2 |
| ordering | 1 |
| short 2-mark | 8 (3 error-finding) |
| short 3-mark | 4 |
| long 5-mark | 6 (5 programs, each executed on the files shown) |
| case-based | 3 |

- **Case-based items:** the Sunrise School library's pickled records, the Riverside canteen's `sales.csv`, and a cricket-club diary text file. Each has an internal choice in part (c).
- **Difficulty:** d1 14, d2 27, d3 28, d4 3.
- **Competency:** recall 9, understanding 20, application 26, analysis 17. That puts 60% of items at application or above (lint band 45–65%).
- **Answer keys:** MCQ keys are a5 b5 c6 d5; assertion-reason keys are a, b, a, c, a.

## For a reviewer

- **Python version:** error messages are Python 3.12's wording. `io.UnsupportedOperation: not writable` is the exact class name Python prints; marking rests on naming the problem and the fix.
- **`co_csv_delim`** shows that a comma reader returns a "|"-delimited line as one field. This is deliberate (d4).
- **Byte positions:** `tell()` values assume plain ASCII text with `\n` line ends, as the files are written. On Windows, text files opened outside Python with CRLF line ends would give different positions. This is noted only here, because the stems define the files.
- **Paths:** the absolute and relative path examples are conceptual. Programs use only relative names in a temporary folder.
- **Data:** every file, record, book title, school and person is imagined. No textbook, NCERT or board-paper program is reused (D-036).
- **Rendering:** code blocks in slides and two-column cells, and the SVG, have not been seen at 360 px; check them on staging.
