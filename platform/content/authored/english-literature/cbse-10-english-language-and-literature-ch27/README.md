# CBSE Class 10 English Language and Literature — Chapter 27: Footprints without Feet

| | |
|---|---|
| Unit | `cbse-10-english-language-and-literature-ch27` (family `english-literature`) |
| Book | NCERT *Footprints without Feet* (supplementary reader) · science fiction, adapted from H. G. Wells's *The Invisible Man* |
| Syllabus | `platform/catalog/cbse/10/english-language-and-literature/syllabus.yaml` (2026-27): t01 context and summary · t02 themes (invisibility, lawlessness, misuse of science) · t03 Griffin as a brilliant but lawless scientist · t04 exam practice. No removed topics. |
| Board weight | Section C, supplementary reader: 3-mark short answers (40–50 words, two of three) and a 6-mark long answer (100–120 words) on character, theme and values. **No extracts are set from this book.** |
| Files | `release.json` (1 deck of 23 slides; 8 notes sections; 30 flashcards; 63 questions with 25 passage children), `tests.json` (short 20 / 40 min; long 40 / 90 min), `src/` (builder; shared library `../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs`, unchanged; `src/guard.mjs` reproduction guard shared by ch27–ch30) |
| Provenance | `origin: human`, `author: claude-opus-5-5 (subject-producer)`, every item `status: draft` |

Rebuild from `platform/`: `npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch27/src/build.mjs` (deterministic; also runs the guard).

## Pattern decision: how the supplementary reader is assessed
The board blueprint (`blueprints/board.yaml`, Section C) uses *Footprints without Feet* only in Q9 (3-mark short answers, 40–50 words, any two of three) and the second long answer (6 marks, 100–120 words). Questions are on character, theme and values, and the reference-to-context extracts (Q6/Q7) come from *First Flight*. The subject's chapter-test blueprints (`chapter-test-short.yaml`, `chapter-test-long.yaml`) are generic: they were written for all literature chapters and include extract slots. There is no supplementary-reader override. So:

- **Tests keep the blueprint slots item for item** (`blueprint_id` = `cbse-10-english-language-and-literature-chapter-test-short` / `-long`), so the assembler and validators treat them like every other literature chapter.
- **Section A slots hold SOYL commentary passages on character and theme**, titled "Commentary passage" rather than "Extract-based". Their parts ask what an episode shows about Griffin, the theme or a value, not line-level reference to context.
- **The bank is weighted to the board's form:** 14 three-mark short answers (12 in First Flight prose chapters), 9 long answers (7), 6 two-mark answers, and only 5 commentary passages (7). Five is the minimum that fills both tests without sharing a question.
- The deck's board table, notes section 8, exam tips and flashcards all tell the student that no extracts are set from this book.

## The literature rule: taught without reproducing the text
CONTEXT §8–§9 and D-036: everything was written in SOYL's own words from the outset, at the level of events and ideas. Wells's novel is in the public domain, but the NCERT adaptation is not, so the adaptation's wording was treated as protected.
- **Summaries in SOYL's words**, organised in six stages (footprints → the discovery and fire → the store and costume shop → Iping → unmasking and escape). Facts are stated plainly. No sentence, sentence frame or distinctive phrase of the adaptation is used.
- **No dialogue.** What Mrs Hall and Griffin say to each other is reported ("demanded an explanation", "lost his temper").
- **Lists are not given in the adaptation's order.** The disguise items are listed in a different order everywhere.
- **Commentary passages:** all 5 `source-based` items have `passage_origin: "soyl-commentary"`. Every stem says the passage is SOYL commentary and points to *Footprints without Feet*.
- **Devices with SOYL's own lines** (a swing, a vault, an umbrella), never the story's.
- **Word meanings** are single words, labelled "key words for this chapter" (not claimed as the textbook glossary).
- **Guard list:** `build.mjs` passes 10 short distinctive phrases (four words or fewer) to `src/guard.mjs`. The build fails if any of them appears in `release.json`, `tests.json` or this README. Final result: 0 of 10 found.
- **NCERT exercise questions are not reused.** Classic questions are reframed: why Griffin became homeless is asked with how he became invisible; the Iping curiosity question is about his habits; the misuse of science is asked as a values question.

### Reproduction check status
No overlap scan against the real text has been run. Under D-036, no part of the text was written out from memory, even in scratch. The n-gram check against the actual adaptation awaits owner-supplied reference texts (OA-16; `catalog/sources/reference/` is empty). A reviewer with the reader should run the checklist below.

### Reviewer checklist (english-literature)
- [ ] **No reproduction (critical):** no sentence, sentence frame, distinctive phrase or line of dialogue of the adaptation in slides, narration, notes, flashcards, stems, options, solutions, model answers or passages. Check especially the opening scene, the department-store night, the haunted room and the unmasking.
- [ ] Facts (see below).
- [ ] Re-answer every item blind; keys right; no second defensible option.
- [ ] Model answers within word limits (3-mark 40–50, 2-mark 30–40, 6-mark 100–120).
- [ ] Textbook pointer present on the title slide, notes and passage stems.

### Facts to confirm against the textbook
Stated in the content (believed correct; please confirm):
- H. G. Wells, 1866–1946; *The Invisible Man*, 1897.
- Two boys in London see bare footprints forming on a house's steps, follow them, and lose them when they fade.
- Griffin made himself invisible by swallowing certain rare drugs.
- His landlord disliked him and tried to turn him out, and Griffin set the house on fire in revenge. He had to remove his clothes to escape unseen.
- It was winter. He hid in a large London store overnight, took clothes and food, slept there, was chased by staff in the morning and shed the clothes to escape.
- At a theatrical company's shop he took a disguise (bandages, dark glasses, false nose, whiskers, hat), attacked the shopkeeper and robbed him.
- He took rooms at the inn at Iping, where Mrs Hall was landlady. He kept to his rooms with bottles and chemicals and was short-tempered.
- Money was taken from the clergyman's desk by an unseen thief, followed by a sneeze.
- The Halls found his room empty, and a hat and a chair seemed to attack them. Mrs Hall blamed spirits.
- Griffin lost his temper when questioned and removed his disguise, appearing headless.
- Constable Jaffers tried to arrest him. Griffin stripped, knocked Jaffers unconscious and escaped (the end of the adaptation).

Deliberately **left out** because they cannot be confirmed without the text: the month, the London street of the costume shop, the name of the inn, the clergyman's name, the store's departments and the food Griffin ate, the exact reason Griffin gave the villagers for his bandages, and whether Mrs Hall was paid in advance.

## Shape
**Deck (23 slides):** title (board-pattern table) → how to use → author and text (table) → six stages (flow) → summary in five slides (footprints; the discovery and fire; the store and costume shop; Iping; unmasked and escaped), with an ordering check after the second → theme 1: the misuse of science (two-column) → theme web (table) → check (Griffin's mistake today, a hacker scenario) → character: Griffin (trait/evidence table) → the other characters (table) → gift or curse? (two-column debate) → check (assertion-reason) → style and narrative technique → suspense and irony with SOYL lines → word meanings (table) → worked example: planning a 6-mark answer (flow) → summary → exam tips. Narration max 68 words, mean 56; numbers spoken as words. Visuals on 9 slides.

**Question bank (63 items, 167 marks):** source-based 5 (5 × 1 each; commentary passages: the opening, Griffin's lawlessness, the store, Iping, the unmasking) · short 3-mark 14 (models 44–49 words) · short 2-mark 6 (30–34) · long 6-mark 9 (Griffin's character sketch, science and responsibility, invisible for a day, Mrs Hall's diary, Jaffers's report, power and isolation, Wells's methods, Griffin's letter, the title; 108–118 words) · mcq 12 · fill-blank 4 · assertion-reason 4 (keys a, c, b, d) · true-false 4 · ordering 2 · match 3.
- **Difficulty:** d1 5 · d2 25 · d3 24 · d4 9. **Competency:** recall 12 · understanding 19 · application 4 · analysis 20 · evaluation 8 → **51% application or higher**.
- **MCQ keys (12 top-level):** a 3 · b 3 · c 3 · d 3 (three fixed keys: narrator d, ending c, temper b).
- **Schemes:** 3-mark = point (1) + explanation (1) + expression (1); 2-mark = point (1) + explanation (1); 6-mark = content 3 + interpretation of character/theme/value 1 + organisation/expression 2.
- **Stems are chapter-specific** (they name Griffin, Mrs Hall, Jaffers, Iping or the story).

**Tests:** short (20 marks, 40 min): A commentary passage (5) · B 3 of 4 three-mark (9) · C 1 of 2 long (6). Long (40 marks, 90 min): A two passage pairs (10) · B 3 of 4 two-mark (6) · C 4 of 5 three-mark (12) · D two long pairs (12). No shared questions. 30 of the 40 long-test marks and 15 of the 20 short-test marks are in the board's short/long answer form.

## Verifier record (author pass, 2026-10-27)
Every item was re-answered from its stem, every factual claim was checked against the author's knowledge of the story, and every field was reviewed for wording that might echo the adaptation.
- **Wording changed in the first draft:** a three-part "no … no … no …" summary of Griffin's plight (passage and 3-mark model), reworded; the store described by size and city as the adaptation may do (passage, stems, true-false, ordering, fill-blank), now "a London department store"; the description of the attack on the shopkeeper (four places), now "took the owner by surprise / caught him off guard / overpowered him"; the disguise list in the adaptation's order (passage, 3-mark model, 2-mark model), reordered; the opening of the clergyman scene (summary slide, 3-mark model), recast; one MCQ option describing London, recast.
- **Content changes:** the word-match item on a word that may be the adaptation's own adjective was replaced with *disguise*. Unconfirmed details (inn name, street, month, the excuse Griffin gave) were left out.
- **Keys:** MCQ keys a 4 · b 3 · c 2 · d 3 → a 3 · b 3 · c 3 · d 3 by fixing two items' keys.
- **Pipeline checks:** build validation 0 errors, 0 warnings; guard 0 of 10; `content lint --exemplars` 0 errors, 0 warnings.

## Known gaps
- No n-gram check against the actual adaptation: it awaits owner-supplied reference texts (OA-16, D-036). A human reviewer with the reader should run the checklist above.
- `catalog` issue (reported, not edited): topic t04's learning outcome says "extract-based" for Footprints chapters, though the board sets no extracts from this book. The chapter-test blueprints have no supplementary-reader variant.
