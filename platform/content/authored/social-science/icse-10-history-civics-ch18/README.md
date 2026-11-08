# ICSE Class 10 History & Civics, Chapter 18 — The Non-Aligned Movement

`icse-10-history-civics-ch18` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) in the pattern of the ICSE 2027 History & Civics specimen (`icse-2027-specimen-501-history-civics`), which was used for pattern only. It is built from `src/` with the shared lib `../icse-10-history-civics-ch01/src/lib.mjs`, which is imported, not copied. Run from `platform/`: `npx tsx content/authored/social-science/icse-10-history-civics-ch18/src/build.mjs`.

The build checks:
- the schema, the pipeline lint and the deterministic verify checks;
- the originality pre-check (exact stem prose against every other chapter);
- word limits, narration rules, the answer-leak scan and the editorial counts.

It then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 17 + 15 slides, 22 of them with a visual (2 SVG figures, plus tables and flows); notes in 6 sections; 30 flashcards; 78 questions worth 181 marks |
| `tests.json` | Two tests; they share no items and use no deck-check item. |
| `src/` | `questions.mjs` (the bank, the two SVG builders, and the asserted dates and architects) and `build.mjs` (figures, decks, notes, flashcards and tests) |

The two tests in `tests.json`:
- `t_icse10historycivics_ch18_short` on `icse-10-history-civics-chapter-test-short` (20 marks, 30 min).
  - Part I: `m_meaning_bloc`, `m_obj_colonialism`, `m_panch_meaning`, `m_belgrade_city`, `m_tito_country`, `ar_nonalign_neutral`, `s_meaning_two`, `s_architects_two`.
  - Part II: one of `l_meaning_obj` and `l_nehru`.
- `t_icse10historycivics_ch18_long` on `icse-10-history-civics-chapter-test-long` (40 marks, 60 min).
  - Part I: `m_not_neutral`, `m_obj_apartheid`, `m_disarm`, `m_economic`, `m_panch_year`, `m_panch_link`, `m_nasser`, `m_bandung_role`, `m_belgrade_number`, `ar_colonial`, and the 2-mark shorts `s_not_neutral`, `s_obj_two_economic`, `s_panch_meaning`, `s_nehru_two`, `s_bandung_two`.
  - Part II: two of `l_panch`, `l_bandung_belgrade` and `l_cold_context`.
- Spares in neither test: `l_neutral_compare`, `l_groups_picture` (reads the SVG of three groups), `l_timeline` (reads the SVG timeline), the three source items, and many objective and short items.

## Scope

All three syllabus topics are covered:
- **t01** meaning of non-alignment in the Cold War setting (not neutrality, not isolation); why newly free nations chose it; its objectives; the movement after the Cold War, stated broadly.
- **t02** Panchsheel as **meaning only**: five principles of peaceful coexistence, first set out in the India–China agreement of 1954, and its link to India's foreign policy and to non-alignment. The five principles appear in one deck table and the notes **for understanding only**. As the removed-topics list requires, **no question asks a student to list or name them**.
- **t03** Nehru's role, and the five architects usually named, each with the country he led; Bandung (1955) and Belgrade (1961).

### Decks

- **Part 1** (17 slides, 4 check slides, 2 worked examples): the two blocs, meaning, the three often-confused words, why new nations chose it, objectives and Panchsheel. The worked examples test an imagined republic against the features of non-alignment, and plan a ten-mark answer.
- **Part 2** (15 slides, 4 check slides, 2 worked examples): Bandung, Belgrade, the five architects, Nehru's role, India's reasons and the movement after the Cold War. The worked examples correct an imagined student's revision chart, and plan a ten-mark answer on Nehru.
- **Check slides:** `m_chk_meaning`, `tf_chk_neutral`, `m_chk_panch` and `tf_chk_panch_china` in Part 1; `fb_chk_bandung`, `fb_chk_belgrade`, `m_chk_tito` and `m_chk_nasser` in Part 2. None of them is used in a test.
- **Narration:** at most 60 words per slide (mean 40), with years in words, no abbreviations and no quotations.

### Question bank (78 items, 181 marks)

| Type | Count |
|---|---|
| mcq | 34 (keys a8 b9 c8 d9; 11 are imagined-scenario application items) |
| assertion-reason | 6, ICSE option order set by `verdict` (keys c, c, a, a, b, d) |
| true-false | 4 |
| fill-blank | 4 |
| match | 1 |
| ordering | 1 |
| short 2-mark | 13 |
| short 3-mark | 4 |
| long 10-mark, in 3 + 3 + 4 parts | 8 (two read an SVG) |
| source-based, each with an either/or part (c) | 3 |

- **Source documents:** all imagined and labelled as such: an interpreter's diary at Belgrade (1961), a Lucknow student's letter about the 1954 agreement, and a schoolteacher's radio talk in a newly free African country (1962).
- **Difficulty:** d1 23, d2 20, d3 31, d4 4.
- **Competency:** recall 22, understanding 16, application 14, analysis 22, evaluation 4. That puts 51% of items at application or above, reached with scenario items rather than retagging. (superseded: see Competency audit 2026-11-05)

## Facts for a reviewer to check

1. **Blocs:** NATO formed 1949 (western bloc, led by the USA); Warsaw Pact 1955 (eastern bloc, led by the USSR).
2. **Meaning:** non-alignment is joining neither military bloc, following an independent foreign policy, and judging issues on their merits. It is taught as distinct from neutrality and from isolation.
3. **Objectives** (paraphrased): protect the independence of newly free states; end colonialism and imperialism; oppose racial discrimination, with apartheid as the example; peace, disarmament and peaceful coexistence; development and a fairer world economic order; strengthen the United Nations.
4. **Panchsheel:** five principles of peaceful coexistence, first set out in the India–China agreement of 29 April 1954. Listed for understanding only: mutual respect for territorial integrity and sovereignty, non-aggression, non-interference in internal affairs, equality and mutual benefit, peaceful coexistence. Its idea was taken up at Bandung.
5. **Bandung conference:** April 1955, Bandung, Indonesia, Asian and African states. It is described as preparing the ground, not as the founding of the movement.
6. **Brioni talks:** 1956, Nehru, Tito and Nasser. They appear in the timeline, the notes and two model answers only; no question asks for them.
7. **First summit:** Belgrade, Yugoslavia, September 1961, with about 25 member countries.
8. **Architects usually named:** Jawaharlal Nehru (India), Josip Broz Tito (Yugoslavia), Gamal Abdel Nasser (Egypt), Sukarno (Indonesia), Kwame Nkrumah (Ghana).
9. **Nehru's role** (paraphrased, no quotation): non-alignment as the basis of India's foreign policy from 1947; Panchsheel with China; active at Bandung; co-founder at Belgrade. India's reasons are freedom of judgement, peace and development, aid from both sides, and leadership against colonialism.
10. **After the Cold War:** the Cold War ended around 1991 and the movement continued to meet. A dated note in the notes gives about 120 member states as of 2024; no question tests this figure.
11. **Not stated:** no historical person is quoted. Real leaders are described only by their widely taught roles. Imagined countries (Saranpur, Korvania, Tamravati, Nalupura, Velora, Durmak, Mirhan) carry invented names.

## Originality

Every scenario and document is written by SOYL. No textbook text or exercise and no specimen or board-paper item is reused (D-036). The lib's exact-stem check passes against every other authored chapter, and a 5-gram near-duplicate scan (Jaccard ≥ 0.7, the originality gate's rule) finds 0 flags against about 24,850 other stems, including CBSE 12 Political Science ch01 and ch11.

## Gaps

- Nobody has seen the two SVG figures (three groups, and the 1945–1965 timeline) rendered, so they need a look at 360 px on staging. A label overflow and overlap script finds no issues.
- No map item: the chapter has no map work.

## Competency audit 2026-11-05

Audit reference: `docs/platform/content-qa/2026-11-05-competency-retag-audit.md`. No item was added, removed or reordered; keys, types, marks, topic tags and test slots are unchanged, so the MCQ key table above still holds (keys follow the shared lib's rotation, and the correct option is still written first).

- **Retagged honestly (no rewrite):** `m_scn_odd` (041) application to recall; `m_scn_chart` (042) application to recall.
- **Rewritten as genuine items** (ids are release order):
  - `m_scn_aid` (005), application to analysis: weigh a borderline state (trade with both, but army supply, training and a radar station from one side).
  - `m_scn_base` (006), application to analysis: compare two states on non-alignment against neutrality.
  - `m_scn_vote` (007), application to analysis: judge whether frequent agreement with one power proves bloc membership.
  - `m_scn_panch` (028), application kept and made genuine: judge radio broadcasts against the spirit of a Panchsheel-style agreement.
  - `m_app_scholarships` (066), application to analysis: infer an imagined editorial's position (non-alignment, neutrality, bloc or isolation).
  - `m_app_resolution` (067), application to analysis: qualify an over-broad claim about the disarmament call.
  - `m_app_prices` (068), application to analysis: explain why a newly free state might prefer non-alignment given two concrete pressures.
  - `m_app_newnation` (069), application kept and made genuine: separate acceptable aid from bloc-binding strings in a mixed offer.
  - `s_app_wrong_claim` (070), application to analysis: assess a partly right claim that Bandung was the first summit, with evidence.
- **Counts now:** application or above 38 of 78 (48.7%), up from 29 after the honest retags (the earlier 40 included items the audit judged recall or understanding).
