// Build ICSE 9 Chemistry ch04 Water as a Universal Solvent: Solutions and Solubility:
//   npx tsx content/authored/chemistry/icse-9-chemistry-ch04/src/build.mjs [--dump <file>]   (run from platform/; CH_OUT=<dir> to build elsewhere)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-9-chemistry-ch01/src/lib.mjs';

setChapter(4, 'Water as a Universal Solvent: Solutions and Solubility', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 90104,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['heat-mcq', 'supersat-mcq', 'read-mcq', 'solubdef-mcq', 'ar-sat', 's2-polar', 's3-prepare'],
      B: [['beam-long', 'cool-long']],
    },
    long: {
      A: ['beam-mcq', 'stirstay-mcq', 'unsat-mcq', 'caso4-mcq', 'steep-mcq', 'size-mcq', 'temp-mcq', 'ar-universal', 's2-super', 's2-test', 's2-diff', 's3-compare', 's3-calc1'],
      B: [['curve-long', 'evap-long', 'y-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Universal solvent, solution/colloid/suspension, saturated/unsaturated/supersaturated and the crystal test, solubility curves of potassium nitrate, sodium chloride and calcium sulphate, checked against the ICSE 2028 Chemistry syllabus Class IX (Water) — see README "For a reviewer"',
    counting_rules: 'Every solubility reading, mass of solute, solution and crystals is computed and asserted in src/calc.mjs, not typed in; the curve data are illustrative, rounded and textbook-shaped',
    icse_style: 'Assertion-reason items use the ICSE option order; 1-mark terms, odd one out and give-reason items; numericals with working; a lettered solubility graph and lettered jars; 10-mark structured questions in parts; chapter tests on icse-9-default-chapter-test-short / -long',
    verifier_pass: '2026-11-05: every question re-solved from its stem by the author; keys, schemes and word limits checked',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
