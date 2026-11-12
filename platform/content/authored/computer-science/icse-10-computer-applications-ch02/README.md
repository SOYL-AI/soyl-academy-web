# ICSE Class 10 Computer Applications, Chapter 2: Revision: Values, Data Types and Operators

`icse-10-computer-applications-ch02` · release v1 · academic year 2026-27 · family `computer-science` · provenance `human` · every item `status: "draft"`

Build: `npx tsx content/authored/computer-science/icse-10-computer-applications-ch02/src/build.mjs` from `platform/`. Edit `src/`, not the JSON.

## Scope

All five syllabus topics (bitwise and shift operators are removed from the syllabus and not covered):
- t01 character set, ASCII, Unicode, escape sequences
- t02 tokens, identifiers, literals, constants and variables
- t03 primitive and non-primitive types, sizes, default values, implicit and explicit conversion, type promotion
- t04 unary, binary and ternary operators; arithmetic (including % with negatives), relational, logical (short-circuit), assignment and shorthand, increment and decrement, ternary
- t05 precedence and associativity, counters and accumulators, new and dot, print and println

## Contents

| File | What |
|---|---|
| `release.json` | 2 decks of 22 slides (17 visuals each, 4 checks, 3 worked examples); 6 notes sections; 34 flashcards; 77 questions worth 197 marks |
| `tests.json` | short test (25 marks, 30 min) and long test (50 marks, 60 min), each following its blueprint; disjoint; no deck-check item |
| `src/q_util.mjs`, `q_a.mjs`, `q_b.mjs`, `q_c.mjs` | helpers and the question bank (t01-t02, t03-t04, t05 and programs) |
| `src/build.mjs` | visuals, decks, notes, flashcards, tests |
| `src/java-cache.json` | results of every Java program run by the build (174 distinct programs) |

Questions: 27 mcq, 4 assertion-reason, 4 true-false, 3 fill-blank, 3 match, 2 ordering, 16 code-output (6 are error items: 5 compile-time, 1 run-time), 12 short (2 marks), 6 programs (15 marks).
Visuals: four own SVGs (tokens tree, primitive size chart, widening chain, precedence ladder); the rest are tables and flows.

## Tests

- Short: A = 6 mcq + 2 short (10 marks); B = one of two programs (temperature conversion, simple and compound interest).
- Long: A = 10 mcq + 3 short + 2 code-output (20 marks); B = two of three programs (bill with tax, lawn and pond, swap without a third variable).
- The digit-extraction program is bank-only.

## How verified

Every program compiled and run with JDK 21 at build time; results in `src/java-cache.json`. Every output, error message (javac or run-time), value and type shown anywhere comes from those runs. Validity of identifiers, constants, widening and narrowing statements is asserted by compiling them. Facts stated in narration in words are checked with `expect()` and stop the build when Java disagrees. The build also runs the schema, pipeline lint (0 errors, 0 warnings), deterministic verify, narration rules, the answer-leak scan and the originality pre-check against every authored chapter.

## Facts for a reviewer

1. The Java character set: letters, digits, special symbols and white space.
2. ASCII is a 7-bit code with 128 codes (0 to 127); 'A' is 65, 'a' is 97, '0' is 48 (run).
3. A Java char is a 16-bit Unicode value; the first 128 Unicode codes equal ASCII.
4. Escape sequences: backslash n (new line), backslash t (tab), double backslash, backslash quotation mark, backslash apostrophe. Tab width depends on the console, so items only ask that it is one character (the string with a tab has length 3).
5. Five token kinds: keywords, identifiers, literals, punctuators (separators), operators.
6. Identifier rules: letters, digits, underscore and the dollar sign; not starting with a digit; no space; not a keyword; case-sensitive. (The dollar sign is only named in prose, never written.)
7. Literals: integer (int), real (double), character (char), string (String), boolean, null; null has no type.
8. A constant is declared with `final`; a second assignment is a compile-time error.
9. Declaration gives type and name; initialisation gives the first value.
10. Primitive sizes in bits: byte 8, short 16, int 32, long 64, float 32, double 64, char 16 (read from `Byte.SIZE` and the like).
11. boolean: size not fixed by the Java specification; books commonly state 1 bit or 1 byte. Stated in slides and notes, never tested.
12. Default values of member variables: 0, 0.0, null character, false, null. Local variables have no default (compile error if unassigned).
13. Non-primitive types: classes, arrays, String.
14. Implicit (widening) chain byte, short, int, long, float, double, and char to int; narrowing needs a cast, and a cast to int truncates (`(int) 7.9` is 7).
15. Type promotion: byte, short and char operands become int; a double operand makes the result double. `byte c = a + b` is a compile error (int to byte).
16. `float f = 3.5;` fails because 3.5 is a double literal.
17. Integer division truncates; `%` takes the sign of the dividend and works on doubles; real division by zero gives Infinity or NaN; integer division by zero throws ArithmeticException.
18. `&&` and `||` short-circuit.
19. `a++ + ++a` with a = 5 gives 12 and leaves a as 7; `p = p++` leaves p unchanged.
20. `x =+ 1` is an assignment of the value +1, not a shorthand.
21. Precedence (highest first): brackets and dot; postfix; prefix, unary and cast; * / %; + -; relational; equality; &&; ||; ?:; assignment. Associativity: left to right for binary arithmetic, relational and logical operators; right to left for assignment, unary and the ternary operator (ternary goes beyond the syllabus wording "assignment and unary", and is not tested).
22. `new` creates an object and returns its reference; the dot operator accesses a member.
23. print stays on the line, println ends it; `+` works left to right (`1 + 2 + "x"` is 3x, `"x" + 1 + 2` is x12).
24. A counter changes by a fixed step to count; an accumulator keeps a running total. The tracing examples use a while loop, which Class IX covers.
25. Definitions in the notes: token, keyword, identifier, literal, punctuator, variable, constant, data type, type casting, implicit conversion, type promotion, operator, operand, short-circuit evaluation, ternary operator, operator precedence, associativity, counter, accumulator.
26. Build-time type checks use `getClass().getSimpleName()` of a boxed value; this is not shown to students.

Unsure of: whether ICSE books prefer "punctuator" or "separator" (both are given); whether the board expects postfix above prefix in a precedence table (this chapter shows it, as Java does); the use of `Character.SIZE`-style constants only in solutions, not taught.

Competency tags changed while writing, to match the definitions: m_classify, mt_tokens and m_valid_id from application to understanding; m_const_decl from application to recall. One code-output item (a backslash path) was replaced by an understanding multiple-choice item so that application-or-above is 60%.
