# curriculum-architect + assessment-designer — CBSE 10 supplementary-reader (Footprints) and कृतिका chapter-test blueprints — 2026-10-27

Status: **done**

Branch: `platform/curriculum/cbse10-reader-blueprints` (worktree `C:/Users/Prabhu/soyl-wt/catalog-cbse10-blueprints`), from `origin/platform/main` 42549a2. I merged `origin/platform/main` again (3648363: English ch18–22 and ch27–30) before re-selecting the ch27–ch30 tests, so all eight Footprints chapters now on main are covered. No sub-agents.

Inputs: handoffs `2026-10-27-subject-producer-cbse10-english-f.md` (ch23–26), `…-english-g.md` (ch27–30) and `…-hindi-d.md` (Hindi A ch14–17).

## What changed

### 1. New blueprints (catalog)
| File | Paper | Chapters (via `scope`) | Shape |
|---|---|---|---|
| `catalog/cbse/10/english-language-and-literature/blueprints/chapter-test-short-supplementary.yaml` | chapter-test-short, 18 marks / 40 min | ch23–ch31 | A: 3-mark short answers (40–50 words) × 6, two of each three · B: 6-mark long (100–120 words), one of two |
| `…/chapter-test-long-supplementary.yaml` | chapter-test-long, 36 marks / 80 min | ch23–ch31 | A: 2-mark recall × 4, three of four · B: 3-mark × 6, two of each three · C: 6-mark × 6, one of each pair |
| `catalog/cbse/10/hindi-a/blueprints/chapter-test-short-kritika.yaml` | chapter-test-short, 20 / 40 | ch15–ch17 | क: MCQ × 6 · ख: 2-mark (25–30 words) × 4, three of four · ग: 4-mark (50–60 words) × 3, two of three (= प्रश्न 11) |
| `…/chapter-test-long-kritika.yaml` | chapter-test-long, 40 / 80 | ch15–ch17 | क: MCQ × 8 + assertion-reason × 4 · ख: 2-mark × 8, two sets of three of four · ग: 4-mark × 6, two sets of two of three (प्रश्न 11 twice) |

- **No extract or passage section in any of them.** The 2026-27 board paper sets *Footprints without Feet* only as Q9 (3-mark, two of three) plus one 6-mark long answer. It sets कृतिका only as प्रश्न 11 (4 marks, 50–60 words, two of three).
- **English totals are 18 and 36, not 20 and 40.** Only the board's own item forms for this reader are used, plus the subject's existing 2-mark recall section in the long test.
- **Generic blueprint notes updated.** The English generic chapter tests are now described as for First Flight (ch04–22). The Hindi A generic chapter tests are described as for क्षितिज (ch03–14), with a pointer to the overrides.
- **Sources:** `catalog/sources/cbse.md` adds "Used for" lines to `cbse-sqp-x-english-language-and-literature-2026-27` and `cbse-sqp-x-hindi-a-2026-27`. Both were used for pattern only; no question was copied.

### 2. Wiring: chapter override through `scope` (decision)
The catalog had no per-chapter override. The existing "language-specific overrides" are subject-level blueprints that replace class defaults. The blueprint schema already allows `scope` to be a list of chapter ids, and nothing in the repo used that list form. I used it as the override, with a small code change in `content-pipeline`. That package is owned by pipeline-engineer and the change is flagged here:
- `content-pipeline/src/catalog.ts`:
  - `chapterOverride(bp)` returns a blueprint's chapter list, or null.
  - The catalog check now errors when an override names a chapter not in the subject's syllabus, when a class default uses a chapter list, or when two overrides of the same paper type claim the same chapter.
  - `blueprintsFor(catalog, subject, chapterId?)`: an override replaces the same-paper-type blueprint for its chapters. Overrides are left out when no chapter is given.
- `content-pipeline/src/assemble/series.ts`:
  - `blueprintFor(…, chapters?)` picks an override that covers all of the paper's chapters, for the default variant only.
  - Overrides are never treated as paper variants. `variantsFor` ignores them, so the id suffix "-supplementary" / "-kritika" does not create a variant.
  - `planSubjectTests` passes each paper's chapters.
- `content-pipeline/src/requests.ts`: generation context passes the chapter id, so ch23–31 and ch15–17 see their override in the question plan. Other chapters see exactly what they saw before.
- **Tests:** two added in `content-pipeline/test/stages.test.ts`, covering resolution, planning and generation context, and the catalog errors.

### 3. Syllabus wording
- **English ch23–ch31:** the exam-practice topic is t04 in every chapter except ch28, where it is t03. Its title is now "Exam practice: short-answer and long-answer responses". Its outcome is now "Answer 3-mark short-answer questions (40-50 words) on character, theme and values with evidence from the text". Neither says extract-based any more.
- **English ch28:** added **t04 "Character: Richard Ebright as a young scientist"**.
  - It fits the structure of every other Footprints chapter (summary, themes, character, exam practice).
  - Ids are stable: t03 is unchanged. t04 is listed before t03 in the file so the order reads naturally, and nothing depends on list position for ids.
  - The ch28 items on Ebright's qualities are still tagged t02. Retagging them is a content follow-up, noted in the ch28 README.
- **Hindi A ch15–ch17** (t05, t05 and t04): the topic was "गद्यांश आधारित प्रश्न-अभ्यास / Passage-based practice" and is now "कृतिका प्रश्न-अभ्यास (प्रश्न 11: 50-60 शब्द, 4 अंक)". The outcome no longer mentions passage MCQs.

### 4. Hindi A chapter check
- **ch15–ch17 are the only कृतिका chapters.** They are माता का अँचल, साना-साना हाथ जोड़ि and मैं क्यों लिखता हूँ?. The other two कृतिका भाग 2 lessons are excluded for 2026-27 and are in `removed_topics`.
- **ch14 (संस्कृति) is correctly in क्षितिज भाग 2 (गद्य खंड).** It is the last prose lesson of Kshitij-2, so it keeps the generic blueprints. Its tests are unchanged.

### 5. Tests updated (per chapter)
All tests now follow their new blueprint item for item, short and long tests share no question, and `blueprint_id` is set. I updated each chapter's `src/build.mjs` test definitions and rebuilt, so rebuilding still leaves the tree clean. READMEs record the change.

| Chapter | Short | Long | Items changed? |
|---|---|---|---|
| English ch23 A Triumph of Surgery | 18/40, 8 items | 36/80, 16 items | none (re-selected from bank; `release.json` byte-identical) |
| English ch24 The Thief's Story | same | same | none |
| English ch25 The Midnight Visitor | same | same | none |
| English ch26 A Question of Trust | same | same | none |
| English ch27 Footprints without Feet | same | same | none |
| English ch28 The Making of a Scientist | same | same | none |
| English ch29 The Necklace | same | same | none |
| English ch30 Bholi | same | same | none |
| Hindi A ch15 माता का अँचल | 20/40, 13 items | 40/80, 26 items | +1 long (`l_friendship`, q_…_070) |
| Hindi A ch16 साना-साना हाथ जोड़ि | same | same | +1 long (`l_children`, q_…_071) |
| Hindi A ch17 मैं क्यों लिखता हूँ? | same | same | +1 long (`l_unease`, q_…_069) |
| English ch31 | wired only (catalog) | — | content not on main (english-h 7f32ba6, generic blueprints); re-selection ready in its handoff, apply after merge |

How items were selected:
- Each test keeps the items it already had of each kind, and the remaining slots come from unused bank items.
- Choice sets mix difficulty.
- Items that would cue each other were kept out of the same test where practical (for example the ch27 Jaffers short answer and the Jaffers report long answer).
- The commentary passages, and Hindi's case item, stay in the banks as practice.

**Items added (Hindi only).** Filling both कृतिका tests without sharing needs nine 4-mark answers, and the banks had eight, so one 4-mark long answer was appended to each chapter:
- **Ids:** each is appended at the end of `questions.mjs`, so existing ids are unchanged.
- **Content:**
  - ch15 `l_friendship`: the friend-like bond between Bholanath and Babuji, from two episodes (d3, analysis).
  - ch16 `l_children`: hill children's life compared with a city child's (d3, application).
  - ch17 `l_unease`: writing as a way to recognise inner unease and lighten it, applied to a student's diary (d3, application).
- **Standard:** the stems, models and 4-step schemes are in SOYL's own words (D-036) and quote nothing from the texts. They state only facts the bank already states. Models are 57, 59 and 58 words.
- **D-032:** worked content is in `model_answer_md` and `solution_md` is a method note.
- **Checks:** the build's `setForbidden` guard, leak check, lint and NO ERRORS all pass.
- **Provenance:** the items carry the shared library's fixed author string, "subject-producer". They were authored by curriculum-architect.

## How to verify
Run from `platform/`:
```
npm run content -- catalog
npm test -w @soyl/content-templates
npm run content -- lint --exemplars
npm run content -- verify --board cbse --class 10 --authored
npm run content -- originality --authored
npm run content -- assemble --board cbse --class 10 --subject <science|mathematics|social-science> --series --source files --strict
npm test -w @soyl/db
npx vitest run --root api test/content.test.ts
npx vitest run --root db test/db6-split.test.ts
npm test -w @soyl/content-pipeline
npm run typecheck
```
Output tails are in "Gate results" below. A scratch slot-for-slot checker read every catalog blueprint and compared each authored test's sections (type, marks, count, choice), totals, duration and override scope, and checked that no question is shared. It reports `ok` for all 22 updated tests. As controls it also reports `ok` for English ch04 and Hindi A ch11–ch14 on the generic blueprints.

## Gate results
All run from `platform/` on the final tree, after merging 3648363. Every command exited 0.
```
content catalog                      catalog valid: 0 error(s), 0 warning(s)   (767 subjects, 363 blueprints)
content-templates                    Test Files 1 passed (1)   Tests 680 passed (680)
lint --exemplars                     97 units ok; ch15-17 and ch23-30: 0 error(s), 0 warning(s) (other units show their existing warnings only)
verify --board cbse --class 10 --authored   97 unit(s), 7412 questions, 0 blocking flag(s); ch15-17 and ch23-30 all pass
originality --authored               97 unit(s), 0 error(s) (reference-overlap skipped: no owner texts, OA-16)
assemble --series --source files --strict   science 0 (11 frozen papers) · mathematics 0 (19) · social-science 0 (11)
@soyl/db                             Test Files 14 passed (14)   Tests 109 passed | 1 skipped (110)
api test/content.test.ts             Test Files 1 passed (1)   Tests 13 passed (13)
db test/db6-split.test.ts            Test Files 1 passed (1)   Tests 8 passed (8)
@soyl/content-pipeline               Test Files 8 passed (8)   Tests 280 passed (280)
npm run typecheck                    all workspaces clean
```
The frozen series files (`content/authored/series/*.json`, ADR-019) cover only Science, Maths and SST, are unchanged, and are reused as-is.

## Known gaps / follow-ups
- **English board/unit blueprints still let a Footprints commentary item fill an extract slot.** The Footprints chapters are board-assessed, so assembled mocks and unit tests could draw a Footprints commentary passage into the Q6/Q7 extract slots, and the same applies to कृतिका commentary in प्रश्न 7. The fix is item-level `chapters` scopes on `board.yaml` / `board-second-exam.yaml` / `unit-test.yaml`: Q6/Q7/Q8/Q10 → First Flight, Q9/Q11 → Footprints; Hindi A प्रश्न 7/8 → क्षितिज गद्य, 9/10 → काव्य, 11 → कृतिका. This was not in this brief, and English and Hindi have no frozen series yet. Recommended before those series are frozen.
- **ch31 tests:** english-h pushed ch31 (7f32ba6 on `platform/subject-producer/cbse-10-english-h`) on the generic blueprints, as its brief required. Its handoff (`2026-10-27-subject-producer-cbse10-english-h.md`, "Follow-up") lists a ready re-selection onto the supplementary blueprints. The ch31 bank (14 three-mark, 9 long, 6 two-mark) fills the supplementary shape with no shared questions. The handoff also says to drop the commentary row from vBoard and notes §8. **Apply it after both branches are on main**: until then ch31's `blueprint_id` names the generic blueprint while the catalog maps ch31 to the override. No gate checks that pairing, so nothing breaks in the meantime.
- **Some deck and notes text in the Footprints chapters is now inaccurate.** It still says SOYL tests use commentary items as comprehension checks (for example the ch23 title-slide table). The `checks.pattern` provenance string in the English builds says the same. I left these alone: the brief allowed item re-selection only, and `release.json` stays byte-identical. Producers can reword them at their next pass.
- **ch28 retag:** move the items on Ebright's qualities from t02 to the new t04.
- **Hindi B** संचयन chapters were not in scope. Their chapter tests already use 3-mark संचयन answers.

## Decisions made
- Chapter override = blueprint `scope` given as a list of chapter ids, resolved in content-pipeline (above). No ADR was written: it uses an existing schema field, and the only change is to the content-pipeline's blueprint resolution. Pipeline-engineer should review the `catalog.ts` / `series.ts` diff.
- The English supplementary tests use 18/36 marks, so they contain only the board's forms.

## Needs from owner
None.
