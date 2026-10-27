# CBSE Class 10 English Language and Literature — Chapter 30: Bholi

| | |
|---|---|
| Unit | `cbse-10-english-language-and-literature-ch30` (family `english-literature`) |
| Book | NCERT *Footprints without Feet* (supplementary reader) · short story by K. A. Abbas |
| Syllabus | `platform/catalog/cbse/10/english-language-and-literature/syllabus.yaml` (2026-27): t01 context and summary · t02 themes (education and confidence; dowry and gender discrimination) · t03 Bholi's transformation · t04 exam practice. No removed topics. |
| Board weight | Section C, supplementary reader: 3-mark short answers (40–50 words, two of three) and a 6-mark long answer (100–120 words) on character, theme and values. **No extracts are set from this book.** |
| Files | `release.json` (1 deck of 22 slides; 8 notes sections; 30 flashcards; 63 questions with 25 passage children), `tests.json` (short 18 / 40 min; long 36 / 80 min, supplementary-reader blueprints), `src/` (builder; shared library `../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs`, unchanged; reproduction guard `../../cbse-10-english-language-and-literature-ch27/src/guard.mjs`) |
| Provenance | `origin: human`, `author: claude-opus-5-5 (subject-producer)`, every item `status: draft` |

Rebuild from `platform/`: `npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch30/src/build.mjs` (deterministic; also runs the guard).

## Pattern decision: how the supplementary reader is assessed
This chapter follows the same decision as ch27–ch30. The board uses *Footprints without Feet* only for Q9 (3-mark short answers, two of three) and the second long answer (6 marks), on character, theme and values; the extracts come from *First Flight*. The chapter-test blueprints are generic, with extract slots and no supplementary-reader override. So:
- **Tests keep the blueprint slots item for item** (`blueprint_id` = `…-chapter-test-short` / `-long`).
- **Section A slots hold SOYL commentary passages on character and theme**, titled "Commentary passage". Their parts ask about neglect, the decision to send Bholi to school, the teacher, the proposal and the refusal.
- **The bank is weighted to the board's form:** 14 three-mark, 9 long, 6 two-mark and only 5 commentary passages.
- The board table on the title slide, notes section 8, exam tips and flashcards all say that no extracts are set from this book.

## Sensitive themes: how they are handled
The story deals with a child's disability, her appearance after smallpox, her stammer, mockery, dowry and a girl being married off without consent. For Class 10 readers:
- **Her condition is described plainly and never used as a label.** The content says a fall in infancy affected her development, that smallpox left marks on her face, and that she stammers. The nickname is explained as how others undervalued her, and the story's irony is shown to overturn it. The text's harsher words are not used (guarded).
- **Mockery is presented as wrong**, and its effect (silence) is traced to how she was treated, not to her condition.
- **Dowry is identified as a crime under Indian law** (Dowry Prohibition Act, 1961: notes, deck, a 2-mark item, an MCQ and a long answer).
- **Girls' education and consent are treated as rights.** Discrimination is analysed through the parents' attitudes without mocking them, and Ramlal's care for his daughter at the wedding is acknowledged.
- **Writing guidance for students:** the deck, notes section 8, exam tips and a flashcard ask students to write about Bholi respectfully.

**Update, 2026-10-27 (curriculum-architect):** the catalog now has supplementary-reader chapter-test blueprints for ch23–ch31 (`chapter-test-short-supplementary`, `chapter-test-long-supplementary`; a chapter override through the blueprint `scope`). They have no extract section and use only the board's forms for this reader (3-mark answers, two of three; 6-mark long answers, one of two), plus the 2-mark recall section in the long test. This chapter's two tests were re-selected onto them from the existing bank; see **Tests** below. Where this note and the paragraphs above differ, this note is current.

## The literature rule: taught without reproducing the text
The story is in copyright. Everything was written in SOYL's own words from the start, at the level of events and ideas (CONTEXT §8–§9, D-036).
- **Summaries in SOYL's words**, in six stages (a neglected child → a school opens → a kind teacher → years of learning → the proposal → the wedding and refusal).
- **No dialogue.** The mother's objection, the teacher's promise, Bishamber's demand, Bholi's refusal and her answer to her father are all reported in SOYL's words. None is quoted, and the stammered line of the school scene is not imitated (guarded).
- **The story's closing image of the teacher is not rebuilt.** The content says only that she watches with quiet pride; the comparison the story uses is guarded.
- **Commentary passages:** all 5 `source-based` items have `passage_origin: "soyl-commentary"`, with a *Footprints without Feet* pointer in every stem.
- **Contrast and symbol illustrated with SOYL's own lines** (a classroom door, a library card, a quiet boy).
- **Word meanings** are single words (key words for this chapter).
- **Guard list:** 7 short distinctive phrases (four words or fewer) checked over `release.json`, `tests.json` and this README; 0 of 7 found.
- **NCERT exercise questions are not reused.** Classic questions are reframed: why Bholi was sent to school is asked together with her mother's fear; the teacher's role is asked as a tribute and as a letter; the refusal is a debate.

### Reproduction check status
No overlap scan against the real text has been run. Under D-036, no part of the text was written out from memory, even in scratch. The n-gram check against the story awaits owner-supplied reference texts (OA-16). A reviewer with the reader should run the checklist below.

### Reviewer checklist (english-literature)
- [ ] **No reproduction (critical):** no sentence, sentence frame, distinctive phrase or line of dialogue of the story anywhere. Check especially the opening account of Bholi's childhood, the school scene, the wedding scene and the closing image.
- [ ] **Sensitivity:** no field uses Bholi's condition, appearance or nickname as an insult; dowry and discrimination are framed as wrongs.
- [ ] Facts (see below).
- [ ] Re-answer every item blind; keys right; no second defensible option.
- [ ] Model answers within word limits (3-mark 40–50, 2-mark 30–40, 6-mark 100–120).
- [ ] Textbook pointer present on the title slide, notes and passage stems.

### Facts to confirm against the textbook
Stated in the content (believed correct; please confirm):
- K. A. (Khwaja Ahmad) Abbas, 1914–1987.
- Bholi's real name is Sulekha. She is a daughter (not necessarily the youngest) of Ramlal, the village numberdar (an official).
- A fall in infancy affected her development; smallpox left marks on her face; she stammered; other children mocked her.
- Her sisters were married; her parents believed no one would marry her.
- A girls' primary school opened in the village. The Tehsildar, opening it, urged Ramlal to set an example by sending his daughters. Her mother feared schooling would harm the other daughters' marriage chances, so Bholi was sent.
- Bathed and dressed for school, Bholi was frightened, remembering that the cow Lakshmi had been cleaned up before being sold.
- The teacher spoke kindly, did not mock her stammer, gave her a picture book and promised that learning would help her speak without stammering and be respected.
- Bishamber Nath, a prosperous grocer from another village, much older, lame, with grown-up children, proposed without asking for dowry; her parents accepted without asking her.
- At the wedding, seeing the marks on her face, he demanded 5,000 rupees. Ramlal pleaded, humbling himself before him, then paid.
- Bholi refused to marry him, speaking without stammering. She said she would look after her parents in their old age and teach at the school; her teacher watched.

Deliberately **left out** because they cannot be confirmed without the text: Bholi's age at each stage, the number of her brothers and sisters, the year the school opened, Bishamber's age, what Bholi did with the wedding garland, and the exact words of the teacher, the mother and Bholi.

## Shape
**Deck (22 slides):** title (board-pattern table) → how to use (including writing respectfully) → author and text (table) → six stages (flow) → summary in four slides (a neglected child; a school opens; a kind teacher; the proposal and the wedding), with an ordering check after the second → theme 1: education gives Bholi a voice (two-column) → theme web (table) → check (a classmate who stammers) → Bholi's transformation (before/after table) → the other characters (table) → was Bholi right to refuse? (two-column) → check (assertion-reason) → style and narrative technique → contrast and symbol with SOYL lines → word meanings (table) → worked example: planning a 6-mark answer (flow) → summary → exam tips. Narration max 65 words, mean 55. Visuals on 9 slides.

**Question bank (63 items, 167 marks):** source-based 5 (5 × 1 each; commentary passages: neglect, being sent to school, the teacher, the proposal, the refusal) · short 3-mark 14 (models 42–50 words) · short 2-mark 6 (30–36) · long 6-mark 9 (Bholi's development, education for girls, dowry, the teacher's role, Bholi's diary, the teacher's letter to Ramlal, discrimination against girls, Bholi's speech to parents, the title; 111–117 words) · mcq 12 · fill-blank 4 · assertion-reason 4 (keys a, c, b, d) · true-false 4 · ordering 2 · match 3.
- **Difficulty:** d1 5 · d2 22 · d3 27 · d4 9. **Competency:** recall 10 · understanding 18 · application 6 · analysis 21 · evaluation 8 → **56% application or higher**.
- **MCQ keys (12 top-level):** a 3 · b 3 · c 3 · d 3 (three fixed keys: narration d, dowry law c, irony b).
- **Schemes:** 3-mark = point (1) + explanation (1) + expression (1); 2-mark = point (1) + explanation (1); 6-mark = content 3 + interpretation of character/theme/value 1 + organisation/expression 2.
- **Stems are chapter-specific** (they name Bholi, Ramlal, Bishamber, the teacher or the story).

**Tests** (re-selected from the existing bank on 2026-10-27, no item text changed): short (18 marks, 40 min): A two sets of three 3-mark answers, two of each (12) · B 1 of 2 long (6). Long (36 marks, 80 min): A 3 of 4 two-mark (6) · B two sets of three 3-mark answers, two of each (12) · C three long pairs, one of each (18). No shared questions. Both follow the supplementary-reader blueprints item for item, so `blueprint_id` is `cbse-10-english-language-and-literature-chapter-test-short-supplementary` / `-long-supplementary`. The commentary items remain in the bank as practice and are no longer in the tests.

## Verifier record (author pass, 2026-10-27)
Every item was re-answered from its stem, every factual claim was checked against the author's knowledge of the story, and every field was reviewed for wording that might echo it and for sensitivity.
- **Accuracy:** "the youngest daughter" (passage, summary slide and narration, notes) was softened to "a daughter", because the birth order is unconfirmed. The garland detail at the wedding and the exact words of the teacher's promise were left out.
- **Sensitivity:** no label for Bholi's condition is used anywhere; mockery is framed as cruel in an MCQ child and a match item; dowry is named a crime.
- **Other:** four model answers brought inside their limits (51 → 48, 28 → 32, 29 → 34, 121 → 117 words); MCQ keys a 4 · b 3 · c 2 · d 3 → a 3 · b 3 · c 3 · d 3 by fixing two keys.
- **Pipeline checks:** build validation 0 errors, 0 warnings; guard 0 of 7; `content lint --exemplars` 0 errors, 0 warnings.

## Known gaps
- No n-gram check against the actual story: it awaits owner-supplied reference texts (OA-16, D-036).
- `catalog` issue (reported, not edited): topic t04's outcome says "extract-based", though the board sets no extracts from this book.
