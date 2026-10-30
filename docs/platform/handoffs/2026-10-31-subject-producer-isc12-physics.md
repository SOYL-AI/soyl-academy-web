# subject-producer — ISC 12 Physics ch01–ch02 (in progress), hand-authored (D-025, D-026) — 2026-10-31

Status: **partial — in progress**: ch01–ch02 done and committed, one commit per chapter (all items `status: "draft"` pending review); work continues in syllabus order (ch03 next) to ch21.

Branch: `platform/subject-producer/isc-12-physics` (worktree `C:/Users/Prabhu/soyl-wt/content-isc12-physics`), created from local `platform/main` 4b86da3. Not pushed, not merged.

## What changed
| Path | What | Commit |
|---|---|---|
| `platform/content/authored/physics/isc-12-physics-ch01/` | Electric Charges and Fields: `release.json`, `tests.json`, `README.md`, `src/` (incl. the ISC library `lib.mjs`) | 8348f30 |
| `platform/content/authored/physics/isc-12-physics-ch02/` | Electric Flux and Gauss’s Theorem | a64ae24 |
| `docs/platform/handoffs/2026-10-31-subject-producer-isc12-physics.md` | This note | updated per chapter |

**ISC library** — `isc-12-physics-ch01/src/lib.mjs` is a copy of the author’s CBSE 12 Physics library adapted to ISC: unit `isc-12-physics-chNN`, ids `q_isc12phy_chNN_###` and `t_isc12phy_chNN_{short,long}`, subject `isc-12-physics`; assertion-reason options in ISC wording with option (d) “Assertion is false and Reason is true” (the ISC 2027 Physics specimen keeps the CBSE-style option d); chapter tests on `isc-12-default-chapter-test-short` / `-long` (catalog/cisce/blueprints/12) with the section builder of the ISC 12 Biology library, which asserts each section’s exact type/mark/choice layout and that the two tests are disjoint. Later chapters import it from ch01.

## Chapters
| Chapter | Decks (slides) | Notes sections | Flashcards | Questions | Tests | Diagrams | App+ items |
|---|---|---|---|---|---|---|---|
| ch01 Electric Charges and Fields | 2 (19 + 16) | 5 | 30 | 72 | short 20 m / long 40 m | 8 SVG + 2 plots | 46% |
| ch02 Electric Flux and Gauss’s Theorem | 2 (14 + 14) | 5 | 30 | 62 | short 20 m / long 40 m | 5 SVG + 2 plots | 48% |
| **Total so far** | | | **60** | **134** | **4 tests** | | |

Every chapter follows the ISC 2027 Physics specimen style: 1-mark MCQ and assertion-reason items, 2- and 3-mark short answers (derivations among the 3-mark items), 5-mark questions set in parts with the marks shown, internal choice in the tests as the ISC default blueprints require, numericals in every topic. Per-chapter details are in each `README.md`.

## How to verify (from `platform/`)
```
npm test -w @soyl/content-templates                                   # Tests 1527 passed after ch02
npm run content -- lint --exemplars                                   # exit 0; isc-12-physics-ch01..02: 0 error(s), 0 warning(s)
npm run content -- verify --board cisce --class 12 --subject physics --authored
                                                                       # 2 unit(s), 134 questions, 0 blocking flag(s), 0 minor flags
npm run content -- verify --board cbse --class 12 --subject physics --authored   # unchanged: 13 units, 899 questions, 0 blocking
npm run content -- originality --authored                             # 218 unit(s), 0 error(s); every ISC 12 Physics chapter 0 error(s), 0 warning(s)
npm run content -- catalog                                            # catalog valid: 0 error(s), 0 warning(s)
npx vitest run --root db test/db6-split.test.ts                       # Tests 8 passed (8)
npx vitest run --root api test/content.test.ts                        # Tests 13 passed (13)
npx tsx content/authored/physics/isc-12-physics-chNN/src/build.mjs   # rebuild: 0 errors, 0 warnings; git status clean afterwards
```
All gates were run under `_tools/heavy.sh` before each chapter commit; the numbers above are from the run before the latest commit.

Tests added: none outside the chapters (the gates pick the chapters up automatically).

## Scope decisions
- Follows `catalog/cisce/isc-12/physics/syllabus.yaml` (21 SOYL chapters grouped from the nine ISC units), including topics CBSE deletes where ISC keeps them; each chapter README lists its topics and the syllabus’s removed items.
- Originality (D-036): explanations, examples and questions are written fresh. The originality gate compares against the author’s CBSE 12 Physics bank as well, so every stem names its own set-up and numbers; diagram code is reused from the CBSE chapters where the physics is the same (copied, not imported across subjects).
- No stimulus (case-based) items: the ISC Physics specimen sets 5-mark questions in parts instead.

## Known gaps / follow-ups
- Items are `draft`; a content-verifier sample has not been run. Narration has not been through TTS; `audio` is null.
- Sketches and derivation figures asked for in answers are described in words in the model answers.

Decisions made: none new (D-025, D-026, D-032, D-035, D-036 followed).
Needs from owner: none.
