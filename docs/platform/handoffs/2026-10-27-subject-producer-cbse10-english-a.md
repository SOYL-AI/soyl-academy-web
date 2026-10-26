# subject-producer — CBSE 10 English Language and Literature ch02, ch03, ch04, ch13 + English prompt templates (D-025, D-026) — 2026-10-27

Status: **done** (all items `status: "draft"` pending review)

Branch: `platform/subject-producer/cbse-10-english-a` (worktree `C:/Users/Prabhu/soyl-wt/content-cbse10-english-a`), based on `platform/main` d64cbf6; merged `origin/platform/main` once (06d2757, adds `vercel.json`, D-030) as the Lead asked, and re-ran every check afterwards.

## What changed
| Path | What |
|---|---|
| `platform/content/authored/english-language/cbse-10-english-language-and-literature-ch02/` | Grammar: `release.json`, `tests.json`, `README.md`, `src/` |
| `platform/content/authored/english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs` | Shared English authoring library (used by all four chapters): item builders (mcq with key rotation, fill-blank, short/long with word limits, `writing` with format + rubric, AR, TF, match with shuffled right column, ordering shown shuffled, case/source with children), decks, notes, cards, tests; `build()` validates with the shared schemas, the pipeline's stage-4 lint (`lintExemplar`), stage-5 deterministic checks, narration limits/symbols, the literature quote/verse heuristics, and an **answer-leak check** (key-side sentences of 60+ chars must not appear in served content) |
| `…/english-language/cbse-10-english-language-and-literature-ch03/` | Writing Skills |
| `…/english-literature/cbse-10-english-language-and-literature-ch04/` | A Letter to God (G. L. Fuentes) |
| `…/english-literature/cbse-10-english-language-and-literature-ch13/` | Dust of Snow (Robert Frost) |
| `platform/content-templates/prompts/english-language/*.v1.md` | outline, deck, notes, flashcards, questions, case-passages, verify |
| `platform/content-templates/prompts/english-literature/*.v1.md` | outline, deck, notes, flashcards, questions, case-passages, verify |
| `docs/platform/handoffs/2026-10-27-subject-producer-cbse10-english-a.md` | This note |

Rebuild a chapter from `platform/`: `npx tsx content/authored/<family>/<chapter>/src/build.mjs` (deterministic; writes `release.json` and `tests.json`; prints stats, warnings and errors).

Commits: ce27622 (ch02), 35fdfbf (ch03), c657e08 (ch04), 06d2757 (merge of `origin/platform/main`), aa4d15f (ch13), b9be8c4 (templates), 72377aa (answer-leak fixes + builder check), plus this handoff.

## Counts
| | ch02 Grammar | ch03 Writing Skills | ch04 A Letter to God | ch13 Dust of Snow |
|---|---|---|---|---|
| Family | english-language | english-language | english-literature | english-literature |
| Decks (slides) | 18 + 19 | 18 + 17 | 23 | 21 |
| Slides with a visual | 8 + 10 | 6 + 10 | 10 | 9 |
| Worked examples / checks | 3 + 5 / 4 + 4 | 4 + 4 / 3 + 3 | 2 / 3 | 2 / 4 |
| Narration max / mean words | 73 / 56 | 72 / 57 | 69 / 58 | 66 / 54 |
| Notes sections | 7 | 7 | 7 | 7 |
| Flashcards | 32 | 30 | 30 | 28 |
| Questions (marks) | 76 (110) | 66 (161) | 63 (161) | 62 (155) |
| Passage children | 20 | 13 | 35 | 35 |
| Difficulty d1/d2/d3/d4 | 16/35/23/2 | 7/23/28/8 | 8/28/20/7 | 8/23/24/7 |
| Application or higher | 62% | 61% | 48% | 48% |
| MCQ keys a/b/c/d | 5/5/5/5 | 4/4/4/4 | 4/4/2/4 | 4/4/2/4 |
| AR keys | a c a b d | a d b d c | a b d c | b a c d |
| Tests | short 20/40 min (18 items), long 40/90 (27) | short 20/40 (14), long 40/90 (20) | short 20/40 (7), long 40/90 (17) | short 20/40 (7), long 40/90 (17) |

Question types per chapter:
- **ch02:** mcq 20 · fill-blank 14 · short 1-mark 14 (editing / omission / transformation) · short 2-mark 7 · long 5-mark 2 · true-false 5 · assertion-reason 5 · match 3 · ordering 2 · case-based 4 (editing, gap filling with options, omission, reported-speech dialogue).
- **ch03:** `writing` 16 (8 `letter-formal`: complaint ×2, editor ×2, order ×2, enquiry ×2; 8 `paragraph` on bar charts, tables, a then-and-now plan and cues), each with `format`, `word_limit` {100, 120} and a rubric summing to 5 · mcq 16 · fill-blank 6 · ordering 3 · match 3 · true-false 5 · assertion-reason 5 · short 8 · long 1 · case-based 3 (draft letter, canteen table, draft paragraph).
- **ch04 / ch13:** source-based 7 (`soyl-commentary`, 5 × 1) · short 3-mark 12 (40–50 words) · short 2-mark 6 (30–40) · long 6-mark 7 / 6 (100–120; character sketch, theme, irony, debate, diary, letter) · mcq 14 · fill-blank 4 · assertion-reason 4 · true-false 4 · ordering 2 · match 3.

## How literature is handled (CONTEXT §8)
- **No text reproduced.** Summaries are in SOYL's words, organised by stage (ch04: hope → ruin → faith → kindness → irony) or by incident and effect (ch13). No sentence, line, dialogue or distinctive phrase of the story or poem appears; for the eight-line poem, no run of two or more of its words beyond the title. Single words only for word meanings.
- **Extract items use SOYL commentary** (`passage_origin: "soyl-commentary"`), labelled in every stem, with a pointer to *First Flight*. Devices are illustrated with SOYL's own sentences.
- **Textbook pointers** on the title slide, how-to-use slide, summary, notes and every passage stem.
- **NCERT exercise questions not reused;** classic questions were reframed (e.g. the irony question is asked through the second letter as an accusation).
- Each literature README has the full approach, a reviewer checklist and the list of echoes removed in the verifier pass.

## Validation (final tree, after the merge)
```
cd platform && npm install
npm test -w @soyl/content-templates
 ✓ exemplars > english-language/cbse-10-english-language-and-literature-ch02 > (7 checks: valid release, named + README,
   syllabus topics, deck rules, counts, own-script rule, short + long tests)   — and the same 7 for ch03, ch04, ch13
 Test Files  1 passed (1)
      Tests  225 passed (225)

npm run content -- lint --exemplars
ok   cbse-10-english-language-and-literature-ch02: 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch03: 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch04: 0 error(s), 0 warning(s)
ok   cbse-10-english-language-and-literature-ch13: 0 error(s), 0 warning(s)
   (no literature.quote-review / literature.verse / passage.origin warnings in ch04 or ch13;
    other units unchanged: hindi-a ch10 17 warnings and science ch01 1 warning, not mine)

npm run content -- verify --authored --state file --board cbse --class 10 --subject english-language-and-literature --chapter N
ok   …-ch02 (authored): 76/76 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   …-ch03 (authored): 66/66 pass, 0 blocking + 0 minor flag(s)
ok   …-ch04 (authored): 63/63 pass, 0 blocking + 0 minor flag(s)
ok   …-ch13 (authored): 62/62 pass, 0 blocking + 0 minor flag(s)

npm run content -- originality --authored --state file --board cbse --class 10 --subject english-language-and-literature --chapter N
ok   …-ch02 / ch03 / ch04 / ch13 (authored): 0 error(s), 0 warning(s)
   (reference-overlap check skipped: no owner-supplied reference texts; bank-duplicate and literature rules ran)

cd api && npx vitest run test/content.test.ts      (DB-6 contract: no answers in served content; seeds every authored chapter)
 Test Files  1 passed (1)   Tests  13 passed (13)

cd content-pipeline && npx vitest run test/templates-families.test.ts test/pipeline.test.ts
 Test Files  2 passed (2)   Tests  38 passed (38)
```
Templates: all 14 parse with `parseTemplate`, resolve for their family without fallback, and every `few_shot` reference loads (0 missing).

## Verifier pass (done by the author; no sub-agents, D-024)
Every item and passage part was re-answered from its stem before comparing with the key; literature claims were checked against the texts; every student-facing string in ch04/ch13 was scanned for echoes of the story/poem. Highlights (full lists in each README):
- **ch02:** collective-noun concord trap (*our housing society celebrate*) replaced; an omission line with no omission and one with an optional word rewritten; a paragraph with two errors in one sentence fixed; a gap fill that allowed *had* given a present anchor; *watched* accepted beside *were watching*; competency 84% → 62% after honest relabelling.
- **ch03:** a meaningless arithmetic sentence in a model rewritten; an overview option that overclaimed ("steadily") fixed; three uses of "data:" that tripped `banned.url`; AR keys rebalanced; competency 74% → 61%.
- **ch04:** 11 echoes of the story removed (e.g. the narrator's description of the postmaster, Lencho's reasoning about God rebuilt clause by clause, "a little more than half", "act of charity", the house description in the author's order); an unattributed line wrongly credited to Lencho's wife removed from three items; "townspeople" and "sleepless" overclaims removed.
- **ch13:** "hemlock tree", "change of mood", "from a hemlock" and an echo of the closing line removed; "alone", "past tense" and "no difficult words" inaccuracies fixed; AR keys rebalanced.
- **Answer leaks (Lead's note):** practice items in ch03 (study-table complaint, museum chart, and reworded editor/order/travel models) and ch13 (one 3-mark item) repeated slide sentences; fixed with new tasks or rewording. The builder now fails on any key-side sentence of 60+ characters found in decks, notes, cards, stems, options or passages.

## Templates (`content-templates/prompts/english-language/`, `english-literature/`)
Generic for any English chapter, class and board (CBSE, ICSE, ISC): placeholders only, board specifics read from `{{exam_notes}}` / `{{blueprint_yaml}}`; ids via `{{id_prefix}}`; `{{task}}` placed explicitly. Few-shot examples come from the authored chapters (`authored/…` references).
- **english-language:** outline (deck split, a procedure per topic, writing formats and rubrics, original passages, question plan with honest competency), deck (rule tables, two-column contrasts, step-by-step worked examples, model letters with hard line breaks, data visuals, narration rules, the "data:" lint trap), notes, flashcards, questions (board-style grammar items, editing/omission 0.5 + 0.5, `writing` with format/word_limit/rubric, one defensible key, accepted alternatives, "Correct option: (x)" solutions), case-passages (editing/gap/omission/dialogue/draft/data/reading passages, all `soyl-original`), verify (blind re-solve, grammar rules, writing-model data recomputation, originality).
- **english-literature:** the no-reproduction rule in every template (stricter for poems: no two-word runs), facts-only and no unattributed speech, commentary-based extracts (`soyl-commentary`, labelled), devices with SOYL sentences, NCERT exercise questions not reused, word-limit and verse/quote lint traps; verify puts the reproduction audit first.

## Contract and catalog gaps
1. **Chapter-test blueprints for English do not fit the board pattern.** `catalog/cbse/10/english-language-and-literature/blueprints/chapter-test-short.yaml` has a 7-mark long answer and 2-mark shorts; `chapter-test-long.yaml` has 6- and 8-mark longs (100–150 words). The board paper (`board.yaml`) has 5-mark extracts, 3-mark shorts (40–50 words) and 6-mark longs (100–120). My tests follow the board pattern and set `blueprint_id: null`; the blueprints (owned by curriculum-cbse-blueprints) should be revised so the assembler can match them.
2. **`board.yaml` still models the letter and analytical paragraph as `long` and says "there is no writing-task QuestionType"** — contract v2 has `writing`; the blueprint notes and item types should be updated to `writing`.
3. **No published rubric split** for the 5-mark letter / analytical paragraph in the catalog; the SOYL rubrics (Format 1 · Content 2 · Organisation and expression 1 · Accuracy 1; Content 3 · Organisation and expression 1 · Accuracy 1) should be checked against the 2026-27 CBSE marking scheme.
4. **Map input for the analytical paragraph:** no map visual (an SVG plan would need the allow-list review); a then-and-now table stands in.
5. **Reference texts for originality** (`catalog/sources/reference/`) are absent, so the n-gram check against the actual story and poem did not run; the reproduction review was manual. A human reviewer with *First Flight* should run the README checklists.
6. **Lint false positive worth noting for generation:** the prose "the data: …" trips `banned.url` (`data:` scheme); called out in the templates.

## Not done / follow-ups
- No `publish --authored` run (needs the shared local Postgres; other agents use it).
- Remaining CBSE 10 English chapters (ch01 reading, ch05–ch12, ch14–ch30) are untouched; the library and templates are ready for them.
