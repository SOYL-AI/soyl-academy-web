| ch08 Electromagnetic Waves | 2 (14 + 14) | 3 | 28 | 67 | short / long | 3 SVG + 1 plot | 48% |
| `platform/content/authored/physics/cbse-12-physics-ch08/` | Electromagnetic Waves | e79261b |
| ch07 Alternating Current | 2 (15 + 18) | 5 | 30 | 70 | short / long | 5 SVG + 3 plots | 51% |
| `platform/content/authored/physics/cbse-12-physics-ch07/` | Alternating Current | 6fe17a4 |
| ch06 Electromagnetic Induction | 2 (15 + 16) | 5 | 30 | 68 | short / long | 5 SVG + 1 plot | 51% |
| `platform/content/authored/physics/cbse-12-physics-ch06/` | Electromagnetic Induction | a6e2e0b |
# subject-producer — CBSE 12 Physics ch01–ch08 (in progress), hand-authored (D-025, D-026) — 2026-10-29

Status: **partial — in progress**: ch01–ch08 done and committed (all items `status: "draft"` pending review); work continues in board order (ch09 next). ch01–ch04 were merged by the Lead and are live in production (2026-10-29).

Branch: `platform/subject-producer/cbse-12-physics` (worktree `C:/Users/Prabhu/soyl-wt/content-cbse12-physics`), based on `platform/main` 9f3ea8f. Not pushed, not merged; one commit per chapter so the Lead can pick chapters up individually.

## What changed
| Path | What | Commit |
|---|---|---|
| `platform/content/authored/physics/cbse-12-physics-ch01/` | Electric Charges and Fields: `release.json`, `tests.json`, `README.md`, `src/` | da3cd9d |
| `platform/content/authored/physics/cbse-12-physics-ch02/` | Electrostatic Potential and Capacitance (same layout) | 2505352 |
| `platform/content/authored/physics/cbse-12-physics-ch03/` | Current Electricity (same layout) | 568e113 |
| `platform/content/authored/physics/cbse-12-physics-ch04/` | Moving Charges and Magnetism | 3bf139b |
| `platform/content/authored/physics/cbse-12-physics-ch05/` | Magnetism and Matter | 5858194 |
| `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-physics.md` | This note | e855415, updated per chapter |

`physics/` is a new family folder under `content/authored/` (the `physics` family already exists in `content-pipeline/config/families.ts`; lint, verify, originality, the content gate and the DB-6/API tests all discover it without changes).

**Authoring library** — `cbse-12-physics-ch01/src/lib.mjs` is a copy of the CBSE 10 Science ch06 library (not imported across folders), adapted for Class 12 Physics:
- ids `q_cbse12phy_chNN_###` and `t_cbse12phy_chNN_{short,long}`, subject `cbse-12-physics`, **`blueprint_id` set** to `cbse-12-default-chapter-test-short` / `-long`; the test builder asserts the exact blueprint layout (types, marks, choice groups) and that the two tests are disjoint;
- physics number helpers (`sci`, `dec`, `sig`, constants `K`, `EPS0`, `QE`, `ME`) so every number in decks, questions and schemes is computed by the script, with significant figures kept;
- narration lint extended to SI unit abbreviations (N, C, V, J, F, W, A, pF, nC, eV, μ);
- the pipeline’s **stage-5 deterministic checks** (`verify/checks.ts`) run inside every build, so arithmetic-in-`=`-chains and numeric-key problems fail the build before the CLI gate;
- the stage-4 lint call uses family `physics`.
ch02 and ch03 import this library (same owner).

## Chapters
| Chapter | Decks (slides) | Notes sections | Flashcards | Questions | Tests | Diagrams | App+ items |
|---|---|---|---|---|---|---|---|
| ch01 Electric Charges and Fields | 2 (19 + 20) | 7 | 32 | 76 | short 20 m / long 40 m | 12 SVG + 2 plots | 50% |
| ch02 Electrostatic Potential and Capacitance | 2 (17 + 17) | 7 | 32 | 73 | short / long | 8 SVG + 3 plots | 48% |
| ch03 Current Electricity | 2 (16 + 15) | 6 | 31 | 72 | short / long | 6 SVG + 3 plots | 47% |
| ch04 Moving Charges and Magnetism | 2 (17 + 16) | 6 | 30 | 73 | short / long | 9 SVG + 2 plots | 47% |
| ch05 Magnetism and Matter | 2 (16 + 17) | 6 | 30 | 70 | short / long | 6 SVG + 2 plots | 50% |

Every chapter: 6 worked examples, 6 objective check slides, summary and exam-tips slides per deck, a visual on 29–35 slides of 31–39 (largest gap 1), 4 case-based items with an either/or part (c), all 15 v1 objective/written types used except multi-select and source-based. Per-chapter details (shape, type/difficulty/competency/topic tables, test composition, verifier findings) are in each `README.md`.

**Diagram self-checks** (recorded in `build.checks.diagrams`): ch01 field lines traced by RK4 from Coulomb’s law with every arrowhead checked against the computed field, dipole/neutral-point directions, superposition drawn to scale; ch02 equipotentials traced perpendicular to the field and checked constant to < 0.01 %; ch03 two-loop circuit solved by script with junction and loop rules verified and arrows in the solved directions, Wheatstone balance potentials. All SVGs were rasterised with Playwright Chromium and checked by eye; layout fixes are listed in the READMEs.

## How to verify (from `platform/`)
```
npm test -w @soyl/content-templates                                   # Tests 750 passed (750) after ch08
npm run content -- lint --exemplars                                   # exit 0; cbse-12-physics-ch01..08: 0 error(s), 0 warning(s)
npm run content -- verify --board cbse --class 12 --subject physics --authored
                                                                       # 8 unit(s), 569 questions, 0 blocking flag(s); every chapter n/n pass, 0 minor flags
npm run content -- originality --authored                             # 107 unit(s), 0 error(s); ch01..08 0 error(s), 0 warning(s)
npx vitest run --root db test/db6-split.test.ts                       # Test Files 1 passed, Tests 8 passed (8)
npx vitest run --root api test/content.test.ts                        # Test Files 1 passed, Tests 13 passed (13)
npx tsx content/authored/physics/cbse-12-physics-ch0N/src/build.mjs   # rebuild: 0 errors, 0 warnings; git status clean afterwards
```
All six were run (under `_tools/heavy.sh`) after the last chapter commit, with the results above. Rebuilding all three chapters leaves the tree clean (checked with `git status`).

Tests added: none outside the chapters (the content gate, lint, verify, originality, DB-6 and API tests pick the new chapters up automatically; the content gate grew from 701 to 715 tests).

## Scope decisions
- Follows `catalog/cbse/12/physics/syllabus.yaml` exactly; no chapter in ch01–ch03 has deleted topics. ch02 t06 is “formula only”: no item asks for the derivation of ½CV². ch03 uses series/parallel resistors only as Class 10 tools; colour codes and the potentiometer are not used.
- Polarisation (ch02) is treated without the susceptibility formula to avoid clashing conventions for χ.
- Competency: each chapter sits at 47–50% application-or-above items (band 45–65%); one-step substitutions are tagged understanding under the D-035 rule. Two chapters needed extra reasoning items to clear the band honestly (listed in their READMEs).
- Originality (D-036): all explanations, examples, contexts (Delhi, Bhopal, Shillong, Nagpur, Kolkata, Lucknow, Bhubaneswar) and questions are written fresh; no NCERT or sample-paper text was reproduced or reconstructed.

## Known gaps / follow-ups
- Items are `draft`; a content-verifier sample (AGENTS.md §5.4) has not been run.
- Narration has not been through TTS (stage 8); `audio` is null.
- Sketches and circuit diagrams asked for in written answers are described in words in the model answers.
- No frozen test series (unit tests, mocks) for CBSE 12 Physics yet; that is assessment-designer work once more chapters exist.

Decisions made: none new (D-025, D-026, D-032, D-035, D-036 followed).
Needs from owner: none.
