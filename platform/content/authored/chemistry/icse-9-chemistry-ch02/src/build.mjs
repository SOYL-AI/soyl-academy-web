// Build ICSE 9 Chemistry ch02 Chemical Equations and Relative Masses:
//   npx tsx content/authored/chemistry/icse-9-chemistry-ch02/src/build.mjs [--dump <file>]   (run from platform/; CH_OUT=<dir> to build elsewhere)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-9-chemistry-ch01/src/lib.mjs';

setChapter(2, 'Chemical Equations and Relative Masses', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 92022,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['eq-mcq2', 'bal-mcq2', 'rmm-mcq1', 'pct-mcq2', 'ar-bal', 'ram-short2', 'eq-short3'],
      B: [['oxide-long', 'info-long']],
    },
    long: {
      A: ['eq-mcq3', 'eq-mcq4', 'bal-mcq1', 'bal-mcq3', 'rmm-mcq2', 'rmm-mcq4', 'pct-mcq3', 'ar-rmm', 'eq-short2b', 'bal-short2a', 'pct-short2', 'rmm-short3', 'pct-short3'],
      B: [['hydrate-long', 'balancing-long', 'ram-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Word and formula equations, state symbols and heat sign, balancing by hit and trial, relative atomic mass (carbon-12 standard, hydrogen as the earlier standard), relative molecular mass, percentage composition and water of crystallisation, checked against the ICSE 2028 Chemistry syllabus Class IX (The Language of Chemistry) — see README "For a reviewer"',
    counting_rules: 'Relative masses, percentages, masses of water and of elements, equation mass totals and balancing coefficients are computed and asserted in src/calc.mjs (including a balancing solver), not typed in',
    icse_style: 'Assertion-reason items use the ICSE option order; 1-mark balancing and names; numericals with working; a 5-pair match; 10-mark structured questions in parts, one with a lettered apparatus diagram; chapter tests on icse-9-default-chapter-test-short / -long',
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
