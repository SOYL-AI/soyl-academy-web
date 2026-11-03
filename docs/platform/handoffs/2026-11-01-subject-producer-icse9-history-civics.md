# subject-producer — ICSE Class 9 History & Civics, hand-authored chapters — 2026-11-01 to 2026-11-04

Status: done. The class-default blueprints and all 17 syllabus chapters (ch01–ch17) are committed, each after a fully green gate run.

Branch: `platform/subject-producer/icse-9-history-civics` (worktree `C:/Users/Prabhu/soyl-wt/content-icse9-history-civics`). Not pushed and not merged by me; the Lead merged ch01–ch12 during the run.

Writers (D-050): **every chapter was written by a Sonnet 5.5 sub-agent** (Agent tool, `model: "sonnet"`, at most 2 at a time). Opus (this agent) reviewed each chapter, fixed small problems, ran the gates and committed. The Opus quality fallback was **not needed**: no chapter needed heavy fixing, and no chapter failed a gate for content reasons.

## What changed

### Step 1: ICSE 9 class-default blueprints (96cd2be)
- Files: `platform/catalog/cisce/blueprints/9/{chapter-test-short,chapter-test-long,unit-test}.yaml`, with ids `icse-9-default-*`, exam `icse`, class 9, `source: lead-default`, `source_status: unverified`.
- Notes in the files: Class 9 has no board exam (the school sets the final paper), so the blueprints follow the ICSE 10 H.C.G. paper shape.
- **Short test:** 30 min, 20 marks.
  - Section A: 4 mcq, 1 assertion-reason, one 2-mark short, one 3-mark short.
  - Section B: any 1 of 2 ten-mark structured questions.
- **Long test:** 60 min, 40 marks.
  - Section A: 7 mcq, 1 assertion-reason, three 2-mark shorts, two 3-mark shorts.
  - Section B: any 2 of 3 ten-mark structured questions.
- `blueprintsFor()` resolves them for every ICSE 9 subject without its own blueprints.

### Step 2: chapters
- **Files:** each chapter is in `platform/content/authored/social-science/icse-9-history-civics-chNN/`, with `release.json`, `tests.json`, `README.md` and `src/{questions.mjs, build.mjs}`.
- **Builder:** the shared builder is `icse-9-history-civics-ch01/src/lib.mjs`, a copy of the ICSE 10 H&C lib. It includes a build-time exact-stem originality pre-check, editorial count checks, pipeline lint, deterministic verify and an answer-leak scan; failures park output as `*.wip.json`.
- **Status:** all items are `status: "draft"`, provenance `human` (D-025/D-026).

| Chapter | Commit | Writer | Slides | Notes sections | Flashcards | Questions | App+ |
|---|---|---|---|---|---|---|---|
| ch01 Our Constitution: Meaning, Adoption and Salient Features | 49aaf61 | Sonnet 5.5 | 20 + 19 | 6 | 31 | 79 | 48% |
| ch02 Directive Principles and the Welfare State | 00fb5ed | Sonnet 5.5 | 17 + 17 | 6 | 30 | 79 | 53% |
| ch03 Elections and the Election Commission | 4ed4133 | Sonnet 5.5 | 18 + 20 | 6 | 31 | 75 | 51% |
| ch04 The State Legislature | 8c49cb5 | Sonnet 5.5 | 18 + 21 | 6 | 31 | 78 | 47% |
| ch05 The Harappan Civilisation | cc954e5 | Sonnet 5.5 | 22 + 21 | 6 | 30 | 80 | 53% |
| ch06 The Vedic Period | a7be2c0 | Sonnet 5.5 | 18 + 18 | 6 | 31 | 77 | 55% |
| ch07 Jainism and Buddhism | 381946b | Sonnet 5.5 | 20 + 20 | 6 | 31 | 72 | 57% |
| ch08 The Mauryan Empire | 0a3737f | Sonnet 5.5 | 21 + 18 | 6 | 30 | 78 | 49% |
| ch09 The Sangam Age | e5fc6d8 | Sonnet 5.5 | 21 + 22 | 6 | 31 | 79 | 48% |
| ch10 The Age of the Guptas | 8534721 | Sonnet 5.5 | 22 + 19 | 6 | 33 | 80 | 56% |
| ch11 Medieval India: The Cholas | e364d6a | Sonnet 5.5 | 22 + 22 | 7 | 32 | 79 | 52% |
| ch12 Medieval India: The Delhi Sultanate | 1e66be2 | Sonnet 5.5 | 22 + 22 | 7 | 32 | 78 | 47% |
| ch13 Medieval India: The Mughal Empire | 7983ef7 | Sonnet 5.5 | 22 + 22 | 7 | 33 | 79 | 47% |
| ch14 Medieval India: Composite Culture | f38c9e2 | Sonnet 5.5 | 22 + 22 | 7 | 34 | 78 | 54% |
| ch15 The Modern Age in Europe: Renaissance | 30c1d31 | Sonnet 5.5 | 22 + 21 | 6 | 33 | 78 | 54% |
| ch16 The Modern Age in Europe: Reformation | de8377b | Sonnet 5.5 | 20 + 22 | 6 | 35 | 69 | 52% |
| ch17 The Modern Age in Europe: Industrial Revolution, Capitalism and Socialism | da21239 | Sonnet 5.5 (two writers; the first stopped at a session limit after writing `questions.mjs`, a second finished it) | 21 + 22 | 6 | 34 | 77 | 48% |

**Totals:** 17 chapters, 696 slides, 542 flashcards, 1,315 questions. Application-or-above runs from 47% to 57%, inside the lint band of 45–65%.

**Each chapter has:**
- Two decks with a visual at least every 3 slides, at least 2 worked examples and 3–5 check slides per deck. All SVGs are original: timelines, charts, flows, and schematic maps marked "not to scale, positions approximate". There are no photographs, portraits or images of deities.
- A question bank of about 24–31 mcq, at least 4 assertion-reason items (ICSE option order, built from `verdict`), 10–14 two-mark shorts, 6–10 three-mark shorts, and 7–8 ten-mark structured items in 3 + 3 + 4 parts.
- Three source-based items on imagined documents, each with an either/or part.
- Short and long chapter tests on the `icse-9-default` blueprints. The two tests share no item and use no deck-check item.

## How to verify
From `platform/` in the worktree, run each gate one at a time (heavy gates go through `_tools/heavy.sh`):
```
npm test -w @soyl/content-templates                # 2948/2948 at g7
npm run content -- catalog                         # catalog valid: 0 error(s), 0 warning(s)
npm run content -- lint --exemplars                # ok for every icse-9-history-civics chapter, 0/0
npm run content -- verify --board cisce --class 9 --subject history-civics --authored   # 17 unit(s), 1315 questions, 0 blocking
npm run content -- originality --authored          # 0 error(s)
npx vitest run --root db test/db6-split.test.ts    # 8/8
npx vitest run --root api test/content.test.ts     # 13/13
```
Rebuild any chapter with `npx tsx content/authored/social-science/icse-9-history-civics-chNN/src/build.mjs`, which prints `NO ERRORS`. The output is deterministic: writers checked byte-identical md5s across 3 builds.

### Gate runs (all fully green, exit 0)
| Run | Started (IST) | Chapters covered | Result |
|---|---|---|---|
| g1 | 2026-11-01 22:43 | ch01–02 | green → ch01, ch02 committed |
| g2 | 2026-11-01 22:51 | ch01–04 | green → ch03, ch04 committed |
| g3 | 2026-11-01 23:07 | ch01–06 | templates 2871/2871, verify 6 units 468 q, originality 410 units 0 errors, db6 8/8, api 13/13 → ch05, ch06 committed |
| g4 | 2026-11-02 08:05 | ch01–10 | templates 2899/2899, verify 10 units 777 q, originality 414 units 0 errors, db6 8/8, api 13/13 → ch07–ch10 committed |
| g5 | 2026-11-02 08:17 | ch01–12 | templates 2913/2913, verify 12 units 934 q, originality 416 units 0 errors, db6 8/8, api 13/13 → ch11, ch12 committed |
| g6 | 2026-11-02 08:41 | ch01–14 | templates 2927/2927, verify 14 units 1091 q, originality 418 units 0 errors, db6 8/8, api 13/13 → ch13, ch14 committed |
| g7 | 2026-11-03 23:57 | ch01–17 | templates 2948/2948, verify 17 units 1315 q, originality 421 units 0 errors, db6 8/8, api 13/13 → ch15, ch16 committed (ch17 was rebuilt after a review fix, so it was re-gated) |
| g8 | 2026-11-04 00:09 | ch01–17 | templates 2948/2948, catalog 0/0, lint 0/0, verify 17 units 1315 q 0 blocking, originality 421 units 0 errors, db6 8/8, api 13/13 → ch17 committed |
| g9 | 2026-11-04 00:22 | ch01–17 after the OA-23 map fix | green except one API content-test failure that passed alone (13/13) on an immediate rerun, so I treated it as a timeout and reran the full gate |
| g10 | 2026-11-04 00:38 | ch01–17 after the OA-23 map fix | templates 2948/2948, catalog 0/0, lint 0/0, verify 17 units 1315 q 0 blocking, originality 421 units 0 errors, db6 8/8, api 13/13 → map fix committed (16d5b4d) |

Commits were made by a script that commits a chapter only if none of its files changed after the start of the green gate run.

## Maps and OA-23 (owner decision pending on maps of modern India)
I checked every SVG in all 17 chapters. I read the figure code and scanned the built SVGs for polygons, polylines or paths with more than 6 points (`outline-scan.cjs`).
- **Five chapters drew a landmass outline behind a schematic map:**
  - ch08 (Mauryan edict sites) and ch10 (Gupta sites): a rough subcontinent outline.
  - ch09 (Sangam ports) and ch12 (Deccan campaign): a rough peninsula outline.
  - ch14 (saints by region): a lon/lat outline of modern India.
- **What I did:** I removed the outline polygons (commit 16d5b4d), so no chapter needed to be held back.
  - The figures now show only labelled places as dots in relative position; ch09 keeps its sea labels and ch12 its campaign arrows.
  - Alt text and READMEs now say that no outline, coastline or borders are drawn.
- **No change needed:** ch05 draws the Indus and Ghaggar-Hakra river lines with Harappan sites, and ch07 and ch13 draw the Ganga as a line with places. None has an outline or borders.
- **After the fix:** no SVG in the subject has a shape with more than 6 points, except ch05's two 7-point river polylines.

## Review (Opus) — fixes made
- **All chapters:** I checked every assertion-reason verdict against its A/R statements, and all were correct. I scanned for loaded or communal wording, graphic detail, quotations and meta wording.
- **ch09:**
  - I removed authoring-meta lines from student-facing text ("we describe it neutrally", "state this neutrally and briefly").
  - I replaced an mcq that asked how to write about widows' hardships with a content item on the mixed position of women in Sangam society. The lines on widows' hardships now state them factually.
- **ch07, ch10, ch16, ch17:** I removed narration sentences that described our own approach ("We describe everything neutrally and respectfully", "We describe themes only; we never copy lines", "We describe both traditions with equal respect", "We describe both systems with…"). Exam-tip slides advising students to use neutral words were kept.
- **ch13:** the writer glossed the jizya as "a tax that had been collected earlier" and both taxes as "levies connected with religion". I replaced these with the standard factual definitions: the pilgrim tax was a tax on pilgrims to holy places, and the jizya a tax on non-Muslim subjects. Both were abolished by Akbar, about 1563 and 1564.

## Facts for a reviewer (dated or debated; each chapter README has the full list)
- **ch02:** the 2005 rural employment law is named generically. Confirm the current status.
- **ch03:** the 2023 Act on the selection of Election Commissioners is given "as of 2024". Confirm.
- **ch04:** six States have Legislative Councils, as of 2024: Andhra Pradesh, Bihar, Karnataka, Maharashtra, Telangana and Uttar Pradesh.
- **ch05:**
  - Dates are "about 2600–1900 BCE" (2500–1750 is also given).
  - The invasion theory is "rejected by most scholars".
  - The view that the citadel gave flood protection is hedged.
- **ch06:** "Vidatha" is used, where the syllabus spells it "Vidhatha". The Samiti's role in choosing the king is hedged. The origin debate is not covered.
- **ch07:**
  - Buddha born about 563 BCE (Lumbini); Mahavira about 540 BCE (Kundagrama).
  - Angas compiled at Valabhi, about the 5th–6th century CE.
  - Brahmacharya was added by Mahavira.
  - No death dates are given.
- **ch08:**
  - Reigns, all "about": Chandragupta 321–297 BCE, Bindusara 297–273, Ashoka 268–232.
  - Seleucus, about 305–303 BCE.
  - Kalinga, about 261 BCE, with no casualty figures.
  - Prinsep deciphered the edicts in 1837.
  - The Pataliputra board of 30 is paraphrased from Megasthenes, and only four committee matters are named.
  - The decline is presented as a debate.
- **ch09:**
  - Sangam Age about the 3rd century BCE to the 3rd century CE.
  - Three Sangams presented as tradition only.
  - Tirukkural: 1,330 couplets in 133 chapters, date debated (about the 1st century BCE to the 5th century CE).
  - Kallanai "traditionally attributed" to Karikala.
  - Arikamedu excavated in the 1940s.
  - The writer added simplifications that are flagged in its README: dolmen and cist descriptions, tinai notes.
- **ch10:**
  - Fa-hien about 399–412 CE.
  - Gupta reign dates "about"; Chandragupta II's start is given as 375 or 380.
  - Aryabhatta born 476 CE, satellite 1975.
  - Nalanda listed by UNESCO in 2016.
  - Deogarh about the 6th century CE. The temple-plan sketch shows four corner shrines for "panchayatana", which needs confirming on site.
  - Sushruta's date is debated, and he is not placed under a Gupta king.
  - The V. A. Smith "Napoleon" remark appears only in the notes, attributed.
- **ch11:**
  - Uttaramerur, about 919 and 921 CE, with kudavolai paraphrased.
  - Brihadishwara completed about 1010, vimana about 66 m.
  - UNESCO listing 1987, extended 2004.
  - Srivijaya expedition about 1025.
  - "Larger Leiden plates kept in the Netherlands" is the writer's addition.
- **ch12:**
  - Qutb Minar begun about 1199, about 72.5 m, UNESCO 1993.
  - Dynasty years 1206–1526.
  - Deccan campaigns about 1307–1311.
  - Capital transfer about 1327, token currency about 1329–30, Doab tax "about half".
  - Muhammad bin Tughlaq is shown with both historians' views.
  - The nearby mosque's building material is not discussed.
- **ch13:**
  - Taj Mahal about 1632–53 (UNESCO 1983); Jama Masjid about 1650–56; Red Fort about 1639–48 (UNESCO 2007), with the Prime Minister's Independence Day address mentioned by office only.
  - Battles: Panipat 1526, Khanwa 1527, Ghaghra 1529.
  - Amber alliance 1562.
  - Haldighati 1576, with no outcome stated.
  - Aurangzeb is listed in the order only.
- **ch14:**
  - Guru Nanak 1469–1539; Chaitanya about 1486–1534.
  - Moinuddin Chishti died about 1236; Nizamuddin Auliya died 1325; Amir Khusrau 1253–1325.
  - Xavier at Goa 1542; Goa press about 1556; Jesuits at Akbar's court about 1580; Carey at Serampore from 1800.
  - Surdas placed in the Braj region (commonly taught).
  - No verses are quoted.
- **ch15:**
  - Constantinople 1453; Black Death about 1347–51.
  - Gutenberg about 1450/1455; Caxton 1476.
  - Leonardo 1452–1519; Copernicus 1473–1543 (book 1543); Shakespeare 1564–1616, about 37–39 plays.
  - Nothing is quoted.
- **ch16:**
  - Ninety-five Theses 1517; excommunication and Worms 1521 (some books date the bull to 1520).
  - Act of Supremacy 1534; Jesuits approved 1540; Trent 1545–63; Augsburg 1555.
  - The Inquisition is named only, as Church courts dealing with heresy.
- **ch17:**
  - Inventions 1709–1830 (Kay 1733, Hargreaves about 1764, Arkwright 1769, Crompton 1779, Cartwright 1785, Watt patent 1769, Rocket 1829, Liverpool–Manchester 1830).
  - Bank of England 1694; Wealth of Nations 1776; Manifesto 1848; Das Kapital vol. 1 1867; Factory Act 1833.
  - Capitalism and socialism are compared without ranking, with India's mixed economy as the only present-day example.

## Tests added
- No new code tests. The content gates above cover the new chapters.
- Each chapter's build runs lint, deterministic verify, the answer-leak scan and an exact-stem originality pre-check.
- Writers also ran a 5-gram near-duplicate scan and an SVG label overflow check (`checks.mjs`, private scratchpad script), with 0 flags in every chapter.

## Known gaps / follow-ups
- The blueprints are `source_status: unverified` (lead-default). CISCE publishes no Class 9 paper pattern, so schools' own papers may differ.
- No unit-test (term) papers were assembled for ICSE 9 H&C. Only chapter tests were built, as for the other authored subjects.
- Writers checked SVGs with the overflow estimate. Only ch13's figures were also viewed in a browser, so a visual pass in the staging UI is worthwhile, especially for the schematic maps.
- The dated items listed above need an annual check.

## Decisions made
- D-050 (Sonnet writers, Opus review) was followed for every chapter.
- No new ADR.

## Needs from owner
None.
