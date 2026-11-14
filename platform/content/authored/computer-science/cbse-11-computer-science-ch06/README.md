# CBSE Class 11 Computer Science, Chapter 6 — Lists and Tuples

`cbse-11-computer-science-ch06` · release v1 · academic year 2026-27 · family `computer-science` · provenance `human`, author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-050) to the standard of the CBSE 12 Computer Science chapters. Built from `src/`: run `npx tsx content/authored/computer-science/cbse-11-computer-science-ch06/src/build.mjs` from `platform/`. Edit `src/`, not the JSON.

The build runs these checks before it writes `release.json` and `tests.json`:
- schema validation;
- pipeline lint and deterministic verify;
- word limits, narration rules (at most 66 words per slide, checked in `build.mjs`), and the answer-leak scan;
- the editorial counts and the shape of both tests against the CBSE 11 default chapter-test blueprints;
- the stem-duplicate check against every other authored chapter.

## Python and computed facts

Every output, trace table, count and error message stated in a deck, note, flashcard, option, solution or model answer comes from running the program with `pyOut()`, `pyErr()` or `runPy()` (`src/lib.mjs`). Programs that read `input()` state their input in the stem and run with `{ stdin }`. Wrong MCQ options are typed only as distractors and are asserted to differ from the real output (or are the outputs of deliberately altered programs). One build executes 351 Python programs (252 distinct, recorded in `src/py-cache.json`; commit it with the chapter). Two consecutive builds leave `release.json`, `tests.json` and `src/py-cache.json` byte-identical.

| File | What |
|---|---|
| `release.json` | 2 decks of 20 + 21 slides with 31 visuals (3 SVG: list indexes, alias versus copy, tuple packing; 2 route-map flows; the rest tables); 6 notes sections; 30 flashcards; 77 questions worth 150 marks |
| `tests.json` | `t_cbse11computerscience_ch06_short` (20 marks, 40 min) on `cbse-11-default-chapter-test-short` and `t_cbse11computerscience_ch06_long` (40 marks, 90 min) on `cbse-11-default-chapter-test-long`, both with their internal-choice groups. They are disjoint, use no deck-check item, and Section D is case-based in both. |
| `src/` | `lib.mjs` (the shared CBSE 11 lib, unchanged, same md5 as ch01), `questions.mjs` (bank and the programs it reuses), `build.mjs` (visuals, decks, notes, flashcards, tests), `py-cache.json` |

## Scope

Both syllabus topics are covered and nothing beyond Class 11:
- **t01** lists: creation, indexing (positive and negative), slicing with a step, concatenation, repetition, membership; mutability, item and slice assignment, alias versus copy; traversal with `for x in L` and `range(len(L))`; `len`, `list`, `append`, `extend`, `insert`, `count`, `index`, `remove`, `pop`, `reverse`, `sort` (also `reverse=True`), `sorted`, `min`, `max`, `sum`; nested lists; programs for maximum, minimum, mean, linear search and frequency of elements.
- **t02** tuples: creation (including the one-item tuple), indexing, slicing, concatenation, repetition, membership, immutability; `len`, `tuple`, `count`, `index`, `sorted`, `min`, `max`, `sum`; tuple assignment (packing, unpacking, swapping, unpacking in a `for` header); nested tuples and a list inside a tuple; programs for minimum, maximum, mean, linear search and frequency on a tuple.

No `def` function, no dictionary, no list comprehension and no string method appears in anything a student sees (hidden helper programs that build trace tables use `json`, never shown). Frequency programs use `count()` and a list of values already reported.

### Decks

| Part | Slides | Checks | Worked examples |
|---|---|---|---|
| 1 | 20 | 4 | slicing a score list; total and mean of prices |
| 2 | 21 | 4 | maximum and minimum; linear search; frequency of shoe sizes; swapping two values; maximum, minimum and mean of a tuple; searching a tuple |

Narration is at most 63 words per slide (mean 47) and uses no symbols; operators are spoken ("plus joins", "star repeats", "double equals"). The deck programs and scenarios are different from those of the question stems, so a slide never shows the answer to an item.

### Question bank (77 items)

| Type | Count |
|---|---|
| mcq | 22 |
| assertion-reason | 5 |
| true-false | 4 |
| fill-blank | 4 |
| match | 2 |
| ordering | 2 |
| code-output | 12 |
| short 2-mark | 10 (three are error-finding items with `pyErr`: IndexError, tuple TypeError, list.remove ValueError) |
| short 3-mark | 6 (one finds a logic bug: a maximum search started from 0) |
| long 5-mark | 6 |
| case-based | 4 |

- **Case-based items:** a cinema ticket queue (append, pop, insert and an alias), a marks sheet as a nested list, a rain gauge tuple, and a stationery order as a tuple of tuples, each with parts a, b and an Either/Or internal choice in part (c).
- **Long answers:** maximum, minimum and mean from input; linear search for every occurrence; frequency without a dictionary; row and column totals of a nested list; tuple statistics with search; a menu-driven list manager.
- **Difficulty:** d1 1, d2 24, d3 40, d4 11, d5 1.
- **Competency:** recall 4, understanding 28, application 31, analysis 14. That puts 58% of items at application or above.
- **Topics:** t01 51, t02 26 (66% / 34%).
- **MCQ key balance:** a 6, b 5, c 6, d 5; assertion-reason keys d, b, a, c, a.
