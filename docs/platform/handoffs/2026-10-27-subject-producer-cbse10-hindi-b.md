# subject-producer + hindi-specialist — CBSE 10 Hindi A ch04, ch05, ch11, ch12 (D-025, D-026, D-032) — 2026-10-27

Status: **done** (all items `status: "draft"` pending review)

Branch: `platform/subject-producer/cbse-10-hindi-b` (worktree `C:/Users/Prabhu/soyl-wt/content-cbse10-hindi-b`), based on `origin/platform/main` 1bcb28a. `origin/platform/main` was merged twice (cc75593 after ch05, 24d9c57 after ch12). Every check below was re-run on the final merged tree.

## What changed
| Path | What |
|---|---|
| `platform/content/authored/hindi-literature/cbse-10-hindi-a-ch04/` | राम-लक्ष्मण-परशुराम संवाद — तुलसीदास (poem, Awadhi): `release.json`, `tests.json`, `README.md`, `src/build.mjs`, `src/questions.mjs` |
| `…/hindi-literature/cbse-10-hindi-a-ch05/` | आत्मकथ्य — जयशंकर प्रसाद (poem, खड़ी बोली) |
| `…/hindi-literature/cbse-10-hindi-a-ch11/` | लखनवी अंदाज़ — यशपाल (prose, satire) |
| `…/hindi-literature/cbse-10-hindi-a-ch12/` | एक कहानी यह भी — मन्नू भंडारी (prose, आत्मकथ्य) |
| `docs/platform/handoffs/2026-10-27-subject-producer-cbse10-hindi-b.md` | This note |

All four chapters use the shared library `platform/content/authored/hindi-language/cbse-10-hindi-a-ch01/src/lib.mjs` unchanged (not owned; not edited). Each chapter's `build.mjs` registers its own reproduction guard with `setForbidden([...])`.

Rebuild a chapter from `platform/`: `npx tsx content/authored/hindi-literature/<chapter>/src/build.mjs` (deterministic; writes `release.json` and `tests.json`; prints stats, warnings, errors).

Commits:
- 7d93d08 — ch04
- ec01f29 — ch05
- cc75593 — merge of `origin/platform/main`
- 3cf2caf — ch11
- 59d3df7 — ch12
- 24d9c57 — merge of `origin/platform/main`
- 1cd3618 — distinct stems across chapters (originality `bank.duplicate`)
- this handoff (with a one-line ch11 README correction).

## Counts
| | ch04 संवाद (तुलसी) | ch05 आत्मकथ्य (प्रसाद) | ch11 लखनवी अंदाज़ | ch12 एक कहानी यह भी |
|---|---|---|---|---|
| Kind | poem, Awadhi | poem, खड़ी बोली | prose, satire | prose, आत्मकथ्य |
| Deck slides (visuals / checks) | 22 (12 / 4) | 21 (12 / 4) | 21 (10 / 4) | 22 (13 / 4) |
| Narration max / mean words | 60 / 50 | 63 / 49 | 65 / 51 | 65 / 53 |
| Notes sections · flashcards | 7 · 28 | 7 · 28 | 7 · 28 | 7 · 28 |
| Questions (marks) | 76 (139) | 73 (135) | 66 (127) | 75 (139) |
| Passage children (+ alternatives) | 34 (+2) | 34 (+2) | 34 (+2) | 34 (+2) |
| source-based (soyl-commentary) · case | 6 · 1 | 6 · 1 | 6 · 1 | 6 · 1 |
| mcq · tf · fb · match · ord · AR | 30 · 6 · 4 · 3 · 1 · 5 | 28 · 6 · 4 · 3 · 1 · 5 | 24 · 5 · 3 · 2 · 1 · 5 | 30 · 5 · 3 · 2 · 1 · 5 |
| short-2 (25–30 w) · long-4 (60–80 w) | 14 · 6 | 13 · 6 | 13 · 6 | 16 · 6 |
| Difficulty d1/d2/d3/d4 | 12/41/21/2 | 9/39/22/3 | 9/31/22/4 | 12/40/19/4 |
| Application or higher (items / marks) | 49% / 65% | 52% / 68% | 53% / 64% | 49% / 65% |
| MCQ keys a/b/c/d (incl. children) | 15/17/15/17 | 14/16/16/16 | 15/14/14/15 | 16/17/14/17 |
| AR keys | a c d a b | a c d a b | c a d b a | a c a d b |
| Short test | 20 / 40 min, 12 items | same | same | same |
| Long test | 40 / 80 min, 20 items | same | same | same |
| `blueprint_id` | `cbse-10-hindi-a-chapter-test-short/-long` | same | same | same |
| `setForbidden` entries | 190 | 121 | 124 | 187 |

Totals: **290 questions (540 marks) + 136 passage children + 8 alternatives; 86 slides; 112 flashcards; 8 chapter tests.**

Every chapter has: ChapterRelease v1, `academic_year` 2026-27, `language: "hi"`, provenance `origin: human`, author `claude-opus-5-5 (subject-producer)`; decks in Devanagari with TTS-safe narration (no Latin, digits or symbols; numbers spelled out); a textbook pointer on the title, how-to and summary slides, in notes and in every passage stem; a README with approach, counts, verifier record and reviewer checklist.

## How literature is handled (CONTEXT §8; same bar as ch03/ch09)
- **Poems (ch04, ch05), strictest case.** No line, half-line or two-word run of the poem. Images and events are stated as facts in modern Hindi, organised by idea, never translated line by line; devices are taught with SOYL's own lines labelled "SOYL"; the poem's own devices are only described ("राम के वचनों को जल के समान बताना — उपमा"). Single words only where a meaning is taught (कुम्हड़बतिया, कुलिस, खाँड़…; मधुप, गागर, पाथेय, कंथा…).
  - ch05 is in modern खड़ी बोली, so ordinary SOYL Hindi can collide with it; its guard lists the poem's **content-word pairs**, and each shared bigram was reviewed by hand.
- **Prose (ch11, ch12).** No sentence, close paraphrase, sentence frame, idiom or distinctive phrase; spoken lines (the Nawab's courtesies and closing remark; the father's outbursts, the visitor's complaint, Dr. Ambalal's praise) are reported, never quoted. Process scenes (the cucumber ritual) are compressed lists, not retold paragraphs.
- **Passage items** are SOYL commentary paragraphs (`passage_origin: "soyl-commentary"`, 99–146 words, 5 × 1 MCQs, one alternatives part in two items per chapter), organised by idea; each chapter also has one labelled fictional present-day case.
- **NCERT exercise questions are not reused**; each README lists the reframes (e.g. ch04 "वीर योद्धा की विशेषताएँ" → apply Lakshman's hero test to Parshuram; ch05 "आत्मकथा लिखने से क्यों बचना" → humility or self-protection?; ch11 "बिना विचार, घटना, पात्र के कहानी" → can a mood alone make a story?; ch12 "पिता से वैचारिक टकराहट" → generational or ideological?).
- **Enforcement, three layers** (as in hindi-a):
  1. `setForbidden` lists (above). Hits during authoring: ch05 "मुरझाकर गिर"; ch11 "नफ़ासत और नज़ाकत" ×3, "बिना कथ्य के कहानी"; ch12 "यश-कामना" ×3.
  2. **Overlap scan against a scratch copy of each text written from memory, kept only in the agent's scratchpad, never committed** (poems: bigrams; prose: trigrams and 4-grams).

     | | first build | final |
     |---|---|---|
     | ch04 (bigrams) | 1 ("बार बार") | **0** |
     | ch05 (bigrams) | 11 distinct / 32 | **3 grammatical** ("जीवन की", "न हो", "से जीवन"); 0 content pairs |
     | ch11 (4-grams) | 35 trigrams / 173 | **5 4-grams, all name + event** ("नवाब साहब ने खीरे की", "खीरे की फाँकों को") |
     | ch12 (4-grams) | 83 trigrams / 259 | **9 4-grams, all names, titles or grammar** ("हिंदी की प्राध्यापिका शीला अग्रवाल", "वे चाहते थे कि") |

     The echoes rewritten are listed per chapter in each README (e.g. ch04 "फरसे की ओर देखते हुए", the guru-debt line; ch05 the dream, dawn, pitcher and last lines; ch11 the ticket sentence, the invitation frame, the closing conditional; ch12 "समाज-सुधार के कामों से", "विद्यार्थियों को अपने घर रखकर", the kitchen sentence, the notice's charge).
  3. Pipeline literature lint: 0 findings in all four (quoted SOYL spans ≥ 8 words were shortened or rephrased).

## Validation (final tree, after the second merge)
```
cd platform && npm install
npm test -w @soyl/content-templates
 ✓ exemplars > hindi-literature/cbse-10-hindi-a-ch04 > (7 checks: valid ChapterRelease, named + README,
   syllabus topics, deck rules, counts, own-script rule (NFC, well-formed, no Latin runs, TTS-safe narration),
   short + long tests) — and the same 7 for ch05, ch11, ch12
 Test Files  1 passed (1)
      Tests  435 passed (435)

npm run content -- lint --exemplars          (exit 0; 62 units ok, 0 errors anywhere)
ok   cbse-10-hindi-a-ch04: 0 error(s), 0 warning(s)
ok   cbse-10-hindi-a-ch05: 0 error(s), 0 warning(s)
ok   cbse-10-hindi-a-ch11: 0 error(s), 0 warning(s)
ok   cbse-10-hindi-a-ch12: 0 error(s), 0 warning(s)

npm run content -- verify --board cbse --class 10 --authored
ok   cbse-10-hindi-a-ch04 (authored): 76/76 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-hindi-a-ch05 (authored): 73/73 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-hindi-a-ch11 (authored): 66/66 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-hindi-a-ch12 (authored): 75/75 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
verify --authored: 62 unit(s), 5003 questions, 0 blocking flag(s)

npm run content -- originality --authored --state file --board cbse --class 10 --subject hindi-a
ok   cbse-10-hindi-a-ch01 … ch05, ch09, ch10, ch11, ch12, ch18: 0 error(s), 0 warning(s)
   (reference-overlap check skipped: no owner-supplied reference texts; bank-duplicate and literature rules ran)
   First run flagged 5 bank.duplicate pairs between sibling chapters (poet life-span stem ch03/ch04, device match
   ch04/ch05, central-idea stem ch11/ch12, character-trait stem ch09/ch11, author short ch11/ch12); the new
   chapters' stems were reworded (1cd3618). ch03/ch09 were not touched.

cd api && npx vitest run test/content.test.ts     (DB-6: no answers in served content; seeds every authored chapter)
 Test Files  1 passed (1)   Tests  13 passed (13)
```

**Hindi validator** (the scratch `validate.mjs` from `2026-10-26-exemplar-hindi-m1.md`, with the two contract-v2 updates the hindi-a producer made: `passage_origin|format|author|map_id` in `SKIP_KEYS`; `ordering`, `code-output` objective), run with `--literature`:
```
ch04: quoted spans >= 8 words: 0   warnings (0)  NO ERRORS
ch05: quoted spans >= 8 words: 0   warnings (0)  NO ERRORS
ch11: quoted spans >= 8 words: 0   warnings (0)  NO ERRORS
ch12: quoted spans >= 8 words: 0   warnings (0)  NO ERRORS
```

**Other checks:**
- Every changed file is UTF-8 without a BOM and NFC (the build fails on non-NFC; chapter-wide nukta consistency enforced — it caught "भटियारख़ाना" in an accepted answer in ch12).
- Blueprint slot-for-slot check (scratch script reading the catalog YAML: section ids, types, counts, marks, internal choice, duration, total): **OK for ch04, ch05, ch11, ch12** (and ch03, ch09 as controls).
- Short and long tests share no questions in any chapter; check slides point at objective items only.

## Verifier pass (done by the author; no sub-agents, D-024)
Every item, passage part and alternative was re-answered from its stem, keys compared, and every string scanned for echoes. Totals: **326/326 objective keys agreed** (ch04 85, ch05 83, ch11 76, ch12 82 — top-level objective items + passage children + alternatives). Highlights (full lists in each README):
- **ch04:** rasa and device items separated so each has one defensible key (रौद्र vs वीर never in one item; the पुनरुक्ति line offers no अनुप्रास). Line-order renderings removed (the boast list reordered; "फरसे की ओर देखते हुए"; the guru-debt line). Six 2-mark models trimmed to 28–30.
- **ch05:** echoes of the dream, dawn, pitcher and last lines rewritten; "छोटा … बड़ी कहानियाँ" frame removed; three symbol-identification MCQs relabelled understanding (honest competency 52%); a divorce interview item made gentler for Class 10.
- **ch11:** the narrator-also-satirised point added as a passage, a table and a long; the Nawab's closing remark reduced to "खीरे को पेट पर भारी बताना"; the text's closing conditional (six places) became a comparison; a fourth check slide added; seven models trimmed.
- **ch12:** 27 kinds of echo rewritten (exact 4-word runs from the father's Indore paragraph, the kitchen sentence, the notice's charge…); spoken lines reported only; four application/evaluation items added so the mix is honest at 49%.

## Contract, catalog and test gaps
1. **No reference texts** in `catalog/sources/reference/`, so `content originality` could not run its n-gram check against the actual lessons. The reproduction reviews rest on the guard lists and the author's scratch scans from memory; a reviewer with the textbook should run the README checklists. Owner-supplied plain texts of these four क्षितिज lessons would close this.
2. **Syllabus `source_status: unverified`.** All items keep to the listed topic ids (t01–t04 for poems, t01–t05 for prose). The t02 outcome "पंक्ति-क्रम से भाव" is met at the level of episodes/ideas, never line by line (the literature rule forbids line-by-line rendering).
3. **Rasa labels (ch04).** The syllabus outcome names वीर and हास्य; guides also name रौद्र for Parshuram's speeches. Items keep them apart (dialogue → वीर; Parshuram → रौद्र; Lakshman → हास्य का पुट) and never offer two of them in one item.
4. **Genre label (ch11).** The textbook's exercises call the piece a निबंध, guides a कहानी or व्यंग्य; SOYL says "कहानी के ढंग की व्यंग्य-प्रधान रचना" and asks no item on the label.
5. **The `api/test/content.test.ts` alternative-keys follow-up** from the hindi-a handoff still stands (it targets the first seeded chapter with an alternative). All alternatives in these chapters are MCQs, so the suite stays green.

## Facts to confirm with the textbook (author's knowledge)
- ch04: Tulsidas c. 1532–1623; राजापुर (बाँदा) with सोरों as the alternative view; guru नरहरिदास (stated only as "माना जाता है", not asked).
- ch05: the 1932 हंस आत्मकथा issue and that **friends** (not प्रेमचंद personally) asked; the "सुँघनी साहु" family; छायावाद dates (c. 1918–1936; table/notes only).
- ch11: Yashpal's works list (incl. सिंहावलोकन as autobiography, मेरी तेरी उसकी बात).
- ch12: Mannu Bhandari's death year (2021); the months of the 1947 college events (SOYL says only "मई में नोटिस … अगस्त में कक्षाएँ खुलीं").

## Not done / follow-ups
- No `publish --authored` run (needs the shared local Postgres).
- No audio yet (TTS stage); narration is hi-IN-ready.
- Remaining Hindi A literature chapters (ch06–ch08 poems, ch13–ch17) are untouched; the pattern here (per-chapter guard + scratch n-gram scan; for खड़ी बोली poems, guard content-word pairs) carries over.

## Decisions made
- **Overlap scan granularity:** bigrams for poems (Awadhi/Braj and खड़ी बोली), trigrams and 4-grams for prose (prose bigrams are mostly grammar). Remaining overlaps are allowed only if they are names/titles, generic event phrases or grammar, and are listed in the README for the reviewer.
- **Spoken lines in prose are reported as events, never paraphrased in their own frame** (e.g. the Nawab's remark is "खीरे को पेट पर भारी बताना", not the "tasty but heavy" structure).
- **Competency labels kept honest** (symbol identification = understanding); where the mix fell below ~50%, application/evaluation items were added rather than labels inflated.
- **Literature tests follow the catalog blueprints exactly** (`blueprint_id` set; long test 80 min).

## Needs from owner
- Optional, for originality enforcement: plain-text reference copies of the four क्षितिज भाग 2 lessons in `platform/catalog/sources/reference/` (gitignored).
