# CBSE Class 10 Hindi A, Chapter 7 — यह दंतुरित मुसकान; फ़सल (नागार्जुन)

| | |
|---|---|
| Unit | `cbse-10-hindi-a-ch07` (family `hindi-literature`) |
| Book | NCERT क्षितिज भाग 2, काव्य खंड · two poems in खड़ी बोली: यह दंतुरित मुसकान (a long-absent father meets his teething baby) and फ़सल (what a harvest is made of; मुक्त छंद) |
| Syllabus | `platform/catalog/cbse/10/hindi-a/syllabus.yaml` (2026-27, `source_status: unverified`): t01 कवि-परिचय और कविता का प्रसंग · t02 कविता का भावार्थ (the smile's effect; फ़सल as collective labour) · t03 काव्य-सौंदर्य (सरल भाषा, बिंब, लोक-संवेदना) · t04 काव्यांश आधारित प्रश्न-अभ्यास |
| Board weight | खंड ग, क्षितिज काव्य 11 marks: पठित काव्यांश 5 × 1 MCQ + "4 में से 3" × 2 marks (25–30 words) |
| Files | `release.json` (1 deck of 22 slides, 7 notes sections, 28 flashcards, 75 questions with 34 passage children), `tests.json` (short 20 / 40 min, long 40 / 80 min), `src/` (build sources; uses `hindi-language/cbse-10-hindi-a-ch01/src/lib.mjs` unchanged) |
| Status | `draft` on every item (D-025/D-026 hand-authored content) |
| Author | `claude-opus-5-5 (subject-producer)`, provenance `origin: human`, 2026-10-27 |

Rebuild from `platform/`: `npx tsx content/authored/hindi-literature/cbse-10-hindi-a-ch07/src/build.mjs`.

## The rule, strictest case: two modern-Hindi poems taught without quoting them (CONTEXT §8)

Both poems are in plain, modern खड़ी बोली, so ordinary SOYL Hindi collides with them easily (फ़सल is built from common words such as rivers, hands, fields, soil, sun, wind). The guard therefore lists the poems' content-word pairs **and their grammatical frames** (for फ़सल, the repeated counting frame and the "X का Y" phrases). The first poem's **title is a phrase of the poem** ("यह दंतुरित मुसकान"); it is used only as the title and is deliberately not in the guard.

**What is here**
- Poet: नागार्जुन's names (वैद्यनाथ मिश्र; "यात्री" in मैथिली; नागार्जुन after Buddhist दीक्षा in श्रीलंका), schooling (संस्कृत पाठशाला, वाराणसी, कोलकाता), जनकवि identity (घुमक्कड़ी, जनपक्षधरता, व्यंग्य, सरल भाषा), works, the साहित्य अकादमी award for a मैथिली collection.
- The poems' ideas in SOYL's words, by idea (t02 "पंक्ति-क्रम से भाव" met at the level of ideas):
  - यह दंतुरित मुसकान: the smile's life-giving power; the dusty child as lotuses in a hut; a stone melting; the rough poet (bamboo/babool) shedding soft flowers; the first meeting (the unblinking child, the poet offering to look away, patience); the mother as bridge and nurturer; the poet as a long-absent "guest"; the sidelong glance and the meeting of eyes.
  - फ़सल: the question at its heart; water of many rivers; labour of countless hands; soils of many fields; sunlight transformed; the wind's movement held in the ears of grain; nature + human labour.
- **Single words** where a meaning is taught: दंतुरित, गात, जलजात, शेफालिका, अनिमेष, इतर, मधुपर्क, कनखी, कोटि, संदली, रूपांतर.
- **Devices illustrated with SOYL's own lines**, labelled "SOYL": नन्ही हथेली कली-सी कोमल (उपमा), हँसी से सूखी नदी में बाढ़ आई (अतिशयोक्ति), खेत-खेत में सोना बिखरा (पुनरुक्ति प्रकाश), आँगन में धूप-सी बिखरी हँसी (दृश्य बिंब), यह रोटी कहाँ से आई? (प्रश्न-शैली). The poems' own devices are only described.

**What is not here**
- No line, half-line or distinctive run of two or more words of either poem; spoken lines (the poet's questions to the child) are reported, never rendered.
- No NCERT exercise questions. Reframes:
  - "दंतुरित मुसकान का कवि के मन पर प्रभाव" became "कौन-सा बदलाव" (short) and image MCQs;
  - "बच्चे और बड़े की मुसकान में अंतर" became an advertisement-model MCQ and an opinion short ("क्या बड़ों की मुसकान भी वैसा प्रभाव डाल सकती है?");
  - "किन बिंबों से सौंदर्य व्यक्त" became "चार चित्र" (long) and a बिंब short;
  - "कवि के अनुसार फ़सल क्या है / आवश्यक तत्त्व" became a four-sources short, a "not a source" MCQ and an AR item;
  - "स्पर्श की गरिमा कहकर क्या व्यक्त" became "श्रम केवल मेहनत नहीं, गौरव क्यों" (short) and a passage;
  - the soil questions became "मिट्टी अपने गुण खो दे तो" (evaluation short);
  - the meeting "शब्द-चित्र" became a diary entry in the father's voice (create); a food-waste case and a packaged-grain long apply फ़सल to today.

**How it is enforced**
1. **`setForbidden([...])` in `src/build.mjs`: 146 entries** — every distinctive two-word-or-longer run of both poems as the author recalls them, plus textbook-introduction and exercise wording. During authoring it caught 22 hits, e.g. "पहली बार" (a body line), "का जादू" (a slide heading), "झरने लग" (six places — the flowers image), "के फूल", "के स्पर्श" (including inside "उसके स्पर्श"), "नहीं पहचान" (inside "नहीं पहचानता"), "एक की नहीं" (a bullet that echoed फ़सल's counting frame), "खेतों की मिट्टी", and the exercise frame "मन पर क्या प्रभाव".
2. **Bigram overlap scan** against a scratch copy of both poems written from memory, **kept only in the agent's scratchpad, never committed**.
   - First clean build: 22 shared bigrams (164 occurrences). Echoes rewritten: the lotus image's frame ("ताल छोड़कर … कुटिया में खिल" → "कुटिया में कमल खिल उठे"), the first line's frame ("निर्जीव में भी प्राण भर" → "बेजान को भी जीवित कर"), "परिचित हो सके" (the acquaintance line), "थक गया होगा" (a rendering of the poet's question → "थक चुका है"), फ़सल's frames "… की नहीं, अनगिनत की", "नदियों के जल", "हाथों के श्रम", "हवा की" (→ "पवन की"), "खेतों की", "मिट्टी का", "की मिट्टी".
   - **After: 10 bigrams remain** — the two that make up the title ("यह दंतुरित", "दंतुरित मुसकान", only in the title) and grammatical pairs ("है और", "माँ की", "में भी", "क्या है", "कुछ नहीं", "नहीं है", "है वह", "बन गया"). None renders a line.
3. **The pipeline's literature lint**: 0 findings (a 9-word quoted SOYL line was shortened to 7 words); the Hindi validator finds 0 quoted spans of 8 or more words.

**Board "पठित काव्यांश" pattern.**
- Items `src_*` are six `source-based` SOYL commentary paragraphs (102–114 words) with 5 × 1 MCQs and `passage_origin: "soyl-commentary"`; two carry an internal-choice `alternatives` part (`src_jaadu`, `src_shram`). Three interpret यह दंतुरित मुसकान (the smile's effect, the first meeting, the mother), three फ़सल (its sources, labour, sun and wind).
- Every stem carries: "(यह अनुच्छेद SOYL द्वारा लिखी गई टिप्पणी है, कविता का अंश नहीं। मूल कविताएँ अपनी पाठ्यपुस्तक क्षितिज भाग 2 में पढ़ें।)"
- `case_ramesh` is a labelled fictional present-day case: a mill worker returns after a year, his baby hides from him until his wife brings them together, and the next day the whole village harvests wheat together.

**Textbook pointers** appear on the title slide, the how-to slide, the summary slide, notes sections 1, 3, 4 and 7, the image, source and word tables, and every passage stem.

## Counts

- **Questions: 75 (137 marks) + 34 passage children (+ 2 alternatives).**
  - By type: source-based 6, case-based 1, mcq 31, short 2-mark 13 (25–30 words; one creative item without a limit), long 4-mark 6 (60–80 words), true-false 6, fill-blank 3, match 3, assertion-reason 5 (keys a, c, b, d, a), ordering 1.
  - Difficulty: d1 9 · d2 37 · d3 27 · d4 2.
  - Competency: application or higher on 56% of items and 71% of marks. Higher-order items include: an uncle-and-nephew profile; an advertisement smile; a wedding-feast food-waste case; a city student's practice; soil losing its qualities; "only a poem about a baby's beauty?"; a father's diary entry (create); a packaged-grain long; a comparison of the two poems' लोक-संवेदना; inference children in every passage.
  - MCQ keys (incl. children): a 16, b 17, c 15, d 17.
  - Model answers: 2-mark 27–30 words; 4-mark 66–69 words.
- **Deck:** 22 slides — title, how-to, poet, जनकवि, match check (names), the two poems compared, context of the first poem, the smile's images, AR check, a two-column first meeting, the mother as bridge, the absent father's pain, फ़सल's question, its five sources, nature + labour, AR check, काव्य-सौंदर्य, an अलंकार/शिल्प table with SOYL lines, device check, word meanings, summary, exam tips. 12 visuals. Narration max 60 words (mean 48), Devanagari only, no digits or symbols.
- **Notes:** 7 sections + exam tips. **Flashcards:** 28.
- **Tests (no shared questions):**
  - Short (20 marks, 40 min): A one commentary passage (5) · B 5 MCQ · C short "4 में से 3" × 2 · D long "2 में से 1" × 4.
  - Long (40 marks, 80 min): A two passages (10) · B 6 MCQ + 2 assertion-reason · C short "6 में से 5" × 2 · D long "4 में से 3" × 4.
  - `blueprint_id` is `cbse-10-hindi-a-chapter-test-short` / `-long`; the sections match the blueprints slot for slot.

## Verifier record (author pass, 2026-10-27; no sub-agents per D-024)

- **Keys:** 85/85 objective keys agreed on blind re-solve (49 top-level objective items, 34 MCQ children, 2 alternatives). Device items: the उपमा line has a "-सी" वाचक and no alliteration; the अतिशयोक्ति line has no comparison; the पुनरुक्ति item describes फ़सल's reduplicated number words without quoting them. The poem's lotus image is never a single-answer device item (guides call it उपमा, उत्प्रेक्षा or रूपक).
- **Facts checked:** 1911–1998; वैद्यनाथ मिश्र; मिथिला, बिहार; संस्कृत पाठशाला, वाराणसी, कोलकाता; बौद्ध दीक्षा in श्रीलंका and the name नागार्जुन; "यात्री" in मैथिली; works (युगधारा, सतरंगे पंखों वाली, तुमने कहा था, पुरानी जूतियों का कोरस; बलचनमा, रतिनाथ की चाची, बाबा बटेसरनाथ, वरुण के बेटे); साहित्य अकादमी for पत्रहीन नग्न गाछ.
- **Fixes:** four 2-mark models of 31–33 words trimmed; a redundant true-false (मुक्त छंद, already an MCQ) removed; the मधुपर्क gloss rephrased so it does not mirror a textbook glossary list.

## Validation

- `npm test -w @soyl/content-templates`: 7/7 checks for this chapter.
- `npm run content -- lint --exemplars`: 0 errors and 0 warnings for this unit.
- `npm run content -- verify --board cbse --class 10 --authored`: 75/75 pass, 0 blocking flags.
- `npm run content -- originality --authored`: 0 errors (no `bank.duplicate`).
- Exemplar Hindi validator (`--literature`): NO ERRORS, 0 warnings, 0 quoted spans ≥ 8 words.
- Bigram overlap with the poems (scratch copy, not committed): 10 bigrams, all title or grammar, listed above.

## Reviewer checklist (hindi-literature, poem)

- [ ] **No reproduction (critical).** With क्षितिज भाग 2 open, scan every string for any distinctive run of two or more words of either poem, and for any sentence that renders a line's frame (especially फ़सल's counting frame and its "X का Y" phrases). The title and the grammatical bigrams listed above are expected; anything else is a find. Add it to `setForbidden` and rebuild.
- [ ] Image descriptions (life-giving smile, lotuses in a hut, melting stone, bamboo/babool and soft flowers, unblinking child, mother as bridge, poet as guest, sidelong glance; rivers, hands, soils, sunlight, wind) are facts about the poems, not translations of lines.
- [ ] Facts match the textbook's poet introduction (see "Facts to confirm").
- [ ] Re-solve every item blind. Device MCQs have one defensible answer.
- [ ] Model answers are within word limits (2-mark 25–30, 4-mark 60–80) and the schemes add up.
- [ ] Orthography: फ़सल with nukta throughout; तत्सम words as in the textbook (दंतुरित, जलजात, अनिमेष, शेफालिका, मधुपर्क).

## Facts to confirm with the textbook (author's knowledge)

- Birthplace detail: SOYL says only "बिहार का मिथिला अंचल". The textbook may name the village and district (commonly सतलखा, ज़िला दरभंगा or मधुबनी; the ancestral village तरौनी); left out because sources differ.
- The year of the Buddhist दीक्षा in श्रीलंका and of the साहित्य अकादमी award are not given.
- The works list: SOYL names only commonly cited titles; the textbook list may differ.

## Known gaps

- No reference text of the poems is in the repo, so the pipeline's originality n-gram check could not run against them. The author's scratch check is recorded above.
- The textbook introduction was not re-read; facts are standard and should be checked by a reviewer.
