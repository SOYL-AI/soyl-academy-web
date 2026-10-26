# curriculum-architect + content-verifier — catalog QA fixes (writing items, chapter-test overrides, Maths variants, MCQ key balance) — 2026-10-27

Status: **done**. All six items are closed. The open follow-ups are listed at the end.

Branch: `platform/curriculum-cbse/qa-fixes` (worktree `C:/Users/Prabhu/soyl-wt/catalog-qa`). It is based on `origin/platform/main` 1bef0d9 and merged local `platform/main` bebeeff (the CBSE 10 English merge and backend M3) before any work started.

## Commits
| Commit | Item | What |
|---|---|---|
| 71c8267 | 1 | English L&L X: writing items for the letter and analytical paragraph; chapter tests on the board pattern; `blueprint_id` set on ch04 and ch13 |
| 47a7185 | 3 | Hindi A/B X: chapter-test and unit-test overrides on the board marks; `blueprint_id` set on the Hindi A ch10 exemplar |
| 300bb9b | 2 | Sweep: writing tasks in every CBSE board and second-exam blueprint are `writing` items (128 files) |
| 2cb1ffe | 4 | Maths X: Standard 041 and Basic 241 as subject variants and blueprint `variant` fields; the pipeline reads the field; catalog check |
| 61c04ef | 5 | MCQ answer-key rebalance in the science ch01 and Hindi A ch10 exemplars |
| 3672131 | 6 | Remaining language overrides (English Communicative X, Sanskrit X, English Core XII, Hindi Core XII, Hindi Elective XII) use their board papers' item marks |
| (this commit) | — | This handoff and the STATUS rows |

## 1. CBSE 10 English Language and Literature
- **`board.yaml`, `board-second-exam.yaml`.**
  - Q4 (formal letter) and Q5 (analytical paragraph) are each `writing ×2, 1 of 2, 5 marks`. They were `long`.
  - The section B instructions now give the format, the word limit and the 2026-27 marking-scheme rubric:
    - letter: Format 1 · Content 2 · Organisation of ideas 1 · Accuracy 1.
    - analytical paragraph: Content 2 · Organisation of ideas 2 · Accuracy 1.
  - The notes no longer say that the contract has no writing type.
- **`chapter-test-short.yaml` (20 marks, 40 min).** These are the board's literature marks:
  - Section A: one 5-mark extract (`source-based`).
  - Section B: 3-mark shorts, three of four, in 40–50 words.
  - Section C: a 6-mark long answer, one of two, in 100–120 words.
- **`chapter-test-long.yaml` (40 marks, 90 min).**
  - Section A: two 5-mark extract pairs, one of each pair.
  - Section B: 2-mark shorts, three of four.
  - Section C: 3-mark shorts, four of five.
  - Section D: two 6-mark long pairs, one of each pair.
- **The 7- and 8-mark long items are gone.**
- **`unit-test.yaml` (50 marks).** A cut of the board paper:
  - reading 10;
  - grammar, 10 of 12;
  - letter and analytical paragraph as two `writing` items, 5 marks each;
  - a 5-mark extract;
  - 3-mark shorts, three of four;
  - a 6-mark long answer, one of two.
- **`blueprint_id` in tests.json.**
  - I compared every test with its blueprint section by section using a script. It checks the type of each question (with the engine's numerical→short/long mapping), marks, choice-group size, attempt count, total marks and duration.
  - **ch04 and ch13** match both blueprints exactly, so their tests now carry `cbse-10-english-language-and-literature-chapter-test-short` / `-long`.
    - The shared builder's `test()` takes an optional `blueprint`, and the ch04 and ch13 builds pass it.
    - Rebuilding produces the same files byte for byte.
  - **ch02 (Grammar) and ch03 (Writing Skills)** keep `null`, because their sections cannot match a literature blueprint:
    - ch02 section A is one 10-of-12 group that mixes fill-blank and 1-mark short items. A blueprint item has one type, so this cannot be written as a blueprint.
    - ch03 is built from 5-mark `writing` pairs, an editing case and objective items.
    - Neither has extracts or 6-mark longs.
  - The four READMEs say this.
- **Pipeline check.** I assembled from the files bank (`bankFromFiles` + `planSubjectTests`): ch04 and ch13 chapter tests now fill from their own questions, with the blueprint id. ch02 and ch03 return generation requests, as expected.

## 2. Sweep: writing tasks are `writing` items
- **Scope.** Every CBSE `board` and `board-second-exam` blueprint, plus the Class 11 `annual`/`half-yearly` papers that copy a Class 12 board layout (English Core, Hindi Core, Hindi Elective).
- **What became `writing`.** The following writing tasks were `long`/`short`:
  - letters and applications, e-mails, notices, invitations, messages, advertisements;
  - articles, reports, speeches, essays and paragraphs (अनुच्छेद, रचनात्मक लेख);
  - stories (लघुकथा, story from cues), diary and dialogue writing, स्ववृत्त;
  - picture descriptions, minutes, précis and passage summaries, and passage translations (4 marks or more).
- **What did not change:**
  - sentence-level translation and usage items (1 mark);
  - grammar definitions;
  - literature answers;
  - Hindi Core and Elective XII media-theory answers (प्रश्न 4/5 and 3/4/6, checked in the SQPs);
  - the Marathi XII Q8 applied-writing theory question.
- **Result.** 128 files, 125 sections, 446 question slots (429 long → writing, 17 short → writing).
- **Check (script, against HEAD).** For every changed file:
  - `total_marks`, attempted marks per section, item counts per section and the (marks, internal choice) structure are unchanged;
  - the only type changes are long/short → writing.
- **Split items.** Where one item mixed writing and non-writing questions, I split it using the SQP or the CBSE design:
  - Bodo X: Q5 i–v are textbook answers; Q5 vi (letter), Q5 vii (description) and Q6–Q7 (passage summaries) are writing.
  - Bodo XII: Q5 iv (proverb expansion), Q5 v (letter to the editor) and Q6 (passage summary) are writing; Q7 (poem summary) stays long.
  - Manipuri X: two 3-mark writing tasks and one 3-mark other task.
  - Mizo XII: reports, 2 × 2.
  - Kashmiri X Section D: 2 of 4 are writing. The design names essay, story and letter. This is a SOYL estimate, because the SQP is unreadable.
- **One correction.** In the 2026-27 SQP, English Elective XII Q6 is "attempt ANY ONE" of a report and an article. It is now `writing ×2, 1 of 2`; it was a single item. Attempted marks are unchanged at 5.
- **FORMAT MAPPING notes** in 111 language blueprints, plus English Communicative, Hindi A/B and English Core XII, now map writing tasks to `writing` items.

## 3. CBSE 10 Hindi A/B overrides
- **Hindi A `chapter-test-short` (20 marks, 40 min).**
  - Section A: 5-mark पठित गद्यांश/काव्यांश, source-based with 5 MCQs.
  - Section B: 5 × 1-mark MCQs.
  - Section C: 2-mark shorts, three of four, in 25–30 words.
  - Section D: a 4-mark long answer, one of two.
- **Hindi A `chapter-test-long` (40 marks, 80 min, as in both Hindi exemplars).**
  - Section A: two 5-mark extracts.
  - Section B: 6 MCQs and 2 assertion-reason items.
  - Section C: 2-mark shorts, five of six.
  - Section D: 4-mark longs, three of four.
- **The gold-standard exemplar** `hindi-literature/cbse-10-hindi-a-ch10` matches both blueprints exactly, so its tests now carry the blueprint ids.
  - The grammar exemplar (`hindi-language/…-ch02`) keeps `null`: it has its own section design.
  - Assembled ch10 chapter tests now fill from the bank.
- **Hindi B.** Same shape, but the board's 3-mark संचयन answers (50–60 words) replace the 4-mark longs, because the Hindi B paper has no 4-mark textbook item.
- **Unit tests (both).** 50-mark cuts of each board paper:
  - a 7-mark अपठित passage;
  - grammar, four of five;
  - textbook items;
  - रचनात्मक लेखन as `writing` items.

## 4. Maths Standard 041 / Basic 241
- **`subjects.yaml`.** `cbse-10-mathematics` now lists its variants: `{code: "041", name: Standard}` (the default paper) and `{code: "241", name: Basic}`.
- **Blueprints.**
  - `board.yaml` and `board-second-exam.yaml` have `variant: {code: "041", name: Standard}`.
  - `board-basic.yaml` and `board-second-exam-basic.yaml` have `variant: {code: "241", name: Basic}`.
  - The notes no longer say that the contract has no variant field.
- **Pipeline (`content-pipeline/src/assemble/series.ts`).**
  - `variantOf(bp, subject)` reads the field.
  - A variant whose code is the subject's own code (041) is the default paper, with key `''`. This means:
    - the Standard test ids and series keys are unchanged;
    - `blueprintFor(catalog, subject, 'board')` still returns the Standard paper. The API's live-mock admin calls it with no variant, so live mocks keep working.
  - Basic keeps the key `basic`.
  - Mock titles now name the variant ("… Standard — Full mock 1").
  - Without the subject-code rule, adding the field to Standard would have renamed its series and broken that lookup.
- **Catalog check (`content-pipeline/src/catalog.ts`).** A blueprint's `variant` must be one of its subject's variants; otherwise it is an error.
- **Tests (`content-pipeline/test/stages.test.ts`).**
  - The plan's variants come from the field: Standard 041 with key '', and Basic 241.
  - The Basic May paper carries the Basic variant.
  - The field wins over the id suffix.
  - A new test shows that a mismatched variant is a catalog error.

## 5. MCQ answer-key skew in two exemplars
- **Script.** For each MCQ that moves, it swaps the key option with the option at an under-used position. That is one swap per item: the option ids stay `a`–`d` and the texts move. It then remaps the option letters in `solution_md` and `marking_scheme` through the same swap, including the Devanagari letters (क)–(घ). Items with options that refer to other options or to "all/none of the above" are never moved.
- **science/cbse-10-science-ch01.** Keys went from a 8 · b 11 · c 4 · d 1 to **6 · 6 · 6 · 6**. Seven items moved:
  - q002 and q004: b→c;
  - q006, q017 and q021: b→d;
  - q011 and q022: a→d.
- **hindi-literature/cbse-10-hindi-a-ch10.** Keys went from a 1 · b 17 · c 4 · d 0 to **5 · 6 · 6 · 5**. Eleven items moved:
  - q002, q010, q011 and q013: ख→क;
  - q015 and q030: ख→ग;
  - q032, q043, q045, q046 and q062: ख→घ.
  - In q062 the solution's (क)/(ख)/(ग)/(घ) commentary was remapped too.
- **Before/after check (separate script, HEAD vs working tree):**
  - every (stem, correct option text) pair and every option set is identical, for 42 and 60 items with options;
  - nothing else in either release changed;
  - check slides reference questions by `check_question_id` only;
  - tests.json is unchanged.
  - Versions are unchanged (draft content).
- **READMEs** record the rebalance.

## 6. Other catalog rows closed
- **Other language overrides.** The same 7/6/8-mark defect was in English Communicative X, Sanskrit X, English Core XII, Hindi Core XII and Hindi Elective XII. Each now uses only its own board paper's item marks:
  - chapter tests: literature-section marks;
  - unit tests: 50-mark board cuts, with writing tasks as `writing` items.
- **Check.** Every (type, marks) slot in every CBSE language override now exists in that subject's board paper. The one exception is English L&L's 2-mark recall shorts, which the authored ch04/ch13 tests use.
- **STATUS.md.** The two Content QA rows (MCQ skew; Hindi overrides + Maths `variant`) are marked done.

## Validation (from `platform/`, final commit)
```
$ npm run content -- catalog
total                    767      644      7440   26454         359
catalog valid: 0 error(s), 0 warning(s)

$ npm test -w @soyl/content-templates -w @soyl/content-pipeline -w @soyl/db
content-templates   Test Files  1 passed (1)    Tests  260 passed (260)
content-pipeline    Test Files  7 passed (7)    Tests  235 passed (235)   (+1 new: catalog variant check)
db                  Test Files 13 passed (13)   Tests  104 passed | 1 skipped (105)

$ npm run content -- lint --exemplars
37 units ok, 0 errors. balance.answer-keys warnings: none (was 1 each on science ch01 and hindi-a ch10).
Remaining warnings (pre-existing): hindi-a-ch10 literature.quote-review ×9, passage.origin ×6, balance.competency ×1

$ npm run content -- verify --board cbse --class 10 --authored
verify --authored: 37 unit(s), 2760 questions, 0 blocking flag(s) (deterministic checks only; files unchanged)

$ npx vitest run --root api test/content.test.ts        (answer-leak contract, after item 5)
Test Files  1 passed (1)    Tests  13 passed (13)

$ npm run typecheck -w @soyl/content-pipeline           (after item 4)
tsc -p tsconfig.json  -> no errors
```
Extra checks used during the work (scratch scripts, outside the repo): test vs blueprint exact-match (SST authored tests used as a control: 6/6 match); the writing-sweep invariant check against HEAD (128 files, 0 problems); the MCQ before/after (stem, key text) diff; a (type, marks) check that every language override slot exists in the board paper.

## Follow-ups (not done here)
- **Analytical-paragraph rubric (English producer).**
  - ch03's eight analytical-paragraph items (q009–q016) use Content 3 · Organisation and expression 1 · Accuracy 1.
  - The 2026-27 marking scheme has Content 2 · Organisation of ideas 2 · Accuracy 1.
  - The formal-letter rubric already matches.
  - Changing the rubric means editing the items in `src/questions.mjs` and possibly the deck, so I left it to the producer.
- **Unit tests for language subjects.**
  - The series planner partitions syllabus chapters in order into three half-syllabus tests.
  - For English and Hindi, the reading, grammar and writing chapters are the first chapters (ch01–ch03 in English). So only the first partition can fill a board-style unit test, which needs reading, grammar and writing items.
  - pipeline-engineer: language subjects should get those skill chapters in every partition.
- **Class XII humanities overrides** (History, Political Science, Geography) still use marks that their board papers do not have:
  - History: 2-mark shorts and 5-mark longs;
  - Political Science: 3-mark shorts and 5-mark longs;
  - Geography: 2-mark shorts and 4-mark source items.
  - No content uses them yet. Align them before Class XII humanities production.
- **Map items.** The History XII and SST X map sections are still `short` items. Contract v2 has a `map` type; converting them belongs with the map renderer work.
- **Hindi exemplar test ids.**
  - The pipeline names assembled Hindi A tests `t_cbse10hina_…`, but the exemplar's authored tests are `t_cbse10hia_…`.
  - This is harmless today, because chapters with authored tests are not re-assembled. Worth unifying before the exemplar is published alongside assembled tests.
- **Writing-item conversions that rest on unreadable SQPs.** These follow the blueprint's own description or the CBSE design:
  - Kashmiri X Section D split;
  - Manipuri, Mizo, Tamil, Telugu, Urdu A/B and Bhutia items;
  - several unverified Class 12 languages.
  - The blueprints stay `source_status: unverified`.
