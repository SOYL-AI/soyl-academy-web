# CBSE Class 11 Computer Science, Chapter 7 — Dictionaries and Python Modules

`cbse-11-computer-science-ch07` · release v1 · academic year 2026-27 · family `computer-science` · provenance `human`, author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-050) to the standard of the CBSE 12 Computer Science chapters. Built from `src/`: run `npx tsx content/authored/computer-science/cbse-11-computer-science-ch07/src/build.mjs` from `platform/`. Edit `src/`, not the JSON.

The build runs these checks before it writes `release.json` and `tests.json`:
- schema validation;
- pipeline lint and deterministic verify;
- word limits, narration rules (at most 66 words per slide, checked in `build.mjs`), and the answer-leak scan;
- the editorial counts and the shape of both tests against the CBSE 11 default chapter-test blueprints;
- the stem-duplicate check against every other authored chapter.

## Python and computed facts

Every output, trace table, count and error message stated in a deck, note, flashcard, option, solution or model answer comes from running the program with `pyOut()`, `pyErr()` or `runPy()` (`src/lib.mjs`). Programs that read `input()` state their input in the stem and run with `{ stdin }`. Wrong MCQ options are typed only as distractors and are asserted to differ from the real output (or are the outputs of deliberately altered programs). One build executes 314 Python programs (228 distinct, recorded in `src/py-cache.json`; commit it with the chapter). Two consecutive builds leave `release.json`, `tests.json` and `src/py-cache.json` byte-identical.

**Random code is never given a stated output.** Items on the random module ask which output is possible, the smallest and largest value, or which value can never appear. For each such program `possible()` in `src/questions.mjs` enumerates every combination of the ranges of the random calls in hidden Python (`itertools.product`) and cross-checks that set against 4,000 real runs of the shown program (the build stops if the two differ); the keyed option is asserted to be possible and every distractor impossible (`poss()`). The one `random()` range item is checked with 20,000 real draws. `randint(7, 7)` and `randrange(4, 5)` appear in `co_import_alias` because they can return only one value, so that output is the same on every run.

| File | What |
|---|---|
| `release.json` | 2 decks of 20 + 20 slides with 30 visuals (4 SVG: key-value pairs, alias versus copy for a dictionary, `import math` versus `from math import`, number lines of random ranges; 2 route-map flows; the rest tables); 6 notes sections; 30 flashcards; 78 questions worth 153 marks |
| `tests.json` | `t_cbse11computerscience_ch07_short` (20 marks, 40 min) on `cbse-11-default-chapter-test-short` and `t_cbse11computerscience_ch07_long` (40 marks, 90 min) on `cbse-11-default-chapter-test-long`, both with their internal-choice groups. They are disjoint, use no deck-check item, and Section D is case-based in both. |
| `src/` | `lib.mjs` (the shared CBSE 11 lib, unchanged, same md5 as ch01), `questions.mjs` (bank, the programs it reuses and the random-output helpers), `build.mjs` (visuals, decks, notes, flashcards, tests), `py-cache.json` |

## Scope

Both syllabus topics are covered and nothing beyond Class 11:
- **t01** dictionaries: key-value pairs, creating (literal, `dict()` from pairs and keywords, `fromkeys()`), accessing items (`KeyError` versus `get()`), mutability (adding, changing, `update()`), traversing keys, values and items; `len`, `dict`, `keys`, `values`, `items`, `get`, `update`, `del`, `clear`, `fromkeys`, `copy`, `pop`, `popitem`, `setdefault`, `max`, `min`, `sorted`; keys must be immutable (`TypeError` for a list key); alias versus copy; insertion order (Python 3.7+); programs for character and word frequency, employee salaries, voting and marks.
- **t02** modules: `import`, `from ... import`, an alias with `as`, the `NameError` of a missing import; `math` (`pi`, `e`, `sqrt`, `ceil`, `floor`, `pow`, `fabs`, `sin`, `cos`, `tan`, angles in radians); `random` (`random`, `randint`, `randrange`); `statistics` (`mean`, `median`, `mode`).

No `def` function and no file handling appear in anything a student sees. Lists, tuples, strings (`lower`, `split`) and `max`, `min`, `sum` and `sorted` from earlier chapters are used freely. `from statistics import ...` appears in one case-based Either/Or answer; the decks show `import statistics`.

### Decks

| Part | Slides | Checks | Worked examples |
|---|---|---|---|
| 1 | 20 | 4 (`fb_get_default`, `m_membership`, `tf_clear_del`, `ar_get`) | staff salaries (read, change, add, total); counting the characters of a word |
| 2 | 20 | 4 (`mt_math_exprs`, `fb_from_import`, `tf_randrange_stop`, `co_statistics`) | a ladder (sqrt and ceil); all outputs of a two-call random program; summarising six scores with the statistics module |

Narration is at most 62 words per slide (mean 47) and uses no symbols; operators are spoken. The deck programs and scenarios are different from those of the question stems, so a slide never shows the answer to an item.

### Question bank (78 items)

| Type | Count |
|---|---|
| mcq | 23 |
| assertion-reason | 5 |
| true-false | 4 |
| fill-blank | 4 |
| match | 2 |
| ordering | 2 |
| code-output | 12 |
| short 2-mark | 10 (three are error-finding items with `pyErr`: `KeyError`, list key `TypeError`, `NameError` after `import math`) |
| short 3-mark | 6 (one finds a bug: `freq[ch] += 1` on a missing key) |
| long 5-mark | 6 |
| case-based | 4 |

- **Case-based items:** a vegetable stall (get, `+=`, `pop`), a class election tally (frequency with `get()`, a tie), a two-dice board game (possible outputs of random code), and a pocket-money survey (statistics and math), each with parts a, b and an Either/Or internal choice in part (c).
- **Long answers:** character frequency with the most frequent character(s), a menu-driven salary dictionary, word frequency, marks with topper and grades, a garden program with `math.pi`, `ceil` and `floor`, and mean, median, mode and spread with `statistics` and `math.sqrt`.
- **Difficulty:** d1 2, d2 20, d3 39, d4 16, d5 1.
- **Competency:** recall 3, understanding 30, application 27, analysis 18. That puts 58% of items at application or above.
- **Topics:** t01 47, t02 31 (60% / 40%).
- **MCQ key balance:** a 6, b 5, c 6, d 6; assertion-reason keys a, d, c, b, a.
- **Keys worth re-checking:** `m_ceil_floor_neg` (`ceil(-3.2)` is -3, `floor(-3.2)` is -4), `m_stat_funcs` and `co_statistics` (the mean of integers is printed as an int when exact, the median of an even count as a float), `co_math_trig` (`math.sin(math.pi) == 0` is `False`), `m_trig_radians` (`round(math.sin(30), 2)` in radians), `m_dup_keys` (a repeated key keeps its first position and last value), `m_setdefault`, `m_pop_popitem` (`popitem()` returns the last pair as a tuple), `m_random_poss`, `m_random_minmax`, `cb_dice_game` and `s3_random_poss` (all keyed from the enumerated output sets), and `co_import_alias` (random calls with a single possible value).
