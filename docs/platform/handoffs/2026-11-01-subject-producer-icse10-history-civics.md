# subject-producer — ICSE Class 10 History & Civics, ch01–ch18 hand-authored — 2026-11-01

Status: done. All 18 chapters of `platform/catalog/cisce/icse-10/history-civics/syllabus.yaml` (ICSE 2027, Class X, H.C.G. Paper 1) are hand-authored, pass every gate and are committed, one commit per chapter.

Branch: `platform/subject-producer/icse-10-history-civics`, created from `platform/main` 408b72d. Hand-authored under D-025/D-026; every item has `status: "draft"`; family folder `social-science`.

**Writer model:** every chapter (ch01–ch18) was written by an **Opus** chapter sub-agent (a fork of the producer), with at most two at a time. All chapters were finished before the owner's 22:10 IST instruction to use Sonnet writers, so no Sonnet writer was used for this subject.

Session limits cut work off at about 08:00, 13:30 and 18:00 IST. Each chapter was committed only after a fully green gate run that started after its last file change.

## Pattern and scope

- **Specimen:** the ICSE 2027 History & Civics specimen (501), entry `icse-2027-specimen-501-history-civics` in `sources/cisce.md`, re-read on 1 November for pattern only. Part I has 1-mark objective items including assertion-reason, then 2-mark short answers. Part II has 10-mark questions set in 3 + 3 + 4 parts.
- **Assertion-reason options:** ICSE's order differs from CBSE's and ISC's:
  - (a) A true, R false
  - (b) A false, R true
  - (c) both true, R explains A
  - (d) both true, R does not explain A

  The shared lib's `ar()` therefore takes a semantic `verdict` instead of a letter, so no key can be mis-lettered.
- **Tests:** the subject's own blueprints.
  - `icse-10-history-civics-chapter-test-short`, 20 marks in 30 minutes. Part I has 5 MCQs, 1 assertion-reason item and 2 two-mark questions; Part II is one of two 10-mark questions.
  - `icse-10-history-civics-chapter-test-long`, 40 marks in 60 minutes. Part I has 9 MCQs, 1 assertion-reason item and 5 two-mark questions; Part II is two of three 10-mark questions.
  - The two tests are disjoint and use no deck-check items.
- **Removed topics honoured:**
  - ch07 sets no question on the events of 1857, which are an outline for continuity only; only the listed consequences are tested.
  - ch11 tests no Simon Commission or Cripps clauses.
  - ch13 tests only the Cabinet Mission and Independence Act clauses.
  - ch16 teaches NATO and the Warsaw Pact as meaning only.
  - ch17 gives UN agencies' headquarters and functions only, and the UDHR as meaning only.
  - ch18 lists the Panchsheel principles for understanding only, with no question requiring them.
- **Care standard:**
  - **Wording:** neutral and factual on parties, leaders and communities. Partition, Jallianwala Bagh, the 1857 consequences and the Holocaust are described humanely, with no blame of communities and no casualty figures beyond "estimates vary widely".
  - **Sources:** no reproduced textbook text, speeches, proclamations, treaty or Charter text. Ideas are paraphrased and attributed (D-036). Every source item is an imagined SOYL document labelled as such.
  - **Pictures:** picture items use our own SVGs (organisation charts, timelines, schematic sketches captioned "schematic, not to scale"). There are no photographs or cartoons.
  - **Constitutional figures:** stated as per the current Constitution, with dated notes. Examples: the Lok Sabha maximum of 550 since the Anglo-Indian seats lapsed in January 2020 (104th Amendment); Rajya Sabha strength 245 and Supreme Court strength 34, both "as of 2024"; UN membership 193 "as of 2024".
  - **People:** no current office-holders are named.
- **Brief correction:** the ch01 writer found that the brief's "Lok Sabha maximum 552 (530 + 20)" did not add up. The chapter teaches 550, and mentions 552 only as the pre-2020 figure, with a dated note.
- **Stems:** every stem is content-specific. Each chapter passed the build-time exact-stem originality check and a 5-gram near-duplicate scan (the gate's rule) against about 24,000–25,000 stems. That includes CBSE 12 Political Science and CBSE 10 Social Science.

## Build

- **Shared lib:** `icse-10-history-civics-ch01/src/lib.mjs`, imported by every chapter. It is a copy of the ISC 12 Economics lib with ICSE assertion-reason options and `verdict`.
- **Build command:** run `npx tsx content/authored/social-science/icse-10-history-civics-chNN/src/build.mjs` from `platform/`. Edit `src/`, never the JSON.

## Chapters

| Ch | Title | Commit | Writer | Decks | Cards | Questions (marks) | 10-mark | Source items | App.+ |
|---|---|---|---|---|---|---|---|---|---|
| 01 | The Union Parliament: Lok Sabha, Rajya Sabha and the Speaker | 08f9747 | Opus | 18 + 15 | 30 | 73 (171) | 7 | 3 | 47% |
| 02 | Parliamentary Procedures and Powers of Parliament | d0cb869 | Opus | 19 + 18 | 30 | 71 (176) | 8 | 3 | 51% |
| 03 | The President and the Vice-President | eff67b8 | Opus | 20 + 18 | 30 | 77 (172) | 7 | 3 | 49% |
| 04 | The Prime Minister and the Council of Ministers | 0a3ca21 | Opus | 18 + 18 | 30 | 70 (173) | 8 | 3 | 54% |
| 05 | The Supreme Court | da87983 | Opus | 16 + 17 | 30 | 79 (177) | 7 | 3 | 52% |
| 06 | The High Courts and Subordinate Courts | f274400 | Opus | 20 + 16 | 32 | 73 (168) | 7 | 3 | 52% |
| 07 | The First War of Independence, 1857 | f52ba94 | Opus | 18 + 16 | 30 | 79 (176) | 7 | 3 | 51% |
| 08 | Growth of Nationalism and the Indian National Congress | b0eadd5 | Opus | 18 + 17 | 30 | 87 (190) | 8 | 3 | 51% |
| 09 | Early Nationalists and Assertive Nationalists (1885–1916) | d737239 | Opus | 16 + 17 | 30 | 93 (201) | 8 | 3 | 47% |
| 10 | The Muslim League and the Lucknow Pact | abadd21 | Opus | 17 + 16 | 30 | 77 (179) | 8 | 3 | 47% |
| 11 | Mahatma Gandhi and the Mass Movements | e6fc48c | Opus | 18 + 19 | 30 | 80 (193) | 9 | 3 | 50% |
| 12 | Subhas Chandra Bose, the Forward Bloc and the INA | 5b638ee | Opus | 17 + 18 | 30 | 80 (172) | 7 | 3 | 50% |
| 13 | Independence and Partition of India | b7419e6 | Opus | 17 + 18 | 30 | 80 (174) | 7 | 3 | 49% |
| 14 | The First World War | 725b7fd | Opus | 17 + 17 | 30 | 88 (191) | 8 | 3 | 47% |
| 15 | Rise of Dictatorships | d5d3356 | Opus | 17 + 18 | 30 | 80 (171) | 7 | 3 | 50% |
| 16 | The Second World War and the Cold War | 6028e41 | Opus | 16 + 16 | 30 | 87 (189) | 8 | 3 | 51% |
| 17 | The United Nations | a3c6542 | Opus | 18 + 16 | 30 | 80 (176) | 7 | 3 | 49% |
| 18 | The Non-Aligned Movement | 18f5a10 | Opus | 17 + 15 | 30 | 78 (181) | 8 | 3 | 51% |
| **Total** | | | | **36 decks, 622 slides** | 542 | **1,432** | | | |

"App.+" is the share of items at application or above. Every chapter is inside the lint band of 45–65%. Where a first draft fell below it, the writers mostly added genuine scenario items rather than retagging. The exception is ch08, which retagged ten "why" and "how" stems as analysis.

Every chapter has 6 notes sections, 2 worked examples per deck (for example planning a 3 + 3 + 4 answer) and 3–4 check slides per deck.

## Gates (from `platform/`, under `_tools/heavy.sh`)

`npm run content -- catalog`; `npm test -w @soyl/content-templates`; `npm run content -- lint --exemplars`; `npm run content -- verify --board cisce --class 10 --subject history-civics --authored`; `npm run content -- originality --authored`; `npx vitest run --root db test/db6-split.test.ts`; `npx vitest run --root api test/content.test.ts`.

| Run (IST, 1 Nov) | Chapters committed after it | Content gate | Catalog | Lint | Verify (0 blocking, 0 minor) | Originality | DB-6 | API |
|---|---|---|---|---|---|---|---|---|
| 07:42 | ch01–ch02 | 2311/2311 | 0 errors | 0/0 | 2 units | 330 units, 0 errors | 8/8 | 13/13 |
| 12:17 | ch03–ch04 | 2325/2325 | 0 errors | 0/0 | 4 units | 332, 0 errors | 8/8 | 13/13 |
| 12:32 | ch05–ch06 | 2339/2339 | 0 errors | 0/0 | 6 units | 334, 0 errors | 8/8 | 13/13 |
| 12:52 | ch07–ch10 | 2367/2367 | 0 errors | 0/0 | 10 units | 338, 0 errors | 8/8 | 13/13 |
| 17:15 | ch11–ch12 | 2381/2381 | 0 errors | 0/0 | 12 units | 340, 0 errors | 8/8 | 13/13 |
| 17:27 | ch13–ch14 | 2395/2395 | 0 errors | 0/0 | 14 units | 342, 0 errors | 8/8 | 13/13 |
| 17:45 | ch15–ch16 | 2409/2409 | 0 errors | 0/0 | 16 units | 344, 0 errors | 8/8 | 13/13 |
| 22:05 | ch17–ch18 | 2423/2423 | 0 errors | 0/0 | 18 units, 1,432 questions | 346, 0 errors | 8/8 | 13/13 |

"Lint 0/0" means 0 errors and 0 warnings in every chapter.

## Facts a reviewer should check (full dated lists in each chapter README)

- **ch01:**
  - Lok Sabha maximum 550, 543 elected.
  - Rajya Sabha maximum 250 (238 + 12), 245 "as of 2024".
  - Age 25 for the Lok Sabha and 30 for the Rajya Sabha; Speaker removal procedure.
  - The 2023 women's reservation amendment is omitted.
- **ch02:**
  - Sessions and quorum rules.
  - Adjournment and no-confidence motions need 50 members.
  - Tenth Schedule (1985), with the 91st Amendment (2003) removing the split exception.
  - A Money Bill can be held for 14 days.
  - Articles 249 and 312.
- **ch03:** Electoral College under Article 54 (70th Amendment); impeachment under Article 61; Articles 123, 72 and 74; emergencies under Articles 352, 356 and 360, with "armed rebellion" since 1978.
- **ch04:** Articles 74, 75, 75(1A) (the 15 per cent cap, 91st Amendment) and 78. The claim that "Cabinet" appears in the Constitution only in Article 352 needs checking.
- **ch05:** Supreme Court strength 34 "as of 2024"; NJAC struck down in 2015; removal procedure; Articles 32, 131, 136, 137, 141 and 143.
- **ch06:** High Court qualifications and retirement at 62; Articles 226, 227 and 215; Lok Adalats under the 1987 Act. A dated note says the BNSS 2023 has applied from 1 July 2024; it is not tested.
- **ch07:** Doctrine of Lapse states (Satara 1848, Jhansi 1853, Nagpur 1854); Awadh 1856; the 1858 Act; the Queen's Proclamation of 1 November 1858, paraphrased.
- **ch08–ch10:**
  - Indian National Congress founded 28 December 1885 at Bombay; Bonnerjee and Naoroji presided over the first two sessions.
  - Partition of Bengal in effect 16 October 1905 and annulled in 1911; Surat 1907.
  - Muslim League founded 30 December 1906 at Dacca; Lucknow Pact December 1916.
- **ch11:**
  - Jallianwala Bagh 13 April 1919, with no casualty figure.
  - Chauri Chaura 5 February 1922 ("commonly given as 22").
  - Dandi March from 12 March to 6 April 1930.
  - Gandhi–Irwin Pact 5 March 1931.
  - Quit India 8 August 1942.
- **ch12:** Tripuri 1939; Forward Bloc May 1939; Azad Hind proclaimed 21 October 1943; Bose's death worded as "reported, with several inquiries".
- **ch13:** Cabinet Mission plan 16 May 1946; Direct Action Day 16 August 1946; Attlee's statement 20 February 1947; Mountbatten Plan 3 June 1947; Indian Independence Act with assent on 18 July 1947.
- **ch14–ch16:**
  - Sarajevo 28 June 1914; Versailles 28 June 1919; League of Nations at Geneva in 1920.
  - March on Rome 1922; Hitler made Chancellor on 30 January 1933.
  - Munich September 1938; Nazi-Soviet Pact 23 August 1939; invasion of Poland 1 September 1939.
  - Pearl Harbour 7 December 1941; Hiroshima 6 August and Nagasaki 9 August 1945.
  - NATO 1949 and the Warsaw Pact 1955.
- **ch17:**
  - UN Charter signed 26 June 1945; UN Day 24 October 1945; 193 members "as of 2024".
  - Security Council voting rules; ICJ composition.
  - Agencies: UNICEF in New York, WHO in Geneva, UNESCO in Paris.
  - UDHR adopted 10 December 1948.
- **ch18:** Panchsheel 29 April 1954; Bandung April 1955; Belgrade September 1961; the five architects; "about 120 members, as of 2024", in the notes only.

## Known gaps / follow-ups

- **Rendering:** nobody has seen the SVG labels rendered at 360 px, in light and dark mode, on staging. The timelines are the densest.
- **Difficulty:** ch09 and ch18 lean easy (many d1 items).
- **Content:** items are `draft`. The content-verifier sample has not been done. There is no frozen test series yet.

Decisions made: none beyond this note (no ADR; no shared file touched).
Needs from owner: none.
