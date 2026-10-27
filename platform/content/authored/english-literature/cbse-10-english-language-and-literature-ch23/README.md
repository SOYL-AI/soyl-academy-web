# CBSE Class 10 English Language and Literature — Chapter 23: A Triumph of Surgery

| | |
|---|---|
| Unit | `cbse-10-english-language-and-literature-ch23` (family `english-literature`) |
| Book | NCERT *Footprints without Feet* (supplementary reader), story · first-person humorous memoir by James Herriot (in copyright) |
| Syllabus | `platform/catalog/cbse/10/english-language-and-literature/syllabus.yaml` (2026-27): t01 context and summary · t02 themes (how pampering harms Tricki and how the vet cures him) · t03 characters (compare Mrs Pumphrey and the narrator) · t04 exam practice. No removed topics. |
| Board weight | Section C, Footprints: Q9 short answers (3 marks, 40–50 words, two of three) and the Footprints long answer (6 marks, 100–120 words). No extracts are set from this reader. |
| Files | `release.json` (1 deck of 23 slides; 8 notes sections; 30 flashcards; 65 questions with 25 passage children), `tests.json` (short 20 / 40 min; long 40 / 90 min), `src/` (builder, question bank, `guard.mjs`; shared library in `../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs`, unchanged) |
| Provenance | `origin: human`, `author: claude-opus-5-5 (subject-producer)`, every item `status: draft` |

Rebuild from `platform/`: `npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch23/src/build.mjs`.

## Pattern decision: how a supplementary-reader chapter is assessed

The 2026-27 board paper (`blueprints/board.yaml`, Section C) examines *Footprints without Feet* only through **Q9** (3-mark short answers, 40–50 words, two of three) and **one 6-mark long answer** (100–120 words, one of two), on character, theme and values. The reference-to-context extracts (Q6/Q7) come from *First Flight* only.

The subject's chapter-test blueprints (`chapter-test-short`, `chapter-test-long`) are generic: one design for every literature chapter, with Section A extract slots. As briefed, this chapter **keeps the blueprints' slots item for item** (so `blueprint_id` is set) but **weights the bank towards the supplementary-reader pattern**:

| Type | First Flight prose chapters (ch09–ch12) | This chapter |
|---|---|---|
| Source-based (5 marks, SOYL commentary) | 7 | **5**: the minimum that fills both tests without sharing a question |
| Short, 3 marks (Q9 pattern) | 12 | **14** |
| Short, 2 marks | 6 | 6 |
| Long, 6 marks (Footprints long answer) | 7 | **9** (comparison, values, character sketch, title, humour and irony, diary, letter, the dog's own account) |

The five commentary items are labelled in every stem as comprehension checks, with a note that the board sets no extracts from this reader. Their parts test inference about character, theme and values rather than line-level reference to context. The title slide, notes section 8, the exam tips and the flashcards all tell students how the reader is actually examined.

## The literature rule: taught without reproducing the text (CONTEXT §8–§9, D-036)

- **Summaries in SOYL's words**, organised as six stages (the shock in the street → advice ignored → illness → the surgery → recovery among other dogs → the ironic thank-you). Facts are stated plainly; Herriot's descriptions, comic images and sentences are not used.
- **Dialogue is reported, never quoted.** Mrs Pumphrey's explanations, the vet's advice and her final words of thanks appear only as reported speech. The title phrase is used as the title.
- **Commentary items:** all 5 `source-based` items have `passage_origin: "soyl-commentary"`, are labelled as SOYL commentary on Herriot's story, and point to *Footprints without Feet*.
- **Devices with SOYL's own sentences** (a hare, a grandmother's packing, a coach and a protein shake), never Herriot's.
- **Word meanings** are single words, labelled "key words for this story" (not claimed as the textbook glossary).
- **Textbook pointers:** title slide, "how to use" slide, summary slide, notes sections 1 and 8, exam tips and every passage stem.
- **NCERT exercise questions are not reused.** Classic questions are reframed (for example, the comparison of the two characters is asked as *whose love is wiser*; the cure is asked through the irony of the title).
- **Reproduction guard (D-036):** `src/build.mjs` passes 30 short distinctive phrases (each at most 4 words) to `src/guard.mjs`. The guard fails the build if any of them appears in `release.json`, `tests.json` or this README. No part of the story was written out from memory anywhere, including scratch folders. The final build reports none found.

### Reviewer checklist (english-literature)
- [ ] **No reproduction (critical):** no sentence, sentence frame or distinctive phrase of the story in slides, narration, notes, flashcards, stems, options, solutions, model answers or passages. Pay special attention to the street meeting, the departure for the surgery, the recovery among the dogs, the gifts and the ending.
- [ ] Facts (see "Facts to confirm" below).
- [ ] Re-answer every item blind; keys right; no second defensible option.
- [ ] Model answers within word limits (3-mark 40–50, 2-mark 30–40, 6-mark 100–120).
- [ ] Textbook pointer present on the title slide, notes and passage stems.

### Facts to confirm against the textbook
Stated in the content (believed correct; please confirm):
- James Herriot is the pen name of James Alfred Wight (1916–1995), a British vet who wrote memoirs of country practice in Yorkshire; the story is told in the first person by the vet.
- Tricki is a Pekinese owned by the wealthy Mrs Pumphrey.
- The vet first sees the overweight Tricki while Mrs Pumphrey is walking him in the street.
- Mrs Pumphrey believed Tricki was suffering from malnutrition and gave him malt, cod-liver oil and Horlicks on top of cakes and sweets.
- The vet advised less food and more exercise; she could not refuse the dog, and Tricki became seriously ill.
- The vet took Tricki to his surgery; Tricki's bed, toys and coats were sent with him.
- At the surgery Tricki was at first given only water; he recovered by playing and eating with the other dogs; no medicine was used.
- Mrs Pumphrey telephoned often and sent eggs and wine, which the vet and his colleagues enjoyed.
- Mrs Pumphrey came by car to collect him; Tricki rushed to her joyfully; she called the recovery a triumph of surgery.

Deliberately **left out** because they cannot be confirmed without the text: how long Tricki stayed at the surgery, how many eggs or bottles were sent and whether other drinks were sent, the names of the vet's colleagues and of Mrs Pumphrey's staff, which of Herriot's books first printed the story, and Tricki's exact symptoms when he fell ill.

## Shape
**Deck (23 slides):** title (board-pattern table for this reader) → how to use → author and text (table) → six stages (flow) → summary in five slides with an ordering check after the second → theme 1: pampering versus real care (two-column) → theme web (table) → check (a grandmother and sweets) → character: Mrs Pumphrey (trait/evidence table) → character: the vet (table) → comparing the two (two-column, t03) → check (assertion-reason) → humour and irony → SOYL's own examples of irony → word meanings (table) → worked example: planning a 6-mark value answer (flow) → summary → exam tips. Narration max 65 words, mean 56; no numerals. Visuals on 9 slides.

**Question bank (65 items, 170 marks):** source-based 5 (5 × 1 each) · short 3-mark 14 (models 43–48 words) · short 2-mark 6 (32–37) · long 6-mark 9 (111–115) · mcq 14 · fill-blank 4 · assertion-reason 4 (keys c, d, b, a) · true-false 4 · ordering 2 · match 3.
- **Difficulty:** d1 6 · d2 25 · d3 25 · d4 9. **Competency:** recall 12 · understanding 20 · application 6 · analysis 19 · evaluation 8 → **51% application or higher**.
- **MCQ keys (14 top-level):** a 4 · b 3 · c 4 · d 3.
- **Schemes:** 3-mark = point (1) + explanation (1) + expression (1); 2-mark = point (1) + explanation (1); 6-mark = content 3 + interpretation or value 1 + organisation/expression 2.
- **D-032:** written answers keep their worked content in `answer.model_answer_md`; `solution_md` is a short method note. No solution sentence of 60+ characters appears in served content (the builder's per-sentence leak check).
- **Stems are chapter-specific** (they name Tricki, Mrs Pumphrey, the vet, Herriot or the story), so the bank-duplicate check cannot match them to other chapters.

**Tests:** short (20 marks, 40 min): A commentary item (5) · B 3 of 4 three-mark (9) · C 1 of 2 long (6). Long (40 marks, 90 min): A two commentary pairs (10) · B 3 of 4 two-mark (6) · C 4 of 5 three-mark (12) · D two long pairs (12). No shared questions. Both match the subject's chapter-test blueprints item for item, so `blueprint_id` is `cbse-10-english-language-and-literature-chapter-test-short` / `-long`.

## Verifier record (author pass, 2026-10-27)
Every item was re-answered from its stem, and every factual claim was checked against the author's knowledge of the story.
- **Accuracy fixes (first draft → final):** the claim that the vets drank the wine "in the evenings" became "with their meals" (timing not confirmable); one adverb describing Tricki's weight was replaced, being too close to the story's own description.
- **Key fixes:** one assertion-reason item had a scratch solution and the same key as another; it was rewritten (R is now false: the vet did not prescribe the tonics), giving AR keys c, d, b, a.
- **Pipeline checks:** build validation 0 errors, 0 warnings; reproduction guard 0 hits; `content lint --exemplars` 0 errors, 0 warnings; every model answer inside its exact word limit (scripted check).

## Known gaps
- No n-gram check against the actual text: `catalog/sources/reference/` has no reference texts (OA-16), and under D-036 no text was reconstructed from memory. Originality rests on own-words authoring, the guard list and the repo's `originality` and lint checks. A human reviewer with the textbook should run the checklist above.
- The catalog's t04 learning outcome for this chapter says "extract-based"; the board sets no extracts from *Footprints without Feet* (reported, not edited).
