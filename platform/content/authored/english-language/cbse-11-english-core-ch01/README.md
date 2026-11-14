# CBSE Class 11 English Core — Chapter 1: Reading Comprehension, Note Making and Summary

| | |
|---|---|
| Unit | `cbse-11-english-core-ch01` (family `english-language`) |
| Syllabus | `platform/catalog/cbse/11/english-core/syllabus.yaml` (2026-27): t01 unseen passages (factual, descriptive, literary, case-based) · t02 note making with headings, sub-headings and abbreviations · t03 summary writing (about 50 words). No removed topics. |
| School pattern | Class 11 has no board exam. Reading 26 = two unseen passages (10 + 8), note making 5, summary 3 (`exam_notes`). |
| Files | `release.json` (2 decks: 17 + 18 slides; 8 notes sections; 32 flashcards; 68 questions, 132 marks, 18 passage children), `tests.json` (short 20 / 40 min; long 40 / 90 min), `src/` (builder; shared library `src/lib.mjs` and `src/guard.mjs`, unchanged) |
| Provenance | `origin: human`, `author: claude-opus-5-5 (subject-producer)`, every item `status: draft` (written by a content writer for producer review) |

Rebuild from `platform/`: `npx tsx content/authored/english-language/cbse-11-english-core-ch01/src/build.mjs` (deterministic).

## Originality
This is a skills chapter and holds no textbook text. **Every passage, example sentence, data set and note-making brief was written for SOYL** (`passage_origin: soyl-original` on all 5 case-based items). No passage is taken or adapted from any book, newspaper, website, sample paper or past paper. All table figures are invented and labelled *illustrative data*. General facts used (Sundarbans as the largest mangrove forest, millets, UN International Year of Millets 2023, Rani ki Vav at Patan as a World Heritage Site, the Indian farm festivals and their states and seasons, kharif and rabi sowing and harvest months, India Post as the largest postal network) are stated at the level of common knowledge. Not a literature chapter: no `guard()` call.

## Scope and shape

**Deck part 1, unseen passages (17 slides):** reading pattern table → four passage types → five-step plan (flow) → skim and scan → check → worked example 1 (table with a shares trap) → inference → worked example 2 (inference) → check → tone → check → vocabulary clues → check → worked example 3 (literary moment) → how a 4-mark case set is marked → summary → exam tips. 4 checks, 3 examples, 13 visuals.

**Deck part 2, note making and summary (18 slides):** marks table → notes versus full text (two-column) → five steps (flow) → choosing headings → check → abbreviations and key → check → worked example 1 (kharif and rabi notes) → check → summary do and do not → five steps to a summary (flow) → worked example 2 (notes to summary) → check → compressing words and figures → worked example 3 (trimming a draft) → marking → summary → exam tips. 4 checks, 3 examples, 14 visuals.

Narration: max 67 words, mean 50. No deck example repeats a bank item (deck demos: reading challenge shares, a strike inference, a radio-and-grandfather moment, kharif and rabi crops, a lake clean-up draft).

**Notes (8 sections):** pattern → strategies and passage types → inference, tone, vocabulary → data and numbers → note layout and headings → abbreviations and key → summary writing → answers and timing. Two key terms each; tips list marks, how marks are awarded and the common mistakes. **Flashcards:** 32.

## Question bank (68 items, 132 marks)

| Type | Count | Notes |
|---|---|---|
| case-based | 5 | 4 marks each. `cs_commute` (survey table; 1+1+2 with Either/Or), `cs_flowers` (descriptive; four 1-mark), `cs_trophy` (literary; 1+1+2 with Either/Or), `cs_millet` (note-making case), `cs_stepwell` (summary case) |
| mcq | 28 | 8 reserved for deck checks; keys a/b/c/d = 7/6/7/8 |
| assertion-reason | 6 | keys a,c,d,d,a,b |
| true-false / fill-blank / match / ordering | 3 / 2 / 2 / 1 | conventions of notes and summary; tone words |
| short, 2 marks (`wl: [30, 50]`) | 9 | inference, tone, purpose, vocabulary, data headline, grouping points, abbreviations, heading versus sub-heading, what to cut |
| short, 3 marks | 6 | 3 summaries (`wl: [40, 60]`), a notes item, an argument evaluation, a data item (the last three `wl: [50, 80]`) |
| long, 5 marks (`wl: [80, 120]`) | 6 | notes (rainwater, sleep), notes plus summary (mangroves), fix a student's notes, compare two summaries, evaluate an argument |

Summary choice: the 50-word summary is set as a 3-mark `short` with `wl: [40, 60]` (the build accepts model answers of 32 to 72 words); the scheme gives main ideas 1.5, brevity 0.5, expression 1 (marks must be multiples of 0.5). Topic spread: t01 31 items, t02 23, t03 13, one long across t02 and t03.

Difficulty: d1 12 (18%), d2 26 (38%), d3 23 (34%), d4 7 (10%).
Competency: recall 6, understanding 28, application 18, analysis 14, evaluation 2: **34 of 68 = 50% at application or above.**

Honest tagging: literal retrieval and conventions the notes spell out are recall or understanding; inference, selecting and grouping from a new passage, compressing into a summary, computed data conclusions and judging an argument are application, analysis or evaluation.

## Tests (blueprints `cbse-11-default-chapter-test-short` and `-long`, item for item; they share no item and use no deck-check item)

- **Short (20 marks, 40 min):** A 3 mcq + 1 AR · B two 2-mark + one 3-mark (summary) · C choice of two 5-mark longs (notes or argument evaluation) · D one case-based (descriptive passage).
- **Long (40 marks, 90 min):** A 8 mcq + 2 AR · B 2-mark, 2-mark, choice of two 2-mark, 3-mark (notes), choice of two 3-mark · C one long (notes) + choice of two longs (notes and summary, or fix the notes) · D two case-based (survey table; summary case).

## Reviewer checklist
- [ ] Every passage is original and age-appropriate; no sentence from any textbook or paper.
- [ ] Re-answer each objective item blind: key correct, no second defensible option (watch `m_purpose`, `m_reference`, `cs_flowers` part c, `cs_trophy` part b).
- [ ] Data: `cs_commute` (96+60+24+60 = 240; 84 of 240 = 35 per cent; 96 of 240 = 40 per cent); `m_data_comp` (120, 150, 180, 144: 25 per cent, 20 per cent, fall); `ar_trend` (40,000 to 46,000 = 15 per cent; 50 to 52 buses = 4 per cent; riders per bus 800 to about 885); `ar_cause` (30 to 90 = tripled); `s2_data_headline` (80 of 200 = 40 per cent; 90 of 250 = 36 per cent); `s3_data_library` (1,500 divided by 250 = 6; divided by 300 = 5); `s3_eval_assembly` and `l_eval_phones` (82 to 91 and 71 to 64); `m_sum_figure` (2,400 of 3,000 = four in five).
- [ ] Facts to confirm: Sundarbans shared by India and Bangladesh and the largest mangrove forest; the claim that mangrove restoration is cheaper than rebuilding sea walls (presented as the passage's argument); Rani ki Vav at Patan as a World Heritage Site; 2023 as the UN International Year of Millets; kharif sown June to July, harvested September to October, rabi sown October to November, harvested March to April; Pongal in January in Tamil Nadu, Baisakhi in April in Punjab, Bohag Bihu in April in Assam (the Assamese new year and the start of sowing; the passage therefore speaks of festivals of the farming year, not harvest festivals), Onam in late summer and early autumn in Kerala; community radio range of about fifteen kilometres; India Post as the largest network by number of offices.
- [ ] Model answers fit their word limits and each marking scheme totals the item's marks.
- [ ] Tags to review: see the competency review below.
- [ ] Decks: no worked example repeats a bank item; check slides point only at objective items.

## Competency review (producer review)
Seven single-step items were retagged to understanding (text unchanged; `dk_heading` and `dk_subpoint` also lowered to d1): `dk_infer`, `dk_heading`, `dk_subpoint`, `m_main_idea`, `m_inference_closed`, `m_notes_title`, `s2_inference`. Three items were rewritten in place into higher-order items:
- `m_reference` (application, d3): School P 45 of 150 cycle, School Q 60 of 250; a reporter says Q is more cycling-friendly because it has more cyclists. Key: a larger share of students at P cycle (30 per cent against 24 per cent), though Q has more cyclists.
- `m_notes_pointform` (analysis, d3): the canal silted, boats could not reach the market, traders moved to the road, the river port declined; which notes keep the logic of the passage. Key: the arrow chain in passage order; a bare list or scrambled order loses the reasoning.
- `m_tone_sarcasm` (analysis, d3): the committee thanks residents for their patience, a word the residents had stopped hearing with any meaning; ironic or appreciative. Key: ironic, decided by the detail that the word had lost its meaning for the residents.
Second producer pass (item by item, 2026-11-12): every key re-answered blind and every figure recomputed; tags stand as above. Two content fixes: `s3_sum_trim` now calls the draft 75 words (its real length), and `s3_notes_festivals` no longer calls Bohag Bihu a harvest festival (the passage and model now speak of the farming year). Result: 34 of 68 (50%) at application or above. Answer-leak scan clean; two builds give identical md5 (`release.json` 4cdd096bb06bbefe9074356b5a0ca686, `tests.json` f7b4a31ed52583c2a93def8bf3be7983).
