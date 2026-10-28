# CBSE Class 10 English Language and Literature — Chapter 26: A Question of Trust

| | |
|---|---|
| Unit | `cbse-10-english-language-and-literature-ch26` (family `english-literature`) |
| Book | NCERT *Footprints without Feet* (supplementary reader), short crime story with an ironic twist, by Victor Canning (in copyright) |
| Syllabus | `platform/catalog/cbse/10/english-language-and-literature/syllabus.yaml` (2026-27): t01 context and summary · t02 themes (the irony of a thief tricked by another thief) · t03 characters (Horace Danby) · t04 exam practice. No removed topics. |
| Board weight | Section C, Footprints: Q9 short answers (3 marks, 40–50 words, two of three) and the Footprints long answer (6 marks, 100–120 words). No extracts are set from this reader. |
| Files | `release.json` (1 deck of 23 slides; 8 notes sections; 30 flashcards; 65 questions with 25 passage children), `tests.json` (short 18 / 40 min; long 36 / 80 min, supplementary-reader blueprints), `src/` (builder and question bank; shared library `../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs`, unchanged; reproduction guard `../../cbse-10-english-language-and-literature-ch23/src/guard.mjs`) |
| Provenance | `origin: human`, `author: claude-opus-5-5 (subject-producer)`, every item `status: draft` |

Rebuild from `platform/`: `npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch26/src/build.mjs`.

## Pattern decision: how a supplementary-reader chapter is assessed

The 2026-27 board paper (`blueprints/board.yaml`, Section C) examines *Footprints without Feet* only through **Q9** (3-mark short answers, 40–50 words, two of three) and **one 6-mark long answer** (100–120 words), on character, theme and values. Reference-to-context extracts come from *First Flight* only.

The chapter-test blueprints are generic, with Section A extract slots. This chapter **keeps those slots item for item** (so `blueprint_id` is set) and **weights the bank towards the supplementary-reader pattern**:

| Type | First Flight prose chapters (ch09–ch12) | This chapter |
|---|---|---|
| Source-based (5 marks, SOYL commentary) | 7 | **5**: the minimum that fills both tests without sharing a question |
| Short, 3 marks (Q9 pattern) | 12 | **14** |
| Short, 2 marks | 6 | 6 |
| Long, 6 marks | 7 | **9** (Horace's sketch, the irony, trust, Horace's prison diary, the woman's letter, a debate on "harmless" crime, the title, values, the ending) |

The commentary items are labelled in every stem as comprehension checks, with a note that the board sets no extracts from this reader. The title slide, notes section 8, the exam tips and the flashcards say how the reader is actually examined. Same decision as ch23–ch25 (and english-g for ch27–ch30).

**Update, 2026-10-27 (curriculum-architect):** the catalog now has supplementary-reader chapter-test blueprints for ch23–ch31 (`chapter-test-short-supplementary`, `chapter-test-long-supplementary`; a chapter override through the blueprint `scope`). They have no extract section and use only the board's forms for this reader (3-mark answers, two of three; 6-mark long answers, one of two), plus the 2-mark recall section in the long test. This chapter's two tests were re-selected onto them from the existing bank; see **Tests** below. Where this note and the paragraphs above differ, this note is current.

## The literature rule: taught without reproducing the text (CONTEXT §8–§9, D-036)

- **Summaries in SOYL's words**, in six stages (a respectable thief → the plan for Shotover Grange → inside the house → a lady in the doorway → the safe opened → prison and the truth). Canning's portrait of Horace and his wry narrative comments are not used.
- **Dialogue is reported, never quoted.** The young woman's claims and offer and Horace's replies appear only as reported speech; her exact excuse is not reconstructed.
- **Uncertain details are left out** rather than guessed: the content gives no value for the jewels, no dog, no location for the safe, no description of the woman's clothes and no prison sentence.
- **Commentary items:** all 5 `source-based` items have `passage_origin: "soyl-commentary"`, are labelled as SOYL commentary and point to *Footprints without Feet*.
- **Devices with SOYL's own sentences** (a pickpocket robbed on a bus, a fire station, a spelling champion), never Canning's.
- **Word meanings** are single words, labelled "key words for this story".
- **NCERT exercise questions are not reused.** Classic questions are reframed (for example, the idea that thieves cannot trust one another is asked as *the deceiver deceived*, and Horace's self-justification is asked as a debate on whether a polite crime is harmless).
- **Reproduction guard (D-036):** `src/build.mjs` passes 14 short distinctive phrases (each at most 4 words) to the shared chapter guard. During drafting it led to one wording change: Horace's yearly habit is now "a single safe each year". The final build reports none found. No part of the story was written out from memory anywhere.

### Reviewer checklist (english-literature)
- [ ] **No reproduction (critical):** no sentence, sentence frame or distinctive phrase of the story in any field. Pay special attention to the opening portrait of Horace, the woman's entrance and the ending in prison.
- [ ] Facts (see "Facts to confirm" below).
- [ ] Re-answer every item blind; keys right; no second defensible option.
- [ ] Model answers within word limits (3-mark 40–50, 2-mark 30–40, 6-mark 100–120).
- [ ] Textbook pointer present on the title slide, notes and passage stems.

### Facts to confirm against the textbook
Stated in the content (believed correct; please confirm):
- Victor Canning (1911–1986), English writer of thrillers and spy novels; the story is told in the third person.
- Horace Danby is a middle-aged, unmarried locksmith regarded as respectable; he loves rare, expensive books and robs one safe each year to pay for them, without violence.
- The target is Shotover Grange, a country house with a safe of jewels; the owners are in London and the servants are out.
- Horace suffers from hay fever, and the flowers in the house trouble him.
- A young woman appears, lets him believe she is the lady of the house, says she has forgotten the safe's combination, and promises not to call the police if he opens it.
- Horace opens the safe without gloves and gives her the jewels; his fingerprints lead to his arrest; she was a thief.
- Horace ends up in prison, working among books (the prison library), finding it hard to accept how he was used.

Deliberately **left out** because they cannot be confirmed without the text: the value of the jewels, the family dog and how Horace dealt with it, where the safe was hidden, how Horace entered the house, how long he had planned, the woman's clothes and her exact excuse, his precise job in prison, and the length of his sentence.

## Shape
**Deck (23 slides):** title (board-pattern table) → how to use → author and text (table) → six stages (flow) → summary in five slides with an ordering check after the second → theme 1: the deceiver deceived (two-column) → theme web (table) → check (an online cheat who trusts a stranger) → character: Horace Danby (trait/evidence table, t03) → the young woman (table) → was Horace's crime harmless? (two-column debate) → check (assertion-reason) → irony and the twist → SOYL's own examples of situational irony → word meanings (table) → worked example: planning a 6-mark answer (flow) → summary → exam tips. Narration max 65 words, mean 55; no numerals. Visuals on 9 slides.

**Question bank (65 items, 170 marks):** source-based 5 (5 × 1 each) · short 3-mark 14 (models 43–49 words) · short 2-mark 6 (30–38) · long 6-mark 9 (108–117) · mcq 14 · fill-blank 4 · assertion-reason 4 (keys a, d, c, b) · true-false 4 · ordering 2 · match 3.
- **Difficulty:** d1 6 · d2 24 · d3 27 · d4 8. **Competency:** recall 13 · understanding 18 · application 5 · analysis 20 · evaluation 9 → **52% application or higher**.
- **MCQ keys (14 top-level):** a 4 · b 3 · c 4 · d 3.
- **Schemes:** 3-mark = point (1) + explanation (1) + expression (1); 2-mark = point (1) + explanation (1); 6-mark = content 3 + interpretation or value 1 + organisation/expression 2.
- **D-032:** written answers keep their worked content in `answer.model_answer_md`; `solution_md` is a short method note. No solution sentence of 60+ characters appears in served content.
- **Stems are chapter-specific** (they name Horace Danby, Shotover Grange, the young woman, Canning or the story).

**Tests** (re-selected from the existing bank on 2026-10-27, no item text changed): short (18 marks, 40 min): A two sets of three 3-mark answers, two of each (12) · B 1 of 2 long (6). Long (36 marks, 80 min): A 3 of 4 two-mark (6) · B two sets of three 3-mark answers, two of each (12) · C three long pairs, one of each (18). No shared questions. Both follow the supplementary-reader blueprints item for item, so `blueprint_id` is `cbse-10-english-language-and-literature-chapter-test-short-supplementary` / `-long-supplementary`. The commentary items remain in the bank as practice and are no longer in the tests.

## Verifier record (author pass, 2026-10-27)
Every item was re-answered from its stem, and every factual claim was checked against the author's knowledge of the story.
- **Accuracy fixes (first draft → final):** an assertion described the woman's clothing; the detail was removed as unconfirmable.
- **Wording fixes:** Horace's yearly habit is phrased as "a single safe each year" throughout (guard list).
- **Assertion-reason check:** the item on his arrest has R false (nothing suggests a criminal record); the hay-fever item has two true but unrelated statements (key b).
- **Pipeline checks:** build validation 0 errors, 0 warnings; reproduction guard 0 hits; `content lint --exemplars` 0 errors, 0 warnings; every model answer inside its exact word limit (scripted check).

## Known gaps
- No n-gram check against the actual text (no reference texts yet, OA-16; none reconstructed, D-036). A human reviewer with the textbook should run the checklist above.
- The catalog's t04 learning outcome for this chapter says "extract-based"; the board sets no extracts from *Footprints without Feet* (reported, not edited).
