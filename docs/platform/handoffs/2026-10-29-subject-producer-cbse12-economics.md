# subject-producer — CBSE Class 12 Economics, ch01–ch13 hand-authored — 2026-10-29

Status: done. All 13 chapters of the 2026-27 syllabus (`platform/catalog/cbse/12/economics/syllabus.yaml`) are hand-authored, pass every gate and are committed (one commit per chapter).

Branch: `platform/subject-producer/cbse-12-economics`, based on `platform/main` 9f3ea8f. Hand-authored under D-025/D-026; every item has `status: "draft"`; family `economics-commerce`.

## What changed

New folders `platform/content/authored/economics-commerce/cbse-12-economics-chNN/` (NN = 01–13). Each holds `README.md`, `release.json`, `tests.json` and `src/` (`lib.mjs`, `questions.mjs`, `build.mjs`). These are the first chapters in the `economics-commerce` folder; the content gate, lint, verify and originality all pick the folder up without any config change.

- **Build:** run `npx tsx content/authored/economics-commerce/cbse-12-economics-chNN/src/build.mjs` from `platform/`. Edit `src/`, never the JSON.
- **What the build checks:** schema, pipeline lint (stage 4), deterministic verify (stage 5), word limits, narration rules, the answer-leak scan (DB-6 / API contract, per sentence), and editorial counts (≥ 60 questions, 20–40 cards, 12–25 slides, 3–5 checks, ≥ 2 examples, a visual at least every 3 slides).
- **Builds with errors** are parked as `*.wip.json`, so the tree-wide gates never see a half-built chapter. No `*.wip.json` file is committed.
- **Numbers:** every numerical is computed in `questions.mjs` and guarded by `assert`. This covers national income aggregates, the GDP deflator, money and credit multipliers, CRR/SLR, APC/MPC, equilibrium income and the multiplier, inflationary and deflationary gaps, revenue/fiscal/primary deficits, BoP balances and the market exchange rate.
- **`lib.mjs`:** adapted from `cbse-10-social-science-ch19/src/lib.mjs`, with an `Svg` builder (`chart()` maps data to pixels, so curves are drawn from their equations) and theme colours only. It is identical in all 13 chapters (md5 `82e954a5…`).
- **Rebuilding** all 13 chapters leaves the tree clean (checked before the final commit).

## Chapters

| Ch | Title | Decks (slides) | SVG figures | Notes sections | Cards | Questions | App.+ | Case-based |
|---|---|---|---|---|---|---|---|---|
| 01 | National Income and Related Aggregates | 20 + 16 | 2 | 6 | 31 | 78 | 56% | 3 |
| 02 | Money and Banking | 21 + 19 | 3 | 6 | 32 | 67 | 52% | 3 |
| 03 | Determination of Income and Employment | 22 + 18 | 7 | 6 | 32 | 70 | 56% | 3 |
| 04 | Government Budget and the Economy | 20 + 18 | 3 | 6 | 30 | 68 | 59% | 3 |
| 05 | Balance of Payments | 18 + 21 | 6 | 6 | 31 | 69 | 58% | 4 |
| 06 | Indian Economy on the Eve of Independence | 20 + 19 | 2 | 7 | 32 | 72 | 57% | 3 |
| 07 | Indian Economy 1950–1990 | 22 + 17 | 3 | 7 | 31 | 71 | 55% | 3 |
| 08 | LPG: An Appraisal | 22 + 20 | 3 | 6 | 32 | 78 | 56% | 3 |
| 09 | Human Capital Formation in India | 20 + 18 | 3 | 6 | 30 | 67 | 57% | 3 |
| 10 | Rural Development | 20 + 18 | 3 | 7 | 31 | 78 | 59% | 3 |
| 11 | Employment: Growth, Informalisation and Other Issues | 23 + 17 | 4 | 6 | 30 | 75 | 57% | 4 |
| 12 | Environment and Sustainable Development | 19 + 18 | 3 | 6 | 30 | 71 | 59% | 3 |
| 13 | Comparative Development Experiences of India and its Neighbours | 20 + 20 | 3 | 6 | 30 | 73 | 53% | 4 |
| **Total** | | **26 decks, 506 slides** | 44 on slides | 79 | 402 | **937** | | 40 |

"App.+" is the share of items at application or above. Every chapter is inside the lint band of 45–65%.

- **Slide rules:** every deck has a title slide with goals, 2–3 worked examples, 3–4 check slides pointing at objective items, a summary slide and an exam-tips slide. No run of more than 3 slides goes without a visual (tables, flows and theme-coloured SVG). Narration is at most 77 words per slide and uses no symbols.
- **Question types:** every chapter uses all of mcq, assertion-reason, true-false, fill-blank, match, ordering, numerical, short (2 and 3 marks), long (5 marks) and case-based. Case-based items have an internal choice in part (c).
- **Item fields:** every item has a marking scheme with step marks, topic ids from the syllabus, difficulty 1–4 (some d4 in every chapter) and a competency tag.
- **Tests:** two per chapter: `chapter-test-short` (20 marks, 40 min) on `cbse-12-default-chapter-test-short`, and `chapter-test-long` (40 marks, 90 min) on `cbse-12-default-chapter-test-long`. Each follows its blueprint item for item, including the internal-choice groups. Section D is case-based in both. The two tests are disjoint and use no deck-check item.

## How to verify (from `platform/`, all run under `_tools/heavy.sh`)

```
npm test -w @soyl/content-templates                                       # Test Files 1 passed; Tests 785 passed (785)
npm run content -- lint --exemplars                                       # cbse-12-economics-ch01..ch13: 0 error(s), 0 warning(s) each
npm run content -- verify --board cbse --class 12 --subject economics --authored   # 13 unit(s), 937 questions, 0 blocking flag(s); every unit 0 blocking + 0 minor
npm run content -- originality --authored                                 # see final run below
npx vitest run --root db test/db6-split.test.ts                           # 8 passed (8)
npx vitest run --root api test/content.test.ts                            # 13 passed (13)
```

**Final run, 20:06–20:08 IST, on the committed tree** (all 13 chapters, after the last edits):

| Gate | Result |
|---|---|
| Content gate | 785/785 passed |
| Lint | ch01–ch13 each 0 errors, 0 warnings |
| Verify | 13 units, 937 questions, 0 blocking + 0 minor flags |
| Originality | 112 units, **0 errors** |
| DB-6 split | 8/8 passed |
| API content test | 13/13 passed |

Rebuilding all 13 chapters afterwards prints NO ERRORS 13 times and leaves `git status` clean.

During the evening the originality gate found two exact-stem collisions (`bank.duplicate`) with CBSE 10 SST items: a generic match stem in ch05 and a generic "distinguish renewable and non-renewable" short in ch12. Both stems were reworded and the gate is now clean.

I also ran a script check on all 80 SVG specs: no label falls outside its viewBox and no two labels' estimated boxes overlap. To get there, the shared `chart()` now puts the x-axis title below the tick labels and drops the "O" when a tick sits at the origin.

## Scope decisions

- **Syllabus:** only topics in the syllabus are taught, and every topic id used exists in it. Poverty and Infrastructure (deleted) appear in no chapter. Plan and non-plan expenditure is not taught (ch04); the exam tips say it is no longer used. GVA at basic prices is not taught (ch01 uses market price and factor cost, as the syllabus does).
- **Data:** every table, economy, firm, village and source is imagined and labelled as such. There are no precise recent Indian statistics; no current repo rate, CRR, SLR, Union Budget, BoP, GDP or HDI figures. Real-world facts are limited to stable dates and institutions (listed below).
- **Neutral wording:** policy topics (subsidies, the public sector, protection, LPG appraisal, demonetisation, GST, China's and Pakistan's strategies) present arguments on both sides.
- **Originality:** no NCERT text, example or exercise, and no board or sample-paper question, is reused (D-036). Case passages are `soyl-original`.
- **Production method:** the chapters were written in parallel by forks of this producer, one chapter each, under one brief and one shared `lib.mjs`. Each build was then reviewed, gated and committed here. Spot checks of keys and solutions (ch01, ch03, ch08) found no errors.

## Facts a reviewer should double-check (details in each chapter README)

- **ch01**
  - Buying new shares is excluded from national income; the dividends earned later count as factor income, and a broker's commission is counted.
  - Gross capital formation is built as net fixed capital formation + change in stock + depreciation.
- **ch02**
  - M1 includes "other deposits with the RBI" as a small third part; the syllabus wording names only currency and net demand deposits.
  - The bank rate is described the textbook way. Its present alignment with the marginal standing facility rate is not mentioned.
  - Reverse repo is taught because the syllabus names it, although the RBI now uses a standing deposit facility as the floor of its corridor.
  - Dates: RBI set up in 1935, nationalised in 1949.
- **ch03**
  - The Monetary Policy Committee has set the repo rate since 2016.
  - Public borrowing is listed as a fiscal measure against excess demand.
- **ch04:** grants from the Centre to states are revenue expenditure. Dates: GST 2017, FRBM Act 2003. The financial year runs 1 April to 31 March.
- **ch05:** India moved in stages in the early 1990s to a market-determined, managed-floating rate. NRI deposits are classified as banking capital, and official reserve transactions as accommodating.
- **ch06**
  - Approximate figures:
    - about 85% of people depended on agriculture; the workforce was 70–75% in agriculture, about 10% in manufacturing and 15–20% in services
    - literacy under 16% (women about 7%); life expectancy about 32 years; infant mortality over 200 per thousand (one numerical uses 218)
  - Dates: 1853, 1869 (Suez Canal), 1881 (first census), 1907 (TISCO), 1921 (the great divide).
  - V. K. R. V. Rao's estimates are called the most significant.
- **ch07:** Planning Commission 1950, NITI Aayog 2015, IPR 1956, Karve Committee 1955. The Green Revolution came in two phases, from the mid-1960s. Kerala and West Bengal are named as the states where land reform succeeded more.
- **ch08**
  - The 1991 crisis: reserves covered about two weeks of imports, and India took IMF and World Bank loans.
  - Industrial licensing was kept for a short list of industries. WTO 1995 succeeded GATT (1948).
  - Demonetisation was announced on 8 November 2016; GST began on 1 July 2017. The 10% rate in items is labelled as imagined.
- **ch09:** Article 21A and the RTE Act 2009, including the 25% reservation in private unaided schools. The 6%-of-GDP goal comes from the Kothari Commission (1964–66) and NEP 2020. Literacy is "under one in five" in 1951 and "about three in four" in 2011.
- **ch10:** banks nationalised 1969, RRBs 1975, NABARD 1982, Operation Flood from 1970. Sikkim's 2016 organic status appears in the notes only and no question tests it.
- **ch11:** the formal sector is defined as all public-sector units plus private establishments with 10 or more hired workers. MGNREGA 2005 is described as the syllabus names it. The December 2025 replacement law that CBSE 10 SST ch19 mentions as a dated update is **not** mentioned here; the Lead may want the same dated note.
- **ch12:** Montreal 1987, Kyoto 1997, Paris 2015, Brundtland 1987 (paraphrased) and the CPCB in 1974 (notes only).
- **ch13**
  - Dates: first plans in 1951 (India), 1953 (China) and 1956 (Pakistan, following the textbook; the plan period is often given as 1955–60). Great Leap Forward 1958, Cultural Revolution 1966–76, reforms in 1978, 1988 and 1991, one-child policy from about 1979.
  - The famine after the Great Leap Forward is worded as "linked to drought and to the campaign's own policies".

## Known gaps / follow-ups

- **SVG labels have not been seen rendered.** They are positioned by computed coordinates and pass the overflow and overlap script, but they should be eyeballed at 360 px on staging, in light and dark mode. The crowded ones are the ch13 timeline and the ch03 AD–AS and gap figures.
- **No audio.** Narration is text only; TTS runs at release.
- **No frozen test series** (unit tests and mocks) for CBSE 12 Economics; that is assessment-designer's step (`assemble --series`).
- **Human review.** Items are `draft`; the content-verifier sample (≥ 5% per unit) has not been done.

Decisions made: none beyond this note (no ADR; no shared file touched).
Needs from owner: none.
