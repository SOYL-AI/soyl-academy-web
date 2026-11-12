# ICSE Class 10 Computer Applications, Chapter 13: String Handling

`icse-10-computer-applications-ch13` · release v1 · academic year 2026-27 · family `computer-science` · provenance `human` · every item `status: "draft"`

Build: `npx tsx content/authored/computer-science/icse-10-computer-applications-ch13/src/build.mjs` from `platform/`. Edit `src/`, not the JSON.

## Scope

All five syllabus topics (no removed topics):
- t01 the String class; `length`, `charAt`, `indexOf`, `lastIndexOf` (char and String forms, `indexOf(ch, from)`, -1 when absent), `trim`, `toLowerCase`, `toUpperCase`, `concat`; traversal with `length` and `charAt`; immutability; `StringIndexOutOfBoundsException`
- t02 `equals`, `equalsIgnoreCase`, `compareTo`, `compareToIgnoreCase`, `startsWith`, `endsWith`; `compareTo` as a difference of character codes or of lengths; `equals` versus `compareTo` versus `==` (only "`==` compares references", with Strings built at run time)
- t03 `substring` (both forms, end index exclusive), `replace` (char and String forms), `valueOf` for int, double, char and boolean
- t04 programs that build a new String character by character: reverse, palindrome, pig Latin (rule stated exactly), counting words, vowels and capitals, changing case, initials
- t05 String arrays: bubble sort and selection sort in alphabetical order with `compareTo`, linear search for a String

## Contents

| File | What |
|---|---|
| `release.json` | 2 decks (22 and 21 slides; 17 and 16 with a visual; 3 and 4 worked examples; 4 checks each); 6 notes sections; 34 flashcards; 77 questions worth 208 marks |
| `tests.json` | short test (25 marks, 30 min) and long test (50 marks, 60 min), each following its blueprint; disjoint; no deck-check item |
| `src/q_util.mjs`, `q_a.mjs`, `q_b.mjs`, `q_c.mjs` | helpers and the question bank (t01 and t02 in q_a, t03 and t04 in q_b, t05 and the programs in q_c) |
| `src/build.mjs` | visuals, decks, notes, flashcards, tests |
| `src/java-cache.json` | results of every Java program run by the build (226 distinct programs) |

Questions: 28 mcq, 5 assertion-reason, 3 true-false, 3 fill-blank, 2 match, 2 ordering, 15 code-output (4 are error items: 2 compile-time, 2 run-time), 12 short (2 marks), 7 programs (15 marks).
Competency: recall 7, understanding 21, application 41, analysis 8 (application or above 64%). Difficulty: d1 3, d2 17, d3 44, d4 13. Topics: t01 20, t02 16, t03 16, t04 12, t05 13.

## Tests

- Short: A = 6 mcq (`m_len_space`, `m_idx_sum`, `m_cmp_value`, `m_sub_range`, `m_pal_cond`, `m_sort_cmp`) + 2 short (`s_immutable`, `s_eq_vs`); B = one of two programs (palindrome, pig Latin).
- Long: A = 10 mcq (`m_char_at`, `m_trim_concat`, `m_exc`, `m_equals_def`, `m_prefix_cmp`, `m_ref`, `m_sub_from`, `m_replace`, `m_valueof_digits`, `m_pig_frag`) + 3 short (`s_cmp_pred`, `s_sel_pass`, `s_count_vowels`) + 2 code-output (`co_sub`, `co_sort`); B = two of three programs (counting words, vowels and capitals; bubble sort; linear search).
- The selection sort and name-initials programs are bank-only.

## How verified

Every program compiled and run with JDK 21 at build time; results in `src/java-cache.json`. Every output, exception text, compiler message and value shown anywhere comes from those runs, with typed input supplied to each Scanner program. Facts stated in narration in words are checked with `expect()` and stop the build when Java disagrees. The build also runs the schema, pipeline lint (0 errors, 0 warnings), deterministic verify, narration rules, the answer-leak scan and the originality pre-check against every authored chapter. Two consecutive builds give byte-identical output (the second compiles 0 programs).

## Facts for a reviewer

1. A String is an object of `java.lang.String`; indexes run from 0 to `length() - 1`; `length()` has brackets (`s.length` is an error, unlike the array field).
2. `indexOf` and `lastIndexOf` accept a char or a String and return -1 when absent; `indexOf(ch, from)` starts the search at `from`.
3. Strings are immutable: `s.toUpperCase();` on its own leaves `s` unchanged; the new String must be stored.
4. `charAt` with an index equal to the length throws `StringIndexOutOfBoundsException`; the message text in the items is the JDK 21 text taken from the run (for example "Index 7 out of bounds for length 7"); `substring(6, 3)` gives "Range [6, 3) out of bounds for length 11" style text, again from the run. Older JDKs word these differently.
5. `compareTo` returns the difference of the first differing character codes, or the length difference when one String is a prefix of the other (`"Delhi".compareTo("Delhi Cantt")` is -6). Its type is int; assigning it to boolean is a compile error.
6. `equals` is case-sensitive; `equalsIgnoreCase` is not. `==` is only described as comparing references; the item that uses `==` builds both Strings at run time with `concat` and the result (false) is taken from the run.
7. `substring(begin)` runs to the end; `substring(begin, end)` stops before `end`. `replace` changes every match and returns a new String. `String.valueOf` converts int, double, char and boolean to a String.
8. Pig Latin rule used in the stems: the letters before the first vowel (A, E, I, O, U) move to the end and AY is added; a word that starts with a vowel only gets AY. Words are processed in capital letters.
9. Sorting uses `a.compareTo(b) > 0` (not `>` on Strings, which is a compile error shown in an error item); linear search uses `equals` and reports -1 or "not found".
10. Programs use imagined contexts (name-plate painter, school word-game club, school magazine editor, science fair, hobby club, library desk). Scanner programs print short messages and do not prompt.

Unsure of: whether the board expects `compareToIgnoreCase` and `lastIndexOf` with a String argument in code-output items (both are in the syllabus line and covered in notes and a few items); exact JDK wording of the exception messages for versions other than 21.

## Changes made when finishing the chapter (an earlier writer was cut off)

- Kept the earlier draft's structure, decks, notes, flashcards and the whole question bank.
- Five mcq stems whose prose duplicated another stem were reworded (`m_idx_from`, `m_startswith`, `m_sub_from`, `m_sub_range`, `m_replace`) and `m_toggle`'s stem was made specific.
- Answer-leak fixes: the pig Latin vowel test now uses `"AEIOU".indexOf(c) != -1`, the selection sort pass prints with `String.join(" ", n)`, and the palindrome slide shows the program without its comment line.
- Competency band: the earlier tags gave 77% application or above; ten simple prediction, matching and error-naming items were re-tagged understanding (bank now 64%).
- Wrote this README.
