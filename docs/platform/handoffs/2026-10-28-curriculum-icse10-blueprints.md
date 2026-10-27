# curriculum-architect / assessment-designer — ICSE Class 10 core blueprints — 2026-10-28

Status: **done** for all ten subjects. Eight board blueprints are verified against the CISCE ICSE 2027 specimen papers. Two are only partly verified: Hindi has its section structure verified from the syllabus but its per-question marks unverified, and Computer Applications has its paper size verified but its section layout unverified. Owner request OA-NEW below covers both.

Branch: `platform/curriculum/icse10-blueprints` (worktree `C:/Users/Prabhu/soyl-wt/curriculum-icse10-blueprints`), from `origin/platform/main` at 7e266e0.

## What changed

| Path | What |
|---|---|
| `platform/catalog/cisce/icse-10/<subject>/blueprints/{board,chapter-test-short,chapter-test-long,unit-test}.yaml` | 40 blueprints, four per subject, for mathematics, physics, chemistry, biology, history-civics, geography, english-language, literature-in-english, hindi and computer-applications. |
| `platform/catalog/cisce/blueprints/10/{chapter-test-short,chapter-test-long,unit-test}.yaml` | 3 ICSE Class 10 class defaults (`subject_id: null`). They mirror `cbse/blueprints/<class>/` and are used by the 66 other ICSE 10 subjects that have no blueprints of their own. Same loaders: db seed regex and pipeline `blueprintsFor` / `blueprintFor`. |
| `platform/catalog/cisce/icse-10/geography/syllabus.yaml` | Unit marks set from the specimen layout: Map Work 20, Geography of India 60. `exam_notes` now give the specimen pattern. |
| `platform/catalog/cisce/icse-10/english-language/syllabus.yaml` | Unit marks 20 / 10 / 10 / 20 / 20 (Q1–Q5) from the specimen; the syllabus publishes none. `exam_notes` updated. |
| `platform/catalog/cisce/icse-10/physics/syllabus.yaml` | 3 fixes against the ICSE 2027 Physics syllabus (Class X part): ch01-t02 "couple" → resultant moment (couple is not in the 2027 syllabus); ch04-t06 TIR in the three triangular prisms the syllabus lists (60-60-60, 30-60-90, 45-45-90), not "right-angled prisms"; ch10 removed topic narrowed to "laws of the magnetic effect of a current (principles only)". `exam_notes` give the exact section pattern. |
| `platform/catalog/cisce/icse-10/{history-civics,literature-in-english}/syllabus.yaml` | `exam_notes` only. H&C used to say "Section A Civics, Section B History"; the paper is actually Part I (30, compulsory) + Part II Section A Civics / Section B History. Literature now states the section/choice rule. |
| `platform/catalog/sources/cisce.md` | 8 new specimen anchors with exact PDF URLs (fetched 2026-10-28). 2 anchors are marked NOT FETCHED: `icse-2026-hindi-paper` and `icse-2026-computer-applications-paper`. |

No PDFs are committed. The specimen PDFs and their text are in the session scratchpad and are not needed to rebuild anything.

All ten syllabi were checked against the Class X part of the ICSE 2027 syllabus PDFs, plus Appendix I and Circular 2026-27/33 for literature texts. Only Physics needed topic changes. Chapter order, topics, units, removed topics and literature titles/authors are correct in the other nine; details are in "Syllabus check" below.

## Board patterns (ICSE 2027 specimen papers; Hindi and CA see notes)

| Subject | Time / marks | Compulsory part | Choice part | Source |
|---|---|---|---|---|
| Mathematics (511) | 3 h / 80 | A 40: Q1 13 MCQ + 2 AR; Q2–Q3 parts 4,4,4 / 4,4,5 (short 4 ×5, long 5 ×1) | B: any 4 of 7 × 10 | verified |
| Physics (521) | 2 h / 80 | A 40: 14 MCQ + 1 AR; 6 × 1 bracket fill-ins; 2-mark match; 7 × 2; 1 × 3 | B: any 4 of 6 × 10 | verified |
| Chemistry (522) | 2 h / 80 | A 40: 14 MCQ + 1 AR; 5-mark diagram item (case); 10 × 1 equations/names; 5-blank fill-in; 5-pair match | B: any 4 of 6 × 10 | verified |
| Biology (523) | 2 h / 80 | A 40: 13 MCQ + 2 AR; 10 × 1 terms/odd-one-out; 5-blank passage; 5-mark case; 5-pair diagram match | B: any 4 of 6 × 10 case-based | verified |
| History & Civics (501) | 2 h / 80 | Part I 30: 15 MCQ + 1 AR; 7 × 2 | II-A Civics (ch01-06) 2 of 3 × 10; II-B History (ch07-18) 3 of 5 × 10 | verified |
| Geography (502) | 2 h / 80 | Part I 30: toposheet case 10 (ch01-03); India outline map 10 (ch04-05); 9 MCQ + 1 AR (ch06-18) | II (ch06-18): any 5 of 9 × 10 | verified; unit weightage 20/60 |
| English Language (011) | 2 h / 80 | All compulsory: Q1 writing 20 (1 of 5, ch01-03); Q2 letter 10 (1 of 2, ch04); Q3 notice 5 + e-mail 5 (ch05); Q4 case 20 (ch06-07); Q5 fill-blank 4 (ch08) + fill-blank 4 (ch09) + 4 MCQ (ch10) + 8 MCQ (ch11) | Q1/Q2 internal choice | verified; unit weightage 20/10/10/20/20 |
| Literature in English (012) | 2 h / 80 | A: 16 MCQ | B drama (ch01-04), C prose (ch05), D poetry (ch06): 1 of 2 × 16 each; E: 1 of 3 × 16 (any) | verified (E is a modelling deviation) |
| Hindi | 3 h / 80 | खंड क 40: writing 15 (1 of 5, ch01); letter 7 (1 of 2, ch02); unseen case 10 (ch03); 8 × 1 grammar (ch04-05) | खंड ख (ch06-09): 4 of 8 × 10 source-based | sections verified (syllabus); marks **unverified**; unit weightage 40/40 |
| Computer Applications | 2 h / 100 | A 40: 20 MCQ; 6 × 2 short; 4 × 2 code-output | B: any 4 of 6 programs × 15 | size verified (syllabus); layout **unverified** |

Chapter tests (short and long) and the half-syllabus unit test use the same forms, at the board's pace:

| Subject | Short | Long | Unit test |
|---|---|---|---|
| Physics, Chemistry, Biology, H&C, Geography | 20 / 30 min | 40 / 60 min | 60 / 90 min |
| Maths | 20 / 45 min | 40 / 90 min | 60 / 135 min |
| CA | 25 / 30 min | 50 / 60 min | 75 / 90 min |
| Literature | 20 / 30 min | 40 / 60 min | 56 / 90 min |
| English Language | 20 / 30 min | 40 / 60 min | 40 / 60 min |
| Hindi | 20 / 45 min | 40 / 90 min | 40 / 90 min |

Every subject paper type has 10-mark structured questions with a choice in Section B, except English Language and Hindi; see Decisions 4.

## Decisions (data-only; no ADR needed)

1. **Each Section B question is one 10-mark item on one chapter.** ICSE Section B questions have three or four parts (3 + 3 + 4, 2 + 2 + 3 + 3) that may come from different topics. The item model has one `unit` per question, so SOYL sets the parts of each question within one chapter. Biology Section B uses `case-based` items (a stimulus followed by parts), which is the specimen's form. Every other subject uses `long`. Marks, choice and part sizes match the board paper.
2. **No competency `mark_shares` on any ICSE blueprint.** The October 2026 circular gives higher-order questions only "an approximate weightage of 50%" overall; it is not a per-band design. I first set 0.5 / 0.5 on the eight specimen subjects and ran the series engine on a synthetic bank. 9 of 10 subjects then failed the balance rule (±3 marks per band whichever alternatives are attempted). The cause: `long` items carry a single competency, and ICSE choice groups are large (4 of 6, 4 of 7, 5 of 9, 3 of 5). Meeting the rule would put whole choice sections into one band, which is further from the specimen than no balance. With `mark_shares: {}`, assembly does no competency balancing at all, neither hard nor soft. Follow-up for pipeline-engineer: give long/structured items per-part competencies, or use an average-based tolerance for large choice groups. Then set 0.5 / 0.5 for the specimen subjects.
3. **Literature, the fourth answer.** The board rule is "one question from each of B, C, D, and one more from any of them". The schema only has choice inside one item group, so a Section E of 3 further 16-mark questions (attempt 1) models the extra answer. Attempted marks and the per-genre minimum are exact, but the paper offers 9 questions instead of 6. Follow-up: a cross-section choice in the blueprint schema.
4. **English Language and Hindi chapter and unit tests use MCQ and short answers only.** Their chapters are of different kinds (composition, letter, comprehension, grammar, prescribed books). The series planner also groups chapters contiguously, so a unit-test group can be all composition or all grammar. One subject-level blueprint can only use item types every chapter can supply. The board blueprints carry the full writing / fill-blank / case pattern with chapter scopes. Once chapter-override blueprints land (the unmerged `platform/curriculum/cbse10-reader-blueprints` branch adds `scope: [chapter ids]` overrides), writing and grammar chapters can get their own chapter tests.
5. **Hindi Section B, "only two books".** This cannot be expressed in the schema. Eight 10-mark questions over the four text chapters, attempt 4, with chapter spread scored, model it.
6. **Unit weightage** was added only where the paper fixes it (Geography and English Language; Hindi already had 40/40). Mathematics, the sciences, H&C, Literature and CA publish none, so the planner notes "no unit weightage applied" for their mocks. This is expected.
7. **Class defaults** (`cisce/blueprints/10/`) are generic ICSE structure: compulsory objective + short items, then a choice of 10-mark structured questions. All 76 ICSE 10 subjects therefore now get chapter tests and unit tests.

## How to verify

```
cd platform
npm run content -- catalog                       # 0 errors, 0 warnings; cisce icse 10: 43 blueprints
npm run content -- plan --board cisce --class 10 --subject mathematics
npm run content -- assemble --board cisce --class 10 --subject <slug> --series --source files   # empty bank
npm test -w @soyl/db
npm test -w @soyl/content-pipeline
npm run typecheck
```

### Proof that the blueprints work (hand-authored content: none)

- `plan` for ICSE 10 Mathematics: 24 chapters, 192 model calls, estimate ₹1,336 synchronous / ₹668 batch, within the run and total caps.
- `assemble --series --source files` against the empty bank exited 0 for all ten subjects, with no errors. Each planned paper (chapter tests for every chapter, 3 unit tests, 6 board mocks) became one generation request in `out/assemble/<subject>/generation-requests.json`, and its `missing` count equals the paper's blueprint slots. For example, Maths board mock = 28 slots (13 + 2 + 5 + 1 + 7).

  | Subject | Papers (requests) | Missing slots |
  |---|---|---|
  | Maths | 57 | 756 |
  | Physics | 33 | 618 |
  | Chemistry | 39 | 693 |
  | Biology | 41 | 689 |
  | H&C | 45 | 774 |
  | Geography | 45 | 663 |
  | English Language | 31 | 620 |
  | Literature | 23 | 298 |
  | Hindi | 27 | 537 |
  | CA | 35 | 655 |

  The only notes were "no unit weightage applied" for subjects without unit marks, plus the live-mock note.
- An engine run, not committed, used the pipeline's own `planSubjectTests` + `assembleSubject` for all ten subjects:
  - **Empty bank:** every planned paper (chapter tests, 3 unit tests, 6 mocks) came back as generation requests, and the number of missing items equals the paper's blueprint slot count in every case (0 mismatches).
  - **Synthetic bank:** a bank of placeholder records (id, type, marks, chapter, competency, topic; no question text), 60 per chapter per (type, marks) the subject's blueprints use. Every paper was built: Maths 57, Physics 33, Chemistry 39, Biology 41, H&C 45, Geography 45, English Language 31, Literature 23, Hindi 27, CA 35. Results: 0 generation requests, total marks exact, 0 repeats inside any series, and exact unit weightage on the 6 mocks each of Geography, English Language and Hindi.

### Bank demand per series (6 mocks, no repeats)

The scoped slots producers must fill before `assemble --freeze` can succeed, beyond chapter tests:

- English Language: 30 compositions (ch01-03); 12 letters (ch04); 12 notice/e-mail tasks (ch05); 6 twenty-mark comprehension cases (ch06-07); 6 verb fill-in passages (ch08); 6 one-word fill-in sets (ch09); 24 joining MCQs (ch10); 48 transformation MCQs (ch11).
- Hindi: 30 compositions (ch01); 12 letters (ch02); 6 unseen passages (ch03); 48 grammar items (ch04-05); 48 ten-mark text questions (ch06-09).
- Geography: 6 toposheet cases (ch01-03); 6 outline-map items (ch04-05).
- Literature: at least 12 sixteen-mark questions per genre, plus 18 for Section E.
- Maths: 42 ten-mark structured questions, about 2 per chapter.
- Physics, Chemistry and Biology: 36 ten-mark questions (Biology's are case-based).
- H&C: 18 Civics and 30 History ten-mark questions.

## Gate results (run on the final tree)

```
npm run content -- catalog        catalog valid: 0 error(s), 0 warning(s)   (cisce icse 10: 76 subjects, 76 syllabi, 43 blueprints)
npm test -w @soyl/db              Test Files 14 passed (14); Tests 109 passed | 1 skipped (110)
npm test -w @soyl/content-pipeline  Test Files 8 passed (8); Tests 278 passed (278)
npm run typecheck                 all workspaces, exit 0
```

No test was skipped, weakened or deleted by this work. The one skipped db test is pre-existing.

## Syllabus check (all ten, ICSE 2027 Class X documents)

- **Physics:** 3 fixes, listed above. Everything else is verified.
- **Mathematics, Chemistry, Biology, H&C, Geography, English Language, Computer Applications:**
  - Chapter order follows the CISCE section order.
  - Every Class X topic is covered.
  - `removed_topics` and the not-to-be-tested items match the PDFs.
  - No changes.
- **Literature in English:** Julius Caesar Acts III–V and the five stories and five poems with their authors match the English syllabus and Appendix I exactly.
- **Hindi:** the five stories, the five poems, Naya Raasta Sarg 14–26 and the three Ekanki Sanchay plays match Appendix I and circular 2026-27/33. CISCE spells two authors "Prashad" and "Ashq"; the file keeps the standard "Prasad" and "Ashk".

## Known gaps / follow-ups

- **Hindi and CA board blueprints are unverified below section level** (OA-NEW).
- **Competency balance** for ICSE is off until the engine can measure structured items per part (Decision 2), for pipeline-engineer.
- **Cross-section choice** (Literature) and the "only two books" choice (Hindi) need schema support, for pipeline-engineer.
- **Chapter-specific chapter tests** for English Language and Hindi writing and grammar chapters are waiting on chapter overrides (Decision 4).
- **The specimen index page `https://cisce.org/specimen-question-papers-icse-class-x-2027/` returns HTTP 403** to scripted clients. The PDF URLs were found through a public mirror page listing and verified by downloading them from cisce.org. If CISCE re-uploads a file under a new name, update `sources/cisce.md`.

## Needs from owner

- **OA-NEW (ICSE Hindi and Computer Applications papers):** please place in `platform/catalog/sources/` the latest official ICSE papers for these two subjects. CISCE keeps the 2026 rubric for both in 2027, so that means the ICSE 2026 question papers (Hindi, Computer Applications), or their latest specimen papers with marking schemes. They are on the cisce.org pages for 2026 question papers / specimen papers, which block scripted downloads. With them, the two board blueprints can be checked and marked verified.
