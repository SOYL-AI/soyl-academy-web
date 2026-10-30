# CBSE Class 12 Accountancy, Chapter 2 — Change in Profit-Sharing Ratio among Existing Partners

`cbse-12-accountancy-ch02` · release v1 · academic year 2026-27 · family `economics-commerce` (Unit 1: Accounting for Partnership Firms) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) on the pattern of the CBSE 12 Economics chapters (`cbse-12-economics-ch01`). Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-12-accountancy-ch02/src/build.mjs` from `platform/`). The build checks the schema, runs the pipeline lint and the deterministic verify checks, and applies the narration rules, the editorial counts and the answer-leak scan. It also runs the stage-6 near-duplicate measure over the chapter's stems and the stage-7 same-paper measure inside each test. Then it writes `release.json` and `tests.json`, or parks them as `*.wip.json` if anything fails. Edit `src/`, not the JSON. Rebuilds are byte-identical.

| File | What |
|---|---|
| `release.json` | 2 decks (19 + 18 slides), notes (7 sections), 30 flashcards, 76 questions (149 marks) |
| `tests.json` | `t_cbse12accountancy_ch02_short` (20 marks, 40 min) on `cbse-12-accountancy-chapter-test-short` and `t_cbse12accountancy_ch02_long` (40 marks, 90 min) on `cbse-12-accountancy-chapter-test-long`, item for item |
| `src/` | `lib.mjs` (the CBSE 12 Economics authoring library, unchanged except its header), `acc.mjs` (accounting helpers: exact fractions, ratio changes, adjustment entries, journal tables, T-accounts, columnar capital accounts, balance sheets, WCR and IFR rules; every helper asserts its own arithmetic), `questions.mjs` (bank), `build.mjs` (decks, notes, cards, tests, duplicate scans) |

## Scope
All three syllabus topics:
- **t01 sacrificing and gaining ratios** (18 items + 3 shared). Covers old − new and new − old, a partner who is unaffected, and different denominators (8ths against 5ths, 6ths against 5ths). Also covers surrender of a fraction of a partner's own share (as distinct from a fraction of the firm's profit) and new ratio from a stated sacrifice.
- **t02 goodwill on change in ratio per AS 26** (17 + 7 shared). No goodwill account is raised; gaining partners are debited and sacrificing partners credited. Goodwill already in the books is written off in the old ratio first. With fixed capitals the entries go through current accounts. Goodwill is valued by average profit and by super profit (the Chapter 1 methods) before the adjustment.
- **t03 revaluation, reserves and accumulated profits** (34 + 6 shared). Covers the revaluation account, shared in the old ratio, and the rules for assets, liabilities, unrecorded items and the increase in a provision. Also covers the general reserve and profit and loss credit and debit balances in the old ratio. The workmen compensation reserve has three cases: no claim, claim below the reserve, and claim above it (excess to revaluation). The investment fluctuation reserve has three cases: a fall within the reserve, a fall beyond it (excess to revaluation), and a rise (credited to revaluation, whole reserve to partners). The topic ends with the **single adjustment entry** when book values and reserves are kept, and why it equals distribution.

### Decks
- **Part 1** (19 slides): why ratios change, the formulas, a grouped SVG bar chart of old and new shares, special cases, the goodwill flow and entry format, existing goodwill and fixed capitals. **Worked examples:**
  - Meera, Naveen and Omkar move from 4 : 3 : 1 to 2 : 2 : 1: 1/10 sacrificed, 1/40 and 3/40 gained.
  - Tara surrenders 1/3 of her share to Uday, giving a new ratio of 2 : 3.
  - Goodwill of ₹1,60,000 for the first firm: 16,000 = 4,000 + 12,000.
  - Existing goodwill of ₹30,000 written off 18,000 : 12,000, then a ₹20,000 adjustment.

  Four checks.
- **Part 2** (18 slides): why revalue, revaluation rules, journal entries for revaluation, reserves table, WCR and IFR case tables, the single-entry flow, and a table proving that the two methods leave the partners equally placed. **Worked examples** (Lata and Mohan, 3 : 2 → 1 : 1):
  - Revaluation account with a gain of ₹20,000 (12,000 : 8,000).
  - Reserves: the general reserve and profit and loss balance, the WCR after a ₹6,000 claim, and the IFR after a ₹4,000 fall.
  - The single entry of ₹10,500 on a net ₹1,05,000.

  Four checks.
- 26 of 37 slides carry a visual (1 SVG, 6 flows, 19 tables), never more than 3 slides apart. Narration is at most 68 words (mean 52) and TTS-safe: amounts, ratios and "Accounting Standard twenty-six" are spoken in words.

### Notes, flashcards
- 7 sections, each with key terms and at least one visual. Exam tips list the common mistakes and the usual 1/3/4/6-mark splits.
- 30 flashcards (definitions, rules, exam tips) tagged to topics.

### Question bank (76 items)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 25 | 1 | ratio changes, goodwill amount, the unaffected partner, provision increase, WCR/IFR cases; keys a7 b6 c6 d6 |
| assertion-reason | 6 | 1 | keys a2 b1 c2 d1 |
| true-false · fill-blank · match | 6 · 6 · 2 | 1 · 1 · 2 | T/F 3 true, 3 false |
| numerical | 8 | 1–2 | profit gained, goodwill credited (two and three partners), revaluation profit, share of a revaluation loss, WCR excess, IFR shortfall, single-entry amount |
| short | 11 | 3 | ratio working, surrender, goodwill entries (three partners, existing goodwill, fixed capitals), revaluation account, reserve, WCR and IFR entries, single entry, two explanation items |
| long | 6 | 4 | goodwill by average profit and by super profit, ratio and goodwill together, a three-partner revaluation account, single combined entry, WCR and IFR with a rise in investments |
| long | 6 | 6 | revaluation and capital accounts; seven-entry journal; single entry for goodwill, reserves and revaluation (three partners); revaluation, capital accounts and new balance sheet; WCR and IFR shortfalls; surrender with goodwill and reserves |

- Difficulty d1/d2/d3/d4 = 13/26/26/11. Competency: recall 9, understanding 24, application 38, analysis 5. That puts **57% at application or above** (lint band 45–65%).
- **Tests** share no question and use no deck-check item.
  - **Short:** A has 3 MCQ and 1 A-R. B has 2 three-mark items. C is one of two 4-mark items. D is one of two 6-mark items.
  - **Long:** A has 6 MCQ and 2 A-R. B has 3 three-mark items plus a choice of 1 from 2. C has one 4-mark item plus a choice of 1 from 2. D has one 6-mark item plus a choice of 1 from 2.
- Written answers carry the full working in `answer.model_answer_md`: shares over a common denominator, journal entries with narrations, T-form revaluation accounts, columnar capital accounts and balance sheets, all as markdown tables. `solution_md` is a short method note. Step marks sum to each item's marks; a few 6-mark schemes use half marks (1.5).

## Verifier record (what the build computes and asserts)
- **Fractions are exact** (`Fr` in `acc.mjs`). For every ratio change the build asserts that total sacrifice equals total gain. Sacrificing and gaining ratios and new ratios are reduced from the computed fractions.
- **Every rupee figure comes from the givens.** Shares of goodwill, revaluation results, reserves, WCR and IFR excesses and single-entry amounts must be whole rupees, and splits must add back to the total. Indian digit grouping is applied by `amt()`/`inr()`, so no figure is typed twice.
- **Every journal entry** has debits equal to credits (`je`). **Every T-account** balances (`tAccount`, `revaluation`). **Every capital account** balances per partner, with no overdrawn closing balance (`capitalAccounts`). **Both balance sheets** agree: Jyoti and Karan total 2,90,000 before and 2,77,000 after.
- **Key figures are pinned** by `expect()` in `questions.mjs` and `build.mjs`, for example:
  - Bhavesh and Chitra: gain 25,000; closing capitals 1,88,750 and 76,250.
  - Gaurav, Heena and Imran: 20,500, 41,000 and 61,500 on 2,05,000.
  - Lata and Mohan: distributing gives 63,000 and 42,000; keeping the reserves plus the adjustment gives the same, asserted per partner.

  A drift throws.
- Pipeline lint 0 errors / 0 warnings; deterministic verify clean; answer-leak scan clean; near-duplicate scan clean (5-gram Jaccard < 0.7 on stems; < 0.5 between items of the same test).

## Accounting conventions used
- Goodwill per **AS 26**: no goodwill account on a change in ratio. Old goodwill is written off in the old ratio. The current value is adjusted as gain × goodwill (gainers Dr., sacrificers Cr.).
- Revaluation gain or loss, reserves and accumulated profits or losses are shared in the **old ratio**. For a provision for doubtful debts, only the increase over the existing provision is debited.
- **WCR:** the claim is transferred to a provision for workmen compensation claim. Any excess goes to partners. A shortfall is debited to revaluation.
- **IFR:** a fall in investments is met from the reserve first. The excess fall is debited to revaluation. A rise is credited to revaluation and the whole reserve goes to partners.
- **Single adjustment entry:** (reserves + profit balance − loss balance ± net revaluation [+ goodwill]) × (old − new share).

## Originality
Every firm, partner, place and figure is imagined and labelled as such, set in towns across India from Indore to Tiruppur. No NCERT illustration, exercise or wording and no CBSE sample or past-paper question is reused; those define pattern only.

## For a reviewer to double-check
- **SVG layout:** the grouped bar chart (Part 1, slide 4) places labels by pixel coordinates; check it at 360 px on staging.
- **Wide tables:** the two-partner capital accounts are 6 columns wide and need horizontal scrolling at 360 px.
- **`l6_ifr_wcr`:** WCR and IFR shortfalls are passed as compound entries (Reserve A/c Dr. + Revaluation A/c Dr. To Provision or Investments).
- **Half-mark steps** in some 6-mark schemes (1.5); change to whole marks if the player needs them.

## Gaps
- No case-based items: the accountancy blueprints have no case slot.
- No d5 items. No capitalisation-method goodwill question here (Chapter 1 covers it).
- No plot-type visual; the one chart is SVG.
