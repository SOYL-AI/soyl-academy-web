// Build ch18 Neural Control and Coordination: npx tsx content/authored/biology/cbse-11-biology-ch18/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-11-biology-ch01/src/lib.mjs';

setChapter(18, 'Neural Control and Coordination');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 181,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['cns-mcq', 'nissl-mcq', 'limbic-mcq', 'greyw-ar'],
      B: ['fibres-short', 'hotplate-short', 'regions-short3'],
      C: ['impulse-long', 'brain-long'],
      D: ['axon-case'],
    },
    long: {
      A: ['afferent-mcq', 'visceralns-mcq', 'quadrigemina-mcq', 'autonomic-mcq', 'repol-mcq', 'pons-mcq', 'callosum-mcq', 'cerebellum-mcq', 'myelin-ar', 'influx-ar'],
      B: ['resting-short', 'thalhypo-short', ['types-short', 'meninges-short'], 'chemsyn-short3', ['conduct-short3', 'arc-short3']],
      C: ['neuron-long', ['kneejerk-long', 'control-long']],
      D: ['injury-case', 'toxin-case'],
    },
  },
  checksExtra: {
    biology_facts: 'Coordination; CNS and PNS; afferent and efferent fibres; somatic and autonomic (sympathetic, parasympathetic) systems; visceral nervous system; neuron structure with Nissl’s granules, dendrites, axon, synaptic knobs and vesicles; multipolar (cerebral cortex), bipolar (retina) and unipolar (embryonic) neurons; myelinated (Schwann cells, nodes of Ranvier, spinal and cranial nerves) and non-myelinated fibres; resting potential with K⁺ permeability, ion gradients and the 3 Na⁺ : 2 K⁺ pump; depolarisation by Na⁺ influx, conduction by local currents from A to B, repolarisation by K⁺ outflow; electrical and chemical synapses; cranial meninges; cerebrum, corpus callosum, cortex as grey matter with motor, sensory and association areas, white matter; thalamus; hypothalamus; limbic system with amygdala and hippocampus; midbrain with cerebral aqueduct and corpora quadrigemina; pons, cerebellum, medulla; brain stem; reflex action, reflex arc and the knee jerk, checked against the 2026-27 rationalised NCERT scope (sensory reception, eye and ear, are deleted and not included; see README "Verifier pass")',
    counting_rules: 'Pump ion counts and net charge, the action-potential amplitude, conduction times, speed ratios and reflex times are computed and asserted in src/calc.mjs, not typed in; the −70 and +30 millivolt values, conduction speeds and synaptic delay are typical illustrative values (NCERT gives no numbers)',
    verifier_pass: '2026-11-01: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
