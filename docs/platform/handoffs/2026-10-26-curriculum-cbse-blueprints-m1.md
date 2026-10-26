# curriculum-architect (CBSE blueprints) — M1 blueprints and Wave 1 electives — 2026-10-26

Status: **done**. Every CBSE Class 10 and 12 subject with a board exam has a board blueprint, except 4 language subjects (see gaps). Every Wave 1 non-language subject has a syllabus file. Class defaults exist for Classes 7–12.

Branch: `platform/curriculum-cbse/m1-blueprints` (worktree `C:/Users/Prabhu/soyl-wt/curriculum-cbse-m1-blueprints`). It merged `origin/platform/main` at bc476d0 before the work started.

## What changed

| Path | What |
|---|---|
| `platform/catalog/cbse/{10,12}/<slug>/blueprints/board.yaml` | 204 board-paper blueprints: 86 for Class 10 and 118 for Class 12. Maths X has two papers: `board.yaml` is Standard 041 and `board-basic.yaml` is Basic 241. |
| `platform/catalog/cbse/10/<slug>/blueprints/board-second-exam*.yaml` | 52 May-exam blueprints: Science, Maths Standard and Basic, Social Science, and all 48 Class 10 languages. |
| `platform/catalog/cbse/blueprints/<class>/*.yaml` | 30 class defaults (`subject_id: null`). Classes 7–12 each have `chapter-test-short`, `chapter-test-long` and `unit-test`. Classes 7, 8, 9 and 11 also have `half-yearly`, `term` and `annual`. |
| `platform/catalog/cbse/{10,12}/<slug>/blueprints/{chapter-test-short,chapter-test-long,unit-test}.yaml` | 45 subject-family overrides for Wave 1 core subjects, covering languages, humanities and commerce. |
| `platform/catalog/cbse/11/<slug>/blueprints/{annual,half-yearly}.yaml` | 36 Class 11 overrides that copy the layout of the same subject's Class 12 board paper, for example 70 marks for the sciences. |
| `platform/catalog/cbse/{10,12}/<slug>/syllabus.yaml` | 96 new syllabus files: 89 verified and 7 unverified. |
| `platform/catalog/sources/cbse.md` | One generated block between `<!-- m1-blueprints -->` markers. It holds 182 SQP/MS anchors, one per blueprint source, and 109 syllabus-document anchors. Nothing above the block changed. |
| `platform/catalog/cbse/subjects.yaml` | One error fixed: Land Transportation Associate (846), Classes 11 and 12, is theory 60 + practical 40, so `theory_only` is now false. It previously said 50/50. |

No PDFs are committed. The SQPs and marking schemes (388 PDFs and their text) are in `C:/Users/Prabhu/soyl-wt/_downloads/cbse/sqp/`.

### Blueprint counts

| Class | Paper type | Non-language (verified / unverified) | Language (verified / unverified) | Defaults |
|---|---|---|---|---|
| 10 | board | 38 (37 / 1) | 48 (26 / 22) | – |
| 10 | board-second-exam | 4 (4 / 0) | 48 (26 / 22) | – |
| 10 | chapter-test-short, chapter-test-long, unit-test | 1 subject × 3 (Social Science) | 5 subjects × 3 | 3 |
| 12 | board | 82 (74 / 8) | 36 (16 / 20) | – |
| 12 | chapter-test-short, chapter-test-long, unit-test | 6 subjects × 3 (History, Political Science, Geography, Accountancy, Business Studies, Economics) | 3 subjects × 3 | 3 |
| 11 | annual, half-yearly | 15 × 2 | 3 × 2 | 6 (incl. term, chapter tests, unit test) |
| 7, 8, 9 | all six school types | – | – | 6 each |
| **Total** | | | | **367 files: 183 verified, 184 unverified** |

All defaults and overrides are `source: lead-default` and `source_status: unverified`, with a note that they are SOYL defaults modelled on the CBSE board pattern.

**Unverified board blueprints (50).** Each one's `notes` gives the reason.
- **The SQP could not be fetched (7):** 420 (Class 10), and 817, 818, 819, 820, 827 and 847 (Class 12). These follow the standard skill-subject pattern for their theory marks.
- **CBSE publishes no SQP (3):** KTPI 073 and Land Transportation 846 (Class 12); KTPI is built from its syllabus design.
- **Languages (40):** the SQP has no extractable text (legacy fonts: Urdu, Sanskrit Core/Elective/Communicative, Kashmiri X, Manipuri X), or CBSE publishes no SQP (Tamil, Telugu, Santhali, Konkani, Maithili, Dogri, Mizo, Bhutia, Lepcha, Sherpa and others). These are built from the CBSE syllabus design table, or the split within a section is a SOYL estimate.

### Syllabus files added

All of them are listed below.
- **Class 10 (33).**
  - **Skill subjects (20):** 401, 403–416 and 418–422.
  - **Other subjects:** six music subjects, Painting, NCC, Elements of Business, and Elements of Book Keeping and Accountancy.
  - **No board exam:** HPE, Work Experience and Art Education. Every chapter is `board_assessed: false`.
  - **Unverified:** 419 Data Science and 422 Design Thinking. CBSE gives unit names and marks only.
- **Class 12 skill subjects (42):** 801–814, 816–831, 833–837, 841, 842 and 844–848.
  - **Unverified:** 826 Shorthand Hindi, whose syllabus PDF is image-only. 834 Food Nutrition and Dietetics, where sub-topics for Units 1–3 are missing from the PDF text. 844, 846 and 848, where CBSE gives unit titles only.
- **Class 12 others (21), all verified:** Engineering Graphics, KTPI, NCC, six music subjects, Graphics, Sculpture, Applied Art, six dance subjects, HPE, Work Experience and General Studies.

**Rules every file follows:**
- **Topics:** 3–8 per chapter. Skill subjects open with Part A Employability Skills: Level II at Class 10, Level IV at Class 12, each with at least 3 topics. Then comes one chapter per Part B unit.
- **Practical-only content:** practical-only units of music, dance, art and skill subjects are `board_assessed: false`.
- **exam_notes:** record the theory/practical split and the paper pattern. At Class 10 they also say that May is compartment-only for these subjects.

## How to verify

```
cd C:/Users/Prabhu/soyl-wt/_tools/bp      # scratch tools (js-yaml, tsx, zod 4, pdfjs-dist); outside the repo
npx tsx validate.ts -q
```
The validator copies `platform/shared/content/*.ts` next to itself so that `zod/v4` resolves. It parses every `syllabus.yaml` with `SyllabusFile` and every blueprint with `Blueprint`; the superRefine there checks that attempted marks equal `total_marks`, counting internal choice. It also checks:
- the path matches the subject id and the class
- the file name starts with the `paper_type`
- blueprint ids are unique
- defaults have `subject_id: null`
- board blueprints exist only for `has_board_exam` subjects, and `board-second-exam` only at Class 10
- `mark_shares` sum to 1 (±0.011)
- every `source` and `sources` anchor exists in `sources/cbse.md`
- the M0 syllabus checks: chapter numbering, units, learning outcomes

Output on the final commit:
```
syllabus: 166/166 valid ({"verified":138,"unverified":28}); 1812 chapters, 6217 topics

blueprints: 367/367 valid ({"verified":183,"unverified":184})
  class 7: annual (default) 1, chapter-test-long (default) 1, chapter-test-short (default) 1, half-yearly (default) 1, term (default) 1, unit-test (default) 1
  class 8: (same six defaults)
  class 9: (same six defaults)
  class 10: board 86, board-second-exam 52, chapter-test-long 6, chapter-test-short 6, unit-test 6, chapter-test-long (default) 1, chapter-test-short (default) 1, unit-test (default) 1
  class 11: annual 18, half-yearly 18, annual (default) 1, chapter-test-long (default) 1, chapter-test-short (default) 1, half-yearly (default) 1, term (default) 1, unit-test (default) 1
  class 12: board 118, chapter-test-long 9, chapter-test-short 9, unit-test 9, chapter-test-long (default) 1, chapter-test-short (default) 1, unit-test (default) 1
  note: 119 language blueprint(s) await the sibling agent's syllabus.yaml (not an error)
errors: 0
```
- The 119 language blueprints sit in subject folders that will get their `syllabus.yaml` from curriculum-cbse-languages, which works on another branch. The validator reports these as a note. Only language-tier subjects may have a blueprint without a syllabus.
- All the generators live in `_tools/bp/`: `b10-science.mjs`, `b10-core.mjs`, `defaults.mjs`, `x10/`, `x12skill/`, `x12arts/`, `b12core/` and `lang/`. `gen-sources.mjs` rebuilds the M1 block of `sources/cbse.md` from `registry/` and `srcfrag/`.

Tests added: none (data only). Suggestion: port `validate.ts` into `platform/shared` as a catalog test.

## Conventions (decisions)

1. **Item counts.** An item's `count` includes the alternatives, and `internal_choice {attempt, of}` applies to each group of `of` questions. "Either A or B" is `count: 2n, {1, 2}`. "Any 4 of 6" is `count: 6, {4, 6}`, and four blocks of "any 5 of 6" is `count: 24, {5, 6}`. A choice inside a sub-part of a case-based question does not change counts; it is described in the section `instructions`.
2. **Competency weights.** `mark_shares` holds the official competency weights from each subject's 2026-27 question-paper-design table. The keys are Competency enum values joined by `+`: `recall+understanding`, `application`, `analysis+evaluation`. Bands such as Remembering/Understanding/Applying/Analysing-Evaluating-Creating are folded into these three keys. SST's map skill (6.25%) goes into `application`; CBSE's SST table totals 99.5%. The value is `{}` when CBSE publishes no table: English, Hindi, CS, IP, PE, Applied Maths, skill subjects and arts.
3. **Type mapping.**
   - 1 mark → `mcq`, `assertion-reason`, `fill-blank`, `true-false` or `match` as printed.
   - 2–3 marks → `short`.
   - 4 marks or more, descriptive → `long`.
   - Unseen passages → `case-based`. Textbook extracts, cartoons and historical sources → `source-based`.
   - Numericals that need working → `short`/`long`, never `numerical`, because they carry step marks.
4. **Practical subjects.** Their board blueprint covers the theory paper only: `total_marks` is the theory marks, and the practical is stated in `notes`.
5. **Second exam.** CBSE has published no separate design or SQP for the Class 10 May exam. The 14-02-2026 notification makes it an improvement exam for Science, Maths, SST and languages, so `board-second-exam.yaml` repeats the February pattern on the full syllabus. This is stated in every file. Other subjects are compartment-only in May and get no second-exam blueprint.
6. **Skill-subject SQPs** are CBSE's 2025-26 papers, which are the only ones on the skill SQP page. Notification 132/2026 (`cbse-sqp-notification-2026-27`) says the paper design is unchanged for 2026-27, so these blueprints are verified.
7. **School exams.**
   - **Class defaults:** `half-yearly` and `annual` are 80 marks in 3 hours, in the CBSE board layout. `term` is 50 marks in 2 hours on the term's portion.
   - **Chapter tests** are 20 marks in 40 minutes (short) and 40 marks in 90 minutes (long), aligned with the CBSE 10 Science ch01 exemplar `tests.json`.
   - **`unit-test`** is 50 marks in 2 hours. For Classes 10 and 12 it also serves as the three half-syllabus tests.
8. **Subject-family overrides.**
   - **Languages:** extract, short and long answers, with no assertion-reason or case-based items.
   - **Humanities** (SST, History, Political Science, Geography): source-based questions replace case-based ones.
   - **Commerce** (Accountancy, Business Studies, Economics): the 1/3/4/6-mark structure.
   - **Science and maths** use the class default unchanged, because it already matches them.

## Format-mapping issues (for the Lead; the contract may need extending)

Each is recorded in the affected blueprints' `notes`.
1. **Map work** (SST X, History, Political Science and Geography XII): modelled as 1-mark `short` items in a map section, and the assembler must keep them together on one outline map. → a `map` type.
2. **Writing tasks:** letters, articles, reports, notices, analytical paragraphs, Hindi रचनात्मक लेखन, essays, translation and précis are all `long` or `short`. → a `writing` type with a rubric (format, content, organisation, language).
3. **Accounting and computation answers** are `short`/`long`. These are journal entries, ledgers, final accounts, cash-flow and comparative statements (Accountancy XII, Book Keeping X, skill subjects 801/811/823); cost sheets (823); and tax and GST computations (822). → a tabular answer type with row-level step marks.
4. **Code** in CS, IP, Computer Applications, 802, 803, 843 and 847: write-the-output items are 1-mark `short`, and code-writing and SQL items are `short`/`long`. → a `code-output` type with exact-match grading, and a code-answer type.
5. **Drawing and notation answers**: Engineering Graphics instrument drawings; music notation (compositions, talas); dance tala and tukra notation; shorthand outlines (825, 826); sketches and diagrams (804, 820, 837, 817 proof marks). These are `long`/`short`. → a drawn-response or upload type.
6. **Image-dependent items** need image assets: picture, cartoon and artwork questions (SST, Political Science, Painting and the fine arts), Economics and Geography graphs, and Maths LPP and area graphs.
7. **Sequencing or ordering** (Sanskrit घटनाक्रम, chronology items) has no ordering type. These are `short`, or `mcq` where options are printed.
8. **Mixed 1-mark blocks** in skill subjects mix MCQ, fill-in-the-blank, true/false and matching items in one "any n of m" question. They are all modelled as `mcq`.
9. **Missing variant field.** The contract has no variant field on `Blueprint`:
   - Maths X Standard and Basic are separate files (`board.yaml`, `board-basic.yaml`).
   - Accountancy XII's Computerised Accounting option for Part B is not modelled.
   - NCC Part II depends on the student's wing, so the assembler must filter questions to that wing's chapters.
   - → a `variant` field (or `option`) on `Blueprint`.
10. **Substitute questions** for visually impaired candidates are not modelled anywhere.

## Sources not fetched

- **Skill SQPs and marking schemes returned "URL inaccessible" after retries on 2026-10-26:** 420 ELHA (X), and 817, 818, 819, 820, 827 and 847 (XII), plus XII 832 Music Production, which is not in the catalog.
- **Text not extractable on this machine** (no OCR): the 826 Shorthand Hindi syllabus (image-only), and the Punjabi XII SQP, marking scheme and syllabus.
- **No SQP from CBSE:** KTPI 073, Land Transportation 846 (XII), and several languages, which are listed in the language blueprints' notes.
- `ICT`, `FoundationInformationTechnology` and the Maths "VIC" papers on the Class X SQP index were also inaccessible. These are not catalogued subjects or variants used here.

## Known gaps / follow-ups

1. **No board blueprint for 4 language subjects:** 10/tangkhul and 12/tangkhul (no SQP, and the syllabus gives no marks), 12/punjabi (image-only PDFs) and 12/kashmiri (unreadable SQP, no marks in the design).
2. **Language blueprints are waiting on syllabus files.** 119 language blueprint files sit in folders that will get `syllabus.yaml` from curriculum-cbse-languages; that agent has been told. If a language slug changes there, move the blueprints with it.
3. **Existing M0 files below the quality bar** (I did not edit them):
   - `12/painting/syllabus.yaml` has 1–2 topics per chapter. The richer shared theory chapters in `_tools/bp/x12arts/finearts.mjs` (written for Graphics, Sculpture and Applied Art) could replace them.
   - `12/artificial-intelligence/syllabus.yaml` uses Level II Employability Skills topics; Class 12 should be Level IV.
4. **exam_notes that differ from the 2026-27 SQPs:**
   - **Hindi Core XII** says "2x4 / 4x2". The SQP has Q4 as 4 of 5 × 2 (~40 words) and Q5 as 2 of 3 × 4 (~80 words). This was sent to the languages agent.
   - **Chemistry XII** does not mention that 4 of the 16 one-mark items are assertion-reason.
   - **Geography XII** does not mention its two 3-mark source-based questions in Section B.
   - **Sociology XII** does not mention its two 2-MCQ passages in Section A.
   - **Biology XII** has no internal choice in Section C, although the design says about 33% choice; the blueprint follows the SQP.
   - **Structure changes in the 2026-27 SQPs:** Science X and Social Science X are now sectioned by discipline (Biology / Chemistry / Physics; History / Geography / Political Science / Economics). The blueprints follow this.
5. **Possible catalog issues:**
   - **827 Air-Conditioning:** CBSE's table gives theory marks to units whose content it labels "practical only". This is recorded in that file's exam_notes.
   - **813 SQP:** prints "any 7 out of 6"; the blueprint models it as any 6 of 7.
   - **French XII Section C:** eight 5-mark grammar questions against a 25-mark total; the blueprint models this as attempt 5 of 8.
6. **Class 9 has no subject-level overrides yet.** Class 9 follows the new NCF-SE scheme, with Maths and Science Advanced papers of 25 marks, so its subjects use the class defaults. Add overrides once CBSE publishes Class 9 sample papers.
7. **Validation is not in CI yet.** `validate.ts` could become a `platform/shared` test.

## Needs from owner

- Nothing blocking.
- Optional: the 7 inaccessible skill SQPs and the image-only PDFs (826 syllabus, Punjabi XII), if someone can download them or run OCR. Place them in `platform/catalog/sources/` locally; do not commit them.
