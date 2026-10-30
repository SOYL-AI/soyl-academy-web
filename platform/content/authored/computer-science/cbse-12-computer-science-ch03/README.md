# CBSE Class 12 Computer Science, Chapter 3 — Exception Handling

`cbse-12-computer-science-ch03` · release v1 · academic year 2026-27 · family `computer-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) to the pattern of `cbse-12-computer-science-ch01`.

**Building it.** Run `npx tsx content/authored/computer-science/cbse-12-computer-science-ch03/src/build.mjs` from `platform/`. Edit `src/`, not the JSON. The build:
- runs every program whose output or error line appears anywhere in the chapter;
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan and the editorial counts;
- writes `release.json` and `tests.json`.

| File | What |
|---|---|
| `release.json` | 2 decks of 17 + 17 slides (23 visuals: 1 SVG of the three paths through a try statement, the rest tables and flows); 6 notes sections; 30 flashcards; 75 questions worth 137 marks |
| `tests.json` | `t_cbse12computerscience_ch03_short` (20 marks, 40 min) on `cbse-12-default-chapter-test-short` and `t_cbse12computerscience_ch03_long` (40 marks, 90 min) on `cbse-12-default-chapter-test-long`. Both follow their blueprint item for item, including the internal-choice groups. They are disjoint, use no deck-check item, and Section D is case-based. Code-output items are in the bank only. |
| `src/` | `lib.mjs` (identical to ch01's: `runPy`, `pyOut`, `pyErr`, `runSql`, `co()`), `questions.mjs`, `build.mjs`, `py-cache.json` (the Python results) |

## How outputs are produced

Every output and error line a student sees is produced by **running the code with Python 3** (`py -3`, Python 3.12.3). The build executes **129 programs**. This covers:
- code-output keys;
- MCQ options and solutions (each exception name comes from `pyErr()`);
- model answers, including the long-answer programs run with the sample inputs given in their stems through stdin;
- slide and note tables and flashcards.

The results are cached in `src/py-cache.json`. If Python is not on PATH, the build uses the cache and fails when any code has changed.

**Message wording.** Error messages are in Python 3.12's wording, for example `ZeroDivisionError: integer modulo by zero` and `SyntaxError: expected 'except' or 'finally' block`. Older Python versions word some messages differently (3.10 says "integer division or modulo by zero"). Exception names and marking do not depend on the wording.

## Scope

The syllabus has one topic, **t01** exceptions and try-except-finally, and all 75 items carry it. The chapter covers:
- syntax errors against exceptions against logical errors;
- reading the error line;
- the built-in exceptions SyntaxError, ValueError, TypeError, NameError, IndexError, KeyError, ZeroDivisionError, FileNotFoundError (OSError/IOError), ImportError (ModuleNotFoundError), EOFError and OverflowError;
- `raise` and `assert`;
- try with one or several except clauses, tuples of exceptions and `as e`;
- the order of handlers and why a bare `except` is a problem;
- `else` and `finally`, including finally with `break` and nested try statements;
- input-validation loops that recover and ask again.

### Decks

- **Part 1:** errors, exceptions, raise and assert.
  - Worked examples: finding the line that fails (a trace table with the KeyError from Python), and rejecting a bad fee with `raise` (three executed runs).
  - Four checks.
- **Part 2:** try, except, else and finally.
  - Worked examples: which blocks run for each value of a loop (dry-run table from Python), and a booking loop that asks until the input is valid (an executed run with three inputs).
  - Four checks.
- **Narration:** at most 69 words per slide (mean 48), with no code or symbols.

### Question bank (75 items)

| Type | Count | Notes |
|---|---|---|
| mcq | 23 | identifying exceptions from code, clause behaviour, handler order, one evaluation item |
| code-output | 14 | which handler runs, else/finally, finally after `break`, nested try, raise/assert messages, a retry loop with stdin |
| assertion-reason | 6 | keys a, a, d, c, a, b |
| true-false · fill-blank · match · ordering | 3 · 3 · 2 · 1 | ordering: the sequence of events for a handled exception |
| short 2-mark | 8 | 3 error-finding (each error line confirmed with `pyErr`, each fix run with `pyOut`) |
| short 3-mark | 6 | dry run, input handling, three-error correction, multiple except clauses |
| long 5-mark | 6 | bill splitter, marks entry with raise, ATM, OTP with assert and loop-else, two theory answers |
| case-based | 3 | auditorium seat booking, attendance percentages, quiz scoring; each with an internal choice in part (c) |

- **Difficulty:** d1 13, d2 28, d3 26, d4 8.
- **Competency:** recall 6, understanding 27, application 19, analysis 20, evaluation 3. That puts **56% at application or above** (lint band 45–65%). Routine one-step identifications are tagged understanding, as D-035 requires.

## For a reviewer

- The model answer of `s3_finally_use` sketches `projector_on()`, `show_slides()` and `projector_off()` as placeholders for the structure; that program is not executed or given an output.
- `co_retry` asks for the output "prompts included, without the typed text", so each answer line starts with `Seats: `. Grading normalises whitespace only.
- IOError is described as another name for OSError in Python 3, and FileNotFoundError as a kind of OSError.
- Nobody has seen the SVG or the code blocks rendered on a phone, so they need a look at 360 px on staging.
- **Originality:** every program, scenario and data value was written by SOYL for this chapter. No NCERT text or textbook or board-paper program is reused (D-036).
