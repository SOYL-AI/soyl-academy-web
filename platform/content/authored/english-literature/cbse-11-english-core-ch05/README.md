# CBSE Class 11 English Core: Chapter 5, A Photograph (Shirley Toulson)

| | |
|---|---|
| Unit | `cbse-11-english-core-ch05` (family `english-literature`) |
| Book | NCERT *Hornbill*, poetry · a short poem in three stanzas |
| Syllabus | `platform/catalog/cbse/11/english-core/syllabus.yaml` (2026-27): t01 context and summary (central idea stanza by stanza) · t02 themes and message (memory, loss, the passage of time) · t03 poetic devices, imagery and tone · t04 exam practice (commentary sets, short interpretive answers, long answers). No removed topics. |
| Board weight | Class 11 school annual paper, Section C: Hornbill poetry extract (3), short answers (2 and 3 marks), long answers (6 marks); SOYL practice uses 4-mark commentary sets and 5-mark long answers (80-120 words) on the class-default chapter-test blueprints |
| Files | `release.json` (2 decks: 17 + 18 slides; 8 notes sections; 32 flashcards; 69 questions, 133 marks, 17 passage children), `tests.json` (short 20 / 40 min; long 40 / 90 min), `src/` (builder; shared library in `../../english-language/cbse-11-english-core-ch01/src/lib.mjs`, guard in `guard.mjs` beside it) |
| Provenance | `origin: human`, `author: claude-opus-5-5 (subject-producer)` (library default), every item `status: draft`; drafted by a Sonnet content writer, reviewed and partly rewritten by the Opus producer (D-050) |

Rebuild from `platform/`: `npx tsx content/authored/english-literature/cbse-11-english-core-ch05/src/build.mjs` (deterministic).

## Scope per topic
- **t01 Context and summary:** poet, form, speaker and tone; what each of the three stanzas does, in SOYL's words; the three moments in time (the mother's girlhood, her later years, the poet's present); facts (the mother about twelve and the eldest, two girl cousins holding her hands, the uncle as photographer, about twelve years since her death).
- **t02 Themes and message:** memory and nostalgia; the passage of time; the lasting sea against changing people; grief and loss; one photograph, two responses (the mother's amusement, the poet's sorrow).
- **t03 Devices, imagery and tone:** imagery of the beach and of the photograph as a fixed moment; contrast; the paradox of laughter and loss; the closing silence and restraint; the tone moving from light description through reflection to quiet grief; three stanzas for three moments.
- **t04 Exam practice:** commentary sets on a stanza, 2- and 3-mark interpretive answers, diary entry, letter and speech as extrapolation, and transfer tasks (a grandfather's photograph, a future viewer).

## The literature rule: taught without reproducing the poem
D-036 and CONTEXT §8 applied as follows.
- **No line, phrase or close paraphrase of the poem anywhere.** Each stanza is described by what it does, in SOYL's words. Devices are identified by place and effect ("in the second stanza the poet sets the lasting sea against the changing people"), never quoted. Single words appear only as terms (*stanza, nostalgia, transience, imagery, paradox, tone*).
- **No poetry extract items.** Board papers print a poetry extract; SOYL does not. All 5 `case-based` items carry `passage_origin: "soyl-commentary"`: an interpretive paragraph (about 105-115 words) on a stanza or on the poem's design, labelled in every stem as SOYL's commentary on A Photograph with a pointer to *Hornbill*. Parts that the commentary answers are tagged recall or understanding.
- **Textbook pointers:** both title slides, the "how to use" slide, notes section 1, the exam tips and every commentary stem.
- **Guard:** `build.mjs` calls `guard(DIR, PHRASES)` after `build()` with 16 short distinctive phrases (at most 4 words each) of the poem. None appears in `release.json`, `tests.json` or this README. The phrases are kept only in `build.mjs`.
- **NCERT exercise questions are not reused**; classic questions are reframed (the title, the role of the sea, the two responses, the silence).

### Reviewer checklist
- [ ] **No reproduction (critical):** no line, frame or distinctive phrase of the poem in slides, narration, notes, flashcards, stems, options, solutions, models, commentaries or this README. Read the textbook side by side.
- [ ] Facts to check against the poem: three stanzas; the mother is about twelve and the eldest of three girls; her two girl cousins hold her hands; they are paddling at the seaside; their uncle took the photograph; the second stanza sets the sea, which has changed little, against the people, and has the mother in later years laughing at the picture and at how they were dressed; the third stanza says the mother has been dead for about as long as the girl had lived (about twelve years) and that the poet finds no words for it; the poem ends in silence.
- [ ] Interpretations offered as readings, not facts: the photograph's two responses; the sea as a measure of human brevity; the silence as restraint.
- [ ] Re-answer every item blind; keys right; no second defensible option (watch `m_flaw_laugh`, `m_remove_detail`, `m_two_readings`).
- [ ] Model answers within the limits (2-mark 30-50 words, models 34-45; 3-mark 50-80, models 52-73; 5-mark 80-120, models 86-111).

## Shape
**Decks.** Part 1 (17 slides): title (board table) → how to use → poet and poem (table) → three moments (flow) → stanzas 1, 2 and 3 in SOYL's words → check (ordering) → themes (table) → two responses (two-column) → check (match) → what lasts and what passes (table) → check (fact) → worked example 1 (a commentary set) → worked example 2 (planning a 5-mark answer) → summary → exam tips. Part 2 (18 slides): title → imagery (table) → contrast (table) → paradox (two-column) → check (device) → silence and restraint (table) → tone (flow) → structure (flow) → check (A-R) → words and terms → worked examples: a short interpretive answer on the title, a commentary set, a speech plan → checks (true-false, fill blank) → extrapolation rules → summary → exam tips. Narration max 70 words, mean 51. Checks use `ord_time`, `match_stanzas`, `m_hands`, `m_contrast`, `ar_first`, `tf_laugh`, `fb_sea`; worked examples use cases that are not bank items.

**Notes:** 8 sections tagged t01-t04, 2 key terms each; tips with board weight, marking and common mistakes (the two twelves, "sad throughout", quoting). **Flashcards:** 32.

**Question bank (69 items, 133 marks):** case-based 5 (4 marks each) · mcq 28 (keys a 8, b 7, c 7, d 6) · assertion-reason 6 (keys a, b, d, b, c, a) · true-false 3 · fill-blank 2 · match 2 · ordering 1 · short 2-mark 10 · short 3-mark 6 · long 5-mark 6 (how the poem makes loss felt, time or death, diary entry, letter to a cousin, sea against photograph, assembly speech).
- **Difficulty:** d1 10 · d2 24 · d3 27 · d4 8.
- **Competency (after the producer review below):** recall 10 · understanding 26 · application 9 · analysis 21 · evaluation 3 → **33 of 69 = 47.8% application or higher**. All 5 commentary sets are understanding.
- **Schemes:** 2-mark = point (1) + explanation (1); 3-mark = point (1) + explanation (1) + expression (1); 5-mark = content 2 + interpretation 1 + organisation, format and expression 2.

**Tests (blueprint ids `cbse-11-default-chapter-test-short` / `-long`, item for item):**
- Short (20 marks, 40 min): A 3 MCQ + 1 A-R · B two 2-mark + one 3-mark · C one choice group of two 5-mark longs · D one 4-mark commentary set (10 items).
- Long (40 marks, 90 min): A 8 MCQ + 2 A-R · B 2-mark, 2-mark, a 2-mark choice group, a 3-mark, a 3-mark choice group · C one long + a choice group of two longs · D two commentary sets (22 items).
- The two tests share no item; neither uses a deck-check item.

## Competency review (producer, 2026-11-14, Opus)
The writer's draft tagged 35 of 69 higher-order, but many of those were answered by the notes, flashcards or a commentary (the flashcards state that the sea measures human brevity, that the closing silence is a loss too large for words and that the reader supplies the feeling; notes section 5 explains the two responses).
- **Retagged to understanding** (text unchanged): `m_judge` (evaluation, d4 to d3: the distractors were plainly wrong), `ar_silence` (analysis, d3 to d2: A obviously false).
- **Rewritten in place as higher-order items** (ids, types, marks and test slots unchanged): `m_two_readings` (what the two twelve-year spans suggest), `m_remove_detail` (a different photographer: what changes), `m_flaw_laugh` (judging the claim that the poet envies her mother's laughter), `m_compare_resp` (a grandfather's ticking watch against the photograph), `m_flaw_sea` (the sea read as moving time: the reversed role), `m_why_photo` (a home video instead of a still: application), `m_remove_detail2` (which detail makes the poem one family's loss), `m_readings_sea` (a beach built over: what happens to the contrast), `s2_nodetail` (a friend's photograph of a living grandfather: application), `s3_responses` (a future viewer who never knew the girl: application), `s3_silence` (is the poem cold? evaluation).
- `s3_second` model reworded (it repeated a notes sentence; the answer-leak scan flagged it).
- Guard list revised: 16 phrases.

## Guard phrase count
16 phrases (each at most 4 words), checked in `release.json`, `tests.json` and `README.md`: **none found**.
