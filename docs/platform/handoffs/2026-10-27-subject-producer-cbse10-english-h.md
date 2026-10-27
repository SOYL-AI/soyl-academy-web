# subject-producer — CBSE 10 English Language and Literature ch01 (Unseen Passages) and ch31 (*The Book That Saved the Earth*) — 2026-10-27

Status: **done, with one gate blocked by a test-fixture assumption (not a content fault).** All items are `status: "draft"` pending review.

Branch: `platform/subject-producer/cbse-10-english-h` (worktree `C:/Users/Prabhu/soyl-wt/content-cbse10-english-h`), from `origin/platform/main` 42549a2. I merged `origin/platform/main` 3648363 (English ch18–22 and ch27–30) between the two chapters, and every gate was re-run on the merged tree. No sub-agents. The private scratch folder (`%TEMP%/…/scratchpad/english-h`) holds helper scripts only: a word-limit, passage-length and key checker, and a string-replace helper. It contains **no source text**.

Commits: 4b1ee47 (ch01), be6586e (merge of platform/main), 7f32ba6 (ch31), then this handoff.

## What changed
| Path | What |
|---|---|
| `platform/content/authored/english-language/cbse-10-english-language-and-literature-ch01/` | *Reading Comprehension: Unseen Passages*: `release.json`, `tests.json`, `README.md`, `src/build.mjs`, `src/questions.mjs` |
| `platform/content/authored/english-literature/cbse-10-english-language-and-literature-ch31/` | *The Book That Saved the Earth* (Claire Boiko, play): same layout; it imports `ch27/src/guard.mjs` (`checkForbidden`) |
| `docs/platform/handoffs/2026-10-27-subject-producer-cbse10-english-h.md` | this note |

Both chapters use the shared `english-language/…ch02/src/lib.mjs` unchanged. Rebuild either chapter from `platform/` with `npx tsx content/authored/<family>/<chapter>/src/build.mjs`. The builds are deterministic.

## ch01: Reading Comprehension: Unseen Passages (english-language, next to ch02/ch03)
- **All 18 passages are SOYL originals** (`passage_origin: soyl-original`): Indian and global topics, every figure invented, every visual captioned *illustrative data*.
  - **6 discursive passages (Q1 pattern):** unstructured time, repair culture, multilingualism, learning from failure, city trees, libraries. 416–432 words each, measured by script.
  - **6 case-based factual passages with visual input (Q2 pattern):** students' sleep (bar chart), a bicycle scheme (table), household water (table), wetland birds (bar), rooftop solar (bar), a fictional online science fair (table). 207–224 words each.
  - Every full passage is 10 marks in 8 parts: six 1-mark parts (MCQ, complete the sentence, true/false, find the word) and two 2-mark answers of 30–40 words.
  - **6 short skill passages** (5 marks each) cover tone, inference, vocabulary in context, reference words and linkers, a small table, and fact versus opinion.
- **Decks:** two decks, 20 + 17 slides (discursive passage; factual passage with visual), each with 4 check slides. They teach skimming, scanning, argument shape, inference, tone, context clues, reading tables and charts, number language and data traps. The deck demo passages are not reused in the bank.
- **Counts:**
  - Notes: 8 sections. Flashcards: 30.
  - Questions: **62 (210 marks; 150 marks passage-based)**, with 120 passage children.
  - Types: case-based 18 · mcq 16 · short (2 marks) 10 · true-false 5 · fill-blank 4 · assertion-reason 4 · match 3 · ordering 2.
  - Difficulty: d1 9 / d2 23 / d3 28 / d4 2. **60% application or higher.**
  - Keys: MCQ 4/4/4/4; child MCQs 13/13/12/13; AR a, c, d, b.
- **Tests (`blueprint_id` null, as for ch02/ch03):**
  - Short, 20/40: one discursive + one factual passage, which mirrors board Section A.
  - Long, 40/90: one of two discursive passages · one of two factual passages · two skill passages · ten 1-mark items.
  - **The two tests share no passage and no question.** Ten passages are practice-only.

## ch31: *The Book That Saved the Earth* (english-literature)
- **Same supplementary-reader decision as english-f/-g:**
  - The blueprint slots are kept (`blueprint_id` set), and Section A is filled with 5 `soyl-commentary` comprehension checks.
  - The bank is weighted to the board's Q9/long-answer form: 14 three-mark, 9 six-mark and 6 two-mark answers. Objective items follow english-g: mcq 12, fill-blank 4, AR 4, true/false 4, ordering 2, match 3.
- **Counts:**
  - Deck: 24 slides (11 visuals, 3 checks, 2 examples). Notes: 8 sections. Flashcards: 30.
  - Questions: **63 (168 marks)**.
  - Difficulty: d1 9 / d2 21 / d3 25 / d4 8. 51% application or higher.
  - Keys: MCQ 3/3/3/3; AR a, d, c, b.
  - Model lengths: 3-mark 42–49 words, 2-mark 32–36, 6-mark 110–117. Every model is strictly inside its limit (script-checked).
- **Originality (D-036):**
  - No line of the play was written anywhere, including scratch. Speech is reported.
  - The **nursery rhymes the Martians read are described, never written out**, and students are told to do the same.
  - Guard list: 10 phrases of at most 4 words, including the rhymes' opening words. **0 found.**
- **Tests:** short 20/40 (7 items) and long 40/90 (17 items). The two tests share no question.

## Validation (final tree: ch01 + ch31 on platform/main 3648363)
```
npm test -w @soyl/content-templates
 Test Files  1 passed (1)      Tests  694 passed (694)

npm run content -- lint --exemplars
ok   cbse-10-english-language-and-literature-ch01: 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch31: 0 error(s), 0 warning(s)
   (no unit in the run reports an error)

npm run content -- verify --board cbse --class 10 --authored
ok   …-ch01 (authored): 62/62 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   …-ch31 (authored): 63/63 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
verify --authored: 99 unit(s), 7534 questions, 0 blocking flag(s)

npm run content -- originality --authored
ok   …-ch01 (authored): 0 error(s), 0 warning(s)
ok   …-ch31 (authored): 0 error(s), 0 warning(s)
originality --authored: 99 unit(s), 0 error(s)

npx vitest run --root db test/db6-split.test.ts
 Test Files  1 passed (1)      Tests  8 passed (8)

npx vitest run --root api test/content.test.ts
 Tests  1 failed | 12 passed (13)
   × chapter hub > a catalog chapter without content says so; unknown or malformed ids are 404/400
     AssertionError: expected 400 to be 200
```
With ch01 alone (before the merge), all six gates were green, including API 13/13.

### The one API failure: a fixture assumption, not an answer leak
- The test picks a seeded catalog chapter **with no content**: first from `cbse-10-science-*`, otherwise any. It then expects `GET /v1/chapters/<id>` to return 200 with empty assets.
- `seedRealContent` seeds only the subjects that have releases: English, Hindi A, Mathematics, Science and Social Science.
- **ch01 and ch31 were the last empty chapters in that set.** A script check over the five syllabi shows 31/31, 18/18, 14/14, 15/15 and 21/21 chapters with a release.
- So `emptyId` is now `undefined`, the request goes to `/v1/chapters/undefined`, and the route rejects it with 400.
- **Proof:** with ch31's `release.json` temporarily moved aside (and then restored), the same test file passes **13/13**.
- The DB-6 no-answers-in-served-content checks in that file all pass with both chapters present.
- **The test was not edited.** The fix belongs to the test owner. For example, when no empty catalog chapter exists, the test could seed one extra syllabus chapter, or include a subject with no releases in the reduced catalog.

## Facts a reviewer should double-check
- **ch01** (see README "Facts to confirm"):
  - The Section A sub-question split (six 1-mark + two 2-mark parts) is SOYL's model of the SQP. The board fixes only 10 marks per passage.
  - The advice that teenagers need 8–10 hours of sleep.
  - E-waste as a fast-growing waste stream that is mostly not formally recycled.
  - About 7,000 languages in the world.
  - Cooling by shade and transpiration; neem, jamun, banyan and arjun as native trees.
  - 135 litres per person per day as the urban benchmark.
  - Johads in Rajasthan.
  - The migratory routes to Indian wetlands.
  - Volunteer village libraries.
  - A rooftop-solar subsidy, stated generally.
- **ch31:**
  - Boiko as an American writer of plays for young people.
  - The historian from the distant future who frames the play.
  - Think-Tank stays on Mars, directs the crew through a screen and has an oversized head.
  - Noodle as his assistant; the crew of Omega, Iota and Oop landing beside a small-town library.
  - **The order of the misreadings: food, then listening devices; Noodle suggests looking at the marks.** This order is used in `ord_events`, `mt_misreadings` and `src_guesses`.
  - *Mother Goose*: the cow-and-moon rhyme read as proof of space travel; the egg-shaped figure resembling Think-Tank leads to the retreat.
  - Left out: the town's name, any years, Think-Tank's titles, who decodes the writing, where Think-Tank goes at the end, the number of scenes.

## Follow-up: the new supplementary-reader blueprints (curriculum-cbse10-readers)
During the task, curriculum-cbse10-readers announced `chapter-test-short-supplementary` (18 marks / 40 min) and `-long-supplementary` (36 / 80). They are on the **unmerged** branch `platform/curriculum/cbse10-reader-blueprints`, which already re-selects ch23–ch30. I kept ch31 on the blueprints that are on platform/main, as my brief specified, and did not merge that branch. The ch31 bank already fills the new shape with no shared questions. Once that branch lands, swap `T_SHORT` / `T_LONG` in `ch31/src/build.mjs` to:
- **Short (supplementary):**
  - A: two sets of three, answer two of each: `[sa_mission, sa_noodle_idea, sa_humpty]` and `[sa_title, sa_tt_traits, sa_historian]`.
  - B: one of `[la_tt_sketch, la_misunderstanding]`.
- **Long (supplementary):**
  - A: 3 of 4 from `[sb_tt_who, sb_landing, sb_mother_goose, sb_ending]`.
  - B: two sets, answer two of each: `[sa_food_listen, sa_cow, sa_pride]` and `[sa_noodle_traits, sa_humour, sa_saved]`.
  - C: one from each pair: `[la_contrast, la_title]`, `[la_noodle_diary, la_omega_report]`, `[la_humour, la_values]`.
- After the swap, remove the commentary-passage row from the title-slide table (`vBoard`), notes section 8 and the README's pattern section.
- The new t04 wording ("short-answer and long-answer responses") needs no content change; topic ids are unchanged.

## Not done
- No n-gram check against the play's real text: this awaits OA-16 reference texts (D-036).
- No `publish --authored` run, because it needs the shared local Postgres.
- ch01 uses tables and bar charts only, with no pie charts or infographics.

Needs from owner: none beyond OA-16.
