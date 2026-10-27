# subject-producer — CBSE 10 English Language and Literature ch05–ch08 (english-literature, D-025, D-026, D-032) — 2026-10-27

Status: **done** (all items `status: "draft"` pending review)

Branch: `platform/subject-producer/cbse-10-english-b` (worktree `C:/Users/Prabhu/soyl-wt/content-cbse10-english-b`), from `origin/platform/main` 1bcb28a; merged `origin/platform/main` twice (96b4d12 after ch06, 1da617e before final validation) and re-ran every check afterwards. No sub-agents (D-024).

## What changed
| Path | What |
|---|---|
| `platform/content/authored/english-literature/cbse-10-english-language-and-literature-ch05/` | *Nelson Mandela: Long Walk to Freedom*: `release.json`, `tests.json`, `README.md`, `src/` |
| `…/cbse-10-english-language-and-literature-ch06/` | *Two Stories About Flying* (*His First Flight*; *The Black Aeroplane*): two decks |
| `…/cbse-10-english-language-and-literature-ch07/` | *From the Diary of Anne Frank* |
| `…/cbse-10-english-language-and-literature-ch08/` | *Glimpses of India* (*A Baker from Goa*; *Coorg*; *Tea from Assam*): three decks |
| `docs/platform/handoffs/2026-10-27-subject-producer-cbse10-english-b.md` | This note |

All four chapters use the shared builder `content/authored/english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs` unchanged (validation, lint, deterministic verify, answer-leak check). Rebuild any chapter from `platform/`: `npx tsx content/authored/english-literature/<chapter>/src/build.mjs` (deterministic).

Commits: f85fe11 (ch05), 4d75ea8 (ch06), 96b4d12 (merge), 632b63e (ch07), e28698a (ch08), 1da617e (merge), f2d514f (distinct word-match stems after the originality run), plus this handoff.

## Counts
| | ch05 Mandela | ch06 Two Stories About Flying | ch07 Anne Frank | ch08 Glimpses of India |
|---|---|---|---|---|
| Decks (slides) | 24 | 20 + 21 | 24 | 16 + 17 + 16 |
| Slides with a visual | 10 | 7 + 9 | 11 | 7 + 6 + 8 |
| Checks / examples | 3 / 2 | 3 + 3 / 1 + 2 | 3 / 2 | 3 + 3 + 3 / 1 + 1 + 1 |
| Narration max / mean words | 70 / 59 | 68 / 58 | 66 / 58 | 67 / 53 |
| Notes sections | 7 | 8 | 7 | 8 |
| Flashcards | 30 | 30 | 30 | 30 |
| Questions (marks) | 63 (161) | 66 (168) | 63 (161) | 67 (173) |
| Passage children | 35 | 40 | 35 | 45 |
| Source-based (all `soyl-commentary`) | 7 | 8 (4 per story) | 7 | 9 (3 per piece) |
| Difficulty d1/d2/d3/d4 | 8/22/26/7 | 10/24/23/9 | 8/23/26/6 | 6/28/27/6 |
| Application or higher | 51% | 50% | 51% | 51% |
| MCQ keys a/b/c/d | 3/4/3/4 | 4/3/4/4 | 3/4/3/4 | 4/4/3/4 |
| AR keys | b c a d | a b d c | a b d c | a b d c |
| Tests | short 20/40 (7 items), long 40/90 (17) | same | same | same |

Question types in every chapter: source-based (5 × 1) · short 3-mark 12 (40–50 words) · short 2-mark 6 (30–40) · long 6-mark 7 (100–120: character sketch, theme, debate, diary, letter/article, comparison) · mcq 14–15 · fill-blank 4–5 · assertion-reason 4 · true-false 4 · ordering 2 · match 3.

**Tests** follow the revised chapter-test blueprints item for item (A 1 extract; B 3 of 4 three-mark; C 1 of 2 long / A 2 extract pairs; B 3 of 4 two-mark; C 4 of 5 three-mark; D 2 long pairs), so `blueprint_id` is `cbse-10-english-language-and-literature-chapter-test-short` / `-long`. No question is shared between a chapter's two tests. In ch06 and ch08 every test section draws on every part.

## Multi-part chapters
- **ch06:** Part 1 deck teaches *His First Flight*; Part 2 deck teaches *The Black Aeroplane* and then the syllabus comparison (t03: the seagull's fear vs the pilot's situation) with a comparison table, a "what each flier needed" two-column, a comparison check and a worked 6-mark comparison plan. Stems name the story.
- **ch08:** one deck per piece; Part 3 adds the comparison of tone (t02) with a three-way table, a tone-matching check and a worked comparison plan. Stems name the piece.

## How literature is handled (CONTEXT §8)
Same approach as english-a (see that handoff and the ch04/ch13 READMEs): summaries in SOYL's words by stage; no sentence, frame, distinctive phrase, list-in-order or dialogue of the text; facts stated plainly; extract items are labelled SOYL commentary with a *First Flight* pointer; devices illustrated with SOYL's own lines; single words for meanings; NCERT exercise questions reframed, not reused. Chapter-specific points:
- **ch05:** the extract's most quotable ideas (courage, hatred/love, the two obligations, the stages of freedom, the oppressor) are explained in new frames; "two obligations" is used instead of the extract's own label.
- **ch07:** the paper/people saying is described, never quoted; the three essay titles appear only as titles (the third, a line of dialogue, only described); history (hiding, arrest, death, publication) is separated from what the extract contains, and items test that the extract predates the hiding.
- **ch08:** *Tea from Assam* is mostly dialogue; speech is reported and attributed only to named speakers.

## Validation (final tree, after the second merge)
```
cd platform && npm install
npm test -w @soyl/content-templates
 ✓ exemplars > english-literature/cbse-10-english-language-and-literature-ch05 > (7 checks: valid release, named + README,
   syllabus topics, deck rules, counts, own-script rule, short + long tests) — and the same 7 for ch06, ch07, ch08
 Test Files  1 passed (1)
      Tests  379 passed (379)

npm run content -- lint --exemplars
ok   cbse-10-english-language-and-literature-ch05: 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch06: 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch07: 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch08: 0 error(s), 0 warning(s)
   (the run's only warnings are 16 in cbse-10-hindi-a-ch10, not mine)

npm run content -- verify --board cbse --class 10 --authored
ok   cbse-10-english-language-and-literature-ch05 (authored): 63/63 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-english-language-and-literature-ch06 (authored): 66/66 pass, 0 blocking + 0 minor flag(s)
ok   cbse-10-english-language-and-literature-ch07 (authored): 63/63 pass, 0 blocking + 0 minor flag(s)
ok   cbse-10-english-language-and-literature-ch08 (authored): 67/67 pass, 0 blocking + 0 minor flag(s)
verify --authored: 54 unit(s), 4290 questions, 0 blocking flag(s)

npm run content -- originality --authored --state file --board cbse --class 10 --subject english-language-and-literature
ok   …-ch02 … ch08, ch13 (authored): 0 error(s), 0 warning(s)
   (first run: 4 bank.duplicate errors — the word-match stem "Match each word with its meaning." was identical in
    ch05, ch06 and ch07; made chapter-specific in f2d514f; reference-overlap check skipped: no reference texts)

npx vitest run --root api test/content.test.ts      (DB-6: no answers in served content; seeds every authored chapter)
 Test Files  1 passed (1)   Tests  13 passed (13)
```

## Verifier pass (done by the author; no sub-agents)
Every item and passage part was re-answered blind; every factual claim checked against the texts and, for context, the historical record; every student-facing string scanned for echoes. Full lists are in each README; highlights:
- **ch05:** the courage idea rebuilt in the extract's own "not X but Y" frame (passage, model, MCQ solution, match) → reframed; Mandela's regret rebuilt clause by clause → rewritten; the "civil and humane society … inclinations and abilities" clause, the colour/background/religion list, the prison-and-bars image, "robbed of their humanity", "hidden but never extinguished", "hunger to be free", the pledge's list, and a diamonds distractor removed; "almost a hundred years" → "most of that century"; AR keys and competency rebalanced honestly.
- **ch06:** the fall ("seized by terror … could hear nothing"), the one-leg pretend-sleep description, the dive/soar verb run, the "forgot he had not always been able to fly" clause, "skim the waves", "taunting … cowardice", "tired and weak with hunger" and "maddened" removed; a 2-mark model that conflated the previous day's lessons with the morning's mockery fixed; one answer leak (long model = slide narration) fixed.
- **ch07:** Anne's opening doubt, "seems to have everything", "about thirty people I can call friends", the inherited-traits clause, the poem's plot in the text's order, "products used in making jam", the Montessori sentence frame and "staked" removed; a JS apostrophe slip caught by the build.
- **ch08:** the "friend, companion and guide" triplet, the tea-garden drive and both legends in the story's order, the adventure-sports and forest-creature lists in the piece's order, "bathed and scrubbed", the coffee-scented air, "misty landscape", "as far as the eye could see" and Pranjol's "largest concentration" line removed; "women pluckers" (not in the story) → "pluckers"; one answer leak fixed.

## Facts a reviewer should double-check with the textbook
- ch05: de Klerk sworn in first as **second** deputy president, Mbeki as **first**; whites sang *Nkosi Sikelel' iAfrika*, blacks *Die Stem*.
- ch06: Forsyth's dates are given as 1938–2025 (he died in June 2025); the story's exact clock time, compass heading and minutes of fuel are deliberately not used.
- ch07: the extract dates from June 1942 (before the hiding on 6 July 1942); essay titles as given.
- ch08: Cariappa is described as "the first Indian to head the Indian Army" (the piece says "first Chief of the Indian Army"); Coorg distances are deliberately not used.

## Not done / follow-ups
- No n-gram check against the actual texts: `catalog/sources/reference/` has no reference texts, so the reproduction review was manual. A reviewer with *First Flight* should run each README's checklist.
- No `publish --authored` run (it needs the shared local Postgres).
- Remaining CBSE 10 English chapters (ch01 reading, ch09–ch12, ch14 onwards, *Footprints without Feet*) are untouched.
