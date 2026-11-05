// Build ICSE 9 Chemistry ch12 Study of Gas Laws:
//   npx tsx content/authored/chemistry/icse-9-chemistry-ch12/src/build.mjs [--dump <file>]   (run from platform/; CH_OUT=<dir> to build elsewhere)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-9-chemistry-ch01/src/lib.mjs';

setChapter(12, 'Study of Gas Laws', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 92122,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['motion-mcq2', 'charles-mcq3', 'kelvin-mcq3', 'charles-mcq2', 'ar-stp', 's2-fault', 's3-molecules'],
      B: [['boyle-long', 'balloon-long']],
    },
    long: {
      A: ['motion-mcq1', 'motion-mcq3', 'boyle-mcq2', 'boyle-mcq5', 'kelvin-mcq1', 'comb-mcq3', 'comb-mcq4', 'ar-comb', 's2-tyre', 's2-conv', 's2-stp', 's3-stp-calc', 's3-charles-calc'],
      B: [['charles-long', 'apparatus-long', 'graph-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Boyle and Charles laws with molecular-motion explanations, graphs (P against V, P against 1/V, V against t extrapolated to absolute zero, V against T), Celsius-kelvin conversion (K = C + 273), STP as 273 K and 760 mm Hg, the combined gas equation and reduction to STP, checked against the ICSE 2028 Chemistry syllabus Class IX (Study of Gas Laws) — see README "For a reviewer"',
    counting_rules: 'Every gas-law answer, kelvin conversion, graph point and STP volume is computed and asserted in src/calc.mjs, not typed in',
    icse_style: 'Assertion-reason items use the ICSE option order; 1-mark laws, terms and conversions; twelve numericals with working; a 5-pair match; 10-mark structured questions in parts, one with a lettered apparatus diagram and one with a graph; chapter tests on icse-9-default-chapter-test-short / -long',
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
