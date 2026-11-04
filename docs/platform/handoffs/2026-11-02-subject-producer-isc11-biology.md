# subject-producer — ISC Class 11 Biology (and ISC 11 default blueprints) — 2026-11-02 to 2026-11-04

Status: done.
- **Step 1 (ISC 11 default blueprints):** committed separately and already merged.
- **Step 2 (ISC 11 Biology ch01–ch21):** every chapter is written, reviewed, gated and committed, one commit per chapter. Each commit was made only after a fully green gate run.

Branch `platform/subject-producer/isc-11-biology`, in worktree `C:/Users/Prabhu/soyl-wt/content-isc11-biology`. It was fast-forwarded to `platform/main` 44dbe07 on 2026-11-04, so the gates compare against the CBSE 11 Biology bank, and then `platform/main` was merged in at 852ea29. Nothing has been pushed, rebased, or merged into another branch.

## Step 1 — ISC Class 11 default blueprints (curriculum-architect role)
- Files: `platform/catalog/cisce/blueprints/11/chapter-test-short.yaml`, `chapter-test-long.yaml`, `unit-test.yaml`.
- They copy `isc-12-default-*` section for section: same sections, item types, marks and timing.
- Ids: `isc-11-default-*`, with `exam: isc`, `class: 11`, `source: lead-default`, `source_status: unverified`.
- Notes field: ISC Class 11 has no board examination, so these follow the ISC 12 paper shape for school examinations.
- **Checks:** `npm run content -- catalog` exits 0 with 0 errors and 0 warnings. `blueprintFor` was checked across all 70 `isc-11-*` subjects: all 210 lookups (short, long, unit test) resolve to the isc-11 defaults.
- Commit: 318c257.

## Step 2 — ISC 11 Biology under D-050
- **Library:** `isc-11-biology-ch01/src/lib.mjs`, shared by every chapter. It is copied from `isc-12-biology-ch01/src/lib.mjs` (same author) with these changes:
  - ISC 11 ids (`q_isc11bio_chNN_###`, `t_isc11bio_chNN_short|long`);
  - the `isc-11-default` chapter-test blueprints;
  - ISC assertion-reason options, where (d) is "both false";
  - `setChapter(nn, title, { author })`, which records the writer in provenance.
- **Scope:** the CISCE ISC 2028 syllabus, Class XI portion (`catalog/cisce/isc-11/biology/syllabus.yaml`). This is not NCERT. Every chapter's `removed_topics` is respected:
  - definitions only for bacterial conjugation, transduction and transformation;
  - no fungal life cycles;
  - no subtypes of racemose or cymose inflorescence;
  - glycolysis, Krebs cycle and ETS as flowcharts only.

  The listed scientists and abbreviations are folded into their chapters.
- **Style:** ISC school examinations matching the ISC 12 paper:
  - 1-mark objective items, including assertion-reason;
  - give-reason items;
  - lettered-diagram items;
  - 2- and 3-mark short answers;
  - 5-mark questions set in marked parts, with labelled diagrams.

  Chapter tests follow the isc-11 defaults:
  - **Short** (20 marks, 50 min): A = 4 MCQ + 1 AR; B = 2-mark items with choice; C = 3-mark items with choice; D = one 5-mark long answer.
  - **Long** (40 marks, 100 min): A = 10 MCQ + 2 AR; B and C with choice; D = 5-mark long answer, then 1 of 2.

## Who wrote each chapter (D-050)
- **Writers:** all 21 chapters were written by **Sonnet 5.5** writers (`model: "sonnet"`), at most two at a time, seven writers in all, three chapters each. Provenance author for every chapter: `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`.
- **Producer:** wrote the lib, the brief, the blueprints, the gates and this handoff, and reviewed every chapter. It did not write chapter content.
- **Review:** the producer rendered every SVG, read the biology, checked syllabus scope and computed values, ran the full gates and committed. Problems were fixed by the producer or sent back to the writer:
  - **ch09 (fixed by the producer):** the draft said blood from the lungs *and skin* enters the frog's left atrium. Corrected: the pulmonary veins return lung blood to the left atrium, and skin blood returns through the cutaneous veins with the body blood to the sinus venosus. This was a factual error. It is recorded in the ch09 README "For a reviewer" list.
  - **ch14 (sent back, fixed by the writer):** the ETS figure read as "H⁻", with a bold minus-like glyph; the labels were changed to plain-text "H⁺ (protons)". The cristae were drawn as free rods and were redrawn as infoldings of the inner membrane.
- **Opus fallback:** not used. No chapter needed heavy fixing, and none failed a gate for content reasons.

## Chapters
Each `platform/content/authored/biology/isc-11-biology-chNN/` holds:
- `release.json`;
- `tests.json` — the two tests are disjoint, and no deck-check item is used in a test;
- `README.md` — scope, shape, bank statistics, verifier pass and "For a reviewer";
- `src/` — `calc`, `svgs`, `decks`, `study`, `questions`, `build`. Builds are deterministic, and a rebuild leaves the tree clean.

All items are `status: "draft"`.

| Chapter | Commit | Decks (slides) | Questions | Cases | Application or higher | d4 | Flashcards | Distinct SVGs |
|---|---|---|---|---|---|---|---|---|
| ch01 The Living World | 1e5ed67 | 2 (17 + 17) | 72 | 2 | 50% | 1 | 30 | 5 |
| ch02 Biological Classification: Domains, Kingdoms and Monera | 93ef524 | 2 (18 + 16) | 77 | 2 | 51% | 1 | 30 | 5 |
| ch03 Protista, Fungi, Lichens and Viruses | 85959dd | 2 (15 + 17) | 86 | 2 | 47% | 1 | 30 | 6 |
| ch04 Plant Kingdom | 0800933 | 2 (16 + 18) | 84 | 1 | 46% | 1 | 30 | 6 |
| ch05 Animal Kingdom | eed73ec | 2 (17 + 16) | 88 | 1 | 59% | 1 | 30 | 8 |
| ch06 Morphology of Root, Stem and Leaf | 6fff764 | 2 (15 + 15) | 81 | 1 | 62% | 1 | 30 | 9 |
| ch07 Morphology of the Flower and Inflorescence | 5cb856d | 2 (15 + 15) | 87 | 0 | 54% | 1 | 30 | 9 |
| ch08 Anatomy of Flowering Plants | ee4b7e9 | 2 (15 + 17) | 81 | 0 | 46% | 1 | 30 | 11 |
| ch09 Structural Organisation in Animals: Frog | c248946 | 2 (18 + 14) | 78 | 0 | 49% | 1 | 30 | 10 |
| ch10 Cell: The Unit of Life | 7fce06f | 2 (18 + 17) | 72 | 2 | 53% | 2 | 30 | 9 |
| ch11 Biomolecules | 4af885f | 2 (17 + 17) | 79 | 2 | 51% | 2 | 30 | 9 |
| ch12 Cell Cycle and Cell Division | d870802 | 2 (15 + 15) | 74 | 2 | 53% | 1 | 30 | 9 |
| ch13 Photosynthesis in Higher Plants | 7b46bbe | 2 (17 + 18) | 81 | 0 | 48% | 2 | 30 | 9 |
| ch14 Respiration in Plants | 78b560d | 2 (15 + 18) | 76 | 0 | 51% | 1 | 30 | 7 |
| ch15 Plant Growth and Development | e3f0022 | 2 (17 + 16) | 88 | 0 | 48% | 1 | 30 | 7 |
| ch16 Breathing and Exchange of Gases | 77ec565 | 2 (17 + 18) | 77 | 2 | 55% | 1 | 30 | 8 |
| ch17 Body Fluids and Circulation | a46b022 | 2 (18 + 18) | 83 | 2 | 49% | 2 | 30 | 6 |
| ch18 Excretory Products and Their Elimination | c4c4fdb | 2 (18 + 18) | 79 | 1 | 48% | 1 | 30 | 6 |
| ch19 Locomotion and Movement | 9bb7fec | 2 (18 + 18) | 87 | 2 | 51% | 1 | 30 | 7 |
| ch20 Neural Control and Coordination | d60074e | 2 (18 + 17) | 78 | 2 | 51% | 1 | 30 | 9 |
| ch21 Chemical Coordination and Integration | 3b504a0 | 2 (17 + 18) | 86 | 2 | 49% | 1 | 30 | 8 |

**Totals:** 21 chapters, 1,694 questions, 42 decks, 42 chapter tests.

- **Computed values:** every computed value comes from each chapter's `calc.mjs` and is asserted there, including ratios, counts, spirometry, Hill-model curves, GFR sums, sarcomere lengths, feedback and glucose models, and ATP and RQ values. The asserts caught several hand-typed values before they reached any item (ch15 growth values, ch19 H-zone, ch21 feedback model).
- **Originality:**
  - Writers checked every chapter against the matching CBSE 11 chapter and avoided its set-ups.
  - The exact-stem check and `originality --authored` run against every authored bank, including CBSE 11, ISC 12, CBSE 12 and ICSE 10 Biology. Both report no duplicates and 0 errors.
  - Collisions with CBSE 11 caught during writing were reworded: a ch02 domain AR item, a ch13 cyclic-photophosphorylation stem and a ch14 EMP fill-in.

## How to verify
Run from `platform/` in the worktree, under `_tools/heavy.sh`, using script `scratchpad/isc-bio/isc11/gates.sh`. Commits came from three fully green runs:
- **2026-11-04 00:44:** ch01–ch09 present, all gates green. ch01–ch08 were committed from it. ch09 was re-gated after the producer's fix.
- **10:12:** all 21 units present, all gates green, content-templates 3508/3508. ch09–ch15, ch19 and ch20 were committed from it; these were the chapters unchanged since the run started.
- **10:33:** all gates green again (21 units, content-templates 3522/3522); ch16, ch17, ch18 and ch21 were committed from it. Their writers made final edits after 10:12, so these chapters were gated again.

```
npm test -w @soyl/content-templates            # all exemplar checks pass
npm run content -- catalog                     # catalog valid: 0 error(s), 0 warning(s)
npm run content -- lint --exemplars            # ok isc-11-biology-ch01..ch21: 0 error(s), 0 warning(s)
npm run content -- verify --board cisce --class 11 --subject biology --authored
                                               # 21 unit(s), 1,694 questions, 0 blocking flag(s); every unit 0 blocking + 0 minor
npm run content -- originality --authored      # 0 error(s)
npx vitest run --root db test/db6-split.test.ts   # 8 passed
npx vitest run --root api test/content.test.ts    # 13 passed (with 852ea29's 900 s leak-scan budget)
```

## Facts for a reviewer
Every chapter README has a full "For a reviewer" list. The main points:
- **ch01:** classification of man, housefly, mango and wheat as in the common Class XI table; Dicotyledonae (modern systems say eudicots); textbook chromosome numbers.
- **ch02:** the mesosome is drawn as ISC books do (often regarded as an artefact); Archaea are sister to Eukarya; Mycoplasma 0.1 µm.
- **ch03:** 4 basidiospores and 8 ascospores; TMV about 300 × 18 nm; endomycorrhiza as the VAM type; cadang-cadang viroid.
- **ch04:** the 64 spores per fern sporangium is a textbook value; books differ on whether Funaria's sex organs are on one plant; taxol and ephedrine are given as gymnosperm uses.
- **ch05:** arthropods are called haemocoelomate, following the syllabus (many books say coelomate); sponges have no true germ layers; Hemichordata are taught as non-chordates.
- **ch06:** the onion bulb is under leaf modifications, as the syllabus places it; thorns are stem modifications and Opuntia spines leaf modifications; beet is napiform.
- **ch07:** perigynous flowers have a half-inferior ovary; monothecous anthers.
- **ch08:** dicot stem drawn with 8 bundles; phloem parenchyma absent in the monocot stem only.
- **ch09:** the producer's circulation correction; a brief account of the systems.
- **ch10:**
  - Symport and antiport appear under facilitated diffusion in the syllabus, although the usual examples are active transport.
  - Chromosome-type cut-offs are approximate.
- **ch11:** eight essential amino acids, plus histidine for infants.
- **ch12:** centriole duplication is placed in S phase (some books say G2).
- **ch13:**
  - Spectra are schematic.
  - C4 photosynthesis costs 30 ATP per glucose.
  - Temperature optima: 20–25 °C for C3 plants, 30–45 °C for C4.
- **ch14:** 38 ATP (some books give 36; the newer figure is 32); RQ values; yeast stops at about 13 % alcohol.
- **ch15:** viviparous mangrove examples; Went curvature model.
- **ch16:**
  - Volume ranges.
  - The Hill-model dissociation curves are illustrative.
  - 1.34 mL O₂ per g haemoglobin is given in every stem that uses it.
- **ch17:**
  - Landsteiner 1900.
  - About 80–85 % of people are Rh-positive.
  - Cardiac cycle 0.1 / 0.3 / 0.4 s.
  - ECG paper speed is stated in each stem.
- **ch18:**
  - GFR is about 125 mL/min; the worked sums use 120 and say so.
  - The net-filtration and clearance formulas are given in the stems; they are physiology rather than syllabus.
  - Erythropoietin attribution.
- **ch19:**
  - Axial skeleton of 80 bones (hyoid and ossicles counted in the skull).
  - Sarcomere model values.
  - The knee is treated as a hinge joint.
- **ch20:**
  - Membrane potentials and conduction speeds are illustrative.
  - Some items (ouabain, botulinum) go slightly beyond the syllabus wording, applying the principles taught in the notes.
- **ch21:**
  - Fasting glucose 70–110 mg/dL (some books give 80–120).
  - The feedback model is illustrative.
  - Thyroid hormones act on nuclear receptors.

## Known gaps / follow-ups
- Narration audio (TTS) has not been generated, as for the other hand-authored subjects.
- Paper II (practical, project and practical file, 30 marks) is out of scope.
- Within each chapter test, topics inevitably overlap. Writers and the producer checked that no stem states another item's answer, but a reviewer may want a final read.

## Decisions made
- The ISC 11 lib lives in ch01 and is shared, following the ISC 12 Biology layout.
- The ISC 11 default blueprints are copies of the ISC 12 defaults, marked unverified.
- Only content and catalog paths changed, so no ADR is needed.

## Needs from owner
None.
