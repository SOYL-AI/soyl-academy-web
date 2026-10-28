# CBSE Class 10 English Language and Literature — Chapter 31: The Book That Saved the Earth (Claire Boiko)

| | |
|---|---|
| Unit | `cbse-10-english-language-and-literature-ch31` (family `english-literature`) |
| Text | *Footprints without Feet* (NCERT supplementary reader), a play. **Students read the play in their textbook; nothing here reproduces it.** |
| Syllabus | `platform/catalog/cbse/10/english-language-and-literature/syllabus.yaml` (2026-27): t01 reading the play: context and summary · t02 themes and message · t03 characters and their development · t04 exam practice. No removed topics. |
| Board weight | Section C: Q9 short answers on *Footprints without Feet* (3 marks, 40–50 words, two of three) and one long answer (6 marks, 100–120 words) on character, theme or values. No extracts are set from this reader. |
| Files | `release.json` (1 deck of 24 slides; 8 notes sections; 30 flashcards; 63 questions with 25 passage children), `tests.json` (short 18 / 40 min; long 36 / 80 min, supplementary-reader blueprints), `src/` (`build.mjs`, `questions.mjs`; shared library `../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs`, unchanged; D-036 guard from `../cbse-10-english-language-and-literature-ch27/src/guard.mjs`) |
| Provenance | `origin: human`, `author: claude-opus-5-5 (subject-producer)`, every item `status: draft` |

Rebuild from `platform/`: `npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch31/src/build.mjs` (deterministic; the build ends with `NO ERRORS` and `GUARD: 0 of 10 guard phrases found`).

## Pattern decision (supplementary reader)
This chapter follows the decision used for ch23–ch30 (handoffs `2026-10-27-subject-producer-cbse10-english-f.md` and `-english-g.md`):
- **Supplementary-reader blueprints (updated 2026-10-28 by curriculum-architect).** Both tests follow `chapter-test-short-supplementary` / `chapter-test-long-supplementary` item for item (a catalog chapter override for ch23–ch31), so `blueprint_id` is set. These blueprints have no extract section. The five **SOYL commentary** items (`passage_origin: soyl-commentary`) on character, theme and values stay in the bank as comprehension practice; every stem says the board sets no extracts from this reader.
- **Bank weighted to the board's form:** 14 three-mark short answers, 9 six-mark long answers, 6 two-mark answers and only 5 commentary items. Five is the minimum that fills both tests without sharing a question. The objective items follow english-g: mcq 12, fill-blank 4, assertion-reason 4, true-false 4, ordering 2, match 3.
- **Students are told** how the reader is examined on the title slide, in notes section 8, in the exam tips and on a flashcard.
- The tests use only the board's forms for this reader (3-mark answers, two of three; 6-mark long answers), plus the 2-mark recall section in the long test. The title-slide table and notes section 8 no longer mention commentary passages in the tests.

## Originality (CONTEXT §8–§9, D-036)
- **No part of the play was written out from memory anywhere, including scratch.** Everything was authored in SOYL's own words at the level of events and ideas. Dialogue is reported, never quoted.
- **The nursery rhymes inside the play are described, never written out.** The content says *the rhyme about a cow and the moon* and *a picture of an egg-shaped figure*. Students are told to do the same.
- **The commentary passages are SOYL's analysis**, not summaries that follow the play line by line.
- **Guard list:** 10 short phrases (each at most four words), including the opening words of the rhymes and phrasings that might echo the play. None was found in `release.json`, `tests.json` or this README.
- The scratch folder `english-h` holds only helper scripts (a word-limit and key checker, and a string-replace helper). It contains no source text.

## Question bank (63 items, 168 marks)
| Type | Count | Notes |
|---|---|---|
| source-based (SOYL commentary) | 5 | the future frame; the landing; the wrong guesses; the nursery rhymes; Think-Tank and Noodle. Each has 5 parts: mcq, fill-blank, mcq, 1-mark short, mcq. |
| short, 3 marks (40–50 words) | 14 | models 42–49 words |
| short, 2 marks (30–40 words) | 6 | models 32–36 words |
| long, 6 marks (100–120 words) | 9 | character sketch, comparison, misunderstanding, title, humour and satire, values, books today; extrapolation: Noodle's diary, Captain Omega's report. Models 110–117 words. |
| mcq | 12 | keys a/b/c/d = 3/3/3/3 |
| fill-blank / assertion-reason / true-false | 4 / 4 / 4 | AR keys a, d, c, b |
| ordering / match | 2 / 3 | |

- **Difficulty:** d1 9 · d2 21 · d3 25 · d4 8. **Application or higher:** 51%.
- **Word limits:** every written model is strictly inside its limit. This was checked by script, not just by the builder's ±20% band.
- **D-032:** written items keep their worked answer in `answer.model_answer_md`, with a short method note in `solution_md`. No key sentence of 60+ characters appears in served content.
- **Stems are chapter-specific:** each names the play, its author or its characters.

## Chapter tests (`tests.json`)
- **Short (18 marks, 40 min):** A two sets of three 3-mark answers, two of each · B 1 of 2 long answers.
- **Long (36 marks, 80 min):** A 3 of 4 two-mark answers · B two sets of three 3-mark answers, two of each · C three long-answer pairs, one of each.
- The two tests share no question. Practice-only written items: `sa_misunderstanding`, `sa_crew`, `sb_listen`, `sb_lesson` and `la_books`, plus the five commentary items.

## Facts to confirm with the textbook (reviewer)
1. Claire Boiko is an American writer of plays for young people. No dates are given.
2. A historian from the distant future introduces the story, looking back several centuries. The content does not name the century or say whether the historian also closes the play.
3. Think-Tank is the leader of Mars, has an oversized head and boasts of his brain. He stays on Mars and directs the crew through a screen.
4. Noodle is Think-Tank's young assistant on Mars.
5. The advance crew is Captain Omega, Lieutenant Iota and Sergeant Oop. They land beside a public library in a small town.
6. **The order of the misreadings:** books first taken as food, then as devices to listen to (the crew hold them to their ears). It is **Noodle** who suggests that the marks inside are meant to be looked at. This order is used in `ord_events`, `mt_misreadings` and `src_guesses`; please check it.
7. The book is *Mother Goose*. The cow-and-moon rhyme is read as proof of advanced space travel. The picture of the egg-shaped figure (Humpty Dumpty) resembles Think-Tank, and its fall is read as a threat. Think-Tank then calls off the invasion.

**Left out** (not confirmable without the text): the town's name, any year the Historian gives, Think-Tank's full titles, whether any crew member actually tasted a book, who decodes the writing, where Think-Tank goes at the end, the number of scenes, and every line of the rhymes.

## Verifier record (author pass, 2026-10-27)
- Every objective item re-answered blind; every factual claim checked against the list above.
- Two details in the long models were removed because they could not be confirmed: a named crew member trying to eat a book, and reading a book aloud.
- MCQ keys rebalanced from 4/3/3/2 to 3/3/3/3 by fixing the last three keys.

## Catalog notes (reported, not edited)
- The t04 learning outcome for this chapter said *extract-based* questions; the catalog now reads "short-answer and long-answer responses" (curriculum-architect, 2026-10-27).
