# subject-producer — CBSE Class 9 Science, hand-authored chapters — 2026-11-04

Status: done (12 of 12 chapters committed)

Branch: `platform/subject-producer/cbse-9-science` (worktree `C:/Users/Prabhu/soyl-wt/content-cbse9-science`, from `platform/main` at 447d233). Not pushed, not merged.

## What changed
New chapters under `platform/content/authored/science/cbse-9-science-chNN/` (the `science` family folder that CBSE 10 Science uses). Each has `release.json`, `tests.json`, `README.md` and a deterministic builder in `src/`: `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`, and `data.mjs` in some chapters. The shared builder `lib.mjs` is kept once, in `cbse-9-science-ch01/src/lib.mjs`. The `lib.mjs` in each other chapter is a one-line re-export. Rebuilding all 12 chapters after this change gave byte-identical releases.

| Chapter | Commit | Decks (slides) | Notes sections | Flashcards | Questions | App+ items |
|---|---|---|---|---|---|---|
| ch01 Cell | ebc15b2 | 2 (19 + 19) | 6 | 31 | 62 | 58% |
| ch02 Tissues | 558895c | 2 (17 + 18) | 7 | 31 | 65 | 54% |
| ch03 Motion | 9a0e5b5 | 2 (18 + 18) | 6 | 32 | 66 | 62% |
| ch04 Exploring Mixtures and their Separation | 760875d | 2 (20 + 19) | 7 | 31 | 64 | 61% |
| ch05 Force and Laws of Motion | 51a7149 | 2 (17 + 18) | 6 | 32 | 66 | 58% |
| ch06 Work, Energy and Simple Machines | 1ee3042 | 2 (18 + 20) | 6 | 32 | 65 | 60% |
| ch07 Structure of an Atom | 1606dc4 | 2 (18 + 20) | 6 | 32 | 63 | 63% |
| ch08 Atoms and Molecules | 56f1236 | 2 (16 + 17) | 6 | 31 | 64 | 63% |
| ch09 Sound | c5eef4e | 2 (16 + 16) | 6 | 32 | 65 | 49% |
| ch10 Reproduction | eded398 | 2 (18 + 19) | 6 | 31 | 56 | 48% |
| ch11 Diversity | d5b20e4 | 2 (18 + 19) | 7 | 31 | 66 | 64% |
| ch12 Earth as a System: Energy, Matter and Life | 9df9ef3 | 2 (17 + 17) | 6 | 32 | 60 | 62% |

### Who wrote each chapter (D-050)
| Chapter | Writer |
|---|---|
| ch01–ch02 (Cell, Tissues) | Sonnet 5.5 writer (Agent tool, `model: "sonnet"`), one writer for both |
| ch03, ch05 (Motion; Force and Laws of Motion) | Sonnet 5.5 writer, one writer for both |
| ch04, ch08 (Mixtures; Atoms and Molecules) | Sonnet 5.5 writer, one writer for both |
| ch06, ch09 (Work, Energy and Simple Machines; Sound) | Sonnet 5.5 writer, one writer for both |
| ch07, ch10 (Structure of an Atom; Reproduction) | Sonnet 5.5 writer, one writer for both. It was cut off by a session limit, resumed with SendMessage, and later sent two ch10 diagrams back for fixes. |
| ch11, ch12 (Diversity; Earth as a System) | A first Sonnet 5.5 writer drafted ch11 and the ch12 SVGs before a session limit stopped it. A second Sonnet 5.5 writer finished both. |

At most two writers ran at a time. The producer (Claude Opus 5.5) reviewed every chapter: facts, scope, the sensitive content in ch10, and rendered diagrams for ch01, ch02, ch04, ch07, ch10 and ch12; the writers rendered and checked all of their own SVGs. The producer then fixed what needed fixing, gated and committed. No chapter needed the Opus quality fallback: none needed heavy fixing and none failed gates for content reasons. Every item's provenance names the Sonnet writer and the Opus reviewer.

### Scope and rules
- **Syllabus.** Chapters follow `catalog/cbse/9/science/syllabus.yaml`: the new 2026–27 NCERT Class 9 book (NCF-SE 2023), 12 SOYL chapters (book chapters 2–13). The chapters, topics and learning outcomes come from that file, not from the old book.
- **Thin syllabus lines.** Where the syllabus is thin, the chapter stays at Class 9 level, and each README records the uncertainty:
  - ch01: recent advances in cell biology
  - ch04: Indian traditional separation practices
  - ch05: momentum only as a consequence of the third law
  - ch09: C. V. Raman's work on Indian drums
  - ch10: age-appropriate reproductive health, with no contraception
  - ch12: approximate and time-sensitive climate data
- **Tests.** Each chapter has `t_cbse9sci_chNN_short` (20 marks, 40 min) and `t_cbse9sci_chNN_long` (40 marks, 90 min), on the class-default blueprints `cbse-9-default-chapter-test-short` and `-long`. They have Section A objective, B short answer (with internal choice in the long test), C long answer with choice, and D CBSE-style competency case items. The two tests share no item.
- **Builder.** The CBSE 11 Chemistry builder with CBSE 9 Science ids, family `science` and the class-9 blueprints. The pipeline's verify checks and the DB-6 answer-leak scan run inside every build.
- **Content.** g = 9.8 m s⁻² is stated wherever it is used. Every numerical is computed in code and asserted. Constructed data are labelled given or illustrative. Stems use fresh set-ups so they do not repeat CBSE 10 Science, CBSE 11 and ICSE 10 banks.
- **Status.** All items are `status: "draft"`, provenance `human` (D-025/D-026).

## How to verify
From `platform/` in the worktree:
```
npm run content -- catalog
npm test -w @soyl/content-templates
npm run content -- lint --exemplars
npm run content -- verify --board cbse --class 9 --subject science --authored
npm run content -- originality --authored
npx vitest run --root db test/db6-split.test.ts
npx vitest run --root api test/content.test.ts
```
Results of the last full run (under the shared `heavy.sh` lock):
- catalog: valid, 0 errors, 0 warnings
- content-templates: 3662 tests passed
- lint --exemplars: exit 0
- verify --board cbse --class 9 --subject science --authored: 12 units, 762 questions, 0 blocking flags
- originality --authored: 523 units, 0 errors
- db6-split: 8 passed
- api content: 13 passed

## Tests added
None (content only).

## Review fixes by the producer (beyond the writers' own)
- **ch01:** removed a duplicated "Cell wall" callout on the plant cell.
- **ch02:** the illustrative daily calcium need is now about 1000 mg, not 800 mg, which is closer to the guideline for ages 13–15. The worked example and the numerical were recomputed.
- **ch07:** the alpha-particle rebound fraction is now "roughly one in many thousands", not "about 1 in 8000", because textbooks quote 1 in 8000 or 1 in 12 000.
- **ch10:** two diagrams were sent back to the writer. The male-system schematic drew the penis through the scrotum, and the flower drew the filaments starting inside the ovary. Both were redrawn, each with a new self-check.
- **ch12:** removed a pixel measurement from the latitude diagram's caption.
- **All chapters:** a single shared `lib.mjs` now lives in ch01.
- **Originality gate (first full run):** a ch06 true-false stem on work as a scalar matched an ICSE 10 Physics stem. The producer rewrote it around two named students, and the re-run was fully green.

## Known gaps / follow-ups
- Narration audio is not generated (TTS stage).
- Facts a reviewer may wish to double-check, including every assumption made where the syllabus is thin, are listed in each chapter's README.
- The syllabus header notes that the mapping from book chapter numbers to titles was inferred, and should be verified against the printed NCERT book.

## Decisions made
No ADRs. No shared files, schemas, catalog, templates, tests or marketing files were touched.

## Needs from owner
None.
