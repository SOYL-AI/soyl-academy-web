# subject-producer — CBSE 12 Physics ch01–ch14, hand-authored (D-025, D-026) — 2026-10-29 to 2026-10-31

Status: **done** — all 14 chapters of `catalog/cbse/12/physics/syllabus.yaml` authored, gated and committed one commit per chapter (all items `status: "draft"` pending review). ch01–ch08 were merged by the Lead and are live in production (2026-10-30); ch09–ch13 are being released by the Lead (2026-10-31); ch14 is committed and ready.

Branch: `platform/subject-producer/cbse-12-physics` (worktree `C:/Users/Prabhu/soyl-wt/content-cbse12-physics`), based on `platform/main` 9f3ea8f. Not pushed, not merged.

## What changed
| Path | What | Commit |
|---|---|---|
| `platform/content/authored/physics/cbse-12-physics-ch01/` | Electric Charges and Fields: `release.json`, `tests.json`, `README.md`, `src/` (incl. the shared `lib.mjs`) | da3cd9d |
| `platform/content/authored/physics/cbse-12-physics-ch02/` | Electrostatic Potential and Capacitance (same layout) | 2505352 |
| `platform/content/authored/physics/cbse-12-physics-ch03/` | Current Electricity | 568e113 |
| `platform/content/authored/physics/cbse-12-physics-ch04/` | Moving Charges and Magnetism | 3bf139b |
| `platform/content/authored/physics/cbse-12-physics-ch05/` | Magnetism and Matter | 5858194 |
| `platform/content/authored/physics/cbse-12-physics-ch06/` | Electromagnetic Induction | a6e2e0b |
| `platform/content/authored/physics/cbse-12-physics-ch07/` | Alternating Current | 6fe17a4 |
| `platform/content/authored/physics/cbse-12-physics-ch08/` | Electromagnetic Waves | e79261b |
| `platform/content/authored/physics/cbse-12-physics-ch09/` | Ray Optics and Optical Instruments | 8eaef22 |
| `platform/content/authored/physics/cbse-12-physics-ch10/` | Wave Optics | 5f2ad45 |
| `platform/content/authored/physics/cbse-12-physics-ch11/` | Dual Nature of Radiation and Matter | 71f4033 |
| `platform/content/authored/physics/cbse-12-physics-ch12/` | Atoms | f7c53e4 |
| `platform/content/authored/physics/cbse-12-physics-ch13/` | Nuclei | a8edb1f |
| `platform/content/authored/physics/cbse-12-physics-ch14/` | Semiconductor Electronics: Materials, Devices and Simple Circuits | 1fdf500 |
| `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-physics.md` | This note | e855415, updated per chapter |

`physics/` is a family folder under `content/authored/` (the `physics` family already exists in `content-pipeline/config/families.ts`; lint, verify, originality, the content gate and the DB-6/API tests all discover it without changes).

**Authoring library** — `cbse-12-physics-ch01/src/lib.mjs` is a copy of the CBSE 10 Science ch06 library (not imported across subjects), adapted for Class 12 Physics; ch02–ch14 import it (same owner):
- ids `q_cbse12phy_chNN_###` and `t_cbse12phy_chNN_{short,long}`, subject `cbse-12-physics`, **`blueprint_id` set** to `cbse-12-default-chapter-test-short` / `-long`; the test builder asserts the exact blueprint layout (types, marks, choice groups) and that the two tests are disjoint;
- physics number helpers (`sci`, `dec`, `sig`, constants) so every number in decks, questions and schemes is computed by the script, with significant figures kept; every numerical item carries a scripted re-solve check;
- narration lint extended to SI unit abbreviations;
- the pipeline’s **stage-5 deterministic checks** run inside every build, so arithmetic-in-`=`-chains and numeric-key problems fail the build before the CLI gate;
- the stage-4 lint call uses family `physics`.

## Chapters
| Chapter | Decks (slides) | Notes sections | Flashcards | Questions | Tests | Diagrams | App+ items |
|---|---|---|---|---|---|---|---|
| ch01 Electric Charges and Fields | 2 (19 + 20) | 7 | 32 | 76 | short 20 m / long 40 m | 12 SVG + 2 plots | 50% |
| ch02 Electrostatic Potential and Capacitance | 2 (17 + 17) | 7 | 32 | 73 | short / long | 8 SVG + 3 plots | 48% |
| ch03 Current Electricity | 2 (16 + 15) | 6 | 31 | 72 | short / long | 6 SVG + 3 plots | 47% |
| ch04 Moving Charges and Magnetism | 2 (17 + 16) | 6 | 30 | 73 | short / long | 9 SVG + 2 plots | 47% |
| ch05 Magnetism and Matter | 2 (16 + 17) | 6 | 30 | 70 | short / long | 6 SVG + 2 plots | 50% |
| ch06 Electromagnetic Induction | 2 (15 + 16) | 5 | 30 | 68 | short / long | 5 SVG + 1 plot | 51% |
| ch07 Alternating Current | 2 (15 + 18) | 5 | 30 | 70 | short / long | 5 SVG + 3 plots | 51% |
| ch08 Electromagnetic Waves | 2 (14 + 14) | 3 | 28 | 67 | short / long | 3 SVG + 1 plot | 48% |
| ch09 Ray Optics and Optical Instruments | 3 (14 + 17 + 13) | 5 | 30 | 74 | short / long | 10 SVG + 1 plot | 49% |
| ch10 Wave Optics | 2 (16 + 15) | 5 | 30 | 64 | short / long | 5 SVG + 3 plots | 55% |
| ch11 Dual Nature of Radiation and Matter | 2 (16 + 15) | 4 | 30 | 64 | short / long | 3 SVG + 5 plots | 47% |
| ch12 Atoms | 2 (16 + 16) | 4 | 30 | 61 | short / long | 4 SVG + 2 plots | 46% |
| ch13 Nuclei | 2 (16 + 15) | 4 | 30 | 67 | short / long | 3 SVG + 2 plots | 46% |
| ch14 Semiconductor Electronics | 2 (15 + 16) | 4 | 30 | 67 | short / long | 6 SVG + 4 plots | 46% |
| **Total** | **29 decks** | | **423** | **966** | **28 tests** | | |

Every chapter: worked examples and 3–5 objective check slides per deck, summary and exam-tips slides, a visual on nearly every slide (largest gap 1), 3–4 case-based items with an either/or part (c) (`passage_origin: "soyl-original"`), at least 60 questions over at least 5 types, top-level d4–5 items, and application-or-higher items inside the 45–65% band. Per-chapter details (shape, type/difficulty/competency/topic tables, test composition, verifier findings) are in each `README.md`.

**Diagram self-checks** (recorded in `build.checks.diagrams`, all pass): e.g. ch01 field lines traced by RK4 from Coulomb’s law; ch02 equipotentials checked constant to < 0.01 %; ch03 a two-loop circuit solved by script; ch09 ray diagrams computed from the mirror/lens formulas and a prism drawn with Snell’s law at both faces; ch10 Huygens constructions satisfying sin i/sin r = v₁/v₂; ch12 alpha paths integrated from the Coulomb force with deflections matching tan(θ/2) = d/2b; ch13 binding energies per nucleon computed from atomic masses with the peak at ⁵⁶Fe; ch14 band gaps to scale and bias polarity checked. All SVGs were rasterised with Playwright Chromium and checked by eye; layout fixes are listed in the READMEs.

## How to verify (from `platform/`)
```
npm test -w @soyl/content-templates                                   # Tests 792 passed (792) after ch14
npm run content -- lint --exemplars                                   # exit 0; cbse-12-physics-ch01..14: 0 error(s), 0 warning(s)
npm run content -- verify --board cbse --class 12 --subject physics --authored
                                                                       # 14 unit(s), 966 questions, 0 blocking flag(s); every chapter n/n pass, 0 minor flags
npm run content -- originality --authored                             # 113 unit(s), 0 error(s); ch01..14 0 error(s), 0 warning(s)
npx vitest run --root db test/db6-split.test.ts                       # Test Files 1 passed, Tests 8 passed (8)
npx vitest run --root api test/content.test.ts                        # Test Files 1 passed, Tests 13 passed (13)
npx tsx content/authored/physics/cbse-12-physics-chNN/src/build.mjs   # rebuild: 0 errors, 0 warnings; git status clean afterwards
```
All six were run under `_tools/heavy.sh` after every chapter (results above are from the run after ch14). Rebuilding each chapter leaves the tree clean (checked with `git status` before each commit).

Tests added: none outside the chapters (the content gate, lint, verify, originality, DB-6 and API tests pick the chapters up automatically; the content gate grew by 7 tests per chapter).

## Scope decisions
- Follows `catalog/cbse/12/physics/syllabus.yaml` exactly, including its deletions: polarisation (ch10), Davisson–Germer (ch11), radioactivity (ch13), special-purpose diodes, transistors and logic gates (ch14) are not taught. Where an outcome says “no derivation” (YDSE fringe width, ch10) or “formula only” (energy of a capacitor, ch02), no item asks for the derivation.
- Constants are stated in stems; where rounded constants give a value different from the measured one (Balmer 3 → 2 line 658 nm against 656 nm, ch12), the slides and answers say so.
- Competency: one-step substitutions are tagged understanding under D-035; chapters that needed extra reasoning items to reach the band list them in their READMEs.
- Originality (D-036): all explanations, examples, contexts (Indian cities, labs, power stations, science centres) and questions are written fresh; no NCERT or sample-paper text was reproduced or reconstructed. The originality gate flagged one item (ch09 vs CBSE 10 Science) during authoring; it was rewritten. Following the Lead’s 2026-10-31 note, ch14 stems name their own content (no generic “Match each term…” stems); ch10–ch13 match stems name their physics quantities, scientists, series or nuclear terms, and passed the originality gate when committed (ch13 q002 was since made more specific by the Lead on `platform/main`).

## Known gaps / follow-ups
- Items are `draft`; a content-verifier sample (AGENTS.md §5.4) has not been run.
- Narration has not been through TTS (stage 8); `audio` is null.
- Sketches, ray diagrams and circuit diagrams asked for in written answers are described in words in the model answers.
- No frozen test series (unit tests, mocks) for CBSE 12 Physics yet; that is assessment-designer work.
- This worktree does not contain the Lead’s ch13 q002 stem change on `platform/main`; merge `platform/main` before touching ch13 again.

Decisions made: none new (D-025, D-026, D-032, D-035, D-036 followed).
Needs from owner: none.
