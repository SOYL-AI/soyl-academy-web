# ICSE Class 10 History & Civics, Chapter 2 — Parliamentary Procedures and Powers of Parliament

`icse-10-history-civics-ch02` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) in the ICSE 2027 History & Civics specimen pattern (`icse-2027-specimen-501-history-civics`, used for pattern only). Built from `src/` with the shared lib `../icse-10-history-civics-ch01/src/lib.mjs` (imported, not copied). From `platform/`: `npx tsx content/authored/social-science/icse-10-history-civics-ch02/src/build.mjs`. The build checks:
- the schema, the pipeline lint and the deterministic verify checks;
- the originality pre-check (exact stem prose against every other chapter);
- word limits, narration rules, the answer-leak scan and the editorial counts.

It then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (19 + 18 slides, 25 with visuals: 4 SVG, the rest tables and flows); notes (6 sections); 30 flashcards; 71 questions (176 marks) |
| `tests.json` | `t_icse10historycivics_ch02_short` (20 marks, 30 min) on `icse-10-history-civics-chapter-test-short`: Part I 5 MCQ + 1 AR + 2 × 2-mark, Part II one of two 10-mark questions. `t_icse10historycivics_ch02_long` (40 marks, 60 min) on `icse-10-history-civics-chapter-test-long`: Part I 9 MCQ + 1 AR + 5 × 2-mark, Part II two of three 10-mark questions. The two tests are disjoint and use no deck-check item. |
| `src/` | `questions.mjs` (bank, session-strip SVG, asserted figures), `build.mjs` (figures, decks, notes, flashcards, tests) |

## Scope
All seven syllabus topics are covered:
- t01: sessions and quorum
- t02: Question Hour and Zero Hour
- t03: adjournment and no-confidence motions
- t04: Anti-Defection Law
- t05: ordinary and money bills, joint sitting
- t06: powers of Parliament
- t07: exclusive powers of each House

## Question bank (71 items)

| Type | Count | Notes |
|---|---|---|
| mcq | 30 | Keys a7 b7 c8 d8. One MCQ reads an SVG session strip (asset). |
| assertion-reason | 5 | ICSE option order; keys c, b, d, c, a |
| true-false · fill-blank · match · ordering | 4 · 2 · 1 · 1 | The ordering item covers the stages of an ordinary bill |
| short 2-mark | 12 | |
| short 3-mark | 5 | |
| long 10-mark | 8 | Each in 3 + 3 + 4 parts, with per-part step marks summing to 10 |
| source-based | 3 | Imagined documents: a new member's diary, an intern's note on two bills, a voter's letter. Each has an either/or part (c). |

- **Difficulty:** d1 15, d2 33, d3 18, d4 5.
- **Competency:** recall 14, understanding 21, application 16, analysis 15, evaluation 5. That puts 51% of items at application or above.

## Facts for a reviewer to double-check
1. **Sessions:**
   - The President summons and prorogues the Houses, on ministerial advice.
   - There must be at least two sessions a year, with no more than six months between two sessions.
   - The usual sessions are Budget, Monsoon and Winter.
   - Prorogation ends a session, while dissolution ends the Lok Sabha; the Rajya Sabha is never dissolved.
2. **Quorum:** one-tenth of the total membership of a House, including the presiding officer. Worked figures, computed: 55 of 543 (Lok Sabha) and 25 of 245 (Rajya Sabha).
3. **Question Hour and Zero Hour:**
   - Question Hour is normally the first hour of a sitting.
   - Starred questions get an oral answer and allow supplementaries.
   - Unstarred questions get a written answer and allow no supplementaries.
   - Short notice questions are urgent, need less than ten days' notice, and get an oral answer.
   - Zero Hour follows Question Hour. It is a practice and is not in the rules of procedure.
4. **Motions:**
   - An adjournment motion covers a definite matter of urgent public importance, needs 50 members' support, and is used in the Lok Sabha.
   - A no-confidence motion is moved only in the Lok Sabha, needs 50 members to be admitted, and need not state reasons. If it is passed, the whole Council of Ministers resigns (collective responsibility).
5. **Anti-Defection Law:**
   - It is the Tenth Schedule, added by the 52nd Amendment in 1985.
   - Grounds: voluntarily giving up party membership; voting or abstaining against the party's direction without permission (unless condoned); an independent joining a party; a nominated member joining after six months.
   - Exception: a merger with two-thirds of the legislature party. The 91st Amendment (2003) removed the one-third split exception.
   - The Speaker or Chairman decides, and courts may review the decision (Supreme Court, 1992).
6. **Bills:**
   - An ordinary bill goes through three readings in each House.
   - A joint sitting can be called on rejection, on unacceptable amendments, or after six months without action. It is called by the President, presided over by the Speaker, and decided by a majority of members of both Houses present and voting.
   - The President may assent, withhold assent, or return the bill once; if it is passed again, assent must be given.
7. **Money Bill:**
   - It covers taxes, borrowing and the Consolidated Fund.
   - It is introduced only in the Lok Sabha, on the President's recommendation. The Speaker's certificate is final.
   - The Rajya Sabha must return it within 14 days with recommendations only; otherwise it is deemed passed.
   - There is no joint sitting, and the President does not return it.
8. **Powers of Parliament:**
   - It can legislate on the State List under Article 249 (Rajya Sabha resolution, two-thirds of members present and voting), during a national emergency, or at the request of two or more States.
   - No tax may be levied without a law of Parliament.
   - Judicial: it impeaches the President and removes judges.
   - Electoral: it elects the Vice-President, and its elected members take part in electing the President.
   - Amending: some amendments also need ratification by half the States.
9. **Exclusive powers:**
   - Lok Sabha: Money Bills begin there, it votes demands for grants, and it passes no-confidence motions.
   - Rajya Sabha: resolutions under Articles 249 and 312 (two-thirds of members present and voting), and a resolution to remove the Vice-President must begin there.
10. **Membership:** the Lok Sabha's present membership is taken as 543. No current office-holder is named and nothing after 2024 is stated.

## Originality and checks
- **Originality:** every scenario, diary, note and letter is imagined and labelled as written by SOYL. No textbook text or exercise and no specimen or board-paper item is reused (D-036), and no real person is quoted.
- **Duplicate scan:** a 5-gram near-duplicate scan using the originality gate's rule compared these 71 stems with 23,573 others and found 0 flags.
- **SVG labels:** the overflow and overlap estimate finds 0 issues in the 5 figures.
- **Rebuild:** two builds give byte-identical `release.json` and `tests.json`.

## Gaps
- Nobody has seen the SVG figures (the session strips, the sitting-day bar and the House-size bars) rendered at 360 px; they need a look on staging.
