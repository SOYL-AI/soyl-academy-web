# CBSE Class 10 Hindi A, Chapter 9 — नेताजी का चश्मा (स्वयं प्रकाश)

| | |
|---|---|
| Unit | `cbse-10-hindi-a-ch09` (family `hindi-literature`) |
| Book | NCERT क्षितिज भाग 2, गद्य खंड · genre: कहानी |
| Syllabus | `platform/catalog/cbse/10/hindi-a/syllabus.yaml` (2026-27, `source_status: unverified`): t01 लेखक-परिचय और पाठ का प्रसंग · t02 पाठ का सार · t03 पात्र-चित्रण · t04 मूल भाव, संदेश और भाषा-शैली · t05 गद्यांश आधारित प्रश्न-अभ्यास |
| Board weight | खंड ग, क्षितिज गद्य 11 marks: पठित गद्यांश 5 × 1 MCQ + "4 में से 3" × 2 marks (25–30 words) |
| Files | `release.json` (1 deck of 21 slides, 7 notes sections, 28 flashcards, 68 questions with 34 passage children), `tests.json` (short 20 / 40 min, long 40 / 90 min), `src/` (build sources; uses `hindi-language/cbse-10-hindi-a-ch01/src/lib.mjs`) |
| Status | `draft` on every item (D-025/D-026 hand-authored content) |
| Author | `claude-opus-5-5 (subject-producer)`, provenance `origin: human`, 2026-10-27 |

Rebuild from `platform/`: `npx tsx content/authored/hindi-literature/cbse-10-hindi-a-ch09/src/build.mjs`.

## The rule: the story is taught without reproducing it (CONTEXT §8)

**What is here**
- Facts and events of the story, retold in SOYL's own words and organised by idea:
  - अधूरी मूर्ति → बदलते चश्मे → कैप्टन की भावना → कैप्टन का जाना → सरकंडे का चश्मा.
  - These are summary stages. No paragraph of the story is walked through image by image.
- Single words for word meanings: कस्बा, प्रतिमा, भूतपूर्व, सरकंडा. The style examples are single words used in the story (कस्बा, ज़िंदगी, जीप, ड्राइवर, फ्रेम).
- Author facts, interpretation, character analysis with incidents, the symbol of the चश्मा, and the message.

**What is not here**
- Any sentence, sentence frame, dialogue or distinctive phrase of the story. That includes:
  - the paanwala's mocking line;
  - Haldar Sahab's lament about a society that laughs at patriots;
  - the physical description of the Captain;
  - the description of the statue;
  - the "reed glasses such as children make" line;
  - Haldar Sahab's emotional line in the final scene.
- NCERT exercise questions. Questions close to the classic exercises were reframed:
  - The "देश-प्रेम in daily life" exercise became an evaluation of the statement "no character fights a war, yet this is a story of patriotism", plus a school-life example linked to the Captain.
  - "सरकंडे का चश्मा क्या उम्मीद जगाता है" became a question about the shift from despair and what it signals.

**How it is enforced**
1. **`setForbidden([...])` in `src/build.mjs`.** This is a list of 75 distinctive phrases and sentence frames of the story, from the author's knowledge of the lesson. The build fails if any SOYL string contains one. In this pass the guard caught and forced rewrites of:
   - "भावुक हैं" (in a narration);
   - "मज़ाक उड़ाया जाना" (in a solution);
   - "वैसा ही फ्रेम" (in three places).
2. **The pipeline's literature lint** (quoted spans of 8+ words go to review; verse-like runs are blocked). There are 0 findings. Stems that quoted SOYL's own long sentences were shortened, so no review warnings remain.
3. **A manual reproduction audit** (verifier record below).

**Board "पठित गद्यांश" pattern.**
- Items `src_*` are six `source-based` SOYL **commentary** paragraphs of 110–130 words, with 5 × 1 MCQs each and `passage_origin: "soyl-commentary"`. Each paragraph interprets an idea: the incomplete statue, Haldar Sahab's eye, the Captain, the paanwala's satire, the turn, and the ending.
- Every stem says: "(यह अनुच्छेद SOYL द्वारा लिखी गई टिप्पणी है, पाठ का अंश नहीं। मूल पाठ अपनी पाठ्यपुस्तक क्षितिज भाग 2 में पढ़ें।)"
- `case_kaka` is a present-day case, labelled fictional, that applies the theme.
- `src_paanwala` part (ङ) carries an `alternatives` choice.

**Textbook pointers** appear on the title slide, the how-to slide, the summary slide, notes sections 1, 2 and 7, and every passage stem.

## Counts

- **Questions: 68 (132 marks) + 34 passage children.**
  - By type: source-based 6, case-based 1, mcq 23, short 2-mark 14 (25–30 words), long 4-mark 6 (60–80 words), true-false 5, assertion-reason 5 (keys b, a, d, c, a), fill-blank 4, match 3 (right column shuffled), ordering 1.
  - Difficulty: d1 14 · d2 31 · d3 20 · d4 3.
  - Competency: application or higher on 47% of items and 61% of marks. The higher-order items are:
    - character judgements (पानवाला — नकारात्मक पात्र?);
    - comparison of two viewpoints on the Captain;
    - an evaluation of the patriotism statement;
    - a decision judgement (Haldar Sahab's "won't stop" resolve);
    - a diary entry as Haldar Sahab (create);
    - a class action plan for a neglected memorial;
    - a behaviour closest to the Captain's;
    - inference and title children in every passage.
  - MCQ keys (incl. children): a 15, b 15, c 13, d 14.
- **Deck:** 21 slides — title, how-to, author table, genre, cast, सार 1–5 by idea, 3 checks, character tables, message, symbol flow, style, word meanings, summary, exam tips. There are 10 visuals (tables and flows). Narration is max 65 words, Devanagari only, with no digits or symbols.
- **Notes:** 7 sections + exam tips. **Flashcards:** 28.
- **Tests (no shared questions):**
  - Short (20 marks, 40 min): A one commentary passage (5) · B 5 MCQ · C short "4 में से 3" × 2 · D long "2 में से 1" × 4.
  - Long (40 marks, 80 min): A two passages (10) · B 6 MCQ + 2 assertion-reason · C short "6 में से 5" × 2 · D long "4 में से 3" × 4.
  - `blueprint_id` is `cbse-10-hindi-a-chapter-test-short` / `-long`. These are the literature-shaped Hindi A blueprints from catalog QA (47a7185, merged in 0dee08c). A scratch slot-for-slot check (types, marks, counts, internal choice, duration, total) confirms the match; the same check passes on the ch10 exemplar.

## Verifier record (author pass, 2026-10-27; no sub-agents per D-024)

- **Keys:** every objective item and passage part was re-answered from its stem and passage. 75/75 objective keys agreed: 41 items (23 MCQ, 5 TF, 4 FB, 3 match, 1 ordering, 5 AR) and 34 MCQ children, plus 1 alternative.
- **Facts checked against the story:**
  - author: born 1947 in Indore; mechanical engineering; Rajasthan; वसुधा; works; died 2019;
  - the नगरपालिका installed a marble statue of Netaji at the chowk, with no stone glasses;
  - Haldar Sahab is guessed to think the school's drawing master made it, and the paanwala blames the sculptor's lapse;
  - Haldar Sahab passes through on company work about every fortnight;
  - the Captain is a poor, old peddler of frames who swaps the frame when a customer wants it;
  - Haldar Sahab assumes he was a soldier, and the paanwala mocks the idea;
  - this goes on for about two years;
  - the paanwala, sad, reports the death;
  - Haldar Sahab resolves not to stop;
  - reed glasses that look like a child's work;
  - Haldar Sahab stands before the statue in respect.
- **Overclaims removed:** "कंपनी के अधिकारी" (the story does not give his post) became "कंपनी के काम से आने-जाने वाले". The money-and-access reasoning behind the sculptor choice was reduced to "a local teacher's work", which avoids re-telling Haldar Sahab's long speculation in order.
- **Echoes removed in the audit:**
  - "बिना किसी चश्मे के / कोई चश्मा नहीं" (close to the story's description of the bare statue);
  - "सचमुच का चश्मा", "विचित्र" (the story's words for the first sighting);
  - "पानवाले द्वारा … मज़ाक उड़ाना" (frame of the story's sentence on Haldar Sahab's hurt);
  - "कस्बे से गुज़रते समय चौराहे पर रुकना … पान … मूर्ति" (the story's habit triplet);
  - "बदलते चश्मे देखते रहे" (frame of the two-years sentence);
  - "वैसा ही फ्रेम" (the paanwala's explanation);
  - "भावुक हैं" (the story's final-scene line).
  - All were added to the guard list.
- **NCERT-exercise overlap removed:** the "सीमा पर…" framing of patriotism (an NCERT exercise prompt) became "युद्ध" wording and a reframed evaluation item; the daily-life patriotism item was replaced with a school-life example tied to the Captain.
- **Other fixes:**
  - one nukta inconsistency (ग़लत → गलत);
  - three 2-mark models of 34 words trimmed to 29–31;
  - five stems that quoted SOYL's own 8–12-word sentences shortened.

## Validation

- `npm test -w @soyl/content-templates`: 7/7 checks for this chapter.
- `npm run content -- lint --exemplars`: 0 errors and 0 warnings for this unit.
- `npm run content -- verify --authored --board cbse --class 10 --subject hindi-a`: 0 blocking flags.
- Exemplar Hindi validator (`--literature`): NO ERRORS, 0 warnings, 0 quoted spans ≥ 8 words.

## Reviewer checklist (hindi-literature)

- [ ] **No reproduction (critical).** With क्षितिज भाग 2 open, scan the deck, narration, notes, flashcards, stems, options, solutions, models and passages for any sentence, frame or distinctive phrase of the story. Add any find to `setForbidden` in `src/build.mjs` and rebuild.
- [ ] Every fact matches the story. Check especially the author's death year (2019) and the awards named in the notes (पहल सम्मान, राजस्थान साहित्य अकादमी पुरस्कार); both are from the author's knowledge and not re-checked against a document in the repo.
- [ ] Re-solve every item blind. Keys are right and no second option is defensible.
- [ ] Model answers are within word limits (2-mark 25–30, 4-mark 60–80) and the schemes add up.
- [ ] Textbook pointers are present; passage stems carry the SOYL-commentary label.
- [ ] Orthography: गए/गई, लिए; nukta consistent (ज़िंदगी, फ़ौज, ज़रूर); chandrabindu (आँखें, पहुँच).

## Known gaps

- No owner-supplied reference text of the story exists in `catalog/sources/reference/`, so the pipeline's n-gram originality check could not run against it. The reproduction review is manual plus the phrase guard.
- The guard list is drawn from memory of the lesson. A reviewer with the textbook should extend it.
