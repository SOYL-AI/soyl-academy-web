# subject-producer — CBSE Class 11 Chemistry, hand-authored chapters — 2026-11-02

Status: done (11 of 11 chapters committed)

Branch: `platform/subject-producer/cbse-11-chemistry` (worktree `C:/Users/Prabhu/soyl-wt/content-cbse11-chemistry`, from `platform/main`, with `platform/main` merged at 852ea29). Not pushed, not merged.

## What changed
New chapters under `platform/content/authored/chemistry/cbse-11-chemistry-chNN/`. Each has `release.json`, `tests.json`, `README.md` and a deterministic builder in `src/` (`lib.mjs`, `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`, and `data.mjs` in some chapters):

| Chapter | Commit | Decks (slides) | Notes sections | Flashcards | Questions | App+ items |
|---|---|---|---|---|---|---|
| ch01 Some Basic Concepts of Chemistry | 0b6dab6 | 2 (18 + 18) | 6 | 32 | 68 | 59% |
| ch02 Structure of Atom | 5660893 | 2 (19 + 21) | 6 | 32 | 67 | 61% |
| ch03 Classification of Elements and Periodicity in Properties | 0b4f93b | 2 (20 + 22) | 7 | 31 | 66 | 61% |
| ch04 Chemical Bonding and Molecular Structure | 6a2df9f | 2 (18 + 23) | 7 | 31 | 67 | 54% |
| ch05 Chemical Thermodynamics | 8f410e7 | 2 (19 + 22) | 6 | 30 | 66 | 61% |
| ch06 Equilibrium | dfcbbbc | 2 (20 + 21) | 6 | 30 | 70 | 63% |
| ch07 Redox Reactions | c138abf | 2 (17 + 17) | 6 | 30 | 63 | 56% |
| ch08 Organic Chemistry: Some Basic Principles and Techniques | 1fccffe | 2 (22 + 24) | 7 | 31 | 68 | 53% |
| ch09 Hydrocarbons | b606cdf | 2 (23 + 23) | 7 | 32 | 68 | 62% |
| ch10 s- and p-Block Elements (formative assessment only) | 7fd87b6 | 2 (17 + 17) | 6 | 31 | 62 | 50% |
| ch11 The Gaseous State (formative assessment only) | 3dde4b7 | 2 (16 + 16) | 6 | 31 | 63 | 59% |

### Who wrote each chapter (D-050)
| Chapter | Writer |
|---|---|
| ch01–ch02 | Sonnet 5.5 writer (Agent tool, `model: "sonnet"`), one writer for both |
| ch03–ch04 | Sonnet 5.5 writer, one writer for both |
| ch05–ch06 | Sonnet 5.5 writer, one writer for both |
| ch07–ch08 | Sonnet 5.5 writer, one writer for both |
| ch09 | Sonnet 5.5 writer |
| ch10–ch11 | Sonnet 5.5 writer, one writer for both |

At most two writers ran at a time. The producer (Claude Opus 5.5) reviewed every chapter (facts, scope, numericals, rendered SVGs), fixed what needed fixing, gated and committed. No chapter needed the Opus quality fallback: none needed heavy fixing and none failed gates for content reasons. Every item's provenance names the Sonnet writer and the Opus reviewer.

### How the chapters are built
- **Syllabus:** topics follow `catalog/cbse/11/chemistry/syllabus.yaml` (2026–27 rationalised, 11 SOYL chapters; no removed topics). ch10 (s- and p-block) and ch11 (gaseous state) are marked formative assessment only in the syllabus. They are taught at textbook depth and say so on their title slides.
- **Tests:** each chapter has `t_cbse11chem_chNN_short` (20 marks, 40 min) and `t_cbse11chem_chNN_long` (40 marks, 90 min). The subject has only annual and half-yearly blueprints, so these use the class-default blueprints `cbse-11-default-chapter-test-short` / `-long`. Sections are A objective, B short answer with internal choice in the long test, C long answer with choice, and D case-based. The builder throws on any mismatch, and the short and long tests share no item.
- **Builder:** `lib.mjs` is the CBSE 12 Chemistry builder with these changes:
  - CBSE 11 ids and blueprints;
  - number helpers;
  - the pipeline's deterministic verify checks and the DB-6 answer-leak scan run inside every build;
  - provenance records the writer and the reviewer.
- **Data:** values are NCERT-style standard data. The producer aligned values that differed: the ionisation enthalpies and S radius in ch03, the bond enthalpies and N≡N length in ch04. Constructed numbers are labelled given or illustrative. Every numerical is computed in code and asserted by a re-solve check.
- **Originality:** stems use fresh compounds, numbers and situations. The originality gate compares them against CBSE 12, ISC 12 and ICSE 10 chemistry and CBSE 10 science.
- **Items:** all items are `status: "draft"`, provenance `human` (D-025/D-026).

## How to verify
From `platform/` in the worktree:
```
npm run content -- catalog
npm test -w @soyl/content-templates
npm run content -- lint --exemplars
npm run content -- verify --board cbse --class 11 --subject chemistry --authored
npm run content -- originality --authored
npx vitest run --root db test/db6-split.test.ts
npx vitest run --root api test/content.test.ts
```
Results of the last full run (under the shared `heavy.sh` lock):
- catalog: valid, 0 errors, 0 warnings
- content-templates: 3452 tests passed
- lint --exemplars: exit 0
- verify --board cbse --class 11 --subject chemistry --authored: 11 units, 728 questions, all pass, 0 blocking flags
- originality --authored: 493 units, 0 errors
- db6-split: 8 passed
- api content (with the 852ea29 leak-scan budget): 13 passed

## Tests added
None (content only).

## Review fixes by the producer (beyond the writers' own)
- **ch02:** fixed label overlaps on the energy-level diagram and the orbital-shape captions.
- **ch03:** aligned third-period first ionisation enthalpies to NCERT values (Mg 737, Al 577, S 999, Cl 1256, Ar 1520). The Mg numerical is now 2188 kJ. Set the S atomic radius to 104 pm. Relabelled the radius table as atomic radii (metallic radii for the metals).
- **ch04:**
  - Set bond enthalpies to C–H 414, C=C 611, C≡C 837 kJ mol⁻¹, consistent with ch05 and ch09, and N≡N to 109 pm.
  - Redrew the VSEPR drawings. In the old oblique projection, atoms were hidden behind the central atom. Each shape now uses the smallest turn from the textbook orientation that keeps every atom and lone pair clear, and a self-check asserts this per shape.
- **ch06:** the illustrative water-gas Kc of 9.0 no longer claims a temperature.
- **ch07:** changed "very dilute" to "dilute" nitric acid for the N₂O product.
- **Originality gate (first full run):** three generic match stems duplicated other chapters (ch01 against CBSE 12 Solutions; ch07 and ch08 against each other). The producer rewrote them with named substances, and the re-run was fully green.

## Known gaps / follow-ups
- Narration audio is not generated (TTS stage).
- Facts a reviewer may wish to double-check are listed in each chapter's README.
- The pipeline balance checker skips `\ce{}` equations that contain `=` or `#` (double and triple bonds). ch09 balanced these by hand.
- The `checkBalance` caret-charge bug (already logged) was avoided by writing complexes without brackets.

## Decisions made
No ADRs. No shared files, schemas, catalog, templates, tests or marketing files were touched.

## Needs from owner
None.
