# ICSE Class 9 History & Civics, Chapter 17 — The Modern Age in Europe: Industrial Revolution, Capitalism and Socialism

`icse-9-history-civics-ch17` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` (the shared lib's default; drafted by Sonnet 5.5 under D-050) · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) for the ICSE Class 9 History & Civics syllabus; the last chapter of the subject. Built from `src/` with the shared lib `../icse-9-history-civics-ch01/src/lib.mjs` (imported, not edited). From `platform/`: `npx tsx content/authored/social-science/icse-9-history-civics-ch17/src/build.mjs`. The build checks the schema, the pipeline lint, the deterministic verify checks, the originality pre-check, word limits, narration rules, the answer-leak scan and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (21 + 22 slides; 16 and 18 with visuals: 4 SVG figures (Why-England causes web, inventions time line 1709 to 1830 drawn to scale, capitalism-versus-socialism comparison chart, flow from factory conditions to socialist ideas), the rest tables and flows; 4 and 3 checks; 2 and 3 worked examples); notes (6 sections); 34 flashcards; 77 questions |
| `tests.json` | `t_icse9historycivics_ch17_short` (20 marks, 30 min) on `icse-9-default-chapter-test-short`: Section A 4 MCQ + 1 AR + one 2-mark + one 3-mark, Section B one of two 10-mark questions. `t_icse9historycivics_ch17_long` (40 marks, 60 min) on `icse-9-default-chapter-test-long`: Section A 7 MCQ + 1 AR + three 2-mark + two 3-mark, Section B two of three 10-mark questions. The tests share no question and use no deck-check item. |
| `src/` | `questions.mjs` (bank), `build.mjs` (four SVG figures, tables, decks, notes, flashcards, tests) |

## Scope
All three syllabus topics are covered (no removed topics for this chapter):
- t01: meaning of the Industrial Revolution, where and when it began, the ten causes and why England came first, example inventions (textile, iron, steam, railway), and the changes it brought to industry, transport and society
- t02: capitalism: meaning and features; causes of its rise (capital, invested profits, banks and joint-stock companies, trade and colonies, the middle class, free trade and laissez-faire)
- t03: socialism: meaning; conditions of industrial workers; early socialist thinkers; Marx and Engels (works named, class struggle stated neutrally); trade unions and the Factory Act of 1833; comparison of the two systems on six points

Neutrality: capitalism and socialism are described as economic systems with features, merits claimed by supporters and criticisms made by critics. Neither is ranked, no present-day party or country is used as an example, and the only present-day line is that India follows a mixed economy. No work of Adam Smith, Marx, Engels or anyone else is quoted; only titles are named and ideas are paraphrased. No photographs, portraits or reproduced artefacts.

## Question bank (77 items)

| Type | Count | Notes |
|---|---|---|
| mcq | 31 | Keys a 7, b 8, c 8, d 8 |
| assertion-reason | 6 | ICSE option order; keys a, c, b, d, b, c |
| true-false · fill-blank · match · ordering | 4 · 3 · 3 · 2 | |
| short 2-mark | 11 | |
| short 3-mark | 7 | |
| long 10-mark | 7 | Each in 3 + 3 + 4 parts, with per-part step marks summing to 10 |
| source-based | 3 | An imagined debating-club note sheet, an imagined company notice, an imagined mill worker's letter. Each has an either/or part (c). |

- **Difficulty:** d1 8, d2 31, d3 31, d4 7.
- **Competency:** recall 10, understanding 30, application 20, analysis 13, evaluation 4. That puts 48% of items at application or above.
- **Topics (items tagged):** t01 28, t02 20, t03 27, plus 1 item spanning t01 and t03 and 1 spanning t02 and t03.

## Tests (item keys)
- Short: A = `m_define_ir`, `m_cap_define`, `m_soc_define`, `m_union`, `ar_colonies`, `s_joint_stock`, `s3_conditions`; B = attempt 1 of `l_causes_why`, `l_socialism`.
- Long: A = `m_when`, `m_bank`, `m_watt`, `m_cap_cause`, `m_market_price`, `m_factory_act`, `m_mixed`, `ar_factory_act`, `s_define_ir`, `s_laissez`, `s_owen`, `s3_cap_causes`, `s3_marx`; B = attempt 2 of `l_causes_eval`, `l_capitalism`, `l_compare`.
- Deck-check items (not in either test): `m_coal_iron`, `mt_inventions`, `ar_cheap_labour`, `tf_only_england` (Part 1); `m_joint_stock`, `m_long_hours`, `mt_thinkers` (Part 2).

## How verified
- Build prints `NO ERRORS`, lint 0 errors and 0 warnings; run three times, `release.json` and `tests.json` byte-identical (md5); no `*.wip.json` left.
- Near-duplicate scan against all other chapters and exemplars: 0 flags (77 stems vs 30,007 others); SVG label overflow and overlap: 0 issues (4 figures). The SVG pictures were checked by that estimate only, not viewed in a browser, so a visual glance is worthwhile.
- Every stem is specific to an imagined mill, town, club, letter or notice (Marlbeck, Tanwick, Ashgrove, Greywater, Dunmere, Orrin Falls, Harrow Collective), to stay clear of CBSE 9 and 10 wording on the same ground. No text is quoted.

## Facts for a reviewer to double-check
1. **Industrial Revolution:** the change from hand production in homes and workshops to machine production in factories using power (water, then steam); it changed industry, transport and society.
2. **Dates:** it began in England from about the **1750s or 1760s**, continued to about the **1830s or 1840s**, and then spread to other countries (approximate ranges, worded with "about").
3. **Causes (ten):** capital from trade and colonies; coal and iron deposits close together; colonies supplying raw materials (for example cotton) and markets; cheap labour from the enclosure movement and farming changes; a large navy and merchant shipping; political stability; a banking system (**Bank of England, 1694**); an agricultural revolution feeding a growing population; canals and roads; a spirit of invention.
4. **Inventions:** **John Kay**, flying shuttle, **1733**; **James Hargreaves**, spinning jenny, about **1764**; **Richard Arkwright**, water frame, **1769**; **Samuel Crompton**, mule, **1779**; **Edmund Cartwright**, power loom, **1785**; **James Watt**, improved steam engine, patent **1769**; **Abraham Darby**, smelting iron with coke, about **1709**; **George Stephenson**, locomotive **Rocket**, **1829**, and the **Liverpool to Manchester railway**, **1830**.
5. **Capitalism:** the means of production (land, factories, machines) are privately owned and run for profit; prices set by market demand and supply; competition; workers paid wages.
6. **Causes of its rise after the Industrial Revolution:** factories and machines needed large capital; merchants and entrepreneurs invested profits; banks and joint-stock companies grew; trade and colonies expanded; the middle class grew; ideas of free trade and limited state interference (laissez-faire) spread. **Adam Smith, The Wealth of Nations, 1776**: title and date only, nothing quoted.
7. **Socialism:** the means of production are owned or controlled by society or the state; it aims to reduce inequality and share wealth more fairly, often with planning and welfare.
8. **Conditions of workers:** often **12 to 16 hours** a day and low wages; child and women's labour in factories and mines; unsafe machines; crowded slums and disease; no job security; a widening gap between owners and workers.
9. **Early (utopian) socialists:** **Robert Owen** (New Lanark: houses, a school and shorter hours, as described in the chapter), **Saint-Simon** (industry organised for the good of society as a whole) and **Fourier** (small cooperative communities). The one-line descriptions of Saint-Simon and Fourier are the commonly taught summaries; a reviewer may prefer different wording.
10. **Karl Marx and Friedrich Engels:** **The Communist Manifesto**, **1848**; Marx's **Das Kapital**, first volume **1867**. The idea of class struggle is stated neutrally as their argument that classes with opposed interests (owners and workers) shaped history. Nothing is quoted.
11. **Trade unions** (associations of workers bargaining for wages, hours and safety) and **Britain's Factory Acts**, for example **1833**, which limited child labour (the chapter also says the Act of 1833 provided for inspectors, a commonly taught detail that a reviewer may wish to confirm).
12. **Comparison points:** ownership, motive (profit or social welfare), how prices and output are decided (market or planning), distribution of income, role of the state, competition. Merits and criticisms are given as "supporters point to ... critics point to ...".
13. **Mixed economy:** many countries, including India, follow a mixed economy (the only present-day statement in the chapter).
14. **Time-line figure:** drawn to scale from 1700 to 1840; the Rocket (1829) and the railway (1830) share one marker labelled "1829 and 1830".

## Unsure / gaps
- Hours "12 to 16 a day" and the Factory Act detail about inspectors are commonly taught generalisations, not exact figures for every factory.
- The Act of 1833 is described as limiting child labour in textile factories; later Acts are not covered.
- Imagined documents (Edith Pell's letter of the 1830s, the company notice of the late 1700s, the club notes) are labelled as imagined; the 1830s letter mentions a union and a law "spoken of", which is a plausible rather than a documented scene.
- The SVG figures were checked by the label-overflow estimate only, not viewed in a browser.
