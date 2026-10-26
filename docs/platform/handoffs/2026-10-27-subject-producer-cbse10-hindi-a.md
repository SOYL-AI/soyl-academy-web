# subject-producer + hindi-specialist — CBSE 10 Hindi A ch01, ch18, ch09, ch03 (D-025, D-026) — 2026-10-27

Status: **done** (all items `status: "draft"` pending review)

Branch: `platform/subject-producer/cbse-10-hindi-a` (worktree `C:/Users/Prabhu/soyl-wt/content-cbse10-hindi-a`). It was based on `origin/platform/main` bebeeff. `origin/platform/main` 0dee08c was merged once (a02a70d) after the four chapters were finished, and every check was re-run on the merged tree. That merge brought catalog QA's new Hindi A chapter-test blueprints, and the two literature chapters were then aligned to them.

## What changed
| Path | What |
|---|---|
| `platform/content/authored/hindi-language/cbse-10-hindi-a-ch01/` | अपठित गद्यांश और काव्यांश: `release.json`, `tests.json`, `README.md`, `src/` |
| `…/hindi-language/cbse-10-hindi-a-ch01/src/lib.mjs` | Shared **Hindi authoring library** used by all four chapters. Details below the table. |
| `…/hindi-language/cbse-10-hindi-a-ch18/` | रचनात्मक लेखन (writing skills) |
| `…/hindi-literature/cbse-10-hindi-a-ch09/` | नेताजी का चश्मा — स्वयं प्रकाश (prose) |
| `…/hindi-literature/cbse-10-hindi-a-ch03/` | पद — सूरदास (poetry; the strictest no-reproduction case) |
| `docs/platform/handoffs/2026-10-27-subject-producer-cbse10-hindi-a.md` | This note |

`src/lib.mjs` is adapted from the English library:
- Item builders:
  - MCQ with balanced key rotation;
  - Hindi assertion-reason options and Devanagari option letters (क ख ग घ) in solutions;
  - true-false, fill-blank, match (right column shuffled), ordering (shown shuffled);
  - short and long with `word_limit`;
  - `writing` with `format`, `word_limit` and a rubric;
  - case/source items with `alternatives`.
- Decks, notes, cards and tests.
- `build()` validates with:
  - the shared schemas;
  - `checkScriptRelease` (NFC, well-formed Devanagari, Latin runs, TTS-safe narration);
  - chapter-wide nukta consistency;
  - pipeline stage-4 lint (`lintExemplar`) and stage-5 deterministic checks;
  - the literature quote/verse heuristics;
  - a **danda-aware answer-leak check**: no key-side sentence of 60+ characters may appear in served content;
  - a per-chapter **reproduction guard**, `setForbidden([...])`: the build fails if any string contains one of the listed phrases of the original text.

Rebuild a chapter from `platform/`: `npx tsx content/authored/<family>/<chapter>/src/build.mjs`. The build is deterministic; it writes `release.json` and `tests.json` and prints stats, warnings and errors.

Commits:
- 7bf7d97 — ch01 + lib
- 06d8e68 — ch18
- 864b28e — ch09
- e19d2f8 — ch03
- edab047 — ch01 alternative fix (see gaps)
- a02a70d — merge of `origin/platform/main`
- 5e0d1eb — ch03/ch09 tests aligned to the new blueprints
- this handoff.

## Counts
| | ch01 अपठित | ch18 रचनात्मक लेखन | ch09 नेताजी का चश्मा | ch03 पद — सूरदास |
|---|---|---|---|---|
| Family | hindi-language | hindi-language | hindi-literature | hindi-literature |
| Decks (slides) | 17 + 16 | 17 + 18 | 21 | 22 |
| Slides with a visual | 8 + 7 | 7 + 7 | 10 | 12 |
| Worked examples / checks | 2 + 2 / 3 + 3 | 2 + 4 / 3 + 3 | 0 / 3 | 0 / 4 |
| Narration max / mean words | 60 / 51 | 57 / 45 | 65 / 51 | 68 / 52 |
| Notes sections | 7 | 7 | 7 | 7 |
| Flashcards | 27 | 29 | 28 | 28 |
| Questions (marks) | 62 (134) | 68 (189) | 68 (132) | 67 (130) |
| Passage children | 50 | 8 | 34 | 34 |
| Difficulty d1/d2/d3/d4 | 10/33/15/4 | 12/34/19/3 | 14/31/20/3 | 12/34/18/3 |
| Application or higher (items / marks) | 60% / 66% | 62% / 84% | 47% / 61% | 49% / 64% |
| MCQ keys a/b/c/d (incl. children) | 15/14/14/14 | 6/5/6/5 | 15/15/13/14 | 15/14/14/14 |
| AR keys | a c a d | a b c d | b a d c a | c a d b |
| Short test | 20 / 40 min, 8 items | 20 / 40 min, 11 items | 20 / 40 min, 12 items | 20 / 40 min, 12 items |
| Long test | 40 / 90 min, 14 items | 40 / 90 min, 22 items | 40 / 80 min, 20 items | 40 / 80 min, 20 items |
| `blueprint_id` | null | null | `cbse-10-hindi-a-chapter-test-short/-long` | `cbse-10-hindi-a-chapter-test-short/-long` |

Question types per chapter:
- **ch01:**
  - case-based 10: 5 SOYL-written prose passages of ~230–270 words and 5 SOYL poems of ~110–120 words, each 7 marks = 3 MCQ + 2 short (2 marks, 25–30 words); `g_bawdi` (ङ) carries an `alternatives` choice.
  - mcq 27: snippet-based title, central idea, inference, word in context (`++रेखांकित++`), idiom, antonym, suffix, fact vs opinion, tone, cause–effect, "not mentioned", three-statement combinations, symbol, भाव, संदेश, स्वर, मानवीकरण.
  - short-2 8 · true-false 5 · fill-blank 4 · assertion-reason 4 · match 2 · ordering 2.
- **ch18:**
  - `writing` 27, each with `format`, `word_limit` and a rubric summing to marks:
    - paragraph 6 (6 marks, 110–130 words);
    - letters 6 (5 marks, 90–110 words): 5 `letter-formal` (complaint, editor ×2, principal, transport corporation) and 1 `letter-informal`;
    - resume 3 (5 marks, 70–90 words);
    - email 4 (5 marks, 70–90 words);
    - advertisement 4 (4 marks, 35–45 words);
    - message 4 (4 marks, 35–45 words).
  - mcq 17 · true-false 5 · fill-blank 4 · match 2 · ordering 3 (letter parts, e-mail parts, jumbled paragraph) · assertion-reason 4 · short-2 4.
  - case-based 2: a flawed draft letter (with an `alternatives` part) and a flawed draft advertisement.
- **ch09 and ch03:** source-based 6 (`soyl-commentary`, 5 × 1 MCQ, one part with `alternatives`) · case-based 1 (labelled fictional) · mcq 23 · short-2 14 (25–30 words) · long-4 6 (60–80 words) · true-false 5 · AR 5 / 4 · fill-blank 4 · match 3 · ordering 1.

## How literature is handled (CONTEXT §8)
- **Nothing of either text is reproduced.**
  - Summaries are SOYL's, organised by idea. ch09: अधूरी मूर्ति → बदलते चश्मे → कैप्टन की भावना → कैप्टन का जाना → सरकंडे का चश्मा. ch03: one idea per पद.
  - Images and events are stated as facts in modern Hindi, never translated line by line.
  - Single words appear only where a word's meaning is taught.
  - Passage items are SOYL commentary paragraphs (`passage_origin: "soyl-commentary"`), each labelled in its stem with a pointer to क्षितिज भाग 2.
- **Poem, strictest case (ch03).**
  - No line, half-line or **two-word run** of any of the four पद appears.
  - Devices are taught with SOYL's own lines, labelled "SOYL": रूपक "आस-दीप मन-मंदिर…", उपमा, अनुप्रास, पुनरुक्ति प्रकाश, वक्रोक्ति.
  - The पद's own devices are only described ("प्रेम को नदी ही मान लेना — रूपक").
- **Enforcement, three layers:**
  1. `setForbidden` guard lists — 75 phrases for ch09, 103 for ch03 (Braj two-word runs plus textbook-introduction and exercise wording). The build fails on any hit, and it caught real echoes during authoring: "भावुक हैं", "मज़ाक उड़ाया जाना" and "वैसा ही फ्रेम" (ch09); "मन चकरी" ×5 (ch03).
  2. For ch03, a **bigram-overlap scan** against a scratch copy of the four पद written from memory. The copy was kept in the agent's scratchpad and **never committed**. It found 4 shared two-word runs, including "मन की" (a bullet that rendered the second पद's opening) and "जो प्रजा" (the last line's frame). All were rewritten. **After: 0.**
  3. The pipeline literature lint: 0 findings in both chapters. Stems quoting SOYL's own long sentences were shortened to stay under the 8-word review threshold.
- **NCERT exercise questions were not reused.** Classic questions on the same points were reframed. Examples: "भाग्यवान कहने में व्यंग्य" became a general principle question; "घी का काम" became a paradox question; "योग किन्हें दें" became profile matching; राजधर्म is applied to rulers and a civic case; "देश-प्रेम in daily life" became an evaluation of a statement plus a school-life example tied to the Captain.
- Each literature README has the full approach, a reviewer checklist and the list of echoes removed.

## Validation (final tree, after the merge)
```
cd platform && npm install
npm test -w @soyl/content-templates
 ✓ exemplars > hindi-language/cbse-10-hindi-a-ch01 > (7 checks: valid release, named + README, syllabus topics,
   deck rules, counts, own-script rule (NFC, well-formed, no Latin runs, TTS-safe narration), short + long tests)
   — and the same 7 for ch18, hindi-literature/ch03, ch09
 Test Files  1 passed (1)
      Tests  316 passed (316)

npm run content -- lint --exemplars          (exit 0; 45 units ok)
ok   cbse-10-hindi-a-ch01: 0 error(s), 0 warning(s)
ok   cbse-10-hindi-a-ch18: 0 error(s), 0 warning(s)
ok   cbse-10-hindi-a-ch03: 0 error(s), 0 warning(s)
ok   cbse-10-hindi-a-ch09: 0 error(s), 0 warning(s)
   (the only warnings in the run are the ch10 exemplar's 16 — literature.quote-review, passage.origin,
    balance.competency — not mine)

npm run content -- verify --authored --board cbse --class 10 --subject hindi-a
ok   cbse-10-hindi-a-ch01 (authored): 62/62 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-hindi-a-ch03 (authored): 67/67 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-hindi-a-ch09 (authored): 68/68 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
ok   cbse-10-hindi-a-ch18 (authored): 68/68 pass, 0 regenerated, 0 need review, 0 blocking + 0 minor flag(s)
verify --authored: 6 unit(s), 428 questions, 0 blocking flag(s)

npm run content -- originality --authored --state file --board cbse --class 10 --subject hindi-a
ok   cbse-10-hindi-a-ch01 / ch03 / ch09 / ch18 (authored): 0 error(s), 0 warning(s)
   (reference-overlap check skipped: no owner-supplied reference texts; bank-duplicate and literature rules ran)

cd api && npx vitest run test/content.test.ts     (DB-6 contract: no answers in served content; seeds every authored chapter)
 Test Files  1 passed (1)   Tests  13 passed (13)

cd content-pipeline && npx vitest run test/templates-families.test.ts test/pipeline.test.ts
 Test Files  2 passed (2)   Tests  38 passed (38)
```

**Hindi validator** (the scratch `validate.mjs` from `2026-10-26-exemplar-hindi-m1.md`, run with `--literature` for ch03/ch09). Two contract-v2 updates were made to my copy:
- `passage_origin|format|author|map_id` were added to `SKIP_KEYS`, because they are enum fields, not prose.
- `ordering` and `code-output` were added to the objective set for check slides.
```
ch01: warnings (0)  NO ERRORS
ch18: warnings (0)  NO ERRORS
ch09: quoted spans >= 8 words: 0   warnings (0)  NO ERRORS
ch03: quoted spans >= 8 words: 0   warnings (0)  NO ERRORS
```

**Other checks:**
- Every changed file is UTF-8 without a BOM.
- Every string is NFC; the build fails otherwise.
- The literature tests match their blueprints slot for slot (scratch check: types, marks, counts, internal choice, duration and total). The same check also passes on the ch10 exemplar.

## Verifier pass (done by the author; no sub-agents, D-024)
Every item and passage part was re-answered from its stem before comparing with the key. Literature claims were checked against the texts, and every student-facing string in ch03/ch09 was scanned for echoes. Highlights follow; full lists are in each README.
- **ch01:**
  - 74/74 objective keys agreed; all 28 short answers checked against their passages.
  - 11 short models of 34–38 words trimmed to the 25–30 band.
  - One passage was 214 words for a ~250 pattern; extended.
  - Two three-statement items had the same key pattern; one was rewritten.
  - Competency relabelled honestly (66% → 60%).
  - Nukta unified (क़दम; गलती).
- **ch18:**
  - 41/41 objective keys agreed.
  - Four message models of 51–56 words trimmed to the 35–45 band.
  - One MCQ solution repeated a deck sentence (a 60+ character leak); reworded.
  - Formats checked: letter parts in order; e-mail headers; CV declaration; message date, time, salutation and sender; advertisement slogan and contact.
- **ch09:**
  - 75/75 objective keys agreed.
  - Facts checked: author; statue; glasses; the Captain; Haldar Sahab; the paanwala; about two years; the reed glasses; the ending.
  - Overclaims removed: "कंपनी के अधिकारी"; Haldar Sahab's sculptor speculation re-told in order.
  - Echoes removed: the bare-statue description, "सचमुच का चश्मा", "विचित्र", the habit triplet, the paanwala-hurt frame, the two-years frame, "वैसा ही फ्रेम", "भावुक हैं".
  - NCERT-exercise "सीमा पर" framing reframed.
- **ch03:**
  - 74/74 objective keys agreed. Device MCQs on SOYL lines were checked for a single defensible answer; for example, अनुप्रास is deliberately not offered for the "मन-मंदिर" line.
  - A word-for-word rendering of a half-line ("जागते-सोते, स्वप्न में, दिन-रात") removed.
  - The "मन, वचन, कर्म… पकड़" frame removed.
  - Two commentary drafts that walked through a पद in line order rewritten.
  - The author's own "विरह-नदी" example became "विरह-सागर", so it does not echo प्रीति-नदी.

## Contract, catalog and test gaps
1. **`api/test/content.test.ts`, "internal-choice alternatives are served as stems only" — needs backend-api.**
   - The test picks the *first* seeded chapter that has an alternative and compares its served keys with a fixed list that predates contract v2 (`word_limit` is missing). The intended target is the maths chapter (the variable is named `maths`).
   - With ch01 seeded first, the test failed because the alternative served `word_limit`. That is a legitimate stem-side field, not an answer.
   - I could not edit `api/`, so the ch01 alternative states its limit in the stem text only (edab047), and the suite is green.
   - **Follow-up for backend-api:** add `word_limit` to the expected keys, or select the maths release explicitly. After that, the ch01 alternative can get its `word_limit` back.
2. **Blueprints.**
   - The new Hindi A chapter-test blueprints (47a7185) fit literature chapters, and ch03/ch09 now carry `blueprint_id`.
   - ch01 (7-mark अपठित case items) and ch18 (writing tasks) keep `blueprint_id: null`, as the blueprint notes prescribe for non-literature chapters.
   - If the assembler should build अपठित or writing chapter tests, those chapters need their own section designs, for example an अपठित test of 2 × 7-mark cases plus objective items, and a writing test mirroring खंड घ.
3. **Mark splits not re-read from the 2026-27 SQP/MS** (no documents in the repo):
   - the अपठित 7-mark split, used as 3 MCQ + 2 × 2-mark short;
   - the writing rubrics (अनुच्छेद 1/3/1/1; पत्र and ई-मेल 1/3/1; स्ववृत्त 1/3/1; विज्ञापन and संदेश 1/2/1);
   - the e-mail header order.
   They follow common CBSE practice and are flagged in the READMEs.
4. **सूचना (notice) is not covered.** The brief lists सूचना/संदेश/विज्ञापन, but the 2026-27 Hindi A syllabus file has no सूचना topic (it is a Hindi B item); ch18 keeps to topics t01–t06.
5. **Contact details.** Lint `banned.contact` forbids e-mail addresses and phone numbers. E-mail and CV models therefore use placeholders ("(आपका ई-मेल पता)", "……………"), and the decks explain this. If the platform wants a realistic-looking address, an allow-listed placeholder pattern is needed.
6. **No reference texts** in `catalog/sources/reference/`. The pipeline's n-gram originality check could not run against the story or the पद; the reviews were the guard lists plus the author's scratch overlap check. An owner-supplied text of क्षितिज lessons would let `content originality` enforce `literatureMaxRunWords`.
7. **Facts from the author's knowledge, to confirm with the textbook:**
   - ch09: स्वयं प्रकाश's death year (2019) and awards (पहल सम्मान, राजस्थान साहित्य अकादमी पुरस्कार); the "about two years" span.
   - ch03: Surdas' dates and places (c. 1478–1583; रुनकता/सीही; पारसौली).

## Not done / follow-ups
- No `publish --authored` run; it needs the shared local Postgres, which other agents use.
- No audio yet (TTS stage). Narration is hi-IN-ready: no Latin, digits or symbols; numbers are spelled out.
- Remaining Hindi A chapters (ch04–ch08, ch11–ch17) are untouched. The library in `hindi-language/cbse-10-hindi-a-ch01/src/lib.mjs` is ready for them. A literature chapter needs a `setForbidden` list for its text.

## Decisions made
- **Hindi option letters in solutions.** "सही विकल्प: (ख)" is used while option ids stay `a–d`, following the Hindi exemplars.
- **Word limits for writing tasks** are about ±10% around the board's "लगभग N शब्द": 110–130, 90–110, 70–90 and 35–45. Format lines count toward the total, as lint counts them.
- **The reproduction guard lives in each chapter's build** (`setForbidden`). It turns the exemplar's "verifier found close paraphrases" lesson into a failing build rather than a review note.
- **Literature tests use the board pattern**, now identical to the catalog's Hindi A chapter-test blueprints: 5-mark extract, 1-mark MCQ/AR, 2-mark 25–30-word shorts and 4-mark 60–80-word longs. The long test is 80 minutes, per the blueprint; the brief said ≈90.

## Needs from owner
- Optional, for originality enforcement: plain-text reference copies of the क्षितिज भाग 2 lessons, placed in `platform/catalog/sources/reference/` (gitignored).
- Optional: the 2026-27 Hindi A SQP and marking scheme, to confirm the अपठित split and the writing rubrics.
