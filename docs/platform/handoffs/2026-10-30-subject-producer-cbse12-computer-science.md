# subject-producer — CBSE Class 12 Computer Science (Python + SQL), ch01–ch09 hand-authored — 2026-10-30

Status: done. All 9 chapters of the 2026-27 syllabus (`platform/catalog/cbse/12/computer-science/syllabus.yaml`) are hand-authored, pass every gate and are committed, one commit per chapter. These are the first chapters in the `computer-science` family.

Branch: `platform/subject-producer/cbse-12-computer-science`. Hand-authored under D-025/D-026; every item has `status: "draft"`.

## Code support (checked before authoring)

- **Rendering:**
  - `components/platform/ui/render/Markdown.tsx` renders fenced code as monospace `<pre>` that scrolls sideways. This works in block contexts: slide body, columns, notes, flashcards, stems and model answers.
  - Inline `code` renders everywhere, including bullets, options and table cells. Those inline contexts use only inline code, never fences.
  - There is no syntax highlighting. Nothing had to be worked around.
- **Schema:**
  - `code-output` is a contract-v2 type: a fenced ```` ```python ```` (or ```` ```sql ````) block in the stem and an exact `answer.output`, auto-graded after whitespace normalisation.
  - Lint checks code length, `input()` without stated input, and output size.
  - The pipeline's verify stage executes only JavaScript.
- **Execution, so every stated output is real:**
  - The shared `lib.mjs` (identical in all 9 chapters, md5 `0e04b33d…`) adds `runPy`, `pyOut`, `pyErr`, `runSql` and the `co()` builder.
  - **Every program or query whose output appears anywhere was executed during the build.** That covers code-output keys, MCQ options and solutions, model answers, trace and result tables, notes, flashcards and SVG labels.
  - **Runtime:** Python 3.12.3 (`py -3`) runs each program in a fresh temporary folder. File-handling items get their files created there first, and pickle files are created by hidden setup code.
  - **SQL:** queries run in SQLite through Python's `sqlite3`.
  - **Error-finding items:** the error line comes from `pyErr`, and every corrected program is re-run.
  - **Totals:** about 660 distinct programs and queries are executed (the `src/py-cache.json` entries per chapter).
- **Build without Python:** results are committed in each chapter's `src/py-cache.json`. A build on a machine without Python uses the cache and fails if any code has changed. Rebuilds are byte-identical, including the cache.
- **Originality pre-check:** the originality gate compares stems with code and maths stripped, so two items worded "Write the exact output of the following program." collide even when the programs differ. `lib.mjs` now runs the same exact-prose check at build time against every other chapter. Every code item's prose names its own program.

## Chapters

| Ch | Title | Commit | Decks (slides) | Notes | Cards | Questions | Code-output | Case-based | App.+ | Programs executed |
|---|---|---|---|---|---|---|---|---|---|---|
| 01 | Python Revision Tour | 415dd06 | 19 + 17 | 6 | 30 | 70 | 13 | 3 | 54% | 117 |
| 02 | Functions | 38e1840 | 17 + 17 | 6 | 30 | 71 | 11 | 3 | 58% | 105 |
| 03 | Exception Handling | 2885a13 | 17 + 17 | 6 | 30 | 75 | 14 | 3 | 56% | 104 |
| 04 | File Handling | cd3fa25 | 19 + 18 | 6 | 30 | 72 | 15 | 3 | 60% | 55 |
| 05 | Data Structure: Stack | cecf8b7 | 16 + 17 | 6 | 30 | 80 | 14 | 4 | 59% | 77 |
| 06 | Computer Networks | 577e651 | 20 + 20 | 6 | 31 | 80 | 0 | 4 | 55% | 0 (numbers asserted in JS) |
| 07 | Database Concepts | cab26a0 | 18 + 16 | 6 | 30 | 72 | 0 | 4 | 56% | 19 (SQLite) |
| 08 | Structured Query Language (SQL) | fb02320 | 22 + 18 | 6 | 30 | 76 | 14 (SQL) | 3 | 58% | 122 (SQLite) |
| 09 | Interface of Python with an SQL Database | 058a3a9 | 18 + 17 | 6 | 30 | 76 | 13 | 3 | 58% | 61 |
| **Total** | | | **18 decks, 323 slides** | 54 | 271 | **672** | 94 | 30 | | ~660 |

"App.+" is the share of items at application or above. Every chapter is inside the lint band of 45–65%.

Every chapter has the following:
- **Decks:** two, each with a title slide and goals, at least 2 worked examples (dry runs and trace tables computed by Python), 3–4 check slides on objective items, a summary and exam tips. No more than 3 slides in a row lack a visual; code itself does not count as a visual.
- **Questions:** mcq, assertion-reason, true-false, fill-blank, match, ordering, code-output, error-finding shorts, short (2 and 3 marks), long (5 marks) and case-based. Long answers that ask for a program show it run on a stated sample input.
- **Tests:** two, on `cbse-12-default-chapter-test-short` and `-long`, item for item including the internal-choice groups. Code-output items stay in the bank, because the blueprint slots are typed. The two tests share no questions and use no deck-check items.

## Gates (from `platform/`, under `_tools/heavy.sh`, 10:16–10:19 IST, on the final tree, before committing)

| Gate | Result |
|---|---|
| `npm test -w @soyl/content-templates` | 1282/1282 passed |
| `npm run content -- lint --exemplars` | ch01–ch09 each 0 errors, 0 warnings |
| `npm run content -- verify --board cbse --class 12 --subject computer-science --authored` | 9 units, 672 questions, 0 blocking flags |
| `npm run content -- originality --authored` | 183 units, 0 errors |
| `npx vitest run --root db test/db6-split.test.ts` | 8/8 passed |
| `npx vitest run --root api test/content.test.ts` | 13/13 passed |

An earlier run (09:41, ch01 only) failed originality with 24 `bank.duplicate` errors from generic code-item prose. That led to the build-time check described above.

Rebuilding all 9 chapters prints NO ERRORS 9 times and leaves the tree clean. The SVG label overflow and overlap script finds no issues in any chapter.

## Caveats for a reviewer

- **Python version:** error messages are Python 3.12's wording, for example `integer modulo by zero` where Python 3.10 says "integer division or modulo by zero". Marking rests on the error type and the fix.
- **SQL dialect:** students write MySQL, while results come from SQLite. ch08 uses only SQL whose results agree in both:
  - no integer `/`, no `||` and no date functions;
  - ORDER BY wherever order matters;
  - AVG is shown without MySQL's trailing zeros, with a note saying so;
  - NATURAL JOIN with `SELECT *` is asked only by column count.
  - MySQL-only DDL (CREATE/DROP DATABASE, USE, SHOW, DESCRIBE, ADD/DROP PRIMARY KEY) is shown but not executed, and no output is claimed for it.
- **ch09 driver:** students see mysql.connector programs, which are executed through sqlite3 by `toSqlite()`. It rewrites only the import, `connect()`, `Error`, `is_connected()` and `%s` → `?`. Only INT and text columns are used, every printout has ORDER BY, and no item asks for rowcount after a SELECT. **Recommended:** re-run a sample on a real MySQL 8 server with mysql.connector.
- **SQLite wording in ch07:** three key-violation messages quoted in solutions are labelled as SQLite's wording.
- **ch04 file positions:** `tell()` values assume LF line endings in the stated files.
- **ch06 repeater limit:** every case states its 90 m limit, so no answer depends on the 70 m or 100 m figures that books disagree on. "1 Mbps = 1024 Kbps" appears in one conversion item only.
- **Rendering:** nobody has seen code blocks inside two-column slides, the wide result tables or the SVGs on a phone. They need a look at 360 px, in light and dark mode, on staging.
- **Originality:** all programs, tables and scenarios are original (D-036). No real passwords appear; placeholders are used.

## Known gaps / follow-ups

- **Content:** items are `draft`. The content-verifier sample has not been done. There is no frozen test series yet (an assessment-designer step). Board-paper blueprints exist (`board.yaml`) but no subject chapter-test blueprints, so the class defaults are used.
- **Pipeline:** verify (stage 5) cannot execute Python or SQL. If wanted, a pipeline-owned Python runner could replace the build-time execution in `lib.mjs`.

Decisions made: none beyond this note (no ADR; no shared file touched).
Needs from owner: none.
