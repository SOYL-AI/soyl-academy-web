# CBSE Class 10 English Language and Literature — Chapter 15: A Tiger in the Zoo (Leslie Norris)

| | |
|---|---|
| Unit | `cbse-10-english-language-and-literature-ch15` (family `english-literature`) |
| Book | NCERT *First Flight*, poetry |
| Syllabus | `platform/catalog/cbse/10/english-language-and-literature/syllabus.yaml` (2026-27): t01 context and summary · t02 themes and message (the tiger's life in the zoo vs in the wild) · t03 poetic devices, imagery and tone (imagery, alliteration, contrast) · t04 exam practice. No removed topics. |
| Board weight | Section C: reference-to-context extract (5, meaning/tone/devices), First Flight short answers (3 marks, 40–50 words) |
| Files | `release.json` (1 deck of 23 slides; 7 notes sections; 28 flashcards; 62 questions with 35 passage children), `tests.json` (short 20 / 40 min; long 40 / 90 min), `src/` (builder; shared library in `../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs`) |
| Provenance | `origin: human`, `author: claude-opus-5-5 (subject-producer)`, every item `status: draft` |

Rebuild from `platform/`: `npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch15/src/build.mjs`.

## The literature rule for a poem still in copyright

Leslie Norris died in 2006, so the poem is in copyright. The rule is the strictest of the poetry chapters:

- **No line and no multi-word phrase of the poem** appears anywhere: not in slides, narration, notes, flashcards, stems, options, solutions, model answers, passages or this README. Only the **title** and six **single words** for the word-meaning table (*stalks, lurking, snarling, fangs, terrorising, patrolling*) are used.
- **Stanzas are described by what happens, not paraphrased line by line.** Stanza 1: "the tiger paces a tiny space; his paws are silent but he is furious". Stanzas 2–3: "hunting unseen near water"; "prowling at the forest's edge, feared by villagers". Stanza 4: "shut in a bare, hard enclosure; his power held back by iron; he ignores the visitors". Stanza 5: "after dark he listens to the final human sounds and the guarding vehicles, and gazes at the stars". The poem's adjective–noun pairs, its line openings and its closing image are not rebuilt.
- **The famous devices are described, never quoted.** The oxymoron is "a word for silence paired with a word for fury"; the metaphor is "the paws compared to a soft, rich fabric"; the repetition is "one shining adjective for both the eyes and the stars"; the anaphora of stanzas 2–3 is taught as "twice the poet insists on what the tiger ought to be doing". Students are told to find each in *First Flight*.
- **Devices are illustrated with SOYL's own sentences** (e.g. *The prisoner sat in loud stillness* for oxymoron; *Six slim snakes slid silently south* for alliteration).
- **Extract questions use SOYL commentary** (`passage_origin: "soyl-commentary"`, 7 items), labelled in every stem, with a pointer to *First Flight*.
- **Textbook pointers:** title slide, "how to read" slide, the oxymoron worked point, summary, notes sections 1 and 7, exam tips and every passage stem.
- **Every stem names the poem, the poet or "the tiger in *A Tiger in the Zoo*"**, so the bank-duplicate check cannot match other poems' items.

### Reproduction scan (author, memory-based)
A scratchpad script compared every string of `release.json`, `tests.json` and this README with the poem as recalled from memory (the reference copy was never committed) and listed every shared word run of two or more words, with the title masked. Final result: **0 runs of three or more words; 0 content bigrams**; only function-word pairs remain (*at the*, *in a*, *in his*, *with his*, *of his*, and *should be* in "what the tiger should be doing", in ordinary sentences).

### Reviewer checklist (english-literature, poetry)
- [ ] **No reproduction (critical):** no line, phrase (2+ consecutive content words of the poem) or line-by-line paraphrase anywhere; passages are commentary. Pay special attention to the stanza slides (s05, s06, s08, s09), notes section 2 and `src_wild`, `src_cell`, `src_stars`.
- [ ] Form facts: 5 quatrains; loose rhyme, mainly lines 2 and 4; structure cage, wild, wild, cage, night.
- [ ] The forest stanzas are presented as imagined (what the tiger ought to be doing), not as events.
- [ ] Re-answer every item blind; keys right; model answers within limits.

### Facts to confirm against the textbook
Stated in the content (believed correct; please confirm):
- Leslie Norris (1921–2006), Welsh poet and short-story writer, often writing about animals and nature.
- Five stanzas of four lines; in most stanzas lines 2 and 4 rhyme or nearly rhyme (some are half-rhymes).
- Stanzas 2 and 3 both open by saying what the tiger ought to be doing; stanza 4 opens with a word of contrast.
- In the final stanza the tiger listens to human sounds and guarding vehicles after dark and gazes up at the stars; the same adjective describes his eyes and the stars.
- The repeated s sounds are in the first stanza.

Deliberately **left out** because they cannot be confirmed here or are not needed: Norris's birthplace and teaching career, the collection and year in which the poem first appeared, and any comparison with other animal poems the textbook may print alongside it.

## Shape
**Deck (23 slides):** title (board pattern) → how to read → poet (table) → the poem at a glance (table) → stanza 1: the enclosure → stanzas 2 and 3: the life he should have → check (where he should hunt) → stanza 4: back to the cage → stanza 5: after dark → the poem stanza by stanza (flow) → zoo versus wild (two-column + table) → check (assertion-reason) → themes → devices with SOYL examples (table) → worked point: the silent fury (oxymoron) → imagery and sound → tone → word meanings (table) → check (oxymoron) → worked example: a 46-word answer (flow) → check (*lurking*) → summary → exam tips. Narration max 64 words, mean 53. Visuals on 9 slides.

**Question bank (62 items, 155 marks):** source-based 7 (5 × 1 each, commentary on the enclosure, the wild, the return to the cage, the stars, the structure, the devices, the message) · short 3-mark 12 (44–50 words) · short 2-mark 6 (32–40) · long 6-mark 6 (105–115: contrast, the tiger's diary, should zoos exist, a letter to the editor, the final stanza, three devices) · mcq 14 · fill-blank 4 · assertion-reason 4 (keys b, a, c, d) · true-false 4 · ordering 2 · match 3.
- **Difficulty:** d1 9 · d2 20 · d3 27 · d4 6. **Competency:** recall 10 · understanding 19 · application 5 · analysis 24 · evaluation 4 → **53% application or higher**.
- **MCQ keys (14 top-level):** a 3 · b 4 · c 3 · d 4 (final MCQ fixed at c).
- Long answers are beyond the board's poem pattern (poems carry 3-mark answers) and are included as extended practice and for unit tests. The zoo-debate items invite a balanced view (conservation is named as the counter-argument).

**Tests:** short (20 marks, 40 min): A extract (5) · B 3 of 4 three-mark (9) · C 1 of 2 long (6). Long (40 marks, 90 min): A two extract pairs (10) · B 3 of 4 two-mark (6) · C 4 of 5 three-mark (12) · D two long pairs (12). No shared questions; `blueprint_id` set to the subject's chapter-test blueprints, which these tests match item for item.

## Verifier record (author pass, 2026-10-27)
- Every item re-answered from its stem; stanza order and form facts checked; every student-facing string scanned for runs of the poem's words.
- **Reproduction fixes (first draft → final), described by position:** the three-word opening of stanzas 2 and 3 (10 places: slide, narration, notes, models, ordering options) → "he ought to be"; a three-word run from stanza 5, line 1 (notes, flashcard) and its two-word core (5 places) → "listens to the"; a two-word time phrase from stanza 5 (4 places) → "after dark"; a two-word run of stanza 5's opening adjective with its article (9 places) → "the final"; a two-word run from stanza 4, line 2 (8 places) → "his power", "all that power"; the closing two words of stanza 4 (flashcard, solution) → reworded with an article; a three-word run from stanza 3 (2-mark model) → "close to homes on the forest's edge"; two cross-sentence pairs → reworded.
- **Balance:** the final MCQ fixed at key c (a 4 · b 4 · c 2 · d 4 → a 3 · b 4 · c 3 · d 4).
- **Pipeline checks:** build validation 0 errors, 0 warnings (answer-leak, word limits, deterministic verify, lint).

## Known gaps
- The CBSE 2026-27 extract item for poems may mix MCQs and short completions differently; our commentary items use 3–4 MCQ/fill parts and 1 short part.
- Reference-text n-gram checks need the poem in `catalog/sources/reference/` (owner-supplied); the reproduction scan here was memory-based.
