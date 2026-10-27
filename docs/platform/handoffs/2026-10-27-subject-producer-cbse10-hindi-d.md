# subject-producer + hindi-specialist — CBSE 10 Hindi A ch14, ch15, ch16, ch17 (D-025, D-026, D-032) — 2026-10-27

Status: **done** (all items `status: "draft"` pending review)

Branch: `platform/subject-producer/cbse-10-hindi-d` (worktree `C:/Users/Prabhu/soyl-wt/content-cbse10-hindi-d`), based on `origin/platform/main` 9c033fd. `origin/platform/main` was merged once (447208a, bringing in hindi-c's ch06–08 and ch13) before the final gate run, so the cross-chapter bank-duplicate check ran against every Hindi A chapter now on main.

## What changed
| Path | What |
|---|---|
| `platform/content/authored/hindi-literature/cbse-10-hindi-a-ch14/` | संस्कृति — भदंत आनंद कौसल्यायन (क्षितिज गद्य, essay): `release.json`, `tests.json`, `README.md`, `src/build.mjs`, `src/questions.mjs` |
| `…/hindi-literature/cbse-10-hindi-a-ch15/` | माता का अँचल — शिवपूजन सहाय (**कृतिका**, novel extract) |
| `…/hindi-literature/cbse-10-hindi-a-ch16/` | साना-साना हाथ जोड़ि — मधु कांकरिया (**कृतिका**, travelogue) |
| `…/hindi-literature/cbse-10-hindi-a-ch17/` | मैं क्यों लिखता हूँ? — अज्ञेय (**कृतिका**, personal essay) |
| `docs/platform/handoffs/2026-10-27-subject-producer-cbse10-hindi-d.md` | This note |

All four chapters use the shared library `platform/content/authored/hindi-language/cbse-10-hindi-a-ch01/src/lib.mjs` **unchanged**. No other path was touched (hindi-c's ch06–08/ch13 folders were not edited).

Rebuild a chapter from `platform/`: `npx tsx content/authored/hindi-literature/<chapter>/src/build.mjs` (deterministic; writes `release.json` and `tests.json`; prints stats, warnings, errors).

Commits: 7ca22a6 ch14 · 436af08 ch15 · 2741707 ch16 · 447208a merge of `origin/platform/main` · then ch17 and this handoff (see the final SHA in the Lead report).

## Syllabus check: क्षितिज vs कृतिका
- `syllabus.yaml` puts **ch14** in "खंड ग: क्षितिज भाग 2 (गद्य खंड)" and **ch15–ch17** in "**खंड ग: कृतिका भाग 2 (पूरक पाठ्यपुस्तक)**". None of the four is in `removed_topics` (the excluded कृतिका lessons are एही ठैयाँ … and जॉर्ज पंचम की नाक). There is **no `board_assessed` field** in the syllabus.
- The board blueprint (`board.yaml`, प्रश्न 11) sets कृतिका as **three questions, attempt two, 50–60 words, 4 marks** — no पठित गद्यांश. The chapter-test blueprints (`chapter-test-short/-long`) are the same for क्षितिज and कृतिका chapters, so all eight tests follow them slot for slot (`blueprint_id` set). For the कृतिका chapters:
  - every 4-mark long is a **50–60-word** answer (ch14 keeps 60–80 as for क्षितिज), with a 4-step scheme;
  - there are **8 longs** (ch14: 6);
  - the title slide's board table, notes section 7, the exam-tips slide and flashcards teach the कृतिका answer frame;
  - section D titles say "50–60 शब्द".
- ch16 has its own syllabus topic **t04 पर्यावरण-चेतना**, so it has dedicated environment items (MCQs, true-false, two assertion-reason, three shorts, two longs, a passage, the case, a notes section).

## Counts
| | ch14 संस्कृति | ch15 माता का अँचल | ch16 साना-साना हाथ जोड़ि | ch17 मैं क्यों लिखता हूँ? |
|---|---|---|---|---|
| Book · kind | क्षितिज · essay | कृतिका · novel extract | कृतिका · travelogue | कृतिका · personal essay |
| Deck slides (visuals / checks) | 22 (11 / 4) | 22 (10 / 4) | 22 (10 / 4) | 21 (9 / 4) |
| Narration max / mean words | 61 / 50 | 64 / 51 | 65 / 50 | 62 / 50 |
| Notes sections · flashcards | 7 · 28 | 7 · 28 | 7 · 28 | 7 · 28 |
| Questions (marks) | 67 (128) | 69 (135) | 70 (136) | 68 (134) |
| Passage children (+ alternatives) | 34 (+2) | 34 (+2) | 34 (+2) | 34 (+2) |
| source-based (soyl-commentary) · case | 6 · 1 | 6 · 1 | 6 · 1 | 6 · 1 |
| mcq · tf · fb · match · ord · AR | 25 · 5 · 3 · 3 · 1 · 5 | 26 · 5 · 3 · 2 · 1 · 5 | 27 · 5 · 3 · 2 · 1 · 5 | 25 · 5 · 3 · 2 · 1 · 5 |
| short-2 (25–30 w) · long-4 | 12 · 6 (60–80 w) | 12 · 8 (50–60 w) | 12 · 8 (50–60 w) | 12 · 8 (50–60 w) |
| Model lengths (2-mark / 4-mark) | 27–30 / 64–71 | 26–30 / 51–60 | 25–30 / 51–59 | 27–30 / 50–59 |
| Difficulty d1/d2/d3/d4 | 10/28/24/5 | 11/31/21/6 | 15/23/24/8 | 9/26/27/6 |
| Application or higher (items / marks) | 51% / 62% | 49% / 65% | 51% / 64% | 50% / 65% |
| MCQ keys a/b/c/d (incl. children, alts) | 14/14/15/16 | 14/15/15/16 | 14/16/15/16 | 14/14/15/16 |
| AR keys | a d a b c | a c d b a | b a d a c | c a a d b |
| Short test | 20 / 40 min, 12 items | same | same | same |
| Long test | 40 / 80 min, 20 items | same | same | same |
| `setForbidden` entries | 134 | 167 | 115 | 86 |
| Re-solve (objective keys) | 71/71 | 72/72 | 73/73 | 71/71 |

Totals: **274 questions (533 marks) + 136 passage children + 8 alternatives; 87 slides; 112 flashcards; 8 chapter tests.**

Every chapter has: ChapterRelease v1, `academic_year` 2026-27, `language: "hi"`, provenance `origin: human`, author `claude-opus-5-5 (subject-producer)`; decks in Devanagari with TTS-safe narration (no Latin, digits or symbols; numbers spelled out); a textbook pointer on the title, how-to and summary slides, in notes and in every passage stem; a README with approach, reframes, counts, verifier record, reviewer checklist and facts to confirm.

## How literature is handled (CONTEXT §8–§9, AGENTS §5.5)
- **Reported, never quoted.** No sentence, close paraphrase, sentence frame or distinctive phrase of any lesson. Spoken lines, the mother's sayings and the children's rhymes (ch15), the Nepali prayer beyond its title words and the guide's explanations (ch16), and the essays' definitions and images (ch14, ch17) are restated as SOYL's own claims and images.
  - ch14: the essay's "least understood, most used" opening, its either–or questions and its definition of civilisation as culture's outcome are restated ("संस्कृति बीज, सभ्यता फल" is labelled as SOYL's own memory aid).
  - ch15: games are described with SOYL props; the "गोद में उठाकर घर ले चले" and "चूहे की जगह साँप निकल आया" runs were caught and rewritten.
  - ch16: the famous "take little, give back much" line about the stone-breaking women is **not paraphrased in its frame** (it was in the first draft in ten places; all rewritten as "the benefit of their labour reaches everyone, their share is small"); the water-storage reflection is retold as a "bank in the hills" image.
  - ch17: the definitions of अनुभव/अनुभूति are SOYL's; the shadow is explained as a science fact without the essay's images (slap, sun, mute history, vapour); the closing "true because born of feeling" line is inverted.
- **Passage items** are SOYL commentary paragraphs (`passage_origin: "soyl-commentary"`, 111–137 words, 5 × 1 MCQs, an alternatives part in two items per chapter), organised by idea; each chapter also has one labelled fictional present-day case (a science fair; a girl, her father's cricket and her mother's lap; a school trip to a hill village; a competition essay vs a poem after a relief camp).
- **NCERT exercise questions are not reused**; each README lists every reframe (e.g. ch14 Newton → "two people with the same knowledge"; ch15 "why the mother?" → what a child psychologist would say; ch16 "qualities of a guide" → a tour company choosing one; ch17 "role against misuse of science" → an assembly message).
- **Enforcement, three layers** (as in hindi-a/-b/-c):
  1. `setForbidden` lists (above). Hits during authoring: ch15 "शरण लेता है", "पकड़वा मँगाया"; ch16 "नेपाली युवती से सीखी थी" ×5, "क्यों कहा गया", "मातृत्व और श्रम", "आत्मा की शांति के लिए"; ch17 "प्रकाशक के तकाज़े" ×2, "वाक्यों में बाँध".
  2. **Overlap scan against a scratch copy of each lesson and its textbook introduction written from memory, kept only in the agent's scratchpad, never committed** (trigrams and 4-grams; prose).

     | | first build | final |
     |---|---|---|
     | ch14 | 104 trigrams / 357; 40 4-grams / 116 | **4-grams: book titles, the author's name, "गांधी जी के साथ" and generic phrases only** |
     | ch15 | 84 trigrams / 325; 31 4-grams / 79 | **7 4-grams: titles and magazine names, "माँ की गोद में" (the syllabus's own wording), "अपने शब्दों में लिखिए"** |
     | ch16 | 116 trigrams / 428; 30+ 4-grams | **4-grams: the title, book titles and 3 generic phrases** |
     | ch17 | 99 trigrams / 315 | **4-grams: the title, book titles, the author's full name and one generic stem** |

     The echoes rewritten are listed per chapter in each README (frames from the lessons and from the textbook introductions, e.g. "… का जन्म सन् … में … में हुआ").
  3. Pipeline literature lint: 0 findings in all four (quoted SOYL spans of 8+ words were rephrased).

## Facts: stated only where certain
The brief asked to leave out facts that cannot be confirmed, and for ch16 to state Sikkim place names, altitudes and distances only if certain. So **no altitude, distance or count appears anywhere in ch16** (students are told to take such figures from the textbook), and every README has a "Facts to confirm" / "Left out" list. The main ones for a reviewer:
- **ch14:** author dates, birthplace (सोहाना, अंबाला), original name हरनाम दास, Wardha with Gandhi, works; the order of ideas in `b_order`. Left out: college and degree, number of books, Hindi-promotion bodies.
- **ch15:** that the child was dressed as कन्हैया; the father smoking a hookah when the child ran home; the mother cleaning rice; the word चिरौरी for the father's plea; the glossary meaning of अमनिया. Left out: how many times राम-नाम was written, the author's childhood name and jobs, awards, any decade label.
- **ch16:** that कंचनजंगा was hidden by clouds on the first morning; the order of the stops (गंतोक → flags → कवी-लोंग स्टॉक → लायुंग → कटाओ); the सेवन सिस्टर्स waterfall and the author's sense of cleansing; that a local youth (not the guide) blamed pollution at लायुंग. Left out: all distances and altitudes, the number of white flags, the film and treaty at कवी-लोंग स्टॉक, the river at लायुंग, the tea-garden scene, the companion's name.
- **ch17:** the order of ideas in `b_order`; that outer pressures are said to help overcome laziness; that the poem was written after returning to India, on a train; birthplace; ज्ञानपीठ for कितनी नावों में कितनी बार; तार सप्तक 1943. Left out: the wartime example on India's eastern border (recalled, not certain), the alarm-clock comparison, childhood and education cities, journals edited.

## Validation (final tree, after the merge)
```
cd platform && npm install
npm test -w @soyl/content-templates
 Test Files  1 passed (1)
      Tests  561 passed (561)        (7 checks per chapter; ch14–ch17 all pass)

npm run content -- lint --exemplars          (exit 0; 80 units)
ok   cbse-10-hindi-a-ch14: 0 error(s), 0 warning(s)
ok   cbse-10-hindi-a-ch15: 0 error(s), 0 warning(s)
ok   cbse-10-hindi-a-ch16: 0 error(s), 0 warning(s)
ok   cbse-10-hindi-a-ch17: 0 error(s), 0 warning(s)

npm run content -- verify --board cbse --class 10 --authored      (exit 0)
ok   cbse-10-hindi-a-ch14 (authored): 67/67 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-hindi-a-ch15 (authored): 69/69 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-hindi-a-ch16 (authored): 70/70 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-hindi-a-ch17 (authored): 68/68 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
verify --authored: 80 unit(s), 6300 questions, 0 blocking flag(s)

npm run content -- originality --authored     (exit 0)
ok   cbse-10-hindi-a-ch14 … ch17 (authored): 0 error(s), 0 warning(s)
originality --authored: 80 unit(s), 0 error(s)
   (reference-overlap check skipped: no owner-supplied reference texts; bank-duplicate and literature rules ran)

cd api && npx vitest run test/content.test.ts      Tests  13 passed (13)
cd db  && npx vitest run test/db6-split.test.ts     Tests  8 passed (8)
```

**Hindi validator** (the scratch `validate.mjs` from `2026-10-26-exemplar-hindi-m1.md`, with the hindi-a producer's two contract-v2 updates: `passage_origin|format|author|map_id` in `SKIP_KEYS`; `ordering`, `code-output` objective), run with `--literature`:
```
ch14: quoted spans >= 8 words: 0   warnings (0)  NO ERRORS
ch15: quoted spans >= 8 words: 0   warnings (0)  NO ERRORS
ch16: quoted spans >= 8 words: 0   warnings (0)  NO ERRORS
ch17: quoted spans >= 8 words: 0   warnings (0)  NO ERRORS
```

**Other checks:**
- Blueprint slot-for-slot (scratch script reading the catalog YAML: section ids, types, counts, marks, internal choice, duration, total): **OK for ch14, ch15, ch16, ch17** (and ch11 as a control); short and long tests share no questions.
- D-032: worked steps sit in `answer.model_answer_md`; the library's danda-aware leak check passed (two leaks caught during authoring — a ch16 long model and a ch17 long model repeating a notes/narration sentence — were rewritten).
- Every changed file is UTF-8 without a BOM and NFC; chapter-wide nukta consistency enforced (caught "ख़तरे/खतरे" in ch16 and "ग़लत/गलत" in ch17 — the library's assertion-reason options use "गलत").
- Bank duplicates: the first ch15 originality run flagged a character-trait short as 70% similar to ch09 and ch11 stems; reworded. After merging hindi-c's chapters the check still reports 0 errors.

## Verifier pass (done by the author; no sub-agents, D-024)
Every objective item, passage part and alternative was re-answered from a key-less printout (`blind.mjs` in the scratchpad; truncated options printed in full). Totals: **287/287 objective keys agreed** (ch14 71, ch15 72, ch16 73, ch17 71). Note: the shared library places MCQ keys by a fixed rotation, so key letters repeat across chapters; the re-solve therefore checked that exactly one option is defensible in each item, not the letters. Highlights (full lists in each README):
- **ch14:** four passages had alternatives — reduced to the brief's two; textbook-introduction frames rewritten in the author slide, notes and three solutions; three shorts trimmed.
- **ch15:** two exact five-word runs from the text rewritten; one stem reworded after a bank-duplicate flag; six shorts and one long trimmed.
- **ch16:** the "take little, give much" paraphrase removed everywhere; a doubled word ("लेखिका लेखिका") created by a rewrite caught on the printout; Sikkim figures kept out.
- **ch17:** the essay's closing, detachment and hospital frames rewritten; a passage child's option re-synced after its passage was rewritten.

## Contract, catalog and test gaps
1. **No reference texts** in `catalog/sources/reference/`, so `content originality` could not run its n-gram check against the actual lessons. The reproduction reviews rest on the guard lists and the author's scratch scans from memory; a reviewer with the textbooks should run each README's checklist. Owner-supplied plain texts of these four lessons would close this.
2. **Syllabus `source_status: unverified`.** All items keep to the listed topic ids (ch14 t01–t04, ch15 t01–t05, ch16 t01–t05, ch17 t01–t04).
3. **Chapter-test blueprints do not distinguish कृतिका.** The board sets no कृतिका passage, but the shared literature blueprints require a 5-mark source-based section A; the कृतिका tests follow the blueprint (SOYL commentary passage) and put the board-like practice in section D (50–60-word longs). If the Lead wants कृतिका-specific chapter tests (e.g. section A replaced by more 4-mark longs), that is a catalog change for curriculum-architect.
4. **Fixed key rotation in the shared library** (`KEY_PATTERN`) makes key positions identical across chapters that define items in the same order; balance is fine within a chapter, but a student who works many chapters could notice the pattern. A per-chapter seed in `lib.mjs` would fix it (the library is not owned by this task).
5. The `api/test/content.test.ts` alternative-keys follow-up from the hindi-a handoff still stands; all alternatives here are MCQs, so the suite stays green.

## Not done / follow-ups
- No `publish --authored` run (needs the shared local Postgres).
- No audio yet (TTS stage); narration is hi-IN-ready.
- With this branch, every Hindi A literature chapter in the syllabus (ch03–ch17) has content: hand-authored units for ch03–ch09 and ch11–ch17, and ch10 as the gold-standard exemplar under `content-templates/`. Remaining Hindi A work is outside this task.

## Decisions made
- **कृतिका long answers are 50–60 words** (board प्रश्न 11), while the chapter tests keep the shared literature blueprints slot for slot.
- **Facts not certain from memory are left out, not hedged**, and listed in each README; for ch16 this means no Sikkim figures at all.
- **Famous lines are not paraphrased in their own frame** (ch16's "take little, give much", ch17's "true because born of feeling"): SOYL states the idea from another angle.
- **Overlap scan granularity:** trigrams and 4-grams for prose (as hindi-b); remaining overlaps allowed only for titles, names, the syllabus's own wording and generic phrases, all listed in the READMEs.

## Needs from owner
- Optional, for originality enforcement: plain-text reference copies of these four lessons (क्षितिज भाग 2: संस्कृति; कृतिका भाग 2: माता का अँचल, साना-साना हाथ जोड़ि, मैं क्यों लिखता हूँ?) in `platform/catalog/sources/reference/` (gitignored).
