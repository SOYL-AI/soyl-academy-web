# curriculum-architect + hindi-specialist (CBSE languages) — M1 language syllabi — 2026-10-26

Status: **done** for Classes 9, 10, 11 and 12. Every CBSE language subject that CBSE publishes a 2026-27 syllabus for now has a `syllabus.yaml`. The 155 new files hold 2,001 chapters and 4,600 topics.

The only language subjects in `subjects.yaml` still without a file are these:
- `cbse-10-konkani`, `cbse-10-maithili`, `cbse-10-dogri` and `cbse-10-santhali`. CBSE's 2026-27 documents cover Class IX only (see the findings below).
- Classes 7–8 Sanskrit and Urdu. These are Wave 3 and were outside this brief.

Branch: `platform/curriculum-cbse/m1-languages` (worktree `C:/Users/Prabhu/soyl-wt/curriculum-cbse-m1-languages`). It merges `origin/platform/main`, which includes the CBSE language blueprints. Each `syllabus.yaml` sits next to its `blueprints/` folder.

## What changed

| Path | What |
|---|---|
| `platform/catalog/cbse/{9,10,11,12}/<lang>/syllabus.yaml` | 155 language syllabus files (lists below) |
| `platform/catalog/sources/cbse.md` | New section "Language syllabus documents (M1 languages)". It adds one anchor per language document: 43 `cbse-x-*`, 35 `cbse-xii-*` (shared by Class 11) and 43 `cbse-ix-*`, each with URL, publisher, year and fetch date. |
| `docs/platform/handoffs/2026-10-26-curriculum-cbse-languages-m1.md` | This note |

No official PDFs are committed. They stay in `C:/Users/Prabhu/soyl-wt/_downloads/cbse/all/`.

### Conventions used (same as M0 Hindi and Sanskrit)

- **Chapter order** follows the curriculum's sections:
  - reading (unseen and seen passages)
  - writing tasks (letters, essays, notices and so on, as CBSE specifies)
  - grammar items
  - then each prescribed book's lessons, one chapter per lesson where CBSE lists lessons
- **Units** are CBSE's sections with their marks. `marks: null` is used where CBSE prints none: Tangkhul, Kashmiri, Kannada 9/11, Marathi 11, and some Telugu Telangana 11/12 sections.
- **Titles** are in the language's own script, with `title_en` on every chapter and topic. Foreign languages use the language itself, for example Cyrillic for Russian and kana/kanji for Japanese.
- **Learning outcomes** are in English, except Sanskrit (Sanskrit, as in `10/sanskrit`) and English Elective (English).
- **Literature:** `literature_texts` give the title and author only; no text is reproduced. Excluded lessons go in `removed_topics`. Internally assessed parts carry `board_assessed: false`, for example Urdu Core/Elective listening and speaking, Sanskrit Communicative lessons 10–11, the English Elective seminar, Marathi reading-only lessons and Japanese 11 culture.
- **Placeholder chapters:** where CBSE names a textbook but not its lessons, the book is a single chapter. Its topic's `title_en` contains "lesson list pending …". These files stay `verified`, because everything else in them comes from CBSE. Search for `pending` to find them.
- **`unverified`** marks a file that contains content not taken from the CBSE document. This applies only to Manipuri; see below.
- **Classes 9 and 11:**
  - Class 11 files cite the XI–XII document and cover its Class XI portion.
  - Class 9 files follow the 2026-27 R1/R2/R3 scheme. Level differences are recorded in `exam_notes`. There is no board exam, so `has_board_exam` is false in `subjects.yaml`.

## Files added (155)

The three categories:
- **verified:** every item comes from the CBSE 2026-27 PDF.
- **placeholder:** verified, but one or more books have no lesson list.
- **unverified:** contains spellings or labels of my own.

| Class | Files | verified | placeholder | unverified |
|---|---|---|---|---|
| 10 | 40 | 34 — assamese, bahasa-melayu, bengali, bhutia, bodo, french, german, gujarati, gurung, japanese, kannada, kashmiri, kokborok, lepcha, limboo, malayalam, marathi, mizo, nepali, odia, persian, punjabi, rai, sanskrit-communicative, sherpa, sindhi, spanish, tamang, tamil, tangkhul, telugu-ap, telugu-telangana, thai, tibetan | 5 — arabic, bhoti, russian, urdu-a, urdu-b | 1 — manipuri |
| 12 | 36 | 29 — assamese, bengali, bhutia, bodo, english-elective, german, gujarati, japanese, kannada, kashmiri, kokborok, lepcha, limboo, malayalam, marathi, mizo, nepali, odia, persian, punjabi, sanskrit-core, sanskrit-elective, sindhi, spanish, tamil, tangkhul, telugu-ap, telugu-telangana, tibetan | 6 — arabic, bhoti, french, russian, urdu-core, urdu-elective | 1 — manipuri |
| 11 | 36 | 29 — the same 29 as Class 12 | 6 — the same 6 as Class 12 | 1 — manipuri |
| 9 | 43 | 34 — assamese, bahasa-melayu, bengali, bhutia, bodo, french, german, gujarati, gurung, japanese, kannada, kashmiri, kokborok, konkani, lepcha, limboo, malayalam, marathi, mizo, nepali, odia, persian, punjabi, rai, santhali, sherpa, sindhi, spanish, tamang, tamil, tangkhul, telugu-ap, telugu-telangana, thai | 8 — arabic, bhoti, dogri, maithili, russian, sanskrit, tibetan, urdu | 1 — manipuri |

Class 9 Sanskrit, which M0 left out, now exists. Its full question-paper design and all grammar items come from the CBSE document, and CBSE still lists the textbook and lessons as "शीघ्रमेव सूचयिष्यन्ते" (to be notified soon).

## How to verify

1. **Real pipeline.** From `platform/`, run `npm install`, then `npm run content -- catalog`. On the final commit it prints `catalog valid: 0 error(s), 0 warning(s)`.
2. **Scratch validator** (outside the repo): `C:/Users/Prabhu/AppData/Local/Temp/claude/…/scratchpad/langm1/validate.ts`, run with `npx tsx validate.ts`. It imports `platform/shared/content/catalog.ts` by file URL and parses each file with js-yaml. On top of the zod schema it checks:
   - the path matches the subject id, and the subject exists in `subjects.yaml`
   - chapter and topic ids are in order and unique across all files
   - every `unit` appears in `units[]`
   - every topic has learning outcomes
   - every language chapter and topic has a `title_en`
   - every `sources` anchor exists in `sources/cbse.md`
   - text is NFC and contains no U+FFFD
   - chapter titles are in the subject's script. Exceptions: Sindhi and Santhali may use Devanagari, and titles printed by CBSE in Roman script are allowed.

   Output on the final commit:

   ```
   subjects.yaml: 448 subjects OK
   ok   10/arabic/syllabus.yaml (… one line per file …)
   321 syllabus files; 3813 chapters, 10817 topics; errors: 0
   ```

   The 321 files are all CBSE files, including the electives merged from main. The 155 language files account for 2,001 chapters and 4,600 topics.

## Findings for the Lead / errors in `subjects.yaml` (not edited — not my path)

1. **Sindhi (008, 108) script.** CBSE prints the Sindhi syllabi in **Devanagari**, so the files follow CBSE. `subjects.yaml` says `script: Arab` and should be `Deva`.
2. **Santhali (167) script.** CBSE prints Santhali in **Devanagari**, but `subjects.yaml` says `Olck`.
3. **Class 10 Konkani (168), Maithili (169), Dogri (170) and Santhali (167).** The 2026-27 CBSE PDFs for these codes say "Class IX (2026-27)" only, and the languages appear only in the new Class IX Table 5. These languages probably reach Class X only in 2027-28. Suggest removing the `cbse-10-*` entries, or marking them not offered in 2026-27. The blueprints agent created `blueprints/` folders for them, and those folders have no syllabus.
4. **Manipuri (011, 111) script.** CBSE prints only Roman transliterations, so `Mtei` cannot be confirmed. The Meitei Mayek titles are my own renderings, which is why the files are `unverified`.
5. **Roman-script titles.** For Sherpa, Bhutia, Limboo, Lepcha, Rai, Gurung and Tamang, CBSE prints titles only in Roman script, and it uses a legacy font for Limboo and Lepcha. These files keep CBSE's Roman titles, with Tibetan script used where it could be identified. Native-script titles still need a reviewer.
6. **Tili Kannada (171).** The Kannada Class IX PDF also contains a separate Tili Kannada syllabus, which is not in `subjects.yaml`.
7. **CBSE inconsistencies.** Each is recorded in the file's `exam_notes` or header:
   - Tamil XI–XII prints the same book name ("Melnilai Irandaam Aandu") for both classes.
   - Sherpa, Kokborok 9/10, Limboo 9/10 and Lepcha 10 each have two mark tables that disagree.
   - Mizo 12 Section A is labelled 20 marks, but its items add up to 15.
   - The Odia "non-detailed" section does not say which lessons it covers.
8. **From the blueprints agent, not acted on (outside my paths).** The `12/hindi-core` `exam_notes` should read: Q4 is 4 of 5 at 2 marks (~40 words), and Q5 is 2 of 3 at 4 marks (~80 words).

## Needs from owner

- **Textbook contents pages** for the placeholder chapters (NCERT, or the state board where named):
  - Urdu:
    - *Nawa-e-Urdu* X and *Gulzar-e-Urdu* X (Urdu A)
    - *Jaan Pehchaan* Part 5 (Urdu B)
    - *Nai Awaaz* XI/XII (Urdu Core)
    - *Gulistan-e-Adab* XI/XII and *Khayaban-e-Urdu* (Urdu Elective)
    - *Jamna* (Urdu IX)
  - Arabic: *Minhaj al-Ta'lim al-Thanawi* (IX–X and XI–XII)
  - Bhoti: the UT Ladakh Bhoti textbooks for IX–XII
  - French: Mauger, *Cours de Langue et de Civilisation Françaises* II (French XI–XII)
  - Russian: *Russkii Yazyk* (Vityutnev), Books 3, V and VI
  - Maithili: *Praveshika*, *Maithili Gadya-Padya Sangrah* Part 1 and *Mithilak Dharohar* Part 1
  - Dogri: *Paungar* (JKBOSE)
  - Sanskrit IX: the textbook itself, which CBSE has not yet notified
- **Native-speaker review** of titles that CBSE printed only in Roman script and that we transliterated. Each is flagged "(… to be verified)" in `title_en` or in the file header:
  - Manipuri (all 4 files)
  - Kashmiri lesson titles (transcribed from a scan)
  - Nepali, Persian and Odia spellings
  - Telugu AP 9/12 and Telugu Telangana 9
  - Kannada 11/12 and Malayalam 12
  - Urdu XI–XII deleted-lesson titles
  - Tibetan-script spellings for Bhutia, Sherpa, Tibetan and Bhoti
  - the Bodo, Konkani and Dogri section labels
  - Santali titles

## Known gaps / follow-ups

- Classes 7–8 Sanskrit and Urdu (Wave 3) are not written.
- Placeholder chapters (listed above) need lesson lists before the pipeline can produce lesson-level content for those books. Grammar, reading and writing chapters can be produced now.
- Scratch generators, page images and the validator are in `scratchpad/langm1/`: `a-gen.mjs`, `b-gen/`, `c-gen.mjs`, `d-gen/`, `render.mjs` (pdfjs plus @napi-rs/canvas, which renders legacy-font PDFs to PNG; poppler is not installed) and `validate.ts`.
