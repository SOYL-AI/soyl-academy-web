# ICSE Class 10 History & Civics, Chapter 10 — The Muslim League and the Lucknow Pact

`icse-10-history-civics-ch10` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) in the ICSE 2027 History & Civics specimen pattern (`icse-2027-specimen-501-history-civics`, used for pattern only). It is built from `src/` with the shared lib `../icse-10-history-civics-ch01/src/lib.mjs`, which is imported, not copied. Run from `platform/`: `npx tsx content/authored/social-science/icse-10-history-civics-ch10/src/build.mjs`.

The build checks:
- the schema, the pipeline lint and the deterministic verify checks;
- the originality pre-check (exact stem prose against every other chapter);
- word limits, narration rules, the answer-leak scan and the editorial counts.

It then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 17 + 16 slides, 26 of them with a visual (2 SVG figures, plus tables and flows); notes in 6 sections; 30 flashcards; 77 questions worth 179 marks |
| `tests.json` | Two tests; they share no items and use no deck-check item. |
| `src/` | `questions.mjs` (the bank, the two SVG builders and the asserted event years) and `build.mjs` (figures, decks, notes, flashcards and tests) |

The two tests in `tests.json`:
- `t_icse10historycivics_ch10_short` on `icse-10-history-civics-chapter-test-short` (20 marks, 30 min). Part I has 5 MCQ, 1 AR and 2 × 2-mark. Part II is one of `l_formation` and `l_pact_terms`.
- `t_icse10historycivics_ch10_long` on `icse-10-history-civics-chapter-test-long` (40 marks, 60 min). Part I has 9 MCQ, 1 AR and 5 × 2-mark. Part II is two of `l_objectives`, `l_pact_evaluate` and `l_compare_1906_1916`.

## Scope

All three syllabus topics are covered:
- **t01** formation and factors: the background (divide and rule as a nationalist view, backwardness, Sir Syed Ahmad Khan), the Partition of Bengal, the Simla Deputation and the founding at Dacca.
- **t02** objectives of 1906, separate electorates (1909) and the change of aims by 1913.
- **t03** the Lucknow Pact: its parties, leaders, terms and impact (both views), and the Congress reunion at the same session.

### Decks

- **Part 1** (17 slides): background, formation and objectives. It has 3 check slides and 2 worked examples: a 3-mark answer on factors, and sorting factors from objectives.
- **Part 2** (16 slides): from separate electorates to Lucknow. It has 4 check slides and 2 worked examples: planning a 10-mark answer, and a balanced 2-mark answer.
- **Narration:** at most 71 words a slide (mean 49), with no symbols and no quotations.

### Question bank (77 items)

| Type | Count |
|---|---|
| mcq | 34 (keys a8 b9 c8 d9; 7 are application items set in imagined scenarios) |
| assertion-reason | 6 (ICSE option order, set by `verdict`; keys c, a, d, b, c, a) |
| true-false | 5 |
| fill-blank | 3 |
| match | 1 |
| ordering | 1 |
| short 2-mark | 12 |
| short 3-mark | 4 |
| long 10-mark | 8, each in 3 + 3 + 4 parts with step marks; two read an SVG |
| source-based | 3 (imagined student diary, imagined lawyer's letter, SOYL timeline); each has an either/or part (c) |

- **Difficulty:** d1 12, d2 32, d3 28, d4 5.
- **Competency:** recall 21, understanding 20, application 11, analysis 20, evaluation 5. That puts 47% of items at application or above, inside the lint band of 45–65%. (superseded: see Competency audit 2026-11-05)
- **Retag note:** the first build was at 39%, so I added seven scenario-identification items (six MCQs and a 2-mark short) in place of three plain recall MCQs. No existing tag was raised.

## Facts a reviewer should double-check

- **Founding of the League:** 30 December 1906 at Dacca (Dhaka), at a meeting held during the session of the All India Muhammadan Educational Conference. **Nawab Salimullah** of Dacca hosted it, and **Aga Khan III** became the first President. This is the usual school wording; the founding session itself was chaired by another leader, who is not named here.
- **Simla Deputation:** October 1906, led by Aga Khan III. It met the Viceroy **Lord Minto** (1905–1910) and asked for separate electorates and fair representation.
- **Partition of Bengal:** 1905 under **Lord Curzon**. Eastern Bengal and Assam had a Muslim majority, and some Muslim leaders welcomed it. The partition was annulled in **1911**; Lord Hardinge appears only as a wrong option and in its solution.
- **Sir Syed Ahmad Khan:** founded the Muhammadan Anglo-Oriental College, Aligarh, in **1875**, and died in 1898. He advised Muslims to keep away from the Congress at that stage; this is paraphrased, not quoted.
- **Objectives of 1906:** loyalty to the British government; protecting and advancing Muslims' political rights and placing their needs before the government; preventing hostility towards other communities. All three are paraphrased.
- **Separate electorates:** introduced by the Indian Councils Act, **1909** (Morley-Minto Reforms).
- **New aim, 1913:** the League adopted self-government suited to India. **Jinnah** joined the League in 1913 while remaining in the Congress.
- **Lucknow Pact:** December **1916**; the Congress and the League both held their sessions at Lucknow. **Bal Gangadhar Tilak** and **Muhammad Ali Jinnah** are the leaders most associated with it. **Ambika Charan Mazumdar** presided over the 1916 Congress session, and **Annie Besant** presided in 1917 (used in a distractor).
- **Terms (paraphrased):** a joint demand for self-government; enlarged councils with an elected majority; separate electorates accepted by the Congress; Muslim seat shares fixed province by province. No exact seat percentages and no Pact text are given.
- **Congress reunion:** the Moderates and Assertive Nationalists split at Surat in **1907** and reunited at Lucknow in **1916** (9 years apart, asserted in code).
- **Distractor facts:** Badruddin Tyabji presided over the Congress in 1887; the Congress adopted complete independence at Lahore in 1929. Both appear in solutions only.
- **Impact:** short-term unity is given alongside both long-term views on separate electorates, with no verdict imposed.
- **Neutral wording:** "divide and rule" is always presented as the nationalists' view. No community or leader is judged, no one is quoted, and every letter, diary, pamphlet and quiz card is imagined and labelled.

## Originality

- **No reuse:** no textbook text or exercise, and no specimen or past-paper item, is reused (D-036). The specimen's assertion-reason item on 1906 and 1907 is not reused.
- **Duplicate scan:** the 5-gram near-duplicate scan using the originality gate's own rule found 0 flags against about 24,000 stems. The lib's exact-stem pre-check passes.

## Gaps

- **Rendering:** nobody has seen the SVG labels rendered (the timeline with nine labels in lanes, and the Pact diagram). They need a look at 360 px on staging.

## Competency audit 2026-11-05

Audit: `docs/platform/content-qa/2026-11-05-competency-retag-audit.md`. The eight items that were tagged application although they only identified a factor, objective, term, Act, change, event or development from a paraphrased cue were rewritten in place (same key, type, marks, topic and test slot) so that each now asks the student to use the idea. No tag was simply relabelled.
- `m_sort_factor` (analysis): infer a pamphlet writer's approach from a grievance, a request and a warning.
- `m_sort_objective` (application): pick the 1906 objective that conflicts with joining a protest campaign.
- `m_identify_term` (rewritten: the effect of fixed seat shares in a province where Muslims are a small minority). The reviewer judged the key a restatement of what fixed shares mean, so it is tagged **understanding**, not application.
- `m_apply_electorate` (application): spot a chronological flaw (1909 arrangement, accepted by the Congress only in 1916).
- `m_apply_change` (application): choose the pair of pre-1914 developments that explains the change of aim, against true but unfitting pairs.
- `m_apply_1911` (analysis): explain why the 1911 decision outweighed the 1909 gain for an imagined member.
- `m_apply_reunion` (application): explain why reunion was possible in 1916 and not in 1907.
- `s_apply_speech` (application, 2 marks): give two points in support of the Pact against a delegate's objection.
Competency now: recall 21, understanding 21, application 9, analysis 21, evaluation 5; application and above **35 of 77 (45.5%)**, inside the 45–65% band.
