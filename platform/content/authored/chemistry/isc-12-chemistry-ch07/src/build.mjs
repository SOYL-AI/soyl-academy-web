// Build ISC 12 Chemistry ch07 Transition (d-Block) Elements: npx tsx content/authored/chemistry/isc-12-chemistry-ch07/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(7, 'Transition (d-Block) Elements');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 2207,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['pd-mcq', 'mp-mcq', 'ni-co-mcq', 'haber-mcq', 'zn-ar'],
      B: ['radius-short', ['fe-short', 'cuso4-short']],
      C: ['ions-short3', ['colour-short3', 'alloy-short3']],
      D: ['magcol-long'],
    },
    long: {
      A: ['position-mcq', 'ti-ion-mcq', 'density-mcq', 'ie2-mcq', 'ionic-radius-mcq', 'cr-states-mcq', 'fluoride-mcq', 'cu1-mcq', 'mu-fe2-mcq', 'interstitial-mcq', 'radius-ar', 'mn-ar'],
      B: ['zn-short', 'hardness-short', ['mu-short', 'catalyst-short']],
      C: ['ie-short3', 'states-short3', 'mu-short3', ['stability-short3', 'interstitial-short3']],
      D: ['config-long', ['ox-long', 'props-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Configurations of 3d and selected 4d/5d elements and ions, radius and ionisation-enthalpy trends, oxidation states, colour, spin-only magnetic moments, catalysis, complexes, interstitial compounds and alloys, and every numerical checked against the ISC 2027 syllabus (Unit 4)',
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
