# CBSE Class 10 English Language and Literature — Chapter 4: A Letter to God (G. L. Fuentes)

| | |
|---|---|
| Unit | `cbse-10-english-language-and-literature-ch04` (family `english-literature`) |
| Book | NCERT *First Flight*, prose · short story |
| Syllabus | `platform/catalog/cbse/10/english-language-and-literature/syllabus.yaml` (2026-27): t01 context and summary · t02 themes and message · t03 characters · t04 narrative techniques and language (irony) · t05 exam practice. No removed topics. |
| Board weight | Section C: reference-to-context extract (5), First Flight short answers (3 marks, 40–50 words), long answers (6 marks, 100–120 words) |
| Files | `release.json` (1 deck of 23 slides; 7 notes sections; 30 flashcards; 63 questions with 35 passage children), `tests.json` (short 20 / 40 min; long 40 / 90 min), `src/` (builder; shared library in `../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs`) |
| Provenance | `origin: human`, `author: claude-opus-5-5 (subject-producer)`, every item `status: draft` |

Rebuild from `platform/`: `npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch04/src/build.mjs`.

## The literature rule: taught without reproducing the story

CONTEXT §8: summaries, themes, character sketches, literary devices, word meanings and questions — **never the text**; tell the student to read it in the textbook. How this chapter applies it:

- **Summaries in SOYL's words**, organised as five stages (hope → ruin → faith → kindness → irony), not as a paragraph-by-paragraph walk through the story. Plot facts (who did what, the amounts, the days) are stated plainly; the author's images and sentence frames are not.
- **No quotation of the story.** Not one sentence of dialogue or narration appears. Famous lines are described, never quoted (e.g. "he warns God not to use the post because he suspects the staff", not the line itself). Only **single words** appear for word meanings (*amiable, conscience, crooks, correspondence*).
- **Extract questions use SOYL commentary.** The board prints a passage from the story; SOYL cannot. All 7 `source-based` items have `passage_origin: "soyl-commentary"`: an interpretive paragraph *about* an episode, labelled in every stem as SOYL commentary, with a pointer to *First Flight*. Children test the commentary plus knowledge of the story.
- **Literary devices with SOYL's own lines** (*The fireflies were tiny lanterns over the paddy*), never the story's.
- **Textbook pointers:** title slide, "how to use" slide, summary slide, notes sections 1 and 7, exam tips and every passage stem.
- **NCERT exercise questions are not reused.** Where a classic question exists (why no surprise, what made him angry, who he blames), the stem is reframed around a different angle (what the calm tells us; how the mood changes; the second letter as an accusation).

### Reviewer checklist (english-literature)
- [ ] **No reproduction (critical):** no sentence, sentence frame or distinctive phrase of the story in slides, narration, notes, flashcards, stems, options, solutions, model answers or passages; passages are commentary, not retellings of a paragraph.
- [ ] Every claim about events and characters matches the story; nothing invented or overclaimed (e.g. who says what on the night after the storm is not attributed in the story).
- [ ] Re-answer every item blind; keys right; no second defensible option.
- [ ] Model answers within word limits (3-mark 40–50, 2-mark 30–40, 6-mark 100–120).
- [ ] Textbook pointer present on the title slide, notes and passage stems.
- [ ] Topics from the syllabus only; board pattern respected.

## Shape
**Deck (23 slides):** title (board-pattern table) → how to use → author and setting (table) → five stages (flow) → summary in four slides → check (ordering) → faith (two-column: strength / blindness) → irony (belief vs fact table) → theme web (table) → check → Lencho (trait/evidence table) → postmaster (table) → "Was Lencho ungrateful?" (two-column) → check → narrative technique → comparison practice with SOYL lines → word meanings (table) → worked example: planning a 6-mark answer (flow) → summary → exam tips. Narration max 69 words, mean 58. Visuals on 10 slides.

**Question bank (63 items, 161 marks):** source-based 7 (5 × 1 each, commentary passages) · short 3-mark 12 (models 40–45 words) · short 2-mark 6 (32–36 words) · long 6-mark 7 (character sketch, "postmaster is the hero", irony, nature, faith debate, postmaster's diary, Lencho's letter after learning the truth; 103–112 words) · mcq 14 · fill-blank 4 · assertion-reason 4 (keys a, b, d, c) · true-false 4 · ordering 2 · match 3.
- **Difficulty:** d1 8 · d2 28 · d3 20 · d4 7. **Competency:** recall 13 · understanding 20 · application 6 · analysis 19 · evaluation 5 → **48% application or higher** (literature recall is legitimate; higher-order items are the irony, character evaluation, faith debate and extrapolation tasks).
- **Schemes:** 3-mark = point (1) + explanation (1) + expression (1); 2-mark = point (1) + explanation (1); 6-mark = content 3 + interpretation 1 + organisation/expression 2.

**Tests:** short (20 marks, 40 min): A extract (5) · B 3 of 4 three-mark (9) · C 1 of 2 long (6). Long (40 marks, 90 min): A two extract pairs (10) · B 3 of 4 two-mark (6) · C 4 of 5 three-mark (12) · D two long pairs (12). No shared questions. Both tests follow the board's section pattern (5-mark extracts, 3-mark shorts in 40–50 words, 6-mark longs in 100–120 words) and match the subject's chapter-test blueprints item for item, so `blueprint_id` is `cbse-10-english-language-and-literature-chapter-test-short` / `-long` (blueprints revised 2026-10-27, catalog QA).

## Verifier record (author pass, 2026-10-27)
Every item re-answered from its stem; every factual claim checked against the story; every field scanned for echoes of the story's wording.
- **Reproduction fixes (first draft → final):** "a little more than half" (the author's phrase, 5 places) → "just over half"; the postmaster's admiring exclamation rebuilt as "wishing he had such faith himself" → "struck by a faith stronger than his own"; Lencho's reasoning about God rebuilt clause by clause ("could neither make a mistake nor refuse") → "sure that God never errs"; "sow his field again … until the crop comes" (the letter's wording) → "replant … until the next harvest"; "who sees all things" → removed; "the contentment of a man who has done a good deed" → "quietly pleased that his plan worked"; "not in the least surprised" → "takes the arrival of money calmly"; "a fat, cheerful man" (the narrator's description) → replaced with a plot fact; "an act of charity" → "for a good cause"; the house "on top of a low hill … could see the river and the field of ripe corn" (a description rebuilt in the author's order) → reframed as why the setting suits a farmer; the labourer-who-can-write contrast → "Lencho is able to write".
- **Accuracy fixes:** the story does not say who comforts the family on the night after the storm; three items had credited Lencho's wife → rewritten (the family consoles one another; a new 2-mark item on the change of mood; the match item now pairs "Lencho's family" with fearing hunger). "Townspeople see his faith as childish" overclaimed → "the post office staff will laugh". "Sleepless night" → "through the night".
- **Other:** competency band 43% → 48% after honest relabelling of three items; a 2-mark model at 22 words and a 3-mark model at 35 words lengthened; one 9-word quoted question on a slide de-quoted (lint quote review).
- **Pipeline checks:** `content lint --exemplars` 0 errors, 0 warnings (no `literature.quote-review` hits); `verify --authored` 63/63 pass; `originality --authored` 0 errors, 0 warnings.

## Known gaps
- No n-gram check against the actual text (reference texts are not supplied to `catalog/sources/reference/`); the reproduction review was manual, against the author's knowledge of the story. A human reviewer with the textbook should run the checklist above.
- Author facts are kept to what is well established (dates, nationality, Spanish original, *El Indio*).
