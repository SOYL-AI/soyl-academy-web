# ICSE Class 10 Computer Applications, Chapter 5: Revision: Iterative Constructs and Nested Loops

`icse-10-computer-applications-ch05` · release v1 · academic year 2026-27 · family `computer-science` · provenance `human` · every item `status: "draft"`

Build: `npx tsx content/authored/computer-science/icse-10-computer-applications-ch05/src/build.mjs` from `platform/`. Edit `src/`, not the JSON.

## Scope

All four syllabus topics:
- t01 entry-controlled (`for`, `while`) and exit-controlled (`do-while`) loops, the four parts of a loop, inter-conversion of the three loops, counting the passes of a loop body
- t02 variations: finite and infinite loops (shown, never run), delay loops and the stray semicolon, several counters in a `for` header (comma), `break` and `continue`
- t03 number programs with loops: digit extraction with `%` and `/`, digit count and sum, reverse and palindrome, prime (factor count and flag with `break`), perfect, Armstrong (with `(int) Math.pow`), Fibonacci, HCF (and Euclid's way in the notes) and LCM
- t04 nested `for` loops: rectangular and right-angled triangular patterns (increasing and decreasing, number and symbol), sum of a series in one variable with `Math.pow` and `1.0 / i`

Not taught or tested (removed topics): nested `while` and nested `do-while` loops; patterns other than rectangles and right-angled triangles. Every nested loop in the chapter is a `for` inside a `for`; digit extraction uses a single `while` loop (or sequential, never nested, loops).

## Contents

| File | What |
|---|---|
| `release.json` | 2 decks (21 and 23 slides; 16 and 18 with a visual, 3 own SVGs (two flowcharts and the nested-loop grid), the rest tables and flows; 3 worked examples and 4 checks each); 7 notes sections; 35 flashcards; 79 questions worth 210 marks |
| `tests.json` | short test (25 marks, 30 min) and long test (50 marks, 60 min), each following its blueprint; disjoint; no deck-check item |
| `src/q_util.mjs`, `q_a.mjs`, `q_b.mjs`, `q_c.mjs`, `q_d.mjs`, `q_e.mjs` | helpers and the question bank (t01, t02, t03, t04 and the 15-mark programs) |
| `src/build.mjs` | visuals, decks, notes, flashcards, tests |
| `src/java-cache.json` | results of every Java program run by the build (226 distinct programs) |

Questions: 30 mcq, 5 assertion-reason, 4 true-false, 3 fill-blank, 3 match, 2 ordering, 13 code-output (4 are error items, all compile-time), 12 short (2 marks), 7 programs (15 marks).
Competency: recall 10, understanding 19, application 34, analysis 16 (application or above 63%). Difficulty: d1 8, d2 19, d3 31, d4 19, d5 2.
Topics: t01 18, t02 21, t03 22, t04 17, t03+t04 1 (the prime numbers between two limits program).

## Tests

- Short: A = 6 mcq (`m_entry_exit`, `m_break_trace`, `m_reverse`, `m_prime_count`, `m_nested_count`, `m_series_term`) + 2 short (`s_break_continue`, `s_pattern_stmt`); B = one of two programs (`l_plate` digit study of a plate number, `l_tiles` two tile layouts).
- Long: A = 10 mcq (`m_loop_def`, `m_dowhile_syntax`, `m_convert`, `m_infinite_def`, `m_continue_for`, `m_multi_counter`, `m_last_digit`, `m_perfect`, `m_arm_power`, `m_tri_out`) + 3 short (`s_convert`, `s_hcf_lcm`, `s_series_stmt`) + 2 code-output (`co_digit_sum`, `co_tri_dec`); B = two of three programs (`l_quiz` menu of prime, perfect and Armstrong checks, `l_series` series sum, `l_stall` bills with `break` and `continue`).
- The HCF and LCM program (`l_hcf`) and the prime numbers between two limits program (`l_primes`) are bank-only.
- Deck check items (not in any test): Part 1 `m_count_for`, `co_dowhile_false`, `mt_loops`, `co_break_continue`; Part 2 `fb_digit`, `ord_fib`, `co_nested_count`, `m_series_val`.

## How verified

Every program compiled and run with JDK 21 at build time; results in `src/java-cache.json`. Every output, count, error message (javac) and value shown anywhere comes from those runs, with typed input supplied to each Scanner program. No infinite loop is ever executed: loops that never end appear only as code (the infinite-loop slide, table, short answer and notes), and every run uses a loop ended by `break` or a normal test. Trace tables on the slides come from instrumented copies of the displayed loops (extra `println` of the loop variables), and where a table is derived that way the build checks it against the displayed code (worked example 3 of Part 1). Claims made in prose, such as "this ending of a do-while compiles" or "this loop header is rejected", are asserted by compiling the code (`mustCompile`, `mustFail`), and facts stated in narration, solutions and model answers in words (sums, trace values, counts) are checked with `expect()` at the top of `build.mjs`. The build also runs the schema, pipeline lint (0 errors, 0 warnings), deterministic verify, narration rules (longest narration 89 words), the answer-leak scan and the originality pre-check against every authored chapter. Two consecutive builds give byte-identical `release.json`, `tests.json` and `src/java-cache.json`, the second compiling nothing.

Trailing blanks: patterns and series printed with `print(x + " ")` leave a blank at the end of a line; the stored answers have the blanks removed from each line (the marking scheme is whitespace-insensitive per line). The programs in the model answers print short prompts (for example `Enter the bills, 0 to stop:`), which appear in the shown output.

## Facts for a reviewer

1. A loop has four parts: initialisation (once), test, body, update. `for` and `while` are entry-controlled (the body may not run at all); `do-while` is exit-controlled (the body runs at least once) and its condition ends with a semicolon (without it javac says "';' expected").
2. Inter-conversion: the initialisation moves before the loop, the update becomes the last statement of the body, the test stays; the three versions of the multiples-of-3 loop and of the 2, 8, 14, 20 loop print the same numbers (asserted).
3. Passes are counted by listing the values of the variable that pass the test (counted by a counter loop in the build); a loop whose test is false at the start has 0 passes, a do-while still runs once.
4. A semicolon directly after a `for` or `while` header is an empty body: the statement after it runs once, and a variable declared before the loop is one past the limit afterwards (value 6 for `i <= 5`). A delay loop is such a loop; the run uses a limit of 1000000, which finishes at once.
5. Several counters: `for (int a = 1, b = 10; a < b; a += 2, b -= 2)`; counters declared before the loop can be set in the header (`for (x = 2, y = 20; ...)`). One test only.
6. Infinite loops: condition always true, missing or wrong update, empty `for` parts. They are never run; bounded forms with `break` are run. A `for` with a decreasing update and `<=` is not used as an example, because an `int` eventually overflows.
7. `break` ends the loop; `continue` skips the rest of the pass and in a `for` loop runs the update, then the test. `break` outside a loop or switch gives "break outside switch or loop" (JDK 21 wording).
8. Digits: `n % 10` is the last digit and `n / 10` removes it (integer division); reverse `rev = rev * 10 + d`; palindrome means equal to the reverse and needs a copy of the number (an item shows the wrong answer when the original is destroyed).
9. Prime: exactly two factors (1 is not prime, 2 is the only even prime); two ways are shown, counting factors from 1 to n and a flag with `break` over 2 to n - 1. Perfect: sum of the factors other than the number (loop to n - 1), checked on 6, 28 (perfect), 12, 18, 20, 30 (not).
10. Armstrong: sum of the digits each raised to the power of the number of digits (the general definition; three-digit examples use cubes, and 1634 is used as a four-digit example). `Math.pow` returns a double, so storing it in an `int` needs a cast ("incompatible types: possible lossy conversion from double to int" without it).
11. Fibonacci: the order `c = a + b; a = b; b = c;` matters (wrong orders are shown with their real outputs). HCF by testing 1 to the smaller number and keeping the last common factor, LCM = `a * b / hcf` (84 and 120 give 12 and 840; HCF x LCM = a x b is checked); Euclid's remainder method gives 12 for 84 and 36. The product `a * b` is an `int`, which is fine for the sample sizes.
12. Nested `for` loops: the inner loop runs fully for each pass of the outer one; the inner body runs (outer passes) x (inner passes) times (12 for 4 and 3; 10 and 6 for the triangular counts); the new line comes after the inner loop; reusing the outer variable name in the inner loop gives "variable i is already defined in method main(String[])".
13. Patterns: rectangle (fixed inner limit), right-angled triangle (inner limit depends on `i`: `j <= i`, `j <= 5 - i`, outer variable counting down). All triangles are left-aligned, so no pyramid, diamond or centred shape appears.
14. Series in one variable: the term is written in terms of the loop variable and added to a sum that starts at 0; `Math.pow(x, i - 1) / i` for `1 + x/2 + x^2/3 + ...` (x = 3 and 4 terms give 12.25); `1.0 / i` against the integer division `1 / i` (with 2 terms the results are 1.5 and 1.0); the sum is a `double`, so `14.0` style output is printed.
15. Definitions in the notes: loop, iteration, for loop, entry-controlled loop, exit-controlled loop, infinite loop, delay loop, break, continue, palindrome number, prime number, perfect number, Armstrong number, Fibonacci series, nested loop, pattern, series, Math.pow.
16. Programs use imagined names and data (Meena's market stall, Green Meadows plate numbers, the number-quiz club, Mr Joshi's ribbons, plots of a housing colony, a community-hall tile contest, a maths-fair series). None of the programs or scenarios of chapters 1 to 4 is reused.

Unsure of: whether the board expects the general Armstrong definition (power equal to the number of digits) or only the three-digit cube form in Class 10 (the chapter teaches the general form, with `(int) Math.pow(d, digits)`, and uses cubes for three-digit examples); whether examiners accept a `while (true)` loop ended by `break` as the model answer for reading values until a sentinel (the stall program does this, and a version with the first value read before the loop would also be accepted); the exact javac wording of "break outside switch or loop" and "variable i is already defined in method main(String[])" on other JDK versions (the stored text is the JDK 21 output); and the use of `Math.pow` for the term of the series (the board's series examples are often written with a running product instead, which this chapter does not use).

## Changes made while finishing the chapter

- Competency band: the first draft was 76% application or above. Five trace-style multiple-choice items were replaced by items on definitions and rules (`m_loop_part`, `m_dowhile_syntax`, `m_continue_for`, `m_arm_power`, `m_nested_order`), two code-output items were dropped, and new items were written on prime numbers, the copy used in a palindrome program and the match of statements (`m_prime_def`, `m_palin_copy`, `mt_stmt`), together with two theory short answers (`s_prime_perfect`, `s_nested_def`). No tag was edited; the bank is now 63%.
- One wrong-answer option for the reverse-number item was an infinite loop (swapping `/` and `%`); the build's 30 s limit caught it, and it was replaced by a finite variant. The rule that infinite loops are never executed was kept.
- Comments in programs must not contain the word `class` before `main` (the shared Java runner would take the next word as the class name).
