# CBSE Class 10 English Language and Literature — Chapter 11: The Sermon at Benares

| | |
|---|---|
| Unit | `cbse-10-english-language-and-literature-ch11` (family `english-literature`) |
| Book | NCERT *First Flight*, prose · the Buddha's life and a teaching story (credited to Betty Renshaw) |
| Syllabus | `platform/catalog/cbse/10/english-language-and-literature/syllabus.yaml` (2026-27): t01 context and summary · t02 themes and message (the Buddha's teaching on death and suffering through Kisa Gotami's story) · t03 exam practice. No removed topics. The syllabus has no separate "characters" topic for this chapter, so Kisa Gotami and the Buddha are taught under t02 and examined under t03. |
| Board weight | Section C: reference-to-context extract (5), First Flight short answers (3 marks, 40–50 words), long answers (6 marks, 100–120 words) |
| Files | `release.json` (1 deck of 23 slides; 7 notes sections; 30 flashcards; 63 questions with 35 passage children), `tests.json` (short 20 / 40 min; long 40 / 90 min), `src/` (builder; shared library in `../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs`) |
| Provenance | `origin: human`, `author: claude-opus-5-5 (subject-producer)`, every item `status: draft` |

Rebuild from `platform/`: `npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch11/src/build.mjs`.

## The literature rule: taught without reproducing the text

CONTEXT §8: summaries, themes, character sketches, literary devices, word meanings and questions — **never the text**; tell the student to read it in the textbook. This chapter's risk is concentrated in the sermon itself, whose sentences are famous and balanced (pairs of opposites, two everyday similes, a closing promise of peace), and in Kisa Gotami's reflection at nightfall. How this chapter applies the rule:

- **Summaries in SOYL's words:** the Buddha's path (prince → four sights → search → enlightenment → teaching) and Kisa Gotami's journey (death → denial → task → search → nightfall → acceptance). Facts are stated plainly; the chapter's sentences are not.
- **The sermon is taught as ideas, not rebuilt.** Its teaching is reduced to five points in SOYL's words (death is certain; comparisons from daily life make it clear; grief does not help the dead and harms the mourner; the wise accept; peace comes through letting go). Its two similes are **not named or paraphrased** anywhere; students are told to read them in the textbook. Its pairs of opposites, its "father cannot save his son" sentence and its closing sentences on peace and freedom from sorrow are not reproduced or closely paraphrased.
- **Kisa Gotami's reflection is explained, not quoted.** Her realisation is "her grief had been only for her own loss" and "death comes to all"; the chapter's exclamation and its "common to all" and "fate of men" wording are not used. The lamps are described as "going out one by one as night deepens", not in the chapter's image.
- **The household list** (child, husband, parent, friend) is never given in the chapter's order; items say "someone dear".
- **Extract questions use SOYL commentary.** All 7 `source-based` items have `passage_origin: "soyl-commentary"`, labelled in every stem as SOYL commentary, with a pointer to *First Flight*.
- **Devices with SOYL's own lines** (falling leaves, clouds, a candle), never the chapter's.
- **Word meanings** are single words, labelled "key words for this chapter" (not claimed as the textbook glossary).
- **Textbook pointers:** title slide, "how to use" slide, the teaching slide, summary slide, notes sections 1, 4 and 7, exam tips and every passage stem.
- **NCERT exercise questions are not reused.** Classic questions are reframed (e.g. *why did the Buddha ask for mustard seed* is asked as *why the task rather than a plain statement*; *how did Kisa Gotami understand* is asked through the lamps; *is grief selfish* is an open debate).

### Reviewer checklist (english-literature)
- [ ] **No reproduction (critical):** no sentence, sentence frame or distinctive phrase of the chapter in slides, narration, notes, flashcards, stems, options, solutions, model answers or passages. Pay special attention to the sermon passage (`src_teaching`), the teaching slide, notes section 4, `la_death_universal`, and the nightfall passage (`src_lights`).
- [ ] Facts (see below).
- [ ] Re-answer every item blind; keys right; no second defensible option.
- [ ] Model answers within word limits (3-mark 40–50, 2-mark 30–40, 6-mark 100–120).
- [ ] Textbook pointer present on the title slide, notes and passage stems.

### Facts to confirm against the textbook
Stated in the content (believed correct; please confirm):
- The chapter is credited to Betty Renshaw.
- Siddhartha Gautama: born a prince in northern India; studied sacred texts; married a princess; had a son.
- The four sights: a sick man, an aged man, a funeral, a holy man (monk) begging for food/alms.
- Enlightenment beneath a peepal tree, known as the Bodhi tree (tree of wisdom); Buddha = the awakened/enlightened one.
- The chapter places the first sermon at Benares, on the Ganga. (Tradition places it at the deer park at Sarnath, near Benares; the content follows the chapter and does not mention Sarnath.)
- Kisa Gotami's only son died; she sought medicine from neighbours, who thought she had lost her senses; a man sent her to Sakyamuni, the Buddha.
- The Buddha asked for a handful of mustard seed from a house where no one had died; every family had lost someone.
- She rested by the roadside at nightfall, watched the town's lights go out, and understood.

Deliberately **left out** because they cannot be confirmed without the text: the Buddha's dates, his ages at schooling, marriage and the four sights, the number of years he wandered and the number of days he meditated, and the exact wording of the people Kisa Gotami met.

## Shape
**Deck (23 slides):** title (board-pattern table) → how to use → about the chapter (table) → the Buddha's path (flow) → summary 1: the prince and the four sights (table) → summary 2: enlightenment and the first sermon → ordering check → Kisa Gotami's journey (flow) → summary 3: grief and the task → summary 4: the search and the realisation → summary 5: the teaching in SOYL's words → theme 1: denial to acceptance (two-column) → theme web (table) → check (the Buddha's approach applied to a grieving student) → the figures in the chapter (table) → is grief ever selfish? (two-column debate) → check (assertion-reason) → style and technique → symbol and simile with SOYL lines → word meanings (table) → worked example: planning a 6-mark answer (flow) → summary → exam tips. Narration max 66 words, mean 55. Visuals on 10 slides.

**Question bank (63 items, 161 marks):** source-based 7 (5 × 1 each, commentary passages: the prince, enlightenment, Kisa's grief, the mustard-seed task, the houses, the lamps, the teaching) · short 3-mark 12 (models 41–49 words) · short 2-mark 6 (32–37 words) · long 6-mark 7 (Kisa's journey, the Buddha as teacher, the teaching on death and grief, Kisa's diary, a letter comforting a grieving friend, is grief selfish, relevance today; 109–118 words) · mcq 14 · fill-blank 4 · assertion-reason 4 (keys a, d, b, c) · true-false 4 · ordering 2 · match 3.
- **Difficulty:** d1 8 · d2 21 · d3 22 · d4 12. **Competency:** recall 11 · understanding 20 · application 7 · analysis 18 · evaluation 7 → **51% application or higher**.
- **MCQ keys (14 top-level):** a 3 · b 4 · c 3 · d 4 (last MCQ fixed at c).
- **Schemes:** 3-mark = point (1) + explanation (1) + expression (1); 2-mark = point (1) + explanation (1); 6-mark = content 3 + interpretation 1 + organisation/expression 2.
- **Stems are chapter-specific** (they name Kisa Gotami, the Buddha, Gautama or the chapter).

**Tests:** short (20 marks, 40 min): A extract (5) · B 3 of 4 three-mark (9) · C 1 of 2 long (6). Long (40 marks, 90 min): A two extract pairs (10) · B 3 of 4 two-mark (6) · C 4 of 5 three-mark (12) · D two long pairs (12). No shared questions. Both match the subject's chapter-test blueprints item for item, so `blueprint_id` is `cbse-10-english-language-and-literature-chapter-test-short` / `-long`.

## Verifier record (author pass, 2026-10-27)
Every item re-answered from its stem; every factual claim checked against the author's knowledge of the chapter; every field scanned for echoes of the chapter's wording.
- **Reproduction fixes (first draft → final):** the sermon's opening description of mortal life (passage, long model) → "brief and never free of suffering" / "every living being will die"; its young/adult, fools/wise pairing (passage, MCQ child option) → "no one is spared, whatever their age or learning", "everyone who is born, without exception"; its father/son and kinsmen sentence (passage, long model) → "love cannot shield anyone", "family ties protect no one"; its sentence on the wise knowing the terms of the world (long model) → "accepts death as part of life"; its two closing sentences on peace and freedom from sorrow (passage, 3-mark model, long model, two fill-blanks) → "calm acceptance, not mourning without end, is the road to peace"; the household list in the chapter's order (passage, 3-mark model, diary) → "someone dear", "every family had buried someone it loved"; Kisa resting by the wayside "weary and hopeless" (passage) → "exhausted, she gives up the search"; the lights "flickering up and going out" and darkness reigning (passage, 3-mark model) → "the lamps go out one by one"; "the fate of men/all" (MCQ option, 3-mark model) → "death comes to all"; "lost her senses" (3-mark model, assertion, true-false solution, scheme) → "grief had driven her mad"; the vow beneath the tree → "determined to meditate there for as long as it took".
- **Answer-leak fix:** a 2-mark model repeated a notes sentence about the prince's life → rewritten.
- **Other:** two 2-mark models (29 words) lengthened to 32–33; one recall MCQ on grief replaced by an application item (a man who has stopped eating after his brother's death), taking higher-order items from 49% to 51%; the genre MCQ fixed at key c (MCQ keys a 4 · b 4 · c 2 · d 4 → a 3 · b 4 · c 3 · d 4); AR keys a, d, b, d → a, d, b, c (one item restructured so A is true and R false).
- **Pipeline checks:** build validation 0 errors, 0 warnings; `content lint --exemplars` 0 errors, 0 warnings.

## Known gaps
- No n-gram check against the actual text (reference texts are not supplied to `catalog/sources/reference/`); the reproduction review was manual, against the author's knowledge of the text. A human reviewer with the textbook should run the checklist above.
- The sermon's two similes are deliberately not named; if the editorial team decides that naming an image in two or three words is acceptable, the teaching slide and notes section 4 are the places to add them.
