# subject-producer — ISC Class 11 Physics (hand-authored) — 2026-11-09

Status: **partial**. ch01–ch06 are done, with one commit per chapter after a fully green gate run. All items are `status: "draft"` until a reviewer approves them. ch07–ch23 are not started; a ch07 draft was cut off and is uncommitted (see Known gaps).

Branch: `platform/subject-producer/isc-11-physics` (worktree `C:/Users/Prabhu/soyl-wt/content-isc11-physics`), from `platform/main` 54643166. Not pushed and not merged.

**Process (D-050).** Sonnet 5.5 chapter sub-agents write each chapter, at most two at a time, from one shared brief. The subject-producer (Opus 5.5) then:
- re-solves every item from the built bank and fixes what it finds;
- re-renders every SVG and checks it;
- rebuilds the chapter and confirms the rebuild is byte-identical;
- runs the seven gates on the final files, then commits.

The Opus fallback was not triggered: no Sonnet chapter needed heavy fixing, and none failed a gate for content reasons.

## What changed
| Path | What | Commit |
|---|---|---|
| `platform/content/authored/physics/isc-11-physics-ch01/` | Units and Measurement: `release.json`, `tests.json`, `README.md`, `src/` (including the ISC 11 library `lib.mjs`) | a1104744 |
| `platform/content/authored/physics/isc-11-physics-ch02/` | Motion in a Straight Line | f204526b |
| `platform/content/authored/physics/isc-11-physics-ch03/` | Vectors | 4e4da3a0 |
| `platform/content/authored/physics/isc-11-physics-ch04/` | Projectile Motion | bf610a44 |
| `platform/content/authored/physics/isc-11-physics-ch05/` | Newton's Laws of Motion | 770a4d6a |
| `platform/content/authored/physics/isc-11-physics-ch06/` | Friction | 79249a51 |
| `docs/platform/handoffs/2026-11-09-subject-producer-isc11-physics.md` | This note | docs commit after ch06 |

### The ISC 11 library
`isc-11-physics-ch01/src/lib.mjs` is a copy of the ISC 12 Physics library (`isc-12-physics-ch01/src/lib.mjs`) with these changes:
- Unit `isc-11-physics-chNN`, ids `q_isc11phy_chNN_###` and `t_isc11phy_chNN_{short,long}`, subject `isc-11-physics`.
- Chapter tests on `isc-11-default-chapter-test-short` / `-long`. These have the same sections as the ISC 12 defaults, so the section builder and its layout assertions are unchanged.
- `setChapter(nn, title, author)` records the writer model in the provenance (D-050).
- A bank near-duplicate pre-check. It applies the originality gate's exact-stem and 5-gram Jaccard rules against every physics and science chapter and the exemplars, using the pipeline's own `nearDuplicates`.
- A failing build is parked as `release.wip.json` / `tests.wip.json`, so the tree-wide gates never see a half-built chapter.

Later chapters import the library from ch01.

**Assertion-reason options.** The options and their order were checked against the ISC 2027 Physics specimen itself: 861 Paper 1, Q1(A)(vii), downloaded from the URL in `catalog/sources/cisce.md#isc-2027-specimen-861-physics` on 2026-11-09. The specimen reads:
- (a) Both Assertion and Reason are true, and Reason is the correct explanation for Assertion.
- (b) Both Assertion and Reason are true, but Reason is not the correct explanation for Assertion.
- (c) Assertion is true and Reason is false.
- (d) Assertion is false and Reason is true.

This is the CBSE-style option (d), and the library uses exactly this wording and order.

## Chapters
| Chapter | Written by | Decks (slides) | Notes | Flashcards | Questions (marks) | Tests | Visuals | App+ items |
|---|---|---|---|---|---|---|---|---|
| ch01 Units and Measurement | Sonnet 5.5; reviewed and corrected by Opus 5.5 | 2 (20 + 22) | 6 | 30 | 79 (149) | short 20 m / long 40 m | 7 SVG + tables | 62% |
| ch02 Motion in a Straight Line | Sonnet 5.5; reviewed by Opus 5.5 | 2 (21 + 21) | 5 | 30 | 71 (142) | short 20 m / long 40 m | 7 SVG + 6 plot slides | 51% |
| ch03 Vectors | Sonnet 5.5; reviewed by Opus 5.5 | 2 (22 + 20) | 5 | 30 | 81 (153) | short 20 m / long 40 m | 9 SVG + 2 plot slides | 54% |
| ch04 Projectile Motion | Sonnet 5.5; reviewed by Opus 5.5 | 2 (16 + 18) | 3 | 30 | 72 (149) | short 20 m / long 40 m | 6 SVG + 10 plot slides | 50% |
| ch05 Newton's Laws of Motion | Sonnet 5.5; reviewed and corrected by Opus 5.5 | 2 (20 + 21) | 5 | 30 | 78 (163) | short 20 m / long 40 m | 10 SVG + 4 plot slides | 54% |
| ch06 Friction | Sonnet 5.5; reviewed by Opus 5.5 | 2 (19 + 22) | 4 | 30 | 72 (147) | short 20 m / long 40 m | 8 SVG + 4 plot slides | 53% |
| **Total** | | **12 decks (242 slides)** | **28** | **180** | **453 (903)** | **12 tests** | | |

### Mix of question types
| Type | Per chapter | Notes |
|---|---|---|
| MCQ | 22–28 | 1 mark |
| Assertion-reason | 6 | keys use all four options in every chapter |
| True-false and fill-blank | 2–3 of each | 1 mark |
| Numerical | 6–12 | 1–3 marks, computed by the build and re-solved |
| Short answer | 11–14 at 2 marks and 11–14 at 3 marks | derivations are among the 3-mark items |
| Long answer | 7–9 | 5 marks, set in parts with the marks shown |

There are no case-based items: the ISC specimen sets its 5-mark questions in parts instead.

### Review record
Every item in ch01–ch06 was re-solved from the dumped bank. Every SVG was re-rendered with headless Chromium, and the bounds and overlap checker reported 0 problems over 47 diagrams.

| Chapter | Findings | Fix |
|---|---|---|
| ch01 | One MCQ solution said "the first ratio is dimensionless", which refers to an option by position (the build shuffles options). | The solution now names the ratio (force × time ÷ momentum). |
| ch01 | The 5-mark unit-conversion item gave a weak limitation in part (c): "angle has no dimensions". | Part (c) now gives "only units related by a pure factor; no scales with a shifted zero such as °C to °F". |
| ch02–ch04 | No errors. | — |
| ch05 | The Lami long answer named "180° − (30° + 45°)" without its value. | It now reads "= 105°, and sin 105° = sin 75° = 0.9659". |
| ch06 | No errors. | — |

Points the writers left open, which the subject-producer accepted:
- **ch02:** calculus is kept to the listed derivatives, without the chain rule. The one exception is a = v dv/dx, used in the calculus derivation of v² = u² + 2as.
- **ch04:** the speed at a height is derived from components, before the work-energy chapter.
- **ch05:** momentum conservation is derived from the second law, and the third law is then derived from conservation, in the syllabus order.
- **ch06:** the roller model uses f = μN with a stated μ.

## How to verify (from `platform/`)
```
npm test -w @soyl/content-templates
npm run content -- lint --exemplars
npm run content -- verify --board cisce --class 11 --subject physics --authored
npm run content -- originality --authored
npx vitest run --root db test/db6-split.test.ts
npx vitest run --root api test/content.test.ts
npx vitest run --root content-pipeline test/series.test.ts
npx tsx content/authored/physics/isc-11-physics-chNN/src/build.mjs   # rebuild: 0 errors, 0 warnings, lint 0/0, re-solves ok; byte-identical
```
All the gates were run once under `_tools/heavy.sh`, on the final files of ch01–ch06, from 2026-11-09 19:55 to 22:40 IST (log `C:/Users/Prabhu/soyl-wt/isc11-physics-gates1.log`). The run started after the last rebuild (ch05, 19:06 IST), and the release md5s were unchanged at commit time.

| Gate | Result |
|---|---|
| `npm run content -- catalog` | catalog valid: 0 errors, 0 warnings |
| content gate | Tests 4691 passed (4691) |
| lint | exit 0; each ISC 11 Physics chapter 0 errors, 0 warnings (also checked inside each build) |
| verify | 6 units, 453 questions, 0 blocking, 0 minor flags |
| originality | 670 units, 0 errors; every ISC 11 Physics chapter 0 errors, 0 warnings |
| DB-6 split | Tests 8 passed (8) |
| API content | Tests 13 passed (13) |
| series | Tests 41 passed (41) |

Each chapter was rebuilt in the worktree. ch02, ch03, ch04 and ch06 rebuilt byte-identical to the writers' builds. ch01 and ch05 changed by the review fixes, and each was then rebuilt twice with identical output.

All 47 SVGs were rendered with headless Chromium using `scratchpad/isc11phy/render-svgs.mjs`. It reported 0 text or shapes outside the viewBox and 0 overlapping labels.

Tests added: none outside the chapters; the gates pick the chapters up automatically.

## Scope decisions
- The chapters follow `catalog/cisce/isc-11/physics/syllabus.yaml` (ISC 2028 syllabus, Class XI portion; 23 SOYL chapters), not CBSE 11.
- ISC-specific content is taught, for example:
  - CGS/FPS/MKS/MKSA systems and the rules for unit symbols;
  - elementary calculus (derivatives of xⁿ, sin, cos, eˣ, ln x; ∫xⁿ);
  - the equations of motion derived by the graphical, calculus and analytical methods;
  - vectors as a chapter of their own, with direction cosines;
  - F = dp/dt, with mass variation near c as an idea only;
  - momentum conservation leading to the third law;
  - Lami's theorem, three coplanar forces and the ladder problem;
  - classical against modern views of friction, the roller pulled against pushed, and the angles of friction and repose.
- The removed topics listed in the syllabus are left out:
  - ch03: the proofs of the commutative and associative laws;
  - ch04: projectiles on an inclined plane.
- Chapter tests use the class defaults `isc-11-default-chapter-test-short` / `-long` (1/2/3/5-mark ISC pattern, internal choice in B, C and D, no case slot). The short and long tests share no item.
- Originality (D-036): every stem was written fresh with its own set-up. The originality gate compares against CBSE 11/12, ISC 12 and ICSE Physics and CBSE 9/10 Science; the build's pre-check uses the same rule.

## Known gaps / follow-ups
- ch07–ch23 (Circular Motion through Superposition, Stationary Waves and Beats) are not written. A ch07 writer was started and then cut off. Its partial `src/` and a parked `release.wip.json` are left **untracked** in the worktree; they are not committed and must not be. A later producer can resume or replace them.
- Items are `draft`; a content-verifier sample has not been run. Narration has not been through TTS, so `audio` is null.
- Sketches and derivation figures asked for in answers are described in words in the model answers.
- ch01 sits at 62% application-or-higher, near the top of the 45–65% band. Its numericals are honestly tagged.

Decisions made: none new (D-025, D-026, D-035, D-036, D-050 followed).
Needs from owner: none.
