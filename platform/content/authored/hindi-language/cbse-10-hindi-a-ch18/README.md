# CBSE Class 10 Hindi A, Chapter 18 — रचनात्मक लेखन

| | |
|---|---|
| Unit | `cbse-10-hindi-a-ch18` (family `hindi-language`) |
| Board section | खंड घ — रचनात्मक लेखन, 20 marks: अनुच्छेद ~120 words (6) · पत्र ~100 (5) · स्ववृत्त or ई-मेल ~80 (5) · विज्ञापन or संदेश ~40 (4) |
| Syllabus | `platform/catalog/cbse/10/hindi-a/syllabus.yaml` (2026-27, `source_status: unverified`): t01 अनुच्छेद, t02 पत्र, t03 स्ववृत्त, t04 ई-मेल, t05 विज्ञापन, t06 संदेश |
| Files | `release.json` (2 decks, 7 notes sections, 29 flashcards, 68 questions with 8 draft-passage children), `tests.json` (short 20 / 40 min, long 40 / 90 min), `src/` (build sources; uses `../cbse-10-hindi-a-ch01/src/lib.mjs`) |
| Status | `draft` on every item (D-025/D-026 hand-authored content) |
| Author | `claude-opus-5-5 (subject-producer)`, provenance `origin: human`, 2026-10-27 |

Rebuild from `platform/`: `npx tsx content/authored/hindi-language/cbse-10-hindi-a-ch18/src/build.mjs`.

## Scope and approach

- **Writing tasks use contract v2 `writing`.** All 27 tasks carry `format` (`paragraph`, `letter-formal`, `letter-informal`, `resume`, `email`, `advertisement`, `message`), `word_limit` and a `rubric` whose criteria sum to the marks. The `marking_scheme` mirrors the rubric. Model answers are complete and in the correct format, with Markdown hard line breaks for address and sign-off lines.
- **Word limits.** The board says "लगभग 120/100/80/40 शब्द"; `word_limit` is set to about ±10% of that figure: अनुच्छेद 110–130, पत्र 90–110, ई-मेल and स्ववृत्त 70–90, विज्ञापन and संदेश 35–45. Model answers are inside the lint band (±20%), and the format lines (address, date, sign-off) count toward the total.
- **Rubrics (SOYL, modelled on the CBSE marking style; check against the 2026-27 marking scheme):**
  - अनुच्छेद 6: आरंभ 1 · विषय-वस्तु 3 · समापन 1 · भाषा और प्रस्तुति 1.
  - पत्र 5: आरंभ और अंत की औपचारिकताएँ 1 · विषय-वस्तु 3 · भाषा 1.
  - ई-मेल 5: प्रारूप 1 · विषय-वस्तु 3 · भाषा 1.
  - स्ववृत्त 5: प्रारूप 1 · विवरण 3 · भाषा और प्रस्तुति 1.
  - विज्ञापन 4: प्रस्तुति 1 · विषय-वस्तु 2 · भाषा और नारा 1.
  - संदेश 4: प्रारूप 1 · विषय-वस्तु 2 · भाषा 1.
- **Letters.** Five formal letters (complaint to a health officer, two letters to an editor, a request to a principal, a request to a transport corporation) and one informal letter, because topic t02 names both. The decks teach that recent board papers ask for the **formal** letter.
- **Exam conventions.** Names and addresses follow the exam practice of "परीक्षा भवन" and "क ख ग" unless the stem gives a name.
- **Contact details are placeholders.** E-mail addresses and phone numbers are banned in student content (lint `banned.contact`), so models write "(आपका ई-मेल पता)" or a dotted line. The notes and decks explain this.
- **सूचना** (notice) is not in the 2026-27 Hindi A writing list in the syllabus file (it is a Hindi B item), so it is not covered. If the board adds it, it needs a new topic id first.
- **Originality.** Every task, situation, name, slogan and model is SOYL's; deck examples (speed-breaker letter, books paragraph, sports-assistant CV, library e-mail, cycle-repair advertisement, New Year message) are separate from the question models, so no key text appears in served content.

## Counts

- **Questions: 68 (189 marks) + 8 children in 2 draft-based case items.**
  - writing 27: paragraph 6 (6 marks), letters 6 (5), resume 3 (5), e-mail 4 (5), advertisement 4 (4), message 4 (4).
  - Other types: mcq 17, true-false 5, fill-blank 4, match 2 (right column shuffled), ordering 3 (letter parts, e-mail parts, jumbled paragraph), assertion-reason 4 (keys a, b, c, d), short 2-mark 4 (register conversion, subject line + opening, slogans, e-mail errors), case-based 2 (a flawed draft letter and a flawed draft advertisement; part (घ) of the letter has an `alternatives` choice).
  - By topic: t01 11, t02 20, t03 7, t04 11, t05 11, t06 7, plus 1 cross-topic match.
  - Difficulty: d1 12, d2 34, d3 19, d4 3.
  - Competency: application or higher on 62% of items and 84% of marks; writing tasks are application (bloom create), with argumentative tasks marked analysis/evaluation.
- **Flashcards:** 29. **Notes:** 7 sections + exam tips. **Decks:** Part 1 अनुच्छेद और पत्र (17 slides), Part 2 स्ववृत्त, ई-मेल, विज्ञापन, संदेश (18 slides); 3 checks each; narration in Devanagari only.
- **Tests (no shared questions):**
  - Short (20 marks, 40 min): A 5 objective · B अनुच्छेद 1 of 2 (6) · C पत्र 1 of 2 (5) · D विज्ञापन/संदेश 1 of 2 (4).
  - Long (40 marks, 90 min): A 8 objective · B draft letter (4) · C two 2-mark items · D अनुच्छेद 1 of 3 (6) · E पत्र 1 of 2 (5) · F स्ववृत्त/ई-मेल 1 of 2 (5) · G विज्ञापन 1 of 2 (4) · H संदेश 1 of 2 (4).
  - `blueprint_id` is null. The hindi-a chapter-test blueprints (revised by catalog QA in 47a7185) are literature-shaped: a 5-mark extract, 1-mark MCQ/AR, 2-mark shorts and 4-mark longs. They do not describe a writing-skills test, and their notes say non-literature chapters carry a null `blueprint_id`. These tests mirror खंड घ instead.

## Verifier record (author pass, 2026-10-27)

- **Objective keys:** 41/41 objective items and children re-solved from the stems; all agreed. The ordering items were checked for a single defensible sequence (in the jumbled paragraph, the pronoun links "वे" and "उन्हें" fix the order).
- **Fixes made in the pass:**
  - Four message models were 51–56 words for a 35–45 limit; trimmed to 40–46.
  - One MCQ solution repeated a deck sentence about slogans (a 60+ character answer leak); it was reworded.
  - Two harder tasks were raised to d4: the editor letter that needs solutions, and the e-mail that needs a suggestion.
- **Formats checked:** every letter has the parts in the taught order; every e-mail has प्रेषक/प्रति/विषय; every CV ends with a घोषणा; every message has दिनांक, समय, संबोधन and प्रेषक; every advertisement has a slogan, features and a contact or place.

## Validation

- `npm test -w @soyl/content-templates`: 7/7 checks for this chapter.
- `npm run content -- lint --exemplars`: 0 errors and 0 warnings for this unit.
- `npm run content -- verify --authored --board cbse --class 10 --subject hindi-a`: 0 blocking flags.
- Exemplar Hindi validator: NO ERRORS, 0 warnings. Its objective-type list was extended with `ordering` and `code-output` (contract v2).

## Reviewer checklist (writing skills)

- [ ] Each model fits its format and rubric, and is within the word limit.
- [ ] Rubric splits match the 2026-27 CBSE Hindi A marking scheme; adjust `R_*` in `src/questions.mjs` if they differ.
- [ ] The tasks are realistic for a Class 10 student and free of real brand or person names.
- [ ] Orthography: गए/गई, लिए, चाहिए; nukta is consistent (ज़रूरत, ख़राब, फ़ोन, क़दम).

## Known gaps

- The rubric splits and the e-mail field order (प्रेषक, प्रति, प्रतिलिपि, विषय) follow common CBSE practice. They were not re-read from the 2026-27 marking scheme.
- The writing items are self- or AI-evaluated. The rubric descriptors are written so an evaluator can award marks criterion by criterion.
