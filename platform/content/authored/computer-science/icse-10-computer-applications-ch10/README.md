# ICSE Class 10 Computer Applications, Chapter 10: Encapsulation

`icse-10-computer-applications-ch10` · release v1 · academic year 2026-27 · family `computer-science` · provenance `human` · every item `status: "draft"`

Build: `npx tsx content/authored/computer-science/icse-10-computer-applications-ch10/src/build.mjs` from `platform/`. Edit `src/`, not the JSON.

## Scope

Both syllabus topics (no removed topics):
- t01 access specifiers `private`, default (no specifier), `protected` and `public`; the visibility table (class, package, subclass, world); private data with public getters and setters (validation in the setter) as the model of encapsulation; read-only data; private constructor; modifiers allowed on a top-level class
- t02 scope of variables: instance, static (class), argument and local variables; block scope; lifetime and default values; static counter shared by all objects; shadowing and `this`; the static context of `main`

Inheritance is not taught: the rule for subclasses appears only as a line of the visibility table. Because the runner compiles one file, every demonstration is between classes of one package (private refused; default, protected and public accepted); the subclass-in-another-package case is stated as a rule, never shown as a run.

## Contents

| File | What |
|---|---|
| `release.json` | 2 decks (21 and 22 slides; 16 and 17 with a visual, 3 own SVGs, the rest tables and flows; 3 and 4 worked examples; 4 checks each); 6 notes sections; 34 flashcards; 79 questions worth 194 marks |
| `tests.json` | short test (25 marks, 30 min) and long test (50 marks, 60 min), each following its blueprint; disjoint; no deck-check item |
| `src/q_util.mjs`, `snips.mjs`, `q_a.mjs`, `q_b.mjs`, `q_c.mjs` | helpers, shared Java snippets, the question bank (t01, t02, programs) |
| `src/build.mjs` | visuals, decks, notes, flashcards, tests |
| `src/java-cache.json` | results of every Java program run by the build (76 distinct programs) |

Questions: 30 mcq, 5 assertion-reason, 4 true-false, 3 fill-blank, 2 match, 2 ordering, 15 code-output (4 are error items, all compile-time), 12 short (2 marks), 6 programs (15 marks).
Competency: recall 8, understanding 22, application 31, analysis 18 (application or above 62%). Difficulty: d1 7, d2 23, d3 38, d4 11.
Topics: t01 38 items, t02 41 items. Narration: max 75 words, mean 55. Lint: 0 errors, 0 warnings.

## Tests

- Short: A = 6 mcq (`m_private_where`, `m_which_specifier`, `m_thermo_trace`, `m_static_def`, `m_tally_static`, `m_static_ctx`) + 2 short (`s_encap`, `s_static_inst`); B = one of two programs (`l_coop` piggy savings account, `l_token` token generator with a static next-number).
- Long: A = 10 mcq + 3 short (`s_setter`, `s_identify`, `s_default_protected`) + 2 code-output (`co_thermo`, `co_token`); B = two of three programs (`l_club` reading-club limit with a static member count, `l_temp` temperature log with validation, `l_fee` fee counters with a static school total).
- The rain-gauge program (`l_rain`) is bank-only. Deck check items (`mt_spec`, `m_private_err`, `ar_protected`, `ord_encap`, `m_token_next`, `tf_static_obj`, `co_tally`, `fb_scope`) are in no test.

## How verified

Every program compiled and run with JDK 21 at build time; results in `src/java-cache.json`. Every output, javac message and value shown anywhere comes from those runs (typed input supplied to each Scanner program). Prose claims ("this compiles", "this is refused") are asserted with `mustCompile`/`mustFail`; facts stated in narration are checked with `expect()`. The build also runs schema, pipeline lint, deterministic verify, narration rules, the answer-leak scan and the originality pre-check against every authored chapter. Second build: 0 programs compiled, files byte-identical.

## Facts for a reviewer

1. Visibility table: private = own class; default = own class + same package; protected = same package + subclasses (any package); public = everywhere. Only the same-package rows are demonstrated.
2. javac messages seen (JDK 21): "coins has private access in Gullak", "audit() has private access in Gullak", "Mint() has private access in Mint", "cannot find symbol" (missing setter; variable after its block), "modifier private|protected|static not allowed here" (top-level class), "variable x is already defined in method main(String[])", "variable n is already defined in method twice(int)", "variable total might not have been initialized", "non-static variable count cannot be referenced from a static context", "non-static method show() cannot be referenced from a static context".
3. Private access is class-wide: code inside `Stall` reads `other.sales` of another object (prints true).
4. A member with no specifier has default access; the word `default` is not written before a member.
5. Static variable: one copy, reachable as `TokenDesk.next` before any object exists (prints 1), and through a reference (same copy).
6. Locals have no default value; data members do (`0 0.0 false`). A parameter or local hides a data member of the same name; `this.name` reaches it.
7. Programs have `main` in the same class (BlueJ style) with private data and public methods; model answers print default `double` text (e.g. 750.0).
8. Imagined names only (Gullak, Thermo, Stall, Badge, Mint, Piggy, TokenDesk, Tally, Gauge, Cafe, CoopSaver, TokenCounter, ReadingClub, TempLog, FeeDesk, RainGauge).

Unsure of: whether the board expects the subclass rule of `protected` beyond one line (stated only); wording of the "top-level class" modifier facts (kept to what javac reports); that `static` before a top-level class is included as a distractor (javac does reject it).
