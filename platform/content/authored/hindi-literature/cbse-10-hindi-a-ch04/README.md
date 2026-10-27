# CBSE Class 10 Hindi A, Chapter 4 — राम-लक्ष्मण-परशुराम संवाद (तुलसीदास)

| | |
|---|---|
| Unit | `cbse-10-hindi-a-ch04` (family `hindi-literature`) |
| Book | NCERT क्षितिज भाग 2, काव्य खंड · an extract from the बालकांड of रामचरितमानस (चौपाई and दोहा, Awadhi) |
| Syllabus | `platform/catalog/cbse/10/hindi-a/syllabus.yaml` (2026-27, `source_status: unverified`): t01 कवि-परिचय और कविता का प्रसंग · t02 कविता का भावार्थ · t03 काव्य-सौंदर्य: भाषा, शिल्प और अलंकार · t04 काव्यांश आधारित प्रश्न-अभ्यास |
| Board weight | खंड ग, क्षितिज काव्य 11 marks: पठित काव्यांश 5 × 1 MCQ + "4 में से 3" × 2 marks (25–30 words) |
| Files | `release.json` (1 deck of 22 slides, 7 notes sections, 28 flashcards, 76 questions with 34 passage children), `tests.json` (short 20 / 40 min, long 40 / 80 min), `src/` (build sources; uses `hindi-language/cbse-10-hindi-a-ch01/src/lib.mjs`) |
| Status | `draft` on every item (D-025/D-026 hand-authored content) |
| Author | `claude-opus-5-5 (subject-producer)`, provenance `origin: human`, 2026-10-27 |

Rebuild from `platform/`: `npx tsx content/authored/hindi-literature/cbse-10-hindi-a-ch04/src/build.mjs`.

## The rule, strictest case: a poem taught without quoting it (CONTEXT §8)

**What is here**
- The context and facts: the सीता-स्वयंवर in Janak's court; Ram breaks Shiva's bow; Parshuram (भृगुवंशी, Shiva's devotee) arrives in anger; the dialogue; Vishwamitra (कौशिक, son of Gadhi) mediates.
- The dialogue's movement, told in SOYL's words in the order of the episode (t02 "पंक्ति-क्रम से भाव" is met at the level of episodes, not lines):
  - Ram's humble first reply and Parshuram's threat;
  - Lakshman's first jab (the bows he broke as a child; an old bow that broke at a touch);
  - Parshuram's self-praise;
  - Lakshman's images and his family code (no valour against god, Brahmin, devotee or cow);
  - Lakshman's test of a hero (deeds, not boasts);
  - Vishwamitra's plea and his silent laugh (iron sword, not a sugar sweet);
  - the guru-debt jab, the court's disapproval, Ram's signal, and the closing fire-oblation-water image.
- **Images described in modern Hindi as facts**: छोटे धनुष, फूँक से पहाड़, कुम्हड़बतिया and the finger, वज्र जैसे वचन, लोहे की तलवार और गन्ने की मिठाई, अग्नि-आहुति-जल.
- **Single words** where a meaning is taught: धनुही, कोही, कुठार, कुम्हड़बतिया, कुलिस, खाँड़ (both senses), कृसानु, गाधिसूनु.
- **Devices illustrated with SOYL's own lines**, each labelled "SOYL": झरने-सी निर्मल हँसी उसकी (उपमा), लाल आँखें मानो दहकते अंगारे हों (उत्प्रेक्षा), ज्ञान-दीप ने दूर किया मन का अँधियारा (रूपक), नगर-नगर में घूमा जोगी… (पुनरुक्ति प्रकाश), उसकी गर्जना से पर्वत भी हिल गए (अतिशयोक्ति). Where the काव्यांश uses a device, only its image is described ("राम के वचनों को जल के समान बताना — उपमा").

**What is not here**
- No चौपाई, दोहा, half-line or **run of two or more words** of the काव्यांश.
- No line-by-line भावार्थ, and no rendering of a line's frame (see the fixes below).
- No NCERT exercise questions. Questions on the same core points were reframed:
  - "धनुष टूटने पर लक्ष्मण के तर्क" became a single-argument question (the child-bows comparison) and a passage on the old bow;
  - "राम और लक्ष्मण के स्वभाव" became a three-way comparison including Parshuram, and a profile-matching MCQ for today;
  - "परशुराम ने अपने विषय में क्या कहा" became "क्या उन्हें केवल क्रोधी कहना उचित होगा?" (evaluation);
  - "वीर योद्धा की विशेषताएँ" became "लक्ष्मण की वीर-कसौटी पर परशुराम खरे क्यों नहीं उतरते?" and applying the criterion to a present-day case;
  - "साहस और शक्ति के साथ विनम्रता" became "क्रोध का उत्तर व्यंग्य से या विनम्रता से?" with the काव्यांश's outcome as evidence;
  - "संवाद-शैली में लिखिए" became a court reporter's news report.

**How it is enforced**
1. **`setForbidden([...])` in `src/build.mjs`: 190 entries.** Every distinctive two-word-or-longer run of the काव्यांश's चौपाई and दोहे as the author recalls them, a few distinctive Awadhi single forms (संभुधनु, तरजनी, अयमय, ऊखमय, कटुबादी…), and wording from the textbook introduction and exercises. The build fails on any hit.
2. **Bigram overlap scan.** All student-facing strings (release and tests) were checked against a scratch copy of the काव्यांश written from memory, **kept only in the agent's scratchpad, never committed**. Before the fix: 1 shared two-word run ("बार बार", in a notes sentence). **After: 0.** Single-word overlaps are common Hindi words (राम, धनुष, सभा, जल…) and the taught words listed above.
3. **The pipeline's literature lint** (quotes of 8+ words, verse-like runs): 0 findings after fixes.

**Board "पठित काव्यांश" pattern.**
- Items `src_*` are six `source-based` SOYL commentary paragraphs (119–127 words) with 5 × 1 MCQs each and `passage_origin: "soyl-commentary"`; two of them carry an internal-choice `alternatives` part. Each interprets one idea (विनम्रता बनाम क्रोध, छोटे धनुष, आत्म-प्रशंसा और वीर-कसौटी, कुल-मर्यादा, विश्वामित्र, अग्नि-आहुति-जल).
- Every stem carries: "(यह अनुच्छेद SOYL द्वारा लिखी गई टिप्पणी है, काव्यांश का अंश नहीं। मूल काव्यांश अपनी पाठ्यपुस्तक क्षितिज भाग 2 में पढ़ें।)"
- `case_trophy` is a labelled fictional present-day case (a cracked cabinet glass, a proud sports teacher, a sarcastic friend and a calm apology) that applies the three temperaments.

**Textbook pointers** appear on the title slide, the how-to slide, the summary slide, notes sections 1, 3 and 7, the word table, the image table and every passage stem.

## Counts

- **Questions: 76 (139 marks) + 34 passage children (+ 2 alternatives).**
  - By type: source-based 6, case-based 1, mcq 30, short 2-mark 14 (25–30 words; one creative item without a limit), long 4-mark 6 (60–80 words), true-false 6, fill-blank 4, match 3 (right column shuffled), assertion-reason 5 (keys a, c, d, a, b), ordering 1.
  - Difficulty: d1 12 · d2 41 · d3 21 · d4 2.
  - Competency: application or higher on 49% of items and 65% of marks. The higher-order items include: profile matching for Lakshman and Parshuram today; which behaviour is an "आहुति" in a quarrel; applying Lakshman's hero test to Parshuram and to a present-day case; judging Lakshman's sarcasm; evaluating Parshuram beyond anger; anger answered by sarcasm or humility; creating an उत्प्रेक्षा line and a court report; inference and title children in every passage.
  - MCQ keys (incl. children): a 15, b 17, c 15, d 17.
  - Model answers: 2-mark 28–30 words; 4-mark 61–69 words.
- **Deck:** 22 slides — title, how-to, poet, the place of the episode in रामचरितमानस, context flow, cast, ordering check, the first turn, Lakshman's jabs, Parshuram's boast and the hero test, AR check, a two-column (मर्यादा and व्यंग्य), Vishwamitra, the fire-oblation-water image, three temperaments, application check, काव्य-सौंदर्य, an अलंकार table with SOYL lines, device check, word meanings, summary, exam tips. 12 visuals. Narration max 60 words (mean 50), Devanagari only, no digits or symbols.
- **Notes:** 7 sections + exam tips. **Flashcards:** 28.
- **Tests (no shared questions):**
  - Short (20 marks, 40 min): A one commentary passage (5) · B 5 MCQ · C short "4 में से 3" × 2 · D long "2 में से 1" × 4.
  - Long (40 marks, 80 min): A two passages (10) · B 6 MCQ + 2 assertion-reason · C short "6 में से 5" × 2 · D long "4 में से 3" × 4.
  - `blueprint_id` is `cbse-10-hindi-a-chapter-test-short` / `-long`; the sections match the blueprints slot for slot (types, marks, counts, internal choice, duration, total).

## Verifier record (author pass, 2026-10-27; no sub-agents per D-024)

- **Keys:** 85/85 objective keys agreed on blind re-solve (49 top-level objective items, 34 MCQ children, 2 alternatives). Rasa and device MCQs were checked for a single defensible answer: the रौद्र item does not offer वीर, the वीर item does not offer रौद्र; the पुनरुक्ति line ("नगर-नगर… द्वार-द्वार") does not offer अनुप्रास; the उपमा item on the काव्यांश's water image does not offer उत्प्रेक्षा.
- **Facts checked:**
  - poet: c. 1532–1623; राजापुर (बाँदा), alternative view सोरों (एटा); died at काशी; रामभक्ति शाखा; works रामचरितमानस, कवितावली, गीतावली, दोहावली, कृष्णगीतावली, विनयपत्रिका; Awadhi and Braj;
  - context: बालकांड; सीता-स्वयंवर in Janak's court; Shiva's bow; Parshuram as भृगुवंशी son of Jamadagni and Shiva's devotee; Vishwamitra as कौशिक and son of Gadhi;
  - dialogue: Ram's humble reply; the सहस्रबाहु comparison and the threat to the court; the child-bows and old-bow arguments; Parshuram's boast; the फूँक-पहाड़ and कुम्हड़बतिया images; the four Lakshman will not fight; words like thunderbolts; the hero test; Vishwamitra's plea and the iron-sword/sugar image; the guru-debt jab; the court's disapproval; Ram's signal; fire, oblation and water;
  - language Awadhi; चौपाई and दोहा; वीर with रौद्र and a touch of हास्य (as the syllabus outcome names वीर and हास्य); ओज.
- **Reproduction fixes:**
  - "फरसे की ओर देखते हुए" (a rendering of the half-line that opens Parshuram's boast) removed;
  - "हिसाब करने वाले को बुला लें, वे तुरंत चुका देंगे" (a rendering of a full line of the guru-debt jab) became "लक्ष्मण उसे लेन-देन का हिसाब बना देते हैं … चुकाने को तैयार हैं";
  - the list in Parshuram's boast was reordered in the passage, notes, deck and narration so it no longer follows the काव्यांश line by line;
  - "बार-बार" in a notes sentence (a coincidental bigram with the काव्यांश) became "कई बार";
  - early drafts that rendered "सेवक वह है जो सेवा करे", "सारे राजा मारे जाएँगे", "मारना पाप, हारना अपयश" and "साधु बच्चों के दोष-गुण नहीं गिनते" were rewritten as idea-level statements before the first build.
- **Other fixes:** six 2-mark models of 31–33 words trimmed to 28–30; three SOYL quoted spans of 8–9 words (the उत्प्रेक्षा example line and a passage-child stem) shortened below the 8-word review threshold; one AR (key b) and one application MCQ added to balance AR keys and the competency mix.

## Validation

- `npm test -w @soyl/content-templates`: 7/7 checks for this chapter.
- `npm run content -- lint --exemplars`: 0 errors and 0 warnings for this unit.
- `npm run content -- verify --authored --board cbse --class 10 --subject hindi-a`: 0 blocking flags.
- Exemplar Hindi validator (`--literature`): NO ERRORS, 0 warnings, 0 quoted spans ≥ 8 words.
- Bigram overlap with the काव्यांश (scratch copy, not committed): 0.

## Reviewer checklist (hindi-literature, poem)

- [ ] **No reproduction (critical).** With क्षितिज भाग 2 open, scan every string for any run of two or more words of the काव्यांश, and for any sentence that renders a चौपाई or दोहा line by line. The scratch overlap check used the author's memory of the text; an owner-supplied reference text in `catalog/sources/reference/` would let `content originality` run the n-gram check against the actual textbook. Add any find to `setForbidden` and rebuild.
- [ ] Image descriptions (छोटे धनुष, फूँक से पहाड़, कुम्हड़बतिया, वज्र जैसे वचन, लोहे की तलवार और गन्ने की मिठाई, अग्नि-आहुति-जल) are facts about the काव्यांश, not translations of lines.
- [ ] Facts match the textbook's poet introduction (dates, places, works).
- [ ] Re-solve every item blind. Rasa and device MCQs have one defensible answer.
- [ ] Model answers are within word limits (2-mark 25–30, 4-mark 60–80) and the schemes add up.
- [ ] Orthography: Awadhi words appear only as single taught words; modern Hindi elsewhere; nukta and chandrabindu consistent (खाँड़, कुम्हड़बतिया).

## Known gaps

- No reference text of the काव्यांश is in the repo, so the pipeline's originality n-gram check could not run against it. The author's scratch check is recorded above.
- The textbook's poet introduction was not re-read. Poet facts are standard (dates, places, works); the guru नरहरिदास is given as "माना जाता है" in the notes and is not asked in any item.
- Rasa labels: guides differ on whether the extract's main rasa is वीर or रौद्र. The items separate the two (whole dialogue → वीर; Parshuram's speeches → रौद्र) and never offer both in one item.
