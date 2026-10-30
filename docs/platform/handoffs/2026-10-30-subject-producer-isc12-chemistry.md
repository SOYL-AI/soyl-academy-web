# subject-producer — ISC Class 12 Chemistry, hand-authored chapters — 2026-10-30

Status: in progress — chapters 1–4 of 22 committed (publish-ready drafts); ch05 onward in progress. Resumed 2026-10-31 02:40 IST after a session limit.

Branch: `platform/subject-producer/isc-12-chemistry` (worktree `C:/Users/Prabhu/soyl-wt/content-isc12-chemistry`, from d70438f, with `platform/main` merged at 4c30f89 (content fixture fix 81973c7) and again at 4b86da3). Not pushed, not merged.

## What changed
New chapters under `platform/content/authored/chemistry/isc-12-chemistry-chNN/`, each with `release.json`, `tests.json`, `README.md` and a deterministic builder in `src/` (`lib.mjs`, `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`):

| Chapter | Commit | Decks (slides) | Notes sections | Flashcards | Questions | App+ items |
|---|---|---|---|---|---|---|
| ch01 Solutions and Their Concentration | 3a9ecf9 | 2 (16 + 16) | 5 | 31 | 64 | 56% |
| ch02 Colligative Properties | 35c8388 | 2 (16 + 15) | 5 | 31 | 65 | 63% |
| ch03 Electrochemical Cells and Electrode Potential | 18bca52 | 2 (15 + 15) | 5 | 31 | 60 | 58% |
| ch04 Electrolytic Conductance, Electrolysis, Batteries and Corrosion | dcca0ec | 2 (14 + 17) | 5 | 31 | 66 | 45% |

- Topics follow the ISC 2027 syllabus (`catalog/cisce/isc-12/chemistry/syllabus.yaml`, 22 SOYL chapters), not NCERT: ISC-only content (normality, azeotrope distillation, derivations of ΔTb and ΔTf, van’t Hoff laws, SHE limitations, factors affecting electrode potential, equivalent conductance, F = N_A e, law of mass action, radiation as a rate factor, …) has its own slides and items. Removed topics are respected.
- Tests: `t_isc12chem_chNN_short` (20 marks, 50 min, `isc-12-default-chapter-test-short`) and `t_isc12chem_chNN_long` (40 marks, 100 min, `isc-12-default-chapter-test-long`): Section A 1-mark MCQ + assertion-reason, B 2-mark, C 3-mark, D 5-mark questions set in parts, internal choice in B, C and D exactly per the blueprints (the builder throws on any mismatch); short and long disjoint.
- Question style follows the ISC 2027 specimen paper (sources/cisce.md `isc-2027-specimen-862-chemistry`): 1-mark objective items incl. assertion-reason, then 2/3/5-mark structured questions with reasons, derivations, conversions and numericals with full working. No case-based items (not in the ISC pattern). No default word limits (ISC sets none).
- Every stem names its own substances or situation (coordinator rule of 2026-10-31), so it cannot collide with other chapters in the shared bank.
- Each deck has 3 check slides (objective items not used in the tests), ≥ 2 worked examples, summary and exam tips, and no gap of more than one slide without a visual. Items are `status: "draft"`, provenance `human`, D-025/D-026.

## How to verify
From `platform/` in the worktree:
```
npm test -w @soyl/content-templates
npm run content -- lint --exemplars
npm run content -- verify --board cbse --class 12 --subject chemistry --authored
npm run content -- verify --board cisce --class 12 --subject chemistry --authored
npm run content -- originality --authored
npm run content -- catalog
npx vitest run --root db test/db6-split.test.ts
npx vitest run --root api test/content.test.ts
```
Results of the last full run (under the shared `heavy.sh` lock):
- Run of 2026-10-31 02:42–02:46 IST (ISC ch01–ch04 in the tree): content-templates **1541/1541**; lint --exemplars exit 0, every isc-12-chemistry chapter 0 errors/0 warnings; verify cbse 12 chemistry 14 units 0 flags; verify cisce 12 chemistry **4 units, 255 questions, 0 flags**; originality --authored **220 units, 0 errors**; catalog **valid (0 errors)**; db6-split **8/8**; api content.test **13/13**.

## Tests added
None (content only).

## Scope decisions
- **Builder.** `lib.mjs` is the CBSE 12 Chemistry builder with ISC ids (`isc-12-chemistry-chNN`, `q_isc12chem_chNN_`, `t_isc12chem_chNN_*`), a new `buildTests` for the ISC blueprints (nested pairs = internal-choice groups B1/C1/D1) and no default word limits. Each chapter folder has its own copy.
- **Reuse.** Where the subject matter overlaps CBSE 12 Chemistry, slides and SVGs were adapted from the CBSE chapters (same author), with new worked-example data; every question stem and data set is new (originality gate: 0 duplicates).
- **Pipeline quirk.** The balance checker misreads `[complex]^charge` (logged by the Lead for pipeline-engineer); complex ions in `\ce{}` key-side equations are written without square brackets where needed.

## Known gaps / follow-ups
- Narration audio not generated (TTS stage); SVGs checked by coordinates only.

## Decisions made
No ADRs. No shared files, schemas, catalog, templates, tests or marketing files were touched.

## Needs from owner
None.
