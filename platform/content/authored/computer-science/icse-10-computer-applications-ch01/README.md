# ICSE Class 10 Computer Applications, Chapter 1: Revision: Object-Oriented Programming, Java, Objects and Classes

`icse-10-computer-applications-ch01` · release v1 · academic year 2026-27 · family `computer-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026) to the pattern of the CBSE 12 Computer Science chapters, with Java in place of Python. This folder also holds the shared library of the subject (`src/lib.mjs`), imported by every Computer Applications chapter.

**Building it.** Run `npx tsx content/authored/computer-science/icse-10-computer-applications-ch01/src/build.mjs` from `platform/`. Edit `src/`, not the JSON. The build runs every Java program shown anywhere in the chapter, validates the schema, runs the pipeline lint and the deterministic verify checks, checks the narration rules, the answer-leak scan and the editorial counts, and writes `release.json` and `tests.json`.

| File | What |
|---|---|
| `release.json` | 2 decks of 17 + 19 slides (27 visuals: 4 SVG, the rest tables and flows); 7 notes sections; 32 flashcards; 76 questions worth 205 marks |
| `tests.json` | `t_icse10computerapplications_ch01_short` (25 marks, 30 min) and `t_icse10computerapplications_ch01_long` (50 marks, 60 min), each following its subject blueprint item for item, including the internal-choice group in Section B. They share no question and use no deck-check item. |
| `src/` | `lib.mjs` (shared, with the Java runner), `h.mjs` (helpers), `programs.mjs` (Java programs), `visuals.mjs` (SVGs, tables, flows), `q_a.mjs`, `q_b.mjs`, `q_c.mjs` (questions), `build.mjs`, `java-cache.json` (Java results) |

## How outputs are produced

Every program output, compiler message and value shown in an item, slide, note or flashcard is obtained by compiling and running the Java code with JDK 21 at build time (`javaOut`, `javaErr`, `co` in `lib.mjs`). Every program was compiled and run with JDK 21 at build time; results are in `src/java-cache.json`.

- The seven 15-mark model answers are complete BlueJ-style programs, each run with its sample input.
- The three error items (`co` with `error: true`) show the real javac message and line number; the error tables and MCQ options use the same real messages.
- Options and traces that state values come from small programs; `expect()` stops the build if a value stated in the narration differs from what Java prints.

## Scope

All four syllabus topics are covered:
- **t01** procedure-oriented versus object-oriented programming (features, limitations, advantages, comparison, an imagined canteen example)
- **t02** the four principles of OOP with original analogies; method overloading as the example of polymorphism
- **t03** applets and applications (with the dated deprecation note), source code, bytecode, object code and the JVM, platform independence, features of Java, BlueJ in one line
- **t04** objects and classes: state and behaviour, class as blueprint and object factory, `new`, references, message passing

### Decks
- **Part 1:** approaches (t01) and principles (t02); worked examples: canteen in two styles, naming the principle in four situations.
- **Part 2:** Java and the compile/run chain (t03), objects and classes (t04); worked examples: a `Ticket` class with two objects, a `Phone` and `Battery` exchanging messages.

### Questions
76 items: 30 mcq, 4 assertion-reason (all four ICSE verdicts, one of each), 4 true-false, 3 fill-blank, 2 match, 2 ordering, 12 code-output (3 with a compile error), 12 short (2 marks), 7 long (15 marks programs: Student, Fan, ParkingTicket, LibraryCard, Bulb, Carton, Teacher). Difficulty d1 13, d2 30, d3 26, d4 7. Competency: recall 17, understanding 22, application 26, analysis 11 (49% application or above). Items per topic: t01 9, t02 16, t03 18, t04 26, t03+t04 7 (programs).

### Tests
- **Short** (blueprint `icse-10-computer-applications-chapter-test-short`): A = 6 mcq + 2 short; B = one of `l_student`, `l_fan`.
- **Long** (blueprint `icse-10-computer-applications-chapter-test-long`): A = 10 mcq + 3 short + 2 code-output; B = any two of `l_parking`, `l_card`, `l_bulb`.
- Bank only: `l_carton`, `l_teacher`, all assertion-reason items, and the deck-check items.

## Facts for a reviewer

1. Procedure-oriented programming: the program is a set of procedures (functions); data is usually shared and moves freely between functions; design is top-down.
2. Limitations of procedure-oriented programming: shared data is unprotected; a change in data may force changes in many functions; real-world entities are hard to model.
3. Object-oriented programming: the program is built from objects that combine data and methods; data is hidden; design is bottom-up.
4. Advantages of OOP: data hiding, reuse through inheritance, easier maintenance, closer modelling of the real world.
5. Data abstraction: showing only the essential features and hiding the details.
6. Encapsulation: binding data and methods into one unit (the class) and restricting access to the data.
7. Inheritance: a class acquires the properties of another class; the giver is the superclass (base, parent), the receiver the subclass (derived, child).
8. Polymorphism: one name, many forms; method overloading (same name, different parameter lists in one class) is the example used.
9. Applet: a Java program that ran inside a web browser. Dated note used in slides, notes, items and cards: the applet API was deprecated in Java 9 and marked for removal in Java 17, and applets no longer run in modern browsers (as of 2024). The syllabus still names applets.
10. Application: a stand-alone program that starts at its `main` method.
11. Source code (`.java`) is compiled by `javac` into bytecode (`.class`); bytecode is not tied to one processor.
12. The JVM loads bytecode and interprets it or compiles it just in time (JIT) to machine (object) code; this is why Java is platform independent (write once, run anywhere).
13. Features of Java used: object-oriented, platform independent, robust, secure, simple, multithreaded, automatic memory management (garbage collection). The one-line reasons given for robust (strong type checking, exception handling, garbage collection), secure (programs run inside the JVM, which checks bytecode) and simple (familiar syntax, no pointers, no manual memory release) are the commonly taught ones.
14. BlueJ: an IDE commonly used in ICSE schools (one line only).
15. Object: an instance of a class with state (data members) and behaviour (methods). Class: a blueprint or template, a user-defined data type, and an object factory (many objects from one class with `new`).
16. Each object created by its own `new` has its own copy of the data members; default values are 0, 0.0, false and null.
17. A variable of class type holds a reference; `Box y = x;` copies the reference, so one object has two names; `==` on two references compares the references, not the contents.
18. Message passing: one object calls a method of another object.
19. A parameter with the same name as a data member hides the member inside the method (used in the `Cup` item); `this` is not used in the chapter.
20. A method that is not static cannot be called with the class name (javac: `non-static method add() cannot be referenced from a static context`); a class-type variable must be given an object with `new` before use (javac: `variable f might not have been initialized`); a statement needs its semicolon (javac: `';' expected`).
21. ICSE conventions in the programs: BlueJ-style single class with data members and methods and `main`; `Scanner` for input; the input order is stated in each stem; no prompts are printed so the sample output is clean.
22. Program marking schemes follow the ICSE style (class and method structure, input, logic, output format, variable description or comments) and sum to 15.

Unsure of / for the reviewer to confirm: the exact "as of 2024" wording of the applet note is as briefed; whether the Class 10 syllabus expects `static` to be mentioned here (it appears only in the error explanation of calling a non-static method with the class name); the parking and electricity rates in the programs are imagined values.
