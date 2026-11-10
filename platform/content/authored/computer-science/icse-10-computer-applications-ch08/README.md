# ICSE Class 10 Computer Applications, Chapter 8: Constructors

`icse-10-computer-applications-ch08` · release v1 · academic year 2026-27 · family `computer-science` · provenance `human` · every item `status: "draft"`

Build: `npx tsx content/authored/computer-science/icse-10-computer-applications-ch08/src/build.mjs` from `platform/`. Edit `src/`, not the JSON.

## Scope

All four syllabus topics (no removed topics):
- t01 definition, characteristics and use of a constructor (class name, no return type not even `void`, executed by `new` once per object, initialises data members); declaration `Parcel p;` against creation; default values of data members; what `new` does step by step; `void` before the name makes an ordinary method (shown by a run); wrong name, `return` with a value, `static` constructor, calling `p.Parcel()` and leaving out `new` (real javac messages)
- t02 the default constructor supplied by the compiler only when the class has none (and the javac error when a class has only a parameterised constructor); parameterised constructors, the keyword `this` for data members hidden by parameters (and what happens without it), decisions and method calls inside a constructor
- t03 constructor overloading (number, types, order of parameters; names do not count); which constructor runs, with type promotion (`char`, `long`, `float` arguments); no suitable and ambiguous constructor errors; duplicate signature; order of constructor messages; a copy constructor taking an object (kept simple and optional)
- t04 differences between a constructor and a method (name, return type, execution, number of times, purpose, compiler-supplied), a run that shows the constructor once and the method twice, and why a constructor cannot be called like a method

Not taught: inheritance, `super`, `this(...)` calls between constructors, static members, private constructors.

## Contents

| File | What |
|---|---|
| `release.json` | 2 decks (19 and 21 slides; 14 and 16 with a visual, 2 own SVGs, the rest tables and flows; 2 and 4 worked examples; 4 checks each); 7 notes sections; 34 flashcards; 79 questions worth 212 marks |
| `tests.json` | short test (25 marks, 30 min) and long test (50 marks, 60 min), each following its blueprint; disjoint; no deck-check item |
| `src/q_util.mjs`, `snips.mjs`, `q_a.mjs`, `q_b.mjs`, `q_c.mjs` | helpers, the Java snippets shared by items and slides, and the question bank (t01; t02 and t03; t04 and the programs) |
| `src/build.mjs` | visuals, decks, notes, flashcards, tests |
| `src/java-cache.json` | results of every Java program run by the build (70 distinct programs) |

Questions: 28 mcq, 5 assertion-reason, 4 true-false, 3 fill-blank, 2 match, 2 ordering, 16 code-output (4 are error items, all compile-time), 12 short (2 marks), 7 programs (15 marks).
Competency: recall 10, understanding 19, application 32, analysis 18 (application or above 63%). Difficulty: d1 8, d2 24, d3 34, d4 13.
Topics (items tagged): t01 26, t02 25, t03 21, t04 7.

## Tests

- Short: A = 6 mcq (`m_ctor_header`, `m_compiler_default`, `m_param_trace`, `m_which_ctor`, `m_overload_valid`, `m_diff_return`) + 2 short (`s_default`, `s_diff`); B = one of two programs (`l_parcel` courier charge, `l_reservation` railway concession).
- Long: A = 10 mcq + 3 short (`s_void`, `s_this`, `s_which_ctor`) + 2 code-output (`co_overload_which`, `co_param_trace`); B = two of three programs (`l_recharge` three overloaded constructors, `l_courtyard` tiling cost, `l_cabride` cab fare with `double` and `int` overloads).
- The mason wage program (`l_mason`) and the cinema booking program with a copy constructor (`l_booking`) are bank-only.

## How verified

Every program compiled and run with JDK 21 at build time; results in `src/java-cache.json`. Every output, error message (javac) and value shown anywhere comes from those runs, with typed input supplied to each Scanner program. Claims made in prose, such as "this does not compile", are asserted by compiling the code (`mustFail`, `mustCompile`) and stop the build when Java disagrees. Facts stated in narration in words are checked with `expect()`. The build also runs the schema, pipeline lint (0 errors, 0 warnings), deterministic verify, narration rules, the answer-leak scan and the originality pre-check against every authored chapter. Two consecutive builds give byte-identical `release.json`, `tests.json` and `src/java-cache.json` (second run: 0 programs compiled and run).

## Facts for a reviewer

1. A constructor has the class name (case-sensitive), no return type (not even `void`), and is executed by `new` once per object. Declaring a reference does not run it (real run: `Declared / Parcel created / Created`).
2. `void Diya()` compiles but is an ordinary method; `new Diya()` does not call it (real run prints only `0` for the data member).
3. Data members get default values (0, 0.0, false, null) before the constructor body runs (a Dial constructor prints `start n = 0`).
4. The compiler supplies a default constructor only to a class with no constructor. With only `Parcel(int w)`, `new Parcel()` gives "constructor Parcel in class Parcel cannot be applied to given types;" (JDK 21 wording; only the first line of javac's message is shown).
5. Without `this`, `name = name;` assigns the parameter to itself and the data member stays `null` (and `0` for the int).
6. Overloaded constructors differ in number, types or order of parameters; a repeated signature gives "constructor Pack(int) is already defined in class Pack" (names do not count).
7. Type promotion in the slides and items: a `char` argument runs the `int` constructor (prints the code 65 for `'A'`), `long` and `float` arguments run the `double` constructor. No suitable constructor: "no suitable constructor found for Meter(boolean)"; ambiguous: "reference to Mix is ambiguous" for `Mix(int, double)` and `Mix(double, int)` called with two ints.
8. Constructor messages appear in the order of the `new` statements.
9. A constructor taking an object of its own class copies the data members; the copy is a separate object (real run `12 20 99.5`). Primitive data members only; copying of object members is not discussed.
10. `p.Parcel();` gives "cannot find symbol"; `return weight;` in a constructor gives "incompatible types: unexpected return value"; `static Parcel()` gives "modifier static not allowed here"; a constructor named differently gives "invalid method declaration; return type required".
11. Programs use imagined organisations and data (courier firm slabs of Rs 35 and Rs 55 per 500 g, mobile recharge with a Rs 10 processing fee, railway concession of 40% and 50%, society courtyard tiling, cab fare Rs 50 for 2 km then Rs 14 per km and Rs 2 per minute of waiting, mason wages with 1.5 times for days beyond 26, cinema group discount of 10% for 6 or more seats). Programs print the default `double` text (for example `Charge = Rs 165.0`).
12. Class names used here are new to the subject (Parcel, Recharge, Reservation, Courtyard, CabRide, Mason, Booking, Rickshaw, Sack, Member, Meter, Gate, Pack, Clock, Diya, Kiosk, Floor, Mix, Dial); none is used in ch01 to ch06.

Unsure of: whether the board expects the copy constructor at all at this level (one slide, one item, one code-output item and one bank-only program, all described as optional); whether examiners expect `this` in Class 10 constructors (it is taught briefly and used in the programs, with the alternative of different parameter names shown); the exact javac wording across JDK versions (facts 4, 6, 7, 10).
