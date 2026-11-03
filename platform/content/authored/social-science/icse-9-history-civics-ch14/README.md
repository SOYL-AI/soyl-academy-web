# ICSE Class 9 History & Civics, Chapter 14 — Medieval India: Composite Culture

`icse-9-history-civics-ch14` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` (the shared lib's default; drafted by Sonnet 5.5 under D-050) · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) for the ICSE Class 9 History & Civics syllabus. Built from `src/` with the shared lib `../icse-9-history-civics-ch01/src/lib.mjs` (imported, not edited). From `platform/`: `npx tsx content/authored/social-science/icse-9-history-civics-ch14/src/build.mjs`. The build checks the schema, the pipeline lint, the deterministic verify checks, the originality pre-check, word limits, narration rules, the answer-leak scan and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (22 + 22 slides; 17 and 18 with visuals: 4 SVG figures (factors web, saints-by-region schematic map, Bhakti and Sufi comparison chart, composite-architecture diagram), the rest tables and flows; 4 and 3 checks; 3 and 2 worked examples); notes (7 sections); 34 flashcards; 78 questions |
| `tests.json` | `t_icse9historycivics_ch14_short` (20 marks, 30 min) on `icse-9-default-chapter-test-short`: Section A 4 MCQ + 1 AR + one 2-mark + one 3-mark, Section B one of two 10-mark questions. `t_icse9historycivics_ch14_long` (40 marks, 60 min) on `icse-9-default-chapter-test-long`: Section A 7 MCQ + 1 AR + three 2-mark + two 3-mark, Section B two of three 10-mark questions. The tests share no question and use no deck-check item. |
| `src/` | `questions.mjs` (bank, four SVG figures), `build.mjs` (figures, decks, notes, flashcards, tests) |

## Scope
All four syllabus topics are covered (no removed topics for this chapter):
- t01: factors for the growth of a composite culture (long living together, patronage by rulers with Akbar's tolerance as the example, the Bhakti and Sufi movements, trade and towns, the meeting of languages with Urdu, artisans for many patrons)
- t02: principles of the Bhakti movement (six principles) and the saints with their regions
- t03: principles of the Sufi movement (pir, murid, khanqah, sama, silsilas), Chishti and Suhrawardi orders, Moinuddin Chishti, Nizamuddin Auliya, Amir Khusrau
- t04: impact on society, language and religion; examples of composite culture (architecture, music, painting, language and literature); Christian missionaries in education and social service only

Deliberately left out: any verse, hymn or saying of any saint (ideas are paraphrased), any ranking of faiths, present-day political claims, conversion debates, images of saints or deities, and photographs.

## Question bank (78 items)

| Type | Count | Notes |
|---|---|---|
| mcq | 28 | Keys a 7, b 7, c 7, d 7 |
| assertion-reason | 6 | ICSE option order; keys c, c, a, d, b, d |
| true-false · fill-blank · match · ordering | 4 · 4 · 4 · 2 | Orderings: four persons by year of death; four missionary events |
| short 2-mark | 12 | |
| short 3-mark | 8 | |
| long 10-mark | 7 | Each in 3 + 3 + 4 parts, with per-part step marks summing to 10 |
| source-based | 3 | Imagined school heritage-walk notes, an imagined music teacher's notebook, an imagined museum panel. Each has an either/or part (c). |

- **Difficulty:** d1 4, d2 23, d3 44, d4 7.
- **Competency:** recall 15, understanding 21, application 30, analysis 11, evaluation 1. That puts 54% of items at application or above.
- **Topics (items tagged):** t01 14, t02 19, t03 17, t04 24, plus 3 spanning two or three topics and 1 spanning t01 and t04.

## Tests (item keys)
- Short: A = `m_factor_akbar`, `m_bhakti_ritual`, `m_pir_murid`, `m_dargah`, `ar_patron`, `s_kabir`, `s3_impact`; B = attempt 1 of `l_bhakti`, `l_composite`.
- Long: A = `m_factor_urdu`, `m_not_factor`, `m_guru`, `m_tulsidas`, `m_moinuddin`, `m_tansen`, `m_xavier`, `ar_kabir_tulsi`, `s_composite_two`, `s_nanak`, `s_sufi_meaning`, `s3_bhakti_principles`, `s3_missionary_edu`; B = attempt 2 of `l_sufi`, `l_compare_bs`, `l_missionaries`.
- Deck-check items (not in either test): `m_factor_trade`, `m_bhakti_caste`, `mt_saint_region`, `ar_regional` (Part 1); `m_khanqah`, `m_fatehpur`, `mt_missionary_events` (Part 2).

## How verified
- Build prints `NO ERRORS`, lint 0 errors and 0 warnings; run three times, `release.json` and `tests.json` byte-identical (md5); no `*.wip.json` left.
- Near-duplicate scan against all other chapters and exemplars: 0 flags (78 stems vs 29,782 others); SVG label overflow and overlap: 0 issues (4 figures).
- Every stem is specific to an imagined walk, notebook, panel, school or town, to stay clear of CBSE 7 History wording. No verse or saying is quoted.

## Facts for a reviewer to double-check
1. **Factors of composite culture:** long living together; patronage by rulers (Akbar's policy of tolerance as the example); the Bhakti and Sufi movements; trade and towns; the meeting of languages; artisans working for many patrons.
2. **Urdu** grew from Hindavi (also called Khari Boli), the speech of the Delhi region, with Persian, Arabic and Turkish words added.
3. **Bhakti principles:** devotion and love for one personal God; God reached through sincere devotion rather than elaborate ritual; many saints rejected caste distinctions and stressed equality; regional languages rather than Sanskrit alone; importance of the guru; pure living and service.
4. **Ramananda:** north India.
5. **Kabir:** a weaver of Varanasi; taught one God and unity and criticised empty ritual in every faith (stated as his teaching, neutrally; no saying quoted).
6. **Guru Nanak (1469 to 1539):** first Sikh Guru; Punjab; one God, equality, honest work, service, langar.
7. **Chaitanya Mahaprabhu (Bengal and Odisha, about 1486 to 1534):** kirtan.
8. **Mirabai:** Rajasthan; devotion to Krishna. **Tulsidas:** wrote the Ramcharitmanas in Awadhi. **Surdas:** a Bhakti poet-saint, placed in the Braj region on the map and table. **Namdev and Tukaram:** Maharashtra. **Sankardeva:** Assam. **Alvars and Nayanars:** earlier south Indian devotional saints (one line).
9. **Sufis:** mystics within Islam; love and devotion to God, simple life, service to humanity. **Pir (sheikh)** guides **murids**; **khanqahs** (hospices) open to all; **sama** (devotional music) in some orders; **silsilas** (orders): **Chishti** and **Suhrawardi** among the best known in India.
10. **Khwaja Moinuddin Chishti:** Ajmer; died about 1236. **Nizamuddin Auliya:** Delhi; died 1325. **Amir Khusrau (1253 to 1325):** poet and musician, disciple of Nizamuddin Auliya, linked with the qawwali tradition and "traditionally" credited with some musical innovations. The code asserts the order of the four death years used in the ordering item (about 1236, 1325, about 1534, 1539).
11. **Impact:** social harmony and a message of equality; growth of regional languages and literature (Hindi, Punjabi, Bengali, Marathi and others); devotional music (kirtan, bhajan, qawwali); simpler forms of worship; shrines and dargahs visited by people of many faiths.
12. **Composite culture examples:** Indo-Islamic architecture (arches, domes and minarets with brackets, chhatris and carved motifs; Fatehpur Sikri); Hindustani classical music, with Tansen at Akbar's court; Mughal miniature painting blending Persian and Indian styles; Urdu and Persian translations of Sanskrit works. The architecture figure is a schematic drawing, not a real building.
13. **Christian missionaries (education and social service only):** the Portuguese reached India from 1498 (Vasco da Gama); St Francis Xavier came to Goa in 1542; a printing press was set up in Goa about 1556; Jesuit priests visited Akbar's court about 1580; William Carey at Serampore from 1800 set up presses and translated texts into Indian languages including Bengali; missionaries founded schools and colleges, hospitals and orphanages, and some opposed social evils (stated generally, with no named campaign or controversy).
14. **Map:** the saints-by-region map is schematic, "not to scale; positions are approximate"; the India outline is a rough polygon and is not a survey map.

## Unsure / gaps
- **Surdas's region:** the brief gave no region for Surdas. The chapter places him in the Braj region (commonly taught); a reviewer may prefer to drop the region or confirm it.
- **Ramananda and Kabir** share a pin on the map under "north India" (the brief gave north India for Ramananda and Varanasi for Kabir); Kabir's Varanasi link is stated in the table and text.
- **Tulsidas's region** is given as "Awadh region" because the Ramcharitmanas was written in Awadhi; no town is named.
- The statement that some missionaries "opposed social evils" is general, on purpose, with no specific campaign named.
- "A printing press was set up in Goa about 1556" is called "an early press in India" in one model answer; a reviewer may prefer the plainer wording.
- No past-paper or specimen item was consulted; the built-in originality scan shows no duplicate stem.
