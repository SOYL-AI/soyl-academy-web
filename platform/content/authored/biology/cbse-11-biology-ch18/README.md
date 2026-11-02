# CBSE Class 11 Biology, Chapter 18 — Neural Control and Coordination

`cbse-11-biology-ch18` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 15 slides), notes (3 sections), 30 flashcards, 70 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse11bio_ch18_short` (20 marks, 40 min) and `t_cbse11bio_ch18_long` (40 marks, 90 min), laid out as the default blueprints `cbse-11-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (typical resting and peak potentials and the 100 mV swing; the 3 Na⁺ : 2 K⁺ pump with ion counts and net charge; conduction time = distance ÷ speed in milliseconds; speed ratios; reflex time = afferent + efferent conduction + synaptic delay; the action-potential trace points; each value checked with `check()`), `svgs.mjs` (myelinated neuron, polarised membrane with the pump, action-potential trace from the computed points, chemical synapse, sagittal brain, knee-jerk reflex arc), `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../cbse-11-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/cbse-11-biology-ch18/src/build.mjs` (deterministic; the tree stays clean; `CH_OUT=<dir>` writes a trial build elsewhere). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All three syllabus topics (t01–t03) are covered. **Sensory reception and processing (the eye and the ear) is deleted in the 2026-27 rationalised syllabus and is not included.** Class 11 has no board exam, so items follow the CBSE pattern for school examinations.
- **t01 Neuron and nerve impulse; synapse:** coordination (neural and endocrine); CNS and PNS; afferent and efferent fibres; somatic and autonomic (sympathetic, parasympathetic) neural systems; visceral nervous system; neuron: cell body with Nissl’s granules, dendrites, axon, synaptic knobs and vesicles; multipolar (cerebral cortex), bipolar (retina) and unipolar (embryonic) neurons; myelinated (Schwann cells, nodes of Ranvier; spinal and cranial nerves) and non-myelinated fibres (autonomous and somatic systems); resting potential (selective permeability, K⁺ and Na⁺ gradients, negative proteins, 3 Na⁺ out : 2 K⁺ in pump, polarised membrane); depolarisation by Na⁺ influx; action potential (nerve impulse); conduction by current flowing from A to B; repolarisation by K⁺ outflow; electrical and chemical synapses, neurotransmitters, receptors, ion channels, excitatory or inhibitory potentials.
- **t02 Central nervous system:** functions of the brain; skull and cranial meninges (dura mater, arachnoid, pia mater); forebrain: cerebrum, hemispheres, corpus callosum, cerebral cortex as grey matter with motor, sensory and association areas, white matter, thalamus, hypothalamus (temperature, eating and drinking, neurosecretory cells), limbic system (amygdala, hippocampus); midbrain: cerebral aqueduct, corpora quadrigemina; hindbrain: pons, cerebellum, medulla (respiration, cardiovascular reflexes, gastric secretions); brain stem.
- **t03 Reflex action:** definition; afferent and efferent neurons in series; dorsal nerve root; reflex arc; knee jerk.

## Shape
- **Part 1 (t01), 16 slides:** the neural system; the neuron; kinds of neurons and fibres; the resting membrane; worked example (200 pump cycles: 600 Na⁺ out, 400 K⁺ in, net 200 charges, computed); the action potential; conduction along the axon; worked example (0.8 m at 50 and at 1 m per second: 16 ms against 800 ms, 50 times, computed); the synapse; electrical and chemical synapses; summary; exam tips.
- **Part 2 (t02–t03), 15 slides:** protection of the brain; the brain in section; the cerebrum; thalamus, hypothalamus and limbic system; worked example (matching four signs to brain regions); midbrain and hindbrain; the reflex arc; steps of a reflex; worked example (knee jerk 0.9 m each way at 90 m per second plus a 0.5 ms synapse: 10 + 10 + 0.5 = 20.5 ms, computed); summary; exam tips.
- **Visuals (23 of 31 slides; no gap longer than one slide):** table 13, flow 4, svg 6.
- **Diagrams (6 SVGs, 12 uses across decks and notes):** myelinated neuron, resting membrane and pump, action-potential trace (points from `calc.mjs`), chemical synapse, sagittal brain, knee-jerk reflex arc. Every SVG was rasterised (headless Chromium, theme tokens substituted) and checked by eye.
- **Narration:** 8–72 words (mean 39), no symbols, ion formulae or unit abbreviations.

## Question bank (70)
| Type | Count | Marks |
|---|---|---|
| mcq | 31 | 1 (keys a 8, b 8, c 8, d 7) |
| assertion-reason | 5 | 1 (keys a b c d a) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 1 | 2 |
| numerical | 6 | 1 (20 ms; 20 times; 600 K⁺; 450 net charges; 100 mV; reflex 30.5 ms) |
| short | 7 + 5 | 2 / 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every passage has `passage_origin: "soyl-original"`; `word_limit` on all 17 short/long items.
- **Difficulty:** d1 15 · d2 33 · d3 20 · d4 2 (reflex-time numerical; evaluation of “every response is decided by the cerebrum”), plus a d4 case alternative (locating a fault in a missing knee jerk).
- **Competency:** recall 14 · understanding 20 · application 31 · analysis 4 · evaluation 1. Application or higher is **51% of items (52% of marks)**, inside the 45–65 % band.
- **Topic tags:** t01 39 · t02 22 · t03 10 (the evaluation long item is tagged t02 and t03).
- **Cases:** recording an action potential in an isolated axon (Na⁺ influx, 6 ms between electrodes, repolarisation or local currents); a bacterial toxin that stops vesicle fusion (chemical synapse, blocked step, receptors and ion channels or electrical synapses); a motorcyclist’s injury at the base of the brain (medulla, pia mater, brain stem or why thought is spared); a knee-jerk test (reflex, 24.5 ms, the arc or locating a fault).
- **Deck checks:** bipolar neuron, depolarisation, electrical synapse A-R (Part 1); hypothalamus, brain stem, reflex A-R (Part 2) — all objective.
- **Re-solves:** 8 scripted checks recompute numerical keys from `calc.mjs`.

## Chapter tests (default blueprints)
- **Short:** A CNS, Nissl’s granules and dendrites, limbic system (MCQ), grey matter (A-R) · B myelinated and non-myelinated fibres (2), withdrawal from a hot iron (2), three brain regions from signs (3) · C generation and conduction of a nerve impulse or the brain · D axon-recording case.
- **Long:** A afferent fibres, visceral nervous system, corpora quadrigemina, autonomic system, delayed repolarisation, pons, cutting the corpus callosum, cerebellum (MCQ), myelinated fibres, Na⁺ influx (A-R) · B maintaining the resting potential, thalamus and hypothalamus, (types of neurons or meninges), chemical synapse, (local currents or reflex arc) · C neuron structure and synapse + (the knee jerk explained or evaluating the cerebrum claim) · D head-injury case, synapse-toxin case.

## Validation
- Author validator (in the build): 27 maths strings parse with KaTeX strict + mhchem; 12 SVG uses / 6 distinct diagrams pass the allow-list; narration clean; 8/8 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.
- `stemdup.cjs` against this worktree and against the main checkout (which holds ICSE 10 Biology): no duplicate stems.
- `npm run content -- verify` and `originality --authored` are run by the producer for the whole subject.

## Verifier pass (2026-11-01)
Every question, case part and alternative was re-solved from its stem against the dump of the bank. Fixes made:
1. **Competency band.** The first build had application or higher at 40 % (lint warning). Eight recall items were rewritten as fresh scenarios with the same keys and facts: the autonomic system (a fright response), Nissl’s granules (a stained neuron), the pump ratio (30 Na⁺ out, 20 K⁺ in), the meninges (a surgeon’s route), the corpus callosum (seizure surgery), the thalamus (a stroke with normal temperature and appetite), the cerebellum (a microscope view) and the dorsal root (an injury blocking afferent neurons). Now 51 %.
2. **Case numbers.** The knee-jerk case first used figures that gave 20.5 ms, the same as the deck’s worked example; it now uses 0.6 m at 50 m per second (24.5 ms).
3. **Test cues.** Items whose stems would reveal another item’s objective answer were kept apart: the Na⁺-influx A-R is not in the same test as the axon case, the medulla MCQ is not with the head-injury case, and the receptor-blocking MCQ is not with the synapse-toxin case.
4. **Diagrams after rasterising.** The depolarisation and repolarisation labels touched the trace and were moved off it; the midbrain leader crossed the pituitary and its label moved to the right.

## For a reviewer
- Membrane potentials (−70 mV at rest, +30 mV at the peak), conduction speeds (1–90 m per second) and the 0.5 ms synaptic delay are typical illustrative values; NCERT gives no numbers, as the decks, notes and diagram captions say.
- The action-potential trace shows no after-hyperpolarisation, matching the NCERT account (K⁺ out restores the resting potential).
- Neuron types and locations follow NCERT: multipolar (cerebral cortex), bipolar (retina of the eye), unipolar (embryonic stage). The retina is named only as a location; the eye itself is not taught.
- Unmyelinated fibres are said to be common in “the autonomous and the somatic neural systems” (NCERT wording).
- The cerebellum is described only by its convoluted surface (NCERT); the balance role is not tested, to stay inside the rationalised text.
- The meninges are listed outer to inner as dura mater, arachnoid, pia mater.
- The knee-jerk afferent neuron enters by the dorsal root (NCERT); the ventral root for the efferent neuron appears only on the diagram and in one model answer.
- The puffer-fish toxin and the bacterial toxin that stops vesicle fusion are general set-ups (no toxin is named); the fault-finding alternative in the knee-jerk case assumes voluntary movement uses the same efferent neurons and muscle.
- Pump counts treat each cycle as exactly 3 Na⁺ out and 2 K⁺ in.
