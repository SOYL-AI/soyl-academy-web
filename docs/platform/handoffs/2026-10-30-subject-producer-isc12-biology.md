# subject-producer — ISC Class 12 Biology (and ISC 12 default blueprints) — 2026-10-30

Status: partial — step 1 (ISC 12 default blueprints) done; ch01–ch07 committed and gated; ch08 onward in progress (this note is updated after each chapter)
Branch: `platform/subject-producer/isc-12-biology` (worktree `C:/Users/Prabhu/soyl-wt/content-isc12-biology`, from `platform/main` 8bdb875; fast-forwarded to `platform/main` 4b86da3 on 2026-10-31 so the gates compare against all released chapters). Not pushed, not merged.

## Step 1 — ISC Class 12 default blueprints (curriculum-architect role)
- `platform/catalog/cisce/blueprints/12/chapter-test-short.yaml` (`isc-12-default-chapter-test-short`, 20 marks, 50 min), `chapter-test-long.yaml` (`isc-12-default-chapter-test-long`, 40 marks, 100 min), `unit-test.yaml` (`isc-12-default-unit-test`, 60 marks, 150 min): same schema as the ICSE 10 defaults, `exam: isc`, `source: lead-default`, `source_status: unverified`.
- Shape from the ISC 2027 specimen papers for Mathematics (860), Physics (861), Chemistry (862) and Biology (863), fetched from cisce.org on 2026-10-30 for pattern only and recorded in `platform/catalog/sources/cisce.md` (anchors `isc-2027-specimen-860-mathematics`, `-861-physics`, `-862-chemistry`, `-863-biology`): Section A 1-mark objective items (with assertion-reason), B 2-mark, C 3-mark, D 5-mark questions in parts, internal choice in some questions of B, C and D; board pace 70 marks in 3 hours.
- `npm run content -- catalog`: exit 0, 0 errors, 0 warnings; ISC 12 shows 3 blueprints. `blueprintFor` resolves all three defaults for isc-12-biology, -physics and -mathematics.
- **Verify command for the release gates:** `npm run content -- verify --board cisce --class 12 --subject biology --authored` (`--board` accepts `cisce` or `isc`; drop `--subject` for all ISC 12 authored subjects).
- **Assembly:** `npm run content -- assemble --board cisce --class 12 --subject biology --chapter 1 --source files`, with the authored `tests.json` moved aside, assembled both chapter tests from the ISC defaults (2/2 papers, 0 generation requests; short A5 B3 C3 D1, long A12 B4 C5 D3). With `tests.json` present the assembler leaves authored tests alone.
- Commit: d70438f.

## Fix outside content paths (accepted by the Lead, merged as 4c30f89)
- `platform/api/test/content-fixture.ts`: `seedRealContent` assumed every authored unit was CBSE and crashed on the first ISC chapter; it now maps units to `cbse/<class>/<subject>` or `cisce/<exam>-<class>/<subject>` and copies each board's subjects.yaml. Commit 81973c7.

## Step 2 — ISC 12 Biology
Hand-authored (D-025/D-026), original content in `platform/content/authored/biology/isc-12-biology-chNN/`, following the ISC 2027 syllabus (18 SOYL chapters over five units), not NCERT.

| Chapter | Commit | Decks (slides) | Questions | Flashcards | Notes | Tests | SVG diagrams |
|---|---|---|---|---|---|---|---|
| ch01 Sexual Reproduction in Flowering Plants: Pre-fertilisation | 567e270 | 2 (16 + 16) | 66 | 34 | 4 sections | short + long | 7 |
| ch02 Fertilisation, Seed and Fruit in Flowering Plants | 4f77893 | 2 (14 + 16) | 61 | 32 | 5 sections | short + long | 8 |
| ch03 Human Reproduction | 969011f | 3 (14 + 15 + 14) | 69 | 33 | 6 sections | short + long | 9 |
| ch04 Reproductive Health | 9afe7af | 2 (16 + 14) | 62 | 32 | 5 sections | short + long | 5 |
| ch05 Principles of Inheritance | 29fde09 | 2 (14 + 15) | 63 | 30 | 6 sections | short + long | 7 |
| ch06 Sex Determination, Mutation and Genetic Disorders | 1721455 | 2 (14 + 13) | 62 | 30 | 5 sections | short + long | 6 |
| ch07 Molecular Basis of Inheritance: DNA and Replication | (this commit) | 2 (16 + 13) | 61 | 30 | 5 sections | short + long | 6 |

Each chapter folder has `release.json`, `tests.json` (`t_isc12bio_chNN_short` / `_long` on `isc-12-default-chapter-test-short` / `-long`, disjoint), `README.md` (scope, shape, bank statistics, verifier pass, facts to double-check) and `src/` (deterministic builders). All items are `status: "draft"`, provenance `human`.

- **ISC authoring library:** `isc-12-biology-ch01/src/lib.mjs`, copied from the CBSE 12 Biology library and adapted: ids `q_isc12bio_chNN_###` / `t_isc12bio_chNN_*`; assertion-reason options as in the ISC 2027 Biology specimen (option (d) "Both Assertion and Reason are false"); chapter tests on the ISC defaults (A objective, B 2-mark, C 3-mark, D 5-mark with internal choice).
- **ISC question style:** 1-mark give-a-reason and analogy subparts, diagram-based MCQs with lettered figures, labelled-diagram short answers, 5-mark questions in marked parts, stimulus (case) items; about half of items at application or higher, in line with the ISC 2027 aim of about 50 % higher-order marks.
- **Diagrams:** drawings shared with CBSE 12 Biology are copied (same author) into each ISC chapter folder, so ISC rebuilds do not depend on CBSE files; new ISC drawings so far: bean seed, maize grain (labelled and lettered), mango and coconut L.S., lettered embryo sac and microsporangium; autosomal dominant and recessive pedigrees (ch05); four sex-determination systems, a computed X-linked Punnett square, the sickle-cell codon change and point mutations (ch06); Griffith’s and Hershey–Chase experiments (ch07).
- **Originality:** every stem names its own organism, cross, experiment or sequence. Two collisions with the CBSE 12 bank by the same author were found and rewritten (ch03 menarche stem; ch05 q018, 73 % similar to CBSE ch04 q003); each chapter README records its fixes under "Verifier pass".

## How to verify
From `platform/` in the worktree (each run under `_tools/heavy.sh`; script `C:/Users/Prabhu/soyl-wt/isc12-biology-gates.sh`):
```
npm test -w @soyl/content-templates            # Tests 1541 passed (1541)   (run of 2026-10-31 03:09 IST, ch01–ch07)
npm run content -- lint --exemplars            # ok isc-12-biology-ch01..ch07: 0 error(s), 0 warning(s)
npm run content -- verify --board cisce --class 12 --subject biology --authored
                                               # 7 unit(s), 444 questions, 0 blocking flag(s)
npm run content -- verify --board cbse --class 12 --subject biology --authored   # unchanged: 13 units, 864 questions, 0 blocking flags
npm run content -- originality --authored      # 220 unit(s), 0 error(s)
npx vitest run --root db test/db6-split.test.ts   # 8 passed
npx vitest run --root api test/content.test.ts    # 13 passed
```
Rebuild check: `npx tsx content/authored/biology/isc-12-biology-chNN/src/build.mjs` leaves `git status` clean (verified after each commit).

## Known gaps / follow-ups
- ch08–ch18 in progress.
- The ISC defaults are SOYL scale-downs of the specimen layout (`source_status: unverified`); subject-specific ISC 12 blueprints (board papers, series) are not part of this task.

## Decisions made
- ISC 12 Biology uses ISC wording for assertion-reason options (both false as (d)), following the Biology specimen; the Physics specimen keeps "Assertion false, Reason true", so other ISC subjects should follow their own specimen.

## Needs from owner
None.
