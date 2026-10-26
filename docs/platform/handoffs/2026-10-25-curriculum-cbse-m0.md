# curriculum-architect (CBSE) — M0 subject catalog and syllabi — 2026-10-25

Status: **partial** — the subject catalog is complete for Classes 7–12. Syllabus files exist for every priority-1 subject in every class except Class 9 Sanskrit, because CBSE has not yet notified its textbook. They also exist for 11 Wave 1 electives. The remaining electives, languages and skill subjects (about 380) still have no syllabus file.

Branch: `platform/curriculum-cbse/m0` (worktree `C:/Users/Prabhu/soyl-wt/curriculum-cbse-m0`). It merges `origin/platform/main` at 3a4c843 to get the catalog zod schemas.

## What changed

| Path | What |
|---|---|
| `platform/catalog/cbse/subjects.yaml` | 448 CBSE subjects, Classes 7–12, for 2026-27, in the exact brief schema (`board: cbse`, `academic_year: "2026-27"`). |
| `platform/catalog/cbse/<class>/<slug>/syllabus.yaml` | 70 syllabus files: 916 chapters and 2,813 topics. The list is below. |
| `platform/catalog/sources/cbse.md` | Every source, each with an anchor id, URL, publisher, year, fetch date (2026-10-25) and what it was used for. It also lists all 272 CBSE PDFs fetched and every URL that could not be fetched. |
| `docs/platform/handoffs/2026-10-25-curriculum-cbse-m0.md` | This note. |

No official PDFs are committed. They are in `C:/Users/Prabhu/soyl-wt/_downloads/cbse/`, outside the repo.

### Subject counts (core / language / elective)

| Class | Core | Language | Elective | Total | Basis |
|---|---|---|---|---|---|
| 7 | 3 | 4 | 4 | 11 | NCERT NCF-SE middle-stage books, plus CBSE CT & AI and Kaushal Bodh |
| 8 | 3 | 4 | 4 | 11 | as Class 7 |
| 9 | 3 | 45 | 41 | 89 | CBSE Secondary Curriculum 2026-27, Tables 2 and 5 (new NCF-SE scheme). Includes Maths and Science Advanced, CT & AI, Individuals in Society, Art Ed, PE & Well-being, Vocational Ed, the Table 5 optional subjects and skill subjects 401–421 |
| 10 | 3 | 49 | 37 | 89 | CBSE Secondary Curriculum 2026-27: the existing scheme continues for the 2026-27 Class X cohort. Includes Hindi A and B, English LL and Communicative, Sanskrit and Sanskrit Communicative, Urdu A and B, 41 more languages, Group A2 electives, skill subjects 401–422, and HPE, Work Experience and Art Ed |
| 11 | 15 | 39 | 70 | 124 | CBSE Senior Secondary Curriculum 2026-27: Groups L, A and S, plus HPE, Work Experience and General Studies |
| 12 | 15 | 39 | 70 | 124 | as Class 11 |
| **Total** | | | | **448** | |

### Syllabus files completed

**Wave 1 — Class 10 (12 files)**
- **verified (9):** science (pilot), mathematics, social-science, english-language-and-literature, sanskrit, computer-applications, home-science, information-technology (402), artificial-intelligence (417)
- **unverified (3):** hindi-a, hindi-b, english-communicative. CBSE names only the books and the excluded lessons, so the chapter lists come from the NCERT and CBSE editions as I know them.

**Wave 1 — Class 12 (25 files)**
- **verified (21):** physics, chemistry, mathematics, biology, english-core, accountancy, business-studies, economics, history, political-science, geography, computer-science, informatics-practices, psychology, sociology, physical-education, applied-mathematics, entrepreneurship, biotechnology, artificial-intelligence (843), painting (theory only)
- **unverified (4):** hindi-core, hindi-elective, home-science, legal-studies

**Wave 2 — Class 9 (5 files)**
- **verified (3):** science, mathematics, social-science. These follow the new 2026-27 NCF-SE syllabus.
- **unverified (2):** english, hindi. Their literature is a placeholder because CBSE does not list the contents of the new NCERT textbooks.

**Wave 2 — Class 11 (18 files)**
- **verified (16):** physics, chemistry, mathematics, biology, english-core, accountancy, business-studies, economics, history, political-science, geography, computer-science, informatics-practices, psychology, sociology, physical-education
- **unverified (2):** hindi-core, hindi-elective

**Wave 3 — Classes 7 and 8 (10 files, all unverified):** science, mathematics, social-science, english and hindi for each class. ncert.nic.in refused connections, so the chapter lists come from secondary listings.

**Priority-1 subjects without a syllabus:** only `cbse-9-sanskrit`. CBSE's 2026-27 Class IX Sanskrit document says the textbook and lessons are "शीघ्रमेव सूचयिष्यते" (to be notified soon).

## How to verify

The validator lives in my scratch directory: it imports `platform/shared/content/catalog.ts` (`SubjectsFile`, `SyllabusFile`) and parses the YAML with js-yaml. It also checks:
- the directory path matches the subject id
- chapter numbers match their position
- every `chapter.unit` appears in `units[]`
- every topic has learning outcomes
- every `source` and `sources` anchor exists in `sources/cbse.md`

To re-run it, copy the script below to any folder that has js-yaml and tsx, run `npm install` in `platform/`, then run `npx tsx validate.ts`.

Output on the final commit:

```
subjects.yaml: 448 subjects OK
  class 7: core 3, language 4, elective 4, total 11
  class 8: core 3, language 4, elective 4, total 11
  class 9: core 3, language 45, elective 41, total 89
  class 10: core 3, language 49, elective 37, total 89
  class 11: core 15, language 39, elective 70, total 124
  class 12: core 15, language 39, elective 70, total 124
ok   10/artificial-intelligence/syllabus.yaml (12 ch, 23 topics, verified)
... (70 lines "ok")
70/70 syllabus files valid; 916 chapters, 2813 topics; errors: 0
```

<details><summary>validate.ts (scratch)</summary>

```ts
import fs from 'node:fs'; import path from 'node:path'; import yaml from 'js-yaml';
const WT = 'C:/Users/Prabhu/soyl-wt/curriculum-cbse-m0';
const { SubjectsFile, SyllabusFile } = await import(`file:///${WT}/platform/shared/content/catalog.ts`);
const root = `${WT}/platform/catalog/cbse`;
// 1) SubjectsFile.safeParse(subjects.yaml); per-class tier counts
// 2) every <class>/<slug>/syllabus.yaml: SyllabusFile.safeParse + path == <class>/<id minus cbse-<class>->
//    + chapter.number == position + chapter.unit ∈ units[] + topics have learning_outcomes
// 3) every subjects.yaml `source` and syllabus `sources` id is an anchor (`## \`id\`` heading) in sources/cbse.md
```
</details>

Tests added: none (data only). The pipeline-engineer or Lead could add `validate-catalog` as a test in `platform/shared`.

## Decisions made (catalog conventions)

1. **Mathematics Standard 041 and Basic 241 (Class 10)** are one subject, `cbse-10-mathematics` with code 041. They share one syllabus, and the notes explain the two papers. CBSE scheme instruction v.5 says the Basic/Standard split is discontinued from 2026-27 for later cohorts, but the 2026-27 Class X cohort may still take Basic. Blueprints should carry two paper variants.
2. **Hindi A (002) and Hindi B (085)** are separate subjects, as are Urdu A/B, Sanskrit and Sanskrit Communicative, English LL and English Communicative, and at Classes 11–12 the Core/Elective pairs of Hindi, English, Sanskrit and Urdu. Mathematics (041) and Applied Mathematics (241) at Classes 11–12 are also separate subjects with different syllabi.
3. **Class 9 (2026-27) follows the new NCF-SE scheme.** Each language is one subject covering R1, R2 and R3 levels, with the differences in notes. Hindi is a single subject because the A/B split does not apply in Class 9. Maths Advanced and Science Advanced are optional 25-mark papers with their own subjects, tier elective. CT & AI, Individuals in Society, Art Education, PE & Well-being and Vocational Education are compulsory school-assessed subjects with `has_board_exam: false`.
4. **Class 9 skill subjects** are the full list on CBSE's skill page (401–421). The eight in the tentative Table 5 cite the scheme; the others cite the skill page, with a note to confirm availability.
5. **Classes 11 and 12 have identical subject lists.** Class 11 has no board exam. `tier: core` there marks the 15 academic subjects the Lead named; every Class 11–12 subject is technically an "elective" in CBSE terms.
6. **Priority 1** covers core subjects, all Hindi courses and English (English LL, English Core, English at 7–9). For Class 10 it also includes Sanskrit, because the Lead's work order lists it.
7. **`theory_only: true`** marks a subject when practical or performance work is at least half the marks, or the subject is activity-based: music, dance, fine arts, skill subjects with 50/50 papers, HPE, Work Experience, Art Education, PE & Well-being, Vocational Education, Painting and Computer Applications. Subjects with 60/40 skill papers, 70/30 sciences and similar splits are `false`, with the practical noted in exam_notes.
8. **Formative-only content.** CBSE 2026-27 marks some topics as "assessed only formatively". Examples: Class 10 Periodic Classification, Evolution, and Motor/EMI; Class 12 Surface Chemistry and three other Chemistry topics, and Environmental Issues; Class 11 Biology Digestion, the s-/p-block elements and several Maths topics; SST interdisciplinary-project-only parts. These are kept as chapters or topics with **`board_assessed: false`** so lessons can still be made, and they are excluded from board-pattern tests.
9. **Literature** lists the text title and author (plus `title_en` for Hindi and Sanskrit) and never any text. Hindi and Sanskrit chapter titles are in Devanagari with `title_en`, and learning outcomes for Hindi and Sanskrit are written in Hindi or Sanskrit.
10. **Two board exams for Class 10.** Every Class 10 subject's notes or exam_notes record the 14-02-2026 notification: the February exam is compulsory, and the optional May exam allows **improvement only in Science, Mathematics, Social Science and languages**. Other subjects can be taken in May only as compartment.

## Schema findings for the Lead (`platform/shared/content/catalog.ts`)

- **`board_assessed` is silently stripped.** zod `object()` is non-strict, so `chapter.board_assessed` and `topic.board_assessed`, which I added, parse fine but are dropped from the parsed object. Please add `board_assessed: z.boolean().default(true)` to `SyllabusChapter` and `Topic`. Without it, blueprint and test generation cannot tell formative-only content apart.
- **No way to express R1/R2/R3 levels or paper variants.** This affects Maths Standard/Basic and Class 9 languages. Consider `variants: [{ code, name, notes }]` on `Subject`, or a blueprint-level variant. For now these are carried in `notes`.
- **Unit marks are sometimes shared by groups of units**, for example Physics XII "Units I–II: 16" and Business Studies "Units 1-2: 16". I modelled each group as one unit. If per-unit marks matter, a `group` field would help.
- **Classes 7–9 need `units[].marks: null`**, since CBSE has not published marks for Class 9 SST and the middle stage has no board marks. The schema already allows this.
- Everything else fit the schema: the id rules, wave-by-class, `title_en` on chapters and topics, and object-form `literature_texts`.

## Known gaps / follow-ups

1. **About 380 subjects have no syllabus file.** These are Wave 1 regional and foreign languages (41 at Class 10, 31 at Class 12), Sanskrit Core/Elective and Urdu, English Elective, music, dance and fine arts other than Painting XII, NCC, KTPI, Engineering Graphics, Elements of Business, BK & Accountancy, about 60 skill subjects, HPE, Work Experience and General Studies, and their Wave 2 counterparts. The CBSE PDFs for all of them are already downloaded and text-extracted. Suggestion: split these across several subject-producer or curriculum agents by family (languages / skills / arts).
2. **The unverified Hindi files need checking against the NCERT contents pages.** These are Class 10 Hindi A/B, Class 11–12 Hindi Core/Elective, the English Communicative literature reader, and all of Classes 7–8. Hindi lesson titles in Abhivyakti aur Madhyam that are marked "(verify title)" need the same check.
3. **Class 9 English (Kaveri) and Hindi literature are placeholders**, and Class 9 Sanskrit is missing, because CBSE has not listed the contents of the new NCERT books. Class 9 Science chapter numbering (book chapters 2–13) is inferred from CBSE's unit table. Book chapter 1 is not in the assessment scheme and is left out.
4. **Granularity.** Wave 1 core files average 3–5 topics per chapter. Some Class 11 humanities and commerce files and all Class 7–8 files average 1–3, coarser than the target of 3–8. The pipeline can split topics, but an architect pass would be better.
5. **CBSE links that could not be fetched** ("The specified URL is inaccessible at this time" after a retry):
   - Class IX CT & AI and Interdisciplinary Area (Individuals in Society) syllabi. Both subjects are catalogued, but neither has a syllabus.
   - 12 Class IX skill PDFs under `/sec/`. The Class X versions were fetched.
   - The Hindi-medium versions of Geography, History, Political Science, PE and KTPI. These are out of scope.
6. **NCERT** (`ncert.nic.in`) refused connections, including through WebFetch. Every NCERT-dependent chapter list is marked accordingly.
7. **Blueprints** (AGENTS.md §5.1 step 3) are not started. The exam_notes in every file already carry the board-paper pattern (sections, marks, word limits, competency mix) for the assessment-designer.
8. Scheme notes for Classes 7–8 cover only Hindi, English, Sanskrit and Urdu as languages. Schools choose other regional languages at the middle stage from state textbooks, so these are not catalogued individually; this is noted on `cbse-7-urdu` and `cbse-8-urdu`.

## Needs from owner

- **NCERT contents pages, or PDFs placed in `platform/catalog/sources/`**, for: Class 9 *Kaveri* (English), the new Class 9 Hindi and Sanskrit books, *Malhar* 7/8, *Deepakam* 7/8, *Poorvi* 7/8, *Curiosity* 8 (chapters 11–13), *Exploring Society* 8 Part 2 (chapter order), Kshitij-2, Sparsh-2, Aroh-1/2, Antra-1/2 and *Abhivyakti aur Madhyam* (lesson titles). ncert.nic.in is unreachable from the build machine.
- None of the other remaining work blocks on the owner.
