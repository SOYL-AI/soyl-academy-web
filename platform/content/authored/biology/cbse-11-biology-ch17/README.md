# CBSE Class 11 Biology, Chapter 17 — Locomotion and Movement

`cbse-11-biology-ch17` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 16 slides), notes (3 sections), 30 flashcards, 68 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11bio_ch17_short` (20 marks, 40 min) and `t_cbse11bio_ch17_long` (40 marks, 90 min), laid out as the default blueprints `cbse-11-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (every bone count and sub-count, asserted to sum to 29, 26, 24, 80, 30, 6, 126 and 206; sarcomere band widths A = myosin length, I = L − A, H = L − 2 × actin, with illustrative lengths; myofibril and fibre shortening; each value checked with `check()`), `svgs.mjs` (sarcomere relaxed and contracted drawn to scale from `calc.mjs`, actin filament and myosin monomer, synovial joint with the three kinds of joints, the 206-bone tree, vertebral column and ribs), `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../cbse-11-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/cbse-11-biology-ch17/src/build.mjs` (deterministic; the tree stays clean; `CH_OUT=<dir>` writes a trial build elsewhere). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All three syllabus topics (t01–t03) are covered; the chapter has no removed topics in the 2026-27 syllabus. Class 11 has no board exam, so items follow the CBSE pattern for school examinations.
- **t01 Types of movement; muscle structure and contraction:** movement and locomotion (Paramecium, Hydra); amoeboid (macrophages, leucocytes), ciliary (trachea, ova in the female tract) and muscular movement; muscle as mesodermal tissue, 40–50 percent of adult body weight; skeletal, visceral and cardiac muscle; fascicles, fascia, sarcolemma, sarcoplasm (syncytium), sarcoplasmic reticulum as the Ca²⁺ store; myofibrils with I band (actin, isotropic) and A band (myosin, anisotropic), Z line, M line, H zone, sarcomere; F-actin of G-actin, tropomyosin, troponin masking the myosin-binding sites; meromyosin with HMM (head and short arm, cross arm, ATPase, ATP and actin sites) and LMM (tail); the sliding filament sequence (motor neuron, motor unit, neuromuscular junction, acetylcholine, action potential, Ca²⁺ release, troponin, cross bridge, ATP hydrolysis, ADP and Pi release, new ATP breaking the bridge, relaxation); band changes; fatigue and lactic acid; red and white fibres.
- **t02 Skeletal system and joints:** bone and cartilage matrices; 206 bones, axial 80 (skull region 29 = 8 cranial + 14 facial + hyoid + 6 ear ossicles; dicondylic skull; vertebrae 26 = 7 + 12 + 5 + 1 + 1; atlas; neural canal; sternum; 12 pairs of bicephalic ribs: true 1–7, false or vertebrochondral 8–10, floating 11–12; rib cage) and appendicular 126 (fore limb 30, hind limb 30 with patella, pectoral girdle with clavicle, scapula, acromion and glenoid cavity, pelvic girdle with ilium, ischium, pubis, acetabulum and pubic symphysis); fibrous, cartilaginous and synovial joints; ball and socket, hinge, pivot, gliding and saddle joints with the standard examples; the joint as a fulcrum.
- **t03 Disorders:** myasthenia gravis, muscular dystrophy, tetany, arthritis, osteoporosis, gout.

## Shape
- **Part 1 (t01), 16 slides:** types of movement; three kinds of muscle; muscle to sarcomere; the sarcomere; contractile proteins; worked example (band widths at 2.5 and 2.1 μm: I = 0.9 → 0.5 μm, H = 0.5 → 0.1 μm, A = 1.6 μm, computed); how contraction starts; the cross-bridge cycle; fatigue and fibre types; worked example (4000 sarcomeres shortening from 2.5 to 2.1 μm: 10 mm → 8.4 mm, 1.6 mm or 16 percent, computed); summary; exam tips.
- **Part 2 (t02–t03), 16 slides:** the 206-bone tree; the skull; vertebral column and ribs; worked example (axial skeleton 29 + 26 + 1 + 24 = 80, computed); limbs and girdles; worked example (appendicular 120 + 6 = 126, total 206, computed); joints; five synovial joints; disorders; summary; exam tips.
- **Visuals (23 of 32 slides; no gap longer than one slide):** table 13, flow 5, svg 5.
- **Diagrams (5 SVGs, 10 uses across decks and notes):** sarcomere relaxed and contracted (to scale from `calc.mjs`), actin filament and myosin monomer, synovial joint with the kinds of joints, the 206-bone tree, vertebral column and ribs. Every SVG was rasterised (headless Chromium, theme tokens substituted) and checked by eye.
- **Narration:** 9–74 words (mean 41), no symbols or unit abbreviations.

## Question bank (68)
| Type | Count | Marks |
|---|---|---|
| mcq | 29 | 1 (keys a 8, b 7, c 7, d 7) |
| assertion-reason | 5 | 1 (keys a b c d a) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 1 | 2 |
| numerical | 6 | 1 (I band 0.7 μm; H zone 0.4 μm; fibre shortening 3.6 mm; 56 phalanges; 10 ribs not joined to the sternum; 64 bones in both upper limbs with the pectoral girdle) |
| short | 7 + 5 | 2 / 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every passage has `passage_origin: "soyl-original"`; `word_limit` on all 17 short/long items.
- **Difficulty:** d1 16 · d2 33 · d3 17 · d4 2 (fibre-shortening numerical; evaluation of the coach’s claim on sprinters and marathon runners).
- **Competency:** recall 14 · understanding 19 · application 31 · analysis 3 · evaluation 1. Application or higher is **51% of items (53% of marks)**, inside the 45–65 % band.
- **Topic tags:** t01 36 · t02 24 · t03 8.
- **Cases:** a rabbit sarcomere measured relaxed (2.6 μm) and contracted (2.2 μm) (evidence for sliding, I band 0.6 μm, H zone widths or the 2.0 μm limit); thigh-muscle biopsies from a cyclist and a weightlifter (red fibres, lactic acid, endurance or the role of the sarcoplasmic reticulum); a fielder’s dislocated shoulder (glenoid cavity, 30 bones in a fore limb, ball and socket or synovial features); three orthopaedic patients (tetany, gout, osteoporosis or myasthenia gravis).
- **Deck checks:** I band, calcium and troponin, A band A-R (Part 1); floating ribs, phalanges numerical, pivot joint, gout A-R (Part 2) — all objective.
- **Re-solves:** 8 scripted checks recompute numerical keys from `calc.mjs`.

## Chapter tests (default blueprints)
- **Short:** A amoeboid movement, sarcoplasmic reticulum, knee joint (MCQ), striated muscle (A-R) · B red and white fibres (2), grouping ribs on an X-ray (2), comparing the three kinds of muscle (3) · C sliding filament theory or the axial and appendicular skeleton · D sarcomere case.
- **Long:** A ciliary movement, visceral muscle, blocked acetylcholine receptors, red fibres in a goose, atlas, bowler’s shoulder, acetabulum, tetany (MCQ), floating ribs, fatigue (A-R) · B actin filament, osteoporosis, (myosin monomer or knee versus shoulder), predicting band changes, (axial skeleton count or three disorders) · C structure of skeletal muscle + (classifying a gymnast’s joints or evaluating the coach’s claim) · D biopsy case, clinic case.

## Validation
- Author validator (in the build): 40 maths strings parse with KaTeX strict + mhchem; 10 SVG uses / 5 distinct diagrams pass the allow-list; narration clean; 8/8 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.
- `stemdup.cjs` against this worktree and against the main checkout (which holds ICSE 10 Biology): no duplicate stems.
- `npm run content -- verify` and `originality --authored` are run by the producer for the whole subject.

## Verifier pass (2026-11-01)
Every question, case part and alternative was re-solved from its stem against the dump of the bank. Fixes made:
1. **Word limit.** The 3-mark axial-skeleton model answer was 36 words (band 50–80); it now names each part with its count.
2. **Test cues.** The short test first paired the band-change prediction (3 marks) with the sarcomere case, whose table shows the A band constant and the sarcomere shorter; the 3-mark slot now compares the three kinds of muscle, and the band-change item moved to the long test.
3. **Computed values.** 4000 × 2.1 printed as 8400.000000000001 in worked example 2; the myofibril lengths are now rounded and asserted in `calc.mjs`.
4. **Diagrams after rasterising.** The I-band label overlapped the right Z line and moved to the title row; the heavy-meromyosin label was clipped at the right edge and moved left; “Vertebrae” overflowed its box and the boxes were widened; the vertebral column ran off the bottom and its region labels off the left edge, so the column was compacted and shifted right.

## For a reviewer
- Sarcomere lengths (myosin 1.6 μm, actin 1.0 μm from each Z line, sarcomeres 2.1–2.6 μm) are typical vertebrate values used for illustration; NCERT gives no lengths, as the diagram and notes say.
- The skull-region count of 29 includes the hyoid and the six ear ossicles, following NCERT; the ear itself is not taught (deleted with sensory organs in ch18).
- Rib grouping: true 1–7 (to the sternum by hyaline cartilage), false/vertebrochondral 8–10 (to the seventh rib), floating 11–12.
- The scapula lies between the second and seventh ribs; the acromion articulates with the clavicle; the glenoid cavity takes the humerus.
- Synovial examples follow NCERT: ball and socket (humerus and pectoral girdle), hinge (knee), pivot (atlas and axis), gliding (between carpals), saddle (carpal and metacarpal of the thumb).
- Calcium binds “a subunit of troponin”, and a subunit of troponin masks the myosin-binding sites at rest (NCERT wording); tropomyosin is not given a masking role here.
- The fibula–ulna and femur–humerus pairings in the patella MCQ solution are the usual serial-homology pairings, beyond the NCERT text.
- The shallow glenoid cavity as the reason for easy shoulder dislocation (shoulder case, part c-i) is general anatomy beyond NCERT.
- The goose, cyclist and weightlifter fibre-type set-ups are illustrative; real muscles contain mixtures of fibre types.
- The coach’s-claim evaluation says marathon fatigue “has other contributing causes”, without naming them, to stay within the syllabus.
- Case figures (rabbit sarcomere, clinic patients’ ages) are illustrative.
