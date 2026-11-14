# CBSE Class 11 Computer Science, Chapter 3 — Python Fundamentals

`cbse-11-computer-science-ch03` · release v1 · academic year 2026-27 · family `computer-science` · provenance `human`, author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-050) to the standard of the CBSE 12 Computer Science chapters. Two syllabus topics: t01 tokens, variables, data types, operators and expressions (features of Python, modes, character set, tokens, identifiers, variables, l-value and r-value, comments, data types, mutable and immutable, operators, expressions and precedence, implicit and explicit type conversion); t02 errors and input/output (input(), print() with sep and end, conversion of input, syntax, logical and run-time errors). No flow of control (chapter 4).

**Building it.** Run `npx tsx content/authored/computer-science/cbse-11-computer-science-ch03/src/build.mjs` from `platform/`. Edit `src/`, not the JSON. The build:
- runs every program whose output, value, type name, error line or trace table appears anywhere in the chapter (`runPy`/`pyOut`/`pyErr` in `lib.mjs`);
- validates the schema, runs the pipeline lint and the deterministic verify checks;
- checks narration rules, word limits, the answer-leak scan, the cross-chapter stem originality check and the editorial counts;
- checks both tests against the `cbse-11-default` chapter-test blueprints;
- writes `release.json`, `tests.json` and `src/py-cache.json`.

| File | What |
|---|---|
| `release.json` | 2 decks of 20 + 19 slides (29 visuals: tables and flows, no SVG); 6 notes sections; 30 flashcards; 87 questions worth 163 marks |
| `tests.json` | `t_cbse11computerscience_ch03_short` (20 marks, 40 min) and `t_cbse11computerscience_ch03_long` (40 marks, 90 min), item for item on `cbse-11-default-chapter-test-short` / `-long`, with the internal-choice groups. Disjoint, no deck-check item, Section D case-based. |
| `src/` | `lib.mjs` (identical to the CBSE 11 ch01 lib), `questions.mjs` (bank), `build.mjs` (visuals, decks, notes, flashcards, tests), `py-cache.json` |

## How values are produced

All code is Python 3. Every output, expression value, type name (`type(x).__name__`), error line (`pyErr`), trace-table cell and wrong-answer check comes from a run (378 programs executed with `py -3`); `src/py-cache.json` holds the results for a machine without Python. MCQ distractors are asserted different from the real output. Programs that read `input()` state the typed input in the stem and run with `stdin`. Long answers that ask for a program show the model program run on the stated sample inputs. Code is shown without prompt strings in the long answers so that the screen output is not misleading.

## Question bank (87 items, topics t01 and t02)

| Type | Count |
|---|---|
| mcq | 25 |
| assertion-reason | 6 (keys a, a, b, c, d, a) |
| true-false · fill-blank · match · ordering | 5 · 4 · 3 · 2 |
| code-output | 14 (including 4 with `stdin` and 2 on `sep`/`end`) |
| short | 12 × 2 marks (3 error-finding items with `pyErr`: indentation, value, name; plus input, conversions, l-value, mutable, comments), 6 × 3 marks (expression evaluation, three kinds of error, conversions, trace table, print forms, identity versus mutability) |
| long | 6 × 5 marks (bill with input and conversion, seconds to h:m:s, compound interest, digits of a number, types and mutability, three faulty programs) |
| case-based | 4 × 4 marks (guava stall input bug, library record types, sweet-sharing run-time errors, pocket-money augmented assignment); internal choice in part (c) |

- Marks 163. Difficulty d1 12, d2 25, d3 39, d4 9, d5 2. Competency recall 9, understanding 26, application 29, analysis 23 (60% application or above). Topics: t01 55 items, t02 32 items.
- MCQ keys a7 b6 c6 d6.
- Deck checks (8, not in either test): `m_ident_valid`, `mt_literal`, `m_mutable_obj`, `m_aug` (part 1); `ord_eval`, `m_value_err`, `m_printsep`, `m_runtime` (part 2).

## For a reviewer

- **Carried over from the earlier writer** (kept after checking each key): 61 items covering tokens through input/output, the 2-mark shorts and the first 3-mark short. Changes: tags of the comment items moved to t01; `tf_none` reworded (its prose equalled a CBSE 12 item); five competency labels lowered to understanding after review; stub expressions turned into `s3_expr`.
- **Scope calls to check:** `co_complex` uses `abs()`, `.real` and `.imag` of a complex number (complex is listed as a type; the reviewer replaced `.conjugate()`, which is beyond the syllabus). `tf_interactive` states how the `>>>` prompt behaves; that claim is not executed (only the value 42 is). `round()` is used in long answers for rounding to 2 decimal places. `ar_case` relies on "most keywords are lower case" (True, False and None are capitalised).
- **Not rendered yet:** nobody has seen the tables, in particular the 9-row precedence table and the 4-column trace tables, on a phone at 360 px.
