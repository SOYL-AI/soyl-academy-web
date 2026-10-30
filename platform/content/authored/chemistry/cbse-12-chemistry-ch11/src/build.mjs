// Build ch11 Surface Chemistry: npx tsx content/authored/chemistry/cbse-12-chemistry-ch11/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(11, 'Surface Chemistry');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1211,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['absorption-mcq', 'temp-mcq', 'size-mcq', 'stability-ar'],
      B: ['ads-short', 'lyo-short', 'hardy-short3'],
      C: ['ads-long', 'colloid-long'],
      D: ['river-case'],
    },
    long: {
      A: ['enthalpy-mcq', 'pressure-mcq', 'surface-mcq', 'catalysis-mcq', 'lyophilic-mcq', 'tyndall-mcq', 'anion-mcq', 'alum-mcq', 'temp-ar', 'brownian-ar'],
      B: ['vacuum-short', 'charge-short', ['emulsion-short', 'water-short'], 'factors-short3', ['compare-short3', 'compare-short3b']],
      C: ['props-long', ['types-long', 'uses-long']],
      D: ['charcoal-case', 'gas-case'],
    },
  },
  checksExtra: {
    chemistry_facts: 'Adsorption (physisorption vs chemisorption, enthalpy ranges, critical temperatures, Freundlich isotherm), colloid classification, preparation, Tyndall effect, charge and electrophoresis, Hardy–Schulze rule and emulsions checked against the 2026-27 syllabus scope (formative-only chapter; see README "Verifier pass")',
    content_gate: 'npm test -w @soyl/content-templates: all 7 checks pass for this chapter',
    verifier_pass: '2026-10-30: every question, case part and alternative re-solved from its stem by the author; every numerical re-computed by the build script — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
