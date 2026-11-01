# ICSE Class 10 History & Civics, Chapter 14 — The First World War

`icse-10-history-civics-ch14` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032) in the pattern of the ICSE 2027 History & Civics specimen (`icse-2027-specimen-501-history-civics`), which was used for pattern only. It is built from `src/` with the shared lib `../icse-10-history-civics-ch01/src/lib.mjs`, which is imported, not copied. Run from `platform/`: `npx tsx content/authored/social-science/icse-10-history-civics-ch14/src/build.mjs`.

The build checks:
- the schema, the pipeline lint and the deterministic verify checks;
- the originality pre-check (exact stem prose against every other chapter);
- word limits, narration rules, the answer-leak scan and the editorial counts.

It then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks of 17 + 17 slides, 25 of them with a visual (2 SVG figures, plus tables and flows); notes in 6 sections; 30 flashcards; 88 questions worth 191 marks |
| `tests.json` | Two tests; they share no items and use no deck-check item. |
| `src/` | `questions.mjs` (the bank, the two SVG builders and the asserted event years) and `build.mjs` (figures, decks, notes, flashcards and tests) |

The two tests in `tests.json`:
- `t_icse10historycivics_ch14_short` on `icse-10-history-civics-chapter-test-short` (20 marks, 30 min).
  - Part I: `m_alliance_members`, `m_sarajevo_date`, `m_war_guilt`, `m_league_hq`, `m_dreadnought`, `ar_blocs`, `s_sarajevo_two`, `s_league_aims_two`.
  - Part II: one of `l_causes` and `l_versailles`.
- `t_icse10historycivics_ch14_long` on `icse-10-history-civics-chapter-test-long` (40 marks, 60 min).
  - Part I: 9 MCQs, `ar_league_usa`, and the 2-mark shorts `s_nationalism_two`, `s_armament_two`, `s_ultimatum_two`, `s_military_terms`, `s_league_weak`.
  - Part II: two of `l_blocs`, `l_sarajevo` and `l_league`.

## Scope

All four syllabus topics are covered:
- **t01** causes: aggressive nationalism, imperialism, the armament race, and the division of Europe into rival blocs.
- **t02** the Sarajevo crisis as the immediate cause, and the July–August 1914 chain of declarations.
- **t03** the Treaty of Versailles: war guilt, reparations, military and territorial terms, and German resentment.
- **t04** the League of Nations: formation, objectives, and (as context) its weaknesses.

### Decks

- **Part 1** (17 slides): causes and the Sarajevo crisis.
  - Worked examples: planning a 3 + 3 + 4 answer on the causes, and separating immediate from long-term causes.
  - Check slides: `m_chk_entente`, `tf_chk_morocco`, `fb_chk_princip`, `m_chk_britain_date`.
- **Part 2** (17 slides): the Treaty of Versailles and the League of Nations.
  - Worked examples: planning a 3 + 3 + 4 answer on Versailles, and matching a situation to a League objective.
  - Check slides: `m_chk_versailles_place`, `tf_chk_alsace`, `fb_chk_geneva`, `m_chk_usa`.
- **Narration:** at most 61 words a slide (mean 42), with no symbols and no quotations.
- **SVG figures:** a 1865–1925 timeline in label lanes (captioned schematic) and a diagram of the two rival blocs (captioned schematic).

### Question bank (88 items)

| Type | Count |
|---|---|
| mcq | 41 (keys a11 b10 c10 d10; six are imagined-scenario application items) |
| assertion-reason | 8, ICSE option order set by `verdict` (keys c, d, d, a, c, b, c, a) |
| true-false | 5 |
| fill-blank | 4 |
| match | 1 |
| ordering | 1 |
| short 2-mark | 13 |
| short 3-mark | 4 |
| long 10-mark, in 3 + 3 + 4 parts with step marks | 8 (one reads the blocs SVG, one the timeline SVG) |
| source-based, imagined documents, each with an either/or part (c) | 3 |

- **Source documents:** a junior diplomat's diary (July 1914), a shipyard worker's letter (1909) and a student's notes from Geneva (1921). All are imagined and labelled as such.
- **Difficulty:** d1 16, d2 30, d3 37, d4 5.
- **Competency:** recall 22, understanding 25, application 12, analysis 24, evaluation 5. That puts 47% of items at application or above, inside the lint band of 45–65%.

## Facts for a reviewer

1. **Before 1914:**
   - **Alliances and agreements:**
     - Alsace-Lorraine taken by Germany after the war of 1870–71.
     - Triple Alliance 1882 (Germany, Austria-Hungary, Italy).
     - Franco-Russian alliance 1894.
     - Entente Cordiale 1904 (Britain and France).
     - Anglo-Russian understanding 1907, completing the Triple Entente.
   - **Crises and the arms race:**
     - Moroccan crises 1905 and 1911 (Germany against France).
     - HMS Dreadnought launched 1906.
     - Bosnia annexed by Austria-Hungary 1908.
2. **Nationalism:** the forms named are French revanche, Pan-Slavism (Russia as protector of the Slavs), Pan-Germanism and Serb nationalism. Each is described in general terms, without judgement of any people.
3. **Italy:** declared neutrality in 1914 and entered the war on the Entente side in 1915. This appears in `m_italy_shift` and the notes only.
4. **Sarajevo:** 28 June 1914; Archduke Franz Ferdinand, heir to Austria-Hungary, and his wife killed by Gavrilo Princip, a young Bosnian Serb nationalist. `tf_princip_serbian_army` says only that he was not an officer acting on official orders and was "linked with a secret society", which is not named.
5. **July crisis:**
   - Austria-Hungary sent an ultimatum, which Serbia accepted only in part, and declared war on 28 July 1914.
   - Russia mobilised; Germany declared war on Russia and France and invaded Belgium.
   - Britain declared war on 4 August 1914. Belgian neutrality is described as guaranteed by a treaty of 1839, in `m_app_belgium_news` only.
6. **End of the war:** armistice on 11 November 1918.
7. **Treaty of Versailles:**
   - **Signing:** 28 June 1919, in the Palace of Versailles, five years to the day after Sarajevo (asserted in code). The Allies drew up the terms and Germany had no part in negotiating them.
   - **Guilt and payment:** war-guilt clause, Article 231; reparations, with no amount stated.
   - **Military terms:** army limited to 100,000, with no conscription, no air force, a small navy and no submarines; Rhineland demilitarised.
   - **Territorial terms:**
     - Alsace-Lorraine returned to France.
     - Saar under the League for 15 years, with its coal mines to France; 1920 + 15 = 1935 is asserted, but no plebiscite result is stated.
     - Polish Corridor separating East Prussia.
     - Danzig a free city under the League.
     - Colonies governed as mandates.
8. **League of Nations:**
   - **Founding:** proposed by President Woodrow Wilson; the Covenant was part of the 1919 peace treaties; the League began work in January 1920 at Geneva. The USA never joined because the Senate did not ratify the treaty.
   - **Bodies:** the Permanent Court of International Justice at The Hague, in `m_app_league_choice`, and the ILO for labour conditions.
   - **Members:** Japan is named as a founding member in `m_chk_usa`.
   - **Weaknesses:** no army; unanimity; the USA absent; Germany and the Soviet Union not members at first.
9. **Not stated:** no casualty figures, no reparation amounts and no current figures. No treaty text, speech or historical person is quoted. The specimen's "objectives of the League" wording is not reused.

## Gaps

- Nobody has seen the two SVGs rendered, so they need a look at 360 px on staging. The timeline has twelve labels in lanes.
- The Saar plebiscite result and later League history are out of scope and not taught.
