# CBSE Class 12 Computer Science, Chapter 2 — Functions

`cbse-12-computer-science-ch02` · release v1 · academic year 2026-27 · family `computer-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) to the pattern of `cbse-12-computer-science-ch01`.

**Building it.** Run `npx tsx content/authored/computer-science/cbse-12-computer-science-ch02/src/build.mjs` from `platform/`. Edit `src/`, not the JSON. The build:
- runs every program whose output appears anywhere in the chapter;
- validates the schema;
- runs the pipeline lint and the deterministic verify checks;
- checks word limits, narration rules, the answer-leak scan and the editorial counts;
- writes `release.json` and `tests.json`.

| File | What |
|---|---|
| `release.json` | 2 decks of 17 + 17 slides (23 visuals: 3 SVG, the rest tables and flows); 6 notes sections; 30 flashcards; 71 questions worth 134 marks |
| `tests.json` | `t_cbse12computerscience_ch02_short` (20 marks, 40 min) on `cbse-12-default-chapter-test-short` and `t_cbse12computerscience_ch02_long` (40 marks, 90 min) on `cbse-12-default-chapter-test-long`. Both follow their blueprint item for item, including the internal-choice groups. They are disjoint and use no deck-check item; Section D is case-based. Code-output items are in the bank only. |
| `src/` | `lib.mjs` (byte-identical to ch01's), `questions.mjs`, `build.mjs`, `py-cache.json` (the Python results) |

## How outputs are produced

Every output a student sees comes from **running the code with Python 3** through `pyOut()` in `lib.mjs`. This covers code-output keys, MCQ options and solutions, model answers, slide and note tables, trace tables and flashcards.

- **Count:** the build executes **131 programs** with `py -3` (Python 3.12) and caches the results in `src/py-cache.json`.
- **Error lines:** every error quoted in an item or table comes from Python's own traceback through `pyErr()`. These are the NameError, TypeError for a missing argument, SyntaxError for default or keyword ordering, and UnboundLocalError.
- **Text checks:** where narration or a solution states a result in words, `expect()` stops the build if Python prints anything else.
- **The random module:** its outputs are never stated as exact values. Items ask which values are *possible*. The claims about `randint(3, 6)` and `randrange(10, 30, 5)` were checked by seeded runs of 200 and 300 calls, which found the full sets {3…6} and [10, 15, 20, 25].

## Scope

All three syllabus topics are covered:
- **t01** types of functions (built-in, the math, random and statistics modules, user-defined), defining, calling, return versus print
- **t02** parameters and arguments; positional, default and keyword arguments; returning several values as a tuple
- **t03** flow of execution; local and global scope and the `global` keyword; mutable and immutable arguments, including rebinding a list parameter

Item tags: t01 22, t02 21, t03 24, and 4 items tagged with two topics.

### Decks

- **Part 1:** types, modules, defining and calling, return.
  - Worked examples: a dry run of one function calling another (flooring cost), and writing `to_f()`.
  - Four checks.
- **Part 2:** arguments, several return values, flow, scope, mutable arguments.
  - Worked examples: tracing `mystery(a, b=3)`, and answering an UnboundLocalError question.
  - Four checks.
- **Narration** is at most 69 words per slide and contains no code or symbols.

### Question bank (71 items)

| Type | Count |
|---|---|
| mcq | 24 (keys a6 b6 c6 d6) |
| code-output | 11 (one 3-mark scope trace and one 3-mark trace with a list default) |
| assertion-reason | 6 (keys a, d, a, b, a, c) |
| true-false | 3 |
| fill-blank | 3 |
| match | 2 |
| ordering | 1 |
| short 2-mark | 8 |
| short 3-mark | 4 |
| long 5-mark | 6 |
| case-based | 3, each with an internal choice in part (c) |

- **Error-finding:** 4 items: a missing colon, a missing argument, an UnboundLocalError, and an invalid header (in MCQ form).
- **Long answers:** 4 of the 6 are programs whose output is shown for a stated input:
  - `l_fahrenheit` with `25 40 -5`
  - `l_primes` with `20 50`
  - `l_marksheet` with `92 67 78 55`
  - `l_emi` and `l_bank` with fixed calls
- **Difficulty:** d1 5, d2 24, d3 33, d4 9.
- **Competency:** recall 5, understanding 25, application 16, analysis 25. That puts 58% of items at application or above. Seven routine one-step items were tagged understanding under the D-035 rule.

## For a reviewer

- **Error wording:** error messages are in Python 3.12's wording. For example, the invalid header reads "parameter without a default follows parameter with a default"; older versions say "non-default argument follows default argument". Marking rests on the error type and the fix.
- **Statistics output:** `statistics.median()` of an even-length list gives the mean of the middle two as a float (`4.0` for `[7, 1, 5, 3]`).
- **List default:** `co_trip` uses the safe `trip=None` idiom. The classic mutable-default trap (`trip=[]`) is deliberately not tested, because it is beyond the syllabus wording.
- **Rendering:** nobody has seen the code blocks in two-column slides or the three SVGs rendered (function anatomy, the scope boxes, the mutable and immutable arrows). They should be checked at 360 px on staging.
- **Originality:** every program, name and scenario is SOYL's own, and no textbook or board-paper program is reused (D-036). The scenarios include a bus-ticket fare, a canteen bill, a quiz scoreboard, mall parking, a school bank and phone instalments.
