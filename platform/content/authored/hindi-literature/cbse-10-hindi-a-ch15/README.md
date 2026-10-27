# CBSE Class 10 Hindi A, Chapter 15 — माता का अँचल (शिवपूजन सहाय)

| | |
|---|---|
| Unit | `cbse-10-hindi-a-ch15` (family `hindi-literature`) |
| Book | NCERT **कृतिका भाग 2** (पूरक पाठ्यपुस्तक) · an extract from the novel देहाती दुनिया, told in the first person by the child |
| Syllabus | `platform/catalog/cbse/10/hindi-a/syllabus.yaml` (2026-27, `source_status: unverified`): t01 लेखक-परिचय और पाठ का प्रसंग · t02 पाठ का सार (incl. बचपन के खेल, पिता का स्नेह, संकट में माँ की गोद) · t03 पात्र-चित्रण (भोलानाथ और पिता) · t04 मूल भाव, संदेश और भाषा-शैली · t05 गद्यांश आधारित प्रश्न-अभ्यास (MCQ and 50–60-word answers). Unit "खंड ग: कृतिका भाग 2"; examinable (not in `removed_topics`; the two excluded कृतिका lessons are एही ठैयाँ … and जॉर्ज पंचम की नाक). The syllabus has no `board_assessed` field. |
| Board weight | खंड ग, कृतिका 8 marks: प्रश्न 11, **three questions, attempt two, 50–60 words, 4 marks each**. So every 4-mark long answer here is written to **50–60 words** (not the 60–80 of the क्षितिज chapters), and the deck's title slide and notes teach this pattern. |
| Files | `release.json` (1 deck of 22 slides, 7 notes sections, 28 flashcards, 69 questions with 34 passage children), `tests.json` (short 20 / 40 min, long 40 / 80 min), `src/` (build sources; uses `hindi-language/cbse-10-hindi-a-ch01/src/lib.mjs`) |
| Status | `draft` on every item (D-025/D-026 hand-authored content) |
| Author | `claude-opus-5-5 (subject-producer)`, provenance `origin: human`, 2026-10-27 |

Rebuild from `platform/`: `npx tsx content/authored/hindi-literature/cbse-10-hindi-a-ch15/src/build.mjs`.

## The कृतिका pattern

The board never sets a पठित गद्यांश from कृतिका; it sets three 4-mark questions (attempt two) in 50–60 words. The chapter tests still follow the catalog's literature blueprints (`cbse-10-hindi-a-chapter-test-short/-long`, which are the same for क्षितिज and कृतिका chapters), so section A keeps its 5-mark SOYL commentary passage. What changes:
- **8 long answers** (one more than the क्षितिज chapters), all 4 marks, all **50–60 words** (models 51–60), marked in four steps: event, feeling or reason, evidence from the text, conclusion and language.
- The long test's section D (three of four) is the closest practice for प्रश्न 11; section D titles say "50–60 शब्द".
- The title slide's board table, the exam-tips slide, notes section 7 and the flashcards teach the 4-mark answer frame.

## The rule: prose taught without reproducing it (CONTEXT §8)

**What is here**
- SOYL's own summary in five episodes (पिता के साथ दिन → दुलार और भोजन → टोली के खेल → शरारत और दंड → साँप और शरण).
- The two forms of वात्सल्य (the father's play-filled affection; the mother's care, feeding and protection) and the title's paradox (the text is mostly about the father, yet the climax is the mother's lap).
- The children's games as facts about the text, with their props described in SOYL's words (mud sweets, broken-pottery coins, a tin-can band, two children as bullocks).
- **Single words** where a meaning is taught: भभूत, त्रिपुंड, मइयाँ, सानना, घरौंदा, चिरौरी, अमनिया करना, शरण.

**What is not here**
- No sentence, close paraphrase, sentence frame or distinctive phrase of the text. The children's rhymes (on birds, on rain, the taunt for मूसन तिवारी), the proverb about children and old people, the mother's sayings while feeding and the father's teasing questions after the games are **never quoted** — the items only say that such rhymes and sayings exist and send students to the textbook.
- The text's lists of game props, the feeding scene and the final flight are compressed, re-ordered by idea and written in SOYL vocabulary.
- No NCERT exercise questions. Reframes:
  - "पिता से अधिक जुड़ाव, फिर भी विपदा में माँ की शरण — क्यों?" became "what would a child psychologist say?" (a long) and an evaluation passage on the title's paradox;
  - "साथियों को देखकर सिसकना क्यों भूल जाता है?" became a present-day application item (a scolded child who laughs when friends appear);
  - "खेल और खेलने की सामग्री आपसे कैसे भिन्न" became a short asking for one difference and one similarity, a "then and now" slide and an evaluation long (mobile-age games vs these);
  - "तीस के दशक की ग्राम्य संस्कृति — आज के परिवर्तन" became a long on two changes in villages and their good and bad effects;
  - "शीर्षक की उपयुक्तता, अन्य शीर्षक" became "would 'बाबूजी और भोलानाथ' work as well?" and "review the claim that the title is wrong";
  - "माता-पिता का लाड़ — डायरी" became a diary entry **in the father's voice** on the night of the snake;
  - "बच्चे प्रेम कैसे अभिव्यक्त करते हैं" became "how did भोलानाथ show his attachment through behaviour, not words?".

**How it is enforced**
1. **`setForbidden([...])` in `src/build.mjs`: 167 entries** — the text's distinctive phrases and sentence frames as the author recalls them (the opening proverb, the morning routine, the feeding scene, each game's props, the rhymes, the मूसन तिवारी taunt, the flight and the closing image), plus textbook-introduction and exercise wording. During authoring it caught "शरण लेता है" (an exercise frame, in narration) and "पकड़वा मँगाया" (a solution).
2. **N-gram overlap scan** against a scratch copy of the text and its textbook introduction written from memory, **kept only in the agent's scratchpad, never committed** (trigrams and 4-grams).
   - First build: 84 shared trigrams / 325 occurrences; 31 shared 4-grams / 79 occurrences. Echoes rewritten: "गोद में उठाकर घर ले चले" (an exact five-word run, in an option and a solution); "चूहे की जगह साँप निकल आया" (exact, in a passage, a solution and narration); "के बिल में पानी डाल-" (nine places; now "बिल को पानी से भरना"); "आटे की गोलियों में" (the text's wrapping verb frame); "अपनी गोद में लेना"; "गाँव के बूढ़े मूसन तिवारी"; "चबूतरे का एक कोना"; "थाली में दही"; "प्यार से भोलानाथ"; "हँसकर भाग जाते"; "गुरुजी से चिरौरी"; "भोलानाथ और उसके साथियों के खेल" (exercise wording); and the introduction's frames ("सन् … में उनका देहांत", "उनके उपन्यास देहाती दुनिया का अंश", "प्रमुख रचनाएँ हैं", "का जन्म").
   - **After: 7 shared 4-grams — book and magazine titles (वे दिन वे लोग, स्मृतिशेष, माधुरी, जागरण, बालक, हिमालय, गंगा, देहाती दुनिया), "माँ की गोद में" (the syllabus's own wording for the climax) and "अपने शब्दों में लिखिए".** Remaining trigrams are names and events ("मूसन तिवारी को", "मिठाई की दुकान", "माँ के आँचल"). Listed for the reviewer.
3. **The pipeline's literature lint**: 0 findings.

**Board-style practice passages.**
- Items `src_*` are six `source-based` SOYL commentary paragraphs (112–137 words) with 5 × 1 MCQs each and `passage_origin: "soyl-commentary"`; two (`src_khel`, `src_sankat`) carry an internal-choice `alternatives` part. Each interprets one idea (the morning with the father, two ways of feeding, the games, the father in the games, the snake and the shelter, the title's paradox).
- Every stem carries: "(यह अनुच्छेद SOYL द्वारा लिखी गई टिप्पणी है, पाठ का अंश नहीं। मूल पाठ अपनी पाठ्यपुस्तक कृतिका भाग 2 में पढ़ें।)"
- `case_riya` is a labelled fictional present-day case: a girl whose father lets himself get out at cricket, whose mother feeds her "one more roti", who builds a cardboard village, and who, chased by a dog and hurt, runs past her father to her mother.

**Textbook pointers** appear on the title slide, the how-to slide, the summary slide, notes sections 1, 3 and 7, the word table, a true-false solution about the rhymes and every passage stem.

## Counts

- **Questions: 69 (135 marks) + 34 passage children (+ 2 alternatives).**
  - By type: source-based 6, case-based 1, mcq 26, short 2-mark 12 (25–30 words), long 4-mark 8 (**50–60 words**), true-false 5, fill-blank 3, match 2, assertion-reason 5 (keys a, c, d, b, a), ordering 1.
  - Difficulty: d1 11 · d2 31 · d3 21 · d4 6.
  - Competency: application or higher on 49% of items and 65% of marks. Higher-order items include: the child-psychologist long; mobile-age games vs these; two changes in villages; the father's diary; the title review; a present-day father like बाबूजी; a scolded child who laughs at friends; the Riya case; inference and title children in passages.
  - MCQ keys (incl. children and alternatives): a 14, b 15, c 15, d 16.
  - Model answers: 2-mark 26–30 words; 4-mark 51–60 words.
- **Deck:** 22 slides — title (कृतिका board pattern), how-to, author, the world of the text, event flow, the morning with बाबूजी, two ways of affection, ordering check, games, check (which game is not in the text), mischief and punishment, the snake, shelter in the mother's lap, AR check, father and son, two forms of वात्सल्य and the title, then and now, style, application check, word meanings, summary, exam tips. 10 visuals. Narration max 64 words (mean 51), Devanagari only, no digits or symbols.
- **Notes:** 7 sections + exam tips. **Flashcards:** 28.
- **Tests (no shared questions):**
  - Short (20 marks, 40 min): A one commentary passage (5) · B 5 MCQ · C short "4 में से 3" × 2 · D long "2 में से 1" × 4 (50–60 words).
  - Long (40 marks, 80 min): A two passages (10) · B 6 MCQ + 2 assertion-reason · C short "6 में से 5" × 2 · D long "4 में से 3" × 4 (50–60 words).
  - `blueprint_id` is `cbse-10-hindi-a-chapter-test-short` / `-long`; the sections match the blueprints slot for slot (scratch check).

## Verifier record (author pass, 2026-10-27; no sub-agents per D-024)

- **Keys:** 72/72 objective keys agreed on a blind re-solve from a key-less printout (26 MCQ, 5 true-false and 5 assertion-reason at top level; 34 MCQ children; 2 alternatives). The "not" item (which game is not in the text) has exactly one outlier. Match, ordering and fill-blank keys were checked by hand.
- **Facts checked (author's knowledge):** author (1893–1963; उनवाँस, बिहार; देहाती दुनिया; वे दिन वे लोग, स्मृतिशेष; editor of मतवाला, माधुरी, जागरण, बालक, हिमालय, गंगा); the child's two names; the father's routine (bath, puja, भभूत, राम-नाम slips in flour balls fed to Ganga fish, the shoulder ride, the branch swing); the wrestling; the two ways of feeding; the mother dressing him like कन्हैया; the four games and the father's part in them; मूसन तिवारी, the school punishment and the father's plea; the rat hole, the snake, the injuries, the father calling from outside with his hookah, the mother cleaning rice, the turmeric, the child refusing to leave her lap.
- **Originality (bank duplicates):** the first `content originality` run flagged the character-trait short ("… के चरित्र की दो विशेषताएँ प्रसंग सहित लिखिए") as 70% similar to ch09 and ch11 stems; it now asks for भोलानाथ's nature through two examples of what he does.
- **Note on the blind re-solve:** the shared library places keys by a fixed rotation, so key letters repeat across chapters; the re-solve therefore checked that exactly one option is defensible in each item, not the letters.
- **Other fixes:** six 2-mark models of 31–33 words and one 61-word long trimmed; one passage's "थाली में दही" frame and the "चिरौरी" bullet rewritten.

## Validation

- `npm test -w @soyl/content-templates`: 7/7 checks for this chapter.
- `npm run content -- lint --exemplars`: 0 errors and 0 warnings for this unit.
- `npm run content -- verify --authored --board cbse --class 10`: 0 blocking flags.
- `npm run content -- originality --authored`: 0 errors.
- Exemplar Hindi validator (`--literature`): NO ERRORS, 0 warnings, 0 quoted spans ≥ 8 words.
- N-gram overlap with the text (scratch copy, not committed): remaining 4-grams are titles, the syllabus phrase "माँ की गोद में" and "अपने शब्दों में लिखिए".

## Reviewer checklist (hindi-literature, कृतिका prose)

- [ ] **No reproduction (critical).** With कृतिका भाग 2 open, check the summary, passages and models against the text: no sentence, sentence frame or distinctive phrase; no rhyme, proverb or saying quoted. The riskiest places are the games (notes section 3, `vGames`, `b_match_games`), the feeding scene and the final flight. Add any find to `setForbidden` and rebuild.
- [ ] Facts match the textbook's author introduction and the text (see "Facts to confirm" below).
- [ ] The कृतिका answers are 50–60 words and the 4-step schemes add up.
- [ ] Re-solve every item blind; the "not" item has one outlier.
- [ ] Orthography: मइयाँ, अँचल (title) vs आँचल (common noun) as in the textbook; one spelling per word across the chapter (the build enforces nukta consistency).

## Known gaps and facts to confirm

- No reference text of the lesson is in the repo, so the pipeline's originality n-gram check could not run against it. The author's scratch check is recorded above.
- **Facts to confirm with the textbook:** that the father dressed the child as कन्हैया (`b_kanhaiya`); that he was smoking a hookah when the child ran home (`b_hookah`); that the mother was cleaning rice (`b_fb_rice`); that the father's plea to the गुरुजी is the word चिरौरी; the glossary meaning of अमनिया.
- **Left out because not confirmed from memory:** the number of times राम-नाम was written; the author's childhood name and early jobs as given in the textbook introduction; awards and their years; any decade label for the setting.
