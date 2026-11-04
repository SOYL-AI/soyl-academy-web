# subject-producer — ICSE Class 9 Biology — 2026-11-04

Status: done. ICSE 9 Biology ch01–ch14 are authored, reviewed, gated and committed, one commit per chapter.
Branch: `platform/subject-producer/icse-9-biology`, in worktree `C:/Users/Prabhu/soyl-wt/content-icse9-biology`, created from `platform/main` 447d233. Not pushed, not merged and not rebased.

## Who wrote what (D-050)
Every chapter was written by a **Sonnet sub-agent** (`claude-sonnet-5-5`). The subject-producer (Opus) wrote no chapter content. It did the following:
- adapted the shared lib;
- wrote the writer brief;
- reviewed biology facts, syllabus scope, removed topics, diagrams (every SVG rendered and checked by eye) and computed values;
- ran the gates and made the commits.

Every item's provenance author reads `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`.

| Chapters | Writer | Notes |
|---|---|---|
| ch01–ch03 | Sonnet writer (batch 1) | |
| ch04–ch06 | Sonnet writer (batch 2) | An earlier Sonnet writer, stopped by a session interruption, had left ch04 partly done (calc, decks, SVGs). It was kept, and the resumed Sonnet writer finished it. |
| ch07–ch09 | Sonnet writer (batch 3) | |
| ch10–ch12 | Sonnet writer (batch 4) | |
| ch13–ch14 | Sonnet writer (batch 5) | |

At most two writers ran at a time. The Opus quality fallback was **not needed**: no chapter needed heavy fixing, and none failed a gate for content reasons. Writers resumed after session limits continued their own work.

## Lib and blueprints
- **Authoring lib:** `icse-9-biology-ch01/src/lib.mjs`, committed with ch01 and shared by every chapter. It was made from the ICSE 10 Biology lib by `scratchpad/isc-bio/icse9/patchlib.cjs`. The changes:
  - ids `q_icse9bio_chNN_###` and `t_icse9bio_chNN_short|long`;
  - `mk.long({marks: 10, …})` for 10-mark structured questions, which open with a situation, a practical or a diagram, in 4 parts with a labelled-diagram part;
  - `setChapter(nn, title, {author})` sets the provenance author;
  - an ICSE 9 `buildTests` that enforces both blueprints.
  - Assertion-reason options keep the ICSE specimen order: (a) A true, R false; (b) A false, R true; (c) both true and R explains; (d) both true and R does not explain.
- **Blueprints:** `platform/catalog/cisce/blueprints/9/chapter-test-short.yaml` and `chapter-test-long.yaml`. No catalog change was needed.
  - **`icse-9-default-chapter-test-short`** (20 marks, 30 min):
    - A: 4 MCQs, 1 assertion-reason item, one 2-mark and one 3-mark answer.
    - B: two 10-mark structured questions; candidates attempt 1.
  - **`icse-9-default-chapter-test-long`** (40 marks, 60 min):
    - A: 7 MCQs, 1 assertion-reason item, three 2-mark and two 3-mark answers.
    - B: three 10-mark structured questions; candidates attempt 2.
- **Pattern source:** the ICSE 2027 Biology specimen paper (523), used for style only. Class 9 has no board paper.

## Chapters
Each folder `platform/content/authored/biology/icse-9-biology-chNN/` holds:
- `release.json`;
- `tests.json` — two tests that share no questions, and no deck-check item appears in a test;
- `README.md` — scope, shape, bank statistics, the verifier pass and a "For a reviewer" list;
- `src/` — `calc`, `svgs`, `decks`, `study`, `questions` and `build`.

Builds are deterministic: before the batch-2 gate, every chapter was rebuilt and its output was byte-identical. All items are `status: "draft"`, provenance `human`.

| Chapter | Commit | Decks (slides) | Questions | Structured (10 marks) | Application or higher | d4 | Flashcards | Distinct SVGs |
|---|---|---|---|---|---|---|---|---|
| ch01 The Cell: A Unit of Life | 60fc8c0 | 2 (14 + 16) | 66 | 6 | 52% | 1 | 30 | 6 |
| ch02 Tissues | 7f7536d | 2 (14 + 17) | 71 | 6 | 52% | 1 | 30 | 8 |
| ch03 The Flower | 0a0f083 | 2 (13 + 15) | 70 | 6 | 49% | 1 | 30 | 5 |
| ch04 Pollination and Fertilisation | bdd8b45 | 2 (15 + 14) | 73 | 7 | 49% | 1 | 30 | 6 |
| ch05 Seeds: Structure and Germination | d99bfab | 2 (14 + 14) | 71 | 6 | 52% | 1 | 30 | 6 |
| ch06 Respiration in Plants | c7bf161 | 2 (14 + 14) | 74 | 6 | 53% | 1 | 30 | 5 |
| ch07 Diversity in the Animal Kingdom | 5d3243c | 2 (18 + 15) | 74 | 7 | 58% | 1 | 30 | 7 |
| ch08 Economic Importance of Bacteria and Fungi | bd3d878 | 2 (14 + 16) | 79 | 7 | 52% | 1 | 30 | 6 |
| ch09 Nutrition: Food and Balanced Diet | 5843c3b | 2 (14 + 15) | 76 | 7 | 50% | 1 | 30 | 5 |
| ch10 Teeth and the Digestive System | c5089a7 | 2 (15 + 17) | 80 | 6 | 49% | 1 | 30 | 6 |
| ch11 Skeleton: Movement and Locomotion | 6b3c20c | 2 (15 + 15) | 75 | 6 | 49% | 1 | 30 | 6 |
| ch12 The Skin | cc4ac56 | 2 (15 + 16) | 76 | 6 | 54% | 1 | 30 | 4 |
| ch13 Diseases and their Transmission | 5e31494 | 2 (15 + 16) | 97 | 6 | 60% | 1 | 30 | 5 |
| ch14 Aids to Health and Health Organisations | 67bf87a | 2 (16 + 17) | 97 | 6 | 51% | 1 | 30 | 5 |

Totals: 14 chapters, 1,079 questions (88 of them 10-mark structured questions), 28 decks, 28 chapter tests (20 and 40 marks each), 420 flashcards.

- **Removed topics are respected.** These are not taught or asked:
  - industrial manufacture by fungi, and penicillin (ch08 — cheese appears only as ripening by moulds);
  - scientific names of causative agents (ch13 — checked by grep for common pathogen genus names: none);
  - "meaning only" for inflorescence and placentation (ch03).

  ch13 does name the vectors (female *Anopheles*, *Culex*, the tsetse fly), because the syllabus asks for vectors.
- **Computed values:** every number in a question comes from the chapter's `calc.mjs` and is asserted there. Examples:
  - ch09 breakfast energy: 60 g × 17 + 15 g × 17 + 10 g × 37 = 1,645 kJ;
  - ch08 bacterial doubling series;
  - ch12 sweat heat loss at 2.4 kJ per mL;
  - ch13 cases per 1,000 people;
  - ch14 antibody levels.
- **Originality:**
  - `originality --authored` reports 0 errors (525 units).
  - The writers ran an exact-stem check (`scratchpad/isc-bio/icse/stemdup.cjs`) against all authored banks.
  - Two ch13 odd-one-out stems that were 72% similar were reworded by the writer.
  - ch14 avoids the vaccine, serum and snake-bite set-ups already used in ch08.
- **Diagrams:** the producer rendered every chapter's SVGs (`scratchpad/isc-bio/icse/relraster.mjs`) and checked them by eye. No label, overlap or clipping defects were left. The writers' own render fixes are listed in each README's "Verifier pass".

## How to verify
Run from `platform/` in the worktree, under `_tools/heavy.sh`, with `scratchpad/isc-bio/icse9/gates.sh`. There were two gate runs on 2026-11-04 (IST):
- **Batch 1**, ch01–ch03: 18:49–18:56, exit 0.
- **Batch 2**, ch01–ch14: 21:01–21:06, exit 0.

Each chapter was committed only after a run in which every gate exited 0, with no chapter file newer than that run's start.

The commands, with batch 2 output:
```
npm test -w @soyl/content-templates            # Tests 3676 passed (3676)
npm run content -- catalog                     # catalog valid: 0 error(s), 0 warning(s)
npm run content -- lint --exemplars            # ok icse-9-biology-ch01..ch14: 0 error(s), 0 warning(s)
npm run content -- verify --board cisce --class 9 --subject biology --authored
                                               # 14 unit(s), 1079 questions, 0 blocking flag(s); every unit 0 blocking + 0 minor
npm run content -- originality --authored      # 525 unit(s), 0 error(s)
npx vitest run --root db test/db6-split.test.ts   # 8 passed
npx vitest run --root api test/content.test.ts    # 13 passed
```

## Facts for a reviewer
Every chapter README has a "For a reviewer" list. The main points:
- **ch01:**
  - Protoplasm is taken as cytoplasm plus nucleus.
  - Cell theory is credited to Schleiden, Schwann and Virchow, with no dates.
  - Cell sizes are approximate.
- **ch02:**
  - The ICSE three simple tissues; aerenchyma and chlorenchyma appear in the notes only.
  - Cardiac muscle has "usually one nucleus".
  - The impulse speed is illustrative.
- **ch03:**
  - A complete flower is always bisexual, but a bisexual flower may be incomplete (wheat).
  - Papaya is the dioecious example.
- **ch04:**
  - Self-pollination is taught within one flower; the notes add that pollen moved between flowers of the same plant (geitonogamy) is also treated as self-pollination. Books differ on this.
  - Example species vary by book: passion fruit for self-sterility, sunflower for protandry.
  - The embryo sac is the seven-cell, eight-nucleus type.
- **ch05:**
  - "Bean" means the French (kidney) bean, which is epigeal; the broad bean is hypogeal.
  - Pea, gram and maize are given as hypogeal.
  - The maize grain is a fruit; the aleurone layer is not drawn.
- **ch06:**
  - About 36 ATP per glucose in aerobic respiration (books give 36, 38 or 30–32) and 2 in anaerobic.
  - The link reaction and the electron transport chain are not taught.
  - The control is boiled seeds, not disinfectant-soaked seeds.
- **ch07:**
  - Eight non-chordate phyla and five chordate classes.
  - Reptiles have a three-chambered heart, with the crocodile as the exception in the notes.
  - Mammals are "mostly" viviparous.
- **ch08:**
  - *Streptomyces* is called a bacterium.
  - Nitrogen is about 78% of air.
  - No bacterial species are named for tea curing or tanning.
  - Four structured questions use a flow chart or a graph rather than an anatomical diagram for the diagram part.
- **ch09:**
  - Energy values of 17/17/37 kJ per g; the notes give the 4/4/9 kcal alternative.
  - Rickets is linked to lack of vitamin D and calcium.
  - Age bands for kwashiorkor and marasmus are approximate.
  - The food-plate proportions are illustrative, not official.
  - Three structured questions use a flow chart or a graph for the diagram part.
- **ch10:**
  - Adult dental formula 2-1-2-3 (32 teeth); milk teeth are not taught.
  - The enzyme list is the common ICSE set, including rennin and erepsin.
  - Bile has no enzyme.
  - Intestine lengths of about 6 m and 1.5 m.
- **ch11:**
  - 206 bones: 80 axial, counting the hyoid and the 6 ear ossicles, and 126 appendicular.
  - 33 vertebrae in a child, 26 bones in an adult.
  - The ankle is listed as a gliding joint (books vary).
- **ch12:**
  - The epidermis is described as horny plus Malpighian layers; the modern sub-layers are not taught.
  - Sweat removes about 2.4 kJ per mL.
  - Shivering is listed with the skin's cold responses, as books do.
- **ch13:**
  - Examples of endemic and sporadic disease vary by book, so the stems define the pattern instead of relying on an example.
  - Hepatitis A and B only.
  - Time-sensitive, as of 2026:
    - vaccines for cholera, typhoid, chicken pox and hepatitis exist, with use decided by health authorities;
    - AIDS medicines control the virus but do not cure it.
  - No programme, schedule or real case count is quoted.
- **ch14:**
  - Vaccination (giving the vaccine) is distinguished from immunisation (becoming immune).
  - The antiseptic and disinfectant examples depend on dilution.
  - Penicillin is said to come from a mould, with no species name.
  - Red Cross: Henry Dunant, 1863, red cross on white.
  - WHO: UN agency, Geneva, 1948, World Health Day on 7 April, smallpox declared eradicated in 1980.
  - Time-sensitive, as of 2026: member counts, current programmes and dose schedules are deliberately left out.
  - One MCQ (q_icse9bio_ch14_026) explains ready-made antibodies after a possible rabies bite by the slowness of a vaccine. In practice both are given; the item does not claim otherwise.

## Known gaps / follow-ups
- Narration audio (TTS) has not been generated, as for the other hand-authored subjects.
- Practical work (internal assessment) is not modelled; experiments appear as theory-style structured questions.
- The ICSE 9 Biology unit tests (`blueprints/9/unit-test.yaml`) are not assembled here; the chapter banks supply the items.

## Decisions made
- D-050 was followed: Sonnet writers wrote the chapters, and the producer reviewed, gated and committed them. No Opus fallback was needed.
- The ICSE 9 lib lives in ch01 and is shared by every chapter, following the ICSE 10 and ISC 12 Biology layout. Only content paths changed, so no ADR is needed.

## Needs from owner
None.
