# CBSE Class 10 Hindi A, Chapter 16 — साना-साना हाथ जोड़ि (मधु कांकरिया)

| | |
|---|---|
| Unit | `cbse-10-hindi-a-ch16` (family `hindi-literature`) |
| Book | NCERT **कृतिका भाग 2** (पूरक पाठ्यपुस्तक) · a travelogue (यात्रा-वृत्तांत) of a journey in Sikkim |
| Syllabus | `platform/catalog/cbse/10/hindi-a/syllabus.yaml` (2026-27, `source_status: unverified`): t01 लेखक-परिचय और पाठ का प्रसंग · t02 पाठ का सार (incl. सिक्किम का सौंदर्य और पहाड़ी श्रमिकों का कठिन जीवन) · t03 मूल भाव, संदेश और भाषा-शैली · **t04 पर्यावरण-चेतना** · t05 गद्यांश आधारित प्रश्न-अभ्यास (MCQ and 50–60-word answers). Unit "खंड ग: कृतिका भाग 2"; examinable (not in `removed_topics`). No `board_assessed` field. |
| Board weight | खंड ग, कृतिका 8 marks: प्रश्न 11, **three questions, attempt two, 50–60 words, 4 marks each** — every 4-mark long here is 50–60 words. |
| Files | `release.json` (1 deck of 22 slides, 7 notes sections, 28 flashcards, 71 questions with 34 passage children), `tests.json` (short 20 / 40 min, long 40 / 80 min), `src/` (build sources; uses `hindi-language/cbse-10-hindi-a-ch01/src/lib.mjs`) |
| Status | `draft` on every item (D-025/D-026 hand-authored content) |
| Author | `claude-opus-5-5 (subject-producer)`, provenance `origin: human`, 2026-10-27 |

Rebuild from `platform/`: `npx tsx content/authored/hindi-literature/cbse-10-hindi-a-ch16/src/build.mjs`.

## The कृतिका pattern

As in ch15: the chapter tests follow the catalog's literature blueprints (section A keeps a 5-mark SOYL commentary passage), but every 4-mark long is a **50–60-word** answer (models 51–59) marked in four steps (context, the author's feeling or idea, evidence, conclusion and language), there are **8 longs**, and the title slide, notes section 7, exam tips and flashcards teach the 4-mark frame. The syllabus gives this lesson its own topic **t04 पर्यावरण-चेतना**, so it has its own items (four MCQs, a true-false, two assertion-reason, three shorts, two longs, a passage and the case).

**Update, 2026-10-27 (curriculum-architect):** the catalog now has कृतिका chapter-test blueprints for ch15–ch17 (`chapter-test-short-kritika`, `chapter-test-long-kritika`; a chapter override through the blueprint `scope`). They have no passage section; their section C is the board's प्रश्न 11 (three 4-mark questions, attempt two, 50–60 words), once in the short test and twice in the long one. Both tests were re-selected onto them from the bank (no item text changed). Filling both without sharing a question needs nine 4-mark answers, so one was added: `l_children` — पहाड़ी बच्चों के जीवन की शहर के बच्चे से तुलना और सीख (t02, d3, application); its facts are ones the bank already states, it quotes nothing from the text, and the build's `setForbidden` list, leak check and lint pass. Where this note and the paragraph above differ, this note is current.

## Facts about Sikkim: stated only where certain

The brief asked for place names, altitudes and distances to be stated only if certain. So:
- **Named:** गंतोक (with "today usually गंगटोक"), यूमथांग, कवी-लोंग स्टॉक, लायुंग, कटाओ, सेवन सिस्टर्स झरना, कंचनजंगा; the guide जितेन नार्गे.
- **Not stated anywhere:** any distance (e.g. Gangtok–Yumthang), any altitude, the number of white flags, the film shot at कवी-लोंग स्टॉक, the treaty associated with it, the river at लायुंग, the name of the author's companion. The route diagram's caption and the exam tips tell students to take such figures from the textbook, and a common-mistakes line warns against guessing them.
- The route is given as an order only (गंतोक → पताकाओं वाला रास्ता → कवी-लोंग स्टॉक → लायुंग → कटाओ, towards यूमथांग); the ordering item uses only this backbone.

## The rule: prose taught without reproducing it (CONTEXT §8)

**What is here**
- SOYL's own summary in eight short episodes (गंतोक की रात → सुबह और रास्ता → पताकाएँ → धर्म-चक्र → श्रम → झरना → लायुंग और कटाओ → जल और सैनिक).
- Three strands kept together: beauty, labour and faith, and environmental concern; Jiten as a model guide; the contrast technique (beauty followed at once by hardship).
- The title explained (a Nepali prayer's first words, "small hands joined") **without reproducing the rest of the prayer** — its other words are in the guard list.
- **Single words** where a meaning is taught: साना-साना, पताका, सम्मोहित, धर्म-चक्र, जिजीविषा, छावनी, संयम.

**What is not here**
- No sentence, close paraphrase, sentence frame or distinctive phrase of the travelogue. The guide's explanations and the companions' remarks are reported, never quoted.
- The text's best-known line about the stone-breaking women (taking little, giving back much) is **not paraphrased in its own frame**; SOYL states the idea differently ("their labour benefits everyone; a very small share reaches them").
- The water-storage reflection is retold as "a bank in the hills" image, not in the text's winter-storage/summer-thirst sentence.
- No NCERT exercise questions. Reframes:
  - "गंतोक को … का शहर क्यों कहा गया" became "whose effort lies behind Gangtok's beauty?" (a passage child);
  - "श्वेत और रंगीन पताकाएँ — किन अवसरों पर" became a two-column slide, a short and an assertion-reason item where both statements are true but unrelated;
  - "लोंग स्टॉक में चक्र — पूरे भारत की आत्मा एक-सी क्यों" became a passage, a present-day application child and an evaluation long ("do you see such unity yourself? give your own examples");
  - "कुशल गाइड के गुण" became a tour company choosing a guide (MCQ) and a short on how a guide makes a trip meaningful;
  - "आम जनता की आर्थिक प्रगति में भूमिका" became a long on labourers like the road-building women, with an example from the student's own city;
  - "प्रकृति के साथ खिलवाड़ — आपकी भूमिका" became a student-role long and a panchayat-advice MCQ;
  - "प्रदूषण के और दुष्परिणाम" became a short asking for two effects from the student's experience;
  - "कटाओ पर दुकान न होना वरदान" became an opinion short and a long reviewing the claim that Katao should get a market;
  - "जल संचय की व्यवस्था" became a short on why Himalayan snow matters to the plains and an MCQ on the order of the cycle;
  - "फ़ौजियों के प्रति उत्तरदायित्व" became a thank-you message to a soldier;
  - "हिमालय के रूप" became a short travel-blog entry.

**How it is enforced**
1. **`setForbidden([...])` in `src/build.mjs`: 115 entries** — the travelogue's distinctive phrases and sentence frames as the author recalls them (from the opening starlit-Gangtok sentence to the closing images), the rest of the Nepali prayer, the famous "take little, give much" line in several forms, plus textbook-introduction and exercise wording. During authoring it caught "नेपाली युवती से सीखी थी" (five places), "क्यों कहा गया" (an exercise frame), "मातृत्व और श्रम" and "आत्मा की शांति के लिए".
2. **N-gram overlap scan** against a scratch copy of the travelogue and its textbook introduction written from memory, **kept only in the agent's scratchpad, never committed** (trigrams and 4-grams).
   - First build: 116 shared trigrams / 428 occurrences; 30-plus shared 4-grams. Echoes rewritten: the white-flag sentence (the text's "when a Buddhist dies … his soul's peace … flags are hoisted" frame); "आत्मा की शांति" (ten places); "एक कुटिया में घूमता हुआ चक्र"; "पाप-पुण्य की धारणाएँ"; the winter-snow/summer-water sentence (passage, narration, notes, flashcard, an option); "चढ़ाई चढ़कर स्कूल"; "ठंड में पहरा"; "कोई दुकान नहीं है, इसलिए"; "प्रदूषण के कारण" (exercise wording); "टोकरी में उनके बच्चे"; "यहाँ के बच्चे"; "पर उस दिन आसमान … बादलों से ढका था"; "देश की सीमा पर"; "का न होना उसके लिए"; "भारत का स्विट्ज़रलैंड कहा जाता है"; the exercise frame "देखकर लेखिका को पूरे देश …"; and the introduction's "का जन्म सन् … में कोलकाता में हुआ".
   - **After: the remaining 4-grams are the title, book titles (खुले गगन के लाल सितारे, सलाम आख़िरी, पत्ताखोर, सेज पर संस्कृत, बीतते हुए, और अंत में ईशु) and generic phrases ("हमारी रक्षा करते हैं", "पत्थर तोड़ रही थीं", "के बारे में क्या").** Listed for the reviewer.
3. **The pipeline's literature lint**: 0 findings (two quoted SOYL spans of 12–14 words were rephrased without quotation marks).

**Board-style practice passages.**
- Items `src_*` are six `source-based` SOYL commentary paragraphs (116–134 words) with 5 × 1 MCQs each and `passage_origin: "soyl-commentary"`; two (`src_chakra`, `src_katao`) carry an internal-choice `alternatives` part. Each interprets one idea (Gangtok's night and the title, the flags, the prayer wheel, labour, Lachung and Katao, water and soldiers).
- Every stem carries: "(यह अनुच्छेद SOYL द्वारा लिखी गई टिप्पणी है, पाठ का अंश नहीं। मूल पाठ अपनी पाठ्यपुस्तक कृतिका भाग 2 में पढ़ें।)"
- `case_trip` is a labelled fictional present-day case: a Class 10 school trip to a hill village — a homestay host who remembers more snow, tourists littering, a mother working with her baby on her back, a student's diary line, and the class collecting litter.

**Textbook pointers** appear on the title slide, the how-to slide, the route diagram's caption, the summary slide, notes sections 1, 2, 3 and 7, the word table and every passage stem.

## Counts

- **Questions: 71 (140 marks) + 34 passage children (+ 2 alternatives).**
  - By type: source-based 6, case-based 1, mcq 27, short 2-mark 12 (25–30 words), long 4-mark 9 (**50–60 words**; the ninth, `l_children`, added 2026-10-27 for the कृतिका tests), true-false 5, fill-blank 3, match 2, assertion-reason 5 (keys b, a, d, a, c), ordering 1.
  - Difficulty: d1 15 · d2 23 · d3 25 · d4 8.
  - Competency: application or higher on 52% of items and 65% of marks. Higher-order items include: the school-trip case; a panchayat's tourism plan; a mountain-lake decision; a tour company choosing a guide; India's unity in the student's own examples; reviewing the "Katao needs a market" claim; labourers in the student's city; a thank-you message to a soldier; a travel-blog entry.
  - MCQ keys (incl. children and alternatives): a 14, b 16, c 15, d 16.
  - Model answers: 2-mark 25–30 words; 4-mark 51–59 words.
- **Deck:** 22 slides — title (कृतिका pattern), how-to, author, the route, Gangtok's night and the title, white and coloured flags, check, the prayer wheel, the Himalaya's changing faces, labour amid beauty, ordering check, Jiten as guide, Lachung, Katao, AR check, nature's water system, soldiers, style, application check, word meanings, summary, exam tips. 10 visuals. Narration max 65 words (mean 50), Devanagari only, no digits or symbols.
- **Notes:** 7 sections (incl. one on पर्यावरण-चेतना) + exam tips. **Flashcards:** 28.
- **Tests (no shared questions; re-selected 2026-10-27 on the कृतिका blueprints):**
  - Short (20 marks, 40 min): A 6 MCQ · B short "4 में से 3" × 2 · C long "3 में से 2" × 4 (50–60 words; the board's प्रश्न 11).
  - Long (40 marks, 80 min): A 8 MCQ + 4 assertion-reason · B two sets of short "4 में से 3" × 2 · C two sets of long "3 में से 2" × 4 (प्रश्न 11 twice).
  - `blueprint_id` is `cbse-10-hindi-a-chapter-test-short-kritika` / `-long-kritika`; the sections match the blueprints slot for slot. No passage section: the commentary passages and the case stay in the bank as practice.

## Verifier record (author pass, 2026-10-27; no sub-agents per D-024)

- **Keys:** 73/73 objective keys agreed on a re-solve from a key-less printout (27 MCQ, 5 true-false and 5 assertion-reason at top level; 34 MCQ children; 2 alternatives). The library places keys by a fixed rotation, so key letters repeat across chapters; the re-solve checked that exactly one option is defensible in each item. Match, ordering and fill-blank keys were checked by hand.
- **Facts checked (author's knowledge):** author (born 1957, Kolkata; novels and story collections); the Gangtok night and the Nepali prayer taught by a young Nepali woman; Jiten Narge as driver and guide; the journey towards Yumthang; white flags for a Buddhist's death and coloured flags for new beginnings; the prayer wheel at कवी-लोंग स्टॉक and the author's reflection on shared faith; the stone-breaking women with babies on their backs and the children's long climb to school and chores; the Seven Sisters waterfall; little snow at Lachung blamed on pollution by a local youth; Katao, called India's Switzerland, free of shops; nature's water storage; soldiers at the border.
- **Other fixes:** a doubled word created by a rewrite ("लेखिका लेखिका") caught on the re-solve printout; three 2-mark models of 31–32 words and one 61-word long trimmed; one 69-word narration trimmed to 65; a "ख़तरे"/"खतरे" nukta clash fixed.

## Validation

- `npm test -w @soyl/content-templates`: 7/7 checks for this chapter.
- `npm run content -- lint --exemplars`: 0 errors and 0 warnings for this unit.
- `npm run content -- verify --authored --board cbse --class 10`: 0 blocking flags.
- `npm run content -- originality --authored`: 0 errors.
- Exemplar Hindi validator (`--literature`): NO ERRORS, 0 warnings, 0 quoted spans ≥ 8 words.
- N-gram overlap with the travelogue (scratch copy, not committed): remaining 4-grams are titles and generic phrases (above).

## Reviewer checklist (hindi-literature, कृतिका travelogue)

- [ ] **No reproduction (critical).** With कृतिका भाग 2 open, check the summary, passages and models against the text: no sentence, frame or distinctive phrase; the prayer appears only as its title words. The riskiest places are the opening night, the flags, the stone-breaking women and the water-storage reflection. Add any find to `setForbidden` and rebuild.
- [ ] Facts to confirm with the textbook: that कंचनजंगा was hidden by clouds on the first morning (`b_kanchen`); the order of the backbone stops (`b_order`); that the waterfall is called सेवन सिस्टर्स and the author felt cleansed (`b_waterfall`); that a local youth (not the guide) blamed pollution for the reduced snow at लायुंग; the authors' list of works in the introduction.
- [ ] No altitude, distance or count anywhere (search for digits outside the author's birth year and mark labels).
- [ ] Re-solve every item; the "not" items have one outlier.
- [ ] कृतिका answers are 50–60 words and the 4-step schemes add up.

## Known gaps

- No reference text of the lesson is in the repo, so the pipeline's originality n-gram check could not run against it. The author's scratch check is recorded above.
- Left out because not confirmed from memory: distances and altitudes, the number of white flags, the film shot at कवी-लोंग स्टॉक and the treaty there, the river at लायुंग, the tea-garden scene and the dress worn there, the companion's name, the author's degrees.
