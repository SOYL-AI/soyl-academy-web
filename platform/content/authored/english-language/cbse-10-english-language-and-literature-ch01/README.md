# CBSE Class 10 English Language and Literature — Chapter 1: Reading Comprehension: Unseen Passages

| | |
|---|---|
| Unit | `cbse-10-english-language-and-literature-ch01` (family `english-language`) |
| Syllabus | `platform/catalog/cbse/10/english-language-and-literature/syllabus.yaml` (2026-27): t01 discursive passage (400–450 words) · t02 case-based factual passage with visual input (200–250 words) · t03 vocabulary in context. No removed topics. |
| Board weight | Section A, Reading Skills, 20 marks: Q1 discursive passage 10 + Q2 case-based factual passage with visual input 10 (`blueprints/board.yaml`, section A) |
| Files | `release.json` (2 decks: 20 + 17 slides; 8 notes sections; 30 flashcards; 62 questions with 120 passage children), `tests.json` (short 20 / 40 min; long 40 / 90 min), `src/` (builder; uses the shared library `../cbse-10-english-language-and-literature-ch02/src/lib.mjs`, unchanged) |
| Provenance | `origin: human`, `author: claude-opus-5-5 (subject-producer)`, every item `status: draft` |

Rebuild from `platform/`: `npx tsx content/authored/english-language/cbse-10-english-language-and-literature-ch01/src/build.mjs` (deterministic).

## Originality
This is a skills chapter, so it holds no textbook text at all. **Every passage, example sentence, survey, place description and data set was written for SOYL for this chapter** (`passage_origin: soyl-original` on all 18 passage items). No passage was copied or adapted from any book, newspaper, website, sample paper or past paper. All figures in tables and charts are invented and every visual is captioned *illustrative data*. The online science fair in `fp_fair` is fictional and labelled so. Place names (Lucknow, Chennai, Bengaluru, Mumbai, Indore) only set the scene. No real survey, scheme, organisation or newspaper is quoted or attributed.

## Scope and shape

**Deck part 1, the discursive passage (20 slides):** Section A table → what a discursive passage is → five-step plan (flow) → skimming and scanning (table) → check → the shape of an argument (table) → worked example: claim and support in a SOYL paragraph → inference (table) → worked example: an inference question → check → tone (table of 7 tone words) → worked example: three sentences, three tones → check → vocabulary in context (5 clue types) → worked example: the four-step word method → check → answering 1- and 2-mark questions → how Q1 is marked → summary → exam tips.

**Deck part 2, the case-based factual passage (17 slides):** what Q2 is → reading the visual first (flow) → reading a table (sapling drive) → reading a bar chart (fitness challenge) → worked example: three chart questions → check → the language of numbers → check → linking text and visual → worked example: does the figure support the claim? → five traps (table) → check → vocabulary in factual passages → check → how Q2 is marked → summary → exam tips.

Narration: max 71 words, mean 56. Visuals on 18 of 37 slides. The deck's demo passages (school garden, Nisha, three tone sentences, *candid*, sapling table, step chart) appear only in the decks, so no practice key repeats a slide.

## Question bank (62 items, 210 marks; 150 marks are passage-based)

| Type | Count | Notes |
|---|---|---|
| case-based, discursive (Q1 pattern) | 6 | 416–432 words; 8 parts = six 1-mark (MCQ, complete the sentence, true/false, find the word) + two 2-mark answers (30–40 words) = 10 marks. Topics: unstructured time, repair culture, multilingualism, learning from failure, city trees and shade, public libraries. |
| case-based, factual with visual (Q2 pattern) | 6 | 207–224 words + a table or bar chart; same 8-part, 10-mark shape. Topics: students' sleep (bar), a bicycle-sharing scheme (table), household water use (table), migratory birds at a wetland (bar), rooftop solar (bar), an online science fair across continents (table). |
| case-based, short skill passages | 6 | 68–126 words, 4 parts, 5 marks: tone (two views of a flyover), inference (a newspaper stall), vocabulary (Mumbai monsoon), reference words and linkers (electric buses), a small table (a bag bank), fact and opinion (a later school bell). |
| mcq | 16 | strategies, inference, tone, word meaning from context, main idea, percentage points, chart axes, fractions; keys a/b/c/d = 4/4/4/4 |
| fill-blank | 4 | skimming/scanning, synonym clue, percentage points, doubled |
| true-false | 5 | |
| assertion-reason | 4 | keys a, c, d, b |
| match | 3 | strategy ↔ use; tone word ↔ meaning; question ↔ skill |
| ordering | 2 | steps for a discursive passage; steps for reading a visual |
| short (2 marks, 30–40 words) | 10 | skim vs scan, inference, tone, word strategies, fact/opinion, judging a claim against a table, percentage points, main idea, rhetorical opening, a fair conclusion |

- **Passage children:** 120 parts (mcq 51, short 36, fill-blank 20, true-false 13). Child MCQ keys a/b/c/d = 13/13/12/13.
- **Difficulty:** d1 9 · d2 23 · d3 28 · d4 2 (the d4 load sits inside the passages: every passage has a d4 evaluation part). **Competency:** recall 4 · understanding 21 · application 12 · analysis 19 · evaluation 6 → **60% application or higher**.
- **Word limits:** every 2-mark model answer (36 passage parts + 10 standalone) is strictly inside 30–40 words, checked by script, not just the builder's ±20% band.
- **Data integrity:** every difference, ratio, total and multiple in a key was recomputed: 8.9 − 6.4 = 2.5 h; 25 − 14 = 11 thousand trips; 27 + 24 = 51%; 15,100 − 9,800 = 5,300; 6,300 − 4,100 = 2,200 and 6,300 ÷ 600 = 10.5; science-fair totals 5,700 / 6,750 / 8,250 and Africa 420 → 1,300 ≈ 3.1×; 90 − 85 = 5 and 90 > 2 × 40.
- **D-032:** written parts keep their worked answer in `answer.model_answer_md`, with a short method note in `solution_md`. No key sentence of 60+ characters appears in served content (builder check).

## Chapter tests (`tests.json`)
- **Short (20 marks, 40 min):** A discursive passage `dp_boredom` (10) · B factual passage with bar chart `fp_sleep` (10). This mirrors board Section A exactly.
- **Long (40 marks, 90 min):** A one of two discursive passages (`dp_repair` / `dp_languages`) · B one of two factual passages (`fp_cycles` / `fp_water`) · C two skill passages (`mp_tone`, `mp_bags`) · D ten 1-mark objective items.
- **The two tests share no passage and no question.** Practice-only passages: `dp_failure`, `dp_trees`, `dp_libraries`, `fp_birds`, `fp_solar`, `fp_fair`, `mp_infer`, `mp_vocab`, `mp_reference`, `mp_factopinion`.
- `blueprint_id` is null, as for ch02/ch03. The subject's chapter-test blueprints describe literature chapters (5-mark extracts, 3- and 6-mark answers), and Section A is two 10-mark case-based passages, so these tests cannot follow them item for item.

## Facts to confirm (reviewer)
1. **Section A sub-question split.** The board fixes 10 marks per passage. The split used here (six 1-mark parts + two 2-mark answers of about 30–40 words) is SOYL's model of recent CBSE sample papers and should be checked against the 2026-27 SQP and marking scheme. It is easy to change in `src/questions.mjs`.
2. **Teen sleep advice of about 8–10 hours a night** (`fp_sleep`): this is the commonly cited recommendation for 13–18-year-olds. The survey itself is invented.
3. **E-waste** (`dp_repair`): e-waste is among the fastest-growing waste streams, and most of it is not formally recycled. Right-to-repair campaigns, and some governments acting on them, are described only in general terms.
4. **Languages** (`dp_languages`): the world has roughly 7,000 languages, and a large share may stop being spoken this century. The research claim about bilingual attention and flexibility is presented as debated.
5. **Trees** (`dp_trees`): cooling by shade and transpiration; tree-lined streets several degrees cooler; neem, jamun, banyan and arjun native to India; barbets as fruit-eating birds.
6. **135 litres per person per day** (`fp_water`) as the urban planning benchmark commonly used in India.
7. **Johads** (`mc_main_idea`): traditional earthen rainwater ponds revived in villages of Rajasthan.
8. **Migratory routes** (`fp_birds`): winter visitors to Indian wetlands from Central Asia, Siberia and the Himalaya. The wetland and its counts are invented.
9. **Libraries** (`dp_libraries`): volunteer-run community libraries in villages of several Indian states, and mobile book vans.
10. **Space agencies, India's among them, have lost rockets or spacecraft** (`dp_failure`): stated generally, with no mission named.
11. **A government subsidy for household rooftop solar** (`fp_solar`) exists in India. No scheme is named, and the district and figures are invented.

## Verifier record (author pass, 2026-10-27)
- Every objective part re-answered from its passage; every *find the word* answer confirmed to be in the named paragraph in the stated part of speech; every true/false checked against both text and visual.
- Passage lengths measured by script (word count without paragraph numbers): discursive 416–432 (five were first drafted at 371–392 and extended with original sentences); factual 207–224.
- One solution's wording corrected (*unfavourably* is an adverb, not a phrase).

## Known gaps
- The syllabus also allows other visual inputs (for example pie charts or infographics). This chapter uses tables and bar charts only, the two kinds the shared visual contract renders today.
- No audio or listening component (internal assessment) is covered here.
