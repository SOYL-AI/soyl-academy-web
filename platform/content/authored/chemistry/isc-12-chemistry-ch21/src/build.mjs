// Build ISC 12 Chemistry ch21 Carbohydrates: npx tsx content/authored/chemistry/isc-12-chemistry-ch21/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(21, 'Carbohydrates');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 2221,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['formula-mcq', 'osazone-mcq', 'methylhex-mcq', 'glycogen-mcq', 'hi-ar'],
      B: ['dl-short', ['distinguish-short', 'poly-short']],
      C: ['evidence-short3', ['disacch-short3', 'poly-short3']],
      D: ['fructose-long'],
    },
    long: {
      A: ['ketotriose-mcq', 'acetyl-mcq', 'nitric2-mcq', 'dl-mcq', 'bisulfite-mcq', 'mutarot-mcq', 'furanose-mcq', 'fehlingfru-mcq', 'sucroselink-mcq', 'cellhb-mcq', 'anomer-ar', 'brwater-ar'],
      B: ['classify-short', 'anomer-short', ['fructose-short', 'invert-short']],
      C: ['classify-short3', 'cyclic-short3', 'compare-short3', ['mutarot-short3', 'test-short3']],
      D: ['glucose-long', ['sucrose-long', 'poly-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Classification and reducing sugars, the reactions establishing the open-chain structure of glucose, cyclic structures and anomers, D/L configuration, fructose and the bromine-water test, disaccharide links and polysaccharide structures, and every numerical checked against the ISC 2027 syllabus (Unit 10)',
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
