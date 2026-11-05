# CBSE Class 11 Business Studies, Chapter 9: Internal Trade

`cbse-11-business-studies-ch09` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human` · every item `status: "draft"`

Hand-authored to the CBSE 11 Business Studies standard (D-025, D-026, D-036). Build from `platform/`:
`npx tsx content/authored/economics-commerce/cbse-11-business-studies-ch09/src/build.mjs`. The build checks the schema, pipeline lint, deterministic verify, word limits, narration rules, the answer-leak scan, the exact-stem originality pre-check and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON. The shared library is `../cbse-11-business-studies-ch01/src/lib.mjs` (imported, never edited).

| File | What |
|---|---|
| `release.json` | 2 decks (21 + 22 slides), notes (7 sections), 34 flashcards, 75 questions |
| `tests.json` | `t_cbse11businessstudies_ch09_short` (20 marks, 40 min) and `_long` (40 marks, 90 min) on `cbse-11-default-chapter-test-short` / `-long`, disjoint, no deck-check item |
| `src/` | `questions.mjs`, `build.mjs` |

## Scope

| Topic | Coverage |
|---|---|
| t01 | Internal trade; wholesale and retail trade; services of wholesalers to manufacturers and to retailers; services of retailers to producers and wholesalers and to consumers |
| t02 | Itinerant retailers (hawkers, market traders, street traders, cheap jacks); small-scale fixed shops (general, specialty, stall, second-hand, single-line); departmental stores and chain stores with merits and limitations; departmental store against chain store; malls and supermarkets in a line each; mail-order houses and vending machines in one line |
| t03 | Goods and services tax: meaning, start date, destination-based, dual structure (central, state, union territory), integrated tax, input tax credit and cascading, one nation one tax, the Council, rate slabs (no percentages), registration threshold (no figure), benefits; input tax credit in a three-stage chain |

Decks: Part 1 (internal trade, wholesale and retail services, itinerant and small fixed-shop retailers; 4 checks, 3 worked examples: which kind of trade, margins along the chain, planning a five-mark answer) and Part 2 (departmental stores, chain stores, comparison, malls and supermarkets, goods and services tax, input tax credit; 3 checks, 4 worked examples: department sales share, central buying saving, the same sale within a state and between states, input tax credit stage by stage). SVGs: trade classification tree, wholesaler services chart, retailer services chart, types-of-retail tree, input-tax-credit chain flow. No maps.

Questions: 30 mcq, 6 assertion-reason, 3 true-false, 3 fill-blank, 2 match, 2 ordering, 11 short 2-mark, 7 short 3-mark, 6 long 5-mark, 5 case-based (all on imagined traders). Application or above: 53% (application 35, analysis 5; understanding 26, recall 9). Difficulty: d2 19, d3 40, d4 16.

Tests: short = mc_ws_id, mc_chain_id, mc_cgst + ar_itc / s2_ws_ret, s2_dest + s3_dept_merits / one of l_ws_services, l_types / `cb_charan`. Long = 8 mcq (mc_trade_def, mc_risk, mc_market_trader, mc_dept_id, mc_chain_lim, mc_gst_def, mc_igst, mc_itc_calc) + ar_ws, ar_chain / s2_trade_def, s2_hawker, one of s2_ret_cons, s2_ws_mfr, s3_ret_prod, one of s3_chain_lim, s3_itc / l_dept_chain + one of l_gst_features, l_itc_chain / `cb_devadaru` + `cb_lakshmi`.

Every trader, firm, store and consumer is imagined. No real company is named.

Competency tags: honest tags were kept. After the first build five items were retagged down because they really ask for application or understanding, not analysis (mc_continuity, mc_chain_lim, s3_chain_lim: analysis to application; mc_dept_chain_loc, l_dept_chain: analysis to understanding, since "distinguish" is understanding), and the parent and part (c) tags of cb_charan and cb_devadaru went from analysis to application because part (c) is a computation or a naming from the case. The 53% figure comes from case items and computations, not from relabelling.

## How verified

Build prints `NO ERRORS` with `lint: 0 error(s), 0 warning(s)`; `release.json` and `tests.json` are byte-identical across three builds; no `*.wip.json` remains; `checks.mjs` reports 0 near-duplicate flags (75 stems against 40,807 others) and 0 SVG issues. No tree-wide gates, git or e2e were run.

## Facts for a reviewer

Dated note (written November 2026): the goods and services tax rate structure has been revised more than once, including a major restructuring of the slabs in 2025. The chapter states NO slab percentage and no registration threshold figure. It says only that there is a small number of rate slabs, plus exempt and special categories, set and revised by the GST Council. Every rate used in a computation (8 per cent, and its equal halves of 4 per cent) is explicitly "imagined" and is computed in code. Please re-check the general wording if the structure changes again.

1. Internal trade: buying and selling of goods and services within the boundaries of a country. Two parts: wholesale trade (buying in large quantities, selling to retailers or industrial users) and retail trade (selling in small quantities to final consumers).
2. Services of wholesalers to manufacturers: large-scale production; bearing risk; financial assistance; expert advice; help in marketing; continuity of production; storage.
3. Services of wholesalers to retailers: availability of goods; marketing support; grant of credit; specialised knowledge; risk sharing.
4. Services of retailers to producers and wholesalers: distribution; personal selling; enabling large-scale operations; collecting market information; help in promotion.
5. Services of retailers to consumers: regular availability; information on new products; convenience; wide selection; after-sales service; credit facilities.
6. Itinerant retailers (no fixed place of business): peddlers and hawkers; market traders (periodic markets); street traders (pavement vendors, busy places); cheap jacks (semi-permanent shops that shift between localities). Reviewer: confirm the cheap-jack wording against the textbook.
7. Small-scale fixed-shop retailers: general stores; specialty shops (a particular kind of goods); street stall holders; second-hand goods shops; single-line stores (one line of goods). Reviewer: the textbook lists street stall holders under fixed shops while street traders are itinerant; the chapter follows this split.
8. Departmental store: many departments under one roof, central location, centralised purchasing. Merits: convenience; central location; bulk buying; services such as delivery and a cafe. Limitations: high operating expenses and so higher prices; less personal touch; heavy loss if it does badly; not convenient for daily needs far away. Reviewer: confirm the lists of merits and limitations against the textbook.
9. Chain store (multiple shops): identical shops in many localities, owned by one firm, centralised purchasing, standardised prices. Merits: economies of bulk buying; same prices and quality; spread of risk; easy movement of stock. Limitations: little freedom for the local shop; suited only to standard fast-selling goods; less personal touch and mostly cash sales; heavy supervision.
10. Departmental store against chain store on location (one central place against many localities), range (many lines against a narrow range of standard goods), services (many against few), price (often higher against a standard price) and credit (may be allowed against usually cash). Reviewer: the credit row is stated as "may be allowed" and "usually cash"; confirm.
11. Shopping mall: a large complex of many retail shops, often with food courts and entertainment, under one roof. Supermarket: a large self-service store selling mainly food and daily-use goods. Mail-order houses and vending machines get one line only, as selling without a shop counter.
12. Goods and services tax: an indirect tax on the supply of goods and services, introduced on 1 July 2017 through the Constitution (101st Amendment) Act 2016.
13. Features: destination-based (revenue to the place of consumption); dual structure with central and state tax on supplies within a state, union territory tax in union territories; integrated tax on supplies between states and on imports; input tax credit avoids cascading; one nation, one tax; the Council of Union and state ministers recommends rates and rules; a small number of rate slabs plus exempt and special categories, set and revised by the Council; registration for businesses above a threshold turnover (no figure, as of 2024). Reviewer: the "equal halves" of central and state tax within a state is used in one worked example (imagined 8 per cent split 4 and 4); confirm the principle.
14. Benefits: a common national market; removal of the cascading effect; simpler compliance; transparency.
15. Computed figures (code, all imagined): Raju, 6 crates of 20 kg at Rs 800 = Rs 4,800; 100 kg sold at Rs 60 = Rs 6,000; gain Rs 1,200 (unsold fruit ignored). Notebooks: 5,000 bought at Rs 40 and sold at Rs 46 = Rs 2,00,000 and Rs 2,30,000, margin Rs 30,000; 500 bought at Rs 46 and sold at Rs 55 = Rs 23,000 and Rs 27,500, margin Rs 4,500. Charan Footwear: 40 shops times 60 pairs = 2,400 pairs; at Rs 640 = Rs 15,36,000; at Rs 700 = Rs 16,80,000; saving Rs 1,44,000. Mahanagar Emporium: Rs 20,00,000 + 16,00,000 + 32,00,000 + 12,00,000 = Rs 80,00,000; electronics 40 per cent. Devadaru Woodcraft chain at an imagined 8 per cent: timber Rs 40,000 (tax Rs 3,200); maker sells at Rs 70,000 (tax Rs 5,600, pays Rs 2,400); wholesaler sells at Rs 90,000 (tax Rs 7,200, credit Rs 5,600, pays Rs 1,600); retailer sells at Rs 1,20,000 (tax Rs 9,600, credit Rs 7,200, pays Rs 2,400); government receives Rs 9,600 in all, which is 8 per cent of Rs 1,20,000; the family pays Rs 1,29,600; without credit the three traders would pay Rs 22,400 instead of Rs 6,400. One imagined sale of Rs 50,000 at an imagined 8 per cent: tax Rs 4,000, as central Rs 2,000 and state Rs 2,000 within a state, or integrated Rs 4,000 between states. Simplified: no time value, no state-level variations, no exemptions.
16. Unsure or simplified: whether to describe the Council's membership more fully (kept to "Union and state ministers"); the choice to describe the registration threshold only as "set by law and may change"; the description of "union territory tax" as replacing the state tax in union territories (stated generally); the textbook's classification of cheap jacks (item 6); the quote-a-line part (b) of each case item is tagged application (using a concept on a passage), which a reviewer may prefer to tag understanding.
