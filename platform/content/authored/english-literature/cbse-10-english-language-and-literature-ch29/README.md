# CBSE Class 10 English Language and Literature — Chapter 29: The Necklace

| | |
|---|---|
| Unit | `cbse-10-english-language-and-literature-ch29` (family `english-literature`) |
| Book | NCERT *Footprints without Feet* (supplementary reader) · short story by Guy de Maupassant (English version) |
| Syllabus | `platform/catalog/cbse/10/english-language-and-literature/syllabus.yaml` (2026-27): t01 context and summary · t02 themes (vanity and pride, the twist ending) · t03 characters (Matilda and Loisel contrasted) · t04 exam practice. No removed topics. |
| Board weight | Section C, supplementary reader: 3-mark short answers (40–50 words, two of three) and a 6-mark long answer (100–120 words) on character, theme and values. **No extracts are set from this book.** |
| Files | `release.json` (1 deck of 22 slides; 8 notes sections; 30 flashcards; 63 questions with 25 passage children), `tests.json` (short 18 / 40 min; long 36 / 80 min, supplementary-reader blueprints), `src/` (builder; shared library `../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs`, unchanged; reproduction guard `../../cbse-10-english-language-and-literature-ch27/src/guard.mjs`) |
| Provenance | `origin: human`, `author: claude-opus-5-5 (subject-producer)`, every item `status: draft` |

Rebuild from `platform/`: `npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch29/src/build.mjs` (deterministic; also runs the guard).

## Pattern decision: how the supplementary reader is assessed
This chapter follows the same decision as ch27–ch30. The board uses *Footprints without Feet* only for Q9 (3-mark short answers, two of three) and the second long answer (6 marks), on character, theme and values; the extracts come from *First Flight*. The chapter-test blueprints are generic, with extract slots and no supplementary-reader override. So:
- **Tests keep the blueprint slots item for item** (`blueprint_id` = `…-chapter-test-short` / `-long`).
- **Section A slots hold SOYL commentary passages on character and theme**, titled "Commentary passage". Their parts ask about Matilda's vanity, Loisel's sacrifice, honesty and the irony of the ending.
- **The bank is weighted to the board's form:** 14 three-mark, 9 long, 6 two-mark and only 5 commentary passages.
- The board table on the title slide, notes section 8, exam tips and flashcards all say that no extracts are set from this book.

**Update, 2026-10-27 (curriculum-architect):** the catalog now has supplementary-reader chapter-test blueprints for ch23–ch31 (`chapter-test-short-supplementary`, `chapter-test-long-supplementary`; a chapter override through the blueprint `scope`). They have no extract section and use only the board's forms for this reader (3-mark answers, two of three; 6-mark long answers, one of two), plus the 2-mark recall section in the long test. This chapter's two tests were re-selected onto them from the existing bank; see **Tests** below. Where this note and the paragraphs above differ, this note is current.

## The literature rule: taught without reproducing the text
Maupassant's French original is in the public domain, but the NCERT English version is not. Everything was written in SOYL's own words from the start, at the level of events and ideas (CONTEXT §8–§9, D-036).
- **Summaries in SOYL's words**, in six stages (discontent → invitation and dress → the necklace → triumph and loss → ten years of debt → the truth).
- **No dialogue.** The story turns on spoken exchanges: the couple over the invitation, the request for jewels, Madame Forestier's remark when the necklace is returned, and the final conversation. All are reported in SOYL's words; none is quoted or closely rebuilt. The guard list blocks the best-known line and the return-of-the-necklace remark.
- **Descriptions are not rebuilt.** Matilda's daydreams, the couple's poverty and the departure from the party are described in new terms. The NCERT phrasing for Loisel's job and for the women's coats at the party is avoided (guarded). Loisel's search is not listed in the text's order.
- **Commentary passages:** all 5 `source-based` items have `passage_origin: "soyl-commentary"`, with a *Footprints without Feet* pointer in every stem.
- **Irony and twists illustrated with SOYL's own lines** (a phone, a report card, a cardboard cake).
- **Word meanings** are single words (key words for this chapter).
- **Guard list:** 9 short distinctive phrases (four words or fewer) checked over `release.json`, `tests.json` and this README; 0 of 9 found.
- **NCERT exercise questions are not reused.** Classic questions are reframed: what the loss cost the couple is asked as a values question on honesty; whether Matilda deserved her fate is a debate.

### Reproduction check status
No overlap scan against the real text has been run. Under D-036, no part of the text was written out from memory, even in scratch. The n-gram check against the NCERT version awaits owner-supplied reference texts (OA-16). A reviewer with the reader should run the checklist below.

### Reviewer checklist (english-literature)
- [ ] **No reproduction (critical):** no sentence, sentence frame, distinctive phrase or line of dialogue of the NCERT version anywhere. Check especially the opening portrait of Matilda, the invitation scene, the departure from the party, the description of the years of poverty and the final conversation.
- [ ] Facts (see below).
- [ ] Re-answer every item blind; keys right; no second defensible option.
- [ ] Model answers within word limits (3-mark 40–50, 2-mark 30–40, 6-mark 100–120).
- [ ] Textbook pointer present on the title slide, notes and passage stems.

### Facts to confirm against the textbook
Stated in the content (believed correct; please confirm):
- Guy de Maupassant, 1850–1893; the French original was published in 1884.
- Matilda came from a modest family and married Loisel, a minor clerk in a government office.
- Loisel brought home an invitation to a party given by a government minister. Matilda wept because she had no dress, and he gave her the 400 francs he had saved for a gun.
- She refused his idea of fresh flowers. On his suggestion she borrowed a diamond necklace from her wealthy friend, Madame Forestier.
- She was the most admired woman at the party, hurried away ashamed of her plain wrap, and found the necklace gone at home.
- Loisel searched their route, advertised a reward and enquired with the cab companies and the police. On his advice Matilda wrote that the clasp was being repaired.
- They bought a matching necklace for 36,000 francs, using money his father had left him and heavy loans.
- Madame Forestier was cold about the delay and did not open the case.
- They dismissed their servant, moved to an attic, and worked for ten years to repay the debt; Matilda aged.
- One Sunday Matilda met Madame Forestier, told her everything, and learnt that the original was an imitation worth about 500 francs.

Deliberately **left out** because they cannot be confirmed without the text: the minister's and hosts' names, the name of Loisel's office, where the final meeting took place, the location of the jeweller's shop, the sum Loisel inherited, the rates of his evening copying work, and the time the couple left the party.

## Shape
**Deck (22 slides):** title (board-pattern table) → how to use → author and text (table) → six stages (flow) → summary in four slides (a discontented wife; the invitation, the dress and the necklace; triumph and loss; ten years of debt and the truth), with an ordering check after the second → theme 1: vanity, pride and their price (two-column) → theme web (table) → check (a borrowed phone) → Matilda and Loisel contrasted (table) → the other characters (table) → fate or choice? (two-column) → check (assertion-reason) → style and narrative technique → irony and twists with SOYL lines → word meanings (table) → worked example: planning a 6-mark answer (flow) → summary → exam tips. Narration max 66 words, mean 56. Visuals on 9 slides.

**Question bank (63 items, 167 marks):** source-based 5 (5 × 1 each; commentary passages: Matilda's discontent, the invitation, the party, the years of sacrifice, the twist) · short 3-mark 14 (models 45–49 words) · short 2-mark 6 (30–34) · long 6-mark 9 (Matilda's character sketch, Loisel as hero, pride before a fall, honesty and concealment, Matilda's diary, Loisel's letter, appearance and reality, an alternative ending, the title; 106–117 words) · mcq 12 · fill-blank 4 · assertion-reason 4 (keys a, c, b, d) · true-false 4 · ordering 2 · match 3.
- **Difficulty:** d1 5 · d2 24 · d3 26 · d4 8. **Competency:** recall 13 · understanding 17 · application 5 · analysis 20 · evaluation 8 → **52% application or higher**.
- **MCQ keys (12 top-level):** a 3 · b 3 · c 3 · d 3 (three fixed keys: structure c, phone scenario d, Madame Forestier's reaction b).
- **Schemes:** 3-mark = point (1) + explanation (1) + expression (1); 2-mark = point (1) + explanation (1); 6-mark = content 3 + interpretation of character/theme/value 1 + organisation/expression 2.
- **Stems are chapter-specific** (they name Matilda, Loisel, Madame Forestier or the story).

**Tests** (re-selected from the existing bank on 2026-10-27, no item text changed): short (18 marks, 40 min): A two sets of three 3-mark answers, two of each (12) · B 1 of 2 long (6). Long (36 marks, 80 min): A 3 of 4 two-mark (6) · B two sets of three 3-mark answers, two of each (12) · C three long pairs, one of each (18). No shared questions. Both follow the supplementary-reader blueprints item for item, so `blueprint_id` is `cbse-10-english-language-and-literature-chapter-test-short-supplementary` / `-long-supplementary`. The commentary items remain in the bank as practice and are no longer in the tests.

## Verifier record (author pass, 2026-10-27)
Every item was re-answered from its stem, every factual claim was checked against the author's knowledge of the story, and every field was reviewed for wording that might echo the NCERT version.
- **Wording changed in the first draft:** Madame Forestier's remark on the late return (2-mark model, 3-mark model), now reported very loosely as a complaint about the delay; the men at the party wanting introductions (passage), recast; the coats of the other women (passage), recast; Loisel's search listed in the text's order (3-mark model, solution, long model), reordered or summarised; a physical detail of the older Matilda (2-mark model), recast.
- **Other:** a weak MCQ distractor replaced; MCQ keys a 4 · b 3 · c 3 · d 2 → a 3 · b 3 · c 3 · d 3 by fixing two keys.
- **Pipeline checks:** build validation 0 errors, 0 warnings; guard 0 of 9; `content lint --exemplars` 0 errors, 0 warnings.

## Known gaps
- No n-gram check against the actual NCERT version: it awaits owner-supplied reference texts (OA-16, D-036).
- `catalog` issue (reported, not edited): topic t04's outcome says "extract-based", though the board sets no extracts from this book.
