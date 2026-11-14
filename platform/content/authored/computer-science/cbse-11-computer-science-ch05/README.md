# CBSE Class 11 Computer Science, Chapter 5 — Strings

`cbse-11-computer-science-ch05` · release v1 · academic year 2026-27 · family `computer-science` · provenance `human`, author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-050) to the standard of the CBSE 12 Computer Science chapters. Built from `src/`: run `npx tsx content/authored/computer-science/cbse-11-computer-science-ch05/src/build.mjs` from `platform/`. Edit `src/`, not the JSON.

The build runs these checks before it writes `release.json` and `tests.json`:
- schema validation;
- pipeline lint and deterministic verify;
- word limits, narration rules (at most 66 words per slide, checked in `build.mjs`), and the answer-leak scan;
- the editorial counts and the shape of both tests against the CBSE 11 default chapter-test blueprints;
- the stem-duplicate check against every other authored chapter.

## Python and computed facts

Every output, trace table, count and error message stated in a deck, note, flashcard, option, solution or model answer comes from running the program with `pyOut()`, `pyErr()` or `runPy()` (`src/lib.mjs`). Programs that read `input()` state their input in the stem and run with `{ stdin }`. Wrong MCQ options are typed only as distractors and are asserted to differ from the real output (`distinct()`); the matching item on slices takes its right-hand column from running the slices. One build executes 458 Python programs (317 distinct, recorded in `src/py-cache.json`; commit it with the chapter).

| File | What |
|---|---|
| `release.json` | 2 decks of 19 + 19 slides with 28 visuals (1 SVG diagram of positive and negative indexes; the rest tables and flows); 6 notes sections; 30 flashcards; 78 questions worth 153 marks |
| `tests.json` | `t_cbse11computerscience_ch05_short` (20 marks, 40 min) on `cbse-11-default-chapter-test-short` and `t_cbse11computerscience_ch05_long` (40 marks, 90 min) on `cbse-11-default-chapter-test-long`, both with their internal-choice groups. They are disjoint, use no deck-check item, and Section D is case-based in both. |
| `src/` | `lib.mjs` (the shared CBSE 11 lib, unchanged, same md5 as ch01), `questions.mjs` (bank and the programs it reuses), `build.mjs` (visuals, decks, notes, flashcards, tests), `py-cache.json` |

## Scope

The single syllabus topic is covered and nothing beyond Class 11:
- **t01** string operations and methods: introduction to strings; positive and negative indexing; concatenation, repetition, membership (`in`, `not in`), slicing with step and negative step; immutability (`TypeError`); traversal with `for` and `while`; `len()`, `capitalize()`, `title()`, `lower()`, `upper()`, `count()`, `find()`, `index()`, `endswith()`, `startswith()`, `isalnum()`, `isalpha()`, `isdigit()`, `islower()`, `isupper()`, `isspace()`, `lstrip()`, `rstrip()`, `strip()`, `replace()`, `join()`, `partition()`, `split()`; programs for counting kinds of characters, palindromes, reversing, counting words and replacing characters.

Lists appear only as the result of `split()` (printed in the method tables, then used with `len()`, an index or `join()`); there are no `def` functions, dictionaries or list methods in anything a student sees. `partition()` results are received by unpacking into three variables.

### Decks

| Part | Slides | Checks | Worked examples |
|---|---|---|---|
| 1 | 19 | 4 | indexing; cutting a book code with slices; counting vowels |
| 2 | 19 | 4 | palindrome check; counting words; reversing with a loop |

Narration is at most 63 words per slide (mean 45) and uses no symbols; operators are spoken ("plus", "star", "colon colon minus one"). The deck programs and scenarios are different from those of the question stems, so a slide never shows the answer to an item.

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
| short 2-mark | 10 (three are error-finding items with `pyErr`) |
| short 3-mark | 6 |
| long 5-mark | 6 |
| case-based | 4 |

- **Case-based items:** a school login desk (`strip`, `lower`, `partition`), roll codes (slices and `isdigit`), a DNA strand (`count`, `find`, `replace`) and a magazine headline (`title`, `split`, `join`), each with parts a, b and an Either/Or internal choice in part (c).
- **Difficulty:** d1 3, d2 23, d3 44, d4 7, d5 1.
- **Competency:** recall 3, understanding 31, application 34, analysis 10. That puts 56% of items at application or above.
- **Topics:** t01 78.
- **MCQ keys:** a 6, b 5, c 6, d 6. **Assertion-reason keys:** a, b, c, d, a.
- **Marks:** 153 in all.

### Tests

Both tests follow the blueprint item for item. The short test uses 10 items, the long test 22 items (32 distinct items in all). The 8 deck-check items (`fb_last_index`, `tf_in_substring`, `mt_slices`, `co_mirror`, `tf_isalpha_space`, `fb_strip`, `ord_palindrome`, `mt_methods`) are in no test; the other 11 code-output items stay in the bank, since the blueprint slots are typed.

## For a reviewer

- **Tags:** thirteen single-expression items (one slice, one index, one `len`, one method call) were tagged understanding rather than application so that the application-or-above share stays inside the 45–65% lint band; please check any you think are mis-tagged.
- **Keys worth re-checking:** `m_count` (`"banana".count("ana")` is 1, non-overlapping), `m_strip_len` (`strip()` with no argument leaves `**hello**` unchanged), `m_split_len` (the empty piece between two commas counts), `m_isalpha` (empty string and space give False), `co_find_loop` (find with start `pos + 1` also reports overlapping matches).
- **Login id format:** the case on the login desk uses `user#site` rather than an e-mail address, because the content lint rejects e-mail addresses in stems; `m_partition` keeps a made-up `user@mail@host` string (no domain suffix) for the at-sign separator.
- **Not rendered yet:** nobody has seen the SVG index diagram or the tables (the character-test table has seven columns) on a phone at 360 px.
