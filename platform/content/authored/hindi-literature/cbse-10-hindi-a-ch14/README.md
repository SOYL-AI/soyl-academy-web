# CBSE Class 10 Hindi A, Chapter 14 — संस्कृति (भदंत आनंद कौसल्यायन)

| | |
|---|---|
| Unit | `cbse-10-hindi-a-ch14` (family `hindi-literature`) |
| Book | NCERT क्षितिज भाग 2, गद्य खंड · a reflective essay (विचार-प्रधान निबंध) |
| Syllabus | `platform/catalog/cbse/10/hindi-a/syllabus.yaml` (2026-27, `source_status: unverified`): t01 लेखक-परिचय और पाठ का प्रसंग · t02 पाठ का सार (incl. सभ्यता और संस्कृति का अंतर, असंस्कृति) · t03 मूल भाव, संदेश और भाषा-शैली · t04 गद्यांश आधारित प्रश्न-अभ्यास. Not a कृतिका lesson; examinable (not in `removed_topics`). |
| Board weight | खंड ग, क्षितिज गद्य 11 marks: पठित गद्यांश 5 × 1 MCQ + "4 में से 3" × 2 marks (25–30 words) |
| Files | `release.json` (1 deck of 22 slides, 7 notes sections, 28 flashcards, 67 questions with 34 passage children), `tests.json` (short 20 / 40 min, long 40 / 80 min), `src/` (build sources; uses `hindi-language/cbse-10-hindi-a-ch01/src/lib.mjs`) |
| Status | `draft` on every item (D-025/D-026 hand-authored content) |
| Author | `claude-opus-5-5 (subject-producer)`, provenance `origin: human`, 2026-10-27 |

Rebuild from `platform/`: `npx tsx content/authored/hindi-literature/cbse-10-hindi-a-ch14/src/build.mjs`.

## The rule: an essay taught without reproducing it (CONTEXT §8)

An essay is harder to protect than a story: its value is in its definitions and rhetorical questions, and a "summary" naturally slides into the author's own sentences. So every idea is restated as SOYL's own claim, in SOYL's order of explanation.

**What is here**
- SOYL's own summary, organised as seven ideas (उलझन → भेद → संस्कृत और सभ्य → प्रेरणाएँ → त्याग → असंस्कृति → एकता).
- The central distinction (संस्कृति = the inner ability, inclination or drive that produces a discovery; सभ्यता = what that ability produces), with SOYL's own memory aid "संस्कृति बीज है, सभ्यता उसका फल" — labelled on the slide as SOYL's comparison, not the essay's.
- The four groups of examples, stated as facts about the essay: fire and needle-and-thread; Newton and today's physics student; the star-gazer (ज्ञानेप्सा); the mother, Lenin, Marx and Siddhartha (त्याग).
- The test of welfare (कल्याण): ability cut off from welfare is असंस्कृति and its products असभ्यता; human culture is indivisible.
- **Single words** where a meaning is taught: आध्यात्मिक, साक्षात, आविष्कर्ता, परिष्कृत, अनायास, ज्ञानेप्सा, मनीषी, तृष्णा, अविभाज्य, अवश्यंभावी.

**What is not here**
- No sentence, close paraphrase, sentence frame or distinctive phrase of the essay. The essay's famous questions (whether a self-destroying ability is culture; whether its products are civilisation) are reported as "what should such an ability be called?", never in the author's either–or frame. The definition of सभ्यता as culture's outcome is given as "संस्कृति से उपजा फल", never in the essay's wording.
- The Lenin, Marx and Siddhartha examples are retold in SOYL's words without the essay's descriptive phrases (the dry bread in the desk, the "workers' happiness" dream sentence, the "2,500 years" frame).
- No NCERT exercise questions. Reframes:
  - "सभ्यता-संस्कृति की सही समझ क्यों नहीं बन पाई" became a passage on the opening confusion and a short on how the author resolves it;
  - "आग की खोज बड़ी खोज क्यों, प्रेरणा के स्रोत" became "why does the essay mention the first person to use fire?" (purpose of the example) and a match of examples to motives;
  - "न्यूटन को संस्कृत मानव कहने के तर्क" became "two people with the same knowledge — why is one संस्कृत and the other only सभ्य?" and a long on knowledge vs discovery;
  - "सुई-धागे का आविष्कार किन आवश्यकताओं के लिए" became "why is such an ordinary object treated as a great achievement?";
  - "अविभाज्य संस्कृति — विभाजन के प्रसंग" became an opinion long on dividing culture today;
  - "आपकी परिभाषा" became a speech for the school assembly; "आत्म-विनाश … आशय" became a two-example evaluation (atomic energy, the internet) and an application slide (drones).

**How it is enforced**
1. **`setForbidden([...])` in `src/build.mjs`: 134 entries** — the essay's distinctive phrases and sentence frames as the author recalls them (from the opening "least understood, most used" frame to the closing lines on welfare and permanence), plus textbook-introduction and exercise wording. No hits during authoring (the essay's phrases were avoided while writing).
2. **N-gram overlap scan** against a scratch copy of the essay and its textbook introduction written from memory, **kept only in the agent's scratchpad, never committed** (trigrams and 4-grams).
   - First build: 104 shared trigrams / 357 occurrences; 40 shared 4-grams. Echoes rewritten: "कल्याण की भावना" (an option); "दूसरों को खिला" (the Lenin item); "अपने पूर्वज" (two options); "अधिक सभ्य भले …" and "उसकी संतान को …" (the Newton passage); "मानव-संस्कृति एक है" (ten places; now "पूरी मानवता की संस्कृति एक ही है" and a new slide heading); "भी संस्कृति है" (two places); "इन दो शब्दों"; "दोनों शब्दों का"; the essay's "मनुष्य की जो योग्यता उससे …" frame (a passage); "के तारों को देखकर" (narration); and the textbook-introduction frames in the author slide, notes and three solutions ("… का जन्म सन् …", "मूल नाम … था", "देश-विदेश की यात्राएँ", "बौद्ध धर्म के प्रचार", "जातक कथाओं का अनुवाद विशेष", "गांधी जी के साथ लंबे …").
   - **After: the remaining 4-grams are book titles (भिक्षु के पत्र, जो भूल ना सका, आह! ऐसी दरिद्रता, यदि बाबा ना होते, रेल का टिकट, कहाँ क्या देखा), the author's name, "गांधी जी के साथ", and generic phrases ("लेखक की दृष्टि में", "सुई धागे के आविष्कार", "सभ्यता और संस्कृति के", "की खोज करता है", "निबंध में लेखक ने").** Listed for the reviewer.
3. **The pipeline's literature lint**: 0 findings.

**Board "पठित गद्यांश" pattern.**
- Items `src_*` are six `source-based` SOYL commentary paragraphs (111–136 words) with 5 × 1 MCQs each and `passage_origin: "soyl-commentary"`; two (`src_aag`, `src_tyag`) carry an internal-choice `alternatives` part. Each interprets one idea (the opening confusion, fire and needle, संस्कृत व्यक्ति, the motives, त्याग, असंस्कृति).
- Every stem carries: "(यह अनुच्छेद SOYL द्वारा लिखी गई टिप्पणी है, निबंध का अंश नहीं। मूल पाठ अपनी पाठ्यपुस्तक क्षितिज भाग 2 में पढ़ें।)"
- `case_mela` is a labelled fictional present-day case: a district science fair with three projects — Neha's cheap water filter (संस्कृति and its fruit), Aman's assembled robot kit (knowledgeable and सभ्य, not संस्कृत in this work) and Kunal's data-stealing app (असंस्कृति).

**Textbook pointers** appear on the title slide, the how-to slide, the summary slide, notes sections 1, 3 and 7, the word table and every passage stem.

## Counts

- **Questions: 67 (128 marks) + 34 passage children (+ 2 alternatives).**
  - By type: source-based 6, case-based 1, mcq 25, short 2-mark 12 (25–30 words), long 4-mark 6 (60–80 words), true-false 5, fill-blank 3, match 3, assertion-reason 5 (keys a, d, a, b, c), ordering 1.
  - Difficulty: d1 10 · d2 28 · d3 24 · d4 5.
  - Competency: application or higher on 51% of items and 62% of marks. Higher-order items include: the science-fair case; a student proud of his grandfather's machine; drones, atomic energy and the internet as culture or not-culture; whether more information makes a person संस्कृत; dividing culture today; an assembly speech; inference and title children in passages.
  - MCQ keys (incl. children and alternatives): a 14, b 14, c 15, d 16.
  - Model answers: 2-mark 27–30 words; 4-mark 64–71 words.
- **Deck:** 22 slides — title, how-to, author, the opening confusion, seed and fruit, fire and needle, check (not civilisation), संस्कृत and सभ्य, three sources, the star-gazer, त्याग, ordering check, असंस्कृति, AR check, one human culture, the essay's structure, style, application check, today's message, word meanings, summary, exam tips. 11 visuals. Narration max 61 words (mean 50), Devanagari only, no digits or symbols.
- **Notes:** 7 sections + exam tips. **Flashcards:** 28.
- **Tests (no shared questions):**
  - Short (20 marks, 40 min): A one commentary passage (5) · B 5 MCQ · C short "4 में से 3" × 2 · D long "2 में से 1" × 4.
  - Long (40 marks, 80 min): A two passages (10) · B 6 MCQ + 2 assertion-reason · C short "6 में से 5" × 2 · D long "4 में से 3" × 4.
  - `blueprint_id` is `cbse-10-hindi-a-chapter-test-short` / `-long`; the sections match the blueprints slot for slot (scratch check).

## Verifier record (author pass, 2026-10-27; no sub-agents per D-024)

- **Keys:** 71/71 objective keys agreed on a blind re-solve from a key-less printout (25 MCQ, 5 true-false and 5 assertion-reason at top level; 34 MCQ children; 2 alternatives). The "not" item (which is not सभ्यता) has exactly one outlier. Match, ordering and fill-blank keys were checked by hand. The library places keys by a fixed rotation, so key letters repeat across chapters; the re-solve checked that exactly one option is defensible in each item, not the letters.
- **Facts checked (author's knowledge):** author (1905–1988; सोहाना, अंबाला; मूल नाम हरनाम दास; बौद्ध भिक्षु; वर्धा with Gandhi; works; जातक translation); the essay's examples (fire, needle and thread, Newton and gravitation, the star-gazer, the mother, Lenin's bread, Marx, Siddhartha) and the order of ideas.
- **Other fixes:** four passages had internal-choice alternatives; reduced to two (the brief's pattern). Three 2-mark models of 32–33 words trimmed to 28–30. A 68-word narration trimmed to 61.

## Validation

- `npm test -w @soyl/content-templates`: 7/7 checks for this chapter.
- `npm run content -- lint --exemplars`: 0 errors and 0 warnings for this unit.
- `npm run content -- verify --authored --board cbse --class 10`: 0 blocking flags.
- `npm run content -- originality --authored`: 0 errors.
- Exemplar Hindi validator (`--literature`): NO ERRORS, 0 warnings, 0 quoted spans ≥ 8 words.
- N-gram overlap with the essay (scratch copy, not committed): remaining 4-grams are titles, names and generic phrases (above).

## Reviewer checklist (hindi-literature, essay)

- [ ] **No reproduction (critical).** With क्षितिज भाग 2 open, check the summary, passages and models against the essay: no sentence, sentence frame or distinctive phrase. The riskiest places are the definitions (notes section 4, `b_def_*`), the four त्याग examples and the closing ideas on welfare and indivisibility. Add any find to `setForbidden` and rebuild.
- [ ] The memory aid "बीज और फल" is labelled as SOYL's and does not echo the essay.
- [ ] Facts match the textbook's author introduction (dates, birthplace, original name, works, Wardha).
- [ ] The order of ideas in `b_order` matches the essay (confusion → fire/needle → संस्कृत व्यक्ति and Newton → motives → असंस्कृति).
- [ ] Re-solve every item blind; the "not" item has one outlier.
- [ ] Model answers are within word limits (2-mark 25–30, 4-mark 60–80) and the schemes add up.

## Known gaps

- No reference text of the essay is in the repo, so the pipeline's originality n-gram check could not run against it. The author's scratch check is recorded above.
- Facts left out because they could not be confirmed from memory: the author's college and degree, the number of his books, and his association with specific Hindi-promotion bodies.
- The textbook's author introduction was not re-read; facts are standard and should be checked by a reviewer.
