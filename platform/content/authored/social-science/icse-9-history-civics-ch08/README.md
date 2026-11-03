# ICSE Class 9 History & Civics, Chapter 8 — The Mauryan Empire

`icse-9-history-civics-ch08` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` (the shared lib's default; drafted by Sonnet 5.5 under D-050) · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) for the ICSE Class 9 History & Civics syllabus. Built from `src/` with the shared lib `../icse-9-history-civics-ch01/src/lib.mjs` (imported, not edited). From `platform/`: `npx tsx content/authored/social-science/icse-9-history-civics-ch08/src/build.mjs`. The build checks the schema, the pipeline lint, the deterministic verify checks, the originality pre-check, word limits, narration rules, the answer-leak scan and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (21 + 18 slides, 16 + 13 with visuals: 3 SVG figures, the rest tables and flows; 4 checks and 2 worked examples each); notes (6 sections); 30 flashcards; 78 questions |
| `tests.json` | `t_icse9historycivics_ch08_short` (20 marks, 30 min) on `icse-9-default-chapter-test-short`: Section A 4 MCQ + 1 AR + one 2-mark + one 3-mark, Section B one of two 10-mark questions. `t_icse9historycivics_ch08_long` (40 marks, 60 min) on `icse-9-default-chapter-test-long`: Section A 7 MCQ + 1 AR + three 2-mark + two 3-mark, Section B two of three 10-mark questions. The tests share no question and use no deck-check item. |
| `src/` | `questions.mjs` (bank, three SVG figures: rulers timeline, administration chart, schematic map), `build.mjs` (figures, decks, notes, flashcards, tests) |

## Scope
All five syllabus topics are covered (no removed topics for this chapter):
- t01: the Arthashastra, the Indika, the Ashokan Edicts and the Sanchi Stupa as sources
- t02: Chandragupta Maurya, Bindusara and Ashoka in order
- t03: central, provincial and city administration (Pataliputra)
- t04: principles of Ashoka's Dhamma and the Kalinga War
- t05: impact of Dhamma on administration, Buddhism and culture

Deliberately left out: any quotation of an edict, of Kautilya or of Megasthenes; casualty figures for Kalinga; the wars of succession after Bindusara; the later Mauryan kings by name.

## Question bank (78 items)

| Type | Count | Notes |
|---|---|---|
| mcq | 28 | Keys a 7, b 7, c 7, d 7 |
| assertion-reason | 7 | ICSE option order; keys d, c, c, a, c, c, a |
| true-false · fill-blank · match · ordering | 3 · 4 · 3 · 2 | Orderings: rulers; levels of government |
| short 2-mark | 13 | |
| short 3-mark | 8 | |
| long 10-mark | 7 | Each in 3 + 3 + 4 parts, with per-part step marks summing to 10 |
| source-based | 3 | An imagined traveller's letter, imagined museum guide notes, an imagined school report. Each has an either/or part (c). |

- **Difficulty:** d1 6, d2 31, d3 33, d4 8.
- **Competency:** recall 15, understanding 25, application 18, analysis 13, evaluation 7. That puts 49% of items at application or above.

## Tests (item keys)
- Short: A = `m_indika_author`, `m_seleucus`, `m_samaharta`, `m_nonviolence`, `ar_buddhism`, `s_edicts_imp`, `s3_impact`; B = attempt 1 of `l_admin`, `l_kalinga`.
- Long: A = `m_prinsep`, `m_arth_caution`, `m_dates_scenario`, `m_province_head`, `m_city_board`, `m_mahamatta`, `m_welfare`, `ar_weak`, `s_indika`, `s_prov`, `s_kalinga`, `s3_pataliputra`, `s3_weakening`; B = attempt 2 of `l_sources`, `l_dhamma`, `l_impact`.
- Deck-check items (not in either test): `mt_sources`, `tf_indika`, `ord_kings`, `ar_central`, `m_kalinga_turn`, `tf_dhamma_religion`, `m_emblem`, `ar_dhamma`.

## How verified
- Build prints `NO ERRORS`, lint 0 errors and 0 warnings; run three times, `release.json` and `tests.json` byte-identical (md5); no `*.wip.json` left.
- Near-duplicate scan and SVG label overflow and overlap scan: see the report that accompanied this chapter.
- Every stem is specific to an imagined museum, letter, report or classroom scene, to stay clear of CBSE 6 and CBSE 12 History wording. No edict, passage of the Arthashastra or passage of the Indika is quoted.

## Facts for a reviewer to double-check
1. **Reigns (about; books differ):** Chandragupta Maurya about 321 to 297 BCE; Bindusara about 297 to 273 BCE; Ashoka about 268 to 232 BCE. The timeline figure is drawn roughly to scale and says so; the small gap before Ashoka reflects differing dates for his accession. The code asserts Chandragupta's end equals Bindusara's start.
2. **Chandragupta overthrew the Nandas;** conflict and treaty with **Seleucus Nikator about 305 to 303 BCE**; Megasthenes came as envoy to Pataliputra. No detail of the treaty terms (territory, elephants, marriage) is given.
3. **Bindusara** is the son of Chandragupta and father of Ashoka; described only as holding the empire together. Ashoka is called a grandson of Chandragupta in one model answer (`s3_rulers`).
4. **Arthashastra:** attributed to Kautilya (also Chanakya), minister of Chandragupta; a treatise on statecraft (revenue, spies, war, justice); rediscovered and published by R. Shamasastry in the early 1900s (notes only); its date is debated and parts may be later.
5. **Indika:** by Megasthenes, Greek envoy of Seleucus Nikator at Pataliputra; survives only through quotations in later Greek and Roman writers.
6. **Ashokan Edicts:** carved on rocks and pillars; mostly Prakrit in Brahmi; Kharosthi in the north-west; Greek and Aramaic in the far north-west; Brahmi deciphered by **James Prinsep in 1837**; Ashoka's title Devanampiya Piyadasi (notes only).
7. **Sanchi Stupa:** Madhya Pradesh; begun under Ashoka, enlarged later; carved gateways added about the 1st century BCE.
8. **Administration:** king at the centre; council of ministers (mantriparishad); samaharta (revenue) and sannidhata (treasury); provinces under princes (kumaras) with capitals Taxila, Ujjain, Tosali, Suvarnagiri; districts and villages; spies; army. Titles and the number of provinces vary between books; the chapter gives only these.
9. **Pataliputra:** board of thirty in six committees of five, as reported from Megasthenes, paraphrased; matters named: crafts, trade, foreigners, births and deaths (the list of six functions in some books is not given in full). Always flagged as a foreigner's report.
10. **Kalinga War about 261 BCE;** the edicts describe great suffering and Ashoka's remorse; no casualty figures are given anywhere.
11. **Principles of Dhamma:** tolerance of all sects, non-violence, respect for elders and teachers, kindness to servants, welfare of people and animals; Dhamma-mahamattas as special officers. Presented as a moral code for people of all sects, not a separate religion, as "many historians" say.
12. **Welfare:** shaded roads, wells, rest-houses, care for people and animals (medical help, medicinal plants).
13. **Buddhism:** Third Buddhist Council traditionally at Pataliputra; Mahendra and Sanghamitra traditionally named as missionaries to Sri Lanka. Ashoka's personal link with Buddhism is stated only as "support".
14. **Culture:** stupas, pillars, the Lion Capital of Sarnath (four lions) as the source of India's national emblem.
15. **Weakening of the empire:** presented only as a debate (some historians link it to Ashoka's policies; others to weak successors, size, pressure on revenue). No date for the end of the empire is given.

## Unsure / gaps
- Some books use "Chanakya" and "Kautilya" interchangeably and some date Ashoka's accession about 273 BCE with a consecration about 269 or 268; the chapter uses the commonly taught reign dates and says "about".
- The six functions of the Pataliputra committees are not listed in full; only four matters are named, in loose terms, to avoid a mismatch with differing book lists.
- "Respect for elders" and "kindness to servants" are paraphrases of themes in the edicts; no edict number is cited.
- The map is a schematic sketch of relative positions only; no outline, coastline or borders are drawn (OA-23).
- No past-paper or specimen item was consulted; the built-in originality scan shows no duplicate stem.
