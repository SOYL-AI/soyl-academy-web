# ICSE Class 10 History & Civics, Chapter 15 — Rise of Dictatorships

`icse-10-history-civics-ch15` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) in the pattern of the ICSE 2027 History & Civics specimen (`icse-2027-specimen-501-history-civics`), which was used for pattern only. It is built from `src/` with the shared lib `../icse-10-history-civics-ch01/src/lib.mjs`, which is imported, not copied. Run from `platform/`: `npx tsx content/authored/social-science/icse-10-history-civics-ch15/src/build.mjs`.

The build checks:
- the schema, the pipeline lint and the deterministic verify checks;
- the originality pre-check (exact stem prose against every other chapter);
- word limits, narration rules, the answer-leak scan and the editorial counts.

It then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 17 + 18 slides, 25 of them with a visual (2 SVG figures, 14 tables, 9 flows); notes in 6 sections; 30 flashcards; 80 questions worth 171 marks |
| `tests.json` | Two tests; they share no items and use no deck-check item. |
| `src/` | `questions.mjs` (the bank, the timeline and comparison SVG builders, and the asserted event years) and `build.mjs` (figures, decks, notes, flashcards and tests) |

The two tests in `tests.json`:
- `t_icse10historycivics_ch15_short` on `icse-10-history-civics-chapter-test-short` (20 marks, 30 min).
  - Part I: `m_it_fiume`, `m_it_march`, `m_de_chancellor`, `m_de_hyper`, `m_sim_totalitarian`, `ar_de_versailles`, `s_it_two_econ`, `s_sim_two`.
  - Part II: one of `l_it_causes` and `l_de_causes`.
- `t_icse10historycivics_ch15_long` on `icse-10-history-civics-chapter-test-long` (40 marks, 60 min).
  - Part I: 9 MCQs (`m_it_mutilated`, `m_it_red_fear`, `m_it_economy`, `m_de_art48`, `m_de_enabling`, `m_de_depression`, `m_de_fuhrer`, `m_sim_leader`, `m_diff_race`), `ar_sim_parties`, and the 2-mark shorts `s_it_peace_two`, `s_de_versailles_two`, `s_de_weimar_two`, `s_de_enabling`, `s_diff_one`.
  - Part II: two of `l_it_rise_path`, `l_de_power_path` and `l_sim_full`.
- Spares in neither test: `l_de_economy` (reads the timeline SVG), `l_compare` (reads the comparison SVG), the three source items and several shorts and MCQs.

## Scope

All three syllabus topics are covered:
- **t01** causes of the rise of Fascism in Italy: the "mutilated victory", economic crisis, weak coalition governments, fear of communism, the fascist squads and Mussolini's leadership, and the March on Rome.
- **t02** causes of the rise of Nazism in Germany: resentment of Versailles, weaknesses of the Weimar Republic (coalitions, Article 48), hyperinflation (1923) and the Great Depression (from 1929), fear of communism, and Hitler's path from appointed Chancellor to Führer (1933–34).
- **t03** similarities between the ideologies (one-party totalitarian state, extreme nationalism, glorification of war, cult of the leader, anti-communism, suppression of civil liberties, propaganda, youth organisations) and the main difference (Nazism's racial doctrine and antisemitism).

### Decks

- **Part 1** (17 slides): Fascism in Italy.
  - Worked examples: planning a 3 + 3 + 4 answer on the rise of Fascism, and matching clues in an imagined diary to causes.
  - Check slides: `m_chk_duce`, `fb_chk_founded`, `tf_chk_march`, `m_app_it_squads`.
- **Part 2** (18 slides): Nazism in Germany and the shared ideas.
  - Worked examples: planning a 3 + 3 + 4 answer on the causes of Nazism, and spotting features of dictatorship in imagined clues.
  - Check slides: `m_chk_weimar`, `tf_chk_1923`, `m_chk_hindenburg`, `m_chk_onepary`, `fb_chk_fuhrer`.
- **Narration:** at most 54 words a slide (mean 40), with years spoken in words, no symbols and no quotations.
- **SVG figures:** a 1917–1936 timeline in label lanes and a three-box comparison chart, both captioned as schematic and drawn by SOYL.

### Question bank (80 items)

| Type | Count |
|---|---|
| mcq | 38 (keys a10 b9 c10 d9; 12 are imagined-scenario application or analysis items) |
| assertion-reason | 6, ICSE option order set by `verdict` (keys c, c, b, c, a, d) |
| true-false | 5 |
| fill-blank | 4 |
| match | 1 |
| ordering | 1 |
| short 2-mark | 12 |
| short 3-mark | 3 |
| long 10-mark, in 3 + 3 + 4 parts with step marks | 7 (one reads the timeline SVG, one the comparison SVG) |
| source-based, imagined documents, each with an either/or part (c) | 3 |

- **Source documents:** a Milan railway clerk's diary (1921), a Berlin shopkeeper's letter (1932) and an Indian student's travel notes (1937). All are imagined and labelled as such.
- **Difficulty:** d1 10, d2 29, d3 35, d4 6.
- **Competency:** recall 16, understanding 24, application 12, analysis 25, evaluation 3. That puts 50% of items at application or above, inside the lint band of 45–65%, reached with scenario items rather than retagging. (superseded: see Competency audit 2026-11-05)

## Facts for a reviewer

1. **Italy:**
   - Italy joined the war on the Allied side in 1915.
   - At the 1919 peace settlement it did not receive Fiume and most of Dalmatia; nationalists spoke of a "mutilated victory" (the phrase is described, not attributed or quoted).
   - Post-war unemployment, inflation and war debts; strikes, factory occupations and land seizures in 1919–20 (called the "two red years" in one flashcard).
   - Weak, short-lived coalition governments, 1919–22.
   - Mussolini founded the fascist movement at Milan in 1919; it became the National Fascist Party in 1921; its armed squads were the Blackshirts; landowners and industrialists funded them.
   - March on Rome, October 1922; King Victor Emmanuel III refused to use the army and invited Mussolini to become Prime Minister; the Fascists held only a small number of seats.
   - Title Il Duce.
2. **Germany:**
   - Weimar Republic set up in 1919; proportional voting, many parties, unstable coalitions.
   - Article 48: emergency rule by presidential decree, used heavily from 1930.
   - Treaty of Versailles grievances: war guilt, reparations, loss of land and colonies, army of 100,000.
   - 1923: occupation of the Ruhr by France and Belgium; hyperinflation; middle-class savings destroyed.
   - October 1929: the New York crash; American loans recalled; millions unemployed (no figure stated).
   - 1932: Nazis the largest party in the Reichstag but never an absolute majority in a free election.
   - 30 January 1933: President Hindenburg appointed Hitler Chancellor, persuaded by conservative politicians.
   - March 1933: Enabling Act, laws without the Reichstag; other parties banned and free trade unions abolished in 1933.
   - 2 August 1934: Hindenburg died; Hitler combined the offices of President and Chancellor as Führer; the army swore loyalty to him (`l_de_power_path` only).
3. **Ideologies:**
   - Shared features as listed under Scope.
   - Difference: Nazism's racial doctrine and antisemitism; the Nuremberg Laws (1935) took away the rights of German Jews; the Holocaust is stated only as "millions of Jews and others were murdered", without figures.
   - Italy's anti-Jewish laws of 1938 are mentioned in one true-false solution, to show that race was not central to early Italian Fascism.
4. **Tone:** the regimes are explained factually and never praised. No speech, slogan or writing of Mussolini, Hitler or any other historical person is quoted, and *Mein Kampf* is not cited.
5. **Originality:** no real person's diary or letter is used; every source is SOYL's own and labelled imagined. No textbook text, exercise, specimen or board-paper item is reused (D-036).

## Gaps

- Nobody has seen the two SVGs rendered, so they need a look at 360 px on staging. The timeline has seven labels in lanes; the comparison chart has three boxes side by side.
- Later events (the Rome-Berlin Axis, the invasion of Ethiopia, rearmament) belong to the Second World War chapter and are not taught here.

## Competency audit 2026-11-05

Reference: `docs/platform/content-qa/2026-11-05-competency-retag-audit.md`.

- **Retagged honestly:** 009 `m_app_it_squads` application to recall (a group named from a description; it is also the deck check slide, which asks "who were they"); 031 `m_app_de_wheelbarrow` application to recall; 058 `m_app_sim_newspaper` application to understanding (a described rule named as censorship).
- **Rewritten as genuine application or analysis, same key, type, marks, topic and test slots:**
  - 007 `m_app_it_strike` (application): decide whether a friend's cause fits an owner's described motives, weighing fear of revolution against the peace grievance.
  - 008 `m_app_it_veteran`: rewritten to match two different people to the causes that fit each, but each half is a cue-to-named-cause match, so the reviewer tagged it **understanding**.
  - 032 `m_app_de_unemployed` (analysis): explain why Nazi support rose after 1929 and not earlier, when older grievances already existed (timing).
  - 033 `m_app_de_coalitions` (application): the long-term consequence of rule by Article 48 decree in a concrete budget case.
  - 034 `m_app_de_middle` (analysis): why two people with different losses made the same choice.
  - 056 `m_app_sim_poster` (analysis): what a propaganda poster can and cannot show about popular opinion.
  - 057 `m_app_sim_school` (analysis): which described detail is the strongest evidence of a political aim.
- **MCQ keys changed** (shuffle by order, the key table of the build): 007 d, 008 b, 032 a, 033 d, 034 b, 056 a, 057 b; 009 a, 031 c and 058 d unchanged in substance.
- **Counts now:** recall 18, understanding 26, application 4, analysis 29, evaluation 3; application or above **36 of 80 (45.0%)**, inside the 45–65% band (71% of marks).
