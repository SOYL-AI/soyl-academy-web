// Build ISC 12 Chemistry ch18 Carboxylic Acids: npx tsx content/authored/chemistry/isc-12-chemistry-ch18/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(18, 'Carboxylic Acids');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 2218,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['isobut-mcq', 'oxid-mcq', 'nahco3-mcq', 'hvz-mcq', 'carbon-ar'],
      B: ['bp-short', ['acid-short', 'deriv-short']],
      C: ['prep-short3', ['acidrx-short3', 'decarb-short3']],
      D: ['acid-long'],
    },
    long: {
      A: ['dimer-mcq', 'oxalic-mcq', 'grig-mcq', 'nitrile-mcq', 'distance-mcq', 'benz-mcq', 'formic-mcq', 'anhyd-mcq', 'kolbe-mcq', 'fc-mcq', 'acid-ar', 'phenol-ar'],
      B: ['prep-short', 'benz-short', ['hvz-short', 'kolbe-short']],
      C: ['methylbenz-short3', 'rank-short3', 'effects-short3', ['deriv-short3', 'formic-short3']],
      D: ['react-long', ['prep-long', 'hvz-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Names, preparations (oxidation, nitrile hydrolysis, Grignard + CO₂, alkylbenzene oxidation), acidity with inductive, resonance and ortho effects, acid reactions and derivatives, soda-lime decarboxylation, Kolbe electrolysis, the HVZ reaction, meta substitution of benzoic acid, tests for formic, acetic and benzoic acids and every numerical checked against the ISC 2027 syllabus (Unit 8)',
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
