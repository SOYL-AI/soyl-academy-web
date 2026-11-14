# CBSE Class 11 English Core — Chapter 2: Grammar

| | |
|---|---|
| Unit | `cbse-11-english-core-ch02` (family `english-language`) |
| Syllabus | `platform/catalog/cbse/11/english-core/syllabus.yaml` (2026-27): t01 tenses and clauses in gap filling · t02 re-ordering and transformation of sentences. No removed topics. |
| School weight | Grammar 7 marks (exam_notes): gap filling with tenses and clauses; re-ordering and transformation. Class 11 has no board exam; this is the school annual examination pattern. |
| Files | `release.json` (2 decks: 18 + 18 slides; 7 notes sections; 31 flashcards; 73 questions with 20 passage children), `tests.json` (short 20 marks / 40 min; long 40 marks / 90 min), `src/` (builder; the shared library is `../cbse-11-english-core-ch01/src/lib.mjs`, unchanged) |
| Provenance | `origin: human`, `author: claude-opus-5-5 (subject-producer)` as set by the shared library, every item `status: draft`; drafted by a writer agent for Opus review |

Rebuild from `platform/`: `npx tsx content/authored/english-language/cbse-11-english-core-ch02/src/build.mjs`.

## Scope and shape

- **t01 Tenses and clauses in gap filling:** the twelve tense forms and clue words; present perfect versus simple past; tense sequence and consistency; three conditional patterns and wishes; noun, relative (defining and non-defining) and adverb clauses with their connectives; a five-move gap-filling routine.
- **t02 Re-ordering and transformation:** active to passive across tenses and modals (including the impersonal passive with verbs of saying); direct to reported speech (backshift, pronouns, time and place words, questions, commands); combining sentences with clauses; degrees of comparison; simple, compound and complex sentences; re-ordering jumbled word groups, including inversion openers.

**Deck part 1 (18 slides):** title (school pattern table) → twelve tense forms → clue table → check → example 1 (two past events) → perfect versus past (two-column) → sequence table → conditions table → three kinds of clause → relative pronouns → example 2 (defining or non-defining) → noun clauses → check → adverb clauses → example 3 (conditions and tenses) → check → summary → exam tips.

**Deck part 2 (18 slides):** title (transformation checklist) → passive table → five steps (flow) → check → example 1 (modal passive) → backshift table → time and place words → check → question, command and request patterns → example 2 (report a short dialogue) → combining table → check → degrees → simple, compound, complex → example 3 (re-order jumbled groups, flow) → inversion openers → summary → exam tips.

Every slide carries a visual (tables and flows). Narration: max 63 words, mean 51; no symbols or quote marks. No deck example repeats a bank item; each of the six check slides uses its own objective item (`dk_*`), which neither test uses.

**Examples are original** and drawn from school and community life (a ferry jetty, a library reading week, a cycling heritage ride, a flood-relief camp, a science fair, a relay race). No sentence is taken from NCERT, *Hornbill*, *Snapshots*, grammar books, sample papers or past papers.

## Question bank (73 items, 146 marks)

| Type | Count | Notes |
|---|---|---|
| case-based | 5 | 4 marks each, four 1-mark parts (20 children, all `soyl-original`): gap filling with options, error finding, gap filling with verbs, combining with clauses, reported speech |
| mcq | 27 | 6 are deck-check items; keys a/b/c/d = 7/6/7/7 |
| assertion-reason | 6 | keys a, c, d, b, a, c |
| true-false | 3 | |
| fill-blank | 6 | every correct alternative in `accepted` (for example *had been rehearsing / had rehearsed*, *whose*, *when / once / after / as soon as*) |
| match | 2 | |
| ordering | 3 | word groups shown shuffled; the stems say where a sentence begins or what it is about so that one order is correct |
| short, 2 marks | 9 | 25–50 words (a few at 20 or 10 words where the answer is one sentence) |
| short, 3 marks | 6 | 50–80 words |
| long, 5 marks | 6 | 80–120 words: tense paragraph, report a conversation, passive notice, join with clauses, mixed-error editing, discussion of tense and time |

- **Topics (parent tags):** t01 33 · t02 35 · both 5.
- **Difficulty:** d1 12 · d2 28 · d3 26 · d4 7.
- **Competency (after producer review):** recall 2 · understanding 38 · application 30 · analysis 2 · evaluation 1; application or higher **33 of 73 = 45.2%** of items. A one-rule routine (choosing *whose*, a conditional pattern, an *although* clause, a single passive) is understanding; two or more coordinated changes (reported speech with tense, pronoun and time word; passive with modal and perfect), editing mixed errors, and choosing between two possible forms on meaning are application or analysis. The share sits near the 45 to 50% line that other grammar chapters occupy; no tag was raised to reach 50%.
- **Marking:** transformation items give one mark per change the task needs; paragraph tasks give one mark per error corrected or pair joined, with consistent tenses.

## Chapter tests (`tests.json`)
Both follow `cbse-11-default-chapter-test-short` and `-long` item for item and share no item; neither contains a deck-check item.
- **Short (20 marks, 40 min):** A 3 mcq + 1 assertion-reason · B two 2-mark (passive with modal and perfect; report a future statement) + one 3-mark (report an exchange) · C choice of two 5-mark longs (attempt 1: tense paragraph or report a conversation) · D one 4-mark case set (gap filling with options).
- **Long (40 marks, 90 min):** A 8 mcq + 2 assertion-reason · B 2-mark, 2-mark, choice of two 2-mark, 3-mark, choice of two 3-mark · C a 5-mark passive notice + choice of two 5-mark longs (join with clauses; mixed-error editing) · D two 4-mark case sets (error finding in a diary extract; reported dialogue).

## Reviewer checklist (facts and keys to check)
1. Each MCQ has exactly one correct option; the closest distractors are `m_has_gone` (*has been to* is a different meaning), `m_two_gaps` (*had been reading ... went* only), `m_clause_meaning` (commas decide) and `m_ambiguity` (repeating the name).
2. Fill-blank alternatives: `fb_narrative` accepts *had rehearsed* and *was already filling*; `cs_flood` accepts *had fallen*, *had never seen*; `fb_perfect` accepts *has worked*. Reviewer to confirm none of these is too generous.
3. `ar_backshift_true` and `ar_now_then` rely on the notes' statements that facts still true need no backshift and that time words can stay on the same day; both are tagged understanding for that reason.
4. Non-defining *that* is treated as incorrect throughout (a prescriptive choice, standard for school grammar).
5. `s3_impersonal` and the notes treat *It is said that ...* and *The fort is said to be ...* as the two correct impersonal passives.
6. Word-limit overrides: `s2_whose`, `s2_simple_complex`, `s2_compound` use 20–50 and `s2_adverb_complete` uses 10–40 because their answers are a single sentence.
7. No sentence was copied from any source; the reviewer's originality gate should find no match.

## Known gaps
- The 2026-27 school grammar paper's exact mix of gap-fill and transformation tasks is not published; the bank covers both, and the tests use the class-default chapter-test blueprints.
- Tags the writer was least sure of: `m_clause_meaning` (now application, see below), `m_has_gone` and `s2_has_lost` (application; the notes state the present-perfect link), `s2_comma_meaning` (application), `l_tense_not_time` (evaluation; the notes mention that timetables use the present simple), and the parent of `cs_library` (application; two parts are understanding).

## Producer review (2026-11-14, Opus)
Drafted by a Sonnet content writer (D-050); every item re-answered blind by the Opus producer.
- `m_clause_meaning` retagged analysis to application: choosing the meaning that the commas signal applies the defining/non-defining rule the notes give.
- `cs_flood` part (d) no longer accepts *keeps up* (the bracket gives the verb *continue*).
- `s3_combine_four` now forbids only *but*: the model's relative clause joins two verbs with *and*, which the old stem forbade.
- `cs_library` stem: "the report below" (was "the notice report").
- Share stays 33 of 73 = 45.2% application or higher: grammar routines are honestly understanding, and the share sits inside the 45-65% band without raising any tag.
