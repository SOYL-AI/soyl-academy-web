# CBSE Class 10 Hindi A, Chapter 3 — पद (सूरदास)

| | |
|---|---|
| Unit | `cbse-10-hindi-a-ch03` (family `hindi-literature`) |
| Book | NCERT क्षितिज भाग 2, काव्य खंड · four पद from the भ्रमरगीत section of सूरसागर |
| Syllabus | `platform/catalog/cbse/10/hindi-a/syllabus.yaml` (2026-27, `source_status: unverified`): t01 कवि-परिचय और कविता का प्रसंग · t02 कविता का भावार्थ · t03 काव्य-सौंदर्य: भाषा, शिल्प और अलंकार · t04 काव्यांश आधारित प्रश्न-अभ्यास |
| Board weight | खंड ग, क्षितिज काव्य 11 marks: पठित काव्यांश 5 × 1 MCQ + "4 में से 3" × 2 marks (25–30 words) |
| Files | `release.json` (1 deck of 22 slides, 7 notes sections, 28 flashcards, 67 questions with 34 passage children), `tests.json` (short 20 / 40 min, long 40 / 90 min), `src/` (build sources; uses `hindi-language/cbse-10-hindi-a-ch01/src/lib.mjs`) |
| Status | `draft` on every item (D-025/D-026 hand-authored content) |
| Author | `claude-opus-5-5 (subject-producer)`, provenance `origin: human`, 2026-10-27 |

Rebuild from `platform/`: `npx tsx content/authored/hindi-literature/cbse-10-hindi-a-ch03/src/build.mjs`.

## The rule, strictest case: a poem taught without quoting it (CONTEXT §8)

**What is here**
- The context and facts:
  - Krishna in Mathura sends Uddhav with the yoga / निर्गुण message;
  - a bee appears and the gopis answer through it;
  - the four पद's central ideas, organised by idea:
    - व्यंग्य on "भाग्यशाली" उद्धव;
    - the broken hope and deepened विरह;
    - हारिल-like अनन्य निष्ठा;
    - राजनीति and राजधर्म.
- The poem's **images, described in modern Hindi as facts**, never translated line by line: कमल का पत्ता, तेल से चुपड़ा घड़ा, गुड़ से चिपकी चींटी, हारिल पक्षी, कड़वी ककड़ी, चकरी.
- **Single words** where a meaning is taught: अपरस, बड़भागी, हारिल, चकरी, मधुकर, व्याधि, मरजादा.
- **Devices illustrated with SOYL's own lines**, each labelled "SOYL": आस-दीप मन-मंदिर में… (रूपक), बरखा-सी बरसीं अँखियाँ (उपमा), मधुर मुरलिया मोहे मन (अनुप्रास), घड़ी-घड़ी, पल-पल… (पुनरुक्ति प्रकाश), धन्य तुम्हारा ज्ञान, सखा… (वक्रोक्ति). Where the पद uses a device, only its image is described ("प्रेम को नदी ही मान लेना — रूपक").

**What is not here**
- No line, half-line or **run of two or more words** of the पद.
- No line-by-line भावार्थ. The syllabus outcome "पंक्ति-क्रम से भाव" is met by idea-ordered भाव per पद, and students are told to read the पद in their textbook.
- No NCERT exercise questions. Questions on the same core points were reframed:
  - "भाग्यवान कहने में व्यंग्य" became "किसी की अलिप्तता को 'सौभाग्य' कहना कब व्यंग्य बन जाता है?";
  - "घी का काम" became "सांत्वना का संदेश दुख क्यों बढ़ा गया — इस विरोधाभास का कारण";
  - "किस-किस से तुलना" became "दोनों उदाहरणों में क्या समान है";
  - "योग किन्हें दें" became a profile-matching MCQ;
  - "राजधर्म क्या है" became applying the criterion to rulers and to a present-day civic case;
  - "भ्रमरगीत की विशेषताएँ" became a stage-production plan.

**How it is enforced**
1. **`setForbidden([...])` in `src/build.mjs`: 103 entries.**
   - Every distinctive two-word-or-longer run of the four पद, as the author recalls them.
   - The Braj comparator "ज्यौं".
   - Wording from the textbook introduction and exercises.
   - In this pass the guard forced the rewrite of "मन चकरी" (from the author's own modern phrase "जिनका मन चकरी की तरह…") in five places.
2. **Bigram overlap scan.**
   - All student-facing strings were checked against a scratch copy of the four पद, written from memory and **kept only in the agent's scratchpad, never committed**.
   - Before the fix there were 4 shared two-word runs:
     - "मन की" — a bullet that rendered the opening of the second पद;
     - "जो प्रजा" — the frame of the last line of the fourth पद;
     - "हारिल की";
     - a coincidental word-list adjacency.
   - All four were rewritten. **After: 0 shared two-word runs.**
3. **The pipeline's literature lint** (quotes of 8+ words, verse-like runs): 0 findings. Stems that quoted SOYL's own long sentences were shortened.

**Board "पठित काव्यांश" pattern.**
- Items `src_*` are six `source-based` SOYL commentary paragraphs (110–130 words) with 5 × 1 MCQs each and `passage_origin: "soyl-commentary"`. Each interprets one idea and is organised by argument, not by the poem's line order.
- Every stem carries: "(यह अनुच्छेद SOYL द्वारा लिखी गई टिप्पणी है, पद का अंश नहीं। मूल पद अपनी पाठ्यपुस्तक क्षितिज भाग 2 में पढ़ें।)"
- `case_hostel` is a labelled fictional present-day case: a friend sends "tips" instead of visiting, and the reply is a sweet उलाहना. It applies the पदों's प्रेम-बनाम-उपदेश idea.

**Textbook pointers** appear on the title slide, the how-to slide, the summary slide, notes sections 1, 3 and 7, the word table, and every passage stem.

## Counts

- **Questions: 67 (130 marks) + 34 passage children.**
  - By type: source-based 6, case-based 1, mcq 23, short 2-mark 14 (25–30 words), long 4-mark 6 (60–80 words), true-false 5, fill-blank 4, match 3 (right column shuffled), assertion-reason 4 (keys c, a, d, b), ordering 1.
  - Difficulty: d1 12 · d2 34 · d3 18 · d4 3.
  - Competency: application or higher on 49% of items and 64% of marks. The higher-order items are:
    - applying राजधर्म to rulers and a civic case;
    - profile-matching for "योग किसके लिए";
    - judging whether the gopis were fair to the messenger;
    - comparing ज्ञान and प्रेम;
    - creating a रूपक line, a stage plan and a letter from the gopis;
    - the relevance of the राजधर्म criterion today;
    - inference and title children in every passage.
  - MCQ keys (incl. children): a 15, b 14, c 14, d 14.
- **Deck:** 22 slides — title, how-to, poet, धारा flow, context flow, cast, ordering check, one slide per पद idea (plus a two-column contrast), 4 checks, the gopis' argument table, काव्य-सौंदर्य, an अलंकार table with SOYL lines, a वक्रोक्ति contrast, word meanings, summary, exam tips. There are 12 visuals. Narration is max 68 words, Devanagari only, with no digits or symbols.
- **Notes:** 7 sections + exam tips. **Flashcards:** 28.
- **Tests (no shared questions):**
  - Short (20 marks, 40 min): A one commentary passage (5) · B 5 MCQ · C short "4 में से 3" × 2 · D long "2 में से 1" × 4.
  - Long (40 marks, 80 min): A two passages (10) · B 6 MCQ + 2 assertion-reason · C short "6 में से 5" × 2 · D long "4 में से 3" × 4.
  - `blueprint_id` is `cbse-10-hindi-a-chapter-test-short` / `-long`. These are the literature-shaped Hindi A blueprints from catalog QA (47a7185, merged in 0dee08c). A scratch slot-for-slot check (types, marks, counts, internal choice, duration, total) confirms the match; the same check passes on the ch10 exemplar.

## Verifier record (author pass, 2026-10-27; no sub-agents per D-024)

- **Keys:** 74/74 objective keys agreed on blind re-solve (40 items and 34 MCQ children, plus 1 alternative). The device MCQs on SOYL lines were checked for a single defensible answer. Example: "आस-दीप मन-मंदिर" has a म-अनुप्रास too, so अनुप्रास is deliberately not among its options, and the key is रूपक.
- **Facts checked:**
  - poet: c. 1478–1583; रुनकता / सीही; वल्लभाचार्य; पुष्टिमार्ग; अष्टछाप; सूरसागर, साहित्य लहरी, सूर सारावली; died at पारसौली;
  - context: Krishna in Mathura; Uddhav's yoga / निर्गुण message; the bee and the name भ्रमरगीत; four पद in the textbook;
  - content of each पद: the images and who they describe; the hope of return; the मर्यादा accusation against Krishna; हारिल; yoga as bitter and a disease; yoga for चंचल minds; Krishna's राजनीति; taking their minds back; राजधर्म;
  - language ब्रजभाषा, rasa वियोग शृंगार, and the devices named for the images (प्रेम-नदी रूपक; चींटी/ककड़ी उपमा; नाम की रट पुनरुक्ति प्रकाश; "भाग्यशाली" वक्रोक्ति).
  - Device labels that guides dispute, such as रूपक vs उपमा for the हारिल image, are not asked.
- **Reproduction fixes:**
  - "जागते-सोते, स्वप्न में, दिन-रात" (a word-for-word rendering of a half-line) became "हर समय, हर अवस्था में";
  - "मन, वचन और कर्म से पकड़ रखा है" (the frame of a line) became "एकमात्र, अटल सहारा";
  - "मन की बात … किससे" (the opening of the second पद) became "अपनी पीड़ा बाँटने वाला कोई नहीं";
  - "सच्चा राजा वही है जो प्रजा…" (the frame of the last line) became "राजा का सच्चा धर्म … प्रजा के हित की रक्षा";
  - "मन चकरी" became "मन किसी चकरी की तरह";
  - the author's own रूपक example "विरह-नदी" became "विरह-सागर", to avoid echoing the पद's प्रेम-नदी compound;
  - two commentary drafts that walked through a पद in line order were rewritten so they open from the पद's conclusion or question and interpret it.
- **Other fixes:** three 2-mark models of 34–37 words were trimmed to 29–31; eight 8–25-word quoted spans in stems, notes and the case passage were shortened or turned into reported speech.

## Validation

- `npm test -w @soyl/content-templates`: 7/7 checks for this chapter.
- `npm run content -- lint --exemplars`: 0 errors and 0 warnings for this unit.
- `npm run content -- verify --authored --board cbse --class 10 --subject hindi-a`: 0 blocking flags.
- Exemplar Hindi validator (`--literature`): NO ERRORS, 0 warnings, 0 quoted spans ≥ 8 words.
- Bigram overlap with the पद (scratch copy, not committed): 0.

## Reviewer checklist (hindi-literature, poem)

- [ ] **No reproduction (critical).** With क्षितिज भाग 2 open, scan every string for any run of two or more words of the four पद. The scratch overlap check used the author's memory of the text; an owner-supplied reference text in `catalog/sources/reference/` would let `content originality` run the n-gram check against the actual textbook. Add any find to `setForbidden` and rebuild.
- [ ] Image descriptions (कमल का पत्ता, तेल से चुपड़ा घड़ा, चींटी, हारिल, ककड़ी, चकरी) are facts about the poem, not translations of lines.
- [ ] Facts match the textbook's poet introduction (dates, places, works).
- [ ] Re-solve every item blind. Device MCQs have one defensible answer.
- [ ] Model answers are within word limits (2-mark 25–30, 4-mark 60–80) and the schemes add up.
- [ ] Orthography: ब्रजभाषा words appear only as single taught words; modern Hindi elsewhere; nukta and chandrabindu consistent.

## Known gaps

- No reference text of the पद is in the repo, so the pipeline's originality n-gram check could not run against it. The author's scratch check is recorded above.
- The textbook's poet introduction was not re-read. Poet facts are standard (dates, places, guru, works) and should be checked by a reviewer.
