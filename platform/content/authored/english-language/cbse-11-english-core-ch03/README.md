# CBSE Class 11 English Core: Chapter 3, Creative Writing

| | |
|---|---|
| Unit | `cbse-11-english-core-ch03` (family `english-language`) |
| Syllabus | `platform/catalog/cbse/11/english-core/syllabus.yaml` (2026-27): t01 classified advertisements (up to 50 words) · t02 poster (up to 50 words) · t03 speech (120-150 words) · t04 debate (120-150 words). No removed topics. |
| School weight | Class 11 has no board exam. Annual school paper, creative writing 16 marks: classified advertisement 3, poster 3, speech 5, debate 5, each with an internal choice |
| Files | `release.json` (2 decks: 19 + 20 slides; 8 notes sections; 30 flashcards; 67 questions with 8 passage children), `tests.json` (short 20 / 40 min; long 40 / 90 min), `src/` (builder; uses the shared library `../../cbse-11-english-core-ch01/src/lib.mjs`, unedited) |
| Provenance | `origin: human`, author string is the library constant; every item `status: draft`; drafted by a content writer, to be reviewed by the producer |

Rebuild from `platform/`: `npx tsx content/authored/english-language/cbse-11-english-core-ch03/src/build.mjs`.

## Scope per topic
- **t01 classified advertisements:** the six-part layout, telegraphic style, cost per word, categories (for sale, to let, situation vacant, lost and found, tuition). Matrimonial advertisements are deliberately not used.
- **t02 poster:** essentials (title, slogan, date, time, venue, who may join, organiser, contact), visual appeal shown in words, event versus awareness posters. A deck slide has an SVG of the layout zones.
- **t03 speech:** five parts, audience and occasion, devices, adapting to a new audience.
- **t04 debate:** motion, address, stand, arguments, rebuttal, closing appeal; for and against.

## Format mapping (the schema has no poster or debate format)
- Classified advertisements: `format: 'advertisement'`, word limit 30-50.
- Posters: `format: 'other'`, word limit 30-50, written as text layout (Markdown lines: title, slogan, date, venue, organiser, contact).
- Speeches: `format: 'speech'`, word limit 120-150.
- Debates: `format: 'speech'` too (no debate format exists), word limit 120-150; the rubric and stems make clear they are debate speeches.
- Models, counted as the build counts them (every word including headings and the contact line): advertisements 35-37 words, posters 36-42, speeches 126-135, debates 129-150. Phone numbers are masked as 98XXXXXX10; email addresses are not used because the content lint rejects them.

## Deck shape
**Part 1, advertisements and posters (19 slides, 11 visuals, 4 checks, 4 example slides):** school pattern table, what a classified advertisement is (category table), wordy versus classified style, six-part flow, worked example 1 (a Wanted advertisement: plan, then finished text), check (abbreviation), categories and forgotten details, check (match), what a poster must do, poster layout zones (SVG), weak versus strong poster, worked example 2 (tree plantation poster: plan, then finished text), 2 checks, how the 3-mark tasks are marked, summary, exam tips.

**Part 2, speech and debate (20 slides, 13 visuals, 4 checks, 4 example slides):** pattern, occasion and audience, five-part flow, salutation and opening, devices table, worked example 1 (speech on punctuality: plan, finished speech), check (ordering), debate flow, address and stand, rebuttal table, worked example 2 (debate on school uniforms: plan, finished speech), check (rebuttal), speech versus debate, 2 checks, marking, summary, exam tips.

No deck example is a bank item: the deck cases (sewing machine, tree plantation, punctuality, uniforms) never appear as bank tasks. Narration: max 66 words, mean 51.

## Question bank (67 items, 148 marks)
| Type | Count | Notes |
|---|---|---|
| writing, advertisement | 6 | for sale, to let, situation vacant, lost, found, tuition; 3 marks |
| writing, poster | 5 | blood donation camp, water week, science fair, plastic-free week, road safety week; 3 marks |
| writing, speech | 4 | reading habit, farewell, sports day welcome, screen time for parents (audience adaptation); 5 marks |
| writing, debate | 4 | phones in school, online classes (against), homework (rebuttal of a given claim), entrance exams; 5 marks |
| mcq | 24 | format, register, conventions, cost per word, which advertisement is better and why, rebuttal choice, devices, strongest argument; keys a/b/c/d = 6/6/6/6 |
| true-false | 3 | |
| fill-blank | 3 | salutation, chairperson, slogan |
| match | 2 | advertisement column to details; term to meaning |
| ordering | 2 | parts of a speech; parts of a debate speech |
| short 2-mark | 7 | fix a faulty advertisement, convert a wordy one, name what a poster lacks, a debate opening line, why short phrases, a two-sentence rebuttal, rewrite a weak speech ending |
| short 3-mark | 5 | compare two posters, body paragraph of a speech, speech versus debate structure, rebuttal paragraph, adapt an opening to parents |
| case-based | 2 | a faulty Wanted advertisement; a faulty debate draft (four 1-mark parts each, `soyl-original`) |

- **Rubrics** (every writing item): advertisement and poster, 3 marks = format and layout 0.5 + content 1.5 + expression 1; speech and debate, 5 marks = format 1 + content 2 + expression 2. SOYL rubrics modelled on the school pattern; confirm the split against the school's own scheme.
- **Difficulty:** d1 12 · d2 27 · d3 20 · d4 8.
- **Competency (after producer review):** recall 9 · understanding 26 · application 24 · analysis 8, so **47.8% application or higher** (32 of 67). Full writing tasks are application; the screen-time speech (adapting to parents) and the homework debate (rebutting a given claim) are analysis; the strongest-argument item is evaluation. Spotting what a draft lacks by checklist, matching terms and choosing a suitable opening are understanding.

## Tests (`tests.json`, `blueprint_id: null`)
The class-default chapter-test blueprints (mcq, assertion-reason, 5-mark long answers, case-based sets) cannot hold the `writing` tasks that make up this chapter's school paper, so both tests follow the school pattern instead.
- **Short (20 marks, 40 min):** A classified advertisement 3 (one of two) · B poster 3 (one of two) · C speech or debate 5 (one of two) · D three mcq, one true-false, a 2-mark short and a 3-mark short (9). 12 items.
- **Long (40 marks, 90 min):** A advertisement 3 · B poster 3 · C speech 5 · D debate 5 (each one of two, 16 marks) · E ten mcq (10) · F 2-mark shorts, any 4 of 5 (8) · G 3-mark shorts, one from each of two pairs (6). 27 items.
- The tests share no item; no deck check item appears in either. Unused practice items: `ad_lost`, `ad_found`, `poster_road`, `sp_screen`, `db_exams`.

## Reviewer checklist
- Every word count, including headings and contact lines, within the limit (the build errors beyond plus or minus 20 per cent).
- Every advertisement is in a genuine classified category and none is matrimonial.
- No real organisation, newspaper masthead or person: the newspaper, school, club and association names are invented; phone numbers are masked.
- Debates attack arguments, never people; the farewell and the parents' speech keep a dignified tone.

## Competency notes for the reviewer
- `m_remove_detail` (analysis): the venue is the intended answer; if judged too easy, downgrade to understanding.
- `m_tolet_compare` (analysis, d4): compares two imagined advertisements on specificity; may be judged understanding.
- `m_cost` (application): a small word-budget calculation.
- `s2_rebut`, `s3_rebuttal_par`, `s3_adapt` (analysis): the rebuttal answers a given claim; the adaptation changes salutation and hook for a new audience.
- `case_debate_draft` (analysis): two of four parts are analysis; the set is d4 as a whole.

## Known gaps
- Posters are text only; visual appeal is shown by layout and a note. The SVG slide shows zones, not a finished poster.
- The split of marks inside each task is SOYL's rubric, not a quoted marking scheme.

## Producer review (2026-11-14, Opus)
Drafted by a Sonnet content writer (D-050); every item re-answered blind and every word count checked by the Opus producer. Keys and models stand; tags changed where the distractors were plainly wrong or the notes state the answer:
- Retagged analysis to understanding: two-advertisement comparisons where one draft is plainly empty (`m_better_ad`, and `m_tolet_compare` d4 to d3), `m_remove_detail` (the venue), `m_flaw_close` (no new argument after the thanks is a stated convention), `case_debate_draft` (parent and part (a), the personal attack: both d3 to d2 or d3).
- `m_strongest_arg` evaluation to analysis (d4 to d3): the three weak arguments are plainly weak, but picking the one that links a general fact to the proposal still needs judgement.
- Kept as analysis: the rebuttal MCQ, the parents' screen-time speech, the homework rebuttal debate, the rebuttal shorts and the poster comparison short (each needs an answer built to a given claim or audience).
- Result: 32 of 67 = 47.8% application or higher, inside the 45-65% band; full writing tasks carry most of it.
