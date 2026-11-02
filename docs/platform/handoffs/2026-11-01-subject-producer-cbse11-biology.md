# subject-producer — CBSE Class 11 Biology — 2026-11-01 to 2026-11-02

Status: done. CBSE 11 Biology ch01–ch20 are hand-authored, reviewed, gated and committed (one commit per chapter, each only after a fully green gate run).
Branch: `platform/subject-producer/cbse-11-biology` (worktree `C:/Users/Prabhu/soyl-wt/content-cbse11-biology`, from `platform/main` 1a353c4). Not pushed, not merged, not rebased.

## Blueprints, library and style
- **Blueprints:** the subject folder `catalog/cbse/11/biology/blueprints/` holds only annual and half-yearly papers. Chapter tests therefore use the class defaults `cbse-11-default-chapter-test-short` / `-long` (`catalog/cbse/blueprints/11/`), which have the same shape as the class-12 defaults:
  - **Short** (20 marks, 40 min): A has 3 MCQs and 1 assertion-reason; B has two 2-mark and one 3-mark short answers; C has two 5-mark long answers (attempt 1); D has one 4-mark case.
  - **Long** (40 marks, 90 min): A has 8 MCQs and 2 assertion-reason; B has 2-mark and 3-mark short answers with two internal choices; C has 5-mark long answers (one compulsory, then 1 of 2); D has two 4-mark cases.
- **Library:** `cbse-11-biology-ch01/src/lib.mjs` is shared by every chapter. It is copied from `cbse-12-biology-ch01/src/lib.mjs` (same author) with CBSE 11 ids (`q_cbse11bio_chNN_###`, `t_cbse11bio_chNN_short|long`) and the class-11 blueprint ids.
  - One addition: `setChapter(nn, title, { author })` records which writer authored a chapter in every provenance block.
- **Style:** school examinations in the CBSE pattern (Class 11 has no board exam). Scope is the 2026–27 rationalised syllabus in `catalog/cbse/11/biology/syllabus.yaml`.
  - Transport in Plants and Mineral Nutrition are deleted and are not taught.
  - ch20 Digestion and Absorption is CBSE reading material (formative assessment only). It is authored in full and its README says so.
- **API content fixture:** handles `cbse-11-*` units (it maps `cbse-<class>-<subject>`); `api/test/content.test.ts` passes.

## Who wrote each chapter (owner instruction of 2026-11-01 22:10 IST)
From 22:10 on 1 November, every chapter was written by a **Sonnet 5.5** writer (`model: "sonnet"`), at most two at a time. The producer did not author chapters after that. It reviewed each returned chapter (biology facts, syllabus scope, every rendered diagram, computed values), ran the full gates and committed.

Chapters started earlier by Opus sub-agents were finished as follows:

| Chapter | Writer |
|---|---|
| ch01, ch02, ch03, ch04, ch05, ch06, ch11, ch12, ch13 | Sonnet 5.5 (provenance author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`) |
| ch10 | Sonnet 5.5; `calc.mjs` and `svgs.mjs` were begun by an Opus sub-agent before the instruction, then reviewed and kept by the Sonnet writer |
| ch14 | Opus sub-agent (all content files, before the instruction); a Sonnet writer added `build.mjs`, a lettered figure with two items and the README (provenance author kept as Opus) |
| ch07, ch08, ch09, ch15, ch16, ch17, ch18, ch19, ch20 | Opus sub-agents (written before the instruction) |

No Sonnet chapter needed heavy fixing or failed gates for content reasons, so the Opus fallback was not used. The producer's review found no factual errors to send back. Writers fixed their own build, word-limit, competency and layout findings before returning, and each README's "Verifier pass" lists them.

## Chapters
Each `platform/content/authored/biology/cbse-11-biology-chNN/` has:
- `release.json`;
- `tests.json` (the two tests are disjoint, and no deck-check item appears in a test);
- `README.md` (scope, shape, bank statistics, verifier pass, "For a reviewer");
- `src/` (`calc`, `svgs`, `decks`, `study`, `questions`, `build`). Builds are deterministic and a rebuild leaves the tree clean.

All items are `status: "draft"`.

| Chapter | Commit | Decks (slides) | Questions | Cases | Application or higher | d4 | Flashcards | Distinct SVGs |
|---|---|---|---|---|---|---|---|---|
| ch01 The Living World | — | 2 (15 + 16) | 79 | 4 | 53% | 1 | 30 | 5 |
| ch02 Biological Classification | — | 2 (17 + 18) | 105 | 4 | 54% | 1 | 30 | 7 |
| ch03 Plant Kingdom | — | 2 (18 + 17) | 82 | 4 | 51% | 1 | 30 | 11 |
| ch04 Animal Kingdom | — | 2 (18 + 16) | 107 | 4 | 50% | 1 | 30 | 9 |
| ch05 Morphology of Flowering Plants | — | 2 (18 + 18) | 78 | 4 | 47% | 1 | 32 | 7 |
| ch06 Anatomy of Flowering Plants | — | 2 (16 + 16) | 76 | 4 | 46% | 1 | 31 | 8 |
| ch07 Structural Organisation in Animals | — | 2 (16 + 16) | 68 | 4 | 49% | 1 | 30 | 7 |
| ch08 Cell: The Unit of Life | — | 2 (17 + 18) | 70 | 4 | 49% | 1 | 30 | 7 |
| ch09 Biomolecules | — | 2 (17 + 18) | 72 | 4 | 47% | 1 | 30 | 9 |
| ch10 Cell Cycle and Cell Division | — | 2 (16 + 17) | 82 | 4 | 52% | 1 | 30 | 8 |
| ch11 Photosynthesis in Higher Plants | — | 2 (16 + 17) | 94 | 4 | 47% | 1 | 30 | 10 |
| ch12 Respiration in Plants | — | 2 (16 + 17) | 90 | 4 | 47% | 1 | 30 | 7 |
| ch13 Plant Growth and Development | — | 2 (17 + 16) | 78 | 4 | 56% | 1 | 32 | 4 |
| ch14 Breathing and Exchange of Gases | — | 2 (18 + 16) | 72 | 4 | 51% | 2 | 30 | 6 |
| ch15 Body Fluids and Circulation | — | 2 (16 + 17) | 70 | 4 | 50% | 1 | 31 | 3 |
| ch16 Excretory Products and their Elimination | — | 2 (16 + 17) | 72 | 4 | 50% | 1 | 31 | 4 |
| ch17 Locomotion and Movement | — | 2 (16 + 16) | 68 | 4 | 51% | 2 | 30 | 5 |
| ch18 Neural Control and Coordination | — | 2 (16 + 15) | 70 | 4 | 51% | 2 | 30 | 6 |
| ch19 Chemical Coordination and Integration | — | 2 (18 + 18) | 67 | 4 | 51% | 2 | 30 | 4 |
| ch20 Digestion and Absorption | — | 2 (18 + 17) | 67 | 4 | 51% | 2 | 30 | 5 |

Totals: 20 chapters, 1,567 questions, 40 decks, 40 chapter tests.

- **Computed values:** every computed value (chromosome and DNA counts, ATP and RQ values, growth rates, respiratory volumes, cardiac output, GFR, magnifications and others) comes from each chapter's `calc.mjs` and is asserted there. Writers' asserts caught several wrong expected values before they reached any item (for example 16, not 18, ATP from 4 NADH + 2 FADH₂; tiger and lion share 6 of 7 ranks).
- **Originality:** fresh set-ups throughout.
  - An exact-stem check runs against every authored bank (CBSE 10 Science, CBSE/ISC 12 Biology, ICSE 10 Biology and the other subjects).
  - `originality --authored` reports 0 errors.
  - One ch12 match stem that duplicated ch20 was reworded.
- **Diagrams:** every SVG was rendered with Playwright and reviewed by the producer. Layout fixes are listed in the READMEs.

## How to verify
Run from `platform/` in the worktree under `_tools/heavy.sh`, using script `scratchpad/isc-bio/cbse11/gates.sh`. Runs on 2026-11-02:
- **07:43:** fully green with 17 units; ch01, 02, 07–12 and 14–20 were committed from it.
- **08:11:** fully green with all 20 units: content-templates 2605/2605; ch03, 04, 05, 06 and 13 were committed from it.

Two earlier runs were not fully green, and nothing was committed from them:
- 22:15, 1 Nov: content-templates failed because ch14 had no README yet.
- 22:57: green, but superseded by the provenance change.

```
npm test -w @soyl/content-templates            # all exemplar checks pass
npm run content -- catalog                     # catalog valid: 0 error(s), 0 warning(s)
npm run content -- lint --exemplars            # ok cbse-11-biology-ch01..ch20: 0 error(s), 0 warning(s)
npm run content -- verify --board cbse --class 11 --subject biology --authored
                                               # 20 unit(s), 1567 questions, 0 blocking flag(s); every unit 0 blocking + 0 minor
npm run content -- originality --authored      # 0 error(s)
npx vitest run --root db test/db6-split.test.ts   # 8 passed
npx vitest run --root api test/content.test.ts    # 13 passed
```

## Facts for a reviewer
Every chapter README has a full "For a reviewer" list. The main points are below.

**ch01**
- The three domains (Woese 1990) are in the syllabus but not in this NCERT chapter's main text.
- The biological species concept is added as an extension.
- ICBN naming follows the textbook.

**ch02**
- Dates: Whittaker 1969, Ivanowsky 1892, Beijerinck 1898, Stanley 1935, Diener 1971.
- Viruses are kept outside the five kingdoms.
- The dikaryon is counted as n + n.

**ch03**
- Algal pigment lists follow NCERT.
- Seed-habit precursor note on Selaginella and Salvinia.
- The chromosome numbers used are illustrative.

**ch04**
- Porifera are cellular grade with no germ layers.
- Arthropods are called coelomate, as in NCERT.
- Cyclostome heart and fertilisation are marked "not stated".
- Crocodiles are the four-chambered exception among reptiles.

**ch05**
- Potato "eyes" are described as nodes with axillary buds.
- Floral-formula conventions; the bisexual sign is in plain text.
- Perigynous flowers have a half-inferior ovary.

**ch06**
- Secondary growth is not taught (not listed).
- The eight xylem arms and eight ring bundles drawn are the writer's choice.
- Casparian strips are suberin.

**ch08 to ch09**
- See their READMEs.

**ch10**
- Cycle times (24 h human, 90 min yeast).
- G0 examples.
- C-value convention after the dyad.

**ch11**
- Chromatogram band order and the Rf values are illustrative.
- CO₂ ranges.
- C3/C4 ATP per CO₂: 3 and 5.

**ch12**
- The 38-ATP textbook convention is used, with the newer 32 noted.
- 2870 kJ per mole of glucose and 30.5 kJ per mole of ATP.
- RQ values are computed (protein about 0.9, without an equation).

**ch13**
- Geometric growth uses W1 = W0 e^(rt).
- Kinetin from herring sperm DNA; foolish seedling disease; ethephon.
- Photoperiodism and vernalisation are not taught (not listed).

**ch14**
- Respiratory volumes: TV 500, IRV 3000, ERV 1100, RV 1200 (NCERT ranges).
- The oxygen-dissociation model values are illustrative.

**ch15 to ch20**
- See their READMEs (textbook values for blood, the cardiac cycle, GFR, the sarcomere, impulse speeds and hormones).

## Known gaps / follow-ups
- Narration audio (TTS) has not been generated, as for the other hand-authored subjects.
- Practical work (30 marks) is not modelled.
- The subject's annual and half-yearly papers are not assembled here.
- Chapter sizes vary (67–107 items). The Sonnet writers produced larger banks in some Unit I chapters, and these could be trimmed if wanted.

## Decisions made
- The lib in ch01 is shared, following the CBSE 12 Biology layout.
- `setChapter` gained an optional `author`, so provenance names the actual writer model.
- Only content paths changed, so no ADR is needed.

## Needs from owner
None.
