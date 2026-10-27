# subject-producer — CBSE 10 English Language and Literature ch14–ch17 (english-literature, D-025, D-026, D-032) — 2026-10-27

Status: **done** (all items `status: "draft"` pending review)

Branch: `platform/subject-producer/cbse-10-english-d` (worktree `C:/Users/Prabhu/soyl-wt/content-cbse10-english-d`), from `origin/platform/main` ed76375. `origin/platform/main` was merged in twice (fast-forward to 9c033fd before ch14 was committed; 53c5e39 after ch17), and every check was re-run after the second merge. No sub-agents (D-024).

## What changed
| Path | What |
|---|---|
| `platform/content/authored/english-literature/cbse-10-english-language-and-literature-ch14/` | *Fire and Ice* (Robert Frost): `release.json`, `tests.json`, `README.md`, `src/` |
| `…/cbse-10-english-language-and-literature-ch15/` | *A Tiger in the Zoo* (Leslie Norris), in copyright |
| `…/cbse-10-english-language-and-literature-ch16/` | *How to Tell Wild Animals* (Carolyn Wells) |
| `…/cbse-10-english-language-and-literature-ch17/` | *The Ball Poem* (John Berryman), in copyright |
| `docs/platform/handoffs/2026-10-27-subject-producer-cbse10-english-d.md` | This note |

All four chapters use the shared builder `content/authored/english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs` unchanged (validation, lint, deterministic verify, answer-leak check). Each one is modelled on the ch13 (*Dust of Snow*) sibling and scaled to it, not to the prose chapters. To rebuild any chapter, run this from `platform/`: `npx tsx content/authored/english-literature/<chapter>/src/build.mjs`. The rebuild is deterministic: rebuilding all four after the final commit left the tree clean.

Commits: 52dff2e (ch14), 9d4feab (ch15), ace8367 (ch16), 7a86e89 (ch17), 53c5e39 (merge), then this handoff.

## Counts
| | ch14 Fire and Ice | ch15 A Tiger in the Zoo | ch16 How to Tell Wild Animals | ch17 The Ball Poem |
|---|---|---|---|---|
| Syllabus topics | t01–t04 | t01–t04 | t01–t04 | t01–t04 |
| Deck (slides) | 22 | 23 | 22 | 22 |
| Slides with a visual | 9 | 9 | 9 | 9 |
| Checks / examples | 4 / 2 | 4 / 2 | 4 / 2 | 4 / 2 |
| Narration max / mean words | 69 / 54 | 64 / 53 | 67 / 53 | 64 / 51 |
| Notes sections | 7 | 7 | 7 | 7 |
| Flashcards | 28 | 28 | 28 | 28 |
| Questions (marks) | 62 (155) | 62 (155) | 62 (155) | 62 (155) |
| Passage children | 35 | 35 | 35 | 35 |
| Source-based (all `soyl-commentary`) | 7 | 7 | 7 | 7 |
| Difficulty d1/d2/d3/d4 | 8/23/25/6 | 9/20/27/6 | 7/24/25/6 | 9/20/26/7 |
| Application or higher | 53% | 53% | 52% | 53% |
| MCQ keys a/b/c/d | 3/4/3/4 | 3/4/3/4 | 3/4/3/4 | 3/4/3/4 |
| AR keys | b a c d | b a c d | b a c d | b a c d |
| Model words: 3-mark / 2-mark / 6-mark | 44–48 / 33–39 / 109–112 | 44–50 / 32–40 / 105–115 | 44–50 / 33–37 / 104–115 | 44–49 / 33–35 / 113–116 |
| Tests | short 20/40 (7 items), long 40/90 (17) | same | same | same |

Every chapter has the same question types: source-based 7 (5 × 1) · short 3-mark 12 (40–50 words) · short 2-mark 6 (30–40) · long 6-mark 6 (100–120) · mcq 14 · fill-blank 4 · assertion-reason 4 · true-false 4 · ordering 2 · match 3. A script checked that every model answer is inside its exact word limit, not just inside the builder's ±20% gate. D-032 holds: written answers keep their worked content in `answer.model_answer_md`, and `solution_md` is a short method note. The builder's per-sentence answer-leak check (stricter than DB-6) passes, and the API DB-6 test passes.

**Tests** follow the chapter-test blueprints item for item:
- Short test: A, 1 extract; B, 3 of 4 three-mark answers; C, 1 of 2 long answers.
- Long test: A, 2 extract pairs; B, 3 of 4 two-mark answers; C, 4 of 5 three-mark answers; D, 2 long pairs.

So `blueprint_id` is `cbse-10-english-language-and-literature-chapter-test-short` / `-long`. No question is shared between a chapter's two tests.

**Stems are chapter-specific.** Each stem names the poem (*Fire and Ice*, *A Tiger in the Zoo*, *How to Tell Wild Animals*, *The Ball Poem*), its poet, or "the speaker / the tiger / the boy in …". That includes the word-match and rhyme items. One within-chapter near-duplicate was caught by the originality run and fixed (see ch16).

## How the poems are handled (CONTEXT §8–§9)
This is the ch13 rule, applied more strictly to ch15 and ch17 because those poems are still in copyright:
- **No line and no multi-word phrase of any poem** appears in slides, narration, notes, flashcards, stems, options, solutions, model answers, passages or READMEs. The only exceptions are the title and single words, chiefly the 4–6 words in each word-meaning table.
- **Stanzas are described by what happens and what it means, never paraphrased line by line in the poem's order and wording.**
- **The famous devices are described, never quoted.** For example:
  - ch15's oxymoron is "a word for silence paired with a word for fury".
  - ch15's repeated adjective is "one shining adjective for both the eyes and the stars".
  - ch16's misspellings are "a word for dying clipped with an apostrophe to rhyme with lion" and "the verb for jumping respelt to echo the first syllable of leopard".
  - ch17's philosophical phrase is "a philosophical word for the study of knowledge joined to the idea of losing". Only the single word *epistemology* is printed and defined.
  - ch14's last word is taught through its meaning (*be enough*).
- **Every device is illustrated with SOYL's own sentences.**
- **Every extract item is SOYL commentary** (`passage_origin: "soyl-commentary"`) with a *First Flight* pointer. Students are told to read the poem in their textbook on the title slide, the how-to-read slide, the summary, notes sections 1 and 7, the exam tips and every passage stem.

### Reproduction scan (memory-based, scratchpad only)
I wrote each poem from memory into my private scratchpad folder; these reference copies were never committed. A script then listed every word run of two or more words shared between the poem and every string of `release.json`, `tests.json` and the README, with the title masked. Final results:

| | 3+ word runs | content bigrams | accepted pairs (article + key noun, as ch13 accepted *a crow*) |
|---|---|---|---|
| ch14 | 0 | 0 | none |
| ch15 | 0 | 0 | none |
| ch16 | 0 | 0 | *the leopard, the crocodile, the hyena, the chameleon, a bear* (naming the animals) |
| ch17 | 0 | 0 | *the boy, a ball* |

Only function-word pairs remain (*it is*, *in the*, *had to* …), in ordinary sentences. The first drafts were far from clean. Main fixes:
- **ch14:** the "side with those who …" frame, a two-word run from line 3 (27 places), "the world" (9 places), and the cross-line pair "ice is" (10 places).
- **ch15:** the three-word opening of stanzas 2–3 (10 places), the time phrase of stanza 5, its adjective with an article (9 places), the strength phrase of stanza 4 (8 places), and a stanza-3 run.
- **ch16:** the poem's identification formula, "it is the …" (34 places), the chameleon's closing line (12 places), and the bear's and tiger's verbs with their objects.
- **ch17:** the phrase for where the ball goes and its two-word core (49 places), the boy's stance (13 places), the learning phrase (8 places), the possessions phrase (10 places), the noun phrase of the philosophical line (11 places), and the coin and replacement phrases.

Each README lists every fix by position without repeating the words.

## Validation (final tree, after the second merge, 53c5e39)
```
cd platform && npm install
npm test -w @soyl/content-templates
 Test Files  1 passed (1)
      Tests  561 passed (561)            (7 checks per chapter, 28 for ch14–ch17)

npm run content -- lint --exemplars
ok   cbse-10-english-language-and-literature-ch14: 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch15: 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch16: 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch17: 0 error(s), 0 warning(s)
   (80 units ok; the run's only warnings, literature.quote-review ×9, passage.origin ×6,
    balance.competency ×1, are in other producers' units)

npm run content -- verify --board cbse --class 10 --authored
ok   cbse-10-english-language-and-literature-ch14 (authored): 62/62 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-english-language-and-literature-ch15 (authored): 62/62 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-english-language-and-literature-ch16 (authored): 62/62 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-english-language-and-literature-ch17 (authored): 62/62 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
verify --authored: 80 unit(s), 6274 questions, 0 blocking flag(s) (deterministic checks only; files unchanged)

npm run content -- originality --authored
ok   cbse-10-english-language-and-literature-ch14 (authored): 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch15 (authored): 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch16 (authored): 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch17 (authored): 0 error(s), 0 warning(s)
originality --authored: 80 unit(s), 0 error(s) (report only; files unchanged)
   (reference-overlap check skipped: no reference texts in catalog/sources/reference)

npx vitest run --root api test/content.test.ts      (DB-6: no answers in served content)
 Test Files  1 passed (1)   Tests  13 passed (13)

npx vitest run --root db test/db6-split.test.ts
 Test Files  1 passed (1)   Tests  8 passed (8)
```
Before the first merge, `originality --authored` reported 30 errors, all in other producers' Maths and SST units. Merging `origin/platform/main` (which carries their fixes) took the total to 0 before ch14 was committed.

## Verifier pass (done by the author; no sub-agents)
Every item was re-answered blind. Form facts and stanza order were checked, and every student-facing string was scanned (above). Each README has the full list. Beyond the reproduction fixes:
- **ch14:** the last MCQ was fixed at key c to balance the keys.
- **ch15:** the last MCQ was fixed at key c.
- **ch16:**
  - A long model described a goose with a long tail; it now says long neck.
  - One 3-mark model was trimmed from 51 words to fit the limit.
  - The rhyme-scheme fill-blank stem was 80% similar to the rhyme-scheme MCQ stem, because the long title fills both 5-gram sets. The originality run flagged it, and the fill-blank stem was reworded.
  - The last MCQ was fixed at key c.
- **ch17:**
  - The bulk rewording first left unescaped apostrophes, so the build failed on parse before writing anything. Fixed.
  - One 3-mark model was trimmed from 51 to 46 words.
  - The last MCQ was fixed at key c.

## Facts a reviewer should double-check with the textbook
Each README has a full "Facts to confirm" list and a "left out" list. These are the ones most worth checking:
- **ch14:**
  - Frost's details: 1874–1963; four Pulitzer Prizes; *New Hampshire* (1923).
  - Form: nine lines in one stanza, rhyme scheme aba abc bcb; the short lines are 2, 8 and 9.
  - Left out: first magazine publication (often given as *Harper's*, Dec 1920), the Harlow Shapley anecdote, the Dante's *Inferno* echo, and metrical labels.
- **ch15:**
  - Leslie Norris (1921–2006), Welsh, poet and short-story writer.
  - Five quatrains; loose rhyme, mainly in lines 2 and 4 (some half-rhymes).
  - The s-alliteration is in stanza 1. Stanzas 2–3 open alike and stanza 4 opens with a word of contrast.
  - Left out: Norris's birthplace and career, and the poem's collection and year.
- **ch16:**
  - Carolyn Wells (1862–1942), American: humorous and nonsense verse, edited anthologies, mystery novels.
  - Six sestets rhyming ababcc. Animal order: lion, tiger, leopard, bear, crocodile and hyena, chameleon.
  - The clipped word is in the lion stanza; the respelt verb (two forms) is in the leopard stanza.
  - Names: the content says "the Asiatic lion" and "the tiger", not the poem's two-word names.
  - Left out: the year of first publication.
- **ch17:**
  - John Berryman (1914–1972), American, linked with the Confessional poets; Pulitzer Prize for *77 Dream Songs*.
  - **The content says the poem is "free verse in one continuous stanza". Please confirm the *First Flight* layout.**
  - The speaker addresses the boy directly once.
  - Left out: the year of the poem, the line count, any longer published version, and other biographical details.

## Not done / follow-ups
- **No n-gram check against the actual texts.** `catalog/sources/reference/` holds no reference texts, so my reproduction scan used poems written from memory. A reviewer with *First Flight* should run each README's checklist. My recollection of *The Ball Poem* and *A Tiger in the Zoo* may differ in small ways from the NCERT printing.
- **Accepted pairs:** ch16 and ch17 keep article + key-noun pairs (*the hyena*, *the boy*, *a ball* …). If the editorial team wants a zero-bigram rule even for naming, these are the places to change.
- **Extract pattern:** the CBSE 2026-27 poem extract may mix MCQs and short completions differently. Our commentary items use 3–4 MCQ/fill parts and 1 short part, as in ch13.
- **Shared scratchpad:** another agent in the session wrote to a shared `scratchpad/ref/` file (a Hindi text overwrote my first ch14 reference). I moved my references and scripts to a private `scratchpad/english-d/` folder and reran every scan from there. Other producers should use private subfolders too.
- No `publish --authored` run (it needs the shared local Postgres).
- Remaining CBSE 10 English chapters: ch18 onwards in *First Flight* poetry and *Footprints without Feet* are untouched by this branch.

Needs from owner: none.
