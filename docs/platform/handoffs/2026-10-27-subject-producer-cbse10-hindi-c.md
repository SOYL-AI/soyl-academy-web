# subject-producer + hindi-specialist — CBSE 10 Hindi A ch06, ch07, ch08, ch13 (D-025, D-026, D-032) — 2026-10-27

Status: **done** (all items `status: "draft"` pending review)

Branch: `platform/subject-producer/cbse-10-hindi-c` (worktree `C:/Users/Prabhu/soyl-wt/content-cbse10-hindi-c`), based on `origin/platform/main` d06cb0a; `origin/platform/main` was merged once after ch13 (see Commits). Every check below was re-run on the final merged tree.

## What changed
| Path | What |
|---|---|
| `platform/content/authored/hindi-literature/cbse-10-hindi-a-ch06/` | उत्साह; अट नहीं रही है — सूर्यकांत त्रिपाठी 'निराला' (two poems, खड़ी बोली): `release.json`, `tests.json`, `README.md`, `src/build.mjs`, `src/questions.mjs` |
| `…/hindi-literature/cbse-10-hindi-a-ch07/` | यह दंतुरित मुसकान; फ़सल — नागार्जुन (two poems; फ़सल in मुक्त छंद) |
| `…/hindi-literature/cbse-10-hindi-a-ch08/` | संगतकार — मंगलेश डबराल (free-verse poem) |
| `…/hindi-literature/cbse-10-hindi-a-ch13/` | नौबतखाने में इबादत — यतींद्र मिश्र (prose, व्यक्ति-चित्र) |
| `docs/platform/handoffs/2026-10-27-subject-producer-cbse10-hindi-c.md` | This note |

All four chapters use the shared library `platform/content/authored/hindi-language/cbse-10-hindi-a-ch01/src/lib.mjs` unchanged (not owned; not edited). Each chapter's `build.mjs` registers its own reproduction guard with `setForbidden([...])`. Titles and topics were taken from `platform/catalog/cbse/10/hindi-a/syllabus.yaml` (ch06 t01–t04, ch07 t01–t04, ch08 t01–t04, ch13 t01–t05).

Rebuild a chapter from `platform/`: `npx tsx content/authored/hindi-literature/<chapter>/src/build.mjs` (deterministic; writes `release.json` and `tests.json`; prints stats, warnings, errors).

Commits:
- bd9f0e6 — ch06
- 8d8b653 — ch07
- 6b85558 — ch08
- afb5c44 — ch13 (includes the ch13 word-match stem made distinct from a ch09 stem after `content originality` flagged `bank.duplicate`)
- de929b6 — merge of `origin/platform/main`
- this handoff.

## Counts
| | ch06 उत्साह; अट नहीं रही है | ch07 यह दंतुरित मुसकान; फ़सल | ch08 संगतकार | ch13 नौबतखाने में इबादत |
|---|---|---|---|---|
| Kind | 2 poems, खड़ी बोली | 2 poems (one मुक्त छंद) | poem, मुक्त छंद | prose, व्यक्ति-चित्र |
| Deck slides (visuals / checks) | 21 (11 / 4) | 22 (12 / 4) | 21 (12 / 4) | 22 (11 / 4) |
| Narration max / mean words | 60 / 50 | 60 / 48 | 65 / 47 | 60 / 47 |
| Notes sections · flashcards | 7 · 28 | 7 · 28 | 7 · 28 | 7 · 28 |
| Questions (marks) | 74 (135) | 75 (137) | 73 (135) | 72 (133) |
| Passage children (+ alternatives) | 34 (+2) | 34 (+2) | 34 (+2) | 34 (+2) |
| source-based (soyl-commentary) · case | 6 · 1 | 6 · 1 | 6 · 1 | 6 · 1 |
| mcq · tf · fb · match · ord · AR | 30 · 6 · 4 · 3 · 1 · 5 | 31 · 6 · 3 · 3 · 1 · 5 | 28 · 6 · 4 · 3 · 1 · 5 | 29 · 6 · 3 · 3 · 1 · 5 |
| short-2 (25–30 w) · long-4 (60–80 w) | 12 · 6 | 13 · 6 | 13 · 6 | 12 · 6 |
| Model answers: 2-mark / 4-mark words | 26–30 / 62–67 | 27–30 / 66–69 | 25–30 / 61–72 | 26–30 / 61–66 |
| Difficulty d1/d2/d3/d4 | 10/40/22/2 | 9/37/27/2 | 10/37/24/2 | 9/40/21/2 |
| Application or higher (items / marks) | 55% / 71% | 56% / 71% | 59% / 73% | 53% / 68% |
| MCQ keys a/b/c/d (incl. children) | 15/17/15/17 | 16/17/15/17 | 14/16/16/16 | 14/17/16/16 |
| AR keys | a d c a b | a c b d a | a d c b a | a c b d a |
| Short test | 20 / 40 min, 12 items | same | same | same |
| Long test | 40 / 80 min, 20 items | same | same | same |
| `blueprint_id` | `cbse-10-hindi-a-chapter-test-short/-long` | same | same | same |
| `setForbidden` entries | 99 | 146 | 124 | 152 |
| Objective keys re-solved | 85/85 | 85/85 | 83/83 | 83/83 |

Totals: **294 questions (540 marks) + 136 passage children + 8 alternatives; 86 slides; 112 flashcards; 8 chapter tests.**

Every chapter has: ChapterRelease v1, `academic_year` 2026-27, `language: "hi"`, provenance `origin: human`, author `claude-opus-5-5 (subject-producer)`; decks in Devanagari with TTS-safe narration (no Latin, digits or symbols; numbers spelled out); a textbook pointer on the title, how-to and summary slides, in notes and in every passage stem; a README with approach, counts, verifier record, reviewer checklist and facts to confirm.

## How literature is handled (CONTEXT §8–§9; same bar as hindi-a and hindi-b)
- **Poems (ch06, ch07, ch08), strictest case.** All three are in modern खड़ी बोली, so the guard lists the poems' content-word pairs and their **sentence frames**, not only rare words. Images and events are stated as facts in SOYL's Hindi, organised by idea, never translated line by line; devices are taught with SOYL's own lines labelled "SOYL"; the poems' own devices are only described. Single words only where a meaning is taught.
  - **Titles that are the poem's own words.** "अट नहीं रही है" (ch06) and "यह दंतुरित मुसकान" (ch07) are each a phrase of the poem. They are used only as titles (CONTEXT §8 allows literature by title) and are deliberately absent from the guard; the rest of those lines is in it.
  - **ch08** is plain, prose-like Hindi; its risk is frames (the three-person list in order, "since ancient times … echo", "forest of tāns in the antarā", the ash, "not alone / sung again", the closing judgement). "मुख्य गायक" is the syllabus's own term and is used as a term.
- **Prose (ch13).** No sentence, close paraphrase, sentence frame, idiom or distinctive phrase; spoken lines (the prayer, the lungi reply, the words about Kashi) are reported as events, never paraphrased in their own frame.
- **Passage items** are SOYL commentary paragraphs (`passage_origin: "soyl-commentary"`, 102–128 words, 5 × 1 MCQs, one `alternatives` part in two items per chapter); each chapter also has one labelled fictional present-day case (ch06 इरा's drought-village songs; ch07 a mill worker returning to his baby and the village harvest; ch08 मीरा on harmonium at a school function; ch13 फ़ैज़ान the young flautist).
- **NCERT exercise questions are not reused**; each README lists the reframes. Six ch08 items that were first drafted too close to the exercises (backstage paragraph, absent accompanist, "other fields", "why not at the top", "in what ways does he help") were reframed before commit.
- **Enforcement, three layers** (as in hindi-a/hindi-b):
  1. `setForbidden` lists (above). Hits during authoring: ch06 "कर दो" (a substring inside "जुड़कर दोहराए"); ch07 22 hits ("पहली बार", "का जादू", "झरने लग" ×6, "के फूल", "के स्पर्श", "नहीं पहचान", "एक की नहीं", "खेतों की मिट्टी", "मन पर क्या प्रभाव"); ch08 26 hits ("उसकी मनुष्यता" ×8, "तब संगतकार" ×4, "चुका राग" ×4, "उसकी आवाज़", "राख जैसा", "संगतकार ही", "पैदल चलकर सीखने", "स्थायी को", "न उठाने", "बिखरने से बचा"); ch13 none (its problems were frames, found by the scan).
  2. **Overlap scan against a scratch copy of each text written from memory, kept only in the agent's scratchpad, never committed** (poems: bigrams; prose: trigrams and 4-grams).

     | | first clean build | final |
     |---|---|---|
     | ch06 (bigrams) | 10 distinct | **5: the 3 title bigrams + "फागुन की", "में कवि"** (grammar) |
     | ch07 (bigrams) | 22 distinct / 164 | **10: the 2 title bigrams + 8 grammatical** ("है और", "माँ की", "में भी", "क्या है", "कुछ नहीं", "नहीं है", "है वह", "बन गया") |
     | ch08 (bigrams) | 52 distinct / 515 | **42, all grammar or the term "मुख्य गायक"** (noun + postposition with गायक/संगतकार, auxiliaries, connectives); frames rewritten |
     | ch13 (4-grams) | 23 distinct / 66 | **8, all names, a date, an award or generic** ("रसूलनबाई और बतूलनबाई के", "सादिक हुसैन और अलीबख्श", "21 अगस्त 2006 को", "संगीत नाटक अकादमी पुरस्कार") |

     The echoes rewritten are listed per chapter in each README (e.g. ch06 "पत्तों से", "साँस लेते", "जल से"; ch07 the lotus-in-the-hut frame, "निर्जीव में भी प्राण", फ़सल's counting frame and "X का Y" phrases; ch08 the list of who the accompanist is, the echo-since-ages frame, "अंतरे की … तानों", "साफ़ सुनाई देती", the ash, "एकाकी नहीं … दोबारा छेड़ा जा सकता"; ch13 the Kashi-facing sentence, the Muharram rules and eighth-day sentence, "कोई राग नहीं बजता", the reed sentence, the musical-family birth frame, "फटी लुंगी में सबसे मिलते").
  3. Pipeline literature lint: 0 findings in all four (two quoted SOYL spans of 8–9 words were shortened).

## Validation (final tree, after the merge)
```
cd platform && npm install
npm test -w @soyl/content-templates
 Test Files  1 passed (1)
      Tests  533 passed (533)        (7 checks each for ch06, ch07, ch08, ch13)

npm run content -- lint --exemplars
ok   cbse-10-hindi-a-ch06: 0 error(s), 0 warning(s)
ok   cbse-10-hindi-a-ch07: 0 error(s), 0 warning(s)
ok   cbse-10-hindi-a-ch08: 0 error(s), 0 warning(s)
ok   cbse-10-hindi-a-ch13: 0 error(s), 0 warning(s)

npm run content -- verify --board cbse --class 10 --authored
ok   cbse-10-hindi-a-ch06 (authored): 74/74 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-hindi-a-ch07 (authored): 75/75 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-hindi-a-ch08 (authored): 73/73 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-hindi-a-ch13 (authored): 72/72 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
verify --authored: 76 unit(s), 6026 questions, 0 blocking flag(s)

npm run content -- originality --authored --state file --board cbse --class 10
ok   cbse-10-hindi-a-ch01 … ch13, ch18: 0 error(s), 0 warning(s)
originality --authored: 76 unit(s), 0 error(s)
   (reference-overlap check skipped: no owner-supplied reference texts; bank-duplicate and literature rules ran.
    Before the merge, one bank.duplicate between ch13 and ch09 — a generic word-match stem — was fixed in ch13; ch09 untouched.)

cd api && npx vitest run test/content.test.ts      Test Files 1 passed (1)   Tests 13 passed (13)
cd db  && npx vitest run test/db6-split.test.ts     Test Files 1 passed (1)   Tests 8 passed (8)
```

**Hindi validator** (the scratch `validate.mjs` from `2026-10-26-exemplar-hindi-m1.md`, with the two contract-v2 updates the hindi-a producer made: `passage_origin|format|author|map_id` in `SKIP_KEYS`; `ordering`, `code-output` objective), run with `--literature`:
```
ch06: quoted spans >= 8 words: 0   warnings (0)  NO ERRORS
ch07: quoted spans >= 8 words: 0   warnings (0)  NO ERRORS
ch08: quoted spans >= 8 words: 0   warnings (0)  NO ERRORS
ch13: quoted spans >= 8 words: 0   warnings (0)  NO ERRORS
```

**Other checks:**
- Every changed file is UTF-8 without a BOM and NFC (the build fails on non-NFC; chapter-wide nukta consistency enforced — it caught "आख़िर"/"आखिर" in ch07).
- D-032: the build's danda-aware answer-leak check (no ≥ 60-character key-side sentence in served content) passes in all four; it caught one ch13 model sentence that repeated a narration sentence, which was reworded. Worked steps for written answers are in `answer.model_answer_md`.
- Blueprint slot-for-slot check (scratch script reading the catalog YAML: section ids, types, counts, marks, internal choice, duration, total): **OK for ch06, ch07, ch08, ch13** (and ch05 as a control).
- Short and long tests share no questions in any chapter; check slides point at objective items only.

## Verifier pass (done by the author; no sub-agents, D-024)
Every objective item, passage part and alternative was re-answered from a dump of stems, options and keys (scratch `keys.mjs`), and every string scanned for echoes. Totals: **336/336 objective keys agreed** (ch06 85, ch07 85, ch08 83, ch13 83). Highlights (full lists in each README):
- **ch06:** device items keep उपमा/मानवीकरण/अनुप्रास/पुनरुक्ति apart and never ask the poems' words; a third `alternatives` part removed (two per chapter, as in the models); three 2-mark models trimmed; "रेखाचित्र" dropped as a genre label for कुल्ली भाट / बिल्लेसुर बकरिहा (sources differ).
- **ch07:** the lotus image is never a single-answer device item (guides differ: उपमा/उत्प्रेक्षा/रूपक); four 2-mark models trimmed; a redundant true-false removed; the मधुपर्क gloss rephrased so it does not mirror a textbook glossary list.
- **ch08:** six items too close to the NCERT exercises reframed; eight items added after the first build counted 65; the "forest of tāns" image is never a single-answer device item.
- **ch13:** eight items added (66 → 72); the eighth-day AR keeps नौहा and संकटमोचन apart; competency mix left honest (53%).

## Contract, catalog and test gaps
1. **No reference texts** in `catalog/sources/reference/`, so `content originality` could not run its n-gram check against the actual lessons. The reproduction reviews rest on the guard lists and the author's scratch scans from memory; a reviewer with the textbook should run the README checklists. Owner-supplied plain texts of these four क्षितिज lessons would close this.
2. **Syllabus `source_status: unverified`.** All items keep to the listed topic ids. The t02 outcome "पंक्ति-क्रम से भाव" is met at the level of ideas/episodes, never line by line (the literature rule forbids line-by-line rendering).
3. **Titles that are poem phrases** (ch06, ch07) are used only as titles; the scan shows only those bigrams from the title lines.
4. **The `api/test/content.test.ts` alternative-keys follow-up** from the hindi-a handoff still stands. All alternatives in these chapters are MCQs, so the suite stays green.

## Facts to confirm with the textbook (author's knowledge)
- ch06: निराला's birth year as printed (1899 used; some sources 1896/1897) and whether the textbook says schooling stopped at class nine (SOYL says only "अधूरी"); the works list (SOYL adds प्रभावती, निरुपमा, कुल्ली भाट, बिल्लेसुर बकरिहा).
- ch07: नागार्जुन's birthplace (SOYL says only "बिहार का मिथिला अंचल"; sources give सतलखा, ज़िला दरभंगा or मधुबनी, ancestral तरौनी); years of the दीक्षा and of the साहित्य अकादमी award not given.
- ch08: the order and list of journalism posts (SOYL: दिल्ली → भोपाल/पूर्वग्रह → जनसत्ता; अमृत प्रभात and later posts left out); death year 2020 from general knowledge.
- ch13: the eighth-day route and distance ("दालमंडी से फातमान तक लगभग आठ किलोमीटर"); that the whole family kept away from music for ten days; cinema-money details and the मामू/सम episode left out; Bharat Ratna year not stated; author details beyond the textbook left out except गिरिजा.

## Not done / follow-ups
- No `publish --authored` run (needs the shared local Postgres).
- No audio yet (TTS stage); narration is hi-IN-ready.
- Remaining Hindi A literature chapters (ch14–ch17) are untouched; the pattern here carries over (per-chapter guard of pairs **and frames**; bigram scan for poems, 4-gram then trigram scan for prose; titles that are text phrases used only as titles).

## Decisions made
- **Frames, not only pairs.** For plain modern Hindi (ch08, ch13) the scans were read for sentence frames (the order and structure of a line or sentence), and frames were rewritten even where every shared n-gram was grammatical.
- **Poem-phrase titles** are allowed as titles only and excluded from the guard; every other run of those lines is guarded.
- **Spoken lines in prose are reported as events** (ch13: the prayer, the lungi reply, the words about Kashi), as in hindi-b.
- **Competency labels kept honest**; where a chapter came up short on items, items were added rather than labels inflated.
- **Literature tests follow the catalog blueprints exactly** (`blueprint_id` set; long test 80 min).

## Needs from owner
- Optional, for originality enforcement: plain-text reference copies of the four क्षितिज भाग 2 lessons (ch06, ch07, ch08, ch13) in `platform/catalog/sources/reference/` (gitignored).
