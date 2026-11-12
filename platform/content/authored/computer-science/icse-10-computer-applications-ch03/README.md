# ICSE Class 10 Computer Applications, Chapter 3: Revision: Input in Java and Mathematical Library Methods

`icse-10-computer-applications-ch03` · release v1 · academic year 2026-27 · family `computer-science` · provenance `human` · every item `status: "draft"`

Build: `npx tsx content/authored/computer-science/icse-10-computer-applications-ch03/src/build.mjs` from `platform/`. Edit `src/`, not the JSON.

## Scope

All three syllabus topics:
- t01 ways of input: initialisation, parameters (BlueJ method arguments), the Scanner class (nextInt, nextLong, nextFloat, nextDouble, next, nextLine, `next().charAt(0)`), the nextInt-then-nextLine pitfall, wrong input
- t02 packages (`java.lang`, `java.util`, import and the star), types of errors (syntax, run-time, logical), comments (`//`, `/* */`, `/** */`)
- t03 Math class: pow, sqrt, cbrt, ceil, floor, round, abs, max, min, random; return types; negative and half-way values; `Math.sqrt(-4)`; random whole numbers in a range; Java expressions for formulae

## Contents

| File | What |
|---|---|
| `release.json` | 2 decks (20 and 22 slides; 16 and 18 visuals; 3 checks each; 2 and 3 worked examples); 6 notes sections; 32 flashcards; 78 questions worth 229 marks |
| `tests.json` | short test (25 marks, 30 min) and long test (50 marks, 60 min), each following its blueprint; disjoint; no deck-check item |
| `src/q_util.mjs`, `q_a.mjs`, `q_b.mjs`, `q_c.mjs`, `q_d.mjs` | helpers and the question bank (t01, t02, t03, programs) |
| `src/build.mjs` | visuals, decks, notes, flashcards, tests |
| `src/java-cache.json` | results of every Java program run by the build (193 distinct programs) |

Questions: 24 mcq, 5 assertion-reason, 5 true-false, 4 fill-blank, 3 match, 2 ordering, 14 code-output (7 are error items: 4 compile-time, 3 run-time), 13 short (2 marks), 8 programs (15 marks, each read with Scanner and run with a sample input).
Competency: recall 11, understanding 22, application 33, analysis 12 (58% application or above). Difficulty: d1 10, d2 29, d3 28, d4 11.
Visuals: four own SVGs (ways of input tree, Scanner method table, error tree, ceil/floor/round number line); the rest are tables and flows.

## Tests

- Short: A = 6 mcq (import, char statement, default package, errors found by the compiler, round of a negative half, random formula) + 2 short (read statements; return types of Math calls); B = one of two programs (quadratic roots, student card).
- Long: A = 10 mcq + 3 short (next versus nextLine, syntax versus run-time error, compound-interest expression) + 2 code-output (division by zero, rounding methods); B = two of three programs (drone distance and midpoint, compound interest with rounding, ceil/floor/round table).
- Bank only: simple-interest table, right-triangle and cube-from-volume programs; the assertion-reason items.

## How verified

Every program compiled and run with JDK 21 at build time; results in `src/java-cache.json`. Every output, error message (javac or run-time), value, type and range shown anywhere comes from those runs, with typed input supplied for every program that reads it. Facts stated in narration in words are checked with `expect()` and stop the build when Java disagrees. Random-number claims are checked by drawing 50000 values: the smallest and largest value are reported, and no item asks for a particular random value. The build also runs the schema, pipeline lint (0 errors, 0 warnings), deterministic verify, narration rules, the answer-leak scan and the originality pre-check.

## Facts for a reviewer

1. The three ways of input are initialisation (value written in the program), parameters (value passed in a method call) and the Scanner class (value typed at run time). In BlueJ the actual parameter is typed in the dialog box of the call.
2. Actual parameter: the value or variable in the call; formal parameter: the variable in the method header that receives it.
3. Scanner is in `java.util`; `import java.util.Scanner;` and `import java.util.*;` both work; `Scanner sc = new Scanner(System.in);` creates the object.
4. Return types: nextInt int, nextLong long, nextFloat float, nextDouble double, next and nextLine String. There is no `nextChar()`; a char is read with `sc.next().charAt(0)`.
5. next() stops at white space (for Asha Rao it returns Asha); nextLine() returns the rest of the line.
6. After nextInt() the new-line stays in the input, so a following nextLine() returns an empty string (typed lines 40 and Riya Nair give the name as empty). One extra `sc.nextLine();` fixes it; using next() reads only the first word.
7. A whole number typed for nextDouble is accepted; 3.5 or letters typed for nextInt throw `java.util.InputMismatchException`; no input left throws `java.util.NoSuchElementException`.
8. `java.lang` (String, Math, System) is imported automatically; `java.util` is not. `import java.*;` does not import `java.util` classes (the star covers one package only); `import java.lang.Scanner;` fails because there is no such class. Exact javac messages come from the runs.
9. Syntax (compile-time) error: a rule of the language is broken, javac reports it and no bytecode is produced. Run-time error: an exception stops the running program (ArithmeticException for int division by zero, InputMismatchException). Logical error: the program runs but the result is wrong (`a + b + c / 3` for an average).
10. Comments are ignored by the compiler: `//` to the end of the line, `/* ... */` over several lines, `/** ... */` documentation comment (read by javadoc). An unclosed `/*` is a compile-time error.
11. Math methods are static (called as `Math.method(...)`, no object); Math is in `java.lang`.
12. pow, sqrt, cbrt, ceil, floor and random return double; `Math.round(double)` returns long (`Math.round(float)` returns int); abs keeps the type of its argument; max and min return the wider type of their arguments.
13. Rounding: ceil is the smallest whole number not below the value, floor the largest not above it. `Math.round` sends a value exactly half way towards positive infinity: round(2.5) is 3, round(-2.5) is -2, round(-4.5) is -4, round(-7.5) is -7. ceil(-2.3) is -2.0 and floor(-2.3) is -3.0.
14. `Math.sqrt(-4)` is NaN (no exception); `Math.cbrt(-27)` is -3.0; `Math.pow(2, 3)` shows 8.0.
15. `int r = Math.round(4.6);` does not compile (possible lossy conversion from long to int); `(int) Math.round(4.6)` does.
16. `Math.random()` is a double d with 0.0 <= d < 1.0. A random whole number from a to b is `(int) (Math.random() * (b - a + 1)) + a`. `(int) Math.random() * 6 + 1` is always 1 because the cast applies first. Items ask only about the range.
17. Formulae in Java: write every `*`, use Math.pow (the caret is the bitwise exclusive-or, `7 ^ 2` is 5), bracket numerators and denominators, avoid integer division (`4 / 3` is 1, so write `4.0 / 3`). The larger root for a = 2, b = -7, c = 3 is `(-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a)`, which is 3.0.
18. Programs round to two decimal places with `Math.round(x * 100) / 100.0`.
19. Unsure or notable: the wording "token" in the Scanner notes (a group of characters separated by white space) is the usual textbook sense; the Scanner default delimiter is white space, which includes the new-line. Output of doubles such as the compound-interest and cube programs is whatever `println` prints for that double; check that students are not asked to reproduce more digits than the sample shows.
