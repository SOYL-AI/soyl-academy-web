# subject-producer — CBSE 10 English Language and Literature ch09–ch12 (english-literature, D-025, D-026, D-032) — 2026-10-27

Status: **done** (all items `status: "draft"` pending review)

Branch: `platform/subject-producer/cbse-10-english-c` (worktree `C:/Users/Prabhu/soyl-wt/content-cbse10-english-c`), from `origin/platform/main` 0eb08cc; merged `origin/platform/main` once (c8b994a, after ch12) and re-ran every check afterwards. No sub-agents (D-024).

## What changed
| Path | What |
|---|---|
| `platform/content/authored/english-literature/cbse-10-english-language-and-literature-ch09/` | *Mijbil the Otter* (Gavin Maxwell): `release.json`, `tests.json`, `README.md`, `src/` |
| `…/cbse-10-english-language-and-literature-ch10/` | *Madam Rides the Bus* (Vallikkannan) |
| `…/cbse-10-english-language-and-literature-ch11/` | *The Sermon at Benares* (Betty Renshaw) |
| `…/cbse-10-english-language-and-literature-ch12/` | *The Proposal* (Anton Chekhov), a one-act play |
| `docs/platform/handoffs/2026-10-27-subject-producer-cbse10-english-c.md` | This note |

All four chapters use the shared builder `content/authored/english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs` unchanged (validation, lint, deterministic verify, answer-leak check). Rebuild any chapter from `platform/`: `npx tsx content/authored/english-literature/<chapter>/src/build.mjs` (deterministic; rebuilding after the merge left the tree clean).

Commits: 2354ed4 (ch09), 87c5e4b (ch10), b16738a (ch11), 2ba855b (ch12), c8b994a (merge), plus this handoff.

## Counts
| | ch09 Mijbil the Otter | ch10 Madam Rides the Bus | ch11 The Sermon at Benares | ch12 The Proposal |
|---|---|---|---|---|
| Syllabus topics | t01–t04 | t01–t04 | t01–t03 | t01–t05 |
| Deck (slides) | 23 | 23 | 23 | 23 |
| Slides with a visual | 9 | 10 | 10 | 11 |
| Checks / examples | 3 / 2 | 3 / 2 | 3 / 2 | 3 / 2 |
| Narration max / mean words | 66 / 57 | 69 / 57 | 66 / 55 | 66 / 55 |
| Notes sections | 8 | 7 | 7 | 7 |
| Flashcards | 30 | 30 | 30 | 30 |
| Questions (marks) | 63 (161) | 63 (161) | 63 (161) | 63 (161) |
| Passage children | 35 | 35 | 35 | 35 |
| Source-based (all `soyl-commentary`) | 7 | 7 | 7 | 7 (commentary on dialogue exchanges) |
| Difficulty d1/d2/d3/d4 | 6/24/26/7 | 6/22/26/9 | 8/21/22/12 | 7/18/29/9 |
| Application or higher | 51% | 54% | 51% | 56% |
| MCQ keys a/b/c/d | 3/4/3/4 | 3/4/3/4 | 3/4/3/4 | 3/4/3/4 |
| AR keys | a c b d | a c b d | a d b c | b a c d |
| Tests | short 20/40 (7 items), long 40/90 (17) | same | same | same |

Question types in every chapter: source-based 7 (5 × 1) · short 3-mark 12 (40–50 words) · short 2-mark 6 (30–40) · long 6-mark 7 (100–120: character sketch, theme, debate, diary, letter or account, technique, title/relevance) · mcq 14 · fill-blank 4 · assertion-reason 4 · true-false 4 · ordering 2 · match 3. Every model answer is inside its word limit (checked by script, not only by the builder's ±20% gate).

**Tests** follow the chapter-test blueprints item for item (short: A 1 extract; B 3 of 4 three-mark; C 1 of 2 long / long: A 2 extract pairs; B 3 of 4 two-mark; C 4 of 5 three-mark; D 2 long pairs), so `blueprint_id` is `cbse-10-english-language-and-literature-chapter-test-short` / `-long`. No question is shared between a chapter's two tests.

**Stems are chapter-specific** (each names Mij/Maxwell, Valli, Kisa Gotami/the Buddha, or the play/its characters), including the word-match items, so the bank-duplicate check that flagged ch05–07 cannot fire on these.

## How literature is handled (CONTEXT §8)
Same approach as english-a/english-b (summaries in SOYL's words; no sentence, frame, distinctive phrase, list-in-order or dialogue of the text; facts stated plainly; extract items are SOYL commentary with a *First Flight* pointer; devices illustrated with SOYL's own lines; single words for meanings; NCERT exercise questions reframed). Chapter-specific points:
- **ch09:** Maxwell's descriptive images (Mij's first-day manner, the bath, the paw-play, the scene after the box, his kind of otter's scientific status) are described in new words; unconfirmed details (who confided in the air hostess, crawling under seats) were removed rather than guessed.
- **ch10:** dialogue is reported, never quoted; the scenery is not listed in the story's order; the cow episode avoids the story's sentence frame; the closing conversation at home is not described (only that the trip stays her secret).
- **ch11:** the sermon is taught as five ideas in SOYL's words. Its two similes are **not named or paraphrased**; students are told to read them in the textbook. Kisa Gotami's reflection and the lights at nightfall are explained, not rebuilt.
- **ch12 (play):** the board's dialogue-extract format is met with SOYL commentary on seven specific exchanges, every speech reported and attributed by name; child items ask who-says-what, what-it-reveals and which-device questions without any line of the play. Stage directions are described by function; asides and stage directions are taught with a SOYL-written mini-scene.

## Validation (final tree, after the merge)
```
cd platform && npm install
npm test -w @soyl/content-templates
 Test Files  1 passed (1)
      Tests  491 passed (491)            (7 checks per chapter incl. ch09–ch12)

npm run content -- lint --exemplars
ok   cbse-10-english-language-and-literature-ch09: 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch10: 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch11: 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch12: 0 error(s), 0 warning(s)
   (70 units ok; no unit reports an error)

npm run content -- verify --board cbse --class 10 --authored
ok   cbse-10-english-language-and-literature-ch09 (authored): 63/63 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-english-language-and-literature-ch10 (authored): 63/63 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-english-language-and-literature-ch11 (authored): 63/63 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-english-language-and-literature-ch12 (authored): 63/63 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
verify --authored: 70 unit(s), 5592 questions, 0 blocking flag(s) (deterministic checks only; files unchanged)

npm run content -- originality --authored
ok   cbse-10-english-language-and-literature-ch09 (authored): 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch10 (authored): 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch11 (authored): 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch12 (authored): 0 error(s), 0 warning(s)
originality --authored: 70 unit(s), 30 error(s) (report only; files unchanged)
   (all 30 are pre-existing bank.duplicate flags in other subjects, not this branch:
    cbse-10-mathematics-ch01 6, -ch02 16, -ch10 2, -ch11 2; cbse-10-social-science-ch15 2, -ch18 1, -ch21 1.
    Scoped to English: --subject english-language-and-literature → 12 units, 0 errors.
    Reference-overlap check skipped: no reference texts.)

npx vitest run --root api test/content.test.ts      (DB-6: no answers in served content)
 Test Files  1 passed (1)   Tests  13 passed (13)

npx vitest run --root db test/db6-split.test.ts
 Test Files  1 passed (1)   Tests  8 passed (8)
```

## Verifier pass (done by the author; no sub-agents)
Every item re-answered blind; keys rebalanced honestly; every student-facing string scanned for echoes. Full lists are in each README's verifier record; highlights:
- **ch09:** removed the text's paired adjectives for Mij's first day, "wild with joy", the on-his-back juggling image, the box scene's silence/blood/shreds image, "previously unknown to science", "ringed by water", "often tamed by the Arabs", "collect and answer mail", "taken into his confidence", the crook-of-the-knees and morning-tea details; dropped unconfirmed claims (crawling under seats; whose mail came first).
- **ch10:** removed the playmates sentence, the scenery list in order, the "the more the horn … the faster" frame, "laughed until tears came" (a fill-blank was rebuilt on it, now replaced), "did not want to look out of the window"; dropped the unconfirmed closing conversation; MCQ keys rebalanced.
- **ch11:** removed the sermon's opening description of life, its young/old–wise/foolish pairing, the father/son sentence, the "terms of the world" sentence, its two closing sentences on peace, the household list in order, "weary and hopeless", the flickering lights, "fate of men", "lost her senses"; one answer leak (2-mark model = notes sentence) fixed; one recall MCQ replaced by an application item (49% → 51%); AR and MCQ keys rebalanced.
- **ch12:** removed Lomov's symptoms in the play's order, "quiet and regular life", the numb-leg detail, Chubukov's grown-up-daughter complaint, the adjectives Natalya uses for Guess, "dressed for a ball", "family bliss"; one assertion-reason item with an arguably explanatory reason replaced; one model trimmed to the limit; MCQ keys rebalanced.

## Facts a reviewer should double-check with the textbook
Each README has a full "Facts to confirm" list and a "left out" list. The ones most worth checking:
- **ch09:** Mij was delivered at Basra by two Arab men in a sack, sent by the friend; trust on the second night; he learnt to turn on the tap; ball and marbles; the airline rule and the Paris route; he hurt himself in the box; a woman took him for a rat; the air hostess let Maxwell keep Mij close; Maxwell's otter named after him. Left out: the year, the box size, times, the Londoners' list of guesses, the origin of the name Mijbil.
- **ch10:** Vallikkannan = R. S. Krishnaswamy; Valli is eight, full name Valliammai; she refused the conductor's help and his drink; she stayed on the bus and bought a return ticket; the same cow seen alive then dead; her mother never learnt of the trip. Left out: the fare, distance, ride time, clock times and the closing conversation.
- **ch11:** credited to Betty Renshaw; the four sights; the peepal/Bodhi tree; first sermon at Benares as the chapter says (tradition says Sarnath, not mentioned); Kisa's neighbours thought she had lost her senses; Sakyamuni; mustard seed from a house where no one had died. Left out: dates, ages, years of wandering, days of meditation.
- **ch12:** Chekhov 1860–1904; Chubukov's aside about a loan; Lomov's claim via a past grant of free use; Chubukov's threat to mow the Meadows; Natalya concedes the Meadows on Lomov's return; Squeezer called overshot; collapse, engagement, champagne. Left out: ages, dog prices, the Meadows' value, the specific family insults, the year.

## Not done / follow-ups
- No n-gram check against the actual texts: `catalog/sources/reference/` has no reference texts, so the reproduction review was manual. A reviewer with *First Flight* should run each README's checklist.
- ch11: the sermon's two similes are deliberately unnamed; if the editorial team accepts naming an image in two or three words, the teaching slide and notes section 4 are the places to add them.
- The 30 originality errors in Maths ch01/02/10/11 and SST ch15/18/21 belong to other producers' units (pre-existing on `origin/platform/main`).
- No `publish --authored` run (it needs the shared local Postgres).
- Remaining CBSE 10 English chapters (ch01 reading, ch14 onwards, *Footprints without Feet*) are untouched by this branch.

Needs from owner: none.
