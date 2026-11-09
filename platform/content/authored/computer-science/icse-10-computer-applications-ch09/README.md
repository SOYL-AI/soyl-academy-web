# ICSE Class 10 Computer Applications, Chapter 9: Library Classes: Wrapper Classes

`icse-10-computer-applications-ch09` · release v1 · academic year 2026-27 · family `computer-science` · provenance `human` · every item `status: "draft"`

Build: `npx tsx content/authored/computer-science/icse-10-computer-applications-ch09/src/build.mjs` from `platform/`. Edit `src/`, not the JSON.

## Scope

All four syllabus topics (no removed topics):
- t01 primitive against composite types; a class as a user-defined type (a `Kite` object holds a String and an int); the eight wrapper classes in `java.lang`; why an object can call methods and an `int` cannot (`int cannot be dereferenced`); `valueOf` and the limit constants; the deprecated constructors (`new Integer(5)`) are mentioned as deprecated since Java 9 and never run
- t02 autoboxing and unboxing (assignment, arithmetic, comparison, `total = total + 5`, `total++`); a primitive is boxed only into the wrapper of its own type (`Double d = 5;` is a compile error); unboxing null gives `NullPointerException` (shown with a data member so that javac names `this.due`)
- t03 `parseInt`, `parseLong`, `parseFloat`, `parseDouble`: signs, leading zeros, `Double.parseDouble("3")` giving 3.0, `NumberFormatException` messages from real runs (decimal point, leading or trailing space, comma, letters, empty text), `+` joining Strings, `valueOf` against `parseInt` (return type), `Integer.toString`, compile-time errors with the parse methods
- t04 `isDigit`, `isLetter`, `isLetterOrDigit`, `isLowerCase`, `isUpperCase`, `isWhitespace`, `toLowerCase`, `toUpperCase`; `toUpperCase` returns a char and with `+ 1` the integer code appears; classifying characters of a String with `charAt` in a loop (only `length` and `charAt` of String are used; other String methods belong to Chapter 13)

Not used: wrapper `==` caching, `intValue()` style methods, `Character.getNumericValue`.

## Contents

| File | What |
|---|---|
| `release.json` | 2 decks (20 and 22 slides; 15 and 16 with a visual, 2 own SVGs, the rest tables and flows; 3 and 4 worked examples; 4 and 5 checks); 7 notes sections; 35 flashcards; 79 questions worth 210 marks |
| `tests.json` | short test (25 marks, 30 min) and long test (50 marks, 60 min), each following its blueprint; disjoint; no deck-check item |
| `src/q_util.mjs`, `q_a.mjs`, `q_b.mjs`, `q_c.mjs` | helpers and the question bank (t01 and t02; t03; t04 plus the programs) |
| `src/build.mjs` | visuals, decks, notes, flashcards, tests |
| `src/java-cache.json` | results of every Java program run by the build (211 distinct programs) |

Questions: 28 mcq, 5 assertion-reason, 4 true-false, 3 fill-blank, 3 match, 2 ordering, 15 code-output (4 are error items: 2 compile-time, 2 run-time), 12 short (2 marks), 7 programs (15 marks).
Competency: recall 15, understanding 14, application 36, analysis 14 (application or above 63%). Difficulty: d1 14, d2 18, d3 26, d4 19, d5 2.
Topics (items tagged): t01 14, t02 15, t03 28, t04 19; three items carry two topics (t01+t02, t02+t03, t03+t04).

## Tests

- Short: A = 6 mcq (`m_wrap_which_type`, `m_prim_vs_comp`, `m_unbox_arith`, `m_parse_which_fails`, `m_parse_concat`, `m_char_plus`) + 2 short (`s_box_unbox`, `s_parse_vs_valueof`); B = one of two programs (`l_keystrength` password checker, `l_grainlot` grain sacks from text).
- Long: A = 10 mcq + 3 short (`s_prim_comp`, `s_nfe`, `s_toupper_ret`) + 2 code-output (`co_unbox_mix`, `co_loop_count`); B = two of three programs (`l_caseswap`, `l_pincode`, `l_speedround`).
- The line-statistics program (`l_linestats`) and the toll-gate program with wrapper objects (`l_tollgate`) are bank-only.

## How verified

Every program compiled and run with JDK 21 at build time; results in `src/java-cache.json`. Every output, error message (javac or exception) and value shown anywhere comes from those runs, with typed input supplied to each Scanner program. Claims in prose are asserted with `mustCompile`, `mustFail` and `expect()`. The build also runs schema, pipeline lint (0 errors, 0 warnings), deterministic verify, narration rules, the answer-leak scan and the originality pre-check against every authored chapter. A second build compiles 0 programs and leaves the files byte-identical.

## Facts for a reviewer

1. Wrapper classes: Byte, Short, Integer, Long, Float, Double, Character, Boolean, all in `java.lang` (no import needed).
2. A primitive is boxed only into its own wrapper: `Double fee = 20;` gives "incompatible types: int cannot be converted to Double"; `Integer e = 5L;` gives "long cannot be converted to Integer".
3. Unboxing a null wrapper data member: `java.lang.NullPointerException: Cannot invoke "java.lang.Integer.intValue()" because "this.waiting" is null` (JDK 21 helpful message; a local variable would show `<local1>`, so data members are used).
4. `Integer.parseInt` rejects "12.5", " 42", "42 ", "1,250", "abc" and "" with `NumberFormatException: For input string: "..."`; it accepts "+7", "-15" and "007". `Double.parseDouble("3")` gives 3.0.
5. `new Integer(5)` is deprecated since Java 9: stated on a slide, a card and in the exam tips, never compiled.
6. `Character.toUpperCase('d') + 1` is the int 69; with a `(char)` cast it is E.
7. Numeric examples avoid 10-digit numbers starting with 6 to 9 because the pipeline lint treats them as phone numbers (the long examples use 4200000000 and 5432109876).
8. Programs use imagined contexts (Vidya Mitra password rating, a farmers' cooperative, a school noticeboard, Doot Post PIN codes, a quiz club, a railway enquiry screen, a toll gate).

Unsure of: the exact wording of the NullPointerException message on JDK versions other than 21; whether the board expects `valueOf` and `toString` at this depth (they are brief: one slide, one card, two items).
