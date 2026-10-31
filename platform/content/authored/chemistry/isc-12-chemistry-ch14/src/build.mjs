// Build ISC 12 Chemistry ch14 Alcohols: npx tsx content/authored/chemistry/isc-12-chemistry-ch14/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(14, 'Alcohols');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 2214,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['name-mcq', 'propanal-mcq', 'hx-mcq', 'pcc-mcq', 'acid-ar'],
      B: ['hydro-short', ['bosch-short', 'oxid-short']],
      C: ['prep-short3', ['acyl-short3', 'ascent-short3']],
      D: ['react-long'],
    },
    long: {
      A: ['diol-mcq', 'hydroboration-mcq', 'amine-mcq', 'grignard-mcq', 'bosch-mcq', 'order-mcq', 'ester-mcq', 'dehyd-mcq', 'mech-mcq', 'descent-mcq', 'markov-ar', 'ester-ar'],
      B: ['name-short', 'grig-short', ['bp-short', 'dehyd-short']],
      C: ['isomer-short3', 'reduce-short3', 'ester-short3', ['dehyd-short3', 'descent-short3']],
      D: ['oxdeh-long', ['prep-long', 'conv-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Names, preparations (hydration, hydroboration, Grignard, reduction, amines), Bosch and fermentation outlines, acidity, esterification and dehydration mechanisms, oxidation, ascent and descent sequences, the Lucas test and every numerical checked against the ISC 2027 syllabus (Unit 7)',
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
