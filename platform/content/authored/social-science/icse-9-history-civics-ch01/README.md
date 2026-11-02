# ICSE Class 9 History & Civics, Chapter 1 — Our Constitution: Meaning, Adoption and Salient Features

`icse-9-history-civics-ch01` · release v1 · academic year 2026-27 · family `social-science` · provenance `human` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032). Built from `src/` with the shared lib `src/lib.mjs` (kept in this folder; every ICSE 9 History & Civics chapter imports it). From `platform/`: `npx tsx content/authored/social-science/icse-9-history-civics-ch01/src/build.mjs`. The build checks the schema, the pipeline lint, the deterministic verify checks, the originality pre-check, word limits, narration rules, the answer-leak scan and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (20 + 19 slides; 16 + 15 with visuals: 5 SVG, the rest tables and flows); notes (6 sections); 31 flashcards; 79 questions (183 marks) |
| `tests.json` | `t_icse9historycivics_ch01_short` (20 marks, 30 min) on `icse-9-default-chapter-test-short`: Section A 4 MCQ + 1 AR + one 2-mark + one 3-mark, Section B one of two 10-mark questions. `t_icse9historycivics_ch01_long` (40 marks, 60 min) on `icse-9-default-chapter-test-long`: Section A 7 MCQ + 1 AR + three 2-mark + two 3-mark, Section B two of three 10-mark questions. The tests share no question and use no deck-check item. |
| `src/` | `questions.mjs` (bank, asserted figures), `build.mjs` (figures, decks, notes, flashcards, tests), `lib.mjs` (shared library, not edited here) |

## Scope
Topics t01–t05 only, as an elementary civics study (no Article text is quoted; Article numbers are not needed and are not used):
- t01: meaning and need of a constitution; Constituent Assembly; dates of adoption and enforcement; why 26 January
- t02: single citizenship, contrast with the USA (optional note on Overseas Citizenship of India)
- t03: universal adult franchise and the voting age
- t04: Fundamental Rights, justiciable, six categories, Constitutional Remedies, the removed right to property
- t05: Fundamental Duties, origin, count, paraphrased list, link with rights

## Question bank (79 items)

| Type | Count | Notes |
|---|---|---|
| mcq | 32 | Keys a8 b8 c8 d8 |
| assertion-reason | 6 | ICSE option order; keys c, b, c, d, a, c |
| true-false · fill-blank · match · ordering | 3 · 3 · 2 · 2 | Match items classify imagined cases; ordering items give dated sequences |
| short 2-mark | 14 | with word limits |
| short 3-mark | 7 | with word limits |
| long 10-mark | 7 | 3 + 3 + 4 with per-part marks summing to 10 |
| source-based | 3 | Imagined documents: a school gazette report on a mock Constituent Assembly, a voters' list extract, a letter to a school magazine. Each has an either/or part (c). |

- **Difficulty:** d1 18, d2 36, d3 21, d4 4.
- **Competency:** recall 20, understanding 21, application 18, analysis 16, evaluation 4 (48% application or above).
- **Deck-check items** (not used in any test): `m_assembly_first`, `tf_adopt_enforce`, `ord_timeline`, `m_vote_age_change` (deck 1); `mt_fr_cases`, `m_fr_remedies`, `m_fd_eleventh`, `ar_rights_duties` (deck 2).

## How verified
- `npx tsx .../src/build.mjs` prints `NO ERRORS`; pipeline lint 0 errors, 0 warnings; narration at most 70 words, no symbols.
- Re-built twice more: `release.json` and `tests.json` byte-identical (md5); no `*.wip.json` left.
- Near-duplicate scan against 28,848 other stems: 0 flags. SVG label overflow and overlap check: 5 figures, 0 issues.
- Computed in code and asserted: 61 days from 26 November 1949 to 26 January 1950; voting ages 21 and 18 (the bar chart is drawn from them); duties 10 and 11 (bar chart); six boxes in the Fundamental Rights figure; timeline positions drawn from the dates.
- Not run (by instruction): tree-wide gates, tests, e2e, any git command.

## Facts for a reviewer to double-check
1. **Meaning and need:** a constitution is the fundamental law that sets up the organs of government, limits their powers and protects rights.
2. **Constituent Assembly:** first met on 9 December 1946; Dr Rajendra Prasad was its President; Dr B. R. Ambedkar chaired the Drafting Committee. The decks say the Assembly discussed the draft over "nearly three years" (about 2 years 11 months), a rounded figure.
3. **Adoption:** 26 November 1949, now observed as Constitution Day (Samvidhan Divas).
4. **Enforcement:** 26 January 1950 (Republic Day). Gap computed as 61 days, "a little over two months".
5. **Why 26 January:** 26 January 1930 was observed as Independence Day after the Purna Swaraj (complete independence) resolution; the date was chosen to honour that pledge. Independence itself came on 15 August 1947.
6. **Single citizenship:** a citizen of India has only citizenship of India, no State citizenship. In the USA a person is a citizen of the nation and of the State of residence (dual citizenship).
7. **Overseas Citizenship of India (optional):** it is not dual citizenship; it gives long-term travel and residence privileges but not the right to vote.
8. **Universal adult franchise:** every adult citizen may vote, regardless of caste, religion, sex, education or wealth, subject to being on the electoral roll and not disqualified by law.
9. **Voting age:** 18 years, lowered from 21 by the 61st Amendment, passed in 1988 and effective 1989. (The solution of `m_vote_age` also states that the minimum age for a Lok Sabha candidate is 25.)
10. **Fundamental Rights:** justiciable; six categories as of 2024: equality, freedom, against exploitation, freedom of religion, cultural and educational rights, constitutional remedies. The right to property was removed from the list by the 44th Amendment (1978) and is now a legal right under a separate provision; the list originally had seven categories.
11. **Examples used:** caste discrimination in public places (equality); speech and expression (freedom); bonded or forced labour and child labour in hazardous work (exploitation); freedom to profess, practise and spread religion; minorities conserving script and running schools; moving the Supreme Court or a High Court (remedies).
12. **Restrictions:** rights are subject to reasonable restrictions such as public order and the security of the State.
13. **Fundamental Duties:** added in 1976 by the 42nd Amendment on the recommendation of the Swaran Singh Committee (ten at first); the eleventh (parents and guardians to provide opportunities for education to a child aged six to fourteen) was added by the 86th Amendment in 2002; eleven as of 2024. The duties are paraphrased in the decks, notes and items; none is quoted.
14. **Enforcement of duties:** the Constitution gives no direct court remedy for duties as it does for rights (the items say Parliament may make laws on some of the matters).

Dated notes in the chapter: "as of 2024" for six categories of rights and eleven duties.

## Unsure or not done
- Item 2 ("nearly three years") is a rounded, commonly taught summary; a reviewer may prefer to drop the duration.
- The 61st Amendment is dated "1988, effective 1989" everywhere; confirm the exact commencement day if a reviewer wants one.
- The Fundamental Rights figure gives one-line examples under each name, paraphrased, not Article text.
- No Article numbers are used anywhere in the chapter; the brief allows them but none was needed.
