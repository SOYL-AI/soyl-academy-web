# subject-producer — CBSE 11 Physics (in progress), hand-authored (D-025, D-026, D-050) — 2026-11-02

Status: **partial — in progress**: ch01–ch02 done and committed, one commit per chapter (all items `status: "draft"` pending review); ch03 and ch04 are with their writers; work continues in syllabus order to ch14.

Branch: `platform/subject-producer/cbse-11-physics` (worktree `C:/Users/Prabhu/soyl-wt/content-cbse11-physics`), created from `platform/main` and fast-forwarded to 852ea29 on 2026-11-04. Not pushed, not merged.

**Process (D-050).** Each chapter is written by a Sonnet 5.5 chapter sub-agent (at most two at a time) from one shared brief; the subject-producer (Opus 5.5) re-solves every item from the built bank, fixes or sends back what it finds, runs the full seven gates on the final files and commits. If a Sonnet chapter needs heavy fixing, or two in a row fail gates for content reasons, that chapter's writer is re-run on Opus and the change is recorded here.

## What changed
| Path | What | Commit |
|---|---|---|
| `platform/content/authored/physics/cbse-11-physics-ch01/` | Units and Measurements: `release.json`, `tests.json`, `README.md`, `src/` (incl. the CBSE 11 library `lib.mjs`) | 0231dd8 |
| `platform/content/authored/physics/cbse-11-physics-ch02/` | Motion in a Straight Line | abdff42 |
| `docs/platform/handoffs/2026-11-02-subject-producer-cbse11-physics.md` | This note | updated per batch |

**CBSE 11 library** — `cbse-11-physics-ch01/src/lib.mjs` is a copy of the CBSE 12 Physics library (`cbse-12-physics-ch01/src/lib.mjs`) with unit `cbse-11-physics-chNN`, ids `q_cbse11phy_chNN_###` and `t_cbse11phy_chNN_{short,long}`, subject `cbse-11-physics`, and the class-11 default blueprints `cbse-11-default-chapter-test-short` / `-long` (catalog/cbse/blueprints/11; the subject folder has only annual and half-yearly blueprints). The class-11 and class-12 default chapter-test blueprints have identical sections, so `buildTests` is unchanged. `setChapter(nn, title, author)` takes an optional author string so the provenance can record the writer model per chapter (default: Sonnet writer reviewed by Opus).

## Chapters
| Chapter | Written by | Decks (slides) | Notes sections | Flashcards | Questions | Tests | Diagrams | App+ items |
|---|---|---|---|---|---|---|---|---|
| ch01 Units and Measurements | Sonnet 5.5 sub-agent; reviewed by the subject-producer | 2 (20 + 21) | 4 | 30 | 76 | short 20 m / long 40 m | 7 SVG + 1 plot | 55% |
| ch02 Motion in a Straight Line | Sonnet 5.5 sub-agent; reviewed and corrected by the subject-producer | 2 (16 + 20) | 4 | 30 | 77 | short 20 m / long 40 m | 6 SVG + 8 plots | 55% |
| **Total so far** | | | | **60** | **153** | **4 tests** | | |

**Sonnet quality record**
- **ch01:** no gate failures for content reasons; review found no errors (every item, case part and alternative re-solved; AR keys a c b d a c).
- **ch02:** no gate failures for content reasons; review found one wrong number (q010's lift example gave a path length of 57 m instead of 51 m), fixed with the answer trimmed to its word limit; AR keys a d b b a c.

Chapter notes:
- **ch01** uses the NCERT rounding convention (trailing zeros without a decimal point not significant; a dropped 5 makes the last kept digit even); radian and steradian as former supplementary units, now dimensionless derived units; errors at mean-absolute-error level.
- **ch02** leaves out relative velocity (not named in the syllabus topics and not confirmed in the rationalised chapter); two numericals carry 3 marks.

## How to verify (from `platform/`)
```
npm test -w @soyl/content-templates                                   # Tests 3389 passed (3389)
npm run content -- lint --exemplars                                   # exit 0; cbse-11-physics-ch01..02: 0 error(s), 0 warning(s)
npm run content -- verify --board cbse --class 11 --subject physics --authored
                                                                       # 2 unit(s), 153 questions, 0 blocking flag(s), 0 minor flags
npm run content -- originality --authored                             # 484 unit(s), 0 error(s); each CBSE 11 Physics chapter 0 error(s), 0 warning(s)
npm run content -- catalog                                            # catalog valid: 0 error(s), 0 warning(s)
npx vitest run --root db test/db6-split.test.ts                       # Tests 8 passed (8)
npx vitest run --root api test/content.test.ts                        # Tests 13 passed (13)
npx tsx content/authored/physics/cbse-11-physics-chNN/src/build.mjs   # rebuild: 0 errors, 0 warnings; byte-identical
```
All gates run under `_tools/heavy.sh` on the final files before each commit; the numbers above are from the run before the latest commit (2026-11-04 09:20–09:27 IST).

Tests added: none outside the chapters (the gates pick the chapters up automatically).

## Scope decisions
- Follows `catalog/cbse/11/physics/syllabus.yaml` (14 chapters, 2026–27 rationalised; its removed lists are empty), at the depth of the rationalised NCERT book.
- Originality (D-036): everything is written fresh; the originality gate compares against every authored unit (CBSE 12, ISC 12 and ICSE 10 Physics, CBSE 9/10 Science and more), so every stem names its own set-up and numbers.
- Chapter tests include case-based items (Section D), as the CBSE default blueprints require.

## Known gaps / follow-ups
- Items are `draft`; a content-verifier sample has not been run. Narration has not been through TTS; `audio` is null.
- Sketches and derivation figures asked for in answers are described in words in the model answers.

Decisions made: none new (D-025, D-026, D-036, D-050 followed).
Needs from owner: none.
