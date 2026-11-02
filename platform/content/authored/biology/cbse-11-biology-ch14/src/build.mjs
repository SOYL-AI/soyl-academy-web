// Build ch14 Breathing and Exchange of Gases: npx tsx content/authored/biology/cbse-11-biology-ch14/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-11-biology-ch01/src/lib.mjs';

setChapter(14, 'Breathing and Exchange of Gases');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 141,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['trachea-insect-mcq', 'inspire-mcq', 'anhydrase-mcq', 'pneumo-ar'],
      B: ['disorder-short2', 'exchange-short2', 'curve-short3'],
      C: ['system-long', 'dust-long'],
      D: ['spiro-case'],
    },
    long: {
      A: ['earthworm-mcq', 'bifurcate-mcq', 'frog-mcq', 'spirometer-mcq', 'gradient-mcq', 'carbamino-mcq', 'layers-mcq', 'fig-trachea-mcq', 'transport-ar', 'diaphragm-ar'],
      B: ['oxygen-short2', 'conducting-short2', ['pleura-short2', 'diaphragm-short2'], 'capacities-short3', ['bicarb-short3', 'pathway-short3']],
      C: ['mechanism-long', ['transport-long', 'regulation-long']],
      D: ['exercise-case', 'quarry-case'],
    },
  },
  checksExtra: {
    biology_facts: 'Respiratory organs by animal group, the human respiratory tract (trachea divides at the fifth thoracic vertebra, incomplete cartilaginous rings, epiglottis, double pleura), conducting and exchange parts, the air-tight thoracic chamber, inspiration and expiration (diaphragm antero-posterior, external intercostals dorso-ventral, intra-pulmonary pressure), respiratory volumes (TV about 500, IRV 2500–3000, ERV 1000–1100, RV 1100–1200 mL) and capacities, partial pressures (104 and 40 alveoli; 40 and 45 deoxygenated blood; 95 and 40 oxygenated blood; 40 and 45 tissues), diffusion membrane layers, CO2 solubility 20–25 times, oxygen transport (97 and 3 percent; four O2 per haemoglobin), CO2 transport (20–25, 70, 7 percent; carbonic anhydrase), 5 mL O2 and 4 mL CO2 per 100 mL blood, regulation (medulla rhythm centre, pons pneumotaxic centre, chemosensitive area, aortic and carotid receptors, oxygen insignificant) and disorders (asthma, emphysema, occupational) checked against the 2026-27 rationalised NCERT scope (see README "For a reviewer")',
    counting_rules: 'Capacities, minute volumes, partial-pressure gradients, pO2 of air, saturation values, delivered gas volumes, percentages and case numbers are computed and asserted in src/calc.mjs, not typed in; the spirogram and the oxygen dissociation curve in src/svgs.mjs are computed from calc.mjs',
    verifier_pass: '2026-11-01: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
