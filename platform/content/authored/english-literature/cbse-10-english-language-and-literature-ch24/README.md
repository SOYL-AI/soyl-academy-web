# CBSE Class 10 English Language and Literature — Chapter 24: The Thief's Story

| | |
|---|---|
| Unit | `cbse-10-english-language-and-literature-ch24` (family `english-literature`) |
| Book | NCERT *Footprints without Feet* (supplementary reader), short story · first-person narration by the thief, by Ruskin Bond (in copyright) |
| Syllabus | `platform/catalog/cbse/10/english-language-and-literature/syllabus.yaml` (2026-27): t01 context and summary · t02 themes (how trust and education change the thief) · t03 characters (Hari Singh's inner conflict and Anil's trusting nature) · t04 exam practice. No removed topics. |
| Board weight | Section C, Footprints: Q9 short answers (3 marks, 40–50 words, two of three) and the Footprints long answer (6 marks, 100–120 words). No extracts are set from this reader. |
| Files | `release.json` (1 deck of 23 slides; 8 notes sections; 30 flashcards; 65 questions with 25 passage children), `tests.json` (short 20 / 40 min; long 40 / 90 min), `src/` (builder and question bank; shared library `../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs`, unchanged; reproduction guard `../../cbse-10-english-language-and-literature-ch23/src/guard.mjs`) |
| Provenance | `origin: human`, `author: claude-opus-5-5 (subject-producer)`, every item `status: draft` |

Rebuild from `platform/`: `npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch24/src/build.mjs`.

## Pattern decision: how a supplementary-reader chapter is assessed

The 2026-27 board paper (`blueprints/board.yaml`, Section C) examines *Footprints without Feet* only through **Q9** (3-mark short answers, 40–50 words, two of three) and **one 6-mark long answer** (100–120 words), on character, theme and values. Reference-to-context extracts come from *First Flight* only.

The chapter-test blueprints are generic, with Section A extract slots. This chapter **keeps those slots item for item** (so `blueprint_id` is set) and **weights the bank towards the supplementary-reader pattern**:

| Type | First Flight prose chapters (ch09–ch12) | This chapter |
|---|---|---|
| Source-based (5 marks, SOYL commentary) | 7 | **5**: the minimum that fills both tests without sharing a question |
| Short, 3 marks (Q9 pattern) | 12 | **14** |
| Short, 2 marks | 6 | 6 |
| Long, 6 marks | 7 | **9** (trust and education, Anil's sketch, Hari's change, Anil's diary, Hari's letter years later, values, a reporting debate, the ending, an assembly speech) |

The commentary items are labelled in every stem as comprehension checks, with a note that the board sets no extracts from this reader. Their parts test inference about character, theme and values. The title slide, notes section 8, the exam tips and the flashcards say how the reader is actually examined. Same decision as ch23 (and as english-g for ch27–ch30).

## The literature rule: taught without reproducing the text (CONTEXT §8–§9, D-036)

- **Summaries in SOYL's words**, in six stages (a thief finds a target → food, cooking and lessons → money under the mattress → the theft and the station → thinking in the rain → a damp note and a smile). Bond's sentences, his narrator's self-descriptions and his images are not used.
- **Dialogue is reported, never quoted.** Anil's offer, his promise of regular pay and his announcement of the next lesson appear only as reported speech.
- **Hari's reflections at the station are described as two ideas** (Anil's sadness at broken trust; the future that education offers). The story's own list of how different victims react to theft is not reproduced.
- **Commentary items:** all 5 `source-based` items have `passage_origin: "soyl-commentary"`, are labelled as SOYL commentary and point to *Footprints without Feet*.
- **Devices with SOYL's own sentences** (a tube of glue, a captain's armband, a bookmark), never Bond's.
- **Word meanings** are single words, labelled "key words for this story".
- **NCERT exercise questions are not reused.** Classic questions are reframed (for example, *why did Hari return the money* is asked as the inner conflict, or as *which mattered more, trust or education*).
- **Reproduction guard (D-036):** `src/build.mjs` passes 18 short distinctive phrases (each at most 4 words) to the shared chapter guard. During drafting the guard list led to three wording changes (*full sentences*, *educated person*, *damp from the rain*). The final build reports none found. No part of the story was written out from memory anywhere.

### Reviewer checklist (english-literature)
- [ ] **No reproduction (critical):** no sentence, sentence frame or distinctive phrase of the story in any field. Pay special attention to the narrator's opening self-description, Anil's money habits, the reflections at the station and the final morning.
- [ ] Facts (see "Facts to confirm" below).
- [ ] Re-answer every item blind; keys right; no second defensible option.
- [ ] Model answers within word limits (3-mark 40–50, 2-mark 30–40, 6-mark 100–120).
- [ ] Textbook pointer present on the title slide, notes and passage stems.

### Facts to confirm against the textbook
Stated in the content (believed correct; please confirm):
- Ruskin Bond, born 1934; the story is narrated in the first person by the thief.
- The thief changes names as it suits him and is calling himself Hari Singh.
- He meets Anil, a young writer, at a wrestling match, flatters him and asks for work.
- Anil cannot pay wages and offers food if Hari cooks; Hari falsely says he can cook.
- The first meal is given to a stray dog; Anil teaches Hari to cook and to write his name, and promises sentences and sums.
- Hari keeps a little of the shopping money for himself.
- Anil writes for magazines and is paid irregularly.
- Anil sells a book and puts the money under his mattress; Hari takes it at night and goes to the station for a train to Lucknow, but does not board.
- In the rain he thinks of Anil's sadness at broken trust and of the value of education, and returns the damp notes.
- Next morning Anil has made tea, gives Hari a fifty-rupee note that is still damp, says he will be paid regularly, and says they will start writing sentences; Hari smiles; the theft is never mentioned.

Deliberately **left out** because they cannot be confirmed without the text: the ages of Hari and Anil, the sum stolen, how much Hari kept from the shopping, the train's name and time, where Hari sheltered from the rain, and the name of the town.

## Shape
**Deck (23 slides):** title (board-pattern table) → how to use → author and text (table) → six stages (flow) → summary in five slides with an ordering check after the second → theme 1: trust and education (two-column) → theme web (table) → check (a teacher and copied homework) → character: Hari's change (before/after table) → Hari's inner conflict (two-column, t03) → character: Anil (trait/evidence table) → check (assertion-reason) → narration and the ending → SOYL's own examples of a telling detail → word meanings (table) → worked example: planning a 6-mark answer (flow) → summary → exam tips. Narration max 63 words, mean 55; no numerals. Visuals on 9 slides.

**Question bank (65 items, 170 marks):** source-based 5 (5 × 1 each) · short 3-mark 14 (models 44–48 words) · short 2-mark 6 (32–38) · long 6-mark 9 (107–117) · mcq 14 · fill-blank 4 · assertion-reason 4 (keys a, d, b, c) · true-false 4 · ordering 2 · match 3.
- **Difficulty:** d1 7 · d2 22 · d3 26 · d4 10. **Competency:** recall 14 · understanding 16 · application 4 · analysis 22 · evaluation 9 → **54% application or higher**.
- **MCQ keys (14 top-level):** a 4 · b 4 · c 3 · d 3.
- **Schemes:** 3-mark = point (1) + explanation (1) + expression (1); 2-mark = point (1) + explanation (1); 6-mark = content 3 + interpretation or value 1 + organisation/expression 2.
- **D-032:** written answers keep their worked content in `answer.model_answer_md`; `solution_md` is a short method note. No solution sentence of 60+ characters appears in served content.
- **Stems are chapter-specific** (they name Hari, Anil, Bond or the story).

**Tests:** short (20 marks, 40 min): A commentary item (5) · B 3 of 4 three-mark (9) · C 1 of 2 long (6). Long (40 marks, 90 min): A two commentary pairs (10) · B 3 of 4 two-mark (6) · C 4 of 5 three-mark (12) · D two long pairs (12). No shared questions. `blueprint_id` is `cbse-10-english-language-and-literature-chapter-test-short` / `-long`.

## Verifier record (author pass, 2026-10-27)
Every item was re-answered from its stem, and every factual claim was checked against the author's knowledge of the story.
- **Wording fixes (first draft → final):** three phrases that the guard list covers were reworded. The final text uses "full sentences", "educated person" and "damp from the rain"; the earlier wordings are not repeated here.
- **Key fixes:** the assertion-reason keys first came out a, d, b, d; one item was rewritten (R now false: Hari had never worked as a cook), giving a, d, b, c.
- **Accuracy:** ages, sums of money and the train's name were kept out of the content (see "left out").
- **Pipeline checks:** build validation 0 errors, 0 warnings; reproduction guard 0 hits; `content lint --exemplars` 0 errors, 0 warnings; every model answer inside its exact word limit (scripted check).

## Known gaps
- No n-gram check against the actual text (no reference texts yet, OA-16; none reconstructed, D-036). A human reviewer with the textbook should run the checklist above.
- The catalog's t04 learning outcome for this chapter says "extract-based"; the board sets no extracts from *Footprints without Feet* (reported, not edited).
