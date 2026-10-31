// Build ISC 12 Chemistry ch11 Bonding in Coordination Compounds: npx tsx content/authored/chemistry/isc-12-chemistry-ch11/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(11, 'Bonding in Coordination Compounds');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 2211,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['zn-mcq', 'eg-mcq', 'instab-mcq', 'dmg-mcq', 'inner-ar'],
      B: ['cr-short', ['split-short', 'stab-short']],
      C: ['cftmag-short3', ['vbt-short3', 'extract-short3']],
      D: ['cft-long'],
    },
    long: {
      A: ['inner-mcq', 'ag-mcq', 'energy-mcq', 'd8-mcq', 'series-mcq', 'tetra-mcq', 'beta-mcq', 'chelstab-mcq', 'gold-mcq', 'mond-mcq', 'cft-ar', 'stab-ar'],
      B: ['pairing-short', 'zn-short', ['pt-short', 'qual-short']],
      C: ['fecn-short3', 'colour-short3', 'stab-short3', ['limitcft-short3', 'factor-short3']],
      D: ['vbt-long', ['colour-long', 'stab-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Valence bond descriptions, crystal-field configurations, the spectrochemical series, stability constants, uses of complexes and every numerical checked against the ISC 2027 syllabus (Unit 5)',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-10-30: every question and every internal-choice alternative re-solved from its stem by the author; every numerical re-computed by the build script — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
