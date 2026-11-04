# ISC Class 11 Biology, Chapter 19 — Locomotion and Movement

`isc-11-biology-ch19` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 18 slides), notes (6 sections), 30 flashcards, 87 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11bio_ch19_short` (20 marks, 50 min) and `t_isc11bio_ch19_long` (40 marks, 100 min), laid out as `isc-11-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (sarcomere band geometry, shortening of a fibre, stimulation intervals and a summation model, bone counts of the skeleton; every value asserted with `eq`), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-11-biology-ch01/src/lib.mjs` (shared by the ISC 11 chapters, not edited here). Rebuild from `platform/`: `npx tsx content/authored/biology/isc-11-biology-ch19/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ISC Class XI syllabus topics (t01–t05): **ciliary, flagellar and muscular movement**, general properties of muscle, **red and white fibres**; **skeletal muscle structure**, the **sarcomere**, **actin, tropomyosin, troponin and myosin**, the **sliding filament theory** (Huxley and Huxley), the chemical events of contraction, **summation, tetanus and rigor mortis**; the **bones of the axial (80) and appendicular (126) skeleton** with numbers and functions; **joints** (fibrous, cartilaginous, synovial with the five types); the disorders **myasthenia gravis, tetany, muscular dystrophy, arthritis, osteoporosis and gout**.
- No removed topics for this chapter. The muscle-fibre types of the syllabus are compared in text and not tied to any exam-style fatigue calculation.

## Shape
- **Part 1 (t01–t02), 18 slides:** movement and muscle; types of movement; muscle properties and kinds; red and white fibres; organisation of a skeletal muscle; the sarcomere; contractile proteins; worked example (A band 1.5 µm, I band and H zone at 2.8 and 2.2 µm); check (H zone); neuromuscular junction and calcium; cross-bridge cycle; check (calcium); worked example (a 4.2 cm fibre of 15 000 sarcomeres shortens by 9 mm); twitch, summation and tetanus; stimulation rate and rigor mortis; check (interval); summary; exam tips.
- **Part 2 (t03–t05), 18 slides:** the skeleton and its joints; functions of the skeleton; the adult skeleton in numbers; skull and vertebral column; worked example (106 bones in both hands and both feet); check (hyoid); ribs, girdles and limbs; worked example (80 + 126 = 206; 33 vertebrae of a child against 26); check (ribs); classification of joints; types of synovial joint; structure of a synovial joint; check (pivot); disorders of muscle; disorders of bone and joints; check (gout); summary; exam tips.
- **Visuals (27 of 36 slides; no gap longer than one slide):** table 16, flow 5, svg 6.
- **Diagrams (7 SVGs, 13 uses):** a **sarcomere relaxed and contracted**, computed from the band geometry; a **lettered sarcomere (A–E)** for two diagram-based questions; thin filament and myosin molecule; **twitch, summation and tetanus** traces from the superposition model in `calc.mjs`; the **skeleton as a tree of counts**; five types of **synovial joint**; a **synovial joint** in section. Every SVG was rasterised and checked by eye.
- **Narration:** 7–45 words (mean 30).

## Question bank (87)
| Type | Count | Marks |
|---|---|---|
| mcq | 28 | 1 (keys a 7, b 7, c 7, d 7), 1 on the lettered figure |
| assertion-reason | 4 | 1 (ISC options; keys b c a d) |
| short, 1 mark | 8 | give-a-reason (5) and analogy (3) |
| fill-blank | 6 | 1 |
| true-false | 3 | 1 |
| numerical | 6 | 1 (0.2 µm H zone; 21.4 percent; 9 mm; 40 ms; 106 bones; 25 bones) |
| match | 2 | 2 (joint types; disorder causes) |
| short | 11 + 12 | 2 / 3 |
| long | 5 | 5, in marked parts |
| case-based (stimulus) | 2 | 4 (1 + 1 + 2), part (c) either/or: sarcomere band measurements and stimulation rate |

- **Difficulty:** d1 18 · d2 48 · d3 20 · d4 1.
- **Competency:** recall 16 · understanding 27 · application 38 · analysis 6. Application or higher is **51% of items (50% of marks)**, inside the 45–65 % band.
- **Topic tags:** t01 14 · t02 31 · t03 16 · t04 13 · t05 13.
- **Re-solves:** scripted checks recompute keys from `calc.mjs`.

## Chapter tests (ISC defaults)
- **Short:** A cilia on a frog palate, hip joint of a dancer, tetany after neck surgery, ear ossicles, rigor mortis (A-R) · B red against white fibres; (joint classes or rib types) · C calcium and troponin; (bones of the upper limb or osteoporosis after menopause) · D sarcomere and sliding filament theory in parts.
- **Long:** A *Euglena*, properties of muscle, cardiac muscle, smooth muscle, lettered sarcomere, pectoral girdle, bone marrow, elbow-like hinge, osteoporosis, osteoarthritis against rheumatoid arthritis, red fibres (A-R), Z lines (A-R) · B thin filament; tetany; (summation and tetanus or synovial joint features) · C types of movement; muscle organisation; rigor mortis; (three synovial joints or three disorders named from cases) · D chemical events of contraction; (skeleton in parts or joints in parts).
- Items in the tests are not used on any deck check slide. Stems were read so that no stem or option states the answer to another item of the same test.

## Validation
- `npm run content -- lint --exemplars`, `verify --board cisce --class 11 --subject biology --authored`, `originality --authored` and the exact-stem check: results in the producer's handoff.
- Author validator (in the build): maths strings parse; 13 SVG uses / 7 distinct diagrams pass the allow-list; narration clean; scripted re-solves pass; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-11-04)
Every question, case part and alternative was re-solved from its stem by the writer. Fixes made:
1. **Lint.** A solution written as "sternum 1 + ribs 24 = 25" was split into two maths spans by the dollar signs and read as "24 = 25"; the three numbers are now separate spans.
2. **Exact stem.** A case-part stem ("Which conclusion do the data support?") duplicated an ISC 11 ch11 stem and was rewritten around the filaments.
3. **Calculation check.** A first draft of the H-zone series expected 0.6 µm at a sarcomere length of 2.4 µm; recomputing from the geometry gave 0.4 µm, and `calc.mjs` now asserts the series 1.0, 0.8, 0.4, 0.2, 0.
4. **Test leaks.** Items on the same ground were split between the two tests or kept out of them: the sliding-filament long answer is in the short test only, the Z-line assertion in the long test, and the calcium-block, ATP-detach and calcium-pump MCQs are not in a test that asks the chemical events of contraction in parts.
5. **Diagrams after rasterising.** The tetanus trace touched its own title and the vertical scale was reduced; the skeleton leaf labels printed as "Vertebral,column" and were fixed; the M-line label overlapped the band brackets and was moved; the synovial joint was redrawn so that the cavity, membrane, capsule and ligament are distinct.
6. **Originality.** Set-ups differ from CBSE 11 Biology ch17 (a frog palate, *Euglena*, a hen's leg and breast, a seal, a dancer, an engineer's robot elbow, bone marrow after radiation, tetany after neck surgery, a toe with gout, a hen that cannot fly far, a detective and rigor mortis, hands and feet of a skeleton; no floating-ribs, atlas-axis, thumb, rock-climber, goose or 400-metre-race items). The exact-stem check found no duplicates after fix 2.

## Facts a reviewer should double-check
- **Sarcomere dimensions** (A band 1.5 µm, thin filament 1.0 µm, sarcomere 2.8 µm relaxed and 2.2 µm contracted, H zone closing at 2.0 µm) are a model: textbooks give the A band as about 1.5–1.6 µm and sarcomere lengths of 2–3 µm; the arithmetic is illustrative.
- **Twitch model** (twitch 120 ms, contraction phase 40 ms; summation between 40 and 120 ms, fused tetanus below 40 ms; traces are a superposition of identical twitches with saturation): the boundaries are illustrative, since real thresholds depend on the muscle (a frog gastrocnemius is not a human muscle).
- **Skeleton count:** 206 bones with the axial skeleton as 80 only when the **hyoid and the six ear ossicles** are counted in a skull of 29; some books give the skull as 22 (cranium 8 and face 14) and the axial skeleton as 74 or 75. Ribs 24 (7 true, 3 false, 2 floating pairs), vertebral column 26 in an adult (33 in a child), each limb 30 and the pelvic girdle 2 are the usual values. The chapter says which count it uses.
- **Joint examples:** the knee is given as a hinge joint (many books call it a modified hinge); the wrist (ellipsoid or condyloid) is mentioned in a note and not made a sixth type; the atlas and axis is the pivot example.
- **Muscle facts:** muscle fibre types are given in the textbook form of red (aerobic, myoglobin, slow) and white (glycolytic, fast); the hen leg and breast and the seal are illustrations. The sliding filament theory is credited to Huxley and Huxley (1954).
- **Disorders:** myasthenia gravis as an autoimmune attack on acetylcholine receptors, tetany from low calcium (for example low parathormone), Duchenne muscular dystrophy as X-linked with no dystrophin, arthritis as osteoarthritis and rheumatoid arthritis, osteoporosis linked to the fall of oestrogen after menopause, gout from uric acid crystals. Treatments are mentioned only in one note and are not asked.
- **Rigor mortis** is said to appear within a few hours and pass off after a day or two; book timings differ slightly.
