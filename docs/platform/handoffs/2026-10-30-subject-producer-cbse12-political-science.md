# subject-producer — CBSE Class 12 Political Science, ch01–ch15 hand-authored — 2026-10-30

Status: done. All 15 chapters of the 2026-27 syllabus (`platform/catalog/cbse/12/political-science/syllabus.yaml`, two books) are hand-authored, pass every gate and are committed, one commit per chapter.

Branch: `platform/subject-producer/cbse-12-political-science`, based on `platform/main` b9c264f. Hand-authored under D-025/D-026; every item has `status: "draft"`; family folder `social-science`.

## What changed

Each chapter is a new folder, `platform/content/authored/social-science/cbse-12-political-science-chNN/` (NN = 01–15), holding `README.md`, `release.json`, `tests.json` and `src/` (`lib.mjs`, `questions.mjs`, `build.mjs`).

- **Shared library:** `lib.mjs` is the CBSE 12 authoring library already used for Economics and Business Studies, identical in all 15 chapters. It was committed first, with ch01.
- **Build:** run `npx tsx content/authored/social-science/cbse-12-political-science-chNN/src/build.mjs` from `platform/`. Edit `src/`, never the JSON.
- **What the build checks:** schema, pipeline lint, deterministic verify, word limits, narration rules, the answer-leak scan and the editorial counts. If a build has errors, its output is parked as `*.wip.json` and never committed.
- **Tests:** every chapter's tests use this subject's own blueprints, `cbse-12-political-science-chapter-test-short` and `-long`. Section D of each test is **source-based**.
- **Sources:** every source is an imagined document written by SOYL and labelled as such, with `passage_origin: soyl-original`. Examples are diaries, newspaper reports, letters, minutes and seminar notes. None quotes a real person or textbook text.
- **No map or cartoon items.** The `map` question type needs renderer outline maps, and no textbook cartoon may be reproduced (D-036). The chapters use theme-coloured SVG timelines and diagrams instead.

## Chapters

| Ch | Title | Commit | Decks (slides) | SVG on slides | Notes | Cards | Questions | App.+ | Source-based |
|---|---|---|---|---|---|---|---|---|---|
| 01 | The End of Bipolarity | 5e8d425 | 20 + 18 | 4 | 6 | 32 | 79 | 56% | 5 |
| 02 | Contemporary Centres of Power | 4707d48 | 21 + 19 | 5 | 6 | 31 | 84 | 51% | 5 |
| 03 | Contemporary South Asia | c3f39d5 | 19 + 17 | 2 | 7 | 30 | 78 | 53% | 5 |
| 04 | International Organisations | 70cfc56 | 18 + 18 | 2 | 6 | 30 | 74 | 53% | 5 |
| 05 | Security in the Contemporary World | 45fc2d1 | 19 + 18 | 5 | 6 | 30 | 73 | 58% | 5 |
| 06 | Environment and Natural Resources | f41a3e5 | 20 + 18 | 5 | 6 | 30 | 72 | 57% | 5 |
| 07 | Globalisation | b6a18ae | 19 + 20 | 3 | 6 | 31 | 71 | 58% | 5 |
| 08 | Challenges of Nation-Building | 188fafe | 16 + 19 | 3 | 6 | 30 | 76 | 51% | 5 |
| 09 | Era of One-Party Dominance | 0274464 | 18 + 16 | 3 | 6 | 30 | 73 | 51% | 5 |
| 10 | Politics of Planned Development | 77eb457 | 20 + 19 | 3 | 6 | 31 | 75 | 52% | 5 |
| 11 | India's External Relations | 1ece4d3 | 20 + 20 | 5 | 6 | 30 | 78 | 53% | 5 |
| 12 | Challenges to and Restoration of the Congress System | 155185f | 19 + 18 | 3 | 6 | 30 | 78 | 53% | 5 |
| 13 | The Crisis of Democratic Order | 56f2b73 | 18 + 21 | 3 | 6 | 32 | 72 | 51% | 5 |
| 14 | Regional Aspirations | e7148ed | 20 + 19 | 4 | 6 | 30 | 73 | 52% | 5 |
| 15 | Recent Developments in Indian Politics | 903996c | 18 + 18 | 3 | 6 | 30 | 79 | 51% | 5 |
| **Total** | | | **30 decks, 563 slides** | 53 | 91 | 457 | **1,135** | | 75 |

"App.+" is the share of items at application or above. Every chapter is inside the lint band of 45–65%.

Every chapter has the following:
- **Decks:** two, each with a title slide and goals, 2–3 worked examples (planning a 5-mark answer, reading a source, building a chronology and so on), 3–4 check slides pointing at objective items, a summary and exam tips. No more than 3 slides in a row lack a visual.
- **Questions:** all of mcq, assertion-reason, true-false, fill-blank, match, ordering (chronology), short (2 and 3 marks), long (5 marks) and source-based (5 per chapter, each with an internal choice in part (c)). Numericals appear only where the topic has numbers: Security Council voting, first-past-the-post with imagined votes, seats against the majority mark.
- **Tests:** two.
  - Short test: 20 marks in 40 minutes.
  - Long test: 40 marks in 90 minutes.
  - Both follow their blueprint item for item, including the internal-choice groups. The two tests share no questions and use no deck-check item.

## How to verify (from `platform/`, each under `_tools/heavy.sh`)

```
npm test -w @soyl/content-templates
npm run content -- lint --exemplars
npm run content -- verify --board cbse --class 12 --subject political-science --authored
npm run content -- originality --authored
npx vitest run --root db test/db6-split.test.ts
npx vitest run --root api test/content.test.ts
```

Each batch of chapters was committed only after a full gate run that started after its last file change.

| Run (IST) | Chapters | Content gate | Lint | Verify | Originality | DB-6 | API |
|---|---|---|---|---|---|---|---|
| 02:00–02:03 | ch01–ch05 | 1009/1009 | 0 errors, 0 warnings | 5 units, 388 questions, 0 blocking | 144 units, 0 errors | 8/8 | 13/13 |
| 02:13–02:16 | ch01–ch10 | 1044/1044 | 0 errors, 0 warnings | 10 units, 755 questions, 0 blocking | 149 units, 0 errors | 8/8 | 13/13 |
| 02:26–02:28 | ch01–ch15 | 1079/1079 | 0 errors, 0 warnings | 15 units, 1,135 questions, 0 blocking | 154 units, 0 errors | 8/8 | 13/13 |

A script check of all 54 SVG specs found no label outside its viewBox and no overlapping labels. Every chapter also passed an exact-stem duplicate scan against every other `release.json` in the repo.

## Scope decisions and the politics standard

- **Syllabus:** only the topics in the syllabus file are taught, and every topic id used exists in it. The file lists no deletions for this subject.
- **Neutral wording:**
  - Parties, leaders, conflicts and India's neighbours are described in neutral, factual wording, with no evaluative adjectives about individuals.
  - Contested episodes (Partition, the Emergency, Punjab 1984, Ayodhya 1992, Gujarat 2002, Kashmir) are stated factually and humanely, with no community blamed.
  - Debates such as the Emergency, coalition against single-party government, globalisation and humanitarian intervention set the stated case and the critics' case side by side.
  - No question asks a student to judge a current party, government or leader.
- **Dates:** only stable, verifiable dates are used, and nothing after 2024. The few post-2014 facts are each a single neutral dated line:
  - Brexit, 31 January 2020
  - the Galwan clash, June 2020
  - Article 370: August 2019, upheld by the Supreme Court in December 2023 (ch14, one item tests the fact only)
  - the Ayodhya verdict, November 2019
  - the 2014, 2019 and 2024 Lok Sabha outcomes (ch15)
- **Left out:** recent events in neighbouring countries (Sri Lanka 2022, Bangladesh 2024, India–Pakistan 2025), the Russia–Ukraine war, Timor-Leste's ASEAN accession and current office-holders.
- **Originality:** no NCERT text, cartoon or exercise and no board or sample-paper question is reused (D-036).

## Facts a reviewer should double-check (full lists in each chapter README)

- **ch15 seat counts:** the BJP's 282 (2014), 303 (2019) and 240 (2024) against a majority of 272 of 543 appear in several items. These are the commonly reported figures; confirm them or remove them.
- **ch15 other wording:**
  - The 2002 line reads "violence across Gujarat in which many people, mostly Muslims, died; the NHRC examined the state's response". Please confirm the wording.
  - The governments table says "Left support till 2008".
- **ch14:** the single dated 2019/2023 line; the 1987 Jammu and Kashmir election is worded as "followed by allegations that it was not fair"; `ar_punjab_1992` is keyed (b).
- **ch13:** the dates of the Allahabad verdict and the partial stay (12 and 24 June 1975), and the proclamation late on 25 June 1975. The 1977 results are given only as a broad pattern.
- **ch12:** the CPI is named as an ally of the Congress (R) in 1971; the Grand Alliance's parties are listed.
- **ch11:** the 1971 context reads "the USA and China leaned towards Pakistan"; the "Soviet tilt" is given only as a criticism.
- **ch09:** single marked ballot papers are dated "from 1962" (least certain); the Congress's 1952 share is given as "about three-quarters of seats with under half the votes".
- **ch08:** about 565 princely states; Manipur's merger in September 1949; `ar_gandhi` is keyed (b).
- **ch06:** India "signed and ratified" Kyoto in 2002, following the textbook wording; strictly, India acceded.
- **ch04:** India's elected Security Council terms, "most recently 2021–22" (notes only); objections to India's permanent-seat claim are attributed to "some states".
- **ch03:** SAARC "no summit since 2014 (as of 2024)"; Sri Jayawardenepura Kotte as the capital.
- **ch02:** the ASEAN membership years and the India–ASEAN goods agreement of 2009.
- **ch01:** nationalism in the republics is presented as the most immediate cause of the break-up, with any reasoned answer accepted.

## Known gaps / follow-ups

- **SVG labels have not been seen rendered.** They are positioned by computed coordinates and pass the overflow and overlap script, but should be checked at 360 px, in light and dark mode, on staging. The timelines are the densest.
- **No map or cartoon items.** These could be added once the renderer's outline maps are confirmed for world and South Asia maps.
- **Content:** items are `draft`. The content-verifier sample (≥ 5% per unit) has not been done. There is no frozen test series for this subject yet (an assessment-designer step).

Decisions made: none beyond this note (no ADR; no shared file touched).
Needs from owner: none (the ch15 seat counts are a reviewer check, not a blocker).

## Session note

- **02:26–02:28 IST:** ch11–ch15 passed the full gate run.
- **About 03:00 IST:** a session limit stopped work before ch11–ch15 were committed.
- **09:20 IST:** work resumed. No chapter file had changed since that gate run, so ch11–ch15 were committed exactly as gated.
- **After committing:** all 15 chapters were rebuilt from `src/`. Every build printed NO ERRORS and `git status` stayed clean. `lib.mjs` is identical in all 15 chapters (md5 `1722c5ac…`).
