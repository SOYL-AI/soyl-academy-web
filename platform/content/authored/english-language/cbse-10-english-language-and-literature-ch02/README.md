# CBSE Class 10 English Language and Literature — Chapter 2: Grammar

| | |
|---|---|
| Unit | `cbse-10-english-language-and-literature-ch02` (family `english-language`) |
| Syllabus | `platform/catalog/cbse/10/english-language-and-literature/syllabus.yaml` (2026-27): t01 determiners · t02 tenses · t03 modals · t04 subject–verb concord · t05 reported speech (commands, requests, statements, questions) · t06 editing and omission. No removed topics. |
| Board weight | Section B grammar, 10 marks: 12 one-mark tasks, attempt any 10 (gap filling, editing, transformation) |
| Files | `release.json` (2 decks: 18 + 19 slides; 7 notes sections; 32 flashcards; 76 questions with 20 passage children), `tests.json` (short 20 marks / 40 min; long 40 marks / 90 min), `src/` (builder) |
| Provenance | `origin: human`, `author: claude-opus-5-5 (subject-producer)`, every item `status: draft` |

Rebuild from `platform/`: `npx tsx content/authored/english-language/cbse-10-english-language-and-literature-ch02/src/build.mjs`. The builder (`src/lib.mjs`, shared with ch03, ch04 and ch13) parses the release and tests with the shared schemas, runs the pipeline's stage-4 lint (`lintExemplar`) and stage-5 deterministic checks, checks narration length and symbols, model-answer word limits and fill-blank solutions, and balances MCQ keys by rotation.

## Scope and shape

**Deck part 1 (18 slides):** board task table → four-move routine (flow) → determiners (table) → *a / an / the* (two-column) → quantifiers (countable vs uncountable table) → worked example (notice) → check → tense grid → time-clue table → two tense pairs (two-column) → worked example (diary entry) → check → modal meanings (table) → worked example (choose by meaning) → 2 checks → summary (clue → choice table) → exam tips.

**Deck part 2 (19 slides):** overview → find the real subject → nine concord rules (table) → worked example (four corrections) → check → backshift table → time/place words table → four sentence types (table) → worked example (dialogue, four steps) → worked example (question-order trap) → check → six error families (table) → omission method (flow) → worked editing passage (table of answers) → worked omission passage (table) → 2 checks → summary (flow) → exam tips.

Grammar is procedural, so each topic ends in a procedure the student can run in the exam (clue → rule → answer; cover the *of*-phrase; type → verb + link → pronouns → tense → time words; six error families; word before + missing word + word after). Visuals are on 18 of 37 slides (tables and flows), although the text-family gate does not require the cadence. Narration: max 73 words, mean 56; no symbols.

**Examples are original** and drawn from Indian student life (Pongal in a housing society, an NCC trek near Lonavala, the Shatabdi timetable, a Kolkata Science City trip, a stationery shop, a WhatsApp class group, the Guru Nanak Jayanti holiday). No sentence is taken from NCERT, *Words and Expressions*, grammar books or board papers.

## Question bank (76 items, 110 marks)

| Type | Count | Notes |
|---|---|---|
| mcq | 20 | board-style gap filling with options; keys a/b/c/d = 5/5/5/5 |
| fill-blank | 14 | bracket choices or verb forms; every valid alternative in `accepted` (e.g. *leaves / is leaving / will leave*; *have not finished / haven't finished*) |
| short, 1 mark | 14 | editing ("error → correction", 0.5 + 0.5), omission (word before + missing + after), single-sentence reported speech |
| short, 2 marks | 7 | two-error rewrites, modal transformations, two-line dialogues |
| long, 5 marks | 2 | report a five-line conversation; edit a five-sentence paragraph |
| true-false | 5 | |
| assertion-reason | 5 | keys a, c, a, b, d |
| match | 3 | right column shuffled |
| ordering | 2 | word groups shown shuffled |
| case-based | 4 | own passages (`soyl-original`): editing (5 lines), gap filling with options (class WhatsApp message), omission (NCC trek), reported speech (library dialogue) |

- **Topics (parent tags):** every topic has 10–20 items; editing (t06) is cross-tagged with the grammar point it tests.
- **Difficulty:** d1 16 · d2 35 · d3 23 · d4 2. **Competency:** recall 4 · understanding 25 · application 25 · analysis 22 → **62% application or higher** (one-rule items such as *did not went* or *a / an* are labelled understanding; contextual gap filling, error detection and multi-change transformations are application/analysis).
- **Marking:** 1-mark editing and transformation items split 0.5 + 0.5 (wrong word / correction; link / changes). The board awards the mark as one; the split is for self-evaluation and is a SOYL choice.

## Chapter tests (`tests.json`)
- **Short (20 marks, 40 min):** A 10 of 12 one-mark tasks (6 fill-blank, 6 editing/transformation) · B editing passage (5) · C 5 MCQs.
- **Long (40 marks, 90 min):** A 10 of 12 one-mark tasks · B gap-filling and reported-speech passages (5 + 5) · C 5 of 6 two-mark transformations/edits · D 1 of 2 five-mark items · E 5 assertion-reason.
- The two tests share no questions. `blueprint_id` is null: the subject's chapter-test blueprints are built for literature chapters (extracts, 7- and 8-mark long answers); their notes say grammar chapters substitute same-mark grammar items, which is what these tests do, keeping the board's 10-of-12 one-mark format in section A.

## Pitfalls for generated grammar (seen in drafts or common in generated keys)
1. **Collective nouns** (*society, family, team*) as the subject of a concord error: British usage allows a plural verb, so the key is disputable. Use a plural noun hidden behind an *of*-phrase instead, or force the number with *its*.
2. **Omission lines with no omission**, or where the "missing" word is optional (*who trained* is already grammatical). Every omission line must be ungrammatical without the word.
3. **Two errors in a line** of an editing passage (one per line is the format).
4. **Two grammatical options** in a gap-fill MCQ (*few / a few*, *have / had* with no time anchor, *the* with a defining clause). Remove the second option or add an anchor.
5. **Valid alternatives missing from fill-blank keys** (*watched* beside *were watching*; *the day before* beside *the previous day*).
6. **Modals followed by *to*** and **state verbs in -ing** in model answers.
7. **Over-labelling competency:** almost every grammar item "applies a rule"; label one-rule recognition items as understanding so the bank's mix is honest.

## Verifier record (author pass, 2026-10-27)
Every item and passage part was re-answered from its stem alone, then compared with the key, solution and scheme.
- **Fixed:** case_edit line 1 used *our housing society* (collective; a plural verb is defensible) → now *the residents of our building celebrates*; case_omit line 3 had no omission and line 4's "missing" word was optional → lines rewritten (*one the cadets*, *bandaged quickly*); the 5-mark editing paragraph had two errors in one sentence → one per sentence; the WhatsApp gap fill (c) allowed *had* → a present anchor added (*so I can share tips today*); *watched* added as an accepted alternative to *were watching*; competency labels revised (84% → 62% application+) after the lint band warning.
- **Pipeline checks:** `verify --authored` 76/76 pass, 0 flags; `originality --authored` 0 errors, 0 warnings (no bank duplicates; reference texts not supplied); `content lint --exemplars` 0 errors, 0 warnings for this unit.

## Known gaps
- The grammar question's exact 2026-27 mix (how many gap-fill vs editing vs transformation items, which carry options) should be confirmed against the 2026-27 sample paper; the bank covers all three.
- Passive voice and clauses are not syllabus topics for this chapter and are not taught separately.
