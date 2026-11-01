// Build ICSE 10 Chemistry ch06 Stoichiometry: Formulae and Calculations from Equations: npx tsx content/_stage/chemistry/icse-10-chemistry-ch06/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(6, 'Stoichiometry: Formulae and Calculations from Equations');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1006,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['percent-mcq', 'cxhy-mcq', 'no-mcq', 'carbon-mcq', 'sameef-ar', 'efdef-short1', 'co2ef-short1', 'mm-short1', 'cuso4-short2'],
      B: [['formula-long', 'equation-long']],
    },
    long: {
      A: ['urea-mcq', 'hydrate-mcq', 'ratio-mcq', 'cu2o-mcq', 'water36-mcq', 'nahco3-mcq', 'mass-ar', 'cpc-short1', 'mfdef-short1', 'h2o2-short1', 'moleratio-short1', 'ncount-short1', 'three-fill', 'ef-match'],
      B: [['lab-long', 'mixture-long', 'fertiliser-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Percentage composition including water of crystallisation, empirical formula from percentage composition and from combining masses (ratio rounding by ×2 and ×3), molecular formula from vapour density or molar mass, and mass–mass, mass–volume and volume–volume calculations from balanced equations at STP (22.4 dm3, Avogadro’s number 6 × 10^23 or 6.022 × 10^23), checked against the ICSE 2027 syllabus (Class X, section 5); every equation balanced and every number re-computed by the author and by the build script',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-01: every question re-solved from its stem by the author; every numerical re-computed by the build script',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
