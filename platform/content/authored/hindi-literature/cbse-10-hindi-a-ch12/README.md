# CBSE Class 10 Hindi A, Chapter 12 — एक कहानी यह भी (मन्नू भंडारी)

| | |
|---|---|
| Unit | `cbse-10-hindi-a-ch12` (family `hindi-literature`) |
| Book | NCERT क्षितिज भाग 2, गद्य खंड · an आत्मकथ्य (selected episodes from the author's adolescence in Ajmer, c. 1944–47) |
| Syllabus | `platform/catalog/cbse/10/hindi-a/syllabus.yaml` (2026-27, `source_status: unverified`): t01 लेखक-परिचय और पाठ का प्रसंग · t02 पाठ का सार (incl. पिता और शीला अग्रवाल की भूमिका) · t03 पात्र-चित्रण (लेखिका और पिता के संबंध) · t04 मूल भाव, संदेश और भाषा-शैली · t05 गद्यांश आधारित प्रश्न-अभ्यास |
| Board weight | खंड ग, क्षितिज गद्य 11 marks: पठित गद्यांश 5 × 1 MCQ + "4 में से 3" × 2 marks (25–30 words) |
| Files | `release.json` (1 deck of 22 slides, 7 notes sections, 28 flashcards, 75 questions with 34 passage children), `tests.json` (short 20 / 40 min, long 40 / 80 min), `src/` (build sources; uses `hindi-language/cbse-10-hindi-a-ch01/src/lib.mjs`) |
| Status | `draft` on every item (D-025/D-026 hand-authored content) |
| Author | `claude-opus-5-5 (subject-producer)`, provenance `origin: human`, 2026-10-27 |

Rebuild from `platform/`: `npx tsx content/authored/hindi-literature/cbse-10-hindi-a-ch12/src/build.mjs`.

## The rule: an autobiographical text taught without reproducing it (CONTEXT §8)

This text is long, idiomatic and full of quoted speech (the father's outbursts, a visitor's complaint, a doctor's praise), so the risk is less a famous line than many small sentence frames and idioms. The guard therefore lists idioms and frames as well as phrases.

**What is here**
- SOYL's own summary in eight episodes (पिता के दो रूप → तुलना और हीनता → माँ → मोहल्ला → पिता का ध्यान और बहसें → शीला अग्रवाल → दो घटनाएँ → 1947), plus a time-line (1944, 1945, 1946–47, May and August 1947).
- People and influences, tabulated: father (two faces; progressive yet angry and suspicious; ambition vs लोक-लाज — the अंतर्विरोध), mother (patience; a sacrifice respected but not taken as a model), Sushila (the comparison), शीला अग्रवाल (reading with choice; from listener to participant), the मोहल्ला (belonging; characters for the early stories).
- The two episodes in a start → turn → result → conclusion table.
- **Single words** where a meaning is taught: आत्मकथ्य, भटियारखाना, विषयवार, प्राध्यापिका, अंतर्विरोध, लोक-लाज, हीनता.

**What is not here**
- No sentence, close paraphrase, sentence frame, idiom or distinctive phrase of the text; no spoken line quoted (the father's words at the principal's office, the visitor's complaint and Dr. Ambalal's praise are reported only as events).
- The text's idioms (e.g. the angry father, the lava in the veins, the "whirlwind in the city and in the house") are never used, even in SOYL's own sentences.
- No NCERT exercise questions. Reframes:
  - "लेखिका पर किन-किन व्यक्तियों का प्रभाव" became a match and an evaluation — "पिता या शीला अग्रवाल: किसकी भूमिका अधिक निर्णायक?";
  - "भटियारखाना क्यों कहा" became a fact MCQ, an AR item and an evaluation of the father's view ("क्या प्रतिभा और घरेलू काम में टकराव ज़रूरी है?");
  - "किस घटना पर आँखों-कानों पर विश्वास नहीं हुआ" became the reversal MCQs and a short on how anger turned to pride;
  - "पिता से वैचारिक टकराहट" became "टकराव पीढ़ियों का था या विचारों का?";
  - "स्वाधीनता आंदोलन का परिदृश्य और मन्नू जी की भूमिका" became a 1946 newspaper report (create);
  - "पड़ोस कल्चर पर विचार" became practical steps for one's own society and an agree/disagree long;
  - "लड़कियों की स्थिति आज" was replaced by a sibling-comparison case and a "लोग क्या कहेंगे" short.

**How it is enforced**
1. **`setForbidden([...])` in `src/build.mjs`: 187 entries** — phrases, idioms and frames of the text as the author recalls them, from the opening memory to the last line, plus textbook-introduction and exercise wording. During authoring it caught "यश-कामना" (three places).
2. **N-gram overlap scan** against a scratch copy of the text written from memory, **kept only in the agent's scratchpad, never committed** (trigram and 4-gram scans).
   - First build: 83 shared trigrams (259 occurrences). Echoes rewritten: the father's Indore activities ("समाज-सुधार के कामों से", "विद्यार्थियों को अपने घर रखकर" — exact runs), the kitchen sentence ("रसोई को वे भटियारखाना कहते थे"), "जाने कि देश में क्या हो रहा है", "भाई … पढ़ाई के लिए बाहर चले गए", the early-stories sentence ("आरंभिक कहानियों के पात्र"), "किसी भी घर में", "मध्य प्रदेश के भानपुरा गाँव में", "घर में होने वाली", the visitor's complaint (its "लड़कों के साथ … हड़तालें करवाती" frame), "दो-तीन छात्राओं", "को अगस्त में … खोलना पड़ा", the notice's charge ("भड़काने और … अनुशासन बिगाड़ने के आरोप में"), "आदर्श नहीं बन सका", "अपनी तरह का", "देश की स्थितियों", "केंद्रित हुआ", "कॉलेज से प्रिंसिपल का पत्र", "देश की पुकार", "भरोसा नहीं कर पाती", "स्वभाव की झलक … दिखाई देती है", "से उपजा शक", "भी उतनी ही", "शक्की बना दिया".
   - **After: 9 shared 4-grams, all names and titles ("हिंदी की प्राध्यापिका शीला अग्रवाल", "शीला अग्रवाल से परिचय") or generic grammar ("वे चाहते थे कि")**; remaining trigrams are names, the dictionary's title, or generic phrases ("छात्राओं का प्रवेश", "प्रिंसिपल का पत्र", "चाहते थे कि"). Listed for the reviewer.
3. **The pipeline's literature lint**: 0 findings.

**Board "पठित गद्यांश" pattern.**
- Items `src_*` are six `source-based` SOYL commentary paragraphs (120–146 words) with 5 × 1 MCQs each and `passage_origin: "soyl-commentary"`; two carry an internal-choice `alternatives` part. Each interprets one idea (पिता के दो रूप, तुलना और हीनता, माँ, मोहल्ला, शीला अग्रवाल, दो घटनाएँ और अंतर्विरोध).
- Every stem carries: "(यह अनुच्छेद SOYL द्वारा लिखी गई टिप्पणी है, पाठ का अंश नहीं। मूल पाठ अपनी पाठ्यपुस्तक क्षितिज भाग 2 में पढ़ें।)"
- `case_neha` is a labelled fictional present-day case: a father celebrates his daughter's debate prize, bans her river-cleaning campaign after a relative's taunt, and frames the newspaper photo after the commissioner's praise.

**Textbook pointers** appear on the title slide, the how-to slide, the summary slide, notes sections 1, 3 and 7, the word table and every passage stem.

## Counts

- **Questions: 75 (139 marks) + 34 passage children (+ 2 alternatives).**
  - By type: source-based 6, case-based 1, mcq 30, short 2-mark 16 (25–30 words), long 4-mark 6 (60–80 words), true-false 5, fill-blank 3, match 2, assertion-reason 5 (keys a, c, a, d, b), ordering 1.
  - Difficulty: d1 12 · d2 40 · d3 19 · d4 4.
  - Competency: application or higher on 49% of items and 65% of marks. Higher-order items include: a sibling-comparison case; the father's अंतर्विरोध in a sports case and in a "लोग क्या कहेंगे" short; whether keeping the daughter out of the kitchen was progressive; whether talent and housework must clash; father vs Sheela Agarwal; generational vs ideological conflict; writing about one's family honestly; a 1946 news report; the पड़ोस question for one's own society; inference and title children in every passage.
  - MCQ keys (incl. children): a 16, b 17, c 14, d 17.
  - Model answers: 2-mark 26–30 words; 4-mark 67–77 words.
- **Deck:** 22 slides — title, how-to, author, genre, father's two faces, the comparison, AR check, mother vs father, the मोहल्ला, father's attention and the debates, AR check (kitchen), Sheela Agarwal, ordering check, the two episodes, the अंतर्विरोध, application check, time-line, influences, style, word meanings, summary, exam tips. 13 visuals. Narration max 65 words (mean 53), Devanagari only, no digits or symbols.
- **Notes:** 7 sections + exam tips. **Flashcards:** 28.
- **Tests (no shared questions):**
  - Short (20 marks, 40 min): A one commentary passage (5) · B 5 MCQ · C short "4 में से 3" × 2 · D long "2 में से 1" × 4.
  - Long (40 marks, 80 min): A two passages (10) · B 6 MCQ + 2 assertion-reason · C short "6 में से 5" × 2 · D long "4 में से 3" × 4.
  - `blueprint_id` is `cbse-10-hindi-a-chapter-test-short` / `-long`; the sections match the blueprints slot for slot.

## Verifier record (author pass, 2026-10-27; no sub-agents per D-024)

- **Keys:** 82/82 objective keys agreed on blind re-solve (46 top-level objective items, 34 MCQ children, 2 alternatives). The "not" items (Indore facts; writers not named in the passage) each have exactly one outlier; the birthplace item keeps अजमेर as a distractor because students confuse it with the birthplace, and the key (भानपुरा) is unambiguous.
- **Facts checked:** author (1931, भानपुरा, मंदसौर; Ajmer; M.A. Hindi; Miranda House; works by genre; died 2021); people (father in Indore and Ajmer; the subject-wise English-Hindi dictionary; mother; Sushila two years older, married in 1944 and left for Kolkata; the brothers; Sheela Agarwal, Hindi lecturer met in 1945 in the first college year; Dr. Ambalal); events (the debates at home; the kitchen; the writers she was led to; 1946–47 activism; the principal's letter and the father's reversal; the visitor's complaint and Dr. Ambalal's praise; the May 1947 notice, the barred re-admission and the reopening in August; 15 August 1947).
- **Reproduction fixes:** listed under "How it is enforced" (27 kinds of echo rewritten).
- **Other fixes:** seven 2-mark models of 31–33 words trimmed to 26–30; "भटियारख़ाना" (a nukta variant in an accepted answer) removed so the chapter uses one spelling; four application/evaluation items added and one passage relabelled analysis, so the competency mix is honest at 49%; a fourth check slide added.

## Validation

- `npm test -w @soyl/content-templates`: 7/7 checks for this chapter.
- `npm run content -- lint --exemplars`: 0 errors and 0 warnings for this unit.
- `npm run content -- verify --authored --board cbse --class 10 --subject hindi-a`: 0 blocking flags.
- Exemplar Hindi validator (`--literature`): NO ERRORS, 0 warnings, 0 quoted spans ≥ 8 words.
- N-gram overlap with the text (scratch copy, not committed): 9 shared 4-grams, all names, titles or grammar.

## Reviewer checklist (hindi-literature, prose — आत्मकथ्य)

- [ ] **No reproduction (critical).** With क्षितिज भाग 2 open, check summaries, passages and models for any sentence, frame, idiom or spoken line of the text. Add any find to `setForbidden` and rebuild.
- [ ] The two episodes and the 1947 events are reported as facts, not retold in the text's words.
- [ ] Facts match the textbook's author introduction and the lesson (years 1944, 1945, May/August 1947; Sheela Agarwal's post; Dr. Ambalal).
- [ ] Re-solve every item blind; "not" items have one outlier.
- [ ] Model answers are within word limits (2-mark 25–30, 4-mark 60–80) and the schemes add up.
- [ ] Orthography: one spelling per word across the chapter (भटियारखाना, अंग्रेज़ी, आज़ादी, नाराज़); the build enforces nukta consistency.

## Known gaps

- No reference text of the lesson is in the repo, so the pipeline's originality n-gram check could not run against it. The author's scratch check is recorded above.
- Facts from the author's knowledge, to confirm with the textbook: the author's death year (2021); the exact months of the 1947 college events (May notice, July bar, August reopening — SOYL says only "मई में नोटिस … अगस्त में कक्षाएँ खुलीं").
