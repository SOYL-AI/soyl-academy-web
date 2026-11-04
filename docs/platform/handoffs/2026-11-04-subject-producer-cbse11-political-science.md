# subject-producer — CBSE Class 11 Political Science, hand-authored chapters — 2026-11-04

**Status:** done. All 18 syllabus chapters (ch01–ch18) are committed; each was committed after a fully green gate run.

- **Branch:** `platform/subject-producer/cbse-11-political-science`, worktree `C:/Users/Prabhu/soyl-wt/content-cbse11-political-science`, from `platform/main` at 44dbe07.
- **Merges:** `platform/main` was merged in at 852ea29, which gives the api leak-scan test a 900 s budget. Not pushed by me.
- **Integration:** the Lead integrated ch01–ch14 in content waves; ch15–ch18 (7317ac2…418c740) are the commits still to merge.

**Writers (D-050):** every chapter was written by a **Sonnet 5.5** sub-agent (Agent tool, `model: "sonnet"`), at most two at a time. Opus (this agent) reviewed, fixed small problems, gated and committed. The Opus quality fallback was **not needed**.
- ch05 and ch06 each had two Sonnet writers. The first writer of each was stopped by a session limit after writing `src/`. A second Sonnet writer checked that work against the facts, fixed the competency balance and the missing README, and finished the chapter.

## What changed

- **Location:** each chapter is in `platform/content/authored/social-science/cbse-11-political-science-chNN/`, with `release.json`, `tests.json`, `README.md` and `src/{questions.mjs, build.mjs}`.
- **Shared lib:** `cbse-11-political-science-ch01/src/lib.mjs`, committed with ch01 (2a97ce1). It is the CBSE 12 Political Science lib plus two additions:
  - **Exact-stem originality pre-check:** a build-time check, copied from the ICSE 9 History & Civics lib. It compares every stem, with maths and code stripped, against all authored `release.json` and `release.wip.json` files.
  - **Semantic `verdict` for assertion-reason:** CBSE order is (a) both true and R explains A, (b) both true and R does not explain A, (c) A true and R false, (d) A false and R true. `ar()` rejects a letter `key`, so a key can never be mis-lettered.
- **Blueprints:** the subject's own blueprints are annual and half-yearly only, so the chapter tests use the class defaults `cbse-11-default-chapter-test-short` (20 marks, 40 min) and `-long` (40 marks, 90 min).
  - Short test: A is 3 mcq + 1 AR; B is 2 × 2-mark + 1 × 3-mark; C is 1 of 2 five-mark; D is one 4-mark case-based item.
  - Long test: A is 8 mcq + 2 AR; B is 2 × 2-mark, 1 of 2 two-mark, 1 × 3-mark, 1 of 2 three-mark; C is 1 five-mark + 1 of 2; D is two case-based items.
  - The two tests share no item and use no deck-check item.
  - Case-based items are 1 + 1 + 2 marks, with an either/or in part (c), built on imagined passages.
- **Status:** all items are `status: "draft"`, provenance `human` (D-025/D-026).

| Chapter | Commit | Writer | Slides | Notes sections | Flashcards | Questions | App+ |
|---|---|---|---|---|---|---|---|
| ch01 Constitution: Why and How? (+ shared lib) | 2a97ce1 | Sonnet 5.5 | 19 + 19 | 6 | 31 | 73 | 52% |
| ch02 Rights in the Indian Constitution | bb58998 | Sonnet 5.5 | 20 + 17 | 6 | 33 | 80 | 49% |
| ch03 Election and Representation | 7501b30 | Sonnet 5.5 | 21 + 19 | 7 | 33 | 78 | 50% |
| ch04 Executive | d120f29 | Sonnet 5.5 | 19 + 21 | 6 | 32 | 76 | 47% |
| ch05 Legislature | bdb47ff | Sonnet 5.5 (two writers, see above) | 19 + 22 | 6 | 34 | 79 | 46% |
| ch06 Judiciary | 387f261 | Sonnet 5.5 (two writers, see above) | 20 + 21 | 7 | 31 | 73 | 47% |
| ch07 Federalism | e3e3e07 | Sonnet 5.5 | 22 + 21 | 7 | 32 | 77 | 52% |
| ch08 Local Governments | cba2bb8 | Sonnet 5.5 | 20 + 20 | 7 | 32 | 76 | 50% |
| ch09 Constitution as a Living Document | 1687130 | Sonnet 5.5 | 21 + 22 | 7 | 31 | 75 | 48% |
| ch10 The Philosophy of the Constitution | 2d26b3f | Sonnet 5.5 | 21 + 22 | 7 | 31 | 79 | 53% |
| ch11 Political Theory: An Introduction | 9de8919 | Sonnet 5.5 | 18 + 21 | 6 | 30 | 79 | 53% |
| ch12 Freedom | 1d359f5 | Sonnet 5.5 | 18 + 20 | 6 | 31 | 78 | 49% |
| ch13 Equality | 93462ec | Sonnet 5.5 | 20 + 18 | 6 | 33 | 72 | 47% |
| ch14 Social Justice | 3977dc5 | Sonnet 5.5 | 19 + 20 | 6 | 32 | 75 | 52% |
| ch15 Rights | 7317ac2 | Sonnet 5.5 | 21 + 19 | 6 | 31 | 73 | 49% |
| ch16 Citizenship | 477737a | Sonnet 5.5 | 20 + 19 | 7 | 34 | 75 | 51% |
| ch17 Nationalism | ac14e5a | Sonnet 5.5 | 20 + 20 | 6 | 32 | 79 | 46% |
| ch18 Secularism | 418c740 | Sonnet 5.5 | 20 + 19 | 7 | 32 | 78 | 50% |

**Totals:** 18 chapters, 718 slides, 575 flashcards and 1,375 questions. Application-or-above runs from 46% to 53%, inside the lint band of 45–65%.

**Every chapter has:**
- 2 decks, each with 3–5 check slides, 2 or more worked examples, a summary slide, an exam-tips slide, and no run of more than 3 slides without a visual.
- At least 26 mcq, at least 5 AR, at least 9 two-mark shorts (30–50 words), at least 6 three-mark shorts (50–80 words), at least 6 five-mark longs (80–120 words), and 4–5 case-based items.
- 4 original SVGs. Every chapter was scanned for map-like shapes, and none was found: no figure shows an India outline, coastline or borders (OA-23).

## How to verify
From `platform/` in the worktree, run one at a time, with heavy gates via `_tools/heavy.sh`:
```
npm test -w @soyl/content-templates                # 3487/3487 at g5
npm run content -- catalog                         # catalog valid: 0 error(s), 0 warning(s)
npm run content -- lint --exemplars                # ok for all 18 cbse-11-political-science chapters, 0/0
npm run content -- verify --board cbse --class 11 --subject political-science --authored   # 18 unit(s), 1375 questions, 0 blocking
npm run content -- originality --authored          # 498 unit(s), 0 error(s)
npx vitest run --root db test/db6-split.test.ts    # 8/8
npx vitest run --root api test/content.test.ts     # 13/13
```
Rebuild any chapter with `npx tsx content/authored/social-science/cbse-11-political-science-chNN/src/build.mjs`, which should print `NO ERRORS`. The output is deterministic: writers confirmed byte-identical md5s across 3 builds.

### Gate runs (each fully green, exit 0)
| Run | Started (IST) | Covered | Result → committed |
|---|---|---|---|
| g1 | 2026-11-04 00:59 | ch01–02 | templates 3312, verify 2 units 153 q, originality 473 units 0 errors, db6 8/8, api 13/13 → ch01, ch02 |
| g2 | 01:14 | ch01–04 | green (not used for commits: platform/main was merged afterwards) |
| g3 | 09:27 (after merging platform/main) | ch01–08 | templates 3410, verify 8 units 612 q, originality 488 units, db6 8/8, api 13/13 → ch03–ch06 |
| g4 | 10:20 | ch01–14 | templates 3459, verify 14 units 1070 q, originality 494 units, db6 8/8, api 13/13 → ch07–ch14 |
| g5 | 10:53 | ch01–18 | templates 3487, verify 18 units 1375 q 0 blocking, originality 498 units 0 errors, db6 8/8, api 13/13 → ch15–ch18 |

A chapter was committed only if none of its files changed after its green run started. ch07/ch08 (built during g3) and ch15/ch16 (edited after g4 started) were therefore committed only after a later green run.

## Review (Opus): fixes made
- **AR verdicts:** checked every one against its A and R statements; all were correct.
- **Facts:** checked every reviewer-flagged fact and found them right. These include:
  - Article numbers in ch02, ch04, ch05, ch06, ch07, ch10, ch12, ch13 and ch17.
  - The Tenth Schedule's fifteen-day condonation.
  - The Article 108 six-month trigger.
  - Nominated members voting for the Vice-President but not the President.
  - Delhi and Puducherry in the presidential electoral college (70th Amendment).
  - Reservation in Union recruitment at 15 / 7.5 / 27%, as of 2024.
  - The 13-judge Kesavananda Bharati bench.
  - Article 19(2) grounds, including friendly relations with foreign states.
  - Article 15(2)/(3).
  - Lohia's five inequalities.
- **Writing-process lines:** removed all lines about how the content was written ("(paraphrased)" in table headers and flashcards, "stated neutrally" in solutions, schemes and deck goals) from ch02, ch06, ch09, ch12, ch13, ch14, ch15, ch16 and ch17. Kept exam-tip advice to students, and the build metadata `checks` block.
- **ch16 topic tags:** my brief had put "citizen and nation" under t01, but the syllabus puts it in t02. I retagged the 8 relevant items (including a case item and its parts) to t02, giving t01 41 and t02 34.
- **Sensitive chapters:** ch07, ch16, ch17 and ch18 were scanned for real movements, communities, riots, parties and current disputes, and none were found. All scenarios use imagined countries, towns and communities.
  - Article 370 appears in ch07 as one dated factual line only (changed 2019, upheld by the Supreme Court in December 2023, as of 2024).
  - The Citizenship (Amendment) Act, NRC, electoral bonds and the uniform civil code debate are left out.

## Facts for a reviewer (dated or likely to change; each chapter README has the full numbered list)
- **ch03:**
  - 84 SC and 47 ST Lok Sabha seats (as of 2024).
  - 106th Amendment Act 2023: women's reservation takes effect after the post-census delimitation (as of 2024).
  - Election Commission appointment law of 2023 (as of 2024).
  - Candidate affidavits dated 2003.
  - EVMs in all constituencies from 2004.
  - NOTA from 2013.
- **ch04:** Union recruitment reservation of 15 / 7.5 / 27% (as of 2024).
- **ch05:**
  - Rajya Sabha strength 245, of whom 233 are elected (as of 2024).
  - Lok Sabha: up to 550 elected seats, 543 constituencies.
  - Six States with Legislative Councils (as of 2024).
  - 104th Amendment ended the Anglo-Indian nomination.
- **ch06:**
  - Supreme Court strength 34 (as of 2024).
  - NJAC Act 2014, struck down 2015.
  - The collegium since 1993.
- **ch07:** Article 370 line as above; GST 2016/2017; NITI Aayog 2015.
- **ch08:**
  - Census 2011 urban definition.
  - "Many states" give women 50% of seats; no count is stated.
- **ch09:** 106th Amendment as the latest, as of 2024.
- **ch13:** 103rd Amendment (2019), upheld in 2022, as of 2024, stated with no evaluation.

## Tests added
- No code tests were added; the content gates above cover the chapters.
- Each build runs:
  - schema validation
  - pipeline lint
  - deterministic verify
  - the answer-leak scan
  - word-limit and narration rules
  - the exact-stem originality pre-check
- The writers also ran `checks.mjs`, a private scratchpad script for 5-gram near-duplicate and SVG label overflow checks. It reported 0 flags and 0 issues for every chapter.

## Known gaps / follow-ups
- The class-default blueprints are `source_status: unverified` (lead-default). Class 11 has no board exam.
- No unit-test, half-yearly or annual papers were assembled; only the chapter tests were.
- The SVGs were checked by the overflow estimate only, so a visual pass at 360 px on staging is worthwhile.
- The dated facts above need an annual check.

## Decisions made
- D-050 was followed.
- No new ADR. The lib additions are local to the subject folder.

## Needs from owner
None.
