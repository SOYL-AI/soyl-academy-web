# CBSE Class 10 Hindi A, Chapter 13 — नौबतखाने में इबादत (यतींद्र मिश्र)

| | |
|---|---|
| Unit | `cbse-10-hindi-a-ch13` (family `hindi-literature`) |
| Book | NCERT क्षितिज भाग 2, गद्य खंड · a व्यक्ति-चित्र of the shehnai maestro भारतरत्न उस्ताद बिस्मिल्ला खाँ (1916–2006) |
| Syllabus | `platform/catalog/cbse/10/hindi-a/syllabus.yaml` (2026-27, `source_status: unverified`): t01 लेखक-परिचय और पाठ का प्रसंग · t02 पाठ का सार (संगीत-साधना, काशी-प्रेम, सांप्रदायिक सद्भाव) · t03 पात्र-चित्रण · t04 मूल भाव, संदेश और भाषा-शैली · t05 गद्यांश आधारित प्रश्न-अभ्यास |
| Board weight | खंड ग, क्षितिज गद्य 11 marks: पठित गद्यांश 5 × 1 MCQ + "4 में से 3" × 2 marks (25–30 words) |
| Files | `release.json` (1 deck of 22 slides, 7 notes sections, 28 flashcards, 72 questions with 34 passage children), `tests.json` (short 20 / 40 min, long 40 / 80 min), `src/` (build sources; uses `hindi-language/cbse-10-hindi-a-ch01/src/lib.mjs` unchanged) |
| Status | `draft` on every item (D-025/D-026 hand-authored content) |
| Author | `claude-opus-5-5 (subject-producer)`, provenance `origin: human`, 2026-10-27 |

Rebuild from `platform/`: `npx tsx content/authored/hindi-literature/cbse-10-hindi-a-ch13/src/build.mjs`.

## The rule: a prose portrait taught without reproducing it (CONTEXT §8)

The text is long, idiomatic, full of Urdu-Hindi phrasing and of reported speech (Khan Sahab's prayer, his words about Kashi, the disciple's objection and his reply). The risk is less a famous line than sentence frames that carry facts (the reed sentence, the Muharram eighth-day sentence, the Kashi-facing sentence). The guard lists phrases, idioms and frames; the scan was read for frames.

**What is here**
- SOYL's own summary in eight episodes (डुमराँव और रीड → शहनाई का परिचय → रियाज़ और रसूलन-बतूलन → सच्चे सुर की प्रार्थना → मुहर्रम → बचपन की यादें → काशी → सादगी और बदलती काशी), a time-line (c. 1916 → 2006), and a people table (मामा सादिक हुसैन और अलीबख्श, भाई शम्सुद्दीन, रसूलनबाई-बतूलनबाई, कुलसुम).
- Character traits each tied to an episode (विनम्रता, धार्मिक उदारता, सादगी, कृतज्ञता, ज़िंदादिली, काशी- और परंपरा-प्रेम); the message (साधना = उपासना; साझी संस्कृति); style (व्यक्ति-चित्र, हिंदी-उर्दू and music vocabulary, present-tense narration of past episodes, श्रद्धा with light humour).
- **Single words** where a meaning is taught: नौबतखाना, इबादत, रियाज़, रीड, नरकट, सुषिर-वाद्य, शाहेनय, नौहा, सम, आरोह-अवरोह, ड्योढ़ी.
- **Spoken lines are reported only as events**: the prayer ("केवल एक सच्चा, खरा सुर माँगना"), the lungi episode ("सम्मान शहनाई के लिए है, पहनावे के लिए नहीं; चिंता सुर की है" — reported, not in the reply's own frame), the reasons for not leaving Kashi (listed as facts).

**What is not here**
- No sentence, close paraphrase, sentence frame, idiom or distinctive phrase of the text; no quotation of any spoken line.
- No NCERT exercise questions. Reframes:
  - "डुमराँव को क्यों याद किया जाता है" became an AR item and a two-reason short;
  - "मंगलध्वनि का नायक क्यों" and "सुषिर-वाद्य … शाह की उपाधि क्यों" became meaning MCQs (सुषिर-वाद्य, शाहेनय) and a passage child;
  - the two "आशय स्पष्ट कीजिए" items on quoted lines were replaced by reported-event items (the lungi passage; the prayer passage and a विनम्रता MCQ);
  - "काशी के कौन-से परिवर्तन व्यथित करते थे" became "बदलावों पर दुख से उनके बारे में क्या पता चलता है" (short) and a long on one's own town;
  - "मिली-जुली संस्कृति के प्रतीक" became a reader's claim to review (evaluation long);
  - "सच्चे इनसान" became "क्या उन्हें अच्छा इंसान भी कहा जा सकता है" (evaluation short);
  - "संगीत-साधना को समृद्ध करने वाले व्यक्ति/घटनाएँ" became a people-places-episodes long;
  - "मुहर्रम से जुड़ाव" became a passage and a two-point short; a magazine interview (create) and a present-day case (फ़ैज़ान) apply the portrait to today.

**How it is enforced**
1. **`setForbidden([...])` in `src/build.mjs`: 152 entries** — phrases, idioms and frames of the text as the author recalls them (from the opening scene to the closing tribute), plus textbook-introduction and exercise wording. The first build passed the guard; the problems were frames, caught by the scan (below).
2. **N-gram overlap scan** against a scratch copy of the text written from memory, **kept only in the agent's scratchpad, never committed** (trigram and 4-gram scans).
   - First clean build: 23 shared 4-grams (66 occurrences). Frames rewritten: the Kashi-facing sentence ("विश्वनाथ और बालाजी मंदिर की दिशा में मुँह करके बैठते" → "… के मंदिरों की ओर उन्मुख होकर बैठते"); the Muharram rules ("न शहनाई बजाता, न किसी संगीत-कार्यक्रम में …" → "शहनाई और संगीत-सभाओं, दोनों से दूर रहता"); the eighth-day sentence and "उस दिन कोई राग नहीं बजता" (→ "आठवीं तारीख को … शहनाई पर नौहा की धुन छेड़ते … रागों का वादन नहीं होता था"); "पाँच दिनों तक शास्त्रीय और उपशास्त्रीय … सभा"; "गायकों के मन में संगत करने वालों के प्रति आदर"; "बालाजी मंदिर की ड्योढ़ी पर शहनाई बजाते"; "… वर्ष डुमराँव में बिताकर"; the birth-in-a-musical-family frame; the reed sentence ("… से बनती है, जो डुमराँव में सोन नदी के …" → "डुमराँव में सोन के तट पर नरकट नामक घास उगती है; उसी से रीड बनती है"); "के सहारे शहनाई को फूँककर"; "फूँककर बजाए जाने वाले"; "एक महान कलाकार का सरल, मानवीय रूप" (the text's "बड़े कलाकार का सहज मानवीय रूप"); then from the trigram pass "फटी लुंगी में सबसे मिलते", "सुलोचना की कोई नई फ़िल्म", "नमाज़ के बाद", "संगीत-प्रेमी परिवार".
   - **After: 8 shared 4-grams, all names, a date, an award or generic** ("रसूलनबाई और बतूलनबाई के", "सादिक हुसैन और अलीबख्श", "21 अगस्त 2006 को", "संगीत नाटक अकादमी पुरस्कार", "मुहर्रम के दिनों में", "को याद करते हैं", "के लिए बिस्मिल्ला खाँ"); remaining trigrams are names with postpositions ("बिस्मिल्ला खाँ का", "सोन नदी के", "संकटमोचन मंदिर में"), the core concept "सच्चे सुर की" (as "सच्चे सुर की प्रार्थना"), "काशी से बाहर", "रियाज़ के लिए", "नब्बे वर्ष की" and grammar. Listed for the reviewer.
3. **The pipeline's literature lint**: 0 findings; the Hindi validator finds 0 quoted spans of 8 or more words. The build's answer-leak check (D-032) caught one model sentence that repeated a narration sentence; the model was reworded.

**Board "पठित गद्यांश" pattern.**
- Items `src_*` are six `source-based` SOYL commentary paragraphs (107–128 words) with 5 × 1 MCQs and `passage_origin: "soyl-commentary"`; two carry an internal-choice `alternatives` part (`src_dumraon`, `src_muharram`). They interpret डुमराँव और रीड, the path past the singer sisters, the prayer for a true note, Muharram, Kashi, and the lungi episode.
- Every stem carries: "(यह अनुच्छेद SOYL द्वारा लिखी गई टिप्पणी है, पाठ का अंश नहीं। मूल पाठ अपनी पाठ्यपुस्तक क्षितिज भाग 2 में पढ़ें।)"
- `case_faizan` is a labelled fictional present-day case: a 17-year-old flautist goes viral, defers a city offer to keep learning, plays at both Eid and Diwali gatherings, and laughs off a jibe about his old bicycle.

**Textbook pointers** appear on the title slide, the how-to slide, the summary slide, notes sections 1, 3 and 7, the word table and every passage stem.

## Counts

- **Questions: 72 (133 marks) + 34 passage children (+ 2 alternatives).**
  - By type: source-based 6, case-based 1, mcq 29, short 2-mark 12 (25–30 words), long 4-mark 6 (60–80 words), true-false 6, fill-blank 3, match 3, assertion-reason 5 (keys a, c, b, d, a), ordering 1.
  - Difficulty: d1 9 · d2 40 · d3 21 · d4 2.
  - Competency: application or higher on 53% of items and 68% of marks. Higher-order items include: a profile item; a present-day case (फ़ैज़ान); the "साझी संस्कृति के प्रतीक" claim; "अच्छा इंसान भी?"; childhood vs old age; an interview (create); vanishing traditions in one's own town; the present-tense style item; inference and title children in every passage.
  - MCQ keys (incl. children): a 14, b 17, c 16, d 16.
  - Model answers: 2-mark 26–30 words; 4-mark 61–66 words.
- **Deck:** 22 slides — title, how-to, author, genre and title, match check, डुमराँव और शहनाई, शहनाई as a मंगल-वाद्य, रियाज़ and the singer sisters, AR check, the prayer for a true note, Muharram, a two-column of childhood memories, Kashi, application check, the lungi episode, changing Kashi, character table, style, style check, word meanings, summary, exam tips. 11 visuals. Narration max 60 words (mean 47), Devanagari only, no digits or symbols.
- **Notes:** 7 sections + exam tips. **Flashcards:** 28.
- **Tests (no shared questions):**
  - Short (20 marks, 40 min): A one commentary passage (5) · B 5 MCQ · C short "4 में से 3" × 2 · D long "2 में से 1" × 4.
  - Long (40 marks, 80 min): A two passages (10) · B 6 MCQ + 2 assertion-reason · C short "6 में से 5" × 2 · D long "4 में से 3" × 4.
  - `blueprint_id` is `cbse-10-hindi-a-chapter-test-short` / `-long`; the sections match the blueprints slot for slot.

## Verifier record (author pass, 2026-10-27; no sub-agents per D-024)

- **Keys:** 83/83 objective keys agreed on blind re-solve (47 top-level objective items, 34 MCQ children, 2 alternatives). The eighth-day items keep "पैदल चलकर नौहा" and "संकटमोचन की सभा (हनुमान जयंती)" apart, so the AR key (c) is unambiguous.
- **Facts checked against the author's knowledge of the lesson:** अमीरुद्दीन; डुमराँव (बिहार); काशी ननिहाल at five or six; मामा सादिक हुसैन and अलीबख्श; भाई शम्सुद्दीन; रीड from नरकट on the सोन; सुषिर-वाद्य, शाहेनय; मांगलिक use, अवधी लोकगीत and चैती, नागस्वरम्; रियाज़ at fourteen in the बालाजी मंदिर नौबतखाना; रसूलनबाई-बतूलनबाई (ठुमरी, टप्पा, दादरा); the prayer for a true note (about eighty years); Muharram rules and the eighth day (दालमंडी to फातमान, about eight km, नौहा, no rāg); सुलोचना; कुलसुम's kachori; संकटमोचन (हनुमान जयंती, five days); facing विश्वनाथ/बालाजी when away; not leaving Kashi; the lungi episode; the lament over पक्का महाल and the decline of रियाज़ and of respect for accompanists; भारतरत्न, पद्मविभूषण, संगीत नाटक अकादमी, honorary doctorates; death on 21 August 2006 at ninety. Author: 1977, अयोध्या; एम.ए. हिंदी, लखनऊ विश्वविद्यालय; यदा-कदा, अयोध्या तथा अन्य कविताएँ, ड्योढ़ी पर आलाप; गिरिजा.
- **Fixes:** eight items added after the first count (66 → 72 with a fifth AR); five model answers brought inside their word limits; the competency mix left honest (only five application items; analysis items are inference from commentary); the word-match stem made chapter-specific after `content originality` flagged it as the same stem as a ch09 item (`bank.duplicate`).

## Validation

- `npm test -w @soyl/content-templates`: 7/7 checks for this chapter.
- `npm run content -- lint --exemplars`: 0 errors and 0 warnings for this unit.
- `npm run content -- verify --board cbse --class 10 --authored`: 72/72 pass, 0 blocking flags.
- `npm run content -- originality --authored`: 0 errors (no `bank.duplicate`).
- Exemplar Hindi validator (`--literature`): NO ERRORS, 0 warnings, 0 quoted spans ≥ 8 words.
- 4-gram overlap with the text (scratch copy, not committed): 8, all names, a date, an award or generic, listed above.

## Reviewer checklist (hindi-literature, prose)

- [ ] **No reproduction (critical).** With क्षितिज भाग 2 open, scan every string for any sentence, close paraphrase, sentence frame, idiom or distinctive phrase of the text, and check that no spoken line (the prayer, the lungi reply, the words about Kashi) is quoted or rendered in its own frame. The names and generic n-grams listed above are expected; anything else is a find. Add it to `setForbidden` and rebuild.
- [ ] The episodes are in the text's order and every fact matches the text (see "Facts to confirm").
- [ ] Re-solve every item blind.
- [ ] Model answers are within word limits (2-mark 25–30, 4-mark 60–80) and the schemes add up.
- [ ] Orthography: खाँ (no nukta, as in the textbook); nukta consistent (रियाज़, तहज़ीब, फ़िल्म, ज़िंदादिली); spellings of names (शम्सुद्दीन, अलीबख्श, रसूलनबाई, बतूलनबाई, फातमान).

## Facts to confirm with the textbook (author's knowledge)

- The eighth-day route and distance (SOYL: "दालमंडी से फातमान तक लगभग आठ किलोमीटर").
- That family members, not only Khan Sahab, kept away from shehnai and programmes during the ten days.
- The money details of the cinema episode (SOYL says only "छोटी-सी कमाई" and does not give amounts) and the मामू/सम episode (left out).
- The year of the Bharat Ratna (2001 in general sources) is not stated.
- Author details beyond the textbook (the magazine he edits, other books, awards) are left out except गिरिजा.

## Known gaps

- No reference text of the lesson is in the repo, so the pipeline's originality n-gram check could not run against it. The author's scratch check is recorded above.
- The textbook introduction was not re-read; facts are standard and should be checked by a reviewer.
