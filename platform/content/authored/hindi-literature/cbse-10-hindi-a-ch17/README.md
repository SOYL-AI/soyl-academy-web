# CBSE Class 10 Hindi A, Chapter 17 — मैं क्यों लिखता हूँ? (अज्ञेय)

| | |
|---|---|
| Unit | `cbse-10-hindi-a-ch17` (family `hindi-literature`) |
| Book | NCERT **कृतिका भाग 2** (पूरक पाठ्यपुस्तक) · a personal reflective essay (आत्मपरक निबंध) |
| Syllabus | `platform/catalog/cbse/10/hindi-a/syllabus.yaml` (2026-27, `source_status: unverified`): t01 लेखक-परिचय और पाठ का प्रसंग · t02 पाठ का सार (incl. लेखक की आंतरिक विवशता, अनुभूति और अनुभव का अंतर, हिरोशिमा का प्रसंग) · t03 मूल भाव, संदेश और भाषा-शैली · t04 गद्यांश आधारित प्रश्न-अभ्यास (MCQ and 50–60-word answers). Unit "खंड ग: कृतिका भाग 2"; examinable (not in `removed_topics`). No `board_assessed` field. |
| Board weight | खंड ग, कृतिका 8 marks: प्रश्न 11, **three questions, attempt two, 50–60 words, 4 marks each** — every 4-mark long here is 50–60 words. |
| Files | `release.json` (1 deck of 21 slides, 7 notes sections, 28 flashcards, 69 questions with 34 passage children), `tests.json` (short 20 / 40 min, long 40 / 80 min), `src/` (build sources; uses `hindi-language/cbse-10-hindi-a-ch01/src/lib.mjs`) |
| Status | `draft` on every item (D-025/D-026 hand-authored content) |
| Author | `claude-opus-5-5 (subject-producer)`, provenance `origin: human`, 2026-10-27 |

Rebuild from `platform/`: `npx tsx content/authored/hindi-literature/cbse-10-hindi-a-ch17/src/build.mjs`.

## The कृतिका pattern

As in ch15–ch16: the chapter tests follow the catalog's literature blueprints (section A keeps a 5-mark SOYL commentary passage), but every 4-mark long is a **50–60-word** answer (models 50–59) marked in four steps (idea, the essay's episode, own example or view, conclusion and language); there are **8 longs**; the title slide, notes section 7, exam tips and flashcards teach the 4-mark frame.

**Update, 2026-10-27 (curriculum-architect):** the catalog now has कृतिका chapter-test blueprints for ch15–ch17 (`chapter-test-short-kritika`, `chapter-test-long-kritika`; a chapter override through the blueprint `scope`). They have no passage section; their section C is the board's प्रश्न 11 (three 4-mark questions, attempt two, 50–60 words), once in the short test and twice in the long one. Both tests were re-selected onto them from the bank (no item text changed). Filling both without sharing a question needs nine 4-mark answers, so one was added: `l_unease` — लेखन से भीतर की बेचैनी को पहचानना और मन हल्का होना; डायरी लिखने वाले विद्यार्थी के लिए सीख (t02/t03, d3, application); its facts are ones the bank already states, it quotes nothing from the text, and the build's `setForbidden` list, leak check and lint pass. Where this note and the paragraph above differ, this note is current.

## The rule: an essay taught without reproducing it (CONTEXT §8)

This essay is short and quotable, and its key sentences (the definitions of अनुभव and अनुभूति, the shadow on the stone, the last line about the poem) are exactly what guides reproduce. So:
- **Definitions in SOYL words.** अनुभव = "जो सामने घटा, देखा या झेला"; अनुभूति = "संवेदनशीलता और कल्पना-शक्ति से किसी सच को भीतर इतना महसूस करना कि वह अपना हो जाए". The essay's own definitional sentence and its "घटित" vocabulary are in the guard list.
- **The shadow in SOYL images.** "पत्थर पर किसी मनुष्य की छाया-सी आकृति/छाप"; how it formed is explained as a science fact (the body blocked the rays; the person vanished; the surrounding stone was scorched). The essay's images (the slap, the sun rising and setting inside, history struck dumb, the tragedy written on stone, vapour) are **not used** and are guarded.
- **The author's reflections reported.** His sense of having become a sufferer of the explosion is reported as "मानो वे स्वयं उस पीड़ा को झेलने वाले बन गए हों"; the essay's term "भोक्ता" is taught only as a word meaning.
- **The closing line inverted.** The essay's "true because born of feeling" frame is restated as "उसकी जड़ें भीतर की अनुभूति में हैं, इसलिए वह सच्ची है"; the "good or bad" frame is restated as "गुण-दोष".
- **The poem's place.** Stated as "भारत लौटने के कुछ समय बाद, एक रेल-यात्रा में", never in the essay's "not in Japan but after returning to India, sitting in a train" frame.

**No NCERT exercise questions.** Reframes:
- "प्रत्यक्ष अनुभव की अपेक्षा अनुभूति … अधिक मदद क्यों" became explaining it to a younger brother with an example from one's own life (a long) and an MCQ/short pair on the hospital vs the shadow;
- "लेखक ने स्वयं को विस्फोट का भोक्ता कब और कैसे महसूस किया" became "how does a read-about event become a writer's own pain?" (a short) and a re-solve passage on the shadow;
- "कौन-सी बातें लिखने के लिए प्रेरित करती हैं / प्रेरणा-स्रोत दूसरों को कैसे उत्साहित करें" became "how will you change the way you write your next essay?" (a long) and a best-next-step MCQ;
- "बाह्य दबाव कौन-से / अन्य कलाकारों पर" became a singer's two songs (MCQ and check slide), a short on other artists, and a balanced-view long ("is writing under pressure always weak?");
- "विज्ञान का दुरुपयोग — आपकी भूमिका" became an assembly message ("विज्ञान: वरदान या विनाश") and a two-forms-today short;
- the student-like case: Meher's competition essay vs her poem after a relief camp.

**How it is enforced**
1. **`setForbidden([...])` in `src/build.mjs`: 86 entries** — the essay's distinctive phrases, images and sentence frames as the author recalls them, plus textbook-introduction and exercise wording. During authoring it caught "प्रकाशक के तकाज़े" (notes and an option) and "वाक्यों में बाँध" (a solution).
2. **N-gram overlap scan** against a scratch copy of the essay and its textbook introduction written from memory, **kept only in the agent's scratchpad, never committed** (trigrams and 4-grams).
   - First build: 99 shared trigrams / 315 occurrences. Echoes rewritten: "इसका सच्चा उत्तर लेखक के …" (the opening frame, a five-word run); "समाचार पढ़े और … बाद के प्रभावों" (the news sentence); "कुछ लिखा भी"; "वह अस्पताल भी, जहाँ …" (the hospital frame, in a passage, two slides and a true-false); "प्रत्यक्ष अनुभव भी"; "फिर एक दिन … सड़क पर"; "थोड़ा अलग होकर उसे देखने" (the essay's detachment frame, five places); "कविता अच्छी है या …" (five places); "वह सच्ची है, क्योंकि …" (the closing frame, four places); "जापान में नहीं, भारत लौटकर" (six places); "हिरोशिमा पर कविता" (now "हिरोशिमा नाम की कविता"); "किसी/कुछ हद तक सहायक"; "कृतिकार के लिए"; "अनुभव और अनुभूति में अंतर है"; and the introduction's "उत्तर प्रदेश के कुशीनगर …", "क्रांतिकारी आंदोलन से जुड़े और जेल भी गए".
   - **After: the remaining 4-grams are the title and book titles (कितनी नावों में कितनी बार, हरी घास पर क्षण भर, बावरा अहेरी, शेखर: एक जीवनी, नदी के द्वीप, अपने-अपने अजनबी, अरे यायावर रहेगा याद, एक बूँद सहसा उछली, आँगन के पार द्वार), the author's full name, and one generic question stem ("अनुभव और अनुभूति में क्या अंतर है?").** Listed for the reviewer.
3. **The pipeline's literature lint**: 0 findings (two quoted SOYL spans of 8 and 17 words were rephrased).

**Board-style practice passages.**
- Items `src_*` are six `source-based` SOYL commentary paragraphs (111–126 words) with 5 × 1 MCQs each and `passage_origin: "soyl-commentary"`; two (`src_dabav`, `src_chhaya`) carry an internal-choice `alternatives` part. Each interprets one idea (the question and the first answer; outer pressure vs inner compulsion; अनुभव vs अनुभूति; knowledge and the hospital; the shadow; the poem and the warning about science).
- Every stem carries: "(यह अनुच्छेद SOYL द्वारा लिखी गई टिप्पणी है, निबंध का अंश नहीं। मूल पाठ अपनी पाठ्यपुस्तक कृतिका भाग 2 में पढ़ें।)"
- `case_meher` is a labelled fictional present-day case: a competition essay written on request from internet figures, then a poem written unprompted after seeing a soaked school bag at a flood-relief camp.

**Textbook pointers** appear on the title slide, the how-to slide, the summary slide, notes sections 1, 3 and 7, the word table and every passage stem.

## Counts

- **Questions: 69 (138 marks) + 34 passage children (+ 2 alternatives).**
  - By type: source-based 6, case-based 1, mcq 25, short 2-mark 12 (25–30 words), long 4-mark 9 (**50–60 words**; the ninth, `l_unease`, added 2026-10-27 for the कृतिका tests), true-false 5, fill-blank 3, match 2, assertion-reason 5 (keys c, a, a, d, b), ordering 1.
  - Difficulty: d1 9 · d2 26 · d3 28 · d4 6.
  - Competency: application or higher on 51% of items and 66% of marks. Higher-order items include: Meher's case; a singer's two songs; a student's inner-compulsion essay; misuse of science today (MCQ, short, assembly message); explaining अनुभूति to a younger brother; "is writing under pressure always weak?"; changing one's own way of writing; the author's personality; a diary entry after the shadow (in SOYL images); the title's question form.
  - MCQ keys (incl. children and alternatives): a 14, b 14, c 15, d 16.
  - Model answers: 2-mark 27–30 words; 4-mark 50–59 words.
- **Deck:** 21 slides — title (कृतिका pattern), how-to, author, the question, two kinds of reasons, check (which is not outer pressure), अनुभव and अनुभूति, Hiroshima from knowledge to poem, the hospital, AR check, the shadow, how the shadow formed, bearing the tragedy, ordering check, the poem, science: boon or ruin, style, application check, word meanings, summary, exam tips. 9 visuals. Narration max 62 words (mean 50), Devanagari only, no digits or symbols.
- **Notes:** 7 sections (incl. a table of the four key terms) + exam tips. **Flashcards:** 28.
- **Tests (no shared questions; re-selected 2026-10-27 on the कृतिका blueprints):**
  - Short (20 marks, 40 min): A 6 MCQ · B short "4 में से 3" × 2 · C long "3 में से 2" × 4 (50–60 words; the board's प्रश्न 11).
  - Long (40 marks, 80 min): A 8 MCQ + 4 assertion-reason · B two sets of short "4 में से 3" × 2 · C two sets of long "3 में से 2" × 4 (प्रश्न 11 twice).
  - `blueprint_id` is `cbse-10-hindi-a-chapter-test-short-kritika` / `-long-kritika`; the sections match the blueprints slot for slot. No passage section: the commentary passages and the case stay in the bank as practice.

## Verifier record (author pass, 2026-10-27; no sub-agents per D-024)

- **Keys:** 71/71 objective keys agreed on a re-solve from a key-less printout (25 MCQ, 5 true-false and 5 assertion-reason at top level; 34 MCQ children; 2 alternatives). The library places keys by a fixed rotation, so key letters repeat across chapters; the re-solve checked that exactly one option is defensible in each item (truncated options were printed in full). Match, ordering and fill-blank keys were checked by hand.
- **Facts checked (author's knowledge):** author (सच्चिदानंद हीरानंद वात्स्यायन; 1911–1987; कुशीनगर/कसया; jail for revolutionary activity; तार सप्तक 1943 and प्रयोगवाद; works by genre; ज्ञानपीठ for कितनी नावों में कितनी बार); the essay's order (the question → the first answer → outer pressures → अनुभव/अनुभूति → science-student knowledge and news → the Hiroshima hospital → the shadow on the stone → the poem written after returning to India, on a train → the poem's truth over its quality).
- **Other fixes:** a passage child option was updated after its passage was rewritten (the hospital sentence); four 2-mark models of 31–33 words trimmed; a "ग़लत"/"गलत" nukta clash fixed (the library's assertion-reason options use "गलत"); an answer-leak sentence shared between a long model and a slide narration rewritten.

## Validation

- `npm test -w @soyl/content-templates`: 7/7 checks for this chapter.
- `npm run content -- lint --exemplars`: 0 errors and 0 warnings for this unit.
- `npm run content -- verify --authored --board cbse --class 10`: 0 blocking flags.
- `npm run content -- originality --authored`: 0 errors.
- Exemplar Hindi validator (`--literature`): NO ERRORS, 0 warnings, 0 quoted spans ≥ 8 words.
- N-gram overlap with the essay (scratch copy, not committed): remaining 4-grams are titles, the author's name and one generic stem.

## Reviewer checklist (hindi-literature, कृतिका essay)

- [ ] **No reproduction (critical).** With कृतिका भाग 2 open, check the summary, passages and models against the essay: no sentence, frame or image of the essay; the definitions are SOYL's; the shadow scene uses SOYL images. Add any find to `setForbidden` and rebuild.
- [ ] Facts to confirm with the textbook: the order of ideas in `b_order`; that external pressures are said to help overcome laziness (`src_dabav` child b, `b_short_external`); that the poem was written after returning to India, on a train; the author's birthplace as given in the introduction; ज्ञानपीठ for कितनी नावों में कितनी बार; the year of तार सप्तक (1943).
- [ ] Re-solve every item; the "not" items have one outlier.
- [ ] कृतिका answers are 50–60 words and the 4-step schemes add up.

## Known gaps

- No reference text of the essay is in the repo, so the pipeline's originality n-gram check could not run against it. The author's scratch check is recorded above.
- Left out because not confirmed from memory: the essay's wartime example on India's eastern border (recalled but not certain enough to teach), the alarm-clock comparison for outer pressure, the cities of the author's childhood and education, the journals he edited, and the year of his ज्ञानपीठ award.
