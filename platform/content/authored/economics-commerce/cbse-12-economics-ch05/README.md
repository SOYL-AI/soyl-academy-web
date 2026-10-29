# CBSE Class 12 Economics, Chapter 5 — Balance of Payments

`cbse-12-economics-ch05` · release v1 · academic year 2026-27 · family `economics-commerce` (Part A: Introductory Macroeconomics) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) on the pattern of the CBSE 10 Economics chapters (`social-science/cbse-10-social-science-ch19`) and CBSE 12 Economics ch02/ch03. Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-12-economics-ch05/src/build.mjs` from `platform/`); the build computes every BoP balance and exchange-rate equilibrium (with asserts that stop it if a figure quoted in narration changes), draws every curve from its equation, validates the schema, runs the pipeline lint and deterministic verify checks, word limits, narration rules, editorial counts and the answer-leak scan, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` if anything fails). Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (18 + 21 slides), notes (6 sections, 15 visuals), 31 flashcards, 69 questions (127 marks; 12 case parts plus alternatives) |
| `tests.json` | `t_cbse12economics_ch05_short` (20 marks, 40 min) and `t_cbse12economics_ch05_long` (40 marks, 90 min) on `cbse-12-default-chapter-test-short` / `-long`, item for item |
| `src/` | `lib.mjs` (builders, validation and the SVG chart builder; copy of ch01's), `questions.mjs`, `build.mjs` |

## Scope
All three syllabus topics: t01 the BoP account — meaning, current account (goods; invisibles: services, income, transfers), capital account (FDI, portfolio investment, external borrowing, banking capital), balance of trade vs current account balance, autonomous vs accommodating transactions, BoP surplus and deficit and the change in reserves · t02 exchange rate systems — fixed, flexible, managed floating with merits and demerits; devaluation/revaluation vs depreciation/appreciation · t03 free-market determination — sources and slopes of demand and supply of foreign exchange, equilibrium, effects of shifts, speculation.

### Decks
- **Part 1** (18 slides): meaning, structure, current account, balance of trade vs current account balance, capital account, autonomous and accommodating, deficit and reserves. **Worked examples:** classifying five transactions; the full BoP of imagined Sundaravan (trade −350, invisibles +400, current account +50, capital −170, overall −120, with an SVG bar chart); a trade deficit with a current account surplus. Four checks.
- **Part 2** (21 slides): the exchange rate, the three systems, defending a peg, merits and demerits, managed floating, the four words for value changes, demand and supply of dollars, equilibrium, shifts of demand and supply. **Worked examples:** reading rate changes; equilibrium from Qd = 500 − 5e, Qs = 5e − 100 (e = 60); predicting four events. Four checks.
- 31 of 39 slides carry a visual: 6 SVG figures (Sundaravan bars; demand curve; supply curve; equilibrium; demand shift 60 → 70; supply shift 60 → 50), 18 tables, 7 flows. Narration at most 68 words (mean 49), no symbols.

### Question bank (69 items)
| Type | Count | Marks |
|---|---|---|
| mcq | 25 | 1 |
| assertion-reason | 7 (keys b, a, d, a, d, a, c) | 1 |
| numerical | 5 (+ 4 inside cases) | 1–2 |
| true-false · fill-blank · match · ordering | 4 · 2 · 2 · 1 | 1 · 1 · 2 · 1 |
| short | 7 + 7 | 2 / 3 |
| long | 5 (including a full BoP numerical) | 5 |
| case-based | 4 (Islandia BoP table; Meenapuram remittances and FDI; the Marang peg; a free-market dollar schedule) | 4 |

- Difficulty d1/d2/d3/d4 = 10/30/24/5. Competency: recall 7, understanding 22, application 21, analysis 16, evaluation 3 — **58% at application or above** (lint band 45–65%). MCQ keys a6 b7 c6 d6.
- **Tests** are disjoint and use no deck-check item. Short = A 3 MCQ + 1 A-R; B 2 + 2 + 3; C one of two 5-mark; D the Islandia table. Long = A 8 MCQ + 2 A-R; B 2 + 2 + (2|2) + 3 + (3|3); C the BoP numerical + (5|5); D the dollar schedule and the Marang peg.

## Data and facts
- **All countries, accounts and schedules are imagined** and labelled; exchange rates in items are stated to be imagined, not market rates. The build asserts every figure: Sundaravan as above; Islandia trade −1,700, invisibles +2,300, current account +600, capital +1,000, overall +1,600; long numerical trade −850, invisibles +1,360, current account +510, overall +810; question market Qd = 640 − 4e, Qs = 6e − 160 → e = 80 (demand +100 → 90); case schedule excess demand 50 at ₹75, excess supply 50 at ₹85.
- **No Indian BoP statistics or current exchange rates** are given. The one dated fact: India moved from a pegged rate to a market-determined rate in stages in the early 1990s and follows managed floating, with the RBI intervening to curb sharp swings.
- **Classification conventions used** (please double-check against the 2026-27 textbook wording): income (compensation of employees, interest, dividends, profit) is a current-account invisible; interest on a foreign loan is current account, the loan itself capital account; NRI deposits are banking capital; central bank purchase or sale of foreign currency to cover a BoP gap is an accommodating (official reserve) transaction.
- **Originality:** no NCERT example, table or exercise is reused; every scenario and source is SOYL's own.

## Verifier pass (2026-10-29)
- Every key re-solved from the stem; each MCQ solution names the key letter (set in code) and explains the distractors by content.
- Sign conventions checked in every numerical (deficits are reported as positive sizes where the key is a size, so the deterministic verifier reads the value directly).
- Answer-leak scan clean; pipeline lint 0 errors, 0 warnings; deterministic verify 0 flags; rebuild is byte-identical.

## Gaps
- SVG label positions were set by coordinates and not seen rendered; please look at the six SVG figures on staging at 360 px.
- Errors and omissions are named but not used in numericals (kept out of scope for Class 12 practice).
