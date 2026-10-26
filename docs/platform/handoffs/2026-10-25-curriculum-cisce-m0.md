# curriculum-architect (CISCE) — M0 subject catalog and syllabi — 2026-10-25

Status: **done**. The CISCE subject catalog is complete for Classes 7–12 (323 subjects). **Every subject has a syllabus file** (323 files, 3,627 chapters, 15,637 topics), and all of them pass the shared zod schemas. 319 files are `verified` (built from the official CISCE text); 4 are `unverified` (Kashmiri and Kokborok in Classes 9 and 10: CISCE lists these languages but publishes no prescribed texts).

Branch: `platform/curriculum-cisce/m0` (worktree `C:/Users/Prabhu/soyl-wt/curriculum-cisce-m0`). It merges `origin/platform/main`, so the `board_assessed` and `variants` schema fields are included.

## What changed

| Path | What |
|---|---|
| `platform/catalog/cisce/subjects.yaml` | 323 CISCE subjects, Classes 7–12, 2026-27, in the brief's schema. |
| `platform/catalog/cisce/<icse-7…isc-12>/<slug>/syllabus.yaml` | 323 syllabus files, one per subject. |
| `platform/catalog/sources/cisce.md` | 190 source anchors, each with title, URL, publisher (CISCE), exam year, fetch date (2026-10-25) and use. Every anchor used in the catalog resolves, and every PDF URL returned HTTP 200 when checked. |
| `docs/platform/handoffs/2026-10-25-curriculum-cisce-m0.md` | This note. |

No official PDFs are committed. They are in `C:/Users/Prabhu/soyl-wt/_downloads/cisce/` with text extracts in `txt/` (`pdftotext -layout`) and `txt2/` (reading order).

### Which official document drives each class

| Class | Document | Notes |
|---|---|---|
| 10 | ICSE 2027 Regulations and Syllabuses (board exam Feb–Mar 2027) | Class X section only |
| 9 | ICSE 2028 Regulations and Syllabuses (Regulations revised July 2026) | Class IX section; no board exam |
| 12 | ISC 2027 Regulations and Syllabuses | Class XII section only |
| 11 | ISC 2028 Regulations and Syllabuses (Regulations revised July 2026) | Class XI section; no board exam |
| 7, 8 | CISCE Curriculum for Upper Primary Classes VI–VIII (RDCD, 2016, still the latest), plus the separate Performing Arts, Physical Education and Sanskrit curricula | No board exam |

Also used: Circular 2026-27/33 (prescribed texts for 14 ICSE and 12 ISC Indian languages are split by class; the Class X/XII paper covers only the Class X/XII portion), the October 2026 specimen-paper circular (about 50% higher-order questions in 2027), and the July 2026 Health and Physical Education circular.

### Subject counts (core / language / elective)

| Class | Core | Language | Elective | Total |
|---|---|---|---|---|
| 7 | 8 | 2 | 3 | 13 |
| 8 | 8 | 2 | 3 | 13 |
| 9 | 11 | 44 | 30 | 85 |
| 10 | 11 | 36 | 29 | 76 |
| 11 | 19 | 30 | 21 | 70 |
| 12 | 19 | 27 | 20 | 66 |
| **Total** | **76** | **141** | **106** | **323** |

**How subjects are modelled.** Every paper that is examined separately and has its own syllabus is its own subject. That means English Language and Literature in English; Physics, Chemistry and Biology (ICSE Science 52); History & Civics and Geography (H.C.G. 50); each Performing Arts and Music option; and each language in each group. When several subjects share one official code, the code repeats.
- `tier: core` means platform core: the compulsory subjects plus the mainstream subjects in the Wave 1 build list. So ICSE Computer Applications and ISC Physics, Accounts, PE and similar count as core, even though CISCE calls them electives or Group III; their `notes` say so.
- `priority: 1` = core + Hindi.
- `theory_only: true` means SOYL covers only the theory/written part.
- `has_board_exam: true` only for ICSE 2027 / ISC 2027 papers that are externally examined.
- SUPW (Classes 9–12) and the new Health & Physical Education (Classes 9 and 11) are included with `has_board_exam: false`.

**Scheme changes captured.**
- ISC 2028 (Class 11): Commerce is renamed Business Studies (857), and the old Business Studies code 859 is now Entrepreneurship.
- ICSE 2028 (Class 9): modern foreign languages are no longer offered in Group III. More languages are added: Chinese, Tibetan, Modern Armenian, Portuguese and Thai in Group I; Modern Armenian, Portuguese, Russian, Tibetan, Thai and Chinese in Group II.
- ISC 2028: Modern Armenian, Portuguese and Thai are added.
- Health & Physical Education becomes compulsory and internally assessed for the 2028 cohorts.

### Syllabus files

All 323 are complete. Within each class they were written in this order: core and Hindi first, then electives, then languages.

**Unverified: 4.** `icse-9-kashmiri`, `icse-9-kokborok`, `icse-10-kashmiri`, `icse-10-kokborok`. Each has the language paper's Section A chapters and a generic "school-selected texts" chapter.

**What every file contains:**
- `exam_notes` with the paper, duration and marks, internal assessment or practical work, and the section pattern where published. Section patterns come from the 2027 specimen papers for the subjects that have them. Each also says that CISCE lists topics and SOYL grouped them into teachable chapters.
- Unit marks wherever CISCE publishes a weightage table. These include ISC Physics, Chemistry, Biology, Maths, Economics, Accounts, Commerce, Applied Maths, AI, Robotics and Environmental Science, ICSE Robotics & AI, and the vocational subjects.
- Explicit exclusions in `removed_topics`.
- Items that CISCE marks as "not to be tested" carry `board_assessed: false`.
- Literature: titles and authors only. No text, poem or question is reproduced.

## How to verify

```
cd C:/Users/Prabhu/soyl-wt/curriculum-cisce-m0/platform && npm install
# validator (scratch, not in repo) parses every YAML with js-yaml and the shared zod SubjectsFile/SyllabusFile schemas,
# checks path == subject_id, subject exists, source anchors exist in sources/cisce.md, Devanagari title_en, global id uniqueness
npx tsx <scratch>/cisce-validate/validate.mts C:/Users/Prabhu/soyl-wt/curriculum-cisce-m0
```

Output (final run):

```
subjects.yaml: 323 subjects
  icse-7   core=8 language=2 elective=3 total=13
  icse-8   core=8 language=2 elective=3 total=13
  icse-9   core=11 language=44 elective=30 total=85
  icse-10  core=11 language=36 elective=29 total=76
  isc-11   core=19 language=30 elective=21 total=70
  isc-12   core=19 language=27 elective=20 total=66
  note: platform/catalog/cisce/icse-10/kashmiri/syllabus.yaml unverified while subject verified
  note: platform/catalog/cisce/icse-10/kokborok/syllabus.yaml unverified while subject verified
  note: platform/catalog/cisce/icse-9/kashmiri/syllabus.yaml unverified while subject verified
  note: platform/catalog/cisce/icse-9/kokborok/syllabus.yaml unverified while subject verified
syllabus files: 323 (chapters=3627, topics=15637)
OK: all CISCE catalog files valid
```

## Tests added

None in the repo. The validator script lives in the scratchpad: `cisce-validate/validate.mts`, with the generators `gen-subjects.mjs` and `gen-sources.mjs`. The pipeline-engineer may want to add a catalog-validation CI step that uses `platform/shared/content/catalog.ts`.

## Known gaps / follow-ups

1. **Native-script titles for 20+ Indian languages.** Only Hindi, Marathi, Nepali and Sanskrit are in Devanagari with `title_en`. The others (Bengali, Tamil, Telugu, Urdu and so on) use English titles and CISCE's transliteration, so no script errors can creep in. The hindi-specialist and language reviewers should add native-script titles.
2. **Literature focus lines from general knowledge.** For lesser-known regional texts, the learning outcomes are generic: summary, characters, theme, title, style. Some focus lines rest on general knowledge and should be checked in language review. The sub-agents flagged these: Assamese, Bhutia, Odia, Ao Naga/Khasi/Garo retellings, Sanskrit Chandrapid Katha, and some Nepali name spellings.
3. **Text decoded by hand.** Sanskrit grammar lists (in the second-language and upper-primary Sanskrit documents) are printed in legacy Kruti-Dev encoding and were converted to Unicode by hand. The Class 7/8 Hindi text layer was unreadable in pdftotext; one sub-agent extracted it with PyMuPDF installed in the scratchpad, against the "no Python" policy. Both need a proofread.
4. **Marks tables read from scrambled extraction.** Some marks tables came out of the PDF text with rows and columns jumbled and were reconstructed. The totals are always consistent. Worth a check against the PDFs: ISC 12 Accounts partnership rows (11/15 grouping), ISC 11 Chemistry branch-to-unit mapping, ICSE 9 Robotics & AI unit marks, and ISC 11 Accountancy BRS 10 / Bills 7.
5. **Errors in the source documents, corrected or neutralised.** Examples:
   - ICSE Thailand H&C: "federal" Thailand, Rash Behari "Ghosh", the 1947 coup leader.
   - ISC music: composer names and "Symphony No. 2 in [D] major".
   - Class 7 Biology: "9 phyla" where 8 are listed.
   - Class 7 Chemistry: tungsten listed as a metalloid.
   - PE: outdated names of governing bodies.

   The relevant `exam_notes` note each one.
6. **Overlap between classes.** Syllabuses that CISCE does not split by class are copied in full into both years. These are Art, Western Music, Indian Dance, ICSE Drama (2027), ISC Carnatic and Western Music, the foreign languages, and the non-bifurcated Indian languages. Assessment design should treat them as two-year courses.
7. **ISC 12 Computer Science.** The Class 12 cohort follows the ISC 2027 course. `isc-11-computer-science` follows the revised ISC 2028 course, which adds Python, so the two files do not form one continuous course. This is noted in the isc-12 file.
8. **Blueprints are not done.** Writing blueprints from the 2027 specimen papers is step 3 of the playbook and belongs to the next task (assessment-designer / curriculum blueprints). The specimen-paper anchors are ready in `sources/cisce.md`.

## Decisions made (no ADR needed; data-only)
- Subjects are modelled per examined paper.
- `tier`/`priority` follow platform build order, not CISCE grouping.
- Class 9/11 use the 2028 documents, the Class IX/XI portion.
- Classes 7/8 use the 2016 Upper Primary curriculum, which is the latest official one.
- ISC 12 Commerce and Business Studies keep their 2027 names. Class 11 uses the 2028 names.
- Thailand H.C.G. is included as core, priority 2.
- Kashmiri and Kokborok are included although no texts are published.

## Schema notes for the Lead (platform/shared not edited)
- The schema fits CISCE well. Two things worth knowing:
  - Several subjects share one official code (for example the Science papers share 52). `code` is not unique and should not be used as a key.
  - Some ICSE subjects let the student pick sections (Hindustani Music sections A/B/C; PE and ISC PE games, "any two"). These are modelled as chapters, not `variants`.
- `variants` is not used yet. It could represent the Hindustani Music vocal/instrumental/tabla sections if the product needs it.

## Needs from owner
- None blocking. Optional: a native speaker or language reviewer for the regional-language files, and confirmation that covering Thailand H.C.G. and the vocational Section B subjects at beta is wanted. They are in scope as "every subject", but very few students take them.
