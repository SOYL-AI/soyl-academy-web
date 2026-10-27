# CBSE Class 10 Hindi A, Chapter 6 — उत्साह; अट नहीं रही है (सूर्यकांत त्रिपाठी 'निराला')

| | |
|---|---|
| Unit | `cbse-10-hindi-a-ch06` (family `hindi-literature`) |
| Book | NCERT क्षितिज भाग 2, काव्य खंड · two short, singable poems in खड़ी बोली: उत्साह (an आह्वान-गीत to the cloud) and अट नहीं रही है (फागुन's overflowing beauty) |
| Syllabus | `platform/catalog/cbse/10/hindi-a/syllabus.yaml` (2026-27, `source_status: unverified`): t01 कवि-परिचय और कविता का प्रसंग · t02 कविता का भावार्थ (बादल as क्रांति, फागुन's beauty) · t03 काव्य-सौंदर्य (मानवीकरण, आह्वान-शैली, प्रकृति-चित्रण) · t04 काव्यांश आधारित प्रश्न-अभ्यास |
| Board weight | खंड ग, क्षितिज काव्य 11 marks: पठित काव्यांश 5 × 1 MCQ + "4 में से 3" × 2 marks (25–30 words) |
| Files | `release.json` (1 deck of 21 slides, 7 notes sections, 28 flashcards, 74 questions with 34 passage children), `tests.json` (short 20 / 40 min, long 40 / 80 min), `src/` (build sources; uses `hindi-language/cbse-10-hindi-a-ch01/src/lib.mjs` unchanged) |
| Status | `draft` on every item (D-025/D-026 hand-authored content) |
| Author | `claude-opus-5-5 (subject-producer)`, provenance `origin: human`, 2026-10-27 |

Rebuild from `platform/`: `npx tsx content/authored/hindi-literature/cbse-10-hindi-a-ch06/src/build.mjs`.

## The rule, strictest case: two modern-Hindi poems taught without quoting them (CONTEXT §8)

Both poems are short and in modern खड़ी बोली, and almost every word pair in them is distinctive. The guard therefore lists the poems' **content-word pairs** (and the reduplicated pairs such as the ones that open each poem), not only archaic forms. A special case: the second poem's **title is its own opening phrase** ("अट नहीं रही है"). Titles are allowed (CONTEXT §8: literature by title only), so the title is used only as the poem's name and is deliberately not in the guard; everything after the title in that line is.

**What is here**
- Poet and context: निराला's life, works by form, the three strands of his poetry (छायावादी, विद्रोही-प्रगतिशील, शिल्प के प्रयोग), बादल राग as background for the cloud.
- The poems' ideas, in SOYL's words, in the order of each poem's argument (t02 "पंक्ति-क्रम से भाव" is met at the level of ideas, not lines):
  - उत्साह: the call to the cloud to roar, not drizzle; its beauty and the hidden thunderbolt; the cloud as a poet who brings new life; the heat-struck people and the relief of rain. Symbol table: गर्जन → क्रांति/जागरण, वज्र → अन्याय का अंत, कवि-रूप → सृजन, वर्षा → राहत.
  - अट नहीं रही है: beauty too great to be contained (अटना = समाना); फागुन addressed as "तुम"; its breath scenting every courtyard; the mind given wings; the eye that will not turn away; branches with new green and reddish leaves; a garland of softly scented flowers; the mind and nature in one joy.
- **Single words** where a meaning is taught: धाराधर, निदाघ, उन्मन, विकल, वज्र, छबि, अटना, आभा, उर.
- **Devices illustrated with SOYL's own lines**, each labelled "SOYL": सावन ने धरती का माथा चूमा (मानवीकरण), कोयल कुहुककर कुछ कहती (अनुप्रास), गली-गली में दीप जले (पुनरुक्ति प्रकाश), बादल हाथी-से झूम उठे (उपमा), उठो किसानो, नया सवेरा लाओ! (आह्वान-शैली). The poems' own devices are only described ("फागुन का साँस लेना — मानवीकरण"; "उत्साह के आरंभ के गूँजते वर्ण — नाद-सौंदर्य").

**What is not here**
- No line, half-line or **distinctive run of two or more words** of either poem; no line-by-line भावार्थ.
- No NCERT exercise questions. Reframes:
  - "बादल से गरजने के लिए क्यों कहता है" became an MCQ with a reasoned key, an AR item and a long evaluation of a reader's claim ("केवल वर्षा का स्वागत-गीत?");
  - "शीर्षक उत्साह क्यों" became a passage child;
  - "बादल किन अर्थों की ओर संकेत करता है" became "चार प्रतीकात्मक अर्थ, चित्र सहित" (long) and a two-roles short;
  - "नाद-सौंदर्य वाले शब्द छाँटिए" became a definition short and an MCQ on where the effect lies (no word list from the poem);
  - "छायावाद: अंतर्मन और बाहर का सामंजस्य — कौन-सी पंक्तियाँ" became "मन और प्रकृति कैसे घुलते हैं" (short) and an MCQ;
  - "आँख क्यों नहीं हट रही" became "कवि की मनःस्थिति" (short) and an inference MCQ;
  - "फागुन में क्या भिन्न" became a two-point short; "काव्य-शिल्प" became a comparison long and a word-choice short;
  - the creative tasks became an आह्वान line of one's own and a फागुन letter; a climate/water-saving long applies उत्साह to today.

**How it is enforced**
1. **`setForbidden([...])` in `src/build.mjs`: 99 entries** — every distinctive two-word-or-longer run of both poems as the author recalls them (content-word pairs, reduplications, the refrain, the grammatical endings unique to the poems such as the imperative and "-ते हो" forms), plus wording from the textbook introduction and exercises. During authoring it caught "कर दो" inside "जुड़कर दोहराए" (a substring hit), which was rephrased.
2. **Bigram overlap scan** against a scratch copy of both poems written from memory, **kept only in the agent's scratchpad, never committed**.
   - First build: 10 shared bigrams. Echoes rewritten: "पत्तों से" (the laden-branch image) → "नई पत्तियों से"; "साँस लेते" → "साँस लेता हुआ"; "जल से" → "वर्षा से"; "में तुम" (two stems/cards) → "का "तुम""; "हूँ तो" (in a model letter) and a "रही है" in a narration were rephrased.
   - **After: 5 bigrams remain** — the three that make up the title ("अट नहीं", "नहीं रही", "रही है", only inside the title), "फागुन की" (noun + postposition, in phrases such as "फागुन की शोभा") and "में कवि" (postposition + noun; in the poem it straddles a comma). None renders a line; they are listed for the reviewer.
3. **The pipeline's literature lint**: 0 findings; the Hindi validator finds 0 quoted spans of 8 or more words.

**Board "पठित काव्यांश" pattern.**
- Items `src_*` are six `source-based` SOYL commentary paragraphs (105–126 words) with 5 × 1 MCQs each and `passage_origin: "soyl-commentary"`; two carry an internal-choice `alternatives` part (`src_badal_roop`, `src_phagun`). Three interpret उत्साह (the call, the cloud's forms, the heat and relief), two अट नहीं रही है (the overflow, the trees and garland), one compares the poems' craft.
- Every stem carries: "(यह अनुच्छेद SOYL द्वारा लिखी गई टिप्पणी है, कविता का अंश नहीं। मूल कविताएँ अपनी पाठ्यपुस्तक क्षितिज भाग 2 में पढ़ें।)"
- `case_ira` is a labelled fictional present-day case: a student in a drought-hit village writes a rousing song that gets a pond re-dug, and a gentle फागुन song when the mustard blooms.

**Textbook pointers** appear on the title slide, the how-to slide, the summary slide, notes sections 1, 3, 4 and 7, the image and word tables, and every passage stem.

## Counts

- **Questions: 74 (135 marks) + 34 passage children (+ 2 alternatives).**
  - By type: source-based 6, case-based 1, mcq 30, short 2-mark 12 (25–30 words; one creative item without a limit), long 4-mark 6 (60–80 words), true-false 6, fill-blank 4, match 3, assertion-reason 5 (keys a, d, c, a, b), ordering 1.
  - Difficulty: d1 10 · d2 40 · d3 22 · d4 2.
  - Competency: application or higher on 55% of items and 71% of marks. Higher-order items include: a profile item and a mela item for today; the reader's "only a rain song" claim; a youth-mobilisation short; a climate long; a फागुन letter and an आह्वान line of one's own (create); inference and title children in every passage.
  - MCQ keys (incl. children): balanced (15–17 each).
  - Model answers: 2-mark 26–30 words; 4-mark 62–67 words.
- **Deck:** 21 slides — title, how-to, poet, three strands, match check, the two poems compared, उत्साह's call, the cloud's forms, AR check, heat and relief, a two-column विनाश/सृजन, अट नहीं रही है, फागुन's images, application check, mind and nature, काव्य-सौंदर्य, an अलंकार table with SOYL lines, device check, word meanings, summary, exam tips. 11 visuals. Narration max 60 words (mean 50), Devanagari only, no digits or symbols.
- **Notes:** 7 sections + exam tips. **Flashcards:** 28.
- **Tests (no shared questions):**
  - Short (20 marks, 40 min): A one commentary passage (5) · B 5 MCQ · C short "4 में से 3" × 2 · D long "2 में से 1" × 4.
  - Long (40 marks, 80 min): A two passages (10) · B 6 MCQ + 2 assertion-reason · C short "6 में से 5" × 2 · D long "4 में से 3" × 4.
  - `blueprint_id` is `cbse-10-hindi-a-chapter-test-short` / `-long`; the sections match the blueprints slot for slot.

## Verifier record (author pass, 2026-10-27; no sub-agents per D-024)

- **Keys:** 85/85 objective keys agreed on blind re-solve (49 top-level objective items, 34 MCQ children, 2 alternatives). Device items: the मानवीकरण MCQs offer no उत्प्रेक्षा; the अनुप्रास line ("कोयल कुहुककर कुछ कहती") has no comparison; पुनरुक्ति प्रकाश is asked from a description of the poems' reduplications, never from their words. The ordering item asks for the natural sequence of the second stanza's scene (heat → clouds → thunder → rain → cool earth), stated in the stem as "स्वाभाविक क्रम".
- **Facts checked:** 1899–1961; born महिषादल (मेदिनीपुर, बंगाल), family from गढ़ाकोला (उन्नाव); self-taught in संस्कृत, बांग्ला, अंग्रेज़ी; छायावाद and its four poets; मुक्त छंद; works (अनामिका, परिमल, गीतिका, कुकुरमुत्ता, नए पत्ते; राम की शक्तिपूजा; सरोज स्मृति for his daughter; novels अप्सरा, अलका, प्रभावती, निरुपमा; कुल्ली भाट, बिल्लेसुर बकरिहा, given only as "अन्य गद्य कृतियाँ"); बादल राग.
- **Fixes:** a third alternatives part (passage title) removed so two items carry alternatives, as in the model chapters; three 2-mark models of 31–32 words trimmed; "रेखाचित्र" removed as a genre label (sources differ); one symbol-reading MCQ relabelled from analysis to understanding.

## Validation

- `npm test -w @soyl/content-templates`: 7/7 checks for this chapter.
- `npm run content -- lint --exemplars`: 0 errors and 0 warnings for this unit.
- `npm run content -- verify --board cbse --class 10 --authored`: 74/74 pass, 0 blocking flags.
- `npm run content -- originality --authored`: 0 errors (no `bank.duplicate`).
- Exemplar Hindi validator (`--literature`): NO ERRORS, 0 warnings, 0 quoted spans ≥ 8 words.
- Bigram overlap with the poems (scratch copy, not committed): 5 bigrams, all title or grammar, listed above.

## Reviewer checklist (hindi-literature, poem)

- [ ] **No reproduction (critical).** With क्षितिज भाग 2 open, scan every string for any distinctive run of two or more words of either poem, and for any sentence that renders a line's frame. The title and the two grammatical bigrams listed above are expected; anything else is a find. Add it to `setForbidden` and rebuild.
- [ ] Image descriptions (the roaring cloud, its dark soft form, lightning in its heart, the thunderbolt, the cloud as poet, the heat-struck people; फागुन's breath, the wings, the eye that stays, new leaves, the garland, beauty spilling over) are facts about the poems, not translations of lines.
- [ ] Facts match the textbook's poet introduction (see "Facts to confirm").
- [ ] Re-solve every item blind. Device MCQs have one defensible answer.
- [ ] Model answers are within word limits (2-mark 25–30, 4-mark 60–80) and the schemes add up.
- [ ] Orthography: तत्सम words spelled as in the textbook (धाराधर, निदाघ, उन्मन; the poem's "छबि" is taught as a variant of छवि); nukta consistent (ज़ोर, नज़र, अंग्रेज़ी).

## Facts to confirm with the textbook (author's knowledge)

- The textbook's birth-year for निराला (1899 is used; some sources give 1896 or 1897) and whether it states his schooling stopped at class nine (SOYL says only "विद्यालयी शिक्षा अधूरी").
- The list of works the textbook names (SOYL adds प्रभावती, निरुपमा, कुल्ली भाट, बिल्लेसुर बकरिहा from general knowledge; none is asked except निरुपमा/प्रभावती as accepted answers of one fill-blank).
- "छायावाद लगभग 1918–1936" appears only in a notes term.

## Known gaps

- No reference text of the poems is in the repo, so the pipeline's originality n-gram check could not run against them. The author's scratch check is recorded above.
- The textbook introduction was not re-read; facts are standard and should be checked by a reviewer.
