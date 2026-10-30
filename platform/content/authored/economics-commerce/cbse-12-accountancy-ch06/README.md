# CBSE Class 12 Accountancy, Chapter 6 — Accounting for Share Capital

`cbse-12-accountancy-ch06` · release v1 · academic year 2026-27 · family `economics-commerce` (Part A, Unit 2: Accounting for Companies) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) on the pattern of the CBSE 12 Economics and Accountancy ch01–ch04 chapters. Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-12-accountancy-ch06/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, narration rules, editorial counts and the answer-leak scan, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` if anything fails). Edit `src/`, not the JSON. Rebuilding is byte-identical.

| File | What |
|---|---|
| `release.json` | 2 decks (22 + 21 slides), notes (8 sections), 30 flashcards, 69 questions (150 marks) |
| `tests.json` | `t_cbse12accountancy_ch06_short` (20 marks, 40 min) on `cbse-12-accountancy-chapter-test-short` and `t_cbse12accountancy_ch06_long` (40 marks, 90 min) on `cbse-12-accountancy-chapter-test-long`, item for item |
| `src/` | `lib.mjs` (shared CBSE 12 economics-commerce builders, copied unchanged apart from its header), `acc.mjs` (accounting helpers: a small double-entry `Books` with ledger rendering; `issue()`, which posts a whole share issue with pro-rata categories, defaulters, calls in advance and either arrears method; `forfeit()`; `reissue()`; `vendorShares()`; the Schedule III share-capital note and balance-sheet extract; Indian-system number words for narration), `questions.mjs` (bank), `build.mjs` (decks, notes, cards, tests) |

## Scope
All six syllabus topics (2026-27; the chapter has no deleted topics):

- **t01** company: features and kinds; categories of share capital (authorised, issued, subscribed, called-up, uncalled, paid-up, reserve capital); equity vs preference shares (10 items tagged).
- **t02** issue at par and at a premium; Securities Premium and the Section 52 uses; Section 53 (issue at a discount barred, as a rule only); application, allotment and calls; over-subscription (rejection, full allotment to some, pro-rata with excess adjusted towards allotment and any surplus refunded); under-subscription and the 90% minimum subscription (21).
- **t03** calls in arrears (with and without a Calls in Arrears Account) and calls in advance, both without interest; shares to vendors (assets; a business with goodwill; assets bought below value with capital reserve) and to promoters (14).
- **t04** private placement, ESOP and sweat equity, concepts only (6).
- **t05** forfeiture of shares issued at par and at a premium (premium received or not, and a pro-rata allottee whose excess application money is forfeited); re-issue at par, premium and discount, partly called shares re-issued at their paid-up value, Capital Reserve on re-issued shares only (17).
- **t06** Schedule III disclosure: Shareholders' Funds, note on Share Capital (fully paid; not fully paid less calls in arrears; add forfeited shares), Reserves and Surplus, calls in advance under Other Current Liabilities (8).

Items with two topics are counted under both. No bonus issue, buy-back or redemption entries: bonus, redemption and buy-back appear only in the Section 52 list of uses.

### Decks
- **Part 1** (22 slides): features and kinds of companies, categories of share capital, equity vs preference shares, the issue process, Sections 52 and 53, over-subscription, under-subscription, private placement, ESOP and sweat equity. **Worked examples (5):** Pragati Pumps capital categories (paid-up ₹7,96,000); Godavari Agro issue at par; Narmada Textiles issue at a ₹2 premium (premium ₹1,00,000); Narmada pro-rata 6:5 (₹45,000 refunded, ₹30,000 adjusted, ₹2,20,000 collected on allotment) and its journal. Two SVGs (capital layers to scale; application money split to scale). Four checks.
- **Part 2** (21 slides): running imagined company **Shivalik Foods Ltd, Dehradun** (30,000 shares; Ravi and Sunita default, Kunal pays both calls in advance): allotment with arrears and advance (bank ₹92,200), the two calls (arrears ₹5,800), forfeiture (₹4,200), re-issue of 800 shares at ₹8 (discount ₹1,600, Capital Reserve ₹2,000, ₹600 left for 200 unissued shares), note on Share Capital and balance sheet (₹3,00,600 = cash). Also Ujjain Spinning (shares to a vendor at ₹16; capital reserve ₹20,000) and Lohit Tea (forfeiture with premium not received vs received). **Worked examples (7).** One SVG (forfeited amount split to scale). Four checks.
- 33 of 43 slides carry a visual (25 tables, 5 flows, 3 SVGs); no more than 3 slides in a row without one. Narration ≤ 75 words (mean 55), TTS-safe: amounts in words generated from the computed values ("rupees ninety-two thousand two hundred"), section numbers and percentages in words, no digits, symbols or capitalised abbreviations (ESOP is spoken as "employee stock option plan").

### Question bank (69 items)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 24 | 1 | features, categories, reserve capital, preference rights, premium entry, Sections 52/53, minimum subscription, under-subscription, pro-rata excess, refund, arrears, vendor shares, private placement, sweat equity, ESOP, forfeiture (at par; premium not received), maximum discount, Capital Reserve (all and part re-issued), disclosure |
| assertion-reason | 6 | 1 | keys a2 b1 c2 d1 |
| true-false · fill-blank · match | 4 · 3 · 2 | 1 · 1 · 2 | T/F 2 true, 2 false |
| numerical | 6 | 1–2 | allotment payable by a pro-rata allottee, premium total, cash on a call, vendor shares (count), Capital Reserve, net not-fully-paid capital |
| short | 10 | 3 | capital categories, equity vs preference, issue at par, pro-rata working, vendor entries, calls with arrears and advance, private placement/ESOP/sweat equity, forfeiture entry (two holders), re-issue with balance left, share-capital note with forfeited shares |
| long | 7 + 7 | 4 / 6 | 4: issue at a premium; rejection + pro-rata with premium on application; business taken over (goodwill ₹70,000); arrears without an arrears account; forfeiture + re-issue (premium received); pro-rata defaulter forfeiture + re-issue; balance sheet with notes (₹9,98,000). 6: three-category pro-rata issue; under-subscription with arrears, advance and Bank Account (₹4,57,000); promoters + vendor + public issue with notes (₹13,88,000); forfeiture with premium not received and re-issue at a premium (Capital Reserve ₹2,100); pro-rata issue with forfeiture and re-issue; partly called forfeiture, re-issue and Share Forfeiture Account; forfeiture + re-issue with balance sheet (₹5,98,400) |

- Difficulty d1/d2/d3/d4 = 7/22/34/6. Competency: recall 8, understanding 21, application 30, analysis 10 — **58% at application or above** (lint band 45–65%).
- MCQ keys a6 b6 c6 d6.
- **Tests** are disjoint and use no deck-check item. Short = A 3 MCQ + 1 A-R; B issue at par entries, forfeiture entry; C issue at a premium | forfeiture and re-issue; D three-category pro-rata issue | partly called forfeiture with Share Forfeiture Account. Long = A 6 MCQ + 2 A-R; B 3 × 3 + (re-issue | share-capital note); C rejection + pro-rata entries + (business taken over | pro-rata defaulter); D pro-rata issue with forfeiture + (premium-not-received forfeiture | forfeiture with balance sheet).

## Verifier record (what the build computes and asserts)
- **Every figure is computed** by `acc.mjs` from the givens and rendered into stems, tables, keys and model answers with Indian digit grouping; no amount is typed twice. Amounts must be whole rupees and pro-rata allotments whole shares, or the build throws.
- **Each share issue is posted to its own books** (`Books` + `issue()`): every journal entry balances; instalment capital parts add to the face value; the Application Account closes (capital + premium + adjusted + calls in advance + refunds = money received); every allotment and call account closes at nil, or at exactly the defaulters' unpaid amount when no arrears account is kept; the 90% minimum subscription is checked on under-subscription.
- **Forfeiture** (`forfeit()`): the Share Forfeiture credit (called-up capital + unpaid premium − unpaid calls) must equal the money actually received on those shares less premium received, computed independently from the holder's applied shares, adjustment and refund; calls in arrears left afterwards equal those of shareholders not forfeited.
- **Re-issue** (`reissue()`): the discount may not exceed the amount forfeited on the re-issued shares; after the Capital Reserve transfer, the Share Forfeiture balance equals the forfeiture on shares not re-issued.
- **Disclosure** (`shareNote()`, `bsIII()`): the note total must equal Share Capital balance − calls in arrears + Share Forfeiture balance from the books; balance sheets total on both sides, with cash at bank taken from the Bank Account (Shivalik ₹3,00,600; Kabini ₹9,98,000; Sarasvati ₹5,98,400; Kalindi ₹6,34,500). Key results are also pinned to independently hand-checked values (e.g. Sutlej bank ₹4,57,000; Teesta forfeiture ₹3,300 with premium ₹2,000 debited; Koyna Capital Reserve ₹300; Luni unpaid allotment ₹2,500).
- Build: schema, lint (`lintExemplar`: 0 errors, 0 warnings) and deterministic verify run clean, with no warnings. Pipeline `verify --authored` and `originality --authored` are left to the Lead's repo gates.

## Originality
No NCERT illustration, exercise or wording and no CBSE sample/past-paper item is reused; they define the pattern only. Every company (Narmada Textiles, Shivalik Foods, Chambal Cables, Teesta Spices, Koyna Valves and others), every person and every figure is SOYL's own and labelled imagined.

## For a reviewer to double-check
- **Premium on forfeiture:** Securities Premium is debited only when the instalment carrying the premium was not paid. The pro-rata defaulter questions keep the premium on application (Bhavani) or have none (Luni), so the disputed case of a premium partly covered by adjusted excess never arises.
- **Shares to promoters** use `Incorporation Costs A/c Dr` (Koel Pharma); some books use Goodwill.
- **Forfeiture narrations** for two holders who defaulted from different instalments name every instalment from the earliest default (Dhauli).
- **Calls in advance** are shown under Other Current Liabilities; interest on calls in arrears and in advance is excluded, as the syllabus says.
- **SVGs** place labels by pixel coordinates; check at 360 px on staging. Long journals (Teesta, Bhavani, Sutlej) are tall on a phone.

## Gaps
- No case-based items (optional per brief); no d5 items.
- Rights issue and underwriting are not covered (not named in the syllabus topics).
