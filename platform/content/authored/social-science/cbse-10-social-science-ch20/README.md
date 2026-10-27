# CBSE Class 10 Social Science, Chapter 20 — Money and Credit

`cbse-10-social-science-ch20` · release v1 · academic year 2026-27 · family `social-science` (Economics) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored to the Economics standard set by `cbse-10-social-science-ch18` (D-025, D-026, D-032), following `platform/content-templates/prompts/social-science/*.v1.md`. Built from `src/` (`npx tsx content/authored/social-science/cbse-10-social-science-ch20/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, word limits, narration rules and the answer-leak scan, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON. `src/lib.mjs` is identical to ch19's.

| File | What |
|---|---|
| `release.json` | 2 decks (19 + 18 slides), notes (7 sections, 15 visuals), 32 flashcards, 87 questions (159 marks; 24 passage parts and alternatives) |
| `tests.json` | `t_cbse10sst_ch20_short` (20 marks, 40 min) and `t_cbse10sst_ch20_long` (40 marks, 90 min) on the SST chapter-test blueprints; the long test's compulsory 5-mark question is data-based (an imagined survey of loan sources by income group) |

## Scope
All four topics: t01 money as a medium of exchange and modern forms of money (21 tags) · t02 loan activities of banks and two credit situations (18) · t03 terms of credit, formal and informal sources, the RBI (30) · t04 self-help groups (20).

### Decks
- **Part 1** (19 slides): barter and the double coincidence of wants (three traders who cannot swap), money as a medium of exchange, the history of money, currency and legal tender (RBI notes, government coins), demand deposits, digital payments (UPI, cards, the digital-rupee pilot), how banks use deposits, credit that helps and credit that traps. **Worked examples:** a cheque payment step by step; a bank's income from the interest gap (4.8 − 2.5 = ₹2.3 crore); two credit stories compared (a Jaipur rakhi maker and a Yavatmal cotton farmer). Four checks.
- **Part 2** (18 slides): the four terms of credit, formal vs informal sources, how the RBI supervises banks, why the poor still use moneylenders, an imagined survey plot (formal 80/30, informal 20/70), widening formal credit (Jan Dhan, banking correspondents, Kisan Credit Cards, SHG–bank linkage, rules for loan apps), self-help groups and empowerment, the Grameen Bank. **Worked examples:** comparing a moneylender's 2% a month with a bank's 12% a year (₹2,400 vs ₹1,200); an SHG's yearly savings (18 × 150 × 12 = ₹32,400); planning a five-point formal/informal comparison. Three checks.
- 26 of 37 slides carry a visual (16 tables, 9 flows, 1 plot); narration 8–72 words (mean 56), no symbols.

### Question bank (87 items)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 30 | 1 | scenarios (a weaver who cannot barter, a UPI vegetable seller, a cheque in Pune, a festival-season rakhi maker, a Marathwada debt trap, a landless labourer's choice, an SHG vote in Erode), a statement-combination item, a d4 "cheapest of four offers" item |
| assertion-reason | 9 | 1 | keys a4 b1 c2 d2 |
| numerical | 6 (+ 8 inside cases) | 1–2 | lendable deposits, interest gaps, simple interest, monthly-to-yearly rates, SHG pools, the saving from a cheaper loan with a fee (d4) |
| true-false · fill-blank · match · ordering | 4 · 4 · 3 · 2 | 1 · 1 · 2 · 1 | ordering: forms of money over time; stages of an SHG |
| short | 10 + 7 | 2 / 3 | `word_limit` 25–40 / 40–60; includes evaluating "SHGs alone can end rural poverty" (d4) |
| long | 6 | 5 | includes the **table-based** survey question (d4) and an evaluation of collateral (d4) |
| source-based | 3 | 4 | a groundnut farmer's notebook in Anantapur (trader-lender and a debt trap), an SHG's minutes in Sitapur, a grandmother's letter from barter to UPI |
| case-based | 3 | 4 | two loans in Nalgonda (moneylender 36% vs cooperative 9%), a gramin bank branch's annual summary, an SHG's loan ledger in Kalahandi |

- Difficulty d1/d2/d3/d4 = 17/41/24/5. Competency: recall 14, understanding 27, application 21, analysis 22, evaluation 3 — **53% of items and 62% of marks at application or above**.
- MCQ keys a7 b8 c7 d8; T/F 2 true, 2 false.
- **Tests** are disjoint and use no deck-check item. Short = A 3 MCQ + 1 A-R; B 2 + 2 + 3; C one of two 5-mark; D the SHG minutes. Long = A 8 MCQ + 2 A-R; B 2 + 2 + (2|2) + 3 + (3|3); C survey data question + (5|5); D the farmer's notebook and the grandmother's letter.

## Data and facts
- **All loans, banks, groups and surveys are imagined**, and every figure is recomputed by the build (see `build.checks.data`): e.g. 50,000 at 3% a month = ₹18,000 a year vs 9% a year = ₹4,500 (four times as much); branch income 400 × 11% − 500 × 5% = 44 − 25 = ₹19 lakh; SHG ledger rows add to ₹1,10,000, income-earning loans ₹68,000, average loans 9,000 / 8,000 / 6,000 / 3,000.
- Interest is shown as plain arithmetic (no KaTeX), so the `$` sign never appears.
- Real facts are kept to stable ones: the RBI issues notes on behalf of the central government and the Government of India issues coins; the rupee is legal tender; demand deposits and cheques; UPI; the RBI's digital-rupee **pilot**; the RBI supervises banks (cash balance, lending to small borrowers, periodic reports) but not moneylenders; Jan Dhan accounts since 2014, **more than 50 crore** accounts; Kisan Credit Cards; RBI rules for digital lending; SHGs of about 15–20 members; the Grameen Bank and the 2006 Nobel Peace Prize; about 10 crore rural women in SHGs under the national rural livelihoods mission (rounded; please re-check the latest count before publishing).
- **Originality:** NCERT's named borrowers and stories, its survey tables and its SHG example are not reused; every story and table is SOYL's.

## Verifier pass (2026-10-27)
- Every key re-solved from the stem. One match item was made unambiguous (a Kisan Credit Card can come from a cooperative bank as well as a commercial bank, so the left item now names an SBI branch). A case row that said "no collateral" while the borrower pledged anklets was corrected to "her silver anklets, kept by the lender".
- Four model answers trimmed to their word limits; two genuinely harder items (comparing four loan offers; a loan with a processing fee) added so that at least five items are at d4.
- Answer-leak scan: the worked examples on slides use different figures from the practice items (e.g. the SHG pool slide uses 18 × ₹150, the item 15 × ₹200), so no solution text is served.

## Gaps
- No **map** item: the chapter has no map work.
- The SHG membership figure and the Jan Dhan count change every year; they are rounded and should be refreshed when the chapter is reviewed.

## Competency audit by assessment-designer (2026-10-27)

Re-read against the rule used for CBSE 10 Maths (D-035 context): a routine, textbook-standard step on given data — a one-step formula numerical, a balanced equation, an electron-dot structure, a named part or a value read off a table — is **understanding**; applying ideas to new situations, interpreting data, explaining observations, analysis and evaluation keep their tags. 0 item tag(s) and 2 case/source-part tag(s) changed to understanding (case items whose parts are now mostly recall/understanding carry `understanding` at the top level). No question text, key, solution or marking scheme changed. Now: recall 14, understanding 27, application 21, analysis 22, evaluation 3 — application or higher 53% of items, 62% of marks (supersedes the competency figures above).
