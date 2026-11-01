# subject-producer — ISC 12 Physics ch01–ch13 and ch15 (in progress), hand-authored (D-025, D-026) — 2026-10-31

Status: **partial — in progress**: ch01–ch13 and ch15 done and committed, one commit per chapter (all items `status: "draft"` pending review); work continues in syllabus order (ch14 and ch16 in progress, uncommitted; ch15 passed its gates first and was committed ahead of ch14) to ch21. Since 2026-10-31 evening, chapters are authored by up to two chapter sub-agents at a time (shared brief) and gated and committed by the subject-producer.

Branch: `platform/subject-producer/isc-12-physics` (worktree `C:/Users/Prabhu/soyl-wt/content-isc12-physics`), created from local `platform/main` 4b86da3. Not pushed, not merged.

## What changed
| Path | What | Commit |
|---|---|---|
| `platform/content/authored/physics/isc-12-physics-ch01/` | Electric Charges and Fields: `release.json`, `tests.json`, `README.md`, `src/` (incl. the ISC library `lib.mjs`) | 8348f30 |
| `platform/content/authored/physics/isc-12-physics-ch02/` | Electric Flux and Gauss’s Theorem | a64ae24 |
| `platform/content/authored/physics/isc-12-physics-ch03/` | Electrostatic Potential and Potential Energy | 20e561a |
| `platform/content/authored/physics/isc-12-physics-ch04/` | Capacitance and Dielectrics | 3070d3d |
| `platform/content/authored/physics/isc-12-physics-ch05/` | Electric Current, Ohm’s Law and Resistivity | fdbca03 |
| `platform/content/authored/physics/isc-12-physics-ch06/` | Cells, Kirchhoff’s Laws, Bridges and Potentiometer | 8fd432a |
| `platform/content/authored/physics/isc-12-physics-ch07/` | Moving Charges and Magnetic Field | 62d0edf |
| `platform/content/authored/physics/isc-12-physics-ch08/` | Torque on a Current Loop and the Moving Coil Galvanometer | e41b7d0 |
| `platform/content/authored/physics/isc-12-physics-ch09/` | Magnetism and Matter | 24b6f3d |
| `platform/content/authored/physics/isc-12-physics-ch10/` | Electromagnetic Induction | b4a97a1 |
| `platform/content/authored/physics/isc-12-physics-ch11/` | Alternating Current | de912e8 |
| `platform/content/authored/physics/isc-12-physics-ch12/` | Electromagnetic Waves | 600a597 |
| `platform/content/authored/physics/isc-12-physics-ch13/` | Reflection at Spherical Mirrors and Refraction at Plane Surfaces | b30709a |
| `platform/content/authored/physics/isc-12-physics-ch15/` | Refraction at Spherical Surfaces and Thin Lenses | 2be00b0 |
| `docs/platform/handoffs/2026-10-31-subject-producer-isc12-physics.md` | This note | updated per chapter |

**ISC library** — `isc-12-physics-ch01/src/lib.mjs` is a copy of the author’s CBSE 12 Physics library adapted to ISC: unit `isc-12-physics-chNN`, ids `q_isc12phy_chNN_###` and `t_isc12phy_chNN_{short,long}`, subject `isc-12-physics`; assertion-reason options in ISC wording with option (d) “Assertion is false and Reason is true” (the ISC 2027 Physics specimen keeps the CBSE-style option d); chapter tests on `isc-12-default-chapter-test-short` / `-long` (catalog/cisce/blueprints/12) with the section builder of the ISC 12 Biology library, which asserts each section’s exact type/mark/choice layout and that the two tests are disjoint. Later chapters import it from ch01.

## Chapters
| Chapter | Decks (slides) | Notes sections | Flashcards | Questions | Tests | Diagrams | App+ items |
|---|---|---|---|---|---|---|---|
| ch01 Electric Charges and Fields | 2 (19 + 16) | 5 | 30 | 72 | short 20 m / long 40 m | 8 SVG + 2 plots | 46% |
| ch02 Electric Flux and Gauss’s Theorem | 2 (14 + 14) | 5 | 30 | 62 | short 20 m / long 40 m | 5 SVG + 2 plots | 48% |
| ch03 Electrostatic Potential and Potential Energy | 2 (16 + 14) | 5 | 30 | 69 | short 20 m / long 40 m | 6 SVG + 2 plots | 46% |
| ch04 Capacitance and Dielectrics | 2 (15 + 15) | 6 | 30 | 67 | short 20 m / long 40 m | 5 SVG + 2 plots | 52% |
| ch05 Electric Current, Ohm’s Law and Resistivity | 2 (14 + 14) | 5 | 30 | 65 | short 20 m / long 40 m | 4 SVG + 2 plots | 48% |
| ch06 Cells, Kirchhoff’s Laws, Bridges and Potentiometer | 2 (17 + 18) | 6 | 30 | 71 | short 20 m / long 40 m | 9 SVG + 3 plots | 52% |
| ch07 Moving Charges and Magnetic Field | 2 (18 + 17) | 6 | 30 | 68 | short 20 m / long 40 m | 12 SVG + 2 plots | 60% |
| ch08 Torque on a Current Loop and the Moving Coil Galvanometer | 2 (16 + 17) | 5 | 30 | 72 | short 20 m / long 40 m | 9 SVG + 3 plots | 64% |
| ch09 Magnetism and Matter | 2 (18 + 19) | 5 | 30 | 71 | short 20 m / long 40 m | 11 SVG + 3 plots | 63% |
| ch10 Electromagnetic Induction | 2 (18 + 19) | 6 | 30 | 73 | short 20 m / long 40 m | 7 SVG + 3 plots + 3 flows | 63% |
| ch11 Alternating Current | 2 (20 + 20) | 6 | 30 | 75 | short 20 m / long 40 m | 11 SVG + 9 plots | 57% |
| ch12 Electromagnetic Waves | 2 (18 + 18) | 6 | 30 | 68 | short 20 m / long 40 m | 5 SVG + 2 plots + 2 flows | 54% |
| ch13 Reflection at Spherical Mirrors and Refraction at Plane Surfaces | 2 (18 + 20) | 5 | 30 | 70 | short 20 m / long 40 m | 14 SVG + 3 plots | 57% |
| ch15 Refraction at Spherical Surfaces and Thin Lenses | 2 (17 + 19) | 5 | 30 | 70 | short 20 m / long 40 m | 10 SVG + 3 plots + 1 flow | 59% |
| **Total so far** | | | **420** | **973** | **28 tests** | | |

Chapter notes since ch03:
- **ch04** was finished by the previous agent; one fill-blank stem (the farad) was word for word the CBSE 12 Physics ch02 stem and failed originality, so it was reworded before commit.
- **ch05** was half-written by the previous agent; it was reviewed and completed: about 20 stems that echoed CBSE ch03 were rewritten with fresh set-ups, six wrong numbers fixed (e.g. a drift time of about 3 h had been called "over 7 hours"), lint fixed (`n e`, not `ne`, in maths).
- **ch06** gives the potentiometer (kept by ISC, deleted by CBSE) full treatment: half of deck 2, two notes sections, 24 items.
- **ch07** examines the finite-conductor field and solenoid field as formulae only, as the ISC scope says; the ampere is given by its parallel-wire definition with a note on the 2019 SI.
- **ch08** uses only the right-hand rule (other direction rules are removed in ISC); includes the Bohr-orbit magnetic moment.
- **ch09** quotes the end-on/broadside-on fields as formulae (derivations removed); the B–H loop is qualitative; one neutral-point item uses the Earth's horizontal field as given data although terrestrial magnetism is not an ISC topic.
- **ch10** keeps eddy currents qualitative (ISC removed topic); the transformer and power transmission are here, the AC generator is in ch11.
- **ch11** gives bandwidth and Q as formulae only and LC oscillations qualitatively (derivations removed in ISC); derives RMS, half-cycle mean, Z and tan φ, average power and the generator emf.
- **ch12** uses band edges radio > 30 cm, microwave 1 mm–30 cm, IR 700 nm–1 mm, visible 400–700 nm, UV 1–400 nm, X-rays 1 pm–1 nm, gamma < 10 pm (textbooks differ; items avoid the boundaries); no mathematical treatment of EM waves.
- **ch13** uses the New Cartesian sign convention with signed answers; "total reflecting prisms (30, 45, 60, 90 degrees)" is read as 45°–90°–45° and 30°–60°–90° prisms; the fibre acceptance-angle items go slightly beyond the syllabus wording.
- **ch15** derives refraction at a single spherical surface only for the convex-towards-rarer, real-image case and does not examine silvered lenses (both removed in ISC); a lens with a separate plane or concave mirror is in scope. New Cartesian signs throughout.
- From ch09 on, the competency lint's 45–65% application-or-higher band was hit from above twice (66%, 70%); one-step items were relabelled "understanding".

Every chapter follows the ISC 2027 Physics specimen style: 1-mark MCQ and assertion-reason items, 2- and 3-mark short answers (derivations among the 3-mark items), 5-mark questions set in parts with the marks shown, internal choice in the tests as the ISC default blueprints require, numericals in every topic. Per-chapter details are in each `README.md`.

## How to verify (from `platform/`)
```
npm test -w @soyl/content-templates                                   # Tests 1618 passed after ch15 (run included ch14)
npm run content -- lint --exemplars                                   # exit 0; isc-12-physics-ch01..15: 0 error(s), 0 warning(s)
npm run content -- verify --board cisce --class 12 --subject physics --authored
                                                                       # 15 unit(s), 1042 questions (incl. uncommitted ch14), 0 blocking flag(s), 0 minor flags
npm run content -- verify --board cbse --class 12 --subject physics --authored   # unchanged: 13 units, 899 questions, 0 blocking
npm run content -- originality --authored                             # 231 unit(s), 0 error(s); every ISC 12 Physics chapter 0 error(s), 0 warning(s)
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
