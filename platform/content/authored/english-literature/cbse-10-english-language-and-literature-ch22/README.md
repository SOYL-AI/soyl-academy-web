# CBSE Class 10 English Language and Literature — Chapter 22: For Anne Gregory (W. B. Yeats)

| | |
|---|---|
| Unit | `cbse-10-english-language-and-literature-ch22` (family `english-literature`) |
| Book | NCERT *First Flight*, poetry |
| Syllabus | `platform/catalog/cbse/10/english-language-and-literature/syllabus.yaml` (2026-27): t01 context and summary · t02 themes and message (the contrast between outer beauty and inner worth) · t03 poetic devices, imagery and tone (the dialogue form and the imagery of hair) · t04 exam practice. No removed topics. |
| Board weight | Section C: reference-to-context extract (5, meaning/tone/devices), First Flight short answers (3 marks, 40–50 words) |
| Files | `release.json` (1 deck of 22 slides; 7 notes sections; 28 flashcards; 62 questions with 35 passage children), `tests.json` (short 20 / 40 min; long 40 / 90 min), `src/` (builder; the reproduction guard is `../cbse-10-english-language-and-literature-ch18/src/guard.mjs`; the shared library is `../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs`, unchanged) |
| Provenance | `origin: human`, `author: claude-opus-5-5 (subject-producer)`, every item `status: draft` |

Rebuild from `platform/`: `npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch22/src/build.mjs`. The build prints `NO ERRORS` and then `REPRODUCTION GUARD: 0 hits`.

## The literature rule

Yeats died in 1939. The poem's copyright status varies by country and edition, so it is handled exactly like the in-copyright poems (CONTEXT §8–§9, D-036). It is also very short, eighteen lines with a near-refrain, so even a phrase is a large share of it.

- **No line and no multi-word phrase of the poem** appears anywhere: not in slides, narration, notes, flashcards, stems, options, solutions, model answers, passages or this README. Only the **title**, the names and **single words** are used. The words in the word-meaning table are *ramparts*, *despair*, *carrot*, *declare*, *yesternight* and *text*.
- **The poem's own words for key ideas are always replaced:**
  - the admirers are "suitors" or "admirers";
  - the hair colour is "golden";
  - the devout figure is "an elderly, devout man";
  - the conclusion is "God alone can love a person purely for herself".
- **Each stanza is described by what its speaker argues,** not paraphrased line by line. The three stanzas are the warning, Anne's plan to dye her hair, and the report of the scripture claim.
- **The hair metaphor and the refrain are described, never quoted.** The metaphor is "honey-coloured walls of a fortress around her ears". The refrain is "nearly the same idea, being loved for one's true self rather than one's hair, closes each stanza".
- **Devices are illustrated with SOYL's own sentences** (for example, *Her smile was a lighthouse in the crowded hall.* for metaphor).
- **Extract questions use SOYL commentary** (`passage_origin: "soyl-commentary"`, 7 items), labelled in every stem, with a pointer to *First Flight*.
- **Textbook pointers:** title slide, "how to read" slide, summary, notes sections 1 and 7, exam tips and every passage stem.
- **Every stem names *For Anne Gregory*, Yeats, Anne or the older speaker.**

### Reproduction checks (D-036 method)
- **No reconstructed poem text was written anywhere,** not even in scratch files.
- **Forbidden-phrase guard:** `src/build.mjs` holds a list of 34 short distinctive phrases of the poem (each 4 words or fewer, never a whole line). After writing the files, the shared guard scans every string of `release.json` and `tests.json` and every line of this README, ignoring case and punctuation, and fails the build on any hit. The final build has **0 hits**.
- **What the guard caught in the first draft, described by position:**
  - the poem's two-word phrase naming who alone can love unconditionally (32 places), now "God alone";
  - the poem's two- and three-word name for the devout figure (4 places), now "an elderly, devout man" or "churchman";
  - the poem's pronoun + verb + preposition run for being loved (1 place), now "value me for";
  - the poem's colour list with its conjunction (1 place), now "dark brown, jet black";
  - the noun + noun pair for colouring the hair (1 place), now "dyes";
  - the archaic word next to the verb that follows it in the poem (3 places, in word lists), now reordered.
- **Author's re-read:** the refrain's frame "for … alone" was removed everywhere (6 places), even with a different pronoun, and now reads "purely for herself".
- **Repo checks:** `content lint --exemplars` (literature quote and verse-shape rules) and `content originality --authored` both report 0 errors and 0 warnings for this unit.
- **Still to do:** a real n-gram check against the printed poem needs the owner to supply the text in `catalog/sources/reference/` (OA-16).

### Reviewer checklist (english-literature, poetry)
- [ ] **No reproduction (critical):** no line, phrase or line-by-line paraphrase anywhere; passages are commentary. Look especially at the three stanza slides (s05, s06, s08), notes section 2, `src_warning`, `src_reply`, `src_god`, `src_metaphor` and `sa_speaker_says`.
- [ ] Facts:
  - three six-line stanzas;
  - the older speaker has stanzas 1 and 3 and Anne has stanza 2;
  - Anne proposes dyeing, not cutting, her hair, and names three colours;
  - the speaker heard the devout man the night before;
  - the claim rests on a text of scripture.
- [ ] Re-answer every item blind; check the keys; check that model answers are within their limits.

### Facts to confirm against the textbook
The content states the following, which we believe is correct. Please confirm:
- W. B. Yeats: 1865–1939, Irish poet and dramatist; Nobel Prize in Literature 1923; a leader of the Irish literary revival; co-founded the Abbey Theatre with Lady Augusta Gregory.
- Anne Gregory was **Lady Gregory's granddaughter**.
- Yeats was "in his sixties" when he wrote the poem (`src_ages`). This is believed to be around 1930.
- **Rhyme on lines 2, 4 and 6** of each stanza.
- Anne's colours are brown, black and carrot (orange-red). The content gives them as "brown, black or orange-red" or "dark brown, jet black or even carrot-orange".

**Left out** because they cannot be confirmed here or are not needed:
- the year of composition and the collection the poem appeared in;
- Anne Gregory's exact age;
- any metrical description;
- further biography of the poet.

## Shape
**Deck (22 slides):**
1. title (board pattern)
2. how to read
3. the poet (table)
4. the poem at a glance (table)
5. stanza 1: the warning
6. stanza 2: Anne's answer
7. check: Anne's solution
8. stanza 3: the last word
9. what the ending means
10. a debate in three stanzas (flow)
11. two speakers, two views (two-column + table)
12. check: assertion-reason
13. themes
14. devices with SOYL examples (table)
15. worked point: the fortress metaphor
16. tone
17. word meanings (table)
18. check: the form
19. worked example: a 44-word answer (flow)
20. check: refrain
21. summary
22. exam tips

Narration: max 61 words, mean 48. Visuals on 9 slides.

**Question bank (62 items, 155 marks):**

| Type | Count | Detail |
|---|---|---|
| Source-based | 7 (5 × 1 mark each) | commentary on the warning, Anne's reply, the last stanza, the dialogue form, the metaphor, youth and age, the poet |
| Short, 3 marks | 12 | models 44–50 words |
| Short, 2 marks | 6 | models 31–34 words |
| Long, 6 marks | 6 | models 113–118 words: beauty and inner worth, Anne's diary, whether only divine love is unconditional, a letter to a friend, form and devices, relevance in the age of filters |
| MCQ | 14 | |
| Fill-blank | 4 | |
| Assertion-reason | 4 | keys c, a, d, b |
| True-false | 4 | |
| Ordering | 2 | |
| Match | 3 | |

- **Difficulty:** d1 6 · d2 25 · d3 25 · d4 6.
- **Competency:** recall 7 · understanding 23 · application 5 · analysis 21 · evaluation 6. That makes **52% application or higher**.
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
- Every item was re-answered from its stem. The speakers of each stanza, Anne's plan and the final claim were checked.
- **Guard fixes:** see above.
- **Literature lint:** the dialogue example in the devices table first used quotation marks. It was rewritten as reported speech.
- **Assertion-reason order:** the first draft had keys a, d, b, c, the same order as ch20. `ar_form` now comes first, so the keys run c, a, d, b.
- **Word limits:** every model is inside its exact limit.
- **Pipeline checks:** build validation reports 0 errors and 0 warnings.

## Known gaps
- The CBSE 2026-27 extract item for poems may mix MCQs and short completions differently. Our commentary items use 3–4 MCQ or fill-in parts and 1 short part, as in ch13–ch21.
- A real-text n-gram check needs the poem in `catalog/sources/reference/` (owner-supplied, OA-16).
