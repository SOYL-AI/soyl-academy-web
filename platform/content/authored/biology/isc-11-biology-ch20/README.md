# ISC Class 11 Biology, Chapter 20 — Neural Control and Coordination

`isc-11-biology-ch20` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 17 slides), notes (5 sections), 30 flashcards, 78 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11bio_ch20_short` (20 marks, 50 min) and `t_isc11bio_ch20_long` (40 marks, 100 min), laid out as `isc-11-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (nerve counts, conduction times, node counts, membrane-potential arithmetic, the sodium-potassium pump, refractory period, a model action-potential trace; every value asserted with `eq`), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-11-biology-ch01/src/lib.mjs` (shared by the ISC 11 chapters, not edited here). Rebuild from `platform/`: `npx tsx content/authored/biology/isc-11-biology-ch20/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All four ISC Class XI syllabus topics (t01–t04): **neurons and nerves** and the four types (**unipolar, bipolar, pseudounipolar, multipolar**); the **central, peripheral and visceral (autonomic) nervous systems**; the **parts of the brain** (forebrain, midbrain, hindbrain), the meninges and the **spinal cord in T.S.**, with the reflex arc; the **resting and action potentials**, conduction in **non-myelinated and myelinated fibres** and **chemical (and electrical) synaptic transmission**.
- No removed topics for this chapter. Neuroglia, sense organs and the detailed anatomy of the cranial nerves are not asked.

## Shape
- **Part 1 (t01–t03), 18 slides:** the nervous system; structure of a neuron; neurons and nerves; types of neurons; check (neuron type); divisions of the nervous system; the autonomic nervous system; worked example (12 + 31 pairs, 43 pairs, 86 nerves); check (pairs); the human brain; parts of the brain and functions; check (brain); T.S. of the spinal cord; the reflex arc; worked example (reflex of 31 ms); check (reflex arc); summary; exam tips.
- **Part 2 (t04), 17 slides:** the nerve impulse; resting potential; the action potential; ion movements in each phase; worked example (amplitude 100 mV, 15 mV to threshold, 500 pump cycles); check (pump); conduction along a fibre; myelinated and non-myelinated fibres; worked example (6 ms against 600 ms, 500 nodes); check (myelin); the chemical synapse; steps of transmission; kinds of synapse; check (synapse); check (refractory period); summary; exam tips.
- **Visuals (25 of 35 slides; no gap longer than two slides):** table 13, flow 5, svg 7.
- **Diagrams (9 SVGs, 18 uses):** a labelled **myelinated neuron**; a **lettered neuron (A–E)** and a **lettered T.S. of the spinal cord (A–E)** for four diagram-based questions; the four **neuron types**; the **brain** in vertical section; the **spinal cord T.S.** with roots and ganglion; the **action potential** (computed from `calc.mjs`); a **chemical synapse**; **continuous and saltatory conduction**. Every SVG was rasterised and checked by eye.
- **Narration:** 6–49 words (mean 30).

## Question bank (78)
| Type | Count | Marks |
|---|---|---|
| mcq | 29 | 1 (keys a 8, b 7, c 7, d 7), 2 on lettered figures |
| assertion-reason | 4 | 1 (ISC options; keys c a b d) |
| short, 1 mark | 4 | give-a-reason (2) and analogy (2) |
| fill-blank | 3 | 1 |
| true-false | 3 | 1 |
| numerical | 9 | 1 (25 pairs; 86 nerves; 15 ms; 31 ms; 1400 ions; 85 mV; 250 per second; 300 nodes; 15 ms) |
| short | 8 + 10 | 2 / 3 |
| long | 6 | 5, in marked parts |
| case-based (stimulus) | 2 | 4 (1 + 1 + 2 or 1 + 1 + 1 + 1 + 2 as marked), part (c) either/or: two patients with root injuries, and a nerve-conduction experiment |

- **Difficulty:** d1 17 · d2 41 · d3 19 · d4 1.
- **Competency:** recall 11 · understanding 27 · application 32 · analysis 8. Application or higher is **51% of items (47% of marks)**, inside the 45–65 % band.
- **Topic tags:** t01 12 · t02 9 · t03 26 · t04 31.
- **Re-solves:** 11 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (ISC defaults)
- **Short:** A bipolar neurons of the retina, a head turned to a bang and flash (midbrain), ouabain and the resting potential, the control of the pituitary, one-way chemical synapses (A-R) · B ions in depolarisation and repolarisation; (divisions of the efferent system or parts of the hindbrain) · C why myelinated fibres are faster; (reflex arc after a thorn or sympathetic against parasympathetic) · D neuron with a labelled diagram, in parts.
- **Long:** A dendrites, the cell making myelin, cranial nerves, the somatic system, high potassium outside, the all-or-none rule, a cactus-spine reflex, one-way transmission, medulla oblongata, cut dorsal roots, resting-potential (A-R), parasympathetic (A-R) · B types of neuron; the hypothalamus; (lettered neuron or lettered spinal cord) · C sensory, motor and mixed nerves; the cerebral lobes; low sodium bath (d4); (meninges or T.S. of the cord) · D saltatory conduction; (brain in parts or synapse in parts).
- Items in the tests are not used on any deck check slide. Stems were read so that no stem or option states the answer to another item of the same test.

## Validation
- `npm run content -- lint --exemplars`, `verify --board cisce --class 11 --subject biology --authored`, `originality --authored` and the exact-stem check: results in the producer's handoff.
- Author validator (in the build): maths strings parse; 18 SVG uses / 9 distinct diagrams pass the allow-list; narration clean; scripted re-solves pass; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-11-04)
Every question, case part and alternative was re-solved from its stem by the writer. Fixes made:
1. **Word limit.** The three-mark answer on the four lobes of the cerebral cortex had 37 words against 50–80 and was expanded.
2. **Diagrams after rasterising.** The first brain section put the pituitary inside the midbrain and cut off its heading; the spinal cord looked like a bow-tie and had clipped root labels; the synapse labels were cut off at the right edge; the neuron-type legend overlapped the captions; the hyperpolarisation label sat on the time axis. Each was redrawn or moved and checked again.
3. **Test leaks.** Items on the same ground are kept apart where possible (for example the calcium-entry MCQ and the acetylcholinesterase MCQ are not in the same test as the synapse in parts); where a topic could not be avoided the stem was written not to state the other item's answer.
4. **Originality.** Set-ups differ from CBSE 11 Biology ch18 (a pseudounipolar sensory neuron, a retina neuron, a boxer's cerebellum, a snake neurotoxin, a cyclist turning to a bang, a cactus spine, ouabain and high potassium, botulinum toxin, an insecticide, a squid axon in low sodium, patients with root injuries; no hot-pan, knee-jerk, puffer-fish, ice-cube, meninx-order or nodes-of-Ranvier fill-in items). The exact-stem check found no duplicates.

## Facts a reviewer should double-check
- **Potentials and speeds:** resting potential −70 mV, threshold −55 mV, peak +30 mV and an undershoot of about −76 mV are round textbook values (books give −60 to −90 mV at rest); conduction speeds of 100 m per s (myelinated) and 1 m per s (non-myelinated), a reflex fibre of 60 m per s and a synaptic delay of 0.5 ms are illustrative. The action-potential trace is a model joined by cosine interpolation, not recorded data.
- **Sodium-potassium pump:** 3 Na⁺ out and 2 K⁺ in per cycle.
- **Neuron types:** unipolar neurons are placed in the embryonic stage and in some invertebrates, and the dorsal-root-ganglion cell is the pseudounipolar type; some books class both as unipolar. The note says so.
- **Nerves:** 12 cranial and 31 spinal pairs (8 cervical, 12 thoracic, 5 lumbar, 5 sacral, 1 coccygeal), 43 pairs in all.
- **Brain:** the corpora quadrigemina are given as the midbrain reflex centres for sight and sound; the pons is said to help regulate breathing; the limbic system is mentioned only in a note. The brain diagram is schematic.
- **Spinal cord diagram:** the horns are drawn symmetrically and schematically; the dorsal horns are drawn slender and the ventral horns broad.
- **Synapse:** calcium entry triggers vesicle release; acetylcholine is the example transmitter; the electrical synapse is described as rare in humans.
- **Exam-style items** on ouabain, a high-potassium bath, botulinum toxin, an organophosphate insecticide and a low-sodium squid axon go slightly beyond the syllabus wording and are tagged at application or analysis; they use only the ion and synapse principles in the notes.
