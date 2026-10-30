# subject-producer — CBSE Class 12 Chemistry, hand-authored chapters — 2026-10-29

Status: in progress — all 10 board-assessed chapters (ch01–ch10) done and committed (publish-ready drafts); the four formative-only chapters (ch11–ch14, `board_assessed: false`) are in progress. Resumed 2026-10-30 01:00 IST and again 09:20 IST after session limits.

Branch: `platform/subject-producer/cbse-12-chemistry` (worktree `C:/Users/Prabhu/soyl-wt/content-cbse12-chemistry`, based on `platform/main` 9f3ea8f). Not pushed, not merged.

## What changed
New chapters under `platform/content/authored/chemistry/` (new family folder `chemistry`, discovered by the gates like the other families), each with `release.json`, `tests.json`, `README.md` and a deterministic builder in `src/` (`lib.mjs`, `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`):

| Chapter | Commit | Decks (slides) | Notes sections | Flashcards | Questions | Tests | App+ items |
|---|---|---|---|---|---|---|---|
| ch01 Solutions | a8261cd | 2 (24 + 23) | 6 | 32 | 68 | short + long | 47% |
| ch02 Electrochemistry | 5c053e9 | 2 (22 + 23) | 6 | 32 | 70 | short + long | 47% |
| ch03 Chemical Kinetics | c5cf42a | 2 (19 + 24) | 5 | 31 | 64 | short + long | 47% |
| ch04 The d- and f-Block Elements | 5862249 | 2 (19 + 19) | 5 | 31 | 64 | short + long | 47% |
| ch05 Coordination Compounds | e6583dd | 2 (21 + 19) | 5 | 31 | 66 | short + long | 50% |
| ch06 Haloalkanes and Haloarenes | eff9642 | 2 (18 + 20) | 6 | 32 | 62 | short + long | 48% |
| ch07 Alcohols, Phenols and Ethers | d5a3d53 | 2 (18 + 18) | 5 | 31 | 63 | short + long | 48% |
| ch08 Aldehydes, Ketones and Carboxylic Acids | 147aef7 | 2 (19 + 16) | 5 | 31 | 65 | short + long | 46% |
| ch09 Amines | a54b2f0 | 2 (18 + 16) | 5 | 30 | 65 | short + long | 48% |
| ch10 Biomolecules | fdcd2ad | 2 (19 + 18) | 5 | 32 | 80 | short + long | 50% |

- Every chapter covers all its syllabus topics (`catalog/cbse/12/chemistry/syllabus.yaml`; none has removed topics). Items are `status: "draft"`, provenance `human` (`claude-opus-5-5 (subject-producer)`), D-025/D-026.
- Tests: `t_cbse12chem_chNN_short` (20 marks, 40 min, `cbse-12-default-chapter-test-short`) and `t_cbse12chem_chNN_long` (40 marks, 90 min, `cbse-12-default-chapter-test-long`), laid out exactly per the blueprints (the builder throws if a section does not match), short and long disjoint, choice groups B1/B2/C1 as in the CBSE 10 chapters.
- Each deck has 3 check slides (objective items not used in the tests), ≥ 2 worked examples, summary and exam tips, and no gap of more than one slide without a visual.
- Numericals (molality, Henry’s law, colligative properties, cell EMF/Nernst/ΔG/K, conductivity/Kohlrausch, Faraday, rate laws/half-lives/Arrhenius, magnetic moments, titrations, Wurtz/Grignard stoichiometry, …) are re-computed by a check function in each chapter’s build (`resolve` count in `build.checks`).

## How to verify
From `platform/` in the worktree:
```
npm test -w @soyl/content-templates
npm run content -- lint --exemplars
npm run content -- verify --board cbse --class 12 --subject chemistry --authored
npm run content -- originality --authored
npx vitest run --root db test/db6-split.test.ts
npx vitest run --root api test/content.test.ts
```
Results of the last full run (with all committed chapters in the tree), under the shared `heavy.sh` lock:
- Run of 2026-10-30 09:25–09:27 IST (ch01–ch10 in the tree):
  - content-templates: Test Files 1 passed, **Tests 764 passed (764)**
  - lint --exemplars: exit 0; every cbse-12-chemistry chapter 0 errors, 0 warnings
  - verify --board cbse --class 12 --subject chemistry --authored: 10 units, 667 questions, **0 blocking + 0 minor flags**
  - originality --authored: 109 units, **0 errors**
  - db6-split: **8 passed (8)**; api content.test: **13 passed (13)**
- Run of 2026-10-30 01:35–01:37 IST (ch01–ch06 in the tree):
  - content-templates: Test Files 1 passed, **Tests 736 passed (736)**
  - lint --exemplars: exit 0; every cbse-12-chemistry chapter 0 errors, 0 warnings
  - verify --board cbse --class 12 --subject chemistry --authored: 6 units, 394 questions, **0 blocking + 0 minor flags**
  - originality --authored: 105 units, **0 errors**
  - db6-split: **8 passed (8)**; api content.test: **13 passed (13)**
- Each chapter was also gated on its own before its commit (same commands; results in each commit message).

Rebuild check: `npx tsx content/authored/chemistry/cbse-12-chemistry-chNN/src/build.mjs` for each chapter leaves `git status` clean (verified after each commit; `src/build.log` is git-ignored by `platform/.gitignore` `*.log`).

## Tests added
None (content only). The existing content gates now cover the new chapters automatically.

## Scope decisions
- **Family folder `chemistry`.** The brief named `content/authored/chemistry/`; the gates discover any family folder, and lint maps the unit to the `chemistry` family through the catalog.
- **Builder.** `lib.mjs` is the CBSE 10 Science ch06 builder adapted (unit/question/test ids, CBSE 12 blueprints, `cbse-12-chemistry` subject, pipeline lint called with family `chemistry`, narration lint extended to chemistry units such as mol, L, K, atm, V). Each chapter folder has its own copy so it is self-contained (no cross-folder imports).
- **Chemistry rendering.** Formulae and equations use KaTeX + mhchem (`\ce{}`), which the validator, lint and verify stages all parse; every `\ce{…}` equation with an arrow is atom-balanced (the verify balance checker passes). Generic reactions (R → P, A → B + C) use `\mathrm{}` + `\rightarrow`, so the balance checker does not read R/P as elements. Structures and apparatus are theme-coloured SVGs (allow-list palette, named hues only where colour is the point, always with labels).
- **Originality (D-036).** All text is written from scratch; numerical data sets were deliberately chosen to differ from textbook examples and exercises (several first ideas that matched NCERT exercises were replaced — noted in each README). Official sample papers defined pattern only.
- **Competency (D-035).** Every chapter is inside the 45–65% band for application-or-higher items. Where a first draft was below the band, items were rewritten into new situations rather than relabelled (details in each README).

## Known gaps / follow-ups
- Chapters 11–14 (formative only, `board_assessed: false`: Surface Chemistry, Isolation of Elements, Polymers, Chemistry in Everyday Life) in progress.
- Originality gate finding (fixed): ch08’s naming match first reused ch06’s stem ("Match each structure with its IUPAC name."), flagged as a bank duplicate; every chapter now uses its own stem.
- Narration audio not generated (TTS stage).
- SVGs checked by coordinate review only; no rasteriser is installed in the worktree, so a visual check in the staging UI is advised (especially the chemistry structure diagrams).
- Case-study data are realistic illustrative values (labelled where they are).
- `content/authored/series/` has no CBSE 12 Chemistry series yet (frozen series are out of scope here).

## Decisions made
No ADRs. No shared files, schemas, catalog, templates, tests or marketing files were touched.

## Needs from owner
None.
