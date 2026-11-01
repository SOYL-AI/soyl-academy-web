// Build ICSE 10 Biology ch10 Nervous System:
//   npx tsx content/authored/biology/icse-10-biology-ch10/src/build.mjs [--dump <file>]   (run from platform/)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-10-biology-ch01/src/lib.mjs';

setChapter(10, 'Nervous System');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 10110,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['myelin-mcq', 'greywhite-mcq', 'natural-mcq', 'pons-mcq', 'synapse-ar', 'odd-neuron', 'reason-white', 'reason-learnt', 'cns-pns-short'],
      B: [['accident-case', 'hotpan-case']],
    },
    long: {
      A: ['knee-mcq', 'blink-mcq', 'cut-root-mcq', 'spinal-func-mcq', 'arc-fig-mcq', 'neuron-fig-mcq', 'medulla-ar', 'cyton-term', 'relay-term', 'odd-brain', 'neuron-fill5', 'brain-match5'],
      B: [['ruler-case', 'puppy-case', 'exam-case']],
    },
  },
  checksExtra: {
    biology_facts: 'The neuron (dendrites, cyton, axon, myelin sheath, nodes, axon endings, synapse; sensory, relay and motor neurons), the central, peripheral and autonomic systems, the brain (cerebrum, cerebellum, thalamus, hypothalamus, pons, medulla oblongata) and effects of damage, the spinal cord with grey and white matter, voluntary, involuntary and reflex actions with the reflex arc, and natural and acquired reflexes checked against the ICSE 2027 Biology syllabus (Class X, Human Anatomy and Physiology) — see README "Verifier pass"',
    counting_rules: 'Ruler-test means and percentage, and impulse travel times for fibres with and without myelin, are computed by src/calc.mjs, not typed in',
    icse_style: 'Assertion-reason items use the ICSE 2027 Biology option order; 1-mark biological terms, odd-one-out with category and give-reason items; a 5-blank fill-in passage from a word list; a 5-pair labelled-diagram match; 10-mark case questions opening with an experiment, a situation or a diagram; chapter tests on icse-10-biology-chapter-test-short / -long',
    verifier_pass: '2026-11-01: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked; items in one test checked for stems that give away another item\'s answer — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
