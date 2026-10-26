# Exemplar: CBSE Class 10 Hindi A, Chapter 10 — बालगोबिन भगत (रामवृक्ष बेनीपुरी)

| | |
|---|---|
| Unit | `cbse-10-hindi-a-ch10` (family `hindi-literature`) |
| Book | NCERT क्षितिज भाग 2, गद्य खंड · genre: रेखाचित्र |
| Syllabus | `platform/catalog/cbse/10/hindi-a/syllabus.yaml` (2026-27, `source_status: unverified`): t01 लेखक-परिचय और पाठ का प्रसंग · t02 पाठ का सार · t03 पात्र-चित्रण · t04 मूल भाव, संदेश और भाषा-शैली · t05 गद्यांश आधारित प्रश्न-अभ्यास |
| Board weight | खंड ग, क्षितिज गद्य 11 marks: पठित गद्यांश 5 × 1 MCQ + "4 में से 3" × 2 marks (25–30 words) |
| Files | `release.json` (1 deck of 21 slides, 7 notes sections, 28 flashcards, 68 questions with 29 passage children), `tests.json` (short 20, long 40) |
| Status | `draft` on every item until the Lead signs off |

## THE rule: literature is taught without reproducing the text

CONTEXT §8: *"Literature chapters: write summaries, themes, character sketches, literary devices, word meanings and questions. Do not reproduce poems, stories or play text; tell the student to read the text in their own textbook."*

This is the single most important rule for the `hindi-literature` (and `english-literature`) family. This exemplar shows how to apply it, and the pipeline and the content-verifier must enforce it as **critical**.

**What is allowed**
- Facts and events of the lesson, **retold in SOYL's own words** (who did what, in what order, why).
- **Individual words** from the lesson for शब्दार्थ (पतोहू, कलेवा, पुरवाई, श्रमबिंदु …) and single-word examples of style (देशज/तत्सम words).
- Titles, author names, genre and author biography (factual).
- Interpretation: themes, character analysis, message, relevance, comparison.

**What is not allowed** (each was found in a first draft and removed; see "Verifier pass")
- Any sentence of the lesson, or a **close paraphrase** that keeps the author's sentence frame with a few words swapped (e.g. a conduct list in the author's order and wording, a character's plea rebuilt clause by clause, a speech at a death scene, the "everyone reacted to his song" set-piece).
- **Distinctive phrases** of the author, even short ones ("निर्णय अटल", "हँसकर टाल देते", "रोने के बदले उत्सव", "पतोहू से ही आग दिलाई", "श्राद्ध की अवधि पूरी होने पर", "आषाढ़ की रिमझिम").
- **Retelling a specific paragraph image by image**, in the author's order, even in new words. Summaries are organised by **theme** (गृहस्थ संत → संगीत-भक्ति → दुख में विश्वास → बहू का भविष्य → अंत), not as a paragraph-by-paragraph walk through the text.
- Copying NCERT's own exercise questions.

**How the board's "पठित गद्यांश" item is handled.** The board prints a passage from the textbook and asks 5 MCQs. SOYL cannot print that passage. Instead, items `s1`–`s5` (type `source-based`, 5 × 1 mark) use **SOYL-written commentary paragraphs**: an interpretive paragraph *about* an episode (its context, meaning, relevance), labelled in the stem "(यह अनुच्छेद SOYL द्वारा लिखी गई टिप्पणी है, पाठ का अंश नहीं। मूल पाठ अपनी पाठ्यपुस्तक क्षितिज भाग 2 में पढ़ें।)". Children test comprehension of *that* paragraph plus lesson knowledge. `s6` is an original present-day case (a fictional cycle-repairer, labelled काल्पनिक) that applies the lesson's central idea. Students practise the real textbook passages from their own book; the notes (section 7) and exam-tips say so.

**Repeated pointers to the textbook.** The title slide, slide 2 ("इस पाठ को कैसे पढ़ें"), the summary slide, notes sections 1 and 3, and the passage stems all tell the student to read the lesson in क्षितिज भाग 2.

**Pipeline enforcement (recommended).** (1) The literature templates require a self-check against reproduction; (2) the verify template treats any echo as critical; (3) a lint that flags quoted spans of 8+ words for human review (the validator below does this; all 9 flagged spans here are SOYL's own sentences); (4) when licensed text is available to the pipeline in future, an n-gram overlap check against it (e.g. any shared 6-gram → fail).

## Why it is the standard

### 1. Deck shape (21 slides, one deck)
title (with board pattern table) → how to use this lesson → author (table) → genre: कहानी vs रेखाचित्र (two-column) → सार 1–6 by theme (table, bullets, a season-cycle `flow`) → check → पात्र-चित्रण (गुण + प्रसंग table) → बहू और लेखक → check → मूल भाव → रूढ़ि vs विवेक (two-column) → भाषा-शैली → शब्दार्थ table → check → summary (event-chain flow) → exam tips. Visuals on 7 slides (5 tables, 2 flows) where they teach: author facts, character evidence, word meanings, the seasonal cycle of his music.

### 2. Narration (hi-IN TTS)
Natural spoken Hindi, 21 slides, max 70 words (mean 58), no Latin letters, digits (years are spoken: "सन् अठारह सौ निन्यानवे"), quotes or symbols. It interprets ("यह कठोरता नहीं, करुणा थी") rather than narrating the text.

### 3. Question bank: 68 items (+29 passage children), 133 marks
- **By type:** mcq 22 · short 2-mark (25–30 words) 17 · long 4-mark (60–80 words) 7 · source-based 5 (5 × 1 each) · case-based 1 (4 × 1) · true-false 5 · match 4 (columns shuffled) · fill-blank 3 · assertion-reason 4 (keys a, c, a, d).
- **By topic (parent tags):** t01 8 · t02 24 · t03 20 · t04 21 · t05 6.
- **Difficulty (all 91 gradable units):** d1 21 · d2 46 · d3 20 · d4 4.
- **Competency:** application or higher is 26% of parent items, 30% of gradable units and 38% of marks. Literature recall/understanding legitimately dominates the board's prose section; the higher-order items are deliberate: values applied to a new situation (`b59` widow remarriage in the neighbourhood, `b62` who lives by Bhagat's ideals), evaluation (`b40` "आचरण vs वेश", `b51`, `b55`, `b60` दृढ़ता या हठ), creative application (`b61` diary entry), and inference/title children in every passage.
- **2-mark model answers keep to 26–36 words; 4-mark models to 63–76 words**, so the model shows the limit being kept. Schemes split 1 + 1 (fact + inference) and 1 × 4 (four points).
- **Questions never quote the lesson.** They reference events in SOYL's words ("बेटे की मृत्यु पर…", "श्राद्ध के बाद…").

### 4. Chapter tests
- **Short (20 marks, 40 min):** A one commentary passage (5 × 1) · B 5 objective · C short "4 में से 3" × 2 · D long "2 में से 1" × 4.
- **Long (40 marks, 80 min):** A two passages (10) · B 8 objective · C short "6 में से 5" × 2 · D long "4 में से 3" × 4.
- The two tests share no questions.

## Devanagari and typography notes
- NFC on every string (precomposed nukta letters decompose under NFC; that is expected).
- NCERT standard forms: गए/गई, लिए, चाहिए, जाएगा; बेनीपुरी (not बेनीपूरी), मुज़फ़्फ़रपुर, साँस, सँभालना; chandrabindu vs anusvara as printed by NCERT; nukta used consistently (validator check).
- "पतोहू" is used where the lesson's vocabulary is being taught; elsewhere SOYL text says "बहू", which also keeps us away from the author's phrasing.
- Gender of nouns in narration must be right (खेत **का** कीचड़; the re-audit caught one slip).

## Pitfalls the pipeline must avoid
1. **Close paraphrase passing as "own words".** Swapping a few words in the author's sentence is still reproduction. Change the frame: summarise, interpret, reorder by theme.
2. **Practice passages that retell a textbook paragraph.** Write commentary *about* the episode instead.
3. **Overclaiming facts** (distances, exact places, "weak before the trip"). State only what the lesson supports; leave out uncertain details.
4. **Quoting famous lines in stems** ("…इस कथन का आशय स्पष्ट कीजिए" with a textbook line). Quote only SOYL's own sentences.
5. **Over-length model answers.** A 2-mark model of 50 words teaches the wrong habit.
6. **Match items keyed in order** (l1→r1, l2→r2…) are guessable; shuffle the right column.
7. **Moralising instead of analysing.** Character answers need trait + incident; value answers need an opinion + text-based reason.
8. **Hinglish or English loanwords** in narration; **Latin letters or digits** in narration.

## Content-verifier checklist (hindi-literature)
- [ ] **No reproduction (critical):** scan decks, narration, notes, flashcards, stems, options, solutions, model answers and passages for any sentence, sentence frame or distinctive phrase of the original text; check that passages are SOYL commentary, not paragraph retellings.
- [ ] Every fact matches the lesson; nothing invented or overclaimed; author facts correct.
- [ ] Re-solve every item blind; keys right; no defensible second option.
- [ ] Model answers within word limits; schemes add up and are gradable.
- [ ] Textbook pointers present (title slide, notes, passage stems).
- [ ] Topics only from the syllabus; board pattern (5 × 1 passage MCQs, 2-mark short) respected.
- [ ] Orthography, nukta, chandrabindu, NFC; natural Hindi; narration within limit and TTS-safe.

## Verifier pass (2026-10-26)
An independent verifier (separate agent) answered all 68 questions and 29 passage children **blind** before reading keys, checked facts against the lesson, and audited every file for reproduction — **twice**.

- **Pass 1:** 97/97 keys agreed; facts correct (no invented numbers or places). **Not compliant on reproduction:** no copied paragraph, but 13 clusters of close paraphrase or distinctive phrasing. These were the conduct triplet and "खरा व्यवहार"; the पतोहू's plea; the death-scene speech; "रोने के बदले उत्सव"; "पतोहू से ही आग दिलाई"; "निर्णय अटल"; "हँसकर टाल देते"; "गीत नहीं सुना… जाकर देखा"; the शीत/श्रमबिंदु contrast; "इसी कारण और भी मानते"; "प्रसाद रूप में… गुज़र"; "कार्तिक आया नहीं कि…"; "श्राद्ध की अवधि". In addition, four practice passages were image-by-image retellings of textbook paragraphs. It also flagged over-length model answers (2-mark up to 59 words, 4-mark up to 106), in-order match keys, a small factual slip ("पास बुलाकर"), unsupported "बचपन में देखा" and orthography (सांस, संभाल).
- **Fixes:** all five practice passages rewritten as SOYL commentary; slides s05–s10 and notes sections 3–4 rebuilt by theme; every flagged phrase removed across all files; every over-length model answer trimmed; match columns shuffled; the s6 character labelled काल्पनिक; orthography fixed.
- **Pass 2 (re-audit):** **compliant** — "no sentence or close paraphrase of the lesson remains"; 97/97 keys agreed. Minor follow-ups applied: one narration phrase reworded, आषाढ़ named in the s2 passage so its child needs no outside knowledge, "कमज़ोर शरीर" overclaim removed, a noun-gender slip (खेत का कीचड़) fixed, and conduct points reordered.

The author's own pre-verifier review had already reworded three echoes (the rope-planting reactions, the eat-before-and-after rule, the भादो line) and added four application/evaluation items.

Validator output (scratch script; source in the M1 handoff):
```
deck: 21 slides (7 visuals); narration max 70, mean 58
questions 68 (133 marks); passage children 29; AR keys a,c,a,d
quoted spans >= 8 words for manual review: 9 (all SOYL-authored)
tests: short 20 marks / 40 min (12 items, A–D); long 40 marks / 80 min (20 items, A–D)
warnings (0)
NO ERRORS
```
