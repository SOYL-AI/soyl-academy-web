# subject-producer — ICSE Class 10 Chemistry, hand-authored chapters — 2026-11-01

Status: done — all 15 syllabus chapters (ch01–ch15) committed and gated

Branch: `platform/subject-producer/icse-10-chemistry` (worktree `C:/Users/Prabhu/soyl-wt/content-icse10-chemistry`, from `platform/main` at 0d8c7ac). Not pushed, not merged.

## What changed
New chapters under `platform/content/authored/chemistry/icse-10-chemistry-chNN/`, each with `release.json`, `tests.json`, `README.md` and a deterministic builder in `src/` (`lib.mjs`, `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`):

| Chapter | Commit | Decks (slides) | Notes sections | Flashcards | Questions | App+ items |
|---|---|---|---|---|---|---|
| ch01 Periodic Table, Periodic Properties and Variations of Properties | ebc6477 | 2 (13 + 14) | 6 | 30 | 60 | 55% |
| ch02 Chemical Bonding | ca4efcf | 2 (13 + 13) | 6 | 30 | 62 | 60% |
| ch03 Acids, Bases and Salts | e48f962 | 2 (14 + 14) | 6 | 30 | 63 | 63% |
| ch04 Analytical Chemistry | 770523e | 2 (15 + 15) | 7 | 30 | 63 | 59% |
| ch05 Mole Concept: Gas Laws, Molar Volume and Avogadro's Number | 903a135 | 2 (14 + 15) | 6 | 30 | 70 | 61% |
| ch06 Stoichiometry: Formulae and Calculations from Equations | 055ceba | 2 (15 + 15) | 6 | 30 | 71 | 63% |
| ch07 Electrolysis | 6d31e2f | 2 (15 + 15) | 7 | 31 | 65 | 48% |
| ch08 Metallurgy | e76cf88 | 2 (15 + 16) | 7 | 31 | 64 | 47% |
| ch09 Study of Compounds: Hydrogen Chloride | 7893dad | 2 (14 + 16) | 6 | 30 | 64 | 55% |
| ch10 Study of Compounds: Ammonia | 447eced | 2 (15 + 16) | 7 | 30 | 64 | 59% |
| ch11 Study of Compounds: Nitric Acid | 89b1fef | 2 (15 + 15) | 7 | 30 | 64 | 58% |
| ch12 Study of Compounds: Sulphuric Acid | 338fa94 | 2 (15 + 15) | 6 | 30 | 64 | 61% |
| ch13 Organic Chemistry: Introduction, Structure, Isomerism and Nomenclature | 80102e7 | 2 (15 + 15) | 6 | 31 | 64 | 59% |
| ch14 Hydrocarbons: Alkanes, Alkenes and Alkynes | f0af8bc | 2 (16 + 16) | 6 | 30 | 64 | 63% |
| ch15 Alcohols and Carboxylic Acids | 64d2927 | 2 (16 + 16) | 6 | 30 | 63 | 57% |

- Topics follow the ICSE 2027 syllabus (`catalog/cisce/icse-10/chemistry/syllabus.yaml`, 15 SOYL chapters over the nine CISCE sections), with removed topics respected (no salt-preparation apparatus, no proofs of molar volume / atomicity / M = 2 × VD, no plant details of Ostwald’s or the Contact process, no metallurgy electrorefining, no alkene/alkyne chemistry beyond the addition reactions, no cyclic compounds other than benzene).
- Tests: `t_icse10chem_chNN_short` (20 marks, 30 min) and `t_icse10chem_chNN_long` (40 marks, 60 min) on the subject’s own blueprints `icse-10-chemistry-chapter-test-short` / `-long`: Section A compulsory (MCQs, one assertion-reason, 1-mark equations / observations / names, plus in the long test a three-blank bracket completion and a five-pair match, and in the short test one 2-mark answer); Section B 10-mark structured questions in parts (any one of two; any two of three). The builder throws on any mismatch; short and long are disjoint.
- Style follows the ICSE 2027 specimen paper (sources/cisce.md `icse-2027-specimen-522-chemistry`) and is pitched at Class 10: shorter stems, “give a reason”, “state one observation”, “write a balanced equation”, identification from observations.
- Builder: `lib.mjs` is the ISC 12 Chemistry builder with ICSE ids, the ICSE blueprints, 10-mark long questions, five-pair matches (p–t) and per-blank fill marks.
- Every stem names its own substances and data (originality gate compares against CBSE 10 Science ch02–ch04 and CBSE/ISC 12 Chemistry).
- Each deck has exactly 3 check slides (objective items not used in the tests), ≥ 2 worked examples, summary and exam tips, and no two consecutive slides without a visual. Items are `status: "draft"`, provenance `human`, D-025/D-026.
- Authoring: ch01–ch03 by the producer; ch04–ch15 by helper authors (at most two at a time) working to the same brief and template, each chapter rebuilt from source and checked by the producer before gating. Each README says which.

## How to verify
From `platform/` in the worktree:
```
npm run content -- catalog
npm test -w @soyl/content-templates
npm run content -- lint --exemplars
npm run content -- verify --board cisce --class 10 --subject chemistry --authored
npm run content -- originality --authored
npx vitest run --root db test/db6-split.test.ts
npx vitest run --root api test/content.test.ts
```
Results of the last full run (under the shared `heavy.sh` lock):
Last gate run 2026-11-01 07:13 IST (ch01–ch15 in place): catalog valid; content-templates 1856/1856; lint --exemplars 0 errors; verify cisce 10 chemistry 15 units 965 q 0 flags; originality --authored 265 units 0 errors; db6-split 8/8; api content.test 13/13. The first run (06:59) failed api content.test: two short-answer model answers (ch01 modern periodic law, ch13 definition of structural isomerism) repeated a notes key-term definition word for word, which the DB-6 key-side-leak scan rejects; both model answers were reworded before the re-run.

## Tests added
None (content only). The API content fixture (`api/test/content-fixture.ts`) already maps `icse-10-<subject>-chNN` to `cisce/icse-10/<subject>` (regex `^(cbse|icse|isc)-(\d+)-(.+)-ch\d+$`); no change needed.

## Known gaps / follow-ups
- Narration audio not generated (TTS stage); SVGs checked by coordinates (ch13–ch15 also rendered once by the helper).
- Check-slide narrations are short (10–15 words) by design, as in the other chemistry chapters.
- ch04 adds calcium (white Ca(OH)₂) to the NaOH tests because the official ICSE ion list includes Ca; the SOYL topic summary names only Fe, Cu, Zn, Pb.
- ch11 writes sulphites with dilute HNO₃ as giving SO₂, following the syllabus wording (nitric acid partly oxidises sulphite).

## Decisions made
No ADRs. No shared files, schemas, catalog, templates, tests or marketing files were touched.

## Needs from owner
None.
