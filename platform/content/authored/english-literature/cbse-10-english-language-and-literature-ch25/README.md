# CBSE Class 10 English Language and Literature — Chapter 25: The Midnight Visitor

| | |
|---|---|
| Unit | `cbse-10-english-language-and-literature-ch25` (family `english-literature`) |
| Book | NCERT *Footprints without Feet* (supplementary reader), short spy story with a twist ending, by Robert Arthur (in copyright) |
| Syllabus | `platform/catalog/cbse/10/english-language-and-literature/syllabus.yaml` (2026-27): t01 context and summary · t02 themes (how Ausable outwits Max with presence of mind) · t03 characters (Ausable's appearance against his intelligence) · t04 exam practice. No removed topics. |
| Board weight | Section C, Footprints: Q9 short answers (3 marks, 40–50 words, two of three) and the Footprints long answer (6 marks, 100–120 words). No extracts are set from this reader. |
| Files | `release.json` (1 deck of 23 slides; 8 notes sections; 30 flashcards; 65 questions with 25 passage children), `tests.json` (short 18 / 40 min; long 36 / 80 min, supplementary-reader blueprints), `src/` (builder and question bank; shared library `../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs`, unchanged; reproduction guard `../../cbse-10-english-language-and-literature-ch23/src/guard.mjs`) |
| Provenance | `origin: human`, `author: claude-opus-5-5 (subject-producer)`, every item `status: draft` |

Rebuild from `platform/`: `npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch25/src/build.mjs`.

## Pattern decision: how a supplementary-reader chapter is assessed

The 2026-27 board paper (`blueprints/board.yaml`, Section C) examines *Footprints without Feet* only through **Q9** (3-mark short answers, 40–50 words, two of three) and **one 6-mark long answer** (100–120 words), on character, theme and values. Reference-to-context extracts come from *First Flight* only.

The chapter-test blueprints are generic, with Section A extract slots. This chapter **keeps those slots item for item** (so `blueprint_id` is set) and **weights the bank towards the supplementary-reader pattern**:

| Type | First Flight prose chapters (ch09–ch12) | This chapter |
|---|---|---|
| Source-based (5 marks, SOYL commentary) | 7 | **5**: the minimum that fills both tests without sharing a question |
| Short, 3 marks (Q9 pattern) | 12 | **14** |
| Short, 2 marks | 6 | 6 |
| Long, 6 marks | 7 | **9** (Ausable's sketch, appearances, Fowler's diary, Max's mistakes, Ausable's report to his chief, the twist, qualities for facing danger, the title with an alternative, a debate on the trick) |

The commentary items are labelled in every stem as comprehension checks, with a note that the board sets no extracts from this reader. The title slide, notes section 8, the exam tips and the flashcards say how the reader is actually examined. Same decision as ch23–ch24 (and english-g for ch27–ch30).

**Update, 2026-10-27 (curriculum-architect):** the catalog now has supplementary-reader chapter-test blueprints for ch23–ch31 (`chapter-test-short-supplementary`, `chapter-test-long-supplementary`; a chapter override through the blueprint `scope`). They have no extract section and use only the board's forms for this reader (3-mark answers, two of three; 6-mark long answers, one of two), plus the 2-mark recall section in the long test. This chapter's two tests were re-selected onto them from the existing bank; see **Tests** below. Where this note and the paragraphs above differ, this note is current.

## The literature rule: taught without reproducing the text (CONTEXT §8–§9, D-036)

- **Summaries in SOYL's words**, in six stages (a disappointing spy → a gun in the room → the balcony story → a knock at the door → a scream below → only the waiter). Arthur's descriptions of Ausable and of Fowler's expectations are not used; both are described in plain, new terms.
- **Dialogue is reported, never quoted.** Ausable's grumbling about the balcony, his claim about the police, and Max's demands and threats appear only as reported speech.
- **The ending is stated carefully:** Max climbs out and a scream is heard. The content does not claim that Max died.
- **Commentary items:** all 5 `source-based` items have `passage_origin: "soyl-commentary"`, are labelled as SOYL commentary and point to *Footprints without Feet*.
- **Devices with SOYL's own sentences** (a boy in a torn sweater, a timid guard dog, a box of old reports), never Arthur's.
- **Word meanings** are single words or a set phrase (*presence of mind*), labelled "key words for this story".
- **NCERT exercise questions are not reused.** Classic questions are reframed (for example, *how is Ausable different from the usual idea of a spy* is asked as a contrast between appearance and intelligence; Max's defeat is asked as *why the armed man lost*).
- **Reproduction guard (D-036):** `src/build.mjs` passes 16 short distinctive phrases (each at most 4 words) to the shared chapter guard. During drafting it led to two wording changes: Fowler's imagined spy world became "beautiful strangers", and the balcony is always "outside" the window. The final build reports none found. No part of the story was written out from memory anywhere.

### Reviewer checklist (english-literature)
- [ ] **No reproduction (critical):** no sentence, sentence frame or distinctive phrase of the story in any field. Pay special attention to the opening description of Ausable, Fowler's expectations, Ausable's balcony complaint and the closing scene.
- [ ] Facts (see "Facts to confirm" below).
- [ ] Re-answer every item blind; keys right; no second defensible option.
- [ ] Model answers within word limits (3-mark 40–50, 2-mark 30–40, 6-mark 100–120).
- [ ] Textbook pointer present on the title slide, notes and passage stems.

### Facts to confirm against the textbook
Stated in the content (believed correct; please confirm):
- Robert Arthur (1909–1969), American writer of mystery and suspense, known for radio mysteries and the *Three Investigators* series; the story is told in the third person, mostly through Fowler.
- Fowler is a young writer who expected a glamorous spy; Ausable is fat and untidy, and his hotel room is ordinary.
- Max is waiting in the room with a pistol and wants a report about new missiles that Ausable expects that night.
- Ausable complains about a balcony outside his window through which intruders enter, and says he has complained to the hotel; there is no balcony.
- At a knock, Ausable says it is the police, whom he had asked to call; Max decides to hide on the balcony, climbs out, and a scream is heard.
- The visitor is Henry, a waiter, bringing drinks Ausable had ordered.

Deliberately **left out** because they cannot be confirmed without the text: the floor number, the city and country, how long Ausable has lived there and which languages he speaks, Max's appearance and how he got into the room, what exactly Henry brought, and whether Max survived the fall.

## Shape
**Deck (23 slides):** title (board-pattern table) → how to use → author and text (table) → six stages (flow) → summary in five slides with an ordering check after the second → theme 1: appearance versus reality (two-column) → theme web (table) → check (a quiet quiz winner) → character: Ausable, looks and mind (table, t03) → Fowler, Max and Henry (table) → why the unarmed man wins (two-column) → check (assertion-reason) → suspense and the twist → SOYL's own examples of false appearances → word meanings (table) → worked example: planning a 6-mark answer (flow) → summary → exam tips. Narration max 63 words, mean 54; no numerals. Visuals on 9 slides.

**Question bank (65 items, 170 marks):** source-based 5 (5 × 1 each) · short 3-mark 14 (models 44–48 words) · short 2-mark 6 (31–38) · long 6-mark 9 (109–113) · mcq 14 · fill-blank 4 · assertion-reason 4 (keys b, a, d, c) · true-false 4 · ordering 2 · match 3.
- **Difficulty:** d1 7 · d2 22 · d3 27 · d4 9. **Competency:** recall 13 · understanding 17 · application 4 · analysis 22 · evaluation 9 → **54% application or higher**.
- **MCQ keys (14 top-level):** a 4 · b 3 · c 3 · d 4.
- **Schemes:** 3-mark = point (1) + explanation (1) + expression (1); 2-mark = point (1) + explanation (1); 6-mark = content 3 + interpretation or value 1 + organisation/expression 2.
- **D-032:** written answers keep their worked content in `answer.model_answer_md`; `solution_md` is a short method note. No solution sentence of 60+ characters appears in served content.
- **Stems are chapter-specific** (they name Ausable, Fowler, Max, Henry, Arthur or the story).

**Tests** (re-selected from the existing bank on 2026-10-27, no item text changed): short (18 marks, 40 min): A two sets of three 3-mark answers, two of each (12) · B 1 of 2 long (6). Long (36 marks, 80 min): A 3 of 4 two-mark (6) · B two sets of three 3-mark answers, two of each (12) · C three long pairs, one of each (18). No shared questions. Both follow the supplementary-reader blueprints item for item, so `blueprint_id` is `cbse-10-english-language-and-literature-chapter-test-short-supplementary` / `-long-supplementary`. The commentary items remain in the bank as practice and are no longer in the tests.

## Verifier record (author pass, 2026-10-27)
Every item was re-answered from its stem, and every factual claim was checked against the author's knowledge of the story.
- **Wording fixes (first draft → final):** Fowler's imagined spy world was reworded ("beautiful strangers"); every reference to where the balcony lies now says "outside" the window. Both were changed to keep clear of phrasing the story may use.
- **Accuracy:** no claim that Max died; the floor number, city and Ausable's background were kept out (see "left out").
- **Keys:** the last MCQ is fixed at key d, giving a 4 · b 3 · c 3 · d 4; AR keys b, a, d, c.
- **Pipeline checks:** build validation 0 errors, 0 warnings; reproduction guard 0 hits; `content lint --exemplars` 0 errors, 0 warnings; every model answer inside its exact word limit (scripted check).

## Known gaps
- No n-gram check against the actual text (no reference texts yet, OA-16; none reconstructed, D-036). A human reviewer with the textbook should run the checklist above.
- The catalog's t04 learning outcome for this chapter says "extract-based"; the board sets no extracts from *Footprints without Feet* (reported, not edited).
