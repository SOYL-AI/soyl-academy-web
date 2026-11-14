# CBSE Class 11 Computer Science, Chapter 2 — Introduction to Problem Solving

`cbse-11-computer-science-ch02` · release v1 · academic year 2026-27 · family `computer-science` · provenance `human`, author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-050) to the standard of the CBSE 12 Computer Science chapters. One syllabus topic, t01: steps of problem solving, algorithms, flowcharts, pseudocode, decomposition, verifying by dry runs, comparing algorithms.

**Building it.** Run `npx tsx content/authored/computer-science/cbse-11-computer-science-ch02/src/build.mjs` from `platform/`. Edit `src/`, not the JSON. The build:
- runs a Python twin of every algorithm whose trace, value or output appears anywhere in the chapter;
- validates the schema, runs the pipeline lint and the deterministic verify checks;
- checks narration rules, word limits, the answer-leak scan, the cross-chapter stem originality check and the editorial counts;
- checks both tests against the `cbse-11-default` chapter-test blueprints;
- writes `release.json`, `tests.json` and `src/py-cache.json`.

| File | What |
|---|---|
| `release.json` | 2 decks of 18 + 17 slides (25 visuals: 3 SVG flowcharts/symbol sheets, the rest tables and flows); 7 notes sections; 30 flashcards; 70 questions worth 135 marks |
| `tests.json` | `t_cbse11computerscience_ch02_short` (20 marks, 40 min) and `t_cbse11computerscience_ch02_long` (40 marks, 90 min), item for item on `cbse-11-default-chapter-test-short` / `-long`, with the internal-choice groups. Disjoint, no deck-check item, Section D case-based. |
| `src/` | `lib.mjs` (copy of the CBSE 11 lib), `questions.mjs` (bank, Python twins of the algorithms), `build.mjs` (visuals, decks, notes, flashcards, tests), `py-cache.json` |

## How values are produced

The chapter teaches algorithms, not Python syntax (that is chapter 3). Students read **pseudocode** (shown in `text` fences) and flowchart box lists; for each, the build executes a **Python twin** with `runPy()`/`pyOut()` and takes every trace-table cell, output, count and "what does this print for input ..." answer from that run. Code-output items on pseudocode or flowcharts carry the executed key. A few short Python programs (running total, maximum, linear search count, NameError fix) are shown as Python and run directly. Error messages come from `pyErr()`. If Python is absent the build uses `src/py-cache.json` (71 results, to be committed with the chapter).

## Question bank (70 items, topic t01)

| Type | Count |
|---|---|
| mcq | 20 |
| assertion-reason | 5 (keys a, b, c, d, a) |
| true-false · fill-blank · match · ordering | 4 · 4 · 2 · 3 |
| code-output | 10 (6 pseudocode or flowchart traces, 4 Python) |
| short | 8 × 2 marks, 5 × 3 marks (dry runs, an error-finding item with `pyErr`, a bug diagnosis, comparing algorithms) |
| long | 6 × 5 marks (pseudocode with trace tables: largest of three, Euclid, slab billing; a flowchart box list with loop; comparing two prime tests with counted divisions; decomposition) |
| case-based | 3 × 4 marks (library fine, school fete decomposition, savings loop); internal choice in part (c) |

- Difficulty d1 9, d2 23, d3 34, d4 3, d5 2. Competency recall 7, understanding 23, application 26, analysis 11, evaluation 3 (57% application or above).
- MCQ keys a5 b5 c5 d5.

## For a reviewer

- **Lib note:** `src/lib.mjs` is the CBSE 11 lib. Its blueprint shape table for `cbse-11-default-chapter-test-long` lists `'short:2*,short:2*,short:2,short:2,short:3*,short:3*,short:3'` and `'long:5*,long:5*,long:5'`, but the check sorts each section's items before comparing, so no test can match them (sorted is `'short:2,short:2,short:2*,short:2*,short:3,short:3*,short:3*'` and `'long:5,long:5*,long:5*'`). This chapter was built with those two strings sorted in a temporary copy; the committed `lib.mjs` is the unchanged original, so the long test fails the shape check until the lib's table is fixed in all copies.
- **Flowcharts in items:** a flowchart cannot be an image in an item stem, so "what does this flowchart print" items list the numbered boxes in the stem.
- **Not rendered yet:** nobody has seen the three SVG flowcharts or the pseudocode fences on a phone at 360 px.
