# ICSE Class 10 History & Civics, Chapter 4 — The Prime Minister and the Council of Ministers

`icse-10-history-civics-ch04` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) in the ICSE 2027 History & Civics specimen pattern (`icse-2027-specimen-501-history-civics`, used for pattern only). It is built from `src/` with the shared lib `../icse-10-history-civics-ch01/src/lib.mjs`, which is imported, not copied. To build, run `npx tsx content/authored/social-science/icse-10-history-civics-ch04/src/build.mjs` from `platform/`.

The build checks:
- the schema, the pipeline lint and the deterministic verify checks;
- the originality pre-check (exact stem wording against every other chapter);
- word limits, narration rules, the answer-leak scan and the editorial counts.

It then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (18 + 18 slides, 21 with visuals: 6 SVG figures, the rest tables and flows); notes (6 sections); 30 flashcards; 70 questions (173 marks) |
| `tests.json` | **Short test** `t_icse10historycivics_ch04_short` (20 marks, 30 min) on `icse-10-history-civics-chapter-test-short`: Part I is 5 MCQ + 1 AR + 2 two-mark shorts; Part II is one of two 10-mark questions. **Long test** `t_icse10historycivics_ch04_long` (40 marks, 60 min) on `icse-10-history-civics-chapter-test-long`: Part I is 9 MCQ + 1 AR + 5 two-mark shorts; Part II is two of three 10-mark questions. The two tests are disjoint and use no deck-check item. |
| `src/` | `questions.mjs` (the bank, two SVG helpers and the asserted figures) and `build.mjs` (figures, decks, notes, flashcards and tests) |

## Scope

All five syllabus topics are covered:
- **t01** appointment of the Prime Minister; formation, tenure and size of the Council of Ministers
- **t02** Council of Ministers versus Cabinet; the three ranks of ministers
- **t03** the five functions of the Cabinet
- **t04** collective and individual responsibility
- **t05** position and powers of the Prime Minister

### Decks

- **Part 1:** forming the government. 18 slides, 4 checks.
  - Worked example 1: a hung House of 543, where P plus R gives 309 against a majority of 272.
  - Worked example 2: is a 90-member ministry allowed? No, because the ceiling is 81.
- **Part 2:** Cabinet, responsibility and the Prime Minister. 18 slides, 4 checks.
  - Worked example 1: naming the Cabinet function from four imagined decisions.
  - Worked example 2: collective or individual responsibility in two imagined cases.
- **Checks:** m_tenure, fb_size_amend, m_three_ranks, tf_rs_member_pm, tf_cabinet_tax, m_collective_to, m_portfolio and tf_keystone. None of them is used in a test.
- **Narration:** at most 69 words per slide (mean 48), with no symbols or abbreviations.

### Question bank (70 items)

| Type | Count | Notes |
|---|---|---|
| mcq | 29 | Keys a7 b7 c7 d8. Two read an SVG: the imagined House bar picture and the three-tier ranks diagram. |
| assertion-reason | 5 | ICSE option order; keys c, b, d, c, a |
| true-false, fill-blank, match, ordering | 4, 2, 1, 1 | |
| short 2-mark | 13 | |
| short 3-mark | 4 | |
| long 10-mark | 8 | Each in 3 + 3 + 4 parts, with step marks per part summing to 10 |
| source-based | 3 | Imagined documents: a new Minister of State's diary, a student journalist's letter on a coalition, and a Cabinet meeting summary. Each has an either/or part (c). |

- **Difficulty:** d1 6, d2 33, d3 28, d4 3.
- **Competency:** recall 9, understanding 23, application 16, analysis 19, evaluation 3. That puts 54% of items at application or above (lint band 45–65%).

## Facts for a reviewer to check

All are stable provisions of the Constitution:

1. **Article 74(1):** the Council of Ministers, headed by the Prime Minister, aids and advises the President.
   - The **42nd Amendment (1976)** made the advice binding.
   - The **44th Amendment (1978)** lets the President return it **once** for reconsideration, after which the President must act on it.
2. **Article 75(1):** the President appoints the Prime Minister, and the other ministers on the Prime Minister's advice. The leader of the Lok Sabha majority must be invited; there is **discretion only in a hung House**, described as situational and with no named precedent.
3. **Article 75(1A), 91st Amendment (2003):** the Council of Ministers, including the Prime Minister, may not exceed **15 per cent** of the total strength of the Lok Sabha.
   - With the present membership of **543**, the chapter computes **81** (15 per cent of 543 is 81.45, rounded down).
   - The Lok Sabha figure of 543 is the present elected strength used throughout this subject (see ch01).
4. **Article 75(2):** ministers hold office during the pleasure of the President.
5. **Article 75(3):** collective responsibility to the House of the People (the Lok Sabha).
6. **Article 75(5):** a non-member ceases to be a minister after **six consecutive months** unless elected or nominated.
7. **Oaths:** the President administers the oaths of office and secrecy.
8. **Article 78:** the Prime Minister's duty to communicate to the President the Council's decisions on administration and proposals for legislation, and to furnish information.
9. **Article 352(3):** a national emergency only on the **written decision of the Union Cabinet**, added by the 44th Amendment (1978).
10. **Ranks:** Cabinet Ministers, Ministers of State (some with independent charge, attending the Cabinet when invited) and Deputy Ministers.
11. **Prime Minister from the Rajya Sabha:** possible, provided the Lok Sabha supports the government. `tf_rs_member_pm` is keyed True.
12. **The word "Cabinet":** the chapter says it appears in the Constitution only in the emergency provision (Article 352). This is the commonly taught point; please confirm.
13. **Not stated:** no present or past Prime Minister or minister is named or evaluated, and no date after 2003 is used.

## Data and originality

- **Imagined figures:** the imagined Lok Sabha (P 248, Q 182, R 61, others 52 = 543), the majority mark of 272, the alliance total of 309 and the ceiling of 81 are all computed and asserted in `questions.mjs`.
- **Originality:**
  - Every scenario and document is imagined and labelled as such.
  - No textbook text or exercise, no specimen or board-paper item and no quotation is reused (D-036).
  - The build's exact-stem pre-check passes. A 5-gram near-duplicate scan (the originality gate's rule) over these 70 stems against 23,721 others finds 0 flags.
- **SVG labels:** 6 figures, 0 overflow or overlap issues.

## Gaps

- Nobody has seen the SVG labels (the three-tier diagram, the House bars and the Prime Minister roles diagram) rendered, so they need a look at 360 px on staging.
