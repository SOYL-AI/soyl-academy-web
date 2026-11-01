# ICSE Class 10 History & Civics, Chapter 12 — Subhas Chandra Bose, the Forward Bloc and the INA

`icse-10-history-civics-ch12` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) in the pattern of the ICSE 2027 History & Civics specimen (`icse-2027-specimen-501-history-civics`), which was used for pattern only. It is built from `src/` with the shared lib `../icse-10-history-civics-ch01/src/lib.mjs`, which is imported, not copied. Run from `platform/`: `npx tsx content/authored/social-science/icse-10-history-civics-ch12/src/build.mjs`.

The build checks:
- the schema, the pipeline lint and the deterministic verify checks;
- the originality pre-check (exact stem prose against every other chapter);
- word limits, narration rules, the answer-leak scan and the editorial counts.

It then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 17 + 18 slides, 28 of them with a visual (2 SVG figures, plus tables and flows); notes in 6 sections; 30 flashcards; 80 questions worth 172 marks |
| `tests.json` | Two tests; they share no items and use no deck-check item. |
| `src/` | `questions.mjs` (the bank, the two SVG builders and the asserted event years) and `build.mjs` (figures, decks, notes, flashcards and tests) |

The two tests in `tests.json`:
- `t_icse10historycivics_ch12_short` on `icse-10-history-civics-chapter-test-short` (20 marks, 30 min). Part I has 5 MCQ, 1 AR and 2 × 2-mark. Part II is one of `l_fb_full` and `l_ina_origin`.
- `t_icse10historycivics_ch12_long` on `icse-10-history-civics-chapter-test-long` (40 marks, 60 min). Part I has 9 MCQ, 1 AR and 5 × 2-mark. Part II is two of `l_azad_hind`, `l_contribution` and `l_trials`.

## Scope

All three syllabus topics are covered:
- **t01** the Forward Bloc: Bose's presidencies (Haripura 1938, Tripuri 1939), the Tripuri crisis, and the Bloc's formation and objectives.
- **t02** the Indian National Army: its first organiser and base, Bose taking command, the Provisional Government of Free India, its objectives and units, and the campaign of 1944.
- **t03** Bose's contribution: his early career, his work abroad, his reported death, and the Red Fort trials with their impact.

### Decks

- **Part 1** (17 slides): Congress President and the Forward Bloc. Worked examples: a two-point answer on the 1939 resignation, and a three-mark answer on the Bloc's objectives. Check slides: `m_chk_tripuri`, `tf_chk_fb_outside`, `fb_chk_mohan`, `m_chk_rani_leader`.
- **Part 2** (18 slides): the INA, Azad Hind and the trials. Worked examples: answering "who founded the INA?" fully, and planning a 3 + 3 + 4 answer on the trials. Check slides: `tf_chk_azad_tokyo`, `m_chk_escape_year`, `m_chk_trial_place`, `fb_chk_slogan`.
- **Narration:** at most 64 words a slide (mean 46), with no symbols and no quotations.
- **SVG figures:** a 1895–1950 timeline (captioned schematic) and an organisation chart of the Provisional Government, the INA, the Indian Independence League and the four units.

### Question bank (80 items)

| Type | Count |
|---|---|
| mcq | 39 (keys a10 b9 c10 d10) |
| assertion-reason | 7, ICSE option order set by `verdict` (keys c, b, c, a, d, c, b) |
| true-false | 5 |
| fill-blank | 2 |
| match | 1 |
| ordering | 1 |
| short 2-mark | 11 |
| short 3-mark | 4 |
| long 10-mark, in 3 + 3 + 4 parts | 7 (two read an SVG) |
| source-based, each with an either/or part (c) | 3 (an imagined volunteer's diary from Jabalpur 1939, a shopkeeper's letter from Singapore 1943, a law student's notes from Delhi 1945) |

- **Difficulty:** d1 10, d2 30, d3 34, d4 6.
- **Competency:** recall 23, understanding 17, application 15, analysis 19, evaluation 6. That puts 50% of items at application or above (lint band 45–65%). The level was reached with scenario items, not by retagging: six near-duplicate recall items were dropped, two recall MCQs were rewritten as imagined scenarios, and ten scenario items (`m_app_*`, `s_app_broadcast`) are in the bank.

## Facts a reviewer should check

All are stable, widely taught facts; none is a statistic. Everything after 1945 appears only as later context.
1. **Early life and career:** Bose was born at Cuttack in 1897. He passed the ICS examination in 1920 and resigned in 1921. He worked with C. R. Das in Bengal. Popular title: Netaji.
2. **Haripura, 1938:** he was Congress President. The National Planning Committee was set up in 1938 during his term, with Nehru as chairman.
3. **Tripuri, 1939:** he was re-elected, defeating Pattabhi Sitaramayya, who is described as "backed by Gandhi and many senior leaders". Senior leaders did not cooperate in forming a working committee, and there were differences over the pace of the struggle. He resigned in 1939 and Rajendra Prasad succeeded him. All of this is worded neutrally.
4. **Forward Bloc:** formed in May 1939, at first within the Congress. Its objectives are paraphrased: unite radical and anti-imperialist forces; an uncompromising struggle for complete independence; a socialist reorganisation, including ending landlordism; planned development.
5. **Escape:** from house arrest in Calcutta, January 1941, through Peshawar and Kabul to Germany. There he organised Indian prisoners of war and broadcast to India. He reached Southeast Asia by submarine in 1943.
6. **First INA (1942):** organised by Captain Mohan Singh with Japanese help, from Indian prisoners of war captured in Malaya and Singapore. The Indian Independence League, led by Rash Behari Bose, was its political base. Some books credit Rash Behari Bose as founder; the deck and notes explain all three roles.
7. **Bose takes command (1943):**
   - He took over the League and the INA in Singapore.
   - He proclaimed the Provisional Government of Free India (Azad Hind) at Singapore on 21 October 1943. It is described as recognised by Japan and several of its allies.
   - The INA had Gandhi, Nehru and Azad Brigades, and the Rani of Jhansi Regiment of women led by Captain Lakshmi Swaminathan (later Sahgal).
   - "Delhi Chalo" is named as a slogan only.
8. **Campaign of 1944:** around Imphal (Manipur) and Kohima, with the INA flag raised at Moirang. It ended in retreat because of supplies, disease, the monsoon and stronger Allied forces with air power.
9. **Death:** Bose was reported to have died after an air crash at Taipei in August 1945. The chapter says the circumstances have been the subject of several inquiries.
10. **Red Fort trials, 1945–46:**
    - The first trial was of Shah Nawaz Khan, Prem Kumar Sahgal and Gurbaksh Singh Dhillon.
    - The defence included Bhulabhai Desai, Jawaharlal Nehru and Tej Bahadur Sapru.
    - The sentences were remitted after nationwide protests.
    - The naval mutiny of February 1946 in Bombay appears only as later context, linked broadly with the feeling the trials stirred.
11. **Evaluation items:** where they mention Bose's decision to seek Axis help, they say historians differ and ask for both views.

## Originality

- **Scenarios:** every diary, letter, note and quiz scenario is imagined and labelled as SOYL's own.
- **No quotations:** no textbook text, box or exercise and no specimen or board-paper item is reused (D-036). No speech of Bose or anyone else is quoted. Slogans are named only.
- **Duplicate checks:** the stem prose passed the lib's exact-stem check. A 5-gram near-duplicate scan using the originality gate's rule (80 stems against 24,359 others) found 0 flags.

## Gaps

- **Rendering:** nobody has seen the SVG labels rendered, so they need a look at 360 px on staging. A script estimate found no overflow or overlap.
- **Content:** items are `draft`, and the content-verifier sample has not been done.
