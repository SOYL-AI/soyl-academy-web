# ISC Class 12 Accounts, Chapter 2 — Goodwill: Nature and Valuation

`isc-12-accounts-ch02` · release v1 · academic year 2026-27 · Accountancy (858), Section A, Unit 1: Partnership Accounts · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) on the pattern of the CBSE 12 Accountancy chapters. Built from `src/` (`npx tsx content/authored/economics-commerce/isc-12-accounts-ch02/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, the answer-leak scan, narration rules and editorial counts, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` if anything fails). Rebuilding is byte-identical. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (21 + 20 slides), notes (8 sections), 32 flashcards, 79 questions (143 marks) |
| `tests.json` | `t_isc12accounts_ch02_short` (20 marks, 50 min) on `isc-12-default-chapter-test-short` and `t_isc12accounts_ch02_long` (40 marks, 100 min) on `isc-12-default-chapter-test-long`, item for item |
| `src/` | `lib.mjs` (shared authoring lib, copied unchanged from `cbse-12-economics-ch01` except its header), `acc.mjs` (goodwill engine and assertions), `questions.mjs` (bank), `build.mjs` (decks, notes, cards, tests, extra gates) |

## Scope
All five syllabus topics, exactly as `catalog/cisce/isc-12/accounts/syllabus.yaml` lists them; the chapter has no removed topics.
- **t01** meaning, nature and features of goodwill; purchased vs self-generated goodwill and Accounting Standard 26; factors affecting its value; the occasions on which a partnership values it (18 items, plus 1 tagged t01+t02).
- **t02** average profit method with normalising of past profits (abnormal losses, non-recurring gains, non-trade investment income, capital expenditure charged to revenue with depreciation, stock errors over two years, fair partner remuneration, expected future expenses, a trading-loss year), and the weighted average method (24, plus 1 t02+t05 and 2 t02+t03+t04).
- **t03** normal rate of return, normal profit, super profit, goodwill at years' purchase of super profit, the no-super-profit case (11, plus 2 t03+t05).
- **t04** capitalisation of average profit (less capital employed) and of super profit, and why the two agree (9, plus 2 t04+t05 and 1 t03+t04).
- **t05** capital employed (net assets): total assets excluding purchased goodwill, non-trade investments and fictitious assets, less outside liabilities, worked from the assets side and checked from the capital side (8, plus the shared items above).
- Not taught: the annuity method (not in the ISC syllabus). How goodwill is **treated** on admission, retirement or death (premium, hidden goodwill, adjustment through capital accounts) belongs to ch03/ch04 and is only pointed to (Part 1 slide 9, Part 2 exam tips, notes §2 and §4).

### Decks
- **Part 1 (t01–t02), 21 slides, 16 with visuals:** two imagined cycle-repair shops (same capital, profit above normal), features, purchased vs self-generated, factors, occasions (flow, pointer to ch03/ch04), the five methods, average-profit steps, normalising table, stock errors over two years, weighted-average steps. **Worked examples:** Phulkari Looms (Patiala) reading three news items against the factors; normalised profits (theft added back, vat gain and dividend removed: normal total ₹8,64,000, average ₹2,16,000, goodwill ₹6,48,000 at 3 years); weighted average ₹2,25,600, goodwill ₹6,76,800, with a plot of profits and both averages. Four checks.
- **Part 2 (t03–t05), 20 slides, 15 with visuals:** normal profit terms, what capital employed leaves out, the super profit flow, capitalisation flow and the algebra showing both capitalisation methods agree, the no-super-profit case, one-firm comparison of every method. **Worked examples (Sahyadri Cold Chain, Satara):** horizontal Balance Sheet (₹11,20,000); capital employed ₹6,00,000 both ways; super profit (investment income removed; average ₹1,14,000, normal ₹72,000, super ₹42,000, goodwill ₹1,26,000); capitalisation of average profit (₹9,50,000 − ₹6,00,000 = ₹3,50,000); capitalisation of super profit (₹3,50,000). A stacked-bar SVG splits profit into normal + super and capitalised value into capital employed + goodwill. Four checks.
- Visuals: 22 tables, 7 flows, 1 plot, 1 SVG. Narration up to 75 words (mean 53), written entirely in words: no digits, rupee sign, symbols or abbreviations ("ISC" is spoken as "Indian School Certificate"); the build enforces this.

### Question bank (79 items)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 21 | 1 | keys a5 b5 c6 d5 |
| assertion-reason | 8 | 1 | keys a2 b2 c2 d2 (lib options; (d) = A false, R true) |
| numerical | 9 | 1 | average and weighted goodwill, a stock-error correction, super profit, years' purchase worked back, normal rate worked back, both capitalisations, capital employed |
| true-false · fill-blank · match | 5 · 4 · 3 | 1 · 1 · 2 | T/F 3 true, 2 false |
| short | 11 | 2 | features, purchased vs self-generated, occasions, why normalise, partner remuneration, five years with a loss, normal and super profit, no goodwill, capitalised super profit, average profit worked back, capital employed from the capital side |
| short | 11 | 3 | three factor changes, intangible vs fictitious, normalising, weighted with a claim removed, stock error, falling-profit comparison, remuneration plus a new premium, super profit with capital employed, capitalisation of average profit, both capitalisations, capital employed from a horizontal balance sheet |
| long | 7 | 5 | five years with theft and capital expenditure, weighted vs simple, two stock errors, purchased goodwill and future maintainable profit (theory), super profit from a horizontal balance sheet, both capitalisations from a horizontal balance sheet, all methods with an evaluation |

- Difficulty d1/d2/d3/d4/d5 = 9/36/30/3/1. Competency: recall 8, understanding 25, application 29, analysis 16, evaluation 1 — **58% at application or above** (lint band 45–65%).
- Written answers keep the full working in `answer.model_answer_md` (normal-profit tables, weighted tables, horizontal balance sheets, capital employed both ways); `solution_md` is a one-line method note. Every marking scheme has whole-number step marks adding up to the item's marks (asserted by `QQ()` in `questions.mjs`).
- **Tests** are disjoint and use no deck-check item (asserted). Short = A 4 MCQ + 1 A-R; B 2-mark features + (five years with a loss | capitalised super profit); C 3-mark normalising + (super profit | intangible vs fictitious); D both capitalisations from a balance sheet. Long = A 10 MCQ + 2 A-R; B occasions, normal and super profit + (capital employed from the capital side | partner remuneration); C three factor changes, weighted, capitalisation of average profit + (capital employed from a balance sheet | stock error); D super profit from a balance sheet + (five years with theft and capital expenditure | theory).

## Blueprint fit
The ISC defaults (1/2/3/5 marks) fit this chapter well: 2-mark items are one-step valuations or a pair of points; 3-mark items carry one or two normalising adjustments or a short balance sheet; 5-mark items carry a full horizontal balance sheet or five years of profits with several adjustments, set in parts where the blueprint asks for parts. Internal choices pair items of similar weight but sometimes different kinds (a computation against a theory answer), which the default allows. Accounts has no subject-specific blueprint yet.

## Verifier record (what the build computes and asserts)
`src/acc.mjs` computes every amount from the givens and throws on any mismatch; deck and answer tables are generated from these results, so no figure is typed twice.
- **Normalising:** each adjustment is applied to its year; the normal total must equal the reported total plus the adjustments. Stock errors are generated as a pair (the year and the next, opposite signs); capital expenditure charged to revenue is added back and straight-line depreciation charged for every year from purchase.
- **Averages:** simple and weighted averages (products, sum of weights) must be whole rupees where used.
- **Capital employed:** from the assets side (assets used − outside liabilities) and from the capital side (capitals and reserves − goodwill − non-trade investments − fictitious assets); the two must agree, and every balance sheet must total on both sides.
- **Goodwill:** normal profit, super profit, capitalised value; capitalisation of average profit and of super profit are asserted equal for every firm valued both ways; worked-back items (years' purchase, normal rate, average profit) are re-derived forwards.
- Key figures are pinned to hand-checked values (e.g. Phulkari ₹6,48,000 and ₹6,76,800; Sahyadri ₹6,00,000, ₹1,26,000, ₹3,50,000; Saharanpur normal total ₹9,65,000 and goodwill ₹5,79,000; Vellore capital employed ₹6,80,000 and goodwill ₹65,000; Rourkela ₹2,50,000 both ways).
- Extra gates in `build.mjs`: TTS-safe narration; near-duplicate stems inside the bank (stage-6 5-gram Jaccard; no pair at 0.5 or above); test disjointness, no deck-check item in a test, marks 20 and 40.
- Run on 2026-10-31: build clean (lint 0 errors, 0 warnings), rebuild byte-identical, `originality --authored` 176 units, 0 errors. A one-off cross-worktree scan of these 79 stems against the 838 stems of the CBSE 12 Accountancy chapters (other worktree) found no pair at 5-gram Jaccard 0.4 or above.

## Facts a reviewer should double-check
- **Accounting Standard 26 (Intangible Assets):** only goodwill acquired for a consideration is recorded; internally generated goodwill is not.
- **Capital employed** excludes purchased goodwill already in the books, non-trade investments and fictitious assets (debit balance of Profit and Loss, deferred revenue expenditure such as advertisement suspense); income from excluded non-trade investments is also removed from profit.
- **Stock errors:** an overvalued closing stock is deducted from that year's profit and added to the next year's (undervalued: the reverse).
- **Normal trading loss** in a past year is kept in the average (deducted, and the divisor is all years) — `s2_avg`.
- **No super profit → no goodwill** under the super profit and capitalisation methods (`m_no_goodwill`, `s2_no_goodwill`, Part 2 slide 16).

## Originality
No ISC textbook (or reference book) illustration, exercise or wording and no CISCE specimen or past-paper item is reused; official documents defined pattern and scope only. Every firm (Phulkari Looms, Sahyadri Cold Chain, the cycle-repair shops and the firms in the bank, from Dharwad to Rourkela), partner and figure is imagined and labelled as such, and none repeats a firm, person or place set-up of the CBSE 12 Accountancy chapters. Every stem, including match, true-false, fill-blank and assertion-reason lead-ins, names its own firm or concept.

## Gaps
- No case-based items (optional); objective items carry the theory, written items the computation.
- No narration audio (TTS needs OA-03).
- Horizontal balance-sheet tables in stems and model answers have four columns with long labels (e.g. "Advertisement Suspense (deferred revenue expenditure)"); check them at 360 px on staging.
- The SVG stacked bars place labels by computed pixel coordinates; check them in both themes.
