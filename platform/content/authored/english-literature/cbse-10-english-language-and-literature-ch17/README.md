# CBSE Class 10 English Language and Literature — Chapter 17: The Ball Poem (John Berryman)

| | |
|---|---|
| Unit | `cbse-10-english-language-and-literature-ch17` (family `english-literature`) |
| Book | NCERT *First Flight*, poetry |
| Syllabus | `platform/catalog/cbse/10/english-language-and-literature/syllabus.yaml` (2026-27): t01 context and summary · t02 themes and message (the boy's first experience with loss and responsibility) · t03 poetic devices, imagery and tone (symbolism of the ball, tone) · t04 exam practice. No removed topics. |
| Board weight | Section C: reference-to-context extract (5, meaning/tone/devices), First Flight short answers (3 marks, 40–50 words) |
| Files | `release.json` (1 deck of 22 slides; 7 notes sections; 28 flashcards; 62 questions with 35 passage children), `tests.json` (short 20 / 40 min; long 40 / 90 min), `src/` (builder; shared library in `../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs`) |
| Provenance | `origin: human`, `author: claude-opus-5-5 (subject-producer)`, every item `status: draft` |

Rebuild from `platform/`: `npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch17/src/build.mjs`.

## The literature rule for a poem still in copyright

John Berryman died in 1972, so the poem is in copyright. Its famous phrases (the philosophical phrase near the end, the sentence about money, the closing reflection) are exactly what exam guides quote, so the rule is applied strictly:

- **No line and no multi-word phrase of the poem** appears anywhere: not in slides, narration, notes, flashcards, stems, options, solutions, model answers, passages or this README. Only the **title** and **single words** for the word-meaning table (*harbour, rigid, intrude, dime, epistemology, external*) and a few single key words (*possessions, responsibility*) are used.
- **The poem is described by what happens and what it means, not paraphrased line by line:** the incident ("the ball bounces cheerfully along a street before dropping into a harbour's water"); the grief ("he remains frozen and trembling as he stares into the harbour's water"); the decision ("the watching adult chooses not to offer a coin or a new ball"); the lesson ("his first lesson in the responsibility that comes with owning things; money cannot bring back what was loved; loss must be borne, by everyone, most people many times").
- **The key philosophical phrase is taught by meaning, never quoted:** "near the end, the poet uses a philosophical word for the study of knowledge, joined to the idea of losing: the boy is gaining knowledge about what loss is and how to bear it". The single word *epistemology* is defined; the phrase is not printed.
- **The money sentence is explained, not rebuilt:** "money stands outside the real experience; it can pay for another object but not the one that was loved".
- **Devices are illustrated with SOYL's own sentences** (e.g. *What can a kite do once its string has snapped?* for a rhetorical question; *The empty swing stood for the friend who had moved away* for symbolism).
- **Extract questions use SOYL commentary** (`passage_origin: "soyl-commentary"`, 7 items), labelled in every stem, with a pointer to *First Flight*.
- **Textbook pointers:** title slide, "how to read" slide, the symbol worked point, summary, notes sections 1 and 7, exam tips and every passage stem.
- **Every stem names the poem, the poet, the boy or the speaker of *The Ball Poem*.**

### Reproduction scan (author, memory-based)
A scratchpad script compared every string of `release.json`, `tests.json` and this README with the poem as recalled from memory (the reference copy was never committed) and listed every shared word run of two or more words, with the title masked. Final result: **0 runs of three or more words; 0 content bigrams** other than two **article + key-noun pairs** that cannot be avoided in a poem about a child and his toy (*the boy*, *a ball*; accepted, as ch13 accepted *a crow*). Function-word pairs (*he is*, *into the*, *how to* …) remain in ordinary sentences.

### Reviewer checklist (english-literature, poetry)
- [ ] **No reproduction (critical):** no line, phrase (2+ consecutive content words of the poem beyond *the boy* / *a ball*) or line-by-line paraphrase anywhere; passages are commentary. Pay special attention to the lesson slide (s09), notes section 2, `src_responsibility`, `src_learning_loss`, `sa_epistemology`, `sa_money` and `la_growing_up`.
- [ ] Facts: free verse; the ball goes into a harbour; the speaker is an adult observer (not the boy) who decides not to offer money or a replacement; the speaker addresses the boy directly once.
- [ ] *Epistemology* explained correctly (the study of knowledge), and the phrase never quoted.
- [ ] Re-answer every item blind; keys right; model answers within limits.

### Facts to confirm against the textbook
Stated in the content (believed correct; please confirm):
- John Berryman (1914–1972), American; linked with the Confessional poets; Pulitzer Prize for Poetry for *77 Dream Songs*.
- The poem is free verse in one continuous stanza (the content says "one continuous stanza" in the at-a-glance table, the notes and an MCQ distractor set; please confirm the *First Flight* layout).
- The poem opens with a question; the ball's cheerful movement is described twice; the ball ends up in a harbour's water; the speaker considers and rejects offering a coin (the dime) or a replacement; the speaker briefly addresses the boy directly; near the end the poet uses the word *epistemology*; the poem ends by reflecting that everyone must learn this, most people many times.

Deliberately **left out** because they cannot be confirmed here or are not needed: the year the poem was written or first published, the number of lines, any longer published version of the poem, and biographical details of the poet beyond those above.

## Shape
**Deck (22 slides):** title (board pattern) → how to read → poet (table) → the poem at a glance (table) → the incident → the boy's grief → check (the speaker's choice) → the speaker's decision → the lesson: responsibility and loss → from incident to lesson (flow) → surface and depth (two-column + table) → check (assertion-reason) → themes → devices with SOYL examples (table) → worked point: the ball as a symbol → tone → word meanings (table) → check (free verse) → worked example: a 45-word answer (flow) → check (*epistemology*) → summary → exam tips. Narration max 64 words, mean 51. Visuals on 9 slides.

**Question bank (62 items, 155 marks):** source-based 7 (5 × 1 each, commentary on the incident, the grief, the decision not to replace the ball, responsibility, learning about loss, form, the speaker) · short 3-mark 12 (44–49 words) · short 2-mark 6 (33–35) · long 6-mark 6 (113–116: growing up, the boy's diary, the speaker's choice, a letter to a younger cousin, the symbolism of the ball, instant replacement today) · mcq 14 · fill-blank 4 · assertion-reason 4 (keys b, a, c, d) · true-false 4 · ordering 2 · match 3.
- **Difficulty:** d1 9 · d2 20 · d3 26 · d4 7. **Competency:** recall 10 · understanding 19 · application 5 · analysis 22 · evaluation 6 → **53% application or higher**.
- **MCQ keys (14 top-level):** a 3 · b 4 · c 3 · d 4 (final MCQ fixed at c).
- Long answers are beyond the board's poem pattern (poems carry 3-mark answers) and are included as extended practice and for unit tests.

**Tests:** short (20 marks, 40 min): A extract (5) · B 3 of 4 three-mark (9) · C 1 of 2 long (6). Long (40 marks, 90 min): A two extract pairs (10) · B 3 of 4 two-mark (6) · C 4 of 5 three-mark (12) · D two long pairs (12). No shared questions; `blueprint_id` set to the subject's chapter-test blueprints, which these tests match item for item.

## Verifier record (author pass, 2026-10-27)
- Every item re-answered from its stem; incident facts and the speaker's role checked; every student-facing string scanned for runs of the poem's words.
- **Reproduction fixes (first draft → final), described by position:** the poem's three-word phrase for where the ball ends up (4 places) and its two-word core (49 places) → "a harbour's water", "the harbour's water"; the poem's verb for the boy's stance (13 places) → "remains frozen"; a two-word cross-comma pair from the boy's stance (5 places) → "trembling as he stares"; the poem's phrase for the boy's learning (two- and three-word runs, 8 places) → "is discovering"; the poem's two-word run on possessions going missing (10 places) → "can disappear", "go missing"; the noun phrase of the philosophical line (11 places) → "experience with loss", "knowledge about loss", "the idea of losing"; the phrase naming where the ball bounces (two- and three-word runs, 10 places) → "along a street before dropping …", "a street"; the boy's possessive with the toy (6 places) → "the ball"; the poem's coin phrase (4 places) → "the word *dime*", "the dime"; the poem's replacement phrase (3 places) → "a replacement", "a second ball"; the poem's verb for buying (4 places) → "gets", "pays for"; a cross-comma pair of the toy with a copula (14 places) → "the toy ball stands for", "seems", "means"; single runs (the opening's question frame, the closing negation, the address to the boy, money with a copula, the sensing verb, the world phrase) → reworded.
- **Build slip caught:** the bulk rewording first left unescaped apostrophes in two source files; the build failed on parse and the apostrophes were escaped before any output was written.
- **Limits and balance:** one 3-mark model trimmed from 51 words to 46; the final MCQ fixed at key c (a 4 · b 4 · c 2 · d 4 → a 3 · b 4 · c 3 · d 4).
- **Pipeline checks:** build validation 0 errors, 0 warnings (answer-leak, word limits, deterministic verify, lint).

## Known gaps
- The CBSE 2026-27 extract item for poems may mix MCQs and short completions differently; our commentary items use 3–4 MCQ/fill parts and 1 short part.
- Reference-text n-gram checks need the poem in `catalog/sources/reference/` (owner-supplied); the reproduction scan here was memory-based.
