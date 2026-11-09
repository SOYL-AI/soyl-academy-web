# ISC Class 12 Accounts, Chapter 14 — Database Management System (DBMS)

`isc-12-accounts-ch14` · release v1 · academic year 2026-27 · ISC 2027, Accountancy (858), Paper I Section C, Unit 7 Database Management System · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) on the pattern of the CBSE 12 Accountancy chapters and ISC ch01–ch12. CBSE has no DBMS chapter; `cbse-12-accountancy-ch12` (computerised accounting) was read for style only, and none of its firms or stems is reused. Built from `src/` (`npx tsx content/authored/economics-commerce/isc-12-accounts-ch14/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, narration rules, editorial counts and the answer-leak scan, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` if anything fails). Edit `src/`, not the JSON. Rebuilding is byte-identical.

| File | What |
|---|---|
| `release.json` | 2 decks (21 + 20 slides), notes (8 sections), 30 flashcards, 86 questions (155 marks) |
| `tests.json` | `t_isc12accounts_ch14_short` (20 marks, 50 min) on `isc-12-default-chapter-test-short` and `t_isc12accounts_ch14_long` (40 marks, 100 min) on `isc-12-default-chapter-test-long`, item for item |
| `src/` | `lib.mjs` (copy of the CBSE 12 Economics lib, header changed only), `acc.mjs` (an in-memory relational engine: typed tables with primary and foreign keys, a parser and executor for the SQL subset in the syllabus, reports, debtor balances, bank reconciliation by matching, a straight-line asset register and a trial balance; Indian number words for narration), `questions.mjs` (bank), `build.mjs` (decks, notes, flashcards, tests, bank-level checks) |

## Scope
All five syllabus topics of `platform/catalog/cisce/isc-12/accounts/syllabus.yaml`, no removed topics:
- **t01** DBMS concept, types and features: data and information, database, DBMS, table / field / record / NULL; hierarchical, network, relational and object-oriented types; controlled redundancy, integrity, data independence, concurrency, security, backup and recovery, query language; limitations noted (16 items).
- **t02** SQL basics: SELECT … FROM, WHERE with comparisons, AND, OR (AND applied before OR; brackets), UPDATE … SET … WHERE, DELETE FROM … WHERE and the effect of leaving WHERE out (21).
- **t03** aggregate functions AVG, COUNT, MAX, MIN, SUM, with WHERE, COUNT(*) against COUNT(field), NULLs skipped (14).
- **t04** database design: fields and data types (Text, Number, Currency, Date, Yes/No), primary, candidate, composite and foreign keys, the integrity verdicts a DBMS returns, one-to-one / one-to-many / many-to-many relationships, forms, queries, reports (including reports that combine two tables) and indexing (24).
- **t05** DBMS in business: accounting information from stored vouchers, debtor and creditor balances and credit limits, bank reconciliation by matching references, the fixed asset register with depreciation, a trial balance from a vouchers table (17).

Items with two topics are counted under each. Software is described generically; no product or brand is named. **Not taught** (not in the syllabus list): ORDER BY, GROUP BY, SQL joins, INSERT and CREATE TABLE; reports that combine two tables are explained as reports (link on the key, group, total), not as SQL. IS NULL appears once, in the notes' operator table, to explain blanks.

### Decks
- **Part 1 — Concepts, Types, Features and Database Design** (21 slides, 16 with visuals: 12 tables, 2 flows, 2 SVGs; 4 checks; 4 worked examples). Running imagined company **Monal Agro Foods Ltd, Vidisha** (Customers 6 records × 5 fields, Invoices 10, Receipts 4). Data → information flow, the Customers table and its design (**WE1**), types of DBMS with an SVG of a tree beside a network, features and limitations, keys, **WE2** five proposed changes with the engine's verdicts (unknown customer C07, duplicate C03 and a blank invoice number rejected; a correct invoice accepted; deleting C04 refused while invoice 506 refers to it), an SVG relationship diagram (Customers 1 — many Invoices), **WE3** invoices per customer by COUNT queries (2, 2, 2, 1, 2, 1 = 10), designing related tables, forms / queries / reports / indexes, an index on CustCode, **WE4** sales-by-city report from two tables (Vidisha ₹2,16,000; total ₹4,13,000), summary, exam tips.
- **Part 2 — SQL, Aggregate Functions and DBMS in Business** (20 slides, 15 with visuals: 13 tables, 2 flows; 4 checks; 7 worked examples). The Invoices table, the SQL statements table, **WE5** SELECT … WHERE Amount > 40000 (5 rows), **WE6** AND (3 rows) and OR (4 rows), AND before OR with and without brackets (3 rows against 2), **WE7** UPDATE (2 records) and DELETE run in order (parent delete refused, child deleted, then parent deleted), aggregate functions (COUNT 10, SUM ₹4,13,000, AVG ₹41,300, MAX ₹75,000, MIN ₹18,000), **WE8** COUNT(*) 6 against COUNT(Agent) 4, accounting information flow, **WE9** debtors report (₹2,27,000; Gaurang Mart over its limit by ₹9,000), **WE10** bank matching and the reconciliation statement (cash book ₹1,72,000 → pass book ₹1,65,000), **WE11** asset register (depreciation ₹1,73,000; machinery cost ₹6,20,000 by a SUM query), summary, exam tips.
- Narration up to 75 words (mean 50). `build.mjs` refuses any digit, rupee sign, slash, ampersand, per-cent sign, asterisk, comparison sign or capitals run in narration: "structured query language", "the select statement", amounts in words from the computed values.

### Notes (8 sections)
Data, information, database and DBMS · types of DBMS · features, advantages and limitations · tables, data types and keys (with the integrity rules a DBMS enforces) · relationships, forms, reports and indexing (with design steps) · SQL basics (operators, AND before OR, UPDATE and DELETE with and without WHERE) · aggregate functions · DBMS in business (accounting information, debtors and creditors, bank reconciliation, asset register). Each has key terms and visuals; exam tips list common mistakes and the 1/2/3/5-mark split.

### Question bank (86 items, 155 marks)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 27 | 1 | keys a7 b7 c7 d6; computed options for fields and records, primary and composite keys, which record is saved, SELECT / AND / AND-OR precedence results, UPDATE effects, SUM, COUNT with NULLs, AVG, a debtor balance, an unmatched bank item, depreciation |
| assertion-reason | 7 | 1 | keys a3 b2 c2 d0 (ISC specimen options; (d) = both false) |
| true-false · fill-blank · match | 7 · 4 · 4 | 1 · 1–2 · 2 | T/F 4 true, 3 false; matches: DBMS types, relationships, data types, aggregate functions |
| numerical | 7 | 1–2 | report total for an area, rows returned by OR, rows changed by UPDATE, SUM, AVG, pass book balance (2 marks), machinery depreciation |
| short | 11 | 2 | DBMS features, data and information, primary and foreign keys, form and report, indexing, write a SELECT, output of an AND query, UPDATE and DELETE with counts, aggregate queries, debtor balances with opening balances, unpaid creditors' bills due |
| short | 12 | 3 | advantages over separate files, types with examples, three key verdicts, three relationships, sales-by-town report, three statements in order, outputs of a SELECT–UPDATE–DELETE sequence, AND/OR precedence, three aggregate outputs, bank reconciliation, asset register with a SUM query, DBMS in business |
| long | 7 | 5 | in parts: asset-register design (3 + 2), dealers and invoices design with integrity outcomes (2 + 1 + 2), SQL writing and outputs in order (2 + 3), aggregates with NULLs and interpretation (3 + 2), debtors report with credit limit and a query (3 + 1 + 1), bank reconciliation by matching (2 + 3), trial balance from a vouchers table (2 + 3) |

- Difficulty d1/d2/d3/d4 = 12/34/29/11. Competency: recall 10, understanding 26, application 33, analysis 17 — **58 % at application or above** (50 of 86; lint band 45–65 %).
- Written answers carry the full working in `model_answer_md` (queries in code, result tables, reports, reconciliation statements, registers); `solution_md` is a one-line method note. Every marking scheme uses whole-number step marks that sum to the item's marks (asserted in the build).
- **Tests** are disjoint and use none of the 8 deck-check items (`m_field_record`, `mt_types`, `tf_fk_unique`, `fb_pk`, `n_rows_or`, `fb_update`, `mt_aggs`, `tf_brs`). Short = A 4 MCQ + 1 A-R (DBMS, primary key, AND, SUM; integrity); B write a SELECT + (keys | aggregate queries); C three key verdicts + (aggregate outputs | bank reconciliation); D debtors report. Long = A 10 MCQ + 2 A-R across all five topics; B features, an AND output + (UPDATE/DELETE | debtor balances); C advantages, three statements, asset register + (relationships | precedence); D SQL writing and outputs, then (design with integrity | bank reconciliation). The build asserts that every section matches the blueprint YAML item for item (types, marks, choice groups).

## Verifier record (what the build computes and asserts)
- **Relational engine** (`acc.mjs`): `Db.create()` defines typed columns, a primary key and foreign keys; `Db.insert()` / `load()` add rows only if they pass; `Db.verdict()` returns the verdict for a proposed row (duplicate or blank primary key, wrong data type, no matching parent). Every table in a stem, deck or note is loaded into the engine, so every given table obeys its own keys.
- **SQL**: `Db.run()` tokenises, parses and executes every SELECT, UPDATE and DELETE shown, with AND binding tighter than OR, brackets, SQL three-valued logic for NULL, aggregates that skip NULLs, and restrict on deleting a referenced parent. Result tables and row counts in keys are rendered from the result and **pinned to hand-checked values** (e.g. Stilt K1, K2, K4, K7 without brackets against K2, K4, K7 with them; Owlet's SELECT → UPDATE → DELETE sequence 3 rows / 2 / 1; Quail 2 deleted, then shipments 2 and 5). MCQ distractors are produced by running the plausible wrong query (">" for ">=", OR for AND, no brackets, no AND condition).
- **Keys**: candidate keys are tested with `candidate()` (Bustard: only EmpCode unique; Cormorant: only BoatCode + TripDate unique, every other single field and the other pairs repeat); every key verdict quoted is the engine's own.
- **Reports**: `join()` and `groupSum()` build reports from two tables and assert that group totals add up to the table total (Monal by city ₹4,13,000; Redstart ₹31,200; Siskin Kotra ₹14,000).
- **Accounting**: `balances()` gives opening + invoices − receipts per party and asserts the total against the raw tables (Monal ₹2,27,000; Baya ₹1,24,000 with BG3 over its limit by ₹4,000; Coot; Robin); `reconcile()` matches cash book and bank statement by Ref, asserts equal amounts on matched items and asserts cash book + not presented − not credited + bank-only credits − bank-only debits = pass book (Monal ₹1,72,000 → ₹1,65,000; Gull; Grebe ₹1,00,050; Tailorbird ₹36,650; Lammergeier ₹2,02,500 → ₹1,95,210); `slmRegister()` computes straight-line depreciation, accumulated depreciation and written-down values and asserts they add back to cost; `trialBalance()` posts a vouchers table to the accounts master and asserts equal totals (Shoveler ₹7,80,000), with the Bank balance cross-checked by two SUM queries.
- Bank-level checks in `build.mjs`: whole-number scheme marks summing to each item's marks; blueprint fit of both tests; tests disjoint; no deck check in a test; narration TTS rules.
- Pipeline gates inside the build: schema, `lintExemplar` (0 errors, 0 warnings), `deterministicChecks` (0 flags), answer-leak scan. Run separately: `content originality --authored` (this unit 0 errors) and the cross-bank checker over the ISC Accounts and CBSE 12 Accountancy banks (0 flags). Two builds give identical md5 for both JSON files.

## Originality
Every firm, table, code and figure is SOYL's own and labelled "imagined"; firms are named after Indian birds (Monal, Tragopan, Hoopoe, Drongo, Shikra, Barbet, Spoonbill, Lammergeier and others). Firm, shop, person and town words were checked word by word against the CBSE 12 Accountancy chapters and ISC ch01–ch13; 15 colliding words (for example Haldia, Kannauj, Varanasi, Nayan, Kirana) were replaced. Every stem names its own firm and table, including match, true-false, fill-blank and assertion-reason lead-ins. No textbook illustration or exercise and no CISCE specimen or past-paper item was used or reconstructed.

## Blueprint fit (ISC class default 1/2/3/5)
Accounts has no subject blueprint, so the tests use the ISC 12 defaults; they fit this chapter well. 1-mark items are a term, a key, a function or one query result; 2-mark items are a distinction or one query with its result; 3-mark items are three features, verdicts or query outputs, or a short reconciliation or register; 5-mark items are a design in parts, queries with outputs, or a debtors report, reconciliation or trial balance from tables.

## For a reviewer to double-check
- **SQL dialect**: standard keywords only; text and dates in single quotes, dates as 'YYYY-MM-DD'; "<>" for not equal. Packages differ in small ways (some accept "!=" or other date forms); answers in another valid form should get credit.
- **Data types** are given generic names (Text, Number, Currency, Date, Yes/No).
- **Object-oriented DBMS** is included as the fourth type alongside hierarchical, network and relational.
- **COUNT(field) and NULL** (m_count_null, tf_avg_null, l5_aggs, WE8) follow standard SQL: aggregates skip NULL.
- **Bank reconciliation** starts from the cash book balance; standing-instruction debits and interest credits are treated as bank-only items.

## Gaps
- No case-based item; written items are self-evaluated against the marking scheme.
- No practice in a real database package (practical work is outside the platform).
- Stems with three linked tables (Baya, Coot, Robin, Lammergeier) and wide result tables scroll on a phone; the two SVGs place boxes by pixel coordinates — check at 360 px on staging.

## Assertion-reason options (2026-11-09)

Options aligned with the latest Class XII Accounts specimen paper (858, ISC 2026; no 2027 Class XII Accounts specimen is published): (a) both true, R explains A; (b) both true, R does not explain A; (c) A true, R false; (d) both false. For this chapter option (d) is now "Both Assertion and Reason are false" (was "A is false, but R is true"); every item keyed (d) under the old order was rewritten (its assertion corrected so both are true, or its reason made false so both are false), and its key and solution updated. Keys in bank order: a c b a b a c. Tests are unchanged (same items in the same slots).
