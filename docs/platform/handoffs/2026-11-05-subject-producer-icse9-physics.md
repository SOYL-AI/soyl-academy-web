# subject-producer — ICSE Class 9 Physics — 2026-11-05 (completed 2026-11-08)

Status: done. ICSE 9 Physics ch01–ch12 are authored, reviewed, gated and committed, one commit per chapter.
Branch: `platform/subject-producer/icse-9-physics`, in worktree `C:/Users/Prabhu/soyl-wt/content-icse9-physics`. It was created from pushed `platform/main` 5cede4bc, and `platform/main` 72f2a9ef was merged in (fast-forward) on 8 Nov for the a1ae318 hookTimeout fix. Not pushed and not merged elsewhere.

## Who wrote what (D-050)
Every chapter was written by a **Sonnet sub-agent** (`claude-sonnet-5-5`). Every item's provenance author reads `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`.

The subject-producer (Opus) wrote no chapter content. It did the following:
- built the lib;
- wrote the writer brief;
- reviewed physics, syllabus scope, removed topics, diagrams and computed values;
- ran the gates and made the commits.

| Chapters | Writer |
|---|---|
| ch01–ch03 | Sonnet writer 1 |
| ch04–ch06 | Sonnet writer 2 |
| ch07–ch09 | Sonnet writer 3 |
| ch10–ch12 | Sonnet writer 4 |

At most two writers ran at a time. The Opus fallback was not needed.

**Competency tags:** the brief carries the team rule: tags must be honest, and a missed band is fixed by changing items. No writer retagged anything. Where a first build missed the 45–65% band, the writer added, replaced or rewrote items instead:
- ch01 at 70%;
- ch05 at 46%;
- ch07 at 43%;
- ch09 at 46%;
- ch11 at 45%.

## Lib and blueprints
- **Authoring lib:** `icse-9-physics-ch01/src/lib.mjs`, committed with ch01 and shared by every chapter. It was derived by `scratchpad/icse9phys/mklib.cjs` from the ICSE 9 Chemistry lib (same author). The changes:
  - ids `q_icse9phy_chNN_###` and `t_icse9phy_chNN_short|long`;
  - lint family `physics`;
  - the ICSE 10 Physics number helpers (`sig`, `dec`, `sci`, `near`, `G = 10`);
  - narration unit abbreviations for physics;
  - Section B instructions asking for formula, substitution and unit.
- **Checks added to every build:** the pipeline's deterministic verify checks and the DB-6 answer-leak scan.
- **Assertion-reason options:** the ICSE 2027 Physics specimen (521) order and wording, checked against the 521 PDF text: (a) (A) is true and (R) is false; (b) (A) is false and (R) is true; (c) both true, and (R) is the correct explanation of (A); (d) both true, but (R) is not.
- **Blueprints:** `icse-9-default-chapter-test-short` and `-long` from `catalog/cisce/blueprints/9`. No catalog change was needed.
  - **Short test** (20 marks, 30 min):
    - A: 4 MCQs, 1 assertion-reason item, one 2-mark and one 3-mark answer.
    - B: two 10-mark structured questions; candidates attempt 1.
  - **Long test** (40 marks, 60 min):
    - A: 7 MCQs, 1 assertion-reason item, three 2-mark and two 3-mark answers.
    - B: three 10-mark structured questions; candidates attempt 2.

## Chapters
Each folder `platform/content/authored/physics/icse-9-physics-chNN/` holds:
- `release.json`;
- `tests.json` — the two tests share no questions, and no deck-check item appears in a test;
- `README.md` — scope, shape, bank statistics, the verifier pass and a "For a reviewer" list;
- `src/` — `calc`, `svgs`, `decks`, `study`, `questions` and `build`.

Builds are deterministic: before the gate, every chapter was rebuilt and its output was byte-identical. All items are `status: "draft"`, provenance `human`.

| Chapter | Commit | Decks (slides) | Questions | Structured (10 marks) | Numericals | Application or higher | d4 | Flashcards | Distinct SVGs |
|---|---|---|---|---|---|---|---|---|---|
| ch01 Measurements and Experimentation | 7c7ec89d | 2 (15 + 17) | 73 | 6 | 12 | 63% | 1 | 30 | 26 |
| ch02 Motion in One Dimension | 86d7e646 | 2 (17 + 17) | 70 | 6 | 12 | 54% | 1 | 30 | 11 |
| ch03 Force and Newton's Laws of Motion | 1d96c13b | 2 (15 + 16) | 71 | 6 | 13 | 49% | 1 | 30 | 8 |
| ch04 Gravitation | 7a4e31b4 | 2 (15 + 15) | 67 | 6 | 11 | 51% | 1 | 30 | 4 |
| ch05 Pressure in Fluids | 1b8a5f39 | 2 (14 + 14) | 72 | 6 | 11 | 50% | 1 | 30 | 5 |
| ch06 Upthrust and Archimedes' Principle | dfcb6bd7 | 2 (16 + 16) | 69 | 6 | 12 | 54% | 1 | 30 | 5 |
| ch07 Heat and Energy | 0f2ea187 | 2 (17 + 16) | 73 | 6 | 12 | 47% | 1 | 30 | 11 |
| ch08 Reflection of Light at Plane Mirrors | 960fa81d | 2 (16 + 15) | 69 | 6 | 12 | 57% | 1 | 30 | 12 |
| ch09 Spherical Mirrors | 3ccb5e78 | 2 (18 + 14) | 74 | 6 | 13 | 47% | 1 | 30 | 12 |
| ch10 Sound and Wave Motion | 77288f73 | 2 (16 + 16) | 79 | 6 | 13 | 51% | 1 | 30 | 9 |
| ch11 Current Electricity | 49f00721 | 2 (17 + 15) | 83 | 6 | 15 | 51% | 1 | 30 | 8 |
| ch12 Magnetism | 588ae496 | 2 (15 + 15) | 67 | 6 | 6 | 51% | 2 | 30 | 11 |

Totals: 12 chapters, 867 questions (72 of them 10-mark structured questions, 142 numericals), 24 decks, 24 chapter tests (20 and 40 marks each), 360 flashcards.

- **Removed topics are respected:**
  - ch01: no pendulum derivation, and no non-pictorial Vernier or screw-gauge numericals. Every reading numerical has a pictorial scale SVG, with the coinciding line computed from the reading data and with positive and negative zero errors.
  - ch02: no non-uniform acceleration.
  - ch03: inertial mass is not taught.
  - ch04: no variation-of-g problems.
  - ch05: hydraulic machines are not described; Pascal's law appears only with a two-piston vessel.
  - ch09: no mirror-formula or f = R/2 derivation, and no scale drawing. The ray diagrams are qualitative, but the build checks that drawn rays meet where 1/v + 1/u = 1/f puts the image.
  - ch11: no V = W/q derivation, no meter working, and no cell construction.
- **Computed geometry and values:** every number comes from `calc.mjs`. The build also self-checks figures:
  - ch08 throws if any drawn ray breaks i = r, and image counts for inclined mirrors are checked against repeated reflection.
  - ch10 checks its wave geometry.
  - ch12 field lines are traced numerically (two-pole model plus a uniform earth field), with neutral points located where the field is about zero.
- **Originality:**
  - `originality --authored` reports 0 errors (632 units).
  - The writers' exact-stem checks caught and reworded duplicates against CBSE 9 Science ch03 (ch02, 7 stems), ICSE 9 Physics ch07 (ch08) and other banks (ch11–ch12, 4 stems).
- **Diagrams:** every chapter's SVGs were rendered and checked by eye by the writers; the producer re-rendered all 12 chapters. The producer checked these at full size:
  - ch12 field-line directions (N to S outside the magnet; induced S pole nearest an inducing N pole);
  - ch12 neutral points (equatorial for N pole north, axial for N pole south);
  - ch09 image positions and natures for all object positions.

## How to verify
Run from `platform/` in the worktree, under `_tools/heavy.sh`, with `scratchpad/icse9phys/gates.sh`. There was one gate run, on 2026-11-08 from 01:40 to 01:53 IST, with ch01–ch12 in place and after the hookTimeout merge; it exited 0. Each chapter was committed from that run, and none of its files changed after the run started (checked by file times and md5).

```
npm test -w @soyl/content-templates            # Tests 4425 passed (4425)
npm run content -- catalog                     # catalog valid: 0 error(s), 0 warning(s)
npm run content -- lint --exemplars            # ok icse-9-physics-ch01..ch12: 0 error(s), 0 warning(s)
npm run content -- verify --board cisce --class 9 --subject physics --authored
                                               # 12 unit(s), 867 questions, 0 blocking flag(s); every unit 0 blocking + 0 minor
npm run content -- originality --authored      # 632 unit(s), 0 error(s)
npx vitest run --root db test/db6-split.test.ts   # 8 passed
npx vitest run --root api test/content.test.ts    # 13 passed
```

## Facts for a reviewer
Every chapter README has a full "For a reviewer" list. The main points:
- **ch01:**
  - Vernier: 10 VSD = 9 MSD, LC 0.1 mm. Screw gauge: pitch 1 mm, 100 divisions, LC 0.01 mm.
  - Zero-error signs follow the usual ICSE rule. Circular-scale numbers increase downward in the figures.
  - Pendulum stems state π = 3.14 and g = 10, so g found from the graphs comes out as 9.86 and 9.47 m s⁻².
  - 1 lb = 0.4536 kg, 1 ft = 30.48 cm.
- **ch02:**
  - g = 10 m s⁻², stated in every stem.
  - The direction of motion is positive; for a throw upward, a = −g.
  - The graphical derivations follow the usual ICSE route.
- **ch03:**
  - 1 N = 10⁵ dyne; 1 kgf = 9.8 N (10 N only where a stem says g = 10); 1 gf = 980 dyne.
  - The inverse-square law is used only as a ratio.
  - Momentum conservation is not used (it is not in the Class IX list).
- **ch04:**
  - G = 6.67 × 10⁻¹¹ N m² kg⁻².
  - Some answers are asked "in units of 10⁻⁸ N" so the key is a plain number.
  - The Moon appears in qualitative items only.
- **ch05:**
  - Densities: water 1000, sea water 1030, kerosene 800, mercury 13 600 kg m⁻³.
  - Liquid pressure excludes atmospheric pressure, as the notes say.
- **ch06:**
  - Ice is 900 in some items and 920 in one (books vary); sea water 1030.
  - The RD of a liquid uses a sinker in both liquids.
  - Apparent weight is defined only for bodies that sink.
- **ch07 (time-sensitive, as of 2026):** CO₂ above 420 ppm; warming of about 1.1–1.3 °C.
  - Maximum density is quoted at 4 °C (really 3.98 °C).
  - Ice 900 against water 1000 gives an 11.1% expansion in the numericals; the real figure is about 9%, and every stem states its densities.
  - Four items heat water using the calorie definition (m × Δt cal). If the Lead thinks this strays into ICSE 10 calorimetry, the writer names num-warm, num-spoon, ht-short3 and long-heat as replaceable.
- **ch08:**
  - Inclined mirrors use n = 360/θ − 1. When 360/θ is odd, the count is 360/θ − 1 for an object on the bisector and 360/θ otherwise. If Class IX should keep to even quotients, the writer names pm-mcq4, pm-mcq8, pm-short3b, num-off and long-incl part (d) as droppable.
  - Clock-in-a-mirror rule.
- **ch09:**
  - New Cartesian convention: u negative; f and R negative for concave and positive for convex; m = −v/u.
  - Paraxial rules only.
  - The tolerance is 0.1 cm for decimal answers.
- **ch10:**
  - Speeds: air 340, water 1500, iron 5100 m s⁻¹, light 3 × 10⁸ m s⁻¹; each stem states its value.
  - +0.6 m s⁻¹ per °C from 332 m s⁻¹ is used in one numerical.
  - The audible range is 20 Hz–20 kHz.
  - Echoes and SONAR (ICSE 10) are not asked.
- **ch11:**
  - e = 1.6 × 10⁻¹⁹ C.
  - IEC rectangle resistor symbol.
  - A voltmeter appears only in the Ohm's-law circuit.
  - Mercury is a superconductor below about 4 K (4.2 K).
- **ch12:**
  - The pole near geographic north is called the magnetic S pole.
  - Field strengths are in arbitrary arrow units, with no tesla.
  - Distance numericals take the poles at the ends of the magnet, while the figures place the poles at 80% of its length.

## Known gaps / follow-ups
- Narration audio (TTS) has not been generated.
- Practical work (internal assessment) is not modelled; experiments appear as theory items.
- The ICSE 9 Physics unit tests (`blueprints/9/unit-test.yaml`) are not assembled here.
- Some tests have thematic overlap between Section A and Section B (for example ch12, where the long test's Section A is all field lines). The writers selected items so that no item states another's answer.

## Decisions made
- D-050 was followed: Sonnet writers wrote the chapters, and the producer reviewed, gated and committed them. No Opus fallback was needed.
- The ICSE 9 Physics lib lives in ch01 and is shared by every chapter. Only content paths changed, so no ADR is needed.

## Needs from owner
None.
