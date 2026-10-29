# CBSE Class 12 Economics, Chapter 6 — Indian Economy on the Eve of Independence

`cbse-12-economics-ch06` · release v1 · academic year 2026-27 · family `economics-commerce` (Part B: Indian Economic Development) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) on the pattern of the CBSE 10 Social Science economics chapters (`cbse-10-social-science-ch19`) and CBSE 12 Economics ch02/ch03. Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-12-economics-ch06/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, word limits, narration rules, editorial counts and the answer-leak scan, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` if anything fails). Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (20 + 19 slides), notes (7 sections), 32 flashcards, 72 questions (123 marks; 3 case-based items with 9 parts and 3 alternatives) |
| `tests.json` | `t_cbse12economics_ch06_short` (20 marks, 40 min) on `cbse-12-default-chapter-test-short` and `t_cbse12economics_ch06_long` (40 marks, 90 min) on `cbse-12-default-chapter-test-long`, item for item |
| `src/` | `lib.mjs` (builders, validation, SVG builder; same copy as ch01), `questions.mjs` (bank and computed figures), `build.mjs` |

## Scope
The one syllabus topic, t01 (state of the Indian economy in 1947), in all its parts: colonial aims and low income/slow growth; agriculture (zamindari, revenue terms, technology, irrigation, commercialisation); industry (de-industrialisation and its two-fold motive, modern cotton/jute/steel industry, no capital goods base, small public sector); foreign trade (composition, British monopoly, Suez Canal, export surplus as a drain); demography (1881 census, 1921 great divide, literacy, life expectancy, infant mortality); occupational structure and regional variation; infrastructure (railways, roads, waterways, posts, telegraph) appraised on both sides.

### Decks
- **Part 1** (20 slides): the colonial loop (flow), income estimators and growth, agriculture as the largest but stagnant sector, the zamindari flow, causes of stagnation, commercialisation, de-industrialisation (flow), the two-fold motive, modern industries table, the weak base. **Worked examples:** reading an imagined village account for features of colonial agriculture; percentage fall in an imagined weaver's income (240 → 150 = 37.5%). Four checks.
- **Part 2** (19 slides): composition and direction of trade, Suez, the drain (flow), the demographic transition (schematic SVG of birth and death rates around 1921), quality-of-life indicators, occupational structure (SVG bar chart of approximate shares), regional variation, railways (two-column), other infrastructure. **Worked examples:** export surplus of an imagined port (74 − 51 = 23 lakh) and its interpretation; agriculture's share in an imagined district (73%); planning a five-mark appraisal. Four checks.
- 28 of 39 slides carry a visual (2 SVG, 16 tables, 10 flows); narration ≤ 75 words, no symbols.

### Question bank (72 items)
| Type | Count | Marks |
|---|---|---|
| mcq | 29 | 1 |
| assertion-reason | 7 (keys a3 b2 c1 d1) | 1 |
| numerical | 5 (+ 2 inside cases) | 1 |
| true-false · fill-blank · match · ordering | 4 · 2 · 2 · 1 | 1 · 1 · 2 · 1 |
| short | 8 + 6 | 2 / 3 (`word_limit` 30–50 / 50–80) |
| long | 5 | 5 (`word_limit` 80–120) |
| case-based | 3 | 4: an imagined weaver's letter (1885), an imagined province's workforce table, an imagined port officer's report (1910) |

- Difficulty d1/d2/d3/d4 = 10/26/30/6. Competency: recall 12, understanding 19, application 13, analysis 20, evaluation 8 — **57% at application or above** (band 45–65%). MCQ keys a7 b7 c7 d8.
- **Tests** are disjoint and use no deck-check item. Short = A 3 MCQ + 1 A-R; B 2 + 2 + 3; C one of two 5-mark; D the weaver's letter. Long = A 8 MCQ + 2 A-R; B 2 + 2 + (2|2) + 3 + (3|3); C appraisal question + (5|5); D the province table and the port report.

## Data and facts (for the reviewer)
- **Imagined figures** (all computed by the build): province 1,80,000 of 2,50,000 workers in agriculture = 72%, services 45,000 = 18%; exports 380 − imports 290 = ₹90 crore surplus; literacy 2,400/15,000 = 16%; infant mortality 218 per thousand on 5,000 births = 1,090; weaver 240 → 150 = 37.5% fall.
- **Approximate all-India facts used** (commonly taught; please double-check wording): about 85 per cent of people dependent on agriculture; workforce agriculture 70–75, manufacturing about 10, services 15–20 per cent; growth of aggregate real output under 2 per cent and per capita about half a per cent a year (first half of the twentieth century); literacy under 16 per cent, female about 7 per cent; life expectancy about 32 years; infant mortality over 200 per thousand (the numerical uses 218 as a stated rate); more than half of trade with Britain, the rest mainly China, Ceylon, Persia.
- **Dates:** 1853 first passenger train; 1869 Suez Canal; 1881 first census; 1907 TISCO; 1921 the great divide.
- **Regional variation** (agriculture's share fell slightly in parts of Madras, Bombay and Bengal presidencies; rose in Orissa, Rajasthan, Punjab) and the **Orissa coastal canal** example are standard textbook points stated qualitatively; a reviewer should confirm.
- The demographic-transition SVG is explicitly **schematic** (shapes, not data).
- **Neutrality:** colonial infrastructure is appraised with gains and costs; no judgement beyond the economic record.
- **Originality:** every case, letter, report and table is SOYL's own and labelled as imagined; no NCERT text, exercise or board/sample-paper item reused.

## Gaps
- SVG label placement was set by coordinates and has not been seen rendered; check at 360 px on staging.
- One topic id (t01) covers the whole chapter, as in the syllabus, so topic-level analytics cannot separate agriculture, industry, trade and so on.
