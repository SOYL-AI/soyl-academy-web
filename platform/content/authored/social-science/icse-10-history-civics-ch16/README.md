# ICSE Class 10 History & Civics, Chapter 16 — The Second World War and the Cold War

`icse-10-history-civics-ch16` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) in the pattern of the ICSE 2027 History & Civics specimen (`icse-2027-specimen-501-history-civics`), which was used for pattern only. It is built from `src/` with the shared lib `../icse-10-history-civics-ch01/src/lib.mjs`, which is imported, not copied. Run from `platform/`: `npx tsx content/authored/social-science/icse-10-history-civics-ch16/src/build.mjs`.

The build checks:
- the schema, the pipeline lint and the deterministic verify checks;
- the originality pre-check (exact stem prose against every other chapter);
- word limits, narration rules, the answer-leak scan and the editorial counts.

It then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 16 + 16 slides, 23 of them with a visual (2 SVG figures, plus tables and flows); notes in 6 sections; 30 flashcards; 87 questions worth 189 marks |
| `tests.json` | Two tests; they share no items and use no deck-check item. |
| `src/` | `questions.mjs` (the bank, the two SVG builders and the asserted event years and day counts) and `build.mjs` (figures, decks, notes, flashcards and tests) |

The two tests in `tests.json`:
- `t_icse10historycivics_ch16_short` on `icse-10-history-civics-chapter-test-short` (20 marks, 30 min).
  - Part I: `m_appease_meaning`, `m_poland_date`, `m_pearl_date`, `m_un_date`, `m_nato_meaning`, `ar_munich`, `s_versailles_two`, `s_coldwar_meaning`.
  - Part II: one of `l_causes_europe` and `l_consequences`.
- `t_icse10historycivics_ch16_long` on `icse-10-history-civics-chapter-test-long` (40 marks, 60 min).
  - Part I: `m_rhineland_year`, `m_anschluss`, `m_sudeten`, `m_manchuria`, `m_abyssinia`, `m_pact_ussr`, `m_declare_date`, `m_hiroshima_date`, `m_superpowers`, `ar_league_fail`, and the 2-mark shorts `s_appease_two`, `s_japan_two`, `s_league_two`, `s_pearl_two`, `s_warsaw_two`.
  - Part II: two of `l_appeasement`, `l_poland` and `l_coldwar`.
- Spares in neither test: `l_league_japan`, `l_timeline` (reads the SVG timeline), `l_blocs_picture` (reads the SVG bloc diagram), the three source items, and many objective and short items.

## Scope

All five syllabus topics are covered:
- **t01** causes in Europe: dissatisfaction with Versailles, the rise of Fascism and Nazism, and appeasement (Rhineland, Anschluss, Munich, the rest of Czechoslovakia).
- **t02** causes: Japan in Manchuria and China, the failure of the League (Manchuria, Abyssinia), the Nazi-Soviet Pact and Hitler's invasion of Poland as the immediate cause.
- **t03** brief mention only: Pearl Harbour, and the atomic bombings of Hiroshima and Nagasaki.
- **t04** consequences: defeat of the Axis, the United Nations, the superpowers and the start of the Cold War.
- **t05** the Cold War: its meaning; NATO and the Warsaw Pact taught as **meaning only**, as the removed-topics list requires. No question asks for their organisation, clauses or members beyond the leading power.

### Decks

- **Part 1** (16 slides): causes and the outbreak of war.
  - Worked examples: planning a 3 + 3 + 4 answer on the European causes, and sorting long-term from immediate causes.
  - Check slides: `m_chk_axis`, `tf_chk_munich`, `m_chk_abyssinia`, `fb_chk_poland`.
- **Part 2** (16 slides): Pearl Harbour, the two sides, the end of the war, consequences and the Cold War.
  - Worked examples: planning a 3 + 3 + 4 answer on the end of the war, and spotting a Cold War feature in an imagined report.
  - Check slides: `m_chk_pearl`, `m_chk_hiroshima`, `fb_chk_un`, `tf_chk_nato`.
- Narration is at most 57 words a slide and quotes no one; years are spoken in words and abbreviations are spelled out.

### Question bank (87 items)

| Type | Count |
|---|---|
| mcq | 40 (keys a10 b10 c10 d10) |
| assertion-reason | 8, ICSE option order set by `verdict` |
| true-false | 6 |
| fill-blank | 3 |
| match | 1 |
| ordering | 1 |
| short 2-mark | 14 |
| short 3-mark | 3 |
| long 10-mark, in 3 + 3 + 4 parts | 8 (two read an SVG) |
| source-based, each with an either/or part (c) | 3 |

- **Source items:** an imagined London typist's diary (autumn 1938), an imagined clerk's letter from Singapore (December 1941) and an imagined student's lecture notes from Delhi (1956), all written by SOYL and labelled.
- **Difficulty:** d1 15, d2 26, d3 43, d4 3.
- **Competency:** recall 21, understanding 22, application 17, analysis 24, evaluation 3, so 51% of items are application or above. The first build came out at 43%; five recall items were rewritten as imagined scenarios and four new scenario items added, with no retagging.

## Facts for a reviewer to check

All are stable, widely taught dates and names. No casualty figures are given anywhere; the bombings are described as causing "very heavy loss of life".

1. **Dictators:** Mussolini in power in Italy from 1922; Hitler in power in Germany from 1933; Rome–Berlin Axis 1936, with Japan joining the Axis later.
2. **Japan:** seized Manchuria in 1931; left the League of Nations in 1933 after being condemned; began a full-scale war on China in 1937.
3. **Abyssinia:** invaded by Italy in October 1935; League sanctions were limited and did not include oil.
4. **Appeasement (Britain and France):**
   - Rhineland remilitarised, March 1936, without military response.
   - Anschluss with Austria, March 1938.
   - Munich Agreement, September 1938: Britain, France, Germany and Italy agreed that Germany could take the Sudetenland; Czechoslovakia and the USSR were not part of the talks.
   - Rest of Czechoslovakia occupied, March 1939; Britain and France then guaranteed Poland.
5. **Outbreak:** Nazi-Soviet Non-Aggression Pact 23 August 1939; Germany invaded Poland 1 September 1939; Britain and France declared war 3 September 1939. The 9-day and 2-day gaps are asserted in code.
6. **Two sides (deck only):** the Axis (Germany, Italy, Japan) and the Allies including Britain, the USSR (invaded by Germany in 1941), the USA (from December 1941) and China.
7. **Pearl Harbour:** Japanese attack on the American naval base in Hawaii, 7 December 1941; the USA declared war on Japan, and Germany and Italy declared war on the USA.
8. **End of the war:** Germany surrendered in May 1945; atomic bombs on Hiroshima (6 August 1945) and Nagasaki (9 August 1945); Japan announced its surrender in August and signed it in early September 1945.
9. **Consequences:** United Nations from 24 October 1945; the USA and USSR as superpowers; Britain and France weakened; Germany occupied.
10. **Cold War:** rivalry without a direct full-scale war between the USA and the USSR, carried on through alliances, an arms race and propaganda. NATO formed in April 1949 (the USA, Canada and western European states); Warsaw Pact formed in 1955 (the USSR and the communist states of eastern Europe), named after the Polish capital.
11. **Balance:** `l_appeasement` (iii) and `sb_munich_diary` give arguments on both sides; `l_coldwar` (iii) gives both the pressures on new nations and the option of non-alignment, naming India only as a non-aligned example.

## Originality

- The specimen's "explain the policy of appeasement" wording is not reused; every stem is specific to its own content.
- No textbook text, exercise, speech, treaty text or quotation of any historical person is used. Imagined documents are labelled as written by SOYL.
- A 5-gram near-duplicate scan using the originality gate's rule compared the 87 stems with 24,687 others in the repo and found 0 flags, and the lib's exact-stem pre-check passes.

## Gaps

- Nobody has seen the two SVG figures (the 1919–1955 timeline and the Cold War bloc diagram) rendered, so they need a look at 360 px on staging. A label overflow and overlap check found no issues.
- NATO and Warsaw Pact members are shown in the bloc diagram only as examples ("and others").
