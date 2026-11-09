# ICSE Class 10 Computer Applications, Chapter 4: Revision: Conditional Constructs

`icse-10-computer-applications-ch04` · release v1 · academic year 2026-27 · family `computer-science` · provenance `human` · every item `status: "draft"`

Build: `npx tsx content/authored/computer-science/icse-10-computer-applications-ch04/src/build.mjs` from `platform/`. Edit `src/`, not the JSON.

## Scope

All three syllabus topics:
- t01 `if`, `if-else`, the if-else-if ladder, nested `if`; the dangling else; the stray semicolon after the condition; `=` written for `==`; logical operators in conditions
- t02 `switch-case` on int, char and String selectors; `default`, `break`, fall-through (accidental and deliberate); rules for case labels; switch compared with an if-else-if ladder and converted both ways
- t03 menu-driven programs that use `switch` on the choice (numbers and letters, reading a char with `next().charAt(0)`); ending a program with `System.exit(0)`

## Contents

| File | What |
|---|---|
| `release.json` | 2 decks (20 and 21 slides; 15 and 16 with a visual, 5 own SVGs, the rest tables and flows; 3 and 4 worked examples; 4 checks each); 6 notes sections; 31 flashcards; 75 questions worth 205 marks |
| `tests.json` | short test (25 marks, 30 min) and long test (50 marks, 60 min), each following its blueprint; disjoint; no deck-check item |
| `src/q_util.mjs`, `q_a.mjs`, `q_b.mjs`, `q_c.mjs` | helpers and the question bank (t01, t02, t03 plus the programs) |
| `src/build.mjs` | visuals, decks, notes, flashcards, tests |
| `src/java-cache.json` | results of every Java program run by the build (133 distinct programs) |

Questions: 26 mcq, 5 assertion-reason, 3 true-false, 3 fill-blank, 2 match, 2 ordering, 15 code-output (4 are error items, all compile-time), 12 short (2 marks), 7 programs (15 marks).
Competency: recall 12, understanding 19, application 28, analysis 16 (application or above 59%). Difficulty: d1 8, d2 18, d3 34, d4 14, d5 1.

## Tests

- Short: A = 6 mcq (`m_cond_type`, `m_semi_if`, `m_dangling`, `m_fall_trace`, `m_case_valid`, `m_exit_effect`) + 2 short (`s_eq_vs`, `s_exit`); B = one of two programs (grade card, tile-shop shape menu).
- Long: A = 10 mcq + 3 short (`s_fall`, `s_ladder_to_switch`, `s_stmt_pf`) + 2 code-output (`co_nested`, `co_sw_default_mid`); B = two of three programs (electricity bill with slabs, triangle type, unit converter that ends with `System.exit(0)`).
- The largest-of-three and day-planner programs are bank-only.

## How verified

Every program compiled and run with JDK 21 at build time; results in `src/java-cache.json`. Every output, error message (javac) and value shown anywhere comes from those runs, with typed input supplied to each Scanner program and fragment. Claims made in prose, such as "this label compiles" or "this selector is rejected", are asserted by compiling the code (`mustCompile`, `mustFail`) and stop the build when Java disagrees. Facts stated in narration in words are checked with `expect()`. The build also runs the schema, pipeline lint (0 errors, 0 warnings), deterministic verify, narration rules, the answer-leak scan and the originality pre-check against every authored chapter. The near-duplicate scan reports 0 flags and the SVG label check 0 issues. Three consecutive builds give byte-identical `release.json`, `tests.json` and `src/java-cache.json`.

## Facts for a reviewer

1. A selection statement chooses the statements to execute according to a condition; in Java the condition of `if` must be of type boolean (`if (x)` with an int x is a compile error: "incompatible types: int cannot be converted to boolean").
2. `if` has one branch, `if-else` two, an if-else-if ladder three or more (tested from the top, only the first true one runs, the final `else` is optional), a nested `if` has an `if` inside the block of another.
3. Without braces an `if` or `else` controls only the next single statement; indentation has no meaning to Java.
4. Dangling else: an `else` pairs with the nearest unmatched `if` (real run: stock 40, order 12 prints Retail then Done); braces change the pairing.
5. A semicolon right after `if (...)` is an empty statement that becomes the body (a logical error, no compile error). An `else` after such a semicolon is a compile error: "'else' without 'if'".
6. `if (x = 5)` with an int x is a compile error: "incompatible types: int cannot be converted to boolean". With a boolean variable, `if (open = true)` compiles and always takes the if branch.
7. `&&` has higher precedence than `||` (`a < 0 && b > 0 || c > 0` with a = 6, b = -2, c = 9 is true). Strings are compared with `equals`, which is case-sensitive; `==` on Strings is only mentioned as not to be used (Chapter 13 covers Strings).
8. In a ladder of lower limits the largest limit must be tested first (an ordering item shows what a wrong order prints).
9. switch: the selector may be int (also byte, short), char or String; String selectors work from Java 7 (stated in slide, item and card; not testable by the JDK 21 run, taken from the language history); double, long and boolean selectors are compile errors. JDK 21 messages: "selector type double is not allowed", "selector type long is not allowed", "selector type boolean is not allowed" (older javac versions word these differently, for example "incompatible types: possible lossy conversion from double to int").
10. Case labels: constants (a `final` variable with a constant value is accepted; an ordinary variable gives "constant expression required"), unique ("duplicate case label"), of a type that suits the selector (a String label with an int selector gives "incompatible types: String cannot be converted to int").
11. `break` leaves the switch; without it control falls through into the following cases until a break or the end; a missing break is not a compile error. `default` runs when no case matches, is optional, may be written anywhere (when it is first and has no break it also falls into the next case: real run for n = 5), and needs no break when it is last.
12. Deliberate fall-through groups labels (vowel program). A String switch matches exactly, so red and RED differ.
13. A switch compares for equality with constants, so ranges need a ladder; a switch of exact values converts to a ladder of `==` tests (grouped labels become `||`) and back; the equivalence is checked by running both versions.
14. The selector may be an expression (`n % 4`); it is evaluated once.
15. A menu-driven program displays the options, reads the choice, uses a switch on it, and uses `default` for an invalid choice. Scanner has no method that reads a char: `sc.next().charAt(0)`; `sc.nextChar()` gives "cannot find symbol"; `char ch = sc.nextLine();` gives "incompatible types: String cannot be converted to char"; `char ch = sc.nextInt();` gives "incompatible types: possible lossy conversion from int to char".
16. `System.exit(0)` terminates the whole program (the Java Virtual Machine) at once; 0 is the conventional status for normal termination; later statements do not run; `break` leaves only the switch.
17. Definitions in the notes: selection statement, condition, if statement, if-else-if ladder, nested if, dangling else, empty statement, switch statement, case label, default, break, fall-through, menu-driven program, System.exit(0).
18. Programs use imagined organisations and data (Sundarpur Power Board slabs of Rs 2.50, 4.00 and 6.50 per unit with a fixed charge of Rs 60; Lakeview Public School grade bands; fruit-seller crates; craft-class sticks; tile-shop shapes with pi as 3.14; science-club converter; school timetable days). The programs use `double` arithmetic and print the default `double` text (for example 9.5 and 4 give Perimeter = 27.0).
19. The triangle program treats a degenerate triangle (a + b equal to c) as "Not a triangle", as the stem says the sum of two sides must be greater than the third.

Unsure of: whether the board expects `switch` on String to be mentioned at all in Class 10 (it is given as one line and one multiple-choice item); the exact wording of javac's selector messages across JDK versions (fact 9); whether examiners accept `System.exit(0)` in the default case as the model for invalid menu choices (it is the usual textbook practice and is shown only as one option).

## Changes made when finishing the chapter (an earlier writer left the sources unfinished)

- Competency band: the earlier bank was 71% application or above. Seven mcq were replaced by new mcq on definitions and rules (`m_eq_vs_assign`, `m_ladder_feature`, `m_nested_def`, `m_str_java7`, `m_case_break_need`, `m_sw_features`, `m_menu_def`) and two shorts by theory shorts (`s_switch_def`, `s_break_vs_exit`); no tag was edited. The bank is now 59%.
- Three short model answers exceeded their word limits (the dangling else answer by more than 20%); the dangling else answer was shortened to one code block and the limits of `s_fall` and `s_exit` were widened to fit an answer with a worked example.
- The if-else-if ladder SVG drew the final "false" label twice, one over the other; the duplicate was removed.
