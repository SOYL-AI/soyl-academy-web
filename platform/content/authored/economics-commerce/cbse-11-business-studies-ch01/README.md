# CBSE Class 11 Business Studies, Chapter 1: Nature and Purpose of Business

`cbse-11-business-studies-ch01` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) to the CBSE 12 Business Studies standard. Run `npx tsx content/authored/economics-commerce/cbse-11-business-studies-ch01/src/build.mjs` from `platform/`. The build checks the schema, the pipeline lint, the deterministic verify checks, word limits, narration rules, the answer-leak scan, the exact-stem originality pre-check and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (21 + 22 slides, every slide with a visual), notes (6 sections), 29 flashcards, 79 questions (149 marks) |
| `tests.json` | `t_cbse11businessstudies_ch01_short` (20 marks, 40 min) and `_long` (40 marks, 90 min) on `cbse-11-default-chapter-test-short` / `-long`, item for item, disjoint, no deck-check item |
| `src/` | `lib.mjs` (shared CBSE 11 Business Studies library, unchanged), `questions.mjs`, `build.mjs` |

## Scope

| Topic | Coverage |
|---|---|
| t01 | History of trade and commerce in India: Indus Valley trade, indigenous banking, trade routes, guilds, intermediaries |
| t02 | Economic and non-economic activities; business, profession and employment; characteristics and objectives of business |
| t03 | Classification: primary, secondary and tertiary industry; commerce, trade and auxiliaries to trade |
| t04 | Business risk: meaning, nature and causes |

Starting a business is not taught (it is not a syllabus topic).

### Decks

**Part 1 (t01, t02):** trade and routes, indigenous banking, guilds and intermediaries, economic activities, the comparison chart (SVG), characteristics, objectives and why profit is not enough. Three worked examples: identifying the activity, testing whether a case is business, and naming the objective. Five check slides (items not used in the tests).

**Part 2 (t03, t04):** the classification tree (SVG), primary and secondary industries, commerce, kinds of trade, the auxiliaries-and-hindrances flow (SVG), business risk and the causes-of-risk web (SVG). Three worked examples: classifying firms, spotting the auxiliary, naming the cause. Five check slides.

### Question bank (79)

36 mcq, 5 assertion-reason (verdicts a, a, b, d, c), 3 true-false, 2 fill-blank, 3 match, 2 ordering, 10 short 2-mark, 7 short 3-mark, 6 long 5-mark, 5 case-based (4 marks: 1 + 1 + 2, part (c) with an either/or). 59% of items are application or above. Imagined firms and people only: Machhuwadi Fishers' Society, Ramesh Stores, Sagar Overseas, the port of Suvarnapur, Bhima Cement Works, Dr. Nisha, Gopal and others.

### Tests

- Short (20 marks): A = m_profession_doc, m_synthetical, m_risk_natural, ar_profit; B = s_shreni, s_econ_noneco, s3_manuf; C = one of l_chars / l_risk; D = cb_machhuwadi.
- Long (40 marks): A = 8 mcq + ar_aux, ar_risk; B = s_indig, s_two_obj, one of s_wh_ret / s_risk_meaning, s3_profit, one of s3_intermed / s3_risk_nature; C = l_compare, one of l_objectives / l_aux; D = cb_three_people, cb_ramesh_risk.

## How verified

Build prints `NO ERRORS` with `lint: 0 error(s), 0 warning(s)`; repeated builds give byte-identical `release.json` and `tests.json`; the near-duplicate scan against all other chapters reports 0 flags; the SVG label overflow/overlap estimate reports 0 issues. The four SVGs have not been viewed rendered (see Gaps).

## Facts for a reviewer

1. **Economic vs non-economic:** economic activities are done to earn a living; non-economic activities are done out of love, sympathy, religion or patriotism.
2. **Business** = economic activity of producing or procuring and selling or exchanging goods and services regularly for profit. **Profession** = specialised knowledge and skill, regulated by a professional body with a code of conduct, rewarded by fees. **Employment** = work for others under a contract for a wage or salary.
3. **Comparison bases** (as in the SVG chart): set up by (owner / professional body / contract or appointment); nature of work; qualification (none prescribed / specified / as the job needs); reward (profit / fees / wage or salary); capital (considerable / limited / none); risk (high / some / little); transfer of interest (possible with formalities / not possible / not possible).
4. **Seven characteristics of business:** economic activity; production or procurement; sale or exchange; dealings on a regular basis; profit earning; uncertainty of return; element of risk.
5. **Eight objectives:** market standing, innovation, productivity, physical and financial resources, earning profits, manager performance and development, worker performance and attitude, social responsibility. Profit is necessary but not the only objective.
6. **History:** Indus Valley cities traded with Mesopotamia (stated as ancient, no dates); overland and sea trade later; indigenous banking with the hundi (a bill of exchange) and the chitthi, and shroffs and seths who gave credit and transferred money; Uttarapatha (northern route) and Dakshinapatha (southern route); links with the Silk Route; ports on both coasts; merchant guilds (shrenis) of traders and artisans that regulated trade and helped members; rise of commission agents, brokers and distributors and of credit and trade networks. No dates, communities or places are given beyond these. Unsure: the chitthi is described only generally ("a written note used to send credit or money"); a reviewer may prefer a more precise description.
7. **Industry classification:** primary = extractive (mining, fishing, forestry) and genetic (cattle breeding, nurseries); secondary = manufacturing and construction; tertiary = service industries, the auxiliaries to trade. Manufacturing kinds: analytical (separating, oil refinery), synthetical (combining, cement), processing (sugar, paper), assembling (bicycles, computers).
8. **Commerce = trade + auxiliaries to trade.** Trade: internal (wholesale, retail) and external (import, export, entrepot = import for re-export). A wholesaler buys in bulk and sells to retailers; a retailer sells in small lots to final consumers.
9. **Auxiliaries and hindrances:** transport and communication (place), warehousing (time), banking and finance (finance), insurance (risk), advertising (information).
10. **Business risk:** possibility of inadequate profit or loss due to uncertainties or unexpected events. Nature: arises from uncertainty; essential part of every business; degree depends on nature and size; profit is the reward for bearing risk. Causes: natural (floods, earthquakes), human (dishonest employees, strikes, management inefficiency), economic (changes in demand, competition, price changes, technology), other (political disturbances, exchange-rate changes).
11. **Time-sensitive facts:** none. No legal limits, rates, thresholds or dated rules are used. All firms, people, places and amounts (for example Rs 18,000 and Rs 40,000 in two mcq stems) are imagined.
12. **Case-style items** use the usual pattern of quoting the line, naming the concept and explaining. Entrepot trade is treated as import for re-export, without customs or documentary detail.

## Gaps

- The four SVGs (classification tree, comparison chart, auxiliaries flow, causes web) were placed by coordinates and checked by the label overflow/overlap estimate only; they have not been seen rendered and need a look at 360 px.
- Difficulty is concentrated at d2 and d3 (11 at d1, 40 at d2, 25 at d3, 3 at d4, none at d5).
- Only 4 items are pure recall; the chapter is mostly application, which suits a case-heavy paper.
