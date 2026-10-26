# CBSE Class 10 English Language and Literature — Chapter 13: Dust of Snow (Robert Frost)

| | |
|---|---|
| Unit | `cbse-10-english-language-and-literature-ch13` (family `english-literature`) |
| Book | NCERT *First Flight*, poetry |
| Syllabus | `platform/catalog/cbse/10/english-language-and-literature/syllabus.yaml` (2026-27): t01 context and summary · t02 themes and message · t03 poetic devices, imagery and tone · t04 exam practice. No removed topics. |
| Board weight | Section C: reference-to-context extract (5, meaning/tone/devices), First Flight short answers (3 marks, 40–50 words) |
| Files | `release.json` (1 deck of 21 slides; 7 notes sections; 28 flashcards; 62 questions with 35 passage children), `tests.json` (short 20 / 40 min; long 40 / 90 min), `src/` (builder; shared library in `../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs`) |
| Provenance | `origin: human`, `author: claude-opus-5-5 (subject-producer)`, every item `status: draft` |

Rebuild from `platform/`: `npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch13/src/build.mjs`.

## The literature rule for a very short poem

The poem is eight lines and about thirty words, so **any** run of its words is a large share of the text. The rule here is stricter than for prose:

- **No line and no multi-word phrase of the poem** appears anywhere — not in slides, narration, notes, flashcards, stems, options, solutions, model answers or passages. Only the **title** and **single words** (*crow, hemlock, dust, rued, mood*) are used.
- **Stanza summaries describe** what happens and its effect in SOYL's words ("a crow perched in a snow-laden hemlock disturbs a branch …"; "the remainder of that unhappy day has been rescued"), never a line-by-line paraphrase that keeps the poem's order and wording.
- **Devices are described as they work in the poem and illustrated with SOYL's own sentences** (e.g. *The thunderclap that frightened us also brought the rain we longed for* for irony; a made-up rhyme set for abab).
- **Extract questions use SOYL commentary** (`passage_origin: "soyl-commentary"`, 7 items), labelled in every stem, with a pointer to *First Flight*. The board's extract will print the poem; students practise that with the textbook.
- **Textbook pointers:** title slide ("read it aloud, twice"), "how to read a short poem" slide, the enjambment example, summary, notes sections 1 and 7, exam tips and every passage stem.

### Reviewer checklist (english-literature, poetry)
- [ ] **No reproduction (critical):** no line, phrase (2+ consecutive words of the poem beyond the title) or line-by-line paraphrase anywhere; passages are commentary.
- [ ] Form facts: 8 lines, 2 quatrains, one sentence, rhyme scheme abab cdcd.
- [ ] Symbolism stated accurately: the crow as ill omen; the hemlock's association with poison and death comes from the shared name (poison hemlock, Socrates) — Frost's North American hemlock is a harmless evergreen.
- [ ] No overclaiming (the poem does not say why the speaker was unhappy, that he was alone, or that his whole day became joyful).
- [ ] Re-answer every item blind; keys right; model answers within limits.

## Shape
**Deck (21 slides):** title (board pattern) → how to read a short poem → poet (table) → the poem at a glance (table) → stanza 1: incident → stanza 2: effect → check → experience flow → symbols (table) → expectation vs outcome (two-column) → check (assertion-reason) → themes → devices with SOYL examples (table) → why enjambment suits the poem → tone → word meanings (table) → check (rhyme scheme) → worked example: a 46-word answer (flow) → check (*rued*) → summary → exam tips. Narration max 66 words, mean 54. Visuals on 9 slides.

**Question bank (62 items, 155 marks):** source-based 7 (5 × 1 each, commentary on the incident, the effect, symbols, form, tone, theme, speaker) · short 3-mark 12 (44–48 words) · short 2-mark 6 (33–38) · long 6-mark 6 (107–116: small moments, symbols, the speaker's diary, relevance to stressed teenagers, a letter recommending the poem, style) · mcq 14 · fill-blank 4 · assertion-reason 4 (keys b, a, c, d) · true-false 4 · ordering 2 · match 3.
- **Difficulty:** d1 8 · d2 23 · d3 24 · d4 7. **Competency:** recall 12 · understanding 20 · application 5 · analysis 21 · evaluation 4 → **48% application or higher**.
- Long answers are beyond the board's poem pattern (poems carry 3-mark answers) and are included as extended practice and for unit tests.

**Tests:** short (20 marks, 40 min): A extract (5) · B 3 of 4 three-mark (9) · C 1 of 2 long (6). Long (40 marks, 90 min): A two extract pairs (10) · B 3 of 4 two-mark (6) · C 4 of 5 three-mark (12) · D two long pairs (12). No shared questions; `blueprint_id` null (see ch04 README for the blueprint mismatch).

## Verifier record (author pass, 2026-10-27)
- Every item re-answered from its stem; form facts and symbolism checked; every student-facing string scanned for runs of the poem's words.
- **Reproduction fixes:** "hemlock tree" (a two-word run of the poem, 4 places) → "hemlock"; "change of mood" (a phrase of the poem, 2 places) → "shift in mood"; "snow … from a hemlock" (three-word run) → "a crow in a hemlock shakes some snow onto him"; "part of the day … saved" (echo of the poem's closing) → "the remainder of the day … rescued".
- **Accuracy fixes:** "alone except for a crow" (the poem does not say he is alone) → "no other person mentioned"; "told in the past tense" (the effect is in the present perfect) → "looking back on a moment and its effect"; "no difficult words except rued" → "few difficult words besides rued and hemlock"; assertion-reason keys rebalanced (b, a, d, d → b, a, c, d).
- **Answer-leak fix:** the 3-mark practice item matching the deck's worked example repeated its model sentences; it now asks a different question (why the day is not entirely lost) with its own model.
- **Pipeline checks:** `content lint --exemplars` 0 errors, 0 warnings (no `literature.quote-review` or `literature.verse` hits); `verify --authored` 62/62 pass; `originality --authored` 0 errors; API `content.test.ts` passes.

## Known gaps
- The CBSE 2026-27 extract item for poems may mix MCQs and short completions differently; our commentary items use 3–4 MCQ/fill parts and 1 short part.
- Reference-text n-gram checks need the poem in `catalog/sources/reference/` (owner-supplied); the reproduction scan here was manual.
