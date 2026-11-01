// Build ICSE 10 Chemistry ch15 Alcohols and Carboxylic Acids: npx tsx content/_stage/chemistry/icse-10-chemistry-ch15/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(15, 'Alcohols and Carboxylic Acids');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1015,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['mix-mcq', 'flame-mcq', 'vinegar-mcq', 'naoh-mcq', 'hydrolysis-ar', 'hydrolysis-short1', 'naoh-short1', 'methanol-short1', 'distinguish-short2'],
      B: [['ethanol-long', 'acid-long']],
    },
    long: {
      A: ['bp-mcq', 'ester-mcq', 'denature-mcq', 'glacial-mcq', 'weak-mcq', 'methylester-mcq', 'ester-ar', 'sodium-short1', 'fuel-short1', 'struct-short1', 'smell-short1', 'aciduses-short1', 'acid-fill', 'reaction-match'],
      B: [['society-long', 'ester-long', 'pq-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Hydrolysis of bromoethane to ethanol, physical constants of ethanol (b.p. 78 °C, density 0.79 g cm⁻³) and ethanoic acid (b.p. 118 °C, m.p. 16.6 °C), combustion, sodium, esterification and dehydration of ethanol, denatured, methylated and spurious alcohol, glacial acetic acid, litmus, neutralisation and esterification of ethanoic acid, and uses; every \ce equation atom-balanced and every calculation re-computed; checked against the ICSE 2027 syllabus (Class X, section 9)',
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
