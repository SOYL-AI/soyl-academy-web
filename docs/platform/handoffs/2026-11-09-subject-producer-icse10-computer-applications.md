# subject-producer — ICSE Class 10 Computer Applications (Java), hand-authored chapters — 2026-11-09

Status: done — all 13 syllabus chapters (ch01–ch13) written, reviewed, gated and committed

Branch: `platform/subject-producer/icse-10-computer-applications` (worktree `C:/Users/Prabhu/soyl-wt/content-icse10-computer-applications`, fast-forwarded to `platform/main` 54643166 before work). Not pushed, not merged.

## What changed
New chapters under `platform/content/authored/computer-science/icse-10-computer-applications-chNN/`, each with `release.json`, `tests.json`, `README.md` and a deterministic builder in `src/` (`build.mjs`, `q_*.mjs`, `java-cache.json`). The shared library is `icse-10-computer-applications-ch01/src/lib.mjs` (ICSE assertion-reason order by verdict, Java runner, the pipeline's lint/verify checks, answer-leak scan and originality pre-check inside every build).

| Chapter | Commit | Slides | Notes | Cards | Questions | Code-output | App+ | Drafted by |
|---|---|---|---|---|---|---|---|---|
| ch01 Revision: OOP, Java, Objects and Classes | 2a8cabec | 17 + 19 | 7 | 32 | 76 (205 marks) | 12 | 49% | earlier session (D-050), Opus-reviewed |
| ch02 Revision: Values, Data Types and Operators | 1f959348 | 22 + 22 | 6 | 34 | 77 (197 marks) | 16 | 60% | earlier session, Opus-reviewed |
| ch03 Revision: Input in Java and the Math library | 85b69853 | 20 + 22 | 6 | 32 | 78 (229 marks) | 14 | 58% | earlier session, Opus-reviewed |
| ch04 Revision: Conditional Constructs | 0e57040e | 20 + 21 | 6 | 31 | 75 (205 marks) | 15 | 59% | earlier session, Opus-reviewed |
| ch05 Revision: Iterative Constructs and Nested Loops | 52456b73 | 21 + 23 | 7 | 35 | 79 (210 marks) | 13 | 63% | Sonnet 5.5, Opus-reviewed |
| ch06 Class as the Basis of all Computation | c1bbda54 | 20 + 22 | 7 | 31 | 78 (210 marks) | 15 | 64% | Sonnet 5.5, Opus-reviewed |
| ch07 User-defined Methods | aeba718d | 21 + 21 | 7 | 35 | 80 (212 marks) | 15 | 61% | Sonnet 5.5, Opus-reviewed |
| ch08 Constructors | 7c93a5a4 | 19 + 21 | 7 | 34 | 79 (212 marks) | 16 | 63% | Sonnet 5.5, Opus-reviewed |
| ch09 Library Classes: Wrapper Classes | 439585da | 20 + 22 | 7 | 35 | 79 (210 marks) | 15 | 63% | Sonnet 5.5, Opus-reviewed |
| ch10 Encapsulation | 52e35d78 | 21 + 22 | 6 | 34 | 79 (194 marks) | 15 | 62% | Sonnet 5.5, Opus-reviewed |
| ch11 Single-dimensional Arrays: Searching and Sorting | 47e5ac78 | 20 + 22 | 6 | 35 | 80 (212 marks) | 15 | 61% | Sonnet 5.5 (stopped by the API stall), README and review by Opus |
| ch12 Double-dimensional Arrays | 569c45b0 | 20 + 22 | 6 | 33 | 79 (211 marks) | 15 | 62% | Sonnet 5.5, Opus-reviewed |
| ch13 String Handling | 4a1d5339 | 22 + 21 | 6 | 34 | 77 (208 marks) | 15 | 64% | Sonnet 5.5 (second writer finished a stalled draft), Opus-reviewed |

- Topics follow `catalog/cisce/icse-10/computer-applications/syllabus.yaml` (13 SOYL chapters: five revision chapters, then the seven Class X sections), with removed topics respected (no nested while/do-while, only rectangular and right-angled triangular patterns, pass by reference as definition plus one example, 1-D searching and sorting only).
- Tests: `t_icse10computerapplications_chNN_short` (25 marks, 30 min: 6 mcq + 2 short; one of two 15-mark programs) and `_long` (50 marks, 60 min: 10 mcq + 3 short + 2 code-output; two of three programs) on the subject's own blueprints; short and long are disjoint and use no deck-check item.
- Java: every program whose output, error or value appears anywhere is compiled and run with JDK 21 (`C:/Program Files/Eclipse Adoptium/jdk-21.0.13.9-hotspot`) in a fresh temp folder; results are cached in `src/java-cache.json` (committed). A build without a JDK uses the cache and fails if any code changed. Error items take the real javac/java message; Scanner programs get stdin from the build. ch01–ch04 were also rebuilt with `JAVA_RECHECK=1`: every cached result reproduced.
- Style: BlueJ-style classes, Scanner input, ICSE-style 15-mark marking schemes with variable descriptions; assertion-reason in the ICSE Class 10 order (A true R false, A false R true, both true explains, both true does not explain), as in ICSE 10 Physics and Chemistry.
- Review fixes (beyond the writers' own): MCQ solutions that referred to options by position (the lib reorders options) now name each option; items that repeated another item's exact program were replaced (ch01, ch06, ch08); a short's solution that contradicted its scheme (ch02); assertion-reason verdict balance (ch02); solutions that cited programs the student cannot see (ch03, ch04, ch07, ch09); a TF stem that contradicted itself (ch07); "False. False." in TF solutions and an ordering stem missing its data (ch08).

## How to verify
From `platform/` in the worktree (under `C:/Users/Prabhu/soyl-wt/_tools/heavy.sh`):
```
npm test -w @soyl/content-templates
npm run content -- lint --exemplars
npm run content -- verify --board cisce --class 10 --subject computer-applications --authored
npm run content -- originality --authored
npx vitest run --root db test/db6-split.test.ts
npx vitest run --root api test/content.test.ts
npx vitest run --root content-pipeline test/series.test.ts
```
Rebuild any chapter with `npx tsx content/authored/computer-science/icse-10-computer-applications-chNN/src/build.mjs`: it prints `0 program(s) compiled and run` and leaves the tree clean.

Gate runs:
- 2026-11-09 12:31–12:42 IST (ch01–ch04 final): content-templates 4691/4691; lint 0 errors; verify ch01–ch04 0 flags; originality 670 units 0 errors; db6-split 8/8; api content.test 13/13; series.test 41/41.
- 2026-11-09 19:02–19:28 IST (ch05–ch10, ch12 final): content-templates 4726/4726; lint 0 errors; verify ch01–ch10, ch12 all items pass, 0 flags; originality 675 units 0 errors; db6-split 8/8; api content.test 13/13; series.test 41/41. Byte-identical rebuilds confirmed afterwards for ch05–ch10 and ch12 before committing.
- 2026-11-09/10 20:00–22:36 IST (ch11, ch13 final; byte-identical rebuilds confirmed first): content-templates 4740/4740; lint 0 errors; verify ch01–ch13 all items pass, 0 flags (ch11 80/80, ch13 77/77); originality 677 units 0 errors; db6-split 8/8. In that run the api content.test seeding hook timed out at 900 s under machine load (13 tests skipped, not failed) and series.test exited 127, so both were rerun alone at 22:39–22:53 IST on the unchanged tree: api content.test 13/13, series.test 41/41.

## Tests added
None (content only).

## Known gaps / follow-ups
- Narration audio not generated (TTS stage).
- No official 2027 Class X specimen exists for this subject (the October 2026 circular lists it for Class IX only); style follows the 2026 paper format as recorded in the syllabus notes and blueprints (`source_status: unverified` on the chapter-test blueprints).

## Facts for a reviewer
1. All javac and exception texts are JDK 21 wording (e.g. `Index 5 out of bounds for length 5`, `non-static method total(int) cannot be referenced from a static context`, helpful NullPointerException text with `"this.packet"`); older JDKs or BlueJ may word them differently.
2. Pass by reference follows the ICSE wording (an object or array passed to a method); strictly, Java passes the reference by value. ch07 gives a definition and one example only (removed topic).
3. ch08 teaches `this` briefly and includes a copy constructor (one slide, one mcq, one code-output, one bank-only program).
4. ch01: the applet note is dated (deprecated in Java 9, marked for removal in Java 17; no longer runs in browsers).
5. ch05: Armstrong numbers use the power equal to the number of digits (cubes for three digits); one model program uses `while (true)` with `break` as a sentinel loop.
6. ch06: parameters are classified separately from local variables.
7. ch07: prototype = return type, name and parameters; signature = name and parameter types.
8. ch10: the visibility table states the subclass-in-another-package rule; only same-package access is demonstrated (one source file).
9. ch12: one item counts memory as elements x 4 bytes, ignoring array overhead.
10. ch13: ten simple prediction or error-naming items are tagged `understanding` rather than `application`; `==` on strings is shown only with strings built at run time.

## Decisions made
No ADRs. No shared files, schemas, catalog, templates, tests or marketing files were touched.

## Needs from owner
None.
