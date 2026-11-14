# CBSE Class 11 English Core: Chapter 4, The Portrait of a Lady (Khushwant Singh)

| | |
|---|---|
| Unit | `cbse-11-english-core-ch04` (family `english-literature`) |
| Book | NCERT *Hornbill*, prose · memoir |
| Syllabus | `platform/catalog/cbse/11/english-core/syllabus.yaml` (2026-27): t01 context and summary · t02 themes and message · t03 characters and their development · t04 exam practice (commentary sets, long answers). No removed topics. |
| Board weight | Class 11 school annual paper, Section C: Hornbill prose extract (3), short answers (2 and 3 marks), long answers (6 marks); SOYL practice uses 4-mark commentary sets and 5-mark long answers (80-120 words) on the class-default chapter-test blueprints |
| Files | `release.json` (2 decks of 18 slides each; 8 notes sections; 31 flashcards; 69 questions with 17 passage children), `tests.json` (short 20 / 40 min; long 40 / 90 min), `src/` (builder; shared library in `../../english-language/cbse-11-english-core-ch01/src/lib.mjs`, guard in `guard.mjs` beside it) |
| Provenance | `origin: human`, `author: claude-opus-5-5 (subject-producer)` (library default), every item `status: draft`; drafted by a Sonnet content writer for Opus producer review (D-050) |

Rebuild from `platform/`: `npx tsx content/authored/english-literature/cbse-11-english-core-ch04/src/build.mjs`.

## Scope per topic
- **t01 Context and summary:** author and form (memoir, first person, tone); the five stages in order (village, city, university, abroad and return, death and the sparrows); facts and sequence; word meanings.
- **t02 Themes and message:** the changing relationship without a quarrel; the generation and culture gap (traditional religious learning against modern English education); old age and faith; distance without loss of affection; death and the closing image.
- **t03 Characters and development:** the grandmother (devout, caring, traditional, accepting, warm beneath her calm, peaceful at the end); the narrator from dependent child to independent young man; craft (first person, time order, humour, recurring detail, restraint).
- **t04 Exam practice:** commentary sets, short and long answers, diary entry, letter, character sketch, speech and opinion answers; extrapolation rules.

## The literature rule: taught without reproducing the memoir
D-036 and CONTEXT §8 applied as follows.
- **No quotation, close paraphrase or retelling in the memoir's own words.** Summaries are SOYL's own, organised by stage (village, city, university, abroad and return, death). Facts (who, where, what happened, five years) are stated plainly; the author's images and sentence frames are not used. Single words appear only for word meanings (*serene, resignation, devout, scriptures, rosary, cremation, verandah*).
- **Passage items are SOYL commentary.** All 5 `case-based` items carry `passage_origin: "soyl-commentary"`: an interpretive paragraph (about 90-110 words) about an episode, never a retelling of a paragraph, labelled in every stem as SOYL's commentary on The Portrait of a Lady with a pointer to *Hornbill*. Parts test the commentary and, where marked, knowledge of the memoir.
- **Prose, so no verse or device quotations:** devices and craft choices are named by where they occur and what they do, never quoted.
- **Textbook pointers:** title slides, the "how to use" slide, notes section 1, exam tips and every commentary stem.
- **Guard:** `build.mjs` calls `guard(DIR, PHRASES)` after `build()` with 15 short distinctive phrases (at most 4 words each) of the memoir. None appears in `release.json`, `tests.json` or this README. The phrases are kept only in `build.mjs`.
- **NCERT exercise questions are not reused**; classic questions are reframed (what her calm shows, what the sparrows suggest, a film-maker's two images, whether faith was her only comfort).

### Reviewer checklist (english-literature)
- [ ] **No reproduction (critical):** no sentence, frame or distinctive phrase of the memoir in slides, narration, notes, flashcards, stems, options, solutions, model answers, commentaries or this README. Read the textbook side by side.
- [ ] Facts to check against the text (the writer worked from the task brief and general knowledge of the text):
  - the order of the stages; on the evening of his return she sets prayer aside and sings and drums with neighbourhood women for hours; next morning she has a fever, says her end has come, refuses to talk with the family and prays until she dies peacefully;
  - the narrator is abroad for **five years**; at the station she is calm and still praying;
  - the village school is **attached to the temple**; the city school is an **English school reached by bus**; she is upset about **music**, which she associates with **low company**;
  - after death: body laid on the floor and covered; sparrows in **large numbers**, silent, ignoring crumbs thrown by **the narrator's mother**, flying away quietly when the body is taken for cremation;
  - the grandmother feeds **dogs** (village) with leftover chapatis and, in the university years, **sparrows** in the afternoons, resting from her **spinning wheel**.
- [ ] **Producer fact review (2026-11-12):** Khushwant Singh (1915-2014), best known for *Train to Pakistan*: confirmed. The afternoon sparrow-feeding belongs to the university years (the writer's draft also placed it in the earlier city stage); the match item, the fill-blank, a flashcard, the village/city table and the film-maker model were corrected so that nothing places it in the city-school stage, and "courtyard" (not the text's setting) was removed. The letter model `l_letter` now has the narrator's mother call her "my mother-in-law" and no longer invents a name. Still to confirm side by side: that the subjects she distrusts are the English school's Western science and English (stated generally as "science and English"), and that the narrator's mother throws the crumbs.
- [ ] Re-answer every item blind; keys right; no second defensible option.
- [ ] Model answers within the limits (2-mark 30-50 words, models 35-47; 3-mark 50-80, models 48-58; 5-mark 80-120, models 89-102).
- [ ] Topics from the syllabus only; board pattern respected.

## Shape
**Decks (2 × 18 slides).** Part 1: title (board table) → how to use → author and text (table) → five stages (flow) → summaries of stages 1, 2, 3 and 4, and the last days → check (ordering) → changing relationship (table) → tradition and modern education (two-column) → check → old age, faith and death (table) → check (match) → worked example 1 (answering a commentary set, flow) → worked example 2 (planning a long answer, flow) → summary → exam tips. Part 2: title → grandmother's traits (table) → calm outside, warmth inside (two-column) → check → narrator's development (table) → comparison (table) → craft (table) → check (A-R) → the sparrows (table) → word meanings → check (true-false) → worked examples: diary entry, character sketch, opinion answer → check (fill blank) → extrapolation rules → summary → exam tips. Narration max 65 words, mean 50. Visuals on 10 and 12 slides; the longest gap without a visual is 2 slides. The worked examples use cases that are **not** bank items (the opening description, her view of the city school, a first-day-in-the-city diary, the narrator's character sketch, "faith was her only comfort").

**Notes:** 8 sections tagged t01-t04, 2 key terms each; tips with board weight, marking and common mistakes. **Flashcards:** 31.

**Question bank (69 items, 133 marks):** case-based 5 (4 marks each, 17 children) · mcq 28 · assertion-reason 6 (keys d, d, c, a, b, c) · true-false 3 · fill-blank 2 · match 2 · ordering 1 · short 2-mark 10 · short 3-mark 6 · long 5-mark 6 (character sketch, opinion, diary entry, letter, comparison, speech).
- **MCQ key spread:** a 7, b 7, c 7, d 7.
- **Difficulty:** d1 8 (12%) · d2 27 (39%) · d3 27 (39%) · d4 7 (10%).
- **Competency (after the producer reviews below):** recall 9 · understanding 27 · application 6 · analysis 22 · evaluation 5 → **33 of 69 = 47.8% application or higher**. The 5 commentary sets are understanding; the higher-order items are the A-R items that need a judgement, standalone MCQs and shorts built on counterfactuals or on weighing two readings, and the long answers.
- **Schemes:** 2-mark = point (1) + explanation (1); 3-mark = point (1) + explanation (1) + expression (1); 5-mark = content 2 + interpretation 1 + organisation, format and expression 2.

**Tests (blueprint ids `cbse-11-default-chapter-test-short` / `-long`, item for item):**
- Short (20 marks, 40 min): A 3 MCQ + 1 A-R · B two 2-mark + one 3-mark · C one choice group of two 5-mark longs (attempt 1) · D one 4-mark case-based (10 items).
- Long (40 marks, 90 min): A 8 MCQ + 2 A-R · B 2-mark, 2-mark, a 2-mark choice group, a 3-mark, a 3-mark choice group · C one long + a choice group of two longs · D two case-based (22 items).
- The two tests share no item; neither uses a deck-check item (checks use `ord_events`, `m_bus`, `match_stages`, `c_weak`, `ar_school`, `tf_wept`, `fb_sparrows`).


## Competency review (producer, 2026-11-12)
- **Retagged to understanding** (text unchanged, difficulty lowered a step where high): c_dogs_role, c_grandparent, c_hostel, c_drumplace, c_weak, c_stage, c_order, ar_dist, ar_crumbs, ar_gap, s2_station. (The producer also listed s2_feed, s3_routine, s3_gap, s3_sides and l_sketch for retagging; they were instead rewritten, see below.)
- **Rewritten in place as higher-order items** (type, marks, topics, ids and test slots unchanged): m_parents, m_music, m_silence, m_edu, m_room, m_flew, m_station (MCQs: counterfactuals, two competing readings, which detail removed would weaken a reading); s2_routine, s2_sparrows, s2_feed, s3_routine, s3_gap, s3_sides (shorts); l_sketch (long: comparison with an imagined grandfather, Nanu, on two criteria).

**Second producer pass (item-by-item, 2026-11-12):**
- `c_outofplace` (application to understanding): spotting the one diary sentence that is out of time order is a sequence check in a scenario wrapper.
- `c_belief` (analysis to understanding, d4 to d3): the notes and the city commentary state the belief that answers it.
- `ar_feed` rewritten (analysis to understanding, d4 to d2): the old pair (feeding creatures; her prayers) had a contestable verdict, since feeding animals can be read as part of her piety. The new pair (she cannot help with his lessons; she is upset about music) is plainly both true with R not explaining A.
- `m_first` rewritten (exam-technique understanding to analysis, t04 to t02): which detail best supports the reading that her faith is a strength and not just a routine (key: she meets death calmly in prayer; the temple-school reading, the wheel and the sparrows are the weaker routine readings).
- `c_stage` rewritten (staging-choice understanding to analysis, t02 to t03): set beside an imagined grandmother, Dadi, who confronts the school, what the grandmother's private distress and withdrawal reveal.
- Every key re-answered blind; schemes total the item marks; D-036 checked across decks, notes, cards and items (no sentence, frame or listed phrase of the memoir).

**Third producer pass (item by item, 2026-11-14, Opus):** every key re-answered blind; tags stand (33 of 69 = 47.8%). Remaining stage errors fixed: the city-stage notes paragraph, the city summary slide and its narration no longer have her feeding sparrows (the memoir places the afternoon sparrow-feeding in the university years); the notes key term *Courtyard* became *Verandah*; the distractor in `m_room` and the diary model `l_diary` no longer mention a courtyard; the city narration no longer echoes the memoir's wording about what the school leaves out. Two builds give identical md5 (`release.json` d0e4812b61c228b995319f3bb417cc7e, `tests.json` 4986885ca0fd98232e17059fa85d5c08).

## Guard phrase count
15 phrases (each at most 4 words), checked in `release.json`, `tests.json` and `README.md`: **none found**.
