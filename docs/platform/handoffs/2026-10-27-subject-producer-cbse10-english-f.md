# subject-producer — CBSE 10 English Language and Literature ch23–ch26, *Footprints without Feet* (english-literature, D-025, D-026, D-032, D-036) — 2026-10-27

Status: **done** (all items `status: "draft"` pending review)

Branch: `platform/subject-producer/cbse-10-english-f` (worktree `C:/Users/Prabhu/soyl-wt/content-cbse10-english-f`), from `origin/platform/main`. Merged `platform/main` d74f4bf (English ch14–17 and Hindi ch14–17) before starting, then 5ea38ec (D-036) and 49e90ae (the DB-6 scan rate-limit fix). No sub-agents (D-024).

## What changed
| Path | What |
|---|---|
| `platform/content/authored/english-literature/cbse-10-english-language-and-literature-ch23/` | *A Triumph of Surgery* (James Herriot): `release.json`, `tests.json`, `README.md`, `src/` (incl. `guard.mjs`) |
| `…/cbse-10-english-language-and-literature-ch24/` | *The Thief's Story* (Ruskin Bond) |
| `…/cbse-10-english-language-and-literature-ch25/` | *The Midnight Visitor* (Robert Arthur) |
| `…/cbse-10-english-language-and-literature-ch26/` | *A Question of Trust* (Victor Canning) |
| `docs/platform/handoffs/2026-10-27-subject-producer-cbse10-english-f.md` | This note |

All four chapters use the shared builder `content/authored/english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs` unchanged. That builder has no `setForbidden`, so the D-036 guard is a small helper in `ch23/src/guard.mjs`, imported by all four builds and run after `build()`. Each build passes a list of short phrases (each at most 4 words; the helper rejects longer ones). A phrase found in `release.json`, `tests.json` or `README.md` fails the build. Rebuild any chapter from `platform/` with `npx tsx content/authored/english-literature/<chapter>/src/build.mjs`; the rebuild is deterministic.

Commits: f76d5c4 (ch23), ac73df2 (merge of the DB-6 fix 49e90ae), 2671369 (ch24), c2da086 (ch25), 3884ff7 (ch26), then this handoff.

## Pattern decision (supplementary reader)
- **Board:** `blueprints/board.yaml` (Section C) examines *Footprints without Feet* only through Q9 and one long answer, on character, theme and values. Q9 is 3-mark short answers (40–50 words, two of three); the long answer is 6 marks (100–120 words). The reference-to-context extracts (Q6/Q7) come from *First Flight* only.
- **Chapter tests:** the subject's `chapter-test-short` / `-long` blueprints are generic, with Section A extract slots. I kept them item for item, so `blueprint_id` is set. The Section A slots carry SOYL-commentary items, and every stem labels them as comprehension checks, noting that the board sets no extracts from this reader. Their parts test inference about character, theme and values.
- **Bank weighting:** compared with the *First Flight* prose chapters (ch09–ch12), source-based drops from 7 to **5** (the minimum that fills both tests without sharing). Short 3-mark rises from 12 to **14**, and long 6-mark from 7 to **9**. Short 2-mark stays at 6, and the objective items are unchanged.
- **Students are told** how the reader is actually examined on the title slide, in notes section 8, in the exam tips and on a flashcard.
- **Consistency:** this matches the decision english-g announced for ch27–ch30 (they keep 12 MCQs; I keep 14).

## Counts
| | ch23 A Triumph of Surgery | ch24 The Thief's Story | ch25 The Midnight Visitor | ch26 A Question of Trust |
|---|---|---|---|---|
| Syllabus topics | t01–t04 | t01–t04 | t01–t04 | t01–t04 |
| Deck (slides) | 23 | 23 | 23 | 23 |
| Slides with a visual / checks / examples | 9 / 3 / 2 | 9 / 3 / 2 | 9 / 3 / 2 | 9 / 3 / 2 |
| Narration max / mean words | 65 / 56 | 63 / 55 | 63 / 54 | 65 / 55 |
| Notes sections / flashcards | 8 / 30 | 8 / 30 | 8 / 30 | 8 / 30 |
| Questions (marks) | 65 (170) | 65 (170) | 65 (170) | 65 (170) |
| Passage children | 25 | 25 | 25 | 25 |
| Difficulty d1/d2/d3/d4 | 6/25/25/9 | 7/22/26/10 | 7/22/27/9 | 6/24/27/8 |
| Application or higher | 51% | 54% | 54% | 52% |
| MCQ keys a/b/c/d | 4/3/4/3 | 4/4/3/3 | 4/3/3/4 | 4/3/4/3 |
| AR keys | c d b a | a d b c | b a d c | a d c b |
| Model words: 3-mark / 2-mark / 6-mark | 43–48 / 32–37 / 111–115 | 44–48 / 32–38 / 107–117 | 44–48 / 31–38 / 109–113 | 43–49 / 30–38 / 108–117 |
| Guard phrases (none found) | 30 | 18 | 16 | 14 |
| Tests | short 20/40 (7 items), long 40/90 (17) | same | same | same |

Every chapter has the same question types: source-based 5 (5 × 1) · short 3-mark 14 · short 2-mark 6 · long 6-mark 9 · mcq 14 · fill-blank 4 · assertion-reason 4 · true-false 4 · ordering 2 · match 3.
- **Long answers** cover character sketches, comparisons, theme and value essays, debates, titles and extrapolation (diaries, letters, a report, an assembly speech).
- **Word limits:** a script checked that every model answer is inside its exact limit.
- **D-032:** written answers keep their worked content in `answer.model_answer_md`, and `solution_md` is a short method note.
- **Stems are chapter-specific:** each names the story, its author or its characters.
- **Tests:** no question is shared between a chapter's two tests.

## How the stories are handled (CONTEXT §8–§9, D-036)
All four stories are in copyright. **No part of any story was written out from memory, anywhere, including scratch folders.** D-036 arrived mid-task; by then only the scan script existed in my private scratch folder (`…/scratchpad/english-f/`), and no reference text had been written. I rewrote that script as a word-limit checker only.

Originality rests on four things:
- **Own-words authoring:** events as plain facts, all speech reported, no quotation of the stories.
- **Uncertain details left out:** numbers, minor names and places I could not confirm.
- **The per-chapter guard lists** (≤ 4-word phrases).
- **The repo's `originality` and lint checks.**

The guard lists forced wording changes:
- **ch24:** "full sentences", "educated person", "damp from the rain".
- **ch25:** "beautiful strangers"; the balcony is always "outside" the window.
- **ch26:** "a single safe each year".
- **READMEs:** the ch24 and ch26 READMEs first quoted guard phrases. Both now describe the changes without repeating the wording.

Chapter-specific handling:
- **ch23:** Mrs Pumphrey's final words appear only as the title phrase. The vets' enjoyment of the gifts is told without its timing.
- **ch24:** Hari's reflections at the station are taught as two ideas. The story's list of how different victims react to theft is not reproduced.
- **ch25:** the content never claims that Max died.
- **ch26:** the woman's exact excuse, her clothes, the dog and the value of the jewels are left out.

## Validation (final tree)
Run from `platform/` on the final tree (after merging 49e90ae), with all four chapters present:
```
npm test -w @soyl/content-templates
 Test Files  1 passed (1)
      Tests  617 passed (617)

npm run content -- lint --exemplars
ok   cbse-10-english-language-and-literature-ch23: 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch24: 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch25: 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch26: 0 error(s), 0 warning(s)

npm run content -- verify --board cbse --class 10 --authored
ok   cbse-10-english-language-and-literature-ch23 (authored): 65/65 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-english-language-and-literature-ch24 (authored): 65/65 pass, …
ok   cbse-10-english-language-and-literature-ch25 (authored): 65/65 pass, …
ok   cbse-10-english-language-and-literature-ch26 (authored): 65/65 pass, …
verify --authored: 88 unit(s), 6847 questions, 0 blocking flag(s)

npm run content -- originality --authored
notice: no reference texts in catalog\sources\reference … reference-overlap check skipped
ok   cbse-10-english-language-and-literature-ch23 … ch26 (authored): 0 error(s), 0 warning(s)
originality --authored: 88 unit(s), 0 error(s)

npx vitest run --root api test/content.test.ts      (DB-6: no answers in served content)
 Test Files  1 passed (1)   Tests  13 passed (13)

npx vitest run --root db test/db6-split.test.ts
 Test Files  1 passed (1)   Tests  8 passed (8)
```
Each chapter's own build also reports `NO ERRORS` and `GUARD: n phrase(s), none found`. Rebuilding the committed chapters leaves the tree clean.

**DB-6 rate limit (resolved).** With ch23 added (85 units), the API DB-6 scan first failed with HTTP 429. That was a request-capacity problem, not a leak: one member client and one IP scanned every unit inside a single `api.user` / `api.ip` window. I reported it to the Lead without editing the test. The Lead fixed it on `platform/main` in 49e90ae (the scan now advances the clock 61 s per chapter); I merged that fix, and every later run passed.

## Facts a reviewer should double-check with the textbook
Each README has a full "Facts to confirm" list and a "left out" list. These are the ones most worth checking:
- **ch23 (A Triumph of Surgery):**
  - Mrs Pumphrey's tonics were malt, cod-liver oil and Horlicks.
  - Tricki's bed, toys and coats went with him to the surgery.
  - At the surgery he got only water at first, and recovered among the other dogs with no medicine.
  - She sent eggs and wine, which the vets enjoyed.
  - She collected him by car and called the cure a triumph of surgery.
  - Left out: how long he stayed, the quantities of gifts, the colleagues' names, the source book.
- **ch24 (The Thief's Story):**
  - The name Hari Singh; the wrestling match.
  - Food instead of wages; the stray dog; lessons in writing his name, with sentences and sums promised.
  - Skimming the shopping money; Anil writes for magazines.
  - The book money under the mattress; the train to Lucknow, not boarded.
  - The fifty-rupee note, still damp; "writing sentences" as the next lesson.
  - Left out: the ages, the sums, the train's name.
- **ch25 (The Midnight Visitor):**
  - Arthur's dates and his *Three Investigators* series.
  - Max's pistol; the report about new missiles.
  - The invented balcony and the claim of complaints to the hotel; the false police claim.
  - Henry the waiter with drinks.
  - Left out: the floor, the city, Ausable's background, Max's fate.
- **ch26 (A Question of Trust):**
  - Canning's dates; Horace is an unmarried locksmith who loves rare books and robs one safe a year without violence.
  - Shotover Grange; the owners in London and the servants out; hay fever and flowers.
  - The woman's forgotten-combination claim and her no-police offer.
  - No gloves, fingerprints, prison; working among books (prison library).
  - Left out: the jewels' value, the dog, the woman's clothes, the sentence.

## Catalog issues (reported, not edited)
1. `syllabus.yaml` t04 for ch23–ch26 (and every *Footprints* chapter) has the learning outcome "Answer extract-based and short-answer questions with textual evidence". The board sets no extracts from *Footprints without Feet*, so this outcome should probably read "short-answer and long-answer questions on character, theme and values".
2. The chapter-test blueprints are generic, with Section A extract slots, and their notes say they are "built for the literature chapters (First Flight, Footprints without Feet)". A supplementary-reader override (no extract section; more Q9-style and long answers) would match the board better. Until then, producers fill Section A with commentary comprehension checks, as here.

## Not done / follow-ups
- **No n-gram check against the actual texts.** There are no reference texts yet (OA-16), and none were reconstructed (D-036). A reviewer with *Footprints without Feet* should run each README's checklist.
- **`guard.mjs` lives in ch23/src** because the English ch02 lib has no `setForbidden`. If the editorial team prefers, the English lib could adopt the Hindi lib's `setForbidden` (a shared-file change for its owner); the four builds would then pass their lists to it.
- **No `publish --authored` run** (it needs the shared local Postgres).

Needs from owner: none.
