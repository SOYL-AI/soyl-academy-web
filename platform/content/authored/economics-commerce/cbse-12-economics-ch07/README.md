# CBSE Class 12 Economics, Chapter 7 — Indian Economy 1950-1990

`cbse-12-economics-ch07` · release v1 · academic year 2026-27 · family `economics-commerce` (Part B: Indian Economic Development) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) on the pattern of the CBSE 10 Social Science economics chapters (`cbse-10-social-science-ch19`) and CBSE 12 Economics ch02/ch06. Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-12-economics-ch07/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, word limits, narration rules, editorial counts and the answer-leak scan, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` if anything fails). Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (22 + 17 slides), notes (7 sections), 31 flashcards, 71 questions (123 marks; 3 case-based items with 9 parts and 3 alternatives) |
| `tests.json` | `t_cbse12economics_ch07_short` (20 marks, 40 min) on `cbse-12-default-chapter-test-short` and `t_cbse12economics_ch07_long` (40 marks, 90 min) on `cbse-12-default-chapter-test-long`, item for item |
| `src/` | `lib.mjs` (builders, validation, SVG builder; same copy as ch01), `questions.mjs` (bank and computed figures), `build.mjs` |

## Scope
All four syllabus topics: t01 economic system, planning and the four goals (and their conflicts); t02 land reforms (intermediaries, ceilings, tenancy) and the Green Revolution (HYV package, two phases, marketed surplus, buffer stocks, risks, subsidy debate); t03 public sector, IPR 1956 (three categories, licensing, regional balance) and small-scale industry (Karve Committee, reservation); t04 import substitution (tariffs, quotas, infant industry, effects). A closing appraisal of 1950–90 (tagged t01 + t03) leads into ch08.

### Decks
- **Part 1** (22 slides): economic systems, planning institutions (flow), the four goals (SVG), conflicts, land reforms table, why ceilings failed, the Green Revolution package (flow), yield bars (SVG, imagined district 1,200 → 2,100 kg/ha = 75%), two phases, gains for the poor, fears and responses, the subsidy debate. **Worked examples:** land ceiling (36 − 12 = 24 ha, 8 families of 3 ha); marketed surplus (80 − 20 = 60 quintals, 75%). Four checks.
- **Part 2** (17 slides): why the state led industry, IPR 1956, licensing, small-scale industry, import substitution, tariff vs quota, effects of protection, appraisal, the reform debate. **Worked examples:** a tariff on an imagined radio (500 + 80% = 900 against 750 at home; stacked-bar SVG); reading a licensing/protection case. Three checks.
- 29 of 39 slides carry a visual (3 SVG, 17 tables, 9 flows); narration ≤ 66 words (mean 52), no symbols.

### Question bank (71 items)
| Type | Count | Marks |
|---|---|---|
| mcq | 28 | 1 |
| assertion-reason | 8 (keys a4 b2 c1 d1) | 1 |
| numerical | 6 (+ 4 inside cases) | 1–2 |
| true-false · fill-blank · match · ordering | 4 · 2 · 2 · 1 | 1 · 1 · 2 · 1 |
| short | 7 + 4 | 2 / 3 (`word_limit` 30–50 / 50–80) |
| long | 6 | 5 (`word_limit` 80–120) |
| case-based | 3 | 4: an imagined village after HYV seeds (marketed-surplus table), an imagined scooter maker's diary (licensing and protection), an imagined state's output table (industry's share 15% → 24%) |

- Difficulty d1/d2/d3/d4 = 9/31/27/4. Competency: recall 6, understanding 26, application 14, analysis 20, evaluation 5 — **55% at application or above** (band 45–65%). MCQ keys a7 b7 c7 d7.
- **Tests** are disjoint and use no deck-check item. Short = A 3 MCQ + 1 A-R; B 2 + 2 + 3; C one of two 5-mark; D the village case. Long = A 8 MCQ + 2 A-R; B 2 + 2 + (2|2) + 3 + (3|3); C the 1950–90 appraisal + (5|5); D the scooter diary and the state table.

## Data and facts (for the reviewer)
- **Imagined figures** (all computed by the build): marketed surplus 50 − 12 = 38 quintals = 76%; ceiling 40 − 15 = 25 ha → 10 families of 2.5 ha; tariff 60% on ₹2,00,000 = ₹1,20,000, landed ₹3,20,000 (₹40,000 above the ₹2,80,000 home price); yield +75%; quota 10,000 − 2,500 = 7,500; industry 90/600 = 15% and 360/1,500 = 24%; village surpluses 90% and 20%; productivity ratio 45 ÷ 18 = 2.5.
- **Facts used** (stable, stated broadly; please double-check wording): Planning Commission 1950 (PM as chairperson), First Plan from 1951, NITI Aayog 2015; IPR 1956 as the basis of the Second Plan with three categories; Karve Committee 1955; small-scale units defined by an investment ceiling raised over time (no rupee limit stated); Green Revolution from the mid-1960s, first phase mainly wheat in better-off irrigated states such as Punjab, second phase (mid-1970s to mid-1980s) more states and rice; Kerala and West Bengal as states with more land-reform success; around two-thirds of the workforce in agriculture by 1990 (approximate).
- **Neutrality:** the subsidy debate, the role of the public sector, protection and the case for the 1991 reforms are all presented with both sides.
- **Originality:** every case, diary, table and scenario is SOYL's own and labelled as imagined; no NCERT text, exercise or board/sample-paper item reused. `m_karve` names real bodies (Election Commission, Finance Commission, Narasimham Committee on banking) only as wrong options.

## Gaps
- SVG label placement (goals diagram, yield bars, tariff bars) was set by coordinates and has not been seen rendered; check at 360 px on staging.
- `ar_ps_loss` (key b) turns on "R does not explain A"; a reviewer may want to confirm the wording reads unambiguously.
