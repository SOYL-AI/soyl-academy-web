// Build ch02 Electrochemistry: npx tsx content/authored/chemistry/cbse-12-chemistry-ch02/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(2, 'Electrochemistry');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1202,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['emf-calc-mcq', 'kohl-mcq', 'lead-discharge-mcq', 'galv-ar'],
      B: ['salt-bridge-short', 'kappa-lambda-short', 'nernst-short3'],
      C: ['daniell-long', 'electrolysis-long'],
      D: ['electroplating-case'],
    },
    long: {
      A: ['displacement-mcq', 'nernst-direction-mcq', 'k-calc-mcq', 'dg-mcq', 'units-lambda-mcq', 'faraday-charge-mcq', 'products-cuso4-mcq', 'rust-cathode-mcq', 'emf-intensive-ar', 'mercury-ar'],
      B: ['predict-short', 'brine-short', ['kohl-short', 'she-short'], 'cell-design-short3', ['faraday-short3', 'rust-short3']],
      C: ['conductance-long', ['nernst-k-long', 'battery-long']],
      D: ['solar-battery-case', 'conductance-lab-case'],
    },
  },
  checksExtra: {
    chemistry_facts: 'Standard electrode potentials, Nernst/ΔG°/K relations, ionic conductivities, Faraday’s laws, battery and fuel-cell reactions and corrosion checked against the 2026-27 syllabus scope (see README "Verifier pass")',
    content_gate: 'npm test -w @soyl/content-templates: all 7 checks pass for this chapter',
    verifier_pass: '2026-10-29: every question, case part and alternative re-solved from its stem by the author; every numerical re-computed by the build script — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
