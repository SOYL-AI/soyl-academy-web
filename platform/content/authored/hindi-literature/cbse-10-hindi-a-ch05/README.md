# CBSE Class 10 Hindi A, Chapter 5 — आत्मकथ्य (जयशंकर प्रसाद)

| | |
|---|---|
| Unit | `cbse-10-hindi-a-ch05` (family `hindi-literature`) |
| Book | NCERT क्षितिज भाग 2, काव्य खंड · a छायावादी poem in खड़ी बोली, first printed in the 1932 आत्मकथा issue of हंस |
| Syllabus | `platform/catalog/cbse/10/hindi-a/syllabus.yaml` (2026-27, `source_status: unverified`): t01 कवि-परिचय और कविता का प्रसंग · t02 कविता का भावार्थ (incl. कवि के आत्मकथा न लिखने के कारण) · t03 काव्य-सौंदर्य (छायावादी शैली, प्रतीक, बिंब) · t04 काव्यांश आधारित प्रश्न-अभ्यास |
| Board weight | खंड ग, क्षितिज काव्य 11 marks: पठित काव्यांश 5 × 1 MCQ + "4 में से 3" × 2 marks (25–30 words) |
| Files | `release.json` (1 deck of 21 slides, 7 notes sections, 28 flashcards, 73 questions with 34 passage children), `tests.json` (short 20 / 40 min, long 40 / 80 min), `src/` (build sources; uses `hindi-language/cbse-10-hindi-a-ch01/src/lib.mjs`) |
| Status | `draft` on every item (D-025/D-026 hand-authored content) |
| Author | `claude-opus-5-5 (subject-producer)`, provenance `origin: human`, 2026-10-27 |

Rebuild from `platform/`: `npx tsx content/authored/hindi-literature/cbse-10-hindi-a-ch05/src/build.mjs`.

## The rule, strictest case: a modern-Hindi poem taught without quoting it (CONTEXT §8)

This poem is harder to protect than सूरदास or तुलसी: it is in modern खड़ी बोली, so ordinary SOYL Hindi can collide with its word pairs by accident. The guard therefore lists the poem's **content-word pairs**, not only archaic forms, and every shared bigram found by the scan was reviewed by hand.

**What is here**
- The context and facts: हंस (editor प्रेमचंद) planned an आत्मकथा issue; friends asked प्रसाद to write; he disagreed and answered with this poem (1932); "तुम" in the poem is the people asking for his story.
- The poem's ideas, in SOYL's words, in the order of the poem's argument (t02 "पंक्ति-क्रम से भाव" is met at the level of ideas, not lines): opening images; the empty pitcher and its sting; the dilemma of truth (own simplicity mocked or others' deceit exposed); private sweet memories; the patched quilt, silence and the sleeping sorrow.
- **Images described in SOYL's own words as facts**: गुंजार करता भौंरा, झरते सूखे पत्ते, विशाल नीला आकाश, खाली घड़ा, सिली हुई गुदड़ी, रास्ते का भोजन, भोर का लाली उधार माँगना, सोई हुई पीड़ा.
- **Single words** where a meaning or symbol is taught: मधुप, गागर, रीती, प्रवंचना, कपोल, पाथेय, कंथा, सीवन.
- **Devices illustrated with SOYL's own lines**, each labelled "SOYL": पेड़ों ने हाथ हिलाकर विदा किया (मानवीकरण), यादों की नाव पर बैठा मन (रूपक), चंचल चिड़िया चहक उठी (अनुप्रास), पल-पल बदले रंग गगन के (पुनरुक्ति प्रकाश), ओस-सी कोमल बातें (उपमा). The poem's own devices are only described ("पीड़ा का थककर सो रहा होना — मानवीकरण").
- The seven reasons for not writing an autobiography are tabulated, each tied to an image (the board's favourite question for this poem).

**What is not here**
- No line, half-line or **distinctive run of two or more words** of the poem.
- No line-by-line भावार्थ and no rendering of a line's frame (see the fixes below).
- No NCERT exercise questions. Questions on the same points were reframed:
  - "कवि आत्मकथा लिखने से क्यों बचना चाहता है?" became short items on single reasons (the empty pitcher's sting, the dilemma of truth) and an evaluation — "विनम्रता या अपने घावों से बचने का उपाय?";
  - "व्यक्तित्व की झलक" became a reader's claim ("कवि दुख से भागते दिखाई देते हैं") to accept or reject with evidence;
  - "अभी समय भी नहीं — क्यों?" became an MCQ on what the sleeping-sorrow image signals;
  - "स्मृति को पाथेय बनाने का आशय" became an MCQ that starts from a tired traveller's food and asks what plays that role for the poet;
  - the पाठेतर privacy debate became two applications (a singer's interview; how celebrities should face personal questions) and a social-media short;
  - "आत्मकथात्मक शैली में लिखिए" became a diary entry in the poet's voice on the day of the request.

**How it is enforced**
1. **`setForbidden([...])` in `src/build.mjs`: 121 entries.** Every distinctive two-word-or-longer run of the poem as the author recalls it (including content-word pairs such as the pitcher, moonlit-night, tired-traveller and silent-sorrow phrases), and wording from the textbook introduction and exercises. The build fails on any hit; it caught "मुरझाकर गिर" in a solution during authoring.
2. **Bigram overlap scan** against a scratch copy of the poem written from memory, **kept only in the agent's scratchpad, never committed**.
   - First build: 11 shared bigrams (32 occurrences). The real echoes were rewritten: "आते-आते" and "देखकर … जागने पर" (the dream line), "लेती थी" (the dawn line), "खाली करने वाले" (the pitcher line, 5 places), "सोई है" (the last line, 6 places), "क्या तुम" (a direct-speech rendering of the friends' question), "कंथा की", "स्मृति पाथेय", "गागर रीती" (two adjacent words in an alt text), "भी कहते", "रहते हैं".
   - **After: 3 grammatical bigrams remain** — "जीवन की" (noun + postposition, in phrases such as "जीवन की मिठास"), "न हो", "से जीवन". None renders a line; they are listed for the reviewer. (A fourth, "करने वाले", was removed in the verifier pass.)
3. **The pipeline's literature lint**: 0 findings after two stems that quoted SOYL sentences of 9–10 words were rephrased.

**Board "पठित काव्यांश" pattern.**
- Items `src_*` are six `source-based` SOYL commentary paragraphs (111–122 words) with 5 × 1 MCQs each and `passage_origin: "soyl-commentary"`; two carry an internal-choice `alternatives` part. Each interprets one idea (opening images, the pitcher, the dilemma, memories, the quilt, the closing silence).
- Every stem carries: "(यह अनुच्छेद SOYL द्वारा लिखी गई टिप्पणी है, कविता का अंश नहीं। मूल कविता अपनी पाठ्यपुस्तक क्षितिज भाग 2 में पढ़ें।)"
- `case_magazine` is a labelled fictional present-day case: a former national athlete declines a school-magazine life story, and the students write about her work instead.

**Textbook pointers** appear on the title slide, the how-to slide, the summary slide, notes sections 1, 3 and 7, the image and word tables, and every passage stem.

## Counts

- **Questions: 73 (135 marks) + 34 passage children (+ 2 alternatives).**
  - By type: source-based 6, case-based 1, mcq 28, short 2-mark 13 (25–30 words; one creative item without a limit), long 4-mark 6 (60–80 words), true-false 6, fill-blank 4, match 3, assertion-reason 5 (keys a, c, d, a, b), ordering 1.
  - Difficulty: d1 9 · d2 39 · d3 22 · d4 3.
  - Competency: application or higher on 52% of items and 68% of marks (three symbol-identification MCQs were relabelled from analysis to understanding in the verifier pass). Higher-order items include: profile matching and a privacy case for today; humility vs self-protection; accepting or rejecting a reader's claim; a social-media short; a celebrity-interview long; creating a मानवीकरण line and a diary entry; inference and title children in every passage.
  - MCQ keys (incl. children): a 14, b 16, c 16, d 16.
  - Model answers: 2-mark 25–30 words; 4-mark 66–72 words.
- **Deck:** 21 slides — title, how-to, poet, छायावाद, context flow, ordering check, opening images, the pitcher, AR check, a two-column dilemma, memories, quilt-silence-sorrow, the seven reasons, application check, symbols, काव्य-सौंदर्य, an अलंकार table with SOYL lines, device check, word meanings, summary, exam tips. 12 visuals. Narration max 63 words (mean 49), Devanagari only, no digits or symbols.
- **Notes:** 7 sections + exam tips. **Flashcards:** 28.
- **Tests (no shared questions):**
  - Short (20 marks, 40 min): A one commentary passage (5) · B 5 MCQ · C short "4 में से 3" × 2 · D long "2 में से 1" × 4.
  - Long (40 marks, 80 min): A two passages (10) · B 6 MCQ + 2 assertion-reason · C short "6 में से 5" × 2 · D long "4 में से 3" × 4.
  - `blueprint_id` is `cbse-10-hindi-a-chapter-test-short` / `-long`; the sections match the blueprints slot for slot.

## Verifier record (author pass, 2026-10-27; no sub-agents per D-024)

- **Keys:** 83/83 objective keys agreed on blind re-solve (47 top-level objective items, 34 MCQ children, 2 alternatives). Device MCQs: the मानवीकरण items offer no उत्प्रेक्षा or अतिशयोक्ति; the अनुप्रास line ("चंचल चिड़िया चहक उठी") has no comparison; "भोर का लाली उधार माँगना" is never a single-answer device item because it is both मानवीकरण and अतिशयोक्ति (the notes say so).
- **Facts checked:** 1889–1937; वाराणसी; the "सुँघनी साहु" family; schooling cut short and self-study; छायावाद and its four poets; works by genre (कामायनी, आँसू, लहर, झरना, चित्राधार; चंद्रगुप्त, स्कंदगुप्त, ध्रुवस्वामिनी, अजातशत्रु; कंकाल, तितली, इरावती; आँधी, इंद्रजाल, आकाशदीप); हंस, editor प्रेमचंद, the आत्मकथा issue, 1932, the friends' request; the poem's images and their meanings; language and style.
- **Reproduction fixes:** the dream line ("पास आते-आते मुस्कुराकर फिसल गया; जागने पर हाथ खाली") became "हाथ आने से पहले ही छिटककर दूर हो गया"; the dawn line ("अपना रंग लेती थी") became "लाली उधार माँगती"; the pitcher's sting ("घड़ा खाली करने वाले") became "घड़े को रीता करने का दोष"; "सोई है" became "सो रही है"; a direct-speech rendering of the friends' question became reported speech; "छोटा … बड़ी कहानियाँ" (the frame of a line) became "बढ़ा-चढ़ाकर सुनाना"; "मुरझाकर गिरते" (caught by the guard) became "सूखकर झरते".
- **Other fixes:** two 2-mark models of 31–32 words trimmed; two quoted SOYL sentences of 9–10 words rephrased; an interview item about a singer's divorce was made gentler (a family sorrow) for Class 10.

## Validation

- `npm test -w @soyl/content-templates`: 7/7 checks for this chapter.
- `npm run content -- lint --exemplars`: 0 errors and 0 warnings for this unit.
- `npm run content -- verify --authored --board cbse --class 10 --subject hindi-a`: 0 blocking flags.
- Exemplar Hindi validator (`--literature`): NO ERRORS, 0 warnings, 0 quoted spans ≥ 8 words.
- Bigram overlap with the poem (scratch copy, not committed): 3 grammatical bigrams, listed above; 0 content-word pairs.

## Reviewer checklist (hindi-literature, poem)

- [ ] **No reproduction (critical).** With क्षितिज भाग 2 open, scan every string for any distinctive run of two or more words of the poem, and for any sentence that renders a line's frame. The three grammatical bigrams listed above are expected; anything else is a find. Add it to `setForbidden` and rebuild.
- [ ] Image descriptions (भौंरा, पत्ते, आकाश, घड़ा, गुदड़ी, रास्ते का भोजन, भोर, सोई पीड़ा) are facts about the poem, not translations of lines.
- [ ] Facts match the textbook's poet introduction (dates, education, works) and the note on हंस (1932).
- [ ] Re-solve every item blind. Device MCQs have one defensible answer.
- [ ] Model answers are within word limits (2-mark 25–30, 4-mark 60–80) and the schemes add up.
- [ ] Orthography: तत्सम words spelled as in the textbook (प्रवंचना, पाथेय, कंथा); nukta consistent (फ़ारसी).

## Known gaps

- No reference text of the poem is in the repo, so the pipeline's originality n-gram check could not run against it. The author's scratch check is recorded above.
- The textbook's introduction was not re-read; facts are standard and should be checked by a reviewer. Some sources say प्रेमचंद himself asked प्रसाद; the lesson says his friends did, and SOYL follows "मित्रों का आग्रह".
- The छायावाद period (about 1918–1936) is the commonly cited range; it appears only in a table and the notes, not in an item.
