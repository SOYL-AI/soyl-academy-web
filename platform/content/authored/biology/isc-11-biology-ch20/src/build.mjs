// Build ISC 11 Biology ch20 Neural Control and Coordination: npx tsx content/authored/biology/isc-11-biology-ch20/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-11-biology-ch01/src/lib.mjs';

setChapter(20, 'Neural Control and Coordination', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1120,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['bipolar-mcq', 'quad-mcq', 'ouabain-mcq', 'hypo-mcq', 'syn-ar'],
      B: ['depol-short2', ['divisions-short2', 'hindbrain-short2']],
      C: ['sal-short3', ['reflex-short3', 'autonomic-short3']],
      D: ['neuron-long'],
    },
    long: {
      A: ['dendrite-mcq', 'myelinformer-mcq', 'pns-mcq', 'somatic-mcq', 'highK-mcq', 'allornone-mcq', 'reflex-mcq', 'oneway-mcq', 'medulla-mcq', 'dorsal-mcq', 'rest-ar', 'ans-ar'],
      B: ['types-short2', 'hypothal-short2', ['neuronq-short', 'spinalq-short']],
      C: ['nerves-short3', 'cerebrum-short3', 'lowna-short3', ['meninges-short3', 'cord-short3']],
      D: ['conduct-long', ['brain-long', 'synapse-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Neuron structure and types (unipolar, bipolar, pseudounipolar, multipolar), nerves, central, peripheral and visceral (autonomic) nervous systems, 12 cranial and 31 spinal nerve pairs, the meninges, parts of the forebrain, midbrain and hindbrain and their functions, T.S. of the spinal cord and the reflex arc, resting and action potentials, the sodium-potassium pump, conduction in non-myelinated and myelinated fibres, and transmission at electrical and chemical synapses, checked against the ISC 2028 Biology syllabus (Class XI) — see README "Verifier pass"',
    counting_rules: 'Every nerve count, conduction time, node count, potential difference, pump count, firing rate and the action-potential trace is computed and asserted in src/calc.mjs, not typed in',
    isc_style: 'Assertion-reason items use the ISC Biology options (d = both false); 1-mark give-a-reason and analogy subparts; diagram-based items with lettered figures; 5-mark questions set in marked parts; chapter tests on isc-11-default-chapter-test-short / -long',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
