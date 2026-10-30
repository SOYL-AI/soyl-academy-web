# CBSE Class 12 Computer Science, Chapter 5 — Data Structure: Stack

`cbse-12-computer-science-ch05` · release v1 · academic year 2026-27 · family `computer-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) to the pattern of `cbse-12-computer-science-ch01`.

**Building it.** Run `npx tsx content/authored/computer-science/cbse-12-computer-science-ch05/src/build.mjs` from `platform/`. Edit `src/`, not the JSON. The build:
- runs every program whose output appears anywhere in the chapter;
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan and the editorial counts;
- writes `release.json` and `tests.json`.

| File | What |
|---|---|
| `release.json` | 2 decks of 16 + 17 slides (25 visuals: 3 SVG stack diagrams, the rest tables and flows); 6 notes sections; 30 flashcards; 80 questions worth 150 marks |
| `tests.json` | `t_cbse12computerscience_ch05_short` (20 marks, 40 min) on `cbse-12-default-chapter-test-short` and `t_cbse12computerscience_ch05_long` (40 marks, 90 min) on `cbse-12-default-chapter-test-long`. Both follow their blueprint item for item, including the internal-choice groups. They are disjoint, use no deck-check item, and Section D is case-based. Code-output items are in the bank only. |
| `src/` | `lib.mjs` (identical to ch01's), `questions.mjs`, `build.mjs`, `py-cache.json` (the Python results) |

## How outputs are produced

Every output and stack state a student sees is produced by **running the code with Python 3** through `runPy()`, `pyOut()` and `pyErr()` in `lib.mjs`.
- **What this covers:** code-output keys, MCQ options and solutions, model answers, trace tables, the SVG stack snapshots, notes and flashcards.
- **Count:** the build executes **91 programs** with `py -3` (Python 3.12.3). The results are cached in `src/py-cache.json`.
- **Stack diagrams and trace tables** come from a small Python runner (`runOps` in `build.mjs`) that applies the listed operations and reports the stack after each one.
- **Impossible pop orders:** the "which pop order is impossible" item is decided by a Python search over all orders of 1, 2, 3, which finds that only `3 1 2` is impossible. The build asserts this.
- **Error messages** (`IndexError: pop from empty list`, `AttributeError: 'list' object has no attribute 'push'`, `SyntaxError: expected ':'`) are taken from Python's own traceback.
- **Long answers:** every long-answer program is run on the data or stdin stated in its stem. That includes the menu-driven stack, run with the inputs 1, 14, 1, 27, 4, 2, 3, 2, 2, 5.

## Scope

The chapter's single syllabus topic, t01, covers everything below:
- the stack as a LIFO data structure;
- push, pop, peek, is-empty and size;
- implementation with a Python list (`append`/`pop`, top at the end of the list);
- underflow, which list programs must check, and overflow for fixed-capacity stacks;
- displaying a stack from the top down, and tracing;
- applications: reversing, bracket matching, the call stack, undo and back buttons, postfix evaluation, and decimal-to-binary conversion;
- the board-style pair of a conditional push function and a pop-until-empty display function.

### Question bank (80 items)

| Type | Count |
|---|---|
| mcq | 27 |
| code-output | 14 |
| assertion-reason | 6 |
| true-false | 3 |
| fill-blank | 3 |
| match | 2 |
| ordering | 1 |
| short 2-mark | 8 (2 error-finding) |
| short 3-mark | 6 (1 error-finding) |
| long 5-mark | 6 |
| case-based | 4 |

- **Case-based items:** a school-app back button, a drawing-app undo, a fixed-capacity canteen tray holder and a courier van. Each has an internal choice in part (c).
- **Competency:** 59% of items are application or above. Six routine one-step items are tagged understanding under the D-035 rule.

## For a reviewer

- **Python version:** error messages use Python 3.12 wording; marking rests on the error type and the fix.
- **`co_len_loop`:** this is deliberately tricky. `print(stk, stk.pop(), len(stk))` shows the list *after* the pop, because all arguments are evaluated before printing and the first argument is the same list object.
- **Postfix:** items use `//` for division to keep integer results. The right operand is popped first.
- **Data:** the town PIN codes in the board-style example are sample numbers only. All names, shops, apps and books are imagined.
- **Rendering:** nobody has seen the SVG stack diagrams or the code blocks inside two-column slides rendered. They should be checked at 360 px on staging.
