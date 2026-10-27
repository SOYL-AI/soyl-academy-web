# subject-producer — CBSE 10 English Language and Literature ch18–ch22 (english-literature, D-025, D-026, D-032, D-036) — 2026-10-27

Status: **done** (all items `status: "draft"` pending review)

Branch: `platform/subject-producer/cbse-10-english-e` (worktree `C:/Users/Prabhu/soyl-wt/content-cbse10-english-e`), from `origin/platform/main`. `origin/platform/main` was merged in twice: before ch18 (fast-forward to the ch14–17 merge, f896793) and after ch19 (cc00dfb, which brought in 49e90ae, the API rate-limit fix). A fetch before the final gates found nothing new. No sub-agents (D-024).

## What changed
| Path | What |
|---|---|
| `platform/content/authored/english-literature/cbse-10-english-language-and-literature-ch18/` | *Amanda!* (Robin Klein), in copyright: `release.json`, `tests.json`, `README.md`, `src/`. Also adds `src/guard.mjs`, the forbidden-phrase guard shared by ch18–ch22. |
| `…/cbse-10-english-language-and-literature-ch19/` | *The Trees* (Adrienne Rich), in copyright |
| `…/cbse-10-english-language-and-literature-ch20/` | *Fog* (Carl Sandburg), six lines, treated as in copyright |
| `…/cbse-10-english-language-and-literature-ch21/` | *The Tale of Custard the Dragon* (Ogden Nash), in copyright |
| `…/cbse-10-english-language-and-literature-ch22/` | *For Anne Gregory* (W. B. Yeats), treated as in copyright |
| `docs/platform/handoffs/2026-10-27-subject-producer-cbse10-english-e.md` | This note |

All five chapters use the shared builder `content/authored/english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs` unchanged. They are modelled on the ch14–ch17 siblings and match them in scale.

To rebuild a chapter, run this from `platform/`: `npx tsx content/authored/english-literature/<chapter>/src/build.mjs`. Each build prints `NO ERRORS` and then `REPRODUCTION GUARD: 0 hits (N entries)`.

**Guard.** The shared lib has no forbidden-phrase list, and the brief asked that it stay unchanged. So `ch18/src/guard.mjs` adds one after `build()`:
- It scans every string of `release.json` and `tests.json` and every README line, ignoring case and punctuation, and matching whole words.
- It fails the build (exit code 1) on any hit, printing the entry number but not the phrase.
- It throws if any entry is longer than 4 words.

## Counts
| | ch18 Amanda! | ch19 The Trees | ch20 Fog | ch21 Custard the Dragon | ch22 For Anne Gregory |
|---|---|---|---|---|---|
| Syllabus topics | t01–t04 | t01–t04 | t01–t04 | t01–t04 | t01–t04 |
| Deck (slides) | 22 | 22 | 22 | 22 | 22 |
| Slides with a visual | 9 | 9 | 10 | 9 | 9 |
| Checks / examples | 4 / 2 | 4 / 2 | 4 / 2 | 4 / 2 | 4 / 2 |
| Narration max / mean words | 62 / 50 | 65 / 50 | 62 / 50 | 65 / 49 | 61 / 48 |
| Notes sections | 7 | 7 | 7 | 7 | 7 |
| Flashcards | 28 | 28 | 28 | 28 | 28 |
| Questions (marks) | 62 (155) | 62 (155) | 62 (155) | 62 (155) | 62 (155) |
| Passage children | 35 | 35 | 35 | 35 | 35 |
| Source-based (all `soyl-commentary`) | 7 | 7 | 7 | 7 | 7 |
| Difficulty d1/d2/d3/d4 | 7/20/29/6 | 7/23/25/7 | 9/23/24/6 | 9/22/24/7 | 6/25/25/6 |
| Application or higher | 58% | 53% | 53% | 53% | 52% |
| MCQ keys a/b/c/d | 3/4/3/4 | 3/4/3/4 | 3/4/3/4 | 3/4/3/4 | 3/4/3/4 |
| AR keys (in order) | a b d c | b d a c | a d b c | a d c b | c a d b |
| Model words: 3-mark / 2-mark / 6-mark | 44–47 / 31–35 / 108–120 | 43–49 / 32–34 / 109–116 | 42–49 / 30–37 / 112–116 | 43–50 / 33–39 / 111–117 | 44–50 / 31–34 / 113–118 |
| Guard entries (≤ 4 words) | 27 | 40 | 12 | 55 | 34 |
| Tests | short 20/40 (7 items), long 40/90 (17) | same | same | same | same |

**Question types.** Every chapter has the same mix:

| Type | Count |
|---|---|
| Source-based | 7 (5 × 1 mark) |
| Short, 3 marks | 12 (40–50 words) |
| Short, 2 marks | 6 (30–40 words) |
| Long, 6 marks | 6 (100–120 words) |
| MCQ | 14 |
| Fill-blank | 4 |
| Assertion-reason | 4 |
| True-false | 4 |
| Ordering | 2 |
| Match | 3 |

A script checked that every model answer is inside its exact word limit, not just inside the builder's ±20% gate. D-032 holds: written answers keep their worked content in `answer.model_answer_md`, and `solution_md` is a short method note. The builder's per-sentence answer-leak check (stricter than DB-6) passes. It caught two real overlaps (ch19 `sa_tone`, ch20 `sb_poet`), and both were reworded.

**Tests** follow the chapter-test blueprints item for item:
- Short test: A, 1 extract; B, 3 of 4 three-mark answers; C, 1 of 2 long answers.
- Long test: A, 2 extract pairs; B, 3 of 4 two-mark answers; C, 4 of 5 three-mark answers; D, 2 long pairs.

So `blueprint_id` is `cbse-10-english-language-and-literature-chapter-test-short` / `-long`. No question is shared between a chapter's two tests.

**Assertion-reason key orders differ between chapters.** Each chapter uses a, b, c and d once, in a different order from the others and from the ch14–17 order (b a c d).

**Stems are chapter-specific.** A script confirmed that every stem names the poem, the poet or a speaker or character. ch21 often says "Ogden Nash's ballad", so that the long title does not produce near-duplicate stems.

## How the poems are handled (CONTEXT §8–§9, D-036)
After the Lead's mid-task instruction (D-036), **no reconstructed poem text was written anywhere,** not even in scratch. The memory-based full-text overlap scan used for ch14–17 was not used. The `ref/` scratch folder had been created but was empty; it was deleted. Instead:

1. **Authoring in SOYL's own words:**
   - Stanzas are described by what happens and what they mean.
   - Commands (ch18) are named as topics.
   - Similes and metaphors are described, never quoted. Examples: Belinda's courage is "compared to a container packed with bears"; Anne's hair is "honey-coloured walls of a fortress".
   - Device examples are SOYL sentences.
   - Every extract item is SOYL commentary with a *First Flight* pointer.
2. **Key poem words are replaced consistently in two chapters.** In ch22 the admirers are "suitors" and the hair is "golden". In ch21 the pets are named by kind without the poem's adjectives.
3. **A per-chapter guard list** of short distinctive phrases (≤ 4 words, never a whole line) is enforced by the build. Each README lists every guard catch by position, without repeating the words.
4. **An author's re-read for three-word runs** that join a preposition and an article to a key noun was done after ch21. It found 1 run in ch18, 5 in ch19 and 1 pronoun + verb pair in ch20. All were reworded and added to the guards.
5. **The repo's `content lint --exemplars` and `content originality --authored` checks**, results below.

Each README says that the real-text n-gram check awaits owner-supplied references (OA-16).

**Guard catches in first drafts:**
- ch18: 1 imagery phrase.
- ch19: 2 phrases (25 places).
- ch20: 3 short pairs (14 places).
- ch21: 8 pairs and runs (about 40 places).
- ch22: 6 phrases (about 40 places), mostly the two-word phrase naming who alone loves unconditionally.

## Validation (final tree)
All six gates were run from `platform/` after the final rebuild of all five chapters.

```
cd platform
$ npm test -w @soyl/content-templates
 Test Files  1 passed (1)
      Tests  624 passed (624)
$ npm run content -- lint --exemplars
ok   cbse-10-english-language-and-literature-ch18: 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch19: 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch20: 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch21: 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch22: 0 error(s), 0 warning(s)
$ npm run content -- verify --authored
ok   cbse-10-english-language-and-literature-ch18 (authored): 62/62 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-english-language-and-literature-ch19 (authored): 62/62 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-english-language-and-literature-ch20 (authored): 62/62 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-english-language-and-literature-ch21 (authored): 62/62 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-english-language-and-literature-ch22 (authored): 62/62 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
verify --authored: 89 unit(s), 6897 questions, 0 blocking flag(s) (deterministic checks only; files unchanged)
$ npm run content -- originality --authored
ok   cbse-10-english-language-and-literature-ch18 (authored): 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch19 (authored): 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch20 (authored): 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch21 (authored): 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch22 (authored): 0 error(s), 0 warning(s)
originality --authored: 89 unit(s), 0 error(s) (report only; files unchanged)
$ npx vitest run --root api test/content.test.ts
 Test Files  1 passed (1)
      Tests  13 passed (13)
$ npx vitest run --root db test/db6-split.test.ts
 Test Files  1 passed (1)
      Tests  8 passed (8)
   (lint: 89 units ok, 0 errors; the only warnings are in other producers' units:
    literature.quote-review, passage.origin, balance.competency)
```

## Verifier pass (done by the author; no sub-agents)
- Every item was re-answered blind.
- Form facts, the speakers of each stanza and the order of events were checked against the author's understanding of each poem.
- MCQ keys were balanced by fixing the last MCQ of each chapter at c.
- **Competency re-tags** were made where the item really asks for analysis:
  - ch20: three items;
  - ch21: three items.

  Each README records which ones.
- **Word-limit corrections:**
  - ch19 `sb_letters` was extended after a guard rewording made it shorter;
  - ch21 `sb_poet` and `sb_pirate_fight` were extended from 27 to 33 words;
  - ch21 `sa_humour` was trimmed from 53 to 48.
- **Quotation marks were removed from answers:**
  - ch21's news-report model now uses reported speech;
  - ch22's dialogue example in the devices table was rewritten.

## Facts a reviewer should double-check with the textbook
Each README has a full "Facts to confirm" list and a "left out" list. These are the ones most worth checking:
- **ch18 *Amanda!*:**
  - Robin Klein, Australian, born 1936, *Hating Alison Ashley*.
  - **Seven stanzas, with the bracketed daydreams in stanzas 2, 4 and 6, each three lines on a single rhyme sound.**
  - The adult is "probably Amanda's mother", which is hedged.
- **ch19 *The Trees*:**
  - Adrienne Rich, 1929–2012; National Book Award 1974 for *Diving into the Wreck*.
  - Four stanzas; a full moon.
  - The speaker is presented as a woman.
- **ch20 *Fog*:**
  - Sandburg 1878–1967; grew up in Illinois, son of Swedish immigrants.
  - **Three Pulitzers** (two for poetry, one for the Lincoln biography).
  - ***Chicago Poems* (1916)**.
  - Six lines in two stanzas (2 + 4).
- **ch21 *Custard*:**
  - Nash 1902–1971.
  - Quatrains rhyming aabb.
  - **The content does not state a stanza count.**
  - Please confirm who uses the name "Percival" in the NCERT text. The content says the pets use it.
- **ch22 *For Anne Gregory*:**
  - Yeats 1865–1939, Nobel Prize 1923, Abbey Theatre.
  - Anne is Lady Gregory's granddaughter.
  - Yeats was "in his sixties" when he wrote it.
  - Rhyme on lines 2, 4 and 6.

## Not done / follow-ups
- **No real-text n-gram check (OA-16).** `catalog/sources/reference/` holds no reference texts. Under D-036 no memory-based copy was made, so reproduction safety rests on three things: SOYL-worded authoring, the guard lists and the repo checks. A reviewer with *First Flight* should run each README's checklist. If the editorial team wants zero shared pairs even for naming, the remaining article + noun pairs (*the forest*, *the pirate*, *the moon*, *a mermaid* …) are where to change.
- **The guard lists are short phrases recalled from memory.** If the NCERT printing differs, some entries may not match it exactly, which is harmless. A reviewer may also find phrases the lists miss; add them to `FORBID` and rebuild.
- **Extract pattern:** the CBSE 2026-27 poem extract may mix MCQs and short completions differently. Our commentary items use 3–4 MCQ/fill parts and 1 short part, as in ch13–ch17.
- No `publish --authored` run (it needs the shared local Postgres).
- Remaining CBSE 10 English chapters: ch23 onwards (*Footprints without Feet*) are untouched by this branch.

Needs from owner: OA-16 reference texts, if a real-text n-gram check is wanted. Otherwise none.
