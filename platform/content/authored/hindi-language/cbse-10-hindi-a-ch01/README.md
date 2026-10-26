# CBSE Class 10 Hindi A, Chapter 1 — अपठित गद्यांश और काव्यांश

| | |
|---|---|
| Unit | `cbse-10-hindi-a-ch01` (family `hindi-language`) |
| Board section | खंड क — अपठित बोध, 14 marks: गद्यांश ~250 words (7) + काव्यांश ~120 words (7) |
| Syllabus | `platform/catalog/cbse/10/hindi-a/syllabus.yaml` (2026-27, `source_status: unverified`): t01 अपठित गद्यांश, t02 अपठित काव्यांश |
| Files | `release.json` (2 decks, 7 notes sections, 27 flashcards, 62 questions with 50 passage children), `tests.json` (short 20 / 40 min, long 40 / 90 min), `src/` (build sources) |
| Status | `draft` on every item (D-025/D-026 hand-authored content) |
| Author | `claude-opus-5-5 (subject-producer)`, provenance `origin: human`, 2026-10-27 |

Rebuild from `platform/`: `npx tsx content/authored/hindi-language/cbse-10-hindi-a-ch01/src/build.mjs` (deterministic; writes `release.json` and `tests.json`; prints stats, warnings and errors). `src/lib.mjs` is the shared Hindi authoring library, also used by ch18, ch03 and ch09.

## Scope and approach

- **All text is SOYL's own.** The ten full passages (5 prose of 230–270 words, 5 poems of about 110–120 words), the twenty-odd short practice snippets and verses, and every worked example in the decks were written for this chapter. Nothing is taken from NCERT, a guide or a board paper. Passage stems say "(यह गद्यांश/काव्यांश SOYL द्वारा अभ्यास के लिए लिखा गया है।)" and every passage item carries `passage_origin: "soyl-original"`.
- **Board pattern.** The full items are `case-based` (the board blueprint maps अपठित to case-based) worth 7 marks each, split **3 MCQ × 1 + 2 short answers × 2 (25–30 words)**. The 14-mark total, passage lengths and "MCQ + short" mix are from the CBSE 2026-27 syllabus; the exact 3 + 2 split is SOYL's reading of recent sample papers and should be checked against the 2026-27 SQP (`cbse-sqp-x-hindi-a-2026-27`).
- **Skill items around the passages.** Short snippets test one skill each: title, central idea, inference, word in context (`++रेखांकित++` underline marker), idiom, antonym, suffix, fact vs opinion, tone, cause–effect, "not mentioned", three-statement combinations ((I), (II), (III)), and for poetry symbol, भाव, संदेश, स्वर, मानवीकरण and आशय.
- **Internal choice.** `g_bawdi` (q_cbse10hia_ch01_001) part (ङ) has an `alternatives` entry (विकास का अर्थ **अथवा** शीर्षक + कारण).
- **Decks.** Part 1 अपठित गद्यांश (17 slides) and Part 2 अपठित काव्यांश (16 slides): procedure flows, question-type tables, worked examples on SOYL mini-passages, two-column contrasts (weak vs full answer), 3 checks each, summary and exam tips. Narration is Devanagari only, max 60 words, no digits, Latin letters or symbols.

## Counts

- **Questions: 62 (134 marks) + 50 passage children.**
  - By type: case-based 10, mcq 27, short 2-mark 8, true-false 5, fill-blank 4, assertion-reason 4 (keys a, c, a, d), match 2 (right column shuffled), ordering 2.
  - By topic: t01 32, t02 30.
  - Difficulty: d1 10, d2 33, d3 15, d4 4.
  - Competency: application or higher on 60% of items and 66% of marks (unseen-text inference and title items are analysis; vocabulary from context is application; strategy facts are recall/understanding).
  - MCQ keys (all MCQs incl. children): a 15, b 14, c 14, d 14.
- **Flashcards:** 27. **Notes:** 7 sections + exam tips.
- **Tests (no shared questions):**
  - Short (20 marks, 40 min): A one गद्यांश (7) · B one काव्यांश (7) · C six 1-mark objective.
  - Long (40 marks, 90 min): A two गद्यांश (14) · B two काव्यांश (14) · C six 1-mark objective · D short "4 में से 3" × 2.
  - `blueprint_id` is null: the hindi-a chapter-test blueprints (`chapter-test-short/long.yaml`) are built for literature chapters (source-based 5, short 2/3, long 6–8 marks); the अपठित pattern (7-mark passage items) cannot fill them. Four passages are left out of both tests (`g_dadi`, `g_millet`, `k_neem`, `k_pagdandi`) for practice.

## Verifier record (author pass, 2026-10-27; no sub-agents per D-024)

Every MCQ, statement item, AR item and passage part was re-answered from its stem and passage before comparing with the key; each short model answer was checked against the passage and the word limit.

- **Keys:** 112/112 objective keys (62 items + 50 children) agreed on re-solve.
- **Fixes made in the pass:**
  - 11 short model answers were 34–38 words for a 25–30 limit; all trimmed to 24–31.
  - `g_millet` passage was 214 words (below the ~250 pattern); a sentence about how the grains were once grown and cooked was added (now 236).
  - Two three-statement items had the same key pattern; `g_bawdi` (ख) was rewritten so the keys differ ((I)+(II), (I)+(III), only (II)).
  - Competency was relabelled honestly (66% → 60% items): three passage parents whose parts are mostly literal comprehension are `understanding`, and an antonym item is `understanding`, not `application`.
  - Four genuinely hard items raised to d4 (three-statement and AR items with a planted trap).
  - Orthography: "क़दम" used consistently (one "कदम" fixed); "गलती" without nukta throughout (matching "गलत").
- **Originality:** all passages and verses are SOYL's; deck examples use separate mini-passages so no key-side sentence appears in served content (answer-leak check in `src/lib.mjs`, danda-aware).

## Validation

- `npm test -w @soyl/content-templates`: 7/7 checks for this chapter.
- `npm run content -- lint --exemplars`: 0 errors, 0 warnings for this unit.
- `npm run content -- verify --authored --board cbse --class 10 --subject hindi-a`: 0 blocking flags.
- Exemplar Hindi validator (handoff 2026-10-26, `passage_origin`/`format`/`author` added to its skip-list because they are contract-v2 enum fields): NO ERRORS, 0 warnings.

## Reviewer checklist (hindi-language, अपठित)

- [ ] Each passage reads as natural Hindi and every child's key is supported by the passage alone.
- [ ] No second option is defensible; "not mentioned" and three-statement items checked option by option.
- [ ] Model answers within 25–30 words (±20%) and use the student's own words, not passage sentences.
- [ ] The 3 MCQ + 2 short split matches the 2026-27 SQP; adjust children if the SQP differs.
- [ ] Orthography: गए/गई, लिए, चाहिए; consistent nukta (ज़रूरत, फ़सल, क़दम); chandrabindu (गाँव, पाँव, साँस).

## Known gaps

- The SQP split of the 7 marks was not re-read for 2026-27 (no network document in the repo); flagged above.
- No audio yet (TTS stage); narration was written for hi-IN and avoids digits and symbols.
