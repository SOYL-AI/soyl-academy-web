# CBSE Class 10 Social Science, Chapter 19 — Sectors of the Indian Economy

`cbse-10-social-science-ch19` · release v1 · academic year 2026-27 · family `social-science` (Economics) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored to the Economics standard set by `cbse-10-social-science-ch18` (D-025, D-026, D-032), following `platform/content-templates/prompts/social-science/*.v1.md`. Built from `src/` (`npx tsx content/authored/social-science/cbse-10-social-science-ch19/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, word limits, narration rules and the answer-leak scan, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (21 + 16 slides), notes (7 sections, 10 visuals), 32 flashcards, 92 questions (177 marks; 28 passage parts and alternatives) |
| `tests.json` | `t_cbse10sst_ch19_short` (20 marks, 40 min) and `t_cbse10sst_ch19_long` (40 marks, 90 min) on the SST chapter-test blueprints; the long test's compulsory 5-mark question is the data-based one (imagined state Ranipur) |
| `src/` | `lib.mjs` (builders and validation, adapted from the CBSE English chapters' lib), `questions.mjs`, `build.mjs` |

## Scope
All five topics: t01 the three sectors and interdependence (15 tags) · t02 GDP, comparing the sectors over time, disguised unemployment and underemployment (32) · t03 creating employment, MGNREGA 2005 (18) · t04 organised and unorganised sectors (18) · t05 public and private sectors (15).

### Decks
- **Part 1** (21 slides): economic activities, the three sectors, one product through three sectors (milk), interdependence (cotton chain), GDP and final vs intermediate goods, the historical shift in developed countries (line plot of an imagined country, 1800–2000), India's output vs employment shares (bar plot, rounded and approximate), why services grew, disguised unemployment vs underemployment, ways to create jobs, MGNREGA 2005. **Worked examples:** classifying six activities in an imagined Kerala village; the wheat–flour–bread double-counting trap (₹2,000, checked by value added 800 + 400 + 800); measuring disguised unemployment (7 − 4 = 3). Four checks.
- **Part 2** (16 slides): organised sector, who works in the unorganised sector (including app-based workers), the comparison, contract work inside big firms, protection (minimum wages, social security and e-Shram, credit, cooperatives), public vs private, why the government provides infrastructure, support, food security and social services. **Worked examples:** classifying five imagined workers; the FCI → ration-shop chain; planning a five-point comparison. Three checks.
- 26 of 37 slides carry a visual (16 tables, 8 flows, 2 plots); narration 14–84 words (mean 59), no symbols.

### Question bank (92 items)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 32 | 1 | classification scenarios (mushrooms in Solan, a dairy, a Meerut bat factory, an app delivery rider, a head-load worker), a statement-combination item, two "NOT" items |
| assertion-reason | 8 | 1 | keys a3 b2 c2 d1 |
| numerical | 4 (+ 6 inside cases) | 1–2 | GDP of a value chain, disguised unemployment, a sector's share (54%), MGNREGA days left; `value` + `unit` |
| true-false · fill-blank · match · ordering | 4 · 4 · 3 · 2 | 1 · 1 · 2 · 1 | ordering: stages of sector change; the MGNREGA process |
| short | 11 + 10 | 2 / 3 | `word_limit` 25–40 / 40–60; includes "why jobs lag output", "uneven tertiary growth", nurse vs domestic worker |
| long | 7 | 5 | includes the **table-based** Ranipur question (d4) and an evaluation of protection for unorganised workers (d4) |
| source-based | 4 | 4 | a gram sabha's minutes on MGNREGA works, a delivery rider's diary, a farmer's letter on surplus sons, a municipal debate on privatising buses |
| case-based | 3 | 4 | MGNREGA days and wages of three households; a bank clerk vs a brick-kiln worker; sector output and workers of the imagined state Navgarh |

- Difficulty d1/d2/d3/d4 = 20/41/26/5. Competency: recall 12, understanding 24, application 26, analysis 26, evaluation 4 — **61% of items and 72% of marks at application or above** (lint band 45–65%).
- MCQ keys a8 b9 c8 d7; T/F 1 true, 3 false.
- **Tests** are disjoint and use no deck-check item. Short = A 3 MCQ + 1 A-R; B 2 + 2 + 3; C one of two 5-mark; D the gram sabha source. Long = A 8 MCQ + 2 A-R; B 2 + 2 + (2|2) + 3 + (3|3); C Ranipur data question + (5|5); D the rider's diary and the farmer's letter.

## Data and facts
- **All tables are imagined** and labelled so; the build checks every share: Ranipur's four columns each sum to 100; Navgarh 60 + 50 + 90 = 200 and 90 + 150 + 360 = 600, tertiary 360/600 = 60%, primary workers 120/250 = 48%, primary output 90/600 = 15%; MGNREGA wages 60 × 300 = 18,000; kiln income 180 × 550 = 99,000.
- **India's pattern** is stated qualitatively (services produce more than half of GDP, the primary sector less than a fifth; the primary sector still employs a little under half of workers). The one chart of real shares is labelled "rounded, approximate, recent years" (GDP about 18/28/54, workers about 46/25/29).
- **MGNREGA 2005:** 100 days per rural household per year, work within 15 days or an unemployment allowance, at least one-third women, priority to water and land works, payment into accounts, social audit; named NREGA in 2005 and renamed in 2009.
- **Dated updates (please verify before publishing):** (1) in December 2025 Parliament passed the Viksit Bharat – Guarantee for Rozgar and Ajeevika Mission (Gramin) Act to replace MGNREGA with a 125-day rural job guarantee; the decks and notes mention this as an update only, and no question tests it, because the 2026-27 syllabus still names MGNREGA 2005; (2) the four labour codes came into force in November 2025 (mentioned once in Part 2 and in the notes). Also stated: e-Shram has more than 30 crore registrations; about 80 crore people get grain through ration shops.
- **Originality:** no NCERT example, table or exercise is reused (its named families, the five-member farm, the dal mill, the Planning Commission education-jobs estimate, and the TISCO/RIL examples are all avoided). Every source and scenario is SOYL's own.

## Verifier pass (2026-10-27)
- Every key re-solved from the stem; each MCQ solution names the key letter (set in code, so key and solution cannot drift) and explains the distractors by content.
- Classification edge cases checked: repair and transport → tertiary; a home potter → secondary; a contract security guard in a bank → unorganised; a nationalised-bank clerk → public **and** organised (used as a case part on the bases of classification). Mining is mentioned nowhere as a test key, because textbooks differ on placing it.
- Numbers: every figure in decks, cases and solutions recomputed by the build (pipeline lint and verify: 0 errors, 0 warnings, 0 flags).
- Answer-leak scan: no solution or model-answer sentence of 60+ characters appears in decks, notes, flashcards or public question fields.

## Gaps
- **Plot categories:** bar series have no category labels, so sectors are numbered on the x-axis and named in the axis label and caption.
- No **map** item: the chapter has no map work in the 2026-27 syllabus.
- The two dated updates above should be re-checked by the Lead or content-verifier before the chapter is published.
