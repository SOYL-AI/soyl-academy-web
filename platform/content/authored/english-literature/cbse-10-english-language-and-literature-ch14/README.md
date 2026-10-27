# CBSE Class 10 English Language and Literature — Chapter 14: Fire and Ice (Robert Frost)

| | |
|---|---|
| Unit | `cbse-10-english-language-and-literature-ch14` (family `english-literature`) |
| Book | NCERT *First Flight*, poetry |
| Syllabus | `platform/catalog/cbse/10/english-language-and-literature/syllabus.yaml` (2026-27): t01 context and summary · t02 themes and message (fire = desire, ice = hatred) · t03 poetic devices, imagery and tone (symbolism, irony, understatement) · t04 exam practice. No removed topics. |
| Board weight | Section C: reference-to-context extract (5, meaning/tone/devices), First Flight short answers (3 marks, 40–50 words) |
| Files | `release.json` (1 deck of 22 slides; 7 notes sections; 28 flashcards; 62 questions with 35 passage children), `tests.json` (short 20 / 40 min; long 40 / 90 min), `src/` (builder; shared library in `../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs`) |
| Provenance | `origin: human`, `author: claude-opus-5-5 (subject-producer)`, every item `status: draft` |

Rebuild from `platform/`: `npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch14/src/build.mjs`.

## The literature rule for a nine-line poem

The poem is nine lines and about fifty words, so any run of its words is a large share of the text. The rule here is the ch13 (*Dust of Snow*) rule:

- **No line and no multi-word phrase of the poem** appears anywhere: not in slides, narration, notes, flashcards, stems, options, solutions, model answers, passages or this README. Only the **title** and **single words** (*fire, ice, desire, hate, perish, destruction, suffice*) are used.
- **The argument is described, not paraphrased line by line.** The opening is "an old debate: destruction by burning heat or by freezing cold"; the first choice is "judging from his own experience with desire, the speaker sides with the people expecting fire"; the second ending is "a second destruction, in which ice would be just as effective". The poem's own verbs, its paired openings, its tasting clause, its second-destruction clause and its closing three-line judgment are never rebuilt. The final word is taught by its meaning (*be enough*), never inside a line.
- **Devices are described as they work in the poem and illustrated with SOYL's own sentences** (e.g. *After the cyclone flattened the town, he said the weather had been a little rough* for understatement).
- **Extract questions use SOYL commentary** (`passage_origin: "soyl-commentary"`, 7 items), labelled in every stem, with a pointer to *First Flight*.
- **Textbook pointers:** title slide ("read it aloud, twice"), "how to read" slide, the understatement example, summary, notes sections 1 and 7, exam tips and every passage stem.
- **Every stem names the poem or its speaker** (*Fire and Ice*, Frost, the speaker), so the bank-duplicate check cannot match other poems' items.

### Reproduction scan (author, memory-based)
A scratchpad script compared every string of `release.json`, `tests.json` and this README with the poem as recalled from memory (the reference copy was never committed) and listed every shared word run of two or more words, with the title masked. Final result: **0 runs of three or more words; 0 content bigrams**; only function-word pairs remain (two everyday pairs, 4 uses, in ordinary sentences). Fixes made on the way are in the verifier record (described by position, so this README does not repeat them).

### Reviewer checklist (english-literature, poetry)
- [ ] **No reproduction (critical):** no line, phrase (2+ consecutive words of the poem beyond the title and function-word pairs) or line-by-line paraphrase anywhere; passages are commentary.
- [ ] Form facts: 9 lines, 1 stanza, rhyme scheme aba abc bcb (three sounds), three very short lines (the second and the last two).
- [ ] Symbolism stated accurately: fire = desire (greed, lust, ambition); ice = hatred (coldness, indifference). The speaker sides with fire first and says ice would also be enough; he does not reject fire.
- [ ] Re-answer every item blind; keys right; model answers within limits.

### Facts to confirm against the textbook
Stated in the content (believed correct; please confirm):
- Robert Frost (1874–1963), American; four Pulitzer Prizes for Poetry; *Fire and Ice* collected in *New Hampshire* (1923).
- Nine lines, one stanza, aba abc bcb; lines 2, 8 and 9 are the short ones.
- The poem is spoken in the first person.

Deliberately **left out** because they cannot be confirmed here or are not needed: the poem's first magazine publication (often given as *Harper's Magazine*, December 1920); the anecdote linking the poem to a conversation with the astronomer Harlow Shapley; the frequently suggested echo of the frozen lowest circle of Dante's *Inferno*; metrical labels (tetrameter, dimeter), which the board does not ask for.

## Shape
**Deck (22 slides):** title (board pattern) → how to read a very short poem → poet (table) → the poem at a glance (table) → the opening: an old question → the first choice: fire → check (fire symbol) → the second ending: ice → the argument (flow) → symbols (table) → fire versus ice (two-column) → check (assertion-reason) → themes → devices with SOYL examples (table) → worked point: understatement and irony at the close → tone → word meanings (table) → check (rhyme scheme) → worked example: a 47-word answer (flow) → check (*suffice*) → summary → exam tips. Narration max 69 words, mean 54. Visuals on 9 slides.

**Question bank (62 items, 155 marks):** source-based 7 (5 × 1 each, commentary on the opening debate, fire, ice, form, tone, theme, speaker) · short 3-mark 12 (44–48 words) · short 2-mark 6 (33–39) · long 6-mark 6 (109–112: emotions as destroyers, symbolism, an assembly speech, relevance today, a magazine article on school life, style) · mcq 14 · fill-blank 4 · assertion-reason 4 (keys b, a, c, d) · true-false 4 · ordering 2 · match 3.
- **Difficulty:** d1 8 · d2 23 · d3 25 · d4 6. **Competency:** recall 10 · understanding 19 · application 7 · analysis 22 · evaluation 4 → **53% application or higher**.
- **MCQ keys (14 top-level):** a 3 · b 4 · c 3 · d 4 (last MCQ fixed at c).
- Long answers are beyond the board's poem pattern (poems carry 3-mark answers) and are included as extended practice and for unit tests.

**Tests:** short (20 marks, 40 min): A extract (5) · B 3 of 4 three-mark (9) · C 1 of 2 long (6). Long (40 marks, 90 min): A two extract pairs (10) · B 3 of 4 two-mark (6) · C 4 of 5 three-mark (12) · D two long pairs (12). No shared questions; `blueprint_id` set to the subject's chapter-test blueprints, which these tests match item for item.

## Verifier record (author pass, 2026-10-27)
- Every item re-answered from its stem; form facts and symbolism checked; every student-facing string scanned for runs of the poem's words.
- **Reproduction fixes (first draft → final), described by position:** a three-word run from line 4 (slide, assertion, MCQ option) → "side(s) with the people expecting"; a three-word run from line 1 (speech model) → "will be destroyed by heat or by cold"; a three-word run from line 7 (tone passage) → "claiming that"; a two-word run from line 6 (slide) → "seen so much hatred"; a two-word run from line 3 (27 places: experience/symbol/picture of the emotion) → "experience with desire", "symbol for desire", "describes desire as"; a two-word run from line 1 (9 places) → "everything", "humanity", "around us"; a two-word run from line 7 (passage, fill-blank) → "to destroy us" / "places the ___ with us"; two further two-word runs from lines 1 and 7 reworded; a cross-line pair from lines 7–8 (10 places: the symbol name followed by a copula) → "ice stands for", "ice, by contrast, feels", "ice makes", "ice would work too".
- **Balance:** the last MCQ fixed at key c (a 4 · b 4 · c 2 · d 4 → a 3 · b 4 · c 3 · d 4).
- **Pipeline checks:** build validation 0 errors, 0 warnings (answer-leak, word limits, deterministic verify, lint).

## Known gaps
- The CBSE 2026-27 extract item for poems may mix MCQs and short completions differently; our commentary items use 3–4 MCQ/fill parts and 1 short part.
- Reference-text n-gram checks need the poem in `catalog/sources/reference/` (owner-supplied); the reproduction scan here was memory-based.
