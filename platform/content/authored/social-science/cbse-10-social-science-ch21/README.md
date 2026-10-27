# CBSE Class 10 Social Science, Chapter 21 — Globalisation and the Indian Economy

`cbse-10-social-science-ch21` · release v1 · academic year 2026-27 · family `social-science` (Economics) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored to the Economics standard set by `cbse-10-social-science-ch18` (D-025, D-026, D-032) and to the `board_assessed: false` convention set by `cbse-10-social-science-ch03` and `-ch12` (project-companion deck, labelled practice items, kept out of tests). Built from `src/` (`npx tsx content/authored/social-science/cbse-10-social-science-ch21/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, word limits, narration rules and the answer-leak scan, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON. `src/lib.mjs` is identical to ch19's and ch20's.

| File | What |
|---|---|
| `release.json` | 2 decks (21 board + 15 project companion), notes (6 sections, 11 visuals), 30 flashcards, 83 questions (155 marks; 24 passage parts and alternatives) |
| `tests.json` | `t_cbse10sst_ch21_short` (20 marks, 40 min) and `t_cbse10sst_ch21_long` (40 marks, 90 min) on the SST chapter-test blueprints, made of t01–t02 items only; the long test's compulsory 5-mark question is data-based (an imagined Tiruppur exporter, 1995 vs 2025) |

## Scope — and what is *not* examined
CBSE examines this chapter **only** for "What is globalisation?" and "Factors that have enabled globalisation". The syllabus marks t03 `board_assessed: false`: it is assessed only through the interdisciplinary project.

| Topic | Board? | Deck | Items tagged |
|---|---|---|---|
| t01 What is globalisation? | **Yes** | Part 1 | 25 |
| t02 Factors that have enabled globalisation (technology, liberalisation, WTO) | **Yes** | Part 1 | 43 |
| t03 Production across countries, impact, the WTO and fair globalisation | No — project only | Part 2 (project companion) | 15 |

- **WTO placement:** the WTO's aim, rules and the developed/developing-country criticism are taught in t02 (as an enabling factor, matching the learning outcome "international organisations"); MNC strategies, SEZs, impact on groups and fair globalisation are t03.
- **Part 1** (21 slides, board): the four channels, integration of markets through trade, MNCs and foreign investment, what moves freely and what does not, the factors (container journey, IT-delivered services), trade barriers, India's policy timeline (1947 → 1991 → WTO 1995 → 2020s agreements), why protect then and open later, the WTO. **Worked examples:** an imagined electric scooter made in five places; how an import duty changes a price (₹1,200 lamp: ₹1,500 at 25%, ₹1,260 at 5%); planning a five-mark "factors" answer. Four checks.
- **Part 2** (15 slides, project companion), titled and narrated as "not examined in the board paper": how MNCs spread production, an interlinked cashew chain, SEZs and production-linked incentives, who gains and who loses, Indian companies abroad (Tata Steel–Corus 2007, Bharti Airtel in Africa 2010), the hard side for small producers and workers, fair globalisation. **Worked examples:** a shop survey of brand and place of manufacture; planning a balanced project. Three checks (all t03 items). It ends with project tips on the `exam-tips` slide.
- 25 of 36 slides carry a visual (17 tables, 8 flows); narration 9–72 words (mean 54), no symbols.

## Question bank (83 items)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 28 (6 project) | 1 | scenarios (mangoes and kiwis, phone brands in Kochi, a Kochi studio colouring a comic for a Tokyo publisher, an edible-oil quota, a bicycle duty cut, India's recent trade agreements), a statement-combination item, a "NOT globalisation" item |
| assertion-reason | 8 (1 project) | 1 | keys a4 b2 c1 d1 |
| numerical | 4 (+ 5 inside cases) | 1–2 | import duty on a toy (₹600), a duty cut (₹400 lower), export share (15%), a firm's saving from lower duty and freight (₹2,30,000, d4) |
| true-false · fill-blank · match · ordering | 4 · 4 · 3 · 2 | 1 · 1 · 2 · 1 | ordering: India's trade policy over time; an MNC's order to small producers (project) |
| short | 11 + 7 | 2 / 3 | `word_limit` 25–40 / 40–60; includes "why liberalisation alone would not have been enough" and evaluating the WTO's fairness (d4) |
| long | 6 (1 project) | 5 | includes the **table-based** exporter question (d4), "MNCs are the main drivers" (d4) and "was 1991 wise?" (d4) |
| source-based | 3 | 4 | a student's supermarket article in Bengaluru, a crane operator's diary at a Chennai container terminal, a Ludhiana bicycle-parts maker's letter of 1993 |
| case-based | 3 (1 project) | 4 | an imagined smartphone's value chain, the imagined country Sagarland's duties and imports, an imagined SEZ's jobs and land (project) |

- **Project items (t03):** 15 items; every stem starts with *"(Interdisciplinary project topic: practice only, not assessed in the board exam.)"*; they serve as Part 2's checks and practice and are **never used in the tests**.
- Difficulty d1/d2/d3/d4 = 16/34/28/5. Competency: recall 14, understanding 24, application 17, analysis 23, evaluation 5 — **54% of items and 63% of marks at application or above** (53% for the board topics alone).
- MCQ keys a7 b6 c7 d8; T/F 2 true, 2 false.
- **Tests** are disjoint, use only t01–t02 items and no deck-check item. Short = A 3 MCQ + 1 A-R; B 2 + 2 + 3; C one of two 5-mark; D the container-terminal diary. Long = A 8 MCQ + 2 A-R; B 2 + 2 + (2|2) + 3 + (3|3); C exporter data question + (5|5); D the 1993 letter and the supermarket article.

## Data and facts
- **All firms, countries and tables are imagined** and labelled; every figure is recomputed by the build (see `build.checks.data`): Sagarland's duty fell 80 − 12 = 68 points while imports rose 600 ÷ 40 = 15 times; Nova X value shares sum to 100 (35 + 20 + 15 = 70% outside India's 12%); SEZ jobs 18,000 ÷ 30,000 = 60% on short contracts.
- Real facts kept to stable, checkable ones: India removed barriers to a large extent from **1991**; the **WTO** began in **1995** with India a member, has more than 160 members, and came about at the initiative of developed countries; India's agreements with the **UAE and Australia (2022)** and the **United Kingdom (signed 2025)**; the **SEZ Act 2005**; **production-linked incentives since 2020**; **Tata Steel–Corus (2007)** and **Bharti Airtel in Africa (2010)**. Recent agreements are mentioned only as examples of liberalisation, never as test keys about their content.
- **Originality:** NCERT's examples (an American car company in Chennai, a food MNC buying a local company, Chinese toys, a capacitor maker, a garment exporter, its list of Indian MNCs, its Delhi-designed London magazine) are not reused; every source and scenario is SOYL's own.

## Verifier pass (2026-10-27)
- Every key re-solved from the stem; MCQ solutions name the key letter set in code.
- The build's answer-leak scan caught three key-side sentences that repeated deck or notes sentences (the definition of globalisation in a solution and in the Part 1 summary narration; the definitions in two short model answers); all three were reworded.
- One project long answer was below its word limit (69 words) and was expanded to five full points; one d4 numerical item was added so that at least five items are at d4.
- The A-R project item now carries the practice-only label before the assertion (the builder gained an optional prefix; ch19 and ch20 rebuild byte-identical).

## Gaps
- No **map** item: the chapter has no map work.
- If CBSE restores t03 to the board paper, Part 2 and its 15 items would need a full bank and test items.
