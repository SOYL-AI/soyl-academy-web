# subject-producer (CBSE 10 Social Science, batch B) — ch02, ch03, ch05, ch07 — 2026-10-27

Status: **done** — four hand-authored chapters following the batch A standard (ch01 History, ch06 Geography) and the `social-science` prompt templates. Every item is `status: "draft"` pending review.

Branch: `platform/subject-producer/cbse-10-sst-b` (worktree `C:/Users/Prabhu/soyl-wt/content-cbse10-sst-b`), based on `origin/platform/subject-producer/cbse-10-sst-a` merged with `origin/platform/main` (incl. the D-030 `vercel.json` and D-031). Commits: cb67e4f + 6e8c096 (ch02), b59d469 (ch03), 87c9d0c (ch05, also a ch03 README count fix), 5d24454 (ch07) and this handoff. No files outside the owned paths were changed.

## What changed

| Path | What |
|---|---|
| `platform/content/authored/social-science/cbse-10-social-science-ch02/` | Nationalism in India (History; carries the board's History map list) |
| `platform/content/authored/social-science/cbse-10-social-science-ch03/` | The Making of a Global World (History; board examines t01–t02 only, t03 project-only) |
| `platform/content/authored/social-science/cbse-10-social-science-ch05/` | Print Culture and the Modern World (History) |
| `platform/content/authored/social-science/cbse-10-social-science-ch07/` | Forest and Wildlife Resources (Geography) |
| `docs/platform/handoffs/2026-10-27-subject-producer-cbse10-sst-b.md` | This note |

Each folder has `release.json` (v1, 2026-27, provenance `{ origin: "human", author: "claude-opus-5-5 (subject-producer)", model: null }`, `build.checks` filled), `tests.json` (short + long, `blueprint_id` = `cbse-10-social-science-chapter-test-short|long`) and a `README.md` with scope, counts, sources, the verifier pass and gaps. ch04 (periodic assessment only) was skipped as instructed.

## Counts

| | ch02 Nationalism in India | ch03 Global World | ch05 Print Culture | ch07 Forests & Wildlife |
|---|---|---|---|---|
| Decks (slides) | 2 (24, 24) | 2 (22 board, 15 project) | 2 (19, 17) | 2 (18, 16) |
| Slides with a visual | 39 / 48 | 28 / 37 | 26 / 36 | 24 / 34 |
| Deck visuals by kind | table 24, flow 15 | table 18, flow 10 | table 17, flow 8, plot 1 | table 15, flow 7, plot 2 |
| Worked examples / checks | 6 / 7 | 5 / 7 | 4 / 8 | 5 / 8 |
| Narration words (min–max, mean) | 11–76, 61 | 10–73, 56 | 7–73, 54 | 8–69, 50 |
| Notes sections | 7 | 5 | 5 | 5 |
| Flashcards | 33 | 30 | 32 | 32 |
| Questions | 98 | 96 | 112 | 104 |
| mcq · A-R · T/F · fill · match · ordering | 31 · 8 · 4 · 3 · 2 · 3 | 33 · 8 · 5 · 3 · 2 · 3 | 43 · 10 · 5 · 3 · 2 · 3 | 41 · 9 · 5 · 3 · 2 · 2 |
| map | 9 (board list, 2 per test) | 2 (practice, world) | 2 (practice) | 3 (practice, tiger reserves) |
| short 2 / short 3 / long 5 | 13 / 12 / 6 | 15 / 12 / 7 | 16 / 14 / 8 | 14 / 12 / 7 |
| source-based / case-based (4 = 1+1+2) | 6 / 1 | 5 / 1 | 5 / 1 | 3 / 3 |
| Difficulty d1/d2/d3/d4/d5 | 13/43/33/8/1 | 10/38/33/14/1 | 7/51/42/11/1 | 8/50/34/11/1 |
| Application or higher (items / marks) | 48% / 57% | 46% / 55% | 46% / 54% | 46% / 53% |
| MCQ keys a/b/c/d | 8/8/7/8 | 8/8/9/8 | 11/11/10/11 | 10/10/11/10 |

Totals: **8 decks, 155 slides, 127 flashcards, 410 questions** (29 source/case items, each with an either/or part (c) via `alternatives`), **8 chapter tests**.

- **Map work.** ch02 covers the whole History board map list (Calcutta Sept 1920, Nagpur Dec 1920, Madras 1927; Champaran, Kheda, Ahmedabad; Jallianwala Bagh; Dandi) as 1-mark locate-and-label items; as in ch06, both ch02 tests replace one 2-mark short with two 1-mark map items. ch03/ch05/ch07 have no board map items, so their map items are labelled practice and kept out of tests (ch07: Corbett, Sariska, Sunderbans, Manas, Periyar, Bandhavgarh).
- **ch03 scope.** CBSE examines only subtopics 1–1.3. t03 (`board_assessed: false`) gets a separate 15-slide "project companion" deck and 7 items whose stems say *"Interdisciplinary project topic: practice only, not assessed in the board exam."*; they are the companion deck's checks and never appear in tests.
- **Sources** are SOYL-original imagined documents with `passage_origin: "soyl-original"` and an illustrative label in the stem: e.g. an Amritsar teacher's diary (1919), an Awadh tenant's letter (1920), a Salt March volunteer's notebook, a Nagpur letter after the Poona Pact (both views given), a caravan merchant's account (c. 800), an Irish schoolmistress (1847), a friar in New Spain (1521), a Calicut broker (1525), a Wittenberg student (1517), a Paris bookseller (1788), a Poona widow (1885), a Marathi editor warned under the 1878 Act, a Chipko recollection, a sacred-grove field notebook and a speech against mining. Data cases use imagined, labelled, internally consistent figures (all recomputed).
- **Tests** follow the SST chapter-test blueprints: short = A 3 MCQ + 1 A-R, B 2+2+3 (ch02: 2 + map + map + 3), C one of two 5-mark, D one source (20 marks, 40 min); long = A 8 MCQ + 2 A-R, B 2+2+(2|2)+3+(3|3) (ch02: 2 + map + map + (2|2) + 3 + (3|3)), C 5+(5|5), D two sources (40 marks, 90 min). Short and long tests are disjoint and never use deck-check questions.

## Validation (final run, all four chapters)

```
$ npm test -w @soyl/content-templates -- --reporter=verbose   (batch B lines; 3 more ✓ per chapter not shown)
 ✓ … social-science/cbse-10-social-science-ch02 > is a valid ChapterRelease
 ✓ … social-science/cbse-10-social-science-ch02 > decks meet the visual lesson rules
 ✓ … social-science/cbse-10-social-science-ch02 > has enough flashcards and practice questions
 ✓ … social-science/cbse-10-social-science-ch02 > has a short and a long chapter test drawn from its own questions
 (same for ch03, ch05, ch07; all 7 checks green per chapter)
 Test Files  1 passed (1)
      Tests  225 passed (225)

$ npm run content -- lint --exemplars          (social-science lines)
ok   cbse-10-social-science-ch01: 0 error(s), 0 warning(s)
ok   cbse-10-social-science-ch02: 0 error(s), 0 warning(s)
ok   cbse-10-social-science-ch03: 0 error(s), 0 warning(s)
ok   cbse-10-social-science-ch05: 0 error(s), 0 warning(s)
ok   cbse-10-social-science-ch06: 0 error(s), 0 warning(s)
ok   cbse-10-social-science-ch07: 0 error(s), 0 warning(s)
ok   cbse-10-social-science-ch13: 0 error(s), 0 warning(s)
ok   cbse-10-social-science-ch18: 0 error(s), 0 warning(s)

$ npm run content -- verify --board cbse --class 10 --authored   (social-science lines)
ok   cbse-10-social-science-ch02 (authored): 98/98 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-social-science-ch03 (authored): 96/96 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-social-science-ch05 (authored): 112/112 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-social-science-ch07 (authored): 104/104 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
verify --authored: 32 unit(s), 2553 questions, 0 blocking flag(s) (deterministic checks only; files unchanged)
```

```
$ (platform/api) npx vitest run test/content.test.ts   (real authored content incl. these four chapters; DB-6 / F-006 answer-leak contract)
 Test Files  1 passed (1)
      Tests  13 passed (13)
```

- **Scratch validator** (extended from batch A's, kept outside the repo): narration length and symbols, visual gap, table shape, flow edges, check slides → objective items, scheme sums (incl. children and alternatives), word counts vs `word_limit`, ordering shown shuffled, match not keyed in order, fill-blank counts, duplicate stems, key balance, test composition, plus two new checks: the **answer-leak contract** (no solution or model answer ≥ 60 characters may appear verbatim in decks, notes, flashcards or public question fields — mirrors `api/test/content.test.ts`) and the **lint traps** (`data:`/`tel:`/`mailto:`/`javascript:` word–colon pairs; `$` before a digit). Final: 0 errors, 0 warnings on all four.

## Verifier pass (summary; details in each README)
1. **Wrong or drifting keys caught:** a ch03 A-R draft with a self-contradicting solution (keyed d, argued c); a ch05 item drafted with the key on the wrong option. Key skew fixed in code (ch03 draft had 11/27 at b; ch05 had b16 a12 c7 d2) with a builder option `to:` that swaps the correct option and every letter reference in the solution together; a script then listed each key beside its option text and the letter its solution names.
2. **Facts fixed:** ch05 Gangadhar Bhattacharya's weekly dated 1816 (draft said "soon after" 1780); ch03 lentils' origin (West Asia); ch02 Kheda given as 1917–18; Jallianwala casualties as "hundreds" (no disputed number); ch03 China's turn from overseas contact hedged; ch07 cheetah history (declared extinct 1952; the 2022 Kuno project noted once to avoid confusion); no volatile statistic (current tiger counts, etc.) stated as current fact.
3. **Originality:** textbook-echo scans rewrote about 15 (ch02), 29 (ch03), 50 (ch05) and 50 (ch07) phrases — e.g. Dyer's "moral effect", "not only to refuse cooperation … but also to break colonial laws", "is said to have restricted overseas contacts", "a new culture of dialogue and debate", "open to all, but influenced by none", "thousands upon thousands of fatwas", all six IUCN definitions, the JFM and Chipko formulations, "an integral part of the community". Real quotations were paraphrased (Luther, Hickey's motto).
4. **Competency honesty:** first drafts were 35% (ch03), 30% (ch05) and 36% (ch07) application or above. Labels were not inflated; instead 17 (ch03), 25 (ch05) and 16 (ch07) higher-order items were added, five duplicate recall MCQs were dropped from ch05, and ch02 gained six t04 items. All four now sit at 46–48% of items and 53–57% of marks, inside the lint band (45–65%), with 9–15 items at d4–5 per chapter.
5. **Lint traps hit while authoring:** "Case-based data:" in a ch07 exam-tip bullet tripped `banned.url` (reworded; now caught by the scratch validator); a table caption passed as an object failed the schema gate (ch02); two ch07 5-mark model answers were under the lint band and were extended.

## Contract and pipeline notes (for the Lead)
1. Batch A's recommendations still stand (map geometry for "identify A" items and answer display; bar-plot `categories`; narrower `data:` filter; image assets for cartoon/painting items).
2. **Answer-leak contract vs authoring:** the API test compares whole key strings against public bodies. Single-line solutions are the risk (multi-line ones are JSON-escaped and rarely match). A lint rule mirroring it (solution/model answer ≥ 60 chars appearing in decks, notes, flashcards, stems, passages or options) would catch this before the API suite.
3. **`board_assessed: false` topics** (ch03 t03): the gate and lint do not check that such topics stay out of tests. A lint rule would make the convention enforceable.
4. **Map items in non-map chapters** are labelled practice in the stem; a `practice_only` flag (or a test-assembler rule using the syllabus map list) would let the custom test builder skip them.

## Needs from Lead
- Merge `platform/subject-producer/cbse-10-sst-b` into `platform/main` (after `platform/subject-producer/cbse-10-sst-a`, already merged).

## Needs from owner
None.
