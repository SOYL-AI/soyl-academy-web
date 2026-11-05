# CBSE Class 11 Business Studies, Chapter 8: Small Business and Enterprises

`cbse-11-business-studies-ch08` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human` · every item `status: "draft"`

Hand-authored to the CBSE 11 Business Studies standard (D-025, D-026, D-036). Build from `platform/`:
`npx tsx content/authored/economics-commerce/cbse-11-business-studies-ch08/src/build.mjs`. The build checks the schema, pipeline lint, deterministic verify, word limits, narration rules, the answer-leak scan, the exact-stem originality pre-check and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON. The shared library is `../cbse-11-business-studies-ch01/src/lib.mjs` (imported, never edited).

| File | What |
|---|---|
| `release.json` | 2 decks (19 + 21 slides), notes (7 sections), 31 flashcards, 76 questions |
| `tests.json` | `t_cbse11businessstudies_ch08_short` (20 marks, 40 min) and `_long` (40 marks, 90 min) on `cbse-11-default-chapter-test-short` / `-long`, disjoint, no deck-check item |
| `src/` | `questions.mjs`, `build.mjs` |

## Scope

| Topic | Coverage |
|---|---|
| t01 | Entrepreneur and entrepreneurship; five characteristics; need for entrepreneurship development; Startup India (general terms, dated); six ways of funding start-ups; the MSME classification principle (no figures); role of small business, including village and cottage industries |
| t02 | Nine problems of small business; sickness; government assistance (NSIC, DIC, NABARD, SIDBI by year and work); other support in general terms |

Decks: Part 1 (entrepreneur, characteristics, need, Startup India, funding ladder, classification principle; 4 checks, 3 worked examples: spotting characteristics, Savita's funding mix, an angel investment) and Part 2 (roles, rural role, nine problems, sickness, institutions, other support; 4 checks, 3 worked examples: Mitti Gram's rural role, capacity and quality, hire purchase). SVGs: characteristics web, composite-criteria diagram with no figures, problems web, government-support chart, funding ladder. No maps.

Every person, enterprise and cluster is imagined (Savita Pickles, Mitti Gram, Sargam Apps, Lohit Tools, Aranya Motors, Dhara Spices, Kesar Toys and others). No real company is named. No rupee limit of any MSME class is stated, and no national statistic on the MSME share of output, exports or employment is given.

## How verified

Build prints `NO ERRORS` with `lint: 0 error(s), 0 warning(s)`; `release.json` and `tests.json` are byte-identical across three builds; `checks.mjs` reports 0 near-duplicate flags and 0 SVG issues (see the final report for the counts). No tree-wide gates, git or e2e were run.

## Facts for a reviewer

Dated notes are in the content as "as of 2026". Nothing quotes a rupee limit, a scheme figure or a statistic.

1. Entrepreneur: a person who sets up a business, bears risk, and brings resources together to pursue an opportunity. Entrepreneurship: the process of doing so.
2. Five characteristics of entrepreneurship: systematic activity; lawful and purposeful activity; innovation; organisation of production; risk taking.
3. Need for entrepreneurship development: employment, innovation, balanced growth.
4. Startup India: launched in 2016 to support new enterprises; described in general terms, dated "as of 2026"; its features and rules are revised from time to time. Reviewer: confirm the launch year and the general wording.
5. Ways of funding start-ups, in general terms: bootstrapping (own savings and early earnings); crowdfunding (small sums from many people, often online); angel investors (wealthy individuals investing their own money early, often mentoring, for a share); venture capital (professional funds investing in fast-growing ventures for a share); business incubators and accelerators (space, mentors, training; the content does not say whether money is given); microfinance (small loans to low-income borrowers and tiny enterprises). The funding ladder is labelled a common order of use, not a rule.
6. MSME classification, principle only. Dated note: since 2020, enterprises are classified as micro, small or medium by composite criteria of investment in plant, machinery or equipment AND annual turnover, the same for manufacturing and service enterprises; the limits are set by the government and revised from time to time. History line in the content: classes first defined by an Act of 2006, redefined in 2020 by composite criteria, with limits raised again from 2025. Udyam registration (online) began in 2020, stated as of 2026. Reviewer: confirm the 2006, 2020 and 2025 dates; no rupee limit is stated anywhere, so none needs updating when limits next change.
7. Role of small business (stated qualitatively): employment generation; use of local resources; balanced regional development; export contribution; variety of products; personalised service; easy to start (relatively low capital); support to large industries as suppliers.
8. Role in rural areas: village and cottage industries give non-farm employment, especially between harvests, and use local skills and materials.
9. Nine problems: finance; raw materials; managerial skills; marketing; quality; capacity utilisation; technology; sickness; global competition. Sickness: a unit that keeps making losses and cannot meet its dues (stated generally; no regulatory definition quoted).
10. Capacity utilisation: output divided by capacity, times 100.
11. Hire purchase: part paid at once and the rest in instalments (general meaning).
12. Institutions (general terms, dated): National Small Industries Corporation, 1955: marketing support, raw materials, machinery on hire purchase. District Industries Centres, 1978: a single point of support at district level. National Bank for Agriculture and Rural Development, 1982: rural credit and development. Small Industries Development Bank of India, 1990: finance for small industry. Reviewer: confirm the four years and the wording of each function; the chart and table list them in order of year.
13. Other support, general terms only, as of 2026: credit guarantees, procurement preference, training. No scheme names or figures.
14. Computed figures (code, all imagined): Savita Pickles needs Rs 3,00,000 (equipment 1,40,000, stock and jars 90,000, label and licence 30,000, first wages 40,000); savings Rs 1,20,000 (40 per cent), advance orders 400 x Rs 200 = Rs 80,000, microfinance loan Rs 1,00,000 repaid as 10 x Rs 11,000 = Rs 1,10,000, extra Rs 10,000. Sargam Apps: angel Rs 50,00,000 for 20 per cent implies Rs 2,50,00,000 after and Rs 2,00,00,000 before; founders keep 80 per cent; a fund putting Rs 3,00,00,000 for 12 per cent of the enlarged company leaves founders 80 x 88 / 100 = 70.4 per cent. Mitti Gram: 40 units x 6 villagers = 240 jobs; 1,200 of 2,000 pots = 60 per cent, 800 unused; 96 of 1,200 rejected = 8 per cent, 1,104 good. Dhara Spices: 3,500 of 5,000 kg = 70 per cent, 1,500 kg unused. Kesar Toys: cash price Rs 1,20,000; Rs 30,000 at once plus 12 x Rs 9,000 = Rs 1,38,000, extra Rs 18,000. Lohit Tools: 2,500 covers x Rs 120 = Rs 3,00,000; 8 per cent of 2,500 = 200 spoilt. The share arithmetic for the venture round assumes new shares are issued and existing holders are diluted pro rata (simplified).
15. Unsure or simplified: the one-word descriptions of incubators and accelerators as a single idea; the ordering of the funding ladder (indicative only); the Class 11 treatment of an implied company value in the angel-investor example (simple arithmetic only, no valuation theory); "ease of starting" is described as relatively low capital without quoting any rule.
16. Competency tags: tags are by what the item asks. Deck-style identify-the-concept items set in an imagined case are tagged application; definitions and year/function recall are recall; assertion-reason items that ask whether the reason explains the assertion are analysis, while simple true/false assertion-reason items are understanding. No tag was changed to reach the band.
