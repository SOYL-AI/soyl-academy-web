# CBSE Class 12 Accountancy, Chapter 7 — Issue of Debentures

`cbse-12-accountancy-ch07` · release v1 · academic year 2026-27 · family `economics-commerce` (Part A, Unit 2: Accounting for Companies) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) on the pattern of the CBSE 12 Economics and Accountancy ch01–ch04 chapters. Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-12-accountancy-ch07/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, narration rules, editorial counts and the answer-leak scan, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` if anything fails). Edit `src/`, not the JSON. Rebuilding is byte-identical.

| File | What |
|---|---|
| `release.json` | 2 decks (20 + 20 slides), notes (7 sections), 30 flashcards, 66 questions (144 marks) |
| `tests.json` | `t_cbse12accountancy_ch07_short` (20 marks, 40 min) on `cbse-12-accountancy-chapter-test-short` and `t_cbse12accountancy_ch07_long` (40 marks, 90 min) on `cbse-12-accountancy-chapter-test-long`, item for item |
| `src/` | `lib.mjs` (shared CBSE 12 economics-commerce builders, copied unchanged apart from its header), `acc.mjs` (accounting helpers: a debenture lot with its issue and redemption terms, lump-sum and two-stage cash issues with refunds, vendor lots, purchase of a business, interest for a year with both ledgers, write-off from Securities Premium then profit, journal, ledger, notes to accounts, Indian-system number words for narration), `questions.mjs` (bank), `build.mjs` (decks, notes, cards, tests) |

## Scope
All four syllabus topics (2026-27): t01 meaning, debentures vs shares, types on five bases (security, tenure, convertibility, record, coupon rate incl. zero coupon) (13 items tagged) · t02 issue for cash in instalments or a lump sum, over-subscription refunds, issue at par, premium and discount, the six combinations of issue and redemption terms, Premium on Redemption and Loss on Issue of Debentures (26) · t03 issue for consideration other than cash (assets and whole businesses, with goodwill or capital reserve) and as collateral security by both methods, with the long-term borrowings note (20) · t04 interest on face value for the months outstanding (due, paid, transferred to the Statement of Profit and Loss; TDS excluded) and writing off discount or loss in the year of issue, Securities Premium first (23). Items with several topics are counted under each.

**Removed for 2026-27:** redemption of debentures (methods, Debenture Redemption Reserve, investment for redemption). It appears only as one "not in the 2026–27 syllabus" sentence in notes section 4; no slide, card or question uses it. "Terms of redemption" fixed at the time of issue (Premium on Redemption, Loss on Issue) are in scope and covered.

### Decks
- **Part 1** (20 slides): what a debenture is, debentures vs shares, types and a classification tree, issue for cash, at par / premium / discount, the six combinations, where each account goes in the balance sheet. Running imagined company **Narmada Agro Ltd, Jabalpur**. **Worked examples (4):** two-stage issue at par (₹1,50,000 + ₹3,50,000); ₹500 debentures at 6% premium (₹10,60,000 received, ₹60,000 premium); at 4% discount (₹24,000 discount); at 5% discount redeemable at 10% premium (loss on issue ₹45,000). One SVG (received vs repayable bars for the six cases, heights computed and the gap asserted to equal loss − premium). Four checks.
- **Part 2** (20 slides): consideration other than cash, purchase of a business, collateral security (both methods), interest, writing off, balance-sheet placement. Running imagined company **Konkan Cold Chain Ltd, Ratnagiri**. **Worked examples (6):** machinery ₹4,40,000 for 4,000 debentures at 10% premium; a business with net assets ₹10,20,000 bought for ₹9,50,000 (capital reserve ₹70,000; 10,000 debentures at 5% discount); collateral first method (note) and second method (suspense, net nil); half-yearly interest ₹50,000 + ₹50,000 transferred; discount ₹50,000 written off ₹40,000 from Securities Premium and ₹10,000 from profit. One SVG (write-off split bar, widths computed). Four checks.
- 30 of 40 slides carry a visual (20 tables, 8 flows, 2 SVG); no more than 3 slides in a row without one. Narration ≤ 70 words (mean 48), TTS-safe: amounts are spoken in words generated from the computed values ("rupees ten lakh twenty thousand"), rates as "ten per cent", no digits, symbols, ₹ or capitalised abbreviations.

### Question bank (66 items)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 22 | 1 | holder status, debentures vs shares, zero coupon, secured, classification scenarios, premium credit, amount received at a discount, loss on issue, nature of Premium on Redemption, both premiums, refund entry, vendor numbers, capital reserve, collateral disclosure, suspense, interest for part of a year, interest entries, write-off order and amount |
| assertion-reason | 6 | 1 | keys a2 b1 c2 d1 |
| true-false · fill-blank · match | 4 · 3 · 2 | 1 · 1 · 2 | T/F 2 true, 2 false |
| numerical | 6 | 1–2 | amount received, loss on issue, number of debentures to a vendor, goodwill on purchase, interest for 6 months, amount written off to profit |
| short | 10 | 3 | shares vs debentures, classification with reasons, two-stage issue, discount with refund, both premiums, machinery to a vendor, business purchase with capital reserve, collateral entry and note, half-yearly interest, issue and write-off |
| long | 7 + 6 | 4 / 6 | 4: four issue cases, two-stage issue at a premium with refund, business purchase with goodwill, collateral both methods, interest ledgers (Debenture Interest and Debentureholders), issue + write-off + Loss on Issue Account, a d4 evaluation (two ways to raise ₹9,50,000: total cost ₹5,50,000 vs ₹5,70,000). 6: three lots + write-off (₹15,000 + ₹25,000), two-stage issue at a discount redeemable at a premium + write-off, business purchase for debentures with loss on issue (10,800 debentures, ₹1,62,000), cash issue + collateral + vendor + borrowings note (₹8,50,000), issue + part-year interest + write-off, machinery for debentures + interest |

- Difficulty d1/d2/d3/d4 = 6/27/27/6. Competency: recall 6, understanding 22, application 28, analysis 9, evaluation 1 — **58% at application or above** (lint band 45–65%).
- MCQ keys a6 b5 c6 d5.
- **Tests** are disjoint and use no deck-check item. Short = A 3 MCQ + 1 A-R; B discount with refund, half-yearly interest; C four issue cases | collateral both methods; D three lots + write-off | business purchase with loss on issue. Long = A 6 MCQ + 2 A-R; B 3 × 3 + (business purchase | collateral); C interest ledgers + (two-stage issue at a premium | issue and write-off); D two-stage issue with write-off + (cash, collateral and vendor with borrowings note | issue, part-year interest and write-off).

## Verifier record (what the build computes and asserts)
- **Every figure is computed** by `acc.mjs` from the givens and rendered into stems, tables, keys and model answers with Indian digit grouping; no amount is typed twice. Amounts must be whole rupees and debentures to a vendor a whole number, or the build throws.
- **Asserted on every build:** each journal entry's debits = credits; every ledger (Debenture Interest, Debentureholders, Loss on Issue) totals equal; for every lot, amount received = number × issue price and received + loss on issue = face value + securities premium + premium on redemption; in two-stage issues the debentures credited add up to face value; refunds = excess applications × application money; purchase entries balance with goodwill or capital reserve; interest instalments add to the interest for the months; write-offs exhaust the loss, Securities Premium first; borrowings notes total (collateral debentures net nil). Key results are also pinned to independently hand-checked values (e.g. Brahmaputra Tea loss ₹40,000 written off ₹15,000 + ₹25,000; Ghaghara Cables 10,800 debentures and loss ₹1,62,000; Vaigai Pumps borrowings ₹8,50,000).
- Pipeline `verify --authored` on this unit: 66/66 pass, 0 flags; `originality --authored`: 0 errors, 0 warnings (no reference texts supplied, OA-16).

## Originality
No NCERT illustration, exercise or wording and no CBSE sample/past-paper item is reused; they define the pattern only. Every company (Narmada Agro, Konkan Cold Chain, Brahmaputra Tea, Mandovi Shipping, Vaigai Pumps and others), every vendor and every figure is SOYL's own and labelled imagined.

## For a reviewer to double-check
- **Write-off timing:** per the 2026–27 syllabus wording, discount and loss on issue are written off in full in the year of issue, Securities Premium first (including premium received on the same or another issue that year). Amortisation over the life of the debentures is not shown.
- **Discount vs Loss on Issue:** a discount alone (redeemable at par) is debited to Discount on Issue of Debentures; whenever a redemption premium exists, the discount and the premium are debited together to Loss on Issue of Debentures.
- **Schedule III placement:** Premium on Redemption of Debentures under other long-term liabilities; collateral debentures (second method) shown under long-term borrowings less Debentures Suspense; unpaid interest at the year end under other current liabilities (stated in notes and one slide, not examined).
- **Statutory references** (Companies Act 2013): Section 2(30) definition, Section 52 uses of securities premium, Section 53 (no shares at a discount, sweat equity apart), Section 71 (no voting rights on debentures).
- **SVGs** place labels by pixel coordinates; check at 360 px on staging. The six-case table is 7 columns wide and will scroll on a phone.

## Gaps
- No case-based items (optional per brief); no d5 items.
- Debentures issued in more than two instalments (calls) and pro-rata allotment on over-subscription are not covered; over-subscription is handled by refund only.
- Interest accrued at the year end is described but not examined (every question's interest dates fall on the year end).
