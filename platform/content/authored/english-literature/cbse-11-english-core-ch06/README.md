# CBSE Class 11 English Core: Chapter 6, We're Not Afraid to Die… if We Can All Be Together (Gordon Cook and Alan East)

| | |
|---|---|
| Unit | `cbse-11-english-core-ch06` (family `english-literature`) |
| Book | NCERT *Hornbill*, prose · first-person account of a real sea voyage |
| Syllabus | `platform/catalog/cbse/11/english-core/syllabus.yaml` (2026-27): t01 reading the prose piece, context and summary · t02 themes and message · t03 characters and their development · t04 exam practice (commentary sets, long answers). No removed topics. |
| Board weight | Class 11 school annual paper, Section C: Hornbill prose extract (3), short answers (2 and 3 marks), long answers (6 marks); SOYL practice uses 4-mark commentary sets and 5-mark long answers (80-120 words) on the class-default chapter-test blueprints |
| Files | `release.json` (2 decks of 18 and 17 slides; 8 notes sections; 30 flashcards; 69 questions with 15 passage children), `tests.json` (short 20 / 40 min; long 40 / 90 min), `src/` (builder; shared library in `../../english-language/cbse-11-english-core-ch01/src/lib.mjs`, guard in `guard.mjs` beside it) |
| Provenance | `origin: human`, `author: claude-opus-5-5 (subject-producer)` (library default), every item `status: draft`; drafted by a Sonnet content writer for Opus producer review (D-050) |

Rebuild from `platform/`: `npx tsx content/authored/english-literature/cbse-11-english-core-ch06/src/build.mjs`.

## Scope per topic
- **t01 Context and summary:** writers and form (first-person account of a real voyage); five stages in order (setting out, gales after Cape Town, preparation on 2 January, the wave and the night, the days to the island and landing); facts and sequence; word meanings.
- **t02 Themes and message:** courage and calm leadership, optimism, teamwork, the children's bravery and the adults' respect for it, endurance against nature, preparation and seamanship.
- **t03 Characters and development:** the narrator (father, skipper, navigator), Mary, the crewmen Larry Vigil and Herb Seigler, Suzanne and Jonathan; adults' courage in action against the children's in feeling.
- **t04 Exam practice:** commentary sets, short and long answers, diary entry, letter, speech, comparison and opinion answers; extrapolation rules.

## The literature rule: taught without reproducing the account
D-036 and CONTEXT §8 applied as follows.
- **No quotation, close paraphrase or retelling in the account's own words.** Summaries are SOYL's own, organised by stage. Facts (names, places, dates, who did what) are stated plainly; the writers' images and sentence frames are not used. The children's remarks are described, never quoted; the title is the only wording of Jonathan's remark that appears. Single words appear only for word meanings (*voyage, gale, crewman, caricature, ordeal, navigate, endurance*).
- **Passage items are SOYL commentary.** All 5 `case-based` items carry `passage_origin: "soyl-commentary"`: an interpretive paragraph (about 100-115 words) about an episode (the preparations, the wave, the children's courage, the navigation, the landing), never a retelling of a paragraph, labelled in every stem as SOYL's commentary with a pointer to *Hornbill*. Parts test the commentary and, where marked, knowledge of the account.
- **Prose, so no verse or device quotations:** craft is described by where it occurs, never quoted.
- **Textbook pointers:** title slides, the "how to use" slide, notes section 1, and every commentary stem.
- **Guard:** `build.mjs` calls `guard(DIR, PHRASES)` after `build()` with 20 short distinctive phrases (at most 4 words each). None appears in `release.json`, `tests.json` or this README. The phrases are kept only in `build.mjs`.
- **NCERT exercise questions are not reused**; the questions are written afresh (counterfactuals, two competing readings, flaw-spotting, comparison with imagined characters, extrapolation).

### Reviewer checklist (english-literature)
- [ ] **No reproduction (critical):** no sentence, frame or distinctive phrase of the account in slides, narration, notes, flashcards, stems, options, solutions, model answers, commentaries or this README. Read the textbook side by side.
- [ ] Facts to check against the text (the producer checked every fact below against his own knowledge of the account on 2026-11-14; items still marked **uncertain** need a side-by-side check):
  - voyage begins in **July 1976** from **Plymouth**, England; aim: repeat Captain James Cook's round-the-world voyage **two hundred years earlier**; the narrator is a businessman;
  - the boat is **Wavewalker**, wooden-hulled, about **23 metres**, professionally built and tested in rough weather (the chapter says "tested in gales");
  - crew: **Larry Vigil** (American) and **Herb Seigler** (Swiss) join at Cape Town for the hardest part; first leg to **Cape Town** goes well; then east into the southern Indian Ocean and weeks of gales;
  - children: **Jonathan six, Suzanne seven** (the chapter says "about"); **uncertain: which of the two writers is the narrator** (the chapter never says);
  - **2 January**: enormous waves; boat slowed, sail reduced, a heavy rope trailed astern, life-raft routine, protective clothing and life jackets; **evening**: the wave; narrator swept off the deck and carried back aboard as the boat rights itself; deck badly damaged, water pours in; **Mary** raises the alarm; Larry and Herb pump for hours; the narrator covers the openings with canvas (the account also names the tools he fetched; the chapter names only the canvas); an **electric pump is connected later the same night**;
  - **sequence after the wave (corrected by the producer):** the water is brought down over the next days, then the weather worsens again, and **Jonathan's title remark comes then, not on the night of the wave**; Suzanne said little about her injuries on the night, and her parents learn later that they are **worse than she let on**; her **drawn card** with funny pictures of her parents comes in the days before the island is sighted;
  - **Ile Amsterdam**: small French island with a scientific base; Jonathan **praises his father as a captain** as the island comes into view; the base community welcomes them ashore (**the number of inhabitants is deliberately omitted**); **uncertain: the exact day of the card and of the sighting**, so the chapter gives no dates after 2 January.
- [ ] Re-answer every item blind; keys right; no second defensible option.
- [ ] Model answers within the limits (2-mark 30-50 words; 3-mark 50-80; 5-mark 80-120).
- [ ] Topics from the syllabus only; board pattern respected.

## Shape
**Decks (18 + 17 slides).** Part 1: title (board table) → how to use → writers and text (table) → five stages (flow) → setting out → the day of preparation → the wave and the night → check (ordering) → the days to the island → check (mcq) → themes → check (true-false) → the sea and the people (two-column) → check (match) → worked example 1 (answering a commentary set) → worked example 2 (planning a long answer on the father-captain role) → summary → exam tips. Part 2: title → narrator's roles → Mary and the crewmen → Suzanne and Jonathan → check (A-R) → action and feeling (two-column) → how the account is told → check (mcq) → word meanings → check (fill blank) → worked examples: diary as Mary, letter as Suzanne, opinion on whether courage means hiding fear → check (mcq) → extrapolation rules → summary → exam tips. Narration max 77 words, mean 49. Visuals on 14 and 13 slides. The worked examples use cases that are **not** bank items (a commentary on the crewmen, the father-captain role, Mary's diary, Suzanne's letter, courage and hidden fear).

**Notes:** 8 sections tagged t01-t04, 2 key terms each, descriptive only (interpretive conclusions are left to the questions); tips with board weight, marking and common mistakes. **Flashcards:** 30.

**Question bank (69 items, 133 marks):** case-based 5 (4 marks each, 15 children) · mcq 28 · assertion-reason 6 (keys a, c, d, b, b, a) · true-false 3 · fill-blank 2 · match 2 · ordering 1 · short 2-mark 10 · short 3-mark 6 · long 5-mark 6 (diary, letter, speech, comparison with an imagined skipper, opinion, children against adults).
- **MCQ key spread:** a 7, b 6, c 8, d 7.
- **Difficulty:** d1 12 · d2 26 · d3 24 · d4 7 (17/38/35/10 per cent, close to the brief's 15/40/33/12).
- **Competency (after producer review):** recall 13 · understanding 22 · application 6 · analysis 22 · evaluation 6 → **34 of 69 = 49.3% application or higher**. The 5 commentary sets are understanding; the higher-order items are counterfactuals about the account's form and narrator, flaw-spotting in partly right claims whose flaw the notes do not spell out, "which detail, if removed" items with plausible distractors, comparisons with imagined characters (Captain Rao, Meera), weighing two readings, application to new situations and the extrapolative long answers.
- **Schemes:** 2-mark = point (1) + explanation (1); 3-mark = point (1) + explanation (1) + expression (1); 5-mark = content 2 + interpretation 1 + organisation, format and expression 2.

**Tests (blueprint ids `cbse-11-default-chapter-test-short` / `-long`, item for item):**
- Short (20 marks, 40 min): A 3 MCQ + 1 A-R · B two 2-mark + one 3-mark · C one choice group of two 5-mark longs (attempt 1) · D one 4-mark case-based (10 items).
- Long (40 marks, 90 min): A 8 MCQ + 2 A-R · B 2-mark, 2-mark, a 2-mark choice group, a 3-mark, a 3-mark choice group · C one long + a choice group of two longs · D two case-based (22 items).
- The two tests share no item; neither uses a deck-check item (checks use `ord_events`, `m_firstleg`, `tf_wave`, `match_events`, `ar_cook`, `m_ile`, `fb_crew`, `m_end_cf`).

## Competency review (producer, 2026-11-14, Opus)
The writer tagged 34 of 69 higher-order. Item by item, many of those were decided by plainly absurd distractors, by a link the commentary or notes state, or (`m_inf_pump`) by a wrong fact. Every key was re-answered blind after the changes.
- **Retagged to understanding** (text unchanged, difficulty lowered): `m_cf_complain` (analysis, d3 to d2: absurd distractors, the key is the stated reason), `m_compare_cap` (analysis, d3 to d2: the notes state that the work is shared), `m_end_cf` (analysis, d3 to d2: deck check, absurd distractors), `ar_remedy` (analysis, d3 to d2: R is plainly a separate result of the wave), `ar_gale` (analysis, d3 to d2: the preparation commentary states the link).
- **Rewritten in place, staying higher-order** (ids, types, marks, topics and test slots unchanged):
  - `m_cf_narr`: which moment Mary could least describe from her own experience (plausible distractors replace absurd ones).
  - `m_cf_crew`: without the crewmen, pumping and covering could not run together (plausible distractors).
  - `m_remove_card`: all options now about the children; the reading separates lifting spirits from merely not adding worry.
  - `m_flaw_leader`: a partly right claim (he does physical work) whose flaw is where it puts his leadership.
  - `m_why_title`: plausible traps (point of view, a tragic ending, the children knowing more); d4.
  - `m_panic`: was a "panic scene" item with absurd options; now what the delayed discovery of Suzanne's injuries suggests about the first hours (d4 to d3).
  - `m_flaw_children`: which detail refutes "calm because unaware" (the other options are consistent with the claim).
  - `m_ev_suz`: two balanced-looking judgements, one resting on the false premise that her injuries were slight.
  - `m_ev_theme`: plausible but weaker grounds for the danger reading; d4.
  - `m_inf_praise`: what the word captain credits, given when the praise comes.
  - `m_app_prep`: was a "which plan matches" wrapper; now a coach borrowing from the days after the wave, with plausible misapplications.
  - `m_inf_pump`: **fact fix**; the old key said hand pumping could not last for days, but the electric pump was connected the same night (and the old distractor about lost hand pumps was partly true). Now: what covering with canvas instead of rebuilding says about his priorities.
  - `m_nav_cf`: was a point the navigation commentary states (a small island is easy to miss); now the flaw in "once the water was under control the danger was over".
  - `ar_praise`: the old verdict was contestable; now A (praise as the island appears) against R (the earlier togetherness remark), both true, R does not explain A.
  - `s2_cf_cap`: was a list of the narrator's jobs; now which task others could most and least easily take over.
  - `s2_two_cards`: why a comic picture of the parents suits better than a drawing of the boat or the island.
  - `s3_children_adults`: the notes state the action/feeling contrast it asked for; now Jonathan's two moments compared and what changed between them.
- **Rewritten from understanding or recall to higher-order:** `m_suz` (recall to analysis, d1 to d2: Meera's self-protective silence against Suzanne's), `m_form` (understanding to analysis, d1 to d3: how a survivor's account keeps suspense), `m_welcome` (understanding to analysis, d2 to d3: why a short record of Mary's actions is no proof of a small part), `s2_island` (understanding to analysis, d2 to d3: a distant large port against a small island), `s2_team` (understanding to analysis, d2 to d3: why an evening wave made the teamwork harder).
- **Difficulty only:** `c_child`, `c_land` (parents d3 to d2), `s2_ap_trek`, `s2_ev_hide` (d3 to d2).
- **Fact fixes:** Jonathan's remark moved out of the night of the wave into the following days, when the weather worsens again (deck 1 stage 4, the after-the-wave table, notes section 4, a flashcard, a common-mistakes tip); the electric pump is connected later the same night (deck, notes, flashcard); Suzanne "says little" about her injuries rather than "does not complain", and her parents later find them worse than she let on (decks, notes, flashcard, `s2_suz`, `l_speech`, commentary `c_child`); the `c_land` commentary no longer says the danger is over when Jonathan speaks; `l_diary` is set on the day they are welcomed ashore, not the night they reach the island; `match_events` no longer invents an afternoon for the preparations; the `l_opinion` model no longer calls the crewmen experienced; a stray comma removed from a flashcard.
- **D-036:** no quotation or close paraphrase found in slides, narration, notes, cards, items or this README; the wording about Suzanne's injuries was chosen to avoid the account's own frame.
- **Guard:** rebuilt as 20 phrases of the account itself (the writer's list held several phrases from the brief, not the text).
- Two builds give identical md5 (`release.json` 996df86031bbd129b24d9442e0531cdc, `tests.json` 8cc07bbc88b1b0ff94432cadf3301f07); NO ERRORS, no warnings, guard none found.

## Guard phrase count
20 phrases (each at most 4 words), checked in `release.json`, `tests.json` and `README.md`: **none found**.
