# CBSE Class 10 Hindi A, Chapter 8 — संगतकार (मंगलेश डबराल)

| | |
|---|---|
| Unit | `cbse-10-hindi-a-ch08` (family `hindi-literature`) |
| Book | NCERT क्षितिज भाग 2, काव्य खंड · a free-verse poem in खड़ी बोली on the accompanist (संगतकार) of a classical singer, and through him on every unseen helper |
| Syllabus | `platform/catalog/cbse/10/hindi-a/syllabus.yaml` (2026-27, `source_status: unverified`): t01 कवि-परिचय और कविता का प्रसंग · t02 कविता का भावार्थ (the accompanist's role and his मनुष्यता) · t03 काव्य-सौंदर्य (प्रतीकात्मकता, मुक्त छंद) · t04 काव्यांश आधारित प्रश्न-अभ्यास |
| Board weight | खंड ग, क्षितिज काव्य 11 marks: पठित काव्यांश 5 × 1 MCQ + "4 में से 3" × 2 marks (25–30 words) |
| Files | `release.json` (1 deck of 21 slides, 7 notes sections, 28 flashcards, 73 questions with 34 passage children), `tests.json` (short 20 / 40 min, long 40 / 80 min), `src/` (build sources; uses `hindi-language/cbse-10-hindi-a-ch01/src/lib.mjs` unchanged) |
| Status | `draft` on every item (D-025/D-026 hand-authored content) |
| Author | `claude-opus-5-5 (subject-producer)`, provenance `origin: human`, 2026-10-27 |

Rebuild from `platform/`: `npx tsx content/authored/hindi-literature/cbse-10-hindi-a-ch08/src/build.mjs`.

## The rule, strictest case: a modern free-verse poem taught without quoting it (CONTEXT §8)

This poem is plain modern Hindi with almost no rare words, so the danger is less a famous phrase than **sentence frames**: the list of who the accompanist may be, "since ancient times he has mixed his echo…", "lost in the forest of complex tāns of the antarā", the ash falling from the voice, "to tell him he is not alone and that a sung rāg can be sung again", and the closing judgement. The guard lists the content pairs and these frames; the scan was read for frames, not only pairs. "मुख्य गायक" is the syllabus's own term (t02 outcome) and is used as a term.

**What is here**
- Poet: मंगलेश डबराल's birth (काफलपानी, टिहरी गढ़वाल), education (देहरादून), journalism (दिल्ली → भोपाल, भारत भवन की पूर्वग्रह → जनसत्ता, साहित्य संपादक), collections, the साहित्य अकादमी award for हम जो देखते हैं.
- The music vocabulary the poem relies on, taught as single words: संगतकार, स्थायी, अंतरा, तान, सरगम, तारसप्तक, अनहद, नौसिखिया.
- The poem's ideas, in SOYL's words and by idea (t02 "पंक्ति-क्रम से भाव" met at the level of ideas): the two voices; who the accompanist usually is (reordered and summarised, not the poem's list); an old tradition; the singer lost in tāns or in a boundless ālāp while the accompanist holds the स्थायी (gathering what the singer drops, recalling his learning days); the high-octave crisis and the accompanist's encouragement, company and hope; the hesitation that is not failure but मनुष्यता.
- The symbol extended to film, hospital, sport, science and family; a hockey-team case, a cricket profile, a principal's thank-you notice.
- **Devices illustrated with SOYL's own lines**, labelled "SOYL": तबले-सी गूँजती हँसी (उपमा), सुरों के सागर में डूबा मन (रूपक), थकी बाँसुरी ने रुककर साँस ली (मानवीकरण), घुँघरू की खनक से जागा आँगन (श्रव्य बिंब). The poem's own devices are described ("गायक के सुर की चट्टान से 'जैसे' के साथ तुलना — उपमा").

**What is not here**
- No line, half-line or distinctive run of two or more words of the poem; no line-by-line भावार्थ; no rendering of its sentence frames (see the fixes below).
- No NCERT exercise questions. Reframes:
  - "किस प्रकार के व्यक्तियों की ओर संकेत" became a symbol MCQ and a symbolism short;
  - "संगीत के अलावा किन क्षेत्रों में" became a hockey-team case (short) and a commentary passage on film, hospital, space and family;
  - "किन रूपों में मदद करते हैं" became "भटकने और लड़खड़ाने के क्षणों में क्या करता है" (short) and "संगतकार के बिना गायन अधूरा है — चार तर्क" (long);
  - "हिचक … मनुष्यता — भाव स्पष्ट कीजिए" became "झिझक को मनुष्यता क्यों माना" (short) and a reader's claim that the accompanist is a weak artist (evaluation long);
  - the backstage paragraph became a principal's thank-you notice (create);
  - the absent-accompanist scenario became an accompanist's diary on a concert night (create);
  - "प्रतिभावान होते हुए भी शीर्ष पर क्यों नहीं" became "क्या शीर्ष पर न पहुँचना हार है?" (evaluation short).

**How it is enforced**
1. **`setForbidden([...])` in `src/build.mjs`: 124 entries** — the poem's content pairs and frames as the author recalls them, plus textbook-introduction and exercise wording. During authoring it caught 26 hits, among them "उसकी मनुष्यता" (eight places), "तब संगतकार" (four), "चुका राग" (four), "उसकी आवाज़", "राख जैसा", "संगतकार ही", "पैदल चलकर सीखने", "स्थायी को", "न उठाने" and the exercise frame "बिखरने से बचा".
2. **Bigram overlap scan** against a scratch copy of the poem written from memory, **kept only in the agent's scratchpad, never committed**.
   - First clean build: 52 shared bigrams (515 occurrences) — most of them grammar, because the poem is ordinary prose-like Hindi ("के लिए", "जाता है", "गायक को"). The content echoes and frames rewritten: the poem's three-person list in its order ("अनुज, चेला या … दूर का नातेदार … पैदल") → a reordered summary (शिष्य, कोई पारिवारिक सदस्य, सीखने को आतुर संबंधी) without the walk; "सदियों से … गूँजती आवाज़ में अपनी प्रतिध्वनि घोलता आया" → "सदियों पुरानी परंपरा … परछाईं-सा"; "अंतरे की उलझी तानों में" → "अंतरा गाते हुए तानों की उलझन में"; "झिझक साफ़ सुनाई देती है" → "झिझक झलकती है"; "बुझती आवाज़ से झरती राख-सी चीज़" → "राख-सी बुझती आवाज़"; "प्रेरणा का साथ छोड़ना" → "प्रेरणा का चुक जाना"; the two-clause "एकाकी नहीं … राग दोबारा छेड़ा जा सकता है" → "कोई उसके साथ है; … नए सिरे से साधना संभव"; "कभी-कभी" → "कई बार"; "ऊँचा न" → "ऊपर न"; "(अनहद) में" → a separate note; "का छोटा" (the younger-brother echo) → "पारिवारिक सदस्य".
   - **After: 42 bigrams remain, all grammar or the syllabus term** — noun + postposition with गायक/संगतकार ("गायक को/के/का/की", "संगतकार का"), auxiliaries ("जाता है", "रहता है", "होता है", "देता है", "सकता है", "लगता है", "आता है", "नहीं है"), connectives ("के लिए", "कि वह", "है और", "फिर से", "जब वह", "में वह") and "मुख्य गायक". None renders a line or a frame; the full list is in the scan output summarised here for the reviewer.
3. **The pipeline's literature lint**: 0 findings (an 8-word quoted phrase in a stem was removed); the Hindi validator finds 0 quoted spans of 8 or more words.

**Board "पठित काव्यांश" pattern.**
- Items `src_*` are six `source-based` SOYL commentary paragraphs (102–112 words) with 5 × 1 MCQs and `passage_origin: "soyl-commentary"`; two carry an internal-choice `alternatives` part (`src_do_swar`, `src_hichak`). They interpret the two voices and tradition, the स्थायी, the high-octave crisis, the hesitation, the symbol in life, and the craft.
- Every stem carries: "(यह अनुच्छेद SOYL द्वारा लिखी गई टिप्पणी है, कविता का अंश नहीं। मूल कविता अपनी पाठ्यपुस्तक क्षितिज भाग 2 में पढ़ें।)"
- `case_meera` is a labelled fictional present-day case: at a school function Meera on harmonium repeats the refrain softly when Aarav's voice cracks on a high note, never plays above him, and Aarav shares his prize with her.

**Textbook pointers** appear on the title slide, the how-to slide, the summary slide, notes sections 1, 3 and 7, the voice and word tables, and every passage stem.

## Counts

- **Questions: 73 (135 marks) + 34 passage children (+ 2 alternatives).**
  - By type: source-based 6, case-based 1, mcq 28, short 2-mark 13 (25–30 words; one creative item without a limit), long 4-mark 6 (60–80 words), true-false 6, fill-blank 4, match 3, assertion-reason 5 (keys a, d, c, b, a), ordering 1.
  - Difficulty: d1 10 · d2 37 · d3 24 · d4 2.
  - Competency: application or higher on 59% of items and 73% of marks. Higher-order items include: a cricket profile; "who is not an accompanist"; a hockey-team case; whether not reaching the top is defeat; a weak-artist claim to evaluate; a thank-you notice and an accompanist's diary (create); an attitude long for film, sport and science; the Meera case; inference and title children in every passage.
  - MCQ keys (incl. children): a 14, b 16, c 16, d 16.
  - Model answers: 2-mark 25–30 words; 4-mark 61–72 words.
- **Deck:** 21 slides — title, how-to, poet, poet-journalist time-line, match check, music terms, the two voices, who the accompanist is, the स्थायी, AR check, the high-octave crisis, a two-column hesitation (common view vs poet's view), application check, accompanists in life, the symbol, काव्य-सौंदर्य, an अलंकार table with SOYL lines, device check, word meanings, summary, exam tips. 12 visuals. Narration max 65 words, Devanagari only, no digits or symbols.
- **Notes:** 7 sections + exam tips. **Flashcards:** 28.
- **Tests (no shared questions):**
  - Short (20 marks, 40 min): A one commentary passage (5) · B 5 MCQ · C short "4 में से 3" × 2 · D long "2 में से 1" × 4.
  - Long (40 marks, 80 min): A two passages (10) · B 6 MCQ + 2 assertion-reason · C short "6 में से 5" × 2 · D long "4 में से 3" × 4.
  - `blueprint_id` is `cbse-10-hindi-a-chapter-test-short` / `-long`; the sections match the blueprints slot for slot.

## Verifier record (author pass, 2026-10-27; no sub-agents per D-024)

- **Keys:** 83/83 objective keys agreed on blind re-solve (47 top-level objective items, 34 MCQ children, 2 alternatives). Device items: the poem's rock comparison is asked only as उपमा (it has the वाचक "जैसे"); the "forest of tāns" image is never a single-answer item (guides call it रूपक, some उत्प्रेक्षा) and appears only as a description; the SOYL रूपक line has no वाचक and no alliteration.
- **Facts checked:** 1948–2020; काफलपानी, टिहरी गढ़वाल, उत्तराखंड; देहरादून; दिल्ली → भोपाल (पूर्वग्रह, भारत भवन) → जनसत्ता (साहित्य संपादक); collections पहाड़ पर लालटेन, घर का रास्ता, हम जो देखते हैं, आवाज़ भी एक जगह है; साहित्य अकादमी for हम जो देखते हैं; translator and prose writer. Music terms: three सप्तक (मंद्र, मध्य, तार); स्थायी/अंतरा; तान; अनहद.
- **Fixes:** six items that were too close to the NCERT exercises reframed (see above); eight items added after the first build came to 65 (a पूर्वग्रह fill-blank, a बटोरना MCQ, a श्रव्य बिंब MCQ, a hope true-false, a fifth AR, two shorts on the relationship and the learning-days image, a बिंब short); six model answers brought inside their word limits; an awkward stem left by a guard rewrite rephrased.

## Validation

- `npm test -w @soyl/content-templates`: 7/7 checks for this chapter.
- `npm run content -- lint --exemplars`: 0 errors and 0 warnings for this unit.
- `npm run content -- verify --board cbse --class 10 --authored`: 73/73 pass, 0 blocking flags.
- `npm run content -- originality --authored`: 0 errors (no `bank.duplicate`).
- Exemplar Hindi validator (`--literature`): NO ERRORS, 0 warnings, 0 quoted spans ≥ 8 words.
- Bigram overlap with the poem (scratch copy, not committed): 42 bigrams, all grammar or the syllabus term "मुख्य गायक".

## Reviewer checklist (hindi-literature, poem)

- [ ] **No reproduction (critical).** With क्षितिज भाग 2 open, scan every string for any distinctive run of two or more words of the poem and, above all, for any sentence that follows one of its frames (the list of who the accompanist may be, the "since ancient times" line, the forest of tāns, the ash, "not alone / sung again", the closing judgement). The grammatical bigrams listed above are expected; anything else is a find. Add it to `setForbidden` and rebuild.
- [ ] Image descriptions (two voices, the held स्थायी, gathering what the singer drops, recalling his learning days, the high-octave crisis, company and hope, the hesitation) are facts about the poem, not translations of lines.
- [ ] Facts match the textbook's poet introduction (see "Facts to confirm").
- [ ] Re-solve every item blind. Device MCQs have one defensible answer.
- [ ] Model answers are within word limits (2-mark 25–30, 4-mark 60–80) and the schemes add up.
- [ ] Orthography: संगीत terms as in the textbook (स्थायी, अंतरा, तारसप्तक, अनहद); nukta consistent (आवाज़, ज़रूरत, फ़िल्म, अख़बार).

## Facts to confirm with the textbook (author's knowledge)

- The order of the journalism posts (SOYL gives दिल्ली → भोपाल → जनसत्ता in an ordering item; the textbook also names अमृत प्रभात and later posts, which SOYL leaves out).
- The year of the साहित्य अकादमी award (2000 in general sources) is not stated.
- The death year 2020 is after the textbook was printed; it comes from general knowledge.

## Known gaps

- No reference text of the poem is in the repo, so the pipeline's originality n-gram check could not run against it. The author's scratch check is recorded above.
- The textbook introduction was not re-read; facts are standard and should be checked by a reviewer.
