# CBSE Class 10 English Language and Literature — Chapter 21: The Tale of Custard the Dragon (Ogden Nash)

| | |
|---|---|
| Unit | `cbse-10-english-language-and-literature-ch21` (family `english-literature`) |
| Book | NCERT *First Flight*, poetry |
| Syllabus | `platform/catalog/cbse/10/english-language-and-literature/syllabus.yaml` (2026-27): t01 context and summary · t02 themes and message (the irony of the dragon thought a coward who proves brave) · t03 poetic devices, imagery and tone (ballad form, humour, rhyme, repetition) · t04 exam practice. No removed topics. |
| Board weight | Section C: reference-to-context extract (5, meaning/tone/devices), First Flight short answers (3 marks, 40–50 words) |
| Files | `release.json` (1 deck of 22 slides; 7 notes sections; 28 flashcards; 62 questions with 35 passage children), `tests.json` (short 20 / 40 min; long 40 / 90 min), `src/` (builder; the reproduction guard is `../cbse-10-english-language-and-literature-ch18/src/guard.mjs`; the shared library is `../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs`, unchanged) |
| Provenance | `origin: human`, `author: claude-opus-5-5 (subject-producer)`, every item `status: draft` |

Rebuild from `platform/`: `npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch21/src/build.mjs`. The build prints `NO ERRORS` and then `REPRODUCTION GUARD: 0 hits`.

## The literature rule for a poem still in copyright

Ogden Nash died in 1971, so the poem is in copyright. It is also a long, catchy ballad whose couplets and similes are widely quoted, so the rule is applied strictly (CONTEXT §8–§9, D-036):

- **No line and no multi-word phrase of the poem** appears anywhere: not in slides, narration, notes, flashcards, stems, options, solutions, model answers, passages or this README.
- **Only these are used:**
  - the **title** and the **characters' names**: Belinda, Ink, Blink, Mustard, Custard;
  - **single words**: *realio, cutlass, flagon, trulio, grog, gyrate, winda, pyrate, Percival*.

  The poem's paired coinage is never printed as a pair, and the kitten and mouse are always named in the order "Blink and Ink", or simply as "the kitten and the mouse".
- **The colour-and-size descriptions of the household are not reused.** The pets are named by kind, for example "Ink, a kitten as black as its name".
- **The story is retold by event in SOYL wording,** not paraphrased line by line.
- **The similes are described, never quoted:**
  - Belinda's courage is "compared to a container packed with bears";
  - Mustard's courage is "compared to a furious tiger";
  - Custard's snort is like "a steam machine";
  - his tail clangs "like chains in a prison";
  - his charge is "as a bird goes for a worm".
- **Devices are illustrated with SOYL's own sentences** (for example, *The pressure cooker went whoosh and hiss.* for onomatopoeia).
- **Extract questions use SOYL commentary** (`passage_origin: "soyl-commentary"`, 7 items), labelled in every stem, with a pointer to *First Flight*.
- **Textbook pointers:** title slide, "how to read" slide, summary, notes sections 1 and 7, exam tips and every passage stem.
- **Every stem names the poem, Ogden Nash or a character** (Custard, Belinda, Mustard, Ink, the pirate). Many stems say "Ogden Nash's ballad", so that the long title does not make near-duplicate stems.

### Reproduction checks (D-036 method)
- **No reconstructed poem text was written anywhere,** not even in scratch files.
- **Forbidden-phrase guard:** `src/build.mjs` holds a list of 55 short distinctive phrases of the poem (each 4 words or fewer, never a whole line). After writing the files, the shared guard scans every string of `release.json` and `tests.json` and every line of this README, ignoring case and punctuation, and fails the build on any hit. The final build has **0 hits**.
- **What the guard caught in the first draft, described by position:**
  - the poem's adjective + noun pairs for the pets (kitten, mouse, dog; 7 places), now "the kitten", "a kitten as black as its name" and so on;
  - the poem's adjective + noun pair for the dragon as a pet (5 places), now "a dragon kept as a pet";
  - the poem's adjective + noun pair for the timid dragon (2 places, including a learning goal taken from the syllabus wording), now "the dragon thought a coward" and "the timid dragon";
  - the poem's word for the dragon's underside with its noun (1 place), now "a scaly belly";
  - the coinage pair in a build note (1 place), reordered;
  - the cage phrase (13 places, fixed before the first build), now "a secure cage";
  - a three-word run for where the pirate holds his sword, and a noun + preposition pair for his pistols (6 places), now "between his teeth" and "two pistols";
  - the verb phrase about Custard's age (1 place), now "tease him about how old he is";
  - the lion-chasing verb + noun (5 places), now "hunt lions";
  - the size adjective with the house (1 place), now "a small house".
- **Repo checks:** `content lint --exemplars` (literature quote and verse-shape rules) and `content originality --authored` both report 0 errors and 0 warnings for this unit.
- **Still to do:** a real n-gram check against the printed poem needs the owner to supply the text in `catalog/sources/reference/` (OA-16).

### Reviewer checklist (english-literature, poetry)
- [ ] **No reproduction (critical):** no line, phrase or line-by-line paraphrase anywhere; passages are commentary. Look especially at the household, boasts, pirate and hero slides (s05, s06, s08, s09), notes section 2, `src_appearance`, `src_teasing`, `src_pirate`, `src_hero`, `sa_appearance` and `la_custard_diary`.
- [ ] Facts:
  - the pets and their kinds;
  - Custard asks for a cage and is mocked, including by being tickled and called Percival;
  - the pirate's appearance;
  - each character's reaction;
  - the pirate fires twice and misses, and Custard swallows him;
  - the ending returns to the opening situation.
- [ ] Re-answer every item blind; check the keys; check that model answers are within their limits.

### Facts to confirm against the textbook
The content states the following, which we believe is correct. Please confirm:
- Ogden Nash: 1902–1971, American, known for humorous light verse and invented or misspelt rhymes.
- **Form:** a ballad in **four-line stanzas rhyming aabb** (two couplets).
- **The details of the poem:**
  - Ink is a kitten and Blink a mouse; Mustard is a dog and Custard a dragon.
  - Custard's mouth is compared to a fireplace and his nose to a chimney.
  - Belinda's courage is compared to a container of bears and Mustard's to an angry tiger.
  - The kitten and the mouse claim to hunt lions.
  - The pirate has two pistols, a cutlass between his teeth, a black beard and a wooden leg, and he drinks from a flagon of grog.
- *winda* (window) and *pyrate* (pirate) are Nash's misspellings, and *realio* and *trulio* are his coinages.
- **"Percival":** the content says the pets call Custard Percival to mock him. Please confirm who uses the name in the *First Flight* text.

**Left out** because they cannot be confirmed here or are not needed:
- the **number of stanzas**: the content says only "four-line stanzas";
- the year and collection of first publication;
- further biography of the poet.

## Shape
**Deck (22 slides):**
1. title (board pattern)
2. how to read
3. the poet (table)
4. the poem at a glance (table)
5. the household (cast table)
6. boasts and teasing
7. check: the hero
8. the pirate arrives
9. Custard the hero
10. the story in six steps (flow)
11. talk and action (two-column)
12. check: assertion-reason
13. the ending and its irony
14. themes and devices (table)
15. worked point: a circular ending
16. tone
17. word meanings (table)
18. check: the form
19. worked example: a 45-word answer (flow)
20. check: simile
21. summary
22. exam tips

Narration: max 65 words, mean 49. Visuals on 9 slides.

**Question bank (62 items, 155 marks):**

| Type | Count | Detail |
|---|---|---|
| Source-based | 7 (5 × 1 mark each) | commentary on the household, Custard's appearance, the boasting and teasing, the pirate, the hero, the ending, the form |
| Short, 3 marks | 12 | models 43–50 words |
| Short, 2 marks | 6 | models 33–39 words |
| Long, 6 marks | 6 | models 111–117 words: real versus boastful courage, Custard's diary, judging by appearances, a news report, humour and irony, respect for those who admit fear |
| MCQ | 14 | |
| Fill-blank | 4 | |
| Assertion-reason | 4 | keys a, d, c, b |
| True-false | 4 | |
| Ordering | 2 | |
| Match | 3 | |

- **Difficulty:** d1 9 · d2 22 · d3 24 · d4 7.
- **Competency:** recall 9 · understanding 20 · application 5 · analysis 22 · evaluation 6. That makes **53% application or higher**.
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
- Every item was re-answered from its stem. Characters, reactions, the order of events and the circular ending were checked.
- **Guard fixes:** see above.
- **Literature lint:** the news-report model first carried a short line of quoted speech from Custard. It was turned into reported speech, to keep quotation marks out of answers.
- **Word limits:**
  - Two 2-mark models (`sb_poet`, `sb_pirate_fight`) were at 27 words and were extended to 33.
  - `sa_humour` reached 53 words after a guard fix and was trimmed to 48.
- **Balance:**
  - The first draft was at 48% application or higher.
  - `sb_coinages` and `tf_admit` (both now d3) and `mc_coward` were re-tagged from understanding to analysis, which matches what they ask. That brings it to 53%.
- **Pipeline checks:** build validation reports 0 errors and 0 warnings.

## Known gaps
- The CBSE 2026-27 extract item for poems may mix MCQs and short completions differently. Our commentary items use 3–4 MCQ or fill-in parts and 1 short part, as in ch13–ch20.
- A real-text n-gram check needs the poem in `catalog/sources/reference/` (owner-supplied, OA-16).
