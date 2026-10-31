# ISC Class 12 Accounts, Chapter 8 — Redemption of Debentures

`isc-12-accounts-ch08` · release v1 · academic year 2026-27 · ISC 2027, Accountancy (858), Paper I Section A, Unit 2 Joint Stock Company Accounts (Issue and Redemption of Debentures weightage 8 marks) · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) on the pattern of ISC ch07 and the CBSE 12 Accountancy chapters. Redemption of debentures is deleted from the CBSE syllabus, so there is no CBSE model; the redemption engine in `src/acc.mjs` is new. Built from `src/` (`npx tsx content/authored/economics-commerce/isc-12-accounts-ch08/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, narration rules, editorial counts and the answer-leak scan, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` if anything fails). Edit `src/`, not the JSON. Rebuilding is byte-identical.

| File | What |
|---|---|
| `release.json` | 2 decks (20 + 20 slides), notes (8 sections), 31 flashcards, 70 questions (141 marks) |
| `tests.json` | `t_isc12accounts_ch08_short` (20 marks, 50 min) on `isc-12-default-chapter-test-short` and `t_isc12accounts_ch08_long` (40 marks, 100 min) on `isc-12-default-chapter-test-long`, item for item |
| `src/` | `lib.mjs` (copy of the CBSE 12 Economics lib, header changed only), `acc.mjs` (rupees and Indian number words, fractions and interest, journal, To/By ledger accounts, notes; a `Ledger` that posts journal entries, guards balances and renders accounts with b/d and c/d; `KINDS` (Rule 18(7) classes), `drrNeeded()`, `driNeeded()`, `redeem()` for a lump-sum redemption from any source, `retained()`, `instalmentPlan()`), `questions.mjs` (bank), `build.mjs` (decks, notes, flashcards, tests) |

## Scope
All five syllabus topics of `platform/catalog/cisce/isc-12/accounts/syllabus.yaml`, on Section 71(4) of the **Companies Act, 2013** and Rule 18(7) of the **Companies (Share Capital and Debentures) Rules, 2014 as amended in 2019**:
- **t01** Debenture Redemption Reserve: created out of profits available for dividend, used only for redemption; **10% of outstanding debentures** for other unlisted companies; not required for listed companies, banks, All India Financial Institutions, or unlisted NBFCs/HFCs on privately placed debentures; the top-up entry (Surplus Dr. To DRR) (32 items tagged).
- **t02** Debenture Redemption Investment: at least **15% of debentures maturing during the year** ending on the next 31 March, made **by 30 April**, in the permitted forms; companies exempt from both (banks, AIFIs, unlisted NBFCs/HFCs on private placement); entries for investing, encashing with interest and closing the interest (37).
- **t03** redemption **out of capital** (no transfer; only for a company exempt from the reserve) vs **partly** (statutory 10%) or **wholly out of profits** (reserve raised to the face value redeemed); effect on profits available for dividend (17).
- **t04** redemption **in one lump sum** at par or at a premium (premium on redemption provided at issue, as in ch07): amount due through the Debentureholders' Account, payment, reserve to **General Reserve** (24).
- **t05** redemption in **annual instalments by draw of lots — concepts only**: selection by lot, holders drawn repaid in full, investment at 15% of each year's instalment renewed every year, reserve released after the last draw (7).

Items with several topics are counted under each. **Removed for ISC 2027** (one line in notes section 1, nowhere else): calculation of ex-interest and cum-interest prices; numerical problems on redemption by draw of lots. No item asks for draw-of-lots journal entries or schedules; the one instalment picture (Bobbili, deck 2) is captioned as a concept picture. **Not covered** because the ISC 2027 syllabus does not list them: redemption by purchase in the open market and by conversion.

### Decks
- **Part 1 — Reserve, Investment and Sources of Redemption** (20 slides, 15 with visuals: 11 tables, 2 flows, 2 SVG; 4 checks; 6 example slides). Running imagined company **Sarthebari Bell Metal Ltd** (unlisted, ₹20,00,000 9% debentures due 31 March 2027): **WE1** reserve topped up from ₹50,000 to ₹2,00,000 (transfer ₹1,50,000) with the DRR account; **WE2** four classes side by side (Hajo listed: DRI ₹3,00,000 only; Ponduru unlisted: DRR ₹5,00,000 + DRI ₹3,00,000; Mangalagiri bank and Gadwal HFC: neither); **WE3** Sarthebari's DRI ₹3,00,000 by 30 April 2026; **WE4** statutory vs wholly out of profits (further transfer ₹18,00,000; surplus left ₹26,00,000 vs ₹8,00,000); **WE5** Etikoppaka, listed, out of capital (DRI ₹1,20,000, interest ₹6,300, ₹8,00,000 repaid); SVGs of the two safeguards beside the debt and of profit kept back under each source.
- **Part 2 — Lump-Sum Redemption, Draw of Lots and Disclosure** (20 slides, 15 with visuals: 10 tables, 3 flows, 2 SVG; 4 checks; 6 example slides). Running imagined company **Pembarthi Brass Fittings Ltd** (unlisted, ₹10,00,000 10% debentures at par on 31 March 2026): **WE6** transfer ₹40,000, DRI ₹1,50,000 at 8%, encashed with ₹11,000 interest, ₹10,00,000 paid, reserve ₹1,00,000 to General Reserve, a closing table of every account and a bank waterfall SVG (₹12,00,000 → ₹2,11,000); **WE7** Aranmula, at a 5% premium (₹6,30,000 paid, DRI ₹90,000 + ₹2,250 interest); the draw-of-lots concept flow and picture; Balance Sheet placement.
- Narration up to 68 words (mean 46). `build.mjs` refuses any digit, rupee sign, slash, ampersand, per-cent sign or capitals run in narration; amounts are spoken from the computed values via `rw()`.

### Notes (8 sections)
Meaning, methods and sources · DRR (who and how much) · DRI · exemptions and reserve vs investment · out of profits and out of capital · lump sum at par (order of entries, closing check) · at a premium and the Balance Sheet · draw of lots (concepts). Each has key terms, entries or rules in the body and at least one visual; exam tips list common mistakes and the 1/2/3/5-mark split used by the SOYL tests plus the full-practical split.

### Question bank (70 items, 141 marks)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 20 | 1 | keys a5 b5 c5 d5 |
| assertion-reason | 6 | 1 | keys a2 b1 c2 d1 |
| true-false · fill-blank · match | 5 · 3 · 2 | 1 · 1 · 2 | T/F 2 true, 3 false |
| numerical | 6 | 1 | DRR shortfall (one and two series), DRI on the series maturing, General Reserve after a statutory redemption, amount paid at a premium, interest on the DRI |
| short | 9 | 2 | DRR top-up entry, why a reserve, DRI made and encashed, DRR vs DRI, profits vs capital, listed company out of capital, lump sum at par, premium redemption, draw of lots explained |
| short | 11 | 3 | four classes of company, DRI and interest accounts, wholly out of profits, three sources compared, lump sum with DRI, ledgers at a premium, DRR and General Reserve accounts, two-year top-up after a new issue, notes to accounts, error spotting, draw of lots with DRR and DRI |
| long | 6 | 5 | in parts (3 + 2): lump sum with DRR and DRI accounts; premium redemption with PRD and holders' accounts; listed vs unlisted sources; premium redemption with the Bank Account; two series with notes; draw of lots vs lump sum (theory) |
| long | 2 | 8 | full practicals (practice only, not in the tests): Vadakara (two-year reserve top-up, premium redemption, ledgers); Payyoli (two series, one redeemed wholly out of profits, notes) |

- Difficulty d1/d2/d3/d4/d5 = 11/29/24/5/1. Competency: recall 8, understanding 23, application 26, analysis 13 — **56 % at application or above** (39 of 70; lint band 45–65 %).
- Written answers carry the full working in `model_answer_md` (workings, journal entries with narrations, ledger accounts, notes, comparison tables); `solution_md` is a one-line method note. Every marking scheme uses whole-number step marks that sum to the item's marks.
- **Tests** are disjoint and use none of the 8 deck-check items (`tf_listed_drr`, `n_drr_short`, `fb_dri_date`, `match_source`, `tf_dri_encash`, `fb_drr_gr`, `n_holders_paid`, `tf_lots`). Short = A 4 MCQ + 1 A-R; B DRR top-up + (DRI entries | premium redemption); C wholly out of profits + (lump sum with DRI | DRR and General Reserve accounts); D lump sum with ledgers (3 + 2). Long = A 10 MCQ + 2 A-R; B DRR vs DRI, listed out of capital + (lump sum at par | draw of lots); C four classes, DRI with interest, three sources + (ledgers at a premium | two-year top-up); D premium redemption (3 + 2), then (listed vs unlisted | full year with Bank Account). Section ids, titles and instructions follow the blueprint YAML.

## Verifier record (what the build computes and asserts)
- `acc.mjs` refuses any non-whole rupee. `journal()` throws unless each entry balances; `tAccount()` unless both sides total; `note()` unless the note totals the stated figure.
- `drrNeeded()` gives 10% of outstanding debentures for an unlisted company (nil for the exempt classes) and the transfer still needed; `driNeeded()` gives 15% of the debentures maturing in the year (nil for the exempt classes).
- `redeem()` refuses redemption out of capital by a company that must keep the reserve, a transfer larger than the surplus available, and an investment below the minimum; it asserts the reserve is at least 10% (statutory) or exactly the face value (wholly out of profits). It posts every entry to a `Ledger` with opening balances and guards (bank never overdrawn when an opening balance is given; surplus, reserve and holders never on the wrong side), and asserts that the **Debentures, Premium on Redemption, Debentureholders, Debenture Redemption Investment and Debenture Redemption Reserve accounts close at nil**, General Reserve receives exactly the reserve, the interest account closes, and **the bank moves by interest earned less the amount repaid**.
- **Pinned results** (independently hand-checked): Sarthebari ₹2,00,000 / ₹1,50,000, DRI ₹3,00,000, wholly out of profits ₹18,00,000; Etikoppaka ₹1,20,000 and ₹6,300; Pembarthi ₹40,000, ₹1,50,000, ₹11,000, bank ₹2,11,000 and the closing table; Aranmula ₹6,30,000, ₹90,000, ₹2,250; Bobbili ₹30,000 a year; and every bank item (e.g. Swamimalai ₹1,30,000; Athangudi ₹75,000; Kuthampully ₹90,000; Basar ₹22,50,000; Kondane bank fall ₹4,16,700; Kolanupaka ₹1,35,000 and ₹9,900; Hirakud ₹10,80,000; Erattupetta bank ₹92,250; Kodungallur ₹70,000 and ₹1,20,000; Vadakara ₹2,25,000, ₹16,500, bank ₹91,500; Payyoli ₹10,80,000, ₹8,400, General Reserve ₹15,00,000). The four SVGs' geometry is computed from the figures and asserted.
- Pipeline gates inside the build: schema, `lintExemplar` (0 errors, 0 warnings), `deterministicChecks` (0 flags), answer-leak scan. Run separately: `content originality --authored` — 183 units, 0 errors; this unit 0 errors, 0 warnings. The cross-bank checker (the pipeline's `nearDuplicates` over the ISC Accounts and CBSE 12 Accountancy banks, 1,445 questions) reports 0 flags. Two builds give identical md5 for both JSON files.

## Originality
Every company, place-and-trade pairing and figure is SOYL's own and labelled "imagined" (Sarthebari Bell Metal, Pembarthi Brass Fittings, Etikoppaka Lacquer Toys, Aranmula Mirror Works, Bobbili Veena Makers and the craft-town and river-named companies in the bank). Every place name was checked word by word against the CBSE 12 Accountancy chapters and ISC ch01–ch07 sources (no clashes), and no place is used twice within this chapter. Every stem names its own company or account, including match, true-false, fill-blank and assertion-reason lead-ins. No textbook illustration or exercise and no CISCE specimen or past-paper item was used or reconstructed; the Act and the Rules are paraphrased.

## Blueprint fit (ISC class default 1/2/3/5)
Accounts has no subject blueprint, so the tests use the ISC 12 defaults. Board redemption questions are usually a journal problem of 4–6 marks inside the 8-mark Issue and Redemption of Debentures unit, often combined with an issue. The default fits by splitting: 2-mark items are one or two entries with the working, or two differences; 3-mark items are a set of redemption entries, a ledger account or a comparison table; 5-mark items are set in parts (3 + 2). Two full practicals are kept as 8-mark practice items outside the tests.

## For a reviewer to double-check
- **Rule 18(7) classes** follow the 2019 amendment as SOYL reads it: reserve only for other unlisted companies; investment for listed companies and other unlisted companies; banks, All India Financial Institutions and unlisted NBFCs/HFCs on privately placed debentures exempt from both. Listed NBFCs/HFCs and "other financial institutions" are deliberately not used in any item.
- **Investment base** is the face value of debentures maturing in the year (premium on redemption not included).
- **Wholly out of profits** means the reserve is raised to the full face value redeemed (further transfer = face value − reserve held); "partly out of profits" means the statutory 10%.
- **Reserve after instalment redemption** is shown as released to General Reserve after the last draw (no proportional release).
- **Balance Sheet:** the Debenture Redemption Investment is shown under current investments (as most school texts do); premium on redemption under other long-term liabilities, current in the final year.
- Interest on the investment is credited to Interest on Debenture Redemption Investment A/c and closed to the Statement of Profit and Loss; tax deducted at source on it is ignored and the stems say so.

## Gaps
- No case-based item; written items are self-evaluated against the marking scheme.
- No item combines an issue (ch07) with its redemption in one problem beyond the premium on redemption carried forward.
- Dated journals and the closing table scroll on a phone; the four SVGs place labels by pixel coordinates — check them at 360 px on staging.
