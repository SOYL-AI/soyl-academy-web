# CBSE Class 12 Computer Science, Chapter 1 — Python Revision Tour

`cbse-12-computer-science-ch01` · release v1 · academic year 2026-27 · family `computer-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This is the first chapter in the `computer-science` family. It is hand-authored (D-025, D-026, D-032) to the standard of the CBSE 12 Economics chapters.

**Building it.** Run `npx tsx content/authored/computer-science/cbse-12-computer-science-ch01/src/build.mjs` from `platform/`. Edit `src/`, not the JSON. The build:
- runs every program whose output appears anywhere in the chapter;
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan and the editorial counts;
- writes `release.json` and `tests.json`.

| File | What |
|---|---|
| `release.json` | 2 decks of 19 + 17 slides (25 visuals: 2 SVG, the rest tables and flows); 6 notes sections; 30 flashcards; 70 questions worth 134 marks |
| `tests.json` | `t_cbse12computerscience_ch01_short` (20 marks, 40 min) on `cbse-12-default-chapter-test-short` and `t_cbse12computerscience_ch01_long` (40 marks, 90 min) on `cbse-12-default-chapter-test-long`. Both follow their blueprint item for item, including the internal-choice groups. They are disjoint, use no deck-check item, and Section D is case-based. |
| `src/` | `lib.mjs` (shared CBSE 12 authoring library, with `runPy`, `pyOut`, `pyErr`, `runSql` and `co()`), `questions.mjs`, `build.mjs`, `py-cache.json` (the Python results) |

## How outputs are produced

Every output a student sees is produced by **running the code with Python 3**. This covers code-output keys, MCQ options and solutions, model answers, slide and note tables, and flashcards.
- **How code runs:** `runPy()` in `lib.mjs` runs `py -3` (or `python3`/`python`) in a fresh temporary folder. stdin is fed for programs that call `input()`.
- **Count:** the build executes **127 programs**.
- **Cache:** the results are stored in `src/py-cache.json`. If Python is not on PATH, the build uses the cache and says so. If code changes while Python is absent, the build fails rather than use a stale result.
- **Runtime errors** in error-finding items, such as the KeyError, TypeError and SyntaxError messages quoted in model answers, are taken from Python's own traceback with `pyErr()`.

## Scope

All three syllabus topics are covered:
- **t01** tokens, data types, mutability, operators, precedence, conversion (18 items)
- **t02** if/elif/else, for and range, while, break/continue, loop else (20 items)
- **t03** strings, lists, aliasing, tuples, dictionaries (30 items + 2 shared with t02)

### Decks

- **Part 1:** tokens, types, operators, flow of control.
  - Worked examples: evaluating an expression step by step, and a dry run of reversing a number.
  - Four checks.
- **Part 2:** strings, lists, tuples, dictionaries.
  - Worked examples: the highest mark in a list (trace table), and counting words with a dictionary.
  - Four checks.
- **Code in slides:** code appears as fenced blocks in slide bodies and two-column slides, and only as inline code in bullets, options and table cells.
- **Narration** never contains code or symbols. It is at most 66 words per slide (mean 50).

### Question bank (70 items)

| Type | Count | Notes |
|---|---|---|
| mcq | 22 | output prediction and concept items; options use inline code |
| code-output | 13 | exact output of a fenced program, auto-graded after whitespace normalisation |
| assertion-reason | 5 | keys a, a, d, a, b |
| true-false · fill-blank · match · ordering | 3 · 3 · 2 · 1 | |
| short | 7 × 2 marks, 5 × 3 marks | including 4 **error-finding** items (TypeError, SyntaxError, KeyError, and a three-error program), a dry run and expression evaluation |
| long | 6 × 5 marks | 5 programs, each with sample input and executed output (prime test, digits, vowels, marks list, canteen bill), and one comparison |
| case-based | 3 × 4 marks | canteen billing, library status, and turning test scores into a dictionary; each has an internal choice in part (c) |

- **Difficulty:** d1 9, d2 23, d3 28, d4 10.
- **Competency:** recall 5, understanding 27, application 19, analysis 18, evaluation 1. That puts 54% of items at application or above (lint band 45–65%).
  - Routine one-step output items are tagged understanding, per the D-035 rule.
- **MCQ keys:** a6 b5 c6 d5.

## Originality and facts

- **Originality:** every program, name, shop and data value is SOYL's own. No NCERT, textbook or board-paper program is reused (D-036).
- **Python version:** all behaviour is that of Python 3 as installed here (3.12), which matches the Python 3 semantics CBSE teaches. Examples:
  - floor division and modulo with negative numbers;
  - `**` is right-associative;
  - dictionaries keep insertion order (Python 3.7 and later);
  - error message wording, for example `TypeError: 'str' object does not support item assignment`.

## For a reviewer

- **Error messages:** model answers quote the full Python 3.12 error line. Older Python versions word some messages slightly differently; students are marked on the error *type* and the fix.
- **Output whitespace:** the `co_nested` output keeps the trailing spaces that `print(..., end=" ")` produces. Grading normalises whitespace.
- **Not rendered yet:** nobody has seen the two SVGs (string indexes, list aliasing) or the code blocks inside two-column slides on a phone. They should be checked at 360 px on staging; long code lines scroll horizontally in `<pre>`.
