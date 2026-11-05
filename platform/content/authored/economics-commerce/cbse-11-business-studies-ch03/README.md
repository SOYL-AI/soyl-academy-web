# CBSE Class 11 Business Studies, Chapter 3: Public, Private and Global Enterprises

`cbse-11-business-studies-ch03` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human` · every item `status: "draft"`

Hand-authored to the CBSE 11 Business Studies standard (D-025, D-026, D-036). Build from `platform/`:
`npx tsx content/authored/economics-commerce/cbse-11-business-studies-ch03/src/build.mjs`. The build checks the schema, pipeline lint, deterministic verify, word limits, narration rules, the answer-leak scan, the exact-stem originality pre-check and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON. The shared library is `../cbse-11-business-studies-ch01/src/lib.mjs` (imported, never edited).

| File | What |
|---|---|
| `release.json` | 2 decks (21 + 20 slides), notes (7 sections), 32 flashcards, 78 questions |
| `tests.json` | `t_cbse11businessstudies_ch03_short` (20 marks, 40 min) and `_long` (40 marks, 90 min) on `cbse-11-default-chapter-test-short` / `-long`, disjoint, no deck-check item |
| `src/` | `questions.mjs`, `build.mjs` |

## Scope

| Topic | Coverage |
|---|---|
| t01 | Private and public sector, mixed economy; departmental undertaking, statutory corporation, government company (features, merits, limitations); changing role of the public sector after 1991 (reserved industries, disinvestment, memorandum of understanding, sick-unit policy) |
| t02 | Global enterprises (seven features); joint ventures (meaning, contractual and equity-based types, benefits); public private partnership (meaning, features, imagined toll road) |

Decks: Part 1 (public sector; 4 checks, 2 worked examples: naming a form from clues, the 51 per cent test) and Part 2 (global enterprises, joint ventures, public private partnership; 4 checks, 3 worked examples: spotting features, sharing capital and profit, a toll-road cost split). SVGs: forms-of-public-enterprise comparison chart, public-sector-reforms flow, global-enterprise features web, joint-venture and PPP comparison. No maps.

Questions: 34 mcq, 6 assertion-reason, 3 true-false, 3 fill-blank, 2 match, 2 ordering, 10 short 2-mark, 7 short 3-mark, 6 long 5-mark, 5 case-based (all on imagined enterprises). Application or above: 55%.

Tests: short = 3 mcq + 1 ar / 2x2-mark + 3-mark / one of two long / `cb_deshsteel`. Long = 8 mcq + 2 ar / two 2-mark, one of two 2-mark, 3-mark, one of two 3-mark / long + one of two long / `cb_hillroads` + `cb_toll`.

No real company is used in a deck, question, card or table. Two long-standing public examples, dated as of 2024, appear in the notes only (items 3 and 6 below).

## How verified

Build prints `NO ERRORS` with `lint: 0 error(s), 0 warning(s)` and no warnings; `release.json` and `tests.json` are byte-identical across three builds; `checks.mjs` reports 0 near-duplicate flags (78 stems against 40,422 others) and 0 SVG issues. No tree-wide gates, git or e2e were run.

## Facts for a reviewer

All time-sensitive points are "as of 2024" in the content and should be re-checked against current law and policy.

1. Private sector = owned by individuals or groups; public sector = owned by the Union, a state or a local body; mixed economy = both side by side.
2. Departmental undertaking: run as a department of a ministry; funds from the treasury and revenue paid into it; budget, accounting and audit controls of government; employees are government servants; accountable to the ministry. Merits (control, accountability, revenue, sensitive work) and limitations (lack of flexibility, red tape, low incentive, political interference).
3. Dated, notes only: Indian Railways has long been run as a departmental undertaking of a ministry (as of 2024). Reviewer: confirm the wording.
4. Statutory corporation: created by a special Act of Parliament or a state legislature; own powers; separate legal entity; financial independence (own income, possible government capital); employees not government servants; departmental budget, accounting and audit procedures do not apply (simplified: a corporation still has its own audit arrangements). Merits and limitations as listed.
5. Reviewer: confirm that the "free of departmental procedures" simplification in item 4 is acceptable for Class 11.
6. Dated, notes only: the Food Corporation of India, set up in 1965, as a long-standing statutory corporation (as of 2024).
7. Government company: registered under the Companies Act; government (Union and or state) holds at least 51 per cent of paid-up share capital (as of 2024); can sue and be sued; board of directors; company rules for staff; wholly or partly owned. Reviewer: subsidiaries of government companies are also treated as government companies in company law; not mentioned.
8. After 1991 (neutral, general terms): reserved list cut sharply; as of 2024 a very small number remain reserved, mainly atomic energy and railway operations (dated).
9. Disinvestment defined as the sale of part of the government's shares; a holding below 51 per cent ends government company status (as of 2024).
10. Memorandum of understanding system: yearly agreed performance targets between the government and a public enterprise, rated at the year end.
11. Sick units: general policy to revive viable units and close others in an orderly way. The older special board for sick units is described as discontinued in 2016 (not named); as of 2024 such cases fall under general company and insolvency law (stated in one slide table). Reviewer: confirm.
12. Global enterprise (multinational corporation): large firm operating in many countries, controlled from a head office. Seven features: huge capital resources, foreign collaboration, advanced technology, product innovation, marketing strategies, expansion of market territory, centralised control.
13. Joint venture: two or more firms join to carry on a business activity and share ownership, control and profits; types: contractual (agreement alone) and equity-based (jointly owned entity with shares); six benefits (resources and capacity, new markets and distribution networks, technology, innovation, low cost of production, established brand name).
14. Public private partnership: government and private enterprise build and run public infrastructure or services (roads, power, water, hospitals); sharing of risk and reward; government provides land, approvals or funding; private partner brings capital, technology and management; long agreement. The build-operate-hand-back sequence is a common pattern, not a legal definition.
15. Computed figures (code): Desh Steel Ltd, 1,000 lakh shares, sale of 350 leaves 650 = 65 per cent; sale of 520 leaves 480 = 48 per cent; joint venture capital Rs 50 crore at 60:40 = Rs 30 crore and Rs 20 crore, profit Rs 10 crore = Rs 6 crore and Rs 4 crore; toll road Rs 800 crore, state 25 per cent = Rs 200 crore, private Rs 600 crore, net toll Rs 40 crore for 25 years = Rs 1,000 crore, Rs 400 crore above private capital before interest and tax (simplified; no time value).
16. Unsure or simplified: the memorandum of understanding is stated without the rating scale; the limitations of a government company (board nominees, public duty versus profit) are textbook generalisations; the PPP ordering item follows a common description, not a statutory process.
