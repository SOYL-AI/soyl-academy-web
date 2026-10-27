# subject-producer — CBSE 10 English Language and Literature ch27–ch30, *Footprints without Feet* (english-literature, D-025, D-026, D-032, D-036) — 2026-10-27

Status: **done** (all items `status: "draft"` pending review)

Branch: `platform/subject-producer/cbse-10-english-g` (worktree `C:/Users/Prabhu/soyl-wt/content-cbse10-english-g`), from `origin/platform/main` f896793. Merged `origin/platform/main` twice: 5ea38ec (D-036), then 49e90ae (the DB-6 scan fix). Every check was re-run after the merges. No sub-agents (D-024). Private scratch folder: `%TEMP%/english-g` (helper scripts only: a string-replace helper and a word-limit/key checker; **no source text, ever**; see D-036 below).

## What changed
| Path | What |
|---|---|
| `platform/content/authored/english-literature/cbse-10-english-language-and-literature-ch27/` | *Footprints without Feet* (H. G. Wells, NCERT adaptation): `release.json`, `tests.json`, `README.md`, `src/` (incl. `src/guard.mjs`) |
| `…/cbse-10-english-language-and-literature-ch28/` | *The Making of a Scientist* (Robert W. Peterson) |
| `…/cbse-10-english-language-and-literature-ch29/` | *The Necklace* (Guy de Maupassant, NCERT English version) |
| `…/cbse-10-english-language-and-literature-ch30/` | *Bholi* (K. A. Abbas) |
| `docs/platform/handoffs/2026-10-27-subject-producer-cbse10-english-g.md` | This note |

All four chapters use the shared builder `content/authored/english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs`, **unchanged**. That lib has no forbidden-phrase list, so `ch27/src/guard.mjs` adds `checkForbidden(dir, phrases)`, which ch27–ch30 call after `build()`. It accepts only phrases of four words or fewer, checks `release.json`, `tests.json` and `README.md` case-insensitively, prints only the phrase index on a hit (never the phrase), and fails the build. Rebuild any chapter from `platform/`: `npx tsx content/authored/english-literature/<chapter>/src/build.mjs`. Builds are deterministic; rebuilding after the merges left the tree clean.

Commits: 8ee5382 (ch27), dddd1ce (merge of 49e90ae), 6865a61 (ch28), 1caee2c (ch29), ebc8405 (ch30), plus this handoff.

## Pattern decision (supplementary reader)
- **What the board does:** `blueprints/board.yaml` Section C uses *Footprints without Feet* only in Q9 (3-mark short answers, 40–50 words, any 2 of 3) and the second long answer (6 marks, 100–120 words), on character, theme and values. The reference-to-context extracts (Q6/Q7) are from *First Flight*.
- **What the catalog gives chapter tests:** `chapter-test-short.yaml` and `chapter-test-long.yaml` are generic literature blueprints with extract slots (Section A), and there is no supplementary-reader or language-specific override.
- **Decision:** keep the blueprint slots item for item (`blueprint_id` set on both tests, as in ch04–ch17), but:
  - **Weight the bank to the board's form:** 14 three-mark short answers (12 in First Flight prose chapters), 9 long answers (7), 6 two-mark answers, and only **5** source-based items (7). Five is the minimum that fills both tests without sharing a question.
  - **Section A becomes "Commentary passage"** (SOYL commentary on character and theme). Its parts ask what an episode shows about a character, theme or value, not line-level reference to context.
  - **Tell students plainly:** the title-slide board table, notes section 8, exam tips and two flashcards say that no extracts are set from this book.
  - 15 of 20 marks in the short test and 30 of 40 in the long test are in the board's short/long-answer form.
- Each README explains this. I sent the decision to english-f (ch23–26) at the start for consistency. Its run stopped early (content filter), so ch23–26 may follow a different shape when redone.

## Counts
| | ch27 Footprints without Feet | ch28 The Making of a Scientist | ch29 The Necklace | ch30 Bholi |
|---|---|---|---|---|
| Syllabus topics | t01–t04 | t01–t03 (no character topic) | t01–t04 | t01–t04 |
| Deck (slides) | 23 | 22 | 22 | 22 |
| Slides with a visual | 9 | 9 | 9 | 9 |
| Checks / examples | 3 / 2 | 3 / 2 | 3 / 2 | 3 / 2 |
| Narration max / mean words | 68 / 56 | 67 / 54 | 66 / 56 | 65 / 55 |
| Notes sections | 8 | 8 | 8 | 8 |
| Flashcards | 30 | 30 | 30 | 30 |
| Questions (marks) | 63 (167) | 63 (167) | 63 (167) | 63 (167) |
| Source-based (all `soyl-commentary`) / children | 5 / 25 | 5 / 25 | 5 / 25 | 5 / 25 |
| 3-mark / 2-mark / 6-mark | 14 / 6 / 9 | 14 / 6 / 9 | 14 / 6 / 9 | 14 / 6 / 9 |
| Model lengths 3-mark / 2-mark / 6-mark | 44–49 / 30–34 / 108–118 | 42–49 / 30–34 / 108–115 | 45–49 / 30–34 / 106–117 | 42–50 / 30–36 / 111–117 |
| Difficulty d1/d2/d3/d4 | 5/25/24/9 | 5/20/29/9 | 5/24/26/8 | 5/22/27/9 |
| Application or higher | 51% | 52% | 52% | 56% |
| MCQ keys a/b/c/d (12) | 3/3/3/3 | 3/3/3/3 | 3/3/3/3 | 3/3/3/3 |
| AR keys | a c b d | a c b d | a c b d | a c b d |
| Guard phrases (found) | 10 (0) | 8 (0) | 9 (0) | 7 (0) |
| Tests | short 20/40 (7 items), long 40/90 (17) | same | same | same |

Objective items in every chapter: mcq 12, fill-blank 4, assertion-reason 4, true-false 4, ordering 2, match 3. Every model answer is **strictly** inside its word limit, checked by a script rather than the builder's ±20% gate. D-032: written items carry worked steps in `model_answer_md` with a short method note in `solution_md`, objective items carry full working, and no ≥ 60-character key sentence is repeated in served content (builder leak check plus the API DB-6 test). Stems name the chapter or its characters, so the bank-duplicate check cannot fire across ch23–30.

## Originality (CONTEXT §8–§9, D-036)
- **D-036 followed throughout.** No part of any of the four texts was written out from memory, anywhere, including scratch. The Lead's change of method arrived before any reference copy had been written: the empty `ref/` folder was deleted, along with a file of my own edit pairs. Everything was authored in SOYL's own words from the outset, at the level of events and ideas. Speech is reported, never quoted. Lists are not given in the text's order. Devices are illustrated with SOYL sentences. Passages are SOYL commentary.
- **Guard lists** (`setForbidden`-style, at most four words per phrase) in each `build.mjs`. Final result: 0 hits in all four chapters.
- **Repo checks:** `originality --authored` reports 0 errors across all units; `lint --exemplars` reports 0 errors and 0 warnings for ch27–30.
- **The real-text overlap check is still to run.** The n-gram check against the actual NCERT texts awaits owner-supplied reference texts (OA-16; `catalog/sources/reference/` is empty). Each README carries a reviewer checklist and says this.
- **Copyright status as treated:** Wells and Maupassant originals are public domain, but the NCERT adaptation/translation wording was treated as protected. Peterson's account and Abbas's *Bholi* are in copyright.

## Validation (final tree)
```
cd platform && npm install
npm test -w @soyl/content-templates
 Test Files  1 passed (1)
      Tests  617 passed (617)            (7 checks per chapter incl. ch27–ch30)

npm run content -- lint --exemplars
ok   cbse-10-english-language-and-literature-ch27: 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch28: 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch29: 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch30: 0 error(s), 0 warning(s)
   (no unit in the run reports an error)

npm run content -- verify --board cbse --class 10 --authored
ok   cbse-10-english-language-and-literature-ch27 (authored): 63/63 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-english-language-and-literature-ch28 (authored): 63/63 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-english-language-and-literature-ch29 (authored): 63/63 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-english-language-and-literature-ch30 (authored): 63/63 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
verify --authored: 88 unit(s), 6839 questions, 0 blocking flag(s) (deterministic checks only; files unchanged)

npm run content -- originality --authored
notice: no reference texts in catalog\sources\reference (owner-supplied, gitignored) — reference-overlap check skipped; bank duplicates and the literature rule still run
ok   cbse-10-english-language-and-literature-ch27 (authored): 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch28 (authored): 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch29 (authored): 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch30 (authored): 0 error(s), 0 warning(s)
originality --authored: 88 unit(s), 0 error(s) (report only; files unchanged)

npx vitest run --root api test/content.test.ts      (DB-6: no answers in served content; with 49e90ae)
 Test Files  1 passed (1)   Tests  13 passed (13)

npx vitest run --root db test/db6-split.test.ts
 Test Files  1 passed (1)   Tests  8 passed (8)

Per chapter: each build reports NO ERRORS (0 warnings) and GUARD 0 of N; a strict script confirms 0 word-limit violations.
Gate runs: after ch27 (all green except the API 429 harness issue, then fixed upstream), after ch28 (all six green), and a final run over ch27–ch30 (all six green, above).
```

## Verifier pass (done by the author; no sub-agents)
Every item was re-answered blind, every factual claim was checked against my knowledge of the texts, and every field was reviewed for wording that might echo a text. Full lists are in each README.
- **ch27:** the store's size-and-city description, the description of the attack on the shopkeeper, the disguise list in the text's order, the three-part "no … no … no" plight summary and the opening of the clergyman scene were all recast. A word-match item on a possibly textual adjective was replaced.
- **ch28:** two DNA phrasings and a phrase echoing the account's summing-up of a scientist's qualities were recast. Unconfirmed claims were removed: Urquhart suggesting questions, a teacher's encouragement, photography aiding research, and the mother's evenings. A diary no longer invents his mother's words.
- **ch29:** Madame Forestier's remark on the late return was reported very loosely, and the coats at the party and the men's introductions were recast. Loisel's search, previously listed in the text's order, was reordered. One physical detail was recast and a weak distractor replaced.
- **ch30:** "youngest daughter" was softened to "a daughter" (unconfirmed). Garland and exact-speech details were left out. Sensitivity was reviewed throughout.
- **All chapters:** MCQ keys were rebalanced to 3/3/3/3 by fixing two or three keys each, and five out-of-limit models were fixed.

## Facts a reviewer should double-check with the textbook
Each README has a full "Facts to confirm" list and a "left out" list. The most important:
- **ch27:** the rare drugs; the revenge fire; the department-store night and chase; the costume-shop robbery and its disguise; Mrs Hall at the Iping inn; the clergyman's money and the sneeze; the flying hat and chair (Mrs Hall blames spirits); the unmasking in anger; Jaffers knocked unconscious as the end of the adaptation. Left out: the month, the shop's street, the inn's name, the clergyman's name, and the excuse Griffin gave.
- **ch28:** father's death while Richard was young (early school years); *The Travels of Monarch X* and Dr Frederick Urquhart (University of Toronto); the seventh-grade county fair loss; **the order of the caterpillar-disease project and then the viceroy project (used in `ord_projects`)**; the classmate who helped build gold-spot equipment; the international fair and laboratory work; Harvard and the room-mate; debating, public speaking, canoeing, photography. Left out: home town, ages, number of species, teacher's and room-mate's names, the laboratory's name, journals and prize places.
- **ch29:** Loisel a minor government clerk; 400 francs saved for a gun; Loisel suggested borrowing; 36,000 francs with an inheritance and loans; Madame Forestier didn't open the case; servant dismissed and the move to an attic; ten years; the original worth about 500 francs. Left out: names of the minister and hosts, the office, the place of the final meeting, the jeweller's location, the inherited sum, the copying rates.
- **ch30:** Ramlal the numberdar; the fall in infancy and smallpox; the Tehsildar's urging; the mother's fear; the cow Lakshmi; the picture book and the teacher's promise; Bishamber (older, lame, grown-up children, no dowry at first, then 5,000 rupees); Ramlal humbling himself; Bholi's plans to care for her parents and teach. Left out: ages, sibling numbers, the year, Bishamber's age, the garland, exact speech.

## Catalog issues (reported, not edited)
1. **No supplementary-reader chapter-test blueprint.** `chapter-test-short/long.yaml` are generic literature blueprints with extract slots, but the board sets no extracts from *Footprints without Feet*. A `chapter-test-short-supplementary` / `-long-supplementary` variant (for example, A: 4 × 3-mark in place of the extract; B/C/D as now) would let these chapters follow the board exactly. That is curriculum-architect's call.
2. **Topic outcomes for ch23–ch31** (t04, or t03 in ch28) say "extract-based and short-answer questions", but the board pattern for this book is short and long answers only.
3. **ch28 has no character topic** (t01–t03), although board questions often ask about Ebright's qualities; I tagged them t02.

## Not done / follow-ups
- n-gram check against the actual texts: awaits OA-16 reference texts (D-036).
- No `publish --authored` run (it needs the shared local Postgres).
- ch23–ch26 belong to english-f, whose run stopped early. ch31 onwards (*The Book That Saved the Earth*) is untouched.
- Process note: the API DB-6 gate began returning 429 once a further chapter was added, because the scan shared one `api.ip` bucket across about 85 units on a fixed clock. Reported to the Lead and fixed on main in 49e90ae. All gates above ran after that fix.

Needs from owner: none beyond OA-16 (reference texts for the n-gram check).
