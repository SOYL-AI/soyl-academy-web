# subject-producer — CBSE 11 Physics, hand-authored (D-025, D-026, D-050) — 2026-11-02 to 2026-11-09

Status: **done** — all 14 chapters of `catalog/cbse/11/physics/syllabus.yaml` are authored and committed, one commit per chapter (all items `status: "draft"` pending a content-verifier sample). ch01–ch13 are merged on `platform/main` and live; ch14 and this note are on the branch, waiting for the Lead's next content wave.

Branch: `platform/subject-producer/cbse-11-physics` (worktree `C:/Users/Prabhu/soyl-wt/content-cbse11-physics`). Not pushed. Work was paused by the owner on 2026-11-08 with ch14 drafted but not gated; a new subject-producer session resumed it on 2026-11-09, merged `platform/main` (54643166) into the branch, reviewed and fixed ch14, gated and committed it.

**Process (D-050).** Each chapter was written by a Sonnet 5.5 chapter sub-agent (at most two at a time) from one shared brief; the subject-producer (Opus 5.5) re-solved every item from the built bank, fixed or sent back what it found, ran the content gates on the final files and committed. No chapter needed an Opus re-write (no Sonnet draft needed heavy fixing, and no two chapters in a row failed gates for content reasons).

## What changed
| Path | What | Commit |
|---|---|---|
| `platform/content/authored/physics/cbse-11-physics-ch01/` | Units and Measurements: `release.json`, `tests.json`, `README.md`, `src/` (incl. the CBSE 11 library `lib.mjs`); later competency tags corrected | 0231dd87, a9c16b53 |
| `…/cbse-11-physics-ch02/` | Motion in a Straight Line | abdff42d |
| `…/cbse-11-physics-ch03/` | Motion in a Plane | 8ad7d93d |
| `…/cbse-11-physics-ch04/` | Laws of Motion | 88f7414d |
| `…/cbse-11-physics-ch05/` | Work, Energy and Power | 7f2cd1f0 |
| `…/cbse-11-physics-ch06/` | System of Particles and Rotational Motion | 12bea5c4 |
| `…/cbse-11-physics-ch07/` | Gravitation | 2fdff2f8 |
| `…/cbse-11-physics-ch08/` | Mechanical Properties of Solids | d3ae6951 |
| `…/cbse-11-physics-ch09/` | Mechanical Properties of Fluids | 42a1f471 |
| `…/cbse-11-physics-ch10/` | Thermal Properties of Matter | 42c7368f |
| `…/cbse-11-physics-ch11/` | Thermodynamics | de735b59 |
| `…/cbse-11-physics-ch12/` | Kinetic Theory | 74344a8c |
| `…/cbse-11-physics-ch13/` | Oscillations | df121210 |
| `…/cbse-11-physics-ch14/` | Waves | 0c120f67 (branch only) |
| `docs/platform/handoffs/2026-11-02-subject-producer-cbse11-physics.md` | This note | updated with ch03–ch14 |

**CBSE 11 library** — `cbse-11-physics-ch01/src/lib.mjs` is a copy of the CBSE 12 Physics library (`cbse-12-physics-ch01/src/lib.mjs`) with unit `cbse-11-physics-chNN`, ids `q_cbse11phy_chNN_###` and `t_cbse11phy_chNN_{short,long}`, subject `cbse-11-physics`, and the class-11 default blueprints `cbse-11-default-chapter-test-short` / `-long` (`catalog/cbse/blueprints/11`; the subject folder has only annual and half-yearly blueprints). The class-11 and class-12 default chapter-test blueprints have identical sections, so `buildTests` is unchanged. `setChapter(nn, title, author)` takes an optional author string so the provenance can record the writer model per chapter. Every chapter's `src/build.mjs` imports this library read-only and rewrites its two JSON files byte for byte.

## Chapters
Every chapter has two decks, notes, 30+ flashcards, a bank of 71–96 questions and two chapter tests (short: 20 marks, 40 min; long: 40 marks, 90 min; disjoint) on the class-11 default blueprints. "App+" is the share of items tagged application or higher (target band 45–65%).

| Chapter | Written by | Decks (slides) | Notes sections | Flashcards | Questions (marks) | Diagrams | App+ |
|---|---|---|---|---|---|---|---|
| ch01 Units and Measurements | Sonnet 5.5; reviewed by Opus 5.5 | 2 (20 + 21) | 4 | 30 | 76 (142) | 7 SVG + 1 plot | 64% |
| ch02 Motion in a Straight Line | Sonnet 5.5; reviewed by Opus 5.5 | 2 (16 + 20) | 4 | 30 | 77 (154) | 6 SVG + 8 plots | 55% |
| ch03 Motion in a Plane | Sonnet 5.5; reviewed by Opus 5.5 | 2 (21 + 21) | 4 | 33 | 89 (181) | 9 SVG + 6 plots | 60% |
| ch04 Laws of Motion | Sonnet 5.5; reviewed by Opus 5.5 | 2 (21 + 21) | 4 | 30 | 77 (156) | 8 SVG + 3 plots | 60% |
| ch05 Work, Energy and Power | Sonnet 5.5; reviewed by Opus 5.5 | 2 (18 + 25) | 4 | 30 | 74 (143) | 8 SVG + 5 plots | 59% |
| ch06 System of Particles and Rotational Motion | Sonnet 5.5; reviewed by Opus 5.5 | 2 (20 + 19) | 4 | 30 | 83 (158) | 11 SVG + 3 plots | 61% |
| ch07 Gravitation | Sonnet 5.5; reviewed by Opus 5.5 | 2 (19 + 19) | 4 | 30 | 83 (160) | 5 SVG + 5 plots | 58% |
| ch08 Mechanical Properties of Solids | Sonnet 5.5; reviewed by Opus 5.5 | 2 (17 + 20) | 2 | 30 | 71 (143) | 6 SVG + 8 plots | 59% |
| ch09 Mechanical Properties of Fluids | Sonnet 5.5; reviewed by Opus 5.5 | 2 (22 + 22) | 4 | 30 | 87 (173) | 13 SVG + 4 plots | 59% |
| ch10 Thermal Properties of Matter | Sonnet 5.5; reviewed by Opus 5.5 | 2 (23 + 19) | 4 | 30 | 96 (197) | 7 SVG + 4 plots | 56% |
| ch11 Thermodynamics | Sonnet 5.5; reviewed by Opus 5.5 | 2 (17 + 19) | 4 | 30 | 72 (143) | 6 SVG + 6 plots | 57% |
| ch12 Kinetic Theory | Sonnet 5.5; reviewed by Opus 5.5 | 2 (19 + 20) | 4 | 30 | 83 (171) | 6 SVG + 4 plots | 55% |
| ch13 Oscillations | Sonnet 5.5; reviewed by Opus 5.5 | 2 (20 + 21) | 3 | 30 | 71 (153) | 4 SVG + 7 plots | 52% |
| ch14 Waves | Sonnet 5.5; reviewed by Opus 5.5 (two passes, 2026-11-08 and 2026-11-09) | 2 (20 + 20) | 4 | 30 | 86 (168) | 7 SVG + 4 plots | 57% |
| **Total** | | **28 decks (560 slides)** | **53** | **423** | **1125 (2242)** | | |

Tests: 28 chapter tests (14 short, 14 long), each matching `cbse-11-default-chapter-test-short` / `-long` section by section (A: MCQ + assertion-reason; B: 2- and 3-mark short answers, with internal choice in the long test; C: 5-mark long answers with internal choice; D: 4-mark case-based items with an either/or part).

**Sonnet quality record** (details in each chapter README under "Verifier pass" and "Subject-producer review")
- **ch01:** no errors found; later (a9c16b53) numericals tagged "understanding" were retagged "application" under the honest-tag rule.
- **ch02:** one wrong number (q010's lift example gave 57 m instead of 51 m), fixed.
- **ch03:** scope fix by Lead ruling: relative velocity (removed in the 2023 rationalisation) taken out, its two items replaced with vector-subtraction items; after the honest-tag rule ten numericals were retagged and eight application numericals were replaced with genuine understanding items (band 69% → 60%).
- **ch04:** five numericals retagged; six application numericals replaced with understanding items (68% → 60%).
- **ch05:** six numericals retagged; eight application items replaced (70% → 59%).
- **ch06:** six numericals retagged (61%). Parallel/perpendicular-axis theorems and rolling motion left out.
- **ch07:** one numerical retagged (58%).
- **ch08:** one printed value in a solution summary (2.624 mm → 2.623 mm) fixed; five numericals retagged (59%).
- **ch09:** scope fix: the critical-speed (Reynolds) numerical removed (the syllabus asks for Reynolds number qualitatively); six numericals retagged (59%).
- **ch10:** no errors; four numericals retagged (56%). The tiffin long answer rounds k to 0.118 min⁻¹ but computes 44.7 °C from the unrounded k (44.6 °C with the rounded value): graders should accept either.
- **ch11:** no errors; two numericals retagged (57%).
- **ch12:** no errors; no tags changed.
- **ch13:** no errors; no tags changed.
- **ch14:** first pass (2026-11-08): one solution summary (violin long answer) printed rounded values that did not match the model answer, fixed. Second pass (2026-11-09, after the pause): q019's solution referred to options by position although the build shuffles options (now quotes the equations); five one-mark schemes (q073 and the b-parts of the four cases) gave the mark for a step without the asked value (now state 72 swells, 88.4 Hz, 283 Hz, 0.25 s, 0.770 mm); in the reflection figure the free-end ring stayed on the axis while the string's end rose (now drawn at the end's displacement); in the string-modes figure a label ran off the right edge and the caption sat outside the viewBox (fixed); a check-slide hint did not match its item (q076); a student-facing notes line talked about "the rationalised book" (reworded). All seven ch14 diagrams were rendered (headless Chromium) and inspected after the fixes. No tags changed (57%). A search of ch01–ch13 solutions for the same position-based option wording found none.

## How to verify (from `platform/`)
```
npm test -w @soyl/content-templates                                   # Test Files 1 passed (1); Tests 4656 passed (4656)
npm run content -- lint --exemplars                                   # exit 0; every unit 0 error(s), 0 warning(s), incl. cbse-11-physics-ch01..14
npm run content -- verify --board cbse --class 11 --subject physics --authored
                                                                       # 14 unit(s), 1125 questions, 0 blocking flag(s); ch14 86/86 pass, 0 blocking + 0 minor flags
npm run content -- originality --authored                             # 665 unit(s), 0 error(s)
npx vitest run --root db test/db6-split.test.ts                       # Tests 8 passed (8)
npx vitest run --root api test/content.test.ts                        # Tests 13 passed (13)
npx vitest run --root content-pipeline test/series.test.ts            # Tests 41 passed (41)
npx tsx content/authored/physics/cbse-11-physics-chNN/src/build.mjs   # rebuild: 0 errors, 0 warnings; byte-identical (tree stays clean)
```
All gates were run under `_tools/heavy.sh` on the final files before each chapter commit. The numbers above are from the run before the ch14 commit (2026-11-09, started 01:48 IST, after ch14's final build; two consecutive ch14 builds gave the same md5 for `release.json` and `tests.json`).

Tests added: none outside the chapters (the gates pick the chapters up automatically).

## Scope decisions
- Follows `catalog/cbse/11/physics/syllabus.yaml` (14 chapters, 2026–27 rationalised; its removed lists are empty), at the depth of the rationalised NCERT book. Where a topic was not named by the syllabus topics and the writer could not confirm the rationalised book keeps it, it was left out and listed in the chapter README (Lead ruling).
- Left out, by chapter: ch02 relative velocity; ch03 relative velocity, non-uniform circular motion; ch04 pseudo forces, the rocket equation, vertical circles; ch06 parallel/perpendicular-axis theorems, rolling motion; ch07 the latitude/rotation effect on g, geostationary and polar satellites, weightlessness (the 2026–27 syllabus text may still name geostationary satellites: the owner may want a short add-on); ch09 quantitative Reynolds number; ch11 the Carnot engine and Carnot efficiency; ch12 specific heats of solids, the Maxwell distribution, the mean-free-path derivation; ch13 damped and forced oscillations, resonance, combined springs, the large-angle correction; ch14 the humidity effect on the speed of sound, the Doppler effect, end corrections, wave intensity, transmission at a boundary.
- Originality (D-036): everything is written fresh; the originality gate compares against every authored unit (CBSE 12, ISC 12, ICSE 9/10 Physics, CBSE 9/10 Science and more), so every stem names its own set-up and numbers.
- Chapter tests include case-based items (Section D), as the CBSE default blueprints require.

## Known gaps / follow-ups
- Items are `draft`; a content-verifier sample (≥ 5% per unit) has not been run. Narration has not been through TTS (stage 8); `audio` is null on every slide.
- Sketches and derivation figures asked for in answers are described in words in the model answers; graders should accept any correct sketch.
- The omissions listed under Scope decisions should be confirmed against the 2026–27 rationalised book by a reviewer; ch07 (geostationary satellites), ch11 (Carnot) and ch13 (damped and forced oscillations) are the most likely to need short add-ons.
- ch08 has 2 notes sections and ch13 has 3 (the others 4): the notes cover all topics, grouped differently.

Decisions made: none new (D-025, D-026, D-036, D-049, D-050 followed).
Needs from owner: none.
