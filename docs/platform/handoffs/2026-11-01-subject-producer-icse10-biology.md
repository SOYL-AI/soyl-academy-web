# subject-producer — ICSE Class 10 Biology — 2026-11-01

Status: done. ICSE 10 Biology ch01–ch16 are hand-authored, gated and committed, one commit per chapter.
Branch: `platform/subject-producer/icse-10-biology`, in worktree `C:/Users/Prabhu/soyl-wt/content-icse10-biology`, created from `platform/main` 36babbf. Not pushed, not merged and not rebased.

## Style and blueprints
- **Pattern source:** the ICSE 2027 Biology specimen paper (523), already recorded in `platform/catalog/sources/cisce.md` (`icse-2027-specimen-523-biology`). It was read for pattern only. No catalog change was needed.
- **Blueprints:** the chapter tests use the subject's own `catalog/cisce/icse-10/biology/blueprints/chapter-test-short.yaml` and `-long.yaml`, item for item.
  - **Short test** (20 marks, 30 min):
    - A: 4 MCQs, 1 assertion-reason item, three 1-mark answers and one 2-mark answer.
    - B: two 10-mark case questions; candidates attempt 1.
  - **Long test** (40 marks, 60 min):
    - A: 6 MCQs, 1 assertion-reason item, three 1-mark answers, a 5-blank fill-in passage and a 5-pair lettered-diagram match.
    - B: three 10-mark case questions; candidates attempt 2.
- **Authoring library:** `icse-10-biology-ch01/src/lib.mjs`, shared by every chapter. It was adapted from `isc-12-biology-ch01/src/lib.mjs` (same author) by `scratchpad/isc-bio/icse/patchlib.cjs`. The changes:
  - ICSE ids and units (`q_icse10bio_chNN_###`, `t_icse10bio_chNN_short|long`).
  - Assertion-reason options in the specimen's order: (a) A true, R false; (b) A false, R true; (c) both true, R explains; (d) both true, R does not explain.
  - 1-mark terms and odd-one-out answers carry no word limit.
  - Class 10 word bands: 2 marks 20–45 words, 3 marks 35–70 words.
  - Fill-ins can have 5 blanks, scored 1 mark per blank.
  - Matches can have up to 6 pairs.
  - Case stems can be overridden ("Study the diagram…").
  - An ICSE `buildTests` that enforces both blueprints.
- **Specimen features covered:** biological terms; odd one out with its category; give-reason items; differences; functions; neat labelled diagrams; experiment-based case questions; and lettered diagrams (A–E) for the matches and for diagram cases.

## Chapters
Each folder `platform/content/authored/biology/icse-10-biology-chNN/` holds:
- `release.json`;
- `tests.json` — the two tests are disjoint, and no deck-check item appears in a test;
- `README.md` — scope, shape, bank statistics, the verifier pass and a "For a reviewer" list;
- `src/` — `calc`, `svgs`, `decks`, `study`, `questions` and `build`. Builds are deterministic, and a rebuild leaves the tree clean.

All items are `status: "draft"`, provenance `human`.

Who wrote what:
- ch01–ch03 by the subject-producer.
- ch04–ch05 and ch12–ch16 by sub-agent B.
- ch06–ch11 by sub-agent A.

Both sub-agents worked to the ch01 template and lib. The producer reviewed their work and ran the gates.

| Chapter | Commit | Decks (slides) | Questions | Cases (10 marks) | Application or higher | d4 | Flashcards | Distinct SVGs |
|---|---|---|---|---|---|---|---|---|
| ch01 Cell Cycle, Cell Division and Structure of Chromosomes | f015214 | 2 (14 + 14) | 70 | 6 | 49% | 1 | 30 | 6 |
| ch02 Genetics | c0b3298 | 2 (14 + 14) | 62 | 6 | 60% | 2 | 30 | 6 |
| ch03 Absorption by Roots and the Ascent of Sap | 76c774e | 2 (14 + 14) | 62 | 6 | 52% | 2 | 30 | 8 |
| ch04 Transpiration | 5b4bd45 | 2 (14 + 14) | 65 | 6 | 48% | 1 | 30 | 7 |
| ch05 Photosynthesis | 92785a9 | 2 (15 + 15) | 66 | 6 | 47% | 2 | 30 | 10 |
| ch06 Chemical Coordination in Plants | 795d5f1 | 2 (15 + 15) | 66 | 6 | 55% | 1 | 30 | 6 |
| ch07 Circulatory System: Blood and Lymph | b37ab66 | 2 (16 + 16) | 71 | 6 | 46% | 1 | 30 | 6 |
| ch08 Circulatory System: Heart, Blood Vessels and Circulation | 8e2e464 | 2 (16 + 16) | 72 | 6 | 47% | 2 | 30 | 6 |
| ch09 Excretory System | 14991ad | 2 (14 + 14) | 70 | 6 | 47% | 1 | 30 | 6 |
| ch10 Nervous System | 8e3de6f | 2 (16 + 15) | 67 | 6 | 49% | 1 | 30 | 7 |
| ch11 Sense Organs: Eye and Ear | 983a022 | 2 (16 + 16) | 72 | 6 | 47% | 1 | 30 | 9 |
| ch12 Endocrine System | 5230a7a | 2 (14 + 15) | 70 | 6 | 49% | 2 | 30 | 5 |
| ch13 Reproductive System | bbaaec2 | 2 (14 + 16) | 68 | 6 | 47% | 1 | 30 | 8 |
| ch14 Population | c985629 | 2 (13 + 13) | 63 | 6 | 51% | 1 | 30 | 5 |
| ch15 Human Evolution | 0badc6d | 2 (13 + 15) | 62 | 6 | 48% | 1 | 30 | 5 |
| ch16 Pollution | 169a51d | 2 (13 + 15) | 68 | 6 | 47% | 1 | 30 | 7 |

Totals: 16 chapters, 1,074 questions (96 of them 10-mark case questions), 32 decks, 32 chapter tests, 480 flashcards.

- **Removed topics are respected.** None of the following is taught or asked:
  - the stages of meiosis (ch01);
  - the dihybrid genotypic ratio, and sex-linked disorders other than haemophilia and colour blindness (ch02);
  - detailed dark-reaction equations (ch05);
  - vessel names beyond the main vessels of the heart, liver and kidney (ch07, ch08);
  - ray diagrams other than those for myopia and hypermetropia (ch11).
- **Computed values:** every computed value comes from each chapter's `calc.mjs` and is asserted there. Examples: Punnett ratios and X-linked probabilities from the ISC 12 Punnett engine (copied, same author); osmosis readings; cardiac output; filtration figures; growth rates; and Census-based rises.
- **Originality:**
  - An exact-stem check (`scratchpad/isc-bio/icse/stemdup.cjs`) runs against every authored bank, including CBSE 10 Science and CBSE/ISC 12 Biology.
  - `originality --authored` reports 0 errors.
  - Collisions found and rewritten:
    - ch01 vs CBSE 10 Science ch08 ("A gene is best described as");
    - ch09/ch10 vs ch01 ("Name the part labelled B.");
    - one repeated stem inside ch11.
- **Diagrams:** every SVG was rendered with Playwright and checked by eye. Labels, overlaps and clipping were fixed after rendering in most chapters; each README's "Verifier pass" lists its fixes.

## How to verify
Run from `platform/` in the worktree, under `_tools/heavy.sh`, using script `scratchpad/isc-bio/icse/gates.sh`. The chapters were gated in four batches on 2026-11-01:
- ch01 at 06:49;
- ch06–ch09 and ch12–ch16 at 12:08;
- ch02, ch03, ch10 and ch11 at 12:27;
- ch04 and ch05 at 12:46.

Every chapter was committed only after its own batch passed and a rebuild produced byte-identical output.
```
npm test -w @soyl/content-templates            # all exemplar checks pass (latest run: Tests 2227 passed (2227))
npm run content -- catalog                     # catalog valid: 0 error(s), 0 warning(s)
npm run content -- lint --exemplars            # ok icse-10-biology-ch01..ch16: 0 error(s), 0 warning(s)
npm run content -- verify --board cisce --class 10 --subject biology --authored
                                               # 16 unit(s), 1074 questions, 0 blocking flag(s); every unit 0 blocking + 0 minor
npm run content -- originality --authored      # 0 error(s) (318 units)
npx vitest run --root db test/db6-split.test.ts   # 8 passed
npx vitest run --root api test/content.test.ts    # 13 passed
```

## Facts for a reviewer
Every chapter README has a "For a reviewer" list. The main points:
- **ch02:** X-linked alleles are written as superscripts; haemophilia types A and B are not distinguished.
- **ch04:** the 98.8 per cent of absorbed water transpired is computed from imagined data (textbooks say 98–99 per cent); potassium ion exchange is in outline only.
- **ch05:**
  - The equation uses the ICSE form with 12 H₂O in and 6 H₂O out.
  - NADPH is written for the older NADPH₂.
  - The dark phase is in outline only; the Calvin cycle is not named.
  - The carbon cycle leaves out oceans and rocks.
- **ch06:**
  - Abscisic acid is credited with leaf fall and bud dormancy.
  - Ethylene is grouped with the growth inhibitors (ICSE convention).
- **ch07:** typical blood-count values and cell lifespans; the anti-Rh injection is given "within three days" of delivery.
- **ch08:**
  - Cardiac cycle 0.1 + 0.3 + 0.4 s.
  - Stroke volume 70 mL at 72 beats per minute.
  - Lubb and dub assigned to the valves.
- **ch09:**
  - Filtration 125 mL/min (180 L a day) and urine 1.5 L a day.
  - Plasma, filtrate and urine concentration table.
  - Secretion placed in the distal tubule.
- **ch10:** impulse speeds; 12 pairs of cranial and 31 pairs of spinal nerves; reflex examples.
- **ch11:**
  - Fields of view 150° per eye and 120° overlap.
  - Myopia far point 200 cm.
  - Presbyopia and astigmatism wording.
- **ch12:**
  - Blood sugar 80–120 mg per 100 mL (textbook band).
  - A testis appears as gland E in the lettered figure, although it is not one of the four syllabus glands.
- **ch13:**
  - Gestation 280 days counted from the last menstruation.
  - The idealised 28-day cycle; age-appropriate wording.
- **ch14 (time-sensitive):**
  - UN world-population milestones up to 8 billion in 2022.
  - Census of India figures to 2011 only, as of 2026.
  - A difficulty-4 MCQ relies on the 1991–2001 rise (18.3 crore) exceeding the 2001–2011 rise (18.2 crore). The official figures keep this order, but only just.
- **ch15:**
  - Cranial capacities are approximate textbook values.
  - "First user of fire" and "first tool-maker" are textbook attributions.
  - Lamarck 1809, Darwin 1859.
- **ch16 (time-sensitive):**
  - BS-VI across India since April 2020.
  - Single-use plastic ban from 1 July 2022 (notes only).
  - Swachh Bharat Abhiyan launched 2 October 2014.
  - Bio-Medical Waste Management Rules, 2016.
  - Noise limits and rain pH.

## Known gaps / follow-ups
- Narration audio (TTS) has not been generated, as for the other hand-authored subjects.
- Practical work (internal assessment, 20 marks) is not modelled. Its experiments appear as theory-paper case questions.
- The ICSE 10 Biology board and unit-test papers are not assembled here; the chapter banks supply the items.

## Decisions made
- The ICSE 10 Biology lib lives in ch01 and is shared by every chapter, following the ISC 12 Biology layout. Only content paths were changed, so no ADR is needed.

## Needs from owner
None.
