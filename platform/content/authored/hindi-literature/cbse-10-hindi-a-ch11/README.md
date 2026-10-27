# CBSE Class 10 Hindi A, Chapter 11 — लखनवी अंदाज़ (यशपाल)

| | |
|---|---|
| Unit | `cbse-10-hindi-a-ch11` (family `hindi-literature`) |
| Book | NCERT क्षितिज भाग 2, गद्य खंड · a short, story-like satire (व्यंग्य-प्रधान रचना) |
| Syllabus | `platform/catalog/cbse/10/hindi-a/syllabus.yaml` (2026-27, `source_status: unverified`): t01 लेखक-परिचय और पाठ का प्रसंग · t02 पाठ का सार (incl. नवाब साहब के दिखावे पर व्यंग्य) · t03 पात्र-चित्रण (नवाब साहब की सामंती मनोवृत्ति) · t04 मूल भाव, संदेश और भाषा-शैली · t05 गद्यांश आधारित प्रश्न-अभ्यास |
| Board weight | खंड ग, क्षितिज गद्य 11 marks: पठित गद्यांश 5 × 1 MCQ + "4 में से 3" × 2 marks (25–30 words) |
| Files | `release.json` (1 deck of 21 slides, 7 notes sections, 28 flashcards, 66 questions with 34 passage children), `tests.json` (short 20 / 40 min, long 40 / 80 min), `src/` (build sources; uses `hindi-language/cbse-10-hindi-a-ch01/src/lib.mjs`) |
| Status | `draft` on every item (D-025/D-026 hand-authored content) |
| Author | `claude-opus-5-5 (subject-producer)`, provenance `origin: human`, 2026-10-27 |

Rebuild from `platform/`: `npx tsx content/authored/hindi-literature/cbse-10-hindi-a-ch11/src/build.mjs`.

## The rule: prose taught without reproducing it (CONTEXT §8)

**What is here**
- SOYL's own summary, organised as seven episodes (एकांत की खोज → अप्रसन्नता और अनुमान → पहला निमंत्रण → खीरे का अनुष्ठान → दूसरा इनकार → सूँघो और फेंको → व्यंग्य का मोड़).
- Character studies of the Nawab (सामंती मनोवृत्ति, tabulated against his actions) and of the narrator, including the point most guides miss: the satire also falls on the narrator, whose refusal is pride too ("दो प्रकार का अहं").
- The double target of the satire: नवाबी दिखावा and the claim of some नई कहानी writers that a story needs no events or characters.
- Style: satire, pictorial detail, Urdu-Persian vocabulary, the imaginative narrator.
- **Single words** where a meaning is taught: मुफ़स्सिल, सफ़ेदपोश, किफ़ायत, एहतियात, लज़ीज़, सकील, नफ़ासत, नज़ाकत.

**What is not here**
- No sentence, close paraphrase, sentence frame or distinctive phrase of the text. The Nawab's and the narrator's spoken lines (the invitation, the refusals, the closing remark about the cucumber) are **reported**, never quoted; the closing remark is reported only as "खीरे को पेट पर भारी बताना", not in its "tasty but heavy" frame.
- The preparation scene — the text's most famous paragraph — is given as a compressed list of steps, not retold sentence by sentence.
- No NCERT exercise questions. Reframes:
  - "हाव-भाव से बातचीत में अरुचि" became a single-choice item on the opening behaviour;
  - "खीरा सूँघकर क्यों फेंका, स्वभाव" became "इतनी तैयारी के बाद भी न खाने के पीछे कौन-सा डर?";
  - "बिना विचार, घटना, पात्र के कहानी — सहमत?" became "क्या केवल मनोभाव किसी रचना को कहानी बना सकता है?" (evaluation);
  - "इसे और क्या नाम देंगे" became "शीर्षक किस अर्थ में व्यंग्यपूर्ण है / कितना सार्थक है";
  - "तैयारी का चित्र अपने शब्दों में" became an ordering item, a four-step short and a match;
  - the "सनक" questions were replaced by present-day applications (wedding waste, a café influencer case, a tiffin case).

**How it is enforced**
1. **`setForbidden([...])` in `src/build.mjs`: 124 entries** — the text's distinctive phrases and sentence frames as the author recalls them (from the opening train sentence to the closing realisation), the Nawab's Urdu courtesies, and textbook-introduction and exercise wording. During authoring it caught "नफ़ासत और नज़ाकत" (three places) and "बिना कथ्य के कहानी".
2. **N-gram overlap scan** against a scratch copy of the text written from memory, **kept only in the agent's scratchpad, never committed** (prose: trigram and 4-gram scans, since bigrams are mostly grammar).
   - First build: 35 shared trigrams (173 occurrences). Echoes rewritten: the purpose-of-the-ticket sentence; "खाली समझकर"; "तौलिए पर रखे"; "अकेले यात्रा कर/की"; the narrator's view of the first invitation (its "X के लिए हमें भी … लेना चाहते हैं" frame); the preparation paragraph in order; "जेब से चाकू"; the proud look's "मानो … हों" frame; "थककर लेट"; the Nawab's closing remark; the closing conditional ("गंध से पेट भर सकता है, तो …" — six places); "घटना और पात्रों"; "उत्साह नहीं दिखाया"; "कर चुके थे"; "के सामने खीरा".
   - **After: 5 shared 4-grams, all a character name plus the event ("नवाब साहब ने खीरे की", "खीरे की फाँकों को/की/पर")**; remaining trigrams are generic event phrases ("खिड़की से बाहर", "खीरे की तैयारी", "कर देते हैं"). Listed for the reviewer.
3. **The pipeline's literature lint**: 0 findings after one 14-word quoted stem was rephrased.

**Board "पठित गद्यांश" pattern.**
- Items `src_*` are six `source-based` SOYL commentary paragraphs (99–136 words) with 5 × 1 MCQs each and `passage_origin: "soyl-commentary"`; two carry an internal-choice `alternatives` part. Each interprets one idea (एकांत और अनुमान, दो इनकार, खीरे का अनुष्ठान, सूँघो और फेंको, सामंती मनोवृत्ति, नई कहानी पर व्यंग्य).
- Every stem carries: "(यह अनुच्छेद SOYL द्वारा लिखी गई टिप्पणी है, पाठ का अंश नहीं। मूल पाठ अपनी पाठ्यपुस्तक क्षितिज भाग 2 में पढ़ें।)"
- `case_cafe` is a labelled fictional present-day case: an influencer photographs an expensive dessert, barely tastes it and leaves it; his hungry friend, having refused once, cannot ask.

**Textbook pointers** appear on the title slide, the how-to slide, the summary slide, notes sections 1, 3 and 7, the word table and every passage stem.

## Counts

- **Questions: 66 (127 marks) + 34 passage children (+ 2 alternatives).**
  - By type: source-based 6, case-based 1, mcq 24, short 2-mark 13 (25–30 words), long 4-mark 6 (60–80 words), true-false 5, fill-blank 3, match 2, assertion-reason 5 (keys c, a, d, b, a), ordering 1.
  - Difficulty: d1 9 · d2 31 · d3 22 · d4 4.
  - Competency: application or higher on 53% of items and 64% of marks. Higher-order items include: everyday parallels (wedding waste, tiffin, café); the double satire (Nawab and narrator); whether a mood alone makes a story; whether the title is ironic; the harm of दिखावा today; a diary entry in the Nawab's voice; inference and title children in every passage.
  - MCQ keys (incl. children): a 15, b 14, c 14, d 15.
  - Model answers: 2-mark 25–30 words; 4-mark 71–75 words.
- **Deck:** 21 slides — title, how-to, author, elements, event flow, ordering check, first meeting, invitation and refusals, the ritual, the climax, AR check, two kinds of pride, सामंती मनोवृत्ति, application check, the twist, ending check, style, the title, word meanings, summary, exam tips. 10 visuals. Narration max 65 words (mean 51), Devanagari only, no digits or symbols.
- **Notes:** 7 sections + exam tips. **Flashcards:** 28.
- **Tests (no shared questions):**
  - Short (20 marks, 40 min): A one commentary passage (5) · B 5 MCQ · C short "4 में से 3" × 2 · D long "2 में से 1" × 4.
  - Long (40 marks, 80 min): A two passages (10) · B 6 MCQ + 2 assertion-reason · C short "6 में से 5" × 2 · D long "4 में से 3" × 4.
  - `blueprint_id` is `cbse-10-hindi-a-chapter-test-short` / `-long`; the sections match the blueprints slot for slot.

## Verifier record (author pass, 2026-10-27; no sub-agents per D-024)

- **Keys:** 76/76 objective keys agreed on blind re-solve (40 top-level objective items, 34 MCQ children, 2 alternatives). The "not" items (preparation step not done; trait not सामंती) each have exactly one outlier.
- **Facts checked:** author (1903–1976; फ़िरोज़पुर छावनी; नेशनल कॉलेज लाहौर; भगत सिंह, सुखदेव; jail; works by genre — झूठा सच, दिव्या, दादा कामरेड, मेरी तेरी उसकी बात; ज्ञानदान, तर्क का तूफ़ान, पिंजरे की उड़ान, फूलो का कुर्ता, उत्तराधिकारी, वो दुनिया; सिंहावलोकन); events (short journey, costly higher-class ticket for solitude and a new story, the Nawab and two cucumbers on a towel, his displeasure, the narrator's guesses, two invitations and two refusals with the narrator's excuse, the preparation steps, spices, smelling and throwing every slice, the proud look, lying down, the burp, the remark that cucumber is heavy, the realisation about नई कहानी). Nobody eats the cucumber — the most common student error is flagged in the notes and exam tips.
- **Reproduction fixes:** listed under "How it is enforced" (16 kinds of echo rewritten).
- **Other fixes:** seven 2-mark models of 31–35 words trimmed to 25–30; the "आम आदमी" phrase in an author model was removed (it echoes the textbook introduction); a 88-word passage was extended to 115; a fourth check slide (the ending) was added; competency labels reviewed (symbol and fact items kept at recall/understanding).

## Validation

- `npm test -w @soyl/content-templates`: 7/7 checks for this chapter.
- `npm run content -- lint --exemplars`: 0 errors and 0 warnings for this unit.
- `npm run content -- verify --authored --board cbse --class 10 --subject hindi-a`: 0 blocking flags.
- Exemplar Hindi validator (`--literature`): NO ERRORS, 0 warnings, 0 quoted spans ≥ 8 words.
- N-gram overlap with the text (scratch copy, not committed): 5 shared 4-grams, all name-plus-event phrases.

## Reviewer checklist (hindi-literature, prose)

- [ ] **No reproduction (critical).** With क्षितिज भाग 2 open, check the summary, passages and models against the text: no sentence, sentence frame or distinctive phrase; no spoken line quoted. Add any find to `setForbidden` and rebuild.
- [ ] The preparation steps (list form) and the closing realisation (stated as a comparison) are facts about the text, not retellings.
- [ ] Facts match the textbook's author introduction (dates, places, works).
- [ ] Re-solve every item blind; the "not" items have one outlier.
- [ ] Model answers are within word limits (2-mark 25–30, 4-mark 60–80) and the schemes add up.
- [ ] Orthography: Urdu words with nukta as in the textbook (नज़ाकत, नफ़ासत, लज़ीज़, फ़िरोज़पुर); one spelling per word across the chapter (the build enforces nukta consistency).

## Known gaps

- No reference text of the lesson is in the repo, so the pipeline's originality n-gram check could not run against it. The author's scratch check is recorded above.
- Genre label: the textbook's exercises call the piece a निबंध, guides usually call it a कहानी or व्यंग्य; SOYL calls it "कहानी के ढंग की व्यंग्य-प्रधान रचना" and asks no item on the genre label.
- The textbook's author introduction was not re-read; facts are standard and should be checked by a reviewer.
