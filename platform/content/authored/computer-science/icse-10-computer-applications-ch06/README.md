# ICSE Class 10 Computer Applications, Chapter 6: Class as the Basis of all Computation

`icse-10-computer-applications-ch06` · release v1 · academic year 2026-27 · family `computer-science` · provenance `human` · every item `status: "draft"`

Build: `npx tsx content/authored/computer-science/icse-10-computer-applications-ch06/src/build.mjs` from `platform/`. Edit `src/`, not the JSON.

## Scope

All three syllabus topics (no removed topics):
- t01 objects encapsulate state and behaviour: data members (instance variables) and member methods; the anatomy of a class (data members against parameters against local variables, methods that read or change state, methods that return values); identifying members in a given class
- t02 class as an abstraction (attributes chosen for a purpose) and as an object factory; one class, many objects each with its own state; writing a class for a real-life entity and creating objects with `new`; the dot operator; objects passed to methods and returned from methods
- t03 primitive and composite (class) data types: declarations, what the variable holds (value or reference), fixed size against size that depends on members, default values (0, 0.0, false, null), copying with `=` (value copy and reference copy), `==` on objects, `NullPointerException`, a class as a user-defined type, `String` as a built-in composite type, objects as arguments and results

Overlap with chapter 1 (which revised objects and classes) is avoided: all classes and scenarios are new (metro smart card, turnstile, cricket scorer, seed packet, hostel room, bus pass, farm plot, shop, shelf, recipe, plant pot). Constructors (chapter 8), access specifiers and static (chapter 10) and wrapper classes (chapter 9) are not taught; values are given with `accept` or `set` methods. `Integer.BYTES` and its relatives appear only in build checks and in the slide table of primitive sizes (printed by Java).

## Contents

| File | What |
|---|---|
| `release.json` | 2 decks (20 and 22 slides; 15 and 17 with a visual, 5 own SVGs, the rest tables and flows; 4 and 3 worked examples; 4 checks each); 7 notes sections; 31 flashcards; 78 questions worth 210 marks |
| `tests.json` | short test (25 marks, 30 min) and long test (50 marks, 60 min), each following its blueprint; disjoint; no deck-check item |
| `src/q_util.mjs`, `q_a.mjs`, `q_b.mjs`, `q_c.mjs` | helpers and the question bank (t01 in q_a, t02 in q_b, t03 and the seven programs in q_c) |
| `src/build.mjs` | visuals, decks, notes, flashcards, tests |
| `src/java-cache.json` | results of every Java program run by the build (110 distinct programs) |

Questions: 28 mcq, 5 assertion-reason (verdicts: both true and explains x2, both true and not explains, A true R false, A false R true), 4 true-false, 3 fill-blank, 2 match, 2 ordering, 15 code-output (4 are error items: 3 compile-time, 1 run-time `NullPointerException`), 12 short (2 marks), 7 programs (15 marks).
Competency: recall 10, understanding 18, application 30, analysis 20 (application or above 64%). Difficulty: d1 6, d2 17, d3 37, d4 18.

Deck checks (not used in any test): `m_local_var`, `co_two_cards`, `m_objects_count`, `mt_oop_terms` (Part 1); `m_prim_list`, `m_default_values`, `co_alias`, `ar_ref_copy` (Part 2).

## Tests

- Short: A = 6 mcq (`m_members_count`, `m_instance_def`, `m_class_def`, `m_new_op`, `m_var_holds`, `m_copy_ref`) + 2 short (`s_local_instance`, `s_class_object`); B = one of two programs (`l_metro` metro card, `l_seed` seed packets).
- Long: A = 10 mcq + 3 short (`s_change_state`, `s_abstraction`, `s_copy`) + 2 code-output (`co_turnstile`, `co_pass`); B = two of three programs (`l_hostel` dormitory, `l_scorer` one over of cricket, `l_recipe` scaled recipe returning an object).
- Bank only: `l_buspass` (object passed to a method), `l_plant` (object returned from a method), the other mcq, all assertion-reason items and the deck-check items.

## How verified

Every program compiled and run with JDK 21 at build time; results in `src/java-cache.json`. Every output, error message (javac or java) and value shown anywhere comes from those runs, with typed input supplied to each Scanner program. Claims made in prose such as "this statement does not compile" are asserted with `mustFail`; facts stated in narration in words are checked with `expect()`. The build also runs the schema, pipeline lint (0 errors, 0 warnings), deterministic verify, narration rules, the answer-leak scan and the originality pre-check against every authored chapter.

## Facts for a reviewer

1. A class is a user-defined type and a blueprint; an object is an instance made with `new` and has its own copy of the data members (instance variables). Member methods give the behaviour.
2. Data member: declared in the class outside methods, lives with the object, gets a default value. Parameter: declared in the method heading. Local variable: declared in the body, created at each call, no default value (javac: "variable ... might not have been initialized"). Some ICSE texts group parameters with local variables; here they are named separately.
3. A `void` method returns nothing; storing its call in a variable is a compile error (JDK 21: "incompatible types: void cannot be converted to int").
4. `SeedPacket p;` declares a reference variable only; `new` creates the object. Objects in a program are counted by the executions of `new`.
5. Abstraction: only the attributes and actions that the program needs are modelled.
6. Primitive types hold the value, have a fixed size (byte 1, short 2, char 2, int 4, long 8, double 8 bytes, checked in the build) and defaults 0, 0.0, false for data members. Composite (class, reference) types hold a reference and default to `null`; the object size depends on the members. `String` is a library class.
7. `int y = x;` copies the value; `SeedPacket b = a;` copies the reference (an alias). `==` on two objects compares references (separate objects with equal contents give false).
8. A call through a `null` reference stops the program with `NullPointerException`. The shown message is the real JDK 21 helpful message, `Cannot invoke "SeedPacket.show()" because "this.packet" is null`; BlueJ or older JDKs may show only the exception name. The item uses a data member (`this.packet`) because the JDK prints local variable names as `<local1>` unless compiled with `-g`.
9. An object argument passes a copy of the reference, so the method can change the object; a primitive argument passes a copy of the value. A method can return a reference to an existing object or to a new one.
10. Programs read all input with one `Scanner` in `main` and pass the values to `accept` methods (a second Scanner on `System.in` inside a class would lose buffered input); they print no prompts.
11. Programs use imagined data: Ganga Metro cards, a farmers' cooperative, a school hostel, a school cricket over, a canteen recipe, a town bus service, a school garden club. `runRate` uses `runs * 6.0 / balls` so that the division is not an integer division.

Unsure of: whether ICSE examiners class parameters with local variables (fact 2); whether the helpful `NullPointerException` message detail is expected at this level (one item, one short answer, one slide); `l_scorer` uses a `for` loop (next chapter) only to read six balls, and `l_plant` uses a helper class `Garden`, both slightly beyond the three syllabus topics but within Class 9 knowledge.
