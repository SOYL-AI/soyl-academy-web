# CBSE Class 10 English Language and Literature — Chapter 20: Fog (Carl Sandburg)

| | |
|---|---|
| Unit | `cbse-10-english-language-and-literature-ch20` (family `english-literature`) |
| Book | NCERT *First Flight*, poetry |
| Syllabus | `platform/catalog/cbse/10/english-language-and-literature/syllabus.yaml` (2026-27): t01 context and summary · t02 themes and message (how fog is compared to a cat) · t03 poetic devices, imagery and tone (the extended metaphor and free verse) · t04 exam practice. No removed topics. |
| Board weight | Section C: reference-to-context extract (5, meaning/tone/devices), First Flight short answers (3 marks, 40–50 words) |
| Files | `release.json` (1 deck of 22 slides; 7 notes sections; 28 flashcards; 62 questions with 35 passage children), `tests.json` (short 20 / 40 min; long 40 / 90 min), `src/` (builder; the reproduction guard is `../cbse-10-english-language-and-literature-ch18/src/guard.mjs`; the shared library is `../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs`, unchanged) |
| Provenance | `origin: human`, `author: claude-opus-5-5 (subject-producer)`, every item `status: draft` |

Rebuild from `platform/`: `npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch20/src/build.mjs`. The build prints `NO ERRORS` and then `REPRODUCTION GUARD: 0 hits`.

## The literature rule for a six-line poem

*Fog* was first published in 1916, and its copyright status varies by country. It is also only six short lines long, so even one phrase would be a large share of it. The rule is applied as strictly as for the copyright poems (CONTEXT §8–§9, D-036):

- **No line and no multi-word phrase of the poem** appears anywhere: not in slides, narration, notes, flashcards, stems, options, solutions, model answers, passages or this README. Only the **title** and **single words** are used, such as *haunches*, *harbour*, *city* and *silent*.
- **The poem is never paraphrased in line order.** With six lines, an ordered paraphrase would rebuild it. Instead, the fog's four actions are described by idea, in SOYL wording:
  - it creeps in softly, as a cat does on padded paws;
  - it settles on its back legs;
  - it gazes over a harbour and a city;
  - it gets up and leaves without warning.
- **The extended metaphor is explained, never quoted.** The poem's own words for the cat's feet, its sitting and its leaving are avoided.
- **Devices are illustrated with SOYL's own sentences** (for example, an extended metaphor of a traffic jam as a python).
- **Extract questions use SOYL commentary** (`passage_origin: "soyl-commentary"`, 7 items), labelled in every stem, with a pointer to *First Flight*.
- **Textbook pointers:** title slide, "how to read" slide, summary, notes sections 1 and 7, exam tips and every passage stem.
- **Every stem names *Fog*, Carl Sandburg or the fog in the poem.**

### Reproduction checks (D-036 method)
- **No reconstructed poem text was written anywhere,** not even in scratch files.
- **Forbidden-phrase guard:** `src/build.mjs` holds a list of 12 short distinctive phrases of the poem (each 4 words or fewer, never a whole line). It covers both spellings of the harbour phrase. After writing the files, the shared guard scans every string of `release.json` and `tests.json` and every line of this README, ignoring case and punctuation, and fails the build on any hit. The final build has **0 hits**.
- **What the guard caught in the first draft:**
  - the poem's subject + verb pair for the arrival (9 places), reworded to "arrives";
  - the poem's place phrase without an article (4 places), now "the harbour and the city";
  - one preposition + adjective pair for the paws (1 place), now "soundless".
- **Author's re-read after ch21:** one pronoun + verb pair for the fog's sitting (1 place) was found and added to the guard. It now reads "It rests".
- **Repo checks:** `content lint --exemplars` (literature quote and verse-shape rules) and `content originality --authored` both report 0 errors and 0 warnings for this unit.
- **Still to do:** a real n-gram check against the printed poem needs the owner to supply the text in `catalog/sources/reference/` (OA-16).

### Reviewer checklist (english-literature, poetry)
- [ ] **No reproduction (critical):** no line, phrase or ordered paraphrase anywhere; passages are commentary. Look especially at the two stanza slides (s05, s06), notes section 2, `src_arrival`, `src_watching`, `sa_cat`, `sa_sitting`, `ord_actions` and `la_extended`.
- [ ] Facts:
  - two stanzas of two and four lines, free verse;
  - the fog behaves as a cat, and the comparison is a metaphor, not a simile;
  - the fog looks over a harbour and a city;
  - it leaves at the end.
- [ ] Re-answer every item blind; check the keys; check that model answers are within their limits.

### Facts to confirm against the textbook
The content states the following, which we believe is correct. Please confirm:
- **Carl Sandburg's life and work:**
  - 1878–1967; grew up in Illinois, the son of Swedish immigrants;
  - poet, journalist and biographer, known as a poet of Chicago;
  - **three Pulitzer Prizes**: two for poetry and one (for history) for his Abraham Lincoln biography.
- *Fog* first appeared in ***Chicago Poems* (1916)**. The `src_poet` passage, `mc_collection` and the poet table use this.
- **Six lines in two stanzas** (two lines, then four).
- The poem is described as "close to imagism" in style. This is an interpretive label, not a claim that Sandburg belonged to the Imagist group.

**Left out:**
- the prize years and the titles of the prize-winning books;
- any metrical description;
- the poem's place in *Chicago Poems*.

## Shape
**Deck (22 slides):**
1. title (board pattern)
2. how to read
3. the poet (table)
4. the poem at a glance (table)
5. stanza 1: the arrival
6. stanza 2: watching, then leaving
7. check: the animal
8. why a cat? (table)
9. metaphor, not simile
10. the fog's visit (flow)
11. cat and fog (two-column + table)
12. check: assertion-reason
13. themes
14. devices with SOYL examples (table)
15. worked point: why the title matters
16. tone and mood
17. words and terms (table)
18. check: the form
19. worked example: a 44-word answer (flow)
20. check: metaphor
21. summary
22. exam tips

Narration: max 62 words, mean 50. Visuals on 10 slides.

**Question bank (62 items, 155 marks):**

| Type | Count | Detail |
|---|---|---|
| Source-based | 7 (5 × 1 mark each) | commentary on the arrival, the watching, the extended metaphor, the form, the city, the mood, the poet |
| Short, 3 marks | 12 | models 42–49 words. `sa_apply` asks students to write their own weather-as-animal extended metaphor. |
| Short, 2 marks | 6 | models 30–37 words |
| Long, 6 marks | 6 | models 112–116 words: the extended metaphor, the fog's diary, nature and the city, a letter explaining extended metaphor, vivid imagery in few words, fog as nuisance or grace |
| MCQ | 14 | |
| Fill-blank | 4 | |
| Assertion-reason | 4 | keys a, d, b, c |
| True-false | 4 | |
| Ordering | 2 | |
| Match | 3 | |

- **Difficulty:** d1 9 · d2 23 · d3 24 · d4 6.
- **Competency:** recall 10 · understanding 19 · application 5 · analysis 22 · evaluation 6. That makes **53% application or higher**.
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
- Every item was re-answered from its stem. Stanza structure, the order of the fog's actions and the metaphor/simile distinction were checked.
- **Guard fixes:** see above.
- **Answer leak:** the `sb_poet` model shared a sentence about the Pulitzer Prizes with the poet slide's narration. The model was reworded.
- **Balance:**
  - The first draft was at 48% application or higher.
  - `sa_cat` (now d3), `sb_short` and `mt_cat_fog` were re-tagged from understanding to analysis, which matches what they ask. That brings it to 53%.
- **Word limits:** every model is inside its exact limit.
- **Pipeline checks:** build validation reports 0 errors and 0 warnings.

## Known gaps
- The CBSE 2026-27 extract item for poems may mix MCQs and short completions differently. Our commentary items use 3–4 MCQ or fill-in parts and 1 short part, as in ch13–ch19.
- A real-text n-gram check needs the poem in `catalog/sources/reference/` (owner-supplied, OA-16).
