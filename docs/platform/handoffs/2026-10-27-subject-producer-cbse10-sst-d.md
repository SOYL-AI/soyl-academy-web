# subject-producer (CBSE 10 Social Science, batch D) — ch14, ch15, ch16, ch17 (Political Science) — 2026-10-27

Status: **done** — four hand-authored Political Science chapters to the ch13 (Power-sharing) standard and the `social-science` prompt templates, with the templates' balance and age-appropriateness rules applied throughout. Every item is `status: "draft"` pending review.

Branch: `platform/subject-producer/cbse-10-sst-d` (worktree `C:/Users/Prabhu/soyl-wt/content-cbse10-sst-d`), from `origin/platform/main` (1bcb28a), merged with `origin/platform/main` twice (196ad00 after ch15; 4337ea4 after ch17). Commits: 5dd168a (ch14), 8cc925c (ch15), 70debc1 (ch16), 6db8367 (ch17), 77a3cce (ch14/ch16 short-test source swap), and this handoff (which also carries a ch15 README difficulty-count fix). No files outside the owned paths were changed.

## What changed

| Path | What |
|---|---|
| `platform/content/authored/social-science/cbse-10-social-science-ch14/` | Federalism |
| `platform/content/authored/social-science/cbse-10-social-science-ch15/` | Gender, Religion and Caste |
| `platform/content/authored/social-science/cbse-10-social-science-ch16/` | Political Parties |
| `platform/content/authored/social-science/cbse-10-social-science-ch17/` | Outcomes of Democracy |
| `docs/platform/handoffs/2026-10-27-subject-producer-cbse10-sst-d.md` | This note |

Each folder has `release.json` (v1, 2026-27, provenance `{ origin: "human", author: "claude-opus-5-5 (subject-producer)", model: null }`, `build.checks` filled), `tests.json` (short + long, `blueprint_id` = `cbse-10-social-science-chapter-test-short|long`) and a `README.md` (scope, decks, bank, balance, sources, verifier pass, gaps).

## Counts

| | ch14 Federalism | ch15 Gender, Religion, Caste | ch16 Political Parties | ch17 Outcomes of Democracy |
|---|---|---|---|---|
| Decks (slides) | 2 (21, 21) | 2 (20, 20) | 2 (19, 19) | 2 (20, 16) |
| Slides with a visual | 31 / 42 | 30 / 40 | 28 / 38 | 26 / 36 |
| Deck visuals by kind | table 19, flow 11, plot 1 | table 18, flow 10, plot 2 | table 19, flow 8, plot 1 | table 16, flow 8, plot 2 |
| Worked examples / checks | 6 / 8 | 6 / 8 | 6 / 8 | 6 / 8 |
| Narration words (min–max, mean) | 9–70, 52 | 5–68, 50 | 10–66, 47 | 6–71, 49 |
| Notes sections (visuals) | 5 (7) | 5 (6) | 5 (5) | 5 (6) |
| Flashcards | 32 | 31 | 32 | 30 |
| Questions (marks) | 118 (213) | 101 (182) | 112 (196) | 92 (164) |
| mcq · A-R · T/F · fill · match · ordering | 54 · 10 · 4 · 2 · 2 · 2 | 44 · 10 · 4 · 3 · 2 · 2 | 53 · 10 · 4 · 3 · 2 · 2 | 38 · 10 · 4 · 3 · 2 · 2 |
| map | 1 (3 places, practice) | – | – | – |
| short 2 / short 3 / long 5 | 16 / 13 / 7 | 13 / 9 / 6 | 15 / 9 / 7 | 13 / 8 / 5 |
| source-based / case-based (4 = 1+1+2) | 4 / 3 | 5 / 3 | 4 / 3 | 4 / 3 |
| Difficulty d1/d2/d3/d4/d5 | 15/52/37/13/1 | 17/42/34/7/1 | 19/47/33/12/1 | 11/36/35/9/1 |
| Application or higher (items / marks) | 49% / 59% | 49% / 55% | 51% / 58% | 53% / 63% |
| MCQ keys a/b/c/d | 14/13/13/14 | 11/10/12/11 | 13/13/13/14 | 10/9/10/9 |
| A-R keys a/b/c/d | 3/3/2/2 | 3/3/2/2 | 3/2/2/3 | 3/3/2/2 |

Totals: **8 decks, 156 slides, 125 flashcards, 423 questions** (29 source/case items, each with an either/or part (c) via `alternatives`), **8 chapter tests**.

- **Tests** follow the SST chapter-test blueprints: short = A 3 MCQ + 1 A-R, B 2+2+3, C one of two 5-mark, D one source (20 marks, 40 min); long = A 8 MCQ + 2 A-R, B 2+2+(2|2)+3+(3|3), C 5+(5|5), D two sources (40 marks, 90 min). Short and long tests are disjoint, never use deck-check items, and (new in this batch) **never use a source that a deck worked example walks through** — ch14 and ch16 short tests were switched to other sources for this reason (77a3cce).
- **Map work:** the board has no Political Science map items. ch14 has one practice item (Nagaland, Uttarakhand, Jharkhand on `india-political`) labelled "Map skills (practice)" and kept out of the tests; ch15–ch17 have none.
- **Sources** are SOYL-original with `passage_origin: "soyl-original"` and an illustrative label: a district officer in a new linguistic state (1957), a woman sarpanch in Rajasthan (2006), a state-assembly debate on farm markets, a Madurai clerk on 1965; a Class 9 girl's notebook (Haryana, 2015), a suffrage marcher's letter (Manchester, 1910), a rumour defused by citizens and police, a retired teacher's memoir (1960s → 2022), an election-day report; a village road diary (Odisha, 2010), a coalition-building news report, a young party worker's notebook, an affidavit report; ward-committee minutes, an engineer who grew up under military rule, a sarpanch from a Scheduled Caste family, a speech in a multilingual parliament. Data cases use imagined, labelled, recomputed figures (village projects by tier, Novaland's constitution, gram sabha meetings; time use, assembly vs local-body women, schooling and poverty by group; party recognition, seat tables, internal-democracy study; growth and income shares, a 20-year democracy, a scorecard).

## Validation (final run, after merging origin/platform/main at 4337ea4)

```
$ npm test -w @soyl/content-templates -- --reporter=verbose   (batch D lines; same 7 ✓ for ch15, ch16, ch17)
 ✓ … social-science/cbse-10-social-science-ch14 > is a valid ChapterRelease
 ✓ … social-science/cbse-10-social-science-ch14 > is named after its chapter and has a README
 ✓ … social-science/cbse-10-social-science-ch14 > uses only topics from the chapter syllabus
 ✓ … social-science/cbse-10-social-science-ch14 > decks meet the visual lesson rules
 ✓ … social-science/cbse-10-social-science-ch14 > has enough flashcards and practice questions
 ✓ … social-science/cbse-10-social-science-ch14 > writes language subjects in their own script (…)
 ✓ … social-science/cbse-10-social-science-ch14 > has a short and a long chapter test drawn from its own questions
 Test Files  1 passed (1)
      Tests  379 passed (379)

$ npm run content -- lint --exemplars          (social-science lines; ch01–ch13, ch18 unchanged at 0 / 0)
ok   cbse-10-social-science-ch14: 0 error(s), 0 warning(s)
ok   cbse-10-social-science-ch15: 0 error(s), 0 warning(s)
ok   cbse-10-social-science-ch16: 0 error(s), 0 warning(s)
ok   cbse-10-social-science-ch17: 0 error(s), 0 warning(s)

$ npm run content -- verify --board cbse --class 10 --authored   (batch D lines)
ok   cbse-10-social-science-ch14 (authored): 118/118 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-social-science-ch15 (authored): 101/101 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-social-science-ch16 (authored): 112/112 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-social-science-ch17 (authored): 92/92 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
verify --authored: 54 unit(s), 4454 questions, 0 blocking flag(s) (deterministic checks only; files unchanged)

$ npx vitest run --root api test/content.test.ts      (DB-6 / F-006 answer-leak contract, real authored content)
 Test Files  1 passed (1)
      Tests  13 passed (13)
```

- **Scratch validator** (batch C's, kept outside the repo): narration length and symbols, visual gap, table shape, flow edges, check slides → objective items, scheme sums incl. children and alternatives, word counts vs `word_limit`, ordering shown shuffled, match not keyed in order, fill-blank counts, duplicate stems, key balance, test composition, the answer-leak contract and the lint traps. Final: 0 errors, 0 warnings on all four. A key-check script compared every MCQ/A-R key with the letter its solution concludes with; its flags were re-read by hand and are heuristic false positives.

## Verifier pass (summary; details in each README)
1. **Broken drafts caught:** three assertion-reason items whose solutions argued with themselves or carried a placeholder (ch15 caste votes; ch17 group conflict; ch17 complaints) were rebuilt so the key is defensible; a ch16 three-pair match worth 1.5 marks got a fourth pair.
2. **Keys:** drafts were skewed (ch14 b24 c16 a6 d0; ch15 a16 b17 c7 d4; ch16 b29 a10 c6 d1; ch17 d5 of 34). 12–16 items per chapter were moved in code with the builder's `to:` option (option and solution letters swap together) and the moved solutions re-read; ch17 was drafted in rotation and needed two moves.
3. **Competency honesty:** first drafts were 38% (ch14) and 45% (ch16) application or above. Labels were lowered where items only test understanding (courts settling disputes; a government's duty to protect minorities; "which statement fairly describes"; the corruption comparison), recall duplicates were dropped (four in ch14), and 20 (ch14) and 12 (ch16) genuinely higher-order items were added. Finals 49–53% of items, 55–63% of marks, with 8–14 items at d4–5 per chapter.
4. **Facts fixed or guarded (beyond the textbook model):** the 2023 constitutional amendment on women's reservation is stated as passed and taking effect after the next census and delimitation (the textbook's "bill pending" is not used); no current list or count of national parties (the Election Commission revised it in 2023 and reviews it after elections); recognition criteria taught as the syllabus frames them, with a note that the Commission's full rules have alternative routes; panchayat samiti membership not described as indirect (Article 243C fills panchayat seats at every level by direct election); Hindi as "mother tongue of less than half" instead of a dated percentage; the 1965 protests placed in Madras State (now Tamil Nadu); a "state sales tax" example replaced (GST); the equal-pay principle dated to 1976 without naming the Act that now carries it; Lok Sabha women's share stated as "never reached 15 per cent"; 2011 Census figures given with their year.
5. **Balance and sensitivity:** no living politician, alliance or present-day controversy is named; parties are described by founding year and history only (INC 1885, BJP 1980 from the Jana Sangh of 1951, CPI(M) 1964) with ideology left to their own documents; communal events are generic; caste appears only as constitutional or social categories (SC, ST, OBC, Dalit, "historically privileged castes"); inequality data are imagined and explained as an effect of historical exclusion; the reservation debate gives both sides in neutral verbs; imagined parties have clearly fictional names (a draft used names close to real parties).
6. **Originality:** textbook-echo scans rewrote about 40 (ch14), 90 (ch15), 50 (ch16) and 45 (ch17) phrase occurrences. Several had matched the textbook almost word for word: the definitions of patriarchy and feminist; "the rise of political parties is directly linked to the emergence of representative democracies"; the multi-party and alliance definitions; "democracy is based on the idea of deliberation and negotiation"; "democracy's ability to generate its own support is itself an outcome"; plus the federal/unitary/decentralisation definitions, "pooling sovereignty … retaining identity", "sacred symbols, religious leaders, emotional appeal and plain fear", "divert attention from other pressing issues", "not simply rule by majority opinion … the general view". Key terms students must use are kept and defined in SOYL's words.
7. **Lint traps hit:** "data:" four times (a ch14 slide heading "Reading data:", and plot alt texts "imagined … data:" in ch15 and ch17) — all caught by the scratch validator before the lint; a Unicode minus and division signs in three ch17 solutions were rewritten in words; shell-quoting of apostrophes broke two scripted edits (fixed with module-based replacement rules).
8. **Word limits:** about ten model answers trimmed or extended to their limits (two ch16/ch17 answers had fallen below the lint band).

## Contract and pipeline notes (for the Lead)
1. **Volatile political facts need a review hook.** ch15's representation items depend on when the 2023 amendment takes effect, and ch16's party facts on Election Commission notifications. The READMEs list the item keys to update. A `review_after` or `volatile: true` flag on items (or a catalog note) would let catalog QA find them when the census/delimitation or the next recognition review happens.
2. **Recognition criteria.** The syllabus LO uses the textbook's simplified criteria; the Election Commission's Symbols Order has alternative routes (e.g. recognition as a state party in four states). Catalog QA may want the LO to say "as given in the textbook" or to adopt the full rules; ch16 is written so either change is a small edit.
3. **Deck worked examples vs test items.** No check stops a test from using a source that a deck worked example has already answered (this batch avoids it by hand). A lint rule comparing passage text in deck examples with test items would make the convention enforceable.
4. **Cartoon items.** Every Political Science chapter's board section can carry a cartoon-based MCQ; the textbook chapters ch15–ch17 lean on cartoons. An image asset kind with licensed or SOYL-drawn cartoons would close this gap across ch13–ch17.
5. Batch A–C recommendations still stand: `categories` for bar plots (all eight plots here number their categories), a narrower `data:` filter (four false positives in this batch), an answer-leak lint rule mirroring `api/test/content.test.ts`, a `practice_only` flag for practice map items, and normalising U+2212 in the verifier's number parser.

## Needs from Lead
- Merge `platform/subject-producer/cbse-10-sst-d` into `platform/main`.
- Route notes 1 and 2 to catalog QA.

## Needs from owner
None.
