# CBSE Class 10 English Language and Literature — Chapter 28: The Making of a Scientist

| | |
|---|---|
| Unit | `cbse-10-english-language-and-literature-ch28` (family `english-literature`) |
| Book | NCERT *Footprints without Feet* (supplementary reader) · biographical account by Robert W. Peterson of the scientist Richard H. Ebright |
| Syllabus | `platform/catalog/cbse/10/english-language-and-literature/syllabus.yaml` (2026-27): t01 context and summary · t02 themes and message (curiosity, a mother's encouragement, persistence) · t03 exam practice. **This chapter has three topics, with no separate character topic**, so Ebright's qualities are taught and tagged under t02. No removed topics. |
| Board weight | Section C, supplementary reader: 3-mark short answers (40–50 words, two of three) and a 6-mark long answer (100–120 words) on character, theme and values. **No extracts are set from this book.** |
| Files | `release.json` (1 deck of 22 slides; 8 notes sections; 30 flashcards; 63 questions with 25 passage children), `tests.json` (short 18 / 40 min; long 36 / 80 min, supplementary-reader blueprints), `src/` (builder; shared library `../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs`, unchanged; reproduction guard `../../cbse-10-english-language-and-literature-ch27/src/guard.mjs`) |
| Provenance | `origin: human`, `author: claude-opus-5-5 (subject-producer)`, every item `status: draft` |

Rebuild from `platform/`: `npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch28/src/build.mjs` (deterministic; also runs the guard).

## Pattern decision: how the supplementary reader is assessed
This chapter follows the same decision as ch27–ch30. The board uses *Footprints without Feet* only for Q9 (3-mark short answers, 40–50 words, two of three) and the second long answer (6 marks, 100–120 words), on character, theme and values. The extracts come from *First Flight*. The subject's chapter-test blueprints are generic, with extract slots and no supplementary-reader override. So:
- **Tests keep the blueprint slots item for item** (`blueprint_id` = `…-chapter-test-short` / `-long`).
- **Section A slots hold SOYL commentary passages on character and theme**, titled "Commentary passage". Their parts ask what an episode shows about Ebright, his mother or the theme.
- **The bank is weighted to the board's form:** 14 three-mark short answers, 9 long answers, 6 two-mark answers and only 5 commentary passages (the minimum that fills both tests without sharing).
- The board table on the title slide, notes section 8, exam tips and flashcards all say that no extracts are set from this book.

**Update, 2026-10-27 (curriculum-architect):** the catalog now has supplementary-reader chapter-test blueprints for ch23–ch31 (`chapter-test-short-supplementary`, `chapter-test-long-supplementary`; a chapter override through the blueprint `scope`). They have no extract section and use only the board's forms for this reader (3-mark answers, two of three; 6-mark long answers, one of two), plus the 2-mark recall section in the long test. This chapter's two tests were re-selected onto them from the existing bank; see **Tests** below. Where this note and the paragraphs above differ, this note is current.

## The literature rule: taught without reproducing the text
The account is in copyright (CONTEXT §8–§9, D-036). Everything was written in SOYL's own words from the start, at the level of events and ideas.
- **Summaries in SOYL's words**, in six stages (collector → mother → book and tagging → lost fair → gold spots → college).
- **No quoted remarks.** The account reports what Ebright, his mother and a teacher said about him. None of it is quoted or rebuilt; qualities are named in SOYL's words.
- **The account's summing-up of a scientist's qualities is not rebuilt.** SOYL names the qualities in its own terms (a sharp intellect, curiosity, competing to learn rather than for trophies), and the build's guard list blocks the account's own key phrase.
- **Lists are not given in the account's order** (his collections, his mother's purchases, his outside interests).
- **Commentary passages:** all 5 `source-based` items have `passage_origin: "soyl-commentary"`, with a pointer to *Footprints without Feet* in every stem.
- **Cause-and-effect devices illustrated with SOYL's own lines** (a kite, a quiz, a magnifying glass).
- **Word meanings** are single words or two-word terms (key words for this chapter).
- **Guard list:** 8 short distinctive phrases (four words or fewer) checked over `release.json`, `tests.json` and this README; 0 of 8 found.
- **NCERT exercise questions are not reused.** The classic questions are reframed: how his mother helped is asked as a parenting debate; the lesson of the lost fair is asked with how he responded to failure.

### Reproduction check status
No overlap scan against the real text has been run. Under D-036, no part of the text was written out from memory, even in scratch. The n-gram check against the actual account awaits owner-supplied reference texts (OA-16). A reviewer with the reader should run the checklist below.

### Reviewer checklist (english-literature)
- [ ] **No reproduction (critical):** no sentence, sentence frame, distinctive phrase or quoted remark of the account anywhere. Check especially the account's opening, its summing-up of the qualities of a scientist, the explanation of the viceroy theory, and the description of the gold-spot experiment.
- [ ] Facts (see below).
- [ ] Re-answer every item blind; keys right; no second defensible option.
- [ ] Model answers within word limits (3-mark 40–50, 2-mark 30–40, 6-mark 100–120).
- [ ] Textbook pointer present on the title slide, notes and passage stems.

### Facts to confirm against the textbook
Stated in the content (believed correct; please confirm):
- Author Robert W. Peterson; subject Richard H. Ebright, an American scientist.
- As a child he collected butterflies, and also coins, fossils and stones.
- He was an only child. His father died while he was young (the account places this in his early school years), and his mother became his companion and guide, providing trips, equipment and books.
- His mother gave him *The Travels of Monarch X*, about monarch migration. It invited readers to tag monarchs for Dr Frederick Urquhart of the University of Toronto, and Ebright raised and tagged monarchs until the work grew tedious.
- In seventh grade he won nothing at a county science fair and realised the winners had done real experiments.
- Later projects: the cause of a disease killing monarch caterpillars (a beetle suspected; no clear result), then a test of the theory that viceroys benefit from resembling monarchs, which birds avoid. **This order is used in an ordering item (`ord_projects`); please confirm it.**
- In high school he and a classmate built equipment showing that the gold spots on a monarch pupa produce a hormone needed for full development. This won honours, including at an international science fair, and laboratory work while still at school.
- At Harvard, with his room-mate, he studied the hormone's structure and proposed a theory about how cells use the instructions in DNA.
- Outside science he was a debater and public speaker, and enjoyed canoeing and photography.

Deliberately **left out** because they cannot be confirmed without the text: his home town and birth year, his ages at each stage, the number of butterfly species he collected, the names of his teacher and college room-mate, the name of the army laboratory, the journals that published his work, and the prize places he won.

## Shape
**Deck (22 slides):** title (board-pattern table) → how to use → author and text (table) → six stages (flow) → summary in four slides (a collector and his mother; a book and the tagging; a lost fair and a new method; the gold spots and beyond), with an ordering check after the second → projects and their lessons (table) → theme 1: a scientist is made, not born (two-column) → theme web (table) → check (a robotics student) → character: Ebright (quality/evidence table) → his mother: a model parent? (two-column) → check (assertion-reason) → how Peterson tells the story → cause and effect with SOYL lines → word meanings (table) → worked example: planning a 6-mark answer (flow) → summary → exam tips. Narration max 67 words, mean 54. Visuals on 9 slides.

**Question bank (63 items, 167 marks):** source-based 5 (5 × 1 each; commentary passages: childhood, the monarch book, the lost fair, the gold spots, his qualities) · short 3-mark 14 (models 42–49 words) · short 2-mark 6 (30–34) · long 6-mark 9 (Ebright's character sketch, a mother's encouragement, failure as a stepping stone, Ebright's diary, a letter to Dr Urquhart, the qualities of a scientist, a science-fair speech, curiosity in schools today, the title; 108–115 words) · mcq 12 · fill-blank 4 · assertion-reason 4 (keys a, c, b, d) · true-false 4 · ordering 2 · match 3.
- **Difficulty:** d1 5 · d2 20 · d3 29 · d4 9. **Competency:** recall 13 · understanding 17 · application 6 · analysis 18 · evaluation 9 → **52% application or higher**.
- **MCQ keys (12 top-level):** a 3 · b 3 · c 3 · d 3 (three fixed keys: structure d, mother c, college b).
- **Schemes:** 3-mark = point (1) + explanation (1) + expression (1); 2-mark = point (1) + explanation (1); 6-mark = content 3 + interpretation of character/theme/value 1 + organisation/expression 2.
- **Stems are chapter-specific** (they name Ebright, his mother, Dr Urquhart or the account).

**Tests** (re-selected from the existing bank on 2026-10-27, no item text changed): short (18 marks, 40 min): A two sets of three 3-mark answers, two of each (12) · B 1 of 2 long (6). Long (36 marks, 80 min): A 3 of 4 two-mark (6) · B two sets of three 3-mark answers, two of each (12) · C three long pairs, one of each (18). No shared questions. Both follow the supplementary-reader blueprints item for item, so `blueprint_id` is `cbse-10-english-language-and-literature-chapter-test-short-supplementary` / `-long-supplementary`. The commentary items remain in the bank as practice and are no longer in the tests.

## Verifier record (author pass, 2026-10-27)
Every item was re-answered from its stem, every factual claim was checked against the author's knowledge of the account, and every field was reviewed for wording that might echo it.
- **Wording changed in the first draft:** two phrasings of the cell theory that may echo the account's own wording, now "how cells use the instructions in their DNA"; a phrase in the qualities passage that echoed the account's summing-up, recast.
- **Unconfirmed claims removed:** that Dr Urquhart suggested later research questions, that a teacher encouraged him, that photography directly aided his research, and that his mother spent her evenings teaching him. A diary item no longer puts invented words in his mother's mouth ("I think Mother would say …").
- **Other:** one 2-mark model expanded from 28 to 34 words; a slide layout not in the schema corrected; MCQ keys a 4 · b 3 · c 2 · d 3 → a 3 · b 3 · c 3 · d 3 by fixing two keys.
- **Pipeline checks:** build validation 0 errors, 0 warnings; guard 0 of 8; `content lint --exemplars` 0 errors, 0 warnings.

## Known gaps
- No n-gram check against the actual account: it awaits owner-supplied reference texts (OA-16, D-036).
- `catalog` issues (reported, not edited): this chapter's syllabus has no character topic, although board questions often ask about Ebright's character. Topic t03's outcome says "extract-based", though the board sets no extracts from this book. **Resolved in the catalog on 2026-10-27:** t03 now reads "short-answer and long-answer responses", and a character topic was added as **t04** ("Character: Richard Ebright as a young scientist"; ids kept stable, so it is numbered after t03). The items on Ebright's qualities are still tagged t02; moving them to t04 is a follow-up for the next content pass.
