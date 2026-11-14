# CBSE Class 11 English Core: Chapter 7, Discovering Tut: The Saga Continues (A. R. Williams)

| | |
|---|---|
| Unit | `cbse-11-english-core-ch07` (family `english-literature`) |
| Book | NCERT *Hornbill*, prose · informative feature |
| Syllabus | `platform/catalog/cbse/11/english-core/syllabus.yaml` (2026-27): t01 context and summary · t02 themes and message · t03 exam practice (extract-based and long-answer responses). No removed topics. |
| Board weight | Class 11 school annual paper, Section C: Hornbill prose extract (3), short answers (2 and 3 marks), long answers (6 marks); SOYL practice uses 4-mark commentary sets and 5-mark long answers (80-120 words) on the class-default chapter-test blueprints |
| Files | `release.json` (2 decks of 19 and 16 slides; 7 notes sections; 31 flashcards; 69 questions with 17 passage children), `tests.json` (short 20 / 40 min; long 40 / 90 min), `src/` (builder; shared library in `../../english-language/cbse-11-english-core-ch01/src/lib.mjs`, guard in `guard.mjs` beside it) |
| Provenance | library default (`origin: human`, every item `status: draft`); drafted by a Sonnet content writer for Opus producer review (D-050) |

Rebuild from `platform/`: `npx tsx content/authored/english-literature/cbse-11-english-core-ch07/src/build.mjs`.

## Scope per topic
- **t01 Context and summary:** author and form (informative feature); the royal background (Amenhotep III, Akhenaten, the Aten, Amarna, the restoration under Tutankhamun); the five stages after burial (tomb 1922, cutting, X-ray 1968, scan 2005, return); word meanings.
- **t02 Themes and message:** archaeology meeting technology; respect for the dead and the treatment of the mummy; history as an unfinished story; the Amarna upheaval and its reversal; what technology can and cannot show; weighing theories of death.
- **t03 Exam practice:** commentary sets, short and long answers, diary entry, letter, speech, opinion and counterfactual answers; extrapolation rules.

## The literature rule: taught without reproducing the feature
D-036 and CONTEXT §8 applied as follows.
- **No quotation, close paraphrase or retelling in the feature's own words.** Summaries are SOYL's own, organised by stage. Facts (names, dates, places, events) are stated plainly; the writer's images and sentence frames are not used. Single words appear only for word meanings.
- **Passage items are SOYL commentary.** All 5 `case-based` items carry `passage_origin: "soyl-commentary"`: an interpretive paragraph (about 90-110 words) about a section (dynasty and Amarna, Carter and the mummy, the X-ray and the mystery, the CT scan, the meaning of the saga), never a retelling, labelled in every stem as SOYL's commentary with a pointer to *Hornbill*.
- **Textbook pointers:** title slides, the "how to use" slide, notes section 1 and every commentary stem.
- **Guard:** `build.mjs` calls `guard(DIR, PHRASES)` after `build()` with 18 short distinctive phrases (at most 4 words each) of the feature. None appears in `release.json`, `tests.json` or this README. The phrases are kept only in `build.mjs`.
- **NCERT exercise questions are not reused**; classic questions are reframed (weighing both sides of the cutting, counterfactual on the scan, comparing ancient and modern memory, evidence for theories).

### Reviewer checklist (english-literature)
- [ ] **No reproduction (critical):** no sentence, frame or distinctive phrase of the feature in slides, narration, notes, flashcards, stems, options, solutions, model answers, commentaries or this README. Read the textbook side by side.
- [ ] Facts to check against the text (the writer worked from the task brief only):
  - Tutankhamun died at about nineteen, more than 3,300 years ago, ruled about nine years, buried in the Valley of the Kings; last of a royal family line;
  - Amenhotep III (probably grandfather), Akhenaten (possibly father): the Aten, new name, capital at Amarna, attacks on images of Amun; old gods and ways restored in Tutankhamun's reign;
  - 1922 Howard Carter (British archaeologist) finds the tomb; nested coffins (innermost solid gold), gold mask, jewellery, board games, bronze razor, linen garments, food and wine;
  - the mummy fixed to its coffin by hardened material; the team cut the body apart (head removed, joints separated) and reassembled it later; the aim included recovering gold and jewels. The cutting is dated **the 1920s, some time after the discovery** (historically the unwrapping was in 1925, not 1922); the chapter never says it happened in 1922;
  - 1968 anatomy professor's X-rays: breastbone and front ribs missing; theories: illness, accident, murder;
  - 5 January 2005: a few hours out of the tomb, mobile CT scanner in a trailer nearby, Zahi Hawass (secretary general, i.e. head, of Egypt's Supreme Council of Antiquities), a technical fault and a backup, about 1,700 images, mummy returned to the tomb.
- [ ] **Producer-checked (2026-11-14, from the producer's knowledge of the feature; confident, worth a glance):** Hawass's title in the feature is secretary general of the Supreme Council of Antiquities (the chapter says "secretary general (the head)"); the feature does say the remains were reassembled after the cutting; 5 January 2005 was a Wednesday (`l_diary` now gives the full date and no longer places the arrival "this morning"). The feature opens on the evening of the scan and then goes back in time, so the chapter no longer claims the piece runs in time order (`c_saga` now speaks of the span of the story, not the order of the piece); Smenkhkare, a short-lived ruler between Akhenaten and Tutankhamun, is not mentioned, so no item calls Akhenaten Tutankhamun's predecessor.
- [ ] **Still not fully certain (check side by side):** whether the feature itself frames the cutting as a way to recover the gold and jewels (as given in the brief; the feature also gives Carter's defence); whether it names illness and accident besides murder as theories of the death; "linen garments" (the feature's list may be more specific); that the scan's stated aim is to learn how he lived and died.
- [ ] Re-answer every item blind; keys right; no second defensible option. Items built on hypothetical evidence or a general principle (`m_theory_fit`, `m_postmortem`: bone heals only in life; `m_evidence`, `m_gold`, `m_amun`, `s2_museum`, `s2_theories`, `s2_critic`) state the hypothesis in the stem and invent no facts about the text.
- [ ] Model answers within the limits (2-mark 30-50 words, models 33-47; 3-mark 50-80, models 50-66; 5-mark 80-120, models 88-97).
- [ ] Topics from the syllabus only; board pattern respected.

## Shape
**Decks (19 + 16 slides).** Part 1: title (board table) → how to use → author and text (table) → royal background (table) → Amarna (flow) → five stages (flow) → the tomb and its contents → the mummy and the cutting (flow) → check (ordering) → X-ray and the mystery (table) → the scan (flow) → two ways of examining the body (two-column) → check (mcq) → themes (table) → check (match) → worked example 1 (a commentary set) → worked example 2 (planning a 5-mark answer) → summary → exam tips. Part 2: title → what technology can and cannot show (table) → two casts of people, ancient and modern (two-column) → check (A-R) → weighing theories (table) → Carter's methods, both sides (table) → check (true-false) → form and craft → word meanings → check (fill blank) → worked examples: diary entry, opinion answer → check (mcq) → extrapolation rules → summary → exam tips. Narration max 70 words, mean 50. The worked examples use cases that are **not** bank items (the richness of the burial, why the discovery matters, a diary on the day the tomb is first entered, museums displaying mummies).

**Notes:** 7 sections tagged t01-t03, 2 key terms each; tips with board weight, marking and common mistakes. Notes and flashcards are descriptive; interpretive conclusions are left to the questions. **Flashcards:** 31.

**Question bank (69 items, 133 marks):** case-based 5 (4 marks each, 17 children) · mcq 28 · assertion-reason 6 (keys a, d, a, c, a, b) · true-false 3 · fill-blank 2 · match 2 · ordering 1 · short 2-mark 10 · short 3-mark 6 · long 5-mark 6 (weigh Carter's methods, diary, letter to the editor, assembly speech, ancient and modern memory compared, counterfactual on the scan).
- **MCQ key spread:** a 7, b 7, c 7, d 7.
- **Difficulty:** d1 9 (13%) · d2 26 (38%) · d3 26 (38%) · d4 8 (12%).
- **Competency (after producer review):** recall 14 · understanding 21 · application 8 · analysis 22 · evaluation 4 → **34 of 69 = 49.3% application or higher** (writer: 35 of 69, see the competency review below). The 5 commentary sets are understanding. Higher-order items are standalone MCQs and shorts built on weighing evidence, removing a detail, flawed claims and counterfactuals, plus the long answers.
- **Schemes:** 2-mark = point (1) + explanation (1); 3-mark = point (1) + explanation (1) + expression (1); 5-mark = content 2 + interpretation 1 + organisation, format and expression 2.

**Tests (blueprint ids `cbse-11-default-chapter-test-short` / `-long`, item for item):**
- Short (20 marks, 40 min): A 3 MCQ + 1 A-R · B two 2-mark + one 3-mark · C one choice group of two 5-mark longs (attempt 1) · D one 4-mark case-based.
- Long (40 marks, 90 min): A 8 MCQ + 2 A-R · B 2-mark, 2-mark, a 2-mark choice group, a 3-mark, a 3-mark choice group · C one long + a choice group of two longs · D two case-based.
- The two tests share no item; neither uses a deck-check item (checks use `ord_events`, `m_amarna`, `match_events`, `ar_goods`, `tf_xray`, `fb_hawass`, `m_fail`).

## Competency review (producer, 2026-11-14, Opus)
The writer tagged 35 of 69 higher-order, but many were answered by the chapter's own teaching: the both-sides table on the cutting, the table of what technology can and cannot show, the theories table ("young age fits illness"), the exam tip that the scan did not solve the death, the respect row of the themes table, the 1920s/2005 comparison table, a deck worked example that taught the exact objects-versus-ordinary-life case of `m_objects` and `s2_goods`, and a two-column slide that stated the forward/backward purposes asked for in `s3_memory` and `l_compare`. Several other items had plainly absurd distractors.
- **Teaching changed so that higher-order items stay honest:** deck 1 worked example 1 now models a different case (the richness of the burial); the deck 2 two-column slide on two ways of keeping memory became a descriptive slide of the two casts of people; the respect row of the themes table no longer names the short scan.
- **Retagged** (text unchanged): `m_remove_resin` analysis to understanding, d3 to d2 (the both-sides table states that the defence rests on the body being fixed).
- **Rewritten in place** (ids, types, marks, topics and test slots unchanged):
  - `m_theory_fit` (application): unhealed break: at death or after, healing cannot say which (the old key had a second defensible option).
  - `m_postmortem` (analysis): judging the partly right claim that the 1920s cutting makes every scan finding useless.
  - `m_cut` (analysis): which fact supports the reading that the team did not treat the body as waste (reassembly).
  - `m_delay` (analysis): image count shows completion, not the cost of the delay; plausible distractors.
  - `m_young` (analysis): two readings of who restored the old gods; nine years' rule and death at nineteen make him a child ruler.
  - `m_credit` (analysis): which detail supports the reading that research could go on without the body (the images).
  - `m_limit` (analysis): the name Tutankhamun contains Amun, matching the restoration.
  - `m_objects` (analysis): same question, plausible distractors (everyday items, gold, survival).
  - `m_gold` (analysis): hypothetical framed as "if it were found to be true"; the old key asserted a false record-keeping fact.
  - `m_amun` (application, was a "same spirit" item): reading a temple wall where Amun's name was chiselled away and re-carved.
  - `m_trailer` (analysis to application, d2 to d3): why slice images can show more than flat X-rays.
  - `m_evidence` (analysis): plausible distractor pairs (age and missing bones; an unhealed break).
  - `m_both` (analysis, d3 to d4): support and warning for a knowledge-versus-harm rule; plausible distractor pairs.
  - `ar_cut` (analysis): now both true, R not explaining A (R is the defence, not the ground of the criticism); the old A was decided by an obviously false "only ... steal".
  - `s2_hours` (analysis): tomb or museum laboratory after the scan: one argument for each.
  - `s2_theories` (analysis): counterfactual: if the chest bones were proved removed in the 1920s.
  - `s2_museum` (application): move a fragile mummy now or wait for a mobile scanner, using the 2005 case.
  - `s2_critic` (analysis to evaluation): no backup part: the two choices and which to take.
  - `s3_compare` (analysis): 1968 X-rays against the 2005 scan on what each showed and what each did to the debate.
  - `s3_memory` (analysis): the irony that a tomb sealed for the afterlife is why the world knows him.
- **Fact fixes:** the cutting is dated the 1920s, some time after the discovery, everywhere it was dated 1922 (decks, tables, notes, `c_carter`, `s2_balance`, `l_carter`, `l_letter`, `l_compare`, `l_counter`, `m_both`); Hawass is secretary general (the head) of the Supreme Council of Antiquities; Akhenaten is no longer called Tutankhamun's predecessor (`c_dynasty`, `m_amarna`, `s2_restore`); `c_saga` no longer says the piece moves in time order; `c_scan` no longer says the scan answered the old question; `l_diary` gives the date and drops "this morning"; `l_speech` grammar; two 3-mark models padded to 50 words.
- **D-036:** no quotation or close paraphrase found in decks, notes, cards or items; narration "fixed fast" reworded. Guard list replaced: 18 phrases the producer is confident are the feature's own (the writer's list held several generic or doubtful phrases).
- Every objective key and child re-answered blind; schemes total the item marks; tests unchanged and still share no item and use no deck-check item. Two builds give identical md5 (`release.json` 9802fda369ed3f4e8cb62d06eb546f49, `tests.json` 10ffb8ff5bf8dfa3fc7bcd9d15788acb).

## Guard phrase count
18 phrases (each at most 4 words), checked in `release.json`, `tests.json` and `README.md`: **none found**.
