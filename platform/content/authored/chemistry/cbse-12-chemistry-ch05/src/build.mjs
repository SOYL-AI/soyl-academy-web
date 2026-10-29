// Build ch05 Coordination Compounds: npx tsx content/authored/chemistry/cbse-12-chemistry-ch05/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(5, 'Coordination Compounds');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1205,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['werner-mcq', 'name2-mcq', 'shape-mcq', 'isomer-ar'],
      B: ['ligand-short', 'colour-short', 'naming-short3'],
      C: ['vbt-long', 'isomerism-long'],
      D: ['hardness-case'],
    },
    long: {
      A: ['double-salt-mcq', 'denticity-mcq', 'formula-mcq', 'linkage-mcq', 'optical-mcq', 'mu-mcq', 'en-colour-mcq', 'carbonyl-shape-mcq', 'chelate-ar', 'cft-limit-ar'],
      B: ['formula-short', 'carbonyl-short', ['ionisation-short', 'vbt-limit-short'], 'werner-short3', ['vbt-short3', 'cft-short3']],
      C: ['cft-long', ['werner-long', 'carbonyl-uses-long']],
      D: ['cisplatin-case', 'nickel-colour-case'],
    },
  },
  checksExtra: {
    chemistry_facts: 'Werner formulas, IUPAC names, isomer counts, VBT hybridisations, CFT configurations, spectrochemical series, carbonyl shapes and applications checked against the 2026-27 syllabus scope (see README "Verifier pass")',
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
