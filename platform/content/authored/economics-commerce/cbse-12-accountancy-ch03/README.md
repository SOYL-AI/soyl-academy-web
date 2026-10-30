# CBSE Class 12 Accountancy, Chapter 3 — Admission of a Partner

`cbse-12-accountancy-ch03` · release v1 · academic year 2026-27 · family `economics-commerce` (Part A, Unit 1: Accounting for Partnership Firms) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) on the pattern of the CBSE 12 Economics chapters. Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-12-accountancy-ch03/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, narration rules, editorial counts and the answer-leak scan, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` if anything fails). Edit `src/`, not the JSON. Rebuilding is byte-identical.

| File | What |
|---|---|
| `release.json` | 2 decks (19 + 19 slides), notes (7 sections), 31 flashcards, 79 questions (164 marks) |
| `tests.json` | `t_cbse12accountancy_ch03_short` (20 marks, 40 min) on `cbse-12-accountancy-chapter-test-short` and `t_cbse12accountancy_ch03_long` (40 marks, 90 min) on `cbse-12-accountancy-chapter-test-long`, item for item |
| `src/` | `lib.mjs` (copy of the CBSE 12 Economics lib, header changed only), `acc.mjs` (fractions and ratios, journal, ledger, revaluation, columnar capital accounts, balance sheet, a full-admission solver, working notes, number words for narration), `questions.mjs` (bank), `build.mjs` (decks, notes, flashcards, tests) |

## Scope
All four syllabus topics: t01 new profit-sharing ratio and sacrificing ratio — share taken in the old ratio, surrender of a fraction of one's own share, fractions of the firm given, one partner giving the whole share, new ratio given (12 items, plus shared items) · t02 goodwill per Accounting Standard 26 — premium in cash, in kind, partly or not brought (adjusted through capital or current accounts), premium withdrawn, premium paid privately, existing goodwill written off in the old ratio, hidden goodwill (26) · t03 revaluation account, general reserve and profit and loss balances, accumulated losses and deferred revenue expenditure, workmen compensation and investment fluctuation reserves including excess claims/falls (18) · t04 old partners' capitals adjusted on the basis of the new partner's capital (cash or current accounts), the new partner's capital from the old partners' adjusted capitals, the new balance sheet (10); 13 items span several topics, including all seven 6-mark problems. No topic of the subject's `removed_topics` (piecemeal distribution, sale to a company, insolvency, redemption of debentures, extraordinary items) belongs to this chapter.

### Decks
- **Part 1 — Ratios and Goodwill** (19 slides, 14 with visuals, 4 checks, 5 worked examples): the six adjustments (flow), five ways the new share can arise (table), **WE1** share in the old ratio (Saffron Prints, Nashik: 3 : 2 → 12 : 8 : 5), an SVG stacked-bar diagram of old and new shares, **WE2** surrender of fractions of own shares (Brahmaputra Tea Traders: 5 : 3 → 2 : 1 : 1, sacrificing 1 : 1), goodwill and Accounting Standard 26 (flow), the goodwill entries table, **WE3** premium in cash (journal), **WE4** premium partly brought (journal), old goodwill and withdrawals, hidden goodwill (flow), **WE5** hidden goodwill (Ganga Agencies: 2,40,000 − 2,00,000 = 40,000; Kabir's share 10,000).
- **Part 2 — Revaluation, Reserves, Capitals and the New Balance Sheet** (19 slides, 14 with visuals, 4 checks, 6 example slides): why revalue (flow), the revaluation account format, **WE6** revaluation account (Nilgiri Spices, Kochi: profit 24,000 shared 2 : 1), reserves table, **WE7** reserves, accumulated loss and workmen compensation reserve (Tapti Textiles, journal), order of entries in capital accounts (flow), adjusting capitals (flow), **WE8** capitals proportionate to the new partner's (Kosi Electricals: total 2,50,000; surplus 12,000, deficit 9,000), the new partner's capital from old capitals (Chambal Dairy: 1,80,000 ÷ 3/4 → 60,000), **WE9** the full Nilgiri admission over three slides (old balance sheet, columnar capital accounts, new balance sheet totalling 4,22,000).
- Narration up to 69 words (mean 51). Beyond the lib's symbol rule, `build.mjs` refuses any digit, rupee sign, slash, ampersand, per-cent sign or capitals run in narration; amounts, fractions and ratios are spoken through `words()`, `fw()` and `ratioWords()` from the computed values ("rupees thirty thousand", "twelve twenty-fifths", "Accounting Standard twenty-six").

### Notes (7 sections)
Admission and its adjustments · new and sacrificing ratios (table of cases) · goodwill under Accounting Standard 26 (every entry) · hidden goodwill · revaluation · reserves and accumulated profits or losses · capitals and the new balance sheet. Each has key terms and at least one visual (22 visuals in all); exam tips list common mistakes and the 1/3/4/6-mark split.

### Question bank (79 items, 164 marks)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 25 | 1 | keys a7 b6 c6 d6 |
| assertion-reason | 7 | 1 | keys a3 b1 c2 d1 |
| true-false · fill-blank · match | 6 · 4 · 3 | 1 · 1 · 2 | T/F 2 true, 4 false |
| numerical | 7 | 1 | profit share, hidden goodwill share, premium to one partner (non-proportional sacrifice), revaluation profit, required capital, cash to bring, new partner's capital |
| short | 13 | 3 | ratio calculations, goodwill entries (cash, part, kind, hidden), revaluation account, reserves, special reserves, capital adjustment, new partner's capital, two theory items |
| long | 7 | 4 | ratios + premium, goodwill in two cases, existing goodwill with a non-sacrificing partner, hidden goodwill with reserve, revaluation + capital accounts (loss), reserves with an excess claim, capital adjustment through current accounts |
| long | 7 | 6 | full admissions: revaluation account, columnar capital accounts and new balance sheet (premium in cash; premium not brought with accumulated loss; hidden goodwill; existing goodwill + premium partly brought with given new ratio; proportionate capital with workmen compensation claim; capitals adjusted in cash with investment fluctuation reserve; three old partners, one not sacrificing, capitals adjusted through current accounts) |

- Difficulty d1/d2/d3/d4/d5 = 8/24/31/13/3. Competency: recall 10, understanding 23, application 36, analysis 10 — **58 % at application or above** (lint band 45–65 %).
- Written answers carry the full working in `model_answer_md` (working notes, journal entries with narrations, ledger accounts and balance sheets as markdown tables); `solution_md` is a one-line method note. Every marking scheme's step marks sum to the item's marks.
- **Tests** are disjoint and use none of the 8 deck-check items. Short = A 3 MCQ + 1 A-R; B 2 × 3 marks; C one of two 4-mark; D one of two 6-mark. Long = A 6 MCQ + 2 A-R; B 3 × 3 marks + (3 | 3); C 4 + (4 | 4); D 6 + (6 | 6).

## Verifier record (what the build computes and asserts)
- `acc.mjs` works in exact fractions. `admit()` checks that old shares and new shares each add to 1, that sacrifices add to the new partner's share and that no old partner gains; every rupee split (`F.of`, `splitRatio`) must be a whole number.
- `journal()` throws unless each entry's debits equal its credits; `tAccount()`, `revaluation()` and `capitalAccounts()` throw unless both sides total (no capital account may close with a debit balance); `balanceSheet()` throws unless assets equal liabilities.
- `solveAdmission()` derives everything for the 6-mark problems and WE6/WE9 from the old balance sheet and the terms: revaluation, reserves (including the claim/fall rules), premium in the sacrificing ratio, hidden goodwill, proportionate capital, capital adjustment; the new balance sheet is built independently from the revised asset and liability lines, so it balancing is a real cross-check of the capital accounts. The bank working is re-added and compared; the bank may not go negative.
- The terms of each 6-mark problem are written from the scenario object itself (`dv`, `bv`, `pct` — a stated percentage must reproduce the revaluation amount), so a figure in a question is the figure the solver used. Expected key figures (ratios, revaluation results, closing capitals, balance-sheet totals, bank) are also asserted per item and per worked example.
- Pipeline gates run inside the build: schema, `lintExemplar` (0 errors, 0 warnings) and `deterministicChecks` (0 flags). Run separately on this chapter: `content verify --authored` 79/79 pass; `content originality --authored` (cbse 12 accountancy) 0 errors.

## Originality
Every firm, person, place-and-trade pairing and figure is SOYL's own and labelled "imagined" (Saffron Prints, Brahmaputra Tea Traders, Ganga Agencies, Nilgiri Spices, Tapti Textiles, Kosi Electricals, Chambal Dairy, Godavari Agro, Mahanadi Packaging, Periyar Rubber, Sutlej Cycles, Kaveri Silk, Teesta Tours, Damodar Steel Traders and the small firms in the shorter items). No NCERT illustration, exercise or table and no CBSE sample-paper or past-paper item was used or reconstructed; they informed pattern only. Explanations are written fresh.

## For a reviewer to double-check
- **Hidden goodwill** is debited to the new partner's capital account (fluctuating capitals); some teachers prefer the current account when capitals are fixed — the notes and `m_not_brought` mention both.
- **Premium partly brought** is shown as one combined entry (Premium for Goodwill A/c and the new partner's Capital A/c Dr. To sacrificing partners), the usual CBSE marking-scheme form.
- **Workmen compensation claim larger than the reserve**: the excess is debited to the revaluation account (`m_wcr`, `l4_reserves_reval`).
- **Provision for doubtful debts** is shown in the new balance sheets as "Debtors X less provision Y" with the net amount.
- **SVG layout**: the stacked-bar diagram places labels by pixel coordinates; check it at 360 px on staging.

## Gaps
- No case-based item (optional for this chapter); written items are self-evaluated against the marking scheme.
- Capital accounts with three or four partners make wide (8–10 column) markdown tables; they scroll horizontally on a phone.
