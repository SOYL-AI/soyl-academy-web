# CBSE Class 12 Economics, Chapter 13 — Comparative Development Experiences of India and its Neighbours

`cbse-12-economics-ch13` · release v1 · academic year 2026-27 · family `economics-commerce` (Part B: Indian Economic Development) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) on the pattern of `cbse-10-social-science-ch19` and CBSE 12 Economics ch06/ch10. Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-12-economics-ch13/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, word limits, narration rules, editorial counts and the answer-leak scan, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` if anything fails). Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (20 + 20 slides; 24 visuals: 3 SVG, 13 tables, 8 flows; 4 + 4 checks; 2 + 2 worked examples; narration ≤ 71 words, no symbols), notes (6 sections), 30 flashcards, 73 questions (127 marks; 4 case-based items with internal choice in part (c)) |
| `tests.json` | `t_cbse12economics_ch13_short` (20 marks, 40 min) on `cbse-12-default-chapter-test-short` and `t_cbse12economics_ch13_long` (40 marks, 90 min) on `cbse-12-default-chapter-test-long`, item for item, disjoint, no deck-check items |
| `src/` | `lib.mjs` (same copy as ch01), `questions.mjs` (bank and computed figures), `build.mjs` |

## Scope
- **t01 India and Pakistan:** similar starting points (1947), mixed economy, import substitution, Green Revolution, nationalisation of capital goods industries in the 1970s, turn to the private sector, reforms from 1988, remittances and foreign aid, reasons for uneven growth, services as the largest sector in both.
- **t02 India and China:** PRC 1949, first plan 1953, Great Leap Forward (1958), backyard industries and communes, setbacks (famine, withdrawal of Soviet experts), Cultural Revolution (1966–76), reforms from 1978 in phases (household plots, township and village enterprises, competition for state-owned enterprises, dual pricing, SEZs and FDI), one-child policy (ageing, sex ratio), manufacturing-led vs services-led growth, human development (broad order only), liberty indicators, appraisal.
- Items comparing all three countries carry both topic ids.

### Decks
- **Part 1** (starting points, Pakistan, China before 1978): route map, why compare (SAARC 1985), starting-points table, three-lane SVG timeline, Pakistan's six-step path, Green Revolution and 1970s, 1988 reforms and sources of foreign exchange, **worked example 1** (per capita growth ≈ GDP growth − population growth for imagined countries P and Q: 3.5 vs 4 per cent), why growth was uneven, China after 1949, Great Leap Forward, the commune, setbacks and the Cultural Revolution, **worked example 2** (ordering events with country and year), summary, exam tips. Four checks.
- **Part 2** (China's reforms and the comparison): reforms in phases, communes vs household plots, dual pricing, **worked example 3** (an imagined factory: 32,000 under dual pricing vs 28,000 at a single fixed price; SVG bars), TVEs and SEZs, population comparison, SVG age structure of an imagined country before and after a one-child limit, sex ratio and density, output and sectors, human development, what the indices leave out, **worked example 4** (planning a four-point India–China comparison in a table), appraisal, summary, exam tips. Four checks.

## Data and facts
- **No current statistics** for India, China or Pakistan are stated anywhere (no GDP, growth rates, HDI ranks or population numbers). Comparisons are qualitative: China's growth manufacturing-led and fastest after 1978; India and Pakistan services-led; China ahead on most human development indicators, India and Pakistan close, each ahead on some; sex ratio low in all three.
- **All figures are imagined** and computed by the build (asserts in `questions.mjs` and `build.mjs`): growth 6 per cent; per capita income ₹3,000; sex ratio 930; density 300 per sq km; services share 45 per cent; per capita growth 5 per cent; elderly share 22 per cent; Meghdesh remittances ₹72 thousand crore; doubling time 35 years; Countries A/B/C table (per capita growth of C = 2 per cent).
- **Real-world facts (please double-check):** India and Pakistan independent 1947; PRC 1949; first five-year plans announced India 1951, China 1953, Pakistan 1956 (Pakistan's first plan called the Medium Term Development Plan — the textbook convention; its plan period is usually given as 1955–60); Great Leap Forward 1958; Cultural Revolution 1966–76; China's reforms 1978, Pakistan's 1988, India's 1991; one-child policy from the late 1970s (about 1979), later relaxed; Pakistan nationalised capital goods industries in the 1970s; SAARC set up in 1985.
- **Great Leap Forward setbacks** are worded neutrally as "a severe famine, linked to drought and to the campaign's own policies" plus the withdrawal of Soviet experts (textbooks stress the drought; historians stress policy too).
- **Liberty indicators** are mentioned as a general limit of human development indices, without ranking any country on freedoms.
- Cases: an imagined three-country table (A, B, C), an imagined account of a farming family in a Chinese village before and after 1978, an imagined survey of the invented country Meghdesh, and an imagined news report from the invented country Tianmar (one-child limit). All labelled as SOYL originals.

### Question bank (73 items)
mcq 28 (keys a7 b7 c7 d7) · assertion-reason 6 (a, b, a, a, c, d) · numerical 7 · true-false 4 · fill-blank 2 · match 2 · ordering 1 · short 8 (2 marks) + 6 (3 marks) · long 5 · case-based 4. Difficulty d1 3, d2 35, d3 31, d4 4. Competency recall 8, understanding 26, application 15, analysis 21, evaluation 3: **53% at application or above** (band 45–65%). Topics t01 20, t02 42, both 11.

### Tests
- **Short:** A `m_pak_mixed`, `m_glf`, `m_hdi_order`, `ar_reform_growth`; B `s_sez_role`, `s_pak_greenrev`, `s3_china_reforms`; C (`l_china_path` | `l_pak_path`); D `cb_village`.
- **Long:** A 8 MCQ + 2 A-R; B `s_glf_fail`, `s_one_child_effects`, (`s_commune_vs_plot` | `s_pak_growth_slow`), `s3_ind_pak_compare`, (`s3_china_india_sector` | `s3_glf_vs_reforms`); C `l_three_compare` + (`l_hdi_compare` | `l_lessons`); D `cb_three`, `cb_meghdesh`.
- All 5 long items are used across the two tests; spare: 2 two-mark and 2 three-mark shorts, 1 case (`cb_population`).

## Verifier pass (2026-10-29)
- Every key re-solved from the stem; MCQ solutions name the key letter (set in code) and explain distractors.
- Every figure computed in code; lint and deterministic verify 0 errors, 0 warnings, 0 flags; stems checked against every other authored chapter for exact duplicates (none).
- Answer-leak scan clean.

## Gaps
- SVG labels (timeline, dual-pricing bars, age-structure bars) were placed by coordinates and not seen rendered; check at 360 px on staging.
- The dated facts above should be re-checked by the Lead or content-verifier before publishing.
