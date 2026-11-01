# ISC Class 12 Accounts, Chapter 13 — Accounting Application of Electronic Spreadsheet

`isc-12-accounts-ch13` · release v1 · academic year 2026-27 · ISC 2027, Accountancy (858), Section C, Unit 6 Accounting Application of Electronic Spreadsheet · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) on the pattern of ISC ch01–ch12 and the CBSE 12 Accountancy chapters. The closest CBSE model is `cbse-12-accountancy-ch12` (Computerised Accounting). This chapter reuses its approach of parsing and evaluating every formula, but not its firms, layouts or stems. The spreadsheet engine is rewritten for the ISC topic list. Build from `src/` by running `npx tsx content/authored/economics-commerce/isc-12-accounts-ch13/src/build.mjs` from `platform/`. The build validates the schema and runs the pipeline lint, the deterministic verify checks, the narration rules, the editorial counts and the answer-leak scan. It then writes `release.json` and `tests.json`, or parks them as `*.wip.json` if anything fails. Edit `src/`, not the JSON. A rebuild gives byte-identical files.

| File | What |
|---|---|
| `release.json` | 2 decks (23 + 22 slides), notes (8 sections), 32 flashcards, 79 questions (136 marks) |
| `tests.json` | `t_isc12accounts_ch13_short` (20 marks, 50 min) on `isc-12-default-chapter-test-short` and `t_isc12accounts_ch13_long` (40 marks, 100 min) on `isc-12-default-chapter-test-long`, item for item |
| `src/` | `lib.mjs` (copy of the CBSE 12 Economics lib; only the header changed), `acc.mjs` (the spreadsheet engine, display formats, date serials, record sorting and filtering, and the payroll, commission and grade rules in plain arithmetic), `questions.mjs` (the bank), `build.mjs` (decks, notes, flashcards, tests and bank-level checks) |

## Scope
The chapter covers all six topics of `platform/catalog/cisce/isc-12/accounts/syllabus.yaml`. It has no removed topics. Software is described generically: no brand names, and commands are named by what they do ("the move or copy command", "print titles").
- **t01** meaning, utility, merits and demerits of the electronic spreadsheet (11 items, counting items that also cover another topic).
- **t02** workbooks and worksheets: cells, ranges, column lettering after Z, entering and editing data, the fill handle, navigation keys, Save and Save As, and inserting, renaming, deleting, moving and copying sheets, including into another workbook. References to another sheet (`=May!B6`) are evaluated by the engine (12).
- **t03** formatting (fonts, alignment, wrap text, merge and centre, number and date formats, column width and ####, borders and conditional formatting), page set-up (orientation, margins, scaling, print area, print titles, header and footer) and print preview (10).
- **t04** formulas and operators (order of operations, comparison, text joining), relative, absolute, mixed and named references, and the functions SUM, AVERAGE (blank cells skipped), MAX, MIN, COUNT, COUNTIF, ROUND, percentages, IF (nested), AND and OR. Date functions DATE, DAY, MONTH, YEAR and TODAY are covered, with date arithmetic for due dates and days overdue. Freezing panes is covered here (18).
- **t05** the four applications the syllabus names:
  - **payroll**: basic, DA, HRA, TA by IF, CCA, PF on basic + DA, income tax, gross and net pay;
  - **sales and salesmen's commission**: profit, profit on sales, commission at a single rate by IF or in two slabs against a named target, and a status label;
  - **student marks**: total, percentage, result by the lowest mark, nested-IF grades and COUNTIF;
  - **journal**: debit and credit lines, totals, an agreement check, tracing a keying slip, and ledger balances by SUMIF (19).
- **t06** charts and graphs (choice by purpose, parts of a chart, steps), database creation (fields, records, layout rules), sorting on two keys, filtering with two conditions, and querying with COUNTIF and SUMIF (13).

**Income tax** in the payroll items uses a stated simplified rule: a flat 10% of the monthly gross above a limit. The rule is "for this exercise only" and is labelled as such everywhere. Real income-tax rules are annual and slab-based, and teaching them is not part of this chapter.

**No dollar signs.** The shared lib rejects any `$` outside maths, because the renderer reads `$…$` as LaTeX. So absolute references such as B2 locked on both column and row cannot be written in content. The chapter therefore:
- describes absolute and mixed references in words ("a dollar sign before the column letter and before the row number");
- uses **named cells** for every fixed rate or total in the formulas it shows (`DARate`, `HRARate`, `PFRate`, `TaxLimit`, `TaxRate`, `CCA`, `Target`, `NetTotal`, `AsOn`, `Rate`);
- states in the references table and the model answers that students may write either a locked reference or a name.

The engine's `Sheet` also refuses a `$` in any cell.

### Decks
- **Part 1 — Spreadsheet Basics, Formatting and Functions.** 23 slides; 18 have visuals (15 tables, 2 SVGs, 1 flow). It has 4 checks and 3 worked examples. The running case is the imagined **Pakhawaj Paper Mart, Krishnanagar**. The slides cover:
  - utility, merits and demerits;
  - an SVG of a labelled spreadsheet window (name box, formula bar, active cell, sheet tabs, status bar);
  - workbook terms, data entry and navigation, and managing sheets;
  - **WE1**: a summary sheet bringing in the April, May and June totals by sheet references (quarter ₹8,93,350, average ₹2,97,783.33);
  - formats (one stored value shown seven ways, including a date as the day count 46113), formatting tools, and page set-up and printing;
  - operators and the order of operations, and the kinds of reference;
  - functions with results computed on the register;
  - **WE2**: a sales register with a 5% discount by IF on orders of ₹20,000 or more, and shares of a named total (net ₹99,510);
  - **WE3**: Ghatam Glassware's credit register as on 30 September 2026, with due date = invoice date + credit days, days overdue 50, 11, 3 and 0 by IF, a nested-IF status and the overdue amount by SUMIF;
  - an SVG of freeze panes at B2 (row 1 and column A frozen while the view is at rows 15–19 and columns F–H);
  - summary and exam tips.
- **Part 2 — Accounting Applications, Charts and Databases.** 22 slides; 17 have visuals (13 tables, 2 flows, 2 SVGs). It has 4 checks and 7 worked examples. The slides cover:
  - the design steps for an application;
  - the payroll components;
  - **WE1**: Sarangi Spice Exports' payroll for five employees, gross ₹3,00,200 and net ₹2,64,196, shown on two slides;
  - commission rules;
  - **WE2**: Shehnai Home Appliances' sales sheet, two-slab commission totalling ₹37,980, three salesmen meeting the target;
  - **WE3**: Ektara Shiksha Niketan's marks sheet, where one student fails on a single paper despite 42.5%;
  - **WE4**: Dilruba Dairy's journal, totals ₹10,20,000 agreed, with SUMIF ledger balances of cash ₹12,000 and bank ₹1,90,000;
  - chart choice;
  - an SVG column chart of sales against a dashed target line;
  - an SVG pie of the gross-pay components, with slice angles computed from the shares;
  - database terms;
  - **WE5**: Nadaswaram Hardware's debtors list sorted on two keys, filtered on two conditions and queried by COUNTIF and SUMIF (₹2,33,400 still due);
  - summary and exam tips.
- Narration runs up to 79 words (mean 57). `build.mjs` refuses any digit, ₹, `/`, `&`, `%`, `=` or run of capitals in narration. Functions are spoken as "the if function" or "count if", and allowances by their full names.

### Notes (8 sections)
1. Meaning, utility, merits and demerits.
2. Workbooks and worksheets.
3. Formatting, previewing and printing.
4. Formulas and functions, with dates and freeze panes.
5. Payroll.
6. Sales, commission and student marks.
7. Journal in a spreadsheet.
8. Charts and the spreadsheet database.

Each section has key terms, formula patterns in the body and visuals. The exam tips list ten common mistakes and the 1/2/3/5-mark split.

### Question bank (79 items, 136 marks)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 27 | 1 | Keys: a 7, b 7, c 7, d 6. Options are computed for the column after Z, cells in a range, the percentage format, the date format, operator precedence, AVERAGE with a blank, IF with AND, date difference, a copied formula, freeze panes, PF, two-slab commission, profit on sales, nested grade, a two-key sort and a two-condition filter |
| assertion-reason | 6 | 1 | Keys: a 3, b 1, c 1, d 1 |
| true-false | 5 | 1 | 2 true, 3 false |
| fill-blank · match · ordering | 5 · 3 · 1 | 1 · 2 · 2 | Matches: workbook terms, formats to displays (computed), parts of a chart. The ordering item copies a sheet into another workbook |
| numerical | 7 | 1 | Quarter total from three sheets, percentage share, days overdue, gross pay, slab commission, COUNTIF, SUMIF |
| short | 9 | 2 | Utility, demerits, sheets (rename, copy versus move), heading format, an IF discount, date functions, DA and HRA formulas, commission by target, database terms |
| short | 10 | 3 | Merits, workbook summary by sheet references, page set-up, SUM, AVERAGE, MAX and MIN, the copy error with a drifting rate cell, one employee's deductions and net pay, marks with the result by MIN, a journal with a keying slip, chart steps, sort and filter |
| long | 6 | 5 | All in parts (2 + 3): credit register with interest on overdue days, a three-employee payroll, sales and commission, marks with grades, a journal with SUMIF balances, a database sort, filter and four queries |

- **Difficulty** d1/d2/d3/d4/d5 = 6/35/28/9/1.
- **Competency**: recall 7, understanding 27, application 40, analysis 5. That puts **57% at application or above** (45 of 79; the lint band is 45–65%).
- **Written answers** carry the full working in `model_answer_md`: formula tables showing each formula with what it displays, and completed sheets. `solution_md` is a one-line method note. Every marking scheme uses whole-number step marks that add up to the item's marks; the build asserts this.
- **Tests** are disjoint and use none of the 8 deck-check items (`tf_unbalanced`, `fb_cell`, `m_relative_copy`, `tf_freeze_print`, `num_gross`, `m_commission`, `mt_chart_parts`, `num_countif`). The build asserts that every section matches the blueprint YAML item for item: types, marks and choice groups.

| Test | A (objective) | B (2 marks) | C (3 marks) | D (5 marks) |
|---|---|---|---|---|
| Short | 4 MCQ (recalculation, cross-sheet formula, IF with AND, nested grade) + 1 A-R (what-if) | IF discount + (utility or database terms) | SUM, AVERAGE, MAX, MIN + (marks or page set-up) | Sales and commission |
| Long | 10 MCQ + 2 A-R (display versus value; PF base) | DA and HRA formulas, date functions + (sheets or commission) | Payroll deductions, journal slip, workbook summary + (copy error or sort and filter) | Payroll + (journal with SUMIF or database queries) |

## Verifier record (what the build computes and asserts)
- **Formula engine** (`acc.mjs` `Sheet`). It tokenises, parses and evaluates every formula shown in decks, notes, stems and model answers. That covers operator precedence, comparisons, `&`, ranges, named cells, references to other sheets of a workbook, and the functions SUM, AVERAGE, MIN, MAX, COUNT, COUNTA, ROUND, ABS, IF, AND, OR, NOT, COUNTIF, SUMIF, DATE, DAY, MONTH and YEAR.
  - Empty cells count as zero in arithmetic and are skipped by AVERAGE and COUNT.
  - Results are held to 15 significant digits, as a spreadsheet does.
  - A wrong reference, an unknown name or sheet, a circular reference, text used as a number or division by zero throws.
  - A cell's shown value is generated from the engine, so no result is typed by hand.
  - `shiftFormula()` produces every "copied down" formula, and the build asserts that each register and payroll row is a copy of row 2.
- **Display formats** (`fmt()`): General, fixed decimals, comma style in Indian grouping, percentages and five date formats, with half-up display rounding. Each is asserted on the formats slide and in the format items. Examples: 0.0875 shows as 8.8%; two cells of 10.004 show 10.00 each but add to 20.01.
- **Dates** are spreadsheet serials, with 1 April 2026 = 46113. Due dates and days overdue are recomputed directly from the serials: Ghatam 50/11/3/0, Mridangam 17 days, Tutari interest ₹2,037 in total.
- **Payroll**: every row of the Sarangi, Kinnari and Mizhavu sheets is recomputed by `payroll()` in plain arithmetic and compared cell by cell. The build also asserts that gross − deductions = net in every row and in total. Pinned values: Sarangi gross ₹3,00,200 and net ₹2,64,196; Kinnari net ₹1,75,574, including a 422.5 tax rounded to 423; Mizhavu net ₹70,116.
- **Commission**: `commission()` recomputes every slab result. Pinned values: Shehnai ₹37,980 (Srijita ₹11,250), Dafli ₹8,600, Udukkai ₹14,300.
- **Marks and grades**: `grade()` and the minimum-mark rule recompute every result and grade (Ektara, Bhorthal, Pambai, Urumi).
- **Journal**: debit and credit totals and the agreement check are asserted, and SUMIF balances equal the ledger worked from the transactions. Dilruba cash ₹12,000 and bank ₹1,90,000; Sarinda cash ₹1,18,000. The Tokari slip is asserted to show "Check entries" with a difference of 16,200.
- **Database**: sorts (stable, several keys) and filters run on the record objects, and every COUNTIF / SUMIF result is asserted equal to the filtered records counted or added. This applies to Nadaswaram, Maddalam, Jhanj, Dhimay, Timila and Mashak.
- **SVGs**: the pie's slices are drawn from the computed shares and asserted to close the circle. The column heights and target line come from the Shehnai sheet. All four SVGs were rendered and checked for overlaps.
- **Bank-level checks** in `build.mjs`:
  - whole-number scheme marks that sum to each item's marks;
  - blueprint fit of both tests;
  - the two tests share no question, and no deck check appears in a test;
  - narration TTS rules.
- **Pipeline gates** inside the build: schema, `lintExemplar` (0 errors, 0 warnings), `deterministicChecks` (0 flags) and the answer-leak scan.
- **Run separately**:
  - `content originality --authored`: 188 units, 0 errors; this unit has 0 errors and 0 warnings.
  - The cross-bank checker (the pipeline's `nearDuplicates` over the ISC Accounts and CBSE 12 Accountancy banks, 1,834 questions) reports 0 flags.
  - Two builds give identical md5 for both JSON files.

## Originality
Every firm, school, person, layout and figure is SOYL's own and labelled "imagined". Firms are named after Indian musical instruments, for example Pakhawaj, Ghatam, Sarangi, Shehnai, Ektara, Dilruba, Nadaswaram, Kinnari, Tutari and Maddalam. Their names, the people's names and the towns were checked word by word against the CBSE 12 Accountancy chapters and ISC ch01–ch12 (and ch14 as far as it exists). Twenty-two colliding words were replaced, including Bhadohi, Malda, Hojai, Ghungroo, Manjira and several first names.

Every stem names its own firm, sheet or list, including the match, true-false, fill-blank and assertion-reason lead-ins. No textbook illustration or exercise and no CISCE specimen or past-paper item was used or reconstructed.

## Blueprint fit (ISC class default 1/2/3/5)
Accounts has no subject blueprint, so the tests use the ISC 12 defaults, which fit this practical topic well:
- 2-mark items are one or two formulas with their values, or two points;
- 3-mark items are a short sheet of three formulas with values, or three merits or steps;
- 5-mark items are full applications in parts (2 + 3).

Formulas and values carry separate scheme marks.

## For a reviewer to double-check
- **Keyboard and commands** (Ctrl + Home, F2, the move or copy command, print titles, freeze panes) are given as they work in common spreadsheet programs. Wording differs between programs, so items avoid brand-specific menu paths.
- **Date serials** follow the common convention (1 January 1900 = 1, so a serial counts days from 30 December 1899). Only differences and the shown serial 46113 depend on it.
- **PF** is 12% of basic + DA, and TA, CCA, rates and limits are stated in each stem. **Income tax** is a simplified practice rule, as noted under Scope.
- **COUNTIF and SUMIF text criteria** ignore capitals, as spreadsheets do. One item (Jhanj) mentions this in its solution.
- **AVERAGE** with an empty cell divides by the count of numbers (Kombu); a typed zero would be counted.

## Gaps
- There is no case-based item; written items are self-evaluated against the marking scheme.
- Wide sheets (payroll with 11 columns, the Kinnari and Bhorthal completed sheets) are long markdown tables that scroll on a phone. The SVGs place labels by pixel coordinates. Both should be checked at 360 px on staging.
- Hands-on practice in real software (the ISC practical) cannot be graded here. Items ask for formulas and the values they show.
