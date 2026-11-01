# ICSE Class 10 History & Civics, Chapter 5 — The Supreme Court

`icse-10-history-civics-ch05` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) in the ICSE 2027 History & Civics specimen pattern (`icse-2027-specimen-501-history-civics`, used for pattern only). Built from `src/` with the shared lib `../icse-10-history-civics-ch01/src/lib.mjs`, which is imported, not copied. Run from `platform/`: `npx tsx content/authored/social-science/icse-10-history-civics-ch05/src/build.mjs`.

The build checks:
- the schema, the pipeline lint and the deterministic verify checks;
- the originality pre-check (exact stem prose against every other chapter);
- word limits, narration rules, the answer-leak scan and the editorial counts.

It then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 16 + 17 slides, 23 of them with a visual (2 SVG figures plus tables and flows); notes in 6 sections; 30 flashcards; 79 questions worth 177 marks |
| `tests.json` | `t_icse10historycivics_ch05_short` on `icse-10-history-civics-chapter-test-short` (20 marks, 30 min): Part I has 5 MCQ + 1 AR + 2 × 2-mark; Part II is one of two 10-mark questions. `t_icse10historycivics_ch05_long` on `icse-10-history-civics-chapter-test-long` (40 marks, 60 min): Part I has 9 MCQ + 1 AR + 5 × 2-mark; Part II is two of three 10-mark questions. The two tests share no items and use no deck-check item. |
| `src/` | `questions.mjs` (the bank, two SVG figures and the asserted vote counts) and `build.mjs` (figures, decks, notes, flashcards and tests) |

## Scope

All five syllabus topics are covered:
- **t01** Composition, qualifications, appointment and removal
- **t02** Independence of the judiciary
- **t03** Original, appellate and advisory jurisdiction
- **t04** Review of its own judgments, judicial review and Court of Record
- **t05** Writs under Article 32

### Decks
- **Part 1** (16 slides): worked examples on which imagined candidates qualify, and on counting the special majority. Check slides use `m_head_judiciary`, `m_njac`, `m_retire` and `m_discuss`.
- **Part 2** (17 slides): worked examples on sorting matters by jurisdiction, and on choosing the writ. Check slides use `m_orig_meaning`, `tf_advisory_citizen`, `m_review` and `m_writ_name_count`.
- Narration is at most 75 words per slide (mean 53), with no symbols or abbreviations.

## Question bank (79 items, 177 marks)

| Type | Count | Notes |
|---|---|---|
| mcq | 37 | Keys a9 b9 c10 d9. Two MCQs carry an SVG: the court hierarchy and the jurisdiction hub. |
| assertion-reason | 6 | ICSE option order, set by verdict; keys c, a, d, b, c, a |
| true-false | 5 | |
| fill-blank | 3 | |
| match | 2 | Writs carry 5 marks (1 per pair) |
| ordering | 1 | Steps to remove a judge |
| short 2-mark | 10 | |
| short 3-mark | 5 | |
| long 10-mark | 7 | Each in 3 + 3 + 4 parts, with per-part step marks summing to 10 |
| source-based | 3 | Imagined documents: a junior advocate's diary on a detention, a newspaper report on a State dispute and a review plea, and seminar notes on appointments. Each has an either/or part (c). |

- **Difficulty:** d1 10, d2 34, d3 32, d4 3.
- **Competency:** recall 18, understanding 20, application 21, analysis 16, evaluation 4. That puts 52% of items at application or above (lint band 45–65%).
- **Asserted vote counts:**
  - A majority of the total membership is 272 of 543 and 123 of 245.
  - Two-thirds of 480 present is 320, and of 210 present is 140.
  - In the imagined votes, the Lok Sabha passes the address (330 votes) and the Rajya Sabha does not (131 votes).

## Facts a reviewer should double-check

1. **Composition (Article 124):** the Chief Justice of India and up to 33 other judges, so a sanctioned strength of 34 ("as of 2024", since the Supreme Court (Number of Judges) Amendment Act, 2019). Parliament fixes the number by law. The Court sits in Delhi, or elsewhere as the Chief Justice decides with the President's approval.
2. **Qualifications:** a citizen of India who has been a High Court judge for 5 years, or an advocate of a High Court for 10 years, or is a distinguished jurist in the President's opinion. Judges retire at 65 (High Court judges at 62, mentioned only in exam tips).
3. **Appointment:**
   - The President appoints the judges.
   - In practice the names come from a collegium of the Chief Justice and the senior-most judges. This practice is described as shaped by Supreme Court judgments of 1993 and 1998 (the "Second and Third Judges cases").
   - The National Judicial Appointments Commission (99th Amendment and an Act of 2014) was struck down in 2015.
   - The senior-most judge is usually appointed Chief Justice; this is stated as a convention.
4. **Removal (Article 124(4), Judges (Inquiry) Act 1968):**
   - The only grounds are proved misbehaviour or incapacity.
   - A motion is admitted in a House, and an inquiry committee examines the charge.
   - Each House must pass an address, in the same session, by a majority of its total membership and two-thirds of members present and voting.
   - The President then orders the removal.
5. **Independence:**
   - Security of tenure.
   - Salaries charged on the Consolidated Fund and not reducible after appointment except in a financial emergency (Article 125; Article 360).
   - No discussion of a judge's conduct in Parliament except on a removal motion (Article 121).
   - Contempt power (Article 129).
   - No practice in any court in India after retirement (Article 124(7)).
   - Separation of the judiciary from the executive (Article 50, a Directive Principle).
6. **Original jurisdiction (Article 131):**
   - It covers disputes between the Union and one or more States, between the Union and some States against other States, and between two or more States.
   - Exceptions such as inter-State water disputes (Article 262) are not taught.
7. **Appellate jurisdiction:**
   - Constitutional appeals, on a certificate of a substantial question about interpreting the Constitution.
   - Civil appeals, on a substantial question of law of general importance.
   - Criminal appeals, for example a death sentence after a High Court reverses an acquittal.
   - Special leave under Article 136, from any court or tribunal except armed forces tribunals.
8. **Advisory jurisdiction (Article 143):** only the President may refer a question. The opinion guides but does not bind like a judgment.
9. **Other powers:** review of its own judgments (Article 137); Court of Record (Article 129); law declared by the Court binds all courts (Article 141). Judicial review is described in general terms, and no specific judgment is evaluated.
10. **Writs (Article 32, itself a Fundamental Right):**
    - The five writs are habeas corpus, mandamus, prohibition, certiorari and quo warranto, with their standard meanings.
    - Prohibition comes before a decision and certiorari after it.
    - The `tf_art32_right` solution says Dr B. R. Ambedkar "regarded it as among the most important provisions". This is a paraphrase, not a quotation.
11. **Excluded:** no judge is named, no real person is quoted, and no real case is evaluated. Every scenario is imagined and labelled as such.

## Verifier pass

- **Build:** NO ERRORS; pipeline lint 0 errors and 0 warnings; the deterministic verify checks raise 0 flags.
- **Rebuild:** two builds give byte-identical `release.json` and `tests.json`.
- **Duplicate stems:** the 5-gram near-duplicate scan (the originality gate's rule) compared 79 stems with about 23,900 others and found 0 flags. The lib's exact-stem check also passes.
- **SVG labels:** the overflow and overlap check finds 0 issues in the 4 figures (two SVG builders, used on slides, in notes and in question assets).

## Gaps

- **Rendering:** nobody has seen the SVG labels or the wide removal-vote table rendered, so they need a look at 360 px on staging.
- **Audio:** no narration audio yet (TTS stage).
