# subject-producer — ISC 12 Physics ch01–ch21, hand-authored (D-025, D-026) — 2026-10-31 to 2026-11-02

Status: **done**: all 21 chapters of `catalog/cisce/isc-12/physics/syllabus.yaml` are committed, one commit per chapter, each after a full seven-gate run on its final files (all items `status: "draft"` pending review). ch01–ch19 have been released by the Lead; ch20 and ch21 are committed and await the next wave. From 2026-10-31 evening chapters were written by up to two chapter sub-agents at a time from one shared brief, and reviewed, gated and committed by the subject-producer; ch15 passed its gates before ch14 and was committed first.

Branch: `platform/subject-producer/isc-12-physics` (worktree `C:/Users/Prabhu/soyl-wt/content-isc12-physics`), created from local `platform/main` 4b86da3. Not pushed, not merged by this agent.

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
| `platform/content/authored/physics/isc-12-physics-ch14/` | Refraction and Dispersion by a Prism | 459b7cb |
| `platform/content/authored/physics/isc-12-physics-ch15/` | Refraction at Spherical Surfaces and Thin Lenses | 2be00b0 |
| `platform/content/authored/physics/isc-12-physics-ch16/` | Optical Instruments | 48e838d |
| `platform/content/authored/physics/isc-12-physics-ch17/` | Wave Optics: Interference and Diffraction | 3c86ec5 |
| `platform/content/authored/physics/isc-12-physics-ch18/` | Dual Nature of Radiation and Matter | 8101ccd |
| `platform/content/authored/physics/isc-12-physics-ch19/` | Atoms | de0f375 |
| `platform/content/authored/physics/isc-12-physics-ch20/` | Nuclei and Nuclear Energy | 69c4e4f |
| `platform/content/authored/physics/isc-12-physics-ch21/` | Semiconductor Electronics: Materials, Diodes and Simple Circuits | b42edd7 |
| `docs/platform/handoffs/2026-10-31-subject-producer-isc12-physics.md` | This note | updated per batch |

**ISC library** — `isc-12-physics-ch01/src/lib.mjs` is a copy of the author’s CBSE 12 Physics library adapted to ISC: unit `isc-12-physics-chNN`, ids `q_isc12phy_chNN_###` and `t_isc12phy_chNN_{short,long}`, subject `isc-12-physics`; assertion-reason options in ISC wording with option (d) “Assertion is false and Reason is true” (the ISC 2027 Physics specimen keeps the CBSE-style option d); chapter tests on `isc-12-default-chapter-test-short` / `-long` (catalog/cisce/blueprints/12) with the section builder of the ISC 12 Biology library, which asserts each section’s exact type/mark/choice layout and that the two tests are disjoint. Later chapters import it from ch01.

## Chapters
| Chapter | Written by | Decks (slides) | Notes sections | Flashcards | Questions | Tests | Diagrams | App+ items |
|---|---|---|---|---|---|---|---|---|
| ch01 Electric Charges and Fields | Opus 5.5 (subject-producer) | 2 (19 + 16) | 5 | 30 | 72 | short 20 m / long 40 m | 8 SVG + 2 plots | 46% |
| ch02 Electric Flux and Gauss’s Theorem | Opus 5.5 (subject-producer) | 2 (14 + 14) | 5 | 30 | 62 | short 20 m / long 40 m | 5 SVG + 2 plots | 48% |
| ch03 Electrostatic Potential and Potential Energy | Opus 5.5 (subject-producer) | 2 (16 + 14) | 5 | 30 | 69 | short 20 m / long 40 m | 6 SVG + 2 plots | 46% |
| ch04 Capacitance and Dielectrics | Opus 5.5 (subject-producer) | 2 (15 + 15) | 6 | 30 | 67 | short 20 m / long 40 m | 5 SVG + 2 plots | 52% |
| ch05 Electric Current, Ohm’s Law and Resistivity | Opus 5.5 (started by subject-producer, finished by sub-agent) | 2 (14 + 14) | 5 | 30 | 65 | short 20 m / long 40 m | 4 SVG + 2 plots | 48% |
| ch06 Cells, Kirchhoff’s Laws, Bridges and Potentiometer | Opus 5.5 sub-agent | 2 (17 + 18) | 6 | 30 | 71 | short 20 m / long 40 m | 9 SVG + 3 plots | 52% |
| ch07 Moving Charges and Magnetic Field | Opus 5.5 sub-agent | 2 (18 + 17) | 6 | 30 | 68 | short 20 m / long 40 m | 12 SVG + 2 plots | 60% |
| ch08 Torque on a Current Loop and the Moving Coil Galvanometer | Opus 5.5 sub-agent | 2 (16 + 17) | 5 | 30 | 72 | short 20 m / long 40 m | 9 SVG + 3 plots | 64% |
| ch09 Magnetism and Matter | Opus 5.5 sub-agent | 2 (18 + 19) | 5 | 30 | 71 | short 20 m / long 40 m | 11 SVG + 3 plots | 63% |
| ch10 Electromagnetic Induction | Opus 5.5 sub-agent | 2 (18 + 19) | 6 | 30 | 73 | short 20 m / long 40 m | 7 SVG + 3 plots + 3 flows | 63% |
| ch11 Alternating Current | Opus 5.5 sub-agent | 2 (20 + 20) | 6 | 30 | 75 | short 20 m / long 40 m | 11 SVG + 9 plots | 57% |
| ch12 Electromagnetic Waves | Opus 5.5 sub-agent | 2 (18 + 18) | 6 | 30 | 68 | short 20 m / long 40 m | 5 SVG + 2 plots + 2 flows | 54% |
| ch13 Reflection at Spherical Mirrors and Refraction at Plane Surfaces | Opus 5.5 sub-agent | 2 (18 + 20) | 5 | 30 | 70 | short 20 m / long 40 m | 14 SVG + 3 plots | 57% |
| ch14 Refraction and Dispersion by a Prism | Opus 5.5 sub-agent | 2 (19 + 17) | 6 | 30 | 69 | short 20 m / long 40 m | 9 SVG + 4 plots + 1 flow | 57% |
| ch15 Refraction at Spherical Surfaces and Thin Lenses | Opus 5.5 sub-agent | 2 (17 + 19) | 5 | 30 | 70 | short 20 m / long 40 m | 10 SVG + 3 plots + 1 flow | 59% |
| ch16 Optical Instruments | Opus 5.5 sub-agent | 2 (17 + 19) | 5 | 30 | 68 | short 20 m / long 40 m | 9 SVG + 2 plots | 54% |
| ch17 Wave Optics: Interference and Diffraction | Opus 5.5 sub-agent | 2 (19 + 19) | 6 | 30 | 74 | short 20 m / long 40 m | 10 SVG + 7 plots | 55% |
| ch18 Dual Nature of Radiation and Matter | Opus 5.5 sub-agent | 2 (19 + 18) | 5 | 30 | 75 | short 20 m / long 40 m | 6 SVG + 6 plots | 52% |
| ch19 Atoms | Opus 5.5 sub-agent | 2 (18 + 18) | 6 | 30 | 71 | short 20 m / long 40 m | 7 SVG + 4 plots | 55% |
| ch20 Nuclei and Nuclear Energy | **Sonnet 5.5 sub-agent**, reviewed and corrected by the subject-producer (Opus 5.5) | 2 (19 + 21) | 7 | 30 | 75 | short 20 m / long 40 m | 8 SVG + 2 plots | 61% |
| ch21 Semiconductor Electronics: Materials, Diodes and Simple Circuits | **Sonnet 5.5 sub-agent**, reviewed by the subject-producer (Opus 5.5) | 2 (19 + 20) | 7 | 30 | 99 | short 20 m / long 40 m | 12 SVG + 10 plot visuals | 56% |
| **Total** | | | | **630** | **1504** | **42 tests** | | |

Writer models: ch01–ch04 were written in-context by the subject-producer (Opus 5.5; ch04’s farad stem was reworded before commit); ch05 was started in-context and finished by an Opus 5.5 chapter sub-agent; ch06–ch19 by Opus 5.5 chapter sub-agents; ch20–ch21 by Sonnet 5.5 chapter sub-agents (owner instruction, 2026-11-01 22:10 IST), each reviewed item by item by the subject-producer before commit.

**Sonnet quality record** (for the owner’s fallback rule):
- **ch20 — 1 gate failure for content reasons, fixed.** The first full run failed lint (2 `math.arithmetic` errors) and verify (2 blocking flags) on two solutions written “4.03 × 10⁻¹⁴ = 4.03” and “8.90 × 10³⁷ = 8.90”, plus a competency-balance warning; the writer fixed them and the chapter then passed. Review found further issues, all fixed by the subject-producer before commit: all five assertion-reason items were keyed (a), so three were rewritten (keys now a 2, b 1, c 1, d 1); two marking-scheme figures in the Cs + Rb fission items were 2 × 10⁻⁶ u off the computed sum (235.865317 u, Δm = 0.187278 u); the proton–proton table now shows step 1 as 0.42 MeV (1.44 MeV with annihilation) so the steps add up to 26.7 MeV. All 30 atomic masses were checked against standard tables (agreement within 1 × 10⁻⁵ u; the textbook ¹⁴¹Ba and ⁹²Kr values differ from current tables by 1–2 × 10⁻⁵ u, under 0.02 MeV in Q) and all binding energies and Q values re-derived; details in the ch20 README “Subject-producer review”.
- **ch21 — no gate failure of its own** (its first run was red only because of ch20). Review of all 99 items found no errors: every numerical re-computed, keys and ISC scope (no bridge rectifier, crystal structure, transistors or logic gates) confirmed.
- The Opus fallback was not triggered (no heavy rewrite and no two consecutive content failures).

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
- **ch14** treats the rainbow by ray diagram and explanation only (its derivation is removed in ISC); total reflecting prisms stay in ch13.
- **ch15** derives refraction at a single spherical surface only for the convex-towards-rarer, real-image case and does not examine silvered lenses (both removed in ISC); a lens with a separate plane or concave mirror is in scope. New Cartesian signs throughout.
- **ch16** derives the simple microscope (D and ∞), the compound microscope (image at D) and the telescope (normal adjustment and D); the compound microscope with the image at infinity is an expression only (derivation removed). Resolving power uses d = λ/(2n sin β) without the 1.22 factor, stated in each stem; the Cassegrain is treated with an effective focal length.
- **ch17** states I = I₁ + I₂ + 2√(I₁I₂) cos φ without derivation (removed in ISC) and keeps the single slit elementary; the first secondary maximum uses the (n + ½)λ approximation (exact 1.43λ/a is noted). Its release.json is 1.28 MB, the largest authored release, because the intensity plots are fine point series; worth a look if bundle size matters.
- **ch18** uses h = 6.6 × 10⁻³⁴ J s (stated in stems; CBSE ch11 uses 6.63); Davisson–Germer is qualitative only (removed in ISC); the frequency I–V curves assume equal photon rates.
- **ch19** uses hc = 1240 eV nm alongside 13.6 eV and R = 1.097 × 10⁷ m⁻¹ (they agree to 1 in 4000); the Rutherford scattering formula is not examined (removed in ISC); Balmer is described as visible and near ultraviolet; Brackett and Pfund are covered.
- **ch20** leaves out radioactivity and the decay law (not in this ISC chapter) and keeps the chain reaction and reactor qualitative (removed details); see the Sonnet quality record above for the review fixes.
- **ch21** keeps energy bands qualitative and leaves out the bridge rectifier, crystal structure, transistors and logic gates (ISC scope); Ge gap 0.7 eV (accepted 0.67) as in the syllabus. It has 99 items, the most of any chapter.
- From ch09 on, the competency lint's 45–65% application-or-higher band was hit from above several times; one-step items were relabelled "understanding".

Every chapter follows the ISC 2027 Physics specimen style: 1-mark MCQ and assertion-reason items, 2- and 3-mark short answers (derivations among the 3-mark items), 5-mark questions set in parts with the marks shown, internal choice in the tests as the ISC default blueprints require, numericals in every topic. Per-chapter details, including the facts a reviewer should double-check, are in each `README.md` (“Verifier pass”).

## How to verify (from `platform/`)
```
npm test -w @soyl/content-templates                                   # Tests 1660 passed (1660)
npm run content -- lint --exemplars                                   # exit 0; isc-12-physics-ch01..21: 0 error(s), 0 warning(s)
npm run content -- verify --board cisce --class 12 --subject physics --authored
                                                                       # 21 unit(s), 1504 questions, 0 blocking flag(s), 0 minor flags
npm run content -- originality --authored                             # 237 unit(s), 0 error(s); every ISC 12 Physics chapter 0 error(s), 0 warning(s)
npm run content -- catalog                                            # catalog valid: 0 error(s), 0 warning(s)
npx vitest run --root db test/db6-split.test.ts                       # Tests 8 passed (8)
npx vitest run --root api test/content.test.ts                        # Tests 13 passed (13)
npx tsx content/authored/physics/isc-12-physics-chNN/src/build.mjs   # rebuild: 0 errors, 0 warnings; byte-identical, git status clean afterwards
```
All gates were run under `_tools/heavy.sh` before each chapter commit; the numbers above are from the final run (2026-11-02 08:37–08:41 IST, on the committed ch20 and ch21 files).

Tests added: none outside the chapters (the gates pick the chapters up automatically).

## Scope decisions
- Follows `catalog/cisce/isc-12/physics/syllabus.yaml` (21 SOYL chapters grouped from the nine ISC units), including topics CBSE deletes where ISC keeps them; each chapter README lists its topics and the syllabus’s removed items.
- Originality (D-036): explanations, examples and questions are written fresh. The originality gate compares against the author’s CBSE 12 Physics bank as well, so every stem names its own set-up and numbers; diagram code is reused from the CBSE chapters where the physics is the same (copied, not imported across subjects).
- No stimulus (case-based) items: the ISC Physics specimen sets 5-mark questions in parts instead.

## Known gaps / follow-ups
- Items are `draft`; a content-verifier sample has not been run. Narration has not been through TTS; `audio` is null.
- Sketches and derivation figures asked for in answers are described in words in the model answers.
- ch17’s release.json (1.28 MB) could be slimmed by coarser plot series if bundle size matters.

Decisions made: none new (D-025, D-026, D-032, D-035, D-036 followed).
Needs from owner: none.
