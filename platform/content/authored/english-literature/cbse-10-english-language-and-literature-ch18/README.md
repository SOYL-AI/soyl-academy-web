# CBSE Class 10 English Language and Literature — Chapter 18: Amanda! (Robin Klein)

| | |
|---|---|
| Unit | `cbse-10-english-language-and-literature-ch18` (family `english-literature`) |
| Book | NCERT *First Flight*, poetry |
| Syllabus | `platform/catalog/cbse/10/english-language-and-literature/syllabus.yaml` (2026-27): t01 context and summary · t02 themes and message (the child's desire for freedom and the effect of constant nagging) · t03 poetic devices, imagery and tone (parentheses, imagery, allusion) · t04 exam practice. No removed topics. |
| Board weight | Section C: reference-to-context extract (5, meaning/tone/devices), First Flight short answers (3 marks, 40–50 words) |
| Files | `release.json` (1 deck of 22 slides; 7 notes sections; 28 flashcards; 62 questions with 35 passage children), `tests.json` (short 20 / 40 min; long 40 / 90 min), `src/` (builder; `src/guard.mjs` is the reproduction guard shared by ch18–ch22; the shared library is `../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs`, unchanged) |
| Provenance | `origin: human`, `author: claude-opus-5-5 (subject-producer)`, every item `status: draft` |

Rebuild from `platform/`: `npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch18/src/build.mjs`. The build prints `NO ERRORS` and then `REPRODUCTION GUARD: 0 hits`.

## The literature rule for a poem still in copyright

Robin Klein is a living author, so the poem is in copyright. The rule is applied strictly (CONTEXT §8–§9, D-036):

- **No line and no multi-word phrase of the poem** appears anywhere: not in slides, narration, notes, flashcards, stems, options, solutions, model answers, passages or this README. Only the **title**, the girl's **name**, the fairy-tale name *Rapunzel* and **single words** for the word-meaning table (*hunch, slouching, languid, acne, emerald, tranquil, sulking*) are used.
- **The adult's commands are named as topics** (nail-biting, posture, homework, an untidy room, dirty shoes, chocolate and her skin, attention while being spoken to, sulking and moods). They are never written out as commands.
- **Amanda's daydreams are described by idea, not paraphrased line by line:** a mermaid floating alone in a calm green sea; an orphan wandering barefoot through quiet, dusty streets; Rapunzel content in her tower, refusing to lower her hair.
- **The ending is explained, not rebuilt:** "the adult scolds her for sulking and moods, then protests that nobody should think she nags".
- **Devices are illustrated with SOYL's own sentences** (for example, *I nodded at the lecture (and sailed off to Mars).* for parentheses).
- **Extract questions use SOYL commentary** (`passage_origin: "soyl-commentary"`, 7 items), labelled in every stem, with a pointer to *First Flight*.
- **Textbook pointers:** title slide, "how to read" slide, summary, notes sections 1 and 7, exam tips and every passage stem.
- **Every stem names *Amanda!*, its poet, Amanda or the adult in the poem.**

### Reproduction checks (D-036 method)
- **No reconstructed poem text was written anywhere,** not even in scratch files. The content was authored in SOYL's own words from an understanding of the poem's structure, imagery and devices.
- **Forbidden-phrase guard:** `src/build.mjs` holds a list of 27 short distinctive phrases of the poem (each 4 words or fewer, never a whole line). After writing the files, `src/guard.mjs` scans every string of `release.json` and `tests.json` and every line of this README, ignoring case and punctuation, and fails the build on any hit. The final build has **0 hits**. One hit was caught while drafting: an imagery phrase in the long answer on the two worlds, also used in notes section 4 and the devices table. It was reworded, and its two-word core was added to the list.
- **Author's re-read after ch21 (three-word runs):** one short run of a preposition, an article and the tower noun (6 places) was found and added to the guard. It now reads "inside a tower" or "at the top of a tower".
- **Repo checks:** `content lint --exemplars` (literature quote and verse-shape rules) and `content originality --authored` both report 0 errors and 0 warnings for this unit.
- **Still to do:** a real n-gram check against the printed poem needs the owner to supply the text in `catalog/sources/reference/` (OA-16). Until then a reviewer with *First Flight* should run the checklist below.

### Reviewer checklist (english-literature, poetry)
- [ ] **No reproduction (critical):** no line, phrase or line-by-line paraphrase anywhere; passages are commentary. Look especially at the adult's-voice slide (s05), Amanda's escapes slide (s06), notes section 2, `sa_complaints`, `src_orphan`, `src_rapunzel` and `la_two_worlds`.
- [ ] Facts: two voices; the bracketed stanzas are Amanda's daydreams; the order of the daydreams is mermaid, orphan, Rapunzel; the last stanza scolds her for sulking and ends with the adult's ironic denial.
- [ ] Re-answer every item blind; check the keys; check that model answers are within their limits.

### Facts to confirm against the textbook
The content states the following, which we believe is correct. Please confirm:
- Robin Klein: Australian, born 1936, writes for children and young people; best-known novel *Hating Alison Ashley*.
- The poem has **seven stanzas**. The adult speaks stanzas 1, 3, 5 and 7, and the bracketed daydreams are stanzas 2, 4 and 6.
- **Each bracketed stanza is three lines with a single rhyme sound.** The adult's stanzas are held together by the repeated name rather than by rhyme.
- The adult is "probably Amanda's mother". The poem implies this but does not say it, so the content always hedges it.
- The complaint about her skin suggests that Amanda is about eleven to thirteen. `sb_acne` says this as an inference.
- The topics of the adult's corrections, in order: nail-biting and posture; homework, room and shoes; chocolate and skin, and attention; sulking and moods.

**Left out** because they cannot be confirmed here or are not needed:
- the year the poem was written or published, and its collection;
- whether Robin Klein is living, and any further biography;
- any metrical description.

## Shape
**Deck (22 slides):**
1. title (board pattern)
2. how to read
3. the poet (table)
4. the poem at a glance (table)
5. the adult's voice
6. Amanda's escapes
7. check: what the daydreams share
8. why these dreams?
9. the ending
10. the poem's pattern (flow)
11. two worlds (two-column + table)
12. check: assertion-reason
13. themes
14. devices with SOYL examples (table)
15. worked point: the brackets
16. tone
17. word meanings (table)
18. check: the brackets
19. worked example: a 44-word answer (flow)
20. check: allusion
21. summary
22. exam tips

Narration: max 62 words, mean 50. Visuals on 9 slides.

**Question bank (62 items, 155 marks):**

| Type | Count | Detail |
|---|---|---|
| Source-based | 7 (5 × 1 mark each) | commentary on the nagging, the mermaid, the orphan, Rapunzel, the ending, the form, the adult |
| Short, 3 marks | 12 | models 44–47 words |
| Short, 2 marks | 6 | models 31–35 words |
| Long, 6 marks | 6 | models 108–120 words: freedom, Amanda's diary, which character we sympathise with, a letter about a silent sister, the two worlds, guiding teenagers today |
| MCQ | 14 | |
| Fill-blank | 4 | |
| Assertion-reason | 4 | keys a, b, d, c |
| True-false | 4 | |
| Ordering | 2 | |
| Match | 3 | |

- **Difficulty:** d1 7 · d2 20 · d3 29 · d4 6.
- **Competency:** recall 7 · understanding 19 · application 5 · analysis 24 · evaluation 7. That makes **58% application or higher**.
- **MCQ keys (14 top-level):** a 3 · b 4 · c 3 · d 4. The final MCQ is fixed at c.
- Long answers go beyond the board's poem pattern, where poems carry 3-mark answers. They are included as extended practice and for unit tests.

**Tests:**

| Test | Section | Content | Marks |
|---|---|---|---|
| Short (20 marks, 40 min) | A | extract | 5 |
| | B | 3 of 4 three-mark | 9 |
| | C | 1 of 2 long | 6 |
| Long (40 marks, 90 min) | A | two extract pairs | 10 |
| | B | 3 of 4 two-mark | 6 |
| | C | 4 of 5 three-mark | 12 |
| | D | two long pairs | 12 |

The two tests share no questions. `blueprint_id` is set to the subject's chapter-test blueprints, and both tests match them item for item.

## Verifier record (author pass, 2026-10-27)
- Every item was re-answered from its stem. The order of the daydreams, the brackets and the ending were checked. Every stem names the poem, the poet, Amanda or the adult.
- The forbidden-phrase guard caught one imagery phrase (see above). It was reworded in three places.
- **Word limits:** every model is inside its exact limit (3-mark 44–47, 2-mark 31–35, long 108–120), not just inside the builder's ±20% gate.
- **Pipeline checks:** build validation reports 0 errors and 0 warnings (answer-leak, word limits, deterministic verify, lint).

## Known gaps
- The CBSE 2026-27 extract item for poems may mix MCQs and short completions differently. Our commentary items use 3–4 MCQ or fill-in parts and 1 short part, as in ch13–ch17.
- A real-text n-gram check needs the poem in `catalog/sources/reference/` (owner-supplied, OA-16).
