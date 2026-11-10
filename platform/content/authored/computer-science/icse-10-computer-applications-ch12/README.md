# ICSE Class 10 Computer Applications, Chapter 12: Double-dimensional Arrays

`icse-10-computer-applications-ch12` · release v1 · academic year 2026-27 · family `computer-science` · provenance `human` · every item `status: "draft"`

Build: `npx tsx content/authored/computer-science/icse-10-computer-applications-ch12/src/build.mjs` from `platform/`. Edit `src/`, not the JSON.

## Scope

All three syllabus topics (unit "7. Arrays"):
- t01 declaration (`new int[r][c]`, rows first), initialiser lists, default values, `a.length` for rows and `a[0].length` for columns, number of elements and memory, element access `a[i][j]`, array-of-arrays picture, accepting elements with nested loops (row-major, `Scanner`), display in matrix format (the empty `println` after the inner loop), valid subscripts and `ArrayIndexOutOfBoundsException`
- t02 sum of each row and each column (outer loop rows vs columns, the sum set to 0 inside the outer loop), the carry-over mistake, grand total, row and column totals in one pass with two arrays, column average with a cast
- t03 left diagonal (`i == j`, `a[i][i]`) and right diagonal (`i + j == n - 1`, `a[i][n - 1 - i]`) of a square matrix, single loop and nested loops with `if`, the centre element of an odd matrix counted in both, both diagonals each element once, why diagonals need a square matrix

Searching and sorting in double-dimensional arrays are not in the syllabus and are not covered; jagged arrays, transpose and upper/lower triangles are left out as well.

## Contents

| File | What |
|---|---|
| `release.json` | 2 decks (20 and 22 slides; 15 and 16 with a visual, 8 own SVGs, the rest tables and flows; 3 and 4 worked examples; 4 and 5 checks); 6 notes sections; 33 flashcards; 79 questions worth 211 marks |
| `tests.json` | short test (25 marks, 30 min) and long test (50 marks, 60 min), each following its blueprint; disjoint; no deck-check item |
| `src/q_util.mjs`, `q_a.mjs`, `q_b.mjs`, `q_c.mjs` | helpers and the question bank (t01, t02, t03 plus the programs) |
| `src/build.mjs` | visuals, decks, notes, flashcards, tests |
| `src/java-cache.json` | results of every Java program run by the build (156 distinct programs) |

Questions: 29 mcq, 5 assertion-reason, 4 true-false, 3 fill-blank, 2 match, 2 ordering, 15 code-output (4 are error items: 3 run-time `ArrayIndexOutOfBoundsException`, 1 compile-time), 12 short (2 marks), 7 programs (15 marks).
Competency: recall 7, understanding 23, application 30, analysis 19 (application or above 62%). Difficulty: d1 2, d2 20, d3 41, d4 15, d5 1.

## Tests

- Short: A = 6 mcq (`m_rows_expr`, `m_nested_order`, `m_rowsum_outer`, `m_reset_place`, `m_left_cond`, `m_right_cond`) + 2 short (`s_display`, `s_colsum_code`); B = one of two programs (`l_shopweek` branch sales with row and column totals, `l_garden` square garden with diagonal sums).
- Long: A = 10 mcq + 3 short (`s_def_2d`, `s_why_reset`, `s_centre_twice`) + 2 code-output (`co_colsums`, `co_right_diag`); B = two of three programs (`l_planbeds` accept and display a nursery table with validation, `l_exam` student totals, percentages, subject averages and topper, `l_both` both diagonals and equality test).
- Bank-only programs: `l_table` (product grid) and `l_magic` (magic square check, topics t02 and t03).
- Deck checks use `mt_syntax`, `m_default_double`, `ord_input`, `co_swapped_loops` (Part 1) and `ord_colsum`, `co_total_reset`, `m_right_idx`, `ar_centre`, `co_err_nonsquare` (Part 2); none is in a test.

## How verified

Every program compiled and run with JDK 21 at build time; results in `src/java-cache.json`. Every output, error message (javac and run-time exception) and value shown anywhere comes from those runs, with typed input supplied to each Scanner program. Claims made in prose, such as "this does not compile" or "this throws", are asserted with `mustFail`/`mustThrow`, and facts stated in narration in words are checked with `expect()`; the build stops when Java disagrees. Trailing blanks of output lines (from `print(x + " ")`) are trimmed in the displayed outputs, as the answer checker ignores them. The build also runs the schema, pipeline lint (0 errors, 0 warnings), deterministic verify, narration rules, the answer-leak scan and the originality pre-check against every authored chapter.

## Facts for a reviewer

1. A double-dimensional array is an array of arrays: `new int[3][4]` makes 3 rows and 4 columns (12 elements, all 0); `a.length` is the number of rows and `a[0].length` the number of columns; `a.length()` is a compile error ("cannot find symbol").
2. Initialiser list: one inner list per row, no `new` and no sizes. `a[1] = 7;` on an `int[][]` is a compile error ("incompatible types: int cannot be converted to int[]").
3. Default values: int 0, double 0.0, boolean false, String null.
4. Memory taken as elements times the size of one element (int 4 bytes, double 8 bytes); the array-of-arrays overhead is not counted (stated as "memory used by the elements").
5. Valid subscripts 0 to length - 1; a bad one stops the run with `java.lang.ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3` (JDK 21 wording; the shown messages come from the real runs).
6. Display in matrix format: `print(a[i][j] + " ")` in the inner loop and an empty `println()` after it; the displayed outputs have trailing blanks trimmed.
7. Sum of each row: outer loop rows, `rs = 0` inside it, `println` after the inner loop. Column sums: outer loop over `a[0].length`. Declaring the sum before the outer loop gives running totals (sales table: 33 / 67 / 91 instead of 33 / 34 / 24).
8. Sum of all row sums equals sum of all column sums (both are the sum of all elements).
9. Left diagonal `i == j`; right diagonal `i + j == n - 1` (column `n - 1 - i` in row i). For odd n the centre `a[n / 2][n / 2]` is on both; for even n no element is common (7 by 7: 13 different elements on the two diagonals). Examples: the 4 by 4 matrix of the slides has left sum 17 and right sum 13; the 3 by 3 matrix has 12, 7 and, each element once, 15.
10. Programs use imagined names (Kalyan Stores, Greenfield Public School, a nursery, a housing society garden, a craft class) and print default `double` text (for example 76.75, 76.5, 80.0 for the subject averages). Percentage is total divided by 3.0 (three subjects of 100).
11. Definitions in the notes: double-dimensional array, subscript, matrix format, initialiser list, ArrayIndexOutOfBoundsException, row-major order, row sum, column sum, logical error, square matrix, left (principal) diagonal, right diagonal.
12. The magic square program (`l_magic`) is bank-only and takes the sum of the first row as the standard.

Unsure of: whether the board expects the memory of a table to be asked at all (it is one multiple-choice item); whether the term "principal diagonal" or "left diagonal" is preferred by the examiners (both are given in the notes, the syllabus says left and right); `l_magic` is marked difficulty 5 and may be hard for Class 10 within 15 marks.
