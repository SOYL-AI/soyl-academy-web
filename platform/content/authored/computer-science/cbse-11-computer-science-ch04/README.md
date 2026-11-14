# CBSE Class 11 Computer Science, Chapter 4 — Flow of Control

`cbse-11-computer-science-ch04` · release v1 · academic year 2026-27 · family `computer-science` · provenance `human`, author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-050) to the standard of the CBSE 12 Computer Science chapters. Built from `src/`: run `npx tsx content/authored/computer-science/cbse-11-computer-science-ch04/src/build.mjs` from `platform/`. Edit `src/`, not the JSON.

The build runs these checks before it writes `release.json` and `tests.json`:
- schema validation;
- pipeline lint and deterministic verify;
- word limits, narration rules (at most 66 words per slide, checked in `build.mjs`), and the answer-leak scan;
- the editorial counts and the shape of both tests against the CBSE 11 default chapter-test blueprints;
- the stem-duplicate check against every other authored chapter.

## Python and computed facts

Every output, trace table, count and error message stated in a deck, note, flashcard, option, solution or model answer comes from running the program with `pyOut()`, `pyErr()` or `runPy()` (`src/lib.mjs`). Programs that read `input()` state their input in the stem and run with `{ stdin }`. Endless loops are shown to be endless by running them under a step limit (`capped()`), never by assertion. Wrong MCQ options are typed only as distractors and are asserted to differ from the real output. One build executes 268 Python programs (208 distinct, recorded in `src/py-cache.json`; commit it with the chapter).

| File | What |
|---|---|
| `release.json` | 2 decks of 20 + 20 slides with 30 visuals (2 SVG flowcharts, an if-else and a while loop; the rest tables and flows); 6 notes sections; 30 flashcards; 79 questions worth 152 marks |
| `tests.json` | `t_cbse11computerscience_ch04_short` (20 marks, 40 min) on `cbse-11-default-chapter-test-short` and `t_cbse11computerscience_ch04_long` (40 marks, 90 min) on `cbse-11-default-chapter-test-long`, both with their internal-choice groups. They are disjoint, use no deck-check item, and Section D is case-based in both. |
| `src/` | `lib.mjs` (the shared CBSE 11 lib, unchanged, same md5 as ch01), `questions.mjs` (bank and the programs it reuses), `build.mjs` (visuals, decks, notes, flashcards, tests), `py-cache.json` |

## Scope

Both syllabus topics are covered and nothing beyond Class 11:
- **t01** flow of control: sequential, conditional and iterative; indentation and blocks; `if`, `if-else`, `if-elif-else`, nested `if`; conditions with comparison and logical operators; flowcharts for decisions; simple programs (absolute value, sorting three numbers, divisibility, grades, fares).
- **t02** `for` with `range()` (one, two and three arguments, negative step), `while`, endless loops, `break` and `continue`, nested loops; programs for patterns, summation of series, factorial, digit sum, primality and menu-driven loops.

Strings and list methods are left to later chapters: loops iterate over `range()` or a literal list only, and no list or string method appears in anything a student sees (the hidden helper programs that build trace tables use `append` and `json`, never shown).

### Decks

| Part | Slides | Checks | Worked examples |
|---|---|---|---|
| 1 | 20 | 4 | senior-citizen fare; grades from marks; sorting three numbers; divisibility |
| 2 | 20 | 4 | saving for a bicycle; a doubling pond; is 35 prime; a triangle of stars; the factorial |

Narration is at most 65 words per slide (mean 50) and uses no symbols; operators are spoken ("double equals", "remainder"). The deck programs and scenarios are different from those of the question stems, so a slide never shows the answer to an item.

### Question bank (79 items)

| Type | Count |
|---|---|
| mcq | 22 |
| assertion-reason | 5 |
| true-false | 4 |
| fill-blank | 4 |
| match | 2 |
| ordering | 3 |
| code-output | 13 |
| short 2-mark | 10 (four are error-finding items with `pyErr`) |
| short 3-mark | 6 |
| long 5-mark | 6 |
| case-based | 4 |

- **Case-based items:** a school canteen discount (nested if), a fitness band (continue and break), a hostel water tank (while with a cap) and school lockers (an elif chain over a range), each with parts a, b and an Either/Or internal choice in part (c).
- **Difficulty:** d1 6, d2 23, d3 43, d4 5, d5 2.
- **Competency:** recall 7, understanding 25, application 32, analysis 15. That puts 59% of items at application or above.
- **Topics:** t01 26, t02 51, t01 and t02 together 2 items.
- **MCQ keys:** a 6, b 5, c 6, d 5. **Assertion-reason keys:** a, d, a, b, c.
- **Marks:** 152 in all.

### Tests

Both tests follow the blueprint item for item. The short test uses 10 items, the long test 22 items (32 distinct items in all). The 8 deck-check items (`fb_elif`, `ord_elif`, `fb_nested`, `co_count`, `mt_range`, `tf_while_zero`, `fb_keyword`, `ord_while`) are in no test; the other 12 code-output items stay in the bank, since the blueprint slots are typed.

## For a reviewer

- **Tags:** seven range or ordering items that restate the notes or substitute into `range()` were tagged understanding rather than application so that the application-or-above share stays inside the 45–65% lint band; please check any you think are mis-tagged.
- **Keys worth re-checking:** `m_endless` (the loop `while n != 0` from 12 in steps of 5 never ends), `m_else_align` (the `else` lined up with the outer `if` prints nothing), `cb_lockers` part (b) (moving the combined test to the last `elif` makes it unreachable), `m_divisible` (the `or` and `n % 24` distractors are shown by running them to differ).
- **Flowcharts in items:** an item cannot carry an image in its stem, so `s2_flowchart_abs` asks for the boxes as a numbered list with the symbol of each.
- **Not rendered yet:** nobody has seen the two SVG flowcharts or the tables on a phone at 360 px.
