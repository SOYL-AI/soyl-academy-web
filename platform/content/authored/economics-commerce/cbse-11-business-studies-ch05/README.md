# CBSE Class 11 Business Studies, Chapter 5: Emerging Modes of Business

`cbse-11-business-studies-ch05` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human` · every item `status: "draft"`

Hand-authored to the CBSE 11 Business Studies standard (D-025, D-026, D-036). Build from `platform/`:
`npx tsx content/authored/economics-commerce/cbse-11-business-studies-ch05/src/build.mjs`. The build checks the schema, pipeline lint, deterministic verify, word limits, narration rules, the answer-leak scan, the exact-stem originality pre-check and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON. The shared library is `../cbse-11-business-studies-ch01/src/lib.mjs` (imported, never edited).

| File | What |
|---|---|
| `release.json` | 2 decks (21 + 21 slides), notes (7 sections), 32 flashcards, 78 questions |
| `tests.json` | `t_cbse11businessstudies_ch05_short` (20 marks, 40 min) and `_long` (40 marks, 90 min) on `cbse-11-default-chapter-test-short` / `-long`, disjoint, no deck-check item |
| `src/` | `questions.mjs`, `build.mjs` |

## Scope

| Topic | Coverage |
|---|---|
| t01 | E-business and e-commerce; scope (business to business, business to customer, intra-business, customer to customer); benefits; limitations |
| t02 | Stages of an online transaction; payment mechanisms (as of 2024); security risks and measures; legal recognition under the Information Technology Act 2000 (as of 2024); resources for successful e-business |
| t03 | Outsourcing: concept, business process and knowledge process outsourcing, scope, need, concerns |

Decks: Part 1 (e-business, scope, benefits, limitations, stages, payment; 4 checks, 3 worked examples: naming the type, the saving from going online, the amount to pay) and Part 2 (security, resources, outsourcing; 4 checks, 3 worked examples: naming the risk, choosing the measure, the saving from outsourcing payroll). SVGs: e-business scope chart, online transaction stages flow, payment-methods chart, security risks and measures chart, outsourcing need-and-concerns web. No maps.

Questions: 34 mcq, 6 assertion-reason, 3 true-false, 3 fill-blank, 2 match, 2 ordering, 10 short 2-mark, 7 short 3-mark, 6 long 5-mark, 5 case-based (all on imagined firms). Application or above: 63%.

Tests: short = 3 mcq + 1 ar / 2-mark x2 + 3-mark / one of two long / `cb_shield`. Long = 8 mcq + 2 ar / two 2-mark, one of two 2-mark, 3-mark, one of two 3-mark / long + one of two long / `cb_kala` + `cb_payroll`.

Every firm, website, cooperative, buyer and customer is imagined. No real e-commerce company or app is named.

## How verified

Build prints `NO ERRORS` with `lint: 0 error(s), 0 warning(s)`; `release.json` and `tests.json` are byte-identical across three builds; `checks.mjs` reports 0 near-duplicate flags (78 stems against 40,500 others) and 0 SVG issues. No tree-wide gates, git or e2e were run.

## Facts for a reviewer

Time-sensitive points are "as of 2024" in the content and should be re-checked.

1. E-business: carrying out the processes of industry, trade and commerce with the help of computer networks. E-commerce: buying and selling online with the dealings with customers and suppliers; a part of e-business.
2. Scope: business to business, business to customer, intra-business (within a firm), customer to customer; all examples imagined.
3. Benefits (five): ease of formation and lower investment; convenience (business at any time); speed; global reach and access; a move towards a paperless society.
4. Limitations (six): low personal touch; mismatch between the speed of order-taking and of delivery; need for technology capability and competence by all parties; risk from anonymity of parties; people's resistance; ethical fallouts such as monitoring of employees.
5. Stages: pre-purchase or pre-sale (information, advertising); purchase or sale (registration, placing the order in the shopping cart, payment); delivery.
6. Dated, as of 2024, general terms: cash on delivery; cheque (written order to the bank, needs clearing); net banking transfer; debit card (pays from the balance) and credit card (pay later within a limit); digital cash and e-wallets (prepaid stored balance); unified payments interface (instant transfer between bank accounts started from a phone, by payment address). Reviewer: confirm the wording stays accurate and not too specific.
7. Security risks: transaction risks (default on order-taking or order-giving, on delivery, on payment); data storage and transmission risks (viruses, hacking); risks to intellectual property and privacy.
8. Security measures, general terms: encryption (scrambling with a key); digital signature (identifies the sender and shows the record is unaltered); digital certificate (issued by a trusted body to show a key belongs to a named party); password; one-time password (valid for one transaction or login, expires soon); firewall (filters traffic between a private network and the internet); secure website (encrypted connection; a padlock and a secure web address, as of 2024).
9. Dated, as of 2024: the Information Technology Act 2000 gives legal recognition to electronic records and digital signatures. Reviewer: confirm; no section numbers or later amendments are mentioned.
10. Resources for e-business: a well-designed website; technology and security infrastructure; logistics; payment systems.
11. Outsourcing: contracting some activities of a firm to outside specialists, usually non-core and sometimes core. Business process outsourcing (routine processes such as a helpline) and knowledge process outsourcing (work needing expert knowledge and analysis) stated in general terms only.
12. Scope of outsourcing: finance and accounting; advertising; courier and logistics; customer support (call centres); production and manufacturing.
13. Need (five): focus on the core business; quest for excellence; cost reduction through the economies of scale of specialists; growth through knowledge sharing and collaboration between organisations; a catalyst for economic development.
14. Concerns (four): confidentiality; sweatshop exploitation; ethical concerns; opposition in home countries.
15. Computed figures (code): Pustak Ghar order, three books at Rs 240 plus one at Rs 350 = Rs 1,070; 10 per cent coupon Rs 107; delivery Rs 40; amount to pay Rs 1,003. Shop Rs 45,000 against stock room Rs 12,000 a month: saving Rs 33,000 a month, Rs 3,96,000 a year. Export order Rs 12,00,000, 40 per cent advance Rs 4,80,000, balance Rs 7,20,000. Payroll in house: 3 clerks at Rs 28,000 plus software Rs 16,000 = Rs 1,00,000 a month; vendor 400 workers at Rs 150 = Rs 60,000; saving Rs 40,000 a month, Rs 4,80,000 a year. All firms, buyers and prices imagined; simplified (no time value, no taxes).
16. Unsure or simplified: the cheque is treated as a payment mechanism for online business in general terms only; the delivery-stage list (packing, transport, tracking, receipt) is a common description rather than a defined sequence; digital certificates are said to come from a trusted body, with no mention of the licensing arrangements for certifying authorities.
