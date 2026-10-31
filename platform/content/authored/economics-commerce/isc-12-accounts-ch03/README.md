# ISC Class 12 Accounts, Chapter 3 — Reconstitution of Partnership: Admission of a Partner

`isc-12-accounts-ch03` · release v1 · academic year 2026-27 · ISC 2027, Accountancy (858), Paper I Section A, Unit 1 Partnership Accounts · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) on the pattern of the CBSE 12 Accountancy chapters. Built from `src/` (`npx tsx content/authored/economics-commerce/isc-12-accounts-ch03/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, narration rules, editorial counts and the answer-leak scan, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` if anything fails). Edit `src/`, not the JSON. Rebuilding is byte-identical.

| File | What |
|---|---|
| `release.json` | 2 decks (19 + 20 slides), notes (8 sections), 31 flashcards, 77 questions (155 marks) |
| `tests.json` | `t_isc12accounts_ch03_short` (20 marks, 50 min) on `isc-12-default-chapter-test-short` and `t_isc12accounts_ch03_long` (40 marks, 100 min) on `isc-12-default-chapter-test-long`, item for item |
| `src/` | `lib.mjs` (copy of the CBSE 12 Economics lib, header changed only), `acc.mjs` (exact fractions and ratios, admissions in which an old partner gains, change in ratio among existing partners, journal, To/By ledger accounts, revaluation, columnar capital accounts, horizontal balance sheet, a full-admission solver, working notes, number words for narration), `questions.mjs` (bank), `build.mjs` (decks, notes, flashcards, tests) |

## Scope
All seven syllabus topics of `platform/catalog/cisce/isc-12/accounts/syllabus.yaml`:
- **t01** new profit-sharing ratio and sacrificing ratio (old-ratio, surrender of own share, fraction of the firm, stated new ratio) and the **gaining ratio on admission** (a stated new ratio under which an old partner gains and pays for it).
- **t02** goodwill under Accounting Standard 26: premium in cash, retained, withdrawn (fully or half), in kind, paid privately, partly or not brought — adjusted through the **current account under fixed capitals** or the capital account.
- **t03** hidden goodwill; goodwill already in the books written off in the old ratio.
- **t04** Revaluation Account (profit and loss cases), including unrecorded assets and liabilities and provisions.
- **t05** general reserve, profit and loss balances, deferred revenue expenditure, workmen compensation reserve (claim below and above the reserve), investment fluctuation reserve (fall above the reserve; a rise in value) and the **single adjustment entry** when reserves are kept in the books.
- **t06** old capitals adjusted on the basis of the newcomer's capital (cash or current accounts), the newcomer's capital from the old capitals, columnar capital accounts and the **Balance Sheet in horizontal form** (ISC exam note).
- **t07** change in profit-sharing ratio among existing partners: sacrifice/gain, goodwill adjustment, revaluation in the old ratio, reserves closed or kept.

Removed for ISC 2027 (memorandum revaluation account; joint life and individual life policies; admission during an accounting year) appear only as one "not in the ISC 2027 syllabus" line in notes section 1.

### Decks
- **Part 1 — Ratios and Goodwill** (19 slides, 14 with visuals, 4 checks, 4 worked examples + 1 diagram slide): reconstitution and the six matters (flow), terms of admission (table), **WE1** old-ratio case (Pragati Pickles, Nizamabad: 2 : 1 → 4 : 2 : 3), SVG bars of shares before/after, **WE2** stated new ratio in which Bhuvan gains 1/10 (Zoji Woollens, Leh), Accounting Standard 26 (flow), goodwill entries for six situations (table), **WE3** goodwill paid by the newcomer and by the gaining partner (journal), **WE4** premium not brought under fixed capitals (current accounts), old goodwill (table), hidden goodwill (flow), **WE5** hidden goodwill (Yercaud Coffee Roasters: 3,75,000 − 2,75,000 = 1,00,000; Nimisha's share 20,000).
- **Part 2 — Revaluation, Reserves, Capitals and Change in Ratio** (20 slides, 15 with visuals, 4 checks, 7 example slides): why revalue (flow), Revaluation Account format, **WE6** Konark Stone Carvers, Puri, over four slides (old horizontal balance sheet, Revaluation Account profit 13,000, columnar capital accounts, new horizontal balance sheet 4,74,500), reserves closed vs kept (table), **WE7** both treatments side by side (Dhauli Agarbatti Works), order of capital-account entries (flow), adjusting capitals (flow), **WE8** capitals through current accounts (Ooty Varkey Bakers), change in ratio (table), **WE9** Sonamarg Trek Outfitters 3 : 2 → 2 : 3 (journal).
- Narration up to 70 words (mean 52). `build.mjs` refuses any digit, rupee sign, slash, ampersand, per-cent sign or capitals run in narration; amounts, fractions and ratios are spoken from the computed values via `words()`, `fw()` and `ratioWords()`.

### Notes (8 sections)
Reconstitution and admission · new, sacrificing and gaining ratios · goodwill under Accounting Standard 26 · old and hidden goodwill · Revaluation Account · reserves (closed or kept) · capitals and the horizontal Balance Sheet · change in ratio. Each section has key terms, the formats/formulas in the body and at least one visual; exam tips list common mistakes and the 1/2/3/5-mark split used by the SOYL tests plus the full-practical split.

### Question bank (77 items, 155 marks)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 23 | 1 | keys a6 b5 c6 d6 |
| assertion-reason | 7 | 1 | keys a2 b1 c2 d2 |
| true-false · fill-blank · match | 8 · 3 · 2 | 1 · 1 · 2 | T/F 2 true, 6 false |
| numerical | 6 | 1 | profit share after surrender, premium to one partner (non-proportional sacrifice), hidden-goodwill charge, revaluation loss share, single-entry amount, change-in-ratio adjustment |
| short | 9 | 2 | ratios (2), premium withdrawn, Accounting Standard 26 (theory), existing goodwill + premium, reserves kept, newcomer's capital from old capitals, gaining/sacrifice with goodwill, workmen claim above the reserve |
| short | 9 | 3 | old partner gains on admission, fixed capitals (current accounts), premium in kind + half withdrawn, hidden goodwill, Revaluation Account (loss), purpose of revaluation (theory), reserve entries, capitals adjusted in cash, change in ratio |
| long | 7 | 5 | each in parts (2 + 3 or 3 + 2): ratios + partial premium, hidden goodwill with old goodwill and reserve, Revaluation + capital accounts, reserves closed vs kept, capitals through current accounts, newcomer's capital + horizontal Balance Sheet, change in ratio with revaluation and kept reserves |
| long | 3 | 8 | full practicals (practice only, not in the tests): Revaluation Account, columnar capital accounts and horizontal Balance Sheet — premium retained with old goodwill and reserve; hidden goodwill with workmen compensation claim; proportionate capital with an investment fall above its reserve and premium withdrawn |

- Difficulty d1/d2/d3/d4/d5 = 8/24/35/8/2. Competency: recall 7, understanding 24, application 38, analysis 8 — **60 % at application or above** (46 of 77; lint band 45–65 %).
- Written answers carry the full working in `model_answer_md` (working notes, journal entries with narrations, To/By ledger accounts, horizontal balance sheets as markdown tables); `solution_md` is a one-line method note. Every marking scheme uses whole-number step marks that sum to the item's marks.
- **Tests** are disjoint and use none of the 8 deck-check items. Short = A 4 MCQ + 1 A-R; B 2 + (2 | 2); C 3 + (3 | 3); D one 5-mark (2 + 3). Long = A 10 MCQ + 2 A-R; B 2 + 2 + (2 | 2); C 3 + 3 + 3 + (3 | 3); D 5 + (5 | 5). Section ids, titles and instructions follow the blueprint YAML.

## Verifier record (what the build computes and asserts)
- `acc.mjs` works in exact fractions. `admit()` checks that old and new shares each add to 1 and that net sacrifices equal the newcomer's share; a gain by an old partner is refused unless the item explicitly allows it. `change()` checks that sacrifices equal gains and that each adjustment's debits equal its credits. Every rupee split must be a whole number.
- `journal()` throws unless each entry balances; `tAccount()`, `revaluation()` and `capitalAccounts()` throw unless both sides total (no capital account may close in debit); `balanceSheet()` throws unless assets equal liabilities.
- `solveAdmission()` derives the 8-mark practicals and the Konark worked example from the old balance sheet and the terms (revaluation, reserves with the claim/fall rules, old goodwill, premium in the sacrificing ratio, hidden goodwill, proportionate capital, withdrawal); the new balance sheet is built independently from the revised lines, so its balancing cross-checks the capital accounts; the bank working is re-added and may not go negative. Each practical's terms are written from the scenario object (`dv`, `bv`, `pct`: a stated percentage must reproduce the revaluation amount).
- Key figures of every computed item and worked example (ratios, sacrifices and gains, premiums and splits, hidden goodwill, revaluation results, closing capitals, balance-sheet totals, bank) are pinned to hand-checked values; any drift throws.
- Pipeline gates inside the build: schema, `lintExemplar` (0 errors, 0 warnings), `deterministicChecks` (0 flags), answer-leak scan. Run separately: `content originality --authored` — 178 units, 0 errors; this unit 0 errors, 0 warnings. Two builds give identical md5 for both JSON files.

## Originality
Every firm, person, place-and-trade pairing and figure is SOYL's own and labelled "imagined" (Pragati Pickles, Zoji Woollens, Yercaud Coffee Roasters, Konark Stone Carvers, Dhauli Agarbatti Works, Ooty Varkey Bakers, Sonamarg Trek Outfitters, Rhododendron Handicrafts, Hundru Agro Foods, Ponmudi Cardamom Traders and the firms in the shorter items). Firms, people and set-ups were chosen to differ from the CBSE 12 Accountancy chapters (whose bank is not in this worktree, so the bank-wide check against them runs only after integration). Every stem names its own firm or account, including match, true-false, fill-blank and assertion-reason lead-ins. No textbook illustration or exercise and no CISCE specimen or past-paper item was used or reconstructed; explanations are written fresh.

## Blueprint fit (ISC class default 1/2/3/5)
Accounts has no subject blueprint, so the tests use the ISC 12 defaults. The board's partnership questions are larger practicals (Revaluation Account, capital accounts and a Balance Sheet together). The default fits by splitting: 2-mark items are ratio workings or two or three entries; 3-mark items are one account or a set of entries; 5-mark items are set in parts (2 + 3 or 3 + 2). Complete practicals are kept as 8-mark practice items outside the tests. A subject blueprint with 6- and 8-mark practicals would fit Accounts better.

## For a reviewer to double-check
- **Gaining old partner on admission** (`m_gain_ratio`, `s3_gain_admission`, WE2/WE3): the gainer's share of goodwill is debited to his capital account and credited to the sacrificing partner together with the newcomer's premium.
- **Fixed capitals**: goodwill not brought is adjusted through current accounts (`s3_current`, `m_current_fixed`, WE4); fluctuating-capital items use capital accounts.
- **Investment fluctuation reserve with a rise in value** (`m_ifr`): the whole reserve goes to the old partners and the rise is a revaluation gain.
- **Provision for doubtful debts** is shown as "Debtors X less provision Y" in new balance sheets.
- **Hidden goodwill** is debited to the newcomer's capital account (fluctuating capitals).

## Gaps
- No case-based item; written items are self-evaluated against the marking scheme.
- Capital accounts with three partners make wide (8-column) markdown tables that scroll on a phone.
- The SVG bar diagram places labels by pixel coordinates; check it at 360 px on staging.
