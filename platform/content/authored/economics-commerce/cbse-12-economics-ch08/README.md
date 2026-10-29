# CBSE Class 12 Economics, Chapter 8 — Liberalisation, Privatisation and Globalisation: An Appraisal

`cbse-12-economics-ch08` · release v1 · academic year 2026-27 · family `economics-commerce` (Part B: Indian Economic Development) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) on the pattern of the CBSE 10 Social Science economics chapters (`cbse-10-social-science-ch19`) and CBSE 12 Economics ch02/ch06. Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-12-economics-ch08/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, word limits, narration rules, editorial counts and the answer-leak scan, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` if anything fails). Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (22 + 20 slides), notes (6 sections), 32 flashcards, 78 questions (134 marks; 3 case-based items with 9 parts and 3 alternatives) |
| `tests.json` | `t_cbse12economics_ch08_short` (20 marks, 40 min) on `cbse-12-default-chapter-test-short` and `t_cbse12economics_ch08_long` (40 marks, 90 min) on `cbse-12-default-chapter-test-long`, item for item |
| `src/` | `lib.mjs` (builders, validation, SVG builder; same copy as ch01), `questions.mjs` (bank and computed figures), `build.mjs` |

## Scope
All three syllabus topics: t01 background and features of the 1991 reforms (crisis, IMF/World Bank, NEP, stabilisation vs structural reform; liberalisation of industry, finance, tax, foreign exchange, trade and investment; privatisation, disinvestment and ratna status; globalisation, outsourcing, WTO) — 38 items; t02 appraisal (growth, services, reserves, agriculture, industry, employment, fiscal policy; balanced arguments) — 19 items; t03 demonetisation and GST (meaning, objectives, observed effects; GST structure, input tax credit, GST Council) — 21 items.

### Decks
- **Part 1** (22 slides): controls before 1991, how the crisis built up (flow), the NEP and its two groups of measures, the five areas of liberalisation, privatisation (flow), outsourcing (flow), GATT vs WTO. **Worked examples:** import cover of imagined Vindhyapur (1.5 ÷ 3 = 0.5 month, SVG bars); a duty cut from 40 to 10 per cent on a ₹500 part (700 → 550); a 10 per cent disinvestment (5 crore shares × ₹80 = ₹400 crore). Four checks.
- **Part 2** (20 slides): yardsticks of appraisal, gains and concerns, growth led by services (SVG grouped bars of imagined Sonbhadra), agriculture, industry, jobs and finances, planning a balanced appraisal, demonetisation (flow, aims and effects), GST structure (flow), cascading vs GST (SVG bars). **Worked examples:** sector growth rates and the share of services (2.5 / 10 / 20 / 12 per cent; share 40 → 42.9); input tax credit at an imagined 10 per cent rate (100 + 30 = 130 vs cascading 240). Four checks.
- 32 of 42 slides carry a visual (3 SVG, 18 tables, 11 flows); narration ≤ 75 words (mean 51), no symbols.

### Question bank (78 items)
| Type | Count | Marks |
|---|---|---|
| mcq | 31 (keys a7 b8 c8 d8) | 1 |
| assertion-reason | 8 (keys a4 b2 c1 d1) | 1 |
| numerical | 7 (+ 4 inside cases) | 1–2 |
| true-false · fill-blank · match · ordering | 4 · 2 · 2 · 1 | 1 · 1 · 2 · 1 |
| short | 8 + 7 | 2 / 3 (`word_limit` 30–50 / 50–80) |
| long | 5 | 5 (`word_limit` 80–120) |
| case-based | 3 | 4: imagined Ranakpur's crisis, an imagined sector GDP table, an imagined GST conversation in Kanchanpur |

- Difficulty d1/d2/d3/d4 = 8/32/35/3. Competency: recall 7, understanding 27, application 18, analysis 20, evaluation 6 — **56% of items at application or above** (lint band 45–65%).
- **Tests** are disjoint and use no deck-check item. Short = A 3 MCQ + 1 A-R; B 2 + 2 + 3; C one of two 5-mark (NEP features | GST); D the GST case. Long = A 8 MCQ + 2 A-R; B 2 + 2 + (2|2) + 3 + (3|3); C appraisal + (privatisation | demonetisation); D the Ranakpur crisis and the sector table.

## Data and facts
- **All tables and scenarios are imagined** and labelled; every figure is computed in `questions.mjs`/`build.mjs` and asserted (the build stops if one drifts). The GST rate of 10 per cent is labelled as imagined, not an actual rate; no GST slab is stated (slabs have been revised by the GST Council).
- **Facts stated (please double-check):** 1991 reserves enough for about two weeks of imports; loans from the IMF and World Bank with reform conditions; an oil price jump in 1990 added to the import bill; NEP 1991 with stabilisation and structural reform measures; licensing retained only for a short list (alcohol, cigarettes, hazardous chemicals, industrial explosives and a few more); only a few strategic areas reserved for the public sector (atomic energy and railway operations given as examples); RBI from regulator to facilitator; rupee devalued in 1991, later largely market-determined; quotas removed in stages; WTO 1995, succeeding GATT (1948), India a founder member; demonetisation announced 8 November 2016 (old ₹500 and ₹1,000 notes ceased to be legal tender); GST from 1 July 2017, replacing taxes such as central excise, service tax and state VAT; CGST/SGST/IGST; GST Council of the Union Finance Minister and state finance ministers.
- **No dates** are given for the ratna statuses, and no Indian growth, reserve or revenue statistics are stated.
- **Neutrality:** appraisal, demonetisation and disinvestment items ask for both sides; model answers use "stated objective", "critics argue", "supporters point out", and keys never require a political verdict (the evaluation long answer accepts any well-argued view).
- **Originality:** no NCERT text, box, table or exercise is reused; no board or sample-paper item is reused.

## Gaps / reviewer notes
- SVG labels (3 charts) are placed by coordinates and have not been seen rendered; check at 360 px on staging.
- All 5 long questions are used across the two tests, so the bank has no spare 5-mark item.
