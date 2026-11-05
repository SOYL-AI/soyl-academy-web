# CBSE Class 11 Business Studies, Chapter 6: Social Responsibility of Business and Business Ethics

`cbse-11-business-studies-ch06` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human` · every item `status: "draft"`

Hand-authored to the CBSE 11 Business Studies standard (D-025, D-026, D-036). Build from `platform/`:
`npx tsx content/authored/economics-commerce/cbse-11-business-studies-ch06/src/build.mjs`. The build checks the schema, pipeline lint, deterministic verify, word limits, narration rules, the answer-leak scan, the exact-stem originality pre-check and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON. The shared library is `../cbse-11-business-studies-ch01/src/lib.mjs` (imported, never edited).

| File | What |
|---|---|
| `release.json` | 2 decks (20 + 22 slides), notes (7 sections), 30 flashcards, 79 questions |
| `tests.json` | `t_cbse11businessstudies_ch06_short` (20 marks, 40 min) and `_long` (40 marks, 90 min) on `cbse-11-default-chapter-test-short` / `-long`, disjoint, no deck-check item |
| `src/` | `questions.mjs`, `build.mjs` |

## Scope

| Topic | Coverage |
|---|---|
| t01 | Concept of social responsibility and its difference from legal responsibility; the case for (eight arguments) and against (four arguments), each presented as a view held by some people; the four kinds; seven factors behind the acceptance of social obligations; the corporate social responsibility rule of section 135, Companies Act 2013 (as of 2024) |
| t02 | Responsibility towards owners and shareholders, workers, consumers, government and community; pollution (meaning, four kinds, causes in industry, need for control); the role of business in pollution control (seven steps) |
| t03 | Business ethics (concept, five elements) and its link with social responsibility |

Decks: Part 1 (concept, case, kinds, factors, the law; 4 checks, 3 worked examples: naming the argument, classifying the kind, the least CSR spend) and Part 2 (stakeholders, pollution, role of business, ethics; 4 checks, 3 worked examples: the duty neglected, the saving from recycling water, measuring results). SVGs: case-for-and-against chart, kinds-of-responsibility chart, stakeholders web, pollution-control role flow, elements-of-ethics flow. No maps.

Questions: 31 mcq, 6 assertion-reason, 5 true-false, 3 fill-blank, 2 match, 2 ordering, 11 short 2-mark, 8 short 3-mark, 6 long 5-mark, 5 case-based (all on imagined firms). Application or above: 65%.

Tests: short = 3 mcq + 1 ar / 2-mark x2 + 3-mark / one of two long / `cb_byteloom`. Long = 8 mcq + 2 ar / two 2-mark, one of two 2-mark, 3-mark, one of two 3-mark / long + one of two long / `cb_rangrez` + `cb_csr`.

Every firm, factory, river, town, dairy and person is imagined (Rangrez Dyeworks, Neel Dyes, Surya Steel Works, Prithvi Cements, Dhara Foods, Amrit Dugdh, Byteloom Software, Vistara Logistics and others). No real company is named and no claim is made about any real firm. The arguments for and against social responsibility are stated as views ("some argue ... others argue").

## How verified

Build prints `NO ERRORS` with `lint: 0 error(s), 0 warning(s)`; `release.json` and `tests.json` are byte-identical across three builds (no `*.wip.json` left); `checks.mjs` reports 0 near-duplicate flags (79 stems against 40,652 others) and 0 SVG issues. No tree-wide gates, git or e2e were run.

## Facts for a reviewer

Time-sensitive points are "as of 2024" in the content and should be re-checked.

1. Social responsibility: the obligation of business to take decisions and actions that are desirable in terms of the objectives and values of society. Legal responsibility: the duty to comply with the law; social responsibility goes beyond it.
2. Case for (eight): justification for existence and growth of business; long-term interest of the firm; avoidance of government regulation; maintenance of society; availability of resources with business; converting problems into opportunities; a better environment for doing business; holding business responsible for social problems it has caused.
3. Case against (four): violation of the profit-maximisation objective; burden on consumers through higher prices; lack of social skills; lack of broad public support. Both lists are worded as views of some people.
4. Kinds: economic, legal, ethical (including moral) and discretionary (voluntary).
5. Factors behind the acceptance of social obligations (seven): threat of public regulation; pressure of the labour movement; impact of consumer consciousness; development of social standards; development of business education; relationship between social interest and business interest; development of a professional managerial class.
6. Dated, as of 2024: section 135 of the Companies Act 2013. A company with a net worth of Rs 500 crore or more, or a turnover of Rs 1,000 crore or more, or a net profit of Rs 5 crore or more must spend at least 2 per cent of its average net profits of the three preceding years on CSR activities. Reviewer: confirm the three limits, the "or" between them, the 2 per cent and the three-year average; the content does not mention the CSR committee, the carry-forward of unspent amounts, the definition of net profit under the Act, the "immediately preceding financial year" wording of the test, or any later amendment, and says that limits can change by amendment.
7. Stakeholder duties: owners and shareholders (fair return, safety of the investment, true information); workers (fair wages, good working conditions, right to form unions); consumers (quality goods at fair prices, no adulteration or misleading advertising, grievance handling); government and community (obeying laws, paying taxes honestly, protecting the environment, community welfare).
8. Pollution: the release of harmful or unwanted substances or energy into the surroundings, making them less safe or fit for life (own wording). Four kinds: air, water, land and noise.
9. Causes of industrial pollution (own general list, not a quoted textbook list): smoke and gases from furnaces and boilers; untreated effluent; dumped solid and chemical waste; loud machines; out-of-date technology and no waste treatment to save cost; weak checks and low concern. Reviewer: confirm the list is acceptable as a general account.
10. Need for pollution control (five): reduced health hazards; reduced risk of liability; cost savings; improved public image; other social benefits.
11. Role of business in pollution control (seven): top management commitment; commitment throughout the enterprise; clear policies and programmes; compliance with laws; participation in government programmes; periodic assessment; educating dealers and suppliers.
12. Business ethics: the socially determined moral principles that should govern business activities. Elements (five): top management commitment; publication of a code of conduct; establishment of compliance mechanisms; involving employees at all levels; measuring results.
13. The statement that "law is enforced by the state; ethics are the standards of right conduct that society holds", and the link "ethics supply the moral base of social responsibility; social responsibility puts the principles into action", are the chapter's own explanation of the relation, not a quoted definition.
14. Computed figures (code): Surya Steel Works profits Rs 60, 75, 90 crore, average Rs 75 crore, 2 per cent = Rs 1.5 crore (Rs 150 lakh); Prithvi Cements profits Rs 30, 45, 60 crore, average Rs 45 crore, 2 per cent = Rs 0.9 crore (Rs 90 lakh); Dhara Foods (net worth Rs 150 crore, turnover Rs 600 crore, net profit Rs 4 crore) is below all three limits; Rangrez Dyeworks recycles 60 per cent of 50,000 litres = 30,000 litres a day at Rs 40 per 1,000 litres = Rs 1,200 a day, Rs 3,60,000 over 300 days, plant Rs 9,00,000 repaid in 2.5 years; Neel Dyes 50 per cent of 20,000 litres = 10,000 litres at Rs 50 per 1,000 litres = Rs 500 a day, Rs 1,50,000 a year, plant Rs 3,00,000 repaid in 2 years; Amrit Dugdh 4,000 litres a day, price Rs 32 to Rs 38, Rs 24,000 a day, Rs 7,20,000 in 30 days; Byteloom Software 180 of 240 trained = 75 per cent, 90 per cent needs 216, so 36 more; Vistara Logistics 34 of 40 settled = 85 per cent, 90 per cent needs 36, so 2 more. All firms and figures are imagined and simplified.
15. Unsure or simplified: the section 135 coverage test is described as three alternative limits without the "immediately preceding financial year" wording; the "average net profits" are not defined by reference to the Act's own method of computing net profit; the account of causes of industrial pollution (item 9) is general; the labels for the factor list (item 5) follow the usual textbook headings in own words.
