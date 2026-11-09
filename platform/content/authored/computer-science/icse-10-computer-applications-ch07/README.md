# ICSE Class 10 Computer Applications, Chapter 7: User-defined Methods

`icse-10-computer-applications-ch07` · release v1 · academic year 2026-27 · family `computer-science` · provenance `human` · every item `status: "draft"`

Build: `npx tsx content/authored/computer-science/icse-10-computer-applications-ch07/src/build.mjs` from `platform/`. Edit `src/`, not the JSON.

## Scope

All six syllabus topics. One topic is removed (programs using pass by reference): pass by reference has a definition and ONE illustrative example (an object whose data member a method changes); no programming question is built on it.
- t01 need for methods and modular programming; method header (access specifier, modifier, return type, name, parameter list); prototype against signature (return type is not part of the signature); defining and calling; `void` against value-returning methods; `return` ends a method; javac messages "unreachable statement", "missing return statement", "unexpected return value"
- t02 actual and formal parameters (matched by position and type; wrong count of arguments); `return` of int, double, boolean, char and String values; order of events in a call; methods calling methods
- t03 call by value with a swap that fails, a pay raise and a loop that changes the parameter; returning a result as the way to carry a change back; call by reference (definition and the object example only)
- t04 static and non-static methods; calls by name, `ClassName.method()` and `object.method()`; "non-static method ... cannot be referenced from a static context"; why `main` is static; a utility class of static methods called from a menu; a class with data members and member methods invoked through objects
- t05 pure against impure methods (no change of state against a changed data member or passed object), classification with reasons
- t06 method overloading (compile-time polymorphism): differ in number, type or order of parameters; return type alone is an error ("method area(int) is already defined in class Plots"); type promotion (`char` to `int`, `long` and `float` to `double`); ambiguous call ("reference to mix is ambiguous")

Overlap with chapter 6 (data members against locals, objects passed to methods, reference copies) and chapter 1 (overloading as the polymorphism example) is avoided: the scenarios here are new (dairy bill, notice board, age band, rickshaw fare, pay rise, parcel dispatch, tuition centre, tea stall, kiosk, notebook, packing volumes, group size, calendar, bus fare, quiz team). Constructors (chapter 8), `static` data members and access specifiers in depth (chapter 10) and arrays are not used.

## Contents

| File | What |
|---|---|
| `release.json` | 2 decks (21 and 21 slides; 16 and 16 with a visual, 3 own SVGs, the rest tables and flows; 4 and 4 worked examples; 4 checks each); 7 notes sections; 35 flashcards; 80 questions worth 212 marks |
| `tests.json` | short test (25 marks, 30 min) and long test (50 marks, 60 min), each following its blueprint; disjoint; no deck-check item |
| `src/q_util.mjs`, `progs.mjs`, `q_a.mjs`, `q_b.mjs`, `q_c.mjs`, `q_d.mjs` | helpers (including the `J` template for flush-left Java), shared programs, and the question bank (t01 and t02 in q_a, t03 and t04 in q_b, t05 and t06 in q_c, the 15-mark programs in q_d) |
| `src/build.mjs` | visuals, decks, notes, flashcards, tests |
| `src/java-cache.json` | results of every Java program run by the build (80 distinct programs) |

Questions: 29 mcq, 5 assertion-reason (verdicts: both true and explains x2, both true and not explains, A true R false, A false R true), 4 true-false, 3 fill-blank, 3 match, 2 ordering, 15 code-output (4 are error items, all compile-time), 12 short (2 marks), 7 programs (15 marks).
Competency: recall 13, understanding 18, application 33, analysis 16 (application or above 61%). Difficulty: d1 10, d2 16, d3 32, d4 21, d5 1.

Deck checks (not used in any test): `mt_header`, `m_signature`, `ord_call_flow`, `co_swap` (Part 1); `m_static_call`, `ar_pure_same`, `co_promo`, `mt_overload_call` (Part 2).

## Tests

- Short: A = 6 mcq (`m_proto`, `m_return_early`, `m_swap_main`, `m_obj_call`, `m_classify`, `m_which_version`) + 2 short (`s_actual_vs_formal`, `s_static_vs_non`); B = one of two programs (number menu with static methods, tea stall class).
- Long: A = 10 mcq + 3 short (`s_pure_impure`, `s_overload_def`, `s_pbv_vs_pbr`) + 2 code-output (`co_shrink`, `co_tea`); B = two of three programs (overloaded volume methods, gcd with call by value, calendar with pure methods).
- The overloaded bus-fare program and the quiz-team (methods calling methods) program are bank-only.

## How verified

Every program compiled and run with JDK 21 at build time; results in `src/java-cache.json`. Every output, error message (javac) and value shown anywhere comes from those runs, with typed input supplied to each Scanner program. Claims made in prose, such as "this call compiles" or "this is rejected", are asserted by compiling the code (`mustCompile`, `mustFail`) and stop the build when Java disagrees. Facts stated in narration in words are checked with `expect()`. The build also runs the schema, pipeline lint (0 errors, 0 warnings), deterministic verify, narration rules, the answer-leak scan and the originality pre-check against every authored chapter; it ends with NO ERRORS and no warnings. The second build prints `0 program(s) compiled and run` and leaves `release.json`, `tests.json` and `src/java-cache.json` byte-identical.

## Facts for a reviewer

1. Method header parts as ICSE names them: `public` is the access specifier, `static` is a modifier, then return type, name and parameter list. The prototype is return type + name + parameter list with types (`double milkBill(int litres, double rate)`); the signature is the name and the parameter types in order (`milkBill(int, double)`). The return type and the parameter names are not part of the signature.
2. `void` methods are called as statements; `return;` with no value is allowed in a void method (checked by compiling). `return 5;` in a void method gives "incompatible types: unexpected return value". Using the result of a void method gives "incompatible types: void cannot be converted to int".
3. `return` ends the method; a statement directly after it is "unreachable statement"; a value-returning method with a path that ends without a return gives "missing return statement"; `int h = half(7);` with a double-returning `half` gives "incompatible types: possible lossy conversion from double to int"; `fare(7)` for `fare(int, int)` gives "method fare in class FareCalc cannot be applied to given types;".
4. Formal parameters are in the header and actual parameters in the call; values are copied by position.
5. Primitive arguments are passed by value (swap program: In swap: 20 10, In main: 10 20; pay raise: Inside 8500, Outside 8000). A change is carried back with `return`.
6. Pass by reference follows the ICSE usage (an object passed to a method behaves as call by reference: the reference is passed, so a change to a data member is seen by the caller; the Parcel example prints 1700). Strictly, Java passes the reference by value; the chapter says "the reference is passed" and goes no further because the syllabus asks for the definition and one example only.
7. A static method belongs to the class: called by name in its class or as `ClassName.method()`; it may also be called through an object, which compiles (checked) but is not shown as good practice. A non-static method needs an object. In static `main`, `total(3)` gives "non-static method total(int) cannot be referenced from a static context"; a data member used inside a static method gives "non-static variable fee cannot be referenced from a static context". A non-static method can call other non-static and static methods by name (checked).
8. Pure method: returns a result without changing the state of the object or its arguments; the same arguments give the same result. Impure: changes a data member or the object passed in. Classification items use unambiguous cases (compute from arguments only against change a data member or passed object). The borderline cases (a method that only prints, a method that only reads a data member and returns it) are not asked; the notes mention that many teachers also call a printing method impure.
9. Overloading: same name, different number, type or order of parameters; compile-time (static) polymorphism. Same signature with a different return type or parameter name gives "method area(int) is already defined in class Plots". Resolution: exact match first, then the nearest widening: `show('A')` runs the int version and prints 65; `show(7L)` and `show(2.5f)` run the double version. `mix(2, 3)` with `mix(int, double)` and `mix(double, int)` gives "reference to mix is ambiguous"; `mix(2, 3.0)` runs the first.
10. Definitions in the notes: method, modular programming, prototype, signature, void, return statement, formal parameter, actual parameter, pass by value, pass by reference, static method, non-static method, member method, pure method, impure method, method overloading, polymorphism.
11. Programs use imagined organisations and data (Gyan Vihar Public School maths club, a railway-station chai stall at Rs 12.5 per cup, SwiftPack with pi as 3.14, a hill-town bus depot at Rs 2 per km with coach A at 1.5 times, a school diary printer, a class teacher's quiz team). Programs print `double` values in Java's default text (for example 314.0, 562.5, 120.0).

Unsure of: whether the board expects the prototype to include the access specifier and `static` (some books call the whole first line the prototype; this chapter follows the common form with the return type, name and parameter list only, and says so in the slide, items and cards); the exact wording of javac messages across JDK versions (JDK 21 text is quoted); whether examiners treat a method that only prints as pure or impure (avoided in the items); the pass-by-reference wording (fact 6).
