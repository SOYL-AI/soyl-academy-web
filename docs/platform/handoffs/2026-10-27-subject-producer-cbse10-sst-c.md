# subject-producer (CBSE 10 Social Science, batch C) — ch08, ch09, ch10, ch11, ch12 (Geography) — 2026-10-27

Status: **done** — five hand-authored Geography chapters to the batch A/B standard (ch06, ch07) and the `social-science` prompt templates. Every item is `status: "draft"` pending review.

Branch: `platform/subject-producer/cbse-10-sst-c` (worktree `C:/Users/Prabhu/soyl-wt/content-cbse10-sst-c`), from `origin/platform/main` (f34b52f), merged with `origin/platform/main` at 0dee08c (catalog QA fixes; no SST catalog changes). Commits: 5efda9e (ch08), c392733 (merge), 61056fd (ch09), faa7c81 (ch10), 35ae461 (ch11 + ch10 README count), 30e9b26 (ch12) and this handoff. No files outside the owned paths were changed.

## What changed

| Path | What |
|---|---|
| `platform/content/authored/social-science/cbse-10-social-science-ch08/` | Water Resources (board map list: 8 dams) |
| `platform/content/authored/social-science/cbse-10-social-science-ch09/` | Agriculture (board map list: rice and wheat areas; sugarcane, tea, coffee, rubber, cotton, jute states) |
| `platform/content/authored/social-science/cbse-10-social-science-ch10/` | Minerals and Energy Resources (board map list: 7 power plants; mines and oil fields from the syllabus LOs) |
| `platform/content/authored/social-science/cbse-10-social-science-ch11/` | Manufacturing Industries (board map list: 5 cotton centres, 6 steel plants, 8 software parks) |
| `platform/content/authored/social-science/cbse-10-social-science-ch12/` | Lifelines of National Economy (board examines map work only: 10 ports, 6 airports; t02 project-only) |
| `docs/platform/handoffs/2026-10-27-subject-producer-cbse10-sst-c.md` | This note |

Each folder has `release.json` (v1, 2026-27, provenance `{ origin: "human", author: "claude-opus-5-5 (subject-producer)", model: null }`, `build.checks` filled), `tests.json` and a `README.md` (scope, map work, decks, bank, sources, verifier pass, gaps).

## Counts

| | ch08 Water | ch09 Agriculture | ch10 Minerals & Energy | ch11 Manufacturing | ch12 Lifelines |
|---|---|---|---|---|---|
| Decks (slides) | 2 (21, 18) | 2 (20, 19) | 2 (19, 19) | 2 (20, 18) | 2 (15 board, 15 project) |
| Slides with a visual | 29 / 39 | 27 / 39 | 28 / 38 | 28 / 38 | 20 / 30 |
| Deck visuals by kind | table 16, flow 12, plot 1 | table 18, flow 7, plot 2 | table 17, flow 9, plot 2 | table 17, flow 10, plot 1 | table 14, flow 5, plot 1 |
| Worked examples / checks | 5 / 8 | 5 / 10 | 5 / 8 | 5 / 8 | 5 / 8 |
| Narration words (min–max, mean) | 9–69, 52 | 6–73, 46 | 7–70, 48 | 5–67, 49 | 7–68, 46 |
| Notes sections (visuals) | 5 (6) | 5 (5) | 5 (5) | 5 (6) | 5 (5) |
| Flashcards | 32 | 34 | 34 | 35 | 28 |
| Questions (marks) | 114 (202) | 120 (208) | 132 (233) | 136 (243) | 94 (149) |
| mcq · A-R · T/F · fill · match · ordering | 45 · 10 · 4 · 2 · 2 · 2 | 48 · 11 · 4 · 2 · 2 · 2 | 52 · 13 · 3 · 2 · 2 · 2 | 53 · 13 · 3 · 1 · 2 · 2 | 33 · 10 · 4 · 2 · 2 · 2 |
| map items (places) | 8 (8, board) | 10 (10, board) | 14 (7 board + 15 syllabus-LO places) | 15 (19, board) | 20 (32, board) |
| short 2 / short 3 / long 5 | 16 / 12 / 7 | 16 / 12 / 7 | 17 / 14 / 7 | 17 / 15 / 9 | 9 / 6 / 2 |
| source-based / case-based | 3 / 3 | 3 / 3 | 3 / 3 | 3 / 3 | 2 / 2 |
| Difficulty d1/d2/d3/d4/d5 | 9/54/40/10/1 | 10/60/38/11/1 | 9/62/52/8/1 | 8/73/44/10/1 | 9/54/25/5/1 |
| Application or higher (items / marks) | 50% / 57% | 50% / 54% | 50% / 56% | 51% / 53% | 62% / 69% |
| MCQ keys a/b/c/d | 11/11/12/11 | 12/12/12/12 | 13/13/13/13 | 13/14/13/13 | 8/8/8/9 |

Totals: **10 decks, 184 slides, 163 flashcards, 596 questions** (28 source/case items, each with an either/or part (c) via `alternatives`), **10 chapter tests**.

- **Map work.** Board-list places are 1-mark `map` items on `india-political` with clue stems (`kind`: dam, crop-area, power-plant, mine, oil-field, industrial-centre, steel-plant, software-park, sea-port, airport). As in ch06/ch02, ch08–ch11 tests replace one 2-mark short with two 1-mark map items in Section B. ch09's "identify" list (rice and wheat areas, leading crop states) is modelled as **shade and label** a state from clues, since `MapPlace` has no geometry.
- **Sources and cases** are SOYL-original with `passage_origin: "soyl-original"` and an illustrative label: a 1993 dam hearing with a downstream farmer and an upstream villager, a Phalodi grandmother's tanka, a canal-district teacher on salinity; a Mizoram jhum farmer (1985), a Ludhiana Green Revolution diary (1969), an Assam tea manager; a Jharkhand mining-town doctor, a Karnataka gobar gas user, Nagercoil wind farms; a Tamil Nadu handloom weaver, a Hugli jute manager after Partition, a resident's letter on a chemical factory; west- and east-coast voyages identifying ports. Data cases (water budgets, reservoir silting, rooftop litres, land fragmentation, yields vs water table, ore grade vs cost, village fuel, a state's power mix, smelter site costs, two sugar mills, a river before/after an effluent plant, cargo-to-port choices, balance of trade) use imagined, labelled, recomputed figures. No volatile statistic is stated as current.
- **Tests:** ch08–ch11 follow the SST chapter-test blueprints with `blueprint_id` set (short = A 3 MCQ + 1 A-R; B 2 + map + map + 3; C one of two 5-mark; D one source — 20 marks/40 min; long = A 8 + 2; B 2 + map + map + (2|2) + 3 + (3|3); C 5 + (5|5); D two sources — 40/90). **ch12** is examined through map work only, so its tests are map-work tests in the same 20/40-mark frame (short: 4 MCQ + 1 A-R, six airports, one of two five-port items, a voyage source; long: 8 MCQ + 2 A-R, ten ports, two three-airport items, 2+2+3+3 port-reasoning shorts, a cargo case) with **`blueprint_id: null`** because the item types are not the blueprint's. All tests are disjoint and use no deck-check item; ch12's 19 project-only items never appear in a test.

## Validation (final run, all five chapters)

```
$ npm test -w @soyl/content-templates
 Test Files  1 passed (1)
      Tests  323 passed (323)          (7 checks per chapter, incl. ch08–ch12)

$ npm run content -- lint --exemplars          (social-science lines)
ok   cbse-10-social-science-ch08: 0 error(s), 0 warning(s)
ok   cbse-10-social-science-ch09: 0 error(s), 0 warning(s)
ok   cbse-10-social-science-ch10: 0 error(s), 0 warning(s)
ok   cbse-10-social-science-ch11: 0 error(s), 0 warning(s)
ok   cbse-10-social-science-ch12: 0 error(s), 0 warning(s)
(ch01, ch02, ch03, ch05, ch06, ch07, ch13, ch18 unchanged: 0 / 0)

$ npm run content -- verify --board cbse --class 10 --authored   (social-science lines)
ok   cbse-10-social-science-ch08 (authored): 114/114 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-social-science-ch09 (authored): 120/120 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-social-science-ch10 (authored): 132/132 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-social-science-ch11 (authored): 136/136 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-social-science-ch12 (authored): 94/94 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
verify --authored: 46 unit(s), 3766 questions, 0 blocking flag(s) (deterministic checks only; files unchanged)

$ npx vitest run --root api test/content.test.ts      (DB-6 / F-006 answer-leak contract, real authored content)
 Test Files  1 passed (1)
      Tests  13 passed (13)
```

- **Scratch validator** (batch B's, kept outside the repo): narration length and symbols, visual gap, table shape, flow edges, check slides → objective items, scheme sums incl. children and alternatives, word counts vs `word_limit`, ordering shown shuffled, match not keyed in order, fill-blank counts, duplicate stems, key balance, test composition, the answer-leak contract and the lint traps (`data:`-style word–colon pairs, `$` before a digit). Final: 0 errors, 0 warnings on all five. A key-check script listed every MCQ/A-R key beside its option text and the letter its solution concludes with.

## Verifier pass (summary; details in each README)
1. **Keys:** one A-R drafted with key (b) while its solution argued (c) (ch10, "gas lies above oil" / "gas is renewable") was corrected; one match item had two "rabi" answers on the right (ch09) and was rebuilt. 13–17 keys per chapter were moved in code with the builder's `to:` option (option and solution letters swap together), and every moved solution was re-read.
2. **Facts fixed or guarded:** Tehri is north-**east** of Rishikesh (draft said north-west); Kudremukh described in the past tense (a 100 per cent export unit); cotton's "largest producer" avoided (alternates between Gujarat and Maharashtra; the item asks for the largest **area**); the Hauz Khas tank left out (the textbook's builder attribution is disputed); a guessed Mumbai High distance removed; no world rankings, production shares, installed capacities, port traffic shares or investment ceilings stated as current; the textbook's Gendathur figures (internally inconsistent) not used.
3. **Originality:** textbook-echo scans rewrote about 30 (ch08), 45 (ch09), 40 (ch10), 30 (ch11) and 15 (ch12) phrases — definitions (dam, mineral, manufacturing, primitive and intensive farming), the reasons for conserving water, crop-condition sentences, "the backbone of industrial development", "super high grade", "critically deficient", "one of the most indispensable minerals", "self-reliant and complete in the value chain", "index of a country's development", the Chotanagpur and steel-problem lists, and the port descriptions. Key terms students must use (ore, placer, nodal industry, twin planks, tidal, landlocked, subsidiary port) are kept and defined in SOYL's words.
4. **Competency honesty:** first drafts were 44% (ch08), 44% (ch09), 42% (ch10) and 40% (ch11) application or above. Labels were not inflated; 3–8 recall items were dropped per chapter and 8–18 genuinely higher-order items added (data diagnoses, site choices, policy evaluations, A-R items with non-explaining reasons), reaching 50–51% of items and 53–57% of marks, with 8–12 items at d4–5. ch12 sits at 62% / 69% because its bank is mostly map items (a map skill, classed as application).
5. **Lint traps hit:** "data:" in a narration and in a plot alt text (ch08); a notes table cell with a chemical formula (ch11) replaced with words; a numerical solution using a Unicode minus (−60) failed the verifier's `numeric.final` check (ch12) and was rewritten with an ASCII minus; several model answers fell below the lint band because hyphenated or en-dashed names count as one word, and were extended.

## Contract and pipeline notes (for the Lead)
1. **ch10 map list — please confirm.** The catalog syllabus LOs for ch10 name iron-ore mines (Mayurbhanj, Durg, Bailadila, Bellary, Kudremukh) and "coal mines, oil fields and power plants". Recent CBSE Geography map lists for this chapter carry only the **power plants** (Namrup, Singrauli, Ramagundam; Narora, Kakrapar, Tarapur, Kalpakkam). I followed the catalog (seven multi-place items for mines and oil fields, 15 places) but kept them **out of the tests** and used only the power plants there. Catalog QA should check the 2026-27 CBSE map list and either drop the mines from the LO or confirm them.
2. **Unicode minus in numerical solutions.** `numeric.final` does not read `−60` (U+2212) as the key −60. Either normalise U+2212 in the verifier's number parser or add a lint hint; it is easy to hit with negative balances.
3. **Word counts for lists of names.** The lint word count treats "Ballari–Chitradurga–Chikkamagaluru–Tumakuru" or "October–December" as one word, so short factual model answers fall below the band. Not a bug, but a note in the questions template would save a round trip.
4. **Map-only chapters and blueprints.** ch12's tests cannot match the SST chapter-test blueprints because the board examines only map work. A `chapter-test-map` blueprint (or a blueprint note allowing map-only chapters) would let these tests carry a `blueprint_id`.
5. Batch A/B recommendations still stand: `MapPlace` coordinates/region ids (ch09's "identify" items are shade-and-label approximations), an answer-leak lint rule mirroring `api/test/content.test.ts`, a lint rule keeping `board_assessed: false` topics out of tests, and a `practice_only` flag for map and project items.

## Needs from Lead
- Merge `platform/subject-producer/cbse-10-sst-c` into `platform/main`.
- Route the ch10 map-list question (note 1) to catalog QA.

## Needs from owner
None.
