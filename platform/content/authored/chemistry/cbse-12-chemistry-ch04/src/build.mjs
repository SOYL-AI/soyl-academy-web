// Build ch04 The d- and f-Block Elements: npx tsx content/authored/chemistry/cbse-12-chemistry-ch04/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(4, 'The d- and f-Block Elements');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1204,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['cr-config-mcq', 'mp-mcq', 'dichromate-colour-mcq', 'lanth-ar'],
      B: ['config-short', 'dichromate-short', 'colour-short3'],
      C: ['property-long', 'kmno4-long'],
      D: ['titration-case'],
    },
    long: {
      A: ['radii-mcq', 'eo-cu-mcq', 'mn3-mcq', 'magnetic-mcq', 'interstitial-mcq', 'permanganate-neutral-mcq', 'ce4-mcq', 'basicity-mcq', 'zn-ar', 'actinoid-ar'],
      B: ['eo-short', 'compare-short', ['ox-short', 'catalyst-short'], 'prep-short3', ['mu-short3', 'contraction-short3']],
      C: ['f-block-long', ['anomaly-long', 'dichromate-long']],
      D: ['magnet-case', 'zr-hf-case'],
    },
  },
  checksExtra: {
    chemistry_facts: 'Configurations, oxidation states, E° values, magnetic moments, colours, dichromate and permanganate chemistry, lanthanoid contraction and f-block comparisons checked against the 2026-27 syllabus scope (see README "Verifier pass")',
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
