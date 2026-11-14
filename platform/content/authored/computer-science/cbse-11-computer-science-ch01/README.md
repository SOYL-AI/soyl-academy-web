# CBSE Class 11 Computer Science, Chapter 1 — Computer Systems and Organisation

`cbse-11-computer-science-ch01` · release v1 · academic year 2026-27 · family `computer-science` · provenance `human`, author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-050) to the standard of the CBSE 12 Computer Science chapters. Built from `src/`: run `npx tsx content/authored/computer-science/cbse-11-computer-science-ch01/src/build.mjs` from `platform/`. Edit `src/`, not the JSON.

The build runs these checks before it writes `release.json` and `tests.json`:
- schema validation;
- pipeline lint and deterministic verify;
- word limits, narration rules and the answer-leak scan;
- the editorial counts and the shape of both tests against the CBSE 11 default chapter-test blueprints;
- the stem-duplicate check against every other authored chapter.

## Python and computed facts

One Python 3 program (`FACTS_PY` in `src/questions.mjs`) computes every truth table (itertools), base conversion (`format`, `int(x, base)`), binary fraction (`Fraction`), memory-unit figure, `ord()` code and UTF-8 / UTF-32 byte string used anywhere in the chapter. JavaScript cross-checks the conversions, verifies each Boolean law for every input, and asserts that the De Morgan, NAND-universal and XOR identities hold. The four code-output items, the error-finding item and the two outputs shown on slides run as separate programs. In all, 9 programs are executed and recorded in `src/py-cache.json` (commit it with the chapter).

| File | What |
|---|---|
| `release.json` | 2 decks of 18 + 21 slides with 29 visuals (4 SVG: gate symbols, a logic circuit, a computer block diagram and the memory hierarchy; the rest tables and flows); 6 notes sections; 30 flashcards; 79 questions worth 152 marks |
| `tests.json` | `t_cbse11computerscience_ch01_short` (20 marks, 40 min) on `cbse-11-default-chapter-test-short` and `t_cbse11computerscience_ch01_long` (40 marks, 90 min) on `cbse-11-default-chapter-test-long`, both with their internal-choice groups. They are disjoint, use no deck-check item, and Section D is case-based in both. |
| `src/` | `lib.mjs` (the shared lib with `setAuthor` and the blueprint shape check), `questions.mjs`, `build.mjs`, `py-cache.json` |

## Scope

All three syllabus topics are covered and nothing beyond Class 11:
- **t01** components of a computer (input, CPU with ALU, control unit and registers, memory, output); cache, RAM, ROM and secondary memory; bit, nibble, byte to PB; system, utility and application software; assembler, compiler, interpreter; the functions of an operating system.
- **t02** NOT, AND, OR, NAND, NOR and XOR with truth tables; evaluating expressions and building truth tables; the Boolean laws and De Morgan's laws; simple logic circuits.
- **t03** binary, octal, decimal and hexadecimal conversions, including fractions; ASCII, ISCII, Unicode, UTF-8 and UTF-32.

### Decks

| Part | Slides | Checks | Worked examples |
|---|---|---|---|
| 1 | 18 | 4 | unit conversion; which kind of software |
| 2 | 21 | 4 | a truth table; simplifying with laws; decimal to binary; grouping bits; bytes of real characters |

Narration is at most 66 words per slide (mean 48) and uses no symbols; acronyms and hexadecimal digits are spelt out.

### Question bank (79 items)

| Type | Count |
|---|---|
| mcq | 28 |
| assertion-reason | 5 |
| true-false | 5 |
| fill-blank | 4 |
| match | 3 |
| ordering | 3 |
| code-output | 4 |
| short 2-mark | 11 (one is an error-finding item with `pyErr`) |
| short 3-mark | 6 |
| long 5-mark | 6 |
| case-based | 4 |

- **Case-based items:** a cafe tablet (memory units and software), a warehouse lift (Boolean logic), a web colour code (hexadecimal) and a library app (UTF-8 and UTF-32), each with an internal choice in part (c).
- **Difficulty:** d1 11, d2 23, d3 35, d4 9, d5 1.
- **Competency:** recall 10, understanding 23, application 32, analysis 14. That puts 58% of items at application or above. (The subject-producer's review retagged three one-step items from application to understanding: `m_kb`, `m_and`, `m_nand_out`.)
- **Topics:** t01 27, t02 24, t03 28 items.
- **MCQ keys:** a 7, b 7, c 7, d 7. **Assertion-reason keys:** a, d, b, a, c.

## Data and facts

- **Memory-unit convention:** 1 KB = 1024 bytes, 1 MB = 1024 KB, 1 GB = 1024 MB (the CBSE syllabus convention), used throughout and restated in every calculation stem.
- **Encodings:** ASCII is 7 bits and 128 codes; ISCII is 8 bits with ASCII in the lower half and Indian scripts above (no ISCII code values are stated); Unicode has 1,114,112 code points; UTF-8 uses 1 to 4 bytes (the range boundaries are verified with Python); UTF-32 uses 4 bytes.
- **Not stated:** no current statistics, prices or product versions.

## For a reviewer

- **Library fix needed:** the blueprint shape check in `src/lib.mjs` compares each section with its items sorted as strings, so a plain `short:2` always sorts before `short:2*`. The expected strings for `cbse-11-default-chapter-test-long` list the choice items first (`short:2*,short:2*,short:2,short:2,short:3*,short:3*,short:3` and `long:5*,long:5*,long:5`), which can never match. This chapter was built with them changed to `short:2,short:2,short:2*,short:2*,short:3,short:3*,short:3*` and `long:5,long:5*,long:5*`; the shipped lib must be fixed the same way before the chapter rebuilds.
- **Spares:** 39 items are in neither test nor a deck check, including all four code-output items, `l_software_choice`, `cb_colour` and `s3_dm_prove`.
- **Rendering:** nobody has seen the four SVGs rendered; check them at 360 px on staging. Gate shapes are built from paths and arcs.
- **Hindi and emoji text:** the Hindi words and the emoji in the encoding table must render in the slide player.
