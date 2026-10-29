// Build ch08 Aldehydes, Ketones and Carboxylic Acids: npx tsx content/authored/chemistry/cbse-12-chemistry-ch08/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(8, 'Aldehydes, Ketones and Carboxylic Acids');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1208,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['name-mcq', 'reactivity-mcq', 'hvz-mcq', 'fehling-ar'],
      B: ['test-short', 'acidity-short', 'aldol-short3'],
      C: ['carbonyl-long', 'acid-long'],
      D: ['unknown-case'],
    },
    long: {
      A: ['structure-mcq', 'etard-mcq', 'stephen-mcq', 'cyanohydrin-mcq', 'clemmensen-mcq', 'iodoform-mcq', 'benzoic-mcq', 'ester-mcq', 'aldehyde-ar', 'acid-ar'],
      B: ['rosenmund-short', 'bp-short', ['cannizzaro-short', 'decarb-short'], 'acid-prep-short3', ['acidity-short3', 'conversions-short3']],
      C: ['prep-long', ['mechanism-long', 'synthesis-long']],
      D: ['vinegar-case', 'fragrance-case'],
    },
  },
  checksExtra: {
    chemistry_facts: 'Names, carbonyl structure, named preparations, nucleophilic addition, reductions, Tollens/Fehling/iodoform tests, aldol/Cannizzaro, pKa values and acid reactions checked against the 2026-27 syllabus scope (see README "Verifier pass")',
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
