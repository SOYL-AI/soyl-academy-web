# subject-producer — ICSE Class 10 Physics, hand-authored chapters — 2026-11-01

Status: done — all 12 syllabus chapters (ch01–ch12) committed and gated

Branch: `platform/subject-producer/icse-10-physics` (worktree `C:/Users/Prabhu/soyl-wt/content-icse10-physics`, from `platform/main` at 408b72d). Not pushed, not merged.

## What changed
New chapters under `platform/content/authored/physics/icse-10-physics-chNN/`, each with `release.json`, `tests.json`, `README.md` and a deterministic builder in `src/` (`lib.mjs`, `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`):

| Chapter | Commit | Decks (slides) | Notes sections | Flashcards | Questions | App+ items |
|---|---|---|---|---|---|---|
| ch01 Force: Turning Effect and Circular Motion | da67799 | 2 (13 + 14) | 5 | 30 | 64 | 48% |
| ch02 Work, Energy and Power | 281a888 | 2 (12 + 14) | 6 | 30 | 64 | 50% |
| ch03 Machines | eae1b7a | 2 (12 + 12) | 4 | 30 | 63 | 63% |
| ch04 Refraction of Light at Plane Surfaces | 3fb6ce5 | 2 (14 + 15) | 6 | 32 | 73 | 58% |
| ch05 Refraction through Lenses | 47b0f7a | 2 (16 + 15) | 5 | 30 | 63 | 56% |
| ch06 Spectrum | 1418d6e | 2 (14 + 15) | 5 | 31 | 73 | 49% |
| ch07 Sound | 6a13e30 | 2 (13 + 15) | 5 | 30 | 70 | 54% |
| ch08 Current Electricity | af64e8a | 2 (15 + 15) | 6 | 30 | 69 | 58% |
| ch09 Electrical Power, Energy and Household Circuits | f08d432 | 2 (15 + 16) | 6 | 30 | 68 | 51% |
| ch10 Electromagnetism | 47469de | 2 (16 + 16) | 5 | 30 | 71 | 46% |
| ch11 Calorimetry | a2745f1 | 2 (13 + 12) | 5 | 30 | 63 | 52% |
| ch12 Radioactivity and Nuclear Energy | b2cd616 | 2 (13 + 13) | 5 | 30 | 65 | 46% |

- Topics follow the ICSE 2027 syllabus (`catalog/cisce/icse-10/physics/syllabus.yaml`, 12 SOYL chapters), with removed topics respected (only translational KE/PE numericals; no lens-formula derivation, scale drawing or magnifying-power formula; motor and generator by parts and energy change only; no latent heat of vaporisation numericals).
- Tests: `t_icse10phy_chNN_short` (20 marks, 30 min) and `t_icse10phy_chNN_long` (40 marks, 60 min) on the subject’s own blueprints `icse-10-physics-chapter-test-short` / `-long`: Section A compulsory (MCQs, one assertion-reason, 1-mark fill-ins, two 2-mark answers; in the long test also a 2-mark match, three 2-mark answers and one 3-mark answer); Section B 10-mark structured questions in parts 3 + 3 + 4 (any one of two; any two of three). The builder throws on any mismatch; short and long are disjoint.
- Style follows the ICSE 2027 specimen paper (sources/cisce.md `icse-2027-specimen-521-physics`), pitched at Class 10.
- Builder: `lib.mjs` is the ICSE 10 Chemistry builder with ICSE Physics ids and blueprints, the ISC 12 Physics number helpers, and the pipeline’s deterministic verify checks and a DB-6 answer-leak scan run inside every build. Every numerical value is computed in `questions.mjs`/`decks.mjs` and asserted by a re-solve check; every ray diagram, circuit and field diagram is an SVG whose geometry is computed in `svgs.mjs` and self-checked (Snell’s law, lens formula, nodal analysis, cross products), with any failing check failing the build.
- Every stem names its own objects and data (originality gate compares against CBSE 10 Science physics chapters and CBSE 12 / ISC 12 Physics).
- Each deck has exactly 3 check slides (objective items not used in the tests), ≥ 2 worked examples, summary and exam tips, and no two consecutive slides without a visual. Items are `status: "draft"`, provenance `human`, D-025/D-026.
- Authoring: ch01–ch03, ch11 and ch12 by the producer; ch04–ch10 by helper authors (at most two at a time) working to the same brief and template, each chapter rebuilt from source and checked by the producer before gating. Each README says which.

## How to verify
From `platform/` in the worktree:
```
npm run content -- catalog
npm test -w @soyl/content-templates
npm run content -- lint --exemplars
npm run content -- verify --board cisce --class 10 --subject physics --authored
npm run content -- originality --authored
npx vitest run --root db test/db6-split.test.ts
npx vitest run --root api test/content.test.ts
```
Results of the last full run (under the shared `heavy.sh` lock):
Last gate run 2026-11-01 12:42 IST (ch01–ch12 in place): catalog valid; content-templates 2381/2381; lint --exemplars 0 errors; verify cisce 10 physics 12 units 806 q 0 flags; originality --authored 340 units 0 errors; db6-split 8/8; api content.test 13/13. The answer-leak scan (leak.cjs, and the same scan built into every chapter build) found nothing before gating.

## Tests added
None (content only). The API content fixture maps `icse-10-physics-chNN` to `cisce/icse-10/physics` with its existing pattern; no change needed.

## Known gaps / follow-ups
- Narration audio not generated (TTS stage); SVGs checked by computed self-checks; the helper-authored chapters (ch04–ch10) were also rendered once with Playwright to check layout.
- Check-slide narrations are short by design.
- ch09: the socket front view shows live on the right and neutral on the left (Indian convention); worth a reviewer’s glance.
- ch10 uses the ideal-transformer relation VpIp = VsIs in one difficulty-4 item and one long-answer part.

## Decisions made
No ADRs. No shared files, schemas, catalog, templates, tests or marketing files were touched.

## Needs from owner
None.
