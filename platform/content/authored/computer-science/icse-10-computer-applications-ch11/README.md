# ICSE Class 10 Computer Applications, Chapter 11: Single-dimensional Arrays: Searching and Sorting

`icse-10-computer-applications-ch11` · release v1 · academic year 2026-27 · family `computer-science` · provenance `human` · every item `status: "draft"`

Build: `npx tsx content/authored/computer-science/icse-10-computer-applications-ch11/src/build.mjs` from `platform/`. Edit `src/`, not the JSON. The shared library is `../icse-10-computer-applications-ch01/src/lib.mjs`.

Drafted by a Sonnet 5.5 writer (D-050). The writer was stopped before it wrote this README; the subject-producer (Opus 5.5) reviewed every item, wrote the README, rebuilt and gated the chapter.

## Scope

All five syllabus topics, on single-dimensional arrays only (the removed topic, searching and sorting in double-dimensional arrays, is not used):
- t01 arrays as a composite type: declaration and creation (`int[] a = new int[n];`, initialiser lists), default element values, indexes 0 to length - 1, the `length` property (and the javac error for `length()`), `ArrayIndexOutOfBoundsException`, input with Scanner in a loop, sum, average (the integer-division trap), maximum and minimum (start from `a[0]`), counting, reversing, two names for one array, arrays passed to methods
- t02 linear search with a flag or position, counting comparisons, first and last occurrence, the worst case
- t03 binary search on a sorted array with low, high and mid (trace tables printed by an instrumented copy of the code), number of comparisons, descending order, why the array must be sorted (a run on an unsorted array that wrongly reports Not found), linear and binary search compared
- t04 selection sort (ascending and descending), the array after each pass, at most one swap per pass, number of passes
- t05 bubble sort (ascending and descending), the array after each pass, the inner limit n - 1 - i, swaps counted, the early-stop flag; selection and bubble sort compared; parallel arrays kept together while sorting

## Contents

| File | What |
|---|---|
| `release.json` | 2 decks (20 and 22 slides; 15 and 17 with a visual; 3 and 4 worked examples; 4 checks each); 6 notes sections; 35 flashcards; 80 questions worth 212 marks |
| `tests.json` | short test (25 marks, 30 min) and long test (50 marks, 60 min), each following its blueprint; disjoint; no deck-check item |
| `src/q_util.mjs`, `q_a.mjs`, `q_b.mjs`, `q_c.mjs`, `q_d.mjs` | helpers and the question bank (t01; t02 and t03; t04 and t05; the seven 15-mark programs) |
| `src/build.mjs` | visuals, decks, notes, flashcards, tests |
| `src/java-cache.json` | results of every Java program run by the build (155 distinct programs) |

Questions: 30 mcq, 5 assertion-reason, 3 true-false, 3 fill-blank, 3 match, 2 ordering, 15 code-output (4 are error items: 2 run-time, 2 compile-time), 12 short (2 marks), 7 programs (15 marks).
Competency: recall 10, understanding 21, application 31, analysis 18 (application or above 61%). Difficulty: d1 6, d2 16, d3 38, d4 19, d5 1.

## Tests

- Short: A = 6 mcq + 2 short; B = one of two programs (linear search for a train number; bubble sort of prices with an early stop).
- Long: A = 10 mcq + 3 short + 2 code-output (a binary search that fails; selection sort pass by pass); B = two of three programs (rainfall total, average, highest and lowest; binary search for a roll number; merit list by descending selection sort).
- Bank only: the fair-visitors program (reverse order, count above the average) and the sort-then-search program for a cycling club.

## Facts for a reviewer

1. Every output, compiler message and exception shown anywhere comes from compiling and running the code with JDK 21 (`runJava` in the ch01 lib); results are cached in `src/java-cache.json`. Pass-by-pass lines and binary-search traces are printed by instrumented copies of the code shown.
2. Exception and javac texts are JDK 21 wording, for example `java.lang.ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 5` and `array creation with both dimension expression and initialization is illegal`.
3. Binary search uses `mid = (low + high) / 2`; the halving count for 1000 elements (10) comes from a run and is quoted as the worst case.
4. "An array is passed by reference" follows the ICSE wording; strictly, Java passes the reference by value.
5. String arrays are only displayed here; sorting strings with `compareTo` belongs to Chapter 13.
